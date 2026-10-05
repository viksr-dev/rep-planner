let EX=[], EXBY={}, MUSCLES=[];
const DAYS=['mon','tue','wed','thu','fri','sat','sun'];
const DAY_NAMES={mon:'Mon',tue:'Tue',wed:'Wed',thu:'Thu',fri:'Fri',sat:'Sat',sun:'Sun'};
const MEASURES={reps:'reps',secs:'seconds',mins:'minutes'};
const uid4=()=>Math.random().toString(36).slice(2,10);
const ex=(name,sets,reps,weight,lib,measure='reps')=>({id:uid4(),name,sets,reps,weight,lib,measure});
const PLAN_VERSION=5;
const RESTART_WEEKS=4;
function buildPlan(){
  const chest={id:'chest',name:'Chest & triceps',exercises:[
    ex('Push-ups',3,15,0,'Pushups'),ex('Dumbbell bench press',4,10,20,'Dumbbell_Bench_Press'),ex('Incline dumbbell press',3,10,16,'Incline_Dumbbell_Press'),
    ex('Decline dumbbell flyes',3,12,10,'Decline_Dumbbell_Flyes'),ex('Dips',3,10,0,'Dips_-_Triceps_Version'),
    ex('Overhead dumbbell extension (seated)',3,12,12,'Standing_Dumbbell_Triceps_Extension'),ex('Lying dumbbell extension',3,12,8,'Lying_Dumbbell_Tricep_Extension')]};
  const back={id:'back',name:'Back, biceps & shoulders',exercises:[
    ex('One-arm dumbbell row',4,10,22,'One-Arm_Dumbbell_Row'),ex('Bent-over dumbbell row',3,10,16,'Bent_Over_Two-Dumbbell_Row'),
    ex('Dumbbell shoulder press',3,10,14,'Dumbbell_Shoulder_Press'),ex('Lateral raise',3,12,6,'Side_Lateral_Raise'),ex('Reverse flyes',3,12,6,'Reverse_Flyes'),
    ex('Preacher curl',3,10,20,'Preacher_Curl'),ex('Hammer curl',3,12,12,'Hammer_Curls')]};
  const legs={id:'legs',name:'Legs & core',exercises:[
    ex('Goblet squat',4,12,20,'Goblet_Squat'),ex('Dumbbell split squat',3,10,12,'Split_Squat_with_Dumbbells'),ex('Stiff-leg dumbbell deadlift',3,10,20,'Stiff-Legged_Dumbbell_Deadlift'),
    ex('Dumbbell step-up',3,10,10,'Dumbbell_Step_Ups'),ex('Dumbbell calf raise',3,15,16,'Standing_Dumbbell_Calf_Raise'),
    ex('Plank',3,45,0,'Plank','secs'),ex('Russian twist',3,20,0,'Russian_Twist')]};
  const cardio={id:'cardio',name:'Cardio',exercises:[
    ex('Run or brisk walk',1,20,0,'Trail_Running_Walking','mins'),ex('Jump rope',5,2,0,'Rope_Jumping','mins'),ex('Mountain climbers',4,30,0,'Mountain_Climbers','secs')]};
  const stretch={id:'stretch',name:'Stretch & mobility',exercises:[
    ex('Hamstring stretch',2,30,0,'Hamstring_Stretch','secs'),ex('Kneeling hip flexor stretch',2,30,0,'Kneeling_Hip_Flexor','secs'),ex('Quad stretch on all fours',2,30,0,'All_Fours_Quad_Stretch','secs'),
    ex('Shoulder stretch',2,30,0,'Shoulder_Stretch','secs'),ex('Calf stretch at the wall',2,30,0,'Calf_Stretch_Hands_Against_Wall','secs'),
    ex('Cat stretch',2,30,0,'Cat_Stretch','secs'),ex("Child's pose",2,45,0,'Childs_Pose','secs')]};
  return {templates:[chest,back,legs,cardio,stretch],week:{mon:null,tue:'chest',wed:null,thu:'back',fri:'cardio',sat:'legs',sun:null},goal:4};
}
function restartPlan(){
  const a={id:'r-full-a',name:'Full body A',exercises:[
    ex('Push-ups',2,8,0,'Pushups'),ex('Dumbbell bench press',2,10,12,'Dumbbell_Bench_Press'),ex('One-arm dumbbell row',2,10,12,'One-Arm_Dumbbell_Row'),
    ex('Goblet squat',2,10,12,'Goblet_Squat'),ex('Preacher curl',2,10,10,'Preacher_Curl'),ex('Plank',2,20,0,'Plank','secs')]};
  const b={id:'r-full-b',name:'Full body B',exercises:[
    ex('Incline dumbbell press',2,10,10,'Incline_Dumbbell_Press'),ex('Bent-over dumbbell row',2,10,10,'Bent_Over_Two-Dumbbell_Row'),ex('Dumbbell shoulder press',2,10,8,'Dumbbell_Shoulder_Press'),
    ex('Bench dips',2,8,0,'Bench_Dips'),ex('Bodyweight squat',2,12,0,'Bodyweight_Squat'),ex('Single-leg glute bridge',2,10,0,'Single_Leg_Glute_Bridge')]};
  const walk={id:'r-walk',name:'Walk & stretch',exercises:[
    ex('Brisk walk',1,20,0,'Trail_Running_Walking','mins'),ex('Hamstring stretch',2,30,0,'Hamstring_Stretch','secs'),ex('Kneeling hip flexor stretch',2,30,0,'Kneeling_Hip_Flexor','secs'),
    ex('Shoulder stretch',2,30,0,'Shoulder_Stretch','secs'),ex("Child's pose",2,30,0,'Childs_Pose','secs')]};
  return {templates:[a,b,walk],week:{mon:null,tue:'r-full-a',wed:null,thu:'r-full-b',fri:'r-walk',sat:'r-full-a',sun:null},goal:3};
}
// The original Push / Pull / Legs / Full body days, adapted to dumbbells and the preacher bench. Kept as extras for bonus weight days.
function extraTemplates(){
  return [
    {id:'x-push',name:'Extra: Push',extra:true,exercises:[
      ex('Dumbbell bench press',4,8,20,'Dumbbell_Bench_Press'),ex('Dumbbell shoulder press',3,10,14,'Dumbbell_Shoulder_Press'),
      ex('Incline dumbbell press',3,10,16,'Incline_Dumbbell_Press'),ex('Overhead dumbbell extension (seated)',3,12,12,'Standing_Dumbbell_Triceps_Extension')]},
    {id:'x-pull',name:'Extra: Pull',extra:true,exercises:[
      ex('Stiff-leg dumbbell deadlift',3,8,20,'Stiff-Legged_Dumbbell_Deadlift'),ex('One-arm dumbbell row',4,8,22,'One-Arm_Dumbbell_Row'),
      ex('Bent-over dumbbell row',3,10,16,'Bent_Over_Two-Dumbbell_Row'),ex('Preacher curl',3,12,15,'Preacher_Curl')]},
    {id:'x-legs',name:'Extra: Legs',extra:true,exercises:[
      ex('Goblet squat',4,8,20,'Goblet_Squat'),ex('Stiff-leg dumbbell deadlift',3,10,20,'Stiff-Legged_Dumbbell_Deadlift'),
      ex('Dumbbell walking lunge',3,12,10,'Dumbbell_Lunges'),ex('Dumbbell calf raise',4,15,16,'Standing_Dumbbell_Calf_Raise')]},
    {id:'x-full',name:'Extra: Full body',extra:true,exercises:[
      ex('Goblet squat',3,12,16,'Goblet_Squat'),ex('Push-ups',3,15,0,'Pushups'),ex('One-arm dumbbell row',3,12,20,'One-Arm_Dumbbell_Row'),ex('Plank',3,45,0,'Plank','secs')]}];
}
function starterPlan(){
  const d=new Date();d.setDate(d.getDate()-((d.getDay()+6)%7));
  const ps=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const r=restartPlan();
  return {v:PLAN_VERSION,phase:'restart',phaseStart:ps,...r,templates:[...r.templates,...extraTemplates()],extrasAdded:true,next:buildPlan(),unit:'kg'};
}
const OLD_STARTER=['Push','Pull','Legs','Full body'].join('|');
function upgradePlan(p){
  const u=upgradePlanCore(p);
  if(!u.plan.extrasAdded){u.plan.templates=[...u.plan.templates,...extraTemplates().filter(x=>!u.plan.templates.some(t=>t.id===x.id))];u.plan.extrasAdded=true;u.plan.v=PLAN_VERSION;u.changed=true}
  return u;
}
function upgradePlanCore(p){
  if(!p||!p.templates) return {plan:starterPlan(),changed:false};
  if(!p.v && p.templates.map(t=>t.name).join('|')===OLD_STARTER) return {plan:starterPlan(),changed:true};
  if(p.v===3){const same=(w,o)=>DAYS.every(d=>(w?.[d]??null)===(o[d]??null));
    if(same(p.week,{mon:'r-full-a',tue:'r-walk',thu:'r-full-b',sat:'r-walk'}))p.week=restartPlan().week;
    else if(same(p.week,{mon:'chest',tue:'cardio',wed:'back',thu:'stretch',fri:'legs',sat:'cardio'})){p.week=buildPlan().week;p.goal=4}
    if(p.next&&same(p.next.week,{mon:'chest',tue:'cardio',wed:'back',thu:'stretch',fri:'legs',sat:'cardio'})){p.next.week=buildPlan().week;p.next.goal=4}
    p.v=PLAN_VERSION;return {plan:p,changed:true}}
  if(!p.v||p.v<3){const s=starterPlan();s.next={templates:p.templates,week:p.week,goal:p.goal||5};s.unit=p.unit||'kg';if(p.lenUnit)s.lenUnit=p.lenUnit;return {plan:s,changed:true}}
  return {plan:p,changed:false};
}

let body=[], bodyCol=null, bodyMetric='weight', exProg='';
let plan=starterPlan(), logs=[], tab='today', mode='local', readOnly=false, todayPick=null, draft=null, confirmDel=null;
let db=null, planRef=null, logsCol=null;
let lib={q:'',cat:'all',gear:['body','db','bar'],allGear:false,muscle:'',shown:40};
let sheet=null, showSets=false; // {id, target}

