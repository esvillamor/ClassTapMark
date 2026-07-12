(() => {
  'use strict';
  if (window.CTMGradeSheet && typeof window.CTMGradeSheet.init === 'function') return;
  const MODULE_HTML_PATH = 'gradesheet/gradesheet.html';
  const PASSING_GRADE = 75;
  const STORAGE_PREFIX = 'gradesheet:';
  const LEGACY_STORAGE_PREFIX = 'gradesheet::';
  const VERSION = 'CTM-GRADESHEET-GROUPED-LEARNER-DROPDOWN-ONE-ROW-NAV-2026-07-11';
  const Q_KEYS = ['q1','q2','q3','q4'];
  const T_TO_Q = {t1:'q1',t2:'q2',t3:'q3'};
  const state = {htmlInjected:false,classId:'',className:'',roster:[],activeTab:'overview',academicStructure:'quarter',showArchived:'active',subjects:[],grades:{},selectedLearnerId:'',selectedSubjectId:'',saveTimer:0};
  const dom = {};
  const $id = id => document.getElementById(id);
  const esc = v => String(v ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const text = v => String(v ?? '').trim();
  const uid = p => `${p}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`;
  function normalizeClassKey(v){ return text(v).replace(/[\[\]]/g,'').trim(); }
  function classKeyPart(v){ return normalizeClassKey(v).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); }
  const storageKey = () => state.classId ? `${STORAGE_PREFIX}${state.classId}` : '';
  const legacyStorageKey = () => state.classId ? `${LEGACY_STORAGE_PREFIX}${state.classId}` : '';
  function resetClassScopedState(){ state.roster=[]; state.subjects=[]; state.grades={}; state.selectedLearnerId=''; state.selectedSubjectId=''; state.className=''; }
  function toWholeGrade(value){ if(value === '' || value == null) return null; const n=Number(String(value).replace(/[^0-9.-]/g,'')); if(!Number.isFinite(n)) return null; return Math.max(0,Math.min(100,Math.round(n))); }
  function averageWhole(values){ const a=(values||[]).map(toWholeGrade).filter(Number.isInteger); return a.length ? Math.round(a.reduce((x,y)=>x+y,0)/a.length) : null; }
  function descriptor(g){ if(!Number.isInteger(g)) return ''; if(g>=90) return 'Outstanding'; if(g>=85) return 'Very Satisfactory'; if(g>=80) return 'Satisfactory'; if(g>=75) return 'Fairly Satisfactory'; return 'Did Not Meet Expectations'; }
  function remarks(g){ return Number.isInteger(g) ? (g>=PASSING_GRADE?'Passed':'Failed') : ''; }
  function periods(){
    if(state.academicStructure==='firstSemester') return [{key:'q1',label:'Q1'},{key:'q2',label:'Q2'}];
    if(state.academicStructure==='secondSemester') return [{key:'q3',label:'Q3'},{key:'q4',label:'Q4'}];
    if(state.academicStructure==='threeTerm') return [{key:'q1',label:'T1'},{key:'q2',label:'T2'},{key:'q3',label:'T3'}];
    if(state.academicStructure==='modifiedThreeTerm') return [{key:'q1',label:'Term 1'},{key:'q2',label:'Term 2'},{key:'q3',label:'Term 3'}];
    return [{key:'q1',label:'Q1'},{key:'q2',label:'Q2'},{key:'q3',label:'Q3'},{key:'q4',label:'Q4'}];
  }
  function labelMap(){ const m={q1:'Q1',q2:'Q2',q3:'Q3',q4:'Q4'}; periods().forEach(p=>m[p.key]=p.label); return m; }
  function structureLabel(){ return ({quarter:'Quarter',firstSemester:'First Semester',secondSemester:'Second Semester',threeTerm:'Three Term',modifiedThreeTerm:'Modified Three Term'}[state.academicStructure] || 'Quarter'); }
  function ensureSubjectVisibility(s){ if(!s.termVisibility || typeof s.termVisibility!=='object') s.termVisibility={}; Q_KEYS.forEach(k=>{ if(typeof s.termVisibility[k] !== 'boolean') s.termVisibility[k]=true; }); }
  function isVisibleIn(s,q){ ensureSubjectVisibility(s); return s.termVisibility[q] !== false; }
  function visiblePeriodsForSubject(s){ return periods().filter(p => isVisibleIn(s,p.key)); }
  function normalizeSex(v){ const s=text(v).toLowerCase(); if(s==='m'||s==='male') return 'Male'; if(s==='f'||s==='female') return 'Female'; return text(v); }
  function getClassId(){
    const dd=$id('classDropdown');
    const opt=dd&&dd.selectedIndex>=0?dd.options[dd.selectedIndex]:null;
    const candidates=[window.currentClassId, dd&&dd.value, opt&&(opt.dataset.classId||opt.dataset.id||opt.getAttribute('data-class-id')||opt.getAttribute('data-id')), opt&&opt.value, opt&&opt.text];
    for(const c of candidates){
      const v=normalizeClassKey(c);
      if(v && !/^(default|select\s+class|class\s+name|no\s+class\s+loaded)$/i.test(v)) return classKeyPart(v) || v;
    }
    return '';
  }
  function isPlaceholderClassLabel(v){ const s=text(v).replace(/\[\[\]\]/g,'').trim(); return !s || /^(select\s+class|class\s+name|no\s+class\s+loaded|default)$/i.test(s); }
  function getClassName(){ const c=[window.currentClassName, $id('classHeader')&&$id('classHeader').textContent]; const dd=$id('classDropdown'); if(dd&&dd.selectedIndex>=0&&dd.options[dd.selectedIndex]) c.push(dd.options[dd.selectedIndex].text,dd.options[dd.selectedIndex].label,dd.options[dd.selectedIndex].value); c.push(state.className,state.classId,window.currentClassId); for(const x of c){ const v=text(x).replace(/\[\[\]\]/g,'').trim(); if(!isPlaceholderClassLabel(v)) return v; } return state.classId&&state.classId!=='default'?state.classId:'No class loaded'; }
  function readHostRoster(){ if(!state.classId) return []; let list=Array.isArray(window.currentStudents)?window.currentStudents:null; if(!list||!list.length){try{list=JSON.parse(localStorage.getItem(`students-${state.classId}`)||'[]')}catch(_){list=[]}} return (Array.isArray(list)?list:[]).map((s,i)=>({learnerId:text(s.learnerId||s.id||s.lrn)||`${i+1}-${text(s.name||s.fullName||s.studentName).toLowerCase().replace(/\s+/g,'-')}`,name:text(s.name||s.fullName||s.studentName),sex:normalizeSex(s.sex||s.gender),order:Number.isFinite(Number(s.order))?Number(s.order):i})).filter(x=>x.name).sort((a,b)=>a.order-b.order); }
  function activeSubjects(){ const a=state.subjects.slice().sort((x,y)=>(Number(x.order)||0)-(Number(y.order)||0)); return state.showArchived==='all'?a:a.filter(s=>!s.archived); }
  function defaultSubject(){ const n=state.subjects.length+1; return {id:uid('subj'),name:`Subject ${n}`,teacher:'',sourceType:'manual',linkedRecord:'',linkedColumn:'',archived:false,order:n,termVisibility:{q1:true,q2:true,q3:true,q4:true}}; }
  function migrateGradeObject(o){ if(!o||typeof o!=='object') return {}; Object.entries(T_TO_Q).forEach(([t,q])=>{ if((o[q]===''||o[q]==null) && o[t]!=='' && o[t]!=null) o[q]=o[t]; if(Object.prototype.hasOwnProperty.call(o,t)) delete o[t]; }); Q_KEYS.forEach(q=>{ const v=toWholeGrade(o[q]); if(v==null) delete o[q]; else o[q]=v; }); Object.keys(o).forEach(k=>{ if(!Q_KEYS.includes(k)) delete o[k]; }); return o; }
  function ensureDataShape(){ if(!Array.isArray(state.subjects)) state.subjects=[]; state.subjects.forEach((s,i)=>{ if(!s.id) s.id=uid('subj'); if(!s.order) s.order=i+1; s.sourceType=s.sourceType==='linked'?'linked':'manual'; s.archived=!!s.archived; ensureSubjectVisibility(s); }); if(!state.grades||typeof state.grades!=='object') state.grades={}; Object.values(state.grades).forEach(row=>{ if(row&&typeof row==='object') Object.values(row).forEach(migrateGradeObject); }); state.roster.forEach(l=>{ state.grades[l.learnerId]=state.grades[l.learnerId]||{}; state.subjects.forEach(s=>{ state.grades[l.learnerId][s.id]=migrateGradeObject(state.grades[l.learnerId][s.id]||{}); }); }); state.subjects.sort((a,b)=>(Number(a.order)||0)-(Number(b.order)||0)).forEach((s,i)=>s.order=i+1); if(state.selectedLearnerId&&!state.roster.some(l=>l.learnerId===state.selectedLearnerId)) state.selectedLearnerId=''; if(state.selectedSubjectId&&!state.subjects.some(s=>s.id===state.selectedSubjectId)) state.selectedSubjectId=''; if(!state.selectedLearnerId&&state.roster[0]) state.selectedLearnerId=state.roster[0].learnerId; if(!state.selectedSubjectId&&state.subjects[0]) state.selectedSubjectId=state.subjects[0].id; }
  function gradeFor(lid,sid,q){ return toWholeGrade(((state.grades[lid]||{})[sid]||{})[q]); }
  function subjectFg(lid,s){ return averageWhole(visiblePeriodsForSubject(s).map(p=>gradeFor(lid,s.id,p.key))); }
  function termFg(lid,q){ return averageWhole(activeSubjects().filter(s=>isVisibleIn(s,q)).map(s=>gradeFor(lid,s.id,q))); }
  function learnerFgs(lid){ return state.academicStructure==='modifiedThreeTerm' ? ['q1','q2','q3'].map(q=>termFg(lid,q)).filter(Number.isInteger) : activeSubjects().map(s=>subjectFg(lid,s)).filter(Number.isInteger); }
  function learnerGa(lid){ return averageWhole(learnerFgs(lid)); }
  function promotion(ga,fgs){ if(!Number.isInteger(ga)) return ''; const fc=(fgs||[]).filter(v=>Number.isInteger(v)&&v<PASSING_GRADE).length; if(ga<PASSING_GRADE||fc>=2) return 'RETAINED'; if(fc>=1&&ga>=PASSING_GRADE) return 'REMEDIAL CLASS'; return 'PROMOTED'; }
  function award(ga,fgs){ if(!Number.isInteger(ga)||!(fgs||[]).length||fgs.some(v=>!Number.isInteger(v)||v<PASSING_GRADE)) return ''; if(ga>=98) return 'WITH HIGHEST HONORS'; if(ga>=95) return 'WITH HIGH HONORS'; if(ga>=90) return 'WITH HONORS'; return ''; }
  function computedRows(){ const r=state.roster.map((l,i)=>{ const fgs=learnerFgs(l.learnerId), ga=learnerGa(l.learnerId); return {learner:l,index:i+1,name:l.name,sex:l.sex,fgs,ga,descriptor:descriptor(ga),promotion:promotion(ga,fgs),award:award(ga,fgs),rank:''}; }); computeCompetitionRanks(r); return r; }
  function computeCompetitionRanks(rows){ const v=rows.filter(r=>Number.isInteger(r.ga)).sort((a,b)=>b.ga!==a.ga?b.ga-a.ga:String(a.name||'').localeCompare(String(b.name||''))); let pg=null,pr=0; v.forEach((r,i)=>{ if(r.ga===pg) r.rank=pr; else {r.rank=i+1; pr=r.rank; pg=r.ga;} }); }

  function gsNorm(v){ return text(v).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' '); }
  function gsSlug(v){ return text(v).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); }
  function learnerMatchKey(v){ return `${gsNorm(v&&v.name)}|${normalizeSex(v&&v.sex).toLowerCase()}`; }
  function learnerPickerDisplayRows(){
    const counters={Male:0,Female:0};
    const groups={Male:[],Female:[],Other:[]};
    const ordered=Array.isArray(state.roster)?state.roster.slice():[];
    ordered.forEach((l,idx)=>{
      const sex=normalizeSex(l&&l.sex);
      const key=sex==='Male'?'Male':(sex==='Female'?'Female':'Other');
      groups[key].push({learner:l,index:idx,sex});
    });
    return groups.Male.concat(groups.Female,groups.Other).map(item=>{
      const l=item.learner;
      const sex=item.sex||'';
      if(sex==='Male'||sex==='Female'){
        counters[sex]+=1;
        return {learner:l,label:`${counters[sex]}. ${l.name} (${sex})`};
      }
      return {learner:l,label:`${item.index+1}. ${l.name}${sex?' ('+sex+')':''}`};
    });
  }
  function discoverClassRecords(){
    const out=[],seen=new Set(),labels={};
    try{ for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i)||''; if(/^classrecord-sy-index::/i.test(k)){ let a=[]; try{a=JSON.parse(localStorage.getItem(k)||'[]')||[]}catch(_){}; (Array.isArray(a)?a:[]).forEach(x=>{ if(x&&x.key) labels[text(x.key)]=text(x.label); }); } } }catch(_){}
    const add=(key,payload,label)=>{ if(!payload||typeof payload!=='object')return; const h=payload.recordHeader||{}, fs=payload.finalSummary||{}; if(!h.recordId&&!h.subject&&!fs.learners)return; const k=text(key||h.recordId); if(seen.has(k))return; seen.add(k); out.push({key:k,payload,header:h,label:text(label||labels[k]||h.recordLabel||h.subject||k)}); };
    try{ if(window.CTMClassRecord&&typeof window.CTMClassRecord._debugSnapshot==='function'){ const s=window.CTMClassRecord._debugSnapshot(); add((s&&s.recordHeader&&s.recordHeader.recordId)||'__live_classrecord__',s,'Live Class Record'); }}catch(_){}
    try{ for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i)||''; if(!/^classrecord-sy::/i.test(k)||/^classrecord-sy-index::/i.test(k))continue; let v=null; try{v=JSON.parse(localStorage.getItem(k)||'null')}catch(_){}; add(k,v,labels[k]); } }catch(_){}
    return out;
  }
  function recordMatchesClass(r){ const h=r&&r.header||{}, cid=gsSlug(state.classId), cn=gsNorm(state.className), a=gsSlug(h.classId), b=gsNorm(h.className||h.section); return !!((cid&&a&&cid===a)||(cn&&b&&cn===b)); }
  function recordMatchesSubject(r,s){ const h=r&&r.header||{}, a=gsNorm(s&&s.name), b=gsNorm(h.subject||h.recordLabel||r.label); return !!(a&&b&&(a===b||a.includes(b)||b.includes(a))); }
  function resolveLinkedRecord(s,records){ const ref=text(s&&s.linkedRecord), rn=gsNorm(ref), rs=gsSlug(ref), c=[]; (records||[]).forEach(r=>{ if(!recordMatchesClass(r)) return; const h=r.header||{}, ids=[r.key,h.recordId,h.recordLabel,h.subject,r.label].map(text).filter(Boolean); let score=0; if(ref){ if(ids.some(x=>text(x)===ref||gsSlug(x)===rs||gsNorm(x)===rn))score+=100; else if(rn&&ids.some(x=>gsNorm(x).includes(rn)||rn.includes(gsNorm(x))))score+=60; } else if(recordMatchesSubject(r,s)) score+=80; score+=20; if(recordMatchesSubject(r,s))score+=15; if(score)c.push({r,score}); }); c.sort((a,b)=>b.score-a.score); return c[0]&&c[0].r||null; }
  function qToTerm(q){ return ({q1:'term1',q2:'term2',q3:'term3',q4:'term4'}[q]||'term1'); }
  function resolveSourceTerm(col,q){ const raw=gsNorm(col); if(/(term|quarter|q|t)\s*1\b|\b1\b/.test(raw))return'term1'; if(/(term|quarter|q|t)\s*2\b|\b2\b/.test(raw))return'term2'; if(/(term|quarter|q|t)\s*3\b|\b3\b/.test(raw))return'term3'; if(/(term|quarter|q|t)\s*4\b|\b4\b/.test(raw))return'term4'; if(/final|semester|overall|general average/.test(raw))return'final'; return qToTerm(q); }
  function makeLearnerMaps(list){ const byId=new Map(),byLrn=new Map(),byNameSex=new Map(),byName=new Map(); (Array.isArray(list)?list:[]).forEach(row=>{ [row&&row.learnerId,row&&row.id,row&&row.studentId].map(text).filter(Boolean).forEach(id=>byId.set(id,row)); if(text(row&&row.lrn))byLrn.set(text(row.lrn),row); if(gsNorm(row&&row.name)){byName.set(gsNorm(row.name),row); byNameSex.set(learnerMatchKey(row),row);} }); return{byId,byLrn,byNameSex,byName}; }
  function classRecordLearnerRows(payload){ const lists=[]; if(payload&&payload.finalSummary&&Array.isArray(payload.finalSummary.learners))lists.push(payload.finalSummary.learners); ['term1','term2','term3','term4'].forEach(k=>{ if(payload&&payload[k]&&Array.isArray(payload[k].learners))lists.push(payload[k].learners); }); return lists; }
  function findClassRecordLearner(rec,l){ const lists=classRecordLearnerRows(rec&&rec.payload||{}), ids=[l&&l.learnerId,l&&l.id,l&&l.lrn].map(text).filter(Boolean); for(const list of lists){ const m=makeLearnerMaps(list); for(const id of ids){ if(m.byId.has(id))return m.byId.get(id); if(m.byLrn.has(id))return m.byLrn.get(id); } if(m.byNameSex.has(learnerMatchKey(l)))return m.byNameSex.get(learnerMatchKey(l)); if(m.byName.has(gsNorm(l&&l.name)))return m.byName.get(gsNorm(l&&l.name)); } return null; }
  function extractCrlGrade(row,term){ if(!row)return null; if(term==='final'){ const fr=row.finalResult||{}; return toWholeGrade(row.finalGrade??row.finalDisplayedNumeric??row.semesterGrade??fr.finalDisplayedNumeric??fr.termGrade); } if(row.termGrades&&row.termGrades[term]!=null&&row.termGrades[term]!=='')return toWholeGrade(row.termGrades[term]); const tr=row.termResults&&row.termResults[term]; if(tr)return toWholeGrade(tr.termGrade??tr.finalDisplayedNumeric??tr.transmutedGrade); const c=row.computed||{}; return toWholeGrade(c.termGrade??c.finalDisplayedNumeric??row.termGrade); }
  function extractLinkedGrade(rec,l,term){ let row=findClassRecordLearner(rec,l), v=extractCrlGrade(row,term); if(v!=null)return v; const p=rec&&rec.payload||{}; if(term!=='final'&&p[term]&&Array.isArray(p[term].learners)){ const m=makeLearnerMaps(p[term].learners); row=m.byId.get(text(l.learnerId))||m.byLrn.get(text(l.learnerId))||m.byNameSex.get(learnerMatchKey(l))||m.byName.get(gsNorm(l.name)); v=extractCrlGrade(row,term); } return v; }
  function forceSetGradeState(lid,sid,q,val){ if(!lid||!sid||!q||!Q_KEYS.includes(q))return false; const v=toWholeGrade(val); state.grades[lid]=state.grades[lid]||{}; state.grades[lid][sid]=state.grades[lid][sid]||{}; const old=toWholeGrade(state.grades[lid][sid][q]); if(v==null){ if(Object.prototype.hasOwnProperty.call(state.grades[lid][sid],q)){delete state.grades[lid][sid][q]; return true;} return false;} if(old!==v){state.grades[lid][sid][q]=v; return true;} return false; }
  function syncLinkedGrades(opts={}){ ensureDataShape(); const linked=state.subjects.filter(s=>s&&s.sourceType==='linked'&&!s.archived&&(!opts.subjectId||s.id===opts.subjectId)); if(!linked.length)return{changed:false,values:0,missingRecords:0}; const records=discoverClassRecords(); let changed=false,values=0,missingRecords=0; linked.forEach(s=>{ const rec=resolveLinkedRecord(s,records); if(!rec){missingRecords++; return;} visiblePeriodsForSubject(s).forEach(p=>{ const term=resolveSourceTerm(s.linkedColumn,p.key); state.roster.forEach(l=>{ const v=extractLinkedGrade(rec,l,term); if(v!=null)values++; if(forceSetGradeState(l.learnerId,s.id,p.key,v))changed=true; }); }); }); if(!opts.silent){ if(values)flash(`Linked grades synced: ${values} value${values===1?'':'s'}`); else if(missingRecords)flash('Linked Class Record not found'); else flash('No linked grades found'); } return{changed,values,missingRecords}; }
  function ensureGradeSheetRuntimeStyles(){
    if($id('ctm-gs-runtime-fixes'))return;
    const style=document.createElement('style');
    style.id='ctm-gs-runtime-fixes';
    style.textContent=`/* CTM FIX 2026-07-10D: Frozen panes with aligned colgroups and reserved scrollbar lanes */
#gradeSheetModal #gsPanelLearner > .ctm-gs-card > .ctm-gs-grid{grid-template-columns:minmax(220px,520px)!important;max-width:560px!important}
#gradeSheetModal .ctm-gs-learner-nav{grid-column:1/-1!important;display:flex!important;flex-wrap:nowrap!important;justify-content:flex-start!important;align-items:center!important;gap:6px!important;margin-top:2px!important;width:100%!important;min-width:0!important}
#gradeSheetModal .ctm-gs-learner-nav .ctm-gs-btn{flex:1 1 0!important;min-width:0!important;max-width:none!important;white-space:nowrap!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:4px!important;padding-left:4px!important;padding-right:4px!important;overflow:hidden!important}
#gradeSheetModal .ctm-gs-learner-nav .ctm-gs-nav-text{display:inline!important;overflow:hidden!important;text-overflow:ellipsis!important}
#gradeSheetModal .ctm-gs-learner-nav .ctm-gs-nav-icon{display:inline-flex!important;line-height:1!important;flex:0 0 auto!important}
#gradeSheetModal .ctm-gs-table-scroll{overflow:hidden!important;display:grid!important;grid-template-columns:var(--gs-left-w,225px) minmax(0,1fr) var(--gs-scrollbar-w,17px)!important;grid-template-rows:var(--gs-head-h,108px) minmax(0,1fr) var(--gs-scrollbar-h,17px)!important;align-items:stretch!important;justify-items:stretch!important}
#gradeSheetModal .ctm-gs-table-scroll > #gsTable{position:absolute!important;left:-100000px!important;top:-100000px!important;visibility:hidden!important;pointer-events:none!important}
#gradeSheetModal .ctm-gs-freeze-pane{min-width:0!important;min-height:0!important;background:#fff!important;box-sizing:border-box!important}
#gradeSheetModal .ctm-gs-freeze-corner{grid-column:1;grid-row:1;overflow:hidden!important;z-index:8!important;background:#dbeafe!important;box-shadow:1px 0 0 #cbd5e1,0 1px 0 #cbd5e1}
#gradeSheetModal .ctm-gs-freeze-top{grid-column:2;grid-row:1;overflow:hidden!important;z-index:7!important;background:#eef2ff!important;box-shadow:0 1px 0 #cbd5e1}
#gradeSheetModal .ctm-gs-freeze-left{grid-column:1;grid-row:2;overflow:hidden!important;z-index:6!important;background:#fff!important;box-shadow:1px 0 0 #cbd5e1}
#gradeSheetModal .ctm-gs-freeze-body{grid-column:2;grid-row:2;overflow:hidden!important;z-index:5!important;background:#fff!important;overscroll-behavior:contain!important;position:relative!important}
#gradeSheetModal .ctm-gs-freeze-hscroll{grid-column:2;grid-row:3;overflow-x:auto!important;overflow-y:hidden!important;z-index:9!important;background:#f1f5f9!important;border-top:1px solid #cbd5e1!important;box-sizing:border-box!important}
#gradeSheetModal .ctm-gs-freeze-vscroll{grid-column:3;grid-row:2;overflow-y:auto!important;overflow-x:hidden!important;z-index:9!important;background:#f1f5f9!important;border-left:1px solid #cbd5e1!important;box-sizing:border-box!important}
#gradeSheetModal .ctm-gs-freeze-scroll-corner{grid-column:3;grid-row:3;z-index:10!important;background:#e2e8f0!important;border-left:1px solid #cbd5e1!important;border-top:1px solid #cbd5e1!important;box-sizing:border-box!important}
#gradeSheetModal .ctm-gs-freeze-mover{width:max-content!important;height:max-content!important;will-change:transform!important;transform:translate3d(0,0,0)}
#gradeSheetModal .ctm-gs-freeze-hscroll-inner,#gradeSheetModal .ctm-gs-freeze-vscroll-inner{display:block!important;min-width:1px!important;min-height:1px!important}
#gradeSheetModal .ctm-gs-freeze-pane table.ctm-gs-table{width:max-content!important;min-width:0!important;table-layout:fixed!important;margin:0!important;border-radius:0!important}
#gradeSheetModal .ctm-gs-freeze-pane col{box-sizing:border-box!important}
#gradeSheetModal .ctm-gs-freeze-corner table.ctm-gs-table,#gradeSheetModal .ctm-gs-freeze-left table.ctm-gs-table{width:var(--gs-left-w,225px)!important;min-width:var(--gs-left-w,225px)!important}
#gradeSheetModal .ctm-gs-freeze-pane .ctm-gs-table th,#gradeSheetModal .ctm-gs-freeze-pane .ctm-gs-table td{position:static!important;left:auto!important;top:auto!important;z-index:auto!important;background-clip:padding-box!important}
#gradeSheetModal .ctm-gs-freeze-corner th{height:var(--gs-head-h,108px)!important;background:#dbeafe!important;vertical-align:middle!important}
#gradeSheetModal .ctm-gs-freeze-top thead th{background:#eef2ff!important}
#gradeSheetModal .ctm-gs-freeze-left td{background:#fff!important}
#gradeSheetModal .ctm-gs-freeze-left tr.is-selected td,#gradeSheetModal .ctm-gs-freeze-body tr.is-selected td{background:#dbeafe!important}
#gradeSheetModal .ctm-gs-table .gs-ga{font-weight:900!important;color:#0f172a!important}
@media(max-width:700px){#gradeSheetModal .ctm-gs-learner-nav{flex-wrap:nowrap!important;gap:4px!important}#gradeSheetModal .ctm-gs-learner-nav .ctm-gs-btn{flex:1 1 0!important;min-width:0!important;max-width:none!important;font-size:.7rem!important}}
@media(max-width:340px){#gradeSheetModal .ctm-gs-learner-nav{gap:3px!important}#gradeSheetModal .ctm-gs-learner-nav .ctm-gs-btn{padding-left:2px!important;padding-right:2px!important}#gradeSheetModal .ctm-gs-learner-nav .ctm-gs-nav-text{display:none!important}}
#gradeSheetModal #gsPanelLearner > .ctm-gs-card{touch-action:pan-y!important;overscroll-behavior:contain!important}
#gradeSheetModal #gsPanelLearner .ctm-gs-card-title .ctm-gs-mini::after{content:" • Swipe left/right to change learner";font-weight:700;color:#2563eb}`;
    (document.head||document.documentElement).appendChild(style);
  }

  function removeGradeSheetFreezePanes(){
    const wrap=(dom.gsTable||$id('gsTable'))&&((dom.gsTable||$id('gsTable')).parentElement);
    if(!wrap)return;
    wrap.querySelectorAll('.ctm-gs-freeze-pane').forEach(x=>x.remove());
  }
  function cloneTableShell(){
    const t=document.createElement('table');
    t.className='ctm-gs-table';
    t.setAttribute('aria-hidden','true');
    return t;
  }
  function autoFitNoColumnWidth(source){
    const values=['#'];
    try{
      if(source&&source.tBodies&&source.tBodies[0]){
        Array.from(source.tBodies[0].rows||[]).forEach(row=>{
          const cell=row.cells&&row.cells[0];
          if(cell) values.push(text(cell.textContent));
        });
      }
    }catch(_){}
    const maxLen=values.reduce((m,v)=>Math.max(m,String(v||'').trim().length),1);
    const sample=String(Math.max(1,source&&source.tBodies&&source.tBodies[0]?source.tBodies[0].rows.length:1));
    const len=Math.max(maxLen,sample.length,1);
    return Math.max(28,Math.min(56,Math.ceil(len*8+18)));
  }
  function measureGradeSheetColumns(source){
    const fallback={no:34,name:185,sex:58,period:50,fg:52,remarks:72,summary:86};
    const bodyRow=source.tBodies&&source.tBodies[0]&&source.tBodies[0].rows&&source.tBodies[0].rows[0];
    let cells=bodyRow?Array.from(bodyRow.cells):[];
    let widths=cells.map(c=>Math.ceil(c.getBoundingClientRect().width||c.offsetWidth||0));
    if(!widths.length||widths.some(w=>!w)){
      const headerRows=source.tHead?Array.from(source.tHead.rows):[];
      const leaf=[];
      const maxCols=Array.from(source.rows||[]).reduce((m,r)=>m+0||Math.max(m,Array.from(r.cells).reduce((a,c)=>a+(Number(c.colSpan)||1),0)),0);
      const last=headerRows[headerRows.length-1];
      if(last) Array.from(last.cells).forEach(c=>{ for(let i=0;i<(Number(c.colSpan)||1);i++) leaf.push(c); });
      widths=[];
      widths.push(Math.ceil((source.querySelector('.gs-col-no')&&source.querySelector('.gs-col-no').getBoundingClientRect().width)||fallback.no));
      widths.push(Math.ceil((source.querySelector('.gs-col-name')&&source.querySelector('.gs-col-name').getBoundingClientRect().width)||fallback.name));
      widths.push(Math.ceil((source.querySelector('.gs-col-sex')&&source.querySelector('.gs-col-sex').getBoundingClientRect().width)||fallback.sex));
      for(let i=3;i<maxCols;i++){
        const c=leaf[i-3];
        let w=0;
        if(c) w=Math.ceil(c.getBoundingClientRect().width||c.offsetWidth||0);
        widths.push(w||fallback.period);
      }
    }
    widths=widths.map((w,i)=>Math.max(24,Math.ceil(w||([fallback.no,fallback.name,fallback.sex][i]||fallback.period))));
    widths[0]=autoFitNoColumnWidth(source);
    return widths;
  }
  function applyGradeSheetColGroup(table,widths){
    if(!table||!Array.isArray(widths)||!widths.length)return 0;
    const old=table.querySelector('colgroup');
    if(old) old.remove();
    const cg=document.createElement('colgroup');
    let total=0;
    widths.forEach(w=>{
      const col=document.createElement('col');
      const px=Math.max(1,Math.ceil(Number(w)||1));
      col.style.width=px+'px';
      cg.appendChild(col);
      total+=px;
    });
    table.insertBefore(cg,table.firstChild);
    table.style.width=total+'px';
    table.style.minWidth=total+'px';
    return total;
  }
  function cloneHeaderWithoutFrozen(source){
    const top=cloneTableShell();
    const thead=source.tHead&&source.tHead.cloneNode(true);
    if(thead&&thead.rows[0]){
      for(let i=0;i<2;i++){ if(thead.rows[0].cells[0]) thead.rows[0].deleteCell(0); }
      top.appendChild(thead);
    }
    return top;
  }
  function cloneCornerHeader(source){
    const corner=cloneTableShell();
    const thead=document.createElement('thead');
    const tr=document.createElement('tr');
    if(source.tHead&&source.tHead.rows[0]){
      Array.from(source.tHead.rows[0].cells).slice(0,2).forEach(th=>{
        const c=th.cloneNode(true);
        c.removeAttribute('rowspan');
        c.removeAttribute('colspan');
        tr.appendChild(c);
      });
    }
    thead.appendChild(tr); corner.appendChild(thead); return corner;
  }
  function cloneBodyColumns(source,keepFrozen){
    const t=cloneTableShell();
    const tb=document.createElement('tbody');
    const src=source.tBodies&&source.tBodies[0];
    if(src){
      Array.from(src.rows).forEach(row=>{
        const tr=row.cloneNode(true);
        const cells=Array.from(tr.cells);
        cells.forEach((cell,i)=>{
          const keep=keepFrozen ? i<2 : i>=2;
          if(!keep) cell.remove();
        });
        tb.appendChild(tr);
      });
    }
    t.appendChild(tb); return t;
  }
  function getNativeScrollbarSize(){
    const d=document.createElement('div');
    d.style.cssText='position:absolute;left:-9999px;top:-9999px;width:100px;height:100px;overflow:scroll;';
    document.body.appendChild(d);
    const w=Math.max(12,d.offsetWidth-d.clientWidth||17);
    const h=Math.max(12,d.offsetHeight-d.clientHeight||17);
    d.remove();
    return {w,h};
  }
  function wrapTableForMove(table){
    const mover=document.createElement('div');
    mover.className='ctm-gs-freeze-mover';
    mover.appendChild(table);
    return mover;
  }
  function buildGradeSheetFreezePanes(){
    const table=dom.gsTable||$id('gsTable');
    if(!table||!table.tHead||!table.tBodies||!table.tBodies[0])return;
    const wrap=table.parentElement;
    if(!wrap)return;
    wrap.querySelectorAll('.ctm-gs-freeze-pane,.ctm-gs-freeze-hscroll,.ctm-gs-freeze-vscroll,.ctm-gs-freeze-scroll-corner').forEach(x=>x.remove());
    table.style.visibility='hidden';
    table.style.position='absolute';
    table.style.left='-100000px';
    table.style.top='-100000px';

    const colW=measureGradeSheetColumns(table);
    const frozenW=colW.slice(0,2);
    const scrollW=colW.slice(2);
    const leftW=frozenW.reduce((a,b)=>a+b,0)||225;
    const scrollTableW=scrollW.reduce((a,b)=>a+b,0)||1;
    const headH=Math.max(96,Math.ceil((table.tHead&&table.tHead.getBoundingClientRect().height)||108));
    const sb=getNativeScrollbarSize();
    wrap.style.setProperty('--gs-left-w',leftW+'px');
    wrap.style.setProperty('--gs-no-w',(frozenW[0]||34)+'px');
    wrap.style.setProperty('--gs-head-h',headH+'px');
    wrap.style.setProperty('--gs-scrollbar-w',sb.w+'px');
    wrap.style.setProperty('--gs-scrollbar-h',sb.h+'px');

    const corner=document.createElement('div'), top=document.createElement('div'), left=document.createElement('div'), body=document.createElement('div'), hscroll=document.createElement('div'), vscroll=document.createElement('div'), scorner=document.createElement('div');
    corner.className='ctm-gs-freeze-pane ctm-gs-freeze-corner';
    top.className='ctm-gs-freeze-pane ctm-gs-freeze-top';
    left.className='ctm-gs-freeze-pane ctm-gs-freeze-left';
    body.className='ctm-gs-freeze-pane ctm-gs-freeze-body';
    hscroll.className='ctm-gs-freeze-hscroll';
    vscroll.className='ctm-gs-freeze-vscroll';
    scorner.className='ctm-gs-freeze-scroll-corner';

    const cornerTable=cloneCornerHeader(table);
    const topTable=cloneHeaderWithoutFrozen(table);
    const leftTable=cloneBodyColumns(table,true);
    const bodyTable=cloneBodyColumns(table,false);
    applyGradeSheetColGroup(cornerTable,frozenW);
    applyGradeSheetColGroup(leftTable,frozenW);
    applyGradeSheetColGroup(topTable,scrollW);
    applyGradeSheetColGroup(bodyTable,scrollW);

    corner.appendChild(cornerTable);
    top.appendChild(wrapTableForMove(topTable));
    left.appendChild(wrapTableForMove(leftTable));
    body.appendChild(wrapTableForMove(bodyTable));
    hscroll.innerHTML='<div class="ctm-gs-freeze-hscroll-inner"></div>';
    vscroll.innerHTML='<div class="ctm-gs-freeze-vscroll-inner"></div>';
    wrap.appendChild(corner); wrap.appendChild(top); wrap.appendChild(left); wrap.appendChild(body); wrap.appendChild(hscroll); wrap.appendChild(vscroll); wrap.appendChild(scorner);

    const topMover=top.querySelector('.ctm-gs-freeze-mover');
    const leftMover=left.querySelector('.ctm-gs-freeze-mover');
    const bodyMover=body.querySelector('.ctm-gs-freeze-mover');
    const hInner=hscroll.firstElementChild;
    const vInner=vscroll.firstElementChild;
    const bodyTableH=Math.ceil(bodyTable.getBoundingClientRect().height||bodyTable.scrollHeight||1);
    const rightEndBuffer=Math.max(24,sb.w+8);
    hInner.style.width=Math.max(scrollTableW+rightEndBuffer,body.clientWidth+1)+'px';
    hInner.style.height='1px';
    vInner.style.height=Math.max(bodyTableH,body.clientHeight+1)+'px';
    vInner.style.width='1px';

    const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
    const sync=()=>{
      const maxX=Math.max(0,scrollTableW-body.clientWidth);
      const maxY=Math.max(0,bodyTableH-body.clientHeight);
      const x=clamp(hscroll.scrollLeft,0,maxX);
      const y=clamp(vscroll.scrollTop,0,maxY);
      if(hscroll.scrollLeft!==x) hscroll.scrollLeft=x;
      if(vscroll.scrollTop!==y) vscroll.scrollTop=y;
      if(topMover) topMover.style.transform=`translate3d(${-x}px,0,0)`;
      if(leftMover) leftMover.style.transform=`translate3d(0,${-y}px,0)`;
      if(bodyMover) bodyMover.style.transform=`translate3d(${-x}px,${-y}px,0)`;
    };
    hscroll.addEventListener('scroll',sync,{passive:true});
    vscroll.addEventListener('scroll',sync,{passive:true});
    body.addEventListener('wheel',e=>{
      if(e.deltaY){ vscroll.scrollTop+=e.deltaY; }
      if(e.deltaX){ hscroll.scrollLeft+=e.deltaX; }
      if(e.shiftKey&&e.deltaY&&!e.deltaX){ hscroll.scrollLeft+=e.deltaY; }
      if(e.deltaY||e.deltaX){ e.preventDefault(); sync(); }
    },{passive:false});
    left.addEventListener('wheel',e=>{ if(e.deltaY){ vscroll.scrollTop+=e.deltaY; e.preventDefault(); sync(); } },{passive:false});
    top.addEventListener('wheel',e=>{ if(e.deltaX||e.shiftKey){ hscroll.scrollLeft+=e.deltaX||e.deltaY; e.preventDefault(); sync(); } },{passive:false});
    /* CTM TOUCH FIX 2026-07-11 */
    let gsTouch=null;
    const bindTouchScroll=(el,mode)=>{
      if(!el) return;
      el.style.touchAction='none';
      el.addEventListener('pointerdown',ev=>{
        if(ev.pointerType!=='touch') return;
        gsTouch={x:ev.clientX,y:ev.clientY,sx:hscroll.scrollLeft,sy:vscroll.scrollTop,mode};
      },{passive:true});
      el.addEventListener('pointermove',ev=>{
        if(!gsTouch||ev.pointerType!=='touch') return;
        const dx=ev.clientX-gsTouch.x, dy=ev.clientY-gsTouch.y;
        if(gsTouch.mode!=='v') hscroll.scrollLeft=gsTouch.sx-dx;
        if(gsTouch.mode!=='h') vscroll.scrollTop=gsTouch.sy-dy;
        sync();
        ev.preventDefault();
      },{passive:false});
    };
    bindTouchScroll(body,'both');
    bindTouchScroll(left,'v');
    bindTouchScroll(top,'h');
    ['pointerup','pointercancel','lostpointercapture'].forEach(evt=>document.addEventListener(evt,()=>{gsTouch=null;},{passive:true}));
    sync();
  }
  function adjustGradeSheetSticky(){ buildGradeSheetFreezePanes(); }
  function scheduleStickyAdjust(){
    requestAnimationFrame(()=>{ adjustGradeSheetSticky(); setTimeout(adjustGradeSheetSticky,0); });
  }
  function applyRuntimeUiTweaks(){ ensureGradeSheetRuntimeStyles(); const navMarkup={gsBtnFirstLearner:'<span class="ctm-gs-nav-icon" aria-hidden="true">⏮️</span><span class="ctm-gs-nav-text">First</span>',gsBtnPrevLearner:'<span class="ctm-gs-nav-icon" aria-hidden="true">◀️</span><span class="ctm-gs-nav-text">Previous</span>',gsBtnNextLearner:'<span class="ctm-gs-nav-text">Next</span><span class="ctm-gs-nav-icon" aria-hidden="true">▶️</span>',gsBtnLastLearner:'<span class="ctm-gs-nav-text">Last</span><span class="ctm-gs-nav-icon" aria-hidden="true">⏭️</span>'}; Object.entries(navMarkup).forEach(([id,markup])=>{ const b=dom[id]; if(b&&!b.querySelector('.ctm-gs-nav-text')) b.innerHTML=markup; }); const s=state.subjects.find(x=>x.id===state.selectedSubjectId); const isArchived=!!(s&&s.archived), archiveLabel=isArchived?'↩️ Restore Subject':'📦 Archive Subject', archivePlain=isArchived?'Restore Subject':'Archive Subject'; if(dom.gsBtnArchiveSubject){dom.gsBtnArchiveSubject.textContent=archiveLabel;dom.gsBtnArchiveSubject.title=archivePlain;dom.gsBtnArchiveSubject.setAttribute('aria-label',archivePlain);} if(dom.gsBtnDeleteSubject){dom.gsBtnDeleteSubject.textContent='🗑️ Delete Permanently';dom.gsBtnDeleteSubject.title='Delete Permanently';dom.gsBtnDeleteSubject.setAttribute('aria-label','Delete Permanently');} const t=document.querySelector('#gsPanelSubjects .ctm-gs-card-title .ctm-gs-mini'); if(t)t.textContent='Manage subjects/teachers/source/order/archive/delete'; document.querySelectorAll('#gradeSheetModal [title="Archive/Delete Subject"],#gradeSheetModal [aria-label="Archive/Delete Subject"]').forEach(el=>{el.setAttribute('title','Archive Subject');el.setAttribute('aria-label','Archive Subject');}); }
  async function ensureInjected(){ if(state.htmlInjected&&$id('gradeSheetModal')) return; let html=''; try{const res=await fetch(MODULE_HTML_PATH,{cache:'no-store'}); if(res.ok) html=await res.text();}catch(_){} if(!html) throw new Error('Unable to load gradesheet.html'); let host=$id('gradeSheetHost'); if(!host){host=document.createElement('div');host.id='gradeSheetHost';document.body.appendChild(host);} host.innerHTML=html; state.htmlInjected=true; cacheDom(); bindUi(); ensureGradeSheetRuntimeStyles(); }
  function cacheDom(){ ['gradeSheetModal','gsBtnClose','gsTopClass','gsTopLayout','gsTopCount','gsAcademicStructure','gsAcademicStructureField','gsShowArchived','gsSaveStatus','gsBtnRefreshRoster','gsBtnClearGrades','gsTable','gsLearnerPicker','gsBtnFirstLearner','gsBtnPrevLearner','gsBtnNextLearner','gsBtnLastLearner','gsLearnerGradeGrid','gsLearnerSummary','gsLearnerTitle','gsSubjectPicker','gsSubjectName','gsTeacherName','gsSourceType','gsLinkedRecord','gsLinkedColumn','gsSubjectStatus','gsSubjectOrder','gsTermVisibility','gsBtnAddSubject','gsBtnSaveSubject','gsBtnArchiveSubject','gsBtnDeleteSubject','gsBtnMoveLeft','gsBtnMoveRight','gsSubjectList'].forEach(id=>dom[id]=$id(id)); }
  function readSavedGradeSheetData(key){
    if(!key) return null;
    try{ return JSON.parse(localStorage.getItem(key)||'null'); }catch(_){ return null; }
  }
  function load(){
    const cid=getClassId();
    if(!cid){ state.classId=''; resetClassScopedState(); flash('Load a class first'); return false; }
    if(cid!==state.classId){ state.classId=cid; resetClassScopedState(); }
    state.className=getClassName();
    state.roster=readHostRoster();
    const key=storageKey();
    const legacyKey=legacyStorageKey();
    let data=readSavedGradeSheetData(key);
    if(!data && legacyKey && legacyKey!==key){
      data=readSavedGradeSheetData(legacyKey);
      if(data){ try{ localStorage.setItem(key,JSON.stringify(data)); localStorage.removeItem(legacyKey); }catch(_){} }
    }
    if(data && (!data.classId || String(data.classId)===String(state.classId))){
      state.academicStructure=data.academicStructure||state.academicStructure;
      state.showArchived=data.showArchived||state.showArchived;
      state.subjects=Array.isArray(data.subjects)?data.subjects:[];
      state.grades=data.grades||{};
      state.selectedLearnerId=data.selectedLearnerId||'';
      state.selectedSubjectId=data.selectedSubjectId||'';
    } else if(data && data.classId && String(data.classId)!==String(state.classId)){
      data=null;
    }
    state.className=getClassName();
    ensureDataShape();
    syncLinkedGrades({silent:true});
    return true;
  }
  function snapshot(){ ensureDataShape(); return {version:VERSION,classId:state.classId,className:state.className,academicStructure:state.academicStructure,showArchived:state.showArchived,subjects:state.subjects,grades:state.grades,selectedLearnerId:state.selectedLearnerId,selectedSubjectId:state.selectedSubjectId,updatedAt:new Date().toISOString()}; }
  function persist(){ if(!state.classId) return; const key=storageKey(); if(!key) return; try{localStorage.setItem(key,JSON.stringify(snapshot())); const legacyKey=legacyStorageKey(); if(legacyKey&&legacyKey!==key) localStorage.removeItem(legacyKey); flash('Saved');}catch(e){flash('Storage error');} }
  function schedulePersist(){ clearTimeout(state.saveTimer); flash('Saving…'); state.saveTimer=setTimeout(persist,250); }
  function flash(m){ if(dom.gsSaveStatus) dom.gsSaveStatus.textContent=m; }
  function render(){ cacheDom(); ensureDataShape(); state.className=getClassName(); if(dom.gsAcademicStructure) dom.gsAcademicStructure.value=state.academicStructure; if(dom.gsAcademicStructureField) dom.gsAcademicStructureField.style.display=state.activeTab==='subjects'?'flex':'none'; if(dom.gsShowArchived) dom.gsShowArchived.value=state.showArchived; if(dom.gsTopClass) dom.gsTopClass.textContent=state.className||state.classId||'No class loaded'; if(dom.gsTopLayout) dom.gsTopLayout.textContent=structureLabel(); if(dom.gsTopCount) dom.gsTopCount.textContent=`${state.roster.length} learners`; renderTable(); renderLearnerPicker(); renderLearnerCard(); renderSubjectSetup(); updateLearnerNavButtons(); applyRuntimeUiTweaks(); }
  function actionButtons(s){ return `<button class="ctm-gs-btn ctm-gs-icon-btn danger" data-gs-action="delete" data-subject-id="${esc(s.id)}" title="Delete Subject" aria-label="Delete Subject">🗑️</button> <button class="ctm-gs-btn ctm-gs-icon-btn edit" data-gs-action="left" data-subject-id="${esc(s.id)}" title="Move Subject Left" aria-label="Move Subject Left">⬅️</button> <button class="ctm-gs-btn ctm-gs-icon-btn edit" data-gs-action="right" data-subject-id="${esc(s.id)}" title="Move Subject Right" aria-label="Move Subject Right">➡️</button> <button class="ctm-gs-btn ctm-gs-icon-btn primary ctm-gs-add-btn" data-gs-action="add" title="Add Subject" aria-label="Add Subject">➕</button>`; }
  function summaryCells(r){ return `<td class="gs-summary gs-ga">${r.ga??''}</td><td class="gs-summary">${esc(r.descriptor)}</td><td class="gs-summary">${esc(r.promotion)}</td><td class="gs-summary">${r.rank||''}</td><td class="gs-summary">${esc(r.award)}</td>`; }
  function renderTable(){ const out=state.academicStructure==='modifiedThreeTerm' ? renderModifiedTable() : renderNormalTable(); scheduleStickyAdjust(); return out; }
  function renderNormalTable(){ const subs=activeSubjects(), rows=computedRows(); let h1='<tr><th class="gs-col-no" rowspan="4">#</th><th class="gs-col-name" rowspan="4">Learner</th><th class="gs-col-sex" rowspan="4">Sex</th>'; subs.forEach(s=>h1+=`<th colspan="${visiblePeriodsForSubject(s).length+2}">${actionButtons(s)}</th>`); h1+='<th class="gs-summary gs-ga" rowspan="4">GA</th><th class="gs-summary" rowspan="4">Descriptor</th><th class="gs-summary" rowspan="4">Promotion</th><th class="gs-summary" rowspan="4">Rank</th><th class="gs-summary" rowspan="4">Academic Award</th></tr>'; let h2='<tr>',h3='<tr>',h4='<tr>'; subs.forEach(s=>{ const per=visiblePeriodsForSubject(s); h2+=`<th class="gs-subj" colspan="${per.length+2}" title="${esc(s.name)}">${esc(s.name)} ${s.sourceType==='linked'?'🔗':''}</th>`; h3+=`<th class="gs-teacher" colspan="${per.length+2}" title="${esc(s.teacher)}">${esc(s.teacher||'—')}</th>`; per.forEach(p=>h4+=`<th class="gs-period">${esc(p.label)}</th>`); h4+='<th class="gs-fg">FG</th><th class="gs-remarks">Remarks</th>'; }); h2+='</tr>';h3+='</tr>';h4+='</tr>'; let body=''; rows.forEach(r=>{ body+=`<tr data-learner-id="${esc(r.learner.learnerId)}" class="${r.learner.learnerId===state.selectedLearnerId?'is-selected':''}"><td class="gs-col-no">${r.index}</td><td class="gs-col-name" title="${esc(r.name)}">${esc(r.name)}</td><td class="gs-col-sex">${esc(r.sex)}</td>`; subs.forEach(s=>{ visiblePeriodsForSubject(s).forEach(p=>{ const v=gradeFor(r.learner.learnerId,s.id,p.key); body+=`<td class="gs-grade-cell" data-learner-id="${esc(r.learner.learnerId)}" data-subject-id="${esc(s.id)}" data-period="${p.key}">${v??''}${s.sourceType==='linked'?'<span class="gs-link">🔗</span>':''}</td>`; }); const fg=subjectFg(r.learner.learnerId,s); body+=`<td class="gs-fg">${fg??''}</td><td class="gs-remarks">${esc(remarks(fg))}</td>`; }); body+=summaryCells(r)+'</tr>'; }); if(dom.gsTable) dom.gsTable.innerHTML=`<thead>${h1}${h2}${h3}${h4}</thead><tbody>${body||'<tr><td colspan="8">No learners found. Load a class or refresh roster.</td></tr>'}</tbody>`; }
  function renderModifiedTable(){ const rows=computedRows(), terms=[{key:'q1',label:'Term 1'},{key:'q2',label:'Term 2'},{key:'q3',label:'Term 3'}]; let h1='<tr><th class="gs-col-no" rowspan="4">#</th><th class="gs-col-name" rowspan="4">Learner</th><th class="gs-col-sex" rowspan="4">Sex</th>'; terms.forEach(t=>h1+=`<th colspan="${activeSubjects().filter(s=>isVisibleIn(s,t.key)).length+2}">${t.label}</th>`); h1+='<th class="gs-summary gs-ga" rowspan="4">GA</th><th class="gs-summary" rowspan="4">Descriptor</th><th class="gs-summary" rowspan="4">Promotion</th><th class="gs-summary" rowspan="4">Rank</th><th class="gs-summary" rowspan="4">Academic Award</th></tr>'; let h2='<tr>',h3='<tr>',h4='<tr>'; terms.forEach(t=>{ const subs=activeSubjects().filter(s=>isVisibleIn(s,t.key)); h2+=`<th colspan="${subs.length+2}" class="gs-subj">${t.label} group</th>`; h3+=subs.map(s=>`<th class="gs-subj" title="${esc(s.name)}">${esc(s.name)} ${s.sourceType==='linked'?'🔗':''}</th>`).join('')+'<th class="gs-fg" rowspan="2">FG</th><th class="gs-remarks" rowspan="2">Remarks</th>'; h4+=subs.map(s=>`<th class="gs-teacher" title="${esc(s.teacher)}">${esc(s.teacher||'—')}</th>`).join(''); }); h2+='</tr>';h3+='</tr>';h4+='</tr>'; let body=''; rows.forEach(r=>{ body+=`<tr data-learner-id="${esc(r.learner.learnerId)}" class="${r.learner.learnerId===state.selectedLearnerId?'is-selected':''}"><td class="gs-col-no">${r.index}</td><td class="gs-col-name" title="${esc(r.name)}">${esc(r.name)}</td><td class="gs-col-sex">${esc(r.sex)}</td>`; terms.forEach(t=>{ const subs=activeSubjects().filter(s=>isVisibleIn(s,t.key)); subs.forEach(s=>{ const v=gradeFor(r.learner.learnerId,s.id,t.key); body+=`<td class="gs-grade-cell" data-learner-id="${esc(r.learner.learnerId)}" data-subject-id="${esc(s.id)}" data-period="${t.key}">${v??''}${s.sourceType==='linked'?'<span class="gs-link">🔗</span>':''}</td>`; }); const fg=termFg(r.learner.learnerId,t.key); body+=`<td class="gs-fg">${fg??''}</td><td class="gs-remarks">${esc(remarks(fg))}</td>`; }); body+=summaryCells(r)+'</tr>'; }); if(dom.gsTable) dom.gsTable.innerHTML=`<thead>${h1}${h2}${h3}${h4}</thead><tbody>${body||'<tr><td colspan="8">No learners found. Load a class or refresh roster.</td></tr>'}</tbody>`; }
  function renderLearnerPicker(){ if(!dom.gsLearnerPicker) return; const rows=learnerPickerDisplayRows(); dom.gsLearnerPicker.innerHTML=rows.map(x=>`<option value="${esc(x.learner.learnerId)}">${esc(x.label)}</option>`).join('')||'<option value="">No learners</option>'; dom.gsLearnerPicker.value=state.selectedLearnerId||''; }
  function inputHtml(l,s,q,label){ const v=gradeFor(l.learnerId,s.id,q), inputId=`gsGrade_${gsSlug(l.learnerId)}_${gsSlug(s.id)}_${gsSlug(q)}`; return `<div class="ctm-gs-field"><label for="${esc(inputId)}">${esc(label)}</label><input id="${esc(inputId)}" inputmode="numeric" pattern="[0-9]*" data-gs-grade-input="1" data-subject-id="${esc(s.id)}" data-period="${q}" value="${v??''}" ${s.sourceType==='linked'?'readonly title="Linked values are read-only"':''}></div>`; }
  function renderLearnerCard(){ const l=state.roster.find(x=>x.learnerId===state.selectedLearnerId); if(dom.gsLearnerTitle) dom.gsLearnerTitle.textContent=l?`Learner Grade Encoding: ${l.name}`:'Learner Grade Encoding'; if(!l){ if(dom.gsLearnerGradeGrid) dom.gsLearnerGradeGrid.innerHTML='<div class="ctm-gs-mini">No learner selected.</div>'; renderLearnerSummary(null); return; } let html=''; if(state.academicStructure==='modifiedThreeTerm'){ [{key:'q1',label:'Term 1'},{key:'q2',label:'Term 2'},{key:'q3',label:'Term 3'}].forEach(t=>{ html+=`<div class="ctm-gs-subject-grade-card" data-gs-term-card="${t.key}"><div class="ctm-gs-subject-grade-title">${t.label}</div><div class="ctm-gs-period-grid">`; activeSubjects().filter(s=>isVisibleIn(s,t.key)).forEach(s=>html+=inputHtml(l,s,t.key,s.name)); const fg=termFg(l.learnerId,t.key), termFgId=`gsTermFg_${gsSlug(l.learnerId)}_${gsSlug(t.key)}`, termRemarksId=`gsTermRemarks_${gsSlug(l.learnerId)}_${gsSlug(t.key)}`; html+=`<div class="ctm-gs-field"><label for="${esc(termFgId)}">FG</label><input id="${esc(termFgId)}" data-gs-term-fg-for="${t.key}" value="${fg??''}" readonly></div><div class="ctm-gs-field"><label for="${esc(termRemarksId)}">Remarks</label><input id="${esc(termRemarksId)}" data-gs-term-remarks-for="${t.key}" value="${esc(remarks(fg))}" readonly></div></div></div>`; }); } else { activeSubjects().forEach(s=>{ html+=`<div class="ctm-gs-subject-grade-card" data-gs-subject-card="${esc(s.id)}"><div class="ctm-gs-subject-grade-title" title="${esc(s.name)}">${esc(s.name)} ${s.sourceType==='linked'?'🔗':''}</div><div class="ctm-gs-period-grid">`; visiblePeriodsForSubject(s).forEach(p=>html+=inputHtml(l,s,p.key,p.label)); const fg=subjectFg(l.learnerId,s), fgId=`gsFg_${gsSlug(l.learnerId)}_${gsSlug(s.id)}`, remarksId=`gsRemarks_${gsSlug(l.learnerId)}_${gsSlug(s.id)}`; html+=`<div class="ctm-gs-field"><label for="${esc(fgId)}">FG</label><input id="${esc(fgId)}" data-gs-fg-for="${esc(s.id)}" value="${fg??''}" readonly></div><div class="ctm-gs-field"><label for="${esc(remarksId)}">Remarks</label><input id="${esc(remarksId)}" data-gs-remarks-for="${esc(s.id)}" value="${esc(remarks(fg))}" readonly></div></div></div>`; }); } if(dom.gsLearnerGradeGrid) dom.gsLearnerGradeGrid.innerHTML=html; renderLearnerSummary(l); }
  function renderLearnerSummary(l){ if(!dom.gsLearnerSummary) return; if(!l){dom.gsLearnerSummary.innerHTML=''; return;} const fgs=learnerFgs(l.learnerId), ga=learnerGa(l.learnerId), row=computedRows().find(r=>r.learner.learnerId===l.learnerId)||{}; const tiles=[['GA',ga??''],['Descriptor',descriptor(ga)],['Promotion',promotion(ga,fgs)],['Rank',row.rank||''],['Academic Award',award(ga,fgs)]]; dom.gsLearnerSummary.innerHTML=tiles.map(t=>`<div class="ctm-gs-summary-tile"><div class="label">${esc(t[0])}</div><div class="value">${esc(t[1])}</div></div>`).join(''); }
  function updateComputed(lid,sid,q){ if(state.academicStructure==='modifiedThreeTerm'){ const fg=termFg(lid,q), a=dom.gsLearnerGradeGrid; const fi=a&&a.querySelector(`[data-gs-term-fg-for="${CSS.escape(q)}"]`), ri=a&&a.querySelector(`[data-gs-term-remarks-for="${CSS.escape(q)}"]`); if(fi) fi.value=fg??''; if(ri) ri.value=remarks(fg); } else { const s=state.subjects.find(x=>x.id===sid), fg=s?subjectFg(lid,s):null, a=dom.gsLearnerGradeGrid; const fi=a&&a.querySelector(`[data-gs-fg-for="${CSS.escape(sid)}"]`), ri=a&&a.querySelector(`[data-gs-remarks-for="${CSS.escape(sid)}"]`); if(fi) fi.value=fg??''; if(ri) ri.value=remarks(fg); } renderLearnerSummary(state.roster.find(l=>l.learnerId===lid)); renderTable(); }
  function renderTermChecks(s){ if(!dom.gsTermVisibility) return; const lm=labelMap(); let keys=Q_KEYS; if(state.academicStructure==='firstSemester') keys=['q1','q2']; else if(state.academicStructure==='secondSemester') keys=['q3','q4']; else if(state.academicStructure==='threeTerm'||state.academicStructure==='modifiedThreeTerm') keys=['q1','q2','q3']; const tv=s&&s.termVisibility?s.termVisibility:{q1:true,q2:true,q3:true,q4:true}; dom.gsTermVisibility.innerHTML=keys.map(q=>{ const cbId=`gsTermVis_${gsSlug(s&&s.id||'new')}_${gsSlug(q)}`; return `<label class="ctm-gs-check" for="${esc(cbId)}"><input id="${esc(cbId)}" type="checkbox" data-gs-termvis="${q}" ${tv[q]!==false?'checked':''}> ${esc(lm[q]||q.toUpperCase())}</label>`; }).join('') + ((state.academicStructure==='threeTerm'||state.academicStructure==='modifiedThreeTerm')?'<span class="ctm-gs-mini">Q4 hidden/preserved</span>':''); }
  function blankSubjectForm(){ ['gsSubjectName','gsTeacherName','gsLinkedRecord','gsLinkedColumn'].forEach(k=>{ if(dom[k]) dom[k].value=''; }); if(dom.gsSourceType) dom.gsSourceType.value='manual'; if(dom.gsSubjectStatus) dom.gsSubjectStatus.value='active'; if(dom.gsSubjectOrder) dom.gsSubjectOrder.value=state.subjects.length+1; renderTermChecks(null); }
  function renderSubjectSetup(){ if(dom.gsSubjectPicker){ dom.gsSubjectPicker.innerHTML=state.subjects.slice().sort((a,b)=>a.order-b.order).map(s=>`<option value="${esc(s.id)}">${s.order}. ${esc(s.name)}${s.archived?' (Archived)':''}</option>`).join('')||'<option value="">No subjects</option>'; dom.gsSubjectPicker.value=state.selectedSubjectId||''; } const s=state.subjects.find(x=>x.id===state.selectedSubjectId); if(s){ ensureSubjectVisibility(s); if(dom.gsSubjectName) dom.gsSubjectName.value=s.name||''; if(dom.gsTeacherName) dom.gsTeacherName.value=s.teacher||''; if(dom.gsSourceType) dom.gsSourceType.value=s.sourceType||'manual'; if(dom.gsLinkedRecord) dom.gsLinkedRecord.value=s.linkedRecord||''; if(dom.gsLinkedColumn) dom.gsLinkedColumn.value=s.linkedColumn||''; if(dom.gsSubjectStatus) dom.gsSubjectStatus.value=s.archived?'archived':'active'; if(dom.gsSubjectOrder) dom.gsSubjectOrder.value=s.order||''; renderTermChecks(s); } else blankSubjectForm(); if(dom.gsSubjectList){ const lm=labelMap(); dom.gsSubjectList.innerHTML=state.subjects.slice().sort((a,b)=>a.order-b.order).map(s=>{ensureSubjectVisibility(s); const vis=Q_KEYS.filter(q=>s.termVisibility[q]!==false).map(q=>lm[q]||q.toUpperCase()).join(', '); return `<div class="ctm-gs-subject-item ${s.id===state.selectedSubjectId?'active':''} ${s.archived?'archived':''}" data-subject-id="${esc(s.id)}"><div class="ctm-gs-nowrap ctm-gs-strong" title="${esc(s.name)}">${s.order}. ${esc(s.name)} ${s.sourceType==='linked'?'🔗':''}</div><div class="ctm-gs-mini ctm-gs-nowrap" title="${esc(s.teacher)}">${esc(s.teacher||'No teacher')}</div><div class="ctm-gs-mini">${s.archived?'Archived':'Active'} • ${s.sourceType==='linked'?'Linked to Class Record':'Manual'} • Show: ${esc(vis||'none')}</div></div>`;}).join('');} }
  function switchTab(tab){ state.activeTab=tab; document.querySelectorAll('#gradeSheetModal .ctm-gs-tab').forEach(b=>b.classList.toggle('active',b.dataset.gsTab===tab)); ['overview','learner','subjects'].forEach(t=>{ const el=$id('gsPanel'+t.charAt(0).toUpperCase()+t.slice(1)); if(el) el.classList.toggle('active',t===tab); }); if(dom.gsAcademicStructureField) dom.gsAcademicStructureField.style.display=tab==='subjects'?'flex':'none'; scheduleStickyAdjust(); }
  function selectLearner(id){ if(!id) return; state.selectedLearnerId=id; render(); schedulePersist(); }
  function updateLearnerNavButtons(){ const i=state.roster.findIndex(l=>l.learnerId===state.selectedLearnerId), n=state.roster.length; const atStart=!n||i<=0, atEnd=!n||i>=n-1; if(dom.gsBtnFirstLearner) dom.gsBtnFirstLearner.disabled=atStart; if(dom.gsBtnPrevLearner) dom.gsBtnPrevLearner.disabled=atStart; if(dom.gsBtnNextLearner) dom.gsBtnNextLearner.disabled=atEnd; if(dom.gsBtnLastLearner) dom.gsBtnLastLearner.disabled=atEnd; }
  function jumpLearner(d){ const i=state.roster.findIndex(l=>l.learnerId===state.selectedLearnerId), ni=Math.max(0,Math.min(state.roster.length-1,(i<0?0:i)+d)); if(state.roster[ni]) selectLearner(state.roster[ni].learnerId); }
  function jumpLearnerToEdge(edge){ if(!state.roster.length) return; const l=edge==='last'?state.roster[state.roster.length-1]:state.roster[0]; if(l) selectLearner(l.learnerId); }
  function setGradeState(lid,sid,q,val){ if(!lid||!sid||!q||!Q_KEYS.includes(q)) return; const s=state.subjects.find(x=>x.id===sid); if(s&&s.sourceType==='linked') return; const v=toWholeGrade(val); state.grades[lid]=state.grades[lid]||{}; state.grades[lid][sid]=state.grades[lid][sid]||{}; if(v==null) delete state.grades[lid][sid][q]; else state.grades[lid][sid][q]=v; }
  function saveGrade(sid,q,val){ const lid=state.selectedLearnerId; setGradeState(lid,sid,q,val); updateComputed(lid,sid,q); schedulePersist(); }
  function addSubject(){ const s=defaultSubject(); state.subjects.push(s); state.selectedSubjectId=s.id; ensureDataShape(); render(); schedulePersist(); switchTab('subjects'); }
  function captureSubjectFormIfDirty(){
    const s=state.subjects.find(x=>x.id===state.selectedSubjectId);
    if(!s || !dom.gsSubjectName) return false;
    ensureSubjectVisibility(s);
    let changed=false;
    const assign=(prop,val)=>{ if(s[prop]!==val){ s[prop]=val; changed=true; } };
    assign('name', text(dom.gsSubjectName&&dom.gsSubjectName.value)||s.name||`Subject ${s.order||state.subjects.length}`);
    assign('teacher', text(dom.gsTeacherName&&dom.gsTeacherName.value));
    assign('sourceType', (dom.gsSourceType&&dom.gsSourceType.value)==='linked'?'linked':'manual');
    assign('linkedRecord', text(dom.gsLinkedRecord&&dom.gsLinkedRecord.value));
    assign('linkedColumn', text(dom.gsLinkedColumn&&dom.gsLinkedColumn.value));
    assign('archived', (dom.gsSubjectStatus&&dom.gsSubjectStatus.value)==='archived');
    assign('order', toWholeGrade(dom.gsSubjectOrder&&dom.gsSubjectOrder.value)||s.order||state.subjects.length);
    if(dom.gsTermVisibility) dom.gsTermVisibility.querySelectorAll('[data-gs-termvis]').forEach(cb=>{
      const q=cb.dataset.gsTermvis;
      const v=!!cb.checked;
      if(s.termVisibility[q]!==v){ s.termVisibility[q]=v; changed=true; }
    });
    if(changed) ensureDataShape();
    return changed;
  }
  function saveSubject(){ let s=state.subjects.find(x=>x.id===state.selectedSubjectId); if(!s){s=defaultSubject(); state.subjects.push(s); state.selectedSubjectId=s.id;} ensureSubjectVisibility(s); s.name=text(dom.gsSubjectName&&dom.gsSubjectName.value)||`Subject ${s.order||state.subjects.length}`; s.teacher=text(dom.gsTeacherName&&dom.gsTeacherName.value); s.sourceType=(dom.gsSourceType&&dom.gsSourceType.value)==='linked'?'linked':'manual'; s.linkedRecord=text(dom.gsLinkedRecord&&dom.gsLinkedRecord.value); s.linkedColumn=text(dom.gsLinkedColumn&&dom.gsLinkedColumn.value); s.archived=(dom.gsSubjectStatus&&dom.gsSubjectStatus.value)==='archived'; s.order=toWholeGrade(dom.gsSubjectOrder&&dom.gsSubjectOrder.value)||s.order||state.subjects.length; if(dom.gsTermVisibility) dom.gsTermVisibility.querySelectorAll('[data-gs-termvis]').forEach(cb=>s.termVisibility[cb.dataset.gsTermvis]=!!cb.checked); ensureDataShape(); syncLinkedGrades({subjectId:s.id,silent:false}); render(); schedulePersist(); }
  function archiveSubject(){ const s=state.subjects.find(x=>x.id===state.selectedSubjectId); if(!s) return; const isArchived=!!s.archived; const msg=isArchived?'Restore this subject to Active status?':'Archive this subject? It will be hidden when Subject Visibility is set to Active subjects only. Existing grades will be kept.'; if(!confirm(msg)) return; s.archived=!isArchived; ensureDataShape(); render(); schedulePersist(); }
  function deleteSubjectPermanently(){ const s=state.subjects.find(x=>x.id===state.selectedSubjectId); if(!s) return; const subjectName=text(s.name)||'this subject'; const msg=`Permanently delete "${subjectName}" and all grades under this subject? This cannot be undone.`; if(!confirm(msg)) return; const msg2=`FINAL CONFIRMATION: Delete "${subjectName}" permanently?`; if(!confirm(msg2)) return; state.subjects=state.subjects.filter(x=>x.id!==s.id); Object.values(state.grades).forEach(r=>{ if(r&&typeof r==='object') delete r[s.id]; }); state.selectedSubjectId=state.subjects[0]&&state.subjects[0].id||''; ensureDataShape(); render(); schedulePersist(); }
  function moveSubject(d){ const list=state.subjects.sort((a,b)=>a.order-b.order), i=list.findIndex(s=>s.id===state.selectedSubjectId), j=i+d; if(i<0||j<0||j>=list.length) return; const t=list[i].order; list[i].order=list[j].order; list[j].order=t; ensureDataShape(); render(); schedulePersist(); }
  function bindLearnerSwipe(){
    const panel=$id('gsPanelLearner');
    const card=panel&&panel.querySelector('.ctm-gs-card');
    if(!card||card.dataset.gsSwipeBound==='1') return;
    card.dataset.gsSwipeBound='1';
    let swipe=null;
    const isInteractive=el=>!!(el&&el.closest&&el.closest('input,select,textarea,button,label,[contenteditable="true"],.ctm-gs-actions'));
    card.addEventListener('pointerdown',ev=>{
      if(state.activeTab!=='learner') return;
      if(ev.pointerType==='mouse'&&ev.button!==0) return;
      if(isInteractive(ev.target)) return;
      swipe={x:ev.clientX,y:ev.clientY,t:Date.now(),active:true};
    },{passive:true});
    card.addEventListener('pointermove',ev=>{
      if(!swipe||!swipe.active) return;
      const dx=ev.clientX-swipe.x, dy=ev.clientY-swipe.y;
      if(Math.abs(dx)>12&&Math.abs(dx)>Math.abs(dy)*1.25){
        ev.preventDefault();
      }
    },{passive:false});
    card.addEventListener('pointerup',ev=>{
      if(!swipe||!swipe.active) return;
      const dx=ev.clientX-swipe.x, dy=ev.clientY-swipe.y, elapsed=Date.now()-swipe.t;
      swipe=null;
      if(elapsed>1200) return;
      if(Math.abs(dx)>=60&&Math.abs(dx)>Math.abs(dy)*1.5){
        if(dx<0) jumpLearner(1);
        else jumpLearner(-1);
      }
    },{passive:true});
    ['pointercancel','lostpointercapture'].forEach(evt=>card.addEventListener(evt,()=>{swipe=null;},{passive:true}));
  }
  function bindUi(){ const modal=$id('gradeSheetModal'); if(!modal||modal.dataset.gsBound==='1') return; modal.dataset.gsBound='1'; bindLearnerSwipe(); dom.gsBtnClose&&dom.gsBtnClose.addEventListener('click',close); modal.addEventListener('click',e=>{ const tab=e.target.closest('.ctm-gs-tab'); if(tab) switchTab(tab.dataset.gsTab); const act=e.target.closest('[data-gs-action]'); if(act){ const id=act.dataset.subjectId; if(id) state.selectedSubjectId=id; const a=act.dataset.gsAction; if(a==='add') addSubject(); if(a==='left') moveSubject(-1); if(a==='right') moveSubject(1); if(a==='archive') archiveSubject(); if(a==='delete') deleteSubjectPermanently(); return; } const tr=e.target.closest('tbody tr[data-learner-id]'); if(tr){ state.selectedLearnerId=tr.dataset.learnerId; if(e.target.matches('[data-period]')){ renderLearnerPicker(); renderLearnerCard(); switchTab('learner'); setTimeout(()=>{ const inp=modal.querySelector(`[data-gs-grade-input][data-subject-id="${CSS.escape(e.target.dataset.subjectId)}"][data-period="${CSS.escape(e.target.dataset.period)}"]`); if(inp) inp.focus(); },0); } else selectLearner(tr.dataset.learnerId); } const item=e.target.closest('.ctm-gs-subject-item'); if(item){ state.selectedSubjectId=item.dataset.subjectId; renderSubjectSetup(); } }); modal.addEventListener('input',e=>{ const inp=e.target.closest('[data-gs-grade-input]'); if(inp){ if(inp.readOnly) return; const old=inp.value, clean=String(old).replace(/\D/g,'').slice(0,3); const final=clean===''?'':String(Math.max(0,Math.min(100,Number(clean)))); if(old!==final){ inp.value=final; try{inp.setSelectionRange(final.length,final.length)}catch(_){}} setGradeState(state.selectedLearnerId,inp.dataset.subjectId,inp.dataset.period,inp.value); updateComputed(state.selectedLearnerId,inp.dataset.subjectId,inp.dataset.period); schedulePersist(); } }); modal.addEventListener('blur',e=>{ const inp=e.target.closest&&e.target.closest('[data-gs-grade-input]'); if(inp&&!inp.readOnly){ const v=toWholeGrade(inp.value); inp.value=v==null?'':v; saveGrade(inp.dataset.subjectId,inp.dataset.period,inp.value); } },true); dom.gsAcademicStructure&&dom.gsAcademicStructure.addEventListener('change',e=>{ state.academicStructure=e.target.value; render(); schedulePersist(); }); dom.gsShowArchived&&dom.gsShowArchived.addEventListener('change',e=>{ state.showArchived=e.target.value; render(); schedulePersist(); }); dom.gsLearnerPicker&&dom.gsLearnerPicker.addEventListener('change',e=>selectLearner(e.target.value)); dom.gsBtnFirstLearner&&dom.gsBtnFirstLearner.addEventListener('click',()=>jumpLearnerToEdge('first')); dom.gsBtnPrevLearner&&dom.gsBtnPrevLearner.addEventListener('click',()=>jumpLearner(-1)); dom.gsBtnNextLearner&&dom.gsBtnNextLearner.addEventListener('click',()=>jumpLearner(1)); dom.gsBtnLastLearner&&dom.gsBtnLastLearner.addEventListener('click',()=>jumpLearnerToEdge('last')); dom.gsBtnRefreshRoster&&dom.gsBtnRefreshRoster.addEventListener('click',()=>{state.roster=readHostRoster();ensureDataShape();syncLinkedGrades({silent:false});render();schedulePersist();}); dom.gsBtnClearGrades&&dom.gsBtnClearGrades.addEventListener('click',()=>{if(confirm('Clear all Grade Sheet grades for this class? Subjects will remain.')){state.grades={};ensureDataShape();render();schedulePersist();}}); dom.gsSubjectPicker&&dom.gsSubjectPicker.addEventListener('change',e=>{state.selectedSubjectId=e.target.value;renderSubjectSetup();}); dom.gsBtnAddSubject&&dom.gsBtnAddSubject.addEventListener('click',addSubject); dom.gsBtnSaveSubject&&dom.gsBtnSaveSubject.addEventListener('click',saveSubject); dom.gsBtnArchiveSubject&&dom.gsBtnArchiveSubject.addEventListener('click',archiveSubject); dom.gsBtnDeleteSubject&&dom.gsBtnDeleteSubject.addEventListener('click',deleteSubjectPermanently); dom.gsBtnMoveLeft&&dom.gsBtnMoveLeft.addEventListener('click',()=>moveSubject(-1)); dom.gsBtnMoveRight&&dom.gsBtnMoveRight.addEventListener('click',()=>moveSubject(1)); document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&modal.style.display!=='none') close(); }); }
  async function open(){ await ensureInjected(); if(!load()){ alert('Please load a class first before opening Grade Sheet.'); return; } render(); const modal=$id('gradeSheetModal'); if(modal){ modal.style.display='block'; modal.setAttribute('aria-hidden','false'); try{modal.inert=false;}catch(_){} scheduleStickyAdjust();} }
  function close(){ const modal=$id('gradeSheetModal'); clearTimeout(state.saveTimer); captureSubjectFormIfDirty(); persist(); if(modal){ if(window.CTMModalA11y&&typeof window.CTMModalA11y.prepareForHide==='function') window.CTMModalA11y.prepareForHide(modal); modal.style.display='none'; modal.setAttribute('aria-hidden','true'); try{modal.inert=true;}catch(_){}} }
  function bindGradeSheetButtonFallback(){ const btn=$id('btnOpenGradeSheet'); if(!btn||btn.dataset.gsFallbackBound==='1') return; if(window.CTMKGradeSheet&&typeof window.CTMKGradeSheet.open==='function') return; btn.dataset.gsFallbackBound='1'; btn.addEventListener('click',open); }
  function init(){ /* Grade Sheet routing is owned by kGradeSheet.js when present. Keep a safe fallback for builds that include only the regular Grade Sheet module. */ setTimeout(bindGradeSheetButtonFallback,0); if(!window.__CTMGradeSheetFlushBound){ window.__CTMGradeSheetFlushBound=true; window.addEventListener('beforeunload',()=>{clearTimeout(state.saveTimer);captureSubjectFormIfDirty();persist();}); document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='hidden'){clearTimeout(state.saveTimer);captureSubjectFormIfDirty();persist();} }); } }
  window.CTMGradeSheet={init,open,close,refresh(){if(load()){syncLinkedGrades({silent:true});render();}},syncLinkedGrades,_debugSnapshot:()=>snapshot(),_debugState:state,toWholeGrade,averageWhole,computeCompetitionRanks};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();