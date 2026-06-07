// ════════════════════════════════════════════════════════
// STATE
// ════════════════════════════════════════════════════════
const RIG = {
  root_name:"pelvis",
  bones:[
    {id:0,name:"pelvis",     parent:-1,length:0 },
    {id:1,name:"spine",      parent:0, length:14},
    {id:2,name:"head",       parent:1, length:8 },
    {id:3,name:"thigh_l",    parent:0, length:12},
    {id:4,name:"shin_l",     parent:3, length:10},
    {id:5,name:"thigh_r",    parent:0, length:12},
    {id:6,name:"shin_r",     parent:5, length:10},
    {id:7,name:"upper_arm_l",parent:1, length:10},
    {id:8,name:"forearm_l",  parent:7, length:8 },
    {id:9,name:"upper_arm_r",parent:1, length:10},
    {id:10,name:"forearm_r", parent:9, length:8 },
    {id:11,name:"sword_r",   parent:10,length:26},
    {id:12,name:"sword_l",   parent:8, length:26}
  ]
};

function cloneRig(r){return{root_name:r.root_name,bones:r.bones.map(b=>({...b}))}}
function cloneAnims(a){const o={};for(const k in a){o[k]={length_frames:a[k].length_frames,loop:a[k].loop,keyframes:{}};for(const f in a[k].keyframes)o[k].keyframes[f]=a[k].keyframes[f].map(e=>({...e}));}return o}

const DEFAULT_ANIMS = {
  idle:{length_frames:60,loop:true,keyframes:{
    "0":[{id:0,x:0,y:3,angle:0},{id:1,angle:270},{id:2,angle:0},{id:3,angle:100},{id:4,angle:-15},{id:5,angle:80},{id:6,angle:10},{id:7,angle:200},{id:8,angle:-10},{id:9,angle:160},{id:10,angle:10},{id:11,angle:0},{id:12,angle:0}],
    "30":[{id:0,x:0,y:4,angle:0},{id:1,angle:270},{id:2,angle:0},{id:3,angle:102},{id:4,angle:-14},{id:5,angle:78},{id:6,angle:11},{id:7,angle:202},{id:8,angle:-10},{id:9,angle:158},{id:10,angle:10},{id:11,angle:0},{id:12,angle:0}]
  }},
  run:{length_frames:20,loop:true,keyframes:{
    "0":[{id:0,x:0,y:3,angle:0},{id:1,angle:268},{id:2,angle:3},{id:3,angle:120},{id:4,angle:-50},{id:5,angle:60},{id:6,angle:-30},{id:7,angle:140},{id:8,angle:10},{id:9,angle:190},{id:10,angle:10},{id:11,angle:0},{id:12,angle:0}],
    "5":[{id:0,x:0,y:2,angle:0},{id:1,angle:270},{id:2,angle:0},{id:3,angle:95},{id:4,angle:-20},{id:5,angle:85},{id:6,angle:-20},{id:7,angle:170},{id:8,angle:10},{id:9,angle:170},{id:10,angle:10},{id:11,angle:0},{id:12,angle:0}],
    "10":[{id:0,x:0,y:3,angle:0},{id:1,angle:272},{id:2,angle:-3},{id:3,angle:60},{id:4,angle:-30},{id:5,angle:120},{id:6,angle:-50},{id:7,angle:190},{id:8,angle:10},{id:9,angle:140},{id:10,angle:10},{id:11,angle:0},{id:12,angle:0}],
    "15":[{id:0,x:0,y:2,angle:0},{id:1,angle:270},{id:2,angle:0},{id:3,angle:85},{id:4,angle:-20},{id:5,angle:95},{id:6,angle:-20},{id:7,angle:170},{id:8,angle:10},{id:9,angle:170},{id:10,angle:10},{id:11,angle:0},{id:12,angle:0}]
  }},
  jump:{length_frames:15,loop:false,keyframes:{
    "0":[{id:0,x:0,y:2,angle:0},{id:1,angle:265},{id:2,angle:5},{id:3,angle:110},{id:4,angle:30},{id:5,angle:70},{id:6,angle:-30},{id:7,angle:230},{id:8,angle:-20},{id:9,angle:130},{id:10,angle:20},{id:11,angle:0},{id:12,angle:0}],
    "14":[{id:0,x:0,y:3,angle:0},{id:1,angle:270},{id:2,angle:0},{id:3,angle:100},{id:4,angle:-40},{id:5,angle:80},{id:6,angle:-40},{id:7,angle:215},{id:8,angle:-10},{id:9,angle:145},{id:10,angle:10},{id:11,angle:0},{id:12,angle:0}]
  }},
  fall:{length_frames:10,loop:false,keyframes:{
    "0":[{id:0,x:0,y:3,angle:0},{id:1,angle:275},{id:2,angle:5},{id:3,angle:105},{id:4,angle:20},{id:5,angle:75},{id:6,angle:-20},{id:7,angle:210},{id:8,angle:350},{id:9,angle:150},{id:10,angle:10},{id:11,angle:0},{id:12,angle:0}]
  }},
  teleport:{length_frames:16,loop:false,keyframes:{
    "0":[{id:0,x:0,y:3,angle:0},{id:1,angle:270},{id:2,angle:0},{id:3,angle:100},{id:4,angle:-15},{id:5,angle:80},{id:6,angle:10},{id:7,angle:200},{id:8,angle:-10},{id:9,angle:160},{id:10,angle:10},{id:11,angle:0},{id:12,angle:0}],
    "5":[{id:0,x:0,y:1,angle:0},{id:1,angle:270},{id:2,angle:0},{id:3,angle:95},{id:4,angle:-5},{id:5,angle:85},{id:6,angle:5},{id:7,angle:355},{id:8,angle:-5},{id:9,angle:5},{id:10,angle:5},{id:11,angle:0},{id:12,angle:0}],
    "8":[{id:0,x:0,y:5,angle:0},{id:1,angle:270},{id:2,angle:0},{id:3,angle:130},{id:4,angle:-40},{id:5,angle:50},{id:6,angle:40},{id:7,angle:270},{id:8,angle:340},{id:9,angle:90},{id:10,angle:20},{id:11,angle:0},{id:12,angle:0}],
    "11":[{id:0,x:0,y:1,angle:0},{id:1,angle:270},{id:2,angle:0},{id:3,angle:95},{id:4,angle:-5},{id:5,angle:85},{id:6,angle:5},{id:7,angle:355},{id:8,angle:-5},{id:9,angle:5},{id:10,angle:5},{id:11,angle:0},{id:12,angle:0}],
    "15":[{id:0,x:0,y:3,angle:0},{id:1,angle:270},{id:2,angle:0},{id:3,angle:100},{id:4,angle:-15},{id:5,angle:80},{id:6,angle:10},{id:7,angle:200},{id:8,angle:-10},{id:9,angle:160},{id:10,angle:10},{id:11,angle:0},{id:12,angle:0}]
  }}
};