const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const todayIso=()=>iso(new Date());
const dayKey=d=>DAYS[(d.getDay()+6)%7];
const monday=d=>{const x=new Date(d);x.setHours(0,0,0,0);x.setDate(x.getDate()-((x.getDay()+6)%7));return x};
const parseIso=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d)};
const tmplById=id=>plan.templates.find(t=>t.id===id);
function tmplOptions(sel){
  const o=t=>`<option value="${esc(t.id)}" ${t.id===sel?'selected':''}>${esc(t.name)}</option>`;
  const main=plan.templates.filter(t=>!t.extra), xs=plan.templates.filter(t=>t.extra);
  return xs.length?`<optgroup label="Your plan">${main.map(o).join('')}</optgroup><optgroup label="Extra weight days">${xs.map(o).join('')}</optgroup>`:main.map(o).join('');
}
const fmt=n=>Number(n||0).toLocaleString(undefined,{maximumFractionDigits:1});
const cap=s=>s?s[0].toUpperCase()+s.slice(1):s;
const measureOf=e=>e.measure||'reps';
const amountHead=m=>m==='secs'?'Secs':m==='mins'?'Mins':'Reps';

function toast(msg){const t=$('#toast');t.textContent=msg;t.hidden=false;clearTimeout(toast.h);toast.h=setTimeout(()=>t.hidden=true,2200)}
function lsGet(k,f){try{const v=localStorage.getItem(k);return v?JSON.parse(v):f}catch{return f}}
function lsSet(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}

/* ---------- form videos (YouTube ids, picked per exercise in the plans) ---------- */
const VIDEOS={
  "Dumbbell_Bench_Press":{v:"VmB1G1K7v94",t:"How To: Dumbbell Chest Press"},
  "Pushups":{v:"WDIpL0pjun0",t:"How to do a Push-Up | Proper Form & Technique | NASM"},
  "One-Arm_Dumbbell_Row":{v:"Y35E0D7t6AQ",t:"One Arm Dumbbell Bent-Over Row"},
  "Goblet_Squat":{v:"Xjo_fY9Hl9w",t:"How To Do A Dumbbell Goblet Squat"},
  "Preacher_Curl":{v:"BPmUhDtdQfw",t:"How to Do Preacher Curls"},
  "Plank":{v:"6LqqeBtFn9M",t:"How to do the perfect plank"},
  "Incline_Dumbbell_Press":{v:"OC7Qs_SAO2E",t:"How To Do Incline Dumbbell Press Correctly"},
  "Bent_Over_Two-Dumbbell_Row":{v:"6TSP1TRMUzs",t:"How To: Dumbbell Bent-Over Row"},
  "Dumbbell_Shoulder_Press":{v:"WKEl69bIGus",t:"How to Do the Seated Dumbbell Shoulder Press"},
  "Bench_Dips":{v:"WVeZDBhZwLA",t:"How to do a Bench Dip"},
  "Bodyweight_Squat":{v:"ZLJBfYF_oO0",t:"Bodyweight Squat: How To"},
  "Single_Leg_Glute_Bridge":{v:"3NXv0Nany-Q",t:"Single Leg Glute Bridge"},
  "Decline_Dumbbell_Flyes":{v:"IMALXhhHRKM",t:"How to Do a Decline Dumbbell Fly"},
  "Dips_-_Triceps_Version":{v:"85u_8mz5lBA",t:"Dips: Perfect Form & Common Mistakes"},
  "Standing_Dumbbell_Triceps_Extension":{v:"dxdr8iSRLA8",t:"Dumbbell Seated Overhead Tricep Extension"},
  "Lying_Dumbbell_Tricep_Extension":{v:"uXOm7MpK4HQ",t:"How to Perform a Dumbbell Skull Crusher"},
  "Side_Lateral_Raise":{v:"ssAo_xwFt5c",t:"How to Do Dumbbell Lateral Raises"},
  "Reverse_Flyes":{v:"xXIMFBUid3c",t:"Bent Over Dumbbell Reverse Fly"},
  "Hammer_Curls":{v:"zC3nLlEvin4",t:"How To: Dumbbell Hammer Curl"},
  "Split_Squat_with_Dumbbells":{v:"Wcmg-3iHwjQ",t:"Dumbbell Split Squat"},
  "Stiff-Legged_Dumbbell_Deadlift":{v:"KE2A7G_nDc8",t:"Dumbbell Stiff Leg Deadlift Tutorial"},
  "Dumbbell_Step_Ups":{v:"DxUNi119Qzs",t:"How To Do A Dumbbell Step Up"},
  "Standing_Dumbbell_Calf_Raise":{v:"wwy3BSUjlW4",t:"Standing Dumbbell Calf Raise"},
  "Russian_Twist":{v:"p_dPOhhgovg",t:"How to Do Russian Twist with Dumbbell"},
  "Rope_Jumping":{v:"_UTR1VWg8WY",t:"How to Jump Rope for Beginners"},
  "Mountain_Climbers":{v:"K3Xt4QH4b-U",t:"How to do Mountain Climbers Correctly"},
  "Dumbbell_Lunges":{v:"I34ysEkPK7w",t:"Dumbbell Walking Lunge - How To"},
  "Hamstring_Stretch":{v:"VJLA7PR1gHc",t:"How to Stretch Your Hamstrings"},
  "Kneeling_Hip_Flexor":{v:"vp2oIc890eU",t:"Half Kneeling Hip Flexor and Quad Stretch"},
  "All_Fours_Quad_Stretch":{v:"dLnIM3KDReo",t:"How To Do A Kneeling Quad Stretch"},
  "Shoulder_Stretch":{v:"uNmWSg705JA",t:"How To Do A Cross Body Shoulder Stretch"},
  "Calf_Stretch_Hands_Against_Wall":{v:"DkCcPR1XYnI",t:"The Correct Way to Stretch Your Calf"},
  "Cat_Stretch":{v:"Fa4ZMS5M7xA",t:"How to Do Cat-Cow Stretch"},
  "Childs_Pose":{v:"C2-1aI_KRxQ",t:"Child's Pose Stretch for Back, Hips & Shoulders"}
};

