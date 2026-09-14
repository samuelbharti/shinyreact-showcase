var uO=Object.defineProperty;var fO=(k,Ve,je)=>Ve in k?uO(k,Ve,{enumerable:!0,configurable:!0,writable:!0,value:je}):k[Ve]=je;var h=(k,Ve,je)=>fO(k,typeof Ve!="symbol"?Ve+"":Ve,je);(function(k){"use strict";var fl;function Ve(i){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(i){for(const t in i)if(t!=="default"){const n=Object.getOwnPropertyDescriptor(i,t);Object.defineProperty(e,t,n.get?n:{enumerable:!0,get:()=>i[t]})}}return e.default=i,Object.freeze(e)}const je=Ve(k);function gm(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var dl={exports:{}},yn={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pm=Symbol.for("react.transitional.element"),mm=Symbol.for("react.fragment");function hl(i,e,t){var n=null;if(t!==void 0&&(n=""+t),e.key!==void 0&&(n=""+e.key),"key"in e){t={};for(var s in e)s!=="key"&&(t[s]=e[s])}else t=e;return e=t.ref,{$$typeof:pm,type:i,key:n,ref:e!==void 0?e:null,props:t}}yn.Fragment=mm,yn.jsx=hl,yn.jsxs=hl,dl.exports=yn;var B=dl.exports;function gl(i){const e=atob(i),t=new Uint8Array(e.length);for(let n=0;n<e.length;n+=1)t[n]=e.charCodeAt(n);return t}function pl(i){return new Int16Array(i.buffer,i.byteOffset,i.byteLength/2)}function ym(i){const e=pl(gl(i.lng)),t=pl(gl(i.lat)),n=Math.min(e.length,t.length),[s,r,o,a]=i.bounds,c=(o-s)/65534,l=(a-r)/65534,u=new Float32Array(n*3);for(let f=0;f<n;f+=1)u[f*3]=s+(e[f]+32767)*c,u[f*3+1]=r+(t[f]+32767)*l;return u}function ml(i,e){const t=156543.03392/2**i;return Math.max(20,Math.round(t*e))}function gi(i){return i.toLocaleString("en-US")}function yl(i,e){if(!i)throw new Error(e||"loader assertion failed.")}const bl=!!(typeof process!="object"||String(process)!=="[object process]"||process.browser),_l=typeof process<"u"&&process.version&&/v([0-9]*)/.exec(process.version);_l&&parseFloat(_l[1]);const Mr=globalThis,vl=globalThis.process||{},bm=globalThis.navigator||{};function xl(i){if(typeof window<"u"&&window.process?.type==="renderer"||typeof process<"u"&&process.versions?.electron)return!0;const t=typeof navigator<"u"&&navigator.userAgent;return!!(t&&t.indexOf("Electron")>=0)}function It(){return!(typeof process=="object"&&String(process)==="[object process]"&&!process?.browser)||xl()}function _m(i){return It()?xl()?"Electron":(bm.userAgent||"").indexOf("Edge")>-1?"Edge":globalThis.chrome?"Chrome":globalThis.safari?"Safari":globalThis.mozInnerScreenX?"Firefox":"Unknown":"Node"}const wl="4.1.2";function Rr(i,e){if(!i)throw new Error("Assertion failed")}function Pl(i){if(!i)return 0;let e;switch(typeof i){case"number":e=i;break;case"object":e=i.logLevel||i.priority||0;break;default:return 0}return Rr(Number.isFinite(e)&&e>=0),e}function vm(i){const{logLevel:e,message:t}=i;i.logLevel=Pl(e);const n=i.args?Array.from(i.args):[];for(;n.length&&n.shift()!==t;);switch(typeof e){case"string":case"function":t!==void 0&&n.unshift(t),i.message=e;break;case"object":Object.assign(i,e);break}typeof i.message=="function"&&(i.message=i.message());const s=typeof i.message;return Rr(s==="string"||s==="object"),Object.assign(i,{args:n},i.opts)}const Mt=()=>{};class xm{constructor({level:e=0}={}){this.userData={},this._onceCache=new Set,this._level=e}set level(e){this.setLevel(e)}get level(){return this.getLevel()}setLevel(e){return this._level=e,this}getLevel(){return this._level}warn(e,...t){return this._log("warn",0,e,t,{once:!0})}error(e,...t){return this._log("error",0,e,t)}log(e,t,...n){return this._log("log",e,t,n)}info(e,t,...n){return this._log("info",e,t,n)}once(e,t,...n){return this._log("once",e,t,n,{once:!0})}_log(e,t,n,s,r={}){const o=vm({logLevel:t,message:n,args:this._buildArgs(t,n,s),opts:r});return this._createLogFunction(e,o,r)}_buildArgs(e,t,n){return[e,t,...n]}_createLogFunction(e,t,n){if(!this._shouldLog(t.logLevel))return Mt;const s=this._getOnceTag(n.tag??t.tag??t.message);if((n.once||t.once)&&s!==void 0){if(this._onceCache.has(s))return Mt;this._onceCache.add(s)}return this._emit(e,t)}_shouldLog(e){return this.getLevel()>=Pl(e)}_getOnceTag(e){if(e!==void 0)try{return typeof e=="string"?e:String(e)}catch{return}}}function wm(i){try{const e=window[i],t="__storage_test__";return e.setItem(t,t),e.removeItem(t),e}catch{return null}}class Pm{constructor(e,t,n="sessionStorage"){this.storage=wm(n),this.id=e,this.config=t,this._loadConfiguration()}getConfiguration(){return this.config}setConfiguration(e){if(Object.assign(this.config,e),this.storage){const t=JSON.stringify(this.config);this.storage.setItem(this.id,t)}}_loadConfiguration(){let e={};if(this.storage){const t=this.storage.getItem(this.id);e=t?JSON.parse(t):{}}return Object.assign(this.config,e),this}}function Sm(i){let e;return i<10?e=`${i.toFixed(2)}ms`:i<100?e=`${i.toFixed(1)}ms`:i<1e3?e=`${i.toFixed(0)}ms`:e=`${(i/1e3).toFixed(2)}s`,e}function Em(i,e=8){const t=Math.max(e-i.length,0);return`${" ".repeat(t)}${i}`}var bn;(function(i){i[i.BLACK=30]="BLACK",i[i.RED=31]="RED",i[i.GREEN=32]="GREEN",i[i.YELLOW=33]="YELLOW",i[i.BLUE=34]="BLUE",i[i.MAGENTA=35]="MAGENTA",i[i.CYAN=36]="CYAN",i[i.WHITE=37]="WHITE",i[i.BRIGHT_BLACK=90]="BRIGHT_BLACK",i[i.BRIGHT_RED=91]="BRIGHT_RED",i[i.BRIGHT_GREEN=92]="BRIGHT_GREEN",i[i.BRIGHT_YELLOW=93]="BRIGHT_YELLOW",i[i.BRIGHT_BLUE=94]="BRIGHT_BLUE",i[i.BRIGHT_MAGENTA=95]="BRIGHT_MAGENTA",i[i.BRIGHT_CYAN=96]="BRIGHT_CYAN",i[i.BRIGHT_WHITE=97]="BRIGHT_WHITE"})(bn||(bn={}));const Cm=10;function Sl(i){return typeof i!="string"?i:(i=i.toUpperCase(),bn[i]||bn.WHITE)}function Lm(i,e,t){return!It&&typeof i=="string"&&(e&&(i=`\x1B[${Sl(e)}m${i}\x1B[39m`),t&&(i=`\x1B[${Sl(t)+Cm}m${i}\x1B[49m`)),i}function Tm(i,e=["constructor"]){const t=Object.getPrototypeOf(i),n=Object.getOwnPropertyNames(t),s=i;for(const r of n){const o=s[r];typeof o=="function"&&(e.find(a=>r===a)||(s[r]=o.bind(i)))}}class El{getHighResolutionTimer(){let e;if(It()&&Mr.performance)e=Mr?.performance?.now?.();else if("hrtime"in vl){const t=vl?.hrtime?.();e=t[0]*1e3+t[1]/1e6}else e=Date.now();return e}getMemoryUsageMB(){const t=Mr?.performance?.memory?.usedJSHeapSize;return t==null?null:Math.trunc(t/1024/1024)}}const lt=new El;globalThis.Probe=El,globalThis.probe=lt;const Rt={debug:It()&&console.debug||console.log,log:console.log,info:console.info,warn:console.warn,error:console.error},Or={enabled:!0,level:0};class pi extends xm{constructor({id:e}={id:""}){super({level:0}),this.VERSION=wl,this._startTs=lt.getHighResolutionTimer(),this._deltaTs=lt.getHighResolutionTimer(),this.userData={},this.LOG_THROTTLE_TIMEOUT=0,this.id=e,this.userData={},this._storage=new Pm(`__probe-${this.id}__`,{[this.id]:Or}),this.timeStamp(`${this.id} started`),Tm(this),Object.seal(this)}isEnabled(){return this._getConfiguration().enabled}getLevel(){return this._getConfiguration().level}getTotal(){return Number((lt.getHighResolutionTimer()-this._startTs).toPrecision(10))}getDelta(){return Number((lt.getHighResolutionTimer()-this._deltaTs).toPrecision(10))}set priority(e){this.level=e}get priority(){return this.level}getPriority(){return this.level}enable(e=!0){return this._updateConfiguration({enabled:e}),this}setLevel(e){return this._updateConfiguration({level:e}),this}get(e){return this._getConfiguration()[e]}set(e,t){this._updateConfiguration({[e]:t})}settings(){console.table?console.table(this._storage.config):console.log(this._storage.config)}assert(e,t){if(!e)throw new Error(t||"Assertion failed")}warn(e,...t){return this._log("warn",0,e,t,{method:Rt.warn,once:!0})}error(e,...t){return this._log("error",0,e,t,{method:Rt.error})}deprecated(e,t){return this.warn(`\`${e}\` is deprecated and will be removed in a later version. Use \`${t}\` instead`)}removed(e,t){return this.error(`\`${e}\` has been removed. Use \`${t}\` instead`)}probe(e,t,...n){const s=lt.getMemoryUsageMB();if(s!==null){const r=`${s}MB `;typeof t=="function"?t=()=>`${r}${t()}`:typeof t=="string"&&(t=`${r}${t}`)}return this._log("log",e,t,n,{method:Rt.log,time:!0,once:!0})}log(e,t,...n){return this._log("log",e,t,n,{method:Rt.debug})}info(e,t,...n){return this._log("info",e,t,n,{method:console.info})}once(e,t,...n){return this._log("once",e,t,n,{method:Rt.debug||Rt.info,once:!0})}table(e,t,n){return t?this._log("table",e,t,n&&[n]||[],{method:console.table||Mt,tag:Im(t)}):Mt}time(e,t){return this._log("time",e,t,[],{method:console.time?console.time:console.info})}timeEnd(e,t){return this._log("time",e,t,[],{method:console.timeEnd?console.timeEnd:console.info})}timeStamp(e,t){return this._log("time",e,t,[],{method:console.timeStamp||Mt})}group(e,t,n={collapsed:!1}){const s=(n.collapsed?console.groupCollapsed:console.group)||console.info;return this._log("group",e,t,[],{method:s})}groupCollapsed(e,t,n={}){return this.group(e,t,Object.assign({},n,{collapsed:!0}))}groupEnd(e){return this._log("groupEnd",e,"",[],{method:console.groupEnd||Mt})}withGroup(e,t,n){this.group(e,t)();try{n()}finally{this.groupEnd(e)()}}trace(){console.trace&&console.trace()}_shouldLog(e){return this.isEnabled()&&super._shouldLog(e)}_emit(e,t){const n=t.method;Rr(n),t.total=this.getTotal(),t.delta=this.getDelta(),this._deltaTs=lt.getHighResolutionTimer();const s=Am(this.id,t.message,t);return n.bind(console,s,...t.args)}_getConfiguration(){return this._storage.config[this.id]||this._updateConfiguration(Or),this._storage.config[this.id]}_updateConfiguration(e){const t=this._storage.config[this.id]||{...Or};this._storage.setConfiguration({[this.id]:{...t,...e}})}}pi.VERSION=wl;function Am(i,e,t){if(typeof e=="string"){const n=t.time?Em(Sm(t.total)):"";e=t.time?`${i}: ${n}  ${e}`:`${i}: ${e}`,e=Lm(e,t.color,t.background)}return e}function Im(i){for(const e in i)for(const t in i[e])return t||"untitled";return"empty"}const Br="4.4.5",Mm=Br[0]>="0"&&Br[0]<="9"?`v${Br}`:"";function Rm(){const i=new pi({id:"loaders.gl"});return globalThis.loaders||(globalThis.loaders={}),globalThis.loaders.log=i,globalThis.loaders.version=Mm,globalThis.probe||(globalThis.probe={}),globalThis.probe.loaders=i,i}const Om=Rm(),Bm=i=>typeof i=="boolean",Le=i=>typeof i=="function",ut=i=>i!==null&&typeof i=="object",Cl=i=>ut(i)&&i.constructor==={}.constructor,Ll=i=>typeof SharedArrayBuffer<"u"&&i instanceof SharedArrayBuffer,kr=i=>ut(i)&&typeof i.byteLength=="number"&&typeof i.slice=="function",km=i=>!!i&&Le(i[Symbol.iterator]),Dm=i=>!!i&&Le(i[Symbol.asyncIterator]),ft=i=>typeof Response<"u"&&i instanceof Response||ut(i)&&Le(i.arrayBuffer)&&Le(i.text)&&Le(i.json),dt=i=>typeof Blob<"u"&&i instanceof Blob,Fm=i=>typeof ReadableStream<"u"&&i instanceof ReadableStream||ut(i)&&Le(i.tee)&&Le(i.cancel)&&Le(i.getReader),Nm=i=>ut(i)&&Le(i.read)&&Le(i.pipe)&&Bm(i.readable),Tl=i=>Fm(i)||Nm(i);function zm(i,e){return Al(i||{},e)}function Al(i,e,t=0){if(t>3)return e;const n={...i};for(const[s,r]of Object.entries(e))r&&typeof r=="object"&&!Array.isArray(r)?n[s]=Al(n[s]||{},e[s],t+1):n[s]=e[s];return n}const Um="latest";function $m(){return globalThis._loadersgl_?.version||(globalThis._loadersgl_=globalThis._loadersgl_||{},globalThis._loadersgl_.version="4.4.5"),globalThis._loadersgl_.version}const Gm=$m();function Xe(i,e){if(!i)throw new Error(e||"loaders.gl assertion failed.")}const ht=typeof process!="object"||String(process)!=="[object process]"||process.browser,Vm=typeof window<"u"&&typeof window.orientation<"u",Il=typeof process<"u"&&process.version&&/v([0-9]*)/.exec(process.version);Il&&parseFloat(Il[1]);class jm{constructor(e,t){h(this,"name");h(this,"workerThread");h(this,"isRunning",!0);h(this,"result");h(this,"_resolve",()=>{});h(this,"_reject",()=>{});this.name=e,this.workerThread=t,this.result=new Promise((n,s)=>{this._resolve=n,this._reject=s})}postMessage(e,t){this.workerThread.postMessage({source:"loaders.gl",type:e,payload:t})}done(e){Xe(this.isRunning),this.isRunning=!1,this._resolve(e)}error(e){Xe(this.isRunning),this.isRunning=!1,this._reject(e)}}class Dr{terminate(){}}const Fr=new Map;function Wm(i){Xe(i.source&&!i.url||!i.source&&i.url);let e=Fr.get(i.source||i.url);return e||(i.url&&(e=Hm(i.url),Fr.set(i.url,e)),i.source&&(e=Ml(i.source),Fr.set(i.source,e))),Xe(e),e}function Hm(i){if(!i.startsWith("http"))return i;const e=Ym(i);return Ml(e)}function Ml(i){const e=new Blob([i],{type:"application/javascript"});return URL.createObjectURL(e)}function Ym(i){return`try {
  importScripts('${i}');
} catch (error) {
  console.error(error);
  throw error;
}`}function Rl(i,e=!0,t){const n=t||new Set;if(i){if(Ol(i))n.add(i);else if(Ol(i.buffer))n.add(i.buffer);else if(!ArrayBuffer.isView(i)){if(e&&typeof i=="object")for(const s in i)Rl(i[s],e,n)}}return t===void 0?Array.from(n):[]}function Ol(i){return i?i instanceof ArrayBuffer||typeof MessagePort<"u"&&i instanceof MessagePort||typeof ImageBitmap<"u"&&i instanceof ImageBitmap||typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas:!1}const Nr=()=>{};class zr{constructor(e){h(this,"name");h(this,"source");h(this,"url");h(this,"terminated",!1);h(this,"worker");h(this,"onMessage");h(this,"onError");h(this,"_loadableURL","");const{name:t,source:n,url:s}=e;Xe(n||s),this.name=t,this.source=n,this.url=s,this.onMessage=Nr,this.onError=r=>console.log(r),this.worker=ht?this._createBrowserWorker():this._createNodeWorker()}static isSupported(){return typeof Worker<"u"&&ht||typeof Dr<"u"&&!ht}destroy(){this.onMessage=Nr,this.onError=Nr,this.worker.terminate(),this.terminated=!0}get isRunning(){return!!this.onMessage}postMessage(e,t){t=t||Rl(e),this.worker.postMessage(e,t)}_getErrorFromErrorEvent(e){let t="Failed to load ";return t+=`worker ${this.name} from ${this.url}. `,e.message&&(t+=`${e.message} in `),e.lineno&&(t+=`:${e.lineno}:${e.colno}`),new Error(t)}_createBrowserWorker(){this._loadableURL=Wm({source:this.source,url:this.url});const e=new Worker(this._loadableURL,{name:this.name});return e.onmessage=t=>{t.data?this.onMessage(t.data):this.onError(new Error("No data received"))},e.onerror=t=>{this.onError(this._getErrorFromErrorEvent(t)),this.terminated=!0},e.onmessageerror=t=>console.error(t),e}_createNodeWorker(){let e;if(this.url){const n=this.url.includes(":/")||this.url.startsWith("/")?this.url:`./${this.url}`,s=this.url.endsWith(".ts")||this.url.endsWith(".mjs")?"module":"commonjs";e=new Dr(n,{eval:!1,type:s})}else if(this.source)e=new Dr(this.source,{eval:!0});else throw new Error("no worker");return e.on("message",t=>{this.onMessage(t)}),e.on("error",t=>{this.onError(t)}),e.on("exit",t=>{}),e}}class qm{constructor(e){h(this,"name","unnamed");h(this,"source");h(this,"url");h(this,"maxConcurrency",1);h(this,"maxMobileConcurrency",1);h(this,"onDebug",()=>{});h(this,"reuseWorkers",!0);h(this,"props",{});h(this,"jobQueue",[]);h(this,"idleQueue",[]);h(this,"count",0);h(this,"isDestroyed",!1);this.source=e.source,this.url=e.url,this.setProps(e)}static isSupported(){return zr.isSupported()}destroy(){this.idleQueue.forEach(e=>e.destroy()),this.isDestroyed=!0}setProps(e){this.props={...this.props,...e},e.name!==void 0&&(this.name=e.name),e.maxConcurrency!==void 0&&(this.maxConcurrency=e.maxConcurrency),e.maxMobileConcurrency!==void 0&&(this.maxMobileConcurrency=e.maxMobileConcurrency),e.reuseWorkers!==void 0&&(this.reuseWorkers=e.reuseWorkers),e.onDebug!==void 0&&(this.onDebug=e.onDebug)}async startJob(e,t=(s,r,o)=>s.done(o),n=(s,r)=>s.error(r)){const s=new Promise(r=>(this.jobQueue.push({name:e,onMessage:t,onError:n,onStart:r}),this));return this._startQueuedJob(),await s}async _startQueuedJob(){if(!this.jobQueue.length)return;const e=this._getAvailableWorker();if(!e)return;const t=this.jobQueue.shift();if(t){this.onDebug({message:"Starting job",name:t.name,workerThread:e,backlog:this.jobQueue.length});const n=new jm(t.name,e);e.onMessage=s=>t.onMessage(n,s.type,s.payload),e.onError=s=>t.onError(n,s),t.onStart(n);try{await n.result}catch(s){console.error(`Worker exception: ${s}`)}finally{this.returnWorkerToQueue(e)}}}returnWorkerToQueue(e){!ht||this.isDestroyed||!this.reuseWorkers||this.count>this._getMaxConcurrency()?(e.destroy(),this.count--):this.idleQueue.push(e),this.isDestroyed||this._startQueuedJob()}_getAvailableWorker(){if(this.idleQueue.length>0)return this.idleQueue.shift()||null;if(this.count<this._getMaxConcurrency()){this.count++;const e=`${this.name.toLowerCase()} (#${this.count} of ${this.maxConcurrency})`;return new zr({name:e,source:this.source,url:this.url})}return null}_getMaxConcurrency(){return Vm?this.maxMobileConcurrency:this.maxConcurrency}}const Xm={maxConcurrency:3,maxMobileConcurrency:1,reuseWorkers:!0,onDebug:()=>{}},ct=class ct{constructor(e){h(this,"props");h(this,"workerPools",new Map);this.props={...Xm},this.setProps(e),this.workerPools=new Map}static isSupported(){return zr.isSupported()}static getWorkerFarm(e={}){return ct._workerFarm=ct._workerFarm||new ct({}),ct._workerFarm.setProps(e),ct._workerFarm}destroy(){for(const e of this.workerPools.values())e.destroy();this.workerPools=new Map}setProps(e){this.props={...this.props,...e};for(const t of this.workerPools.values())t.setProps(this._getWorkerPoolProps())}getWorkerPool(e){const{name:t,source:n,url:s}=e;let r=this.workerPools.get(t);return r||(r=new qm({name:t,source:n,url:s}),r.setProps(this._getWorkerPoolProps()),this.workerPools.set(t,r)),r}_getWorkerPoolProps(){return{maxConcurrency:this.props.maxConcurrency,maxMobileConcurrency:this.props.maxMobileConcurrency,reuseWorkers:this.props.reuseWorkers,onDebug:this.props.onDebug}}};h(ct,"_workerFarm");let _n=ct;function Zm(i,e={}){const t=e[i.id]||{},n=ht?`${i.id}-worker.js`:`${i.id}-worker-node.js`;let s=t.workerUrl;if(!s&&i.id==="compression"&&(s=e.workerUrl),(e._workerType||e?.core?._workerType)==="test"&&(ht?s=`modules/${i.module}/dist/${n}`:s=`modules/${i.module}/src/workers/${i.id}-worker-node.ts`),!s){let o=i.version;o==="latest"&&(o=Um);const a=o?`@${o}`:"";s=`https://unpkg.com/@loaders.gl/${i.module}${a}/dist/${n}`}return Xe(s),s}function Km(i,e=Gm){Xe(i,"no worker provided");const t=i.version;return!(!e||!t)}function Qm(i,e){if(!_n.isSupported())return!1;const t=e?._nodeWorkers??e?.core?._nodeWorkers;if(!ht&&!t)return!1;const n=e?.worker??e?.core?.worker;return!!(i.worker&&n)}async function Jm(i,e,t,n,s){const r=i.id,o=Zm(i,t),c=_n.getWorkerFarm(t?.core).getWorkerPool({name:r,url:o});t=JSON.parse(JSON.stringify(t)),n=JSON.parse(JSON.stringify(n||{}));const l=await c.startJob("process-on-worker",ey.bind(null,s));return l.postMessage("process",{input:e,options:t,context:n}),await(await l.result).result}async function ey(i,e,t,n){switch(t){case"done":e.done(n);break;case"error":e.error(new Error(n.error));break;case"process":const{id:s,input:r,options:o}=n;try{const a=await i(r,o);e.postMessage("done",{id:s,result:a})}catch(a){const c=a instanceof Error?a.message:"unknown error";e.postMessage("error",{id:s,error:c})}break;default:console.warn(`parse-with-worker unknown message ${t}`)}}function ty(i,e,t){if(t=t||i.byteLength,i.byteLength<t||e.byteLength<t)return!1;const n=new Uint8Array(i),s=new Uint8Array(e);for(let r=0;r<n.length;++r)if(n[r]!==s[r])return!1;return!0}function iy(...i){return ny(i)}function ny(i){const e=i.map(r=>r instanceof ArrayBuffer?new Uint8Array(r):r),t=e.reduce((r,o)=>r+o.byteLength,0),n=new Uint8Array(t);let s=0;for(const r of e)n.set(r,s),s+=r.byteLength;return n.buffer}async function sy(i){const e=[];for await(const t of i)e.push(ry(t));return iy(...e)}function ry(i){if(i instanceof ArrayBuffer)return i;if(ArrayBuffer.isView(i)){const{buffer:e,byteOffset:t,byteLength:n}=i;return Bl(e,t,n)}return Bl(i)}function Bl(i,e=0,t=i.byteLength-e){const n=new Uint8Array(i,e,t),s=new Uint8Array(n.length);return s.set(n),s.buffer}function kl(){let i;if(typeof window<"u"&&window.performance)i=window.performance.now();else if(typeof process<"u"&&process.hrtime){const e=process.hrtime();i=e[0]*1e3+e[1]/1e6}else i=Date.now();return i}let Dl=class{constructor(e,t){this.sampleSize=1,this.time=0,this.count=0,this.samples=0,this.lastTiming=0,this.lastSampleTime=0,this.lastSampleCount=0,this._count=0,this._time=0,this._samples=0,this._startTime=0,this._timerPending=!1,this.name=e,this.type=t,this.reset()}reset(){return this.time=0,this.count=0,this.samples=0,this.lastTiming=0,this.lastSampleTime=0,this.lastSampleCount=0,this._count=0,this._time=0,this._samples=0,this._startTime=0,this._timerPending=!1,this}setSampleSize(e){return this.sampleSize=e,this}incrementCount(){return this.addCount(1),this}decrementCount(){return this.subtractCount(1),this}addCount(e){return this._count+=e,this._samples++,this._checkSampling(),this}subtractCount(e){return this._count-=e,this._samples++,this._checkSampling(),this}addTime(e){return this._time+=e,this.lastTiming=e,this._samples++,this._checkSampling(),this}timeStart(){return this._startTime=kl(),this._timerPending=!0,this}timeEnd(){return this._timerPending?(this.addTime(kl()-this._startTime),this._timerPending=!1,this._checkSampling(),this):this}getSampleAverageCount(){return this.sampleSize>0?this.lastSampleCount/this.sampleSize:0}getSampleAverageTime(){return this.sampleSize>0?this.lastSampleTime/this.sampleSize:0}getSampleHz(){return this.lastSampleTime>0?this.sampleSize/(this.lastSampleTime/1e3):0}getAverageCount(){return this.samples>0?this.count/this.samples:0}getAverageTime(){return this.samples>0?this.time/this.samples:0}getHz(){return this.time>0?this.samples/(this.time/1e3):0}_checkSampling(){this._samples===this.sampleSize&&(this.lastSampleTime=this._time,this.lastSampleCount=this._count,this.count+=this._count,this.time+=this._time,this.samples+=this._samples,this._time=0,this._count=0,this._samples=0)}};class vn{constructor(e){this.stats={},this.id=e.id,this.stats={},this._initializeStats(e.stats),Object.seal(this)}get(e,t="count"){return this._getOrCreate({name:e,type:t})}get size(){return Object.keys(this.stats).length}reset(){for(const e of Object.values(this.stats))e.reset();return this}forEach(e){for(const t of Object.values(this.stats))e(t)}getTable(){const e={};return this.forEach(t=>{e[t.name]={time:t.time||0,count:t.count||0,average:t.getAverageTime()||0,hz:t.getHz()||0}}),e}_initializeStats(e=[]){e.forEach(t=>this._getOrCreate(t))}_getOrCreate(e){const{name:t,type:n}=e;let s=this.stats[t];return s||(e instanceof Dl?s=e:s=new Dl(t,n),this.stats[t]=s),s}}let oy="";const Fl={};function ay(i){for(const e in Fl)if(i.startsWith(e)){const t=Fl[e];i=i.replace(e,t)}return!i.startsWith("http://")&&!i.startsWith("https://")&&(i=`${oy}${i}`),i}function dO(i){return i}function Nl(i){return i&&typeof i=="object"&&i.isBuffer}function Ur(i){if(Nl(i))return i;if(i instanceof ArrayBuffer)return i;if(Ll(i))return $r(i);if(ArrayBuffer.isView(i)){const e=i.buffer;return i.byteOffset===0&&i.byteLength===i.buffer.byteLength?e:e.slice(i.byteOffset,i.byteOffset+i.byteLength)}if(typeof i=="string"){const e=i;return new TextEncoder().encode(e).buffer}if(i&&typeof i=="object"&&i._toArrayBuffer)return i._toArrayBuffer();throw new Error("toArrayBuffer")}function zl(i){if(i instanceof ArrayBuffer)return i;if(Ll(i))return $r(i);const{buffer:e,byteOffset:t,byteLength:n}=i;return e instanceof ArrayBuffer&&t===0&&n===e.byteLength?e:$r(e,t,n)}function $r(i,e=0,t=i.byteLength-e){const n=new Uint8Array(i,e,t),s=new Uint8Array(n.length);return s.set(n),s.buffer}function cy(i){return ArrayBuffer.isView(i)?i:new Uint8Array(i)}function Ul(i){const e=i?i.lastIndexOf("/"):-1;return e>=0?i.substr(e+1):i}function $l(i){const e=i?i.lastIndexOf("/"):-1;return e>=0?i.substr(0,e):""}class ly extends Error{constructor(t,n){super(t);h(this,"reason");h(this,"url");h(this,"response");this.reason=n.reason,this.url=n.url,this.response=n.response}}const uy=/^data:([-\w.]+\/[-\w.+]+)(;|,)/,fy=/^([-\w.]+\/[-\w.+]+)/;function Gl(i,e){return i.toLowerCase()===e.toLowerCase()}function dy(i){const e=fy.exec(i);return e?e[1]:i}function Vl(i){const e=uy.exec(i);return e?e[1]:""}const jl=/\?.*/;function hy(i){const e=i.match(jl);return e&&e[0]}function xn(i){return i.replace(jl,"")}function gy(i){if(i.length<50)return i;const e=i.slice(i.length-15);return`${i.substr(0,32)}...${e}`}function wn(i){return ft(i)?i.url:dt(i)?("name"in i?i.name:"")||"":typeof i=="string"?i:""}function Pn(i){if(ft(i)){const e=i.headers.get("content-type")||"",t=xn(i.url);return dy(e)||Vl(t)}return dt(i)?i.type||"":typeof i=="string"?Vl(i):""}function py(i){return ft(i)?i.headers["content-length"]||-1:dt(i)?i.size:typeof i=="string"?i.length:i instanceof ArrayBuffer||ArrayBuffer.isView(i)?i.byteLength:-1}async function Wl(i){if(ft(i))return i;const e={},t=py(i);t>=0&&(e["content-length"]=String(t));const n=wn(i),s=Pn(i);s&&(e["content-type"]=s);const r=await by(i);r&&(e["x-first-bytes"]=r),typeof i=="string"&&(i=new TextEncoder().encode(i));const o=new Response(i,{headers:e});return Object.defineProperty(o,"url",{value:n}),o}async function my(i){if(!i.ok)throw await yy(i)}async function yy(i){const e=gy(i.url);let t=`Failed to fetch resource (${i.status}) ${i.statusText}: ${e}`;t=t.length>100?`${t.slice(0,100)}...`:t;const n={reason:i.statusText,url:i.url,response:i};try{const s=i.headers.get("Content-Type");n.reason=!i.bodyUsed&&s?.includes("application/json")?await i.json():await i.text()}catch{}return new ly(t,n)}async function by(i){if(typeof i=="string")return`data:,${i.slice(0,5)}`;if(i instanceof Blob){const t=i.slice(0,5);return await new Promise(n=>{const s=new FileReader;s.onload=r=>n(r?.target?.result),s.readAsDataURL(t)})}if(i instanceof ArrayBuffer){const t=i.slice(0,5);return`data:base64,${_y(t)}`}return null}function _y(i){let e="";const t=new Uint8Array(i);for(let n=0;n<t.byteLength;n++)e+=String.fromCharCode(t[n]);return btoa(e)}function vy(i){return!xy(i)&&!wy(i)}function xy(i){return i.startsWith("http:")||i.startsWith("https:")}function wy(i){return i.startsWith("data:")}async function Hl(i,e){if(typeof i=="string"){const t=ay(i);return vy(t)&&globalThis.loaders?.fetchNode?globalThis.loaders?.fetchNode(t,e):await fetch(t,e)}return await Wl(i)}const Sn=new pi({id:"loaders.gl"});class Py{log(){return()=>{}}info(){return()=>{}}warn(){return()=>{}}error(){return()=>{}}}class Sy{constructor(){h(this,"console");this.console=console}log(...e){return this.console.log.bind(this.console,...e)}info(...e){return this.console.info.bind(this.console,...e)}warn(...e){return this.console.warn.bind(this.console,...e)}error(...e){return this.console.error.bind(this.console,...e)}}const Gr={core:{baseUrl:void 0,fetch:null,mimeType:void 0,fallbackMimeType:void 0,ignoreRegisteredLoaders:void 0,nothrow:!1,log:new Sy,useLocalLibraries:!1,CDN:"https://unpkg.com/@loaders.gl",worker:!0,maxConcurrency:3,maxMobileConcurrency:1,reuseWorkers:bl,_nodeWorkers:!1,_workerType:"",limit:0,_limitMB:0,batchSize:"auto",batchDebounceMs:0,metadata:!1,transforms:[]}},Ey={baseUri:"core.baseUrl",fetch:"core.fetch",mimeType:"core.mimeType",fallbackMimeType:"core.fallbackMimeType",ignoreRegisteredLoaders:"core.ignoreRegisteredLoaders",nothrow:"core.nothrow",log:"core.log",useLocalLibraries:"core.useLocalLibraries",CDN:"core.CDN",worker:"core.worker",maxConcurrency:"core.maxConcurrency",maxMobileConcurrency:"core.maxMobileConcurrency",reuseWorkers:"core.reuseWorkers",_nodeWorkers:"core.nodeWorkers",_workerType:"core._workerType",_worker:"core._workerType",limit:"core.limit",_limitMB:"core._limitMB",batchSize:"core.batchSize",batchDebounceMs:"core.batchDebounceMs",metadata:"core.metadata",transforms:"core.transforms",throws:"nothrow",dataType:"(no longer used)",uri:"core.baseUrl",method:"core.fetch.method",headers:"core.fetch.headers",body:"core.fetch.body",mode:"core.fetch.mode",credentials:"core.fetch.credentials",cache:"core.fetch.cache",redirect:"core.fetch.redirect",referrer:"core.fetch.referrer",referrerPolicy:"core.fetch.referrerPolicy",integrity:"core.fetch.integrity",keepalive:"core.fetch.keepalive",signal:"core.fetch.signal"},Vr=["baseUrl","fetch","mimeType","fallbackMimeType","ignoreRegisteredLoaders","nothrow","log","useLocalLibraries","CDN","worker","maxConcurrency","maxMobileConcurrency","reuseWorkers","_nodeWorkers","_workerType","limit","_limitMB","batchSize","batchDebounceMs","metadata","transforms"];function Yl(){globalThis.loaders=globalThis.loaders||{};const{loaders:i}=globalThis;return i._state||(i._state={}),i._state}function ql(){const i=Yl();return i.globalOptions=i.globalOptions||{...Gr,core:{...Gr.core}},gt(i.globalOptions)}function Cy(i,e,t,n){return t=t||[],t=Array.isArray(t)?t:[t],Ly(i,t),gt(Ay(e,i,n))}function gt(i){const e=My(i);Kl(e);for(const t of Vr)e.core&&e.core[t]!==void 0&&delete e[t];return e.core&&e.core._workerType!==void 0&&delete e._worker,e}function Ly(i,e){Xl(i,null,Gr,Ey,e);for(const t of e){const n=i&&i[t.id]||{},s=t.options&&t.options[t.id]||{},r=t.deprecatedOptions&&t.deprecatedOptions[t.id]||{};Xl(n,t.id,s,r,e)}}function Xl(i,e,t,n,s){const r=e||"Top level",o=e?`${e}.`:"";for(const a in i){const c=!e&&ut(i[a]),l=a==="baseUri"&&!e,u=a==="workerUrl"&&e;if(!(a in t)&&!l&&!u){if(a in n)Sn.level>0&&Sn.warn(`${r} loader option '${o}${a}' no longer supported, use '${n[a]}'`)();else if(!c&&Sn.level>0){const f=Ty(a,s);Sn.warn(`${r} loader option '${o}${a}' not recognized. ${f}`)()}}}}function Ty(i,e){const t=i.toLowerCase();let n="";for(const s of e)for(const r in s.options){if(i===r)return`Did you mean '${s.id}.${r}'?`;const o=r.toLowerCase();(t.startsWith(o)||o.startsWith(t))&&(n=n||`Did you mean '${s.id}.${r}'?`)}return n}function Ay(i,e,t){const n=i.options||{},s={...n};n.core&&(s.core={...n.core}),Kl(s),s.core?.log===null&&(s.core={...s.core,log:new Py}),Zl(s,gt(ql()));const r=gt(e);return Zl(s,r),Iy(s,t),Ry(s),s}function Zl(i,e){for(const t in e)if(t in e){const n=e[t];Cl(n)&&Cl(i[t])?i[t]={...i[t],...e[t]}:i[t]=e[t]}}function Iy(i,e){if(!e)return;i.core?.baseUrl!==void 0||(i.core||(i.core={}),i.core.baseUrl=$l(xn(e)))}function My(i){const e={...i};return i.core&&(e.core={...i.core}),e}function Kl(i){i.baseUri!==void 0&&(i.core||(i.core={}),i.core.baseUrl===void 0&&(i.core.baseUrl=i.baseUri));for(const t of Vr)if(i[t]!==void 0){const s=i.core=i.core||{};s[t]===void 0&&(s[t]=i[t])}const e=i._worker;e!==void 0&&(i.core||(i.core={}),i.core._workerType===void 0&&(i.core._workerType=e))}function Ry(i){const e=i.core;if(e)for(const t of Vr)e[t]!==void 0&&(i[t]=e[t])}function jr(i){return i?(Array.isArray(i)&&(i=i[0]),Array.isArray(i?.extensions)):!1}function Wr(i){yl(i,"null loader"),yl(jr(i),"invalid loader");let e;return Array.isArray(i)&&(e=i[1],i=i[0],i={...i,options:{...i.options,...e}}),(i?.parseTextSync||i?.parseText)&&(i.text=!0),i.text||(i.binary=!0),i}const Ql=()=>{const i=Yl();return i.loaderRegistry=i.loaderRegistry||[],i.loaderRegistry};function Oy(i){const e=Ql();i=Array.isArray(i)?i:[i];for(const t of i){const n=Wr(t);e.find(s=>n===s)||e.unshift(n)}}function By(){return Ql()}const ky=/\.([^.]+)$/;async function Dy(i,e=[],t,n){if(!eu(i))return null;const s=gt(t||{});if(s.core||(s.core={}),i instanceof Response&&Jl(i)){const o=await i.clone().text(),a=En(o,e,{...s,core:{...s.core,nothrow:!0}},n);if(a)return a}let r=En(i,e,{...s,core:{...s.core,nothrow:!0}},n);if(r)return r;if(dt(i)&&(i=await i.slice(0,10).arrayBuffer(),r=En(i,e,s,n)),!r&&i instanceof Response&&Jl(i)){const o=await i.clone().text();r=En(o,e,s,n)}if(!r&&!s.core.nothrow)throw new Error(tu(i));return r}function Jl(i){const e=Pn(i);return!!(e&&(e.startsWith("text/")||e==="application/json"||e.endsWith("+json")))}function En(i,e=[],t,n){if(!eu(i))return null;const s=gt(t||{});if(s.core||(s.core={}),e&&!Array.isArray(e))return Wr(e);let r=[];e&&(r=r.concat(e)),s.core.ignoreRegisteredLoaders||r.push(...By()),Ny(r);const o=Fy(i,r,s,n);if(!o&&!s.core.nothrow)throw new Error(tu(i));return o}function Fy(i,e,t,n){const s=wn(i),r=Pn(i),o=xn(s)||n?.url;let a=null,c="";return t?.core?.mimeType&&(a=Hr(e,t?.core?.mimeType),c=`match forced by supplied MIME type ${t?.core?.mimeType}`),a=a||zy(e,o),c=c||(a?`matched url ${o}`:""),a=a||Hr(e,r),c=c||(a?`matched MIME type ${r}`:""),a=a||$y(e,i),c=c||(a?`matched initial data ${nu(i)}`:""),t?.core?.fallbackMimeType&&(a=a||Hr(e,t?.core?.fallbackMimeType),c=c||(a?`matched fallback MIME type ${r}`:"")),c&&Om.log(1,`selectLoader selected ${a?.name}: ${c}.`),a}function eu(i){return!(i instanceof Response&&i.status===204)}function tu(i){const e=wn(i),t=Pn(i);let n="No valid loader found (";n+=e?`${Ul(e)}, `:"no url provided, ",n+=`MIME type: ${t?`"${t}"`:"not provided"}, `;const s=i?nu(i):"";return n+=s?` first bytes: "${s}"`:"first bytes: not available",n+=")",n}function Ny(i){for(const e of i)Wr(e)}function zy(i,e){const t=e&&ky.exec(e),n=t&&t[1];return n?Uy(i,n):null}function Uy(i,e){e=e.toLowerCase();for(const t of i)for(const n of t.extensions)if(n.toLowerCase()===e)return t;return null}function Hr(i,e){for(const t of i)if(t.mimeTypes?.some(n=>Gl(e,n))||Gl(e,`application/x.${t.id}`))return t;return null}function $y(i,e){if(!e)return null;for(const t of i)if(typeof e=="string"){if(Gy(e,t))return t}else if(ArrayBuffer.isView(e)){if(iu(e.buffer,e.byteOffset,t))return t}else if(e instanceof ArrayBuffer&&iu(e,0,t))return t;return null}function Gy(i,e){return e.testText?e.testText(i):(Array.isArray(e.tests)?e.tests:[e.tests]).some(n=>i.startsWith(n))}function iu(i,e,t){return(Array.isArray(t.tests)?t.tests:[t.tests]).some(s=>Vy(i,e,t,s))}function Vy(i,e,t,n){if(kr(n))return ty(n,i,n.byteLength);switch(typeof n){case"function":return n(zl(i));case"string":const s=Yr(i,e,n.length);return n===s;default:return!1}}function nu(i,e=5){return typeof i=="string"?i.slice(0,e):ArrayBuffer.isView(i)?Yr(i.buffer,i.byteOffset,e):i instanceof ArrayBuffer?Yr(i,0,e):""}function Yr(i,e,t){if(i.byteLength<e+t)return"";const n=new DataView(i);let s="";for(let r=0;r<t;r++)s+=String.fromCharCode(n.getUint8(e+r));return s}const jy=256*1024;function*Wy(i,e){const t=e?.chunkSize||jy;let n=0;const s=new TextEncoder;for(;n<i.length;){const r=Math.min(i.length-n,t),o=i.slice(n,n+r);n+=r,yield zl(s.encode(o))}}const Hy=256*1024;function*Yy(i,e={}){const{chunkSize:t=Hy}=e;let n=0;for(;n<i.byteLength;){const s=Math.min(i.byteLength-n,t),r=new ArrayBuffer(s),o=new Uint8Array(i,n,s);new Uint8Array(r).set(o),n+=s,yield r}}const qy=1024*1024;async function*Xy(i,e){const t=e?.chunkSize||qy;let n=0;for(;n<i.size;){const s=n+t,r=await i.slice(n,s).arrayBuffer();n=s,yield r}}function su(i,e){return bl?Zy(i,e):Ky(i)}async function*Zy(i,e){const t=i.getReader();let n;try{for(;;){const s=n||t.read();e?._streamReadAhead&&(n=t.read());const{done:r,value:o}=await s;if(r)return;yield Ur(o)}}catch{t.releaseLock()}}async function*Ky(i,e){for await(const t of i)yield Ur(t)}function Qy(i,e){if(typeof i=="string")return Wy(i,e);if(i instanceof ArrayBuffer)return Yy(i,e);if(dt(i))return Xy(i,e);if(Tl(i))return su(i,e);if(ft(i)){const t=i.body;if(!t)throw new Error("Readable stream not available on Response");return su(t,e)}throw new Error("makeIterator")}const ru="Cannot convert supplied data type";function Jy(i,e,t){if(e.text&&typeof i=="string")return i;if(Nl(i)&&(i=i.buffer),kr(i)){const n=cy(i);return e.text&&!e.binary?new TextDecoder("utf8").decode(n):Ur(n)}throw new Error(ru)}async function eb(i,e,t){if(typeof i=="string"||kr(i))return Jy(i,e);if(dt(i)&&(i=await Wl(i)),ft(i))return await my(i),e.binary?await i.arrayBuffer():await i.text();if(Tl(i)&&(i=Qy(i,t)),km(i)||Dm(i))return sy(i);throw new Error(ru)}function ou(i,e){const t=ql(),n=i||t,s=n.fetch??n.core?.fetch;return typeof s=="function"?s:ut(s)?r=>Hl(r,s):e?.fetch?e?.fetch:Hl}function tb(i,e,t){if(t)return t;const n={fetch:ou(e,i),...i};if(n.url){const s=xn(n.url);n.baseUrl=s,n.queryString=hy(n.url),n.filename=Ul(s),n.baseUrl=$l(s)}return Array.isArray(n.loaders)||(n.loaders=null),n}function ib(i,e){if(i&&!Array.isArray(i))return i;let t;if(i&&(t=Array.isArray(i)?i:[i]),e&&e.loaders){const n=Array.isArray(e.loaders)?e.loaders:[e.loaders];t=t?[...t,...n]:n}return t&&t.length?t:void 0}async function Cn(i,e,t,n){e&&!Array.isArray(e)&&!jr(e)&&(n=void 0,t=e,e=void 0),i=await i,t=t||{};const s=wn(i),o=ib(e,n),a=await Dy(i,o,t);if(!a)return null;const c=Cy(t,a,o,s);return n=tb({url:s,_parse:Cn,loaders:o},c,n||null),await nb(a,i,c,n)}async function nb(i,e,t,n){if(Km(i),t=zm(i.options,t),ft(e)){const{ok:r,redirected:o,status:a,statusText:c,type:l,url:u}=e,f=Object.fromEntries(e.headers.entries());n.response={headers:f,ok:r,redirected:o,status:a,statusText:c,type:l,url:u}}e=await eb(e,i,t);const s=i;if(s.parseTextSync&&typeof e=="string")return s.parseTextSync(e,t,n);if(Qm(i,t))return await Jm(i,e,t,n,Cn);if(s.parseText&&typeof e=="string")return await s.parseText(e,t,n);if(s.parse)return await s.parse(e,t,n);throw Xe(!s.parseSync),new Error(`${i.id} loader - no parser found and worker is disabled`)}function sb(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function rb(i){return Array.isArray(i)?i.length===0||typeof i[0]=="number":!1}function au(i){return sb(i)||rb(i)}async function Ln(i,e,t,n){let s,r;!Array.isArray(e)&&!jr(e)?(s=[],r=e):(s=e,r=t);const o=ou(r);let a=i;return typeof i=="string"&&(a=await o(i)),dt(i)&&(a=await o(i)),typeof i=="string"&&(gt(r||{}).core?.baseUrl||(r={...r,core:{...r?.core,baseUrl:i}})),Array.isArray(s)?await Cn(a,s,r):await Cn(a,s,r)}const ob="4.5.1";function cu(i,e){if(!i)throw new Error("loader assertion failed.")}const ab=!!(typeof process!="object"||String(process)!=="[object process]"||process.browser),lu=typeof process<"u"&&process.version&&/v([0-9]*)/.exec(process.version);lu&&parseFloat(lu[1]);const cb=globalThis.loaders?.parseImageNode,qr=typeof Image<"u",Xr=typeof ImageBitmap<"u",Zr=ab?!0:!!cb;function lb(i){switch(i){case"auto":return Xr||qr||Zr;case"imagebitmap":return Xr;case"image":return qr;case"data":return Zr;default:throw new Error(`@loaders.gl/images: image ${i} not supported in this environment`)}}function ub(){if(Xr)return"imagebitmap";if(qr)return"image";if(Zr)return"data";throw new Error("Install '@loaders.gl/polyfills' to parse images under Node.js")}function fb(i){const e=hb(i);if(!e)throw new Error("Not an image");return e}function db(i){switch(fb(i)){case"data":return i;case"image":case"imagebitmap":const e=document.createElement("canvas"),t=e.getContext("2d");if(!t)throw new Error("getImageData");return e.width=i.width,e.height=i.height,t.drawImage(i,0,0),t.getImageData(0,0,i.width,i.height);default:throw new Error("getImageData")}}function hb(i){return typeof ImageBitmap<"u"&&i instanceof ImageBitmap?"imagebitmap":typeof Image<"u"&&i instanceof Image?"image":i&&typeof i=="object"&&i.data&&i.width&&i.height?"data":null}const gb=/^data:image\/svg\+xml/,pb=/\.svg((\?|#).*)?$/;function Kr(i){return i&&(gb.test(i)||pb.test(i))}function mb(i,e){if(Kr(e)){let n=new TextDecoder().decode(i);try{typeof unescape=="function"&&typeof encodeURIComponent=="function"&&(n=unescape(encodeURIComponent(n)))}catch(r){throw new Error(r.message)}return`data:image/svg+xml;base64,${btoa(n)}`}return uu(i,e)}function uu(i,e){if(Kr(e))throw new Error("SVG cannot be parsed directly to imagebitmap");return new Blob([new Uint8Array(i)])}async function fu(i,e,t){const n=mb(i,t),s=self.URL||self.webkitURL,r=typeof n!="string"&&s.createObjectURL(n);try{return await yb(r||n,e)}finally{r&&s.revokeObjectURL(r)}}async function yb(i,e){const t=new Image;return t.src=i,e.image&&e.image.decode&&t.decode?(await t.decode(),t):await new Promise((n,s)=>{try{t.onload=()=>n(t),t.onerror=r=>{const o=r instanceof Error?r.message:"error";s(new Error(o))}}catch(r){s(r)}})}let du=!0;async function bb(i,e,t){let n;Kr(t)?n=await fu(i,e,t):n=uu(i,t);const s=e&&e.imagebitmap;return await _b(n,s)}async function _b(i,e=null){if((vb(e)||!du)&&(e=null),e)try{return await createImageBitmap(i,e)}catch(t){console.warn(t),du=!1}return await createImageBitmap(i)}function vb(i){if(!i)return!0;for(const e in i)if(Object.prototype.hasOwnProperty.call(i,e))return!1;return!0}function xb(i){return!Eb(i,"ftyp",4)||!(i[8]&96)?null:wb(i)}function wb(i){switch(Pb(i,8,12).replace("\0"," ").trim()){case"avif":case"avis":return{extension:"avif",mimeType:"image/avif"};default:return null}}function Pb(i,e,t){return String.fromCharCode(...i.slice(e,t))}function Sb(i){return[...i].map(e=>e.charCodeAt(0))}function Eb(i,e,t=0){const n=Sb(e);for(let s=0;s<n.length;++s)if(n[s]!==i[s+t])return!1;return!0}const Te=!1,mi=!0;function hu(i){const e=yi(i);return Lb(e)||Ib(e)||Tb(e)||Ab(e)||Cb(e)}function Cb(i){const e=new Uint8Array(i instanceof DataView?i.buffer:i),t=xb(e);return t?{mimeType:t.mimeType,width:0,height:0}:null}function Lb(i){const e=yi(i);return e.byteLength>=24&&e.getUint32(0,Te)===2303741511?{mimeType:"image/png",width:e.getUint32(16,Te),height:e.getUint32(20,Te)}:null}function Tb(i){const e=yi(i);return e.byteLength>=10&&e.getUint32(0,Te)===1195984440?{mimeType:"image/gif",width:e.getUint16(6,mi),height:e.getUint16(8,mi)}:null}function Ab(i){const e=yi(i);return e.byteLength>=14&&e.getUint16(0,Te)===16973&&e.getUint32(2,mi)===e.byteLength?{mimeType:"image/bmp",width:e.getUint32(18,mi),height:e.getUint32(22,mi)}:null}function Ib(i){const e=yi(i);if(!(e.byteLength>=3&&e.getUint16(0,Te)===65496&&e.getUint8(2)===255))return null;const{tableMarkers:n,sofMarkers:s}=Mb();let r=2;for(;r+9<e.byteLength;){const o=e.getUint16(r,Te);if(s.has(o))return{mimeType:"image/jpeg",height:e.getUint16(r+5,Te),width:e.getUint16(r+7,Te)};if(!n.has(o))return null;r+=2,r+=e.getUint16(r,Te)}return null}function Mb(){const i=new Set([65499,65476,65484,65501,65534]);for(let t=65504;t<65520;++t)i.add(t);return{tableMarkers:i,sofMarkers:new Set([65472,65473,65474,65475,65477,65478,65479,65481,65482,65483,65485,65486,65487,65502])}}function yi(i){if(i instanceof DataView)return i;if(ArrayBuffer.isView(i))return new DataView(i.buffer);if(i instanceof ArrayBuffer)return new DataView(i);throw new Error("toDataView")}async function Rb(i,e){const{mimeType:t}=hu(i)||{},n=globalThis.loaders?.parseImageNode;return cu(n),await n(i,t)}async function Ob(i,e,t){e=e||{};const s=(e.image||{}).type||"auto",{url:r}=t||{},o=Bb(s);let a;switch(o){case"imagebitmap":a=await bb(i,e,r);break;case"image":a=await fu(i,e,r);break;case"data":a=await Rb(i);break;default:cu(!1)}return s==="data"&&(a=db(a)),a}function Bb(i){switch(i){case"auto":case"data":return ub();default:return lb(i),i}}const kb={dataType:null,batchType:null,id:"image",module:"images",name:"Images",version:ob,mimeTypes:["image/png","image/jpeg","image/gif","image/webp","image/avif","image/bmp","image/vnd.microsoft.icon","image/svg+xml"],extensions:["png","jpg","jpeg","gif","webp","bmp","ico","svg","avif"],parse:Ob,tests:[i=>!!hu(new DataView(i))],options:{image:{type:"auto",decode:!0}}},D=new pi({id:"deck"});let Qr={};function Db(i){Qr=i}function ie(i,e,t,n){D.level>0&&Qr[i]&&Qr[i].call(null,e,t,n)}function Fb(i){const e=i[0],t=i[i.length-1];return e==="{"&&t==="}"||e==="["&&t==="]"}const Nb={dataType:null,batchType:null,id:"JSON",name:"JSON",module:"",version:"",options:{},extensions:["json","geojson"],mimeTypes:["application/json","application/geo+json"],testText:Fb,parseTextSync:JSON.parse};function zb(){const i="9.4.0",e=globalThis.deck&&globalThis.deck.VERSION;if(e&&e!==i)throw new Error(`deck.gl - multiple versions detected: ${e} vs ${i}`);return e||(D.log(1,`deck.gl ${i}`)(),globalThis.deck={...globalThis.deck,VERSION:i,version:i,log:D,_registerLoggers:Db},Oy([Nb,[kb,{imagebitmap:{premultiplyAlpha:"none"}}]])),i}const Ub=zb(),fe="(?:var<\\s*(uniform|storage(?:\\s*,\\s*[A-Za-z_][A-Za-z0-9_]*)?)\\s*>|var)\\s+([A-Za-z_][A-Za-z0-9_]*)",de="\\s*",bi=[new RegExp(`@binding\\(\\s*(auto|\\d+)\\s*\\)${de}@group\\(\\s*(\\d+)\\s*\\)${de}${fe}`,"g"),new RegExp(`@group\\(\\s*(\\d+)\\s*\\)${de}@binding\\(\\s*(auto|\\d+)\\s*\\)${de}${fe}`,"g")],Jr=[new RegExp(`@binding\\(\\s*(auto|\\d+)\\s*\\)${de}@group\\(\\s*(\\d+)\\s*\\)${de}${fe}`,"g"),new RegExp(`@group\\(\\s*(\\d+)\\s*\\)${de}@binding\\(\\s*(auto|\\d+)\\s*\\)${de}${fe}`,"g")],$b=[new RegExp(`@binding\\(\\s*(\\d+)\\s*\\)${de}@group\\(\\s*(\\d+)\\s*\\)${de}${fe}`,"g"),new RegExp(`@group\\(\\s*(\\d+)\\s*\\)${de}@binding\\(\\s*(\\d+)\\s*\\)${de}${fe}`,"g")],Gb=[new RegExp(`@binding\\(\\s*(auto)\\s*\\)\\s*@group\\(\\s*(\\d+)\\s*\\)\\s*${fe}`,"g"),new RegExp(`@group\\(\\s*(\\d+)\\s*\\)\\s*@binding\\(\\s*(auto)\\s*\\)\\s*${fe}`,"g"),new RegExp(`@binding\\(\\s*(auto)\\s*\\)\\s*@group\\(\\s*(\\d+)\\s*\\)(?:[\\s\\n\\r]*@[A-Za-z_][^\\n\\r]*)*[\\s\\n\\r]*${fe}`,"g"),new RegExp(`@group\\(\\s*(\\d+)\\s*\\)\\s*@binding\\(\\s*(auto)\\s*\\)(?:[\\s\\n\\r]*@[A-Za-z_][^\\n\\r]*)*[\\s\\n\\r]*${fe}`,"g")];function Tn(i){const e=i.split("");let t=0,n=0,s=!1,r=!1,o=!1;for(;t<i.length;){const a=i[t],c=i[t+1];if(r){o?o=!1:a==="\\"?o=!0:a==='"'&&(r=!1),t++;continue}if(s){a===`
`||a==="\r"?s=!1:e[t]=" ",t++;continue}if(n>0){if(a==="/"&&c==="*"){e[t]=" ",e[t+1]=" ",n++,t+=2;continue}if(a==="*"&&c==="/"){e[t]=" ",e[t+1]=" ",n--,t+=2;continue}a!==`
`&&a!=="\r"&&(e[t]=" "),t++;continue}if(a==='"'){r=!0,t++;continue}if(a==="/"&&c==="/"){e[t]=" ",e[t+1]=" ",s=!0,t+=2;continue}if(a==="/"&&c==="*"){e[t]=" ",e[t+1]=" ",n=1,t+=2;continue}t++}return e.join("")}function Ot(i,e){const t=Tn(i),n=[];for(const s of e){s.lastIndex=0;let r;for(r=s.exec(t);r;){const o=s===e[0],a=r.index,c=r[0].length;n.push({match:i.slice(a,a+c),index:a,length:c,bindingToken:r[o?1:2],groupToken:r[o?2:1],accessDeclaration:r[3]?.trim(),name:r[4]}),r=s.exec(t)}}return n.sort((s,r)=>s.index-r.index)}function gu(i,e,t){const n=Ot(i,e);if(!n.length)return i;let s="",r=0;for(const o of n)s+=i.slice(r,o.index),s+=t(o),r=o.index+o.length;return s+=i.slice(r),s}function pu(i){return/@binding\(\s*auto\s*\)/.test(Tn(i))}function Vb(i,e){return Ot(i,e===bi||e===Jr?Gb:e).find(n=>n.bindingToken==="auto")}function mu(i,e={}){const t=yu(i),n=jb(t);if(!n)return null;const s=Wb(t,n);if(!s)return null;const r=Yb(t,n,s);if(!r)return null;if(e.scanVertexAttributes===!1)return{attributes:[],bindings:r};const o=Hb(t,n);if(!o)return null;const a=Qb(t,n,s,o,e.vertexEntryPoint);return a?{attributes:a,bindings:r}:null}function yu(i){const e=Tn(i),t=/[A-Za-z_][A-Za-z0-9_]*|(?:0[xX][0-9A-Fa-f]+|\d+)|[@(){}<>\[\]:,;=]/g,n=[];let s=t.exec(e);for(;s;)n.push({value:s[0],index:s.index}),s=t.exec(e);return n}function jb(i){const e=[];let t=0;for(const n of i){if(n.value==="}"&&t===0)return null;e.push(t),n.value==="{"?t++:n.value==="}"&&t--}return t===0?e:null}function Wb(i,e){const t=new Map;for(let n=0;n<i.length;n++){if(e[n]!==0||i[n].value!=="alias")continue;const s=i[n+1]?.value;if(!_i(s)||i[n+2]?.value!=="="||t.has(s))return null;const r=vu(i,e,n+3,";");if(r<0||r===n+3)return null;t.set(s,In(i.slice(n+3,r))),n=r}return t}function Hb(i,e){const t=new Map;for(let n=0;n<i.length;n++){if(e[n]!==0||i[n].value!=="struct")continue;const s=i[n+1]?.value,r=n+2;if(!_i(s)||t.has(s)||i[r]?.value!=="{")return null;const o=no(i,r,"{","}");if(o<0)return null;t.set(s,i.slice(r+1,o)),n=o}return t}function Yb(i,e,t){const n=[],s=new Set,r=new Set;for(let o=0;o<i.length;o++){if(e[o]!==0||i[o].value!=="var")continue;const a=xu(i,e,o),c=i.slice(a,o),l=to(c,"group"),u=to(c,"binding");if(l===null||u===null||l===void 0!=(u===void 0))return null;if(l===void 0||u===void 0)continue;let f=o+1,d=[];if(i[f]?.value==="<"){const v=no(i,f,"<",">");if(v<0)return null;const b=An(i.slice(f+1,v),",");if(!b)return null;d=b.map(In),f=v+1}const g=i[f]?.value;if(!_i(g)||i[f+1]?.value!==":")return null;const p=vu(i,e,f+2,";");if(p<0||p===f+2)return null;const m=eo(In(i.slice(f+2,p)),t);if(!m)return null;const y=qb({name:g,group:l,location:u,addressSpace:d,resourceType:m}),_=`${l}:${u}`;if(!y||s.has(_)||r.has(g))return null;n.push(y),s.add(_),r.add(g),o=p}return Kb(n),n.sort((o,a)=>o.group-a.group||o.location-a.location||o.name.localeCompare(a.name))}function qb(i){const{name:e,group:t,location:n,addressSpace:s,resourceType:r}=i,o={name:e,group:t,location:n};if(s[0]==="uniform"&&s.length===1)return{...o,type:"uniform"};if(s[0]==="storage"&&s.length<=2){const a=s[1]||"read";return a==="read"?{...o,type:"read-only-storage"}:a==="read_write"?{...o,type:"storage"}:null}return s.length>0?null:r==="sampler"||r==="sampler_comparison"?{...o,type:"sampler",...r==="sampler_comparison"?{samplerType:"comparison"}:{}}:r==="texture_external"?{...o,type:"external-texture"}:Xb(o,r)||Zb(o,r)}function Xb(i,e){const t=/^texture_storage_(1d|2d|2d_array|3d)<([A-Za-z0-9_]+),(read|write|read_write)>$/.exec(e);if(!t)return null;const n={read:"read-only",write:"write-only",read_write:"read-write"}[t[3]];return{...i,type:"storage",format:t[2],access:n,viewDimension:io(t[1])}}function Zb(i,e){const t=/^texture_(multisampled_)?(1d|2d|2d_array|cube|cube_array|3d)<(f32|i32|u32)>$/.exec(e);if(t){if(t[1]&&t[2]!=="2d")return null;const s={f32:"float",i32:"sint",u32:"uint"}[t[3]];return{...i,type:"texture",viewDimension:io(t[2]),sampleType:s,multisampled:!!t[1]}}const n=/^texture_depth_(multisampled_)?(2d|2d_array|cube|cube_array)$/.exec(e);return!n||n[1]&&n[2]!=="2d"?null:{...i,type:"texture",viewDimension:io(n[2]),sampleType:"depth",multisampled:!!n[1]}}function Kb(i){for(const e of i){if(e.type!=="sampler"||e.samplerType||!e.name.endsWith("Sampler"))continue;const t=e.name.slice(0,-7);i.find(s=>s.type==="texture"&&s.name===t&&s.group===e.group)?.sampleType==="depth"&&(e.samplerType="non-filtering")}}function Qb(i,e,t,n,s){const r=Jb(i,e);if(!r)return null;const o=r.filter(g=>g.vertex),a=s?o.find(g=>g.name===s):o.length===1?o[0]:void 0;if(!a)return o.length===0&&!s?[]:null;const c=An(a.parameters,",");if(!c)return null;const l=[],u=new Set,f=new Set,d=new Set;for(const g of c)if(g.length>0&&!bu({declaration:g,aliases:t,structures:n,attributes:l,attributeLocations:u,attributeNames:f,visitedStructures:d}))return null;return l.sort((g,p)=>g.location-p.location||g.name.localeCompare(p.name))}function Jb(i,e){const t=[],n=new Set;for(let s=0;s<i.length;s++){if(e[s]!==0||i[s].value!=="fn")continue;const r=i[s+1]?.value,o=s+2;if(!_i(r)||n.has(r)||i[o]?.value!=="(")return null;const a=no(i,o,"(",")");if(a<0)return null;const c=xu(i,e,s);t.push({name:r,vertex:_u(i.slice(c,s),"vertex"),parameters:i.slice(o+1,a)}),n.add(r),s=a}return t}function bu(i){const{declaration:e,aliases:t,structures:n,attributes:s,attributeLocations:r,attributeNames:o,visitedStructures:a}=i,c=i_(e,":");if(c<1||c===e.length-1)return!1;const l=n_(e.slice(0,c)),u=to(e.slice(0,c),"location"),f=_u(e.slice(0,c),"builtin"),d=eo(In(e.slice(c+1)),t);if(!l||u===null||!d||u!==void 0&&f)return!1;if(u!==void 0){const m=t_(d);return!m||r.has(u)||o.has(l)?!1:(s.push({name:l,location:u,type:m}),r.add(u),o.add(l),!0)}if(f)return!0;const g=n.get(d);if(!g||a.has(d))return!1;const p=An(g,",");if(!p)return!1;a.add(d);for(const m of p)if(m.length>0&&!bu({...i,declaration:m}))return!1;return a.delete(d),!0}function eo(i,e,t=new Set){const n=yu(i);let s="";for(const r of n){const o=e.get(r.value);if(!o){s+=e_(r.value);continue}if(t.has(r.value))return null;const a=new Set(t);a.add(r.value);const c=eo(o,e,a);if(!c)return null;s+=c}return s}function e_(i){const e=/^(vec[234]|mat[234]x[234])([fiuh])$/.exec(i);if(!e)return i;const t={f:"f32",i:"i32",u:"u32",h:"f16"}[e[2]];return`${e[1]}<${t}>`}function t_(i){return/^(?:i32|u32|f32|f16|vec[234]<(?:i32|u32|f32|f16)>)$/.test(i)?i:null}function to(i,e){let t;for(let n=0;n<i.length;n++)if(!(i[n].value!=="@"||i[n+1]?.value!==e)){if(t!==void 0||i[n+2]?.value!=="("||!/^\d+$/.test(i[n+3]?.value||"")||i[n+4]?.value!==")")return null;t=Number(i[n+3].value)}return t}function _u(i,e){return i.some((t,n)=>t.value==="@"&&i[n+1]?.value===e)}function io(i){return i.replace("_","-")}function no(i,e,t,n){let s=0;for(let r=e;r<i.length;r++)if(i[r].value===t)s++;else if(i[r].value===n&&--s===0)return r;return-1}function An(i,e){const t=[];let n=0;const s={"(":0,"<":0,"[":0,"{":0},r=Object.keys(s),o={")":"(",">":"<","]":"[","}":"{"};for(let a=0;a<i.length;a++){const c=i[a].value;if(c===e&&r.every(l=>s[l]===0)){t.push(i.slice(n,a)),n=a+1;continue}if(c in s)s[c]++;else if(c in o){const l=o[c];if(s[l]--,s[l]<0)return null}}return r.every(a=>s[a]===0)?(t.push(i.slice(n)),t):null}function i_(i,e){const t=An(i,e);return t&&t.length===2?t[0].length:-1}function vu(i,e,t,n){for(let s=t;s<i.length;s++)if(e[s]===0&&i[s].value===n)return s;return-1}function xu(i,e,t){for(let n=t-1;n>=0;n--)if(i[n].value===";"&&e[n]===0||i[n].value==="}"&&e[n]===1)return n+1;return 0}function n_(i){for(let e=i.length-1;e>=0;e--)if(_i(i[e].value))return i[e].value;return null}function In(i){return i.map(e=>e.value).join("")}function _i(i){return!!(i&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(i))}function Bt(i,e){if(!i){const t=new Error(e||"shadertools: assertion failed.");throw Error.captureStackTrace?.(t,Bt),t}}const so={number:{type:"number",validate(i,e){return Number.isFinite(i)&&typeof e=="object"&&(e.max===void 0||i<=e.max)&&(e.min===void 0||i>=e.min)}},array:{type:"array",validate(i,e){return Array.isArray(i)||ArrayBuffer.isView(i)}}};function s_(i){const e={};for(const[t,n]of Object.entries(i))e[t]=r_(n);return e}function r_(i){let e=wu(i);if(e!=="object")return{value:i,...so[e],type:e};if(typeof i=="object")return i?i.type!==void 0?{...i,...so[i.type],type:i.type}:i.value===void 0?{type:"object",value:i}:(e=wu(i.value),{...i,...so[e],type:e}):{type:"object",value:null};throw new Error("props")}function wu(i){return Array.isArray(i)||ArrayBuffer.isView(i)?"array":typeof i}const o_={vertex:`#ifdef MODULE_LOGDEPTH
  logdepth_adjustPosition(gl_Position);
#endif
`,fragment:`#ifdef MODULE_MATERIAL
  fragColor = material_filterColor(fragColor);
#endif

#ifdef MODULE_LIGHTING
  fragColor = lighting_filterColor(fragColor);
#endif

#ifdef MODULE_FOG
  fragColor = fog_filterColor(fragColor);
#endif

#ifdef MODULE_PICKING
  fragColor = picking_filterHighlightColor(fragColor);
  fragColor = picking_filterPickingColor(fragColor);
#endif

#ifdef MODULE_LOGDEPTH
  logdepth_setFragDepth();
#endif
`},Pu=/void\s+main\s*\([^)]*\)\s*\{\n?/,Su=/}\n?[^{}]*$/,ro=[],Mn="__LUMA_INJECT_DECLARATIONS__";function a_(i){const e={vertex:{},fragment:{}};for(const t in i){let n=i[t];const s=c_(t);typeof n=="string"&&(n={order:0,injection:n}),e[s][t]=n}return e}function c_(i){const e=i.slice(0,2);switch(e){case"vs":return"vertex";case"fs":return"fragment";default:throw new Error(e)}}function Rn(i,e,t,n=!1,s="glsl",r={}){const o=e==="vertex";for(const a in t){const c=t[a];c.sort((u,f)=>u.order-f.order),ro.length=c.length;for(let u=0,f=c.length;u<f;++u)ro[u]=c[u].injection;const l=`${ro.join(`
`)}
`;switch(a){case"vs:#decl":(s==="wgsl"||o)&&(i=i.replace(Mn,l));break;case"vs:#main-start":(s==="wgsl"||o)&&(i=s==="wgsl"?On(i,"vertex",l,"start",r.vertex):i.replace(Pu,u=>u+l));break;case"vs:#main-end":(s==="wgsl"||o)&&(i=s==="wgsl"?On(i,"vertex",l,"end",r.vertex):i.replace(Su,u=>l+u));break;case"fs:#decl":(s==="wgsl"||!o)&&(i=i.replace(Mn,l));break;case"fs:#main-start":(s==="wgsl"||!o)&&(i=s==="wgsl"?On(i,"fragment",l,"start",r.fragment):i.replace(Pu,u=>u+l));break;case"fs:#main-end":(s==="wgsl"||!o)&&(i=s==="wgsl"?On(i,"fragment",l,"end",r.fragment):i.replace(Su,u=>l+u));break;default:i=i.replace(a,u=>u+l)}}return i=i.replace(Mn,""),n&&(i=i.replace(/\}\s*$/,a=>a+o_[e])),i}function On(i,e,t,n,s){const r=l_(i,e,s);if(!r)return i;if(n==="start"){const o=r.openBraceIndex+1;return`${i.slice(0,o)}
${t}${i.slice(o)}`}return`${i.slice(0,r.closeBraceIndex)}${t}${i.slice(r.closeBraceIndex)}`}function l_(i,e,t){const n=e==="vertex"?"@vertex":"@fragment",s=i.indexOf(n);if(s<0)return null;const r=t?i.search(new RegExp(`\\bfn\\s+${u_(t)}\\s*\\(`)):i.indexOf("fn",s);if(r<0)return null;const o=i.indexOf("{",r);if(o<0)return null;let a=0;for(let c=o;c<i.length;c++){const l=i[c];if(l==="{")a++;else if(l==="}"&&(a--,a===0))return{openBraceIndex:o,closeBraceIndex:c}}return null}function u_(i){return i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Bn(i){i.map(e=>f_(e))}function f_(i){if(i.instance)return;Bn(i.dependencies||[]);const{propTypes:e={},deprecations:t=[],inject:n={}}=i,s={normalizedInjections:a_(n),parsedDeprecations:d_(t)};e&&(s.propValidators=s_(e)),i.instance=s;let r={};e&&(r=Object.entries(e).reduce((o,[a,c])=>{const l=c?.value;return l&&(o[a]=l),o},{})),i.defaultUniforms={...i.defaultUniforms,...r}}function Eu(i,e,t){i.deprecations?.forEach(n=>{n.regex?.test(e)&&(n.deprecated?t.deprecated(n.old,n.new)():t.removed(n.old,n.new)())})}function d_(i){return i.forEach(e=>{switch(e.type){case"function":e.regex=new RegExp(`\\b${e.old}\\(`);break;default:e.regex=new RegExp(`${e.type} ${e.old};`)}}),i}function kn(i){Bn(i);const e={},t={};Cu({modules:i,level:0,moduleMap:e,moduleDepth:t});const n=Object.keys(t).sort((s,r)=>t[r]-t[s]).map(s=>e[s]);return Bn(n),n}function Cu(i){const{modules:e,level:t,moduleMap:n,moduleDepth:s}=i;if(t>=5)throw new Error("Possible loop in shader dependency graph");for(const r of e)n[r.name]=r,(s[r.name]===void 0||s[r.name]<t)&&(s[r.name]=t);for(const r of e)r.dependencies&&Cu({modules:r.dependencies,level:t+1,moduleMap:n,moduleDepth:s})}const S=new pi({id:"luma.gl"}),Lu={id:null,powerPreference:"high-performance",failIfMajorPerformanceCaveat:!1,featureLevel:void 0,optionalFeatures:[],xrCompatible:!1,createCanvasContext:void 0,webgl:{},onError:(i,e)=>{},onResize:(i,e)=>{const[t,n]=i.getDevicePixelSize();S.log(1,`${i} resized => ${t}x${n}px`)()},onPositionChange:(i,e)=>{const[t,n]=i.getPosition();S.log(1,`${i} repositioned => ${t},${n}`)()},onVisibilityChange:i=>S.log(1,`${i} Visibility changed ${i.isVisible}`)(),onDevicePixelRatioChange:(i,e)=>S.log(1,`${i} DPR changed ${e.oldRatio} => ${i.devicePixelRatio}`)(),debug:g_(),debugGPUTime:!1,debugShaders:S.get("debug-shaders")||void 0,debugFramebuffers:!!S.get("debug-framebuffers"),debugFactories:!!S.get("debug-factories"),debugWebGL:!!S.get("debug-webgl"),debugSpectorJS:void 0,debugSpectorJSUrl:void 0,_reuseDevices:!1,_cacheShaders:!0,_destroyShaders:!1,_cachePipelines:!0,_sharePipelines:!0,_destroyPipelines:!1,_initializeFeatures:!0,_disabledFeatures:{"compilation-status-async-webgl":!0},_handle:void 0};function h_(i,e){return i!=null?!!i:e!==void 0?e!=="production":!1}function g_(){return h_(S.get("debug"),p_())}function p_(){const i=globalThis.process;if(i?.env)return i.env.NODE_ENV}const m_="GPU Time and Memory",y_=["Adapter","GPU","GPU Type","GPU Backend","Frame Rate","CPU Time","GPU Time","GPU Memory","Buffer Memory","Texture Memory","External Buffer Memory","External Texture Memory","Swap Chain Texture"],Tu=new WeakMap,Au=new WeakMap;class b_{constructor(){h(this,"stats",new Map)}getStats(e){return this.get(e)}get(e){this.stats.has(e)||this.stats.set(e,new vn({id:e}));const t=this.stats.get(e);return e===m_&&__(t,y_),t}}const Iu=new b_;function __(i,e){const t=i.stats;let n=!1;for(const c of e)t[c]||(i.get(c),n=!0);const s=Object.keys(t).length,r=Tu.get(i);if(!n&&r?.orderedStatNames===e&&r.statCount===s)return;const o={};let a=Au.get(e);a||(a=new Set(e),Au.set(e,a));for(const c of e)t[c]&&(o[c]=t[c]);for(const[c,l]of Object.entries(t))a.has(c)||(o[c]=l);for(const c of Object.keys(t))delete t[c];Object.assign(t,o),Tu.set(i,{orderedStatNames:e,statCount:s})}const v_="set luma.log.level=1 (or higher) to trace rendering",Mu="No matching device found. Ensure `@luma.gl/webgl` and/or `@luma.gl/webgpu` modules are imported.",dn=class dn{constructor(){h(this,"stats",Iu);h(this,"log",S);h(this,"VERSION","9.4.1");h(this,"spector");h(this,"preregisteredAdapters",new Map);if(globalThis.luma){if(globalThis.luma.VERSION!==this.VERSION)throw S.error(`Found luma.gl ${globalThis.luma.VERSION} while initialzing ${this.VERSION}`)(),S.error("'yarn why @luma.gl/core' can help identify the source of the conflict")(),new Error("luma.gl - multiple versions detected: see console log");S.error("This version of luma.gl has already been initialized")()}S.log(1,`${this.VERSION} - ${v_}`)(),globalThis.luma=this}async createDevice(e={}){const t={...dn.defaultProps,...e},n=this.selectAdapter(t.type,t.adapters);if(!n)throw new Error(Mu);return t.waitForPageLoad&&await n.pageLoaded,await n.create(t)}async attachDevice(e,t){const n=this._getTypeFromHandle(e,t.adapters),s=n&&this.selectAdapter(n,t.adapters);if(!s)throw new Error(Mu);return await s?.attach?.(e,t)}registerAdapters(e){for(const t of e)this.preregisteredAdapters.set(t.type,t)}getSupportedAdapters(e=[]){const t=this._getAdapterMap(e);return Array.from(t).map(([,n])=>n).filter(n=>n.isSupported?.()).map(n=>n.type)}getBestAvailableAdapterType(e=[]){const t=["webgpu","webgl","null"],n=this._getAdapterMap(e);for(const s of t)if(n.get(s)?.isSupported?.())return s;return null}selectAdapter(e,t=[]){let n=e;e==="best-available"&&(n=this.getBestAvailableAdapterType(t));const s=this._getAdapterMap(t);return n&&s.get(n)||null}enforceWebGL2(e=!0,t=[]){const s=this._getAdapterMap(t).get("webgl");s||S.warn("enforceWebGL2: webgl adapter not found")(),s?.enforceWebGL2?.(e)}setDefaultDeviceProps(e){Object.assign(dn.defaultProps,e)}_getAdapterMap(e=[]){const t=new Map(this.preregisteredAdapters);for(const n of e)t.set(n.type,n);return t}_getTypeFromHandle(e,t=[]){return e instanceof WebGL2RenderingContext?"webgl":typeof GPUDevice<"u"&&e instanceof GPUDevice||e?.queue?"webgpu":e===null?"null":(e instanceof WebGLRenderingContext?S.warn("WebGL1 is not supported",e)():S.warn("Unknown handle type",e)(),null)}};h(dn,"defaultProps",{...Lu,type:"best-available",adapters:void 0,waitForPageLoad:!0});let oo=dn;const ao=new oo;class x_{get pageLoaded(){return S_()}}const w_=It()&&typeof document<"u",P_=()=>w_&&document.readyState==="complete";let Dn=null;function S_(){return Dn||(P_()||typeof window>"u"?Dn=Promise.resolve():Dn=new Promise(i=>window.addEventListener("load",()=>i()))),Dn}const co={};function vi(i="id"){co[i]=co[i]||1;const e=co[i]++;return`${i}-${e}`}const E_="cpu-hotspot-profiler",Ru="GPU Resource Counts",Ou="Resource Counts",Bu="GPU Time and Memory",C_=["Resources","Buffers","Textures","Samplers","TextureViews","Framebuffers","QuerySets","Shaders","RenderPipelines","ComputePipelines","PipelineLayouts","VertexArrays","RenderPasss","RenderBundleEncoders","RenderBundles","ComputePasss","CommandEncoders","CommandBuffers"],L_=["Resources","Buffers","Textures","Samplers","TextureViews","Framebuffers","QuerySets","Shaders","RenderPipelines","SharedRenderPipelines","ComputePipelines","PipelineLayouts","VertexArrays","RenderPasss","RenderBundleEncoders","RenderBundles","ComputePasss","CommandEncoders","CommandBuffers"],T_=C_.flatMap(i=>[`${i} Created`,`${i} Active`]),A_=L_.flatMap(i=>[`${i} Created`,`${i} Active`]),ku=new WeakMap,Du=new WeakMap;let z=(fl=class{constructor(e,t,n){h(this,"id");h(this,"props");h(this,"userData",{});h(this,"_device");h(this,"destroyed",!1);h(this,"allocatedBytes",0);h(this,"allocatedBytesName",null);h(this,"_attachedResources",new Set);if(!e)throw new Error("no device");this._device=e,this.props=I_(t,n);const s=this.props.id!=="undefined"?this.props.id:vi(this[Symbol.toStringTag]);this.props.id=s,this.id=s,this.userData=this.props.userData||{},this.addStats()}toString(){return`${this[Symbol.toStringTag]||this.constructor.name}:"${this.id}"`}toJSON(){return this.toString()}get ownsHandle(){return(this.props.handle===void 0||this.props.handle===null)&&!this.isHandleBorrowed}get isHandleBorrowed(){return!!this.props._isHandleBorrowed}destroy(){this.destroyed||this.destroyResource()}delete(){return this.destroy(),this}getProps(){return this.props}attachResource(e){this._attachedResources.add(e)}detachResource(e){this._attachedResources.delete(e)}destroyAttachedResource(e){this._attachedResources.delete(e)&&e.destroy()}destroyAttachedResources(){for(const e of this._attachedResources)e.destroy();this._attachedResources=new Set}destroyResource(){this.destroyed||(this.destroyAttachedResources(),this.removeStats(),this.destroyed=!0)}removeStats(){const e=xi(this._device),t=e?Ze():0,n=[this._device.statsManager.getStats(Ru),this._device.statsManager.getStats(Ou)],s=Nu(this._device);for(const o of n)Fu(o,s);const r=this.getStatsName();for(const o of n)o.get("Resources Active").decrementCount(),o.get(`${r}s Active`).decrementCount();e&&(e.statsBookkeepingCalls=(e.statsBookkeepingCalls||0)+1,e.statsBookkeepingTimeMs=(e.statsBookkeepingTimeMs||0)+(Ze()-t))}trackAllocatedMemory(e,t=this.getStatsName()){const n=xi(this._device),s=n?Ze():0,r=this._device.statsManager.getStats(Bu);this.allocatedBytes>0&&this.allocatedBytesName&&(r.get("GPU Memory").subtractCount(this.allocatedBytes),r.get(`${this.allocatedBytesName} Memory`).subtractCount(this.allocatedBytes)),r.get("GPU Memory").addCount(e),r.get(`${t} Memory`).addCount(e),n&&(n.statsBookkeepingCalls=(n.statsBookkeepingCalls||0)+1,n.statsBookkeepingTimeMs=(n.statsBookkeepingTimeMs||0)+(Ze()-s)),this.allocatedBytes=e,this.allocatedBytesName=t}trackReferencedMemory(e,t=this.getStatsName()){this.trackAllocatedMemory(e,`External ${t}`)}trackDeallocatedMemory(e=this.getStatsName()){if(this.allocatedBytes===0){this.allocatedBytesName=null;return}const t=xi(this._device),n=t?Ze():0,s=this._device.statsManager.getStats(Bu);s.get("GPU Memory").subtractCount(this.allocatedBytes),s.get(`${this.allocatedBytesName||e} Memory`).subtractCount(this.allocatedBytes),t&&(t.statsBookkeepingCalls=(t.statsBookkeepingCalls||0)+1,t.statsBookkeepingTimeMs=(t.statsBookkeepingTimeMs||0)+(Ze()-n)),this.allocatedBytes=0,this.allocatedBytesName=null}trackDeallocatedReferencedMemory(e=this.getStatsName()){this.trackDeallocatedMemory(`Referenced ${e}`)}addStats(){const e=this.getStatsName(),t=xi(this._device),n=t?Ze():0,s=[this._device.statsManager.getStats(Ru),this._device.statsManager.getStats(Ou)],r=Nu(this._device);for(const o of s)Fu(o,r);for(const o of s)o.get("Resources Created").incrementCount(),o.get("Resources Active").incrementCount(),o.get(`${e}s Created`).incrementCount(),o.get(`${e}s Active`).incrementCount();t&&(t.statsBookkeepingCalls=(t.statsBookkeepingCalls||0)+1,t.statsBookkeepingTimeMs=(t.statsBookkeepingTimeMs||0)+(Ze()-n)),M_(this._device,e)}getStatsName(){return R_(this)}},h(fl,"defaultProps",{id:"undefined",handle:void 0,_isHandleBorrowed:!1,userData:void 0}),fl);function I_(i,e){const t={...e};for(const n in i)i[n]!==void 0&&(t[n]=i[n]);return t}function Fu(i,e){const t=i.stats;let n=!1;for(const c of e)t[c]||(i.get(c),n=!0);const s=Object.keys(t).length,r=ku.get(i);if(!n&&r?.orderedStatNames===e&&r.statCount===s)return;const o={};let a=Du.get(e);a||(a=new Set(e),Du.set(e,a));for(const c of e)t[c]&&(o[c]=t[c]);for(const[c,l]of Object.entries(t))a.has(c)||(o[c]=l);for(const c of Object.keys(t))delete t[c];Object.assign(t,o),ku.set(i,{orderedStatNames:e,statCount:s})}function Nu(i){return i.type==="webgl"?A_:T_}function xi(i){const e=i.userData[E_];return e?.enabled?e:null}function Ze(){return globalThis.performance?.now?.()??Date.now()}function M_(i,e){const t=xi(i);if(!(!t||!t.activeDefaultFramebufferAcquireDepth))switch(t.transientCanvasResourceCreates=(t.transientCanvasResourceCreates||0)+1,e){case"Texture":t.transientCanvasTextureCreates=(t.transientCanvasTextureCreates||0)+1;break;case"TextureView":t.transientCanvasTextureViewCreates=(t.transientCanvasTextureViewCreates||0)+1;break;case"Sampler":t.transientCanvasSamplerCreates=(t.transientCanvasSamplerCreates||0)+1;break;case"Framebuffer":t.transientCanvasFramebufferCreates=(t.transientCanvasFramebufferCreates||0)+1;break}}function R_(i){let e=Object.getPrototypeOf(i);for(;e;){const t=Object.getPrototypeOf(e);if(!t||t===z.prototype)return O_(e)||i[Symbol.toStringTag]||i.constructor.name;e=t}return i[Symbol.toStringTag]||i.constructor.name}function O_(i){const e=Object.getOwnPropertyDescriptor(i,Symbol.toStringTag);return typeof e?.get=="function"?e.get.call(i):typeof e?.value=="string"?e.value:null}const te=class te extends z{constructor(t,n){const s={...n};(n.usage||0)&te.INDEX&&!n.indexType&&(n.data instanceof Uint32Array?s.indexType="uint32":n.data instanceof Uint16Array?s.indexType="uint16":n.data instanceof Uint8Array&&(s.indexType="uint8")),delete s.data;super(t,s,te.defaultProps);h(this,"usage");h(this,"indexType");h(this,"updateTimestamp");h(this,"debugData",new ArrayBuffer(0));this.usage=s.usage||0,this.indexType=s.indexType,this.updateTimestamp=t.incrementTimestamp()}get[Symbol.toStringTag](){return"Buffer"}clone(t){return this.device.createBuffer({...this.props,...t})}_setDebugData(t,n,s){if(!this.device.props.debug)return;let r=null,o;ArrayBuffer.isView(t)?(r=t,o=t.buffer):o=t;const a=Math.min(t?t.byteLength:s,te.DEBUG_DATA_MAX_LENGTH);if(o===null)this.debugData=new ArrayBuffer(a);else{const c=Math.min(r?.byteOffset||0,o.byteLength),l=Math.max(0,o.byteLength-c),u=Math.min(a,l);this.debugData=new Uint8Array(o,c,u).slice().buffer}}};h(te,"INDEX",16),h(te,"VERTEX",32),h(te,"UNIFORM",64),h(te,"STORAGE",128),h(te,"INDIRECT",256),h(te,"QUERY_RESOLVE",512),h(te,"MAP_READ",1),h(te,"MAP_WRITE",2),h(te,"COPY_SRC",4),h(te,"COPY_DST",8),h(te,"DEBUG_DATA_MAX_LENGTH",32),h(te,"defaultProps",{...z.defaultProps,handle:void 0,usage:0,byteLength:0,byteOffset:0,data:null,indexType:"uint16",onMapped:void 0});let F=te;const lo=globalThis.Float16Array;function B_(){return lo??Uint16Array}function k_(i){return!!(lo&&i===lo)}function D_(i){const e=i.includes("norm"),t=!e&&!i.startsWith("float"),n=i.startsWith("s"),s=fo[i],[r,o,a]=s||["uint8 ","i32",1];return{signedType:r,primitiveType:o,byteLength:a,normalized:e,integer:t,signed:n}}function F_(i){const e=i;switch(e){case"uint8":return"unorm8";case"sint8":return"snorm8";case"uint16":return"unorm16";case"sint16":return"snorm16";default:return e}}function Ae(i,e){switch(e){case 1:return i;case 2:return i+i%2;default:return i+(4-i%4)%4}}function zu(i){const e=ArrayBuffer.isView(i)?i.constructor:i;if(k_(e))return"float16";if(e===Uint8ClampedArray)return"uint8";const t=Object.values(fo).find(n=>e===n[4]);if(!t)throw new Error(e.name);return t[0]}function N_(i){return zu(i)}function wi(i){if(i==="float16")return B_();const e=fo[i];if(!e)throw new Error(i);const[,,,,t]=e;return t}function uo(i){return wi(i)}const fo={uint8:["uint8","u32",1,!1,Uint8Array],sint8:["sint8","i32",1,!1,Int8Array],unorm8:["uint8","f32",1,!0,Uint8Array],snorm8:["sint8","f32",1,!0,Int8Array],uint16:["uint16","u32",2,!1,Uint16Array],sint16:["sint16","i32",2,!1,Int16Array],unorm16:["uint16","u32",2,!0,Uint16Array],snorm16:["sint16","i32",2,!0,Int16Array],float16:["float16","f16",2,!1,Uint16Array],float32:["float32","f32",4,!1,Float32Array],uint32:["uint32","u32",4,!1,Uint32Array],sint32:["sint32","i32",4,!1,Int32Array]};class z_{getDataTypeInfo(e){return D_(e)}getNormalizedDataType(e){return F_(e)}alignTo(e,t){return Ae(e,t)}getDataType(e){return N_(e)}getTypedArrayConstructor(e){return uo(e)}}const Ie=new z_;class U_{getVertexFormatInfo(e){if(e==="unorm10-10-10-2")return{type:"unorm8",components:4,byteLength:4,integer:!1,signed:!1,normalized:!0};let t=e==="unorm8x4-bgra"?"unorm8x4":e,n;t.endsWith("-webgl")&&(t=t.slice(0,-6),n=!0);const s=t.split("x");if(s.length>2)throw new Error(`Unsupported vertex format: ${e}`);const[r,o]=s,a=r,c=G_(e,o),l=$_(e,a);let u;try{u=n?V_(e,a,c):this.makeVertexFormat(l.signedType,c,l.normalized)}catch{throw new Error(`Unsupported vertex format: ${e}`)}if(u!==(n?e:t))throw new Error(`Unsupported vertex format: ${e}`);const f={type:a,components:c,byteLength:l.byteLength*c,integer:l.integer,signed:l.signed,normalized:l.normalized};return n&&(f.webglOnly=!0),f}makeVertexFormat(e,t,n){const s=n?Ie.getNormalizedDataType(e):e;switch(s){case"unorm8":return t===1?"unorm8":t===3?"unorm8x3-webgl":`${s}x${t}`;case"snorm8":return t===1?"snorm8":t===3?"snorm8x3-webgl":`${s}x${t}`;case"uint8":case"sint8":if(t===3)throw new Error(`size: ${t}`);return t===1?s:`${s}x${t}`;case"uint16":return t===1?"uint16":t===3?"uint16x3-webgl":`${s}x${t}`;case"sint16":return t===1?"sint16":t===3?"sint16x3-webgl":`${s}x${t}`;case"unorm16":return t===1?"unorm16":t===3?"unorm16x3-webgl":`${s}x${t}`;case"snorm16":return t===1?"snorm16":t===3?"snorm16x3-webgl":`${s}x${t}`;case"float16":if(t===3)throw new Error(`size: ${t}`);return t===1?s:`${s}x${t}`;default:return t===1?s:`${s}x${t}`}}getVertexFormatFromAttribute(e,t,n){if(!t||t>4)throw new Error(`size ${t}`);const s=t,r=Ie.getDataType(e);return this.makeVertexFormat(r,s,n)}getCompatibleVertexFormat(e){let t;switch(e.primitiveType){case"f32":t="float32";break;case"i32":t="sint32";break;case"u32":t="uint32";break;case"f16":return e.components<=2?"float16x2":"float16x4"}return e.components===1?t:`${t}x${e.components}`}}const ne=new U_;function $_(i,e){try{return Ie.getDataTypeInfo(e)}catch{throw new Error(`Unsupported vertex format: ${i}`)}}function G_(i,e){if(!e)return 1;const t=Number(e);if(t===2||t===3||t===4)return t;throw new Error(`Unsupported vertex format: ${i}`)}function V_(i,e,t){if(t!==3)throw new Error(`Unsupported vertex format: ${i}`);switch(e){case"uint8":case"sint8":case"unorm8":case"snorm8":case"uint16":case"sint16":case"unorm16":case"snorm16":return`${e}x3-webgl`;default:throw new Error(`Unsupported vertex format: ${i}`)}}const se="texture-compression-bc",V="texture-compression-astc",Me="texture-compression-etc2",j_="texture-compression-etc1-webgl",Fn="texture-compression-pvrtc-webgl",ho="texture-compression-atc-webgl",Nn="float32-renderable-webgl",go="float16-renderable-webgl",W_="rgb9e5ufloat-renderable-webgl",po="snorm8-renderable-webgl",Ke="norm16-webgl",mo="norm16-renderable-webgl",yo="snorm16-renderable-webgl",zn="float32-filterable",Uu="float16-filterable-webgl",Pi=1,Si=2,bo=4,_o=8,kt=16,Un=5,$u=10,Q=Pi|Si,$n=Pi|bo,We=Pi|Si|bo|_o,Re=Pi|Si|kt,H_=Pi|bo|kt,vo=We|kt,Gu=(Si|_o|kt)<<Un,Y_=(Si|_o)<<Un,oe=kt<<Un,Dt=vo<<Un,q_=We<<$u,xo=kt<<$u;function wo(i){const e=Vu[i];if(!e)throw new Error(`Unsupported texture format ${i}`);return e}function X_(){return Vu}const Vu={...{r8unorm:{webgpu:We|oe},rg8unorm:{webgpu:We|oe},"rgb8unorm-webgl":{},rgba8unorm:{webgpu:vo},"rgba8unorm-srgb":{webgpu:We},r8snorm:{render:po,webgpu:$n|Gu},rg8snorm:{render:po,webgpu:$n|Gu},"rgb8snorm-webgl":{},rgba8snorm:{render:po,webgpu:H_|Y_},r8uint:{webgpu:Q|oe},rg8uint:{webgpu:Q|oe},rgba8uint:{webgpu:Re},r8sint:{webgpu:Q|oe},rg8sint:{webgpu:Q|oe},rgba8sint:{webgpu:Re},bgra8unorm:{webgpu:We},"bgra8unorm-srgb":{webgpu:q_},r16unorm:{f:Ke,render:mo,webgpu:Dt},rg16unorm:{f:Ke,render:mo,webgpu:Dt},"rgb16unorm-webgl":{f:Ke,render:!1},rgba16unorm:{f:Ke,render:mo,webgpu:Dt},r16snorm:{f:Ke,render:yo,webgpu:Dt},rg16snorm:{f:Ke,render:yo,webgpu:Dt},"rgb16snorm-webgl":{f:Ke,render:!1},rgba16snorm:{f:Ke,render:yo,webgpu:Dt},r16uint:{webgpu:Q|oe},rg16uint:{webgpu:Q|oe},rgba16uint:{webgpu:Re},r16sint:{webgpu:Q|oe},rg16sint:{webgpu:Q|oe},rgba16sint:{webgpu:Re},r16float:{render:go,filter:"float16-filterable-webgl",webgpu:We|oe},rg16float:{render:go,filter:Uu,webgpu:We|oe},rgba16float:{render:go,filter:Uu,webgpu:vo},r32uint:{webgpu:Re},rg32uint:{webgpu:Q|xo},rgba32uint:{webgpu:Re},r32sint:{webgpu:Re},rg32sint:{webgpu:Q|xo},rgba32sint:{webgpu:Re},r32float:{render:Nn,filter:zn,webgpu:Re},rg32float:{render:!1,filter:zn,webgpu:Q|xo},"rgb32float-webgl":{render:Nn,filter:zn},rgba32float:{render:Nn,filter:zn,webgpu:Re},"rgba4unorm-webgl":{channels:"rgba",bitsPerChannel:[4,4,4,4],packed:!0},"rgb565unorm-webgl":{channels:"rgb",bitsPerChannel:[5,6,5,0],packed:!0},"rgb5a1unorm-webgl":{channels:"rgba",bitsPerChannel:[5,5,5,1],packed:!0},rgb9e5ufloat:{channels:"rgb",packed:!0,render:W_,webgpu:$n},rg11b10ufloat:{channels:"rgb",bitsPerChannel:[11,11,10,0],packed:!0,p:1,render:Nn,webgpu:$n|oe},rgb10a2unorm:{channels:"rgba",bitsPerChannel:[10,10,10,2],packed:!0,p:1,webgpu:We|oe},rgb10a2uint:{channels:"rgba",bitsPerChannel:[10,10,10,2],packed:!0,p:1,webgpu:Q|oe},stencil8:{attachment:"stencil",bitsPerChannel:[8,0,0,0],dataType:"uint8",webgpu:Q},depth16unorm:{attachment:"depth",bitsPerChannel:[16,0,0,0],dataType:"uint16",webgpu:Q},depth24plus:{attachment:"depth",bitsPerChannel:[24,0,0,0],dataType:"uint32",webgpu:Q},depth32float:{attachment:"depth",bitsPerChannel:[32,0,0,0],dataType:"float32",webgpu:Q},"depth24plus-stencil8":{attachment:"depth-stencil",bitsPerChannel:[24,8,0,0],packed:!0,webgpu:Q},"depth32float-stencil8":{attachment:"depth-stencil",bitsPerChannel:[32,8,0,0],packed:!0,f:"depth32float-stencil8",webgpu:Q}},...{"bc1-rgb-unorm-webgl":{f:se},"bc1-rgb-unorm-srgb-webgl":{f:se},"bc1-rgba-unorm":{f:se},"bc1-rgba-unorm-srgb":{f:se},"bc2-rgba-unorm":{f:se},"bc2-rgba-unorm-srgb":{f:se},"bc3-rgba-unorm":{f:se},"bc3-rgba-unorm-srgb":{f:se},"bc4-r-unorm":{f:se},"bc4-r-snorm":{f:se},"bc5-rg-unorm":{f:se},"bc5-rg-snorm":{f:se},"bc6h-rgb-ufloat":{f:se},"bc6h-rgb-float":{f:se},"bc7-rgba-unorm":{f:se},"bc7-rgba-unorm-srgb":{f:se},"etc2-rgb8unorm":{f:Me},"etc2-rgb8unorm-srgb":{f:Me},"etc2-rgb8a1unorm":{f:Me},"etc2-rgb8a1unorm-srgb":{f:Me},"etc2-rgba8unorm":{f:Me},"etc2-rgba8unorm-srgb":{f:Me},"eac-r11unorm":{f:Me},"eac-r11snorm":{f:Me},"eac-rg11unorm":{f:Me},"eac-rg11snorm":{f:Me},"astc-4x4-unorm":{f:V},"astc-4x4-unorm-srgb":{f:V},"astc-5x4-unorm":{f:V},"astc-5x4-unorm-srgb":{f:V},"astc-5x5-unorm":{f:V},"astc-5x5-unorm-srgb":{f:V},"astc-6x5-unorm":{f:V},"astc-6x5-unorm-srgb":{f:V},"astc-6x6-unorm":{f:V},"astc-6x6-unorm-srgb":{f:V},"astc-8x5-unorm":{f:V},"astc-8x5-unorm-srgb":{f:V},"astc-8x6-unorm":{f:V},"astc-8x6-unorm-srgb":{f:V},"astc-8x8-unorm":{f:V},"astc-8x8-unorm-srgb":{f:V},"astc-10x5-unorm":{f:V},"astc-10x5-unorm-srgb":{f:V},"astc-10x6-unorm":{f:V},"astc-10x6-unorm-srgb":{f:V},"astc-10x8-unorm":{f:V},"astc-10x8-unorm-srgb":{f:V},"astc-10x10-unorm":{f:V},"astc-10x10-unorm-srgb":{f:V},"astc-12x10-unorm":{f:V},"astc-12x10-unorm-srgb":{f:V},"astc-12x12-unorm":{f:V},"astc-12x12-unorm-srgb":{f:V},"pvrtc-rgb4unorm-webgl":{f:Fn},"pvrtc-rgba4unorm-webgl":{f:Fn},"pvrtc-rgb2unorm-webgl":{f:Fn},"pvrtc-rgba2unorm-webgl":{f:Fn},"etc1-rbg-unorm-webgl":{f:j_},"atc-rgb-unorm-webgl":{f:ho},"atc-rgba-unorm-webgl":{f:ho},"atc-rgbai-unorm-webgl":{f:ho}}},Z_=/^(r|rg|rgb|rgba|bgra)([0-9]*)([a-z]*)(-srgb)?(-webgl)?$/,K_=["rgb","rgba","bgra"],Q_=["depth","stencil"],J_=5,ev=["bc1","bc2","bc3","bc4","bc5","bc6","bc7","etc1","etc2","eac","atc","astc","pvrtc"];class tv{isColor(e){return K_.some(t=>e.startsWith(t))}isDepthStencil(e){return Q_.some(t=>e.startsWith(t))}isCompressed(e){return ev.some(t=>e.startsWith(t))}getInfo(e){return ju(e)}getCapabilities(e){return nv(e)}getWebGPUCapabilities(e){const t=wo(e);return t.webgpu!==void 0?t.webgpu:this.isCompressed(e)&&!e.endsWith("-webgl")?J_:0}computeMemoryLayout(e){return iv(e)}}const _e=new tv;function iv({format:i,width:e,height:t,depth:n,byteAlignment:s}){const r=_e.getInfo(i),{bytesPerPixel:o,bytesPerBlock:a=o,blockWidth:c=1,blockHeight:l=1,compressed:u=!1}=r,f=u?Math.ceil(e/c):e,d=u?Math.ceil(t/l):t,g=f*a,p=Math.ceil(g/s)*s,m=d,y=p*m*n;return{bytesPerPixel:o,bytesPerRow:p,rowsPerImage:m,depthOrArrayLayers:n,bytesPerImage:p*m,byteLength:y}}function nv(i){const e=wo(i),t={format:i,create:e.f??!0,render:e.render??!0,filter:e.filter??!0,blend:e.blend??!0,store:e.store??!0},n=ju(i),s=i.startsWith("depth")||i.startsWith("stencil"),r=n?.signed,o=n?.integer,a=n?.webgl,c=!!n?.compressed;return t.render&&(t.render=!s&&!c),t.filter&&(t.filter=!s&&!r&&!o&&!a),t}function ju(i){let e=sv(i);if(_e.isCompressed(i)){e.channels="rgb",e.components=3,e.bytesPerPixel=1,e.srgb=!1,e.compressed=!0,e.bytesPerBlock=ov(i);const n=rv(i);n&&(e.blockWidth=n.blockWidth,e.blockHeight=n.blockHeight)}const t=e.packed?null:Z_.exec(i);if(t){const[,n,s,r,o,a]=t,c=`${r}${s}`,l=Ie.getDataTypeInfo(c),u=l.byteLength*8,f=n?.length??1,d=[u,f>=2?u:0,f>=3?u:0,f>=4?u:0];e={format:i,attachment:e.attachment,dataType:l.signedType,components:f,channels:n,integer:l.integer,signed:l.signed,normalized:l.normalized,bitsPerChannel:d,bytesPerPixel:l.byteLength*f,packed:e.packed,srgb:e.srgb},a==="-webgl"&&(e.webgl=!0),o==="-srgb"&&(e.srgb=!0)}return i.endsWith("-webgl")&&(e.webgl=!0),i.endsWith("-srgb")&&(e.srgb=!0),e}function sv(i){const e={...wo(i)},t=e.bytesPerPixel||1,n=e.bitsPerChannel||[8,8,8,8];return delete e.bitsPerChannel,delete e.bytesPerPixel,delete e.f,delete e.render,delete e.filter,delete e.blend,delete e.store,delete e.webgpu,{...e,format:i,attachment:e.attachment||"color",channels:e.channels||"r",components:e.components||e.channels?.length||1,bytesPerPixel:t,bitsPerChannel:n,dataType:e.dataType||"uint8",srgb:e.srgb??!1,packed:e.packed??!1,webgl:e.webgl??!1,integer:e.integer??!1,signed:e.signed??!1,normalized:e.normalized??!1,compressed:e.compressed??!1}}function rv(i){const t=/.*-(\d+)x(\d+)-.*/.exec(i);if(t){const[,n,s]=t;return{blockWidth:Number(n),blockHeight:Number(s)}}return i.startsWith("bc")||i.startsWith("etc1")||i.startsWith("etc2")||i.startsWith("eac")||i.startsWith("atc")?{blockWidth:4,blockHeight:4}:i.startsWith("pvrtc-rgb4")||i.startsWith("pvrtc-rgba4")?{blockWidth:4,blockHeight:4}:i.startsWith("pvrtc-rgb2")||i.startsWith("pvrtc-rgba2")?{blockWidth:8,blockHeight:4}:null}function ov(i){return i.startsWith("bc1")||i.startsWith("bc4")||i.startsWith("etc1")||i.startsWith("etc2-rgb8")||i.startsWith("etc2-rgb8a1")||i.startsWith("eac-r11")||i==="atc-rgb-unorm-webgl"?8:i.startsWith("bc2")||i.startsWith("bc3")||i.startsWith("bc5")||i.startsWith("bc6h")||i.startsWith("bc7")||i.startsWith("etc2-rgba8")||i.startsWith("eac-rg11")||i.startsWith("astc")||i==="atc-rgba-unorm-webgl"||i==="atc-rgbai-unorm-webgl"?16:i.startsWith("pvrtc")?8:16}function av(i){return typeof ImageData<"u"&&i instanceof ImageData||typeof ImageBitmap<"u"&&i instanceof ImageBitmap||typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement||typeof VideoFrame<"u"&&i instanceof VideoFrame||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas}function cv(i){if(typeof ImageData<"u"&&i instanceof ImageData||typeof ImageBitmap<"u"&&i instanceof ImageBitmap||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas)return{width:i.width,height:i.height};if(typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement)return{width:i.naturalWidth,height:i.naturalHeight};if(typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement)return{width:i.videoWidth,height:i.videoHeight};if(typeof VideoFrame<"u"&&i instanceof VideoFrame)return{width:i.displayWidth,height:i.displayHeight};throw new Error("Unknown image type")}class lv{}function uv(i,e){const t=Po(i),n=e.map(Po).filter(s=>s!==void 0);return[t,...n].filter(s=>s!==void 0)}function Po(i){if(i!==void 0){if(i===null||typeof i=="string"||typeof i=="number"||typeof i=="boolean")return i;if(i instanceof Error)return i.message;if(Array.isArray(i))return i.map(Po);if(typeof i=="object"){if(fv(i)){const e=String(i);if(e!=="[object Object]")return e}return dv(i)?hv(i):i.constructor?.name||"Object"}return String(i)}}function fv(i){return"toString"in i&&typeof i.toString=="function"&&i.toString!==Object.prototype.toString}function dv(i){return"message"in i&&"type"in i}function hv(i){const e=typeof i.type=="string"?i.type:"message",t=typeof i.message=="string"?i.message:"",n=typeof i.lineNum=="number"?i.lineNum:null,s=typeof i.linePos=="number"?i.linePos:null,r=n!==null&&s!==null?` @ ${n}:${s}`:n!==null?` @ ${n}`:"";return`${e}${r}: ${t}`.trim()}class gv{constructor(e=[],t){h(this,"features");h(this,"disabledFeatures");this.features=new Set(e),this.disabledFeatures=t||{}}*[Symbol.iterator](){yield*this.features}has(e){return!this.disabledFeatures?.[e]&&this.features.has(e)}}function pv(){if(typeof HTMLCanvasElement>"u")return!1;const i=HTMLCanvasElement.prototype;return"layoutSubtree"in i&&typeof i.requestPaint=="function"}const gr=class gr{constructor(e){h(this,"id");h(this,"props");h(this,"userData",{});h(this,"statsManager",Iu);h(this,"_factories",{});h(this,"timestamp",0);h(this,"_reused",!1);h(this,"_moduleData",{});h(this,"wgslLanguageFeatures",new Set);h(this,"_textureCaps",{});h(this,"_debugGPUTimeQuery",null);this.props={...gr.defaultProps,...e},this.id=this.props.id||vi(this[Symbol.toStringTag].toLowerCase())}get[Symbol.toStringTag](){return"Device"}toString(){return`Device(${this.id})`}toJSON(){return this.toString()}getVertexFormatInfo(e){return ne.getVertexFormatInfo(e)}isVertexFormatSupported(e){return!0}getTextureFormatInfo(e){return _e.getInfo(e)}getTextureFormatCapabilities(e){let t=this._textureCaps[e];if(!t){const n=this._getDeviceTextureFormatCapabilities(e);t=this._getDeviceSpecificTextureFormatCapabilities(n),this._textureCaps[e]=t}return t}getMipLevelCount(e,t,n=1){const s=Math.max(e,t,n);return 1+Math.floor(Math.log2(s))}isExternalImage(e){return av(e)}getExternalImageSize(e){return cv(e)}isTextureFormatSupported(e){return this.getTextureFormatCapabilities(e).create}isTextureFormatFilterable(e){return this.getTextureFormatCapabilities(e).filter}isTextureFormatRenderable(e){return this.getTextureFormatCapabilities(e).render}isTextureFormatCompressed(e){return _e.isCompressed(e)}getSupportedCompressedTextureFormats(){const e=[];for(const t of Object.keys(X_()))this.isTextureFormatCompressed(t)&&this.isTextureFormatSupported(t)&&e.push(t);return e}pushDebugGroup(e){this.commandEncoder.pushDebugGroup(e)}popDebugGroup(){this.commandEncoder?.popDebugGroup()}insertDebugMarker(e){this.commandEncoder?.insertDebugMarker(e)}loseDevice(){return!1}incrementTimestamp(){return this.timestamp++}reportError(e,t,...n){if(!this.props.onError(e,t)){const r=uv(t,n);return S.error(this.type==="webgl"?"%cWebGL":"%cWebGPU","color: white; background: red; padding: 2px 6px; border-radius: 3px;",e.message,...r)}return()=>{}}debug(){if(this.props.debug)debugger;else S.once(0,`'Type luma.log.set({debug: true}) in console to enable debug breakpoints',
or create a device with the 'debug: true' prop.`)()}getDefaultCanvasContext(){if(!this.canvasContext)throw new Error("Device has no default CanvasContext. See props.createCanvasContext");return this.canvasContext}createFence(){throw new Error("createFence() not implemented")}beginRenderPass(e){return this.commandEncoder.beginRenderPass(e)}beginComputePass(e){return this.commandEncoder.beginComputePass(e)}writeBufferViaCommandEncoder(e,t,n,s=0){throw new Error("writeBufferViaCommandEncoder() not implemented")}generateMipmapsWebGPU(e){throw new Error("not implemented")}_createSharedRenderPipelineWebGL(e){throw new Error("_createSharedRenderPipelineWebGL() not implemented")}_createBindGroupLayoutWebGPU(e,t){throw new Error("_createBindGroupLayoutWebGPU() not implemented")}_createBindGroupWebGPU(e,t,n,s,r){throw new Error("_createBindGroupWebGPU() not implemented")}_supportsDebugGPUTime(){return this.features.has("timestamp-query")&&!!(this.props.debug||this.props.debugGPUTime)}_enableDebugGPUTime(e=256){if(!this._supportsDebugGPUTime())return null;if(this._debugGPUTimeQuery)return this._debugGPUTimeQuery;try{this._debugGPUTimeQuery=this.createQuerySet({type:"timestamp",count:e}),this.commandEncoder=this.createCommandEncoder({id:this.commandEncoder.props.id,timeProfilingQuerySet:this._debugGPUTimeQuery})}catch{this._debugGPUTimeQuery=null}return this._debugGPUTimeQuery}_disableDebugGPUTime(){this._debugGPUTimeQuery&&(this.commandEncoder.getTimeProfilingQuerySet()===this._debugGPUTimeQuery&&(this.commandEncoder=this.createCommandEncoder({id:this.commandEncoder.props.id})),this._debugGPUTimeQuery.destroy(),this._debugGPUTimeQuery=null)}_isDebugGPUTimeEnabled(){return this._debugGPUTimeQuery!==null}getCanvasContext(){return this.getDefaultCanvasContext()}readPixelsToArrayWebGL(e,t){throw new Error("not implemented")}readPixelsToBufferWebGL(e,t){throw new Error("not implemented")}setParametersWebGL(e){throw new Error("not implemented")}getParametersWebGL(e){throw new Error("not implemented")}withParametersWebGL(e,t){throw new Error("not implemented")}clearWebGL(e){throw new Error("not implemented")}resetWebGL(){throw new Error("not implemented")}getModuleData(e){var t;return(t=this._moduleData)[e]||(t[e]={}),this._moduleData[e]}static _getCanvasContextProps(e){return e.createCanvasContext===!0?{}:e.createCanvasContext}_getDeviceTextureFormatCapabilities(e){const t=_e.getCapabilities(e),n=r=>(typeof r=="string"?this.features.has(r):r)??!0,s=n(t.create);return{format:e,create:s,render:s&&n(t.render),filter:s&&n(t.filter),blend:s&&n(t.blend),store:s&&n(t.store)}}_normalizeBufferProps(e){(e instanceof ArrayBuffer||ArrayBuffer.isView(e))&&(e={data:e});const t={...e};if((e.usage||0)&F.INDEX&&(e.indexType||(e.data instanceof Uint32Array?t.indexType="uint32":e.data instanceof Uint16Array?t.indexType="uint16":e.data instanceof Uint8Array&&(t.data=new Uint16Array(e.data),t.indexType="uint16")),!t.indexType))throw new Error("indices buffer content must be of type uint16 or uint32");return t}};h(gr,"defaultProps",{...Lu});let Ft=gr;class mv{constructor(e){h(this,"props");h(this,"_resizeObserver");h(this,"_intersectionObserver");h(this,"_observeDevicePixelRatioTimeout",null);h(this,"_observeDevicePixelRatioMediaQuery",null);h(this,"_handleDevicePixelRatioChange",()=>this._refreshDevicePixelRatio());h(this,"_trackPositionInterval",null);h(this,"_started",!1);this.props=e}get started(){return this._started}start(){if(this._started||!this.props.canvas)return;this._started=!0,this._intersectionObserver||(this._intersectionObserver=new IntersectionObserver(t=>this.props.onIntersection(t))),this._resizeObserver||(this._resizeObserver=new ResizeObserver(t=>this.props.onResize(t))),this._intersectionObserver.observe(this.props.canvas);const e=this.props.resizeObserverBox;try{this._resizeObserver.observe(this.props.canvas,{box:e})}catch{this._resizeObserver.observe(this.props.canvas,{box:"content-box"})}this._observeDevicePixelRatioTimeout=setTimeout(()=>this._refreshDevicePixelRatio(),0),this.props.trackPosition&&this._trackPosition()}stop(){this._started&&(this._started=!1,this._observeDevicePixelRatioTimeout&&(clearTimeout(this._observeDevicePixelRatioTimeout),this._observeDevicePixelRatioTimeout=null),this._observeDevicePixelRatioMediaQuery&&(this._observeDevicePixelRatioMediaQuery.removeEventListener("change",this._handleDevicePixelRatioChange),this._observeDevicePixelRatioMediaQuery=null),this._trackPositionInterval&&(clearInterval(this._trackPositionInterval),this._trackPositionInterval=null),this._resizeObserver?.disconnect(),this._intersectionObserver?.disconnect())}_refreshDevicePixelRatio(){this._started&&(this.props.onDevicePixelRatioChange(),this._observeDevicePixelRatioMediaQuery?.removeEventListener("change",this._handleDevicePixelRatioChange),this._observeDevicePixelRatioMediaQuery=matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`),this._observeDevicePixelRatioMediaQuery.addEventListener("change",this._handleDevicePixelRatioChange,{once:!0}))}_trackPosition(e=100){this._trackPositionInterval||(this._trackPositionInterval=setInterval(()=>{this._started?this.props.onPositionChange():this._trackPositionInterval&&(clearInterval(this._trackPositionInterval),this._trackPositionInterval=null)},e))}}function yv(){let i,e;return{promise:new Promise((n,s)=>{i=n,e=s}),resolve:i,reject:e}}function Ei(i,e){if(!i){const t=new Error(e??"luma.gl assertion failed.");throw Error.captureStackTrace?.(t,Ei),t}}function Gn(i,e){return Ei(i,e),i}const di=class di{constructor(e){h(this,"id");h(this,"props");h(this,"canvas");h(this,"htmlCanvas");h(this,"offscreenCanvas");h(this,"type");h(this,"initialized");h(this,"isInitialized",!1);h(this,"isVisible",!0);h(this,"cssWidth");h(this,"cssHeight");h(this,"devicePixelRatio");h(this,"devicePixelWidth");h(this,"devicePixelHeight");h(this,"drawingBufferWidth");h(this,"drawingBufferHeight");h(this,"_initializedResolvers",yv());h(this,"_canvasObserver");h(this,"_position",[0,0]);h(this,"destroyed",!1);h(this,"_needsDrawingBufferResize",!0);h(this,"_configuredDrawingBufferSize",[0,0]);this.props={...di.defaultProps,...e},e=this.props,this.initialized=this._initializedResolvers.promise,It()?e.canvas?typeof e.canvas=="string"?this.canvas=_v(e.canvas):this.canvas=e.canvas:this.canvas=vv(e):this.canvas={width:e.width||1,height:e.height||1},di.isHTMLCanvas(this.canvas)?(this.id=e.id||this.canvas.id,this.type="html-canvas",this.htmlCanvas=this.canvas):di.isOffscreenCanvas(this.canvas)?(this.id=e.id||"offscreen-canvas",this.type="offscreen-canvas",this.offscreenCanvas=this.canvas):(this.id=e.id||"node-canvas-context",this.type="node"),this.cssWidth=this.htmlCanvas?.clientWidth||this.canvas.width,this.cssHeight=this.htmlCanvas?.clientHeight||this.canvas.height,this.devicePixelWidth=this.canvas.width,this.devicePixelHeight=this.canvas.height,this.drawingBufferWidth=this.canvas.width,this.drawingBufferHeight=this.canvas.height,this._configuredDrawingBufferSize=[this.canvas.width,this.canvas.height],this.devicePixelRatio=globalThis.devicePixelRatio||1,this._position=[0,0],this._canvasObserver=new mv({canvas:this.htmlCanvas,trackPosition:this.props.trackPosition,resizeObserverBox:this.props.pixelSizeSource==="css-dpr"?"content-box":"device-pixel-content-box",onResize:t=>this._handleResize(t),onIntersection:t=>this._handleIntersection(t),onDevicePixelRatioChange:()=>this._observeDevicePixelRatio(),onPositionChange:()=>this.updatePosition()})}static isHTMLCanvas(e){return typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement}static isOffscreenCanvas(e){return typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas}toString(){return`${this[Symbol.toStringTag]}(${this.id})`}destroy(){this.destroyed||(this.destroyed=!0,this._stopObservers(),this.device=null)}setProps(e){return"useDevicePixels"in e&&(this.props.useDevicePixels=e.useDevicePixels||!1,this._updateDrawingBufferSize()),this}getCurrentFramebuffer(e){return this._resizeDrawingBufferIfNeeded(),this._getCurrentFramebuffer(e)}getCSSSize(){return[this.cssWidth,this.cssHeight]}getPosition(){return this._position}getDevicePixelSize(){return[this.devicePixelWidth,this.devicePixelHeight]}getDrawingBufferSize(){return[this.drawingBufferWidth,this.drawingBufferHeight]}getMaxDrawingBufferSize(){const e=this.device.limits.maxTextureDimension2D;return[e,e]}setDrawingBufferSize(e,t){e=Math.floor(e),t=Math.floor(t),!(this.drawingBufferWidth===e&&this.drawingBufferHeight===t)&&(this.drawingBufferWidth=e,this.drawingBufferHeight=t,this._needsDrawingBufferResize=!0)}getDevicePixelRatio(){return typeof window<"u"&&window.devicePixelRatio||1}cssToDevicePixels(e,t=!0){const n=this.cssToDeviceRatio(),[s,r]=this.getDrawingBufferSize();return xv(e,n,s,r,t)}getPixelSize(){return this.getDevicePixelSize()}getAspect(){const[e,t]=this.getDrawingBufferSize();return e>0&&t>0?e/t:1}cssToDeviceRatio(){try{const[e]=this.getDrawingBufferSize(),[t]=this.getCSSSize();return t?e/t:1}catch{return 1}}resize(e){this.setDrawingBufferSize(e.width,e.height)}_setAutoCreatedCanvasId(e){this.htmlCanvas?.id==="lumagl-auto-created-canvas"&&(this.htmlCanvas.id=e)}_startObservers(){this.destroyed||this._canvasObserver.start()}_stopObservers(){this._canvasObserver.stop()}_handleIntersection(e){if(this.destroyed)return;const t=e.find(s=>s.target===this.canvas);if(!t)return;const n=t.isIntersecting;this.isVisible!==n&&(this.isVisible=n,this.device.props.onVisibilityChange(this))}_handleResize(e){if(this.destroyed)return;const t=e.find(r=>r.target===this.canvas);if(!t)return;const n=Gn(t.contentBoxSize?.[0]);this.cssWidth=n.inlineSize,this.cssHeight=n.blockSize;const s=this.getDevicePixelSize();this._setDevicePixelSize(this._getDevicePixelSizeFromResizeEntry(t)),this._updateDrawingBufferSize(),this.device.props.onResize(this,{oldPixelSize:s})}_updateDrawingBufferSize(){if(this.props.autoResize)if(typeof this.props.useDevicePixels=="number"){const e=this.props.useDevicePixels;this.setDrawingBufferSize(this.cssWidth*e,this.cssHeight*e)}else this.props.useDevicePixels?this.setDrawingBufferSize(this.devicePixelWidth,this.devicePixelHeight):this.setDrawingBufferSize(this.cssWidth,this.cssHeight);this._initializedResolvers.resolve(),this.isInitialized=!0,this.updatePosition()}_getDevicePixelSizeFromResizeEntry(e){const t=Gn(e.contentBoxSize?.[0]);return this.props.pixelSizeSource==="css-dpr"?this._getDevicePixelSizeFromCSSSize(t.inlineSize,t.blockSize):{devicePixelWidth:e.devicePixelContentBoxSize?.[0]?.inlineSize||t.inlineSize*devicePixelRatio,devicePixelHeight:e.devicePixelContentBoxSize?.[0]?.blockSize||t.blockSize*devicePixelRatio}}_getDevicePixelSizeFromCSSSize(e,t){const n=this.getDevicePixelRatio();return{devicePixelWidth:Math.floor(e*n),devicePixelHeight:Math.floor(t*n)}}_setDevicePixelSize({devicePixelWidth:e,devicePixelHeight:t}){const[n,s]=this.getMaxDrawingBufferSize();this.devicePixelWidth=Math.max(1,Math.min(e,n)),this.devicePixelHeight=Math.max(1,Math.min(t,s))}_resizeDrawingBufferIfNeeded(){if(this._needsDrawingBufferResize){this._needsDrawingBufferResize=!1,(this.drawingBufferWidth!==this.canvas.width||this.drawingBufferHeight!==this.canvas.height)&&(this.canvas.width=this.drawingBufferWidth,this.canvas.height=this.drawingBufferHeight);const[t,n]=this._configuredDrawingBufferSize;(this.drawingBufferWidth!==t||this.drawingBufferHeight!==n)&&(this._configureDevice(),this._configuredDrawingBufferSize=[this.drawingBufferWidth,this.drawingBufferHeight])}}_observeDevicePixelRatio(){if(this.destroyed||!this._canvasObserver.started)return;const e=this.devicePixelRatio;if(this.devicePixelRatio=window.devicePixelRatio,this.props.pixelSizeSource==="css-dpr"){const t=this.getDevicePixelSize();this._setDevicePixelSize(this._getDevicePixelSizeFromCSSSize(this.cssWidth,this.cssHeight)),this._updateDrawingBufferSize(),this.device.props.onResize(this,{oldPixelSize:t})}this.updatePosition(),this.device.props.onDevicePixelRatioChange?.(this,{oldRatio:e})}updatePosition(){if(this.destroyed)return;const e=this.htmlCanvas?.getBoundingClientRect();if(e){const t=[e.left,e.top];if(this._position??(this._position=t),t[0]!==this._position[0]||t[1]!==this._position[1]){const s=this._position;this._position=t,this.device.props.onPositionChange?.(this,{oldPosition:s})}}}};h(di,"defaultProps",{id:void 0,canvas:null,width:800,height:600,useDevicePixels:!0,pixelSizeSource:"exact",autoResize:!0,container:null,visible:!0,alphaMode:"opaque",colorSpace:"srgb",colorFormat:void 0,toneMapping:"standard",trackPosition:!1});let Nt=di;function bv(i){if(typeof i=="string"){const e=document.getElementById(i);if(!e)throw new Error(`${i} is not an HTML element`);return e}return i||document.body}function _v(i){const e=document.getElementById(i);if(!Nt.isHTMLCanvas(e))throw new Error("Object is not a canvas element");return e}function vv(i){const{width:e,height:t}=i,n=document.createElement("canvas");n.id=vi("lumagl-auto-created-canvas"),n.width=e||1,n.height=t||1,n.style.width=Number.isFinite(e)?`${e}px`:"100%",n.style.height=Number.isFinite(t)?`${t}px`:"100%",i?.visible||(n.style.visibility="hidden");const s=bv(i?.container||null);return s.insertBefore(n,s.firstChild),n}function xv(i,e,t,n,s){const r=i,o=Wu(r[0],e,t);let a=Hu(r[1],e,n,s),c=Wu(r[0]+1,e,t);const l=c===t-1?c:c-1;c=Hu(r[1]+1,e,n,s);let u;return s?(c=c===0?c:c+1,u=a,a=c):u=c===n-1?c:c-1,{x:o,y:a,width:Math.max(l-o+1,1),height:Math.max(u-a+1,1)}}function Wu(i,e,t){return Math.min(Math.round(i*e),t-1)}function Hu(i,e,t,n){return n?Math.max(0,t-1-Math.round(i*e)):Math.min(Math.round(i*e),t-1)}class Yu extends Nt{}h(Yu,"defaultProps",Nt.defaultProps);class wv extends Nt{}const hn=class hn extends z{get[Symbol.toStringTag](){return"Sampler"}constructor(e,t){t=hn.normalizeProps(e,t),super(e,t,hn.defaultProps)}static normalizeProps(e,t){return t}};h(hn,"defaultProps",{...z.defaultProps,type:"color-sampler",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge",magFilter:"nearest",minFilter:"nearest",mipmapFilter:"none",lodMinClamp:0,lodMaxClamp:32,compare:"less-equal",maxAnisotropy:1});let Vn=hn;const Pv={"1d":"1d","2d":"2d","2d-array":"2d",cube:"2d","cube-array":"2d","3d":"3d"},j=class j extends z{constructor(t,n,s){n=j.normalizeProps(t,n);super(t,n,j.defaultProps);h(this,"dimension");h(this,"baseDimension");h(this,"format");h(this,"width");h(this,"height");h(this,"depth");h(this,"mipLevels");h(this,"samples");h(this,"byteAlignment");h(this,"ready",Promise.resolve(this));h(this,"isReady",!0);h(this,"updateTimestamp");if(this.dimension=this.props.dimension,this.baseDimension=Pv[this.dimension],this.format=this.props.format,this.width=this.props.width,this.height=this.props.height,this.depth=this.props.depth,this.mipLevels=this.props.mipLevels,this.samples=this.props.samples||1,this.dimension==="cube"&&(this.depth=6),this.props.width===void 0||this.props.height===void 0)if(t.isExternalImage(n.data)){const r=t.getExternalImageSize(n.data);this.width=r?.width||1,this.height=r?.height||1}else this.width=1,this.height=1,(this.props.width===void 0||this.props.height===void 0)&&S.warn(`${this} created with undefined width or height. This is deprecated. Use DynamicTexture instead.`)();this.byteAlignment=s?.byteAlignment||1,this.updateTimestamp=t.incrementTimestamp()}get[Symbol.toStringTag](){return"Texture"}toString(){return`Texture(${this.id},${this.format},${this.width}x${this.height})`}clone(t){return this.device.createTexture({...this.props,...t})}setSampler(t){this.sampler=t instanceof Vn?t:this.device.createSampler(t)}copyImageData(t){const{data:n,depth:s,...r}=t;this.writeData(n,{...r,depthOrArrayLayers:r.depthOrArrayLayers??s})}computeMemoryLayout(t={}){const n=this._normalizeTextureReadOptions(t),{width:s=this.width,height:r=this.height,depthOrArrayLayers:o=this.depth}=n,{format:a,byteAlignment:c}=this;return _e.computeMemoryLayout({format:a,width:s,height:r,depth:o,byteAlignment:c})}readBuffer(t,n){throw new Error("readBuffer not implemented")}readDataAsync(t){throw new Error("readBuffer not implemented")}writeBuffer(t,n){throw new Error("readBuffer not implemented")}writeData(t,n){throw new Error("readBuffer not implemented")}readDataSyncWebGL(t){throw new Error("readDataSyncWebGL not available")}generateMipmapsWebGL(){throw new Error("generateMipmapsWebGL not available")}static normalizeProps(t,n){const s={...n},{width:r,height:o}=s;return typeof r=="number"&&(s.width=Math.max(1,Math.ceil(r))),typeof o=="number"&&(s.height=Math.max(1,Math.ceil(o))),s}_initializeData(t){this.device.isExternalImage(t)?this.copyExternalImage({image:t,width:this.width,height:this.height,depth:this.depth,mipLevel:0,x:0,y:0,z:0,aspect:"all",colorSpace:"srgb",premultipliedAlpha:!1,flipY:!1}):t&&this.copyImageData({data:t,mipLevel:0,x:0,y:0,z:0,aspect:"all"})}_normalizeCopyImageDataOptions(t){const{data:n,depth:s,...r}=t,o=this._normalizeTextureWriteOptions({...r,depthOrArrayLayers:r.depthOrArrayLayers??s});return{data:n,depth:o.depthOrArrayLayers,...o}}_normalizeCopyExternalImageOptions(t){const n=j._omitUndefined(t),s=n.mipLevel??0,r=this._getMipLevelSize(s),o=this.device.getExternalImageSize(t.image),a={...j.defaultCopyExternalImageOptions,...r,...o,...n};return a.width=Math.min(a.width,r.width-a.x),a.height=Math.min(a.height,r.height-a.y),a.depth=Math.min(a.depth,r.depthOrArrayLayers-a.z),a}_normalizeCopyElementImageOptions(t){const n=j._omitUndefined(t),s=n.mipLevel??0,r=this._getMipLevelSize(s),o={...j.defaultCopyElementImageOptions,...r,...n};return o.width=Math.min(o.width,r.width-o.x),o.height=Math.min(o.height,r.height-o.y),o.depth=Math.min(o.depth,r.depthOrArrayLayers-o.z),o}_normalizeTextureReadOptions(t){const n=j._omitUndefined(t),s=n.mipLevel??0,r=this._getMipLevelSize(s),o={...j.defaultTextureReadOptions,...r,...n};return o.width=Math.min(o.width,r.width-o.x),o.height=Math.min(o.height,r.height-o.y),o.depthOrArrayLayers=Math.min(o.depthOrArrayLayers,r.depthOrArrayLayers-o.z),o}_getSupportedColorReadOptions(t){const n=this._normalizeTextureReadOptions(t),s=_e.getInfo(this.format);switch(this._validateColorReadAspect(n),this._validateColorReadFormat(s),this.dimension){case"2d":case"cube":case"cube-array":case"2d-array":case"3d":return n;default:throw new Error(`${this} color readback does not support ${this.dimension} textures`)}}_validateColorReadAspect(t){if(t.aspect!=="all")throw new Error(`${this} color readback only supports aspect 'all'`)}_validateColorReadFormat(t){if(t.compressed)throw new Error(`${this} color readback does not support compressed formats (${this.format})`);switch(t.attachment){case"color":return;case"depth":throw new Error(`${this} color readback does not support depth formats (${this.format})`);case"stencil":throw new Error(`${this} color readback does not support stencil formats (${this.format})`);case"depth-stencil":throw new Error(`${this} color readback does not support depth-stencil formats (${this.format})`);default:throw new Error(`${this} color readback does not support format ${this.format}`)}}_normalizeTextureWriteOptions(t){const n=j._omitUndefined(t),s=n.mipLevel??0,r=this._getMipLevelSize(s),o={...j.defaultTextureWriteOptions,...r,...n};o.width=Math.min(o.width,r.width-o.x),o.height=Math.min(o.height,r.height-o.y),o.depthOrArrayLayers=Math.min(o.depthOrArrayLayers,r.depthOrArrayLayers-o.z);const a=_e.computeMemoryLayout({format:this.format,width:o.width,height:o.height,depth:o.depthOrArrayLayers,byteAlignment:this.byteAlignment}),c=a.bytesPerPixel*o.width;if(o.bytesPerRow=n.bytesPerRow??a.bytesPerRow,o.rowsPerImage=n.rowsPerImage??o.height,o.bytesPerRow<c)throw new Error(`bytesPerRow (${o.bytesPerRow}) must be at least ${c} for ${this.format}`);if(o.rowsPerImage<o.height)throw new Error(`rowsPerImage (${o.rowsPerImage}) must be at least ${o.height} for ${this.format}`);const l=this.device.getTextureFormatInfo(this.format).bytesPerPixel;if(l&&o.bytesPerRow%l!==0)throw new Error(`bytesPerRow (${o.bytesPerRow}) must be a multiple of bytesPerPixel (${l}) for ${this.format}`);return o}_getMipLevelSize(t){const n=Math.max(1,this.width>>t),s=this.baseDimension==="1d"?1:Math.max(1,this.height>>t),r=this.dimension==="3d"?Math.max(1,this.depth>>t):this.depth;return{width:n,height:s,depthOrArrayLayers:r}}getAllocatedByteLength(){let t=0;for(let n=0;n<this.mipLevels;n++){const{width:s,height:r,depthOrArrayLayers:o}=this._getMipLevelSize(n);t+=_e.computeMemoryLayout({format:this.format,width:s,height:r,depth:o,byteAlignment:1}).byteLength}return t*this.samples}static _omitUndefined(t){return Object.fromEntries(Object.entries(t).filter(([,n])=>n!==void 0))}};h(j,"SAMPLE",4),h(j,"STORAGE",8),h(j,"RENDER",16),h(j,"COPY_SRC",1),h(j,"COPY_DST",2),h(j,"TEXTURE",4),h(j,"RENDER_ATTACHMENT",16),h(j,"defaultProps",{...z.defaultProps,data:null,dimension:"2d",format:"rgba8unorm",usage:j.SAMPLE|j.RENDER|j.COPY_DST,width:void 0,height:void 0,depth:1,mipLevels:1,samples:void 0,sampler:{},view:void 0}),h(j,"defaultCopyDataOptions",{data:void 0,byteOffset:0,bytesPerRow:void 0,rowsPerImage:void 0,width:void 0,height:void 0,depthOrArrayLayers:void 0,depth:1,mipLevel:0,x:0,y:0,z:0,aspect:"all"}),h(j,"defaultCopyExternalImageOptions",{image:void 0,sourceX:0,sourceY:0,width:void 0,height:void 0,depth:1,mipLevel:0,x:0,y:0,z:0,aspect:"all",colorSpace:"srgb",premultipliedAlpha:!1,flipY:!1}),h(j,"defaultCopyElementImageOptions",{element:void 0,width:void 0,height:void 0,sourceX:0,sourceY:0,sourceWidth:void 0,sourceHeight:void 0,depth:1,mipLevel:0,x:0,y:0,z:0,aspect:"all",colorSpace:"srgb",premultipliedAlpha:!1,flipY:!1}),h(j,"defaultTextureReadOptions",{x:0,y:0,z:0,width:void 0,height:void 0,depthOrArrayLayers:1,mipLevel:0,aspect:"all"}),h(j,"defaultTextureWriteOptions",{byteOffset:0,bytesPerRow:void 0,rowsPerImage:void 0,x:0,y:0,z:0,width:void 0,height:void 0,depthOrArrayLayers:1,mipLevel:0,aspect:"all"});let H=j;const pr=class pr extends z{get[Symbol.toStringTag](){return"TextureView"}constructor(e,t){super(e,t,pr.defaultProps)}};h(pr,"defaultProps",{...z.defaultProps,format:void 0,dimension:void 0,aspect:"all",baseMipLevel:0,mipLevelCount:void 0,baseArrayLayer:0,arrayLayerCount:void 0});let jn=pr;const mr=class mr extends z{constructor(t,n){super(t,n,mr.defaultProps);h(this,"width");h(this,"height");h(this,"updateTimestamp");const s=this.props.source?t.getExternalImageSize(this.props.source):null;this.width=this.props.width||s?.width||0,this.height=this.props.height||s?.height||0,this.updateTimestamp=t.incrementTimestamp()}get[Symbol.toStringTag](){return"ExternalTexture"}};h(mr,"defaultProps",{...z.defaultProps,source:void 0,width:0,height:0,colorSpace:"srgb",sampler:{}});let So=mr;function Sv(i,e,t){let n="";const s=e.split(/\r?\n/),r=i.slice().sort((o,a)=>o.lineNum-a.lineNum);switch(t?.showSourceCode||"no"){case"all":let o=0;for(let a=1;a<=s.length;a++){const c=s[a-1],l=r[o];for(c&&l&&(n+=qu(c,a,t));r.length>o&&l.lineNum===a;){const u=r[o++];u&&(n+=Eo(u,s,u.lineNum,{...t,inlineSource:!1}))}}for(;r.length>o;){const a=r[o++];a&&(n+=Eo(a,[],0,{...t,inlineSource:!1}))}return n;case"issues":case"no":for(const a of i)n+=Eo(a,s,a.lineNum,{inlineSource:t?.showSourceCode!=="no"});return n}}function Eo(i,e,t,n){if(n?.inlineSource){const r=Ev(e,t),o=i.linePos>0?`${" ".repeat(i.linePos+5)}^^^
`:"";return`
${r}${o}${i.type.toUpperCase()}: ${i.message}

`}const s=i.type==="error"?"red":"orange";return n?.html?`<div class='luma-compiler-log-${i.type}' style="color:${s};"><b> ${i.type.toUpperCase()}: ${i.message}</b></div>`:`${i.type.toUpperCase()}: ${i.message}`}function Ev(i,e,t){let n="";for(let s=e-2;s<=e;s++){const r=i[s-1];r!==void 0&&(n+=qu(r,e,t))}return n}function qu(i,e,t){const n=t?.html?Lv(i):i;return`${Cv(String(e),4)}: ${n}${t?.html?"<br/>":`
`}`}function Cv(i,e){let t="";for(let n=i.length;n<e;++n)t+=" ";return t+i}function Lv(i){return i.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const yr=class yr extends z{constructor(t,n){n={...n,debugShaders:n.debugShaders||t.props.debugShaders||"errors"};super(t,{id:Tv(n),...n},yr.defaultProps);h(this,"stage");h(this,"source");h(this,"compilationStatus","pending");this.stage=this.props.stage,this.source=this.props.source}get[Symbol.toStringTag](){return"Shader"}getCompilationInfoSync(){return null}getTranslatedSource(){return null}async debugShader(){const t=this.props.debugShaders;switch(t){case"never":return;case"errors":if(this.compilationStatus==="success")return;break}try{const n=await this.getCompilationInfo();if(t==="warnings"&&n?.length===0)return;this._displayShaderLog(n,this.id)}catch(n){S.warn(`Shader ${this.id}: failed to fetch compilation info during debug logging`,n)()}}_displayShaderLog(t,n){if(typeof document>"u"||!document?.createElement)return;const s=n,r=`${this.stage} shader "${s}"`,o=Sv(t,this.source,{showSourceCode:"all",html:!0}),a=this.getTranslatedSource(),c=document.createElement("div");c.innerHTML=`<h1>Compilation error in ${r}</h1>
<div style="display:flex;position:fixed;top:10px;right:20px;gap:2px;">
<button id="copy">Copy source</button><br/>
<button id="close">Close</button>
</div>
<code><pre>${o}</pre></code>`,a&&(c.innerHTML+=`<br /><h1>Translated Source</h1><br /><br /><code><pre>${a}</pre></code>`),c.style.top="0",c.style.left="0",c.style.background="white",c.style.position="fixed",c.style.zIndex="9999",c.style.maxWidth="100vw",c.style.maxHeight="100vh",c.style.overflowY="auto",document.body.appendChild(c),c.querySelector(".luma-compiler-log-error")?.scrollIntoView(),c.querySelector("button#close").onclick=()=>{c.remove()},c.querySelector("button#copy").onclick=()=>{navigator.clipboard.writeText(this.source)}}};h(yr,"defaultProps",{...z.defaultProps,language:"auto",stage:void 0,source:"",sourceMap:null,entryPoint:"main",debugShaders:void 0});let Wn=yr;function Tv(i){return Av(i.source)||i.id||vi(`unnamed ${i.stage}-shader`)}function Av(i,e="unnamed"){return/#define[\s*]SHADER_NAME[\s*]([A-Za-z0-9_-]+)[\s*]/.exec(i)?.[1]??e}const br=class br extends z{constructor(t,n={}){super(t,n,br.defaultProps);h(this,"width");h(this,"height");this.width=this.props.width,this.height=this.props.height}get[Symbol.toStringTag](){return"Framebuffer"}clone(t){const n=this.colorAttachments.map(r=>r.texture.clone(t)),s=this.depthStencilAttachment&&this.depthStencilAttachment.texture.clone(t);return this.device.createFramebuffer({...this.props,...t,colorAttachments:n,depthStencilAttachment:s})}resize(t){let n=!t;if(t){const[s,r]=Array.isArray(t)?t:[t.width,t.height];n=n||r!==this.height||s!==this.width,this.width=s,this.height=r}n&&(S.log(2,`Resizing framebuffer ${this.id} to ${this.width}x${this.height}`)(),this.resizeAttachments(this.width,this.height))}autoCreateAttachmentTextures(){if(this.props.colorAttachments.length===0&&!this.props.depthStencilAttachment)throw new Error("Framebuffer has noattachments");this.colorAttachments=this.props.colorAttachments.map((n,s)=>{if(typeof n=="string"){const r=this.createColorTexture(n,s);return this.attachResource(r),r.view}return n instanceof H?n.view:n});const t=this.props.depthStencilAttachment;if(t)if(typeof t=="string"){const n=this.createDepthStencilTexture(t);this.attachResource(n),this.depthStencilAttachment=n.view}else t instanceof H?this.depthStencilAttachment=t.view:this.depthStencilAttachment=t}createColorTexture(t,n){return this.device.createTexture({id:`${this.id}-color-attachment-${n}`,usage:H.RENDER_ATTACHMENT,format:t,width:this.width,height:this.height,sampler:{magFilter:"linear",minFilter:"linear"}})}createDepthStencilTexture(t){return this.device.createTexture({id:`${this.id}-depth-stencil-attachment`,usage:H.RENDER_ATTACHMENT|H.SAMPLE,format:t,width:this.width,height:this.height})}resizeAttachments(t,n){if(this.colorAttachments.forEach((s,r)=>{const o=s.texture.clone({width:t,height:n});this.destroyAttachedResource(s),this.colorAttachments[r]=o.view,this.attachResource(o.view)}),this.depthStencilAttachment){const s=this.depthStencilAttachment.texture.clone({width:t,height:n});this.destroyAttachedResource(this.depthStencilAttachment),this.depthStencilAttachment=s.view,this.attachResource(s)}this.updateAttachments()}};h(br,"defaultProps",{...z.defaultProps,width:1,height:1,colorAttachments:[],depthStencilAttachment:null});let Hn=br;const _r=class _r extends z{constructor(t,n){super(t,n,_r.defaultProps);h(this,"shaderLayout");h(this,"bufferLayout");h(this,"linkStatus","pending");h(this,"hash","");h(this,"sharedRenderPipeline",null);this.shaderLayout=this.props.shaderLayout,this.bufferLayout=this.props.bufferLayout||[],this.sharedRenderPipeline=this.props._sharedRenderPipeline||null}get[Symbol.toStringTag](){return"RenderPipeline"}get isPending(){return this.linkStatus==="pending"||this.vs.compilationStatus==="pending"||this.fs?.compilationStatus==="pending"}get isErrored(){return this.linkStatus==="error"||this.vs.compilationStatus==="error"||this.fs?.compilationStatus==="error"}};h(_r,"defaultProps",{...z.defaultProps,vs:null,vertexEntryPoint:"vertexMain",vsConstants:{},fs:null,fragmentEntryPoint:"fragmentMain",fsConstants:{},shaderLayout:null,bufferLayout:[],topology:"triangle-list",colorAttachmentFormats:void 0,depthStencilAttachmentFormat:void 0,parameters:{},varyings:void 0,bufferMode:void 0,disableWarnings:!1,_sharedRenderPipeline:void 0,_uniformBlockLayouts:[],bindings:void 0,bindGroups:void 0});let Qe=_r;class Iv extends z{get[Symbol.toStringTag](){return"SharedRenderPipeline"}constructor(e,t){super(e,t,{...z.defaultProps,handle:void 0,vs:void 0,fs:void 0,varyings:void 0,bufferMode:void 0})}}const vr=class vr extends z{constructor(t,n){super(t,n,vr.defaultProps);h(this,"hash","");h(this,"shaderLayout");this.shaderLayout=n.shaderLayout}get[Symbol.toStringTag](){return"ComputePipeline"}};h(vr,"defaultProps",{...z.defaultProps,shader:void 0,entryPoint:void 0,constants:{},shaderLayout:void 0});let Ci=vr;const xr=class xr{constructor(e){h(this,"device");h(this,"_hashCounter",0);h(this,"_hashes",{});h(this,"_renderPipelineCache",{});h(this,"_computePipelineCache",{});h(this,"_sharedRenderPipelineCache",{});this.device=e}static getDefaultPipelineFactory(e){const t=e.getModuleData("@luma.gl/core");return t.defaultPipelineFactory||(t.defaultPipelineFactory=new xr(e)),t.defaultPipelineFactory}get[Symbol.toStringTag](){return"PipelineFactory"}toString(){return`PipelineFactory(${this.device.id})`}createRenderPipeline(e){if(!this.device.props._cachePipelines)return this.device.createRenderPipeline(e);const t={...Qe.defaultProps,...e},n=this._renderPipelineCache,s=this._hashRenderPipeline(t);let r=n[s]?.resource;if(r)n[s].useCount++,this.device.props.debugFactories&&S.log(3,`${this}: ${n[s].resource} reused, count=${n[s].useCount}, (id=${e.id})`)();else{const o=this.device.type==="webgl"&&this.device.props._sharePipelines?this.createSharedRenderPipeline(t):void 0;r=this.device.createRenderPipeline({...t,id:t.id?`${t.id}-cached`:vi("unnamed-cached"),_sharedRenderPipeline:o}),r.hash=s,n[s]={resource:r,useCount:1},this.device.props.debugFactories&&S.log(3,`${this}: ${r} created, count=${n[s].useCount}`)()}return r}createComputePipeline(e){if(!this.device.props._cachePipelines)return this.device.createComputePipeline(e);const t={...Ci.defaultProps,...e},n=this._computePipelineCache,s=this._hashComputePipeline(t);let r=n[s]?.resource;return r?(n[s].useCount++,this.device.props.debugFactories&&S.log(3,`${this}: ${n[s].resource} reused, count=${n[s].useCount}, (id=${e.id})`)()):(r=this.device.createComputePipeline({...t,id:t.id?`${t.id}-cached`:void 0}),r.hash=s,n[s]={resource:r,useCount:1},this.device.props.debugFactories&&S.log(3,`${this}: ${r} created, count=${n[s].useCount}`)()),r}release(e){if(!this.device.props._cachePipelines){e.destroy();return}const t=this._getCache(e),n=e.hash;t[n].useCount--,t[n].useCount===0?(this._destroyPipeline(e),this.device.props.debugFactories&&S.log(3,`${this}: ${e} released and destroyed`)()):t[n].useCount<0?(S.error(`${this}: ${e} released, useCount < 0, resetting`)(),t[n].useCount=0):this.device.props.debugFactories&&S.log(3,`${this}: ${e} released, count=${t[n].useCount}`)()}createSharedRenderPipeline(e){const t=this._hashSharedRenderPipeline(e);let n=this._sharedRenderPipelineCache[t];return n||(n={resource:this.device._createSharedRenderPipelineWebGL(e),useCount:0},this._sharedRenderPipelineCache[t]=n),n.useCount++,n.resource}releaseSharedRenderPipeline(e){if(!e.sharedRenderPipeline)return;const t=this._hashSharedRenderPipeline(e.sharedRenderPipeline.props),n=this._sharedRenderPipelineCache[t];n&&(n.useCount--,n.useCount===0&&(n.resource.destroy(),delete this._sharedRenderPipelineCache[t]))}_destroyPipeline(e){const t=this._getCache(e);return this.device.props._destroyPipelines?(delete t[e.hash],e.destroy(),e instanceof Qe&&this.releaseSharedRenderPipeline(e),!0):!1}_getCache(e){let t;if(e instanceof Ci&&(t=this._computePipelineCache),e instanceof Qe&&(t=this._renderPipelineCache),!t)throw new Error(`${this}`);if(!t[e.hash])throw new Error(`${this}: ${e} matched incorrect entry`);return t}_hashComputePipeline(e){const{type:t}=this.device,n=this._getHash(e.shader.source),s=this._getHash(JSON.stringify(e.shaderLayout));return`${t}/C/${n}SL${s}`}_hashRenderPipeline(e){const t=e.vs?this._getHash(e.vs.source):0,n=e.fs?this._getHash(e.fs.source):0,s=this._getWebGLVaryingHash(e),r=this._getHash(JSON.stringify(e.shaderLayout)),o=this._getHash(JSON.stringify(e._uniformBlockLayouts)),a=this._getHash(JSON.stringify(e.bufferLayout)),{type:c}=this.device;switch(c){case"webgl":const l=this._getHash(JSON.stringify(e.parameters));return`${c}/R/${t}/${n}V${s}T${e.topology}P${l}SL${r}UBL${o}BL${a}`;case"webgpu":default:const u=this._getHash(JSON.stringify({vertexEntryPoint:e.vertexEntryPoint,fragmentEntryPoint:e.fragmentEntryPoint})),f=this._getHash(JSON.stringify(e.parameters)),d=this._getWebGPUAttachmentHash(e);return`${c}/R/${t}/${n}V${s}T${e.topology}EP${u}P${f}SL${r}BL${a}A${d}`}}_hashSharedRenderPipeline(e){const t=e.vs?this._getHash(e.vs.source):0,n=e.fs?this._getHash(e.fs.source):0,s=this._getWebGLVaryingHash(e);return`webgl/S/${t}/${n}V${s}`}_getHash(e){return this._hashes[e]===void 0&&(this._hashes[e]=this._hashCounter++),this._hashes[e]}_getWebGLVaryingHash(e){const{varyings:t=[],bufferMode:n=null}=e;return this._getHash(JSON.stringify({varyings:t,bufferMode:n}))}_getWebGPUAttachmentHash(e){const t=e.colorAttachmentFormats??[this.device.preferredColorFormat],n=e.depthStencilAttachmentFormat??(e.parameters?.depthWriteEnabled?this.device.preferredDepthFormat:null);return this._getHash(JSON.stringify({colorAttachmentFormats:t,depthStencilAttachmentFormat:n}))}};h(xr,"defaultProps",{...Qe.defaultProps});let Yn=xr;const wr=class wr{constructor(e){h(this,"device");h(this,"_cache",{});this.device=e}static getDefaultShaderFactory(e){const t=e.getModuleData("@luma.gl/core");return t.defaultShaderFactory||(t.defaultShaderFactory=new wr(e)),t.defaultShaderFactory}get[Symbol.toStringTag](){return"ShaderFactory"}toString(){return`${this[Symbol.toStringTag]}(${this.device.id})`}createShader(e){if(!this.device.props._cacheShaders)return this.device.createShader(e);const t=this._hashShader(e);let n=this._cache[t];if(n)n.useCount++,this.device.props.debugFactories&&S.log(3,`${this}: Reusing shader ${n.resource.id} count=${n.useCount}`)();else{const s=this.device.createShader({...e,id:e.id?`${e.id}-cached`:void 0});this._cache[t]=n={resource:s,useCount:1},this.device.props.debugFactories&&S.log(3,`${this}: Created new shader ${s.id}`)()}return n.resource}release(e){if(!this.device.props._cacheShaders){e.destroy();return}const t=this._hashShader(e),n=this._cache[t];if(n)if(n.useCount--,n.useCount===0)this.device.props._destroyShaders&&(delete this._cache[t],n.resource.destroy(),this.device.props.debugFactories&&S.log(3,`${this}: Releasing shader ${e.id}, destroyed`)());else{if(n.useCount<0)throw new Error(`ShaderFactory: Shader ${e.id} released too many times`);this.device.props.debugFactories&&S.log(3,`${this}: Releasing shader ${e.id} count=${n.useCount}`)()}}_hashShader(e){return`${e.stage}:${e.source}`}};h(wr,"defaultProps",{...Wn.defaultProps});let qn=wr;function Xu(i,e,t){const n=i.bindings.find(s=>s.name===e||`${s.name.toLocaleLowerCase()}uniforms`===e.toLocaleLowerCase());return!n&&!t?.ignoreWarnings&&S.warn(`Binding ${e} not set: Not found in shader layout.`)(),n||null}function Co(i,e){if(!e)return{};if(Mv(e))return Object.fromEntries(Object.entries(e).map(([s,r])=>[Number(s),{...r}]));const t={};for(const[n,s]of Object.entries(e)){const o=Xu(i,n)?.group??0;t[o]||(t[o]={}),t[o][n]=s}return t}function Lo(i){const e={};for(const t of Object.values(i))Object.assign(e,t);return e}function Mv(i){const e=Object.keys(i);return e.length>0&&e.every(t=>/^\d+$/.test(t))}const Ce=class Ce extends z{get[Symbol.toStringTag](){return"RenderPass"}constructor(e,t,n=Ce.defaultProps){t=Ce.normalizeProps(e,t),super(e,t,n)}static normalizeProps(e,t){return t}};h(Ce,"defaultClearColor",[0,0,0,1]),h(Ce,"defaultClearDepth",1),h(Ce,"defaultClearStencil",0),h(Ce,"defaultProps",{...z.defaultProps,framebuffer:null,resolveTargets:void 0,parameters:void 0,clearColor:Ce.defaultClearColor,clearColors:void 0,clearDepth:Ce.defaultClearDepth,clearStencil:Ce.defaultClearStencil,depthReadOnly:!1,stencilReadOnly:!1,discard:!1,occlusionQuerySet:void 0,timestampQuerySet:void 0,beginTimestampIndex:void 0,endTimestampIndex:void 0});let To=Ce;const Pr=class Pr extends z{constructor(t,n){super(t,n,Pr.defaultProps);h(this,"_timeProfilingQuerySet",null);h(this,"_timeProfilingSlotCount",0);h(this,"_gpuTimeMs");this._timeProfilingQuerySet=n.timeProfilingQuerySet??null,this._timeProfilingSlotCount=0,this._gpuTimeMs=void 0}get[Symbol.toStringTag](){return"CommandEncoder"}async resolveTimeProfilingQuerySet(){if(this._gpuTimeMs=void 0,!this._timeProfilingQuerySet)return;const t=Math.floor(this._timeProfilingSlotCount/2);if(t<=0)return;const n=t*2,s=await this._timeProfilingQuerySet.readResults({firstQuery:0,queryCount:n});let r=0n;for(let o=0;o<n;o+=2)r+=s[o+1]-s[o];this._gpuTimeMs=Number(r)/1e6}getTimeProfilingSlotCount(){return this._timeProfilingSlotCount}getTimeProfilingQuerySet(){return this._timeProfilingQuerySet}_applyTimeProfilingToPassProps(t){const n=t||{};if(!this._supportsTimestampQueries()||!this._timeProfilingQuerySet||n.timestampQuerySet!==void 0||n.beginTimestampIndex!==void 0||n.endTimestampIndex!==void 0)return n;const s=this._timeProfilingSlotCount;return s+1>=this._timeProfilingQuerySet.props.count?n:(this._timeProfilingSlotCount+=2,{...n,timestampQuerySet:this._timeProfilingQuerySet,beginTimestampIndex:s,endTimestampIndex:s+1})}_supportsTimestampQueries(){return this.device.features.has("timestamp-query")}};h(Pr,"defaultProps",{...z.defaultProps,measureExecutionTime:void 0,timeProfilingQuerySet:void 0});let Ao=Pr;const Sr=class Sr extends z{get[Symbol.toStringTag](){return"CommandBuffer"}constructor(e,t){super(e,t,Sr.defaultProps)}};h(Sr,"defaultProps",{...z.defaultProps});let Io=Sr;const Er=class Er extends z{constructor(t,n){super(t,n,Er.defaultProps);h(this,"maxVertexAttributes");h(this,"indexBuffer",null);h(this,"attributes");this.maxVertexAttributes=t.limits.maxVertexAttributes,this.attributes=new Array(this.maxVertexAttributes).fill(null)}get[Symbol.toStringTag](){return"VertexArray"}getBufferSlot(t){return null}getDrawValidationError(){return null}setConstantWebGL(t,n){this.device.reportError(new Error("constant attributes not supported"),this)()}};h(Er,"defaultProps",{...z.defaultProps,shaderLayout:void 0,bufferLayout:[]});let Mo=Er;const Cr=class Cr extends z{get[Symbol.toStringTag](){return"TransformFeedback"}constructor(e,t){super(e,t,Cr.defaultProps)}};h(Cr,"defaultProps",{...z.defaultProps,layout:void 0,buffers:{}});let Ro=Cr;const Lr=class Lr extends z{get[Symbol.toStringTag](){return"QuerySet"}constructor(e,t){super(e,t,Lr.defaultProps)}};h(Lr,"defaultProps",{...z.defaultProps,type:void 0,count:void 0});let Oo=Lr;const Tr=class Tr extends z{get[Symbol.toStringTag](){return"Fence"}constructor(e,t={}){super(e,t,Tr.defaultProps)}};h(Tr,"defaultProps",{...z.defaultProps});let Bo=Tr;function ko(i){const e=Do(i),t=Fv[e];if(!t)throw new Error(`Unsupported variable shader type: ${i}`);return t}function Rv(i){const e=Zu(i),t=Dv[e];if(!t)throw new Error(`Unsupported attribute shader type: ${i}`);const[n,s]=t,r=n==="i32"||n==="u32",o=n!=="u32",a=kv[n]*s;return{primitiveType:n,components:s,byteLength:a,integer:r,signed:o}}class Ov{getVariableShaderTypeInfo(e){return ko(e)}getAttributeShaderTypeInfo(e){return Rv(e)}makeShaderAttributeType(e,t){return Bv(e,t)}resolveAttributeShaderTypeAlias(e){return Zu(e)}resolveVariableShaderTypeAlias(e){return Do(e)}}function Bv(i,e){return e===1?i:`vec${e}<${i}>`}function Zu(i){return Nv[i]||i}function Do(i){return zv[i]||i}const zt=new Ov,kv={f32:4,f16:2,i32:4,u32:4},Dv={f32:["f32",1],"vec2<f32>":["f32",2],"vec3<f32>":["f32",3],"vec4<f32>":["f32",4],f16:["f16",1],"vec2<f16>":["f16",2],"vec3<f16>":["f16",3],"vec4<f16>":["f16",4],i32:["i32",1],"vec2<i32>":["i32",2],"vec3<i32>":["i32",3],"vec4<i32>":["i32",4],u32:["u32",1],"vec2<u32>":["u32",2],"vec3<u32>":["u32",3],"vec4<u32>":["u32",4]},Fv={f32:{type:"f32",components:1},f16:{type:"f16",components:1},i32:{type:"i32",components:1},u32:{type:"u32",components:1},"vec2<f32>":{type:"f32",components:2},"vec3<f32>":{type:"f32",components:3},"vec4<f32>":{type:"f32",components:4},"vec2<f16>":{type:"f16",components:2},"vec3<f16>":{type:"f16",components:3},"vec4<f16>":{type:"f16",components:4},"vec2<i32>":{type:"i32",components:2},"vec3<i32>":{type:"i32",components:3},"vec4<i32>":{type:"i32",components:4},"vec2<u32>":{type:"u32",components:2},"vec3<u32>":{type:"u32",components:3},"vec4<u32>":{type:"u32",components:4},"mat2x2<f32>":{type:"f32",components:4},"mat2x3<f32>":{type:"f32",components:6},"mat2x4<f32>":{type:"f32",components:8},"mat3x2<f32>":{type:"f32",components:6},"mat3x3<f32>":{type:"f32",components:9},"mat3x4<f32>":{type:"f32",components:12},"mat4x2<f32>":{type:"f32",components:8},"mat4x3<f32>":{type:"f32",components:12},"mat4x4<f32>":{type:"f32",components:16},"mat2x2<f16>":{type:"f16",components:4},"mat2x3<f16>":{type:"f16",components:6},"mat2x4<f16>":{type:"f16",components:8},"mat3x2<f16>":{type:"f16",components:6},"mat3x3<f16>":{type:"f16",components:9},"mat3x4<f16>":{type:"f16",components:12},"mat4x2<f16>":{type:"f16",components:8},"mat4x3<f16>":{type:"f16",components:12},"mat4x4<f16>":{type:"f16",components:16},"mat2x2<i32>":{type:"i32",components:4},"mat2x3<i32>":{type:"i32",components:6},"mat2x4<i32>":{type:"i32",components:8},"mat3x2<i32>":{type:"i32",components:6},"mat3x3<i32>":{type:"i32",components:9},"mat3x4<i32>":{type:"i32",components:12},"mat4x2<i32>":{type:"i32",components:8},"mat4x3<i32>":{type:"i32",components:12},"mat4x4<i32>":{type:"i32",components:16},"mat2x2<u32>":{type:"u32",components:4},"mat2x3<u32>":{type:"u32",components:6},"mat2x4<u32>":{type:"u32",components:8},"mat3x2<u32>":{type:"u32",components:6},"mat3x3<u32>":{type:"u32",components:9},"mat3x4<u32>":{type:"u32",components:12},"mat4x2<u32>":{type:"u32",components:8},"mat4x3<u32>":{type:"u32",components:12},"mat4x4<u32>":{type:"u32",components:16}},Nv={vec2i:"vec2<i32>",vec3i:"vec3<i32>",vec4i:"vec4<i32>",vec2u:"vec2<u32>",vec3u:"vec3<u32>",vec4u:"vec4<u32>",vec2f:"vec2<f32>",vec3f:"vec3<f32>",vec4f:"vec4<f32>",vec2h:"vec2<f16>",vec3h:"vec3<f16>",vec4h:"vec4<f16>"},zv={vec2i:"vec2<i32>",vec3i:"vec3<i32>",vec4i:"vec4<i32>",vec2u:"vec2<u32>",vec3u:"vec3<u32>",vec4u:"vec4<u32>",vec2f:"vec2<f32>",vec3f:"vec3<f32>",vec4f:"vec4<f32>",vec2h:"vec2<f16>",vec3h:"vec3<f16>",vec4h:"vec4<f16>",mat2x2f:"mat2x2<f32>",mat2x3f:"mat2x3<f32>",mat2x4f:"mat2x4<f32>",mat3x2f:"mat3x2<f32>",mat3x3f:"mat3x3<f32>",mat3x4f:"mat3x4<f32>",mat4x2f:"mat4x2<f32>",mat4x3f:"mat4x3<f32>",mat4x4f:"mat4x4<f32>",mat2x2i:"mat2x2<i32>",mat2x3i:"mat2x3<i32>",mat2x4i:"mat2x4<i32>",mat3x2i:"mat3x2<i32>",mat3x3i:"mat3x3<i32>",mat3x4i:"mat3x4<i32>",mat4x2i:"mat4x2<i32>",mat4x3i:"mat4x3<i32>",mat4x4i:"mat4x4<i32>",mat2x2u:"mat2x2<u32>",mat2x3u:"mat2x3<u32>",mat2x4u:"mat2x4<u32>",mat3x2u:"mat3x2<u32>",mat3x3u:"mat3x3<u32>",mat3x4u:"mat3x4<u32>",mat4x2u:"mat4x2<u32>",mat4x3u:"mat4x3<u32>",mat4x4u:"mat4x4<u32>",mat2x2h:"mat2x2<f16>",mat2x3h:"mat2x3<f16>",mat2x4h:"mat2x4<f16>",mat3x2h:"mat3x2<f16>",mat3x3h:"mat3x3<f16>",mat3x4h:"mat3x4<f16>",mat4x2h:"mat4x2<f16>",mat4x3h:"mat4x3<f16>",mat4x4h:"mat4x4<f16>"};function Fo(i,e={}){const t={...i},n=e.layout??"std140",s={};let r=0;for(const[o,a]of Object.entries(t))r=No(s,o,a,r,n);return r=Ae(r,Je(t,n)),{layout:n,byteLength:r*4,uniformTypes:t,fields:s}}function Xn(i,e){const t=Do(i),n=ko(t),s=/^mat(\d)x(\d)<.+>$/.exec(t);if(s){const o=Number(s[1]),a=Number(s[2]),c=Ju(a,t,n.type),l=$v(c.size,c.alignment,e);return{alignment:c.alignment,size:o*l,components:o*a,columns:o,rows:a,columnStride:l,shaderType:t,type:n.type}}const r=/^vec(\d)<.+>$/.exec(t);return r?Ju(Number(r[1]),t,n.type):{alignment:1,size:1,components:1,columns:1,rows:1,columnStride:1,shaderType:t,type:n.type}}function Ku(i){return!!i&&typeof i=="object"&&!Array.isArray(i)}function No(i,e,t,n,s){if(typeof t=="string"){const r=Xn(t,s),o=Ae(n,r.alignment);return i[e]={offset:o,...r},o+r.size}if(Array.isArray(t)){if(Array.isArray(t[0]))throw new Error(`Nested arrays are not supported for ${e}`);const r=t[0],o=t[1],a=ef(r,s),c=Ae(n,Je(t,s));for(let l=0;l<o;l++)No(i,`${e}[${l}]`,r,c+l*a,s);return c+a*o}if(Ku(t)){const r=Je(t,s);let o=Ae(n,r);for(const[a,c]of Object.entries(t))o=No(i,`${e}.${a}`,c,o,s);return Ae(o,r)}throw new Error(`Unsupported CompositeShaderType for ${e}`)}function Qu(i,e){if(typeof i=="string")return Xn(i,e).size;if(Array.isArray(i)){const n=i[0],s=i[1];if(Array.isArray(n))throw new Error("Nested arrays are not supported");return ef(n,e)*s}let t=0;for(const n of Object.values(i)){const s=n;t=Ae(t,Je(s,e)),t+=Qu(s,e)}return Ae(t,Je(i,e))}function Je(i,e){if(typeof i=="string")return Xn(i,e).alignment;if(Array.isArray(i)){const n=i[0],s=Je(n,e);return tf(e)?Math.max(s,4):s}let t=1;for(const n of Object.values(i)){const s=Je(n,e);t=Math.max(t,s)}return Gv(e)?Math.max(t,4):t}function Ju(i,e,t,n){return{alignment:i===2?2:4,size:i===3?3:i,components:i,columns:1,rows:i,columnStride:i===3?3:i,shaderType:e,type:t}}function ef(i,e){const t=Qu(i,e),n=Je(i,e);return Uv(t,n,e)}function Uv(i,e,t){return Ae(i,tf(t)?4:e)}function $v(i,e,t){return t==="std140"?4:Ae(i,e)}function tf(i){return i==="std140"||i==="wgsl-uniform"}function Gv(i){return i==="std140"||i==="wgsl-uniform"}let Zn;function nf(i){return(!Zn||Zn.byteLength<i)&&(Zn=new ArrayBuffer(i)),Zn}function Vv(i,e){const t=nf(i.BYTES_PER_ELEMENT*e);return new i(t,0,e)}function jv(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Kn(i){return Array.isArray(i)?i.length===0||typeof i[0]=="number":jv(i)}class Wv{constructor(e){h(this,"layout");this.layout=e}has(e){return!!this.layout.fields[e]}get(e){const t=this.layout.fields[e];return t?{offset:t.offset,size:t.size}:void 0}getFlatUniformValues(e){const t={};for(const[n,s]of Object.entries(e)){const r=this.layout.uniformTypes[n];r?this._flattenCompositeValue(t,n,r,s):this.layout.fields[n]&&(t[n]=s)}return t}getData(e){const t=nf(this.layout.byteLength);new Uint8Array(t,0,this.layout.byteLength).fill(0);const n={i32:new Int32Array(t),u32:new Uint32Array(t),f32:new Float32Array(t),f16:new Uint16Array(t)},s=this.getFlatUniformValues(e);for(const[r,o]of Object.entries(s))this._writeLeafValue(n,r,o);return new Uint8Array(t,0,this.layout.byteLength)}_flattenCompositeValue(e,t,n,s){if(s!==void 0){if(typeof n=="string"||this.layout.fields[t]){e[t]=s;return}if(Array.isArray(n)){const r=n[0],o=n[1];if(Array.isArray(r))throw new Error(`Nested arrays are not supported for ${t}`);if(typeof r=="string"&&Kn(s)){this._flattenPackedArray(e,t,r,o,s);return}if(!Array.isArray(s)){S.warn(`Unsupported uniform array value for ${t}:`,s)();return}for(let a=0;a<Math.min(s.length,o);a++){const c=s[a];c!==void 0&&this._flattenCompositeValue(e,`${t}[${a}]`,r,c)}return}if(Ku(n)&&Hv(s)){for(const[r,o]of Object.entries(s)){if(o===void 0)continue;const a=`${t}.${r}`;this._flattenCompositeValue(e,a,n[r],o)}return}S.warn(`Unsupported uniform value for ${t}:`,s)()}}_flattenPackedArray(e,t,n,s,r){const o=r,c=Xn(n,this.layout.layout).components;for(let l=0;l<s;l++){const u=l*c;if(u>=o.length)break;c===1?e[`${t}[${l}]`]=Number(o[u]):e[`${t}[${l}]`]=Yv(r,u,u+c)}}_writeLeafValue(e,t,n){const s=this.layout.fields[t];if(!s){S.warn(`Uniform ${t} not found in layout`)();return}const{type:r,components:o,columns:a,rows:c,offset:l,columnStride:u}=s,f=e[r];if(o===1){f[l]=Number(n);return}const d=n;if(a===1){for(let p=0;p<o;p++)f[l+p]=Number(d[p]??0);return}let g=0;for(let p=0;p<a;p++){const m=l+p*u;for(let y=0;y<c;y++)f[m+y]=Number(d[g++]??0)}}}function Hv(i){return!!i&&typeof i=="object"&&!Array.isArray(i)&&!ArrayBuffer.isView(i)}function Yv(i,e,t){return Array.prototype.slice.call(i,e,t)}const qv=128;function Xv(i,e,t=16){if(i===e)return!0;const n=i,s=e;if(!Kn(n)||!Kn(s)||n.length!==s.length)return!1;const r=Math.min(t,qv);if(n.length>r)return!1;for(let o=0;o<n.length;++o)if(s[o]!==n[o])return!1;return!0}function Zv(i){return Kn(i)?i.slice():i}class Kv{constructor(e){h(this,"name");h(this,"uniforms",{});h(this,"modifiedUniforms",{});h(this,"modified",!0);h(this,"bindingLayout",{});h(this,"needsRedraw","initialized");if(this.name=e?.name||"unnamed",e?.name&&e?.shaderLayout){const t=e?.shaderLayout.bindings?.find(s=>s.type==="uniform"&&s.name===e?.name);if(!t)throw new Error(e?.name);const n=t;for(const s of n.uniforms||[])this.bindingLayout[s.name]=s}}setUniforms(e){for(const[t,n]of Object.entries(e))this._setUniform(t,n)&&!this.needsRedraw&&this.setNeedsRedraw(`${this.name}.${t}=${n}`)}setNeedsRedraw(e){this.needsRedraw=this.needsRedraw||e}getAllUniforms(){return this.modifiedUniforms={},this.needsRedraw=!1,this.uniforms||{}}_setUniform(e,t){return Xv(this.uniforms[e],t)?!1:(this.uniforms[e]=Zv(t),this.modifiedUniforms[e]=!0,this.modified=!0,!0)}}const Qv=1024;class sf{constructor(e,t){h(this,"device");h(this,"uniformBlocks",new Map);h(this,"shaderBlockLayouts",new Map);h(this,"shaderBlockWriters",new Map);h(this,"uniformBuffers",new Map);this.device=e;for(const[n,s]of Object.entries(t)){const r=n,o=Fo(s.uniformTypes??{},{layout:s.layout??Jv(e)}),a=new Wv(o);this.shaderBlockLayouts.set(r,o),this.shaderBlockWriters.set(r,a);const c=new Kv({name:n});c.setUniforms(a.getFlatUniformValues(s.defaultUniforms||{})),this.uniformBlocks.set(r,c)}}destroy(){for(const e of this.uniformBuffers.values())e.destroy()}setUniforms(e,t){for(const[n,s]of Object.entries(e)){const r=n,a=this.shaderBlockWriters.get(r)?.getFlatUniformValues(s||{});this.uniformBlocks.get(r)?.setUniforms(a||{})}this.updateUniformBuffers(t)}getUniformBufferByteLength(e){const t=this.shaderBlockLayouts.get(e)?.byteLength||0;return Math.max(t,Qv)}getUniformBufferData(e){const t=this.uniformBlocks.get(e)?.getAllUniforms()||{};return this.shaderBlockWriters.get(e)?.getData(t)||new Uint8Array(0)}createUniformBuffer(e,t){t&&this.setUniforms(t);const n=this.getUniformBufferByteLength(e),s=this.device.createBuffer({usage:F.UNIFORM|F.COPY_DST,byteLength:n}),r=this.getUniformBufferData(e);return s.write(r),s}getManagedUniformBuffer(e){if(!this.uniformBuffers.get(e)){const t=this.getUniformBufferByteLength(e),n=this.device.createBuffer({usage:F.UNIFORM|F.COPY_DST,byteLength:t});this.uniformBuffers.set(e,n)}return this.uniformBuffers.get(e)}updateUniformBuffers(e){let t=!1;for(const n of this.uniformBlocks.keys()){const s=this.updateUniformBuffer(n,e);t||(t=s)}return t&&S.log(3,`UniformStore.updateUniformBuffers(): ${t}`)(),t}updateUniformBuffer(e,t){const n=this.uniformBlocks.get(e);let s=this.uniformBuffers.get(e),r=!1;if(s&&n?.needsRedraw){r||(r=n.needsRedraw);const o=this.getUniformBufferData(e);s=this.uniformBuffers.get(e),s&&(t?this.device.writeBufferViaCommandEncoder(t,s,o):s.write(o));const a=this.uniformBlocks.get(e)?.getAllUniforms();S.log(4,`Writing to uniform buffer ${String(e)}`,o,a)()}return r}}function Jv(i){return i.type==="webgpu"?"wgsl-uniform":"std140"}function zo(i){return i.attributes?i.attributes.map(e=>e.attribute):[i.name]}function e0(i){return Object.fromEntries(i.attributes.map(e=>[e.name,e.location]))}function rf(i){let e=1/0;for(const t of i)t!==void 0&&(e=Math.min(e,t));return e}function t0(i,e,t){i0(e);const n=new Map;for(const s of e){const r=n0(s);if(s.attributes)for(const o of s.attributes)n.has(o.attribute)||n.set(o.attribute,{bufferName:s.name,stepMode:s.stepMode,vertexFormat:o.format,byteOffset:o.byteOffset,byteStride:r});else s.format&&!n.has(s.name)&&n.set(s.name,{bufferName:s.name,stepMode:s.stepMode,vertexFormat:s.format,byteOffset:0,byteStride:r})}return i.attributes.map(s=>{const r=n.get(s.name);!r&&t?.warnOnMissingBufferLayout&&S.warn(`layout for attribute "${s.name}" not present in buffer layout`)();const o=zt.getAttributeShaderTypeInfo(s.type),a=r?.vertexFormat||ne.getCompatibleVertexFormat(o);return{attributeName:s.name,bufferName:r?.bufferName||s.name,location:s.location,vertexFormat:a,byteOffset:r?.byteOffset??0,byteStride:r?.byteStride??ne.getVertexFormatInfo(a).byteLength,stepMode:r?.stepMode||s.stepMode||(s.name.startsWith("instance")?"instance":"vertex")}}).sort((s,r)=>s.location-r.location)}function i0(i){for(const e of i)(e.attributes&&e.format||!e.attributes&&!e.format)&&S.warn(`BufferLayout ${e.name} must have either 'attributes' or 'format' field`)()}function n0(i){if(typeof i.byteStride=="number")return i.byteStride;if(i.attributes){let e=0;for(const t of i.attributes)e+=ne.getVertexFormatInfo(t.format).byteLength;return e}return ne.getVertexFormatInfo(i.format).byteLength}function of(i,e){const t={},n=t0(i,e,{warnOnMissingBufferLayout:!0});for(const s of n){const r=s0(i,s);t[s.attributeName]=r}return t}function s0(i,e){const t=r0(i,e.attributeName),n=zt.getAttributeShaderTypeInfo(t.type),s=e.vertexFormat,r=ne.getVertexFormatInfo(s);return{attributeName:e.attributeName,bufferName:e.bufferName,location:t.location,shaderType:t.type,primitiveType:n.primitiveType,shaderComponents:n.components,vertexFormat:s,bufferDataType:r.type,bufferComponents:r.components,normalized:r.normalized,integer:n.integer,stepMode:e.stepMode,byteOffset:e.byteOffset,byteStride:e.byteStride}}function r0(i,e){const t=i.attributes.find(n=>n.name===e);return t||S.warn(`shader layout attribute "${e}" not present in shader`)(),t||null}const o0=/^(vs|fs):(?:#(?:decl|main-start|main-end)|[A-Za-z_][\w-]*)$/;function af(i=[],e){const t=[],n={},s={},r={},o={};for(const a of i)lf({modules:t,defines:n,injections:s,vertexInputs:r,varyings:o},a),lf({modules:t,defines:n,injections:s,vertexInputs:r,varyings:o},a[e]);for(const a of Object.keys(o))if(r[a])throw new Error(`ShaderPlugin name "${a}" cannot be both a vertex input and a varying`);return{modules:t,defines:n,injections:s,vertexInputs:r,varyings:o}}function cf(i=[],e=[]){const t=[...i],n=new Set(t.map(s=>s.name));for(const s of e)n.has(s.name)||(t.push(s),n.add(s.name));return t}function lf(i,e){if(e){e.modules?.length&&i.modules.push(...e.modules),e.defines&&Object.assign(i.defines,e.defines);for(const[t,n]of Object.entries(e.vertexInputs||{})){uf(t,"vertex input");const s=i.vertexInputs[t];if(s&&s!==n)throw new Error(`ShaderPlugin vertex input "${t}" has conflicting types "${s}" and "${n}"`);i.vertexInputs[t]=n}for(const[t,n]of Object.entries(e.varyings||{})){uf(t,"varying");const s=a0(t,n),r=i.varyings[t];if(r&&(r.type!==s.type||r.interpolation!==s.interpolation))throw new Error(`ShaderPlugin varying "${t}" has conflicting declarations "${r.type}/${r.interpolation}" and "${s.type}/${s.interpolation}"`);i.varyings[t]=s}for(const t of e.injections||[])c0(t.target),i.injections[t.target]||(i.injections[t.target]=[]),i.injections[t.target].push({injection:t.injection,order:t.order??0})}}function uf(i,e){if(!/^[A-Za-z_][A-Za-z0-9_]*$/.test(i)||i.startsWith("_luma_"))throw new Error(`ShaderPlugin ${e} "${i}" must be a valid non-reserved identifier`)}function a0(i,e){const{primitiveType:t}=zt.getAttributeShaderTypeInfo(e.type),n=t==="i32"||t==="u32",s=e.interpolation||(n?"flat":"smooth");if(n&&s==="smooth")throw new Error(`ShaderPlugin integer varying "${i}" must use flat interpolation`);return{type:e.type,interpolation:s}}function c0(i){if(!o0.test(i))throw new Error(`ShaderPlugin injection target "${i}" must be a named shader anchor or hook`)}const l0=/^(?:uniform\s+)?(?:(?:lowp|mediump|highp)\s+)?[A-Za-z0-9_]+(?:<[^>]+>)?\s+([A-Za-z0-9_]+)(?:\s*\[[^\]]+\])?\s*;/,u0=/((?:layout\s*\([^)]*\)\s*)*)uniform\s+([A-Za-z_][A-Za-z0-9_]*)\s*\{([\s\S]*?)\}\s*([A-Za-z_][A-Za-z0-9_]*)?\s*;/g;function Uo(i){return`${i.name}Uniforms`}function f0(i,e){const t=e==="wgsl"?i.source:e==="vertex"?i.vs:i.fs;if(!t)return null;const n=Uo(i);return p0(t,e==="wgsl"?"wgsl":"glsl",n)}function d0(i,e){const t=Object.keys(i.uniformTypes||{});if(!t.length)return null;const n=f0(i,e);return n?{moduleName:i.name,uniformBlockName:Uo(i),stage:e,expectedUniformNames:t,actualUniformNames:n,matches:b0(t,n)}:null}function h0(i,e,t={}){const n=d0(i,e);if(!n||n.matches)return n;const s=_0(n);return t.log?.error?.(s,n)(),t.throwOnError!==!1&&Bt(!1,s),n}function $o(i){const e=[],t=v0(i);for(const n of t.matchAll(u0)){const s=n[1]?.trim()||null;e.push({blockName:n[2],body:n[3],instanceName:n[4]||null,layoutQualifier:s,hasLayoutQualifier:!!s,isStd140:!!(s&&/\blayout\s*\([^)]*\bstd140\b[^)]*\)/.exec(s))})}return e}function g0(i,e,t,n){const s=$o(i).filter(o=>!o.isStd140),r=new Set;for(const o of s){if(r.has(o.blockName))continue;r.add(o.blockName);const a="",c=o.hasLayoutQualifier?`declares ${x0(o.layoutQualifier)} instead of layout(std140)`:"does not declare layout(std140)",l=`${a}${e} shader uniform block ${o.blockName} ${c}. luma.gl host-side shader block packing assumes explicit layout(std140) for GLSL uniform blocks. Add \`layout(std140)\` to the block declaration.`;t?.warn?.(l,o)()}return s}function p0(i,e,t){const n=e==="wgsl"?m0(i,t):y0(i,t);if(!n)return null;const s=[];for(const r of n.split(`
`)){const o=r.replace(/\/\/.*$/,"").trim();if(!o||o.startsWith("#"))continue;const a=e==="wgsl"?o.match(/^([A-Za-z0-9_]+)\s*:/):o.match(l0);a&&s.push(a[1])}return s}function m0(i,e){const t=new RegExp(`\\bstruct\\s+${e}\\b`,"m").exec(i);if(!t)return null;const n=i.indexOf("{",t.index);if(n<0)return null;let s=0;for(let r=n;r<i.length;r++){const o=i[r];if(o==="{"){s++;continue}if(o==="}"&&(s--,s===0))return i.slice(n+1,r)}return null}function y0(i,e){return $o(i).find(n=>n.blockName===e)?.body||null}function b0(i,e){if(i.length!==e.length)return!1;for(let t=0;t<i.length;t++)if(i[t]!==e[t])return!1;return!0}function _0(i){const{expectedUniformNames:e,actualUniformNames:t}=i,n=e.filter(a=>!t.includes(a)),s=t.filter(a=>!e.includes(a)),r=[`Expected ${e.length} fields, found ${t.length}.`],o=w0(e,t);return o&&r.push(o),n.length&&r.push(`Missing from shader block (${n.length}): ${ff(n)}.`),s.length&&r.push(`Unexpected in shader block (${s.length}): ${ff(s)}.`),e.length<=12&&t.length<=12&&(n.length||s.length)&&(r.push(`Expected: ${e.join(", ")}.`),r.push(`Actual: ${t.join(", ")}.`)),`${i.moduleName}: ${i.stage} shader uniform block ${i.uniformBlockName} does not match module.uniformTypes. ${r.join(" ")}`}function v0(i){return i.replace(/\/\*[\s\S]*?\*\//g,"").replace(/\/\/.*$/gm,"")}function x0(i){return i.replace(/\s+/g," ").trim()}function w0(i,e){const t=Math.min(i.length,e.length);for(let n=0;n<t;n++)if(i[n]!==e[n])return`First mismatch at field ${n+1}: expected ${i[n]}, found ${e[n]}.`;return i.length>e.length?`Shader block ends after field ${e.length}; expected next field ${i[e.length]}.`:e.length>i.length?`Shader block has extra field ${e.length}: ${e[i.length]}.`:null}function ff(i,e=8){if(i.length<=e)return i.join(", ");const t=i.length-e;return`${i.slice(0,e).join(", ")}, ... (${t} more)`}function P0(i){switch(i?.gpu.toLowerCase()){case"apple":return`#define APPLE_GPU
// Apple optimizes away the calculation necessary for emulated fp64
#define LUMA_FP64_CODE_ELIMINATION_WORKAROUND 1
#define LUMA_FP32_TAN_PRECISION_WORKAROUND 1
// Intel GPU doesn't have full 32 bits precision in same cases, causes overflow
#define LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND 1
`;case"nvidia":return`#define NVIDIA_GPU
// Nvidia optimizes away the calculation necessary for emulated fp64
#define LUMA_FP64_CODE_ELIMINATION_WORKAROUND 1
`;case"intel":return`#define INTEL_GPU
// Intel optimizes away the calculation necessary for emulated fp64
#define LUMA_FP64_CODE_ELIMINATION_WORKAROUND 1
// Intel's built-in 'tan' function doesn't have acceptable precision
#define LUMA_FP32_TAN_PRECISION_WORKAROUND 1
// Intel GPU doesn't have full 32 bits precision in same cases, causes overflow
#define LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND 1
`;case"amd":return`#define AMD_GPU
`;default:return`#define DEFAULT_GPU
// Prevent driver from optimizing away the calculation necessary for emulated fp64
#define LUMA_FP64_CODE_ELIMINATION_WORKAROUND 1
// Headless Chrome's software shader 'tan' function doesn't have acceptable precision
#define LUMA_FP32_TAN_PRECISION_WORKAROUND 1
// If the GPU doesn't have full 32 bits precision, will causes overflow
#define LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND 1
`}}function S0(i,e){if(Number(i.match(/^#version[ \t]+(\d+)/m)?.[1]||100)!==300)throw new Error("luma.gl v9 only supports GLSL 3.00 shader sources");switch(e){case"vertex":return i=hf(i,E0),i;case"fragment":return i=hf(i,C0),i;default:throw new Error(e)}}const df=[[/^(#version[ \t]+(100|300[ \t]+es))?[ \t]*\n/,`#version 300 es
`],[/\btexture(2D|2DProj|Cube)Lod(EXT)?\(/g,"textureLod("],[/\btexture(2D|2DProj|Cube)(EXT)?\(/g,"texture("]],E0=[...df,[Go("attribute"),"in $1"],[Go("varying"),"out $1"]],C0=[...df,[Go("varying"),"in $1"]];function hf(i,e){for(const[t,n]of e)i=i.replace(t,n);return i}function Go(i){return new RegExp(`\\b${i}[ \\t]+(\\w+[ \\t]+\\w+(\\[\\w+\\])?;)`,"g")}function Vo(i,e,t="glsl"){let n="";for(const s in i){const r=i[s];if(n+=`${t==="wgsl"?"fn":"void"} ${r.signature} {
`,r.header&&(n+=`  ${r.header}`),e[s]){const a=e[s];a.sort((c,l)=>c.order-l.order);for(const c of a)n+=`  ${c.injection}
`}r.footer&&(n+=`  ${r.footer}`),n+=`}
`}return n}function gf(i){const e={vertex:{},fragment:{}};for(const t of i){let n,s;typeof t!="string"?(n=t,s=n.hook):(n={},s=t),s=s.trim();const r=s.indexOf(":"),o=s.slice(0,r),a=s.slice(r+1),c=s.replace(/\(.+/,""),l=Object.assign(n,{signature:a});switch(o){case"vs":e.vertex[c]=l;break;case"fs":e.fragment[c]=l;break;default:throw new Error(o)}}return e}function L0(i,e){return{name:T0(i,e),language:"glsl",version:A0(i)}}function T0(i,e="unnamed"){const n=/#define[^\S\r\n]*SHADER_NAME[^\S\r\n]*([A-Za-z0-9_-]+)\s*/.exec(i);return n?n[1]:e}function A0(i){let e=100;const t=i.match(/[^\s]+/g);if(t&&t.length>=2&&t[0]==="#version"){const n=parseInt(t[1],10);Number.isFinite(n)&&(e=n)}if(e!==100&&e!==300)throw new Error(`Invalid GLSL version ${e}`);return e}const pf=[new RegExp(`@binding\\(\\s*(\\d+)\\s*\\)\\s*@group\\(\\s*(\\d+)\\s*\\)\\s*${fe}\\s*:\\s*([^;]+);`,"g"),new RegExp(`@group\\(\\s*(\\d+)\\s*\\)\\s*@binding\\(\\s*(\\d+)\\s*\\)\\s*${fe}\\s*:\\s*([^;]+);`,"g")];function mf(i,e=[]){const t=Tn(i),n=new Map;for(const r of e)n.set(yf(r.name,r.group,r.location),r.moduleName);const s=[];for(const r of pf){r.lastIndex=0;let o;for(o=r.exec(t);o;){const a=r===pf[0],c=Number(o[a?1:2]),l=Number(o[a?2:1]),u=o[3]?.trim(),f=o[4],d=o[5].trim(),g=n.get(yf(f,l,c));s.push(I0({name:f,group:l,binding:c,owner:g?"module":"application",moduleName:g,accessDeclaration:u,resourceType:d})),o=r.exec(t)}}return s.sort((r,o)=>r.group!==o.group?r.group-o.group:r.binding!==o.binding?r.binding-o.binding:r.name.localeCompare(o.name))}function I0(i){const e={name:i.name,group:i.group,binding:i.binding,owner:i.owner,kind:"unknown",moduleName:i.moduleName,resourceType:i.resourceType};if(i.accessDeclaration){const t=i.accessDeclaration.split(",").map(n=>n.trim());if(t[0]==="uniform")return{...e,kind:"uniform",access:"uniform"};if(t[0]==="storage"){const n=t[1]||"read_write";return{...e,kind:n==="read"?"read-only-storage":"storage",access:n}}}return i.resourceType==="sampler"||i.resourceType==="sampler_comparison"?{...e,kind:"sampler",samplerKind:i.resourceType==="sampler_comparison"?"comparison":"filtering"}:i.resourceType.startsWith("texture_storage_")?{...e,kind:"storage-texture",access:R0(i.resourceType),viewDimension:bf(i.resourceType)}:i.resourceType.startsWith("texture_")?{...e,kind:"texture",viewDimension:bf(i.resourceType),sampleType:M0(i.resourceType),multisampled:i.resourceType.startsWith("texture_multisampled_")}:e}function yf(i,e,t){return`${e}:${t}:${i}`}function bf(i){if(i.includes("cube_array"))return"cube-array";if(i.includes("2d_array"))return"2d-array";if(i.includes("cube"))return"cube";if(i.includes("3d"))return"3d";if(i.includes("2d"))return"2d";if(i.includes("1d"))return"1d"}function M0(i){if(i.startsWith("texture_depth_"))return"depth";if(i.includes("<i32>"))return"sint";if(i.includes("<u32>"))return"uint";if(i.includes("<f32>"))return"float"}function R0(i){return/,\s*([A-Za-z_][A-Za-z0-9_]*)\s*>$/.exec(i)?.[1]}const pt="([a-zA-Z_][a-zA-Z0-9_]*)",O0=/^\s*\#\s*if\s+(.+?)\s*(?:\/\/.*)?$/,B0=new RegExp(`^\\s*\\#\\s*ifdef\\s*${pt}\\s*$`),k0=new RegExp(`^\\s*\\#\\s*ifndef\\s*${pt}\\s*(?:\\/\\/.*)?$`),D0=/^\s*\#\s*else\s*(?:\/\/.*)?$/,F0=/^\s*\#\s*endif\s*$/,N0=new RegExp(`^\\s*\\#\\s*ifdef\\s*${pt}\\s*(?:\\/\\/.*)?$`),z0=/^\s*\#\s*endif\s*(?:\/\/.*)?$/;function Li(i,e){const t=i.split(`
`),n=[],s=[];let r=!0;for(const o of t){const a=o.match(O0),c=o.match(N0)||o.match(B0),l=o.match(k0),u=o.match(D0),f=o.match(z0)||o.match(F0);if(a){const d=U0(a[1],e?.defines||{}),g=r&&d;s.push({parentActive:r,branchTaken:d,active:g}),r=g}else if(c||l){const d=(c||l)?.[1],g=!!e?.defines?.[d],p=c?g:!g,m=r&&p;s.push({parentActive:r,branchTaken:p,active:m}),r=m}else if(u){const d=s[s.length-1];if(!d)throw new Error("Encountered #else without matching #if, #ifdef or #ifndef");d.active=d.parentActive&&!d.branchTaken,d.branchTaken=!0,r=d.active}else f?(s.pop(),r=s.length?s[s.length-1].active:!0):r&&n.push(o)}if(s.length>0)throw new Error("Unterminated conditional block in shader source");return n.join(`
`)}function U0(i,e){const t=i.trim();if(/^[+-]?\d+(?:\.\d+)?$/.test(t))return Number(t)!==0;if(t==="true")return!0;if(t==="false")return!1;const n=t.match(new RegExp(`^!\\s*${pt}$`));if(n)return!e[n[1]];const s=t.match(new RegExp(`^${pt}$`));if(s)return!!e[s[1]];const r=t.match(new RegExp(`^defined\\s*\\(\\s*${pt}\\s*\\)$`));if(r)return e[r[1]]!==void 0;const o=t.match(new RegExp(`^!\\s*defined\\s*\\(\\s*${pt}\\s*\\)$`));if(o)return e[o[1]]===void 0;throw new Error(`Unsupported #if expression "${i}"`)}function $0(i,e){const t=[];for(const[n,s]of Object.entries(e))V0(i,n),t.push(`in ${jo(s)} ${n};`);return t.join(`
`)}function G0(i,e,t){const n=Object.entries(t);if(n.length===0)return{source:i,declarations:"",initialization:""};const s=j0(i,e),r=i.slice(s.openParenthesis+1,s.closeParenthesis),o=W0(i,r),a=new Set(o.locations),c=[],l=[],u=[];for(const[m,y]of n){if(o.names.has(m)||q0(i,m))throw new Error(`ShaderPlugin vertex input "${m}" conflicts with an existing WGSL shader input or variable`);const _=X0(a);a.add(_);const v=`_luma_${m}`;c.push(`@location(${_}) ${v}: ${y}`),l.push(`var<private> ${m}: ${y};`),u.push(`${m} = ${v};`)}const f=r.trim()?`,
  `:`
  `,d=r.trim()?"":`
`,g=`${r}${f}${c.join(`,
  `)}${d}`;return{source:i.slice(0,s.openParenthesis+1)+g+i.slice(s.closeParenthesis),declarations:l.join(`
`),initialization:u.join(`
`)}}function jo(i){const{primitiveType:e,components:t}=zt.getAttributeShaderTypeInfo(i),n=e==="i32"?"int":e==="u32"?"uint":"float";return t===1?n:`${n==="int"?"i":n==="uint"?"u":""}vec${t}`}function V0(i,e){const t=Qn(e);if(new RegExp(`\\b(?:in|attribute)\\s+(?:(?:lowp|mediump|highp)\\s+)?[A-Za-z_][A-Za-z0-9_]*\\s+${t}\\s*(?:\\[|;)`).test(i))throw new Error(`ShaderPlugin vertex input "${e}" conflicts with an existing GLSL input`)}function j0(i,e){const n=new RegExp(`\\bfn\\s+${Qn(e)}\\s*\\(`,"g").exec(i);if(!n)throw new Error(`ShaderPlugin vertex inputs require WGSL vertex entry point "${e}"`);const s=i.indexOf("(",n.index),r=xf(i,s,"(",")");if(r<0)throw new Error(`Unable to parse WGSL vertex entry point "${e}" parameters`);return{openParenthesis:s,closeParenthesis:r}}function W0(i,e){const t=_f(e),n=new Set(vf(e)),s=H0(e);for(const r of s){const o=Y0(i,r);if(o!==null){t.push(..._f(o));for(const a of vf(o))n.add(a)}}return{locations:t,names:n}}function _f(i){const e=[],t=/@location\s*\(\s*(\d+)\s*\)/g;let n=t.exec(i);for(;n;)e.push(Number(n[1])),n=t.exec(i);return e}function vf(i){const e=[],t=/(?:^|,)\s*(?:@[A-Za-z_][\w]*(?:\([^)]*\))?\s*)*([A-Za-z_][\w]*)\s*:/gm;let n=t.exec(i);for(;n;)e.push(n[1]),n=t.exec(i);return e}function H0(i){const e=[],t=/:\s*([A-Za-z_][\w]*)\b/g;let n=t.exec(i);for(;n;)e.push(n[1]),n=t.exec(i);return e}function Y0(i,e){const n=new RegExp(`\\bstruct\\s+${Qn(e)}\\s*\\{`,"g").exec(i);if(!n)return null;const s=i.indexOf("{",n.index),r=xf(i,s,"{","}");return r<0?null:i.slice(s+1,r)}function q0(i,e){const t=Qn(e),n=new RegExp(`\\b(?:var(?:<[^>]+>)?|let|const)\\s+${t}\\b`,"g");let s=n.exec(i);for(;s;){if(Z0(i,s.index)===0)return!0;s=n.exec(i)}return!1}function X0(i){let e=0;for(;i.has(e);)e++;return e}function xf(i,e,t,n){let s=0,r=0,o=!1;for(let a=e;a<i.length;a++){const c=i[a],l=i[a+1];if(o){c===`
`&&(o=!1);continue}if(r>0){c==="/"&&l==="*"?(r++,a++):c==="*"&&l==="/"&&(r--,a++);continue}if(c==="/"&&l==="/"){o=!0,a++;continue}if(c==="/"&&l==="*"){r=1,a++;continue}if(c===t&&s++,c===n&&--s===0)return a}return-1}function Z0(i,e){let t=0,n=0,s=!1;for(let r=0;r<e;r++){const o=i[r],a=i[r+1];if(s){o===`
`&&(s=!1);continue}if(n>0){o==="/"&&a==="*"?(n++,r++):o==="*"&&a==="/"&&(n--,r++);continue}o==="/"&&a==="/"?(s=!0,r++):o==="/"&&a==="*"?(n=1,r++):o==="{"?t++:o==="}"&&t--}return t}function Qn(i){return i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function K0(i,e,t){const n=[],s=[];for(const[r,o]of Object.entries(t)){fx(i,r);const a=o.interpolation==="flat"?"flat ":"",c=e==="vertex"?"out":"in";n.push(`${a}${c} ${jo(o.type)} ${r};`),e==="vertex"&&s.push(`${r} = ${lx(o.type)};`)}return{declarations:n.join(`
`),initialization:s.join(`
`)}}function Q0(i,e,t,n){const s=Object.entries(n);if(s.length===0)return{source:i,declarations:"",vertexInitialization:"",fragmentInitialization:""};let r=i,o=Jn(r,e,"vertex");const a=J0(r,o);let c=Jn(r,t,"fragment");const l=ex(r,c),u=Wo(r,a),f=Wo(r,l.type),d=new Set([...es(o.parameters),...es(u.body),...es(c.parameters),...es(f.body)]),g=new Set([...wf(u.body),...wf(f.body)]),p=[],m=[],y=[],_=[];for(const[w,P]of s){if(d.has(w)||ax(r,w))throw new Error(`ShaderPlugin varying "${w}" conflicts with existing WGSL stage I/O or a module variable`);const L=cx(g);g.add(L);const E=P.interpolation==="flat"?" @interpolate(flat)":"";p.push(`  @location(${L})${E} ${w}: ${P.type},`),m.push(`var<private> ${w}: ${P.type};`),y.push(`${w} = ${ux(P.type)};`),_.push(`${w} = ${l.name}.${w};`)}tx(r,a,o.openBrace,o.closeBrace),r=ix(r,a,o,s.map(([w])=>w)),o=Jn(r,e,"vertex"),r=nx(r,o,s.map(([w])=>w));const b=(a===l.type?[a]:[a,l.type]).map(w=>Wo(r,w).closeBrace).sort((w,P)=>P-w);for(const w of b)r=r.slice(0,w)+`${p.join(`
`)}
`+r.slice(w);if(c=Jn(r,t,"fragment"),!new RegExp(`\\b${mt(l.name)}\\s*:`).test(c.parameters))throw new Error(`Unable to preserve WGSL fragment input "${l.name}"`);return{source:r,declarations:m.join(`
`),vertexInitialization:y.join(`
`),fragmentInitialization:_.join(`
`)}}function Jn(i,e,t){const s=new RegExp(`\\bfn\\s+${mt(e)}\\s*\\(`,"g").exec(i);if(!s)throw new Error(`ShaderPlugin varyings require WGSL ${t} entry point "${e}"`);const r=i.indexOf("(",s.index),o=ts(i,r,"(",")"),a=i.indexOf("{",o),c=ts(i,a,"{","}");if(o<0||a<0||c<0)throw new Error(`Unable to parse WGSL ${t} entry point "${e}"`);return{openParenthesis:r,closeParenthesis:o,openBrace:a,closeBrace:c,parameters:i.slice(r+1,o)}}function J0(i,e){const t=i.slice(e.closeParenthesis+1,e.openBrace),n=/->\s*([A-Za-z_][\w]*)\s*$/.exec(t.trim());if(!n||Ho(i,n[1])===null)throw new Error("ShaderPlugin varyings require the WGSL vertex entry point to return a named struct");return n[1]}function ex(i,e){const t=[];for(const n of ox(e.parameters,",")){const s=/(?:@[A-Za-z_][\w]*(?:\([^)]*\))?\s*)*([A-Za-z_][\w]*)\s*:\s*([A-Za-z_][\w]*)\s*$/.exec(n.trim());s&&Ho(i,s[2])&&t.push({name:s[1],type:s[2]})}if(t.length!==1)throw new Error(`ShaderPlugin varyings require exactly one named WGSL fragment input struct; found ${t.length}`);return t[0]}function Wo(i,e){const t=Ho(i,e);if(!t)throw new Error(`Unable to find WGSL stage I/O struct "${e}"`);return t}function Ho(i,e){const n=new RegExp(`\\bstruct\\s+${mt(e)}\\s*\\{`,"g").exec(i);if(!n)return null;const s=i.indexOf("{",n.index),r=ts(i,s,"{","}");return r<0?null:{openBrace:s,closeBrace:r,body:i.slice(s+1,r)}}function tx(i,e,t,n){const s=new RegExp(`\\b${mt(e)}\\s*\\(`,"g");let r=s.exec(i);for(;r;){if(r.index<t||r.index>n)throw new Error(`ShaderPlugin varying output struct "${e}" is constructed outside the selected vertex entry point`);r=s.exec(i)}}function ix(i,e,t,n){const s=new RegExp(`\\b${mt(e)}\\s*\\(`,"g"),r=[];let o=s.exec(i);for(;o;){if(o.index>t.openBrace&&o.index<t.closeBrace){const a=i.indexOf("(",o.index),c=ts(i,a,"(",")");if(c<0||c>t.closeBrace)throw new Error(`Unable to parse WGSL output constructor "${e}"`);r.push({openParenthesis:a,closeParenthesis:c})}o=s.exec(i)}for(const a of r.sort((c,l)=>l.closeParenthesis-c.closeParenthesis)){const l=i.slice(a.openParenthesis+1,a.closeParenthesis).trim()?", ":"";i=i.slice(0,a.closeParenthesis)+l+n.join(", ")+i.slice(a.closeParenthesis)}return i}function nx(i,e,t){const n=sx(i,e.openBrace+1,e.closeBrace);for(let s=n.length-1;s>=0;s--){const r=n[s],o=i.slice(r.expressionStart,r.semicolon).trim();if(!o)throw new Error("ShaderPlugin varying vertex entry point cannot use an empty return");const a=`_luma_vertexOutput${s}`,c=t.map(u=>`${a}.${u} = ${u};`).join(`
`),l=`{
var ${a} = ${o};
${c}
return ${a};
}`;i=i.slice(0,r.start)+l+i.slice(r.semicolon+1)}return i}function sx(i,e,t){const n=[];let s=e;for(;s<t;)if(s=Yo(i,s,t),i.slice(s,s+6)==="return"&&!/[A-Za-z0-9_]/.test(i[s+6]||"")){const r=s+6,o=rx(i,r,t);if(o<0)throw new Error("Unable to parse WGSL return statement in selected vertex entry point");n.push({start:s,expressionStart:r,semicolon:o}),s=o+1}else s++;return n}function rx(i,e,t){let n=0,s=0;for(let r=e;r<t;r++){const o=Yo(i,r,t);if(o!==r){r=o-1;continue}const a=i[r];if(a==="("&&n++,a===")"&&n--,a==="["&&s++,a==="]"&&s--,a===";"&&n===0&&s===0)return r}return-1}function Yo(i,e,t){let n=e;if(i[n]==="/"&&i[n+1]==="/"){const s=i.indexOf(`
`,n+2);return s<0||s>t?t:s+1}if(i[n]==="/"&&i[n+1]==="*"){let s=1;for(n+=2;n<t&&s>0;)i[n]==="/"&&i[n+1]==="*"?(s++,n+=2):i[n]==="*"&&i[n+1]==="/"?(s--,n+=2):n++}return n}function ox(i,e){const t=[];let n=0,s=0,r=0;for(let o=0;o<i.length;o++){const a=i[o];a==="("&&s++,a===")"&&s--,a==="<"&&r++,a===">"&&r--,a===e&&s===0&&r===0&&(t.push(i.slice(n,o)),n=o+1)}return t.push(i.slice(n)),t}function wf(i){const e=[],t=/@location\s*\(\s*(\d+)\s*\)/g;let n=t.exec(i);for(;n;)e.push(Number(n[1])),n=t.exec(i);return e}function es(i){const e=[],t=/(?:^|,)\s*(?:@[A-Za-z_][\w]*(?:\([^)]*\))?\s*)*([A-Za-z_][\w]*)\s*:/gm;let n=t.exec(i);for(;n;)e.push(n[1]),n=t.exec(i);return e}function ax(i,e){const t=new RegExp(`\\b(?:var(?:<[^>]+>)?|let|const)\\s+${mt(e)}\\b`,"g");let n=t.exec(i);for(;n;){if(dx(i,n.index)===0)return!0;n=t.exec(i)}return!1}function cx(i){let e=0;for(;i.has(e);)e++;return e}function lx(i){const{primitiveType:e,components:t}=zt.getAttributeShaderTypeInfo(i),n=e==="u32"?"0u":e==="i32"?"0":"0.0";return t===1?n:`${jo(i)}(${n})`}function ux(i){const{primitiveType:e,components:t}=zt.getAttributeShaderTypeInfo(i),n=`${e}(0)`;return t===1?n:`${i}(${n})`}function fx(i,e){if(new RegExp(`\\b(?:flat\\s+|smooth\\s+)?(?:in|out|varying)\\s+(?:(?:lowp|mediump|highp)\\s+)?[A-Za-z_][A-Za-z0-9_]*\\s+${mt(e)}\\s*(?:\\[|;)`).test(i))throw new Error(`ShaderPlugin varying "${e}" conflicts with existing GLSL stage I/O`)}function ts(i,e,t,n){let s=0,r=0,o=!1;for(let a=e;a<i.length;a++){const c=i[a],l=i[a+1];if(o){c===`
`&&(o=!1);continue}if(r>0){c==="/"&&l==="*"?(r++,a++):c==="*"&&l==="/"&&(r--,a++);continue}if(c==="/"&&l==="/"){o=!0,a++;continue}if(c==="/"&&l==="*"){r=1,a++;continue}if(c===t&&s++,c===n&&--s===0)return a}return-1}function dx(i,e){let t=0;for(let n=0;n<e;n++){const s=Yo(i,n,e);if(s!==n){n=s-1;continue}i[n]==="{"&&t++,i[n]==="}"&&t--}return t}function mt(i){return i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}const qo=`

${Mn}
`,Ti=100,hx=`precision highp float;
`;function gx(i){const e=kn(i.modules||[]),{source:t,bindingAssignments:n}=mx(i.platformInfo,{...i,source:i.source,stage:"vertex",modules:e});return{source:t,getUniforms:Sf(e),bindingAssignments:n,bindingTable:mf(t,n),shaderLayout:mu(t,{vertexEntryPoint:i.vertexEntryPoint,scanVertexAttributes:i.scanVertexAttributes})}}function px(i){const{vs:e,fs:t}=i,n=kn(i.modules||[]);return{vs:Pf(i.platformInfo,{...i,source:e,stage:"vertex",modules:n}),fs:Pf(i.platformInfo,{...i,source:t,stage:"fragment",modules:n}),getUniforms:Sf(n)}}function mx(i,e){const{source:t,stage:n,modules:s,defines:r={},hookFunctions:o=[],inject:a={},pluginInjections:c={},pluginVertexInputs:l={},pluginVaryings:u={},vertexEntryPoint:f="vertexMain",fragmentEntryPoint:d="fragmentMain",log:g}=e;Bt(typeof t=="string","shader source must be a string");const p=Li(t,{defines:r}),m=G0(p,f,l),y=Q0(m.source,f,d,u),_=y.source;let v="";const b=gf(o),x={},w={},P={};Ef(c,x,w,P);for(const M in a){const A=typeof a[M]=="string"?{injection:a[M],order:0}:a[M],R=/^(v|f)s:(#)?([\w-]+)$/.exec(M);if(R){const Z=R[2],U=R[3];Z?U==="decl"?w[M]=[A]:P[M]=[A]:x[M]=[A]}else P[M]=[A]}yx(m.declarations,m.initialization,w,P),bx(y,w,P);const L=s,E=Sx(_),T=Px(E.source),C=Tx(L,e._bindingRegistry,T,r),O=[];for(const M of L){g&&Eu(M,_,g);const A=Li(Cf(M,"wgsl",g),{defines:r}),R=Ex(A,M,{usedBindingsByGroup:T,bindingRegistry:e._bindingRegistry,reservedBindingKeysByGroup:C});O.push(...R.bindingAssignments);const Z=R.source;v+=Z;const U=_x(M);for(const G in U){const Ir=/^(v|f)s:#([\w-]+)$/.exec(G);if(Ir){const hi=Ir[2]==="decl"?w:P;hi[G]=hi[G]||[],hi[G].push(U[G])}else x[G]=x[G]||[],x[G].push(U[G])}}return v+=qo,v=Rn(v,n,vx(w),!1,"wgsl",{vertex:f,fragment:d}),v+=xx(b,x),v+=Bx(O),v+=E.source,v=Rn(v,n,P,!1,"wgsl",{vertex:f,fragment:d}),Ox(v),{source:v,bindingAssignments:O}}function Pf(i,e){const{source:t,stage:n,language:s="glsl",modules:r,defines:o={},hookFunctions:a=[],inject:c={},pluginInjections:l={},pluginVertexInputs:u={},pluginVaryings:f={},prologue:d=!0,log:g}=e;Bt(typeof t=="string","shader source must be a string");const p=s==="glsl"?L0(t).version:-1,m=i.shaderLanguageVersion,y=p===100?"#version 100":"#version 300 es",v=t.split(`
`).slice(1).join(`
`),b={};r.forEach(C=>{Object.assign(b,C.defines)}),Object.assign(b,o);let x="";switch(s){case"wgsl":break;case"glsl":x=d?`${y}

// ----- PROLOGUE -------------------------
${`#define SHADER_TYPE_${n.toUpperCase()}`}

${P0(i)}
${n==="fragment"?hx:""}

// ----- APPLICATION DEFINES -------------------------

${wx(b)}

`:`${y}
`;break}const w=gf(a),P={},L={},E={};Ef(l,P,L,E);for(const C in c){const O=typeof c[C]=="string"?{injection:c[C],order:0}:c[C],M=/^(v|f)s:(#)?([\w-]+)$/.exec(C);if(M){const A=M[2],R=M[3];A?R==="decl"?L[C]=[O]:E[C]=[O]:P[C]=[O]}else E[C]=[O]}if(n==="vertex"){const C=$0(v,u);C&&(L["vs:#decl"]=L["vs:#decl"]||[],L["vs:#decl"].push({injection:C,order:Number.MIN_SAFE_INTEGER}))}const T=K0(v,n,f);if(T.declarations){const C=n==="vertex"?"vs:#decl":"fs:#decl";L[C]=L[C]||[],L[C].push({injection:T.declarations,order:Number.MIN_SAFE_INTEGER})}T.initialization&&(E["vs:#main-start"]=E["vs:#main-start"]||[],E["vs:#main-start"].push({injection:T.initialization,order:Number.MIN_SAFE_INTEGER}));for(const C of r){g&&Eu(C,v,g);const O=Cf(C,n,g);x+=O;const M=C.instance?.normalizedInjections[n]||{};for(const A in M){const R=/^(v|f)s:#([\w-]+)$/.exec(A);if(R){const U=R[2]==="decl"?L:E;U[A]=U[A]||[],U[A].push(M[A])}else P[A]=P[A]||[],P[A].push(M[A])}}return x+="// ----- MAIN SHADER SOURCE -------------------------",x+=qo,x=Rn(x,n,L),x+=Vo(w[n],P),x+=v,x=Rn(x,n,E),s==="glsl"&&p!==m&&(x=S0(x,n)),s==="glsl"&&g0(x,n,g),x.trim()}function Sf(i){return function(t){const n={};for(const s of i){const r=s.getUniforms?.(t,n);Object.assign(n,r)}return n}}function Ef(i,e,t,n){for(const s in i){const r=/^(v|f)s:(#)?([\w-]+)$/.exec(s);if(r){const o=r[2],a=r[3],c=o?a==="decl"?t:n:e;c[s]=c[s]||[],c[s].push(...i[s])}else n[s]=n[s]||[],n[s].push(...i[s])}}function yx(i,e,t,n){i&&(t["vs:#decl"]=t["vs:#decl"]||[],t["vs:#decl"].push({injection:i,order:Number.MIN_SAFE_INTEGER})),e&&(n["vs:#main-start"]=n["vs:#main-start"]||[],n["vs:#main-start"].push({injection:e,order:Number.MIN_SAFE_INTEGER}))}function bx(i,e,t){i.declarations&&(e["vs:#decl"]=e["vs:#decl"]||[],e["vs:#decl"].push({injection:i.declarations,order:Number.MIN_SAFE_INTEGER})),i.vertexInitialization&&(t["vs:#main-start"]=t["vs:#main-start"]||[],t["vs:#main-start"].push({injection:i.vertexInitialization,order:Number.MIN_SAFE_INTEGER})),i.fragmentInitialization&&(t["fs:#main-start"]=t["fs:#main-start"]||[],t["fs:#main-start"].push({injection:i.fragmentInitialization,order:Number.MIN_SAFE_INTEGER}))}function _x(i){return{...i.instance?.normalizedInjections.vertex||{},...i.instance?.normalizedInjections.fragment||{}}}function vx(i){const e=[...i["vs:#decl"]||[],...i["fs:#decl"]||[]];return e.length?{"vs:#decl":e}:{}}function xx(i,e){return Vo(i.vertex,e,"wgsl")+Vo(i.fragment,e,"wgsl")}function wx(i={}){let e="";for(const t in i){const n=i[t];(n||Number.isFinite(n))&&(e+=`#define ${t.toUpperCase()} ${i[t]}
`)}return e}function Cf(i,e,t){let n;switch(e){case"vertex":n=i.vs||"";break;case"fragment":n=i.fs||"";break;case"wgsl":n=i.source||"";break;default:Bt(!1)}if(!i.name)throw new Error("Shader module must have a name");h0(i,e,{log:t});const s=i.name.toUpperCase().replace(/[^0-9a-z]/gi,"_");let r=`// ----- MODULE ${i.name} ---------------

`;return e!=="wgsl"&&(r+=`#define MODULE_${s}
`),r+=`${n}
`,r}function Px(i){const e=new Map;for(const t of Ot(i,$b)){const n=Number(t.bindingToken),s=Number(t.groupToken);Xo(s,n,t.name),Ut(e,s,n,`application binding "${t.name}"`)}return e}function Sx(i){const e=Ot(i,Jr),t=new Map;for(const r of e){if(r.bindingToken==="auto")continue;const o=Number(r.bindingToken),a=Number(r.groupToken);Xo(a,o,r.name),Ut(t,a,o,`application binding "${r.name}"`)}const n={sawSupportedBindingDeclaration:e.length>0},s=gu(i,Jr,r=>Lx(r,t,n));if(pu(i)&&!n.sawSupportedBindingDeclaration)throw new Error('Unsupported @binding(auto) declaration form in application WGSL. Use adjacent "@group(N)" and "@binding(auto)" decorators followed by a bindable "var" declaration.');return{source:s}}function Ex(i,e,t){const n=[],r={sawSupportedBindingDeclaration:Ot(i,bi).length>0,nextHintedBindingLocation:typeof e.firstBindingSlot=="number"?e.firstBindingSlot:null},o=gu(i,bi,a=>Cx(a,{module:e,context:t,bindingAssignments:n,relocationState:r}));if(pu(i)&&!r.sawSupportedBindingDeclaration)throw new Error(`Unsupported @binding(auto) declaration form in module "${e.name}". Use adjacent "@group(N)" and "@binding(auto)" decorators followed by a bindable "var" declaration.`);return{source:o,bindingAssignments:n}}function Cx(i,e){const{module:t,context:n,bindingAssignments:s,relocationState:r}=e,{match:o,bindingToken:a,groupToken:c,name:l}=i,u=Number(c);if(a==="auto"){const d=Tf(u,t.name,l),g=n.bindingRegistry?.get(d),p=g!==void 0?g:Mx(u,n.usedBindingsByGroup,t.name,r.nextHintedBindingLocation??void 0,n.bindingRegistry);return Lf(t.name,u,p,l),g!==void 0&&Ax(n.reservedBindingKeysByGroup,u,p,d)?(s.push({moduleName:t.name,name:l,group:u,location:p}),o.replace(/@binding\(\s*auto\s*\)/,`@binding(${p})`)):(Ut(n.usedBindingsByGroup,u,p,`module "${t.name}" binding "${l}"`),n.bindingRegistry?.set(d,p),s.push({moduleName:t.name,name:l,group:u,location:p}),r.nextHintedBindingLocation!==null&&g===void 0&&(r.nextHintedBindingLocation=p+1),o.replace(/@binding\(\s*auto\s*\)/,`@binding(${p})`))}const f=Number(a);return Lf(t.name,u,f,l),Ut(n.usedBindingsByGroup,u,f,`module "${t.name}" binding "${l}"`),s.push({moduleName:t.name,name:l,group:u,location:f}),o}function Lx(i,e,t){const{match:n,bindingToken:s,groupToken:r,name:o}=i,a=Number(r);if(s==="auto"){const c=Rx(a,e);return Xo(a,c,o),Ut(e,a,c,`application binding "${o}"`),n.replace(/@binding\(\s*auto\s*\)/,`@binding(${c})`)}return t.sawSupportedBindingDeclaration=!0,n}function Tx(i,e,t,n){const s=new Map;if(!e)return s;for(const r of i)for(const o of Ix(r,n)){const a=Tf(o.group,r.name,o.name),c=e.get(a);if(c!==void 0){const l=s.get(o.group)||new Map,u=l.get(c);if(u&&u!==a)throw new Error(`Duplicate WGSL binding reservation for modules "${u}" and "${a}": group ${o.group}, binding ${c}.`);Ut(t,o.group,c,`registered module binding "${a}"`),l.set(c,a),s.set(o.group,l)}}return s}function Ax(i,e,t,n){const s=i.get(e);if(!s)return!1;const r=s.get(t);if(!r)return!1;if(r!==n)throw new Error(`Registered module binding "${n}" collided with "${r}": group ${e}, binding ${t}.`);return!0}function Ix(i,e){const t=[],n=Li(i.source||"",{defines:e});for(const s of Ot(n,bi))t.push({name:s.name,group:Number(s.groupToken)});return t}function Xo(i,e,t){if(i===0&&e>=Ti)throw new Error(`Application binding "${t}" in group 0 uses reserved binding ${e}. Application-owned explicit group-0 bindings must stay below ${Ti}.`)}function Lf(i,e,t,n){if(e===0&&t<Ti)throw new Error(`Module "${i}" binding "${n}" in group 0 uses reserved application binding ${t}. Module-owned explicit group-0 bindings must be ${Ti} or higher.`)}function Ut(i,e,t,n){const s=i.get(e)||new Set;if(s.has(t))throw new Error(`Duplicate WGSL binding assignment for ${n}: group ${e}, binding ${t}.`);s.add(t),i.set(e,s)}function Mx(i,e,t,n,s){const r=e.get(i)||new Set,o=new Set,a=`${i}:`,c=`${a}${t}:`;for(const[u,f]of s||[])u.startsWith(c)&&o.add(f);let l=n??(i===0?Ti:r.size>0?Math.max(...r)+1:0);for(;r.has(l)||o.has(l);)l++;for(const[u,f]of s||[])f===l&&u.startsWith(a)&&s?.delete(u);return l}function Rx(i,e){const t=e.get(i)||new Set;let n=0;for(;t.has(n);)n++;return n}function Ox(i){const e=Vb(i,bi);if(!e)return;const t=kx(i,e.index);throw t?new Error(`Unresolved @binding(auto) for module "${t}" binding "${e.name}" remained in assembled WGSL source.`):Dx(i,e.index)?new Error(`Unresolved @binding(auto) for application binding "${e.name}" remained in assembled WGSL source.`):new Error(`Unresolved @binding(auto) remained in assembled WGSL source near "${Fx(e.match)}".`)}function Bx(i){if(i.length===0)return"";let e=`// ----- MODULE WGSL BINDING ASSIGNMENTS ---------------
`;for(const t of i)e+=`// ${t.moduleName}.${t.name} -> @group(${t.group}) @binding(${t.location})
`;return e+=`
`,e}function Tf(i,e,t){return`${i}:${e}:${t}`}function kx(i,e){const t=/^\/\/ ----- MODULE ([^\n]+) ---------------$/gm;let n,s;for(s=t.exec(i);s&&s.index<=e;)n=s[1],s=t.exec(i);return n}function Dx(i,e){const t=i.indexOf(qo);return t>=0?e>t:!0}function Fx(i){return i.replace(/\s+/g," ").trim()}const qe=class qe{constructor(){h(this,"_hookFunctions",[]);h(this,"_defaultModules",[])}static getDefaultShaderAssembler(e){return Bt(e==="glsl"||e==="wgsl"),e==="wgsl"?(qe.defaultShaderAssemblers.wgsl=qe.defaultShaderAssemblers.wgsl||new $t,qe.defaultShaderAssemblers.wgsl):(qe.defaultShaderAssemblers.glsl=qe.defaultShaderAssemblers.glsl||new Af,qe.defaultShaderAssemblers.glsl)}addDefaultModule(e){this._defaultModules.find(t=>t.name===(typeof e=="string"?e:e.name))||this._defaultModules.push(e)}removeDefaultModule(e){const t=typeof e=="string"?e:e.name;this._defaultModules=this._defaultModules.filter(n=>n.name!==t)}addShaderHook(e,t){t&&(e=Object.assign(t,{hook:e})),this._hookFunctions.push(e)}_getModuleList(e=[]){const t=new Array(this._defaultModules.length+e.length),n={};let s=0;for(let r=0,o=this._defaultModules.length;r<o;++r){const a=this._defaultModules[r],c=a.name;t[s++]=a,n[c]=!0}for(let r=0,o=e.length;r<o;++r){const a=e[r],c=a.name;n[c]||(t[s++]=a,n[c]=!0)}return t.length=s,Bn(t),t}};h(qe,"defaultShaderAssemblers",{});let et=qe;class Af extends et{constructor(){super(...arguments);h(this,"shaderLanguage","glsl")}assembleGLSLShaderPair(t){const n=this._getModuleList(t.modules),s=this._hookFunctions;return{...px({...t,vs:t.vs,fs:t.fs,modules:n,hookFunctions:s}),modules:n}}}class $t extends et{constructor(){super(...arguments);h(this,"shaderLanguage","wgsl");h(this,"_wgslBindingRegistry",new Map)}assembleWGSLShader(t){const n=this._getModuleList(t.modules),s=this._hookFunctions,r=$t.getShaderPreprocessorDefines(t,n),o=t.platformInfo.shaderLanguage==="wgsl"&&t.source?Li(t.source,{defines:r}):t.source,{source:a,getUniforms:c,bindingAssignments:l}=gx({...t,source:o,defines:r,_bindingRegistry:this._wgslBindingRegistry,modules:n,hookFunctions:s}),u=t.platformInfo.shaderLanguage==="wgsl"?Li(a,{defines:r}):a;return{source:u,getUniforms:c,modules:n,bindingAssignments:l,bindingTable:mf(u,l),shaderLayout:mu(u,{vertexEntryPoint:t.vertexEntryPoint,scanVertexAttributes:t.scanVertexAttributes})}}static getShaderPreprocessorDefines(t,n){return{...$t.getPlatformPreprocessorDefines(t.platformInfo),...n.reduce((s,r)=>(Object.assign(s,r.defines),s),{}),...t.defines}}static getPlatformPreprocessorDefines(t){const n=t.limits||{};return{LUMA_SUPPORTS_VERTEX_STORAGE_BUFFERS:t.type==="webgpu"&&(n.maxStorageBuffersInVertexStage||0)>0,LUMA_FP32_TAN_PRECISION_WORKAROUND:t.type==="webgpu"&&t.gpu.toLowerCase()!=="nvidia"&&t.gpu.toLowerCase()!=="amd",LUMA_FP64_INTEGER_ARITHMETIC:t.type==="webgpu"&&t.gpu.toLowerCase()==="apple"}}}const Nx=`#version 300 es
out vec4 transform_output;
void main() {
  transform_output = vec4(0);
}`;function zx(i){const{input:e,inputChannels:t,output:n}={};if(!e)return Nx;if(!t)throw new Error("inputChannels");const s=Ux(t),r=$x(e,t);return`#version 300 es
in ${s} ${e};
out vec4 ${n};
void main() {
  ${n} = ${r};
}`}function Ux(i){switch(i){case 1:return"float";case 2:return"vec2";case 3:return"vec3";case 4:return"vec4";default:throw new Error(`invalid channels: ${i}`)}}function $x(i,e){switch(e){case 1:return`vec4(${i}, 0.0, 0.0, 1.0)`;case 2:return`vec4(${i}, 0.0, 1.0)`;case 3:return`vec4(${i}, 1.0)`;case 4:return i;default:throw new Error(`invalid channels: ${e}`)}}const Gx={EPSILON:1e-12,debug:!1,precision:4,printTypes:!1,printDegrees:!1,printRowMajor:!0,_cartographicRadians:!1};globalThis.mathgl=globalThis.mathgl||{config:{...Gx}};const he=globalThis.mathgl.config;function Vx(i,{precision:e=he.precision}={}){return i=jx(i),`${parseFloat(i.toPrecision(e))}`}function Gt(i){return Array.isArray(i)||ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ve(i,e,t){return Hx(i,n=>Math.max(e,Math.min(t,n)))}function is(i,e,t){return Gt(i)?i.map((n,s)=>is(n,e[s],t)):t*e+(1-t)*i}function Vt(i,e,t){const n=he.EPSILON;try{if(i===e)return!0;if(Gt(i)&&Gt(e)){if(i.length!==e.length)return!1;for(let s=0;s<i.length;++s)if(!Vt(i[s],e[s]))return!1;return!0}return i&&i.equals?i.equals(e):e&&e.equals?e.equals(i):typeof i=="number"&&typeof e=="number"?Math.abs(i-e)<=he.EPSILON*Math.max(1,Math.abs(i),Math.abs(e)):!1}finally{he.EPSILON=n}}function jx(i){return Math.round(i/he.EPSILON)*he.EPSILON}function Wx(i){return i.clone?i.clone():new Array(i.length)}function Hx(i,e,t){if(Gt(i)){const n=i;t=t||Wx(n);for(let s=0;s<t.length&&s<n.length;++s){const r=typeof i=="number"?i:i[s];t[s]=e(r,s,t)}return t}return e(i)}class If extends Array{clone(){return new this.constructor().copy(this)}fromArray(e,t=0){for(let n=0;n<this.ELEMENTS;++n)this[n]=e[n+t];return this.check()}toArray(e=[],t=0){for(let n=0;n<this.ELEMENTS;++n)e[t+n]=this[n];return e}toObject(e){return e}from(e){return Array.isArray(e)?this.copy(e):this.fromObject(e)}to(e){return e===this?this:Gt(e)?this.toArray(e):this.toObject(e)}toTarget(e){return e?this.to(e):this}toFloat32Array(){return new Float32Array(this)}toString(){return this.formatString(he)}formatString(e){let t="";for(let n=0;n<this.ELEMENTS;++n)t+=(n>0?", ":"")+Vx(this[n],e);return`${e.printTypes?this.constructor.name:""}[${t}]`}equals(e){if(!e||this.length!==e.length)return!1;for(let t=0;t<this.ELEMENTS;++t)if(!Vt(this[t],e[t]))return!1;return!0}exactEquals(e){if(!e||this.length!==e.length)return!1;for(let t=0;t<this.ELEMENTS;++t)if(this[t]!==e[t])return!1;return!0}negate(){for(let e=0;e<this.ELEMENTS;++e)this[e]=-this[e];return this.check()}lerp(e,t,n){if(n===void 0)return this.lerp(this,e,t);for(let s=0;s<this.ELEMENTS;++s){const r=e[s],o=typeof t=="number"?t:t[s];this[s]=r+n*(o-r)}return this.check()}min(e){for(let t=0;t<this.ELEMENTS;++t)this[t]=Math.min(e[t],this[t]);return this.check()}max(e){for(let t=0;t<this.ELEMENTS;++t)this[t]=Math.max(e[t],this[t]);return this.check()}clamp(e,t){for(let n=0;n<this.ELEMENTS;++n)this[n]=Math.min(Math.max(this[n],e[n]),t[n]);return this.check()}add(...e){for(const t of e)for(let n=0;n<this.ELEMENTS;++n)this[n]+=t[n];return this.check()}subtract(...e){for(const t of e)for(let n=0;n<this.ELEMENTS;++n)this[n]-=t[n];return this.check()}scale(e){if(typeof e=="number")for(let t=0;t<this.ELEMENTS;++t)this[t]*=e;else for(let t=0;t<this.ELEMENTS&&t<e.length;++t)this[t]*=e[t];return this.check()}multiplyByScalar(e){for(let t=0;t<this.ELEMENTS;++t)this[t]*=e;return this.check()}check(){if(he.debug&&!this.validate())throw new Error(`math.gl: ${this.constructor.name} some fields set to invalid numbers'`);return this}validate(){let e=this.length===this.ELEMENTS;for(let t=0;t<this.ELEMENTS;++t)e=e&&Number.isFinite(this[t]);return e}sub(e){return this.subtract(e)}setScalar(e){for(let t=0;t<this.ELEMENTS;++t)this[t]=e;return this.check()}addScalar(e){for(let t=0;t<this.ELEMENTS;++t)this[t]+=e;return this.check()}subScalar(e){return this.addScalar(-e)}multiplyScalar(e){for(let t=0;t<this.ELEMENTS;++t)this[t]*=e;return this.check()}divideScalar(e){return this.multiplyByScalar(1/e)}clampScalar(e,t){for(let n=0;n<this.ELEMENTS;++n)this[n]=Math.min(Math.max(this[n],e),t);return this.check()}get elements(){return this}}function Yx(i,e){if(i.length!==e)return!1;for(let t=0;t<i.length;++t)if(!Number.isFinite(i[t]))return!1;return!0}function ce(i){if(!Number.isFinite(i))throw new Error(`Invalid number ${JSON.stringify(i)}`);return i}function Zo(i,e,t=""){if(he.debug&&!Yx(i,e))throw new Error(`math.gl: ${t} some fields set to invalid numbers'`);return i}function Mf(i,e){if(!i)throw new Error(`math.gl assertion ${e}`)}class qx extends If{get x(){return this[0]}set x(e){this[0]=ce(e)}get y(){return this[1]}set y(e){this[1]=ce(e)}len(){return Math.sqrt(this.lengthSquared())}magnitude(){return this.len()}lengthSquared(){let e=0;for(let t=0;t<this.ELEMENTS;++t)e+=this[t]*this[t];return e}magnitudeSquared(){return this.lengthSquared()}distance(e){return Math.sqrt(this.distanceSquared(e))}distanceSquared(e){let t=0;for(let n=0;n<this.ELEMENTS;++n){const s=this[n]-e[n];t+=s*s}return ce(t)}dot(e){let t=0;for(let n=0;n<this.ELEMENTS;++n)t+=this[n]*e[n];return ce(t)}normalize(){const e=this.magnitude();if(e!==0)for(let t=0;t<this.ELEMENTS;++t)this[t]/=e;return this.check()}multiply(...e){for(const t of e)for(let n=0;n<this.ELEMENTS;++n)this[n]*=t[n];return this.check()}divide(...e){for(const t of e)for(let n=0;n<this.ELEMENTS;++n)this[n]/=t[n];return this.check()}lengthSq(){return this.lengthSquared()}distanceTo(e){return this.distance(e)}distanceToSquared(e){return this.distanceSquared(e)}getComponent(e){return Mf(e>=0&&e<this.ELEMENTS,"index is out of range"),ce(this[e])}setComponent(e,t){return Mf(e>=0&&e<this.ELEMENTS,"index is out of range"),this[e]=t,this.check()}addVectors(e,t){return this.copy(e).add(t)}subVectors(e,t){return this.copy(e).subtract(t)}multiplyVectors(e,t){return this.copy(e).multiply(t)}addScaledVector(e,t){return this.add(new this.constructor(e).multiplyScalar(t))}}const ns=1e-6;let jt=typeof Float32Array<"u"?Float32Array:Array;function Xx(){const i=new jt(2);return jt!=Float32Array&&(i[0]=0,i[1]=0),i}function Rf(i,e,t){return i[0]=e[0]+t[0],i[1]=e[1]+t[1],i}function Zx(i,e,t){return i[0]=e[0]-t[0],i[1]=e[1]-t[1],i}function Kx(i,e){return i[0]=-e[0],i[1]=-e[1],i}function Of(i,e,t,n){const s=e[0],r=e[1];return i[0]=s+n*(t[0]-s),i[1]=r+n*(t[1]-r),i}function Qx(i,e,t){const n=e[0],s=e[1];return i[0]=t[0]*n+t[4]*s+t[12],i[1]=t[1]*n+t[5]*s+t[13],i}const Jx=Zx;(function(){const i=Xx();return function(e,t,n,s,r,o){let a,c;for(t||(t=2),n||(n=0),s?c=Math.min(s*t+n,e.length):c=e.length,a=n;a<c;a+=t)i[0]=e[a],i[1]=e[a+1],r(i,i,o),e[a]=i[0],e[a+1]=i[1];return e}})();function ew(i,e,t){const n=e[0],s=e[1],r=t[3]*n+t[7]*s||1;return i[0]=(t[0]*n+t[4]*s)/r,i[1]=(t[1]*n+t[5]*s)/r,i}function Bf(i,e,t){const n=e[0],s=e[1],r=e[2],o=t[3]*n+t[7]*s+t[11]*r||1;return i[0]=(t[0]*n+t[4]*s+t[8]*r)/o,i[1]=(t[1]*n+t[5]*s+t[9]*r)/o,i[2]=(t[2]*n+t[6]*s+t[10]*r)/o,i}function tw(i,e,t){const n=e[0],s=e[1];return i[0]=t[0]*n+t[2]*s,i[1]=t[1]*n+t[3]*s,i[2]=e[2],i}function iw(){const i=new jt(3);return jt!=Float32Array&&(i[0]=0,i[1]=0,i[2]=0),i}function nw(i,e,t){return i[0]=e[0]-t[0],i[1]=e[1]-t[1],i[2]=e[2]-t[2],i}function sw(i,e){return i[0]=-e[0],i[1]=-e[1],i[2]=-e[2],i}function rw(i,e){return i[0]*e[0]+i[1]*e[1]+i[2]*e[2]}function ow(i,e,t){const n=e[0],s=e[1],r=e[2],o=t[0],a=t[1],c=t[2];return i[0]=s*c-r*a,i[1]=r*o-n*c,i[2]=n*a-s*o,i}function kf(i,e,t){const n=e[0],s=e[1],r=e[2];let o=t[3]*n+t[7]*s+t[11]*r+t[15];return o=o||1,i[0]=(t[0]*n+t[4]*s+t[8]*r+t[12])/o,i[1]=(t[1]*n+t[5]*s+t[9]*r+t[13])/o,i[2]=(t[2]*n+t[6]*s+t[10]*r+t[14])/o,i}function aw(i,e,t){const n=e[0],s=e[1],r=e[2];return i[0]=n*t[0]+s*t[3]+r*t[6],i[1]=n*t[1]+s*t[4]+r*t[7],i[2]=n*t[2]+s*t[5]+r*t[8],i}function cw(i,e,t){const n=t[0],s=t[1],r=t[2],o=t[3],a=e[0],c=e[1],l=e[2];let u=s*l-r*c,f=r*a-n*l,d=n*c-s*a,g=s*d-r*f,p=r*u-n*d,m=n*f-s*u;const y=o*2;return u*=y,f*=y,d*=y,g*=2,p*=2,m*=2,i[0]=a+u+g,i[1]=c+f+p,i[2]=l+d+m,i}function lw(i,e,t,n){const s=[],r=[];return s[0]=e[0]-t[0],s[1]=e[1]-t[1],s[2]=e[2]-t[2],r[0]=s[0],r[1]=s[1]*Math.cos(n)-s[2]*Math.sin(n),r[2]=s[1]*Math.sin(n)+s[2]*Math.cos(n),i[0]=r[0]+t[0],i[1]=r[1]+t[1],i[2]=r[2]+t[2],i}function uw(i,e,t,n){const s=[],r=[];return s[0]=e[0]-t[0],s[1]=e[1]-t[1],s[2]=e[2]-t[2],r[0]=s[2]*Math.sin(n)+s[0]*Math.cos(n),r[1]=s[1],r[2]=s[2]*Math.cos(n)-s[0]*Math.sin(n),i[0]=r[0]+t[0],i[1]=r[1]+t[1],i[2]=r[2]+t[2],i}function fw(i,e,t,n){const s=[],r=[];return s[0]=e[0]-t[0],s[1]=e[1]-t[1],s[2]=e[2]-t[2],r[0]=s[0]*Math.cos(n)-s[1]*Math.sin(n),r[1]=s[0]*Math.sin(n)+s[1]*Math.cos(n),r[2]=s[2],i[0]=r[0]+t[0],i[1]=r[1]+t[1],i[2]=r[2]+t[2],i}function dw(i,e){const t=i[0],n=i[1],s=i[2],r=e[0],o=e[1],a=e[2],c=Math.sqrt((t*t+n*n+s*s)*(r*r+o*o+a*a)),l=c&&rw(i,e)/c;return Math.acos(Math.min(Math.max(l,-1),1))}const hw=nw;(function(){const i=iw();return function(e,t,n,s,r,o){let a,c;for(t||(t=3),n||(n=0),s?c=Math.min(s*t+n,e.length):c=e.length,a=n;a<c;a+=t)i[0]=e[a],i[1]=e[a+1],i[2]=e[a+2],r(i,i,o),e[a]=i[0],e[a+1]=i[1],e[a+2]=i[2];return e}})();const Ko=[0,0,0];let ss;class Oe extends qx{static get ZERO(){return ss||(ss=new Oe(0,0,0),Object.freeze(ss)),ss}constructor(e=0,t=0,n=0){super(-0,-0,-0),arguments.length===1&&Gt(e)?this.copy(e):(he.debug&&(ce(e),ce(t),ce(n)),this[0]=e,this[1]=t,this[2]=n)}set(e,t,n){return this[0]=e,this[1]=t,this[2]=n,this.check()}copy(e){return this[0]=e[0],this[1]=e[1],this[2]=e[2],this.check()}fromObject(e){return he.debug&&(ce(e.x),ce(e.y),ce(e.z)),this[0]=e.x,this[1]=e.y,this[2]=e.z,this.check()}toObject(e){return e.x=this[0],e.y=this[1],e.z=this[2],e}get ELEMENTS(){return 3}get z(){return this[2]}set z(e){this[2]=ce(e)}angle(e){return dw(this,e)}cross(e){return ow(this,this,e),this.check()}rotateX({radians:e,origin:t=Ko}){return lw(this,this,t,e),this.check()}rotateY({radians:e,origin:t=Ko}){return uw(this,this,t,e),this.check()}rotateZ({radians:e,origin:t=Ko}){return fw(this,this,t,e),this.check()}transform(e){return this.transformAsPoint(e)}transformAsPoint(e){return kf(this,this,e),this.check()}transformAsVector(e){return Bf(this,this,e),this.check()}transformByMatrix3(e){return aw(this,this,e),this.check()}transformByMatrix2(e){return tw(this,this,e),this.check()}transformByQuaternion(e){return cw(this,this,e),this.check()}}class gw extends If{toString(){let e="[";if(he.printRowMajor){e+="row-major:";for(let t=0;t<this.RANK;++t)for(let n=0;n<this.RANK;++n)e+=` ${this[n*this.RANK+t]}`}else{e+="column-major:";for(let t=0;t<this.ELEMENTS;++t)e+=` ${this[t]}`}return e+="]",e}getElementIndex(e,t){return t*this.RANK+e}getElement(e,t){return this[t*this.RANK+e]}setElement(e,t,n){return this[t*this.RANK+e]=ce(n),this}getColumn(e,t=new Array(this.RANK).fill(-0)){const n=e*this.RANK;for(let s=0;s<this.RANK;++s)t[s]=this[n+s];return t}setColumn(e,t){const n=e*this.RANK;for(let s=0;s<this.RANK;++s)this[n+s]=t[s];return this}}function pw(i){return i[0]=1,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=1,i[6]=0,i[7]=0,i[8]=0,i[9]=0,i[10]=1,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,i}function mw(i,e){if(i===e){const t=e[1],n=e[2],s=e[3],r=e[6],o=e[7],a=e[11];i[1]=e[4],i[2]=e[8],i[3]=e[12],i[4]=t,i[6]=e[9],i[7]=e[13],i[8]=n,i[9]=r,i[11]=e[14],i[12]=s,i[13]=o,i[14]=a}else i[0]=e[0],i[1]=e[4],i[2]=e[8],i[3]=e[12],i[4]=e[1],i[5]=e[5],i[6]=e[9],i[7]=e[13],i[8]=e[2],i[9]=e[6],i[10]=e[10],i[11]=e[14],i[12]=e[3],i[13]=e[7],i[14]=e[11],i[15]=e[15];return i}function Qo(i,e){const t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],f=e[9],d=e[10],g=e[11],p=e[12],m=e[13],y=e[14],_=e[15],v=t*a-n*o,b=t*c-s*o,x=t*l-r*o,w=n*c-s*a,P=n*l-r*a,L=s*l-r*c,E=u*m-f*p,T=u*y-d*p,C=u*_-g*p,O=f*y-d*m,M=f*_-g*m,A=d*_-g*y;let R=v*A-b*M+x*O+w*C-P*T+L*E;return R?(R=1/R,i[0]=(a*A-c*M+l*O)*R,i[1]=(s*M-n*A-r*O)*R,i[2]=(m*L-y*P+_*w)*R,i[3]=(d*P-f*L-g*w)*R,i[4]=(c*C-o*A-l*T)*R,i[5]=(t*A-s*C+r*T)*R,i[6]=(y*x-p*L-_*b)*R,i[7]=(u*L-d*x+g*b)*R,i[8]=(o*M-a*C+l*E)*R,i[9]=(n*C-t*M-r*E)*R,i[10]=(p*P-m*x+_*v)*R,i[11]=(f*x-u*P-g*v)*R,i[12]=(a*T-o*O-c*E)*R,i[13]=(t*O-n*T+s*E)*R,i[14]=(m*b-p*w-y*v)*R,i[15]=(u*w-f*b+d*v)*R,i):null}function yw(i){const e=i[0],t=i[1],n=i[2],s=i[3],r=i[4],o=i[5],a=i[6],c=i[7],l=i[8],u=i[9],f=i[10],d=i[11],g=i[12],p=i[13],m=i[14],y=i[15],_=e*o-t*r,v=e*a-n*r,b=t*a-n*o,x=l*p-u*g,w=l*m-f*g,P=u*m-f*p,L=e*P-t*w+n*x,E=r*P-o*w+a*x,T=l*b-u*v+f*_,C=g*b-p*v+m*_;return c*L-s*E+y*T-d*C}function yt(i,e,t){const n=e[0],s=e[1],r=e[2],o=e[3],a=e[4],c=e[5],l=e[6],u=e[7],f=e[8],d=e[9],g=e[10],p=e[11],m=e[12],y=e[13],_=e[14],v=e[15];let b=t[0],x=t[1],w=t[2],P=t[3];return i[0]=b*n+x*a+w*f+P*m,i[1]=b*s+x*c+w*d+P*y,i[2]=b*r+x*l+w*g+P*_,i[3]=b*o+x*u+w*p+P*v,b=t[4],x=t[5],w=t[6],P=t[7],i[4]=b*n+x*a+w*f+P*m,i[5]=b*s+x*c+w*d+P*y,i[6]=b*r+x*l+w*g+P*_,i[7]=b*o+x*u+w*p+P*v,b=t[8],x=t[9],w=t[10],P=t[11],i[8]=b*n+x*a+w*f+P*m,i[9]=b*s+x*c+w*d+P*y,i[10]=b*r+x*l+w*g+P*_,i[11]=b*o+x*u+w*p+P*v,b=t[12],x=t[13],w=t[14],P=t[15],i[12]=b*n+x*a+w*f+P*m,i[13]=b*s+x*c+w*d+P*y,i[14]=b*r+x*l+w*g+P*_,i[15]=b*o+x*u+w*p+P*v,i}function rs(i,e,t){const n=t[0],s=t[1],r=t[2];let o,a,c,l,u,f,d,g,p,m,y,_;return e===i?(i[12]=e[0]*n+e[4]*s+e[8]*r+e[12],i[13]=e[1]*n+e[5]*s+e[9]*r+e[13],i[14]=e[2]*n+e[6]*s+e[10]*r+e[14],i[15]=e[3]*n+e[7]*s+e[11]*r+e[15]):(o=e[0],a=e[1],c=e[2],l=e[3],u=e[4],f=e[5],d=e[6],g=e[7],p=e[8],m=e[9],y=e[10],_=e[11],i[0]=o,i[1]=a,i[2]=c,i[3]=l,i[4]=u,i[5]=f,i[6]=d,i[7]=g,i[8]=p,i[9]=m,i[10]=y,i[11]=_,i[12]=o*n+u*s+p*r+e[12],i[13]=a*n+f*s+m*r+e[13],i[14]=c*n+d*s+y*r+e[14],i[15]=l*n+g*s+_*r+e[15]),i}function Jo(i,e,t){const n=t[0],s=t[1],r=t[2];return i[0]=e[0]*n,i[1]=e[1]*n,i[2]=e[2]*n,i[3]=e[3]*n,i[4]=e[4]*s,i[5]=e[5]*s,i[6]=e[6]*s,i[7]=e[7]*s,i[8]=e[8]*r,i[9]=e[9]*r,i[10]=e[10]*r,i[11]=e[11]*r,i[12]=e[12],i[13]=e[13],i[14]=e[14],i[15]=e[15],i}function bw(i,e,t,n){let s=n[0],r=n[1],o=n[2],a=Math.sqrt(s*s+r*r+o*o),c,l,u,f,d,g,p,m,y,_,v,b,x,w,P,L,E,T,C,O,M,A,R,Z;return a<ns?null:(a=1/a,s*=a,r*=a,o*=a,l=Math.sin(t),c=Math.cos(t),u=1-c,f=e[0],d=e[1],g=e[2],p=e[3],m=e[4],y=e[5],_=e[6],v=e[7],b=e[8],x=e[9],w=e[10],P=e[11],L=s*s*u+c,E=r*s*u+o*l,T=o*s*u-r*l,C=s*r*u-o*l,O=r*r*u+c,M=o*r*u+s*l,A=s*o*u+r*l,R=r*o*u-s*l,Z=o*o*u+c,i[0]=f*L+m*E+b*T,i[1]=d*L+y*E+x*T,i[2]=g*L+_*E+w*T,i[3]=p*L+v*E+P*T,i[4]=f*C+m*O+b*M,i[5]=d*C+y*O+x*M,i[6]=g*C+_*O+w*M,i[7]=p*C+v*O+P*M,i[8]=f*A+m*R+b*Z,i[9]=d*A+y*R+x*Z,i[10]=g*A+_*R+w*Z,i[11]=p*A+v*R+P*Z,e!==i&&(i[12]=e[12],i[13]=e[13],i[14]=e[14],i[15]=e[15]),i)}function Df(i,e,t){const n=Math.sin(t),s=Math.cos(t),r=e[4],o=e[5],a=e[6],c=e[7],l=e[8],u=e[9],f=e[10],d=e[11];return e!==i&&(i[0]=e[0],i[1]=e[1],i[2]=e[2],i[3]=e[3],i[12]=e[12],i[13]=e[13],i[14]=e[14],i[15]=e[15]),i[4]=r*s+l*n,i[5]=o*s+u*n,i[6]=a*s+f*n,i[7]=c*s+d*n,i[8]=l*s-r*n,i[9]=u*s-o*n,i[10]=f*s-a*n,i[11]=d*s-c*n,i}function _w(i,e,t){const n=Math.sin(t),s=Math.cos(t),r=e[0],o=e[1],a=e[2],c=e[3],l=e[8],u=e[9],f=e[10],d=e[11];return e!==i&&(i[4]=e[4],i[5]=e[5],i[6]=e[6],i[7]=e[7],i[12]=e[12],i[13]=e[13],i[14]=e[14],i[15]=e[15]),i[0]=r*s-l*n,i[1]=o*s-u*n,i[2]=a*s-f*n,i[3]=c*s-d*n,i[8]=r*n+l*s,i[9]=o*n+u*s,i[10]=a*n+f*s,i[11]=c*n+d*s,i}function Ff(i,e,t){const n=Math.sin(t),s=Math.cos(t),r=e[0],o=e[1],a=e[2],c=e[3],l=e[4],u=e[5],f=e[6],d=e[7];return e!==i&&(i[8]=e[8],i[9]=e[9],i[10]=e[10],i[11]=e[11],i[12]=e[12],i[13]=e[13],i[14]=e[14],i[15]=e[15]),i[0]=r*s+l*n,i[1]=o*s+u*n,i[2]=a*s+f*n,i[3]=c*s+d*n,i[4]=l*s-r*n,i[5]=u*s-o*n,i[6]=f*s-a*n,i[7]=d*s-c*n,i}function vw(i,e){const t=e[0],n=e[1],s=e[2],r=e[3],o=t+t,a=n+n,c=s+s,l=t*o,u=n*o,f=n*a,d=s*o,g=s*a,p=s*c,m=r*o,y=r*a,_=r*c;return i[0]=1-f-p,i[1]=u+_,i[2]=d-y,i[3]=0,i[4]=u-_,i[5]=1-l-p,i[6]=g+m,i[7]=0,i[8]=d+y,i[9]=g-m,i[10]=1-l-f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,i}function xw(i,e,t,n,s,r,o){const a=1/(t-e),c=1/(s-n),l=1/(r-o);return i[0]=r*2*a,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=r*2*c,i[6]=0,i[7]=0,i[8]=(t+e)*a,i[9]=(s+n)*c,i[10]=(o+r)*l,i[11]=-1,i[12]=0,i[13]=0,i[14]=o*r*2*l,i[15]=0,i}function ww(i,e,t,n,s){const r=1/Math.tan(e/2);if(i[0]=r/t,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=r,i[6]=0,i[7]=0,i[8]=0,i[9]=0,i[11]=-1,i[12]=0,i[13]=0,i[15]=0,s!=null&&s!==1/0){const o=1/(n-s);i[10]=(s+n)*o,i[14]=2*s*n*o}else i[10]=-1,i[14]=-2*n;return i}const Pw=ww;function Sw(i,e,t,n,s,r,o){const a=1/(e-t),c=1/(n-s),l=1/(r-o);return i[0]=-2*a,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=-2*c,i[6]=0,i[7]=0,i[8]=0,i[9]=0,i[10]=2*l,i[11]=0,i[12]=(e+t)*a,i[13]=(s+n)*c,i[14]=(o+r)*l,i[15]=1,i}const Ew=Sw;function Cw(i,e,t,n){let s,r,o,a,c,l,u,f,d,g;const p=e[0],m=e[1],y=e[2],_=n[0],v=n[1],b=n[2],x=t[0],w=t[1],P=t[2];return Math.abs(p-x)<ns&&Math.abs(m-w)<ns&&Math.abs(y-P)<ns?pw(i):(f=p-x,d=m-w,g=y-P,s=1/Math.sqrt(f*f+d*d+g*g),f*=s,d*=s,g*=s,r=v*g-b*d,o=b*f-_*g,a=_*d-v*f,s=Math.sqrt(r*r+o*o+a*a),s?(s=1/s,r*=s,o*=s,a*=s):(r=0,o=0,a=0),c=d*a-g*o,l=g*r-f*a,u=f*o-d*r,s=Math.sqrt(c*c+l*l+u*u),s?(s=1/s,c*=s,l*=s,u*=s):(c=0,l=0,u=0),i[0]=r,i[1]=c,i[2]=f,i[3]=0,i[4]=o,i[5]=l,i[6]=d,i[7]=0,i[8]=a,i[9]=u,i[10]=g,i[11]=0,i[12]=-(r*p+o*m+a*y),i[13]=-(c*p+l*m+u*y),i[14]=-(f*p+d*m+g*y),i[15]=1,i)}function Lw(){const i=new jt(4);return jt!=Float32Array&&(i[0]=0,i[1]=0,i[2]=0,i[3]=0),i}function Tw(i,e,t){return i[0]=e[0]*t,i[1]=e[1]*t,i[2]=e[2]*t,i[3]=e[3]*t,i}function Ai(i,e,t){const n=e[0],s=e[1],r=e[2],o=e[3];return i[0]=t[0]*n+t[4]*s+t[8]*r+t[12]*o,i[1]=t[1]*n+t[5]*s+t[9]*r+t[13]*o,i[2]=t[2]*n+t[6]*s+t[10]*r+t[14]*o,i[3]=t[3]*n+t[7]*s+t[11]*r+t[15]*o,i}(function(){const i=Lw();return function(e,t,n,s,r,o){let a,c;for(t||(t=4),n||(n=0),s?c=Math.min(s*t+n,e.length):c=e.length,a=n;a<c;a+=t)i[0]=e[a],i[1]=e[a+1],i[2]=e[a+2],i[3]=e[a+3],r(i,i,o),e[a]=i[0],e[a+1]=i[1],e[a+2]=i[2],e[a+3]=i[3];return e}})();var ea;(function(i){i[i.COL0ROW0=0]="COL0ROW0",i[i.COL0ROW1=1]="COL0ROW1",i[i.COL0ROW2=2]="COL0ROW2",i[i.COL0ROW3=3]="COL0ROW3",i[i.COL1ROW0=4]="COL1ROW0",i[i.COL1ROW1=5]="COL1ROW1",i[i.COL1ROW2=6]="COL1ROW2",i[i.COL1ROW3=7]="COL1ROW3",i[i.COL2ROW0=8]="COL2ROW0",i[i.COL2ROW1=9]="COL2ROW1",i[i.COL2ROW2=10]="COL2ROW2",i[i.COL2ROW3=11]="COL2ROW3",i[i.COL3ROW0=12]="COL3ROW0",i[i.COL3ROW1=13]="COL3ROW1",i[i.COL3ROW2=14]="COL3ROW2",i[i.COL3ROW3=15]="COL3ROW3"})(ea||(ea={}));const Aw=45*Math.PI/180,Iw=1,ta=.1,ia=500,Mw=Object.freeze([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);class Be extends gw{static get IDENTITY(){return Ow()}static get ZERO(){return Rw()}get ELEMENTS(){return 16}get RANK(){return 4}get INDICES(){return ea}constructor(e){super(-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0),arguments.length===1&&Array.isArray(e)?this.copy(e):this.identity()}copy(e){return this[0]=e[0],this[1]=e[1],this[2]=e[2],this[3]=e[3],this[4]=e[4],this[5]=e[5],this[6]=e[6],this[7]=e[7],this[8]=e[8],this[9]=e[9],this[10]=e[10],this[11]=e[11],this[12]=e[12],this[13]=e[13],this[14]=e[14],this[15]=e[15],this.check()}set(e,t,n,s,r,o,a,c,l,u,f,d,g,p,m,y){return this[0]=e,this[1]=t,this[2]=n,this[3]=s,this[4]=r,this[5]=o,this[6]=a,this[7]=c,this[8]=l,this[9]=u,this[10]=f,this[11]=d,this[12]=g,this[13]=p,this[14]=m,this[15]=y,this.check()}setRowMajor(e,t,n,s,r,o,a,c,l,u,f,d,g,p,m,y){return this[0]=e,this[1]=r,this[2]=l,this[3]=g,this[4]=t,this[5]=o,this[6]=u,this[7]=p,this[8]=n,this[9]=a,this[10]=f,this[11]=m,this[12]=s,this[13]=c,this[14]=d,this[15]=y,this.check()}toRowMajor(e){return e[0]=this[0],e[1]=this[4],e[2]=this[8],e[3]=this[12],e[4]=this[1],e[5]=this[5],e[6]=this[9],e[7]=this[13],e[8]=this[2],e[9]=this[6],e[10]=this[10],e[11]=this[14],e[12]=this[3],e[13]=this[7],e[14]=this[11],e[15]=this[15],e}identity(){return this.copy(Mw)}fromObject(e){return this.check()}fromQuaternion(e){return vw(this,e),this.check()}frustum(e){const{left:t,right:n,bottom:s,top:r,near:o=ta,far:a=ia}=e;return a===1/0?Bw(this,t,n,s,r,o):xw(this,t,n,s,r,o,a),this.check()}lookAt(e){const{eye:t,center:n=[0,0,0],up:s=[0,1,0]}=e;return Cw(this,t,n,s),this.check()}ortho(e){const{left:t,right:n,bottom:s,top:r,near:o=ta,far:a=ia}=e;return Ew(this,t,n,s,r,o,a),this.check()}orthographic(e){const{fovy:t=Aw,aspect:n=Iw,focalDistance:s=1,near:r=ta,far:o=ia}=e;Nf(t);const a=t/2,c=s*Math.tan(a),l=c*n;return this.ortho({left:-l,right:l,bottom:-c,top:c,near:r,far:o})}perspective(e){const{fovy:t=45*Math.PI/180,aspect:n=1,near:s=.1,far:r=500}=e;return Nf(t),Pw(this,t,n,s,r),this.check()}determinant(){return yw(this)}getScale(e=[-0,-0,-0]){return e[0]=Math.sqrt(this[0]*this[0]+this[1]*this[1]+this[2]*this[2]),e[1]=Math.sqrt(this[4]*this[4]+this[5]*this[5]+this[6]*this[6]),e[2]=Math.sqrt(this[8]*this[8]+this[9]*this[9]+this[10]*this[10]),e}getTranslation(e=[-0,-0,-0]){return e[0]=this[12],e[1]=this[13],e[2]=this[14],e}getRotation(e,t){e=e||[-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0,-0],t=t||[-0,-0,-0];const n=this.getScale(t),s=1/n[0],r=1/n[1],o=1/n[2];return e[0]=this[0]*s,e[1]=this[1]*r,e[2]=this[2]*o,e[3]=0,e[4]=this[4]*s,e[5]=this[5]*r,e[6]=this[6]*o,e[7]=0,e[8]=this[8]*s,e[9]=this[9]*r,e[10]=this[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}getRotationMatrix3(e,t){e=e||[-0,-0,-0,-0,-0,-0,-0,-0,-0],t=t||[-0,-0,-0];const n=this.getScale(t),s=1/n[0],r=1/n[1],o=1/n[2];return e[0]=this[0]*s,e[1]=this[1]*r,e[2]=this[2]*o,e[3]=this[4]*s,e[4]=this[5]*r,e[5]=this[6]*o,e[6]=this[8]*s,e[7]=this[9]*r,e[8]=this[10]*o,e}transpose(){return mw(this,this),this.check()}invert(){return Qo(this,this),this.check()}multiplyLeft(e){return yt(this,e,this),this.check()}multiplyRight(e){return yt(this,this,e),this.check()}rotateX(e){return Df(this,this,e),this.check()}rotateY(e){return _w(this,this,e),this.check()}rotateZ(e){return Ff(this,this,e),this.check()}rotateXYZ(e){return this.rotateX(e[0]).rotateY(e[1]).rotateZ(e[2])}rotateAxis(e,t){return bw(this,this,e,t),this.check()}scale(e){return Jo(this,this,Array.isArray(e)?e:[e,e,e]),this.check()}translate(e){return rs(this,this,e),this.check()}transform(e,t){return e.length===4?(t=Ai(t||[-0,-0,-0,-0],e,this),Zo(t,4),t):this.transformAsPoint(e,t)}transformAsPoint(e,t){const{length:n}=e;let s;switch(n){case 2:s=Qx(t||[-0,-0],e,this);break;case 3:s=kf(t||[-0,-0,-0],e,this);break;default:throw new Error("Illegal vector")}return Zo(s,e.length),s}transformAsVector(e,t){let n;switch(e.length){case 2:n=ew(t||[-0,-0],e,this);break;case 3:n=Bf(t||[-0,-0,-0],e,this);break;default:throw new Error("Illegal vector")}return Zo(n,e.length),n}transformPoint(e,t){return this.transformAsPoint(e,t)}transformVector(e,t){return this.transformAsPoint(e,t)}transformDirection(e,t){return this.transformAsVector(e,t)}makeRotationX(e){return this.identity().rotateX(e)}makeTranslation(e,t,n){return this.identity().translate([e,t,n])}}let os,as;function Rw(){return os||(os=new Be([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),Object.freeze(os)),os}function Ow(){return as||(as=new Be,Object.freeze(as)),as}function Nf(i){if(i>Math.PI*2)throw Error("expected radians")}function Bw(i,e,t,n,s,r){const o=2*r/(t-e),a=2*r/(s-n),c=(t+e)/(t-e),l=(s+n)/(s-n),u=-1,f=-1,d=-2*r;return i[0]=o,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=a,i[6]=0,i[7]=0,i[8]=c,i[9]=l,i[10]=u,i[11]=f,i[12]=0,i[13]=0,i[14]=d,i[15]=0,i}function zf(i,e=[],t=0){const n=Math.fround(i),s=i-n;return e[t]=n,e[t+1]=s,e}function kw(i){return i-Math.fround(i)}function Dw(i){const e=new Float32Array(32);for(let t=0;t<4;++t)for(let n=0;n<4;++n){const s=t*4+n;zf(i[n*4+t],e,s*2)}return e}function Uf(i,e=!0){return i??e}function $f(i=[0,0,0],e=!0){return e?i.map(t=>t/255):[...i]}function Fw(i,e=!0){const t=$f(i.slice(0,3),e),n=Number.isFinite(i[3]),s=n?i[3]:1;return[t[0],t[1],t[2],e&&n?s/255:s]}const na={name:"fp32",source:`#ifdef LUMA_FP32_TAN_PRECISION_WORKAROUND
const FP32_TWO_PI: f32 = 6.2831854820251465;
const FP32_PI_2: f32 = 1.5707963705062866;
const FP32_PI_16: f32 = 0.1963495463132858;

const FP32_SIN_TABLE_0: f32 = 0.19509032368659973;
const FP32_SIN_TABLE_1: f32 = 0.3826834261417389;
const FP32_SIN_TABLE_2: f32 = 0.5555702447891235;
const FP32_SIN_TABLE_3: f32 = 0.7071067690849304;

const FP32_COS_TABLE_0: f32 = 0.9807852506637573;
const FP32_COS_TABLE_1: f32 = 0.9238795042037964;
const FP32_COS_TABLE_2: f32 = 0.8314695954322815;
const FP32_COS_TABLE_3: f32 = 0.7071067690849304;

const FP32_INVERSE_FACTORIAL_3: f32 = 1.666666716337204e-01;
const FP32_INVERSE_FACTORIAL_5: f32 = 8.333333767950535e-03;
const FP32_INVERSE_FACTORIAL_7: f32 = 1.9841270113829523e-04;
const FP32_INVERSE_FACTORIAL_9: f32 = 2.75573188446287533e-06;
const FP32_OVERFLOW: f32 = 3.402823466e+38;

fn sin_taylor_fp32(a: f32) -> f32 {
  if (a == 0.0) {
    return 0.0;
  }

  let x = -a * a;
  var sum = a;
  var term = a;

  term = term * x;
  sum = sum + term * FP32_INVERSE_FACTORIAL_3;
  term = term * x;
  sum = sum + term * FP32_INVERSE_FACTORIAL_5;
  term = term * x;
  sum = sum + term * FP32_INVERSE_FACTORIAL_7;
  term = term * x;
  sum = sum + term * FP32_INVERSE_FACTORIAL_9;

  return sum;
}

fn tan_taylor_fp32(a: f32) -> f32 {
  if (a == 0.0) {
    return 0.0;
  }

  let z = floor(a / FP32_TWO_PI);
  let reduced = a - FP32_TWO_PI * z;

  var quadrantValue = floor(reduced / FP32_PI_2 + 0.5);
  let quadrant = i32(quadrantValue);
  if (quadrant < -2 || quadrant > 2) {
    return FP32_OVERFLOW;
  }

  var angle = reduced - FP32_PI_2 * quadrantValue;
  quadrantValue = floor(angle / FP32_PI_16 + 0.5);
  let tableIndex = i32(quadrantValue);
  let absoluteTableIndex = abs(tableIndex);
  if (absoluteTableIndex > 4) {
    return FP32_OVERFLOW;
  }

  angle = angle - FP32_PI_16 * quadrantValue;
  let sinAngle = sin_taylor_fp32(angle);
  let cosAngle = sqrt(1.0 - sinAngle * sinAngle);

  var tableCos = 0.0;
  var tableSin = 0.0;
  if (absoluteTableIndex == 1) {
    tableCos = FP32_COS_TABLE_0;
    tableSin = FP32_SIN_TABLE_0;
  } else if (absoluteTableIndex == 2) {
    tableCos = FP32_COS_TABLE_1;
    tableSin = FP32_SIN_TABLE_1;
  } else if (absoluteTableIndex == 3) {
    tableCos = FP32_COS_TABLE_2;
    tableSin = FP32_SIN_TABLE_2;
  } else if (absoluteTableIndex == 4) {
    tableCos = FP32_COS_TABLE_3;
    tableSin = FP32_SIN_TABLE_3;
  }

  var sinReduced = sinAngle;
  var cosReduced = cosAngle;
  if (tableIndex > 0) {
    sinReduced = tableCos * sinAngle + tableSin * cosAngle;
    cosReduced = tableCos * cosAngle - tableSin * sinAngle;
  } else if (tableIndex < 0) {
    sinReduced = tableCos * sinAngle - tableSin * cosAngle;
    cosReduced = tableCos * cosAngle + tableSin * sinAngle;
  }

  var sinValue = 0.0;
  var cosValue = 0.0;
  if (quadrant == 0) {
    sinValue = sinReduced;
    cosValue = cosReduced;
  } else if (quadrant == 1) {
    sinValue = cosReduced;
    cosValue = -sinReduced;
  } else if (quadrant == -1) {
    sinValue = -cosReduced;
    cosValue = sinReduced;
  } else {
    sinValue = -sinReduced;
    cosValue = -cosReduced;
  }

  return sinValue / cosValue;
}

fn tan_fp32(a: f32) -> f32 {
  return tan_taylor_fp32(a);
}
#else
fn tan_fp32(a: f32) -> f32 {
  return tan(a);
}
#endif
`,vs:`#ifdef LUMA_FP32_TAN_PRECISION_WORKAROUND

// All these functions are for substituting tan() function from Intel GPU only
const float TWO_PI = 6.2831854820251465;
const float PI_2 = 1.5707963705062866;
const float PI_16 = 0.1963495463132858;

const float SIN_TABLE_0 = 0.19509032368659973;
const float SIN_TABLE_1 = 0.3826834261417389;
const float SIN_TABLE_2 = 0.5555702447891235;
const float SIN_TABLE_3 = 0.7071067690849304;

const float COS_TABLE_0 = 0.9807852506637573;
const float COS_TABLE_1 = 0.9238795042037964;
const float COS_TABLE_2 = 0.8314695954322815;
const float COS_TABLE_3 = 0.7071067690849304;

const float INVERSE_FACTORIAL_3 = 1.666666716337204e-01; // 1/3!
const float INVERSE_FACTORIAL_5 = 8.333333767950535e-03; // 1/5!
const float INVERSE_FACTORIAL_7 = 1.9841270113829523e-04; // 1/7!
const float INVERSE_FACTORIAL_9 = 2.75573188446287533e-06; // 1/9!

float sin_taylor_fp32(float a) {
  float r, s, t, x;

  if (a == 0.0) {
    return 0.0;
  }

  x = -a * a;
  s = a;
  r = a;

  r = r * x;
  t = r * INVERSE_FACTORIAL_3;
  s = s + t;

  r = r * x;
  t = r * INVERSE_FACTORIAL_5;
  s = s + t;

  r = r * x;
  t = r * INVERSE_FACTORIAL_7;
  s = s + t;

  r = r * x;
  t = r * INVERSE_FACTORIAL_9;
  s = s + t;

  return s;
}

void sincos_taylor_fp32(float a, out float sin_t, out float cos_t) {
  if (a == 0.0) {
    sin_t = 0.0;
    cos_t = 1.0;
  }
  sin_t = sin_taylor_fp32(a);
  cos_t = sqrt(1.0 - sin_t * sin_t);
}

float tan_taylor_fp32(float a) {
    float sin_a;
    float cos_a;

    if (a == 0.0) {
        return 0.0;
    }

    // 2pi range reduction
    float z = floor(a / TWO_PI);
    float r = a - TWO_PI * z;

    float t;
    float q = floor(r / PI_2 + 0.5);
    int j = int(q);

    if (j < -2 || j > 2) {
        return 1.0 / 0.0;
    }

    t = r - PI_2 * q;

    q = floor(t / PI_16 + 0.5);
    int k = int(q);
    int abs_k = int(abs(float(k)));

    if (abs_k > 4) {
        return 1.0 / 0.0;
    } else {
        t = t - PI_16 * q;
    }

    float u = 0.0;
    float v = 0.0;

    float sin_t, cos_t;
    float s, c;
    sincos_taylor_fp32(t, sin_t, cos_t);

    if (k == 0) {
        s = sin_t;
        c = cos_t;
    } else {
        if (abs(float(abs_k) - 1.0) < 0.5) {
            u = COS_TABLE_0;
            v = SIN_TABLE_0;
        } else if (abs(float(abs_k) - 2.0) < 0.5) {
            u = COS_TABLE_1;
            v = SIN_TABLE_1;
        } else if (abs(float(abs_k) - 3.0) < 0.5) {
            u = COS_TABLE_2;
            v = SIN_TABLE_2;
        } else if (abs(float(abs_k) - 4.0) < 0.5) {
            u = COS_TABLE_3;
            v = SIN_TABLE_3;
        }
        if (k > 0) {
            s = u * sin_t + v * cos_t;
            c = u * cos_t - v * sin_t;
        } else {
            s = u * sin_t - v * cos_t;
            c = u * cos_t + v * sin_t;
        }
    }

    if (j == 0) {
        sin_a = s;
        cos_a = c;
    } else if (j == 1) {
        sin_a = c;
        cos_a = -s;
    } else if (j == -1) {
        sin_a = -c;
        cos_a = s;
    } else {
        sin_a = -s;
        cos_a = -c;
    }
    return sin_a / cos_a;
}
#endif

float tan_fp32(float a) {
#ifdef LUMA_FP32_TAN_PRECISION_WORKAROUND
  return tan_taylor_fp32(a);
#else
  return tan(a);
#endif
}
`},Gf=`
layout(std140) uniform fp64arithmeticUniforms {
  uniform float ONE;
  uniform float SPLIT;
} fp64;

/*
About LUMA_FP64_CODE_ELIMINATION_WORKAROUND

The purpose of this workaround is to prevent shader compilers from
optimizing away necessary arithmetic operations by swapping their sequences
or transform the equation to some 'equivalent' form.

These helpers implement Dekker/Veltkamp-style error tracking. If the compiler
folds constants or reassociates the arithmetic, the high/low split can stop
tracking the rounding error correctly. That failure mode tends to look fine in
simple coordinate setup, but then breaks down inside iterative arithmetic such
as fp64 Mandelbrot loops.

The method is to multiply an artifical variable, ONE, which will be known to
the compiler to be 1 only at runtime. The whole expression is then represented
as a polynomial with respective to ONE. In the coefficients of all terms, only one a
and one b should appear

err = (a + b) * ONE^6 - a * ONE^5 - (a + b) * ONE^4 + a * ONE^3 - b - (a + b) * ONE^2 + a * ONE
*/

float prevent_fp64_optimization(float value) {
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  return value + fp64.ONE * 0.0;
#else
  return value;
#endif
}

// Divide float number to high and low floats to extend fraction bits
vec2 split(float a) {
  // Keep SPLIT as a runtime uniform so the compiler cannot fold the Dekker
  // split into a constant expression and reassociate the recovery steps.
  float split = prevent_fp64_optimization(fp64.SPLIT);
  float t = prevent_fp64_optimization(a * split);
  float temp = t - a;
  float a_hi = t - temp;
  float a_lo = a - a_hi;
  return vec2(a_hi, a_lo);
}

// Divide float number again when high float uses too many fraction bits
vec2 split2(vec2 a) {
  vec2 b = split(a.x);
  b.y += a.y;
  return b;
}

// Special sum operation when a > b
vec2 quickTwoSum(float a, float b) {
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  float sum = (a + b) * fp64.ONE;
  float err = b - (sum - a) * fp64.ONE;
#else
  float sum = a + b;
  float err = b - (sum - a);
#endif
  return vec2(sum, err);
}

// General sum operation
vec2 twoSum(float a, float b) {
  float s = (a + b);
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  float v = (s * fp64.ONE - a) * fp64.ONE;
  float err = (a - (s - v) * fp64.ONE) * fp64.ONE * fp64.ONE * fp64.ONE + (b - v);
#else
  float v = s - a;
  float err = (a - (s - v)) + (b - v);
#endif
  return vec2(s, err);
}

vec2 twoSub(float a, float b) {
  float s = (a - b);
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  float v = (s * fp64.ONE - a) * fp64.ONE;
  float err = (a - (s - v) * fp64.ONE) * fp64.ONE * fp64.ONE * fp64.ONE - (b + v);
#else
  float v = s - a;
  float err = (a - (s - v)) - (b + v);
#endif
  return vec2(s, err);
}

vec2 twoSqr(float a) {
  float prod = a * a;
  vec2 a_fp64 = split(a);
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  float err = ((a_fp64.x * a_fp64.x - prod) * fp64.ONE + 2.0 * a_fp64.x *
    a_fp64.y * fp64.ONE * fp64.ONE) + a_fp64.y * a_fp64.y * fp64.ONE * fp64.ONE * fp64.ONE;
#else
  float err = ((a_fp64.x * a_fp64.x - prod) + 2.0 * a_fp64.x * a_fp64.y) + a_fp64.y * a_fp64.y;
#endif
  return vec2(prod, err);
}

vec2 twoProd(float a, float b) {
  float prod = a * b;
  vec2 a_fp64 = split(a);
  vec2 b_fp64 = split(b);
  // twoProd is especially sensitive because mul_fp64 and div_fp64 both depend
  // on the split terms and cross terms staying in the original evaluation
  // order. If the compiler folds or reassociates them, the low part tends to
  // collapse to zero or NaN on some drivers.
  float highProduct = prevent_fp64_optimization(a_fp64.x * b_fp64.x);
  float crossProduct1 = prevent_fp64_optimization(a_fp64.x * b_fp64.y);
  float crossProduct2 = prevent_fp64_optimization(a_fp64.y * b_fp64.x);
  float lowProduct = prevent_fp64_optimization(a_fp64.y * b_fp64.y);
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  float err1 = (highProduct - prod) * fp64.ONE;
  float err2 = crossProduct1 * fp64.ONE * fp64.ONE;
  float err3 = crossProduct2 * fp64.ONE * fp64.ONE * fp64.ONE;
  float err4 = lowProduct * fp64.ONE * fp64.ONE * fp64.ONE * fp64.ONE;
#else
  float err1 = highProduct - prod;
  float err2 = crossProduct1;
  float err3 = crossProduct2;
  float err4 = lowProduct;
#endif
  float err = ((err1 + err2) + err3) + err4;
  return vec2(prod, err);
}

vec2 sum_fp64(vec2 a, vec2 b) {
  vec2 s, t;
  s = twoSum(a.x, b.x);
  t = twoSum(a.y, b.y);
  s.y += t.x;
  s = quickTwoSum(s.x, s.y);
  s.y += t.y;
  s = quickTwoSum(s.x, s.y);
  return s;
}

vec2 sub_fp64(vec2 a, vec2 b) {
  vec2 s, t;
  s = twoSub(a.x, b.x);
  t = twoSub(a.y, b.y);
  s.y += t.x;
  s = quickTwoSum(s.x, s.y);
  s.y += t.y;
  s = quickTwoSum(s.x, s.y);
  return s;
}

vec2 mul_fp64(vec2 a, vec2 b) {
  vec2 prod = twoProd(a.x, b.x);
  // y component is for the error
  prod.y += a.x * b.y;
#if defined(LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND)
  prod = split2(prod);
#endif
  prod = quickTwoSum(prod.x, prod.y);
  prod.y += a.y * b.x;
#if defined(LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND)
  prod = split2(prod);
#endif
  prod = quickTwoSum(prod.x, prod.y);
  return prod;
}

vec2 div_fp64(vec2 a, vec2 b) {
  float xn = 1.0 / b.x;
#if defined(LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND)
  vec2 yn = mul_fp64(a, vec2(xn, 0));
#else
  vec2 yn = a * xn;
#endif
  float diff = (sub_fp64(a, mul_fp64(b, yn))).x;
  vec2 prod = twoProd(xn, diff);
  return sum_fp64(yn, prod);
}

vec2 sqrt_fp64(vec2 a) {
  if (a.x == 0.0 && a.y == 0.0) return vec2(0.0, 0.0);
  if (a.x < 0.0) return vec2(0.0 / 0.0, 0.0 / 0.0);

  float x = 1.0 / sqrt(a.x);
  float yn = a.x * x;
#if defined(LUMA_FP64_CODE_ELIMINATION_WORKAROUND)
  vec2 yn_sqr = twoSqr(yn) * fp64.ONE;
#else
  vec2 yn_sqr = twoSqr(yn);
#endif
  float diff = sub_fp64(a, yn_sqr).x;
  vec2 prod = twoProd(x * 0.5, diff);
#if defined(LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND)
  return sum_fp64(split(yn), prod);
#else
  return sum_fp64(vec2(yn, 0.0), prod);
#endif
}
`,Nw={name:"fp64arithmetic",source:`struct Fp64ArithmeticUniforms {
  ONE: f32,
  SPLIT: f32,
};

@group(0) @binding(auto) var<uniform> fp64arithmetic : Fp64ArithmeticUniforms;

#ifndef LUMA_FP64_F32_INPUT_ONLY
struct Fp64Bits {
  sign: u32,
  exponent: i32,
  significand: vec2u,
  isZero: bool,
  isInf: bool,
  isNan: bool,
};
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_nan(seed: f32) -> f32 {
  let nanBits = 0x7fc00000u | select(0u, 1u, seed < 0.0);
  return bitcast<f32>(nanBits);
}
#endif

fn fp64_u64_is_zero(value: vec2u) -> bool {
  return value.x == 0u && value.y == 0u;
}

fn fp64_u64_compare(a: vec2u, b: vec2u) -> i32 {
  if (a.x != b.x) {
    return select(-1, 1, a.x > b.x);
  }
  if (a.y != b.y) {
    return select(-1, 1, a.y > b.y);
  }
  return 0;
}

fn fp64_u64_add(a: vec2u, b: vec2u) -> vec2u {
  let low = a.y + b.y;
  let carry = select(0u, 1u, low < a.y);
  return vec2u(a.x + b.x + carry, low);
}

fn fp64_u64_sub(a: vec2u, b: vec2u) -> vec2u {
  let borrow = select(0u, 1u, a.y < b.y);
  return vec2u(a.x - b.x - borrow, a.y - b.y);
}

fn fp64_u64_shift_left(value: vec2u, shift: u32) -> vec2u {
  if (shift == 0u) {
    return value;
  }
  if (shift < 32u) {
    return vec2u((value.x << shift) | (value.y >> (32u - shift)), value.y << shift);
  }
  if (shift == 32u) {
    return vec2u(value.y, 0u);
  }
  if (shift < 64u) {
    return vec2u(value.y << (shift - 32u), 0u);
  }
  return vec2u(0u);
}

fn fp64_u64_shift_right(value: vec2u, shift: u32) -> vec2u {
  if (shift == 0u) {
    return value;
  }
  if (shift < 32u) {
    return vec2u(value.x >> shift, (value.y >> shift) | (value.x << (32u - shift)));
  }
  if (shift == 32u) {
    return vec2u(0u, value.x);
  }
  if (shift < 64u) {
    return vec2u(0u, value.x >> (shift - 32u));
  }
  return vec2u(0u);
}

fn fp64_u64_get_bit(value: vec2u, bitIndex: u32) -> bool {
  if (bitIndex >= 64u) {
    return false;
  }
  if (bitIndex >= 32u) {
    return ((value.x >> (bitIndex - 32u)) & 1u) != 0u;
  }
  return ((value.y >> bitIndex) & 1u) != 0u;
}

fn fp64_u64_has_bits_below(value: vec2u, bitCount: u32) -> bool {
  if (bitCount == 0u) {
    return false;
  }
  if (bitCount >= 64u) {
    return !fp64_u64_is_zero(value);
  }
  if (bitCount > 32u) {
    let highBitCount = bitCount - 32u;
    let highMask = (1u << highBitCount) - 1u;
    return value.y != 0u || (value.x & highMask) != 0u;
  }
  if (bitCount == 32u) {
    return value.y != 0u;
  }
  let lowMask = (1u << bitCount) - 1u;
  return (value.y & lowMask) != 0u;
}

#ifndef LUMA_FP64_F32_INPUT_ONLY
fn fp64_u64_shift_right_sticky(value: vec2u, shift: u32) -> vec2u {
  var shifted = fp64_u64_shift_right(value, shift);
  if (fp64_u64_has_bits_below(value, shift)) {
    shifted.y = shifted.y | 1u;
  }
  return shifted;
}
#endif

fn fp64_u64_count_leading_zeros(value: vec2u) -> u32 {
  if (value.x != 0u) {
    return countLeadingZeros(value.x);
  }
  return 32u + countLeadingZeros(value.y);
}

fn fp64_round_shift_right_to_u32(value: vec2u, shift: u32) -> u32 {
  if (shift == 0u) {
    return value.y;
  }

  let truncated = fp64_u64_shift_right(value, shift);
  var rounded = truncated.y;
  let guard = fp64_u64_get_bit(value, shift - 1u);
  let hasTrailingBits = fp64_u64_has_bits_below(value, shift - 1u);
  if (guard && (hasTrailingBits || (rounded & 1u) == 1u)) {
    rounded = rounded + 1u;
  }
  return rounded;
}

#ifndef LUMA_FP64_F32_INPUT_ONLY
fn fp64_round_shift_right(value: vec2u, shift: u32) -> vec2u {
  if (shift == 0u) {
    return value;
  }

  var rounded = fp64_u64_shift_right(value, shift);
  let guard = fp64_u64_get_bit(value, shift - 1u);
  let hasTrailingBits = fp64_u64_has_bits_below(value, shift - 1u);
  if (guard && (hasTrailingBits || (rounded.y & 1u) == 1u)) {
    rounded = fp64_u64_add(rounded, vec2u(0u, 1u));
  }
  return rounded;
}
#endif

fn fp64_make_f32_bits_from_u64(sign: u32, significand: vec2u, baseExponent: i32) -> u32 {
  if (fp64_u64_is_zero(significand)) {
    return sign << 31u;
  }

  let leadingZeros = fp64_u64_count_leading_zeros(significand);
  let mostSignificantBit = 63u - leadingZeros;
  var exponent = baseExponent + i32(mostSignificantBit);

  if (exponent > 127) {
    return (sign << 31u) | 0x7f800000u;
  }

  if (exponent >= -126) {
    let shift = i32(mostSignificantBit) - 23;
    var significand24: u32;
    if (shift > 0) {
      significand24 = fp64_round_shift_right_to_u32(significand, u32(shift));
    } else {
      significand24 = fp64_u64_shift_left(significand, u32(-shift)).y;
    }

    if (significand24 >= 0x1000000u) {
      significand24 = significand24 >> 1u;
      exponent = exponent + 1;
      if (exponent > 127) {
        return (sign << 31u) | 0x7f800000u;
      }
    }

    return (sign << 31u) | (u32(exponent + 127) << 23u) | (significand24 & 0x7fffffu);
  }

  let scaleExponent = baseExponent + 149;
  var mantissa: u32;
  if (scaleExponent >= 0) {
    mantissa = fp64_u64_shift_left(significand, u32(scaleExponent)).y;
  } else {
    mantissa = fp64_round_shift_right_to_u32(significand, u32(-scaleExponent));
  }

  if (mantissa >= 0x800000u) {
    return (sign << 31u) | 0x00800000u;
  }
  return (sign << 31u) | mantissa;
}

#ifndef LUMA_FP64_F32_INPUT_ONLY
fn fp64_decode_bits(bits: vec2u) -> Fp64Bits {
  let sign = bits.x >> 31u;
  let exponentBits = (bits.x >> 20u) & 0x7ffu;
  let fractionHigh = bits.x & 0xfffffu;
  let fractionLow = bits.y;
  let fraction = vec2u(fractionHigh, fractionLow);

  if (exponentBits == 0x7ffu) {
    let isInf = fp64_u64_is_zero(fraction);
    return Fp64Bits(sign, 0, vec2u(0u), false, isInf, !isInf);
  }

  if (exponentBits == 0u) {
    let isZero = fp64_u64_is_zero(fraction);
    return Fp64Bits(sign, -1022, fraction, isZero, false, false);
  }

  return Fp64Bits(sign, i32(exponentBits) - 1023, vec2u((1u << 20u) | fractionHigh, fractionLow), false, false, false);
}

fn fp64_finite_magnitude_compare(a: Fp64Bits, b: Fp64Bits) -> i32 {
  if (a.exponent != b.exponent) {
    return select(-1, 1, a.exponent > b.exponent);
  }
  return fp64_u64_compare(a.significand, b.significand);
}
#endif

#ifndef LUMA_FP64_F32_INPUT_ONLY
struct Fp64RawF32Bits {
  sign: u32,
  baseExponent: i32,
  significand: u32,
  isZero: bool,
  isInf: bool,
  isNan: bool,
};

// Decode an f32 as (-1)^sign * significand * 2^baseExponent. This shared
// integer representation lets normalization remain independent of the
// selected double-single arithmetic implementation.
fn fp64_decode_raw_f32_bits(bits: u32) -> Fp64RawF32Bits {
  let sign = bits >> 31u;
  let exponentBits = (bits >> 23u) & 0xffu;
  let fraction = bits & 0x7fffffu;

  if (exponentBits == 0xffu) {
    return Fp64RawF32Bits(sign, 0, 0u, false, fraction == 0u, fraction != 0u);
  }
  if (exponentBits == 0u) {
    return Fp64RawF32Bits(sign, -149, fraction, fraction == 0u, false, false);
  }
  return Fp64RawF32Bits(
    sign,
    i32(exponentBits) - 150,
    0x800000u | fraction,
    false,
    false,
    false
  );
}

fn fp64_raw_f32_magnitude_compare(aBits: u32, bBits: u32) -> i32 {
  let aMagnitude = aBits & 0x7fffffffu;
  let bMagnitude = bBits & 0x7fffffffu;
  if (aMagnitude == bMagnitude) {
    return 0;
  }
  return select(-1, 1, aMagnitude > bMagnitude);
}

fn fp64_make_raw_residual_f32_bits(
  exactSign: u32,
  exactMagnitude: vec2u,
  exactBaseExponent: i32,
  highBits: u32
) -> u32 {
  if (fp64_u64_is_zero(exactMagnitude)) {
    return 0u;
  }

  let high = fp64_decode_raw_f32_bits(highBits);
  if (high.isInf || high.isNan) {
    return 0u;
  }
  if (high.isZero) {
    return fp64_make_f32_bits_from_u64(exactSign, exactMagnitude, exactBaseExponent);
  }

  let commonBaseExponent = min(exactBaseExponent, high.baseExponent);
  let exactShift = exactBaseExponent - commonBaseExponent;
  let highShift = high.baseExponent - commonBaseExponent;
  if (exactShift >= 64 || highShift >= 64) {
    return 0u;
  }

  let exactAligned = fp64_u64_shift_left(exactMagnitude, u32(exactShift));
  let highAligned = fp64_u64_shift_left(vec2u(0u, high.significand), u32(highShift));
  let comparison = fp64_u64_compare(exactAligned, highAligned);
  if (comparison == 0) {
    return 0u;
  }

  var residualSign = exactSign;
  var residualMagnitude: vec2u;
  if (comparison > 0) {
    residualMagnitude = fp64_u64_sub(exactAligned, highAligned);
  } else {
    residualSign = exactSign ^ 1u;
    residualMagnitude = fp64_u64_sub(highAligned, exactAligned);
  }
  return fp64_make_f32_bits_from_u64(
    residualSign,
    residualMagnitude,
    commonBaseExponent
  );
}

fn fp64_split_raw_accumulator_bits(
  sign: u32,
  magnitude: vec2u,
  baseExponent: i32
) -> vec2u {
  if (fp64_u64_is_zero(magnitude)) {
    return vec2u(0u);
  }
  let highBits = fp64_make_f32_bits_from_u64(sign, magnitude, baseExponent);
  let rawLowBits = fp64_make_raw_residual_f32_bits(sign, magnitude, baseExponent, highBits);
  let lowBits = select(rawLowBits, 0u, (rawLowBits & 0x7fffffffu) == 0u);
  if ((highBits & 0x7fffffffu) == 0u && (lowBits & 0x7fffffffu) == 0u) {
    return vec2u(0u);
  }
  return vec2u(highBits, lowBits);
}
#endif

#ifndef LUMA_FP64_F32_INPUT_ONLY
// Round an arithmetic accumulator to binary64 before splitting it. The
// aligned add/subtract paths retain three guard bits plus a sticky bit, which
// is sufficient for round-to-nearest-even at the binary64 boundary.
fn fp64_split_binary64_accumulator_bits(
  sign: u32,
  magnitude: vec2u,
  baseExponent: i32
) -> vec2u {
  if (fp64_u64_is_zero(magnitude)) {
    return vec2u(0u);
  }

  let mostSignificantBit = 63u - fp64_u64_count_leading_zeros(magnitude);
  let exponent = baseExponent + i32(mostSignificantBit);
  if (exponent > 1023) {
    return vec2u((sign << 31u) | 0x7f800000u, 0u);
  }

  var roundedMagnitude = magnitude;
  var roundedBaseExponent = baseExponent;
  if (exponent >= -1022) {
    if (mostSignificantBit > 52u) {
      let shift = mostSignificantBit - 52u;
      roundedMagnitude = fp64_round_shift_right(magnitude, shift);
      roundedBaseExponent = baseExponent + i32(shift);
    }
  } else {
    let shift = -1074 - baseExponent;
    if (shift > 0) {
      roundedMagnitude = fp64_round_shift_right(magnitude, u32(shift));
      roundedBaseExponent = -1074;
    }
  }

  if (fp64_u64_is_zero(roundedMagnitude)) {
    return vec2u(0u);
  }
  return fp64_split_raw_accumulator_bits(sign, roundedMagnitude, roundedBaseExponent);
}
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_add_raw_f32_bits(aBits: u32, bBits: u32) -> vec2u {
  let a = fp64_decode_raw_f32_bits(aBits);
  let b = fp64_decode_raw_f32_bits(bBits);

  if (a.isNan || b.isNan) {
    return vec2u(0x7fc00000u, 0u);
  }
  if (a.isInf || b.isInf) {
    if (a.isInf && b.isInf && a.sign != b.sign) {
      return vec2u(0x7fc00000u, 0u);
    }
    return select(vec2u(bBits, 0u), vec2u(aBits, 0u), a.isInf);
  }
  if (a.isZero && b.isZero) {
    return vec2u(0u);
  }
  if (a.isZero) {
    return vec2u(bBits, 0u);
  }
  if (b.isZero) {
    return vec2u(aBits, 0u);
  }

  let exponentDifference = abs(a.baseExponent - b.baseExponent);
  if (exponentDifference > 25) {
    if (fp64_raw_f32_magnitude_compare(aBits, bBits) >= 0) {
      return vec2u(aBits, bBits);
    }
    return vec2u(bBits, aBits);
  }

  let commonBaseExponent = min(a.baseExponent, b.baseExponent);
  let aMagnitude = fp64_u64_shift_left(
    vec2u(0u, a.significand),
    u32(a.baseExponent - commonBaseExponent)
  );
  let bMagnitude = fp64_u64_shift_left(
    vec2u(0u, b.significand),
    u32(b.baseExponent - commonBaseExponent)
  );

  var resultSign = a.sign;
  var resultMagnitude: vec2u;
  if (a.sign == b.sign) {
    resultMagnitude = fp64_u64_add(aMagnitude, bMagnitude);
  } else {
    let comparison = fp64_u64_compare(aMagnitude, bMagnitude);
    if (comparison == 0) {
      return vec2u(0u);
    }
    if (comparison > 0) {
      resultMagnitude = fp64_u64_sub(aMagnitude, bMagnitude);
    } else {
      resultSign = b.sign;
      resultMagnitude = fp64_u64_sub(bMagnitude, aMagnitude);
    }
  }

  return fp64_split_raw_accumulator_bits(
    resultSign,
    resultMagnitude,
    commonBaseExponent
  );
}
#endif

#ifndef LUMA_FP64_F32_INPUT_ONLY
fn fp64_add_aligned_magnitudes_to_fp64_bits(
  sign: u32,
  larger: Fp64Bits,
  smaller: Fp64Bits
) -> vec2u {
  let largeSignificand = fp64_u64_shift_left(larger.significand, 3u);
  let smallSignificand = fp64_u64_shift_right_sticky(
    fp64_u64_shift_left(smaller.significand, 3u),
    u32(larger.exponent - smaller.exponent)
  );
  let resultSignificand = fp64_u64_add(largeSignificand, smallSignificand);
  return fp64_split_binary64_accumulator_bits(
    sign,
    resultSignificand,
    larger.exponent - 55
  );
}

fn fp64_sub_aligned_magnitudes_to_fp64_bits(
  sign: u32,
  larger: Fp64Bits,
  smaller: Fp64Bits
) -> vec2u {
  let largeSignificand = fp64_u64_shift_left(larger.significand, 3u);
  let smallSignificand = fp64_u64_shift_right_sticky(
    fp64_u64_shift_left(smaller.significand, 3u),
    u32(larger.exponent - smaller.exponent)
  );
  let resultSignificand = fp64_u64_sub(largeSignificand, smallSignificand);
  return fp64_split_binary64_accumulator_bits(
    sign,
    resultSignificand,
    larger.exponent - 55
  );
}

fn fp64_add_aligned_magnitudes_to_f32_bits(sign: u32, larger: Fp64Bits, smaller: Fp64Bits) -> u32 {
  let largeSignificand = fp64_u64_shift_left(larger.significand, 3u);
  let smallSignificand = fp64_u64_shift_right_sticky(
    fp64_u64_shift_left(smaller.significand, 3u),
    u32(larger.exponent - smaller.exponent)
  );
  let resultSignificand = fp64_u64_add(largeSignificand, smallSignificand);
  return fp64_make_f32_bits_from_u64(sign, resultSignificand, larger.exponent - 55);
}

fn fp64_sub_aligned_magnitudes_to_f32_bits(sign: u32, larger: Fp64Bits, smaller: Fp64Bits) -> u32 {
  let largeSignificand = fp64_u64_shift_left(larger.significand, 3u);
  let smallSignificand = fp64_u64_shift_right_sticky(
    fp64_u64_shift_left(smaller.significand, 3u),
    u32(larger.exponent - smaller.exponent)
  );
  let resultSignificand = fp64_u64_sub(largeSignificand, smallSignificand);
  return fp64_make_f32_bits_from_u64(sign, resultSignificand, larger.exponent - 55);
}

// Subtract two raw binary64 values and round the exact result once to f32.
// The input words are canonical high/low words: .x contains sign/exponent/high
// fraction bits, and .y contains the low 32 fraction bits.
fn sub_fp64u32_to_f32_bits(aBits: vec2u, bBits: vec2u) -> u32 {
  let a = fp64_decode_bits(aBits);
  let b = fp64_decode_bits(bBits);
  let bSubtractionSign = b.sign ^ 1u;

  if (a.isNan || b.isNan) {
    return 0x7fc00000u;
  }
  if (a.isInf && b.isInf) {
    if (a.sign == bSubtractionSign) {
      return (a.sign << 31u) | 0x7f800000u;
    }
    return 0x7fc00000u;
  }
  if (a.isInf) {
    return (a.sign << 31u) | 0x7f800000u;
  }
  if (b.isInf) {
    return (bSubtractionSign << 31u) | 0x7f800000u;
  }
  if (a.isZero && b.isZero) {
    return select(0u, 0x80000000u, a.sign == 1u && b.sign == 0u);
  }

  let magnitudeComparison = fp64_finite_magnitude_compare(a, b);
  if (a.sign == bSubtractionSign) {
    if (magnitudeComparison >= 0) {
      return fp64_add_aligned_magnitudes_to_f32_bits(a.sign, a, b);
    }
    return fp64_add_aligned_magnitudes_to_f32_bits(a.sign, b, a);
  }

  if (magnitudeComparison == 0) {
    return 0u;
  }
  if (magnitudeComparison > 0) {
    return fp64_sub_aligned_magnitudes_to_f32_bits(a.sign, a, b);
  }
  return fp64_sub_aligned_magnitudes_to_f32_bits(bSubtractionSign, b, a);
}

fn sub_fp64u32_to_f32(aBits: vec2u, bBits: vec2u) -> f32 {
  return bitcast<f32>(sub_fp64u32_to_f32_bits(aBits, bBits));
}

// Subtract two raw binary64 values, round once to binary64, then split the
// result into normalized f32 limbs. Finite results must fit within the f32
// exponent range; larger magnitudes map to infinity and smaller magnitudes
// map to zero. The input words use canonical high/low word order.
fn sub_fp64u32_to_fp64_bits(aBits: vec2u, bBits: vec2u) -> vec2u {
  let a = fp64_decode_bits(aBits);
  let b = fp64_decode_bits(bBits);
  let bSubtractionSign = b.sign ^ 1u;

  if (a.isNan || b.isNan) {
    return vec2u(0x7fc00000u, 0u);
  }
  if (a.isInf && b.isInf) {
    if (a.sign == bSubtractionSign) {
      return vec2u((a.sign << 31u) | 0x7f800000u, 0u);
    }
    return vec2u(0x7fc00000u, 0u);
  }
  if (a.isInf) {
    return vec2u((a.sign << 31u) | 0x7f800000u, 0u);
  }
  if (b.isInf) {
    return vec2u((bSubtractionSign << 31u) | 0x7f800000u, 0u);
  }
  if (a.isZero && b.isZero) {
    return vec2u(0u);
  }

  let magnitudeComparison = fp64_finite_magnitude_compare(a, b);
  if (a.sign == bSubtractionSign) {
    if (magnitudeComparison >= 0) {
      return fp64_add_aligned_magnitudes_to_fp64_bits(a.sign, a, b);
    }
    return fp64_add_aligned_magnitudes_to_fp64_bits(a.sign, b, a);
  }

  if (magnitudeComparison == 0) {
    return vec2u(0u);
  }
  if (magnitudeComparison > 0) {
    return fp64_sub_aligned_magnitudes_to_fp64_bits(a.sign, a, b);
  }
  return fp64_sub_aligned_magnitudes_to_fp64_bits(bSubtractionSign, b, a);
}

fn sub_fp64u32_to_fp64(aBits: vec2u, bBits: vec2u) -> vec2f {
  let resultBits = sub_fp64u32_to_fp64_bits(aBits, bBits);
  return vec2f(bitcast<f32>(resultBits.x), bitcast<f32>(resultBits.y));
}
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_runtime_zero() -> f32 {
  return fp64arithmetic.ONE * 0.0;
}

fn prevent_fp64_optimization(value: f32) -> f32 {
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  return value + fp64_runtime_zero();
#else
  return value;
#endif
}
#endif

#ifdef LUMA_FP64_INTEGER_ARITHMETIC
struct Fp64F32Bits {
  sign: u32,
  baseExponent: i32,
  significand: u32,
  isZero: bool,
  isInf: bool,
  isNan: bool,
};

// Decode an f32 as (-1)^sign * significand * 2^baseExponent.
fn fp64_decode_f32_bits(bits: u32) -> Fp64F32Bits {
  let sign = bits >> 31u;
  let exponentBits = (bits >> 23u) & 0xffu;
  let fraction = bits & 0x7fffffu;

  if (exponentBits == 0xffu) {
    return Fp64F32Bits(sign, 0, 0u, false, fraction == 0u, fraction != 0u);
  }
  if (exponentBits == 0u) {
    return Fp64F32Bits(sign, -149, fraction, fraction == 0u, false, false);
  }
  return Fp64F32Bits(sign, i32(exponentBits) - 150, 0x800000u | fraction, false, false, false);
}

fn fp64_f32_magnitude_compare(aBits: u32, bBits: u32) -> i32 {
  let aMagnitude = aBits & 0x7fffffffu;
  let bMagnitude = bBits & 0x7fffffffu;
  if (aMagnitude == bMagnitude) {
    return 0;
  }
  return select(-1, 1, aMagnitude > bMagnitude);
}

fn fp64_make_residual_f32_bits(
  exactSign: u32,
  exactMagnitude: vec2u,
  exactBaseExponent: i32,
  highBits: u32
) -> u32 {
  if (fp64_u64_is_zero(exactMagnitude)) {
    return 0u;
  }

  let high = fp64_decode_f32_bits(highBits);
  if (high.isInf || high.isNan) {
    return exactSign << 31u;
  }
  if (high.isZero) {
    return fp64_make_f32_bits_from_u64(exactSign, exactMagnitude, exactBaseExponent);
  }

  let commonBaseExponent = min(exactBaseExponent, high.baseExponent);
  let exactShift = exactBaseExponent - commonBaseExponent;
  let highShift = high.baseExponent - commonBaseExponent;

  // A normal two-sum/two-product residual never needs a shift this large.
  // This guard gives deterministic underflow behavior outside that contract.
  if (exactShift >= 64 || highShift >= 64) {
    return exactSign << 31u;
  }

  let exactAligned = fp64_u64_shift_left(exactMagnitude, u32(exactShift));
  let highAligned = fp64_u64_shift_left(vec2u(0u, high.significand), u32(highShift));
  let comparison = fp64_u64_compare(exactAligned, highAligned);
  if (comparison == 0) {
    return 0u;
  }

  var residualSign = exactSign;
  var residualMagnitude: vec2u;
  if (comparison > 0) {
    residualMagnitude = fp64_u64_sub(exactAligned, highAligned);
  } else {
    residualSign = exactSign ^ 1u;
    residualMagnitude = fp64_u64_sub(highAligned, exactAligned);
  }
  return fp64_make_f32_bits_from_u64(
    residualSign,
    residualMagnitude,
    commonBaseExponent
  );
}

fn fp64_split_accumulator_bits(
  sign: u32,
  magnitude: vec2u,
  baseExponent: i32
) -> vec2u {
  let highBits = fp64_make_f32_bits_from_u64(sign, magnitude, baseExponent);
  let lowBits = fp64_make_residual_f32_bits(sign, magnitude, baseExponent, highBits);
  return vec2u(highBits, lowBits);
}

fn fp64_two_sum_integer_bits(aBits: u32, bBits: u32) -> vec2u {
  let a = fp64_decode_f32_bits(aBits);
  let b = fp64_decode_f32_bits(bBits);

  if (a.isNan || b.isNan) {
    return vec2u(0x7fc00000u, 0u);
  }
  if (a.isInf || b.isInf) {
    if (a.isInf && b.isInf && a.sign != b.sign) {
      return vec2u(0x7fc00000u, 0u);
    }
    return select(vec2u(bBits, 0u), vec2u(aBits, 0u), a.isInf);
  }
  if (a.isZero && b.isZero) {
    return vec2u((a.sign & b.sign) << 31u, 0u);
  }
  if (a.isZero) {
    return vec2u(bBits, 0u);
  }
  if (b.isZero) {
    return vec2u(aBits, 0u);
  }

  let exponentDifference = select(
    b.baseExponent - a.baseExponent,
    a.baseExponent - b.baseExponent,
    a.baseExponent >= b.baseExponent
  );

  // Beyond half an ulp, rounding cannot change the larger operand. Returning
  // the smaller operand intact also avoids an unbounded integer alignment.
  // At a power-of-two boundary the spacing below the larger operand is half
  // the spacing above it, so an opposite-sign gap-25 operand can still change
  // the rounded high limb. Gap 26 is the first universally safe early-out.
  if (exponentDifference > 25) {
    if (fp64_f32_magnitude_compare(aBits, bBits) >= 0) {
      return vec2u(aBits, bBits);
    }
    return vec2u(bBits, aBits);
  }

  let commonBaseExponent = min(a.baseExponent, b.baseExponent);
  let aMagnitude = fp64_u64_shift_left(
    vec2u(0u, a.significand),
    u32(a.baseExponent - commonBaseExponent)
  );
  let bMagnitude = fp64_u64_shift_left(
    vec2u(0u, b.significand),
    u32(b.baseExponent - commonBaseExponent)
  );

  var resultSign = a.sign;
  var resultMagnitude: vec2u;
  if (a.sign == b.sign) {
    resultMagnitude = fp64_u64_add(aMagnitude, bMagnitude);
  } else {
    let comparison = fp64_u64_compare(aMagnitude, bMagnitude);
    if (comparison == 0) {
      return vec2u(0u, 0u);
    }
    if (comparison > 0) {
      resultMagnitude = fp64_u64_sub(aMagnitude, bMagnitude);
    } else {
      resultSign = b.sign;
      resultMagnitude = fp64_u64_sub(bMagnitude, aMagnitude);
    }
  }

  return fp64_split_accumulator_bits(resultSign, resultMagnitude, commonBaseExponent);
}

fn fp64_two_sum_integer(a: f32, b: f32) -> vec2f {
  let resultBits = fp64_two_sum_integer_bits(bitcast<u32>(a), bitcast<u32>(b));
  return vec2f(bitcast<f32>(resultBits.x), bitcast<f32>(resultBits.y));
}

fn fp64_multiply_significands(a: u32, b: u32) -> vec2u {
  let aLow = a & 0xffffu;
  let aHigh = a >> 16u;
  let bLow = b & 0xffffu;
  let bHigh = b >> 16u;
  let lowProduct = aLow * bLow;
  let crossProduct = aLow * bHigh + aHigh * bLow;
  let highProduct = aHigh * bHigh;

  var result = vec2u(0u, lowProduct);
  result = fp64_u64_add(
    result,
    fp64_u64_shift_left(vec2u(0u, crossProduct), 16u)
  );
  result = fp64_u64_add(result, vec2u(highProduct, 0u));
  return result;
}

fn fp64_two_prod_integer_bits(aBits: u32, bBits: u32) -> vec2u {
  let a = fp64_decode_f32_bits(aBits);
  let b = fp64_decode_f32_bits(bBits);
  let resultSign = a.sign ^ b.sign;

  if (a.isNan || b.isNan || ((a.isZero || b.isZero) && (a.isInf || b.isInf))) {
    return vec2u(0x7fc00000u, 0u);
  }
  if (a.isInf || b.isInf) {
    return vec2u((resultSign << 31u) | 0x7f800000u, resultSign << 31u);
  }
  if (a.isZero || b.isZero) {
    return vec2u(resultSign << 31u, resultSign << 31u);
  }

  let magnitude = fp64_multiply_significands(a.significand, b.significand);
  return fp64_split_accumulator_bits(
    resultSign,
    magnitude,
    a.baseExponent + b.baseExponent
  );
}

fn fp64_two_prod_integer(a: f32, b: f32) -> vec2f {
  let resultBits = fp64_two_prod_integer_bits(bitcast<u32>(a), bitcast<u32>(b));
  return vec2f(bitcast<f32>(resultBits.x), bitcast<f32>(resultBits.y));
}

fn fp64_round_add_integer(a: f32, b: f32) -> f32 {
  return fp64_two_sum_integer(a, b).x;
}

fn fp64_round_mul_integer(a: f32, b: f32) -> f32 {
  return fp64_two_prod_integer(a, b).x;
}

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_f32_finite_exponent(value: Fp64F32Bits) -> i32 {
  let mostSignificantBit = 31u - countLeadingZeros(value.significand);
  return value.baseExponent + i32(mostSignificantBit);
}

fn fp64_scale_f32_integer(value: f32, exponent: i32) -> f32 {
  let decoded = fp64_decode_f32_bits(bitcast<u32>(value));
  if (decoded.isZero || decoded.isInf || decoded.isNan) {
    return value;
  }
  let resultBits = fp64_make_f32_bits_from_u64(
    decoded.sign,
    vec2u(0u, decoded.significand),
    decoded.baseExponent + exponent
  );
  return bitcast<f32>(resultBits);
}

// Divide normalized significands so the hardware operation cannot overflow,
// underflow, or flush a subnormal result. Reapply the exponent with integer
// packing, which also produces subnormal correction limbs without relying on
// floating-point arithmetic to preserve them.
fn fp64_divide_f32_integer(aValue: f32, bValue: f32) -> f32 {
  let a = fp64_decode_f32_bits(bitcast<u32>(aValue));
  let b = fp64_decode_f32_bits(bitcast<u32>(bValue));
  if (a.isZero || b.isZero || a.isInf || b.isInf || a.isNan || b.isNan) {
    return aValue / bValue;
  }

  let aMostSignificantBit = 31u - countLeadingZeros(a.significand);
  let bMostSignificantBit = 31u - countLeadingZeros(b.significand);
  let normalizedABits = fp64_make_f32_bits_from_u64(
    a.sign,
    vec2u(0u, a.significand),
    -i32(aMostSignificantBit)
  );
  let normalizedBBits = fp64_make_f32_bits_from_u64(
    b.sign,
    vec2u(0u, b.significand),
    -i32(bMostSignificantBit)
  );
  let normalizedQuotient = bitcast<f32>(normalizedABits) / bitcast<f32>(normalizedBBits);
  let quotient = fp64_decode_f32_bits(bitcast<u32>(normalizedQuotient));
  let exponentShift =
    a.baseExponent + i32(aMostSignificantBit) -
    b.baseExponent - i32(bMostSignificantBit);
  let quotientBits = fp64_make_f32_bits_from_u64(
    quotient.sign,
    vec2u(0u, quotient.significand),
    quotient.baseExponent + exponentShift
  );
  return bitcast<f32>(quotientBits);
}
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn split(a: f32) -> vec2f {
  let aBits = bitcast<u32>(a);
  let decoded = fp64_decode_f32_bits(aBits);
  if (decoded.isZero || decoded.isInf || decoded.isNan) {
    return vec2f(a, 0.0);
  }

  var roundedHigh = decoded.significand >> 12u;
  let remainder = decoded.significand & 0xfffu;
  if (remainder > 0x800u || (remainder == 0x800u && (roundedHigh & 1u) == 1u)) {
    roundedHigh = roundedHigh + 1u;
  }
  var highMagnitude = vec2u(0u, roundedHigh << 12u);
  var highBits = fp64_make_f32_bits_from_u64(
    decoded.sign,
    highMagnitude,
    decoded.baseExponent
  );
  // Rounding the high limb of a maximum-exponent value can overflow even
  // though the original value is finite. Truncate only in that boundary case
  // so split remains an exact finite decomposition.
  if (fp64_decode_f32_bits(highBits).isInf) {
    roundedHigh = decoded.significand >> 12u;
    highMagnitude = vec2u(0u, roundedHigh << 12u);
    highBits = fp64_make_f32_bits_from_u64(
      decoded.sign,
      highMagnitude,
      decoded.baseExponent
    );
  }
  let lowBits = fp64_make_residual_f32_bits(
    decoded.sign,
    vec2u(0u, decoded.significand),
    decoded.baseExponent,
    highBits
  );
  return vec2f(bitcast<f32>(highBits), bitcast<f32>(lowBits));
}

fn split2(a: vec2f) -> vec2f {
  var result = split(a.x);
  result.y = fp64_round_add_integer(result.y, a.y);
  return result;
}
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn quickTwoSum(a: f32, b: f32) -> vec2f {
  return fp64_two_sum_integer(a, b);
}
#endif

fn twoSum(a: f32, b: f32) -> vec2f {
  return fp64_two_sum_integer(a, b);
}

fn twoSub(a: f32, b: f32) -> vec2f {
  let bBits = bitcast<u32>(b) ^ 0x80000000u;
  let resultBits = fp64_two_sum_integer_bits(bitcast<u32>(a), bBits);
  return vec2f(bitcast<f32>(resultBits.x), bitcast<f32>(resultBits.y));
}

#ifndef LUMA_FP64_PREDICATE_ONLY
fn twoSqr(a: f32) -> vec2f {
  return fp64_two_prod_integer(a, a);
}

fn twoProd(a: f32, b: f32) -> vec2f {
  return fp64_two_prod_integer(a, b);
}
#endif

fn sum_fp64(a: vec2f, b: vec2f) -> vec2f {
  var sum = fp64_two_sum_integer(a.x, b.x);
  let lowSum = fp64_two_sum_integer(a.y, b.y);
  sum.y = fp64_round_add_integer(sum.y, lowSum.x);
  sum = fp64_two_sum_integer(sum.x, sum.y);
  sum.y = fp64_round_add_integer(sum.y, lowSum.y);
  return fp64_two_sum_integer(sum.x, sum.y);
}

fn sub_fp64(a: vec2f, b: vec2f) -> vec2f {
  let negatedB = vec2f(
    bitcast<f32>(bitcast<u32>(b.x) ^ 0x80000000u),
    bitcast<f32>(bitcast<u32>(b.y) ^ 0x80000000u)
  );
  return sum_fp64(a, negatedB);
}

fn mul_fp64(a: vec2f, b: vec2f) -> vec2f {
  var product = fp64_two_prod_integer(a.x, b.x);
  let crossProduct1 = fp64_round_mul_integer(a.x, b.y);
  product.y = fp64_round_add_integer(product.y, crossProduct1);
  product = fp64_two_sum_integer(product.x, product.y);
  let crossProduct2 = fp64_round_mul_integer(a.y, b.x);
  product.y = fp64_round_add_integer(product.y, crossProduct2);
  return fp64_two_sum_integer(product.x, product.y);
}

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_scale_fp64_integer(value: vec2f, exponent: i32) -> vec2f {
  let high = fp64_scale_f32_integer(value.x, exponent);
  let low = fp64_scale_f32_integer(value.y, exponent);
  return sum_fp64(vec2f(high, 0.0), vec2f(low, 0.0));
}

fn fp64_div_fp64_normalized(a: vec2f, b: vec2f) -> vec2f {
  let quotientHigh = fp64_divide_f32_integer(a.x, b.x);
  var quotient = vec2f(quotientHigh, 0.0);

  let remainder = sub_fp64(a, mul_fp64(b, quotient));
  let quotientLow = fp64_divide_f32_integer(remainder.x, b.x);
  quotient = sum_fp64(quotient, vec2f(quotientLow, 0.0));

  let secondRemainder = sub_fp64(a, mul_fp64(b, quotient));
  let correction = fp64_divide_f32_integer(secondRemainder.x, b.x);
  return sum_fp64(quotient, vec2f(correction, 0.0));
}

fn div_fp64(a: vec2f, b: vec2f) -> vec2f {
  let decodedA = fp64_decode_f32_bits(bitcast<u32>(a.x));
  let decodedB = fp64_decode_f32_bits(bitcast<u32>(b.x));
  if (
    decodedA.isZero || decodedB.isZero ||
    decodedA.isInf || decodedB.isInf ||
    decodedA.isNan || decodedB.isNan
  ) {
    return fp64_div_fp64_normalized(a, b);
  }

  let exponentA = fp64_f32_finite_exponent(decodedA);
  let exponentB = fp64_f32_finite_exponent(decodedB);
  // Correct the quotient near unity so b * q and the remainder stay clear of
  // both f32 underflow and overflow. The exponent difference is applied once.
  let normalizedA = fp64_scale_fp64_integer(a, -exponentA);
  let normalizedB = fp64_scale_fp64_integer(b, -exponentB);
  let normalizedQuotient = fp64_div_fp64_normalized(normalizedA, normalizedB);
  return fp64_scale_fp64_integer(normalizedQuotient, exponentA - exponentB);
}

fn fp64_sqrt_fp64_normalized(a: vec2f) -> vec2f {
  let estimate = sqrt(a.x);
  let difference = sub_fp64(a, fp64_two_prod_integer(estimate, estimate)).x;
  let denominator = fp64_round_add_integer(estimate, estimate);
  let correction = fp64_divide_f32_integer(difference, denominator);
  return sum_fp64(vec2f(estimate, 0.0), vec2f(correction, 0.0));
}

fn sqrt_fp64(a: vec2f) -> vec2f {
  let decoded = fp64_decode_f32_bits(bitcast<u32>(a.x));
  let decodedLow = fp64_decode_f32_bits(bitcast<u32>(a.y));
  if (decoded.isZero && decodedLow.isZero) {
    return vec2f(0.0, 0.0);
  }
  if (decoded.sign == 1u) {
    let nanValue = fp64_nan(a.x);
    return vec2f(nanValue, nanValue);
  }

  if (decoded.isInf || decoded.isNan) {
    return fp64_sqrt_fp64_normalized(a);
  }
  let exponent = fp64_f32_finite_exponent(decoded);
  // An even scale lets the final square-root rescale use an integer exponent.
  let evenExponent = exponent - (exponent & 1);
  let normalizedA = fp64_scale_fp64_integer(a, -evenExponent);
  let normalizedRoot = fp64_sqrt_fp64_normalized(normalizedA);
  return fp64_scale_fp64_integer(normalizedRoot, evenExponent / 2);
}
#endif

#else
fn split(a: f32) -> vec2f {
  let splitValue = prevent_fp64_optimization(fp64arithmetic.SPLIT + fp64_runtime_zero());
  let t = prevent_fp64_optimization(a * splitValue);
  let temp = prevent_fp64_optimization(t - a);
  let aHi = prevent_fp64_optimization(t - temp);
  let aLo = prevent_fp64_optimization(a - aHi);
  return vec2f(aHi, aLo);
}

fn split2(a: vec2f) -> vec2f {
  var b = split(a.x);
  b.y = b.y + a.y;
  return b;
}

fn quickTwoSum(a: f32, b: f32) -> vec2f {
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let sum = prevent_fp64_optimization((a + b) * fp64arithmetic.ONE);
  let err = prevent_fp64_optimization(b - (sum - a) * fp64arithmetic.ONE);
#else
  let sum = prevent_fp64_optimization(a + b);
  let err = prevent_fp64_optimization(b - (sum - a));
#endif
  return vec2f(sum, err);
}

fn twoSum(a: f32, b: f32) -> vec2f {
  let s = prevent_fp64_optimization(a + b);
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let v = prevent_fp64_optimization((s * fp64arithmetic.ONE - a) * fp64arithmetic.ONE);
  let err =
    prevent_fp64_optimization((a - (s - v) * fp64arithmetic.ONE) *
      fp64arithmetic.ONE *
      fp64arithmetic.ONE *
      fp64arithmetic.ONE) +
    prevent_fp64_optimization(b - v);
#else
  let v = prevent_fp64_optimization(s - a);
  let err = prevent_fp64_optimization(a - (s - v)) + prevent_fp64_optimization(b - v);
#endif
  return vec2f(s, err);
}

fn twoSub(a: f32, b: f32) -> vec2f {
  let s = prevent_fp64_optimization(a - b);
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let v = prevent_fp64_optimization((s * fp64arithmetic.ONE - a) * fp64arithmetic.ONE);
  let err =
    prevent_fp64_optimization((a - (s - v) * fp64arithmetic.ONE) *
      fp64arithmetic.ONE *
      fp64arithmetic.ONE *
      fp64arithmetic.ONE) -
    prevent_fp64_optimization(b + v);
#else
  let v = prevent_fp64_optimization(s - a);
  let err = prevent_fp64_optimization(a - (s - v)) - prevent_fp64_optimization(b + v);
#endif
  return vec2f(s, err);
}

fn twoSqr(a: f32) -> vec2f {
  let prod = prevent_fp64_optimization(a * a);
  let aFp64 = split(a);
  let highProduct = prevent_fp64_optimization(aFp64.x * aFp64.x);
  let crossProduct = prevent_fp64_optimization(2.0 * aFp64.x * aFp64.y);
  let lowProduct = prevent_fp64_optimization(aFp64.y * aFp64.y);
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let err =
    (prevent_fp64_optimization(highProduct - prod) * fp64arithmetic.ONE +
      crossProduct * fp64arithmetic.ONE * fp64arithmetic.ONE) +
    lowProduct * fp64arithmetic.ONE * fp64arithmetic.ONE * fp64arithmetic.ONE;
#else
  let err = ((prevent_fp64_optimization(highProduct - prod) + crossProduct) + lowProduct);
#endif
  return vec2f(prod, err);
}

fn twoProd(a: f32, b: f32) -> vec2f {
  let prod = prevent_fp64_optimization(a * b);
  let aFp64 = split(a);
  let bFp64 = split(b);
  let highProduct = prevent_fp64_optimization(aFp64.x * bFp64.x);
  let crossProduct1 = prevent_fp64_optimization(aFp64.x * bFp64.y);
  let crossProduct2 = prevent_fp64_optimization(aFp64.y * bFp64.x);
  let lowProduct = prevent_fp64_optimization(aFp64.y * bFp64.y);
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let err1 = (highProduct - prod) * fp64arithmetic.ONE;
  let err2 = crossProduct1 * fp64arithmetic.ONE * fp64arithmetic.ONE;
  let err3 = crossProduct2 * fp64arithmetic.ONE * fp64arithmetic.ONE * fp64arithmetic.ONE;
  let err4 =
    lowProduct *
    fp64arithmetic.ONE *
    fp64arithmetic.ONE *
    fp64arithmetic.ONE *
    fp64arithmetic.ONE;
#else
  let err1 = highProduct - prod;
  let err2 = crossProduct1;
  let err3 = crossProduct2;
  let err4 = lowProduct;
#endif
  let err12InputA = prevent_fp64_optimization(err1);
  let err12InputB = prevent_fp64_optimization(err2);
  let err12 = prevent_fp64_optimization(err12InputA + err12InputB);
  let err123InputA = prevent_fp64_optimization(err12);
  let err123InputB = prevent_fp64_optimization(err3);
  let err123 = prevent_fp64_optimization(err123InputA + err123InputB);
  let err1234InputA = prevent_fp64_optimization(err123);
  let err1234InputB = prevent_fp64_optimization(err4);
  let err = prevent_fp64_optimization(err1234InputA + err1234InputB);
  return vec2f(prod, err);
}

fn sum_fp64(a: vec2f, b: vec2f) -> vec2f {
  var s = twoSum(a.x, b.x);
  let t = twoSum(a.y, b.y);
  s.y = prevent_fp64_optimization(s.y + t.x);
  s = quickTwoSum(s.x, s.y);
  s.y = prevent_fp64_optimization(s.y + t.y);
  s = quickTwoSum(s.x, s.y);
  return s;
}

fn sub_fp64(a: vec2f, b: vec2f) -> vec2f {
  var s = twoSub(a.x, b.x);
  let t = twoSub(a.y, b.y);
  s.y = prevent_fp64_optimization(s.y + t.x);
  s = quickTwoSum(s.x, s.y);
  s.y = prevent_fp64_optimization(s.y + t.y);
  s = quickTwoSum(s.x, s.y);
  return s;
}

fn mul_fp64(a: vec2f, b: vec2f) -> vec2f {
  var prod = twoProd(a.x, b.x);
  let crossProduct1 = prevent_fp64_optimization(a.x * b.y);
  prod.y = prevent_fp64_optimization(prod.y + crossProduct1);
#ifdef LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND
  prod = split2(prod);
#endif
  prod = quickTwoSum(prod.x, prod.y);
  let crossProduct2 = prevent_fp64_optimization(a.y * b.x);
  prod.y = prevent_fp64_optimization(prod.y + crossProduct2);
#ifdef LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND
  prod = split2(prod);
#endif
  prod = quickTwoSum(prod.x, prod.y);
  return prod;
}

#ifndef LUMA_FP64_PREDICATE_ONLY
fn div_fp64(a: vec2f, b: vec2f) -> vec2f {
  let xn = prevent_fp64_optimization(1.0 / b.x);
  let yn = mul_fp64(a, vec2f(xn, fp64_runtime_zero()));
  let diff = prevent_fp64_optimization(sub_fp64(a, mul_fp64(b, yn)).x);
  let prod = twoProd(xn, diff);
  return sum_fp64(yn, prod);
}

fn sqrt_fp64(a: vec2f) -> vec2f {
  if (a.x == 0.0 && a.y == 0.0) {
    return vec2f(0.0, 0.0);
  }
  if (a.x < 0.0) {
    let nanValue = fp64_nan(a.x);
    return vec2f(nanValue, nanValue);
  }

  let x = prevent_fp64_optimization(1.0 / sqrt(a.x));
  let yn = prevent_fp64_optimization(a.x * x);
#ifdef LUMA_FP64_CODE_ELIMINATION_WORKAROUND
  let ynSqr = twoSqr(yn) * fp64arithmetic.ONE;
#else
  let ynSqr = twoSqr(yn);
#endif
  let diff = prevent_fp64_optimization(sub_fp64(a, ynSqr).x);
  let prod = twoProd(prevent_fp64_optimization(x * 0.5), diff);
#ifdef LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND
  return sum_fp64(split(yn), prod);
#else
  return sum_fp64(vec2f(yn, 0.0), prod);
#endif
}
#endif
#endif

#ifndef LUMA_FP64_PREDICATE_ONLY
fn fp64_f32_bits_is_nan(bits: u32) -> bool {
  return (bits & 0x7fffffffu) > 0x7f800000u;
}

fn fp64_f32_bits_is_inf(bits: u32) -> bool {
  return (bits & 0x7fffffffu) == 0x7f800000u;
}

fn fp64_compare_f32_bits(aBits: u32, bBits: u32) -> i32 {
  let aMagnitude = aBits & 0x7fffffffu;
  let bMagnitude = bBits & 0x7fffffffu;
  if (aMagnitude == 0u && bMagnitude == 0u) {
    return 0;
  }
  let aSign = aBits >> 31u;
  let bSign = bBits >> 31u;
  if (aSign != bSign) {
    return select(1, -1, aSign == 1u);
  }
  if (aMagnitude == bMagnitude) {
    return 0;
  }
  let magnitudeComparison = select(-1, 1, aMagnitude > bMagnitude);
  return select(magnitudeComparison, -magnitudeComparison, aSign == 1u);
}

// Normalize an arbitrary pair of finite f32 limbs with integer accumulation.
// This is independent of LUMA_FP64_INTEGER_ARITHMETIC and canonicalizes every
// representation of zero to vec2f(+0.0, +0.0).
fn normalize_fp64(value: vec2f) -> vec2f {
  let resultBits = fp64_add_raw_f32_bits(bitcast<u32>(value.x), bitcast<u32>(value.y));
  return vec2f(bitcast<f32>(resultBits.x), bitcast<f32>(resultBits.y));
}

fn is_nan_fp64(value: vec2f) -> bool {
  let normalized = normalize_fp64(value);
  return fp64_f32_bits_is_nan(bitcast<u32>(normalized.x)) ||
    fp64_f32_bits_is_nan(bitcast<u32>(normalized.y));
}

fn is_finite_fp64(value: vec2f) -> bool {
  let normalized = normalize_fp64(value);
  let highBits = bitcast<u32>(normalized.x);
  let lowBits = bitcast<u32>(normalized.y);
  return !fp64_f32_bits_is_nan(highBits) && !fp64_f32_bits_is_nan(lowBits) &&
    !fp64_f32_bits_is_inf(highBits) && !fp64_f32_bits_is_inf(lowBits);
}

// Returns -1, 0, or 1. NaN is unordered and returns 0; call is_nan_fp64 or
// is_finite_fp64 first when 0 must mean a finite zero.
fn sign_fp64(value: vec2f) -> i32 {
  let normalized = normalize_fp64(value);
  let highBits = bitcast<u32>(normalized.x);
  let lowBits = bitcast<u32>(normalized.y);
  if (fp64_f32_bits_is_nan(highBits) || fp64_f32_bits_is_nan(lowBits)) {
    return 0;
  }
  if ((highBits & 0x7fffffffu) != 0u) {
    return select(1, -1, (highBits >> 31u) == 1u);
  }
  if ((lowBits & 0x7fffffffu) != 0u) {
    return select(1, -1, (lowBits >> 31u) == 1u);
  }
  return 0;
}

// Compares double-single values and returns -1, 0, or 1. NaN is unordered
// and returns 0; callers that require equality semantics must first check
// is_nan_fp64 or is_finite_fp64.
fn compare_fp64(a: vec2f, b: vec2f) -> i32 {
  let normalizedA = normalize_fp64(a);
  let normalizedB = normalize_fp64(b);
  let aHighBits = bitcast<u32>(normalizedA.x);
  let aLowBits = bitcast<u32>(normalizedA.y);
  let bHighBits = bitcast<u32>(normalizedB.x);
  let bLowBits = bitcast<u32>(normalizedB.y);
  if (fp64_f32_bits_is_nan(aHighBits) || fp64_f32_bits_is_nan(aLowBits) ||
      fp64_f32_bits_is_nan(bHighBits) || fp64_f32_bits_is_nan(bLowBits)) {
    return 0;
  }
  let highComparison = fp64_compare_f32_bits(aHighBits, bHighBits);
  if (highComparison != 0) {
    return highComparison;
  }
  return fp64_compare_f32_bits(aLowBits, bLowBits);
}
#endif
`,fs:Gf,vs:Gf,defaultUniforms:{ONE:1,SPLIT:4097},uniformTypes:{ONE:"f32",SPLIT:"f32"},fp64ify:zf,fp64LowPart:kw,fp64ifyMatrix4:Dw},zw={useByteColors:"f32"},Uw={useByteColors:!0},Vf=Gw("floatColors"),$w=Vw("floatColors");function Gw(i){return`layout(std140) uniform ${i}Uniforms {
  float useByteColors;
} ${i};

vec3 ${i}_normalize(vec3 inputColor) {
  return ${i}.useByteColors > 0.5 ? inputColor / 255.0 : inputColor;
}

vec4 ${i}_normalize(vec4 inputColor) {
  return ${i}.useByteColors > 0.5 ? inputColor / 255.0 : inputColor;
}

vec4 ${i}_premultiplyAlpha(vec4 inputColor) {
  return vec4(inputColor.rgb * inputColor.a, inputColor.a);
}

vec4 ${i}_unpremultiplyAlpha(vec4 inputColor) {
  return inputColor.a > 0.0 ? vec4(inputColor.rgb / inputColor.a, inputColor.a) : vec4(0.0);
}

vec4 ${i}_premultiply_alpha(vec4 inputColor) {
  return ${i}_premultiplyAlpha(inputColor);
}

vec4 ${i}_unpremultiply_alpha(vec4 inputColor) {
  return ${i}_unpremultiplyAlpha(inputColor);
}
`}function Vw(i){return`struct ${i}Uniforms {
  useByteColors: f32
};

@group(0) @binding(auto) var<uniform> ${i} : ${i}Uniforms;

fn ${i}_normalize(inputColor: vec3<f32>) -> vec3<f32> {
  return select(inputColor, inputColor / 255.0, ${i}.useByteColors > 0.5);
}

fn ${i}_normalize4(inputColor: vec4<f32>) -> vec4<f32> {
  return select(inputColor, inputColor / 255.0, ${i}.useByteColors > 0.5);
}

fn ${i}_premultiplyAlpha(inputColor: vec4<f32>) -> vec4<f32> {
  return vec4<f32>(inputColor.rgb * inputColor.a, inputColor.a);
}

fn ${i}_unpremultiplyAlpha(inputColor: vec4<f32>) -> vec4<f32> {
  return select(
    vec4<f32>(0.0),
    vec4<f32>(inputColor.rgb / inputColor.a, inputColor.a),
    inputColor.a > 0.0
  );
}

fn ${i}_premultiply_alpha(inputColor: vec4<f32>) -> vec4<f32> {
  return ${i}_premultiplyAlpha(inputColor);
}

fn ${i}_unpremultiply_alpha(inputColor: vec4<f32>) -> vec4<f32> {
  return ${i}_unpremultiplyAlpha(inputColor);
}
`}const jf={name:"floatColors",props:{},uniforms:{},vs:Vf,fs:Vf,source:$w,uniformTypes:zw,defaultUniforms:Uw},Wt={props:{},uniforms:{},name:"picking",uniformTypes:{isActive:"f32",isAttribute:"f32",isHighlightActive:"f32",useByteColors:"f32",highlightedObjectColor:"vec3<f32>",highlightColor:"vec4<f32>"},defaultUniforms:{isActive:!1,isAttribute:!1,isHighlightActive:!1,useByteColors:!0,highlightedObjectColor:[0,0,0],highlightColor:[0,1,1,1]},vs:`layout(std140) uniform pickingUniforms {
  float isActive;
  float isAttribute;
  float isHighlightActive;
  float useByteColors;
  vec3 highlightedObjectColor;
  vec4 highlightColor;
} picking;

out vec4 picking_vRGBcolor_Avalid;

// Normalize unsigned byte color to 0-1 range
vec3 picking_normalizeColor(vec3 color) {
  return picking.useByteColors > 0.5 ? color / 255.0 : color;
}

// Normalize unsigned byte color to 0-1 range
vec4 picking_normalizeColor(vec4 color) {
  return picking.useByteColors > 0.5 ? color / 255.0 : color;
}

bool picking_isColorZero(vec3 color) {
  return dot(color, vec3(1.0)) < 0.00001;
}

bool picking_isColorValid(vec3 color) {
  return dot(color, vec3(1.0)) > 0.00001;
}

// Check if this vertex is highlighted 
bool isVertexHighlighted(vec3 vertexColor) {
  vec3 highlightedObjectColor = picking_normalizeColor(picking.highlightedObjectColor);
  return
    bool(picking.isHighlightActive) && picking_isColorZero(abs(vertexColor - highlightedObjectColor));
}

// Set the current picking color
void picking_setPickingColor(vec3 pickingColor) {
  pickingColor = picking_normalizeColor(pickingColor);

  if (bool(picking.isActive)) {
    // Use alpha as the validity flag. If pickingColor is [0, 0, 0] fragment is non-pickable
    picking_vRGBcolor_Avalid.a = float(picking_isColorValid(pickingColor));

    if (!bool(picking.isAttribute)) {
      // Stores the picking color so that the fragment shader can render it during picking
      picking_vRGBcolor_Avalid.rgb = pickingColor;
    }
  } else {
    // Do the comparison with selected item color in vertex shader as it should mean fewer compares
    picking_vRGBcolor_Avalid.a = float(isVertexHighlighted(pickingColor));
  }
}

void picking_setPickingAttribute(float value) {
  if (bool(picking.isAttribute)) {
    picking_vRGBcolor_Avalid.r = value;
  }
}

void picking_setPickingAttribute(vec2 value) {
  if (bool(picking.isAttribute)) {
    picking_vRGBcolor_Avalid.rg = value;
  }
}

void picking_setPickingAttribute(vec3 value) {
  if (bool(picking.isAttribute)) {
    picking_vRGBcolor_Avalid.rgb = value;
  }
}
`,fs:`layout(std140) uniform pickingUniforms {
  float isActive;
  float isAttribute;
  float isHighlightActive;
  float useByteColors;
  vec3 highlightedObjectColor;
  vec4 highlightColor;
} picking;

in vec4 picking_vRGBcolor_Avalid;

/*
 * Returns highlight color if this item is selected.
 */
vec4 picking_filterHighlightColor(vec4 color) {
  // If we are still picking, we don't highlight
  if (picking.isActive > 0.5) {
    return color;
  }

  bool selected = bool(picking_vRGBcolor_Avalid.a);

  if (selected) {
    // Blend in highlight color based on its alpha value
    float highLightAlpha = picking.highlightColor.a;
    float blendedAlpha = highLightAlpha + color.a * (1.0 - highLightAlpha);
    float highLightRatio = highLightAlpha / blendedAlpha;

    vec3 blendedRGB = mix(color.rgb, picking.highlightColor.rgb, highLightRatio);
    return vec4(blendedRGB, blendedAlpha);
  } else {
    return color;
  }
}

/*
 * Returns picking color if picking enabled else unmodified argument.
 */
vec4 picking_filterPickingColor(vec4 color) {
  if (bool(picking.isActive)) {
    if (picking_vRGBcolor_Avalid.a == 0.0) {
      discard;
    }
    return picking_vRGBcolor_Avalid;
  }
  return color;
}

/*
 * Returns picking color if picking is enabled if not
 * highlight color if this item is selected, otherwise unmodified argument.
 */
vec4 picking_filterColor(vec4 color) {
  vec4 highlightColor = picking_filterHighlightColor(color);
  return picking_filterPickingColor(highlightColor);
}
`,getUniforms:jw};function jw(i={},e){const t={},n=Uf(i.useByteColors,!0);if(i.highlightedObjectColor!==void 0)if(i.highlightedObjectColor===null)t.isHighlightActive=!1;else{t.isHighlightActive=!0;const s=i.highlightedObjectColor.slice(0,3);t.highlightedObjectColor=s}return i.highlightColor&&(t.highlightColor=Fw(i.highlightColor,n)),i.isActive!==void 0&&(t.isActive=!!i.isActive,t.isAttribute=!!i.isAttribute),i.useByteColors!==void 0&&(t.useByteColors=!!i.useByteColors),t}const Wf=`precision highp int;

// #if (defined(SHADER_TYPE_FRAGMENT) && defined(LIGHTING_FRAGMENT)) || (defined(SHADER_TYPE_VERTEX) && defined(LIGHTING_VERTEX))
struct AmbientLight {
  vec3 color;
};

struct PointLight {
  vec3 color;
  vec3 position;
  vec3 attenuation; // 2nd order x:Constant-y:Linear-z:Exponential
};

struct SpotLight {
  vec3 color;
  vec3 position;
  vec3 direction;
  vec3 attenuation;
  vec2 coneCos;
};

struct DirectionalLight {
  vec3 color;
  vec3 direction;
};

struct UniformLight {
  vec3 color;
  vec3 position;
  vec3 direction;
  vec3 attenuation;
  vec2 coneCos;
};

layout(std140) uniform lightingUniforms {
  int enabled;
  int directionalLightCount;
  int pointLightCount;
  int spotLightCount;
  vec3 ambientColor;
  UniformLight lights[5];
} lighting;

PointLight lighting_getPointLight(int index) {
  UniformLight light = lighting.lights[index];
  return PointLight(light.color, light.position, light.attenuation);
}

SpotLight lighting_getSpotLight(int index) {
  UniformLight light = lighting.lights[lighting.pointLightCount + index];
  return SpotLight(light.color, light.position, light.direction, light.attenuation, light.coneCos);
}

DirectionalLight lighting_getDirectionalLight(int index) {
  UniformLight light =
    lighting.lights[lighting.pointLightCount + lighting.spotLightCount + index];
  return DirectionalLight(light.color, light.direction);
}

float getPointLightAttenuation(PointLight pointLight, float distance) {
  return pointLight.attenuation.x
       + pointLight.attenuation.y * distance
       + pointLight.attenuation.z * distance * distance;
}

float getSpotLightAttenuation(SpotLight spotLight, vec3 positionWorldspace) {
  vec3 light_direction = normalize(positionWorldspace - spotLight.position);
  float coneFactor = smoothstep(
    spotLight.coneCos.y,
    spotLight.coneCos.x,
    dot(normalize(spotLight.direction), light_direction)
  );
  float distanceAttenuation = getPointLightAttenuation(
    PointLight(spotLight.color, spotLight.position, spotLight.attenuation),
    distance(spotLight.position, positionWorldspace)
  );
  return distanceAttenuation / max(coneFactor, 0.0001);
}

// #endif
`,Ww=`// #if (defined(SHADER_TYPE_FRAGMENT) && defined(LIGHTING_FRAGMENT)) || (defined(SHADER_TYPE_VERTEX) && defined(LIGHTING_VERTEX))
const MAX_LIGHTS: i32 = 5;

struct AmbientLight {
  color: vec3<f32>,
};

struct PointLight {
  color: vec3<f32>,
  position: vec3<f32>,
  attenuation: vec3<f32>, // 2nd order x:Constant-y:Linear-z:Exponential
};

struct SpotLight {
  color: vec3<f32>,
  position: vec3<f32>,
  direction: vec3<f32>,
  attenuation: vec3<f32>,
  coneCos: vec2<f32>,
};

struct DirectionalLight {
  color: vec3<f32>,
  direction: vec3<f32>,
};

struct UniformLight {
  color: vec3<f32>,
  position: vec3<f32>,
  direction: vec3<f32>,
  attenuation: vec3<f32>,
  coneCos: vec2<f32>,
};

struct lightingUniforms {
  enabled: i32,
  directionalLightCount: i32,
  pointLightCount: i32,
  spotLightCount: i32,
  ambientColor: vec3<f32>,
  lights: array<UniformLight, 5>,
};

@group(2) @binding(auto) var<uniform> lighting : lightingUniforms;

fn lighting_getPointLight(index: i32) -> PointLight {
  let light = lighting.lights[index];
  return PointLight(light.color, light.position, light.attenuation);
}

fn lighting_getSpotLight(index: i32) -> SpotLight {
  let light = lighting.lights[lighting.pointLightCount + index];
  return SpotLight(light.color, light.position, light.direction, light.attenuation, light.coneCos);
}

fn lighting_getDirectionalLight(index: i32) -> DirectionalLight {
  let light = lighting.lights[lighting.pointLightCount + lighting.spotLightCount + index];
  return DirectionalLight(light.color, light.direction);
}

fn getPointLightAttenuation(pointLight: PointLight, distance: f32) -> f32 {
  return pointLight.attenuation.x
       + pointLight.attenuation.y * distance
       + pointLight.attenuation.z * distance * distance;
}

fn getSpotLightAttenuation(spotLight: SpotLight, positionWorldspace: vec3<f32>) -> f32 {
  let lightDirection = normalize(positionWorldspace - spotLight.position);
  let coneFactor = smoothstep(
    spotLight.coneCos.y,
    spotLight.coneCos.x,
    dot(normalize(spotLight.direction), lightDirection)
  );
  let distanceAttenuation = getPointLightAttenuation(
    PointLight(spotLight.color, spotLight.position, spotLight.attenuation),
    distance(spotLight.position, positionWorldspace)
  );
  return distanceAttenuation / max(coneFactor, 0.0001);
}
`,bt=5,Hf={props:{},uniforms:{},name:"lighting",defines:{},uniformTypes:{enabled:"i32",directionalLightCount:"i32",pointLightCount:"i32",spotLightCount:"i32",ambientColor:"vec3<f32>",lights:[{color:"vec3<f32>",position:"vec3<f32>",direction:"vec3<f32>",attenuation:"vec3<f32>",coneCos:"vec2<f32>"},bt]},defaultUniforms:ls(),bindingLayout:[{name:"lighting",group:2}],firstBindingSlot:0,source:Ww,vs:Wf,fs:Wf,getUniforms:Hw};function Hw(i,e={}){if(i=i&&{...i},!i)return ls();i.lights&&(i={...i,...qw(i.lights),lights:void 0});const{useByteColors:t,ambientLight:n,pointLights:s,spotLights:r,directionalLights:o}=i||{};if(!(n||s&&s.length>0||r&&r.length>0||o&&o.length>0))return{...ls(),enabled:0};const c={...ls(),...Yw({useByteColors:t,ambientLight:n,pointLights:s,spotLights:r,directionalLights:o})};return i.enabled!==void 0&&(c.enabled=i.enabled?1:0),c}function Yw({useByteColors:i,ambientLight:e,pointLights:t=[],spotLights:n=[],directionalLights:s=[]}){const r=Yf();let o=0,a=0,c=0,l=0;for(const u of t){if(o>=bt)break;r[o]={...r[o],color:cs(u,i),position:u.position,attenuation:u.attenuation||[1,0,0]},o++,a++}for(const u of n){if(o>=bt)break;r[o]={...r[o],color:cs(u,i),position:u.position,direction:u.direction,attenuation:u.attenuation||[1,0,0],coneCos:Zw(u)},o++,c++}for(const u of s){if(o>=bt)break;r[o]={...r[o],color:cs(u,i),direction:u.direction},o++,l++}return t.length+n.length+s.length>bt&&S.warn(`MAX_LIGHTS exceeded, truncating to ${bt}`)(),{ambientColor:cs(e,i),directionalLightCount:l,pointLightCount:a,spotLightCount:c,lights:r}}function qw(i){const e={pointLights:[],spotLights:[],directionalLights:[]};for(const t of i||[])switch(t.type){case"ambient":e.ambientLight=t;break;case"directional":e.directionalLights?.push(t);break;case"point":e.pointLights?.push(t);break;case"spot":e.spotLights?.push(t);break}return e}function cs(i={},e){const{color:t=[0,0,0],intensity:n=1}=i;return $f(t,Uf(e,!0)).map(r=>r*n)}function ls(){return{enabled:1,directionalLightCount:0,pointLightCount:0,spotLightCount:0,ambientColor:[.1,.1,.1],lights:Yf()}}function Yf(){return Array.from({length:bt},()=>Xw())}function Xw(){return{color:[1,1,1],position:[1,1,2],direction:[1,1,1],attenuation:[1,0,0],coneCos:[1,0]}}function Zw(i){const e=i.innerConeAngle??0,t=i.outerConeAngle??Math.PI/4;return[Math.cos(e),Math.cos(t)]}const qf=`layout(std140) uniform phongMaterialUniforms {
  uniform bool unlit;
  uniform float ambient;
  uniform float diffuse;
  uniform float shininess;
  uniform vec3  specularColor;
} material;
`,Xf=`layout(std140) uniform phongMaterialUniforms {
  uniform bool unlit;
  uniform float ambient;
  uniform float diffuse;
  uniform float shininess;
  uniform vec3  specularColor;
} material;

vec3 lighting_getLightColor(vec3 surfaceColor, vec3 light_direction, vec3 view_direction, vec3 normal_worldspace, vec3 color) {
  vec3 halfway_direction = normalize(light_direction + view_direction);
  float lambertian = dot(light_direction, normal_worldspace);
  float specular = 0.0;
  if (lambertian > 0.0) {
    float specular_angle = max(dot(normal_worldspace, halfway_direction), 0.0);
    specular = pow(specular_angle, material.shininess);
  }
  lambertian = max(lambertian, 0.0);
  return (lambertian * material.diffuse * surfaceColor + specular * floatColors_normalize(material.specularColor)) * color;
}

vec3 lighting_getLightColor(vec3 surfaceColor, vec3 cameraPosition, vec3 position_worldspace, vec3 normal_worldspace) {
  vec3 lightColor = surfaceColor;

  if (material.unlit) {
    return surfaceColor;
  }

  if (lighting.enabled == 0) {
    return lightColor;
  }

  vec3 view_direction = normalize(cameraPosition - position_worldspace);
  lightColor = material.ambient * surfaceColor * lighting.ambientColor;

  for (int i = 0; i < lighting.pointLightCount; i++) {
    PointLight pointLight = lighting_getPointLight(i);
    vec3 light_position_worldspace = pointLight.position;
    vec3 light_direction = normalize(light_position_worldspace - position_worldspace);
    float light_attenuation = getPointLightAttenuation(pointLight, distance(light_position_worldspace, position_worldspace));
    lightColor += lighting_getLightColor(surfaceColor, light_direction, view_direction, normal_worldspace, pointLight.color / light_attenuation);
  }

  for (int i = 0; i < lighting.spotLightCount; i++) {
    SpotLight spotLight = lighting_getSpotLight(i);
    vec3 light_position_worldspace = spotLight.position;
    vec3 light_direction = normalize(light_position_worldspace - position_worldspace);
    float light_attenuation = getSpotLightAttenuation(spotLight, position_worldspace);
    lightColor += lighting_getLightColor(surfaceColor, light_direction, view_direction, normal_worldspace, spotLight.color / light_attenuation);
  }

  for (int i = 0; i < lighting.directionalLightCount; i++) {
    DirectionalLight directionalLight = lighting_getDirectionalLight(i);
    lightColor += lighting_getLightColor(surfaceColor, -directionalLight.direction, view_direction, normal_worldspace, directionalLight.color);
  }
  
  return lightColor;
}
`,Zf=`struct phongMaterialUniforms {
  unlit: u32,
  ambient: f32,
  diffuse: f32,
  shininess: f32,
  specularColor: vec3<f32>,
};

@group(3) @binding(auto) var<uniform> phongMaterial : phongMaterialUniforms;

fn lighting_getLightColor(surfaceColor: vec3<f32>, light_direction: vec3<f32>, view_direction: vec3<f32>, normal_worldspace: vec3<f32>, color: vec3<f32>) -> vec3<f32> {
  let halfway_direction: vec3<f32> = normalize(light_direction + view_direction);
  var lambertian: f32 = dot(light_direction, normal_worldspace);
  var specular: f32 = 0.0;
  if (lambertian > 0.0) {
    let specular_angle = max(dot(normal_worldspace, halfway_direction), 0.0);
    specular = pow(specular_angle, phongMaterial.shininess);
  }
  lambertian = max(lambertian, 0.0);
  return (
    lambertian * phongMaterial.diffuse * surfaceColor +
    specular * floatColors_normalize(phongMaterial.specularColor)
  ) * color;
}

fn lighting_getLightColor2(surfaceColor: vec3<f32>, cameraPosition: vec3<f32>, position_worldspace: vec3<f32>, normal_worldspace: vec3<f32>) -> vec3<f32> {
  var lightColor: vec3<f32> = surfaceColor;

  if (phongMaterial.unlit != 0u) {
    return surfaceColor;
  }

  if (lighting.enabled == 0) {
    return lightColor;
  }

  let view_direction: vec3<f32> = normalize(cameraPosition - position_worldspace);
  lightColor = phongMaterial.ambient * surfaceColor * lighting.ambientColor;

  for (var i: i32 = 0; i < lighting.pointLightCount; i++) {
    let pointLight: PointLight = lighting_getPointLight(i);
    let light_position_worldspace: vec3<f32> = pointLight.position;
    let light_direction: vec3<f32> = normalize(light_position_worldspace - position_worldspace);
    let light_attenuation = getPointLightAttenuation(
      pointLight,
      distance(light_position_worldspace, position_worldspace)
    );
    lightColor += lighting_getLightColor(
      surfaceColor,
      light_direction,
      view_direction,
      normal_worldspace,
      pointLight.color / light_attenuation
    );
  }

  for (var i: i32 = 0; i < lighting.spotLightCount; i++) {
    let spotLight: SpotLight = lighting_getSpotLight(i);
    let light_position_worldspace: vec3<f32> = spotLight.position;
    let light_direction: vec3<f32> = normalize(light_position_worldspace - position_worldspace);
    let light_attenuation = getSpotLightAttenuation(spotLight, position_worldspace);
    lightColor += lighting_getLightColor(
      surfaceColor,
      light_direction,
      view_direction,
      normal_worldspace,
      spotLight.color / light_attenuation
    );
  }

  for (var i: i32 = 0; i < lighting.directionalLightCount; i++) {
    let directionalLight: DirectionalLight = lighting_getDirectionalLight(i);
    lightColor += lighting_getLightColor(surfaceColor, -directionalLight.direction, view_direction, normal_worldspace, directionalLight.color);
  }  
  
  return lightColor;
}

fn lighting_getSpecularLightColor(cameraPosition: vec3<f32>, position_worldspace: vec3<f32>, normal_worldspace: vec3<f32>) -> vec3<f32>{
  var lightColor = vec3<f32>(0, 0, 0);
  let surfaceColor = vec3<f32>(0, 0, 0);

  if (lighting.enabled != 0) {
    let view_direction = normalize(cameraPosition - position_worldspace);

    for (var i: i32 = 0; i < lighting.pointLightCount; i++) {
      let pointLight: PointLight = lighting_getPointLight(i);
      let light_position_worldspace: vec3<f32> = pointLight.position;
      let light_direction: vec3<f32> = normalize(light_position_worldspace - position_worldspace);
      let light_attenuation = getPointLightAttenuation(
        pointLight,
        distance(light_position_worldspace, position_worldspace)
      );
      lightColor += lighting_getLightColor(
        surfaceColor,
        light_direction,
        view_direction,
        normal_worldspace,
        pointLight.color / light_attenuation
      );
    }

    for (var i: i32 = 0; i < lighting.spotLightCount; i++) {
      let spotLight: SpotLight = lighting_getSpotLight(i);
      let light_position_worldspace: vec3<f32> = spotLight.position;
      let light_direction: vec3<f32> = normalize(light_position_worldspace - position_worldspace);
      let light_attenuation = getSpotLightAttenuation(spotLight, position_worldspace);
      lightColor += lighting_getLightColor(
        surfaceColor,
        light_direction,
        view_direction,
        normal_worldspace,
        spotLight.color / light_attenuation
      );
    }

    for (var i: i32 = 0; i < lighting.directionalLightCount; i++) {
        let directionalLight: DirectionalLight = lighting_getDirectionalLight(i);
        lightColor += lighting_getLightColor(surfaceColor, -directionalLight.direction, view_direction, normal_worldspace, directionalLight.color);
    }
  }
  return lightColor;
}
`,Kw=[38.25,38.25,38.25],sa={props:{},name:"gouraudMaterial",bindingLayout:[{name:"gouraudMaterial",group:3}],vs:Xf.replace("phongMaterial","gouraudMaterial"),fs:qf.replace("phongMaterial","gouraudMaterial"),source:Zf.replaceAll("phongMaterial","gouraudMaterial"),defines:{LIGHTING_VERTEX:!0},dependencies:[Hf,jf],uniformTypes:{unlit:"i32",ambient:"f32",diffuse:"f32",shininess:"f32",specularColor:"vec3<f32>"},defaultUniforms:{unlit:!1,ambient:.35,diffuse:.6,shininess:32,specularColor:Kw},getUniforms(i){return{...sa.defaultUniforms,...i}}},Kf={name:"phongMaterial",firstBindingSlot:0,bindingLayout:[{name:"phongMaterial",group:3}],dependencies:[Hf,jf],source:Zf,vs:qf,fs:Xf,defines:{LIGHTING_FRAGMENT:!0},uniformTypes:{unlit:"i32",ambient:"f32",diffuse:"f32",shininess:"f32",specularColor:"vec3<f32>"},defaultUniforms:{unlit:!1,ambient:.35,diffuse:.6,shininess:32,specularColor:[38.25,38.25,38.25]},getUniforms(i){return{...Kf.defaultUniforms,...i}}},Qw=`struct LayerUniforms {
  opacity: f32,
};

@group(0) @binding(auto)
var<uniform> layer: LayerUniforms;
`,Qf=`layout(std140) uniform layerUniforms {
  uniform float opacity;
} layer;
`,Jw={name:"layer",source:Qw,vs:Qf,fs:Qf,getUniforms:i=>({opacity:Math.pow(i.opacity,1/2.2)}),uniformTypes:{opacity:"f32"}},Ht={name:"color",dependencies:[],source:`

@must_use
fn deckgl_premultiplied_alpha(fragColor: vec4<f32>) -> vec4<f32> {
    return vec4(fragColor.rgb * fragColor.a, fragColor.a); 
};
`,getUniforms:i=>({})},e2=`const SMOOTH_EDGE_RADIUS: f32 = 0.5;

struct VertexGeometry {
  position: vec4<f32>,
  worldPosition: vec3<f32>,
  worldPositionAlt: vec3<f32>,
  normal: vec3<f32>,
  uv: vec2<f32>,
  pickingColor: vec3<f32>,
};

var<private> geometry_: VertexGeometry = VertexGeometry(
  vec4<f32>(0.0, 0.0, 1.0, 0.0),
  vec3<f32>(0.0, 0.0, 0.0),
  vec3<f32>(0.0, 0.0, 0.0),
  vec3<f32>(0.0, 0.0, 0.0),
  vec2<f32>(0.0, 0.0),
  vec3<f32>(0.0, 0.0, 0.0)
);

struct FragmentGeometry {
  uv: vec2<f32>,
};

var<private> fragmentGeometry: FragmentGeometry;

fn smoothedge(edge: f32, x: f32) -> f32 {
  return smoothstep(edge - SMOOTH_EDGE_RADIUS, edge + SMOOTH_EDGE_RADIUS, x);
}
`,Jf="#define SMOOTH_EDGE_RADIUS 0.5",t2=`${Jf}

struct VertexGeometry {
  vec4 position;
  vec3 worldPosition;
  vec3 worldPositionAlt;
  vec3 normal;
  vec2 uv;
  vec3 pickingColor;
} geometry = VertexGeometry(
  vec4(0.0, 0.0, 1.0, 0.0),
  vec3(0.0),
  vec3(0.0),
  vec3(0.0),
  vec2(0.0),
  vec3(0.0)
);
`,i2=`${Jf}

struct FragmentGeometry {
  vec2 uv;
};
FragmentGeometry geometry;

float smoothedge(float edge, float x) {
  return smoothstep(edge - SMOOTH_EDGE_RADIUS, edge + SMOOTH_EDGE_RADIUS, x);
}
`,ed={name:"geometry",source:e2,vs:t2,fs:i2},n2=25;var N;(function(i){i[i.Start=1]="Start",i[i.Move=2]="Move",i[i.End=4]="End",i[i.Cancel=8]="Cancel"})(N||(N={}));var J;(function(i){i[i.None=0]="None",i[i.Left=1]="Left",i[i.Right=2]="Right",i[i.Up=4]="Up",i[i.Down=8]="Down",i[i.Horizontal=3]="Horizontal",i[i.Vertical=12]="Vertical",i[i.All=15]="All"})(J||(J={}));var I;(function(i){i[i.Possible=1]="Possible",i[i.Began=2]="Began",i[i.Changed=4]="Changed",i[i.Ended=8]="Ended",i[i.Recognized=8]="Recognized",i[i.Cancelled=16]="Cancelled",i[i.Failed=32]="Failed"})(I||(I={}));const s2="compute",r2="auto",us="manipulation",fs="none",ra="pan-x",oa="pan-y";function o2(i){if(i.includes(fs))return fs;const e=i.includes(ra),t=i.includes(oa);return e&&t?fs:e||t?e?ra:oa:i.includes(us)?us:r2}class a2{constructor(e,t){this.actions="",this.manager=e,this.set(t)}set(e){e===s2&&(e=this.compute()),this.manager.element&&(this.manager.element.style.touchAction=e,this.actions=e)}update(){this.set(this.manager.options.touchAction)}compute(){let e=[];for(const t of this.manager.recognizers)t.options.enable&&(e=e.concat(t.getTouchAction()));return o2(e.join(" "))}}function ds(i){return i.trim().split(/\s+/g)}function aa(i,e,t){if(i)for(const n of ds(e))i.addEventListener(n,t,!1)}function ca(i,e,t){if(i)for(const n of ds(e))i.removeEventListener(n,t,!1)}function td(i){return(i.ownerDocument||i).defaultView}function c2(i,e){let t=i;for(;t;){if(t===e)return!0;t=t.parentNode}return!1}function id(i){const e=i.length;if(e===1)return{x:Math.round(i[0].clientX),y:Math.round(i[0].clientY)};let t=0,n=0,s=0;for(;s<e;)t+=i[s].clientX,n+=i[s].clientY,s++;return{x:Math.round(t/e),y:Math.round(n/e)}}function nd(i){const e=[];let t=0;for(;t<i.pointers.length;)e[t]={clientX:Math.round(i.pointers[t].clientX),clientY:Math.round(i.pointers[t].clientY)},t++;return{timeStamp:Date.now(),pointers:e,center:id(e),deltaX:i.deltaX,deltaY:i.deltaY}}function la(i,e){const t=e.x-i.x,n=e.y-i.y;return Math.sqrt(t*t+n*n)}function ua(i,e){const t=e.clientX-i.clientX,n=e.clientY-i.clientY;return Math.sqrt(t*t+n*n)}function l2(i,e){const t=e.x-i.x,n=e.y-i.y;return Math.atan2(n,t)*180/Math.PI}function sd(i,e){const t=e.clientX-i.clientX,n=e.clientY-i.clientY;return Math.atan2(n,t)*180/Math.PI}function fa(i,e){return i===e?J.None:Math.abs(i)>=Math.abs(e)?i<0?J.Left:J.Right:e<0?J.Up:J.Down}function u2(i,e){const t=e.center;let n=i.offsetDelta,s=i.prevDelta;const r=i.prevInput;return(e.eventType===N.Start||r?.eventType===N.End)&&(s=i.prevDelta={x:r?.deltaX||0,y:r?.deltaY||0},n=i.offsetDelta={x:t.x,y:t.y}),{deltaX:s.x+(t.x-n.x),deltaY:s.y+(t.y-n.y)}}function rd(i,e,t){return{x:e/i||0,y:t/i||0}}function f2(i,e){return ua(e[0],e[1])/ua(i[0],i[1])}function d2(i,e){return sd(e[1],e[0])-sd(i[1],i[0])}function h2(i,e){const t=i.lastInterval||e,n=e.timeStamp-t.timeStamp;let s,r,o,a;if(e.eventType!==N.Cancel&&(n>n2||t.velocity===void 0)){const c=e.deltaX-t.deltaX,l=e.deltaY-t.deltaY,u=rd(n,c,l);r=u.x,o=u.y,s=Math.abs(u.x)>Math.abs(u.y)?u.x:u.y,a=fa(c,l),i.lastInterval=e}else s=t.velocity,r=t.velocityX,o=t.velocityY,a=t.direction;e.velocity=s,e.velocityX=r,e.velocityY=o,e.direction=a}function da(i,e){return"pointerId"in i?i.pointerId:e}function od(i,e){i.movementOrigin=new Map(e.map((t,n)=>[da(t,n),{clientX:t.clientX,clientY:t.clientY}])),i.firstMovementTime=void 0}function g2(i,e){const t=e.pointers.map(da);if(i.movementOrigin?.size===t.length&&t.every(s=>i.movementOrigin.has(s))||od(i,e.pointers),e.distancePerPointer=e.pointers.map((s,r)=>ua(i.movementOrigin.get(t[r]),s)),e.eventType&N.Move&&e.distancePerPointer.some(s=>s>0)&&(i.firstMovementTime??(i.firstMovementTime=e.timeStamp)),e.movementDeltaTime=i.firstMovementTime===void 0?0:e.timeStamp-i.firstMovementTime,e.eventType&(N.End|N.Cancel)){const s=e.changedPointers.map(r=>da(r,e.pointers.indexOf(r)));od(i,e.pointers.filter((r,o)=>!s.includes(t[o])))}}function p2(i,e){const{session:t}=i,{pointers:n}=e,{length:s}=n;t.firstInput||(t.firstInput=nd(e)),s>1&&!t.firstMultiple?t.firstMultiple=nd(e):s===1&&(t.firstMultiple=!1);const{firstInput:r,firstMultiple:o}=t,a=o?o.center:r.center,c=e.center=id(n);e.timeStamp=Date.now(),e.deltaTime=e.timeStamp-r.timeStamp,g2(t,e),e.angle=l2(a,c),e.distance=la(a,c);const{deltaX:l,deltaY:u}=u2(t,e);e.deltaX=l,e.deltaY=u,e.offsetDirection=fa(e.deltaX,e.deltaY);const f=rd(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=f.x,e.overallVelocityY=f.y,e.overallVelocity=Math.abs(f.x)>Math.abs(f.y)?f.x:f.y,e.scale=o?f2(o.pointers,n):1,e.rotation=o?d2(o.pointers,n):0,e.maxPointers=t.prevInput?e.pointers.length>t.prevInput.maxPointers?e.pointers.length:t.prevInput.maxPointers:e.pointers.length;let d=i.element;return c2(e.srcEvent.target,d)&&(d=e.srcEvent.target),e.target=d,h2(t,e),e}function m2(i,e,t){const n=t.pointers.length,s=t.changedPointers.length,r=e&N.Start&&n-s===0,o=e&(N.End|N.Cancel)&&n-s===0;t.isFirst=!!r,t.isFinal=!!o,r&&(i.session={}),t.eventType=e;const a=p2(i,t);i.emit("hammer.input",a),i.recognize(a),i.session.prevInput=a}let y2=class{constructor(e){this.evEl="",this.evWin="",this.evTarget="",this.domHandler=t=>{this.manager.options.enable&&this.handler(t)},this.manager=e,this.element=e.element,this.target=e.options.inputTarget||e.element}callback(e,t){m2(this.manager,e,t)}init(){aa(this.element,this.evEl,this.domHandler),aa(this.target,this.evTarget,this.domHandler),aa(td(this.element),this.evWin,this.domHandler)}destroy(){ca(this.element,this.evEl,this.domHandler),ca(this.target,this.evTarget,this.domHandler),ca(td(this.element),this.evWin,this.domHandler)}};const b2={pointerdown:N.Start,pointermove:N.Move,pointerup:N.End,pointercancel:N.Cancel,pointerout:N.Cancel},_2="pointerdown",v2="pointermove pointerup pointercancel";class x2 extends y2{constructor(e){super(e),this.evEl=_2,this.evWin=v2,this.store=this.manager.session.pointerEvents=[],this.init()}handler(e){const{store:t}=this;let n=!1;const s=b2[e.type],r=e.pointerType,o=r==="touch";let a=t.findIndex(c=>c.pointerId===e.pointerId);s&N.Start&&(e.buttons||o)?a<0&&(t.push(e),a=t.length-1):s&(N.End|N.Cancel)&&(n=!0),!(a<0)&&(t[a]=e,this.callback(s,{pointers:t,changedPointers:[e],eventType:s,pointerType:r,srcEvent:e}),n&&t.splice(a,1))}}const w2=["","webkit","Moz","MS","ms","o"];function P2(i,e){const t=e[0].toUpperCase()+e.slice(1);for(const n of w2){const s=n?n+t:e;if(s in i)return s}}const S2=1,ad=2,cd={touchAction:"compute",enable:!0,inputTarget:null,cssProps:{userSelect:"none",userDrag:"none",touchCallout:"none",tapHighlightColor:"rgba(0,0,0,0)"}};class E2{constructor(e,t){this.options={...cd,...t,cssProps:{...cd.cssProps,...t.cssProps},inputTarget:t.inputTarget||e},this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=e,this.input=new x2(this),this.touchAction=new a2(this,this.options.touchAction),this.toggleCssProps(!0)}set(e){return Object.assign(this.options,e),e.touchAction&&this.touchAction.update(),e.inputTarget&&(this.input.destroy(),this.input.target=e.inputTarget,this.input.init()),this}stop(e){this.session.stopped=e?ad:S2}recognize(e){const{session:t}=this;if(t.stopped)return;this.session.prevented&&e.srcEvent.preventDefault();let n;const{recognizers:s}=this;let{curRecognizer:r}=t;(!r||r&&r.state&I.Recognized)&&(r=t.curRecognizer=null);let o=0;for(;o<s.length;)n=s[o],t.stopped!==ad&&(!r||n===r||n.canRecognizeWith(r))?n.recognize(e):n.reset(),!r&&n.state&(I.Began|I.Changed|I.Ended)&&(r=t.curRecognizer=n),o++}get(e){const{recognizers:t}=this;for(let n=0;n<t.length;n++)if(t[n].options.event===e)return t[n];return null}add(e){if(Array.isArray(e)){for(const n of e)this.add(n);return this}const t=this.get(e.options.event);return t&&this.remove(t),this.recognizers.push(e),e.manager=this,this.touchAction.update(),e}remove(e){if(Array.isArray(e)){for(const n of e)this.remove(n);return this}const t=typeof e=="string"?this.get(e):e;if(t){const{recognizers:n}=this,s=n.indexOf(t);s!==-1&&(n.splice(s,1),this.touchAction.update())}return this}on(e,t){if(!e||!t)return;const{handlers:n}=this;for(const s of ds(e))n[s]=n[s]||[],n[s].push(t)}off(e,t){if(!e)return;const{handlers:n}=this;for(const s of ds(e))t?n[s]&&n[s].splice(n[s].indexOf(t),1):delete n[s]}emit(e,t){const n=this.handlers[e]&&this.handlers[e].slice();if(!n||!n.length)return;const s=t;s.type=e,s.preventDefault=function(){t.srcEvent.preventDefault()};let r=0;for(;r<n.length;)n[r](s),r++}destroy(){this.toggleCssProps(!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}toggleCssProps(e){const{element:t}=this;if(t){for(const[n,s]of Object.entries(this.options.cssProps)){const r=P2(t.style,n);e?(this.oldCssProps[r]=t.style[r],t.style[r]=s):t.style[r]=this.oldCssProps[r]||""}e||(this.oldCssProps={})}}}let C2=1;function L2(){return C2++}function ld(i){return i&I.Cancelled?"cancel":i&I.Ended?"end":i&I.Changed?"move":i&I.Began?"start":""}class ha{constructor(e){this.options=e,this.id=L2(),this.state=I.Possible,this.simultaneous={},this.requireFail=[]}set(e){return Object.assign(this.options,e),this.manager.touchAction.update(),this}recognizeWith(e){if(Array.isArray(e)){for(const s of e)this.recognizeWith(s);return this}let t;if(typeof e=="string"){if(t=this.manager.get(e),!t)throw new Error(`Cannot find recognizer ${e}`)}else t=e;const{simultaneous:n}=this;return n[t.id]||(n[t.id]=t,t.recognizeWith(this)),this}dropRecognizeWith(e){if(Array.isArray(e)){for(const n of e)this.dropRecognizeWith(n);return this}let t;return typeof e=="string"?t=this.manager.get(e):t=e,t&&delete this.simultaneous[t.id],this}requireFailure(e){if(Array.isArray(e)){for(const s of e)this.requireFailure(s);return this}let t;if(typeof e=="string"){if(t=this.manager.get(e),!t)throw new Error(`Cannot find recognizer ${e}`)}else t=e;const{requireFail:n}=this;return n.indexOf(t)===-1&&(n.push(t),t.requireFailure(this)),this}dropRequireFailure(e){if(Array.isArray(e)){for(const n of e)this.dropRequireFailure(n);return this}let t;if(typeof e=="string"?t=this.manager.get(e):t=e,t){const n=this.requireFail.indexOf(t);n>-1&&this.requireFail.splice(n,1)}return this}hasRequireFailures(){return!!this.requireFail.find(e=>e.options.enable)}canRecognizeWith(e){return!!this.simultaneous[e.id]}emit(e){if(!e)return;const{state:t}=this;t<I.Ended&&this.manager.emit(this.options.event+ld(t),e),this.manager.emit(this.options.event,e),e.additionalEvent&&this.manager.emit(e.additionalEvent,e),t>=I.Ended&&this.manager.emit(this.options.event+ld(t),e)}tryEmit(e){this.canEmit()?this.emit(e):this.state=I.Failed}canEmit(){let e=0;for(;e<this.requireFail.length;){if(!(this.requireFail[e].state&(I.Failed|I.Possible)))return!1;e++}return!0}recognize(e){const t={...e};if(!this.options.enable){this.reset(),this.state=I.Failed;return}this.state&(I.Recognized|I.Cancelled|I.Failed)&&(this.state=I.Possible),this.state=this.process(t),this.state&(I.Began|I.Changed|I.Ended|I.Cancelled)&&this.tryEmit(t)}getEventNames(){return[this.options.event]}reset(){}}function T2(i){return Math.abs(((i+180)%360+360)%360-180)}function A2(i,e){return(e.distance===void 0||i.distance>=e.distance)&&(e.distancePerPointer===void 0||i.distancePerPointer.length>0&&i.distancePerPointer.every(t=>t>=e.distancePerPointer))&&(e.movementDeltaTime===void 0||i.movementDeltaTime>=e.movementDeltaTime)&&(e.rotation===void 0||T2(i.rotation)>=e.rotation)&&(e.scale===void 0||Math.abs(i.scale-1)>=e.scale)}class I2 extends ha{attrTest(e){const t=this.options.pointers;return t===0||e.pointers.length===t}coherentTest(e){const t=this.options.coherent;return!t?.length||t.some(n=>A2(e,n))}process(e){const{state:t}=this,{eventType:n}=e,s=t&(I.Began|I.Changed),r=this.attrTest(e);return s&&(n&N.Cancel||!r)?t|I.Cancelled:s||r?n&N.End?t|I.Ended:t&I.Began?t|I.Changed:I.Began:I.Failed}}const M2=["","start","move","end","cancel"];class R2 extends ha{constructor(e={}){super({enable:!0,event:"doubleclickdrag",pointers:1,interval:500,time:350,threshold:28,dragThreshold:1,pixelsPerScale:120,...e}),this._tapStart=null,this._lastTap=null,this._drag=null,this._emittedStart=!1}getTouchAction(){return[us]}getEventNames(){return M2.map(e=>this.options.event+e)}process(e){const{options:t}=this;return e.pointers.length===t.pointers?e.eventType&N.Start?this._handleStart(e):e.eventType&N.Move?this._handleMove(e):e.eventType&N.Cancel?this._handleEnd(e,!0):e.eventType&N.End?this._handleEnd(e,!1):I.Failed:(this.reset(),I.Failed)}reset(){this._tapStart=null,this._lastTap=null,this._drag=null,this._emittedStart=!1}emit(e){if(e){if(this.state===I.Began){if(!this._drag?.active||this._emittedStart)return;this._emittedStart=!0,this.manager.emit(`${this.options.event}start`,e),this.manager.emit(this.options.event,e);return}if(this.state===I.Changed){if(!this._emittedStart)return;this.manager.emit(`${this.options.event}move`,e),this.manager.emit(this.options.event,e);return}if(this.state===I.Ended){if(!this._emittedStart)return;this.manager.emit(this.options.event,e),this.manager.emit(`${this.options.event}end`,e),this._emittedStart=!1;return}if(this.state===I.Cancelled){if(!this._emittedStart)return;this.manager.emit(this.options.event,e),this.manager.emit(`${this.options.event}cancel`,e),this._emittedStart=!1}}}_handleStart(e){const t=this._getPointerId(e);return this._lastTap&&this._isTapMatch(e,this._lastTap)?(this._tapStart=null,this._lastTap=null,this._drag={startCenter:e.center,pointerId:t,active:!1},this._emittedStart=!1,I.Began):(this._tapStart={center:e.center,timeStamp:e.timeStamp,pointerId:t},this._lastTap=null,this._drag=null,this._emittedStart=!1,I.Failed)}_handleMove(e){if(!this._drag||!this._isSamePointer(e,this._drag.pointerId))return I.Failed;const t=this._drag.startCenter.y-e.center.y;return!this._drag.active&&Math.abs(t)<this.options.dragThreshold?I.Began:(this._drag.active=!0,e.scale=Math.pow(2,t/this.options.pixelsPerScale),this._emittedStart?I.Changed:I.Began)}_handleEnd(e,t){if(this._drag&&this._isSamePointer(e,this._drag.pointerId)){const{active:n,startCenter:s}=this._drag;if(this._drag=null,this._tapStart=null,this._lastTap=null,!n)return this._emittedStart=!1,I.Failed;const r=s.y-e.center.y;return e.scale=Math.pow(2,r/this.options.pixelsPerScale),t?I.Cancelled:I.Ended}return!this._tapStart||!this._isSamePointer(e,this._tapStart.pointerId)?(t&&this.reset(),I.Failed):(this._isValidTap(e)?this._lastTap={center:e.center,timeStamp:e.timeStamp,pointerId:this._tapStart.pointerId}:this._lastTap=null,this._tapStart=null,I.Failed)}_isTapMatch(e,t){return e.timeStamp-t.timeStamp<=this.options.interval&&la(e.center,t.center)<=this.options.threshold}_isValidTap(e){return e.deltaTime<=this.options.time&&e.distance<=this.options.threshold}_getPointerId(e){return"pointerId"in e.srcEvent?e.srcEvent.pointerId:null}_isSamePointer(e,t){return t===null||this._getPointerId(e)===t}}class ud extends ha{constructor(e={}){super({enable:!0,event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10,...e}),this.pTime=null,this.pCenter=null,this._timer=null,this._input=null,this.count=0}getTouchAction(){return[us]}process(e){const{options:t}=this,n=e.pointers.length===t.pointers,s=e.distance<t.threshold,r=e.deltaTime<t.time;if(this.reset(),e.eventType&N.Start&&this.count===0)return this.failTimeout();if(s&&r&&n){if(e.eventType!==N.End)return this.failTimeout();const o=this.pTime?e.timeStamp-this.pTime<t.interval:!0,a=!this.pCenter||la(this.pCenter,e.center)<t.posThreshold;if(this.pTime=e.timeStamp,this.pCenter=e.center,!a||!o?this.count=1:this.count+=1,this._input=e,this.count%t.taps===0)return this.hasRequireFailures()?(this._timer=setTimeout(()=>{this.state=I.Recognized,this.tryEmit(this._input)},t.interval),I.Began):I.Recognized}return I.Failed}failTimeout(){return this._timer=setTimeout(()=>{this.state=I.Failed},this.options.interval),I.Failed}reset(){clearTimeout(this._timer)}emit(e){this.state===I.Recognized&&(e.tapCount=this.count,this.manager.emit(this.options.event,e))}}class fd extends I2{constructor(){super(...arguments),this.wheelSession=null,this.wheelSessionUnsubscribe=null,this.handleWheelSessionEvent=e=>{e.device==="trackpad"&&this.handleTrackpadEvent(e)}}set(e){const{wheelSession:t,...n}=e;return t&&t!==this.wheelSession&&(this.wheelSessionUnsubscribe?.(),this.wheelSessionUnsubscribe=null,this.wheelSession=t),super.set(n),this.updateWheelSessionSubscription(),this}getTrackpadInput(e,t={}){const{srcEvent:n}=e,s=t.deltaX??e.deltaX,r=t.deltaY??e.deltaY,o=fa(s,r),a=Math.sqrt(e.deltaX*e.deltaX+e.deltaY*e.deltaY),c=n;return{pointers:[c,c],changedPointers:[c,c],pointerType:"trackpad",srcEvent:c,eventType:e.eventType,timeStamp:e.timeStamp,deltaTime:e.deltaTime,center:e.center,deltaX:s,deltaY:r,angle:Math.atan2(r,s)*180/Math.PI,distance:Math.sqrt(s*s+r*r),distancePerPointer:[a,a],movementDeltaTime:e.deltaTime,scale:1,rotation:0,direction:o,offsetDirection:o,velocity:e.velocity,velocityX:e.velocityX,velocityY:e.velocityY,overallVelocity:e.overallVelocity,overallVelocityX:e.overallVelocityX,overallVelocityY:e.overallVelocityY,maxPointers:2,target:n.target||this.manager.element,additionalEvent:"",...t}}updateWheelSessionSubscription(){const e=!!(this.wheelSession&&this.options.enable&&this.options.trackpad&&this.options.pointers===2);e&&!this.wheelSessionUnsubscribe?this.wheelSessionUnsubscribe=this.wheelSession.on(this.handleWheelSessionEvent):!e&&this.wheelSessionUnsubscribe&&(this.wheelSessionUnsubscribe(),this.wheelSessionUnsubscribe=null)}}const O2=["","start","move","end","cancel","up","down","left","right"];class dd extends fd{constructor(e={}){super({enable:!0,pointers:1,event:"pan",threshold:10,direction:J.All,trackpad:!1,coherent:[],...e}),this.trackpadGesture=!1,this.pX=null,this.pY=null}getTouchAction(){const{options:{direction:e}}=this,t=[];return e&J.Horizontal&&t.push(oa),e&J.Vertical&&t.push(ra),t}getEventNames(){return O2.map(e=>this.options.event+e)}directionTest(e){const{options:t}=this;let n=!0,{distance:s}=e,{direction:r}=e;const o=e.deltaX,a=e.deltaY;return r&t.direction||(t.direction&J.Horizontal?(r=o===0?J.None:o<0?J.Left:J.Right,n=o!==this.pX,s=Math.abs(e.deltaX)):(r=a===0?J.None:a<0?J.Up:J.Down,n=a!==this.pY,s=Math.abs(e.deltaY))),e.direction=r,n&&s>t.threshold&&!!(r&t.direction)}attrTest(e){const t=!!(this.state&I.Began),n=!(this.options.coherent?.length&&e.eventType&(N.End|N.Cancel));return super.attrTest(e)&&(t||n&&this.coherentTest(e)&&this.directionTest(e))}emit(e){this.pX=e.deltaX,this.pY=e.deltaY;const t=J[e.direction].toLowerCase();t&&(e.additionalEvent=this.options.event+t),super.emit(e)}handleTrackpadEvent(e){e.isFirst&&(this.trackpadGesture=!e.srcEvent.ctrlKey,!this.trackpadGesture&&this.state&(I.Recognized|I.Cancelled|I.Failed)&&(this.state=I.Possible)),this.trackpadGesture&&(this.recognize(this.getTrackpadInput(e,{deltaX:-e.deltaX,deltaY:-e.deltaY,velocity:-e.velocity,velocityX:-e.velocityX,velocityY:-e.velocityY,overallVelocity:-e.overallVelocity,overallVelocityX:-e.overallVelocityX,overallVelocityY:-e.overallVelocityY})),e.isFinal&&(this.trackpadGesture=!1))}}const B2=["","start","move","end","cancel","in","out"];class k2 extends fd{constructor(e={}){super({enable:!0,event:"pinch",threshold:0,pointers:2,trackpad:!1,coherent:[],...e}),this.trackpadGesture=!1}getTouchAction(){return[fs]}getEventNames(){return B2.map(e=>this.options.event+e)}attrTest(e){const t=!!this.options.coherent?.length,n=!!(this.state&I.Began),s=!(t&&e.eventType&(N.End|N.Cancel));return super.attrTest(e)&&(n||s&&(t?this.coherentTest(e):Math.abs(e.scale-1)>this.options.threshold))}emit(e){if(e.scale!==1){const t=e.scale<1?"in":"out";e.additionalEvent=this.options.event+t}super.emit(e)}handleTrackpadEvent(e){e.isFirst&&(this.trackpadGesture=e.srcEvent.ctrlKey,!this.trackpadGesture&&this.state&(I.Recognized|I.Cancelled|I.Failed)&&(this.state=I.Possible)),this.trackpadGesture&&(this.recognize(this.getTrackpadInput(e,{deltaX:0,deltaY:0,velocity:0,velocityX:0,velocityY:0,overallVelocity:0,overallVelocityX:0,overallVelocityY:0,scale:Math.exp(-e.deltaY/100)})),e.isFinal&&(this.trackpadGesture=!1))}}class hs{constructor(e,t,n){this.element=e,this.callback=t,this.options=n}listen(e,t){t?this.element.addEventListener(e,this.handleEvent,{passive:!1}):this.element.removeEventListener(e,this.handleEvent)}}const D2=(typeof navigator<"u"&&navigator.userAgent?navigator.userAgent.toLowerCase():"").indexOf("firefox")!==-1,F2=40,N2=.25;class z2 extends hs{constructor(e,t,n){n.enable=n.enable??!1,super(e,t,n),this.handleEvent=s=>{if(!this.options.enable)return;let r=s.deltaY;globalThis.WheelEvent&&(D2&&s.deltaMode===globalThis.WheelEvent.DOM_DELTA_PIXEL&&(r/=globalThis.devicePixelRatio),s.deltaMode===globalThis.WheelEvent.DOM_DELTA_LINE&&(r*=F2)),s.shiftKey&&r&&(r=r*N2),this.callback({type:"wheel",center:{x:s.clientX,y:s.clientY},delta:-r,device:this.options.wheelSession?.device??"unknown",srcEvent:s,pointerType:"mouse",target:s.target})},n.enable&&(this.wheelSessionUnsubscribe=this.options.wheelSession?.on(()=>{}),this.listen("wheel",!0))}destroy(){this.listen("wheel",!1),this.wheelSessionUnsubscribe?.(),this.wheelSessionUnsubscribe=void 0}enableEventType(e,t){e==="wheel"&&this.options.enable!==t&&(this.options.enable=t,t&&!this.wheelSessionUnsubscribe&&(this.wheelSessionUnsubscribe=this.options.wheelSession?.on(()=>{})),this.listen("wheel",t),t||(this.wheelSessionUnsubscribe?.(),this.wheelSessionUnsubscribe=void 0))}}const U2=4.000244140625,hd=40,$2=0,G2=1,V2=40,gd=40,j2=120,W2={classificationDelay:32,endDelay:80};class H2{constructor(e,t={}){this.subscriptions=new Map,this.session=null,this.classificationTimer=null,this.endTimer=null,this.pressedControlKeys=new Set,this.listeningForControlKeys=!1,this.handleEvent=n=>{if(!this.hasSubscribers)return"unknown";const s=q2(n,this.pressedControlKeys.size>0);let r=this.session;if(r&&s.timeStamp-r.lastTimeStamp>=this.options.endDelay){if(this.end(),!this.hasSubscribers)return"unknown";r=null}r?(this.scheduleEnd(),this.addSample(r,s)):(r=this.startPendingSession(s),this.scheduleEnd());let{device:o}=r;return o==="unknown"&&(o=ga(r.samples,!1),o!=="unknown"&&this.begin(r,o)),o},this.finishClassification=()=>{if(this.classificationTimer=null,!this.session||this.session.device!=="unknown")return;const n=this.session,s=ga(n.samples,!0);this.begin(n,s==="unknown"?"mouse":s)},this.end=()=>{if(!this.session)return;if(this.session.device==="unknown"){const s=this.session,r=ga(s.samples,!0);this.begin(s,r==="unknown"?"mouse":r)}if(!this.session)return;const n=this.session;this.emit(N.End,n.lastEvent),this.reset()},this.handleKeyDown=n=>{n.key==="Control"&&this.pressedControlKeys.add(n.code||n.key)},this.handleKeyUp=n=>{n.key==="Control"&&(n.code?this.pressedControlKeys.delete(n.code):this.pressedControlKeys.clear())},this.handleWindowBlur=()=>{this.pressedControlKeys.clear()},this.element=e,this.options={...W2,...t},this.element?.addEventListener("wheel",this.handleEvent,{passive:!0})}get hasSubscribers(){return this.subscriptions.size>0}get device(){return this.session?.device??"unknown"}on(e){const t={listener:e};return this.subscriptions.set(e,t),this.updateControlKeyEventListeners(),()=>{this.subscriptions.get(e)===t&&this.off(e)}}off(e){this.subscriptions.delete(e),this.updateControlKeyEventListeners(),this.hasSubscribers||this.reset()}cancel(){const e=this.session;e&&e.device!=="unknown"&&this.emit(N.Cancel,e.lastEvent),this.reset()}destroy(){this.cancel(),this.subscriptions.clear(),this.updateControlKeyEventListeners(),this.element?.removeEventListener("wheel",this.handleEvent)}startPendingSession(e){const t={samples:[e],device:"unknown",firstTimeStamp:e.timeStamp,lastTimeStamp:e.timeStamp,totalDeltaX:e.deltaX,totalDeltaY:e.deltaY,velocityX:0,velocityY:0,lastEvent:e.event};return this.session=t,this.classificationTimer=globalThis.setTimeout(this.finishClassification,this.options.classificationDelay),t}addSample(e,t){if(e.samples.push(t),e.lastTimeStamp=t.timeStamp,e.lastEvent=t.event,e.totalDeltaX+=t.deltaX,e.totalDeltaY+=t.deltaY,e.device!=="unknown"){const n=e.samples[e.samples.length-2],s=t.timeStamp-n.timeStamp;e.velocityX=s>0?t.deltaX/s:0,e.velocityY=s>0?t.deltaY/s:0,this.emit(N.Move,t.event,{velocityX:e.velocityX,velocityY:e.velocityY})}}begin(e,t){e.device=t,this.clearClassificationTimer(),this.emit(N.Start,e.samples[0].event);const n=e.lastTimeStamp-e.firstTimeStamp;e.velocityX=n>0?e.totalDeltaX/n:0,e.velocityY=n>0?e.totalDeltaY/n:0,this.emit(N.Move,e.lastEvent,{velocityX:e.velocityX,velocityY:e.velocityY})}scheduleEnd(){this.clearEndTimer(),this.endTimer=globalThis.setTimeout(this.end,this.options.endDelay)}emit(e,t,n){const s=this.session;if(!s||s.device==="unknown")return;const r=e===N.Start,o=e===N.End||e===N.Cancel,a=r?s.firstTimeStamp:s.lastTimeStamp,c=r?0:Math.max(0,a-s.firstTimeStamp),l=r?0:s.totalDeltaX,u=r?0:s.totalDeltaY,f=c>0?l/c:0,d=c>0?u/c:0,g=r?0:n?.velocityX??s.velocityX,p=r?0:n?.velocityY??s.velocityY,m={eventType:e,device:s.device,srcEvent:t,timeStamp:a,center:{x:t.clientX,y:t.clientY},deltaX:l,deltaY:u,deltaTime:c,velocity:Math.abs(g)>Math.abs(p)?g:p,velocityX:g,velocityY:p,overallVelocity:Math.abs(f)>Math.abs(d)?f:d,overallVelocityX:f,overallVelocityY:d,isFirst:r,isFinal:o};for(const{listener:y}of[...this.subscriptions.values()])y(m)}reset(){this.clearClassificationTimer(),this.clearEndTimer(),this.session=null}clearClassificationTimer(){this.classificationTimer!==null&&(globalThis.clearTimeout(this.classificationTimer),this.classificationTimer=null)}clearEndTimer(){this.endTimer!==null&&(globalThis.clearTimeout(this.endTimer),this.endTimer=null)}updateControlKeyEventListeners(){const e=this.hasSubscribers,t=Y2();!t||e===this.listeningForControlKeys||(this.listeningForControlKeys=e,e?(t.addEventListener("keydown",this.handleKeyDown,!0),t.addEventListener("keyup",this.handleKeyUp,!0),t.addEventListener("blur",this.handleWindowBlur)):(t.removeEventListener("keydown",this.handleKeyDown,!0),t.removeEventListener("keyup",this.handleKeyUp,!0),t.removeEventListener("blur",this.handleWindowBlur),this.pressedControlKeys.clear()))}}function Y2(){return typeof window<"u"?window:globalThis.document?.defaultView}function q2(i,e){let t=i.deltaX,n=i.deltaY;return i.deltaMode===G2&&(t*=hd,n*=hd),{event:i,timeStamp:i.timeStamp,deltaX:t,deltaY:n,isControlKeyDown:e}}function ga(i,e){return i.some(({event:t,isControlKeyDown:n})=>t.ctrlKey&&!n)?"trackpad":i.some(({event:t})=>t.deltaMode!==$2)||i.some(X2)||i.every(({event:t})=>{const n=t.wheelDelta;return n!==void 0&&Math.abs(n)%40===0})?"mouse":i.some(({deltaX:t})=>t!==0)||i.length>1&&Z2(i)?"trackpad":e?"mouse":"unknown"}function X2({event:i,deltaX:e,deltaY:t}){if(e!==0||t===0)return!1;const n=Math.abs(t/U2);if(Number.isInteger(n))return!0;const s=i.wheelDelta;return typeof s=="number"&&s!==0&&s%j2===0}function Z2(i){for(let e=0;e<i.length;e++){const t=i[e];if(Math.abs(t.deltaX)>gd||Math.abs(t.deltaY)>gd||e>0&&t.timeStamp-i[e-1].timeStamp>V2)return!1}return!0}const pd=["mousedown","mousemove","mouseup","mouseover","mouseout","mouseenter","mouseleave"];class K2 extends hs{constructor(e,t,n){super(e,t,{enable:!0,...n}),this.handleEvent=r=>{this.handleOverEvent(r),this.handleOutEvent(r),this.handleEnterEvent(r),this.handleLeaveEvent(r),this.handleMoveEvent(r)},this.pressed=!1;const{enable:s=!1}=this.options;this.enableMoveEvent=s,this.enableLeaveEvent=s,this.enableEnterEvent=s,this.enableOutEvent=s,this.enableOverEvent=s,s&&pd.forEach(r=>this.listen(r,!0))}destroy(){pd.forEach(e=>this.listen(e,!1))}enableEventType(e,t){switch(e){case"pointermove":this.enableMoveEvent!==t&&(this.enableMoveEvent=t,this.listen("mousedown",t),this.listen("mousemove",t),this.listen("mouseup",t));break;case"pointerover":this.enableOverEvent!==t&&(this.enableOverEvent=t,this.listen("mouseover",t));break;case"pointerout":this.enableOutEvent!==t&&(this.enableOutEvent=t,this.listen("mouseout",t));break;case"pointerenter":this.enableEnterEvent!==t&&(this.enableEnterEvent=t,this.listen("mouseenter",t));break;case"pointerleave":this.enableLeaveEvent!==t&&(this.enableLeaveEvent=t,this.listen("mouseleave",t));break}}handleOverEvent(e){this.enableOverEvent&&e.type==="mouseover"&&this._emit("pointerover",e)}handleOutEvent(e){this.enableOutEvent&&e.type==="mouseout"&&this._emit("pointerout",e)}handleEnterEvent(e){this.enableEnterEvent&&e.type==="mouseenter"&&this._emit("pointerenter",e)}handleLeaveEvent(e){this.enableLeaveEvent&&e.type==="mouseleave"&&this._emit("pointerleave",e)}handleMoveEvent(e){if(this.enableMoveEvent)switch(e.type){case"mousedown":e.button>=0&&(this.pressed=!0);break;case"mousemove":e.buttons===0&&(this.pressed=!1),this.pressed||this._emit("pointermove",e);break;case"mouseup":this.pressed=!1;break}}_emit(e,t){this.callback({type:e,center:{x:t.clientX,y:t.clientY},srcEvent:t,pointerType:"mouse",target:t.target})}}const md=["keydown","keyup"];class Q2 extends hs{constructor(e,t,n){super(e,t,{enable:!0,tabIndex:0,...n}),this.handleEvent=r=>{const o=r.target||r.srcElement;o.tagName==="INPUT"&&o.type==="text"||o.tagName==="TEXTAREA"||(this.enableDownEvent&&r.type==="keydown"&&this.callback({type:"keydown",srcEvent:r,key:r.key,target:r.target}),this.enableUpEvent&&r.type==="keyup"&&this.callback({type:"keyup",srcEvent:r,key:r.key,target:r.target}))};const{enable:s=!1}=this.options;this.enableDownEvent=s,this.enableUpEvent=s,e.tabIndex=this.options.tabIndex,e.style.outline="none",s&&md.forEach(r=>this.listen(r,!0))}destroy(){md.forEach(e=>this.listen(e,!1))}enableEventType(e,t){e==="keydown"&&this.enableDownEvent!==t&&(this.enableDownEvent=t,this.listen(e,t)),e==="keyup"&&this.enableUpEvent!==t&&(this.enableUpEvent=t,this.listen(e,t))}}class J2 extends hs{constructor(e,t,n){n.enable=n.enable??!1,super(e,t,n),this.handleEvent=s=>{this.options.enable&&this.callback({type:"contextmenu",center:{x:s.clientX,y:s.clientY},srcEvent:s,pointerType:"mouse",target:s.target})},n.enable&&this.listen("contextmenu",!0)}destroy(){this.listen("contextmenu",!1)}enableEventType(e,t){e==="contextmenu"&&this.options.enable!==t&&(this.options.enable=t,this.listen("contextmenu",t))}}const yd=1,pa=2,bd=4,eP={pointerdown:yd,pointermove:pa,pointerup:bd,mousedown:yd,mousemove:pa,mouseup:bd},tP=0,iP=1,nP=2,sP=1,rP=2,oP=4;function aP(i){const e=eP[i.srcEvent.type];if(!e)return null;const{buttons:t,button:n}=i.srcEvent;let s=!1,r=!1,o=!1;return e===pa?(s=!!(t&sP),r=!!(t&oP),o=!!(t&rP)):(s=n===tP,r=n===iP,o=n===nP),{leftButton:s,middleButton:r,rightButton:o}}function cP(i,e){const t=i.center;if(!t)return null;const n=e.getBoundingClientRect(),s=n.width/e.offsetWidth||1,r=n.height/e.offsetHeight||1,o={x:(t.x-n.left-e.clientLeft)/s,y:(t.y-n.top-e.clientTop)/r};return{center:t,offsetCenter:o}}const lP={srcElement:"root",priority:0};class uP{constructor(e,t){this.handleEvent=n=>{if(this.isEmpty())return;const s=this._normalizeEvent(n);let r=n.srcEvent.target;for(;r&&r!==s.rootElement;){if(this._emit(s,r),s.handled)return;r=r.parentNode}this._emit(s,"root")},this.eventManager=e,this.recognizerName=t,this.handlers=[],this.handlersByElement=new Map,this._active=!1}isEmpty(){return!this._active}add(e,t,n,s=!1,r=!1){const{handlers:o,handlersByElement:a}=this,c={...lP,...n};let l=a.get(c.srcElement);l||(l=[],a.set(c.srcElement,l));const u={type:e,handler:t,srcElement:c.srcElement,priority:c.priority};s&&(u.once=!0),r&&(u.passive=!0),o.push(u),this._active=this._active||!u.passive;let f=l.length-1;for(;f>=0&&!(l[f].priority>=u.priority);)f--;l.splice(f+1,0,u)}remove(e,t){const{handlers:n,handlersByElement:s}=this;for(let r=n.length-1;r>=0;r--){const o=n[r];if(o.type===e&&o.handler===t){n.splice(r,1);const a=s.get(o.srcElement);a.splice(a.indexOf(o),1),a.length===0&&s.delete(o.srcElement)}}this._active=n.some(r=>!r.passive)}_emit(e,t){const n=this.handlersByElement.get(t);if(n){let s=!1;const r=()=>{e.handled=!0},o=()=>{e.handled=!0,s=!0},a=[];for(let c=0;c<n.length;c++){const{type:l,handler:u,once:f}=n[c];if(u({...e,type:l,stopPropagation:r,stopImmediatePropagation:o}),f&&a.push(n[c]),s)break}for(let c=0;c<a.length;c++){const{type:l,handler:u}=a[c];this.remove(l,u)}}}_normalizeEvent(e){const t=this.eventManager.getElement();return{...e,...aP(e),...cP(e,t),preventDefault:()=>{e.srcEvent.preventDefault()},stopImmediatePropagation:null,stopPropagation:null,handled:!1,rootElement:t}}}function fP(i){if("recognizer"in i)return i;let e;const t=Array.isArray(i)?[...i]:[i];if(typeof t[0]=="function"){const n=t.shift(),s=t.shift()||{};e=new n(s)}else e=t.shift();return{recognizer:e,recognizeWith:typeof t[0]=="string"?[t[0]]:t[0],requireFailure:typeof t[1]=="string"?[t[1]]:t[1]}}class dP{constructor(e=null,t={}){if(this._onBasicInput=n=>{this.manager.emit(n.srcEvent.type,n)},this._onOtherEvent=n=>{this.manager.emit(n.type,n)},this.options={recognizers:[],events:{},touchAction:"compute",tabIndex:0,cssProps:{},...t},this.events=new Map,this.element=e,this.wheelSession=new H2(e),!!e){this.manager=new E2(e,this.options);for(const n of this.options.recognizers){const{recognizer:s,recognizeWith:r,requireFailure:o}=fP(n);this.manager.add(s),r&&s.recognizeWith(r),o&&s.requireFailure(o)}this.manager.on("hammer.input",this._onBasicInput),this.wheelInput=new z2(e,this._onOtherEvent,{enable:!1,wheelSession:this.wheelSession}),this.moveInput=new K2(e,this._onOtherEvent,{enable:!1}),this.keyInput=new Q2(e,this._onOtherEvent,{enable:!1,tabIndex:t.tabIndex}),this.contextmenuInput=new J2(e,this._onOtherEvent,{enable:!1}),this.on(this.options.events)}}getElement(){return this.element}destroy(){if(!this.element){this.wheelSession.destroy();return}this.wheelInput.destroy(),this.wheelSession.destroy(),this.moveInput.destroy(),this.keyInput.destroy(),this.contextmenuInput.destroy(),this.manager.destroy()}on(e,t,n){this._addEventHandler(e,t,n,!1)}once(e,t,n){this._addEventHandler(e,t,n,!0)}watch(e,t,n){this._addEventHandler(e,t,n,!1,!0)}off(e,t){this._removeEventHandler(e,t)}emit(e){this.manager?.emit(e.type,e)}_toggleRecognizer(e,t){const{manager:n}=this;if(!n)return;const s=n.get(e);s&&(s.set({enable:t,wheelSession:this.wheelSession}),n.touchAction.update()),this.wheelInput?.enableEventType(e,t),this.moveInput?.enableEventType(e,t),this.keyInput?.enableEventType(e,t),this.contextmenuInput?.enableEventType(e,t)}_addEventHandler(e,t,n,s,r){if(typeof e!="string"){n=t;for(const[l,u]of Object.entries(e))this._addEventHandler(l,u,n,s,r);return}const{manager:o,events:a}=this;if(!o)return;let c=a.get(e);if(!c){const l=this._getRecognizerName(e)||e;c=new uP(this,l),a.set(e,c),o&&o.on(e,c.handleEvent)}c.add(e,t,n,s,r),c.isEmpty()||this._toggleRecognizer(c.recognizerName,!0)}_removeEventHandler(e,t){if(typeof e!="string"){for(const[r,o]of Object.entries(e))this._removeEventHandler(r,o);return}const{events:n}=this,s=n.get(e);if(s&&(s.remove(e,t),s.isEmpty())){const{recognizerName:r}=s;let o=!1;for(const a of n.values())if(a.recognizerName===r&&!a.isEmpty()){o=!0;break}o||this._toggleRecognizer(r,!1)}}_getRecognizerName(e){return this.manager.recognizers.find(t=>t.getEventNames().includes(e))?.options.event}}const le={WEB_MERCATOR:1,GLOBE:2,WEB_MERCATOR_AUTO_OFFSET:4,IDENTITY:0},xe={common:0,meters:1,pixels:2},gs={click:"onClick",dblclick:"onClick",panstart:"onDragStart",panmove:"onDrag",panend:"onDragEnd"},_d={multipan:[dd,{threshold:10,pointers:2,trackpad:!0}],pinch:[k2,{trackpad:!0},null,["multipan"]],pan:[dd,{threshold:1},["pinch"],["multipan"]],dblclick:[ud,{event:"dblclick",taps:2,enable:!1}],dblclickdrag:[R2,{event:"dblclickdrag",enable:!1},["dblclick"],null],click:[ud,{event:"click"},["dblclickdrag"],["dblclick","dblclickdrag"]]};function hP(i,e){if(i===e)return!0;if(Array.isArray(i)){const t=i.length;if(!e||e.length!==t)return!1;for(let n=0;n<t;n++)if(i[n]!==e[n])return!1;return!0}return!1}function Ii(i){let e={},t;return n=>{for(const s in n)if(!hP(n[s],e[s])){t=i(n),e=n;break}return t}}const vd=[0,0,0,0],gP=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0],xd=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],pP=[0,0,0],wd=[0,0,0],mP={default:-1,cartesian:0,lnglat:1,"meter-offsets":2,"lnglat-offsets":3};function ps(i){const e=mP[i];if(e===void 0)throw new Error(`Invalid coordinateSystem: ${i}`);return e}const yP=Ii(vP);function Pd(i,e,t=wd){t.length<3&&(t=[t[0],t[1],0]);let n=t,s,r=!0;switch(e==="lnglat-offsets"||e==="meter-offsets"?s=t:s=i.isGeospatial?[Math.fround(i.longitude),Math.fround(i.latitude),0]:null,i.projectionMode){case le.WEB_MERCATOR:(e==="lnglat"||e==="cartesian")&&(s=[0,0,0],r=!1);break;case le.WEB_MERCATOR_AUTO_OFFSET:e==="lnglat"?n=s:e==="cartesian"&&(n=[Math.fround(i.center[0]),Math.fround(i.center[1]),0],s=i.unprojectPosition(n),n[0]-=t[0],n[1]-=t[1],n[2]-=t[2]);break;case le.IDENTITY:n=i.position.map(Math.fround),n[2]=n[2]||0;break;case le.GLOBE:r=!1,s=null;break;default:r=!1}return{geospatialOrigin:s,shaderCoordinateOrigin:n,offsetMode:r}}function bP(i,e,t){const{viewMatrixUncentered:n,projectionMatrix:s}=i;let{viewMatrix:r,viewProjectionMatrix:o}=i,a=vd,c=vd,l=i.cameraPosition;const{geospatialOrigin:u,shaderCoordinateOrigin:f,offsetMode:d}=Pd(i,e,t);return d&&(c=i.projectPosition(u||f),l=[l[0]-c[0],l[1]-c[1],l[2]-c[2]],c[3]=1,a=Ai([],c,o),r=n||r,o=yt([],s,r),o=yt([],o,gP)),{viewMatrix:r,viewProjectionMatrix:o,projectionCenter:a,originCommon:c,cameraPosCommon:l,shaderCoordinateOrigin:f,geospatialOrigin:u}}function _P({viewport:i,devicePixelRatio:e=1,modelMatrix:t=null,coordinateSystem:n="default",coordinateOrigin:s=wd,autoWrapLongitude:r=!1}){n==="default"&&(n=i.isGeospatial?"lnglat":"cartesian");const o=yP({viewport:i,devicePixelRatio:e,coordinateSystem:n,coordinateOrigin:s});return o.wrapLongitude=r,o.modelMatrix=t||xd,o}function vP({viewport:i,devicePixelRatio:e,coordinateSystem:t,coordinateOrigin:n}){const{projectionCenter:s,viewProjectionMatrix:r,originCommon:o,cameraPosCommon:a,shaderCoordinateOrigin:c,geospatialOrigin:l}=bP(i,t,n),u=i.getDistanceScales(),f=[i.width*e,i.height*e],d=Ai([],[0,0,-i.focalDistance,1],i.projectionMatrix)[3]||1,g={coordinateSystem:ps(t),projectionMode:i.projectionMode,coordinateOrigin:c,commonOrigin:o.slice(0,3),center:s,pseudoMeters:!!i._pseudoMeters,viewportSize:f,devicePixelRatio:e,focalDistance:d,commonUnitsPerMeter:u.unitsPerMeter,commonUnitsPerWorldUnit:u.unitsPerMeter,commonUnitsPerWorldUnit2:pP,scale:i.scale,wrapLongitude:!1,viewProjectionMatrix:r,modelMatrix:xd,cameraPosition:a};if(l){const p=i.getDistanceScales(l);switch(t){case"meter-offsets":g.commonUnitsPerWorldUnit=p.unitsPerMeter,g.commonUnitsPerWorldUnit2=p.unitsPerMeter2;break;case"lnglat":case"lnglat-offsets":i._pseudoMeters||(g.commonUnitsPerMeter=p.unitsPerMeter),g.commonUnitsPerWorldUnit=p.unitsPerDegree,g.commonUnitsPerWorldUnit2=p.unitsPerDegree2;break;case"cartesian":g.commonUnitsPerWorldUnit=[1,1,p.unitsPerMeter[2]],g.commonUnitsPerWorldUnit2=[0,0,p.unitsPerMeter2[2]];break}}if(i.projectionMode===le.GLOBE&&t==="meter-offsets"){const y=n[0]*Math.PI/180,_=n[1]*Math.PI/180,v=Math.cos(_),b=((n[2]||0)/6370972+1)*256;g.commonOrigin=[Math.sin(y)*v*b,-Math.cos(y)*v*b,Math.sin(_)*b]}return g}const xP=["default","lnglat","meter-offsets","lnglat-offsets","cartesian"].map(i=>`const COORDINATE_SYSTEM_${i.toUpperCase().replaceAll("-","_")}: i32 = ${ps(i)};`).join(""),wP=Object.keys(le).map(i=>`const PROJECTION_MODE_${i}: i32 = ${le[i]};`).join(""),PP=Object.keys(xe).map(i=>`const UNIT_${i.toUpperCase()}: i32 = ${xe[i]};`).join(""),SP=`${`${xP}
${wP}
${PP}

const TILE_SIZE: f32 = 512.0;
const PI: f32 = 3.1415926536;
const WORLD_SCALE: f32 = TILE_SIZE / (PI * 2.0);
const ZERO_64_LOW: vec3<f32> = vec3<f32>(0.0, 0.0, 0.0);
const EARTH_RADIUS: f32 = 6370972.0; // meters
const GLOBE_RADIUS: f32 = 256.0;

// -----------------------------------------------------------------------------
// Uniform block (converted from GLSL uniform block)
// -----------------------------------------------------------------------------
struct ProjectUniforms {
  wrapLongitude: i32,
  coordinateSystem: i32,
  commonUnitsPerMeter: vec3<f32>,
  projectionMode: i32,
  scale: f32,
  commonUnitsPerWorldUnit: vec3<f32>,
  commonUnitsPerWorldUnit2: vec3<f32>,
  center: vec4<f32>,
  modelMatrix: mat4x4<f32>,
  viewProjectionMatrix: mat4x4<f32>,
  viewportSize: vec2<f32>,
  devicePixelRatio: f32,
  focalDistance: f32,
  cameraPosition: vec3<f32>,
  coordinateOrigin: vec3<f32>,
  commonOrigin: vec3<f32>,
  pseudoMeters: i32,
};

@group(0) @binding(auto)
var<uniform> project: ProjectUniforms;

// -----------------------------------------------------------------------------
// Geometry data shared across the project helpers.
// The active layer shader is responsible for populating this private module
// state before calling the project functions below.
// -----------------------------------------------------------------------------

// Structure to carry additional geometry data used by deck.gl filters.
struct Geometry {
  worldPosition: vec3<f32>,
  worldPositionAlt: vec3<f32>,
  position: vec4<f32>,
  normal: vec3<f32>,
  uv: vec2<f32>,
  pickingColor: vec3<f32>,
};

var<private> geometry: Geometry;
`}

// -----------------------------------------------------------------------------
// Functions
// -----------------------------------------------------------------------------

// Returns an adjustment factor for commonUnitsPerMeter
fn _project_size_at_latitude(lat: f32) -> f32 {
  let y = clamp(lat, -89.9, 89.9);
  return 1.0 / cos(radians(y));
}

// Overloaded version: scales a value in meters at a given latitude.
fn _project_size_at_latitude_m(meters: f32, lat: f32) -> f32 {
  return meters * project.commonUnitsPerMeter.z * _project_size_at_latitude(lat);
}

// Computes a non-linear scale factor based on geometry.
// (Note: This function relies on "geometry" being provided.)
fn project_size() -> f32 {
  if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR &&
      project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT &&
      project.pseudoMeters == 0) {
    if (geometry.position.w == 0.0) {
      return _project_size_at_latitude(geometry.worldPosition.y);
    }
    let y: f32 = geometry.position.y / TILE_SIZE * 2.0 - 1.0;
    let y2 = y * y;
    let y4 = y2 * y2;
    let y6 = y4 * y2;
    return 1.0 + 4.9348 * y2 + 4.0587 * y4 + 1.5642 * y6;
  }
  return 1.0;
}

// Overloads to scale offsets (meters to world units)
fn project_size_float(meters: f32) -> f32 {
  return meters * project.commonUnitsPerMeter.z * project_size();
}

fn project_size_vec2(meters: vec2<f32>) -> vec2<f32> {
  return meters * project.commonUnitsPerMeter.xy * project_size();
}

fn project_size_vec3(meters: vec3<f32>) -> vec3<f32> {
  return meters * project.commonUnitsPerMeter * project_size();
}

fn project_size_vec4(meters: vec4<f32>) -> vec4<f32> {
  return vec4<f32>(meters.xyz * project.commonUnitsPerMeter, meters.w);
}

// Returns a rotation matrix aligning the z‑axis with the given up vector.
fn project_get_orientation_matrix(up: vec3<f32>) -> mat3x3<f32> {
  let uz = normalize(up);
  let ux = select(
    vec3<f32>(1.0, 0.0, 0.0),
    normalize(vec3<f32>(uz.y, -uz.x, 0.0)),
    abs(uz.z) == 1.0
  );
  let uy = cross(uz, ux);
  return mat3x3<f32>(ux, uy, uz);
}

// Since WGSL does not support "out" parameters, we return a struct.
struct RotationResult {
  needsRotation: bool,
  transform: mat3x3<f32>,
};

fn project_needs_rotation(commonPosition: vec3<f32>) -> RotationResult {
  if (project.projectionMode == PROJECTION_MODE_GLOBE) {
    return RotationResult(true, project_get_orientation_matrix(commonPosition));
  } else {
    return RotationResult(false, mat3x3<f32>());  // identity alternative if needed
  };
}

// Projects a normal vector from the current coordinate system to world space.
fn project_normal(vector: vec3<f32>) -> vec3<f32> {
  let normal_modelspace = project.modelMatrix * vec4<f32>(vector, 0.0);
  var n = normalize(normal_modelspace.xyz * project.commonUnitsPerMeter);
  let rotResult = project_needs_rotation(geometry.position.xyz);
  if (rotResult.needsRotation) {
    n = rotResult.transform * n;
  }
  return n;
}

// Applies a scale offset based on y-offset (dy)
fn project_offset_(offset: vec4<f32>) -> vec4<f32> {
  let dy: f32 = offset.y;
  let commonUnitsPerWorldUnit = project.commonUnitsPerWorldUnit + project.commonUnitsPerWorldUnit2 * dy;
  return vec4<f32>(offset.xyz * commonUnitsPerWorldUnit, offset.w);
}

// Projects lng/lat coordinates to a unit tile [0,1]
fn project_mercator_(lnglat: vec2<f32>) -> vec2<f32> {
  var x = lnglat.x;
  if (project.wrapLongitude != 0) {
    x = ((x + 180.0) % 360.0) - 180.0;
  }
  let y = clamp(lnglat.y, -89.9, 89.9);
  return vec2<f32>(
    radians(x) + PI,
    PI + log(tan_fp32(PI * 0.25 + radians(y) * 0.5))
  ) * WORLD_SCALE;
}

// Projects lng/lat/z coordinates for a globe projection.
fn project_globe_(lnglatz: vec3<f32>) -> vec3<f32> {
  let lambda = radians(lnglatz.x);
  let phi = radians(lnglatz.y);
  let cosPhi = cos(phi);
  let D = (lnglatz.z / EARTH_RADIUS + 1.0) * GLOBE_RADIUS;
  return vec3<f32>(
    sin(lambda) * cosPhi,
    -cos(lambda) * cosPhi,
    sin(phi)
  ) * D;
}

// Projects positions (with an optional 64-bit low part) from the input
// coordinate system to the common space.
fn project_position_vec4_f64(position: vec4<f32>, position64Low: vec3<f32>) -> vec4<f32> {
  var position_world = project.modelMatrix * position;

  // Work around for a Mac+NVIDIA bug:
  if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR) {
    if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
      return vec4<f32>(
        project_mercator_(position_world.xy),
        _project_size_at_latitude_m(position_world.z, position_world.y),
        position_world.w
      );
    }
    if (project.coordinateSystem == COORDINATE_SYSTEM_CARTESIAN) {
      position_world = vec4f(position_world.xyz + project.coordinateOrigin, position_world.w);
    }
  }
  if (project.projectionMode == PROJECTION_MODE_GLOBE) {
    if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
      return vec4<f32>(
        project_globe_(position_world.xyz),
        position_world.w
      );
    }
    if (project.coordinateSystem == COORDINATE_SYSTEM_METER_OFFSETS) {
      let enuMatrix = project_get_orientation_matrix(project.commonOrigin);
      let metersToCommon = GLOBE_RADIUS / EARTH_RADIUS;
      let offsetCommon = (enuMatrix * vec3<f32>(-position_world.x, -position_world.y, position_world.z)) * metersToCommon;
      return vec4<f32>(project.commonOrigin + offsetCommon, position_world.w);
    }
  }
  if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR_AUTO_OFFSET) {
    if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
      if (abs(position_world.y - project.coordinateOrigin.y) > 0.25) {
        return vec4<f32>(
          project_mercator_(position_world.xy) - project.commonOrigin.xy,
          project_size_float(position_world.z),
          position_world.w
        );
      }
    }
  }
  if (project.projectionMode == PROJECTION_MODE_IDENTITY ||
      (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR_AUTO_OFFSET &&
       (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT ||
        project.coordinateSystem == COORDINATE_SYSTEM_CARTESIAN))) {
    position_world = vec4f(position_world.xyz - project.coordinateOrigin, position_world.w);
  }

  return project_offset_(position_world) +
         project_offset_(project.modelMatrix * vec4<f32>(position64Low, 0.0));
}

// Overloaded versions for different input types.
fn project_position_vec4_f32(position: vec4<f32>) -> vec4<f32> {
  return project_position_vec4_f64(position, ZERO_64_LOW);
}

fn project_position_vec3_f64(position: vec3<f32>, position64Low: vec3<f32>) -> vec3<f32> {
  let projected_position = project_position_vec4_f64(vec4<f32>(position, 1.0), position64Low);
  return projected_position.xyz;
}

fn project_position_vec3_f32(position: vec3<f32>) -> vec3<f32> {
  let projected_position = project_position_vec4_f64(vec4<f32>(position, 1.0), ZERO_64_LOW);
  return projected_position.xyz;
}

fn project_position_vec2_f32(position: vec2<f32>) -> vec2<f32> {
  let projected_position = project_position_vec4_f64(vec4<f32>(position, 0.0, 1.0), ZERO_64_LOW);
  return projected_position.xy;
}

// Transforms a common space position to clip space.
fn project_common_position_to_clipspace_with_projection(position: vec4<f32>, viewProjectionMatrix: mat4x4<f32>, center: vec4<f32>) -> vec4<f32> {
  var clipPosition = viewProjectionMatrix * position + center;
  // deck.gl projection matrices use WebGL's [-w, w] depth range; WebGPU clips z to [0, w].
  clipPosition.z = (clipPosition.z + clipPosition.w) * 0.5;
  return clipPosition;
}

// Uses the project viewProjectionMatrix and center.
fn project_common_position_to_clipspace(position: vec4<f32>) -> vec4<f32> {
  return project_common_position_to_clipspace_with_projection(position, project.viewProjectionMatrix, project.center);
}

// Returns a clip space offset corresponding to a given number of screen pixels.
fn project_pixel_size_to_clipspace(pixels: vec2<f32>) -> vec2<f32> {
  let offset = pixels / project.viewportSize * project.devicePixelRatio * 2.0;
  return offset * project.focalDistance;
}

fn project_meter_size_to_pixel(meters: f32) -> f32 {
  return project_size_float(meters) * project.scale;
}

fn project_unit_size_to_pixel(size: f32, unit: i32) -> f32 {
  if (unit == UNIT_METERS) {
    return project_meter_size_to_pixel(size);
  } else if (unit == UNIT_COMMON) {
    return size * project.scale;
  }
  // UNIT_PIXELS: no scaling applied.
  return size;
}

fn project_pixel_size_float(pixels: f32) -> f32 {
  return pixels / project.scale;
}

fn project_pixel_size_vec2(pixels: vec2<f32>) -> vec2<f32> {
  return pixels / project.scale;
}
`,EP=["default","lnglat","meter-offsets","lnglat-offsets","cartesian"].map(i=>`const int COORDINATE_SYSTEM_${i.toUpperCase().replaceAll("-","_")} = ${ps(i)};`).join(""),CP=Object.keys(le).map(i=>`const int PROJECTION_MODE_${i} = ${le[i]};`).join(""),LP=Object.keys(xe).map(i=>`const int UNIT_${i.toUpperCase()} = ${xe[i]};`).join(""),TP=`${EP}
${CP}
${LP}
layout(std140) uniform projectUniforms {
bool wrapLongitude;
int coordinateSystem;
vec3 commonUnitsPerMeter;
int projectionMode;
float scale;
vec3 commonUnitsPerWorldUnit;
vec3 commonUnitsPerWorldUnit2;
vec4 center;
mat4 modelMatrix;
mat4 viewProjectionMatrix;
vec2 viewportSize;
float devicePixelRatio;
float focalDistance;
vec3 cameraPosition;
vec3 coordinateOrigin;
vec3 commonOrigin;
bool pseudoMeters;
} project;
const float TILE_SIZE = 512.0;
const float PI = 3.1415926536;
const float WORLD_SCALE = TILE_SIZE / (PI * 2.0);
const vec3 ZERO_64_LOW = vec3(0.0);
const float EARTH_RADIUS = 6370972.0;
const float GLOBE_RADIUS = 256.0;
float project_size_at_latitude(float lat) {
float y = clamp(lat, -89.9, 89.9);
return 1.0 / cos(radians(y));
}
float project_size() {
if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR &&
project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT &&
project.pseudoMeters == false) {
if (geometry.position.w == 0.0) {
return project_size_at_latitude(geometry.worldPosition.y);
}
float y = geometry.position.y / TILE_SIZE * 2.0 - 1.0;
float y2 = y * y;
float y4 = y2 * y2;
float y6 = y4 * y2;
return 1.0 + 4.9348 * y2 + 4.0587 * y4 + 1.5642 * y6;
}
return 1.0;
}
float project_size_at_latitude(float meters, float lat) {
return meters * project.commonUnitsPerMeter.z * project_size_at_latitude(lat);
}
float project_size(float meters) {
return meters * project.commonUnitsPerMeter.z * project_size();
}
vec2 project_size(vec2 meters) {
return meters * project.commonUnitsPerMeter.xy * project_size();
}
vec3 project_size(vec3 meters) {
return meters * project.commonUnitsPerMeter * project_size();
}
vec4 project_size(vec4 meters) {
return vec4(meters.xyz * project.commonUnitsPerMeter, meters.w);
}
mat3 project_get_orientation_matrix(vec3 up) {
vec3 uz = normalize(up);
vec3 ux = abs(uz.z) == 1.0 ? vec3(1.0, 0.0, 0.0) : normalize(vec3(uz.y, -uz.x, 0));
vec3 uy = cross(uz, ux);
return mat3(ux, uy, uz);
}
bool project_needs_rotation(vec3 commonPosition, out mat3 transform) {
if (project.projectionMode == PROJECTION_MODE_GLOBE) {
transform = project_get_orientation_matrix(commonPosition);
return true;
}
return false;
}
vec3 project_normal(vec3 vector) {
vec4 normal_modelspace = project.modelMatrix * vec4(vector, 0.0);
vec3 n = normalize(normal_modelspace.xyz * project.commonUnitsPerMeter);
mat3 rotation;
if (project_needs_rotation(geometry.position.xyz, rotation)) {
n = rotation * n;
}
return n;
}
vec4 project_offset_(vec4 offset) {
float dy = offset.y;
vec3 commonUnitsPerWorldUnit = project.commonUnitsPerWorldUnit + project.commonUnitsPerWorldUnit2 * dy;
return vec4(offset.xyz * commonUnitsPerWorldUnit, offset.w);
}
vec2 project_mercator_(vec2 lnglat) {
float x = lnglat.x;
if (project.wrapLongitude) {
x = mod(x + 180., 360.0) - 180.;
}
float y = clamp(lnglat.y, -89.9, 89.9);
return vec2(
radians(x) + PI,
PI + log(tan_fp32(PI * 0.25 + radians(y) * 0.5))
) * WORLD_SCALE;
}
vec3 project_globe_(vec3 lnglatz) {
float lambda = radians(lnglatz.x);
float phi = radians(lnglatz.y);
float cosPhi = cos(phi);
float D = (lnglatz.z / EARTH_RADIUS + 1.0) * GLOBE_RADIUS;
return vec3(
sin(lambda) * cosPhi,
-cos(lambda) * cosPhi,
sin(phi)
) * D;
}
vec4 project_position(vec4 position, vec3 position64Low) {
vec4 position_world = project.modelMatrix * position;
if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR) {
if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
return vec4(
project_mercator_(position_world.xy),
project_size_at_latitude(position_world.z, position_world.y),
position_world.w
);
}
if (project.coordinateSystem == COORDINATE_SYSTEM_CARTESIAN) {
position_world.xyz += project.coordinateOrigin;
}
}
if (project.projectionMode == PROJECTION_MODE_GLOBE) {
if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
return vec4(
project_globe_(position_world.xyz),
position_world.w
);
}
if (project.coordinateSystem == COORDINATE_SYSTEM_METER_OFFSETS) {
mat3 enuMatrix = project_get_orientation_matrix(project.commonOrigin);
float metersToCommon = GLOBE_RADIUS / EARTH_RADIUS;
vec3 offsetCommon = (enuMatrix * vec3(-position_world.xy, position_world.z)) * metersToCommon;
return vec4(project.commonOrigin + offsetCommon, position_world.w);
}
}
if (project.projectionMode == PROJECTION_MODE_WEB_MERCATOR_AUTO_OFFSET) {
if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT) {
if (abs(position_world.y - project.coordinateOrigin.y) > 0.25) {
return vec4(
project_mercator_(position_world.xy) - project.commonOrigin.xy,
project_size(position_world.z),
position_world.w
);
}
}
}
if (project.projectionMode == PROJECTION_MODE_IDENTITY ||
(project.projectionMode == PROJECTION_MODE_WEB_MERCATOR_AUTO_OFFSET &&
(project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT ||
project.coordinateSystem == COORDINATE_SYSTEM_CARTESIAN))) {
position_world.xyz -= project.coordinateOrigin;
}
return project_offset_(position_world) + project_offset_(project.modelMatrix * vec4(position64Low, 0.0));
}
vec4 project_position(vec4 position) {
return project_position(position, ZERO_64_LOW);
}
vec3 project_position(vec3 position, vec3 position64Low) {
vec4 projected_position = project_position(vec4(position, 1.0), position64Low);
return projected_position.xyz;
}
vec3 project_position(vec3 position) {
vec4 projected_position = project_position(vec4(position, 1.0), ZERO_64_LOW);
return projected_position.xyz;
}
vec2 project_position(vec2 position) {
vec4 projected_position = project_position(vec4(position, 0.0, 1.0), ZERO_64_LOW);
return projected_position.xy;
}
vec4 project_common_position_to_clipspace(vec4 position, mat4 viewProjectionMatrix, vec4 center) {
return viewProjectionMatrix * position + center;
}
vec4 project_common_position_to_clipspace(vec4 position) {
return project_common_position_to_clipspace(position, project.viewProjectionMatrix, project.center);
}
vec2 project_pixel_size_to_clipspace(vec2 pixels) {
vec2 offset = pixels / project.viewportSize * project.devicePixelRatio * 2.0;
return offset * project.focalDistance;
}
float project_size_to_pixel(float meters) {
return project_size(meters) * project.scale;
}
vec2 project_size_to_pixel(vec2 meters) {
return project_size(meters) * project.scale;
}
float project_size_to_pixel(float size, int unit) {
if (unit == UNIT_METERS) return project_size_to_pixel(size);
if (unit == UNIT_COMMON) return size * project.scale;
return size;
}
float project_pixel_size(float pixels) {
return pixels / project.scale;
}
vec2 project_pixel_size(vec2 pixels) {
return pixels / project.scale;
}
`,AP={};function IP(i=AP){return"viewport"in i?_P(i):{}}const ms={name:"project",dependencies:[na,ed],source:SP,vs:TP,getUniforms:IP,uniformTypes:{wrapLongitude:"f32",coordinateSystem:"i32",commonUnitsPerMeter:"vec3<f32>",projectionMode:"i32",scale:"f32",commonUnitsPerWorldUnit:"vec3<f32>",commonUnitsPerWorldUnit2:"vec3<f32>",center:"vec4<f32>",modelMatrix:"mat4x4<f32>",viewProjectionMatrix:"mat4x4<f32>",viewportSize:"vec2<f32>",devicePixelRatio:"f32",focalDistance:"f32",cameraPosition:"vec3<f32>",coordinateOrigin:"vec3<f32>",commonOrigin:"vec3<f32>",pseudoMeters:"f32"}},_t={name:"project32",dependencies:[ms],source:`// Define a structure to hold both the clip-space position and the common position.
struct ProjectResult {
  clipPosition: vec4<f32>,
  commonPosition: vec4<f32>,
};

// This function mimics the GLSL version with the 'out' parameter by returning both values.
fn project_position_to_clipspace_and_commonspace(
    position: vec3<f32>,
    position64Low: vec3<f32>,
    offset: vec3<f32>
) -> ProjectResult {
  // Compute the projected position.
  let projectedPosition: vec3<f32> = project_position_vec3_f64(position, position64Low);

  // Start with the provided offset.
  var finalOffset: vec3<f32> = offset;

  // Get whether a rotation is needed and the rotation matrix.
  let rotationResult = project_needs_rotation(projectedPosition);

  // If rotation is needed, update the offset.
  if (rotationResult.needsRotation) {
    finalOffset = rotationResult.transform * offset;
  }

  // Compute the common position.
  let commonPosition: vec4<f32> = vec4<f32>(projectedPosition + finalOffset, 1.0);

  // Convert to clip-space.
  let clipPosition: vec4<f32> = project_common_position_to_clipspace(commonPosition);

  return ProjectResult(clipPosition, commonPosition);
}

// A convenience overload that returns only the clip-space position.
fn project_position_to_clipspace(
    position: vec3<f32>,
    position64Low: vec3<f32>,
    offset: vec3<f32>
) -> vec4<f32> {
  return project_position_to_clipspace_and_commonspace(position, position64Low, offset).clipPosition;
}
`,vs:`vec4 project_position_to_clipspace(
  vec3 position, vec3 position64Low, vec3 offset, out vec4 commonPosition
) {
  vec3 projectedPosition = project_position(position, position64Low);
  mat3 rotation;
  if (project_needs_rotation(projectedPosition, rotation)) {
    // offset is specified as ENU
    // when in globe projection, rotate offset so that the ground alighs with the surface of the globe
    offset = rotation * offset;
  }
  commonPosition = vec4(projectedPosition + offset, 1.0);
  return project_common_position_to_clipspace(commonPosition);
}

vec4 project_position_to_clipspace(
  vec3 position, vec3 position64Low, vec3 offset
) {
  vec4 commonPosition;
  return project_position_to_clipspace(position, position64Low, offset, commonPosition);
}
`};function MP(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}function Yt(i,e){const t=Ai([],e,i);return Tw(t,t,1/t[3]),t}function ma(i,e,t){return i<e?e:i>t?t:i}function RP(i){return Math.log(i)*Math.LOG2E}const Sd=Math.log2||RP;function He(i,e){if(!i)throw new Error(e||"@math.gl/web-mercator: assertion failed.")}const we=Math.PI,Ed=we/4,ge=we/180,ya=180/we,qt=512,ys=4003e4,bs=85.051129,OP=1.5;function BP(i){return Sd(i)}function Xt(i){const[e,t]=i;He(Number.isFinite(e)),He(Number.isFinite(t)&&t>=-90&&t<=90,"invalid latitude");const n=e*ge,s=t*ge,r=qt*(n+we)/(2*we),o=qt*(we+Math.log(Math.tan(Ed+s*.5)))/(2*we);return[r,o]}function Mi(i){const[e,t]=i,n=e/qt*(2*we)-we,s=2*(Math.atan(Math.exp(t/qt*(2*we)-we))-Ed);return[n*ya,s*ya]}function kP(i){const{latitude:e}=i;He(Number.isFinite(e));const t=Math.cos(e*ge);return BP(ys*t)-9}function ba(i){const e=Math.cos(i*ge);return qt/ys/e}function _a(i){const{latitude:e,longitude:t,highPrecision:n=!1}=i;He(Number.isFinite(e)&&Number.isFinite(t));const s=qt,r=Math.cos(e*ge),o=s/360,a=o/r,c=s/ys/r,l={unitsPerMeter:[c,c,c],metersPerUnit:[1/c,1/c,1/c],unitsPerDegree:[o,a,c],degreesPerUnit:[1/o,1/a,1/c]};if(n){const u=ge*Math.tan(e*ge)/r,f=o*u/2,d=s/ys*u,g=d/a*c;l.unitsPerDegree2=[0,f,d],l.unitsPerMeter2=[g,0,g]}return l}function Cd(i,e){const[t,n,s]=i,[r,o,a]=e,{unitsPerMeter:c,unitsPerMeter2:l}=_a({longitude:t,latitude:n,highPrecision:!0}),u=Xt(i);u[0]+=r*(c[0]+l[0]*o),u[1]+=o*(c[1]+l[1]*o);const f=Mi(u),d=(s||0)+(a||0);return Number.isFinite(s)||Number.isFinite(a)?[f[0],f[1],d]:f}function DP(i){const{height:e,pitch:t,bearing:n,altitude:s,scale:r,center:o}=i,a=MP();rs(a,a,[0,0,-s]),Df(a,a,-t*ge),Ff(a,a,n*ge);const c=r/e;return Jo(a,a,[c,c,c]),o&&rs(a,a,sw([],o)),a}function FP(i){const{width:e,height:t,altitude:n,pitch:s=0,offset:r,center:o,scale:a,nearZMultiplier:c=1,farZMultiplier:l=1}=i;let{fovy:u=_s(OP)}=i;n!==void 0&&(u=_s(n));const f=u*ge,d=s*ge,g=Ld(u);let p=g;o&&(p+=o[2]*a/Math.cos(d)/t);const m=f*(.5+(r?r[1]:0)/t),y=Math.sin(m)*p/Math.sin(ma(Math.PI/2-d-m,.01,Math.PI-.01)),_=Math.sin(d)*y+p,v=p*10,b=Math.min(_*l,v);return{fov:f,aspect:e/t,focalDistance:g,near:c,far:b}}function _s(i){return 2*Math.atan(.5/i)*ya}function Ld(i){return .5/Math.tan(.5*i*ge)}function va(i,e){const[t,n,s=0]=i;return He(Number.isFinite(t)&&Number.isFinite(n)&&Number.isFinite(s)),Yt(e,[t,n,s,1])}function xa(i,e,t=0){const[n,s,r]=i;if(He(Number.isFinite(n)&&Number.isFinite(s),"invalid pixel coordinate"),Number.isFinite(r))return Yt(e,[n,s,r,1]);const o=Yt(e,[n,s,0,1]),a=Yt(e,[n,s,1,1]),c=o[2],l=a[2],u=c===l?0:((t||0)-c)/(l-c);return Of([],o,a,u)}function NP(i){const{width:e,height:t,bounds:n,minExtent:s=0,maxZoom:r=24,offset:o=[0,0]}=i,[[a,c],[l,u]]=n,f=zP(i.padding),d=Xt([a,ma(u,-bs,bs)]),g=Xt([l,ma(c,-bs,bs)]),p=[Math.max(Math.abs(g[0]-d[0]),s),Math.max(Math.abs(g[1]-d[1]),s)],m=[e-f.left-f.right-Math.abs(o[0])*2,t-f.top-f.bottom-Math.abs(o[1])*2];He(m[0]>0&&m[1]>0);const y=m[0]/p[0],_=m[1]/p[1],v=(f.right-f.left)/2/y,b=(f.top-f.bottom)/2/_,x=[(g[0]+d[0])/2+v,(g[1]+d[1])/2+b],w=Mi(x),P=Math.min(r,Sd(Math.abs(Math.min(y,_))));return He(Number.isFinite(P)),{longitude:w[0],latitude:w[1],zoom:P}}function zP(i=0){return typeof i=="number"?{top:i,bottom:i,left:i,right:i}:(He(Number.isFinite(i.top)&&Number.isFinite(i.bottom)&&Number.isFinite(i.left)&&Number.isFinite(i.right)),i)}const Td=Math.PI/180;function UP(i,e=0){const{width:t,height:n,unproject:s}=i,r={targetZ:e},o=s([0,n],r),a=s([t,n],r);let c,l;const u=i.fovy?.5*i.fovy*Td:Math.atan(.5/i.altitude),f=(90-i.pitch)*Td;return u>f-.01?(c=Ad(i,0,e),l=Ad(i,t,e)):(c=s([0,0],r),l=s([t,0],r)),[o,a,l,c]}function Ad(i,e,t){const{pixelUnprojectionMatrix:n}=i,s=Yt(n,[e,0,1,1]),r=Yt(n,[e,i.height,1,1]),a=(t*i.distanceScales.unitsPerMeter[2]-s[2])/(r[2]-s[2]),c=Of([],s,r,a),l=Mi(c);return l.push(t),l}const Id=`
layout(std140) uniform shadowUniforms {
  bool drawShadowMap;
  bool useShadowMap;
  vec4 color;
  highp int lightId;
  float lightCount;
  mat4 viewProjectionMatrix0;
  mat4 viewProjectionMatrix1;
  vec4 projectCenter0;
  vec4 projectCenter1;
} shadow;
`,$P=`
${Id}

const int max_lights = 2;

out vec3 shadow_vPosition[max_lights];

vec4 shadow_setVertexPosition(vec4 position_commonspace) {
  mat4 viewProjectionMatrices[max_lights];
  viewProjectionMatrices[0] = shadow.viewProjectionMatrix0;
  viewProjectionMatrices[1] = shadow.viewProjectionMatrix1;
  vec4 projectCenters[max_lights];
  projectCenters[0] = shadow.projectCenter0;
  projectCenters[1] = shadow.projectCenter1;

  if (shadow.drawShadowMap) {
    return project_common_position_to_clipspace(position_commonspace, viewProjectionMatrices[shadow.lightId], projectCenters[shadow.lightId]);
  }
  if (shadow.useShadowMap) {
    for (int i = 0; i < max_lights; i++) {
      if(i < int(shadow.lightCount)) {
        vec4 shadowMap_position = project_common_position_to_clipspace(position_commonspace, viewProjectionMatrices[i], projectCenters[i]);
        shadow_vPosition[i] = (shadowMap_position.xyz / shadowMap_position.w + 1.0) / 2.0;
      }
    }
  }
  return gl_Position;
}

`,GP=`
${Id}

const int max_lights = 2;
uniform sampler2D shadow_uShadowMap0;
uniform sampler2D shadow_uShadowMap1;

in vec3 shadow_vPosition[max_lights];

const vec4 bitPackShift = vec4(1.0, 255.0, 65025.0, 16581375.0);
const vec4 bitUnpackShift = 1.0 / bitPackShift;
const vec4 bitMask = vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0,  0.0);

float shadow_getShadowWeight(vec3 position, sampler2D shadowMap) {
  vec4 rgbaDepth = texture(shadowMap, position.xy);

  float z = dot(rgbaDepth, bitUnpackShift);
  return smoothstep(0.001, 0.01, position.z - z);
}

vec4 shadow_filterShadowColor(vec4 color) {
  if (shadow.drawShadowMap) {
    vec4 rgbaDepth = fract(gl_FragCoord.z * bitPackShift);
    rgbaDepth -= rgbaDepth.gbaa * bitMask;
    return rgbaDepth;
  }
  if (shadow.useShadowMap) {
    float shadowAlpha = 0.0;
    shadowAlpha += shadow_getShadowWeight(shadow_vPosition[0], shadow_uShadowMap0);
    if(shadow.lightCount > 1.0) {
      shadowAlpha += shadow_getShadowWeight(shadow_vPosition[1], shadow_uShadowMap1);
    }
    shadowAlpha *= shadow.color.a / shadow.lightCount;
    float blendedAlpha = shadowAlpha + color.a * (1.0 - shadowAlpha);

    return vec4(
      mix(color.rgb, shadow.color.rgb, shadowAlpha / blendedAlpha),
      blendedAlpha
    );
  }
  return color;
}

`,VP=Ii(qP),jP=Ii(XP),WP=[0,0,0,1],HP=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0];function YP(i,e){const[t,n,s]=i,r=xa([t,n,s],e);return Number.isFinite(s)?r:[r[0],r[1],0]}function qP({viewport:i,center:e}){return new Be(i.viewProjectionMatrix).invert().transform(e)}function XP({viewport:i,shadowMatrices:e}){const t=[],n=i.pixelUnprojectionMatrix,s=i.isGeospatial?void 0:1,r=[[0,0,s],[i.width,0,s],[0,i.height,s],[i.width,i.height,s],[0,0,-1],[i.width,0,-1],[0,i.height,-1],[i.width,i.height,-1]].map(o=>YP(o,n));for(const o of e){const a=o.clone().translate(new Oe(i.center).negate()),c=r.map(u=>a.transform(u)),l=new Be().ortho({left:Math.min(...c.map(u=>u[0])),right:Math.max(...c.map(u=>u[0])),bottom:Math.min(...c.map(u=>u[1])),top:Math.max(...c.map(u=>u[1])),near:Math.min(...c.map(u=>-u[2])),far:Math.max(...c.map(u=>-u[2]))});t.push(l.multiplyRight(o))}return t}function ZP(i){const{shadowEnabled:e=!0,project:t}=i;if(!e||!t||!i.shadowMatrices||!i.shadowMatrices.length)return{drawShadowMap:!1,useShadowMap:!1,shadow_uShadowMap0:i.dummyShadowMap,shadow_uShadowMap1:i.dummyShadowMap};const n=ms.getUniforms(t),s=VP({viewport:t.viewport,center:n.center}),r=[],o=jP({shadowMatrices:i.shadowMatrices,viewport:t.viewport}).slice();for(let c=0;c<i.shadowMatrices.length;c++){const l=o[c],u=l.clone().translate(new Oe(t.viewport.center).negate());n.coordinateSystem===ps("lnglat")&&n.projectionMode===le.WEB_MERCATOR?(o[c]=u,r[c]=s):(o[c]=l.clone().multiplyRight(HP),r[c]=u.transform(s))}const a={drawShadowMap:!!i.drawToShadowMap,useShadowMap:i.shadowMaps?i.shadowMaps.length>0:!1,color:i.shadowColor||WP,lightId:i.shadowLightId||0,lightCount:i.shadowMatrices.length,shadow_uShadowMap0:i.dummyShadowMap,shadow_uShadowMap1:i.dummyShadowMap};for(let c=0;c<o.length;c++)a[`viewProjectionMatrix${c}`]=o[c],a[`projectCenter${c}`]=r[c];for(let c=0;c<2;c++)a[`shadow_uShadowMap${c}`]=i.shadowMaps&&i.shadowMaps[c]||i.dummyShadowMap;return a}const Md={name:"shadow",dependencies:[ms],vs:$P,fs:GP,inject:{"vs:DECKGL_FILTER_GL_POSITION":`
    position = shadow_setVertexPosition(geometry.position);
    `,"fs:DECKGL_FILTER_COLOR":`
    color = shadow_filterShadowColor(color);
    `},getUniforms:ZP,uniformTypes:{drawShadowMap:"f32",useShadowMap:"f32",color:"vec4<f32>",lightId:"i32",lightCount:"f32",viewProjectionMatrix0:"mat4x4<f32>",viewProjectionMatrix1:"mat4x4<f32>",projectCenter0:"vec4<f32>",projectCenter1:"vec4<f32>"}},vs=10,xs=16777215;function KP(i,e){i.length===vs?D.warn(`pickMultipleObjects can only exclude ${vs} previously picked objects for layers without picking buffers`)():i.push(e)}const QP=`  float disabledPickingIndexCount;
  vec4 disabledPickingIndices0;
  vec4 disabledPickingIndices1;
  vec4 disabledPickingIndices2;
`;function Rd(i){return i.replace(`  vec4 highlightColor;
} picking;`,`  vec4 highlightColor;
${QP}} picking;`)}function wa(i,e){return[i[e]||0,i[e+1]||0,i[e+2]||0,i[e+3]||0]}const JP=`vec3 picking_getPickingColorFromIndex(float objectIndex) {
  if (objectIndex < 0.0 || objectIndex >= ${xs}.0) {
    return vec3(0.0);
  }

  for (int i = 0; i < ${vs}; i++) {
    if (float(i) >= picking.disabledPickingIndexCount) {
      break;
    }
    vec4 disabledIndices = i < 4
      ? picking.disabledPickingIndices0
      : (i < 8 ? picking.disabledPickingIndices1 : picking.disabledPickingIndices2);
    float disabledIndex = disabledIndices[i - (i / 4) * 4];
    if (disabledIndex == objectIndex) {
      return vec3(0.0);
    }
  }

  float encodedIndex = objectIndex + 1.0;
  return vec3(
    mod(encodedIndex, 256.0),
    mod(floor(encodedIndex / 256.0), 256.0),
    mod(floor(encodedIndex / 65536.0), 256.0)
  );
}

vec3 picking_getPickingColorFromIndex(uint objectIndex) {
  return picking_getPickingColorFromIndex(float(objectIndex));
}

vec3 picking_getPickingColorFromInstanceID() {
  return picking_getPickingColorFromIndex(float(gl_InstanceID));
}

void picking_setPickingColorFromInstanceID() {
  picking_setPickingColor(picking_getPickingColorFromInstanceID());
}
`,eS=`struct pickingUniforms {
  isActive: f32,
  isAttribute: f32,
  isHighlightActive: f32,
  useByteColors: f32,
  highlightedObjectColor: vec3<f32>,
  highlightColor: vec4<f32>,
  disabledPickingIndexCount: f32,
  disabledPickingIndices0: vec4<f32>,
  disabledPickingIndices1: vec4<f32>,
  disabledPickingIndices2: vec4<f32>,
};

@group(0) @binding(auto) var<uniform> picking: pickingUniforms;

fn picking_normalizeColor(color: vec3<f32>) -> vec3<f32> {
  return select(color, color / 255.0, picking.useByteColors > 0.5);
}

fn picking_normalizeColor4(color: vec4<f32>) -> vec4<f32> {
  return select(color, color / 255.0, picking.useByteColors > 0.5);
}

fn picking_isColorZero(color: vec3<f32>) -> bool {
  return dot(color, vec3<f32>(1.0)) < 0.00001;
}

fn picking_isColorValid(color: vec3<f32>) -> bool {
  return dot(color, vec3<f32>(1.0)) > 0.00001;
}

fn picking_getPickingColorFromIndex(objectIndex: u32) -> vec3<f32> {
  if (objectIndex >= ${xs}u) {
    return vec3<f32>(0.0);
  }

  for (var i = 0; i < ${vs}; i = i + 1) {
    if (f32(i) >= picking.disabledPickingIndexCount) {
      break;
    }
    let disabledIndices = select(
      picking.disabledPickingIndices2,
      select(picking.disabledPickingIndices1, picking.disabledPickingIndices0, i < 4),
      i < 8
    );
    let disabledIndex = disabledIndices[i % 4];
    if (disabledIndex == f32(objectIndex)) {
      return vec3<f32>(0.0);
    }
  }

  let encodedIndex = objectIndex + 1u;
  return vec3<f32>(
    f32(encodedIndex % 256u),
    f32((encodedIndex / 256u) % 256u),
    f32((encodedIndex / 65536u) % 256u)
  ) / 255.0;
}
`,Zt={...Wt,vs:`${Rd(Wt.vs)}
${JP}`,fs:Rd(Wt.fs),source:eS,uniformTypes:{...Wt.uniformTypes,disabledPickingIndexCount:"f32",disabledPickingIndices0:"vec4<f32>",disabledPickingIndices1:"vec4<f32>",disabledPickingIndices2:"vec4<f32>"},defaultUniforms:{...Wt.defaultUniforms,useByteColors:!0,disabledPickingIndexCount:0,disabledPickingIndices0:[0,0,0,0],disabledPickingIndices1:[0,0,0,0],disabledPickingIndices2:[0,0,0,0]},getUniforms(i,e){const t=Wt.getUniforms(i,e),n=i.disabledPickingIndices||[];return t.disabledPickingIndexCount=n.length,t.disabledPickingIndices0=wa(n,0),t.disabledPickingIndices1=wa(n,4),t.disabledPickingIndices2=wa(n,8),t},inject:{"vs:DECKGL_FILTER_GL_POSITION":`
    // for picking depth values
    picking_setPickingAttribute(position.z / position.w);
  `,"vs:DECKGL_FILTER_COLOR":`
  picking_setPickingColor(geometry.pickingColor);
  `,"fs:DECKGL_FILTER_COLOR":{order:99,injection:`
  // use highlight color if this fragment belongs to the selected object.
  color = picking_filterHighlightColor(color);

  // use picking color if rendering to picking FBO.
  color = picking_filterPickingColor(color);
    `}}},tS=[ed],iS=["vs:DECKGL_FILTER_SIZE(inout vec3 size, VertexGeometry geometry)","vs:DECKGL_FILTER_GL_POSITION(inout vec4 position, VertexGeometry geometry)","vs:DECKGL_FILTER_COLOR(inout vec4 color, VertexGeometry geometry)","fs:DECKGL_FILTER_COLOR(inout vec4 color, FragmentGeometry geometry)"],nS=[];function sS(i){const e=et.getDefaultShaderAssembler(i);for(const n of tS)e.addDefaultModule(n);e._hookFunctions.length=0;const t=i==="glsl"?iS:nS;for(const n of t)e.addShaderHook(n);return e}const rS=[255,255,255],oS=1;let aS=0;class cS{constructor(e={}){this.type="ambient";const{color:t=rS}=e,{intensity:n=oS}=e;this.id=e.id||`ambient-${aS++}`,this.color=t,this.intensity=n}}const lS=[255,255,255],uS=1,fS=[0,0,-1];let dS=0;class Od{constructor(e={}){this.type="directional";const{color:t=lS}=e,{intensity:n=uS}=e,{direction:s=fS}=e,{_shadow:r=!1}=e;this.id=e.id||`directional-${dS++}`,this.color=t,this.intensity=n,this.type="directional",this.direction=new Oe(s).normalize().toArray(),this.shadow=r}getProjectedLight(e){return this}}class hS{constructor(e,t={id:"pass"}){const{id:n}=t;this.id=n,this.device=e,this.props={...t}}setProps(e){Object.assign(this.props,e)}render(e){}cleanup(){}}const gS={depthWriteEnabled:!0,depthCompare:"less-equal",blendColorOperation:"add",blendColorSrcFactor:"one",blendColorDstFactor:"one-minus-src-alpha",blendAlphaOperation:"add",blendAlphaSrcFactor:"one",blendAlphaDstFactor:"one-minus-src-alpha"};class Pa extends hS{constructor(){super(...arguments),this._lastRenderIndex=-1}render(e){this._render(e)}_render(e){const{canvasContext:t=this.device.canvasContext}=e,n=e.target??t.getCurrentFramebuffer(),[s,r]=t.getDrawingBufferSize(),o=e.clearCanvas??!0;let a=e.clearColor??(o?[0,0,0,0]:!1),c=o?1:!1,l=o?0:!1;const u=e.colorMask??15,f={viewport:[0,0,s,r]};e.colorMask&&(f.colorMask=u),e.scissorRect&&(f.scissorRect=e.scissorRect);const{shaderModuleProps:d,viewports:g,views:p,onViewportActive:m,clearStack:y=!0}=e,_=e.pass||"unknown",v=this.device.type==="webgpu";y&&(this._lastRenderIndex=-1);const b=[];if(!g.length)return this.device.beginRenderPass({framebuffer:n,parameters:f,clearColor:a,clearDepth:c,clearStencil:l}).end(),this.device.submit(),b;try{for(const x of g){m?.(x);const w=this._getDrawLayerParams(x,e),P=p&&p[x.id],L=x.subViewports||[x],E=v?L.map(T=>[T]):[L];for(const T of E){const C=this.device.beginRenderPass({framebuffer:n,parameters:f,clearColor:a,clearDepth:c,clearStencil:l});try{for(const O of T){const M=this._drawLayersInViewport(C,{target:n,canvasContext:t,shaderModuleProps:d,viewport:O,view:P,pass:_,layers:e.layers,isPicking:e.isPicking},w);b.push(M)}}finally{C.end(),v&&this.device.submit()}a=!1,c=!1,l=!1}}return b}finally{v||this.device.submit()}}_getDrawLayerParams(e,{layers:t,pass:n,isPicking:s=!1,layerFilter:r,cullRect:o,views:a,effects:c,canvasContext:l=this.device.canvasContext,shaderModuleProps:u},f=!1){const d=[],g=Bd(this._lastRenderIndex+1),p={layer:t[0],viewport:e,isPicking:s,renderPass:n,cullRect:o},m={};for(let y=0;y<t.length;y++){const _=t[y],v=this._shouldDrawLayer(_,p,r,m),b={shouldDrawLayer:v};if(v&&!f){b.shouldDrawLayer=!0,b.layerRenderIndex=g(_,v),b.shaderModuleProps=this._getShaderModuleProps(_,c,n,l,u);const x=_.context.device.type==="webgpu"?gS:null;b.layerParameters={...x,..._.context.deck?.props.parameters,...a?.[e.id]?.props.parameters,...this.getLayerParameters(_,y,e)}}d[y]=b}return d}_drawLayersInViewport(e,{layers:t,shaderModuleProps:n,pass:s,target:r,canvasContext:o,viewport:a,view:c,isPicking:l},u){const f=pS(this.device,{canvasContext:o,shaderModuleProps:n,target:r,viewport:a});if(c){const{clear:g,clearColor:p,clearDepth:m,clearStencil:y}=c.props;if(g){let _=[0,0,0,0],v=1,b=0;Array.isArray(p)&&!l?_=[...p.slice(0,3),p[3]||255].map(w=>w/255):p===!1&&(_=!1),m!==void 0&&(v=m),y!==void 0&&(b=y),this.device.beginRenderPass({framebuffer:r,parameters:{viewport:f,scissorRect:f},clearColor:_,clearDepth:v,clearStencil:b}).end()}}const d={totalCount:t.length,visibleCount:0,compositeCount:0,pickableCount:0};e.setParameters({viewport:f});for(let g=0;g<t.length;g++){const p=t[g],m=u[g],{shouldDrawLayer:y}=m;if(y&&p.props.pickable&&d.pickableCount++,p.isComposite&&d.compositeCount++,p.isDrawable&&m.shouldDrawLayer){const{layerRenderIndex:_,shaderModuleProps:v,layerParameters:b}=m;d.visibleCount++,this._lastRenderIndex=Math.max(this._lastRenderIndex,_),v.project&&(v.project.viewport=a),p.context.renderPass=e;try{p._drawLayer({renderPass:e,shaderModuleProps:v,uniforms:{layerIndex:_},parameters:b})}catch(x){p.raiseError(x,`drawing ${p} to ${s}`)}}}return d}shouldDrawLayer(e){return!0}getShaderModuleProps(e,t,n){return null}getLayerParameters(e,t,n){return e.props.parameters}_shouldDrawLayer(e,t,n,s){if(!(e.props.visible&&this.shouldDrawLayer(e)))return!1;t.layer=e;let o=e.parent;for(;o;){if(!o.props.visible||!o.filterSubLayer(t))return!1;t.layer=o,o=o.parent}if(n){const a=t.layer.id;if(a in s||(s[a]=n(t)),!s[a])return!1}return e.activateViewport(t.viewport),!0}_getShaderModuleProps(e,t,n,s,r){const o=s.cssToDeviceRatio(),a=e.internalState?.propsInTransition||e.props,c={layer:a,picking:{isActive:!1},project:{viewport:e.context.viewport,devicePixelRatio:o,modelMatrix:a.modelMatrix,coordinateSystem:a.coordinateSystem,coordinateOrigin:a.coordinateOrigin,autoWrapLongitude:e.wrapLongitude}};if(t)for(const l of t)kd(c,l.getShaderModuleProps?.(e,c));for(const l of e.context.defaultShaderModules)l.name in c||(c[l.name]={});return kd(c,this.getShaderModuleProps(e,t,c),r)}}function Bd(i=0,e={}){const t={},n=(s,r)=>{const o=s.props._offset,a=s.id,c=s.parent&&s.parent.id;let l;if(c&&!(c in e)&&n(s.parent,!1),c in t){const u=t[c]=t[c]||Bd(e[c],e);l=u(s,r),t[a]=u}else Number.isFinite(o)?(l=o+(e[c]||0),t[a]=null):l=i;return r&&l>=i&&(i=l+1),e[a]=l,l};return n}function pS(i,{canvasContext:e=i.canvasContext,shaderModuleProps:t,target:n,viewport:s}){const r=t?.project?.devicePixelRatio??e.cssToDeviceRatio(),[,o]=e.getDrawingBufferSize(),a=n?n.height:o,c=s;return[c.x*r,a-(c.y+c.height)*r,c.width*r,c.height*r]}function kd(i,...e){for(const t of e)if(t)for(const n in t)i[n]?Object.assign(i[n],t[n]):i[n]=t[n];return i}class mS extends Pa{constructor(e,t){super(e,t);const n=e.createTexture({format:"rgba8unorm",width:1,height:1,sampler:{minFilter:"linear",magFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}}),s=e.createTexture({format:"depth16unorm",width:1,height:1});this.fbo=e.createFramebuffer({id:"shadowmap",width:1,height:1,colorAttachments:[n],depthStencilAttachment:s})}delete(){this.fbo&&(this.fbo.destroy(),this.fbo=null)}getShadowMap(){return this.fbo.colorAttachments[0].texture}render(e){const t=this.fbo,n=this.device.canvasContext.cssToDeviceRatio(),s=e.viewports[0],r=s.width*n,o=s.height*n,a=[1,1,1,1];(r!==t.width||o!==t.height)&&t.resize({width:r,height:o}),super.render({...e,clearColor:a,target:t,pass:"shadow"})}getLayerParameters(e,t,n){return{...e.props.parameters,blend:!1,depthWriteEnabled:!0,depthCompare:"less-equal"}}shouldDrawLayer(e){return e.props.shadowEnabled!==!1}getShaderModuleProps(e,t,n){return{shadow:{project:n.project,drawToShadowMap:!0}}}}const yS={color:[255,255,255],intensity:1},Dd=[{color:[255,255,255],intensity:1,direction:[-1,3,-1]},{color:[255,255,255],intensity:.9,direction:[1,-8,-2.5]}],bS=[0,0,0,200/255];class Fd{constructor(e={}){this.id="lighting-effect",this.shadowColor=bS,this.shadow=!1,this.directionalLights=[],this.pointLights=[],this.shadowPasses=[],this.dummyShadowMap=null,this.setProps(e)}setup(e){this.context=e;const{device:t,deck:n}=e;this.shadow&&!this.dummyShadowMap&&(this._createShadowPasses(t),n._addDefaultShaderModule(Md),this.dummyShadowMap=t.createTexture({width:1,height:1}))}setProps(e){this.ambientLight=void 0,this.directionalLights=[],this.pointLights=[];for(const t in e){const n=e[t];switch(n.type){case"ambient":this.ambientLight=n;break;case"directional":this.directionalLights.push(n);break;case"point":this.pointLights.push(n);break}}this._applyDefaultLights(),this.shadow=this.directionalLights.some(t=>t.shadow),this.context&&this.setup(this.context),this.props=e}preRender({layers:e,layerFilter:t,viewports:n,onViewportActive:s,views:r}){if(this.shadow){this.shadowMatrices=this._calculateMatrices();for(let o=0;o<this.shadowPasses.length;o++)this.shadowPasses[o].render({layers:e,layerFilter:t,viewports:n,onViewportActive:s,views:r,shaderModuleProps:{shadow:{shadowLightId:o,dummyShadowMap:this.dummyShadowMap,shadowMatrices:this.shadowMatrices}}})}}getShaderModuleProps(e,t){const n=this.shadow?{project:t.project,shadowMaps:this.shadowPasses.map(o=>o.getShadowMap()),dummyShadowMap:this.dummyShadowMap,shadowColor:this.shadowColor,shadowMatrices:this.shadowMatrices}:{},s={enabled:!0,lights:this._getLights(e)},r=e.props.material;return{shadow:n,lighting:s,phongMaterial:r,gouraudMaterial:r}}cleanup(e){for(const t of this.shadowPasses)t.delete();this.shadowPasses.length=0,this.dummyShadowMap&&(this.dummyShadowMap.destroy(),this.dummyShadowMap=null,e.deck._removeDefaultShaderModule(Md))}_calculateMatrices(){const e=[];for(const t of this.directionalLights){const n=new Be().lookAt({eye:new Oe(t.direction).negate()});e.push(n)}return e}_createShadowPasses(e){for(let t=0;t<this.directionalLights.length;t++){const n=new mS(e);this.shadowPasses[t]=n}}_applyDefaultLights(){const{ambientLight:e,pointLights:t,directionalLights:n}=this;!e&&t.length===0&&n.length===0&&(this.ambientLight=new cS(yS),this.directionalLights.push(new Od(Dd[0]),new Od(Dd[1])))}_getLights(e){const t=[];this.ambientLight&&t.push(this.ambientLight);for(const n of this.pointLights)t.push(n.getProjectedLight({layer:e}));for(const n of this.directionalLights)t.push(n.getProjectedLight({layer:e}));return t}}class _S{constructor(e={}){this._pool=[],this.opts={overAlloc:2,poolSize:100},this.setOptions(e)}setOptions(e){Object.assign(this.opts,e)}allocate(e,t,{size:n=1,type:s,padding:r=0,copy:o=!1,initialize:a=!1,maxCount:c}){const l=s||e&&e.constructor||Float32Array,u=t*n+r;if(ArrayBuffer.isView(e)){if(u<=e.length)return e;if(u*e.BYTES_PER_ELEMENT<=e.buffer.byteLength)return new l(e.buffer,0,u)}let f=1/0;c&&(f=c*n+r);const d=this._allocate(l,u,a,f);return e&&o?d.set(e):a||d.fill(0,0,4),this._release(e),d}release(e){this._release(e)}_allocate(e,t,n,s){let r=Math.max(Math.ceil(t*this.opts.overAlloc),1);r>s&&(r=s);const o=this._pool,a=e.BYTES_PER_ELEMENT*r,c=o.findIndex(l=>l.byteLength>=a);if(c>=0){const l=new e(o.splice(c,1)[0],0,r);return n&&l.fill(0),l}return new e(r)}_release(e){if(!ArrayBuffer.isView(e))return;const t=this._pool,{buffer:n}=e,{byteLength:s}=n,r=t.findIndex(o=>o.byteLength>=s);r<0?t.push(n):(r>0||t.length<this.opts.poolSize)&&t.splice(r,0,n),t.length>this.opts.poolSize&&t.shift()}}const Kt=new _S;function Ri(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}function Nd(i,e){const t=i%e;return t<0?e+t:t}function vS(i){return[i[12],i[13],i[14]]}function xS(i){return{left:Qt(i[3]+i[0],i[7]+i[4],i[11]+i[8],i[15]+i[12]),right:Qt(i[3]-i[0],i[7]-i[4],i[11]-i[8],i[15]-i[12]),bottom:Qt(i[3]+i[1],i[7]+i[5],i[11]+i[9],i[15]+i[13]),top:Qt(i[3]-i[1],i[7]-i[5],i[11]-i[9],i[15]-i[13]),near:Qt(i[3]+i[2],i[7]+i[6],i[11]+i[10],i[15]+i[14]),far:Qt(i[3]-i[2],i[7]-i[6],i[11]-i[10],i[15]-i[14])}}const zd=new Oe;function Qt(i,e,t,n){zd.set(i,e,t);const s=zd.len();return{distance:n/s,normal:new Oe(-i/s,-e/s,-t/s)}}function wS(i){return i-Math.fround(i)}let Oi;function ws(i,e){const{size:t=1,startIndex:n=0}=e,s=e.endIndex!==void 0?e.endIndex:i.length,r=(s-n)/t;Oi=Kt.allocate(Oi,r,{type:Float32Array,size:t*2});let o=n,a=0;for(;o<s;){for(let c=0;c<t;c++){const l=i[o++];Oi[a+c]=l,Oi[a+c+t]=wS(l)}a+=t*2}return Oi.subarray(0,r*t*2)}function PS(i){let e=null,t=!1;for(const n of i)n&&(e?(t||(e=[[e[0][0],e[0][1]],[e[1][0],e[1][1]]],t=!0),e[0][0]=Math.min(e[0][0],n[0][0]),e[0][1]=Math.min(e[0][1],n[0][1]),e[1][0]=Math.max(e[1][0],n[1][0]),e[1][1]=Math.max(e[1][1],n[1][1])):e=n);return e}const SS=Math.PI/180,ES=Ri(),Ud=[0,0,0],CS={unitsPerMeter:[1,1,1],metersPerUnit:[1,1,1]};function LS({width:i,height:e,orthographic:t,fovyRadians:n,focalDistance:s,padding:r,near:o,far:a}){const c=i/e,l=t?new Be().orthographic({fovy:n,aspect:c,focalDistance:s,near:o,far:a}):new Be().perspective({fovy:n,aspect:c,near:o,far:a});if(r){const{left:u=0,right:f=0,top:d=0,bottom:g=0}=r,p=ve((u+i-f)/2,0,i)-i/2,m=ve((d+e-g)/2,0,e)-e/2;l[8]-=p*2/i,l[9]+=m*2/e}return l}class Jt{constructor(e={}){this._frustumPlanes={},this.id=e.id||this.constructor.displayName||"viewport",this.x=e.x||0,this.y=e.y||0,this.width=e.width||1,this.height=e.height||1,this.zoom=e.zoom||0,this.padding=e.padding,this.distanceScales=e.distanceScales||CS,this.focalDistance=e.focalDistance||1,this.position=e.position||Ud,this.modelMatrix=e.modelMatrix||null;const{longitude:t,latitude:n}=e;this.isGeospatial=Number.isFinite(n)&&Number.isFinite(t),this._initProps(e),this._initMatrices(e),this.equals=this.equals.bind(this),this.project=this.project.bind(this),this.unproject=this.unproject.bind(this),this.projectPosition=this.projectPosition.bind(this),this.unprojectPosition=this.unprojectPosition.bind(this),this.projectFlat=this.projectFlat.bind(this),this.unprojectFlat=this.unprojectFlat.bind(this)}get subViewports(){return null}get metersPerPixel(){return this.distanceScales.metersPerUnit[2]/this.scale}get projectionMode(){return this.isGeospatial?this.zoom<12?le.WEB_MERCATOR:le.WEB_MERCATOR_AUTO_OFFSET:le.IDENTITY}equals(e){return e instanceof Jt?this===e?!0:e.width===this.width&&e.height===this.height&&e.scale===this.scale&&e.projectionMode===this.projectionMode&&e.resolution===this.resolution&&Vt(e.distanceScales.unitsPerMeter,this.distanceScales.unitsPerMeter)&&Vt(e.projectionMatrix,this.projectionMatrix)&&Vt(e.viewMatrix,this.viewMatrix):!1}project(e,{topLeft:t=!0}={}){const n=this.projectPosition(e),s=va(n,this.pixelProjectionMatrix),[r,o]=s,a=t?o:this.height-o;return e.length===2?[r,a]:[r,a,s[2]]}unproject(e,{topLeft:t=!0,targetZ:n}={}){const[s,r,o]=e,a=t?r:this.height-r,c=n&&n*this.distanceScales.unitsPerMeter[2],l=xa([s,a,o],this.pixelUnprojectionMatrix,c),[u,f,d]=this.unprojectPosition(l);return Number.isFinite(o)?[u,f,d]:Number.isFinite(n)?[u,f,n]:[u,f]}projectPosition(e){const[t,n]=this.projectFlat(e),s=(e[2]||0)*this.distanceScales.unitsPerMeter[2];return[t,n,s]}unprojectPosition(e){const[t,n]=this.unprojectFlat(e),s=(e[2]||0)*this.distanceScales.metersPerUnit[2];return[t,n,s]}projectFlat(e){if(this.isGeospatial){const t=Xt(e);return t[1]=ve(t[1],-318,830),t}return e}unprojectFlat(e){return this.isGeospatial?Mi(e):e}getBounds(e={}){const t={targetZ:e.z||0},n=this.unproject([0,0],t),s=this.unproject([this.width,0],t),r=this.unproject([0,this.height],t),o=this.unproject([this.width,this.height],t);return[Math.min(n[0],s[0],r[0],o[0]),Math.min(n[1],s[1],r[1],o[1]),Math.max(n[0],s[0],r[0],o[0]),Math.max(n[1],s[1],r[1],o[1])]}getDistanceScales(e){return e&&this.isGeospatial?_a({longitude:e[0],latitude:e[1],highPrecision:!0}):this.distanceScales}containsPixel({x:e,y:t,width:n=1,height:s=1}){return e<this.x+this.width&&this.x<e+n&&t<this.y+this.height&&this.y<t+s}getFrustumPlanes(){return this._frustumPlanes.near?this._frustumPlanes:(Object.assign(this._frustumPlanes,xS(this.viewProjectionMatrix)),this._frustumPlanes)}panByPosition(e,t,n){return null}_initProps(e){const t=e.longitude,n=e.latitude;this.isGeospatial&&(Number.isFinite(e.zoom)||(this.zoom=kP({latitude:n})+Math.log2(this.focalDistance)),this.distanceScales=e.distanceScales||_a({latitude:n,longitude:t}));const s=Math.pow(2,this.zoom);this.scale=s;const{position:r,modelMatrix:o}=e;let a=Ud;if(r&&(a=o?new Be(o).transformAsVector(r,[]):r),this.isGeospatial){const c=this.projectPosition([t,n,0]);this.center=new Oe(a).scale(this.distanceScales.unitsPerMeter).add(c)}else this.center=this.projectPosition(a)}_initMatrices(e){const{viewMatrix:t=ES,projectionMatrix:n=null,orthographic:s=!1,fovyRadians:r,fovy:o=75,near:a=.1,far:c=1e3,padding:l=null,focalDistance:u=1}=e;this.viewMatrixUncentered=t,this.viewMatrix=new Be().multiplyRight(t).translate(new Oe(this.center).negate()),this.projectionMatrix=n||LS({width:this.width,height:this.height,orthographic:s,fovyRadians:r||o*SS,focalDistance:u,padding:l,near:a,far:c});const f=Ri();yt(f,f,this.projectionMatrix),yt(f,f,this.viewMatrix),this.viewProjectionMatrix=f,this.viewMatrixInverse=Qo([],this.viewMatrix)||this.viewMatrix,this.cameraPosition=vS(this.viewMatrixInverse);const d=Ri(),g=Ri();Jo(d,d,[this.width/2,-this.height/2,1]),rs(d,d,[1,-1,0]),yt(g,d,this.viewProjectionMatrix),this.pixelProjectionMatrix=g,this.pixelUnprojectionMatrix=Qo(Ri(),this.pixelProjectionMatrix),this.pixelUnprojectionMatrix||D.warn("Pixel project matrix not invertible")()}}Jt.displayName="Viewport";class tt extends Jt{constructor(e={}){const{latitude:t=0,longitude:n=0,zoom:s=0,pitch:r=0,bearing:o=0,nearZMultiplier:a=.1,farZMultiplier:c=1.01,nearZ:l,farZ:u,orthographic:f=!1,projectionMatrix:d,repeat:g=!1,worldOffset:p=0,position:m,padding:y,legacyMeterSizes:_=!1}=e;let{width:v,height:b,altitude:x=1.5}=e;const w=Math.pow(2,s);v=v||1,b=b||1;let P,L=null;if(d)x=d[5]/2,P=_s(x);else{e.fovy?(P=e.fovy,x=Ld(P)):P=_s(x);let T;if(y){const{top:C=0,bottom:O=0}=y;T=[0,ve((C+b-O)/2,0,b)-b/2]}L=FP({width:v,height:b,scale:w,center:m&&[0,0,m[2]*ba(t)],offset:T,pitch:r,fovy:P,nearZMultiplier:a,farZMultiplier:c}),Number.isFinite(l)&&(L.near=l),Number.isFinite(u)&&(L.far=u)}let E=DP({height:b,pitch:r,bearing:o,scale:w,altitude:x});p&&(E=new Be().translate([512*p,0,0]).multiplyLeft(E)),super({...e,width:v,height:b,viewMatrix:E,longitude:n,latitude:t,zoom:s,...L,fovy:P,focalDistance:x}),this.latitude=t,this.longitude=n,this.zoom=s,this.pitch=r,this.bearing=o,this.altitude=x,this.fovy=P,this.orthographic=f,this._subViewports=g?[]:null,this._pseudoMeters=_,Object.freeze(this)}get subViewports(){if(this._subViewports&&!this._subViewports.length){const e=this.getBounds(),t=Math.floor((e[0]+180)/360),n=Math.ceil((e[2]-180)/360);for(let s=t;s<=n;s++){const r=s?new tt({...this,worldOffset:s}):this;this._subViewports.push(r)}}return this._subViewports}equals(e){return e instanceof tt&&e._pseudoMeters===this._pseudoMeters&&super.equals(e)}projectPosition(e){if(this._pseudoMeters)return super.projectPosition(e);const[t,n]=this.projectFlat(e),s=(e[2]||0)*ba(e[1]);return[t,n,s]}unprojectPosition(e){if(this._pseudoMeters)return super.unprojectPosition(e);const[t,n]=this.unprojectFlat(e),s=(e[2]||0)/ba(n);return[t,n,s]}addMetersToLngLat(e,t){return Cd(e,t)}panByPosition(e,t,n){const s=xa(t,this.pixelUnprojectionMatrix),r=this.projectFlat(e),o=Rf([],r,Kx([],s)),a=Rf([],this.center,o),[c,l]=this.unprojectFlat(a);return{longitude:c,latitude:l}}panByPosition3D(e,t){const n=e[2]||0,s=Jx([],e,this.unproject(t,{targetZ:n}));return{longitude:this.longitude+s[0],latitude:this.latitude+s[1]}}getBounds(e={}){const t=UP(this,e.z||0);return[Math.min(t[0][0],t[1][0],t[2][0],t[3][0]),Math.min(t[0][1],t[1][1],t[2][1],t[3][1]),Math.max(t[0][0],t[1][0],t[2][0],t[3][0]),Math.max(t[0][1],t[1][1],t[2][1],t[3][1])]}fitBounds(e,t={}){const{width:n,height:s}=this,{longitude:r,latitude:o,zoom:a}=NP({width:n,height:s,bounds:e,...t});return new tt({width:n,height:s,longitude:r,latitude:o,zoom:a})}}tt.displayName="WebMercatorViewport";const $d=[0,0,0];function Sa(i,e,t=!1){const n=e.projectPosition(i);if(t&&e instanceof tt){const[s,r,o=0]=i,a=e.getDistanceScales([s,r]);n[2]=o*a.unitsPerMeter[2]}return n}function TS(i){const{viewport:e,modelMatrix:t,coordinateOrigin:n}=i;let{coordinateSystem:s,fromCoordinateSystem:r,fromCoordinateOrigin:o}=i;return s==="default"&&(s=e.isGeospatial?"lnglat":"cartesian"),r===void 0?r=s:r==="default"&&(r=e.isGeospatial?"lnglat":"cartesian"),o===void 0&&(o=n),{viewport:e,coordinateSystem:s,coordinateOrigin:n,modelMatrix:t,fromCoordinateSystem:r,fromCoordinateOrigin:o}}function Ea(i,{viewport:e,modelMatrix:t,coordinateSystem:n,coordinateOrigin:s,offsetMode:r}){let[o,a,c=0]=i;switch(t&&([o,a,c]=Ai([],[o,a,c,1],t)),n){case"default":return Ea(i,{viewport:e,modelMatrix:t,coordinateSystem:e.isGeospatial?"lnglat":"cartesian",coordinateOrigin:s,offsetMode:r});case"lnglat":return Sa([o,a,c],e,r);case"lnglat-offsets":return Sa([o+s[0],a+s[1],c+(s[2]||0)],e,r);case"meter-offsets":return Sa(Cd(s,[o,a,c]),e,r);case"cartesian":return e.isGeospatial?[o+s[0],a+s[1],c+s[2]]:e.projectPosition([o,a,c]);default:throw new Error(`Invalid coordinateSystem: ${n}`)}}function AS(i,e){const{viewport:t,coordinateSystem:n,coordinateOrigin:s,modelMatrix:r,fromCoordinateSystem:o,fromCoordinateOrigin:a}=TS(e),{autoOffset:c=!0}=e,{geospatialOrigin:l=$d,shaderCoordinateOrigin:u=$d,offsetMode:f=!1}=c?Pd(t,n,s):{},d=Ea(i,{viewport:t,modelMatrix:r,coordinateSystem:o,coordinateOrigin:a,offsetMode:f});if(f){const g=t.projectPosition(l||u);hw(d,d,g)}return d}const Ca={};function Bi(i="id"){Ca[i]=Ca[i]||1;const e=Ca[i]++;return`${i}-${e}`}class ke{constructor(e){h(this,"id");h(this,"topology");h(this,"vertexCount");h(this,"indices");h(this,"attributes");h(this,"bufferLayout");h(this,"userData",{});const{attributes:t={},indices:n=null,vertexCount:s=null}=e;this.id=e.id||Bi("geometry"),this.topology=e.topology,n&&(this.indices=ArrayBuffer.isView(n)?{value:n,size:1}:n),this.attributes={};for(const[r,o]of Object.entries(t)){const a=ArrayBuffer.isView(o)?{value:o}:o;if(!ArrayBuffer.isView(a.value))throw new Error(`${this._print(r)}: must be typed array or object with value as typed array`);if((r==="POSITION"||r==="positions")&&!a.size&&(a.size=3),r==="indices"){if(this.indices)throw new Error("Multiple indices detected");this.indices=a}else{const c=ki(r),l=Object.keys(this.attributes).find(u=>ki(u)===c);l&&delete this.attributes[l],this.attributes[r]=a}}this.indices&&this.indices.isIndexed!==void 0&&(this.indices=Object.assign({},this.indices),delete this.indices.isIndexed),this.vertexCount=s||this._calculateVertexCount(this.attributes,this.indices),this.bufferLayout=e.bufferLayout||IS(this.attributes)}getVertexCount(){return this.vertexCount}getAttributes(){return this.indices?{indices:this.indices,...this.attributes}:this.attributes}_print(e){return`Geometry ${this.id} attribute ${e}`}_setAttributes(e,t){return this}_calculateVertexCount(e,t){if(t)return t.value.length;let n=1/0;for(const s of Object.values(e)){if(!s)continue;const{value:r,size:o,constant:a}=s;!a&&r&&o!==void 0&&o>=1&&(n=Math.min(n,r.length/o))}return n}}function ki(i){switch(i){case"POSITION":return"positions";case"NORMAL":return"normals";case"TEXCOORD_0":return"texCoords";case"TEXCOORD_1":return"texCoords1";case"COLOR_0":return"colors";default:return i}}function IS(i){const e=[];for(const[t,n]of Object.entries(i)){if(!n)continue;const{value:s,size:r,normalized:o}=n;if(r===void 0)throw new Error(`Attribute ${t} is missing a size`);e.push({name:ki(t),format:ne.getVertexFormatFromAttribute(s,r,o)})}return e}function Ps(i,e={}){const t=e.bufferName||"geometry";if(MS(i,t))return i;const n=e.minAttributeAlignment||4,s=RS(i,e.attributes),r=[];let o=0,a=1/0;for(const[u,f]of s){if(!f)continue;if(f.constant)throw new Error(`Attribute ${u} is constant`);const{value:d,size:g,normalized:p}=f;if(!ArrayBuffer.isView(d))throw new Error(`Attribute ${u} is missing typed array data`);if(g===void 0)throw new Error(`Attribute ${u} is missing a size`);const m=ne.getVertexFormatFromAttribute(d,g,p),y=ne.getVertexFormatInfo(m);o=Gd(o,n),r.push({sourceName:u,attributeName:ki(u),value:d,size:g,format:m,byteOffset:o,byteLength:y.byteLength}),o+=y.byteLength;const _=d.length/g;if(!Number.isInteger(_))throw new Error(`Attribute ${u} length is not divisible by size`);a=Math.min(a,_)}if(r.length===0||!Number.isFinite(a))throw new Error(`Geometry ${i.id} has no interleavable attributes`);const c=Gd(o,n),l=new ArrayBuffer(a*c);for(const u of r)OS(l,a,c,u);return new ke({id:i.id,topology:i.topology||"triangle-list",vertexCount:i.vertexCount,indices:i.indices,attributes:{[t]:{value:new Uint8Array(l),size:c,byteStride:c}},bufferLayout:[{name:t,stepMode:"vertex",byteStride:c,attributes:r.map(u=>({attribute:u.attributeName,format:u.format,byteOffset:u.byteOffset}))}]})}function MS(i,e){if(i.bufferLayout.length!==1)return!1;const t=i.bufferLayout[0];return t.name===e&&!!t.attributes?.length&&!!i.attributes[e]}function RS(i,e){return e?e.map(t=>[t,i.attributes[t]]):Object.entries(i.attributes)}function OS(i,e,t,n){const s=n.value.constructor,r=s.BYTES_PER_ELEMENT;if(n.byteOffset%r!==0||t%r!==0)throw new Error(`Attribute ${n.sourceName} is not aligned to its component type`);const o=new s(i),a=n.value,c=n.byteOffset/r,l=t/r;for(let u=0;u<e;u++){const f=u*n.size,d=u*l+c;for(let g=0;g<n.size;g++)o[d+g]=a[f+g]}}function Gd(i,e){return Math.ceil(i/e)*e}let BS=1,kS=1;class Vd{constructor(){h(this,"time",0);h(this,"channels",new Map);h(this,"animations",new Map);h(this,"playing",!1);h(this,"lastEngineTime",-1)}addChannel(e){const{delay:t=0,duration:n=Number.POSITIVE_INFINITY,rate:s=1,repeat:r=1}=e,o=BS++,a={time:0,delay:t,duration:n,rate:s,repeat:r};return this._setChannelTime(a,this.time),this.channels.set(o,a),o}removeChannel(e){this.channels.delete(e);for(const[t,n]of this.animations)n.channel===e&&this.detachAnimation(t)}isFinished(e){const t=this.channels.get(e);return t===void 0?!1:this.time>=t.delay+t.duration*t.repeat}getTime(e){if(e===void 0)return this.time;const t=this.channels.get(e);return t===void 0?-1:t.time}setTime(e){this.time=Math.max(0,e);const t=this.channels.values();for(const s of t)this._setChannelTime(s,this.time);const n=this.animations.values();for(const s of n){const{animation:r,channel:o}=s;r.setTime(this.getTime(o))}}play(){this.playing=!0}pause(){this.playing=!1,this.lastEngineTime=-1}reset(){this.setTime(0)}attachAnimation(e,t){const n=kS++;return this.animations.set(n,{animation:e,channel:t}),e.setTime(this.getTime(t)),n}detachAnimation(e){this.animations.delete(e)}update(e){this.playing&&(this.lastEngineTime===-1&&(this.lastEngineTime=e),this.setTime(this.time+(e-this.lastEngineTime)),this.lastEngineTime=e)}_setChannelTime(e,t){const n=t-e.delay,s=e.duration*e.repeat;n>=s?e.time=e.duration*e.rate:(e.time=Math.max(0,n)%e.duration,e.time*=e.rate)}}function DS(i){const e=typeof window<"u"?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame:null;return e?e.call(window,i):setTimeout(()=>i(typeof performance<"u"?performance.now():Date.now()),1e3/60)}function FS(i){const e=typeof window<"u"?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame:null;if(e){e.call(window,i);return}clearTimeout(i)}let NS=0;const zS="Animation Loop",jd={requestAnimationFrame:i=>DS(i),cancelAnimationFrame:i=>FS(i)},gn=class gn{constructor(e){h(this,"device",null);h(this,"canvas",null);h(this,"props");h(this,"animationProps",null);h(this,"timeline",null);h(this,"stats");h(this,"sharedStats");h(this,"cpuTime");h(this,"gpuTime");h(this,"frameRate");h(this,"display");h(this,"_needsRedraw","initialized");h(this,"_initialized",!1);h(this,"_running",!1);h(this,"_animationFrameId",null);h(this,"_nextFramePromise",null);h(this,"_resolveNextFrame",null);h(this,"_cpuStartTime",0);h(this,"_error",null);h(this,"_lastFrameTime",0);if(this.props={...gn.defaultAnimationLoopProps,...e},e=this.props,!e.device)throw new Error("No device provided");this.stats=e.stats||new vn({id:`animation-loop-${NS++}`}),this.sharedStats=ao.stats.get(zS),this.frameRate=this.stats.get("Frame Rate"),this.frameRate.setSampleSize(1),this.cpuTime=this.stats.get("CPU Time"),this.gpuTime=this.stats.get("GPU Time"),this.setProps({autoResizeViewport:e.autoResizeViewport,animationFrameProvider:e.animationFrameProvider}),this.start=this.start.bind(this),this.stop=this.stop.bind(this),this._onMousemove=this._onMousemove.bind(this),this._onMouseleave=this._onMouseleave.bind(this)}destroy(){this.stop(),this._setDisplay(null),this.device?._disableDebugGPUTime()}delete(){this.destroy()}reportError(e){this._error=e,this.props.onError(e),this.props.onError===gn.defaultAnimationLoopProps.onError&&typeof window<"u"&&typeof ErrorEvent<"u"&&window.dispatchEvent(new ErrorEvent("error",{error:e,message:e.message}))}setNeedsRedraw(e){return this._needsRedraw=this._needsRedraw||e,this}needsRedraw(){const e=this._needsRedraw;return this._needsRedraw=!1,e}setProps(e){if("autoResizeViewport"in e&&(this.props.autoResizeViewport=e.autoResizeViewport||!1),"animationFrameProvider"in e){const t=e.animationFrameProvider||jd;if(t!==this.props.animationFrameProvider){const n=this._animationFrameId!==null;n&&this._cancelAnimationFrame(),this.props.animationFrameProvider=t,n&&this._requestAnimationFrame()}}return this}async start(){if(this._running)return this;this._running=!0;try{let e;if(!this._initialized){if(this._initialized=!0,await this._initDevice(),this._initialize(),!this._running)return null;await this.props.onInitialize(this._getAnimationProps())}return this._running?(e!==!1&&(this._cancelAnimationFrame(),this._requestAnimationFrame()),this):null}catch(e){const t=e instanceof Error?e:new Error("Unknown error");throw this.props.onError(t),t}}stop(){if(this._running){const e=this.animationProps;this._cancelAnimationFrame(),this._nextFramePromise=null,this._resolveNextFrame=null,this._running=!1,this._lastFrameTime=0,e&&this.props.onFinalize(e)}return this}redraw(e,t=null){return this.device?.isLost||this._error?this:(this._beginFrameTimers(e),this._setupFrame(),this.animationProps&&(this.animationProps.animationFrame=t),this._updateAnimationProps(),this._renderFrame(this._getAnimationProps()),this._clearNeedsRedraw(),this._resolveNextFrame&&(this._resolveNextFrame(this),this._nextFramePromise=null,this._resolveNextFrame=null),this._endFrameTimers(),this)}attachTimeline(e){return this.timeline=e,this.timeline}detachTimeline(){this.timeline=null}waitForRender(){return this.setNeedsRedraw("waitForRender"),this._nextFramePromise||(this._nextFramePromise=new Promise(e=>{this._resolveNextFrame=e})),this._nextFramePromise}async toDataURL(){if(this.setNeedsRedraw("toDataURL"),await this.waitForRender(),this.canvas instanceof HTMLCanvasElement)return this.canvas.toDataURL();throw new Error("OffscreenCanvas")}_initialize(){this._startEventHandling(),this._initializeAnimationProps(),this._updateAnimationProps(),this._resizeViewport(),this.device?._enableDebugGPUTime()}_setDisplay(e){this.display&&(this.display.destroy(),this.display.animationLoop=null),e&&(e.animationLoop=this),this.display=e}_requestAnimationFrame(){this._running&&(this._animationFrameId=this.props.animationFrameProvider.requestAnimationFrame(this._animationFrame.bind(this)))}_cancelAnimationFrame(){this._animationFrameId!==null&&(this.props.animationFrameProvider.cancelAnimationFrame(this._animationFrameId),this._animationFrameId=null)}_animationFrame(e,t){if(this._running)try{this.redraw(e,t??null),this._requestAnimationFrame()}catch(n){const s=n instanceof Error?n:new Error(String(n));this.reportError(s),this.stop()}}_renderFrame(e){if(this.display){this.display._renderFrame(e);return}const t=this.props.onRender(this._getAnimationProps());this.device&&t!==!1&&this.device.submit()}_clearNeedsRedraw(){this._needsRedraw=!1}_setupFrame(){this._resizeViewport()}_initializeAnimationProps(){const e=this.device?.getDefaultCanvasContext();if(!this.device||!e)throw new Error("loop");const t=e?.canvas,n=e.props.useDevicePixels;this.animationProps={animationLoop:this,device:this.device,canvasContext:e,canvas:t,useDevicePixels:n,timeline:this.timeline,needsRedraw:!1,width:1,height:1,aspect:1,time:0,startTime:Date.now(),engineTime:0,tick:0,tock:0,animationFrame:null,_mousePosition:null}}_getAnimationProps(){if(!this.animationProps)throw new Error("animationProps");return this.animationProps}_updateAnimationProps(){if(!this.animationProps)return;const{width:e,height:t,aspect:n}=this._getSizeAndAspect();(e!==this.animationProps.width||t!==this.animationProps.height)&&this.setNeedsRedraw("drawing buffer resized"),n!==this.animationProps.aspect&&this.setNeedsRedraw("drawing buffer aspect changed"),this.animationProps.width=e,this.animationProps.height=t,this.animationProps.aspect=n,this.animationProps.needsRedraw=this._needsRedraw,this.animationProps.engineTime=Date.now()-this.animationProps.startTime,this.timeline&&this.timeline.update(this.animationProps.engineTime),this.animationProps.tick=Math.floor(this.animationProps.time/1e3*60),this.animationProps.tock++,this.animationProps.time=this.timeline?this.timeline.getTime():this.animationProps.engineTime}async _initDevice(){if(this.device=await this.props.device,!this.device)throw new Error("No device provided");this.canvas=this.device.getDefaultCanvasContext().canvas||null}_createInfoDiv(){if(this.canvas&&this.props.onAddHTML){const e=document.createElement("div");document.body.appendChild(e),e.style.position="relative";const t=document.createElement("div");t.style.position="absolute",t.style.left="10px",t.style.bottom="10px",t.style.width="300px",t.style.background="white",this.canvas instanceof HTMLCanvasElement&&e.appendChild(this.canvas),e.appendChild(t);const n=this.props.onAddHTML(t);n&&(t.innerHTML=n)}}_getSizeAndAspect(){if(!this.device)return{width:1,height:1,aspect:1};const[e,t]=this.device.getDefaultCanvasContext().getDrawingBufferSize(),n=e>0&&t>0?e/t:1;return{width:e,height:t,aspect:n}}_resizeViewport(){this.props.autoResizeViewport&&this.device.gl&&this.device.gl.viewport(0,0,this.device.gl.drawingBufferWidth,this.device.gl.drawingBufferHeight)}_beginFrameTimers(e){const t=e??(typeof performance<"u"?performance.now():Date.now());if(this._lastFrameTime){const n=t-this._lastFrameTime;n>0&&this.frameRate.addTime(n)}this._lastFrameTime=t,this.device?._isDebugGPUTimeEnabled()&&this._consumeEncodedGpuTime(),this.cpuTime.timeStart()}_endFrameTimers(){this.device?._isDebugGPUTimeEnabled()&&this._consumeEncodedGpuTime(),this.cpuTime.timeEnd(),this._updateSharedStats()}_consumeEncodedGpuTime(){if(!this.device)return;const e=this.device.commandEncoder._gpuTimeMs;e!==void 0&&(this.gpuTime.addTime(e),this.device.commandEncoder._gpuTimeMs=void 0)}_updateSharedStats(){if(this.stats!==this.sharedStats){for(const e of Object.keys(this.sharedStats.stats))this.stats.stats[e]||delete this.sharedStats.stats[e];this.stats.forEach(e=>{const t=this.sharedStats.get(e.name,e.type);t.sampleSize=e.sampleSize,t.time=e.time,t.count=e.count,t.samples=e.samples,t.lastTiming=e.lastTiming,t.lastSampleTime=e.lastSampleTime,t.lastSampleCount=e.lastSampleCount,t._count=e._count,t._time=e._time,t._samples=e._samples,t._startTime=e._startTime,t._timerPending=e._timerPending})}}_startEventHandling(){this.canvas&&(this.canvas.addEventListener("mousemove",this._onMousemove.bind(this)),this.canvas.addEventListener("mouseleave",this._onMouseleave.bind(this)))}_onMousemove(e){e instanceof MouseEvent&&(this._getAnimationProps()._mousePosition=[e.offsetX,e.offsetY])}_onMouseleave(e){this._getAnimationProps()._mousePosition=null}};h(gn,"defaultAnimationLoopProps",{device:null,onAddHTML:()=>"",onInitialize:async()=>null,onRender:()=>{},onFinalize:()=>{},onError:e=>{console.error(e)},stats:void 0,autoResizeViewport:!1,animationFrameProvider:jd});let La=gn;class Wd{constructor(e){h(this,"id");h(this,"userData",{});h(this,"topology");h(this,"bufferLayout",[]);h(this,"vertexCount");h(this,"indices");h(this,"attributes");if(this.id=e.id||Bi("geometry"),this.topology=e.topology,this.indices=e.indices||null,this.attributes=e.attributes,this.vertexCount=e.vertexCount,this.bufferLayout=e.bufferLayout||[],this.indices&&!(this.indices.usage&F.INDEX))throw new Error("Index buffer must have INDEX usage")}destroy(){this.indices?.destroy();for(const e of Object.values(this.attributes))e.destroy()}getVertexCount(){return this.vertexCount}getAttributes(){return this.attributes}getIndexes(){return this.indices||null}_calculateVertexCount(e){return e.byteLength/12}}function US(i,e){if(e instanceof Wd)return e;const t=Ps(e),n=$S(i,t),{attributes:s,bufferLayout:r}=GS(i,t);return new Wd({topology:t.topology||"triangle-list",bufferLayout:r,vertexCount:t.vertexCount,indices:n,attributes:s})}function $S(i,e){if(!e.indices)return;const t=e.indices.value;return i.createBuffer({usage:F.INDEX,data:t})}function GS(i,e){const t={};for(const[n,s]of Object.entries(e.attributes)){const r=e.bufferLayout.find(o=>o.name===n)?.name||ki(n);s&&(t[r]=i.createBuffer({data:s.value,id:`${n}-buffer`}))}return{attributes:t,bufferLayout:e.bufferLayout,vertexCount:e.vertexCount}}function VS(i,e){const t={},n="Values";if(i.attributes.length===0&&!i.varyings?.length)return{"No attributes or varyings":{[n]:"N/A"}};for(const s of i.attributes)if(s){const r=`${s.location} ${s.name}: ${s.type}`;t[`in ${r}`]={[n]:s.stepMode||"vertex"}}for(const s of i.varyings||[]){const r=`${s.location} ${s.name}`;t[`out ${r}`]={[n]:JSON.stringify(s)}}return t}const Ss="__debugFramebufferState",Ta=8;function jS(i,e,t){if(i.device.type!=="webgl")return;const n=YS(i.device);if(!n.flushing){if(XS(i)){WS(i,t,n);return}e&&qS(e)&&e.handle!==null&&(n.queuedFramebuffers.includes(e)||n.queuedFramebuffers.push(e))}}function WS(i,e,t){if(t.queuedFramebuffers.length===0)return;const n=i.device,{gl:s}=n,r=s.getParameter(36010),o=s.getParameter(36006),[a,c]=i.device.getDefaultCanvasContext().getDrawingBufferSize();let l=Hd(e.top,Ta);const u=Hd(e.left,Ta);t.flushing=!0;try{for(const f of t.queuedFramebuffers){const[d,g,p,m,y]=HS({framebuffer:f,targetWidth:a,targetHeight:c,topPx:l,leftPx:u,minimap:e.minimap});s.bindFramebuffer(36008,f.handle),s.bindFramebuffer(36009,null),s.blitFramebuffer(0,0,f.width,f.height,d,g,p,m,16384,9728),l+=y+Ta}}finally{s.bindFramebuffer(36008,r),s.bindFramebuffer(36009,o),t.flushing=!1}}function HS(i){const{framebuffer:e,targetWidth:t,targetHeight:n,topPx:s,leftPx:r}=i,o=Math.max(Math.floor(t/4),1),a=Math.max(Math.floor(n/4),1),c=Math.min(o/e.width,a/e.height),l=Math.max(Math.floor(e.width*c),1),u=Math.max(Math.floor(e.height*c),1),f=r,d=Math.max(n-s-u,0),g=f+l,p=d+u;return[f,d,g,p,u]}function YS(i){var e;return(e=i.userData)[Ss]||(e[Ss]={flushing:!1,queuedFramebuffers:[]}),i.userData[Ss]}function qS(i){return"colorAttachments"in i}function XS(i){const e=i.props.framebuffer;return!e||e.handle===null}function Hd(i,e){if(!i)return e;const t=Number.parseInt(i,10);return Number.isFinite(t)?t:e}function Di(i,e,t){if(i===e)return!0;if(!t||!i||!e)return!1;if(Array.isArray(i)){if(!Array.isArray(e)||i.length!==e.length)return!1;for(let n=0;n<i.length;n++)if(!Di(i[n],e[n],t-1))return!1;return!0}if(Array.isArray(e))return!1;if(typeof i=="object"&&typeof e=="object"){const n=Object.keys(i),s=Object.keys(e);if(n.length!==s.length)return!1;for(const r of n)if(!e.hasOwnProperty(r)||!Di(i[r],e[r],t-1))return!1;return!0}return!1}class Aa{constructor(e){h(this,"bufferLayouts");this.bufferLayouts=e}getBufferLayout(e){return this.bufferLayouts.find(t=>t.name===e)||null}getAttributeNamesForBuffer(e){return zo(e)}mergeBufferLayouts(e,t){const n=[...e];for(const s of t){const r=n.findIndex(o=>o.name===s.name);r<0?n.push(s):n[r]=s}return n}}function ZS(i,e){const t=e0(i),n=e.slice();return n.sort((s,r)=>{const o=rf(zo(s).map(c=>t[c])),a=rf(zo(r).map(c=>t[c]));return o-a}),n}function Es(i,e){if(!i||!e.some(n=>n.bindingLayout?.length))return i;const t={...i,bindings:i.bindings.map(n=>({...n}))};"attributes"in(i||{})&&(t.attributes=i?.attributes||[]);for(const n of e)for(const s of n.bindingLayout||[])for(const r of JS(s.name)){const o=t.bindings.find(a=>a.name===r);o?.group===0&&(o.group=s.group),o&&s.visibility!==void 0&&(o.visibility=s.visibility)}return t}function KS(i,e,t=[]){return i?e?{...i,attributes:i.attributes.length?iE(i.attributes,e.attributes.filter(n=>t.includes(n.name))):e.attributes,bindings:tE(i.bindings,e.bindings)}:i:e}function Ia(i){return!!(i.uniformTypes&&!eE(i.uniformTypes))}function QS(i){const e=[];for(const t of i){const n=Uo(t),s=new Set([t.vs,t.fs].flatMap(o=>o?$o(o).filter(a=>a.isStd140).map(a=>a.blockName):[])),r=s.has(n)?n:s.size===1?s.values().next().value:void 0;Ia(t)&&r&&e.push({name:r,uniformTypes:t.uniformTypes})}return e}function Yd(i,e){const t=[],n=new Set;for(const s of[...i||[],...e||[]])n.has(s.name)||(n.add(s.name),t.push(s));return t}function JS(i){const e=new Set([i,`${i}Uniforms`]);return i.endsWith("Uniforms")||e.add(`${i}Sampler`),[...e]}function eE(i){for(const e in i)return!1;return!0}function tE(i,e){const t=i.map(r=>({...r})),n=new Set(i.map(r=>r.name)),s=new Set(i.map(r=>`${r.group}:${r.location}`));for(const r of e){const o=`${r.group}:${r.location}`;!n.has(r.name)&&!s.has(o)&&t.push({...r})}return t}function iE(i,e){const t=i.map(r=>({...r})),n=new Map(i.map(r=>[r.name,r])),s=new Map(i.map(r=>[r.location,r]));for(const r of e){const o=n.get(r.name);if(o){if(o.type!==r.type||o.location!==r.location)throw new Error(`Shader attribute "${r.name}" conflicts with its inferred type or location`);continue}const a=s.get(r.location);if(a)throw new Error(`Shader attributes "${a.name}" and "${r.name}" both use location ${r.location}`);t.push({...r})}return t}function nE(i){return au(i)||typeof i=="number"||typeof i=="boolean"}function sE(i,e={}){const t={bindings:{},uniforms:{}};return Object.keys(i).forEach(n=>{const s=i[n];Object.prototype.hasOwnProperty.call(e,n)||nE(s)?t.uniforms[n]=s:t.bindings[n]=s}),t}class qd{constructor(e,t){h(this,"options",{disableWarnings:!1});h(this,"modules");h(this,"moduleUniforms");h(this,"moduleBindings");h(this,"directBindings",{});Object.assign(this.options,t);const n=kn(Object.values(e).filter(rE));for(const s of n)e[s.name]=s;S.log(1,"Creating ShaderInputs with modules",Object.keys(e))(),this.modules=e,this.moduleUniforms={},this.moduleBindings={};for(const[s,r]of Object.entries(e))r&&(this._addModule(r),r.name&&s!==r.name&&!this.options.disableWarnings&&S.warn(`Module name: ${s} vs ${r.name}`)())}destroy(){}setProps(e){e.bindings&&Object.assign(this.directBindings,e.bindings);for(const t of Object.keys(e)){if(t==="bindings")continue;const n=t,s=e[n]||{},r=this.modules[n];if(!r)this.options.disableWarnings||S.warn(`Module ${t} not found`)();else{const o=this.moduleUniforms[n],a=this.moduleBindings[n],c=r.getUniforms?.(s,o)||s,{uniforms:l,bindings:u}=sE(c,r.uniformTypes);this.moduleUniforms[n]=Xd(o,l,r.uniformTypes),this.moduleBindings[n]={...a,...u}}}}getModules(){return Object.values(this.modules)}addModules(e){const t=kn(e);for(const n of t){const s=n.name;this.modules[s]||(this.modules[s]=n,this._addModule(n))}}getUniformValues(){return this.moduleUniforms}getBindingValues(){const e={};for(const t of Object.values(this.moduleBindings))Object.assign(e,t);return Object.assign(e,this.directBindings),e}getModuleBindingValues(e){const t=this.moduleBindings[e];return t?{...t}:{}}getDebugTable(){const e={};for(const[t,n]of Object.entries(this.moduleUniforms))for(const[s,r]of Object.entries(n))e[`${t}.${s}`]={type:this.modules[t].uniformTypes?.[s],value:String(r)};return e}_addModule(e){const t=e.name;this.moduleUniforms[t]=Xd({},e.defaultUniforms||{},e.uniformTypes),this.moduleBindings[t]={}}}function Xd(i={},e={},t={}){const n={...i};for(const[s,r]of Object.entries(e))r!==void 0&&(n[s]=Ma(i[s],r,t[s]));return n}function Ma(i,e,t){if(!t||typeof t=="string")return Fi(e);if(Array.isArray(t)){if(Ra(e)||!Array.isArray(e))return Fi(e);const o=Array.isArray(i)&&!Ra(i)?[...i]:[],a=o.slice();for(let c=0;c<e.length;c++){const l=e[c];l!==void 0&&(a[c]=Ma(o[c],l,t[0]))}return a}if(!Oa(e))return Fi(e);const n=t,s=Oa(i)?i:{},r={...s};for(const[o,a]of Object.entries(e))a!==void 0&&(r[o]=Ma(s[o],a,n[o]));return r}function Fi(i){return ArrayBuffer.isView(i)?Array.prototype.slice.call(i):Array.isArray(i)?Ra(i)?i.slice():i.map(t=>t===void 0?void 0:Fi(t)):Oa(i)?Object.fromEntries(Object.entries(i).map(([e,t])=>[e,t===void 0?void 0:Fi(t)])):i}function Ra(i){return ArrayBuffer.isView(i)||Array.isArray(i)&&(i.length===0||typeof i[0]=="number")}function Oa(i){return!!i&&typeof i=="object"&&!Array.isArray(i)&&!ArrayBuffer.isView(i)}function rE(i){return!!i?.dependencies}const oE=F.DEBUG_DATA_MAX_LENGTH;class De{constructor(e,t){h(this,"device");h(this,"id");h(this,"ready");h(this,"usage");h(this,"props");h(this,"isReady",!0);h(this,"destroyed",!1);h(this,"generation",0);h(this,"updateTimestamp");h(this,"debugData",new ArrayBuffer(0));h(this,"_debugDataEnabled");h(this,"_maxDebugDataByteLength");h(this,"_ownsBuffer");h(this,"_buffer");const{debugData:n=!1,buffer:s,ownsBuffer:r=!0,...o}=t;if(s&&s.device!==e)throw new Error("DynamicBuffer adopted buffers must belong to the supplied device");if(s&&(o.byteLength!==void 0||o.data!==void 0))throw new Error("DynamicBuffer cannot combine an adopted buffer with byteLength or data");const a=t.id||s?.id||Bi("dynamic-buffer"),c={...o,id:a,usage:o.usage??s?.usage,indexType:o.indexType??s?.indexType};(c.usage||0)&F.INDEX&&!c.indexType&&(o.data instanceof Uint32Array?c.indexType="uint32":o.data instanceof Uint16Array?c.indexType="uint16":o.data instanceof Uint8Array&&(c.indexType="uint8")),delete c.data,delete c.byteOffset,this.device=e,this.id=a,this.props=c,this.usage=c.usage||0,this._debugDataEnabled=!!n,this._maxDebugDataByteLength=typeof n=="object"&&n.maxByteLength!==void 0?n.maxByteLength:oE,this._ownsBuffer=r,this._buffer=s??this.device.createBuffer({...o,id:a}),this.ready=Promise.resolve(this._buffer),this.updateTimestamp=this._buffer.updateTimestamp,this._resetDebugData(this._buffer.byteLength),o.data&&this._writeDebugData(o.data,o.byteOffset||0)}get buffer(){return this._buffer}get byteLength(){return this._buffer.byteLength}get[Symbol.toStringTag](){return"DynamicBuffer"}toString(){return`DynamicBuffer:"${this.id}":${this.byteLength}B`}toJSON(){return this.toString()}write(e,t=0){this._buffer.write(e,t),this._touch(),this._writeDebugData(e,t)}async mapAndWriteAsync(e,t=0,n=this.byteLength-t){let s=null;await this._buffer.mapAndWriteAsync(async(r,o)=>{await e(r,o),s=new Uint8Array(r.slice(0,n))},t,n),this._touch(),s&&this._writeDebugData(s,t)}async readAsync(e=0,t=this.byteLength-e){const n=await this._buffer.readAsync(e,t);return this._writeDebugData(n,e)&&this._touch(),n}async mapAndReadAsync(e,t=0,n=this.byteLength-t){let s=null;const r=await this._buffer.mapAndReadAsync(async(o,a)=>(s=new Uint8Array(o.slice(0)),await e(o,a)),t,n);return s&&this._writeDebugData(s,t)&&this._touch(),r}resize(e){const{byteLength:t,preserveData:n=!1}=e;if(t===this.byteLength)return!1;const s=Math.min(e.copyByteLength??Math.min(this.byteLength,t),this.byteLength,t),r=this._buffer,o=this.debugData.slice(0),{data:a,byteOffset:c,...l}=this.props,u=this.device.createBuffer({...l,byteLength:t});return n&&s>0&&this._copyBufferContents(r,u,s),this._buffer=u,this._resetDebugData(t),n&&o.byteLength>0&&this._writeDebugData(o,0),this._ownsBuffer&&r.destroy(),this._ownsBuffer=!0,this.generation++,this._touch(),!0}ensureSize(e,t){return e<=this.byteLength?!1:this.resize({byteLength:e,preserveData:t?.preserveData})}getBinding(e){return e?.offset===void 0&&e?.size===void 0?this._buffer:{buffer:this._buffer,offset:e?.offset,size:e?.size}}destroy(){this.destroyed||(this._ownsBuffer&&this._buffer.destroy(),this.destroyed=!0,this.debugData=new ArrayBuffer(0))}_copyBufferContents(e,t,n){const s=this.device.type==="webgpu"?Math.ceil(n/4)*4:n,r=this.device.createCommandEncoder();r.copyBufferToBuffer({sourceBuffer:e,destinationBuffer:t,size:s}),this.device.submit(r.finish())}_touch(){this.updateTimestamp=this.device.incrementTimestamp()}_resetDebugData(e){if(!this._debugDataEnabled){this.debugData=new ArrayBuffer(0);return}this.debugData=new ArrayBuffer(Math.min(e,this._maxDebugDataByteLength))}_writeDebugData(e,t){if(!this._debugDataEnabled||this.debugData.byteLength===0||t>=this.debugData.byteLength)return!1;const n=ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new Uint8Array(e),s=new Uint8Array(this.debugData),r=Math.min(n.byteLength,s.byteLength-t);return s.set(n.subarray(0,r),t),r>0}}function Zd(i){return i!==null&&typeof i=="object"&&"buffer"in i}function aE(i){return i instanceof De?i.buffer:i}function cE(i){return{buffer:aE(i.buffer),offset:i.offset,size:i.size}}function Cs(i){return i!==null&&typeof i=="object"&&"resolveTextureBinding"in i&&typeof i.resolveTextureBinding=="function"}function lE(i){return i?.type==="texture"||i?.type==="external-texture"}function uE(i,e,t){const n=Xu(i,e,{ignoreWarnings:!0});return lE(n)?n:i.bindings.length===0&&t?.fallbackGroup!==void 0?{type:"texture",name:e,group:t.fallbackGroup,location:0}:null}const Fe=2,fE=1e4,Ba="render pipeline initialization failed",dE=["stencil8","depth16unorm","depth24plus","depth24plus-stencil8","depth32float","depth32float-stencil8"],pn=class pn{constructor(e,t){h(this,"device");h(this,"id");h(this,"source");h(this,"vs");h(this,"fs");h(this,"pipelineFactory");h(this,"shaderFactory");h(this,"userData",{});h(this,"parameters");h(this,"topology");h(this,"bufferLayout");h(this,"isInstanced");h(this,"instanceCount",0);h(this,"vertexCount");h(this,"indexCount");h(this,"firstVertex");h(this,"firstIndex");h(this,"indexBuffer",null);h(this,"bufferAttributes",{});h(this,"constantAttributes",{});h(this,"bindings",{});h(this,"vertexArray");h(this,"transformFeedback",null);h(this,"pipeline");h(this,"shaderInputs");h(this,"material",null);h(this,"_uniformStore");h(this,"_attributeInfos",{});h(this,"_gpuGeometry",null);h(this,"props");h(this,"_dynamicIndexBufferSource",null);h(this,"_dynamicAttributeBufferSources",{});h(this,"_colorAttachmentFormats");h(this,"_depthStencilAttachmentFormat");h(this,"_pipelineNeedsUpdate","newly created");h(this,"_needsRedraw","initializing");h(this,"_drawBlockedReason",!1);h(this,"_destroyed",!1);h(this,"_lastDrawTimestamp",-1);h(this,"_bindingTable",[]);h(this,"_lastLogTime",0);h(this,"_logOpen",!1);h(this,"_drawCount",0);const n=pn.defaultProps.shaderAssembler;this.props={...pn.defaultProps,...t,shaderAssembler:t.shaderAssembler??(ka(n,e.info.shadingLanguage)?n:et.getDefaultShaderAssembler(e.info.shadingLanguage))},t=this.props,this.id=t.id||Bi("model"),this.device=e,Object.assign(this.userData,t.userData),this.material=t.material||null;const s=yE(e),r=af(this.props.plugins,s.shaderLanguage),o=cf(this.props.modules,r.modules),a=Object.fromEntries(o.map(d=>[d.name,d])),c=t.shaderInputs||new qd(a,{disableWarnings:this.props.disableWarnings});t.shaderInputs&&r.modules.length>0&&c.addModules(r.modules),this.setShaderInputs(c);const l=Yd(this.props.modules,c.getModules()),u={...r.defines,...this.props.defines};if(this.device.type==="webgl"&&(this.props._uniformBlockLayouts=QS(l)),this.props.shaderLayout=Es(this.props.shaderLayout,l)||null,this.device.type==="webgpu"&&this.props.source){const d=this.props.shaderAssembler;Ei(ka(d,"wgsl"));const{source:g,getUniforms:p,bindingTable:m,shaderLayout:y}=d.assembleWGSLShader({platformInfo:s,...this.props,modules:l,defines:u,pluginInjections:r.injections,pluginVertexInputs:r.vertexInputs,pluginVaryings:r.varyings});this.source=g,this._getModuleUniforms=p,this._bindingTable=m;const _=y??e.getShaderLayout?.(this.source),v=hE(_,r.vertexInputs),b=KS(this.props.shaderLayout,v,Object.keys(r.vertexInputs));this.props.shaderLayout=Es(b||null,l)||null}else{const d=this.props.shaderAssembler;Ei(ka(d,"glsl"));const{vs:g,fs:p,getUniforms:m}=d.assembleGLSLShaderPair({platformInfo:s,...this.props,modules:l,defines:u,pluginInjections:r.injections,pluginVertexInputs:r.vertexInputs,pluginVaryings:r.varyings});this.vs=g,this.fs=p,this._getModuleUniforms=m,this._bindingTable=[]}this.vertexCount=this.props.vertexCount,this.indexCount=this.props.indexCount,this.firstVertex=this.props.firstVertex,this.firstIndex=this.props.firstIndex,this.instanceCount=this.props.instanceCount,this.topology=this.props.topology,this.bufferLayout=this.props.bufferLayout,this.parameters=this.props.parameters,this._colorAttachmentFormats=this.props.colorAttachmentFormats,this._depthStencilAttachmentFormat=this.props.depthStencilAttachmentFormat,t.geometry&&this.setGeometry(t.geometry),this.pipelineFactory=t.pipelineFactory||Yn.getDefaultPipelineFactory(this.device),this.shaderFactory=t.shaderFactory||qn.getDefaultShaderFactory(this.device),this.pipeline=this._updatePipeline(),this.vertexArray=e.createVertexArray({shaderLayout:this.pipeline.shaderLayout,bufferLayout:this.pipeline.bufferLayout}),this._gpuGeometry&&this._setGeometryAttributes(this._gpuGeometry),"isInstanced"in t&&(this.isInstanced=t.isInstanced),t.instanceCount&&this.setInstanceCount(t.instanceCount),t.vertexCount&&this.setVertexCount(t.vertexCount),t.indexBuffer&&this.setIndexBuffer(t.indexBuffer),t.attributes&&this.setAttributes(t.attributes),t.constantAttributes&&this.setConstantAttributes(t.constantAttributes),t.bindings&&this.setBindings(t.bindings),t.transformFeedback&&(this.transformFeedback=t.transformFeedback)}get[Symbol.toStringTag](){return"Model"}toString(){return`Model(${this.id})`}destroy(){this._destroyed||(this.pipelineFactory.release(this.pipeline),this.shaderFactory.release(this.pipeline.vs),this.pipeline.fs&&this.pipeline.fs!==this.pipeline.vs&&this.shaderFactory.release(this.pipeline.fs),this._uniformStore.destroy(),this._gpuGeometry?.destroy(),this._destroyed=!0)}needsRedraw(){this._getBindingsUpdateTimestamp()>this._lastDrawTimestamp&&this.setNeedsRedraw("contents of bound textures or buffers updated");const e=this._needsRedraw;return this._needsRedraw=!1,e}setNeedsRedraw(e){this._needsRedraw||(this._needsRedraw=e)}getBindingDebugTable(){return this._bindingTable}predraw(e){this._syncDynamicBuffers(),this.updateShaderInputs(e),this.material?.updateShaderInputs(e),this.pipeline=this._updatePipeline()}draw(e){if(this._drawBlockedReason&&!this._pipelineNeedsUpdate)return S.info(Fe,`>>> DRAWING ABORTED ${this.id}: ${this._drawBlockedReason}`)(),!1;const t=this._areBindingsLoading();if(t)return S.info(Fe,`>>> DRAWING ABORTED ${this.id}: ${t} not loaded`)(),!1;this._syncAttachmentFormats(e);try{e.pushDebugGroup(`${this}.predraw(${e})`),this.device.type==="webgpu"?(this.updateShaderInputs(),this.material?.updateShaderInputs(),this._syncDynamicBuffers(),this.pipeline=this._updatePipeline()):this.predraw(this.device.commandEncoder)}finally{e.popDebugGroup()}let n,s=this.pipeline.isErrored;try{if(e.pushDebugGroup(`${this}.draw(${e})`),this._logDrawCallStart(),this.pipeline=this._updatePipeline(),s=this.pipeline.isErrored,s)S.info(Fe,`>>> DRAWING ABORTED ${this.id}: ${Ba}`)(),n=!1;else{const r=this.vertexArray.getDrawValidationError();if(r)S.info(Fe,`>>> DRAWING ABORTED ${this.id}: ${r}`)(),this._drawBlockedReason=r,n=!1;else{const o=this._getCurrentShaderLayout(),a=this._getBindings(o),c=this._getBindGroups(o,a),{indexBuffer:l}=this.vertexArray,u=l?this.indexCount??l.byteLength/(l.indexType==="uint32"?4:2):void 0;e.setPipeline(this.pipeline),e.setBindings(c,{_bindGroupCacheKeys:this._getBindGroupCacheKeys()}),e.setVertexArray(this.vertexArray),n=this.isInstanced===!0&&this.instanceCount===0?!0:e.draw({isInstanced:this.isInstanced,vertexCount:this.vertexCount,instanceCount:this.isInstanced?this.instanceCount:void 0,indexCount:u,firstVertex:this.firstVertex,firstIndex:this.firstIndex,transformFeedback:this.transformFeedback||void 0,uniforms:this.props.uniforms,parameters:this.parameters,topology:this.topology})}}}finally{e.popDebugGroup(),this._logDrawCallEnd()}return this._logFramebuffer(e),n?(this._lastDrawTimestamp=this.device.timestamp,this._needsRedraw=!1):s?(this._needsRedraw=Ba,this._drawBlockedReason=Ba):this._drawBlockedReason?this._needsRedraw=this._drawBlockedReason:this._needsRedraw="waiting for resource initialization",n}setGeometry(e){this._gpuGeometry?.destroy();const t=e&&US(this.device,e);if(t){this.setTopology(t.topology||"triangle-list");const n=new Aa(this.bufferLayout);this.bufferLayout=n.mergeBufferLayouts(t.bufferLayout,this.bufferLayout),this.vertexArray&&this._setGeometryAttributes(t)}this._gpuGeometry=t}setTopology(e){e!==this.topology&&(this.topology=e,this._setPipelineNeedsUpdate("topology"))}setBufferLayout(e){const t=new Aa(this.bufferLayout),n=this._gpuGeometry?t.mergeBufferLayouts(e,this._gpuGeometry.bufferLayout):e;Di(n,this.bufferLayout,-1)||(this.bufferLayout=n,this._setPipelineNeedsUpdate("bufferLayout"),this.pipeline=this._updatePipeline(),this.vertexArray=this.device.createVertexArray({shaderLayout:this.pipeline.shaderLayout,bufferLayout:this.pipeline.bufferLayout}),this._gpuGeometry&&this._setGeometryAttributes(this._gpuGeometry))}setParameters(e){Di(e,this.parameters,2)||(this.parameters=e,this._setPipelineNeedsUpdate("parameters"))}setInstanceCount(e){this.instanceCount=e,this.isInstanced===void 0&&e>0&&(this.isInstanced=!0),this.setNeedsRedraw("instanceCount")}setVertexCount(e){this.vertexCount=e,this.setNeedsRedraw("vertexCount")}setIndexCount(e){this.indexCount=e,this.setNeedsRedraw("indexCount")}setDrawOffsets({firstVertex:e,firstIndex:t}){this.firstVertex=e,this.firstIndex=t,this.setNeedsRedraw("drawOffsets")}setShaderInputs(e){this.shaderInputs=e,this._uniformStore=new sf(this.device,this.shaderInputs.modules);for(const[t,n]of Object.entries(this.shaderInputs.modules))if(Ia(n)&&!this.material?.ownsModule(t)){const s=this._uniformStore.getManagedUniformBuffer(t);this.bindings[`${t}Uniforms`]=s}this.setNeedsRedraw("shaderInputs")}setMaterial(e){this.material=e,this.setNeedsRedraw("material")}updateShaderInputs(e){this._uniformStore.setUniforms(this.shaderInputs.getUniformValues(),e),this.setBindings(this._getNonMaterialBindings(this.shaderInputs.getBindingValues())),this.setNeedsRedraw("shaderInputs")}setBindings(e){Object.assign(this.bindings,e),this.setNeedsRedraw("bindings")}setTransformFeedback(e){this.transformFeedback=e,this.setNeedsRedraw("transformFeedback")}setIndexBuffer(e){const t=e instanceof De?e.buffer:e;this.indexBuffer=t,this._dynamicIndexBufferSource=e instanceof De?{source:e,generation:e.generation}:null,this.vertexArray.setIndexBuffer(t),this.setNeedsRedraw("indexBuffer")}setAttributes(e,t){this._drawBlockedReason=!1;const n=t?.disableWarnings??this.props.disableWarnings;e.indices&&S.warn(`Model:${this.id} setAttributes() - indexBuffer should be set using setIndexBuffer()`)(),this.bufferLayout=ZS(this.pipeline.shaderLayout,this.bufferLayout);const s=new Aa(this.bufferLayout);for(const[r,o]of Object.entries(e)){const a=o instanceof De?o.buffer:o,c=s.getBufferLayout(r);if(!c){n||S.warn(`Model(${this.id}): Missing layout for buffer "${r}".`)();continue}const l=s.getAttributeNamesForBuffer(c);let u=!1;for(const f of l){const d=this._attributeInfos[f];if(d){const g=this.device.type==="webgpu"?this.vertexArray.getBufferSlot(d.bufferName):d.location;if(g===null){n||S.warn(`Model(${this.id}): Missing vertex array slot for buffer "${d.bufferName}".`)();continue}this.vertexArray.setBuffer(g,a),o instanceof De?this._dynamicAttributeBufferSources[g]={source:o,generation:o.generation}:delete this._dynamicAttributeBufferSources[g],u=!0}}!u&&!n&&S.warn(`Model(${this.id}): Ignoring buffer "${a.id}" for unknown attribute "${r}"`)()}this.setNeedsRedraw("attributes")}setConstantAttributes(e,t){for(const[n,s]of Object.entries(e)){const r=this._attributeInfos[n];r?this.vertexArray.setConstantWebGL(r.location,s):(t?.disableWarnings??this.props.disableWarnings)||S.warn(`Model "${this.id}: Ignoring constant supplied for unknown attribute "${n}"`)()}this.setNeedsRedraw("constants")}_areBindingsLoading(){for(const e of Object.values(this.bindings))if(Cs(e)&&!e.isReady)return e.id;for(const e of Object.values(this.material?.bindings||{}))if(Cs(e)&&!e.isReady)return e.id;return!1}_getBindings(e=this._getCurrentShaderLayout()){const t={};for(const[n,s]of Object.entries(this.bindings)){const r=gE(n,s,e);r&&(t[n]=r)}return t}_getBindGroups(e=this._getCurrentShaderLayout(),t=this._getBindings(e)){const n=e.bindings.length?Co(e,t):{0:t};if(!this.material)return n;for(const[s,r]of Object.entries(this.material.getBindingsByGroup(e))){const o=Number(s);n[o]={...n[o]||{},...r}}return n}_getBindGroupCacheKeys(){const e=this.material?.getBindGroupCacheKey(3);return e?{3:e}:{}}_getBindingsUpdateTimestamp(){let e=0;this._dynamicIndexBufferSource&&(e=Math.max(e,this._dynamicIndexBufferSource.source.updateTimestamp));for(const t of Object.values(this._dynamicAttributeBufferSources))e=Math.max(e,t.source.updateTimestamp);for(const t of Object.values(this.bindings))t instanceof jn?e=Math.max(e,t.texture.updateTimestamp):t instanceof F||t instanceof H||t instanceof So||t instanceof De?e=Math.max(e,t.updateTimestamp):Cs(t)?e=t.isReady?Math.max(e,t.updateTimestamp):1/0:Zd(t)&&(e=Math.max(e,(t.buffer instanceof De,t.buffer.updateTimestamp)));return Math.max(e,this.material?.getBindingsUpdateTimestamp()||0)}_setGeometryAttributes(e){const t={...e.attributes};for(const[n]of Object.entries(t))!this.pipeline.shaderLayout.attributes.find(s=>s.name===n)&&n!=="positions"&&delete t[n];this.vertexCount=e.vertexCount,this.setIndexBuffer(e.indices||null),this.setAttributes(e.attributes,{disableWarnings:!0}),this.setAttributes(t,{disableWarnings:this.props.disableWarnings}),this.setNeedsRedraw("geometry attributes")}_setPipelineNeedsUpdate(e){this._pipelineNeedsUpdate||(this._pipelineNeedsUpdate=e),this._drawBlockedReason=!1,this.setNeedsRedraw(e)}_updatePipeline(){if(this._pipelineNeedsUpdate){let e=null,t=null;this.pipeline&&(S.log(1,`Model ${this.id}: Recreating pipeline because "${this._pipelineNeedsUpdate}".`)(),e=this.pipeline.vs,t=this.pipeline.fs),this._pipelineNeedsUpdate=!1;const n=this.shaderFactory.createShader({id:`${this.id}-vertex`,stage:"vertex",source:this.source||this.vs,debugShaders:this.props.debugShaders});let s=null;this.source?s=n:this.fs&&(s=this.shaderFactory.createShader({id:`${this.id}-fragment`,stage:"fragment",source:this.source||this.fs,debugShaders:this.props.debugShaders})),this.pipeline=this.pipelineFactory.createRenderPipeline({...this.props,bindings:void 0,bufferLayout:this.bufferLayout,colorAttachmentFormats:this._colorAttachmentFormats,depthStencilAttachmentFormat:this._depthStencilAttachmentFormat,topology:this.topology,parameters:this.parameters,bindGroups:void 0,vs:n,fs:s}),this._attributeInfos=of(this.pipeline.shaderLayout,this.bufferLayout),e&&this.shaderFactory.release(e),t&&t!==e&&this.shaderFactory.release(t)}return this.pipeline}_logDrawCallStart(){const e=S.level>3?0:fE;S.level<2||Date.now()-this._lastLogTime<e||(this._lastLogTime=Date.now(),this._logOpen=!0,S.group(Fe,`>>> DRAWING MODEL ${this.id}`,{collapsed:S.level<=2})())}_logDrawCallEnd(){if(this._logOpen){const e=VS(this.pipeline.shaderLayout,this.id);S.table(Fe,e)();const t=this.shaderInputs.getDebugTable();S.table(Fe,t)();const n=this._getAttributeDebugTable();S.table(Fe,this._attributeInfos)(),S.table(Fe,n)(),S.groupEnd(Fe)(),this._logOpen=!1}}_logFramebuffer(e){const t=this.device.props.debugFramebuffers;if(this._drawCount++,!t)return;const n=e.props.framebuffer;jS(e,n,{id:n?.id||`${this.id}-framebuffer`,minimap:!0})}_getAttributeDebugTable(){const e={};for(const[t,n]of Object.entries(this._attributeInfos)){const s=this.vertexArray.attributes[n.location];e[n.location]={name:t,type:n.shaderType,values:s?this._getBufferOrConstantValues(s,n.bufferDataType):"null"}}if(this.vertexArray.indexBuffer){const{indexBuffer:t}=this.vertexArray,n=t.indexType==="uint32"?new Uint32Array(t.debugData):new Uint16Array(t.debugData);e.indices={name:"indices",type:t.indexType,values:n.toString()}}return e}_getBufferOrConstantValues(e,t){const n=Ie.getTypedArrayConstructor(t);return(e instanceof F?new n(e.debugData):e).toString()}_getNonMaterialBindings(e){if(!this.material)return e;const t={};for(const[n,s]of Object.entries(e))this.material.ownsBinding(n)||(t[n]=s);return t}_getCurrentShaderLayout(){return this.pipeline?.shaderLayout||this.props.shaderLayout||{bindings:[]}}_syncDynamicBuffers(){if(this._dynamicIndexBufferSource&&this._dynamicIndexBufferSource.generation!==this._dynamicIndexBufferSource.source.generation){const e=this._dynamicIndexBufferSource.source.buffer;this.indexBuffer=e,this.vertexArray.setIndexBuffer(e),this._dynamicIndexBufferSource.generation=this._dynamicIndexBufferSource.source.generation,this.setNeedsRedraw("dynamic index buffer")}for(const[e,t]of Object.entries(this._dynamicAttributeBufferSources))t.generation!==t.source.generation&&(this.vertexArray.setBuffer(Number(e),t.source.buffer),t.generation=t.source.generation,this.setNeedsRedraw("dynamic attribute buffer"))}_syncAttachmentFormats(e){if(this.device.type!=="webgpu")return;const t=e.framebuffer||e.props.framebuffer,n=e.props,s=n.colorAttachmentFormats??t?.colorAttachments?.map(o=>pE(o?.texture?.format)),r=n.depthStencilAttachmentFormat===!1?void 0:n.depthStencilAttachmentFormat??mE(t?.depthStencilAttachment?.texture?.format);(!Di(this._colorAttachmentFormats,s,1)||this._depthStencilAttachmentFormat!==r)&&(this._colorAttachmentFormats=s,this._depthStencilAttachmentFormat=r,this._setPipelineNeedsUpdate("attachment formats"))}};h(pn,"defaultProps",{...Qe.defaultProps,source:void 0,vs:null,fs:null,id:"unnamed",handle:void 0,userData:{},defines:{},modules:[],plugins:[],geometry:null,indexBuffer:null,indexCount:void 0,firstVertex:0,firstIndex:0,attributes:{},constantAttributes:{},bindings:{},uniforms:{},varyings:[],isInstanced:void 0,instanceCount:0,vertexCount:0,shaderInputs:void 0,material:void 0,pipelineFactory:void 0,shaderFactory:void 0,transformFeedback:void 0,shaderAssembler:et.getDefaultShaderAssembler("glsl"),debugShaders:void 0,disableWarnings:void 0});let re=pn;function ka(i,e){return i.shaderLanguage!==void 0&&i.shaderLanguage!==e?!1:e==="glsl"?"assembleGLSLShaderPair"in i&&typeof i.assembleGLSLShaderPair=="function":"assembleWGSLShader"in i&&typeof i.assembleWGSLShader=="function"}function hE(i,e){return!i||Object.keys(e).length===0?i:{...i,attributes:i.attributes.map(t=>{const n=t.name.startsWith("_luma_")?t.name.slice(6):null;return n&&e[n]?{...t,name:n}:t})}}function gE(i,e,t){if(Cs(e)){const n=uE(t,i,{fallbackGroup:0});return n?e.resolveTextureBinding(n):null}return e instanceof De?e.buffer:Zd(e)?cE(e):e}function pE(i){return i&&!Kd(i)?i:null}function mE(i){return i&&Kd(i)?i:void 0}function Kd(i){return dE.includes(i)}function yE(i){return{type:i.type,shaderLanguage:i.info.shadingLanguage,shaderLanguageVersion:i.info.shadingLanguageVersion,gpu:i.info.gpu,limits:i.limits,features:i.features}}const bE=35980,_E=35981,mn=class mn{constructor(e,t=mn.defaultProps){h(this,"device");h(this,"model");h(this,"transformFeedback");if(!mn.isSupported(e))throw new Error("BufferTransform not yet implemented on WebGPU");this.device=e,this.model=new re(this.device,{id:t.id||"buffer-transform-model",fs:t.fs||zx(),topology:t.topology||"point-list",varyings:t.outputs||t.varyings,...t,bufferMode:t.bufferMode||(t.feedbackBufferMode==="interleaved"?bE:_E)}),this.transformFeedback=this.device.createTransformFeedback({layout:this.model.pipeline.shaderLayout,buffers:t.feedbackBuffers}),this.model.setTransformFeedback(this.transformFeedback)}static isSupported(e){return e?.info?.type==="webgl"}destroy(){this.model&&this.model.destroy()}delete(){this.destroy()}run(e){e?.inputBuffers&&this.model.setAttributes(e.inputBuffers),e?.outputBuffers&&this.transformFeedback.setBuffers(e.outputBuffers);const t=this.device.beginRenderPass({discard:!0,...e});this.model.draw(t),t.end()}getBuffer(e){return this.transformFeedback.getBuffer(e)}readAsync(e){const t=this.getBuffer(e);if(!t)throw new Error("BufferTransform#getBuffer");if(t instanceof F)return t.readAsync();const{buffer:n,byteOffset:s=0,byteLength:r=n.byteLength}=t;return n.readAsync(s,r)}};h(mn,"defaultProps",{...re.defaultProps,feedbackBufferMode:"separate",outputs:void 0,feedbackBuffers:void 0});let Ne=mn;const Da=2,vE=1e4,Ar=class Ar{constructor(e,t){h(this,"device");h(this,"id");h(this,"pipelineFactory");h(this,"shaderFactory");h(this,"userData",{});h(this,"bindings",{});h(this,"pipeline");h(this,"source");h(this,"shader");h(this,"shaderInputs");h(this,"_uniformStore");h(this,"_pipelineNeedsUpdate","newly created");h(this,"_getModuleUniforms");h(this,"props");h(this,"_destroyed",!1);h(this,"_lastLogTime",0);h(this,"_logOpen",!1);h(this,"_drawCount",0);if(e.type!=="webgpu")throw new Error("Computation is only supported in WebGPU");this.props={...Ar.defaultProps,...t},t=this.props,this.id=t.id||Bi("model"),this.device=e,Object.assign(this.userData,t.userData);const n=xE(e),s=af(this.props.plugins,n.shaderLanguage);if(Object.keys(s.vertexInputs).length>0||Object.keys(s.varyings).length>0)throw new Error("Computation does not support ShaderPlugin vertex inputs or varyings");const r=cf(this.props.modules,s.modules),o=Object.fromEntries(r.map(p=>[p.name,p]));this.shaderInputs=t.shaderInputs||new qd(o),t.shaderInputs&&s.modules.length>0&&this.shaderInputs.addModules(s.modules),this.setShaderInputs(this.shaderInputs);const a=Yd(this.props.modules,this.shaderInputs?.getModules()),c={...s.defines,...this.props.defines};this.props.shaderLayout=Es(this.props.shaderLayout,a)||null,this.pipelineFactory=t.pipelineFactory||Yn.getDefaultPipelineFactory(this.device),this.shaderFactory=t.shaderFactory||qn.getDefaultShaderFactory(this.device);const l=this.props.shaderAssembler;Ei(l instanceof $t);const{source:u,getUniforms:f,shaderLayout:d}=l.assembleWGSLShader({platformInfo:n,...this.props,modules:a,defines:c,scanVertexAttributes:!1,pluginInjections:s.injections});this.source=u,this._getModuleUniforms=f;const g=d??e.getShaderLayout?.(this.source,{scanVertexAttributes:!1});this.props.shaderLayout=Es(this.props.shaderLayout||g||null,a)||null,this.pipeline=this._updatePipeline(),t.bindings&&this.setBindings(t.bindings)}destroy(){this._destroyed||(this.pipelineFactory.release(this.pipeline),this.shaderFactory.release(this.shader),this._uniformStore.destroy(),this._destroyed=!0)}predraw(e){this.updateShaderInputs(e)}dispatch(e,t,n,s){try{this._logDrawCallStart(),this._setPipeline(e),e.dispatch(t,n,s)}finally{this._logDrawCallEnd()}}dispatchIndirect(e,t,n=0){try{this._logDrawCallStart(),this._setPipeline(e),e.dispatchIndirect(t,n)}finally{this._logDrawCallEnd()}}_setPipeline(e){this.pipeline=this._updatePipeline(),this.pipeline.setBindings(this.bindings),e.setPipeline(this.pipeline),e.setBindings({})}setVertexCount(e){}setInstanceCount(e){}setShaderInputs(e){this.shaderInputs=e,this._uniformStore=new sf(this.device,this.shaderInputs.modules);for(const[t,n]of Object.entries(this.shaderInputs.modules))if(Ia(n)){const s=this._uniformStore.getManagedUniformBuffer(t);this.bindings[`${t}Uniforms`]=s}}setShaderModuleProps(e){const t=this._getModuleUniforms(e),n=Object.keys(t).filter(s=>{const r=t[s];return!au(r)&&typeof r!="number"&&typeof r!="boolean"});for(const s of n)t[s],delete t[s]}updateShaderInputs(e){this._uniformStore.setUniforms(this.shaderInputs.getUniformValues(),e)}setBindings(e){Object.assign(this.bindings,e)}_setPipelineNeedsUpdate(e){this._pipelineNeedsUpdate=this._pipelineNeedsUpdate||e}_updatePipeline(){if(this._pipelineNeedsUpdate){let e=null;this.pipeline&&(S.log(1,`Model ${this.id}: Recreating pipeline because "${this._pipelineNeedsUpdate}".`)(),e=this.shader),this._pipelineNeedsUpdate=!1,this.shader=this.shaderFactory.createShader({id:`${this.id}-fragment`,stage:"compute",source:this.source,debugShaders:this.props.debugShaders}),this.pipeline=this.pipelineFactory.createComputePipeline({...this.props,shader:this.shader}),e&&this.shaderFactory.release(e)}return this.pipeline}_logDrawCallStart(){const e=S.level>3?0:vE;S.level<2||Date.now()-this._lastLogTime<e||(this._lastLogTime=Date.now(),this._logOpen=!0,S.group(Da,`>>> DRAWING MODEL ${this.id}`,{collapsed:S.level<=2})())}_logDrawCallEnd(){if(this._logOpen){const e=this.shaderInputs.getDebugTable();S.table(Da,e)(),S.groupEnd(Da)(),this._logOpen=!1}}_getBufferOrConstantValues(e,t){const n=Ie.getTypedArrayConstructor(t);return(e instanceof F?new n(e.debugData):e).toString()}};h(Ar,"defaultProps",{...Ci.defaultProps,id:"unnamed",handle:void 0,userData:{},source:"",modules:[],defines:{},plugins:[],bindings:void 0,shaderInputs:void 0,pipelineFactory:void 0,shaderFactory:void 0,shaderAssembler:et.getDefaultShaderAssembler("wgsl"),debugShaders:void 0});let vt=Ar;function xE(i){return{type:i.type,shaderLanguage:i.info.shadingLanguage,shaderLanguageVersion:i.info.shadingLanguageVersion,gpu:i.info.gpu,limits:i.limits,features:i.features}}const wE={blendColorOperation:"add",blendColorSrcFactor:"one",blendColorDstFactor:"zero",blendAlphaOperation:"add",blendAlphaSrcFactor:"constant",blendAlphaDstFactor:"zero"};class Qd extends Pa{constructor(){super(...arguments),this._colorEncoderState=null}render(e){return"pickingFBO"in e?this._drawPickingBuffer(e):{decodePickingColor:null,stats:super._render(e)}}_drawPickingBuffer({layers:e,layerFilter:t,views:n,viewports:s,onViewportActive:r,pickingFBO:o,deviceRect:{x:a,y:c,width:l,height:u},cullRect:f,effects:d,pass:g="picking",pickZ:p,canvasContext:m,shaderModuleProps:y,clearColor:_}){this.pickZ=p;const v=this._resetColorEncoder(p),b=[a,c,l,u],x=super._render({target:o,layers:e,layerFilter:t,views:n,viewports:s,onViewportActive:r,cullRect:f,effects:d?.filter(P=>P.useInPicking),pass:g,canvasContext:m,isPicking:!0,shaderModuleProps:y,clearColor:_??[0,0,0,0],colorMask:15,scissorRect:b});return this._colorEncoderState=null,{decodePickingColor:v&&PE.bind(null,v),stats:x}}shouldDrawLayer(e){const{pickable:t,operation:n}=e.props;return t&&n.includes("draw")||n.includes("terrain")||n.includes("mask")}getShaderModuleProps(e,t,n){return{picking:{isActive:1,isAttribute:this.pickZ,disabledPickingIndices:e.internalState?.disabledPickingIndices},lighting:{enabled:!1}}}getLayerParameters(e,t,n){const s={...e.props.parameters},{pickable:r,operation:o}=e.props;return this._colorEncoderState?r&&o.includes("draw")?(Object.assign(s,wE),s.blend=!0,this.device.type==="webgpu"?s.blendConstant=Jd(this._colorEncoderState,e,n):s.blendColor=Jd(this._colorEncoderState,e,n),o.includes("terrain")&&e.state?._hasPickingCover&&(s.blendAlphaSrcFactor="one")):o.includes("terrain")&&(s.blend=!1):s.blend=!1,s}_resetColorEncoder(e){return this._colorEncoderState=e?null:{byLayer:new Map,byAlpha:[]},this._colorEncoderState}}function Jd(i,e,t){const{byLayer:n,byAlpha:s}=i;let r,o=n.get(e);return o?(o.viewports.push(t),r=o.a):(r=n.size+1,r<=255?(o={a:r,layer:e,viewports:[t]},n.set(e,o),s[r]=o):(D.warn("Too many pickable layers, only picking the first 255")(),r=0)),[0,0,0,r/255]}function PE(i,e){const t=i.byAlpha[e[3]];return t&&{pickedLayer:t.layer,pickedViewports:t.viewports,pickedObjectIndex:t.layer.decodePickingColor(e)}}const ei={NO_STATE:"Awaiting state",MATCHED:"Matched. State transferred from previous layer",INITIALIZED:"Initialized",AWAITING_GC:"Discarded. Awaiting garbage collection",AWAITING_FINALIZATION:"No longer matched. Awaiting garbage collection",FINALIZED:"Finalized! Awaiting garbage collection"},Ls=Symbol.for("component"),it=Symbol.for("propTypes"),Fa=Symbol.for("deprecatedProps"),ti=Symbol.for("asyncPropDefaults"),xt=Symbol.for("asyncPropOriginal"),nt=Symbol.for("asyncPropResolved");function Na(i,e=()=>!0){return Array.isArray(i)?eh(i,e,[]):e(i)?[i]:[]}function eh(i,e,t){let n=-1;for(;++n<i.length;){const s=i[n];Array.isArray(s)?eh(s,e,t):e(s)&&t.push(s)}return t}function SE({target:i,source:e,start:t=0,count:n=1}){const s=e.length,r=n*s;let o=0;for(let a=t;o<s;o++)i[a++]=e[o];for(;o<r;)o<r-o?(i.copyWithin(t+o,t,t+o),o*=2):(i.copyWithin(t+o,t,t+r-o),o=r);return i}class EE{constructor(e,t,n){this._loadCount=0,this._subscribers=new Set,this.id=e,this.context=n,this.setData(t)}subscribe(e){this._subscribers.add(e)}unsubscribe(e){this._subscribers.delete(e)}inUse(){return this._subscribers.size>0}delete(){}getData(){return this.isLoaded?this._error?Promise.reject(this._error):this._content:this._loader.then(()=>this.getData())}setData(e,t){if(e===this._data&&!t)return;this._data=e;const n=++this._loadCount;let s=e;typeof e=="string"&&(s=Ln(e)),s instanceof Promise?(this.isLoaded=!1,this._loader=s.then(r=>{this._loadCount===n&&(this.isLoaded=!0,this._error=void 0,this._content=r)}).catch(r=>{this._loadCount===n&&(this.isLoaded=!0,this._error=r||!0)})):(this.isLoaded=!0,this._error=void 0,this._content=e);for(const r of this._subscribers)r.onChange(this.getData())}}class CE{constructor(e){this.protocol=e.protocol||"resource://",this._context={device:e.device,gl:e.device?.gl,resourceManager:this},this._resources={},this._consumers={},this._pruneRequest=null}contains(e){return e.startsWith(this.protocol)?!0:e in this._resources}add({resourceId:e,data:t,forceUpdate:n=!1,persistent:s=!0}){let r=this._resources[e];r?r.setData(t,n):(r=new EE(e,t,this._context),this._resources[e]=r),r.persistent=s}remove(e){const t=this._resources[e];t&&(t.delete(),delete this._resources[e])}unsubscribe({consumerId:e}){const t=this._consumers[e];if(t){for(const n in t){const s=t[n],r=this._resources[s.resourceId];r&&r.unsubscribe(s)}delete this._consumers[e],this.prune()}}subscribe({resourceId:e,onChange:t,consumerId:n,requestId:s="default"}){const{_resources:r,protocol:o}=this;e.startsWith(o)&&(e=e.replace(o,""),r[e]||this.add({resourceId:e,data:null,persistent:!1}));const a=r[e];if(this._track(n,s,a,t),a)return a.getData()}prune(){this._pruneRequest||(this._pruneRequest=setTimeout(()=>this._prune(),0))}finalize(){for(const e in this._resources)this._resources[e].delete()}_track(e,t,n,s){const r=this._consumers,o=r[e]=r[e]||{};let a=o[t];const c=a&&a.resourceId&&this._resources[a.resourceId];c&&(c.unsubscribe(a),this.prune()),n&&(a?(a.onChange=s,a.resourceId=n.id):a={onChange:s,resourceId:n.id},o[t]=a,n.subscribe(a))}_prune(){this._pruneRequest=null;for(const e of Object.keys(this._resources)){const t=this._resources[e];!t.persistent&&!t.inUse()&&(t.delete(),delete this._resources[e])}}}const LE="layerManager.setLayers",TE="layerManager.activateViewport";class AE{constructor(e,t){this._lastRenderedLayers=[],this._needsRedraw=!1,this._needsUpdate=!1,this._nextLayers=null,this._debug=!1,this._defaultShaderModulesChanged=!1,this.activateViewport=a=>{ie(TE,this,a),a&&(this.context.viewport=a)};const{deck:n,stats:s,viewport:r,timeline:o}=t||{};this.layers=[],this.resourceManager=new CE({device:e,protocol:"deck://"}),this.context={mousePosition:null,userData:{},layerManager:this,device:e,gl:e?.gl,deck:n,shaderAssembler:sS(e?.info?.shadingLanguage||"glsl"),defaultShaderModules:[Jw],renderPass:void 0,stats:s||new vn({id:"deck.gl"}),viewport:r||new Jt({id:"DEFAULT-INITIAL-VIEWPORT"}),timeline:o||new Vd,resourceManager:this.resourceManager,onError:void 0},Object.seal(this)}finalize(){this.resourceManager.finalize();for(const e of this.layers)this._finalizeLayer(e)}needsRedraw(e={clearRedrawFlags:!1}){let t=this._needsRedraw;e.clearRedrawFlags&&(this._needsRedraw=!1);for(const n of this.layers){const s=n.getNeedsRedraw(e);t=t||s}return t}needsUpdate(){return this._nextLayers&&this._nextLayers!==this._lastRenderedLayers?"layers changed":this._defaultShaderModulesChanged?"shader modules changed":this._needsUpdate}setNeedsRedraw(e){this._needsRedraw=this._needsRedraw||e}setNeedsUpdate(e){this._needsUpdate=this._needsUpdate||e}getLayers({layerIds:e}={}){return e?this.layers.filter(t=>e.find(n=>t.id.indexOf(n)===0)):this.layers}setProps(e){"debug"in e&&(this._debug=e.debug),"userData"in e&&(this.context.userData=e.userData),"layers"in e&&(this._nextLayers=e.layers),"onError"in e&&(this.context.onError=e.onError)}setLayers(e,t){ie(LE,this,t,e),this._lastRenderedLayers=e;const n=Na(e,Boolean);for(const s of n)s.context=this.context;this._updateLayers(this.layers,n)}updateLayers(){const e=this.needsUpdate();e&&(this.setNeedsRedraw(`updating layers: ${e}`),this.setLayers(this._nextLayers||this._lastRenderedLayers,e)),this._nextLayers=null}addDefaultShaderModule(e){const{defaultShaderModules:t}=this.context;t.find(n=>n.name===e.name)||(t.push(e),this._defaultShaderModulesChanged=!0)}removeDefaultShaderModule(e){const{defaultShaderModules:t}=this.context,n=t.findIndex(s=>s.name===e.name);n>=0&&(t.splice(n,1),this._defaultShaderModulesChanged=!0)}_handleError(e,t,n){n.raiseError(t,`${e} of ${n}`)}_updateLayers(e,t){const n={};for(const o of e)n[o.id]?D.warn(`Multiple old layers with same id ${o.id}`)():n[o.id]=o;if(this._defaultShaderModulesChanged){for(const o of e)o.setNeedsUpdate(),o.setChangeFlags({extensionsChanged:!0});this._defaultShaderModulesChanged=!1}const s=[];this._updateSublayersRecursively(t,n,s),this._finalizeOldLayers(n);let r=!1;for(const o of s)if(o.hasUniformTransition()){r=`Uniform transition in ${o}`;break}this._needsUpdate=r,this.layers=s}_updateSublayersRecursively(e,t,n){for(const s of e){s.context=this.context;const r=t[s.id];r===null&&D.warn(`Multiple new layers with same id ${s.id}`)(),t[s.id]=null;let o=null;try{this._debug&&r!==s&&s.validateProps(),r?(this._transferLayerState(r,s),this._updateLayer(s)):this._initializeLayer(s),n.push(s),o=s.isComposite?s.getSubLayers():null}catch(a){this._handleError("matching",a,s)}o&&this._updateSublayersRecursively(o,t,n)}}_finalizeOldLayers(e){for(const t in e){const n=e[t];n&&this._finalizeLayer(n)}}_initializeLayer(e){try{e._initialize(),e.lifecycle=ei.INITIALIZED}catch(t){this._handleError("initialization",t,e)}}_transferLayerState(e,t){t._transferState(e),t.lifecycle=ei.MATCHED,t!==e&&(e.lifecycle=ei.AWAITING_GC)}_updateLayer(e){try{e._update()}catch(t){this._handleError("update",t,e)}}_finalizeLayer(e){this._needsRedraw=this._needsRedraw||`finalized ${e}`,e.lifecycle=ei.AWAITING_FINALIZATION;try{e._finalize(),e.lifecycle=ei.FINALIZED}catch(t){this._handleError("finalization",t,e)}}}function ee(i,e,t){if(i===e)return!0;if(!t||!i||!e)return!1;if(Array.isArray(i)){if(!Array.isArray(e)||i.length!==e.length)return!1;for(let n=0;n<i.length;n++)if(!ee(i[n],e[n],t-1))return!1;return!0}if(Array.isArray(e))return!1;if(typeof i=="object"&&typeof e=="object"){const n=Object.keys(i),s=Object.keys(e);if(n.length!==s.length)return!1;for(const r of n)if(!e.hasOwnProperty(r)||!ee(i[r],e[r],t-1))return!1;return!0}return!1}const ii="default-canvas";class IE{constructor(e){this.views=[],this.width=100,this.height=100,this.viewState={},this.controllers={},this.timeline=e.timeline,this._viewports=[],this._viewportMap={},this._isUpdating=!1,this._needsRedraw="First render",this._needsUpdate="Initialize",this._eventManager=e.eventManager,this._eventManagers=e.eventManagers||{},this._viewEventManagers={},this._eventCallbacks={onViewStateChange:e.onViewStateChange,onInteractionStateChange:e.onInteractionStateChange},this._pickPosition=e.pickPosition,this._getCanvasContext=e.getCanvasContext,Object.seal(this),this.setProps(e)}finalize(){for(const e in this.controllers){const t=this.controllers[e];t&&t.finalize()}this.controllers={}}needsRedraw(e={clearRedrawFlags:!1}){const t=this._needsRedraw;return e.clearRedrawFlags&&(this._needsRedraw=!1),t}setNeedsUpdate(e){this._needsUpdate=this._needsUpdate||e,this._needsRedraw=this._needsRedraw||e}updateViewStates(){for(const e in this.controllers){const t=this.controllers[e];t&&t.updateTransition()}}getViewports(e){return e?this._viewports.filter(t=>{const n=!e.canvasId||this.getCanvasId(t.id)===e.canvasId,s=!("x"in e)||t.containsPixel(e);return n&&s}):this._viewports}getViews(){const e={};return this.views.forEach(t=>{e[t.id]=t}),e}getView(e){return this.views.find(t=>t.id===e)}getViewState(e){const t=typeof e=="string"?this.getView(e):e,n=t&&this.viewState[t.getViewStateId()]||this.viewState;return t?t.filterViewState(n):n}getViewport(e){return this._viewportMap[e]}getCanvasId(e){const t=typeof e=="string"?this.getView(e):e;return t?this._viewEventManagers[t.id]?.canvasId||this._getCanvasIdFromView(t):void 0}unproject(e,t){const n=this.getViewports(),s={x:e[0],y:e[1]};for(let r=n.length-1;r>=0;--r){const o=n[r];if(o.containsPixel(s)){const a=e.slice();return a[0]-=o.x,a[1]-=o.y,o.unproject(a,t)}}return null}setProps(e){e.views&&this._setViews(e.views),e.viewState&&this._setViewState(e.viewState),("width"in e||"height"in e)&&this._setSize(e.width,e.height),"pickPosition"in e&&(this._pickPosition=e.pickPosition),"eventManagers"in e&&this._setEventManagers(e.eventManagers||{}),this._isUpdating||this._update()}_update(){this._isUpdating=!0,this._needsUpdate&&(this._needsUpdate=!1,this._rebuildViewports()),this._needsUpdate&&(this._needsUpdate=!1,this._rebuildViewports()),this._isUpdating=!1}_setSize(e,t){(e!==this.width||t!==this.height)&&(this.width=e,this.height=t,this.setNeedsUpdate("Size changed"))}_setViews(e){e=Na(e,Boolean),this._diffViews(e,this.views)&&this.setNeedsUpdate("views changed"),this.views=e}_setViewState(e){e?(!ee(e,this.viewState,3)&&this.setNeedsUpdate("viewState changed"),this.viewState=e):D.warn("missing `viewState` or `initialViewState`")()}_setEventManagers(e){this._eventManagers!==e&&(this._eventManagers=e,this.setNeedsUpdate("eventManagers changed"))}_getCanvasIdFromView(e){return e.props.canvasId||this._getCanvasContext?.(e.id)?.id||ii}_getCanvasDimensions(e){const t=this._getCanvasContext?.(e.id),[n,s]=t?.getCSSSize()||[this.width,this.height];return{width:n,height:s}}_getViewEventManager(e){const t=this.getCanvasId(e)||ii;return{canvasId:t,eventManager:this._eventManagers[t]||this._eventManager}}_startViewportRebuild(){const e=this.controllers,t=this._viewEventManagers;return this._viewports=[],this.controllers={},this._viewEventManagers={},{oldControllers:e,oldViewEventManagers:t}}_getReusableController(e,t,n){return e&&(t?.canvasId!==n.canvasId||t?.eventManager!==n.eventManager)?(e.finalize(),null):e}_createController(e,t){const n=t.type;return new n({timeline:this.timeline,eventManager:this._getViewEventManager(e).eventManager,onViewStateChange:this._eventCallbacks.onViewStateChange,onStateChange:this._eventCallbacks.onInteractionStateChange,makeViewport:r=>this.getView(e.id)?.makeViewport({viewState:r,...this._getCanvasDimensions(e)}),pickPosition:(r,o)=>this._pickPosition?.(r,o,e.id)})}_updateController(e,t,n,s){const r=e.controller;if(r&&n){const o={...t,...r,id:e.id,x:n.x,y:n.y,width:n.width,height:n.height};return(!s||s.constructor!==r.type)&&(s=this._createController(e,o)),s&&s.setProps(o),s}return null}_rebuildViewports(){const{views:e}=this,{oldControllers:t,oldViewEventManagers:n}=this._startViewportRebuild();let s=!1;for(let r=e.length;r--;){const o=e[r],{width:a,height:c}=this._getCanvasDimensions(o),l=this._getViewEventManager(o);this._viewEventManagers[o.id]=l;const u=this.getViewState(o),f=o.makeViewport({viewState:u,width:a,height:c});let d=this._getReusableController(t[o.id],n[o.id],l);const g=!!o.controller;g&&!d&&(s=!0),(s||!g)&&d&&(d.finalize(),d=null),this.controllers[o.id]=this._updateController(o,u,f,d),f&&this._viewports.unshift(f)}for(const r in t){const o=t[r];o&&!this.controllers[r]&&o.finalize()}this._buildViewportMap()}_buildViewportMap(){this._viewportMap={},this._viewports.forEach(e=>{e.id&&(this._viewportMap[e.id]=this._viewportMap[e.id]||e)})}_diffViews(e,t){return e.length!==t.length?!0:e.some((n,s)=>!e[s].equals(t[s]))}}const ME=/^(?:\d+\.?\d*|\.\d+)$/;function pe(i){switch(typeof i){case"number":if(!Number.isFinite(i))throw new Error(`Could not parse position string ${i}`);return{type:"literal",value:i};case"string":try{const e=RE(i);return new OE(e).parseExpression()}catch(e){const t=e instanceof Error?e.message:String(e);throw new Error(`Could not parse position string ${i}: ${t}`)}default:throw new Error(`Could not parse position string ${i}`)}}function za(i,e){switch(i.type){case"literal":return i.value;case"percentage":return Math.round(i.value*e);case"binary":const t=za(i.left,e),n=za(i.right,e);return i.operator==="+"?t+n:t-n;default:throw new Error("Unknown layout expression type")}}function me(i,e){return za(i,e)}function RE(i){const e=[];let t=0;for(;t<i.length;){const n=i[t];if(/\s/.test(n)){t++;continue}if(n==="+"||n==="-"||n==="("||n===")"||n==="%"){e.push({type:"symbol",value:n}),t++;continue}if(th(n)||n==="."){const s=t;let r=n===".";for(t++;t<i.length;){const a=i[t];if(th(a)){t++;continue}if(a==="."&&!r){r=!0,t++;continue}break}const o=i.slice(s,t);if(!ME.test(o))throw new Error("Invalid number token");e.push({type:"number",value:parseFloat(o)});continue}if(ih(n)){const s=t;for(;t<i.length&&ih(i[t]);)t++;const r=i.slice(s,t).toLowerCase();e.push({type:"word",value:r});continue}throw new Error("Invalid token in position string")}return e}class OE{constructor(e){this.index=0,this.tokens=e}parseExpression(){const e=this.parseBinaryExpression();if(this.index<this.tokens.length)throw new Error("Unexpected token at end of expression");return e}parseBinaryExpression(){let e=this.parseFactor(),t=this.peek();for(;BE(t);){this.index++;const n=this.parseFactor();e={type:"binary",operator:t.value,left:e,right:n},t=this.peek()}return e}parseFactor(){const e=this.peek();if(!e)throw new Error("Unexpected end of expression");if(e.type==="symbol"&&e.value==="+")return this.index++,this.parseFactor();if(e.type==="symbol"&&e.value==="-"){this.index++;const t=this.parseFactor();return{type:"binary",operator:"-",left:{type:"literal",value:0},right:t}}if(e.type==="symbol"&&e.value==="("){this.index++;const t=this.parseBinaryExpression();if(!this.consumeSymbol(")"))throw new Error("Missing closing parenthesis");return t}if(e.type==="word"&&e.value==="calc"){if(this.index++,!this.consumeSymbol("("))throw new Error("Missing opening parenthesis after calc");const t=this.parseBinaryExpression();if(!this.consumeSymbol(")"))throw new Error("Missing closing parenthesis");return t}if(e.type==="number"){this.index++;const t=e.value,n=this.peek();return n&&n.type==="symbol"&&n.value==="%"?(this.index++,{type:"percentage",value:t/100}):n&&n.type==="word"&&n.value==="px"?(this.index++,{type:"literal",value:t}):{type:"literal",value:t}}throw new Error("Unexpected token in expression")}consumeSymbol(e){const t=this.peek();return t&&t.type==="symbol"&&t.value===e?(this.index++,!0):!1}peek(){return this.tokens[this.index]||null}}function th(i){return i>="0"&&i<="9"}function ih(i){return i>="a"&&i<="z"||i>="A"&&i<="Z"}function BE(i){return!!(i&&i.type==="symbol"&&(i.value==="+"||i.value==="-"))}function kE(i,e){const t={...i};for(const n in e)n!=="id"&&(Array.isArray(t[n])&&Array.isArray(e[n])?t[n]=DE(t[n],e[n]):t[n]=e[n]);return t}function DE(i,e){i=i.slice();for(let t=0;t<e.length;t++){const n=e[t];Number.isFinite(n)&&(i[t]=n)}return i}class ni{constructor(e){const{id:t,x:n=0,y:s=0,width:r="100%",height:o="100%",padding:a=null}=e;this.id=t||this.constructor.displayName||"view",this.props={...e,id:this.id},this._x=pe(n),this._y=pe(s),this._width=pe(r),this._height=pe(o),this._padding=a&&{left:pe(a.left||0),right:pe(a.right||0),top:pe(a.top||0),bottom:pe(a.bottom||0)},this.equals=this.equals.bind(this),Object.seal(this)}equals(e){return this===e?!0:this.constructor===e.constructor&&ee(this.props,e.props,2)}clone(e){const t=this.constructor;return new t({...this.props,...e})}makeViewport({width:e,height:t,viewState:n}){n=this.filterViewState(n);const s=this.getDimensions({width:e,height:t});if(!s.height||!s.width)return null;const r=this.getViewportType(n);return new r({...n,...this.props,...s})}getViewStateId(){const{viewState:e}=this.props;return typeof e=="string"?e:e?.id||this.id}filterViewState(e){return this.props.viewState&&typeof this.props.viewState=="object"?this.props.viewState.id?kE(e,this.props.viewState):this.props.viewState:e}getDimensions({width:e,height:t}){const n={x:me(this._x,e),y:me(this._y,t),width:me(this._width,e),height:me(this._height,t)};return this._padding&&(n.padding={left:me(this._padding.left,e),top:me(this._padding.top,t),right:me(this._padding.right,e),bottom:me(this._padding.bottom,t)}),n}get controller(){const e=this.props.controller;return e?e===!0?{type:this.ControllerType}:typeof e=="function"?{type:e}:{type:this.ControllerType,...e}:null}}class Ts{constructor(e){this._inProgress=!1,this._handle=null,this.time=0,this.settings={duration:0},this._timeline=e}get inProgress(){return this._inProgress}start(e){this.cancel(),this.settings=e,this._inProgress=!0,this.settings.onStart?.(this)}end(){this._inProgress&&(this._timeline.removeChannel(this._handle),this._handle=null,this._inProgress=!1,this.settings.onEnd?.(this))}cancel(){this._inProgress&&(this.settings.onInterrupt?.(this),this._timeline.removeChannel(this._handle),this._handle=null,this._inProgress=!1)}update(){if(!this._inProgress)return!1;if(this._handle===null){const{_timeline:e,settings:t}=this;this._handle=e.addChannel({delay:e.getTime(),duration:t.duration})}return this.time=this._timeline.getTime(this._handle),this._onUpdate(),this.settings.onUpdate?.(this),this._timeline.isFinished(this._handle)&&this.end(),!0}_onUpdate(){}}const nh=()=>{},sh={mode:"preserve"},FE={mode:"hard"},Ua={BREAK:1,SNAP_TO_END:2,IGNORE:3},NE=i=>i,zE=Ua.BREAK;class UE{constructor(e){this._onTransitionUpdate=t=>{const{time:n,settings:{interpolator:s,startProps:r,endProps:o,duration:a,easing:c}}=t,l=c(n/a),u=s.interpolateProps(r,o,l);this.propsInTransition=this.getControllerState({...this.props,...u},sh).getViewportProps(),this.onViewStateChange({viewState:this.propsInTransition,oldViewState:this.props})},this.getControllerState=e.getControllerState,this.propsInTransition=null,this.transition=new Ts(e.timeline),this.onViewStateChange=e.onViewStateChange||nh,this.onStateChange=e.onStateChange||nh}finalize(){this.transition.cancel()}getViewportInTransition(){return this.propsInTransition}processViewStateChange(e){let t=!1;const n=this.props;if(this.props=e,!n||this._shouldIgnoreViewportChange(n,e))return!1;if(this._isTransitionEnabled(e)){let s=n;if(this.transition.inProgress){const{interruption:r,endProps:o}=this.transition.settings;s={...n,...r===Ua.SNAP_TO_END?o:this.propsInTransition||n}}this._triggerTransition(s,e),t=!0}else this.transition.cancel();return t}updateTransition(){this.transition.update()}_isTransitionEnabled(e){const{transitionDuration:t,transitionInterpolator:n}=e;return(t>0||t==="auto")&&!!n}_isUpdateDueToCurrentTransition(e){return this.transition.inProgress&&this.propsInTransition?this.transition.settings.interpolator.arePropsEqual(e,this.propsInTransition):!1}_shouldIgnoreViewportChange(e,t){return this.transition.inProgress?this.transition.settings.interruption===Ua.IGNORE||this._isUpdateDueToCurrentTransition(t):this._isTransitionEnabled(t)?t.transitionInterpolator.arePropsEqual(e,t):!0}_triggerTransition(e,t){const n=this.getControllerState(e,sh),s=this.getControllerState(t,FE).shortestPathFrom(n),r=t.transitionInterpolator,o=r.getDuration?r.getDuration(e,t):t.transitionDuration;if(o===0)return;const a=r.initializeProps(e,s);this.propsInTransition={};const c={duration:o,easing:t.transitionEasing||NE,interpolator:r,interruption:t.transitionInterruption||zE,startProps:a.start,endProps:a.end,onStart:t.onTransitionStart,onUpdate:this._onTransitionUpdate,onInterrupt:this._onTransitionEnd(t.onTransitionInterrupt),onEnd:this._onTransitionEnd(t.onTransitionEnd)};this.transition.start(c),this.onStateChange({inTransition:!0}),this.updateTransition()}_onTransitionEnd(e){return t=>{this.propsInTransition=null,this.onStateChange({inTransition:!1,isZooming:!1,isPanning:!1,isRotating:!1}),e?.(t)}}}function W(i,e){if(!i)throw new Error(e||"deck.gl: assertion failed.")}class $E{constructor(e){const{compare:t,extract:n,required:s}=e;this._propsToCompare=t,this._propsToExtract=n||t,this._requiredProps=s}arePropsEqual(e,t){for(const n of this._propsToCompare)if(!(n in e)||!(n in t)||!Vt(e[n],t[n]))return!1;return!0}initializeProps(e,t){const n={},s={};for(const r of this._propsToExtract)(r in e||r in t)&&(n[r]=e[r],s[r]=t[r]);return this._checkRequiredProps(n),this._checkRequiredProps(s),{start:n,end:s}}getDuration(e,t){return t.transitionDuration}_checkRequiredProps(e){this._requiredProps&&this._requiredProps.forEach(t=>{const n=e[t];W(Number.isFinite(n)||Array.isArray(n),`${t} is required for transition`)})}}const GE=["longitude","latitude","zoom","bearing","pitch"],VE=["longitude","latitude","zoom"];class rh extends $E{constructor(e={}){const t=Array.isArray(e)?e:e.transitionProps,n=Array.isArray(e)?{}:e;n.transitionProps=Array.isArray(t)?{compare:t,required:t}:t||{compare:GE,required:VE},super(n.transitionProps),this.opts=n}initializeProps(e,t){const n=super.initializeProps(e,t),{makeViewport:s,around:r}=this.opts;if(s&&r){const o=s(e),a=s(t),c=o.unproject(r);n.start.around=r,Object.assign(n.end,{around:a.project(c),aroundPosition:c,width:t.width,height:t.height})}return n}interpolateProps(e,t,n){const s={};for(const r of this._propsToExtract)s[r]=is(e[r]||0,t[r]||0,n);if(t.aroundPosition&&this.opts.makeViewport){const r=this.opts.makeViewport({...t,...s});Object.assign(s,r.panByPosition(t.aroundPosition,is(e.around,t.around,n)))}return s}}const ze={transitionDuration:0},jE=300,WE=300,$a=i=>1-(1-i)*(1-i),HE=i=>i===1?1:1-Math.pow(2,-10*i),wt={WHEEL:["wheel"],PAN:["panstart","panmove","panend"],PINCH:["pinchstart","pinchmove","pinchend"],MULTI_PAN:["multipanstart","multipanmove","multipanend"],DOUBLE_CLICK:["dblclick"],DOUBLE_CLICK_DRAG:["dblclickdragstart","dblclickdragmove","dblclickdragend","dblclickdragcancel"],KEYBOARD:["keydown"]},Pt={};class YE{constructor(e){this.state={},this._events={},this._interactionState={isDragging:!1},this._customEvents=[],this._eventStartBlocked=null,this._panMove=!1,this._multiPanMode=null,this._multiPanStartCenter=null,this._doubleClickDragAnchor=null,this._suppressDoubleClickUntil=0,this.invertPan=!1,this.dragMode="rotate",this.inertia=0,this.scrollZoom=!0,this.dragPan=!0,this.dragRotate=!0,this.doubleClickZoom=!0,this.doubleClickDragZoom=!0,this.touchZoom=!0,this.touchRotate=!1,this.multiTouchDrag=null,this.trackpadGesture=!1,this.zoomAround="pointer",this.keyboard=!0,this.transitionManager=new UE({...e,getControllerState:(t,n)=>new this.ControllerState({...t,constraintContext:n,makeViewport:e.makeViewport}),onViewStateChange:this._onTransition.bind(this),onStateChange:this._setInteractionState.bind(this)}),this.handleEvent=this.handleEvent.bind(this),this.eventManager=e.eventManager,this.onViewStateChange=e.onViewStateChange||(()=>{}),this.onStateChange=e.onStateChange||(()=>{}),this.makeViewport=e.makeViewport,this.pickPosition=e.pickPosition}set events(e){this.toggleEvents(this._customEvents,!1),this.toggleEvents(e,!0),this._customEvents=e,this.props&&this.setProps(this.props)}finalize(){for(const e in this._events)this._events[e]&&this.eventManager?.off(e,this.handleEvent);this.transitionManager.finalize()}handleEvent(e){this._controllerState=void 0;const t=this._eventStartBlocked;switch(e.type){case"panstart":return t?!1:this._onPanStart(e);case"panmove":return this._onPan(e);case"panend":return this._onPanEnd(e);case"pinchstart":return t||!this._isTrackpadGestureAllowed(e)?!1:this._onPinchStart(e);case"pinchmove":return this._isTrackpadGestureAllowed(e)?this._onPinch(e):!1;case"pinchend":return this._isTrackpadGestureAllowed(e)?this._onPinchEnd(e):!1;case"multipanstart":return t?!1:this._onMultiPanStart(e);case"multipanmove":return this._onMultiPan(e);case"multipanend":return this._onMultiPanEnd(e);case"dblclick":return this._onDoubleClick(e);case"dblclickdragstart":return t?!1:this._onDoubleClickDragStart(e);case"dblclickdragmove":return this._onDoubleClickDrag(e);case"dblclickdragend":case"dblclickdragcancel":return this._onDoubleClickDragEnd(e);case"wheel":return this._onWheel(e);case"keydown":return this._onKeyDown(e);default:return!1}}get controllerState(){return this._controllerState=this._controllerState||new this.ControllerState({makeViewport:this.makeViewport,...this.props,...this.state}),this._controllerState}getCenter(e){const{x:t,y:n}=this.props,{offsetCenter:s}=e;return[s.x-t,s.y-n]}getZoomPosition(e){if(this.zoomAround==="pointer")return e;const t=this.makeViewport(this.controllerState.getViewportProps()),[n,s]=va(t.center,t.pixelProjectionMatrix);return[n,s]}isPointInBounds(e,t){const{width:n,height:s}=this.props;if(t&&t.handled)return!1;const r=e[0]>=0&&e[0]<=n&&e[1]>=0&&e[1]<=s;return r&&t&&t.stopPropagation(),r}isFunctionKeyPressed(e){const{srcEvent:t}=e;return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}isDragging(){return this._interactionState.isDragging||!1}blockEvents(e){const t=setTimeout(()=>{this._eventStartBlocked===t&&(this._eventStartBlocked=null)},e);this._eventStartBlocked=t}setProps(e){e.maxBoundsPadding===void 0&&(e.maxBoundsPadding=null),e.dragMode&&(this.dragMode=e.dragMode);const t=this.props;this.props=e,"transitionInterpolator"in e||(e.transitionInterpolator=this._getTransitionProps().transitionInterpolator),this.transitionManager.processViewStateChange(e);const{inertia:n}=e;this.inertia=Number.isFinite(n)?n:n===!0?jE:0;const{scrollZoom:s=!0,dragPan:r=!0,dragRotate:o=!0,doubleClickZoom:a=!0,doubleClickDragZoom:c=!1,touchZoom:l=!0,touchRotate:u=!1,multiTouchDrag:f=u?"rotate":null,trackpadGesture:d=!1,zoomAround:g="pointer",keyboard:p=!0}=e,m=!!this.onViewStateChange;if(this.toggleEvents(wt.WHEEL,m&&s),this.toggleEvents(wt.PAN,m),this.toggleEvents(wt.PINCH,m&&(l||f==="rotate")),this.toggleEvents(wt.MULTI_PAN,m&&!!f),this.toggleEvents(wt.DOUBLE_CLICK,m&&a),this.toggleEvents(wt.DOUBLE_CLICK_DRAG,m&&c),this.toggleEvents(wt.KEYBOARD,m&&p),this.scrollZoom=s,this.dragPan=r,this.dragRotate=o,this.doubleClickZoom=a,this.doubleClickDragZoom=c,this.touchZoom=l,this.touchRotate=f==="rotate",this.multiTouchDrag=f,this.trackpadGesture=d,this.zoomAround=g,this.keyboard=p,(!t||t.height!==e.height||t.width!==e.width||t.maxBounds!==e.maxBounds||t.maxBoundsPadding!==e.maxBoundsPadding)&&e.maxBounds){const _=new this.ControllerState({...e,makeViewport:this.makeViewport}),v=_.getViewportProps();Object.keys(v).some(x=>!ee(v[x],e[x],1))&&this.updateViewport(_)}}updateTransition(){this.transitionManager.updateTransition()}toggleEvents(e,t){this.eventManager&&e.forEach(n=>{this._events[n]!==t&&(this._events[n]=t,t?this.eventManager.on(n,this.handleEvent):this.eventManager.off(n,this.handleEvent))})}updateViewport(e,t=null,n={}){const s={...e.getViewportProps(),...t},r=this.controllerState!==e;if(this.state=e.getState(),this._setInteractionState(n),r){const o=this.controllerState&&this.controllerState.getViewportProps();this.onViewStateChange&&this.onViewStateChange({viewState:s,interactionState:this._interactionState,oldViewState:o,viewId:this.props.id})}}_onTransition(e){this.onViewStateChange({...e,interactionState:this._interactionState,viewId:this.props.id})}_setInteractionState(e){Object.assign(this._interactionState,e),this.onStateChange(this._interactionState)}_getConstraintContext(e,t){return this.props.rubberBand?{mode:t==="update"?"elastic":t==="end"?"rebound":"hard"}:{mode:"hard"}}_getReboundTransition(e,t){if(e.mode!=="rebound")return null;const n=t.getViewportProps();return Object.keys(n).some(r=>!ee(this.props[r],n[r],1))?{...this._getTransitionProps(),transitionDuration:WE,transitionEasing:HE}:null}_onPanStart(e){const t=this.getCenter(e);if(!this.isPointInBounds(t,e))return!1;let n=this.isFunctionKeyPressed(e)||e.rightButton||!1;(this.invertPan||this.dragMode==="pan")&&(n=!n);const s=n?"pan":"rotate",r=this._getConstraintContext(s,"start"),o=n?this.controllerState.panStart({pos:t},r):this.controllerState.rotateStart({pos:t},r);return this._panMove=n,this.updateViewport(o,ze,{isDragging:!0}),!0}_onPan(e){return this.isDragging()?this._panMove?this._onPanMove(e):this._onPanRotate(e):!1}_onPanEnd(e){return this.isDragging()?this._panMove?this._onPanMoveEnd(e):this._onPanRotateEnd(e):!1}_onPanMove(e){if(!this.dragPan)return!1;const t=this.getCenter(e),n=this.controllerState.pan({pos:t},this._getConstraintContext("pan","update"));return this.updateViewport(n,ze,{isDragging:!0,isPanning:!0}),!0}_onPanMoveEnd(e){const{inertia:t}=this;if(this.dragPan&&t&&e.velocity){const n=this.getCenter(e),s=[n[0]+e.velocityX*t/2,n[1]+e.velocityY*t/2],r=this.controllerState.pan({pos:s}).panEnd();this.updateViewport(r,{...this._getTransitionProps(),transitionDuration:t,transitionEasing:$a},{isDragging:!1,isPanning:!0})}else{const n=this.controllerState,s=this._getConstraintContext("pan","end"),r=n.panEnd(s),o=this._getReboundTransition(s,r);this.updateViewport(r,o,{isDragging:!1,isPanning:!!o})}return!0}_onPanRotate(e){if(!this.dragRotate)return!1;const t=this.getCenter(e),n=this.controllerState.rotate({pos:t},this._getConstraintContext("rotate","update"));return this.updateViewport(n,ze,{isDragging:!0,isRotating:!0}),!0}_onPanRotateEnd(e){const{inertia:t}=this;if(this.dragRotate&&t&&e.velocity){const n=this.getCenter(e),s=[n[0]+e.velocityX*t/2,n[1]+e.velocityY*t/2],r=this.controllerState.rotate({pos:s}).rotateEnd();this.updateViewport(r,{...this._getTransitionProps(),transitionDuration:t,transitionEasing:$a},{isDragging:!1,isRotating:!0})}else{const n=this.controllerState,s=this._getConstraintContext("rotate","end"),r=n.rotateEnd(s),o=this._getReboundTransition(s,r);this.updateViewport(r,o,{isDragging:!1,isRotating:!!o})}return!0}_onWheel(e){if(!this.scrollZoom||this.trackpadGesture&&e.device!=="mouse")return!1;const t=this.getCenter(e);if(!this.isPointInBounds(t,e))return!1;e.srcEvent.preventDefault();const{speed:n=.01,smooth:s=!1}=this.scrollZoom===!0?{}:this.scrollZoom,{delta:r}=e;let o=2/(1+Math.exp(-Math.abs(r*n)));r<0&&o!==0&&(o=1/o);const a=this.getZoomPosition(t),c=s?{...this._getTransitionProps({around:a}),transitionDuration:250}:ze,l=this.controllerState.zoom({pos:a,scale:o});return this.updateViewport(l,c,{isZooming:!0,isPanning:!0}),s||this._setInteractionState({isZooming:!1,isPanning:!1}),!0}_onMultiPanStart(e){const{multiTouchDrag:t}=this;if(!t||!this._isMultiPanEventAllowed(e,t))return!1;const n=e.offsetCenter;if(!this.isPointInBounds(this.getCenter(e),e))return!1;const s=e.pointerType==="trackpad",r={x:n.x-(s?0:e.deltaX),y:n.y-(s?0:e.deltaY)},o={...e,offsetCenter:r},a=this.getCenter(o),c=t==="pan"?this.controllerState.panStart({pos:a},this._getConstraintContext("pan","start")):this.controllerState.rotateStart({pos:a},this._getConstraintContext("rotate","start"));return this._multiPanMode=t,this._multiPanStartCenter=r,this.updateViewport(c,ze,{isDragging:!0}),!0}_onMultiPan(e){const{mode:t,event:n}=this._getMultiPanEvent(e);return!t||!n||!this.isDragging()?!1:t==="pan"?this._onPanMove(n):this._onPanRotate(n)}_onMultiPanEnd(e){const{mode:t,event:n}=this._getMultiPanEvent(e);if(!t||!n||!this.isDragging())return this._resetMultiPan(),!1;const s=t==="pan"?this._onPanMoveEnd(n):this._onPanRotateEnd(n);return this._resetMultiPan(),s}_isTrackpadGestureAllowed(e){return e.pointerType!=="trackpad"||this.trackpadGesture}_isMultiPanEventAllowed(e,t){return e.pointerType==="trackpad"?this.trackpadGesture&&(t==="pan"?this.dragPan:this.dragRotate):e.pointerType==="touch"&&(t==="pan"?this.dragPan:this.dragRotate)}_getMultiPanEvent(e){const t=this._multiPanMode,n=this._multiPanStartCenter;return!t||!n?{mode:null,event:null}:{mode:t,event:{...e,offsetCenter:{x:n.x+e.deltaX,y:n.y+e.deltaY}}}}_resetMultiPan(){this._multiPanMode=null,this._multiPanStartCenter=null}_onPinchStart(e){this._doubleClickDragAnchor=null;const t=this.getCenter(e);if(!this.isPointInBounds(t,e))return!1;const n=this.controllerState.zoomStart({pos:this.getZoomPosition(t)},this._getConstraintContext("zoom","start")).rotateStart({pos:t},this._getConstraintContext("rotate","start"));return Pt._startPinchRotation=e.rotation,Pt._lastPinchEvent=e,this.updateViewport(n,ze,{isDragging:!0}),!0}_onPinch(e){if(!this.touchZoom&&!this.touchRotate||!this.isDragging())return!1;let t=this.controllerState;if(this.touchZoom){const{scale:n}=e,s=this.getCenter(e);t=t.zoom({pos:this.getZoomPosition(s),scale:n},this._getConstraintContext("zoom","update"))}if(this.touchRotate){const{rotation:n}=e;t=t.rotate({deltaAngleX:Pt._startPinchRotation-n},this._getConstraintContext("rotate","update"))}return this.updateViewport(t,ze,{isDragging:!0,isPanning:this.touchZoom,isZooming:this.touchZoom,isRotating:this.touchRotate}),Pt._lastPinchEvent=e,!0}_onPinchEnd(e){if(!this.isDragging())return!1;const{inertia:t}=this,{_lastPinchEvent:n}=Pt;if(this.touchZoom&&t&&n&&e.scale!==n.scale){const s=this.getCenter(e),r=this.getZoomPosition(s);let o=this.controllerState.rotateEnd();const a=Math.log2(e.scale),c=(a-Math.log2(n.scale))/(e.deltaTime-n.deltaTime),l=Math.pow(2,a+c*t/2);o=o.zoom({pos:r,scale:l}).zoomEnd(),this.updateViewport(o,{...this._getTransitionProps({around:r}),transitionDuration:t,transitionEasing:$a},{isDragging:!1,isPanning:this.touchZoom,isZooming:this.touchZoom,isRotating:!1}),this.blockEvents(t)}else{const s=this.controllerState,r=this._getConstraintContext("zoom","end"),o=this._getConstraintContext("rotate","end"),a=s.zoomEnd(r).rotateEnd(o),c=this._getReboundTransition(this.touchZoom?r:o,a);this.updateViewport(a,c,{isDragging:!1,isPanning:!!c&&this.touchZoom,isZooming:!!c&&this.touchZoom,isRotating:!!c&&this.touchRotate})}return Pt._startPinchRotation=null,Pt._lastPinchEvent=null,!0}_onDoubleClick(e){if(!this.doubleClickZoom||Date.now()<this._suppressDoubleClickUntil)return!1;const t=this.getCenter(e);if(!this.isPointInBounds(t,e))return!1;const n=this.isFunctionKeyPressed(e),s=this.getZoomPosition(t),r=this.controllerState.zoom({pos:s,scale:n?.5:2});return this.updateViewport(r,this._getTransitionProps({around:s}),{isZooming:!0,isPanning:!0}),this.blockEvents(100),!0}_onDoubleClickDragStart(e){if(!this.doubleClickDragZoom)return this._doubleClickDragAnchor=null,!1;const t=this.getCenter(e);if(!this.isPointInBounds(t,e))return this._doubleClickDragAnchor=null,!1;this._doubleClickDragAnchor=this.getZoomPosition(t);let n=this.controllerState.zoomStart({pos:this._doubleClickDragAnchor},this._getConstraintContext("zoom","start"));return e.scale!==1&&(n=n.zoom({pos:this._doubleClickDragAnchor,scale:e.scale},this._getConstraintContext("zoom","update"))),this.updateViewport(n,ze,{isDragging:!0,isPanning:!0,isZooming:!0}),!0}_onDoubleClickDrag(e){const t=this._doubleClickDragAnchor;if(!t)return!1;const n=this.controllerState.zoom({pos:t,scale:e.scale},this._getConstraintContext("zoom","update"));return this.updateViewport(n,ze,{isDragging:!0,isPanning:!0,isZooming:!0}),!0}_onDoubleClickDragEnd(e){if(!this._doubleClickDragAnchor)return!1;this._doubleClickDragAnchor=null;const n=this.controllerState,s=this._getConstraintContext("zoom","end"),r=n.zoomEnd(s),o=this._getReboundTransition(s,r);return this.updateViewport(r,o,{isDragging:!1,isPanning:!!o,isZooming:!!o}),this._suppressDoubleClickUntil=Date.now()+100,this.blockEvents(100),!0}_onKeyDown(e){if(!this.keyboard)return!1;const t=this.isFunctionKeyPressed(e),{zoomSpeed:n,moveSpeed:s,rotateSpeedX:r,rotateSpeedY:o}=this.keyboard===!0?{}:this.keyboard,{controllerState:a}=this;let c;const l={};switch(e.srcEvent.code){case"Minus":c=t?a.zoomOut(n).zoomOut(n):a.zoomOut(n),l.isZooming=!0;break;case"Equal":c=t?a.zoomIn(n).zoomIn(n):a.zoomIn(n),l.isZooming=!0;break;case"ArrowLeft":t?(c=a.rotateLeft(r),l.isRotating=!0):(c=a.moveLeft(s),l.isPanning=!0);break;case"ArrowRight":t?(c=a.rotateRight(r),l.isRotating=!0):(c=a.moveRight(s),l.isPanning=!0);break;case"ArrowUp":t?(c=a.rotateUp(o),l.isRotating=!0):(c=a.moveUp(s),l.isPanning=!0);break;case"ArrowDown":t?(c=a.rotateDown(o),l.isRotating=!0):(c=a.moveDown(s),l.isPanning=!0);break;default:return!1}return this.updateViewport(c,this._getTransitionProps(),l),!0}_getTransitionProps(e){const{transition:t}=this;return!t||!t.transitionInterpolator?ze:e?{...t,transitionInterpolator:new rh({...e,...t.transitionInterpolator.opts,makeViewport:this.controllerState.makeViewport})}:t}}const Ni=Symbol("constraintAround");class qE{constructor(e,t,n,s){this.makeViewport=n,this._viewportProps=this.applyConstraints(e,s),this._state=t}getViewportProps(){return this._viewportProps}getState(){return this._state}}function Ga(i,e,t){const n=i-e;return n&&Number.isFinite(n)?e+n*t/(t+Math.abs(n)):e}function oh(i,e,t){const n=me(pe(t?.left??0),i),s=me(pe(t?.right??0),i),r=me(pe(t?.top??0),e),o=me(pe(t?.bottom??0),e);return{x:n,y:r,width:i-n-s,height:e-r-o}}function XE(i,e,t){let[n,s]=i.project(e);return n=Number.isFinite(n)?n:i.width/2,s=Number.isFinite(s)?s:i.height/2,{left:n-t.x,right:t.x+t.width-n,top:s-t.y,bottom:t.y+t.height-s}}const ah=5,ZE=1.2,ch=512,lh=[[-1/0,-90],[1/0,90]],KE=1;function zi([i,e]){if(Math.abs(e)>90&&(e=Math.sign(e)*90),Number.isFinite(i)){const[n,s]=Xt([i,e]);return[n,ve(s,0,ch)]}const[,t]=Xt([0,e]);return[i,ve(t,0,ch)]}class QE extends qE{constructor(e){const{width:t,height:n,latitude:s,longitude:r,zoom:o,bearing:a=0,pitch:c=0,altitude:l=1.5,position:u=[0,0,0],maxZoom:f=20,minZoom:d=0,maxPitch:g=60,minPitch:p=0,startPanLngLat:m,startZoomLngLat:y,startRotatePos:_,startRotateLngLat:v,startBearing:b,startPitch:x,startZoom:w,normalize:P=!0,rubberBand:L=!1}=e,{[Ni]:E}=e;W(Number.isFinite(r)),W(Number.isFinite(s)),W(Number.isFinite(o));const T=e.maxBounds||(P?lh:null),C=e.maxBoundsPadding||null;super({width:t,height:n,latitude:s,longitude:r,zoom:o,bearing:a,pitch:c,altitude:l,maxZoom:f,minZoom:d,maxPitch:g,minPitch:p,normalize:P,position:u,maxBounds:T,maxBoundsPadding:C,rubberBand:L,[Ni]:E},{startPanLngLat:m,startZoomLngLat:y,startRotatePos:_,startRotateLngLat:v,startBearing:b,startPitch:x,startZoom:w},e.makeViewport,e.constraintContext),this.getAltitude=e.getAltitude}panStart({pos:e},t){return this._getUpdatedState({startPanLngLat:this._unproject(e)},t)}pan({pos:e,startPos:t},n){const s=this.getState().startPanLngLat||this._unproject(t);if(!s)return this;const o=this.makeViewport(this.getViewportProps()).panByPosition(s,e);return this._getUpdatedState(o,n)}panEnd(e){return this._getUpdatedState({startPanLngLat:null},e)}rotateStart({pos:e}){const t=this.getAltitude?.(e);return this._getUpdatedState({startRotatePos:e,startRotateLngLat:t!==void 0?this._unproject3D(e,t):void 0,startBearing:this.getViewportProps().bearing,startPitch:this.getViewportProps().pitch})}rotate({pos:e,deltaAngleX:t=0,deltaAngleY:n=0}){const{startRotatePos:s,startRotateLngLat:r,startBearing:o,startPitch:a}=this.getState();if(!s||o===void 0||a===void 0)return this;let c;if(e?c=this._getNewRotation(e,s,a,o):c={bearing:o+t,pitch:a+n},r){const l=this.makeViewport({...this.getViewportProps(),...c}),u="panByPosition3D"in l?"panByPosition3D":"panByPosition";return this._getUpdatedState({...c,...l[u](r,s)})}return this._getUpdatedState(c)}rotateEnd(){return this._getUpdatedState({startRotatePos:null,startRotateLngLat:null,startBearing:null,startPitch:null})}zoomStart({pos:e},t){return this._getUpdatedState({startZoomLngLat:this._unproject(e),startZoom:this.getViewportProps().zoom},t)}zoom({pos:e,startPos:t,scale:n},s){let{startZoom:r,startZoomLngLat:o}=this.getState();return o||(r=this.getViewportProps().zoom,o=this._unproject(t)||this._unproject(e)),o?this._getUpdatedState({zoom:r+Math.log2(n),[Ni]:{position:o,screenPosition:e}},s):this}zoomEnd(e){return this._getUpdatedState({startZoomLngLat:null,startZoom:null},e)}zoomIn(e=2,t){return this._zoomFromCenter(e,t)}zoomOut(e=2,t){return this._zoomFromCenter(1/e,t)}moveLeft(e=100,t){return this._panFromCenter([e,0],t)}moveRight(e=100,t){return this._panFromCenter([-e,0],t)}moveUp(e=100,t){return this._panFromCenter([0,e],t)}moveDown(e=100,t){return this._panFromCenter([0,-e],t)}rotateLeft(e=15){return this._getUpdatedState({bearing:this.getViewportProps().bearing-e})}rotateRight(e=15){return this._getUpdatedState({bearing:this.getViewportProps().bearing+e})}rotateUp(e=10){return this._getUpdatedState({pitch:this.getViewportProps().pitch+e})}rotateDown(e=10){return this._getUpdatedState({pitch:this.getViewportProps().pitch-e})}shortestPathFrom(e){const t=e.getViewportProps(),n={...this.getViewportProps()},{bearing:s,longitude:r}=n;return Math.abs(s-t.bearing)>180&&(n.bearing=s<0?s+360:s-360),Math.abs(r-t.longitude)>180&&(n.longitude=r<0?r+360:r-360),n}applyConstraints(e,t){const n=e,s=n[Ni];delete n[Ni];const{maxPitch:r,minPitch:o,pitch:a,bearing:c,normalize:l,maxBounds:u,rubberBand:f}=e;l&&(c<-180||c>180)&&(e.bearing=Nd(c+180,360)-180),e.pitch=ve(a,o,r);const d=this._constrainZoom(e.zoom,e),g=f&&t?.mode==="elastic";if(e.zoom=t?.mode==="preserve"?e.zoom:g?Ga(e.zoom,d,KE):d,s){const p=this.makeViewport(e);Object.assign(e,p.panByPosition(s.position,s.screenPosition))}if(l&&(e.longitude<-180||e.longitude>180)&&(e.longitude=Nd(e.longitude+180,360)-180),u){const p=oh(e.width,e.height,e.maxBoundsPadding),m=this.makeViewport({...e,bearing:0,pitch:0}),y=XE(m,[e.longitude,e.latitude],p),_=zi(u[0]),v=zi(u[1]),b=2**e.zoom,x=[_[0]+y.left/b,_[1]+y.bottom/b],w=[v[0]-y.right/b,v[1]-y.top/b],P=zi([e.longitude,e.latitude]),L=[ve(P[0],x[0],w[0]),ve(P[1],x[1],w[1])],E=P.slice();if(p.width>=0&&(E[0]=t?.mode==="preserve"?P[0]:g?Ga(P[0],L[0],p.width/2/b):L[0]),p.height>=0&&(E[1]=t?.mode==="preserve"?P[1]:g?Ga(P[1],L[1],p.height/2/b):L[1]),E[0]!==P[0]||E[1]!==P[1]){const[T,C]=Mi(E);E[0]!==P[0]&&(e.longitude=T),E[1]!==P[1]&&(e.latitude=C)}}return e}_constrainZoom(e,t){t||(t=this.getViewportProps());const{maxZoom:n,maxBounds:s}=t,r=s!==null&&t.width>0&&t.height>0;let{minZoom:o}=t;if(r){const a=oh(t.width,t.height,t.maxBoundsPadding),c=zi(s[0]),l=zi(s[1]),u=l[0]-c[0],f=l[1]-c[1];a.width>0&&Number.isFinite(u)&&u>0&&(o=Math.max(o,Math.log2(a.width/u))),a.height>0&&Number.isFinite(f)&&f>0&&(o=Math.max(o,Math.log2(a.height/f))),o>n&&(o=n)}return ve(e,o,n)}_zoomFromCenter(e,t){const{width:n,height:s}=this.getViewportProps();return this.zoom({pos:[n/2,s/2],scale:e},t)}_panFromCenter(e,t){const{width:n,height:s}=this.getViewportProps();return this.pan({startPos:[n/2,s/2],pos:[n/2+e[0],s/2+e[1]]},t)}_getUpdatedState(e,t){return new this.constructor({makeViewport:this.makeViewport,...this.getViewportProps(),...this.getState(),...e,constraintContext:t})}_unproject(e){const t=this.makeViewport(this.getViewportProps());return e&&t.unproject(e)}_unproject3D(e,t){return this.makeViewport(this.getViewportProps()).unproject(e,{targetZ:t})}_getNewRotation(e,t,n,s){const r=e[0]-t[0],o=e[1]-t[1],a=e[1],c=t[1],{width:l,height:u}=this.getViewportProps(),f=r/l;let d=0;o>0?Math.abs(u-c)>ah&&(d=o/(c-u)*ZE):o<0&&c>ah&&(d=1-a/c),d=ve(d,-1,1);const{minPitch:g,maxPitch:p}=this.getViewportProps(),m=s+180*f;let y=n;return d>0?y=n+d*(p-n):d<0&&(y=n-d*(g-n)),{pitch:y,bearing:m}}}class JE extends YE{constructor(){super(...arguments),this.ControllerState=QE,this.transition={transitionDuration:300,transitionInterpolator:new rh({transitionProps:{compare:["longitude","latitude","zoom","bearing","pitch","position"],required:["longitude","latitude","zoom"]}})},this.dragMode="pan",this.rotationPivot="center",this._getAltitude=e=>{if(this.rotationPivot==="2d")return 0;if(this.rotationPivot==="3d"&&this.pickPosition){const{x:t,y:n}=this.props,s=this.pickPosition(t+e[0],n+e[1]);if(s&&s.coordinate&&s.coordinate.length>=3)return s.coordinate[2]}}}setProps(e){"rotationPivot"in e&&(this.rotationPivot=e.rotationPivot||"center"),e.getAltitude=this._getAltitude,e.position=e.position||[0,0,0],e.maxBounds=e.maxBounds||(e.normalize===!1?null:lh),super.setProps(e)}updateViewport(e,t=null,n={}){const s=e.getState();n.isDragging&&s.startRotateLngLat?n={...n,rotationPivotPosition:s.startRotateLngLat}:n.isDragging===!1&&(n={...n,rotationPivotPosition:void 0}),super.updateViewport(e,t,n)}}class Va extends ni{constructor(e={}){super(e)}getViewportType(){return tt}get ControllerType(){return JE}}Va.displayName="MapView";const e3=new Fd;function t3(i,e){const t=i.order??1/0,n=e.order??1/0;return t-n}class i3{constructor(e){this._resolvedEffects=[],this._defaultEffects=[],this.effects=[],this._context=e,this._needsRedraw="Initial render",this._setEffects([])}addDefaultEffect(e){const t=this._defaultEffects;if(!t.find(n=>n.id===e.id)){const n=t.findIndex(s=>t3(s,e)>0);n<0?t.push(e):t.splice(n,0,e),e.setup(this._context),this._setEffects(this.effects)}}setProps(e){"effects"in e&&(ee(e.effects,this.effects,1)||this._setEffects(e.effects))}needsRedraw(e={clearRedrawFlags:!1}){const t=this._needsRedraw;return e.clearRedrawFlags&&(this._needsRedraw=!1),t}getEffects(){return this._resolvedEffects}_setEffects(e){const t={};for(const s of this.effects)t[s.id]=s;const n=[];for(const s of e){const r=t[s.id];let o=s;r&&r!==s?r.setProps?(r.setProps(s.props),o=r):r.cleanup(this._context):r||s.setup(this._context),n.push(o),delete t[s.id]}for(const s in t)t[s].cleanup(this._context);this.effects=n,this._resolvedEffects=n.concat(this._defaultEffects),e.some(s=>s instanceof Fd)||this._resolvedEffects.push(e3),this._needsRedraw="effects changed"}finalize(){for(const e of this._resolvedEffects)e.cleanup(this._context);this.effects.length=0,this._resolvedEffects.length=0,this._defaultEffects.length=0}}class n3 extends Pa{shouldDrawLayer(e){const{operation:t}=e.props;return t.includes("draw")||t.includes("terrain")}render(e){return this._render(e)}}const s3="deckRenderer.renderLayers";class r3{constructor(e,t={}){this.device=e,this.stats=t.stats,this.layerFilter=null,this.drawPickingColors=!1,this.drawLayersPass=new n3(e),this.pickLayersPass=new Qd(e),this.renderCount=0,this._needsRedraw="Initial render",this.renderBuffers=[],this.lastPostProcessEffect=null}setProps(e){this.layerFilter!==e.layerFilter&&(this.layerFilter=e.layerFilter,this._needsRedraw="layerFilter changed"),this.drawPickingColors!==e.drawPickingColors&&(this.drawPickingColors=e.drawPickingColors,this._needsRedraw="drawPickingColors changed")}renderLayers(e){const t=this.drawPickingColors?this.pickLayersPass:this.drawLayersPass,n={layerFilter:this.layerFilter,isPicking:this.drawPickingColors,...e};if(!e.viewports.length){const a=t.render(n),c="stats"in a?a.stats:a;this._updateStats(c);return}n.effects&&this._preRender(n.effects,n);const s=this.lastPostProcessEffect?this.renderBuffers[0]:n.target;this.lastPostProcessEffect&&(n.clearColor=[0,0,0,0],n.clearCanvas=!0);const r=t.render({...n,target:s}),o="stats"in r?r.stats:r;n.effects&&(this.lastPostProcessEffect&&(n.clearCanvas=e.clearCanvas===void 0?!0:e.clearCanvas),this._postRender(n.effects,n)),this.renderCount++,ie(s3,this,o,e),this._updateStats(o)}needsRedraw(e={clearRedrawFlags:!1}){const t=this._needsRedraw;return e.clearRedrawFlags&&(this._needsRedraw=!1),t}finalize(){const{renderBuffers:e}=this;for(const t of e)t.delete();e.length=0}_updateStats(e){if(!this.stats)return;let t=0;for(const{visibleCount:n}of e)t+=n;this.stats.get("Layers rendered").addCount(t)}_preRender(e,t){this.lastPostProcessEffect=null,t.preRenderStats=t.preRenderStats||{};for(const n of e)t.preRenderStats[n.id]=n.preRender(t),n.postRender&&(this.lastPostProcessEffect=n.id);this.lastPostProcessEffect&&this._resizeRenderBuffers(t.canvasContext)}_resizeRenderBuffers(e=this.device.canvasContext){const{renderBuffers:t}=this,n=e.getDrawingBufferSize(),[s,r]=n;t.length===0&&[0,1].map(o=>{const a=this.device.createTexture({sampler:{minFilter:"linear",magFilter:"linear"},width:s,height:r});t.push(this.device.createFramebuffer({id:`deck-renderbuffer-${o}`,colorAttachments:[a]}))});for(const o of t)o.resize(n)}_postRender(e,t){const{renderBuffers:n}=this,s=t.target??t.canvasContext?.getCurrentFramebuffer()??t.target,r={...t,inputBuffer:n[0],swapBuffer:n[1]};for(const o of e)if(o.postRender){r.target=o.id===this.lastPostProcessEffect?s:void 0;const a=o.postRender(r);r.inputBuffer=a,r.swapBuffer=a===n[0]?n[1]:n[0]}}}const o3={pickedColor:null,pickedObjectIndex:-1};function uh({pickedColors:i,decodePickingColor:e,deviceX:t,deviceY:n,deviceRadius:s,deviceRect:r}){const{x:o,y:a,width:c,height:l}=r;let u=s*s,f=-1,d=0;for(let g=0;g<l;g++){const p=g+a-n,m=p*p;if(m>u)d+=4*c;else for(let y=0;y<c;y++){if(i[d+3]-1>=0){const v=y+o-t,b=v*v+m;b<=u&&(u=b,f=d)}d+=4}}if(f>=0){const g=i.slice(f,f+4),p=e(g);if(p){const m=Math.floor(f/4/c),y=f/4-m*c;return{...p,pickedColor:g,pickedX:o+y,pickedY:a+m}}D.error("Picked non-existent layer. Is picking buffer corrupt?")()}return o3}function fh({pickedColors:i,decodePickingColor:e}){const t=new Map;if(i){for(let n=0;n<i.length;n+=4)if(i[n+3]-1>=0){const r=i.slice(n,n+4),o=r.join(",");if(!t.has(o)){const a=e(r);a?t.set(o,{...a,color:r}):D.error("Picked non-existent layer. Is picking buffer corrupt?")()}}}return Array.from(t.values())}function ja({pickInfo:i,viewports:e,pixelRatio:t,x:n,y:s,z:r}){let o=e[0];e.length>1&&(o=a3(i?.pickedViewports||e,{x:n,y:s}));let a;if(o){const c=[n-o.x,s-o.y];r!==void 0&&(c[2]=r),a=o.unproject(c)}return{color:null,layer:null,viewport:o,index:-1,picked:!1,x:n,y:s,pixel:[n,s],coordinate:a,devicePixel:i&&"pickedX"in i?[i.pickedX,i.pickedY]:void 0,pixelRatio:t}}function dh(i){const{pickInfo:e,lastPickedInfo:t,mode:n,layers:s}=i,{pickedColor:r,pickedLayer:o,pickedObjectIndex:a}=e,c=o?[o]:[];if(n==="hover"){const f=t.index,d=t.layerId,g=o?o.props.id:null;if(g!==d||a!==f){if(g!==d){const p=s.find(m=>m.props.id===d);p&&c.unshift(p)}t.layerId=g,t.index=a,t.info=null}}const l=ja(i),u=new Map;return u.set(null,l),c.forEach(f=>{let d={...l};f===o&&(d.color=r,d.index=a,d.picked=!0),d=Wa({layer:f,info:d,mode:n});const g=d.layer;f===o&&n==="hover"&&(t.info=d),u.set(g.id,d),n==="hover"&&g.updateAutoHighlight(d)}),u}function Wa({layer:i,info:e,mode:t}){for(;i&&e;){const n=e.layer||null;e.sourceLayer=n,e.layer=i,e=i.getPickingInfo({info:e,mode:t,sourceLayer:n}),i=i.parent}return e}function a3(i,e){for(let t=i.length-1;t>=0;t--){const n=i[t];if(n.containsPixel(e))return n}return i[0]}class c3{constructor(e,t={}){this._pickable=!0,this.device=e,this.stats=t.stats,this.pickLayersPass=new Qd(e),this.lastPickedInfo={index:-1,layerId:null,info:null}}setProps(e){"layerFilter"in e&&(this.layerFilter=e.layerFilter),"_pickable"in e&&(this._pickable=e._pickable)}finalize(){this.pickingFBO&&this.pickingFBO.destroy(),this.depthFBO&&this.depthFBO.destroy()}pickObjectAsync(e){return this._pickClosestObjectAsync(e)}pickObjectsAsync(e){return this._pickVisibleObjectsAsync(e)}pickObject(e){return this._pickClosestObject(e)}pickObjects(e){return this._pickVisibleObjects(e)}getLastPickedObject({x:e,y:t,layers:n,viewports:s},r=this.lastPickedInfo.info){const o=r&&r.layer&&r.layer.id,a=r&&r.viewport&&r.viewport.id,c=o?n.find(d=>d.id===o):null,l=a&&s.find(d=>d.id===a)||s[0],u=l&&l.unproject([e-l.x,t-l.y]);return{...r,...{x:e,y:t,viewport:l,coordinate:u,layer:c}}}_resizeBuffer(e=this.device.getDefaultCanvasContext()){if(!this.pickingFBO){const s=this.device.createTexture({format:"rgba8unorm",width:1,height:1,usage:H.RENDER_ATTACHMENT|H.COPY_SRC});if(this.pickingFBO=this.device.createFramebuffer({colorAttachments:[s],depthStencilAttachment:"depth16unorm"}),this.device.isTextureFormatRenderable("rgba32float")){const r=this.device.createTexture({format:"rgba32float",width:1,height:1,usage:H.RENDER_ATTACHMENT|H.COPY_SRC}),o=this.device.createFramebuffer({colorAttachments:[r],depthStencilAttachment:"depth16unorm"});this.depthFBO=o}}const[t,n]=e.getDrawingBufferSize();this.pickingFBO?.resize({width:t,height:n}),this.depthFBO?.resize({width:t,height:n})}_getPickable(e){if(this._pickable===!1)return null;const t=e.filter(n=>this.pickLayersPass.shouldDrawLayer(n)&&!n.isComposite);return t.length?t:null}async _pickClosestObjectAsync({layers:e,views:t,viewports:n,x:s,y:r,radius:o=0,depth:a=1,mode:c="query",unproject3D:l,canvasContext:u=this.device.getDefaultCanvasContext(),onViewportActive:f,effects:d}){const g=u.cssToDeviceRatio(),p=this._getPickable(e);if(!p||n.length===0)return{result:[],emptyInfo:ja({viewports:n,x:s,y:r,pixelRatio:g})};this._resizeBuffer(u);const m=u.cssToDevicePixels([s,r],!0),y=[m.x+Math.floor(m.width/2),m.y+Math.floor(m.height/2)],_=Math.round(o*g),{width:v,height:b}=this.pickingFBO,x=this._getPickingRect({deviceX:y[0],deviceY:y[1],deviceRadius:_,deviceWidth:v,deviceHeight:b}),w={x:s-o,y:r-o,width:o*2+1,height:o*2+1};let P;const L=[],E=new Set;for(let T=0;T<a;T++){let C;if(x){const A=await this._drawAndSampleAsync({layers:p,views:t,viewports:n,onViewportActive:f,deviceRect:x,cullRect:w,effects:d,pass:`picking:${c}`,canvasContext:u});C=uh({...A,deviceX:y[0],deviceY:y[1],deviceRadius:_,deviceRect:x})}else C={pickedColor:null,pickedObjectIndex:-1};let O;const M=this._getDepthLayers(C,p,l);if(M.length>0){const{pickedColors:A}=await this._drawAndSampleAsync({layers:M,views:t,viewports:n,onViewportActive:f,deviceRect:{x:C.pickedX??y[0],y:C.pickedY??y[1],width:1,height:1},cullRect:w,effects:d,pass:`picking:${c}:z`,canvasContext:u},!0);A[3]&&(O=A[0])}C.pickedLayer&&T+1<a&&(E.add(C.pickedLayer),C.pickedLayer.disablePickingIndex(C.pickedObjectIndex)),P=dh({pickInfo:C,lastPickedInfo:this.lastPickedInfo,mode:c,layers:p,viewports:n,x:s,y:r,z:O,pixelRatio:g});for(const A of P.values())A.layer&&L.push(A);if(!C.pickedColor)break}for(const T of E)T.restorePickingColors();return{result:L,emptyInfo:P.get(null)}}_pickClosestObject({layers:e,views:t,viewports:n,x:s,y:r,radius:o=0,depth:a=1,mode:c="query",unproject3D:l,canvasContext:u=this.device.getDefaultCanvasContext(),onViewportActive:f,effects:d}){const g=u.cssToDeviceRatio(),p=this._getPickable(e);if(!p||n.length===0)return{result:[],emptyInfo:ja({viewports:n,x:s,y:r,pixelRatio:g})};this._resizeBuffer(u);const m=u.cssToDevicePixels([s,r],!0),y=[m.x+Math.floor(m.width/2),m.y+Math.floor(m.height/2)],_=Math.round(o*g),{width:v,height:b}=this.pickingFBO,x=this._getPickingRect({deviceX:y[0],deviceY:y[1],deviceRadius:_,deviceWidth:v,deviceHeight:b}),w={x:s-o,y:r-o,width:o*2+1,height:o*2+1};let P;const L=[],E=new Set;for(let T=0;T<a;T++){let C;if(x){const A=this._drawAndSample({layers:p,views:t,viewports:n,onViewportActive:f,deviceRect:x,cullRect:w,effects:d,pass:`picking:${c}`,canvasContext:u});C=uh({...A,deviceX:y[0],deviceY:y[1],deviceRadius:_,deviceRect:x})}else C={pickedColor:null,pickedObjectIndex:-1};let O;const M=this._getDepthLayers(C,p,l);if(M.length>0){const{pickedColors:A}=this._drawAndSample({layers:M,views:t,viewports:n,onViewportActive:f,deviceRect:{x:C.pickedX??y[0],y:C.pickedY??y[1],width:1,height:1},cullRect:w,effects:d,pass:`picking:${c}:z`,canvasContext:u},!0);A[3]&&(O=A[0])}C.pickedLayer&&T+1<a&&(E.add(C.pickedLayer),C.pickedLayer.disablePickingIndex(C.pickedObjectIndex)),P=dh({pickInfo:C,lastPickedInfo:this.lastPickedInfo,mode:c,layers:p,viewports:n,x:s,y:r,z:O,pixelRatio:g});for(const A of P.values())A.layer&&L.push(A);if(!C.pickedColor)break}for(const T of E)T.restorePickingColors();return{result:L,emptyInfo:P.get(null)}}async _pickVisibleObjectsAsync({layers:e,views:t,viewports:n,x:s,y:r,width:o=1,height:a=1,mode:c="query",maxObjects:l=null,canvasContext:u=this.device.getDefaultCanvasContext(),onViewportActive:f,effects:d}){const g=this._getPickable(e);if(!g||n.length===0)return[];this._resizeBuffer(u);const p=u.cssToDeviceRatio(),m=u.cssToDevicePixels([s,r],!0),y=m.x,_=m.y+m.height,v=u.cssToDevicePixels([s+o,r+a],!0),b=v.x+v.width,x=v.y,w={x:y,y:x,width:b-y,height:_-x},P=await this._drawAndSampleAsync({layers:g,views:t,viewports:n,onViewportActive:f,deviceRect:w,cullRect:{x:s,y:r,width:o,height:a},effects:d,pass:`picking:${c}`,canvasContext:u}),L=fh(P),E=new Map,T=[],C=Number.isFinite(l);for(let O=0;O<L.length&&!(C&&T.length>=l);O++){const M=L[O];let A={color:M.pickedColor,layer:null,index:M.pickedObjectIndex,picked:!0,x:s,y:r,pixelRatio:p};A=Wa({layer:M.pickedLayer,info:A,mode:c});const R=A.layer.id;E.has(R)||E.set(R,new Set);const Z=E.get(R),U=A.object??A.index;Z.has(U)||(Z.add(U),T.push(A))}return T}_pickVisibleObjects({layers:e,views:t,viewports:n,x:s,y:r,width:o=1,height:a=1,mode:c="query",maxObjects:l=null,canvasContext:u=this.device.getDefaultCanvasContext(),onViewportActive:f,effects:d}){const g=this._getPickable(e);if(!g||n.length===0)return[];this._resizeBuffer(u);const p=u.cssToDeviceRatio(),m=u.cssToDevicePixels([s,r],!0),y=m.x,_=m.y+m.height,v=u.cssToDevicePixels([s+o,r+a],!0),b=v.x+v.width,x=v.y,w={x:y,y:x,width:b-y,height:_-x},P=this._drawAndSample({layers:g,views:t,viewports:n,onViewportActive:f,deviceRect:w,cullRect:{x:s,y:r,width:o,height:a},effects:d,pass:`picking:${c}`,canvasContext:u}),L=fh(P),E=new Map,T=[],C=Number.isFinite(l);for(let O=0;O<L.length&&!(C&&T.length>=l);O++){const M=L[O];let A={color:M.pickedColor,layer:null,index:M.pickedObjectIndex,picked:!0,x:s,y:r,pixelRatio:p};A=Wa({layer:M.pickedLayer,info:A,mode:c});const R=A.layer.id;E.has(R)||E.set(R,new Set);const Z=E.get(R),U=A.object??A.index;Z.has(U)||(Z.add(U),T.push(A))}return T}async _drawAndSampleAsync({layers:e,views:t,viewports:n,onViewportActive:s,deviceRect:r,cullRect:o,effects:a,pass:c,canvasContext:l},u=!1){const f=u?this.depthFBO:this.pickingFBO,d={layers:e,layerFilter:this.layerFilter,views:t,viewports:n,onViewportActive:s,pickingFBO:f,deviceRect:r,cullRect:o,effects:a,pass:c,canvasContext:l,pickZ:u,preRenderStats:{},isPicking:!0};for(const w of a)w.useInPicking&&(d.preRenderStats[w.id]=w.preRender(d));const{decodePickingColor:g,stats:p}=this.pickLayersPass.render(d);this._updateStats(p);const{x:m,y,width:_,height:v}=r,b=f.colorAttachments[0]?.texture;if(!b)throw new Error("Picking framebuffer color attachment is missing");const x=await this._readTextureDataAsync(b,{x:m,y,width:_,height:v},u?Float32Array:Uint8Array);if(!u){let w=!1;for(let P=3;P<x.length;P+=4)if(x[P]!==0){w=!0;break}!w&&x.length>0&&D.warn("Async pick readback returned only zero alpha values",{deviceRect:r,bytes:Array.from(x.subarray(0,Math.min(x.length,16)))})()}return{pickedColors:x,decodePickingColor:g}}async _readTextureDataAsync(e,t,n){const{width:s,height:r}=t,o=e.computeMemoryLayout(t),a=this.device.createBuffer({byteLength:o.byteLength,usage:F.COPY_DST|F.MAP_READ});try{e.readBuffer(t,a);const c=await a.readAsync(0,o.byteLength),l=n.BYTES_PER_ELEMENT;if(o.bytesPerRow%l!==0)throw new Error(`Texture readback row stride ${o.bytesPerRow} is not aligned to ${l}-byte elements.`);const u=new n(c.buffer,c.byteOffset,o.byteLength/l),f=s*4,d=o.bytesPerRow/l;if(d<f)throw new Error(`Texture readback row stride ${d} is smaller than packed row length ${f}.`);const g=new n(s*r*4);for(let p=0;p<r;p++){const m=p*d;g.set(u.subarray(m,m+f),p*f)}return g}finally{a.destroy()}}_drawAndSample({layers:e,views:t,viewports:n,onViewportActive:s,deviceRect:r,cullRect:o,effects:a,pass:c,canvasContext:l},u=!1){const f=u?this.depthFBO:this.pickingFBO,d={layers:e,layerFilter:this.layerFilter,views:t,viewports:n,onViewportActive:s,pickingFBO:f,deviceRect:r,cullRect:o,effects:a,pass:c,canvasContext:l,pickZ:u,preRenderStats:{},isPicking:!0};for(const x of a)x.useInPicking&&(d.preRenderStats[x.id]=x.preRender(d));const{decodePickingColor:g,stats:p}=this.pickLayersPass.render(d);this._updateStats(p);const{x:m,y,width:_,height:v}=r,b=new(u?Float32Array:Uint8Array)(_*v*4);return this.device.readPixelsToArrayWebGL(f,{sourceX:m,sourceY:y,sourceWidth:_,sourceHeight:v,target:b}),{pickedColors:b,decodePickingColor:g}}_updateStats(e){if(!this.stats)return;let t=0;for(const{visibleCount:n}of e)t+=n;this.stats.get("Layers picked").addCount(t)}_getDepthLayers(e,t,n){if(!n||!this.depthFBO)return[];const{pickedLayer:s}=e,r=s?.state?.terrainDrawMode==="drape";return s&&!r?[s]:t.filter(o=>o.props.operation.includes("terrain"))}_getPickingRect({deviceX:e,deviceY:t,deviceRadius:n,deviceWidth:s,deviceHeight:r}){const o=Math.max(0,e-n),a=Math.max(0,t-n),c=Math.min(s,e+n+1)-o,l=Math.min(r,t+n+1)-a;return c<=0||l<=0?null:{x:o,y:a,width:c,height:l}}}const l3={"top-left":{top:0,left:0},"top-right":{top:0,right:0},"bottom-left":{bottom:0,left:0},"bottom-right":{bottom:0,right:0},fill:{top:0,left:0,bottom:0,right:0}},u3="top-left",hh="root";class f3{constructor({deck:e,parentElement:t}){this.defaultWidgets=[],this.widgets=[],this.resolvedWidgets=[],this.containers={},this.lastViewports={},this.deck=e,t?.classList.add("deck-widget-container"),this.parentElement=t}getWidgets(){return this.resolvedWidgets}setProps(e){if(e.widgets&&!ee(e.widgets,this.widgets,1)){const t=e.widgets.filter(Boolean);this._setWidgets(t)}}finalize(){for(const e of this.getWidgets())this._removeWidget(e);this.defaultWidgets.length=0,this.resolvedWidgets.length=0;for(const e in this.containers)this.containers[e].remove()}addDefault(e){this.defaultWidgets.find(t=>t.id===e.id)||(this._addWidget(e),this.defaultWidgets.push(e),this._setWidgets(this.widgets))}onRedraw({viewports:e,layers:t}){const n=e.reduce((s,r)=>(s[r.id]=r,s),{});for(const s of this.getWidgets()){const{viewId:r}=s;if(r){const o=n[r];o&&(s.onViewportChange&&s.onViewportChange(o),s.onRedraw?.({viewports:[o],layers:t}))}else{if(s.onViewportChange)for(const o of e)s.onViewportChange(o);s.onRedraw?.({viewports:e,layers:t})}}this.lastViewports=n,this._updateContainers()}onHover(e,t){for(const n of this.getWidgets()){const{viewId:s}=n;(!s||s===e.viewport?.id)&&n.onHover?.(e,t)}}getCanvasBounds(e){const n=this.deck?.getCanvas?.()?.getBoundingClientRect(),s=this.parentElement?.getBoundingClientRect(),r=this.deck?.getCanvasContext?.(e?.id);if(r&&s){r.updatePosition();const[o,a]=r.getPosition(),[c,l]=r.getCSSSize();return{x:o-s.left,y:a-s.top,width:c,height:l}}return{x:n&&s?n.left-s.left:0,y:n&&s?n.top-s.top:0,width:n?.width||this.deck?.width||0,height:n?.height||this.deck?.height||0}}onEvent(e,t){const n=gs[t.type];if(n)for(const s of this.getWidgets()){const{viewId:r}=s;(!r||r===e.viewport?.id)&&s[n]?.(e,t)}}_setWidgets(e){const t={};for(const n of this.resolvedWidgets)t[n.id]=n;this.resolvedWidgets.length=0;for(const n of this.defaultWidgets)t[n.id]=null,this.resolvedWidgets.push(n);for(let n of e){const s=t[n.id];s?s.viewId!==n.viewId||s.placement!==n.placement?(this._removeWidget(s),this._addWidget(n)):n!==s&&(s.setProps(n.props),n=s):this._addWidget(n),t[n.id]=null,this.resolvedWidgets.push(n)}for(const n in t){const s=t[n];s&&this._removeWidget(s)}this.widgets=e}_addWidget(e){const{viewId:t=null,placement:n=u3}=e,s=e.props._container??t;e.widgetManager=this,e.deck=this.deck,e.rootElement=e._onAdd({deck:this.deck,viewId:t}),e.rootElement&&this._getContainer(s,n).append(e.rootElement),e.updateHTML()}_removeWidget(e){e.onRemove?.(),e.rootElement&&e.rootElement.remove(),e.rootElement=void 0,e.deck=void 0,e.widgetManager=void 0}_getContainer(e,t){if(e&&typeof e!="string")return e;const n=e||hh;let s=this.containers[n];s||(s=document.createElement("div"),s.style.pointerEvents="none",s.style.position="absolute",s.style.overflow="hidden",this.parentElement?.append(s),this.containers[n]=s);let r=s.querySelector(`.${t}`);return r||(r=globalThis.document.createElement("div"),r.className=t,r.style.position="absolute",r.style.zIndex="2",Object.assign(r.style,l3[t]),s.append(r)),r}_updateContainers(){for(const e in this.containers){const t=this.lastViewports[e]||null,n=e===hh||t,s=this.containers[e];if(n){const r=this._getContainerBounds(t);s.style.display="block",s.style.left=`${r.x}px`,s.style.top=`${r.y}px`,s.style.width=`${r.width}px`,s.style.height=`${r.height}px`}else s.style.display="none"}}_getContainerBounds(e){if(!e)return{x:0,y:0,width:this.parentElement?.clientWidth||this.deck.width,height:this.parentElement?.clientHeight||this.deck.height};const t=this.getCanvasBounds(e);return{x:t.x+e.x,y:t.y+e.y,width:e.width,height:e.height}}}function gh(i,e){e&&Object.entries(e).map(([t,n])=>{t.startsWith("--")?i.style.setProperty(t,n):i.style[t]=n})}function d3(i,e){e&&Object.keys(e).map(t=>{t.startsWith("--")?i.style.removeProperty(t):i.style[t]=""})}class Ha{constructor(e){this.viewId=null,this.props={...this.constructor.defaultProps,...e},this.id=this.props.id}setProps(e){const t=this.props,n=this.rootElement;n&&t.className!==e.className&&(t.className&&n.classList.remove(t.className),e.className&&n.classList.add(e.className)),n&&!ee(t.style,e.style,1)&&(d3(n,t.style),gh(n,e.style)),Object.assign(this.props,e),this.updateHTML()}updateHTML(){this.rootElement&&this.onRenderHTML(this.rootElement)}get viewIds(){return this.viewId?[this.viewId]:this.deck?.getViews().map(e=>e.id)??[]}getViewState(e){return this.deck?.viewManager?.getViewState(e)||{}}setViewState(e,t){this.deck?._onViewStateChange({viewId:e,viewState:t,interactionState:{}})}onCreateRootElement(){const e=["deck-widget",this.className,this.props.className],t=document.createElement("div");return e.filter(n=>typeof n=="string"&&n.length>0).forEach(n=>t.classList.add(n)),gh(t,this.props.style),t}_onAdd(e){return this.onAdd(e)??this.onCreateRootElement()}onAdd(e){}onRemove(){}onViewportChange(e){}onRedraw(e){}onHover(e,t){}onClick(e,t){}onDrag(e,t){}onDragStart(e,t){}onDragEnd(e,t){}}Ha.defaultProps={id:"widget",style:{},_container:null,className:""};const h3={zIndex:"1",position:"absolute",pointerEvents:"none",color:"#a0a7b4",backgroundColor:"#29323c",padding:"10px",top:"0",left:"0",display:"none"};class ph extends Ha{constructor(e={}){super(e),this.id="default-tooltip",this.placement="fill",this.className="deck-tooltip",this.isVisible=!1,this.setProps(e)}onCreateRootElement(){const e=document.createElement("div");return e.className=this.className,Object.assign(e.style,h3),e}onRenderHTML(e){}onViewportChange(e){this.isVisible&&e.id===this.lastViewport?.id&&!e.equals(this.lastViewport)&&this.setTooltip(null),this.lastViewport=e}onHover(e){const{deck:t}=this,n=t&&t.props.getTooltip;if(!n)return;const s=n(e),r=this.widgetManager?.getCanvasBounds(e.viewport),o=e.x+(r?.x||0),a=e.y+(r?.y||0);this.setTooltip(s,o,a)}setTooltip(e,t,n){const s=this.rootElement;if(s){if(typeof e=="string")s.innerText=e;else if(e)e.text&&(s.innerText=e.text),e.html&&(s.innerHTML=e.html),e.className&&(s.className=e.className);else{this.isVisible=!1,s.style.display="none";return}this.isVisible=!0,s.style.display="block",s.style.transform=`translate(${t}px, ${n}px)`,e&&typeof e=="object"&&"style"in e&&Object.assign(s.style,e.style)}}}ph.defaultProps={...Ha.defaultProps};class g3{constructor(e){this.targets={},this.order=[],this.eventManagers={},this._eventRootToCanvasId=new WeakMap,this._createEventManager=e.createEventManager,this._getEventRoot=e.getEventRoot}finalize(){for(const e of Object.values(this.targets))e.eventManager.destroy(),e.presentationContext.destroy();this.targets={},this.order=[],this.eventManagers={},this._eventRootToCanvasId=new WeakMap}syncCanvasEntries(e){const t=this._normalizeCanvasList(e.canvases),n={},s=[],r=new Map;for(const{canvas:a}of t){const c=this._getEventRoot(a);r.set(c,(r.get(c)||0)+1)}for(const{id:a,canvas:c}of t){const l=this._getEventRoot(c),u=r.get(l)===1?l:c;let f=this.targets[a];if(!f||f.device!==e.device||f.canvas!==c||f.eventRoot!==u){f?.eventManager.destroy(),f?.presentationContext.destroy();const d=e.device.createPresentationContext({id:a,canvas:c,useDevicePixels:e.useDevicePixels,autoResize:!0});f={id:a,device:e.device,canvas:c,eventRoot:u,presentationContext:d,eventManager:this._createEventManager(u)}}this._eventRootToCanvasId.set(u,a),this._eventRootToCanvasId.set(c,a),n[a]=f,s.push(a)}for(const[a,c]of Object.entries(this.targets))n[a]||(c.eventManager.destroy(),c.presentationContext.destroy());this.targets=n,this.order=s;const o=Object.fromEntries(Object.entries(n).map(([a,c])=>[a,c.eventManager]));this._haveSameEventManagers(o)||(this.eventManagers=o)}getCanvasIdFromEvent(e){return e?this._eventRootToCanvasId.get(e):void 0}getTarget(e){return this.targets[e||this.order[0]||ii]||null}_normalizeCanvasList(e=[]){const t=new Set;return e.map((n,s)=>{let r,o;return typeof n=="string"?(r=document.getElementById(n),W(r,`Canvas with id ${n} not found`),o=n):(r=n,o=r.id||`deckgl-canvas-${s}`),W(!t.has(o),`Duplicate canvas id ${o}`),t.add(o),{id:o,canvas:r}})}_haveSameEventManagers(e){const t=Object.keys(e),n=Object.keys(this.eventManagers);return t.length===n.length&&t.every(s=>e[s]===this.eventManagers[s])}}const p3={WEBGL_depth_texture:{UNSIGNED_INT_24_8_WEBGL:34042},OES_element_index_uint:{},OES_texture_float:{},OES_texture_half_float:{HALF_FLOAT_OES:5131},EXT_color_buffer_float:{},OES_standard_derivatives:{FRAGMENT_SHADER_DERIVATIVE_HINT_OES:35723},EXT_frag_depth:{},EXT_blend_minmax:{MIN_EXT:32775,MAX_EXT:32776},EXT_shader_texture_lod:{}},m3=i=>({drawBuffersWEBGL(e){return i.drawBuffers(e)},COLOR_ATTACHMENT0_WEBGL:36064,COLOR_ATTACHMENT1_WEBGL:36065,COLOR_ATTACHMENT2_WEBGL:36066,COLOR_ATTACHMENT3_WEBGL:36067}),y3=i=>({VERTEX_ARRAY_BINDING_OES:34229,createVertexArrayOES(){return i.createVertexArray()},deleteVertexArrayOES(e){return i.deleteVertexArray(e)},isVertexArrayOES(e){return i.isVertexArray(e)},bindVertexArrayOES(e){return i.bindVertexArray(e)}}),b3=i=>({VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE:35070,drawArraysInstancedANGLE(...e){return i.drawArraysInstanced(...e)},drawElementsInstancedANGLE(...e){return i.drawElementsInstanced(...e)},vertexAttribDivisorANGLE(...e){return i.vertexAttribDivisor(...e)}});function _3(i=!0){const e=HTMLCanvasElement.prototype;if(!i&&e.originalGetContext){e.getContext=e.originalGetContext,e.originalGetContext=void 0;return}e.originalGetContext=e.getContext,e.getContext=function(t,n){if(t==="webgl"||t==="experimental-webgl"){const s=this.originalGetContext("webgl2",n);return s instanceof HTMLElement&&v3(s),s}return this.originalGetContext(t,n)}}function v3(i){i.getExtension("EXT_color_buffer_float");const e={...p3,WEBGL_disjoint_timer_query:i.getExtension("EXT_disjoint_timer_query_webgl2"),WEBGL_draw_buffers:m3(i),OES_vertex_array_object:y3(i),ANGLE_instanced_arrays:b3(i)},t=i.getExtension.bind(i);i.getExtension=function(s){const r=t(s);return r||(s in e?e[s]:null)};const n=i.getSupportedExtensions;i.getSupportedExtensions=function(){return(n.apply(i)||[])?.concat(Object.keys(e))}}let mh=!1;async function x3(){{Ya();return}}function w3(i,e){return Ya(),i}async function P3(i){{Ya();return}}function S3(i){return null}function Ya(){mh||(mh=!0,S.warn("Import @luma.gl/webgl/debug before enabling WebGL debugging.")())}const Ui=1;class E3 extends x_{constructor(){super(...arguments);h(this,"type","webgl")}enforceWebGL2(t){_3(t)}isSupported(){return typeof WebGL2RenderingContext<"u"}isDeviceHandle(t){return typeof WebGL2RenderingContext<"u"&&t instanceof WebGL2RenderingContext?!0:(typeof WebGLRenderingContext<"u"&&t instanceof WebGLRenderingContext&&S.warn("WebGL1 is not supported",t)(),!1)}async attach(t,n={}){const{WebGLDevice:s}=await Promise.resolve().then(()=>Xh);if(t instanceof s)return t;const r=s.getDeviceFromContext(t);if(r)return r;if(!C3(t))throw new Error("Invalid WebGL2RenderingContext");n=yh(n),await bh(n);const o=n.createCanvasContext===!0?{}:n.createCanvasContext;return new s({...n,_handle:t,createCanvasContext:{canvas:t.canvas,autoResize:!1,...o}})}async create(t={}){const{WebGLDevice:n}=await Promise.resolve().then(()=>Xh);t=yh(t),await bh(t);try{const s=new n(t);S.groupCollapsed(Ui,`WebGLDevice ${s.id} created`)();const r=`${s._reused?"Reusing":"Created"} device with WebGL2 ${s.props.debug?"debug ":""}context: ${s.info.vendor}, ${s.info.renderer} for canvas: ${s.canvasContext.id}`;return S.probe(Ui,r)(),S.table(Ui,s.info)(),s}finally{S.groupEnd(Ui)(),S.info(Ui,"%cWebGL call tracing: luma.log.set('debug-webgl') ","color: white; background: blue; padding: 2px 6px; border-radius: 3px;")()}}}function C3(i){return typeof WebGL2RenderingContext<"u"&&i instanceof WebGL2RenderingContext?!0:!!(i&&typeof i.createVertexArray=="function")}const qa=new E3;function yh(i){return{...i,debug:i.debug??Ft.defaultProps.debug,debugWebGL:i.debugWebGL??Ft.defaultProps.debugWebGL,debugSpectorJS:i.debugSpectorJS??!!S.get("debug-spectorjs")}}async function bh(i){const e=[];(i.debugWebGL||i.debug)&&e.push(x3()),i.debugSpectorJS&&e.push(P3());const t=await Promise.allSettled(e);for(const n of t)n.status==="rejected"&&S.error(`Failed to initialize debug libraries ${n.reason}`)()}const Xa={3042:!1,32773:new Float32Array([0,0,0,0]),32777:32774,34877:32774,32969:1,32968:0,32971:1,32970:0,3106:new Float32Array([0,0,0,0]),3107:[!0,!0,!0,!0],2884:!1,2885:1029,2929:!1,2931:1,2932:513,2928:new Float32Array([0,1]),2930:!0,3024:!0,35725:null,36006:null,36007:null,34229:null,34964:null,2886:2305,33170:4352,2849:1,32823:!1,32824:0,10752:0,32926:!1,32928:!1,32938:1,32939:!1,3089:!1,3088:new Int32Array([0,0,1024,1024]),2960:!1,2961:0,2968:4294967295,36005:4294967295,2962:519,2967:0,2963:4294967295,34816:519,36003:0,36004:4294967295,2964:7680,2965:7680,2966:7680,34817:7680,34818:7680,34819:7680,2978:[0,0,1024,1024],36389:null,36662:null,36663:null,35053:null,35055:null,35723:4352,36010:null,35977:!1,3333:4,3317:4,37440:!1,37441:!1,37443:37444,3330:0,3332:0,3331:0,3314:0,32878:0,3316:0,3315:0,32877:0},K=(i,e,t)=>e?i.enable(t):i.disable(t),_h=(i,e,t)=>i.hint(t,e),ue=(i,e,t)=>i.pixelStorei(t,e),vh=(i,e,t)=>{const n=t===36006?36009:36008;return i.bindFramebuffer(n,e)},$i=(i,e,t)=>{const s={34964:34962,36662:36662,36663:36663,35053:35051,35055:35052}[t];i.bindBuffer(s,e)};function Za(i){return Array.isArray(i)||ArrayBuffer.isView(i)&&!(i instanceof DataView)}const L3={3042:K,32773:(i,e)=>i.blendColor(...e),32777:"blendEquation",34877:"blendEquation",32969:"blendFunc",32968:"blendFunc",32971:"blendFunc",32970:"blendFunc",3106:(i,e)=>i.clearColor(...e),3107:(i,e)=>i.colorMask(...e),2884:K,2885:(i,e)=>i.cullFace(e),2929:K,2931:(i,e)=>i.clearDepth(e),2932:(i,e)=>i.depthFunc(e),2928:(i,e)=>i.depthRange(...e),2930:(i,e)=>i.depthMask(e),3024:K,35723:_h,35725:(i,e)=>i.useProgram(e),36007:(i,e)=>i.bindRenderbuffer(36161,e),36389:(i,e)=>i.bindTransformFeedback?.(36386,e),34229:(i,e)=>i.bindVertexArray(e),36006:vh,36010:vh,34964:$i,36662:$i,36663:$i,35053:$i,35055:$i,2886:(i,e)=>i.frontFace(e),33170:_h,2849:(i,e)=>i.lineWidth(e),32823:K,32824:"polygonOffset",10752:"polygonOffset",35977:K,32926:K,32928:K,32938:"sampleCoverage",32939:"sampleCoverage",3089:K,3088:(i,e)=>i.scissor(...e),2960:K,2961:(i,e)=>i.clearStencil(e),2968:(i,e)=>i.stencilMaskSeparate(1028,e),36005:(i,e)=>i.stencilMaskSeparate(1029,e),2962:"stencilFuncFront",2967:"stencilFuncFront",2963:"stencilFuncFront",34816:"stencilFuncBack",36003:"stencilFuncBack",36004:"stencilFuncBack",2964:"stencilOpFront",2965:"stencilOpFront",2966:"stencilOpFront",34817:"stencilOpBack",34818:"stencilOpBack",34819:"stencilOpBack",2978:(i,e)=>i.viewport(...e),34383:K,10754:K,12288:K,12289:K,12290:K,12291:K,12292:K,12293:K,12294:K,12295:K,3333:ue,3317:ue,37440:ue,37441:ue,37443:ue,3330:ue,3332:ue,3331:ue,3314:ue,32878:ue,3316:ue,3315:ue,32877:ue,framebuffer:(i,e)=>{const t=e&&"handle"in e?e.handle:e;return i.bindFramebuffer(36160,t)},blend:(i,e)=>e?i.enable(3042):i.disable(3042),blendColor:(i,e)=>i.blendColor(...e),blendEquation:(i,e)=>{const t=typeof e=="number"?[e,e]:e;i.blendEquationSeparate(...t)},blendFunc:(i,e)=>{const t=e?.length===2?[...e,...e]:e;i.blendFuncSeparate(...t)},clearColor:(i,e)=>i.clearColor(...e),clearDepth:(i,e)=>i.clearDepth(e),clearStencil:(i,e)=>i.clearStencil(e),colorMask:(i,e)=>i.colorMask(...e),cull:(i,e)=>e?i.enable(2884):i.disable(2884),cullFace:(i,e)=>i.cullFace(e),depthTest:(i,e)=>e?i.enable(2929):i.disable(2929),depthFunc:(i,e)=>i.depthFunc(e),depthMask:(i,e)=>i.depthMask(e),depthRange:(i,e)=>i.depthRange(...e),dither:(i,e)=>e?i.enable(3024):i.disable(3024),derivativeHint:(i,e)=>{i.hint(35723,e)},frontFace:(i,e)=>i.frontFace(e),mipmapHint:(i,e)=>i.hint(33170,e),lineWidth:(i,e)=>i.lineWidth(e),polygonOffsetFill:(i,e)=>e?i.enable(32823):i.disable(32823),polygonOffset:(i,e)=>i.polygonOffset(...e),sampleCoverage:(i,e)=>i.sampleCoverage(e[0],e[1]||!1),scissorTest:(i,e)=>e?i.enable(3089):i.disable(3089),scissor:(i,e)=>i.scissor(...e),stencilTest:(i,e)=>e?i.enable(2960):i.disable(2960),stencilMask:(i,e)=>{e=Za(e)?e:[e,e];const[t,n]=e;i.stencilMaskSeparate(1028,t),i.stencilMaskSeparate(1029,n)},stencilFunc:(i,e)=>{e=Za(e)&&e.length===3?[...e,...e]:e;const[t,n,s,r,o,a]=e;i.stencilFuncSeparate(1028,t,n,s),i.stencilFuncSeparate(1029,r,o,a)},stencilOp:(i,e)=>{e=Za(e)&&e.length===3?[...e,...e]:e;const[t,n,s,r,o,a]=e;i.stencilOpSeparate(1028,t,n,s),i.stencilOpSeparate(1029,r,o,a)},viewport:(i,e)=>i.viewport(...e)};function q(i,e,t){return e[i]!==void 0?e[i]:t[i]}const T3={blendEquation:(i,e,t)=>i.blendEquationSeparate(q(32777,e,t),q(34877,e,t)),blendFunc:(i,e,t)=>i.blendFuncSeparate(q(32969,e,t),q(32968,e,t),q(32971,e,t),q(32970,e,t)),polygonOffset:(i,e,t)=>i.polygonOffset(q(32824,e,t),q(10752,e,t)),sampleCoverage:(i,e,t)=>i.sampleCoverage(q(32938,e,t),q(32939,e,t)),stencilFuncFront:(i,e,t)=>i.stencilFuncSeparate(1028,q(2962,e,t),q(2967,e,t),q(2963,e,t)),stencilFuncBack:(i,e,t)=>i.stencilFuncSeparate(1029,q(34816,e,t),q(36003,e,t),q(36004,e,t)),stencilOpFront:(i,e,t)=>i.stencilOpSeparate(1028,q(2964,e,t),q(2965,e,t),q(2966,e,t)),stencilOpBack:(i,e,t)=>i.stencilOpSeparate(1029,q(34817,e,t),q(34818,e,t),q(34819,e,t))},xh={enable:(i,e)=>i({[e]:!0}),disable:(i,e)=>i({[e]:!1}),pixelStorei:(i,e,t)=>i({[e]:t}),hint:(i,e,t)=>i({[e]:t}),useProgram:(i,e)=>i({35725:e}),bindRenderbuffer:(i,e,t)=>i({36007:t}),bindTransformFeedback:(i,e,t)=>i({36389:t}),bindVertexArray:(i,e)=>i({34229:e}),bindFramebuffer:(i,e,t)=>{switch(e){case 36160:return i({36006:t,36010:t});case 36009:return i({36006:t});case 36008:return i({36010:t});default:return null}},bindBuffer:(i,e,t)=>{const n={34962:[34964],36662:[36662],36663:[36663],35051:[35053],35052:[35055]}[e];return n?i({[n]:t}):{valueChanged:!0}},blendColor:(i,e,t,n,s)=>i({32773:new Float32Array([e,t,n,s])}),blendEquation:(i,e)=>i({32777:e,34877:e}),blendEquationSeparate:(i,e,t)=>i({32777:e,34877:t}),blendFunc:(i,e,t)=>i({32969:e,32968:t,32971:e,32970:t}),blendFuncSeparate:(i,e,t,n,s)=>i({32969:e,32968:t,32971:n,32970:s}),clearColor:(i,e,t,n,s)=>i({3106:new Float32Array([e,t,n,s])}),clearDepth:(i,e)=>i({2931:e}),clearStencil:(i,e)=>i({2961:e}),colorMask:(i,e,t,n,s)=>i({3107:[e,t,n,s]}),cullFace:(i,e)=>i({2885:e}),depthFunc:(i,e)=>i({2932:e}),depthRange:(i,e,t)=>i({2928:new Float32Array([e,t])}),depthMask:(i,e)=>i({2930:e}),frontFace:(i,e)=>i({2886:e}),lineWidth:(i,e)=>i({2849:e}),polygonOffset:(i,e,t)=>i({32824:e,10752:t}),sampleCoverage:(i,e,t)=>i({32938:e,32939:t}),scissor:(i,e,t,n,s)=>i({3088:new Int32Array([e,t,n,s])}),stencilMask:(i,e)=>i({2968:e,36005:e}),stencilMaskSeparate:(i,e,t)=>i({[e===1028?2968:36005]:t}),stencilFunc:(i,e,t,n)=>i({2962:e,2967:t,2963:n,34816:e,36003:t,36004:n}),stencilFuncSeparate:(i,e,t,n,s)=>i({[e===1028?2962:34816]:t,[e===1028?2967:36003]:n,[e===1028?2963:36004]:s}),stencilOp:(i,e,t,n)=>i({2964:e,2965:t,2966:n,34817:e,34818:t,34819:n}),stencilOpSeparate:(i,e,t,n,s)=>i({[e===1028?2964:34817]:t,[e===1028?2965:34818]:n,[e===1028?2966:34819]:s}),viewport:(i,e,t,n,s)=>i({2978:[e,t,n,s]})},Ue=(i,e)=>i.isEnabled(e),wh={3042:Ue,2884:Ue,2929:Ue,3024:Ue,32823:Ue,32926:Ue,32928:Ue,3089:Ue,2960:Ue,35977:Ue},A3=new Set([34016,36388,36387,35983,35368,34965,35739,35738,3074,34853,34854,34855,34856,34857,34858,34859,34860,34861,34862,34863,34864,34865,34866,34867,34868,35097,32873,35869,32874,34068]);function si(i,e){if(M3(e))return;const t={};for(const s in e){const r=Number(s),o=L3[s];o&&(typeof o=="string"?t[o]=!0:o(i,e[s],r))}const n=i.lumaState?.cache;if(n)for(const s in t){const r=T3[s];r(i,e,n)}}function Ph(i,e=Xa){if(typeof e=="number"){const s=e,r=wh[s];return r?r(i,s):i.getParameter(s)}const t=Array.isArray(e)?e:Object.keys(e),n={};for(const s of t){const r=wh[s];n[s]=r?r(i,Number(s)):i.getParameter(Number(s))}return n}function I3(i){si(i,Xa)}function M3(i){for(const e in i)return!1;return!0}function R3(i,e){if(i===e)return!0;if(Sh(i)&&Sh(e)&&i.length===e.length){for(let t=0;t<i.length;++t)if(i[t]!==e[t])return!1;return!0}return!1}function Sh(i){return Array.isArray(i)||ArrayBuffer.isView(i)}class St{constructor(e,t){h(this,"gl");h(this,"program",null);h(this,"stateStack",[]);h(this,"enable",!0);h(this,"cache",null);h(this,"log");h(this,"initialized",!1);this.gl=e,this.log=t?.log||(()=>{}),this._updateCache=this._updateCache.bind(this),Object.seal(this)}static get(e){return e.lumaState}push(e={}){this.stateStack.push({})}pop(){const e=this.stateStack[this.stateStack.length-1];si(this.gl,e),this.stateStack.pop()}trackState(e,t){if(this.cache=t?.copyState?Ph(e):Object.assign({},Xa),this.initialized)throw new Error("WebGLStateTracker");this.initialized=!0,this.gl.lumaState=this,B3(e);for(const n in xh){const s=xh[n];O3(e,n,s)}Eh(e,"getParameter"),Eh(e,"isEnabled")}_updateCache(e){let t=!1,n;const s=this.stateStack.length>0?this.stateStack[this.stateStack.length-1]:null;for(const r in e){const o=e[r],a=this.cache[r];R3(o,a)||(t=!0,n=a,s&&!(r in s)&&(s[r]=a),this.cache[r]=o)}return{valueChanged:t,oldValue:n}}}function Eh(i,e){const t=i[e].bind(i);i[e]=function(s){if(s===void 0||A3.has(s))return t(s);const r=St.get(i);return s in r.cache||(r.cache[s]=t(s)),r.enable?r.cache[s]:t(s)},Object.defineProperty(i[e],"name",{value:`${e}-from-cache`,configurable:!1})}function O3(i,e,t){if(!i[e])return;const n=i[e].bind(i);i[e]=function(...r){const o=St.get(i),{valueChanged:a,oldValue:c}=t(o._updateCache,...r);return a&&n(...r),c},Object.defineProperty(i[e],"name",{value:`${e}-to-cache`,configurable:!1})}function B3(i){const e=i.useProgram.bind(i);i.useProgram=function(n){const s=St.get(i);s.program!==n&&(e(n),s.program=n)}}function Ka(i){const e=i.luma||{_polyfilled:!1,extensions:{},softwareRenderer:!1};return e._polyfilled??(e._polyfilled=!1),e.extensions||(e.extensions={}),i.luma=e,e}function k3(i,e,t){let n="";const s=c=>{const l=c.statusMessage;l&&(n||(n=l))};i.addEventListener("webglcontextcreationerror",s,!1);const r=t.failIfMajorPerformanceCaveat!==!0,o={preserveDrawingBuffer:!0,...t,failIfMajorPerformanceCaveat:!0};let a=null;try{a||(a=i.getContext("webgl2",o)),!a&&o.failIfMajorPerformanceCaveat&&(n||(n="Only software GPU is available. Set `failIfMajorPerformanceCaveat: false` to allow."));let c=!1;if(!a&&r&&(o.failIfMajorPerformanceCaveat=!1,a=i.getContext("webgl2",o),c=!0),a||(a=i.getContext("webgl",{}),a&&(a=null,n||(n="Your browser only supports WebGL1"))),!a)throw n||(n="Your browser does not support WebGL"),new Error(`Failed to create WebGL context: ${n}`);const l=Ka(a);l.softwareRenderer=c;const{onContextLost:u,onContextRestored:f}=e;return i.addEventListener("webglcontextlost",d=>u(d),!1),i.addEventListener("webglcontextrestored",d=>f(d),!1),a}finally{i.removeEventListener("webglcontextcreationerror",s,!1)}}function Et(i,e,t){return t[e]===void 0&&(t[e]=i.getExtension(e)||null),t[e]}function D3(i,e){const t=i.getParameter(7936),n=i.getParameter(7937);Et(i,"WEBGL_debug_renderer_info",e);const s=e.WEBGL_debug_renderer_info,r=i.getParameter(s?s.UNMASKED_VENDOR_WEBGL:7936),o=i.getParameter(s?s.UNMASKED_RENDERER_WEBGL:7937),a=r||t,c=o||n,l=i.getParameter(7938),u=Ch(a,c),f=F3(a,c),d=N3(a,c);return{type:"webgl",gpu:u,gpuType:d,gpuBackend:f,vendor:a,renderer:c,version:l,shadingLanguage:"glsl",shadingLanguageVersion:300}}function Ch(i,e){return/NVIDIA/i.exec(i)||/NVIDIA/i.exec(e)?"nvidia":/INTEL/i.exec(i)||/INTEL/i.exec(e)?"intel":/Apple/i.exec(i)||/Apple/i.exec(e)?"apple":/AMD/i.exec(i)||/AMD/i.exec(e)||/ATI/i.exec(i)||/ATI/i.exec(e)?"amd":/SwiftShader/i.exec(i)||/SwiftShader/i.exec(e)?"software":"unknown"}function F3(i,e){return/Metal/i.exec(i)||/Metal/i.exec(e)?"metal":/ANGLE/i.exec(i)||/ANGLE/i.exec(e)?"opengl":"unknown"}function N3(i,e){if(/SwiftShader/i.exec(i)||/SwiftShader/i.exec(e))return"cpu";switch(Ch(i,e)){case"apple":return z3(i,e)?"integrated":"unknown";case"intel":return"integrated";case"software":return"cpu";case"unknown":return"unknown";default:return"discrete"}}function z3(i,e){return/Apple (M\d|A\d|GPU)/i.test(`${i} ${e}`)}function Lh(i){switch(i){case"uint8":return 5121;case"sint8":return 5120;case"unorm8":return 5121;case"snorm8":return 5120;case"uint16":return 5123;case"sint16":return 5122;case"unorm16":return 5123;case"snorm16":return 5122;case"uint32":return 5125;case"sint32":return 5124;case"float16":return 5131;case"float32":return 5126}throw new Error(String(i))}const Gi="WEBGL_compressed_texture_s3tc",Vi="WEBGL_compressed_texture_s3tc_srgb",ri="EXT_texture_compression_rgtc",oi="EXT_texture_compression_bptc",U3="WEBGL_compressed_texture_etc",$3="WEBGL_compressed_texture_astc",G3="WEBGL_compressed_texture_etc1",V3="WEBGL_compressed_texture_pvrtc",j3="WEBGL_compressed_texture_atc",W3="EXT_texture_norm16",Th="EXT_render_snorm",Ah="EXT_color_buffer_float",Qa="snorm8-renderable-webgl",Ja="norm16-renderable-webgl",ec="snorm16-renderable-webgl",tc="float16-renderable-webgl",As="float32-renderable-webgl",H3="rgb9e5ufloat-renderable-webgl",ic={"float32-renderable-webgl":{extensions:[Ah]},"float16-renderable-webgl":{extensions:["EXT_color_buffer_half_float"]},"rgb9e5ufloat-renderable-webgl":{extensions:["WEBGL_render_shared_exponent"]},"snorm8-renderable-webgl":{extensions:[Th]},"norm16-webgl":{extensions:[W3]},"norm16-renderable-webgl":{features:["norm16-webgl"]},"snorm16-renderable-webgl":{features:["norm16-webgl"],extensions:[Th]},"float32-filterable":{extensions:["OES_texture_float_linear"]},"float16-filterable-webgl":{extensions:["OES_texture_half_float_linear"]},"texture-filterable-anisotropic-webgl":{extensions:["EXT_texture_filter_anisotropic"]},"texture-blend-float-webgl":{extensions:["EXT_float_blend"]},"texture-compression-bc":{extensions:[Gi,Vi,ri,oi]},"texture-compression-bc5-webgl":{extensions:[ri]},"texture-compression-bc7-webgl":{extensions:[oi]},"texture-compression-etc2":{extensions:[U3]},"texture-compression-astc":{extensions:[$3]},"texture-compression-etc1-webgl":{extensions:[G3]},"texture-compression-pvrtc-webgl":{extensions:[V3]},"texture-compression-atc-webgl":{extensions:[j3]}};function Y3(i){return i in ic}function Ih(i,e,t){return Mh(i,e,t,new Set)}function Mh(i,e,t,n){const s=ic[e];if(!s||n.has(e))return!1;n.add(e);const r=(s.features||[]).every(o=>Mh(i,o,t,n));return n.delete(e),r?(s.extensions||[]).every(o=>!!Et(i,o,t)):!1}const Is={r8unorm:{gl:33321,rb:!0},r8snorm:{gl:36756,r:Qa},r8uint:{gl:33330,rb:!0},r8sint:{gl:33329,rb:!0},rg8unorm:{gl:33323,rb:!0},rg8snorm:{gl:36757,r:Qa},rg8uint:{gl:33336,rb:!0},rg8sint:{gl:33335,rb:!0},r16uint:{gl:33332,rb:!0},r16sint:{gl:33331,rb:!0},r16float:{gl:33325,rb:!0,r:tc},r16unorm:{gl:33322,rb:!0,r:Ja},r16snorm:{gl:36760,r:ec},"rgba4unorm-webgl":{gl:32854,rb:!0},"rgb565unorm-webgl":{gl:36194,rb:!0},"rgb5a1unorm-webgl":{gl:32855,rb:!0},"rgb8unorm-webgl":{gl:32849},"rgb8snorm-webgl":{gl:36758},rgba8unorm:{gl:32856},"rgba8unorm-srgb":{gl:35907},rgba8snorm:{gl:36759,r:Qa},rgba8uint:{gl:36220},rgba8sint:{gl:36238},bgra8unorm:{},"bgra8unorm-srgb":{},rg16uint:{gl:33338},rg16sint:{gl:33337},rg16float:{gl:33327,rb:!0,r:tc},rg16unorm:{gl:33324,r:Ja},rg16snorm:{gl:36761,r:ec},r32uint:{gl:33334,rb:!0},r32sint:{gl:33333,rb:!0},r32float:{gl:33326,r:As},rgb9e5ufloat:{gl:35901,r:H3},rg11b10ufloat:{gl:35898,rb:!0},rgb10a2unorm:{gl:32857,rb:!0},rgb10a2uint:{gl:36975,rb:!0},"rgb16unorm-webgl":{gl:32852,r:!1},"rgb16snorm-webgl":{gl:36762,r:!1},rg32uint:{gl:33340,rb:!0},rg32sint:{gl:33339,rb:!0},rg32float:{gl:33328,rb:!0,r:As},rgba16uint:{gl:36214,rb:!0},rgba16sint:{gl:36232,rb:!0},rgba16float:{gl:34842,r:tc},rgba16unorm:{gl:32859,rb:!0,r:Ja},rgba16snorm:{gl:36763,r:ec},"rgb32float-webgl":{gl:34837,x:Ah,r:As,dataFormat:6407,types:[5126]},rgba32uint:{gl:36208,rb:!0},rgba32sint:{gl:36226,rb:!0},rgba32float:{gl:34836,rb:!0,r:As},stencil8:{gl:36168,rb:!0},depth16unorm:{gl:33189,dataFormat:6402,types:[5123],rb:!0},depth24plus:{gl:33190,dataFormat:6402,types:[5125]},depth32float:{gl:36012,dataFormat:6402,types:[5126],rb:!0},"depth24plus-stencil8":{gl:35056,rb:!0,depthTexture:!0,dataFormat:34041,types:[34042]},"depth32float-stencil8":{gl:36013,dataFormat:34041,types:[36269],rb:!0},"bc1-rgb-unorm-webgl":{gl:33776,x:Gi},"bc1-rgb-unorm-srgb-webgl":{gl:35916,x:Vi},"bc1-rgba-unorm":{gl:33777,x:Gi},"bc1-rgba-unorm-srgb":{gl:35916,x:Vi},"bc2-rgba-unorm":{gl:33778,x:Gi},"bc2-rgba-unorm-srgb":{gl:35918,x:Vi},"bc3-rgba-unorm":{gl:33779,x:Gi},"bc3-rgba-unorm-srgb":{gl:35919,x:Vi},"bc4-r-unorm":{gl:36283,x:ri},"bc4-r-snorm":{gl:36284,x:ri},"bc5-rg-unorm":{gl:36285,x:ri},"bc5-rg-snorm":{gl:36286,x:ri},"bc6h-rgb-ufloat":{gl:36495,x:oi},"bc6h-rgb-float":{gl:36494,x:oi},"bc7-rgba-unorm":{gl:36492,x:oi},"bc7-rgba-unorm-srgb":{gl:36493,x:oi},"etc2-rgb8unorm":{gl:37492},"etc2-rgb8unorm-srgb":{gl:37494},"etc2-rgb8a1unorm":{gl:37496},"etc2-rgb8a1unorm-srgb":{gl:37497},"etc2-rgba8unorm":{gl:37493},"etc2-rgba8unorm-srgb":{gl:37495},"eac-r11unorm":{gl:37488},"eac-r11snorm":{gl:37489},"eac-rg11unorm":{gl:37490},"eac-rg11snorm":{gl:37491},"astc-4x4-unorm":{gl:37808},"astc-4x4-unorm-srgb":{gl:37840},"astc-5x4-unorm":{gl:37809},"astc-5x4-unorm-srgb":{gl:37841},"astc-5x5-unorm":{gl:37810},"astc-5x5-unorm-srgb":{gl:37842},"astc-6x5-unorm":{gl:37811},"astc-6x5-unorm-srgb":{gl:37843},"astc-6x6-unorm":{gl:37812},"astc-6x6-unorm-srgb":{gl:37844},"astc-8x5-unorm":{gl:37813},"astc-8x5-unorm-srgb":{gl:37845},"astc-8x6-unorm":{gl:37814},"astc-8x6-unorm-srgb":{gl:37846},"astc-8x8-unorm":{gl:37815},"astc-8x8-unorm-srgb":{gl:37847},"astc-10x5-unorm":{gl:37816},"astc-10x5-unorm-srgb":{gl:37848},"astc-10x6-unorm":{gl:37817},"astc-10x6-unorm-srgb":{gl:37849},"astc-10x8-unorm":{gl:37818},"astc-10x8-unorm-srgb":{gl:37850},"astc-10x10-unorm":{gl:37819},"astc-10x10-unorm-srgb":{gl:37851},"astc-12x10-unorm":{gl:37820},"astc-12x10-unorm-srgb":{gl:37852},"astc-12x12-unorm":{gl:37821},"astc-12x12-unorm-srgb":{gl:37853},"pvrtc-rgb4unorm-webgl":{gl:35840},"pvrtc-rgba4unorm-webgl":{gl:35842},"pvrtc-rgb2unorm-webgl":{gl:35841},"pvrtc-rgba2unorm-webgl":{gl:35843},"etc1-rbg-unorm-webgl":{gl:36196},"atc-rgb-unorm-webgl":{gl:35986},"atc-rgba-unorm-webgl":{gl:35986},"atc-rgbai-unorm-webgl":{gl:34798}};function q3(i,e,t){let n=e.create;const s=Is[e.format];s?.gl===void 0&&(n=!1),s?.x&&(n=n&&!!Et(i,s.x,t)),e.format==="stencil8"&&(n=!1);const r=s?.r===!1?!1:s?.r===void 0||Ih(i,s.r,t),o=n&&e.render&&r&&X3(i,e.format,t);return{format:e.format,create:n&&e.create,render:o,filter:n&&e.filter,blend:n&&e.blend,store:n&&e.store}}function X3(i,e,t){const n=Is[e],s=n?.gl;if(s===void 0||n?.x&&!Et(i,n.x,t))return!1;const r=i.getParameter(32873),o=i.getParameter(36006),a=i.createTexture(),c=i.createFramebuffer();if(!a||!c)return!1;const l=0;let u=Number(i.getError());for(;u!==l;)u=i.getError();let f=!1;try{if(i.bindTexture(3553,a),i.texStorage2D(3553,1,s,1,1),Number(i.getError())!==l)return!1;i.bindFramebuffer(36160,c),i.framebufferTexture2D(36160,36064,3553,a,0),f=Number(i.checkFramebufferStatus(36160))===36053&&Number(i.getError())===l}finally{i.bindFramebuffer(36160,o),i.deleteFramebuffer(c),i.bindTexture(3553,r),i.deleteTexture(a)}return f}function Rh(i){const e=Is[i],t=Q3(i),n=_e.getInfo(i);return n.compressed&&(e.dataFormat=t),{internalFormat:t,format:e?.dataFormat||K3(n.channels,n.integer,n.normalized,t),type:n.dataType?Lh(n.dataType):e?.types?.[0]||5121,compressed:n.compressed||!1}}function Z3(i){switch(_e.getInfo(i).attachment){case"depth":return 36096;case"stencil":return 36128;case"depth-stencil":return 33306;default:throw new Error(`Not a depth stencil format: ${i}`)}}function K3(i,e,t,n){if(n===6408||n===6407)return n;switch(i){case"r":return e&&!t?36244:6403;case"rg":return e&&!t?33320:33319;case"rgb":return e&&!t?36248:6407;case"rgba":return e&&!t?36249:6408;case"bgra":throw new Error("bgra pixels not supported by WebGL");default:return 6408}}function Q3(i){const t=Is[i]?.gl;if(t===void 0)throw new Error(`Unsupported texture format ${i}`);return t}const Oh={"depth-clip-control":"EXT_depth_clamp","timestamp-query":"EXT_disjoint_timer_query_webgl2","compilation-status-async-webgl":"KHR_parallel_shader_compile","html-in-canvas":i=>pv()&&typeof i.texElementImage2D=="function","polygon-mode-webgl":"WEBGL_polygon_mode","provoking-vertex-webgl":"WEBGL_provoking_vertex","shader-clip-cull-distance-webgl":"WEBGL_clip_cull_distance","shader-noperspective-interpolation-webgl":"NV_shader_noperspective_interpolation","shader-conservative-depth-webgl":"EXT_conservative_depth"};class J3 extends gv{constructor(t,n,s){super([],s);h(this,"gl");h(this,"extensions");h(this,"testedFeatures",new Set);this.gl=t,this.extensions=n,Et(t,"EXT_color_buffer_float",n)}*[Symbol.iterator](){const t=this.getFeatures();for(const n of t)this.has(n)&&(yield n);return[]}has(t){return this.disabledFeatures?.[t]?!1:(this.testedFeatures.has(t)||(this.testedFeatures.add(t),Y3(t)&&Ih(this.gl,t,this.extensions)&&this.features.add(t),this.getWebGLFeature(t)&&this.features.add(t)),this.features.has(t))}initializeFeatures(){const t=this.getFeatures().filter(n=>n!=="polygon-mode-webgl");for(const n of t)this.has(n)}getFeatures(){return[...Object.keys(Oh),...Object.keys(ic)]}getWebGLFeature(t){const n=Oh[t];return typeof n=="string"?!!Et(this.gl,n,this.extensions):typeof n=="function"?n(this.gl):!!n}}class eC extends lv{constructor(t){super();h(this,"gl");h(this,"limits",{});this.gl=t}get maxTextureDimension1D(){return 0}get maxTextureDimension2D(){return this.getParameter(3379)}get maxTextureDimension3D(){return this.getParameter(32883)}get maxTextureArrayLayers(){return this.getParameter(35071)}get maxBindGroups(){return 0}get maxBindGroupsPlusVertexBuffers(){return 0}get maxBindingsPerBindGroup(){return 0}get maxDynamicUniformBuffersPerPipelineLayout(){return 0}get maxDynamicStorageBuffersPerPipelineLayout(){return 0}get maxSampledTexturesPerShaderStage(){return this.getParameter(35660)}get maxSamplersPerShaderStage(){return this.getParameter(35661)}get maxStorageBuffersPerShaderStage(){return 0}get maxStorageBuffersInVertexStage(){return 0}get maxStorageBuffersInFragmentStage(){return 0}get maxStorageTexturesPerShaderStage(){return 0}get maxStorageTexturesInVertexStage(){return 0}get maxStorageTexturesInFragmentStage(){return 0}get maxUniformBuffersPerShaderStage(){return this.getParameter(35375)}get maxUniformBufferBindingSize(){return this.getParameter(35376)}get maxStorageBufferBindingSize(){return 0}get maxBufferSize(){return Number.MAX_SAFE_INTEGER}get minUniformBufferOffsetAlignment(){return this.getParameter(35380)}get minStorageBufferOffsetAlignment(){return 0}get maxVertexBuffers(){return 16}get maxVertexAttributes(){return this.getParameter(34921)}get maxVertexBufferArrayStride(){return 2048}get maxInterStageShaderVariables(){return this.getParameter(35659)}get maxColorAttachments(){return this.getParameter(36063)}get maxColorAttachmentBytesPerSample(){return 0}get maxComputeWorkgroupStorageSize(){return 0}get maxComputeInvocationsPerWorkgroup(){return 0}get maxComputeWorkgroupSizeX(){return 0}get maxComputeWorkgroupSizeY(){return 0}get maxComputeWorkgroupSizeZ(){return 0}get maxComputeWorkgroupsPerDimension(){return 0}getParameter(t){return this.limits[t]===void 0&&(this.limits[t]=this.gl.getParameter(t)),this.limits[t]||0}}class ji extends Hn{constructor(t,n){super(t,n);h(this,"device");h(this,"gl");h(this,"handle");h(this,"colorAttachments",[]);h(this,"depthStencilAttachment",null);const s=n.handle,r=s===null;this.device=t,this.gl=t.gl,this.handle=s||r?s:this.gl.createFramebuffer(),r||(t._setWebGLDebugMetadata(this.handle,this,{spector:this.props}),n.handle||(this.autoCreateAttachmentTextures(),this.updateAttachments()))}destroy(){super.destroy(),!this.destroyed&&this.handle!==null&&!this.props.handle&&this.gl.deleteFramebuffer(this.handle)}updateAttachments(){const t=this.gl.bindFramebuffer(36160,this.handle);for(let n=0;n<this.colorAttachments.length;++n){const s=this.colorAttachments[n];if(s){const r=36064+n;this._attachTextureView(r,s)}}if(this.depthStencilAttachment){const n=Z3(this.depthStencilAttachment.props.format);this._attachTextureView(n,this.depthStencilAttachment)}if(this.device.props.debug){const n=this.gl.checkFramebufferStatus(36160);if(n!==36053)throw new Error(`Framebuffer ${iC(n)}`)}this.gl.bindFramebuffer(36160,t)}_attachTextureView(t,n){const{gl:s}=this.device,{texture:r}=n,o=n.props.baseMipLevel,a=n.props.baseArrayLayer;switch(s.bindTexture(r.glTarget,r.handle),r.glTarget){case 35866:case 32879:s.framebufferTextureLayer(36160,t,r.handle,o,a);break;case 34067:const c=tC(a);s.framebufferTexture2D(36160,t,c,r.handle,o);break;case 3553:s.framebufferTexture2D(36160,t,3553,r.handle,o);break;default:throw new Error("Illegal texture type")}s.bindTexture(r.glTarget,null)}resizeAttachments(t,n){if(this.handle===null){this.width=t,this.height=n;return}super.resizeAttachments(t,n)}}function tC(i){return i<34069?i+34069:i}function iC(i){switch(i){case 36053:return"success";case 36054:return"Mismatched attachments";case 36055:return"No attachments";case 36057:return"Height/width mismatch";case 36061:return"Unsupported or split attachments";case 36182:return"Samples mismatch";default:return`${i}`}}class nC extends Yu{constructor(t,n){super(n);h(this,"device");h(this,"handle",null);h(this,"_framebuffer",null);this.device=t,this._setAutoCreatedCanvasId(`${this.device.id}-canvas`),this._configureDevice()}get[Symbol.toStringTag](){return"WebGLCanvasContext"}_configureDevice(){(this.drawingBufferWidth!==this._framebuffer?.width||this.drawingBufferHeight!==this._framebuffer?.height)&&this._framebuffer?.resize([this.drawingBufferWidth,this.drawingBufferHeight])}_getCurrentFramebuffer(){return this._framebuffer||(this._framebuffer=new ji(this.device,{id:"canvas-context-framebuffer",handle:null,width:this.drawingBufferWidth,height:this.drawingBufferHeight})),this._framebuffer}}class sC extends wv{constructor(t,n={}){super(n);h(this,"device");h(this,"handle",null);h(this,"context2d");this.device=t;const s=`${this[Symbol.toStringTag]}(${this.id})`;if(!this.device.getDefaultCanvasContext().offscreenCanvas)throw new Error(`${s}: WebGL PresentationContext requires the default CanvasContext canvas to be an OffscreenCanvas`);const o=this.canvas.getContext("2d");if(!o)throw new Error(`${s}: Failed to create 2d presentation context`);this.context2d=o,this._setAutoCreatedCanvasId(`${this.device.id}-presentation-canvas`),this._configureDevice(),this._startObservers()}get[Symbol.toStringTag](){return"WebGLPresentationContext"}present(){this._resizeDrawingBufferIfNeeded(),this.device.submit();const t=this.device.getDefaultCanvasContext(),[n,s]=t.getDrawingBufferSize();if(!(this.drawingBufferWidth===0||this.drawingBufferHeight===0||n===0||s===0||t.canvas.width===0||t.canvas.height===0)){if(n!==this.drawingBufferWidth||s!==this.drawingBufferHeight||t.canvas.width!==this.drawingBufferWidth||t.canvas.height!==this.drawingBufferHeight)throw new Error(`${this[Symbol.toStringTag]}(${this.id}): Default canvas context size ${n}x${s} does not match presentation size ${this.drawingBufferWidth}x${this.drawingBufferHeight}`);this.context2d.clearRect(0,0,this.drawingBufferWidth,this.drawingBufferHeight),this.context2d.drawImage(t.canvas,0,0)}}_configureDevice(){}_getCurrentFramebuffer(t){const n=this.device.getDefaultCanvasContext();return n.setDrawingBufferSize(this.drawingBufferWidth,this.drawingBufferHeight),n.getCurrentFramebuffer(t)}}const nc={};function rC(i="id"){nc[i]=nc[i]||1;const e=nc[i]++;return`${i}-${e}`}class Wi extends F{constructor(t,n={}){super(t,n);h(this,"device");h(this,"gl");h(this,"handle");h(this,"glTarget");h(this,"glUsage");h(this,"glIndexType",5123);h(this,"byteLength",0);h(this,"bytesUsed",0);this.device=t,this.gl=this.device.gl;const s=typeof n=="object"?n.handle:void 0;this.handle=s||this.gl.createBuffer(),t._setWebGLDebugMetadata(this.handle,this,{spector:{...this.props,data:typeof this.props.data}}),this.glTarget=oC(this.props.usage),this.glUsage=aC(this.props.usage),this.glIndexType=this.props.indexType==="uint32"?5125:5123,n.data?this._initWithData(n.data,n.byteOffset,n.byteLength):this._initWithByteLength(n.byteLength||0)}destroy(){!this.destroyed&&this.handle&&(this.removeStats(),this.props.handle?this.trackDeallocatedReferencedMemory("Buffer"):(this.trackDeallocatedMemory(),this.gl.deleteBuffer(this.handle)),this.destroyed=!0,this.handle=null)}_initWithData(t,n=0,s=t.byteLength+n){const r=this.glTarget;this.gl.bindBuffer(r,this.handle),this.gl.bufferData(r,s,this.glUsage),this.gl.bufferSubData(r,n,t),this.gl.bindBuffer(r,null),this.bytesUsed=s,this.byteLength=s,this._setDebugData(t,n,s),this.props.handle?this.trackReferencedMemory(s,"Buffer"):this.trackAllocatedMemory(s)}_initWithByteLength(t){let n=t;t===0&&(n=new Float32Array(0));const s=this.glTarget;return this.gl.bindBuffer(s,this.handle),this.gl.bufferData(s,n,this.glUsage),this.gl.bindBuffer(s,null),this.bytesUsed=t,this.byteLength=t,this._setDebugData(null,0,t),this.props.handle?this.trackReferencedMemory(t,"Buffer"):this.trackAllocatedMemory(t),this}write(t,n=0){const s=ArrayBuffer.isView(t)?t:new Uint8Array(t),r=36663;this.gl.bindBuffer(r,this.handle),this.gl.bufferSubData(r,n,s),this.gl.bindBuffer(r,null),this._setDebugData(t,n,t.byteLength)}async mapAndWriteAsync(t,n=0,s=this.byteLength-n){const r=new ArrayBuffer(s);await t(r,"copied"),this.write(r,n)}async readAsync(t=0,n){return this.readSyncWebGL(t,n)}async mapAndReadAsync(t,n=0,s){const r=await this.readAsync(n,s);return await t(r.buffer,"copied")}readSyncWebGL(t=0,n){n=n??this.byteLength-t;const s=new Uint8Array(n),r=0;return this.gl.bindBuffer(36662,this.handle),this.gl.getBufferSubData(36662,t,s,r,n),this.gl.bindBuffer(36662,null),this._setDebugData(s,t,n),s}}function oC(i){return i&F.INDEX?34963:i&F.VERTEX?34962:i&F.UNIFORM?35345:34962}function aC(i){return i&F.INDEX||i&F.VERTEX?35044:i&F.UNIFORM?35048:35044}function cC(i){const e=i.split(/\r?\n/),t=[];for(const n of e){if(n.length<=1)continue;const s=n.trim(),r=n.split(":"),o=r[0]?.trim();if(r.length===2){const[g,p]=r;if(!g||!p){t.push({message:s,type:Ms(o||"info"),lineNum:0,linePos:0});continue}t.push({message:p.trim(),type:Ms(g),lineNum:0,linePos:0});continue}const[a,c,l,...u]=r;if(!a||!c||!l){t.push({message:r.slice(1).join(":").trim()||s,type:Ms(o||"info"),lineNum:0,linePos:0});continue}let f=parseInt(l,10);Number.isNaN(f)&&(f=0);let d=parseInt(c,10);Number.isNaN(d)&&(d=0),t.push({message:u.join(":").trim(),type:Ms(a),lineNum:f,linePos:d})}return t}function Ms(i){const e=["warning","error","info"],t=i.toLowerCase();return e.includes(t)?t:"info"}class lC extends Wn{constructor(t,n){super(t,n);h(this,"device");h(this,"handle");h(this,"_compilationInfoLog","");this.device=t;const s=this.props.handle;switch(this.props.stage){case"vertex":this.handle=s||this.device.gl.createShader(35633);break;case"fragment":this.handle=s||this.device.gl.createShader(35632);break;default:throw new Error(this.props.stage)}t._setWebGLDebugMetadata(this.handle,this,{spector:this.props});const r=this._compile(this.source);r&&typeof r.catch=="function"&&r.catch(()=>{this.compilationStatus="error"})}destroy(){this.handle&&(this.removeStats(),this.device.gl.deleteShader(this.handle),this.destroyed=!0,this.handle.destroyed=!0)}get asyncCompilationStatus(){return this._waitForCompilationComplete().then(()=>(this._getCompilationStatus(),this.compilationStatus))}async getCompilationInfo(){return await this._waitForCompilationComplete(),this.getCompilationInfoSync()}getCompilationInfoSync(){const t=this._getCompilationInfoLog();return t?cC(t):[]}getTranslatedSource(){return this.device.getExtension("WEBGL_debug_shaders").WEBGL_debug_shaders?.getTranslatedShaderSource(this.handle)||null}_compile(t){t=t.startsWith("#version ")?t:`#version 300 es
${t}`;const{gl:n}=this.device;if(n.shaderSource(this.handle,t),n.compileShader(this.handle),!this.device.props.debug){this.compilationStatus="pending";return}if(!this.device.features.has("compilation-status-async-webgl")){if(this._getCompilationStatus(),this.debugShader(),this.compilationStatus==="error")throw new Error(this._getCompilationErrorMessage(t));return}return S.once(1,"Shader compilation is asynchronous")(),this._waitForCompilationComplete().then(()=>{S.info(2,`Shader ${this.id} - async compilation complete: ${this.compilationStatus}`)(),this._getCompilationStatus(),this.debugShader()})}async _waitForCompilationComplete(){const t=async r=>await new Promise(o=>setTimeout(o,r));if(!this.device.features.has("compilation-status-async-webgl")){await t(10);return}const{gl:s}=this.device;for(;;){if(s.getShaderParameter(this.handle,37297))return;await t(10)}}_getCompilationStatus(){this.compilationStatus=this.device.gl.getShaderParameter(this.handle,35713)?"success":"error",this.compilationStatus==="error"&&this._getCompilationInfoLog()}_getCompilationErrorMessage(t){const n=`${this.props.stage} shader ${this.props.id}`,s=uC(this._getCompilationInfoLog()),r=this.getCompilationInfoSync(),o=r.find(f=>f.type==="error"&&f.message.trim())||r.find(f=>f.message.trim())||r.find(f=>f.type==="error")||r[0];if(!o)return s?`GLSL compilation errors in ${n}: ${s}`:`GLSL compilation errors in ${n}: WebGL did not provide a shader compiler log`;const a=o.lineNum?t.split(/\r?\n/)[o.lineNum-1]?.trim():void 0,c=o.lineNum?` line ${o.lineNum}`:"",l=a?`
Source: ${a}`:"",u=o.message.trim()||s||"WebGL did not provide a shader compiler log";return`GLSL compilation errors in ${n}:${c}: ${u}${l}`}_getCompilationInfoLog(){const t=this.device.gl.getShaderInfoLog(this.handle)?.trim();return t&&(this._compilationInfoLog=t),this._compilationInfoLog}}function uC(i){return i.split(/\r?\n/).find(e=>e.trim())?.trim()}function fC(i,e,t,n){if(pC(e))return n(i);const s=i;s.pushState();try{return dC(i,e),si(s.gl,t),n(i)}finally{s.popState()}}function dC(i,e){const t=i,{gl:n}=t;if(e.cullMode)switch(e.cullMode){case"none":n.disable(2884);break;case"front":n.enable(2884),n.cullFace(1028);break;case"back":n.enable(2884),n.cullFace(1029);break}if(e.frontFace&&n.frontFace(Ct("frontFace",e.frontFace,{ccw:2305,cw:2304})),e.unclippedDepth&&i.features.has("depth-clip-control")&&n.enable(34383),e.depthBias!==void 0&&(n.enable(32823),n.polygonOffset(e.depthBias,e.depthBiasSlopeScale||0)),e.provokingVertex&&i.features.has("provoking-vertex-webgl")){const r=t.getExtension("WEBGL_provoking_vertex").WEBGL_provoking_vertex,o=Ct("provokingVertex",e.provokingVertex,{first:36429,last:36430});r?.provokingVertexWEBGL(o)}if((e.polygonMode||e.polygonOffsetLine)&&i.features.has("polygon-mode-webgl")){if(e.polygonMode){const r=t.getExtension("WEBGL_polygon_mode").WEBGL_polygon_mode,o=Ct("polygonMode",e.polygonMode,{fill:6914,line:6913});r?.polygonModeWEBGL(1028,o),r?.polygonModeWEBGL(1029,o)}e.polygonOffsetLine&&n.enable(10754)}if(i.features.has("shader-clip-cull-distance-webgl")&&(e.clipDistance0&&n.enable(12288),e.clipDistance1&&n.enable(12289),e.clipDistance2&&n.enable(12290),e.clipDistance3&&n.enable(12291),e.clipDistance4&&n.enable(12292),e.clipDistance5&&n.enable(12293),e.clipDistance6&&n.enable(12294),e.clipDistance7&&n.enable(12295)),e.depthWriteEnabled!==void 0&&n.depthMask(gC("depthWriteEnabled",e.depthWriteEnabled)),e.depthCompare&&(e.depthCompare!=="always"?n.enable(2929):n.disable(2929),n.depthFunc(sc("depthCompare",e.depthCompare))),e.clearDepth!==void 0&&n.clearDepth(e.clearDepth),e.stencilWriteMask){const s=e.stencilWriteMask;n.stencilMaskSeparate(1028,s),n.stencilMaskSeparate(1029,s)}if(e.stencilReadMask&&S.warn("stencilReadMask not supported under WebGL"),e.stencilCompare){const s=e.stencilReadMask||4294967295,r=sc("depthCompare",e.stencilCompare);e.stencilCompare!=="always"?n.enable(2960):n.disable(2960),n.stencilFuncSeparate(1028,r,0,s),n.stencilFuncSeparate(1029,r,0,s)}if(e.stencilPassOperation&&e.stencilFailOperation&&e.stencilDepthFailOperation){const s=rc("stencilPassOperation",e.stencilPassOperation),r=rc("stencilFailOperation",e.stencilFailOperation),o=rc("stencilDepthFailOperation",e.stencilDepthFailOperation);n.stencilOpSeparate(1028,r,o,s),n.stencilOpSeparate(1029,r,o,s)}switch(e.blend){case!0:n.enable(3042);break;case!1:n.disable(3042);break}if(e.blendColorOperation||e.blendAlphaOperation){const s=Bh("blendColorOperation",e.blendColorOperation||"add"),r=Bh("blendAlphaOperation",e.blendAlphaOperation||"add");n.blendEquationSeparate(s,r);const o=Rs("blendColorSrcFactor",e.blendColorSrcFactor||"one"),a=Rs("blendColorDstFactor",e.blendColorDstFactor||"zero"),c=Rs("blendAlphaSrcFactor",e.blendAlphaSrcFactor||"one"),l=Rs("blendAlphaDstFactor",e.blendAlphaDstFactor||"zero");n.blendFuncSeparate(o,a,c,l)}}function sc(i,e){return Ct(i,e,{never:512,less:513,equal:514,"less-equal":515,greater:516,"not-equal":517,"greater-equal":518,always:519})}function rc(i,e){return Ct(i,e,{keep:7680,zero:0,replace:7681,invert:5386,"increment-clamp":7682,"decrement-clamp":7683,"increment-wrap":34055,"decrement-wrap":34056})}function Bh(i,e){return Ct(i,e,{add:32774,subtract:32778,"reverse-subtract":32779,min:32775,max:32776})}function Rs(i,e,t="color"){return Ct(i,e,{one:1,zero:0,src:768,"one-minus-src":769,dst:774,"one-minus-dst":775,"src-alpha":770,"one-minus-src-alpha":771,"dst-alpha":772,"one-minus-dst-alpha":773,"src-alpha-saturated":776,constant:t==="color"?32769:32771,"one-minus-constant":t==="color"?32770:32772,src1:768,"one-minus-src1":769,"src1-alpha":770,"one-minus-src1-alpha":771})}function hC(i,e){return`Illegal parameter ${e} for ${i}`}function Ct(i,e,t){if(!(e in t))throw new Error(hC(i,e));return t[e]}function gC(i,e){return e}function pC(i){let e=!0;for(const t in i){e=!1;break}return e}function kh(i){const e={};return i.addressModeU&&(e[10242]=oc(i.addressModeU)),i.addressModeV&&(e[10243]=oc(i.addressModeV)),i.addressModeW&&(e[32882]=oc(i.addressModeW)),i.magFilter&&(e[10240]=ac(i.magFilter)),(i.minFilter||i.mipmapFilter)&&(e[10241]=mC(i.minFilter||"linear",i.mipmapFilter)),i.lodMinClamp!==void 0&&(e[33082]=i.lodMinClamp),i.lodMaxClamp!==void 0&&(e[33083]=i.lodMaxClamp),i.type==="comparison-sampler"&&(e[34892]=34894),i.compare&&(e[34893]=sc("compare",i.compare)),i.maxAnisotropy&&(e[34046]=i.maxAnisotropy),e}function oc(i){switch(i){case"clamp-to-edge":return 33071;case"repeat":return 10497;case"mirror-repeat":return 33648}}function ac(i){switch(i){case"nearest":return 9728;case"linear":return 9729}}function mC(i,e="none"){if(!e)return ac(i);switch(e){case"none":return ac(i);case"nearest":switch(i){case"nearest":return 9984;case"linear":return 9985}break;case"linear":switch(i){case"nearest":return 9986;case"linear":return 9987}}}class yC extends Vn{constructor(t,n){super(t,n);h(this,"device");h(this,"handle");h(this,"parameters");this.device=t,this.parameters=kh(n),this.handle=n.handle||this.device.gl.createSampler(),this._setSamplerParameters(this.parameters)}destroy(){this.handle&&(this.device.gl.deleteSampler(this.handle),this.handle=void 0)}toString(){return`Sampler(${this.id},${JSON.stringify(this.props)})`}_setSamplerParameters(t){for(const[n,s]of Object.entries(t)){const r=Number(n);switch(r){case 33082:case 33083:this.device.gl.samplerParameterf(this.handle,r,s);break;default:this.device.gl.samplerParameteri(this.handle,r,s);break}}}}function st(i,e,t){if(bC(e))return t(i);const{nocatch:n=!0}=e,s=St.get(i);s.push(),si(i,e);let r;if(n)r=t(i),s.pop();else try{r=t(i)}finally{s.pop()}return r}function bC(i){for(const e in i)return!1;return!0}class ai extends jn{constructor(t,n){super(t,{...H.defaultProps,...n});h(this,"device");h(this,"gl");h(this,"handle");h(this,"texture");this.device=t,this.gl=this.device.gl,this.handle=null,this.texture=n.texture}}function Dh(i){return _C[i]}const _C={5124:"sint32",5125:"uint32",5122:"sint16",5123:"uint16",5120:"sint8",5121:"uint8",5126:"float32",5131:"float16",33635:"uint16",32819:"uint16",32820:"uint16",33640:"uint32",35899:"uint32",35902:"uint32",34042:"uint32",36269:"uint32"};class Hi extends H{constructor(t,n){super(t,n,{byteAlignment:1});h(this,"device");h(this,"gl");h(this,"handle");h(this,"sampler");h(this,"view");h(this,"glTarget");h(this,"glFormat");h(this,"glType");h(this,"glInternalFormat");h(this,"compressed");h(this,"_textureUnit",0);h(this,"_framebuffer",null);h(this,"_framebufferAttachmentKey",null);this.device=t,this.gl=this.device.gl;const s=Rh(this.props.format);if(this.glTarget=wC(this.props.dimension),this.glInternalFormat=s.internalFormat,this.glFormat=s.format,this.glType=s.type,this.compressed=s.compressed,this.isHandleBorrowed&&this.props.handle===void 0)throw new Error("Borrowed WebGL textures require a texture handle");if(this.handle=this.props.handle||this.gl.createTexture(),this.device._setWebGLDebugMetadata(this.handle,this,{spector:this.props}),!this.isHandleBorrowed){this.gl.bindTexture(this.glTarget,this.handle);const{dimension:r,width:o,height:a,depth:c,mipLevels:l,glTarget:u,glInternalFormat:f}=this;if(!this.compressed)switch(r){case"2d":case"cube":this.gl.texStorage2D(u,l,f,o,a);break;case"2d-array":case"3d":this.gl.texStorage3D(u,l,f,o,a,c);break;default:throw new Error(r)}this.gl.bindTexture(this.glTarget,null),this._initializeData(n.data)}this.ownsHandle?this.trackAllocatedMemory(this.getAllocatedByteLength(),"Texture"):this.trackReferencedMemory(this.getAllocatedByteLength(),"Texture"),this.isHandleBorrowed||this.setSampler(this.props.sampler),this.view=new ai(this.device,{...this.props,texture:this}),Object.seal(this)}destroy(){this.handle&&(this._framebuffer?.destroy(),this._framebuffer=null,this._framebufferAttachmentKey=null,this.removeStats(),this.ownsHandle?(this.gl.deleteTexture(this.handle),this.trackDeallocatedMemory("Texture")):this.trackDeallocatedReferencedMemory("Texture"),this.destroyed=!0)}createView(t){return new ai(this.device,{...t,texture:this})}clone(t){if(this.isHandleBorrowed&&t&&(t.width!==this.width||t.height!==this.height))throw new Error(`Cannot resize borrowed read-only ${this}`);return super.clone(t)}setSampler(t={}){this._assertWritable("set sampler parameters on"),super.setSampler(t);const n=kh(this.sampler.props);this._setSamplerParameters(n)}copyExternalImage(t){this._assertWritable("copy external image data into");const n=this._normalizeCopyExternalImageOptions(t);if(n.sourceX||n.sourceY)throw new Error("WebGL does not support sourceX/sourceY)");const{glFormat:s,glType:r}=this,{image:o,depth:a,mipLevel:c,x:l,y:u,z:f,width:d,height:g}=n,p=Yi(this.glTarget,this.dimension,f),m=n.flipY?{37440:!0}:{};return this.gl.bindTexture(this.glTarget,this.handle),st(this.gl,m,()=>{switch(this.dimension){case"2d":case"cube":this.gl.texSubImage2D(p,c,l,u,d,g,s,r,o);break;case"2d-array":case"3d":this.gl.texSubImage3D(p,c,l,u,f,d,g,a,s,r,o);break;default:}}),this.gl.bindTexture(this.glTarget,null),{width:n.width,height:n.height}}copyElementImage(t){this._assertWritable("copy element image data into");const n=this._normalizeCopyElementImageOptions(t),{glFormat:s}=this,{element:r,depth:o,mipLevel:a,sourceX:c,sourceY:l,sourceWidth:u,sourceHeight:f,x:d,y:g,z:p,width:m,height:y}=n,_=Yi(this.glTarget,this.dimension,p),v=n.flipY?{37440:!0}:{},b=this.gl;if(o!==1||this.dimension!=="2d"&&this.dimension!=="cube")throw new Error(`${this} copyElementImage only supports 2d and cube textures on WebGL`);if(a!==0||d!==0||g!==0)throw new Error(`${this} copyElementImage only supports full base-level uploads on WebGL`);if(typeof b.texElementImage2D!="function")throw new Error(`${this} copyElementImage is not supported by this WebGL implementation`);return this.gl.bindTexture(this.glTarget,this.handle),st(this.gl,v,()=>{b.texElementImage2D?.(_,s,r,{sx:c,sy:l,swidth:u??m,sheight:f??y,width:m,height:y})}),this.gl.bindTexture(this.glTarget,null),{width:n.width,height:n.height}}copyImageData(t){super.copyImageData(t)}readBuffer(t={},n){if(!n)throw new Error(`${this} readBuffer requires a destination buffer`);const s=this._getSupportedColorReadOptions(t),r=t.byteOffset??0,o=this.computeMemoryLayout(s);if(n.byteLength<r+o.byteLength)throw new Error(`${this} readBuffer target is too small (${n.byteLength} < ${r+o.byteLength})`);const a=n;this.gl.bindBuffer(35051,a.handle);try{this._readColorTextureLayers(s,o,c=>{this.gl.readPixels(s.x,s.y,s.width,s.height,this.glFormat,this.glType,r+c)})}finally{this.gl.bindBuffer(35051,null)}return n}async readDataAsync(t={}){throw new Error(`${this} readDataAsync is deprecated; use readBuffer() with an explicit destination buffer or DynamicTexture.readAsync()`)}writeBuffer(t,n={}){this._assertWritable("write buffer data into");const s=this._normalizeTextureWriteOptions(n),{width:r,height:o,depthOrArrayLayers:a,mipLevel:c,byteOffset:l,x:u,y:f,z:d}=s,{glFormat:g,glType:p,compressed:m}=this,y=Yi(this.glTarget,this.dimension,d);if(m)throw new Error("writeBuffer for compressed textures is not implemented in WebGL");const{bytesPerPixel:_}=this.device.getTextureFormatInfo(this.format),v=_?s.bytesPerRow/_:void 0,b={3317:this.byteAlignment,...v!==void 0?{3314:v}:{},32878:s.rowsPerImage};this.gl.bindTexture(this.glTarget,this.handle),this.gl.bindBuffer(35052,t.handle),st(this.gl,b,()=>{switch(this.dimension){case"2d":case"cube":this.gl.texSubImage2D(y,c,u,f,r,o,g,p,l);break;case"2d-array":case"3d":this.gl.texSubImage3D(y,c,u,f,d,r,o,a,g,p,l);break;default:}}),this.gl.bindBuffer(35052,null),this.gl.bindTexture(this.glTarget,null)}writeData(t,n={}){this._assertWritable("write data into");const s=this._normalizeTextureWriteOptions(n),r=ArrayBuffer.isView(t)?t:new Uint8Array(t),{width:o,height:a,depthOrArrayLayers:c,mipLevel:l,x:u,y:f,z:d,byteOffset:g}=s,{glFormat:p,glType:m,compressed:y}=this,_=Yi(this.glTarget,this.dimension,d);let v;if(!y){const{bytesPerPixel:E}=this.device.getTextureFormatInfo(this.format);E&&(v=s.bytesPerRow/E)}const b=this.compressed?{}:{3317:this.byteAlignment,...v!==void 0?{3314:v}:{},32878:s.rowsPerImage},x=xC(r,g),w=y?vC(r,g):r,P=this._getMipLevelSize(l),L=u===0&&f===0&&d===0&&o===P.width&&a===P.height&&c===P.depthOrArrayLayers;this.gl.bindTexture(this.glTarget,this.handle),this.gl.bindBuffer(35052,null),st(this.gl,b,()=>{switch(this.dimension){case"2d":case"cube":y?L?this.gl.compressedTexImage2D(_,l,p,o,a,0,w):this.gl.compressedTexSubImage2D(_,l,u,f,o,a,p,w):this.gl.texSubImage2D(_,l,u,f,o,a,p,m,r,x);break;case"2d-array":case"3d":y?L?this.gl.compressedTexImage3D(_,l,p,o,a,c,0,w):this.gl.compressedTexSubImage3D(_,l,u,f,d,o,a,c,p,w):this.gl.texSubImage3D(_,l,u,f,d,o,a,c,p,m,r,x);break;default:}}),this.gl.bindTexture(this.glTarget,null)}_getRowByteAlignment(t,n){return 1}_getFramebuffer(){return this._framebuffer||(this._framebuffer=this.device.createFramebuffer({id:`framebuffer-for-${this.id}`,width:this.width,height:this.height,colorAttachments:[this]})),this._framebuffer}readDataSyncWebGL(t={}){const n=this._getSupportedColorReadOptions(t),s=this.computeMemoryLayout(n),r=Dh(this.glType),o=uo(r),a=new o(s.byteLength/o.BYTES_PER_ELEMENT);return this._readColorTextureLayers(n,s,c=>{const l=new o(a.buffer,a.byteOffset+c,s.bytesPerImage/o.BYTES_PER_ELEMENT);this.gl.readPixels(n.x,n.y,n.width,n.height,this.glFormat,this.glType,l)}),a.buffer}_readColorTextureLayers(t,n,s){const r=this._getFramebuffer(),o=n.bytesPerRow/n.bytesPerPixel,a={3333:this.byteAlignment,...o!==t.width?{3330:o}:{}},c=this.gl.getParameter(3074),l=this.gl.bindFramebuffer(36160,r.handle);try{this.gl.readBuffer(36064),st(this.gl,a,()=>{for(let u=0;u<t.depthOrArrayLayers;u++)this._attachReadSubresource(r,t.mipLevel,t.z+u),s(u*n.bytesPerImage)})}finally{this.gl.bindFramebuffer(36160,l||null),this.gl.readBuffer(c)}}_attachReadSubresource(t,n,s){const r=`${n}:${s}`;if(this._framebufferAttachmentKey!==r){switch(this.dimension){case"2d":this.gl.framebufferTexture2D(36160,36064,3553,this.handle,n);break;case"cube":this.gl.framebufferTexture2D(36160,36064,Yi(this.glTarget,this.dimension,s),this.handle,n);break;case"2d-array":case"3d":this.gl.framebufferTextureLayer(36160,36064,this.handle,n,s);break;default:throw new Error(`${this} color readback does not support ${this.dimension} textures`)}if(this.device.props.debug){const o=Number(this.gl.checkFramebufferStatus(36160));if(o!==36053)throw new Error(`${t} incomplete for ${this} readback (${o})`)}this._framebufferAttachmentKey=r}}generateMipmapsWebGL(t){if(this._assertWritable("generate mipmaps for"),!(!(this.device.isTextureFormatRenderable(this.props.format)&&this.device.isTextureFormatFilterable(this.props.format))&&(S.warn(`${this} is not renderable or filterable, may not be able to generate mipmaps`)(),!t?.force)))try{this.gl.bindTexture(this.glTarget,this.handle),this.gl.generateMipmap(this.glTarget)}catch(s){S.warn(`Error generating mipmap for ${this}: ${s.message}`)()}finally{this.gl.bindTexture(this.glTarget,null)}}_setSamplerParameters(t){S.log(2,`${this.id} sampler parameters`,this.device.getGLKeys(t))(),this.gl.bindTexture(this.glTarget,this.handle);for(const[n,s]of Object.entries(t)){const r=Number(n),o=s;switch(r){case 33082:case 33083:this.gl.texParameterf(this.glTarget,r,o);break;case 10240:case 10241:this.gl.texParameteri(this.glTarget,r,o);break;case 10242:case 10243:case 32882:this.gl.texParameteri(this.glTarget,r,o);break;case 34046:this.device.features.has("texture-filterable-anisotropic-webgl")&&this.gl.texParameteri(this.glTarget,r,o);break;case 34892:case 34893:this.gl.texParameteri(this.glTarget,r,o);break}}this.gl.bindTexture(this.glTarget,null)}_getActiveUnit(){return this.gl.getParameter(34016)-33984}_bind(t){const{gl:n}=this;return t!==void 0&&(this._textureUnit=t,n.activeTexture(33984+t)),n.bindTexture(this.glTarget,this.handle),t}_unbind(t){const{gl:n}=this;return t!==void 0&&(this._textureUnit=t,n.activeTexture(33984+t)),n.bindTexture(this.glTarget,null),t}_assertWritable(t){if(this.isHandleBorrowed)throw new Error(`Cannot ${t} borrowed read-only ${this}`)}}function vC(i,e=0){return e?new i.constructor(i.buffer,i.byteOffset+e,(i.byteLength-e)/i.BYTES_PER_ELEMENT):i}function xC(i,e){if(e%i.BYTES_PER_ELEMENT!==0)throw new Error(`Texture byteOffset ${e} must align to typed array element size ${i.BYTES_PER_ELEMENT}`);return e/i.BYTES_PER_ELEMENT}function wC(i){switch(i){case"1d":break;case"2d":return 3553;case"3d":return 32879;case"cube":return 34067;case"2d-array":return 35866}throw new Error(i)}function Yi(i,e,t){return e==="cube"?34069+t:i}function PC(i,e,t,n){const s=i;let r=n;r===!0&&(r=1),r===!1&&(r=0);const o=typeof r=="number"?[r]:r;switch(t){case 35678:case 35680:case 35679:case 35682:case 36289:case 36292:case 36293:case 36298:case 36299:case 36300:case 36303:case 36306:case 36307:case 36308:case 36311:if(typeof n!="number")throw new Error("samplers must be set to integers");return i.uniform1i(e,n);case 5126:return i.uniform1fv(e,o);case 35664:return i.uniform2fv(e,o);case 35665:return i.uniform3fv(e,o);case 35666:return i.uniform4fv(e,o);case 5124:return i.uniform1iv(e,o);case 35667:return i.uniform2iv(e,o);case 35668:return i.uniform3iv(e,o);case 35669:return i.uniform4iv(e,o);case 35670:return i.uniform1iv(e,o);case 35671:return i.uniform2iv(e,o);case 35672:return i.uniform3iv(e,o);case 35673:return i.uniform4iv(e,o);case 5125:return s.uniform1uiv(e,o,1);case 36294:return s.uniform2uiv(e,o,2);case 36295:return s.uniform3uiv(e,o,3);case 36296:return s.uniform4uiv(e,o,4);case 35674:return i.uniformMatrix2fv(e,!1,o);case 35675:return i.uniformMatrix3fv(e,!1,o);case 35676:return i.uniformMatrix4fv(e,!1,o);case 35685:return s.uniformMatrix2x3fv(e,!1,o);case 35686:return s.uniformMatrix2x4fv(e,!1,o);case 35687:return s.uniformMatrix3x2fv(e,!1,o);case 35688:return s.uniformMatrix3x4fv(e,!1,o);case 35689:return s.uniformMatrix4x2fv(e,!1,o);case 35690:return s.uniformMatrix4x3fv(e,!1,o)}throw new Error("Illegal uniform")}function SC(i){return LC[i]}function cc(i){return CC[i]}function Fh(i){return!!Nh[i]}function EC(i){return Nh[i]}const CC={5126:"f32",35664:"vec2<f32>",35665:"vec3<f32>",35666:"vec4<f32>",5124:"i32",35667:"vec2<i32>",35668:"vec3<i32>",35669:"vec4<i32>",5125:"u32",36294:"vec2<u32>",36295:"vec3<u32>",36296:"vec4<u32>",35670:"f32",35671:"vec2<f32>",35672:"vec3<f32>",35673:"vec4<f32>",35674:"mat2x2<f32>",35685:"mat2x3<f32>",35686:"mat2x4<f32>",35687:"mat3x2<f32>",35675:"mat3x3<f32>",35688:"mat3x4<f32>",35689:"mat4x2<f32>",35690:"mat4x3<f32>",35676:"mat4x4<f32>"},Nh={35678:{viewDimension:"2d",sampleType:"float"},35680:{viewDimension:"cube",sampleType:"float"},35679:{viewDimension:"3d",sampleType:"float"},35682:{viewDimension:"3d",sampleType:"depth"},36289:{viewDimension:"2d-array",sampleType:"float"},36292:{viewDimension:"2d-array",sampleType:"depth"},36293:{viewDimension:"cube",sampleType:"float"},36298:{viewDimension:"2d",sampleType:"sint"},36299:{viewDimension:"3d",sampleType:"sint"},36300:{viewDimension:"cube",sampleType:"sint"},36303:{viewDimension:"2d-array",sampleType:"uint"},36306:{viewDimension:"2d",sampleType:"uint"},36307:{viewDimension:"3d",sampleType:"uint"},36308:{viewDimension:"cube",sampleType:"uint"},36311:{viewDimension:"2d-array",sampleType:"uint"}},LC={uint8:5121,sint8:5120,unorm8:5121,snorm8:5120,uint16:5123,sint16:5122,unorm16:5123,snorm16:5122,uint32:5125,sint32:5124,float16:5131,float32:5126};function TC(i,e,t={}){const n={attributes:[],bindings:[]};n.attributes=AC(i,e);const s=RC(i,e,t);for(const c of s){const l=c.uniforms.map(u=>({name:u.name,format:u.format,byteOffset:u.byteOffset,byteStride:u.byteStride,arrayLength:u.arrayLength}));n.bindings.push({type:"uniform",name:c.name,group:0,location:c.location,visibility:(c.vertex?1:0)|(c.fragment?2:0),minBindingSize:c.byteLength,uniforms:l})}const r=MC(i,e);let o=0;for(const c of r)if(Fh(c.type)){const{viewDimension:l,sampleType:u}=EC(c.type);n.bindings.push({type:"texture",name:c.name,group:0,location:o,viewDimension:l,sampleType:u}),c.textureUnit=o,o+=1}r.length&&(n.uniforms=r);const a=IC(i,e);return a?.length&&(n.varyings=a),n}function AC(i,e){const t=[],n=i.getProgramParameter(e,35721);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s);if(!r)throw new Error("activeInfo");const{name:o,type:a}=r,c=i.getAttribLocation(e,o);if(c>=0){const l=cc(a),u=/instance/i.test(o)?"instance":"vertex";t.push({name:o,location:c,stepMode:u,type:l})}}return t.sort((s,r)=>s.location-r.location),t}function IC(i,e){const t=[],n=i.getProgramParameter(e,35971);for(let s=0;s<n;s++){const r=i.getTransformFeedbackVarying(e,s);if(!r)throw new Error("activeInfo");const{name:o,type:a,size:c}=r,l=cc(a),{type:u,components:f}=ko(l);t.push({location:s,name:o,type:u,size:c*f})}return t.sort((s,r)=>s.location-r.location),t}function MC(i,e){const t=[],n=i.getProgramParameter(e,35718);for(let s=0;s<n;s++){const r=i.getActiveUniform(e,s);if(!r)throw new Error("activeInfo");const{name:o,size:a,type:c}=r,{name:l,isArray:u}=zC(o);let f=i.getUniformLocation(e,l);const d={location:f,name:l,size:a,type:c,isArray:u};if(t.push(d),d.size>1)for(let g=0;g<d.size;g++){const p=`${l}[${g}]`;f=i.getUniformLocation(e,p);const m={...d,name:p,location:f};t.push(m)}}return t}function RC(i,e,t){const n=[],s=BC(i,e,t);for(const[o,a]of s){n.push(a);try{const c=zh(i,e,o,a.name);OC(c,a)}catch(c){const l=c instanceof Error?c.message:String(c);S.once(0,`WebGL uniform block reflection failed for "${a.name}"; using supplied std140 metadata. ${l}`)()}}const r=i.getProgramParameter(e,35382);if(!Number.isInteger(r)||r<0)throw new Error(`Failed to reflect WebGL uniform blocks: ACTIVE_UNIFORM_BLOCKS returned ${String(r)}`);for(let o=0;o<r;o++)s.has(o)||n.push(zh(i,e,o));return n.sort((o,a)=>o.location-a.location),n}function OC(i,e){for(const t of i.uniforms){const n=e.uniforms.find(s=>t.name===s.name||t.name.endsWith(`.${s.name}`));if(!n)throw new Error(`Failed to validate WebGL uniform block "${e.name}": reflected unexpected member "${t.name}"`);if(t.format!==n.format||t.arrayLength!==n.arrayLength||t.byteOffset!==n.byteOffset||t.byteStride!==n.byteStride)throw new Error(`Failed to validate WebGL uniform block "${e.name}": reflected layout for "${t.name}" does not match supplied std140 metadata`)}}function BC(i,e,t){const n=new Map;for(const r of t.uniformBlockLayouts||[])n.set(r.name,DC(r));for(const r of t.shaderLayout?.bindings||[])NC(r)&&n.set(r.name,r);const s=new Map;for(const r of n.values()){const o=kC(i,e,r.name);if(!o)continue;const{blockIndex:a,blockName:c}=o;if(s.has(a))throw new Error(`Multiple supplied uniform block layouts resolve to active WebGL block "${c}"`);s.set(a,{name:c,location:a,byteLength:r.minBindingSize,vertex:!!(r.visibility&&r.visibility&1),fragment:!!(r.visibility&&r.visibility&2),uniformCount:r.uniforms.length,uniforms:r.uniforms.map(l=>({...l}))})}return s}function kC(i,e,t){const n=t.endsWith("Uniforms")?[t,t.slice(0,-8)]:[t,`${t}Uniforms`];for(const s of n){const r=i.getUniformBlockIndex(e,s);if(r!==4294967295){if(!Number.isInteger(r)||r<0)throw new Error(`Failed to resolve WebGL uniform block "${s}": getUniformBlockIndex returned ${String(r)}`);return{blockIndex:r,blockName:s}}}return null}function zh(i,e,t,n){const s=n||i.getActiveUniformBlockName(e,t);if(!s)throw new Error(`Failed to reflect WebGL uniform block at index ${t}: missing block name`);const r=(b,x)=>{const w=i.getActiveUniformBlockParameter(e,t,b);if(w==null)throw new Error(`Failed to reflect WebGL uniform block "${s}": ${x} returned null`);return w},o=Lt(r(35391,"UNIFORM_BLOCK_BINDING"),s,"UNIFORM_BLOCK_BINDING",0),a=Lt(r(35392,"UNIFORM_BLOCK_DATA_SIZE"),s,"UNIFORM_BLOCK_DATA_SIZE",0),c=Lt(r(35394,"UNIFORM_BLOCK_ACTIVE_UNIFORMS"),s,"UNIFORM_BLOCK_ACTIVE_UNIFORMS",0),l=Uh(r(35395,"UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES"),s,"UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES",c),u=qi(i,e,l,35383,"UNIFORM_TYPE",s,c),f=qi(i,e,l,35384,"UNIFORM_SIZE",s,c),d=qi(i,e,l,35386,"UNIFORM_BLOCK_INDEX",s,c),g=qi(i,e,l,35387,"UNIFORM_OFFSET",s,c),p=qi(i,e,l,35388,"UNIFORM_ARRAY_STRIDE",s,c),m=[];for(let b=0;b<c;b++){if(d[b]!==t)throw new Error(`Failed to reflect WebGL uniform block "${s}": active uniform index ${l[b]} belongs to block ${d[b]}, expected ${t}`);const x=l[b],w=i.getActiveUniform(e,x);if(!w)throw new Error(`Failed to reflect WebGL uniform block "${s}": getActiveUniform(${x}) returned null`);const P=Lt(u[b],s,`UNIFORM_TYPE[${b}]`,1),L=Lt(f[b],s,`UNIFORM_SIZE[${b}]`,1),E=Lt(g[b],s,`UNIFORM_OFFSET[${b}]`,0),T=Lt(p[b],s,`UNIFORM_ARRAY_STRIDE[${b}]`,0);if(w.type!==P||w.size!==L)throw new Error(`Failed to reflect WebGL uniform block "${s}": getActiveUniform(${x}) disagrees with getActiveUniforms`);m.push({name:w.name,format:cc(P),arrayLength:L,byteOffset:E,byteStride:T})}const y={name:s,location:o,byteLength:a,vertex:!!r(35396,"UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER"),fragment:!!r(35398,"UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER"),uniformCount:c,uniforms:m},_=new Set(y.uniforms.map(b=>b.name.split(".")[0]).filter(b=>!!b)),v=y.name.replace(/Uniforms$/,"");if(_.size===1&&!_.has(y.name)&&!_.has(v)){const[b]=_;S.warn(`Uniform block "${y.name}" uses GLSL instance "${b}". luma.gl binds uniform buffers by block name ("${y.name}") and alias ("${v}"). Prefer matching the instance name to one of those to avoid confusing silent mismatches.`)()}return y}function qi(i,e,t,n,s,r,o){const a=i.getActiveUniforms(e,t,n);if(a===null)throw new Error(`Failed to reflect WebGL uniform block "${r}": ${s} returned null`);return Uh(a,r,s,o)}function Uh(i,e,t,n){if(!Array.isArray(i)&&!ArrayBuffer.isView(i))throw new Error(`Failed to reflect WebGL uniform block "${e}": ${t} returned a non-array value`);const s=Array.from(i);if(s.length!==n||s.some(r=>!Number.isInteger(r)))throw new Error(`Failed to reflect WebGL uniform block "${e}": ${t} returned ${s.length} invalid values, expected ${n}`);return s}function Lt(i,e,t,n){if(!Number.isInteger(i)||i<n)throw new Error(`Failed to reflect WebGL uniform block "${e}": ${t} returned ${String(i)}`);return i}function DC(i){const e=Fo(i.uniformTypes,{layout:"std140"}),t=FC(i.uniformTypes,e.fields);return{type:"uniform",name:i.name,group:0,location:0,minBindingSize:e.byteLength,uniforms:t}}function FC(i,e){const t=[],n=(r,o)=>{if(typeof o=="string"){const a=e[r];if(!a)throw new Error(`Missing std140 layout field ${r}`);t.push({name:r,format:a.shaderType,arrayLength:1,byteOffset:a.offset*4,byteStride:0});return}if(Array.isArray(o)){s(r,o[0],o[1]);return}for(const[a,c]of Object.entries(o))n(`${r}.${a}`,c)},s=(r,o,a)=>{if(typeof o=="string"){const c=e[`${r}[0]`],l=a>1?e[`${r}[1]`]:void 0;if(!c)throw new Error(`Missing std140 array layout field ${r}[0]`);t.push({name:`${r}[0]`,format:c.shaderType,arrayLength:a,byteOffset:c.offset*4,byteStride:l?(l.offset-c.offset)*4:0});return}if(Array.isArray(o))throw new Error(`Nested uniform arrays are not supported for ${r}`);for(const[c,l]of Object.entries(o)){if(typeof l!="string")throw new Error(`Composite uniform array members are not supported for ${r}`);const u=`${r}[0].${c}`,f=`${r}[1].${c}`,d=e[u],g=a>1?e[f]:void 0;if(!d)throw new Error(`Missing std140 array layout field ${u}`);t.push({name:u,format:d.shaderType,arrayLength:a,byteOffset:d.offset*4,byteStride:g?(g.offset-d.offset)*4:0})}};for(const[r,o]of Object.entries(i))n(r,o);return t}function NC(i){return i.type==="uniform"&&Number.isInteger(i.minBindingSize)&&i.minBindingSize>=0&&Array.isArray(i.uniforms)&&i.uniforms.every(e=>typeof e.name=="string"&&typeof e.format=="string"&&Number.isInteger(e.arrayLength)&&e.arrayLength>0&&Number.isInteger(e.byteOffset)&&e.byteOffset>=0&&Number.isInteger(e.byteStride)&&e.byteStride>=0)}function zC(i){if(i[i.length-1]!=="]")return{name:i,length:1,isArray:!1};const t=/([^[]*)(\[[0-9]+\])?/.exec(i);return{name:Gn(t?.[1],`Failed to parse GLSL uniform name ${i}`),length:t?.[2]?1:0,isArray:!!t?.[2]}}class UC extends Qe{constructor(t,n){super(t,n);h(this,"device");h(this,"handle");h(this,"vs");h(this,"fs");h(this,"introspectedLayout");h(this,"bindings",{});h(this,"uniforms",{});h(this,"varyings",null);h(this,"_uniformCount",0);h(this,"_uniformSetters",{});this.device=t;const s=this.sharedRenderPipeline||this.device._createSharedRenderPipelineWebGL(n);this.sharedRenderPipeline=s,this.handle=s.handle,this.vs=s.vs,this.fs=s.fs,this.linkStatus=s.linkStatus,this.introspectedLayout=TC(this.device.gl,this.handle,{uniformBlockLayouts:n._uniformBlockLayouts,shaderLayout:n.shaderLayout}),this.device._setWebGLDebugMetadata(this.handle,this,{spector:{id:this.props.id}}),this.shaderLayout=n.shaderLayout?$C(this.introspectedLayout,n.shaderLayout):this.introspectedLayout}get[Symbol.toStringTag](){return"WEBGLRenderPipeline"}destroy(){this.destroyed||(this.sharedRenderPipeline&&!this.props._sharedRenderPipeline&&this.sharedRenderPipeline.destroy(),this.destroyResource())}setBindings(t,n){const s=Lo(Co(this.shaderLayout,t));for(const[r,o]of Object.entries(s)){const a=$h(this.shaderLayout,r);if(a){switch(o||S.warn(`Unsetting binding "${r}" in render pipeline "${this.id}"`)(),a.type){case"uniform":if(!(o instanceof Wi)&&!(o.buffer instanceof Wi))throw new Error("buffer value");break;case"texture":if(!(o instanceof ai||o instanceof Hi||o instanceof ji))throw new Error(`${this} Bad texture binding for ${r}`);break;case"sampler":S.warn(`Ignoring sampler ${r}`)();break;default:throw new Error(a.type)}this.bindings[r]=o}else{const c=this.shaderLayout.bindings.map(l=>`"${l.name}"`).join(", ");n?.disableWarnings||S.warn(`No binding "${r}" in render pipeline "${this.id}", expected one of ${c}`,o)()}}}draw(t){const n=t.renderPass,s=t.bindGroups?Lo(t.bindGroups):t.bindings||this.bindings;return n.setPipeline(this),n.setBindings(s),n.setVertexArray(t.vertexArray),n.draw({parameters:t.parameters,topology:t.topology,isInstanced:t.isInstanced,vertexCount:t.vertexCount,indexCount:t.indexCount,instanceCount:t.instanceCount,firstVertex:t.firstVertex,firstIndex:t.firstIndex,firstInstance:t.firstInstance,baseVertex:t.baseVertex,transformFeedback:t.transformFeedback,uniforms:t.uniforms})}_areTexturesRenderable(t){let n=!0;for(const s of this.shaderLayout.bindings)Gh(t,s.name)||(S.warn(`Binding ${s.name} not found in ${this.id}`)(),n=!1);return n}_applyBindings(t,n){if(this._syncLinkStatus(),this.linkStatus!=="success")return;const{gl:s}=this.device;s.useProgram(this.handle);let r=0,o=0;for(const a of this.shaderLayout.bindings){const c=Gh(t,a.name);if(!c)throw new Error(`No value for binding ${a.name} in ${this.id}`);switch(a.type){case"uniform":const{name:l}=a,u=s.getUniformBlockIndex(this.handle,l);if(u===4294967295)throw new Error(`Invalid uniform block name ${l}`);if(s.uniformBlockBinding(this.handle,u,o),c instanceof Wi)s.bindBufferBase(35345,o,c.handle);else{const d=c;s.bindBufferRange(35345,o,d.buffer.handle,d.offset||0,d.size||d.buffer.byteLength-(d.offset||0))}o+=1;break;case"texture":if(!(c instanceof ai||c instanceof Hi||c instanceof ji))throw new Error("texture");let f;if(c instanceof ai)f=c.texture;else if(c instanceof Hi)f=c;else if(c instanceof ji&&c.colorAttachments[0]instanceof ai)S.warn("Passing framebuffer in texture binding may be deprecated. Use fbo.colorAttachments[0] instead")(),f=c.colorAttachments[0].texture;else throw new Error("No texture");s.activeTexture(33984+r),s.bindTexture(f.glTarget,f.handle),r+=1;break;case"sampler":break;case"storage":case"read-only-storage":throw new Error(`binding type '${a.type}' not supported in WebGL`)}}}_applyUniforms(t){for(const n of this.shaderLayout.uniforms||[]){const{name:s,location:r,type:o,textureUnit:a}=n,c=t[s]??a;c!==void 0&&PC(this.device.gl,r,o,c)}}_syncLinkStatus(){this.linkStatus=this.sharedRenderPipeline.linkStatus}}function $C(i,e){const t={...i,attributes:i.attributes.map(n=>({...n})),bindings:i.bindings.map(n=>({...n}))};for(const n of e?.attributes||[]){const s=t.attributes.find(r=>r.name===n.name);s?(s.type=n.type||s.type,s.stepMode=n.stepMode||s.stepMode):S.warn(`shader layout attribute ${n.name} not present in shader`)}for(const n of e?.bindings||[]){const s=$h(t,n.name);if(!s){S.warn(`shader layout binding ${n.name} not present in shader`);continue}Object.assign(s,n)}return t}function $h(i,e){return i.bindings.find(t=>t.name===e||t.name===`${e}Uniforms`||`${t.name}Uniforms`===e)}function Gh(i,e){return i[e]||i[`${e}Uniforms`]||i[e.replace(/Uniforms$/,"")]}const Vh=4;class GC extends Iv{constructor(t,n){super(t,n);h(this,"device");h(this,"handle");h(this,"vs");h(this,"fs");h(this,"linkStatus","pending");this.device=t,this.handle=n.handle||this.device.gl.createProgram(),this.vs=n.vs,this.fs=n.fs,n.varyings&&n.varyings.length>0&&this.device.gl.transformFeedbackVaryings(this.handle,n.varyings,n.bufferMode||35981),this._linkShaders()}destroy(){this.destroyed||(this.device.gl.useProgram(null),this.device.gl.deleteProgram(this.handle),this.handle.destroyed=!0,this.destroyResource())}async _linkShaders(){const{gl:t}=this.device;if(t.attachShader(this.handle,this.vs.handle),t.attachShader(this.handle,this.fs.handle),S.time(Vh,`linkProgram for ${this.id}`)(),t.linkProgram(this.handle),S.timeEnd(Vh,`linkProgram for ${this.id}`)(),!this.device.features.has("compilation-status-async-webgl")){const s=this._getLinkStatus();this._reportLinkStatus(s);return}S.once(1,"RenderPipeline linking is asynchronous")(),await this._waitForLinkComplete(),S.info(2,`RenderPipeline ${this.id} - async linking complete: ${this.linkStatus}`)();const n=this._getLinkStatus();this._reportLinkStatus(n)}async _reportLinkStatus(t){switch(t){case"success":return;default:const n=t==="link-error"?"Link error":"Validation error";switch(this.vs.compilationStatus){case"error":throw this.vs.debugShader(),new Error(`${this} ${n} during compilation of ${this.vs}`);case"pending":await this.vs.asyncCompilationStatus,this.vs.debugShader();break}switch(this.fs?.compilationStatus){case"error":throw this.fs.debugShader(),new Error(`${this} ${n} during compilation of ${this.fs}`);case"pending":await this.fs.asyncCompilationStatus,this.fs.debugShader();break}const s=this.device.gl.getProgramInfoLog(this.handle);this.device.reportError(new Error(`${n} during ${t}: ${s}`),this)(),this.device.debug()}}_getLinkStatus(){const{gl:t}=this.device;return t.getProgramParameter(this.handle,35714)?(this._initializeSamplerUniforms(),t.validateProgram(this.handle),t.getProgramParameter(this.handle,35715)?(this.linkStatus="success","success"):(this.linkStatus="error","validation-error")):(this.linkStatus="error","link-error")}_initializeSamplerUniforms(){const{gl:t}=this.device;t.useProgram(this.handle);let n=0;const s=t.getProgramParameter(this.handle,35718);for(let r=0;r<s;r++){const o=t.getActiveUniform(this.handle,r);if(o&&Fh(o.type)){const a=o.name.endsWith("[0]"),c=a?o.name.slice(0,-3):o.name,l=t.getUniformLocation(this.handle,c);l!==null&&(n=this._assignSamplerUniform(l,o,a,n))}}}_assignSamplerUniform(t,n,s,r){const{gl:o}=this.device;if(s&&n.size>1){const a=Int32Array.from({length:n.size},(c,l)=>r+l);return o.uniform1iv(t,a),r+n.size}return o.uniform1i(t,r),r+1}async _waitForLinkComplete(){const t=async r=>await new Promise(o=>setTimeout(o,r));if(!this.device.features.has("compilation-status-async-webgl")){await t(10);return}const{gl:s}=this.device;for(;;){if(s.getProgramParameter(this.handle,37297))return;await t(10)}}}class VC extends Io{constructor(t,n={}){super(t,n);h(this,"device");h(this,"handle",null);h(this,"commands",[]);this.device=t}_executeCommands(t=this.commands){for(const n of t)switch(n.name){case"copy-buffer-to-buffer":jC(this.device,n.options);break;case"copy-buffer-to-texture":WC(this.device,n.options);break;case"copy-texture-to-buffer":HC(this.device,n.options);break;case"copy-texture-to-texture":YC(this.device,n.options);break;default:throw new Error(n.name)}}}function jC(i,e){const t=e.sourceBuffer,n=e.destinationBuffer;i.gl.bindBuffer(36662,t.handle),i.gl.bindBuffer(36663,n.handle),i.gl.copyBufferSubData(36662,36663,e.sourceOffset??0,e.destinationOffset??0,e.size),i.gl.bindBuffer(36662,null),i.gl.bindBuffer(36663,null)}function WC(i,e){const{sourceBuffer:t,byteOffset:n=0,destinationTexture:s,mipLevel:r=0,origin:o=[0,0,0],aspect:a="all",bytesPerRow:c,rowsPerImage:l,size:u}=e;if(a!=="all")throw new Error("copyBufferToTexture aspect is not supported in WebGL");s.writeBuffer(t,{byteOffset:n,bytesPerRow:c,rowsPerImage:l,mipLevel:r,x:o[0]??0,y:o[1]??0,z:o[2]??0,width:u[0],height:u[1],depthOrArrayLayers:u[2]})}function HC(i,e){const{sourceTexture:t,mipLevel:n=0,aspect:s="all",width:r=e.sourceTexture.width,height:o=e.sourceTexture.height,depthOrArrayLayers:a,origin:c=[0,0,0],destinationBuffer:l,byteOffset:u=0,bytesPerRow:f,rowsPerImage:d}=e;if(t instanceof H){t.readBuffer({x:c[0]??0,y:c[1]??0,z:c[2]??0,width:r,height:o,depthOrArrayLayers:a,mipLevel:n,aspect:s,byteOffset:u},l);return}if(s!=="all")throw new Error("aspect not supported in WebGL");if(n!==0||a!==void 0||f||d)throw new Error("not implemented");const{framebuffer:g,destroyFramebuffer:p}=jh(t);let m;try{const y=l,_=r||g.width,v=o||g.height,b=Gn(g.colorAttachments[0]),x=Rh(b.texture.props.format),w=x.format,P=x.type;i.gl.bindBuffer(35051,y.handle),m=i.gl.bindFramebuffer(36160,g.handle),i.gl.readPixels(c[0],c[1],_,v,w,P,u)}finally{i.gl.bindBuffer(35051,null),m!==void 0&&i.gl.bindFramebuffer(36160,m),p&&g.destroy()}}function YC(i,e){const{sourceTexture:t,destinationMipLevel:n=0,origin:s=[0,0],destinationOrigin:r=[0,0,0],destinationTexture:o}=e;let{width:a=e.destinationTexture.width,height:c=e.destinationTexture.height}=e;const{framebuffer:l,destroyFramebuffer:u}=jh(t),[f=0,d=0]=s,[g,p,m]=r,y=i.gl.bindFramebuffer(36160,l.handle);let _,v;if(o instanceof Hi)_=o,a=Number.isFinite(a)?a:_.width,c=Number.isFinite(c)?c:_.height,_._bind(0),v=_.glTarget;else throw new Error("invalid destination");switch(v){case 3553:case 34067:i.gl.copyTexSubImage2D(v,n,g,p,f,d,a,c);break;case 35866:case 32879:i.gl.copyTexSubImage3D(v,n,g,p,m,f,d,a,c);break}_&&_._unbind(),i.gl.bindFramebuffer(36160,y),u&&l.destroy()}function jh(i){if(i instanceof H){const{width:e,height:t,id:n}=i;return{framebuffer:i.device.createFramebuffer({id:`framebuffer-for-${n}`,width:e,height:t,colorAttachments:[i]}),destroyFramebuffer:!0}}return{framebuffer:i,destroyFramebuffer:!1}}function qC(i){switch(i){case"point-list":return 0;case"line-list":return 1;case"line-strip":return 3;case"triangle-list":return 4;case"triangle-strip":return 5;default:throw new Error(i)}}function XC(i){switch(i){case"point-list":return 0;case"line-list":return 1;case"line-strip":return 1;case"triangle-list":return 4;case"triangle-strip":return 4;default:throw new Error(i)}}const ZC=[1,2,4,8];class KC extends To{constructor(t,n){super(t,n);h(this,"device");h(this,"handle",null);h(this,"glParameters",{});h(this,"pipeline",null);h(this,"bindings",{});h(this,"bindingsPipeline",null);h(this,"vertexArray",null);this.device=t;const s=this.props.framebuffer,r=!s||s.handle===null;r&&t.getDefaultCanvasContext()._resizeDrawingBufferIfNeeded();let o;if(!n?.parameters?.viewport)if(!r&&s){const{width:a,height:c}=s;o=[0,0,a,c]}else{const[a,c]=t.getDefaultCanvasContext().getDrawingBufferSize();o=[0,0,a,c]}if(this.device.pushState(),this.setParameters({viewport:o,...this.props.parameters}),!r&&s?.colorAttachments.length){const a=s.colorAttachments.map((c,l)=>36064+l);this.device.gl.drawBuffers(a)}else r&&this.device.gl.drawBuffers([1029]);this.clear(),this.props.timestampQuerySet&&this.props.beginTimestampIndex!==void 0&&this.props.timestampQuerySet.writeTimestamp(this.props.beginTimestampIndex)}end(){this.destroyed||(this.props.timestampQuerySet&&this.props.endTimestampIndex!==void 0&&this.props.timestampQuerySet.writeTimestamp(this.props.endTimestampIndex),this.device.popState(),this.destroy())}pushDebugGroup(t){}popDebugGroup(){}insertDebugMarker(t){}executeBundles(t){throw new Error("Render bundles are only supported in WebGPU")}setParameters(t={}){const n={...this.glParameters};n.framebuffer=this.props.framebuffer||null,this.props.depthReadOnly&&(n.depthMask=!this.props.depthReadOnly),n.stencilMask=this.props.stencilReadOnly?0:1,n[35977]=this.props.discard,t.viewport&&(t.viewport.length>=6?(n.viewport=t.viewport.slice(0,4),n.depthRange=[t.viewport[4],t.viewport[5]]):n.viewport=t.viewport),t.scissorRect&&(n.scissorTest=!0,n.scissor=t.scissorRect),t.blendConstant&&(n.blendColor=t.blendConstant),t.stencilReference!==void 0&&(n[2967]=t.stencilReference,n[36003]=t.stencilReference),"colorMask"in t&&(n.colorMask=ZC.map(s=>!!(s&t.colorMask))),this.glParameters=n,si(this.device.gl,n)}setPipeline(t){this.pipeline=t}setBindings(t,n){if(!this.pipeline)throw new Error("RenderPass.setPipeline() must be called before setBindings()");this.bindings=Lo(Co(this.pipeline.shaderLayout,t)),this.bindingsPipeline=this.pipeline}setVertexArray(t){this.vertexArray=t}draw(t){const n=this.pipeline,s=this.vertexArray;if(!n)throw new Error("RenderPass.setPipeline() must be called before draw()");if(!s)throw new Error("RenderPass.setVertexArray() must be called before draw()");if(n.shaderLayout.bindings.length>0&&this.bindingsPipeline!==n)throw new Error("RenderPass.setBindings() must be called after setPipeline() before draw()");n._syncLinkStatus();const{parameters:r=n.props.parameters,topology:o=n.props.topology,vertexCount:a,indexCount:c,instanceCount:l,isInstanced:u=!1,firstVertex:f=0,transformFeedback:d,uniforms:g=n.uniforms}=t,p=qC(o),m=!!s.indexBuffer,y=s.indexBuffer?.glIndexType,_=c??a??0;if(n.linkStatus!=="success")return S.info(2,`RenderPipeline:${n.id}.draw() aborted - waiting for shader linking`)(),!1;if(!n._areTexturesRenderable(this.bindings))return S.info(2,`RenderPipeline:${n.id}.draw() aborted - textures not yet loaded`)(),!1;this.device.gl.useProgram(n.handle),s.bindBeforeRender(this);const v=d;return v&&v.begin(n.props.topology),n._applyBindings(this.bindings,{disableWarnings:n.props.disableWarnings}),n._applyUniforms(g),fC(this.device,r,this.glParameters,()=>{m&&u?this.device.gl.drawElementsInstanced(p,_,y,f,l||0):m?this.device.gl.drawElements(p,_,y,f):u?this.device.gl.drawArraysInstanced(p,f,a||0,l||0):this.device.gl.drawArrays(p,f,a||0),v&&v.end()}),s.unbindAfterRender(this),!0}drawIndirect(t,n=0){throw new Error("Indirect drawing is only supported in WebGPU")}drawIndexedIndirect(t,n=0){throw new Error("Indirect drawing is only supported in WebGPU")}beginOcclusionQuery(t){this.props.occlusionQuerySet?.beginOcclusionQuery()}endOcclusionQuery(){this.props.occlusionQuerySet?.endOcclusionQuery()}clear(){const t={...this.glParameters};let n=0;this.props.clearColors&&this.props.clearColors.forEach((s,r)=>{s&&this.clearColorBuffer(r,s)}),this.props.clearColor!==!1&&this.props.clearColors===void 0&&(n|=16384,t.clearColor=this.props.clearColor),this.props.clearDepth!==!1&&(n|=256,t.clearDepth=this.props.clearDepth),this.props.clearStencil!==!1&&(n|=1024,t.clearStencil=this.props.clearStencil),n!==0&&st(this.device.gl,t,()=>{this.device.gl.clear(n)})}clearColorBuffer(t=0,n=[0,0,0,0]){st(this.device.gl,{framebuffer:this.props.framebuffer},()=>{switch(n.constructor){case Int8Array:case Int16Array:case Int32Array:this.device.gl.clearBufferiv(6144,t,n);break;case Uint8Array:case Uint8ClampedArray:case Uint16Array:case Uint32Array:this.device.gl.clearBufferuiv(6144,t,n);break;case Float32Array:this.device.gl.clearBufferfv(6144,t,n);break;default:throw new Error("clearColorBuffer: color must be typed array")}})}}class Wh extends Ao{constructor(t,n){super(t,n);h(this,"device");h(this,"handle",null);h(this,"commandBuffer");this.device=t,this.commandBuffer=new VC(t,{id:this.id,userData:this.userData})}destroy(){this.destroyResource()}finish(){return this.destroy(),this.commandBuffer}beginRenderPass(t={}){return new KC(this.device,this._applyTimeProfilingToPassProps(t))}beginComputePass(t={}){throw new Error("ComputePass not supported in WebGL")}copyBufferToBuffer(t){this.commandBuffer.commands.push({name:"copy-buffer-to-buffer",options:t})}copyBufferToTexture(t){this.commandBuffer.commands.push({name:"copy-buffer-to-texture",options:t})}copyTextureToBuffer(t){this.commandBuffer.commands.push({name:"copy-texture-to-buffer",options:t})}copyTextureToTexture(t){this.commandBuffer.commands.push({name:"copy-texture-to-texture",options:t})}pushDebugGroup(t){}popDebugGroup(){}insertDebugMarker(t){}resolveQuerySet(t,n,s){throw new Error("resolveQuerySet is not supported in WebGL")}writeTimestamp(t,n){t.writeTimestamp(n)}}function QC(i){const{target:e,source:t,start:n=0,count:s=1}=i,r=t.length,o=s*r;let a=0;for(let c=n;a<r;a++)e[c++]=t[a]??0;for(;a<o;)a<o-a?(e.copyWithin(n+a,n,n+a),a*=2):(e.copyWithin(n+a,n,n+o-a),a=o);return i.target}class lc extends Mo{constructor(t,n){super(t,n);h(this,"device");h(this,"handle");h(this,"attributeInfosByLocation");h(this,"buffer",null);h(this,"bufferValue",null);this.device=t,this.handle=this.device.gl.createVertexArray(),this.attributeInfosByLocation=new Array(this.maxVertexAttributes).fill(null);for(const s of Object.values(of(n.shaderLayout,n.bufferLayout)))this.attributeInfosByLocation[s.location]=s}get[Symbol.toStringTag](){return"VertexArray"}static isConstantAttributeZeroSupported(t){return _m()==="Chrome"}destroy(){super.destroy(),this.buffer&&this.buffer?.destroy(),this.handle&&(this.device.gl.deleteVertexArray(this.handle),this.handle=void 0)}setIndexBuffer(t){const n=t;if(n&&n.glTarget!==34963)throw new Error("Use .setBuffer()");this.device.gl.bindVertexArray(this.handle),this.device.gl.bindBuffer(34963,n?n.handle:null),this.indexBuffer=n,this.device.gl.bindVertexArray(null)}setBuffer(t,n){const s=n;if(s.glTarget===34963)throw new Error("Use .setIndexBuffer()");const{size:r,type:o,stride:a,offset:c,normalized:l,integer:u,divisor:f}=this._getAccessor(t);this.device.gl.bindVertexArray(this.handle),this.device.gl.bindBuffer(34962,s.handle),u?this.device.gl.vertexAttribIPointer(t,r,o,a,c):this.device.gl.vertexAttribPointer(t,r,o,l,a,c),this.device.gl.bindBuffer(34962,null),this.device.gl.enableVertexAttribArray(t),this.device.gl.vertexAttribDivisor(t,f||0),this.attributes[t]=s,this.device.gl.bindVertexArray(null)}setConstantWebGL(t,n){this._enable(t,!1),this.attributes[t]=n}bindBeforeRender(){this.device.gl.bindVertexArray(this.handle),this._applyConstantAttributes()}unbindAfterRender(){this.device.gl.bindVertexArray(null)}_applyConstantAttributes(){for(let t=0;t<this.maxVertexAttributes;++t){const n=this.attributes[t];ArrayBuffer.isView(n)&&this.device.setConstantAttributeWebGL(t,n)}}_getAccessor(t){const n=this.attributeInfosByLocation[t];if(!n)throw new Error(`Unknown attribute location ${t}`);const s=Lh(n.bufferDataType);return{size:n.bufferComponents,type:s,stride:n.byteStride,offset:n.byteOffset,normalized:n.normalized,integer:n.integer,divisor:n.stepMode==="instance"?1:0}}_enable(t,n=!0){const r=lc.isConstantAttributeZeroSupported(this.device)||t!==0;(n||r)&&(t=Number(t),this.device.gl.bindVertexArray(this.handle),n?this.device.gl.enableVertexAttribArray(t):this.device.gl.disableVertexAttribArray(t),this.device.gl.bindVertexArray(null))}getConstantBuffer(t,n){const s=JC(n),r=s.byteLength*t,o=s.length*t;if(this.buffer&&r!==this.buffer.byteLength)throw new Error(`Buffer size is immutable, byte length ${r} !== ${this.buffer.byteLength}.`);let a=!this.buffer;if(this.buffer=this.buffer||this.device.createBuffer({byteLength:r}),a||(a=!eL(s,this.bufferValue)),a){const c=Vv(n.constructor,o);QC({target:c,source:s,start:0,count:o}),this.buffer.write(c),this.bufferValue=n}return this.buffer}}function JC(i){return Array.isArray(i)?new Float32Array(i):i}function eL(i,e){if(!i||!e||i.length!==e.length||i.constructor!==e.constructor)return!1;for(let t=0;t<i.length;++t)if(i[t]!==e[t])return!1;return!0}class tL extends Ro{constructor(t,n){super(t,n);h(this,"device");h(this,"gl");h(this,"handle");h(this,"layout");h(this,"buffers",{});h(this,"unusedBuffers",{});h(this,"bindOnUse",!0);h(this,"_bound",!1);this.device=t,this.gl=t.gl,this.handle=this.props.handle||this.gl.createTransformFeedback(),this.layout=this.props.layout,n.buffers&&this.setBuffers(n.buffers),Object.seal(this)}destroy(){this.gl.deleteTransformFeedback(this.handle),super.destroy()}begin(t="point-list"){this.gl.bindTransformFeedback(36386,this.handle),this.bindOnUse&&this._bindBuffers(),this.gl.beginTransformFeedback(XC(t))}end(){this.gl.endTransformFeedback(),this.bindOnUse&&this._unbindBuffers(),this.gl.bindTransformFeedback(36386,null)}setBuffers(t){this.buffers={},this.unusedBuffers={},this.bind(()=>{for(const[n,s]of Object.entries(t))this.setBuffer(n,s)})}setBuffer(t,n){const s=this._getVaryingIndex(t),{buffer:r,byteLength:o,byteOffset:a}=this._getBufferRange(n);if(s<0){this.unusedBuffers[t]=r,S.warn(`${this.id} unusedBuffers varying buffer ${t}`)();return}this.buffers[s]={buffer:r,byteLength:o,byteOffset:a},this.bindOnUse||this._bindBuffer(s,r,a,o)}getBuffer(t){if(Hh(t))return this.buffers[t]||null;const n=this._getVaryingIndex(t);return this.buffers[n]??null}bind(t=this.handle){if(typeof t!="function")return this.gl.bindTransformFeedback(36386,t),this;let n;return this._bound?n=t():(this.gl.bindTransformFeedback(36386,this.handle),this._bound=!0,n=t(),this._bound=!1,this.gl.bindTransformFeedback(36386,null)),n}unbind(){this.bind(null)}_getBufferRange(t){if(t instanceof Wi)return{buffer:t,byteOffset:0,byteLength:t.byteLength};const{buffer:n,byteOffset:s=0,byteLength:r=t.buffer.byteLength}=t;return{buffer:n,byteOffset:s,byteLength:r}}_getVaryingIndex(t){if(Hh(t))return Number(t);for(const n of this.layout.varyings||[])if(t===n.name)return n.location;return-1}_bindBuffers(){for(const[t,n]of Object.entries(this.buffers)){const{buffer:s,byteLength:r,byteOffset:o}=this._getBufferRange(n);this._bindBuffer(Number(t),s,o,r)}}_unbindBuffers(){for(const t in this.buffers)this.gl.bindBufferBase(35982,Number(t),null)}_bindBuffer(t,n,s=0,r){const o=n&&n.handle;!o||r===void 0?this.gl.bindBufferBase(35982,t,o):this.gl.bindBufferRange(35982,t,o,s,r)}}function Hh(i){return typeof i=="number"?Number.isInteger(i):/^\d+$/.test(i)}class iL extends Oo{constructor(t,n){super(t,n);h(this,"device");h(this,"handle");h(this,"_timestampPairs",[]);h(this,"_pendingReads",new Set);h(this,"_occlusionQuery",null);h(this,"_occlusionActive",!1);if(this.device=t,n.type==="timestamp"){if(n.count<2)throw new Error("Timestamp QuerySet requires at least two query slots");this._timestampPairs=new Array(Math.ceil(n.count/2)).fill(null).map(()=>({activeQuery:null,completedQueries:[]})),this.handle=null}else{if(n.count>1)throw new Error("WebGL occlusion QuerySet can only have one value");const s=this.device.gl.createQuery();if(!s)throw new Error("WebGL query not supported");this.handle=s}Object.seal(this)}get[Symbol.toStringTag](){return"QuerySet"}destroy(){if(!this.destroyed){this.handle&&this.device.gl.deleteQuery(this.handle);for(const t of this._timestampPairs){t.activeQuery&&(this._cancelPendingQuery(t.activeQuery),this.device.gl.deleteQuery(t.activeQuery.handle));for(const n of t.completedQueries)this._cancelPendingQuery(n),this.device.gl.deleteQuery(n.handle)}this._occlusionQuery&&(this._cancelPendingQuery(this._occlusionQuery),this.device.gl.deleteQuery(this._occlusionQuery.handle));for(const t of Array.from(this._pendingReads))this._cancelPendingQuery(t);this.destroyResource()}}isResultAvailable(t){return this.props.type==="timestamp"?t===void 0?this._timestampPairs.some((n,s)=>this._isTimestampPairAvailable(s)):this._isTimestampPairAvailable(this._getTimestampPairIndex(t)):this._occlusionQuery?this._pollQueryAvailability(this._occlusionQuery):!1}async readResults(t){const n=t?.firstQuery||0,s=t?.queryCount||this.props.count-n;if(this._validateRange(n,s),this.props.type==="timestamp"){const r=new Array(s).fill(0n),o=Math.floor(n/2),a=Math.floor((n+s-1)/2);for(let c=o;c<=a;c++){const l=await this._consumeTimestampPairResult(c),u=c*2,f=u+1;u>=n&&u<n+s&&(r[u-n]=0n),f>=n&&f<n+s&&(r[f-n]=l)}return r}if(!this._occlusionQuery)throw new Error("Occlusion query has not been started");return[await this._consumeQueryResult(this._occlusionQuery)]}async readTimestampDuration(t,n){if(this.props.type!=="timestamp")throw new Error("Timestamp durations require a timestamp QuerySet");if(t<0||n>=this.props.count||n<=t)throw new Error("Timestamp duration range is out of bounds");if(t%2!==0||n!==t+1)throw new Error("WebGL timestamp durations require adjacent even/odd query indices");const s=await this._consumeTimestampPairResult(this._getTimestampPairIndex(t));return Number(s)/1e6}beginOcclusionQuery(){if(this.props.type!=="occlusion")throw new Error("Occlusion queries require an occlusion QuerySet");if(!this.handle)throw new Error("WebGL occlusion query is not available");if(this._occlusionActive)throw new Error("Occlusion query is already active");this.device.gl.beginQuery(35887,this.handle),this._occlusionQuery={handle:this.handle,promise:null,result:null,disjoint:!1,cancelled:!1,pollRequestId:null,resolve:null,reject:null},this._occlusionActive=!0}endOcclusionQuery(){if(!this._occlusionActive)throw new Error("Occlusion query is not active");this.device.gl.endQuery(35887),this._occlusionActive=!1}writeTimestamp(t){if(this.props.type!=="timestamp")throw new Error("Timestamp writes require a timestamp QuerySet");const n=this._getTimestampPairIndex(t),s=this._timestampPairs[n];if(t%2===0){if(s.activeQuery)throw new Error("Timestamp query pair is already active");const r=this.device.gl.createQuery();if(!r)throw new Error("WebGL query not supported");const o={handle:r,promise:null,result:null,disjoint:!1,cancelled:!1,pollRequestId:null,resolve:null,reject:null};this.device.gl.beginQuery(35007,r),s.activeQuery=o;return}if(!s.activeQuery)throw new Error("Timestamp query pair was ended before it was started");this.device.gl.endQuery(35007),s.completedQueries.push(s.activeQuery),s.activeQuery=null}_validateRange(t,n){if(t<0||n<0||t+n>this.props.count)throw new Error("Query read range is out of bounds")}_getTimestampPairIndex(t){if(t<0||t>=this.props.count)throw new Error("Query index is out of bounds");return Math.floor(t/2)}_isTimestampPairAvailable(t){const n=this._timestampPairs[t];return!n||n.completedQueries.length===0?!1:this._pollQueryAvailability(n.completedQueries[0])}_pollQueryAvailability(t){if(t.cancelled||this.destroyed)return t.result=0n,!0;if(t.result!==null||t.disjoint)return!0;if(!this.device.gl.getQueryParameter(t.handle,34919))return!1;const s=!!this.device.gl.getParameter(36795);return t.disjoint=s,t.result=s?0n:BigInt(this.device.gl.getQueryParameter(t.handle,34918)),!0}async _consumeTimestampPairResult(t){const n=this._timestampPairs[t];if(!n||n.completedQueries.length===0)throw new Error("Timestamp query pair has no completed result");const s=n.completedQueries.shift();try{return await this._consumeQueryResult(s)}finally{this.device.gl.deleteQuery(s.handle)}}_consumeQueryResult(t){return t.promise||(this._pendingReads.add(t),t.promise=new Promise((n,s)=>{t.resolve=n,t.reject=s;const r=()=>{if(t.pollRequestId=null,t.cancelled||this.destroyed){this._pendingReads.delete(t),t.promise=null,t.resolve=null,t.reject=null,n(0n);return}if(!this._pollQueryAvailability(t)){t.pollRequestId=this._requestAnimationFrame(r);return}this._pendingReads.delete(t),t.promise=null,t.resolve=null,t.reject=null,t.disjoint?s(new Error("GPU timestamp query was invalidated by a disjoint event")):n(t.result||0n)};r()})),t.promise}_cancelPendingQuery(t){if(this._pendingReads.delete(t),t.cancelled=!0,t.pollRequestId!==null&&(this._cancelAnimationFrame(t.pollRequestId),t.pollRequestId=null),t.resolve){const n=t.resolve;t.promise=null,t.resolve=null,t.reject=null,n(0n)}}_requestAnimationFrame(t){return requestAnimationFrame(t)}_cancelAnimationFrame(t){cancelAnimationFrame(t)}}class nL extends Bo{constructor(t,n={}){super(t,{});h(this,"device");h(this,"gl");h(this,"handle");h(this,"signaled");h(this,"_signaled",!1);this.device=t,this.gl=t.gl;const s=this.props.handle||this.gl.fenceSync(this.gl.SYNC_GPU_COMMANDS_COMPLETE,0);if(!s)throw new Error("Failed to create WebGL fence");this.handle=s,this.signaled=new Promise(r=>{const o=()=>{const a=this.gl.clientWaitSync(this.handle,0,0);a===this.gl.ALREADY_SIGNALED||a===this.gl.CONDITION_SATISFIED?(this._signaled=!0,r()):setTimeout(o,1)};o()})}isSignaled(){if(this._signaled)return!0;const t=this.gl.getSyncParameter(this.handle,this.gl.SYNC_STATUS);return this._signaled=t===this.gl.SIGNALED,this._signaled}destroy(){this.destroyed||this.gl.deleteSync(this.handle)}}function Yh(i){switch(i){case 6406:case 33326:case 6403:case 36244:return 1;case 33339:case 33340:case 33328:case 33320:case 33319:return 2;case 6407:case 36248:case 34837:return 3;case 6408:case 36249:case 34836:return 4;default:return 0}}function sL(i){switch(i){case 5121:return 1;case 33635:case 32819:case 32820:return 2;case 5126:return 4;default:return 0}}function rL(i,e){const{sourceX:t=0,sourceY:n=0,sourceAttachment:s=0}=e||{};let{target:r=null,sourceWidth:o,sourceHeight:a,sourceDepth:c,sourceFormat:l,sourceType:u}=e||{};const{framebuffer:f,deleteFramebuffer:d}=qh(i),{gl:g,handle:p}=f;o||(o=f.width),a||(a=f.height);const m=f.colorAttachments[s]?.texture;if(!m)throw new Error(`Invalid framebuffer attachment ${s}`);c=m?.depth||1,l||(l=m?.glFormat||6408),u||(u=m?.glType||5121),r=cL(r,u,l,o,a);const y=Ie.getDataType(r);u=u||SC(y);const _=g.bindFramebuffer(36160,p);return g.readBuffer(36064+s),g.readPixels(t,n,o,a,l,u,r),g.readBuffer(36064),g.bindFramebuffer(36160,_||null),d&&f.destroy(),r}function oL(i,e){const{target:t,sourceX:n=0,sourceY:s=0,sourceFormat:r=6408,targetByteOffset:o=0}=e||{};let{sourceWidth:a,sourceHeight:c,sourceType:l}=e||{};const{framebuffer:u,deleteFramebuffer:f}=qh(i);a=a||u.width,c=c||u.height;const d=u;l=l||5121;let g=t;if(!g){const m=Yh(r),y=sL(l),_=o+a*c*m*y;g=d.device.createBuffer({byteLength:_})}const p=i.device.createCommandEncoder();return p.copyTextureToBuffer({sourceTexture:i,width:a,height:c,origin:[n,s],destinationBuffer:g,byteOffset:o}),p.destroy(),f&&u.destroy(),g}function qh(i){return i instanceof Hn?{framebuffer:i,deleteFramebuffer:!1}:{framebuffer:aL(i),deleteFramebuffer:!0}}function aL(i,e){const{device:t,width:n,height:s,id:r}=i;return t.createFramebuffer({...e,id:`framebuffer-for-${r}`,width:n,height:s,colorAttachments:[i]})}function cL(i,e,t,n,s,r){if(i)return i;e||(e=5121);const o=Dh(e),a=Ie.getTypedArrayConstructor(o),c=Yh(t);return new a(n*s*c)}class Tt extends Ft{constructor(t){super({...t,id:t.id||rC("webgl-device")});h(this,"type","webgl");h(this,"handle");h(this,"features");h(this,"limits");h(this,"info");h(this,"canvasContext");h(this,"preferredColorFormat","rgba8unorm");h(this,"preferredDepthFormat","depth24plus");h(this,"commandEncoder");h(this,"lost");h(this,"_resolveContextLost");h(this,"_isLost",!1);h(this,"gl");h(this,"_constants");h(this,"extensions");h(this,"_polyfilled",!1);h(this,"spectorJS");const n=Ft._getCanvasContextProps(t);if(!n)throw new Error("WebGLDevice requires props.createCanvasContext to be set");const s=n.canvas?.gl??null;let r=Tt.getDeviceFromContext(s);if(r)throw new Error(`WebGL context already attached to device ${r.id}`);this.canvasContext=new nC(this,n),this.lost=new Promise(f=>{this._resolveContextLost=f});const o={...t.webgl};n.alphaMode==="premultiplied"&&(o.premultipliedAlpha=!0),t.powerPreference!==void 0&&(o.powerPreference=t.powerPreference),t.failIfMajorPerformanceCaveat!==void 0&&(o.failIfMajorPerformanceCaveat=t.failIfMajorPerformanceCaveat);const c=this.props._handle||k3(this.canvasContext.canvas,{onContextLost:f=>this._resolveContextLost?.({reason:"destroyed",message:"Entered sleep mode, or too many apps or browser tabs are using the GPU."}),onContextRestored:f=>{console.log("WebGL context restored")}},o);if(!c)throw new Error("WebGL context creation failed");if(r=Tt.getDeviceFromContext(c),r){if(t._reuseDevices)return S.log(1,`Not creating a new Device, instead returning a reference to Device ${r.id} already attached to WebGL context`,r)(),this.canvasContext.destroy(),r._reused=!0,r;throw new Error(`WebGL context already attached to device ${r.id}`)}this.handle=c,this.gl=c,this.spectorJS=S3({...this.props,gl:this.handle});const l=Ka(this.handle);l.device=this,l.extensions||(l.extensions={}),this.extensions=l.extensions,this.info=D3(this.gl,this.extensions),this.limits=new eC(this.gl),this.features=new J3(this.gl,this.extensions,this.props._disabledFeatures),this.props._initializeFeatures&&this.features.initializeFeatures(),new St(this.gl,{log:(...f)=>S.log(1,...f)()}).trackState(this.gl,{copyState:!1}),(t.debug||t.debugWebGL)&&(this.gl=w3(this.gl,{traceWebGL:t.debugWebGL}),S.warn("WebGL debug mode activated. Performance reduced.")()),t.debugWebGL&&(S.level=Math.max(S.level,1)),this.commandEncoder=new Wh(this,{id:`${this}-command-encoder`}),this.canvasContext._startObservers()}static getDeviceFromContext(t){return t?t.luma?.device??null:null}get[Symbol.toStringTag](){return"WebGLDevice"}toString(){return`${this[Symbol.toStringTag]}(${this.id})`}isVertexFormatSupported(t){switch(t){case"unorm8x4-bgra":return!1;default:return!0}}destroy(){if(!this.props._reuseDevices&&!this._reused){this._isLost=!0,this.commandEncoder?.destroy();const t=Ka(this.handle);t.device=null}}get isLost(){return this._isLost||this.gl.isContextLost()}createCanvasContext(t){throw new Error("WebGL only supports a single canvas")}createPresentationContext(t){return new sC(this,t||{})}createBuffer(t){const n=this._normalizeBufferProps(t);return new Wi(this,n)}createTexture(t){return new Hi(this,t)}createExternalTexture(t){throw new Error("ExternalTexture is not available on WebGL")}createSampler(t){return new yC(this,t)}createShader(t){return new lC(this,t)}createFramebuffer(t){return new ji(this,t)}createVertexArray(t){return new lc(this,t)}createTransformFeedback(t){return new tL(this,t)}createQuerySet(t){return new iL(this,t)}createFence(){return new nL(this)}createRenderPipeline(t){return new UC(this,t)}_createSharedRenderPipelineWebGL(t){return new GC(this,t)}createComputePipeline(t){throw new Error("ComputePipeline not supported in WebGL")}createRenderBundleEncoder(t){throw new Error("Render bundles are only supported in WebGPU")}createCommandEncoder(t={}){return new Wh(this,t)}submit(t){let n=null;t||({submittedCommandEncoder:n,commandBuffer:t}=this._finalizeDefaultCommandEncoderForSubmit());try{t._executeCommands(),n&&n.resolveTimeProfilingQuerySet().then(()=>{this.commandEncoder._gpuTimeMs=n._gpuTimeMs}).catch(()=>{})}finally{t.destroy()}}writeBufferViaCommandEncoder(t,n,s,r=0){n.write(s,r)}_finalizeDefaultCommandEncoderForSubmit(){const t=this.commandEncoder,n=t.finish();return this.commandEncoder.destroy(),this.commandEncoder=this.createCommandEncoder({id:t.props.id,timeProfilingQuerySet:t.getTimeProfilingQuerySet()}),{submittedCommandEncoder:t,commandBuffer:n}}readPixelsToArrayWebGL(t,n){return rL(t,n)}readPixelsToBufferWebGL(t,n){return oL(t,n)}setParametersWebGL(t){si(this.gl,t)}getParametersWebGL(t){return Ph(this.gl,t)}withParametersWebGL(t,n){return st(this.gl,t,n)}resetWebGL(){S.warn("WebGLDevice.resetWebGL is deprecated, use only for debugging")(),I3(this.gl)}_getDeviceSpecificTextureFormatCapabilities(t){return q3(this.gl,t,this.extensions)}loseDevice(){let t=!1;const s=this.getExtension("WEBGL_lose_context").WEBGL_lose_context;return s&&(t=!0,s.loseContext()),this._resolveContextLost?.({reason:"destroyed",message:"Application triggered context loss"}),t}pushState(){St.get(this.gl).push()}popState(){St.get(this.gl).pop()}getGLKey(t,n){const s=Number(t);for(const r in this.gl)if(this.gl[r]===s)return`GL.${r}`;return n?.emptyIfUnknown?"":String(t)}getGLKeys(t){const n={emptyIfUnknown:!0};return Object.entries(t).reduce((s,[r,o])=>(s[`${r}:${this.getGLKey(r,n)}`]=`${o}:${this.getGLKey(o,n)}`,s),{})}setConstantAttributeWebGL(t,n){const s=this.limits.maxVertexAttributes;this._constants=this._constants||new Array(s).fill(null);const r=this._constants[t];switch(r&&dL(r,n)&&S.info(1,`setConstantAttributeWebGL(${t}) could have been skipped, value unchanged`)(),this._constants[t]=n,n.constructor){case Float32Array:lL(this,t,n);break;case Int32Array:uL(this,t,n);break;case Uint32Array:fL(this,t,n);break;default:throw new Error("constant")}}getExtension(t){return Et(this.gl,t,this.extensions),this.extensions}_setWebGLDebugMetadata(t,n,s){t.luma=n;const r={props:s.spector,id:s.spector.id};t.__SPECTOR_Metadata=r}}function lL(i,e,t){switch(t.length){case 1:i.gl.vertexAttrib1fv(e,t);break;case 2:i.gl.vertexAttrib2fv(e,t);break;case 3:i.gl.vertexAttrib3fv(e,t);break;case 4:i.gl.vertexAttrib4fv(e,t);break}}function uL(i,e,t){i.gl.vertexAttribI4iv(e,t)}function fL(i,e,t){i.gl.vertexAttribI4uiv(e,t)}function dL(i,e){if(!i||!e||i.length!==e.length||i.constructor!==e.constructor)return!1;for(let t=0;t<i.length;++t)if(i[t]!==e[t])return!1;return!0}const Xh=Object.freeze(Object.defineProperty({__proto__:null,WebGLDevice:Tt},Symbol.toStringTag,{value:"Module"}));function Ye(){}const Zh={id:"",width:"100%",height:"100%",style:null,viewState:null,initialViewState:null,pickingRadius:0,pickAsync:"auto",layerFilter:null,parameters:{},parent:null,device:null,deviceProps:{},gl:null,canvas:null,_canvases:null,layers:[],effects:[],views:null,controller:null,useDevicePixels:!0,touchAction:"none",eventRecognizerOptions:{},_framebuffer:null,_animate:!1,_pickable:!0,_typedArrayManagerProps:{},_customRender:null,widgets:[],onDeviceInitialized:Ye,onWebGLInitialized:Ye,onResize:Ye,onViewStateChange:Ye,onInteractionStateChange:Ye,onBeforeRender:Ye,onAfterRender:Ye,onLoad:Ye,onError:i=>D.error(i.message,i.cause)(),onHover:null,onClick:null,onDragStart:null,onDrag:null,onDragEnd:null,_onMetrics:null,getCursor:({isDragging:i})=>i?"grabbing":"grab",getTooltip:null,debug:!1,drawPickingColors:!1};class uc{constructor(e){this.width=0,this.height=0,this.userData={},this.device=null,this.canvas=null,this.viewManager=null,this.layerManager=null,this.effectManager=null,this.deckRenderer=null,this.deckPicker=null,this.eventManager=null,this.eventManagers={},this.widgetManager=null,this.tooltip=null,this.animationLoop=null,this._canvasContext=null,this._deviceResizeHandler=null,this.cursorState={isHovering:!1,isDragging:!1},this.stats=new vn({id:"deck.gl"}),this.metrics={fps:0,setPropsTime:0,layersCount:0,drawLayersCount:0,updateLayersCount:0,updateAttributesCount:0,updateAttributesTime:0,framesRedrawn:0,pickTime:0,pickCount:0,pickLayersCount:0,gpuTime:0,gpuTimePerFrame:0,cpuTime:0,cpuTimePerFrame:0,bufferMemory:0,textureMemory:0,renderbufferMemory:0,gpuMemory:0},this._metricsCounter=0,this._hoverPickSequence=0,this._pointerDownPickSequence=0,this._needsRedraw="Initial render",this._canvasManager=new g3({createEventManager:s=>this._createEventManager(s),getEventRoot:s=>this._getEventRoot(s)}),this._ownedCanvas=null,this._pickRequest={mode:"hover",x:-1,y:-1,radius:0,canvasId:void 0,event:null,unproject3D:!1},this._lastPointerDownInfo=null,this._lastPointerDownInfoPromise=null,this._onPointerMove=s=>{const{_pickRequest:r}=this,o=this._getCanvasIdFromEvent(s);if(s.type==="pointerleave")r.x=-1,r.y=-1,r.radius=0,r.canvasId=o;else{if(s.leftButton||s.rightButton)return;{const a=s.offsetCenter;if(!a)return;r.x=a.x,r.y=a.y,r.radius=this.props.pickingRadius,r.canvasId=o}}this.layerManager&&(this.layerManager.context.mousePosition={x:r.x,y:r.y}),r.event=s},this._onEvent=s=>{const r=gs[s.type],o=s.offsetCenter,a=this._getCanvasIdFromEvent(s);if(!r||!o||!this.layerManager)return;const c=this.layerManager.getLayers(),l=this._getInternalPickingMode();if(!l)return;if(l==="sync"){const f=s.type==="click"&&this._shouldUnproject3D(c)?this._getFirstPickedInfo(this._pickPointSync(this._getPointPickOptions(o.x,o.y,{unproject3D:!0,canvasId:a},c))):this._getLastPointerDownPickingInfo(o.x,o.y,a,c);this._dispatchPickingEvent(f,s);return}(this._lastPointerDownInfoPromise||Promise.resolve(this._getLastPointerDownPickingInfo(o.x,o.y,a,c))).then(f=>{this._dispatchPickingEvent(f,s)}).catch(f=>this.props.onError?.(f))},this._onPointerDown=s=>{const r=s.offsetCenter,o=this._getCanvasIdFromEvent(s);if(!r)return;const a=this._getInternalPickingMode();if(!a)return;const c=this.layerManager?.getLayers()||[],l=++this._pointerDownPickSequence;if(a==="sync"){const f=this._pickPointSync({x:r.x,y:r.y,canvasId:o,radius:this.props.pickingRadius}),d=this._getFirstPickedInfo(f);this._lastPointerDownInfo=d,this._lastPointerDownInfoPromise=Promise.resolve(d);return}const u=this._pickPointAsync(this._getPointPickOptions(r.x,r.y,{canvasId:o},c)).then(f=>this._getFirstPickedInfo(f)).then(f=>(l===this._pointerDownPickSequence&&(this._lastPointerDownInfo=f),f)).catch(f=>{this.props.onError?.(f);const d=this.deckPicker&&this.viewManager?this._getLastPointerDownPickingInfo(r.x,r.y,o,c):{};return l===this._pointerDownPickSequence&&(this._lastPointerDownInfo=d),d});this._lastPointerDownInfo=null,this._lastPointerDownInfoPromise=u};const t=e;this.props={...Zh,...e},e=this.props,this._validateCanvasConfiguration(e),e.viewState&&e.initialViewState&&D.warn("View state tracking is disabled. Use either `initialViewState` for auto update or `viewState` for manual update.")(),this.viewState=this.props.initialViewState,e.device&&(this.device=e.device,this._setDeviceCanvasContext(e.device));let n=this.device;!n&&e.gl&&(e.gl instanceof WebGLRenderingContext&&D.error("WebGL1 context not supported.")(),n=qa.attach(e.gl,{_cacheShaders:!0,_cachePipelines:!0,...this.props.deviceProps})),n||(n=this._createDevice(e)),this.animationLoop=this._createAnimationLoop(n,e),this.setProps(t),e._typedArrayManagerProps&&Kt.setOptions(e._typedArrayManagerProps),this.animationLoop.start()}finalize(){this._restoreDeviceResizeHandler(),this.animationLoop?.stop(),this.animationLoop?.destroy(),this.animationLoop=null,this._hoverPickSequence++,this._pointerDownPickSequence++,this._lastPointerDownInfo=null,this._lastPointerDownInfoPromise=null,this.layerManager?.finalize(),this.layerManager=null,this.viewManager?.finalize(),this.viewManager=null,this.effectManager?.finalize(),this.effectManager=null,this.deckRenderer?.finalize(),this.deckRenderer=null,this.deckPicker?.finalize(),this.deckPicker=null,Object.keys(this._canvasManager.targets).length||this.eventManager?.destroy(),this.eventManager=null,this.eventManagers={},this.widgetManager?.finalize(),this.widgetManager=null,this._canvasManager.finalize(),this._isMultiCanvasMode()?this.canvas=null:this.canvas&&this.canvas===this._ownedCanvas&&(this.canvas.parentElement?.removeChild(this.canvas),this.canvas=null,this._ownedCanvas=null),this._canvasContext=null}setProps(e){this.stats.get("setProps Time").timeStart(),"onLayerHover"in e&&D.removed("onLayerHover","onHover")(),"onLayerClick"in e&&D.removed("onLayerClick","onClick")(),e.initialViewState&&!ee(this.props.initialViewState,e.initialViewState,3)&&(this.viewState=e.initialViewState),W(!("_canvases"in e)||Array.isArray(e._canvases)===this._isMultiCanvasMode()),Object.assign(this.props,e),this._validateCanvasConfiguration(this.props),this._validateInternalPickingMode(),this.device&&this._isMultiCanvasMode()&&this._syncCanvasTargets(),this._setCanvasSize(this.props);const t=Object.create(this.props);if(Object.assign(t,{views:this._getViews(),width:this.width,height:this.height,viewState:this._getViewState(),eventManagers:this.eventManagers}),e.device&&e.device.id!==this.device?.id){const n=e.device.getDefaultCanvasContext();this.animationLoop?.stop(),!this._isMultiCanvasMode()&&this.canvas!==n.canvas&&(this.canvas?.remove(),this.eventManager?.destroy(),this.canvas=null),this._setDeviceCanvasContext(e.device),D.log(`recreating animation loop for new device! id=${e.device.id}`)(),this.animationLoop=this._createAnimationLoop(e.device,e),this.animationLoop.start()}if(this.animationLoop?.setProps(t),e.useDevicePixels!==void 0&&this._canvasContext?.setProps){this._canvasContext.setProps({useDevicePixels:e.useDevicePixels});for(const n of Object.values(this._canvasManager.targets))n.presentationContext.setProps({useDevicePixels:e.useDevicePixels})}this.layerManager&&(this.viewManager.setProps(t),this.layerManager.activateViewport(this.getViewports()[0]),this.layerManager.setProps(t),this.effectManager.setProps(t),this.deckRenderer.setProps(t),this.deckPicker.setProps(t),this.widgetManager.setProps(t)),this.stats.get("setProps Time").timeEnd()}needsRedraw(e={clearRedrawFlags:!1}){if(!this.layerManager)return!1;if(this.props._animate)return"Deck._animate";let t=this._needsRedraw;e.clearRedrawFlags&&(this._needsRedraw=!1);const n=this.viewManager.needsRedraw(e),s=this.layerManager.needsRedraw(e),r=this.effectManager.needsRedraw(e),o=this.deckRenderer.needsRedraw(e);return t=t||n||s||r||o,t}redraw(e){if(!this.layerManager)return;let t=this.needsRedraw({clearRedrawFlags:!0});t=e||t,t&&(this.stats.get("Redraw Count").incrementCount(),this.props._customRender?this.props._customRender(t):this._drawLayers(t))}get isInitialized(){return this.viewManager!==null}getViews(){return W(this.viewManager),this.viewManager.views}getView(e){return W(this.viewManager),this.viewManager.getView(e)}getViewports(e){return W(this.viewManager),this.viewManager.getViewports(e)}getCanvas(){return this.canvas}getCanvasContext(e){const t=e?this.viewManager?.getView(e)?.props.canvasId:void 0;return this._getCanvasContext(t)}getEventManager(e){if(!e||!this.viewManager)return this.eventManager;const t=this.viewManager.getCanvasId(e)||ii;return this.eventManagers[t]||this.eventManager}async pickObjectAsync(e){const t=(await this._pickAsync("pickObjectAsync","pickObject Time",e)).result;return t.length?t[0]:null}async pickObjectsAsync(e){return await this._pickAsync("pickObjectsAsync","pickObjects Time",e)}pickObject(e){const t=this._pick("pickObject","pickObject Time",e).result;return t.length?t[0]:null}pickMultipleObjects(e){return e.depth=e.depth||10,this._pick("pickObject","pickMultipleObjects Time",e).result}pickObjects(e){return this._pick("pickObjects","pickObjects Time",e)}_pickPositionForController(e,t,n){return this._getInternalPickingMode()!=="sync"?null:this.pickObject({x:e,y:t,radius:0,unproject3D:!0,canvasId:n?this.viewManager?.getCanvasId(n):void 0})}_addResources(e,t=!1){for(const n in e)this.layerManager.resourceManager.add({resourceId:n,data:e[n],forceUpdate:t})}_removeResources(e){for(const t of e)this.layerManager.resourceManager.remove(t)}_addDefaultEffect(e){this.effectManager.addDefaultEffect(e)}_addDefaultShaderModule(e){this.layerManager.addDefaultShaderModule(e)}_removeDefaultShaderModule(e){this.layerManager?.removeDefaultShaderModule(e)}_resolveInternalPickingMode(){const{pickAsync:e}=this.props,t=this.device?.type||this.props.deviceProps?.type;if(e==="auto")return t==="webgpu"?"async":"sync";if(e==="sync"&&t==="webgpu")throw new Error('`pickAsync: "sync"` is not supported when Deck is using a WebGPU device.');return e}_getInternalPickingMode(){try{return this._resolveInternalPickingMode()}catch(e){return this.props.onError?.(e),null}}_validateInternalPickingMode(){this._getInternalPickingMode()}_getFirstPickedInfo({result:e,emptyInfo:t}){return e[0]||t}_shouldUnproject3D(e=this.layerManager?.getLayers()||[]){return e.some(t=>t.props.pickable==="3d")}_getPointPickOptions(e,t,n={},s=this.layerManager?.getLayers()||[]){return{x:e,y:t,canvasId:n.canvasId,radius:this.props.pickingRadius,unproject3D:this._shouldUnproject3D(s),...n}}_pickPointSync(e){return this._pick("pickObject","pickObject Time",e)}_pickPointAsync(e){return this._pickAsync("pickObjectAsync","pickObject Time",e)}_getLastPointerDownPickingInfo(e,t,n,s=this.layerManager?.getLayers()||[]){return this.deckPicker.getLastPickedObject({x:e,y:t,layers:s,viewports:this.getViewports({x:e,y:t,canvasId:n})},this._lastPointerDownInfo)}_applyHoverCallbacks({result:e,emptyInfo:t},n){if(!this.widgetManager)return;this.cursorState.isHovering=e.length>0;let s=t,r=!1;for(const o of e)s=o,r=o.layer?.onHover(o,n)||r;r||(this.props.onHover?.(s,n),this.widgetManager.onHover(s,n))}_dispatchPickingEvent(e,t){if(!this.layerManager||!this.widgetManager)return;const n=gs[t.type];if(!n)return;const{layer:s}=e,r=s&&(s[n]||s.props[n]),o=this.props[n];let a=!1;r&&(a=r.call(s,e,t)),a||(o?.(e,t),this.widgetManager.onEvent(e,t))}_pickAsync(e,t,n){W(this.deckPicker);const{stats:s}=this,r=this._isMultiCanvasMode()?n.canvasId||this._getDefaultCanvasId():n.canvasId,o=this._getCanvasContext(r)||void 0;s.get("Pick Count").incrementCount(),s.get(t).timeStart(),this._resizeForCanvasTarget(r);const a=this.deckPicker[e]({layers:this.layerManager.getLayers(n),views:this.viewManager.getViews(),viewports:this.getViewports({...n,canvasId:r}),onViewportActive:this.layerManager.activateViewport,effects:this.effectManager.getEffects(),...n,canvasId:r,canvasContext:o});return s.get(t).timeEnd(),a}_pick(e,t,n){W(this.deckPicker);const{stats:s}=this,r=this._isMultiCanvasMode()?n.canvasId||this._getDefaultCanvasId():n.canvasId,o=this._getCanvasContext(r)||void 0;s.get("Pick Count").incrementCount(),s.get(t).timeStart(),this._resizeForCanvasTarget(r);const a=this.deckPicker[e]({layers:this.layerManager.getLayers(n),views:this.viewManager.getViews(),viewports:this.getViewports({...n,canvasId:r}),onViewportActive:this.layerManager.activateViewport,effects:this.effectManager.getEffects(),...n,canvasId:r,canvasContext:o});return s.get(t).timeEnd(),a}_createCanvas(e){let t=e.canvas;return typeof t=="string"&&(t=document.getElementById(t),W(t)),t?this._ownedCanvas=null:(t=document.createElement("canvas"),t.id=e.id||"deckgl-overlay",e.width&&typeof e.width=="number"&&(t.width=e.width),e.height&&typeof e.height=="number"&&(t.height=e.height),(e.parent||document.body).appendChild(t),this._ownedCanvas=t),Object.assign(t.style,e.style),t}_isMultiCanvasMode(){return Array.isArray(this.props._canvases)}_getDefaultCanvasId(){return this._canvasManager.order[0]||ii}_validateCanvasConfiguration(e){Array.isArray(e._canvases)&&(W(!e.canvas),W(!e.gl),W(!e.device?.canvasContext||e.device.getDefaultCanvasContext().offscreenCanvas))}_createEventManager(e){const t=new dP(e,{touchAction:this.props.touchAction,recognizers:Object.keys(_d).map(n=>{const[s,r,o,a]=_d[n],c=this.props.eventRecognizerOptions?.[n],l={...r,...c,event:n};return{recognizer:new s(l),recognizeWith:o,requireFailure:a}}),events:{pointerdown:this._onPointerDown,pointermove:this._onPointerMove,pointerleave:this._onPointerMove}});for(const n in gs)n==="dblclick"?t.watch(n,this._onEvent):t.on(n,this._onEvent);return t}_getEventRoot(e){return e.closest(".deck-events-root")||this.props.parent?.querySelector(".deck-events-root")||e}_syncCanvasTargets(){if(!this.device||!this._isMultiCanvasMode())return;this._canvasManager.syncCanvasEntries({device:this.device,canvases:this.props._canvases||[],useDevicePixels:this.props.useDevicePixels}),this.eventManagers=this._canvasManager.eventManagers;const e=this._getDefaultCanvasId();this.eventManager=this.eventManagers[e]||null,this.canvas=this._canvasManager.targets[e]?.canvas||null}_setCanvasContext(e){this._canvasContext=e,"style"in e.canvas&&(this.canvas=e.canvas)}_setDeviceCanvasContext(e,t={}){const n=e.getDefaultCanvasContext();this._setCanvasContext(n),this._setDeviceResizeHandler(e,t)}_setDeviceResizeHandler(e,t={}){const n=!!t.syncDrawingBuffer;if(this._deviceResizeHandler?.device===e){this._deviceResizeHandler.syncDrawingBuffer=n;return}this._restoreDeviceResizeHandler();const s=r=>{this._isMultiCanvasMode()?this._updateMultiCanvasDimensions():r===this._canvasContext&&this._canvasContext&&this._onCanvasContextResize(this._canvasContext,{syncDrawingBuffer:this._deviceResizeHandler?.syncDrawingBuffer})};e.props.onResize=s,this._deviceResizeHandler={device:e,onResize:s,syncDrawingBuffer:n}}_restoreDeviceResizeHandler(){const e=this._deviceResizeHandler;e&&e.device.props?.onResize===e.onResize&&(e.device.props.onResize=Ye),this._deviceResizeHandler=null}_setCanvasSize(e){if(this._isMultiCanvasMode()||!this.canvas)return;const{width:t,height:n}=e;if(t||t===0){const s=Number.isFinite(t)?`${t}px`:t;this.canvas.style.width=s}if(n||n===0){const s=Number.isFinite(n)?`${n}px`:n;this.canvas.style.position=e.style?.position||"absolute",this.canvas.style.height=s}}_getCanvasIdFromEvent(e){return this._canvasManager.getCanvasIdFromEvent(e?.rootElement)}_getCanvasContext(e){return this._canvasManager.getTarget(e)?.presentationContext||this._canvasContext}_resizeForCanvasTarget(e){const t=this._canvasManager.getTarget(e);if(!t||!this.device?.canvasContext)return;const[n,s]=t.presentationContext.getDrawingBufferSize();this.device.canvasContext.setDrawingBufferSize(n,s)}_createDeviceCanvas(e){if(this._isMultiCanvasMode()){const t=globalThis.OffscreenCanvas;if(!t)throw new Error("`_canvases` requires OffscreenCanvas support.");const n=typeof e.width=="number"&&Number.isFinite(e.width)?e.width:1,s=typeof e.height=="number"&&Number.isFinite(e.height)?e.height:1;return new t(n,s)}return this._createCanvas(e)}_updateCanvasSize(e=this._canvasContext){if(this._isMultiCanvasMode()){this._updateMultiCanvasDimensions();return}const{canvas:t}=this,[n,s]=e?e.getCSSSize():[t?.clientWidth??t?.width??0,t?.clientHeight??t?.height??0];(n!==this.width||s!==this.height)&&(this.width=n,this.height=s,this.viewManager?.setProps({width:n,height:s}),this.layerManager?.activateViewport(this.getViewports()[0]),this.props.onResize({width:n,height:s},e||void 0))}_onCanvasContextResize(e,t={}){if(t.syncDrawingBuffer){const{width:n,height:s}=e.canvas;e.setDrawingBufferSize(n,s)}this._needsRedraw="Canvas resized",this._updateCanvasSize(e)}_updateMultiCanvasDimensions(){const[e,t]=this._getCanvasContext()?.getCSSSize()||[0,0];(e!==this.width||t!==this.height)&&(this.width=e,this.height=t,this.props.onResize({width:e,height:t})),this._needsRedraw="Canvas resized",this.viewManager?.setNeedsUpdate("Canvas resized"),this.viewManager?.setProps({width:this.width,height:this.height})}_createAnimationLoop(e,t){const{gl:n,onError:s}=t;return new La({device:e,autoResizeDrawingBuffer:!n&&!Array.isArray(t._canvases),autoResizeViewport:!1,onInitialize:r=>this._setDevice(r.device),onRender:this._onRenderFrame.bind(this),onError:s})}_createDevice(e){const t=this.props.deviceProps?.createCanvasContext,n=typeof t=="object"?t:void 0,s={adapters:[],_cacheShaders:!0,_cachePipelines:!0,...e.deviceProps};s.adapters.includes(qa)||s.adapters.push(qa);const r={alphaMode:this.props.deviceProps?.type==="webgpu"?"premultiplied":void 0};return ao.createDevice({_reuseDevices:!0,type:"webgl",...s,createCanvasContext:{...r,...n,canvas:this._createDeviceCanvas(e),useDevicePixels:this.props.useDevicePixels,autoResize:!0}})}_getViewState(){return this.props.viewState||this.viewState}_getViews(){const{views:e}=this.props,t=Array.isArray(e)?e:e?[e]:[new Va({id:"default-view"})];return t.length&&this.props.controller&&(t[0]=t[0].clone({controller:this.props.controller})),t}_onContextLost(){const{onError:e}=this.props;this.animationLoop&&e&&e(new Error("WebGL context is lost"))}_pickAndCallback(){const{_pickRequest:e}=this;if(e.event){const t=e.event,n=this.layerManager?.getLayers()||[],s=this._getPointPickOptions(e.x,e.y,{canvasId:e.canvasId,radius:e.radius,mode:e.mode},n),r=this._getInternalPickingMode(),o=++this._hoverPickSequence;if(e.event=null,e.canvasId=void 0,!r)return;if(r==="sync"){this._applyHoverCallbacks(this._pickPointSync(s),t);return}this._pickPointAsync(s).then(({result:a,emptyInfo:c})=>{o===this._hoverPickSequence&&this._applyHoverCallbacks({result:a,emptyInfo:c},t)}).catch(a=>this.props.onError?.(a))}}_updateCursor(){const e=this.props.getCursor(this.cursorState);if(this._isMultiCanvasMode()){for(const n of Object.values(this._canvasManager.targets))n.canvas.style.cursor=e;return}const t=this.props.parent||this.canvas;t&&(t.style.cursor=e)}_setDevice(e){if(this.device=e,this._validateInternalPickingMode(),!this.animationLoop)return;this._setDeviceCanvasContext(e,{syncDrawingBuffer:!!(this.props.gl&&this.props.device!==e)}),this._isMultiCanvasMode()?this._syncCanvasTargets():this.canvas&&!this.canvas.isConnected&&this.props.parent&&this.props.parent.insertBefore(this.canvas,this.props.parent.firstChild),this.device.type==="webgl"&&this.device.setParametersWebGL({blend:!0,blendFunc:[770,771,1,771],polygonOffsetFill:!0,depthTest:!0,depthFunc:515}),this.props.onDeviceInitialized(this.device),this.device.type==="webgl"&&this.props.onWebGLInitialized(this.device.gl);const t=new Vd;if(t.play(),this.animationLoop.attachTimeline(t),!this._isMultiCanvasMode()){const r=this.canvas&&this._getEventRoot(this.canvas);W(r),this.eventManager=this._createEventManager(r),this.eventManagers={[ii]:this.eventManager}}this.viewManager=new IE({timeline:t,eventManager:this.eventManager,eventManagers:this.eventManagers,getCanvasContext:this._isMultiCanvasMode()?this.getCanvasContext.bind(this):void 0,onViewStateChange:this._onViewStateChange.bind(this),onInteractionStateChange:this._onInteractionStateChange.bind(this),pickPosition:this._pickPositionForController.bind(this),views:this._getViews(),viewState:this._getViewState(),width:this.width,height:this.height});const n=this.viewManager.getViewports()[0];this.layerManager=new AE(this.device,{deck:this,stats:this.stats,viewport:n,timeline:t}),this.effectManager=new i3({deck:this,device:this.device}),this.deckRenderer=new r3(this.device,{stats:this.stats}),this.deckPicker=new c3(this.device,{stats:this.stats});const s=this.props.parent?.querySelector(".deck-widgets-root")||(this._isMultiCanvasMode()?this.props.parent||this.canvas?.parentElement:null)||this.canvas?.parentElement;this.widgetManager=new f3({deck:this,parentElement:s}),this.widgetManager.addDefault(new ph),this.setProps({}),this._updateCanvasSize(this._canvasContext),this.props.onLoad()}_drawLayers(e,t){const{device:n,gl:s}=this.layerManager.context;this.props.onBeforeRender({device:n,gl:s});const r={target:this.props._framebuffer,layers:this.layerManager.getLayers(),viewports:this.viewManager.getViewports(),onViewportActive:this.layerManager.activateViewport,views:this.viewManager.getViews(),pass:"screen",effects:this.effectManager.getEffects(),...t};if(this._isMultiCanvasMode()&&r.pass==="screen"&&!r.target&&this._canvasManager.order.length)for(const o of this._canvasManager.order){const a=r.viewports.filter(u=>this.viewManager.getCanvasId(u.id)===o);if(!a.length){const u=this._canvasManager.targets[o];this._resizeForCanvasTarget(o),this.deckRenderer?.renderLayers({...r,canvasContext:u.presentationContext,target:u.presentationContext.getCurrentFramebuffer(),viewports:[],clearCanvas:!0}),u.presentationContext.present();continue}const c=this._canvasManager.targets[o];this._resizeForCanvasTarget(o);const l=c.presentationContext.getCurrentFramebuffer();this.deckRenderer?.renderLayers({...r,canvasContext:c.presentationContext,target:l,viewports:a}),c.presentationContext.present()}else this.deckRenderer?.renderLayers(r);r.pass==="screen"&&this.widgetManager.onRedraw({viewports:r.viewports,layers:r.layers}),this.props.onAfterRender({device:n,gl:s})}_onRenderFrame(){this._getFrameStats(),this._metricsCounter++%60===0&&(this._getMetrics(),this.stats.reset(),D.table(4,this.metrics)(),this.props._onMetrics&&this.props._onMetrics(this.metrics)),this._updateCursor(),this.layerManager.updateLayers(),this._pickAndCallback(),this.redraw(),this.viewManager&&this.viewManager.updateViewStates()}_onViewStateChange(e){const t=this.props.onViewStateChange(e)||e.viewState;this.viewState&&(this.viewState={...this.viewState,[e.viewId]:t},this.props.viewState||this.viewManager&&this.viewManager.setProps({viewState:this.viewState}))}_onInteractionStateChange(e){this.cursorState.isDragging=e.isDragging||!1,this.props.onInteractionStateChange(e)}_getFrameStats(){const{stats:e}=this;e.get("frameRate").timeEnd(),e.get("frameRate").timeStart();const t=this.animationLoop.stats;e.get("GPU Time").addTime(t.get("GPU Time").lastTiming),e.get("CPU Time").addTime(t.get("CPU Time").lastTiming)}_getMetrics(){const{metrics:e,stats:t}=this;e.fps=t.get("frameRate").getHz(),e.setPropsTime=t.get("setProps Time").time,e.updateAttributesTime=t.get("Update Attributes").time,e.framesRedrawn=t.get("Redraw Count").count,e.pickTime=t.get("pickObject Time").time+t.get("pickMultipleObjects Time").time+t.get("pickObjects Time").time,e.pickCount=t.get("Pick Count").count,e.layersCount=this.layerManager?.layers.length??0,e.drawLayersCount=t.get("Layers rendered").lastSampleCount,e.pickLayersCount=t.get("Layers picked").lastSampleCount,e.updateLayersCount=t.get("Layer updates").count,e.updateAttributesCount=t.get("Attributes updated").count,e.gpuTime=t.get("GPU Time").time,e.cpuTime=t.get("CPU Time").time,e.gpuTimePerFrame=t.get("GPU Time").getAverageTime(),e.cpuTimePerFrame=t.get("CPU Time").getAverageTime();const n=ao.stats.get("GPU Time and Memory");e.bufferMemory=n.get("Buffer Memory").count,e.textureMemory=n.get("Texture Memory").count,e.renderbufferMemory=n.get("Renderbuffer Memory").count,e.gpuMemory=n.get("GPU Memory").count}}uc.defaultProps=Zh,uc.VERSION=Ub;function hL(i){switch(i){case"float64":return Float64Array;case"uint8":case"unorm8":return Uint8ClampedArray;default:return uo(i)}}const gL=Ie.getDataType.bind(Ie);function Os(i,e,t){if(e.size>4)return null;const n=t==="webgpu"&&e.type==="uint8"?"unorm8":e.type,s=e.size,r=!!(t!=="webgpu"&&s===3&&n&&["uint8","sint8","unorm8","snorm8","uint16","sint16","unorm16","snorm16"].includes(n));return{attribute:i,format:s>1?`${n}x${s}${r?"-webgl":""}`:e.type,byteOffset:e.offset||0}}function $e(i){return i.stride||i.size*i.bytesPerElement}function pL(i,e){return i.type===e.type&&i.size===e.size&&$e(i)===$e(e)&&(i.offset||0)===(e.offset||0)}function fc(i,e){e.offset&&D.removed("shaderAttribute.offset","vertexOffset, elementOffset")();const t=$e(i),n=e.vertexOffset!==void 0?e.vertexOffset:i.vertexOffset||0,s=e.elementOffset||0,r=n*t+s*i.bytesPerElement+(i.offset||0);return{...e,offset:r,stride:t}}function mL(i,e){const t=fc(i,e);return{high:t,low:{...t,offset:t.offset+i.size*4}}}class yL{constructor(e,t,n){this._buffer=null,this.device=e,this.id=t.id||"",this.size=t.size||1;const s=t.logicalType||t.type,r=s==="float64";let{defaultValue:o}=t;o=Number.isFinite(o)?[o]:o||new Array(this.size).fill(0);let a;r?a="float32":!s&&t.isIndexed?a="uint32":a=s||"float32";let c=hL(s||a);this.doublePrecision=r,r&&t.fp64===!1&&(c=Float32Array),this.value=null,this.settings={...t,defaultType:c,defaultValue:o,logicalType:s,type:a,normalized:a.includes("norm"),size:this.size,bytesPerElement:c.BYTES_PER_ELEMENT},this.state={...n,externalBuffer:null,bufferAccessor:this.settings,allocatedValue:null,numInstances:0,bounds:null,constant:!1}}get isConstant(){return this.state.constant}get buffer(){return this._buffer}get byteOffset(){const e=this.getAccessor();return e.vertexOffset?e.vertexOffset*$e(e):0}get numInstances(){return this.state.numInstances}set numInstances(e){this.state.numInstances=e}get isDoublePrecisionBuffer(){return this._shouldSplitDoublePrecisionValue(this.value)}delete(){this._buffer&&(this._buffer.delete(),this._buffer=null),Kt.release(this.state.allocatedValue),this.state.allocatedValue=null}getBuffer(){return this.state.constant&&this.device.type!=="webgpu"?null:this.state.externalBuffer||this._buffer}getValue(e=this.id,t=null){const n={};if(this.state.constant){const s=this.value;if(this.device.type==="webgpu"&&this._buffer)n[e]=this._buffer;else if(t){const r=fc(this.getAccessor(),t),o=r.offset/s.BYTES_PER_ELEMENT,a=r.size||this.size;n[e]=s.subarray(o,o+a)}else n[e]=s}else n[e]=this.getBuffer();return this.doublePrecision&&(this.isDoublePrecisionBuffer?n[`${e}64Low`]=n[e]:n[`${e}64Low`]=new Float32Array(this.size)),n}_getBufferLayout(e=this.id,t=null){const n=this.getAccessor(),s=[],r={name:this.id,byteStride:this.device.type==="webgpu"&&this.state.constant?0:$e(n)};if(this.doublePrecision){const o=mL(n,t||{});s.push(Os(e,{...n,...o.high},this.device.type),Os(`${e}64Low`,{...n,...o.low},this.device.type))}else if(t){const o=fc(n,t);s.push(Os(e,{...n,...o},this.device.type))}else s.push(Os(e,n,this.device.type));return r.attributes=s.filter(Boolean),r}setAccessor(e){this.state.bufferAccessor=e}getAccessor(){return this.state.bufferAccessor}getBounds(){if(this.state.bounds)return this.state.bounds;let e=null;if(this.state.constant&&this.value){const t=Array.from(this.value);e=[t,t]}else{const{value:t,numInstances:n,size:s}=this,r=n*s;if(t&&r&&t.length>=r){const o=new Array(s).fill(1/0),a=new Array(s).fill(-1/0);for(let c=0;c<r;)for(let l=0;l<s;l++){const u=t[c++];u<o[l]&&(o[l]=u),u>a[l]&&(a[l]=u)}e=[o,a]}}return this.state.bounds=e,e}setData(e){const{state:t}=this;let n;ArrayBuffer.isView(e)?n={value:e}:e instanceof F?n={buffer:e}:n=e;const s={...this.settings,...n};if(ArrayBuffer.isView(n.value)){if(!n.type)if(this.doublePrecision&&n.value instanceof Float64Array)s.type="float32";else{const o=gL(n.value);s.type=s.normalized?o.replace("int","norm"):o}s.bytesPerElement=n.value.BYTES_PER_ELEMENT,s.stride=$e(s)}if(t.bounds=null,n.constant){let r=n.value;if(r=this._normalizeValue(r,[],0),this.settings.normalized&&(r=this.normalizeConstant(r)),!(!t.constant||!this._areValuesEqual(r,this.value)))return!1;t.externalBuffer=null,t.constant=!0,this.value=ArrayBuffer.isView(r)?r:new Float32Array(r)}else if(n.buffer){const r=n.buffer;t.externalBuffer=r,t.constant=!1,this.value=n.value||null}else if(n.value){this._checkExternalBuffer(n);const r=n.value;let o=r;t.externalBuffer=null,t.constant=!1,this.value=r,this._shouldSplitDoublePrecisionValue(o)&&(o=ws(o,s),r instanceof Float32Array&&(s.stride=s.size*2*Float32Array.BYTES_PER_ELEMENT));let{buffer:a}=this;const c=$e(s),l=(s.vertexOffset||0)*c;if(this.settings.isIndexed){const f=this.settings.defaultType;o.constructor!==f&&(o=new f(o))}const u=o.byteLength+l+c*2;(!a||a.byteLength<u)&&(a=this._createBuffer(u)),a.write(o,l)}return this.setAccessor(s),!0}updateSubBuffer(e={}){this.state.bounds=null;const t=this.value,{startOffset:n=0,endOffset:s}=e,r=this._shouldSplitDoublePrecisionValue(t);this.buffer.write(r?ws(t,{size:this.size,startIndex:n,endIndex:s}):t.subarray(n,s),n*(r?8:t.BYTES_PER_ELEMENT)+this.byteOffset)}allocate(e,t=!1){const{state:n}=this,s=n.allocatedValue,r=Kt.allocate(s,e+1,{size:this.size,type:this.settings.defaultType,copy:t});this.value=r;const o=this._shouldSplitDoublePrecisionValue(r),a=o&&r instanceof Float32Array?{...this.settings,stride:this.size*2*Float32Array.BYTES_PER_ELEMENT}:this.settings;this.setAccessor(a);const{byteOffset:c}=this;let{buffer:l}=this;const u=r.byteLength*(o&&r instanceof Float32Array?2:1);return(!l||l.byteLength<u+c)&&(l=this._createBuffer(u+c),t&&s&&l.write(this._shouldSplitDoublePrecisionValue(s)?ws(s,this):s,c)),n.allocatedValue=r,n.constant=!1,n.externalBuffer=null,!0}_shouldSplitDoublePrecisionValue(e){return!!(this.doublePrecision&&(e instanceof Float64Array||this.device.type==="webgpu"&&e instanceof Float32Array))}_checkExternalBuffer(e){const{value:t}=e;if(!ArrayBuffer.isView(t))throw new Error(`Attribute ${this.id} value is not TypedArray`);const n=this.settings.defaultType;let s=!1;if(this.doublePrecision&&(s=t.BYTES_PER_ELEMENT<4),s)throw new Error(`Attribute ${this.id} does not support ${t.constructor.name}`);!(t instanceof n)&&this.settings.normalized&&!("normalized"in e)&&D.warn(`Attribute ${this.id} is normalized`)()}normalizeConstant(e){switch(this.settings.type){case"snorm8":return new Float32Array(e).map(t=>(t+128)/255*2-1);case"snorm16":return new Float32Array(e).map(t=>(t+32768)/65535*2-1);case"unorm8":return new Float32Array(e).map(t=>t/255);case"unorm16":return new Float32Array(e).map(t=>t/65535);default:return e}}_normalizeValue(e,t,n){const{defaultValue:s,size:r}=this.settings;if(Number.isFinite(e))return t[n]=e,t;if(!e){let o=r;for(;--o>=0;)t[n+o]=s[o];return t}switch(r){case 4:t[n+3]=Number.isFinite(e[3])?e[3]:s[3];case 3:t[n+2]=Number.isFinite(e[2])?e[2]:s[2];case 2:t[n+1]=Number.isFinite(e[1])?e[1]:s[1];case 1:t[n+0]=Number.isFinite(e[0])?e[0]:s[0];break;default:let o=r;for(;--o>=0;)t[n+o]=Number.isFinite(e[o])?e[o]:s[o]}return t}_areValuesEqual(e,t){if(!e||!t)return!1;const{size:n}=this;for(let s=0;s<n;s++)if(e[s]!==t[s])return!1;return!0}_createBuffer(e){this._buffer&&this._buffer.destroy();const{isIndexed:t,type:n}=this.settings,s=this.device.type==="webgpu"&&!t?F.VERTEX|F.STORAGE|F.COPY_DST|F.COPY_SRC:(t?F.INDEX:F.VERTEX)|F.COPY_DST;return this._buffer=this.device.createBuffer({...this._buffer?.props,id:this.id,usage:s,indexType:t?n:void 0,byteLength:e}),this._buffer}}const Kh=[],Qh=[];function ci(i,e=0,t=1/0){let n=Kh;const s={index:-1,data:i,target:[]};return i?typeof i[Symbol.iterator]=="function"?n=i:i.length>0&&(Qh.length=i.length,n=Qh):n=Kh,(e>0||Number.isFinite(t))&&(n=(Array.isArray(n)?n:Array.from(n)).slice(e,t),s.index=e-1),{iterable:n,objectInfo:s}}function Jh(i){return i&&i[Symbol.asyncIterator]}function eg(i,e){const{size:t,stride:n,offset:s,startIndices:r,nested:o}=e,a=i.BYTES_PER_ELEMENT,c=n?n/a:t,l=s?s/a:0,u=Math.floor((i.length-l)/c);return(f,{index:d,target:g})=>{if(!r){const _=d*c+l;for(let v=0;v<t;v++)g[v]=i[_+v];return g}const p=r[d],m=r[d+1]||u;let y;if(o){y=new Array(m-p);for(let _=p;_<m;_++){const v=_*c+l;g=new Array(t);for(let b=0;b<t;b++)g[b]=i[v+b];y[_-p]=g}}else if(c===t)y=i.subarray(p*t+l,m*t+l);else{y=new i.constructor((m-p)*t);let _=0;for(let v=p;v<m;v++){const b=v*c+l;for(let x=0;x<t;x++)y[_++]=i[b+x]}}return y}}const bL=[],Bs=[[0,1/0]];function _L(i,e){if(i===Bs||(e[0]<0&&(e[0]=0),e[0]>=e[1]))return i;const t=[],n=i.length;let s=0;for(let r=0;r<n;r++){const o=i[r];o[1]<e[0]?(t.push(o),s=r+1):o[0]>e[1]?t.push(o):e=[Math.min(o[0],e[0]),Math.max(o[1],e[1])]}return t.splice(s,0,e),t}const vL={interpolation:{duration:0,easing:i=>i},spring:{stiffness:.05,damping:.5}};function tg(i,e){if(!i)return null;Number.isFinite(i)&&(i={type:"interpolation",duration:i});const t=i.type||"interpolation";return{...vL[t],...e,...i,type:t}}class ig extends yL{constructor(e,t){super(e,t,{startIndices:null,constantValue:null,lastExternalBuffer:null,binaryValue:null,binaryAccessor:null,needsUpdate:!0,needsRedraw:!1,layoutChanged:!1,updateRanges:Bs}),this.constant=!1,this.settings.update=t.update||(t.accessor?this._autoUpdater:void 0),Object.seal(this.settings),Object.seal(this.state),this._validateAttributeUpdaters()}get startIndices(){return this.state.startIndices}set startIndices(e){this.state.startIndices=e}needsUpdate(){return this.state.needsUpdate}needsRedraw({clearChangedFlags:e=!1}={}){const t=this.state.needsRedraw;return this.state.needsRedraw=t&&!e,t}layoutChanged(){return this.state.layoutChanged}setAccessor(e){var t;(t=this.state).layoutChanged||(t.layoutChanged=!pL(e,this.getAccessor())),super.setAccessor(e)}getUpdateTriggers(){const{accessor:e}=this.settings;return[this.id].concat(typeof e!="function"&&e||[])}supportsTransition(){return!!this.settings.transition}getTransitionSetting(e){if(!e||!this.supportsTransition())return null;const{accessor:t}=this.settings,n=this.settings.transition,s=Array.isArray(t)?e[t.find(r=>e[r])]:e[t];return tg(s,n)}setNeedsUpdate(e=this.id,t){if(this.state.needsUpdate=this.state.needsUpdate||e,this.setNeedsRedraw(e),t){const{startRow:n=0,endRow:s=1/0}=t;this.state.updateRanges=_L(this.state.updateRanges,[n,s])}else this.state.updateRanges=Bs}clearNeedsUpdate(){this.state.needsUpdate=!1,this.state.updateRanges=bL}setNeedsRedraw(e=this.id){this.state.needsRedraw=this.state.needsRedraw||e}allocate(e){const{state:t,settings:n}=this;if(n.noAlloc)return!1;if(n.update){const s=this.isConstant;return super.allocate(e,t.updateRanges!==Bs),t.layoutChanged||(t.layoutChanged=s&&this.device.type==="webgpu"),!0}return!1}updateBuffer({numInstances:e,data:t,props:n,context:s}){if(!this.needsUpdate())return!1;const{state:{updateRanges:r},settings:{update:o,noAlloc:a}}=this;let c=!0;if(o){for(const[l,u]of r)o.call(s,this,{data:t,startRow:l,endRow:u,props:n,numInstances:e});if(this.value)if(this.constant||!this.buffer||this.buffer.byteLength<this.value.byteLength+this.byteOffset){if(this.constant){const l=this.value;this.value=null,this.setConstantValue(s,l)}else this.setData({value:this.value,constant:this.constant});this.constant=!1}else for(const[l,u]of r){const f=Number.isFinite(l)?this.getVertexOffset(l):0,d=Number.isFinite(u)?this.getVertexOffset(u):a||!Number.isFinite(e)?this.value.length:e*this.size;super.updateSubBuffer({startOffset:f,endOffset:d})}this._checkAttributeArray()}else c=!1;return this.clearNeedsUpdate(),this.setNeedsRedraw(),c}setConstantValue(e,t){var n;if(t===void 0||typeof t=="function")return!1;const s=this.isConstant,r=this.settings.transform&&e?this.settings.transform.call(e,t):t,o=this.settings.defaultType;this.state.constantValue=this._normalizeValue(r,new o(this.size),0);const a=this.setData({constant:!0,value:r});if(this.device.type==="webgpu"){let c=this.state.constantValue;this.doublePrecision&&(c instanceof Float32Array||c instanceof Float64Array)&&(c=ws(c,{size:this.size}),this.setAccessor({...this.getAccessor(),stride:this.size*2*Float32Array.BYTES_PER_ELEMENT}));let l=this._buffer;(!l||l.byteLength<c.byteLength)&&(l=this._createBuffer(c.byteLength)),l.write(c),(n=this.state).layoutChanged||(n.layoutChanged=!s),this.constant=!1}return a&&this.setNeedsRedraw(),this.clearNeedsUpdate(),!0}getConstantValue(){return this.isConstant?this.state.constantValue:null}setExternalBuffer(e){const{state:t}=this;return e?(this.clearNeedsUpdate(),t.lastExternalBuffer===e||(t.lastExternalBuffer=e,this.setNeedsRedraw(),this.setData(e)),!0):(t.lastExternalBuffer=null,!1)}setBinaryValue(e,t=null){const{state:n,settings:s}=this;if(!e)return n.binaryValue=null,n.binaryAccessor=null,!1;if(s.noAlloc)return!1;if(n.binaryValue===e)return this.clearNeedsUpdate(),!0;if(n.binaryValue=e,this.setNeedsRedraw(),s.transform||t!==this.startIndices){ArrayBuffer.isView(e)&&(e={value:e});const o=e;W(ArrayBuffer.isView(o.value),`invalid ${s.accessor}`);const a=!!o.size&&o.size!==this.size;return n.binaryAccessor=eg(o.value,{size:o.size||this.size,stride:o.stride,offset:o.offset,startIndices:t,nested:a}),!1}return this.clearNeedsUpdate(),this.setData(e),!0}getVertexOffset(e){const{startIndices:t}=this;return(t?e<t.length?t[e]:this.numInstances:e)*this.size}getValue(){const e=this.settings.shaderAttributes,t=super.getValue();if(!e)return t;for(const n in e)Object.assign(t,super.getValue(n,e[n]));return t}getBufferLayout(e){this.state.layoutChanged=!1;const t=this.settings.shaderAttributes,n=super._getBufferLayout(),{stepMode:s}=this.settings;if(s==="dynamic"?n.stepMode=e?e.isInstanced?"instance":"vertex":"instance":n.stepMode=s??"vertex",!t)return n;for(const r in t){const o=super._getBufferLayout(r,t[r]);n.attributes.push(...o.attributes)}return n}_autoUpdater(e,{data:t,startRow:n,endRow:s,props:r,numInstances:o}){const{settings:a,state:c,value:l,size:u,startIndices:f}=e,{accessor:d,transform:g}=a,p=c.binaryAccessor||(typeof d=="function"?d:r[d]);W(typeof p=="function",`accessor "${d}" is not a function`);let m=e.getVertexOffset(n);const{iterable:y,objectInfo:_}=ci(t,n,s);for(const v of y){_.index++;let b=p(v,_);if(g&&(b=g.call(this,b)),f){const x=(_.index<f.length-1?f[_.index+1]:o)-f[_.index];if(b&&Array.isArray(b[0])){let w=m;for(const P of b)e._normalizeValue(P,l,w),w+=u}else b&&b.length>u?l.set(b,m):(e._normalizeValue(b,_.target,0),SE({target:l,source:_.target,start:m,count:x}));m+=x*u}else e._normalizeValue(b,l,m),m+=u}}_validateAttributeUpdaters(){const{settings:e}=this;if(!(e.noAlloc||typeof e.update=="function"))throw new Error(`Attribute ${this.id} missing update or accessor`)}_checkAttributeArray(){const{value:e}=this,t=Math.min(4,this.size);if(e&&e.length>=t){let n=!0;switch(t){case 4:n=n&&Number.isFinite(e[3]);case 3:n=n&&Number.isFinite(e[2]);case 2:n=n&&Number.isFinite(e[1]);case 1:n=n&&Number.isFinite(e[0]);break;default:n=!1}if(!n)throw new Error(`Illegal attribute generated for ${this.id}`)}}}const ng=/^vertex-list<([^<>]+)>$/,sg=/^value-list<([^<>]+)>$/;function rg(i){return ng.test(i)}function og(i){return sg.test(i)}function xL(i){const e=ng.exec(i),t=sg.exec(i),n=e?.[1]??t?.[1]??i;try{ne.getVertexFormatInfo(n)}catch{throw new Error(`Unsupported GPUVector format ${i}`)}return n}function Xi(i){const e=xL(i),t=rg(i),n=og(i),s=ne.getVertexFormatInfo(e),r=s.type,o=s.normalized,a=wL(r,o);return{format:i,elementFormat:e,vertexList:t,valueList:n,type:r,signedDataType:PL(e,r),primitiveType:a,components:s.components,byteLength:s.byteLength,integer:s.integer,signed:s.signed,normalized:o,...s.webglOnly?{webglOnly:!0}:{}}}function wL(i,e){if(e)return"f32";switch(i){case"float32":return"f32";case"float16":return"f16";case"uint8":case"uint16":case"uint32":return"u32";case"sint8":case"sint16":case"sint32":return"i32";default:throw new Error(`Unsupported GPUVector component type ${i}`)}}function PL(i,e){if(i==="unorm10-10-10-2")return"uint32";switch(e){case"unorm8":return"uint8";case"snorm8":return"sint8";case"unorm16":return"uint16";case"snorm16":return"sint16";default:return e}}class ks{constructor(e){h(this,"buffer");h(this,"format");h(this,"length");h(this,"byteOffset");h(this,"byteStride");const t=ne.getVertexFormatInfo(e.format).byteLength,n=e.byteOffset??0,s=e.byteStride??t;if(dc(e.length,"GPUDataView length"),dc(n,"GPUDataView byteOffset"),dc(s,"GPUDataView byteStride"),s<t)throw new Error(`GPUDataView byteStride ${s} is smaller than ${e.format} byte length ${t}`);const r=e.length===0?0:(e.length-1)*s+t,o=n+r;if(!Number.isSafeInteger(r)||!Number.isSafeInteger(o))throw new Error("GPUDataView byte range must use safe integers");if(o>e.buffer.byteLength)throw new Error("GPUDataView exceeds its backing buffer byte length");this.buffer=e.buffer,this.format=e.format,this.length=e.length,this.byteOffset=n,this.byteStride=s}get elementByteLength(){return ne.getVertexFormatInfo(this.format).byteLength}get byteLength(){return this.length===0?0:(this.length-1)*this.byteStride+this.elementByteLength}}function dc(i,e){if(!Number.isSafeInteger(i)||i<0)throw new Error(`${e} must be a non-negative safe integer`)}function hc(i){return!!(i&&typeof i=="object"&&i.type==="struct")}function SL(i,e){const t=Object.entries(i);if(t.length===0)throw new Error("GPUData struct format must declare at least one field");return e==="packed"?EL(t):CL(t)}function EL(i){const e=[];let t=0,n=0;for(const[s,r]of i){const o=ne.getVertexFormatInfo(r);if(o.webglOnly)throw new Error(`Packed GPUData struct field "${s}" uses WebGL-only format ${r}`);t=ag(t,Math.min(4,o.byteLength)),e.push([s,Object.freeze({format:r,byteOffset:t,byteLength:o.byteLength})]),t+=o.byteLength,n+=o.components}return Object.freeze({type:"struct",layout:"packed",fields:Object.freeze(Object.fromEntries(e)),components:n,byteStride:ag(t,4),rowByteLength:t})}function CL(i){const e=Object.fromEntries(i.map(([o,a])=>[o,LL(a)])),t=Fo(e,{layout:"wgsl-storage"}),n=[];let s=0,r=0;for(const[o,a]of i){const c=ne.getVertexFormatInfo(a),l=t.fields[o].offset*4;n.push([o,Object.freeze({format:a,byteOffset:l,byteLength:c.byteLength})]),s=Math.max(s,l+c.byteLength),r+=c.components}return Object.freeze({type:"struct",layout:"wgsl-storage",fields:Object.freeze(Object.fromEntries(n)),components:r,byteStride:t.byteLength,rowByteLength:s})}function LL(i){const e=ne.getVertexFormatInfo(i);switch(e.type){case"float32":return Ds("f32",e.components);case"sint32":return Ds("i32",e.components);case"uint32":return Ds("u32",e.components);default:{const t=Math.ceil(e.byteLength/4);return Ds("u32",t)}}}function Ds(i,e){return e===1?i:`vec${e}<${i}>`}function ag(i,e){return Math.ceil(i/e)*e}class TL{constructor(e,t){h(this,"buffer");h(this,"ownsDataBuffer");this.buffer=e,this.ownsDataBuffer=t}get ownsBuffer(){return this.ownsDataBuffer}transferBufferOwnership(e){if(e.buffer!==this.buffer)throw new Error("GPUData ownership can only be transferred to the same buffer");e.ownsDataBuffer=this.ownsDataBuffer,this.ownsDataBuffer=!1}destroy(){this.ownsDataBuffer&&(this.buffer.destroy(),this.ownsDataBuffer=!1)}}class AL extends TL{constructor(t){const{buffer:n,format:s,length:r,valueLength:o,stride:a,byteOffset:c=0,byteStride:l,rowByteLength:u,ownsBuffer:f=!1,readbackMetadata:d,valueOffsets:g,nullBitmap:p,valueByteLength:m,dataType:y}=t;super(n,f);h(this,"dataType");h(this,"format");h(this,"length");h(this,"valueLength");h(this,"stride");h(this,"byteOffset");h(this,"byteStride");h(this,"rowByteLength");h(this,"readbackMetadata");h(this,"valueOffsets");h(this,"nullBitmap");h(this,"valueByteLength");let _;s?typeof s=="string"?_=s:_=SL(s,t.layout??"wgsl-storage"):_=void 0;const v=hc(_)?_:void 0,b=typeof _=="string"?Xi(_):void 0;if(this.dataType=y,this.format=_,this.length=r,this.valueLength=o??r,this.stride=a??b?.components??v?.components??l??u??1,this.byteOffset=c,this.rowByteLength=u??v?.rowByteLength??b?.byteLength??l??this.stride,this.byteStride=l??v?.byteStride??this.rowByteLength,v){if(this.rowByteLength<v.rowByteLength)throw new Error(`GPUData rowByteLength ${this.rowByteLength} is smaller than struct format row byte length ${v.rowByteLength}`);if(this.byteStride<Math.max(v.byteStride,this.rowByteLength))throw new Error(`GPUData byteStride ${this.byteStride} is smaller than its struct row layout`)}this.readbackMetadata=d,this.valueOffsets=g,this.nullBitmap=p,this.valueByteLength=m}getChild(t){if(!hc(this.format))return null;const n=this.format.fields[t];return n?new ks({buffer:this.buffer,format:n.format,length:this.length,byteOffset:this.byteOffset+n.byteOffset,byteStride:this.byteStride}):null}getChildAt(t){if(!hc(this.format))return null;const n=Object.values(this.format.fields)[t];return n?new ks({buffer:this.buffer,format:n.format,length:this.length,byteOffset:this.byteOffset+n.byteOffset,byteStride:this.byteStride}):null}}const gc=AL;class Zi{constructor(e){h(this,"name");h(this,"dataType");h(this,"format");h(this,"length");h(this,"valueLength");h(this,"stride");h(this,"byteOffset");h(this,"byteStride");h(this,"rowByteLength");h(this,"bufferLayout");h(this,"data",[]);h(this,"device");h(this,"bufferProps");h(this,"isAppendable",!1);h(this,"ownsDataChunks",!0);h(this,"ownedVectors",[]);h(this,"appendableByteLength",0);switch(e.type){case"buffer":{const{name:t,buffer:n,format:s,length:r,valueLength:o=r,byteOffset:a=0,ownsBuffer:c=!1}=e,{stride:l,byteStride:u,rowByteLength:f}=cg(e);this.name=t,this.dataType=e.dataType,this.format=s,this.length=r,this.valueLength=o,this.stride=l,this.byteOffset=a,this.byteStride=u,this.rowByteLength=f,this.data.push(new gc({buffer:n,format:s,length:r,valueLength:o,stride:l,byteOffset:a,byteStride:u,rowByteLength:f,ownsBuffer:c,dataType:e.dataType}));return}case"interleaved":{const{name:t,buffer:n,format:s,length:r,valueLength:o=r,byteOffset:a=0,byteStride:c,attributes:l,ownsBuffer:u=!1}=e;this.name=t,this.dataType=e.dataType,this.format=s,this.length=r,this.valueLength=o,this.stride=c,this.byteOffset=a,this.byteStride=c,this.rowByteLength=c,this.bufferLayout={name:t,byteStride:c,attributes:l},this.data.push(new gc({buffer:n,format:s,length:r,valueLength:o,stride:c,byteOffset:a,byteStride:c,rowByteLength:c,ownsBuffer:u,dataType:e.dataType}));return}case"data":{const t=e.format??IL(e.data),n=t?Xi(t):void 0,{name:s,data:r,stride:o=r[0]?.stride??n?.components??1,valueLength:a=r.reduce((d,g)=>d+g.valueLength,0),byteStride:c=r[0]?.byteStride??n?.byteLength,rowByteLength:l=r[0]?.rowByteLength??n?.byteLength,bufferLayout:u,ownsData:f=!1}=e;if(c===void 0||l===void 0)throw new Error("GPUVector requires format or explicit byte layout metadata");t&&ML(r,t),this.name=s,this.dataType=e.dataType,this.format=t,this.length=r.reduce((d,g)=>d+g.length,0),this.valueLength=a,this.stride=o,this.byteOffset=r.length===1?r[0].byteOffset:0,this.byteStride=c,this.rowByteLength=l,this.bufferLayout=u,this.ownsDataChunks=f,this.data.push(...r);return}case"appendable":{const{name:t,device:n,format:s,valueLength:r=0,bufferProps:o}=e,{stride:a,byteStride:c,rowByteLength:l}=cg(e);this.name=t,this.dataType=e.dataType,this.format=s,this.length=0,this.valueLength=r,this.stride=a,this.byteOffset=0,this.byteStride=c,this.rowByteLength=l,this.device=n,this.bufferProps=o,this.isAppendable=!0;return}}}get ownsBuffer(){return this.ownsDataChunks&&this.data.some(e=>e.ownsBuffer)||this.ownedVectors.some(e=>e.ownsBuffer)}get capacityRows(){return this.isAppendable?this.length:void 0}get appendedByteLength(){return this.appendableByteLength}addData(e){if(this.format&&e.format!==this.format)throw new Error("GPUVector.addData() requires matching formats");if(e.byteStride!==this.byteStride)throw new Error("GPUVector.addData() requires matching byteStride");if(e.rowByteLength!==this.rowByteLength)throw new Error("GPUVector.addData() requires matching rowByteLength");return this.data.push(e),this.length+=e.length,this.valueLength+=e.valueLength,this}appendDataChunk(e,t=this.appendableByteLength+e.buffer.byteLength){if(!this.isAppendable)throw new Error("GPUVector.appendDataChunk() requires appendable vector storage");if(this.format&&e.format!==this.format)throw new Error("GPUVector.appendDataChunk() requires matching formats");if(e.byteStride!==this.byteStride||e.rowByteLength!==this.rowByteLength)throw new Error("GPUVector.appendDataChunk() requires matching byte layout metadata");return this.data.push(e),this.length+=e.length,this.valueLength+=e.valueLength,this.appendableByteLength=t,this}resetLastBatch(){if(!this.isAppendable)throw new Error("GPUVector.resetLastBatch() requires appendable vector storage");for(const e of this.data.splice(0))e.destroy();return this.length=0,this.valueLength=0,this.appendableByteLength=0,this}retainOwnedVectors(e){return this.ownedVectors.push(...e),this}transferBufferOwnership(e){const t=this.data[0],n=e.data[0];if(!t||!n||t.buffer!==n.buffer)throw new Error("GPUVector ownership can only be transferred to the same buffer");t.transferBufferOwnership(n)}destroy(){if(this.ownsDataChunks)for(const e of this.data)e.destroy();for(const e of this.ownedVectors.splice(0))e.destroy()}}function cg(i){const e=i.format?Xi(i.format):void 0,t=i.rowByteLength??i.byteStride??e?.byteLength;if(t===void 0)throw new Error("GPUVector requires format or explicit rowByteLength");return{stride:i.stride??e?.components??1,byteStride:i.byteStride??t,rowByteLength:t}}function IL(i){return i[0]?.format}function ML(i,e){if(i.find(n=>n.format!==e))throw new Error("GPUVector data chunks must share the declared format")}class RL{constructor(){h(this,"poolSize",20);h(this,"bufferPools");this.bufferPools=new Map}createOrReuse(e,t){if(t>e.limits.maxBufferSize)throw new Error(`Buffer pool cannot allocate ${t} bytes: device.limits.maxBufferSize is ${e.limits.maxBufferSize}`);const n=this.bufferPools.get(e),s=n?n.findIndex(o=>o.byteLength>=t):-1;if(s<0)return e.createBuffer({usage:F.VERTEX|F.STORAGE|F.COPY_DST|F.COPY_SRC,byteLength:t});const[r]=n.splice(s,1);return r}recycle(e){const t=e.device;this.bufferPools.has(t)||this.bufferPools.set(t,[]);const n=this.bufferPools.get(t),s=n.findIndex(r=>r.byteLength>e.byteLength);s<0?n.push(e):n.splice(s,0,e),this.purge()}purge(){for(const[e,t]of this.bufferPools){const n=e.isLost?0:this.poolSize;for(;t.length>n;)t.shift().destroy();t.length===0&&this.bufferPools.delete(e)}}}const Pe=new RL;class ${constructor(e){h(this,"type");h(this,"size");h(this,"normalized");h(this,"isConstant");h(this,"length");h(this,"ValueType");h(this,"source",null);h(this,"format");h(this,"_id");h(this,"_destroyed",!1);h(this,"_value");h(this,"_offset");h(this,"_stride");h(this,"_byteLength");h(this,"_gpuVector");h(this,"_bufferOwnership","owned");h(this,"_targetBuffer");const{id:t,value:n,buffer:s,gpuData:r,format:o,source:a=null,isConstant:c=!1}=e;if(!a&&!n&&!s&&!r)throw new Error("GPUDataEvaluator must have a value source");let{type:l,size:u,offset:f,stride:d,normalized:g,length:p}=e;if(a instanceof $?(l=l??a.type,u=u??a.size,f=f??a.offset,d=d??a.stride,g=g??a.normalized,p=p??a.length):(u=u??1,f=f??0,g=g??!1,p=c?1:p),!l)throw new Error("GPUDataEvaluator: type not defined");if(this._id=t,this.type=l,this.size=u,this.ValueType=wi(this.type),this._offset=f,this._stride=d||this.ValueType.BYTES_PER_ELEMENT*u,this.normalized=g,this.source=a,this.format=o,p===void 0)if(c)p=1;else{if(!n)throw new Error("GPUDataEvaluator: length not defined");p=Math.ceil(n.byteLength/this.stride)}this.isConstant=c,this.length=p;const m=this.ValueType.BYTES_PER_ELEMENT*this.size;this._byteLength=p===0?0:(p-1)*this.stride+m,this._value=n,this._bufferOwnership=a instanceof $||s||r?"borrowed":"owned",r?this._gpuVector=new Zi({type:"data",name:this._id??"data",format:r.format,data:[r],stride:r.stride,byteStride:r.byteStride,rowByteLength:r.rowByteLength}):s&&(this._gpuVector=this.createGPUVectorView({buffer:s,name:this._id,format:this.format}))}static get bufferPoolSize(){return Pe.poolSize}static set bufferPoolSize(e){if(!Number.isSafeInteger(e)||e<0)throw new Error("GPUDataEvaluator.bufferPoolSize must be a non-negative safe integer");Pe.poolSize=e,Pe.purge()}get offset(){return this._offset}get stride(){return this._stride}get byteLength(){return this._byteLength}static fromArray(e,{type:t,size:n=1,offset:s=0,stride:r=0,normalized:o=!1}){let a=t,c;if(Array.isArray(e)){a=a||"float32";const u=wi(a);c=new u(e)}else e instanceof Float64Array?(a="uint32",n*=2,s*=2,r*=2,c=new Uint32Array(e.buffer,e.byteOffset,e.byteLength/4)):(a=a||zu(e),c=e);const l=`<${a} * ${n}>`;return new $({id:l,type:a,size:n,offset:s,stride:r,normalized:o,value:c})}static fromConstant(e,t="float32"){const n=wi(t);let s;return Array.isArray(e)?s=`[${e.join(",")}]`:(s=String(e),e=[e]),new $({id:s,isConstant:!0,type:t,size:e.length,value:new n(e)})}static fromGPUData(e,t={}){BL(e);const n=new ks({buffer:e.buffer,format:e.format,length:e.length,byteOffset:e.byteOffset,byteStride:e.byteStride});return new $({...ug(n),id:t.id,gpuData:e})}static fromGPUDataView(e,t={}){return new $({...ug(e),id:t.id,buffer:e.buffer})}get value(){return this._value||(this.source instanceof $?this.source.value:void 0)}get evaluated(){return!!this._gpuVector}get id(){return this._id}get gpuVector(){if(!this._gpuVector)throw new Error(`${this} not evaluated`);return this._gpuVector}get buffer(){return Fs(this.gpuVector)}setTargetBuffer({buffer:e,byteOffset:t=0,byteStride:n=this.stride}){if(this._destroyed)throw new Error(`GPUDataEvaluator ${this} already destroyed`);if(this._gpuVector)throw new Error(`GPUDataEvaluator ${this} already evaluated`);if(!this.source||this.source instanceof $)throw new Error("GPUDataEvaluator target buffers require a deferred operation source");this._targetBuffer={buffer:e,byteOffset:t,byteStride:n}}async evaluate(e,t={}){if(this._destroyed)throw new Error(`GPUDataEvaluator ${this} already destroyed`);if(this._gpuVector)return this._gpuVector;let n;if(this.source instanceof $){const s=await this.source.evaluate(e);return this._gpuVector=this.createGPUVectorView({...t,buffer:Fs(s)}),this._gpuVector}if(n=this._getEvaluationBuffer(e),this._value)n.write(this._value);else{const s=await this.source.execute(e,n);if(!s.success)throw s.error||new Error(`${this.source} evaluation failed`);s.value&&(this._value=s.value)}return this._gpuVector=this.createGPUVectorView({...t,buffer:n}),this._gpuVector}evaluateSync(e,t={}){if(this._destroyed)throw new Error(`GPUDataEvaluator ${this} already destroyed`);if(this._gpuVector)return this._gpuVector;let n;if(this.source instanceof $){const s=this.source.evaluateSync(e);return this._gpuVector=this.createGPUVectorView({...t,buffer:Fs(s)}),this._gpuVector}if(n=this._getEvaluationBuffer(e),this._value)n.write(this._value);else{const s=this.source.executeSync(e,n);if(!s.success)throw s.error||new Error(`${this.source} evaluation failed`);s.value&&(this._value=s.value)}return this._gpuVector=this.createGPUVectorView({...t,buffer:n}),this._gpuVector}createGPUVectorView(e){const t=e.name??this._id??"vector",n=e.format??this.format??FL(this.type,this.size,this.normalized);if(e.interleaved){const s=typeof e.interleaved=="object"&&e.interleaved.attributes?e.interleaved.attributes:DL(this);return new Zi({type:"interleaved",name:t,buffer:e.buffer,format:e.format??this.format,length:this.length,byteOffset:this.offset,byteStride:this.stride,attributes:s,ownsBuffer:!1})}return new Zi({type:"buffer",name:t,buffer:e.buffer,format:n,length:this.length,stride:this.size,byteOffset:this.offset,byteStride:this.stride,rowByteLength:this.ValueType.BYTES_PER_ELEMENT*this.size,ownsBuffer:!1})}_getEvaluationBuffer(e){const t=this._targetBuffer;if(!t)return Pe.createOrReuse(e,this.byteLength);if(t.buffer.device!==e)throw new Error("GPUDataEvaluator target buffer belongs to a different device");const n=this.ValueType.BYTES_PER_ELEMENT*this.size,s=this.length===0?0:(this.length-1)*t.byteStride+n;if(t.byteOffset+s>t.buffer.byteLength)throw new Error("GPUDataEvaluator target buffer is too small for the output layout");return this._offset=t.byteOffset,this._stride=t.byteStride,this._byteLength=s,this._bufferOwnership="borrowed",this._targetBuffer=void 0,t.buffer}async readValue(e=0,t){const{ValueType:n}=this,{size:s,offset:r,stride:o,length:a}=this,c=n.BYTES_PER_ELEMENT*s;if(t=t??a,e=Math.max(0,Math.min(a,e)),t=Math.max(e,Math.min(a,t)),this._value)return OL(this,this._value,e,t);const l=t-e;if(l===0)return new n(0);const u=r+e*o,f=o===c?l*c:(l-1)*o+c,d=await this.buffer.readAsync(u,f),g=new n(d.buffer,d.byteOffset,d.byteLength/n.BYTES_PER_ELEMENT);if(o===c)return g;const p=new Uint8Array(c*l);for(let m=0;m<l;m++){const y=m*o;p.set(d.subarray(y,y+c),m*c)}return new n(p.buffer)}async ensureCPUValue(){const e=this.value;if(e)return e;const t=await this.buffer.readAsync(0,this.offset+this.byteLength);if(t.byteLength%this.ValueType.BYTES_PER_ELEMENT!==0)throw new Error(`${this} backing buffer byte length is not aligned to its scalar type`);const n=t.slice();return this._value=new this.ValueType(n.buffer,n.byteOffset,n.byteLength/this.ValueType.BYTES_PER_ELEMENT),this._value}ensureCPUValueSync(){const e=this.value;if(e)return e;throw new Error(`${this} CPU value is not available for synchronous evaluation`)}toString(){return this._id??this.source?.toString()??this.constructor.name}destroy(){this._gpuVector&&(this._bufferOwnership==="owned"&&Pe.recycle(Fs(this._gpuVector)),this._gpuVector=void 0),this._targetBuffer=void 0,this._destroyed=!0}}function OL(i,e,t,n){const{ValueType:s,size:r,offset:o,stride:a}=i,c=a/s.BYTES_PER_ELEMENT,l=o/s.BYTES_PER_ELEMENT,u=n-t;if(c===r){const d=l+t*c;return e.subarray(d,d+u*r)}const f=new s(u*r);for(let d=0;d<u;d++){const g=l+(t+d)*c;f.set(e.subarray(g,g+r),d*r)}return f}function lg(i){if(i instanceof $)return i;if(typeof i=="number"||Array.isArray(i))return $.fromConstant(i);if(i instanceof gc)return $.fromGPUData(i);if(i instanceof ks)return $.fromGPUDataView(i);throw new Error("getGPUDataEvaluator() requires GPUDataEvaluator, GPUData, GPUDataView, number, or number[]")}function BL(i){if(!i.format)throw new Error("GPUDataEvaluator.fromGPUData() requires GPUData format metadata");if(rg(i.format)||og(i.format))throw new Error("GPUDataEvaluator.fromGPUData() does not support variable-length input");const t=Xi(i.format).byteLength;if(i.rowByteLength!==t)throw new Error(`GPUDataEvaluator.fromGPUData() requires rowByteLength ${t} for GPUData`)}function ug(i){const e=Xi(i.format),t=wi(e.signedDataType),n=t.BYTES_PER_ELEMENT*e.components;if(e.byteLength!==n)throw new Error(`GPUDataEvaluator does not support packed vertex format ${i.format}: ${e.byteLength} physical bytes cannot expose ${e.components} ${e.signedDataType} components`);if(i.byteOffset%t.BYTES_PER_ELEMENT!==0||i.byteStride%t.BYTES_PER_ELEMENT!==0)throw new Error(`GPUDataEvaluator requires ${i.format} offset and stride aligned to ${t.BYTES_PER_ELEMENT} bytes`);return{type:e.signedDataType,size:e.components,offset:i.byteOffset,stride:i.byteStride,normalized:e.normalized,length:i.length,format:i.format}}function Fs(i){const e=kL(i).buffer;return e instanceof De?e.buffer:e}function kL(i){const[e,...t]=i.data;if(!e||t.length>0)throw new Error(`GPUDataEvaluator requires exactly one GPUData chunk for "${i.name}"`);return e}function DL(i){const e=[];return fg(i,e,{byteOffset:0}),e}function fg(i,e,t){const n=i.source;if(n&&!(n instanceof $)&&n.name==="interleave"){for(const s of Object.values(n.inputs))s instanceof $&&fg(s,e,t);return}e.push({attribute:i.id??i.toString(),format:dg(i.type,i.size,i.normalized),byteOffset:t.byteOffset}),t.byteOffset+=i.ValueType.BYTES_PER_ELEMENT*i.size}function dg(i,e,t=!1){if(e<1||e>4)throw new Error(`Cannot synthesize a GPUVector vertex format with ${e} components`);let n=i;if(t)switch(i){case"uint8":n="unorm8";break;case"sint8":n="snorm8";break;case"uint16":n="unorm16";break;case"sint16":n="snorm16";break;case"float32":n="float32";break;default:throw new Error(`Unsupported normalized vertex format for ${i}`)}return(n==="uint8"||n==="sint8"||n==="uint16"||n==="sint16"||n==="unorm8"||n==="snorm8"||n==="unorm16"||n==="snorm16")&&e===3?`${n}x3-webgl`:`${n}${e===1?"":`x${e}`}`}function FL(i,e,t=!1){return e>=1&&e<=4?dg(i,e,t):void 0}class li{constructor({id:e,gpuDataEvaluators:t,gpuVector:n,format:s}){h(this,"gpuDataEvaluators");h(this,"format");h(this,"length");h(this,"id");h(this,"_gpuVector");h(this,"_ownsGPUDataEvaluators");h(this,"_destroyed",!1);if(t.length===0)throw new Error("GPUVectorEvaluator requires at least one GPUData evaluator");NL(t),this.id=e,this.gpuDataEvaluators=t,this.format=s??t[0].format,this.length=t.reduce((r,o)=>r+o.length,0),this._gpuVector=n,this._ownsGPUDataEvaluators=!n}static fromGPUVector(e){if(e.bufferLayout)throw new Error(`GPUVectorEvaluator.fromGPUVector() does not accept interleaved vector "${e.name}"`);if(e.data.length===0)throw new Error(`GPUVectorEvaluator.fromGPUVector() requires GPUData for "${e.name}"`);return new li({id:e.name,gpuDataEvaluators:e.data.map(t=>$.fromGPUData(t,{id:e.name})),gpuVector:e,format:e.format})}static fromGPUDataEvaluators(e,t={}){return new li({id:t.id,gpuDataEvaluators:e,format:t.format})}get evaluated(){return!!this._gpuVector}get gpuVector(){if(!this._gpuVector)throw new Error(`${this} not evaluated`);return this._gpuVector}mapGPUData(e){return li.fromGPUDataEvaluators(this.gpuDataEvaluators.map((t,n)=>e(t,n)),{id:this.id})}async evaluate(e,t={}){if(this._destroyed)throw new Error(`GPUVectorEvaluator ${this} already destroyed`);if(this._gpuVector)return this._gpuVector;const n=await Promise.all(this.gpuDataEvaluators.map(a=>a.evaluate(e,t))),s=n[0],r=n.map(hg),o=t.format??this.format??s.format;return this._gpuVector=new Zi({type:"data",name:t.name??this.id??"vector",format:o,data:r,stride:s.stride,byteStride:s.byteStride,rowByteLength:s.rowByteLength,bufferLayout:s.bufferLayout}),this._gpuVector}evaluateSync(e,t={}){if(this._destroyed)throw new Error(`GPUVectorEvaluator ${this} already destroyed`);if(this._gpuVector)return this._gpuVector;const n=this.gpuDataEvaluators.map(a=>a.evaluateSync(e,t)),s=n[0],r=n.map(hg),o=t.format??this.format??s.format;return this._gpuVector=new Zi({type:"data",name:t.name??this.id??"vector",format:o,data:r,stride:s.stride,byteStride:s.byteStride,rowByteLength:s.rowByteLength,bufferLayout:s.bufferLayout}),this._gpuVector}destroy(){if(this._ownsGPUDataEvaluators)for(const e of this.gpuDataEvaluators)e.destroy();this._gpuVector=void 0,this._destroyed=!0}toString(){return this.id??this.constructor.name}}function NL(i){const e=i[0];for(const t of i.slice(1))if(t.type!==e.type||t.size!==e.size||t.normalized!==e.normalized||t.format!==e.format)throw new Error("GPUVectorEvaluator requires matching GPUData evaluator layouts")}function hg(i){const[e,...t]=i.data;if(!e||t.length>0)throw new Error(`GPUVectorEvaluator requires one GPUData chunk for "${i.name}"`);return e}const pc={add:{arity:2,symbol:"arithmetic_add"},subtract:{arity:2,symbol:"arithmetic_subtract"},multiply:{arity:2,symbol:"arithmetic_multiply"},divide:{arity:2,symbol:"arithmetic_divide"},pow:{arity:2,symbol:"pow"},sqrt:{arity:1,symbol:"sqrt"},abs:{arity:1,symbol:"abs"},sin:{arity:1,symbol:"sin"},cos:{arity:1,symbol:"cos"},tan:{arity:1,symbol:"arithmetic_tan"},exp:{arity:1,symbol:"exp"},log:{arity:1,symbol:"log"}};function mc({elementWise:i,func:e,inputs:t,output:n,outputBuffer:s}){const r=Array.isArray(t)?t:Object.values(t);for(const p of r)if(!p.value)throw new Error(`${p} does not have CPU value`);const o=n.length,a=n.size,c=new n.ValueType(o*a);for(let p=0;p<o;p++){const m=r.map(y=>ae(y,p));if(i)for(let y=0;y<a;y++)c[p*a+y]=e.apply(null,m.map(_=>_[y]));else e.call(null,c.subarray(p*a,p*a+a),...m)}const l=n.ValueType.BYTES_PER_ELEMENT,u=n.offset/l,f=n.stride/l,d=a;let g=c;if(u!==0||f!==d){g=new n.ValueType(u+n.byteLength/l);for(let p=0;p<o;p++){const m=p*d,y=u+p*f,_=c.subarray(m,m+a);g.set(_,y),s.write(_,y*l)}}else s.write(c);return{success:!0,value:g}}function ae(i,e){const t=i.value,n=i.size,s=i.offset/i.ValueType.BYTES_PER_ELEMENT,r=i.stride/i.ValueType.BYTES_PER_ELEMENT,o=i.isConstant?0:e,a=s+o*r,c=t.slice(a,a+n);if(!i.normalized)return c;const l=new Float32Array(n);for(let u=0;u<n;u++)l[u]=zL(c[u],i.type);return l}function zL(i,e){switch(e){case"uint8":return i/255;case"uint16":return i/65535;case"uint32":return i/4294967295;case"sint8":return Math.max(i/127,-1);case"sint16":return Math.max(i/32767,-1);case"sint32":return Math.max(i/2147483647,-1);case"float32":return i;default:throw new Error(`Unsupported normalized source type ${e}`)}}const UL=({inputs:i,output:e,target:t})=>{for(const s of Object.values(i.namedInputs))if(!s.value)throw new Error(`${s} does not have CPU value`);const n=new e.ValueType(e.length*e.size);for(let s=0;s<e.length;s++){const r=Object.fromEntries(Object.entries(i.namedInputs).map(([o,a])=>[o,ae(a,s)]));for(let o=0;o<e.size;o++)n[s*e.size+o]=gg(i.expression,r,o)}return t.write(n),{success:!0,value:n}};function gg(i,e,t){switch(i.kind){case"input":{const n=e[i.name];return t<n.length?n[t]:n.length===1?n[0]:0}case"literal":return Array.isArray(i.value)?i.value[t]??0:i.value;case"call":{$L(i.op,i.args.length);const n=i.args.map(s=>gg(s,e,t));switch(i.op){case"add":return n[0]+n[1];case"subtract":return n[0]-n[1];case"multiply":return n[0]*n[1];case"divide":return n[0]/n[1];case"pow":return Math.pow(n[0],n[1]);case"sqrt":return Math.sqrt(n[0]);case"abs":return Math.abs(n[0]);case"sin":return Math.sin(n[0]);case"cos":return Math.cos(n[0]);case"tan":return Math.tan(n[0]);case"exp":return Math.exp(n[0]);case"log":return Math.log(n[0]);default:{const s=i.op;throw new Error(`Unsupported arithmetic op ${s}`)}}}default:{const n=i;throw new Error(`Unsupported expression node ${n.kind}`)}}}function $L(i,e){const t=pc[i].arity;if(e!==t)throw new Error(`Arithmetic op '${i}' expects ${t} args, got ${e}`)}const GL=({inputs:i,output:e,target:t})=>{const{sourceValues:n}=i;if(!n.value)throw new Error(`${n} does not have CPU value`);const r=new e.ValueType(e.length*e.size);if(n.length===0)return{success:!1,error:new Error(`${n} is empty`)};for(let o=0;o<n.size;o++){const a=ae(n,0)[o],c=o*e.size,l=c+1;r[c]=a,r[l]=a;for(let u=1;u<n.length;u++){const f=ae(n,u)[o];f<r[c]&&(r[c]=f),f>r[l]&&(r[l]=f)}}return t.write(r),{success:!0,value:r}},VL=({inputs:i,output:e,target:t})=>mc({func:(n,s)=>{const r=n.length/2,o=new Float64Array(s.buffer);for(let a=0;a<r;a++){const c=o[a];n[a]=Math.fround(c),n[a+r]=c-n[a]}return n},inputs:i,output:e,outputBuffer:t}),jL=async({inputs:i,output:e,target:t})=>{const{ids:n,sourceValues:s}=i,r=n.value,o=s.value;if(!r)throw new Error(`${n} does not have CPU value`);if(!o)throw new Error(`${s} does not have CPU value`);const a=new e.ValueType(e.length*e.size),c=new Array(e.size).fill(0);for(let l=0;l<e.length;l++){const u=ae(n,l),f=Number(u[0]),d=WL(f,s.length)?ae(s,f):c;a.set(d,l*e.size)}return t.write(a),{success:!0,value:a}};function WL(i,e){return Number.isInteger(i)&&i>=0&&i<e}const HL=({inputs:i,output:e,target:t})=>mc({func:(n,...s)=>{let r=0;for(const o of s)n.set(o,r),r+=o.length},inputs:i,output:e,outputBuffer:t}),YL=({inputs:i,output:e,target:t})=>{const{x:n,y:s}=i,r=new e.ValueType(e.length);for(let o=0;o<e.length;o++){const a=ae(n,o),c=ae(s,o);let l=0;for(let u=0;u<n.size;u++)l+=a[u]*c[u];r[o]=l}return t.write(r),{success:!0,value:r}},qL=({inputs:i,output:e,target:t})=>{const{x:n,y:s}=i,r=new e.ValueType(e.length);for(let o=0;o<e.length;o++){const a=ae(n,o),c=ae(s,o);let l=1;for(let u=0;u<n.size;u++)if(a[u]!==c[u]){l=0;break}r[o]=l}return t.write(r),{success:!0,value:r}},XL=({inputs:i,output:e,target:t})=>{const{x:n}=i,s=new e.ValueType(e.length);for(let r=0;r<e.length;r++){const o=ae(n,r);let a=0;for(let c=0;c<n.size;c++)a+=o[c]*o[c];s[r]=Math.sqrt(a)}return t.write(s),{success:!0,value:s}},ZL=async({inputs:i,output:e,target:t})=>{const{segments:n,vertexCount:s}=i,r=n.value;if(!r)throw new Error(`${n} does not have CPU value`);KL(r,n,s);const o=new e.ValueType(e.length*e.size);let a=0;for(let c=0;c<s;c++){for(;a+1<n.length&&r[yc(n,a+1)]<=c;)a++;const l=r[yc(n,a)],u=c*e.size;o[u]=a,o[u+1]=c-l}return t.write(o),{success:!0,value:o}};function KL(i,e,t){if(e.length<1)throw new Error("segmentedMap segments must contain at least one segment start");let n=0;for(let s=0;s<e.length;s++){const r=i[yc(e,s)];if(s===0&&r!==0)throw new Error(`segmentedMap segments must start at 0, got ${r}`);if(s>0&&r<n)throw new Error(`segmentedMap segments must be non-decreasing, got ${r} after ${n}`);n=r}if(n>t)throw new Error(`segmentedMap last segment start must be <= vertexCount, got ${n} > ${t}`)}function yc(i,e){return i.offset/i.ValueType.BYTES_PER_ELEMENT+e*(i.stride/i.ValueType.BYTES_PER_ELEMENT)}const QL=async({inputs:i,output:e,target:t})=>{const{condition:n,whenTrue:s,whenFalse:r}=i,o=new e.ValueType(e.length*e.size);for(let a=0;a<e.length;a++){const c=ae(n,a),l=ae(s,a),u=ae(r,a);for(let f=0;f<e.size;f++){const d=bc(c,n.size,f);o[a*e.size+f]=d!==0?bc(l,s.size,f):bc(u,r.size,f)}}return t.write(o),{success:!0,value:o}};function bc(i,e,t){return t<e?i[t]:e===1?i[0]:0}const JL=Object.freeze(Object.defineProperty({__proto__:null,arithmetic:UL,dot:YL,equalAll:qL,extent:GL,fround:VL,gather:jL,interleave:HL,length:XL,segmentedMap:ZL,select:QL,sequence:({inputs:i,output:e,target:t})=>{const n=new e.ValueType(e.length);for(let s=0;s<e.length;s++)n[s]=i.start+s*i.step;return t.write(n),{success:!0,value:n}},swizzle:({inputs:i,output:e,target:t})=>{const{columns:n}=i;return mc({func:(s,r)=>{for(let o=0;o<n.length;o++)s[o]=r[n[o]]},inputs:{x:i.x},output:e,outputBuffer:t})}},Symbol.toStringTag,{value:"Module"}));class eT{constructor(){h(this,"_modules",{cpu:JL})}add(e,t){const n=this._modules[e];if(typeof t.then=="function"){const r=Promise.all([Promise.resolve(n||{}),t]).then(([o,a])=>({...o,...a}));return this._modules[e]=r,r.then(o=>{this._modules[e]=o}).catch(o=>{S.error(`Failed to register ${e} backend: ${o}`)()}),r}if(n&&typeof n.then=="function"){const r=Promise.resolve(n).then(o=>({...o,...t})).then(o=>(this._modules[e]=o,o)).catch(o=>{throw S.error(`Failed to register ${e} backend: ${o}`)(),o});return this._modules[e]=r,r}const s={...n||{},...t};return this._modules[e]=s,Promise.resolve(s)}async get(e,t){let n=this._modules[e];if(!n)if(e==="webgl")n=this.add("webgl",Promise.resolve().then(()=>lO));else if(e==="webgpu")n=this.add("webgpu",Promise.resolve().then(()=>ZT));else throw new Error(`${e} backend not registered`);const r=(await n)[t];if(typeof r!="function")throw new Error(`${e} backend does not implement ${t}`);return r}getSync(e,t){const n=this._modules[e];if(!n)throw new Error(`${e} backend not registered`);if(typeof n.then=="function")throw new Error(`${e} backend is not loaded yet`);const r=n[t];if(typeof r!="function")throw new Error(`${e} backend does not implement ${t}`);return r}clear(){this._modules={}}}const _c=new eT;class tT{constructor(e){h(this,"inputs");h(this,"dependencies");this.inputs=e,this.dependencies=Array.from(e instanceof Array?e:Object.values(e)).filter(t=>t instanceof $)}async execute(e,t){return await this._resolveDependencies(e),await this._executeWithHandler(await _c.get(this._getHandlerRegistry(e),this.name),t)}executeSync(e,t){this._resolveDependenciesSync(e);const n=this._executeWithHandler(_c.getSync(this._getHandlerRegistry(e),this.name),t);if(iT(n))throw new Error(`${this.name} returned a Promise in executeSync()`);return n}shouldExecuteOnCPU(){return this.output.length<=1&&Array.from(this.dependencies).every(e=>!!e.value)}_getHandlerRegistry(e){return this.shouldExecuteOnCPU()?"cpu":e.type}async _resolveDependencies(e){for(const n of this.dependencies)await n.evaluate(e);if(this._getHandlerRegistry(e)==="cpu"||e.type==="null")for(const n of this.dependencies)await n.ensureCPUValue()}_resolveDependenciesSync(e){for(const n of this.dependencies)n.evaluateSync(e);if(this._getHandlerRegistry(e)==="cpu"||e.type==="null")for(const n of this.dependencies)n.ensureCPUValueSync()}_executeWithHandler(e,t){return e({device:t.device,inputs:this.inputs,output:this.output,target:t})}}function iT(i){return typeof i?.then=="function"}function pg(i,{operations:e,inputs:t}){switch(i.kind){case"input":if(!(i.name in t))throw new Error(`Unknown expression input '${i.name}'`);return;case"literal":if(Array.isArray(i.value)){for(const n of i.value)if(!Number.isFinite(n))throw new Error(`Expression literal array must contain only finite values, got ${n}`)}else if(!Number.isFinite(i.value))throw new Error(`Expression literal must be finite, got ${i.value}`);return;case"call":{const n=e[i.op];if(!n)throw new Error(`Unknown expression op '${i.op}'`);if(i.args.length!==n.arity)throw new Error(`Expression op '${i.op}' expects ${n.arity} args, got ${i.args.length}`);for(const s of i.args)pg(s,{operations:e,inputs:t});return}default:{const n=i;throw new Error(`Unsupported expression node ${n.kind}`)}}}function mg(i,e){return pg(i,e),yg(i,e)}function yg(i,e){switch(i.kind){case"input":{const t=e.inputs[i.name];return e.laneIndex<t.size?e.formatInput(i.name):e.formatOutOfBoundsInput(i.name)}case"literal":return e.formatLiteral(i.value);case"call":{const t=e.operations[i.op],n=i.args.map(s=>yg(s,e));return e.formatCall(t.symbol,n)}default:{const t=i;throw new Error(`Unsupported expression node ${t.kind}`)}}}function nT(...i){let e=sT(i.map(t=>t.type));return e[0]!=="f"&&i.some(t=>t.normalized)&&(e="float32"),{isConstant:i.every(t=>t.isConstant),type:e,size:i.reduce((t,n)=>Math.max(t,n.size),0),length:i.reduce((t,n)=>Math.max(t,n.length),0)}}function sT(i){let e=0,t=0;for(const n of i){if(n[0]==="f")return"float32";const s=n.endsWith("8")?8:n.endsWith("6")?16:32;n[0]==="u"?e=Math.max(e,s):t=Math.max(t,s)}return e&&!t?`uint${e}`:t&&e<32?`sint${Math.max(t,e*2)}`:"float32"}class rT extends tT{constructor(t){super(t);h(this,"name","interleave");h(this,"output");const{isConstant:n,type:s,length:r}=nT(...t);this.output=new $({isConstant:n,type:s,size:t.reduce((o,a)=>o+a.size,0),length:r,source:this})}toString(){return`_${this.inputs.join("_")}_`}}function oT(...i){if(i.length===0)throw new Error("interleave() requires at least one input");return i.length===1?lg(i[0]):new rT(i.map(lg)).output}function aT(i,e){const t=lT(e);for(const n of t)n.evaluateSync(i);return cT(t),e}function cT(i){const e=new Set(i.flatMap(fT)),t=new Set;for(const n of i)Ns(n,t);for(const n of t)n.evaluated&&!e.has(n.buffer)&&n.destroy()}function lT(i){const e=new Set;return vc(i,e,new Set),Array.from(e)}function vc(i,e,t){if(dT(i)){e.add(i);return}if(!(!i||typeof i!="object"||t.has(i))){if(t.add(i),Array.isArray(i)){for(const n of i)vc(n,e,t);return}if(uT(i))for(const n of Object.values(i))vc(n,e,t)}}function uT(i){const e=Object.getPrototypeOf(i);return e===Object.prototype||e===null}function Ns(i,e){if(i instanceof li){for(const n of i.gpuDataEvaluators)Ns(n,e);return}const t=i.source;if(t){if(t instanceof $){e.has(t)||(e.add(t),Ns(t,e));return}for(const n of t.dependencies)e.has(n)||(e.add(n),Ns(n,e))}}function fT(i){return i instanceof $?[i.buffer]:i.gpuVector.data.map(e=>e.buffer instanceof De?e.buffer.buffer:e.buffer)}function dT(i){return i instanceof $||i instanceof li}const hT=65535;function Ki(i,e){const t=gT(e),n=Math.max(1,Math.ceil(i)),s=Math.min(n,t),r=Math.min(Math.ceil(n/s),t),o=Math.ceil(n/s/r);if(o>t)throw new Error(`WebGPU dispatch requires ${n} workgroups, exceeding the 3D dispatch limit of ${t} per dimension`);return{x:s,y:r,z:o}}function bg(i,e="workgroupId"){return`((${e}.z * ${i.y}u + ${e}.y) * ${i.x}u + ${e}.x)`}function zs(i,e,t="workgroupId",n="localId"){return`(${bg(i,t)} * ${e}u + ${n}.x)`}function gT(i){return Number.isFinite(i)&&i>0?Math.floor(i):hT}function Qi(i,e){switch(i){case"u32":return`${e}u`;case"f32":return Number.isInteger(e)?`${e}.0`:`${e}`;default:return`${e}`}}function pT(i,e){switch(i){case"uint32":return Qi("u32",Math.trunc(e));case"sint32":return`${Math.trunc(e)}`;case"float32":return Qi("f32",e);default:throw new Error(`WebGPU operations only support 32-bit output types, got ${i}`)}}function Us(i){switch(i){case"uint32":return"0u";case"sint32":return"0";case"float32":return"0.0";default:throw new Error(`WebGPU operations only support 32-bit output types, got ${i}`)}}function X(i){switch(i){case"uint32":return"u32";case"sint32":return"i32";case"float32":return"f32";default:throw new Error(`WebGPU operations only support 32-bit storage types, got ${i}`)}}const xc=64,mT="GPGPU Operation Counts",yT="Computation Runs",bT=new $t;function rt({module:i,elementWise:e=!1,expression:t,inputs:n,output:s,operationType:r=s.type,outputBuffer:o}){if(!i.source)throw new Error(`WebGPU computation ${i.name} requires WGSL source`);const a=ST(n),c=a.map(([v,b])=>({name:v,input:b})),l=c.filter(({input:v})=>!v.isConstant).map((v,b)=>({...v,index:b})),u=X(r),f=X(s.type),d={TYPE:u,RESULT_LEN:s.size.toString()},g=Ki(Math.ceil(s.length/xc),o.device.limits.maxComputeWorkgroupsPerDimension);for(const[v,b]of a)d[`${v.toUpperCase()}_LEN`]=b.size.toString();const p=`
${CT(i.source,d)}
${l.map(({name:v,input:b,index:x})=>_T(v,b,x)).join(`
`)}
${c.map(({name:v,input:b})=>vT(v,b,r)).join(`
`)}
${xT(s,l.length)}
${wT(s)}

@compute @workgroup_size(${xc}) fn main(
  @builtin(workgroup_id) workgroupId: vec3<u32>,
  @builtin(local_invocation_id) localId: vec3<u32>
) {
  let rowIndex = ${zs(g,xc)};
  if (rowIndex >= ${s.length}u) {
    return;
  }

${c.map(({name:v})=>`  let ${v} = read_${v}(rowIndex);`).join(`
`)}
  var result: array<${f}, ${s.size}>;
${PT(i.name,a,s,e,t)}
  write_result(rowIndex, result);
}
`,m=new vt(o.device,{source:p,modules:i.dependencies,shaderAssembler:bT,shaderLayout:{bindings:[...l.map(({name:v},b)=>({name:v,type:"storage",group:0,location:b})),{name:"result",type:"storage",group:0,location:l.length}]}}),y=Object.fromEntries(l.map(({name:v,input:b})=>[v,b.buffer]));y.result=o,m.setBindings(y);const _=o.device.beginComputePass({});o.device.statsManager.getStats(mT).get(yT).incrementCount(),m.dispatch(_,g.x,g.y,g.z),_.end(),o.device.submit(),m.destroy()}function _T(i,e,t){if(e.isConstant)return"";const n=X(e.type);return`@group(0) @binding(${t}) var<storage, read> ${i}: array<${n}>;`}function vT(i,e,t){const n=X(t),s=e.type===t?"":n,r=e.stride/e.ValueType.BYTES_PER_ELEMENT,o=e.offset/e.ValueType.BYTES_PER_ELEMENT;return e.isConstant?`fn read_${i}(_rowIndex: u32) -> array<${n}, ${e.size}> {
  return array<${n}, ${e.size}>(${ET(e,s)});
}`:`fn read_${i}(rowIndex: u32) -> array<${n}, ${e.size}> {
  var value: array<${n}, ${e.size}>;
  let rowOffset = ${o}u + rowIndex * ${r}u;
${Array.from({length:e.size},(a,c)=>s?`  value[${c}] = ${s}(${i}[rowOffset + ${c}u]);`:`  value[${c}] = ${i}[rowOffset + ${c}u];`).join(`
`)}
  return value;
}`}function xT(i,e){const t=X(i.type);return`@group(0) @binding(${e}) var<storage, read_write> result: array<${t}>;`}function wT(i){const e=i.stride/i.ValueType.BYTES_PER_ELEMENT,t=i.offset/i.ValueType.BYTES_PER_ELEMENT;return`fn write_result(rowIndex: u32, value: array<${X(i.type)}, ${i.size}>) {
  let rowOffset = ${t}u + rowIndex * ${e}u;
${Array.from({length:i.size},(s,r)=>`  result[rowOffset + ${r}u] = value[${r}];`).join(`
`)}
}`}function PT(i,e,t,n,s){let r="";if(s)for(let o=0;o<t.size;o++)r+=`  result[${o}] = ${s(o)};
`;else if(n){const o=Us(t.type),a=X(t.type);for(let c=0;c<t.size;c++){const l=e.map(([u,f])=>c<f.size?X(f.type)===a?`${u}[${c}]`:`${a}(${u}[${c}])`:o);r+=`  result[${c}] = ${i}(${l.join(", ")});
`}}else r+=`result = ${i}(${e.map(([o])=>o).join(", ")});`;return r.trimEnd()}function ST(i){return Array.isArray(i)?i.map((e,t)=>[`x${t}`,e]):Object.entries(i)}function ET(i,e){const t=i.value;if(!t)throw new Error(`Constant input ${i} is missing CPU values`);return Array.from({length:i.size},(n,s)=>Qi(e,t[s]??0)).join(", ")}function CT(i,e){for(const t in e)i=i.replaceAll(`{${t}}`,e[t]);return i}const LT=`fn arithmetic_add(x: {TYPE}, y: {TYPE}) -> {TYPE} {
  return x + y;
}

fn arithmetic_subtract(x: {TYPE}, y: {TYPE}) -> {TYPE} {
  return x - y;
}

fn arithmetic_multiply(x: {TYPE}, y: {TYPE}) -> {TYPE} {
  return x * y;
}

fn arithmetic_divide(x: {TYPE}, y: {TYPE}) -> {TYPE} {
  return x / y;
}

fn arithmetic_tan(x: f32) -> f32 {
  return tan_fp32(x);
}
`,TT=({inputs:i,output:e,target:t})=>{const n=e.type,s=X(n),r=Us(n),o=i.namedInputs;return rt({module:{name:"arithmetic",source:LT,dependencies:[na]},inputs:o,output:e,operationType:n,outputBuffer:t,expression:a=>mg(i.expression,{operations:pc,inputs:o,laneIndex:a,formatInput:c=>`${c}[${a}]`,formatOutOfBoundsInput:c=>o[c].size===1?`${c}[0]`:r,formatLiteral:c=>{const l=Array.isArray(c)?c[a]??0:c;return`${s}(${pT(n,l)})`},formatCall:(c,l)=>`${c}(${l.join(", ")})`})}),{success:!0}},AT=`fn row_dot(x: array<{TYPE}, {X_LEN}>, y: array<{TYPE}, {Y_LEN}>) -> array<f32, 1> {
  var sum = 0.0;
  for (var i = 0u; i < {X_LEN}u; i = i + 1u) {
    sum += f32(x[i]) * f32(y[i]);
  }
  return array<f32, 1>(sum);
}
`,IT=({inputs:i,output:e,target:t})=>(rt({module:{name:"row_dot",source:AT},inputs:i,output:e,operationType:"float32",outputBuffer:t}),{success:!0}),MT=`fn equalAll(x: array<{TYPE}, {X_LEN}>, y: array<{TYPE}, {Y_LEN}>) -> array<u32, 1> {
  var allEqual = 1u;
  for (var i = 0u; i < {X_LEN}u; i = i + 1u) {
    if (x[i] != y[i]) {
      allEqual = 0u;
      break;
    }
  }
  return array<u32, 1>(allEqual);
}
`,RT=({inputs:i,output:e,target:t})=>(rt({module:{name:"equalAll",source:MT},inputs:i,output:e,operationType:i.x.type,outputBuffer:t}),{success:!0}),ye=64;function wc(i,e,t){const n=X(e.type);return`@group(0) @binding(${t}) var<storage, read> ${i}: array<${n}>;`}function _g(i,e,t,n=i){const s=X(t);if(e.isConstant){const l=e.value;if(!l)throw new Error(`Constant input ${e} is missing CPU values`);return`fn read_${n}(_sourceIndex: u32) -> array<${s}, ${e.size}> {
  return array<${s}, ${e.size}>(${Array.from({length:e.size},(u,f)=>Qi(s,l[f]??0)).join(", ")});
}`}const r=e.stride/e.ValueType.BYTES_PER_ELEMENT,o=e.offset/e.ValueType.BYTES_PER_ELEMENT,c=X(e.type)===s?"":`${s}`;return`fn read_${n}(sourceIndex: u32) -> array<${s}, ${e.size}> {
  var value: array<${s}, ${e.size}>;
  let rowOffset = ${o}u + sourceIndex * ${r}u;
${Array.from({length:e.size},(l,u)=>c?`  value[${u}] = ${c}(${i}[rowOffset + ${u}u]);`:`  value[${u}] = ${i}[rowOffset + ${u}u];`).join(`
`)}
  return value;
}`}function vg(i,e){return _g("sourceValues",i,e,"source_values")}function Pc(i,e){const t=X(i.type);return`@group(0) @binding(${e}) var<storage, read_write> result: array<${t}>;`}function Sc(i){const e=i.stride/i.ValueType.BYTES_PER_ELEMENT,t=i.offset/i.ValueType.BYTES_PER_ELEMENT;return`fn write_result(rowIndex: u32, value: array<${X(i.type)}, ${i.size}>) {
  let rowOffset = ${t}u + rowIndex * ${e}u;
${Array.from({length:i.size},(s,r)=>`  result[rowOffset + ${r}u] = value[${r}];`).join(`
`)}
}`}function OT(i,e){const t=Us(i);return`fn zero_result() -> array<${X(i)}, ${e}> {
  var result: array<${X(i)}, ${e}>;
${Array.from({length:e},(n,s)=>`  result[${s}] = ${t};`).join(`
`)}
  return result;
}`}const BT=({inputs:i,output:e,target:t})=>{const{sourceValues:n}=i;if(n.length===0){const c=new e.ValueType(e.length*e.size);return t.write(c),{success:!0,value:c}}if(n.isConstant){const c=n.value;if(!c)throw new Error(`Constant input ${n} is missing CPU values`);const l=new e.ValueType(e.length*e.size);for(let u=0;u<e.length;u++){const f=c[u];l[u*2]=f,l[u*2+1]=f}return t.write(l),{success:!0,value:l}}const s=[];let r=n,o="raw",a=n.length;try{for(;;){const c=Math.ceil(a/ye),l=e.length*c,u=c===1?t:Pe.createOrReuse(t.device,l*e.stride);if(c>1&&s.push(u),kT({input:r,inputMode:o,inputGroupCount:a,channelCount:e.length,outputType:e.type,outputBuffer:u,outputLength:l,outputStride:e.stride,outputOffset:e.offset}),c===1)break;r=new $({buffer:u,type:e.type,size:2,length:l}),o="partial",a=c}return{success:!0}}finally{for(const c of s)Pe.recycle(c)}};function kT({input:i,inputMode:e,inputGroupCount:t,channelCount:n,outputType:s,outputBuffer:r,outputLength:o,outputStride:a,outputOffset:c}){const l=X(s),u=Ki(o,r.device.limits.maxComputeWorkgroupsPerDimension),f=new $({buffer:r,type:s,size:2,length:o,stride:a,offset:c}),d=`
${i.isConstant?"":wc("sourceValues",i,0)}
${vg(i,s)}
${Pc(f,i.isConstant?0:1)}
${Sc(f)}
${DT(e,s,n,t)}

var<workgroup> sharedMin: array<${l}, ${ye}>;
var<workgroup> sharedMax: array<${l}, ${ye}>;

@compute @workgroup_size(${ye}) fn main(
  @builtin(workgroup_id) workgroupId: vec3<u32>,
  @builtin(local_invocation_id) localId: vec3<u32>
) {
  let outputRowIndex = ${bg(u)};
  if (outputRowIndex >= ${o}u) {
    return;
  }

  let channelIndex = outputRowIndex % ${n}u;
  let outputGroupIndex = outputRowIndex / ${n}u;
  let inputGroupIndex = outputGroupIndex * ${ye}u + localId.x;

  let result = extent_pass(channelIndex, inputGroupIndex);
  sharedMin[localId.x] = result[0];
  sharedMax[localId.x] = result[1];
  workgroupBarrier();

  var stride = ${Math.floor(ye/2)}u;
  loop {
    if (stride == 0u) {
      break;
    }
    if (localId.x < stride) {
      let compareIndex = localId.x + stride;
      if (sharedMin[compareIndex] < sharedMin[localId.x]) {
        sharedMin[localId.x] = sharedMin[compareIndex];
      }
      if (sharedMax[compareIndex] > sharedMax[localId.x]) {
        sharedMax[localId.x] = sharedMax[compareIndex];
      }
    }
    workgroupBarrier();
    stride = stride / 2u;
  }

  if (localId.x == 0u) {
    write_result(outputRowIndex, array<${l}, 2>(sharedMin[0], sharedMax[0]));
  }
}
`,g=new vt(r.device,{source:d,shaderLayout:{bindings:[...i.isConstant?[]:[{name:"sourceValues",type:"storage",group:0,location:0}],{name:"result",type:"storage",group:0,location:i.isConstant?0:1}]}}),p={result:r};i.isConstant||(p.sourceValues=i.buffer),g.setBindings(p);const m=r.device.beginComputePass({});g.dispatch(m,u.x,u.y,u.z),m.end(),r.device.submit(),g.destroy()}function DT(i,e,t,n){const s=X(e),[r,o]=FT(e);return i==="raw"?`fn extent_pass(channelIndex: u32, inputGroupIndex: u32) -> array<${s}, 2> {
  var result: array<${s}, 2>;
  result[0] = ${r};
  result[1] = ${o};

  if (inputGroupIndex < ${n}u) {
    let value = read_source_values(inputGroupIndex);
    result[0] = value[channelIndex];
    result[1] = value[channelIndex];
  }

  return result;
}`:`fn extent_pass(channelIndex: u32, inputGroupIndex: u32) -> array<${s}, 2> {
  var result: array<${s}, 2>;
  result[0] = ${r};
  result[1] = ${o};

  if (inputGroupIndex < ${n}u) {
    let rowIndex = inputGroupIndex * ${t}u + channelIndex;
    let value = read_source_values(rowIndex);
    result[0] = value[0];
    result[1] = value[1];
  }

  return result;
}`}function FT(i){switch(i){case"uint32":return["0xffffffffu","0u"];case"sint32":return["2147483647","-2147483648"];case"float32":return["3.402823e38","-3.402823e38"];default:throw new Error(`Unsupported WebGPU extent type for ${i}`)}}function NT(){const i=new Uint16Array([255]);return new Uint8Array(i.buffer)[0]>0}const zT=`const LE: bool = ${NT()?"true":"false"};
const F32_NAN: u32 = 0xffffffffu;
const F32_INF: u32 = 0x7f800000u;

fn roundShiftRight(value: u32, shift: i32) -> u32 {
  if (shift <= 0) {
    return value << u32(-shift);
  }

  if (shift >= 32) {
    if (shift == 32 && value > 0x80000000u) {
      return 1u;
    }
    return 0u;
  }

  let shiftU32 = u32(shift);
  let truncated = value >> shiftU32;
  let halfShift = 1u << u32(shift - 1);
  let remainder = value & ((1u << shiftU32) - 1u);
  if (remainder > halfShift || (remainder == halfShift && (truncated & 1u) == 1u)) {
    return truncated + 1u;
  }
  return truncated;
}

fn makeFloatImmediate(sign: u32, exponent: i32, mantissa: u32) -> u32 {
  return (sign << 31u) | (u32(exponent + 127) << 23u) | (mantissa & 0x7fffffu);
}

fn makeFloat(sign: u32, exponent: i32, significand: u32) -> u32 {
  if (significand == 0u) {
    return sign << 31u;
  }

  let leadingZeros = i32(countLeadingZeros(significand));
  var normalizedExponent = exponent + 31 - leadingZeros;

  if (normalizedExponent > 127) {
    return (sign << 31u) | F32_INF;
  }

  var mantissa: u32;
  if (normalizedExponent >= -126) {
    mantissa = roundShiftRight(significand, 8 - leadingZeros);
    if (mantissa >= 0x1000000u) {
      mantissa = mantissa >> 1u;
      normalizedExponent += 1;
      if (normalizedExponent > 127) {
        return (sign << 31u) | F32_INF;
      }
    }
    return makeFloatImmediate(sign, normalizedExponent, mantissa);
  }

  let subnormalShift = -149 - exponent;
  mantissa = roundShiftRight(significand, subnormalShift);
  if (mantissa >= 0x800000u) {
    return (sign << 31u) | (1u << 23u);
  }
  return (sign << 31u) | mantissa;
}

fn parseAsDouble(words: vec2<u32>) -> vec2<u32> {
  var d = words;
  if (LE) {
    d = d.yx;
  }

  let sign = (d.x >> 31u) & 1u;
  let exponentBits = (d.x >> 20u) & 0x7ffu;
  let exponent = i32(exponentBits) - 1023;
  let fractionHigh = d.x & 0xfffffu;
  let fractionLow = d.y;

  if (exponentBits == 0x7ffu) {
    if (fractionHigh == 0u && fractionLow == 0u) {
      return vec2<u32>((sign << 31u) | F32_INF, F32_NAN);
    }
    return vec2<u32>(F32_NAN);
  }

  if (exponentBits == 0u) {
    return vec2<u32>(sign << 31u);
  }

  if (exponent > 127) {
    return vec2<u32>((sign << 31u) | F32_INF, ((1u - sign) << 31u) | F32_INF);
  }

  let highSignificand = 0x800000u | (fractionHigh << 3u) | (fractionLow >> 29u);
  let lowSignificand = fractionLow & 0x1fffffffu;

  if (exponent < -126) {
    let highPart = makeFloat(sign, exponent - 23, highSignificand);
    let lowPart = makeFloat(sign, exponent - 52, lowSignificand);
    return vec2<u32>(highPart, lowPart);
  }

  let roundUp = lowSignificand > 0x10000000u ||
    (lowSignificand == 0x10000000u && (highSignificand & 1u) == 1u);

  var roundedSignificand = highSignificand + select(0u, 1u, roundUp);
  var highExponent = exponent;
  if (roundedSignificand == 0x1000000u) {
    roundedSignificand = 0x800000u;
    highExponent += 1;
  }

  if (highExponent > 127) {
    return vec2<u32>((sign << 31u) | F32_INF, ((1u - sign) << 31u) | F32_INF);
  }

  let highPart = makeFloatImmediate(sign, highExponent, roundedSignificand);

  var remainder = i32(lowSignificand);
  var lowSign = sign;
  if (roundUp) {
    remainder -= 0x20000000;
  }
  if (remainder < 0) {
    lowSign = 1u - sign;
    remainder = -remainder;
  }

  let lowPart = makeFloat(lowSign, exponent - 52, u32(remainder));
  return vec2<u32>(highPart, lowPart);
}

fn fround(x: array<u32, {X_LEN}>) -> array<f32, {RESULT_LEN}> {
  var result: array<f32, {RESULT_LEN}>;
  let n = {X_LEN}u / 2u;
  for (var i = 0u; i < n; i = i + 1u) {
    let parts = parseAsDouble(vec2<u32>(x[i * 2u], x[i * 2u + 1u]));
    result[i] = bitcast<f32>(parts.x);
    result[i + n] = bitcast<f32>(parts.y);
  }
  return result;
}
`,UT=({inputs:i,output:e,target:t})=>(rt({module:{name:"fround",source:zT},inputs:i,output:e,operationType:"uint32",outputBuffer:t}),{success:!0}),$T=async({inputs:i,output:e,target:t})=>{const{ids:n,sourceValues:s}=i,r=X(n.type),o=[];n.isConstant||o.push({name:"ids",input:n,index:o.length}),s.isConstant||o.push({name:"sourceValues",input:s,index:o.length});const a=Ki(Math.ceil(e.length/ye),t.device.limits.maxComputeWorkgroupsPerDimension),c=`
${o.map(({name:d,input:g,index:p})=>wc(d,g,p)).join(`
`)}
${GT(n,r)}
${vg(s,e.type)}
${Pc(e,o.length)}
${Sc(e)}
${OT(e.type,e.size)}
${VT(n.type,e.type,e.size,s.length)}

@compute @workgroup_size(${ye}) fn main(
  @builtin(workgroup_id) workgroupId: vec3<u32>,
  @builtin(local_invocation_id) localId: vec3<u32>
) {
  let rowIndex = ${zs(a,ye)};
  if (rowIndex >= ${e.length}u) {
    return;
  }

  let idsValue = read_ids(rowIndex);
  let result = gather(idsValue);
  write_result(rowIndex, result);
}
`,l=new vt(t.device,{source:c,shaderLayout:{bindings:[...o.map(({name:d,index:g})=>({name:d,type:"storage",group:0,location:g})),{name:"result",type:"storage",group:0,location:o.length}]}}),u={};n.isConstant||(u.ids=n.buffer),s.isConstant||(u.sourceValues=s.buffer),u.result=t,l.setBindings(u);const f=t.device.beginComputePass({});return l.dispatch(f,a.x,a.y,a.z),f.end(),t.device.submit(),l.destroy(),{success:!0}};function GT(i,e){if(i.isConstant){const s=i.value;if(!s)throw new Error(`Constant input ${i} is missing CPU values`);return`fn read_ids(_rowIndex: u32) -> ${e} {
  return ${Qi(e,s[0]??0)};
}`}const t=i.stride/i.ValueType.BYTES_PER_ELEMENT,n=i.offset/i.ValueType.BYTES_PER_ELEMENT;return`fn read_ids(rowIndex: u32) -> ${e} {
  let rowOffset = ${n}u + rowIndex * ${t}u;
  return ids[rowOffset];
}`}function VT(i,e,t,n){const s=X(i),r=X(e);return`fn gather(idsValue: ${s}) -> array<${r}, ${t}> {
  let sourceIndex = ${s==="u32"?"i32(idsValue)":s==="i32"?"idsValue":"i32(idsValue)"};
  if (sourceIndex < 0 || sourceIndex >= ${n}) {
    return zero_result();
  }
  return read_source_values(u32(sourceIndex));
}`}const jT=async({inputs:i,output:e,target:t})=>{const{segments:n}=i,s=n.isConstant?[]:[{name:"segments",input:n,index:0}],r=Ki(Math.ceil(e.length/ye),t.device.limits.maxComputeWorkgroupsPerDimension),o=`
${s.map(({name:u,input:f,index:d})=>wc(u,f,d)).join(`
`)}
${_g("segments",n,"uint32")}
${Pc(e,s.length)}
${Sc(e)}
${WT(n.length)}

@compute @workgroup_size(${ye}) fn main(
  @builtin(workgroup_id) workgroupId: vec3<u32>,
  @builtin(local_invocation_id) localId: vec3<u32>
) {
  let rowIndex = ${zs(r,ye)};
  if (rowIndex >= ${e.length}u) {
    return;
  }

  let result = segmented_map(rowIndex);
  write_result(rowIndex, result);
}
`,a=new vt(t.device,{source:o,shaderLayout:{bindings:[...s.map(({name:u,index:f})=>({name:u,type:"storage",group:0,location:f})),{name:"result",type:"storage",group:0,location:s.length}]}}),c=Object.fromEntries(s.map(({name:u,input:f})=>[u,f.buffer]));c.result=t,a.setBindings(c);const l=t.device.beginComputePass({});return a.dispatch(l,r.x,r.y,r.z),l.end(),t.device.submit(),a.destroy(),{success:!0}};function WT(i){return`fn segmented_map(vertexIndex: u32) -> array<u32, 2> {
  var low = 0i;
  var high = ${i}i;
  while (low < high) {
    let mid = low + (high - low) / 2i;
    let midStart = read_segments(u32(mid))[0];
    if (midStart <= vertexIndex) {
      low = mid + 1i;
    } else {
      high = mid;
    }
  }

  let segmentIndex = u32(max(low - 1i, 0i));
  let segmentStart = read_segments(segmentIndex)[0];
  return array<u32, 2>(segmentIndex, vertexIndex - segmentStart);
}`}const xg=({inputs:i,output:e,target:t})=>{const n=i.map((c,l)=>[`x${l}`,c]);HT(t.device.limits,n);const s=n.map(([c,l])=>`${c}: array<{TYPE}, ${l.size}>`).join(", ");let r=0;const o=n.map(([c,l])=>{const u=Array.from({length:l.size},(f,d)=>`  out[${r+d}] = ${c}[${d}];`).join(`
`);return r+=l.size,u}).join(`
`),a=`fn interleave(${s}) -> array<{TYPE}, {RESULT_LEN}> {
  var out: array<{TYPE}, {RESULT_LEN}>;
${o}
  return out;
}
`;return rt({module:{name:"interleave",source:a},inputs:i,output:e,outputBuffer:t}),{success:!0}};function HT(i,e){const n=e.filter(([,s])=>!s.isConstant).length+1;if(n>i.maxStorageBuffersPerShaderStage)throw new Error(`interleave() requires ${n} storage buffers, exceeding device limit ${i.maxStorageBuffersPerShaderStage}`);if(n>i.maxBindingsPerBindGroup)throw new Error(`interleave() requires ${n} bindings, exceeding bind group limit ${i.maxBindingsPerBindGroup}`)}const YT=`fn row_length(x: array<{TYPE}, {X_LEN}>) -> array<f32, 1> {
  var sum = 0.0;
  for (var i = 0u; i < {X_LEN}u; i = i + 1u) {
    sum += f32(x[i]) * f32(x[i]);
  }
  return array<f32, 1>(sqrt(sum));
}
`,qT=({inputs:i,output:e,target:t})=>(rt({module:{name:"row_length",source:YT},inputs:i,output:e,operationType:"float32",outputBuffer:t}),{success:!0}),XT=async({inputs:i,output:e,target:t})=>{const n=Us(e.type);return rt({module:{name:"select",source:`// inline expression select
`},inputs:i,output:e,operationType:e.type,outputBuffer:t,expression:s=>{const r=Ec("condition",i.condition,s,n),o=Ec("whenTrue",i.whenTrue,s,n);return`select(${Ec("whenFalse",i.whenFalse,s,n)}, ${o}, ${r} != ${n})`}}),{success:!0}};function Ec(i,e,t,n){return t<e.size?`${i}[${t}]`:e.size===1?`${i}[0]`:n}const Cc=64,ZT=Object.freeze(Object.defineProperty({__proto__:null,arithmetic:TT,dot:IT,equalAll:RT,extent:BT,fround:UT,gather:$T,interleave:xg,length:qT,segmentedMap:jT,select:XT,sequence:({inputs:i,output:e,target:t})=>{const n=Ki(Math.ceil(e.length/Cc),t.device.limits.maxComputeWorkgroupsPerDimension),s=`@group(0) @binding(0) var<storage, read_write> result: array<i32>;

@compute @workgroup_size(${Cc}) fn main(
  @builtin(workgroup_id) workgroupId: vec3<u32>,
  @builtin(local_invocation_id) localId: vec3<u32>
) {
  let rowIndex = ${zs(n,Cc)};
  if (rowIndex >= ${e.length}u) {
    return;
  }

  let rowOffset = ${e.offset/e.ValueType.BYTES_PER_ELEMENT}u + rowIndex * ${e.stride/e.ValueType.BYTES_PER_ELEMENT}u;
  result[rowOffset] = ${i.start} + i32(rowIndex) * ${i.step};
}
`,r=new vt(t.device,{source:s,shaderLayout:{bindings:[{name:"result",type:"storage",group:0,location:0}]}});r.setBindings({result:t});const o=t.device.beginComputePass({});return r.dispatch(o,n.x,n.y,n.z),o.end(),t.device.submit(),r.destroy(),{success:!0}},swizzle:({inputs:i,output:e,target:t})=>{const{columns:n}=i;return rt({module:{name:"swizzle",source:"// swizzle expression handled inline"},expression:s=>`x[${n[s]}]`,inputs:{x:i.x},output:e,outputBuffer:t}),{success:!0}}},Symbol.toStringTag,{value:"Module"}));class KT{constructor(e,{id:t,isTransitionAttribute:n}){this.packedBuffers={},this.device=e,this.id=t,this.isTransitionAttribute=n,this.device.type==="webgpu"&&_c.add("webgpu",{interleave:xg})}hasGroups(e){return this.device.type==="webgpu"&&Object.values(e).some(t=>!!t.settings.bufferGroup)}finalize(){for(const e of Object.values(this.packedBuffers))e.packed.destroy();this.packedBuffers={}}getBufferLayouts(e,t){const n=this._getPackedGroups(e,t,{requireValues:!1,excludeAttributes:{}});return this._getBufferLayouts(e,n,t)}getBindings(e,t,n,s){const r=this._getPackedGroups(e,n,{requireValues:!0,excludeAttributes:s}),o={},a=new Set;for(const c of r.values()){const l=!this.packedBuffers[c.id]||c.attributes.some(u=>!!t[u.id]);o[c.id]=this._getPackedBuffer(c,l);for(const u of c.attributes)a.add(u.id)}return{bufferLayouts:this._getBufferLayouts(e,r,n).filter(c=>!s[c.name]&&!e[c.name]?.settings.isIndexed),buffers:o,groupedAttributeIds:a}}_getPackedGroups(e,t,{requireValues:n,excludeAttributes:s}){const r=new Map;for(const a of Object.values(e)){const c=a.settings.bufferGroup;if(!c)continue;const l=r.get(c)||[];l.push(a),r.set(c,l)}const o=new Map;for(const[a,c]of r){const l=this._getPackedGroup(a,c,t,n,s);l&&o.set(a,l)}return o}_getPackedGroup(e,t,n,s,r){if(t.length<2)return null;const o=t.map(g=>g.getBufferLayout(n)),a=o[0].stepMode,c=Math.max(1,t[0].numInstances),l=s&&t.every(g=>g.isConstant);for(let g=0;g<t.length;g++){const p=t[g],m=p.getAccessor(),y=m.size*m.bytesPerElement;if(r[p.id]||p.settings.isIndexed||p.settings.noAlloc||p.doublePrecision||this.isTransitionAttribute(p.id)||o[g].stepMode!==a||p.numInstances!==t[0].numInstances||(m.offset||0)!==0||(m.vertexOffset||0)!==0||$e(m)!==y||s&&(p.isConstant?!p.getConstantValue()||p.getConstantValue().byteLength<y:!ArrayBuffer.isView(p.value)||p.value.byteLength<c*y))return null}const u={},f=[];let d=0;for(let g=0;g<t.length;g++){const p=t[g];d=wg(d),u[p.id]=d;for(const m of o[g].attributes||[])f.push({...m,byteOffset:d+(m.byteOffset||0)});d+=$e(p.getAccessor())}return d=wg(d),{id:e,attributes:t,byteStride:d,byteOffsets:u,rowCount:c,layout:{name:e,byteStride:l?0:d,stepMode:a,attributes:f}}}_getBufferLayouts(e,t,n){const s=[],r=new Set,o=new Set;for(const a of t.values())for(const c of a.attributes)o.add(c.id);for(const a of Object.values(e)){const c=a.settings.bufferGroup,l=c&&t.get(c);l&&o.has(a.id)?r.has(l.id)||(s.push(l.layout),r.add(l.id)):s.push(a.getBufferLayout(n))}return s}_getPackedBuffer(e,t){const n=JSON.stringify({byteStride:e.layout.byteStride,attributes:e.layout.attributes}),s=this.packedBuffers[e.id];if((!s||s.layoutKey!==n)&&(t=!0),t){s&&(s.packed.destroy(),delete this.packedBuffers[e.id]);const r=this._interleavePackedGroup(e);return this.packedBuffers[e.id]={packed:r,layoutKey:n},r.buffer}if(!s)throw new Error(`Attribute buffer group ${e.id} has no packed buffer`);return s.packed.buffer}_interleavePackedGroup(e){const t=e.attributes.map(s=>this._getInterleaveInput(e,s)),n=oT(...t);return aT(this.device,n),n}_getInterleaveInput(e,t){const n=$e(t.getAccessor()),s=e.byteOffsets[t.id];if(Ji(`${e.id}.${t.id} rowByteLength`,n),Ji(`${e.id}.${t.id} groupByteOffset`,s),t.isConstant){const c=t.getConstantValue();if(!c)throw new Error(`Attribute group ${e.id} is missing constant value ${t.id}`);return Ji(`${e.id}.${t.id} constant byteOffset`,c.byteOffset),new $({id:t.id,type:"uint32",size:n/4,isConstant:!0,value:new Uint32Array(c.buffer,c.byteOffset,n/Uint32Array.BYTES_PER_ELEMENT)})}const r=t.getBuffer(),o=t.byteOffset,a=t.getAccessor().stride||n;if(Ji(`${e.id}.${t.id} byteOffset`,o),Ji(`${e.id}.${t.id} stride`,a),!r)throw new Error(`Attribute group ${e.id} cannot interleave missing buffer ${t.id}`);return new $({id:t.id,type:"uint32",size:n/4,offset:o,stride:a,length:e.rowCount,buffer:r})}}function wg(i){return Math.ceil(i/4)*4}function Ji(i,e){if(e%4!==0)throw new Error(`Attribute buffer groups require 32-bit alignment: ${i}=${e}`)}function Lc(i){const{source:e,target:t,start:n=0,size:s,getData:r}=i,o=i.end||t.length,a=e.length,c=o-n;if(a>c){t.set(e.subarray(0,c),n);return}if(t.set(e,n),!r)return;let l=a;for(;l<c;){const u=r(l,e);for(let f=0;f<s;f++)t[n+l]=u[f]||0,l++}}function QT({source:i,target:e,size:t,getData:n,sourceStartIndices:s,targetStartIndices:r}){if(!s||!r)return Lc({source:i,target:e,size:t,getData:n}),e;let o=0,a=0;const c=n&&((u,f)=>n(u+a,f)),l=Math.min(s.length,r.length);for(let u=1;u<l;u++){const f=s[u]*t,d=r[u]*t;Lc({source:i.subarray(o,f),target:e,start:a,end:d,size:t,getData:c}),o=f,a=d}return a<e.length&&Lc({source:[],target:e,start:a,size:t,getData:c}),e}function JT(i){const{device:e,settings:t,value:n}=i,s=new ig(e,t);return s.setData({value:n instanceof Float64Array?new Float64Array(0):new Float32Array(0),normalized:t.normalized}),s}function Pg(i){switch(i){case 1:return"float";case 2:return"vec2";case 3:return"vec3";case 4:return"vec4";default:throw new Error(`No defined attribute type for size "${i}"`)}}function Sg(i){switch(i){case 1:return"float32";case 2:return"float32x2";case 3:return"float32x3";case 4:return"float32x4";default:throw new Error("invalid type size")}}function Eg(i){i.push(i.shift())}function e1(i,e){const{settings:t,value:n,size:s}=i,r=i.isDoublePrecisionBuffer?2:1;let o=0;const{shaderAttributes:a}=i.settings;if(a)for(const c of Object.values(a))o=Math.max(o,c.vertexOffset??0);return(t.noAlloc?n.length:(e+o)*s)*r}function Cg({device:i,source:e,target:t}){return(!t||t.byteLength<e.byteLength)&&(t?.destroy(),t=i.createBuffer({byteLength:e.byteLength,usage:e.usage})),t}function Lg({device:i,buffer:e,attribute:t,fromLength:n,toLength:s,fromStartIndices:r,getData:o=a=>a}){const a=t.isDoublePrecisionBuffer?2:1,c=t.size*a,l=t.byteOffset,u=t.settings.bytesPerElement<4?l/t.settings.bytesPerElement*4:l,f=t.startIndices,d=r&&f,g=t.isConstant;if(!d&&e&&n>=s)return e;const p=t.value instanceof Float64Array?Float32Array:t.value.constructor,m=g?t.value:new p(t.getBuffer().readSyncWebGL(l,s*p.BYTES_PER_ELEMENT).buffer);if(t.settings.normalized&&!g){const b=o;o=(x,w)=>t.normalizeConstant(b(x,w))}const y=g?(b,x)=>o(m,x):(b,x)=>o(m.subarray(b+l,b+l+c),x),_=e?new Float32Array(e.readSyncWebGL(u,n*4).buffer):new Float32Array(0),v=new Float32Array(s);return QT({source:_,target:v,sourceStartIndices:r,targetStartIndices:f,size:c,getData:y}),(!e||e.byteLength<v.byteLength+u)&&(e?.destroy(),e=i.createBuffer({byteLength:v.byteLength+u,usage:35050})),e.write(v,u),e}class Tg{constructor({device:e,attribute:t,timeline:n}){this.buffers=[],this.currentLength=0,this.device=e,this.transition=new Ts(n),this.attribute=t,this.attributeInTransition=JT(t),this.currentStartIndices=t.startIndices}get inProgress(){return this.transition.inProgress}start(e,t,n=1/0){this.settings=e,this.currentStartIndices=this.attribute.startIndices,this.currentLength=e1(this.attribute,t),this.transition.start({...e,duration:n})}update(){const e=this.transition.update();return e&&this.onUpdate(),e}setBuffer(e){const{stride:t}=this.attributeInTransition.getAccessor();this.attributeInTransition.setData({buffer:e,normalized:this.attribute.settings.normalized,value:this.attributeInTransition.value,stride:t})}cancel(){this.transition.cancel()}delete(){this.cancel();for(const e of this.buffers)e.destroy();this.buffers.length=0}}class t1 extends Tg{constructor({device:e,attribute:t,timeline:n}){super({device:e,attribute:t,timeline:n}),this.type="interpolation",this.transform=s1(e,t)}start(e,t){const n=this.currentLength,s=this.currentStartIndices;if(super.start(e,t,e.duration),e.duration<=0){this.transition.cancel();return}const{buffers:r,attribute:o}=this;Eg(r),r[0]=Lg({device:this.device,buffer:r[0],attribute:o,fromLength:n,toLength:this.currentLength,fromStartIndices:s,getData:e.enter}),r[1]=Cg({device:this.device,source:r[0],target:r[1]}),this.setBuffer(r[1]);const{transform:a}=this,c=a.model;let l=Math.floor(this.currentLength/o.size);Ig(o)&&(l/=2),c.setVertexCount(l),o.isConstant?(c.setAttributes({aFrom:r[0]}),c.setConstantAttributes({aTo:o.value})):c.setAttributes({aFrom:r[0],aTo:o.getBuffer()}),a.transformFeedback.setBuffers({vCurrent:r[1]})}onUpdate(){const{duration:e,easing:t}=this.settings,{time:n}=this.transition;let s=n/e;t&&(s=t(s));const{model:r}=this.transform,o={time:s};r.shaderInputs.setProps({interpolation:o}),this.transform.run({discard:!0})}delete(){super.delete(),this.transform.destroy()}}const Ag={name:"interpolation",vs:`layout(std140) uniform interpolationUniforms {
  float time;
} interpolation;
`,uniformTypes:{time:"f32"}},i1=`#version 300 es
#define SHADER_NAME interpolation-transition-vertex-shader

in ATTRIBUTE_TYPE aFrom;
in ATTRIBUTE_TYPE aTo;
out ATTRIBUTE_TYPE vCurrent;

void main(void) {
  vCurrent = mix(aFrom, aTo, interpolation.time);
  gl_Position = vec4(0.0);
}
`,n1=`#version 300 es
#define SHADER_NAME interpolation-transition-vertex-shader

in ATTRIBUTE_TYPE aFrom;
in ATTRIBUTE_TYPE aFrom64Low;
in ATTRIBUTE_TYPE aTo;
in ATTRIBUTE_TYPE aTo64Low;
out ATTRIBUTE_TYPE vCurrent;
out ATTRIBUTE_TYPE vCurrent64Low;

vec2 mix_fp64(vec2 a, vec2 b, float x) {
  vec2 range = sub_fp64(b, a);
  return sum_fp64(a, mul_fp64(range, vec2(x, 0.0)));
}

void main(void) {
  for (int i=0; i<ATTRIBUTE_SIZE; i++) {
    vec2 value = mix_fp64(vec2(aFrom[i], aFrom64Low[i]), vec2(aTo[i], aTo64Low[i]), interpolation.time);
    vCurrent[i] = value.x;
    vCurrent64Low[i] = value.y;
  }
  gl_Position = vec4(0.0);
}
`;function Ig(i){return i.isDoublePrecisionBuffer}function s1(i,e){const t=e.size,n=Pg(t),s=Sg(t),r=e.getBufferLayout();return Ig(e)?new Ne(i,{vs:n1,bufferLayout:[{name:"aFrom",byteStride:8*t,attributes:[{attribute:"aFrom",format:s,byteOffset:0},{attribute:"aFrom64Low",format:s,byteOffset:4*t}]},{name:"aTo",byteStride:8*t,attributes:[{attribute:"aTo",format:s,byteOffset:0},{attribute:"aTo64Low",format:s,byteOffset:4*t}]}],modules:[Nw,Ag],defines:{ATTRIBUTE_TYPE:n,ATTRIBUTE_SIZE:t},moduleSettings:{},varyings:["vCurrent","vCurrent64Low"],bufferMode:35980,disableWarnings:!0}):new Ne(i,{vs:i1,bufferLayout:[{name:"aFrom",format:s},{name:"aTo",format:r.attributes[0].format}],modules:[Ag],defines:{ATTRIBUTE_TYPE:n},varyings:["vCurrent"],disableWarnings:!0})}class r1 extends Tg{constructor({device:e,attribute:t,timeline:n}){super({device:e,attribute:t,timeline:n}),this.type="spring",this.texture=u1(e),this.framebuffer=f1(e,this.texture),this.transform=l1(e,t)}start(e,t){const n=this.currentLength,s=this.currentStartIndices;super.start(e,t);const{buffers:r,attribute:o}=this;for(let c=0;c<2;c++)r[c]=Lg({device:this.device,buffer:r[c],attribute:o,fromLength:n,toLength:this.currentLength,fromStartIndices:s,getData:e.enter});r[2]=Cg({device:this.device,source:r[0],target:r[2]}),this.setBuffer(r[1]);const{model:a}=this.transform;a.setVertexCount(Math.floor(this.currentLength/o.size)),o.isConstant?a.setConstantAttributes({aTo:o.value}):a.setAttributes({aTo:o.getBuffer()})}onUpdate(){const{buffers:e,transform:t,framebuffer:n,transition:s}=this,r=this.settings;t.model.setAttributes({aPrev:e[0],aCur:e[1]}),t.transformFeedback.setBuffers({vNext:e[2]});const o={stiffness:r.stiffness,damping:r.damping};t.model.shaderInputs.setProps({spring:o}),t.run({framebuffer:n,discard:!1,parameters:{viewport:[0,0,1,1]},clearColor:[0,0,0,0]}),Eg(e),this.setBuffer(e[1]),this.device.readPixelsToArrayWebGL(n)[0]>0||s.end()}delete(){super.delete(),this.transform.destroy(),this.texture.destroy(),this.framebuffer.destroy()}}const o1={name:"spring",vs:`layout(std140) uniform springUniforms {
  float damping;
  float stiffness;
} spring;
`,uniformTypes:{damping:"f32",stiffness:"f32"}},a1=`#version 300 es
#define SHADER_NAME spring-transition-vertex-shader

#define EPSILON 0.00001

in ATTRIBUTE_TYPE aPrev;
in ATTRIBUTE_TYPE aCur;
in ATTRIBUTE_TYPE aTo;
out ATTRIBUTE_TYPE vNext;
out float vIsTransitioningFlag;

ATTRIBUTE_TYPE getNextValue(ATTRIBUTE_TYPE cur, ATTRIBUTE_TYPE prev, ATTRIBUTE_TYPE dest) {
  ATTRIBUTE_TYPE velocity = cur - prev;
  ATTRIBUTE_TYPE delta = dest - cur;
  ATTRIBUTE_TYPE force = delta * spring.stiffness;
  ATTRIBUTE_TYPE resistance = velocity * spring.damping;
  return force - resistance + velocity + cur;
}

void main(void) {
  bool isTransitioning = length(aCur - aPrev) > EPSILON || length(aTo - aCur) > EPSILON;
  vIsTransitioningFlag = isTransitioning ? 1.0 : 0.0;

  vNext = getNextValue(aCur, aPrev, aTo);
  gl_Position = vec4(0, 0, 0, 1);
  gl_PointSize = 100.0;
}
`,c1=`#version 300 es
#define SHADER_NAME spring-transition-is-transitioning-fragment-shader

in float vIsTransitioningFlag;

out vec4 fragColor;

void main(void) {
  if (vIsTransitioningFlag == 0.0) {
    discard;
  }
  fragColor = vec4(1.0);
}`;function l1(i,e){const t=Pg(e.size),n=Sg(e.size);return new Ne(i,{vs:a1,fs:c1,bufferLayout:[{name:"aPrev",format:n},{name:"aCur",format:n},{name:"aTo",format:e.getBufferLayout().attributes[0].format}],varyings:["vNext"],modules:[o1],defines:{ATTRIBUTE_TYPE:t},parameters:{depthCompare:"always",blendColorOperation:"max",blendColorSrcFactor:"one",blendColorDstFactor:"one",blendAlphaOperation:"max",blendAlphaSrcFactor:"one",blendAlphaDstFactor:"one"}})}function u1(i){return i.createTexture({data:new Uint8Array(4),format:"rgba8unorm",width:1,height:1})}function f1(i,e){return i.createFramebuffer({id:"spring-transition-is-transitioning-framebuffer",width:1,height:1,colorAttachments:[e]})}const d1={interpolation:t1,spring:r1};class h1{constructor(e,{id:t,timeline:n}){if(!e)throw new Error("AttributeTransitionManager is constructed without device");this.id=t,this.device=e,this.timeline=n,this.transitions={},this.needsRedraw=!1,this.numInstances=1}finalize(){for(const e in this.transitions)this._removeTransition(e)}update({attributes:e,transitions:t,numInstances:n}){this.numInstances=n||1;for(const s in e){const r=e[s],o=r.getTransitionSetting(t);o&&this._updateAttribute(s,r,o)}for(const s in this.transitions){const r=e[s];(!r||!r.getTransitionSetting(t))&&this._removeTransition(s)}}hasAttribute(e){const t=this.transitions[e];return t&&t.inProgress}getAttributes(){const e={};for(const t in this.transitions){const n=this.transitions[t];n.inProgress&&(e[t]=n.attributeInTransition)}return e}run(){if(this.numInstances===0)return!1;for(const t in this.transitions)this.transitions[t].update()&&(this.needsRedraw=!0);const e=this.needsRedraw;return this.needsRedraw=!1,e}_removeTransition(e){this.transitions[e].delete(),delete this.transitions[e]}_updateAttribute(e,t,n){const s=this.transitions[e];let r=!s||s.type!==n.type;if(r){s&&this._removeTransition(e);const o=d1[n.type];o?this.transitions[e]=new o({attribute:t,timeline:this.timeline,device:this.device}):(D.error(`unsupported transition type '${n.type}'`)(),r=!1)}(r||t.needsRedraw())&&(this.needsRedraw=!0,this.transitions[e].start(n,this.numInstances))}}const Mg="attributeManager.invalidate",g1="attributeManager.updateStart",p1="attributeManager.updateEnd",m1="attribute.updateStart",y1="attribute.allocate",b1="attribute.updateEnd";class Rg{constructor(e,{id:t="attribute-manager",stats:n,timeline:s}={}){this.mergeBoundsMemoized=Ii(PS),this.id=t,this.device=e,this.attributes={},this.updateTriggers={},this.needsRedraw=!0,this.userData={},this.stats=n,this.attributeTransitionManager=new h1(e,{id:`${t}-transitions`,timeline:s}),this.attributeBufferGroups=e.type==="webgpu"?new KT(e,{id:t,isTransitionAttribute:r=>this.attributeTransitionManager.hasAttribute(r)}):null,Object.seal(this)}finalize(){this.attributeBufferGroups?.finalize();for(const e in this.attributes)this.attributes[e].delete();this.attributeTransitionManager.finalize()}getNeedsRedraw(e={clearRedrawFlags:!1}){const t=this.needsRedraw;return this.needsRedraw=this.needsRedraw&&!e.clearRedrawFlags,t&&this.id}setNeedsRedraw(){this.needsRedraw=!0}add(e){this._add(e)}addInstanced(e){this._add(e,{stepMode:"instance"})}remove(e){for(const t of e)this.attributes[t]!==void 0&&(this.attributes[t].delete(),delete this.attributes[t])}invalidate(e,t){const n=this._invalidateTrigger(e,t);ie(Mg,this,e,n)}invalidateAll(e){for(const t in this.attributes)this.attributes[t].setNeedsUpdate(t,e);ie(Mg,this,"all")}update({data:e,numInstances:t,startIndices:n=null,transitions:s,props:r={},buffers:o={},context:a={}}){let c=!1;ie(g1,this),this.stats&&this.stats.get("Update Attributes").timeStart();for(const l in this.attributes){const u=this.attributes[l],f=u.settings.accessor;u.startIndices=n,u.numInstances=t,r[l]&&D.removed(`props.${l}`,`data.attributes.${l}`)(),u.setExternalBuffer(o[l])||u.setBinaryValue(typeof f=="string"?o[f]:void 0,e.startIndices)||typeof f=="string"&&!o[f]&&u.setConstantValue(a,r[f])||u.needsUpdate()&&(c=!0,this._updateAttribute({attribute:u,numInstances:t,data:e,props:r,context:a})),this.needsRedraw=this.needsRedraw||u.needsRedraw()}c&&ie(p1,this,t),this.stats&&(this.stats.get("Update Attributes").timeEnd(),c&&this.stats.get("Attributes updated").incrementCount()),this.attributeTransitionManager.update({attributes:this.attributes,numInstances:t,transitions:s})}updateTransition(){const{attributeTransitionManager:e}=this,t=e.run();return this.needsRedraw=this.needsRedraw||t,t}getAttributes(){return{...this.attributes,...this.attributeTransitionManager.getAttributes()}}getBounds(e){const t=e.map(n=>this.attributes[n]?.getBounds());return this.mergeBoundsMemoized(t)}getChangedAttributes(e={clearChangedFlags:!1}){const{attributes:t,attributeTransitionManager:n}=this,s={...n.getAttributes()};for(const r in t){const o=t[r];o.needsRedraw(e)&&!n.hasAttribute(r)&&(s[r]=o)}return s}getBufferLayouts(e){return this.hasBufferGroups()?this.attributeBufferGroups.getBufferLayouts(this.getAttributes(),e):Object.values(this.getAttributes()).map(t=>t.getBufferLayout(e))}hasBufferGroups(){return!!this.attributeBufferGroups?.hasGroups(this.attributes)}getBufferGroupBindings(e,t,n={}){return this.attributeBufferGroups?this.attributeBufferGroups.getBindings(this.getAttributes(),e,t,n):{bufferLayouts:this.getBufferLayouts(t),buffers:{},groupedAttributeIds:new Set}}_add(e,t){for(const n in e){const s=e[n],r={...s,id:n,size:s.isIndexed&&1||s.size||1,...t};this.attributes[n]=new ig(this.device,r)}this._mapUpdateTriggersToAttributes()}_mapUpdateTriggersToAttributes(){const e={};for(const t in this.attributes)this.attributes[t].getUpdateTriggers().forEach(s=>{e[s]||(e[s]=[]),e[s].push(t)});this.updateTriggers=e}_invalidateTrigger(e,t){const{attributes:n,updateTriggers:s}=this,r=s[e];return r&&r.forEach(o=>{const a=n[o];a&&a.setNeedsUpdate(a.id,t)}),r}_updateAttribute(e){const{attribute:t,numInstances:n}=e;if(ie(m1,t),t.constant){t.setConstantValue(e.context,t.value);return}t.allocate(n)&&ie(y1,t,n),t.updateBuffer(e)&&(this.needsRedraw=!0,ie(b1,t,n))}}class _1 extends Ts{get value(){return this._value}_onUpdate(){const{time:e,settings:{fromValue:t,toValue:n,duration:s,easing:r}}=this,o=r(e/s);this._value=is(t,n,o)}}const Og=1e-5;function Bg(i,e,t,n,s){const r=e-i,a=(t-e)*s,c=-r*n;return a+c+r+e}function v1(i,e,t,n,s){if(Array.isArray(t)){const r=[];for(let o=0;o<t.length;o++)r[o]=Bg(i[o],e[o],t[o],n,s);return r}return Bg(i,e,t,n,s)}function kg(i,e){if(Array.isArray(i)){let t=0;for(let n=0;n<i.length;n++){const s=i[n]-e[n];t+=s*s}return Math.sqrt(t)}return Math.abs(i-e)}class x1 extends Ts{get value(){return this._currValue}_onUpdate(){const{fromValue:e,toValue:t,damping:n,stiffness:s}=this.settings,{_prevValue:r=e,_currValue:o=e}=this;let a=v1(r,o,t,n,s);const c=kg(a,t),l=kg(a,o);c<Og&&l<Og&&(a=t,this.end()),this._prevValue=o,this._currValue=a}}const w1={interpolation:_1,spring:x1};class P1{constructor(e){this.transitions=new Map,this.timeline=e}get active(){return this.transitions.size>0}add(e,t,n,s){const{transitions:r}=this;if(r.has(e)){const c=r.get(e),{value:l=c.settings.fromValue}=c;t=l,this.remove(e)}if(s=tg(s),!s)return;const o=w1[s.type];if(!o){D.error(`unsupported transition type '${s.type}'`)();return}const a=new o(this.timeline);a.start({...s,fromValue:t,toValue:n}),r.set(e,a)}remove(e){const{transitions:t}=this;t.has(e)&&(t.get(e).cancel(),t.delete(e))}update(){const e={};for(const[t,n]of this.transitions)n.update(),e[t]=n.value,n.inProgress||this.remove(t);return e}clear(){for(const e of this.transitions.keys())this.remove(e)}}function S1(i){const e=i[it];for(const t in e){const n=e[t],{validate:s}=n;if(s&&!s(i[t],n))throw new Error(`Invalid prop ${t}: ${i[t]}`)}}function E1(i,e){const t=Dg({newProps:i,oldProps:e,propTypes:i[it],ignoreProps:{data:null,updateTriggers:null,extensions:null,transitions:null}}),n=L1(i,e);let s=!1;return n||(s=T1(i,e)),{dataChanged:n,propsChanged:t,updateTriggersChanged:s,extensionsChanged:A1(i,e),transitionsChanged:C1(i,e)}}function C1(i,e){if(!i.transitions)return!1;const t={},n=i[it];let s=!1;for(const r in i.transitions){const o=n[r],a=o&&o.type;(a==="number"||a==="color"||a==="array")&&Tc(i[r],e[r],o)&&(t[r]=!0,s=!0)}return s?t:!1}function Dg({newProps:i,oldProps:e,ignoreProps:t={},propTypes:n={},triggerName:s="props"}){if(e===i)return!1;if(typeof i!="object"||i===null)return`${s} changed shallowly`;if(typeof e!="object"||e===null)return`${s} changed shallowly`;for(const r of Object.keys(i))if(!(r in t)){if(!(r in e))return`${s}.${r} added`;const o=Tc(i[r],e[r],n[r]);if(o)return`${s}.${r} ${o}`}for(const r of Object.keys(e))if(!(r in t)){if(!(r in i))return`${s}.${r} dropped`;if(!Object.hasOwnProperty.call(i,r)){const o=Tc(i[r],e[r],n[r]);if(o)return`${s}.${r} ${o}`}}return!1}function Tc(i,e,t){let n=t&&t.equal;return n&&!n(i,e,t)||!n&&(n=i&&e&&i.equals,n&&!n.call(i,e))?"changed deeply":!n&&e!==i?"changed shallowly":null}function L1(i,e){if(e===null)return"oldProps is null, initial diff";let t=!1;const{dataComparator:n,_dataDiff:s}=i;return n?n(i.data,e.data)||(t="Data comparator detected a change"):i.data!==e.data&&(t="A new data container was supplied"),t&&s&&(t=s(i.data,e.data)||t),t}function T1(i,e){if(e===null)return{all:!0};if("all"in i.updateTriggers&&Fg(i,e,"all"))return{all:!0};const t={};let n=!1;for(const s in i.updateTriggers)s!=="all"&&Fg(i,e,s)&&(t[s]=!0,n=!0);return n?t:!1}function A1(i,e){if(e===null)return!0;const t=e.extensions,{extensions:n}=i;if(n===t)return!1;if(!t||!n||n.length!==t.length)return!0;for(let s=0;s<n.length;s++)if(!n[s].equals(t[s]))return!0;return!1}function Fg(i,e,t){let n=i.updateTriggers[t];n=n??{};let s=e.updateTriggers[t];return s=s??{},Dg({oldProps:s,newProps:n,triggerName:t})}const I1="count(): argument not an object",M1="count(): argument not a container";function R1(i){if(!B1(i))throw new Error(I1);if(typeof i.count=="function")return i.count();if(Number.isFinite(i.size))return i.size;if(Number.isFinite(i.length))return i.length;if(O1(i))return Object.keys(i).length;throw new Error(M1)}function O1(i){return i!==null&&typeof i=="object"&&i.constructor===Object}function B1(i){return i!==null&&typeof i=="object"}function Ng(i,e){if(!e)return i;const t={...i,...e};if("defines"in e&&(t.defines={...i.defines,...e.defines}),"modules"in e&&(t.modules=(i.modules||[]).concat(e.modules),e.modules.some(n=>n.name==="project64"))){const n=t.modules.findIndex(s=>s.name==="project32");n>=0&&t.modules.splice(n,1)}if("inject"in e)if(!i.inject)t.inject=e.inject;else{const n={...i.inject};for(const s in e.inject)n[s]=(n[s]||"")+e.inject[s];t.inject=n}return t}const k1={minFilter:"linear",mipmapFilter:"linear",magFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"},Ac={};function D1(i,e,t,n){if(t instanceof H)return t;t.constructor&&t.constructor.name!=="Object"&&(t={data:t});let s=null;t.compressed&&(s={minFilter:"linear",mipmapFilter:t.data.length>1?"nearest":"linear"});const{width:r,height:o}=t.data,a=e.createTexture({...t,sampler:{...k1,...s,...n},mipLevels:e.getMipLevelCount(r,o)});return e.type==="webgl"?a.generateMipmapsWebGL():e.type==="webgpu"&&e.generateMipmapsWebGPU(a),Ac[a.id]=i,a}function F1(i,e){!e||!(e instanceof H)||Ac[e.id]===i&&(e.delete(),delete Ac[e.id])}const N1={boolean:{validate(i,e){return!0},equal(i,e,t){return!!i==!!e}},number:{validate(i,e){return Number.isFinite(i)&&(!("max"in e)||i<=e.max)&&(!("min"in e)||i>=e.min)}},color:{validate(i,e){return e.optional&&!i||Ic(i)&&(i.length===3||i.length===4)},equal(i,e,t){return ee(i,e,1)}},accessor:{validate(i,e){const t=$s(i);return t==="function"||t===$s(e.value)},equal(i,e,t){return typeof e=="function"?!0:ee(i,e,1)}},array:{validate(i,e){return e.optional&&!i||Ic(i)},equal(i,e,t){const{compare:n}=t,s=Number.isInteger(n)?n:n?1:0;return n?ee(i,e,s):i===e}},object:{equal(i,e,t){if(t.ignore)return!0;const{compare:n}=t,s=Number.isInteger(n)?n:n?1:0;return n?ee(i,e,s):i===e}},function:{validate(i,e){return e.optional&&!i||typeof i=="function"},equal(i,e,t){return!t.compare&&t.ignore!==!1||i===e}},data:{transform:(i,e,t)=>{if(!i)return i;const{dataTransform:n}=t.props;return n?n(i):typeof i.shape=="string"&&i.shape.endsWith("-table")&&Array.isArray(i.data)?i.data:i}},image:{transform:(i,e,t)=>{const n=t.context;return!n||!n.device?null:D1(t.id,n.device,i,{...e.parameters,...t.props.textureParameters})},release:(i,e,t)=>{F1(t.id,i)}}};function z1(i){const e={},t={},n={};for(const[s,r]of Object.entries(i)){const o=r?.deprecatedFor;if(o)n[s]=Array.isArray(o)?o:[o];else{const a=U1(s,r);e[s]=a,t[s]=a.value}}return{propTypes:e,defaultProps:t,deprecatedProps:n}}function U1(i,e){switch($s(e)){case"object":return en(i,e);case"array":return en(i,{type:"array",value:e,compare:!1});case"boolean":return en(i,{type:"boolean",value:e});case"number":return en(i,{type:"number",value:e});case"function":return en(i,{type:"function",value:e,compare:!0});default:return{name:i,type:"unknown",value:e}}}function en(i,e){return"type"in e?{name:i,...N1[e.type],...e}:"value"in e?{name:i,type:$s(e.value),...e}:{name:i,type:"object",value:e}}function Ic(i){return Array.isArray(i)||ArrayBuffer.isView(i)}function $s(i){return Ic(i)?"array":i===null?"null":typeof i}function $1(i,e){let t;for(let r=e.length-1;r>=0;r--){const o=e[r];"extensions"in o&&(t=o.extensions)}const n=Mc(i.constructor,t),s=Object.create(n);s[Ls]=i,s[xt]={},s[nt]={};for(let r=0;r<e.length;++r){const o=e[r];for(const a in o)s[a]=o[a]}return Object.freeze(s),s}const G1="_mergedDefaultProps";function Mc(i,e){if(!(i instanceof Gs.constructor))return{};let t=G1;if(e)for(const s of e){const r=s.constructor;r&&(t+=`:${r.extensionName||r.name}`)}const n=zg(i,t);return n||(i[t]=V1(i,e||[]))}function V1(i,e){if(!i.prototype)return null;const n=Object.getPrototypeOf(i),s=Mc(n),r=zg(i,"defaultProps")||{},o=z1(r),a=Object.assign(Object.create(null),s,o.defaultProps),c=Object.assign(Object.create(null),s?.[it],o.propTypes),l=Object.assign(Object.create(null),s?.[Fa],o.deprecatedProps);for(const u of e){const f=Mc(u.constructor);f&&(Object.assign(a,f),Object.assign(c,f[it]),Object.assign(l,f[Fa]))}return j1(a,i),H1(a,c),W1(a,l),a[it]=c,a[Fa]=l,e.length===0&&!Rc(i,"_propTypes")&&(i._propTypes=c),a}function j1(i,e){const t=q1(e);Object.defineProperties(i,{id:{writable:!0,value:t}})}function W1(i,e){for(const t in e)Object.defineProperty(i,t,{enumerable:!1,set(n){const s=`${this.id}: ${t}`;for(const r of e[t])Rc(this,r)||(this[r]=n);D.deprecated(s,e[t].join("/"))()}})}function H1(i,e){const t={},n={};for(const s in e){const r=e[s],{name:o,value:a}=r;r.async&&(t[o]=a,n[o]=Y1(o))}i[ti]=t,i[xt]={},Object.defineProperties(i,n)}function Y1(i){return{enumerable:!0,set(e){typeof e=="string"||e instanceof Promise||Jh(e)?this[xt][i]=e:this[nt][i]=e},get(){if(this[nt]){if(i in this[nt])return this[nt][i]||this[ti][i];if(i in this[xt]){const e=this[Ls]&&this[Ls].internalState;if(e&&e.hasAsyncProp(i))return e.getAsyncProp(i)||this[ti][i]}}return this[ti][i]}}}function Rc(i,e){return Object.prototype.hasOwnProperty.call(i,e)}function zg(i,e){return Rc(i,e)&&i[e]}function q1(i){const e=i.componentName;return e||D.warn(`${i.name}.componentName not specified`)(),e||i.name}let X1=0;class Gs{constructor(...e){this.props=$1(this,e),this.id=this.props.id,this.count=X1++}clone(e){const{props:t}=this,n={};for(const s in t[ti])s in t[nt]?n[s]=t[nt][s]:s in t[xt]&&(n[s]=t[xt][s]);return new this.constructor({...t,...n,...e})}}Gs.componentName="Component",Gs.defaultProps={};const Z1=Object.freeze({});class K1{constructor(e){this.component=e,this.asyncProps={},this.onAsyncPropUpdated=()=>{},this.oldProps=null,this.oldAsyncProps=null}finalize(){for(const e in this.asyncProps){const t=this.asyncProps[e];t&&t.type&&t.type.release&&t.type.release(t.resolvedValue,t.type,this.component)}this.asyncProps={},this.component=null,this.resetOldProps()}getOldProps(){return this.oldAsyncProps||this.oldProps||Z1}resetOldProps(){this.oldAsyncProps=null,this.oldProps=this.component?this.component.props:null}hasAsyncProp(e){return e in this.asyncProps}getAsyncProp(e){const t=this.asyncProps[e];return t&&t.resolvedValue}isAsyncPropLoading(e){if(e){const t=this.asyncProps[e];return!!(t&&t.pendingLoadCount>0&&t.pendingLoadCount!==t.resolvedLoadCount)}for(const t in this.asyncProps)if(this.isAsyncPropLoading(t))return!0;return!1}reloadAsyncProp(e,t){this._watchPromise(e,Promise.resolve(t))}setAsyncProps(e){this.component=e[Ls]||this.component;const t=e[nt]||{},n=e[xt]||e,s=e[ti]||{};for(const r in t){const o=t[r];this._createAsyncPropData(r,s[r]),this._updateAsyncProp(r,o),t[r]=this.getAsyncProp(r)}for(const r in n){const o=n[r];this._createAsyncPropData(r,s[r]),this._updateAsyncProp(r,o)}}_fetch(e,t){return null}_onResolve(e,t){}_onError(e,t){}_updateAsyncProp(e,t){if(this._didAsyncInputValueChange(e,t)){if(typeof t=="string"&&(t=this._fetch(e,t)),t instanceof Promise){this._watchPromise(e,t);return}if(Jh(t)){this._resolveAsyncIterable(e,t);return}this._setPropValue(e,t)}}_freezeAsyncOldProps(){if(!this.oldAsyncProps&&this.oldProps){this.oldAsyncProps=Object.create(this.oldProps);for(const e in this.asyncProps)Object.defineProperty(this.oldAsyncProps,e,{enumerable:!0,value:this.oldProps[e]})}}_didAsyncInputValueChange(e,t){const n=this.asyncProps[e];return t===n.resolvedValue||t===n.lastValue?!1:(n.lastValue=t,!0)}_setPropValue(e,t){this._freezeAsyncOldProps();const n=this.asyncProps[e];n&&(t=this._postProcessValue(n,t),n.resolvedValue=t,n.pendingLoadCount++,n.resolvedLoadCount=n.pendingLoadCount)}_setAsyncPropValue(e,t,n){const s=this.asyncProps[e];s&&n>=s.resolvedLoadCount&&t!==void 0&&(this._freezeAsyncOldProps(),s.resolvedValue=t,s.resolvedLoadCount=n,this.onAsyncPropUpdated(e,t))}_watchPromise(e,t){const n=this.asyncProps[e];if(n){n.pendingLoadCount++;const s=n.pendingLoadCount;t.then(r=>{this.component&&(r=this._postProcessValue(n,r),this._setAsyncPropValue(e,r,s),this._onResolve(e,r))}).catch(r=>{this._onError(e,r)})}}async _resolveAsyncIterable(e,t){if(e!=="data"){this._setPropValue(e,t);return}const n=this.asyncProps[e];if(!n)return;n.pendingLoadCount++;const s=n.pendingLoadCount;let r=[],o=0;for await(const a of t){if(!this.component)return;const{dataTransform:c}=this.component.props;c?r=c(a,r):r=r.concat(a),Object.defineProperty(r,"__diff",{enumerable:!1,value:[{startRow:o,endRow:r.length}]}),o=r.length,this._setAsyncPropValue(e,r,s)}this._onResolve(e,r)}_postProcessValue(e,t){const n=e.type;return n&&this.component&&(n.release&&n.release(e.resolvedValue,n,this.component),n.transform)?n.transform(t,n,this.component):t}_createAsyncPropData(e,t){if(!this.asyncProps[e]){const s=this.component&&this.component.props[it];this.asyncProps[e]={type:s&&s[e],lastValue:null,resolvedValue:t,pendingLoadCount:0,resolvedLoadCount:0}}}}class Q1 extends K1{constructor({attributeManager:e,layer:t}){super(t),this.attributeManager=e,this.needsRedraw=!0,this.needsUpdate=!0,this.subLayers=null,this.usesPickingColorCache=!1,this.disabledPickingIndices=[]}get layer(){return this.component}_fetch(e,t){const n=this.layer,s=n?.props.fetch;return s?s(t,{propName:e,layer:n}):super._fetch(e,t)}_onResolve(e,t){const n=this.layer;if(n){const s=n.props.onDataLoad;e==="data"&&s&&s(t,{propName:e,layer:n})}}_onError(e,t){const n=this.layer;n&&n.raiseError(t,`loading ${e} of ${this.layer}`)}}const J1="layer.changeFlag",eA="layer.initialize",tA="layer.update",iA="layer.finalize",nA="layer.matched",Ug=2**24-1,sA=Object.freeze([]),rA=Ii(({oldViewport:i,viewport:e})=>i.equals(e));let be=new Uint8ClampedArray(0);function $g(i){return i.rowIndexes||i.pickingColors||i.instancePickingColors}function Oc(i){return i.rowIndexes}function Bc(i){return i.pickingColors||i.instancePickingColors}const oA={data:{type:"data",value:sA,async:!0},dataComparator:{type:"function",value:null,optional:!0},_dataDiff:{type:"function",value:i=>i&&i.__diff,optional:!0},dataTransform:{type:"function",value:null,optional:!0},onDataLoad:{type:"function",value:null,optional:!0},onError:{type:"function",value:null,optional:!0},fetch:{type:"function",value:(i,{propName:e,layer:t,loaders:n,loadOptions:s,signal:r})=>{const{resourceManager:o}=t.context;s=s||t.getLoadOptions(),n=n||t.props.loaders,r&&(s={...s,core:{...s?.core,fetch:{...s?.core?.fetch,signal:r}}});let a=o.contains(i);return!a&&!s&&(o.add({resourceId:i,data:Ln(i,n),persistent:!1}),a=!0),a?o.subscribe({resourceId:i,onChange:c=>t.internalState?.reloadAsyncProp(e,c),consumerId:t.id,requestId:e}):Ln(i,n,s)}},updateTriggers:{},visible:!0,pickable:!1,opacity:{type:"number",min:0,max:1,value:1},operation:"draw",onHover:{type:"function",value:null,optional:!0},onClick:{type:"function",value:null,optional:!0},onDragStart:{type:"function",value:null,optional:!0},onDrag:{type:"function",value:null,optional:!0},onDragEnd:{type:"function",value:null,optional:!0},coordinateSystem:"default",coordinateOrigin:{type:"array",value:[0,0,0],compare:!0},modelMatrix:{type:"array",value:null,compare:!0,optional:!0},wrapLongitude:!1,positionFormat:"XYZ",colorFormat:"RGBA",parameters:{type:"object",value:{},optional:!0,compare:2},loadOptions:{type:"object",value:null,optional:!0,ignore:!0},transitions:null,extensions:[],loaders:{type:"array",value:[],optional:!0,ignore:!0},getPolygonOffset:{type:"function",value:({layerIndex:i})=>[0,-i*100]},highlightedObjectIndex:null,autoHighlight:!1,highlightColor:{type:"accessor",value:[0,0,128,128]}};class Ge extends Gs{constructor(){super(...arguments),this.internalState=null,this.lifecycle=ei.NO_STATE,this.parent=null}static get componentName(){return Object.prototype.hasOwnProperty.call(this,"layerName")?this.layerName:""}get root(){let e=this;for(;e.parent;)e=e.parent;return e}toString(){return`${this.constructor.layerName||this.constructor.name}({id: '${this.props.id}'})`}project(e){W(this.internalState);const t=this.internalState.viewport||this.context.viewport,n=Ea(e,{viewport:t,modelMatrix:this.props.modelMatrix,coordinateOrigin:this.props.coordinateOrigin,coordinateSystem:this.props.coordinateSystem}),[s,r,o]=va(n,t.pixelProjectionMatrix);return e.length===2?[s,r]:[s,r,o]}unproject(e){return W(this.internalState),(this.internalState.viewport||this.context.viewport).unproject(e)}projectPosition(e,t){W(this.internalState);const n=this.internalState.viewport||this.context.viewport;return AS(e,{viewport:n,modelMatrix:this.props.modelMatrix,coordinateOrigin:this.props.coordinateOrigin,coordinateSystem:this.props.coordinateSystem,...t})}get isComposite(){return!1}get isDrawable(){return!0}setState(e){this.setChangeFlags({stateChanged:!0}),Object.assign(this.state,e),this.setNeedsRedraw()}setNeedsRedraw(){this.internalState&&(this.internalState.needsRedraw=!0)}setNeedsUpdate(){this.internalState&&(this.context.layerManager.setNeedsUpdate(String(this)),this.internalState.needsUpdate=!0)}get isLoaded(){return this.internalState?!this.internalState.isAsyncPropLoading():!1}get wrapLongitude(){return this.props.wrapLongitude}isPickable(){return this.props.pickable&&this.props.visible}getModels(){const e=this.state;return e&&(e.models||e.model&&[e.model])||[]}setShaderModuleProps(...e){for(const t of this.getModels())t.shaderInputs.setProps(...e)}getAttributeManager(){return this.internalState&&this.internalState.attributeManager}getCurrentLayer(){return this.internalState&&this.internalState.layer}getLoadOptions(){return this.props.loadOptions}use64bitPositions(){const{coordinateSystem:e}=this.props;return e==="default"||e==="lnglat"||e==="cartesian"}onHover(e,t){return this.props.onHover&&this.props.onHover(e,t)||!1}onClick(e,t){return this.props.onClick&&this.props.onClick(e,t)||!1}nullPickingColor(){return[0,0,0]}encodePickingColor(e,t=[]){return t[0]=e+1&255,t[1]=e+1>>8&255,t[2]=e+1>>8>>8&255,t}decodePickingColor(e){W(e instanceof Uint8Array);const[t,n,s]=e;return t+n*256+s*65536-1}getNumInstances(){return Number.isFinite(this.props.numInstances)?this.props.numInstances:this.state&&this.state.numInstances!==void 0?this.state.numInstances:R1(this.props.data)}getStartIndices(){return this.props.startIndices?this.props.startIndices:this.state&&this.state.startIndices?this.state.startIndices:null}getBounds(){return this.getAttributeManager()?.getBounds(["positions","instancePositions"])}getShaders(e){e=Ng(e,{disableWarnings:!0,modules:this.context.defaultShaderModules});for(const t of this.props.extensions)e=Ng(e,t.getShaders.call(this,t));return e}shouldUpdateState(e){return e.changeFlags.propsOrDataChanged}updateState(e){const t=this.getAttributeManager(),{dataChanged:n}=e.changeFlags;if(n&&t)if(Array.isArray(n))for(const s of n)t.invalidateAll(s);else t.invalidateAll();if(t){const{props:s}=e,r=this.internalState.hasPickingBuffer,o=Number.isInteger(s.highlightedObjectIndex)||!!s.pickable||s.extensions.some(a=>a.getNeedsPickingBuffer.call(this,a));if(r!==o){this.internalState.hasPickingBuffer=o;const a=$g(t.attributes);a&&(o&&a.constant&&(a.constant=!1,t.invalidate(a.id)),!a.value&&!o&&(a.constant=!0,a.value=Oc(t.attributes)?[xs]:[0,0,0]))}}}finalizeState(e){for(const n of this.getModels())n.destroy();const t=this.getAttributeManager();t&&t.finalize(),this.context&&this.context.resourceManager.unsubscribe({consumerId:this.id}),this.internalState&&(this.internalState.uniformTransitions.clear(),this.internalState.finalize())}draw(e){for(const t of this.getModels())t.draw(e.renderPass)}getPickingInfo({info:e,mode:t,sourceLayer:n}){const{index:s}=e;return s>=0&&Array.isArray(this.props.data)&&(e.object=this.props.data[s]),e}raiseError(e,t){t&&(e=new Error(`${t}: ${e.message}`,{cause:e})),this.props.onError?.(e)||this.context?.onError?.(e,this)}getNeedsRedraw(e={clearRedrawFlags:!1}){return this._getNeedsRedraw(e)}needsUpdate(){return this.internalState?this.internalState.needsUpdate||this.hasUniformTransition()||this.shouldUpdateState(this._getUpdateParams()):!1}hasUniformTransition(){return this.internalState?.uniformTransitions.active||!1}activateViewport(e){if(!this.internalState)return;const t=this.internalState.viewport;this.internalState.viewport=e,(!t||!rA({oldViewport:t,viewport:e}))&&(this.setChangeFlags({viewportChanged:!0}),this.isComposite?this.needsUpdate()&&this.setNeedsUpdate():this._update())}invalidateAttribute(e="all"){const t=this.getAttributeManager();t&&(e==="all"?t.invalidateAll():t.invalidate(e))}updateAttributes(e){let t=!1;for(const n in e)e[n].layoutChanged()&&(t=!0);for(const n of this.getModels())this._setModelAttributes(n,e,t)}_updateAttributes(){const e=this.getAttributeManager();if(!e)return;const t=this.props,n=this.getNumInstances(),s=this.getStartIndices();e.update({data:t.data,numInstances:n,startIndices:s,props:t,transitions:t.transitions,buffers:t.data.attributes,context:this});const r=e.getChangedAttributes({clearChangedFlags:!0});this.updateAttributes(r)}_updateAttributeTransition(){const e=this.getAttributeManager();e&&e.updateTransition()}_updateUniformTransition(){const{uniformTransitions:e}=this.internalState;if(e.active){const t=e.update(),n=Object.create(this.props);for(const s in t)Object.defineProperty(n,s,{value:t[s]});return n}return this.props}calculateInstancePickingColors(e,{numInstances:t}){if(e.constant)return;const n=Math.floor(be.length/4);this.internalState.usesPickingColorCache=!0;const s=t>0&&be[0]===0;if(n<t||s){t>Ug&&D.warn("Layer has too many data objects. Picking might not be able to distinguish all objects.")(),be=Kt.allocate(be,t,{size:4,copy:!0,maxCount:Math.max(t,Ug)});const r=Math.floor(be.length/4),o=[0,0,0],a=s?0:n;for(let c=a;c<r;c++)this.encodePickingColor(c,o),be[c*4+0]=o[0],be[c*4+1]=o[1],be[c*4+2]=o[2],be[c*4+3]=0}e.value=be.subarray(0,t*4)}_setModelAttributes(e,t,n=!1){if(!Object.keys(t).length)return;const s=this.getAttributeManager();if(s?.hasBufferGroups()){this._setGroupedModelAttributes(e,s,t);return}if(n){const c=this.getAttributeManager();e.setBufferLayout(c.getBufferLayouts(e)),t=c.getAttributes()}const r=e.userData?.excludeAttributes||{},o={},a={};for(const c in t){if(r[c])continue;const l=t[c].getValue();for(const u in l){const f=l[u];f instanceof F?t[c].settings.isIndexed?e.setIndexBuffer(f):o[u]=f:f&&(a[u]=f)}}e.setAttributes(o),e.setConstantAttributes(a)}_setGroupedModelAttributes(e,t,n){const s=e.userData?.excludeAttributes||{},r=t.getBufferGroupBindings(n,e,s);e.setBufferLayout(r.bufferLayouts);const o={...r.buffers},a={},c=t.getAttributes();for(const l in c){if(s[l]||r.groupedAttributeIds.has(l))continue;const u=c[l],f=u.getValue();for(const d in f){const g=f[d];g instanceof F?u.settings.isIndexed?e.setIndexBuffer(g):o[d]=g:g&&(a[d]=g)}}e.setAttributes(o),e.setConstantAttributes(a)}disablePickingIndex(e){const t=this.props.data;if(!("attributes"in t)){this._disablePickingIndex(e);return}const n=this.getAttributeManager().attributes,s=Oc(n),r=Bc(n),o=s&&t.attributes&&t.attributes[s.id];if(o&&o.value){const c=o.value;for(let l=0;l<t.length;l++){const u=s.getVertexOffset(l);c[u]===e&&this._disablePickingIndex(l)}return}const a=r&&t.attributes&&t.attributes[r.id];if(a&&a.value){const c=a.value,l=this.encodePickingColor(e);for(let u=0;u<t.length;u++){const f=r.getVertexOffset(u);c[f]===l[0]&&c[f+1]===l[1]&&c[f+2]===l[2]&&this._disablePickingIndex(u)}}else this._disablePickingIndex(e)}_disablePickingIndex(e){const t=this.getAttributeManager().attributes,n=Oc(t);if(n){const a=n.getVertexOffset(e),c=n.getVertexOffset(e+1),l=new Uint32Array(c-a);l.fill(xs),n.buffer.write(l,a*l.BYTES_PER_ELEMENT);return}const s=Bc(t);if(!s){this.internalState&&KP(this.internalState.disabledPickingIndices,e);return}const r=s.getVertexOffset(e),o=s.getVertexOffset(e+1);s.buffer.write(new Uint8Array(o-r),r)}restorePickingColors(){const e=this.getAttributeManager().attributes,t=$g(e);if(!t){this.internalState&&(this.internalState.disabledPickingIndices.length=0);return}const n=Bc(e);this.internalState.usesPickingColorCache&&n&&n.value.buffer!==be.buffer&&(n.value=be.subarray(0,n.value.length)),t.updateSubBuffer({startOffset:0})}_initialize(){W(!this.internalState),ie(eA,this);const e=this._getAttributeManager();this.internalState=new Q1({attributeManager:e,layer:this}),this._clearChangeFlags(),this.state={},Object.defineProperty(this.state,"attributeManager",{get:()=>(D.deprecated("layer.state.attributeManager","layer.getAttributeManager()")(),e)}),this.internalState.uniformTransitions=new P1(this.context.timeline),this.internalState.onAsyncPropUpdated=this._onAsyncPropUpdated.bind(this),this.internalState.setAsyncProps(this.props),this.initializeState(this.context);for(const t of this.props.extensions)t.initializeState.call(this,this.context,t);this.setChangeFlags({dataChanged:"init",propsChanged:"init",viewportChanged:!0,extensionsChanged:!0}),this._update()}_transferState(e){ie(nA,this,this===e);const{state:t,internalState:n}=e;this!==e&&(this.internalState=n,this.state=t,this.internalState.setAsyncProps(this.props),this._diffProps(this.props,this.internalState.getOldProps()))}_update(){const e=this.needsUpdate();if(ie(tA,this,e),!e)return;this.context.stats.get("Layer updates").incrementCount();const t=this.props,n=this.context,s=this.internalState,r=n.viewport,o=this._updateUniformTransition();s.propsInTransition=o,n.viewport=s.viewport||r,this.props=o;try{const a=this._getUpdateParams(),c=this.getModels();if(n.device)this.updateState(a);else try{this.updateState(a)}catch{}for(const u of this.props.extensions)u.updateState.call(this,a,u);this.setNeedsRedraw(),this._updateAttributes();const l=this.getModels()[0]!==c[0];this._postUpdate(a,l)}finally{n.viewport=r,this.props=t,this._clearChangeFlags(),s.needsUpdate=!1,s.resetOldProps()}}_finalize(){ie(iA,this),this.finalizeState(this.context);for(const e of this.props.extensions)e.finalizeState.call(this,this.context,e)}_drawLayer({renderPass:e,shaderModuleProps:t=null,uniforms:n={},parameters:s={}}){this._updateAttributeTransition();const r=this.props,o=this.context;this.props=this.internalState.propsInTransition||r;try{t&&this.setShaderModuleProps(t);const{getPolygonOffset:a}=this.props,c=a&&a(n)||[0,0];o.device instanceof Tt&&o.device.setParametersWebGL({polygonOffset:c});const l=o.device instanceof Tt?null:aA(s);if(cA(this.getModels(),e,s,l),o.device instanceof Tt)o.device.withParametersWebGL(s,()=>{const u={renderPass:e,shaderModuleProps:t,uniforms:n,parameters:s,context:o};for(const f of this.props.extensions)f.draw.call(this,u,f);this.draw(u)});else{l?.renderPassParameters&&e.setParameters(l.renderPassParameters);const u={renderPass:e,shaderModuleProps:t,uniforms:n,parameters:s,context:o};for(const f of this.props.extensions)f.draw.call(this,u,f);this.draw(u)}}finally{this.props=r}}getChangeFlags(){return this.internalState?.changeFlags}setChangeFlags(e){if(!this.internalState)return;const{changeFlags:t}=this.internalState;for(const s in e)if(e[s]){let r=!1;switch(s){case"dataChanged":const o=e[s],a=t[s];o&&Array.isArray(a)&&(t.dataChanged=Array.isArray(o)?a.concat(o):o,r=!0);default:t[s]||(t[s]=e[s],r=!0)}r&&ie(J1,this,s,e)}const n=!!(t.dataChanged||t.updateTriggersChanged||t.propsChanged||t.extensionsChanged);t.propsOrDataChanged=n,t.somethingChanged=n||t.viewportChanged||t.stateChanged}_clearChangeFlags(){this.internalState.changeFlags={dataChanged:!1,propsChanged:!1,updateTriggersChanged:!1,viewportChanged:!1,stateChanged:!1,extensionsChanged:!1,propsOrDataChanged:!1,somethingChanged:!1}}_diffProps(e,t){const n=E1(e,t);if(n.updateTriggersChanged)for(const s in n.updateTriggersChanged)n.updateTriggersChanged[s]&&this.invalidateAttribute(s);if(n.transitionsChanged)for(const s in n.transitionsChanged)this.internalState.uniformTransitions.add(s,t[s],e[s],e.transitions?.[s]);return this.setChangeFlags(n)}validateProps(){S1(this.props)}updateAutoHighlight(e){this.props.autoHighlight&&!Number.isInteger(this.props.highlightedObjectIndex)&&this._updateAutoHighlight(e)}_updateAutoHighlight(e){const t={highlightedObjectColor:e.picked?e.color:null},{highlightColor:n}=this.props;e.picked&&typeof n=="function"&&(t.highlightColor=n(e)),this.setShaderModuleProps({picking:t}),this.setNeedsRedraw()}_getAttributeManager(){const e=this.context;return new Rg(e.device,{id:this.props.id,stats:e.stats,timeline:e.timeline})}_postUpdate(e,t){const{props:n,oldProps:s}=e,r=this.state.model;r?.isInstanced&&r.setInstanceCount(this.getNumInstances());const{autoHighlight:o,highlightedObjectIndex:a,highlightColor:c}=n;if(t||s.autoHighlight!==o||s.highlightedObjectIndex!==a||s.highlightColor!==c){const l={};Array.isArray(c)&&(l.highlightColor=c),(t||s.autoHighlight!==o||a!==s.highlightedObjectIndex)&&(l.highlightedObjectColor=Number.isFinite(a)&&a>=0?this.encodePickingColor(a):null),this.setShaderModuleProps({picking:l})}}_getUpdateParams(){return{props:this.props,oldProps:this.internalState.getOldProps(),context:this.context,changeFlags:this.internalState.changeFlags}}_getNeedsRedraw(e){if(!this.internalState)return!1;let t=!1;t=t||this.internalState.needsRedraw&&this.id;const n=this.getAttributeManager(),s=n?n.getNeedsRedraw(e):!1;if(t=t||s,t)for(const r of this.props.extensions)r.onNeedsRedraw.call(this,r);return this.internalState.needsRedraw=this.internalState.needsRedraw&&!e.clearRedrawFlags,t}_onAsyncPropUpdated(){this._diffProps(this.props,this.internalState.getOldProps()),this.setNeedsUpdate()}}Ge.defaultProps=oA,Ge.layerName="Layer";function aA(i){const{blendConstant:e,...t}=i;return e?{pipelineParameters:t,renderPassParameters:{blendConstant:e}}:{pipelineParameters:t}}function cA(i,e,t,n){for(const s of i)s.device.type==="webgpu"?(lA(s,e),s.setParameters({...s.parameters,...n?.pipelineParameters})):s.setParameters(t)}function lA(i,e){const t=e.props.framebuffer||(e.framebuffer??null);if(!t)return;const n=t.colorAttachments.map(o=>o?.texture?.format??null),s=t.depthStencilAttachment?.texture?.format,r=i;(!uA(r.props.colorAttachmentFormats,n)||r.props.depthStencilAttachmentFormat!==s)&&(r.props.colorAttachmentFormats=n,r.props.depthStencilAttachmentFormat=s,r._setPipelineNeedsUpdate("attachment formats"))}function uA(i,e){if(i===e)return!0;if(!i||!e||i.length!==e.length)return!1;for(let t=0;t<i.length;t++)if(i[t]!==e[t])return!1;return!0}const fA="compositeLayer.renderLayers";class Vs extends Ge{get isComposite(){return!0}get isDrawable(){return!1}get isLoaded(){return super.isLoaded&&this.getSubLayers().every(e=>e.isLoaded)}getSubLayers(){return this.internalState&&this.internalState.subLayers||[]}initializeState(e){}setState(e){super.setState(e),this.setNeedsUpdate()}getPickingInfo({info:e}){const{object:t}=e;return t&&t.__source&&t.__source.parent&&t.__source.parent.id===this.id&&(e.object=t.__source.object,e.index=t.__source.index),e}filterSubLayer(e){return!0}shouldRenderSubLayer(e,t){return t&&t.length}getSubLayerClass(e,t){const{_subLayerProps:n}=this.props;return n&&n[e]&&n[e].type||t}getSubLayerRow(e,t,n){return e.__source={parent:this,object:t,index:n},e}getSubLayerAccessor(e){if(typeof e=="function"){const t={index:-1,data:this.props.data,target:[]};return(n,s)=>n&&n.__source?(t.index=n.__source.index,e(n.__source.object,t)):e(n,s)}return e}getSubLayerProps(e={}){const{opacity:t,pickable:n,visible:s,parameters:r,getPolygonOffset:o,highlightedObjectIndex:a,autoHighlight:c,highlightColor:l,coordinateSystem:u,coordinateOrigin:f,wrapLongitude:d,positionFormat:g,modelMatrix:p,extensions:m,fetch:y,operation:_,_subLayerProps:v}=this.props,b={id:"",updateTriggers:{},opacity:t,pickable:n,visible:s,parameters:r,getPolygonOffset:o,highlightedObjectIndex:a,autoHighlight:c,highlightColor:l,coordinateSystem:u,coordinateOrigin:f,wrapLongitude:d,positionFormat:g,modelMatrix:p,extensions:m,fetch:y,operation:_},x=v&&e.id&&v[e.id],w=x&&x.updateTriggers,P=e.id||"sublayer";if(x){const L=this.props[it],E=e.type?e.type._propTypes:{};for(const T in x){const C=E[T]||L[T];C&&C.type==="accessor"&&(x[T]=this.getSubLayerAccessor(x[T]))}}Object.assign(b,e,x),b.id=`${this.props.id}-${P}`,b.updateTriggers={all:this.props.updateTriggers?.all,...e.updateTriggers,...w};for(const L of m){const E=L.getSubLayerProps.call(this,L);E&&Object.assign(b,E,{updateTriggers:Object.assign(b.updateTriggers,E.updateTriggers)})}return b}_updateAutoHighlight(e){for(const t of this.getSubLayers())t.updateAutoHighlight(e)}_getAttributeManager(){return null}_postUpdate(e,t){let n=this.internalState.subLayers;const s=!n||this.needsUpdate();if(s){const r=this.renderLayers();n=Na(r,Boolean),this.internalState.subLayers=n}ie(fA,this,s,n);for(const r of n)r.parent=this}}Vs.layerName="CompositeLayer";class Gg{constructor(e){this.indexStarts=[0],this.vertexStarts=[0],this.vertexCount=0,this.instanceCount=0;const{attributes:t={}}=e;this.typedArrayManager=Kt,this.attributes={},this._attributeDefs=t,this.opts=e,this.updateGeometry(e)}updateGeometry(e){Object.assign(this.opts,e);const{data:t,buffers:n={},getGeometry:s,geometryBuffer:r,positionFormat:o,dataChanged:a,normalize:c=!0}=this.opts;if(this.data=t,this.getGeometry=s,this.positionSize=r&&r.size||(o==="XY"?2:3),this.buffers=n,this.normalize=c,r&&(W(t.startIndices),this.getGeometry=this.getGeometryFromBuffer(r),c||(n.vertexPositions=r)),this.geometryBuffer=n.vertexPositions,Array.isArray(a))for(const l of a)this._rebuildGeometry(l);else this._rebuildGeometry()}updatePartialGeometry({startRow:e,endRow:t}){this._rebuildGeometry({startRow:e,endRow:t})}getGeometryFromBuffer(e){const t=e.value||e;return ArrayBuffer.isView(t)?eg(t,{size:this.positionSize,offset:e.offset,stride:e.stride,startIndices:this.data.startIndices}):null}_allocate(e,t){const{attributes:n,buffers:s,_attributeDefs:r,typedArrayManager:o}=this;for(const a in r)if(a in s)o.release(n[a]),n[a]=null;else{const c=r[a];c.copy=t,n[a]=o.allocate(n[a],e,c)}}_forEachGeometry(e,t,n){const{data:s,getGeometry:r}=this,{iterable:o,objectInfo:a}=ci(s,t,n);for(const c of o){a.index++;const l=r?r(c,a):null;e(l,a.index)}}_rebuildGeometry(e){if(!this.data)return;let{indexStarts:t,vertexStarts:n,instanceCount:s}=this;const{data:r,geometryBuffer:o}=this,{startRow:a=0,endRow:c=1/0}=e||{},l={};if(e||(t=[0],n=[0]),this.normalize||!o)this._forEachGeometry((f,d)=>{const g=f&&this.normalizeGeometry(f);l[d]=g,n[d+1]=n[d]+(g?this.getGeometrySize(g):0)},a,c),s=n[n.length-1];else if(n=r.startIndices,s=n[r.length]||0,ArrayBuffer.isView(o))s=s||o.length/this.positionSize;else if(o instanceof F){const f=this.positionSize*4;s=s||o.byteLength/f}else if(o.buffer){const f=o.stride||this.positionSize*4;s=s||o.buffer.byteLength/f}else if(o.value){const f=o.value,d=o.stride/f.BYTES_PER_ELEMENT||this.positionSize;s=s||f.length/d}this._allocate(s,!!e),this.indexStarts=t,this.vertexStarts=n,this.instanceCount=s;const u={};this._forEachGeometry((f,d)=>{const g=l[d]||f;u.vertexStart=n[d],u.indexStart=t[d];const p=d<n.length-1?n[d+1]:s;u.geometrySize=p-n[d],u.geometryIndex=d,this.updateGeometryAttributes(g,u)},a,c),this.vertexCount=t[t.length-1]}}function dA({pointCount:i,getBinId:e}){const t=new Map;for(let n=0;n<i;n++){const s=e(n);if(s===null)continue;let r=t.get(String(s));r?r.points.push(n):(r={id:s,index:t.size,points:[n]},t.set(String(s),r))}return Array.from(t.values())}function hA({bins:i,dimensions:e,target:t}){const n=i.length*e;(!t||t.length<n)&&(t=new Float32Array(n));for(let s=0;s<i.length;s++){const{id:r}=i[s];Array.isArray(r)?t.set(r,s*e):t[s]=r}return t}const gA=i=>i.length,Vg=(i,e)=>{let t=0;for(const n of i)t+=e(n);return t},pA={COUNT:gA,SUM:Vg,MEAN:(i,e)=>i.length===0?NaN:Vg(i,e)/i.length,MIN:(i,e)=>{let t=1/0;for(const n of i){const s=e(n);s<t&&(t=s)}return t},MAX:(i,e)=>{let t=-1/0;for(const n of i){const s=e(n);s>t&&(t=s)}return t}};function mA({bins:i,getValue:e,operation:t,target:n}){(!n||n.length<i.length)&&(n=new Float32Array(i.length));let s=1/0,r=-1/0;for(let o=0;o<i.length;o++){const{points:a}=i[o];n[o]=t(a,e),n[o]<s&&(s=n[o]),n[o]>r&&(r=n[o])}return{value:n,domain:[s,r]}}function jg(i,e,t){const n={};for(const r of i.sources||[]){const o=e[r];if(o)n[r]=yA(o);else throw new Error(`Cannot find attribute ${r}`)}const s={};return r=>{for(const o in n)s[o]=n[o](r);return i.getValue(s,r,t)}}function yA(i){const e=i.value,{offset:t=0,stride:n,size:s}=i.getAccessor(),r=e.BYTES_PER_ELEMENT,o=t/r,a=n?n/r:s;if(s===1)return i.isConstant?()=>e[0]:l=>{const u=o+a*l;return e[u]};let c;return i.isConstant?(c=Array.from(e),()=>c):(c=new Array(s),l=>{const u=o+a*l;for(let f=0;f<s;f++)c[f]=e[u+f];return c})}class bA{constructor(e){this.bins=[],this.binIds=null,this.results=[],this.dimensions=e.dimensions,this.channelCount=e.getValue.length,this.props={...e,binOptions:{},pointCount:0,operations:[],customOperations:[],attributes:{}},this.needsUpdate=!0,this.setProps(e)}destroy(){}get binCount(){return this.bins.length}setProps(e){const t=this.props;if(e.binOptions&&(ee(e.binOptions,t.binOptions,2)||this.setNeedsUpdate()),e.operations)for(let n=0;n<this.channelCount;n++)e.operations[n]!==t.operations[n]&&this.setNeedsUpdate(n);if(e.customOperations)for(let n=0;n<this.channelCount;n++)!!e.customOperations[n]!=!!t.customOperations[n]&&this.setNeedsUpdate(n);e.pointCount!==void 0&&e.pointCount!==t.pointCount&&this.setNeedsUpdate(),e.attributes&&(e.attributes={...t.attributes,...e.attributes}),Object.assign(this.props,e)}setNeedsUpdate(e){e===void 0?this.needsUpdate=!0:this.needsUpdate!==!0&&(this.needsUpdate=this.needsUpdate||[],this.needsUpdate[e]=!0)}update(){if(this.needsUpdate===!0){this.bins=dA({pointCount:this.props.pointCount,getBinId:jg(this.props.getBin,this.props.attributes,this.props.binOptions)});const e=hA({bins:this.bins,dimensions:this.dimensions,target:this.binIds?.value});this.binIds={value:e,type:"float32",size:this.dimensions}}for(let e=0;e<this.channelCount;e++)if(this.needsUpdate===!0||this.needsUpdate[e]){const t=this.props.customOperations[e]||pA[this.props.operations[e]],{value:n,domain:s}=mA({bins:this.bins,getValue:jg(this.props.getValue[e],this.props.attributes,void 0),operation:t,target:this.results[e]?.value});this.results[e]={value:n,domain:s,type:"float32",size:1},this.props.onUpdate?.({channel:e})}this.needsUpdate=!1}preDraw(){}getBins(){return this.binIds}getResult(e){return this.results[e]}getResultDomain(e){return this.results[e]?.domain??[1/0,-1/0]}getBin(e){const t=this.bins[e];if(!t)return null;const n=new Array(this.channelCount);for(let s=0;s<n.length;s++){const r=this.results[s];n[s]=r?.value[e]}return{id:t.id,value:n,count:t.points.length,pointIndices:t.points}}}function Wg(i,e,t){return i.createFramebuffer({width:e,height:t,colorAttachments:[i.createTexture({width:e,height:t,format:"rgba32float",sampler:{minFilter:"nearest",magFilter:"nearest"}})]})}const _A={name:"binSorter",vs:`layout(std140) uniform binSorterUniforms {
  ivec4 binIdRange;
  ivec2 targetSize;
} binSorter;
`,uniformTypes:{binIdRange:"vec4<i32>",targetSize:"vec2<i32>"}},Hg=[1,2,4,8],Yg=3e38,vA={SUM:0,MEAN:0,MIN:0,MAX:0,COUNT:0},js=1024;class xA{constructor(e,t){this.binsFBO=null,this.device=e,this.model=PA(e,t)}get texture(){return this.binsFBO?this.binsFBO.colorAttachments[0].texture:null}destroy(){this.model.destroy(),this.binsFBO?.colorAttachments[0].texture.destroy(),this.binsFBO?.destroy()}getBinValues(e){if(!this.binsFBO)return null;const t=e%js,n=Math.floor(e/js),s=this.device.readPixelsToArrayWebGL(this.binsFBO,{sourceX:t,sourceY:n,sourceWidth:1,sourceHeight:1}).buffer;return new Float32Array(s)}setDimensions(e,t){const n=js,s=Math.ceil(e/n);this.binsFBO?this.binsFBO.height<s&&this.binsFBO.resize({width:n,height:s}):this.binsFBO=Wg(this.device,n,s);const r={binIdRange:[t[0][0],t[0][1],t[1]?.[0]||0,t[1]?.[1]||0],targetSize:[this.binsFBO.width,this.binsFBO.height]};this.model.shaderInputs.setProps({binSorter:r})}setModelProps(e){const t=this.model;e.attributes&&t.setAttributes(e.attributes),e.constantAttributes&&t.setConstantAttributes(e.constantAttributes),e.vertexCount!==void 0&&t.setVertexCount(e.vertexCount),e.shaderModuleProps&&t.shaderInputs.setProps(e.shaderModuleProps)}update(e){if(!this.binsFBO)return;const t=wA(e);this._updateBins("SUM",t.SUM+t.MEAN),this._updateBins("MIN",t.MIN),this._updateBins("MAX",t.MAX)}_updateBins(e,t){if(t===0)return;t|=Hg[3];const n=this.model,s=this.binsFBO,r=e==="MAX"?-Yg:e==="MIN"?Yg:0,o=this.device.beginRenderPass({id:`gpu-aggregation-${e}`,framebuffer:s,parameters:{viewport:[0,0,s.width,s.height],colorMask:t},clearColor:[r,r,r,0],clearDepth:!1,clearStencil:!1});n.setParameters({blend:!0,blendColorSrcFactor:"one",blendColorDstFactor:"one",blendAlphaSrcFactor:"one",blendAlphaDstFactor:"one",blendColorOperation:e==="MAX"?"max":e==="MIN"?"min":"add",blendAlphaOperation:"add"}),n.draw(o),o.end()}}function wA(i){const e={...vA};for(let t=0;t<i.length;t++){const n=i[t];n&&(e[n]+=Hg[t])}return e}function PA(i,e){let t=e.vs;e.dimensions===2&&(t+=`
void getBin(out int binId) {
  ivec2 binId2;
  getBin(binId2);
  if (binId2.x < binSorter.binIdRange.x || binId2.x >= binSorter.binIdRange.y) {
    binId = -1;
  } else {
    binId = (binId2.y - binSorter.binIdRange.z) * (binSorter.binIdRange.y - binSorter.binIdRange.x) + binId2.x;
  }
}
`);const n=`#version 300 es
#define SHADER_NAME gpu-aggregation-sort-bins-vertex

${t}

out vec3 v_Value;

void main() {
  int binIndex;
  getBin(binIndex);
  binIndex = binIndex - binSorter.binIdRange.x;
  if (binIndex < 0) {
    gl_Position = vec4(0.);
    return;
  }
  int row = binIndex / binSorter.targetSize.x;
  int col = binIndex - row * binSorter.targetSize.x;
  vec2 position = (vec2(col, row) + 0.5) / vec2(binSorter.targetSize) * 2.0 - 1.0;
  gl_Position = vec4(position, 0.0, 1.0);
  gl_PointSize = 1.0;

#if NUM_CHANNELS == 3
  getValue(v_Value);
#elif NUM_CHANNELS == 2
  getValue(v_Value.xy);
#else
  getValue(v_Value.x);
#endif
}
`,s=`#version 300 es
#define SHADER_NAME gpu-aggregation-sort-bins-fragment

precision highp float;

in vec3 v_Value;
out vec4 fragColor;

void main() {
  fragColor.xyz = v_Value;

  #ifdef MODULE_GEOMETRY
  geometry.uv = vec2(0.);
  DECKGL_FILTER_COLOR(fragColor, geometry);
  #endif

  fragColor.w = 1.0;
}
`;return new re(i,{bufferLayout:e.bufferLayout,modules:[...e.modules||[],_A],defines:{...e.defines,NON_INSTANCED_MODEL:1,NUM_CHANNELS:e.channelCount},isInstanced:!1,vs:n,fs:s,topology:"point-list",disableWarnings:!0})}const SA={name:"aggregatorTransform",vs:`layout(std140) uniform aggregatorTransformUniforms {
  ivec4 binIdRange;
  bvec3 isCount;
  bvec3 isMean;
  float naN;
} aggregatorTransform;
`,uniformTypes:{binIdRange:"vec4<i32>",isCount:"vec3<f32>",isMean:"vec3<f32>",naN:"f32"}};class EA{constructor(e,t){this.binBuffer=null,this.valueBuffer=null,this._domains=null,this.device=e,this.channelCount=t.channelCount,this.transform=CA(e,t),this.domainFBO=Wg(e,2,1)}destroy(){this.transform.destroy(),this.binBuffer?.destroy(),this.valueBuffer?.destroy(),this.domainFBO.colorAttachments[0].texture.destroy(),this.domainFBO.destroy()}get domains(){if(!this._domains){const e=this.device.readPixelsToArrayWebGL(this.domainFBO).buffer,t=new Float32Array(e);this._domains=[[-t[4],t[0]],[-t[5],t[1]],[-t[6],t[2]]].slice(0,this.channelCount)}return this._domains}setDimensions(e,t){const{model:n,transformFeedback:s}=this.transform;n.setVertexCount(e);const r={binIdRange:[t[0][0],t[0][1],t[1]?.[0]||0,t[1]?.[1]||0]};n.shaderInputs.setProps({aggregatorTransform:r});const o=e*t.length*4;(!this.binBuffer||this.binBuffer.byteLength<o)&&(this.binBuffer?.destroy(),this.binBuffer=this.device.createBuffer({byteLength:o}),s.setBuffer("binIds",this.binBuffer));const a=e*this.channelCount*4;(!this.valueBuffer||this.valueBuffer.byteLength<a)&&(this.valueBuffer?.destroy(),this.valueBuffer=this.device.createBuffer({byteLength:a}),s.setBuffer("values",this.valueBuffer))}update(e,t){if(!e)return;const n=this.transform,s=this.domainFBO,r=[0,1,2].map(c=>t[c]==="COUNT"?1:0),o=[0,1,2].map(c=>t[c]==="MEAN"?1:0),a={isCount:r,isMean:o,bins:e};n.model.shaderInputs.setProps({aggregatorTransform:a}),n.run({id:"gpu-aggregation-domain",framebuffer:s,discard:!1,parameters:{viewport:[0,0,2,1]},clearColor:[-3e38,-3e38,-3e38,0],clearDepth:!1,clearStencil:!1}),this._domains=null}}function CA(i,e){const t=`#version 300 es
#define SHADER_NAME gpu-aggregation-domain-vertex

uniform sampler2D bins;

#if NUM_DIMS == 1
out float binIds;
#else
out vec2 binIds;
#endif

#if NUM_CHANNELS == 1
flat out float values;
#elif NUM_CHANNELS == 2
flat out vec2 values;
#else
flat out vec3 values;
#endif

const float NAN = intBitsToFloat(-1);

void main() {
  int row = gl_VertexID / SAMPLER_WIDTH;
  int col = gl_VertexID - row * SAMPLER_WIDTH;
  vec4 weights = texelFetch(bins, ivec2(col, row), 0);
  vec3 value3 = mix(
    mix(weights.rgb, vec3(weights.a), aggregatorTransform.isCount),
    weights.rgb / max(weights.a, 1.0),
    aggregatorTransform.isMean
  );
  if (weights.a == 0.0) {
    value3 = vec3(NAN);
  }

#if NUM_DIMS == 1
  binIds = float(gl_VertexID + aggregatorTransform.binIdRange.x);
#else
  int y = gl_VertexID / (aggregatorTransform.binIdRange.y - aggregatorTransform.binIdRange.x);
  int x = gl_VertexID - y * (aggregatorTransform.binIdRange.y - aggregatorTransform.binIdRange.x);
  binIds.y = float(y + aggregatorTransform.binIdRange.z);
  binIds.x = float(x + aggregatorTransform.binIdRange.x);
#endif

#if NUM_CHANNELS == 3
  values = value3;
#elif NUM_CHANNELS == 2
  values = value3.xy;
#else
  values = value3.x;
#endif

  gl_Position = vec4(0., 0., 0., 1.);
  // This model renders into a 2x1 texture to obtain min and max simultaneously.
  // See comments in fragment shader
  gl_PointSize = 2.0;
}
`,n=`#version 300 es
#define SHADER_NAME gpu-aggregation-domain-fragment

precision highp float;

#if NUM_CHANNELS == 1
flat in float values;
#elif NUM_CHANNELS == 2
flat in vec2 values;
#else
flat in vec3 values;
#endif

out vec4 fragColor;

void main() {
  vec3 value3;
#if NUM_CHANNELS == 3
  value3 = values;
#elif NUM_CHANNELS == 2
  value3.xy = values;
#else
  value3.x = values;
#endif
  if (isnan(value3.x)) discard;
  // This shader renders into a 2x1 texture with blending=max
  // The left pixel yields the max value of each channel
  // The right pixel yields the min value of each channel
  if (gl_FragCoord.x < 1.0) {
    fragColor = vec4(value3, 1.0);
  } else {
    fragColor = vec4(-value3, 1.0);
  }
}
`;return i.type==="webgl"&&i.getExtension("GL_ARB_shader_bit_encoding"),new Ne(i,{vs:t,fs:n,topology:"point-list",modules:[SA],parameters:{blend:!0,blendColorSrcFactor:"one",blendColorDstFactor:"one",blendColorOperation:"max",blendAlphaSrcFactor:"one",blendAlphaDstFactor:"one",blendAlphaOperation:"max"},defines:{NUM_DIMS:e.dimensions,NUM_CHANNELS:e.channelCount,SAMPLER_WIDTH:js},varyings:["binIds","values"],disableWarnings:!0})}class qg{static isSupported(e){return e.features.has("float32-renderable-webgl")&&e.features.has("texture-blend-float-webgl")}constructor(e,t){this.binCount=0,this.binIds=null,this.results=[],this.device=e,this.dimensions=t.dimensions,this.channelCount=t.channelCount,this.props={...t,pointCount:0,binIdRange:[[0,0]],operations:[],attributes:{},binOptions:{}},this.needsUpdate=new Array(this.channelCount).fill(!0),this.binSorter=new xA(e,t),this.aggregationTransform=new EA(e,t),this.setProps(t)}getBins(){const e=this.aggregationTransform.binBuffer;return e?(this.binIds?.buffer!==e&&(this.binIds={buffer:e,type:"float32",size:this.dimensions}),this.binIds):null}getResult(e){const t=this.aggregationTransform.valueBuffer;return!t||e>=this.channelCount?null:(this.results[e]?.buffer!==t&&(this.results[e]={buffer:t,type:"float32",size:1,stride:this.channelCount*4,offset:e*4}),this.results[e])}getResultDomain(e){return this.aggregationTransform.domains[e]}getBin(e){if(e<0||e>=this.binCount)return null;const{binIdRange:t}=this.props;let n;if(this.dimensions===1)n=[e+t[0][0]];else{const[[a,c],[l]]=t,u=c-a;n=[e%u+a,Math.floor(e/u)+l]}const s=this.binSorter.getBinValues(e);if(!s)return null;const r=s[3],o=[];for(let a=0;a<this.channelCount;a++){const c=this.props.operations[a];c==="COUNT"?o[a]=r:r===0?o[a]=NaN:o[a]=c==="MEAN"?s[a]/r:s[a]}return{id:n,value:o,count:r}}destroy(){this.binSorter.destroy(),this.aggregationTransform.destroy()}setProps(e){const t=this.props;if("binIdRange"in e&&!ee(e.binIdRange,t.binIdRange,2)){const n=e.binIdRange;if(D.assert(n.length===this.dimensions),this.dimensions===1){const[[s,r]]=n;this.binCount=r-s}else{const[[s,r],[o,a]]=n;this.binCount=(r-s)*(a-o)}this.binSorter.setDimensions(this.binCount,n),this.aggregationTransform.setDimensions(this.binCount,n),this.setNeedsUpdate()}if(e.operations)for(let n=0;n<this.channelCount;n++)e.operations[n]!==t.operations[n]&&this.setNeedsUpdate(n);if(e.pointCount!==void 0&&e.pointCount!==t.pointCount&&(this.binSorter.setModelProps({vertexCount:e.pointCount}),this.setNeedsUpdate()),e.binOptions&&(ee(e.binOptions,t.binOptions,2)||this.setNeedsUpdate(),this.binSorter.model.shaderInputs.setProps({binOptions:e.binOptions})),e.attributes){const n={},s={};for(const r of Object.values(e.attributes))for(const[o,a]of Object.entries(r.getValue()))ArrayBuffer.isView(a)?s[o]=a:a&&(n[o]=a);this.binSorter.setModelProps({attributes:n,constantAttributes:s})}e.shaderModuleProps&&this.binSorter.setModelProps({shaderModuleProps:e.shaderModuleProps}),Object.assign(this.props,e)}setNeedsUpdate(e){e===void 0?this.needsUpdate.fill(!0):this.needsUpdate[e]=!0}update(){}preDraw(){if(!this.needsUpdate.some(Boolean))return;const{operations:e}=this.props,t=this.needsUpdate.map((n,s)=>n?e[s]:null);this.binSorter.update(t),this.aggregationTransform.update(this.binSorter.texture,e);for(let n=0;n<this.channelCount;n++)this.needsUpdate[n]&&(this.needsUpdate[n]=!1,this.props.onUpdate?.({channel:n}))}}class Xg extends Vs{get isDrawable(){return!0}initializeState(){}updateState(e){super.updateState(e);const t=this.getAggregatorType();if(e.changeFlags.extensionsChanged||this.state.aggregatorType!==t){this.state.aggregator?.destroy();const n=this.createAggregator(t);return n.setProps({attributes:this.getAttributeManager()?.attributes}),this.setState({aggregator:n,aggregatorType:t}),!0}return!1}finalizeState(e){super.finalizeState(e),this.state.aggregator.destroy()}updateAttributes(e){const{aggregator:t}=this.state;t.setProps({attributes:e});for(const n in e)this.onAttributeChange(n);t.update()}draw({shaderModuleProps:e}){const{aggregator:t}=this.state;t.setProps({shaderModuleProps:e}),t.preDraw()}_getAttributeManager(){return new Rg(this.context.device,{id:this.props.id,stats:this.context.stats})}}Xg.layerName="AggregationLayer";const LA=[[255,255,178],[254,217,118],[254,178,76],[253,141,60],[240,59,32],[189,0,38]];function TA(i,e=!1,t=Float32Array){let n;if(Number.isFinite(i[0]))n=new t(i);else{n=new t(i.length*4);let s=0;for(let r=0;r<i.length;r++){const o=i[r];n[s++]=o[0],n[s++]=o[1],n[s++]=o[2],n[s++]=Number.isFinite(o[3])?o[3]:255}}if(e)for(let s=0;s<n.length;s++)n[s]/=255;return n}const Ws={linear:"linear",quantile:"nearest",quantize:"nearest",ordinal:"nearest"};function AA(i,e){i.setSampler({minFilter:Ws[e],magFilter:Ws[e]})}function IA(i,e,t="linear"){const n=TA(e,!1,Uint8Array);return i.createTexture({format:"rgba8unorm",sampler:{minFilter:Ws[t],magFilter:Ws[t],addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"},data:n,width:n.length/4,height:1})}class Zg{constructor(e,t){this.props={scaleType:"linear",lowerPercentile:0,upperPercentile:100},this.domain=null,this.cutoff=null,this.input=e,this.inputLength=t,this.attribute=e}getScalePercentile(){if(!this._percentile){const e=Kg(this.input,this.inputLength);this._percentile=RA(e)}return this._percentile}getScaleOrdinal(){if(!this._ordinal){const e=Kg(this.input,this.inputLength);this._ordinal=MA(e)}return this._ordinal}getCutoff({scaleType:e,lowerPercentile:t,upperPercentile:n}){if(e==="quantile")return[t,n-1];if(t>0||n<100){const{domain:s}=this.getScalePercentile();let r=s[Math.floor(t)-1]??-1/0,o=s[Math.floor(n)-1]??1/0;if(e==="ordinal"){const{domain:a}=this.getScaleOrdinal();r=a.findIndex(c=>c>=r),o=a.findIndex(c=>c>o)-1,o===-2&&(o=a.length-1)}return[r,o]}return null}update(e){const t=this.props;if(e.scaleType!==t.scaleType)switch(e.scaleType){case"quantile":{const{attribute:n}=this.getScalePercentile();this.attribute=n,this.domain=[0,99];break}case"ordinal":{const{attribute:n,domain:s}=this.getScaleOrdinal();this.attribute=n,this.domain=[0,s.length-1];break}default:this.attribute=this.input,this.domain=null}return(e.scaleType!==t.scaleType||e.lowerPercentile!==t.lowerPercentile||e.upperPercentile!==t.upperPercentile)&&(this.cutoff=this.getCutoff(e)),this.props=e,this}}function MA(i){const e=new Set;for(const s of i)Number.isFinite(s)&&e.add(s);const t=Array.from(e).sort(),n=new Map;for(let s=0;s<t.length;s++)n.set(t[s],s);return{attribute:{value:i.map(s=>Number.isFinite(s)?n.get(s):NaN),type:"float32",size:1},domain:t}}function RA(i,e=100){const t=Array.from(i).filter(Number.isFinite).sort(OA);let n=0;const s=Math.max(1,e),r=new Array(s-1);for(;++n<s;)r[n-1]=BA(t,n/s);return{attribute:{value:i.map(o=>Number.isFinite(o)?kA(r,o):NaN),type:"float32",size:1},domain:r}}function Kg(i,e){const t=(i.stride??4)/4,n=(i.offset??0)/4;let s=i.value;if(!s){const o=i.buffer?.readSyncWebGL(0,t*4*e);o&&(s=new Float32Array(o.buffer),i.value=s)}if(t===1)return s.subarray(0,e);const r=new Float32Array(e);for(let o=0;o<e;o++)r[o]=s[o*t+n];return r}function OA(i,e){return i-e}function BA(i,e){const t=i.length;if(e<=0||t<2)return i[0];if(e>=1)return i[t-1];const n=(t-1)*e,s=Math.floor(n),r=i[s],o=i[s+1];return r+(o-r)*(n-s)}function kA(i,e){let t=0,n=i.length;for(;t<n;){const s=t+n>>>1;i[s]>e?n=s:t=s+1}return t}function DA({dataBounds:i,getBinId:e,padding:t=0}){const n=[i[0],i[1],[i[0][0],i[1][1]],[i[1][0],i[0][1]]].map(c=>e(c)),s=Math.min(...n.map(c=>c[0]))-t,r=Math.min(...n.map(c=>c[1]))-t,o=Math.max(...n.map(c=>c[0]))+t+1,a=Math.max(...n.map(c=>c[1]))+t+1;return[[s,o],[r,a]]}const Qg=`layout(std140) uniform iconUniforms {
  float sizeScale;
  vec2 iconsTextureDim;
  float sizeBasis;
  float sizeMinPixels;
  float sizeMaxPixels;
  bool billboard;
  highp int sizeUnits;
  float alphaCutoff;
} icon;
`,FA={name:"icon",vs:Qg,fs:Qg,uniformTypes:{sizeScale:"f32",iconsTextureDim:"vec2<f32>",sizeBasis:"f32",sizeMinPixels:"f32",sizeMaxPixels:"f32",billboard:"f32",sizeUnits:"i32",alphaCutoff:"f32"}},NA=`#version 300 es
#define SHADER_NAME icon-layer-vertex-shader
in vec2 positions;
in vec3 instancePositions;
in vec3 instancePositions64Low;
in float instanceSizes;
in float instanceAngles;
in vec4 instanceColors;
#ifdef USE_ROW_INDEXES
in float rowIndexes;
#endif
in vec4 instanceIconFrames;
in float instanceColorModes;
in vec2 instanceOffsets;
in vec2 instancePixelOffset;
out float vColorMode;
out vec4 vColor;
out vec2 vTextureCoords;
out vec2 uv;
vec2 rotate_by_angle(vec2 vertex, float angle) {
float angle_radian = angle * PI / 180.0;
float cos_angle = cos(angle_radian);
float sin_angle = sin(angle_radian);
mat2 rotationMatrix = mat2(cos_angle, -sin_angle, sin_angle, cos_angle);
return rotationMatrix * vertex;
}
void main(void) {
geometry.worldPosition = instancePositions;
geometry.uv = positions;
#ifdef USE_ROW_INDEXES
geometry.pickingColor = picking_getPickingColorFromIndex(rowIndexes);
#else
geometry.pickingColor = picking_getPickingColorFromInstanceID();
#endif
uv = positions;
vec2 iconSize = instanceIconFrames.zw;
float sizePixels = clamp(
project_size_to_pixel(instanceSizes * icon.sizeScale, icon.sizeUnits),
icon.sizeMinPixels, icon.sizeMaxPixels
);
float iconConstraint = icon.sizeBasis == 0.0 ? iconSize.x : iconSize.y;
float instanceScale = iconConstraint == 0.0 ? 0.0 : sizePixels / iconConstraint;
vec2 pixelOffset = positions / 2.0 * iconSize + instanceOffsets;
pixelOffset = rotate_by_angle(pixelOffset, instanceAngles) * instanceScale;
pixelOffset += instancePixelOffset;
pixelOffset.y *= -1.0;
if (icon.billboard)  {
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0), geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
vec3 offset = vec3(pixelOffset, 0.0);
DECKGL_FILTER_SIZE(offset, geometry);
gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);
} else {
vec3 offset_common = vec3(project_pixel_size(pixelOffset), 0.0);
DECKGL_FILTER_SIZE(offset_common, geometry);
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset_common, geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
}
vTextureCoords = mix(
instanceIconFrames.xy,
instanceIconFrames.xy + iconSize,
(positions.xy + 1.0) / 2.0
) / icon.iconsTextureDim;
vColor = instanceColors;
DECKGL_FILTER_COLOR(vColor, geometry);
vColorMode = instanceColorModes;
}
`,zA=`#version 300 es
#define SHADER_NAME icon-layer-fragment-shader
precision highp float;
uniform sampler2D iconsTexture;
in float vColorMode;
in vec4 vColor;
in vec2 vTextureCoords;
in vec2 uv;
out vec4 fragColor;
void main(void) {
geometry.uv = uv;
vec4 texColor = texture(iconsTexture, vTextureCoords);
vec3 color = mix(texColor.rgb, vColor.rgb, vColorMode);
float a = texColor.a * layer.opacity * vColor.a;
if (a < icon.alphaCutoff) {
discard;
}
fragColor = vec4(color, a);
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,UA=`struct IconUniforms {
  sizeScale: f32,
  iconsTextureDim: vec2<f32>,
  sizeBasis: f32,
  sizeMinPixels: f32,
  sizeMaxPixels: f32,
  billboard: i32,
  sizeUnits: i32,
  alphaCutoff: f32
};

@group(0) @binding(auto) var<uniform> icon: IconUniforms;
@group(0) @binding(auto) var iconsTexture : texture_2d<f32>;
@group(0) @binding(auto) var iconsTextureSampler : sampler;

fn rotate_by_angle(vertex: vec2<f32>, angle_deg: f32) -> vec2<f32> {
  let angle_radian = angle_deg * PI / 180.0;
  let c = cos(angle_radian);
  let s = sin(angle_radian);
  let rotation = mat2x2<f32>(vec2<f32>(c, s), vec2<f32>(-s, c));
  return rotation * vertex;
}

struct Attributes {
  @builtin(instance_index) instanceIndex : u32,
  @location(0) positions: vec2<f32>,

  @location(1) instancePositions: vec3<f32>,
  @location(2) instancePositions64Low: vec3<f32>,
  @location(3) instanceSizes: f32,
  @location(4) instanceAngles: f32,
  @location(5) instanceColors: vec4<f32>,
  @location(6) instanceIconFrames: vec4<f32>,
  @location(7) instanceColorModes: f32,
  @location(8) instanceOffsets: vec2<f32>,
  @location(9) instancePixelOffset: vec2<f32>,
  PICKING_COLOR_ATTRIBUTE
};

struct Varyings {
  @builtin(position) position: vec4<f32>,

  @location(0) vColorMode: f32,
  @location(1) vColor: vec4<f32>,
  @location(2) vTextureCoords: vec2<f32>,
  @location(3) uv: vec2<f32>,
  @location(4) pickingColor: vec3<f32>,
};

@vertex
fn vertexMain(inp: Attributes) -> Varyings {
  // write geometry fields used by filters + FS
  geometry.worldPosition = inp.instancePositions;
  geometry.uv = inp.positions;
  geometry.pickingColor = PICKING_COLOR_VALUE;

  var outp: Varyings;
  outp.uv = inp.positions;

  let iconSize = inp.instanceIconFrames.zw;

  // convert size in meters to pixels, then clamp
  let sizePixels = clamp(
    project_unit_size_to_pixel(inp.instanceSizes * icon.sizeScale, icon.sizeUnits),
    icon.sizeMinPixels, icon.sizeMaxPixels
  );

  // scale icon height to match instanceSize
  let iconConstraint = select(iconSize.y, iconSize.x, icon.sizeBasis == 0.0);
  let instanceScale = select(sizePixels / iconConstraint, 0.0, iconConstraint == 0.0);

  // scale and rotate vertex in "pixel" units; then add per-instance pixel offset
  var pixelOffset = inp.positions / 2.0 * iconSize + inp.instanceOffsets;
  pixelOffset = rotate_by_angle(pixelOffset, inp.instanceAngles) * instanceScale;
  pixelOffset = pixelOffset + inp.instancePixelOffset;
  pixelOffset.y = pixelOffset.y * -1.0;

  if (icon.billboard != 0) {
    var pos = project_position_to_clipspace(inp.instancePositions, inp.instancePositions64Low, vec3<f32>(0.0)); // TODO, &geometry.position);
    // DECKGL_FILTER_GL_POSITION(pos, geometry);

    var offset = vec3<f32>(pixelOffset, 0.0);
    // DECKGL_FILTER_SIZE(offset, geometry);
    let clipOffset = project_pixel_size_to_clipspace(offset.xy);
    pos = vec4<f32>(pos.x + clipOffset.x, pos.y + clipOffset.y, pos.z, pos.w);
    outp.position = pos;
  } else {
    var offset_common = vec3<f32>(project_pixel_size_vec2(pixelOffset), 0.0);
    // DECKGL_FILTER_SIZE(offset_common, geometry);
    var pos = project_position_to_clipspace(inp.instancePositions, inp.instancePositions64Low, offset_common); // TODO, &geometry.position);
    // DECKGL_FILTER_GL_POSITION(pos, geometry);
    outp.position = pos;
  }

  let uvMix = (inp.positions.xy + vec2<f32>(1.0, 1.0)) * 0.5;
  outp.vTextureCoords = mix(inp.instanceIconFrames.xy, inp.instanceIconFrames.xy + iconSize, uvMix) / icon.iconsTextureDim;

  outp.vColor = inp.instanceColors;
  // DECKGL_FILTER_COLOR(outp.vColor, geometry);

  outp.vColorMode = inp.instanceColorModes;
  outp.pickingColor = geometry.pickingColor;

  return outp;
}

@fragment
fn fragmentMain(inp: Varyings) -> @location(0) vec4<f32> {
  // expose to deck.gl filter hooks
  geometry.uv = inp.uv;

  let texColor = textureSample(iconsTexture, iconsTextureSampler, inp.vTextureCoords);

  // if colorMode == 0, use pixel color from the texture
  // if colorMode == 1 (or picking), use texture as transparency mask
  let rgb = mix(texColor.rgb, inp.vColor.rgb, inp.vColorMode);
  let a = texColor.a * layer.opacity * inp.vColor.a;

  if (a < icon.alphaCutoff) {
    discard;
  }

  if (picking.isActive > 0.5) {
    if (!picking_isColorValid(inp.pickingColor)) {
      discard;
    }
    return vec4<f32>(inp.pickingColor, 1.0);
  }

  var fragColor = deckgl_premultiplied_alpha(vec4<f32>(rgb, a));

  if (picking.isHighlightActive > 0.5) {
    let highlightedObjectColor = picking_normalizeColor(picking.highlightedObjectColor);
    if (picking_isColorZero(abs(inp.pickingColor - highlightedObjectColor))) {
      let highLightAlpha = picking.highlightColor.a;
      let blendedAlpha = highLightAlpha + fragColor.a * (1.0 - highLightAlpha);
      if (blendedAlpha > 0.0) {
        let highLightRatio = highLightAlpha / blendedAlpha;
        fragColor = vec4<f32>(
          mix(fragColor.rgb, picking.highlightColor.rgb, highLightRatio),
          blendedAlpha
        );
      } else {
        fragColor = vec4<f32>(fragColor.rgb, 0.0);
      }
    }
  }

  return fragColor;
}
`;function $A(i){return UA.replace("PICKING_COLOR_ATTRIBUTE",i?"@location(10) rowIndexes: u32,":"").replace("PICKING_COLOR_VALUE",i?"picking_getPickingColorFromIndex(inp.rowIndexes)":"picking_getPickingColorFromIndex(inp.instanceIndex)")}const GA=1024,VA=4,Jg=()=>{},ep={minFilter:"linear",mipmapFilter:"linear",magFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"},jA={x:0,y:0,width:0,height:0};function WA(i){return Math.pow(2,Math.ceil(Math.log2(i)))}function HA(i,e,t,n){const s=Math.min(t/e.width,n/e.height),r=Math.floor(e.width*s),o=Math.floor(e.height*s);return s===1?{image:e,width:r,height:o}:(i.canvas.height=o,i.canvas.width=r,i.clearRect(0,0,r,o),i.drawImage(e,0,0,e.width,e.height,0,0,r,o),{image:i.canvas,width:r,height:o})}function tn(i){return i&&(i.id||i.url)}function tp(i){const{device:e}=i;e.type==="webgl"?i.generateMipmapsWebGL():e.type==="webgpu"&&e.generateMipmapsWebGPU(i)}function YA(i,e,t,n){const{width:s,height:r,device:o}=i,a=o.createTexture({format:"rgba8unorm",width:e,height:t,sampler:n,mipLevels:o.getMipLevelCount(e,t)}),c=o.createCommandEncoder();c.copyTextureToTexture({sourceTexture:i,destinationTexture:a,width:s,height:r});const l=c.finish();return o.submit(l),tp(a),i.destroy(),a}function ip(i,e,t){for(let n=0;n<e.length;n++){const{icon:s,xOffset:r}=e[n],o=tn(s);i[o]={...s,x:r,y:t}}}function qA({icons:i,buffer:e,mapping:t={},xOffset:n=0,yOffset:s=0,rowHeight:r=0,canvasWidth:o}){let a=[];for(let c=0;c<i.length;c++){const l=i[c],u=tn(l);if(!t[u]){const{height:f,width:d}=l;n+d+e>o&&(ip(t,a,s),n=0,s=r+s+e,r=0,a=[]),a.push({icon:l,xOffset:n}),n=n+d+e,r=Math.max(r,f)}}return a.length>0&&ip(t,a,s),{mapping:t,rowHeight:r,xOffset:n,yOffset:s,canvasWidth:o,canvasHeight:WA(r+s+e)}}function XA(i,e,t){if(!i||!e)return null;t=t||{};const n={},{iterable:s,objectInfo:r}=ci(i);for(const o of s){r.index++;const a=e(o,r),c=tn(a);if(!a)throw new Error("Icon is missing.");if(!a.url)throw new Error("Icon url is missing.");!n[c]&&(!t[c]||a.url!==t[c].url)&&(n[c]={...a,source:o,sourceIndex:r.index})}return n}class ZA{constructor(e,{onUpdate:t=Jg,onError:n=Jg}){this._loadOptions=null,this._texture=null,this._externalTexture=null,this._mapping={},this._samplerParameters=null,this._pendingCount=0,this._autoPacking=!1,this._xOffset=0,this._yOffset=0,this._rowHeight=0,this._buffer=VA,this._canvasWidth=GA,this._canvasHeight=0,this._canvas=null,this.device=e,this.onUpdate=t,this.onError=n}finalize(){this._texture?.delete()}getTexture(){return this._texture||this._externalTexture}getIconMapping(e){const t=this._autoPacking?tn(e):e;return this._mapping[t]||jA}setProps({loadOptions:e,autoPacking:t,iconAtlas:n,iconMapping:s,textureParameters:r}){e&&(this._loadOptions=e),t!==void 0&&(this._autoPacking=t),s&&(this._mapping=s),n&&(this._texture?.delete(),this._texture=null,this._externalTexture=n),r&&(this._samplerParameters=r)}get isLoaded(){return this._pendingCount===0}packIcons(e,t){if(!this._autoPacking||typeof document>"u")return;const n=Object.values(XA(e,t,this._mapping)||{});if(n.length>0){const{mapping:s,xOffset:r,yOffset:o,rowHeight:a,canvasHeight:c}=qA({icons:n,buffer:this._buffer,canvasWidth:this._canvasWidth,mapping:this._mapping,rowHeight:this._rowHeight,xOffset:this._xOffset,yOffset:this._yOffset});this._rowHeight=a,this._mapping=s,this._xOffset=r,this._yOffset=o,this._canvasHeight=c,this._texture||(this._texture=this.device.createTexture({format:"rgba8unorm",data:null,width:this._canvasWidth,height:this._canvasHeight,sampler:this._samplerParameters||ep,mipLevels:this.device.getMipLevelCount(this._canvasWidth,this._canvasHeight)})),this._texture.height!==this._canvasHeight&&(this._texture=YA(this._texture,this._canvasWidth,this._canvasHeight,this._samplerParameters||ep)),this.onUpdate(!0),this._canvas=this._canvas||document.createElement("canvas"),this._loadIcons(n)}}_loadIcons(e){const t=this._canvas.getContext("2d",{willReadFrequently:!0});for(const n of e)this._pendingCount++,Ln(n.url,this._loadOptions).then(s=>{const r=tn(n),o=this._mapping[r],{x:a,y:c,width:l,height:u}=o,{image:f,width:d,height:g}=HA(t,s,l,u),p=a+(l-d)/2,m=c+(u-g)/2;this._texture?.copyExternalImage({image:f,x:p,y:m,width:d,height:g}),o.x=p,o.y=m,o.width=d,o.height=g,this._texture&&tp(this._texture),this.onUpdate(d!==l||g!==u)}).catch(s=>{this.onError({url:n.url,source:n.source,sourceIndex:n.sourceIndex,loadOptions:this._loadOptions,error:s})}).finally(()=>{this._pendingCount--})}}const np=[0,0,0,255],KA={iconAtlas:{type:"image",value:null,async:!0},iconMapping:{type:"object",value:{},async:!0},sizeScale:{type:"number",value:1,min:0},billboard:!0,sizeUnits:"pixels",sizeBasis:"height",sizeMinPixels:{type:"number",min:0,value:0},sizeMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},alphaCutoff:{type:"number",value:.05,min:0,max:1},getPosition:{type:"accessor",value:i=>i.position},getIcon:{type:"accessor",value:i=>i.icon},getColor:{type:"accessor",value:np},getSize:{type:"accessor",value:1},getAngle:{type:"accessor",value:0},getPixelOffset:{type:"accessor",value:[0,0]},onIconError:{type:"function",value:null,optional:!0},textureParameters:{type:"object",ignore:!0,value:null}};class Hs extends Ge{getShaders(){const e=!!this.props.data?.attributes?.rowIndexes;return super.getShaders({vs:NA,fs:zA,source:$A(e),defines:e?{USE_ROW_INDEXES:!0}:{},modules:[_t,Ht,Zt,FA]})}initializeState(){this.state={iconManager:new ZA(this.context.device,{onUpdate:this._onUpdate.bind(this),onError:this._onError.bind(this)})},this.getAttributeManager().addInstanced({instancePositions:{size:3,type:"float64",fp64:this.use64bitPositions(),transition:!0,accessor:"getPosition"},instanceSizes:{size:1,transition:!0,bufferGroup:"icon-instance-data",accessor:"getSize",defaultValue:1},instanceIconDefs:{size:7,bufferGroup:"icon-instance-data",accessor:"getIcon",transform:this.getInstanceIconDef,shaderAttributes:{instanceOffsets:{size:2,elementOffset:0},instanceIconFrames:{size:4,elementOffset:2},instanceColorModes:{size:1,elementOffset:6}}},instanceColors:{size:this.props.colorFormat.length,type:"unorm8",transition:!0,bufferGroup:"icon-instance-data",accessor:"getColor",defaultValue:np},instanceAngles:{size:1,transition:!0,bufferGroup:"icon-instance-data",accessor:"getAngle"},instancePixelOffset:{size:2,transition:!0,bufferGroup:"icon-instance-data",accessor:"getPixelOffset"},...this.props.data?.attributes?.rowIndexes?{rowIndexes:{size:1,type:"uint32",noAlloc:!0}}:{}})}updateState(e){super.updateState(e);const{props:t,oldProps:n,changeFlags:s}=e,r=this.getAttributeManager(),{iconAtlas:o,iconMapping:a,data:c,getIcon:l,textureParameters:u}=t,{iconManager:f}=this.state;if(typeof o=="string")return;const d=o||this.internalState.isAsyncPropLoading("iconAtlas");f.setProps({loadOptions:t.loadOptions,autoPacking:!d,iconAtlas:o,iconMapping:d?a:null,textureParameters:u}),d?n.iconMapping!==t.iconMapping&&r.invalidate("getIcon"):(s.dataChanged||s.updateTriggersChanged&&(s.updateTriggersChanged.all||s.updateTriggersChanged.getIcon))&&f.packIcons(c,l),s.extensionsChanged&&(this.state.model?.destroy(),this.state.model=this._getModel(),r.invalidateAll())}get isLoaded(){return super.isLoaded&&this.state.iconManager.isLoaded}finalizeState(e){super.finalizeState(e),this.state.iconManager.finalize()}draw({uniforms:e}){this._drawModel(this.state.model)}_drawModel(e){const{sizeScale:t,sizeBasis:n,sizeMinPixels:s,sizeMaxPixels:r,sizeUnits:o,billboard:a,alphaCutoff:c}=this.props,{iconManager:l}=this.state,u=l.getTexture();if(u){const f={iconsTexture:u,iconsTextureDim:[u.width,u.height],sizeUnits:xe[o],sizeScale:t,sizeBasis:n==="height"?1:0,sizeMinPixels:s,sizeMaxPixels:r,billboard:a,alphaCutoff:c};e.shaderInputs.setProps({icon:f}),e.draw(this.context.renderPass)}}_getModel(e=this.props.id){const t=[-1,-1,1,-1,-1,1,1,1];return new re(this.context.device,{...this.getShaders(),id:e,bufferLayout:this.getAttributeManager().getBufferLayouts(),geometry:new ke({topology:"triangle-strip",attributes:{positions:{size:2,value:new Float32Array(t)}}}),isInstanced:!0})}_onUpdate(e){e?(this.getAttributeManager()?.invalidate("getIcon"),this.setNeedsUpdate()):this.setNeedsRedraw()}_onError(e){const t=this.getCurrentLayer()?.props.onIconError;t?t(e):D.error(e.error.message)()}getInstanceIconDef(e){const{x:t,y:n,width:s,height:r,mask:o,anchorX:a=s/2,anchorY:c=r/2}=this.state.iconManager.getIconMapping(e);return[s/2-a,r/2-c,t,n,s,r,o?1:0]}}Hs.defaultProps=KA,Hs.layerName="IconLayer";const sp=`layout(std140) uniform scatterplotUniforms {
  float radiusScale;
  float radiusMinPixels;
  float radiusMaxPixels;
  float lineWidthScale;
  float lineWidthMinPixels;
  float lineWidthMaxPixels;
  float stroked;
  float filled;
  bool antialiasing;
  bool billboard;
  highp int radiusUnits;
  highp int lineWidthUnits;
} scatterplot;
`,QA={name:"scatterplot",vs:sp,fs:sp,source:"",uniformTypes:{radiusScale:"f32",radiusMinPixels:"f32",radiusMaxPixels:"f32",lineWidthScale:"f32",lineWidthMinPixels:"f32",lineWidthMaxPixels:"f32",stroked:"f32",filled:"f32",antialiasing:"f32",billboard:"f32",radiusUnits:"i32",lineWidthUnits:"i32"}},JA=`#version 300 es
#define SHADER_NAME scatterplot-layer-vertex-shader
in vec3 positions;
in vec3 instancePositions;
in vec3 instancePositions64Low;
in float instanceRadius;
in float instanceLineWidths;
in vec4 instanceFillColors;
in vec4 instanceLineColors;
#ifdef USE_ROW_INDEXES
in float rowIndexes;
#endif
in vec2 instancePixelOffset;
out vec4 vFillColor;
out vec4 vLineColor;
out vec2 unitPosition;
out float innerUnitRadius;
out float outerRadiusPixels;
void main(void) {
geometry.worldPosition = instancePositions;
outerRadiusPixels = clamp(
project_size_to_pixel(scatterplot.radiusScale * instanceRadius, scatterplot.radiusUnits),
scatterplot.radiusMinPixels, scatterplot.radiusMaxPixels
);
float lineWidthPixels = clamp(
project_size_to_pixel(scatterplot.lineWidthScale * instanceLineWidths, scatterplot.lineWidthUnits),
scatterplot.lineWidthMinPixels, scatterplot.lineWidthMaxPixels
);
outerRadiusPixels += scatterplot.stroked * lineWidthPixels / 2.0;
float edgePadding = scatterplot.antialiasing ? (outerRadiusPixels + SMOOTH_EDGE_RADIUS) / outerRadiusPixels : 1.0;
unitPosition = edgePadding * positions.xy;
geometry.uv = unitPosition;
#ifdef USE_ROW_INDEXES
geometry.pickingColor = picking_getPickingColorFromIndex(rowIndexes);
#else
geometry.pickingColor = picking_getPickingColorFromInstanceID();
#endif
innerUnitRadius = 1.0 - scatterplot.stroked * lineWidthPixels / outerRadiusPixels;
if (scatterplot.billboard) {
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0), geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
vec3 offset = edgePadding * positions * outerRadiusPixels;
offset.xy += instancePixelOffset;
DECKGL_FILTER_SIZE(offset, geometry);
gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);
} else {
vec3 offset = edgePadding * positions * project_pixel_size(outerRadiusPixels);
offset.xy += project_pixel_size(instancePixelOffset);
DECKGL_FILTER_SIZE(offset, geometry);
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset, geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
}
vFillColor = vec4(instanceFillColors.rgb, instanceFillColors.a * layer.opacity);
DECKGL_FILTER_COLOR(vFillColor, geometry);
vLineColor = vec4(instanceLineColors.rgb, instanceLineColors.a * layer.opacity);
DECKGL_FILTER_COLOR(vLineColor, geometry);
}
`,eI=`#version 300 es
#define SHADER_NAME scatterplot-layer-fragment-shader
precision highp float;
in vec4 vFillColor;
in vec4 vLineColor;
in vec2 unitPosition;
in float innerUnitRadius;
in float outerRadiusPixels;
out vec4 fragColor;
void main(void) {
geometry.uv = unitPosition;
float distToCenter = length(unitPosition) * outerRadiusPixels;
float inCircle = scatterplot.antialiasing ?
smoothedge(distToCenter, outerRadiusPixels) :
step(distToCenter, outerRadiusPixels);
if (inCircle == 0.0) {
discard;
}
if (scatterplot.stroked > 0.5) {
float isLine = scatterplot.antialiasing ?
smoothedge(innerUnitRadius * outerRadiusPixels, distToCenter) :
step(innerUnitRadius * outerRadiusPixels, distToCenter);
if (scatterplot.filled > 0.5) {
fragColor = mix(vFillColor, vLineColor, isLine);
} else {
if (isLine == 0.0) {
discard;
}
fragColor = vec4(vLineColor.rgb, vLineColor.a * isLine);
}
} else if (scatterplot.filled < 0.5) {
discard;
} else {
fragColor = vFillColor;
}
fragColor.a *= inCircle;
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,tI=`// Main shaders

struct ScatterplotUniforms {
  radiusScale: f32,
  radiusMinPixels: f32,
  radiusMaxPixels: f32,
  lineWidthScale: f32,
  lineWidthMinPixels: f32,
  lineWidthMaxPixels: f32,
  stroked: f32,
  filled: i32,
  antialiasing: i32,
  billboard: i32,
  radiusUnits: i32,
  lineWidthUnits: i32,
};

@group(0) @binding(0) var<uniform> scatterplot: ScatterplotUniforms;

struct Attributes {
  @builtin(instance_index) instanceIndex : u32,
  @builtin(vertex_index) vertexIndex : u32,
  @location(0) positions: vec3<f32>,
  @location(1) instancePositions: vec3<f32>,
  @location(2) instancePositions64Low: vec3<f32>,
  @location(3) instanceRadius: f32,
  @location(4) instanceLineWidths: f32,
  @location(5) instanceFillColors: vec4<f32>,
  @location(6) instanceLineColors: vec4<f32>,
  @location(7) instancePixelOffset: vec2<f32>,
  PICKING_COLOR_ATTRIBUTE
};

struct Varyings {
  @builtin(position) position: vec4<f32>,
  @location(0) vFillColor: vec4<f32>,
  @location(1) vLineColor: vec4<f32>,
  @location(2) unitPosition: vec2<f32>,
  @location(3) innerUnitRadius: f32,
  @location(4) outerRadiusPixels: f32,
  @location(5) pickingColor: vec3<f32>,
  @location(6) clipCoordinates: vec2<f32>,
};

@vertex
fn vertexMain(attributes: Attributes) -> Varyings {
  var varyings: Varyings;

  // Draw an inline geometry constant array clip space triangle to verify that rendering works.
  // var positions = array<vec2<f32>, 3>(vec2(0.0, 0.5), vec2(-0.5, -0.5), vec2(0.5, -0.5));
  // if (attributes.instanceIndex == 0) {
  //   varyings.position = vec4<f32>(positions[attributes.vertexIndex], 0.0, 1.0);
  //   return varyings;
  // }

  geometry.worldPosition = attributes.instancePositions;

  // Multiply out radius and clamp to limits
  varyings.outerRadiusPixels = clamp(
    project_unit_size_to_pixel(scatterplot.radiusScale * attributes.instanceRadius, scatterplot.radiusUnits),
    scatterplot.radiusMinPixels, scatterplot.radiusMaxPixels
  );

  // Multiply out line width and clamp to limits
  let lineWidthPixels = clamp(
    project_unit_size_to_pixel(scatterplot.lineWidthScale * attributes.instanceLineWidths, scatterplot.lineWidthUnits),
    scatterplot.lineWidthMinPixels, scatterplot.lineWidthMaxPixels
  );

  // outer radius needs to offset by half stroke width
  varyings.outerRadiusPixels += scatterplot.stroked * lineWidthPixels / 2.0;
  // Expand geometry to accommodate edge smoothing
  // WGSL selects the second value when the condition is true, so keep the antialiased path second.
  let edgePadding = select(
    1.0,
    (varyings.outerRadiusPixels + SMOOTH_EDGE_RADIUS) / varyings.outerRadiusPixels,
    scatterplot.antialiasing != 0
  );

  // position on the containing square in [-1, 1] space
  varyings.unitPosition = edgePadding * attributes.positions.xy;
  geometry.uv = varyings.unitPosition;
  geometry.pickingColor = PICKING_COLOR_VALUE;

  varyings.innerUnitRadius = 1.0 - scatterplot.stroked * lineWidthPixels / varyings.outerRadiusPixels;

  if (scatterplot.billboard != 0) {
    let projectedPosition = project_position_to_clipspace_and_commonspace(
      attributes.instancePositions,
      attributes.instancePositions64Low,
      vec3<f32>(0.0)
    );
    geometry.position = projectedPosition.commonPosition;
    varyings.position = projectedPosition.clipPosition;
    // DECKGL_FILTER_GL_POSITION(varyings.position, geometry);
    var offset = edgePadding * attributes.positions * varyings.outerRadiusPixels;
    offset = vec3<f32>(offset.xy + attributes.instancePixelOffset, offset.z);
    // DECKGL_FILTER_SIZE(offset, geometry);
    let clipPixels = project_pixel_size_to_clipspace(offset.xy);
    varyings.position = vec4<f32>(varyings.position.x + clipPixels.x, varyings.position.y + clipPixels.y, varyings.position.z, varyings.position.w);
    geometry.position = vec4<f32>(
      geometry.position.xy + project_pixel_size_vec2(offset.xy),
      geometry.position.zw
    );
  } else {
    var offset = edgePadding * attributes.positions * project_pixel_size_float(varyings.outerRadiusPixels);
    offset = vec3<f32>(offset.xy + project_pixel_size_vec2(attributes.instancePixelOffset), offset.z);
    // DECKGL_FILTER_SIZE(offset, geometry);
    let projectedPosition = project_position_to_clipspace_and_commonspace(
      attributes.instancePositions,
      attributes.instancePositions64Low,
      offset
    );
    geometry.position = projectedPosition.commonPosition;
    varyings.position = projectedPosition.clipPosition;
    // DECKGL_FILTER_GL_POSITION(varyings.position, geometry);
  }

  varyings.clipCoordinates = geometry.position.xy;
  clip_filterPosition(&varyings.position, geometry.worldPosition.xy);

  // Apply opacity to instance color, or return instance picking color
  varyings.vFillColor = vec4<f32>(attributes.instanceFillColors.rgb, attributes.instanceFillColors.a * layer.opacity);
  // DECKGL_FILTER_COLOR(varyings.vFillColor, geometry);
  varyings.vLineColor = vec4<f32>(attributes.instanceLineColors.rgb, attributes.instanceLineColors.a * layer.opacity);
  // DECKGL_FILTER_COLOR(varyings.vLineColor, geometry);
  varyings.pickingColor = geometry.pickingColor;

  return varyings;
}

@fragment
fn fragmentMain(varyings: Varyings) -> @location(0) vec4<f32> {
  // var geometry: Geometry;
  // geometry.uv = unitPosition;

  let distToCenter = length(varyings.unitPosition) * varyings.outerRadiusPixels;
  let inCircle = select(
    step(distToCenter, varyings.outerRadiusPixels),
    smoothedge(distToCenter, varyings.outerRadiusPixels),
    scatterplot.antialiasing != 0
  );

  if (inCircle == 0.0) {
    discard;
  }

  var fragColor: vec4<f32>;

  if (scatterplot.stroked != 0) {
    let isLine = select(
      step(varyings.innerUnitRadius * varyings.outerRadiusPixels, distToCenter),
      smoothedge(varyings.innerUnitRadius * varyings.outerRadiusPixels, distToCenter),
      scatterplot.antialiasing != 0
    );

    if (scatterplot.filled != 0) {
      fragColor = mix(varyings.vFillColor, varyings.vLineColor, isLine);
    } else {
      if (isLine == 0.0) {
        discard;
      }
      fragColor = vec4<f32>(varyings.vLineColor.rgb, varyings.vLineColor.a * isLine);
    }
  } else if (scatterplot.filled == 0) {
    discard;
  } else {
    fragColor = varyings.vFillColor;
  }

  fragColor.a *= inCircle;

  clip_filterColor(varyings.clipCoordinates);

  if (picking.isActive > 0.5) {
    if (!picking_isColorValid(varyings.pickingColor)) {
      discard;
    }
    return vec4<f32>(varyings.pickingColor, 1.0);
  }

  if (picking.isHighlightActive > 0.5) {
    let highlightedObjectColor = picking_normalizeColor(picking.highlightedObjectColor);
    if (picking_isColorZero(abs(varyings.pickingColor - highlightedObjectColor))) {
      let highLightAlpha = picking.highlightColor.a;
      let blendedAlpha = highLightAlpha + fragColor.a * (1.0 - highLightAlpha);
      if (blendedAlpha > 0.0) {
        let highLightRatio = highLightAlpha / blendedAlpha;
        fragColor = vec4<f32>(
          mix(fragColor.rgb, picking.highlightColor.rgb, highLightRatio),
          blendedAlpha
        );
      } else {
        fragColor = vec4<f32>(fragColor.rgb, 0.0);
      }
    }
  }

  // Apply premultiplied alpha as required by transparent canvas
  fragColor = deckgl_premultiplied_alpha(fragColor);

  return fragColor;
  // return vec4<f32>(0, 0, 1, 1);
}
`;function iI(i){return tI.replace("PICKING_COLOR_ATTRIBUTE",i?"@location(8) rowIndexes: u32,":"").replace("PICKING_COLOR_VALUE",i?"picking_getPickingColorFromIndex(attributes.rowIndexes)":"picking_getPickingColorFromIndex(attributes.instanceIndex)")}const kc=0,rp=1,Dc={name:"clip",source:`struct ClipUniforms {
  enabled: i32,
  mode: i32,
  bounds: vec4<f32>,
};

@group(2) @binding(auto) var<uniform> clipUniforms: ClipUniforms;

fn clip_isInBounds(coordinates: vec2<f32>) -> bool {
  return coordinates.x >= clipUniforms.bounds.x &&
    coordinates.y >= clipUniforms.bounds.y &&
    coordinates.x < clipUniforms.bounds.z &&
    coordinates.y < clipUniforms.bounds.w;
}

fn clip_filterPosition(position: ptr<function, vec4<f32>>, instanceCoordinates: vec2<f32>) {
  if (
    clipUniforms.enabled != 0 &&
    clipUniforms.mode == ${rp} &&
    !clip_isInBounds(instanceCoordinates)
  ) {
    *position = vec4<f32>(2.0, 2.0, 2.0, 1.0);
  }
}

fn clip_filterColor(geometryCoordinates: vec2<f32>) {
  if (
    clipUniforms.enabled != 0 &&
    clipUniforms.mode == ${kc} &&
    !clip_isInBounds(geometryCoordinates)
  ) {
    discard;
  }
}
`,props:{},uniforms:{},bindingLayout:[{name:"clip",group:2}],uniformTypes:{enabled:"i32",mode:"i32",bounds:"vec4<f32>"},defaultUniforms:{enabled:0,mode:kc,bounds:[0,0,1,1]},getUniforms(i={}){const e={};return i.enabled!==void 0&&(e.enabled=i.enabled?1:0),i.mode!==void 0&&(e.mode=i.mode==="instance"?rp:kc),i.bounds!==void 0&&(e.bounds=i.bounds),e}},op=[0,0,0,255],nI={radiusUnits:"meters",radiusScale:{type:"number",min:0,value:1},radiusMinPixels:{type:"number",min:0,value:0},radiusMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},lineWidthUnits:"meters",lineWidthScale:{type:"number",min:0,value:1},lineWidthMinPixels:{type:"number",min:0,value:0},lineWidthMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},stroked:!1,filled:!0,billboard:!1,antialiasing:!0,getPosition:{type:"accessor",value:i=>i.position},getRadius:{type:"accessor",value:1},getFillColor:{type:"accessor",value:op},getLineColor:{type:"accessor",value:op},getLineWidth:{type:"accessor",value:1},getPixelOffset:{type:"accessor",value:[0,0]},strokeWidth:{deprecatedFor:"getLineWidth"},outline:{deprecatedFor:"stroked"},getColor:{deprecatedFor:["getFillColor","getLineColor"]}};class Fc extends Ge{getShaders(){const e=!!this.props.data?.attributes?.rowIndexes;return super.getShaders({vs:JA,fs:eI,source:iI(e),defines:e?{USE_ROW_INDEXES:!0}:{},modules:[_t,Ht,Zt,QA,...this.context.device.type==="webgpu"?[Dc]:[]]})}initializeState(){const e=this.props.data?.attributes?.rowIndexes?{rowIndexes:{size:1,type:"uint32",noAlloc:!0}}:{};this.getAttributeManager().addInstanced({instancePositions:{size:3,type:"float64",fp64:this.use64bitPositions(),transition:!0,accessor:"getPosition"},instanceRadius:{size:1,transition:!0,accessor:"getRadius",defaultValue:1,bufferGroup:"scatterplot-instance-data"},instanceFillColors:{size:this.props.colorFormat.length,transition:!0,type:"unorm8",accessor:"getFillColor",defaultValue:[0,0,0,255],bufferGroup:"scatterplot-instance-data"},instanceLineColors:{size:this.props.colorFormat.length,transition:!0,type:"unorm8",accessor:"getLineColor",defaultValue:[0,0,0,255],bufferGroup:"scatterplot-instance-data"},instanceLineWidths:{size:1,transition:!0,accessor:"getLineWidth",defaultValue:1,bufferGroup:"scatterplot-instance-data"},instancePixelOffset:{size:2,transition:!0,accessor:"getPixelOffset",bufferGroup:"scatterplot-instance-data"},...e})}updateState(e){super.updateState(e),e.changeFlags.extensionsChanged&&(this.state.model?.destroy(),this.state.model=this._getModel(),this.getAttributeManager().invalidateAll())}draw({uniforms:e}){const{radiusUnits:t,radiusScale:n,radiusMinPixels:s,radiusMaxPixels:r,stroked:o,filled:a,billboard:c,antialiasing:l,lineWidthUnits:u,lineWidthScale:f,lineWidthMinPixels:d,lineWidthMaxPixels:g}=this.props,p={stroked:o,filled:a,billboard:c,antialiasing:l,radiusUnits:xe[t],radiusScale:n,radiusMinPixels:s,radiusMaxPixels:r,lineWidthUnits:xe[u],lineWidthScale:f,lineWidthMinPixels:d,lineWidthMaxPixels:g},m=this.state.model;m.shaderInputs.setProps({scatterplot:p}),m.draw(this.context.renderPass)}_getModel(){const e=[-1,-1,0,1,-1,0,-1,1,0,1,1,0];return new re(this.context.device,{...this.getShaders(),id:this.props.id,bufferLayout:this.getAttributeManager().getBufferLayouts(),geometry:new ke({topology:"triangle-strip",attributes:{positions:{size:3,value:new Float32Array(e)}}}),isInstanced:!0})}}Fc.defaultProps=nI,Fc.layerName="ScatterplotLayer";const Nc={CLOCKWISE:1,COUNTER_CLOCKWISE:-1};function zc(i,e,t={}){return sI(i,t)!==e?(oI(i,t),!0):!1}function sI(i,e={}){return Math.sign(rI(i,e))}const ap={x:0,y:1,z:2};function rI(i,e={}){const{start:t=0,end:n=i.length,plane:s="xy"}=e,r=e.size||2;let o=0;const a=ap[s[0]],c=ap[s[1]];for(let l=t,u=n-r;l<n;l+=r)o+=(i[l+a]-i[u+a])*(i[l+c]+i[u+c]),u=l;return o/2}function oI(i,e){const{start:t=0,end:n=i.length,size:s=2}=e,r=(n-t)/s,o=Math.floor(r/2);for(let a=0;a<o;++a){const c=t+a*s,l=t+(r-1-a)*s;for(let u=0;u<s;++u){const f=i[c+u];i[c+u]=i[l+u],i[l+u]=f}}}function Se(i,e){const t=e.length,n=i.length;if(n>0){let s=!0;for(let r=0;r<t;r++)if(i[n-t+r]!==e[r]){s=!1;break}if(s)return!1}for(let s=0;s<t;s++)i[n+s]=e[s];return!0}function Uc(i,e){const t=e.length;for(let n=0;n<t;n++)i[n]=e[n]}function nn(i,e,t,n,s=[]){const r=n+e*t;for(let o=0;o<t;o++)s[o]=i[r+o];return s}function $c(i,e,t,n,s=[]){let r,o;if(t&8)r=(n[3]-i[1])/(e[1]-i[1]),o=3;else if(t&4)r=(n[1]-i[1])/(e[1]-i[1]),o=1;else if(t&2)r=(n[2]-i[0])/(e[0]-i[0]),o=2;else if(t&1)r=(n[0]-i[0])/(e[0]-i[0]),o=0;else return null;for(let a=0;a<i.length;a++)s[a]=(o&1)===a?n[o]:r*(e[a]-i[a])+i[a];return s}function Ys(i,e){let t=0;return i[0]<e[0]?t|=1:i[0]>e[2]&&(t|=2),i[1]<e[1]?t|=4:i[1]>e[3]&&(t|=8),t}function cp(i,e){const{size:t=2,broken:n=!1,gridResolution:s=10,gridOffset:r=[0,0],startIndex:o=0,endIndex:a=i.length}=e||{},c=(a-o)/t;let l=[];const u=[l],f=nn(i,0,t,o);let d,g;const p=dp(f,s,r,[]),m=[];Se(l,f);for(let y=1;y<c;y++){for(d=nn(i,y,t,o,d),g=Ys(d,p);g;){$c(f,d,g,p,m);const _=Ys(m,p);_&&($c(f,m,_,p,m),g=_),Se(l,m),Uc(f,m),cI(p,s,g),n&&l.length>t&&(l=[],u.push(l),Se(l,f)),g=Ys(d,p)}Se(l,d),Uc(f,d)}return n?u:u[0]}const lp=0,aI=1;function up(i,e=null,t){if(!i.length)return[];const{size:n=2,gridResolution:s=10,gridOffset:r=[0,0],edgeTypes:o=!1}=t||{},a=[],c=[{pos:i,types:o?new Array(i.length/n).fill(aI):null,holes:e||[]}],l=[[],[]];let u=[];for(;c.length;){const{pos:f,types:d,holes:g}=c.shift();lI(f,n,g[0]||f.length,l),u=dp(l[0],s,r,u);const p=Ys(l[1],u);if(p){let m=fp(f,d,n,0,g[0]||f.length,u,p);const y={pos:m[0].pos,types:m[0].types,holes:[]},_={pos:m[1].pos,types:m[1].types,holes:[]};c.push(y,_);for(let v=0;v<g.length;v++)m=fp(f,d,n,g[v],g[v+1]||f.length,u,p),m[0]&&(y.holes.push(y.pos.length),y.pos=qs(y.pos,m[0].pos),o&&(y.types=qs(y.types,m[0].types))),m[1]&&(_.holes.push(_.pos.length),_.pos=qs(_.pos,m[1].pos),o&&(_.types=qs(_.types,m[1].types)))}else{const m={positions:f};o&&(m.edgeTypes=d),g.length&&(m.holeIndices=g),a.push(m)}}return a}function fp(i,e,t,n,s,r,o){const a=(s-n)/t,c=[],l=[],u=[],f=[],d=[];let g,p,m;const y=nn(i,a-1,t,n);let _=Math.sign(o&8?y[1]-r[3]:y[0]-r[2]),v=e&&e[a-1],b=0,x=0;for(let w=0;w<a;w++)g=nn(i,w,t,n,g),p=Math.sign(o&8?g[1]-r[3]:g[0]-r[2]),m=e&&e[n/t+w],p&&_&&_!==p&&($c(y,g,o,r,d),Se(c,d)&&u.push(v),Se(l,d)&&f.push(v)),p<=0?(Se(c,g)&&u.push(m),b-=p):u.length&&(u[u.length-1]=lp),p>=0?(Se(l,g)&&f.push(m),x+=p):f.length&&(f[f.length-1]=lp),Uc(y,g),_=p,v=m;return[b?{pos:c,types:e&&u}:null,x?{pos:l,types:e&&f}:null]}function dp(i,e,t,n){const s=Math.floor((i[0]-t[0])/e)*e+t[0],r=Math.floor((i[1]-t[1])/e)*e+t[1];return n[0]=s,n[1]=r,n[2]=s+e,n[3]=r+e,n}function cI(i,e,t){t&8?(i[1]+=e,i[3]+=e):t&4?(i[1]-=e,i[3]-=e):t&2?(i[0]+=e,i[2]+=e):t&1&&(i[0]-=e,i[2]-=e)}function lI(i,e,t,n){let s=1/0,r=-1/0,o=1/0,a=-1/0;for(let c=0;c<t;c+=e){const l=i[c],u=i[c+1];s=l<s?l:s,r=l>r?l:r,o=u<o?u:o,a=u>a?u:a}return n[0][0]=s,n[0][1]=o,n[1][0]=r,n[1][1]=a,n}function qs(i,e){for(let t=0;t<e.length;t++)i.push(e[t]);return i}const uI=85.051129;function fI(i,e){const{size:t=2,startIndex:n=0,endIndex:s=i.length,normalize:r=!0}=e||{},o=i.slice(n,s);hp(o,t,0,s-n);const a=cp(o,{size:t,broken:!0,gridResolution:360,gridOffset:[-180,-180]});if(r)for(const c of a)gp(c,t);return a}function dI(i,e=null,t){const{size:n=2,normalize:s=!0,edgeTypes:r=!1}=t||{};e=e||[];const o=[],a=[];let c=0,l=0;for(let f=0;f<=e.length;f++){const d=e[f]||i.length,g=l,p=hI(i,n,c,d);for(let m=p;m<d;m++)o[l++]=i[m];for(let m=c;m<p;m++)o[l++]=i[m];hp(o,n,g,l),gI(o,n,g,l,t?.maxLatitude),c=d,a[f]=l}a.pop();const u=up(o,a,{size:n,gridResolution:360,gridOffset:[-180,-180],edgeTypes:r});if(s)for(const f of u)gp(f.positions,n);return u}function hI(i,e,t,n){let s=-1,r=-1;for(let o=t+1;o<n;o+=e){const a=Math.abs(i[o]);a>s&&(s=a,r=o-1)}return r}function gI(i,e,t,n,s=uI){const r=i[t],o=i[n-e];if(Math.abs(r-o)>180){const a=nn(i,0,e,t);a[0]+=Math.round((o-r)/360)*360,Se(i,a),a[1]=Math.sign(a[1])*s,Se(i,a),a[0]=r,Se(i,a)}}function hp(i,e,t,n){let s=i[0],r;for(let o=t;o<n;o+=e){r=i[o];const a=r-s;(a>180||a<-180)&&(r-=Math.round(a/360)*360),i[o]=s=r}}function gp(i,e){let t;const n=i.length/e;for(let r=0;r<n&&(t=i[r*e],(t+180)%360===0);r++);const s=-Math.round(t/360)*360;if(s!==0)for(let r=0;r<n;r++)i[r*e]+=s}class pI extends ke{constructor(e){const{indices:t,attributes:n}=mI(e);super({...e,topology:"line-list",indices:t,attributes:n})}}function mI(i){const{radius:e,height:t=1,nradial:n=10}=i;let{vertices:s}=i;s&&(D.assert(s.length>=n),s=s.flatMap(g=>[g[0],g[1]]),zc(s,Nc.COUNTER_CLOCKWISE));const r=t>0,o=n+1,a=r?o*3+1:n,c=Math.PI*2/n,l=new Uint16Array(r?n*3*2:0),u=new Float32Array(a*3),f=new Float32Array(a*3);let d=0;if(r){for(let g=0;g<o;g++){const p=g*c,m=g%n,y=Math.sin(p),_=Math.cos(p);for(let v=0;v<2;v++)u[d+0]=s?s[m*2]:_*e,u[d+1]=s?s[m*2+1]:y*e,u[d+2]=(1/2-v)*t,f[d+0]=s?s[m*2]:_,f[d+1]=s?s[m*2+1]:y,d+=3}u[d+0]=u[d-3],u[d+1]=u[d-2],u[d+2]=u[d-1],d+=3}for(let g=r?0:1;g<o;g++){const p=Math.floor(g/2)*Math.sign(.5-g%2),m=p*c,y=(p+n)%n,_=Math.sin(m),v=Math.cos(m);u[d+0]=s?s[y*2]:v*e,u[d+1]=s?s[y*2+1]:_*e,u[d+2]=t/2,f[d+2]=1,d+=3}if(r){let g=0;for(let p=0;p<n;p++)l[g++]=p*2+0,l[g++]=p*2+2,l[g++]=p*2+0,l[g++]=p*2+1,l[g++]=p*2+1,l[g++]=p*2+3}return{indices:l,attributes:{POSITION:{size:3,value:u},NORMAL:{size:3,value:f}}}}const yI=`struct ColumnUniforms {
  radius: f32,
  angle: f32,
  offset: vec2<f32>,
  extruded: f32,
  stroked: f32,
  isStroke: f32,
  coverage: f32,
  elevationScale: f32,
  edgeDistance: f32,
  widthScale: f32,
  widthMinPixels: f32,
  widthMaxPixels: f32,
  radiusUnits: i32,
  widthUnits: i32,
};

@group(0) @binding(auto) var<uniform> column: ColumnUniforms;
`,pp=`layout(std140) uniform columnUniforms {
  float radius;
  float angle;
  vec2 offset;
  bool extruded;
  bool stroked;
  bool isStroke;
  float coverage;
  float elevationScale;
  float edgeDistance;
  float widthScale;
  float widthMinPixels;
  float widthMaxPixels;
  highp int radiusUnits;
  highp int widthUnits;
} column;
`,bI={name:"column",source:yI,vs:pp,fs:pp,uniformTypes:{radius:"f32",angle:"f32",offset:"vec2<f32>",extruded:"f32",stroked:"f32",isStroke:"f32",coverage:"f32",elevationScale:"f32",edgeDistance:"f32",widthScale:"f32",widthMinPixels:"f32",widthMaxPixels:"f32",radiusUnits:"i32",widthUnits:"i32"}},mp=`struct Attributes {
  @builtin(instance_index) instanceIndex: u32,
  @location(0) positions: vec3<f32>,
  @location(1) normals: vec3<f32>,
  @location(2) instancePositions: vec3<f32>,
  @location(3) instancePositions64Low: vec3<f32>,
  @location(4) instanceElevations: f32,
  @location(5) instanceFillColors: vec4<f32>,
  @location(6) instanceLineColors: vec4<f32>,
  @location(7) instanceStrokeWidths: f32
};

fn getRotationMatrix(angle: f32) -> mat2x2<f32> {
  let s = sin(angle);
  let c = cos(angle);
  return mat2x2<f32>(
    vec2<f32>(c, s),
    vec2<f32>(-s, c)
  );
}

fn getOffset(
  positions: vec3<f32>,
  strokeOffsetRatio: f32,
  dotRadius: f32,
  rotationMatrix: mat2x2<f32>
) -> vec3<f32> {
  var offset = (rotationMatrix * positions.xy * strokeOffsetRatio + column.offset) * dotRadius;
  if (column.radiusUnits == UNIT_METERS) {
    offset = project_size_vec2(offset);
  } else if (column.radiusUnits == UNIT_PIXELS) {
    offset = project_pixel_size_vec2(offset);
  }
  return vec3<f32>(offset, 0.0);
}
`,_I=`${mp}

struct Varyings {
  @builtin(position) position: vec4<f32>,
  @location(0) color: vec4<f32>
};

@vertex
fn vertexMain(attributes: Attributes) -> Varyings {
  var varyings: Varyings;

  geometry.worldPosition = attributes.instancePositions;
  geometry.pickingColor = picking_getPickingColorFromIndex(attributes.instanceIndex);

  let isStroke = column.isStroke > 0.5;
  let baseColor = select(attributes.instanceFillColors, attributes.instanceLineColors, isStroke);
  let rotationMatrix = getRotationMatrix(column.angle);

  var elevation = 0.0;
  var strokeOffsetRatio = 1.0;

  if (column.extruded > 0.5) {
    elevation =
      attributes.instanceElevations * (attributes.positions.z + 1.0) / 2.0 * column.elevationScale;
  } else if (column.stroked > 0.5) {
    let widthPixels = clamp(
      project_unit_size_to_pixel(attributes.instanceStrokeWidths * column.widthScale, column.widthUnits),
      column.widthMinPixels,
      column.widthMaxPixels
    ) / 2.0;
    let halfOffset =
      project_pixel_size_float(widthPixels) /
      project_size_float(column.edgeDistance * column.coverage * column.radius);
    if (isStroke) {
      strokeOffsetRatio -= sign(attributes.positions.z) * halfOffset;
    } else {
      strokeOffsetRatio -= halfOffset;
    }
  }

  let shouldRender = select(0.0, 1.0, baseColor.a > 0.0 && attributes.instanceElevations >= 0.0);
  let dotRadius = column.radius * column.coverage * shouldRender;
  let centroidPosition =
    vec3<f32>(
      attributes.instancePositions.xy,
      attributes.instancePositions.z + elevation
    );
  let offset = getOffset(attributes.positions, strokeOffsetRatio, dotRadius, rotationMatrix);
  let projected = project_position_to_clipspace_and_commonspace(
    centroidPosition,
    attributes.instancePositions64Low,
    offset
  );

  geometry.position = projected.commonPosition;
  geometry.normal = project_normal(vec3<f32>(rotationMatrix * attributes.normals.xy, attributes.normals.z));

  let lightColor = lighting_getLightColor2(
    baseColor.rgb,
    project.cameraPosition,
    geometry.position.xyz,
    geometry.normal
  );

  varyings.position = projected.clipPosition;
  varyings.color = vec4<f32>(
    select(baseColor.rgb, lightColor, column.extruded > 0.5 && !isStroke),
    baseColor.a * layer.opacity
  );

  return varyings;
}

@fragment
fn fragmentMain(varyings: Varyings) -> @location(0) vec4<f32> {
  geometry.uv = vec2<f32>(0.0);
  return deckgl_premultiplied_alpha(varyings.color);
}
`,vI=`${mp}

struct Varyings {
  @builtin(position) position: vec4<f32>,
  @location(0) color: vec4<f32>,
  @location(1) cameraPosition: vec3<f32>,
  @location(2) positionCommonspace: vec4<f32>
};

@vertex
fn vertexMain(attributes: Attributes) -> Varyings {
  var varyings: Varyings;

  geometry.worldPosition = attributes.instancePositions;
  geometry.pickingColor = picking_getPickingColorFromIndex(attributes.instanceIndex);

  let isStroke = column.isStroke > 0.5;
  let baseColor = select(attributes.instanceFillColors, attributes.instanceLineColors, isStroke);
  let rotationMatrix = getRotationMatrix(column.angle);

  var elevation = 0.0;
  var strokeOffsetRatio = 1.0;

  if (column.extruded > 0.5) {
    elevation =
      attributes.instanceElevations * (attributes.positions.z + 1.0) / 2.0 * column.elevationScale;
  } else if (column.stroked > 0.5) {
    let widthPixels = clamp(
      project_unit_size_to_pixel(attributes.instanceStrokeWidths * column.widthScale, column.widthUnits),
      column.widthMinPixels,
      column.widthMaxPixels
    ) / 2.0;
    let halfOffset =
      project_pixel_size_float(widthPixels) /
      project_size_float(column.edgeDistance * column.coverage * column.radius);
    if (isStroke) {
      strokeOffsetRatio -= sign(attributes.positions.z) * halfOffset;
    } else {
      strokeOffsetRatio -= halfOffset;
    }
  }

  let shouldRender = select(0.0, 1.0, baseColor.a > 0.0 && attributes.instanceElevations >= 0.0);
  let dotRadius = column.radius * column.coverage * shouldRender;
  let centroidPosition =
    vec3<f32>(
      attributes.instancePositions.xy,
      attributes.instancePositions.z + elevation
    );
  let offset = getOffset(attributes.positions, strokeOffsetRatio, dotRadius, rotationMatrix);
  let projected = project_position_to_clipspace_and_commonspace(
    centroidPosition,
    attributes.instancePositions64Low,
    offset
  );

  geometry.position = projected.commonPosition;
  geometry.normal = project_normal(vec3<f32>(rotationMatrix * attributes.normals.xy, attributes.normals.z));

  varyings.position = projected.clipPosition;
  varyings.color = vec4<f32>(baseColor.rgb, baseColor.a * layer.opacity);
  varyings.cameraPosition = project.cameraPosition;
  varyings.positionCommonspace = projected.commonPosition;

  return varyings;
}

@fragment
fn fragmentMain(varyings: Varyings) -> @location(0) vec4<f32> {
  geometry.uv = vec2<f32>(0.0);

  var fragColor = varyings.color;
  if (column.extruded > 0.5 && column.isStroke < 0.5) {
    // WebGPU's screen-space Y axis reverses the derivative orientation used by GLSL flat shading.
    let normal = normalize(cross(dpdy(varyings.positionCommonspace.xyz), dpdx(varyings.positionCommonspace.xyz)));
    fragColor = vec4<f32>(
      lighting_getLightColor2(
        varyings.color.rgb,
        varyings.cameraPosition,
        varyings.positionCommonspace.xyz,
        normal
      ),
      varyings.color.a
    );
  }

  return deckgl_premultiplied_alpha(fragColor);
}
`;function xI(i){return i?vI:_I}const wI=`#version 300 es
#define SHADER_NAME column-layer-vertex-shader
in vec3 positions;
in vec3 normals;
in vec3 instancePositions;
in float instanceElevations;
in vec3 instancePositions64Low;
in vec4 instanceFillColors;
in vec4 instanceLineColors;
in float instanceStrokeWidths;
out vec4 vColor;
#ifdef FLAT_SHADING
out vec3 cameraPosition;
out vec4 position_commonspace;
#endif
void main(void) {
geometry.worldPosition = instancePositions;
vec4 color = column.isStroke ? instanceLineColors : instanceFillColors;
mat2 rotationMatrix = mat2(cos(column.angle), sin(column.angle), -sin(column.angle), cos(column.angle));
float elevation = 0.0;
float strokeOffsetRatio = 1.0;
if (column.extruded) {
elevation = instanceElevations * (positions.z + 1.0) / 2.0 * column.elevationScale;
} else if (column.stroked) {
float widthPixels = clamp(
project_size_to_pixel(instanceStrokeWidths * column.widthScale, column.widthUnits),
column.widthMinPixels, column.widthMaxPixels) / 2.0;
float halfOffset = project_pixel_size(widthPixels) / project_size(column.edgeDistance * column.coverage * column.radius);
if (column.isStroke) {
strokeOffsetRatio -= sign(positions.z) * halfOffset;
} else {
strokeOffsetRatio -= halfOffset;
}
}
float shouldRender = float(color.a > 0.0 && instanceElevations >= 0.0);
float dotRadius = column.radius * column.coverage * shouldRender;
geometry.pickingColor = picking_getPickingColorFromInstanceID();
vec3 centroidPosition = vec3(instancePositions.xy, instancePositions.z + elevation);
vec3 centroidPosition64Low = instancePositions64Low;
vec2 offset = (rotationMatrix * positions.xy * strokeOffsetRatio + column.offset) * dotRadius;
if (column.radiusUnits == UNIT_METERS) {
offset = project_size(offset);
} else if (column.radiusUnits == UNIT_PIXELS) {
offset = project_pixel_size(offset);
}
vec3 pos = vec3(offset, 0.);
DECKGL_FILTER_SIZE(pos, geometry);
gl_Position = project_position_to_clipspace(centroidPosition, centroidPosition64Low, pos, geometry.position);
geometry.normal = project_normal(vec3(rotationMatrix * normals.xy, normals.z));
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
if (column.extruded && !column.isStroke) {
#ifdef FLAT_SHADING
cameraPosition = project.cameraPosition;
position_commonspace = geometry.position;
vColor = vec4(color.rgb, color.a * layer.opacity);
#else
vec3 lightColor = lighting_getLightColor(color.rgb, project.cameraPosition, geometry.position.xyz, geometry.normal);
vColor = vec4(lightColor, color.a * layer.opacity);
#endif
} else {
vColor = vec4(color.rgb, color.a * layer.opacity);
}
DECKGL_FILTER_COLOR(vColor, geometry);
}
`,PI=`#version 300 es
#define SHADER_NAME column-layer-fragment-shader
precision highp float;
out vec4 fragColor;
in vec4 vColor;
#ifdef FLAT_SHADING
in vec3 cameraPosition;
in vec4 position_commonspace;
#endif
void main(void) {
fragColor = vColor;
geometry.uv = vec2(0.);
#ifdef FLAT_SHADING
if (column.extruded && !column.isStroke && !bool(picking.isActive)) {
vec3 normal = normalize(cross(dFdx(position_commonspace.xyz), dFdy(position_commonspace.xyz)));
fragColor.rgb = lighting_getLightColor(vColor.rgb, cameraPosition, position_commonspace.xyz, normal);
}
#endif
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,Xs=[0,0,0,255],SI={name:"geometry",stepMode:"vertex",byteStride:24,attributes:[{attribute:"positions",format:"float32x3",byteOffset:0},{attribute:"normals",format:"float32x3",byteOffset:12}]},EI={diskResolution:{type:"number",min:4,value:20},vertices:null,radius:{type:"number",min:0,value:1e3},angle:{type:"number",value:0},offset:{type:"array",value:[0,0]},coverage:{type:"number",min:0,max:1,value:1},elevationScale:{type:"number",min:0,value:1},radiusUnits:"meters",lineWidthUnits:"meters",lineWidthScale:1,lineWidthMinPixels:0,lineWidthMaxPixels:Number.MAX_SAFE_INTEGER,extruded:!0,wireframe:!1,filled:!0,stroked:!1,flatShading:!1,getPosition:{type:"accessor",value:i=>i.position},getFillColor:{type:"accessor",value:Xs},getLineColor:{type:"accessor",value:Xs},getLineWidth:{type:"accessor",value:1},getElevation:{type:"accessor",value:1e3},material:!0,getColor:{deprecatedFor:["getFillColor","getLineColor"]}};class Gc extends Ge{getShaders(){const e={},{flatShading:t}=this.props;return t&&(e.FLAT_SHADING=1),super.getShaders({vs:wI,fs:PI,source:xI(t),defines:e,modules:[_t,Ht,t?Kf:sa,Zt,bI]})}initializeState(){this.getAttributeManager().addInstanced({instancePositions:{size:3,type:"float64",fp64:this.use64bitPositions(),transition:!0,accessor:"getPosition"},instanceElevations:{size:1,transition:!0,accessor:"getElevation"},instanceFillColors:{size:this.props.colorFormat.length,type:"unorm8",transition:!0,accessor:"getFillColor",defaultValue:Xs},instanceLineColors:{size:this.props.colorFormat.length,type:"unorm8",transition:!0,accessor:"getLineColor",defaultValue:Xs},instanceStrokeWidths:{size:1,accessor:"getLineWidth",transition:!0}})}updateState(e){super.updateState(e);const{props:t,oldProps:n,changeFlags:s}=e,r=s.extensionsChanged||t.flatShading!==n.flatShading;r&&(this.state.models?.forEach(a=>a.destroy()),this.setState(this._getModels()),this.getAttributeManager().invalidateAll());const o=this.getNumInstances();this.state.fillModel.setInstanceCount(o),this.state.strokeModel.setInstanceCount(o),this.state.wireframeModel.setInstanceCount(o),(r||t.diskResolution!==n.diskResolution||t.vertices!==n.vertices||t.extruded!==n.extruded||t.stroked!==n.stroked)&&this._updateGeometry(t)}getGeometry(e,t,n){const s=new pI({radius:1,height:n?2:0,vertices:t,nradial:e});let r=0;if(t)for(let o=0;o<e;o++){const a=t[o],c=Math.sqrt(a[0]*a[0]+a[1]*a[1]);r+=c/e}else r=1;return this.setState({edgeDistance:Math.cos(Math.PI/e)*r}),s}_getModels(){const e=this.getShaders(),t=[...this.getAttributeManager().getBufferLayouts(),SI],n=new re(this.context.device,{...e,id:`${this.props.id}-fill`,bufferLayout:t,isInstanced:!0}),s=new re(this.context.device,{...e,id:`${this.props.id}-stroke`,bufferLayout:t,isInstanced:!0}),r=new re(this.context.device,{...e,id:`${this.props.id}-wireframe`,bufferLayout:t,isInstanced:!0});return{fillModel:n,strokeModel:s,wireframeModel:r,models:[r,n,s]}}_updateGeometry({diskResolution:e,vertices:t,extruded:n,stroked:s}){const r=this.getGeometry(e,t,n||s),o=r.attributes.POSITION,a=r.attributes.NORMAL;if(this._setFillGeometry(new ke({topology:"triangle-strip",attributes:{POSITION:o,NORMAL:a}})),!n&&s){const c=o.value.length/3;this._setStrokeGeometry(new ke({topology:"triangle-strip",vertexCount:c-e-1,attributes:{POSITION:o,NORMAL:a}}))}n&&this._setWireframeGeometry(r)}_setFillGeometry(e){const t=Ps(e,{attributes:["POSITION","NORMAL"]});this.state.fillModel.setGeometry(t)}_setStrokeGeometry(e){const t=Ps(e,{attributes:["POSITION","NORMAL"]});this.state.strokeModel.setGeometry(t)}_setWireframeGeometry(e){const t=Ps(e,{attributes:["POSITION","NORMAL"]}),n=this.state.wireframeModel;n.setGeometry(t),n.setTopology("line-list")}draw({uniforms:e}){const{lineWidthUnits:t,lineWidthScale:n,lineWidthMinPixels:s,lineWidthMaxPixels:r,radiusUnits:o,elevationScale:a,extruded:c,filled:l,stroked:u,wireframe:f,offset:d,coverage:g,radius:p,angle:m}=this.props,y=this.state.fillModel,_=this.state.strokeModel,v=this.state.wireframeModel,{edgeDistance:b}=this.state,x={radius:p,angle:m/180*Math.PI,offset:d,extruded:c,stroked:u,coverage:g,elevationScale:a,edgeDistance:b,radiusUnits:xe[o],widthUnits:xe[t],widthScale:n,widthMinPixels:s,widthMaxPixels:r};c&&f&&(v.shaderInputs.setProps({column:{...x,isStroke:!0}}),v.draw(this.context.renderPass)),l&&(y.shaderInputs.setProps({column:{...x,isStroke:!1}}),y.draw(this.context.renderPass)),!c&&u&&(_.shaderInputs.setProps({column:{...x,isStroke:!0}}),_.draw(this.context.renderPass))}}Gc.layerName="ColumnLayer",Gc.defaultProps=EI;function CI(i,e,t,n){let s;if(Array.isArray(i[0])){const r=i.length*e;s=new Array(r);for(let o=0;o<i.length;o++)for(let a=0;a<e;a++)s[o*e+a]=i[o][a]||0}else s=i;return t?cp(s,{size:e,gridResolution:t}):n?fI(s,{size:e}):s}const LI=1,TI=2,sn=4;class AI extends Gg{constructor(e){super({...e,attributes:{positions:{size:3,padding:18,initialize:!0,type:e.fp64?Float64Array:Float32Array},segmentTypes:{size:1,type:e.isWebGPU?Float32Array:Uint8ClampedArray}}})}get(e){return this.attributes[e]}getPathSegmentIndices(e){const t=this.attributes.segmentTypes,n=this.vertexStarts[e],s=Math.min(this.vertexStarts[e+1]??this.instanceCount,this.instanceCount),r=[];for(let o=n;o<s-1;o++)t[o]&sn||r.push(o);return r.length&&t[n]&sn&&r.unshift(r.pop()),r}getGeometryFromBuffer(e){return this.normalize||this.opts.isWebGPU?super.getGeometryFromBuffer(e):null}normalizeGeometry(e){return this.normalize?CI(e,this.positionSize,this.opts.resolution,this.opts.wrapLongitude):e}getGeometrySize(e){if(yp(e)){let n=0;for(const s of e)n+=this.getGeometrySize(s);return n}const t=this.getPathLength(e);return t<2?0:this.isClosed(e)?t<3?0:t+2:t}updateGeometryAttributes(e,t){if(t.geometrySize!==0)if(e&&yp(e))for(const n of e){const s=this.getGeometrySize(n);t.geometrySize=s,this.updateGeometryAttributes(n,t),t.vertexStart+=s}else this._updateSegmentTypes(e,t),this._updatePositions(e,t)}_updateSegmentTypes(e,t){const n=this.attributes.segmentTypes,s=e?this.isClosed(e):!1,{vertexStart:r,geometrySize:o}=t;n.fill(0,r,r+o),s?(n[r]=sn,n[r+o-2]=sn):(n[r]+=LI,n[r+o-2]+=TI),n[r+o-1]=sn}_updatePositions(e,t){const{positions:n}=this.attributes;if(!n||!e)return;const{vertexStart:s,geometrySize:r}=t,o=new Array(3);for(let a=s,c=0;c<r;a++,c++)this.getPointOnPath(e,c,o),n[a*3]=o[0],n[a*3+1]=o[1],n[a*3+2]=o[2]}getPathLength(e){return e.length/this.positionSize}getPointOnPath(e,t,n=[]){const{positionSize:s}=this;t*s>=e.length&&(t+=1-e.length/s);const r=t*s;return n[0]=e[r],n[1]=e[r+1],n[2]=s===3&&e[r+2]||0,n}isClosed(e){if(!this.normalize)return!!this.opts.loop;const{positionSize:t}=this,n=e.length-t;return e[0]===e[n]&&e[1]===e[n+1]&&(t===2||e[2]===e[n+2])}}function yp(i){return Array.isArray(i[0])}const II=`struct PathUniforms {
  widthScale: f32,
  widthMinPixels: f32,
  widthMaxPixels: f32,
  jointType: f32,
  capType: f32,
  miterLimit: f32,
  billboard: f32,
  widthUnits: i32,
};

@group(0) @binding(auto)
var<uniform> path: PathUniforms;
`,bp=`layout(std140) uniform pathUniforms {
  float widthScale;
  float widthMinPixels;
  float widthMaxPixels;
  float jointType;
  float capType;
  float miterLimit;
  bool billboard;
  highp int widthUnits;
} path;
`,MI={name:"path",source:II,vs:bp,fs:bp,uniformTypes:{widthScale:"f32",widthMinPixels:"f32",widthMaxPixels:"f32",jointType:"f32",capType:"f32",miterLimit:"f32",billboard:"f32",widthUnits:"i32"}},RI=`const EPSILON: f32 = 0.001;
const ZERO_OFFSET: vec3<f32> = vec3<f32>(0.0, 0.0, 0.0);

struct JoinResult {
  offset: vec3<f32>,
  cornerOffset: vec2<f32>,
  miterLength: f32,
  pathPosition: vec2<f32>,
  pathLength: f32,
  jointType: f32,
};

struct Attributes {
  @location(0) positions: vec2<f32>,
  @location(1) instanceTypes: f32,
  @location(2) instanceLeftPositions: vec3<f32>,
  @location(3) instanceStartPositions: vec3<f32>,
  @location(4) instanceEndPositions: vec3<f32>,
  @location(5) instanceRightPositions: vec3<f32>,
  @location(6) instanceLeftPositions64Low: vec3<f32>,
  @location(7) instanceStartPositions64Low: vec3<f32>,
  @location(8) instanceEndPositions64Low: vec3<f32>,
  @location(9) instanceRightPositions64Low: vec3<f32>,
  @location(10) instanceStrokeWidths: f32,
  @location(11) instanceColors: vec4<f32>,
  @location(12) rowIndexes: u32,
};

struct Varyings {
  @builtin(position) position: vec4<f32>,
  @location(0) vColor: vec4<f32>,
  @location(1) vCornerOffset: vec2<f32>,
  @location(2) vMiterLength: f32,
  @location(3) vPathPosition: vec2<f32>,
  @location(4) vPathLength: f32,
  @location(5) vJointType: f32,
  // Location 6 is reserved for TripsLayer's injected vTime varying.
  @location(7) clipCoordinates: vec2<f32>,
#ifdef DASH_ENABLED
  @location(8) vPathBounds: vec2<f32>,
#endif
};

fn flipIfTrue(flag: bool) -> f32 {
  return select(1.0, -1.0, flag);
}

fn clipLine(position: vec4<f32>, refPosition: vec4<f32>) -> vec4<f32> {
  if (position.w < EPSILON) {
    let r = (EPSILON - refPosition.w) / (position.w - refPosition.w);
    return refPosition + (position - refPosition) * r;
  }
  return position;
}

#ifdef DASH_ENABLED
// Return the visible interval of the original segment before clipLine moves either endpoint.
fn getClippedPathRange(startW: f32, endW: f32) -> vec2<f32> {
  let startClipped = startW < EPSILON;
  let endClipped = endW < EPSILON;
  if (startClipped && endClipped) {
    return vec2<f32>(0.0, 0.0);
  }
  if (startClipped || endClipped) {
    let intersection = clamp((EPSILON - startW) / (endW - startW), 0.0, 1.0);
    if (startClipped) {
      return vec2<f32>(intersection, 1.0);
    }
    return vec2<f32>(0.0, intersection);
  }
  return vec2<f32>(0.0, 1.0);
}
#endif

fn getLineJoinOffset(
  prevPoint: vec3<f32>,
  currPoint: vec3<f32>,
  nextPoint: vec3<f32>,
  width: vec2<f32>,
#ifdef DASH_ENABLED
  sourcePathLength: f32,
  sourcePathRange: vec2<f32>,
#endif
#ifdef ANTIALIASING
  coverageScale: f32,
#endif
  positions: vec2<f32>,
  instanceTypes: f32
) -> JoinResult {
  let isEnd = positions.x > 0.0;
  let sideOfPath = positions.y;
  let isJoint = select(0.0, 1.0, sideOfPath == 0.0);

  var deltaA3 = currPoint - prevPoint;
  var deltaB3 = nextPoint - currPoint;

  let rotationResult = project_needs_rotation(currPoint);
  if (path.billboard == 0.0 && rotationResult.needsRotation) {
    deltaA3 = rotationResult.transform * deltaA3;
    deltaB3 = rotationResult.transform * deltaB3;
  }

  let deltaA = deltaA3.xy / width;
  let deltaB = deltaB3.xy / width;

  let lenA = length(deltaA);
  let lenB = length(deltaB);

  let dirA = select(vec2<f32>(0.0, 0.0), normalize(deltaA), lenA > 0.0);
  let dirB = select(vec2<f32>(0.0, 0.0), normalize(deltaB), lenB > 0.0);

  let perpA = vec2<f32>(-dirA.y, dirA.x);
  let perpB = vec2<f32>(-dirB.y, dirB.x);

  var tangent = dirA + dirB;
  tangent = select(perpA, normalize(tangent), length(tangent) > 0.0);
  let miterVec = vec2<f32>(-tangent.y, tangent.x);
  let dir = select(dirB, dirA, isEnd);
  let perp = select(perpB, perpA, isEnd);
#ifdef DASH_ENABLED
  let segmentLength2D = select(lenB, lenA, isEnd);

  // Extrusion happens in the XY plane, so segmentLength2D is a 2D length and pathPosition.y
  // below measures 2D distance along the segment. For a path that also moves in Z the true
  // arc length is longer by this ratio. Scaling pathLength and pathPosition.y by it makes
  // the coordinate measure real 3D distance while leaving the joint tests unchanged, since
  // they compare the two against each other and both are scaled alike. Billboard mode
  // extrudes in clip space, where the perspective divide has already reduced the segment to
  // its screen projection, so its complete common-space length is supplied by the caller.
  // Mirrors path-layer-vertex.glsl.ts.
  let currDelta3 = select(deltaB3, deltaA3, isEnd);
  let currLength2D = length(currDelta3.xy);
  // Do not clamp a valid denominator to EPSILON: high-zoom Web Mercator deltas are often
  // smaller than that in common space, and changing their scale corrupts even flat paths.
  let safeLength2D = select(1.0, currLength2D, currLength2D > 0.0);
  var arcLengthRatio = 1.0;
  var pathPositionOffset = 0.0;
  var pathLength = segmentLength2D;
  if (path.billboard != 0.0) {
    // clipLine may shorten the visible screen-space segment. Preserve the corresponding interval
    // of the complete common-space arclength instead of compressing the full dash period into the
    // visible span. Keep pathLength complete so justification is stable as the camera clips it.
    let visiblePathLength = sourcePathLength * (sourcePathRange.y - sourcePathRange.x);
    arcLengthRatio = 0.0;
    if (segmentLength2D > 0.0) {
      arcLengthRatio = visiblePathLength / segmentLength2D;
    }
    pathPositionOffset = sourcePathLength * sourcePathRange.x;
    pathLength = sourcePathLength;
  } else if (currLength2D > 0.0) {
    arcLengthRatio = length(currDelta3) / safeLength2D;
    pathLength = segmentLength2D * arcLengthRatio;
  }
#else
  let pathLength = select(lenB, lenA, isEnd);
#endif

  let sinHalfA = abs(dot(miterVec, perp));
  let cosHalfA = abs(dot(dirA, miterVec));
  let turnDirection = flipIfTrue(dirA.x * dirB.y >= dirA.y * dirB.x);
  let cornerPosition = sideOfPath * turnDirection;

  var miterSize = 1.0 / max(sinHalfA, EPSILON);
  miterSize = mix(
    min(miterSize, max(lenA, lenB) / max(cosHalfA, EPSILON)),
    miterSize,
    step(0.0, cornerPosition)
  );

  var offsetVec =
    mix(miterVec * miterSize, perp, step(0.5, cornerPosition)) *
    (sideOfPath + isJoint * turnDirection);

  let isStartCap = lenA == 0.0 || (!isEnd && (instanceTypes == 1.0 || instanceTypes == 3.0));
  let isEndCap = lenB == 0.0 || (isEnd && (instanceTypes == 2.0 || instanceTypes == 3.0));
  let isCap = isStartCap || isEndCap;

  var jointType = path.jointType;
  if (isCap) {
    offsetVec = mix(
      perp * sideOfPath,
      dir * path.capType * 4.0 * flipIfTrue(isStartCap),
      isJoint
    );
    jointType = path.capType;
  }

#ifdef ANTIALIASING
  let coverageOffsetVec = offsetVec * coverageScale;
  var miterLength = dot(coverageOffsetVec, miterVec * turnDirection);
#else
  var miterLength = dot(offsetVec, miterVec * turnDirection);
#endif
  miterLength = select(miterLength, isJoint, isCap);

#ifdef ANTIALIASING
  let offsetFromStartOfPath = coverageOffsetVec + deltaA * select(0.0, 1.0, isEnd);
#else
  let offsetFromStartOfPath = offsetVec + deltaA * select(0.0, 1.0, isEnd);
#endif
  let pathPosition = vec2<f32>(
    dot(offsetFromStartOfPath, perp),
#ifdef DASH_ENABLED
    pathPositionOffset + dot(offsetFromStartOfPath, dir) * arcLengthRatio
#else
    dot(offsetFromStartOfPath, dir)
#endif
  );
  let isValid = step(f32(instanceTypes), 3.5);
#ifdef ANTIALIASING
  var offset = vec3<f32>(coverageOffsetVec * width * isValid, 0.0);
#else
  var offset = vec3<f32>(offsetVec * width * isValid, 0.0);
#endif

  if (path.billboard == 0.0 && rotationResult.needsRotation) {
    offset = rotationResult.transform * offset;
  }

#ifdef ANTIALIASING
  return JoinResult(
    offset, coverageOffsetVec, miterLength, pathPosition, pathLength, jointType
  );
#else
  return JoinResult(offset, offsetVec, miterLength, pathPosition, pathLength, jointType);
#endif
}

@vertex
fn vertexMain(attributes: Attributes) -> Varyings {
  var varyings: Varyings;

  geometry.pickingColor = picking_getPickingColorFromIndex(attributes.rowIndexes);

  let isEnd = attributes.positions.x;

  let prevPosition = mix(attributes.instanceLeftPositions, attributes.instanceStartPositions, isEnd);
  let prevPosition64Low = mix(
    attributes.instanceLeftPositions64Low,
    attributes.instanceStartPositions64Low,
    isEnd
  );
  let currPosition = mix(attributes.instanceStartPositions, attributes.instanceEndPositions, isEnd);
  let currPosition64Low = mix(
    attributes.instanceStartPositions64Low,
    attributes.instanceEndPositions64Low,
    isEnd
  );
  let nextPosition = mix(attributes.instanceEndPositions, attributes.instanceRightPositions, isEnd);
  let nextPosition64Low = mix(
    attributes.instanceEndPositions64Low,
    attributes.instanceRightPositions64Low,
    isEnd
  );

  geometry.worldPosition = currPosition;

  let widthPixels =
    clamp(
      project_unit_size_to_pixel(attributes.instanceStrokeWidths * path.widthScale, path.widthUnits),
      path.widthMinPixels,
      path.widthMaxPixels
    ) / 2.0;

  if (path.billboard != 0.0) {
#ifdef DASH_ENABLED
    let prevProjection = project_position_to_clipspace_and_commonspace(
      prevPosition, prevPosition64Low, ZERO_OFFSET
    );
    let nextProjection = project_position_to_clipspace_and_commonspace(
      nextPosition, nextPosition64Low, ZERO_OFFSET
    );
    let prevPositionCommon = prevProjection.commonPosition.xyz;
    let nextPositionCommon = nextProjection.commonPosition.xyz;
    var prevPositionScreen = prevProjection.clipPosition;
    var nextPositionScreen = nextProjection.clipPosition;
#else
    var prevPositionScreen = project_position_to_clipspace(
      prevPosition, prevPosition64Low, ZERO_OFFSET
    );
    var nextPositionScreen = project_position_to_clipspace(
      nextPosition, nextPosition64Low, ZERO_OFFSET
    );
#endif
    let currProjection = project_position_to_clipspace_and_commonspace(
      currPosition, currPosition64Low, ZERO_OFFSET
    );
    geometry.position = currProjection.commonPosition;
    var currPositionScreen = currProjection.clipPosition;
#ifdef DASH_ENABLED
    let currPositionCommon = currProjection.commonPosition.xyz;
    let sourcePathStartScreen = mix(currPositionScreen, prevPositionScreen, isEnd);
    let sourcePathEndScreen = mix(nextPositionScreen, currPositionScreen, isEnd);
    let billboardPathRange = getClippedPathRange(
      sourcePathStartScreen.w, sourcePathEndScreen.w
    );
#endif

    prevPositionScreen = clipLine(prevPositionScreen, currPositionScreen);
    nextPositionScreen = clipLine(nextPositionScreen, currPositionScreen);
    currPositionScreen = clipLine(currPositionScreen, mix(nextPositionScreen, prevPositionScreen, isEnd));

#ifdef ANTIALIASING
    let coverageScale = select(
      1.0,
      (widthPixels + 0.5 / project.devicePixelRatio) / max(widthPixels, 1e-6),
      widthPixels > 0.0
    );
#endif
#ifdef DASH_ENABLED
    let currentDeltaCommon = select(
      nextPositionCommon - currPositionCommon,
      currPositionCommon - prevPositionCommon,
      isEnd > 0.0
    );
    let billboardPathLength = select(
      0.0,
      length(currentDeltaCommon) * project.scale / (widthPixels * project.focalDistance),
      widthPixels > 0.0
    );
#endif
    let join = getLineJoinOffset(
      prevPositionScreen.xyz / prevPositionScreen.w,
      currPositionScreen.xyz / currPositionScreen.w,
      nextPositionScreen.xyz / nextPositionScreen.w,
      project_pixel_size_to_clipspace(vec2<f32>(widthPixels, widthPixels)),
#ifdef DASH_ENABLED
      billboardPathLength,
      billboardPathRange,
#endif
#ifdef ANTIALIASING
      coverageScale,
#endif
      attributes.positions,
      attributes.instanceTypes
    );
#ifdef DASH_ENABLED
    // Phase and justification use the complete source segment, while cap and joint coverage
    // must still recognize the endpoints moved by clipLine.
    varyings.vPathBounds = billboardPathLength * billboardPathRange;
#endif

    geometry.uv = join.pathPosition;
    varyings.position = vec4<f32>(
      currPositionScreen.xyz + join.offset * currPositionScreen.w,
      currPositionScreen.w
    );
    varyings.vCornerOffset = join.cornerOffset;
    varyings.vMiterLength = join.miterLength;
    varyings.vPathPosition = join.pathPosition;
    varyings.vPathLength = join.pathLength;
    varyings.vJointType = join.jointType;
  } else {
    let prevPositionCommon = project_position_vec3_f64(prevPosition, prevPosition64Low);
    let currPositionCommon = project_position_vec3_f64(currPosition, currPosition64Low);
    let nextPositionCommon = project_position_vec3_f64(nextPosition, nextPosition64Low);

    let width = vec2<f32>(
      project_pixel_size_float(widthPixels),
      project_pixel_size_float(widthPixels)
    );
#ifdef ANTIALIASING
    let coverageScale = select(
      1.0,
      (widthPixels + 0.5 / project.devicePixelRatio) / max(widthPixels, 1e-6),
      widthPixels > 0.0
    );
#endif
    let join = getLineJoinOffset(
      prevPositionCommon,
      currPositionCommon,
      nextPositionCommon,
      width,
#ifdef DASH_ENABLED
      1.0,
      vec2<f32>(0.0, 1.0),
#endif
#ifdef ANTIALIASING
      coverageScale,
#endif
      attributes.positions,
      attributes.instanceTypes
    );
#ifdef DASH_ENABLED
    varyings.vPathBounds = vec2<f32>(0.0, join.pathLength);
#endif

    geometry.position = vec4<f32>(currPositionCommon + join.offset, 1.0);
    geometry.uv = join.pathPosition;
    varyings.position = project_common_position_to_clipspace(geometry.position);
    varyings.vCornerOffset = join.cornerOffset;
    varyings.vMiterLength = join.miterLength;
    varyings.vPathPosition = join.pathPosition;
    varyings.vPathLength = join.pathLength;
    varyings.vJointType = join.jointType;
  }

  varyings.clipCoordinates = geometry.position.xy;
  clip_filterPosition(&varyings.position, geometry.worldPosition.xy);

  varyings.vColor = vec4<f32>(
    attributes.instanceColors.rgb,
    attributes.instanceColors.a * layer.opacity
  );
  return varyings;
}

@fragment
fn fragmentMain(varyings: Varyings) -> @location(0) vec4<f32> {
  geometry.uv = varyings.vPathPosition;

#ifdef ANTIALIASING
  // Coordinates of the outer silhouette, in units of half-width: rounded joints and caps are
  // bounded by the corner offset, everywhere else by the edge of the stroke. Dividing by the
  // screen-space derivative converts the distance to the boundary into device pixels, which stays
  // correct under perspective foreshortening and under extensions that rescale the stroke.
#ifdef DASH_ENABLED
  let isCorner =
    varyings.vPathPosition.y < varyings.vPathBounds.x ||
    varyings.vPathPosition.y > varyings.vPathBounds.y;
#else
  let isCorner = varyings.vPathPosition.y < 0.0 || varyings.vPathPosition.y > varyings.vPathLength;
#endif
  let isRound = varyings.vJointType > 0.5;

  // Distance to the silhouette in device pixels, from the derivative of the coordinate that
  // bounds it. Computed before the discards below: derivatives need uniform control flow and are
  // undefined after a discard in the quad. See dev-docs/RFCs/v9.4/analytic-antialiasing-rfc.md
  let bodyCoord = abs(varyings.vPathPosition.x);
  let cornerCoord = length(varyings.vCornerOffset);
  // Both evaluated so each derivative stays on one field across the corner/body boundary
  let bodyPixels = (1.0 - bodyCoord) / max(fwidth(bodyCoord), 1e-6);
  let cornerPixels = (1.0 - cornerCoord) / max(fwidth(cornerCoord), 1e-6);
#ifdef PATH_STYLE_OFFSET
  // Rounded corners still intersect the stroke-width envelope. Extensions may remap
  // vPathPosition.x independently of vCornerOffset, as PathStyleExtension does for offsets.
  let edgePixels = select(bodyPixels, min(cornerPixels, bodyPixels), isRound && isCorner);
#else
  let edgePixels = select(bodyPixels, cornerPixels, isRound && isCorner);
#endif

  // Fragments outside the coverage ramp must not write depth or picking colors.
  if (edgePixels <= -SMOOTH_EDGE_RADIUS) {
    discard;
  }

  if (isCorner) {
    if (!isRound && varyings.vMiterLength > path.miterLimit + 1.0) {
      discard;
    }
  }

  var color = varyings.vColor;

  // Feather one device pixel across the width only, before premultiplication. edgePixels is a
  // signed device-pixel distance and SMOOTH_EDGE_RADIUS is 0.5, so this ramps across one pixel.
  color.a *= smoothedge(0.0, edgePixels);
#else
#ifdef DASH_ENABLED
  if (
    varyings.vPathPosition.y < varyings.vPathBounds.x ||
    varyings.vPathPosition.y > varyings.vPathBounds.y
  ) {
#else
  if (
    varyings.vPathPosition.y < 0.0 ||
    varyings.vPathPosition.y > varyings.vPathLength
  ) {
#endif
    if (varyings.vJointType > 0.5 && length(varyings.vCornerOffset) > 1.0) {
      discard;
    }
    if (
      varyings.vJointType < 0.5 &&
      varyings.vMiterLength > path.miterLimit + 1.0
    ) {
      discard;
    }
  }
#endif

  // Fragment-layer injections that discard pixels must run after analytic coverage derivatives.
  // See TripsLayer, which rejects fragments outside of the active time window at this anchor.
  // DECKGL_FILTER_COLOR
  clip_filterColor(varyings.clipCoordinates);
#ifdef ANTIALIASING
  return deckgl_premultiplied_alpha(color);
#else
  return deckgl_premultiplied_alpha(varyings.vColor);
#endif
}
`,OI=`#version 300 es
#define SHADER_NAME path-layer-vertex-shader
in vec2 positions;
in float instanceTypes;
in vec3 instanceStartPositions;
in vec3 instanceEndPositions;
in vec3 instanceLeftPositions;
in vec3 instanceRightPositions;
in vec3 instanceLeftPositions64Low;
in vec3 instanceStartPositions64Low;
in vec3 instanceEndPositions64Low;
in vec3 instanceRightPositions64Low;
in float instanceStrokeWidths;
in vec4 instanceColors;
in float rowIndexes;
uniform float opacity;
out vec4 vColor;
out vec2 vCornerOffset;
out float vMiterLength;
out vec2 vPathPosition;
out float vPathLength;
out float vJointType;
#ifdef DASH_ENABLED
out vec2 vPathBounds;
#endif
const float EPSILON = 0.001;
const vec3 ZERO_OFFSET = vec3(0.0);
float flipIfTrue(bool flag) {
return -(float(flag) * 2. - 1.);
}
vec3 getLineJoinOffset(
vec3 prevPoint, vec3 currPoint, vec3 nextPoint,
vec2 width
#ifdef DASH_ENABLED
, float sourcePathLength, vec2 sourcePathRange
#endif
#ifdef ANTIALIASING
, float coverageScale
#endif
) {
bool isEnd = positions.x > 0.0;
float sideOfPath = positions.y;
float isJoint = float(sideOfPath == 0.0);
vec3 deltaA3 = (currPoint - prevPoint);
vec3 deltaB3 = (nextPoint - currPoint);
mat3 rotationMatrix;
bool needsRotation = !path.billboard && project_needs_rotation(currPoint, rotationMatrix);
if (needsRotation) {
deltaA3 = deltaA3 * rotationMatrix;
deltaB3 = deltaB3 * rotationMatrix;
}
vec2 deltaA = deltaA3.xy / width;
vec2 deltaB = deltaB3.xy / width;
float lenA = length(deltaA);
float lenB = length(deltaB);
vec2 dirA = lenA > 0. ? normalize(deltaA) : vec2(0.0, 0.0);
vec2 dirB = lenB > 0. ? normalize(deltaB) : vec2(0.0, 0.0);
vec2 perpA = vec2(-dirA.y, dirA.x);
vec2 perpB = vec2(-dirB.y, dirB.x);
vec2 tangent = dirA + dirB;
tangent = length(tangent) > 0. ? normalize(tangent) : perpA;
vec2 miterVec = vec2(-tangent.y, tangent.x);
vec2 dir = isEnd ? dirA : dirB;
vec2 perp = isEnd ? perpA : perpB;
float L = isEnd ? lenA : lenB;
#ifdef DASH_ENABLED
vec3 currDelta3 = isEnd ? deltaA3 : deltaB3;
float currLength2D = length(currDelta3.xy);
float arcLengthRatio = 1.0;
float pathPositionOffset = 0.0;
float pathLength = L;
if (path.billboard) {
float visiblePathLength = sourcePathLength * (sourcePathRange.y - sourcePathRange.x);
arcLengthRatio = L > 0.0 ? visiblePathLength / L : 0.0;
pathPositionOffset = sourcePathLength * sourcePathRange.x;
pathLength = sourcePathLength;
} else if (currLength2D > 0.0) {
arcLengthRatio = length(currDelta3) / currLength2D;
pathLength = L * arcLengthRatio;
}
#endif
float sinHalfA = abs(dot(miterVec, perp));
float cosHalfA = abs(dot(dirA, miterVec));
float turnDirection = flipIfTrue(dirA.x * dirB.y >= dirA.y * dirB.x);
float cornerPosition = sideOfPath * turnDirection;
float miterSize = 1.0 / max(sinHalfA, EPSILON);
miterSize = mix(
min(miterSize, max(lenA, lenB) / max(cosHalfA, EPSILON)),
miterSize,
step(0.0, cornerPosition)
);
vec2 offsetVec = mix(miterVec * miterSize, perp, step(0.5, cornerPosition))
* (sideOfPath + isJoint * turnDirection);
bool isStartCap = lenA == 0.0 || (!isEnd && (instanceTypes == 1.0 || instanceTypes == 3.0));
bool isEndCap = lenB == 0.0 || (isEnd && (instanceTypes == 2.0 || instanceTypes == 3.0));
bool isCap = isStartCap || isEndCap;
if (isCap) {
offsetVec = mix(perp * sideOfPath, dir * path.capType * 4.0 * flipIfTrue(isStartCap), isJoint);
vJointType = path.capType;
} else {
vJointType = path.jointType;
}
#ifdef ANTIALIASING
vec2 coverageOffsetVec = offsetVec * coverageScale;
#ifdef DASH_ENABLED
vPathLength = pathLength;
#else
vPathLength = L;
#endif
vCornerOffset = coverageOffsetVec;
vMiterLength = dot(vCornerOffset, miterVec * turnDirection);
vMiterLength = isCap ? isJoint : vMiterLength;
vec2 offsetFromStartOfPath = coverageOffsetVec + deltaA * float(isEnd);
vPathPosition = vec2(
dot(offsetFromStartOfPath, perp),
#ifdef DASH_ENABLED
pathPositionOffset + dot(offsetFromStartOfPath, dir) * arcLengthRatio
#else
dot(offsetFromStartOfPath, dir)
#endif
);
geometry.uv = vPathPosition;
float isValid = step(instanceTypes, 3.5);
vec3 offset = vec3(coverageOffsetVec * width * isValid, 0.0);
#else
#ifdef DASH_ENABLED
vPathLength = pathLength;
#else
vPathLength = L;
#endif
vCornerOffset = offsetVec;
vMiterLength = dot(vCornerOffset, miterVec * turnDirection);
vMiterLength = isCap ? isJoint : vMiterLength;
vec2 offsetFromStartOfPath = vCornerOffset + deltaA * float(isEnd);
vPathPosition = vec2(
dot(offsetFromStartOfPath, perp),
#ifdef DASH_ENABLED
pathPositionOffset + dot(offsetFromStartOfPath, dir) * arcLengthRatio
#else
dot(offsetFromStartOfPath, dir)
#endif
);
geometry.uv = vPathPosition;
float isValid = step(instanceTypes, 3.5);
vec3 offset = vec3(offsetVec * width * isValid, 0.0);
#endif
if (needsRotation) {
offset = rotationMatrix * offset;
}
return offset;
}
void clipLine(inout vec4 position, vec4 refPosition) {
if (position.w < EPSILON) {
float r = (EPSILON - refPosition.w) / (position.w - refPosition.w);
position = refPosition + (position - refPosition) * r;
}
}
#ifdef DASH_ENABLED
vec2 getClippedPathRange(float startW, float endW) {
bool startClipped = startW < EPSILON;
bool endClipped = endW < EPSILON;
if (startClipped && endClipped) {
return vec2(0.0);
}
if (startClipped || endClipped) {
float intersection = clamp((EPSILON - startW) / (endW - startW), 0.0, 1.0);
return startClipped ? vec2(intersection, 1.0) : vec2(0.0, intersection);
}
return vec2(0.0, 1.0);
}
#endif
void main() {
geometry.pickingColor = picking_getPickingColorFromIndex(rowIndexes);
vColor = vec4(instanceColors.rgb, instanceColors.a * layer.opacity);
float isEnd = positions.x;
vec3 prevPosition = mix(instanceLeftPositions, instanceStartPositions, isEnd);
vec3 prevPosition64Low = mix(instanceLeftPositions64Low, instanceStartPositions64Low, isEnd);
vec3 currPosition = mix(instanceStartPositions, instanceEndPositions, isEnd);
vec3 currPosition64Low = mix(instanceStartPositions64Low, instanceEndPositions64Low, isEnd);
vec3 nextPosition = mix(instanceEndPositions, instanceRightPositions, isEnd);
vec3 nextPosition64Low = mix(instanceEndPositions64Low, instanceRightPositions64Low, isEnd);
geometry.worldPosition = currPosition;
vec2 widthPixels = vec2(clamp(
project_size_to_pixel(instanceStrokeWidths * path.widthScale, path.widthUnits),
path.widthMinPixels, path.widthMaxPixels) / 2.0);
vec3 width;
if (path.billboard) {
#ifdef DASH_ENABLED
vec4 prevPositionCommon;
vec4 nextPositionCommon;
vec4 prevPositionScreen = project_position_to_clipspace(
prevPosition, prevPosition64Low, ZERO_OFFSET, prevPositionCommon
);
#else
vec4 prevPositionScreen = project_position_to_clipspace(
prevPosition, prevPosition64Low, ZERO_OFFSET
);
#endif
vec4 currPositionScreen = project_position_to_clipspace(currPosition, currPosition64Low, ZERO_OFFSET, geometry.position);
#ifdef DASH_ENABLED
vec4 nextPositionScreen = project_position_to_clipspace(
nextPosition, nextPosition64Low, ZERO_OFFSET, nextPositionCommon
);
#else
vec4 nextPositionScreen = project_position_to_clipspace(
nextPosition, nextPosition64Low, ZERO_OFFSET
);
#endif
#ifdef DASH_ENABLED
vec4 sourcePathStartScreen = mix(currPositionScreen, prevPositionScreen, isEnd);
vec4 sourcePathEndScreen = mix(nextPositionScreen, currPositionScreen, isEnd);
vec2 billboardPathRange = getClippedPathRange(
sourcePathStartScreen.w, sourcePathEndScreen.w
);
#endif
clipLine(prevPositionScreen, currPositionScreen);
clipLine(nextPositionScreen, currPositionScreen);
clipLine(currPositionScreen, mix(nextPositionScreen, prevPositionScreen, isEnd));
width = vec3(widthPixels, 0.0);
DECKGL_FILTER_SIZE(width, geometry);
#ifdef ANTIALIASING
vec2 coveragePadding = vec2(0.5 / project.devicePixelRatio);
float coverageScale = length(width.xy) > 0.0
? length(width.xy + coveragePadding) / length(width.xy)
: 1.0;
#endif
#ifdef DASH_ENABLED
vec3 currentDeltaCommon = isEnd > 0.0
? geometry.position.xyz - prevPositionCommon.xyz
: nextPositionCommon.xyz - geometry.position.xyz;
float billboardPathLength = width.x > 0.0
? length(currentDeltaCommon) * project.scale / (width.x * project.focalDistance)
: 0.0;
#endif
vec3 offset = getLineJoinOffset(
prevPositionScreen.xyz / prevPositionScreen.w,
currPositionScreen.xyz / currPositionScreen.w,
nextPositionScreen.xyz / nextPositionScreen.w,
project_pixel_size_to_clipspace(width.xy)
#ifdef DASH_ENABLED
,
billboardPathLength, billboardPathRange
#endif
#ifdef ANTIALIASING
,
coverageScale
#endif
);
#ifdef DASH_ENABLED
vPathBounds = billboardPathLength * billboardPathRange;
#endif
DECKGL_FILTER_GL_POSITION(currPositionScreen, geometry);
gl_Position = vec4(currPositionScreen.xyz + offset * currPositionScreen.w, currPositionScreen.w);
} else {
prevPosition = project_position(prevPosition, prevPosition64Low);
currPosition = project_position(currPosition, currPosition64Low);
nextPosition = project_position(nextPosition, nextPosition64Low);
width = vec3(project_pixel_size(widthPixels), 0.0);
DECKGL_FILTER_SIZE(width, geometry);
#ifdef ANTIALIASING
vec2 coveragePadding = project_pixel_size(vec2(0.5 / project.devicePixelRatio));
float coverageScale = length(width.xy) > 0.0
? length(width.xy + coveragePadding) / length(width.xy)
: 1.0;
#endif
vec3 offset = getLineJoinOffset(
prevPosition, currPosition, nextPosition, width.xy
#ifdef DASH_ENABLED
, 1.0, vec2(0.0, 1.0)
#endif
#ifdef ANTIALIASING
, coverageScale
#endif
);
#ifdef DASH_ENABLED
vPathBounds = vec2(0.0, vPathLength);
#endif
geometry.position = vec4(currPosition + offset, 1.0);
gl_Position = project_common_position_to_clipspace(geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
}
DECKGL_FILTER_COLOR(vColor, geometry);
}
`,BI=`#version 300 es
#define SHADER_NAME path-layer-fragment-shader
precision highp float;
in vec4 vColor;
in vec2 vCornerOffset;
in float vMiterLength;
in vec2 vPathPosition;
in float vPathLength;
in float vJointType;
#ifdef DASH_ENABLED
in vec2 vPathBounds;
#endif
out vec4 fragColor;
void main(void) {
geometry.uv = vPathPosition;
#ifdef ANTIALIASING
#ifdef DASH_ENABLED
bool isCorner = vPathPosition.y < vPathBounds.x || vPathPosition.y > vPathBounds.y;
#else
bool isCorner = vPathPosition.y < 0.0 || vPathPosition.y > vPathLength;
#endif
bool isRound = vJointType > 0.5;
float bodyCoord = abs(vPathPosition.x);
float cornerCoord = length(vCornerOffset);
float bodyPixels = (1.0 - bodyCoord) / max(fwidth(bodyCoord), 1e-6);
float cornerPixels = (1.0 - cornerCoord) / max(fwidth(cornerCoord), 1e-6);
#ifdef PATH_STYLE_OFFSET
float edgePixels = isRound && isCorner ? min(cornerPixels, bodyPixels) : bodyPixels;
#else
float edgePixels = isRound && isCorner ? cornerPixels : bodyPixels;
#endif
if (edgePixels <= -SMOOTH_EDGE_RADIUS) {
discard;
}
if (isCorner) {
if (!isRound && vMiterLength > path.miterLimit + 1.0) {
discard;
}
}
fragColor = vColor;
fragColor.a *= smoothedge(0.0, edgePixels);
#else
#ifdef DASH_ENABLED
if (vPathPosition.y < vPathBounds.x || vPathPosition.y > vPathBounds.y) {
#else
if (vPathPosition.y < 0.0 || vPathPosition.y > vPathLength) {
#endif
if (vJointType > 0.5 && length(vCornerOffset) > 1.0) {
discard;
}
if (vJointType < 0.5 && vMiterLength > path.miterLimit + 1.0) {
discard;
}
}
fragColor = vColor;
#endif
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,_p=[0,0,0,255],kI={widthUnits:"meters",widthScale:{type:"number",min:0,value:1},widthMinPixels:{type:"number",min:0,value:0},widthMaxPixels:{type:"number",min:0,value:Number.MAX_SAFE_INTEGER},jointRounded:!1,capRounded:!1,miterLimit:{type:"number",min:0,value:4},antialiasing:!1,billboard:!1,_pathType:null,getPath:{type:"accessor",value:i=>i.path},getColor:{type:"accessor",value:_p},getWidth:{type:"accessor",value:1},rounded:{deprecatedFor:["jointRounded","capRounded"]}},Vc={enter:(i,e)=>e.length?e.subarray(e.length-i.length):i};function DI(i){if(i.isGeospatial)return null;const{unitsPerMeter:e}=i.distanceScales;return[e[0],e[1],e[2]]}function vp(i,e){return i===e||!!(i&&e&&i.length===e.length&&i.every((t,n)=>t===e[n]))}class jc extends Ge{getShaders(){const{antialiasing:e}=this.props;return super.getShaders({vs:OI,fs:BI,source:RI,defines:e?{ANTIALIASING:1}:{},modules:[_t,Ht,Zt,MI,...this.context.device.type==="webgpu"?[Dc]:[]]})}get wrapLongitude(){return!1}getBounds(){return this.context.device.type==="webgpu"?null:this.getAttributeManager()?.getBounds(["vertexPositions"])}getPathProjectionScale(e){const t=this.props.coordinateSystem;if(!!!this.getAttributeManager()?.getAttributes().instanceDashOffsets)return null;if(e instanceof tt&&e.zoom>=12&&(t==="default"||t==="lnglat"||t==="cartesian")){const o=ms.getUniforms({viewport:e,coordinateSystem:t,coordinateOrigin:this.props.coordinateOrigin,autoWrapLongitude:this.wrapLongitude});return[e.projectionMode,o.coordinateOrigin[1],o.commonOrigin[1],...o.commonUnitsPerWorldUnit,...o.commonUnitsPerWorldUnit2,o.commonUnitsPerMeter[2]]}const r=DI(e);return r?[e.projectionMode,...r]:[e.projectionMode]}shouldUpdateState(e){const{viewport:t}=this.context;return super.shouldUpdateState(e)||this.state?.tessellationResolution!==t.resolution||!vp(this.state?.pathProjectionScale,this.getPathProjectionScale(t))}initializeState(){const t=this.context.device.type==="webgpu";this.getAttributeManager().addInstanced({...t?{pathPositions:{size:24,type:"float32",transition:!1,accessor:"getPath",update:this.calculateWebGPUPositions,shaderAttributes:{instanceLeftPositions:{size:3,elementOffset:0},instanceStartPositions:{size:3,elementOffset:3},instanceEndPositions:{size:3,elementOffset:6},instanceRightPositions:{size:3,elementOffset:9},instanceLeftPositions64Low:{size:3,elementOffset:12},instanceStartPositions64Low:{size:3,elementOffset:15},instanceEndPositions64Low:{size:3,elementOffset:18},instanceRightPositions64Low:{size:3,elementOffset:21}},noAlloc:!0}}:{vertexPositions:{size:3,vertexOffset:1,type:"float64",fp64:this.use64bitPositions(),transition:Vc,accessor:"getPath",update:this.calculatePositions,noAlloc:!0,shaderAttributes:{instanceLeftPositions:{vertexOffset:0},instanceStartPositions:{vertexOffset:1},instanceEndPositions:{vertexOffset:2},instanceRightPositions:{vertexOffset:3}}}},instanceTypes:{size:1,type:t?"float32":"uint8",update:this.calculateSegmentTypes,noAlloc:!0},instanceStrokeWidths:{size:1,accessor:"getWidth",transition:t?!1:Vc,defaultValue:1,bufferGroup:"path-instance-data"},instanceColors:{size:this.props.colorFormat.length,type:"unorm8",accessor:"getColor",transition:t?!1:Vc,defaultValue:_p,bufferGroup:"path-instance-data"},rowIndexes:{size:1,type:"uint32",accessor:(s,{index:r})=>s&&s.__source?s.__source.index:r,bufferGroup:"path-instance-data"}}),this.setState({pathTesselator:new AI({fp64:this.use64bitPositions(),isWebGPU:t}),tessellationResolution:this.context.viewport.resolution,pathProjectionScale:this.getPathProjectionScale(this.context.viewport)})}updateState(e){super.updateState(e);const{props:t,oldProps:n,changeFlags:s}=e,r=this.getAttributeManager(),{viewport:o}=this.context,a=this.state.tessellationResolution!==o.resolution,c=this.getPathProjectionScale(o),l=!vp(this.state.pathProjectionScale,c),f=s.updateTriggersChanged&&(s.updateTriggersChanged.all||s.updateTriggersChanged.getPath)||t._pathType!==n._pathType||t.positionFormat!==n.positionFormat||t.wrapLongitude!==n.wrapLongitude||a;if(s.dataChanged||f){const{pathTesselator:g}=this.state,p=t.data.attributes||{};g.updateGeometry({data:t.data,geometryBuffer:p.getPath,buffers:p,normalize:!t._pathType,loop:t._pathType==="loop",getGeometry:t.getPath,positionFormat:t.positionFormat,wrapLongitude:t.wrapLongitude,resolution:o.resolution,dataChanged:f?void 0:s.dataChanged}),this.setState({numInstances:g.instanceCount,startIndices:g.vertexStarts,tessellationResolution:o.resolution,pathProjectionScale:c}),!s.dataChanged||f?r.invalidateAll():l&&r.invalidate("instanceDashOffsets")}else l&&(this.setState({pathProjectionScale:c}),r.invalidate("instanceDashOffsets"));(s.extensionsChanged||t.antialiasing!==n.antialiasing)&&(this.state.model?.destroy(),this.state.model=this._getModel(),r.invalidateAll())}getPickingInfo(e){const t=super.getPickingInfo(e),{index:n}=t,s=this.props.data;return s[0]&&s[0].__source&&(t.object=s.find(r=>r.__source.index===n)),t}disablePickingIndex(e){const t=this.props.data;if(t[0]&&t[0].__source)for(let n=0;n<t.length;n++)t[n].__source.index===e&&this._disablePickingIndex(n);else super.disablePickingIndex(e)}draw({uniforms:e}){const{jointRounded:t,capRounded:n,billboard:s,miterLimit:r,widthUnits:o,widthScale:a,widthMinPixels:c,widthMaxPixels:l}=this.props,u=this.state.model,f={jointType:Number(t),capType:Number(n),billboard:s,widthUnits:xe[o],widthScale:a,miterLimit:r,widthMinPixels:c,widthMaxPixels:l};u.shaderInputs.setProps({path:f}),u.draw(this.context.renderPass)}_getModel(){const e=[0,1,2,1,4,2,1,3,4,3,5,4],t=[0,0,0,-1,0,1,1,-1,1,1,1,0];return new re(this.context.device,{...this.getShaders(),id:this.props.id,bufferLayout:this.getAttributeManager().getBufferLayouts(),geometry:new ke({topology:"triangle-list",attributes:{indices:new Uint16Array(e),positions:{value:new Float32Array(t),size:2}}}),isInstanced:!0})}calculatePositions(e){const{pathTesselator:t}=this.state;e.startIndices=t.vertexStarts,e.value=t.get("positions")}calculateSegmentTypes(e){const{pathTesselator:t}=this.state;e.startIndices=t.vertexStarts,e.value=t.get("segmentTypes")}calculateWebGPUPositions(e){const{pathTesselator:t}=this.state,n=t.get("positions");if(!n){e.value=null;return}const s=t.instanceCount,r=new Float32Array(s*24),o=[-1,0,1,2];for(let a=0;a<s;a++){const c=a*24;for(let l=0;l<4;l++){const u=a+o[l],f=c+l*3;for(let d=0;d<3;d++){const g=u>=0&&u<s?n[u*3+d]:0,p=Math.fround(g);r[f+d]=p,r[f+d+12]=g-p}}}e.startIndices=t.vertexStarts,e.value=r}}jc.defaultProps=kI,jc.layerName="PathLayer";var Wc={exports:{}};Wc.exports=Zs,Wc.exports.default=Zs;function Zs(i,e,t){t=t||2;var n=e&&e.length,s=n?e[0]*t:i.length,r=xp(i,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;var a,c,l,u,f,d,g;if(n&&(r=$I(i,e,r,t)),i.length>80*t){a=l=i[0],c=u=i[1];for(var p=t;p<s;p+=t)f=i[p],d=i[p+1],f<a&&(a=f),d<c&&(c=d),f>l&&(l=f),d>u&&(u=d);g=Math.max(l-a,u-c),g=g!==0?32767/g:0}return rn(r,o,t,a,c,g,0),o}function xp(i,e,t,n,s){var r,o;if(s===qc(i,e,t,n)>0)for(r=e;r<t;r+=n)o=Sp(r,i[r],i[r+1],o);else for(r=t-n;r>=e;r-=n)o=Sp(r,i[r],i[r+1],o);return o&&Ks(o,o.next)&&(an(o),o=o.next),o}function At(i,e){if(!i)return i;e||(e=i);var t=i,n;do if(n=!1,!t.steiner&&(Ks(t,t.next)||Y(t.prev,t,t.next)===0)){if(an(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function rn(i,e,t,n,s,r,o){if(i){!o&&r&&HI(i,n,s,r);for(var a=i,c,l;i.prev!==i.next;){if(c=i.prev,l=i.next,r?NI(i,n,s,r):FI(i)){e.push(c.i/t|0),e.push(i.i/t|0),e.push(l.i/t|0),an(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=zI(At(i),e,t),rn(i,e,t,n,s,r,2)):o===2&&UI(i,e,t,n,s,r):rn(At(i),e,t,n,s,r,1);break}}}}function FI(i){var e=i.prev,t=i,n=i.next;if(Y(e,t,n)>=0)return!1;for(var s=e.x,r=t.x,o=n.x,a=e.y,c=t.y,l=n.y,u=s<r?s<o?s:o:r<o?r:o,f=a<c?a<l?a:l:c<l?c:l,d=s>r?s>o?s:o:r>o?r:o,g=a>c?a>l?a:l:c>l?c:l,p=n.next;p!==e;){if(p.x>=u&&p.x<=d&&p.y>=f&&p.y<=g&&ui(s,a,r,c,o,l,p.x,p.y)&&Y(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function NI(i,e,t,n){var s=i.prev,r=i,o=i.next;if(Y(s,r,o)>=0)return!1;for(var a=s.x,c=r.x,l=o.x,u=s.y,f=r.y,d=o.y,g=a<c?a<l?a:l:c<l?c:l,p=u<f?u<d?u:d:f<d?f:d,m=a>c?a>l?a:l:c>l?c:l,y=u>f?u>d?u:d:f>d?f:d,_=Hc(g,p,e,t,n),v=Hc(m,y,e,t,n),b=i.prevZ,x=i.nextZ;b&&b.z>=_&&x&&x.z<=v;){if(b.x>=g&&b.x<=m&&b.y>=p&&b.y<=y&&b!==s&&b!==o&&ui(a,u,c,f,l,d,b.x,b.y)&&Y(b.prev,b,b.next)>=0||(b=b.prevZ,x.x>=g&&x.x<=m&&x.y>=p&&x.y<=y&&x!==s&&x!==o&&ui(a,u,c,f,l,d,x.x,x.y)&&Y(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;b&&b.z>=_;){if(b.x>=g&&b.x<=m&&b.y>=p&&b.y<=y&&b!==s&&b!==o&&ui(a,u,c,f,l,d,b.x,b.y)&&Y(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;x&&x.z<=v;){if(x.x>=g&&x.x<=m&&x.y>=p&&x.y<=y&&x!==s&&x!==o&&ui(a,u,c,f,l,d,x.x,x.y)&&Y(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function zI(i,e,t){var n=i;do{var s=n.prev,r=n.next.next;!Ks(s,r)&&wp(s,n,n.next,r)&&on(s,r)&&on(r,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),an(n),an(n.next),n=i=r),n=n.next}while(n!==i);return At(n)}function UI(i,e,t,n,s,r){var o=i;do{for(var a=o.next.next;a!==o.prev;){if(o.i!==a.i&&XI(o,a)){var c=Pp(o,a);o=At(o,o.next),c=At(c,c.next),rn(o,e,t,n,s,r,0),rn(c,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function $I(i,e,t,n){var s=[],r,o,a,c,l;for(r=0,o=e.length;r<o;r++)a=e[r]*n,c=r<o-1?e[r+1]*n:i.length,l=xp(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(qI(l));for(s.sort(GI),r=0;r<s.length;r++)t=VI(s[r],t);return t}function GI(i,e){return i.x-e.x}function VI(i,e){var t=jI(i,e);if(!t)return e;var n=Pp(t,i);return At(n,n.next),At(t,t.next)}function jI(i,e){var t=e,n=i.x,s=i.y,r=-1/0,o;do{if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){var a=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(a<=n&&a>r&&(r=a,o=t.x<t.next.x?t:t.next,a===n))return o}t=t.next}while(t!==e);if(!o)return null;var c=o,l=o.x,u=o.y,f=1/0,d;t=o;do n>=t.x&&t.x>=l&&n!==t.x&&ui(s<u?n:r,s,l,u,s<u?r:n,s,t.x,t.y)&&(d=Math.abs(s-t.y)/(n-t.x),on(t,i)&&(d<f||d===f&&(t.x>o.x||t.x===o.x&&WI(o,t)))&&(o=t,f=d)),t=t.next;while(t!==c);return o}function WI(i,e){return Y(i.prev,i,e.prev)<0&&Y(e.next,i,i.next)<0}function HI(i,e,t,n){var s=i;do s.z===0&&(s.z=Hc(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,YI(s)}function YI(i){var e,t,n,s,r,o,a,c,l=1;do{for(t=i,i=null,r=null,o=0;t;){for(o++,n=t,a=0,e=0;e<l&&(a++,n=n.nextZ,!!n);e++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;t=n}r.nextZ=null,l*=2}while(o>1);return i}function Hc(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function qI(i){var e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function ui(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function XI(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!ZI(i,e)&&(on(i,e)&&on(e,i)&&KI(i,e)&&(Y(i.prev,i,e.prev)||Y(i,e.prev,e))||Ks(i,e)&&Y(i.prev,i,i.next)>0&&Y(e.prev,e,e.next)>0)}function Y(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Ks(i,e){return i.x===e.x&&i.y===e.y}function wp(i,e,t,n){var s=Js(Y(i,e,t)),r=Js(Y(i,e,n)),o=Js(Y(t,n,i)),a=Js(Y(t,n,e));return!!(s!==r&&o!==a||s===0&&Qs(i,t,e)||r===0&&Qs(i,n,e)||o===0&&Qs(t,i,n)||a===0&&Qs(t,e,n))}function Qs(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Js(i){return i>0?1:i<0?-1:0}function ZI(i,e){var t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&wp(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function on(i,e){return Y(i.prev,i,i.next)<0?Y(i,e,i.next)>=0&&Y(i,i.prev,e)>=0:Y(i,e,i.prev)<0||Y(i,i.next,e)<0}function KI(i,e){var t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Pp(i,e){var t=new Yc(i.i,i.x,i.y),n=new Yc(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Sp(i,e,t,n){var s=new Yc(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function an(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Yc(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}Zs.deviation=function(i,e,t,n){var s=e&&e.length,r=s?e[0]*t:i.length,o=Math.abs(qc(i,0,r,t));if(s)for(var a=0,c=e.length;a<c;a++){var l=e[a]*t,u=a<c-1?e[a+1]*t:i.length;o-=Math.abs(qc(i,l,u,t))}var f=0;for(a=0;a<n.length;a+=3){var d=n[a]*t,g=n[a+1]*t,p=n[a+2]*t;f+=Math.abs((i[d]-i[p])*(i[g+1]-i[d+1])-(i[d]-i[g])*(i[p+1]-i[d+1]))}return o===0&&f===0?0:Math.abs((f-o)/o)};function qc(i,e,t,n){for(var s=0,r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}Zs.flatten=function(i){for(var e=i[0][0].length,t={vertices:[],holes:[],dimensions:e},n=0,s=0;s<i.length;s++){for(var r=0;r<i[s].length;r++)for(var o=0;o<e;o++)t.vertices.push(i[s][r][o]);s>0&&(n+=i[s-1].length,t.holes.push(n))}return t};var QI=Wc.exports;const JI=gm(QI),er=Nc.CLOCKWISE,Ep=Nc.COUNTER_CLOCKWISE,ot={};function eM(i){if(i=i&&i.positions||i,!Array.isArray(i)&&!ArrayBuffer.isView(i))throw new Error("invalid polygon")}function cn(i){return"positions"in i?i.positions:i}function tr(i){return"holeIndices"in i?i.holeIndices:null}function tM(i){return Array.isArray(i[0])}function iM(i){return i.length>=1&&i[0].length>=2&&Number.isFinite(i[0][0])}function nM(i){const e=i[0],t=i[i.length-1];return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]}function sM(i,e,t,n){for(let s=0;s<e;s++)if(i[t+s]!==i[n-e+s])return!1;return!0}function Cp(i,e,t,n,s){let r=e;const o=t.length;for(let a=0;a<o;a++)for(let c=0;c<n;c++)i[r++]=t[a][c]||0;if(!nM(t))for(let a=0;a<n;a++)i[r++]=t[0][a]||0;return ot.start=e,ot.end=r,ot.size=n,zc(i,s,ot),r}function Lp(i,e,t,n,s=0,r,o){r=r||t.length;const a=r-s;if(a<=0)return e;let c=e;for(let l=0;l<a;l++)i[c++]=t[s+l];if(!sM(t,n,s,r))for(let l=0;l<n;l++)i[c++]=t[s+l];return ot.start=e,ot.end=c,ot.size=n,zc(i,o,ot),c}function rM(i,e){eM(i);const t=[],n=[];if("positions"in i){const{positions:s,holeIndices:r}=i;if(r){let o=0;for(let a=0;a<=r.length;a++)o=Lp(t,o,s,e,r[a-1],r[a],a===0?er:Ep),n.push(o);return n.pop(),{positions:t,holeIndices:n}}i=s}if(!tM(i))return Lp(t,0,i,e,0,t.length,er),t;if(!iM(i)){let s=0;for(const[r,o]of i.entries())s=Cp(t,s,o,e,r===0?er:Ep),n.push(s);return n.pop(),{positions:t,holeIndices:n}}return Cp(t,0,i,e,er),t}function Xc(i,e,t){const n=i.length/3;let s=0;for(let r=0;r<n;r++){const o=(r+1)%n;s+=i[r*3+e]*i[o*3+t],s-=i[o*3+e]*i[r*3+t]}return Math.abs(s/2)}function Tp(i,e,t,n){const s=i.length/3;for(let r=0;r<s;r++){const o=r*3,a=i[o+0],c=i[o+1],l=i[o+2];i[o+e]=a,i[o+t]=c,i[o+n]=l}}function oM(i,e,t,n){let s=tr(i);s&&(s=s.map(a=>a/e));let r=cn(i);const o=n&&e===3;if(t){const a=r.length;r=r.slice();const c=[];for(let l=0;l<a;l+=e){c[0]=r[l],c[1]=r[l+1],o&&(c[2]=r[l+2]);const u=t(c);r[l]=u[0],r[l+1]=u[1],o&&(r[l+2]=u[2])}}if(o){const a=Xc(r,0,1),c=Xc(r,0,2),l=Xc(r,1,2);if(!a&&!c&&!l)return[];a>c&&a>l||(c>l?(t||(r=r.slice()),Tp(r,0,2,1)):(t||(r=r.slice()),Tp(r,2,0,1)))}return JI(r,s,e)}class aM extends Gg{constructor(e){const{fp64:t,IndexType:n=Uint32Array}=e;super({...e,attributes:{positions:{size:3,type:t?Float64Array:Float32Array},vertexValid:{type:Uint16Array,size:1},indices:{type:n,size:1}}})}get(e){const{attributes:t}=this;return e==="indices"?t.indices&&t.indices.subarray(0,this.vertexCount):t[e]}updateGeometry(e){super.updateGeometry(e);const t=this.buffers.indices;if(t)this.vertexCount=(t.value||t).length;else if(this.data&&!this.getGeometry)throw new Error("missing indices buffer")}normalizeGeometry(e){if(this.normalize){const t=rM(e,this.positionSize);return this.opts.resolution?up(cn(t),tr(t),{size:this.positionSize,gridResolution:this.opts.resolution,edgeTypes:!0}):this.opts.wrapLongitude?dI(cn(t),tr(t),{size:this.positionSize,maxLatitude:86,edgeTypes:!0}):t}return e}getGeometrySize(e){if(Ap(e)){let t=0;for(const n of e)t+=this.getGeometrySize(n);return t}return cn(e).length/this.positionSize}getGeometryFromBuffer(e){return this.normalize||!this.buffers.indices?super.getGeometryFromBuffer(e):null}updateGeometryAttributes(e,t){if(e&&Ap(e))for(const n of e){const s=this.getGeometrySize(n);t.geometrySize=s,this.updateGeometryAttributes(n,t),t.vertexStart+=s,t.indexStart=this.indexStarts[t.geometryIndex+1]}else{const n=e;this._updateIndices(n,t),this._updatePositions(n,t),this._updateVertexValid(n,t)}}_updateIndices(e,{geometryIndex:t,vertexStart:n,indexStart:s}){const{attributes:r,indexStarts:o,typedArrayManager:a}=this;let c=r.indices;if(!c||!e)return;let l=s;const u=oM(e,this.positionSize,this.opts.preproject,this.opts.full3d);c=a.allocate(c,s+u.length,{copy:!0});for(let f=0;f<u.length;f++)c[l++]=u[f]+n;o[t+1]=s+u.length,r.indices=c}_updatePositions(e,{vertexStart:t,geometrySize:n}){const{attributes:{positions:s},positionSize:r}=this;if(!s||!e)return;const o=cn(e);for(let a=t,c=0;c<n;a++,c++){const l=o[c*r],u=o[c*r+1],f=r>2?o[c*r+2]:0;s[a*3]=l,s[a*3+1]=u,s[a*3+2]=f}}_updateVertexValid(e,{vertexStart:t,geometrySize:n}){const{positionSize:s}=this,r=this.attributes.vertexValid,o=e&&tr(e);if(e&&e.edgeTypes?r.set(e.edgeTypes,t):r.fill(1,t,t+n),o)for(let a=0;a<o.length;a++)r[t+o[a]/s-1]=0;r[t+n-1]=0}}function Ap(i){return Array.isArray(i)&&i.length>0&&!Number.isFinite(i[0])}const cM=`struct SolidPolygonUniforms {
  extruded: f32,
  isWireframe: f32,
  elevationScale: f32,
};

@group(0) @binding(auto) var<uniform> solidPolygon: SolidPolygonUniforms;
`,Ip=`layout(std140) uniform solidPolygonUniforms {
  bool extruded;
  bool isWireframe;
  float elevationScale;
} solidPolygon;
`,lM={name:"solidPolygon",source:cM,vs:Ip,fs:Ip,uniformTypes:{extruded:"f32",isWireframe:"f32",elevationScale:"f32"}},Mp=`in vec4 fillColors;
in vec4 lineColors;
in float rowIndexes;
out vec4 vColor;
struct PolygonProps {
vec3 positions;
vec3 positions64Low;
vec3 normal;
float elevations;
};
vec3 project_offset_normal(vec3 vector) {
if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT ||
project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT_OFFSETS) {
return normalize(vector * project.commonUnitsPerWorldUnit);
}
return project_normal(vector);
}
void calculatePosition(PolygonProps props) {
vec3 pos = props.positions;
vec3 pos64Low = props.positions64Low;
vec3 normal = props.normal;
vec4 colors = solidPolygon.isWireframe ? lineColors : fillColors;
geometry.worldPosition = props.positions;
geometry.pickingColor = picking_getPickingColorFromIndex(rowIndexes);
if (solidPolygon.extruded) {
pos.z += props.elevations * solidPolygon.elevationScale;
}
gl_Position = project_position_to_clipspace(pos, pos64Low, vec3(0.), geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
if (solidPolygon.extruded) {
#ifdef IS_SIDE_VERTEX
normal = project_offset_normal(normal);
#else
normal = project_normal(normal);
#endif
geometry.normal = normal;
vec3 lightColor = lighting_getLightColor(colors.rgb, project.cameraPosition, geometry.position.xyz, geometry.normal);
vColor = vec4(lightColor, colors.a * layer.opacity);
} else {
vColor = vec4(colors.rgb, colors.a * layer.opacity);
}
DECKGL_FILTER_COLOR(vColor, geometry);
}
`,uM=`#version 300 es
#define SHADER_NAME solid-polygon-layer-vertex-shader
in vec3 vertexPositions;
in vec3 vertexPositions64Low;
in float elevations;
${Mp}
void main(void) {
PolygonProps props;
props.positions = vertexPositions;
props.positions64Low = vertexPositions64Low;
props.elevations = elevations;
props.normal = vec3(0.0, 0.0, 1.0);
calculatePosition(props);
}
`,fM=`#version 300 es
#define SHADER_NAME solid-polygon-layer-vertex-shader-side
#define IS_SIDE_VERTEX
in vec2 positions;
in vec3 vertexPositions;
in vec3 nextVertexPositions;
in vec3 vertexPositions64Low;
in vec3 nextVertexPositions64Low;
in float elevations;
in float instanceVertexValid;
${Mp}
void main(void) {
if(instanceVertexValid < 0.5){
gl_Position = vec4(0.);
return;
}
PolygonProps props;
vec3 pos;
vec3 pos64Low;
vec3 nextPos;
vec3 nextPos64Low;
#if RING_WINDING_ORDER_CW == 1
pos = vertexPositions;
pos64Low = vertexPositions64Low;
nextPos = nextVertexPositions;
nextPos64Low = nextVertexPositions64Low;
#else
pos = nextVertexPositions;
pos64Low = nextVertexPositions64Low;
nextPos = vertexPositions;
nextPos64Low = vertexPositions64Low;
#endif
props.positions = mix(pos, nextPos, positions.x);
props.positions64Low = mix(pos64Low, nextPos64Low, positions.x);
props.normal = vec3(
pos.y - nextPos.y + (pos64Low.y - nextPos64Low.y),
nextPos.x - pos.x + (nextPos64Low.x - pos64Low.x),
0.0);
props.elevations = elevations * positions.y;
calculatePosition(props);
}
`,dM=`#version 300 es
#define SHADER_NAME solid-polygon-layer-fragment-shader
precision highp float;
in vec4 vColor;
out vec4 fragColor;
void main(void) {
fragColor = vColor;
geometry.uv = vec2(0.);
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`;function Rp(){return`fn project_offset_normal(vector: vec3<f32>) -> vec3<f32> {
  if (project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT ||
      project.coordinateSystem == COORDINATE_SYSTEM_LNGLAT_OFFSETS) {
    return normalize(vector * project.commonUnitsPerWorldUnit);
  }
  return project_normal(vector);
}

fn apply_polygon_color(
  colors: vec4<f32>,
  normal: vec3<f32>,
  position: vec4<f32>
) -> vec4<f32> {
  if (solidPolygon.extruded > 0.5) {
    let lightColor = lighting_getLightColor2(
      colors.rgb,
      project.cameraPosition,
      position.xyz,
      normal
    );
    return vec4<f32>(lightColor, colors.a * layer.opacity);
  }
  return vec4<f32>(colors.rgb, colors.a * layer.opacity);
}
`}function Op(){return`@fragment
fn fragmentMain(inp: Varyings) -> @location(0) vec4<f32> {
  geometry.uv = vec2<f32>(0.0, 0.0);

  clip_filterColor(inp.clipCoordinates);

  if (picking.isActive > 0.5) {
    if (!picking_isColorValid(inp.pickingColor)) {
      discard;
    }
    return vec4<f32>(inp.pickingColor, 1.0);
  }

  var fragColor = inp.vColor;

  if (picking.isHighlightActive > 0.5) {
    let highlightedObjectColor = picking_normalizeColor(picking.highlightedObjectColor);
    if (picking_isColorZero(abs(inp.pickingColor - highlightedObjectColor))) {
      let highLightAlpha = picking.highlightColor.a;
      let blendedAlpha = highLightAlpha + fragColor.a * (1.0 - highLightAlpha);
      if (blendedAlpha > 0.0) {
        let highLightRatio = highLightAlpha / blendedAlpha;
        fragColor = vec4<f32>(
          mix(fragColor.rgb, picking.highlightColor.rgb, highLightRatio),
          blendedAlpha
        );
      } else {
        fragColor = vec4<f32>(fragColor.rgb, 0.0);
      }
    }
  }

  return deckgl_premultiplied_alpha(fragColor);
}
`}function hM(){return`${Rp()}

struct Attributes {
  @location(0) vertexPositions: vec3<f32>,
  @location(1) vertexPositions64Low: vec3<f32>,
  @location(2) elevations: f32,
  @location(3) fillColors: vec4<f32>,
  @location(4) lineColors: vec4<f32>,
  @location(5) rowIndexes: u32,
};

struct Varyings {
  @builtin(position) position: vec4<f32>,
  @location(0) vColor: vec4<f32>,
  @location(1) pickingColor: vec3<f32>,
  @location(2) clipCoordinates: vec2<f32>,
};

@vertex
fn vertexMain(attributes: Attributes) -> Varyings {
  var outp: Varyings;

  var pos = attributes.vertexPositions;
  if (solidPolygon.extruded > 0.5) {
    pos.z += attributes.elevations * solidPolygon.elevationScale;
  }

  geometry.worldPosition = attributes.vertexPositions;
  geometry.pickingColor = picking_getPickingColorFromIndex(attributes.rowIndexes);

  let projectedPosition = project_position_to_clipspace_and_commonspace(
    pos,
    attributes.vertexPositions64Low,
    vec3<f32>(0.0)
  );
  geometry.position = projectedPosition.commonPosition;
  outp.position = projectedPosition.clipPosition;

  let normal = project_normal(vec3<f32>(0.0, 0.0, 1.0));
  geometry.normal = normal;

  let colors = select(
    attributes.fillColors,
    attributes.lineColors,
    solidPolygon.isWireframe > 0.5
  );
  outp.vColor = apply_polygon_color(colors, normal, geometry.position);
  outp.pickingColor = geometry.pickingColor;

  outp.clipCoordinates = geometry.position.xy;
  clip_filterPosition(&outp.position, geometry.worldPosition.xy);

  return outp;
}

${Op()}
`}function gM(i){return`const RING_WINDING_ORDER_CW: bool = ${i?"true":"false"};

${Rp()}

struct Attributes {
  @location(0) positions: vec2<f32>,
  @location(1) vertexPositions: vec3<f32>,
  @location(2) vertexPositions64Low: vec3<f32>,
  @location(3) nextVertexPositions: vec3<f32>,
  @location(4) nextVertexPositions64Low: vec3<f32>,
  @location(5) vertexValid: f32,
  @location(6) elevations: f32,
  @location(7) fillColors: vec4<f32>,
  @location(8) lineColors: vec4<f32>,
  @location(9) rowIndexes: u32,
};

struct Varyings {
  @builtin(position) position: vec4<f32>,
  @location(0) vColor: vec4<f32>,
  @location(1) pickingColor: vec3<f32>,
  @location(2) clipCoordinates: vec2<f32>,
};

@vertex
fn vertexMain(attributes: Attributes) -> Varyings {
  var outp: Varyings;
  outp.position = vec4<f32>(0.0);
  outp.vColor = vec4<f32>(0.0);
  outp.pickingColor = picking_getPickingColorFromIndex(attributes.rowIndexes);
  outp.clipCoordinates = vec2<f32>(0.0);

  if (attributes.vertexValid < 0.5) {
    return outp;
  }

  let pos = select(attributes.nextVertexPositions, attributes.vertexPositions, RING_WINDING_ORDER_CW);
  let pos64Low = select(
    attributes.nextVertexPositions64Low,
    attributes.vertexPositions64Low,
    RING_WINDING_ORDER_CW
  );
  let nextPos = select(attributes.vertexPositions, attributes.nextVertexPositions, RING_WINDING_ORDER_CW);
  let nextPos64Low = select(
    attributes.vertexPositions64Low,
    attributes.nextVertexPositions64Low,
    RING_WINDING_ORDER_CW
  );

  let position = mix(pos, nextPos, attributes.positions.x);
  let position64Low = mix(pos64Low, nextPos64Low, attributes.positions.x);

  var worldPosition = position;
  if (solidPolygon.extruded > 0.5) {
    worldPosition.z += attributes.elevations * attributes.positions.y * solidPolygon.elevationScale;
  }

  geometry.worldPosition = position;
  geometry.pickingColor = picking_getPickingColorFromIndex(attributes.rowIndexes);

  let projectedPosition = project_position_to_clipspace_and_commonspace(
    worldPosition,
    position64Low,
    vec3<f32>(0.0)
  );
  geometry.position = projectedPosition.commonPosition;
  outp.position = projectedPosition.clipPosition;

  let normal = project_offset_normal(vec3<f32>(
    pos.y - nextPos.y + (pos64Low.y - nextPos64Low.y),
    nextPos.x - pos.x + (nextPos64Low.x - pos64Low.x),
    0.0
  ));
  geometry.normal = normal;

  let colors = select(
    attributes.fillColors,
    attributes.lineColors,
    solidPolygon.isWireframe > 0.5
  );
  outp.vColor = apply_polygon_color(colors, normal, geometry.position);
  outp.pickingColor = geometry.pickingColor;

  outp.clipCoordinates = geometry.position.xy;
  clip_filterPosition(&outp.position, geometry.worldPosition.xy);

  return outp;
}

${Op()}
`}function pM(i,e){return i==="top"?hM():gM(e)}const ir=[0,0,0,255],mM={filled:!0,extruded:!1,wireframe:!1,_normalize:!0,_windingOrder:"CW",_full3d:!1,elevationScale:{type:"number",min:0,value:1},getPolygon:{type:"accessor",value:i=>i.polygon},getElevation:{type:"accessor",value:1e3},getFillColor:{type:"accessor",value:ir},getLineColor:{type:"accessor",value:ir},material:!0},nr={enter:(i,e)=>e.length?e.subarray(e.length-i.length):i};class Zc extends Ge{getShaders(e){const t=!this.props._normalize&&this.props._windingOrder==="CCW"?0:1;return super.getShaders({vs:e==="top"?uM:fM,fs:dM,source:pM(e,!!t),defines:{RING_WINDING_ORDER_CW:t},modules:[_t,Ht,sa,Zt,lM,...this.context.device.type==="webgpu"?[Dc]:[]]})}get wrapLongitude(){return!1}getBounds(){return this.getAttributeManager()?.getBounds(["vertexPositions"])}initializeState(){const{viewport:e}=this.context;let{coordinateSystem:t}=this.props;const{_full3d:n}=this.props;e.isGeospatial&&t==="default"&&(t="lnglat");let s;t==="lnglat"&&(n?s=e.projectPosition.bind(e):s=e.projectFlat.bind(e)),this.setState({numInstances:0,polygonTesselator:new aM({preproject:s,fp64:this.use64bitPositions(),IndexType:Uint32Array})});const r=this.getAttributeManager(),o=!0,a=this.context.device.type==="webgpu";r.add({indices:{size:1,isIndexed:!0,update:this.calculateIndices,noAlloc:o},vertexPositions:{size:3,type:"float64",stepMode:"dynamic",fp64:this.use64bitPositions(),transition:nr,accessor:"getPolygon",update:this.calculatePositions,noAlloc:o,...a?{}:{shaderAttributes:{nextVertexPositions:{vertexOffset:1}}}},...a?{nextVertexPositions:{size:3,type:"float64",stepMode:"dynamic",fp64:this.use64bitPositions(),transition:!1,update:this.calculateNextPositions,noAlloc:o}}:{},[a?"vertexValid":"instanceVertexValid"]:{size:1,type:a?"float32":"uint16",stepMode:"instance",update:this.calculateVertexValid,noAlloc:o},elevations:{size:1,stepMode:"dynamic",transition:nr,accessor:"getElevation",bufferGroup:"solid-polygon-instance-data"},fillColors:{size:this.props.colorFormat.length,type:"unorm8",stepMode:"dynamic",transition:nr,accessor:"getFillColor",defaultValue:ir,bufferGroup:"solid-polygon-instance-data"},lineColors:{size:this.props.colorFormat.length,type:"unorm8",stepMode:"dynamic",transition:nr,accessor:"getLineColor",defaultValue:ir,bufferGroup:"solid-polygon-instance-data"},rowIndexes:{size:1,type:"uint32",stepMode:"dynamic",accessor:(c,{index:l})=>c&&c.__source?c.__source.index:l,bufferGroup:"solid-polygon-instance-data"}})}getPickingInfo(e){const t=super.getPickingInfo(e),{index:n}=t,s=this.props.data;return s[0]&&s[0].__source&&(t.object=s.find(r=>r.__source.index===n)),t}disablePickingIndex(e){const t=this.props.data;if(t[0]&&t[0].__source)for(let n=0;n<t.length;n++)t[n].__source.index===e&&this._disablePickingIndex(n);else super.disablePickingIndex(e)}draw({uniforms:e}){const{extruded:t,filled:n,wireframe:s,elevationScale:r}=this.props,{topModel:o,sideModel:a,wireframeModel:c,polygonTesselator:l}=this.state,u={extruded:!!t,elevationScale:r,isWireframe:!1};c&&s&&(c.setInstanceCount(l.instanceCount-1),c.shaderInputs.setProps({solidPolygon:{...u,isWireframe:!0}}),c.draw(this.context.renderPass)),a&&n&&(a.setInstanceCount(l.instanceCount-1),a.shaderInputs.setProps({solidPolygon:u}),a.draw(this.context.renderPass)),o&&n&&(o.setVertexCount(l.vertexCount),o.shaderInputs.setProps({solidPolygon:u}),o.draw(this.context.renderPass))}updateState(e){super.updateState(e),this.updateGeometry(e);const{props:t,oldProps:n,changeFlags:s}=e,r=this.getAttributeManager();(s.extensionsChanged||t.filled!==n.filled||t.extruded!==n.extruded)&&(this.state.models?.forEach(a=>a.destroy()),this.setState(this._getModels()),r.invalidateAll())}updateGeometry({props:e,oldProps:t,changeFlags:n}){if(n.dataChanged||n.updateTriggersChanged&&(n.updateTriggersChanged.all||n.updateTriggersChanged.getPolygon)){const{polygonTesselator:r}=this.state,o=e.data.attributes||{};r.updateGeometry({data:e.data,normalize:e._normalize,geometryBuffer:o.getPolygon,buffers:this.context.device.type==="webgpu"?{...o}:o,getGeometry:e.getPolygon,positionFormat:e.positionFormat,wrapLongitude:e.wrapLongitude,resolution:this.context.viewport.resolution,fp64:this.use64bitPositions(),dataChanged:n.dataChanged,full3d:e._full3d}),this.setState({numInstances:r.instanceCount,startIndices:r.vertexStarts}),n.dataChanged||this.getAttributeManager().invalidateAll()}}_getModels(){const{id:e,filled:t,extruded:n}=this.props;let s,r,o;if(t){const a=this.getShaders("top");a.defines={...a.defines,NON_INSTANCED_MODEL:1};let c=this.getAttributeManager().getBufferLayouts({isInstanced:!1});this.context.device.type==="webgpu"&&(c=c.filter(l=>l.name!=="indices"&&l.name!=="vertexValid"&&l.name!=="instanceVertexValid"&&l.name!=="nextVertexPositions")),s=new re(this.context.device,{...a,id:`${e}-top`,topology:"triangle-list",bufferLayout:c,isIndexed:!0,userData:{excludeAttributes:{vertexValid:!0,instanceVertexValid:!0,nextVertexPositions:!0}}})}if(n){let a=this.getAttributeManager().getBufferLayouts({isInstanced:!0});this.context.device.type==="webgpu"&&(a=a.filter(c=>c.name!=="indices")),r=new re(this.context.device,{...this.getShaders("side"),id:`${e}-side`,bufferLayout:a,geometry:new ke({topology:"triangle-strip",attributes:{positions:{size:2,value:new Float32Array([1,0,0,0,1,1,0,1])}}}),isInstanced:!0,userData:{excludeAttributes:{indices:!0}}}),o=new re(this.context.device,{...this.getShaders("side"),id:`${e}-wireframe`,bufferLayout:a,geometry:new ke({topology:"line-strip",attributes:{positions:{size:2,value:new Float32Array([1,0,0,0,0,1,1,1])}}}),isInstanced:!0,userData:{excludeAttributes:{indices:!0}}})}return{models:[r,o,s].filter(Boolean),topModel:s,sideModel:r,wireframeModel:o}}calculateIndices(e){const{polygonTesselator:t}=this.state;e.startIndices=t.indexStarts,e.value=t.get("indices")}calculatePositions(e){const{polygonTesselator:t}=this.state;e.startIndices=t.vertexStarts;const n=this.props.data.attributes?.getPolygon;if(this.context.device.type==="webgpu"&&ArrayBuffer.isView(n?.value)){const{value:s,size:r=3,offset:o=0,stride:a}=n,c=o/s.BYTES_PER_ELEMENT,l=a?a/s.BYTES_PER_ELEMENT:r,u=new Float64Array(t.instanceCount*3);for(let f=0;f<t.instanceCount;f++){const d=c+f*l,g=f*3;u[g]=s[d],u[g+1]=s[d+1],u[g+2]=r>2?s[d+2]:0}e.value=u;return}e.value=t.get("positions")}calculateVertexValid(e){const t=this.props.data.attributes?.instanceVertexValid?.value,n=this.context.device.type==="webgpu"&&t?t:this.state.polygonTesselator.get("vertexValid");e.value=this.context.device.type==="webgpu"&&n?Float32Array.from(n):n}calculateNextPositions(e){const{polygonTesselator:t}=this.state,n=this.getAttributeManager().getAttributes(),s=n.vertexPositions.value,r=this.props.data.attributes?.instanceVertexValid?.value||n.vertexValid?.value||t.get("vertexValid");if(e.startIndices=t.vertexStarts,!s){e.value=s;return}const o=s.length/3,a=new s.constructor(s.length);for(let c=0;c<o;c++){const l=c*3,u=r?.[c]&&c+1<o?l+3:l;for(let f=0;f<3;f++)a[l+f]=s[u+f]}e.value=a}}Zc.defaultProps=mM,Zc.layerName="SolidPolygonLayer";function yM({data:i,getIndex:e,dataRange:t,replace:n}){const{startRow:s=0,endRow:r=1/0}=t,o=i.length;let a=o,c=o;for(let d=0;d<o;d++){const g=e(i[d]);if(a>d&&g>=s&&(a=d),g>=r){c=d;break}}let l=a;const f=c-a!==n.length?i.slice(c):void 0;for(let d=0;d<n.length;d++)i[l++]=n[d];if(f){for(let d=0;d<f.length;d++)i[l++]=f[d];i.length=l}return{startRow:a,endRow:a+n.length}}function bM(i,e){if(!i)return null;const t="startIndices"in i?i.startIndices[e]:e,n=i.featureIds.value[t];return t!==-1?_M(i,n,t):null}function _M(i,e,t){const n={properties:{...i.properties[e]}};for(const s in i.numericProps)n.properties[s]=i.numericProps[s].value[t];return n}function vM(i){const e={points:null,lines:null,polygons:null};for(const t in e){const n=i[t].globalFeatureIds.value;e[t]=new Uint32Array(n)}return e}const Bp=`layout(std140) uniform sdfUniforms {
  float gamma;
  bool enabled;
  float buffer;
  float outlineBuffer;
  vec4 outlineColor;
} sdf;
`,xM={name:"sdf",vs:Bp,fs:Bp,uniformTypes:{gamma:"f32",enabled:"f32",buffer:"f32",outlineBuffer:"f32",outlineColor:"vec4<f32>"}},ln={none:0,start:1,center:2,end:3},kp={name:"text",vs:`layout(std140) uniform textUniforms {
  highp vec2 cutoffPixels;
  highp ivec2 align;
  highp float fontSize;
  bool flipY;
} text;

#define ALIGN_MODE_START ${ln.start}
#define ALIGN_MODE_CENTER ${ln.center}
#define ALIGN_MODE_END ${ln.end}
`,getUniforms:({contentCutoffPixels:i=[0,0],contentAlignHorizontal:e="none",contentAlignVertical:t="none",fontSize:n,viewport:s})=>({cutoffPixels:i,align:[ln[e],ln[t]],fontSize:n,flipY:s?.flipY??!1}),uniformTypes:{cutoffPixels:"vec2<f32>",align:"vec2<i32>",fontSize:"f32",flipY:"f32"}},wM=`#version 300 es
#define SHADER_NAME multi-icon-layer-vertex-shader
in vec2 positions;
in vec3 instancePositions;
in vec3 instancePositions64Low;
in float instanceSizes;
in float instanceAngles;
in vec4 instanceColors;
in float rowIndexes;
in vec4 instanceIconFrames;
in float instanceColorModes;
in vec2 instanceOffsets;
in vec2 instancePixelOffset;
in vec4 instanceClipRect;
out float vColorMode;
out vec4 vColor;
out vec2 vTextureCoords;
out vec2 uv;
vec2 rotate_by_angle(vec2 vertex, float angle) {
float angle_radian = angle * PI / 180.0;
float cos_angle = cos(angle_radian);
float sin_angle = sin(angle_radian);
mat2 rotationMatrix = mat2(cos_angle, -sin_angle, sin_angle, cos_angle);
return rotationMatrix * vertex;
}
float getPixelOffsetFromAlignment(float anchor, float extent, float clipStart, float clipEnd, int mode) {
if (clipEnd < clipStart) return 0.0;
if (mode == ALIGN_MODE_START) {
return max(- (anchor + clipStart), 0.0);
}
if (mode == ALIGN_MODE_CENTER) {
float _min = max(0., anchor + clipStart);
float _max = min(extent, anchor + clipEnd);
return _min < _max ? (_min + _max) / 2.0 - anchor : 0.0;
}
if (mode == ALIGN_MODE_END) {
return min(extent - (anchor + clipEnd), 0.);
}
return 0.0;
}
void main(void) {
geometry.worldPosition = instancePositions;
geometry.uv = positions;
geometry.pickingColor = picking_getPickingColorFromIndex(rowIndexes);
uv = positions;
vec2 iconSize = instanceIconFrames.zw;
float sizePixels = clamp(
project_size_to_pixel(instanceSizes * icon.sizeScale, icon.sizeUnits),
icon.sizeMinPixels, icon.sizeMaxPixels
);
float instanceScale = sizePixels / text.fontSize;
vec2 pixelOffset = positions / 2.0 * iconSize + instanceOffsets;
pixelOffset = rotate_by_angle(pixelOffset, instanceAngles) * instanceScale;
pixelOffset += instancePixelOffset;
pixelOffset.y *= -1.0;
vec2 anchorPosScreen;
if (icon.billboard)  {
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0), geometry.position);
anchorPosScreen = gl_Position.xy / gl_Position.w;
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
vec3 offset = vec3(pixelOffset, 0.0);
DECKGL_FILTER_SIZE(offset, geometry);
gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);
} else {
vec3 offset_common = vec3(project_pixel_size(pixelOffset), 0.0);
if (text.flipY) {
offset_common.y *= -1.;
}
DECKGL_FILTER_SIZE(offset_common, geometry);
vec4 anchorPos = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0));
anchorPosScreen = anchorPos.xy / anchorPos.w;
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset_common, geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
}
anchorPosScreen = vec2(anchorPosScreen.x + 1.0, 1.0 - anchorPosScreen.y) / 2.0 * project.viewportSize / project.devicePixelRatio;
vec2 xy = project_size_to_pixel(instanceClipRect.xy);
vec2 wh = project_size_to_pixel(instanceClipRect.zw);
if (text.flipY) {
xy.y = -xy.y - wh.y;
}
if (text.align.x > 0 || text.align.y > 0) {
vec2 viewportPixels = project.viewportSize / project.devicePixelRatio;
vec2 scrollPixels = vec2(
getPixelOffsetFromAlignment(anchorPosScreen.x, viewportPixels.x, xy.x, xy.x + wh.x, text.align.x),
-getPixelOffsetFromAlignment(anchorPosScreen.y, viewportPixels.y, -xy.y - wh.y, -xy.y, text.align.y)
);
pixelOffset += scrollPixels;
gl_Position.xy += project_pixel_size_to_clipspace(scrollPixels);
}
if (instanceClipRect.z >= 0.) {
if (pixelOffset.x < xy.x || pixelOffset.x > xy.x + wh.x) {
gl_Position = vec4(0.0);
}
else if (text.cutoffPixels.x > 0.) {
float vpWidth = project.viewportSize.x / project.devicePixelRatio;
float l = max(anchorPosScreen.x + xy.x, 0.0);
float r = min(anchorPosScreen.x + xy.x + wh.x, vpWidth);
if (r - l < text.cutoffPixels.x) {
gl_Position = vec4(0.0);
}
}
}
if (instanceClipRect.w >= 0.) {
if (pixelOffset.y < xy.y || pixelOffset.y > xy.y + wh.y) {
gl_Position = vec4(0.0);
}
else if (text.cutoffPixels.y > 0.) {
float vpHeight = project.viewportSize.y / project.devicePixelRatio;
float t = max(anchorPosScreen.y - xy.y - wh.y, 0.0);
float b = min(anchorPosScreen.y - xy.y, vpHeight);
if (b - t < text.cutoffPixels.y) {
gl_Position = vec4(0.0);
}
}
}
vTextureCoords = mix(
instanceIconFrames.xy,
instanceIconFrames.xy + iconSize,
(positions.xy + 1.0) / 2.0
) / icon.iconsTextureDim;
vColor = instanceColors;
DECKGL_FILTER_COLOR(vColor, geometry);
vColorMode = instanceColorModes;
}
`,PM=`#version 300 es
#define SHADER_NAME multi-icon-layer-fragment-shader
precision highp float;
uniform sampler2D iconsTexture;
in vec4 vColor;
in vec2 vTextureCoords;
in vec2 uv;
out vec4 fragColor;
void main(void) {
geometry.uv = uv;
if (!bool(picking.isActive)) {
float alpha = texture(iconsTexture, vTextureCoords).a;
vec4 color = vColor;
if (sdf.enabled) {
float distance = alpha;
alpha = smoothstep(sdf.buffer - sdf.gamma, sdf.buffer + sdf.gamma, distance);
if (sdf.outlineBuffer > 0.0) {
float inFill = alpha;
float inBorder = smoothstep(sdf.outlineBuffer - sdf.gamma, sdf.outlineBuffer + sdf.gamma, distance);
color = mix(sdf.outlineColor, vColor, inFill);
alpha = inBorder;
}
}
float a = alpha * color.a;
if (a < icon.alphaCutoff) {
discard;
}
fragColor = vec4(color.rgb, a * layer.opacity);
}
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`;function SM({collision:i=!1}={}){return`struct IconUniforms {
  sizeScale: f32,
  iconsTextureDim: vec2<f32>,
  sizeBasis: f32,
  sizeMinPixels: f32,
  sizeMaxPixels: f32,
  billboard: i32,
  sizeUnits: i32,
  alphaCutoff: f32
};

struct TextUniforms {
  cutoffPixels: vec2<f32>,
  align: vec2<i32>,
  fontSize: f32,
  flipY: f32
};

struct SdfUniforms {
  gamma: f32,
  enabled: f32,
  buffer: f32,
  outlineBuffer: f32,
  outlineColor: vec4<f32>
};

${i?`struct CollisionUniforms {
  sort: i32,
  enabled: i32
};
`:""}

const ALIGN_MODE_START: i32 = 1;
const ALIGN_MODE_CENTER: i32 = 2;
const ALIGN_MODE_END: i32 = 3;

@group(0) @binding(auto) var<uniform> icon: IconUniforms;
@group(0) @binding(auto) var<uniform> text: TextUniforms;
@group(0) @binding(auto) var<uniform> sdf: SdfUniforms;
${i?"@group(0) @binding(auto) var<uniform> collision: CollisionUniforms;":""}
@group(0) @binding(auto) var iconsTexture : texture_2d<f32>;
@group(0) @binding(auto) var iconsTextureSampler : sampler;
${i?`@group(0) @binding(auto) var collision_texture : texture_2d<f32>;
`:""}

fn rotate_by_angle(vertex: vec2<f32>, angle_deg: f32) -> vec2<f32> {
  let angle_radian = angle_deg * PI / 180.0;
  let c = cos(angle_radian);
  let s = sin(angle_radian);
  let rotation = mat2x2<f32>(vec2<f32>(c, -s), vec2<f32>(s, c));
  return rotation * vertex;
}

fn get_pixel_offset_from_alignment(
  anchor: f32,
  extent: f32,
  clipStart: f32,
  clipEnd: f32,
  mode: i32
) -> f32 {
  if (clipEnd < clipStart) {
    return 0.0;
  }
  if (mode == ALIGN_MODE_START) {
    return max(-(anchor + clipStart), 0.0);
  }
  if (mode == ALIGN_MODE_CENTER) {
    let minValue = max(0.0, anchor + clipStart);
    let maxValue = min(extent, anchor + clipEnd);
    if (minValue < maxValue) {
      return (minValue + maxValue) / 2.0 - anchor;
    }
    return 0.0;
  }
  if (mode == ALIGN_MODE_END) {
    return min(extent - (anchor + clipEnd), 0.0);
  }
  return 0.0;
}

${i?`fn collision_match(texCoords: vec2<f32>, pickingColor: vec3<f32>) -> f32 {
  let textureSize = vec2<i32>(textureDimensions(collision_texture));
  let pixelCoords = clamp(
    vec2<i32>(texCoords * vec2<f32>(textureSize)),
    vec2<i32>(0),
    textureSize - vec2<i32>(1)
  );
  let collisionPickingColor = textureLoad(collision_texture, pixelCoords, 0);
  let delta = dot(abs(collisionPickingColor.rgb - pickingColor), vec3<f32>(1.0));
  return step(delta, 0.001);
}

fn collision_is_visible(texCoords: vec2<f32>, pickingColor: vec3<f32>) -> f32 {
  if (collision.enabled == 0) {
    return 1.0;
  }

  var accumulator = 0.0;
  let stepSize = vec2<f32>(1.0) / project.viewportSize;

  for (var i: i32 = -2; i <= 2; i = i + 1) {
    for (var j: i32 = -2; j <= 2; j = j + 1) {
      let delta = vec2<f32>(f32(j), f32(i)) * stepSize;
      accumulator = accumulator + collision_match(texCoords + delta, pickingColor);
    }
  }

  return pow(accumulator / 25.0, 2.2);
}
`:""}

struct Attributes {
  @location(0) positions: vec2<f32>,

  @location(1) instancePositions: vec3<f32>,
  @location(2) instancePositions64Low: vec3<f32>,
  @location(3) instanceSizes: f32,
  @location(4) instanceAngles: f32,
  @location(5) instanceColors: vec4<f32>,
  @location(6) instanceIconFrames: vec4<f32>,
  @location(7) instanceColorModes: f32,
  @location(8) instanceOffsets: vec2<f32>,
  @location(9) instancePixelOffset: vec2<f32>,
  @location(10) rowIndexes: u32,
  @location(11) instanceClipRect: vec4<f32>,
  ${i?"@location(12) collisionPriorities: f32,":""}
};

struct Varyings {
  @builtin(position) position: vec4<f32>,

  @location(0) vColorMode: f32,
  @location(1) vColor: vec4<f32>,
  @location(2) vTextureCoords: vec2<f32>,
  @location(3) uv: vec2<f32>,
  @location(4) pickingColor: vec3<f32>,
};

@vertex
fn vertexMain(inp: Attributes) -> Varyings {
  geometry.worldPosition = inp.instancePositions;
  geometry.uv = inp.positions;
  geometry.pickingColor = picking_getPickingColorFromIndex(inp.rowIndexes);

  var outp: Varyings;
  outp.uv = inp.positions;

  let iconSize = inp.instanceIconFrames.zw;

  let sizePixels = clamp(
    project_unit_size_to_pixel(inp.instanceSizes * icon.sizeScale, icon.sizeUnits),
    icon.sizeMinPixels, icon.sizeMaxPixels
  );
  let instanceScale = sizePixels / text.fontSize;

  var pixelOffset = inp.positions / 2.0 * iconSize + inp.instanceOffsets;
  pixelOffset = rotate_by_angle(pixelOffset, inp.instanceAngles) * instanceScale;
  pixelOffset = pixelOffset + inp.instancePixelOffset;
  pixelOffset.y = pixelOffset.y * -1.0;

  var pos: vec4<f32>;
  var anchorPosScreen: vec2<f32>;
  if (icon.billboard != 0) {
    pos = project_position_to_clipspace(inp.instancePositions, inp.instancePositions64Low, vec3<f32>(0.0));
    anchorPosScreen = pos.xy / pos.w;

    let clipOffset = project_pixel_size_to_clipspace(pixelOffset);
    pos = vec4<f32>(pos.x + clipOffset.x, pos.y + clipOffset.y, pos.z, pos.w);
  } else {
    var offsetCommon = vec3<f32>(project_pixel_size_vec2(pixelOffset), 0.0);
    if (text.flipY > 0.5) {
      offsetCommon.y = offsetCommon.y * -1.0;
    }
    let anchorPos = project_position_to_clipspace(inp.instancePositions, inp.instancePositions64Low, vec3<f32>(0.0));
    anchorPosScreen = anchorPos.xy / anchorPos.w;
    pos = project_position_to_clipspace(inp.instancePositions, inp.instancePositions64Low, offsetCommon);
  }

  anchorPosScreen = vec2<f32>(anchorPosScreen.x + 1.0, 1.0 - anchorPosScreen.y) / 2.0 *
    project.viewportSize / project.devicePixelRatio;
  var xy = project_size_vec2(inp.instanceClipRect.xy) * project.scale;
  var wh = project_size_vec2(inp.instanceClipRect.zw) * project.scale;

  if (text.flipY > 0.5) {
    xy.y = -xy.y - wh.y;
  }
  if (text.align.x > 0 || text.align.y > 0) {
    let viewportPixels = project.viewportSize / project.devicePixelRatio;
    let scrollPixels = vec2<f32>(
      get_pixel_offset_from_alignment(anchorPosScreen.x, viewportPixels.x, xy.x, xy.x + wh.x, text.align.x),
      -get_pixel_offset_from_alignment(anchorPosScreen.y, viewportPixels.y, -xy.y - wh.y, -xy.y, text.align.y)
    );
    pixelOffset = pixelOffset + scrollPixels;
    let scrollClipOffset = project_pixel_size_to_clipspace(scrollPixels);
    pos.x = pos.x + scrollClipOffset.x;
    pos.y = pos.y + scrollClipOffset.y;
  }

  if (inp.instanceClipRect.z >= 0.0) {
    if (pixelOffset.x < xy.x || pixelOffset.x > xy.x + wh.x) {
      pos = vec4<f32>(0.0);
    } else if (text.cutoffPixels.x > 0.0) {
      let viewportWidth = project.viewportSize.x / project.devicePixelRatio;
      let left = max(anchorPosScreen.x + xy.x, 0.0);
      let right = min(anchorPosScreen.x + xy.x + wh.x, viewportWidth);
      if (right - left < text.cutoffPixels.x) {
        pos = vec4<f32>(0.0);
      }
    }
  }
  if (inp.instanceClipRect.w >= 0.0) {
    if (pixelOffset.y < xy.y || pixelOffset.y > xy.y + wh.y) {
      pos = vec4<f32>(0.0);
    } else if (text.cutoffPixels.y > 0.0) {
      let viewportHeight = project.viewportSize.y / project.devicePixelRatio;
      let top = max(anchorPosScreen.y - xy.y - wh.y, 0.0);
      let bottom = min(anchorPosScreen.y - xy.y, viewportHeight);
      if (bottom - top < text.cutoffPixels.y) {
        pos = vec4<f32>(0.0);
      }
    }
  }

  ${i?`  if (collision.sort != 0) {
    pos.z = -0.001 * inp.collisionPriorities * pos.w;
  }
  `:""}

  let uvMix = (inp.positions.xy + vec2<f32>(1.0, 1.0)) * 0.5;
  outp.vTextureCoords = mix(inp.instanceIconFrames.xy, inp.instanceIconFrames.xy + iconSize, uvMix) / icon.iconsTextureDim;

  outp.position = pos;
  outp.vColor = inp.instanceColors;
  outp.vColorMode = inp.instanceColorModes;
  outp.pickingColor = picking_getPickingColorFromIndex(inp.rowIndexes);

  return outp;
}

@fragment
fn fragmentMain(inp: Varyings) -> @location(0) vec4<f32> {
  geometry.uv = inp.uv;

  let texColor = textureSample(iconsTexture, iconsTextureSampler, inp.vTextureCoords);
  var alpha = texColor.a;
  var color = inp.vColor;

  if (sdf.enabled > 0.5) {
    let distance = alpha;
    alpha = smoothstep(sdf.buffer - sdf.gamma, sdf.buffer + sdf.gamma, distance);

    if (sdf.outlineBuffer > 0.0) {
      let inFill = alpha;
      let inBorder = smoothstep(sdf.outlineBuffer - sdf.gamma, sdf.outlineBuffer + sdf.gamma, distance);
      color = mix(sdf.outlineColor, inp.vColor, inFill);
      alpha = inBorder;
    }
  } else if (inp.vColorMode == 0.0) {
    color = texColor;
  }

  var a = alpha * color.a * layer.opacity;
  if (a < icon.alphaCutoff) {
    discard;
  }

  if (picking.isActive > 0.5) {
    if (!picking_isColorValid(inp.pickingColor)) {
      discard;
    }
    return vec4<f32>(inp.pickingColor, 1.0);
  }

  ${i?`  let collisionFade = collision_is_visible(inp.position.xy / project.viewportSize, inp.pickingColor);
  a = a * collisionFade;
  if (a <= 0.0001) {
    discard;
  }
  `:""}

  var fragColor = deckgl_premultiplied_alpha(vec4<f32>(color.rgb, a));

  if (picking.isHighlightActive > 0.5) {
    let highlightedObjectColor = picking_normalizeColor(picking.highlightedObjectColor);
    if (picking_isColorZero(abs(inp.pickingColor - highlightedObjectColor))) {
      let highLightAlpha = picking.highlightColor.a;
      let blendedAlpha = highLightAlpha + fragColor.a * (1.0 - highLightAlpha);
      if (blendedAlpha > 0.0) {
        let highLightRatio = highLightAlpha / blendedAlpha;
        fragColor = vec4<f32>(
          mix(fragColor.rgb, picking.highlightColor.rgb, highLightRatio),
          blendedAlpha
        );
      } else {
        fragColor = vec4<f32>(fragColor.rgb, 0.0);
      }
    }
  }

  return fragColor;
}
`}const EM=SM(),Kc=192/256,CM={getIconOffsets:{type:"accessor",value:i=>i.offsets},getContentBox:{type:"accessor",value:[0,0,-1,-1]},fontSize:1,alphaCutoff:.001,smoothing:.1,outlineWidth:0,outlineColor:{type:"color",value:[0,0,0,255]},contentCutoffPixels:{type:"array",value:[0,0]},contentAlignHorizontal:"none",contentAlignVertical:"none"};class Qc extends Hs{getShaders(){const e=super.getShaders();return{...e,modules:[...e.modules,kp,xM],vs:wM,fs:PM,source:EM}}initializeState(){super.initializeState();const e=this.getAttributeManager(),t=e.attributes.instanceIconDefs;t.settings.update=this.calculateInstanceIconDefs,e.addInstanced({rowIndexes:{type:"uint32",size:1,bufferGroup:"icon-instance-data",accessor:(n,{index:s})=>s},instanceClipRect:{size:4,bufferGroup:"icon-instance-data",accessor:"getContentBox",defaultValue:[0,0,-1,-1]}})}updateState(e){super.updateState(e);const{props:t,oldProps:n,changeFlags:s}=e,{outlineColor:r}=t;if(s.extensionsChanged){this.state.fillModel?.destroy();const o=this.context.device.type==="webgpu"?this._getModel(`${this.props.id}-fill`):void 0;this.setState({fillModel:o,models:o?[this.state.model,o]:[this.state.model]})}if(s.updateTriggersChanged&&(s.updateTriggersChanged.getIcon||s.updateTriggersChanged.getIconOffsets)&&this.getAttributeManager().invalidate("instanceIconDefs"),r!==n.outlineColor){const o=[r[0]/255,r[1]/255,r[2]/255,(r[3]??255)/255];this.setState({outlineColor:o})}!t.sdf&&t.outlineWidth&&D.warn(`${this.id}: fontSettings.sdf is required to render outline`)()}draw(e){const{sdf:t,smoothing:n,fontSize:s,outlineWidth:r,contentCutoffPixels:o,contentAlignHorizontal:a,contentAlignVertical:c}=this.props,{outlineColor:l}=this.state,u=r?Math.max(n,Kc*(1-r)):-1,f=this.state.model,d={buffer:Kc,outlineBuffer:u,gamma:n,enabled:!!t,outlineColor:l},g={contentCutoffPixels:o,contentAlignHorizontal:a,contentAlignVertical:c,fontSize:s,viewport:this.context.viewport};if(f.shaderInputs.setProps({sdf:d,text:g}),super.draw(e),t&&r){const{iconManager:p}=this.state;if(p.getTexture()){const y=this.state.fillModel||f;y.shaderInputs.setProps({sdf:{...d,outlineBuffer:Kc},text:g}),this._drawModel(y)}}}calculateInstanceIconDefs(e,{startRow:t,endRow:n}){const{data:s,getIcon:r,getIconOffsets:o}=this.props;let a=e.getVertexOffset(t);const c=e.value,{iterable:l,objectInfo:u}=ci(s,t,n);for(const f of l){u.index++;const d=r(f,u),g=o(f,u);if(d){let p=0;for(const m of Array.from(d)){const y=super.getInstanceIconDef(m);y[0]=g[p*2],y[1]+=g[p*2+1],y[6]=1,c.set(y,a),a+=e.size,p++}}}}}Qc.defaultProps=CM,Qc.layerName="MultiIconLayer";const un=1e20,Jc=new Float64Array(256);for(let i=0;i<256;i++){const e=.5-Math.pow(i/255,.45454545454545453);Jc[i]=e*Math.abs(e)}Jc[255]=-un;class LM{constructor({fontSize:e=24,buffer:t=3,radius:n=8,cutoff:s=.25,fontFamily:r="sans-serif",fontWeight:o="normal",fontStyle:a="normal",lang:c=null}={}){this.buffer=t,this.radius=n,this.cutoff=s,this.lang=c;const l=this.size=e+t*4,u=this._createCanvas(l),f=this.ctx=u.getContext("2d",{willReadFrequently:!0});f.font=`${a} ${o} ${e}px ${r}`,f.textBaseline="alphabetic",f.textAlign="left",f.fillStyle="black",this.gridOuter=new Float64Array(l*l),this.gridInner=new Float64Array(l*l),this.f=new Float64Array(l),this.z=new Float64Array(l+1),this.v=new Uint16Array(l)}_createCanvas(e){if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(e,e);const t=document.createElement("canvas");return t.width=t.height=e,t}draw(e){const{width:t,actualBoundingBoxAscent:n,actualBoundingBoxDescent:s,actualBoundingBoxLeft:r,actualBoundingBoxRight:o}=this.ctx.measureText(e),a=Math.ceil(n),c=Math.floor(-r),l=Math.max(0,Math.min(this.size-this.buffer,Math.ceil(o)-c)),u=Math.max(0,Math.min(this.size-this.buffer,a+Math.ceil(s))),f=l+2*this.buffer,d=u+2*this.buffer,g=Math.max(f*d,0),p=new Uint8ClampedArray(g),m={data:p,width:f,height:d,glyphWidth:l,glyphHeight:u,glyphTop:a,glyphLeft:c,glyphAdvance:t};if(l===0||u===0)return m;const{ctx:y,buffer:_,gridInner:v,gridOuter:b}=this;this.lang&&(y.lang=this.lang),y.clearRect(_,_,l,u),y.fillText(e,_-c,_+a);const x=y.getImageData(_,_,l,u);b.fill(un,0,g),v.fill(0,0,g);let w=3;for(let T=0;T<u;T++){let C=(T+_)*f+_;for(let O=0;O<l;O++,w+=4,C++){const M=x.data[w];if(M===0)continue;const A=Jc[M];b[C]=Math.max(0,A),v[C]=Math.max(0,-A)}}Dp(b,0,0,f,d,f,this.f,this.v,this.z);const P=Math.min(_,1);Dp(v,_-P,_-P,l+2*P,u+2*P,f,this.f,this.v,this.z);const L=255/this.radius,E=255*(1-this.cutoff);for(let T=0;T<g;T++){const C=Math.sqrt(b[T])-Math.sqrt(v[T]);p[T]=Math.round(E-L*C)}return m}}function Dp(i,e,t,n,s,r,o,a,c){for(let l=e;l<e+n;l++)Fp(i,t*r+l,r,s,o,a,c);for(let l=t;l<t+s;l++)Fp(i,l*r+e,1,n,o,a,c)}function Fp(i,e,t,n,s,r,o){r[0]=0,o[0]=-un,o[1]=un,s[0]=i[e];for(let a=1,c=0,l=0;a<n;a++){s[a]=i[e+a*t];const u=a*a;do{const f=r[c];l=(s[a]-s[f]+u-f*f)/(a-f)/2}while(l<=o[c]&&--c>-1);c++,r[c]=a,o[c]=l,o[c+1]=un}for(let a=0,c=0;a<n;a++){for(;o[c+1]<a;)c++;const l=r[c],u=a-l;i[e+a*t]=s[l]+u*u}}const TM=32,AM=[];function IM(i){return Math.pow(2,Math.ceil(Math.log2(i)))}function MM({characterSet:i,measureText:e,buffer:t,maxCanvasWidth:n,mapping:s={},xOffset:r=0,yOffsetMin:o=0,yOffsetMax:a=0}){let c=r,l=o,u=a;for(const f of i)if(!s[f]){const{advance:d,width:g,ascent:p,descent:m}=e(f),y=p+m;c+g+t*2>n&&(c=0,l=u),s[f]={x:c+t,y:l+t,width:g,height:y,advance:d,anchorX:g/2,anchorY:p},c+=g+t*2,u=Math.max(u,l+y+t*2)}return{mapping:s,xOffset:c,yOffsetMin:l,yOffsetMax:u,canvasHeight:IM(u)}}function Np(i,e,t,n){let s=0;for(let r=e;r<t;r++){const o=i[r];s+=n[o]?.advance||0}return s}function zp(i,e,t,n,s,r){let o=e,a=0;for(let c=e;c<t;c++){const l=Np(i,c,c+1,s);a+l>n&&(o<c&&r.push(c),o=c,a=0),a+=l}return a}function RM(i,e,t,n,s,r){let o=e,a=e,c=e,l=0;for(let u=e;u<t;u++)if((i[u]===" "||i[u+1]===" "||u+1===t)&&(c=u+1),c>a){let f=Np(i,a,c,s);l+f>n&&(o<a&&(r.push(a),o=a,l=0),f>n&&(f=zp(i,a,c,n,s,r),o=r[r.length-1])),a=c,l+=f}return l}function OM(i,e,t,n,s=0,r){r===void 0&&(r=i.length);const o=[];return e==="break-all"?zp(i,s,r,t,n,o):RM(i,s,r,t,n,o),o}function BM(i,e,t,n,s,r){let o=0,a=0;for(let c=e;c<t;c++){const l=i[c],u=n[l];u&&(a=Math.max(a,u.height))}for(let c=e;c<t;c++){const l=i[c],u=n[l];u?(s[c]=o+u.anchorX,o+=u.advance):(D.warn(`Missing character: ${l} (${l.codePointAt(0)})`)(),s[c]=o,o+=TM)}r[0]=o,r[1]=a}function kM(i,e,t,n,s,r){const o=Array.from(i),a=o.length,c=new Array(a),l=new Array(a),u=new Array(a),f=(n==="break-word"||n==="break-all")&&isFinite(s)&&s>0,d=[0,0],g=[0,0];let p=0,m=e+t/2,y=0,_=0;for(let v=0;v<=a;v++){const b=o[v];if((b===`
`||v===a)&&(_=v),_>y){const x=f?OM(o,n,s,r,y,_):AM;for(let w=0;w<=x.length;w++){const P=w===0?y:x[w-1],L=w<x.length?x[w]:_;BM(o,P,L,r,c,g);for(let E=P;E<L;E++)l[E]=m,u[E]=g[0];p++,m+=t,d[0]=Math.max(d[0],g[0])}y=_}b===`
`&&(c[y]=0,l[y]=0,u[y]=0,y++)}return d[1]=p*t,{x:c,y:l,rowWidth:u,size:d}}function DM({value:i,length:e,stride:t,offset:n,startIndices:s,characterSet:r}){const o=i.BYTES_PER_ELEMENT,a=t?t/o:1,c=n?n/o:0,l=s[e]||Math.ceil((i.length-c)/a),u=r&&new Set,f=new Array(e);let d=i;if(a>1||c>0){const g=i.constructor;d=new g(l);for(let p=0;p<l;p++)d[p]=i[p*a+c]}for(let g=0;g<e;g++){const p=s[g],m=s[g+1]||l,y=d.subarray(p,m);f[g]=String.fromCodePoint.apply(null,y),u&&y.forEach(u.add,u)}if(u)for(const g of u)r.add(String.fromCodePoint(g));return{texts:f,characterCount:l}}class Up{constructor(e=5){this._cache={},this._order=[],this.limit=e}get(e){const t=this._cache[e];return t&&(this._deleteOrder(e),this._appendOrder(e)),t}set(e,t){this._cache[e]?(this.delete(e),this._cache[e]=t,this._appendOrder(e)):(Object.keys(this._cache).length===this.limit&&this.delete(this._order[0]),this._cache[e]=t,this._appendOrder(e))}delete(e){this._cache[e]&&(delete this._cache[e],this._deleteOrder(e))}_deleteOrder(e){const t=this._order.indexOf(e);t>=0&&this._order.splice(t,1)}_appendOrder(e){this._order.push(e)}}function FM(){const i=[];for(let e=32;e<128;e++)i.push(String.fromCharCode(e));return i}const fi={fontFamily:"Monaco, monospace",fontWeight:"normal",characterSet:FM(),fontSize:64,buffer:4,sdf:!1,cutoff:.25,radius:12,smoothing:.1},$p=1024,Gp=.9,Vp=.3,jp=3;let sr=new Up(jp);function NM(i,e){let t;typeof e=="string"?t=new Set(Array.from(e)):t=new Set(e);const n=sr.get(i);if(!n)return t;for(const s in n.mapping)t.has(s)&&t.delete(s);return t}function zM(i,e){for(let t=0;t<i.length;t++)e.data[4*t+3]=i[t]}function Wp(i,e,t,n){i.font=`${n} ${t}px ${e}`,i.fillStyle="#000",i.textBaseline="alphabetic",i.textAlign="left"}function UM(i,e,t){if(t===void 0){const s=i.measureText("A");return s.fontBoundingBoxAscent?{advance:0,width:0,ascent:Math.ceil(s.fontBoundingBoxAscent),descent:Math.ceil(s.fontBoundingBoxDescent)}:{advance:0,width:0,ascent:e*Gp,descent:e*Vp}}const n=i.measureText(t);return n.actualBoundingBoxAscent?{advance:n.width,width:Math.ceil(n.actualBoundingBoxRight-n.actualBoundingBoxLeft),ascent:Math.ceil(n.actualBoundingBoxAscent),descent:Math.ceil(n.actualBoundingBoxDescent)}:{advance:n.width,width:n.width,ascent:e*Gp,descent:e*Vp}}function $M(i){D.assert(Number.isFinite(i)&&i>=jp,"Invalid cache limit"),sr=new Up(i)}class GM{constructor(){this.props={...fi}}get atlas(){return this._atlas}get mapping(){return this._atlas&&this._atlas.mapping}setProps(e={}){Object.assign(this.props,e),e._getFontRenderer&&(this._getFontRenderer=e._getFontRenderer),this._key=this._getKey();const t=NM(this._key,this.props.characterSet),n=sr.get(this._key);if(n&&t.size===0){this._atlas!==n&&(this._atlas=n);return}const s=this._generateFontAtlas(t,n);this._atlas=s,sr.set(this._key,s)}_generateFontAtlas(e,t){const{fontFamily:n,fontWeight:s,fontSize:r,buffer:o,sdf:a,radius:c,cutoff:l}=this.props;let u=t&&t.data;u||(u=document.createElement("canvas"),u.width=$p);const f=u.getContext("2d",{willReadFrequently:!0});Wp(f,n,r,s);const d=x=>UM(f,r,x);let g;this._getFontRenderer?g=this._getFontRenderer(this.props):a&&(g={measure:d,draw:VM(this.props)});const{mapping:p,canvasHeight:m,xOffset:y,yOffsetMin:_,yOffsetMax:v}=MM({measureText:x=>g?g.measure(x):d(x),buffer:o,characterSet:e,maxCanvasWidth:$p,...t&&{mapping:t.mapping,xOffset:t.xOffset,yOffsetMin:t.yOffsetMin,yOffsetMax:t.yOffsetMax}});if(u.height!==m){const x=u.height>0?f.getImageData(0,0,u.width,u.height):null;u.height=m,x&&f.putImageData(x,0,0)}if(Wp(f,n,r,s),g)for(const x of e){const w=p[x],P=w.width,{data:L,left:E=0,top:T=0}=g.draw(x),C=w.x-E,O=w.y-T,M=Math.max(0,Math.round(C)),A=Math.max(0,Math.round(O)),R=Math.min(L.width,u.width-M),Z=Math.min(L.height,u.height-A);f.putImageData(L,M,A,0,0,R,Z),w.x=M,w.y=A,w.width=R,w.height=Z,w.anchorX+=R/2-E-P/2,w.anchorY+=T}else for(const x of e){const w=p[x];f.fillText(x,w.x,w.y+w.anchorY)}const b=g?g.measure():d();return{baselineOffset:(b.ascent-b.descent)/2,xOffset:y,yOffsetMin:_,yOffsetMax:v,mapping:p,data:u,width:u.width,height:u.height}}_getKey(){const{fontFamily:e,fontWeight:t,fontSize:n,buffer:s,sdf:r,radius:o,cutoff:a}=this.props;return r?`${e} ${t} ${n} ${s} ${o} ${a}`:`${e} ${t} ${n} ${s}`}}function VM({fontSize:i,buffer:e,radius:t,cutoff:n,fontFamily:s,fontWeight:r}){const o=new LM({fontSize:i,buffer:e,radius:t,cutoff:n,fontFamily:s,fontWeight:`${r}`});return a=>{const{data:c,width:l,height:u}=o.draw(a),f=new ImageData(l,u);return zM(c,f),{data:f,left:e,top:e}}}const jM=`struct TextBackgroundUniforms {
  billboard: f32,
  sizeScale: f32,
  sizeMinPixels: f32,
  sizeMaxPixels: f32,
  borderRadius: vec4<f32>,
  padding: vec4<f32>,
  sizeUnits: i32,
  stroked: f32,
};

@group(0) @binding(auto) var<uniform> textBackground: TextBackgroundUniforms;
`,Hp=`layout(std140) uniform textBackgroundUniforms {
  bool billboard;
  float sizeScale;
  float sizeMinPixels;
  float sizeMaxPixels;
  vec4 borderRadius;
  vec4 padding;
  highp int sizeUnits;
  bool stroked;
} textBackground;
`,WM={name:"textBackground",source:jM,vs:Hp,fs:Hp,uniformTypes:{billboard:"f32",sizeScale:"f32",sizeMinPixels:"f32",sizeMaxPixels:"f32",borderRadius:"vec4<f32>",padding:"vec4<f32>",sizeUnits:"i32",stroked:"f32"}},HM=`#version 300 es
#define SHADER_NAME text-background-layer-vertex-shader
in vec2 positions;
in vec3 instancePositions;
in vec3 instancePositions64Low;
in vec4 instanceRects;
in vec4 instanceClipRect;
in float instanceSizes;
in float instanceAngles;
in vec2 instancePixelOffsets;
in float instanceLineWidths;
in vec4 instanceFillColors;
in vec4 instanceLineColors;
out vec4 vFillColor;
out vec4 vLineColor;
out float vLineWidth;
out vec2 uv;
out vec2 dimensions;
vec2 rotate_by_angle(vec2 vertex, float angle) {
float angle_radian = radians(angle);
float cos_angle = cos(angle_radian);
float sin_angle = sin(angle_radian);
mat2 rotationMatrix = mat2(cos_angle, -sin_angle, sin_angle, cos_angle);
return rotationMatrix * vertex;
}
void main(void) {
geometry.worldPosition = instancePositions;
geometry.uv = positions;
geometry.pickingColor = picking_getPickingColorFromInstanceID();
uv = positions;
vLineWidth = instanceLineWidths;
float sizePixels = clamp(
project_size_to_pixel(instanceSizes * textBackground.sizeScale, textBackground.sizeUnits),
textBackground.sizeMinPixels, textBackground.sizeMaxPixels
);
float instanceScale = sizePixels / text.fontSize;
dimensions = instanceRects.zw * instanceScale + textBackground.padding.xy + textBackground.padding.zw;
vec2 pixelOffset = (positions * instanceRects.zw + instanceRects.xy) * instanceScale + mix(-textBackground.padding.xy, textBackground.padding.zw, positions);
pixelOffset = rotate_by_angle(pixelOffset, instanceAngles);
pixelOffset += instancePixelOffsets;
pixelOffset.y *= -1.0;
vec2 xy = project_size_to_pixel(instanceClipRect.xy);
vec2 wh = project_size_to_pixel(instanceClipRect.zw);
if (text.flipY) {
xy.y = -xy.y - wh.y;
}
if (instanceClipRect.z >= 0.0) {
dimensions.x = wh.x;
pixelOffset.x = xy.x + uv.x * wh.x + mix(-textBackground.padding.x, textBackground.padding.z, uv.x);
}
if (instanceClipRect.w >= 0.0) {
dimensions.y = wh.y;
pixelOffset.y = xy.y + uv.y * wh.y + mix(-textBackground.padding.y, textBackground.padding.w, uv.y);
}
if (textBackground.billboard)  {
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, vec3(0.0), geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
vec3 offset = vec3(pixelOffset, 0.0);
DECKGL_FILTER_SIZE(offset, geometry);
gl_Position.xy += project_pixel_size_to_clipspace(offset.xy);
} else {
vec3 offset_common = vec3(project_pixel_size(pixelOffset), 0.0);
if (text.flipY) {
offset_common.y *= -1.;
}
DECKGL_FILTER_SIZE(offset_common, geometry);
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, offset_common, geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
}
vFillColor = vec4(instanceFillColors.rgb, instanceFillColors.a * layer.opacity);
DECKGL_FILTER_COLOR(vFillColor, geometry);
vLineColor = vec4(instanceLineColors.rgb, instanceLineColors.a * layer.opacity);
DECKGL_FILTER_COLOR(vLineColor, geometry);
}
`,YM=`#version 300 es
#define SHADER_NAME text-background-layer-fragment-shader
precision highp float;
in vec4 vFillColor;
in vec4 vLineColor;
in float vLineWidth;
in vec2 uv;
in vec2 dimensions;
out vec4 fragColor;
float round_rect(vec2 p, vec2 size, vec4 radii) {
vec2 pixelPositionCB = (p - 0.5) * size;
vec2 sizeCB = size * 0.5;
float maxBorderRadius = min(size.x, size.y) * 0.5;
vec4 borderRadius = vec4(min(radii, maxBorderRadius));
borderRadius.xy =
(pixelPositionCB.x > 0.0) ? borderRadius.xy : borderRadius.zw;
borderRadius.x = (pixelPositionCB.y > 0.0) ? borderRadius.x : borderRadius.y;
vec2 q = abs(pixelPositionCB) - sizeCB + borderRadius.x;
return -(min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - borderRadius.x);
}
float rect(vec2 p, vec2 size) {
vec2 pixelPosition = p * size;
return min(min(pixelPosition.x, size.x - pixelPosition.x),
min(pixelPosition.y, size.y - pixelPosition.y));
}
vec4 get_stroked_fragColor(float dist) {
float isBorder = smoothedge(dist, vLineWidth);
return mix(vFillColor, vLineColor, isBorder);
}
void main(void) {
geometry.uv = uv;
if (textBackground.borderRadius != vec4(0.0)) {
float distToEdge = round_rect(uv, dimensions, textBackground.borderRadius);
float shapeAlpha = smoothedge(-distToEdge, 0.0);
if (shapeAlpha == 0.0) {
discard;
}
if (textBackground.stroked) {
fragColor = get_stroked_fragColor(distToEdge);
} else {
fragColor = vFillColor;
}
fragColor.a *= shapeAlpha;
} else {
if (textBackground.stroked) {
float distToEdge = rect(uv, dimensions);
fragColor = get_stroked_fragColor(distToEdge);
} else {
fragColor = vFillColor;
}
}
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`,qM=`struct TextUniforms {
  cutoffPixels: vec2<f32>,
  align: vec2<i32>,
  fontSize: f32,
  flipY: f32,
};

@group(0) @binding(auto) var<uniform> text: TextUniforms;

fn rotate_by_angle(vertex: vec2<f32>, angle: f32) -> vec2<f32> {
  let angleRadian = radians(angle);
  let cosine = cos(angleRadian);
  let sine = sin(angleRadian);
  let rotationMatrix = mat2x2<f32>(
    vec2<f32>(cosine, -sine),
    vec2<f32>(sine, cosine)
  );
  return rotationMatrix * vertex;
}

struct Attributes {
  @builtin(instance_index) instanceIndex: u32,
  @location(0) positions: vec2<f32>,
  @location(1) instancePositions: vec3<f32>,
  @location(2) instancePositions64Low: vec3<f32>,
  @location(3) instanceSizes: f32,
  @location(4) instanceAngles: f32,
  @location(5) instanceRects: vec4<f32>,
  @location(6) instanceClipRect: vec4<f32>,
  @location(7) instancePixelOffsets: vec2<f32>,
  @location(8) instanceFillColors: vec4<f32>,
  @location(9) instanceLineColors: vec4<f32>,
  @location(10) instanceLineWidths: f32,
};

struct Varyings {
  @builtin(position) position: vec4<f32>,
  @location(0) vFillColor: vec4<f32>,
  @location(1) vLineColor: vec4<f32>,
  @location(2) vLineWidth: f32,
  @location(3) uv: vec2<f32>,
  @location(4) dimensions: vec2<f32>,
  @location(5) pickingColor: vec3<f32>,
};

@vertex
fn vertexMain(attributes: Attributes) -> Varyings {
  geometry.worldPosition = attributes.instancePositions;
  geometry.uv = attributes.positions;
  geometry.pickingColor = picking_getPickingColorFromIndex(attributes.instanceIndex);

  var varyings: Varyings;
  varyings.uv = attributes.positions;
  varyings.vLineWidth = attributes.instanceLineWidths;

  let sizePixels = clamp(
    project_unit_size_to_pixel(
      attributes.instanceSizes * textBackground.sizeScale,
      textBackground.sizeUnits
    ),
    textBackground.sizeMinPixels,
    textBackground.sizeMaxPixels
  );
  let instanceScale = sizePixels / text.fontSize;

  varyings.dimensions = attributes.instanceRects.zw * instanceScale +
    textBackground.padding.xy + textBackground.padding.zw;

  var pixelOffset =
    (attributes.positions * attributes.instanceRects.zw + attributes.instanceRects.xy) *
      instanceScale +
    mix(-textBackground.padding.xy, textBackground.padding.zw, attributes.positions);
  pixelOffset = rotate_by_angle(pixelOffset, attributes.instanceAngles);
  pixelOffset = pixelOffset + attributes.instancePixelOffsets;
  pixelOffset.y = pixelOffset.y * -1.0;

  var xy = project_size_vec2(attributes.instanceClipRect.xy) * project.scale;
  let wh = project_size_vec2(attributes.instanceClipRect.zw) * project.scale;
  if (text.flipY > 0.5) {
    xy.y = -xy.y - wh.y;
  }
  if (attributes.instanceClipRect.z >= 0.0) {
    varyings.dimensions.x = wh.x;
    pixelOffset.x = xy.x + varyings.uv.x * wh.x + mix(
      -textBackground.padding.x,
      textBackground.padding.z,
      varyings.uv.x
    );
  }
  if (attributes.instanceClipRect.w >= 0.0) {
    varyings.dimensions.y = wh.y;
    pixelOffset.y = xy.y + varyings.uv.y * wh.y + mix(
      -textBackground.padding.y,
      textBackground.padding.w,
      varyings.uv.y
    );
  }

  if (textBackground.billboard > 0.5) {
    var position = project_position_to_clipspace(
      attributes.instancePositions,
      attributes.instancePositions64Low,
      vec3<f32>(0.0)
    );
    let clipOffset = project_pixel_size_to_clipspace(pixelOffset);
    position = vec4<f32>(
      position.x + clipOffset.x,
      position.y + clipOffset.y,
      position.z,
      position.w
    );
    varyings.position = position;
  } else {
    var offsetCommon = vec3<f32>(project_pixel_size_vec2(pixelOffset), 0.0);
    if (text.flipY > 0.5) {
      offsetCommon.y = offsetCommon.y * -1.0;
    }
    varyings.position = project_position_to_clipspace(
      attributes.instancePositions,
      attributes.instancePositions64Low,
      offsetCommon
    );
  }

  varyings.vFillColor = vec4<f32>(
    attributes.instanceFillColors.rgb,
    attributes.instanceFillColors.a * layer.opacity
  );
  varyings.vLineColor = vec4<f32>(
    attributes.instanceLineColors.rgb,
    attributes.instanceLineColors.a * layer.opacity
  );
  varyings.pickingColor = geometry.pickingColor;
  return varyings;
}

fn round_rect(point: vec2<f32>, size: vec2<f32>, radii: vec4<f32>) -> f32 {
  let pixelPosition = (point - 0.5) * size;
  let halfSize = size * 0.5;
  let maxBorderRadius = min(size.x, size.y) * 0.5;
  var borderRadius = min(radii, vec4<f32>(maxBorderRadius));

  borderRadius = select(borderRadius.zwxy, borderRadius, pixelPosition.x > 0.0);
  let radius = select(borderRadius.y, borderRadius.x, pixelPosition.y > 0.0);
  let q = abs(pixelPosition) - halfSize + radius;
  return -(min(max(q.x, q.y), 0.0) + length(max(q, vec2<f32>(0.0))) - radius);
}

fn rect(point: vec2<f32>, size: vec2<f32>) -> f32 {
  let pixelPosition = point * size;
  return min(
    min(pixelPosition.x, size.x - pixelPosition.x),
    min(pixelPosition.y, size.y - pixelPosition.y)
  );
}

fn get_stroked_frag_color(
  distanceToEdge: f32,
  lineWidth: f32,
  fillColor: vec4<f32>,
  lineColor: vec4<f32>
) -> vec4<f32> {
  let isBorder = smoothedge(distanceToEdge, lineWidth);
  return mix(fillColor, lineColor, isBorder);
}

@fragment
fn fragmentMain(varyings: Varyings) -> @location(0) vec4<f32> {
  geometry.uv = varyings.uv;
  var fragColor: vec4<f32>;

  if (any(textBackground.borderRadius != vec4<f32>(0.0))) {
    let distanceToEdge = round_rect(
      varyings.uv,
      varyings.dimensions,
      textBackground.borderRadius
    );
    let shapeAlpha = smoothedge(-distanceToEdge, 0.0);
    if (shapeAlpha == 0.0) {
      discard;
    }
    if (textBackground.stroked > 0.5) {
      fragColor = get_stroked_frag_color(
        distanceToEdge,
        varyings.vLineWidth,
        varyings.vFillColor,
        varyings.vLineColor
      );
    } else {
      fragColor = varyings.vFillColor;
    }
    fragColor.a = fragColor.a * shapeAlpha;
  } else if (textBackground.stroked > 0.5) {
    let distanceToEdge = rect(varyings.uv, varyings.dimensions);
    fragColor = get_stroked_frag_color(
      distanceToEdge,
      varyings.vLineWidth,
      varyings.vFillColor,
      varyings.vLineColor
    );
  } else {
    fragColor = varyings.vFillColor;
  }

  if (picking.isActive > 0.5) {
    if (!picking_isColorValid(varyings.pickingColor)) {
      discard;
    }
    return vec4<f32>(varyings.pickingColor, 1.0);
  }

  if (picking.isHighlightActive > 0.5) {
    let highlightedObjectColor = picking_normalizeColor(picking.highlightedObjectColor);
    if (picking_isColorZero(abs(varyings.pickingColor - highlightedObjectColor))) {
      let highlightAlpha = picking.highlightColor.a;
      let blendedAlpha = highlightAlpha + fragColor.a * (1.0 - highlightAlpha);
      if (blendedAlpha > 0.0) {
        let highlightRatio = highlightAlpha / blendedAlpha;
        fragColor = vec4<f32>(
          mix(fragColor.rgb, picking.highlightColor.rgb, highlightRatio),
          blendedAlpha
        );
      } else {
        fragColor = vec4<f32>(fragColor.rgb, 0.0);
      }
    }
  }

  return deckgl_premultiplied_alpha(fragColor);
}
`,XM={billboard:!0,sizeScale:1,sizeUnits:"pixels",sizeMinPixels:0,sizeMaxPixels:Number.MAX_SAFE_INTEGER,fontSize:1,borderRadius:{type:"object",value:0},padding:{type:"array",value:[0,0,0,0]},getPosition:{type:"accessor",value:i=>i.position},getSize:{type:"accessor",value:1},getAngle:{type:"accessor",value:0},getPixelOffset:{type:"accessor",value:[0,0]},getBoundingRect:{type:"accessor",value:[0,0,0,0]},getClipRect:{type:"accessor",value:[0,0,-1,-1]},getFillColor:{type:"accessor",value:[0,0,0,255]},getLineColor:{type:"accessor",value:[0,0,0,255]},getLineWidth:{type:"accessor",value:1}};class el extends Ge{getShaders(){return super.getShaders({vs:HM,fs:YM,source:qM,modules:[_t,Ht,Zt,WM,kp]})}initializeState(){this.getAttributeManager().addInstanced({instancePositions:{size:3,type:"float64",fp64:this.use64bitPositions(),transition:!0,accessor:"getPosition"},instanceSizes:{size:1,transition:!0,bufferGroup:"text-background-instance-data",accessor:"getSize",defaultValue:1},instanceAngles:{size:1,transition:!0,bufferGroup:"text-background-instance-data",accessor:"getAngle"},instanceRects:{size:4,bufferGroup:"text-background-instance-data",accessor:"getBoundingRect"},instanceClipRect:{size:4,bufferGroup:"text-background-instance-data",accessor:"getClipRect",defaultValue:[0,0,-1,-1]},instancePixelOffsets:{size:2,transition:!0,bufferGroup:"text-background-instance-data",accessor:"getPixelOffset"},instanceFillColors:{size:4,transition:!0,type:"unorm8",accessor:"getFillColor",defaultValue:[0,0,0,255]},instanceLineColors:{size:4,transition:!0,type:"unorm8",accessor:"getLineColor",defaultValue:[0,0,0,255]},instanceLineWidths:{size:1,transition:!0,bufferGroup:"text-background-instance-data",accessor:"getLineWidth",defaultValue:1}})}updateState(e){super.updateState(e);const{changeFlags:t}=e;t.extensionsChanged&&(this.state.model?.destroy(),this.state.model=this._getModel(),this.getAttributeManager().invalidateAll())}draw({uniforms:e}){const{billboard:t,sizeScale:n,sizeUnits:s,sizeMinPixels:r,sizeMaxPixels:o,getLineWidth:a,fontSize:c}=this.props;let{padding:l,borderRadius:u}=this.props;l.length<4&&(l=[l[0],l[1],l[0],l[1]]),Array.isArray(u)||(u=[u,u,u,u]);const f=this.state.model,d={billboard:t,stroked:!!a,borderRadius:u,padding:l,sizeUnits:xe[s],sizeScale:n,sizeMinPixels:r,sizeMaxPixels:o},g={fontSize:c,viewport:this.context.viewport};f.shaderInputs.setProps({textBackground:d,text:g}),f.draw(this.context.renderPass)}_getModel(){const e=[0,0,1,0,0,1,1,1];return new re(this.context.device,{...this.getShaders(),id:this.props.id,bufferLayout:this.getAttributeManager().getBufferLayouts(),geometry:new ke({topology:"triangle-strip",vertexCount:4,attributes:{positions:{size:2,value:new Float32Array(e)}}}),isInstanced:!0})}}el.defaultProps=XM,el.layerName="TextBackgroundLayer";const Yp={start:1,middle:0,end:-1},qp={top:1,center:0,bottom:-1},tl=[0,0,0,255],ZM={billboard:!0,sizeScale:1,sizeUnits:"pixels",sizeMinPixels:0,sizeMaxPixels:Number.MAX_SAFE_INTEGER,background:!1,getBackgroundColor:{type:"accessor",value:[255,255,255,255]},getBorderColor:{type:"accessor",value:tl},getBorderWidth:{type:"accessor",value:0},backgroundBorderRadius:{type:"object",value:0},backgroundPadding:{type:"array",value:[0,0,0,0]},characterSet:{type:"object",value:fi.characterSet},fontFamily:fi.fontFamily,fontWeight:fi.fontWeight,lineHeight:1,outlineWidth:{type:"number",value:0,min:0},outlineColor:{type:"color",value:tl},fontSettings:{type:"object",value:{},compare:1},wordBreak:"break-word",maxWidth:{type:"number",value:-1},contentCutoffPixels:{type:"array",value:[0,0]},contentAlignHorizontal:"none",contentAlignVertical:"none",getText:{type:"accessor",value:i=>i.text},getPosition:{type:"accessor",value:i=>i.position},getColor:{type:"accessor",value:tl},getSize:{type:"accessor",value:32},getAngle:{type:"accessor",value:0},getTextAnchor:{type:"accessor",value:"middle"},getAlignmentBaseline:{type:"accessor",value:"center"},getPixelOffset:{type:"accessor",value:[0,0]},getContentBox:{type:"accessor",value:[0,0,-1,-1]},backgroundColor:{deprecatedFor:["background","getBackgroundColor"]}};class il extends Vs{constructor(){super(...arguments),this.getBoundingRect=(e,t)=>{const{size:[n,s]}=this.transformParagraph(e,t),{getTextAnchor:r,getAlignmentBaseline:o}=this.props,a=Yp[typeof r=="function"?r(e,t):r],c=qp[typeof o=="function"?o(e,t):o];return[(a-1)*n/2,(c-1)*s/2,n,s]},this.getIconOffsets=(e,t)=>{const{getTextAnchor:n,getAlignmentBaseline:s}=this.props,{x:r,y:o,rowWidth:a,size:[,c]}=this.transformParagraph(e,t),l=Yp[typeof n=="function"?n(e,t):n],u=qp[typeof s=="function"?s(e,t):s],f=r.length,d=new Array(f*2);let g=0;for(let p=0;p<f;p++)d[g++]=(l-1)*a[p]/2+r[p],d[g++]=(u-1)*c/2+o[p];return d}}initializeState(){this.state={styleVersion:0,fontAtlasManager:new GM},this.props.maxWidth>0&&D.once(1,"v8.9 breaking change: TextLayer maxWidth is now relative to text size")()}updateState(e){const{props:t,oldProps:n,changeFlags:s}=e;(s.dataChanged||s.updateTriggersChanged&&(s.updateTriggersChanged.all||s.updateTriggersChanged.getText))&&this._updateText(),(this._updateFontAtlas()||t.lineHeight!==n.lineHeight||t.wordBreak!==n.wordBreak||t.maxWidth!==n.maxWidth)&&this.setState({styleVersion:this.state.styleVersion+1})}getPickingInfo({info:e}){return e.object=e.index>=0?this.props.data[e.index]:null,e}_updateFontAtlas(){const{fontSettings:e,fontFamily:t,fontWeight:n,_getFontRenderer:s}=this.props,{fontAtlasManager:r,characterSet:o}=this.state,a={...e,characterSet:o,fontFamily:t,fontWeight:n,_getFontRenderer:s};if(!r.mapping)return r.setProps(a),!0;for(const c in a)if(a[c]!==r.props[c])return r.setProps(a),!0;return!1}_updateText(){const{data:e,characterSet:t}=this.props,n=e.attributes?.getText;let{getText:s}=this.props,r=e.startIndices,o;const a=t==="auto"&&new Set;if(n&&r){const{texts:c,characterCount:l}=DM({...ArrayBuffer.isView(n)?{value:n}:n,length:e.length,startIndices:r,characterSet:a});o=l,s=(u,{index:f})=>c[f]}else{const{iterable:c,objectInfo:l}=ci(e);r=[0],o=0;for(const u of c){l.index++;const f=Array.from(s(u,l)||"");a&&f.forEach(a.add,a),o+=f.length,r.push(o)}}this.setState({getText:s,startIndices:r,numInstances:o,characterSet:a||t})}transformParagraph(e,t){const{fontAtlasManager:n}=this.state,s=n.mapping,{baselineOffset:r}=n.atlas,{fontSize:o}=n.props,a=this.state.getText,{wordBreak:c,lineHeight:l,maxWidth:u}=this.props,f=a(e,t)||"";return kM(f,r,l*o,c,u*o,s)}renderLayers(){const{startIndices:e,numInstances:t,getText:n,fontAtlasManager:{atlas:s,mapping:r},styleVersion:o}=this.state,{data:a,_dataDiff:c,getPosition:l,getColor:u,getSize:f,getAngle:d,getPixelOffset:g,getBackgroundColor:p,getBorderColor:m,getBorderWidth:y,getContentBox:_,backgroundBorderRadius:v,backgroundPadding:b,background:x,billboard:w,fontSettings:P,outlineWidth:L,outlineColor:E,sizeScale:T,sizeUnits:C,sizeMinPixels:O,sizeMaxPixels:M,contentCutoffPixels:A,contentAlignHorizontal:R,contentAlignVertical:Z,transitions:U,updateTriggers:G}=this.props,Ir=this.getSubLayerClass("characters",Qc),hm=this.getSubLayerClass("background",el),{fontSize:hi}=this.state.fontAtlasManager.props;return[x&&new hm({getFillColor:p,getLineColor:m,getLineWidth:y,borderRadius:v,padding:b,getPosition:l,getSize:f,getAngle:d,getPixelOffset:g,getClipRect:_,billboard:w,sizeScale:T,sizeUnits:C,sizeMinPixels:O,sizeMaxPixels:M,fontSize:hi,transitions:U&&{getPosition:U.getPosition,getAngle:U.getAngle,getSize:U.getSize,getFillColor:U.getBackgroundColor,getLineColor:U.getBorderColor,getLineWidth:U.getBorderWidth,getPixelOffset:U.getPixelOffset}},this.getSubLayerProps({id:"background",updateTriggers:{getPosition:G.getPosition,getAngle:G.getAngle,getSize:G.getSize,getFillColor:G.getBackgroundColor,getLineColor:G.getBorderColor,getLineWidth:G.getBorderWidth,getPixelOffset:G.getPixelOffset,getBoundingRect:{getText:G.getText,getTextAnchor:G.getTextAnchor,getAlignmentBaseline:G.getAlignmentBaseline,styleVersion:o}}}),{data:a.attributes&&a.attributes.background?{length:a.length,attributes:a.attributes.background}:a,_dataDiff:c,autoHighlight:!1,getBoundingRect:this.getBoundingRect}),new Ir({sdf:P.sdf,smoothing:Number.isFinite(P.smoothing)?P.smoothing:fi.smoothing,outlineWidth:L/(P.radius||fi.radius),outlineColor:E,iconAtlas:s,iconMapping:r,getPosition:l,getColor:u,getSize:f,getAngle:d,getPixelOffset:g,getContentBox:_,billboard:w,sizeScale:T,sizeUnits:C,sizeMinPixels:O,sizeMaxPixels:M,fontSize:hi,contentCutoffPixels:A,contentAlignHorizontal:R,contentAlignVertical:Z,transitions:U&&{getPosition:U.getPosition,getAngle:U.getAngle,getColor:U.getColor,getSize:U.getSize,getPixelOffset:U.getPixelOffset,getContentBox:U.getContentBox}},this.getSubLayerProps({id:"characters",updateTriggers:{all:G.getText,getPosition:G.getPosition,getAngle:G.getAngle,getColor:G.getColor,getSize:G.getSize,getPixelOffset:G.getPixelOffset,getContentBox:G.getContentBox,getIconOffsets:{getTextAnchor:G.getTextAnchor,getAlignmentBaseline:G.getAlignmentBaseline,styleVersion:o}}}),{data:a,_dataDiff:c,startIndices:e,numInstances:t,getIconOffsets:this.getIconOffsets,getIcon:n})]}static set fontAtlasCacheLimit(e){$M(e)}}il.defaultProps=ZM,il.layerName="TextLayer";const rr={circle:{type:Fc,props:{filled:"filled",stroked:"stroked",lineWidthMaxPixels:"lineWidthMaxPixels",lineWidthMinPixels:"lineWidthMinPixels",lineWidthScale:"lineWidthScale",lineWidthUnits:"lineWidthUnits",pointRadiusMaxPixels:"radiusMaxPixels",pointRadiusMinPixels:"radiusMinPixels",pointRadiusScale:"radiusScale",pointRadiusUnits:"radiusUnits",pointAntialiasing:"antialiasing",pointBillboard:"billboard",getFillColor:"getFillColor",getLineColor:"getLineColor",getLineWidth:"getLineWidth",getPointRadius:"getRadius"}},icon:{type:Hs,props:{iconAtlas:"iconAtlas",iconMapping:"iconMapping",iconSizeMaxPixels:"sizeMaxPixels",iconSizeMinPixels:"sizeMinPixels",iconSizeScale:"sizeScale",iconSizeUnits:"sizeUnits",iconAlphaCutoff:"alphaCutoff",iconBillboard:"billboard",getIcon:"getIcon",getIconAngle:"getAngle",getIconColor:"getColor",getIconPixelOffset:"getPixelOffset",getIconSize:"getSize"}},text:{type:il,props:{textSizeMaxPixels:"sizeMaxPixels",textSizeMinPixels:"sizeMinPixels",textSizeScale:"sizeScale",textSizeUnits:"sizeUnits",textBackground:"background",textBackgroundPadding:"backgroundPadding",textFontFamily:"fontFamily",textFontWeight:"fontWeight",textLineHeight:"lineHeight",textMaxWidth:"maxWidth",textOutlineColor:"outlineColor",textOutlineWidth:"outlineWidth",textWordBreak:"wordBreak",textCharacterSet:"characterSet",textBillboard:"billboard",textFontSettings:"fontSettings",getText:"getText",getTextAngle:"getAngle",getTextColor:"getColor",getTextPixelOffset:"getPixelOffset",getTextSize:"getSize",getTextAnchor:"getTextAnchor",getTextAlignmentBaseline:"getAlignmentBaseline",getTextBackgroundColor:"getBackgroundColor",getTextBorderColor:"getBorderColor",getTextBorderWidth:"getBorderWidth"}}},or={type:jc,props:{lineWidthUnits:"widthUnits",lineWidthScale:"widthScale",lineWidthMinPixels:"widthMinPixels",lineWidthMaxPixels:"widthMaxPixels",lineJointRounded:"jointRounded",lineCapRounded:"capRounded",lineMiterLimit:"miterLimit",lineBillboard:"billboard",lineAntialiasing:"antialiasing",getLineColor:"getColor",getLineWidth:"getWidth"}},nl={type:Zc,props:{extruded:"extruded",filled:"filled",wireframe:"wireframe",elevationScale:"elevationScale",material:"material",_full3d:"_full3d",getElevation:"getElevation",getFillColor:"getFillColor",getLineColor:"getLineColor"}};function fn({type:i,props:e}){const t={};for(const n in e)t[n]=i.defaultProps[e[n]];return t}function sl(i,e){const{transitions:t,updateTriggers:n}=i.props,s={updateTriggers:{},transitions:t&&{getPosition:t.geometry}};for(const r in e){const o=e[r];let a=i.props[r];r.startsWith("get")&&(a=i.getSubLayerAccessor(a),s.updateTriggers[o]=n[r],t&&(s.transitions[o]=t[r])),s[o]=a}return s}function KM(i){if(Array.isArray(i))return i;switch(D.assert(i.type,"GeoJSON does not have type"),i.type){case"Feature":return[i];case"FeatureCollection":return D.assert(Array.isArray(i.features),"GeoJSON does not have features array"),i.features;default:return[{geometry:i}]}}function Xp(i,e,t={}){const n={pointFeatures:[],lineFeatures:[],polygonFeatures:[],polygonOutlineFeatures:[]},{startRow:s=0,endRow:r=i.length}=t;for(let o=s;o<r;o++){const a=i[o],{geometry:c}=a;if(c)if(c.type==="GeometryCollection"){D.assert(Array.isArray(c.geometries),"GeoJSON does not have geometries array");const{geometries:l}=c;for(let u=0;u<l.length;u++){const f=l[u];Zp(f,n,e,a,o)}}else Zp(c,n,e,a,o)}return n}function Zp(i,e,t,n,s){const{type:r,coordinates:o}=i,{pointFeatures:a,lineFeatures:c,polygonFeatures:l,polygonOutlineFeatures:u}=e;if(!JM(r,o)){D.warn(`${r} coordinates are malformed`)();return}switch(r){case"Point":a.push(t({geometry:i},n,s));break;case"MultiPoint":o.forEach(f=>{a.push(t({geometry:{type:"Point",coordinates:f}},n,s))});break;case"LineString":c.push(t({geometry:i},n,s));break;case"MultiLineString":o.forEach(f=>{c.push(t({geometry:{type:"LineString",coordinates:f}},n,s))});break;case"Polygon":l.push(t({geometry:i},n,s)),o.forEach(f=>{u.push(t({geometry:{type:"LineString",coordinates:f}},n,s))});break;case"MultiPolygon":o.forEach(f=>{l.push(t({geometry:{type:"Polygon",coordinates:f}},n,s)),f.forEach(d=>{u.push(t({geometry:{type:"LineString",coordinates:d}},n,s))})});break}}const QM={Point:1,MultiPoint:2,LineString:2,MultiLineString:3,Polygon:3,MultiPolygon:4};function JM(i,e){let t=QM[i];for(D.assert(t,`Unknown GeoJSON type ${i}`);e&&--t>0;)e=e[0];return e&&Number.isFinite(e[0])}function Kp(){return{points:{},lines:{},polygons:{},polygonsOutline:{}}}function ar(i){return i.geometry.coordinates}function eR(i,e){const t=Kp(),{pointFeatures:n,lineFeatures:s,polygonFeatures:r,polygonOutlineFeatures:o}=i;return t.points.data=n,t.points._dataDiff=e.pointFeatures&&(()=>e.pointFeatures),t.points.getPosition=ar,t.lines.data=s,t.lines._dataDiff=e.lineFeatures&&(()=>e.lineFeatures),t.lines.getPath=ar,t.polygons.data=r,t.polygons._dataDiff=e.polygonFeatures&&(()=>e.polygonFeatures),t.polygons.getPolygon=ar,t.polygonsOutline.data=o,t.polygonsOutline._dataDiff=e.polygonOutlineFeatures&&(()=>e.polygonOutlineFeatures),t.polygonsOutline.getPath=ar,t}function tR(i){const e=Kp(),{points:t,lines:n,polygons:s}=i,r=vM(i);e.points.data={length:t.positions.value.length/t.positions.size,attributes:{...t.attributes,getPosition:t.positions,rowIndexes:{size:1,type:"uint32",value:r.points}},properties:t.properties,numericProps:t.numericProps,featureIds:t.featureIds},e.lines.data={length:n.pathIndices.value.length-1,startIndices:n.pathIndices.value,attributes:{...n.attributes,getPath:n.positions,rowIndexes:{size:1,type:"uint32",value:r.lines}},properties:n.properties,numericProps:n.numericProps,featureIds:n.featureIds},e.lines._pathType="open";const o=s.positions.value.length/s.positions.size,a=Array(o).fill(1);for(const c of s.primitivePolygonIndices.value)a[c-1]=0;return e.polygons.data={length:s.polygonIndices.value.length-1,startIndices:s.polygonIndices.value,attributes:{...s.attributes,getPolygon:s.positions,instanceVertexValid:{size:1,value:new Uint16Array(a)},rowIndexes:{size:1,type:"uint32",value:r.polygons}},properties:s.properties,numericProps:s.numericProps,featureIds:s.featureIds},e.polygons._normalize=!1,s.triangles&&(e.polygons.data.attributes.indices=s.triangles.value),e.polygonsOutline.data={length:s.primitivePolygonIndices.value.length-1,startIndices:s.primitivePolygonIndices.value,attributes:{...s.attributes,getPath:s.positions,rowIndexes:{size:1,type:"uint32",value:r.polygons}},properties:s.properties,numericProps:s.numericProps,featureIds:s.featureIds},e.polygonsOutline._pathType="open",e}const iR=["points","linestrings","polygons"],nR={...fn(rr.circle),...fn(rr.icon),...fn(rr.text),...fn(or),...fn(nl),stroked:!0,filled:!0,extruded:!1,wireframe:!1,_full3d:!1,iconAtlas:{type:"object",value:null},iconMapping:{type:"object",value:{}},getIcon:{type:"accessor",value:i=>i.properties.icon},getText:{type:"accessor",value:i=>i.properties.text},pointType:"circle",getRadius:{deprecatedFor:"getPointRadius"}};class rl extends Vs{initializeState(){this.state={layerProps:{},features:{},featuresDiff:{}}}updateState({props:e,changeFlags:t}){if(!t.dataChanged)return;const{data:n}=this.props,s=n&&"points"in n&&"polygons"in n&&"lines"in n;this.setState({binary:s}),s?this._updateStateBinary({props:e,changeFlags:t}):this._updateStateJSON({props:e,changeFlags:t})}_updateStateBinary({props:e,changeFlags:t}){const n=tR(e.data);this.setState({layerProps:n})}_updateStateJSON({props:e,changeFlags:t}){const n=KM(e.data),s=this.getSubLayerRow.bind(this);let r={};const o={};if(Array.isArray(t.dataChanged)){const c=this.state.features;for(const l in c)r[l]=c[l].slice(),o[l]=[];for(const l of t.dataChanged){const u=Xp(n,s,l);for(const f in c)o[f].push(yM({data:r[f],getIndex:d=>d.__source.index,dataRange:l,replace:u[f]}))}}else r=Xp(n,s);const a=eR(r,o);this.setState({features:r,featuresDiff:o,layerProps:a})}getPickingInfo(e){const t=super.getPickingInfo(e),{index:n,sourceLayer:s}=t;return t.featureType=iR.find(r=>s.id.startsWith(`${this.id}-${r}-`)),n>=0&&s.id.startsWith(`${this.id}-points-text`)&&this.state.binary&&(t.index=this.props.data.points.globalFeatureIds.value[n]),t}_updateAutoHighlight(e){const t=`${this.id}-points-`,n=e.featureType==="points";for(const s of this.getSubLayers())s.id.startsWith(t)===n&&s.updateAutoHighlight(e)}_renderPolygonLayer(){const{extruded:e,wireframe:t}=this.props,{layerProps:n}=this.state,s="polygons-fill",r=this.shouldRenderSubLayer(s,n.polygons?.data)&&this.getSubLayerClass(s,nl.type);if(r){const o=sl(this,nl.props),a=e&&t;return a||delete o.getLineColor,o.updateTriggers.lineColors=a,new r(o,this.getSubLayerProps({id:s,updateTriggers:o.updateTriggers}),n.polygons)}return null}_renderLineLayers(){const{extruded:e,stroked:t}=this.props,{layerProps:n}=this.state,s="polygons-stroke",r="linestrings",o=!e&&t&&this.shouldRenderSubLayer(s,n.polygonsOutline?.data)&&this.getSubLayerClass(s,or.type),a=this.shouldRenderSubLayer(r,n.lines?.data)&&this.getSubLayerClass(r,or.type);if(o||a){const c=sl(this,or.props);return[o&&new o(c,this.getSubLayerProps({id:s,updateTriggers:c.updateTriggers}),n.polygonsOutline),a&&new a(c,this.getSubLayerProps({id:r,updateTriggers:c.updateTriggers}),n.lines)]}return null}_renderPointLayers(){const{pointType:e}=this.props,{layerProps:t,binary:n}=this.state;let{highlightedObjectIndex:s}=this.props;!n&&Number.isFinite(s)&&(s=t.points.data.findIndex(a=>a.__source.index===s));const r=new Set(e.split("+")),o=[];for(const a of r){const c=`points-${a}`,l=rr[a],u=l&&this.shouldRenderSubLayer(c,t.points?.data)&&this.getSubLayerClass(c,l.type);if(u){const f=sl(this,l.props);let d=t.points;if(a==="text"&&n){const{rowIndexes:g,...p}=d.data.attributes;d={...d,data:{...d.data,attributes:p}}}o.push(new u(f,this.getSubLayerProps({id:c,updateTriggers:f.updateTriggers,highlightedObjectIndex:s}),d))}}return o}renderLayers(){const{extruded:e}=this.props,t=this._renderPolygonLayer(),n=this._renderLineLayers(),s=this._renderPointLayers();return[!e&&t,n,s,e&&t]}getSubLayerAccessor(e){const{binary:t}=this.state;return!t||typeof e!="function"?super.getSubLayerAccessor(e):(n,s)=>{const{data:r,index:o}=s,a=bM(r,o);return e(a,s)}}}rl.layerName="GeoJsonLayer",rl.defaultProps=nR;const sR=`const HEXBIN_DISTANCE: vec2<f32> = vec2<f32>(1.7320508, 1.5);

struct Attributes {
  @builtin(instance_index) instanceIndex: u32,
  @location(0) positions: vec3<f32>,
  @location(1) normals: vec3<f32>,
  @location(2) instancePositions: vec2<f32>,
  @location(3) instanceColorValues: f32,
  @location(4) instanceElevationValues: f32,
};

struct Varyings {
  @builtin(position) position: vec4<f32>,
  @location(0) color: vec4<f32>,
  @location(1) pickingColor: vec3<f32>,
};

fn hexbinCentroid(binId: vec2<f32>, radius: f32) -> vec2<f32> {
  var adjustedBinId = binId;
  adjustedBinId.x += fract(adjustedBinId.y * 0.5);
  return adjustedBinId * HEXBIN_DISTANCE * radius;
}

fn interpolate(value: f32, domain: vec2<f32>, range: vec2<f32>) -> f32 {
  let ratio = clamp((value - domain.x) / (domain.y - domain.x), 0.0, 1.0);
  return mix(range.x, range.y, ratio);
}

fn sampleColorRange(value: f32, domain: vec2<f32>) -> vec4<f32> {
  let ratio = (value - domain.x) / (domain.y - domain.x);
  return textureSampleLevel(colorRange, colorRangeSampler, vec2<f32>(ratio, 0.5), 0.0);
}

@vertex
fn vertexMain(attributes: Attributes) -> Varyings {
  var output: Varyings;
  geometry.pickingColor = picking_getPickingColorFromIndex(attributes.instanceIndex);
  output.pickingColor = geometry.pickingColor;

  if (
    attributes.instanceColorValues != attributes.instanceColorValues ||
    attributes.instanceColorValues < hexagon.colorDomain.z ||
    attributes.instanceColorValues > hexagon.colorDomain.w ||
    attributes.instanceElevationValues < hexagon.elevationDomain.z ||
    attributes.instanceElevationValues > hexagon.elevationDomain.w
  ) {
    output.position = vec4<f32>(0.0);
    output.color = vec4<f32>(0.0);
    return output;
  }

  var commonPosition =
    hexbinCentroid(attributes.instancePositions, column.radius) +
    (hexagon.originCommon - project.commonOrigin.xy);
  commonPosition += attributes.positions.xy * column.radius * column.coverage;
  geometry.position = vec4<f32>(commonPosition, 0.0, 1.0);
  geometry.normal = project_normal(attributes.normals);

  if (column.extruded > 0.5) {
    var elevation = interpolate(
      attributes.instanceElevationValues,
      hexagon.elevationDomain.xy,
      hexagon.elevationRange
    );
    elevation = project_size_float(elevation);
    geometry.position.z = (attributes.positions.z + 1.0) / 2.0 * elevation;
  }

  output.position = project_common_position_to_clipspace(geometry.position);
  var colorValue = sampleColorRange(attributes.instanceColorValues, hexagon.colorDomain.xy);
  if (column.extruded > 0.5) {
    colorValue = vec4<f32>(
      lighting_getLightColor2(
        colorValue.rgb,
        project.cameraPosition,
        geometry.position.xyz,
        geometry.normal
      ),
      colorValue.a
    );
  }
  output.color = vec4<f32>(colorValue.rgb, colorValue.a * layer.opacity);
  return output;
}

@fragment
fn fragmentMain(varyings: Varyings) -> @location(0) vec4<f32> {
  if (picking.isActive > 0.5) {
    if (!picking_isColorValid(varyings.pickingColor)) {
      discard;
    }
    return vec4<f32>(varyings.pickingColor, 1.0);
  }

  var color = varyings.color;
  if (picking.isHighlightActive > 0.5) {
    let highlightedObjectColor = picking_normalizeColor(picking.highlightedObjectColor);
    if (picking_isColorZero(abs(varyings.pickingColor - highlightedObjectColor))) {
      let highLightAlpha = picking.highlightColor.a;
      let blendedAlpha = highLightAlpha + color.a * (1.0 - highLightAlpha);
      if (blendedAlpha > 0.0) {
        let highLightRatio = highLightAlpha / blendedAlpha;
        color = vec4<f32>(
          mix(color.rgb, picking.highlightColor.rgb, highLightRatio),
          blendedAlpha
        );
      } else {
        color = vec4<f32>(color.rgb, 0.0);
      }
    }
  }

  return deckgl_premultiplied_alpha(color);
}
`,Qp=Math.PI/3,cr=2*Math.sin(Qp),lr=1.5,rR=Array.from({length:6},(i,e)=>{const t=e*Qp;return[Math.sin(t),-Math.cos(t)]});function ol([i,e],t){let n=Math.round(e=e/t/lr),s=Math.round(i=i/t/cr-(n&1)/2);const r=e-n;if(Math.abs(r)*3>1){const o=i-s,a=s+(i<s?-1:1)/2,c=n+(e<n?-1:1),l=i-a,u=e-c;o*o+r*r>l*l+u*u&&(s=a+(n&1?1:-1)/2,n=c)}return[s,n]}const oR=`
const vec2 DIST = vec2(${cr}, ${lr});

ivec2 pointToHexbin(vec2 p, float radius) {
  p /= radius * DIST;
  float pj = round(p.y);
  float pjm2 = mod(pj, 2.0);
  p.x -= pjm2 * 0.5;
  float pi = round(p.x);
  vec2 d1 = p - vec2(pi, pj);

  if (abs(d1.y) * 3. > 1.) {
    vec2 v2 = step(0.0, d1) - 0.5;
    v2.y *= 2.0;
    vec2 d2 = d1 - v2;
    if (dot(d1, d1) > dot(d2, d2)) {
      pi += v2.x + pjm2 - 0.5;
      pj += v2.y;
    }
  }
  return ivec2(pi, pj);
}
`;function Jp([i,e],t){return[(i+(e&1)/2)*t*cr,e*t*lr]}const aR=`#version 300 es
#define SHADER_NAME hexagon-cell-layer-vertex-shader
in vec3 positions;
in vec3 normals;
in vec2 instancePositions;
in float instanceElevationValues;
in float instanceColorValues;
uniform sampler2D colorRange;
out vec4 vColor;
${`
const vec2 DIST = vec2(${cr}, ${lr});

vec2 hexbinCentroid(vec2 binId, float radius) {
  binId.x += fract(binId.y * 0.5);
  return binId * DIST * radius;
}
`}
float interp(float value, vec2 domain, vec2 range) {
float r = min(max((value - domain.x) / (domain.y - domain.x), 0.), 1.);
return mix(range.x, range.y, r);
}
vec4 interp(float value, vec2 domain, sampler2D range) {
float r = (value - domain.x) / (domain.y - domain.x);
return texture(range, vec2(r, 0.5));
}
void main(void) {
geometry.pickingColor = picking_getPickingColorFromInstanceID();
if (isnan(instanceColorValues) ||
instanceColorValues < hexagon.colorDomain.z ||
instanceColorValues > hexagon.colorDomain.w ||
instanceElevationValues < hexagon.elevationDomain.z ||
instanceElevationValues > hexagon.elevationDomain.w
) {
gl_Position = vec4(0.);
return;
}
vec2 commonPosition = hexbinCentroid(instancePositions, column.radius) + (hexagon.originCommon - project.commonOrigin.xy);
commonPosition += positions.xy * column.radius * column.coverage;
geometry.position = vec4(commonPosition, 0.0, 1.0);
geometry.normal = project_normal(normals);
float elevation = 0.0;
if (column.extruded) {
elevation = interp(instanceElevationValues, hexagon.elevationDomain.xy, hexagon.elevationRange);
elevation = project_size(elevation);
geometry.position.z = (positions.z + 1.0) / 2.0 * elevation;
}
gl_Position = project_common_position_to_clipspace(geometry.position);
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
vColor = interp(instanceColorValues, hexagon.colorDomain.xy, colorRange);
vColor.a *= layer.opacity;
if (column.extruded) {
vColor.rgb = lighting_getLightColor(vColor.rgb, project.cameraPosition, geometry.position.xyz, geometry.normal);
}
DECKGL_FILTER_COLOR(vColor, geometry);
}
`,cR={name:"hexagon",source:`struct HexagonUniforms {
  colorDomain: vec4<f32>,
  elevationDomain: vec4<f32>,
  elevationRange: vec2<f32>,
  originCommon: vec2<f32>,
};

@group(0) @binding(auto) var<uniform> hexagon: HexagonUniforms;
@group(0) @binding(auto) var colorRange: texture_2d<f32>;
@group(0) @binding(auto) var colorRangeSampler: sampler;
`,vs:`layout(std140) uniform hexagonUniforms {
  vec4 colorDomain;
  vec4 elevationDomain;
  vec2 elevationRange;
  vec2 originCommon;
} hexagon;
`,uniformTypes:{colorDomain:"vec4<f32>",elevationDomain:"vec4<f32>",elevationRange:"vec2<f32>",originCommon:"vec2<f32>"}};class em extends Gc{getShaders(){const e=super.getShaders();return e.modules.push(cR),{...e,source:sR,vs:aR}}initializeState(){super.initializeState();const e=this.getAttributeManager();e.remove(["instanceElevations","instanceFillColors","instanceLineColors","instanceStrokeWidths"]),e.addInstanced({instancePositions:{size:2,type:"float32",accessor:"getBin"},instanceColorValues:{size:1,type:"float32",accessor:"getColorValue"},instanceElevationValues:{size:1,type:"float32",accessor:"getElevationValue"}})}updateState(e){super.updateState(e);const{props:t,oldProps:n}=e,s=this.state.fillModel;if(n.colorRange!==t.colorRange){this.state.colorTexture?.destroy(),this.state.colorTexture=IA(this.context.device,t.colorRange,t.colorScaleType);const r={colorRange:this.state.colorTexture};s.shaderInputs.setProps({hexagon:r})}else n.colorScaleType!==t.colorScaleType&&AA(this.state.colorTexture,t.colorScaleType)}finalizeState(e){super.finalizeState(e),this.state.colorTexture?.destroy()}draw({uniforms:e}){const{radius:t,hexOriginCommon:n,elevationRange:s,elevationScale:r,extruded:o,coverage:a,colorDomain:c,elevationDomain:l}=this.props,u=this.props.colorCutoff||[-1/0,1/0],f=this.props.elevationCutoff||[-1/0,1/0],d=this.state.fillModel,g={colorDomain:[Math.max(c[0],u[0]),Math.min(c[1],u[1]),Math.max(c[0]-1,u[0]),Math.min(c[1]+1,u[1])],elevationDomain:[Math.max(l[0],f[0]),Math.min(l[1],f[1]),Math.max(l[0]-1,f[0]),Math.min(l[1]+1,f[1])],elevationRange:[s[0]*r,s[1]*r],originCommon:n};d.shaderInputs.setProps({column:{extruded:o,coverage:a,radius:t},hexagon:g}),d.draw(this.context.renderPass)}}em.layerName="HexagonCellLayer";const lR={name:"binOptions",vs:`layout(std140) uniform binOptionsUniforms {
  vec2 hexOriginCommon;
  float radiusCommon;
} binOptions;
`,uniformTypes:{hexOriginCommon:"vec2<f32>",radiusCommon:"f32"}};function tm(){}const uR={gpuAggregation:!0,colorDomain:null,colorRange:LA,getColorValue:{type:"accessor",value:null},getColorWeight:{type:"accessor",value:1},colorAggregation:"SUM",lowerPercentile:{type:"number",min:0,max:100,value:0},upperPercentile:{type:"number",min:0,max:100,value:100},colorScaleType:"quantize",onSetColorDomain:tm,elevationDomain:null,elevationRange:[0,1e3],getElevationValue:{type:"accessor",value:null},getElevationWeight:{type:"accessor",value:1},elevationAggregation:"SUM",elevationScale:{type:"number",min:0,value:1},elevationLowerPercentile:{type:"number",min:0,max:100,value:0},elevationUpperPercentile:{type:"number",min:0,max:100,value:100},elevationScaleType:"linear",onSetElevationDomain:tm,radius:{type:"number",min:1,value:1e3},coverage:{type:"number",min:0,max:1,value:1},getPosition:{type:"accessor",value:i=>i.position},hexagonAggregator:{type:"function",optional:!0,value:null},extruded:!1,material:!0};class al extends Xg{getAggregatorType(){const{gpuAggregation:e,hexagonAggregator:t,getColorValue:n,getElevationValue:s}=this.props;return e&&(t||n||s)?(D.warn("Features not supported by GPU aggregation, falling back to CPU")(),"cpu"):e&&qg.isSupported(this.context.device)?"gpu":"cpu"}createAggregator(e){if(e==="cpu"){const{hexagonAggregator:t,radius:n}=this.props;return new bA({dimensions:2,getBin:{sources:["positions"],getValue:({positions:s},r,o)=>{if(t)return t(s,n);const c=this.state.aggregatorViewport.projectPosition(s),{radiusCommon:l,hexOriginCommon:u}=o;return ol([c[0]-u[0],c[1]-u[1]],l)}},getValue:[{sources:["colorWeights"],getValue:({colorWeights:s})=>s},{sources:["elevationWeights"],getValue:({elevationWeights:s})=>s}]})}return new qg(this.context.device,{dimensions:2,channelCount:2,bufferLayout:this.getAttributeManager().getBufferLayouts({isInstanced:!1}),...super.getShaders({modules:[_t,lR],vs:`
  in vec3 positions;
  in vec3 positions64Low;
  in float colorWeights;
  in float elevationWeights;
  
  ${oR}

  void getBin(out ivec2 binId) {
    vec3 positionCommon = project_position(positions, positions64Low);
    binId = pointToHexbin(positionCommon.xy, binOptions.radiusCommon);
  }
  void getValue(out vec2 value) {
    value = vec2(colorWeights, elevationWeights);
  }
  `})})}initializeState(){super.initializeState(),this.getAttributeManager().add({positions:{size:3,accessor:"getPosition",type:"float64",fp64:this.use64bitPositions()},colorWeights:{size:1,accessor:"getColorWeight"},elevationWeights:{size:1,accessor:"getElevationWeight"}})}updateState(e){const t=super.updateState(e),{props:n,oldProps:s,changeFlags:r}=e,{aggregator:o}=this.state;if((r.dataChanged||!this.state.dataAsArray)&&(n.getColorValue||n.getElevationValue)&&(this.state.dataAsArray=Array.from(ci(n.data).iterable)),t||r.dataChanged||n.radius!==s.radius||n.getColorValue!==s.getColorValue||n.getElevationValue!==s.getElevationValue||n.colorAggregation!==s.colorAggregation||n.elevationAggregation!==s.elevationAggregation){this._updateBinOptions();const{radiusCommon:a,hexOriginCommon:c,binIdRange:l,dataAsArray:u}=this.state;if(o.setProps({binIdRange:l,pointCount:this.getNumInstances(),operations:[n.colorAggregation,n.elevationAggregation],binOptions:{radiusCommon:a,hexOriginCommon:c},onUpdate:this._onAggregationUpdate.bind(this)}),u){const{getColorValue:f,getElevationValue:d}=this.props;o.setProps({customOperations:[f&&(g=>f(g.map(p=>u[p]),{indices:g,data:n.data})),d&&(g=>d(g.map(p=>u[p]),{indices:g,data:n.data}))]})}}return r.updateTriggersChanged&&r.updateTriggersChanged.getColorValue&&o.setNeedsUpdate(0),r.updateTriggersChanged&&r.updateTriggersChanged.getElevationValue&&o.setNeedsUpdate(1),t}_updateBinOptions(){const e=this.getBounds();let t=1,n=[0,0],s=[[0,1],[0,1]],r=this.context.viewport;if(e&&Number.isFinite(e[0][0])){let o=[(e[0][0]+e[1][0])/2,(e[0][1]+e[1][1])/2];const{radius:a}=this.props,{unitsPerMeter:c}=r.getDistanceScales(o);t=c[0]*a;const l=ol(r.projectFlat(o),t);o=r.unprojectFlat(Jp(l,t));const u=r.constructor;r=r.isGeospatial?new u({longitude:o[0],latitude:o[1],zoom:12}):new Jt({position:[o[0],o[1],0],zoom:12}),n=[Math.fround(r.center[0]),Math.fround(r.center[1])],s=DA({dataBounds:e,getBinId:f=>{const d=r.projectFlat(f);return d[0]-=n[0],d[1]-=n[1],ol(d,t)},padding:1})}this.setState({radiusCommon:t,hexOriginCommon:n,binIdRange:s,aggregatorViewport:r})}draw(e){e.shaderModuleProps.project&&(e.shaderModuleProps.project.viewport=this.state.aggregatorViewport),super.draw(e)}_onAggregationUpdate({channel:e}){const t=this.getCurrentLayer().props,{aggregator:n}=this.state;if(e===0){const s=n.getResult(0);this.setState({colors:new Zg(s,n.binCount)}),t.onSetColorDomain(n.getResultDomain(0))}else if(e===1){const s=n.getResult(1);this.setState({elevations:new Zg(s,n.binCount)}),t.onSetElevationDomain(n.getResultDomain(1))}}onAttributeChange(e){const{aggregator:t}=this.state;switch(e){case"positions":t.setNeedsUpdate(),this._updateBinOptions();const{radiusCommon:n,hexOriginCommon:s,binIdRange:r}=this.state;t.setProps({binIdRange:r,binOptions:{radiusCommon:n,hexOriginCommon:s}});break;case"colorWeights":t.setNeedsUpdate(0);break;case"elevationWeights":t.setNeedsUpdate(1);break}}renderLayers(){const{aggregator:e,radiusCommon:t,hexOriginCommon:n}=this.state,{elevationScale:s,colorRange:r,elevationRange:o,extruded:a,coverage:c,material:l,transitions:u,colorScaleType:f,lowerPercentile:d,upperPercentile:g,colorDomain:p,elevationScaleType:m,elevationLowerPercentile:y,elevationUpperPercentile:_,elevationDomain:v}=this.props,b=this.getSubLayerClass("cells",em),x=e.getBins(),w=this.state.colors?.update({scaleType:f,lowerPercentile:d,upperPercentile:g}),P=this.state.elevations?.update({scaleType:m,lowerPercentile:y,upperPercentile:_});return!w||!P?null:new b(this.getSubLayerProps({id:"cells"}),{data:{length:e.binCount,attributes:{getBin:x,getColorValue:w.attribute,getElevationValue:P.attribute}},dataComparator:(L,E)=>L.length===E.length,updateTriggers:{getBin:[x],getColorValue:[w.attribute],getElevationValue:[P.attribute]},diskResolution:6,vertices:rR,radius:t,hexOriginCommon:n,elevationScale:s,colorRange:r,colorScaleType:f,elevationRange:o,extruded:a,coverage:c,material:l,colorDomain:w.domain||p||e.getResultDomain(0),elevationDomain:P.domain||v||e.getResultDomain(1),colorCutoff:w.cutoff,elevationCutoff:P.cutoff,transitions:u&&{getFillColor:u.getColorValue||u.getColorWeight,getElevation:u.getElevationValue||u.getElevationWeight},extensions:[]})}getPickingInfo(e){const t=e.info,{index:n}=t;if(n>=0){const s=this.state.aggregator.getBin(n);let r;if(s){const o=Jp(s.id,this.state.radiusCommon),a=this.context.viewport.unprojectFlat(o);r={col:s.id[0],row:s.id[1],position:a,colorValue:s.value[0],elevationValue:s.value[1],count:s.count},s.pointIndices&&(r.pointIndices=s.pointIndices,r.points=Array.isArray(this.props.data)?s.pointIndices.map(c=>this.props.data[c]):[])}t.object=r}return t}}al.layerName="HexagonLayer",al.defaultProps=uR;const fR=typeof window<"u"?k.useLayoutEffect:k.useEffect;function ur(i,e){for(;i;){if(i===e)return!0;i=Object.getPrototypeOf(i)}return!1}const dR={position:"absolute",zIndex:-1};function im(i,e){if(typeof i=="function")return i(e);if(Array.isArray(i))return i.map(t=>im(t,e));if(fr(i)){if(hR(i))return e.style=dR,k.cloneElement(i,e);if(gR(i))return k.cloneElement(i,e)}return i}function fr(i){return je.isValidElement(i)}function hR(i){return i.props?.mapStyle}function gR(i){const e=i.type;return e&&e.deckGLViewProps}function cl(i){if(typeof i=="function")return k.createElement(ni,{},i);if(Array.isArray(i))return i.map(cl);if(fr(i)){if(i.type===je.Fragment)return cl(i.props.children);if(ur(i.type,ni))return i}return i}function pR({children:i,layers:e=[],views:t}){const n=[],s=[],r={};return je.Children.forEach(cl(i),o=>{if(fr(o)){const a=o.type;if(ur(a,Ge)){const c=mR(a,o.props);s.push(c)}else n.push(o);if(ur(a,ni)&&a!==ni&&o.props.id){const c=new a(o.props);r[c.id]=c}}else o&&n.push(o)}),Object.keys(r).length>0&&(Array.isArray(t)?t.forEach(o=>{r[o.id]=o}):t&&(r[t.id]=t),t=Object.values(r)),e=s.length>0?[s,e]:e,{layers:e,children:n,views:t}}function mR(i,e){const t={},n=i.defaultProps||{};for(const s in e)n[s]!==e[s]&&(t[s]=e[s]);return new i(t)}const yR=k.createContext();function bR({children:i,deck:e,ContextProvider:t=yR.Provider}){const{viewManager:n}=e||{};if(!n||!n.views.length)return[];const s={},r=n.views[0].id;for(const o of i){let a=r,c=o;fr(o)&&ur(o.type,ni)&&(a=o.props.id||r,c=o.props.children);const l=n.getViewport(a),u=n.getViewState(a);if(l){u.padding=l.padding;const{x:f,y:d,width:g,height:p}=l;c=im(c,{x:f,y:d,width:g,height:p,viewport:l,viewState:u}),s[a]||(s[a]={viewport:l,children:[]}),s[a].children.push(c)}}return Object.keys(s).map(o=>{const{viewport:a,children:c}=s[o],{x:l,y:u,width:f,height:d}=a,g={position:"absolute",left:l,top:u,width:f,height:d},p=`view-${o}`,m=k.createElement("div",{key:p,id:p,style:g},...c),y={deck:e,viewport:a,container:e.canvas.offsetParent,eventManager:e.eventManager,onViewStateChange:v=>{v.viewId=o,e._onViewStateChange(v)},widgets:[]},_=`view-${o}-context`;return k.createElement(t,{key:_,value:y},m)})}const _R={mixBlendMode:null};function vR({width:i,height:e,style:t}){const n={position:"absolute",zIndex:0,left:0,top:0,width:i,height:e},s={left:0,top:0};if(t)for(const r in t)r in _R?s[r]=t[r]:n[r]=t[r];return{containerStyle:n,canvasStyle:s}}function xR(i){return{get deck(){return i.deck},pickObjectAsync:e=>i.deck.pickObjectAsync(e),pickObjectsAsync:e=>i.deck.pickObjectsAsync(e),pickObject:e=>i.deck.pickObject(e),pickMultipleObjects:e=>i.deck.pickMultipleObjects(e),pickObjects:e=>i.deck.pickObjects(e)}}function nm(i){i.redrawReason&&(i.deck._drawLayers(i.redrawReason),i.redrawReason=null)}function wR(i,e){const t=i.deck;return!!(t&&e&&t.width===e.clientWidth&&t.height===e.clientHeight)}function PR(i,e,t){const n=new e({...t,_customRender:s=>{i.redrawReason=s;const r=n.device?.type==="webgpu",o=n.getViewports();i.lastRenderedViewports!==o&&((!r||wR(i,t.parent||null))&&i.forceUpdate(),!r)||nm(i)}});return n}function SR(i,e){const[t,n]=k.useState(0),r=k.useRef({control:null,version:t,forceUpdate:()=>n(w=>w+1)}).current,o=k.useRef(null),a=k.useRef(null),c=k.useMemo(()=>pR(i),[i.layers,i.views,i.children]);let l=!0;const u=w=>l&&i.viewState?(r.viewStateUpdateRequested=w,null):(r.viewStateUpdateRequested=null,i.onViewStateChange?.(w)),f=w=>{l?r.interactionStateUpdateRequested=w:(r.interactionStateUpdateRequested=null,i.onInteractionStateChange?.(w))},d=k.useMemo(()=>{const w={widgets:[],...i,style:null,width:"100%",height:"100%",parent:o.current,canvas:a.current,layers:c.layers,onViewStateChange:u,onInteractionStateChange:f};return c.views&&(w.views=c.views),delete w._customRender,r.deck&&(r.deck.setProps(w),r.deck.isInitialized&&(r.lastRenderedViewports=r.deck.getViewports())),w},[i]);k.useEffect(()=>{const w=i.Deck||uc;return r.deck=PR(r,w,{...d,parent:o.current,canvas:a.current}),()=>r.deck?.finalize()},[]),fR(()=>{nm(r);const{viewStateUpdateRequested:w,interactionStateUpdateRequested:P}=r;w&&u(w),P&&f(P)}),k.useImperativeHandle(e,()=>xR(r),[]);const g=r.deck&&r.deck.isInitialized?r.deck.getViewports():void 0,{ContextProvider:p,width:m="100%",height:y="100%",id:_,style:v}=i,{containerStyle:b,canvasStyle:x}=k.useMemo(()=>vR({width:m,height:y,style:v}),[m,y,v]);if(!r.viewStateUpdateRequested&&r.lastRenderedViewports===g||r.version!==t){r.lastRenderedViewports=g,r.version=t;const w=bR({children:c.children,deck:r.deck,ContextProvider:p}),P=k.createElement("canvas",{key:"canvas",id:_||"deckgl-overlay",ref:a,style:x}),L=k.createElement("div",{key:"deck-events-root",className:"deck-events-root",style:{width:m,height:y}},[P,w]),E=k.createElement("div",{key:"deck-widgets-root",className:"deck-widgets-root"});r.control=k.createElement("div",{id:`${_||"deckgl"}-wrapper`,ref:o,style:b},[L,E])}return l=!1,r.control}const ER=je.forwardRef(SR),CR=[[37,60,120],[42,102,168],[58,150,180],[110,190,150],[190,214,102],[253,231,76]];function LR({positions:i,count:e,boundary:t,viewState:n,binPixels:s,extruded:r,onViewState:o,onPick:a,onRebin:c}){const l=k.useRef(0),u=k.useRef(!0),f=k.useRef({onRebin:c,onPick:a});f.current={onRebin:c,onPick:a};const d=ml(n.zoom,s),g=k.useCallback(y=>{const _=y.object;if(!_?.position){f.current.onPick(null);return}f.current.onPick({lng:_.position[0],lat:_.position[1],radius:y.layer?.props?.radius??0,count:_.count??0})},[]),p=k.useMemo(()=>(l.current=performance.now(),u.current=!1,[new rl({id:"boundary",data:t,stroked:!0,filled:!1,getLineColor:y=>y.properties?.kind==="river"?[90,140,200,190]:[130,136,148,150],getLineWidth:y=>y.properties?.kind==="river"?60:30,lineWidthMinPixels:1}),new al({id:"trips",data:{length:e,attributes:{getPosition:{value:i,size:3}}},radius:d,coverage:.92,colorScaleType:"quantile",lowerPercentile:12,elevationScale:r?18:0,extruded:r,pickable:!0,colorRange:CR,opacity:.82})]),[i,e,t,d,r]),m=k.useCallback(()=>{u.current||(u.current=!0,f.current.onRebin(performance.now()-l.current))},[]);return B.jsx(ER,{views:new Va({repeat:!1}),viewState:n,controller:{dragRotate:r},layers:p,onViewStateChange:({viewState:y})=>o(y),onClick:g,onAfterRender:m,getTooltip:({object:y})=>{const _=y;return _?.count?{text:`${_.count.toLocaleString("en-US")} trips in this hexagon`}:null},style:{position:"absolute",inset:"0"}})}const sm=[{label:"fine",pixels:8},{label:"medium",pixels:14},{label:"coarse",pixels:24}];function TR(){const{useShinyInitialized:i,useSetShinyInput:e,useShinyOutputValue:t,useShinyOutputStatus:n}=window.shinyreact,s=i(),r=t("trip_points"),o=t("hex_summary"),a=n("hex_summary"),c=e("picked_hex",null),[l,u]=k.useState(sm[1].pixels),[f,d]=k.useState(!1),[g,p]=k.useState(null),[m,y]=k.useState({count:0,ms:0}),[_,v]=k.useState({longitude:-.1276,latitude:51.5072,zoom:10.2,pitch:0,bearing:0}),b=k.useMemo(()=>r?ym(r):null,[r]),x=IR([r,o]),w=k.useCallback(E=>{y(T=>({count:T.count+1,ms:E}))},[]),P=k.useCallback(E=>{p(E),c(E)},[c]);if(k.useEffect(()=>{v(E=>({...E,pitch:f?45:0}))},[f]),!s)return null;const L=ml(_.zoom,l);return B.jsxs("main",{className:"app",children:[B.jsxs("header",{children:[B.jsx("h1",{children:"City density"}),B.jsxs("p",{className:"claim",children:[r?gi(r.n):"500,000"," trips, binned into hexagons in the browser. Zoom and the bins are rebuilt. The server is not asked."]})]}),B.jsxs("div",{className:"toolbar",children:[B.jsxs("label",{children:["Bin size",B.jsx("select",{value:l,onChange:E=>u(Number(E.target.value)),children:sm.map(E=>B.jsx("option",{value:E.pixels,children:E.label},E.pixels))})]}),B.jsxs("label",{className:"check",children:[B.jsx("input",{type:"checkbox",checked:f,onChange:E=>d(E.target.checked)}),"Extrude"]}),B.jsxs("span",{className:"radius",children:["hex radius ",gi(L)," m at zoom ",_.zoom.toFixed(1)]}),B.jsxs("div",{className:"meters",children:[B.jsx(ll,{value:x,label:"server round trips"}),B.jsx(ll,{value:m.count,label:"rebins"}),B.jsx(ll,{value:m.ms.toFixed(0)+" ms",label:"last rebin"})]})]}),B.jsx("div",{className:"stage",children:b&&r?B.jsx(LR,{positions:b,count:r.n,boundary:r.boundary,viewState:_,binPixels:l,extruded:f,onViewState:v,onPick:P,onRebin:w}):B.jsx("p",{className:"skeleton",children:"Loading half a million trips..."})}),B.jsx("aside",{className:a==="recalculating"?"panel recalculating":"panel",children:g&&o&&o.count>0?B.jsxs(B.Fragment,{children:[B.jsxs("h2",{children:[gi(o.count)," trips under this hexagon"]}),B.jsxs("div",{className:"stats",children:[o.fare?B.jsx(rm,{label:"Fare",main:"£"+o.fare.median.toFixed(2),note:"median, 90th £"+o.fare.p90.toFixed(2)}):null,o.duration?B.jsx(rm,{label:"Duration",main:o.duration.median.toFixed(0)+" min",note:"median, mean "+o.duration.mean.toFixed(0)}):null]}),B.jsx("h3",{children:"By hour"}),B.jsx(AR,{hours:o.hours}),B.jsx("h3",{children:"Districts"}),B.jsx("ul",{className:"districts",children:o.districts.map(E=>B.jsxs("li",{children:[B.jsx("span",{className:"label",children:E.name}),B.jsx("span",{className:"value",children:gi(E.n)})]},E.name))}),B.jsx("p",{className:"note",children:"None of this was on the client. Positions were sent, the hour, the fare and the duration were not, so this panel is the one thing here that needed the server."})]}):B.jsx("p",{className:"hint",children:"Click a hexagon. Panning, zooming and changing the bin size stay in the browser, so the round trip counter does not move."})})]})}function rm({label:i,main:e,note:t}){return B.jsxs("div",{className:"stat",children:[B.jsx("span",{className:"stat-label",children:i}),B.jsx("span",{className:"stat-main",children:e}),B.jsx("span",{className:"stat-note",children:t})]})}function AR({hours:i}){const e=Math.max(1,...i);return B.jsx("ol",{className:"hours","aria-label":"Trips by hour of day",children:i.map((t,n)=>B.jsxs("li",{title:n+":00, "+gi(t)+" trips",children:[B.jsx("span",{style:{height:Math.round(t/e*100)+"%"}}),n%6===0?B.jsx("em",{children:n}):null]},n))})}function ll({value:i,label:e}){return B.jsxs("span",{className:"meter",children:[B.jsx("span",{className:"meter-value",children:i}),B.jsx("span",{className:"meter-label",children:e})]})}function IR(i){const[e,t]=k.useState(0),n=k.useRef([]);return k.useEffect(()=>{let s=0;for(let r=0;r<i.length;r+=1)i[r]!==void 0&&i[r]!==n.current[r]&&(s+=1);n.current=i.slice(),s>0&&t(r=>r+s)}),e}const{ReactDOM:MR}=window.shinyreact;MR.createRoot(document.body.appendChild(document.createElement("div"))).render(B.jsx(TR,{}));function Ee(i,e,t=!1){if(t)return e===1?"float":`vec${e}`;switch(i){case"uint8":case"uint16":case"uint32":return e===1?"uint":`uvec${e}`;case"sint8":case"sint16":case"sint32":return e===1?"int":`ivec${e}`;default:return e===1?"float":`vec${e}`}}function om(i,e,t=!1){let n;if(t)switch(i){case"uint8":n="unorm8";break;case"sint8":n="snorm8";break;case"uint16":n="unorm16";break;case"sint16":n="snorm16";break;case"float32":n="float32";break;default:throw new Error(`Unsupported normalized vertex format for ${i}`)}else n=i;return e===1?n:e===3&&!n.startsWith("float32")&&!n.endsWith("32")?`${n}x3-webgl`:`${n}x${e}`}function dr(i){switch(i[0]){case"u":return"0u";case"s":return"0";default:return"0."}}function RR(i,e){switch(i){case"uint8":case"uint16":case"uint32":return`${Math.trunc(e)}u`;case"sint8":case"sint16":case"sint32":return`${Math.trunc(e)}`;default:return Number.isInteger(e)?`${e}.0`:`${e}`}}function OR(i){switch(i){case"uint8":return"r8uint";case"sint8":return"r8sint";case"uint16":return"r16uint";case"sint16":return"r16sint";case"uint32":return"r32uint";case"sint32":return"r32sint";case"float32":return"r32float";default:throw new Error(`Unsupported WebGL gather texture format for ${i}`)}}function aB(i){return i}function BR(i){switch(i){case"uint32":return"usampler2D";case"sint32":return"isampler2D";case"float32":return"sampler2D";default:throw new Error(`Unsupported WebGL gather sampler type for ${i}`)}}const kR="GPGPU Operation Counts",DR="Transform Runs",FR=new Af;function at({module:i,elementWise:e=!1,expression:t,inputs:n,output:s,operationType:r=s.type,outputBuffer:o}){const a=o.device,c=hr("result",s.type,s.size,s.normalized),l=[i,c],u=[],f={},d=Ee(s.type,1,s.normalized),g=Ee(r,1,s.normalized);let p="",m=null;const y={TYPE:g,RESULT_LEN:s.size.toString()},_=NR(n);for(const[w,P]of _)l.push(am(w,P.type,P.size,P.normalized,r)),u.push(cm(w,P)),P instanceof $?f[w]=P.buffer:(m=m||Pe.createOrReuse(a,o.byteLength),f[w]=m),p+=`TYPE ${w}[${P.size}]; get_${w}(${w});
`,y[`${w.toUpperCase()}_LEN`]=P.size.toString();let v="";if(t)for(let w=0;w<s.size;w++)v+=`result[${w}]=${t(w)};
`;else if(e)for(let w=0;w<s.size;w++){const P=dr(g),L=_.map(([E,T])=>w<T.size?`${E}[${w}]`:P);v+=`result[${w}]=${i.name}(${L.join(", ")});
`}else v=`${i.name}(${_.map(([w])=>w).join(", ")}, result);`;const b=`#version 300 es

void main() {
${p}
${d} result[${s.size}];
${v}
set_result(result);
}
  `,x=new Ne(a,{vs:b,shaderAssembler:FR,defines:y,modules:l,bufferLayout:u,vertexCount:1,instanceCount:s.length,attributes:f,feedbackBufferMode:"interleaved",outputs:c.varyings});a.statsManager.getStats(kR).get(DR).incrementCount(),x.run({inputBuffers:f,outputBuffers:{[c.varyings[0]]:s.offset===0?o:{buffer:o,byteOffset:s.offset,byteLength:s.byteLength}}}),m&&Pe.recycle(m)}function NR(i){return Array.isArray(i)?i.map((e,t)=>[`x${t}`,e]):Object.entries(i)}function am(i,e,t,n=!1,s=e){let r="",o="";for(let c=0;c<t;c+=4){const l=Math.min(t-c,4),u=Ee(e,l,n);r+=`in ${u} a${i}_${c};
`;for(let f=0;f<l;f++){let d=`a${i}_${c}`;l>1&&(d=`${d}[${f}]`),(n||e!==s)&&(d=`TYPE(${d})`),o+=`v[${c+f}]=${d};
`}}const a=`
${r}
void get_${i}(out TYPE v[${t}]) {
  ${o}
}
`;return{name:i,vs:a}}function cm(i,e){const t={name:i,stepMode:e.isConstant?"vertex":"instance",byteStride:e.stride,attributes:[]};for(let n=0;n<e.size;n+=4){const s=Math.min(e.size-n,4);t.attributes.push({attribute:`a${i}_${n}`,format:om(e.type,s,e.normalized),byteOffset:e.offset+e.ValueType.BYTES_PER_ELEMENT*n})}return t}function hr(i,e,t,n=!1){const s=[],r=Ee(e,1,n);let o="",a="";for(let c=0;c<t;c+=4){const l=Math.min(t-c,4),u=Ee(e,l,n);s.push(`${i}_${c}`),o+=`flat out ${u} ${i}_${c};
`;const f=Array.from({length:l},(d,g)=>c+g);a+=`${i}_${c} = ${u}(${f.map(d=>`v[${d}]`).join(",")});
`}return{name:i,varyings:s,vs:`
${o}
void set_${i}(in ${r} v[${t}]) {
  ${a}
}
`}}const zR=`TYPE arithmetic_add(TYPE x, TYPE y) {
  return x + y;
}

TYPE arithmetic_subtract(TYPE x, TYPE y) {
  return x - y;
}

TYPE arithmetic_multiply(TYPE x, TYPE y) {
  return x * y;
}

TYPE arithmetic_divide(TYPE x, TYPE y) {
  return x / y;
}

float arithmetic_tan(float x) {
  return tan_fp32(x);
}
`,lm=({inputs:i,output:e,target:t})=>{const n=e.type,s=Ee(n,1,e.normalized),r=dr(s),o=i.namedInputs;return at({module:{name:"arithmetic",dependencies:[na],vs:zR},inputs:o,output:e,operationType:n,outputBuffer:t,expression:a=>mg(i.expression,{operations:pc,inputs:o,laneIndex:a,formatInput:c=>`${c}[${a}]`,formatOutOfBoundsInput:c=>o[c].size===1?`${c}[0]`:r,formatLiteral:c=>{const l=Array.isArray(c)?c[a]??0:c;return`${s}(${RR(n,l)})`},formatCall:(c,l)=>`${c}(${l.join(", ")})`})}),{success:!0}},UR="GPGPU Operation Counts",$R="Transform Runs",GR=({inputs:i,output:e,target:t})=>{const{sourceValues:n}=i,s=t.device;if(n.length===0){const f=new e.ValueType(e.length*e.size);return t.write(f),{success:!0,value:f}}if(n.isConstant){const f=n.value,d=new e.ValueType(e.length*e.size);for(let g=0;g<e.length;g++){const p=f[g];d[g*2]=p,d[g*2+1]=p}return t.write(d),{success:!0,value:d}}const r=s.createTexture({width:1,height:e.length,format:"rg32float",usage:H.RENDER|H.COPY_SRC|H.COPY_DST}),o=s.createFramebuffer({colorAttachments:[r]}),a=`#version 300 es

flat out float extent_value;

void main() {
  float sourceValues[SOURCE_VALUES_LEN];
  get_sourceValues(sourceValues);
  extent_value = sourceValues[gl_VertexID];

  float y = (float(gl_VertexID) + 0.5) / float(CHANNEL_COUNT) * 2.0 - 1.0;
  gl_Position = vec4(0.0, y, 0.0, 1.0);
  gl_PointSize = 1.0;
}
  `,c=`#version 300 es

precision highp float;

flat in float extent_value;
out vec2 fragColor;

void main() {
  fragColor = vec2(-extent_value, extent_value);
}
  `,l=new re(s,{vs:a,fs:c,topology:"point-list",parameters:{depthCompare:"always",blend:!0,blendColorSrcFactor:"one",blendColorDstFactor:"one",blendColorOperation:"max",blendAlphaSrcFactor:"one",blendAlphaDstFactor:"one",blendAlphaOperation:"max"},modules:[am("sourceValues",n.type,n.size,n.normalized)],defines:{TYPE:"float",SOURCE_VALUES_LEN:n.size.toString(),CHANNEL_COUNT:e.length.toString()},attributes:{sourceValues:n.buffer},bufferLayout:[cm("sourceValues",n)],instanceCount:n.length,vertexCount:e.length,disableWarnings:!0}),u=Pe.createOrReuse(s,e.byteLength);try{const f=s.beginRenderPass({framebuffer:o,parameters:{viewport:[0,0,1,e.length]},clearColor:[-um,-um,0,0],clearDepth:!1,clearStencil:!1});s.statsManager.getStats(UR).get($R).incrementCount(),l.draw(f),f.end();const d=s.createCommandEncoder();return d.copyTextureToBuffer({sourceTexture:r,width:1,height:e.length,destinationBuffer:u,byteOffset:0,bytesPerRow:8}),s.submit(d.finish()),lm({device:s,inputs:{expression:{kind:"call",op:"multiply",args:[{kind:"input",name:"x"},{kind:"literal",value:[-1,1]}]},namedInputs:{x:new $({buffer:u,size:2,type:"float32",length:e.length})}},output:e,target:t})}finally{l.destroy(),Pe.recycle(u),o.destroy(),r.destroy()}},um=3e38,VR=({inputs:i,output:e,target:t})=>{const n=i.map((c,l)=>[`x${l}`,c]);jR(t.device.limits.maxVertexAttributes,n),WR(t.device.limits.maxInterStageShaderVariables,e);const s=n.map(([c,l])=>`in TYPE ${c}[${l.size}]`).join(", ");let r=0;const o=n.map(([c,l])=>{const u=Array.from({length:l.size},(f,d)=>`  result[${r+d}] = ${c}[${d}];`).join(`
`);return r+=l.size,u}).join(`
`),a=`void interleave(${s}, out TYPE result[RESULT_LEN]) {
${o}
}
`;return at({module:{name:"interleave",vs:a},inputs:i,output:e,outputBuffer:t}),{success:!0}};function jR(i,e){const t=e.reduce((n,[,s])=>n+Math.ceil(s.size/4),0);if(t>i)throw new Error(`interleave() requires ${t} vertex attributes, exceeding device limit ${i}`)}function WR(i,e){if(e.size>i)throw new Error(`interleave() output size ${e.size} exceeds device inter-stage component limit ${i}`)}function HR(){const i=new Uint16Array([255]);return new Uint8Array(i.buffer)[0]>0}const YR=`#define LE ${HR()?1:0}
const uint F32_NAN = 0xffffffffu;
const uint F32_INF = 0x7f800000u;

// Find first set bit using binary search
// https://en.wikipedia.org/wiki/Find_first_set#CLZ
int countLeadingZeros(uint a) {
  if (a == 0u) return 32;
  int n = 0;
  if ((a & 0xffff0000u) == 0u) { n += 16; a = a << 16; }
  if ((a & 0xff000000u) == 0u) { n += 8;  a = a << 8;  }
  if ((a & 0xf0000000u) == 0u) { n += 4;  a = a << 4;  }
  if ((a & 0xc0000000u) == 0u) { n += 2;  a = a << 2;  }
  if ((a & 0x80000000u) == 0u) return n + 1;
  return n;
}

uint roundShiftRight(uint value, int shift) {
  if (shift <= 0) {
    return value << (-shift);
  }

  if (shift >= 32) {
    if (shift == 32 && value > 0x80000000u) {
      return 1u;
    }
    return 0u;
  }

  uint truncated = value >> shift;
  uint halfShift = 1u << (shift - 1);
  uint remainder = value & ((1u << shift) - 1u);
  if (remainder > halfShift || (remainder == halfShift && (truncated & 1u) == 1u)) {
    return truncated + 1u;
  }
  return truncated;
}

uint makeFloat_(uint sign, int exponent, uint mantissa) {
  return (sign << 31) | (uint(exponent + 127) << 23) | (mantissa & 0x7fffffu);
}

/**
 * Assemble a float32 in bit representation according to IEEE 754
 * https://en.wikipedia.org/wiki/Single-precision_floating-point_format
 */
uint makeFloat(uint sign, int exponent, uint significand) {
  if (significand == 0u) {
    return sign << 31;
  }

  // Remove any extra leading zeros for better precision
  int lead_zeros = countLeadingZeros(significand);
  // Significand is encoded as 1.fraction
  int normalizedExponent = exponent + 31 - lead_zeros;

  if (normalizedExponent > 127) {
    return (sign << 31) | F32_INF;
  }

  uint mantissa;
  if (normalizedExponent >= -126) {
    mantissa = roundShiftRight(significand, 8 - lead_zeros);
    if (mantissa >= 0x1000000u) {
      mantissa >>= 1;
      normalizedExponent++;
      if (normalizedExponent > 127) {
        return (sign << 31) | F32_INF;
      }
    }
    return makeFloat_(sign, normalizedExponent, mantissa);
  }

  int subnormalShift = -149 - exponent;
  mantissa = roundShiftRight(significand, subnormalShift);
  if (mantissa >= 0x800000u) {
    return (sign << 31) | (1u << 23);
  }
  return (sign << 31) | mantissa;
}

/**
 * Parse 8-byte memory as a float64 number according to IEEE 754
 * https://en.wikipedia.org/wiki/Double-precision_floating-point_format
 * Returns 8-byte memory as 2 float32 numbers, consisting of
 * high part: fround(d)
 * low part: d - fround(d)
 */
uvec2 parseAsDouble(uvec2 d) {
  #if LE
  d = d.yx; // to big endian
  #endif

  uint sign = (d[0] >> 31) & 1u; // first bit
  uint exponentBits = (d[0] >> 20) & 0x7ffu;
  int exponent = int(exponentBits) - 1023; // next 11 bits
  uint fractionHigh = d[0] & 0xfffffu;
  uint fractionLow = d[1];

  if (exponentBits == 0x7ffu) {
    if (fractionHigh == 0u && fractionLow == 0u) {
      return uvec2((sign << 31) | F32_INF, F32_NAN);
    }
    return uvec2(F32_NAN);
  }
  
  if (exponentBits == 0u) {
    // All float64 subnormals are too small to survive a float32 split.
    return uvec2(sign << 31);
  }

  if (exponent > 127) {
    return uvec2((sign << 31) | F32_INF, ((1u - sign) << 31) | F32_INF);
  }

  uint hi_part;
  uint low_part;

  // float64 significand has 52 bits
  // float32 significand has 23 bits
  // The significand of the high part is the significand of the double, trimmed
  uint f_hi = 0x800000u | (fractionHigh << 3) | (fractionLow >> 29);
  uint f_low = fractionLow & 0x1fffffffu;

  if (exponent < -126) {
    // For tiny normals, the top 24 significand bits still contribute to the float32
    // high part, but they land in the float32 subnormal range.
    hi_part = makeFloat(sign, exponent - 23, f_hi);

    // The residual keeps the remaining 29 significand bits at the original double scale.
    low_part = makeFloat(sign, exponent - 52, f_low);
    return uvec2(hi_part, low_part);
  }

  bool roundUp = f_low > 0x10000000u || (f_low == 0x10000000u && (f_hi & 1u) == 1u);

  uint f_rounded = f_hi + (roundUp ? 1u : 0u);
  int exponent_hi = exponent;
  if (f_rounded == 0x1000000u) {
    f_rounded = 0x800000u;
    exponent_hi++;
  }

  if (exponent_hi > 127) {
    // Overflows float32 limit
    hi_part = (sign << 31) | F32_INF;
    low_part = ((1u - sign) << 31) | F32_INF;
    return uvec2(hi_part, low_part);
  }
  
  hi_part = makeFloat_(sign, exponent_hi, f_rounded);

  int remainder = int(f_low);
  uint sign_low = sign;
  if (roundUp) {
    remainder -= 0x20000000;
  }
  if (remainder < 0) {
    sign_low = 1u - sign;
    remainder = -remainder;
  }
  low_part = makeFloat(sign_low, exponent - 52, uint(remainder));

  return uvec2(hi_part, low_part);
}

void fround(in uint x[X_LEN], out float result[X_LEN]) {
  int n = X_LEN / 2;
  for (int i = 0; i < n; i++) {
    uvec2 f = parseAsDouble(uvec2(x[i * 2], x[i * 2 + 1]));
    result[i] = uintBitsToFloat(f.x);
    result[i + n] = uintBitsToFloat(f.y);
  }
}
`,qR=({inputs:i,output:e,target:t})=>(at({module:{name:"fround",vs:YR},inputs:i,output:e,operationType:"uint32",outputBuffer:t}),{success:!0});function fm(i,e,t){const n=BR(t),s=Ee(e,1),r=Array.from({length:i.size},(o,a)=>`  v[${a}] = ${s}(texelFetch(source_values_texture, ivec2(${a}, rowIndex), 0).r);`).join(`
`);return{name:"source_values_texture",vs:`
uniform highp ${n} source_values_texture;
void read_source_values(int rowIndex, out TYPE v[${i.size}]) {
${r}
}
`}}function dm(i,e,t){const n=t.createTexture({width:Math.max(i.size,1),height:i.length,format:OR(e),usage:H.SAMPLE|H.COPY_DST});if(i.length===0)return n;const s=t.createCommandEncoder();return s.copyBufferToTexture({sourceBuffer:i.buffer,destinationTexture:n,byteOffset:i.offset,bytesPerRow:i.stride,rowsPerImage:i.length,size:[i.size,i.length,1]}),t.submit(s.finish()),n}const XR=async({inputs:i,output:e,target:t})=>{const{ids:n,sourceValues:s}=i,r=t.device,o=hr("result",e.type,e.size),a=Ee(n.type,1),c=Ee(e.type,1),l=e.type,u=dm(s,l,r),f=`#version 300 es

void main() {
  INDEX_TYPE ids[1];
  get_ids(ids);
  TYPE result[${e.size}];
  gather(ids, result);
  set_result(result);
}
  `,d=new Ne(r,{vs:f,defines:{INDEX_TYPE:a,TYPE:c,RESULT_LEN:e.size.toString(),SOURCE_VALUES_ROWS:s.length.toString()},modules:[ZR(n,a),fm(s,e.type,l),QR(e.type),o],bindings:{source_values_texture:u},bufferLayout:[KR(n)],vertexCount:1,instanceCount:e.length,feedbackBufferMode:"interleaved",outputs:o.varyings});try{return d.run({inputBuffers:{ids:n.buffer},outputBuffers:{[o.varyings[0]]:t}}),{success:!0}}finally{d.destroy(),u.destroy()}};function ZR(i,e){const t=Ee(i.type,1);let n="aids_0";return i.type!==JR(e)&&(n=`${e}(${n})`),{name:"ids",vs:`
in ${t} aids_0;
void get_ids(out INDEX_TYPE v[1]) {
  v[0] = ${n};
}
`}}function KR(i){return{name:"ids",stepMode:i.isConstant?"vertex":"instance",byteStride:i.stride,attributes:[{attribute:"aids_0",format:om(i.type,1,i.normalized),byteOffset:i.offset}]}}function QR(i){return{name:"gather",vs:`
void zero_result(out TYPE result[RESULT_LEN]) {
  for (int i = 0; i < RESULT_LEN; i++) {
    result[i] = ${dr(i)};
  }
}

void gather(in INDEX_TYPE ids[1], out TYPE result[RESULT_LEN]) {
  int sourceIndex = int(ids[0]);
  if (sourceIndex < 0 || sourceIndex >= SOURCE_VALUES_ROWS) {
    zero_result(result);
    return;
  }
  read_source_values(sourceIndex, result);
}
`}}function JR(i){switch(i){case"uint":return"uint32";case"int":return"sint32";default:return"float32"}}const eO=`void row_dot(in TYPE x[X_LEN], in TYPE y[Y_LEN], out float result[1]) {
  float sum = 0.0;
  for (int i = 0; i < X_LEN; i++) {
    sum += float(x[i]) * float(y[i]);
  }
  result[0] = sum;
}
`,tO=({inputs:i,output:e,target:t})=>(at({module:{name:"row_dot",vs:eO},inputs:i,output:e,operationType:"float32",outputBuffer:t}),{success:!0}),iO=`void equalAll(in TYPE x[X_LEN], in TYPE y[Y_LEN], out uint result[1]) {
  uint allEqual = uint(1);
  for (int i = 0; i < X_LEN; i++) {
    if (x[i] != y[i]) {
      allEqual = uint(0);
      break;
    }
  }
  result[0] = allEqual;
}
`,nO=({inputs:i,output:e,target:t})=>(at({module:{name:"equalAll",vs:iO},inputs:i,output:e,operationType:e.type==="uint32"?i.x.type:e.type,outputBuffer:t}),{success:!0}),sO=`void row_length(in TYPE x[X_LEN], out float result[1]) {
  float sum = 0.0;
  for (int i = 0; i < X_LEN; i++) {
    sum += float(x[i]) * float(x[i]);
  }
  result[0] = sqrt(sum);
}
`,rO=({inputs:i,output:e,target:t})=>(at({module:{name:"row_length",vs:sO},inputs:i,output:e,operationType:"float32",outputBuffer:t}),{success:!0}),oO=async({inputs:i,output:e,target:t})=>{const{segments:n}=i,s=t.device,r=hr("result",e.type,e.size),o=n.type,a=dm(n,o,s),c=new Ne(s,{vs:`#version 300 es

void main() {
  TYPE result[RESULT_LEN];
  segmentedMap(result);
  set_result(result);
}
`,defines:{TYPE:"uint",RESULT_LEN:e.size.toString(),SEGMENTS_LENGTH:n.length.toString()},modules:[fm(n,e.type,o),aO(),r],bindings:{source_values_texture:a},vertexCount:1,instanceCount:e.length,feedbackBufferMode:"interleaved",outputs:r.varyings});try{return c.run({outputBuffers:{[r.varyings[0]]:t}}),{success:!0}}finally{c.destroy(),a.destroy()}};function aO(){return{name:"segmentedMap",vs:`
uint read_segment_start(int segmentIndex) {
  TYPE value[1];
  read_source_values(segmentIndex, value);
  return uint(value[0]);
}

void segmentedMap(out TYPE result[RESULT_LEN]) {
  uint vertexIndex = uint(gl_InstanceID);
  int low = 0;
  int high = SEGMENTS_LENGTH;

  while (low < high) {
    int mid = low + (high - low) / 2;
    uint midStart = read_segment_start(mid);
    if (midStart <= vertexIndex) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  uint segmentIndex = uint(max(low - 1, 0));
  uint segmentStart = read_segment_start(int(segmentIndex));
  result[0] = segmentIndex;
  result[1] = vertexIndex - segmentStart;
}
`}}const cO=async({inputs:i,output:e,target:t})=>{const n=Ee(e.type,1,e.normalized),s=dr(n);return at({module:{name:"select",vs:""},inputs:i,output:e,operationType:e.type,outputBuffer:t,expression:r=>{const o=ul("condition",i.condition,r,s),a=ul("whenTrue",i.whenTrue,r,s),c=ul("whenFalse",i.whenFalse,r,s);return`(${o} != ${s} ? ${a} : ${c})`}}),{success:!0}};function ul(i,e,t,n){return t<e.size?`${i}[${t}]`:e.size===1?`${i}[0]`:n}const lO=Object.freeze(Object.defineProperty({__proto__:null,arithmetic:lm,dot:tO,equalAll:nO,extent:GR,fround:qR,gather:XR,interleave:VR,length:rO,segmentedMap:oO,select:cO,sequence:({inputs:i,output:e,target:t})=>{const n=hr("result",e.type,e.size),s=new Ne(t.device,{vs:`#version 300 es

void main() {
  int result[1];
  result[0] = START + gl_InstanceID * STEP;
  set_result(result);
}
`,defines:{START:i.start.toString(),STEP:i.step.toString()},modules:[n],vertexCount:1,instanceCount:e.length,feedbackBufferMode:"interleaved",outputs:n.varyings});try{return s.run({outputBuffers:{[n.varyings[0]]:t}}),{success:!0}}finally{s.destroy()}},swizzle:({inputs:i,output:e,target:t})=>{const{columns:n}=i;return at({module:{name:"swizzle",vs:"// swizzle expression handled inline"},expression:s=>`x[${n[s]}]`,inputs:{x:i.x},output:e,outputBuffer:t}),{success:!0}}},Symbol.toStringTag,{value:"Module"}))})(window.shinyreact.React);