let rig = cloneRig(RIG);
let animations = cloneAnims(DEFAULT_ANIMS);
let curAnim = "idle", curFrame = 0, selBone = -1;
let playing = false, playTimer = null;

// View
let viewScale = 4.0, viewOX = 0, viewOY = 0;

// Drag state
let dragging = false, dragType = '';
let dragJX = 0, dragJY = 0;
let dragParentWorld = 0;
let dragMX = 0, dragMY = 0;
let dragStartRX = 0, dragStartRY = 0;
let dragKF_origFrame = 0, dragKF_startX = 0;

// Pan state
let panning = false, panMX = 0, panMY = 0, panOX = 0, panOY = 0;

// Timeline mode: 'scrub' or 'dragKF'
let timelineMode = 'dragKF';
let kfmDragging = false;
function toggleTimelineMode() {
  timelineMode = timelineMode === 'scrub' ? 'dragKF' : 'scrub';
  document.getElementById('tl-mode').textContent = timelineMode === 'scrub' ? '✋ Navegar' : '☝ Arrastrar FC';
  document.getElementById('tl-mode').className = 'btn small ' + (timelineMode === 'scrub' ? '' : 'accent');
}

// Copy buffer
let copiedPose = null;

// Undo/redo
let undoStack = [], redoStack = [];
const MAX_UNDO = 50;

function saveUndo() {
  undoStack.push({rig:cloneRig(rig),animations:cloneAnims(animations),curAnim,curFrame});
  if(undoStack.length>MAX_UNDO) undoStack.shift();
  redoStack = [];
}
function undo() {
  if(!undoStack.length) return;
  redoStack.push({rig:cloneRig(rig),animations:cloneAnims(animations),curAnim,curFrame});
  const s=undoStack.pop();
  rig=s.rig; animations=s.animations; curAnim=s.curAnim; curFrame=s.curFrame;
  selBone=-1; refreshUI(); updateInspector(); draw(); toast('Deshecho');
}
function redo() {
  if(!redoStack.length) return;
  undoStack.push({rig:cloneRig(rig),animations:cloneAnims(animations),curAnim,curFrame});
  const s=redoStack.pop();
  rig=s.rig; animations=s.animations; curAnim=s.curAnim; curFrame=s.curFrame;
  selBone=-1; refreshUI(); updateInspector(); draw(); toast('Rehecho');
}

// Auto-save
const AUTO_SAVE_KEY = 'animador_auto_save';
function autoSave() {
  try {
    const data = {rig,animations,curAnim,curFrame,viewScale,viewOX,viewOY};
    localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(data));
  } catch(_) {}
}
function autoLoad() {
  try {
    const raw = localStorage.getItem(AUTO_SAVE_KEY);
    if(!raw) return false;
    const data = JSON.parse(raw);
    if(data.rig) rig = data.rig;
    if(data.animations) animations = data.animations;
    if(data.curAnim && animations[data.curAnim]) curAnim = data.curAnim;
    if(typeof data.curFrame==='number') curFrame = data.curFrame;
    if(typeof data.viewScale==='number') viewScale = data.viewScale;
    if(typeof data.viewOX==='number') viewOX = data.viewOX;
    if(typeof data.viewOY==='number') viewOY = data.viewOY;
    return true;
  } catch(_) { return false; }
}
setInterval(autoSave, 15000);

// Toast
let toastTimer = null;
function toast(msg) {
  const el=document.getElementById('toast');
  el.textContent=msg; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('show'),2000);
}

// ════════════════════════════════════════════════════════
// MATH / FK HELPERS
// ════════════════════════════════════════════════════════
const d2r = d => d * Math.PI / 180;
const r2d = r => r * 180 / Math.PI;
const ldx = (l,d) => l * Math.cos(d2r(d));
const ldy = (l,d) => l * Math.sin(d2r(d));
function lerpAngle(a,b,t){ const d=((b-a)%360+540)%360-180; return a+d*t; }

function getPoses(animName, frame) {
  const anim = animations[animName]; if(!anim) return [];
  const nb = rig.bones.length;
  const out = Array.from({length:nb},()=>({x:0,y:0,angle:0}));
  const times = Object.keys(anim.keyframes).map(Number).sort((a,b)=>a-b);
  if(!times.length) return out;
  const len = anim.length_frames;
  let f = anim.loop ? ((frame%len)+len)%len : Math.max(0,Math.min(frame,len-1));
  let pt=times[0], nt=times[times.length-1], lt=0;
  if(f<=times[0]){
    pt=times[times.length-1]; nt=times[0];
    const gap=(len-pt)+nt; lt=gap>0?((f+len-pt)%len)/gap:0;
  } else if(f>=times[times.length-1]){ pt=nt=times[times.length-1]; lt=0; }
  else { for(let i=0;i<times.length-1;i++){ if(times[i]<=f&&f<times[i+1]){pt=times[i];nt=times[i+1];lt=(f-pt)/(nt-pt);break;} } }
  const bm=kf=>{const m={};(kf||[]).forEach(b=>m[b.id]=b);return m;};
  const pm=bm(anim.keyframes[String(Math.round(pt))]);
  const nm=bm(anim.keyframes[String(Math.round(nt))]);
  for(let i=0;i<nb;i++){
    const b=rig.bones[i];
    const p=pm[b.id]||{x:0,y:0,angle:0}, n=nm[b.id]||p;
    out[i]={x:((p.x??0)*(1-lt)+(n.x??0)*lt), y:((p.y??0)*(1-lt)+(n.y??0)*lt), angle:lerpAngle(p.angle??0,n.angle??0,lt)};
  }
  return out;
}