/* ---------- exercise library ---------- */
const GEAR={body:['body only','none'],db:['dumbbell'],bar:['barbell','e-z curl bar'],other:['other','bands','kettlebells','exercise ball','medicine ball','foam roll'],gym:['cable','machine']};
const GEAR_LABEL={body:'Bodyweight',db:'Dumbbells',bar:'Bar',other:'Bands, balls & other',gym:'Cable & machine'};
const CATS={all:null,strength:['strength','powerlifting','olympic weightlifting','strongman'],cardio:['cardio','plyometrics'],stretching:['stretching']};
const CAT_LABEL={all:'All',strength:'Strength',cardio:'Cardio',stretching:'Stretches'};
const CRC=(()=>{const t=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
function crc32(s){const b=new TextEncoder().encode(s);let c=0xFFFFFFFF;for(const x of b)c=CRC[(c^x)&255]^(c>>>8);return (c^0xFFFFFFFF)>>>0}
const chunkCache={};
function imagesFor(id){const n=crc32(id)%24, k=String(n).padStart(2,'0');
  chunkCache[k]=chunkCache[k]||fetch(`lib/img${k}.json`).then(r=>{if(!r.ok)throw 0;return r.json()}).catch(()=>{delete chunkCache[k];return {}});
  return chunkCache[k].then(c=>c[id]||[]);}
function searchLib(){
  const words=lib.q.toLowerCase().split(/\s+/).filter(Boolean);
  const eqs=new Set(Object.entries(GEAR).filter(([k])=>lib.allGear||lib.gear.includes(k)).flatMap(([,v])=>v));
  const cats=CATS[lib.cat];
  let r=EX.filter(x=>eqs.has(x.e)&&(!cats||cats.includes(x.c))&&(!lib.muscle||x.p.includes(lib.muscle)||x.s.includes(lib.muscle)));
  if(words.length){
    r=r.map(x=>{const hay=(x.n+' '+x.p.join(' ')+' '+x.e).toLowerCase();if(!words.every(w=>hay.includes(w)))return null;
      const nm=x.n.toLowerCase();return [x,(nm.startsWith(words[0])?0:1)+(words.every(w=>nm.includes(w))?0:2)]}).filter(Boolean)
      .sort((a,b)=>a[1]-b[1]||a[0].n.localeCompare(b[0].n)).map(a=>a[0]);
  }else r.sort((a,b)=>(a.l==='beginner'?0:1)-(b.l==='beginner'?0:1)||a.n.localeCompare(b.n));
  return r;
}
function viewLibrary(){
  const r=searchLib();
  const tgt=lib.target&&tmplById(lib.target);
  return `<section class="stack">
    <div><div class="eyebrow">${EX.length} exercises with technique photos</div><h2>${tgt?`Add to ${esc(tgt.name)}`:'Exercise library'}</h2>
      ${tgt?`<div class="row" style="margin-top:6px;gap:8px"><span class="muted" style="font-size:.9rem">Pick an exercise to add it.</span><button class="link" data-act="lib-cancel">Done adding</button></div>`:''}</div>
    <input type="search" class="search" id="libq" placeholder="Search, e.g. triceps, curl, hamstring stretch" value="${esc(lib.q)}" aria-label="Search exercises" autocomplete="off">
    <div class="filters">
      <div class="row" style="gap:8px"><span class="lbl">Type</span><div class="chips">${Object.keys(CATS).map(k=>`<button class="chip" data-cat="${k}" aria-pressed="${lib.cat===k}">${CAT_LABEL[k]}</button>`).join('')}</div></div>
      <div class="row" style="gap:8px"><span class="lbl">Equipment</span><div class="chips">${Object.keys(GEAR).map(k=>`<button class="chip" data-gear="${k}" aria-pressed="${lib.allGear||lib.gear.includes(k)}">${GEAR_LABEL[k]}</button>`).join('')}</div></div>
      <div class="row" style="gap:8px"><label class="lbl" for="libm">Muscle</label><select id="libm"><option value="">Any muscle</option>${MUSCLES.map(m=>`<option ${lib.muscle===m?'selected':''}>${esc(m)}</option>`).join('')}</select></div>
    </div>
    <div><div class="eyebrow" style="margin-bottom:6px">${r.length} match${r.length===1?'':'es'}</div>
      ${r.length?`<div class="results">${r.slice(0,lib.shown).map(x=>`<button class="res" data-open="${esc(x.i)}">
        <span style="min-width:0"><span class="nm">${esc(x.n)}</span><br><span class="meta">${esc(cap(x.p.join(', ')))} · ${esc(x.e==='none'||x.e==='body only'?'bodyweight':x.e)}</span></span>
        <span class="tag">${esc(x.l)}</span></button>`).join('')}</div>
        ${r.length>lib.shown?`<div class="row" style="margin-top:12px"><button class="btn ghost" data-act="lib-more">Show more</button></div>`:''}`
      :`<div class="empty">No exercises match. Try fewer words or turn on more equipment.</div>`}
    </div>
  </section>`;
}
function openSheet(id){sheet={id};renderSheet();
  imagesFor(id).then(imgs=>{if(!sheet||sheet.id!==id)return;sheet.imgs=imgs;renderSheet()});}
function closeSheet(){sheet=null;clearInterval(renderSheet.timer);$('#sheet').innerHTML='';document.body.style.overflow=''}
function renderSheet(){
  clearInterval(renderSheet.timer);
  const x=EXBY[sheet.id]; if(!x) return closeSheet();
  const imgs=sheet.imgs, play=sheet.play!==false;
  const demo=imgs===undefined?`<div class="ph">Loading demonstration…</div>`:imgs.length?
    imgs.map((u,i)=>`<img src="${u}" alt="${esc(x.n)}, ${i?'end':'start'} position" data-frame="${i}" style="opacity:${i===0?1:0}">`).join('')+`<span class="step" id="stepl">Start</span>`
    :`<div class="ph">No photos for this one. Follow the steps below.</div>`;
  const opts=tmplOptions(lib.target||plan.templates[0]?.id);
  const yt='https://www.youtube.com/results?search_query='+encodeURIComponent(x.n+' exercise proper form');
  $('#sheet').innerHTML=`<div class="sheet-scrim" data-act="sheet-close"><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
    <div class="row spread" style="align-items:flex-start;margin-bottom:10px"><div style="min-width:0"><div class="eyebrow">${esc(x.c)} · ${esc(x.l)}</div><h2 id="sheet-title">${esc(x.n)}</h2></div>
      <button class="btn ghost small" data-act="sheet-close" aria-label="Close">Close</button></div>
    ${VIDEOS[x.i]?(sheet.video?`<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(VIDEOS[x.i].v)}?rel=0&playsinline=1&autoplay=1" title="${esc(x.n)} form video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>
      <p class="muted" style="font-size:.82rem;margin:6px 0 12px">${navigator.onLine===false?'You’re offline, so the video can’t play. The photos and steps below still work.':`${esc(VIDEOS[x.i].t)} · <a href="https://www.youtube.com/watch?v=${encodeURIComponent(VIDEOS[x.i].v)}" target="_blank" rel="noopener" style="color:var(--accent);font-weight:600">Won’t play? Open in YouTube</a>`}</p>`
      :`<button class="btn playvid" data-act="video"><span class="tri" aria-hidden="true"></span>Watch the form video</button>`):''}
    <div class="demo">${demo}</div>
    ${imgs&&imgs.length>1?`<div class="row" style="margin-top:8px;gap:8px"><button class="btn ghost small" data-act="demo-play">${play?'Pause':'Play'}</button><span class="muted" style="font-size:.82rem">Alternates the start and end positions</span></div>`:''}
    <div class="row" style="margin:14px 0 4px;gap:6px">${x.p.map(m=>`<span class="tag" style="color:var(--accent);border-color:var(--accent)">${esc(m)}</span>`).join('')}${x.s.map(m=>`<span class="tag">${esc(m)}</span>`).join('')}<span class="tag">${esc(x.e==='none'?'no equipment':x.e)}</span></div>
    <h3 style="margin:16px 0 8px;font-size:1rem">How to do it</h3>
    <ol class="steps">${x.t.map(s=>`<li>${esc(s)}</li>`).join('')}</ol>
    <p style="margin:14px 0 0"><a href="${yt}" target="_blank" rel="noopener" style="color:var(--accent);font-weight:600">${VIDEOS[x.i]?'More videos on YouTube':'Watch video demonstrations on YouTube'}</a></p>
    ${readOnly||!plan.templates.length?'':`<div class="card" style="margin-top:18px"><div class="row" style="gap:8px"><label for="addto" class="muted" style="font-size:.9rem">Add to</label><select id="addto" style="flex:1">${opts}</select><button class="btn" data-act="sheet-add">Add exercise</button></div></div>`}
  </div></div>`;
  document.body.style.overflow='hidden';
  if(imgs&&imgs.length>1&&play&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    let f=0;renderSheet.timer=setInterval(()=>{f=1-f;document.querySelectorAll('.demo img').forEach(im=>im.style.opacity=+im.dataset.frame===f?1:0);const l=document.getElementById('stepl');if(l)l.textContent=f?'End':'Start'},1300);
  }
}
function addFromLibrary(libId,tid){
  const x=EXBY[libId], t=tmplById(tid); if(!x||!t) return;
  const m=x.c==='stretching'?'secs':x.c==='cardio'?'mins':'reps';
  t.exercises.push(ex(x.n,m==='mins'?1:3,m==='secs'?30:m==='mins'?20:10,0,libId,m));
  savePlan();toast(`Added ${x.n} to ${t.name}`);
}

/* ---------- saving ---------- */
let saveTimer=null, saving=Promise.resolve();
function savePlan(){
  if(mode==='local'){lsSet('rp.plan',plan);return}
  if(readOnly) return;
  clearTimeout(saveTimer);
  saveTimer=setTimeout(()=>{const body=JSON.parse(JSON.stringify(plan));
    saving=saving.then(()=>planRef.set(body)).then(()=>setSync()).catch(onWriteErr)},700);
}
let unsubs=[];
function goLocal(){mode='local';unsubs.forEach(f=>{try{f()}catch{}});unsubs=[];lsSet('rp.plan',plan);lsSet('rp.logs',logs);lsSet('rp.body',body);setSync()}
function onWriteErr(e){
  const permanent=e&&['invalid_argument','not_granted','capability_disabled','capability_removed','revoked','transform_error'].includes(e.code);
  if(permanent){goLocal();toast('Couldn\u2019t save to your account, so saving on this device instead');return true}
  toast('Couldn’t save. Check your connection and try again.');return false;
}
function setSync(){
  const s=$('#sync');
  s.innerHTML='Saved on <b>this phone</b>';
}
function saveDraft(){lsSet('rp.draft',draft)}

/* ---------- workout session ---------- */
function newDraft(tid){
  const t=tmplById(tid); if(!t) return null;
  return {date:todayIso(),templateId:t.id,name:t.name,exercises:t.exercises.map(e=>({eid:e.id,name:e.name,lib:e.lib||null,measure:measureOf(e),sets:Array.from({length:Math.max(1,+e.sets||1)},()=>({reps:+e.reps||0,weight:+e.weight||0,done:false}))}))};
}
function currentPick(){if(todayPick!==null) return todayPick;return plan.week[dayKey(new Date())]??null}
function volumeOf(l){return l.exercises.reduce((a,e)=>a+(measureOf(e)==='reps'?e.sets.filter(s=>s.done).reduce((b,s)=>b+(+s.reps||0)*(+s.weight||0),0):0),0)}
async function finishWorkout(){
  const doneSets=draft.exercises.reduce((a,e)=>a+e.sets.filter(s=>s.done).length,0);
  if(!doneSets){toast('Tick off at least one set first');return}
  const entry={...draft,volume:volumeOf(draft),doneSets,finishedAt:Date.now()};
  if(mode==='db'){try{await logsCol.add(entry)}catch(e){if(!onWriteErr(e))return}}
  if(mode==='local'){entry.id=uid4();logs=[entry,...logs];lsSet('rp.logs',logs)}
  draft=null;saveDraft();timer=null;tick();toast(`Logged ${entry.name}: ${doneSets} ${doneSets===1?'set':'sets'}`);tab='progress';render();checkMilestones(true);
}

function phaseInfo(){
  if(plan.phase!=='restart') return null;
  const start=parseIso(plan.phaseStart||todayIso()), now=monday(new Date());
  const byWeek={}; logs.forEach(l=>{const d=parseIso(l.date);if(d>=start){const k=iso(monday(d));byWeek[k]=(byWeek[k]||0)+1}});
  let good=0, weeks=0; for(let w=new Date(start);w<=now;w.setDate(w.getDate()+7)){weeks++;if((byWeek[iso(w)]||0)>=plan.goal)good++}
  return {weekNo:weeks,good,ready:good>=RESTART_WEEKS,thisWeek:byWeek[iso(now)]||0};
}
function phaseBanner(){
  const p=phaseInfo(); if(!p) return '';
  const dots=Array.from({length:RESTART_WEEKS},(_,i)=>`<i class="${i<p.good?'on':''}"></i>`).join('');
  if(p.ready) return `<div class="card phase ready"><div><div class="eyebrow">Restart phase complete</div><b>${RESTART_WEEKS} consistent weeks done. You're ready for the full plan.</b></div>
    <button class="btn" data-act="phase-up">Move up to the full plan</button></div>`;
  return `<div class="card phase"><div style="min-width:0"><div class="eyebrow">Restart phase · week ${p.weekNo}</div>
    <b>${p.good} of ${RESTART_WEEKS} consistent weeks</b><div class="muted" style="font-size:.85rem">A week counts when you do ${plan.goal} workouts. This week: ${Math.min(p.thisWeek,plan.goal)} of ${plan.goal}. Then the plan moves up to the full routine.</div></div>
    <div class="dots" aria-hidden="true">${dots}</div></div>`;
}
function phaseUp(){
  if(!plan.next) return;
  const extras=plan.templates.filter(t=>t.extra);
  plan={...plan,phase:'build',phaseStart:todayIso(),templates:[...plan.next.templates,...extras],week:plan.next.week,goal:plan.next.goal,prev:{templates:plan.templates.filter(t=>!t.extra),week:plan.week,goal:plan.goal},next:null};
  draft=null;todayPick=null;saveDraft();savePlan();render();toast('Full plan unlocked. Nice work.');
}
function loggedOn(date,tid){return logs.some(l=>l.date===date&&l.templateId===tid)}
async function logPlanned(tid,date,fromDraft){
  const src=fromDraft&&draft&&draft.templateId===tid?draft:newDraft(tid); if(!src) return;
  const entry={...JSON.parse(JSON.stringify(src)),date,asPlanned:true,finishedAt:Date.now()};
  entry.exercises.forEach(e=>e.sets.forEach(s=>s.done=true));
  entry.volume=volumeOf(entry);entry.doneSets=entry.exercises.reduce((a,e)=>a+e.sets.length,0);
  if(mode==='db'){try{await logsCol.add(entry)}catch(e){if(!onWriteErr(e))return false}}
  if(mode==='local'){entry.id=uid4();logs=[entry,...logs].sort((a,b)=>b.date.localeCompare(a.date));lsSet('rp.logs',logs)}
  if(date===todayIso()&&draft&&draft.templateId===tid){draft=null;saveDraft()}
  const p=phaseInfo();
  toast(p&&p.ready?`Logged ${entry.name}. Restart phase complete!`:`Logged ${entry.name}. Nice work.`);
  setTimeout(()=>checkMilestones(true),50);
  return true;
}

/* ---------- rest timer + warm-up ---------- */
const WARMUP=[['March or jog in place',60,null],['Arm circles, both directions',30,'Arm_Circles'],['Bodyweight squats',45,'Bodyweight_Squat'],
  ['Hip hinges, hands on hips',30,null],['Incline push-ups on the bench',45,'Incline_Push-Up'],['Cat-cow',30,'Cat_Stretch'],['Reverse lunges, alternating legs',60,null]];
const REST_CHOICES=[[0,'Off'],[45,'45 sec'],[60,'1 min'],[90,'1:30'],[120,'2 min'],[180,'3 min']];
let timer=null, actx=null, wakeLock=null;
// Keep the screen on while a timer runs so the beep can play (the phone pauses the app when it locks).
function holdScreen(on){
  if(on&&!wakeLock&&navigator.wakeLock){wakeLock='pending';
    navigator.wakeLock.request('screen').then(l=>{if(!timer){l.release().catch(()=>{});wakeLock=null;return}
      wakeLock=l;l.addEventListener('release',()=>{if(wakeLock===l)wakeLock=null})}).catch(()=>{wakeLock='failed'})}
  if(!on&&wakeLock){if(wakeLock.release)wakeLock.release().catch(()=>{});wakeLock=null}
}
function unlockAudio(){try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();if(actx.state==='suspended')actx.resume()}catch{}}
function beep(n){
  try{navigator.vibrate?.(n>1?[200,100,200]:150)}catch{}
  if(!actx) return; try{if(actx.state!=='running')actx.resume()}catch{}
  const t0=actx.currentTime+.02;
  for(let i=0;i<n;i++){const o=actx.createOscillator(),g=actx.createGain(),s=t0+i*.28;o.type='sine';o.frequency.value=i===n-1&&n>1?1320:880;
    o.connect(g);g.connect(actx.destination);g.gain.setValueAtTime(.0001,s);g.gain.exponentialRampToValueAtTime(.5,s+.02);g.gain.exponentialRampToValueAtTime(.0001,s+.2);o.start(s);o.stop(s+.22)}
}
const restSecs=()=>plan.rest??90;
function startRest(){const secs=restSecs();if(!secs)return;timer={kind:'rest',end:Date.now()+secs*1000,total:secs};tick()}
function startWarm(i){timer={kind:'warm',i,end:Date.now()+WARMUP[i][1]*1000,total:WARMUP[i][1]};tick()}
const mmss=n=>`${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`;
function tick(){
  const bar=$('#timerbar');
  if(!timer){bar.hidden=true;bar.innerHTML='';holdScreen(false);return}
  holdScreen(true);
  const left=Math.max(0,Math.ceil((timer.end-Date.now())/1000));
  if(left<=0){
    if(timer.kind==='rest'){timer=null;beep(3);toast('Rest is up. Next set.')}
    else if(timer.i<WARMUP.length-1){beep(1);startWarm(timer.i+1);return}
    else{timer=null;beep(3);lsSet('rp.warm',todayIso());toast('Warm-up done. Time to lift.');if(tab==='today')keepScroll(render)}
    return tick();
  }
  const pct=(1-left/timer.total)*100;
  const head=timer.kind==='rest'?`<div class="eyebrow">Rest</div><b>Next set when the timer ends</b>`
    :`<div class="eyebrow">Warm-up ${timer.i+1} of ${WARMUP.length}</div><b>${esc(WARMUP[timer.i][0])}</b>`;
  const btns=timer.kind==='rest'?`<button class="btn ghost small" data-tm="minus">−15s</button><button class="btn ghost small" data-tm="plus">+15s</button><button class="btn small" data-tm="stop">Skip</button>`
    :`<button class="btn ghost small" data-tm="next">Next</button><button class="btn small" data-tm="stop">Stop</button>`;
  bar.hidden=false;
  bar.innerHTML=`<div class="tb-in"><div class="tb-txt">${head}</div><span class="tb-time num" aria-live="off">${mmss(left)}</span><div class="tb-btns">${btns}</div></div><div class="tb-prog"><i style="width:${pct}%"></i></div>`;
}
setInterval(()=>{if(timer)tick()},250);
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&timer)tick()});
function isStrength(t){return t&&t.exercises.some(e=>measureOf(e)==='reps')}
function warmupCard(t){
  if(!isStrength(t)) return '';
  if(lsGet('rp.warm','')===todayIso()) return `<div class="muted" style="font-size:.9rem">Warm-up done. Nice.</div>`;
  const total=WARMUP.reduce((a,w)=>a+w[1],0);
  return `<details class="card warm"${timer?.kind==='warm'?' open':''}><summary><span><b>Warm up first</b> <span class="muted">· ${Math.round(total/60)} min</span></span><span class="howto">Show</span></summary>
    <ol class="steps" style="margin-top:10px">${WARMUP.map(([n,secs,id])=>`<li>${esc(n)} <span class="muted num">${secs}s</span>${id?` <button class="howto" data-open="${esc(id)}">How to</button>`:''}</li>`).join('')}</ol>
    <div class="row" style="margin-top:12px"><button class="btn" data-act="warm-start">Start warm-up timer</button><button class="link" data-act="warm-skip">Skip today</button></div></details>`;
}

