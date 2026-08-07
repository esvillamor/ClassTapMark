(() => {
  'use strict';
  if (window.CTMSF9 && typeof window.CTMSF9.init === 'function') return;

  const VERSION = 'CTM-SF9-A11Y-NAME-LABEL-FIX-2026-07-27';
  const MODULE_HTML_PATH = 'SF9/sf9.html';
  const STORAGE_PREFIX = 'sf9-meta:';
  const Q_KEYS = ['q1','q2','q3','q4'];
  const PASSING_GRADE = 75;

  const fallbackHtml = `
<div id="sf9Modal" class="modal" aria-hidden="true" role="dialog" aria-modal="true" style="display:none">
  <div class="modal-content sf9-modal-content"><div class="sf9-head"><div class="sf9-head-main"><div><h2>SF9 - Learner's Performance Report</h2><div id="sf9ClassInfo" class="sf9-muted">No class loaded</div></div><button id="sf9BtnClose" type="button" class="danger sf9-close-x" aria-label="Close SF9" title="Close">✕</button></div>
  <div class="sf9-tabs" role="tablist" aria-label="SF9 Tabs"><button id="sf9TabSetup" type="button" class="sf9-tab active" data-sf9-tab="setup">Setup</button><button id="sf9TabPreview" type="button" class="sf9-tab" data-sf9-tab="preview">Learner Preview</button><button id="sf9TabBatch" type="button" class="sf9-tab" data-sf9-tab="batch">Batch Export</button></div></div>
  <section id="sf9PanelSetup" class="sf9-panel active"><div id="sf9SetupSummary"></div><div class="sf9-grid"><label for="sf9Adviser"><span>Adviser</span><input id="sf9Adviser" name="sf9Adviser" type="text" placeholder="Adviser"></label><label for="sf9SchoolHead"><span>School Head</span><input id="sf9SchoolHead" name="sf9SchoolHead" type="text" placeholder="School Head"></label></div><label class="sf9-check" for="sf9ShowAwardsBox"><input id="sf9ShowAwardsBox" name="sf9ShowAwardsBox" type="checkbox"><span>Show Awards and Recognition box</span></label><label class="sf9-check" for="sf9ShowPerfectAttendance"><input id="sf9ShowPerfectAttendance" name="sf9ShowPerfectAttendance" type="checkbox"><span>Show optional Perfect Attendance recognition if qualified</span></label><label class="sf9-check" for="sf9ShowLegacyCoreValues"><input id="sf9ShowLegacyCoreValues" name="sf9ShowLegacyCoreValues" type="checkbox"><span>Show optional legacy AO/SO/RO/NO Core Values section</span></label><label class="sf9-check" for="sf9ShowDebugNotes"><input id="sf9ShowDebugNotes" name="sf9ShowDebugNotes" type="checkbox"><span>Show debug notes in print output</span></label><button id="sf9BtnSaveSettings" type="button" class="primary">Save SF9 Settings</button></section>
  <section id="sf9PanelPreview" class="sf9-panel"><div class="sf9-toolbar"><label for="sf9LearnerPicker" class="sf9-sr-only">Learner</label><select id="sf9LearnerPicker" name="sf9LearnerPicker"></select><button id="sf9BtnRefresh" type="button" class="edit">Refresh</button><button id="sf9BtnPrintSelected" type="button" class="primary">Print Selected Learner</button></div><div id="sf9TransitionNote" class="sf9-note" hidden></div><div class="sf9-comments-editor"><h3>Teacher's Comments / Remarks</h3><textarea id="sf9CommentT1" name="sf9CommentT1" data-sf9-comment-period="q1" aria-label="Term 1 comments" placeholder="Term 1 comments"></textarea><textarea id="sf9CommentT2" name="sf9CommentT2" data-sf9-comment-period="q2" aria-label="Term 2 comments" placeholder="Term 2 comments"></textarea><textarea id="sf9CommentT3" name="sf9CommentT3" data-sf9-comment-period="q3" aria-label="Term 3 comments" placeholder="Term 3 comments"></textarea><div id="sf9CoreValuesEditor" class="sf9-core-values-editor"></div>
        <button id="sf9BtnSaveComments" type="button" class="primary">Save Comments / Observed Values</button></div><div id="sf9PrintArea"></div></section>
  <section id="sf9PanelBatch" class="sf9-panel"><div id="sf9BatchSummary"></div><button id="sf9BtnPrintAll" type="button" class="primary">Print All Learners</button><p class="sf9-muted">SF9 uses the saved GradeSheet/ClassRecord and Attendance data. Update/save Class Record or GradeSheet and Attendance first before final printing.</p></section></div></div>`;

  const state = { htmlInjected:false, classId:'', className:'', meta:{}, roster:[], gradeData:null, reports:[], attendanceData:{}, selectedLearnerId:'', activeTab:'setup', policy:null, displayProfile:null, warnings:[] };
  const dom = {};
  const $id = id => document.getElementById(id);
  const text = v => String(v ?? '').trim();
  const esc = v => String(v ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const normClass = v => text(v).replace(/[\[\]]/g,'').trim();
  const slug = v => normClass(v).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  const toGrade = v => { if (v === '' || v == null) return null; const n = Number(String(v).replace(/[^0-9.-]/g,'')); return Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : null; };
  const avg = a => { const v = (a || []).map(toGrade).filter(Number.isInteger); return v.length ? Math.round(v.reduce((x,y)=>x+y,0) / v.length) : null; };
  const show = v => Number.isInteger(v) ? String(v) : '';
  const normalizeSex = v => { const s = text(v).toLowerCase(); if (s === 'm' || s === 'male') return 'Male'; if (s === 'f' || s === 'female') return 'Female'; return text(v); };
  const storageKey = () => state.classId ? STORAGE_PREFIX + state.classId : '';
  const profilesKey = classId => 'sf8-learners-' + classId;
  function safeJson(raw, fallback) { try { const o = JSON.parse(raw); return o == null ? fallback : o; } catch (_) { return fallback; } }
  function safeStoredJson(raw, fallback) {
    const direct = safeJson(raw, null);
    if (direct != null) return direct;
    try {
      if (window.LZString && typeof raw === 'string') {
        const attempts = [
          window.LZString.decompressFromUTF16,
          window.LZString.decompressFromBase64,
          window.LZString.decompressFromEncodedURIComponent
        ].filter(Boolean);
        for (const fn of attempts) {
          const decoded = fn(raw);
          if (!decoded) continue;
          const parsed = safeJson(decoded, null);
          if (parsed != null) return parsed;
        }
      }
    } catch (_) {}
    return fallback;
  }
  function hasUsableGradeSheetData(o) {
    if (!o || typeof o !== 'object') return false;
    const subjects = Array.isArray(o.subjects) ? o.subjects : [];
    const grades = o.grades && typeof o.grades === 'object' ? o.grades : {};
    const learners = o.learnerRecords && typeof o.learnerRecords === 'object' ? o.learnerRecords : {};
    return subjects.length > 0 || Object.keys(grades).length > 0 || Object.keys(learners).length > 0;
  }
  function loadLearnerProfiles(classId) {
    if (!classId) return [];
    const arr = safeJson(localStorage.getItem(profilesKey(classId)) || '[]', []);
    return Array.isArray(arr) ? arr : [];
  }
  function profileForStudent(studentId, profiles) {
    const sid = text(studentId);
    return (profiles || []).find(p => text(p && (p.studentId || p.learnerId || p.id)) === sid) || null;
  }
  function sf1MetaSchoolYear() {
    if (!state.classId) return '';
    const a = safeJson(localStorage.getItem('ctmSfMeta::' + state.classId) || 'null', null);
    const b = safeJson(localStorage.getItem('sf1-meta::' + state.classId) || 'null', null);
    return text((a && a.schoolYear) || (b && b.schoolYear) || '');
  }
  function parseSchoolYearStartYear(value) {
    const sy = text(value || schoolYear() || sf1MetaSchoolYear());
    const m = sy.match(/(\d{4})\D+(\d{4})/);
    if (m) return Number(m[1]);
    const now = new Date(), y = now.getFullYear();
    return (now.getMonth() + 1 >= 6) ? y : y - 1;
  }
  function firstFridayOfJune(startYear) {
    const d = new Date(Number(startYear) || new Date().getFullYear(), 5, 1);
    d.setDate(d.getDate() + ((5 - d.getDay() + 7) % 7));
    return d;
  }
  function computeAgeAtRef(birthdateISO, refDate) {
    if (!birthdateISO) return '';
    const bd = new Date(birthdateISO), r = new Date(refDate);
    if (isNaN(bd.getTime()) || isNaN(r.getTime())) return '';
    let age = r.getFullYear() - bd.getFullYear();
    const m = r.getMonth() - bd.getMonth();
    if (m < 0 || (m === 0 && r.getDate() < bd.getDate())) age--;
    return age >= 0 ? String(age) : '';
  }
  function ageForLearner(learner) {
    if (!learner) return '';
    const ref = firstFridayOfJune(parseSchoolYearStartYear());
    const computed = computeAgeAtRef(learner.birthdate || learner.birthDate || '', ref);
    return computed || text(learner.age);
  }
  function looksLikeGradeSheet(o) { return !!(o && typeof o === 'object' && (Array.isArray(o.subjects) || o.grades || o.learnerRecords)); }
  function storageClassMatches(o) {
    const wantId = slug(state.classId || ''), wantName = classRecordNorm(state.className || getClassName() || '');
    const h = (o && (o.header || o.recordHeader || o.classHeader)) || {};
    const gotId = slug(o && (o.classId || h.classId) || ''), gotName = classRecordNorm(o && (o.className || h.className || h.section) || '');
    if (wantId && gotId && wantId === gotId) return true;
    if (wantName && gotName && (wantName === gotName || wantName.includes(gotName) || gotName.includes(wantName))) return true;
    return !gotId && !gotName;
  }
  function findStoredGradeSheetSnapshot() {
    const directKeys = state.classId ? ['gradesheet:' + state.classId, 'gradesheet::' + state.classId, 'ctm-gradesheet:' + state.classId, 'ctm-gradesheet::' + state.classId, 'gradesheet-' + state.classId] : [];
    for (const key of directKeys) {
      const snap = safeStoredJson(localStorage.getItem(key) || 'null', null);
      if (looksLikeGradeSheet(snap) && hasUsableGradeSheetData(snap)) return snap;
    }
    const candidates = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i) || '';
        if (!/gradesheet/i.test(key)) continue;
        const snap = safeStoredJson(localStorage.getItem(key) || 'null', null);
        if (!looksLikeGradeSheet(snap) || !hasUsableGradeSheetData(snap) || !storageClassMatches(snap)) continue;
        const h = snap.header || snap.recordHeader || snap.classHeader || {};
        let score = 0;
        if (slug(snap.classId || h.classId || '') === slug(state.classId || '')) score += 5;
        if (Array.isArray(snap.subjects) && snap.subjects.length) score += 3;
        if (snap.grades && Object.keys(snap.grades).length) score += 2;
        candidates.push({score, snap});
      }
    } catch (_) {}
    candidates.sort((a,b) => b.score - a.score);
    return candidates.length ? candidates[0].snap : null;
  }

  function normalizeSubjectName(value) { return String(value || '').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' '); }
  const aliases = {
    filipino:['filipino'], english:['english'], mathematics:['mathematics','math','general mathematics'], science:['science','general science'], ap:['araling panlipunan','ap'],
    gmrc:['gmrc','good manners and right conduct','values education','values','values ed','values education gmrc','gmrc values','gmrc values education','ve'], eppTle:['epp','edukasyong pantahanan at pangkabuhayan','tle','technology and livelihood education','technology livelihood education','technology and livelihood','epp tle','epp / tle','tle epp'],
    mapeh:['mapeh','music arts physical education health','music and arts physical education and health'], musicArts:['music and arts','music arts','music','arts'], peHealth:['physical education and health','pe and health','pe health','physical education','health'],
    effectiveCommunication:['effective communication','mabisang komunikasyon','effective communication mabisang komunikasyon','mabisang komunikasyon effective communication'], lifeCareer:['life and career skills'], pklp:['pag aaral ng kasaysayan at lipunang pilipino','kasaysayan at lipunang pilipino','pklp'],
    academicElective:['academic elective','academic electives'], techpro:['techpro','tech pro','technical professional','techpro elective'], research:['research','research 1','research 2'], designInnovation:['design and innovation','design innovation'], workImmersion:['work immersion'], fieldExposure:['field exposure'], artsApprenticeship:['arts apprenticeship']
  };
  const aliasNames = Object.fromEntries(Object.entries(aliases).map(([k,v]) => [k, v.map(normalizeSubjectName)]));
  
  const CORE_VALUE_ROWS = [
    {key:'md1', core:'1. Maka-Diyos', statement:"Expresses one's spiritual beliefs while respecting the spiritual beliefs of others"},
    {key:'md2', core:'', statement:'Shows adherence to ethical principles by upholding truth'},
    {key:'mt1', core:'2. Makatao', statement:'Is sensitive to individual, social, and cultural differences'},
    {key:'mt2', core:'', statement:'Demonstrates contributions toward solidarity'},
    {key:'mk1', core:'3. Makakalikasan', statement:'Cares for the environment and utilizes resources wisely, judiciously, and economically'},
    {key:'mb1', core:'4. Makabansa', statement:'Demonstrates pride in being a Filipino; exercises the rights and responsibilities of a Filipino citizen'},
    {key:'mb2', core:'', statement:'Demonstrates appropriate behavior in carrying out activities in the school, community, and country'}
  ];
  const subjectName = s => text(s && (s.name || s.subjectName || s.title || s.label));
  const getGrade = (lid, sid, q) => toGrade((((state.gradeData || {}).grades || {})[lid] || {})[sid] && (((state.gradeData || {}).grades || {})[lid] || {})[sid][q]);
  function sf9LearnerIdCandidates(learner){
    const l=learner||{};
    const ids=[l.learnerId,l.id,l.studentId,l.lrn,l.LRN].map(text).filter(Boolean);
    const gd=state.gradeData||{}, roster=Array.isArray(gd.roster)?gd.roster:[];
    const wantedName=classRecordNorm(l.name||l.fullName||l.studentName);
    const wantedSex=normalizeSex(l.sex||l.gender).toLowerCase();
    roster.forEach(r=>{
      const rid=[r&&r.learnerId,r&&r.id,r&&r.studentId,r&&r.lrn,r&&r.LRN].map(text).filter(Boolean);
      const idHit=rid.some(x=>ids.includes(x));
      const nameHit=wantedName&&classRecordNorm(r&&r.name)===wantedName&&(!wantedSex||normalizeSex(r&&r.sex).toLowerCase()===wantedSex);
      if(idHit||nameHit) ids.push(...rid);
    });
    return Array.from(new Set(ids));
  }
  function gradeRowForLearner(learner){
    const gd=state.gradeData||{}, grades=gd.grades||{};
    const ids=sf9LearnerIdCandidates(learner);
    for(const id of ids) if(grades[id]) return grades[id];
    return {};
  }
  function getGradeForLearner(learner,sid,q){
    const row=gradeRowForLearner(learner);
    return toGrade(row&&row[sid]&&row[sid][q]);
  }

  const subjectList = gd => Array.isArray(gd && gd.subjects) ? gd.subjects.slice().filter(s => !s.archived).sort((a,b)=>(Number(a.order)||0)-(Number(b.order)||0)) : [];
  const subjectMatches = (s, keyOrNames) => { const n = normalizeSubjectName(subjectName(s)); const names = Array.isArray(keyOrNames) ? keyOrNames : (aliasNames[keyOrNames] || [keyOrNames]); return names.map(normalizeSubjectName).some(a => n === a || n.includes(a) || a.includes(n)); };
  const findSubj = (gd, keyOrNames, used) => subjectList(gd).find(s => (!used || !used.has(s.id)) && subjectMatches(s, keyOrNames)) || null;

  function getLoadedClassId() {
    const ctx = window.CTMLoadedClassContext || {};
    const candidates = [
      window.currentClassId,
      ctx.classId,
      ctx.id
    ];
    for (const c of candidates) {
      const v = normClass(c);
      if (v && !/^(default|select\s+class|class\s+name|no\s+class\s+loaded)$/i.test(v)) return slug(v) || v;
    }
    return '';
  }

  function hasLoadedClassForSf9() {
    return !!getLoadedClassId();
  }

  function warnNoLoadedClass() {
    alert('Load a class first before opening SF9. SF9 is attached to the currently loaded class.');
  }

  function updateOpenButtonsState() {
    const ok = hasLoadedClassForSf9();
    ['btnOpenSF9','btnSf9','btnOpenSf9'].forEach(id => {
      const b = $id(id);
      if (!b) return;
      b.disabled = !ok;
      b.setAttribute('aria-disabled', ok ? 'false' : 'true');
      b.title = ok ? "Learner's Performance Report" : 'Load a class first before opening SF9';
    });
  }

  function getClassId() {
    // SF9 is always tied to the *loaded* class, not merely the highlighted dropdown option.
    return getLoadedClassId();
  }
  function getClassName() {
    const dd = $id('classDropdown');
    const c = [window.currentClassName, $id('classHeader') && $id('classHeader').textContent];
    if (dd && dd.selectedIndex >= 0 && dd.options[dd.selectedIndex]) c.push(dd.options[dd.selectedIndex].text, dd.options[dd.selectedIndex].label, dd.options[dd.selectedIndex].value);
    c.push(state.className, state.classId, window.currentClassId);
    for (const x of c) { const v = normClass(x); if (v && !/^(default|select\s+class|class\s+name|no\s+class\s+loaded)$/i.test(v)) return v; }
    return state.classId || 'No class loaded';
  }
  function readRoster() {
    if (!state.classId) return [];
    let list = Array.isArray(window.currentStudents) ? window.currentStudents : null;
    if (!list || !list.length) { try { list = JSON.parse(localStorage.getItem('students-' + state.classId) || '[]'); } catch (_) { list = []; } }
    const profiles = loadLearnerProfiles(state.classId);
    return (Array.isArray(list) ? list : []).map((s,i) => {
      const sid = text(s.id || s.studentId || s.learnerId || '');
      const prof = profileForStudent(sid, profiles) || {};
      const name = text(s.name || s.fullName || s.studentName || [s.lastName, s.firstName, s.middleName].filter(Boolean).join(' '));
      const lrn = text(prof.LRN || prof.lrn || s.LRN || s.lrn);
      const birthdate = text(prof.birthdate || prof.birthDate || s.birthdate || s.birthDate);
      const learnerId = text(s.learnerId || s.id || s.studentId || prof.studentId || lrn) || (String(i + 1) + '-' + slug(name));
      return { learnerId, studentId:sid || learnerId, lrn, birthdate, age:computeAgeAtRef(birthdate, firstFridayOfJune(parseSchoolYearStartYear())), name, sex: normalizeSex(s.sex || s.gender), order: Number.isFinite(Number(s.order)) ? Number(s.order) : i };
    }).filter(x => x.name).sort((a,b)=>(a.order - b.order) || xName(a).localeCompare(xName(b)));
  }
  const xName = l => text(l && l.name);
  function defaultMeta() {
    return {
      version:VERSION,
      classId:state.classId,
      templateMode:'grades4to12',
      showLegacyCoreValues:false,
      showPerfectAttendance:false,
      showConductAward:false,
      showAwardsBox:true,
      showDebugNotes:false,
      location:{ region:'', division:'', school:'', district:'', schoolAddress:'', municipalityProvince:'' },
      signatories:{adviser:'', schoolHead:''},
      learnerRemarks:{},
      learnerAwards:{},
      updatedAt:new Date().toISOString()
    };
  }
  function loadSf9Meta() {
    const d = defaultMeta();
    if (!state.classId) return d;
    try {
      const raw = JSON.parse(localStorage.getItem(storageKey()) || 'null') || {};
      return Object.assign(d, raw, {
        version:VERSION,
        classId:state.classId,
        location:Object.assign({}, d.location, raw.location || {}),
        signatories:Object.assign({}, d.signatories, raw.signatories || {}),
        learnerRemarks:Object.assign({}, raw.learnerRemarks || {}),
        learnerAwards:Object.assign({}, raw.learnerAwards || {})
      });
    } catch (_) { return d; }
  }
  function saveSf9Meta() { if (!state.classId) return; const m = Object.assign(defaultMeta(), state.meta || {}); m.version = VERSION; m.classId = state.classId; m.updatedAt = new Date().toISOString(); localStorage.setItem(storageKey(), JSON.stringify(m)); state.meta = m; }

  function classRecordSubjectLabel(payload, index) {
    const h = payload && (payload.recordHeader || payload.header || payload.classHeader) || {};
    const fromHeader = h.subject || h.subjectName || h.learningArea || h.recordLabel || h.title || h.mapehComponent || '';
    if (text(fromHeader)) return text(fromHeader);
    const key = text(payload && payload.__storageKey).split('::').filter(Boolean).pop() || '';
    return text(key).replace(/[-_]+/g, ' ') || ('Subject ' + (index + 1));
  }

  function rowsForClassRecordTerm(payload, termKey) {
    const termPayload = payload && (payload[termKey] || (payload.terms && payload.terms[termKey]) || (payload.termData && payload.termData[termKey])) || null;
    if (termPayload && Array.isArray(termPayload.learners)) return termPayload.learners;
    if (termPayload && Array.isArray(termPayload.rows)) return termPayload.rows;
    if (termPayload && Array.isArray(termPayload.records)) return termPayload.records;
    if (Array.isArray(termPayload)) return termPayload;
    return [];
  }

  function findClassRecordLearnerRow(payload, learner, termKey) {
    const reportLike = { learner, learnerId: learner && learner.learnerId };
    const termRows = rowsForClassRecordTerm(payload, termKey);
    let row = termRows.find(r => learnerMatchesClassRecordRow(reportLike, r));
    if (row) return row;
    const finalRows = payload && payload.finalSummary && Array.isArray(payload.finalSummary.learners) ? payload.finalSummary.learners : [];
    row = finalRows.find(r => learnerMatchesClassRecordRow(reportLike, r));
    if (row) return row;
    const allRows = payload && Array.isArray(payload.learners) ? payload.learners : [];
    return allRows.find(r => learnerMatchesClassRecordRow(reportLike, r)) || null;
  }

  function buildGradeSheetSnapshotFromClassRecords() {
    const payloads = readClassRecordPayloadsForSf9();
    if (!payloads.length) return null;
    const subjects = [];
    const grades = {};
    const learnerRecords = {};
    let header = {};
    payloads.forEach((payload, index) => {
      const h = payload && (payload.recordHeader || payload.header || payload.classHeader) || {};
      if (!Object.keys(header).length) header = h;
      const label = classRecordSubjectLabel(payload, index);
      const hId = text(h.subjectId || h.recordId || h.id || h.subjectKey);
      const subjectId = hId || ('cr-' + slug(label || ('subject-' + index)) + '-' + index);
      if (!subjects.some(s => s.id === subjectId)) {
        subjects.push({ id: subjectId, name: label, subjectName: label, title: label, teacher: text(h.teacher || h.adviser || h.subjectTeacher), order: index + 1, source: 'classRecord' });
      }
      state.roster.forEach(learner => {
        const lid = learner.learnerId;
        grades[lid] = grades[lid] || {};
        grades[lid][subjectId] = grades[lid][subjectId] || {};
        Q_KEYS.forEach(q => {
          const termKey = getClassRecordTermKey(q);
          const row = findClassRecordLearnerRow(payload, learner, termKey);
          const value = extractClassRecordGrade(row, termKey);
          if (Number.isInteger(value)) grades[lid][subjectId][q] = value;
        });
        const finalRows = payload && payload.finalSummary && Array.isArray(payload.finalSummary.learners) ? payload.finalSummary.learners : [];
        const finalRow = finalRows.find(r => learnerMatchesClassRecordRow({ learner, learnerId: lid }, r));
        if (finalRow) {
          learnerRecords[lid] = learnerRecords[lid] || {};
          ['generalAverage','ga','finalAverage','promotion','academicAward','rank'].forEach(k => {
            if (finalRow[k] != null && learnerRecords[lid][k] == null) learnerRecords[lid][k] = finalRow[k];
          });
        }
      });
    });
    return subjects.length ? { classId: state.classId, className: state.className, academicStructure: 'modifiedThreeTerm', subjects, grades, learnerRecords, selectedLearnerId: '', selectedSubjectId: '', header, source: 'classRecordLocalStorage' } : null;
  }

  function getGradeSheetSnapshot() {
    let snap = null;
    try { if (window.CTMGradeSheet && typeof window.CTMGradeSheet.debugSnapshot === 'function') snap = window.CTMGradeSheet.debugSnapshot(); } catch (_) {}
    try { if ((!snap || !hasUsableGradeSheetData(snap)) && window.CTMGradeSheet && typeof window.CTMGradeSheet._debugSnapshot === 'function') snap = window.CTMGradeSheet._debugSnapshot(); } catch (_) {}
    if ((!snap || !hasUsableGradeSheetData(snap)) && state.classId) snap = findStoredGradeSheetSnapshot();
    if ((!snap || !hasUsableGradeSheetData(snap)) && state.classId) snap = buildGradeSheetSnapshotFromClassRecords();
    if (!snap || typeof snap !== 'object') {
      state.warnings.push('No GradeSheet/ClassRecord data found in memory or saved localStorage. Encode or sync Class Record/GradeSheet first if this is the first time using it.');
      return {subjects:[], roster:[], grades:{}, mapehComponents:{}, learnerRecords:{}, academicStructure:'modifiedThreeTerm', source:'empty'};
    }
    return { classId:snap.classId || state.classId, className:snap.className || state.className, academicStructure:snap.academicStructure || 'modifiedThreeTerm', subjects:Array.isArray(snap.subjects) ? snap.subjects : [], roster:Array.isArray(snap.roster) ? snap.roster : [], grades:snap.grades || {}, mapehComponents:snap.mapehComponents || {}, learnerRecords:snap.learnerRecords || {}, selectedLearnerId:snap.selectedLearnerId || '', selectedSubjectId:snap.selectedSubjectId || '', header:snap.header || snap.recordHeader || snap.classHeader || {}, source:snap.source || 'gradesheet' };
  }

  function gradeLevelNumber(v) { const s = text(v || getHeaderField('gradeLevel') || getHeaderField('grade') || '').match(/\d+/); return s ? Number(s[0]) : null; }
  function getHeaderField(name) {
    const gd = state.gradeData || {}, h = gd.header || gd.academicStructure || {};
    const loc = (state.meta && state.meta.location) || {};
    const metaKey = {region:'region', division:'division', school:'school', district:'district', schoolAddress:'schoolAddress'}[name];
    if (metaKey && text(loc[metaKey])) return text(loc[metaKey]);
    if (name === 'schoolAddress' && text(loc.municipalityProvince)) return text(loc.municipalityProvince);
    const ids = {
      schoolYear:['crSchoolYear','sf1SchoolYear','sf2SchoolYear','sf8SchoolYear'],
      gradeLevel:['crGradeLevel','sf1GradeLevel','sf2GradeLevel','sf8GradeLevel'],
      section:['crSection','sf1Section','sf2Section','sf8Section'],
      adviser:['crTeacher','crAdviser','sf1Teacher','sf2Teacher','sf8Teacher'],
      school:['crSchoolName','crSchool','sf1SchoolName','sf2SchoolName','sf8SchoolName','schoolName','school'],
      region:['crRegion','sf1Region','sf2Region','sf8Region','region'],
      division:['crDivision','sf1Division','sf2Division','sf8Division','division'],
      district:['crDistrict','sf1District','sf2District','sf8District','district'],
      schoolAddress:['crSchoolAddress','sf1SchoolAddress','sf2SchoolAddress','sf8SchoolAddress','schoolAddress'], schoolHead:['sf2SchoolHead','sf1SchoolHead','sf3SchoolHead','sf8SchoolHead','schoolHead'],
      track:['crTrack','sf1Track','sf1TrackStrand','sf2Track','sf8Track'],
      strand:['crStrand','sf1Strand','sf1TrackStrand','sf2Strand']
    };
    const headerKeys = {
      schoolYear:['schoolYear','sy'],
      gradeLevel:['gradeLevel','grade','gradelevel'],
      section:['section','classSection'],
      adviser:['adviser','teacher','classAdviser','classTeacher'],
      school:['school','schoolName','schoolname','nameOfSchool'],
      region:['region','regionName','regionname'],
      division:['division','divisionName','schoolsDivision','schoolsDivisionName'],
      district:['district','districtName'],
      schoolAddress:['schoolAddress','address','schoolAddr','schoolContact','contactDetails'], schoolHead:['schoolHead','principal','headTeacher','schoolPrincipal'],
      track:['track','trackStrand','shsTrack','shsTrackStrand'],
      strand:['strand','trackStrand','shsStrand','shsTrackStrand']
    };
    const keys = ids[name] || [];
    const hKeys = headerKeys[name] || [];
    for (const k of [name, name.toLowerCase(), ...hKeys, ...keys]) if (h && h[k]) return text(h[k]);
    for (const id of keys) { const el = $id(id); if (el && text(el.value || el.textContent)) return text(el.value || el.textContent); }
    if (name === 'track' || name === 'strand') {
      const sf1TrackStrand = readSf1TrackStrandMeta();
      if (sf1TrackStrand) return sf1TrackStrand;
    }
    return '';
  }
  function readSf1TrackStrandMeta() {
    const classIds = [state.classId, getLoadedClassId(), window.currentClassId].map(text).filter(Boolean);
    const seen = new Set();
    for (const cid of classIds) {
      if (seen.has(cid)) continue;
      seen.add(cid);
      const keys = ['ctmSfMeta::' + cid, 'sf1-meta::' + cid];
      for (const key of keys) {
        const meta = safeJson(localStorage.getItem(key) || 'null', null);
        if (!meta || typeof meta !== 'object') continue;
        const value = text(meta.trackStrand || meta.shsTrackStrand || meta.track || meta.strand);
        if (value) return value;
      }
    }
    return '';
  }
  function sf9PrefixLine(label, value) {
    const v = text(value);
    if (!v) return '';
    const l = text(label);
    if (!l) return v;
    return v.toLowerCase().startsWith(l.toLowerCase()) ? v : (l + ' ' + v);
  }
  function renderSf9AddressLines(value) {
    return text(value).split(/\r?\n/).map(x => text(x)).filter(Boolean).map(x => `<div>${esc(x)}</div>`).join('');
  }
  function renderSf9HeaderBlock() {
    const region = sf9PrefixLine('Region', getHeaderField('region'));
    const division = sf9PrefixLine('Schools Division of', getHeaderField('division'));
    const school = text(getHeaderField('school'));
    const district = sf9PrefixLine('District', getHeaderField('district'));
    const address = renderSf9AddressLines(getHeaderField('schoolAddress'));
    return `<div class="sf9-report-head"><div>Republic of the Philippines</div><div>Department of Education</div>${region ? `<div>${esc(region)}</div>` : ''}${division ? `<div>${esc(division)}</div>` : ''}${school ? `<div class="sf9-school-name"><b>${esc(school)}</b></div>` : ''}${district ? `<div>${esc(district)}</div>` : ''}${address}</div>`;
  }
  function sf9InfoCell(label, value, extraClass) {
    return `<span class="sf9-info-line ${extraClass || ''}"><span class="sf9-info-label">${esc(label)}</span><span class="sf9-info-value">${esc(value || '')}</span></span>`;
  }
  function schoolYear() { return getHeaderField('schoolYear') || text((state.gradeData || {}).schoolYear) || ''; }
  function isG12Transition() { return gradeLevelNumber() === 12 && /2026\D*2027/.test(schoolYear()); }
  function getTrack() { return [getHeaderField('track'), getHeaderField('strand'), readSf1TrackStrandMeta(), text((state.gradeData || {}).trackStrand), text((state.gradeData || {}).track), text((state.gradeData || {}).strand), subjectList(state.gradeData).map(subjectName).join(' ')].join(' '); }

  function hasQ4Evidence() {
    const gd = state.gradeData || {};
    if (gd.periodCount === 4 || gd.termCount === 4 || gd.quarterCount === 4 || gd.academicStructure === 'fourQuarter' || gd.academicStructure === 'fourTerm') return true;
    const meta = state.meta || {};
    if (meta.periodCount === 4 || meta.termCount === 4 || meta.quarterCount === 4) return true;
    if (Array.isArray(gd.periodKeys) && gd.periodKeys.includes('q4')) return true;
    if (Array.isArray(gd.termKeys) && gd.termKeys.includes('q4')) return true;
    const subjects = subjectList(gd);
    if (subjects.some(sub => sub && sub.termVisibility && sub.termVisibility.q4 === true)) return true;
    const grades = gd.grades || {};
    for (const lid of Object.keys(grades)) {
      const bySubject = grades[lid] || {};
      for (const sid of Object.keys(bySubject)) if (bySubject[sid] && bySubject[sid].q4 != null && text(bySubject[sid].q4) !== '') return true;
    }
    try {
      const payloads = readClassRecordPayloadsForSf9();
      if (payloads.some(p => p && (p.term4 || (p.terms && p.terms.term4) || (p.termData && p.termData.term4)))) return true;
    } catch (_) {}
    return false;
  }
  function usesThreeTermSystem() {
    const gd = state.gradeData || {}, meta = state.meta || {};
    const s = [
      gd.academicStructure, gd.periodLabelMode, gd.gradeMode, gd.structure, gd.periodType,
      meta.academicStructure, meta.periodLabelMode, meta.gradeMode, meta.structure, meta.periodType
    ].map(text).join(' ').toLowerCase();
    if (gd.periodCount === 3 || gd.termCount === 3 || gd.quarterCount === 3 || meta.periodCount === 3 || meta.termCount === 3 || meta.quarterCount === 3) return true;
    if (Array.isArray(gd.periodKeys) && gd.periodKeys.length === 3 && !gd.periodKeys.includes('q4')) return true;
    if (Array.isArray(gd.termKeys) && gd.termKeys.length === 3 && !gd.termKeys.includes('q4')) return true;
    return /modified\s*three|three\s*term|3\s*term|trimester|trimestral|term\s*system/.test(s);
  }
  function getSf9PeriodKeys() {
    const g = gradeLevelNumber();
    if (isG12Transition() || usesThreeTermSystem()) return ['q1','q2','q3'];
    if (g && g >= 4 && g <= 10) return ['q1','q2','q3','q4'];
    return hasQ4Evidence() ? ['q1','q2','q3','q4'] : ['q1','q2','q3'];
  }
  function appUsesQuarterLabels() {
    const gd = state.gradeData || {}, g = gradeLevelNumber();
    const s = [gd.academicStructure, gd.periodLabelMode, gd.gradeMode, state.meta && state.meta.periodLabelMode].map(text).join(' ').toLowerCase();
    if (usesThreeTermSystem()) return false;
    if (g && g >= 4 && g <= 10) return true;
    return /quarter|fourquarter/.test(s);
  }
  function periodCaptionBase() { return appUsesQuarterLabels() ? 'Quarter' : 'Term'; }
  function periodGroupCaption() { return periodCaptionBase().toUpperCase(); }
  function getSf9PeriodLabels() { return getSf9PeriodKeys().map((_, i) => periodCaptionBase() + ' ' + (i + 1)); }
  function getPeriodShortLabels() { return getSf9PeriodKeys().map((_, i) => String(i + 1)); }
  function periodsForSubject(s) { const tv = s && s.termVisibility || {}; return getSf9PeriodKeys().filter(q => tv[q] !== false); }
  function storedSubjectFinalForLearner(learner, s) {
    const row=gradeRowForLearner(learner);
    const entry = (row && row[s && s.id]) || {};
    const candidates = ['finalGrade','final','finalRating','finalAverage','average','fg','yearFinal','annualFinal'];
    for (const k of candidates) { const v = toGrade(entry[k]); if (Number.isInteger(v)) return v; }
    return null;
  }
  function finalForLearnerSubject(learner, s) {
    const stored = storedSubjectFinalForLearner(learner, s);
    if (Number.isInteger(stored)) return stored;
    const vals = periodsForSubject(s).map(q => getGradeForLearner(learner, s.id, q)).filter(Number.isInteger);
    return vals.length ? avg(vals) : null;
  }
  function storedSubjectFinal(lid, s) { return storedSubjectFinalForLearner({learnerId:lid}, s); }
  function finalForSubject(lid, s) { return finalForLearnerSubject({learnerId:lid}, s); }