function solveFK(poses, scale) {
  if(scale===undefined) scale=viewScale;
  const nb=rig.bones.length;
  const wa=new Array(nb).fill(0), sx=new Array(nb).fill(0), sy=new Array(nb).fill(0);
  const ex=new Array(nb).fill(0), ey=new Array(nb).fill(0);
  const cx=canvas.width/2+viewOX, cy=canvas.height/2+viewOY;
  for(let i=0;i<nb;i++){
    const b=rig.bones[i], p=poses[i]||{x:0,y:0,angle:0};
    if(b.parent===-1){ sx[i]=cx+(p.x??0)*scale; sy[i]=cy+(p.y??0)*scale; wa[i]=p.angle??0; }
    else { const pr=b.parent; sx[i]=ex[pr]; sy[i]=ey[pr]; wa[i]=wa[pr]+(p.angle??0); }
    ex[i]=sx[i]+ldx(b.length*scale,wa[i]);
    ey[i]=sy[i]+ldy(b.length*scale,wa[i]);
  }
  return rig.bones.map((b,i)=>({id:b.id,name:b.name,sx:sx[i],sy:sy[i],ex:ex[i],ey:ey[i],wa:wa[i],par:b.parent,len:b.length,idx:i}));
}

// ════════════════════════════════════════════════════════
// CANVAS
// ════════════════════════════════════════════════════════
const canvas=document.getElementById('c'), ctx=canvas.getContext('2d');

function resize(){ const w=document.getElementById('canvas-wrap'); canvas.width=w.clientWidth; canvas.height=w.clientHeight; draw(); }
window.addEventListener('resize',resize);

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const cx=canvas.width/2+viewOX, cy=canvas.height/2+viewOY;
  const gs=16*viewScale;

  // Grid
  ctx.strokeStyle='#181822'; ctx.lineWidth=1;
  ctx.beginPath();
  for(let x=(cx%gs+gs)%gs;x<canvas.width;x+=gs){ctx.moveTo(x,0);ctx.lineTo(x,canvas.height);}
  for(let y=(cy%gs+gs)%gs;y<canvas.height;y+=gs){ctx.moveTo(0,y);ctx.lineTo(canvas.width,y);}
  ctx.stroke();

  // Origin cross
  ctx.strokeStyle='#2a2a4a'; ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(cx-20,cy);ctx.lineTo(cx+20,cy);ctx.stroke();
  ctx.beginPath();ctx.moveTo(cx,cy-20);ctx.lineTo(cx,cy+20);ctx.stroke();

  const poses=getPoses(curAnim,curFrame);
  const joints=solveFK(poses,viewScale);

  // ── Onion skin (previous/next frames) ──
  const onionPrev=document.getElementById('onion-prev').checked;
  const onionNext=document.getElementById('onion-next').checked;
  const onionAlpha=parseInt(document.getElementById('onion-alpha').value)/100;
  if(onionPrev||onionNext){
    const anim=animations[curAnim];
    let pf=curFrame-1, nf=curFrame+1;
    if(anim.loop){
      const len=anim.length_frames;
      pf=((pf%len)+len)%len; nf=((nf%len)+len)%len;
    } else {
      pf=Math.max(0,pf); nf=Math.min(nf,anim.length_frames-1);
    }
    if(onionPrev&&pf!==curFrame){
      const pposes=getPoses(curAnim,pf);
      const pjoints=solveFK(pposes,viewScale);
      drawSkeleton(pjoints,0x00dcdc,onionAlpha,true);
    }
    if(onionNext&&nf!==curFrame){
      const nposes=getPoses(curAnim,nf);
      const njoints=solveFK(nposes,viewScale);
      drawSkeleton(njoints,0xffff00,onionAlpha,true);
    }
  }

  // ── Main skeleton ──
  drawSkeleton(joints,0x00dcdc,1.0,false);
  drawSwords(joints);
  drawJoints(joints);
  drawBranchRings(joints);

  // Dotted arc during bone-end drag
  if(dragging && selBone>=0 && dragType==='end'){
    const bone=rig.bones.find(b=>b.id===selBone);
    if(bone&&bone.length>0){
      const j=joints.find(jj=>jj.id===selBone);
      if(j){
        ctx.strokeStyle='rgba(0,220,220,0.10)'; ctx.setLineDash([3,4]);
        ctx.beginPath(); ctx.arc(j.sx,j.sy,bone.length*viewScale,0,Math.PI*2); ctx.stroke();
        ctx.setLineDash([]);
      }
    }
  }

  // Selected bone label
  if(selBone>=0){
    const j=joints.find(jj=>jj.id===selBone);
    if(j){
      ctx.fillStyle='#ffff00'; ctx.font='11px monospace'; ctx.textAlign='center';
      ctx.fillText(j.name,(j.sx+j.ex)/2,(j.sy+j.ey)/2-12);
    }
  }
}

function drawSkeleton(joints,color,alpha,onion) {
  joints.forEach(j=>{
    if(j.name==='sword_r'||j.name==='sword_l') return;
    const bone=rig.bones[j.idx];
    if(!bone||bone.length<=0) return;
    const sel=j.id===selBone;
    const r=(color>>16)&0xff, g=(color>>8)&0xff, b=color&0xff;
    if(onion){
      ctx.strokeStyle=`rgba(${r},${g},${b},${alpha*0.5})`;
      ctx.lineWidth=1.5;
    } else if(sel){
      ctx.strokeStyle='#ffff00'; ctx.lineWidth=3;
      ctx.shadowColor='rgba(255,255,0,0.5)'; ctx.shadowBlur=8;
    } else {
      ctx.strokeStyle=`rgb(${r},${g},${b})`;
      ctx.lineWidth=2;
      ctx.shadowColor=`rgba(${r},${g},${b},0.3)`; ctx.shadowBlur=4;
    }
    ctx.beginPath(); ctx.moveTo(j.sx,j.sy); ctx.lineTo(j.ex,j.ey); ctx.stroke();
    ctx.shadowBlur=0;
  });
}