/* ---------- add-weight nudges ---------- */
function sortedLogs(){return logs.slice().sort((a,b)=>b.date.localeCompare(a.date)||(b.finishedAt||0)-(a.finishedAt||0))}
function nudgeFor(te){
  const m=measureOf(te); if(!te||m==='mins') return null;
  const skip=lsGet('rp.nudgeSkip',[]); if(skip.includes(`${te.id}:${te.weight}:${te.reps}`)) return null;
  const hits=[]; for(const l of sortedLogs()){const e=l.exercises.find(x=>x.name===te.name);if(!e)continue;hits.push(e);if(hits.length===2)break}
  if(hits.length<2) return null;
  const ok=hits.every(e=>e.sets.length>=+te.sets&&e.sets.every(s=>s.done&&+s.reps>=+te.reps&&(m!=='reps'||+s.weight>=+te.weight)));
  if(!ok) return null;
  if(m==='secs') return {field:'reps',to:+te.reps+10,label:`${+te.reps+10} seconds`};
  if(+te.weight>0){const to=+te.weight+(plan.unit==='lb'?5:2);return {field:'weight',to,label:`${fmt(to)} ${plan.unit}`}}
  return {field:'reps',to:+te.reps+2,label:`${+te.reps+2} reps`};
}
function nudgeHtml(t,te){
  const n=te&&nudgeFor(te); if(!n) return '';
  return `<div class="nudge" data-tid="${esc(t.id)}" data-eid="${esc(te.id)}"><span>Hit every rep twice. <b>Try ${esc(n.label)}</b></span>
    <span class="row" style="gap:6px"><button class="btn small" data-act="bump">Use it</button><button class="link" data-act="bump-skip">Not yet</button></span></div>`;
}
function bump(tid,eid){
  const t=tmplById(tid), te=t&&t.exercises.find(x=>x.id===eid); const n=te&&nudgeFor(te); if(!n) return;
  te[n.field]=n.to;
  if(draft&&draft.templateId===tid) draft.exercises.forEach(e=>{if(e.eid===eid||(!e.eid&&e.name===te.name))e.sets.forEach(s=>{if(!s.done)s[n.field]=n.to})});
  saveDraft();savePlan();toast(`${te.name}: now ${n.label}`);
}

/* ---------- streaks + milestones ---------- */
function weekCounts(){const w={};logs.forEach(l=>{const k=iso(monday(parseIso(l.date)));w[k]=(w[k]||0)+1});return w}
function weekStreak(){const by=weekCounts();let n=0,w=monday(new Date());if((by[iso(w)]||0)<plan.goal)w.setDate(w.getDate()-7);
  while((by[iso(w)]||0)>=plan.goal){n++;w.setDate(w.getDate()-7)}return n}
function bestStreak(){const by=weekCounts(),keys=Object.keys(by).sort();if(!keys.length)return 0;let best=0,run=0;
  for(let w=parseIso(keys[0]),end=monday(new Date());w<=end;w.setDate(w.getDate()+7)){if((by[iso(w)]||0)>=plan.goal){run++;best=Math.max(best,run)}else run=0}return best}
