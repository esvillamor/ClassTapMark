(function(){
  'use strict';
  if (window.CTMKGradeSheet && typeof window.CTMKGradeSheet.init === 'function') return;

  var MODULE_HTML_PATH = 'kgradesheet/kGradeSheet.html';
  var STORAGE_PREFIX = 'kgradesheet:';
  var VERSION = 'CTM-KGRADESHEET-EOSY-KS1-2026-07-12';
  var DESCRIPTORS = ['', 'Consistently Demonstrates', 'Usually Demonstrates', 'Progressing', 'Beginning to Demonstrate', 'Needs Support', 'Not Yet Observed', 'Not Applicable'];
  var KINDER_READY = ['', 'Ready for Grade 1', 'Ready for Grade 1 with Continued Support', 'Needs Intensive Foundational Support', 'For Parent/Guardian Conference', 'Extended Support/Retention Recommended After Consultation'];
  var PRIMARY_READY = ['', 'Ready for Next Grade Level', 'Ready for Next Grade Level with Continued Support', 'Needs Intensive Foundational Support', 'For Parent/Guardian Conference', 'Extended Support/Retention Recommended After Consultation'];
  var DECISIONS = ['', 'Promote / Proceed with Regular Support', 'Proceed with Continued Intervention', 'For Intensive Intervention Plan', 'For Parent/Guardian Conference', 'Retention Recommended After Consultation', 'Pending Final Deliberation'];
  var CSV_HEADERS = ['ClassId','ClassName','SchoolYear','GradeLevel','Section','LearnerId','Learner','Sex','Mode','LiteracyDescriptor','LiteracyRemarks','NumeracyDescriptor','NumeracyRemarks','DevelopmentDescriptor','DevelopmentRemarks','PhysicalMotorDescriptor','PhysicalMotorRemarks','SelfCareDescriptor','SelfCareRemarks','CreativeDescriptor','CreativeRemarks','ValuesDescriptor','ValuesRemarks','OtherCompetenciesDescriptor','OtherCompetenciesRemarks','StudyHabitsDescriptor','StudyHabitsRemarks','SocioEmotionalDescriptor','SocioEmotionalRemarks','Strengths','AreasForSupport','NextSteps','InterventionProvided','ParentConsultation','Readiness','EosyDecision','UpdatedAt'];

  var state = {htmlInjected:false,classId:'',className:'',schoolYear:'',gradeLevel:'',section:'',teacher:'',schoolName:'',schoolId:'',district:'',division:'',region:'',mode:'primary',roster:[],summaries:{},selectedLearnerId:'',activeTab:'summary',saveTimer:0};
  var dom = {};
  var $id = function(id){ return document.getElementById(id); };
  var text = function(v){ return String(v == null ? '' : v).trim(); };
  var esc = function(v){ return String(v == null ? '' : v).replace(/[&<>"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];}); };
  var safe = function(v){ return text(v).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); };

  function normalizeClassKey(v){ return text(v).replace(/[\[\]]/g,'').trim(); }
  function classKeyPart(v){ return normalizeClassKey(v).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); }
  function isPlaceholder(v){ var s=text(v).replace(/[\[\]]/g,''); return !s || /^(default|select\s+class|class\s+name|no\s+class\s+loaded)$/i.test(s); }
  function storageKey(){ return state.classId ? STORAGE_PREFIX + state.classId : ''; }
  function csvValue(v){ var s=String(v == null ? '' : v); return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g,'""') + '"' : s; }
  function csvParseLine(line){
    var out=[], cur='', q=false;
    for(var i=0;i<line.length;i++){ var ch=line[i]; if(ch==='"'){ if(q && line[i+1]==='"'){cur+='"';i++;} else q=!q; } else if(ch===',' && !q){ out.push(cur); cur=''; } else cur+=ch; }
    out.push(cur); return out;
  }
  function csvParse(csv){
    var rows=[], cur='', q=false;
    for(var i=0;i<csv.length;i++){ var ch=csv[i]; if(ch==='"'){ if(q && csv[i+1]==='"'){cur+='"';i++;} else q=!q; } else if((ch==='\n' || ch==='\r') && !q){ if(ch==='\r' && csv[i+1]==='\n') i++; rows.push(csvParseLine(cur)); cur=''; } else cur+=ch; }
    if(cur || csv.endsWith(',') || csv.endsWith('\n')===false) rows.push(csvParseLine(cur));
    return rows.filter(function(r){return r.some(function(c){return text(c);});});
  }

  function parseSchoolYearStart(v){
    var s=text(v).replace(/[\u2013\u2014]/g,'-');
    var m=s.match(/(?:SY\s*)?(\d{4})\s*-\s*\d{4}/i) || s.match(/\b(\d{4})\b/);
    if(!m) return null;
    var y=Number(m[1]); return Number.isFinite(y) ? y : null;
  }
  function parseGradeLevel(v){
    var raw=text(v); if(!raw) return '';
    var s=raw.toLowerCase().replace(/[._-]+/g,' ').replace(/\s+/g,' ').trim();
    if(/^(kindergarten|kinder|kg|k)$/.test(s) || /\bkindergarten\b|\bkinder\b/.test(s)) return 'kindergarten';
    var m=s.match(/^(?:grade|gr|g)?\s*(\d{1,2})$/) || s.match(/\b(?:grade|gr|g)\s*(\d{1,2})\b/);
    if(m) return 'grade' + Number(m[1]);
    return '';
  }
  function gradeNumber(norm){ var m=text(norm).match(/^grade(\d+)$/); return m ? Number(m[1]) : null; }
  function getKs1SummaryMode(gradeLevel){ return parseGradeLevel(gradeLevel)==='kindergarten' ? 'kindergarten' : 'primary'; }
  function shouldUseKGradeSheet(gradeLevel, schoolYear){
    var g=parseGradeLevel(gradeLevel), y=parseSchoolYearStart(schoolYear);
    if(g==='kindergarten') return true;
    if(y == null) return false;
    if(g==='grade1') return y >= 2026;
    if(g==='grade2') return y >= 2027;
    if(g==='grade3') return y >= 2028;
    return false;
  }
  function gradeLabel(v){ var g=parseGradeLevel(v); if(g==='kindergarten') return 'Kindergarten'; var n=gradeNumber(g); return n ? 'Grade ' + n : text(v); }

  function readField(ids){ for(var i=0;i<ids.length;i++){ var el=$id(ids[i]); if(el){ var v=('value' in el) ? el.value : el.textContent; if(text(v)) return text(v); } } return ''; }
  function readStoredSetup(cid){
    var key = cid ? STORAGE_PREFIX + cid : storageKey();
    if(key){ try{ var data=JSON.parse(localStorage.getItem(key)||'null'); if(data && typeof data==='object') return data; }catch(_){} }
    return null;
  }
  function readClassScopedMeta(cid){
    var out = {};
    if(!cid) return out;
    try{
      var keys=['classmeta:'+cid,'classMeta:'+cid,'metadata:'+cid,'ctm-class-meta:'+cid,'class-'+cid+'-meta'];
      keys.forEach(function(k){
        if(out.gradeLevel && out.schoolYear && out.section) return;
        var o=null;
        try{o=JSON.parse(localStorage.getItem(k)||'null');}catch(_){}
        if(o && typeof o === 'object'){
          out.gradeLevel = out.gradeLevel || text(o.gradeLevel || o.grade);
          out.schoolYear = out.schoolYear || text(o.schoolYear || o.sy);
          out.section = out.section || text(o.section);
          out.teacher = out.teacher || text(o.teacherName || o.teacher || o.adviser);
          out.schoolName = out.schoolName || text(o.schoolName);
          out.schoolId = out.schoolId || text(o.schoolId || o.schoolID);
          out.district = out.district || text(o.district);
          out.division = out.division || text(o.division);
          out.region = out.region || text(o.region);
        }
      });
    }catch(_){}
    return out;
  }
  function inferGradeFromClassName(){
    var inferred = parseGradeLevel(getClassName());
    if(inferred === 'kindergarten') return 'Kindergarten';
    var n = gradeNumber(inferred);
    return n ? ('Grade ' + n) : '';
  }
  function isNonKs1Grade(gradeLevel){
    var g = parseGradeLevel(gradeLevel);
    var n = gradeNumber(g);
    return !!(n && n >= 4);
  }
  function readSharedHeaderMeta(cid){
    var out = {};
    try{
      if(cid){
        var raw = localStorage.getItem('ctm-shared-header::' + cid) || localStorage.getItem('ctm-shared-header:' + cid);
        var data = raw ? JSON.parse(raw) : null;
        if(data && typeof data === 'object'){
          out.schoolYear = text(data.schoolYear || data.sy);
          out.gradeLevel = text(data.gradeLevel || data.grade);
          out.section = text(data.section);
          out.teacher = text(data.teacherName || data.teacher || data.adviser);
          out.schoolName = text(data.schoolName);
          out.schoolId = text(data.schoolId || data.schoolID);
          out.district = text(data.district);
          out.division = text(data.division);
          out.region = text(data.region);
        }
      }
    }catch(_){}
    try{
      var api = window.CTMSharedHeader;
      if(api && typeof api.get === 'function'){
        ['schoolYear','gradeLevel','section','teacherName','teacher','schoolName','schoolId','district','division','region'].forEach(function(k){
          var v = text(api.get(k));
          if(v && !out[k]) out[k] = v;
        });
        if(!out.teacher && out.teacherName) out.teacher = out.teacherName;
      }
    }catch(_){}
    return out;
  }
  function readClassRecordHeaderMeta(cid){
    var out = {};
    if(!cid) return out;
    function applyHeader(h){
      if(!h || typeof h !== 'object') return;
      out.schoolYear = out.schoolYear || text(h.schoolYear || h.sy);
      out.gradeLevel = out.gradeLevel || text(h.gradeLevel || h.grade);
      out.section = out.section || text(h.section || h.classSection);
      out.teacher = out.teacher || text(h.teacherName || h.teacher || h.adviser);
      out.schoolName = out.schoolName || text(h.schoolName);
      out.schoolId = out.schoolId || text(h.schoolId || h.schoolID);
      out.district = out.district || text(h.district);
      out.division = out.division || text(h.division);
      out.region = out.region || text(h.region);
    }
    function applyRecord(o){
      if(!o || typeof o !== 'object') return;
      applyHeader(o.recordHeader || o.header || o);
    }
    function classRecordBelongsToLoadedClass(record){
      if(!record || typeof record !== 'object' || !cid) return false;
      var h = record.recordHeader || record.header || record;
      var loadedCid = classKeyPart(cid);
      var recCid = classKeyPart(h.classId || h.classID || h.classKey || h.loadedClassId || h.currentClassId || '');
      if(recCid && loadedCid && recCid === loadedCid) return true;
      var recClassName = text(h.className || h.class || h.section || h.classSection || '').toLowerCase();
      var loadedClassName = text(getClassName()).toLowerCase();
      if(recClassName && loadedClassName && recClassName === loadedClassName) return true;
      return false;
    }
    try{
      if(window.CTMClassRecord && typeof window.CTMClassRecord._debugSnapshot === 'function'){
        var snap = window.CTMClassRecord._debugSnapshot();
        if(classRecordBelongsToLoadedClass(snap)) applyRecord(snap);
      }
    }catch(_){}
    try{
      var directKeys = ['classrecord-meta::' + cid, 'classrecord-meta:' + cid, 'classrecord-setup::' + cid, 'classrecord-setup:' + cid, 'classrecord-draft::' + cid, 'classrecord-draft:' + cid, 'classrecord-record::' + cid, 'classrecord-record:' + cid];
      directKeys.forEach(function(k){
        if(out.gradeLevel && out.schoolYear) return;
        var raw = localStorage.getItem(k);
        var obj = raw ? JSON.parse(raw) : null;
        applyRecord(obj);
      });
    }catch(_){}
    try{
      var activeRefs = ['classrecord-active::' + cid, 'classrecord-active:' + cid];
      activeRefs.forEach(function(k){
        if(out.gradeLevel && out.schoolYear) return;
        var ref = text(localStorage.getItem(k));
        if(!ref) return;
        var raw = localStorage.getItem(ref);
        var obj = raw ? JSON.parse(raw) : null;
        applyRecord(obj);
      });
    }catch(_){}
    try{
      var recordsRaw = localStorage.getItem('classrecord-records::' + cid) || localStorage.getItem('classrecord-records:' + cid);
      var records = recordsRaw ? JSON.parse(recordsRaw) : null;
      if(Array.isArray(records)){
        for(var i=records.length-1;i>=0;i--){ applyRecord(records[i]); if(out.gradeLevel && out.schoolYear) break; }
      } else if(records && typeof records === 'object'){
        Object.keys(records).some(function(k){ applyRecord(records[k]); return !!(out.gradeLevel && out.schoolYear); });
      }
    }catch(_){}
    return out;
  }
  function discoverMeta(){
    var currentCid = getClassId();
    var classMeta = readClassScopedMeta(currentCid) || {};
    var shared = readSharedHeaderMeta(currentCid) || {};
    var cr = readClassRecordHeaderMeta(currentCid) || {};
    var saved = readStoredSetup(currentCid) || {};
    var inferredGrade = inferGradeFromClassName();
    var visible = {
      gradeLevel: readField(['sf1GradeLevel','sf2GradeLevel','sf3GradeLevel','sf8Grade']),
      schoolYear: readField(['sf1SchoolYear','sf2SchoolYear','sf3SchoolYear','sf8SchoolYear']),
      section: readField(['sf1Section','sf2Section','sf3Section','sf8Section']),
      teacher: readField(['sf1Teacher','sf2Teacher','sf3Teacher']),
      schoolName: readField(['sf1SchoolName','sf2SchoolName','sf3SchoolName','sf8SchoolName']),
      schoolId: readField(['sf1SchoolId','sf2SchoolId','sf3SchoolId','sf8SchoolId']),
      district: readField(['sf1District','sf3District','sf8District']),
      division: readField(['sf1Division','sf3Division','sf8Division']),
      region: readField(['sf1Region','sf3Region','sf8Region'])
    };
    var winGrade = text(window.currentGradeLevel || window.currentClassGradeLevel);
    var winSy = text(window.currentSchoolYear || window.currentClassSchoolYear);
    var meta = {
      gradeLevel: classMeta.gradeLevel || shared.gradeLevel || visible.gradeLevel || inferredGrade || winGrade || saved.gradeLevel || cr.gradeLevel || '',
      schoolYear: classMeta.schoolYear || shared.schoolYear || visible.schoolYear || winSy || saved.schoolYear || cr.schoolYear || '',
      section: classMeta.section || shared.section || visible.section || saved.section || cr.section || '',
      teacher: classMeta.teacher || shared.teacher || visible.teacher || saved.teacher || cr.teacher || '',
      schoolName: classMeta.schoolName || shared.schoolName || visible.schoolName || saved.schoolName || cr.schoolName || '',
      schoolId: classMeta.schoolId || shared.schoolId || visible.schoolId || saved.schoolId || cr.schoolId || '',
      district: classMeta.district || shared.district || visible.district || saved.district || cr.district || '',
      division: classMeta.division || shared.division || visible.division || saved.division || cr.division || '',
      region: classMeta.region || shared.region || visible.region || saved.region || cr.region || ''
    };
    if(isNonKs1Grade(meta.gradeLevel)){
      meta.forceRegularGradeSheet = true;
    }
    return meta;
  }
  function getClassId(){
    var dd=$id('classDropdown'); var opt=dd && dd.selectedIndex>=0 ? dd.options[dd.selectedIndex] : null;
    var candidates=[window.currentClassId, dd&&dd.value, opt&&(opt.dataset.classId||opt.dataset.id||opt.getAttribute('data-class-id')||opt.getAttribute('data-id')), opt&&opt.value, opt&&opt.text];
    for(var i=0;i<candidates.length;i++){ var v=normalizeClassKey(candidates[i]); if(!isPlaceholder(v)) return classKeyPart(v) || v; }
    return '';
  }
  function getClassName(){
    var c=[window.currentClassName, $id('classHeader')&&$id('classHeader').textContent, $id('schoolFormClassHeader')&&$id('schoolFormClassHeader').textContent];
    var dd=$id('classDropdown'); if(dd&&dd.selectedIndex>=0&&dd.options[dd.selectedIndex]) c.push(dd.options[dd.selectedIndex].text,dd.options[dd.selectedIndex].label,dd.options[dd.selectedIndex].value);
    c.push(state.className,state.classId,window.currentClassId);
    for(var i=0;i<c.length;i++){ var v=text(c[i]).replace(/[\[\]]/g,'').trim(); if(!isPlaceholder(v)) return v; }
    return state.classId && state.classId!=='default' ? state.classId : 'No class loaded';
  }
  function normalizeSex(v){ var s=text(v).toLowerCase(); if(s==='m'||s==='male') return 'Male'; if(s==='f'||s==='female') return 'Female'; return text(v); }
  function readHostRoster(){
    if(!state.classId) return [];
    var list=Array.isArray(window.currentStudents) ? window.currentStudents : null;
    if(!list || !list.length){ try{ list=JSON.parse(localStorage.getItem('students-'+state.classId)||'[]'); }catch(_){ list=[]; } }
    return (Array.isArray(list)?list:[]).map(function(s,i){
      var name=text(s.name||s.fullName||s.studentName);
      return {learnerId:text(s.learnerId||s.id||s.lrn)||((i+1)+'-'+safe(name)), name:name, sex:normalizeSex(s.sex||s.gender), order:Number.isFinite(Number(s.order))?Number(s.order):i};
    }).filter(function(x){return x.name;}).sort(function(a,b){return a.order-b.order;});
  }

  function defaultSummary(){ return {literacyDescriptor:'',literacyRemarks:'',numeracyDescriptor:'',numeracyRemarks:'',developmentDescriptor:'',developmentRemarks:'',physicalMotorDescriptor:'',physicalMotorRemarks:'',selfCareDescriptor:'',selfCareRemarks:'',creativeDescriptor:'',creativeRemarks:'',valuesDescriptor:'',valuesRemarks:'',otherCompetenciesDescriptor:'',otherCompetenciesRemarks:'',studyHabitsDescriptor:'',studyHabitsRemarks:'',socioEmotionalDescriptor:'',socioEmotionalRemarks:'',strengths:'',areasForSupport:'',nextSteps:'',interventionProvided:'',parentConsultation:'',readiness:'',eosyDecision:'',updatedAt:''}; }
  function ensureDataShape(){
    if(!state.summaries || typeof state.summaries!=='object') state.summaries={};
    state.roster.forEach(function(l){ state.summaries[l.learnerId]=Object.assign(defaultSummary(), state.summaries[l.learnerId]||{}); });
    if(state.selectedLearnerId && !state.roster.some(function(l){return l.learnerId===state.selectedLearnerId;})) state.selectedLearnerId='';
    if(!state.selectedLearnerId && state.roster[0]) state.selectedLearnerId=state.roster[0].learnerId;
    state.mode=getKs1SummaryMode(state.gradeLevel);
  }
  function load(){
    var cid=getClassId();
    if(!cid){ state.classId=''; state.roster=[]; flash('Load a class first'); return false; }
    if(cid!==state.classId){ state.classId=cid; state.summaries={}; state.selectedLearnerId=''; }
    state.className=getClassName(); state.roster=readHostRoster();
    var key=storageKey(), data=null;
    try{ data=JSON.parse(localStorage.getItem(key)||'null'); }catch(_){}
    if(data && (!data.classId || String(data.classId)===String(state.classId))){
      ['className','schoolYear','gradeLevel','section','teacher','schoolName','schoolId','district','division','region','mode','summaries','selectedLearnerId','activeTab'].forEach(function(k){ if(data[k] != null) state[k]=data[k]; });
    }
    var meta=discoverMeta();
    ['schoolYear','gradeLevel','section','teacher','schoolName','schoolId','district','division','region'].forEach(function(k){
      if(!text(meta[k])) return;
      if(!text(state[k]) || k==='gradeLevel' || k==='schoolYear') state[k]=text(meta[k]);
    });
    state.className=getClassName(); ensureDataShape(); return true;
  }
  function snapshot(){ ensureDataShape(); return {version:VERSION,classId:state.classId,className:state.className,schoolYear:state.schoolYear,gradeLevel:state.gradeLevel,section:state.section,teacher:state.teacher,schoolName:state.schoolName,schoolId:state.schoolId,district:state.district,division:state.division,region:state.region,mode:state.mode,summaries:state.summaries,selectedLearnerId:state.selectedLearnerId,activeTab:state.activeTab,updatedAt:new Date().toISOString()}; }
  function persist(){ if(!state.classId) return; captureSetup(); try{ localStorage.setItem(storageKey(), JSON.stringify(snapshot())); flash('Saved'); }catch(e){ flash('Storage error'); } }
  function schedulePersist(){ clearTimeout(state.saveTimer); flash('Saving...'); state.saveTimer=setTimeout(persist,250); }
  function flash(m){ if(dom.kgSaveStatus) dom.kgSaveStatus.textContent=m; }

  async function ensureInjected(){
    if(state.htmlInjected && $id('kGradeSheetModal')) return;
    var html=''; try{ var res=await fetch(MODULE_HTML_PATH,{cache:'no-store'}); if(res.ok) html=await res.text(); }catch(_){}
    if(!html) throw new Error('Unable to load kGradeSheet.html');
    var host=$id('kGradeSheetHost'); if(!host){ host=document.createElement('div'); host.id='kGradeSheetHost'; document.body.appendChild(host); }
    host.innerHTML=html; state.htmlInjected=true; cacheDom(); bindUi();
  }
  function cacheDom(){ ['kGradeSheetModal','kgBtnClose','kgTopClass','kgTopGrade','kgTopSy','kgTopCount','kgModeChip','kgTransitionText','kgSetupModeText','kgSetupTransitionText','kgSaveStatus','kgSummaryTable','kgLearnerPicker','kgLearnerTitle','kgLearnerFields','kgLearnerSummaryTiles','kgBtnFirstLearner','kgBtnPrevLearner','kgBtnNextLearner','kgBtnLastLearner','kgBtnRefreshRoster','kgBtnRefreshRoster2','kgBtnExportCsv','kgBtnExportCsv2','kgBtnImportCsv','kgBtnClear','kgBtnClose2','kgCsvFile','kgSchoolYear','kgGradeLevel','kgSection','kgTeacher','kgSchoolName','kgSchoolId','kgDistrict','kgDivision','kgRegion'].forEach(function(id){ dom[id]=$id(id); }); }
  function transitionText(){
    var y=parseSchoolYearStart(state.schoolYear), g=parseGradeLevel(state.gradeLevel), use=shouldUseKGradeSheet(state.gradeLevel,state.schoolYear);
    if(use) return 'This class uses KS1 descriptive EOSY summary for ' + (state.schoolYear || 'the selected school year') + '.';
    if(!g || y==null) return 'Grade level or school year is unknown. Routing defaults to the numerical Grade Sheet unless Kindergarten is clear.';
    return 'This grade level remains under numerical Grade Sheet during this transition year.';
  }
  function modeText(){ return state.mode==='kindergarten' ? 'Kindergarten Developmental EOSY Summary' : 'Grades 1-3 Foundational EOSY Summary'; }
  function captureSetup(){
    if(!dom.kgSchoolYear) return;
    state.schoolYear=text(dom.kgSchoolYear.value); state.gradeLevel=text(dom.kgGradeLevel.value); state.section=text(dom.kgSection.value); state.teacher=text(dom.kgTeacher.value); state.schoolName=text(dom.kgSchoolName.value); state.schoolId=text(dom.kgSchoolId.value); state.district=text(dom.kgDistrict.value); state.division=text(dom.kgDivision.value); state.region=text(dom.kgRegion.value); state.mode=getKs1SummaryMode(state.gradeLevel);
  }
  function fillSetup(){
    if(dom.kgSchoolYear) dom.kgSchoolYear.value=state.schoolYear||''; if(dom.kgGradeLevel) dom.kgGradeLevel.value=state.gradeLevel||''; if(dom.kgSection) dom.kgSection.value=state.section||''; if(dom.kgTeacher) dom.kgTeacher.value=state.teacher||''; if(dom.kgSchoolName) dom.kgSchoolName.value=state.schoolName||''; if(dom.kgSchoolId) dom.kgSchoolId.value=state.schoolId||''; if(dom.kgDistrict) dom.kgDistrict.value=state.district||''; if(dom.kgDivision) dom.kgDivision.value=state.division||''; if(dom.kgRegion) dom.kgRegion.value=state.region||'';
  }
  function render(){ cacheDom(); ensureDataShape(); state.className=getClassName(); fillSetup();
    if(dom.kgTopClass) dom.kgTopClass.textContent=state.className||state.classId||'No class loaded'; if(dom.kgTopGrade) dom.kgTopGrade.textContent=gradeLabel(state.gradeLevel)||'Grade level unknown'; if(dom.kgTopSy) dom.kgTopSy.textContent=state.schoolYear||'SY unknown'; if(dom.kgTopCount) dom.kgTopCount.textContent=state.roster.length+' learners'; if(dom.kgModeChip) dom.kgModeChip.textContent=modeText(); if(dom.kgTransitionText) dom.kgTransitionText.textContent=transitionText(); if(dom.kgSetupModeText) dom.kgSetupModeText.textContent=modeText(); if(dom.kgSetupTransitionText) dom.kgSetupTransitionText.textContent=transitionText();
    renderTable(); renderLearnerPicker(); renderLearnerCard(); switchTab(state.activeTab||'summary', true); updateLearnerNavButtons(); }
  function preview(desc, remarks){ var s=[desc, remarks].filter(Boolean).join(' - '); return s; }
  function tableLabels(){ return state.mode==='kindergarten' ? ['Communication, Language & Literacy','Numeracy / Early Mathematics','Developmental Progress'] : ['Foundational Literacy','Foundational Numeracy','Socio-Emotional / Participation']; }
  function renderTable(){
    if(!dom.kgSummaryTable) return; var labels=tableLabels();
    var h='<thead><tr><th class="kg-col-no">#</th><th class="kg-col-name">Learner</th><th class="kg-col-sex">Sex</th><th class="kg-col-wide">'+esc(labels[0])+'</th><th class="kg-col-wide">'+esc(labels[1])+'</th><th class="kg-col-wide">'+esc(labels[2])+'</th><th class="kg-col-wide">Strengths</th><th class="kg-col-wide">Areas for Support</th><th class="kg-col-wide">Suggested Next Steps</th><th class="kg-col-wide">Intervention / Support</th><th class="kg-col-wide">Readiness</th><th class="kg-col-decision">EOSY Decision</th></tr></thead>';
    var b=''; state.roster.forEach(function(l,i){ var s=state.summaries[l.learnerId]||defaultSummary(); var third=state.mode==='kindergarten'?preview(s.developmentDescriptor,s.developmentRemarks):preview(s.socioEmotionalDescriptor,s.socioEmotionalRemarks); var cells=[preview(s.literacyDescriptor,s.literacyRemarks),preview(s.numeracyDescriptor,s.numeracyRemarks),third,s.strengths,s.areasForSupport,s.nextSteps,s.interventionProvided,s.readiness,s.eosyDecision];
      b+='<tr data-learner-id="'+esc(l.learnerId)+'" class="'+(l.learnerId===state.selectedLearnerId?'is-selected':'')+'"><td class="kg-col-no">'+(i+1)+'</td><td class="kg-col-name" title="'+esc(l.name)+'">'+esc(l.name)+'</td><td class="kg-col-sex">'+esc(l.sex)+'</td>'+cells.map(function(c,idx){return '<td class="'+(idx===8?'kg-col-decision':'kg-col-wide')+'" title="'+esc(c)+'">'+esc(c)+'</td>';}).join('')+'</tr>'; });
    if(!b) b='<tr><td colspan="12">No learners found. Load a class or refresh roster.</td></tr>'; dom.kgSummaryTable.innerHTML=h+'<tbody>'+b+'</tbody>';
  }
  function learnerDisplayRows(){ var counters={Male:0,Female:0}, groups={Male:[],Female:[],Other:[]}; state.roster.forEach(function(l,idx){ var k=l.sex==='Male'?'Male':(l.sex==='Female'?'Female':'Other'); groups[k].push({learner:l,index:idx}); }); return groups.Male.concat(groups.Female,groups.Other).map(function(x){ var l=x.learner; if(l.sex==='Male'||l.sex==='Female'){ counters[l.sex]++; return {learner:l,label:counters[l.sex]+'. '+l.name+' ('+l.sex+')'}; } return {learner:l,label:(x.index+1)+'. '+l.name+(l.sex?' ('+l.sex+')':'')}; }); }
  function renderLearnerPicker(){ if(!dom.kgLearnerPicker) return; var rows=learnerDisplayRows(); dom.kgLearnerPicker.innerHTML=rows.map(function(x){return '<option value="'+esc(x.learner.learnerId)+'">'+esc(x.label)+'</option>';}).join('') || '<option value="">No learners</option>'; dom.kgLearnerPicker.value=state.selectedLearnerId||''; }
  function selectOptions(list, value){ return list.map(function(o){return '<option value="'+esc(o)+'" '+(o===value?'selected':'')+'>'+esc(o)+'</option>';}).join(''); }
  function fieldSelect(key,label,options){ var s=state.summaries[state.selectedLearnerId]||defaultSummary(); var id='kg_'+safe(key); return '<div class="ctm-kg-field"><label for="'+id+'">'+esc(label)+'</label><select id="'+id+'" data-kg-field="'+esc(key)+'">'+selectOptions(options,s[key]||'')+'</select></div>'; }
  function fieldText(key,label,span){ var s=state.summaries[state.selectedLearnerId]||defaultSummary(); var id='kg_'+safe(key); return '<div class="ctm-kg-field '+(span?'span-all':'')+'"><label for="'+id+'">'+esc(label)+'</label><textarea id="'+id+'" data-kg-field="'+esc(key)+'">'+esc(s[key]||'')+'</textarea></div>'; }
  function renderLearnerCard(){
    var l=state.roster.find(function(x){return x.learnerId===state.selectedLearnerId;}); if(dom.kgLearnerTitle) dom.kgLearnerTitle.textContent=l?'Learner Summary: '+l.name:'Learner Summary'; if(!dom.kgLearnerFields) return; if(!l){ dom.kgLearnerFields.innerHTML='<div class="ctm-kg-mini">No learner selected.</div>'; if(dom.kgLearnerSummaryTiles) dom.kgLearnerSummaryTiles.innerHTML=''; return; }
    var html='';
    if(state.mode==='kindergarten'){
      [['literacy','Communication, Language & Literacy'],['numeracy','Numeracy / Early Mathematics'],['physicalMotor','Physical Health & Motor Development'],['socioEmotional','Socio-Emotional Development'],['selfCare','Self-Help / Self-Care Skills'],['creative','Creative / Aesthetic Development'],['values','Values, Behavior & Participation']].forEach(function(p){ html+=fieldSelect(p[0]+'Descriptor',p[1]+' descriptor',DESCRIPTORS)+fieldText(p[0]+'Remarks',p[1]+' remarks',false); });
      html+=fieldText('strengths','Strengths',true)+fieldText('areasForSupport','Areas for Support',true)+fieldText('nextSteps','Suggested Next Steps for Parents/Guardians',true)+fieldText('interventionProvided','Intervention / Support Provided',true)+fieldText('parentConsultation','Parent/Guardian Consultation Notes',true)+fieldSelect('readiness','Readiness for Grade 1',KINDER_READY)+fieldSelect('eosyDecision','EOSY Decision / Support Recommendation',DECISIONS);
    } else {
      [['literacy','Foundational Literacy'],['numeracy','Foundational Numeracy'],['otherCompetencies','Other Learning Competencies'],['studyHabits','Study Habits / Participation'],['socioEmotional','Socio-Emotional Development']].forEach(function(p){ html+=fieldSelect(p[0]+'Descriptor',p[1]+' descriptor',DESCRIPTORS)+fieldText(p[0]+'Remarks',p[1]+' remarks',false); });
      html+=fieldText('strengths','Strengths',true)+fieldText('areasForSupport','Areas for Support',true)+fieldText('nextSteps','Suggested Next Steps for Parents/Guardians',true)+fieldText('interventionProvided','Intervention / Support Provided',true)+fieldText('parentConsultation','Parent/Guardian Consultation Notes',true)+fieldSelect('readiness','Readiness for Next Grade Level',PRIMARY_READY)+fieldSelect('eosyDecision','EOSY Decision / Support Recommendation',DECISIONS);
    }
    dom.kgLearnerFields.innerHTML=html; renderTiles(l);
  }
  function renderTiles(l){ if(!dom.kgLearnerSummaryTiles) return; var s=state.summaries[l.learnerId]||defaultSummary(); var tiles=[['Mode',modeText()],['Readiness',s.readiness],['EOSY Decision',s.eosyDecision],['Updated',s.updatedAt?new Date(s.updatedAt).toLocaleString():'']]; dom.kgLearnerSummaryTiles.innerHTML=tiles.map(function(t){return '<div class="ctm-kg-summary-tile"><div class="label">'+esc(t[0])+'</div><div class="value" title="'+esc(t[1])+'">'+esc(t[1]||'-')+'</div></div>';}).join(''); }
  function switchTab(tab, silent){ state.activeTab=tab||'summary'; document.querySelectorAll('#kGradeSheetModal .ctm-kg-tab').forEach(function(b){ b.classList.toggle('active',b.dataset.kgTab===state.activeTab); }); ['summary','learner','setup'].forEach(function(t){ var el=$id('kgPanel'+t.charAt(0).toUpperCase()+t.slice(1)); if(el) el.classList.toggle('active',t===state.activeTab); }); if(!silent) schedulePersist(); }
  function selectLearner(id, goCard){ if(!id) return; state.selectedLearnerId=id; render(); if(goCard) switchTab('learner'); schedulePersist(); }
  function updateLearnerNavButtons(){ var i=state.roster.findIndex(function(l){return l.learnerId===state.selectedLearnerId;}), n=state.roster.length; var atStart=!n||i<=0, atEnd=!n||i>=n-1; ['kgBtnFirstLearner','kgBtnPrevLearner'].forEach(function(k){ if(dom[k]) dom[k].disabled=atStart; }); ['kgBtnNextLearner','kgBtnLastLearner'].forEach(function(k){ if(dom[k]) dom[k].disabled=atEnd; }); }
  function jumpLearner(d){ var i=state.roster.findIndex(function(l){return l.learnerId===state.selectedLearnerId;}), ni=Math.max(0,Math.min(state.roster.length-1,(i<0?0:i)+d)); if(state.roster[ni]) selectLearner(state.roster[ni].learnerId,false); }
  function jumpEdge(last){ if(!state.roster.length) return; selectLearner((last?state.roster[state.roster.length-1]:state.roster[0]).learnerId,false); }
  function refreshRoster(){ state.roster=readHostRoster(); ensureDataShape(); render(); schedulePersist(); }
  function clearSummaries(){ if(confirm('Clear all KS1 EOSY summaries for this class? Roster and existing numerical Grade Sheet data will not be changed.')){ state.summaries={}; ensureDataShape(); render(); schedulePersist(); } }
  function exportCsv(){ captureSetup(); ensureDataShape(); var rows=[CSV_HEADERS]; state.roster.forEach(function(l){ var s=Object.assign(defaultSummary(),state.summaries[l.learnerId]||{}); rows.push([state.classId,state.className,state.schoolYear,state.gradeLevel,state.section,l.learnerId,l.name,l.sex,state.mode,s.literacyDescriptor,s.literacyRemarks,s.numeracyDescriptor,s.numeracyRemarks,s.developmentDescriptor,s.developmentRemarks,s.physicalMotorDescriptor,s.physicalMotorRemarks,s.selfCareDescriptor,s.selfCareRemarks,s.creativeDescriptor,s.creativeRemarks,s.valuesDescriptor,s.valuesRemarks,s.otherCompetenciesDescriptor,s.otherCompetenciesRemarks,s.studyHabitsDescriptor,s.studyHabitsRemarks,s.socioEmotionalDescriptor,s.socioEmotionalRemarks,s.strengths,s.areasForSupport,s.nextSteps,s.interventionProvided,s.parentConsultation,s.readiness,s.eosyDecision,s.updatedAt]); }); var csv=rows.map(function(r){return r.map(csvValue).join(',');}).join('\r\n'); var blob=new Blob([csv],{type:'text/csv;charset=utf-8'}); var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='kgradesheet-'+(safe(state.className)||state.classId||'class')+'.csv'; document.body.appendChild(a); a.click(); setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},0); }
  function importCsvText(csv){ var rows=csvParse(csv); if(!rows.length) return; var heads=rows[0].map(text); var map={}; heads.forEach(function(h,i){map[h]=i;}); var get=function(r,h){return map[h] == null ? '' : text(r[map[h]]);}; var changed=0; rows.slice(1).forEach(function(r){ var lid=get(r,'LearnerId'); if(!lid){ var name=get(r,'Learner'), sex=normalizeSex(get(r,'Sex')); var match=state.roster.find(function(l){return text(l.name).toLowerCase()===name.toLowerCase() && (!sex || l.sex===sex);}); lid=match&&match.learnerId; } if(!lid) return; state.summaries[lid]=Object.assign(defaultSummary(), state.summaries[lid]||{}); [['LiteracyDescriptor','literacyDescriptor'],['LiteracyRemarks','literacyRemarks'],['NumeracyDescriptor','numeracyDescriptor'],['NumeracyRemarks','numeracyRemarks'],['DevelopmentDescriptor','developmentDescriptor'],['DevelopmentRemarks','developmentRemarks'],['PhysicalMotorDescriptor','physicalMotorDescriptor'],['PhysicalMotorRemarks','physicalMotorRemarks'],['SelfCareDescriptor','selfCareDescriptor'],['SelfCareRemarks','selfCareRemarks'],['CreativeDescriptor','creativeDescriptor'],['CreativeRemarks','creativeRemarks'],['ValuesDescriptor','valuesDescriptor'],['ValuesRemarks','valuesRemarks'],['OtherCompetenciesDescriptor','otherCompetenciesDescriptor'],['OtherCompetenciesRemarks','otherCompetenciesRemarks'],['StudyHabitsDescriptor','studyHabitsDescriptor'],['StudyHabitsRemarks','studyHabitsRemarks'],['SocioEmotionalDescriptor','socioEmotionalDescriptor'],['SocioEmotionalRemarks','socioEmotionalRemarks'],['Strengths','strengths'],['AreasForSupport','areasForSupport'],['NextSteps','nextSteps'],['InterventionProvided','interventionProvided'],['ParentConsultation','parentConsultation'],['Readiness','readiness'],['EosyDecision','eosyDecision'],['UpdatedAt','updatedAt']].forEach(function(p){ if(map[p[0]]!=null) state.summaries[lid][p[1]]=get(r,p[0]); }); if(!state.summaries[lid].updatedAt) state.summaries[lid].updatedAt=new Date().toISOString(); changed++; }); render(); schedulePersist(); alert('Imported '+changed+' KS1 summary row(s).'); }
  function bindLearnerSwipe(){ var card=$id('kgPanelLearner'); if(!card || card.dataset.kgSwipeBound==='1') return; card.dataset.kgSwipeBound='1'; var swipe=null; var interactive=function(el){return !!(el&&el.closest&&el.closest('input,select,textarea,button,label,[contenteditable="true"],.ctm-kg-actions'));}; card.addEventListener('pointerdown',function(ev){ if(state.activeTab!=='learner'||(ev.pointerType==='mouse'&&ev.button!==0)||interactive(ev.target)) return; swipe={x:ev.clientX,y:ev.clientY,t:Date.now()}; },{passive:true}); card.addEventListener('pointerup',function(ev){ if(!swipe) return; var dx=ev.clientX-swipe.x, dy=ev.clientY-swipe.y, elapsed=Date.now()-swipe.t; swipe=null; if(elapsed<=1200 && Math.abs(dx)>=60 && Math.abs(dx)>Math.abs(dy)*1.5){ dx<0?jumpLearner(1):jumpLearner(-1); } },{passive:true}); }
  function bindUi(){ var modal=$id('kGradeSheetModal'); if(!modal || modal.dataset.kgBound==='1') return; modal.dataset.kgBound='1'; bindLearnerSwipe();
    dom.kgBtnClose&&dom.kgBtnClose.addEventListener('click',close); dom.kgBtnClose2&&dom.kgBtnClose2.addEventListener('click',close);
    modal.addEventListener('click',function(e){ var tab=e.target.closest('.ctm-kg-tab'); if(tab) switchTab(tab.dataset.kgTab); var tr=e.target.closest('tbody tr[data-learner-id]'); if(tr) selectLearner(tr.dataset.learnerId,true); });
    modal.addEventListener('input',function(e){ var f=e.target.closest('[data-kg-field]'); if(f && state.selectedLearnerId){ var s=state.summaries[state.selectedLearnerId]=Object.assign(defaultSummary(),state.summaries[state.selectedLearnerId]||{}); s[f.dataset.kgField]=f.value; s.updatedAt=new Date().toISOString(); renderTable(); renderTiles(state.roster.find(function(l){return l.learnerId===state.selectedLearnerId;})||{}); schedulePersist(); return; } if(e.target.closest('#kgPanelSetup')){ captureSetup(); render(); schedulePersist(); } });
    modal.addEventListener('change',function(e){ var f=e.target.closest('[data-kg-field]'); if(f && state.selectedLearnerId){ var s=state.summaries[state.selectedLearnerId]=Object.assign(defaultSummary(),state.summaries[state.selectedLearnerId]||{}); s[f.dataset.kgField]=f.value; s.updatedAt=new Date().toISOString(); renderTable(); renderTiles(state.roster.find(function(l){return l.learnerId===state.selectedLearnerId;})||{}); schedulePersist(); } });
    dom.kgLearnerPicker&&dom.kgLearnerPicker.addEventListener('change',function(e){selectLearner(e.target.value,false);});
    dom.kgBtnFirstLearner&&dom.kgBtnFirstLearner.addEventListener('click',function(){jumpEdge(false);}); dom.kgBtnPrevLearner&&dom.kgBtnPrevLearner.addEventListener('click',function(){jumpLearner(-1);}); dom.kgBtnNextLearner&&dom.kgBtnNextLearner.addEventListener('click',function(){jumpLearner(1);}); dom.kgBtnLastLearner&&dom.kgBtnLastLearner.addEventListener('click',function(){jumpEdge(true);});
    [dom.kgBtnRefreshRoster,dom.kgBtnRefreshRoster2].forEach(function(b){ if(b) b.addEventListener('click',refreshRoster); }); [dom.kgBtnExportCsv,dom.kgBtnExportCsv2].forEach(function(b){ if(b) b.addEventListener('click',exportCsv); }); dom.kgBtnClear&&dom.kgBtnClear.addEventListener('click',clearSummaries);
    dom.kgBtnImportCsv&&dom.kgBtnImportCsv.addEventListener('click',function(){ if(dom.kgCsvFile) dom.kgCsvFile.click(); }); dom.kgCsvFile&&dom.kgCsvFile.addEventListener('change',function(e){ var file=e.target.files&&e.target.files[0]; if(!file) return; var r=new FileReader(); r.onload=function(){ importCsvText(String(r.result||'')); dom.kgCsvFile.value=''; }; r.readAsText(file); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape' && modal.style.display!=='none') close(); });
  }
  async function open(){ await ensureInjected(); if(!load()){ alert('Please load a class first before opening Grade Sheet.'); return; } render(); var modal=$id('kGradeSheetModal'); if(modal){ modal.style.display='block'; modal.setAttribute('aria-hidden','false'); try{modal.inert=false;}catch(_){} } }
  function close(){ var modal=$id('kGradeSheetModal'); clearTimeout(state.saveTimer); persist(); if(modal){ if(window.CTMModalA11y&&typeof window.CTMModalA11y.prepareForHide==='function') window.CTMModalA11y.prepareForHide(modal); modal.style.display='none'; modal.setAttribute('aria-hidden','true'); try{modal.inert=true;}catch(_){} } }
  function refresh(){ if(load()) render(); }

  function routeGradeSheetClick(e){
    var btn=e.target && e.target.closest && e.target.closest('#btnOpenGradeSheet'); if(!btn) return;
    var meta=discoverMeta(); var use=!meta.forceRegularGradeSheet && shouldUseKGradeSheet(meta.gradeLevel, meta.schoolYear);
    e.preventDefault(); e.stopPropagation(); if(e.stopImmediatePropagation) e.stopImmediatePropagation();
    if(use) open(); else if(window.CTMGradeSheet && typeof window.CTMGradeSheet.open==='function') window.CTMGradeSheet.open();
    else alert('Grade Sheet module is not ready yet.');
  }
  function init(){
    document.addEventListener('click', routeGradeSheetClick, true);
    var btn=$id('btnOpenGradeSheet'); if(btn) btn.title='Grade Sheet. KS1 transition classes open the descriptive EOSY summary.';
    if(!window.__CTMKGradeSheetFlushBound){ window.__CTMKGradeSheetFlushBound=true; window.addEventListener('beforeunload',function(){clearTimeout(state.saveTimer);persist();}); document.addEventListener('visibilitychange',function(){ if(document.visibilityState==='hidden'){clearTimeout(state.saveTimer);persist();} }); }
  }

  window.CTMKGradeSheet={init:init,open:open,close:close,refresh:refresh,shouldUseKGradeSheet:shouldUseKGradeSheet,getKs1SummaryMode:getKs1SummaryMode,_debugState:state,_debugSnapshot:function(){return snapshot();}};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