function drawSwords(joints) {
  joints.forEach(j=>{
    if(j.name!=='sword_r'&&j.name!=='sword_l') return;
    const isBlue=j.name==='sword_r';
    const bladeCol=isBlue?'#00dcdc':'#ffff00';
    const handleCol=isBlue?'#008888':'#aaaa00';
    const hx=j.sx, hy=j.sy, tx=j.ex, ty=j.ey;
    const hd=r2d(Math.atan2(ty-hy,tx-hx));
    // Blade
    ctx.strokeStyle=bladeCol;
    ctx.lineWidth=2.5;
    ctx.shadowColor=bladeCol+'55';
    ctx.shadowBlur=5;
    ctx.beginPath(); ctx.moveTo(hx,hy); ctx.lineTo(tx,ty); ctx.stroke();
    // Crossguard
    ctx.strokeStyle=handleCol;
    ctx.lineWidth=2;
    ctx.shadowBlur=0;
    const cg=4*viewScale;
    ctx.beginPath();
    ctx.moveTo(hx+ldx(cg,hd+90), hy+ldy(cg,hd+90));
    ctx.lineTo(hx+ldx(cg,hd-90), hy+ldy(cg,hd-90));
    ctx.stroke();
    // Handle
    ctx.lineWidth=2.5;
    const hl=5*viewScale;
    ctx.beginPath();
    ctx.moveTo(hx,hy);
    ctx.lineTo(hx-ldx(hl,hd), hy-ldy(hl,hd));
    ctx.stroke();
    // Tip dot
    ctx.fillStyle='#ffffff';
    ctx.shadowColor='rgba(255,255,255,0.5)';
    ctx.shadowBlur=3;
    ctx.beginPath(); ctx.arc(tx,ty,2.5,0,Math.PI*2); ctx.fill();
    ctx.shadowBlur=0;
  });
}

function drawJoints(joints) {
  joints.forEach(j=>{
    if(j.name==='sword_r'||j.name==='sword_l') return;
    const sel=j.id===selBone;
    ctx.fillStyle=sel?'#ffff00':'#c8c8e0';
    ctx.shadowColor=sel?'rgba(255,255,0,0.4)':'rgba(255,255,255,0.15)';
    ctx.shadowBlur=sel?5:2;
    if(j.name==='head'){
      ctx.beginPath(); ctx.arc(j.ex,j.ey,7*viewScale/3.5,0,Math.PI*2); ctx.fill();
    } else {
      ctx.beginPath(); ctx.arc(j.sx,j.sy,3,0,Math.PI*2); ctx.fill();
    }
    ctx.shadowBlur=0;
    if(['shin_l','shin_r','forearm_l','forearm_r'].includes(j.name)){
      ctx.beginPath(); ctx.arc(j.ex,j.ey,3,0,Math.PI*2); ctx.fill();
    }
  });
}

function drawBranchRings(joints) {
  joints.forEach(j=>{
    const hasChild=rig.bones.some(b=>b.parent===j.id);
    if(!hasChild||j.name==='head') return;
    if(j.name==='sword_r'||j.name==='sword_l') return;
    const sel=j.id===selBone;
    ctx.fillStyle=sel?'rgba(255,255,0,0.18)':'rgba(0,220,220,0.12)';
    ctx.beginPath(); ctx.arc(j.ex,j.ey,5,0,Math.PI*2); ctx.fill();
    ctx.fillStyle=sel?'#ffff00':'#00dcdc';
    ctx.beginPath(); ctx.arc(j.ex,j.ey,1.5,0,Math.PI*2); ctx.fill();
  });
}

// ════════════════════════════════════════════════════════
// HIT TEST
// ════════════════════════════════════════════════════════
function hitTest(mx,my){
  const poses=getPoses(curAnim,curFrame); const joints=solveFK(poses,viewScale);
  let bestId=-1,bestD=14;
  joints.forEach(j=>{
    let d=Math.hypot(mx-j.sx,my-j.sy); if(d<bestD){bestD=d;bestId=j.id;}
    d=Math.hypot(mx-j.ex,my-j.ey); if(d<bestD){bestD=d;bestId=j.id;}
    if(j.len>0){const l2=(j.ex-j.sx)**2+(j.ey-j.sy)**2;if(l2>0){let t=((mx-j.sx)*(j.ex-j.sx)+(my-j.sy)*(j.ey-j.sy))/l2;t=Math.max(0,Math.min(1,t));d=Math.hypot(mx-(j.sx+t*(j.ex-j.sx)),my-(j.sy+t*(j.ey-j.sy)));if(d<bestD){bestD=d;bestId=j.id;}}}
  });
  // Click on child bone start → select parent
  if(bestId>=0){
    const j=joints.find(jj=>jj.id===bestId);
    if(j&&Math.hypot(mx-j.sx,my-j.sy)<8&&j.par>=0) bestId=j.par;
  }
  return bestId;
}

// ════════════════════════════════════════════════════════
// MOUSE
// ════════════════════════════════════════════════════════
canvas.addEventListener('mousedown',e=>{
  const r=canvas.getBoundingClientRect(), mx=e.clientX-r.left, my=e.clientY-r.top;
  if(e.button===1){ // middle mouse = pan
    panning=true; panMX=mx; panMY=my; panOX=viewOX; panOY=viewOY;
    e.preventDefault(); return;
  }
  if(e.button===2) return; // handled by contextmenu
  const h=hitTest(mx,my);
  if(h>=0){
    selBone=h; updateInspector(); updateTree();
    dragging=true;
    const poses=getPoses(curAnim,curFrame); const joints=solveFK(poses,viewScale);
    const j=joints.find(jj=>jj.id===h);
    const bone=rig.bones.find(b=>b.id===h);
    if(bone&&bone.parent===-1){
      dragType='root';
      dragJX=j?j.sx:0; dragJY=j?j.sy:0;
      dragMX=mx; dragMY=my;
      const p=getCurrentBonePose(h);
      dragStartRX=p.x??0; dragStartRY=p.y??0;
    } else {
      dragType='end';
      dragJX=j?j.sx:0; dragJY=j?j.sy:0;
      dragParentWorld=(bone&&bone.parent>=0)?(joints.find(jj=>jj.id===bone.parent)?.wa??0):0;
    }
  } else { selBone=-1; dragging=false; updateInspector(); updateTree(); }
  draw();
});