function milestones(){
  const total=logs.length, by=weekCounts(), good=Object.values(by).filter(n=>n>=plan.goal).length, best=bestStreak(), thisWeek=by[iso(monday(new Date()))]||0;
  const p=phaseInfo(), restart=plan.phase==='build'?RESTART_WEEKS:Math.min(p?.good||0,RESTART_WEEKS);
  return [['first','First workout','You showed up. That is the hardest part.',total,1],
    ['week1','First full week',`${plan.goal} workouts in one week`,good?plan.goal:thisWeek,plan.goal],
    ['streak2','2-week streak','Two goal weeks in a row',best,2],
    ['w10','10 workouts','Ten sessions logged',total,10],
    ['restart','Restart done',`${RESTART_WEEKS} consistent weeks, ready for the full plan`,restart,RESTART_WEEKS],
    ['streak4','4-week streak','A month of goal weeks in a row',best,4],
    ['w25','25 workouts','Twenty-five sessions logged',total,25],
    ['streak8','8-week streak','Two months without missing your goal',best,8],
    ['w50','50 workouts','Fifty sessions logged',total,50],
    ['streak12','12-week streak','Three months of goal weeks in a row',best,12],
    ['w100','100 workouts','A hundred sessions. Serious work.',total,100]]
    .map(([id,name,desc,val,target])=>({id,name,desc,val:Math.min(val,target),target,done:val>=target}));
}
function checkMilestones(celebrate){
  const done=milestones().filter(m=>m.done), seen=lsGet('rp.ms',null);
  if(!seen||!celebrate){lsSet('rp.ms',[...new Set([...(seen||[]),...done.map(m=>m.id)])]);return}
  const fresh=done.filter(m=>!seen.includes(m.id)); if(!fresh.length) return;
  lsSet('rp.ms',[...seen,...fresh.map(m=>m.id)]);
  const m=fresh.at(-1), c=$('#celebrate');
  c.innerHTML=`<div class="sheet-scrim center" data-act="cel-close"><div class="cel" role="dialog" aria-modal="true" aria-labelledby="cel-t"><div class="medal" aria-hidden="true"></div>
    <div class="eyebrow">Milestone unlocked</div><h2 id="cel-t">${esc(m.name)}</h2><p class="muted" style="margin:6px 0 16px">${esc(m.desc)}</p><button class="btn" data-act="cel-close">Keep going</button></div></div>`;
  beep(2);
}
function nextMilestone(){return milestones().find(m=>!m.done)}
function milestonesCard(){
  const ms=milestones(), next=ms.find(m=>!m.done);
  return `<div class="card"><div class="row spread" style="margin-bottom:10px"><div class="eyebrow">Milestones · ${ms.filter(m=>m.done).length} of ${ms.length}</div>${next?`<span class="muted" style="font-size:.85rem">Next: ${esc(next.name)}, ${next.val} of ${next.target}</span>`:''}</div>
    <div class="badges">${ms.map(m=>`<div class="badge ${m.done?'on':''}" title="${esc(m.desc)}"><span class="medal sm" aria-hidden="true"></span><b>${esc(m.name)}</b>
      <span class="muted">${m.done?'Done':`${m.val} of ${m.target}`}</span></div>`).join('')}</div></div>`;
}

