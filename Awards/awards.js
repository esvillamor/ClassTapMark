(() => {
  'use strict';
  if (window.CTMAwards && typeof window.CTMAwards.init === 'function') return;

  const STORAGE_KEY = 'ctmAwardsV1';
  const SCHEMA_VERSION = 1;
  const PASSING_GRADE = 75;
  const HONOR_MIN = 90;
  const OV_ITEMS_PER_PERIOD = 7;
  const STATUSES = [
    'Qualified','Potential Qualifier','For Review','Missing Evidence','Not Qualified','Disqualified',
    'Pending Grades','Pending Attendance','Pending Observed Values','Pending Rubric','AC Approved','AC Rejected'
  ];

  const state = {
    htmlInjected:false,
    activeTab:'dashboard',
    classId:'', className:'', gradeLevel:'', schoolYear:'', academicStructure:'quarter', academicStructureUnverified:false,
    roster:[], gradeSheet:null, awards:null, policy:null
  };

  const $id = id => document.getElementById(id);
  const text = v => String(v ?? '').trim();
  const esc = v => String(v ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const slug = v => text(v).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  const norm = v => text(v).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
  // Keep class-key resolution compatible with Grade Sheet storage keys.
  // Grade Sheet uses classKeyPart(normalizeClassKey(value)); Awards previously used
  // only a small candidate list, so it could miss the saved Grade Sheet record and
  // silently fall back to "quarter".
  const normalizeClassKey = v => text(v).replace(/[\[\]]/g,'').trim();
  const classKeyPart = v => normalizeClassKey(v).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  const validAcademicStructures = new Set(['quarter','firstSemester','secondSemester','threeTerm','modifiedThreeTerm']);
  const isValidAcademicStructure = v => validAcademicStructures.has(text(v));
  const num = v => { if(v === '' || v == null) return null; const n = Number(String(v).replace(/[^0-9.-]/g,'')); return Number.isFinite(n) ? n : null; };
  const whole = v => { const n = num(v); return n == null ? null : Math.max(0, Math.min(100, Math.round(n))); };
  const avg = arr => { const a=(arr||[]).map(whole).filter(Number.isInteger); return a.length ? Math.round(a.reduce((x,y)=>x+y,0)/a.length) : null; };

  function injectStyles(){
    if($id('ctm-awards-style')) return;
    const s=document.createElement('style');
    s.id='ctm-awards-style';
    s.textContent = `
#awardsModal.ctm-awards-modal{position:fixed!important;inset:0!important;z-index:3100!important;background:rgba(15,23,42,.72)!important;padding:0!important;margin:0!important;overflow:auto!important;-webkit-overflow-scrolling:touch;font-family:"Aptos","Segoe UI",Arial,Helvetica,sans-serif;box-sizing:border-box}
#awardsModal.ctm-awards-modal .ctm-awards-content{position:relative!important;box-sizing:border-box!important;width:100vw!important;max-width:100vw!important;height:100dvh!important;min-height:100dvh!important;max-height:100dvh!important;margin:0!important;border-radius:0!important;padding:0!important;overflow:auto!important;overflow-x:hidden!important;background:#fff!important;color:#111827!important}
.ctm-awards-head{position:sticky;top:0;z-index:100;box-sizing:border-box;width:100%;display:flex;flex-direction:column;align-items:stretch;gap:.4rem;background:#bde3fc!important;padding:.55rem .6rem .5rem!important;margin:0!important;border-radius:0!important;border-bottom:1px solid rgba(15,23,42,.12)!important;box-shadow:0 4px 12px rgba(0,0,0,.08)!important}
.ctm-awards-head-main{display:flex;align-items:flex-start;justify-content:space-between;gap:.65rem;width:100%}.ctm-awards-title-block{min-width:0;flex:1 1 auto}.ctm-awards-head h2{margin:0!important;color:#1f2937;font-size:1rem;line-height:1.15}.ctm-awards-status{font-size:.76rem;color:#334155;font-weight:700;line-height:1.25;margin-top:.12rem}.ctm-awards-close-x{flex:0 0 auto;margin:0!important;align-self:flex-start;padding:.22rem .52rem!important;border-radius:10px!important;min-width:2rem;width:auto!important;height:auto!important;line-height:1!important;font-size:1rem!important;font-weight:900!important;background:#eef2ff!important;color:#1e293b!important;border:1px solid rgba(30,41,59,.18)!important;box-shadow:none!important;display:inline-flex;align-items:center;justify-content:center}.ctm-awards-close-x:hover{background:#e0e7ff!important;color:#111827!important}
.ctm-awards-banner{background:linear-gradient(135deg,#fff7ed,#ffedd5);border:1px solid #fdba74;color:#7c2d12;border-radius:10px;padding:.45rem .55rem;margin:.5rem .6rem .35rem;font-weight:800;font-size:.8rem}.ctm-awards-warn{background:#fff7ed;border:1px solid #fed7aa;color:#9a3412;border-radius:10px;padding:.45rem .55rem;margin:.45rem .6rem;font-weight:700;font-size:.8rem}
.ctm-awards-tabs{display:flex;gap:.3rem;flex-wrap:wrap;width:100%;box-sizing:border-box;margin:0!important;padding:0!important;border-radius:0!important}.ctm-awards-tab{padding:.35rem .55rem!important;border-radius:10px!important;background:#eef2ff!important;color:#334155!important;font-weight:800!important;font-size:.8rem!important;line-height:1.1!important;border:1px solid rgba(51,65,85,.12)!important;box-shadow:none!important}.ctm-awards-tab.active{background:linear-gradient(135deg,var(--bg1,#667eea),var(--bg2,#764ba2))!important;color:#fff!important}.ctm-awards-tab:not(.active):hover{background:#e0e7ff!important}
.ctm-awards-panel{display:none;box-sizing:border-box;padding:.5rem .6rem}.ctm-awards-panel.active{display:block}.ctm-awards-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.45rem;margin:.45rem 0}.ctm-awards-tile{background:#fafbff;border:1px solid #e8ecf4;border-radius:10px;padding:.55rem}.ctm-awards-tile .label{font-size:.7rem;color:#64748b;font-weight:800}.ctm-awards-tile .value{font-size:.98rem;color:#111827;font-weight:900;margin-top:.12rem;line-height:1.2}
.ctm-awards-card{background:#fff;border:1px solid #e8ecf4;border-radius:10px;padding:.6rem;margin:.5rem 0;box-shadow:0 2px 8px rgba(0,0,0,.045)}.ctm-awards-card h3{margin:.05rem 0 .4rem;color:#1f2937;font-size:.95rem}.ctm-awards-card h4{margin:.55rem 0 .28rem;font-size:.87rem}.ctm-awards-card p{margin:.35rem 0}.ctm-awards-card .ctm-awards-head{position:static;z-index:auto;background:transparent!important;box-shadow:none!important;border:0!important;border-radius:0!important;padding:0!important;margin:0 0 .35rem!important;display:flex!important;flex-direction:row!important;align-items:center!important;justify-content:space-between!important}
.ctm-awards-actions{display:flex;gap:.35rem;flex-wrap:wrap;justify-content:flex-end;margin:.45rem 0}.ctm-awards-controls{display:flex;gap:.38rem;flex-wrap:wrap;align-items:center;margin:.45rem 0}.ctm-awards-controls>*{min-width:128px}.ctm-awards-controls label{font-size:.78rem}.ctm-awards-actions button,.ctm-awards-controls button,#awardsModal button,#awardsModal .primary,#awardsModal .edit{padding:.38rem .6rem;border-radius:9px;font-size:.82rem;line-height:1.1;box-shadow:none}.ctm-awards-table-wrap{overflow:auto;border-radius:10px;border:1px solid #e8ecf4;background:#fff}.ctm-awards-table{width:100%;border-collapse:collapse;margin:0!important;box-shadow:none!important;font-size:.8rem;min-width:720px}.ctm-awards-table th{position:sticky;top:0;z-index:2;background:#f8fafc}.ctm-awards-table th,.ctm-awards-table td{padding:3px 5px!important;font-size:.8rem;line-height:1.25;vertical-align:top;border-bottom:1px solid #eef2f7}.ctm-awards-mini{font-size:.75rem;color:#64748b}.ctm-awards-pill{display:inline-flex;align-items:center;border-radius:9px;padding:.12rem .42rem;font-size:.72rem;font-weight:900;line-height:1.15}.ctm-awards-pill.ok{background:#dcfce7;color:#166534}.ctm-awards-pill.warn{background:#fef3c7;color:#92400e}.ctm-awards-pill.bad{background:#fee2e2;color:#991b1b}.ctm-awards-pill.info{background:#dbeafe;color:#1d4ed8}
#awardsModal input,#awardsModal select,#awardsModal textarea{box-sizing:border-box;max-width:100%;padding:.34rem .45rem!important;border-radius:8px!important;font-size:.8rem!important;line-height:1.15;border:1px solid #cbd5e1;background:#fff}#awardsModal textarea{min-height:2.35rem;resize:vertical}.ctm-ov-grid{display:grid;gap:.35rem;grid-template-columns:minmax(110px,1.1fr) repeat(var(--ctm-ov-p,4), minmax(70px,.8fr));align-items:center}.ctm-ov-head,.ctm-ov-item{font-weight:900;color:#334155;font-size:.78rem}.ctm-ov-grid select{width:100%;padding:.32rem .4rem}.ctm-awards-two{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:.5rem}.ctm-awards-report{white-space:pre-wrap;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:.55rem;max-height:none;overflow:auto;font-family:ui-monospace,Consolas,monospace;font-size:.78rem;line-height:1.35}.ctm-awards-print-area{display:none}
@media(max-width:560px){#awardsModal.ctm-awards-modal .ctm-awards-content{padding:0!important}.ctm-awards-head{padding-top:max(.5rem,env(safe-area-inset-top))!important}.ctm-awards-tab{font-size:.76rem!important;padding:.32rem .48rem!important}.ctm-awards-panel{padding:.45rem}.ctm-awards-table{font-size:.76rem}.ctm-awards-table th,.ctm-awards-table td{font-size:.76rem!important}.ctm-ov-grid{grid-template-columns:1fr}.ctm-ov-head{display:none}.ctm-ov-grid select{max-width:100%}}
@media print{html,body{margin:0!important;padding:0!important;background:white!important}body *{visibility:hidden!important}#awardsPrintArea,#awardsPrintArea *{visibility:visible!important}#awardsPrintArea{display:block!important;position:absolute;left:0;top:0;width:100%!important;max-width:none!important;margin:0!important;padding:8mm!important;background:white!important;color:black!important;box-sizing:border-box;font:10.5pt/1.35 "Aptos","Segoe UI",Arial,Helvetica,sans-serif}#awardsPrintArea h1{font-size:15pt;margin:0 0 4mm}#awardsPrintArea .ctm-awards-report{display:block!important;white-space:pre-wrap!important;background:white!important;border:0!important;border-radius:0!important;padding:0!important;max-height:none!important;overflow:visible!important;color:black!important;font-family:"Aptos","Segoe UI",Arial,Helvetica,sans-serif!important;font-size:10pt!important}.ctm-awards-no-print,#awardsModal .ctm-awards-head,#awardsModal .ctm-awards-tabs,#awardsModal button,#awardsModal input,#awardsModal select,#awardsModal textarea{display:none!important}}
`;
    (document.head || document.documentElement).appendChild(s);
  }
  async function ensureInjected(){
    injectStyles();
    if($id('awardsModal')) { state.htmlInjected=true; bindUi(); return true; }
    // Self-contained module: use the built-in modal markup instead of requesting awards.html.
    // This prevents a harmless-but-noisy 404 console error when only Awards/awards.js is deployed.
    const host=document.createElement('div');
    host.innerHTML = '<div id="awardsModal" class="modal ctm-awards-modal" aria-hidden="true" role="dialog" aria-modal="true" style="display:none"><div class="modal-content ctm-awards-content"><div class="ctm-awards-head"><div class="ctm-awards-head-main"><div class="ctm-awards-title-block"><h2 id="awardsTitle">Awards &amp; Recognition</h2><div id="awardsStatusLine" class="ctm-awards-status"></div></div><button id="awardsBtnClose" class="ctm-awards-close-x" type="button" aria-label="Close Awards modal" title="Close">&times;</button></div><div class="ctm-awards-tabs"><button class="ctm-awards-tab active" data-awards-tab="dashboard" type="button">Dashboard</button><button class="ctm-awards-tab" data-awards-tab="academic" type="button">Academic</button><button class="ctm-awards-tab" data-awards-tab="conduct" type="button">Conduct &amp; OV</button><button class="ctm-awards-tab" data-awards-tab="attendance" type="button">Attendance</button><button class="ctm-awards-tab" data-awards-tab="grade12" type="button">Grade 12 Awards</button><button class="ctm-awards-tab" data-awards-tab="rubrics" type="button">Rubrics</button><button class="ctm-awards-tab" data-awards-tab="special" type="button">Special Recognition</button><button class="ctm-awards-tab" data-awards-tab="reports" type="button">Reports / Export</button></div></div><div id="awardsTransitionBanner" class="ctm-awards-banner" hidden></div><div id="awardsPendingGradeSheet" class="ctm-awards-warn" hidden></div><section id="awardsPanelDashboard" class="ctm-awards-panel active"></section><section id="awardsPanelAcademic" class="ctm-awards-panel"></section><section id="awardsPanelConduct" class="ctm-awards-panel"></section><section id="awardsPanelAttendance" class="ctm-awards-panel"></section><section id="awardsPanelGrade12" class="ctm-awards-panel"></section><section id="awardsPanelRubrics" class="ctm-awards-panel"></section><section id="awardsPanelSpecial" class="ctm-awards-panel"></section><section id="awardsPanelReports" class="ctm-awards-panel"></section><div id="awardsPrintArea" class="ctm-awards-print-area" aria-hidden="true"></div></div></div>';
    document.body.appendChild(host);
    state.htmlInjected=true; bindUi(); return true;
  }
  function getClassId(){
    const dd=$id('classDropdown'); const opt=dd && dd.selectedIndex >= 0 ? dd.options[dd.selectedIndex] : null;
    const c=[
      window.currentClassId,
      dd&&dd.value,
      opt&&(opt.dataset.classId||opt.dataset.id||opt.getAttribute('data-class-id')||opt.getAttribute('data-id')),
      opt&&opt.value,
      opt&&opt.text,
      window.CTMLoadedClassContext&&window.CTMLoadedClassContext.classId
    ];
    for(const x of c){
      const v=normalizeClassKey(x);
      if(v && !/^(default|select\s+class|class\s+name|no\s+class\s+loaded)$/i.test(v)) return classKeyPart(v)||v;
    }
    return '';
  }
  function readJson(key, fallback){ try{ const v=localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }catch(_){ return fallback; } }
  function getClassMeta(classId){
    const meta=readJson('classmeta:'+classId, {});
    if(meta && Object.keys(meta).length) return meta;
    const classes=readJson('attendanceclasses', []);
    return (Array.isArray(classes)?classes:[]).find(c => slug(c.id||c.classId||c.name) === slug(classId)) || {};
  }
  function normalizeSex(v){ const s=text(v).toLowerCase(); if(s==='m'||s==='male') return 'Male'; if(s==='f'||s==='female') return 'Female'; return text(v); }
  function readRoster(classId){
    let list = Array.isArray(window.currentStudents) ? window.currentStudents : null;
    if(!list || !list.length) list = readJson('students-'+classId, []);
    return (Array.isArray(list)?list:[]).map((s,i)=>({
      learnerId:text(s.learnerId||s.id||s.studentId||s.lrn) || `learner-${i+1}-${slug(s.name||s.fullName||s.studentName)}`,
      id:text(s.id||s.learnerId||s.studentId||s.lrn) || `learner-${i+1}`,
      lrn:text(s.lrn),
      name:text(s.name||s.fullName||s.studentName),
      sex:normalizeSex(s.sex||s.gender),
      order:Number.isFinite(Number(s.order))?Number(s.order):i
    })).filter(x=>x.name).sort((a,b)=>a.order-b.order || xName(a).localeCompare(xName(b)));
  }
  function xName(x){ return text(x && x.name); }
  function structureLabel(v=state.academicStructure){ return ({quarter:'Quarter',firstSemester:'First Semester',secondSemester:'Second Semester',threeTerm:'Three Term',modifiedThreeTerm:'Modified Three Term'}[v] || 'Quarter'); }
  function periodDefs(structure=state.academicStructure){
    if(structure==='firstSemester') return [{key:'q1',label:'Q1'},{key:'q2',label:'Q2'}];
    if(structure==='secondSemester') return [{key:'q3',label:'Q3'},{key:'q4',label:'Q4'}];
    if(structure==='threeTerm') return [{key:'q1',label:'T1'},{key:'q2',label:'T2'},{key:'q3',label:'T3'}];
    if(structure==='modifiedThreeTerm') return [{key:'q1',label:'Term 1'},{key:'q2',label:'Term 2'},{key:'q3',label:'Term 3'}];
    return [{key:'q1',label:'Q1'},{key:'q2',label:'Q2'},{key:'q3',label:'Q3'},{key:'q4',label:'Q4'}];
  }

  function gradeSheetClassCandidates(classId){
    const dd=$id('classDropdown'); const opt=dd && dd.selectedIndex >= 0 ? dd.options[dd.selectedIndex] : null;
    return Array.from(new Set([
      classId, state.classId,
      window.currentClassId, window.currentClassName,
      window.CTMLoadedClassContext&&window.CTMLoadedClassContext.classId,
      window.CTMLoadedClassContext&&window.CTMLoadedClassContext.className,
      dd&&dd.value, opt&&opt.value, opt&&opt.text, opt&&opt.label,
      opt&&(opt.dataset.classId||opt.dataset.id||opt.getAttribute('data-class-id')||opt.getAttribute('data-id'))
    ].map(x=>classKeyPart(x)).filter(Boolean)));
  }

  function gradeSheetMatchesClass(data,key,classId){
    const wanted=gradeSheetClassCandidates(classId);
    if(!wanted.length) return true;
    const keyPart=text(key).replace(/^gradesheet::?/,'');
    const candidates=[keyPart,data&&data.classId,data&&data.className].map(x=>classKeyPart(x)).filter(Boolean);
    return candidates.some(x=>wanted.includes(x));
  }

  function findSavedGradeSheetSnapshot(classId){
    const directKeys=[];
    gradeSheetClassCandidates(classId).forEach(k=>{ directKeys.push('gradesheet:'+k,'gradesheet::'+k); });
    for(const key of directKeys){
      const gs=readJson(key,null);
      if(gs && typeof gs==='object') return gs; // CTM FIX 2026-08-05: keep Grade Sheet data even when only academicStructure is missing
    }
    try{
      for(let i=0;i<localStorage.length;i++){
        const key=localStorage.key(i)||'';
        if(!/^gradesheet::?/i.test(key)) continue;
        const gs=readJson(key,null);
        if(gs && typeof gs==='object' && gradeSheetMatchesClass(gs,key,classId)) return gs;
      }
    }catch(_){ }
    return null;
  }

  function getLiveGradeSheetSnapshot(){
    try{
      if(window.CTMGradeSheet && typeof window.CTMGradeSheet.refresh === 'function') window.CTMGradeSheet.refresh();
    }catch(_){ }
    try{
      if(window.CTMGradeSheet && typeof window.CTMGradeSheet.debugSnapshot === 'function'){
        const snap=window.CTMGradeSheet.debugSnapshot();
        if(snap && typeof snap==='object' && gradeSheetMatchesClass(snap,'',state.classId||getClassId())) return snap;
      }
    }catch(_){ }
    try{
      const st=window.CTMGradeSheet && window.CTMGradeSheet._debugState;
      if(st && typeof st==='object') return {classId:st.classId,className:st.className,academicStructure:st.academicStructure,subjects:st.subjects||[],grades:st.grades||{},mapehComponents:st.mapehComponents||{},learnerRecords:st.learnerRecords||{}};
    }catch(_){ }
    return null;
  }

  function getGradeSheetSnapshot(){
    const classId=state.classId || getClassId();
    return getLiveGradeSheetSnapshot() || findSavedGradeSheetSnapshot(classId);
  }

  // CTM FIX 2026-08-05: Resolve academic structure from Grade Sheet first, then class metadata, then shared header.
  // Quarter is now only a visible temporary fallback, never a silent assumption.
  function sharedHeaderValue(key){
    try{ return window.CTMSharedHeader && window.CTMSharedHeader.get && window.CTMSharedHeader.get(key); }catch(_){ return ''; }
  }
  function firstValidAcademicStructureFrom(obj){
    if(!obj || typeof obj!=='object') return '';
    const keys=['academicStructure','gradingStructure','termStructure'];
    for(const k of keys){ if(isValidAcademicStructure(obj[k])) return text(obj[k]); }
    return '';
  }
  function resolveAcademicStructure(meta){
    const gs=state.gradeSheet || getGradeSheetSnapshot();
    const fromGs=firstValidAcademicStructureFrom(gs);
    if(fromGs) return {value:fromGs, source:'Grade Sheet', unverified:false};
    const fromMeta=firstValidAcademicStructureFrom(meta || getClassMeta(state.classId||getClassId()));
    if(fromMeta) return {value:fromMeta, source:'Class metadata', unverified:false};
    const shared={
      academicStructure:sharedHeaderValue('academicStructure'),
      gradingStructure:sharedHeaderValue('gradingStructure'),
      termStructure:sharedHeaderValue('termStructure')
    };
    const fromShared=firstValidAcademicStructureFrom(shared);
    if(fromShared) return {value:fromShared, source:'Shared header', unverified:false};
    return {value:'quarter', source:'Temporary fallback', unverified:true};
  }
  function getActiveAcademicStructure(){
    const res=resolveAcademicStructure();
    state.academicStructureUnverified=!!res.unverified;
    return res.value;
  }

  function getObservedValueRequirement(academicStructure){
    if(academicStructure === 'modifiedThreeTerm' || academicStructure === 'threeTerm') return {total:21, requiredAO:16, basis:'75% of 21 Observed Value ratings'};
    return {total:28, requiredAO:21, basis:'75% of 28 Observed Value ratings'};
  }

  function resolvePolicyProfile(gradeLevel, schoolYear, academicStructure){
    const profile=resolveAwardPolicyProfile(gradeLevel, schoolYear, academicStructure);
    const ov=getObservedValueRequirement(academicStructure);
    const notes=[`Awards module follows ${profile.policyBasis} and the active Grade Sheet academic structure.`];
    if(profile.isKs1Descriptive){
      notes.push('KS1 descriptive grading: Academic Excellence and numerical honor labels are disabled. Use character traits, growth-based recognition, and narrative feedback.');
    }else if(profile.isTransition){
      notes.push(`${profile.transitionLabel}: learner is still under numerical grading during the KS1 transition, so Academic Excellence may be evaluated when grades are complete.`);
    }
    if(profile.isDo015 && !profile.isKs1Descriptive){
      notes.push('DO 015 academic rule: GA must be at least 90 and no Final Grade may be below 80; awardees should be listed alphabetically.');
    }
    if(profile.g12LegacyFallbackAvailable){
      notes.push('Grade 12 SY 2026-2027: DO 015 is primary for Grade 12 awards; DO 36 Work Immersion fallback remains available as an option for transition/local validation.');
    }
    if(academicStructure==='firstSemester' || academicStructure==='secondSemester') notes.push('Semester structure evaluates available periods and keeps full school-year awards pending until final requirements are complete.');
    return {
      policyBasis:profile.policyBasis,
      policyCode:profile.policyCode,
      fallbackPolicy:profile.g12LegacyFallbackAvailable ? 'DO 36, s. 2016 optional Grade 12 Work Immersion fallback' : '',
      transitionAware:!!profile.isTransition,
      transitionLabel:profile.transitionLabel,
      g12LegacyFallbackAvailable:!!profile.g12LegacyFallbackAvailable,
      keyStage:profile.keyStage,
      gradingMode:profile.gradingMode,
      honorLabelsMode:profile.honorLabelsMode,
      academicAwardsAllowed:profile.academicAwardsAllowed,
      academicRules:profile.academicRules,
      academicStructure,
      observedValueRequirement:ov,
      notes
    };
  }

  function gradeNumber(gradeLevel){ const m=text(gradeLevel).match(/(?:grade\s*)?(\d+)/i); return m ? Number(m[1]) : (/kindergarten|kinder/i.test(text(gradeLevel)) ? 0 : null); }
  function schoolYearStart(schoolYear){ const clean=text(schoolYear).replace(/[\u2013\u2014]/g,'-'); const m=clean.match(/(20\d{2})\s*[-/]\s*(20\d{2})/); return m ? Number(m[1]) : null; }
  function isGrade12Sy2026(){ return gradeNumber(state.gradeLevel) === 12 && schoolYearStart(state.schoolYear) === 2026; }
  function keyStageForGrade(n){ if(n===0 || (n>=1 && n<=3)) return 'KS1'; if(n>=4 && n<=6) return 'KS2'; if(n>=7 && n<=10) return 'KS3'; if(n>=11 && n<=12) return 'KS4'; return 'Unknown'; }
  function isDo015SchoolYear(schoolYear){ const y=schoolYearStart(schoolYear); return y!=null && y>=2026; }
  function isLegacySchoolYear(schoolYear){ const y=schoolYearStart(schoolYear); return y!=null && y<2026; }
  function ks1DescriptiveStatus(n, schoolYear){
    const y=schoolYearStart(schoolYear);
    if(!(n===0 || (n>=1 && n<=3)) || y==null) return false;
    if(y>=2028) return true;
    if(y===2027) return n===0 || n===1 || n===2;
    if(y===2026) return n===0 || n===1;
    return false;
  }
  function ks1TransitionStatus(n, schoolYear){
    const y=schoolYearStart(schoolYear);
    if(y===2026) return n===2 || n===3;
    if(y===2027) return n===3;
    return false;
  }
  // CTM FIX 2026-08-05: Policy basis and KS1 descriptive transition use parsed schoolYearStart().
  function resolveAwardPolicyProfile(gradeLevel, schoolYear, academicStructure=state.academicStructure){
    const n=gradeNumber(gradeLevel), sy=text(schoolYear), ks=keyStageForGrade(n), y=schoolYearStart(sy);
    const isDo015=y==null ? true : y>=2026;
    const isLegacy=y!=null && y<2026;
    const isKs1Descriptive=isDo015 && ks1DescriptiveStatus(n, sy);
    const isTransition=isDo015 && ks1TransitionStatus(n, sy);
    // CTM FIX 2026-08-05: Use parsed SY start year, not raw school year text, for transition checks.
    const g12LegacyFallbackAvailable=isDo015 && n===12 && y===2026;
    const policyCode=isLegacy ? 'DO36' : 'DO015';
    const policyBasis=isLegacy ? 'DO 36, s. 2016' : 'DO 015, s. 2026';
    const honorLabelsMode=isLegacy ? 'legacyHonorLabels' : (isKs1Descriptive ? 'none' : 'singleAcademicExcellence');
    const academicAwardsAllowed=!isKs1Descriptive && (isLegacy ? n>=1 && n<=12 : ((isTransition && (n===2 || n===3)) || (n>=4 && n<=12)));
    const gradingMode=isKs1Descriptive ? 'descriptive' : 'numerical';
    const transitionLabel=isTransition ? `KS1 Transition: Grade ${n} SY ${sy}` : '';
    return {
      policyCode, policyBasis, keyStage:ks, gradeNumber:n, schoolYear:sy, schoolYearStart:y,
      isDo015, isLegacy, isKs1Descriptive, isTransition, transitionLabel,
      g12LegacyFallbackAvailable, gradingMode, academicAwardsAllowed, honorLabelsMode, academicStructure,
      academicRules: isLegacy ? {minGA:90,minFG:75,categoryMode:'legacyHonorLabels'} : {minGA:90,minFG:80,categoryMode:'singleAcademicExcellence',alphabetical:true},
      applicableAwards: []
    };
  }
  function resolveAwardProfile(gradeLevel, schoolYear, academicStructure){
    // CTM FIX 2026-08-05: DO 015 KS1 profiles now expose the proper descriptive/transition award set.
    const profile=resolveAwardPolicyProfile(gradeLevel, schoolYear, academicStructure);
    const n=profile.gradeNumber, awards=[];
    if(profile.isLegacy){
      if(n===0) awards.push('Kindergarten performance awards','Special Recognition');
      else if(n>=1 && n<=3) awards.push('Academic Excellence','Perfect Attendance','Character Traits / Positive Behavior','Special Recognition');
      else if(n>=4 && n<=5) awards.push('Academic Excellence','Conduct Award','Perfect Attendance','Special Recognition');
      else if(n===6) awards.push('Academic Excellence','Conduct Award','Perfect Attendance','Leadership Award','Outstanding Performance in Specific Disciplines','Club/Organization Achievement','Special Recognition');
      else if(n>=7 && n<=9) awards.push('Academic Excellence','Conduct Award','Perfect Attendance','Club/Organization Achievement','Special Recognition');
      else if(n===10) awards.push('Academic Excellence','Conduct Award','Perfect Attendance','Leadership Award','Outstanding Performance in Specific Disciplines','Club/Organization Achievement','Special Recognition');
      else if(n===11) awards.push('Academic Excellence','Conduct Award','Perfect Attendance','Club/Organization Achievement','Special Recognition','Optional SHS preparation records');
      else if(n===12) awards.push('Academic Excellence','Conduct Award','Perfect Attendance','Leadership Award','Outstanding Performance in Specific Disciplines','Work Immersion Award','Research or Innovation Award','Club/Organization Achievement','Special Recognition');
    }else if(profile.isKs1Descriptive){
      awards.push('Character Traits / Positive Behavior','Growth-based Recognition / Certificate of Merit','Perfect Attendance','Special Recognition');
    }else if(profile.isTransition){
      awards.push('Academic Excellence Award','Character Traits / Positive Behavior','Growth-based Recognition / Certificate of Merit','Perfect Attendance','Special Recognition');
    }else if(profile.keyStage==='KS2' || profile.keyStage==='KS3' || profile.keyStage==='KS4'){
      // CTM FIX 2026-08-05 REMAINING: DO 015 KS2-KS4 profile no longer lists Perfect Attendance because the Attendance tab is intentionally hidden.
      awards.push('Academic Excellence Award','Leadership Excellence Award','Excellence in Specific Learning Area','Special Recognition');
      if(n===12) awards.push('Excellence in Work Immersion / Field Exposure / Arts Apprenticeship','Excellence in Research / Innovation');
    }
    profile.applicableAwards=awards;
    return {gradeLevel, schoolYear, academicStructure, keyStage:profile.keyStage, policyBasis:profile.policyBasis, gradingMode:profile.gradingMode, isTransition:profile.isTransition, awards};
  }


  function rootAwardsStore(){
    const root=readJson(STORAGE_KEY, null);
    if(root && root.schemaVersion && root.classes) return root;
    if(root && root.schemaVersion && root.classId){ return {schemaVersion:SCHEMA_VERSION, classes:{[root.classId]:root}}; }
    return {schemaVersion:SCHEMA_VERSION, classes:{}};
  }
  function defaultAwardsData(){
    return {schemaVersion:SCHEMA_VERSION,classId:state.classId,gradeLevel:state.gradeLevel,schoolYear:state.schoolYear,policyBasis:'DO 015, s. 2026',fallbackPolicy:'',academicStructure:state.academicStructure,transitionAware:false,observedValues:{},ks1Recognition:{},specialRecognition:[],rubricAwards:[],grade12Awards:{workImmersion:{},researchInnovation:{},leadership:{},discipline:{},club:{}},attendanceOverrides:{},acDecisions:{}};
  }
  function load(){
    const root=rootAwardsStore();
    state.awards = root.classes[state.classId] || defaultAwardsData();
    migrateData();
    pruneAwardsToRoster();
    return state.awards;
  }
  function migrateData(){
    const d=state.awards || defaultAwardsData();
    d.schemaVersion=SCHEMA_VERSION; d.classId=state.classId; d.gradeLevel=state.gradeLevel; d.schoolYear=state.schoolYear;
    d.policyBasis=(state.policy&&state.policy.policyBasis)||'DO 015, s. 2026'; d.academicStructure=state.academicStructure; d.transitionAware=!!(state.policy&&(state.policy.transitionAware||state.policy.g12LegacyFallbackAvailable)); d.fallbackPolicy=(state.policy&&state.policy.fallbackPolicy)||'';
    d.observedValues=d.observedValues||{}; d.ks1Recognition=d.ks1Recognition||{}; d.specialRecognition=Array.isArray(d.specialRecognition)?d.specialRecognition:[]; d.rubricAwards=Array.isArray(d.rubricAwards)?d.rubricAwards:[]; d.attendanceOverrides=d.attendanceOverrides||{}; d.acDecisions=d.acDecisions||{};
    d.grade12Awards=d.grade12Awards||{}; ['workImmersion','researchInnovation','leadership','discipline','club'].forEach(k=>d.grade12Awards[k]=d.grade12Awards[k]||{});
    if(!['do015','do36','transition'].includes(text(d.grade12Awards.workImmersionMode))) d.grade12Awards.workImmersionMode=((state.policy&&state.policy.g12LegacyFallbackAvailable)?'transition':'do015');
    state.awards=d;
  }
  // CTM FIX 2026-08-04: Keep Awards data roster-scoped.
  // Deleted learners can leave old learner-id keyed records in ctmAwardsV1.
  // Without pruning, Reports / Export still lists deleted learner IDs such as stu... as
  // Missing Evidence / Not Qualified.  Prune only when an active roster is loaded.
  function activeLearnerIdSet(){
    const ids=new Set();
    (state.roster||[]).forEach(l=>learnerIdCandidates(l).forEach(id=>ids.add(text(id))));
    return ids;
  }
  function isActiveLearnerId(id, ids=activeLearnerIdSet()){
    const v=text(id);
    return !v || !ids.size || ids.has(v);
  }
  function pruneKeyedByLearner(obj, ids){
    if(!obj || typeof obj!=='object') return obj;
    Object.keys(obj).forEach(k=>{ if(!isActiveLearnerId(k,ids)) delete obj[k]; });
    return obj;
  }
  function looksLikeLearnerRef(v){
    const s=text(v);
    return /^stu[a-z0-9]+$/i.test(s) || /^learner-/i.test(s) || /^\d{10,14}$/.test(s);
  }
  function pruneLearnerIdArray(arr, ids){
    return (Array.isArray(arr)?arr:[]).filter(v=>!looksLikeLearnerRef(v) || isActiveLearnerId(v,ids));
  }
  function pruneAwardsToRoster(){
    if(!state.awards || !(state.roster||[]).length) return state.awards;
    const ids=activeLearnerIdSet(), d=state.awards;
    pruneKeyedByLearner(d.observedValues,ids);
    pruneKeyedByLearner(d.attendanceOverrides,ids);
    pruneKeyedByLearner(d.acDecisions,ids);
    pruneKeyedByLearner(d.ks1Recognition,ids);
    d.specialRecognition=(Array.isArray(d.specialRecognition)?d.specialRecognition:[]).filter(r=>isActiveLearnerId(r&&r.learnerId,ids));
    const g12=d.grade12Awards||{};
    pruneKeyedByLearner(g12.workImmersion,ids);
    pruneKeyedByLearner(g12.leadership,ids);
    Object.keys(g12.discipline||{}).forEach(k=>{ const r=g12.discipline[k]||{}; if(!isActiveLearnerId(r.learnerId,ids)) delete g12.discipline[k]; });
    Object.values(g12.researchInnovation||{}).forEach(r=>{ if(r) r.members=pruneLearnerIdArray(r.members,ids); });
    Object.values(g12.club||{}).forEach(r=>{ if(r) r.members=pruneLearnerIdArray(r.members,ids); });
    return d;
  }
  function awardsExportSnapshot(){
    migrateData();
    pruneAwardsToRoster();
    return JSON.parse(JSON.stringify(state.awards||defaultAwardsData()));
  }
  function save(){ if(!state.classId || !state.awards) return false; migrateData(); pruneAwardsToRoster(); const root=rootAwardsStore(); root.classes[state.classId]=state.awards; localStorage.setItem(STORAGE_KEY, JSON.stringify(root)); return true; }

  function refreshContext(){
    state.classId=getClassId();
    const meta=state.classId ? getClassMeta(state.classId) : {};
    state.className=text(window.currentClassName || (window.CTMLoadedClassContext&&window.CTMLoadedClassContext.className) || meta.name || meta.className || meta.section || state.classId || 'No class loaded');
    state.gradeLevel=text(meta.gradeLevel || meta.grade || (window.CTMSharedHeader&&window.CTMSharedHeader.get&&window.CTMSharedHeader.get('gradeLevel')) || '');
    state.schoolYear=text(meta.schoolYear || (window.CTMSharedHeader&&window.CTMSharedHeader.get&&window.CTMSharedHeader.get('schoolYear')) || '');
    state.roster=state.classId ? readRoster(state.classId) : [];
    state.gradeSheet=getGradeSheetSnapshot();
    const structureResolution=resolveAcademicStructure(meta);
    state.academicStructure=structureResolution.value;
    state.academicStructureUnverified=!!structureResolution.unverified;
    state.policy=resolvePolicyProfile(state.gradeLevel, state.schoolYear, state.academicStructure);
    load();
    syncWorkImmersionFromGradeSheet();
    save();
  }

  function statusPill(status){
    const s=text(status); let cls='info';
    if(['Qualified','AC Approved'].includes(s)) cls='ok';
    else if(['Not Qualified','Disqualified','AC Rejected'].includes(s)) cls='bad';
    else if(/^Pending|Missing|For Review|Potential/.test(s)) cls='warn';
    return `<span class="ctm-awards-pill ${cls}">${esc(s||'For Review')}</span>`;
  }
  function statusLine(){ const ov=state.policy.observedValueRequirement; const unverified=state.academicStructureUnverified?' | Academic structure unverified: temporary quarter fallback':''; const conduct=isGrade12Sy2026()?` | Conduct requirement: ${ov.requiredAO} AO / ${ov.total}`:''; return `Policy Basis: ${state.policy.policyBasis} | ${state.policy.keyStage||'KS pending'} | ${state.gradeLevel||'Grade level pending'} | SY ${state.schoolYear||'pending'} | ${state.policy.gradingMode||'grading pending'} | ${structureLabel(state.academicStructure)}${conduct}${unverified}`; }

  function subjectVisible(s,q){ return !(s && s.termVisibility && s.termVisibility[q] === false); }
  function gradeFor(lid,sid,q){ return whole((((state.gradeSheet||{}).grades||{})[lid]||{})[sid] && (((state.gradeSheet||{}).grades||{})[lid]||{})[sid][q]); }
  function activeSubjects(){ return (((state.gradeSheet||{}).subjects)||[]).filter(s=>!s.archived); }
  function subjectFinal(lid,s){ const vals=periodDefs(state.academicStructure).filter(p=>subjectVisible(s,p.key)).map(p=>gradeFor(lid,s.id,p.key)); return vals.length && vals.every(Number.isInteger) ? avg(vals) : null; }
  function gradeSheetRows(){
    const gs=state.gradeSheet||{};
    if(window.CTMGradeSheet && typeof window.CTMGradeSheet.debugSnapshot==='function' && window.CTMGradeSheet._debugState && typeof window.CTMGradeSheet._debugState==='object'){}
    const subjects=activeSubjects();
    return state.roster.map(l=>{
      let finalGrades=[], periodGrades={};
      // CTM FIX 2026-08-05 REMAINING: Academic Excellence must always use subject-level Final Grades, including modifiedThreeTerm.
      finalGrades=subjects.map(s=>subjectFinal(l.learnerId,s));
      periodDefs(state.academicStructure).forEach(p=>{ const vals=subjects.filter(s=>subjectVisible(s,p.key)).map(s=>gradeFor(l.learnerId,s.id,p.key)); periodGrades[p.key]=vals.length&&vals.every(Number.isInteger)?avg(vals):null; });
      const complete=finalGrades.length>0 && finalGrades.every(Number.isInteger);
      const ga=complete ? avg(finalGrades) : null;
      const hasFail=complete ? finalGrades.some(g=>g<PASSING_GRADE) : false;
      return {learner:l, complete, finalGrades, periodGrades, ga, hasFail, subjects};
    });
  }
  // CTM FIX 2026-08-04: Auto-sync Grade 12 Work Immersion grades from Grade Sheet.
  // Grade Sheet stores Work Immersion as a normal subject, so Awards should read the
  // subject FG/final grade instead of requiring the adviser to retype the same grade.
  // Evidence and AC decision remain editable in Awards.
  // CTM FIX 2026-08-05 REMAINING: Function name stays for backward compatibility but now covers DO 015 Grade 12 practicum/apprenticeship subjects.
  function isWorkImmersionSubject(s){
    const n=norm([s&&s.name,s&&s.linkedRecord,s&&s.recordLabel].filter(Boolean).join(' '));
    return !!(n && (
      /\bwork\s+immersion\b/.test(n) ||
      /\bfield\s+exposure\b/.test(n) ||
      /\barts?\s+apprenticeship\b/.test(n) ||
      n==='wi' ||
      /\bimmersion\b/.test(n)
    ));
  }
  function workImmersionSubject(){
    const subjects=activeSubjects();
    return subjects.find(isWorkImmersionSubject) || null;
  }
  function gradeSheetGradeForLearner(learnerOrId,sid,q){
    const gs=state.gradeSheet||{}, grades=gs.grades||{};
    for(const lid of learnerIdCandidates(learnerOrId)){
      const v=whole(((grades[lid]||{})[sid]||{})[q]);
      if(Number.isInteger(v)) return v;
    }
    return null;
  }
  function gradeSheetSubjectFinalForLearner(learnerOrId,subject){
    if(!subject || !subject.id) return null;
    const vals=periodDefs(state.academicStructure)
      .filter(p=>subjectVisible(subject,p.key))
      .map(p=>gradeSheetGradeForLearner(learnerOrId,subject.id,p.key));
    return vals.length && vals.every(Number.isInteger) ? avg(vals) : null;
  }
  function workImmersionGradeFromGradeSheet(learnerOrId){
    const subject=workImmersionSubject();
    return subject ? gradeSheetSubjectFinalForLearner(learnerOrId,subject) : null;
  }
  function syncWorkImmersionFromGradeSheet(){
    const g12=state.awards&&state.awards.grade12Awards;
    if(!g12) return {changed:false, synced:0, subject:null};
    const subject=workImmersionSubject();
    if(!subject) return {changed:false, synced:0, subject:null};
    let changed=false, synced=0;
    g12.workImmersion=g12.workImmersion||{};
    (state.roster||[]).forEach(l=>{
      const grade=workImmersionGradeFromGradeSheet(l);
      if(!Number.isInteger(grade)) return;
      const rec=g12.workImmersion[l.learnerId]=g12.workImmersion[l.learnerId]||{};
      if(whole(rec.grade)!==grade || rec.gradeSource!=='Grade Sheet' || rec.gradeSubjectId!==subject.id){
        rec.grade=grade;
        rec.gradeSource='Grade Sheet';
        rec.gradeSubjectId=subject.id;
        rec.gradeSubjectName=subject.name||'Work Immersion';
        changed=true;
      }
      synced++;
    });
    return {changed,synced,subject};
  }
  function getWorkImmersionRecord(learnerOrId){
    const lid=typeof learnerOrId==='string' ? learnerOrId : (learnerOrId&&learnerOrId.learnerId);
    const rec=((state.awards.grade12Awards||{}).workImmersion||{})[lid]||{};
    const grade=workImmersionGradeFromGradeSheet(learnerOrId);
    return Number.isInteger(grade) ? {...rec,grade,gradeSource:'Grade Sheet'} : rec;
  }


  function honorCategory(ga){
    const profile=resolveAwardPolicyProfile(state.gradeLevel,state.schoolYear,state.academicStructure);
    if(!Number.isInteger(ga)) return '';
    if(profile.honorLabelsMode==='legacyHonorLabels'){
      if(ga>=98) return 'With Highest Honors';
      if(ga>=95) return 'With High Honors';
      if(ga>=90) return 'With Honors';
      return '';
    }
    return ga>=90 ? 'Academic Excellence Award' : '';
  }
  function evaluateAcademicExcellence(){
    const profile=resolveAwardPolicyProfile(state.gradeLevel,state.schoolYear,state.academicStructure);
    const rules=profile.academicRules||{minGA:90,minFG:80};
    return gradeSheetRows().map(r=>{
      if(!profile.academicAwardsAllowed) return {...r, category:'', status:'Not Qualified', reason:profile.isKs1Descriptive ? 'KS1 descriptive grading: no Academic Excellence Award is conferred' : 'Academic awards are not applicable for this grade level or school year'};
      if(!r.complete) return {...r, category:'', status:'Pending Grades', reason:'Incomplete Grade Sheet final/general average data'};
      const lowFg=(r.finalGrades||[]).filter(Number.isInteger).find(g=>g<rules.minFG);
      if(Number.isInteger(lowFg)) return {...r, category:'', status:'Not Qualified', reason:`Has Final Grade below ${rules.minFG}`};
      const cat=honorCategory(r.ga);
      if(r.ga>=rules.minGA && cat) return {...r, category:cat, status:'Qualified', reason:profile.isLegacy ? cat : `GA ${r.ga} meets DO 015 Academic Excellence rule and all Final Grades are at least ${rules.minFG}`};
      return {...r, category:'', status:'Not Qualified', reason:`General Average below ${rules.minGA}`};
    }).sort((a,b)=> profile.isDo015 ? xName(a.learner).localeCompare(xName(b.learner)) : 0);
  }

  function evaluateClassroomAcademic(){
    return gradeSheetRows().map(r=>{
      const periods={};
      Object.entries(r.periodGrades||{}).forEach(([k,ga])=>{ periods[k]=Number.isInteger(ga) ? {ga, category:honorCategory(ga), status:honorCategory(ga)?'Qualified':'Not Qualified'} : {ga:null, category:'', status:'Pending Grades'}; });
      return {learner:r.learner, periods};
    });
  }

  function ovRecord(lid){
    state.awards.observedValues[lid]=state.awards.observedValues[lid]||{};
    const rec=state.awards.observedValues[lid];
    periodDefs(state.academicStructure).forEach((p,i)=>{ const key=ovKeyForPeriod(p.key,i); if(!Array.isArray(rec[key])) rec[key]=Array(OV_ITEMS_PER_PERIOD).fill(''); while(rec[key].length<OV_ITEMS_PER_PERIOD) rec[key].push(''); });
    rec.majorOffense=!!rec.majorOffense; rec.notes=text(rec.notes); return rec;
  }
  function ovKeyForPeriod(q,i){
    if(state.academicStructure==='modifiedThreeTerm') return ['term1','term2','term3'][i] || q;
    if(state.academicStructure==='threeTerm') return ['t1','t2','t3'][i] || q;
    return q;
  }

  // CTM FIX 2026-08-04: Awards Conduct & OV must use SF9 as the source of truth.
  // SF9 stores Observed Values in sf9-meta:<classId>.learnerCoreValues using these row keys
  // and q1/q2/q3/q4 period keys. Awards no longer computes Conduct eligibility from its
  // own editable observedValues grid.
  const SF9_CORE_VALUE_ROWS = [
    {key:'md1', label:'1. Maka-Diyos', statement:"Expresses one's spiritual beliefs while respecting the spiritual beliefs of others"},
    {key:'md2', label:'', statement:'Shows adherence to ethical principles by upholding truth'},
    {key:'mt1', label:'2. Makatao', statement:'Is sensitive to individual, social, and cultural differences'},
    {key:'mt2', label:'', statement:'Demonstrates contributions toward solidarity'},
    {key:'mk1', label:'3. Makakalikasan', statement:'Cares for the environment and utilizes resources wisely, judiciously, and economically'},
    {key:'mb1', label:'4. Makabansa', statement:'Demonstrates pride in being a Filipino; exercises the rights and responsibilities of a Filipino citizen'},
    {key:'mb2', label:'', statement:'Demonstrates appropriate behavior in carrying out activities in the school, community, and country'}
  ];
  function sf9MetaKeyCandidates(){
    return Array.from(new Set([state.classId,getClassId(),window.currentClassId].map(classKeyPart).filter(Boolean).map(k=>'sf9-meta:'+k)));
  }
  function getSf9Meta(){
    for(const key of sf9MetaKeyCandidates()){ const m=readJson(key,null); if(m && typeof m==='object') return m; }
    return {};
  }
  function learnerIdCandidates(learnerOrId){
    const raw=typeof learnerOrId==='string' ? learnerOrId : (learnerOrId&&learnerOrId.learnerId);
    const l=typeof learnerOrId==='object' ? learnerOrId : (state.roster.find(x=>x.learnerId===raw||x.id===raw||x.lrn===raw)||{});
    const ids=[raw,l&&l.learnerId,l&&l.id,l&&l.studentId,l&&l.lrn].map(text).filter(Boolean);
    const nm=norm(l&&l.name), sx=normalizeSex(l&&l.sex).toLowerCase();
    state.roster.forEach(r=>{
      const rnm=norm(r&&r.name), rsx=normalizeSex(r&&r.sex).toLowerCase();
      if(nm && rnm===nm && (!sx || !rsx || sx===rsx)) ids.push(r.learnerId,r.id,r.lrn);
    });
    return Array.from(new Set(ids.map(text).filter(Boolean)));
  }
  function getSf9CoreValuesForLearner(learnerOrId){
    const store=(getSf9Meta().learnerCoreValues)||{};
    const out={};
    learnerIdCandidates(learnerOrId).forEach(id=>{
      const saved=store[id]||{};
      Object.keys(saved).forEach(rowKey=>{ out[rowKey]=Object.assign(out[rowKey]||{}, saved[rowKey]||{}); });
    });
    return out;
  }
  function sf9PeriodKeys(){
    return periodDefs(state.academicStructure).map(p=>p.key).filter(k=>/^q[1-4]$/.test(k));
  }
  function sf9ObservedValuesRecord(learnerOrId){
    const saved=getSf9CoreValuesForLearner(learnerOrId), periods=sf9PeriodKeys();
    const cells=[];
    SF9_CORE_VALUE_ROWS.forEach(r=>periods.forEach(q=>cells.push({rowKey:r.key,period:q,value:text(saved[r.key]&&saved[r.key][q]).toUpperCase()})));
    const filled=cells.filter(c=>text(c.value)).length;
    const ao=cells.filter(c=>c.value==='AO'||c.value==='ALWAYS OBSERVED').length;
    return {source:'SF9', rows:SF9_CORE_VALUE_ROWS, periods, saved, cells, filled, ao};
  }
  function evaluateConductAward(learnerOrId){
    const lid=typeof learnerOrId==='string' ? learnerOrId : (learnerOrId && learnerOrId.learnerId);
    const rec=ovRecord(lid);
    const req=getObservedValueRequirement(state.academicStructure);
    const sf9=sf9ObservedValuesRecord(learnerOrId);
    const filled=sf9.filled, ao=sf9.ao;
    if(rec.majorOffense) return {learnerId:lid, aoCount:ao, total:req.total, requiredAO:req.requiredAO, source:'SF9', status:'Disqualified', reason:'Suspension-level or higher offense'};
    if(filled < req.total) return {learnerId:lid, aoCount:ao, total:req.total, requiredAO:req.requiredAO, source:'SF9', status:'Pending Observed Values', reason:`SF9 OV incomplete: ${filled}/${req.total} ratings encoded`};
    if(ao >= req.requiredAO) return {learnerId:lid, aoCount:ao, total:req.total, requiredAO:req.requiredAO, source:'SF9', status:'Qualified', reason:`SF9 AO Count: ${ao}/${req.total}`};
    return {learnerId:lid, aoCount:ao, total:req.total, requiredAO:req.requiredAO, source:'SF9', status:'Not Qualified', reason:`SF9 AO count below ${req.requiredAO} threshold`};
  }

  function attendanceDatesForPeriod(periodKey){
    const sy=state.schoolYear; const m={q1:[6,7,8],q2:[9,10],q3:[11,12,1],q4:[2,3,4],t1:[6,7,8],t2:[9,10,11],t3:[12,1,2],term1:[6,7,8],term2:[9,10,11],term3:[12,1,2]};
    const months=m[periodKey] || [];
    // CTM FIX 2026-08-05 REMAINING: Parse flexible SY formats (e.g., SY 2026-2027, 2026 – 2027) through the shared helper.
    const startYear=schoolYearStart(sy) || new Date().getFullYear();
    const dates=[];
    try{
      for(let i=0;i<localStorage.length;i++){
        const k=localStorage.key(i)||''; const mt=k.match(/^attendance-(\d{4}-\d{2}-\d{2})-(.+)$/); if(!mt || mt[2]!==state.classId) continue;
        const d=mt[1], parts=d.split('-').map(Number), y=parts[0], mon=parts[1]; if(!months.includes(mon)) continue;
        const expectedYear=mon>=6 ? startYear : startYear+1; if(y===expectedYear) dates.push(d);
      }
    }catch(_){ }
    return Array.from(new Set(dates)).sort();
  }
  function attendanceStatusForDate(date,l){ const day=readJson(`attendance-${date}-${state.classId}`, {}); return text(day[l.id] || day[l.learnerId] || day[l.name] || '').toUpperCase(); }
  function evaluatePerfectAttendance(){
    const periods=periodDefs(state.academicStructure);
    return state.roster.map(l=>{
      const per={}; let overall='Qualified', review=false;
      periods.forEach((p,i)=>{
        const pk=ovKeyForPeriod(p.key,i); const dates=attendanceDatesForPeriod(pk).concat(attendanceDatesForPeriod(p.key));
        if(!dates.length){ per[p.key]={label:p.label,status:'Pending Attendance',reason:'No attendance records found'}; overall='Pending Attendance'; return; }
        let absent=false, cutting=false, pending=false, tardy=0, excuse=0;
        dates.forEach(d=>{ const s=attendanceStatusForDate(d,l); if(!s||s==='PENDING') pending=true; else if(s==='ABSENT') absent=true; else if(s==='CUTTING') cutting=true; else if(s==='TARDY') tardy++; else if(s==='EXCUSE') excuse++; });
        let st='Qualified', reason='Present/authorized only';
        if(absent || cutting){ st='Not Qualified'; reason=absent?'Has absent record':'Has cutting record'; }
        else if(pending){ st='Pending Attendance'; reason='Pending attendance exists'; }
        else if(tardy || excuse){ st='For Review'; reason=`Tardy: ${tardy}, Excuse: ${excuse}`; review=true; }
        per[p.key]={label:p.label,status:st,reason}; if(st==='Not Qualified') overall='Not Qualified'; else if(st==='Pending Attendance' && overall==='Qualified') overall='Pending Attendance';
      });
      if(overall==='Qualified' && review) overall='For Review';
      return {learner:l,status:overall,periods:per};
    });
  }

  function workImmersionPolicyMode(){
    const g12=(state.awards&&state.awards.grade12Awards)||{};
    const mode=text(g12.workImmersionMode);
    if(['do015','do36','transition'].includes(mode)) return mode;
    return state.policy&&state.policy.g12LegacyFallbackAvailable ? 'transition' : 'do015';
  }

  function workImmersionModeLabel(mode=workImmersionPolicyMode()){
    return ({do015:'DO 015, s. 2026: Highest Grade + Industry/Supervisor Endorsement',do36:'DO 36, s. 2016 Legacy: Grade at least 90 + Evidence',transition:'Transition Mode: DO 015 primary with DO 36 legacy fallback'}[mode]||'DO 015, s. 2026');
  }
  function workImmersionTopGrade(){
    const grades=(state.roster||[]).map(l=>whole(getWorkImmersionRecord(l).grade)).filter(Number.isInteger);
    return grades.length ? Math.max(...grades) : null;
  }
  function workImmersionHasEndorsement(record){ return !!text(record&&record.evidence); }
  // CTM FIX 2026-08-05: DO 015 Work Immersion requires grade >=90, batch top grade, endorsement, and high ratings from supervisor and subject teacher.
  function workImmersionRatingPass(v){
    const s=norm(v);
    return ['high','very high','outstanding','efficient','highly efficient'].includes(s);
  }
  function evaluateWorkImmersionDo015(record, learnerOrId){
    const r=record||{}, g=whole(r.grade), top=workImmersionTopGrade(), endorsed=workImmersionHasEndorsement(r);
    const supervisorOk=workImmersionRatingPass(r.supervisorRating), teacherOk=workImmersionRatingPass(r.teacherRating);
    if(g==null) return {...r,policyMode:'do015',topGrade:top,status:'Pending Grades',reason:'Missing Work Immersion / Field Exposure / Arts Apprenticeship grade'};
    if(top==null) return {...r,policyMode:'do015',topGrade:top,status:'Pending Grades',reason:'No Work Immersion grades found for comparison'};
    if(g<90) return {...r,policyMode:'do015',topGrade:top,status:'Not Qualified',reason:'Grade is below 90'};
    if(g<top) return {...r,policyMode:'do015',topGrade:top,status:'Not Qualified',reason:`DO 015 requires the highest Work Immersion grade. Current grade ${g}; highest grade ${top}.`};
    if(!endorsed) return {...r,policyMode:'do015',topGrade:top,status:'Missing Evidence',reason:'Missing industry partner / supervisor endorsement evidence'};
    if(!text(r.supervisorRating)) return {...r,policyMode:'do015',topGrade:top,status:'Missing Evidence',reason:'Missing supervisor high performance/efficiency rating'};
    if(!text(r.teacherRating)) return {...r,policyMode:'do015',topGrade:top,status:'Missing Evidence',reason:'Missing subject teacher high performance/efficiency rating'};
    if(!supervisorOk) return {...r,policyMode:'do015',topGrade:top,status:'Not Qualified',reason:'Supervisor rating is not a passing high performance/efficiency value'};
    if(!teacherOk) return {...r,policyMode:'do015',topGrade:top,status:'Not Qualified',reason:'Subject teacher rating is not a passing high performance/efficiency value'};
    return {...r,policyMode:'do015',topGrade:top,status:r.acDecision||'Potential Qualifier',reason:`DO 015: grade ${g} is the batch top and all endorsement/rating requirements are recorded`};
  }
  function evaluateWorkImmersionDo36(record){
    const r=record||{}, g=whole(r.grade), endorsed=workImmersionHasEndorsement(r);
    if(g==null) return {...r,policyMode:'do36',status:'Pending Grades',reason:'Missing Work Immersion grade'};
    if(g<90) return {...r,policyMode:'do36',status:'Not Qualified',reason:'DO 36 legacy fallback requires Work Immersion grade of at least 90'};
    if(!endorsed) return {...r,policyMode:'do36',status:'Missing Evidence',reason:'Grade is at least 90 but supervisor/teacher evidence or endorsement is missing'};
    return {...r,policyMode:'do36',status:r.acDecision||'Potential Qualifier',reason:'DO 36 legacy fallback: Work Immersion grade is at least 90 with required evidence'};
  }
  function evaluateWorkImmersion(record, learnerOrId, mode=workImmersionPolicyMode()){
    const r=record||{};
    const currentMode=['do015','do36','transition'].includes(text(mode)) ? text(mode) : workImmersionPolicyMode();
    const do015=evaluateWorkImmersionDo015(r, learnerOrId);
    const do36=evaluateWorkImmersionDo36(r);
    if(currentMode==='do015') return {...do015,legacyStatus:do36.status,legacyReason:do36.reason,modeLabel:workImmersionModeLabel('do015')};
    if(currentMode==='do36') return {...do36,do015Status:do015.status,do015Reason:do015.reason,modeLabel:workImmersionModeLabel('do36')};
    if(['Potential Qualifier','Qualified','AC Approved'].includes(do015.status)) return {...do015,legacyStatus:do36.status,legacyReason:do36.reason,modeLabel:workImmersionModeLabel('transition')};
    if(['Potential Qualifier','Qualified','AC Approved'].includes(do36.status)) return {...do36,status:do36.acDecision||'Potential Qualifier / Legacy Fallback',do015Status:do015.status,do015Reason:do015.reason,modeLabel:workImmersionModeLabel('transition'),reason:`Transition fallback accepted under DO 36 legacy rule. DO 015 result: ${do015.reason}`};
    if(do015.status==='Missing Evidence' || do36.status==='Missing Evidence') return {...(do015.status==='Missing Evidence'?do015:do36),do015Status:do015.status,legacyStatus:do36.status,modeLabel:workImmersionModeLabel('transition')};
    if(do015.status==='Pending Grades' || do36.status==='Pending Grades') return {...(do015.status==='Pending Grades'?do015:do36),do015Status:do015.status,legacyStatus:do36.status,modeLabel:workImmersionModeLabel('transition')};
    return {...do015,legacyStatus:do36.status,legacyReason:do36.reason,modeLabel:workImmersionModeLabel('transition')};
  }
  function rubricTotal(criteria){ return (criteria||[]).reduce((sum,c)=>sum + ((num(c.score)||0) * ((num(c.weight)||0)/100)),0); }
  // CTM FIX 2026-08-04: Research/Innovation scores follow the DepEd points-per-criterion tables.
  // DepEd Order No. 36, s. 2016 Tables 5 and 6 give Research/Innovation criteria whose weights
  // already total 100 points.  A score such as 19 under Research Grade (20) means 19/20 points,
  // not 19% multiplied again by 20%.
  function riCriterionPoints(c){
    const score=num(c&&c.score), max=num(c&&c.weight)||0;
    if(score==null) return null;
    return Math.max(0, Math.min(score,max));
  }
  function riRubricTotal(criteria){
    return (criteria||[]).reduce((sum,c)=>sum+(riCriterionPoints(c)||0),0);
  }
  function evaluateResearchInnovation(record){
    const r=record||{};
    if(!r.mode) return {...r,status:'Pending Rubric',total:0,maxTotal:100,reason:'Select Research or Innovation mode'};
    const criteria=ensureCriteria(r,'ri',r.mode);
    const total=riRubricTotal(criteria);
    const members=Array.isArray(r.members)?r.members:[];
    if(members.length>4) return {...r,total,maxTotal:100,status:'For Review',reason:'Group entries may have a maximum of 4 members'};
    if(criteria.some(c=>num(c.score)==null)) return {...r,total,maxTotal:100,status:'Pending Rubric',reason:'Incomplete rubric score'};
    const over=criteria.find(c=>num(c.score)>(num(c.weight)||0));
    if(over) return {...r,total,maxTotal:100,status:'For Review',reason:`Score for ${over.name} exceeds the maximum ${over.weight} points`};
    if(total<90) return {...r,total,maxTotal:100,status:'Not Qualified',reason:'Total score below 90'};
    if(!text(r.evidence)) return {...r,total,maxTotal:100,status:'Missing Evidence',reason:'Portfolio/evidence reference is required for AC validation'};
    return {...r,total,maxTotal:100,status:r.acDecision||'Potential Qualifier',reason:'Total score at least 90 and evidence is recorded'};
  }
  function evaluateLeadership(record){ const r=record||{}, ac=(r.adviserCriteria||[]), pc=(r.peerCriteria||[]); if(r.majorOffense || r.hasFailingGrade) return {...r,status:'Disqualified',reason:r.majorOffense?'Major offense':'Has failing grade'}; if(!r.membershipEvidence) return {...r,status:'Missing Evidence',reason:'Missing membership/officer record'}; if(!ac.length || !pc.length || ac.some(c=>num(c.score)==null) || pc.some(c=>num(c.score)==null)) return {...r,status:'Missing Evidence',reason:'Missing adviser or peer rubric score'}; const a=rubricTotal(ac), p=rubricTotal(pc), total=(a*.6)+(p*.4); return {...r,total,status:total>=90?(r.acDecision||'Qualified'):'For Review',reason:total>=90?'Meets leadership score':'Below 90 or partial data'}; }
  function evaluateDisciplineAward(record){ const r=record||{}; const total=rubricTotal(r.criteria||[]); if((r.criteria||[]).some(c=>num(c.score)==null)) return {...r,total,status:'Pending Rubric'}; return {...r,total,status:total>=90?(r.acDecision||'Potential Qualifier'):'Not Qualified',reason:total>=90?'Total score at least 90':'Total score below 90'}; }
  function evaluateClubAchievement(record){ const r=record||{}; const total=rubricTotal(r.criteria||[]); if(!text(r.organizationName)) return {...r,total,status:'Missing Evidence',reason:'Missing club/organization name'}; if((r.criteria||[]).some(c=>num(c.score)==null)) return {...r,total,status:'Pending Rubric',reason:'Incomplete club/organization rubric'}; return {...r,total,status:total>=90?(r.acDecision||'Potential Qualifier'):'Not Qualified',reason:total>=90?'Total score at least 90':'Total score below 90'}; }


  // CTM FIX 2026-08-05: KS1 Character Traits / Growth Recognition functional data model and evaluator.
  function ks1RecognitionRecord(lid){
    state.awards.ks1Recognition=state.awards.ks1Recognition||{};
    const rec=state.awards.ks1Recognition[lid]=state.awards.ks1Recognition[lid]||{};
    rec.term=text(rec.term); rec.coreAward=text(rec.coreAward); rec.gmrcCompetency=text(rec.gmrcCompetency);
    rec.teacherNote=text(rec.teacherNote); rec.evidence=text(rec.evidence); rec.certificateText=text(rec.certificateText);
    rec.status=['For Review','AC Approved','AC Rejected'].includes(text(rec.status)) ? text(rec.status) : 'For Review';
    return rec;
  }
  function evaluateKS1Recognition(){
    const profile=currentAwardPolicy();
    if(!(profile.isDo015 && profile.keyStage==='KS1')) return [];
    return (state.roster||[]).map(l=>{
      const r=ks1RecognitionRecord(l.learnerId);
      const missing=[];
      if(!text(r.coreAward)) missing.push('trait/award');
      if(!text(r.gmrcCompetency)) missing.push('GMRC competency');
      if(!text(r.teacherNote)) missing.push('teacher note');
      if(!text(r.evidence)) missing.push('evidence');
      const status=(r.status==='AC Approved'||r.status==='AC Rejected') ? r.status : (missing.length?'For Review':'For Review');
      const reason=missing.length ? 'For review: missing '+missing.join(', ') : 'Ready for Awards Committee review';
      return {learner:l,...r,status,reason};
    });
  }

  // CTM FIX 2026-08-05: DO 015 Excellence in Specific Learning Area is automatic from Grade Sheet subject final grades.
  function evaluateSpecificLearningAreaExcellence(){
    const profile=currentAwardPolicy();
    if(!(profile.isDo015 && (profile.keyStage==='KS2'||profile.keyStage==='KS3'||profile.keyStage==='KS4'))) return [];
    const subjects=activeSubjects();
    if(!subjects.length) return [{subject:'',topGrade:null,status:'Pending Grades',awardees:[],reason:'No active Grade Sheet subjects found'}];
    return subjects.map(s=>{
      // TODO: For KS4, group elective clusters here once Grade Sheet subject metadata exposes a stable cluster key.
      const grades=(state.roster||[]).map(l=>({learner:l, fg:subjectFinal(l.learnerId,s)}));
      if(!grades.length || grades.every(x=>!Number.isInteger(x.fg))) return {subject:s.name||s.label||s.id,topGrade:null,status:'Pending Grades',awardees:[],reason:'No complete final grades for this learning area'};
      if(grades.some(x=>!Number.isInteger(x.fg))) return {subject:s.name||s.label||s.id,topGrade:null,status:'Pending Grades',awardees:grades.filter(x=>!Number.isInteger(x.fg)).map(x=>({learner:x.learner,fg:null,status:'Pending Grades',reason:'Incomplete subject final grade'})),reason:'One or more learners have incomplete grades'};
      const top=Math.max(...grades.map(x=>x.fg));
      if(top<90) return {subject:s.name||s.label||s.id,topGrade:top,status:'Not Qualified',awardees:[],reason:'Highest final grade is below 90'};
      const awardees=grades.filter(x=>x.fg===top).sort((a,b)=>xName(a.learner).localeCompare(xName(b.learner))).map(x=>({learner:x.learner,fg:x.fg,status:'Qualified',reason:'Tied highest final grade in the batch and at least 90'}));
      return {subject:s.name||s.label||s.id,topGrade:top,status:'Qualified',awardees,reason:'Highest final grade in the batch is at least 90'};
    });
  }

  function policyGradeNumber(){ return gradeNumber(state.gradeLevel); }
  function currentAwardPolicy(){ return resolveAwardPolicyProfile(state.gradeLevel,state.schoolYear,state.academicStructure); }
  // CTM FIX 2026-08-05 REMAINING: Normalize Research/Design mode labels by active policy without deleting old saved records.
  function normalizeResearchInnovationModeForPolicy(mode, policy=currentAwardPolicy()){
    const m=text(mode) || 'Research';
    if(policy.isDo015 && (m==='Innovation' || m==='Innovation Legacy')) return 'Design and Innovation';
    if(policy.isLegacy && m==='Design and Innovation') return 'Innovation Legacy';
    return m;
  }
  function leadershipScoreValue(r, prefix, name){
    const key=prefix+'_'+slug(name);
    if(r && r[key] != null) return r[key];
    // CTM FIX 2026-08-05 REMAINING: Preserve old saved leadership score keys after label expansion.
    if(name==='Motivational and Communication Skills') return r && r[prefix+'_motivational-skills'] != null ? r[prefix+'_motivational-skills'] : '';
    return '';
  }
  function leadershipEvalForRecord(r){
    r=r||{};
    return evaluateLeadership({ ...r, adviserCriteria: criterionDefs('leadership').map(d=>({name:d[0],weight:d[1],score:leadershipScoreValue(r,'adv',d[0])})), peerCriteria: criterionDefs('leadership').map(d=>({name:d[0],weight:d[1],score:leadershipScoreValue(r,'peer',d[0])})) });
  }
  function awardUiRules(){
    // CTM FIX 2026-08-05: DO 015 KS1 learners need Attendance and KS1 recognition; Conduct remains legacy only.
    const profile=currentAwardPolicy(), n=profile.gradeNumber;
    const legacyConduct=profile.isLegacy && n>=4 && n<=12;
    // CTM FIX 2026-08-05 G12 SF9 OV: show Conduct & OV as an SF9 Observed Values check for Grade 12 SY 2026-2027 transition.
    const do015G12TransitionConduct=profile.isDo015 && n===12 && profile.schoolYearStart===2026;
    const legacyAttendance=profile.isLegacy && n>=1 && n<=12;
    const do015Ks1Attendance=profile.isDo015 && profile.keyStage==='KS1';
    const grade12=n===12;
    const ks1Recognition=profile.isDo015 && profile.keyStage==='KS1';
    const rubrics=ks1Recognition || (profile.isLegacy && [6,10,12].includes(n)) || (profile.isDo015 && (profile.keyStage==='KS2' || profile.keyStage==='KS3' || profile.keyStage==='KS4'));
    return {
      dashboard:true,
      academic:!!profile.academicAwardsAllowed,
      conduct:legacyConduct || do015G12TransitionConduct,
      attendance:legacyAttendance || do015Ks1Attendance,
      grade12:grade12,
      rubrics:rubrics,
      special:true,
      reports:true
    };
  }

  function isAwardTabVisible(tab){ const rules=awardUiRules(); return !!rules[tab]; }
  function visibleAwardTabs(){ const rules=awardUiRules(); return ['dashboard','academic','conduct','attendance','grade12','rubrics','special','reports'].filter(t=>rules[t]); }
  function awardPanelId(tab){ return 'awardsPanel'+tab.charAt(0).toUpperCase()+tab.slice(1); }
  function refreshAwardTabVisibility(){
    const visible=new Set(visibleAwardTabs());
    document.querySelectorAll('#awardsModal .ctm-awards-tab').forEach(b=>{
      const show=visible.has(b.dataset.awardsTab);
      b.hidden=!show;
      b.style.display=show?'':'none';
    });
    ['dashboard','academic','conduct','attendance','grade12','rubrics','special','reports'].forEach(t=>{
      const el=$id(awardPanelId(t));
      if(el) el.hidden=!visible.has(t);
    });
    if(!visible.has(state.activeTab)) state.activeTab='dashboard';
  }
  function emptyHiddenPanel(tab){ const el=$id(awardPanelId(tab)); if(el && !isAwardTabVisible(tab)) el.innerHTML=''; }
  function visibleSummaryTiles(items){ return items.filter(Boolean).join(''); }

  function renderAll(){
    refreshAwardTabVisibility();
    const sl=$id('awardsStatusLine'); if(sl) sl.textContent=statusLine();
    const banner=$id('awardsTransitionBanner'); if(banner){ banner.hidden=!state.policy.transitionAware; banner.textContent=state.policy.transitionAware ? `${state.policy.transitionLabel}. Awards & Recognition follows DO 015, s. 2026 KS1 transition implementation and the active Grade Sheet grading system.` : ''; }
    const pending=$id('awardsPendingGradeSheet'); if(pending){ const msg=state.academicStructureUnverified ? 'Academic structure was not resolved from Grade Sheet/class metadata. Quarter was used as temporary fallback. Open/save Grade Sheet or class setup to verify.' : 'Pending Grade Sheet Data. Awards can open, but Academic Excellence stays Pending Grades until Grade Sheet final/general average data is available.'; pending.hidden=!(state.academicStructureUnverified || !(state.gradeSheet && state.gradeSheet.subjects && state.gradeSheet.subjects.length)); pending.textContent=msg; }
    renderDashboard();
    if(isAwardTabVisible('academic')) renderAcademic(); else emptyHiddenPanel('academic');
    if(isAwardTabVisible('conduct')) renderConduct(); else emptyHiddenPanel('conduct');
    if(isAwardTabVisible('attendance')) renderAttendance(); else emptyHiddenPanel('attendance');
    if(isAwardTabVisible('grade12')) renderGrade12Awards(); else emptyHiddenPanel('grade12');
    if(isAwardTabVisible('rubrics')) renderRubrics(); else emptyHiddenPanel('rubrics');
    renderSpecialRecognition();
    renderReports();
    switchTab(state.activeTab||'dashboard');
  }

  function renderDashboard(){
    const p=$id('awardsPanelDashboard'); if(!p) return;
    const profile=resolveAwardProfile(state.gradeLevel,state.schoolYear,state.academicStructure);
    const rules=awardUiRules();
    const academic=rules.academic ? evaluateAcademicExcellence() : [];
    const conduct=rules.conduct ? state.roster.map(l=>evaluateConductAward(l.learnerId)) : [];
    const attendance=rules.attendance ? evaluatePerfectAttendance() : [];
    syncWorkImmersionFromGradeSheet();
    const wi=rules.grade12 ? state.roster.map(l=>evaluateWorkImmersion(getWorkImmersionRecord(l),l)) : [];
    const ri=rules.grade12 ? Object.values((state.awards.grade12Awards||{}).researchInnovation||{}).map(evaluateResearchInnovation) : [];
    const pending=[...academic,...conduct,...attendance,...wi,...ri].filter(x=>/^Pending/.test(x.status)||/Missing/.test(x.status)).length;
    const missing=[...wi,...ri].filter(x=>/Missing Evidence/.test(x.status||'')).length;
    const tiles=visibleSummaryTiles([
      tile('Loaded class',state.className),
      tile('Grade level',state.gradeLevel||'Pending'),
      tile('School year',state.schoolYear||'Pending'),
      tile('Academic structure',structureLabel() + (state.academicStructureUnverified ? ' (unverified fallback)' : '')),
      tile('Policy basis',state.policy.policyBasis),
      state.policy.fallbackPolicy ? tile('Fallback/reference',state.policy.fallbackPolicy) : tile('Fallback/reference','Not needed'),
      rules.conduct ? tile('Observed Values',`${state.policy.observedValueRequirement.requiredAO} AO / ${state.policy.observedValueRequirement.total}`) : '',
      rules.conduct ? tile('OV source','SF9') : '',
      tile('Total learners',state.roster.length),
      rules.academic ? tile('Academic qualifiers',academic.filter(x=>x.status==='Qualified').length) : '',
      rules.conduct ? tile('Conduct qualifiers',conduct.filter(x=>x.status==='Qualified').length) : '',
      rules.attendance ? tile('Perfect attendance',attendance.filter(x=>x.status==='Qualified').length) : '',
      rules.grade12 ? tile('WI potential',wi.filter(x=>/Potential|Qualified/.test(x.status)).length) : '',
      rules.grade12 ? tile('Research/Innovation',ri.length) : '',
      tile('Special recognition',state.awards.specialRecognition.length),
      (rules.grade12 && missing) ? tile('Missing evidence',missing) : '',
      pending ? tile('Pending items',pending) : tile('Pending items',0)
    ]);
    p.innerHTML=`<div class="ctm-awards-card"><h3>Dashboard</h3><div class="ctm-awards-status">${esc(statusLine())}</div><div class="ctm-awards-grid">${tiles}</div>
      <h4>Available award categories</h4><p class="ctm-awards-mini">${profile.awards.map(esc).join(' • ') || 'No profile resolved'}</p>
      <h4>Policy notes</h4><ul>${state.policy.notes.map(n=>`<li>${esc(n)}</li>`).join('')}</ul></div>`;
  }
  function tile(label,value){ return `<div class="ctm-awards-tile"><div class="label">${esc(label)}</div><div class="value">${esc(value)}</div></div>`; }

  function renderAcademic(){
    const p=$id('awardsPanelAcademic'); if(!p) return; const rows=evaluateAcademicExcellence(); const classroom=evaluateClassroomAcademic();
    p.innerHTML=`<div class="ctm-awards-card"><h3>Academic Excellence</h3><div class="ctm-awards-controls"><select id="awardsAcademicFilter"><option>All</option><option>Qualified</option><option>Pending Grades</option><option>Not Qualified</option></select></div><div class="ctm-awards-table-wrap"><table class="ctm-awards-table"><thead><tr><th>#</th><th>Learner</th><th>GA</th><th>FG threshold</th><th>Award / Category</th><th>Status</th><th>Reason</th></tr></thead><tbody id="awardsAcademicBody">${academicRowsHtml(rows)}</tbody></table></div><h4>Classroom Academic Excellence per ${esc(structureLabel())}</h4><div class="ctm-awards-table-wrap"><table class="ctm-awards-table"><thead><tr><th>Learner</th>${periodDefs().map(p=>`<th>${esc(p.label)}</th>`).join('')}</tr></thead><tbody>${classroom.map(r=>`<tr><td>${esc(r.learner.name)}</td>${periodDefs().map(p=>{const x=r.periods[p.key]||{}; return `<td>${x.ga??''} ${x.category?esc(x.category):''}<br>${statusPill(x.status||'Pending Grades')}</td>`;}).join('')}</tr>`).join('')}</tbody></table></div></div>`;
  }
  function academicRowsHtml(rows,filter='All'){ return rows.filter(r=>filter==='All'||r.status===filter).map((r,i)=>`<tr><td>${i+1}</td><td>${esc(r.learner.name)}</td><td>${r.ga??''}</td><td>${r.complete ? ((r.finalGrades||[]).some(g=>g<((resolveAwardPolicyProfile(state.gradeLevel,state.schoolYear,state.academicStructure).academicRules||{}).minFG||80))?'Below threshold':'OK') : 'Pending'}</td><td>${esc(r.category||'')}</td><td>${statusPill(r.status)}</td><td>${esc(r.reason)}</td></tr>`).join('') || '<tr><td colspan="7">No learners found.</td></tr>'; }

  function renderConduct(){
    if(!isAwardTabVisible('conduct')){ emptyHiddenPanel('conduct'); return; }
    const p=$id('awardsPanelConduct'); if(!p) return; const learner=state.roster.find(l=>l.learnerId===(state.awards.selectedConductLearner||'')) || state.roster[0]; if(learner) state.awards.selectedConductLearner=learner.learnerId;
    const rec=learner?ovRecord(learner.learnerId):null, evalRes=learner?evaluateConductAward(learner):null, periods=periodDefs(), sf9=learner?sf9ObservedValuesRecord(learner):null;
    const profile=currentAwardPolicy();
    // CTM FIX 2026-08-05 G12 SF9 OV: Grade 12 SY 2026-2027 uses this tab as an SF9 Observed Values check, not a legacy Conduct Award label.
    const conductLabel=(profile.isDo015 && profile.gradeNumber===12 && profile.schoolYearStart===2026) ? 'SF9 OV Check' : 'Conduct Award';
    p.innerHTML=`<div class="ctm-awards-card"><h3>Conduct &amp; Observed Values</h3><div class="ctm-awards-controls"><label>Learner <select id="awardsConductLearner">${state.roster.map(l=>`<option value="${esc(l.learnerId)}" ${learner&&l.learnerId===learner.learnerId?'selected':''}>${esc(l.name)} (${esc(l.sex)})</option>`).join('')}</select></label></div>${learner?`<div class="ctm-awards-mini">${esc(statusLine())}<br>Source of Conduct & OV: SF9 Observed Values. Edit OV in SF9, then reopen/refresh Awards.</div><div class="ctm-ov-grid" style="--ctm-ov-p:${periods.length}"><div class="ctm-ov-head">SF9 core value / behavior</div>${periods.map(p=>`<div class="ctm-ov-head">${esc(p.label)}</div>`).join('')}${SF9_CORE_VALUE_ROWS.map((row,i)=>`<div class="ctm-ov-item" title="${esc(row.statement)}">${esc(row.label || ('OV '+(i+1)))}<br><span class="ctm-awards-mini">${esc(row.statement)}</span></div>${periods.map(pd=>{const v=text(sf9.saved[row.key]&&sf9.saved[row.key][pd.key]).toUpperCase(); return `<select disabled title="Read from SF9"><option value="" ${!v?'selected':''}></option>${['AO','SO','RO','NO'].map(x=>`<option value="${x}" ${v===x?'selected':''}>${x}</option>`).join('')}</select>`;}).join('')}`).join('')}</div><div class="ctm-awards-controls"><label><input id="awardsMajorOffense" type="checkbox" ${rec.majorOffense?'checked':''}> Suspension-level or higher offense</label><input id="awardsOvNotes" placeholder="Conduct notes only; OV comes from SF9" value="${esc(rec.notes||'')}"></div><div class="ctm-awards-grid">${tile('OV Source','SF9')}${tile('Encoded',`${sf9.filled} / ${evalRes.total}`)}${tile('AO Count',`${evalRes.aoCount} / ${evalRes.total}`)}${tile('Required',`${evalRes.requiredAO} AO`)}${tile(conductLabel,evalRes.status)}${tile('Reason',evalRes.reason)}</div>`:'<p>No learners loaded.</p>'}</div>`;
  }

  function renderAttendance(){
    if(!isAwardTabVisible('attendance')){ emptyHiddenPanel('attendance'); return; }
    const p=$id('awardsPanelAttendance'); if(!p) return; const rows=evaluatePerfectAttendance();
    p.innerHTML=`<div class="ctm-awards-card"><h3>Perfect Attendance Summary</h3><p class="ctm-awards-mini">Present qualifies. NSD is ignored. Absent and Cutting disqualify. Pending attendance remains pending. Tardy and normal excuse are flagged for adviser review.</p><div class="ctm-awards-table-wrap"><table class="ctm-awards-table"><thead><tr><th>#</th><th>Learner</th><th>Status</th>${periodDefs().map(p=>`<th>${esc(p.label)}</th>`).join('')}</tr></thead><tbody>${rows.map((r,i)=>`<tr><td>${i+1}</td><td>${esc(r.learner.name)}</td><td>${statusPill(r.status)}</td>${periodDefs().map(p=>{const x=r.periods[p.key]||{}; return `<td>${statusPill(x.status||'Pending Attendance')}<br><span class="ctm-awards-mini">${esc(x.reason||'')}</span></td>`;}).join('')}</tr>`).join('')}</tbody></table></div></div>`;
  }

  function criterionDefs(kind, mode){
    // CTM FIX 2026-08-05: Research/Design criteria switch by current policy. DO 36 legacy innovation is isolated.
    const policy=currentAwardPolicy();
    const m=text(mode);
    if(kind==='ri'){
      if(policy.isDo015 && m==='Design and Innovation') return [
        ['FG from Design and Innovation',20],['Usefulness / Significance of the Innovation',30],['Originality',20],['Feasibility / Practicality / Environmental Safety',20],['Innovation Presentation and Demonstration',10]
      ];
      if(policy.isDo015) return [
        ['FG from Research',20],['Usefulness / Significance of Research',35],['Rigor / Methodology',30],['Research Presentation and Defense',15]
      ];
      if(m==='Innovation Legacy' || m==='Innovation' || m==='Design and Innovation') return [
        ['Originality or novelty',15],['Relevance / applicability / replicability / sustainability / usefulness',25],['Cost-effectiveness / efficiency / practicality',20],['Environmentally safe',10],['Product development process and innovative features',10],['Acceptability to target beneficiaries',5],['Research basis of product/service',15]
      ];
      return [['Research Grade',20],['Usefulness / Significance',35],['Rigor',30],['Research Presentation',15]];
    }
    if(kind==='leadership') return [['Motivational and Communication Skills',40],['Planning and Organizational Skills',40],['Contribution to School/Community',20]];
    if(kind==='discipline') return [['Academic Rating',20],['Skill in the Discipline',40],['Attitude toward the Discipline',20],['Contribution to the School related to the Discipline',20]];
    if(kind==='club') return [['Club/Organization Performance',50],['Exemplary Output',30],['Contribution to School or Community',20]];
    return [];
  }

  function ensureCriteria(rec, kind, mode){
    rec.criteria=Array.isArray(rec.criteria)?rec.criteria:[];
    const defs=criterionDefs(kind, mode);
    if(rec.criteria.length!==defs.length || rec.criteria.some((c,i)=>c.name!==defs[i][0] || Number(c.weight)!==defs[i][1])){
      const old=rec.criteria||[];
      rec.criteria=defs.map((d,i)=>({name:d[0],weight:d[1],score:old[i]&&old[i].score!=null?old[i].score:'',evidence:old[i]&&old[i].evidence||''}));
    }
    return rec.criteria;
  }
  function learnerOptions(selected){ return ['<option value=""></option>'].concat(state.roster.map(l=>`<option value="${esc(l.learnerId)}" ${l.learnerId===selected?'selected':''}>${esc(l.name)}</option>`)).join(''); }
  function learnerNameById(id){ const l=state.roster.find(x=>x.learnerId===id||x.id===id); return l?l.name:text(id); }
  function csvToArray(v){ return text(v).split(/[;\n]+/).map(x=>text(x)).filter(Boolean); }
  function renderCriteriaRows(rec, kind, id, prefix, mode){
    const criteria=ensureCriteria(rec, kind, mode);
    return criteria.map((c,i)=>{
      const isRi=kind==='ri', max=num(c.weight)||0;
      const earned=isRi ? riCriterionPoints(c) : ((num(c.score)||0)*max/100);
      const weightLabel=isRi ? `${esc(c.weight)} pts` : `${esc(c.weight)}%`;
      const maxAttr=isRi ? ` min="0" max="${esc(c.weight)}" title="Enter points earned, maximum ${esc(c.weight)}"` : '';
      const earnedText=isRi ? (earned==null?'':Number(earned).toFixed(1)) : Number(earned||0).toFixed(1);
      return `<tr><td>${esc(c.name)}</td><td>${weightLabel}</td><td><input data-awards-${prefix}-score="${esc(id)}" data-i="${i}" value="${esc(c.score??'')}" inputmode="decimal"${maxAttr} style="width:78px"></td><td>${earnedText}</td><td><input data-awards-${prefix}-evidence="${esc(id)}" data-i="${i}" value="${esc(c.evidence||'')}" placeholder="evidence / remarks"></td></tr>`;
    }).join('');
  }
  function renderGrade12Awards(){
    if(!isAwardTabVisible('grade12')){ emptyHiddenPanel('grade12'); return; }
    const p=$id('awardsPanelGrade12'); if(!p) return; const isG12=gradeNumber(state.gradeLevel)===12;
    const wi=state.awards.grade12Awards.workImmersion;
    const wiSync=syncWorkImmersionFromGradeSheet();
    const ri=state.awards.grade12Awards.researchInnovation;
    // CTM FIX 2026-08-05 REMAINING: Research/Innovation mode dropdown follows the active policy and old saved labels are display-normalized.
    const policy=currentAwardPolicy();
    const riModeOptions=policy.isDo015 ? ['Research','Design and Innovation'] : ['Research','Innovation Legacy'];
    const riCards=Object.values(ri).map(r=>{ r.mode=normalizeResearchInnovationModeForPolicy(r.mode||'Research', policy); ensureCriteria(r,'ri',r.mode); const ev=evaluateResearchInnovation(r); const membersText=(Array.isArray(r.members)?r.members.map(learnerNameById):[]).join('; '); return `<div class="ctm-awards-card"><div class="ctm-awards-head"><h4>${esc(r.title||'Research / Innovation Project')}</h4><button class="danger" data-awards-del-ri="${esc(r.id)}" type="button">Delete</button></div><div class="ctm-awards-controls"><label>Mode <select data-awards-ri-field="${esc(r.id)}" data-field="mode">${riModeOptions.map(x=>`<option ${r.mode===x?'selected':''}>${esc(x)}</option>`).join('')}</select></label><input data-awards-ri-field="${esc(r.id)}" data-field="title" value="${esc(r.title||'')}" placeholder="Project title"><input data-awards-ri-field="${esc(r.id)}" data-field="membersText" value="${esc(membersText)}" placeholder="Members, max 4; separate by semicolon"><input data-awards-ri-field="${esc(r.id)}" data-field="evidence" value="${esc(r.evidence||'')}" placeholder="Evidence/reference"><select data-awards-ri-field="${esc(r.id)}" data-field="acDecision"><option value=""></option><option ${r.acDecision==='AC Approved'?'selected':''}>AC Approved</option><option ${r.acDecision==='AC Rejected'?'selected':''}>AC Rejected</option></select></div><div class="ctm-awards-table-wrap"><table class="ctm-awards-table"><thead><tr><th>Criterion</th><th>Max Points</th><th>Score</th><th>Points</th><th>Evidence / Remarks</th></tr></thead><tbody>${renderCriteriaRows(r,'ri',r.id,'ri',r.mode)}</tbody></table></div><div class="ctm-awards-grid">${tile('Total',Number(ev.total||0).toFixed(1))}${tile('Status',ev.status)}${tile('Reason',ev.reason||'')}</div></div>`; }).join('') || '<p class="ctm-awards-mini">No Research/Innovation project records yet.</p>';
    const wiMode=workImmersionPolicyMode(), wiTop=workImmersionTopGrade();
    p.innerHTML=`<div class="ctm-awards-card"><h3>Grade 12 Awards</h3>${!isG12?'<p class="ctm-awards-warn">These awards are Grade 12 only unless a later DO 015 profile allows otherwise.</p>':''}<div class="ctm-awards-card"><h4>Work Immersion</h4><p class="ctm-awards-mini">Grades auto-sync from the Grade Sheet subject named Work Immersion when available. Evidence means industry partner/supervisor endorsement or supervisor/teacher validation. DO 015 uses highest grade + endorsement. DO 36 legacy fallback uses grade at least 90 + evidence.</p><div class="ctm-awards-controls"><label>Evaluation mode <select id="awardsWiMode"><option value="do015" ${wiMode==='do015'?'selected':''}>DO 015 only</option><option value="transition" ${wiMode==='transition'?'selected':''}>Transition: DO 015 + DO 36 fallback</option><option value="do36" ${wiMode==='do36'?'selected':''}>DO 36 legacy fallback only</option></select></label><span class="ctm-awards-mini">Highest Work Immersion grade: ${wiTop??'Pending'}</span></div><div class="ctm-awards-table-wrap"><table class="ctm-awards-table"><thead><tr><th>Learner</th><th>Grade</th><th>Supervisor/industry endorsement evidence</th><th>Supervisor high performance/efficiency rating</th><th>Subject teacher high performance/efficiency rating</th><th>Status</th><th>Reason / Policy check</th><th>AC Decision</th></tr></thead><tbody>${state.roster.map(l=>{const r=getWorkImmersionRecord(l), e=evaluateWorkImmersion(r,l), synced=r.gradeSource==='Grade Sheet'; return `<tr><td>${esc(l.name)}</td><td><input data-awards-wi-grade="${esc(l.learnerId)}" value="${esc(r.grade||'')}" style="width:75px" ${synced?'readonly title="Auto-synced from Grade Sheet Work Immersion subject"':''}>${synced?'<br><span class="ctm-awards-mini">Grade Sheet</span>':''}</td><td><input data-awards-wi-evidence="${esc(l.learnerId)}" value="${esc(r.evidence||'')}" placeholder="industry/supervisor endorsement"></td><td><input data-awards-wi-supervisor-rating="${esc(l.learnerId)}" value="${esc(r.supervisorRating||'')}" placeholder="High / Very High / Outstanding / Efficient"></td><td><input data-awards-wi-teacher-rating="${esc(l.learnerId)}" value="${esc(r.teacherRating||'')}" placeholder="High / Highly Efficient / Outstanding"></td><td>${statusPill(e.status)}</td><td><span class="ctm-awards-mini">${esc(e.modeLabel||workImmersionModeLabel())}<br>${esc(e.reason||'')}${e.do015Status?'<br>DO 015: '+esc(e.do015Status):''}${e.legacyStatus?'<br>DO 36: '+esc(e.legacyStatus):''}</span></td><td><select data-awards-wi-ac="${esc(l.learnerId)}"><option value=""></option><option ${r.acDecision==='AC Approved'?'selected':''}>AC Approved</option><option ${r.acDecision==='AC Rejected'?'selected':''}>AC Rejected</option></select></td></tr>`;}).join('')}</tbody></table></div></div><div class="ctm-awards-card"><div class="ctm-awards-head"><h4>Research or Innovation</h4><button class="primary" id="awardsAddRiSample" type="button">Add Project</button></div><p class="ctm-awards-mini">Research and Design/Innovation criteria follow the active policy profile. DO 015 uses the revised Research and Design and Innovation criteria; DO 36 keeps the legacy Innovation criteria. Scores are points earned out of the listed maximum, total out of 100, minimum qualifying score is 90, and groups are capped at four members.</p>${riCards}</div></div>`;
  }
  function renderKS1Recognition(){
    const p=$id('awardsPanelRubrics'); if(!p) return;
    const profile=currentAwardPolicy();
    const periods=periodDefs(state.academicStructure);
    const rows=(state.roster||[]).map(l=>{ const r=ks1RecognitionRecord(l.learnerId); const ev=evaluateKS1Recognition().find(x=>x.learner.learnerId===l.learnerId)||{status:'For Review',reason:''}; return `<tr><td>${esc(l.name)}</td><td><select data-awards-ks1-field="${esc(l.learnerId)}" data-field="term"><option value=""></option>${periods.map(pd=>`<option value="${esc(pd.key)}" ${r.term===pd.key?'selected':''}>${esc(pd.label)}</option>`).join('')}</select></td><td><input data-awards-ks1-field="${esc(l.learnerId)}" data-field="coreAward" value="${esc(r.coreAward||'')}" placeholder="Trait / positive behavior / growth award"></td><td><input data-awards-ks1-field="${esc(l.learnerId)}" data-field="gmrcCompetency" value="${esc(r.gmrcCompetency||'')}" placeholder="GMRC competency improved/excelled in"></td><td><input data-awards-ks1-field="${esc(l.learnerId)}" data-field="teacherNote" value="${esc(r.teacherNote||'')}" placeholder="Teacher note"></td><td><input data-awards-ks1-field="${esc(l.learnerId)}" data-field="evidence" value="${esc(r.evidence||'')}" placeholder="Evidence/reference"></td><td><input data-awards-ks1-field="${esc(l.learnerId)}" data-field="certificateText" value="${esc(r.certificateText||'')}" placeholder="Certificate text"></td><td><select data-awards-ks1-field="${esc(l.learnerId)}" data-field="status"><option ${r.status==='For Review'?'selected':''}>For Review</option><option ${r.status==='AC Approved'?'selected':''}>AC Approved</option><option ${r.status==='AC Rejected'?'selected':''}>AC Rejected</option></select></td><td>${statusPill(ev.status)}<br><span class="ctm-awards-mini">${esc(ev.reason||'')}</span></td></tr>`; }).join('') || '<tr><td colspan="9">No learners loaded.</td></tr>';
    p.innerHTML=`<div class="ctm-awards-card"><h3>KS1 Character/Growth Recognition</h3><p class="ctm-awards-mini">${profile.isKs1Descriptive?'KS1 descriptive grading: Academic Excellence is disabled.':'KS1 numerical transition: Academic Excellence may be evaluated separately, while Character/Growth Recognition remains available.'} Conduct Award is not used for KS1.</p><div class="ctm-awards-table-wrap"><table class="ctm-awards-table"><thead><tr><th>Learner</th><th>Term</th><th>Character Trait / Growth Award</th><th>GMRC Competency</th><th>Teacher Note</th><th>Evidence</th><th>Certificate Text</th><th>AC Decision</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
  }
  function renderSpecificLearningAreaExcellence(){
    const results=evaluateSpecificLearningAreaExcellence();
    return `<h4>Excellence in Specific Learning Area</h4><p class="ctm-awards-mini">Automatic DO 015 evaluator: per active Grade Sheet subject, the highest final grade in the batch qualifies if it is at least 90. Ties are all awarded. KS4 elective cluster grouping is marked TODO until subject metadata exposes clusters.</p>${results.map(r=>`<div class="ctm-awards-card"><h4>${esc(r.subject||'Learning Area')}</h4><div class="ctm-awards-grid">${tile('Top Grade',r.topGrade??'Pending')}${tile('Status',r.status)}${tile('Reason',r.reason||'')}</div><div class="ctm-awards-table-wrap"><table class="ctm-awards-table"><thead><tr><th>Learner</th><th>FG</th><th>Status</th><th>Reason</th></tr></thead><tbody>${(r.awardees||[]).map(a=>`<tr><td>${esc(a.learner&&a.learner.name)}</td><td>${a.fg??''}</td><td>${statusPill(a.status)}</td><td>${esc(a.reason||'')}</td></tr>`).join('')||'<tr><td colspan="4">No awardees.</td></tr>'}</tbody></table></div></div>`).join('')}`;
  }
  function renderRubrics(){
    if(!isAwardTabVisible('rubrics')){ emptyHiddenPanel('rubrics'); return; }
    const p=$id('awardsPanelRubrics'); if(!p) return;
    const profile=currentAwardPolicy();
    if(profile.isDo015 && profile.keyStage==='KS1'){ renderKS1Recognition(); return; }
    const g12=state.awards.grade12Awards;
    // CTM FIX 2026-08-05 REMAINING: Leadership UI is available for DO 015 KS2-KS4 and legacy profiles, while DO 36 discipline/club rubrics stay legacy-only.
    const showLeadership=profile.isLegacy || (profile.isDo015 && (profile.keyStage==='KS2' || profile.keyStage==='KS3' || profile.keyStage==='KS4'));
    const leadershipTitle=profile.isDo015 ? 'Leadership Excellence Award' : 'Leadership Award';
    const leadershipRows=state.roster.map(l=>{ const r=g12.leadership[l.learnerId]=g12.leadership[l.learnerId]||{}; const ev=leadershipEvalForRecord(r); return `<tr><td>${esc(l.name)}</td><td><input type="checkbox" data-awards-leadership-field="${esc(l.learnerId)}" data-field="membershipEvidence" ${r.membershipEvidence?'checked':''}></td><td><input type="checkbox" data-awards-leadership-field="${esc(l.learnerId)}" data-field="hasFailingGrade" ${r.hasFailingGrade?'checked':''}></td><td><input type="checkbox" data-awards-leadership-field="${esc(l.learnerId)}" data-field="majorOffense" ${r.majorOffense?'checked':''}></td>${criterionDefs('leadership').map(d=>`<td><input data-awards-leadership-field="${esc(l.learnerId)}" data-field="adv_${slug(d[0])}" value="${esc(leadershipScoreValue(r,'adv',d[0]))}" style="width:62px"></td>`).join('')}${criterionDefs('leadership').map(d=>`<td><input data-awards-leadership-field="${esc(l.learnerId)}" data-field="peer_${slug(d[0])}" value="${esc(leadershipScoreValue(r,'peer',d[0]))}" style="width:62px"></td>`).join('')}<td>${Number(ev.total||0).toFixed(1)}</td><td>${statusPill(ev.status)}</td><td><select data-awards-leadership-field="${esc(l.learnerId)}" data-field="acDecision"><option value=""></option><option ${r.acDecision==='AC Approved'?'selected':''}>AC Approved</option><option ${r.acDecision==='AC Rejected'?'selected':''}>AC Rejected</option></select></td></tr>`; }).join('');
    const disciplines=Object.values(g12.discipline||{}).map(r=>{ ensureCriteria(r,'discipline'); const ev=evaluateDisciplineAward(r); return `<div class="ctm-awards-card"><div class="ctm-awards-head"><h4>Outstanding Performance in Specific Disciplines</h4><button class="danger" data-awards-del-discipline="${esc(r.id)}" type="button">Delete</button></div><div class="ctm-awards-controls"><label>Learner <select data-awards-discipline-field="${esc(r.id)}" data-field="learnerId">${learnerOptions(r.learnerId)}</select></label><select data-awards-discipline-field="${esc(r.id)}" data-field="discipline">${['Athletics','Arts','Communication Arts','Science','Mathematics','Social Sciences','Technical-Vocational Education'].map(x=>`<option ${r.discipline===x?'selected':''}>${x}</option>`).join('')}</select><input data-awards-discipline-field="${esc(r.id)}" data-field="subjectMapping" value="${esc(r.subjectMapping||'')}" placeholder="Academic rating subject mapping"><input data-awards-discipline-field="${esc(r.id)}" data-field="evidence" value="${esc(r.evidence||'')}" placeholder="Evidence/reference"><select data-awards-discipline-field="${esc(r.id)}" data-field="acDecision"><option value=""></option><option ${r.acDecision==='AC Approved'?'selected':''}>AC Approved</option><option ${r.acDecision==='AC Rejected'?'selected':''}>AC Rejected</option></select></div><div class="ctm-awards-table-wrap"><table class="ctm-awards-table"><thead><tr><th>Criterion</th><th>Weight</th><th>Score</th><th>Weighted</th><th>Evidence / Remarks</th></tr></thead><tbody>${renderCriteriaRows(r,'discipline',r.id,'discipline')}</tbody></table></div><div class="ctm-awards-grid">${tile('Total',Number(ev.total||0).toFixed(1))}${tile('Status',ev.status)}${tile('Reason',ev.reason||'')}</div></div>`; }).join('') || '<p class="ctm-awards-mini">No discipline award records yet.</p>';
    const do015Specific=profile.isDo015 ? renderSpecificLearningAreaExcellence() : '';
    p.innerHTML=`<div class="ctm-awards-card"><h3>${profile.isDo015?'DO 015 Learning Area Recognition':'Rubrics'}</h3><p class="ctm-awards-mini">${profile.isDo015?'Excellence in Specific Learning Area is automatic and no longer uses the old DO 36 discipline rubric.':'Legacy DO 36 rubric engine: weighted scores, evidence/remarks, status computation, and manual AC decision.'}</p>${do015Specific}${showLeadership?`<h4>${esc(leadershipTitle)}</h4><div class="ctm-awards-table-wrap"><table class="ctm-awards-table"><thead><tr><th>Learner</th><th>Membership evidence</th><th>Failing grade?</th><th>Major offense?</th>${criterionDefs('leadership').map(d=>`<th>Adviser: ${esc(d[0])} (${d[1]}%)</th>`).join('')}${criterionDefs('leadership').map(d=>`<th>Peer: ${esc(d[0])} (${d[1]}%)</th>`).join('')}<th>Total</th><th>Status</th><th>AC</th></tr></thead><tbody>${leadershipRows}</tbody></table></div>${profile.isLegacy?`<div class="ctm-awards-actions"><button class="primary" id="awardsAddDiscipline" type="button">Add Discipline Award</button><button class="primary" id="awardsAddClub" type="button">Add Club/Organization Award</button></div><h4>DO 36 Outstanding Performance in Specific Disciplines</h4>${disciplines}`:''}`:''}<p class="ctm-awards-mini">Statuses supported: ${STATUSES.map(esc).join(' • ')}</p></div>`;
  }

  function renderSpecialRecognition(){
    const p=$id('awardsPanelSpecial'); if(!p) return; const rows=state.awards.specialRecognition;
    p.innerHTML=`<div class="ctm-awards-card"><h3>Special Recognition</h3><p class="ctm-awards-mini">Under DO 015, Regional, National, and International are emphasized. District and Division remain selectable for backward compatibility and should be treated as For Review.</p><div class="ctm-awards-actions"><button id="awardsAddSpecial" class="primary" type="button">Add Recognition</button></div><div class="ctm-awards-table-wrap"><table class="ctm-awards-table"><thead><tr><th>Learner</th><th>Event/activity</th><th>Level</th><th>Category</th><th>Role</th><th>Rank/award</th><th>Date</th><th>Organizer</th><th>Evidence</th><th>Status</th><th></th></tr></thead><tbody>${rows.map((r,i)=>`<tr><td><select data-awards-special-field="${i}" data-field="learnerId">${learnerOptions(r.learnerId)}</select></td><td><input data-awards-special-field="${i}" data-field="eventName" value="${esc(r.eventName||'')}" placeholder="Event/activity"></td><td><select data-awards-special-field="${i}" data-field="level">${['District','Division','Regional','National','International'].map(x=>`<option ${r.level===x?'selected':''}>${x}</option>`).join('')}</select></td><td><select data-awards-special-field="${i}" data-field="category">${['Academic','Athletics','Arts','Leadership','TVL','Research','Other'].map(x=>`<option ${r.category===x?'selected':''}>${x}</option>`).join('')}</select></td><td><select data-awards-special-field="${i}" data-field="role">${['Representative','Participant','Winner','Placer','Awardee'].map(x=>`<option ${r.role===x?'selected':''}>${x}</option>`).join('')}</select></td><td><input data-awards-special-field="${i}" data-field="rankAward" value="${esc(r.rankAward||'')}"></td><td><input type="date" data-awards-special-field="${i}" data-field="date" value="${esc(r.date||'')}"></td><td><input data-awards-special-field="${i}" data-field="organizer" value="${esc(r.organizer||'')}"></td><td><input data-awards-special-field="${i}" data-field="evidence" value="${esc(r.evidence||'')}"></td><td><select data-awards-special-field="${i}" data-field="status">${STATUSES.map(x=>`<option ${r.status===x?'selected':''}>${x}</option>`).join('')}</select>${r.notes?`<br><span class="ctm-awards-mini">${esc(r.notes)}</span>`:''}</td><td><button class="danger" data-awards-del-special="${i}" type="button">Delete</button></td></tr>`).join('')||'<tr><td colspan="11">No special recognition entries yet.</td></tr>'}</tbody></table></div></div>`;
  }
  function renderReports(){
    const p=$id('awardsPanelReports'); if(!p) return;
    const report=buildReportText();
    p.innerHTML=`<div class="ctm-awards-card"><h3>Reports / Export</h3><div class="ctm-awards-actions ctm-awards-no-print"><button id="awardsPrintReports" class="edit" type="button">Print</button></div><div id="awardsReportText" class="ctm-awards-report">${esc(report)}</div></div>`;
    const printArea=$id('awardsPrintArea');
    if(printArea) printArea.innerHTML=`<h1>Awards &amp; Recognition Report</h1><div class="ctm-awards-report">${esc(report)}</div>`;
  }
  function buildReportText(){
    // CTM FIX 2026-08-05: Reports are policy-aware and include only applicable award sections.
    pruneAwardsToRoster();
    const rules=awardUiRules(), profile=currentAwardPolicy();
    const sections=[statusLine(),''];
    if(state.academicStructureUnverified){
      sections.push('Academic Structure Warning','- Academic structure was not resolved from Grade Sheet/class metadata. Quarter was used as temporary fallback. Open/save Grade Sheet or class setup to verify.','');
    }
    const academic=rules.academic ? evaluateAcademicExcellence() : [];
    if(rules.academic){ sections.push('Academic Excellence Awardees',...academic.filter(x=>x.status==='Qualified').map(x=>`- ${x.learner.name}: ${x.category} (GA ${x.ga})`),''); }
    const ks1=(profile.isDo015 && profile.keyStage==='KS1') ? evaluateKS1Recognition() : [];
    if(ks1.length){ sections.push('KS1 Character/Growth Recognition',...ks1.filter(x=>text(x.coreAward)||text(x.gmrcCompetency)||x.status==='AC Approved').map(x=>`- ${x.learner.name}: ${x.coreAward||'For Review'}; GMRC: ${x.gmrcCompetency||'Pending'}; Status: ${x.status}`),''); }
    let attend=[];
    if(rules.attendance){ attend=evaluatePerfectAttendance(); sections.push('Perfect Attendance Awardees',...attend.filter(x=>x.status==='Qualified').map(x=>`- ${x.learner.name}`),''); }
    let sla=[];
    if(profile.isDo015 && rules.rubrics && profile.keyStage!=='KS1'){ sla=evaluateSpecificLearningAreaExcellence(); sections.push('DO 015 Excellence in Specific Learning Area',...sla.flatMap(r=>[`- ${r.subject||'Learning Area'}: ${r.status}; top grade ${r.topGrade??'Pending'}; ${r.reason||''}`,...(r.awardees||[]).map(a=>`  * ${a.learner.name}: FG ${a.fg} (${a.status})`)]),''); }
    let conduct=[];
    if(rules.conduct){
      conduct=state.roster.map(l=>({learner:l,...evaluateConductAward(l)}));
      // CTM FIX 2026-08-05 G12 SF9 OV: report the Grade 12 transition check separately from legacy DO 36 Conduct Awardees.
      const conductSectionTitle=(profile.isDo015 && profile.gradeNumber===12 && profile.schoolYearStart===2026) ? 'Grade 12 SF9 Conduct & Observed Values Check' : 'DO 36 Conduct Awardees';
      sections.push(conductSectionTitle,...conduct.filter(x=>x.status==='Qualified').map(x=>`- ${x.learner.name}: AO ${x.aoCount}/${x.total}`),'');
    }
    const g12=state.awards.grade12Awards||{}; let wi=[], ri=[];
    if(rules.grade12){
      syncWorkImmersionFromGradeSheet();
      wi=state.roster.map(l=>({learnerName:l.name,...evaluateWorkImmersion(getWorkImmersionRecord(l),l)}));
      ri=Object.values(g12.researchInnovation||{}).map(r=>{ r.mode=normalizeResearchInnovationModeForPolicy(r.mode); return evaluateResearchInnovation(r); });
      sections.push('Grade 12 Work Immersion / Field Exposure / Arts Apprenticeship',...wi.map(x=>`- ${x.learnerName}: ${x.status} ${x.grade?('(Grade '+x.grade+')'):''}; ${x.reason||''}`),'');
      sections.push('Grade 12 Research',...ri.filter(x=>text(x.mode)==='Research').map(x=>`- ${x.title||'Untitled'}: ${x.status} (${Number(x.total||0).toFixed(1)})`),'');
      sections.push('Grade 12 Design and Innovation',...ri.filter(x=>text(x.mode)==='Design and Innovation'||text(x.mode)==='Innovation'||text(x.mode)==='Innovation Legacy').map(x=>`- ${x.title||'Untitled'}: ${x.status} (${Number(x.total||0).toFixed(1)})`),'');
    }
    let leadership=[], discipline=[], club=[];
    // CTM FIX 2026-08-05 REMAINING: Reports include DO 015 Leadership Excellence for KS2-KS4, while legacy discipline/club remains DO 36-only.
    const reportLeadership=rules.rubrics && (profile.isLegacy || (profile.isDo015 && (profile.keyStage==='KS2'||profile.keyStage==='KS3'||profile.keyStage==='KS4')));
    if(reportLeadership){
      leadership=Object.entries(g12.leadership||{}).map(([lid,r])=>({learnerName:learnerNameById(lid),...leadershipEvalForRecord(r)}));
      sections.push(profile.isDo015?'DO 015 Leadership Excellence Award':'DO 36 Leadership Award',...leadership.map(x=>`- ${x.learnerName}: ${x.status} (${Number(x.total||0).toFixed(1)}); ${x.reason||''}`),'');
    }
    if(rules.rubrics && profile.isLegacy){
      discipline=Object.values(g12.discipline||{}).map(r=>evaluateDisciplineAward(r));
      club=Object.values(g12.club||{}).map(r=>evaluateClubAchievement(r));
      sections.push('DO 36 Outstanding Performance in Specific Disciplines',...discipline.map(x=>`- ${learnerNameById(x.learnerId)} ${x.discipline||''}: ${x.status} (${Number(x.total||0).toFixed(1)})`),'');
    }
    sections.push('Special Recognition',...state.awards.specialRecognition.map(x=>`- ${x.learnerName||learnerNameById(x.learnerId)||''}: ${x.eventName||''} (${x.level||''}) ${x.status||''}${x.notes?'; '+x.notes:''}`),'');
    const all=[...academic,...ks1,...attend,...sla.flatMap(r=>r.awardees||[]),...conduct,...wi,...ri,...leadership,...discipline,...club,...state.awards.specialRecognition];
    sections.push('Missing Evidence',...all.filter(x=>/Missing Evidence/.test(x.status||'')).map(x=>`- ${(x.learner&&x.learner.name)||x.learnerName||x.title||x.organizationName||x.eventName||''}: ${x.reason||x.status}`),'');
    sections.push('Pending Items',...all.filter(x=>/^Pending/.test(x.status||'') || x.status==='For Review').map(x=>`- ${(x.learner&&x.learner.name)||x.learnerName||x.title||x.organizationName||x.eventName||''}: ${x.status}${x.reason?': '+x.reason:''}`),'');
    sections.push('Disqualified / Not Qualified with reasons',...all.filter(x=>/Not Qualified|Disqualified/.test(x.status||'')).map(x=>`- ${(x.learner&&x.learner.name)||x.learnerName||x.title||x.organizationName||x.eventName||''}: ${x.reason||x.status}`),'');
    sections.push('Final AC Approved Awardees',...all.filter(x=>x.status==='AC Approved'||x.acDecision==='AC Approved').map(x=>`- ${(x.learner&&x.learner.name)||x.learnerName||x.title||x.organizationName||x.eventName||''}`));
    return sections.join('\n');
  }


  function refreshReportsForOpen(){
    try{
      state.gradeSheet=getGradeSheetSnapshot();
      const structureResolution=resolveAcademicStructure(getClassMeta(state.classId||getClassId()));
      state.academicStructure=structureResolution.value;
      state.academicStructureUnverified=!!structureResolution.unverified;
      state.policy=resolvePolicyProfile(state.gradeLevel,state.schoolYear,state.academicStructure);
      migrateData();
      syncWorkImmersionFromGradeSheet();
      pruneAwardsToRoster();
      save();
    }catch(_){ }
    renderReports();
  }
  function printReports(){
    refreshReportsForOpen();
    const reportEl=$id('awardsReportText');
    const printArea=$id('awardsPrintArea');
    if(printArea && reportEl){
      const report=reportEl.textContent||buildReportText();
      printArea.innerHTML=`<h1>Awards &amp; Recognition Report</h1><div class="ctm-awards-report">${esc(report)}</div>`;
    }
    setTimeout(()=>window.print(),80);
  }

  function switchTab(tab){
    refreshAwardTabVisibility();
    const visible=new Set(visibleAwardTabs());
    if(!visible.has(tab)) tab='dashboard';
    if(tab==='reports') refreshReportsForOpen();
    state.activeTab=tab;
    document.querySelectorAll('#awardsModal .ctm-awards-tab').forEach(b=>{
      const show=visible.has(b.dataset.awardsTab);
      b.hidden=!show;
      b.style.display=show?'':'none';
      b.classList.toggle('active',show && b.dataset.awardsTab===tab);
    });
    ['dashboard','academic','conduct','attendance','grade12','rubrics','special','reports'].forEach(n=>{
      const el=$id(awardPanelId(n));
      if(el){
        const show=visible.has(n);
        el.hidden=!show;
        el.classList.toggle('active',show && n===tab);
      }
    });
  }

  function exportJson(){ save(); const blob=new Blob([JSON.stringify(awardsExportSnapshot(),null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`ClassTapMark-Awards-${slug(state.className||state.classId)}.json`; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(a.href); a.remove();},0); }
  async function importJson(file){ if(!file) return; const txt=await file.text(); const data=JSON.parse(txt); state.awards={...defaultAwardsData(),...data,classId:state.classId}; migrateData(); save(); renderAll(); alert('Awards JSON imported.'); }

  function bindUi(){
    const modal=$id('awardsModal'); if(!modal || modal.dataset.awardsBound==='1') return; modal.dataset.awardsBound='1';
    $id('awardsBtnClose') && $id('awardsBtnClose').addEventListener('click',close);
    modal.addEventListener('click',e=>{
      const tab=e.target.closest('[data-awards-tab]'); if(tab){ switchTab(tab.dataset.awardsTab); return; }
      const del=e.target.closest('[data-awards-del-special]'); if(del){ state.awards.specialRecognition.splice(Number(del.dataset.awardsDelSpecial),1); save(); renderSpecialRecognition(); renderDashboard(); return; }
      if(e.target.id==='awardsAddSpecial'){ const l=state.roster[0]||{}; state.awards.specialRecognition.push({learnerId:l.learnerId||'',learnerName:l.name||'',eventName:'',level:'District',category:'Other',role:'Participant',rankAward:'',date:'',organizer:'',evidence:'',notes:'',status:'For Review'}); save(); renderSpecialRecognition(); renderDashboard(); return; }
      if(e.target.id==='awardsAddDiscipline'){ const id='disc-'+Date.now().toString(36); state.awards.grade12Awards.discipline[id]={id,discipline:'Athletics',criteria:criterionDefs('discipline').map(d=>({name:d[0],weight:d[1],score:'',evidence:''})),status:'Pending Rubric'}; save(); renderRubrics(); renderDashboard(); return; }
      if(e.target.id==='awardsAddClub'){ const id='club-'+Date.now().toString(36); state.awards.grade12Awards.club[id]={id,organizationName:'',members:[],criteria:criterionDefs('club').map(d=>({name:d[0],weight:d[1],score:'',evidence:''})),status:'Pending Rubric'}; save(); renderRubrics(); renderDashboard(); return; }
      const delRi=e.target.closest('[data-awards-del-ri]'); if(delRi){ delete state.awards.grade12Awards.researchInnovation[delRi.dataset.awardsDelRi]; save(); renderGrade12Awards(); renderDashboard(); return; }
      const delDisc=e.target.closest('[data-awards-del-discipline]'); if(delDisc){ delete state.awards.grade12Awards.discipline[delDisc.dataset.awardsDelDiscipline]; save(); renderRubrics(); renderDashboard(); return; }
      const delClub=e.target.closest('[data-awards-del-club]'); if(delClub){ delete state.awards.grade12Awards.club[delClub.dataset.awardsDelClub]; save(); renderRubrics(); renderDashboard(); return; }
      if(e.target.id==='awardsExportJson') exportJson();
      if(e.target.id==='awardsPrintReports') printReports();
      if(e.target.id==='awardsRefreshReports') refreshReportsForOpen();
      if(e.target.id==='awardsAddRiSample'){ const id='ri-'+Date.now().toString(36); state.awards.grade12Awards.researchInnovation[id]={id,mode:'Research',title:'',members:[],criteria:criterionDefs('ri','Research').map(d=>({name:d[0],weight:d[1],score:'',evidence:''})),status:'Pending Rubric'}; save(); renderGrade12Awards(); renderDashboard(); }
    });
    modal.addEventListener('change',e=>{
      if(e.target.id==='awardsConductLearner'){ state.awards.selectedConductLearner=e.target.value; save(); renderConduct(); return; }
      const ov=e.target.closest('[data-awards-ov]'); if(ov){ const lid=state.awards.selectedConductLearner; const rec=ovRecord(lid); rec[ov.dataset.awardsOv][Number(ov.dataset.awardsOvIndex)]=ov.value; save(); renderConduct(); renderDashboard(); return; }
      if(e.target.id==='awardsMajorOffense'){ const rec=ovRecord(state.awards.selectedConductLearner); rec.majorOffense=!!e.target.checked; save(); renderConduct(); renderDashboard(); return; }
      if(e.target.id==='awardsWiMode'){ state.awards.grade12Awards.workImmersionMode=e.target.value; save(); renderGrade12Awards(); renderDashboard(); return; }
      const wiGrade=e.target.closest('[data-awards-wi-grade]'), wiEvidence=e.target.closest('[data-awards-wi-evidence]'), wiSupervisor=e.target.closest('[data-awards-wi-supervisor-rating]'), wiTeacher=e.target.closest('[data-awards-wi-teacher-rating]'), wiAc=e.target.closest('[data-awards-wi-ac]');
      if(wiGrade||wiEvidence||wiSupervisor||wiTeacher||wiAc){ const src=(wiGrade||wiEvidence||wiSupervisor||wiTeacher||wiAc); const lid=src.dataset.awardsWiGrade || src.dataset.awardsWiEvidence || src.dataset.awardsWiSupervisorRating || src.dataset.awardsWiTeacherRating || src.dataset.awardsWiAc; const rec=state.awards.grade12Awards.workImmersion[lid]=state.awards.grade12Awards.workImmersion[lid]||{}; if(wiGrade){ rec.grade=wiGrade.value; rec.gradeSource='Manual'; delete rec.gradeSubjectId; delete rec.gradeSubjectName; } if(wiEvidence) rec.evidence=wiEvidence.value; if(wiSupervisor) rec.supervisorRating=wiSupervisor.value; if(wiTeacher) rec.teacherRating=wiTeacher.value; if(wiAc) rec.acDecision=wiAc.value; syncWorkImmersionFromGradeSheet(); save(); renderGrade12Awards(); renderDashboard(); return; }
      const riField=e.target.closest('[data-awards-ri-field]'), riScore=e.target.closest('[data-awards-ri-score]'), riEvidence=e.target.closest('[data-awards-ri-evidence]');
      if(riField||riScore||riEvidence){ const id=(riField||riScore||riEvidence).dataset.awardsRiField || (riField||riScore||riEvidence).dataset.awardsRiScore || (riField||riScore||riEvidence).dataset.awardsRiEvidence; const rec=state.awards.grade12Awards.researchInnovation[id]=state.awards.grade12Awards.researchInnovation[id]||{id,mode:'Research'}; if(riField){ const f=riField.dataset.field; if(f==='membersText') rec.members=csvToArray(riField.value); else rec[f]=(f==='mode'?normalizeResearchInnovationModeForPolicy(riField.value):riField.value); if(f==='mode') ensureCriteria(rec,'ri',rec.mode); } if(riScore){ ensureCriteria(rec,'ri',rec.mode); rec.criteria[Number(riScore.dataset.i)].score=riScore.value; } if(riEvidence){ ensureCriteria(rec,'ri',rec.mode); rec.criteria[Number(riEvidence.dataset.i)].evidence=riEvidence.value; } save(); renderGrade12Awards(); renderDashboard(); return; }
      const ks1=e.target.closest('[data-awards-ks1-field]');
      if(ks1){ const lid=ks1.dataset.awardsKs1Field; const rec=ks1RecognitionRecord(lid); rec[ks1.dataset.field]=ks1.value; save(); renderRubrics(); renderDashboard(); return; }
      const lead=e.target.closest('[data-awards-leadership-field]');
      if(lead){ const lid=lead.dataset.awardsLeadershipField; const rec=state.awards.grade12Awards.leadership[lid]=state.awards.grade12Awards.leadership[lid]||{}; const f=lead.dataset.field; rec[f]=lead.type==='checkbox'?!!lead.checked:lead.value; save(); renderRubrics(); renderDashboard(); return; }
      const discField=e.target.closest('[data-awards-discipline-field]'), discScore=e.target.closest('[data-awards-discipline-score]'), discEvidence=e.target.closest('[data-awards-discipline-evidence]');
      if(discField||discScore||discEvidence){ const id=(discField||discScore||discEvidence).dataset.awardsDisciplineField || (discField||discScore||discEvidence).dataset.awardsDisciplineScore || (discField||discScore||discEvidence).dataset.awardsDisciplineEvidence; const rec=state.awards.grade12Awards.discipline[id]=state.awards.grade12Awards.discipline[id]||{id}; ensureCriteria(rec,'discipline'); if(discField) rec[discField.dataset.field]=discField.value; if(discScore) rec.criteria[Number(discScore.dataset.i)].score=discScore.value; if(discEvidence) rec.criteria[Number(discEvidence.dataset.i)].evidence=discEvidence.value; save(); renderRubrics(); renderDashboard(); return; }
      const clubField=e.target.closest('[data-awards-club-field]'), clubScore=e.target.closest('[data-awards-club-score]'), clubEvidence=e.target.closest('[data-awards-club-evidence]');
      if(clubField||clubScore||clubEvidence){ const id=(clubField||clubScore||clubEvidence).dataset.awardsClubField || (clubField||clubScore||clubEvidence).dataset.awardsClubScore || (clubField||clubScore||clubEvidence).dataset.awardsClubEvidence; const rec=state.awards.grade12Awards.club[id]=state.awards.grade12Awards.club[id]||{id}; ensureCriteria(rec,'club'); if(clubField){ const f=clubField.dataset.field; if(f==='membersText') rec.members=csvToArray(clubField.value); else rec[f]=clubField.value; } if(clubScore) rec.criteria[Number(clubScore.dataset.i)].score=clubScore.value; if(clubEvidence) rec.criteria[Number(clubEvidence.dataset.i)].evidence=clubEvidence.value; save(); renderRubrics(); renderDashboard(); return; }
      const sp=e.target.closest('[data-awards-special-field]');
      if(sp){ const i=Number(sp.dataset.awardsSpecialField); const rec=state.awards.specialRecognition[i]=state.awards.specialRecognition[i]||{}; rec[sp.dataset.field]=sp.value; if(sp.dataset.field==='learnerId') rec.learnerName=learnerNameById(sp.value); // CTM FIX 2026-08-05 REMAINING: DO 015 District/Division Special Recognition is retained but forced to For Review unless AC already decided.
        if(sp.dataset.field==='level' && currentAwardPolicy().isDo015 && ['District','Division'].includes(sp.value)){ if(!['AC Approved','AC Rejected'].includes(rec.status)) rec.status='For Review'; rec.notes='For Review under DO 015: District/Division level is retained as a selectable local/transition level.'; } save(); renderSpecialRecognition(); renderDashboard(); return; }
      if(e.target.id==='awardsImportJsonFile') importJson(e.target.files && e.target.files[0]);
      if(e.target.id==='awardsAcademicFilter'){ const rows=evaluateAcademicExcellence(); const body=$id('awardsAcademicBody'); if(body) body.innerHTML=academicRowsHtml(rows,e.target.value); }
    });
    modal.addEventListener('input',e=>{ if(e.target.id==='awardsOvNotes'){ const rec=ovRecord(state.awards.selectedConductLearner); rec.notes=e.target.value; save(); } });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape' && modal.style.display!=='none') close(); });
  }

  async function open(){ await ensureInjected(); refreshContext(); if(!state.classId){ alert('Please load a class first before opening Awards & Recognition.'); return; } renderAll(); switchTab(state.activeTab||'dashboard'); const modal=$id('awardsModal'); if(modal){ modal.style.display='block'; modal.setAttribute('aria-hidden','false'); try{modal.inert=false;}catch(_){} } }
  function close(){ save(); const modal=$id('awardsModal'); if(modal){ if(window.CTMModalA11y&&typeof window.CTMModalA11y.prepareForHide==='function') window.CTMModalA11y.prepareForHide(modal); modal.style.display='none'; modal.setAttribute('aria-hidden','true'); try{modal.inert=true;}catch(_){} } }

  function bindAwardsButton(){
    let btn=$id('btnOpenAwards');
    if(!btn){
      const candidates=Array.from(document.querySelectorAll('button')).filter(b=>/^\s*Awards\s*$/i.test(b.textContent||''));
      btn=candidates[0]||null;
      if(btn) btn.id='btnOpenAwards';
    }
    if(btn){ btn.disabled=false; btn.title='Awards & Recognition'; btn.textContent='Awards'; if(btn.dataset.awardsBound!=='1'){ btn.dataset.awardsBound='1'; btn.addEventListener('click',open); } }
  }
  function init(){ bindAwardsButton(); setTimeout(bindAwardsButton,500); document.addEventListener('ctm:shared-header-sync',()=>{ if($id('awardsModal') && $id('awardsModal').style.display!=='none'){ refreshContext(); renderAll(); } }); }

  window.CTMAwards={init,open,close,resolvePolicyProfile,resolveAwardProfile,resolveAwardPolicyProfile,getActiveAcademicStructure,getObservedValueRequirement,evaluateAcademicExcellence,evaluateConductAward,evaluatePerfectAttendance,evaluateWorkImmersion,evaluateWorkImmersionDo015,evaluateWorkImmersionDo36,workImmersionPolicyMode,syncWorkImmersionFromGradeSheet,workImmersionGradeFromGradeSheet,evaluateResearchInnovation,evaluateKS1Recognition,evaluateSpecificLearningAreaExcellence,evaluateLeadership,evaluateDisciplineAward,evaluateClubAchievement,save,load,exportJson,importJson,renderDashboard,renderAcademic,renderConduct,renderAttendance,renderGrade12Awards,renderReports,_state:state};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