canvas.addEventListener('mousemove',e=>{
  const r=canvas.getBoundingClientRect(), mx=e.clientX-r.left, my=e.clientY-r.top;
  if(panning){
    viewOX=panOX+(mx-panMX); viewOY=panOY+(my-panMY); draw(); return;
  }
  if(!dragging||selBone<0) return;
  const bone=rig.bones.find(b=>b.id===selBone); if(!bone) return;
  if(dragType==='root'){
    const dx=(mx-dragMX)/viewScale, dy=(my-dragMY)/viewScale;
    setBoneKFRootXY(selBone,Math.round((dragStartRX+dx)*10)/10,Math.round((dragStartRY+dy)*10)/10);
    updateInspector(); draw();
  } else if(dragType==='end'){
    const rawWorld=r2d(Math.atan2(my-dragJY,mx-dragJX));
    const local=bone.parent===-1?rawWorld:rawWorld-dragParentWorld;
    setBoneKF(selBone,Math.round(local*2)/2);
    updateInspector(); draw();
  }
});

canvas.addEventListener('mouseup',e=>{if(e.button!==0)return;if(dragging&&selBone>=0)saveUndo();dragging=false;panning=false;});
canvas.addEventListener('mouseleave',()=>{dragging=false;panning=false;});

canvas.addEventListener('wheel',e=>{
  e.preventDefault();
  if(e.ctrlKey||e.metaKey){
    // Zoom with Ctrl
    const d=e.deltaY>0?0.9:1.1;
    viewScale=Math.max(0.5,Math.min(20,viewScale*d));
  } else if(selBone>=0){
    const d=e.deltaY>0?-1:1;
    const p=getCurrentBonePose(selBone);
    setBoneKF(selBone,(p.angle??0)+d);
    updateInspector();
  }
  draw();
},{passive:false});

// Right-click context menu
canvas.addEventListener('contextmenu',e=>{
  e.preventDefault(); e.stopPropagation();
  const r=canvas.getBoundingClientRect(), mx=e.clientX-r.left, my=e.clientY-r.top;
  const h=hitTest(mx,my);
  if(h>=0){
    selBone=h; updateInspector(); updateTree();
    showContextMenu(e.clientX,e.clientY,[
      {label:'Copiar Pose de este hueso',action:()=>{
        const p=getCurrentBonePose(selBone);
        copiedPose={id:selBone,angle:p.angle??0}; if(rig.bones.find(b=>b.id===selBone)?.parent===-1){copiedPose.x=p.x??0;copiedPose.y=p.y??0;}
        toast('Pose copiada'); hideContextMenu();
      }},
      {label:'Pegar Pose en este hueso',action:()=>{
        if(!copiedPose){toast('No hay pose copiada');return;}
        setBoneKF(selBone,copiedPose.angle);
        const bone=rig.bones.find(b=>b.id===selBone);
        if(bone&&bone.parent===-1&&copiedPose.x!==undefined){
          setBoneKFRootXY(selBone,copiedPose.x,copiedPose.y);
        }
        saveUndo(); updateInspector(); draw(); toast('Pose pegada'); hideContextMenu();
      }},
      {sep:true},
      {label:'Añadir Fotograma Clave',action:()=>{addKF();hideContextMenu();}},
      {label:'Eliminar Fotograma Clave',action:()=>{delKF();hideContextMenu();}}
    ]);
  } else {
    showContextMenu(e.clientX,e.clientY,[
      {label:'Añadir Fotograma Clave',action:()=>{addKF();hideContextMenu();}},
      {label:'Copiar Pose completa',action:()=>{
        const poses=getPoses(curAnim,curFrame);
        copiedPose=poses.map((p,i)=>({id:rig.bones[i].id,angle:p.angle??0,x:p.x??0,y:p.y??0}));
        toast('Pose completa copiada'); hideContextMenu();
      }},
      {label:'Pegar Pose completa',action:()=>{
        if(!copiedPose||!Array.isArray(copiedPose)){toast('No hay pose copiada');return;}
        const kf=getOrCreateKF();
        copiedPose.forEach(cp=>{
          let e=kf.find(ee=>ee.id===cp.id);
          if(e){e.angle=cp.angle;if(cp.x!==undefined){e.x=cp.x;e.y=cp.y;}}
          else{kf.push({...cp});}
        });
        saveUndo(); updateInspector(); draw(); toast('Pose pegada'); hideContextMenu();
      }},
      {sep:true},
      {label:'Restablecer Vista',action:()=>{viewScale=4.0;viewOX=0;viewOY=0;draw();hideContextMenu();}}
    ]);
  }
});

// ── Context menu implementation ──
const ctxMenu=document.getElementById('ctx-menu');
function showContextMenu(px,py,items){
  ctxMenu.innerHTML='';
  items.forEach(item=>{
    if(item.sep){const d=document.createElement('div');d.className='ctx-sep';ctxMenu.appendChild(d);return;}
    const el=document.createElement('div');el.className='ctx-item';el.textContent=item.label;
    if(item.disabled)el.classList.add('disabled');
    else el.onclick=item.action;
    ctxMenu.appendChild(el);
  });
  ctxMenu.style.display='block';
  // Keep within viewport
  const mr=ctxMenu.getBoundingClientRect();
  if(px+mr.width>window.innerWidth) px=window.innerWidth-mr.width-5;
  if(py+mr.height>window.innerHeight) py=window.innerHeight-mr.height-5;
  ctxMenu.style.left=px+'px'; ctxMenu.style.top=py+'px';
}
document.addEventListener('click',e=>{if(e.button!==2)hideContextMenu();});
document.addEventListener('contextmenu',e=>{
  // Suppress native browser menu everywhere in the tool
  if(!ctxMenu.contains(e.target)) e.preventDefault();
});
function hideContextMenu(){ctxMenu.style.display='none';}