function descriptor(g) { if (!Number.isInteger(g)) return ''; if (g >= 90) return 'Advancing'; if (g >= 80) return 'Benchmarking'; if (g >= 75) return 'Connecting'; if (g >= 65) return 'Developing'; return 'Emerging'; }
  function remarks(g) { return Number.isInteger(g) ? (g >= PASSING_GRADE ? 'Passed' : 'Failed') : ''; }
  function promotion(ga, fgs) { if (!Number.isInteger(ga)) return ''; const fail = (fgs || []).filter(v => Number.isInteger(v) && v < PASSING_GRADE).length; if (ga < PASSING_GRADE || fail >= 2) return 'RETAINED'; if (fail >= 1) return 'REMEDIAL CLASS'; return 'PROMOTED'; }
  function award(ga, fgs, derog) { if (derog || !Number.isInteger(ga) || !fgs.length || fgs.some(v => !Number.isInteger(v) || v < 80)) return ''; if (ga >= 98) return 'WITH HIGHEST HONORS'; if (ga >= 95) return 'WITH HIGH HONORS'; if (ga >= 90) return 'WITH HONORS'; return ''; }

  function learnerRecordFor(learner){
    const gd=state.gradeData||{}, recs=gd.learnerRecords||{};
    for(const id of sf9LearnerIdCandidates(learner)) if(recs[id]) return recs[id];
    return {};
  }
  function buildGradeReport() {
    const gd = state.gradeData || {}, subs = subjectList(gd), periodKeys = getSf9PeriodKeys();
    const rows = state.roster.map((l,i) => {
      const subjectRows = subs.map(s => {
        const termGrades = {};
        periodKeys.forEach(q => termGrades[q] = getGradeForLearner(l, s.id, q));
        const fg = finalForLearnerSubject(l, s);
        return Object.assign({subjectId:s.id, subjectName:subjectName(s), teacher:text(s.teacher), finalGrade:fg, remarks:remarks(fg), complete:Number.isInteger(fg)}, termGrades);
      });
      const required = subs.filter(s => periodsForSubject(s).length > 0);
      const complete = required.length > 0 && required.every(s => Number.isInteger(finalForLearnerSubject(l, s)));
      const fgs = complete ? required.map(s => finalForLearnerSubject(l, s)) : [];
      let ga = null;
      const lr = learnerRecordFor(l);
      if (complete) ga = toGrade(lr.generalAverage || lr.ga || lr.finalAverage) ?? avg(fgs);
      const derog = !!(lr.derogatory || lr.derogatoryFlag || lr.disciplinaryFlag);
      return { learner:l, index:i+1, learnerId:l.learnerId, name:l.name, lrn:l.lrn, sex:l.sex, subjectRows, generalAverage:ga, descriptor:complete ? descriptor(ga) : '', promotion:complete ? (lr.promotion || promotion(ga, fgs)) : '', rank:'', academicAward:complete ? (lr.academicAward || award(ga, fgs, derog)) : '', derogatory:derog, complete };
    });
    rows.filter(r => r.complete && Number.isInteger(r.generalAverage)).sort((a,b)=>b.generalAverage-a.generalAverage || a.name.localeCompare(b.name)).forEach((r,i,a) => { r.rank = i && r.generalAverage === a[i-1].generalAverage ? a[i-1].rank : i + 1; });
    return rows;
  } function resolveSf9Policy() {
    return { templateMode:'grades4to12', periodLabels:getSf9PeriodLabels(), gradeMode:'numeric', transitionNote:isG12Transition() ? 'Grade 12 transition: display uses GradeSheet/ClassRecord computed grades; source grading weights are handled outside SF9.' : '' };
  }
  function toMatchNameList(value) {
    if (Array.isArray(value)) return value;
    if (value == null || value === '') return [];
    return [value];
  }
  function row(displayName, matchNames, extra={}) {
    const normalizedExtra = Object.assign({}, extra || {});
    if (Object.prototype.hasOwnProperty.call(normalizedExtra, 'matchNames')) {
      normalizedExtra.matchNames = toMatchNameList(normalizedExtra.matchNames);
    }
    return Object.assign({displayName, matchNames:toMatchNameList(matchNames), sourceSubjectId:'', isGroupHeader:false, isParentSubject:false, children:[]}, normalizedExtra);
  }
  function buildThreeTermDynamicRows(gd) {
    const subs = subjectList(gd);
    const mapehSubject = subs.find(s => subjectMatches(s, 'mapeh')) || null;
    const musicArtsSubject = subs.find(s => subjectMatches(s, 'musicArts')) || null;
    const peHealthSubject = subs.find(s => subjectMatches(s, 'peHealth')) || null;
    const mapehId = mapehSubject && mapehSubject.id;
    const musicArtsId = musicArtsSubject && musicArtsSubject.id;
    const peHealthId = peHealthSubject && peHealthSubject.id;
    const childIds = new Set([musicArtsId, peHealthId].filter(Boolean));
    const childRows = [
      row('Music and Arts', 'musicArts', musicArtsId ? {sourceSubjectId:musicArtsId} : {}),
      row('Physical Education and Health', 'peHealth', peHealthId ? {sourceSubjectId:peHealthId} : {})
    ];
    const rows = [];
    let insertedMapeh = false;
    subs.forEach(s => {
      if (!s || !s.id) return;
      if (mapehId && childIds.has(s.id)) return;
      if (mapehId && s.id === mapehId) {
        rows.push(row(subjectName(s) || 'MAPEH', 'mapeh', {sourceSubjectId:s.id, isParentSubject:true, children:childRows}));
        insertedMapeh = true;
        return;
      }
      if (!mapehId && childIds.has(s.id)) {
        if (!insertedMapeh) {
          rows.push(row('MAPEH', 'mapeh', {isParentSubject:true, children:childRows}));
          insertedMapeh = true;
        }
        return;
      }
      rows.push(row(subjectName(s), [subjectName(s)], {sourceSubjectId:s.id}));
    });
    if (!insertedMapeh && (mapehSubject || musicArtsSubject || peHealthSubject)) rows.push(row('MAPEH', 'mapeh', {sourceSubjectId:mapehId || '', isParentSubject:true, children:childRows}));
    return rows;
  }
  function resolveSubjectDisplayProfile(context, gradeSheetData) {
    const g = Number(context.gradeLevel || gradeLevelNumber() || 0), tr = normalizeSubjectName(context.track || getTrack()), subs = subjectList(gradeSheetData), notes=[];
    if (usesThreeTermSystem() && subs.length) return { profile:'THREE_TERM_DYNAMIC_SUBJECTS_PAIRED_MAPEH', title:'Three-Term Subject Display', groups:[{label:'', rows:buildThreeTermDynamicRows(gradeSheetData)}], notes };
    const tech = /tech\s*pro|technical|tvl/.test(tr) || subs.some(s => subjectMatches(s,'techpro'));
    const academic = /academic|abm|humss|stem|gas/.test(tr) || subs.some(s => subjectMatches(s,'academicElective'));
    if (g >= 4 && g <= 10) {
      const eppLabel = g >= 7 ? 'TLE' : (g <= 6 ? 'EPP' : 'EPP / TLE');
      const gmrcLabel = g <= 6 ? 'GMRC' : (g >= 7 ? 'Values Education' : 'GMRC / Values Education');
      const baseRows = [
        row('Filipino','filipino'),
        row('English','english'),
        row('Mathematics','mathematics'),
        row('Science','science'),
        row('Araling Panlipunan (AP)','ap'),
        row(gmrcLabel,'gmrc'),
        row(eppLabel,'eppTle'),
        row('MAPEH','mapeh',{isParentSubject:true, children:[row('Music and Arts','musicArts'), row('Physical Education and Health','peHealth')]})
      ];
      const used = new Set();
      const probe = { subjectRows: subs.map(x => ({subjectId:x.id, subjectName:subjectName(x)})) };
      baseRows.forEach(r => { const found = findReportSubject(probe, r); if (found && found.subjectId) used.add(found.subjectId); });
      subs.forEach(s => {
        if (!s || !s.id || used.has(s.id)) return;
        if (subjectMatches(s,'mapeh') || subjectMatches(s,'musicArts') || subjectMatches(s,'peHealth')) return;
        baseRows.push(row(subjectName(s), [subjectName(s)], {sourceSubjectId:s.id}));
      });
      return { profile:'G4_10_BASE_PLUS_GRADESHEET', title:'Grades 4 to 10 Performance Report', groups:[{label:'', rows:baseRows}], notes };
    } if (g === 11 && !tech) return { profile:'G11_ACADEMIC', title:'Grade 11 Academic Track', groups:[{label:'Core Subjects', rows:[row('Effective Communication / Mabisang Komunikasyon','effectiveCommunication',{isParentSubject:true, children:[row('Effective Communication',['effective communication']), row('Mabisang Komunikasyon',['mabisang komunikasyon'])]}), row('General Mathematics',['general mathematics','mathematics']), row('General Science',['general science','science']), row('Life and Career Skills','lifeCareer'), row('Pag-aaral ng Kasaysayan at Lipunang Pilipino','pklp')]},{label:'Elective Subjects', rows:electiveRows(gradeSheetData,'academicElective','Academic Elective',3)}], notes };
    if (g === 11 && tech) return { profile:'G11_TECHPRO', title:'Grade 11 TechPro Track', groups:[{label:'Core Subjects', rows:[row('Effective Communication / Mabisang Komunikasyon','effectiveCommunication',{isParentSubject:true, children:[row('Effective Communication',['effective communication']), row('Mabisang Komunikasyon',['mabisang komunikasyon'])]}), row('General Mathematics',['general mathematics','mathematics']), row('General Science',['general science','science']), row('Life and Career Skills','lifeCareer'), row('Pag-aaral ng Kasaysayan at Lipunang Pilipino','pklp')]},{label:'Elective Subjects', rows:electiveRows(gradeSheetData,'techpro','TechPro Elective',1, true)}], notes };
    if (g === 12 && isG12Transition()) return dynamicProfile('G12_MODIFIED_THREE_TERM_GRID', gradeSheetData);
    if (g === 12 && academic) return { profile:'SHS_DYNAMIC', title:'Grade 12 Academic Track', groups:[{label:'Elective Subjects', rows:electiveRows(gradeSheetData,'academicElective','Academic Elective',9, true, 4)}], notes };
    if (g >= 11) return dynamicProfile('SHS_DYNAMIC', gradeSheetData);
    return dynamicProfile('CUSTOM_FROM_GRADESHEET', gradeSheetData);
  }
  function electiveRows(gd, key, base, count, preserveAll, startNo) { const found = subjectList(gd).filter(s => subjectMatches(s, key)); const rows = (preserveAll && found.length ? found : found.slice(0, count)).map(s => row(subjectName(s), [subjectName(s)], {sourceSubjectId:s.id})); const min = preserveAll && found.length ? found.length : count; for (let i = rows.length; i < min; i++) rows.push(row(base + ' ' + ((startNo || 1) + i), key)); return rows; }
  function dynamicProfile(profile, gd) { const groups = {}; subjectList(gd).forEach(s => { const n = normalizeSubjectName(subjectName(s)); let g = 'Subjects'; if (/core/.test(n)) g='Core Subjects'; else if (/tech\s*pro/.test(n)) g='TechPro Electives'; else if (/elective|academic/.test(n)) g='Elective Subjects'; else if (/research/.test(n)) g='Research'; else if (/design|innovation/.test(n)) g='Design and Innovation'; else if (/work immersion/.test(n)) g='Work Immersion'; else if (/field exposure/.test(n)) g='Field Exposure'; else if (/arts apprenticeship/.test(n)) g='Arts Apprenticeship'; groups[g] = groups[g] || []; groups[g].push(row(subjectName(s), [subjectName(s)], {sourceSubjectId:s.id})); }); return {profile, title:'Custom GradeSheet Subject Display', groups:Object.keys(groups).map(k => ({label:k, rows:groups[k]})), notes:[]}; }

  function findReportSubject(learnerReport, displayRow) {
    if (!learnerReport || !displayRow) return null;
    const subjectRows = Array.isArray(learnerReport.subjectRows) ? learnerReport.subjectRows : [];
    if (displayRow.sourceSubjectId) return subjectRows.find(r => r.subjectId === displayRow.sourceSubjectId) || null;
    const names = toMatchNameList(displayRow.matchNames);
    if (!names.length) return null;
    return subjectRows.find(r => names.some(n => subjectMatches({name:r.subjectName}, [n]))) || null;
  }
  function classRecordNorm(v) { return text(v).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' '); }
  function normalizeMapehComponentName(v) {
    const s = normalizeSubjectName(v);
    if (!s) return '';
    if (/music|arts/.test(s)) return 'musicArts';
    if (/physical|\bpe\b|p e|health/.test(s)) return 'peHealth';
    return '';
  }
  function findMapehParentSubject(gd){
  return subjectList(gd).find(s=>subjectMatches(s,'mapeh'))||null;
}
function gradeSheetLearnerIdCandidates(learnerReport){
  const learner=learnerReport&&(learnerReport.learner||learnerReport)||{};
  const ids=[learnerReport&&learnerReport.learnerId, learner.learnerId, learner.id, learner.studentId, learner.lrn, learner.LRN].map(text).filter(Boolean);
  const gd=state.gradeData||{};
  const roster=Array.isArray(gd.roster)?gd.roster:[];
  const wantedName=classRecordNorm(learner.name||learnerReport&&learnerReport.name);
  const wantedSex=normalizeSex(learner.sex||learnerReport&&learnerReport.sex).toLowerCase();
  roster.forEach(r=>{
    const rid=[r&&r.learnerId,r&&r.id,r&&r.studentId,r&&r.lrn,r&&r.LRN].map(text).filter(Boolean);
    const idHit=rid.some(x=>ids.includes(x));
    const nameHit=wantedName&&classRecordNorm(r&&r.name)===wantedName&&(!wantedSex||normalizeSex(r&&r.sex).toLowerCase()===wantedSex);
    if(idHit||nameHit) ids.push(...rid);
  });
  return Array.from(new Set(ids));
}
function findGradeSheetMapehComponentBucket(comps,lid,parentId,componentKey){
  const byLearner=comps&&comps[lid];
  if(!byLearner) return null;
  if(parentId&&byLearner[parentId]&&byLearner[parentId][componentKey]) return byLearner[parentId];
  for(const sid of Object.keys(byLearner)){
    const bucket=byLearner[sid];
    if(bucket&&bucket[componentKey]) return bucket;
  }
  return null;
}
function gradeSheetManualMapehComponentGrade(learnerReport,componentKey,q){
  const gd=state.gradeData||{};
  const comps=gd.mapehComponents||{};
  const parent=findMapehParentSubject(gd);
  const parentId=parent&&parent.id;
  const lids=gradeSheetLearnerIdCandidates(learnerReport);
  for(const lid of lids){
    const bucket=findGradeSheetMapehComponentBucket(comps,lid,parentId,componentKey);
    const v=toGrade(bucket&&bucket[componentKey]&&bucket[componentKey][q]);
    if(Number.isInteger(v)) return v;
  }
  return null;
}
function buildMapehComponentSubjectFromGradeSheet(learnerReport,componentKey,label){
  const termGrades={};
  getSf9PeriodKeys().forEach(q=>termGrades[q]=gradeSheetManualMapehComponentGrade(learnerReport,componentKey,q));
  const vals=getSf9PeriodKeys().map(q=>termGrades[q]).filter(Number.isInteger);
  if(!vals.length) return null;
  const fg=avg(vals);
  return Object.assign({subjectId:'__gs_'+componentKey, subjectName:label, finalGrade:fg, remarks:remarks(fg), source:'gradeSheetMapehComponent'}, termGrades);
}
function getClassRecordTermKey(q) { return ({q1:'term1', q2:'term2', q3:'term3', q4:'term4'}[q] || q || 'term1'); }
  function classRecordMatchesSf9Class(header) {
    const h = header || {};
    const sf9ClassId = slug(state.classId || window.currentClassId || '');
    const headerClassId = slug(h.classId || '');
    if (sf9ClassId && headerClassId && sf9ClassId === headerClassId) return true;
    const sf9ClassName = classRecordNorm(state.className || window.currentClassName || '');
    const headerClassName = classRecordNorm(h.className || h.section || '');
    return !!(sf9ClassName && headerClassName && (sf9ClassName === headerClassName || sf9ClassName.includes(headerClassName) || headerClassName.includes(sf9ClassName)));
  }
  function classRecordSchoolYearMatches(header) {
    const expected = schoolYear();
    const actual = text(header && header.schoolYear);
    return !expected || !actual || expected === actual;
  }
  function readClassRecordPayloadsForSf9() {
    const out = [];
    try {
      const wantId = slug(state.classId || '');
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i) || '';
        if (!/(classrecord|class-record|class_record|cr-)/i.test(key) || /index::/i.test(key)) continue;
        let payload = null;
        try { payload = safeStoredJson(localStorage.getItem(key) || 'null', null); } catch (_) { payload = null; }
        if (!payload || typeof payload !== 'object') continue;
        const h = payload.recordHeader || payload.header || payload.classHeader || {};
        const keyMatchesClass = !!(wantId && slug(key).includes(wantId));
        if (!keyMatchesClass && !classRecordMatchesSf9Class(h)) continue;
        if (!classRecordSchoolYearMatches(h)) continue;
        if (!(h.subject || h.subjectName || h.learningArea || h.recordLabel || h.mapehComponent || payload.term1 || payload.term2 || payload.term3 || payload.finalSummary || payload.learners || payload.terms || payload.termData)) continue;
        out.push(Object.assign({__storageKey:key}, payload));
      }
    } catch (_) {}
    return out;
  }
  function findClassRecordComponentRecords(componentKey) {
    return readClassRecordPayloadsForSf9().filter(payload => {
      const h = payload && payload.recordHeader || {};
      const component = text(h.mapehComponent) || normalizeMapehComponentName(h.subject || h.recordLabel);
      return component === componentKey;
    });
  }
  function learnerMatchesClassRecordRow(learnerReport, row) {
    const learner = learnerReport && learnerReport.learner || learnerReport || {};
    const wantedIds = [learnerReport && learnerReport.learnerId, learner.learnerId, learner.id, learner.studentId, learner.lrn].map(text).filter(Boolean);
    const rowIds = [row && row.learnerId, row && row.id, row && row.studentId, row && row.lrn].map(text).filter(Boolean);
    if (wantedIds.length && rowIds.some(id => wantedIds.includes(id))) return true;
    const a = classRecordNorm(learner.name) + '|' + normalizeSex(learner.sex).toLowerCase();
    const b = classRecordNorm(row && row.name) + '|' + normalizeSex(row && row.sex).toLowerCase();
    return !!(classRecordNorm(learner.name) && classRecordNorm(row && row.name) && a === b);
  }
  function extractClassRecordGrade(row, termKey) {
    if (!row) return null;
    if (row.termGrades && row.termGrades[termKey] != null) return toGrade(row.termGrades[termKey]);
    const computed = row.computed || row.finalResult || {};
    return toGrade(computed.finalDisplayedNumeric ?? computed.termGrade ?? row.finalGrade ?? row.finalDisplayedNumeric ?? row.termGrade);
  }
  function componentGradeFromClassRecord(learnerReport, componentKey, q) {
    const termKey = getClassRecordTermKey(q);
    const records = findClassRecordComponentRecords(componentKey);
    for (const record of records) {
      const termRows = record && record[termKey] && Array.isArray(record[termKey].learners) ? record[termKey].learners : [];
      const row = termRows.find(r => learnerMatchesClassRecordRow(learnerReport, r));
      const v = extractClassRecordGrade(row, termKey);
      if (Number.isInteger(v)) return v;
      const finalRows = record && record.finalSummary && Array.isArray(record.finalSummary.learners) ? record.finalSummary.learners : [];
      const finalRow = finalRows.find(r => learnerMatchesClassRecordRow(learnerReport, r));
      const fv = extractClassRecordGrade(finalRow, termKey);
      if (Number.isInteger(fv)) return fv;
    }
    return null;
  }
  function buildMapehComponentSubjectFromClassRecord(learnerReport, componentKey, label) {
    const termGrades = {};
    getSf9PeriodKeys().forEach(q => termGrades[q] = componentGradeFromClassRecord(learnerReport, componentKey, q));
    const vals = getSf9PeriodKeys().map(q => termGrades[q]).filter(Number.isInteger);
    if (!vals.length) return null;
    const fg = avg(vals);
    return Object.assign({subjectId:'__cr_' + componentKey, subjectName:label, finalGrade:fg, remarks:remarks(fg), source:'classRecordMapehComponent'}, termGrades);
  }
  function findMapehChildSubject(learnerReport, childRow) {
  const direct = findReportSubject(learnerReport, childRow);
  if (direct) return direct;
  const componentKey = normalizeMapehComponentName(childRow && childRow.displayName);
  if (!componentKey) return null;
  const fromGradeSheet = buildMapehComponentSubjectFromGradeSheet(learnerReport, componentKey, childRow.displayName);
  if (fromGradeSheet) return fromGradeSheet;
  return buildMapehComponentSubjectFromClassRecord(learnerReport, componentKey, childRow.displayName);
}
function computeMapehParent(displayProfile, learnerReport, gradeSheetData) {
  const ma = findMapehChildSubject(learnerReport, row('Music and Arts','musicArts'));
  const peh = findMapehChildSubject(learnerReport, row('Physical Education and Health','peHealth'));
  if (ma && peh) {
    const termGrades = {};
    getSf9PeriodKeys().forEach(q => {
      termGrades[q] = (Number.isInteger(ma[q]) && Number.isInteger(peh[q])) ? avg([ma[q], peh[q]]) : null;
    });
    const vals = getSf9PeriodKeys().map(q => termGrades[q]).filter(Number.isInteger);
    if (vals.length) {
      const fg = avg(vals);
      return Object.assign({subjectId:'__mapeh_avg', subjectName:'MAPEH', finalGrade:fg, remarks:remarks(fg), source:'mapehPairedAverage'}, termGrades);
    }
  }
  const own = findReportSubject(learnerReport, row('MAPEH','mapeh'));
  if (own) return own;
  return null;
} function buildSubjectRowsForLearner(displayProfile, learnerReport, gradeSheetData) {
    const out=[], periodKeys = getSf9PeriodKeys();
    (displayProfile.groups || []).forEach(g => {
      if (g.label) out.push({type:'group', label:g.label});
      (g.rows || []).forEach(r => {
        let sr = r.displayName === 'MAPEH' ? computeMapehParent(displayProfile, learnerReport, gradeSheetData) : findReportSubject(learnerReport, r);
        const base = {type:r.isParentSubject?'parent':'subject', label:r.displayName, subjectId:sr && sr.subjectId || '', finalGrade:sr && sr.finalGrade, remarks:sr && sr.remarks || ''};
        periodKeys.forEach(q => base[q] = sr && sr[q]);
        out.push(base);
        (r.children || []).forEach(c => {
          const cr = findMapehChildSubject(learnerReport, c);
          const child = {type:'child', label:c.displayName, indent:true, subjectId:cr && cr.subjectId || '', finalGrade:cr && cr.finalGrade, remarks:cr && cr.remarks || ''};
          periodKeys.forEach(q => child[q] = cr && cr[q]);
          out.push(child);
        });
      });
    });
    out.push({type:'general-average', label:'General Average', finalGrade:learnerReport && learnerReport.generalAverage, remarks:learnerReport && learnerReport.promotion});
    return out;
  }
  function isG12ModifiedThreeTermGrid() { return gradeLevelNumber() === 12 && /2026\D*2027/.test(schoolYear()); }
  function termSubjectRowsForLearner(learnerReport, termKey) {
    const gd = state.gradeData || {};
    const termIndex = getSf9PeriodKeys().indexOf(termKey) + 1 || 1;
    return subjectList(gd).filter(s => periodsForSubject(s).includes(termKey)).map(s => {
      const subjectRow = (learnerReport.subjectRows || []).find(r => r.subjectId === s.id) || {};
      const g = toGrade(subjectRow[termKey] ?? getGradeForLearner(learnerReport.learner||learnerReport, s.id, termKey));
      return { subjectId:s.id, subjectName:subjectName(s), termIndex, grade:g, remarks:remarks(g) };
    });
  }
  function renderG12ModifiedThreeTermSubjectGrid(learnerReport) {
    const termKeys = getSf9PeriodKeys(), termLabels = getSf9PeriodLabels().map(x => x.toUpperCase());
    const sections = termKeys.map((termKey, i) => {
      const rows = termSubjectRowsForLearner(learnerReport, termKey);
      const body = rows.length ? rows.map(r => `<tr><td>${esc(r.subjectName)}</td><td>${show(r.grade)}</td><td>${esc(r.remarks || '')}</td></tr>`).join('') : '<tr><td colspan="3">&nbsp;</td></tr>';
      const header = i === 0 ? '<tr class="sf9-term-columns"><th>Subjects</th><th>Final Grade</th><th>Remarks</th></tr>' : '';
      return `<tr class="sf9-term-title"><th colspan="3">${termLabels[i]}</th></tr>${header}${body}`;
    }).join('');
    return `<table class="sf9-table sf9-term-grid"><tbody>${sections}<tr class="sf9-ga"><td>General Average</td><td>${show(learnerReport.generalAverage)}</td><td>${esc(learnerReport.promotion || '')}</td></tr></tbody></table>`;
  }
  function parseDateKey(k) { const m = String(k).match(/^attendance-(\d{4}-\d{2}-\d{2})-(.+)$/); return m ? m[1] : ''; }
  function normalizeStatus(v) { return text(v && (v.status || v.value || v.code) || v).toUpperCase(); }
  function attendanceStatusFor(payload, learnerId, date) {
    try { if (window.CTMAttendanceV2 && typeof window.CTMAttendanceV2.getStatus === 'function') return normalizeStatus(window.CTMAttendanceV2.getStatus(state.classId, date, learnerId)); } catch (_) {}
    if (!payload) return '';
    if (payload[learnerId]) return normalizeStatus(payload[learnerId]);
    if (payload.statuses && payload.statuses[learnerId]) return normalizeStatus(payload.statuses[learnerId]);
    if (payload.records && payload.records[learnerId]) return normalizeStatus(payload.records[learnerId]);
    if (Array.isArray(payload)) { const r = payload.find(x => [x.learnerId,x.id,x.lrn].map(text).includes(text(learnerId))); return normalizeStatus(r); }
    return '';
  }
  function summarizeAttendanceForLearner(learnerId) {
    const months = {};
    try { for (let i=0; i<localStorage.length; i++) { const key = localStorage.key(i) || ''; if (!key.startsWith('attendance-') || !key.endsWith('-' + state.classId)) continue; const date = parseDateKey(key); if (!date || localStorage.getItem('nsd-' + date + '-' + state.classId)) continue; let payload=null; try { payload=JSON.parse(localStorage.getItem(key) || 'null'); } catch (_) { payload=localStorage.getItem(key); } const st = attendanceStatusFor(payload, learnerId, date); if (!st || st === 'NSD') continue; const ym = date.slice(0,7); months[ym] = months[ym] || {month:ym, classDays:0, present:0, absent:0, pending:0}; months[ym].classDays++; if (['PRESENT','TARDY','EXCUSE','EXCUSED'].includes(st)) months[ym].present++; else if (['ABSENT','CUTTING'].includes(st)) months[ym].absent++; else if (st === 'PENDING') months[ym].pending++; } } catch (_) {}
    return Object.values(months).sort((a,b)=>a.month.localeCompare(b.month));
  }
  function perfectAttendance(summary) { return summary.length > 0 && summary.every(m => m.classDays > 0 && m.absent === 0 && m.pending === 0); }

  function coreValueIdCandidatesForLearnerReport(learnerReport) {
    const l = learnerReport && (learnerReport.learner || learnerReport) || {};
    const ids = [learnerReport && learnerReport.learnerId, l.learnerId, l.studentId, l.id, l.lrn, l.LRN].map(text).filter(Boolean);
    return Array.from(new Set(ids));
  }
  function mergeCoreValuesForLearnerReport(learnerReport) {
    const store = (state.meta && state.meta.learnerCoreValues) || {};
    const out = {};
    coreValueIdCandidatesForLearnerReport(learnerReport).forEach(id => {
      const saved = store[id] || {};
      Object.keys(saved).forEach(rowKey => {
        out[rowKey] = Object.assign(out[rowKey] || {}, saved[rowKey] || {});
      });
    });
    return out;
  }
  function coreValueAo(value) {
    const v = text(value).toUpperCase();
    return v === 'AO' || v === 'ALWAYS OBSERVED';
  }
  function captureCurrentCoreValuesEditor() {
    const lid = state.selectedLearnerId;
    if (!lid || !dom.sf9CoreValuesEditor) return;
    const selects = dom.sf9CoreValuesEditor.querySelectorAll('select[data-sf9-core-row]');
    if (!selects || !selects.length) return;
    state.meta.learnerCoreValues = state.meta.learnerCoreValues || {};
    const next = {};
    selects.forEach(el => {
      const row = el.getAttribute('data-sf9-core-row');
      const q = el.getAttribute('data-sf9-core-period');
      if (!row || !q) return;
      next[row] = next[row] || {};
      next[row][q] = el.value || '';
    });
    state.meta.learnerCoreValues[lid] = next;
  }
  function conductAwardQualified(learnerReport) {
    if (!learnerReport) return false;
    if (learnerReport.learnerId === state.selectedLearnerId) captureCurrentCoreValuesEditor();
    const saved = mergeCoreValuesForLearnerReport(learnerReport);
    const periods = getSf9PeriodKeys();
    if (!periods.length) return false;
    return CORE_VALUE_ROWS.every(r => {
      const row = saved[r.key] || {};
      return periods.every(q => coreValueAo(row[q]));
    });
  }

  function ensureCss() {
    if ($id('ctm-sf9-style')) return;
    const style = document.createElement('style');
    style.id = 'ctm-sf9-style';
    style.textContent = `
#sf9Modal{z-index:3000;background:rgba(15,23,42,.72);padding:0!important;margin:0!important;overflow-y:auto;-webkit-overflow-scrolling:touch;font-family:\"Aptos\",\"Segoe UI\",Arial,Helvetica,sans-serif}
#sf9Modal .sf9-modal-content{position:relative;box-sizing:border-box;width:100vw;max-width:100vw!important;height:100dvh;min-height:100dvh;max-height:100dvh;margin:0!important;border-radius:0!important;padding:0!important;overflow:auto;overflow-x:hidden;background:#fff}
.sf9-head{position:sticky;top:0;z-index:100;width:100%;box-sizing:border-box;display:flex;flex-direction:column;justify-content:flex-start;gap:.5rem;align-items:stretch;background:#bde3fc!important;padding:10px 8px 8px 8px!important;margin:0!important;border-radius:0!important;border-bottom:0!important;box-shadow:0 4px 12px rgba(0,0,0,.08)}
.sf9-head-main{display:flex;justify-content:space-between;gap:.75rem;align-items:flex-start;width:100%}.sf9-head h2{margin:0;font-size:1rem;line-height:1.15}.sf9-close-x{flex:0 0 auto;margin:0!important;align-self:flex-start;padding:.25rem .6rem!important;border-radius:12px!important;width:auto!important;height:auto!important;min-width:2.1rem;font-size:1rem;font-weight:900;line-height:1;display:inline-flex;align-items:center;justify-content:center}.sf9-muted{color:#64748b;font-size:.78rem}.sf9-tabs{display:flex;gap:.3rem;flex-wrap:wrap;width:100%;box-sizing:border-box;margin:0!important;padding:0!important;border-radius:0!important}.sf9-tab{background:#eef2ff;color:#334155;padding:.4rem .55rem;border-radius:10px;font-size:.85rem}.sf9-tab.active{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff}.sf9-sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}.sf9-panel{display:none;box-sizing:border-box;padding:.55rem .65rem}.sf9-panel.active{display:block}.sf9-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.4rem;margin:.4rem 0}.sf9-grid-wide{grid-column:1/-1}.sf9-grid label{display:grid;gap:.15rem;font-size:.78rem}.sf9-grid input,.sf9-grid textarea,.sf9-toolbar select,.sf9-comments-editor textarea,.sf9-core-values-input select{width:100%;min-width:0;padding:.5rem .65rem;border-radius:10px}.sf9-grid textarea{resize:vertical;min-height:2.6rem}.sf9-check{display:flex;gap:.4rem;align-items:center;margin:.3rem 0;font-size:.85rem}.sf9-toolbar{display:flex;gap:.35rem;align-items:center;flex-wrap:wrap;margin:.35rem 0}.sf9-toolbar select{flex:1 1 240px}.sf9-toolbar button,#sf9BtnSaveSettings,#sf9BtnSaveComments,#sf9BtnPrintAll{padding:.5rem .7rem;border-radius:10px;font-size:.85rem}.sf9-note{background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:.45rem;margin:.35rem 0;color:#9a3412;font-size:.82rem}.sf9-comments-editor{background:#fafbff;border:1px solid #e8ecf4;border-radius:12px;padding:.5rem;margin:.45rem 0}.sf9-comments-editor h3{margin:.05rem 0 .35rem;font-size:.92rem}.sf9-comments-editor textarea{min-height:2.4rem;margin:.18rem 0;resize:vertical}.sf9-screen-warning{background:#fff7ed;border:1px solid #fed7aa;border-radius:12px;padding:.55rem;margin:.35rem 0}
.sf9-page{background:#fff;color:#111;margin:.6rem auto;padding:9mm;box-shadow:0 8px 30px rgba(0,0,0,.18);font:10.5px/1.26 \"Aptos\",\"Segoe UI\",Arial,Helvetica,sans-serif;box-sizing:border-box;break-after:page;page-break-after:always;overflow:hidden}.sf9-page:last-child{break-after:auto;page-break-after:auto}.sf9-title-block{display:block;text-align:center;margin:.12rem 0 .2rem}.sf9-page h1,.sf9-page h2,.sf9-page h3{display:block;margin:.12rem 0;text-align:center;font-family:inherit}.sf9-page h1{font-size:16px}.sf9-page h2{font-size:12px}.sf9-page h3{font-size:11px}.sf9-report-head{text-align:center}.sf9-dear-parents{margin:.28rem 0;text-align:left}.sf9-dear-parents p{margin:.15rem 0}.sf9-line{border-bottom:1px solid #111;display:inline-block;min-width:90px;padding:0 .2rem}.sf9-table{width:100%;border-collapse:collapse;margin:.3rem 0;box-shadow:none;border-radius:0;overflow:visible}.sf9-table th,.sf9-table td{border:1px solid #111;padding:2px 3px;font-size:9.6px;vertical-align:middle;break-inside:avoid;page-break-inside:avoid}.sf9-table tr{break-inside:avoid;page-break-inside:avoid}.sf9-table th{text-align:center;background:#f3f4f6}.sf9-learner-info,.sf9-learner-info th,.sf9-learner-info td{border:0!important;background:transparent!important;box-shadow:none!important}.sf9-learner-info{table-layout:auto;width:auto;max-width:6.25in;margin:.12rem auto .22rem auto}.sf9-learner-info th,.sf9-learner-info td{text-align:left;padding:2px 9px;font-size:10.3px;vertical-align:baseline}.sf9-learner-info td{white-space:nowrap}.sf9-learner-info tr td:first-child{padding-left:0}.sf9-learner-info tr td:last-child{padding-right:0}.sf9-report-head{text-align:center}.sf9-school-name{font-weight:700}.sf9-info-line{display:inline-flex;align-items:baseline;gap:4px;white-space:nowrap;width:auto;max-width:100%}.sf9-info-label{flex:0 0 auto;font-weight:700}.sf9-info-value{display:inline-block;border-bottom:1px solid #111;min-width:0;width:auto;max-width:100%;flex:0 0 auto;padding:0 1px;line-height:1.05}.sf9-info-name .sf9-info-value,.sf9-info-lrn .sf9-info-value,.sf9-info-track .sf9-info-value{min-width:0}.sf9-center{text-align:center}.sf9-right{text-align:right}.sf9-group td{font-weight:bold;background:#f8fafc}.sf9-parent td:first-child{font-weight:bold}.sf9-child td:first-child{padding-left:18px}.sf9-ga td{font-weight:bold}.sf9-term-grid th,.sf9-term-grid td{height:21px}.sf9-term-title th{text-align:left;background:#f3f4f6;font-weight:900;font-size:11px}.sf9-term-columns th{text-align:center;background:#f3f4f6}.sf9-term-grid td:nth-child(1){width:48%}.sf9-term-grid td:nth-child(2){width:28%;text-align:center}.sf9-term-grid td:nth-child(3){width:24%;text-align:center}.sf9-term-grid .sf9-ga td:first-child{text-align:right}.sf9-descriptors{max-width:5.6in;margin-left:auto;margin-right:auto}.sf9-small{font-size:10px}.sf9-debug-note{font-size:9px;color:#555}.sf9-page-break{break-after:page;page-break-after:always}.sf9-signature-cell{height:.45in}.sf9-transfer{width:100%;border-collapse:collapse;margin:.12in 0 .18in 0;table-layout:fixed}.sf9-transfer th,.sf9-transfer td{border:0!important;background:transparent!important;padding:2px 4px;font-size:10.3px;vertical-align:bottom;height:.24in}.sf9-transfer th{font-weight:700;text-align:left}.sf9-transfer .sf9-transfer-line{border-bottom:1px solid #111!important;text-align:center;min-height:.2in}.sf9-transfer .sf9-transfer-spacer{height:.12in}.sf9-transfer .sf9-transfer-caption{border:0!important;text-align:center;font-size:9.6px;padding-top:1px}.sf9-transfer .sf9-transfer-label{white-space:nowrap}.sf9-transfer .sf9-transfer-blank{border-bottom:1px solid #111!important}.sf9-print-note{font-size:10px}
@media(max-width:760px){#sf9Modal .sf9-modal-content{padding:0!important}.sf9-panel{padding:.45rem}.sf9-grid{grid-template-columns:1fr}.sf9-page{width:100%;min-height:auto;padding:.25in;font-size:10px}.sf9-table th,.sf9-table td{font-size:9.5px}}
@media(max-width:480px){.sf9-head{padding-top:max(8px,env(safe-area-inset-top))!important}}
@media print{html,body{margin:0!important;padding:0!important;background:white!important}body *{visibility:hidden!important}#sf9PrintArea,#sf9PrintArea *{visibility:visible!important}#sf9PrintArea{position:absolute;left:0;top:0;width:auto!important;max-width:none!important;margin:0!important;padding:0!important}.sf9-page{box-shadow:none!important;margin:0!important;width:auto!important;min-height:0!important;height:auto!important;padding:0!important;background:white!important;color:black!important;page-break-after:auto!important;break-after:auto!important;overflow:visible!important;display:block!important}.sf9-page+.sf9-page{margin-top:3mm!important}.sf9-page h1,.sf9-page h2,.sf9-page h3{break-after:avoid;page-break-after:avoid}.sf9-table{page-break-inside:auto!important;break-inside:auto!important}.sf9-table tr{page-break-inside:avoid!important;break-inside:avoid!important}.sf9-school-name,.sf9-title-block,.sf9-learner-info,.sf9-dear-parents{break-inside:avoid;page-break-inside:avoid}.sf9-screen-warning,.sf9-comments-editor,.sf9-toolbar,.sf9-note:not(.sf9-print-note),#sf9BtnSaveSettings,#sf9BtnSaveComments,#sf9BtnPrintAll,#sf9BtnPrintSelected,button,input,textarea,select,.sf9-check{display:none!important}.sf9-no-print{display:none!important}}
`;
    (document.head || document.documentElement).appendChild(style);
  }

  const SF9_SHARED_HEADER_FIELDS = {
    adviser: { sf9Id:'sf9Adviser', sharedField:'teacherName', metaGroup:'signatories', metaKey:'adviser', peers:['crTeacher','sf1Teacher','sf2Teacher','sf3Teacher','sf8Teacher'] },
    schoolHead: { sf9Id:'sf9SchoolHead', sharedField:'schoolHead', metaGroup:'signatories', metaKey:'schoolHead', peers:['sf2SchoolHead','sf1SchoolHead','sf3SchoolHead','sf8SchoolHead','schoolHead'] },
    region: { sf9Id:'sf9Region', sharedField:'region', metaGroup:'location', metaKey:'region', peers:['crRegion','sf1Region','sf3Region','sf8Region'] },
    division: { sf9Id:'sf9Division', sharedField:'division', metaGroup:'location', metaKey:'division', peers:['crDivision','sf1Division','sf3Division','sf8Division'] },
    school: { sf9Id:'sf9School', sharedField:'schoolName', metaGroup:'location', metaKey:'school', peers:['crSchoolName','sf1SchoolName','sf2SchoolName','sf3SchoolName','sf8SchoolName','schoolName','school'] },
    district: { sf9Id:'sf9District', sharedField:'district', metaGroup:'location', metaKey:'district', peers:['crDistrict','sf1District','sf3District','sf8District'] },
    schoolAddress: { sf9Id:'sf9SchoolAddress', sharedField:'schoolAddress', metaGroup:'location', metaKey:'schoolAddress', peers:['crSchoolAddress','sf1SchoolAddress','sf2SchoolAddress','sf8SchoolAddress','schoolAddress'] }
  };
  const SF9_SHARED_ID_TO_FIELD = Object.keys(SF9_SHARED_HEADER_FIELDS).reduce((acc, key) => {
    const cfg = SF9_SHARED_HEADER_FIELDS[key];
    acc[cfg.sf9Id] = key;
    (cfg.peers || []).forEach(id => acc[id] = key);
    return acc;
  }, {});
  let sf9SyncBusy = false;
  let sf9SyncSaveTimer = 0;
  let sf9SyncPreviewTimer = 0;
  function sf9SharedText(v) { return String(v == null ? '' : v).replace(/\r\n/g,'\n').trim(); }
  function sf9ReadMetaShared(fieldKey) {
    const cfg = SF9_SHARED_HEADER_FIELDS[fieldKey];
    if (!cfg) return '';
    const group = (state.meta && state.meta[cfg.metaGroup]) || {};
    return sf9SharedText(group[cfg.metaKey]);
  }
  function sf9WriteMetaShared(fieldKey, value) {
    const cfg = SF9_SHARED_HEADER_FIELDS[fieldKey];
    if (!cfg) return;
    state.meta = state.meta || defaultMeta();
    state.meta[cfg.metaGroup] = state.meta[cfg.metaGroup] || {};
    state.meta[cfg.metaGroup][cfg.metaKey] = value == null ? '' : String(value);
    if (cfg.metaGroup === 'location' && cfg.metaKey === 'schoolAddress') state.meta.location.municipalityProvince = state.meta.location.municipalityProvince || '';
  }
  function sf9ScheduleMetaSave() {
    if (!state.classId) return;
    clearTimeout(sf9SyncSaveTimer);
    sf9SyncSaveTimer = setTimeout(() => { try { saveSf9Meta(); } catch (_) {} }, 120);
  }
  function sf9SchedulePreviewRefresh() {
    if (!dom.sf9PrintArea) return;
    clearTimeout(sf9SyncPreviewTimer);
    sf9SyncPreviewTimer = setTimeout(() => { try { renderSelectedPreview(); renderBatch(); } catch (_) {} }, 180);
  }
  function sf9SetDomValue(id, value, shouldDispatch) {
    const el = $id(id);
    if (!el) return false;
    const next = value == null ? '' : String(value);
    if (String(el.value || '') === next) return false;
    el.value = next;
    if (shouldDispatch) {
      try { el.dispatchEvent(new Event('input', { bubbles:true })); } catch (_) {}
      try { el.dispatchEvent(new Event('change', { bubbles:true })); } catch (_) {}
    }
    return true;
  }
  function sf9PushToSharedHeader(fieldKey, value, sourceId) {
    const cfg = SF9_SHARED_HEADER_FIELDS[fieldKey];
    if (!cfg) return;
    const v = value == null ? '' : String(value);
    try {
      if (window.CTMSharedHeader && typeof window.CTMSharedHeader.set === 'function' && cfg.sharedField) {
        window.CTMSharedHeader.set(cfg.sharedField, v, sourceId || cfg.sf9Id);
      }
    } catch (_) {}
    (cfg.peers || []).forEach(id => {
      if (!id || id === sourceId || id === cfg.sf9Id) return;
      sf9SetDomValue(id, v, true);
    });
  }
  function sf9ApplySharedValue(fieldKey, value, sourceId, options) {
    const cfg = SF9_SHARED_HEADER_FIELDS[fieldKey];
    if (!cfg) return;
    const opts = options || {};
    const v = value == null ? '' : String(value);
    const sf9El = $id(cfg.sf9Id);
    const current = sf9El ? String(sf9El.value || '') : sf9ReadMetaShared(fieldKey);
    const currentMeta = sf9ReadMetaShared(fieldKey);
    const externalBlankFromBulk = !opts.userEdit && !sf9SharedText(v);
    if (externalBlankFromBulk && (sf9SharedText(current) || sf9SharedText(currentMeta))) return;
    const changedDom = sf9SetDomValue(cfg.sf9Id, v, false);
    if (currentMeta !== v) {
      sf9WriteMetaShared(fieldKey, v);
      sf9ScheduleMetaSave();
    }
    if (opts.pushPeers) sf9PushToSharedHeader(fieldKey, v, sourceId || cfg.sf9Id);
    if (changedDom || currentMeta !== v) sf9SchedulePreviewRefresh();
  }
  function sf9ReadSharedHeaderField(fieldKey) {
    const cfg = SF9_SHARED_HEADER_FIELDS[fieldKey];
    if (!cfg) return '';
    try {
      if (window.CTMSharedHeader && typeof window.CTMSharedHeader.get === 'function' && cfg.sharedField) {
        const v = sf9SharedText(window.CTMSharedHeader.get(cfg.sharedField));
        if (v) return v;
      }
    } catch (_) {}
    for (const id of (cfg.peers || [])) {
      const el = $id(id);
      const v = sf9SharedText(el && el.value);
      if (v) return v;
    }
    try { return sf9SharedText(getHeaderField(cfg.sharedField === 'schoolName' ? 'school' : cfg.sharedField)); } catch (_) { return ''; }
  }
  function syncSf9SharedFieldsFromHeader(options) {
    const opts = options || {};
    if (sf9SyncBusy) return;
    sf9SyncBusy = true;
    try {
      Object.keys(SF9_SHARED_HEADER_FIELDS).forEach(fieldKey => {
        const v = sf9ReadSharedHeaderField(fieldKey);
        if (v || opts.allowBlank) sf9ApplySharedValue(fieldKey, v, 'shared-header', { userEdit:false, pushPeers:false });
      });
    } finally { sf9SyncBusy = false; }
  }
  function bindSf9SharedHeaderSync() {
    if (window.__ctmSf9SharedHeaderSyncBound) return;
    window.__ctmSf9SharedHeaderSyncBound = true;
    const handleDomSyncEvent = event => {
      const target = event && event.target;
      const id = target && target.id;
      const fieldKey = id && SF9_SHARED_ID_TO_FIELD[id];
      if (!fieldKey || sf9SyncBusy) return;
      sf9SyncBusy = true;
      try {
        const isSf9Source = id === SF9_SHARED_HEADER_FIELDS[fieldKey].sf9Id;
        const value = target.value == null ? '' : String(target.value);
        sf9ApplySharedValue(fieldKey, value, id, { userEdit:true, pushPeers:isSf9Source });
        if (!isSf9Source) sf9PushToSharedHeader(fieldKey, value, id);
      } finally { sf9SyncBusy = false; }
    };
    document.addEventListener('input', handleDomSyncEvent, true);
    document.addEventListener('change', handleDomSyncEvent, true);
    window.addEventListener('ctm:shared-header-sync', event => {
      const detail = event && event.detail || {};
      const fieldKey = Object.keys(SF9_SHARED_HEADER_FIELDS).find(k => SF9_SHARED_HEADER_FIELDS[k].sharedField === detail.field);
      if (!fieldKey || sf9SyncBusy) return;
      sf9ApplySharedValue(fieldKey, detail.value, detail.sourceId || 'ctm:shared-header-sync', { userEdit:false, pushPeers:false });
    });
    window.addEventListener('ctm:shared-header-sync-all', event => {
      if (sf9SyncBusy) return;
      const data = event && event.detail && event.detail.data || {};
      Object.keys(SF9_SHARED_HEADER_FIELDS).forEach(fieldKey => {
        const cfg = SF9_SHARED_HEADER_FIELDS[fieldKey];
        if (Object.prototype.hasOwnProperty.call(data, cfg.sharedField)) sf9ApplySharedValue(fieldKey, data[cfg.sharedField], 'ctm:shared-header-sync-all', { userEdit:false, pushPeers:false });
      });
    });
    window.addEventListener('ctm:loaded-class-context', () => setTimeout(() => syncSf9SharedFieldsFromHeader({allowBlank:false}), 0));
  }

  function cacheDom() {
    ['sf9Modal','sf9ClassInfo','sf9SetupSummary','sf9PanelSetup','sf9PanelPreview','sf9PanelBatch','sf9LearnerPicker','sf9TransitionNote','sf9PrintArea','sf9BatchSummary','sf9Adviser','sf9SchoolHead','sf9Region','sf9Division','sf9School','sf9District','sf9SchoolAddress','sf9MunicipalityProvince','sf9ShowAwardsBox','sf9ShowPerfectAttendance','sf9ShowConductAward','sf9ShowLegacyCoreValues','sf9ShowDebugNotes','sf9CommentsFields','sf9CoreValuesEditor','sf9CommentT1','sf9CommentT2','sf9CommentT3'].forEach(id => dom[id] = $id(id));
  }
  function bindEvents() {
    bindSf9SharedHeaderSync();
    const on = (id, ev, fn) => {
      const el = $id(id);
      if (el && !el.dataset.sf9Bound) {
        el.addEventListener(ev, fn);
        el.dataset.sf9Bound = '1';
      }
    };
    on('sf9BtnClose','click',close);
    on('sf9BtnRefresh','click',refresh);
    on('sf9BtnPrintSelected','click',printSelectedLearner);
    on('sf9BtnPrintAll','click',printAllLearners);
    on('sf9BtnSaveSettings','click',saveSettingsFromUi);
    on('sf9BtnSaveComments','click',saveCommentsFromUi);
    if (dom.sf9ShowLegacyCoreValues && !dom.sf9ShowLegacyCoreValues.dataset.sf9ToggleBound) {
      dom.sf9ShowLegacyCoreValues.addEventListener('change', e => {
        state.meta.showLegacyCoreValues = !!e.target.checked;
        renderCoreValuesEditor();
        renderSelectedPreview();
      });
      dom.sf9ShowLegacyCoreValues.dataset.sf9ToggleBound = '1';
    }
    ['sf9ShowAwardsBox','sf9ShowPerfectAttendance','sf9ShowConductAward','sf9ShowDebugNotes'].forEach(id => {
      const el = dom[id] || $id(id);
      if (!el || el.dataset.sf9LiveToggleBound) return;
      el.addEventListener('change', () => {
        if (dom.sf9ShowAwardsBox) state.meta.showAwardsBox = !!dom.sf9ShowAwardsBox.checked;
        if (dom.sf9ShowPerfectAttendance) state.meta.showPerfectAttendance = !!dom.sf9ShowPerfectAttendance.checked;
        if (dom.sf9ShowConductAward) state.meta.showConductAward = !!dom.sf9ShowConductAward.checked;
        if (dom.sf9ShowDebugNotes) state.meta.showDebugNotes = !!dom.sf9ShowDebugNotes.checked;
        saveSf9Meta();
        renderSelectedPreview();
        renderBatch();
      });
      el.dataset.sf9LiveToggleBound = '1';
    });
    if (dom.sf9LearnerPicker && !dom.sf9LearnerPicker.dataset.sf9Bound) {
      dom.sf9LearnerPicker.addEventListener('change', e => {
        state.selectedLearnerId = e.target.value;
        renderSelectedComments();
        renderSelectedPreview();
      });
      dom.sf9LearnerPicker.dataset.sf9Bound='1';
    }
    document.querySelectorAll('#sf9Modal [data-sf9-tab]').forEach(b => {
      if (!b.dataset.sf9Bound) {
        b.addEventListener('click', () => {
          state.activeTab = b.dataset.sf9Tab;
          renderTabs();
        });
        b.dataset.sf9Bound='1';
      }
    });
    ['btnOpenSF9','btnSf9','btnOpenSf9'].forEach(id => {
      const b = $id(id);
      if (b && !b.dataset.sf9OpenBound) {
        b.addEventListener('click', open);
        b.dataset.sf9OpenBound = '1';
      }
    });
    if (!window.__ctmSf9LoadedClassListener) {
      window.addEventListener('ctm:loaded-class-context', updateOpenButtonsState);
      window.__ctmSf9LoadedClassListener = true;
    }
    updateOpenButtonsState();
  }
  async function injectHtml() { if (state.htmlInjected || $id('sf9Modal')) { state.htmlInjected = true; return; } let html = fallbackHtml; try { const res = await fetch(MODULE_HTML_PATH, {cache:'no-cache'}); if (res.ok) html = await res.text(); } catch (_) {} const host = $id('sf9Host') || document.body; const wrap = document.createElement('div'); wrap.innerHTML = html; while (wrap.firstChild) host.appendChild(wrap.firstChild); state.htmlInjected = true; }
  function loadCurrentClassData() { state.warnings = []; state.classId = getClassId(); state.className = getClassName(); state.roster = readRoster(); state.meta = loadSf9Meta(); state.gradeData = getGradeSheetSnapshot(); state.policy = resolveSf9Policy(); state.displayProfile = resolveSubjectDisplayProfile({gradeLevel:gradeLevelNumber(), keyStage:getHeaderField('keyStage'), schoolYear:schoolYear(), track:getTrack()}, state.gradeData); state.reports = buildGradeReport(); if (!state.selectedLearnerId || !state.roster.some(l => l.learnerId === state.selectedLearnerId)) state.selectedLearnerId = (state.roster[0] && state.roster[0].learnerId) || ''; }

  function renderTabs() { document.querySelectorAll('#sf9Modal [data-sf9-tab]').forEach(b => b.classList.toggle('active', b.dataset.sf9Tab === state.activeTab)); ['Setup','Preview','Batch'].forEach(n => { const el = dom['sf9Panel' + n]; if (el) el.classList.toggle('active', n.toLowerCase() === state.activeTab); }); }
  function render() { cacheDom(); if (dom.sf9ClassInfo) dom.sf9ClassInfo.textContent = `${state.className || 'No class loaded'}${schoolYear() ? ' • SY ' + schoolYear() : ''} • ${state.roster.length} learner(s)`; renderSetup(); syncSf9SharedFieldsFromHeader({allowBlank:false}); renderLearnerPicker(); renderSelectedComments(); renderSelectedPreview(); renderBatch(); renderTabs(); }
  function renderSetup() {
    if (!dom.sf9SetupSummary) return;
    const hasGs = !!(state.gradeData && subjectList(state.gradeData).length);
    dom.sf9SetupSummary.innerHTML = `<div class="sf9-screen-warning"><b>Status:</b> ${hasGs ? (state.gradeData.source === 'classRecordLocalStorage' ? 'Class Record data found' : 'GradeSheet data found') : 'No GradeSheet/ClassRecord data found. Encode or sync Class Record/GradeSheet first.'}<br><b>Subject display profile:</b> ${esc(state.displayProfile && state.displayProfile.profile || '')}<br><b>Template:</b> Grades 4 to 12 numerical Performance Report<br><b>Periods:</b> ${esc(getSf9PeriodLabels().join(', '))}</div>`;
    if (dom.sf9Adviser) dom.sf9Adviser.value = state.meta.signatories && state.meta.signatories.adviser || getHeaderField('adviser') || '';
    if (dom.sf9SchoolHead) dom.sf9SchoolHead.value = state.meta.signatories && state.meta.signatories.schoolHead || getHeaderField('schoolHead') || '';
    if (dom.sf9Region) dom.sf9Region.value = state.meta.location && state.meta.location.region || getHeaderField('region') || '';
    if (dom.sf9Division) dom.sf9Division.value = state.meta.location && state.meta.location.division || getHeaderField('division') || '';
    if (dom.sf9School) dom.sf9School.value = state.meta.location && state.meta.location.school || getHeaderField('school') || '';
    if (dom.sf9District) dom.sf9District.value = state.meta.location && state.meta.location.district || getHeaderField('district') || '';
    if (dom.sf9SchoolAddress) dom.sf9SchoolAddress.value = state.meta.location && (state.meta.location.schoolAddress || state.meta.location.municipalityProvince) || getHeaderField('schoolAddress') || '';
    if (dom.sf9MunicipalityProvince) dom.sf9MunicipalityProvince.value = state.meta.location && state.meta.location.municipalityProvince || '';
    if (dom.sf9ShowAwardsBox) dom.sf9ShowAwardsBox.checked = state.meta.showAwardsBox !== false;
    if (dom.sf9ShowPerfectAttendance) dom.sf9ShowPerfectAttendance.checked = !!state.meta.showPerfectAttendance;
    if (dom.sf9ShowConductAward) dom.sf9ShowConductAward.checked = !!state.meta.showConductAward;
    if (dom.sf9ShowLegacyCoreValues) dom.sf9ShowLegacyCoreValues.checked = !!state.meta.showLegacyCoreValues;
    if (dom.sf9ShowDebugNotes) dom.sf9ShowDebugNotes.checked = !!state.meta.showDebugNotes;
  }
  function renderLearnerPicker() { if (!dom.sf9LearnerPicker) return; const old = dom.sf9LearnerPicker.value || state.selectedLearnerId; dom.sf9LearnerPicker.innerHTML = state.roster.map((l,i) => `<option value="${esc(l.learnerId)}">${i+1}. ${esc(l.name)}${l.sex ? ' (' + esc(l.sex) + ')' : ''}</option>`).join(''); dom.sf9LearnerPicker.value = state.roster.some(l => l.learnerId === old) ? old : state.selectedLearnerId; }
  function commentValueFor(comments, q, index) { return comments && (comments[q] || comments['t' + (index + 1)] || '') || ''; }
  function renderSelectedComments() {
    const lid = state.selectedLearnerId, r = (state.meta.learnerRemarks || {})[lid] || {}, periodKeys = getSf9PeriodKeys(), labels = getSf9PeriodLabels();
    if (dom.sf9CommentsFields) {
      dom.sf9CommentsFields.innerHTML = periodKeys.map((q,i) => { const cid = `sf9Comment_${q}`; const label = `${esc(labels[i])} comments`; return `<label class="sf9-comment-field" for="${cid}"><span class="sf9-sr-only">${label}</span><textarea id="${cid}" name="${cid}" data-sf9-comment-period="${q}" aria-label="${label}" placeholder="${label}">${esc(commentValueFor(r, q, i))}</textarea></label>`; }).join('');
      cacheDom();
      renderCoreValuesEditor();
      return;
    }
    if (dom.sf9CommentT1) dom.sf9CommentT1.value = commentValueFor(r, 'q1', 0);
    if (dom.sf9CommentT2) dom.sf9CommentT2.value = commentValueFor(r, 'q2', 1);
    if (dom.sf9CommentT3) dom.sf9CommentT3.value = commentValueFor(r, 'q3', 2);
    renderCoreValuesEditor();
  }

  function renderCoreValuesEditor() {
    if (!dom.sf9CoreValuesEditor) return;
    if (!state.meta.showLegacyCoreValues) {
      dom.sf9CoreValuesEditor.innerHTML = '';
      dom.sf9CoreValuesEditor.hidden = true;
      return;
    }
    dom.sf9CoreValuesEditor.hidden = false;
    const lid = state.selectedLearnerId;
    const saved = ((state.meta.learnerCoreValues || {})[lid] || {});
    const periods = getSf9PeriodKeys();
    const labels = getSf9PeriodLabels();
    const optionHtml = val => ['','AO','SO','RO','NO'].map(x => `<option value="${x}"${x === val ? ' selected' : ''}>${x || '-'}</option>`).join('');
    const head = periods.map((q,i) => `<th>${esc(labels[i])}</th>`).join('');
    const body = CORE_VALUE_ROWS.map((r, idx) => {
      const row = saved[r.key] || {};
      const core = r.core ? `<td${idx === 0 || idx === 2 || idx === 5 ? ' rowspan="2"' : ''}>${esc(r.core)}</td>` : '';
      const selects = periods.map((q, periodIndex) => { const sid = `sf9Core_${r.key}_${q}`; const aria = `${esc(r.statement)} - ${esc(labels[periodIndex] || q)}`; return `<td><select id="${sid}" name="${sid}" data-sf9-core-row="${r.key}" data-sf9-core-period="${q}" aria-label="${aria}">${optionHtml(text(row[q]))}</select></td>`; }).join('');
      return `<tr>${core}<td>${esc(r.statement)}</td>${selects}</tr>`;
    }).join('');
    dom.sf9CoreValuesEditor.innerHTML = `<h3>Observed Values (AO/SO/RO/NO)</h3><p class="sf9-muted">Optional. Values are saved per learner in SF9 local storage and printed only when the legacy observed values section is enabled.</p><table class="sf9-table sf9-core-values-input"><thead><tr><th>Core Values</th><th>Behavioral Statements</th>${head}</tr></thead><tbody>${body}</tbody></table>`;
  }
  function saveCoreValuesFromUi() {
    if (!state.meta.showLegacyCoreValues) return;
    captureCurrentCoreValuesEditor();
  }
  function saveSettingsFromUi() {
    state.meta.signatories = state.meta.signatories || {};
    state.meta.location = state.meta.location || {};
    state.meta.signatories.adviser = dom.sf9Adviser ? dom.sf9Adviser.value : '';
    state.meta.signatories.schoolHead = dom.sf9SchoolHead ? dom.sf9SchoolHead.value : '';
    state.meta.location.region = dom.sf9Region ? dom.sf9Region.value : (state.meta.location.region || '');
    state.meta.location.division = dom.sf9Division ? dom.sf9Division.value : (state.meta.location.division || '');
    state.meta.location.school = dom.sf9School ? dom.sf9School.value : (state.meta.location.school || '');
    state.meta.location.district = dom.sf9District ? dom.sf9District.value : (state.meta.location.district || '');
    state.meta.location.schoolAddress = dom.sf9SchoolAddress ? dom.sf9SchoolAddress.value : (state.meta.location.schoolAddress || '');
    state.meta.location.municipalityProvince = dom.sf9MunicipalityProvince ? dom.sf9MunicipalityProvince.value : (state.meta.location.municipalityProvince || '');
    state.meta.showAwardsBox = !!(dom.sf9ShowAwardsBox && dom.sf9ShowAwardsBox.checked);
    state.meta.showPerfectAttendance = !!(dom.sf9ShowPerfectAttendance && dom.sf9ShowPerfectAttendance.checked);
    state.meta.showConductAward = !!(dom.sf9ShowConductAward && dom.sf9ShowConductAward.checked);
    state.meta.showLegacyCoreValues = !!(dom.sf9ShowLegacyCoreValues && dom.sf9ShowLegacyCoreValues.checked);
    state.meta.showDebugNotes = !!(dom.sf9ShowDebugNotes && dom.sf9ShowDebugNotes.checked);
    Object.keys(SF9_SHARED_HEADER_FIELDS).forEach(fieldKey => { const cfg = SF9_SHARED_HEADER_FIELDS[fieldKey]; const el = $id(cfg.sf9Id); if (el) sf9PushToSharedHeader(fieldKey, el.value || '', cfg.sf9Id); });
    saveSf9Meta(); render();
  }
  function saveCommentsFromUi() {
    const lid = state.selectedLearnerId;
    if (!lid) return;
    state.meta.learnerRemarks = state.meta.learnerRemarks || {};
    const existing = state.meta.learnerRemarks[lid] || {};
    const next = Object.assign({}, existing);
    const fields = dom.sf9CommentsFields ? dom.sf9CommentsFields.querySelectorAll('[data-sf9-comment-period]') : [];
    if (fields && fields.length) fields.forEach((el, i) => { const q = el.getAttribute('data-sf9-comment-period') || ('q' + (i + 1)); next[q] = el.value || ''; next['t' + (i + 1)] = el.value || ''; });
    else {
      next.q1 = next.t1 = dom.sf9CommentT1 && dom.sf9CommentT1.value || '';
      next.q2 = next.t2 = dom.sf9CommentT2 && dom.sf9CommentT2.value || '';
      next.q3 = next.t3 = dom.sf9CommentT3 && dom.sf9CommentT3.value || '';
    }
    state.meta.learnerRemarks[lid] = next;
    saveCoreValuesFromUi();
    saveSf9Meta(); renderSelectedPreview();
  }
  function renderSelectedPreview() { if (dom.sf9TransitionNote) { dom.sf9TransitionNote.hidden = !state.policy.transitionNote; dom.sf9TransitionNote.textContent = state.policy.transitionNote; } const r = state.reports.find(x => x.learnerId === state.selectedLearnerId); if (dom.sf9PrintArea) dom.sf9PrintArea.innerHTML = r ? renderSf9Preview(r) : `<div class="sf9-screen-warning">No learner selected.</div>`; }
  function renderBatch() { if (!dom.sf9BatchSummary) return; const complete = state.reports.filter(r => r.complete).length; dom.sf9BatchSummary.innerHTML = `<div class="sf9-screen-warning"><b>Batch status:</b> ${complete}/${state.reports.length} learner report(s) complete.<br><b>Source:</b> GradeSheet/ClassRecord and Attendance are read directly. SF9 stores comments and SF9 settings only.</div>`; }

  function renderSf9Preview(learnerReport) {
    const l = learnerReport.learner, col0 = gradeLevelNumber() >= 11 ? 'Subjects' : 'Learning Areas';
    const periodKeys = getSf9PeriodKeys(), periodLabels = getSf9PeriodLabels(), shortLabels = getPeriodShortLabels();
    const rows = buildSubjectRowsForLearner(state.displayProfile, learnerReport, state.gradeData);
    const useTermGrid = isG12ModifiedThreeTermGrid();
    const att = summarizeAttendanceForLearner(learnerReport.learnerId);
    const comments = (state.meta.learnerRemarks || {})[learnerReport.learnerId] || {};
    const awards = (state.meta.learnerAwards || {})[learnerReport.learnerId] || [];
    const adviser = state.meta.signatories && state.meta.signatories.adviser || getHeaderField('adviser');
    const schoolHead = state.meta.signatories && state.meta.signatories.schoolHead || '';
    const grade = getHeaderField('gradeLevel') || getHeaderField('grade') || '';
    const section = getHeaderField('section') || '';
    const trackStrand = text(getHeaderField('track') || getHeaderField('strand') || readSf1TrackStrandMeta() || text((state.gradeData || {}).trackStrand));
    const showTrack = gradeLevelNumber(grade) >= 11 || !!trackStrand;
    const termHead = shortLabels.map(x => `<th>${esc(x)}</th>`).join('');
    const rowHtml = rows.map(r => r.type === 'group' ? `<tr class="sf9-group"><td colspan="${periodKeys.length + 3}">${esc(r.label)}</td></tr>` : `<tr class="sf9-${esc(r.type)}"><td>${r.indent ? '&nbsp;&nbsp;&nbsp;' : ''}${esc(r.label)}</td>${periodKeys.map(q => `<td class="sf9-center">${show(r[q])}</td>`).join('')}<td class="sf9-center">${show(r.finalGrade)}</td><td class="sf9-center">${esc(r.remarks || '')}</td></tr>`).join('');
    const awardList = [];
    if (learnerReport.academicAward) awardList.push(learnerReport.academicAward);
    if (Array.isArray(awards)) awards.forEach(a => { if (text(a)) awardList.push(text(a)); });
    const hasConductAward = !!state.meta.showConductAward && conductAwardQualified(learnerReport);
    if (hasConductAward && !awardList.some(a => text(a).toUpperCase() === 'CONDUCT AWARDEE')) awardList.push('CONDUCT AWARDEE');
    const hasPerfect = state.meta.showPerfectAttendance && perfectAttendance(att);
    const debug = state.meta.showDebugNotes ? `<div class="sf9-debug-note"><b>Debug Notes</b><br>profile=${esc(state.displayProfile.profile)}; complete=${learnerReport.complete}; ${esc((state.displayProfile.notes||[]).join('; '))}</div>` : '';
    const transitionNote = state.policy && state.policy.transitionNote ? state.policy.transitionNote : '';
    const optionalPageNeeded = (state.meta.showAwardsBox !== false && awardList.length > 0) || hasPerfect || !!transitionNote || !!state.meta.showDebugNotes;
    const commentsRows = periodKeys.map((q,i) => `<tr><th style="width:1.2in">${esc(periodLabels[i])}</th><td>${esc(commentValueFor(comments, q, i))}</td></tr>`).join('');
    const sigHead = periodLabels.map(x => `<th>${esc(x)}</th>`).join('');
    const sigCells = periodLabels.map(_ => '<td class="sf9-signature-cell">&nbsp;</td>').join('');
    const page1 = `<div class="sf9-page sf9-page-1">${renderSf9HeaderBlock()}<div class="sf9-title-block"><br /><h2>Learner&rsquo;s Performance Report<br />School Year ${esc(schoolYear() || '')}</h2></div><table class="sf9-table sf9-learner-info"><tbody><tr><td>${sf9InfoCell('Name:', l.name, 'sf9-info-name')}</td><td>${sf9InfoCell('Age:', ageForLearner(l), 'sf9-info-age')}</td><td>${sf9InfoCell('Sex:', l.sex || '', 'sf9-info-sex')}</td></tr><tr><td>${sf9InfoCell('LRN:', l.lrn || '', 'sf9-info-lrn')}</td><td>${sf9InfoCell('Grade:', grade, 'sf9-info-grade')}</td><td>${sf9InfoCell('Section:', section, 'sf9-info-section')}</td></tr>${showTrack ? `<tr><td colspan="3">${sf9InfoCell('Track (SHS only):', trackStrand || '', 'sf9-info-track')}</td></tr>` : `<tr><td colspan="3">${sf9InfoCell('Track (SHS only):', '.', 'sf9-info-track')}</td></tr>`}</tbody></table><div class="sf9-dear-parents"><p>Dear Parents,</p><p>This Performance Report shows the ability and progress your child has made in the different learning areas as well as his/her core values.</p><p>The school welcomes you should desire to know more about your child's progress.</p></div><h2>Learning Progress and Achievement</h2>${useTermGrid ? renderG12ModifiedThreeTermSubjectGrid(learnerReport) : `<table class="sf9-table"><thead><tr><th rowspan="2">${col0}</th><th colspan="${periodKeys.length}">${periodGroupCaption()}</th><th rowspan="2">Final Grade</th><th rowspan="2">Remarks</th></tr><tr>${termHead}</tr></thead><tbody>${rowHtml}</tbody></table>`}<h2>Performance Descriptors</h2>${renderPerformanceDescriptors()}</div>`;
    const page2 = `<div class="sf9-page sf9-page-2">${state.meta.showLegacyCoreValues ? renderLegacyCoreValues(learnerReport) : ''}${renderAttendanceRecordHorizontal(att)}<h2>Teacher's Comments / Remarks</h2><table class="sf9-table"><tbody>${commentsRows}</tbody></table><h2>Parents / Guardian's Signature</h2><table class="sf9-table"><thead><tr>${sigHead}</tr></thead><tbody><tr>${sigCells}</tr></tbody></table><h2>Certificate of Transfer</h2><p>This is to certify that the above-named learner has satisfactorily completed the requirements for the grade level indicated.</p>${renderCertificateOfTransfer(adviser, schoolHead)}<h2>Cancellation of Eligibility to Transfer</h2>${renderCancellationOfEligibility(schoolHead)}</div>`;
    return `${page1}${page2}${optionalPageNeeded ? renderOptionalSf9Page3(learnerReport, awardList, hasPerfect, debug) : ''}`;
  }
  function renderPerformanceDescriptors() {
    return `<table class="sf9-table sf9-descriptors"><thead><tr><th>Grade Range</th><th>Descriptor</th><th>Remarks</th></tr></thead><tbody><tr><td>90-100</td><td>Advancing</td><td>Passed</td></tr><tr><td>80-89</td><td>Benchmarking</td><td>Passed</td></tr><tr><td>75-79</td><td>Connecting</td><td>Passed</td></tr><tr><td>65-74</td><td>Developing</td><td>Failed</td></tr><tr><td>0-64</td><td>Emerging</td><td>Failed</td></tr></tbody></table>`;
  }
  function renderLegacyCoreValues(learnerReport) {
    const periods = getSf9PeriodKeys();
    const cols = getPeriodShortLabels().map(x => `<th>${esc(x)}</th>`).join('');
    const saved = ((state.meta.learnerCoreValues || {})[(learnerReport && learnerReport.learnerId) || state.selectedLearnerId] || {});
    const rowHtml = CORE_VALUE_ROWS.map((r, idx) => {
      const row = saved[r.key] || {};
      const core = r.core ? `<td${idx === 0 || idx === 2 || idx === 5 ? ' rowspan="2"' : ''}>${esc(r.core)}</td>` : '';
      const cells = periods.map(q => `<td class="sf9-center">${esc(row[q] || '')}</td>`).join('');
      return `<tr>${core}<td>${esc(r.statement)}</td>${cells}</tr>`;
    }).join('');
    return `<h2>Report on Learner's Observed Values</h2><table class="sf9-table"><thead><tr><th rowspan="2">Core Values</th><th rowspan="2">Behavioral Statements</th><th colspan="${periods.length}">${periodGroupCaption()}</th></tr><tr>${cols}</tr></thead><tbody>${rowHtml}<tr><td colspan="${periods.length + 2}">AO - Always Observed, SO - Sometimes Observed, RO - Rarely Observed, NO - Not Observed</td></tr></tbody></table>`;
  }
  function visibleAttendanceMonths(summary) {
    const order = ['06','07','08','09','10','11','12','01','02','03','04'];
    if (!summary || !summary.length) return order.map(m => ({key:m, label:{'06':'Jun','07':'Jul','08':'Aug','09':'Sep','10':'Oct','11':'Nov','12':'Dec','01':'Jan','02':'Feb','03':'Mar','04':'Apr'}[m]}));
    const byMonth = Object.fromEntries(summary.map(m => [String(m.month).slice(5,7), m]));
    const present = order.filter(m => byMonth[m]);
    return (present.length ? present : order).map(m => ({key:m, label:{'06':'Jun','07':'Jul','08':'Aug','09':'Sep','10':'Oct','11':'Nov','12':'Dec','01':'Jan','02':'Feb','03':'Mar','04':'Apr'}[m]}));
  }
  function renderAttendanceRecordHorizontal(summary) {
    const byMonth = Object.fromEntries((summary || []).map(m => [String(m.month).slice(5,7), m]));
    const months = visibleAttendanceMonths(summary);
    const sum = field => months.reduce((a,m) => a + Number((byMonth[m.key] && byMonth[m.key][field]) || 0), 0);
    const row = (label, field) => `<tr><th>${label}</th>${months.map(m => `<td class="sf9-center">${byMonth[m.key] ? Number(byMonth[m.key][field] || 0) : ''}</td>`).join('')}<td class="sf9-center">${sum(field) || ''}</td></tr>`;
    const note = (!summary || !summary.length) ? '<div class="sf9-small">No attendance data found.</div>' : '';
    return `<h2>Attendance Record</h2><table class="sf9-table"><thead><tr><th>Month</th>${months.map(m => `<th>${m.label}</th>`).join('')}<th>Total</th></tr></thead><tbody>${row('No. of Class Days','classDays')}${row('No. of Class Present','present')}${row('No. of Class Absent','absent')}</tbody></table>${note}`;
  }
  function renderCertificateOfTransfer(adviser, schoolHead) {
    const adviserLine = text(adviser) ? esc(adviser) : '(adviser)';
    const schoolHeadLine = text(schoolHead) ? esc(schoolHead) : '(school head)';
    return `<table class="sf9-transfer sf9-transfer-certificate"><colgroup><col style="width:34%"><col style="width:33%"><col style="width:33%"></colgroup><tbody><tr><th class="sf9-transfer-label">Admitted to Grade:</th><td class="sf9-transfer-line"></td><td></td></tr><tr><td class="sf9-transfer-label">Eligible for Admission to Grade:</td><td class="sf9-transfer-line"></td><td></td></tr><tr><td colspan="3" class="sf9-transfer-spacer"></td></tr><tr><td class="sf9-transfer-label">Approved:</td><td></td><td class="sf9-transfer-line">${adviserLine}</td></tr><tr><td></td><td></td><td class="sf9-transfer-caption">Adviser</td></tr><tr><td class="sf9-transfer-line">${schoolHeadLine}</td><td></td><td></td></tr><tr><td class="sf9-transfer-caption">School Head</td><td></td><td></td></tr></tbody></table>`;
  }
  function renderCancellationOfEligibility(schoolHead) {
    const schoolHeadLine = text(schoolHead) ? esc(schoolHead) : '(school head)';
    return `<table class="sf9-transfer sf9-transfer-cancellation"><colgroup><col style="width:24%"><col style="width:30%"><col style="width:14%"><col style="width:32%"></colgroup><tbody><tr><th class="sf9-transfer-label">Admitted in:</th><td class="sf9-transfer-line"></td><th class="sf9-transfer-label">Date:</th><td class="sf9-transfer-line"></td></tr><tr><td colspan="4" class="sf9-transfer-spacer"></td></tr><tr><td colspan="2" class="sf9-transfer-line">${schoolHeadLine}</td><td></td><td></td></tr><tr><td colspan="2" class="sf9-transfer-caption">School Head</td><td></td><td></td></tr></tbody></table>`;
  }
  function renderOptionalSf9Page3(learnerReport, awardList, hasPerfect, debugHtml) {
    const showAwards = (state.meta.showAwardsBox !== false || (state.meta.showConductAward && awardList.some(a => text(a).toUpperCase() === 'CONDUCT AWARDEE'))) && awardList.length > 0;
    const transitionNote = state.policy && state.policy.transitionNote ? state.policy.transitionNote : '';
    return `<div class="sf9-page sf9-page-3"><h1>Supplemental SF9 Information</h1>${transitionNote ? `<h2>Grade 12 Transition Note</h2><div class="sf9-note sf9-print-note">${esc(transitionNote)}</div>` : ''}${showAwards ? `<h2>Awards and Recognition</h2><div>${esc(awardList.join(', '))}</div>` : ''}${hasPerfect ? `<h2>Perfect Attendance Recognition</h2><div>Perfect Attendance</div>` : ''}${state.meta.showDebugNotes ? `<h2>Debug Notes</h2>${debugHtml}` : ''}</div>`;
  }
  function monthLabel(ym) { const [y,m]=String(ym).split('-'); const d = new Date(Number(y), Number(m)-1, 1); return d.toLocaleString(undefined, {month:'long', year:'numeric'}); }
  function printSelectedLearner() { renderSelectedPreview(); setTimeout(() => window.print(), 50); }
  function printAllLearners() { if (!dom.sf9PrintArea) return; dom.sf9PrintArea.innerHTML = state.reports.map(r => renderSf9Preview(r)).join(''); setTimeout(() => window.print(), 50); }

  async function init() { ensureCss(); await injectHtml(); cacheDom(); bindEvents(); loadCurrentClassData(); render(); updateOpenButtonsState(); window.CTMSF9 = api; }
  async function open() { if (!hasLoadedClassForSf9()) { updateOpenButtonsState(); warnNoLoadedClass(); return; } await init(); if (!hasLoadedClassForSf9()) { updateOpenButtonsState(); warnNoLoadedClass(); return; } refresh(); if (dom.sf9Modal) { dom.sf9Modal.style.display = 'block'; dom.sf9Modal.setAttribute('aria-hidden','false'); } }
  function close() { if (!dom.sf9Modal) return; try { if (window.CTMModalA11y && typeof window.CTMModalA11y.prepareForHide === 'function') window.CTMModalA11y.prepareForHide(dom.sf9Modal); } catch (_) {} dom.sf9Modal.setAttribute('aria-hidden','true'); dom.sf9Modal.style.display = 'none'; }
  function refresh() { loadCurrentClassData(); render(); updateOpenButtonsState(); }
  function debugSnapshot() { return {version:VERSION, classId:state.classId, className:state.className, rosterCount:state.roster.length, hasGradeSheet:!!(state.gradeData && subjectList(state.gradeData).length), gradeDataSource:state.gradeData && state.gradeData.source || '', subjectCount:subjectList(state.gradeData).length, gradeRows:Object.keys((state.gradeData&&state.gradeData.grades)||{}).length, gradeSheetRosterCount:((state.gradeData&&state.gradeData.roster)||[]).length, mapehComponentLearners:Object.keys((state.gradeData&&state.gradeData.mapehComponents)||{}).length, meta:state.meta, selectedLearnerId:state.selectedLearnerId, policy:state.policy, displayProfile:state.displayProfile && {profile:state.displayProfile.profile, title:state.displayProfile.title, groupCount:(state.displayProfile.groups || []).length}, warnings:state.warnings.slice()}; }
  const api = { init, open, close, refresh, debugSnapshot, normalizeSubjectName, resolveSubjectDisplayProfile, buildSubjectRowsForLearner, summarizeAttendanceForLearner, renderG12ModifiedThreeTermSubjectGrid, termSubjectRowsForLearner, conductAwardQualified };
  window.CTMSF9 = api;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true}); else init();
})();