/* ---------- views ---------- */
function viewToday(){
  const now=new Date(), pick=currentPick(), t=tmplById(pick), streak=weekStreak(), nm=nextMilestone();
  const doneToday=logs.filter(l=>l.date===todayIso());
  if(draft&&draft.date!==todayIso()) draft=null;
  if(t&&(!draft||draft.templateId!==t.id)) {draft=newDraft(t.id);saveDraft()}
  const opts=`<option value="">Rest day</option>`+tmplOptions(pick);
  let body;
  if(t&&loggedOn(todayIso(),t.id)&&!showSets){
    body=`<div class="row"><button class="link" data-act="show-sets">Log another session of ${esc(t.name)}</button></div>`;
  }else if(!t){
    const xs=plan.templates.filter(x=>x.extra);
    body=`<div class="empty">Rest day. Recovery is part of the plan.<br>${xs.length?'Feel like an extra day of weights?':'Want to train anyway? Pick a workout above.'}
      ${xs.length?`<div class="row" style="justify-content:center;margin-top:12px;gap:8px">${xs.map(x=>`<button class="btn ghost small" data-act="pick" data-id="${esc(x.id)}">${esc(x.name.replace(/^Extra:\s*/,''))}</button>`).join('')}</div>`:''}</div>`;
  }else{
    const total=draft.exercises.reduce((a,e)=>a+e.sets.length,0), done=draft.exercises.reduce((a,e)=>a+e.sets.filter(s=>s.done).length,0);
    const vol=volumeOf(draft);
    body=`<div class="card">
      <div class="row spread"><div class="eyebrow">${done} of ${total} sets done${vol?` · ${fmt(vol)} ${esc(plan.unit)} lifted`:''}</div>
        <label class="row" style="gap:6px;font-size:.85rem"><span class="muted">Rest timer</span><select id="restsel">${REST_CHOICES.map(([v,l])=>`<option value="${v}" ${restSecs()===v?'selected':''}>${l}</option>`).join('')}</select></label></div>
      <div class="donebar" style="margin:8px 0 6px"><i style="width:${total?done/total*100:0}%"></i></div>
      ${draft.exercises.map((e,ei)=>{const m=measureOf(e), te=t.exercises.find(x=>x.id===e.eid)||t.exercises.find(x=>x.name===e.name);return `<div class="ex"><h3>${esc(e.name)}${e.lib&&EXBY[e.lib]?`<button class="howto" data-open="${esc(e.lib)}">How to</button>`:''}</h3>
        ${nudgeHtml(t,te)}
        <div class="sets"><span class="hd">Set</span><span class="hd">${amountHead(m)}</span><span class="hd">${m==='reps'?esc(plan.unit):''}</span><span class="hd">Done</span>
        ${e.sets.map((s,si)=>`<span class="num muted">${si+1}</span>
          <input type="number" inputmode="numeric" min="0" id="r-${ei}-${si}" data-set="${ei}.${si}.reps" value="${s.reps}" aria-label="${esc(e.name)} set ${si+1} ${amountHead(m).toLowerCase()}">
          ${m==='reps'?`<input type="number" inputmode="decimal" min="0" step="0.5" id="w-${ei}-${si}" data-set="${ei}.${si}.weight" value="${s.weight}" aria-label="${esc(e.name)} set ${si+1} weight">`:'<span></span>'}
          <input type="checkbox" class="check" id="c-${ei}-${si}" data-set="${ei}.${si}.done" ${s.done?'checked':''} aria-label="${esc(e.name)} set ${si+1} done">`).join('')}
        </div></div>`}).join('')}
      <div class="row" style="margin-top:18px"><button class="btn" data-act="finish">Finish and log workout</button><button class="link" data-act="reset">Reset sets</button></div>
    </div>`;
  }
  return `<section class="stack">
    <div class="row spread">
      <div><div class="eyebrow">${now.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'})}${streak?` · <span class="streak">${streak}-week streak</span>`:''}</div><h2>${t?esc(t.name):'Rest day'}</h2></div>
      <label class="row" style="gap:8px"><span class="muted" style="font-size:.85rem">Workout</span><select id="pick">${opts}</select></label>
    </div>
    ${phaseBanner()}
    ${t&&!loggedOn(todayIso(),t.id)?warmupCard(t):''}
    ${t?(loggedOn(todayIso(),t.id)?`<div class="card donecard"><span class="bigcheck" aria-hidden="true"></span><div><b>${esc(t.name)} done today</b><div class="muted" style="font-size:.85rem">Logged. Rest up and come back tomorrow.</div></div></div>`
      :`<div class="card quick"><div style="min-width:0"><b>Finished today's workout?</b><div class="muted" style="font-size:.85rem">One tap logs everything as planned. Or tick off sets below as you go.</div></div><button class="btn big" data-act="did-it">I did it</button></div>`):''}
    ${doneToday.length&&!(t&&loggedOn(todayIso(),t.id))?`<div class="muted" style="font-size:.9rem">Already logged today: ${doneToday.map(l=>esc(l.name)).join(', ')}</div>`:''}
    ${body}
    ${nm&&logs.length?`<div class="muted" style="font-size:.88rem">Next milestone: <b>${esc(nm.name)}</b> (${nm.val} of ${nm.target})</div>`:''}
  </section>`;
}
function weekDone(){
  const m=monday(new Date()), set=new Set();
  logs.forEach(l=>{const d=parseIso(l.date); if(d>=m && d<new Date(m.getTime()+7*864e5)) set.add(dayKey(d))});
  return set;
}
function viewWeek(){
  const tk=dayKey(new Date()), done=weekDone(), planned=DAYS.filter(d=>plan.week[d]).length;
  return `<section class="stack">
    <div><div class="eyebrow">This week</div><h2>${planned} training days planned</h2></div>
    <div class="week">${DAYS.map(d=>{const t=tmplById(plan.week[d]);return `<div class="day ${d===tk?'today':''}">
      <div class="d">${DAY_NAMES[d]}</div><div class="w ${t?'':'rest'}">${t?esc(t.name):'Rest'}</div>${done.has(d)?'<div class="tick">Done</div>':(t&&DAYS.indexOf(d)<=DAYS.indexOf(tk)&&!readOnly?`<button class="didit" data-act="did-day" data-day="${d}" aria-label="I did ${esc(t.name)} on ${DAY_NAMES[d]}">Did it</button>`:'')}</div>`}).join('')}</div>
    ${phaseBanner()}
    <div class="card">
      <div class="row spread"><h2 style="font-size:1.2rem">Set your week</h2>
        <label class="row" style="gap:8px;font-size:.9rem">Weekly goal <input type="number" id="goal" min="1" max="14" value="${plan.goal}"> workouts</label></div>
      <div class="planlist">${DAYS.map(d=>`<div class="planrow"><label for="pd-${d}" style="font-weight:600">${DAY_NAMES[d]}${d===tk?' <span class="eyebrow" style="color:var(--accent)">today</span>':''}</label>
        <select id="pd-${d}" data-day="${d}"><option value="">Rest</option>${tmplOptions(plan.week[d])}</select></div>`).join('')}</div>
      <div class="row spread" style="margin-top:12px">
        <div class="row" style="gap:8px;font-size:.9rem"><span class="muted">Units</span><select id="unit"><option ${plan.unit==='kg'?'selected':''}>kg</option><option ${plan.unit==='lb'?'selected':''}>lb</option></select></div>
        ${plan.phase==='restart'&&plan.next?(confirmDel==='phase-up'?`<span class="confirm">Skip the restart phase and start the full plan now? <button class="btn small" data-act="phase-up">Start it</button><button class="link" data-act="cancel-confirm">Not yet</button></span>`:`<button class="link" data-act="phase-ask">Skip to the full plan</button>`):''}
        ${confirmDel==='reset-plan'?`<span class="confirm">Start over with the 4-week restart plan? Your workouts and week are replaced. <button class="btn small" data-act="resetplan-yes">Replace</button><button class="link" data-act="cancel-confirm">Keep mine</button></span>`:`<button class="link" data-act="resetplan">Start over</button>`}
      </div>
    </div>
    <div class="card"><h2 style="font-size:1.2rem">Backup</h2>
      <p class="muted" style="font-size:.88rem;margin:6px 0 12px">Everything is saved on this phone. Save a backup now and then (to iCloud Drive or Files) so you can restore it on a new phone.${lsGet('rp.lastBackup',null)?` Last backup: ${shortDate(lsGet('rp.lastBackup',''))}.`:''}</p>
      <div class="row" style="gap:8px"><button class="btn ghost" data-act="backup">Save a backup</button>
        <label class="btn ghost" for="restore" style="cursor:pointer">Restore a backup</label><input type="file" id="restore" accept="application/json,.json" hidden></div></div>
  </section>`;
}
function viewWorkouts(){
  return `<section class="stack">
    <div class="row spread"><div><div class="eyebrow">${plan.templates.length} workouts</div><h2>Your workouts</h2></div>
      <button class="btn" data-act="addtmpl">New workout</button></div>
    ${plan.templates.map((t,i)=>`${t.extra&&!plan.templates[i-1]?.extra?`<div><div class="eyebrow">For bonus days</div><h2>Extra weight days</h2><p class="muted" style="margin:4px 0 0;font-size:.9rem">Your original push, pull and legs days. Pick one on the Today tab any time.</p></div>`:''}<div class="card tmpl" data-t="${esc(t.id)}">
      <div class="row spread"><input type="text" class="name" id="tn-${esc(t.id)}" data-tf="name" value="${esc(t.name)}" aria-label="Workout name" style="flex:1">
        ${confirmDel===t.id?`<span class="confirm">Delete ${esc(t.name)}? <button class="btn small" data-act="deltmpl-yes">Delete</button><button class="link" data-act="cancel-confirm">Keep</button></span>`:`<button class="link" data-act="deltmpl">Delete</button>`}</div>
      ${t.exercises.map(e=>{const m=measureOf(e);return `<div class="exrow" data-e="${esc(e.id)}">
        <div class="exname-wrap"><input type="text" id="en-${esc(e.id)}" data-ef="name" value="${esc(e.name)}" aria-label="Exercise name">${e.lib&&EXBY[e.lib]?`<button class="howto" data-open="${esc(e.lib)}">How to</button>`:''}<button class="link" data-act="delex" aria-label="Remove ${esc(e.name)}">Remove</button></div>
        <label class="f" for="es-${esc(e.id)}">Sets<input type="number" id="es-${esc(e.id)}" data-ef="sets" min="1" value="${e.sets}"></label>
        <label class="f" for="er-${esc(e.id)}">${amountHead(m)}<input type="number" id="er-${esc(e.id)}" data-ef="reps" min="0" value="${e.reps}"></label>
        ${m==='reps'?`<label class="f" for="ew-${esc(e.id)}">${esc(plan.unit)}<input type="number" id="ew-${esc(e.id)}" data-ef="weight" min="0" step="0.5" value="${e.weight}"></label>`:'<span></span>'}
        <label class="f" for="em-${esc(e.id)}">Count by<select id="em-${esc(e.id)}" data-ef="measure">${Object.entries(MEASURES).map(([k,v])=>`<option value="${k}" ${m===k?'selected':''}>${v}</option>`).join('')}</select></label>
        </div>${nudgeHtml(t,e)}`}).join('')}
      <div class="row spread" style="margin-top:10px"><span class="muted" style="font-size:.82rem">Your targets fill in each set on the Today tab.</span>
        <span class="row" style="gap:8px"><button class="btn ghost small" data-act="addex">Add blank</button><button class="btn small" data-act="addlib">Add from library</button></span></div>
    </div>`).join('')}
  </section>`;
}
function viewProgress(){
  const m=monday(new Date());
  const thisWeek=logs.filter(l=>parseIso(l.date)>=m).length;
  const streak=weekStreak();
  if(!logs.length) return `<section class="stack"><div><div class="eyebrow">Progress</div><h2>No workouts logged yet</h2></div>
    <div class="stats">${stat('This week',`0/${plan.goal}`)}${stat('Week streak','0')}${stat('Total logged','0')}</div>
    <div class="empty">Finish a workout on the Today tab and it shows up here, with your weekly volume and best lifts.</div>${milestonesCard()}</section>`;
  const weeks=[];for(let i=7;i>=0;i--){const d=new Date(m);d.setDate(d.getDate()-7*i);weeks.push(iso(d))}
  const vol=weeks.map(k=>logs.filter(l=>iso(monday(parseIso(l.date)))===k).reduce((a,l)=>a+(l.volume||0),0));
  const best={}; logs.forEach(l=>l.exercises.forEach(e=>{if(measureOf(e)!=='reps')return;e.sets.filter(s=>s.done&&+s.weight>0).forEach(s=>{if(!best[e.name]||+s.weight>best[e.name].w||(+s.weight===best[e.name].w&&+s.reps>best[e.name].r))best[e.name]={w:+s.weight,r:+s.reps,date:l.date}})}));
  const bestRows=Object.entries(best).sort((a,b)=>b[1].w-a[1].w).slice(0,8);
  return `<section class="stack">
    <div><div class="eyebrow">Progress</div><h2>${thisWeek>=plan.goal?'Weekly goal hit':`${plan.goal-thisWeek} more to hit this week’s goal`}</h2></div>
    <div class="stats">${stat('This week',`${thisWeek}/${plan.goal}`,thisWeek>=plan.goal)}${stat('Week streak',streak,streak>1)}${stat('Total logged',logs.length)}</div>
    ${milestonesCard()}
    <div class="card"><div class="eyebrow" style="margin-bottom:8px">Weekly volume, ${esc(plan.unit)} (reps × weight)</div><div class="chart">${chart(weeks,vol)}</div></div>
    ${exCard()}
    ${bestRows.length?`<div class="card"><div class="eyebrow">Best sets</div><table><thead><tr><th>Exercise</th><th class="r">${esc(plan.unit)}</th><th class="r">Reps</th><th class="r">Date</th></tr></thead><tbody>
      ${bestRows.map(([n,b])=>`<tr><td>${esc(n)}</td><td class="r num">${fmt(b.w)}</td><td class="r num">${b.r}</td><td class="r num muted">${shortDate(b.date)}</td></tr>`).join('')}</tbody></table></div>`:''}
    <div class="card"><div class="eyebrow">History</div><table><tbody>
      ${logs.slice(0,30).map(l=>`<tr><td class="num muted" style="width:6.5em">${shortDate(l.date)}</td><td>${esc(l.name)}</td><td class="r num">${l.doneSets||0} ${l.doneSets===1?'set':'sets'}</td><td class="r num muted">${l.volume?fmt(l.volume)+' '+esc(plan.unit):''}</td>
        <td class="r" style="width:1%">${confirmDel==='log:'+l.id?`<span class="confirm"><button class="btn small" data-act="dellog-yes" data-id="${esc(l.id)}">Delete</button><button class="link" data-act="cancel-confirm">Keep</button></span>`:`<button class="link" data-act="dellog" data-id="${esc(l.id)}" aria-label="Delete ${esc(l.name)} on ${esc(l.date)}">Delete</button>`}</td></tr>`).join('')}
    </tbody></table></div>
  </section>`;
}
const BODY_FIELDS=[['weight','Body weight','w'],['bodyfat','Body fat','%'],['waist','Waist','l'],['chest','Chest','l'],['arms','Arms','l'],['thighs','Thighs','l'],['hips','Hips','l']];
const bodyUnit=k=>{const f=BODY_FIELDS.find(x=>x[0]===k);return f[2]==='w'?plan.unit:f[2]==='%'?'%':(plan.lenUnit||'cm')};
function viewBody(){
  const today=todayIso(), cur=body.find(b=>b.date===today)||{};
  const pts=body.filter(b=>b[bodyMetric]!=null&&b[bodyMetric]!=='').map(b=>({date:b.date,v:+b[bodyMetric]})).sort((a,b)=>a.date.localeCompare(b.date));
  const label=BODY_FIELDS.find(f=>f[0]===bodyMetric)[1], u=bodyUnit(bodyMetric);
  const last=pts.at(-1), first=pts[0], ch=last&&first&&pts.length>1?last.v-first.v:null;
  return `<section class="stack">
    <div><div class="eyebrow">Body</div><h2>Weight and measurements</h2></div>
    <div class="card"><div class="row spread" style="margin-bottom:10px"><h2 style="font-size:1.2rem">Log measurements</h2>
      <label class="row" style="gap:8px;font-size:.85rem"><span class="muted">Date</span><input type="date" id="bdate" value="${esc(today)}" max="${esc(today)}"></label></div>
      <div class="bodyform">${BODY_FIELDS.map(([k,l])=>`<label for="b-${k}">${l} (${esc(bodyUnit(k))})<input type="number" inputmode="decimal" step="0.1" min="0" id="b-${k}" value="${cur[k]??''}"></label>`).join('')}</div>
      <div class="row spread" style="margin-top:12px"><span class="muted" style="font-size:.82rem">Fill in only what you measured. Saving again on the same date updates it.</span>
        <div class="row" style="gap:8px"><select id="lenunit" aria-label="Length unit"><option value="cm" ${(plan.lenUnit||'cm')==='cm'?'selected':''}>cm</option><option value="in" ${plan.lenUnit==='in'?'selected':''}>in</option></select><button class="btn" data-act="body-save">Save</button></div></div>
    </div>
    <div class="card">
      <div class="chips" style="margin-bottom:12px">${BODY_FIELDS.map(([k,l])=>`<button class="chip" data-metric="${k}" aria-pressed="${bodyMetric===k}">${l}</button>`).join('')}</div>
      ${pts.length?`<div class="row" style="gap:16px;align-items:baseline;margin-bottom:6px"><span class="bigv num">${fmt(last.v)}<span style="font-size:1rem"> ${esc(u)}</span></span>
        ${ch!==null?`<span class="delta" style="color:${ch===0?'var(--muted)':'var(--ink)'}">${ch>0?'+':''}${fmt(ch)} ${esc(u)} since ${shortDate(first.date)}</span>`:''}</div>
        <div class="chart">${lineChart(pts,u,label)}</div>`
      :`<div class="empty">No ${esc(label.toLowerCase())} entries yet. Log one above and your chart starts here.</div>`}
    </div>
    ${body.length?`<div class="card"><div class="eyebrow">History</div><div style="overflow-x:auto"><table><thead><tr><th>Date</th>${BODY_FIELDS.map(([k,l])=>`<th class="r">${l.replace('Body ','')}</th>`).join('')}<th></th></tr></thead><tbody>
      ${body.slice(0,40).map(b=>`<tr><td class="num muted" style="white-space:nowrap">${shortDate(b.date)}</td>${BODY_FIELDS.map(([k])=>`<td class="r num">${b[k]!=null&&b[k]!==''?fmt(b[k]):''}</td>`).join('')}
        <td class="r">${confirmDel==='body:'+b.date?`<span class="confirm"><button class="btn small" data-act="body-del-yes" data-date="${esc(b.date)}">Delete</button><button class="link" data-act="cancel-confirm">Keep</button></span>`:`<button class="link" data-act="body-del" data-date="${esc(b.date)}">Delete</button>`}</td></tr>`).join('')}
    </tbody></table></div></div>`:''}
  </section>`;
}
function exerciseSeries(name){
  const pts=[];
  logs.slice().sort((a,b)=>a.date.localeCompare(b.date)).forEach(l=>l.exercises.forEach(e=>{
    if(e.name!==name)return;const done=e.sets.filter(s=>s.done);if(!done.length)return;
    const m=measureOf(e), maxW=Math.max(...done.map(s=>+s.weight||0));
    const v=m==='reps'&&maxW>0?maxW:Math.max(...done.map(s=>+s.reps||0));
    pts.push({date:l.date,v,kind:m==='reps'&&maxW>0?'w':m});
  }));
  const byDate={};pts.forEach(p=>{if(!byDate[p.date]||p.v>byDate[p.date].v)byDate[p.date]=p});
  return Object.values(byDate);
}
function exCard(){
  const names=[...new Set(logs.flatMap(l=>l.exercises.filter(e=>e.sets.some(s=>s.done)).map(e=>e.name)))].sort();
  if(!names.length) return '';
  if(!names.includes(exProg)) exProg=names[0];
  const pts=exerciseSeries(exProg), k=pts.at(-1)?.kind;
  const u=k==='w'?plan.unit:k==='secs'?'secs':k==='mins'?'mins':'reps';
  const what=k==='w'?'Heaviest set':k==='secs'||k==='mins'?'Longest set':'Most reps in a set';
  return `<div class="card"><div class="row spread" style="margin-bottom:8px"><div class="eyebrow">Exercise progress</div>
    <select id="exprog" aria-label="Exercise">${names.map(n=>`<option ${n===exProg?'selected':''}>${esc(n)}</option>`).join('')}</select></div>
    <div class="row" style="gap:12px;align-items:baseline;margin-bottom:6px"><span class="bigv num">${fmt(pts.at(-1).v)}<span style="font-size:1rem"> ${esc(u)}</span></span><span class="muted" style="font-size:.85rem">${what}, last session</span></div>
    <div class="chart">${lineChart(pts,u,exProg)}</div></div>`;
}
function lineChart(pts,u,label){
  const W=640,H=220,L=52,R=16,T=14,B=30;
  const t=p=>parseIso(p.date).getTime();
  const x0=t(pts[0]),x1=pts.length>1?t(pts.at(-1)):x0+864e5;
  let lo=Math.min(...pts.map(p=>p.v)),hi=Math.max(...pts.map(p=>p.v));
  if(lo===hi){lo-=Math.max(1,Math.abs(lo)*.05);hi+=Math.max(1,Math.abs(hi)*.05)}
  const step=niceStep((hi-lo)/4);lo=Math.floor(lo/step)*step;hi=Math.ceil(hi/step)*step;
  const X=p=>pts.length>1?L+(t(p)-x0)/(x1-x0)*(W-L-R):(L+W-R)/2, Y=v=>T+(H-T-B)*(1-(v-lo)/(hi-lo));
  let g='';for(let v=lo;v<=hi+1e-9;v+=step){g+=`<line x1="${L}" x2="${W-R}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)"/><text x="${L-8}" y="${Y(v)+4}" text-anchor="end" font-size="11" fill="var(--muted)" font-family="var(--mono)">${fmt(v)}</text>`}
  const lbl=[pts[0],pts.length>2?pts[Math.floor((pts.length-1)/2)]:null,pts.length>1?pts.at(-1):null].filter(Boolean);
  const xl=lbl.map((p,i)=>`<text x="${X(p)}" y="${H-8}" text-anchor="${pts.length===1?'middle':i===0?'start':i===lbl.length-1?'end':'middle'}" font-size="11" fill="var(--muted)" font-family="var(--mono)">${shortDate(p.date)}</text>`).join('');
  const path=pts.map((p,i)=>`${i?'L':'M'}${X(p).toFixed(1)} ${Y(p.v).toFixed(1)}`).join('');
  const dots=pts.map((p,i)=>`<circle cx="${X(p)}" cy="${Y(p.v)}" r="${i===pts.length-1?5:3.5}" fill="${i===pts.length-1?'var(--accent)':'var(--surface)'}" stroke="var(--accent)" stroke-width="2"><title>${shortDate(p.date)}: ${fmt(p.v)} ${u}</title></circle>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" style="min-width:420px" role="img" aria-label="${esc(label)} over time">${g}<path d="${path}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round"/>${dots}${xl}</svg>`;
}
const stat=(label,v,hot)=>`<div class="card stat"><div class="eyebrow">${label}</div><div class="v num ${hot?'hot':''}">${v}</div></div>`;
const shortDate=s=>parseIso(s).toLocaleDateString(undefined,{month:'short',day:'numeric'});
function chart(weeks,vol){
  const W=640,H=200,L=48,B=28,T=12,max=Math.max(...vol,1);
  const step=niceStep(max/4), top=Math.ceil(max/step)*step, bw=(W-L-8)/weeks.length;
  const y=v=>T+(H-T-B)*(1-v/top);
  let g='';for(let v=0;v<=top+1e-9;v+=step){g+=`<line x1="${L}" x2="${W-8}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)"/><text x="${L-8}" y="${y(v)+4}" text-anchor="end" font-size="11" fill="var(--muted)" font-family="var(--mono)">${v>=1000?fmt(v/1000)+'k':fmt(v)}</text>`}
  const bars=weeks.map((k,i)=>{const x=L+i*bw+bw*.18,w=bw*.64,h=(H-T-B)-(y(vol[i])-T),last=i===weeks.length-1;
    return `<rect x="${x}" y="${y(vol[i])}" width="${w}" height="${Math.max(0,h)}" rx="3" fill="${last?'var(--accent)':'var(--accent-soft)'}" ${last?'':'stroke="var(--accent)" stroke-opacity=".35"'}/><text x="${x+w/2}" y="${H-8}" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="var(--mono)">${shortDate(k)}</text>`}).join('');
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" style="min-width:420px" role="img" aria-label="Weekly training volume for the last 8 weeks">${g}${bars}</svg>`;
}
function niceStep(x){const p=Math.pow(10,Math.floor(Math.log10(x||1)));const n=x/p;return (n<=1?1:n<=2?2:n<=5?5:10)*p}