// ════════════════════════════════════════════════════════
// KEYFRAME EDITING
// ════════════════════════════════════════════════════════
function getOrCreateKF(){
  const anim=animations[curAnim], key=String(Math.round(curFrame));
  if(!anim.keyframes[key]){
    const poses=getPoses(curAnim,curFrame);
    anim.keyframes[key]=rig.bones.map((b,i)=>{
      const p=poses[i]||{x:0,y:0,angle:0};
      const e={id:b.id,angle:Math.round(p.angle*10)/10};
      if(b.parent===-1){e.x=Math.round(p.x*10)/10;e.y=Math.round(p.y*10)/10;}
      return e;
    });
  }
  updateTimeline(); return anim.keyframes[key];
}

function getCurrentBonePose(boneId){
  const key=String(Math.round(curFrame));
  const kf=animations[curAnim].keyframes[key];
  if(kf){const e=kf.find(e=>e.id===boneId);if(e)return e;}
  const poses=getPoses(curAnim,curFrame);
  const bi=rig.bones.findIndex(b=>b.id===boneId);
  return poses[bi]||{x:0,y:0,angle:0};
}

function setBoneKF(boneId,angle){
  const kf=getOrCreateKF();
  const e=kf.find(e=>e.id===boneId);
  if(e){e.angle=angle;}
  else{const b=rig.bones.find(b=>b.id===boneId);const ne={id:boneId,angle};if(b&&b.parent===-1){ne.x=0;ne.y=0;}kf.push(ne);}
  updateTimeline();
}

function setBoneKFRootXY(boneId,x,y){
  const kf=getOrCreateKF();
  let e=kf.find(entry=>entry.id===boneId);
  if(e){e.x=x;e.y=y;}
  else{kf.push({id:boneId,angle:0,x,y});}
  updateTimeline();
}

function addKF(){saveUndo();getOrCreateKF();draw();toast('FC añadido');}
function delKF(){
  const key=String(Math.round(curFrame));
  if(animations[curAnim].keyframes[key]){saveUndo();delete animations[curAnim].keyframes[key];updateTimeline();draw();toast('FC eliminado');}
  else{toast('No hay FC en este fotograma');}
}

function prevKF(){
  const anim=animations[curAnim];
  const times=Object.keys(anim.keyframes).map(Number).sort((a,b)=>a-b);
  if(!times.length) return;
  let prev=times[0];
  for(const t of times){if(t<curFrame)prev=t;else break;}
  curFrame=prev; updateTimeline(); draw();
}
function nextKF(){
  const anim=animations[curAnim];
  const times=Object.keys(anim.keyframes).map(Number).sort((a,b)=>a-b);
  if(!times.length) return;
  let next=times[times.length-1];
  for(const t of times){if(t>curFrame){next=t;break;}}
  curFrame=next; updateTimeline(); draw();
}

// Copy/paste pose
function copyPose(){
  const poses=getPoses(curAnim,curFrame);
  copiedPose=poses.map((p,i)=>({id:rig.bones[i].id,angle:p.angle??0,x:p.x??0,y:p.y??0}));
  toast('Pose copiada');
}
function pastePose(){
  if(!copiedPose||!Array.isArray(copiedPose)){toast('No hay pose copiada');return;}
  saveUndo();
  const kf=getOrCreateKF();
  copiedPose.forEach(cp=>{
    let e=kf.find(ee=>ee.id===cp.id);
    if(e){e.angle=cp.angle;if(cp.x!==undefined){e.x=cp.x;e.y=cp.y;}}
    else{kf.push({...cp});}
  });
  updateInspector(); draw(); toast('Pose pegada');
}

// ════════════════════════════════════════════════════════
// TIMELINE
// ════════════════════════════════════════════════════════
const tlBar=document.getElementById('tl-bar');
function updateTimeline(){
  const anim=animations[curAnim], len=anim.length_frames;
  const pct=(curFrame/len)*100;
  document.getElementById('tl-prog').style.width=pct+'%';
  document.getElementById('tl-head').style.left=pct+'%';
  document.getElementById('frame-disp').textContent='FC: '+Math.round(curFrame)+' / '+len;
  const kfsDiv=document.getElementById('tl-kfs'); kfsDiv.innerHTML='';
  Object.keys(anim.keyframes).map(Number).sort((a,b)=>a-b).forEach(t=>{
    const mk=document.createElement('div');
    mk.className='kfm'+(Math.round(t)===Math.round(curFrame)?' sel':'');
    mk.style.left=((t/len)*100)+'%';
    mk.dataset.frame=t;
    kfsDiv.appendChild(mk);
  });
}

