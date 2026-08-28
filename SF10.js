/* ClassTapMark SF10 - local folder explorer and Excel working-copy manager */
(function () {
  'use strict';

  const VERSION = '4.5.1-folder-reminder-fix';
  const JSZIP_URL = 'libs/jszip.min.js';
  const SETUP_ZIP_URL = 'SF10_Folder_Setup.zip';
  const SETUP_ROOT_NAME = 'SF10';
  const LOCATION_REMINDER_KEY = 'ctmSf10LastLocation';
  const MAX_SETUP_FILES = 200;
  const MAX_SETUP_BYTES = 150 * 1024 * 1024;
  const FOLDERS = ['_Template', 'SF10_Female', 'SF10_Male'];
  const S = { root: null, dirs: null, verified: false, rows: [], templateFiles: [], missingTemplates: [], active: '_Template', items: [], selectedKey: '' };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

  function inject() {
    document.getElementById('ctmSf10Modal')?.remove();
    document.getElementById('ctmSf10ManagerStyle')?.remove();
    const launch = [...document.querySelectorAll('button')].find(b => /^SF\s*10$/i.test(b.textContent.trim()));
    if (launch) {
      launch.id = 'btnOpenSF10'; launch.disabled = false; launch.removeAttribute('disabled');
      launch.setAttribute('aria-disabled', 'false'); launch.title = "Learner's Permanent Academic Record";
    }
    const style = document.createElement('style');
    style.id = 'ctmSf10ManagerStyle';
    style.textContent = `
      #ctmSf10Modal{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;height:100dvh!important;background:#0008;z-index:100000;display:none;padding:0!important;margin:0!important;overflow:hidden!important;box-sizing:border-box}
      #ctmSf10Panel{position:relative!important;box-sizing:border-box!important;width:100vw!important;max-width:100vw!important;height:100vh!important;height:100dvh!important;min-height:100vh!important;min-height:100dvh!important;max-height:100vh!important;max-height:100dvh!important;margin:0!important;background:var(--card,#fff);color:var(--text,#222);border-radius:0!important;padding:16px;box-shadow:none;display:flex;flex-direction:column;overflow:hidden}
      .sf10-head,.sf10-toolbar,.sf10-actions{display:flex;align-items:center;gap:8px}.sf10-head{justify-content:space-between;flex-wrap:wrap}.sf10-toolbar{margin:10px 0;flex-wrap:wrap}.sf10-toolbar>button{flex:0 0 auto}.sf10-status{padding:8px 10px;border-radius:8px;background:#eef2ff;white-space:normal;overflow-wrap:anywhere;line-height:1.35;flex:1 1 320px;min-width:180px}.sf10-note{background:#fff5cc;color:#5c4300;padding:9px;border-radius:8px;white-space:normal;overflow-wrap:anywhere;line-height:1.4}.sf10-note-summary{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.sf10-note-toggle{border:0!important;background:transparent!important;color:#6b4f00!important;padding:0!important;margin:0!important;min-height:0!important;font:inherit!important;font-weight:700!important;text-decoration:underline;cursor:pointer;box-shadow:none!important}.sf10-note-toggle:hover{color:#2f2400!important}.sf10-note-details{margin-top:6px}.sf10-note-details[hidden]{display:none!important}.sf10-location-reminder{margin:-5px 2px 8px;padding:0 2px;color:#667;font-size:.76rem;line-height:1.25;overflow-wrap:anywhere}
      .sf10-explorer{display:grid;grid-template-columns:230px minmax(0,1fr);border:1px solid #cbd3df;border-radius:10px;overflow:hidden;min-height:0;flex:1 1 auto}
      .sf10-tree{background:#f5f7fa;border-right:1px solid #cbd3df;padding:8px}.sf10-root{font-weight:700;padding:8px}.sf10-folder{display:block;width:100%;text-align:left;border:0;background:transparent;padding:9px 10px;border-radius:6px;cursor:pointer}.sf10-folder:hover,.sf10-folder.active{background:#dcecff}
      .sf10-main{min-width:0;min-height:0;display:flex;flex-direction:column}.sf10-path{padding:11px 14px;border-bottom:1px solid #d7dde7;font-weight:600}.sf10-search{margin:10px 12px;width:calc(100% - 24px);box-sizing:border-box}
      .sf10-list{overflow:auto;max-height:none;min-height:0;flex:1 1 auto;-webkit-overflow-scrolling:touch}.sf10-row{display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center;padding:9px 12px;border-top:1px solid #edf0f4;cursor:pointer;transition:background-color .15s ease,box-shadow .15s ease}.sf10-row:hover{background:#f4f8ff}.sf10-row:focus-visible{outline:3px solid #2563eb;outline-offset:-3px}.sf10-row.selected{background:#dcecff;box-shadow:inset 4px 0 0 #2563eb}.sf10-row.virtual{opacity:.7}.sf10-row.virtual.selected{opacity:1}.sf10-info{flex:1 1 230px;min-width:0}.sf10-name{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.sf10-small{font-size:.83rem;color:#667}.sf10-meta{display:flex;flex:0 0 auto;align-items:center;gap:16px;white-space:nowrap;font-size:.95rem}.sf10-size{min-width:72px}.sf10-modified{min-width:170px}.sf10-actions{flex:0 0 auto;justify-content:flex-start;flex-wrap:nowrap}.sf10-actions button{min-height:34px;white-space:nowrap}.sf10-empty{width:100%}.sf10-live{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}
      @media(max-width:780px){.sf10-explorer{grid-template-columns:1fr}.sf10-tree{border-right:0;border-bottom:1px solid #cbd3df}.sf10-info{flex-basis:100%}.sf10-meta{margin-right:auto}}
      @media(max-width:560px){.sf10-status{flex-basis:100%}.sf10-row{gap:10px 12px}.sf10-meta{gap:12px;font-size:.9rem}.sf10-size,.sf10-modified{min-width:auto}}
    `;
    document.head.appendChild(style);
    document.body.insertAdjacentHTML('beforeend', `
      <div id="ctmSf10Modal" role="dialog" aria-modal="true" aria-labelledby="ctmSf10Title"><div id="ctmSf10Panel">
        <div class="sf10-head"><h2 id="ctmSf10Title">SF10 File Explorer</h2><button id="ctmSf10Close">Close</button></div>
        <div class="sf10-note"><div class="sf10-note-summary"><span><strong>Important:</strong> Manage SF10 on a laptop with Microsoft Excel.</span><button id="ctmSf10SetupToggle" class="sf10-note-toggle" type="button" aria-expanded="false" aria-controls="ctmSf10SetupDetails">Show more...</button></div><div id="ctmSf10SetupDetails" class="sf10-note-details" hidden>Use ClassTapMark to manage SF10 by downloading the working copy to their respective folders overwrite and edit in Microsoft Excel. Mobile phones and tablets may not support direct folder access or all workbook features.</div></div>
        <div class="sf10-toolbar"><button class="primary" id="ctmSf10Pick">Select SF10 Location</button><button id="ctmSf10Install">Install SF10 Folder</button><button id="ctmSf10Refresh">Refresh</button><div id="ctmSf10Status" class="sf10-status">Folder Not Selected</div></div>
        <div id="ctmSf10LocationReminder" class="sf10-location-reminder"></div>
        <div class="sf10-explorer">
          <nav class="sf10-tree" aria-label="SF10 folders"><div class="sf10-root">📁 SF10</div>${FOLDERS.map(x => `<button class="sf10-folder" data-folder="${x}">📁 ${x}</button>`).join('')}</nav>
          <main class="sf10-main"><div id="ctmSf10Path" class="sf10-path">SF10 / _Template</div><input id="ctmSf10Search" class="sf10-search" type="search" placeholder="Search files or learners"><div id="ctmSf10List" class="sf10-list"></div></main>
        </div><div id="ctmSf10Live" class="sf10-live" aria-live="polite"></div>
      </div></div>`);
    bind(); setActive('_Template'); status(); renderLocationReminder();
  }

  function bind() {
    document.getElementById('btnOpenSF10')?.addEventListener('click', openManager);
    document.getElementById('ctmSf10Close').onclick = closeManager;
    document.getElementById('ctmSf10Pick').onclick = pickRoot;
    document.getElementById('ctmSf10Install').onclick = installFolderSetup;
    document.getElementById('ctmSf10Refresh').onclick = refresh;
    document.getElementById('ctmSf10Search').oninput = render;
    document.getElementById('ctmSf10SetupToggle').onclick = toggleRecommendedSetup;
    document.querySelectorAll('.sf10-folder').forEach(b => b.onclick = () => setActive(b.dataset.folder));
    window.addEventListener('ctm:roster-changed', refreshRows);
    window.addEventListener('rosterChanged', refreshRows);
    window.addEventListener('focus', () => { if (S.verified && document.getElementById('ctmSf10Modal')?.style.display === 'block') refreshActive(); });
  }

  function readLocationReminder(){
    try{return String(localStorage.getItem(LOCATION_REMINDER_KEY)||'').trim();}
    catch(e){console.warn('Could not read the SF10 location reminder:',e);return '';}
  }
  function saveLocationReminder(location){
    const value=String(location||'').trim(); if(!value)return;
    try{localStorage.setItem(LOCATION_REMINDER_KEY,value);}
    catch(e){console.warn('Could not save the SF10 location reminder:',e);}
    renderLocationReminder();
  }
  function renderLocationReminder(){
    const el=document.getElementById('ctmSf10LocationReminder'); if(!el)return;
    const location=readLocationReminder();
    el.textContent=location?'Last SF10 setup: '+location+' · Select its parent folder if it exists; install if not.':'No saved SF10 setup location · Select its parent folder if it exists; install if not.';
    el.title='Reminder only. Select the folder that contains SF10, such as Downloads or Documents.';
  }
  function toggleRecommendedSetup(){
    const button=document.getElementById('ctmSf10SetupToggle'), details=document.getElementById('ctmSf10SetupDetails');
    if(!button||!details)return;
    const expanded=button.getAttribute('aria-expanded')==='true';
    button.setAttribute('aria-expanded',String(!expanded));
    button.textContent=expanded?'Show more...':'Show less...';
    details.hidden=expanded;
  }
  function openManager() {
    if (!(window.currentClassId || window.CTMLoadedClassContext?.classId)) return alert('Select and Load Class first!');
    document.getElementById('ctmSf10Modal').style.display = 'block'; refreshRows(); status(); if (S.verified) refreshActive();
  }
  function closeManager(){ document.getElementById('ctmSf10Modal').style.display = 'none'; }
  function refreshRows(){
    const list = Array.isArray(window.currentStudents) ? window.currentStudents : [];
    S.rows = list.map((x,i) => ({ id:String(x.id ?? i), name:String(x.name || '').trim(), sex:String(x.sex || ''), lrn:getLrn(x) }));
    if (S.verified && /^SF10_/.test(S.active)) refreshActive(); else render();
  }
  function getLrn(x){ return String(x.lrn || x.LRN || x.profile?.lrn || x.studentProfile?.lrn || '').trim(); }
  function canonSex(v){ return /^f/i.test(v) ? 'Female' : /^m/i.test(v) ? 'Male' : ''; }
  function cleanName(name,lrn,id){ let r=String(name||'').replace(/[<>:"/\\|?*\x00-\x1F\x7F]/g,' ').replace(/\s+/g,' ').replace(/[ .]+$/g,'').trim(); if(!r)r='LEARNER '+String(lrn||id||'UNKNOWN'); return r.slice(0,180).replace(/[ .]+$/g,''); }
  function learnerFileName(row){ let base=cleanName(row.name,row.lrn,row.id); if(S.rows.filter(x=>cleanName(x.name,x.lrn,x.id).toLowerCase()===base.toLowerCase()).length>1) base+=' - '+(row.lrn||('ID-'+row.id)); return cleanName(base,row.lrn,row.id)+'.xlsx'; }
  function rowById(id){ return S.rows.find(x => x.id === id); }

  function setBusy(busy){
    ['ctmSf10Pick','ctmSf10Install','ctmSf10Refresh'].forEach(id=>{ const el=document.getElementById(id); if(el)el.disabled=busy; });
  }
  function loadJSZip(){
    if(window.JSZip)return Promise.resolve(window.JSZip);
    if(window.__ctmSf10JSZipPromise)return window.__ctmSf10JSZipPromise;
    window.__ctmSf10JSZipPromise=new Promise((resolve,reject)=>{
      const existing=document.querySelector('script[data-ctm-sf10-jszip]');
      const script=existing||document.createElement('script');
      const done=()=>window.JSZip?resolve(window.JSZip):reject(new Error('JSZip loaded but window.JSZip is unavailable.'));
      script.addEventListener('load',done,{once:true});
      script.addEventListener('error',()=>reject(new Error('Could not load '+JSZIP_URL+'.')),{once:true});
      if(!existing){ script.src=JSZIP_URL; script.async=true; script.dataset.ctmSf10Jszip='1'; document.head.appendChild(script); }
    }).catch(error=>{ window.__ctmSf10JSZipPromise=null; throw error; });
    return window.__ctmSf10JSZipPromise;
  }
  function safeSetupPath(raw){
    let path=String(raw||'').replace(/\\/g,'/').replace(/^\.\//,'').replace(/\/+$/,'');
    if(!path||path.includes('\0')||path.startsWith('/')||/^[A-Za-z]:/.test(path))return '';
    const parts=path.split('/');
    if(parts.some(part=>!part||part==='.'||part==='..'))return '';
    if(/^SF10(?:_Folder_Setup)?$/i.test(parts[0]))parts.shift();
    if(!parts.length)return '';
    if(!FOLDERS.includes(parts[0]))return '';
    if(parts.some(part=>/[<>:"|?*\x00-\x1F\x7F]/.test(part)))return '';
    return parts.join('/');
  }
  async function entryExists(dir,name){
    try{ await dir.getFileHandle(name); return true; }catch(e){ if(e.name!=='NotFoundError'&&e.name!=='TypeMismatchError')throw e; }
    try{ await dir.getDirectoryHandle(name); return true; }catch(e){ if(e.name==='NotFoundError'||e.name==='TypeMismatchError')return false; throw e; }
  }
  async function directoryFor(root,parts,create){
    let dir=root;
    for(const part of parts)dir=await dir.getDirectoryHandle(part,{create});
    return dir;
  }
  async function rollbackSetup(root,createdFiles){
    for(let i=createdFiles.length-1;i>=0;i--){
      const parts=createdFiles[i].split('/'), name=parts.pop();
      try{ const dir=await directoryFor(root,parts,false); await dir.removeEntry(name); }catch(_){}
    }
  }
  async function installFolderSetup(){
    if(!window.showDirectoryPicker)return status('Folder installation is unavailable. Use current desktop Chrome or Edge.');
    const button=document.getElementById('ctmSf10Install');
    const createdFiles=[];
    let sf10Root=null;
    try{
      setBusy(true); status('Loading the SF10 setup tools...');
      const JSZip=await loadJSZip();
      const response=await fetch(SETUP_ZIP_URL,{cache:'no-store'});
      if(!response.ok)throw new Error('Could not load '+SETUP_ZIP_URL+' (HTTP '+response.status+').');
      const zipBuffer=await response.arrayBuffer();
      if(!zipBuffer.byteLength)throw new Error('The SF10 setup ZIP is empty.');
      status('Validating the SF10 setup package...');
      const zip=await JSZip.loadAsync(zipBuffer,{checkCRC32:true,createFolders:false});
      const entries=[];
      const seen=new Set();
      for(const entry of Object.values(zip.files)){
        if(entry.dir)continue;
        const path=safeSetupPath(entry.name);
        if(!path)throw new Error('Unsafe or unexpected ZIP entry: '+entry.name);
        const key=path.toLowerCase();
        if(seen.has(key))throw new Error('Duplicate ZIP entry: '+path);
        seen.add(key); entries.push({entry,path});
      }
      if(!entries.length)throw new Error('The SF10 setup ZIP contains no files.');
      if(entries.length>MAX_SETUP_FILES)throw new Error('The SF10 setup ZIP contains too many files.');
      for(const required of ['_Template/SF10_Female.xlsx','_Template/SF10_Male.xlsx']){
        if(!seen.has(required.toLowerCase()))throw new Error('Required template is missing: '+required);
      }
      const parent=await showDirectoryPicker({mode:'readwrite',id:'ctm-sf10-install-parent'});
      const permission=await parent.queryPermission?.({mode:'readwrite'});
      if(permission!=='granted'&&(await parent.requestPermission?.({mode:'readwrite'}))!=='granted')throw new Error('Write permission was not granted.');
      sf10Root=await parent.getDirectoryHandle(SETUP_ROOT_NAME,{create:true});
      for(const folder of FOLDERS)await sf10Root.getDirectoryHandle(folder,{create:true});
      for(const item of entries){
        const parts=item.path.split('/'), name=parts.pop(), dir=await directoryFor(sf10Root,parts,true);
        if(await entryExists(dir,name))throw new Error('Installation stopped because this file already exists: SF10/'+item.path+'. No existing file was overwritten.');
      }
      let total=0,completed=0;
      for(const item of entries){
        status('Extracting SF10 setup: '+(++completed)+' of '+entries.length+'...');
        const data=await item.entry.async('uint8array');
        total+=data.byteLength;
        if(total>MAX_SETUP_BYTES)throw new Error('The extracted setup exceeds the safety size limit.');
        if(!data.byteLength)throw new Error('The setup contains an empty file: '+item.path);
        const parts=item.path.split('/'), name=parts.pop(), dir=await directoryFor(sf10Root,parts,true);
        const handle=await dir.getFileHandle(name,{create:true});
        const writable=await handle.createWritable();
        try{ await writable.write(data); await writable.close(); }
        catch(e){ try{await writable.abort();}catch(_){} throw e; }
        const saved=await handle.getFile();
        if(saved.size!==data.byteLength||saved.size===0)throw new Error('File verification failed after writing: '+item.path);
        createdFiles.push(item.path);
      }
      S.root=sf10Root; await verify();
      if(!S.verified)throw new Error('The extracted SF10 folder did not pass verification.');
      const installedLocation=parent.name+'/'+SETUP_ROOT_NAME;
      saveLocationReminder(installedLocation);
      announce('SF10 folder installed and verified: '+installedLocation);
      alert('SF10 folder setup was installed successfully.\n\nLocation: '+parent.name+'/'+SETUP_ROOT_NAME+'\nFiles installed: '+entries.length);
    }catch(e){
      if(sf10Root&&createdFiles.length)await rollbackSetup(sf10Root,createdFiles);
      if(e?.name==='AbortError')status('SF10 folder installation was cancelled.');
      else{ console.error('SF10 setup installation failed:',e); status('SF10 installation failed: '+(e?.message||String(e))); alert('SF10 folder setup could not be installed.\n\n'+(e?.message||String(e))); }
    }finally{ setBusy(false); if(button)button.blur(); }
  }

  async function pickRoot(){
    if(!window.showDirectoryPicker)return status('Direct folder access is unavailable. Use current desktop Chrome or Edge.');
    const previousRoot=S.root, previousVerified=S.verified;
    try{
      const parent=await showDirectoryPicker({mode:'readwrite',id:'ctm-sf10-root-parent'});
      const candidate=await parent.getDirectoryHandle(SETUP_ROOT_NAME,{create:false});
      await candidate.getDirectoryHandle('_Template',{create:false});
      await candidate.getDirectoryHandle('SF10_Female',{create:false});
      await candidate.getDirectoryHandle('SF10_Male',{create:false});
      S.root=candidate;
      await verify();
      if(!S.verified)throw new Error('The SF10 folder is incomplete or could not be verified.');
      const location=parent.name+'/'+SETUP_ROOT_NAME;
      saveLocationReminder(location);
      announce('SF10 folder selected and verified: '+location);
    }catch(e){
      if(e?.name==='AbortError')return;
      S.root=previousRoot;
      if(previousRoot&&previousVerified)await verify();
      else{S.verified=false;S.dirs=null;S.items=[];render();}
      const reason=e?.name==='NotFoundError'?'No SF10 folder with the required subfolders was found in the selected location.':(e?.message||String(e));
      status('SF10 location was not changed: '+reason);
    }
  }
  async function getDirectory(parent,name,create=false){ try{return await parent.getDirectoryHandle(name,{create});}catch(_){throw new Error('Missing folder: '+name);} }
  async function ensurePermission(){ if(!S.root)return false; const q=await S.root.queryPermission?.({mode:'readwrite'}); if(q==='granted')return true; return (await S.root.requestPermission?.({mode:'readwrite'}))==='granted'; }

  async function verify(){
    S.verified=false; S.dirs=null; S.templateFiles=[]; S.missingTemplates=[];
    try{
      const template=await getDirectory(S.root,'_Template'), Female=await getDirectory(S.root,'SF10_Female'), Male=await getDirectory(S.root,'SF10_Male');
      S.dirs={_Template:template,SF10_Female:Female,SF10_Male:Male,Female,Male,template};
      for await(const [name,handle] of template.entries()) if(handle.kind==='file'&&/\.xlsx$/i.test(name)){ const file=await handle.getFile(); S.templateFiles.push({name,handle,size:file.size}); }
      S.templateFiles.sort((a,b)=>a.name.localeCompare(b.name));
      S.missingTemplates=['Female','Male'].filter(sex=>!selectedTemplate(sex));
      S.verified=true; status(); await refreshActive();
    }catch(e){ status('Wrong or incomplete SF10 root folder.\n'+e.message+'\nNothing was replaced or renamed.'); S.items=[]; render(); }
  }
  function selectedTemplate(sex){ const expected=('SF10_'+sex+'.xlsx').toLowerCase(); const item=S.templateFiles.find(x=>x.name.toLowerCase()===expected&&x.size>0); return item?.handle||null; }
  function setActive(folder){ S.active=folder; document.querySelectorAll('.sf10-folder').forEach(b=>b.classList.toggle('active',b.dataset.folder===folder)); const p=document.getElementById('ctmSf10Path'); if(p)p.textContent='SF10 / '+folder; if(S.verified)refreshActive(); else render(); }
  async function refresh(){ refreshRows(); if(S.root)await verify(); }

  async function refreshActive(){
    if(!S.verified)return render();
    const dir=S.dirs[S.active], items=[];
    for await(const [name,handle] of dir.entries()) if(handle.kind==='file'&&/\.xlsx$/i.test(name)){ const f=await handle.getFile(); items.push({kind:'file',name,handle,size:f.size,modified:f.lastModified}); }
    items.sort((a,b)=>a.name.localeCompare(b.name));
    if(S.active==='SF10_Female'||S.active==='SF10_Male'){
      const sex=S.active==='SF10_Female'?'Female':'Male', existing=new Set(items.map(x=>x.name.toLowerCase()));
      S.rows.filter(r=>canonSex(r.sex)===sex).forEach(r=>{ const name=learnerFileName(r); if(!existing.has(name.toLowerCase()))items.push({kind:'virtual',name,row:r,size:0,modified:0}); });
      items.sort((a,b)=>a.name.localeCompare(b.name));
    }
    S.items=items; render();
  }
  function formatSize(n){ if(!n)return ''; if(n<1024)return n+' B'; if(n<1048576)return (n/1024).toFixed(1)+' KB'; return (n/1048576).toFixed(1)+' MB'; }
  function render(){
    const box=document.getElementById('ctmSf10List'); if(!box)return;
    const q=(document.getElementById('ctmSf10Search')?.value||'').toLowerCase(); const list=S.items.filter(x=>x.name.toLowerCase().includes(q));
    const rows=list.map((x,i)=>{
      const template=S.active==='_Template', lower=x.name.toLowerCase(), label=template?(lower==='sf10_female.xlsx'?'Female template':lower==='sf10_male.xlsx'?'Male template':lower==='read me.xlsx'?'SF10 folder instructions':'Official/reference workbook'):'Learner SF10';
      const missingSex=x.kind==='virtual'&&!selectedTemplate(canonSex(x.row?.sex));
      const actions=x.kind==='virtual'?(missingSex?`<button disabled title="Required template is missing from _Template">Template missing</button>`:`<button data-create-index="${i}">Create SF10</button>`):`<button data-download-index="${i}">Download / Open in Excel</button>`;
      const key=S.active+'::'+x.kind+'::'+x.name.toLowerCase();
      const selected=S.selectedKey===key;
      return `<div class="sf10-row ${x.kind==='virtual'?'virtual ':''}${selected?'selected':''}" data-select-index="${i}" role="option" tabindex="0" aria-selected="${selected}"><div class="sf10-info"><div class="sf10-name">📗 ${esc(x.name)}</div><div class="sf10-small">${esc(label)}${x.kind==='virtual'?' · Not yet created':''}</div></div><div class="sf10-meta"><span class="sf10-size">${esc(formatSize(x.size))}</span><span class="sf10-modified">${x.modified?esc(new Date(x.modified).toLocaleString()):''}</span></div><div class="sf10-actions">${actions}</div></div>`;
    }).join('');
    box.innerHTML=rows||'<div class="sf10-row"><div class="sf10-empty">No matching Excel files.</div></div>';
    const filtered=list;
    box.querySelectorAll('[data-select-index]').forEach(row=>{
      const select=()=>selectItem(filtered[+row.dataset.selectIndex],row);
      row.onclick=e=>{ if(e.target.closest('button'))return; select(); };
      row.onkeydown=e=>{ if((e.key==='Enter'||e.key===' ')&&!e.target.closest('button')){e.preventDefault();select();} };
    });
    box.querySelectorAll('[data-download-index]').forEach(b=>b.onclick=e=>{e.stopPropagation();downloadItem(filtered[+b.dataset.downloadIndex]);});
    box.querySelectorAll('[data-create-index]').forEach(b=>b.onclick=e=>{e.stopPropagation();createOnly(filtered[+b.dataset.createIndex].row);});
    status();
  }

  function selectItem(item,rowEl){
    if(!item||!rowEl)return;
    S.selectedKey=S.active+'::'+item.kind+'::'+item.name.toLowerCase();
    document.querySelectorAll('#ctmSf10List .sf10-row[data-select-index]').forEach(row=>{
      const selected=row===rowEl;
      row.classList.toggle('selected',selected);
      row.setAttribute('aria-selected',String(selected));
    });
    announce('Selected: '+item.name);
  }

  async function ensureLearnerFile(row){
    if(!S.verified)throw new Error('Select and verify the SF10 root folder first.');
    const sex=canonSex(row.sex); if(!sex)throw new Error('Learner sex must be Male or Female.');
    if(!await ensurePermission())throw new Error('Folder permission denied or read-only.');
    const dir=S.dirs[sex], name=learnerFileName(row);
    try{
      const existing=await dir.getFileHandle(name), file=await existing.getFile();
      if(file.size===0)throw new Error('The existing learner workbook is 0 bytes and is not a valid Excel file. Delete or replace it, restore '+('SF10_'+sex+'.xlsx')+' in _Template, then select Refresh.');
      return existing;
    }catch(e){
      if(e.name!=='NotFoundError')throw e;
    }
    const tpl=selectedTemplate(sex);
    if(!tpl)throw new Error('Required template SF10_'+sex+'.xlsx is missing or empty in _Template. No learner file was created.');
    const templateFile=await tpl.getFile();
    if(templateFile.size===0)throw new Error('Required template SF10_'+sex+'.xlsx is 0 bytes. No learner file was created.');
    const data=await templateFile.arrayBuffer();
    if(data.byteLength===0)throw new Error('Required template SF10_'+sex+'.xlsx is empty. No learner file was created.');
    let created=false, h=null;
    try{
      h=await dir.getFileHandle(name,{create:true}); created=true;
      const w=await h.createWritable(); await w.write(data); await w.close();
      const saved=await h.getFile();
      if(saved.size!==data.byteLength||saved.size===0)throw new Error('The learner workbook could not be written completely.');
      return h;
    }catch(e){
      if(created){ try{await dir.removeEntry(name);}catch(_){} }
      throw new Error(e.message+' No 0-byte learner file was kept.');
    }
  }
  async function createOnly(row){ try{await ensureLearnerFile(row);announce('SF10 created for '+row.name+'.');await refreshActive();}catch(e){alert('SF10 could not be created: '+e.message);} }
  async function downloadItem(item){ try{downloadFile(await item.handle.getFile(),item.name);announce('Working copy downloaded: '+item.name);}catch(e){alert('Workbook could not be downloaded: '+e.message);} }
  function downloadFile(file,name){const url=URL.createObjectURL(file),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);}

  function status(message){const el=document.getElementById('ctmSf10Status');if(!el)return; if(message){el.textContent=message;return;} if(!S.verified){el.textContent='Folder Not Selected';return;} const base='SF10 root verified: '+S.root.name+' · '+S.items.length+' item(s) in '+S.active; el.textContent=S.missingTemplates.length?base+' · Warning: missing '+S.missingTemplates.map(x=>'SF10_'+x+'.xlsx').join(' and ')+' in _Template (missing or 0 bytes). Existing files remain available; creation is disabled only for the affected template.':base;}
  function announce(message){const live=document.getElementById('ctmSf10Live');if(live)live.textContent=message;status(message);}

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',inject,{once:true});else inject();
  window.CTM_SF10={open:openManager,refresh,version:VERSION};
})();