function render(){
  document.querySelectorAll('#tabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.tab===tab));
  const v={today:viewToday,week:viewWeek,workouts:viewWorkouts,library:viewLibrary,progress:viewProgress,body:viewBody}[tab]();
  $('#view').innerHTML=v;
  document.querySelectorAll('#view .chart').forEach(c=>c.scrollLeft=c.scrollWidth);
  if(readOnly) $('#view').querySelectorAll('input:not(#libq),select:not(#libm),button.btn,button.link').forEach(el=>{if(el.id!=='pick'&&!el.dataset.act?.startsWith('lib'))el.disabled=true});
}
function keepScroll(fn){const y=scrollY;fn();scrollTo(0,y)}

/* ---------- events ---------- */
$('#tabs').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;tab=b.dataset.tab;confirmDel=null;if(tab!=='library')lib.target=null;lsSet('rp.tab',tab);render()});
$('#view').addEventListener('input',e=>{
  if(e.target.id==='libq'){lib.q=e.target.value;lib.shown=40;const pos=e.target.selectionStart;render();const i=$('#libq');i.focus();i.setSelectionRange(pos,pos)}
});
$('#view').addEventListener('change',e=>{
  const el=e.target;
  if(el.id==='restore'){if(el.files[0])restoreBackup(el.files[0]);el.value='';return}
  if(el.id==='exprog'){exProg=el.value;keepScroll(render);return}
  if(el.id==='lenunit'){plan.lenUnit=el.value;savePlan();keepScroll(render);return}
  if(el.id==='bdate'){const b=body.find(x=>x.date===el.value)||{};BODY_FIELDS.forEach(([k])=>{const i=document.getElementById('b-'+k);if(i)i.value=b[k]??''});return}
  if(el.id==='libm'){lib.muscle=el.value;lib.shown=40;render();return}
  if(el.id==='pick'){todayPick=el.value||'';draft=el.value?newDraft(el.value):null;saveDraft();render();return}
  if(el.id==='restsel'){plan.rest=+el.value;savePlan();if(!plan.rest&&timer?.kind==='rest'){timer=null;tick()}return}
  if(el.dataset.set){const [ei,si,f]=el.dataset.set.split('.');const s=draft.exercises[ei].sets[si];
    s[f]=f==='done'?el.checked:Math.max(0,+el.value||0);saveDraft();
    if(f==='done'){keepScroll(render);if(el.checked&&draft.exercises.some(e=>e.sets.some(x=>!x.done)))startRest()}return}
  if(el.dataset.day){plan.week[el.dataset.day]=el.value||null;savePlan();render();return}
  if(el.id==='goal'){plan.goal=Math.min(14,Math.max(1,+el.value||1));savePlan();return}
  if(el.id==='unit'){plan.unit=el.value;savePlan();render();return}
  const card=el.closest('.tmpl');if(!card)return;
  const t=tmplById(card.dataset.t);
  if(el.dataset.tf==='name'){t.name=el.value.trim()||'Untitled workout';savePlan();return}
  const row=el.closest('.exrow');if(row&&el.dataset.ef){const x=t.exercises.find(q=>q.id===row.dataset.e);const f=el.dataset.ef;
    if(f==='measure'){x.measure=el.value;savePlan();keepScroll(render);return}
    x[f]=f==='name'?(el.value.trim()||'Exercise'):Math.max(f==='sets'?1:0,+el.value||0);savePlan()}
});
$('#view').addEventListener('click',async e=>{
  const o=e.target.closest('[data-open]');if(o){openSheet(o.dataset.open);return}
  const mt=e.target.closest('[data-metric]');if(mt){bodyMetric=mt.dataset.metric;keepScroll(render);return}
  const c=e.target.closest('[data-cat],[data-gear]');
  if(c){if(c.dataset.cat){lib.cat=c.dataset.cat}else{const g=c.dataset.gear;
      if(lib.allGear){lib.allGear=false;lib.gear=Object.keys(GEAR).filter(k=>k!==g)}
      else lib.gear=lib.gear.includes(g)?lib.gear.filter(k=>k!==g):[...lib.gear,g];
      if(!lib.gear.length)lib.gear=[g]}
    lib.shown=40;lsSet('rp.lib',{cat:lib.cat,gear:lib.gear});render();return}
  if(e.target.matches?.('input.check'))unlockAudio();
  const b=e.target.closest('[data-act]');if(!b||b.tagName==='SELECT'||b.tagName==='INPUT')return;
  const act=b.dataset.act, card=b.closest('.tmpl'), t=card&&tmplById(card.dataset.t);
  if(act==='lib-more'){lib.shown+=40;keepScroll(render);return}
  if(act==='lib-cancel'){const id=lib.target;lib.target=null;tab='workouts';render();setTimeout(()=>document.querySelector(`[data-t="${CSS.escape(id)}"]`)?.scrollIntoView({block:'center'}));return}
  if(act==='finish') return finishWorkout();
  if(act==='pick'){todayPick=b.dataset.id;draft=newDraft(todayPick);saveDraft();render();scrollTo(0,0);return}
  if(act==='bump'||act==='bump-skip'){const n=b.closest('.nudge');
    if(act==='bump')bump(n.dataset.tid,n.dataset.eid);
    else{const te=tmplById(n.dataset.tid)?.exercises.find(x=>x.id===n.dataset.eid);if(te)lsSet('rp.nudgeSkip',[...lsGet('rp.nudgeSkip',[]),`${te.id}:${te.weight}:${te.reps}`].slice(-200))}
    keepScroll(render);return}
  if(act==='warm-start'){unlockAudio();beep(1);startWarm(0);return}
  if(act==='warm-skip'){lsSet('rp.warm',todayIso());keepScroll(render);return}
  if(act==='backup'){exportBackup();return}
  if(act==='show-sets'){showSets=true;render();return}
  if(act==='did-it'){const t=tmplById(currentPick());if(t&&await logPlanned(t.id,todayIso(),true))render();return}
  if(act==='did-day'){const d=b.dataset.day,t=tmplById(plan.week[d]);const date=new Date(monday(new Date()));date.setDate(date.getDate()+DAYS.indexOf(d));
    if(t&&await logPlanned(t.id,iso(date),false))keepScroll(render);return}
  if(act==='phase-ask'){confirmDel='phase-up';keepScroll(render);return}
  if(act==='phase-up'){confirmDel=null;phaseUp();scrollTo(0,0);return}
  if(act==='body-save'){const date=$('#bdate').value||todayIso();const entry={date};let any=false;
    BODY_FIELDS.forEach(([k])=>{const v=document.getElementById('b-'+k).value;if(v!==''&&!isNaN(+v)){entry[k]=+v;any=true}});
    if(!any){toast('Enter at least one measurement');return}
    if(mode==='db'){try{await bodyCol.doc(date).set(entry)}catch(err){if(!onWriteErr(err))return}}
    if(mode==='local'){body=[entry,...body.filter(b=>b.date!==date)].sort((a,b)=>b.date.localeCompare(a.date));lsSet('rp.body',body)}
    const firstField=BODY_FIELDS.find(([k])=>entry[k]!=null);if(entry[bodyMetric]==null&&firstField)bodyMetric=firstField[0];
    toast('Measurements saved');keepScroll(render);return}
  if(act==='body-del'){confirmDel='body:'+b.dataset.date;keepScroll(render);return}
  if(act==='body-del-yes'){const d=b.dataset.date;confirmDel=null;
    if(mode==='db'){try{await bodyCol.doc(d).delete()}catch(err){if(!onWriteErr(err))return}}
    if(mode==='local'){body=body.filter(x=>x.date!==d);lsSet('rp.body',body);keepScroll(render)}
    toast('Entry deleted');return}
  if(act==='reset'){draft=newDraft(draft.templateId);saveDraft();render();return}
  if(act==='addtmpl'){const n={id:uid4(),name:'New workout',exercises:[]};plan.templates.push(n);savePlan();render();setTimeout(()=>{const i=document.getElementById('tn-'+n.id);i&&(i.focus(),i.select())});return}
  if(act==='addex'){const n=ex('Exercise',3,10,0,null);t.exercises.push(n);savePlan();keepScroll(render);setTimeout(()=>{const i=document.getElementById('en-'+n.id);i&&(i.focus({preventScroll:true}),i.select())});return}
  if(act==='addlib'){lib.target=t.id;tab='library';render();scrollTo(0,0);return}
  if(act==='delex'){const row=b.closest('.exrow');t.exercises=t.exercises.filter(x=>x.id!==row.dataset.e);savePlan();keepScroll(render);return}
  if(act==='deltmpl'){confirmDel=t.id;keepScroll(render);return}
  if(act==='cancel-confirm'){confirmDel=null;keepScroll(render);return}
  if(act==='deltmpl-yes'){plan.templates=plan.templates.filter(x=>x.id!==t.id);DAYS.forEach(d=>{if(plan.week[d]===t.id)plan.week[d]=null});confirmDel=null;savePlan();render();toast('Workout deleted');return}
  if(act==='resetplan'){confirmDel='reset-plan';render();return}
  if(act==='resetplan-yes'){plan=starterPlan();confirmDel=null;draft=null;todayPick=null;saveDraft();savePlan();render();toast('Starter plan loaded');return}
  if(act==='dellog'){confirmDel='log:'+b.dataset.id;keepScroll(render);return}
  if(act==='dellog-yes'){const id=b.dataset.id;confirmDel=null;
    if(mode==='db'){try{await logsCol.doc(id).delete()}catch(err){if(!onWriteErr(err))return}}
    if(mode==='local'){logs=logs.filter(l=>l.id!==id);lsSet('rp.logs',logs);render()}
    toast('Workout removed from history');return}
});
$('#sheet').addEventListener('click',e=>{
  const b=e.target.closest('[data-act]');
  if(!b){return}
  if(b.dataset.act==='sheet-close'&&(e.target===b||b.tagName==='BUTTON')){closeSheet();return}
  if(b.dataset.act==='video'){sheet.video=true;renderSheet();return}
  if(b.dataset.act==='demo-play'){sheet.play=sheet.play===false;renderSheet();return}
  if(b.dataset.act==='sheet-add'){const tid=$('#addto').value;addFromLibrary(sheet.id,tid);closeSheet();
    if(lib.target){render()}else if(tab!=='library'){keepScroll(render)}}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if($('#celebrate').innerHTML)$('#celebrate').innerHTML='';else if(sheet)closeSheet()}});