// Timeline click scrub
tlBar.addEventListener('mousedown',e=>{
  const target=e.target;
  // Only drag keyframes when in dragKF mode; otherwise always scrub
  if(timelineMode==='dragKF' && target.classList.contains('kfm')){
    // Draggable keyframe — won't call updateTimeline() during drag
    // so the target DOM element stays alive
    const frame=parseFloat(target.dataset.frame);
    curFrame=Math.round(frame);
    // Manual visual update — no DOM rebuild, so target stays alive
    const animStart=animations[curAnim];
    const lenStart=animStart.length_frames;
    const pctStart=(curFrame/lenStart)*100;
    document.getElementById('tl-prog').style.width=pctStart+'%';
    document.getElementById('tl-head').style.left=pctStart+'%';
    document.getElementById('frame-disp').textContent='FC: '+Math.round(curFrame)+' / '+lenStart;
    document.querySelectorAll('#tl-kfs .kfm').forEach(el=>el.classList.remove('sel'));
    target.classList.add('sel');
    draw();
    kfmDragging = true;
    const onMove=me=>{
      const r=tlBar.getBoundingClientRect();
      let t=Math.max(0,Math.min(1,(me.clientX-r.left)/r.width));
      let newFrame=Math.round(t*animations[curAnim].length_frames);
      if(newFrame!==curFrame){
        const anim=animations[curAnim];
        const oldKey=String(Math.round(curFrame));
        const newKey=String(newFrame);
        if(anim.keyframes[oldKey]){
          if(anim.keyframes[newKey]&&newKey!==oldKey){
            anim.keyframes[newKey]=anim.keyframes[oldKey];
          } else {
            anim.keyframes[newKey]=anim.keyframes[oldKey];
          }
          if(newKey!==oldKey) delete anim.keyframes[oldKey];
        }
        curFrame=newFrame;
        // Manual visual update — no DOM rebuild, so target stays valid
        const len=animations[curAnim].length_frames;
        const pct=(curFrame/len)*100;
        document.getElementById('tl-prog').style.width=pct+'%';
        document.getElementById('tl-head').style.left=pct+'%';
        document.getElementById('frame-disp').textContent='FC: '+Math.round(curFrame)+' / '+len;
        target.style.left=pct+'%';
        target.classList.add('dragging');
        draw();
      }
    };
    const onUp=()=>{
      document.removeEventListener('mousemove',onMove);
      document.removeEventListener('mouseup',onUp);
      target.classList.remove('dragging'); kfmDragging = false;
      updateTimeline(); // rebuild DOM cleanly once at the end
      saveUndo();
    };
    document.addEventListener('mousemove',onMove);
    document.addEventListener('mouseup',onUp);
    return;
  }
  scrub(e);
});
tlBar.addEventListener('mousemove',e=>{if(e.buttons===1&&!kfmDragging)scrub(e);});
function scrub(e){
  const r=tlBar.getBoundingClientRect();
  const t=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));
  curFrame=Math.round(t*animations[curAnim].length_frames);
  updateTimeline(); draw();
}

// ════════════════════════════════════════════════════════
// PLAYBACK
// ════════════════════════════════════════════════════════
function togglePlay(){
  playing=!playing;
  document.getElementById('btn-play').textContent=playing?'⏸':'▶';
  if(playing){playTimer=setInterval(()=>{
    curFrame=(curFrame+1)%animations[curAnim].length_frames;
    updateTimeline(); draw();
  },1000/30);}
  else clearInterval(playTimer);
}

// ════════════════════════════════════════════════════════
// ANIMATION MANAGEMENT
// ════════════════════════════════════════════════════════
function refreshUI(){
  const sel=document.getElementById('sel-anim');
  sel.innerHTML=Object.keys(animations).map(n=>`<option value="${n}"${n===curAnim?' selected':''}>${n}</option>`).join('');
  const anim=animations[curAnim];
  document.getElementById('a-len').value=anim.length_frames;
  document.getElementById('a-loop').checked=anim.loop;
  const np=document.getElementById('nb-parent');
  np.innerHTML=rig.bones.map(b=>`<option value="${b.id}">${b.name}</option>`).join('');
  updateTimeline(); updateTree();
}

function switchAnim(){curAnim=document.getElementById('sel-anim').value;curFrame=0;selBone=-1;refreshUI();updateInspector();draw();}
function applyAnimMeta(){saveUndo();const a=animations[curAnim];a.length_frames=parseInt(document.getElementById('a-len').value)||60;a.loop=document.getElementById('a-loop').checked;updateTimeline();}
function newAnim(){const n=prompt('Nombre de la animación:','new_anim');if(!n)return;saveUndo();animations[n]={length_frames:30,loop:true,keyframes:{}};curAnim=n;curFrame=0;selBone=-1;refreshUI();updateInspector();draw();toast('Animación creada');}
function delAnim(){if(Object.keys(animations).length<=1){alert('No se puede eliminar la última animación.');return;}if(!confirm(`¿Eliminar "${curAnim}"?`))return;saveUndo();delete animations[curAnim];curAnim=Object.keys(animations)[0];curFrame=0;selBone=-1;refreshUI();updateInspector();draw();toast('Animación eliminada');}

// ════════════════════════════════════════════════════════
// BONE MANAGEMENT
// ════════════════════════════════════════════════════════
function addBone(){
  const nm=document.getElementById('nb-name').value.trim();if(!nm){alert('Introduce un nombre.');return;}
  if(rig.bones.find(b=>b.name===nm)){alert('El nombre ya existe.');return;}
  const par=parseInt(document.getElementById('nb-parent').value);
  const len=parseFloat(document.getElementById('nb-len').value)||10;
  const nid=rig.bones.reduce((m,b)=>Math.max(m,b.id),-1)+1;
  saveUndo();
  rig.bones.push({id:nid,name:nm,parent:par,length:len});
  refreshUI(); draw(); toast('Hueso añadido');
}

function deleteBone(){
  if(selBone<0){alert('Selecciona primero un hueso.');return;}
  const bone=rig.bones.find(b=>b.id===selBone);if(!bone)return;
  if(bone.parent===-1){alert('No se puede eliminar el hueso raíz.');return;}
  if(rig.bones.find(b=>b.parent===selBone)){alert('Elimina primero los hijos.');return;}
  if(!confirm(`¿Eliminar hueso "${bone.name}"?`))return;
  saveUndo();
  rig.bones=rig.bones.filter(b=>b.id!==selBone);
  for(const an in animations)for(const k in animations[an].keyframes)
    animations[an].keyframes[k]=animations[an].keyframes[k].filter(e=>e.id!==selBone);
  selBone=-1; updateInspector(); refreshUI(); draw(); toast('Hueso eliminado');
}

// ════════════════════════════════════════════════════════
// BONE TREE VIEW
// ════════════════════════════════════════════════════════
function buildTree(parentId,depth){
  const children=rig.bones.filter(b=>b.parent===parentId);
  let html='';
  children.forEach(b=>{
    const sel=b.id===selBone?' sel':'';
    const col=b.name==='sword_r'||b.name==='sword_l'?(b.name==='sword_r'?'#00dcdc':'#ffff00'):'#5cfcb8';
    const indent='<span class="indent">'+(depth===0?'⊟':depth>0?'↳':'')+'</span>';
    const dot=`<span class="dot" style="background:${col}"></span>`;
    html+=`<div class="tree-item${sel}" data-id="${b.id}">${'  '.repeat(depth)}${indent}${dot}<span class="bone-name">${b.name}</span><span class="bone-len">${b.length}px</span></div>`;
    html+=buildTree(b.id,depth+1);
  });
  return html;
}
function updateTree(){
  document.getElementById('tree-root').innerHTML=buildTree(-1,0);
  document.querySelectorAll('#tree-root .tree-item').forEach(el=>{
    el.addEventListener('click',()=>{
      const id=parseInt(el.dataset.id);
      selBone=id; updateInspector(); updateTree(); draw();
    });
  });
}

