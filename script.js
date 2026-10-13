function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!==undefined)e.textContent=x;return e}
(function(){
var host=document.getElementById('track'),nl=document.getElementById('novel-list'),NS='http://www.w3.org/2000/svg';
(window.PROJECTS||[]).forEach(function(p,i){
var card=el('article','card c'+(i%3+1)),logo=el('div','logo'),ul=el('ul','tags'),row=el('div','row');
card.dataset.cat=p.cats.join(' ');
logo.appendChild(el('span','',p.letter));
if(p.icon){
var img=document.createElement('img');
img.alt=p.name+' icon';
img.addEventListener('load',function(){logo.classList.add('ok')});
img.addEventListener('error',function(){if(p.iconFallback&&!img.dataset.f){img.dataset.f='1';img.src=p.iconFallback}else img.remove()});
img.src=p.icon;
logo.appendChild(img)}
p.tags.forEach(function(t){ul.appendChild(el('li','',t))});
p.links.forEach(function(l){var a=el('a',l.primary?'btn fill':'btn',l.label);a.href=l.href;row.appendChild(a)});
card.appendChild(logo);card.appendChild(el('h3','',p.name));card.appendChild(el('p','',p.description));card.appendChild(ul);card.appendChild(row);
host.appendChild(card)});
(window.NOVELS||[]).forEach(function(v,i){
var a=el('article','nov'),b=el('div'),em=el('em'),svg=document.createElementNS(NS,'svg'),path=document.createElementNS(NS,'path');
a.style.setProperty('--i',i);
svg.setAttribute('viewBox','0 0 24 24');
path.setAttribute('d','M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z');
svg.appendChild(path);em.appendChild(svg);em.appendChild(document.createTextNode(v.status||'Finished'));
b.appendChild(el('h3','',v.title));b.appendChild(el('p','',v.author+'. '+v.blurb));b.appendChild(em);
a.appendChild(el('i','',v.initials));a.appendChild(b);
nl.appendChild(a)})
})();
(function(){
var d=document.documentElement,N=160,rm=matchMedia("(prefers-reduced-motion: reduce)").matches,S=Math.sin,C=Math.cos,A=Math.abs,P=Math.pow;
document.getElementById('mode').addEventListener('click',function(){var t=d.dataset.theme==='dark'?'light':'dark';d.dataset.theme=t;try{localStorage.setItem('mode',t)}catch(e){}});
function mix(a,b,s){return a+(b-a)*s}
function wave(t,f){return(S(t*f)+1)/2}
function sm(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
function sg(x){return x<0?-1:1}
var R=[function(b){return 100+11*C(8*b)},function(b){return 80+27*C(5*b)},function(b){return 80+21*C(12*b)},function(){return 98},function(b){return 76+24*C(4*b)}];
var sh=[
{id:'s1',x:190,y:170,fn:function(a,T){var b=a-T*.25,u=T/2.2,i=Math.floor(u),r=mix(R[i%5](b),R[(i+1)%5](b),sm((u-i-.3)/.7))*1.15;return[r*C(a),r*S(a)]}},
{id:'s2',x:352,y:62,fn:function(a,T){var n=2+4*wave(T,.9),b=a-T*.4,r=42/P(P(A(C(b)),n)+P(A(S(b)),n),1/n);return[r*C(a),r*S(a)]}},
{id:'s3',x:92,y:302,fn:function(a,T){var n=2+6*wave(T,.7),c=C(a),s=S(a),x=78*sg(c)*P(A(c),2/n),y=36*sg(s)*P(A(s),2/n),g=-.25+.15*S(T*.5);return[x*C(g)-y*S(g),x*S(g)+y*C(g)]}},
{id:'s4',x:338,y:292,fn:function(a,T){var b=a-T*.7,r=40*(1+.3*wave(T,.8)*C(4*b));return[r*C(a),r*S(a)]}},
{id:'s5',x:46,y:92,fn:function(a,T){var b=a+T*.9,r=22*(1+.28*C(6*b)*wave(T,1.1));return[r*C(a),r*S(a)]}}];
sh.push({id:'s1c',x:190,y:170,fn:function(a,T){var q=sh[0].fn(a,T);return[q[0]*.88,q[1]*.88]}});
sh.forEach(function(s){s.el=document.getElementById(s.id)});
var o1=document.getElementById('o1'),o2=document.getElementById('o2'),pars=[].slice.call(document.querySelectorAll('.par')),px=0,py=0,cx=0,cy=0;
function render(T,E){
sh.forEach(function(s,i){
var e=Math.min(1,Math.max(0,(E-i*.12)/.9)),k=e<1?1+2.7*P(e-1,3)+1.7*P(e-1,2):1,p='';
for(var j=0;j<=N;j++){var q=s.fn(j/N*Math.PI*2,T);p+=(j?'L':'M')+(s.x+q[0]*k).toFixed(1)+' '+(s.y+q[1]*k).toFixed(1)}
s.el.setAttribute('d',p+'Z')});
var k2=Math.min(1,E/1.4);
o1.setAttribute('cx',(190+158*C(T*.5)*k2).toFixed(1));o1.setAttribute('cy',(170+138*S(T*.5)*k2).toFixed(1));
o2.setAttribute('cx',(190+178*C(-T*.35+2)*k2).toFixed(1));o2.setAttribute('cy',(170+150*S(-T*.35+2)*k2).toFixed(1));
cx+=(px-cx)*.08;cy+=(py-cy)*.08;
pars.forEach(function(g){var f=+g.dataset.d;g.setAttribute('transform','translate('+(cx*f).toFixed(1)+' '+(cy*f).toFixed(1)+')')})}
var T=0,E=0,last=null,kick=0;
function frame(ts){var dt=last===null?0:Math.min(.05,(ts-last)/1000);last=ts;T+=dt*(1+kick*5);E+=dt;kick*=.96;render(T,E);requestAnimationFrame(frame)}
if(rm)render(5,5);
else{
requestAnimationFrame(frame);
window.addEventListener('pointermove',function(e){px=(e.clientX/innerWidth-.5)*2;py=(e.clientY/innerHeight-.5)*2},{passive:true});
document.getElementById('art').addEventListener('click',function(){kick=1})}
var art=document.getElementById('art'),clicks=0,msgs=['Colors shuffled.','Again?','Okay, you really like shapes.'],toast=document.createElement('div'),tt=0,ot=document.title;
toast.className='toast';toast.setAttribute('role','status');document.body.appendChild(toast);
function say(m){toast.textContent=m;toast.classList.add('show');clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove('show')},2200)}
function burst(x,y){
var cl=['var(--primary)','var(--pc)','var(--tc)','var(--on-tc)'],br=['50%','30%','50% 50% 0 50%','8px','40% 60% 60% 40%'];
for(var i=0;i<14;i++){
var e=document.createElement('i'),a=Math.random()*Math.PI*2,dist=70+Math.random()*90,sz=8+Math.random()*12,dx=(Math.cos(a)*dist).toFixed(0),dy=(Math.sin(a)*dist+30).toFixed(0);
e.className='pf';e.style.cssText='left:'+x+'px;top:'+y+'px;width:'+sz+'px;height:'+sz+'px;background:'+cl[i%4]+';border-radius:'+br[i%5];
document.body.appendChild(e);
e.animate([{transform:'translate(-50%,-50%) translate(0px,0px) scale(.4) rotate(0deg)',opacity:1},{transform:'translate(-50%,-50%) translate('+dx+'px,'+dy+'px) scale(1) rotate('+(Math.random()*360).toFixed(0)+'deg)',opacity:0}],{duration:700+Math.random()*400,easing:'cubic-bezier(.2,.8,.3,1)'}).onfinish=(function(n){return function(){n.remove()}})(e)}}
art.addEventListener('click',function(e){
clicks++;
if(!rm)burst(e.clientX,e.clientY);
if(clicks%5===0){d.style.setProperty('--h',Math.floor(Math.random()*360));say(msgs[(clicks/5-1)%msgs.length])}});
if(!rm)document.addEventListener('pointerdown',function(e){
var t=e.target.closest&&e.target.closest('.btn,.icon,.acc,.fab');if(!t||t.disabled)return;
var b=t.getBoundingClientRect(),z=Math.max(b.width,b.height)*2,r=document.createElement('span');
r.className='rp';r.style.cssText='width:'+z+'px;height:'+z+'px;left:'+(e.clientX-b.left-z/2)+'px;top:'+(e.clientY-b.top-z/2)+'px';
t.appendChild(r);
r.animate([{transform:'scale(0)',opacity:.28},{transform:'scale(1)',opacity:0}],{duration:600,easing:'ease-out'}).onfinish=function(){r.remove()}});
document.addEventListener('visibilitychange',function(){document.title=document.hidden?'Come back soon':ot});
var rv=document.querySelectorAll('.rv');
if('IntersectionObserver' in window){
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
rv.forEach(function(c,i){c.style.setProperty('--d',(i%3)*.1+'s');io.observe(c)})
}else rv.forEach(function(c){c.classList.add('in')});
var tr=document.getElementById('track'),all=[].slice.call(tr.children),dots=document.getElementById('dots'),pv=document.getElementById('pv'),nx=document.getElementById('nx'),ctl=dots.parentNode,n=all.length,cs=[],cur=0,raf=0,st=0,touching=false,stopped=false,vis=true,timer=0;
function clone(c){var k=c.cloneNode(true);k.setAttribute('aria-hidden','true');k.classList.remove('on');[].forEach.call(k.querySelectorAll('a'),function(a){a.tabIndex=-1});return k}
function pos(i){var c=cs[i];return c.offsetLeft-(tr.clientWidth-c.offsetWidth)/2}
function go(i){tr.scrollTo({left:pos(i),behavior:rm?'auto':'smooth'})}
function stop(){stopped=true;clearInterval(timer)}
function active(){var m=tr.scrollLeft+tr.clientWidth/2,best=0,bd=1e9;
cs.forEach(function(c,i){var x=Math.abs(c.offsetLeft+c.offsetWidth/2-m);if(x<bd){bd=x;best=i}});
cs.forEach(function(c,i){c.classList.toggle('on',i===best)});
[].forEach.call(dots.children,function(b,i){b.classList.toggle('on',i===best%n)});
cur=best}
function recenter(){if(touching||n<2)return;var i=cur,j=i<n?i+n:(i>=2*n?i-n:i);if(j===i)return;
tr.style.scrollSnapType='none';tr.scrollLeft+=cs[j].offsetLeft-cs[i].offsetLeft;active();
requestAnimationFrame(function(){tr.style.scrollSnapType=''})}
function setup(list){
n=list.length;
while(tr.firstChild)tr.removeChild(tr.firstChild);
dots.innerHTML='';
list.forEach(function(c){c.classList.remove('on')});
if(n>1)list.forEach(function(c){tr.appendChild(clone(c))});
list.forEach(function(c){tr.appendChild(c)});
if(n>1)list.forEach(function(c){tr.appendChild(clone(c))});
cs=[].slice.call(tr.children);
list.forEach(function(c,i){var b=document.createElement('button');b.setAttribute('aria-label','Show project '+(i+1));b.addEventListener('click',function(){stop();go(Math.floor(cur/n)*n+i)});dots.appendChild(b)});
ctl.style.display=n>1?'':'none';
cur=n>1?n:0;tr.scrollLeft=pos(cur);active()}
setup(all);
tr.addEventListener('scroll',function(){cancelAnimationFrame(raf);raf=requestAnimationFrame(active);clearTimeout(st);st=setTimeout(recenter,140)},{passive:true});
tr.addEventListener('touchstart',function(){touching=true;stop()},{passive:true});
tr.addEventListener('touchend',function(){touching=false;clearTimeout(st);st=setTimeout(recenter,200)},{passive:true});
tr.addEventListener('pointerdown',stop);tr.addEventListener('keydown',stop);tr.addEventListener('focusin',stop);
tr.addEventListener('wheel',function(e){if(Math.abs(e.deltaX)>Math.abs(e.deltaY))stop()},{passive:true});
addEventListener('resize',function(){tr.scrollLeft=pos(cur);active()});
pv.addEventListener('click',function(){stop();go(cur-1)});nx.addEventListener('click',function(){stop();go(cur+1)});
if('IntersectionObserver' in window)new IntersectionObserver(function(es){vis=es[0].isIntersecting}).observe(tr);
if(!rm)timer=setInterval(function(){if(!stopped&&vis&&!document.hidden&&n>1)go(cur+1)},4000);
var chips=[].slice.call(document.querySelectorAll('.chip'));
chips.forEach(function(b){b.addEventListener('click',function(){
chips.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
stop();clearTimeout(st);
var f=b.dataset.f;
setup(all.filter(function(c){return f==='all'||c.dataset.cat.split(' ').indexOf(f)>-1}))})});
var bar=document.querySelector('.bar'),fab=document.getElementById('top'),ticking=false;
function onScroll(){ticking=false;var y=window.scrollY,show=y>480;bar.classList.toggle('scrolled',y>12);fab.classList.toggle('show',show);if(show)fab.removeAttribute('inert');else fab.setAttribute('inert','')}
addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});
onScroll();
fab.addEventListener('click',function(){window.scrollTo({top:0,behavior:rm?'auto':'smooth'})});
var nb=document.getElementById('nvb'),np=document.getElementById('nv');
function setOpen(o){nb.setAttribute('aria-expanded',o);np.classList.toggle('open',o);if(o)np.removeAttribute('inert');else np.setAttribute('inert','')}
nb.addEventListener('click',function(){setOpen(nb.getAttribute('aria-expanded')!=='true')});
[].forEach.call(document.querySelectorAll('a[href="#novels"]'),function(a){a.addEventListener('click',function(){setOpen(true)})});
})();