$('#timerbar').addEventListener('click',e=>{const b=e.target.closest('[data-tm]');if(!b||!timer)return;const a=b.dataset.tm;
  if(a==='minus'){timer.end-=15000;timer.total=Math.max(1,timer.total-15)}
  if(a==='plus'){timer.end+=15000;timer.total+=15}
  if(a==='next'){timer.end=Date.now()}
  if(a==='stop'){const w=timer.kind==='warm';timer=null;if(w){lsSet('rp.warm',todayIso());if(tab==='today')keepScroll(render)}}
  tick()});
$('#celebrate').addEventListener('click',e=>{const b=e.target.closest('[data-act="cel-close"]');if(b&&(e.target===b||b.tagName==='BUTTON'))$('#celebrate').innerHTML=''});

/* ---------- boot ---------- */
tab=lsGet('rp.tab','today'); if(!['today','week','workouts','library','progress','body'].includes(tab)) tab='today';
{const l=lsGet('rp.lib',null); if(l&&Array.isArray(l.gear)&&l.gear.length){lib.cat=CATS[l.cat]!==undefined?l.cat:'all';lib.gear=l.gear.filter(k=>GEAR[k])}}
draft=lsGet('rp.draft',null);
{const u=upgradePlan(lsGet('rp.plan',null)); plan=u.plan; if(u.changed){lsSet('rp.plan',plan);draft=null}}
logs=lsGet('rp.logs',[]);
body=lsGet('rp.body',[]);
setSync(); render(); checkMilestones(false);

/* ---------- exercise library + offline ---------- */
fetch('data/exercises.json').then(r=>r.json()).then(d=>{EX=d;EXBY=Object.fromEntries(EX.map(x=>[x.i,x]));MUSCLES=[...new Set(EX.flatMap(x=>x.p))].sort();if(!sheet)keepScroll(render)}).catch(()=>{});
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});
try{navigator.storage?.persist?.()}catch{}

/* ---------- backup ---------- */
function backupData(){return {app:'rep-planner',version:1,exportedAt:new Date().toISOString(),plan,logs,body}}
async function exportBackup(){
  const name=`rep-planner-backup-${todayIso()}.json`, text=JSON.stringify(backupData(),null,1);
  const file=new File([text],name,{type:'application/json'});
  try{if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],title:'Rep Planner backup'});lsSet('rp.lastBackup',todayIso());render();return}}catch(e){if(e&&e.name==='AbortError')return}
  const a=document.createElement('a');a.href=URL.createObjectURL(file);a.download=name;document.body.appendChild(a);a.click();a.remove();
  lsSet('rp.lastBackup',todayIso());render();
}
function restoreBackup(fileObj){
  const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(d.app!=='rep-planner'||!d.plan)throw 0;
    plan=upgradePlan(d.plan).plan;logs=Array.isArray(d.logs)?d.logs:[];body=Array.isArray(d.body)?d.body:[];
    lsSet('rp.plan',plan);lsSet('rp.logs',logs);lsSet('rp.body',body);draft=null;saveDraft();confirmDel=null;render();toast('Backup restored')}
    catch{toast('That file isn’t a Rep Planner backup')}};
  r.readAsText(fileObj);
}