// ════════════════════════════════════════════════════════
// INSPECTOR
// ════════════════════════════════════════════════════════
function updateInspector(){
  const noSel=document.getElementById('no-sel'), fields=document.getElementById('bone-fields');
  if(selBone<0){noSel.style.display='';fields.style.display='none';return;}
  noSel.style.display='none'; fields.style.display='flex';
  const bone=rig.bones.find(b=>b.id===selBone); if(!bone)return;
  document.getElementById('b-name').value=bone.name;
  document.getElementById('b-len').value=bone.length;
  const p=getCurrentBonePose(selBone);
  const angle=p.angle??0;
  document.getElementById('b-angle').value=Math.round(angle*10)/10;
  const rf=document.getElementById('root-f');
  if(bone.parent===-1){rf.style.display='flex';document.getElementById('b-rx').value=p.x??0;document.getElementById('b-ry').value=p.y??0;}
  else rf.style.display='none';
  document.getElementById('angle-needle').style.transform=`translateX(-50%) rotate(${angle-90}deg)`;
}

function applyToKF(){
  if(selBone<0)return;
  saveUndo();
  const angle=parseFloat(document.getElementById('b-angle').value)||0;
  setBoneKF(selBone,angle);
  const bone=rig.bones.find(b=>b.id===selBone);
  if(bone&&bone.parent===-1){
    const kf=getOrCreateKF(); const e=kf.find(e=>e.id===selBone);
    if(e){e.x=parseFloat(document.getElementById('b-rx').value)||0;e.y=parseFloat(document.getElementById('b-ry').value)||0;}
  }
  draw();
}

function applyRig(){
  if(selBone<0)return;
  saveUndo();
  const bone=rig.bones.find(b=>b.id===selBone);if(!bone)return;
  bone.length=parseFloat(document.getElementById('b-len').value)||0; draw();
}

// ════════════════════════════════════════════════════════
// HELP
// ════════════════════════════════════════════════════════
function toggleHelp(){document.getElementById('help-overlay').classList.toggle('show');}

// ════════════════════════════════════════════════════════
// FILE I/O
// ════════════════════════════════════════════════════════
function saveJSON(){
  const data={rig:{root_name:rig.root_name,bones:rig.bones},animations};
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));
  a.download='player_anim.json'; a.click();
  toast('JSON guardado');
}

document.getElementById('file-in').addEventListener('change',e=>{
  const f=e.target.files[0];if(!f)return;
  const reader=new FileReader();
  reader.onload=ev=>{
    try{
      const data=JSON.parse(ev.target.result);
      if(data.rig)rig=data.rig;
      if(data.animations){
        for(const an in data.animations){const anim=data.animations[an];const nkf={};for(const k in anim.keyframes)nkf[String(Math.round(Number(k)))]=anim.keyframes[k];anim.keyframes=nkf;}
        Object.assign(animations,data.animations);
      }
      curAnim=Object.keys(animations)[0];curFrame=0;selBone=-1;
      refreshUI();updateInspector();draw();toast('JSON cargado');
    }catch(err){alert('Error: '+err.message);}
  };
  reader.readAsText(f); e.target.value='';
});

// ════════════════════════════════════════════════════════
// KEYBOARD
// ════════════════════════════════════════════════════════
document.addEventListener('keydown',e=>{
  if(e.target.tagName==='INPUT') return;
  if(e.key===' '){e.preventDefault();togglePlay();}
  const anim=animations[curAnim];
  if(e.key==='ArrowRight'){curFrame=Math.min(curFrame+1,anim.length_frames-1);updateTimeline();draw();}
  if(e.key==='ArrowLeft'){curFrame=Math.max(curFrame-1,0);updateTimeline();draw();}
  if(e.key==='k'||e.key==='K'){addKF();}
  if(e.key==='d'||e.key==='D'){delKF();}
  if(e.key==='Escape'){selBone=-1;updateInspector();updateTree();draw();}
  if(e.key==='?'&&!e.shiftKey){} // handled by ?
  if(e.ctrlKey||e.metaKey){
    if(e.key==='z'&&!e.shiftKey){e.preventDefault();undo();}
    if((e.key==='z'&&e.shiftKey)||e.key==='Z'){e.preventDefault();redo();}
    if(e.key==='s'){e.preventDefault();saveJSON();}
    if(e.key==='c'){e.preventDefault();copyPose();}
    if(e.key==='v'){e.preventDefault();pastePose();}
  }
  if(selBone>=0&&!(e.ctrlKey||e.metaKey)){
    const p=getCurrentBonePose(selBone);
    if(e.key==='ArrowUp'){setBoneKF(selBone,(p.angle??0)-1);updateInspector();draw();}
    if(e.key==='ArrowDown'){setBoneKF(selBone,(p.angle??0)+1);updateInspector();draw();}
  }
  if(e.key==='m'||e.key==='M'){toggleTimelineMode();}
  if(e.key==='?'){e.preventDefault();toggleHelp();}
  if(e.key==='Tab'){ // Tab switch between tabs
    e.preventDefault();
    const btns=document.querySelectorAll('.tab-btn');
    let idx=Array.from(btns).findIndex(b=>b.classList.contains('active'));
    idx=(idx+1)%btns.length; btns[idx].click();
  }
});

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-'+btn.dataset.tab).classList.add('active');
  });
});

// Onion skin controls
document.getElementById('onion-prev').addEventListener('change',draw);
document.getElementById('onion-next').addEventListener('change',draw);
document.getElementById('onion-alpha').addEventListener('input',draw);

// ════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════
if(!autoLoad()) {
  rig = cloneRig(RIG);
  animations = cloneAnims(DEFAULT_ANIMS);
}
refreshUI(); updateInspector(); resize();
