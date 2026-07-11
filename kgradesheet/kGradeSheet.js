(() => {
  'use strict';
  if (window.CTMKGradeSheet && typeof window.CTMKGradeSheet.init === 'function') return;

  const MODULE_HTML_PATH = 'kgradesheet/kGradeSheet.html';
  const STORAGE_PREFIX = 'kgradesheet:';
  const VERSION = 'CTM-KGRADESHEET-KS1-DESCRIPTIVE-2026-07-11-SAFE-ROUTING-FIX';

  const TABLE8_DESCRIPTORS = [
    { code: 'A', label: 'Advancing', localizedLabel: 'Namumukod-tangi', generalDescription: 'Consistently demonstrates advanced skills, understanding, and values beyond expectations; performs with confidence, accuracy, and independence.', instructionalResponse: 'Provide enrichment opportunities and deeper application tasks.' },
    { code: 'B', label: 'Benchmarking', localizedLabel: 'Napamamalas', generalDescription: 'Demonstrates expected skills, understanding, and values at grade level with consistency; performs tasks accurately and independently.', instructionalResponse: 'Sustain grade-level work and increase independence.' },
    { code: 'C', label: 'Connecting', localizedLabel: 'Natutungo', generalDescription: 'Demonstrates foundational skills, understanding, and values; applies learning in familiar tasks with minimal guidance.', instructionalResponse: 'Provide guided practice to strengthen confidence and consistency.' },
    { code: 'D', label: 'Developing', localizedLabel: 'Napauunlad', generalDescription: 'Demonstrates partial understanding and inconsistent application of skills and values; requires targeted support and regular practice to improve performance.', instructionalResponse: 'Provide targeted support and regular practice.' },
    { code: 'E', label: 'Emerging', localizedLabel: 'Nagsisimula', generalDescription: 'Beginning to demonstrate basic skills, understanding, and values; requires intensive support and close guidance.', instructionalResponse: 'Provide intensive support and close guidance.' }
  ];

  const state = {
    htmlInjected: false,
    classId: '',
    className: '',
    roster: [],
    schoolYear: '',
    gradeLevel: '',
    section: '',
    teacherName: '',
    schoolName: '',
    activeTab: 'overview',
    selectedLearnerId: '',
    linkedRecords: [],
    descriptorRows: [],
    viewOptions: {
      showDescriptions: true,
      showInstructionalResponse: true,
      showTeacherNotes: true,
      showInterventionNotes: true
    },
    saveTimer: 0
  };

  const dom = {};
  const $id = id => document.getElementById(id);
  const text = v => String(v ?? '').trim();
  const esc = v => String(v ?? '').replace(/[&<>"']/g, m => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[m]));
  const slug = v => text(v).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'default';
  const storageKey = () => state.classId ? `${STORAGE_PREFIX}${state.classId}` : '';
  const descriptorByCode = code => TABLE8_DESCRIPTORS.find(d => d.code === text(code).toUpperCase()) || null;
  const descriptorOptionHtml = selected => '<option value="">No descriptor</option>' + TABLE8_DESCRIPTORS.map(d => `<option value="${d.code}" ${text(selected).toUpperCase() === d.code ? 'selected' : ''}>${d.code} - ${esc(d.label)} / ${esc(d.localizedLabel)}</option>`).join('');

  function normalizeSex(v) {
    const s = text(v).toLowerCase();
    if (s === 'm' || s === 'male') return 'Male';
    if (s === 'f' || s === 'female') return 'Female';
    return text(v);
  }

  function normalizeGradeLevel(v) {
    const raw = text(v).replace(/_/g, ' ');
    if (/^1$/.test(raw) || /^grade\s*1$/i.test(raw)) return 'Grade 1';
    if (/^2$/.test(raw) || /^grade\s*2$/i.test(raw)) return 'Grade 2';
    if (/^3$/.test(raw) || /^grade\s*3$/i.test(raw)) return 'Grade 3';
    const m = raw.match(/grade\s*(\d+)/i);
    return m ? `Grade ${m[1]}` : raw;
  }

  function normalizeSchoolYear(sy) {
    const m = text(sy).match(/(\d{4})\s*-\s*(\d{4})/);
    return m ? `${m[1]}-${m[2]}` : text(sy);
  }

  function schoolYearStart(sy) {
    const m = normalizeSchoolYear(sy).match(/^(\d{4})-/);
    return m ? Number(m[1]) : 0;
  }

  function gradeNumber(gradeLevel) {
    const normalized = normalizeGradeLevel(gradeLevel);
    const m = normalized.match(/^Grade\s+(\d+)$/i);
    return m ? Number(m[1]) : 0;
  }

  function resolveGradeSheetMode(gradeLevel, schoolYear) {
    const grade = gradeNumber(gradeLevel);
    const y = schoolYearStart(schoolYear);
    // Do not infer descriptive grading from Academic Structure or from a missing SY.
    if (y && grade === 1 && y >= 2026) return 'ks1-descriptive';
    if (y && grade === 2 && y >= 2027) return 'ks1-descriptive';
    if (y && grade === 3 && y >= 2028) return 'ks1-descriptive';
    // Transition-only numeric labels for Grades 1-3. All other contexts safely stay numeric.
    if (y && (grade === 2 || grade === 3) && y === 2026) return 'numeric-adjusted';
    return 'numeric-zero-based';
  }

  function hasMissingSchoolYearForKs1Transition(gradeLevel, schoolYear) {
    const grade = gradeNumber(gradeLevel);
    return grade >= 1 && grade <= 3 && !schoolYearStart(schoolYear);
  }

  function isKs1DescriptiveContext(gradeLevel, schoolYear) {
    return resolveGradeSheetMode(gradeLevel, schoolYear) === 'ks1-descriptive';
  }

  function gradeSheetModeLabel(mode) {
    if (mode === 'ks1-descriptive') return 'KS1 Descriptive • Three Term';
    if (mode === 'numeric-adjusted') return 'Numeric • Adjusted';
    return 'Numeric • Zero Based';
  }

  function getSharedHeaderApi() {
    return window.CTMSharedHeader && typeof window.CTMSharedHeader === 'object' ? window.CTMSharedHeader : null;
  }

  function readFirstValue(ids) {
    for (const id of ids) {
      const el = $id(id);
      const v = el ? text(el.value || el.textContent) : '';
      if (v) return v;
    }
    return '';
  }

  function getSharedHeaderValue(field, fallbackIds) {
    const api = getSharedHeaderApi();
    try {
      const v = api && typeof api.get === 'function' ? text(api.get(field)) : '';
      if (v) return v;
    } catch (_) {}
    return readFirstValue(fallbackIds || []);
  }

  function readHostHeader() {
    return {
      schoolName: getSharedHeaderValue('schoolName', ['sf1SchoolName','sf2SchoolName','sf3SchoolName','sf8SchoolName','crSchoolName']),
      schoolYear: normalizeSchoolYear(getSharedHeaderValue('schoolYear', ['sf1SchoolYear','sf2SchoolYear','sf3SchoolYear','sf8SchoolYear','crSchoolYear'])),
      gradeLevel: normalizeGradeLevel(getSharedHeaderValue('gradeLevel', ['sf1GradeLevel','sf2GradeLevel','sf3GradeLevel','sf8Grade','crGradeLevel'])),
      section: getSharedHeaderValue('section', ['sf1Section','sf2Section','sf3Section','sf8Section','crSection']),
      teacherName: getSharedHeaderValue('teacherName', ['sf1Teacher','sf2Teacher','sf3Teacher','crTeacher'])
    };
  }

  function normalizeClassKey(v) { return text(v).replace(/[\[\]]/g, '').trim(); }
  function classKeyPart(v) { return normalizeClassKey(v).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); }

  function getClassId() {
    const dd = $id('classDropdown');
    const opt = dd && dd.selectedIndex >= 0 ? dd.options[dd.selectedIndex] : null;
    const candidates = [window.currentClassId, dd && dd.value, opt && (opt.dataset.classId || opt.dataset.id || opt.getAttribute('data-class-id') || opt.getAttribute('data-id')), opt && opt.value, opt && opt.text];
    for (const c of candidates) {
      const v = normalizeClassKey(c);
      if (v && !/^(default|select\s+class|class\s+name|no\s+class\s+loaded)$/i.test(v)) return classKeyPart(v) || v;
    }
    return '';
  }

  function getClassName() {
    const dd = $id('classDropdown');
    const opt = dd && dd.selectedIndex >= 0 ? dd.options[dd.selectedIndex] : null;
    const candidates = [window.currentClassName, $id('classHeader') && $id('classHeader').textContent, opt && opt.text, opt && opt.label, state.className, state.classId];
    for (const c of candidates) {
      const v = normalizeClassKey(c);
      if (v && !/^(default|select\s+class|class\s+name|no\s+class\s+loaded)$/i.test(v)) return v;
    }
    return state.classId || 'No class loaded';
  }

  function readHostRoster() {
    if (!state.classId) return [];
    let list = Array.isArray(window.currentStudents) ? window.currentStudents : null;
    if (!list || !list.length) {
      try { list = JSON.parse(localStorage.getItem(`students-${state.classId}`) || '[]'); } catch (_) { list = []; }
    }
    return (Array.isArray(list) ? list : []).map((s, i) => ({
      learnerId: text(s.learnerId || s.id || s.lrn) || `${i + 1}-${slug(s.name || s.fullName || s.studentName)}`,
      name: text(s.name || s.fullName || s.studentName),
      sex: normalizeSex(s.sex || s.gender),
      order: Number.isFinite(Number(s.order)) ? Number(s.order) : i
    })).filter(x => x.name).sort((a, b) => a.order - b.order);
  }

  function loadSaved() {
    const key = storageKey();
    if (!key) return null;
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch (_) { return null; }
  }

  function saveSnapshot() {
    if (!state.classId) return;
    const payload = {
      version: VERSION,
      classId: state.classId,
      className: state.className,
      schoolYear: state.schoolYear,
      gradeLevel: state.gradeLevel,
      section: state.section,
      teacherName: state.teacherName,
      schoolName: state.schoolName,
      selectedLearnerId: state.selectedLearnerId,
      viewOptions: state.viewOptions,
      descriptorRows: state.descriptorRows.map(r => ({
        learnerId: r.learnerId,
        manualDescriptorCode: text(r.manualDescriptorCode).toUpperCase(),
        teacherNotes: text(r.teacherNotes),
        interventionNotes: text(r.interventionNotes),
        updatedAt: r.updatedAt || ''
      })),
      updatedAt: new Date().toISOString()
    };
    try { localStorage.setItem(storageKey(), JSON.stringify(payload)); flash('Saved'); } catch (_) { flash('Storage error'); }
  }

  function schedulePersist() {
    clearTimeout(state.saveTimer);
    flash('Saving...');
    state.saveTimer = setTimeout(saveSnapshot, 250);
  }

  function flash(msg) {
    if (dom.kgsFlash) dom.kgsFlash.textContent = msg || '';
  }

  function loadContext() {
    const cid = getClassId();
    if (!cid) {
      state.classId = '';
      state.roster = [];
      state.descriptorRows = [];
      flash('Load a class first');
      return false;
    }
    if (cid !== state.classId) {
      state.classId = cid;
      state.selectedLearnerId = '';
      state.descriptorRows = [];
    }
    state.className = getClassName();
    state.roster = readHostRoster();
    Object.assign(state, readHostHeader());
    const saved = loadSaved();
    if (saved && (!saved.classId || saved.classId === state.classId)) {
      state.viewOptions = Object.assign(state.viewOptions, saved.viewOptions || {});
      state.selectedLearnerId = saved.selectedLearnerId || state.selectedLearnerId;
      state.descriptorRows = Array.isArray(saved.descriptorRows) ? saved.descriptorRows : [];
    }
    state.linkedRecords = discoverClassRecords().filter(recordMatchesCurrentContext);
    rebuildDescriptorRows();
    if (!state.selectedLearnerId && state.roster[0]) state.selectedLearnerId = state.roster[0].learnerId;
    return true;
  }

  function nameKey(v) { return text(v).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' '); }
  function learnerKey(l) { return `${nameKey(l && l.name)}|${normalizeSex(l && l.sex).toLowerCase()}`; }
  function sameLooseKey(a, b) {
    const rawA = normalizeClassKey(a);
    const rawB = normalizeClassKey(b);
    if (!rawA || !rawB) return false;
    return rawA.toLowerCase() === rawB.toLowerCase() || slug(rawA) === slug(rawB) || classKeyPart(rawA) === classKeyPart(rawB);
  }
  function recordRosterOverlap(payload) {
    const rosterKeys = new Set(state.roster.map(learnerKey));
    const rosterNames = new Set(state.roster.map(l => nameKey(l && l.name)).filter(Boolean));
    if (!rosterKeys.size && !rosterNames.size) return false;
    let hits = 0;
    classRecordLearnerRows(payload).forEach(list => {
      (list.rows || []).forEach(row => {
        if (rosterKeys.has(learnerKey(row)) || rosterNames.has(nameKey(row && row.name))) hits += 1;
      });
    });
    return hits >= Math.min(2, Math.max(1, state.roster.length));
  }

  function recordMatchesCurrentContext(rec) {
    const h = rec.header || {};
    const classIdFields = [h.classId, h.id, h.classKey, h.className, h.section, rec.key].filter(Boolean);
    const classIdMatch = classIdFields.some(v => sameLooseKey(v, state.classId));
    const className = nameKey(state.className || state.section);
    const headerClassName = nameKey(h.className || h.section);
    const sectionName = nameKey(h.section);
    const classNameMatch = !!(className && (headerClassName === className || sectionName === className || (sectionName && className.includes(sectionName)) || (headerClassName && className.includes(headerClassName))));
    const syMatch = !state.schoolYear || !h.schoolYear || normalizeSchoolYear(h.schoolYear) === normalizeSchoolYear(state.schoolYear);
    const gradeMatch = !state.gradeLevel || !h.gradeLevel || normalizeGradeLevel(h.gradeLevel) === normalizeGradeLevel(state.gradeLevel);
    const rosterMatch = recordRosterOverlap(rec.payload);
    return syMatch && gradeMatch && (classIdMatch || classNameMatch || rosterMatch);
  }

  function discoverClassRecords() {
    const out = [];
    const seen = new Set();
    function add(key, payload, label) {
      if (!payload || typeof payload !== 'object') return;
      const h = Object.assign({}, payload.recordHeader || payload.header || {});
      const keyParts = text(key).split('::');
      if (!h.classId && keyParts[1]) h.classId = keyParts[1];
      if (!h.schoolYear && keyParts[2]) h.schoolYear = keyParts[2];
      if (!h.subject && keyParts[3]) h.subject = keyParts[3].replace(/-/g, ' ');
      const fs = payload.finalSummary || {};
      if (!fs.learners && !payload.term1 && !payload.term2 && !payload.term3 && !payload.term4) return;
      const k = text(key || h.recordId || label);
      if (!k || seen.has(k)) return;
      seen.add(k);
      out.push({ key: k, payload, header: h, label: text(label || h.recordLabel || h.subject || h.subjectGroup || k) });
    }
    try {
      if (window.CTMClassRecord && typeof window.CTMClassRecord._debugSnapshot === 'function') {
        const snap = window.CTMClassRecord._debugSnapshot();
        add('__live_classrecord__', snap, 'Live Class Record');
      }
    } catch (_) {}
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i) || '';
        if (!/^classrecord-sy::/i.test(k) || /^classrecord-sy-index::/i.test(k)) continue;
        let payload = null;
        try { payload = JSON.parse(localStorage.getItem(k) || 'null'); } catch (_) {}
        add(k, payload, '');
      }
    } catch (_) {}
    return out;
  }

  function descriptorCodeFromAnything(v) {
    const raw = text(v).toUpperCase();
    if (/^[A-E]$/.test(raw)) return raw;
    const found = TABLE8_DESCRIPTORS.find(d => raw === d.label.toUpperCase() || raw === d.localizedLabel.toUpperCase() || raw.includes(d.label.toUpperCase()) || raw.includes(d.localizedLabel.toUpperCase()));
    return found ? found.code : '';
  }

  function dig(obj, paths) {
    for (const p of paths) {
      const parts = p.split('.');
      let cur = obj;
      for (const part of parts) cur = cur && cur[part];
      if (cur != null && cur !== '') return cur;
    }
    return '';
  }

  function extractDescriptor(row) {
    const code = descriptorCodeFromAnything(dig(row, [
      'descriptorCode','finalDescriptorCode','descriptor','finalDescriptor','termGrade','letterGrade','computed.descriptorCode','computed.finalDescriptorCode','computed.termGrade','computed.letterGrade','finalResult.descriptorCode','finalResult.finalDescriptorCode','finalResult.termGrade','finalResult.letterGrade','finalResult.descriptorLabel','computed.descriptorLabel','descriptorLabel'
    ]));
    const d = descriptorByCode(code);
    return {
      code,
      label: d ? d.label : text(dig(row, ['descriptorLabel','computed.descriptorLabel','finalResult.descriptorLabel'])),
      localizedLabel: d ? d.localizedLabel : '',
      generalDescription: text(dig(row, ['generalDescription','computed.generalDescription','finalResult.generalDescription'])) || (d ? d.generalDescription : ''),
      instructionalResponse: text(dig(row, ['instructionalResponse','computed.instructionalResponse','finalResult.instructionalResponse'])) || (d ? d.instructionalResponse : ''),
      teacherNotes: text(dig(row, ['teacherNotes','computed.teacherNotes','finalResult.teacherNotes'])),
      interventionNotes: text(dig(row, ['interventionNotes','computed.interventionNotes','finalResult.interventionNotes']))
    };
  }

  function classRecordLearnerRows(payload) {
    const lists = [];
    if (payload && payload.finalSummary && Array.isArray(payload.finalSummary.learners)) lists.push({ term: 'Summary', sourceType: 'summary', priority: 0, rows: payload.finalSummary.learners });
    ['term1','term2','term3','term4'].forEach((k, idx) => {
      if (payload && payload[k] && Array.isArray(payload[k].learners)) lists.push({ term: `Term ${idx + 1}`, sourceType: 'term', priority: idx + 1, rows: payload[k].learners });
    });
    return lists;
  }

  function findRecordLearnerEntries(learner) {
    const entries = [];
    const target = learnerKey(learner);
    state.linkedRecords.forEach(rec => {
      classRecordLearnerRows(rec.payload).forEach(list => {
        const row = (list.rows || []).find(r => {
          const ids = [r.learnerId, r.id, r.studentId, r.lrn].map(text).filter(Boolean);
          if (ids.includes(text(learner.learnerId))) return true;
          return learnerKey(r) === target || nameKey(r.name) === nameKey(learner.name);
        });
        if (row) {
          const desc = extractDescriptor(row);
          if (desc.code || desc.label || desc.teacherNotes || desc.interventionNotes) {
            entries.push(Object.assign({ recordKey: rec.key, recordLabel: rec.label, subject: text(rec.header && rec.header.subject), term: list.term, sourceType: list.sourceType || 'term', priority: Number(list.priority) || 0 }, desc));
          }
        }
      });
    });
    return entries;
  }

  function suggestedDescriptorCode(entries) {
    const usable = (Array.isArray(entries) ? entries : []).filter(e => e && e.code);
    if (!usable.length) return '';
    const summary = usable.filter(e => e.sourceType === 'summary');
    const pool = summary.length ? summary : usable;
    const counts = {};
    pool.forEach(e => { counts[e.code] = (counts[e.code] || 0) + 1; });
    const order = { A: 1, B: 2, C: 3, D: 4, E: 5 };
    return Object.keys(counts).sort((a, b) => counts[b] - counts[a] || (order[b] || 9) - (order[a] || 9))[0] || '';
  }

  function rebuildDescriptorRows() {
    const savedById = new Map((state.descriptorRows || []).map(r => [text(r.learnerId), r]));
    state.descriptorRows = state.roster.map((l, index) => {
      const old = savedById.get(text(l.learnerId)) || {};
      const linkedDescriptors = findRecordLearnerEntries(l);
      const suggestedCode = suggestedDescriptorCode(linkedDescriptors);
      const finalCode = descriptorCodeFromAnything(old.manualDescriptorCode) || suggestedCode;
      const d = descriptorByCode(finalCode);
      const joinedTeacherNotes = linkedDescriptors.map(e => e.teacherNotes).filter(Boolean).join(' | ');
      const joinedInterventionNotes = linkedDescriptors.map(e => e.interventionNotes).filter(Boolean).join(' | ');
      return {
        index: index + 1,
        learnerId: l.learnerId,
        name: l.name,
        sex: l.sex,
        manualDescriptorCode: descriptorCodeFromAnything(old.manualDescriptorCode),
        suggestedDescriptorCode: suggestedCode,
        finalDescriptorCode: finalCode,
        descriptor: d,
        linkedDescriptors,
        teacherNotes: text(old.teacherNotes) || joinedTeacherNotes,
        interventionNotes: text(old.interventionNotes) || joinedInterventionNotes,
        updatedAt: old.updatedAt || ''
      };
    });
  }

  function cacheDom() {
    ['kGradeSheetModal','kgsTopClass','kgsTopGradeYear','kgsTopCount','kgsTopMode','kgsBtnRefresh','kgsBtnExportCsv','kgsBtnClose','kgsFlash','kgsSummaryCards','kgsTable','kgsLearnerPicker','kgsLearnerCard','kgsLinkedRecords','kgsShowDescriptions','kgsShowInstructionalResponse','kgsShowTeacherNotes','kgsShowInterventionNotes'].forEach(id => dom[id] = $id(id));
  }

  async function ensureInjected() {
    if (state.htmlInjected && $id('kGradeSheetModal')) return;
    let html = '';
    try {
      const res = await fetch(MODULE_HTML_PATH, { cache: 'no-store' });
      if (res.ok) html = await res.text();
    } catch (_) {}
    if (!html) throw new Error('Unable to load kGradeSheet.html');
    let host = $id('kGradeSheetHost');
    if (!host) { host = document.createElement('div'); host.id = 'kGradeSheetHost'; document.body.appendChild(host); }
    host.innerHTML = html;
    state.htmlInjected = true;
    cacheDom();
    bindUi();
  }

  function switchTab(tab) {
    state.activeTab = tab;
    document.querySelectorAll('#kGradeSheetModal .ctm-kgs-tab').forEach(b => b.classList.toggle('active', b.dataset.kgsTab === tab));
    ['overview','learner','records','settings'].forEach(t => {
      const el = $id('kgsPanel' + t.charAt(0).toUpperCase() + t.slice(1));
      if (el) el.classList.toggle('active', t === tab);
    });
  }

  function render() {
    cacheDom();
    if (dom.kgsTopClass) dom.kgsTopClass.textContent = state.className || 'No class loaded';
    if (dom.kgsTopGradeYear) dom.kgsTopGradeYear.textContent = `${state.gradeLevel || 'No grade'} / ${state.schoolYear || 'No school year'}`;
    if (dom.kgsTopCount) dom.kgsTopCount.textContent = `${state.roster.length} learners`;
    if (dom.kgsTopMode) dom.kgsTopMode.textContent = gradeSheetModeLabel(resolveGradeSheetMode(state.gradeLevel, state.schoolYear));
    if (dom.kgsShowDescriptions) dom.kgsShowDescriptions.checked = !!state.viewOptions.showDescriptions;
    if (dom.kgsShowInstructionalResponse) dom.kgsShowInstructionalResponse.checked = !!state.viewOptions.showInstructionalResponse;
    if (dom.kgsShowTeacherNotes) dom.kgsShowTeacherNotes.checked = !!state.viewOptions.showTeacherNotes;
    if (dom.kgsShowInterventionNotes) dom.kgsShowInterventionNotes.checked = !!state.viewOptions.showInterventionNotes;
    renderSummary();
    renderTable();
    renderLearnerPicker();
    renderLearnerCard();
    renderLinkedRecords();
    hideKs1AcademicStructureControls();
    switchTab(state.activeTab || 'overview');
  }

  function renderSummary() {
    if (!dom.kgsSummaryCards) return;
    const counts = Object.fromEntries(TABLE8_DESCRIPTORS.map(d => [d.code, 0]));
    let blank = 0;
    state.descriptorRows.forEach(r => r.finalDescriptorCode ? counts[r.finalDescriptorCode]++ : blank++);
    dom.kgsSummaryCards.innerHTML = TABLE8_DESCRIPTORS.map(d => `<div class="ctm-kgs-card"><div class="code">${d.code}</div><div class="label">${esc(d.label)} / ${esc(d.localizedLabel)}</div><div class="count">${counts[d.code]} learner${counts[d.code] === 1 ? '' : 's'}</div><div class="ctm-kgs-mini">${esc(d.generalDescription)}</div></div>`).join('') + `<div class="ctm-kgs-card"><div class="code">—</div><div class="label">No descriptor yet</div><div class="count">${blank}</div><div class="ctm-kgs-mini">Refresh/sync linked Class Records or enter a manual descriptor.</div></div>`;
  }

  function renderTable() {
    if (!dom.kgsTable) return;
    const cols = ['<th>#</th><th>Learner</th><th>Sex</th><th>Descriptor</th><th>Linked Evidence</th>'];
    if (state.viewOptions.showDescriptions) cols.push('<th>General Description</th>');
    if (state.viewOptions.showInstructionalResponse) cols.push('<th>Instructional Response</th>');
    if (state.viewOptions.showTeacherNotes) cols.push('<th>Teacher Notes</th>');
    if (state.viewOptions.showInterventionNotes) cols.push('<th>Intervention Notes</th>');
    let body = '';
    state.descriptorRows.forEach(r => {
      const d = r.descriptor;
      const chips = r.linkedDescriptors.length ? r.linkedDescriptors.map(e => `<span class="ctm-kgs-chip" title="${esc(e.recordLabel)} ${esc(e.term)}">${esc(e.subject || e.recordLabel)}: <b>${esc(e.code || '—')}</b></span>`).join('') : '<span class="ctm-kgs-mini">No linked descriptor</span>';
      body += `<tr data-learner-id="${esc(r.learnerId)}"><td>${r.index}</td><td class="ctm-kgs-name">${esc(r.name)}</td><td>${esc(r.sex)}</td><td><select class="ctm-kgs-select" data-kgs-field="manualDescriptorCode" data-learner-id="${esc(r.learnerId)}">${descriptorOptionHtml(r.manualDescriptorCode || r.finalDescriptorCode)}</select><div class="ctm-kgs-mini">Suggested: ${esc(r.suggestedDescriptorCode || '—')}</div></td><td><div class="ctm-kgs-chiprow">${chips}</div></td>`;
      if (state.viewOptions.showDescriptions) body += `<td>${d ? esc(d.generalDescription) : ''}</td>`;
      if (state.viewOptions.showInstructionalResponse) body += `<td>${d ? esc(d.instructionalResponse) : ''}</td>`;
      if (state.viewOptions.showTeacherNotes) body += `<td>${esc(r.teacherNotes)}</td>`;
      if (state.viewOptions.showInterventionNotes) body += `<td>${esc(r.interventionNotes)}</td>`;
      body += '</tr>';
    });
    if (!body) body = `<tr><td colspan="${cols.length}">No learners found. Load a class or refresh roster.</td></tr>`;
    dom.kgsTable.innerHTML = `<thead><tr>${cols.join('')}</tr></thead><tbody>${body}</tbody>`;
  }

  function learnerPickerDisplayRows() {
    const groups = { Male: [], Female: [], Other: [] };
    state.roster.forEach((l, idx) => groups[l.sex === 'Male' ? 'Male' : (l.sex === 'Female' ? 'Female' : 'Other')].push({ l, idx }));
    const counters = { Male: 0, Female: 0, Other: 0 };
    return groups.Male.concat(groups.Female, groups.Other).map(item => {
      const sex = item.l.sex === 'Male' || item.l.sex === 'Female' ? item.l.sex : 'Other';
      counters[sex]++;
      return { learner: item.l, label: `${counters[sex]}. ${item.l.name}${item.l.sex ? ' (' + item.l.sex + ')' : ''}` };
    });
  }

  function renderLearnerPicker() {
    if (!dom.kgsLearnerPicker) return;
    const rows = learnerPickerDisplayRows();
    dom.kgsLearnerPicker.innerHTML = rows.map(x => `<option value="${esc(x.learner.learnerId)}">${esc(x.label)}</option>`).join('') || '<option value="">No learners</option>';
    dom.kgsLearnerPicker.value = state.selectedLearnerId || '';
  }

  function renderLearnerCard() {
    if (!dom.kgsLearnerCard) return;
    const r = state.descriptorRows.find(x => x.learnerId === state.selectedLearnerId) || state.descriptorRows[0];
    if (!r) { dom.kgsLearnerCard.innerHTML = '<div class="ctm-kgs-card">No learner selected.</div>'; return; }
    const d = r.descriptor;
    const linked = r.linkedDescriptors.length ? r.linkedDescriptors.map(e => `<div class="ctm-kgs-record"><div class="ctm-kgs-record-title">${esc(e.recordLabel)} • ${esc(e.term)} • ${esc(e.subject || 'Subject')}</div><div><span class="ctm-kgs-code-pill">${esc(e.code || '—')}</span> ${esc(e.label || '')} ${e.localizedLabel ? '/ ' + esc(e.localizedLabel) : ''}</div><div class="ctm-kgs-mini">${esc(e.generalDescription || '')}</div></div>`).join('') : '<div class="ctm-kgs-record">No linked Class Record descriptor found for this learner.</div>';
    dom.kgsLearnerCard.innerHTML = `<div class="ctm-kgs-learner-card" data-learner-id="${esc(r.learnerId)}"><h3 style="margin:.1rem 0">${esc(r.name)}</h3><div class="ctm-kgs-mini">${esc(r.sex)} • ${esc(state.gradeLevel)} • ${esc(state.schoolYear)}</div><div class="ctm-kgs-grid"><div class="ctm-kgs-field"><label>Final / Manual Descriptor</label><select data-kgs-field="manualDescriptorCode" data-learner-id="${esc(r.learnerId)}">${descriptorOptionHtml(r.manualDescriptorCode || r.finalDescriptorCode)}</select></div><div class="ctm-kgs-field"><label>Current Descriptor</label><input readonly value="${esc(r.finalDescriptorCode ? `${r.finalDescriptorCode} - ${(d && d.label) || ''}` : 'No descriptor')}"></div><div class="ctm-kgs-field span-all"><label>General Description</label><textarea readonly>${esc(d ? d.generalDescription : '')}</textarea></div><div class="ctm-kgs-field span-all"><label>Instructional Response</label><textarea readonly>${esc(d ? d.instructionalResponse : '')}</textarea></div><div class="ctm-kgs-field span-all"><label>Teacher Notes</label><textarea data-kgs-field="teacherNotes" data-learner-id="${esc(r.learnerId)}">${esc(r.teacherNotes)}</textarea></div><div class="ctm-kgs-field span-all"><label>Intervention Notes</label><textarea data-kgs-field="interventionNotes" data-learner-id="${esc(r.learnerId)}">${esc(r.interventionNotes)}</textarea></div><div class="span-all"><div class="ctm-kgs-panel-title">Linked Evidence</div><div class="ctm-kgs-record-list">${linked}</div></div></div></div>`;
  }

  function renderLinkedRecords() {
    if (!dom.kgsLinkedRecords) return;
    if (!state.linkedRecords.length) {
      dom.kgsLinkedRecords.innerHTML = '<div class="ctm-kgs-note">No linked Class Records were found for the loaded KS1 descriptive context. Open/save descriptive Class Records first, then click Refresh / Sync.</div>';
      return;
    }
    dom.kgsLinkedRecords.innerHTML = `<div class="ctm-kgs-record-list">${state.linkedRecords.map(rec => {
      const h = rec.header || {};
      const count = classRecordLearnerRows(rec.payload).reduce((n, list) => n + (Array.isArray(list.rows) ? list.rows.length : 0), 0);
      return `<div class="ctm-kgs-record"><div class="ctm-kgs-record-title">${esc(rec.label)}</div><div class="ctm-kgs-mini">Subject: ${esc(h.subject || '—')} • Class: ${esc(h.className || h.section || '—')} • Grade: ${esc(h.gradeLevel || '—')} • SY: ${esc(h.schoolYear || '—')}</div><div class="ctm-kgs-chiprow"><span class="ctm-kgs-chip">Learner rows: ${count}</span><span class="ctm-kgs-chip">Key: ${esc(rec.key)}</span></div></div>`;
    }).join('')}</div>`;
  }

  function updateRow(learnerId, field, value) {
    const row = state.descriptorRows.find(r => r.learnerId === learnerId);
    if (!row) return;
    if (field === 'manualDescriptorCode') row.manualDescriptorCode = descriptorCodeFromAnything(value);
    if (field === 'teacherNotes') row.teacherNotes = text(value);
    if (field === 'interventionNotes') row.interventionNotes = text(value);
    row.updatedAt = new Date().toISOString();
    const finalCode = row.manualDescriptorCode || row.suggestedDescriptorCode || '';
    row.finalDescriptorCode = finalCode;
    row.descriptor = descriptorByCode(finalCode);
  }

  function restoreExternalKs1HiddenAcademicControls() {
    // Compatibility cleanup for the previous build: it could tag/hide Class Record
    // or shared controls outside the KS1 modal. Restore only elements carrying our
    // marker and located outside #kGradeSheetModal.
    const modal = $id('kGradeSheetModal');
    try {
      document.querySelectorAll('.ctm-kgs-hidden-academic-control').forEach(el => {
        if (modal && modal.contains(el)) return;
        el.classList.remove('ctm-kgs-hidden-academic-control');
        if (el.getAttribute('hidden') === 'hidden') el.removeAttribute('hidden');
        if (el.getAttribute('aria-hidden') === 'true') el.removeAttribute('aria-hidden');
      });
    } catch (_) {}
  }

  function hideKs1AcademicStructureControls() {
    // Scope strictly to the KS1 Grade Sheet modal. Do not scan #classRecordModal
    // or document, because Class Record/numeric Grade Sheet controls must remain available.
    const root = $id('kGradeSheetModal');
    if (!root) return;
    const phrases = [
      'academic structure',
      'show subject in visible period',
      'show subject in visible term',
      'subject should appear',
      'visible period',
      'visible term'
    ];
    const forceSelectors = [
      '#kgsAcademicStructure',
      '#kgsShowSubjectInVisiblePeriod',
      '#kgsShowSubjectInVisibleTerm',
      '[data-kgs-academic-structure]',
      '[data-kgs-visible-period]',
      '[data-kgs-visible-term]'
    ].join(',');
    try {
      root.querySelectorAll(forceSelectors).forEach(el => {
        const target = el.closest('label, .ctm-kgs-field, .ctm-kgs-card, .ctm-kgs-note') || el;
        target.classList.add('ctm-kgs-hidden-academic-control');
        target.setAttribute('hidden', 'hidden');
        target.setAttribute('aria-hidden', 'true');
      });
      root.querySelectorAll('label, .ctm-kgs-field, .ctm-kgs-card, .ctm-kgs-note').forEach(el => {
        const ownText = text(el.textContent || el.getAttribute('aria-label') || el.id || el.name || '');
        const idName = text([el.id, el.name].filter(Boolean).join(' '));
        const haystack = `${ownText} ${idName}`.toLowerCase();
        if (!phrases.some(p => haystack.includes(p))) return;
        el.classList.add('ctm-kgs-hidden-academic-control');
        el.setAttribute('hidden', 'hidden');
        el.setAttribute('aria-hidden', 'true');
      });
    } catch (_) {}
  }

  function bindUi() {
    const modal = $id('kGradeSheetModal');
    if (!modal || modal.dataset.kgsBound === '1') return;
    modal.dataset.kgsBound = '1';
    dom.kgsBtnClose && dom.kgsBtnClose.addEventListener('click', close);
    dom.kgsBtnRefresh && dom.kgsBtnRefresh.addEventListener('click', refresh);
    dom.kgsBtnExportCsv && dom.kgsBtnExportCsv.addEventListener('click', exportCsv);
    modal.addEventListener('click', e => {
      const tab = e.target.closest('.ctm-kgs-tab');
      if (tab) switchTab(tab.dataset.kgsTab);
      const tr = e.target.closest('tbody tr[data-learner-id]');
      if (tr && !e.target.matches('select,textarea,input,button')) {
        state.selectedLearnerId = tr.dataset.learnerId;
        renderLearnerPicker(); renderLearnerCard(); switchTab('learner'); schedulePersist();
      }
    });
    modal.addEventListener('change', e => {
      const field = e.target.closest('[data-kgs-field]');
      if (field) {
        updateRow(field.dataset.learnerId, field.dataset.kgsField, field.value);
        render(); schedulePersist();
      }
      const opt = e.target.closest('#kgsShowDescriptions,#kgsShowInstructionalResponse,#kgsShowTeacherNotes,#kgsShowInterventionNotes');
      if (opt) captureSettings();
    });
    modal.addEventListener('input', e => {
      const field = e.target.closest('textarea[data-kgs-field]');
      if (field) { updateRow(field.dataset.learnerId, field.dataset.kgsField, field.value); schedulePersist(); }
    });
    dom.kgsLearnerPicker && dom.kgsLearnerPicker.addEventListener('change', e => { state.selectedLearnerId = e.target.value; renderLearnerCard(); schedulePersist(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.style.display !== 'none') close(); });
  }

  function captureSettings() {
    state.viewOptions.showDescriptions = !!(dom.kgsShowDescriptions && dom.kgsShowDescriptions.checked);
    state.viewOptions.showInstructionalResponse = !!(dom.kgsShowInstructionalResponse && dom.kgsShowInstructionalResponse.checked);
    state.viewOptions.showTeacherNotes = !!(dom.kgsShowTeacherNotes && dom.kgsShowTeacherNotes.checked);
    state.viewOptions.showInterventionNotes = !!(dom.kgsShowInterventionNotes && dom.kgsShowInterventionNotes.checked);
    render(); schedulePersist();
  }

  async function open() {
    restoreExternalKs1HiddenAcademicControls();
    await ensureInjected();
    if (!loadContext()) { alert('Please load a class first before opening KS1 Descriptive Grade Sheet.'); return; }
    if (resolveGradeSheetMode(state.gradeLevel, state.schoolYear) !== 'ks1-descriptive') {
      alert('This class is not a KS1 descriptive context under the transition schedule. Opening the numeric Grade Sheet instead.');
      if (window.CTMGradeSheet && typeof window.CTMGradeSheet.open === 'function') window.CTMGradeSheet.open();
      return;
    }
    render();
    hideKs1AcademicStructureControls();
    document.body && document.body.classList.add('ctm-kgs-active');
    const modal = $id('kGradeSheetModal');
    if (modal) { modal.style.display = 'block'; modal.setAttribute('aria-hidden', 'false'); try { modal.inert = false; } catch (_) {} }
    flash('KS1 descriptive context loaded');
  }

  function close() {
    const modal = $id('kGradeSheetModal');
    clearTimeout(state.saveTimer);
    saveSnapshot();
    if (document.body) document.body.classList.remove('ctm-kgs-active');
    restoreExternalKs1HiddenAcademicControls();
    if (modal) {
      if (window.CTMModalA11y && typeof window.CTMModalA11y.prepareForHide === 'function') window.CTMModalA11y.prepareForHide(modal);
      modal.style.display = 'none'; modal.setAttribute('aria-hidden', 'true'); try { modal.inert = true; } catch (_) {}
    }
  }

  function refresh() {
    if (!loadContext()) return;
    render();
    saveSnapshot();
    flash(`Synced ${state.linkedRecords.length} linked Class Record${state.linkedRecords.length === 1 ? '' : 's'}`);
  }

  function csvEscape(v) {
    const s = String(v ?? '');
    return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }

  function exportCsv() {
    loadContext();
    const header = ['Class ID','Class Name','School Year','Grade Level','Section','Teacher','Learner ID','Learner','Sex','Descriptor Code','Descriptor Label','Localized Label','Suggested Descriptor','General Description','Instructional Response','Teacher Notes','Intervention Notes','Linked Evidence'];
    const rows = state.descriptorRows.map(r => {
      const d = r.descriptor || descriptorByCode(r.finalDescriptorCode) || {};
      const linked = r.linkedDescriptors.map(e => `${e.recordLabel}/${e.term}/${e.subject || ''}:${e.code}`).join(' | ');
      return [state.classId,state.className,state.schoolYear,state.gradeLevel,state.section,state.teacherName,r.learnerId,r.name,r.sex,r.finalDescriptorCode,d.label || '',d.localizedLabel || '',r.suggestedDescriptorCode,d.generalDescription || '',d.instructionalResponse || '',r.teacherNotes,r.interventionNotes,linked];
    });
    const csv = [header].concat(rows).map(row => row.map(csvEscape).join(',')).join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KS1-Descriptive-GradeSheet-${slug(state.className || state.classId)}-${slug(state.schoolYear)}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    flash('CSV exported');
  }

  function routeGradeSheetClick(ev) {
    const header = readHostHeader();
    const mode = resolveGradeSheetMode(header.gradeLevel, header.schoolYear);
    restoreExternalKs1HiddenAcademicControls();
    if (mode !== 'ks1-descriptive') {
      // Preserve existing numeric Grade Sheet behavior: do not prevent, stop,
      // or replace the original numeric Grade Sheet click handlers.
      if (hasMissingSchoolYearForKs1Transition(header.gradeLevel, header.schoolYear) && !window.__CTMKGradeSheetMissingSyWarned) {
        window.__CTMKGradeSheetMissingSyWarned = true;
        try { alert('School Year is missing for this Grade 1-3 class. Opening the regular numeric Grade Sheet as a safe fallback. Complete the shared/class setup to enable KS1 descriptive routing when applicable.'); } catch (_) {}
      }
      return;
    }
    ev.preventDefault();
    ev.stopPropagation();
    if (typeof ev.stopImmediatePropagation === 'function') ev.stopImmediatePropagation();
    open();
  }

  function init() {
    restoreExternalKs1HiddenAcademicControls();
    const btn = $id('btnOpenGradeSheet');
    if (btn && btn.dataset.kgsRouteBound !== '1') {
      btn.dataset.kgsRouteBound = '1';
      btn.addEventListener('click', routeGradeSheetClick, true);
    }
    if (!window.__CTMKGradeSheetFlushBound) {
      window.__CTMKGradeSheetFlushBound = true;
      window.addEventListener('beforeunload', () => { clearTimeout(state.saveTimer); if (state.classId) saveSnapshot(); });
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && state.classId) { clearTimeout(state.saveTimer); saveSnapshot(); } });
    }
  }

  function snapshot() {
    return JSON.parse(JSON.stringify({ version: VERSION, state, descriptors: TABLE8_DESCRIPTORS }));
  }

  window.CTMKGradeSheet = { init, open, close, refresh, exportCsv, resolveGradeSheetMode, isKs1DescriptiveContext, _debugSnapshot: snapshot };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();
