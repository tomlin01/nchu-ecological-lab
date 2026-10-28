(()=>{var Tc="186";var Ac=0,ja=1,Rc=2;var Ps=1,Cc=2,rs=3,ci=0,Wt=1,Xt=2,Cn=0,Ls=1,Qa=2,eo=3,to=4,Ic=5;var as=100,Pc=101,Lc=102,Nc=103,Dc=104,Uc=200,Fc=201,Oc=202,Bc=203,zc=204,kc=205,Hc=206,Gc=207,Vc=208,Wc=209,Xc=210,qc=211,Yc=212,Zc=213,$c=214,Jc=0,Kc=1,jc=2,no=3,Qc=4,eh=5,th=6,nh=7,ih=0,sh=1,rh=2,xn=0,io=1,so=2,ro=3,Ns=4,ao=5,oo=6,lo=7;var os=301,Ti=302,Pr=303,Lr=304,Ds=306,ah=1000,Nr=1001,oh=1002,hi=1003,lh=1004;var Us=1005;var Qt=1006,Dr=1007;var Ai=1008;var yn=1009,ch=1010,hh=1011,Fs=1012,co=1013,ui=1014,Yn=1015,In=1016,ho=1017,uo=1018,ls=1020,uh=35902,dh=35899,fh=1021,ph=1022,Pn=1023,Ri=1026,Ci=1027,mh=1028,fo=1029,Ii=1030,po=1031;var mo=1033,Ur=33776,Fr=33777,Or=33778,Br=33779,go=35840,_o=35841,xo=35842,yo=35843,vo=36196,So=37492,Mo=37496,bo=37488,Eo=37489,zr=37490,wo=37491,To=37808,Ao=37809,Ro=37810,Co=37811,Io=37812,Po=37813,Lo=37814,No=37815,Do=37816,Uo=37817,Fo=37818,Oo=37819,Bo=37820,zo=37821,ko=36492,Ho=36494,Go=36495,Vo=36283,Wo=36284,kr=36285,Xo=36286;var qo=0,gh=1,Pi="",Hr="srgb",Yo="srgb-linear",Zo="linear",gt="srgb";var _h=512,xh=513,yh=514,Gr=515,vh=516,Sh=517,Vr=518,Mh=519;var $o="300 es",Jo=2000;function Wu(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Xu(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Is(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function bh(){let e=Is("canvas");return e.style.display="block",e}var Ql={},ss=null;function Ko(...e){let t="THREE."+e.shift();if(ss)ss("log",t,...e);else console.log(t,...e)}function Eh(e){let t=e[0];if(typeof t==="string"&&t.startsWith("TSL:")){let n=e[1];if(n&&n.isStackTrace)e[0]+=" "+n.getLocation();else e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function Ne(...e){e=Eh(e);let t="THREE."+e.shift();if(ss)ss("warn",t,...e);else{let n=e[0];if(n&&n.isStackTrace)console.warn(n.getError(t));else console.warn(t,...e)}}function Ue(...e){e=Eh(e);let t="THREE."+e.shift();if(ss)ss("error",t,...e);else{let n=e[0];if(n&&n.isStackTrace)console.error(n.getError(t));else console.error(t,...e)}}function wi(...e){let t=e.join(" ");if(t in Ql)return;Ql[t]=!0,Ne(...e)}function wh(e,t,n){return new Promise(function(i,s){function r(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:s();break;case e.TIMEOUT_EXPIRED:setTimeout(r,n);break;default:i()}}setTimeout(r,n)})}var Th={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class Zn{addEventListener(e,t){if(this._listeners===void 0)this._listeners={};let n=this._listeners;if(n[e]===void 0)n[e]=[];if(n[e].indexOf(t)===-1)n[e].push(t)}hasEventListener(e,t){let n=this._listeners;if(n===void 0)return!1;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);if(s!==-1)i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,e);e.target=null}}}var Ht=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var wa=Math.PI/180,Ar=180/Math.PI;function Os(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ht[e&255]+Ht[e>>8&255]+Ht[e>>16&255]+Ht[e>>24&255]+"-"+Ht[t&255]+Ht[t>>8&255]+"-"+Ht[t>>16&15|64]+Ht[t>>24&255]+"-"+Ht[n&63|128]+Ht[n>>8&255]+"-"+Ht[n>>16&255]+Ht[n>>24&255]+Ht[i&255]+Ht[i>>8&255]+Ht[i>>16&255]+Ht[i>>24&255]).toLowerCase()}function qe(e,t,n){return Math.max(t,Math.min(n,e))}function qu(e,t){return(e%t+t)%t}function Ta(e,t,n){return(1-n)*e+n*t}function Ms(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function jt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}class Be{static{Be.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,r=this.y-e.y;return this.x=s*n-r*i+e.x,this.y=s*i+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $n{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,r,a){let o=n[i+0],l=n[i+1],c=n[i+2],d=n[i+3],f=s[r+0],h=s[r+1],m=s[r+2],x=s[r+3];if(d!==x||o!==f||l!==h||c!==m){let b=o*f+l*h+c*m+d*x;if(b<0)f=-f,h=-h,m=-m,x=-x,b=-b;let p=1-a;if(b<0.9995){let u=Math.acos(b),w=Math.sin(u);p=Math.sin(p*u)/w,a=Math.sin(a*u)/w,o=o*p+f*a,l=l*p+h*a,c=c*p+m*a,d=d*p+x*a}else{o=o*p+f*a,l=l*p+h*a,c=c*p+m*a,d=d*p+x*a;let u=1/Math.sqrt(o*o+l*l+c*c+d*d);o*=u,l*=u,c*=u,d*=u}}e[t]=o,e[t+1]=l,e[t+2]=c,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,r){let a=n[i],o=n[i+1],l=n[i+2],c=n[i+3],d=s[r],f=s[r+1],h=s[r+2],m=s[r+3];return e[t]=a*m+c*d+o*h-l*f,e[t+1]=o*m+c*f+l*d-a*h,e[t+2]=l*m+c*h+a*f-o*d,e[t+3]=c*m-a*d-o*f-l*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let{_x:n,_y:i,_z:s,_order:r}=e,{cos:a,sin:o}=Math,l=a(n/2),c=a(i/2),d=a(s/2),f=o(n/2),h=o(i/2),m=o(s/2);switch(r){case"XYZ":this._x=f*c*d+l*h*m,this._y=l*h*d-f*c*m,this._z=l*c*m+f*h*d,this._w=l*c*d-f*h*m;break;case"YXZ":this._x=f*c*d+l*h*m,this._y=l*h*d-f*c*m,this._z=l*c*m-f*h*d,this._w=l*c*d+f*h*m;break;case"ZXY":this._x=f*c*d-l*h*m,this._y=l*h*d+f*c*m,this._z=l*c*m+f*h*d,this._w=l*c*d-f*h*m;break;case"ZYX":this._x=f*c*d-l*h*m,this._y=l*h*d+f*c*m,this._z=l*c*m-f*h*d,this._w=l*c*d+f*h*m;break;case"YZX":this._x=f*c*d+l*h*m,this._y=l*h*d+f*c*m,this._z=l*c*m-f*h*d,this._w=l*c*d-f*h*m;break;case"XZY":this._x=f*c*d-l*h*m,this._y=l*h*d-f*c*m,this._z=l*c*m+f*h*d,this._w=l*c*d+f*h*m;break;default:Ne("Quaternion: .setFromEuler() encountered an unknown order: "+r)}if(t===!0)this._onChangeCallback();return this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],d=t[10],f=n+a+d;if(f>0){let h=0.5/Math.sqrt(f+1);this._w=0.25/h,this._x=(c-o)*h,this._y=(s-l)*h,this._z=(r-i)*h}else if(n>a&&n>d){let h=2*Math.sqrt(1+n-a-d);this._w=(c-o)/h,this._x=0.25*h,this._y=(i+r)/h,this._z=(s+l)/h}else if(a>d){let h=2*Math.sqrt(1+a-n-d);this._w=(s-l)/h,this._x=(i+r)/h,this._y=0.25*h,this._z=(o+c)/h}else{let h=2*Math.sqrt(1+d-n-a);this._w=(r-i)/h,this._x=(s+l)/h,this._y=(o+c)/h,this._z=0.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;if(n<0.00000001)if(n=0,Math.abs(e.x)>Math.abs(e.z))this._x=-e.y,this._y=e.x,this._z=0,this._w=n;else this._x=0,this._y=-e.z,this._z=e.y,this._w=n;else this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n;return this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();if(e===0)this._x=0,this._y=0,this._z=0,this._w=1;else e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e;return this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let{_x:n,_y:i,_z:s,_w:r}=e,{_x:a,_y:o,_z:l,_w:c}=t;return this._x=n*c+r*a+i*l-s*o,this._y=i*c+r*o+s*a-n*l,this._z=s*c+r*l+n*o-i*a,this._w=r*c-n*a-i*o-s*l,this._onChangeCallback(),this}slerp(e,t){let{_x:n,_y:i,_z:s,_w:r}=e,a=this.dot(e);if(a<0)n=-n,i=-i,s=-s,r=-r,a=-a;let o=1-t;if(a<0.9995){let l=Math.acos(a),c=Math.sin(l);o=Math.sin(o*l)/c,t=Math.sin(t*l)/c,this._x=this._x*o+n*t,this._y=this._y*o+i*t,this._z=this._z*o+s*t,this._w=this._w*o+r*t,this._onChangeCallback()}else this._x=this._x*o+n*t,this._y=this._y*o+i*t,this._z=this._z*o+s*t,this._w=this._w*o+r*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{static{C.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){if(n===void 0)n=this.z;return this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ec.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ec.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,r=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,{x:s,y:r,z:a,w:o}=e,l=2*(r*i-a*n),c=2*(a*t-s*i),d=2*(s*n-r*t);return this.x=t+o*l+r*d-a*c,this.y=n+o*c+a*l-s*d,this.z=i+o*d+s*c-r*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let{x:n,y:i,z:s}=e,{x:r,y:a,z:o}=t;return this.x=i*o-s*a,this.y=s*r-n*o,this.z=n*a-i*r,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Aa.copy(this).projectOnVector(e),this.sub(Aa)}reflect(e){return this.sub(Aa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var Aa=new C,ec=new $n;class Ge{static{Ge.prototype.isMatrix3=!0}constructor(e,t,n,i,s,r,a,o,l){if(this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0)this.set(e,t,n,i,s,r,a,o,l)}set(e,t,n,i,s,r,a,o,l){let c=this.elements;return c[0]=e,c[1]=i,c[2]=a,c[3]=t,c[4]=s,c[5]=o,c[6]=n,c[7]=r,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,r=n[0],a=n[3],o=n[6],l=n[1],c=n[4],d=n[7],f=n[2],h=n[5],m=n[8],x=i[0],b=i[3],p=i[6],u=i[1],w=i[4],T=i[7],y=i[2],M=i[5],R=i[8];return s[0]=r*x+a*u+o*y,s[3]=r*b+a*w+o*M,s[6]=r*p+a*T+o*R,s[1]=l*x+c*u+d*y,s[4]=l*b+c*w+d*M,s[7]=l*p+c*T+d*R,s[2]=f*x+h*u+m*y,s[5]=f*b+h*w+m*M,s[8]=f*p+h*T+m*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],a=e[5],o=e[6],l=e[7],c=e[8];return t*r*c-t*a*l-n*s*c+n*a*o+i*s*l-i*r*o}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],a=e[5],o=e[6],l=e[7],c=e[8],d=c*r-a*l,f=a*o-c*s,h=l*s-r*o,m=t*d+n*f+i*h;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/m;return e[0]=d*x,e[1]=(i*l-c*n)*x,e[2]=(a*n-i*r)*x,e[3]=f*x,e[4]=(c*t-i*o)*x,e[5]=(i*s-a*t)*x,e[6]=h*x,e[7]=(n*o-l*t)*x,e[8]=(r*t-n*s)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,r,a){let o=Math.cos(s),l=Math.sin(s);return this.set(n*o,n*l,-n*(o*r+l*a)+r+e,-i*l,i*o,-i*(-l*r+o*a)+a+t,0,0,1),this}scale(e,t){return wi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ra.makeScale(e,t)),this}rotate(e){return wi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ra.makeRotation(-e)),this}translate(e,t){return wi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ra.makeTranslation(e,t)),this}makeTranslation(e,t){if(e.isVector2)this.set(1,0,e.x,0,1,e.y,0,0,1);else this.set(1,0,e,0,1,t,0,0,1);return this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}var Ra=new Ge,tc=new Ge().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),nc=new Ge().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function Yu(){let e={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(s,r,a){if(this.enabled===!1||r===a||!r||!a)return s;if(this.spaces[r].transfer==="srgb")s.r=Xn(s.r),s.g=Xn(s.g),s.b=Xn(s.b);if(this.spaces[r].primaries!==this.spaces[a].primaries)s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ);if(this.spaces[a].transfer==="srgb")s.r=is(s.r),s.g=is(s.g),s.b=is(s.b);return s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){if(s==="")return"linear";return this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return wi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return wi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(s,r)}},t=[0.64,0.33,0.3,0.6,0.15,0.06],n=[0.2126,0.7152,0.0722],i=[0.3127,0.329];return e.define({["srgb-linear"]:{primaries:t,whitePoint:i,transfer:"linear",toXYZ:tc,fromXYZ:nc,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:t,whitePoint:i,transfer:"srgb",toXYZ:tc,fromXYZ:nc,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),e}var je=Yu();function Xn(e){return e<0.04045?e*0.0773993808:Math.pow(e*0.9478672986+0.0521327014,2.4)}function is(e){return e<0.0031308?e*12.92:1.055*Math.pow(e,0.41666)-0.055}var Vi;class jo{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src))return e.src;if(typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{if(Vi===void 0)Vi=Is("canvas");Vi.width=e.width,Vi.height=e.height;let i=Vi.getContext("2d");if(e instanceof ImageData)i.putImageData(e,0,0);else i.drawImage(e,0,0,e.width,e.height);n=Vi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Is("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=Xn(s[r]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)if(t instanceof Uint8Array||t instanceof Uint8ClampedArray)t[n]=Math.floor(Xn(t[n]/255)*255);else t[n]=Xn(t[n]);return{data:t,width:e.width,height:e.height}}else return Ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}var Zu=0;class Bs{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Zu++}),this.uuid=Os(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;if(typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement)e.set(t.videoWidth,t.videoHeight,0);else if(typeof VideoFrame<"u"&&t instanceof VideoFrame)e.set(t.displayWidth,t.displayHeight,0);else if(t!==null)e.set(t.width,t.height,t.depth||0);else e.set(0,0,0);return e}set needsUpdate(e){if(e===!0)this.version++}toJSON(e){let t=e===void 0||typeof e==="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,a=i.length;r<a;r++)if(i[r].isDataTexture)s.push(Ca(i[r].image));else s.push(Ca(i[r]))}else s=Ca(i);n.url=s}if(!t)e.images[this.uuid]=n;return n}}function Ca(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap)return jo.getDataURL(e);else if(e.data)return{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name};else return Ne("Texture: Unable to serialize Texture."),{}}var $u=0,Ia=new C;class Vt extends Zn{constructor(e=Vt.DEFAULT_IMAGE,t=Vt.DEFAULT_MAPPING,n=1001,i=1001,s=1006,r=1008,a=1023,o=1009,l=Vt.DEFAULT_ANISOTROPY,c=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:$u++}),this.uuid=Os(),this.name="",this.source=new Bs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=o,this.offset=new Be(0,0),this.repeat=new Be(1,1),this.center=new Be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=e&&e.depth&&e.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ia).x}get height(){return this.source.getSize(Ia).y}get depth(){return this.source.getSize(Ia).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ne(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Ne(`Texture.setValues(): property '${t}' does not exist.`);continue}if(i&&n&&(i.isVector2&&n.isVector2))i.copy(n);else if(i&&n&&(i.isVector3&&n.isVector3))i.copy(n);else if(i&&n&&(i.isMatrix3&&n.isMatrix3))i.copy(n);else this[t]=n}}toJSON(e){let t=e===void 0||typeof e==="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)n.userData=this.userData;if(!t)e.textures[this.uuid]=n;return n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1000:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(e.x)%2)===1)e.x=Math.ceil(e.x)-e.x;else e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case 1000:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(e.y)%2)===1)e.y=Math.ceil(e.y)-e.y;else e.y=e.y-Math.floor(e.y);break}if(this.flipY)e.y=1-e.y;return e}set needsUpdate(e){if(e===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(e){if(e===!0)this.pmremVersion++}}Vt.DEFAULT_IMAGE=null;Vt.DEFAULT_MAPPING=300;Vt.DEFAULT_ANISOTROPY=1;class yt{static{yt.prototype.isVector4=!0}constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*t+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*t+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*t+r[7]*n+r[11]*i+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);if(t<0.0001)this.x=1,this.y=0,this.z=0;else this.x=e.x/t,this.y=e.y/t,this.z=e.z/t;return this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,r=0.01,a=0.1,o=e.elements,l=o[0],c=o[4],d=o[8],f=o[1],h=o[5],m=o[9],x=o[2],b=o[6],p=o[10];if(Math.abs(c-f)<0.01&&Math.abs(d-x)<0.01&&Math.abs(m-b)<0.01){if(Math.abs(c+f)<0.1&&Math.abs(d+x)<0.1&&Math.abs(m+b)<0.1&&Math.abs(l+h+p-3)<0.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(l+1)/2,T=(h+1)/2,y=(p+1)/2,M=(c+f)/4,R=(d+x)/4,A=(m+b)/4;if(w>T&&w>y)if(w<0.01)n=0,i=0.707106781,s=0.707106781;else n=Math.sqrt(w),i=M/n,s=R/n;else if(T>y)if(T<0.01)n=0.707106781,i=0,s=0.707106781;else i=Math.sqrt(T),n=M/i,s=A/i;else if(y<0.01)n=0.707106781,i=0.707106781,s=0;else s=Math.sqrt(y),n=R/s,i=A/s;return this.set(n,i,s,t),this}let u=Math.sqrt((b-m)*(b-m)+(d-x)*(d-x)+(f-c)*(f-c));if(Math.abs(u)<0.001)u=1;return this.x=(b-m)/u,this.y=(d-x)/u,this.z=(f-c)/u,this.w=Math.acos((l+h+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this.w=qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this.w=qe(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Qo extends Zn{constructor(e=1,t=1,n={}){super();n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t),this.textures=[];let i={width:e,height:t,depth:n.depth},s=new Vt(i),r=n.count;for(let a=0;a<r;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(e.mapping!==void 0)t.mapping=e.mapping;if(e.wrapS!==void 0)t.wrapS=e.wrapS;if(e.wrapT!==void 0)t.wrapT=e.wrapT;if(e.wrapR!==void 0)t.wrapR=e.wrapR;if(e.magFilter!==void 0)t.magFilter=e.magFilter;if(e.minFilter!==void 0)t.minFilter=e.minFilter;if(e.format!==void 0)t.format=e.format;if(e.type!==void 0)t.type=e.type;if(e.anisotropy!==void 0)t.anisotropy=e.anisotropy;if(e.colorSpace!==void 0)t.colorSpace=e.colorSpace;if(e.flipY!==void 0)t.flipY=e.flipY;if(e.generateMipmaps!==void 0)t.generateMipmaps=e.generateMipmaps;if(e.internalFormat!==void 0)t.internalFormat=e.internalFormat;for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){if(this._depthTexture!==null&&this._depthTexture.renderTarget===this)this._depthTexture.renderTarget=null;if(e!==null&&e.renderTarget===null)e.renderTarget=this;this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)if(this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0)this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Bs(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class an extends Qo{constructor(e=1,t=1,n={}){super(e,t,n);this.isWebGLRenderTarget=!0}}class Wr extends Vt{constructor(e=null,t=1,n=1,i=1){super(null);this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class el extends Vt{constructor(e=null,t=1,n=1,i=1){super(null);this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class at{static{at.prototype.isMatrix4=!0}constructor(e,t,n,i,s,r,a,o,l,c,d,f,h,m,x,b){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0)this.set(e,t,n,i,s,r,a,o,l,c,d,f,h,m,x,b)}set(e,t,n,i,s,r,a,o,l,c,d,f,h,m,x,b){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=r,p[9]=a,p[13]=o,p[2]=l,p[6]=c,p[10]=d,p[14]=f,p[3]=h,p[7]=m,p[11]=x,p[15]=b,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){if(this.determinantAffine()===0)return e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this;return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,i=1/Wi.setFromMatrixColumn(e,0).length(),s=1/Wi.setFromMatrixColumn(e,1).length(),r=1/Wi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,{x:n,y:i,z:s}=e,r=Math.cos(n),a=Math.sin(n),o=Math.cos(i),l=Math.sin(i),c=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let f=r*c,h=r*d,m=a*c,x=a*d;t[0]=o*c,t[4]=-o*d,t[8]=l,t[1]=h+m*l,t[5]=f-x*l,t[9]=-a*o,t[2]=x-f*l,t[6]=m+h*l,t[10]=r*o}else if(e.order==="YXZ"){let f=o*c,h=o*d,m=l*c,x=l*d;t[0]=f+x*a,t[4]=m*a-h,t[8]=r*l,t[1]=r*d,t[5]=r*c,t[9]=-a,t[2]=h*a-m,t[6]=x+f*a,t[10]=r*o}else if(e.order==="ZXY"){let f=o*c,h=o*d,m=l*c,x=l*d;t[0]=f-x*a,t[4]=-r*d,t[8]=m+h*a,t[1]=h+m*a,t[5]=r*c,t[9]=x-f*a,t[2]=-r*l,t[6]=a,t[10]=r*o}else if(e.order==="ZYX"){let f=r*c,h=r*d,m=a*c,x=a*d;t[0]=o*c,t[4]=m*l-h,t[8]=f*l+x,t[1]=o*d,t[5]=x*l+f,t[9]=h*l-m,t[2]=-l,t[6]=a*o,t[10]=r*o}else if(e.order==="YZX"){let f=r*o,h=r*l,m=a*o,x=a*l;t[0]=o*c,t[4]=x-f*d,t[8]=m*d+h,t[1]=d,t[5]=r*c,t[9]=-a*c,t[2]=-l*c,t[6]=h*d+m,t[10]=f-x*d}else if(e.order==="XZY"){let f=r*o,h=r*l,m=a*o,x=a*l;t[0]=o*c,t[4]=-d,t[8]=l*c,t[1]=f*d+x,t[5]=r*c,t[9]=h*d-m,t[2]=m*d-h,t[6]=a*c,t[10]=x*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ju,e,Ku)}lookAt(e,t,n){let i=this.elements;if(nn.subVectors(e,t),nn.lengthSq()===0)nn.z=1;if(nn.normalize(),si.crossVectors(n,nn),si.lengthSq()===0){if(Math.abs(n.z)===1)nn.x+=0.0001;else nn.z+=0.0001;nn.normalize(),si.crossVectors(n,nn)}return si.normalize(),rr.crossVectors(nn,si),i[0]=si.x,i[4]=rr.x,i[8]=nn.x,i[1]=si.y,i[5]=rr.y,i[9]=nn.y,i[2]=si.z,i[6]=rr.z,i[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,r=n[0],a=n[4],o=n[8],l=n[12],c=n[1],d=n[5],f=n[9],h=n[13],m=n[2],x=n[6],b=n[10],p=n[14],u=n[3],w=n[7],T=n[11],y=n[15],M=i[0],R=i[4],A=i[8],g=i[12],S=i[1],B=i[5],I=i[9],F=i[13],J=i[2],P=i[6],W=i[10],ee=i[14],V=i[3],re=i[7],q=i[11],te=i[15];return s[0]=r*M+a*S+o*J+l*V,s[4]=r*R+a*B+o*P+l*re,s[8]=r*A+a*I+o*W+l*q,s[12]=r*g+a*F+o*ee+l*te,s[1]=c*M+d*S+f*J+h*V,s[5]=c*R+d*B+f*P+h*re,s[9]=c*A+d*I+f*W+h*q,s[13]=c*g+d*F+f*ee+h*te,s[2]=m*M+x*S+b*J+p*V,s[6]=m*R+x*B+b*P+p*re,s[10]=m*A+x*I+b*W+p*q,s[14]=m*g+x*F+b*ee+p*te,s[3]=u*M+w*S+T*J+y*V,s[7]=u*R+w*B+T*P+y*re,s[11]=u*A+w*I+T*W+y*q,s[15]=u*g+w*F+T*ee+y*te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],r=e[1],a=e[5],o=e[9],l=e[13],c=e[2],d=e[6],f=e[10],h=e[14],m=e[3],x=e[7],b=e[11],p=e[15],u=o*h-l*f,w=a*h-l*d,T=a*f-o*d,y=r*h-l*c,M=r*f-o*c,R=r*d-a*c;return t*(x*u-b*w+p*T)-n*(m*u-b*y+p*M)+i*(m*w-x*y+p*R)-s*(m*T-x*M+b*R)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[1],r=e[5],a=e[9],o=e[2],l=e[6],c=e[10];return t*(r*c-a*l)-n*(s*c-a*o)+i*(s*l-r*o)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;if(e.isVector3)i[12]=e.x,i[13]=e.y,i[14]=e.z;else i[12]=e,i[13]=t,i[14]=n;return this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],r=e[4],a=e[5],o=e[6],l=e[7],c=e[8],d=e[9],f=e[10],h=e[11],m=e[12],x=e[13],b=e[14],p=e[15],u=t*a-n*r,w=t*o-i*r,T=t*l-s*r,y=n*o-i*a,M=n*l-s*a,R=i*l-s*o,A=c*x-d*m,g=c*b-f*m,S=c*p-h*m,B=d*b-f*x,I=d*p-h*x,F=f*p-h*b,J=u*F-w*I+T*B+y*S-M*g+R*A;if(J===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let P=1/J;return e[0]=(a*F-o*I+l*B)*P,e[1]=(i*I-n*F-s*B)*P,e[2]=(x*R-b*M+p*y)*P,e[3]=(f*M-d*R-h*y)*P,e[4]=(o*S-r*F-l*g)*P,e[5]=(t*F-i*S+s*g)*P,e[6]=(b*T-m*R-p*w)*P,e[7]=(c*R-f*T+h*w)*P,e[8]=(r*I-a*S+l*A)*P,e[9]=(n*S-t*I-s*A)*P,e[10]=(m*M-x*T+p*u)*P,e[11]=(d*T-c*M-h*u)*P,e[12]=(a*g-r*B-o*A)*P,e[13]=(t*B-n*g+i*A)*P,e[14]=(x*w-m*y-b*u)*P,e[15]=(c*y-d*w+f*u)*P,this}scale(e){let t=this.elements,{x:n,y:i,z:s}=e;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){if(e.isVector3)this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1);else this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1);return this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,{x:r,y:a,z:o}=e,l=s*r,c=s*a;return this.set(l*r+n,l*a-i*o,l*o+i*a,0,l*a+i*o,c*a+n,c*o-i*r,0,l*o-i*a,c*o+i*r,s*o*o+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,r){return this.set(1,n,s,0,e,1,r,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,{_x:s,_y:r,_z:a,_w:o}=t,l=s+s,c=r+r,d=a+a,f=s*l,h=s*c,m=s*d,x=r*c,b=r*d,p=a*d,u=o*l,w=o*c,T=o*d,{x:y,y:M,z:R}=n;return i[0]=(1-(x+p))*y,i[1]=(h+T)*y,i[2]=(m-w)*y,i[3]=0,i[4]=(h-T)*M,i[5]=(1-(f+p))*M,i[6]=(b+u)*M,i[7]=0,i[8]=(m+w)*R,i[9]=(b-u)*R,i[10]=(1-(f+x))*R,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let r=Wi.set(i[0],i[1],i[2]).length(),a=Wi.set(i[4],i[5],i[6]).length(),o=Wi.set(i[8],i[9],i[10]).length();if(s<0)r=-r;mn.copy(this);let l=1/r,c=1/a,d=1/o;return mn.elements[0]*=l,mn.elements[1]*=l,mn.elements[2]*=l,mn.elements[4]*=c,mn.elements[5]*=c,mn.elements[6]*=c,mn.elements[8]*=d,mn.elements[9]*=d,mn.elements[10]*=d,t.setFromRotationMatrix(mn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,r,a=2000,o=!1){let l=this.elements,c=2*s/(t-e),d=2*s/(n-i),f=(t+e)/(t-e),h=(n+i)/(n-i),m,x;if(o)m=s/(r-s),x=r*s/(r-s);else if(a===2000)m=-(r+s)/(r-s),x=-2*r*s/(r-s);else if(a===2001)m=-r/(r-s),x=-r*s/(r-s);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,r,a=2000,o=!1){let l=this.elements,c=2/(t-e),d=2/(n-i),f=-(t+e)/(t-e),h=-(n+i)/(n-i),m,x;if(o)m=1/(r-s),x=r/(r-s);else if(a===2000)m=-2/(r-s),x=-(r+s)/(r-s);else if(a===2001)m=-1/(r-s),x=-s/(r-s);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=h,l[2]=0,l[6]=0,l[10]=m,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}var Wi=new C,mn=new at,Ju=new C(0,0,0),Ku=new C(1,1,1),si=new C,rr=new C,nn=new C,ic=new at,sc=new $n;class qn{constructor(e=0,t=0,n=0,i=qn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],r=i[4],a=i[8],o=i[1],l=i[5],c=i[9],d=i[2],f=i[6],h=i[10];switch(t){case"XYZ":if(this._y=Math.asin(qe(a,-1,1)),Math.abs(a)<0.9999999)this._x=Math.atan2(-c,h),this._z=Math.atan2(-r,s);else this._x=Math.atan2(f,l),this._z=0;break;case"YXZ":if(this._x=Math.asin(-qe(c,-1,1)),Math.abs(c)<0.9999999)this._y=Math.atan2(a,h),this._z=Math.atan2(o,l);else this._y=Math.atan2(-d,s),this._z=0;break;case"ZXY":if(this._x=Math.asin(qe(f,-1,1)),Math.abs(f)<0.9999999)this._y=Math.atan2(-d,h),this._z=Math.atan2(-r,l);else this._y=0,this._z=Math.atan2(o,s);break;case"ZYX":if(this._y=Math.asin(-qe(d,-1,1)),Math.abs(d)<0.9999999)this._x=Math.atan2(f,h),this._z=Math.atan2(o,s);else this._x=0,this._z=Math.atan2(-r,l);break;case"YZX":if(this._z=Math.asin(qe(o,-1,1)),Math.abs(o)<0.9999999)this._x=Math.atan2(-c,l),this._y=Math.atan2(-d,s);else this._x=0,this._y=Math.atan2(a,h);break;case"XZY":if(this._z=Math.asin(-qe(r,-1,1)),Math.abs(r)<0.9999999)this._x=Math.atan2(f,l),this._y=Math.atan2(a,s);else this._x=Math.atan2(-c,h),this._y=0;break;default:Ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}if(this._order=t,n===!0)this._onChangeCallback();return this}setFromQuaternion(e,t,n){return ic.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ic,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return sc.setFromEuler(this),this.setFromQuaternion(sc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){if(this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0)this._order=e[3];return this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qn.DEFAULT_ORDER="XYZ";class Xr{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}var ju=0,rc=new C,Xi=new $n,kn=new at,ar=new C,bs=new C,Qu=new C,ed=new $n,ac=new C(1,0,0),oc=new C(0,1,0),lc=new C(0,0,1),cc={type:"added"},td={type:"removed"},qi={type:"childadded",child:null},Pa={type:"childremoved",child:null};class Mt extends Zn{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:ju++}),this.uuid=Os(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mt.DEFAULT_UP.clone();let e=new C,t=new qn,n=new $n,i=new C(1,1,1);function s(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new at},normalMatrix:{value:new Ge}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=Mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Xi.setFromAxisAngle(e,t),this.quaternion.multiply(Xi),this}rotateOnWorldAxis(e,t){return Xi.setFromAxisAngle(e,t),this.quaternion.premultiply(Xi),this}rotateX(e){return this.rotateOnAxis(ac,e)}rotateY(e){return this.rotateOnAxis(oc,e)}rotateZ(e){return this.rotateOnAxis(lc,e)}translateOnAxis(e,t){return rc.copy(e).applyQuaternion(this.quaternion),this.position.add(rc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ac,e)}translateY(e){return this.translateOnAxis(oc,e)}translateZ(e){return this.translateOnAxis(lc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(e,t,n){if(e.isVector3)ar.copy(e);else ar.set(e,t,n);let i=this.parent;if(this.updateWorldMatrix(!0,!1),bs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)kn.lookAt(bs,ar,this.up);else kn.lookAt(ar,bs,this.up);if(this.quaternion.setFromRotationMatrix(kn),i)kn.extractRotation(i.matrixWorld),Xi.setFromRotationMatrix(kn),this.quaternion.premultiply(Xi.invert())}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}if(e===this)return Ue("Object3D.add: object can't be added as a child of itself.",e),this;if(e&&e.isObject3D)e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(cc),qi.child=e,this.dispatchEvent(qi),qi.child=null;else Ue("Object3D.add: object not an instance of THREE.Object3D.",e);return this}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);if(t!==-1)e.parent=null,this.children.splice(t,1),e.dispatchEvent(td),Pa.child=e,this.dispatchEvent(Pa),Pa.child=null;return this}removeFromParent(){let e=this.parent;if(e!==null)e.remove(this);return this}clear(){return this.remove(...this.children)}attach(e){if(this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),e.parent!==null)e.parent.updateWorldMatrix(!0,!1),kn.multiply(e.parent.matrixWorld);return e.applyMatrix4(kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(cc),qi.child=e,this.dispatchEvent(qi),qi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}return}getObjectsByProperty(e,t,n=[]){if(this[e]===t)n.push(this);let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bs,e,Qu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bs,ed,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;if(t!==null)e(t),t.traverseAncestors(e)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let{x:t,y:n,z:i}=e,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||e){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,e=!0}let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let i=this.parent;if(e===!0&&i!==null)i.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||n){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,n=!0}if(t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==="string",n={};if(t)e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let i={};if(i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0)i.userData=this.userData;if(i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null)i.pivot=this.pivot.toArray();if(this.morphTargetDictionary!==void 0)i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)i.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)i.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map((a)=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map((a)=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null)i.colorsTexture=this._colorsTexture.toJSON(e);if(this.boundingSphere!==null)i.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)i.boundingBox=this.boundingBox.toJSON()}function s(a,o){if(a[o.uuid]===void 0)a[o.uuid]=o.toJSON(e);return o.uuid}if(this.isScene){if(this.background){if(this.background.isColor)i.background=this.background.toJSON();else if(this.background.isTexture)i.background=this.background.toJSON(e).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)i.environment=this.environment.toJSON(e).uuid}else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let o=a.shapes;if(Array.isArray(o))for(let l=0,c=o.length;l<c;l++){let d=o[l];s(e.shapes,d)}else s(e.shapes,o)}}if(this.isSkinnedMesh){if(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let o=0,l=this.material.length;o<l;o++)a.push(s(e.materials,this.material[o]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let o=this.animations[a];i.animations.push(s(e.animations,o))}}if(t){let a=r(e.geometries),o=r(e.materials),l=r(e.textures),c=r(e.images),d=r(e.shapes),f=r(e.skeletons),h=r(e.animations),m=r(e.nodes);if(a.length>0)n.geometries=a;if(o.length>0)n.materials=o;if(l.length>0)n.textures=l;if(c.length>0)n.images=c;if(d.length>0)n.shapes=d;if(f.length>0)n.skeletons=f;if(h.length>0)n.animations=h;if(m.length>0)n.nodes=m}return n.object=i,n;function r(a){let o=[];for(let l in a){let c=a[l];delete c.metadata,o.push(c)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Mt.DEFAULT_UP=new C(0,1,0);Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Pt extends Mt{constructor(){super();this.isGroup=!0,this.type="Group"}}var nd={type:"move"};class zs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new Pt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new Pt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new Pt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(e){if(this._targetRay!==null)this._targetRay.dispatchEvent(e);if(this._grip!==null)this._grip.dispatchEvent(e);if(this._hand!==null)this._hand.dispatchEvent(e);return this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){if(this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(e,t,n){let i=null,s=null,r=null,a=this._targetRay,o=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){r=!0;for(let x of e.hand.values()){let b=t.getJointPose(x,n),p=this._getHandJoint(l,x);if(b!==null)p.matrix.fromArray(b.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=b.radius;p.visible=b!==null}let c=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=c.position.distanceTo(d.position),h=0.02,m=0.005;if(l.inputState.pinching&&f>h+m)l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this});else if(!l.inputState.pinching&&f<=h-m)l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this})}else if(o!==null&&e.gripSpace){if(s=t.getPose(e.gripSpace,n),s!==null){if(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity)o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity);else o.hasLinearVelocity=!1;if(s.angularVelocity)o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity);else o.hasAngularVelocity=!1;if(o.eventsEnabled)o.dispatchEvent({type:"gripUpdated",data:e,target:this})}}if(a!==null){if(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null)i=s;if(i!==null){if(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity)a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity);else a.hasLinearVelocity=!1;if(i.angularVelocity)a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity);else a.hasAngularVelocity=!1;this.dispatchEvent(nd)}}}if(a!==null)a.visible=i!==null;if(o!==null)o.visible=s!==null;if(l!==null)l.visible=r!==null;return this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Pt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}var Ah={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ri={h:0,s:0,l:0},or={h:0,s:0,l:0};function La(e,t,n){if(n<0)n+=1;if(n>1)n-=1;if(n<0.16666666666666666)return e+(t-e)*6*n;if(n<0.5)return t;if(n<0.6666666666666666)return e+(t-e)*6*(0.6666666666666666-n);return e}class He{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;if(i&&i.isColor)this.copy(i);else if(typeof i==="number")this.setHex(i);else if(typeof i==="string")this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t="srgb"){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=je.workingColorSpace){return this.r=e,this.g=t,this.b=n,je.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=je.workingColorSpace){if(e=qu(e,1),t=qe(t,0,1),n=qe(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=0.5?n*(1+t):n+t-n*t,r=2*n-s;this.r=La(r,s,e+0.3333333333333333),this.g=La(r,s,e),this.b=La(r,s,e-0.3333333333333333)}return je.colorSpaceToWorking(this,i),this}setStyle(e,t="srgb"){function n(s){if(s===void 0)return;if(parseFloat(s)<1)Ne("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,r=i[1],a=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ne("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);else if(r===6)return this.setHex(parseInt(s,16),t);else Ne("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t="srgb"){let n=Ah[e.toLowerCase()];if(n!==void 0)this.setHex(n,t);else Ne("Color: Unknown color "+e);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xn(e.r),this.g=Xn(e.g),this.b=Xn(e.b),this}copyLinearToSRGB(e){return this.r=is(e.r),this.g=is(e.g),this.b=is(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e="srgb"){return je.workingToColorSpace(Gt.copy(this),e),Math.round(qe(Gt.r*255,0,255))*65536+Math.round(qe(Gt.g*255,0,255))*256+Math.round(qe(Gt.b*255,0,255))}getHexString(e="srgb"){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.workingToColorSpace(Gt.copy(this),t);let{r:n,g:i,b:s}=Gt,r=Math.max(n,i,s),a=Math.min(n,i,s),o,l,c=(a+r)/2;if(a===r)o=0,l=0;else{let d=r-a;switch(l=c<=0.5?d/(r+a):d/(2-r-a),r){case n:o=(i-s)/d+(i<s?6:0);break;case i:o=(s-n)/d+2;break;case s:o=(n-i)/d+4;break}o/=6}return e.h=o,e.s=l,e.l=c,e}getRGB(e,t=je.workingColorSpace){return je.workingToColorSpace(Gt.copy(this),t),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e="srgb"){je.workingToColorSpace(Gt.copy(this),e);let{r:t,g:n,b:i}=Gt;if(e!=="srgb")return`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`;return`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ri),this.setHSL(ri.h+e,ri.s+t,ri.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ri),e.getHSL(or);let n=Ta(ri.h,or.h,t),i=Ta(ri.s,or.s,t),s=Ta(ri.l,or.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var Gt=new He;He.NAMES=Ah;class cs extends Mt{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qn,this.environmentIntensity=1,this.environmentRotation=new qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){if(super.copy(e,t),e.background!==null)this.background=e.background.clone();if(e.environment!==null)this.environment=e.environment.clone();if(e.fog!==null)this.fog=e.fog.clone();if(this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null)this.overrideMaterial=e.overrideMaterial.clone();return this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);if(this.fog!==null)t.object.fog=this.fog.toJSON();return t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}var gn=new C,Hn=new C,Na=new C,Gn=new C,Yi=new C,Zi=new C,hc=new C,Da=new C,Ua=new C,Fa=new C,Oa=new yt,Ba=new yt,za=new yt;class hn{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),gn.subVectors(e,t),i.cross(gn);let s=i.lengthSq();if(s>0)return i.multiplyScalar(1/Math.sqrt(s));return i.set(0,0,0)}static getBarycoord(e,t,n,i,s){gn.subVectors(i,t),Hn.subVectors(n,t),Na.subVectors(e,t);let r=gn.dot(gn),a=gn.dot(Hn),o=gn.dot(Na),l=Hn.dot(Hn),c=Hn.dot(Na),d=r*l-a*a;if(d===0)return s.set(0,0,0),null;let f=1/d,h=(l*o-a*c)*f,m=(r*c-a*o)*f;return s.set(1-h-m,m,h)}static containsPoint(e,t,n,i){if(this.getBarycoord(e,t,n,i,Gn)===null)return!1;return Gn.x>=0&&Gn.y>=0&&Gn.x+Gn.y<=1}static getInterpolation(e,t,n,i,s,r,a,o){if(this.getBarycoord(e,t,n,i,Gn)===null){if(o.x=0,o.y=0,"z"in o)o.z=0;if("w"in o)o.w=0;return null}return o.setScalar(0),o.addScaledVector(s,Gn.x),o.addScaledVector(r,Gn.y),o.addScaledVector(a,Gn.z),o}static getInterpolatedAttribute(e,t,n,i,s,r){return Oa.setScalar(0),Ba.setScalar(0),za.setScalar(0),Oa.fromBufferAttribute(e,t),Ba.fromBufferAttribute(e,n),za.fromBufferAttribute(e,i),r.setScalar(0),r.addScaledVector(Oa,s.x),r.addScaledVector(Ba,s.y),r.addScaledVector(za,s.z),r}static isFrontFacing(e,t,n,i){return gn.subVectors(n,t),Hn.subVectors(e,t),gn.cross(Hn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return gn.subVectors(this.c,this.b),Hn.subVectors(this.a,this.b),gn.cross(Hn).length()*0.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(e){return hn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return hn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return hn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return hn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return hn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,r,a;Yi.subVectors(i,n),Zi.subVectors(s,n),Da.subVectors(e,n);let o=Yi.dot(Da),l=Zi.dot(Da);if(o<=0&&l<=0)return t.copy(n);Ua.subVectors(e,i);let c=Yi.dot(Ua),d=Zi.dot(Ua);if(c>=0&&d<=c)return t.copy(i);let f=o*d-c*l;if(f<=0&&o>=0&&c<=0)return r=o/(o-c),t.copy(n).addScaledVector(Yi,r);Fa.subVectors(e,s);let h=Yi.dot(Fa),m=Zi.dot(Fa);if(m>=0&&h<=m)return t.copy(s);let x=h*l-o*m;if(x<=0&&l>=0&&m<=0)return a=l/(l-m),t.copy(n).addScaledVector(Zi,a);let b=c*m-h*d;if(b<=0&&d-c>=0&&h-m>=0)return hc.subVectors(s,i),a=(d-c)/(d-c+(h-m)),t.copy(i).addScaledVector(hc,a);let p=1/(b+x+f);return r=x*p,a=f*p,t.copy(n).addScaledVector(Yi,r).addScaledVector(Zi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Jn{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(_n.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(_n.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=_n.copy(t).multiplyScalar(0.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,a=s.count;r<a;r++){if(e.isMesh===!0)e.getVertexPosition(r,_n);else _n.fromBufferAttribute(s,r);_n.applyMatrix4(e.matrixWorld),this.expandByPoint(_n)}else{if(e.boundingBox!==void 0){if(e.boundingBox===null)e.computeBoundingBox();lr.copy(e.boundingBox)}else{if(n.boundingBox===null)n.computeBoundingBox();lr.copy(n.boundingBox)}lr.applyMatrix4(e.matrixWorld),this.union(lr)}}let i=e.children;for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,_n),_n.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;if(e.normal.x>0)t=e.normal.x*this.min.x,n=e.normal.x*this.max.x;else t=e.normal.x*this.max.x,n=e.normal.x*this.min.x;if(e.normal.y>0)t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y;else t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y;if(e.normal.z>0)t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z;else t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z;return t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Es),cr.subVectors(this.max,Es),$i.subVectors(e.a,Es),Ji.subVectors(e.b,Es),Ki.subVectors(e.c,Es),ai.subVectors(Ji,$i),oi.subVectors(Ki,Ji),Si.subVectors($i,Ki);let t=[0,-ai.z,ai.y,0,-oi.z,oi.y,0,-Si.z,Si.y,ai.z,0,-ai.x,oi.z,0,-oi.x,Si.z,0,-Si.x,-ai.y,ai.x,0,-oi.y,oi.x,0,-Si.y,Si.x,0];if(!ka(t,$i,Ji,Ki,cr))return!1;if(t=[1,0,0,0,1,0,0,0,1],!ka(t,$i,Ji,Ki,cr))return!1;return hr.crossVectors(ai,oi),t=[hr.x,hr.y,hr.z],ka(t,$i,Ji,Ki,cr)}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,_n).distanceTo(e)}getBoundingSphere(e){if(this.isEmpty())e.makeEmpty();else this.getCenter(e.center),e.radius=this.getSize(_n).length()*0.5;return e}intersect(e){if(this.min.max(e.min),this.max.min(e.max),this.isEmpty())this.makeEmpty();return this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){if(this.isEmpty())return this;return Vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Vn),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}var Vn=[new C,new C,new C,new C,new C,new C,new C,new C],_n=new C,lr=new Jn,$i=new C,Ji=new C,Ki=new C,ai=new C,oi=new C,Si=new C,Es=new C,cr=new C,hr=new C,Mi=new C;function ka(e,t,n,i,s){for(let r=0,a=e.length-3;r<=a;r+=3){Mi.fromArray(e,r);let o=s.x*Math.abs(Mi.x)+s.y*Math.abs(Mi.y)+s.z*Math.abs(Mi.z),l=t.dot(Mi),c=n.dot(Mi),d=i.dot(Mi);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}var It=new C,ur=new Be,id=0;class Jt extends Zn{constructor(e,t,n=!1){super();if(Array.isArray(e))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:id++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){if(e===!0)this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ur.fromBufferAttribute(this,t),ur.applyMatrix3(e),this.setXY(t,ur.x,ur.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix3(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];if(this.normalized)n=Ms(n,this.array);return n}setComponent(e,t,n){if(this.normalized)n=jt(n,this.array);return this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];if(this.normalized)t=Ms(t,this.array);return t}setX(e,t){if(this.normalized)t=jt(t,this.array);return this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];if(this.normalized)t=Ms(t,this.array);return t}setY(e,t){if(this.normalized)t=jt(t,this.array);return this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];if(this.normalized)t=Ms(t,this.array);return t}setZ(e,t){if(this.normalized)t=jt(t,this.array);return this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];if(this.normalized)t=Ms(t,this.array);return t}setW(e,t){if(this.normalized)t=jt(t,this.array);return this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){if(e*=this.itemSize,this.normalized)t=jt(t,this.array),n=jt(n,this.array);return this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){if(e*=this.itemSize,this.normalized)t=jt(t,this.array),n=jt(n,this.array),i=jt(i,this.array);return this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){if(e*=this.itemSize,this.normalized)t=jt(t,this.array),n=jt(n,this.array),i=jt(i,this.array),s=jt(s,this.array);return this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class qr extends Jt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Yr extends Jt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class st extends Jt{constructor(e,t,n){super(new Float32Array(e),t,n)}}var sd=new Jn,ws=new C,Ha=new C;class di{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;if(t!==void 0)n.copy(t);else sd.setFromPoints(e).getCenter(n);let i=0;for(let s=0,r=e.length;s<r;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);if(t.copy(e),n>this.radius*this.radius)t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center);return t}getBoundingBox(e){if(this.isEmpty())return e.makeEmpty(),e;return e.set(this.center,this.center),e.expandByScalar(this.radius),e}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ws.subVectors(e,this.center);let t=ws.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*0.5;this.center.addScaledVector(ws,i/n),this.radius+=i}return this}union(e){if(e.isEmpty())return this;if(this.isEmpty())return this.copy(e),this;if(this.center.equals(e.center)===!0)this.radius=Math.max(this.radius,e.radius);else Ha.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ws.copy(e.center).add(Ha)),this.expandByPoint(ws.copy(e.center).sub(Ha));return this}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}var rd=0,cn=new at,Ga=new Mt,ji=new C,sn=new Jn,Ts=new Jn,Dt=new C;class bt extends Zn{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rd++}),this.uuid=Os(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){if(Array.isArray(e))this.index=new((Wu(e))?Yr:qr)(e,1);else this.index=e;return this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;if(t!==void 0)t.applyMatrix4(e),t.needsUpdate=!0;let n=this.attributes.normal;if(n!==void 0){let s=new Ge().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;if(i!==void 0)i.transformDirection(e),i.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this._transformed=!0,this}applyQuaternion(e){return cn.makeRotationFromQuaternion(e),this.applyMatrix4(cn),this}rotateX(e){return cn.makeRotationX(e),this.applyMatrix4(cn),this}rotateY(e){return cn.makeRotationY(e),this.applyMatrix4(cn),this}rotateZ(e){return cn.makeRotationZ(e),this.applyMatrix4(cn),this}translate(e,t,n){return cn.makeTranslation(e,t,n),this.applyMatrix4(cn),this}scale(e,t,n){return cn.makeScale(e,t,n),this.applyMatrix4(cn),this}lookAt(e){return Ga.lookAt(e),Ga.updateMatrix(),this.applyMatrix4(Ga.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ji).negate(),this.translate(ji.x,ji.y,ji.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let r=e[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new st(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}if(e.length>t.count)Ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");t.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new Jn;let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ue("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];if(sn.setFromBufferAttribute(s),this.morphTargetsRelative)Dt.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(Dt);else this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))Ue('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new di;let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ue("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){let n=this.boundingSphere.center;if(sn.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){let a=t[s];if(Ts.setFromBufferAttribute(a),this.morphTargetsRelative)Dt.addVectors(sn.min,Ts.min),sn.expandByPoint(Dt),Dt.addVectors(sn.max,Ts.max),sn.expandByPoint(Dt);else sn.expandByPoint(Ts.min),sn.expandByPoint(Ts.max)}sn.getCenter(n);let i=0;for(let s=0,r=e.count;s<r;s++)Dt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Dt));if(t)for(let s=0,r=t.length;s<r;s++){let a=t[s],o=this.morphTargetsRelative;for(let l=0,c=a.count;l<c;l++){if(Dt.fromBufferAttribute(a,l),o)ji.fromBufferAttribute(e,l),Dt.add(ji);i=Math.max(i,n.distanceToSquared(Dt))}}if(this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius))Ue('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ue("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:n,normal:i,uv:s}=t,r=this.getAttribute("tangent");if(r===void 0||r.count!==n.count)r=new Jt(new Float32Array(4*n.count),4),this.setAttribute("tangent",r);let a=[],o=[];for(let A=0;A<n.count;A++)a[A]=new C,o[A]=new C;let l=new C,c=new C,d=new C,f=new Be,h=new Be,m=new Be,x=new C,b=new C;function p(A,g,S){l.fromBufferAttribute(n,A),c.fromBufferAttribute(n,g),d.fromBufferAttribute(n,S),f.fromBufferAttribute(s,A),h.fromBufferAttribute(s,g),m.fromBufferAttribute(s,S),c.sub(l),d.sub(l),h.sub(f),m.sub(f);let B=1/(h.x*m.y-m.x*h.y);if(!isFinite(B))return;x.copy(c).multiplyScalar(m.y).addScaledVector(d,-h.y).multiplyScalar(B),b.copy(d).multiplyScalar(h.x).addScaledVector(c,-m.x).multiplyScalar(B),a[A].add(x),a[g].add(x),a[S].add(x),o[A].add(b),o[g].add(b),o[S].add(b)}let u=this.groups;if(u.length===0)u=[{start:0,count:e.count}];for(let A=0,g=u.length;A<g;++A){let S=u[A],{start:B,count:I}=S;for(let F=B,J=B+I;F<J;F+=3)p(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let w=new C,T=new C,y=new C,M=new C;function R(A){y.fromBufferAttribute(i,A),M.copy(y);let g=a[A];w.copy(g),w.sub(y.multiplyScalar(y.dot(g))).normalize(),T.crossVectors(M,g);let B=T.dot(o[A])<0?-1:1;r.setXYZW(A,w.x,w.y,w.z,B)}for(let A=0,g=u.length;A<g;++A){let S=u[A],{start:B,count:I}=S;for(let F=B,J=B+I;F<J;F+=3)R(e.getX(F+0)),R(e.getX(F+1)),R(e.getX(F+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Jt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);let i=new C,s=new C,r=new C,a=new C,o=new C,l=new C,c=new C,d=new C;if(e)for(let f=0,h=e.count;f<h;f+=3){let m=e.getX(f+0),x=e.getX(f+1),b=e.getX(f+2);i.fromBufferAttribute(t,m),s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,b),c.subVectors(r,s),d.subVectors(i,s),c.cross(d),a.fromBufferAttribute(n,m),o.fromBufferAttribute(n,x),l.fromBufferAttribute(n,b),a.add(c),o.add(c),l.add(c),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(b,l.x,l.y,l.z)}else for(let f=0,h=t.count;f<h;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),r.fromBufferAttribute(t,f+2),c.subVectors(r,s),d.subVectors(i,s),c.cross(d),n.setXYZ(f+0,c.x,c.y,c.z),n.setXYZ(f+1,c.x,c.y,c.z),n.setXYZ(f+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Dt.fromBufferAttribute(e,t),Dt.normalize(),e.setXYZ(t,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function e(a,o){let{array:l,itemSize:c,normalized:d}=a,f=new l.constructor(o.length*c),h=0,m=0;for(let x=0,b=o.length;x<b;x++){if(a.isInterleavedBufferAttribute)h=o[x]*a.data.stride+a.offset;else h=o[x]*c;for(let p=0;p<c;p++)f[m++]=l[h++]}return new Jt(f,c,d)}if(this.index===null)return Ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new bt,n=this.index.array,i=this.attributes;for(let a in i){let o=i[a],l=e(o,n);t.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let o=[],l=s[a];for(let c=0,d=l.length;c<d;c++){let f=l[c],h=e(f,n);o.push(h)}t.morphAttributes[a]=o}t.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let a=0,o=r.length;a<o;a++){let l=r[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0)e.userData=this.userData;if(this.parameters!==void 0&&this._transformed!==!0){let o=this.parameters;for(let l in o)if(o[l]!==void 0)e[l]=o[l];return e}e.data={attributes:{}};let t=this.index;if(t!==null)e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)};let n=this.attributes;for(let o in n){let l=n[o];e.data.attributes[o]=l.toJSON(e.data)}let i={},s=!1;for(let o in this.morphAttributes){let l=this.morphAttributes[o],c=[];for(let d=0,f=l.length;d<f;d++){let h=l[d];c.push(h.toJSON(e.data))}if(c.length>0)i[o]=c,s=!0}if(s)e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;if(r.length>0)e.data.groups=JSON.parse(JSON.stringify(r));let a=this.boundingSphere;if(a!==null)e.data.boundingSphere=a.toJSON();return e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;if(n!==null)this.setIndex(n.clone());let i=e.attributes;for(let l in i){let c=i[l];this.setAttribute(l,c.clone(t))}let s=e.morphAttributes;for(let l in s){let c=[],d=s[l];for(let f=0,h=d.length;f<h;f++)c.push(d[f].clone(t));this.morphAttributes[l]=c}this.morphTargetsRelative=e.morphTargetsRelative;let r=e.groups;for(let l=0,c=r.length;l<c;l++){let d=r[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;if(a!==null)this.boundingBox=a.clone();let o=e.boundingSphere;if(o!==null)this.boundingSphere=o.clone();return this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}var Va=new C,ad=new C,od=new Ge;class Rn{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Va.subVectors(n,t).cross(ad.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(Va),s=this.normal.dot(i);if(s===0){if(this.distanceToPoint(e.start)===0)return t.copy(e.start);return null}let r=-(e.start.dot(this.normal)+this.constant)/s;if(n===!0&&(r<0||r>1))return null;return t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||od.getNormalMatrix(e),i=this.coplanarPoint(Va).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}var ld=0;class fi extends Zn{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:ld++}),this.uuid=Os(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){if(this._alphaTest>0!==e>0)this.version++;this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e===void 0)return;for(let t in e){let n=e[t];if(n===void 0){Ne(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Ne(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}if(i&&i.isColor)i.set(n);else if(i&&i.isVector2&&(n&&n.isVector2)||i&&i.isEuler&&(n&&n.isEuler)||i&&i.isVector3&&(n&&n.isVector3))i.copy(n);else this[t]=n}}toJSON(e){let t=e===void 0||typeof e==="string";if(t)e={textures:{},images:{}};let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if(n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor)n.color=this.color.getHex();if(this.roughness!==void 0)n.roughness=this.roughness;if(this.metalness!==void 0)n.metalness=this.metalness;if(this.sheen!==void 0)n.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)n.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)n.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)n.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0)n.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)n.specular=this.specular.getHex();if(this.specularIntensity!==void 0)n.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)n.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)n.shininess=this.shininess;if(this.clearcoat!==void 0)n.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)n.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid;if(this.dispersion!==void 0)n.dispersion=this.dispersion;if(this.retroreflectivity!==void 0)n.retroreflectivity=this.retroreflectivity;if(this.iridescence!==void 0)n.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)n.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)n.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid;if(this.anisotropy!==void 0)n.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)n.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid;if(this.map&&this.map.isTexture)n.map=this.map.toJSON(e).uuid;if(this.matcap&&this.matcap.isTexture)n.matcap=this.matcap.toJSON(e).uuid;if(this.alphaMap&&this.alphaMap.isTexture)n.alphaMap=this.alphaMap.toJSON(e).uuid;if(this.lightMap&&this.lightMap.isTexture)n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)n.roughnessMap=this.roughnessMap.toJSON(e).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)n.metalnessMap=this.metalnessMap.toJSON(e).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)n.emissiveMap=this.emissiveMap.toJSON(e).uuid;if(this.specularMap&&this.specularMap.isTexture)n.specularMap=this.specularMap.toJSON(e).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)n.specularColorMap=this.specularColorMap.toJSON(e).uuid;if(this.envMap&&this.envMap.isTexture){if(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0)n.combine=this.combine}if(this.envMapRotation!==void 0)n.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)n.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)n.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)n.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)n.gradientMap=this.gradientMap.toJSON(e).uuid;if(this.transmission!==void 0)n.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)n.transmissionMap=this.transmissionMap.toJSON(e).uuid;if(this.thickness!==void 0)n.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)n.thicknessMap=this.thicknessMap.toJSON(e).uuid;if(this.attenuationDistance!==void 0)n.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)n.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)n.size=this.size;if(this.sizeAttenuation!==void 0)n.sizeAttenuation=this.sizeAttenuation;if(Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0)n.clippingPlanes=this.clippingPlanes.map((s)=>s.toJSON());if(this.rotation!==void 0)n.rotation=this.rotation;if(this.depthPacking!==void 0)n.depthPacking=this.depthPacking;if(this.linewidth!==void 0)n.linewidth=this.linewidth;if(this.linecap!==void 0)n.linecap=this.linecap;if(this.linejoin!==void 0)n.linejoin=this.linejoin;if(this.dashSize!==void 0)n.dashSize=this.dashSize;if(this.gapSize!==void 0)n.gapSize=this.gapSize;if(this.scale!==void 0)n.scale=this.scale;if(this.wireframe!==void 0)n.wireframe=this.wireframe;if(this.wireframeLinewidth!==void 0)n.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!==void 0)n.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!==void 0)n.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading!==void 0)n.flatShading=this.flatShading;if(this.fog!==void 0)n.fog=this.fog;if(Object.keys(this.userData).length>0)n.userData=this.userData;function i(s){let r=[];for(let a in s){let o=s[a];delete o.metadata,r.push(o)}return r}if(t){let s=i(e.textures),r=i(e.images);if(s.length>0)n.textures=s;if(r.length>0)n.images=r}return n}fromJSON(e,t){if(e.uuid!==void 0)this.uuid=e.uuid;if(e.name!==void 0)this.name=e.name;if(e.color!==void 0&&this.color!==void 0)this.color.setHex(e.color);if(e.roughness!==void 0)this.roughness=e.roughness;if(e.metalness!==void 0)this.metalness=e.metalness;if(e.sheen!==void 0)this.sheen=e.sheen;if(e.sheenColor!==void 0)this.sheenColor=new He().setHex(e.sheenColor);if(e.sheenRoughness!==void 0)this.sheenRoughness=e.sheenRoughness;if(e.emissive!==void 0&&this.emissive!==void 0)this.emissive.setHex(e.emissive);if(e.specular!==void 0&&this.specular!==void 0)this.specular.setHex(e.specular);if(e.specularIntensity!==void 0)this.specularIntensity=e.specularIntensity;if(e.specularColor!==void 0&&this.specularColor!==void 0)this.specularColor.setHex(e.specularColor);if(e.shininess!==void 0)this.shininess=e.shininess;if(e.clearcoat!==void 0)this.clearcoat=e.clearcoat;if(e.clearcoatRoughness!==void 0)this.clearcoatRoughness=e.clearcoatRoughness;if(e.dispersion!==void 0)this.dispersion=e.dispersion;if(e.retroreflectivity!==void 0)this.retroreflectivity=e.retroreflectivity;if(e.iridescence!==void 0)this.iridescence=e.iridescence;if(e.iridescenceIOR!==void 0)this.iridescenceIOR=e.iridescenceIOR;if(e.iridescenceThicknessRange!==void 0)this.iridescenceThicknessRange=e.iridescenceThicknessRange;if(e.transmission!==void 0)this.transmission=e.transmission;if(e.thickness!==void 0)this.thickness=e.thickness;if(e.attenuationDistance!==void 0)this.attenuationDistance=e.attenuationDistance;if(e.attenuationColor!==void 0&&this.attenuationColor!==void 0)this.attenuationColor.setHex(e.attenuationColor);if(e.anisotropy!==void 0)this.anisotropy=e.anisotropy;if(e.anisotropyRotation!==void 0)this.anisotropyRotation=e.anisotropyRotation;if(e.fog!==void 0)this.fog=e.fog;if(e.flatShading!==void 0)this.flatShading=e.flatShading;if(e.blending!==void 0)this.blending=e.blending;if(e.combine!==void 0)this.combine=e.combine;if(e.side!==void 0)this.side=e.side;if(e.shadowSide!==void 0)this.shadowSide=e.shadowSide;if(e.opacity!==void 0)this.opacity=e.opacity;if(e.transparent!==void 0)this.transparent=e.transparent;if(e.alphaTest!==void 0)this.alphaTest=e.alphaTest;if(e.alphaHash!==void 0)this.alphaHash=e.alphaHash;if(e.depthFunc!==void 0)this.depthFunc=e.depthFunc;if(e.depthTest!==void 0)this.depthTest=e.depthTest;if(e.depthWrite!==void 0)this.depthWrite=e.depthWrite;if(e.colorWrite!==void 0)this.colorWrite=e.colorWrite;if(e.clippingPlanes!==void 0)this.clippingPlanes=e.clippingPlanes.map((n)=>new Rn().fromJSON(n));if(e.clipIntersection!==void 0)this.clipIntersection=e.clipIntersection;if(e.clipShadows!==void 0)this.clipShadows=e.clipShadows;if(e.depthPacking!==void 0)this.depthPacking=e.depthPacking;if(e.blendSrc!==void 0)this.blendSrc=e.blendSrc;if(e.blendDst!==void 0)this.blendDst=e.blendDst;if(e.blendEquation!==void 0)this.blendEquation=e.blendEquation;if(e.blendSrcAlpha!==void 0)this.blendSrcAlpha=e.blendSrcAlpha;if(e.blendDstAlpha!==void 0)this.blendDstAlpha=e.blendDstAlpha;if(e.blendEquationAlpha!==void 0)this.blendEquationAlpha=e.blendEquationAlpha;if(e.blendColor!==void 0&&this.blendColor!==void 0)this.blendColor.setHex(e.blendColor);if(e.blendAlpha!==void 0)this.blendAlpha=e.blendAlpha;if(e.stencilWriteMask!==void 0)this.stencilWriteMask=e.stencilWriteMask;if(e.stencilFunc!==void 0)this.stencilFunc=e.stencilFunc;if(e.stencilRef!==void 0)this.stencilRef=e.stencilRef;if(e.stencilFuncMask!==void 0)this.stencilFuncMask=e.stencilFuncMask;if(e.stencilFail!==void 0)this.stencilFail=e.stencilFail;if(e.stencilZFail!==void 0)this.stencilZFail=e.stencilZFail;if(e.stencilZPass!==void 0)this.stencilZPass=e.stencilZPass;if(e.stencilWrite!==void 0)this.stencilWrite=e.stencilWrite;if(e.wireframe!==void 0)this.wireframe=e.wireframe;if(e.wireframeLinewidth!==void 0)this.wireframeLinewidth=e.wireframeLinewidth;if(e.wireframeLinecap!==void 0)this.wireframeLinecap=e.wireframeLinecap;if(e.wireframeLinejoin!==void 0)this.wireframeLinejoin=e.wireframeLinejoin;if(e.rotation!==void 0)this.rotation=e.rotation;if(e.linewidth!==void 0)this.linewidth=e.linewidth;if(e.linecap!==void 0)this.linecap=e.linecap;if(e.linejoin!==void 0)this.linejoin=e.linejoin;if(e.dashSize!==void 0)this.dashSize=e.dashSize;if(e.gapSize!==void 0)this.gapSize=e.gapSize;if(e.scale!==void 0)this.scale=e.scale;if(e.polygonOffset!==void 0)this.polygonOffset=e.polygonOffset;if(e.polygonOffsetFactor!==void 0)this.polygonOffsetFactor=e.polygonOffsetFactor;if(e.polygonOffsetUnits!==void 0)this.polygonOffsetUnits=e.polygonOffsetUnits;if(e.dithering!==void 0)this.dithering=e.dithering;if(e.alphaToCoverage!==void 0)this.alphaToCoverage=e.alphaToCoverage;if(e.premultipliedAlpha!==void 0)this.premultipliedAlpha=e.premultipliedAlpha;if(e.forceSinglePass!==void 0)this.forceSinglePass=e.forceSinglePass;if(e.allowOverride!==void 0)this.allowOverride=e.allowOverride;if(e.visible!==void 0)this.visible=e.visible;if(e.toneMapped!==void 0)this.toneMapped=e.toneMapped;if(e.userData!==void 0)this.userData=e.userData;if(e.vertexColors!==void 0)if(typeof e.vertexColors==="number")this.vertexColors=e.vertexColors>0;else this.vertexColors=e.vertexColors;if(e.size!==void 0)this.size=e.size;if(e.sizeAttenuation!==void 0)this.sizeAttenuation=e.sizeAttenuation;if(e.map!==void 0)this.map=t[e.map]||null;if(e.matcap!==void 0)this.matcap=t[e.matcap]||null;if(e.alphaMap!==void 0)this.alphaMap=t[e.alphaMap]||null;if(e.bumpMap!==void 0)this.bumpMap=t[e.bumpMap]||null;if(e.bumpScale!==void 0)this.bumpScale=e.bumpScale;if(e.normalMap!==void 0)this.normalMap=t[e.normalMap]||null;if(e.normalMapType!==void 0)this.normalMapType=e.normalMapType;if(e.normalScale!==void 0){let n=e.normalScale;if(Array.isArray(n)===!1)n=[n,n];this.normalScale=new Be().fromArray(n)}if(e.displacementMap!==void 0)this.displacementMap=t[e.displacementMap]||null;if(e.displacementScale!==void 0)this.displacementScale=e.displacementScale;if(e.displacementBias!==void 0)this.displacementBias=e.displacementBias;if(e.roughnessMap!==void 0)this.roughnessMap=t[e.roughnessMap]||null;if(e.metalnessMap!==void 0)this.metalnessMap=t[e.metalnessMap]||null;if(e.emissiveMap!==void 0)this.emissiveMap=t[e.emissiveMap]||null;if(e.emissiveIntensity!==void 0)this.emissiveIntensity=e.emissiveIntensity;if(e.specularMap!==void 0)this.specularMap=t[e.specularMap]||null;if(e.specularIntensityMap!==void 0)this.specularIntensityMap=t[e.specularIntensityMap]||null;if(e.specularColorMap!==void 0)this.specularColorMap=t[e.specularColorMap]||null;if(e.envMap!==void 0)this.envMap=t[e.envMap]||null;if(e.envMapRotation!==void 0)this.envMapRotation.fromArray(e.envMapRotation);if(e.envMapIntensity!==void 0)this.envMapIntensity=e.envMapIntensity;if(e.reflectivity!==void 0)this.reflectivity=e.reflectivity;if(e.refractionRatio!==void 0)this.refractionRatio=e.refractionRatio;if(e.lightMap!==void 0)this.lightMap=t[e.lightMap]||null;if(e.lightMapIntensity!==void 0)this.lightMapIntensity=e.lightMapIntensity;if(e.aoMap!==void 0)this.aoMap=t[e.aoMap]||null;if(e.aoMapIntensity!==void 0)this.aoMapIntensity=e.aoMapIntensity;if(e.gradientMap!==void 0)this.gradientMap=t[e.gradientMap]||null;if(e.clearcoatMap!==void 0)this.clearcoatMap=t[e.clearcoatMap]||null;if(e.clearcoatRoughnessMap!==void 0)this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null;if(e.clearcoatNormalMap!==void 0)this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null;if(e.clearcoatNormalScale!==void 0)this.clearcoatNormalScale=new Be().fromArray(e.clearcoatNormalScale);if(e.iridescenceMap!==void 0)this.iridescenceMap=t[e.iridescenceMap]||null;if(e.iridescenceThicknessMap!==void 0)this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null;if(e.transmissionMap!==void 0)this.transmissionMap=t[e.transmissionMap]||null;if(e.thicknessMap!==void 0)this.thicknessMap=t[e.thicknessMap]||null;if(e.anisotropyMap!==void 0)this.anisotropyMap=t[e.anisotropyMap]||null;if(e.sheenColorMap!==void 0)this.sheenColorMap=t[e.sheenColorMap]||null;if(e.sheenRoughnessMap!==void 0)this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null;return this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){if(e===!0)this.version++}}var Wn=new C,Wa=new C,dr=new C,fr=new C;class Zr{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Wn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);if(n<0)return t.copy(this.origin);return t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Wn.subVectors(e,this.origin).dot(this.direction);if(t<0)return this.origin.distanceToSquared(e);return Wn.copy(this.origin).addScaledVector(this.direction,t),Wn.distanceToSquared(e)}distanceSqToSegment(e,t,n,i){Wa.copy(e).add(t).multiplyScalar(0.5),dr.copy(t).sub(e).normalize(),fr.copy(this.origin).sub(Wa);let s=e.distanceTo(t)*0.5,r=-this.direction.dot(dr),a=fr.dot(this.direction),o=-fr.dot(dr),l=fr.lengthSq(),c=Math.abs(1-r*r),d,f,h,m;if(c>0)if(d=r*o-a,f=r*a-o,m=s*c,d>=0)if(f>=-m)if(f<=m){let x=1/c;d*=x,f*=x,h=d*(d+r*f+2*a)+f*(r*d+f+2*o)+l}else f=s,d=Math.max(0,-(r*f+a)),h=-d*d+f*(f+2*o)+l;else f=-s,d=Math.max(0,-(r*f+a)),h=-d*d+f*(f+2*o)+l;else if(f<=-m)d=Math.max(0,-(-r*s+a)),f=d>0?-s:Math.min(Math.max(-s,-o),s),h=-d*d+f*(f+2*o)+l;else if(f<=m)d=0,f=Math.min(Math.max(-s,-o),s),h=f*(f+2*o)+l;else d=Math.max(0,-(r*s+a)),f=d>0?s:Math.min(Math.max(-s,-o),s),h=-d*d+f*(f+2*o)+l;else f=r>0?-s:s,d=Math.max(0,-(r*f+a)),h=-d*d+f*(f+2*o)+l;if(n)n.copy(this.origin).addScaledVector(this.direction,d);if(i)i.copy(Wa).addScaledVector(dr,f);return h}intersectSphere(e,t){if(e.radius<0)return null;Wn.subVectors(e.center,this.origin);let n=Wn.dot(this.direction),i=Wn.dot(Wn)-n*n,s=e.radius*e.radius;if(i>s)return null;let r=Math.sqrt(s-i),a=n-r,o=n+r;if(o<0)return null;if(a<0)return this.at(o,t);return this.at(a,t)}intersectsSphere(e){if(e.radius<0)return!1;return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0){if(e.distanceToPoint(this.origin)===0)return 0;return null}let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);if(n===null)return null;return this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);if(t===0)return!0;if(e.normal.dot(this.direction)*t<0)return!0;return!1}intersectBox(e,t){let n,i,s,r,a,o,l=1/this.direction.x,c=1/this.direction.y,d=1/this.direction.z,f=this.origin;if(l>=0)n=(e.min.x-f.x)*l,i=(e.max.x-f.x)*l;else n=(e.max.x-f.x)*l,i=(e.min.x-f.x)*l;if(c>=0)s=(e.min.y-f.y)*c,r=(e.max.y-f.y)*c;else s=(e.max.y-f.y)*c,r=(e.min.y-f.y)*c;if(n>r||s>i)return null;if(s>n||isNaN(n))n=s;if(r<i||isNaN(i))i=r;if(d>=0)a=(e.min.z-f.z)*d,o=(e.max.z-f.z)*d;else a=(e.max.z-f.z)*d,o=(e.min.z-f.z)*d;if(n>o||a>i)return null;if(a>n||n!==n)n=a;if(o<i||i!==i)i=o;if(i<0)return null;return this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Wn)!==null}intersectTriangle(e,t,n,i,s){let r=this.origin,a=this.direction,{x:o,y:l,z:c}=a,d=e.x-r.x,f=e.y-r.y,h=e.z-r.z,m=t.x-r.x,x=t.y-r.y,b=t.z-r.z,p=n.x-r.x,u=n.y-r.y,w=n.z-r.z,T=Math.abs(o),y=Math.abs(l),M=Math.abs(c),R,A,g,S,B,I,F,J,P,W,ee,V;if(T>=y&&T>=M)if(g=o,I=d,P=m,V=p,o>=0)R=l,A=c,S=f,B=h,F=x,J=b,W=u,ee=w;else R=c,A=l,S=h,B=f,F=b,J=x,W=w,ee=u;else if(y>=M)if(g=l,I=f,P=x,V=u,l>=0)R=c,A=o,S=h,B=d,F=b,J=m,W=w,ee=p;else R=o,A=c,S=d,B=h,F=m,J=b,W=p,ee=w;else if(g=c,I=h,P=b,V=w,c>=0)R=o,A=l,S=d,B=f,F=m,J=x,W=p,ee=u;else R=l,A=o,S=f,B=d,F=x,J=m,W=u,ee=p;if(g===0)return null;let re=R/g,q=A/g,te=1/g,ne=S-re*I,Pe=B-q*I,we=F-re*P,et=J-q*P,Fe=W-re*V,Z=ee-q*V,se=Fe*et-Z*we,ce=ne*Z-Pe*Fe,_e=we*Pe-et*ne;if(i){if(se<0||ce<0||_e<0)return null}else if((se<0||ce<0||_e<0)&&(se>0||ce>0||_e>0))return null;let xe=se+ce+_e;if(xe===0)return null;let ve=te*(se*I+ce*P+_e*V);if(xe>0?ve<0:ve>0)return null;return this.at(ve/xe,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class on extends fi{constructor(e){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}var uc=new at,bi=new Zr,pr=new di,dc=new C,mr=new C,gr=new C,_r=new C,Xa=new C,xr=new C,fc=new C,yr=new C;class Ze extends Mt{constructor(e=new bt,t=new on){super();this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){if(super.copy(e,t),e.morphTargetInfluences!==void 0)this.morphTargetInfluences=e.morphTargetInfluences.slice();if(e.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary);return this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(s&&a){xr.set(0,0,0);for(let o=0,l=s.length;o<l;o++){let c=a[o],d=s[o];if(c===0)continue;if(Xa.fromBufferAttribute(d,e),r)xr.addScaledVector(Xa,c);else xr.addScaledVector(Xa.sub(t),c)}t.add(xr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i===void 0)return;if(n.boundingSphere===null)n.computeBoundingSphere();if(pr.copy(n.boundingSphere),pr.applyMatrix4(s),bi.copy(e.ray).recast(e.near),pr.containsPoint(bi.origin)===!1){if(bi.intersectSphere(pr,dc)===null)return;if(bi.origin.distanceToSquared(dc)>(e.far-e.near)**2)return}if(uc.copy(s).invert(),bi.copy(e.ray).applyMatrix4(uc),n.boundingBox!==null){if(bi.intersectsBox(n.boundingBox)===!1)return}this._computeIntersections(e,t,bi)}_computeIntersections(e,t,n){let i,s=this.geometry,r=this.material,a=s.index,o=s.attributes.position,l=s.attributes.uv,c=s.attributes.uv1,d=s.attributes.normal,{groups:f,drawRange:h}=s;if(a!==null)if(Array.isArray(r))for(let m=0,x=f.length;m<x;m++){let b=f[m],p=r[b.materialIndex],u=Math.max(b.start,h.start),w=Math.min(a.count,Math.min(b.start+b.count,h.start+h.count));for(let T=u,y=w;T<y;T+=3){let M=a.getX(T),R=a.getX(T+1),A=a.getX(T+2);if(i=vr(this,p,e,n,l,c,d,M,R,A),i)i.faceIndex=Math.floor(T/3),i.face.materialIndex=b.materialIndex,t.push(i)}}else{let m=Math.max(0,h.start),x=Math.min(a.count,h.start+h.count);for(let b=m,p=x;b<p;b+=3){let u=a.getX(b),w=a.getX(b+1),T=a.getX(b+2);if(i=vr(this,r,e,n,l,c,d,u,w,T),i)i.faceIndex=Math.floor(b/3),t.push(i)}}else if(o!==void 0)if(Array.isArray(r))for(let m=0,x=f.length;m<x;m++){let b=f[m],p=r[b.materialIndex],u=Math.max(b.start,h.start),w=Math.min(o.count,Math.min(b.start+b.count,h.start+h.count));for(let T=u,y=w;T<y;T+=3){let M=T,R=T+1,A=T+2;if(i=vr(this,p,e,n,l,c,d,M,R,A),i)i.faceIndex=Math.floor(T/3),i.face.materialIndex=b.materialIndex,t.push(i)}}else{let m=Math.max(0,h.start),x=Math.min(o.count,h.start+h.count);for(let b=m,p=x;b<p;b+=3){let u=b,w=b+1,T=b+2;if(i=vr(this,r,e,n,l,c,d,u,w,T),i)i.faceIndex=Math.floor(b/3),t.push(i)}}}}function cd(e,t,n,i,s,r,a,o){let l;if(t.side===1)l=i.intersectTriangle(a,r,s,!0,o);else l=i.intersectTriangle(s,r,a,t.side===0,o);if(l===null)return null;yr.copy(o),yr.applyMatrix4(e.matrixWorld);let c=n.ray.origin.distanceTo(yr);if(c<n.near||c>n.far)return null;return{distance:c,point:yr.clone(),object:e}}function vr(e,t,n,i,s,r,a,o,l,c){e.getVertexPosition(o,mr),e.getVertexPosition(l,gr),e.getVertexPosition(c,_r);let d=cd(e,t,n,i,mr,gr,_r,fc);if(d){let f=new C;if(hn.getBarycoord(fc,mr,gr,_r,f),s)d.uv=hn.getInterpolatedAttribute(s,o,l,c,f,new Be);if(r)d.uv1=hn.getInterpolatedAttribute(r,o,l,c,f,new Be);if(a){if(d.normal=hn.getInterpolatedAttribute(a,o,l,c,f,new C),d.normal.dot(i.direction)>0)d.normal.multiplyScalar(-1)}let h={a:o,b:l,c,normal:new C,materialIndex:0};hn.getNormal(mr,gr,_r,h.normal),d.face=h,d.barycoord=f}return d}class $r extends Vt{constructor(e=null,t=1,n=1,i,s,r,a,o,l=1003,c=1003,d,f){super(null,r,a,o,l,c,i,s,d,f);this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Rr extends Jt{constructor(e,t,n,i=1){super(e,t,n);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}var Qi=new at,pc=new at,Sr=[],mc=new Jn,hd=new at,As=new Ze,Rs=new di;class ks extends Ze{constructor(e,t,n){super(e,t);this.isInstancedMesh=!0,this.instanceMatrix=new Rr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,hd)}computeBoundingBox(){let e=this.geometry,t=this.count;if(this.boundingBox===null)this.boundingBox=new Jn;if(e.boundingBox===null)e.computeBoundingBox();this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Qi),mc.copy(e.boundingBox).applyMatrix4(Qi),this.boundingBox.union(mc)}computeBoundingSphere(){let e=this.geometry,t=this.count;if(this.boundingSphere===null)this.boundingSphere=new di;if(e.boundingSphere===null)e.computeBoundingSphere();this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Qi),Rs.copy(e.boundingSphere).applyMatrix4(Qi),this.boundingSphere.union(Rs)}copy(e,t){if(super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null)this.morphTexture=e.morphTexture.clone();if(e.instanceColor!==null)this.instanceColor=e.instanceColor.clone();if(this.count=e.count,e.boundingBox!==null)this.boundingBox=e.boundingBox.clone();if(e.boundingSphere!==null)this.boundingSphere=e.boundingSphere.clone();return this}getColorAt(e,t){if(this.instanceColor===null)return t.setRGB(1,1,1);else return t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,r=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[r+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(As.geometry=this.geometry,As.material=this.material,As.material===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(Rs.copy(this.boundingSphere),Rs.applyMatrix4(n),e.ray.intersectsSphere(Rs)===!1)return;for(let s=0;s<i;s++){this.getMatrixAt(s,Qi),pc.multiplyMatrices(n,Qi),As.matrixWorld=pc,As.raycast(e,Sr);for(let r=0,a=Sr.length;r<a;r++){let o=Sr[r];o.instanceId=s,o.object=this,t.push(o)}Sr.length=0}}setColorAt(e,t){if(this.instanceColor===null)this.instanceColor=new Rr(new Float32Array(this.instanceMatrix.count*3).fill(1),3);return t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;if(this.morphTexture===null)this.morphTexture=new $r(new Float32Array(i*this.count),i,this.count,1028,1015);let s=this.morphTexture.source.data.data,r=0;for(let l=0;l<n.length;l++)r+=n[l];let a=this.geometry.morphTargetsRelative?1:1-r,o=i*e;return s[o]=a,s.set(n,o+1),this}updateMorphTargets(){}dispose(){if(super.dispose(),this.morphTexture!==null)this.morphTexture.dispose(),this.morphTexture=null}}var Ei=new di,ud=new Be(0.5,0.5),Mr=new C;class Hs{constructor(e=new Rn,t=new Rn,n=new Rn,i=new Rn,s=new Rn,r=new Rn){this.planes=[e,t,n,i,s,r]}set(e,t,n,i,s,r){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(r),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2000,n=!1){let i=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],d=s[5],f=s[6],h=s[7],m=s[8],x=s[9],b=s[10],p=s[11],u=s[12],w=s[13],T=s[14],y=s[15];if(i[0].setComponents(l-r,h-c,p-m,y-u).normalize(),i[1].setComponents(l+r,h+c,p+m,y+u).normalize(),i[2].setComponents(l+a,h+d,p+x,y+w).normalize(),i[3].setComponents(l-a,h-d,p-x,y-w).normalize(),n)i[4].setComponents(o,f,b,T).normalize(),i[5].setComponents(l-o,h-f,p-b,y-T).normalize();else if(i[4].setComponents(l-o,h-f,p-b,y-T).normalize(),t===2000)i[5].setComponents(l+o,h+f,p+b,y+T).normalize();else if(t===2001)i[5].setComponents(o,f,b,T).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0){if(e.boundingSphere===null)e.computeBoundingSphere();Ei.copy(e.boundingSphere).applyMatrix4(e.matrixWorld)}else{let t=e.geometry;if(t.boundingSphere===null)t.computeBoundingSphere();Ei.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ei)}intersectsSprite(e){Ei.center.set(0,0,0);let t=ud.distanceTo(e.center);return Ei.radius=0.7071067811865476+t,Ei.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ei)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Mr.x=i.normal.x>0?e.max.x:e.min.x,Mr.y=i.normal.y>0?e.max.y:e.min.y,Mr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Mr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class pi extends fi{constructor(e){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new He(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}var Cr=new C,Ir=new C,gc=new at,Cs=new Zr,br=new di,qa=new C,_c=new C;class hs extends Mt{constructor(e=new bt,t=new pi){super();this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Cr.fromBufferAttribute(t,i-1),Ir.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Cr.distanceTo(Ir);e.setAttribute("lineDistance",new st(n,1))}else Ne("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null)n.computeBoundingSphere();if(br.copy(n.boundingSphere),br.applyMatrix4(i),br.radius+=s,e.ray.intersectsSphere(br)===!1)return;gc.copy(i).invert(),Cs.copy(e.ray).applyMatrix4(gc);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),o=a*a,l=this.isLineSegments?2:1,c=n.index,f=n.attributes.position;if(c!==null){let h=Math.max(0,r.start),m=Math.min(c.count,r.start+r.count);for(let x=h,b=m-1;x<b;x+=l){let p=c.getX(x),u=c.getX(x+1),w=Er(this,e,Cs,o,p,u,x);if(w)t.push(w)}if(this.isLineLoop){let x=c.getX(m-1),b=c.getX(h),p=Er(this,e,Cs,o,x,b,m-1);if(p)t.push(p)}}else{let h=Math.max(0,r.start),m=Math.min(f.count,r.start+r.count);for(let x=h,b=m-1;x<b;x+=l){let p=Er(this,e,Cs,o,x,x+1,x);if(p)t.push(p)}if(this.isLineLoop){let x=Er(this,e,Cs,o,m-1,h,m-1);if(x)t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Er(e,t,n,i,s,r,a){let o=e.geometry.attributes.position;if(Cr.fromBufferAttribute(o,s),Ir.fromBufferAttribute(o,r),n.distanceSqToSegment(Cr,Ir,qa,_c)>i)return;qa.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(qa);if(c<t.near||c>t.far)return;return{distance:c,point:_c.clone().applyMatrix4(e.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:e}}class Jr extends Vt{constructor(e=[],t=301,n,i,s,r,a,o,l,c){super(e,t,n,i,s,r,a,o,l,c);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Li extends Vt{constructor(e,t,n=1014,i,s,r,a=1003,o=1003,l,c=1026,d=1){if(c!==1026&&c!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:d};super(f,i,s,r,a,o,c,n,l);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Bs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class tl extends Li{constructor(e,t=1014,n=301,i,s,r=1003,a=1003,o,l=1026){let c={width:e,height:e,depth:1},d=[c,c,c,c,c,c];super(e,e,t,n,i,s,r,a,o,l);this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Kr extends Vt{constructor(e=null){super();this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class vn extends bt{constructor(e=1,t=1,n=1,i=1,s=1,r=1){super();this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:r};let a=this;i=Math.floor(i),s=Math.floor(s),r=Math.floor(r);let o=[],l=[],c=[],d=[],f=0,h=0;m("z","y","x",-1,-1,n,t,e,r,s,0),m("z","y","x",1,-1,n,t,-e,r,s,1),m("x","z","y",1,1,e,n,t,i,r,2),m("x","z","y",1,-1,e,n,-t,i,r,3),m("x","y","z",1,-1,e,t,n,i,s,4),m("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(o),this.setAttribute("position",new st(l,3)),this.setAttribute("normal",new st(c,3)),this.setAttribute("uv",new st(d,2));function m(x,b,p,u,w,T,y,M,R,A,g){let S=T/R,B=y/A,I=T/2,F=y/2,J=M/2,P=R+1,W=A+1,ee=0,V=0,re=new C;for(let q=0;q<W;q++){let te=q*B-F;for(let ne=0;ne<P;ne++){let Pe=ne*S-I;re[x]=Pe*u,re[b]=te*w,re[p]=J,l.push(re.x,re.y,re.z),re[x]=0,re[b]=0,re[p]=M>0?1:-1,c.push(re.x,re.y,re.z),d.push(ne/R),d.push(1-q/A),ee+=1}}for(let q=0;q<A;q++)for(let te=0;te<R;te++){let ne=f+te+P*q,Pe=f+te+P*(q+1),we=f+(te+1)+P*(q+1),et=f+(te+1)+P*q;o.push(ne,Pe,et),o.push(Pe,we,et),V+=6}a.addGroup(h,V,g),h+=V,f+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Gs extends bt{constructor(e=1,t=1,n=4,i=8,s=1){super();this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));let r=[],a=[],o=[],l=[],c=t/2,d=Math.PI/2*e,f=t,h=2*d+f,m=n*2+s,x=i+1,b=new C,p=new C;for(let u=0;u<=m;u++){let w=0,T=0,y=0,M=0;if(u<=n){let g=u/n,S=g*Math.PI/2;T=-c-e*Math.cos(S),y=e*Math.sin(S),M=-e*Math.cos(S),w=g*d}else if(u<=n+s){let g=(u-n)/s;T=-c+g*t,y=e,M=0,w=d+g*f}else{let g=(u-n-s)/n,S=g*Math.PI/2;T=c+e*Math.sin(S),y=e*Math.cos(S),M=e*Math.sin(S),w=d+f+g*d}let R=Math.max(0,Math.min(1,w/h)),A=0;if(u===0)A=0.5/i;else if(u===m)A=-0.5/i;for(let g=0;g<=i;g++){let S=g/i,B=S*Math.PI*2,I=Math.sin(B),F=Math.cos(B);p.x=-y*F,p.y=T,p.z=y*I,a.push(p.x,p.y,p.z),b.set(-y*F,M,y*I),b.normalize(),o.push(b.x,b.y,b.z),l.push(S+A,R)}if(u>0){let g=(u-1)*x;for(let S=0;S<i;S++){let B=g+S,I=g+S+1,F=u*x+S,J=u*x+S+1;r.push(B,I,F),r.push(I,J,F)}}}this.setIndex(r),this.setAttribute("position",new st(a,3)),this.setAttribute("normal",new st(o,3)),this.setAttribute("uv",new st(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gs(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Ni extends bt{constructor(e=1,t=1,n=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o};let l=this;i=Math.floor(i),s=Math.floor(s);let c=[],d=[],f=[],h=[],m=0,x=[],b=n/2,p=0;if(u(),r===!1){if(e>0)w(!0);if(t>0)w(!1)}this.setIndex(c),this.setAttribute("position",new st(d,3)),this.setAttribute("normal",new st(f,3)),this.setAttribute("uv",new st(h,2));function u(){let T=new C,y=new C,M=0,R=(t-e)/n;for(let A=0;A<=s;A++){let g=[],S=A/s,B=S*(t-e)+e;for(let I=0;I<=i;I++){let F=I/i,J=F*o+a,P=Math.sin(J),W=Math.cos(J);y.x=B*P,y.y=-S*n+b,y.z=B*W,d.push(y.x,y.y,y.z),T.set(P,R,W).normalize(),f.push(T.x,T.y,T.z),h.push(F,1-S),g.push(m++)}x.push(g)}for(let A=0;A<i;A++)for(let g=0;g<s;g++){let S=x[g][A],B=x[g+1][A],I=x[g+1][A+1],F=x[g][A+1];if(e>0||g!==0)c.push(S,B,F),M+=3;if(t>0||g!==s-1)c.push(B,I,F),M+=3}l.addGroup(p,M,0),p+=M}function w(T){let y=m,M=new Be,R=new C,A=0,g=T===!0?e:t,S=T===!0?1:-1;for(let I=1;I<=i;I++)d.push(0,b*S,0),f.push(0,S,0),h.push(0.5,0.5),m++;let B=m;for(let I=0;I<=i;I++){let J=I/i*o+a,P=Math.cos(J),W=Math.sin(J);R.x=g*W,R.y=b*S,R.z=g*P,d.push(R.x,R.y,R.z),f.push(0,S,0),M.x=P*0.5+0.5,M.y=W*0.5*S+0.5,h.push(M.x,M.y),m++}for(let I=0;I<i;I++){let F=y+I,J=B+I;if(T===!0)c.push(J,J+1,F);else c.push(J+1,J,F);A+=3}l.addGroup(p,A,T===!0?1:2),p+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ni(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Vs extends bt{constructor(e=[],t=[],n=1,i=0){super();this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],r=[];if(a(i),l(n),c(),this.setAttribute("position",new st(s,3)),this.setAttribute("normal",new st(s.slice(),3)),this.setAttribute("uv",new st(r,2)),i===0)this.computeVertexNormals();else this.normalizeNormals();function a(u){let w=new C,T=new C,y=new C;for(let M=0;M<t.length;M+=3)h(t[M+0],w),h(t[M+1],T),h(t[M+2],y),o(w,T,y,u)}function o(u,w,T,y){let M=y+1,R=[];for(let A=0;A<=M;A++){R[A]=[];let g=u.clone().lerp(T,A/M),S=w.clone().lerp(T,A/M),B=M-A;for(let I=0;I<=B;I++)if(I===0&&A===M)R[A][I]=g;else R[A][I]=g.clone().lerp(S,I/B)}for(let A=0;A<M;A++)for(let g=0;g<2*(M-A)-1;g++){let S=Math.floor(g/2);if(g%2===0)f(R[A][S+1]),f(R[A+1][S]),f(R[A][S]);else f(R[A][S+1]),f(R[A+1][S+1]),f(R[A+1][S])}}function l(u){let w=new C;for(let T=0;T<s.length;T+=3)w.x=s[T+0],w.y=s[T+1],w.z=s[T+2],w.normalize().multiplyScalar(u),s[T+0]=w.x,s[T+1]=w.y,s[T+2]=w.z}function c(){let u=new C;for(let w=0;w<s.length;w+=3){u.x=s[w+0],u.y=s[w+1],u.z=s[w+2];let T=b(u)/2/Math.PI+0.5,y=p(u)/Math.PI+0.5;r.push(T,1-y)}m(),d()}function d(){for(let u=0;u<r.length;u+=6){let w=r[u+0],T=r[u+2],y=r[u+4],M=Math.max(w,T,y),R=Math.min(w,T,y);if(M>0.9&&R<0.1){if(w<0.2)r[u+0]+=1;if(T<0.2)r[u+2]+=1;if(y<0.2)r[u+4]+=1}}}function f(u){s.push(u.x,u.y,u.z)}function h(u,w){let T=u*3;w.x=e[T+0],w.y=e[T+1],w.z=e[T+2]}function m(){let u=new C,w=new C,T=new C,y=new C,M=new Be,R=new Be,A=new Be;for(let g=0,S=0;g<s.length;g+=9,S+=6){u.set(s[g+0],s[g+1],s[g+2]),w.set(s[g+3],s[g+4],s[g+5]),T.set(s[g+6],s[g+7],s[g+8]),M.set(r[S+0],r[S+1]),R.set(r[S+2],r[S+3]),A.set(r[S+4],r[S+5]),y.copy(u).add(w).add(T).divideScalar(3);let B=b(y);x(M,S+0,u,B),x(R,S+2,w,B),x(A,S+4,T,B)}}function x(u,w,T,y){if(y<0&&u.x===1)r[w]=u.x-1;if(T.x===0&&T.z===0)r[w]=y/2/Math.PI+0.5}function b(u){return Math.atan2(u.z,-u.x)}function p(u){return Math.atan2(-u.y,Math.sqrt(u.x*u.x+u.z*u.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vs(e.vertices,e.indices,e.radius,e.detail)}}class nl{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ne("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let r=1;r<=e;r++)n=this.getPoint(r/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,s=n.length,r;if(t)r=t;else r=e*n[s-1];let a=0,o=s-1,l;while(a<=o)if(i=Math.floor(a+(o-a)/2),l=n[i]-r,l<0)a=i+1;else if(l>0)o=i-1;else{o=i;break}if(i=o,n[i]===r)return i/(s-1);let c=n[i],f=n[i+1]-c,h=(r-c)/f;return(i+h)/(s-1)}getTangent(e,t){let i=e-0.0001,s=e+0.0001;if(i<0)i=0;if(s>1)s=1;let r=this.getPoint(i),a=this.getPoint(s),o=t||(r.isVector2?new Be:new C);return o.copy(a).sub(r).normalize(),o}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new C,i=[],s=[],r=[],a=new C,o=new at;for(let h=0;h<=e;h++){let m=h/e;i[h]=this.getTangentAt(m,new C)}s[0]=new C,r[0]=new C;let l=Number.MAX_VALUE,c=Math.abs(i[0].x),d=Math.abs(i[0].y),f=Math.abs(i[0].z);if(c<=l)l=c,n.set(1,0,0);if(d<=l)l=d,n.set(0,1,0);if(f<=l)n.set(0,0,1);a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),r[0].crossVectors(i[0],s[0]);for(let h=1;h<=e;h++){if(s[h]=s[h-1].clone(),r[h]=r[h-1].clone(),a.crossVectors(i[h-1],i[h]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(qe(i[h-1].dot(i[h]),-1,1));s[h].applyMatrix4(o.makeRotationAxis(a,m))}r[h].crossVectors(i[h],s[h])}if(t===!0){let h=Math.acos(qe(s[0].dot(s[e]),-1,1));if(h/=e,i[0].dot(a.crossVectors(s[0],s[e]))>0)h=-h;for(let m=1;m<=e;m++)s[m].applyMatrix4(o.makeRotationAxis(i[m],h*m)),r[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function il(){let e=0,t=0,n=0,i=0;function s(r,a,o,l){e=r,t=o,n=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,d,f){let h=(a-r)/c-(o-r)/(c+d)+(o-a)/d,m=(o-a)/d-(l-a)/(d+f)+(l-o)/f;h*=d,m*=d,s(a,o,h,m)},calc:function(r){let a=r*r,o=a*r;return e+t*r+n*a+i*o}}}var xc=new C,yc=new C,Ya=new il,Za=new il,$a=new il;class jr extends nl{constructor(e=[],t=!1,n="centripetal",i=0.5){super();this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new C){let n=t,i=this.points,s=i.length,r=(s-(this.closed?0:1))*e,a=Math.floor(r),o=r-a;if(this.closed)a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s;else if(o===0&&a===s-1)a=s-2,o=1;let l,c;if(this.closed||a>0)l=i[(a-1)%s];else yc.subVectors(i[0],i[1]).add(i[0]),l=yc;let d=i[a%s],f=i[(a+1)%s];if(this.closed||a+2<s)c=i[(a+2)%s];else xc.subVectors(i[s-1],i[s-2]).add(i[s-1]),c=xc;if(this.curveType==="centripetal"||this.curveType==="chordal"){let h=this.curveType==="chordal"?0.5:0.25,m=Math.pow(l.distanceToSquared(d),h),x=Math.pow(d.distanceToSquared(f),h),b=Math.pow(f.distanceToSquared(c),h);if(x<0.0001)x=1;if(m<0.0001)m=x;if(b<0.0001)b=x;Ya.initNonuniformCatmullRom(l.x,d.x,f.x,c.x,m,x,b),Za.initNonuniformCatmullRom(l.y,d.y,f.y,c.y,m,x,b),$a.initNonuniformCatmullRom(l.z,d.z,f.z,c.z,m,x,b)}else if(this.curveType==="catmullrom")Ya.initCatmullRom(l.x,d.x,f.x,c.x,this.tension),Za.initCatmullRom(l.y,d.y,f.y,c.y,this.tension),$a.initCatmullRom(l.z,d.z,f.z,c.z,this.tension);return n.set(Ya.calc(o),Za.calc(o),$a.calc(o)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new C().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}class Ws extends Vs{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t);this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ws(e.radius,e.detail)}}class Xs extends bt{constructor(e=[new Be(0,-0.5),new Be(0.5,0),new Be(0,0.5)],t=12,n=0,i=Math.PI*2){super();this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=qe(i,0,Math.PI*2);let s=[],r=[],a=[],o=[],l=[],c=1/t,d=new C,f=new Be,h=new C,m=new C,x=new C,b=0,p=0;for(let u=0;u<=e.length-1;u++)switch(u){case 0:b=e[u+1].x-e[u].x,p=e[u+1].y-e[u].y,h.x=p*1,h.y=-b,h.z=p*0,x.copy(h),h.normalize(),o.push(h.x,h.y,h.z);break;case e.length-1:o.push(x.x,x.y,x.z);break;default:b=e[u+1].x-e[u].x,p=e[u+1].y-e[u].y,h.x=p*1,h.y=-b,h.z=p*0,m.copy(h),h.x+=x.x,h.y+=x.y,h.z+=x.z,h.normalize(),o.push(h.x,h.y,h.z),x.copy(m)}for(let u=0;u<=t;u++){let w=n+u*c*i,T=Math.sin(w),y=Math.cos(w);for(let M=0;M<=e.length-1;M++){d.x=e[M].x*T,d.y=e[M].y,d.z=e[M].x*y,r.push(d.x,d.y,d.z),f.x=u/t,f.y=M/(e.length-1),a.push(f.x,f.y);let R=o[3*M+0]*T,A=o[3*M+1],g=o[3*M+0]*y;l.push(R,A,g)}}for(let u=0;u<t;u++)for(let w=0;w<e.length-1;w++){let T=w+u*e.length,y=T,M=T+e.length,R=T+e.length+1,A=T+1;s.push(y,M,A),s.push(R,A,M)}this.setIndex(s),this.setAttribute("position",new st(r,3)),this.setAttribute("uv",new st(a,2)),this.setAttribute("normal",new st(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xs(e.points,e.segments,e.phiStart,e.phiLength)}}class mi extends Vs{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t);this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new mi(e.radius,e.detail)}}class Ln extends bt{constructor(e=1,t=1,n=1,i=1){super();this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,r=t/2,a=Math.floor(n),o=Math.floor(i),l=a+1,c=o+1,d=e/a,f=t/o,h=[],m=[],x=[],b=[];for(let p=0;p<c;p++){let u=p*f-r;for(let w=0;w<l;w++){let T=w*d-s;m.push(T,-u,0),x.push(0,0,1),b.push(w/a),b.push(1-p/o)}}for(let p=0;p<o;p++)for(let u=0;u<a;u++){let w=u+l*p,T=u+l*(p+1),y=u+1+l*(p+1),M=u+1+l*p;h.push(w,T,M),h.push(T,y,M)}this.setIndex(h),this.setAttribute("position",new st(m,3)),this.setAttribute("normal",new st(x,3)),this.setAttribute("uv",new st(b,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ln(e.width,e.height,e.widthSegments,e.heightSegments)}}class Nn extends bt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,r=0,a=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:r,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let o=Math.min(r+a,Math.PI),l=0,c=[],d=new C,f=new C,h=[],m=[],x=[],b=[];for(let p=0;p<=n;p++){let u=[],w=p/n,T=r+w*a,y=e*Math.cos(T),M=Math.sqrt(e*e-y*y),R=0;if(p===0&&r===0)R=0.5/t;else if(p===n&&o===Math.PI)R=-0.5/t;for(let A=0;A<=t;A++){let g=A/t,S=i+g*s;d.x=-M*Math.cos(S),d.y=y,d.z=M*Math.sin(S),m.push(d.x,d.y,d.z),f.copy(d).normalize(),x.push(f.x,f.y,f.z),b.push(g+R,1-w),u.push(l++)}c.push(u)}for(let p=0;p<n;p++)for(let u=0;u<t;u++){let w=c[p][u+1],T=c[p][u],y=c[p+1][u],M=c[p+1][u+1];if(p!==0||r>0)h.push(w,T,M);if(p!==n-1||o<Math.PI)h.push(T,y,M)}this.setIndex(h),this.setAttribute("position",new st(m,3)),this.setAttribute("normal",new st(x,3)),this.setAttribute("uv",new st(b,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class qs extends bt{constructor(e=1,t=0.4,n=12,i=48,s=Math.PI*2,r=0,a=Math.PI*2){super();this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s,thetaStart:r,thetaLength:a},n=Math.floor(n),i=Math.floor(i);let o=[],l=[],c=[],d=[],f=new C,h=new C,m=new C;for(let x=0;x<=n;x++){let b=r+x/n*a;for(let p=0;p<=i;p++){let u=p/i*s;h.x=(e+t*Math.cos(b))*Math.cos(u),h.y=(e+t*Math.cos(b))*Math.sin(u),h.z=t*Math.sin(b),l.push(h.x,h.y,h.z),f.x=e*Math.cos(u),f.y=e*Math.sin(u),m.subVectors(h,f).normalize(),c.push(m.x,m.y,m.z),d.push(p/i),d.push(x/n)}}for(let x=1;x<=n;x++)for(let b=1;b<=i;b++){let p=(i+1)*x+b-1,u=(i+1)*(x-1)+b-1,w=(i+1)*(x-1)+b,T=(i+1)*x+b;o.push(p,u,T),o.push(u,w,T)}this.setIndex(o),this.setAttribute("position",new st(l,3)),this.setAttribute("normal",new st(c,3)),this.setAttribute("uv",new st(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qs(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}function Di(e){let t={};for(let n in e){t[n]={};for(let i in e[n]){let s=e[n][i];if(vc(s))if(s.isRenderTargetTexture)Ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null;else t[n][i]=s.clone();else if(Array.isArray(s))if(vc(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[n][i]=r}else t[n][i]=s.slice();else t[n][i]=s}}return t}function qt(e){let t={};for(let n=0;n<e.length;n++){let i=Di(e[n]);for(let s in i)t[s]=i[s]}return t}function vc(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function dd(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function sl(e){let t=e.getRenderTarget();if(t===null)return e.outputColorSpace;if(t.isXRRenderTarget===!0)return t.texture.colorSpace;return je.workingColorSpace}var Rh={clone:Di,merge:qt},fd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,pd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class un extends fi{constructor(e){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=fd,this.fragmentShader=pd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0)this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Di(e.uniforms),this.uniformsGroups=dd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let r=this.uniforms[i].value;if(r&&r.isTexture)t.uniforms[i]={type:"t",value:r.toJSON(e).uuid};else if(r&&r.isColor)t.uniforms[i]={type:"c",value:r.getHex()};else if(r&&r.isVector2)t.uniforms[i]={type:"v2",value:r.toArray()};else if(r&&r.isVector3)t.uniforms[i]={type:"v3",value:r.toArray()};else if(r&&r.isVector4)t.uniforms[i]={type:"v4",value:r.toArray()};else if(r&&r.isMatrix3)t.uniforms[i]={type:"m3",value:r.toArray()};else if(r&&r.isMatrix4)t.uniforms[i]={type:"m4",value:r.toArray()};else t.uniforms[i]={value:r}}if(Object.keys(this.defines).length>0)t.defines=this.defines;t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)if(this.extensions[i]===!0)n[i]=!0;if(Object.keys(n).length>0)t.extensions=n;return t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new He().setHex(i.value);break;case"v2":this.uniforms[n].value=new Be().fromArray(i.value);break;case"v3":this.uniforms[n].value=new C().fromArray(i.value);break;case"v4":this.uniforms[n].value=new yt().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Ge().fromArray(i.value);break;case"m4":this.uniforms[n].value=new at().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0)this.defines=e.defines;if(e.vertexShader!==void 0)this.vertexShader=e.vertexShader;if(e.fragmentShader!==void 0)this.fragmentShader=e.fragmentShader;if(e.glslVersion!==void 0)this.glslVersion=e.glslVersion;if(e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];if(e.lights!==void 0)this.lights=e.lights;if(e.clipping!==void 0)this.clipping=e.clipping;return this}}class rl extends un{constructor(e){super(e);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Dn extends fi{constructor(e){super();this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new He(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ys extends Dn{constructor(e){super();this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Be(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return qe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+0.4*t)/(1-0.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new He(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new He(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new He(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){if(this._anisotropy>0!==e>0)this.version++;this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){if(this._clearcoat>0!==e>0)this.version++;this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){if(this._iridescence>0!==e>0)this.version++;this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){if(this._dispersion>0!==e>0)this.version++;this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){if(this._retroreflectivity>0!==e>0)this.version++;this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){if(this._sheen>0!==e>0)this.version++;this._sheen=e}get transmission(){return this._transmission}set transmission(e){if(this._transmission>0!==e>0)this.version++;this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class al extends fi{constructor(e){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ol extends fi{constructor(e){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Qr extends pi{constructor(e){super();this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}function es(e,t){if(!e||e.constructor===t)return e;if(typeof t.BYTES_PER_ELEMENT==="number")return new t(e);return Array.prototype.slice.call(e)}function Ja(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}class Ui{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let r;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}r=t.length;break t}if(!(e>=s)){let a=t[1];if(e<a)n=2,s=a;for(let o=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===o)break;if(i=s,s=t[--n-1],e>=s)break e}r=n,n=0;break t}break n}while(n<r){let a=n+r>>>1;if(e<t[a])r=a;else n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let r=0;r!==i;++r)t[r]=n[s+r];return t}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class ll extends Ui{constructor(e,t,n,i){super(e,t,n,i);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,r=e+1,a=i[s],o=i[r];if(a===void 0)switch(this.getSettings_().endingStart){case 2401:s=e,a=2*t-n;break;case 2402:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(o===void 0)switch(this.getSettings_().endingEnd){case 2401:r=e,o=2*n-t;break;case 2402:r=1,o=n+i[1]-i[0];break;default:r=e-1,o=t}let l=(n-t)*0.5,c=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(o-n),this._offsetPrev=s*c,this._offsetNext=r*c}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,o=e*a,l=o-a,c=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,m=(n-t)/(i-t),x=m*m,b=x*m,p=-f*b+2*f*x-f*m,u=(1+f)*b+(-1.5-2*f)*x+(-0.5+f)*m+1,w=(-1-h)*b+(1.5+h)*x+0.5*m,T=h*b-h*x;for(let y=0;y!==a;++y)s[y]=p*r[c+y]+u*r[l+y]+w*r[o+y]+T*r[d+y];return s}}class cl extends Ui{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,o=e*a,l=o-a,c=(n-t)/(i-t),d=1-c;for(let f=0;f!==a;++f)s[f]=r[l+f]*d+r[o+f]*c;return s}}class hl extends Ui{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class ul extends Ui{interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,o=e*a,l=o-a,c=this.inTangents,d=this.outTangents;if(!c||!d){let m=(n-t)/(i-t),x=1-m;for(let b=0;b!==a;++b)s[b]=r[l+b]*x+r[o+b]*m;return s}let f=a*2,h=e-1;for(let m=0;m!==a;++m){let x=r[l+m],b=r[o+m],p=h*f+m*2,u=d[p],w=d[p+1],T=e*f+m*2,y=c[T],M=c[T+1],R=gd(n,t,u,y,i);s[m]=Ch(R,x,w,M,b)}return s}}function Ch(e,t,n,i,s){let r=1-e;return r*r*r*t+3*r*r*e*n+3*r*e*e*i+e*e*e*s}function md(e,t,n,i,s){let r=1-e;return 3*r*r*(n-t)+6*r*e*(i-n)+3*e*e*(s-i)}function gd(e,t,n,i,s){let r=(e-t)/(s-t);for(let a=0;a<8;a++){let o=Ch(r,t,n,i,s)-e;if(Math.abs(o)<0.0000000001)break;let l=md(r,t,n,i,s);if(Math.abs(l)<0.0000000001)break;r=Math.max(0,Math.min(1,r-o/l))}return r}class dn{constructor(e,t,n,i){if(e===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=es(t,this.TimeBufferType),this.values=es(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:es(e.times,Array),values:es(e.values,Array)};let i=e.getInterpolation();if(i!==e.DefaultInterpolation)n.interpolation=i;if(Ja(e.settings))n.settings={inTangents:es(e.settings.inTangents,Array),outTangents:es(e.settings.outTangents,Array)}}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new hl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new cl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ll(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ul(this.times,this.values,this.getValueSize(),e);if(this.settings)t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents;return t}setInterpolation(e){let t;switch(e){case 2300:t=this.InterpolantFactoryMethodDiscrete;break;case 2301:t=this.InterpolantFactoryMethodLinear;break;case 2302:t=this.InterpolantFactoryMethodSmooth;break;case 2303:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(n);return Ne("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e;if(Ja(this.settings))Sc(this.settings.inTangents,e),Sc(this.settings.outTangents,e)}return this}trim(e,t){let n=this.times,i=n.length,s=0,r=i-1;while(s!==i&&n[s]<e)++s;while(r!==-1&&n[r]>t)--r;if(++r,s!==0||r!==i){if(s>=r)r=Math.max(r,1),s=r-1;let a=this.getValueSize();this.times=n.slice(s,r),this.values=this.values.slice(s*a,r*a)}return this}validate(){let e=!0,t=this.getValueSize();if(t-Math.floor(t)!==0)Ue("KeyframeTrack: Invalid value size in track.",this),e=!1;let n=this.times,i=this.values,s=n.length;if(s===0)Ue("KeyframeTrack: Track is empty.",this),e=!1;let r=null;for(let a=0;a!==s;a++){let o=n[a];if(typeof o==="number"&&isNaN(o)){Ue("KeyframeTrack: Time is not a valid number.",this,a,o),e=!1;break}if(r!==null&&r>o){Ue("KeyframeTrack: Out of order keys.",this,a,o,r),e=!1;break}r=o}if(i!==void 0){if(Xu(i))for(let a=0,o=i.length;a!==o;++a){let l=i[a];if(isNaN(l)){Ue("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===2302,s=e.length-1,r=1;for(let a=1;a<s;++a){let o=!1,l=e[a],c=e[a+1];if(l!==c&&(a!==1||l!==e[0]))if(!i){let d=a*n,f=d-n,h=d+n;for(let m=0;m!==n;++m){let x=t[d+m];if(x!==t[f+m]||x!==t[h+m]){o=!0;break}}}else o=!0;if(o){if(a!==r){e[r]=e[a];let d=a*n,f=r*n;for(let h=0;h!==n;++h)t[f+h]=t[d+h]}++r}}if(s>0){e[r]=e[s];for(let a=s*n,o=r*n,l=0;l!==n;++l)t[o+l]=t[a+l];++r}if(r!==e.length)this.times=e.slice(0,r),this.values=t.slice(0,r*n);else this.times=e,this.values=t;return this}clone(){let e=this.times.slice(),t=this.values.slice(),i=new this.constructor(this.name,e,t);if(i.createInterpolant=this.createInterpolant,Ja(this.settings))i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()};return i}}function Sc(e,t){for(let n=0,i=e.length;n!==i;n+=2)e[n]*=t}dn.prototype.ValueTypeName="";dn.prototype.TimeBufferType=Float32Array;dn.prototype.ValueBufferType=Float32Array;dn.prototype.DefaultInterpolation=2301;class Fi extends dn{constructor(e,t,n){super(e,t,n)}}Fi.prototype.ValueTypeName="bool";Fi.prototype.ValueBufferType=Array;Fi.prototype.DefaultInterpolation=2300;Fi.prototype.InterpolantFactoryMethodLinear=void 0;Fi.prototype.InterpolantFactoryMethodSmooth=void 0;class dl extends dn{constructor(e,t,n,i){super(e,t,n,i)}}dl.prototype.ValueTypeName="color";class fl extends dn{constructor(e,t,n,i){super(e,t,n,i)}}fl.prototype.ValueTypeName="number";class pl extends Ui{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,o=(n-t)/(i-t),l=e*a;for(let c=l+a;l!==c;l+=4)$n.slerpFlat(s,0,r,l-a,r,l,o);return s}}class ea extends dn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new pl(this.times,this.values,this.getValueSize(),e)}}ea.prototype.ValueTypeName="quaternion";ea.prototype.InterpolantFactoryMethodSmooth=void 0;class Oi extends dn{constructor(e,t,n){super(e,t,n)}}Oi.prototype.ValueTypeName="string";Oi.prototype.ValueBufferType=Array;Oi.prototype.DefaultInterpolation=2300;Oi.prototype.InterpolantFactoryMethodLinear=void 0;Oi.prototype.InterpolantFactoryMethodSmooth=void 0;class ml extends dn{constructor(e,t,n,i){super(e,t,n,i)}}ml.prototype.ValueTypeName="vector";class gl{constructor(e,t,n){let i=this,s=!1,r=0,a=0,o=void 0,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(c){if(a++,s===!1){if(i.onStart!==void 0)i.onStart(c,r,a)}s=!0},this.itemEnd=function(c){if(r++,i.onProgress!==void 0)i.onProgress(c,r,a);if(r===a){if(s=!1,i.onLoad!==void 0)i.onLoad()}},this.itemError=function(c){if(i.onError!==void 0)i.onError(c)},this.resolveURL=function(c){if(c=c.normalize("NFC"),o)return o(c);return c},this.setURLModifier=function(c){return o=c,this},this.addHandler=function(c,d){return l.push(c,d),this},this.removeHandler=function(c){let d=l.indexOf(c);if(d!==-1)l.splice(d,2);return this},this.getHandler=function(c){for(let d=0,f=l.length;d<f;d+=2){let h=l[d],m=l[d+1];if(h.global)h.lastIndex=0;if(h.test(c))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var Ih=new gl;class _l{constructor(e){if(this.manager=e!==void 0?e:Ih,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}_l.DEFAULT_MATERIAL_NAME="__DEFAULT";class ta extends Mt{constructor(e,t=1){super();this.isLight=!0,this.type="Light",this.color=new He(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class us extends ta{constructor(e,t,n){super(e,n);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new He(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}var Ka=new at,Mc=new C,bc=new C;class xl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Be(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Hs,this._frameExtents=new Be(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Mc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Mc),bc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(bc),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,i){Ka.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Ka,e.coordinateSystem,e.reversedDepth);let s=this._frameExtents,r=i?i.z/s.x:1,a=i?i.w/s.y:1,o=i?i.x/s.x:0,l=i?i.y/s.y:0;if(e.coordinateSystem===2001||e.reversedDepth)t.set(0.5*r,0,0,0.5*r+o,0,0.5*a,0,0.5*a+l,0,0,1,0,0,0,0,1);else t.set(0.5*r,0,0,0.5*r+o,0,0.5*a,0,0.5*a+l,0,0,0.5,0.5,0,0,0,1);t.multiply(Ka)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}var wr=new C,Tr=new $n,An=new C;class na extends Mt{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.matrixWorld.decompose(wr,Tr,An),An.x===1&&An.y===1&&An.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(wr,Tr,An.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){if(super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(wr,Tr,An),An.x===1&&An.y===1&&An.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(wr,Tr,An.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var li=new C,Ec=new Be,wc=new Be;class rn extends na{constructor(e=50,t=1,n=0.1,i=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=0.5*this.getFilmHeight()/e;this.fov=Ar*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(wa*0.5*this.fov);return 0.5*this.getFilmHeight()/e}getEffectiveFOV(){return Ar*2*Math.atan(Math.tan(wa*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){li.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),t.set(li.x,li.y).multiplyScalar(-e/li.z),li.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),n.set(li.x,li.y).multiplyScalar(-e/li.z)}getViewSize(e,t){return this.getViewBounds(e,Ec,wc),t.subVectors(wc,Ec)}setViewOffset(e,t,n,i,s,r){if(this.aspect=e/t,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(wa*0.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-0.5*i,r=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:o,fullHeight:l}=r;s+=r.offsetX*i/o,t-=r.offsetY*n/l,i*=r.width/o,n*=r.height/l}let a=this.filmOffset;if(a!==0)s+=e*a/this.getFilmWidth();this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);if(t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null)t.object.view=Object.assign({},this.view);return t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Kn extends na{constructor(e=-1,t=1,n=1,i=-1,s=0.1,r=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,r){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,r=n+e,a=i+t,o=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,r=s+l*this.view.width,a-=c*this.view.offsetY,o=a-c*this.view.height}this.projectionMatrix.makeOrthographic(s,r,a,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);if(t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null)t.object.view=Object.assign({},this.view);return t}}class Ph extends xl{constructor(){super(new Kn(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class gi extends ta{constructor(e,t){super(e,t);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new Ph}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}var ts=-90,ns=1;class yl extends Mt{constructor(e,t,n){super();this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new rn(ts,ns,e,t);i.layers=this.layers,this.add(i);let s=new rn(ts,ns,e,t);s.layers=this.layers,this.add(s);let r=new rn(ts,ns,e,t);r.layers=this.layers,this.add(r);let a=new rn(ts,ns,e,t);a.layers=this.layers,this.add(a);let o=new rn(ts,ns,e,t);o.layers=this.layers,this.add(o);let l=new rn(ts,ns,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,r,a,o]=t;for(let l of t)this.remove(l);if(e===2000)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;if(this.coordinateSystem!==e.coordinateSystem)this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem();let[s,r,a,o,l,c]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let b=!1;if(e.isWebGLRenderer===!0)b=e.state.buffers.depth.getReversed();else b=e.reversedDepthBuffer;if(e.setRenderTarget(n,0,i),b&&e.autoClear===!1)e.clearDepth();if(e.render(t,s),e.setRenderTarget(n,1,i),b&&e.autoClear===!1)e.clearDepth();if(e.render(t,r),e.setRenderTarget(n,2,i),b&&e.autoClear===!1)e.clearDepth();if(e.render(t,a),e.setRenderTarget(n,3,i),b&&e.autoClear===!1)e.clearDepth();if(e.render(t,o),e.setRenderTarget(n,4,i),b&&e.autoClear===!1)e.clearDepth();if(e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),b&&e.autoClear===!1)e.clearDepth();e.render(t,c),e.setRenderTarget(d,f,h),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class vl extends rn{constructor(e=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}var Sl="\\[\\]\\.:\\/",_d=new RegExp("["+Sl+"]","g"),Ml="[^"+Sl+"]",xd="[^"+Sl.replace("\\.","")+"]",yd=/((?:WC+[\/:])*)/.source.replace("WC",Ml),vd=/(WCOD+)?/.source.replace("WCOD",xd),Sd=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ml),Md=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ml),bd=new RegExp("^"+yd+vd+Sd+Md+"$"),Ed=["material","materials","bones","map"];class Lh{constructor(e,t,n){let i=n||ct.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];if(i!==void 0)i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ct{constructor(e,t,n){this.path=t,this.parsedPath=n||ct.parseTrackName(t),this.node=ct.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){if(!(e&&e.isAnimationObjectGroup))return new ct(e,t,n);else return new ct.Composite(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(_d,"")}static parseTrackName(e){let t=bd.exec(e);if(t===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);if(Ed.indexOf(s)!==-1)n.nodeName=n.nodeName.substring(0,i),n.objectName=s}if(n.propertyName===null||n.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let r=0;r<s.length;r++){let a=s[r];if(a.name===t||a.uuid===t)return a;let o=n(a.children);if(o)return o}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,{objectName:n,propertyName:i,propertyIndex:s}=t;if(!e)e=ct.findNode(this.rootNode,t.nodeName),this.node=e;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ne("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Ue("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ue("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ue("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let c=0;c<e.length;c++)if(e[c].name===l){l=c;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ue("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ue("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ue("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Ue("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let r=e[i];if(r===void 0){let l=t.nodeName;Ue("PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;if(this.targetObject=e,e.isMaterial===!0)a=this.Versioning.NeedsUpdate;else if(e.isObject3D===!0)a=this.Versioning.MatrixWorldNeedsUpdate;let o=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Ue("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ue("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(e.morphTargetDictionary[s]!==void 0)s=e.morphTargetDictionary[s]}o=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else if(r.fromArray!==void 0&&r.toArray!==void 0)o=this.BindingType.HasFromToArray,this.resolvedProperty=r;else if(Array.isArray(r))o=this.BindingType.EntireArray,this.resolvedProperty=r;else this.propertyName=i;this.getValue=this.GetterByBindingType[o],this.setValue=this.SetterByBindingTypeAndVersioning[o][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ct.Composite=Lh;ct.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ct.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ct.prototype.GetterByBindingType=[ct.prototype._getValue_direct,ct.prototype._getValue_array,ct.prototype._getValue_arrayElement,ct.prototype._getValue_toArray];ct.prototype.SetterByBindingTypeAndVersioning=[[ct.prototype._setValue_direct,ct.prototype._setValue_direct_setNeedsUpdate,ct.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_array,ct.prototype._setValue_array_setNeedsUpdate,ct.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_arrayElement,ct.prototype._setValue_arrayElement_setNeedsUpdate,ct.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_fromArray,ct.prototype._setValue_fromArray_setNeedsUpdate,ct.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var z0=new Float32Array(1);class bl{static{bl.prototype.isMatrix2=!0}constructor(e,t,n,i){if(this.elements=[1,0,0,1],e!==void 0)this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}}function El(e,t,n,i){let s=wd(i);switch(n){case 1021:return e*t;case 1028:return e*t/s.components*s.byteLength;case 1029:return e*t/s.components*s.byteLength;case 1030:return e*t*2/s.components*s.byteLength;case 1031:return e*t*2/s.components*s.byteLength;case 1022:return e*t*3/s.components*s.byteLength;case 1023:return e*t*4/s.components*s.byteLength;case 1033:return e*t*4/s.components*s.byteLength;case 33776:case 33777:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case 33778:case 33779:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case 35841:case 35843:return Math.max(e,16)*Math.max(t,8)/4;case 35840:case 35842:return Math.max(e,8)*Math.max(t,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case 37808:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case 37809:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case 37810:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case 37811:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case 37812:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case 37813:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case 37814:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case 37815:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case 37816:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case 37817:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case 37818:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case 37819:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case 37820:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case 37821:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(e/4)*Math.ceil(t/4)*16;case 36283:case 36284:return Math.ceil(e/4)*Math.ceil(t/4)*8;case 36285:case 36286:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function wd(e){switch(e){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));if(typeof window<"u")if(window.__THREE__)Ne("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="186";function eu(){let e=null,t=!1,n=null,i=null;function s(r,a){i=e.requestAnimationFrame(s),n(r,a)}return{start:function(){if(t===!0)return;if(n===null)return;if(e===null)return;i=e.requestAnimationFrame(s),t=!0},stop:function(){if(e!==null)e.cancelAnimationFrame(i);t=!1},setAnimationLoop:function(r){n=r},setContext:function(r){e=r}}}function Td(e){let t=new WeakMap;function n(o,l){let{array:c,usage:d}=o,f=c.byteLength,h=e.createBuffer();e.bindBuffer(l,h),e.bufferData(l,c,d),o.onUploadCallback();let m;if(c instanceof Float32Array)m=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=e.HALF_FLOAT;else if(c instanceof Uint16Array)if(o.isFloat16BufferAttribute)m=e.HALF_FLOAT;else m=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=e.SHORT;else if(c instanceof Uint32Array)m=e.UNSIGNED_INT;else if(c instanceof Int32Array)m=e.INT;else if(c instanceof Int8Array)m=e.BYTE;else if(c instanceof Uint8Array)m=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=e.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){let{array:d,updateRanges:f}=l;if(e.bindBuffer(c,o),f.length===0)e.bufferSubData(c,0,d);else{f.sort((m,x)=>m.start-x.start);let h=0;for(let m=1;m<f.length;m++){let x=f[h],b=f[m];if(b.start<=x.start+x.count+1)x.count=Math.max(x.count,b.start+b.count-x.start);else++h,f[h]=b}f.length=h+1;for(let m=0,x=f.length;m<x;m++){let b=f[m];e.bufferSubData(c,b.start*d.BYTES_PER_ELEMENT,d,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){if(o.isInterleavedBufferAttribute)o=o.data;return t.get(o)}function r(o){if(o.isInterleavedBufferAttribute)o=o.data;let l=t.get(o);if(l)e.deleteBuffer(l.buffer),t.delete(o)}function a(o,l){if(o.isInterleavedBufferAttribute)o=o.data;if(o.isGLBufferAttribute){let d=t.get(o);if(!d||d.version<o.version)t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Ad=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Rd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Cd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Id=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ld=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Nd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Dd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ud=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Fd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Od=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,kd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Gd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Vd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Yd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Zd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,$d=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Jd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Kd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,jd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Qd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ef=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,tf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,nf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sf="gl_FragColor = linearToOutputTexel( gl_FragColor );",rf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,af=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,of=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,lf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,cf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,uf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,df=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ff=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,gf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_f=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,vf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Sf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Mf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,bf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ef=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Tf=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Af=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Rf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Cf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,If=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Pf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Lf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Df=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Uf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ff=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Of=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Bf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,kf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Xf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Yf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Zf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$f=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Kf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,jf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ep=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,tp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,np=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ip=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,sp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ap=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,op=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,up=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,dp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,fp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,pp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,gp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_p=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,xp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Sp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Mp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,bp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ep=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`;var Ap=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Rp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Cp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ip=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Np=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Up=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Fp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Op=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Hp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Gp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Vp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Yp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,$p=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Jp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Qp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,em=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,im=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,am=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,om=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xe={alphahash_fragment:Ad,alphahash_pars_fragment:Rd,alphamap_fragment:Cd,alphamap_pars_fragment:Id,alphatest_fragment:Pd,alphatest_pars_fragment:Ld,aomap_fragment:Nd,aomap_pars_fragment:Dd,batching_pars_vertex:Ud,batching_vertex:Fd,begin_vertex:Od,beginnormal_vertex:Bd,bsdfs:zd,iridescence_fragment:kd,bumpmap_pars_fragment:Hd,clipping_planes_fragment:Gd,clipping_planes_pars_fragment:Vd,clipping_planes_pars_vertex:Wd,clipping_planes_vertex:Xd,color_fragment:qd,color_pars_fragment:Yd,color_pars_vertex:Zd,color_vertex:$d,common:Jd,cube_uv_reflection_fragment:Kd,defaultnormal_vertex:jd,displacementmap_pars_vertex:Qd,displacementmap_vertex:ef,emissivemap_fragment:tf,emissivemap_pars_fragment:nf,colorspace_fragment:sf,colorspace_pars_fragment:rf,envmap_fragment:af,envmap_common_pars_fragment:of,envmap_pars_fragment:lf,envmap_pars_vertex:cf,envmap_physical_pars_fragment:vf,envmap_vertex:hf,fog_vertex:uf,fog_pars_vertex:df,fog_fragment:ff,fog_pars_fragment:pf,gradientmap_pars_fragment:mf,lightmap_pars_fragment:gf,lights_lambert_fragment:_f,lights_lambert_pars_fragment:xf,lights_pars_begin:yf,lights_toon_fragment:Sf,lights_toon_pars_fragment:Mf,lights_phong_fragment:bf,lights_phong_pars_fragment:Ef,lights_physical_fragment:wf,lights_physical_pars_fragment:Tf,lights_fragment_begin:Af,lights_fragment_maps:Rf,lights_fragment_end:Cf,lightprobes_pars_fragment:If,logdepthbuf_fragment:Pf,logdepthbuf_pars_fragment:Lf,logdepthbuf_pars_vertex:Nf,logdepthbuf_vertex:Df,map_fragment:Uf,map_pars_fragment:Ff,map_particle_fragment:Of,map_particle_pars_fragment:Bf,metalnessmap_fragment:zf,metalnessmap_pars_fragment:kf,morphinstance_vertex:Hf,morphcolor_vertex:Gf,morphnormal_vertex:Vf,morphtarget_pars_vertex:Wf,morphtarget_vertex:Xf,normal_fragment_begin:qf,normal_fragment_maps:Yf,normal_pars_fragment:Zf,normal_pars_vertex:$f,normal_vertex:Jf,normalmap_pars_fragment:Kf,clearcoat_normal_fragment_begin:jf,clearcoat_normal_fragment_maps:Qf,clearcoat_pars_fragment:ep,iridescence_pars_fragment:tp,opaque_fragment:np,packing:ip,premultiplied_alpha_fragment:sp,project_vertex:rp,dithering_fragment:ap,dithering_pars_fragment:op,roughnessmap_fragment:lp,roughnessmap_pars_fragment:cp,shadowmap_pars_fragment:hp,shadowmap_pars_vertex:up,shadowmap_vertex:dp,shadowmask_pars_fragment:fp,skinbase_vertex:pp,skinning_pars_vertex:mp,skinning_vertex:gp,skinnormal_vertex:_p,specularmap_fragment:xp,specularmap_pars_fragment:yp,tonemapping_fragment:vp,tonemapping_pars_fragment:Sp,transmission_fragment:Mp,transmission_pars_fragment:bp,uv_pars_fragment:Ep,uv_pars_vertex:wp,uv_vertex:Tp,worldpos_vertex:Ap,background_vert:Rp,background_frag:Cp,backgroundCube_vert:Ip,backgroundCube_frag:Pp,cube_vert:Lp,cube_frag:Np,depth_vert:Dp,depth_frag:Up,distance_vert:Fp,distance_frag:Op,equirect_vert:Bp,equirect_frag:zp,linedashed_vert:kp,linedashed_frag:Hp,meshbasic_vert:Gp,meshbasic_frag:Vp,meshlambert_vert:Wp,meshlambert_frag:Xp,meshmatcap_vert:qp,meshmatcap_frag:Yp,meshnormal_vert:Zp,meshnormal_frag:$p,meshphong_vert:Jp,meshphong_frag:Kp,meshphysical_vert:jp,meshphysical_frag:Qp,meshtoon_vert:em,meshtoon_frag:tm,points_vert:nm,points_frag:im,shadow_vert:sm,shadow_frag:rm,sprite_vert:am,sprite_frag:om},pe={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new Be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new C},probesMax:{value:new C},probesResolution:{value:new C}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new Be(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},Fn={basic:{uniforms:qt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:qt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new He(0)},envMapIntensity:{value:1}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:qt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:qt([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:qt([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new He(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:qt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:qt([pe.points,pe.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:qt([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:qt([pe.common,pe.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:qt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:qt([pe.sprite,pe.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distance:{uniforms:qt([pe.common,pe.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:Xe.distance_vert,fragmentShader:Xe.distance_frag},shadow:{uniforms:qt([pe.lights,pe.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};Fn.physical={uniforms:qt([Fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new Be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new Be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new Be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};var ia={r:0,b:0,g:0},lm=new at,tu=new Ge;tu.set(-1,0,0,0,1,0,0,0,1);function cm(e,t,n,i,s,r){let a=new He(0),o=s===!0?0:1,l,c,d=null,f=0,h=null;function m(w){let T=w.isScene===!0?w.background:null;if(T&&T.isTexture){let y=w.backgroundBlurriness>0;T=t.get(T,y)}return T}function x(w){let T=!1,y=m(w);if(y===null)p(a,o);else if(y&&y.isColor)p(y,1),T=!0;let M=e.xr.getEnvironmentBlendMode();if(M==="additive")n.buffers.color.setClear(0,0,0,1,r);else if(M==="alpha-blend")n.buffers.color.setClear(0,0,0,0,r);if(e.autoClear||T)n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil)}function b(w,T){let y=m(T);if(y&&(y.isCubeTexture||y.mapping===Ds)){if(c===void 0)c=new Ze(new vn(1,1,1),new un({name:"BackgroundCubeMaterial",uniforms:Di(Fn.backgroundCube.uniforms),vertexShader:Fn.backgroundCube.vertexShader,fragmentShader:Fn.backgroundCube.fragmentShader,side:Wt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,R,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c);if(c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(lm.makeRotationFromEuler(T.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1)c.material.uniforms.backgroundRotation.value.premultiply(tu);if(c.material.toneMapped=je.getTransfer(y.colorSpace)!==gt,d!==y||f!==y.version||h!==e.toneMapping)c.material.needsUpdate=!0,d=y,f=y.version,h=e.toneMapping;c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null)}else if(y&&y.isTexture){if(l===void 0)l=new Ze(new Ln(2,2),new un({name:"BackgroundMaterial",uniforms:Di(Fn.background.uniforms),vertexShader:Fn.background.vertexShader,fragmentShader:Fn.background.fragmentShader,side:ci,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l);if(l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=je.getTransfer(y.colorSpace)!==gt,y.matrixAutoUpdate===!0)y.updateMatrix();if(l.material.uniforms.uvTransform.value.copy(y.matrix),d!==y||f!==y.version||h!==e.toneMapping)l.material.needsUpdate=!0,d=y,f=y.version,h=e.toneMapping;l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null)}}function p(w,T){w.getRGB(ia,sl(e)),n.buffers.color.setClear(ia.r,ia.g,ia.b,T,r)}function u(){if(c!==void 0)c.geometry.dispose(),c.material.dispose(),c=void 0;if(l!==void 0)l.geometry.dispose(),l.material.dispose(),l=void 0}return{getClearColor:function(){return a},setClearColor:function(w,T=1){a.set(w),o=T,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(w){o=w,p(a,o)},render:x,addToRenderList:b,dispose:u}}function hm(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=h(null),r=s,a=!1;function o(I,F,J,P,W){let ee=!1,V=f(I,P,J,F);if(r!==V)r=V,c(r.object);if(ee=m(I,P,J,W),ee)x(I,P,J,W);if(W!==null)t.update(W,e.ELEMENT_ARRAY_BUFFER);if(ee||a){if(a=!1,y(I,F,J,P),W!==null)e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(W).buffer)}}function l(){return e.createVertexArray()}function c(I){return e.bindVertexArray(I)}function d(I){return e.deleteVertexArray(I)}function f(I,F,J,P){let W=P.wireframe===!0,ee=i[F.id];if(ee===void 0)ee={},i[F.id]=ee;let V=I.isInstancedMesh===!0?I.id:0,re=ee[V];if(re===void 0)re={},ee[V]=re;let q=re[J.id];if(q===void 0)q={},re[J.id]=q;let te=q[W];if(te===void 0)te=h(l()),q[W]=te;return te}function h(I){let F=[],J=[],P=[];for(let W=0;W<n;W++)F[W]=0,J[W]=0,P[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:J,attributeDivisors:P,object:I,attributes:{},index:null}}function m(I,F,J,P){let W=r.attributes,ee=F.attributes,V=0,re=J.getAttributes();for(let q in re)if(re[q].location>=0){let ne=W[q],Pe=ee[q];if(Pe===void 0){if(q==="instanceMatrix"&&I.instanceMatrix)Pe=I.instanceMatrix;if(q==="instanceColor"&&I.instanceColor)Pe=I.instanceColor}if(ne===void 0)return!0;if(ne.attribute!==Pe)return!0;if(Pe&&ne.data!==Pe.data)return!0;V++}if(r.attributesNum!==V)return!0;if(r.index!==P)return!0;return!1}function x(I,F,J,P){let W={},ee=F.attributes,V=0,re=J.getAttributes();for(let q in re)if(re[q].location>=0){let ne=ee[q];if(ne===void 0){if(q==="instanceMatrix"&&I.instanceMatrix)ne=I.instanceMatrix;if(q==="instanceColor"&&I.instanceColor)ne=I.instanceColor}let Pe={};if(Pe.attribute=ne,ne&&ne.data)Pe.data=ne.data;W[q]=Pe,V++}r.attributes=W,r.attributesNum=V,r.index=P}function b(){let I=r.newAttributes;for(let F=0,J=I.length;F<J;F++)I[F]=0}function p(I){u(I,0)}function u(I,F){let J=r.newAttributes,P=r.enabledAttributes,W=r.attributeDivisors;if(J[I]=1,P[I]===0)e.enableVertexAttribArray(I),P[I]=1;if(W[I]!==F)e.vertexAttribDivisor(I,F),W[I]=F}function w(){let I=r.newAttributes,F=r.enabledAttributes;for(let J=0,P=F.length;J<P;J++)if(F[J]!==I[J])e.disableVertexAttribArray(J),F[J]=0}function T(I,F,J,P,W,ee,V){if(V===!0)e.vertexAttribIPointer(I,F,J,W,ee);else e.vertexAttribPointer(I,F,J,P,W,ee)}function y(I,F,J,P){b();let W=P.attributes,ee=J.getAttributes(),V=F.defaultAttributeValues;for(let re in ee){let q=ee[re];if(q.location>=0){let te=W[re];if(te===void 0){if(re==="instanceMatrix"&&I.instanceMatrix)te=I.instanceMatrix;if(re==="instanceColor"&&I.instanceColor)te=I.instanceColor}if(te!==void 0){let ne=te.normalized,Pe=te.itemSize,we=t.get(te);if(we===void 0)continue;let{buffer:et,type:Fe,bytesPerElement:Z}=we,se=Fe===e.INT||Fe===e.UNSIGNED_INT||te.gpuType===co;if(te.isInterleavedBufferAttribute){let ce=te.data,_e=ce.stride,xe=te.offset;if(ce.isInstancedInterleavedBuffer){for(let ve=0;ve<q.locationSize;ve++)u(q.location+ve,ce.meshPerAttribute);if(I.isInstancedMesh!==!0&&P._maxInstanceCount===void 0)P._maxInstanceCount=ce.meshPerAttribute*ce.count}else for(let ve=0;ve<q.locationSize;ve++)p(q.location+ve);e.bindBuffer(e.ARRAY_BUFFER,et);for(let ve=0;ve<q.locationSize;ve++)T(q.location+ve,Pe/q.locationSize,Fe,ne,_e*Z,(xe+Pe/q.locationSize*ve)*Z,se)}else{if(te.isInstancedBufferAttribute){for(let ce=0;ce<q.locationSize;ce++)u(q.location+ce,te.meshPerAttribute);if(I.isInstancedMesh!==!0&&P._maxInstanceCount===void 0)P._maxInstanceCount=te.meshPerAttribute*te.count}else for(let ce=0;ce<q.locationSize;ce++)p(q.location+ce);e.bindBuffer(e.ARRAY_BUFFER,et);for(let ce=0;ce<q.locationSize;ce++)T(q.location+ce,Pe/q.locationSize,Fe,ne,Pe*Z,Pe/q.locationSize*ce*Z,se)}}else if(V!==void 0){let ne=V[re];if(ne!==void 0)switch(ne.length){case 2:e.vertexAttrib2fv(q.location,ne);break;case 3:e.vertexAttrib3fv(q.location,ne);break;case 4:e.vertexAttrib4fv(q.location,ne);break;default:e.vertexAttrib1fv(q.location,ne)}}}}w()}function M(){S();for(let I in i){let F=i[I];for(let J in F){let P=F[J];for(let W in P){let ee=P[W];for(let V in ee)d(ee[V].object),delete ee[V];delete P[W]}}delete i[I]}}function R(I){if(i[I.id]===void 0)return;let F=i[I.id];for(let J in F){let P=F[J];for(let W in P){let ee=P[W];for(let V in ee)d(ee[V].object),delete ee[V];delete P[W]}}delete i[I.id]}function A(I){for(let F in i){let J=i[F];for(let P in J){let W=J[P];if(W[I.id]===void 0)continue;let ee=W[I.id];for(let V in ee)d(ee[V].object),delete ee[V];delete W[I.id]}}}function g(I){for(let F in i){let J=i[F],P=I.isInstancedMesh===!0?I.id:0,W=J[P];if(W===void 0)continue;for(let ee in W){let V=W[ee];for(let re in V)d(V[re].object),delete V[re];delete W[ee]}if(delete J[P],Object.keys(J).length===0)delete i[F]}}function S(){if(B(),a=!0,r===s)return;r=s,c(r.object)}function B(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:S,resetDefaultState:B,dispose:M,releaseStatesOfGeometry:R,releaseStatesOfObject:g,releaseStatesOfProgram:A,initAttributes:b,enableAttribute:p,disableUnusedAttributes:w}}function um(e,t,n){let i;function s(l){i=l}function r(l,c){e.drawArrays(i,l,c),n.update(c,i,1)}function a(l,c,d){if(d===0)return;e.drawArraysInstanced(i,l,c,d),n.update(c,i,d)}function o(l,c,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,d);let h=0;for(let m=0;m<d;m++)h+=c[m];n.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function dm(e,t,n,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");s=e.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){if(A!==Pn&&i.convert(A)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function o(A){let g=A===In&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));if(A!==yn&&A!==Yn&&!g&&i.convert(A)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))return!1;return!0}function l(A){if(A==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";A="mediump"}if(A==="mediump"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let c=n.precision!==void 0?n.precision:"highp",d=l(c);if(d!==c)Ne("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d;let f=n.logarithmicDepthBuffer===!0,h=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");if(n.reversedDepthBuffer===!0&&h===!1)Ne("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let m=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),x=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=e.getParameter(e.MAX_TEXTURE_SIZE),p=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),u=e.getParameter(e.MAX_VERTEX_ATTRIBS),w=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),T=e.getParameter(e.MAX_VARYING_VECTORS),y=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),M=e.getParameter(e.MAX_SAMPLES),R=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:x,maxTextureSize:b,maxCubemapSize:p,maxAttributes:u,maxVertexUniforms:w,maxVaryings:T,maxFragmentUniforms:y,maxSamples:M,samples:R}}function fm(e){let t=this,n=null,i=0,s=!1,r=!1,a=new Rn,o=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let m=f.length!==0||h||i!==0||s;return s=h,i=f.length,m},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){n=d(f,h,0)},this.setState=function(f,h,m){let{clippingPlanes:x,clipIntersection:b,clipShadows:p}=f,u=e.get(f);if(!s||x===null||x.length===0||r&&!p)if(r)d(null);else c();else{let w=r?0:i,T=w*4,y=u.clippingState||null;l.value=y,y=d(x,h,T,m);for(let M=0;M!==T;++M)y[M]=n[M];u.clippingState=y,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=w}};function c(){if(l.value!==n)l.value=n,l.needsUpdate=i>0;t.numPlanes=i,t.numIntersection=0}function d(f,h,m,x){let b=f!==null?f.length:0,p=null;if(b!==0){if(p=l.value,x!==!0||p===null){let u=m+b*4,w=h.matrixWorldInverse;if(o.getNormalMatrix(w),p===null||p.length<u)p=new Float32Array(u);for(let T=0,y=m;T!==b;++T,y+=4)a.copy(f[T]).applyMatrix4(w,o),a.normal.toArray(p,y),p[y+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=b,t.numIntersection=0,p}}var fs=4,pm=6,mm=20,gm=256,Zs=new Kn,Nh=new He,wl=null,Tl=0,Al=0,Rl=!1,_m=new C,Bi=new C;class Pl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=0.1,i=100,s={}){let{size:r=256,position:a=_m}=s;wl=this._renderer.getRenderTarget(),Tl=this._renderer.getActiveCubeFace(),Al=this._renderer.getActiveMipmapLevel(),Rl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);let o=this._allocateTargets();if(o.depthBuffer=!0,this._sceneToCubeUV(e,n,i,o,a),t>0)this._blur(o,0,0,t);return this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=Fh(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=Uh(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(wl,Tl,Al),this._renderer.xr.enabled=Rl,e.scissorTest=!1,ds(e,0,0,e.width,e.height)}_fromTexture(e,t){if(e.mapping===os||e.mapping===Ti)this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width);else this._setSize(e.image.width/4);wl=this._renderer.getRenderTarget(),Tl=this._renderer.getActiveCubeFace(),Al=this._renderer.getActiveMipmapLevel(),Rl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Qt,minFilter:Qt,generateMipmaps:!1,type:In,format:Pn,colorSpace:Yo,depthBuffer:!1},i=Dh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=Dh(e,t,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=xm(s)),this._blurMaterial=vm(s,e,t),this._ggxMaterial=ym(s,e,t)}return i}_compileMaterial(e){let t=new Ze(new bt,e);this._renderer.compile(t,Zs)}_sceneToCubeUV(e,t,n,i,s){let o=new rn(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,{autoClear:f,toneMapping:h}=d;if(d.getClearColor(Nh),d.toneMapping=xn,d.autoClear=!1,d.state.buffers.depth.getReversed())d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new Ze(new vn,new on({name:"PMREM.Background",side:Wt,depthWrite:!1,depthTest:!1}));let x=this._backgroundBox,b=x.material,p=!1,u=e.background;if(u){if(u.isColor)b.color.copy(u),e.background=null,p=!0}else b.color.copy(Nh),p=!0;for(let w=0;w<6;w++){let T=w%3;if(T===0)o.up.set(0,l[w],0),o.position.set(s.x,s.y,s.z),o.lookAt(s.x+c[w],s.y,s.z);else if(T===1)o.up.set(0,0,l[w]),o.position.set(s.x,s.y,s.z),o.lookAt(s.x,s.y+c[w],s.z);else o.up.set(0,l[w],0),o.position.set(s.x,s.y,s.z),o.lookAt(s.x,s.y,s.z+c[w]);let y=this._cubeSize;if(ds(i,T*y,w>2?y:0,y,y),d.setRenderTarget(i),p)d.render(x,o);d.render(e,o)}d.toneMapping=h,d.autoClear=f,e.background=u}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===os||e.mapping===Ti;if(i){if(this._cubemapMaterial===null)this._cubemapMaterial=Fh();this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=Uh();let s=i?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=s;let a=s.uniforms;a.envMap.value=e;let o=this._cubeSize;ds(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(r,Zs)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){let i=this._renderer,s=this._pingPongRenderTarget,r=this._ggxMaterial,a=this._lodMeshes[n];a.material=r;let o=r.uniforms,l=n/(this._lodMeshes.length-1),c=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-c*c),f=l*1.25,h=d*f,{_lodMax:m}=this,x=this._sizeLods[n],b=3*x*(n>m-fs?n-m+fs:0),p=4*(this._cubeSize-x);o.envMap.value=e.texture,o.roughness.value=h,o.mipInt.value=m-t,ds(s,b,p,3*x,2*x),i.setRenderTarget(s),i.render(a,Zs),o.envMap.value=s.texture,o.roughness.value=0,o.mipInt.value=m-n,ds(e,b,p,3*x,2*x),i.setRenderTarget(e),i.render(a,Zs)}_blur(e,t,n,i){let s=this._pingPongRenderTarget,r=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,r),this._blurPass(s,e,n,n,r)}_blurPass(e,t,n,i,s){let r=this._renderer,a=this._blurMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-n;let c=this._sizeLods[i],d=3*c*(i>this._lodMax-fs?i-this._lodMax+fs:0),f=4*(this._cubeSize-c);ds(t,d,f,3*c,2*c),r.setRenderTarget(t),r.render(o,Zs)}}function xm(e){let t=[],n=[],i=e,s=e-fs+1+pm;for(let r=0;r<s;r++){let a=Math.pow(2,i);t.push(a);let o=1/(a-2),l=-o,c=1+o,d=[l,l,c,l,c,c,l,l,c,c,l,c],f=6,h=6,m=3,x=new Float32Array(m*h*f),b=new Float32Array(m*h*f);for(let u=0;u<f;u++){let w=u%3*2/3-1,T=u>2?0:-1,y=[w,T,0,w+0.6666666666666666,T,0,w+0.6666666666666666,T+1,0,w,T,0,w+0.6666666666666666,T+1,0,w,T+1,0];x.set(y,m*h*u);for(let M=0;M<h;M++){let R=d[M*2]*2-1,A=d[M*2+1]*2-1;if(u===0)Bi.set(1,A,R);else if(u===1)Bi.set(-R,1,-A);else if(u===2)Bi.set(-R,A,1);else if(u===3)Bi.set(-1,A,-R);else if(u===4)Bi.set(-R,-1,A);else Bi.set(R,A,-1);Bi.toArray(b,(u*h+M)*m)}}let p=new bt;if(p.setAttribute("position",new Jt(x,m)),p.setAttribute("outputDirection",new Jt(b,m)),n.push(new Ze(p,null)),i>fs)i--}return{lodMeshes:n,sizeLods:t}}function Dh(e,t,n){let i=new an(e,t,n);return i.texture.mapping=Ds,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ds(e,t,n,i,s){e.viewport.set(t,n,i,s),e.scissor.set(t,n,i,s)}function ym(e,t,n){return new un({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:gm,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ra(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function vm(e,t,n){return new un({name:"SphericalGaussianBlur",defines:{SAMPLES:mm,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:ra(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function Uh(){return new un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function Fh(){return new un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function ra(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Dl extends an{constructor(e=1,t={}){super(e,e,t);this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Jr(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new vn(5,5,5),s=new un({name:"CubemapFromEquirect",uniforms:Di(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Wt,blending:Cn});s.uniforms.tEquirect.value=t;let r=new Ze(i,s),a=t.minFilter;if(t.minFilter===Ai)t.minFilter=Qt;return new yl(1,10,this).update(e,r),t.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,n,i);e.setRenderTarget(s)}}function Sm(e){let t=new WeakMap,n=new WeakMap,i=null;function s(h,m=!1){if(h===null||h===void 0)return null;if(m)return a(h);return r(h)}function r(h){if(h&&h.isTexture){let m=h.mapping;if(m===Pr||m===Lr)if(t.has(h)){let x=t.get(h).texture;return o(x,h.mapping)}else{let x=h.image;if(x&&x.height>0){let b=new Dl(x.height);return b.fromEquirectangularTexture(e,h),t.set(h,b),h.addEventListener("dispose",c),o(b.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let m=h.mapping,x=m===Pr||m===Lr,b=m===os||m===Ti;if(x||b){let p=n.get(h),u=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==u){if(i===null)i=new Pl(e);return p=x?i.fromEquirectangular(h,p):i.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,n.set(h,p),p.texture}else if(p!==void 0)return p.texture;else{let w=h.image;if(x&&w&&w.height>0||b&&w&&l(w)){if(i===null)i=new Pl(e);return p=x?i.fromEquirectangular(h):i.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,n.set(h,p),h.addEventListener("dispose",d),p.texture}else return null}}}return h}function o(h,m){if(m===Pr)h.mapping=os;else if(m===Lr)h.mapping=Ti;return h}function l(h){let m=0,x=6;for(let b=0;b<x;b++)if(h[b]!==void 0)m++;return m===x}function c(h){let m=h.target;m.removeEventListener("dispose",c);let x=t.get(m);if(x!==void 0)t.delete(m),x.dispose()}function d(h){let m=h.target;m.removeEventListener("dispose",d);let x=n.get(m);if(x!==void 0)n.delete(m),x.dispose()}function f(){if(t=new WeakMap,n=new WeakMap,i!==null)i.dispose(),i=null}return{get:s,dispose:f}}function Mm(e){let t={};function n(i){if(t[i]!==void 0)return t[i];let s=e.getExtension(i);return t[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let s=n(i);if(s===null)wi("WebGLRenderer: "+i+" extension not supported.");return s}}}function bm(e,t,n,i){let s={},r=new WeakMap;function a(f){let h=f.target;if(h.index!==null)t.remove(h.index);for(let x in h.attributes)t.remove(h.attributes[x]);h.removeEventListener("dispose",a),delete s[h.id];let m=r.get(h);if(m)t.remove(m),r.delete(h);if(i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0)delete h._maxInstanceCount;n.memory.geometries--}function o(f,h){if(s[h.id]===!0)return h;return h.addEventListener("dispose",a),s[h.id]=!0,n.memory.geometries++,h}function l(f){let h=f.attributes;for(let m in h)t.update(h[m],e.ARRAY_BUFFER)}function c(f){let h=[],m=f.index,x=f.attributes.position,b=0;if(x===void 0)return;if(m!==null){let w=m.array;b=m.version;for(let T=0,y=w.length;T<y;T+=3){let M=w[T+0],R=w[T+1],A=w[T+2];h.push(M,R,R,A,A,M)}}else{let w=x.array;b=x.version;for(let T=0,y=w.length/3-1;T<y;T+=3){let M=T+0,R=T+1,A=T+2;h.push(M,R,R,A,A,M)}}let p=new(x.count>=65535?Yr:qr)(h,1);p.version=b;let u=r.get(f);if(u)t.remove(u);r.set(f,p)}function d(f){let h=r.get(f);if(h){let m=f.index;if(m!==null){if(h.version<m.version)c(f)}}else c(f);return r.get(f)}return{get:o,update:l,getWireframeAttribute:d}}function Em(e,t,n){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,h){e.drawElements(i,h,r,f*a),n.update(h,i,1)}function c(f,h,m){if(m===0)return;e.drawElementsInstanced(i,h,r,f*a,m),n.update(h,i,m)}function d(f,h,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,f,0,m);let b=0;for(let p=0;p<m;p++)b+=h[p];n.update(b,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function wm(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(n.calls++,a){case e.TRIANGLES:n.triangles+=o*(r/3);break;case e.LINES:n.lines+=o*(r/2);break;case e.LINE_STRIP:n.lines+=o*(r-1);break;case e.LINE_LOOP:n.lines+=o*r;break;case e.POINTS:n.points+=o*r;break;default:Ue("WebGLInfo: Unknown draw mode:",a);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:s,update:i}}function Tm(e,t,n){let i=new WeakMap,s=new yt;function r(a,o,l){let c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=d!==void 0?d.length:0,h=i.get(o);if(h===void 0||h.count!==f){let S=function(){A.dispose(),i.delete(o),o.removeEventListener("dispose",S)};if(h!==void 0)h.texture.dispose();let m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,b=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],u=o.morphAttributes.normal||[],w=o.morphAttributes.color||[],T=0;if(m===!0)T=1;if(x===!0)T=2;if(b===!0)T=3;let y=o.attributes.position.count*T,M=1;if(y>t.maxTextureSize)M=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize;let R=new Float32Array(y*M*4*f),A=new Wr(R,y,M,f);A.type=Yn,A.needsUpdate=!0;let g=T*4;for(let B=0;B<f;B++){let I=p[B],F=u[B],J=w[B],P=y*M*4*B;for(let W=0;W<I.count;W++){let ee=W*g;if(m===!0)s.fromBufferAttribute(I,W),R[P+ee+0]=s.x,R[P+ee+1]=s.y,R[P+ee+2]=s.z,R[P+ee+3]=0;if(x===!0)s.fromBufferAttribute(F,W),R[P+ee+4]=s.x,R[P+ee+5]=s.y,R[P+ee+6]=s.z,R[P+ee+7]=0;if(b===!0)s.fromBufferAttribute(J,W),R[P+ee+8]=s.x,R[P+ee+9]=s.y,R[P+ee+10]=s.z,R[P+ee+11]=J.itemSize===4?s.w:1}}h={count:f,texture:A,size:new Be(y,M)},i.set(o,h),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",a.morphTexture,n);else{let m=0;for(let b=0;b<c.length;b++)m+=c[b];let x=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(e,"morphTargetBaseInfluence",x),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",h.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",h.size)}return{update:r}}function Am(e,t,n,i,s){let r=new WeakMap;function a(c){let d=s.render.frame,f=c.geometry,h=t.get(c,f);if(r.get(h)!==d)t.update(h),r.set(h,d);if(c.isInstancedMesh){if(c.hasEventListener("dispose",l)===!1)c.addEventListener("dispose",l);if(r.get(c)!==d){if(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null)n.update(c.instanceColor,e.ARRAY_BUFFER);r.set(c,d)}}if(c.isSkinnedMesh){let m=c.skeleton;if(r.get(m)!==d)m.update(),r.set(m,d)}return h}function o(){r=new WeakMap}function l(c){let d=c.target;if(d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),n.remove(d.instanceMatrix),d.instanceColor!==null)n.remove(d.instanceColor)}return{update:a,dispose:o}}var Rm={[io]:"LINEAR_TONE_MAPPING",[so]:"REINHARD_TONE_MAPPING",[ro]:"CINEON_TONE_MAPPING",[Ns]:"ACES_FILMIC_TONE_MAPPING",[oo]:"AGX_TONE_MAPPING",[lo]:"NEUTRAL_TONE_MAPPING",[ao]:"CUSTOM_TONE_MAPPING"};function Cm(e,t,n,i,s,r){let a=new an(t,n,{type:e,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new bt;c.setAttribute("position",new st([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new st([0,2,0,0,2,0],2));let d=new rl({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new Ze(c,d),h=new Kn(-1,1,1,-1,0,1),m=null,x=null,b=!1,p,u=null,w=[],T=!1;this.setSize=function(y,M){if(a.setSize(y,M),o!==null)o.setSize(y,M);if(l!==null)l.setSize(y,M);for(let R=0;R<w.length;R++){let A=w[R];if(A.setSize)A.setSize(y,M)}},this.setEffects=function(y){w=y,T=w.length>0&&w[0].isRenderPass===!0;let{width:M,height:R}=a;if(w.length>0&&o===null)o=new an(M,R,{type:In,depthBuffer:!1,stencilBuffer:!1}),l=new an(M,R,{type:In,depthBuffer:!1,stencilBuffer:!1});for(let A=0;A<w.length;A++){let g=w[A];if(g.setSize)g.setSize(M,R)}},this.begin=function(y,M){if(b)return!1;if(y.toneMapping===xn&&w.length===0)return!1;if(u=M,M!==null){let{width:R,height:A}=M;if(a.width!==R||a.height!==A)this.setSize(R,A)}if(T===!1)y.setRenderTarget(a);return p=y.toneMapping,y.toneMapping=xn,!0},this.hasRenderPass=function(){return T},this.end=function(y,M){y.toneMapping=p,b=!0;let R=a,A=o;for(let g=0;g<w.length;g++){let S=w[g];if(S.enabled===!1)continue;if(S.render(y,A,R,M),S.needsSwap!==!1)R=A,A=A===o?l:o}if(m!==y.outputColorSpace||x!==y.toneMapping){if(m=y.outputColorSpace,x=y.toneMapping,d.defines={},je.getTransfer(m)===gt)d.defines.SRGB_TRANSFER="";let g=Rm[x];if(g)d.defines[g]="";d.needsUpdate=!0}d.uniforms.tDiffuse.value=R.texture,y.setRenderTarget(u),y.render(f,h),u=null,b=!1},this.isCompositing=function(){return b},this.dispose=function(){if(a.dispose(),o!==null)o.dispose();if(l!==null)l.dispose();c.dispose(),d.dispose()}}var nu=new Vt,Ll=new Li(1,1),iu=new Wr,su=new el,ru=new Jr,Oh=[],Bh=[],zh=new Float32Array(16),kh=new Float32Array(9),Hh=new Float32Array(4);function ps(e,t,n){let i=e[0];if(i<=0||i>0)return e;let s=t*n,r=Oh[s];if(r===void 0)r=new Float32Array(s),Oh[s]=r;if(t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=n,e[a].toArray(r,o)}return r}function Lt(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Nt(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function aa(e,t){let n=Bh[t];if(n===void 0)n=new Int32Array(t),Bh[t]=n;for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function Im(e,t){let n=this.cache;if(n[0]===t)return;e.uniform1f(this.addr,t),n[0]=t}function Pm(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y)e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y}else{if(Lt(n,t))return;e.uniform2fv(this.addr,t),Nt(n,t)}}function Lm(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z}else if(t.r!==void 0){if(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b}else{if(Lt(n,t))return;e.uniform3fv(this.addr,t),Nt(n,t)}}function Nm(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w}else{if(Lt(n,t))return;e.uniform4fv(this.addr,t),Nt(n,t)}}function Dm(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Lt(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Nt(n,t)}else{if(Lt(n,i))return;Hh.set(i),e.uniformMatrix2fv(this.addr,!1,Hh),Nt(n,i)}}function Um(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Lt(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Nt(n,t)}else{if(Lt(n,i))return;kh.set(i),e.uniformMatrix3fv(this.addr,!1,kh),Nt(n,i)}}function Fm(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Lt(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Nt(n,t)}else{if(Lt(n,i))return;zh.set(i),e.uniformMatrix4fv(this.addr,!1,zh),Nt(n,i)}}function Om(e,t){let n=this.cache;if(n[0]===t)return;e.uniform1i(this.addr,t),n[0]=t}function Bm(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y)e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y}else{if(Lt(n,t))return;e.uniform2iv(this.addr,t),Nt(n,t)}}function zm(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z}else{if(Lt(n,t))return;e.uniform3iv(this.addr,t),Nt(n,t)}}function km(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w}else{if(Lt(n,t))return;e.uniform4iv(this.addr,t),Nt(n,t)}}function Hm(e,t){let n=this.cache;if(n[0]===t)return;e.uniform1ui(this.addr,t),n[0]=t}function Gm(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y)e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y}else{if(Lt(n,t))return;e.uniform2uiv(this.addr,t),Nt(n,t)}}function Vm(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z}else{if(Lt(n,t))return;e.uniform3uiv(this.addr,t),Nt(n,t)}}function Wm(e,t){let n=this.cache;if(t.x!==void 0){if(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w}else{if(Lt(n,t))return;e.uniform4uiv(this.addr,t),Nt(n,t)}}function Xm(e,t,n){let i=this.cache,s=n.allocateTextureUnit();if(i[0]!==s)e.uniform1i(this.addr,s),i[0]=s;let r;if(this.type===e.SAMPLER_2D_SHADOW)Ll.compareFunction=n.isReversedDepthBuffer()?Vr:Gr,r=Ll;else r=nu;n.setTexture2D(t||r,s)}function qm(e,t,n){let i=this.cache,s=n.allocateTextureUnit();if(i[0]!==s)e.uniform1i(this.addr,s),i[0]=s;n.setTexture3D(t||su,s)}function Ym(e,t,n){let i=this.cache,s=n.allocateTextureUnit();if(i[0]!==s)e.uniform1i(this.addr,s),i[0]=s;n.setTextureCube(t||ru,s)}function Zm(e,t,n){let i=this.cache,s=n.allocateTextureUnit();if(i[0]!==s)e.uniform1i(this.addr,s),i[0]=s;n.setTexture2DArray(t||iu,s)}function $m(e){switch(e){case 5126:return Im;case 35664:return Pm;case 35665:return Lm;case 35666:return Nm;case 35674:return Dm;case 35675:return Um;case 35676:return Fm;case 5124:case 35670:return Om;case 35667:case 35671:return Bm;case 35668:case 35672:return zm;case 35669:case 35673:return km;case 5125:return Hm;case 36294:return Gm;case 36295:return Vm;case 36296:return Wm;case 35678:case 36198:case 36298:case 36306:case 35682:return Xm;case 35679:case 36299:case 36307:return qm;case 35680:case 36300:case 36308:case 36293:return Ym;case 36289:case 36303:case 36311:case 36292:return Zm}}function Jm(e,t){e.uniform1fv(this.addr,t)}function Km(e,t){let n=ps(t,this.size,2);e.uniform2fv(this.addr,n)}function jm(e,t){let n=ps(t,this.size,3);e.uniform3fv(this.addr,n)}function Qm(e,t){let n=ps(t,this.size,4);e.uniform4fv(this.addr,n)}function eg(e,t){let n=ps(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function tg(e,t){let n=ps(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function ng(e,t){let n=ps(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function ig(e,t){e.uniform1iv(this.addr,t)}function sg(e,t){e.uniform2iv(this.addr,t)}function rg(e,t){e.uniform3iv(this.addr,t)}function ag(e,t){e.uniform4iv(this.addr,t)}function og(e,t){e.uniform1uiv(this.addr,t)}function lg(e,t){e.uniform2uiv(this.addr,t)}function cg(e,t){e.uniform3uiv(this.addr,t)}function hg(e,t){e.uniform4uiv(this.addr,t)}function ug(e,t,n){let i=this.cache,s=t.length,r=aa(n,s);if(!Lt(i,r))e.uniform1iv(this.addr,r),Nt(i,r);let a;if(this.type===e.SAMPLER_2D_SHADOW)a=Ll;else a=nu;for(let o=0;o!==s;++o)n.setTexture2D(t[o]||a,r[o])}function dg(e,t,n){let i=this.cache,s=t.length,r=aa(n,s);if(!Lt(i,r))e.uniform1iv(this.addr,r),Nt(i,r);for(let a=0;a!==s;++a)n.setTexture3D(t[a]||su,r[a])}function fg(e,t,n){let i=this.cache,s=t.length,r=aa(n,s);if(!Lt(i,r))e.uniform1iv(this.addr,r),Nt(i,r);for(let a=0;a!==s;++a)n.setTextureCube(t[a]||ru,r[a])}function pg(e,t,n){let i=this.cache,s=t.length,r=aa(n,s);if(!Lt(i,r))e.uniform1iv(this.addr,r),Nt(i,r);for(let a=0;a!==s;++a)n.setTexture2DArray(t[a]||iu,r[a])}function mg(e){switch(e){case 5126:return Jm;case 35664:return Km;case 35665:return jm;case 35666:return Qm;case 35674:return eg;case 35675:return tg;case 35676:return ng;case 5124:case 35670:return ig;case 35667:case 35671:return sg;case 35668:case 35672:return rg;case 35669:case 35673:return ag;case 5125:return og;case 36294:return lg;case 36295:return cg;case 36296:return hg;case 35678:case 36198:case 36298:case 36306:case 35682:return ug;case 35679:case 36299:case 36307:return dg;case 35680:case 36300:case 36308:case 36293:return fg;case 36289:case 36303:case 36311:case 36292:return pg}}class au{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=$m(t.type)}}class ou{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=mg(t.type)}}class lu{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,r=i.length;s!==r;++s){let a=i[s];a.setValue(e,t[a.id],n)}}}var Cl=/(\w+)(\])?(\[|\.)?/g;function Gh(e,t){e.seq.push(t),e.map[t.id]=t}function gg(e,t,n){let i=e.name,s=i.length;Cl.lastIndex=0;while(!0){let r=Cl.exec(i),a=Cl.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l)o=o|0;if(c===void 0||c==="["&&a+2===s){Gh(n,c===void 0?new au(o,e,t):new ou(o,e,t));break}else{let f=n.map[o];if(f===void 0)f=new lu(o),Gh(n,f);n=f}}}class Ks{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let a=e.getActiveUniform(t,r),o=e.getUniformLocation(t,a.name);gg(a,o,this)}let i=[],s=[];for(let r of this.seq)if(r.type===e.SAMPLER_2D_SHADOW||r.type===e.SAMPLER_CUBE_SHADOW||r.type===e.SAMPLER_2D_ARRAY_SHADOW)i.push(r);else s.push(r);if(i.length>0)this.seq=i.concat(s)}setValue(e,t,n,i){let s=this.map[t];if(s!==void 0)s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];if(i!==void 0)this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,r=t.length;s!==r;++s){let a=t[s],o=n[a.id];if(o.needsUpdate!==!1)a.setValue(e,o.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let r=e[i];if(r.id in t)n.push(r)}return n}}function Vh(e,t,n){let i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}var _g=37297,xg=0;function yg(e,t){let n=e.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,n.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}var Wh=new Ge;function vg(e){je._getMatrix(Wh,je.workingColorSpace,e);let t=`mat3( ${Wh.elements.map((n)=>n.toFixed(4))} )`;switch(je.getTransfer(e)){case Zo:return[t,"LinearTransferOETF"];case gt:return[t,"sRGBTransferOETF"];default:return Ne("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function Xh(e,t,n){let i=e.getShaderParameter(t,e.COMPILE_STATUS),r=(e.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return n.toUpperCase()+`

`+r+`

`+yg(e.getShaderSource(t),o)}else return r}function Sg(e,t){let n=vg(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}var Mg={[io]:"Linear",[so]:"Reinhard",[ro]:"Cineon",[Ns]:"ACESFilmic",[oo]:"AgX",[lo]:"Neutral",[ao]:"Custom"};function bg(e,t){let n=Mg[t];if(n===void 0)return Ne("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var sa=new C;function Eg(){je.getLuminanceCoefficients(sa);let e=sa.x.toFixed(4),t=sa.y.toFixed(4),n=sa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function wg(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Js).join(`
`)}function Tg(e){let t=[];for(let n in e){let i=e[n];if(i===!1)continue;t.push("#define "+n+" "+i)}return t.join(`
`)}function Ag(e,t){let n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=e.getActiveAttrib(t,s),a=r.name,o=1;if(r.type===e.FLOAT_MAT2)o=2;if(r.type===e.FLOAT_MAT3)o=3;if(r.type===e.FLOAT_MAT4)o=4;n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Js(e){return e!==""}function qh(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Yh(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Rg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nl(e){return e.replace(Rg,Ig)}var Cg=new Map;function Ig(e,t){let n=Xe[t];if(n===void 0){let i=Cg.get(t);if(i!==void 0)n=Xe[i],Ne('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Nl(n)}var Pg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zh(e){return e.replace(Pg,Lg)}function Lg(e,t,n,i){let s="";for(let r=parseInt(t);r<parseInt(n);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function $h(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;if(e.precision==="highp")t+=`
#define HIGH_PRECISION`;else if(e.precision==="mediump")t+=`
#define MEDIUM_PRECISION`;else if(e.precision==="lowp")t+=`
#define LOW_PRECISION`;return t}var Ng={[Ps]:"SHADOWMAP_TYPE_PCF",[rs]:"SHADOWMAP_TYPE_VSM"};function Dg(e){return Ng[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Ug={[os]:"ENVMAP_TYPE_CUBE",[Ti]:"ENVMAP_TYPE_CUBE",[Ds]:"ENVMAP_TYPE_CUBE_UV"};function Fg(e){if(e.envMap===!1)return"ENVMAP_TYPE_CUBE";return Ug[e.envMapMode]||"ENVMAP_TYPE_CUBE"}var Og={[Ti]:"ENVMAP_MODE_REFRACTION"};function Bg(e){if(e.envMap===!1)return"ENVMAP_MODE_REFLECTION";return Og[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}var zg={[ih]:"ENVMAP_BLENDING_MULTIPLY",[sh]:"ENVMAP_BLENDING_MIX",[rh]:"ENVMAP_BLENDING_ADD"};function kg(e){if(e.envMap===!1)return"ENVMAP_BLENDING_NONE";return zg[e.combine]||"ENVMAP_BLENDING_NONE"}function Hg(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function Gg(e,t,n,i){let s=e.getContext(),{defines:r,vertexShader:a,fragmentShader:o}=n,l=Dg(n),c=Fg(n),d=Bg(n),f=kg(n),h=Hg(n),m=wg(n),x=Tg(r),b=s.createProgram(),p,u,w=n.glslVersion?"#version "+n.glslVersion+`
`:"";if(n.isRawShaderMaterial){if(p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x].filter(Js).join(`
`),p.length>0)p+=`
`;if(u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x].filter(Js).join(`
`),u.length>0)u+=`
`}else p=[$h(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(Js).join(`
`),u=[$h(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==xn?"#define TONE_MAPPING":"",n.toneMapping!==xn?Xe.tonemapping_pars_fragment:"",n.toneMapping!==xn?bg("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,Sg("linearToOutputTexel",n.outputColorSpace),Eg(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Js).join(`
`);if(a=Nl(a),a=qh(a,n),a=Yh(a,n),o=Nl(o),o=qh(o,n),o=Yh(o,n),a=Zh(a),o=Zh(o),n.isRawShaderMaterial!==!0)w=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,u=["#define varying in",n.glslVersion===$o?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===$o?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u;let T=w+p+a,y=w+u+o,M=Vh(s,s.VERTEX_SHADER,T),R=Vh(s,s.FRAGMENT_SHADER,y);if(s.attachShader(b,M),s.attachShader(b,R),n.index0AttributeName!==void 0)s.bindAttribLocation(b,0,n.index0AttributeName);else if(n.hasPositionAttribute===!0)s.bindAttribLocation(b,0,"position");s.linkProgram(b);function A(I){if(e.debug.checkShaderErrors){let F=s.getProgramInfoLog(b)||"",J=s.getShaderInfoLog(M)||"",P=s.getShaderInfoLog(R)||"",W=F.trim(),ee=J.trim(),V=P.trim(),re=!0,q=!0;if(s.getProgramParameter(b,s.LINK_STATUS)===!1)if(re=!1,typeof e.debug.onShaderError==="function")e.debug.onShaderError(s,b,M,R);else{let te=Xh(s,M,"vertex"),ne=Xh(s,R,"fragment");Ue("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(b,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+W+`
`+te+`
`+ne)}else if(W!=="")Ne("WebGLProgram: Program Info Log:",W);else if(ee===""||V==="")q=!1;if(q)I.diagnostics={runnable:re,programLog:W,vertexShader:{log:ee,prefix:p},fragmentShader:{log:V,prefix:u}}}s.deleteShader(M),s.deleteShader(R),g=new Ks(s,b),S=Ag(s,b)}let g;this.getUniforms=function(){if(g===void 0)A(this);return g};let S;this.getAttributes=function(){if(S===void 0)A(this);return S};let B=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(B===!1)B=s.getProgramParameter(b,_g);return B},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(b),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=xg++,this.cacheKey=t,this.usedTimes=1,this.program=b,this.vertexShader=M,this.fragmentShader=R,this}var Vg=0;class cu{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let i=this._getShaderCacheForMaterial(e);if(i.has(t)===!1)i.add(t),t.usedTimes++;if(i.has(n)===!1)i.add(n),n.usedTimes++;return this}remove(e){let t=this.materialCache.get(e);for(let n of t)if(n.usedTimes--,n.usedTimes===0)this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);if(n===void 0)n=new Set,t.set(e,n);return n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);if(n===void 0)n=new hu(e),t.set(e,n);return n}}class hu{constructor(e){this.id=Vg++,this.code=e,this.usedTimes=0}}function Wg(e){return e===Ii||e===zr||e===kr}function Xg(e,t,n,i,s,r){let a=new Xr,o=new cu,l=new Set,c=[],d=new Map,{logarithmicDepthBuffer:f,precision:h}=i,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(g){if(l.add(g),g===0)return"uv";return`uv${g}`}function b(g,S,B,I,F,J){let P=I.fog,W=F.geometry,ee=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?I.environment:null,V=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap,re=t.get(g.envMap||ee,V),q=!!re&&re.mapping===Ds?re.image.height:null,te=m[g.type];if(g.precision!==null){if(h=i.getMaxPrecision(g.precision),h!==g.precision)Ne("WebGLProgram.getParameters:",g.precision,"not supported, using",h,"instead.")}let ne=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Pe=ne!==void 0?ne.length:0,we=0;if(W.morphAttributes.position!==void 0)we=1;if(W.morphAttributes.normal!==void 0)we=2;if(W.morphAttributes.color!==void 0)we=3;let et,Fe,Z,se;if(te){let ke=Fn[te];et=ke.vertexShader,Fe=ke.fragmentShader}else{et=g.vertexShader,Fe=g.fragmentShader;let ke=o.getVertexShaderStage(g),Ie=o.getFragmentShaderStage(g);o.update(g,ke,Ie),Z=ke.id,se=Ie.id}let ce=e.getRenderTarget(),_e=e.state.buffers.depth.getReversed(),xe=F.isInstancedMesh===!0,ve=F.isBatchedMesh===!0,rt=!!g.map,Ve=!!g.matcap,ze=!!re,tt=!!g.aoMap,Ye=!!g.lightMap,Rt=!!g.bumpMap&&g.wireframe===!1,ut=!!g.normalMap,Ut=!!g.displacementMap,Et=!!g.emissiveMap,wt=!!g.metalnessMap,N=!!g.roughnessMap,Ot=g.anisotropy>0,Oe=g.clearcoat>0,$e=g.dispersion>0,E=g.retroreflectivity>0,_=g.iridescence>0,L=g.sheen>0,G=g.transmission>0,ie=Ot&&!!g.anisotropyMap,le=Oe&&!!g.clearcoatMap,fe=Oe&&!!g.clearcoatNormalMap,Y=Oe&&!!g.clearcoatRoughnessMap,Q=_&&!!g.iridescenceMap,me=_&&!!g.iridescenceThicknessMap,Te=L&&!!g.sheenColorMap,ue=L&&!!g.sheenRoughnessMap,ae=!!g.specularMap,Ce=!!g.specularColorMap,Le=!!g.specularIntensityMap,Qe=G&&!!g.transmissionMap,U=G&&!!g.thicknessMap,he=!!g.gradientMap,K=!!g.alphaMap,de=g.alphaTest>0,j=!!g.alphaHash,O=!!g.extensions,z=xn;if(g.toneMapped){if(ce===null||ce.isXRRenderTarget===!0)z=e.toneMapping}let oe={shaderID:te,shaderType:g.type,shaderName:g.name,vertexShader:et,fragmentShader:Fe,defines:g.defines,customVertexShaderID:Z,customFragmentShaderID:se,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:h,batching:ve,batchingColor:ve&&F._colorsTexture!==null,instancing:xe,instancingColor:xe&&F.instanceColor!==null,instancingMorph:xe&&F.morphTexture!==null,outputColorSpace:ce===null?e.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:je.workingColorSpace,alphaToCoverage:!!g.alphaToCoverage,map:rt,matcap:Ve,envMap:ze,envMapMode:ze&&re.mapping,envMapCubeUVHeight:q,aoMap:tt,lightMap:Ye,bumpMap:Rt,normalMap:ut,displacementMap:Ut,emissiveMap:Et,normalMapObjectSpace:ut&&g.normalMapType===gh,normalMapTangentSpace:ut&&g.normalMapType===qo,packedNormalMap:ut&&g.normalMapType===qo&&Wg(g.normalMap.format),metalnessMap:wt,roughnessMap:N,anisotropy:Ot,anisotropyMap:ie,clearcoat:Oe,clearcoatMap:le,clearcoatNormalMap:fe,clearcoatRoughnessMap:Y,dispersion:$e,retroreflection:E,iridescence:_,iridescenceMap:Q,iridescenceThicknessMap:me,sheen:L,sheenColorMap:Te,sheenRoughnessMap:ue,specularMap:ae,specularColorMap:Ce,specularIntensityMap:Le,transmission:G,transmissionMap:Qe,thicknessMap:U,gradientMap:he,opaque:g.transparent===!1&&g.blending===Ls&&g.alphaToCoverage===!1,alphaMap:K,alphaTest:de,alphaHash:j,combine:g.combine,mapUv:rt&&x(g.map.channel),aoMapUv:tt&&x(g.aoMap.channel),lightMapUv:Ye&&x(g.lightMap.channel),bumpMapUv:Rt&&x(g.bumpMap.channel),normalMapUv:ut&&x(g.normalMap.channel),displacementMapUv:Ut&&x(g.displacementMap.channel),emissiveMapUv:Et&&x(g.emissiveMap.channel),metalnessMapUv:wt&&x(g.metalnessMap.channel),roughnessMapUv:N&&x(g.roughnessMap.channel),anisotropyMapUv:ie&&x(g.anisotropyMap.channel),clearcoatMapUv:le&&x(g.clearcoatMap.channel),clearcoatNormalMapUv:fe&&x(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Y&&x(g.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&x(g.iridescenceMap.channel),iridescenceThicknessMapUv:me&&x(g.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&x(g.sheenColorMap.channel),sheenRoughnessMapUv:ue&&x(g.sheenRoughnessMap.channel),specularMapUv:ae&&x(g.specularMap.channel),specularColorMapUv:Ce&&x(g.specularColorMap.channel),specularIntensityMapUv:Le&&x(g.specularIntensityMap.channel),transmissionMapUv:Qe&&x(g.transmissionMap.channel),thicknessMapUv:U&&x(g.thicknessMap.channel),alphaMapUv:K&&x(g.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(ut||Ot),vertexNormals:!!W.attributes.normal,vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!W.attributes.uv&&(rt||K),fog:!!P,useFog:g.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:g.wireframe===!1&&(g.flatShading===!0||W.attributes.normal===void 0&&ut===!1&&(g.isMeshLambertMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isMeshPhysicalMaterial)),sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:_e,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:W.attributes.position!==void 0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:Pe,morphTextureStride:we,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:J.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:g.dithering,shadowMapEnabled:e.shadowMap.enabled&&B.length>0,shadowMapType:e.shadowMap.type,toneMapping:z,decodeVideoTexture:rt&&g.map.isVideoTexture===!0&&je.getTransfer(g.map.colorSpace)===gt,decodeVideoTextureEmissive:Et&&g.emissiveMap.isVideoTexture===!0&&je.getTransfer(g.emissiveMap.colorSpace)===gt,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===Xt,flipSided:g.side===Wt,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:O&&g.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(O&&g.extensions.multiDraw===!0||ve)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return oe.vertexUv1s=l.has(1),oe.vertexUv2s=l.has(2),oe.vertexUv3s=l.has(3),l.clear(),oe}function p(g){let S=[];if(g.shaderID)S.push(g.shaderID);else S.push(g.customVertexShaderID),S.push(g.customFragmentShaderID);if(g.defines!==void 0)for(let B in g.defines)S.push(B),S.push(g.defines[B]);if(g.isRawShaderMaterial===!1)u(S,g),w(S,g),S.push(e.outputColorSpace);return S.push(g.customProgramCacheKey),S.join()}function u(g,S){g.push(S.precision),g.push(S.outputColorSpace),g.push(S.envMapMode),g.push(S.envMapCubeUVHeight),g.push(S.mapUv),g.push(S.alphaMapUv),g.push(S.lightMapUv),g.push(S.aoMapUv),g.push(S.bumpMapUv),g.push(S.normalMapUv),g.push(S.displacementMapUv),g.push(S.emissiveMapUv),g.push(S.metalnessMapUv),g.push(S.roughnessMapUv),g.push(S.anisotropyMapUv),g.push(S.clearcoatMapUv),g.push(S.clearcoatNormalMapUv),g.push(S.clearcoatRoughnessMapUv),g.push(S.iridescenceMapUv),g.push(S.iridescenceThicknessMapUv),g.push(S.sheenColorMapUv),g.push(S.sheenRoughnessMapUv),g.push(S.specularMapUv),g.push(S.specularColorMapUv),g.push(S.specularIntensityMapUv),g.push(S.transmissionMapUv),g.push(S.thicknessMapUv),g.push(S.combine),g.push(S.fogExp2),g.push(S.sizeAttenuation),g.push(S.morphTargetsCount),g.push(S.morphAttributeCount),g.push(S.numSunLights),g.push(S.numDirLights),g.push(S.numPointLights),g.push(S.numSpotLights),g.push(S.numSpotLightMaps),g.push(S.numHemiLights),g.push(S.numRectAreaLights),g.push(S.numSunLightShadows),g.push(S.numDirLightShadows),g.push(S.numPointLightShadows),g.push(S.numSpotLightShadows),g.push(S.numSpotLightShadowsWithMaps),g.push(S.numLightProbes),g.push(S.shadowMapType),g.push(S.toneMapping),g.push(S.numClippingPlanes),g.push(S.numClipIntersection),g.push(S.depthPacking)}function w(g,S){if(a.disableAll(),S.instancing)a.enable(0);if(S.instancingColor)a.enable(1);if(S.instancingMorph)a.enable(2);if(S.matcap)a.enable(3);if(S.envMap)a.enable(4);if(S.normalMapObjectSpace)a.enable(5);if(S.normalMapTangentSpace)a.enable(6);if(S.clearcoat)a.enable(7);if(S.iridescence)a.enable(8);if(S.alphaTest)a.enable(9);if(S.vertexColors)a.enable(10);if(S.vertexAlphas)a.enable(11);if(S.vertexUv1s)a.enable(12);if(S.vertexUv2s)a.enable(13);if(S.vertexUv3s)a.enable(14);if(S.vertexTangents)a.enable(15);if(S.anisotropy)a.enable(16);if(S.alphaHash)a.enable(17);if(S.batching)a.enable(18);if(S.dispersion)a.enable(19);if(S.retroreflection)a.enable(24);if(S.batchingColor)a.enable(20);if(S.gradientMap)a.enable(21);if(S.packedNormalMap)a.enable(22);if(S.vertexNormals)a.enable(23);if(g.push(a.mask),a.disableAll(),S.fog)a.enable(0);if(S.useFog)a.enable(1);if(S.flatShading)a.enable(2);if(S.logarithmicDepthBuffer)a.enable(3);if(S.reversedDepthBuffer)a.enable(4);if(S.skinning)a.enable(5);if(S.morphTargets)a.enable(6);if(S.morphNormals)a.enable(7);if(S.morphColors)a.enable(8);if(S.premultipliedAlpha)a.enable(9);if(S.shadowMapEnabled)a.enable(10);if(S.doubleSided)a.enable(11);if(S.flipSided)a.enable(12);if(S.useDepthPacking)a.enable(13);if(S.dithering)a.enable(14);if(S.transmission)a.enable(15);if(S.sheen)a.enable(16);if(S.opaque)a.enable(17);if(S.pointsUvs)a.enable(18);if(S.decodeVideoTexture)a.enable(19);if(S.decodeVideoTextureEmissive)a.enable(20);if(S.alphaToCoverage)a.enable(21);if(S.numLightProbeGrids>0)a.enable(22);if(S.hasPositionAttribute)a.enable(23);g.push(a.mask)}function T(g){let S=m[g.type],B;if(S){let I=Fn[S];B=Rh.clone(I.uniforms)}else B=g.uniforms;return B}function y(g,S){let B=d.get(S);if(B!==void 0)++B.usedTimes;else B=new Gg(e,S,g,s),c.push(B),d.set(S,B);return B}function M(g){if(--g.usedTimes===0){let S=c.indexOf(g);c[S]=c[c.length-1],c.pop(),d.delete(g.cacheKey),g.destroy()}}function R(g){o.remove(g)}function A(){o.dispose()}return{getParameters:b,getProgramCacheKey:p,getUniforms:T,acquireProgram:y,releaseProgram:M,releaseShaderCache:R,programs:c,dispose:A}}function qg(){let e=new WeakMap;function t(a){return e.has(a)}function n(a){let o=e.get(a);if(o===void 0)o={},e.set(a,o);return o}function i(a){e.delete(a)}function s(a,o,l){e.get(a)[o]=l}function r(){e=new WeakMap}return{has:t,get:n,remove:i,update:s,dispose:r}}function Yg(e,t){if(e.groupOrder!==t.groupOrder)return e.groupOrder-t.groupOrder;else if(e.renderOrder!==t.renderOrder)return e.renderOrder-t.renderOrder;else if(e.material.id!==t.material.id)return e.material.id-t.material.id;else if(e.materialVariant!==t.materialVariant)return e.materialVariant-t.materialVariant;else if(e.z!==t.z)return e.z-t.z;else return e.id-t.id}function Jh(e,t){if(e.groupOrder!==t.groupOrder)return e.groupOrder-t.groupOrder;else if(e.renderOrder!==t.renderOrder)return e.renderOrder-t.renderOrder;else if(e.z!==t.z)return t.z-e.z;else return e.id-t.id}function Kh(){let e=[],t=0,n=[],i=[],s=[];function r(){t=0,n.length=0,i.length=0,s.length=0}function a(h){let m=0;if(h.isInstancedMesh)m+=2;if(h.isSkinnedMesh)m+=1;return m}function o(h,m,x,b,p,u){let w=e[t];if(w===void 0)w={id:h.id,object:h,geometry:m,material:x,materialVariant:a(h),groupOrder:b,renderOrder:h.renderOrder,z:p,group:u},e[t]=w;else w.id=h.id,w.object=h,w.geometry=m,w.material=x,w.materialVariant=a(h),w.groupOrder=b,w.renderOrder=h.renderOrder,w.z=p,w.group=u;return t++,w}function l(h,m,x,b,p,u,w){if(w.reversedDepth===!0)p=-p;let T=o(h,m,x,b,p,u);if(x.transmission>0)i.push(T);else if(x.transparent===!0)s.push(T);else n.push(T)}function c(h,m,x,b,p,u){let w=o(h,m,x,b,p,u);if(x.transmission>0)i.unshift(w);else if(x.transparent===!0)s.unshift(w);else n.unshift(w)}function d(h,m){if(n.length>1)n.sort(h||Yg);if(i.length>1)i.sort(m||Jh);if(s.length>1)s.sort(m||Jh)}function f(){for(let h=t,m=e.length;h<m;h++){let x=e[h];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:n,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:f,sort:d}}function Zg(){let e=new WeakMap;function t(i,s){let r=e.get(i),a;if(r===void 0)a=new Kh,e.set(i,[a]);else if(s>=r.length)a=new Kh,r.push(a);else a=r[s];return a}function n(){e=new WeakMap}return{get:t,dispose:n}}function $g(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={direction:new C,color:new He};break;case"SpotLight":n={position:new C,direction:new C,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new C,color:new He,distance:0,decay:0};break;case"HemisphereLight":n={direction:new C,skyColor:new He,groundColor:new He};break;case"RectAreaLight":n={color:new He,position:new C,halfWidth:new C,halfHeight:new C};break}return e[t.id]=n,n}}}function Jg(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be,shadowCameraNear:1,shadowCameraFar:1000};break}return e[t.id]=n,n}}}var Kg=0;function jg(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function Qg(e){let t=new $g,n=Jg(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new C);let s=new C,r=new at,a=new at;function o(c){let d=0,f=0,h=0;for(let F=0;F<9;F++)i.probe[F].set(0,0,0);let m=0,x=0,b=0,p=0,u=0,w=0,T=0,y=0,M=0,R=0,A=0,g=0,S=0,B=0;c.sort(jg);for(let F=0,J=c.length;F<J;F++){let P=c[F],{color:W,intensity:ee,distance:V}=P,re=null;if(P.shadow&&P.shadow.map)if(P.shadow.map.texture.format===Ii)re=P.shadow.map.texture;else re=P.shadow.map.depthTexture||P.shadow.map.texture;if(P.isAmbientLight)d+=W.r*ee,f+=W.g*ee,h+=W.b*ee;else if(P.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(P.sh.coefficients[q],ee);B++}else if(P.isSunLight){let q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let te=P.shadow,ne=n.get(P);ne.shadowIntensity=te.intensity,ne.shadowBias=te.bias,ne.shadowNormalBias=te.normalBias,ne.shadowRadius=te.radius,ne.shadowMapSize.copy(te.mapSize).multiply(te.getFrameExtents()),i.sunShadow[x]=ne,i.sunShadowMap[x]=re;let Pe=te.getViewportCount();for(let we=0;we<Pe;we++)i.sunShadowMatrix[b+we]=te.getMatrix(we),i.sunShadowCascade[b+we]=te._cascadeData[we];b+=Pe,x++}i.sun[m]=q,m++}else if(P.isDirectionalLight){let q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let te=P.shadow,ne=n.get(P);ne.shadowIntensity=te.intensity,ne.shadowBias=te.bias,ne.shadowNormalBias=te.normalBias,ne.shadowRadius=te.radius,ne.shadowMapSize=te.mapSize,i.directionalShadow[p]=ne,i.directionalShadowMap[p]=re,i.directionalShadowMatrix[p]=P.shadow.matrix,M++}i.directional[p]=q,p++}else if(P.isSpotLight){let q=t.get(P);q.position.setFromMatrixPosition(P.matrixWorld),q.color.copy(W).multiplyScalar(ee),q.distance=V,q.coneCos=Math.cos(P.angle),q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),q.decay=P.decay,i.spot[w]=q;let te=P.shadow;if(P.map){if(i.spotLightMap[g]=P.map,g++,te.updateMatrices(P),P.castShadow)S++}if(i.spotLightMatrix[w]=te.matrix,P.castShadow){let ne=n.get(P);ne.shadowIntensity=te.intensity,ne.shadowBias=te.bias,ne.shadowNormalBias=te.normalBias,ne.shadowRadius=te.radius,ne.shadowMapSize=te.mapSize,i.spotShadow[w]=ne,i.spotShadowMap[w]=re,A++}w++}else if(P.isRectAreaLight){let q=t.get(P);q.color.copy(W).multiplyScalar(ee),q.halfWidth.set(P.width*0.5,0,0),q.halfHeight.set(0,P.height*0.5,0),i.rectArea[T]=q,T++}else if(P.isPointLight){let q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),q.distance=P.distance,q.decay=P.decay,P.castShadow){let te=P.shadow,ne=n.get(P);ne.shadowIntensity=te.intensity,ne.shadowBias=te.bias,ne.shadowNormalBias=te.normalBias,ne.shadowRadius=te.radius,ne.shadowMapSize=te.mapSize,ne.shadowCameraNear=te.camera.near,ne.shadowCameraFar=te.camera.far,i.pointShadow[u]=ne,i.pointShadowMap[u]=re,i.pointShadowMatrix[u]=P.shadow.matrix,R++}i.point[u]=q,u++}else if(P.isHemisphereLight){let q=t.get(P);q.skyColor.copy(P.color).multiplyScalar(ee),q.groundColor.copy(P.groundColor).multiplyScalar(ee),i.hemi[y]=q,y++}}if(T>0)if(e.has("OES_texture_float_linear")===!0)i.rectAreaLTC1=pe.LTC_FLOAT_1,i.rectAreaLTC2=pe.LTC_FLOAT_2;else i.rectAreaLTC1=pe.LTC_HALF_1,i.rectAreaLTC2=pe.LTC_HALF_2;i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=h;let I=i.hash;if(I.sunLength!==m||I.directionalLength!==p||I.pointLength!==u||I.spotLength!==w||I.rectAreaLength!==T||I.hemiLength!==y||I.numSunShadows!==x||I.numDirectionalShadows!==M||I.numPointShadows!==R||I.numSpotShadows!==A||I.numSpotMaps!==g||I.numLightProbes!==B)i.sun.length=m,i.directional.length=p,i.spot.length=w,i.rectArea.length=T,i.point.length=u,i.hemi.length=y,i.sunShadow.length=x,i.sunShadowMap.length=x,i.sunShadowMatrix.length=b,i.sunShadowCascade.length=b,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.directionalShadowMatrix.length=M,i.pointShadow.length=R,i.pointShadowMap.length=R,i.pointShadowMatrix.length=R,i.spotShadow.length=A,i.spotShadowMap.length=A,i.spotLightMatrix.length=A+g-S,i.spotLightMap.length=g,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=B,I.sunLength=m,I.directionalLength=p,I.pointLength=u,I.spotLength=w,I.rectAreaLength=T,I.hemiLength=y,I.numSunShadows=x,I.numDirectionalShadows=M,I.numPointShadows=R,I.numSpotShadows=A,I.numSpotMaps=g,I.numLightProbes=B,i.version=Kg++}function l(c,d){let f=0,h=0,m=0,x=0,b=0,p=0,u=d.matrixWorldInverse;for(let w=0,T=c.length;w<T;w++){let y=c[w];if(y.isSunLight){let M=i.sun[f];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(u),f++}else if(y.isDirectionalLight){let M=i.directional[h];M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(u),h++}else if(y.isSpotLight){let M=i.spot[x];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(u),M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(u),x++}else if(y.isRectAreaLight){let M=i.rectArea[b];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(u),a.identity(),r.copy(y.matrixWorld),r.premultiply(u),a.extractRotation(r),M.halfWidth.set(y.width*0.5,0,0),M.halfHeight.set(0,y.height*0.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),b++}else if(y.isPointLight){let M=i.point[m];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(u),m++}else if(y.isHemisphereLight){let M=i.hemi[p];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(u),p++}}}return{setup:o,setupView:l,state:i}}function jh(e){let t=new Qg(e),n=[],i=[],s=[];function r(h){f.camera=h,n.length=0,i.length=0,s.length=0}function a(h){n.push(h)}function o(h){i.push(h)}function l(h){s.push(h)}function c(){t.setup(n)}function d(h){t.setupView(n,h)}let f={lightsArray:n,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function e0(e){let t=new WeakMap;function n(s,r=0){let a=t.get(s),o;if(a===void 0)o=new jh(e),t.set(s,[o]);else if(r>=a.length)o=new jh(e),a.push(o);else o=a[r];return o}function i(){t=new WeakMap}return{get:n,dispose:i}}var t0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,n0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,i0=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],s0=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],Qh=new at,$s=new C,Il=new C;function r0(e,t,n){let i=new Hs,s=new Be,r=new Be,a=new yt,o=new al,l=new ol,c={},d=n.maxTextureSize,f={[ci]:Wt,[Wt]:ci,[Xt]:Xt},h=new un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Be},radius:{value:4}},vertexShader:t0,fragmentShader:n0}),m=h.clone();m.defines.HORIZONTAL_PASS=1;let x=new bt;x.setAttribute("position",new Jt(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let b=new Ze(x,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ps;let u=this.type;this.render=function(R,A,g){if(p.enabled===!1)return;if(p.autoUpdate===!1&&p.needsUpdate===!1)return;if(R.length===0)return;if(this.type===Cc)Ne("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ps;let S=e.getRenderTarget(),B=e.getActiveCubeFace(),I=e.getActiveMipmapLevel(),F=e.state;if(F.setBlending(Cn),F.buffers.depth.getReversed()===!0)F.buffers.color.setClear(0,0,0,0);else F.buffers.color.setClear(1,1,1,1);F.buffers.depth.setTest(!0),F.setScissorTest(!1);let J=u!==this.type;if(J)A.traverse(function(P){if(P.material)if(Array.isArray(P.material))P.material.forEach((W)=>W.needsUpdate=!0);else P.material.needsUpdate=!0});for(let P=0,W=R.length;P<W;P++){let ee=R[P],V=ee.shadow;if(V===void 0){Ne("WebGLShadowMap:",ee,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let re=V.getFrameExtents();if(s.multiply(re),r.copy(V.mapSize),s.x>d||s.y>d){if(s.x>d)r.x=Math.floor(d/re.x),s.x=r.x*re.x,V.mapSize.x=r.x;if(s.y>d)r.y=Math.floor(d/re.y),s.y=r.y*re.y,V.mapSize.y=r.y}let q=e.state.buffers.depth.getReversed();if(V.camera._reversedDepth=q,V.map===null||J===!0){if(V.map!==null){if(V.map.depthTexture!==null)V.map.depthTexture.dispose(),V.map.depthTexture=null;V.map.dispose()}if(this.type===rs){if(ee.isPointLight){Ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new an(s.x,s.y,{format:Ii,type:In,minFilter:Qt,magFilter:Qt,generateMipmaps:!1}),V.map.texture.name=ee.name+".shadowMap",V.map.depthTexture=new Li(s.x,s.y,Yn),V.map.depthTexture.name=ee.name+".shadowMapDepth",V.map.depthTexture.format=Ri,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=hi,V.map.depthTexture.magFilter=hi}else{if(ee.isPointLight)V.map=new Dl(s.x),V.map.depthTexture=new tl(s.x,ui);else V.map=new an(s.x,s.y),V.map.depthTexture=new Li(s.x,s.y,ui);if(V.map.depthTexture.name=ee.name+".shadowMap",V.map.depthTexture.format=Ri,this.type===Ps)V.map.depthTexture.compareFunction=q?Vr:Gr,V.map.depthTexture.minFilter=Qt,V.map.depthTexture.magFilter=Qt;else V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=hi,V.map.depthTexture.magFilter=hi}V.camera.updateProjectionMatrix()}if(V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==s.x||V.map.height!==s.y))V.map.setSize(s.x,s.y);let te=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();if(ee.isPointLight!==!0)V.updateMatrices(ee,g);for(let ne=0;ne<te;ne++){let Pe=V.getCamera(ne);if(ee.isPointLight){let{camera:we,matrix:et}=V,Fe=ee.distance||we.far;if(Fe!==we.far)we.far=Fe,we.updateProjectionMatrix();$s.setFromMatrixPosition(ee.matrixWorld),we.position.copy($s),Il.copy(we.position),Il.add(i0[ne]),we.up.copy(s0[ne]),we.lookAt(Il),we.updateMatrixWorld(),et.makeTranslation(-$s.x,-$s.y,-$s.z),Qh.multiplyMatrices(we.projectionMatrix,we.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Qh,we.coordinateSystem,we.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)e.setRenderTarget(V.map,ne),e.clear();else{if(ne===0)e.setRenderTarget(V.map),e.clear();let we=V.getViewport(ne);a.set(r.x*we.x,r.y*we.y,r.x*we.z,r.y*we.w),F.viewport(a)}i=V.getFrustum(ne),y(A,g,Pe,ee,this.type)}if(V.isPointLightShadow!==!0&&this.type===rs)w(V,g);V.needsUpdate=!1}u=this.type,p.needsUpdate=!1,e.setRenderTarget(S,B,I)};function w(R,A){let g=t.update(b);if(h.defines.VSM_SAMPLES!==R.blurSamples)h.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0;if(R.mapPass===null)R.mapPass=new an(s.x,s.y,{format:Ii,type:In});else if(R.mapPass.width!==R.map.width||R.mapPass.height!==R.map.height)R.mapPass.setSize(R.map.width,R.map.height);h.uniforms.shadow_pass.value=R.map.depthTexture,h.uniforms.resolution.value.set(R.map.width,R.map.height),h.uniforms.radius.value=R.radius,e.setRenderTarget(R.mapPass),e.clear(),e.renderBufferDirect(A,null,g,h,b,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value.set(R.map.width,R.map.height),m.uniforms.radius.value=R.radius,e.setRenderTarget(R.map),e.clear(),e.renderBufferDirect(A,null,g,m,b,null)}function T(R,A,g,S){let B=null,I=g.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(I!==void 0)B=I;else if(B=g.isPointLight===!0?l:o,e.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let F=B.uuid,J=A.uuid,P=c[F];if(P===void 0)P={},c[F]=P;let W=P[J];if(W===void 0)W=B.clone(),P[J]=W,A.addEventListener("dispose",M);B=W}if(B.visible=A.visible,B.wireframe=A.wireframe,S===rs)B.side=A.shadowSide!==null?A.shadowSide:A.side;else B.side=A.shadowSide!==null?A.shadowSide:f[A.side];if(B.alphaMap=A.alphaMap,B.alphaTest=A.alphaToCoverage===!0?0.5:A.alphaTest,B.map=A.map,B.clipShadows=A.clipShadows,B.clippingPlanes=A.clippingPlanes,B.clipIntersection=A.clipIntersection,B.displacementMap=A.displacementMap,B.displacementScale=A.displacementScale,B.displacementBias=A.displacementBias,B.wireframeLinewidth=A.wireframeLinewidth,B.linewidth=A.linewidth,g.isPointLight===!0&&B.isMeshDistanceMaterial===!0){let F=e.properties.get(B);F.light=g}return B}function y(R,A,g,S,B){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)){if((R.castShadow||R.receiveShadow&&B===rs)&&(!R.frustumCulled||R.intersectsFrustum(i))){R.modelViewMatrix.multiplyMatrices(g.matrixWorldInverse,R.matrixWorld);let J=t.update(R),P=R.material;if(Array.isArray(P)){let W=J.groups;for(let ee=0,V=W.length;ee<V;ee++){let re=W[ee],q=P[re.materialIndex];if(q&&q.visible){let te=T(R,q,S,B);R.onBeforeShadow(e,R,A,g,J,te,re),e.renderBufferDirect(g,null,J,te,R,re),R.onAfterShadow(e,R,A,g,J,te,re)}}}else if(P.visible){let W=T(R,P,S,B);R.onBeforeShadow(e,R,A,g,J,W,null),e.renderBufferDirect(g,null,J,W,R,null),R.onAfterShadow(e,R,A,g,J,W,null)}}}let F=R.children;for(let J=0,P=F.length;J<P;J++)y(F[J],A,g,S,B)}function M(R){R.target.removeEventListener("dispose",M);for(let g in c){let S=c[g],B=R.target.uuid;if(B in S)S[B].dispose(),delete S[B]}}}function a0(e,t){function n(){let U=!1,he=new yt,K=null,de=new yt(0,0,0,0);return{setMask:function(j){if(K!==j&&!U)e.colorMask(j,j,j,j),K=j},setLocked:function(j){U=j},setClear:function(j,O,z,oe,ke){if(ke===!0)j*=oe,O*=oe,z*=oe;if(he.set(j,O,z,oe),de.equals(he)===!1)e.clearColor(j,O,z,oe),de.copy(he)},reset:function(){U=!1,K=null,de.set(-1,0,0,0)}}}function i(){let U=!1,he=!1,K=null,de=null,j=null;return{setReversed:function(O){if(he!==O){let z=t.get("EXT_clip_control");if(O)z.clipControlEXT(z.LOWER_LEFT_EXT,z.ZERO_TO_ONE_EXT);else z.clipControlEXT(z.LOWER_LEFT_EXT,z.NEGATIVE_ONE_TO_ONE_EXT);he=O;let oe=j;j=null,this.setClear(oe)}},getReversed:function(){return he},setTest:function(O){if(O)ce(e.DEPTH_TEST);else _e(e.DEPTH_TEST)},setMask:function(O){if(K!==O&&!U)e.depthMask(O),K=O},setFunc:function(O){if(he)O=Th[O];if(de!==O){switch(O){case Jc:e.depthFunc(e.NEVER);break;case Kc:e.depthFunc(e.ALWAYS);break;case jc:e.depthFunc(e.LESS);break;case no:e.depthFunc(e.LEQUAL);break;case Qc:e.depthFunc(e.EQUAL);break;case eh:e.depthFunc(e.GEQUAL);break;case th:e.depthFunc(e.GREATER);break;case nh:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}de=O}},setLocked:function(O){U=O},setClear:function(O){if(j!==O){if(j=O,he)O=1-O;e.clearDepth(O)}},reset:function(){U=!1,K=null,de=null,j=null,he=!1}}}function s(){let U=!1,he=null,K=null,de=null,j=null,O=null,z=null,oe=null,ke=null;return{setTest:function(Ie){if(!U)if(Ie)ce(e.STENCIL_TEST);else _e(e.STENCIL_TEST)},setMask:function(Ie){if(he!==Ie&&!U)e.stencilMask(Ie),he=Ie},setFunc:function(Ie,lt,dt){if(K!==Ie||de!==lt||j!==dt)e.stencilFunc(Ie,lt,dt),K=Ie,de=lt,j=dt},setOp:function(Ie,lt,dt){if(O!==Ie||z!==lt||oe!==dt)e.stencilOp(Ie,lt,dt),O=Ie,z=lt,oe=dt},setLocked:function(Ie){U=Ie},setClear:function(Ie){if(ke!==Ie)e.clearStencil(Ie),ke=Ie},reset:function(){U=!1,he=null,K=null,de=null,j=null,O=null,z=null,oe=null,ke=null}}}let r=new n,a=new i,o=new s,l=new WeakMap,c=new WeakMap,d={},f={},h={},m=new WeakMap,x=[],b=null,p=!1,u=null,w=null,T=null,y=null,M=null,R=null,A=null,g=new He(0,0,0),S=0,B=!1,I=null,F=null,J=null,P=null,W=null,ee=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),V=!1,re=0,q=e.getParameter(e.VERSION);if(q.indexOf("WebGL")!==-1)re=parseFloat(/^WebGL (\d)/.exec(q)[1]),V=re>=1;else if(q.indexOf("OpenGL ES")!==-1)re=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),V=re>=2;let te=null,ne={},Pe=e.getParameter(e.SCISSOR_BOX),we=e.getParameter(e.VIEWPORT),et=new yt().fromArray(Pe),Fe=new yt().fromArray(we);function Z(U,he,K,de){let j=new Uint8Array(4),O=e.createTexture();e.bindTexture(U,O),e.texParameteri(U,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(U,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let z=0;z<K;z++)if(U===e.TEXTURE_3D||U===e.TEXTURE_2D_ARRAY)e.texImage3D(he,0,e.RGBA,1,1,de,0,e.RGBA,e.UNSIGNED_BYTE,j);else e.texImage2D(he+z,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,j);return O}let se={};se[e.TEXTURE_2D]=Z(e.TEXTURE_2D,e.TEXTURE_2D,1),se[e.TEXTURE_CUBE_MAP]=Z(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[e.TEXTURE_2D_ARRAY]=Z(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),se[e.TEXTURE_3D]=Z(e.TEXTURE_3D,e.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ce(e.DEPTH_TEST),a.setFunc(no),Rt(!1),ut(ja),ce(e.CULL_FACE),tt(Cn);function ce(U){if(d[U]!==!0)e.enable(U),d[U]=!0}function _e(U){if(d[U]!==!1)e.disable(U),d[U]=!1}function xe(U,he){if(h[U]!==he){if(e.bindFramebuffer(U,he),h[U]=he,U===e.DRAW_FRAMEBUFFER)h[e.FRAMEBUFFER]=he;if(U===e.FRAMEBUFFER)h[e.DRAW_FRAMEBUFFER]=he;return!0}return!1}function ve(U,he){let K=x,de=!1;if(U){if(K=m.get(he),K===void 0)K=[],m.set(he,K);let j=U.textures;if(K.length!==j.length||K[0]!==e.COLOR_ATTACHMENT0){for(let O=0,z=j.length;O<z;O++)K[O]=e.COLOR_ATTACHMENT0+O;K.length=j.length,de=!0}}else if(K[0]!==e.BACK)K[0]=e.BACK,de=!0;if(de)e.drawBuffers(K)}function rt(U){if(b!==U)return e.useProgram(U),b=U,!0;return!1}let Ve={[as]:e.FUNC_ADD,[Pc]:e.FUNC_SUBTRACT,[Lc]:e.FUNC_REVERSE_SUBTRACT};Ve[Nc]=e.MIN,Ve[Dc]=e.MAX;let ze={[Uc]:e.ZERO,[Fc]:e.ONE,[Oc]:e.SRC_COLOR,[zc]:e.SRC_ALPHA,[Xc]:e.SRC_ALPHA_SATURATE,[Vc]:e.DST_COLOR,[Hc]:e.DST_ALPHA,[Bc]:e.ONE_MINUS_SRC_COLOR,[kc]:e.ONE_MINUS_SRC_ALPHA,[Wc]:e.ONE_MINUS_DST_COLOR,[Gc]:e.ONE_MINUS_DST_ALPHA,[qc]:e.CONSTANT_COLOR,[Yc]:e.ONE_MINUS_CONSTANT_COLOR,[Zc]:e.CONSTANT_ALPHA,[$c]:e.ONE_MINUS_CONSTANT_ALPHA};function tt(U,he,K,de,j,O,z,oe,ke,Ie){if(U===Cn){if(p===!0)_e(e.BLEND),p=!1;return}if(p===!1)ce(e.BLEND),p=!0;if(U!==Ic){if(U!==u||Ie!==B){if(w!==as||M!==as)e.blendEquation(e.FUNC_ADD),w=as,M=as;if(Ie)switch(U){case Ls:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Qa:e.blendFunc(e.ONE,e.ONE);break;case eo:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case to:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Ue("WebGLState: Invalid blending: ",U);break}else switch(U){case Ls:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Qa:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case eo:Ue("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case to:Ue("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ue("WebGLState: Invalid blending: ",U);break}T=null,y=null,R=null,A=null,g.set(0,0,0),S=0,u=U,B=Ie}return}if(j=j||he,O=O||K,z=z||de,he!==w||j!==M)e.blendEquationSeparate(Ve[he],Ve[j]),w=he,M=j;if(K!==T||de!==y||O!==R||z!==A)e.blendFuncSeparate(ze[K],ze[de],ze[O],ze[z]),T=K,y=de,R=O,A=z;if(oe.equals(g)===!1||ke!==S)e.blendColor(oe.r,oe.g,oe.b,ke),g.copy(oe),S=ke;u=U,B=!1}function Ye(U,he){U.side===Xt?_e(e.CULL_FACE):ce(e.CULL_FACE);let K=U.side===Wt;if(he)K=!K;Rt(K),U.blending===Ls&&U.transparent===!1?tt(Cn):tt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);let de=U.stencilWrite;if(o.setTest(de),de)o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass);Et(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ce(e.SAMPLE_ALPHA_TO_COVERAGE):_e(e.SAMPLE_ALPHA_TO_COVERAGE)}function Rt(U){if(I!==U){if(U)e.frontFace(e.CW);else e.frontFace(e.CCW);I=U}}function ut(U){if(U!==Ac){if(ce(e.CULL_FACE),U!==F)if(U===ja)e.cullFace(e.BACK);else if(U===Rc)e.cullFace(e.FRONT);else e.cullFace(e.FRONT_AND_BACK)}else _e(e.CULL_FACE);F=U}function Ut(U){if(U!==J){if(V)e.lineWidth(U);J=U}}function Et(U,he,K){if(U){if(ce(e.POLYGON_OFFSET_FILL),P!==he||W!==K){if(P=he,W=K,a.getReversed())he=-he;e.polygonOffset(he,K)}}else _e(e.POLYGON_OFFSET_FILL)}function wt(U){if(U)ce(e.SCISSOR_TEST);else _e(e.SCISSOR_TEST)}function N(U){if(U===void 0)U=e.TEXTURE0+ee-1;if(te!==U)e.activeTexture(U),te=U}function Ot(U,he,K){if(K===void 0)if(te===null)K=e.TEXTURE0+ee-1;else K=te;let de=ne[K];if(de===void 0)de={type:void 0,texture:void 0},ne[K]=de;if(de.type!==U||de.texture!==he){if(te!==K)e.activeTexture(K),te=K;e.bindTexture(U,he||se[U]),de.type=U,de.texture=he}}function Oe(){let U=ne[te];if(U!==void 0&&U.type!==void 0)e.bindTexture(U.type,null),U.type=void 0,U.texture=void 0}function $e(){try{e.compressedTexImage2D(...arguments)}catch(U){Ue("WebGLState:",U)}}function E(){try{e.compressedTexImage3D(...arguments)}catch(U){Ue("WebGLState:",U)}}function _(){try{e.texSubImage2D(...arguments)}catch(U){Ue("WebGLState:",U)}}function L(){try{e.texSubImage3D(...arguments)}catch(U){Ue("WebGLState:",U)}}function G(){try{e.compressedTexSubImage2D(...arguments)}catch(U){Ue("WebGLState:",U)}}function ie(){try{e.compressedTexSubImage3D(...arguments)}catch(U){Ue("WebGLState:",U)}}function le(){try{e.texStorage2D(...arguments)}catch(U){Ue("WebGLState:",U)}}function fe(){try{e.texStorage3D(...arguments)}catch(U){Ue("WebGLState:",U)}}function Y(){try{e.texImage2D(...arguments)}catch(U){Ue("WebGLState:",U)}}function Q(){try{e.texImage3D(...arguments)}catch(U){Ue("WebGLState:",U)}}function me(U){if(f[U]!==void 0)return f[U];else return e.getParameter(U)}function Te(U,he){if(f[U]!==he)e.pixelStorei(U,he),f[U]=he}function ue(U){if(et.equals(U)===!1)e.scissor(U.x,U.y,U.z,U.w),et.copy(U)}function ae(U){if(Fe.equals(U)===!1)e.viewport(U.x,U.y,U.z,U.w),Fe.copy(U)}function Ce(U,he){let K=c.get(he);if(K===void 0)K=new WeakMap,c.set(he,K);let de=K.get(U);if(de===void 0)de=e.getUniformBlockIndex(he,U.name),K.set(U,de)}function Le(U,he){let de=c.get(he).get(U);if(l.get(he)!==de)e.uniformBlockBinding(he,de,U.__bindingPointIndex),l.set(he,de)}function Qe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),a.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),d={},f={},te=null,ne={},h={},m=new WeakMap,x=[],b=null,p=!1,u=null,w=null,T=null,y=null,M=null,R=null,A=null,g=new He(0,0,0),S=0,B=!1,I=null,F=null,J=null,P=null,W=null,et.set(0,0,e.canvas.width,e.canvas.height),Fe.set(0,0,e.canvas.width,e.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ce,disable:_e,bindFramebuffer:xe,drawBuffers:ve,useProgram:rt,setBlending:tt,setMaterial:Ye,setFlipSided:Rt,setCullFace:ut,setLineWidth:Ut,setPolygonOffset:Et,setScissorTest:wt,activeTexture:N,bindTexture:Ot,unbindTexture:Oe,compressedTexImage2D:$e,compressedTexImage3D:E,texImage2D:Y,texImage3D:Q,pixelStorei:Te,getParameter:me,updateUBOMapping:Ce,uniformBlockBinding:Le,texStorage2D:le,texStorage3D:fe,texSubImage2D:_,texSubImage3D:L,compressedTexSubImage2D:G,compressedTexSubImage3D:ie,scissor:ue,viewport:ae,reset:Qe}}function o0(e,t,n,i,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Be,d=new WeakMap,f=new Set,h,m=new WeakMap,x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(E){}function b(E,_){return x?new OffscreenCanvas(E,_):Is("canvas")}function p(E,_,L){let G=1,ie=$e(E);if(ie.width>L||ie.height>L)G=L/Math.max(ie.width,ie.height);if(G<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let le=Math.floor(G*ie.width),fe=Math.floor(G*ie.height);if(h===void 0)h=b(le,fe);let Y=_?b(le,fe):h;return Y.width=le,Y.height=fe,Y.getContext("2d").drawImage(E,0,0,le,fe),Ne("WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+le+"x"+fe+")."),Y}else{if("data"in E)Ne("WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+").");return E}return E}function u(E){return E.generateMipmaps}function w(E){e.generateMipmap(E)}function T(E){if(E.isWebGLCubeRenderTarget)return e.TEXTURE_CUBE_MAP;if(E.isWebGL3DRenderTarget)return e.TEXTURE_3D;if(E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture)return e.TEXTURE_2D_ARRAY;return e.TEXTURE_2D}function y(E,_,L,G,ie,le=!1){if(E!==null){if(e[E]!==void 0)return e[E];Ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let fe;if(G){if(fe=t.get("EXT_texture_norm16"),!fe)Ne("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let Y=_;if(_===e.RED){if(L===e.FLOAT)Y=e.R32F;if(L===e.HALF_FLOAT)Y=e.R16F;if(L===e.UNSIGNED_BYTE)Y=e.R8;if(L===e.UNSIGNED_SHORT&&fe)Y=fe.R16_EXT;if(L===e.SHORT&&fe)Y=fe.R16_SNORM_EXT}if(_===e.RED_INTEGER){if(L===e.UNSIGNED_BYTE)Y=e.R8UI;if(L===e.UNSIGNED_SHORT)Y=e.R16UI;if(L===e.UNSIGNED_INT)Y=e.R32UI;if(L===e.BYTE)Y=e.R8I;if(L===e.SHORT)Y=e.R16I;if(L===e.INT)Y=e.R32I}if(_===e.RG){if(L===e.FLOAT)Y=e.RG32F;if(L===e.HALF_FLOAT)Y=e.RG16F;if(L===e.UNSIGNED_BYTE)Y=e.RG8;if(L===e.UNSIGNED_SHORT&&fe)Y=fe.RG16_EXT;if(L===e.SHORT&&fe)Y=fe.RG16_SNORM_EXT}if(_===e.RG_INTEGER){if(L===e.UNSIGNED_BYTE)Y=e.RG8UI;if(L===e.UNSIGNED_SHORT)Y=e.RG16UI;if(L===e.UNSIGNED_INT)Y=e.RG32UI;if(L===e.BYTE)Y=e.RG8I;if(L===e.SHORT)Y=e.RG16I;if(L===e.INT)Y=e.RG32I}if(_===e.RGB_INTEGER){if(L===e.UNSIGNED_BYTE)Y=e.RGB8UI;if(L===e.UNSIGNED_SHORT)Y=e.RGB16UI;if(L===e.UNSIGNED_INT)Y=e.RGB32UI;if(L===e.BYTE)Y=e.RGB8I;if(L===e.SHORT)Y=e.RGB16I;if(L===e.INT)Y=e.RGB32I}if(_===e.RGBA_INTEGER){if(L===e.UNSIGNED_BYTE)Y=e.RGBA8UI;if(L===e.UNSIGNED_SHORT)Y=e.RGBA16UI;if(L===e.UNSIGNED_INT)Y=e.RGBA32UI;if(L===e.BYTE)Y=e.RGBA8I;if(L===e.SHORT)Y=e.RGBA16I;if(L===e.INT)Y=e.RGBA32I}if(_===e.RGB){if(L===e.UNSIGNED_SHORT&&fe)Y=fe.RGB16_EXT;if(L===e.SHORT&&fe)Y=fe.RGB16_SNORM_EXT;if(L===e.UNSIGNED_INT_5_9_9_9_REV)Y=e.RGB9_E5;if(L===e.UNSIGNED_INT_10F_11F_11F_REV)Y=e.R11F_G11F_B10F}if(_===e.RGBA){let Q=le?Zo:je.getTransfer(ie);if(L===e.FLOAT)Y=e.RGBA32F;if(L===e.HALF_FLOAT)Y=e.RGBA16F;if(L===e.UNSIGNED_BYTE)Y=Q===gt?e.SRGB8_ALPHA8:e.RGBA8;if(L===e.UNSIGNED_SHORT&&fe)Y=fe.RGBA16_EXT;if(L===e.SHORT&&fe)Y=fe.RGBA16_SNORM_EXT;if(L===e.UNSIGNED_SHORT_4_4_4_4)Y=e.RGBA4;if(L===e.UNSIGNED_SHORT_5_5_5_1)Y=e.RGB5_A1}if(Y===e.R16F||Y===e.R32F||Y===e.RG16F||Y===e.RG32F||Y===e.RGBA16F||Y===e.RGBA32F)t.get("EXT_color_buffer_float");return Y}function M(E,_){let L;if(E){if(_===null||_===ui||_===ls)L=e.DEPTH24_STENCIL8;else if(_===Yn)L=e.DEPTH32F_STENCIL8;else if(_===Fs)L=e.DEPTH24_STENCIL8,Ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(_===null||_===ui||_===ls)L=e.DEPTH_COMPONENT24;else if(_===Yn)L=e.DEPTH_COMPONENT32F;else if(_===Fs)L=e.DEPTH_COMPONENT16;return L}function R(E,_){if(u(E)===!0||E.isFramebufferTexture&&E.minFilter!==hi&&E.minFilter!==Qt)return Math.log2(Math.max(_.width,_.height))+1;else if(E.mipmaps!==void 0&&E.mipmaps.length>0)return E.mipmaps.length;else if(E.isCompressedTexture&&Array.isArray(E.image))return _.mipmaps.length;else return 1}function A(E){let _=E.target;if(_.removeEventListener("dispose",A),S(_),_.isVideoTexture)d.delete(_);if(_.isHTMLTexture)f.delete(_)}function g(E){let _=E.target;_.removeEventListener("dispose",g),I(_)}function S(E){let _=i.get(E);if(_.__webglInit===void 0)return;let L=E.source,G=m.get(L);if(G){let ie=G[_.__cacheKey];if(ie.usedTimes--,ie.usedTimes===0)B(E);if(Object.keys(G).length===0)m.delete(L)}i.remove(E)}function B(E){let _=i.get(E);e.deleteTexture(_.__webglTexture);let L=E.source,G=m.get(L);delete G[_.__cacheKey],a.memory.textures--}function I(E){let _=i.get(E);if(E.depthTexture)E.depthTexture.dispose(),i.remove(E.depthTexture);if(E.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(_.__webglFramebuffer[G]))for(let ie=0;ie<_.__webglFramebuffer[G].length;ie++)e.deleteFramebuffer(_.__webglFramebuffer[G][ie]);else e.deleteFramebuffer(_.__webglFramebuffer[G]);if(_.__webglDepthbuffer)e.deleteRenderbuffer(_.__webglDepthbuffer[G])}else{if(Array.isArray(_.__webglFramebuffer))for(let G=0;G<_.__webglFramebuffer.length;G++)e.deleteFramebuffer(_.__webglFramebuffer[G]);else e.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer)e.deleteRenderbuffer(_.__webglDepthbuffer);if(_.__webglMultisampledFramebuffer)e.deleteFramebuffer(_.__webglMultisampledFramebuffer);if(_.__webglColorRenderbuffer){for(let G=0;G<_.__webglColorRenderbuffer.length;G++)if(_.__webglColorRenderbuffer[G])e.deleteRenderbuffer(_.__webglColorRenderbuffer[G])}if(_.__webglDepthRenderbuffer)e.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let L=E.textures;for(let G=0,ie=L.length;G<ie;G++){let le=i.get(L[G]);if(le.__webglTexture)e.deleteTexture(le.__webglTexture),a.memory.textures--;i.remove(L[G])}i.remove(E)}let F=0;function J(){F=0}function P(){return F}function W(E){F=E}function ee(){let E=F;if(E>=s.maxTextures)Ne("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+s.maxTextures);return F+=1,E}function V(E){let _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function re(E,_){let L=i.get(E);if(E.isVideoTexture)Ot(E);if(E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&L.__version!==E.version){let G=E.image;if(G===null)Ne("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)Ne("WebGLRenderer: Texture marked for update but image is incomplete");else{_e(L,E,_);return}}else if(E.isExternalTexture)L.__webglTexture=E.sourceTexture?E.sourceTexture:null;n.bindTexture(e.TEXTURE_2D,L.__webglTexture,e.TEXTURE0+_)}function q(E,_){let L=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&L.__version!==E.version){_e(L,E,_);return}else if(E.isExternalTexture)L.__webglTexture=E.sourceTexture?E.sourceTexture:null;n.bindTexture(e.TEXTURE_2D_ARRAY,L.__webglTexture,e.TEXTURE0+_)}function te(E,_){let L=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&L.__version!==E.version){_e(L,E,_);return}n.bindTexture(e.TEXTURE_3D,L.__webglTexture,e.TEXTURE0+_)}function ne(E,_){let L=i.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&L.__version!==E.version){xe(L,E,_);return}n.bindTexture(e.TEXTURE_CUBE_MAP,L.__webglTexture,e.TEXTURE0+_)}let Pe={[ah]:e.REPEAT,[Nr]:e.CLAMP_TO_EDGE,[oh]:e.MIRRORED_REPEAT},we={[hi]:e.NEAREST,[lh]:e.NEAREST_MIPMAP_NEAREST,[Us]:e.NEAREST_MIPMAP_LINEAR,[Qt]:e.LINEAR,[Dr]:e.LINEAR_MIPMAP_NEAREST,[Ai]:e.LINEAR_MIPMAP_LINEAR},et={[_h]:e.NEVER,[Mh]:e.ALWAYS,[xh]:e.LESS,[Gr]:e.LEQUAL,[yh]:e.EQUAL,[Vr]:e.GEQUAL,[vh]:e.GREATER,[Sh]:e.NOTEQUAL};function Fe(E,_){if(_.type===Yn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Qt||_.magFilter===Dr||_.magFilter===Us||_.magFilter===Ai||_.minFilter===Qt||_.minFilter===Dr||_.minFilter===Us||_.minFilter===Ai))Ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(e.texParameteri(E,e.TEXTURE_WRAP_S,Pe[_.wrapS]),e.texParameteri(E,e.TEXTURE_WRAP_T,Pe[_.wrapT]),E===e.TEXTURE_3D||E===e.TEXTURE_2D_ARRAY)e.texParameteri(E,e.TEXTURE_WRAP_R,Pe[_.wrapR]);if(e.texParameteri(E,e.TEXTURE_MAG_FILTER,we[_.magFilter]),e.texParameteri(E,e.TEXTURE_MIN_FILTER,we[_.minFilter]),_.compareFunction)e.texParameteri(E,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(E,e.TEXTURE_COMPARE_FUNC,et[_.compareFunction]);if(t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===hi)return;if(_.minFilter!==Us&&_.minFilter!==Ai)return;if(_.type===Yn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let L=t.get("EXT_texture_filter_anisotropic");e.texParameterf(E,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Z(E,_){let L=!1;if(E.__webglInit===void 0)E.__webglInit=!0,_.addEventListener("dispose",A);let G=_.source,ie=m.get(G);if(ie===void 0)ie={},m.set(G,ie);let le=V(_);if(le!==E.__cacheKey){if(ie[le]===void 0)ie[le]={texture:e.createTexture(),usedTimes:0},a.memory.textures++,L=!0;ie[le].usedTimes++;let fe=ie[E.__cacheKey];if(fe!==void 0){if(ie[E.__cacheKey].usedTimes--,fe.usedTimes===0)B(_)}E.__cacheKey=le,E.__webglTexture=ie[le].texture}return L}function se(E,_,L){return Math.floor(Math.floor(E/L)/_)}function ce(E,_,L,G){let le=E.updateRanges;if(le.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,_.width,_.height,L,G,_.data);else{le.sort((Te,ue)=>Te.start-ue.start);let fe=0;for(let Te=1;Te<le.length;Te++){let ue=le[fe],ae=le[Te],Ce=ue.start+ue.count,Le=se(ae.start,_.width,4),Qe=se(ue.start,_.width,4);if(ae.start<=Ce+1&&Le===Qe&&se(ae.start+ae.count-1,_.width,4)===Le)ue.count=Math.max(ue.count,ae.start+ae.count-ue.start);else++fe,le[fe]=ae}le.length=fe+1;let Y=n.getParameter(e.UNPACK_ROW_LENGTH),Q=n.getParameter(e.UNPACK_SKIP_PIXELS),me=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,_.width);for(let Te=0,ue=le.length;Te<ue;Te++){let ae=le[Te],Ce=Math.floor(ae.start/4),Le=Math.ceil(ae.count/4),Qe=Ce%_.width,U=Math.floor(Ce/_.width),he=Le,K=1;n.pixelStorei(e.UNPACK_SKIP_PIXELS,Qe),n.pixelStorei(e.UNPACK_SKIP_ROWS,U),n.texSubImage2D(e.TEXTURE_2D,0,Qe,U,he,1,L,G,_.data)}E.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,Y),n.pixelStorei(e.UNPACK_SKIP_PIXELS,Q),n.pixelStorei(e.UNPACK_SKIP_ROWS,me)}}function _e(E,_,L){let G=e.TEXTURE_2D;if(_.isDataArrayTexture||_.isCompressedArrayTexture)G=e.TEXTURE_2D_ARRAY;if(_.isData3DTexture)G=e.TEXTURE_3D;let ie=Z(E,_),le=_.source;n.bindTexture(G,E.__webglTexture,e.TEXTURE0+L);let fe=i.get(le);if(le.version!==fe.__version||ie===!0){if(n.activeTexture(e.TEXTURE0+L),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let K=je.getPrimaries(je.workingColorSpace),de=_.colorSpace===Pi?null:je.getPrimaries(_.colorSpace),j=_.colorSpace===Pi||K===de?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,j)}n.pixelStorei(e.UNPACK_ALIGNMENT,_.unpackAlignment);let Q=p(_.image,!1,s.maxTextureSize);Q=Oe(_,Q);let me=r.convert(_.format,_.colorSpace),Te=r.convert(_.type),ue=y(_.internalFormat,me,Te,_.normalized,_.colorSpace,_.isVideoTexture);Fe(G,_);let ae,Ce=_.mipmaps,Le=_.isVideoTexture!==!0,Qe=fe.__version===void 0||ie===!0,U=le.dataReady,he=R(_,Q);if(_.isDepthTexture){if(ue=M(_.format===Ci,_.type),Qe)if(Le)n.texStorage2D(e.TEXTURE_2D,1,ue,Q.width,Q.height);else n.texImage2D(e.TEXTURE_2D,0,ue,Q.width,Q.height,0,me,Te,null)}else if(_.isDataTexture)if(Ce.length>0){if(Le&&Qe)n.texStorage2D(e.TEXTURE_2D,he,ue,Ce[0].width,Ce[0].height);for(let K=0,de=Ce.length;K<de;K++)if(ae=Ce[K],Le){if(U)n.texSubImage2D(e.TEXTURE_2D,K,0,0,ae.width,ae.height,me,Te,ae.data)}else n.texImage2D(e.TEXTURE_2D,K,ue,ae.width,ae.height,0,me,Te,ae.data);_.generateMipmaps=!1}else if(Le){if(Qe)n.texStorage2D(e.TEXTURE_2D,he,ue,Q.width,Q.height);if(U)ce(_,Q,me,Te)}else n.texImage2D(e.TEXTURE_2D,0,ue,Q.width,Q.height,0,me,Te,Q.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){if(Le&&Qe)n.texStorage3D(e.TEXTURE_2D_ARRAY,he,ue,Ce[0].width,Ce[0].height,Q.depth);for(let K=0,de=Ce.length;K<de;K++)if(ae=Ce[K],_.format!==Pn)if(me!==null)if(Le){if(U)if(_.layerUpdates.size>0){let j=El(ae.width,ae.height,_.format,_.type);for(let O of _.layerUpdates){let z=ae.data.subarray(O*j/ae.data.BYTES_PER_ELEMENT,(O+1)*j/ae.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,K,0,0,O,ae.width,ae.height,1,me,z)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,K,0,0,0,ae.width,ae.height,Q.depth,me,ae.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,K,ue,ae.width,ae.height,Q.depth,0,ae.data,0,0);else Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(Le){if(U)n.texSubImage3D(e.TEXTURE_2D_ARRAY,K,0,0,0,ae.width,ae.height,Q.depth,me,Te,ae.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,K,ue,ae.width,ae.height,Q.depth,0,me,Te,ae.data);if(_.layerUpdates.size>0)_.clearLayerUpdates()}else{if(Le&&Qe)n.texStorage2D(e.TEXTURE_2D,he,ue,Ce[0].width,Ce[0].height);for(let K=0,de=Ce.length;K<de;K++)if(ae=Ce[K],_.format!==Pn)if(me!==null)if(Le){if(U)n.compressedTexSubImage2D(e.TEXTURE_2D,K,0,0,ae.width,ae.height,me,ae.data)}else n.compressedTexImage2D(e.TEXTURE_2D,K,ue,ae.width,ae.height,0,ae.data);else Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(Le){if(U)n.texSubImage2D(e.TEXTURE_2D,K,0,0,ae.width,ae.height,me,Te,ae.data)}else n.texImage2D(e.TEXTURE_2D,K,ue,ae.width,ae.height,0,me,Te,ae.data)}else if(_.isDataArrayTexture)if(Le){if(Qe)n.texStorage3D(e.TEXTURE_2D_ARRAY,he,ue,Q.width,Q.height,Q.depth);if(U)if(_.layerUpdates.size>0){let K=El(Q.width,Q.height,_.format,_.type);for(let de of _.layerUpdates){let j=Q.data.subarray(de*K/Q.data.BYTES_PER_ELEMENT,(de+1)*K/Q.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,de,Q.width,Q.height,1,me,Te,j)}_.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,me,Te,Q.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,ue,Q.width,Q.height,Q.depth,0,me,Te,Q.data);else if(_.isData3DTexture)if(Le){if(Qe)n.texStorage3D(e.TEXTURE_3D,he,ue,Q.width,Q.height,Q.depth);if(U)n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,me,Te,Q.data)}else n.texImage3D(e.TEXTURE_3D,0,ue,Q.width,Q.height,Q.depth,0,me,Te,Q.data);else if(_.isFramebufferTexture){if(Qe)if(Le)n.texStorage2D(e.TEXTURE_2D,he,ue,Q.width,Q.height);else{let K=Q.width,de=Q.height;for(let j=0;j<he;j++)n.texImage2D(e.TEXTURE_2D,j,ue,K,de,0,me,Te,null),K>>=1,de>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in e){let K=e.canvas;if(!K.hasAttribute("layoutsubtree"))K.setAttribute("layoutsubtree","true");if(Q.parentNode!==K){K.appendChild(Q),f.add(_),K.onpaint=(de)=>{let j=de.changedElements;for(let O of f)if(j.includes(O.image))O.needsUpdate=!0},K.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,Q);else{let{RGBA:j,RGBA:O,UNSIGNED_BYTE:z}=e;e.texElementImage2D(e.TEXTURE_2D,0,j,O,z,Q)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(Ce.length>0){if(Le&&Qe){let K=$e(Ce[0]);n.texStorage2D(e.TEXTURE_2D,he,ue,K.width,K.height)}for(let K=0,de=Ce.length;K<de;K++)if(ae=Ce[K],Le){if(U)n.texSubImage2D(e.TEXTURE_2D,K,0,0,me,Te,ae)}else n.texImage2D(e.TEXTURE_2D,K,ue,me,Te,ae);_.generateMipmaps=!1}else if(Le){if(Qe){let K=$e(Q);n.texStorage2D(e.TEXTURE_2D,he,ue,K.width,K.height)}if(U)n.texSubImage2D(e.TEXTURE_2D,0,0,0,me,Te,Q)}else n.texImage2D(e.TEXTURE_2D,0,ue,me,Te,Q);if(u(_))w(G);if(fe.__version=le.version,_.onUpdate)_.onUpdate(_)}E.__version=_.version}function xe(E,_,L){if(_.image.length!==6)return;let G=Z(E,_),ie=_.source;n.bindTexture(e.TEXTURE_CUBE_MAP,E.__webglTexture,e.TEXTURE0+L);let le=i.get(ie);if(ie.version!==le.__version||G===!0){n.activeTexture(e.TEXTURE0+L);let fe=je.getPrimaries(je.workingColorSpace),Y=_.colorSpace===Pi?null:je.getPrimaries(_.colorSpace),Q=_.colorSpace===Pi||fe===Y?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let me=_.isCompressedTexture||_.image[0].isCompressedTexture,Te=_.image[0]&&_.image[0].isDataTexture,ue=[];for(let O=0;O<6;O++){if(!me&&!Te)ue[O]=p(_.image[O],!0,s.maxCubemapSize);else ue[O]=Te?_.image[O].image:_.image[O];ue[O]=Oe(_,ue[O])}let ae=ue[0],Ce=r.convert(_.format,_.colorSpace),Le=r.convert(_.type),Qe=y(_.internalFormat,Ce,Le,_.normalized,_.colorSpace),U=_.isVideoTexture!==!0,he=le.__version===void 0||G===!0,K=ie.dataReady,de=R(_,ae);Fe(e.TEXTURE_CUBE_MAP,_);let j;if(me){if(U&&he)n.texStorage2D(e.TEXTURE_CUBE_MAP,de,Qe,ae.width,ae.height);for(let O=0;O<6;O++){j=ue[O].mipmaps;for(let z=0;z<j.length;z++){let oe=j[z];if(_.format!==Pn)if(Ce!==null)if(U){if(K)n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+O,z,0,0,oe.width,oe.height,Ce,oe.data)}else n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+O,z,Qe,oe.width,oe.height,0,oe.data);else Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(U){if(K)n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+O,z,0,0,oe.width,oe.height,Ce,Le,oe.data)}else n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+O,z,Qe,oe.width,oe.height,0,Ce,Le,oe.data)}}}else{if(j=_.mipmaps,U&&he){if(j.length>0)de++;let O=$e(ue[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,de,Qe,O.width,O.height)}for(let O=0;O<6;O++)if(Te){if(U){if(K)n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+O,0,0,0,ue[O].width,ue[O].height,Ce,Le,ue[O].data)}else n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+O,0,Qe,ue[O].width,ue[O].height,0,Ce,Le,ue[O].data);for(let z=0;z<j.length;z++){let ke=j[z].image[O].image;if(U){if(K)n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+O,z+1,0,0,ke.width,ke.height,Ce,Le,ke.data)}else n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+O,z+1,Qe,ke.width,ke.height,0,Ce,Le,ke.data)}}else{if(U){if(K)n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+O,0,0,0,Ce,Le,ue[O])}else n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+O,0,Qe,Ce,Le,ue[O]);for(let z=0;z<j.length;z++){let oe=j[z];if(U){if(K)n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+O,z+1,0,0,Ce,Le,oe.image[O])}else n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+O,z+1,Qe,Ce,Le,oe.image[O])}}}if(u(_))w(e.TEXTURE_CUBE_MAP);if(le.__version=ie.version,_.onUpdate)_.onUpdate(_)}E.__version=_.version}function ve(E,_,L,G,ie,le){let fe=r.convert(L.format,L.colorSpace),Y=r.convert(L.type),Q=y(L.internalFormat,fe,Y,L.normalized,L.colorSpace),me=i.get(_),Te=i.get(L);if(Te.__renderTarget=_,!me.__hasExternalTextures){let ue=Math.max(1,_.width>>le),ae=Math.max(1,_.height>>le);if(ie===e.TEXTURE_3D||ie===e.TEXTURE_2D_ARRAY)n.texImage3D(ie,le,Q,ue,ae,_.depth,0,fe,Y,null);else n.texImage2D(ie,le,Q,ue,ae,0,fe,Y,null)}if(n.bindFramebuffer(e.FRAMEBUFFER,E),N(_))o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,G,ie,Te.__webglTexture,0,wt(_));else if(ie===e.TEXTURE_2D||ie>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)e.framebufferTexture2D(e.FRAMEBUFFER,G,ie,Te.__webglTexture,le);n.bindFramebuffer(e.FRAMEBUFFER,null)}function rt(E,_,L){if(e.bindRenderbuffer(e.RENDERBUFFER,E),_.depthBuffer){let G=_.depthTexture,ie=G&&G.isDepthTexture?G.type:null,le=M(_.stencilBuffer,ie),fe=_.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(N(_))o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,wt(_),le,_.width,_.height);else if(L)e.renderbufferStorageMultisample(e.RENDERBUFFER,wt(_),le,_.width,_.height);else e.renderbufferStorage(e.RENDERBUFFER,le,_.width,_.height);e.framebufferRenderbuffer(e.FRAMEBUFFER,fe,e.RENDERBUFFER,E)}else{let G=_.textures;for(let ie=0;ie<G.length;ie++){let le=G[ie],fe=r.convert(le.format,le.colorSpace),Y=r.convert(le.type),Q=y(le.internalFormat,fe,Y,le.normalized,le.colorSpace);if(N(_))o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,wt(_),Q,_.width,_.height);else if(L)e.renderbufferStorageMultisample(e.RENDERBUFFER,wt(_),Q,_.width,_.height);else e.renderbufferStorage(e.RENDERBUFFER,Q,_.width,_.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Ve(E,_,L){let G=_.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ie=i.get(_.depthTexture);if(ie.__renderTarget=_,!ie.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0;if(G){if(ie.__webglInit===void 0)ie.__webglInit=!0,_.depthTexture.addEventListener("dispose",A);if(ie.__webglTexture===void 0){ie.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,ie.__webglTexture),Fe(e.TEXTURE_CUBE_MAP,_.depthTexture);let me=r.convert(_.depthTexture.format),Te=r.convert(_.depthTexture.type),ue;if(_.depthTexture.format===Ri)ue=e.DEPTH_COMPONENT24;else if(_.depthTexture.format===Ci)ue=e.DEPTH24_STENCIL8;for(let ae=0;ae<6;ae++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,ue,_.width,_.height,0,me,Te,null)}}else re(_.depthTexture,0);let le=ie.__webglTexture,fe=wt(_),Y=G?e.TEXTURE_CUBE_MAP_POSITIVE_X+L:e.TEXTURE_2D,Q=_.depthTexture.format===Ci?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(_.depthTexture.format===Ri)if(N(_))o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Q,Y,le,0,fe);else e.framebufferTexture2D(e.FRAMEBUFFER,Q,Y,le,0);else if(_.depthTexture.format===Ci)if(N(_))o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Q,Y,le,0,fe);else e.framebufferTexture2D(e.FRAMEBUFFER,Q,Y,le,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ze(E){let _=i.get(E),L=E.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==E.depthTexture){let G=E.depthTexture;if(_.__depthDisposeCallback)_.__depthDisposeCallback();if(G){let ie=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,G.removeEventListener("dispose",ie)};G.addEventListener("dispose",ie),_.__depthDisposeCallback=ie}_.__boundDepthTexture=G}if(E.depthTexture&&!_.__autoAllocateDepthBuffer)if(L)for(let G=0;G<6;G++)Ve(_.__webglFramebuffer[G],E,G);else{let G=E.texture.mipmaps;if(G&&G.length>0)Ve(_.__webglFramebuffer[0],E,0);else Ve(_.__webglFramebuffer,E,0)}else if(L){_.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer[G]),_.__webglDepthbuffer[G]===void 0)_.__webglDepthbuffer[G]=e.createRenderbuffer(),rt(_.__webglDepthbuffer[G],E,!1);else{let ie=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,le=_.__webglDepthbuffer[G];e.bindRenderbuffer(e.RENDERBUFFER,le),e.framebufferRenderbuffer(e.FRAMEBUFFER,ie,e.RENDERBUFFER,le)}}else{let G=E.texture.mipmaps;if(G&&G.length>0)n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer[0]);else n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer);if(_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=e.createRenderbuffer(),rt(_.__webglDepthbuffer,E,!1);else{let ie=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,le=_.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,le),e.framebufferRenderbuffer(e.FRAMEBUFFER,ie,e.RENDERBUFFER,le)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function tt(E,_,L){let G=i.get(E);if(_!==void 0)ve(G.__webglFramebuffer,E,E.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0);if(L!==void 0)ze(E)}function Ye(E){let _=E.texture,L=i.get(E),G=i.get(_);E.addEventListener("dispose",g);let ie=E.textures,le=E.isWebGLCubeRenderTarget===!0,fe=ie.length>1;if(!fe){if(G.__webglTexture===void 0)G.__webglTexture=e.createTexture();G.__version=_.version,a.memory.textures++}if(le){L.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(_.mipmaps&&_.mipmaps.length>0){L.__webglFramebuffer[Y]=[];for(let Q=0;Q<_.mipmaps.length;Q++)L.__webglFramebuffer[Y][Q]=e.createFramebuffer()}else L.__webglFramebuffer[Y]=e.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){L.__webglFramebuffer=[];for(let Y=0;Y<_.mipmaps.length;Y++)L.__webglFramebuffer[Y]=e.createFramebuffer()}else L.__webglFramebuffer=e.createFramebuffer();if(fe)for(let Y=0,Q=ie.length;Y<Q;Y++){let me=i.get(ie[Y]);if(me.__webglTexture===void 0)me.__webglTexture=e.createTexture(),a.memory.textures++}if(E.samples>0&&N(E)===!1){L.__webglMultisampledFramebuffer=e.createFramebuffer(),L.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let Y=0;Y<ie.length;Y++){let Q=ie[Y];L.__webglColorRenderbuffer[Y]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,L.__webglColorRenderbuffer[Y]);let me=r.convert(Q.format,Q.colorSpace),Te=r.convert(Q.type),ue=y(Q.internalFormat,me,Te,Q.normalized,Q.colorSpace,E.isXRRenderTarget===!0),ae=wt(E);e.renderbufferStorageMultisample(e.RENDERBUFFER,ae,ue,E.width,E.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Y,e.RENDERBUFFER,L.__webglColorRenderbuffer[Y])}if(e.bindRenderbuffer(e.RENDERBUFFER,null),E.depthBuffer)L.__webglDepthRenderbuffer=e.createRenderbuffer(),rt(L.__webglDepthRenderbuffer,E,!0);n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(le){n.bindTexture(e.TEXTURE_CUBE_MAP,G.__webglTexture),Fe(e.TEXTURE_CUBE_MAP,_);for(let Y=0;Y<6;Y++)if(_.mipmaps&&_.mipmaps.length>0)for(let Q=0;Q<_.mipmaps.length;Q++)ve(L.__webglFramebuffer[Y][Q],E,_,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Q);else ve(L.__webglFramebuffer[Y],E,_,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);if(u(_))w(e.TEXTURE_CUBE_MAP);n.unbindTexture()}else if(fe){for(let Y=0,Q=ie.length;Y<Q;Y++){let me=ie[Y],Te=i.get(me),ue=e.TEXTURE_2D;if(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)ue=E.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY;if(n.bindTexture(ue,Te.__webglTexture),Fe(ue,me),ve(L.__webglFramebuffer,E,me,e.COLOR_ATTACHMENT0+Y,ue,0),u(me))w(ue)}n.unbindTexture()}else{let Y=e.TEXTURE_2D;if(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)Y=E.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY;if(n.bindTexture(Y,G.__webglTexture),Fe(Y,_),_.mipmaps&&_.mipmaps.length>0)for(let Q=0;Q<_.mipmaps.length;Q++)ve(L.__webglFramebuffer[Q],E,_,e.COLOR_ATTACHMENT0,Y,Q);else ve(L.__webglFramebuffer,E,_,e.COLOR_ATTACHMENT0,Y,0);if(u(_))w(Y);n.unbindTexture()}if(E.depthBuffer)ze(E)}function Rt(E){let _=E.textures;for(let L=0,G=_.length;L<G;L++){let ie=_[L];if(u(ie)){let le=T(E),fe=i.get(ie).__webglTexture;n.bindTexture(le,fe),w(le),n.unbindTexture()}}}let ut=[],Ut=[];function Et(E){if(E.samples>0){if(N(E)===!1){let{textures:_,width:L,height:G}=E,ie=e.COLOR_BUFFER_BIT,le=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,fe=i.get(E),Y=_.length>1;if(Y)for(let me=0;me<_.length;me++)n.bindFramebuffer(e.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+me,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,fe.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+me,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer);let Q=E.texture.mipmaps;if(Q&&Q.length>0)n.bindFramebuffer(e.DRAW_FRAMEBUFFER,fe.__webglFramebuffer[0]);else n.bindFramebuffer(e.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let me=0;me<_.length;me++){if(E.resolveDepthBuffer){if(E.depthBuffer)ie|=e.DEPTH_BUFFER_BIT;if(E.stencilBuffer&&E.resolveStencilBuffer)ie|=e.STENCIL_BUFFER_BIT}if(Y){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,fe.__webglColorRenderbuffer[me]);let Te=i.get(_[me]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Te,0)}if(e.blitFramebuffer(0,0,L,G,0,0,L,G,ie,e.NEAREST),l===!0){if(ut.length=0,Ut.length=0,ut.push(e.COLOR_ATTACHMENT0+me),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1)ut.push(le),Ut.push(le),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ut);e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ut)}}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),Y)for(let me=0;me<_.length;me++){n.bindFramebuffer(e.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+me,e.RENDERBUFFER,fe.__webglColorRenderbuffer[me]);let Te=i.get(_[me]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,fe.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+me,e.TEXTURE_2D,Te,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&l){let _=E.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[_])}}}function wt(E){return Math.min(s.maxSamples,E.samples)}function N(E){let _=i.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Ot(E){let _=a.render.frame;if(d.get(E)!==_)d.set(E,_),E.update()}function Oe(E,_){let{colorSpace:L,format:G,type:ie}=E;if(E.isCompressedTexture===!0||E.isVideoTexture===!0)return _;if(L!==Yo&&L!==Pi)if(je.getTransfer(L)===gt){if(G!==Pn||ie!==yn)Ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else Ue("WebGLTextures: Unsupported texture color space:",L);return _}function $e(E){if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement)c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height;else if(typeof VideoFrame<"u"&&E instanceof VideoFrame)c.width=E.displayWidth,c.height=E.displayHeight;else c.width=E.width,c.height=E.height;return c}this.allocateTextureUnit=ee,this.resetTextureUnits=J,this.getTextureUnits=P,this.setTextureUnits=W,this.setTexture2D=re,this.setTexture2DArray=q,this.setTexture3D=te,this.setTextureCube=ne,this.rebindTextures=tt,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=Rt,this.updateMultisampleRenderTarget=Et,this.setupDepthRenderbuffer=ze,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=N,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function l0(e,t){function n(i,s=Pi){let r,a=je.getTransfer(s);if(i===yn)return e.UNSIGNED_BYTE;if(i===ho)return e.UNSIGNED_SHORT_4_4_4_4;if(i===uo)return e.UNSIGNED_SHORT_5_5_5_1;if(i===uh)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===dh)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===ch)return e.BYTE;if(i===hh)return e.SHORT;if(i===Fs)return e.UNSIGNED_SHORT;if(i===co)return e.INT;if(i===ui)return e.UNSIGNED_INT;if(i===Yn)return e.FLOAT;if(i===In)return e.HALF_FLOAT;if(i===fh)return e.ALPHA;if(i===ph)return e.RGB;if(i===Pn)return e.RGBA;if(i===Ri)return e.DEPTH_COMPONENT;if(i===Ci)return e.DEPTH_STENCIL;if(i===mh)return e.RED;if(i===fo)return e.RED_INTEGER;if(i===Ii)return e.RG;if(i===po)return e.RG_INTEGER;if(i===mo)return e.RGBA_INTEGER;if(i===Ur||i===Fr||i===Or||i===Br)if(a===gt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Ur)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Ur)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Fr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Or)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Br)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===go||i===_o||i===xo||i===yo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===go)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===_o)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===xo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===yo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===vo||i===So||i===Mo||i===bo||i===Eo||i===zr||i===wo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===vo||i===So)return a===gt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Mo)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===bo)return r.COMPRESSED_R11_EAC;if(i===Eo)return r.COMPRESSED_SIGNED_R11_EAC;if(i===zr)return r.COMPRESSED_RG11_EAC;if(i===wo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===To||i===Ao||i===Ro||i===Co||i===Io||i===Po||i===Lo||i===No||i===Do||i===Uo||i===Fo||i===Oo||i===Bo||i===zo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===To)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ao)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ro)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Co)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Io)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Po)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Lo)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===No)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Do)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Uo)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Fo)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Oo)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Bo)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===zo)return a===gt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ko||i===Ho||i===Go)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===ko)return a===gt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ho)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Go)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Vo||i===Wo||i===kr||i===Xo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Vo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Wo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===kr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Xo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(i===ls)return e.UNSIGNED_INT_24_8;return e[i]!==void 0?e[i]:null}return{convert:n}}var c0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,h0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class uu{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Kr(e.texture);if(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)this.depthNear=e.depthNear,this.depthFar=e.depthFar;this.texture=n}}getMesh(e){if(this.texture!==null){if(this.mesh===null){let t=e.cameras[0].viewport,n=new un({vertexShader:c0,fragmentShader:h0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ze(new Ln(20,20),n)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class du extends Zn{constructor(e,t){super();let n=this,i=null,s=1,r=null,a="local-floor",o=1,l=null,c=null,d=null,f=null,h=null,m=null,x=typeof XRWebGLBinding<"u",b=new uu,p={},u=t.getContextAttributes(),w=null,T=null,y=[],M=[],R=new Be,A=null,g=null,S=new rn;S.viewport=new yt;let B=new rn;B.viewport=new yt;let I=[S,B],F=new vl,J=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let se=y[Z];if(se===void 0)se=new zs,y[Z]=se;return se.getTargetRaySpace()},this.getControllerGrip=function(Z){let se=y[Z];if(se===void 0)se=new zs,y[Z]=se;return se.getGripSpace()},this.getHand=function(Z){let se=y[Z];if(se===void 0)se=new zs,y[Z]=se;return se.getHandSpace()};function W(Z){let se=M.indexOf(Z.inputSource);if(se===-1)return;let ce=y[se];if(ce!==void 0)ce.update(Z.inputSource,Z.frame,l||r),ce.dispatchEvent({type:Z.type,data:Z.inputSource})}function ee(){i.removeEventListener("select",W),i.removeEventListener("selectstart",W),i.removeEventListener("selectend",W),i.removeEventListener("squeeze",W),i.removeEventListener("squeezestart",W),i.removeEventListener("squeezeend",W),i.removeEventListener("end",ee),i.removeEventListener("inputsourceschange",V);for(let Z=0;Z<y.length;Z++){let se=M[Z];if(se===null)continue;M[Z]=null,y[Z].disconnect(se)}J=null,P=null,b.reset();for(let Z in p)delete p[Z];if(e.setRenderTarget(w),h=null,f=null,d=null,i=null,T=null,Fe.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(R.width,R.height,!1),g!==null){let Z=g.camera;Z.fov=g.fov,Z.zoom=g.zoom,Z.updateProjectionMatrix(),g=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){if(s=Z,n.isPresenting===!0)Ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){if(a=Z,n.isPresenting===!0)Ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){if(d===null&&x)d=new XRWebGLBinding(i,t);return d},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(w=e.getRenderTarget(),i.addEventListener("select",W),i.addEventListener("selectstart",W),i.addEventListener("selectend",W),i.addEventListener("squeeze",W),i.addEventListener("squeezestart",W),i.addEventListener("squeezeend",W),i.addEventListener("end",ee),i.addEventListener("inputsourceschange",V),u.xrCompatible!==!0)await t.makeXRCompatible();if(A=e.getPixelRatio(),e.getSize(R),!(x&&("createProjectionLayer"in XRWebGLBinding.prototype))){let ce={antialias:u.antialias,alpha:!0,depth:u.depth,stencil:u.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(i,t,ce),i.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),T=new an(h.framebufferWidth,h.framebufferHeight,{format:Pn,type:yn,colorSpace:e.outputColorSpace,stencilBuffer:u.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let ce=null,_e=null,xe=null;if(u.depth)xe=u.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=u.stencil?Ci:Ri,_e=u.stencil?ls:ui;let ve={colorFormat:t.RGBA8,depthFormat:xe,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(ve),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),T=new an(f.textureWidth,f.textureHeight,{format:Pn,type:yn,depthTexture:new Li(f.textureWidth,f.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:u.stencil,colorSpace:e.outputColorSpace,samples:u.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(o),l=null,r=await i.requestReferenceSpace(a),Fe.setContext(i),Fe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return b.getDepthTexture()};function V(Z){for(let se=0;se<Z.removed.length;se++){let ce=Z.removed[se],_e=M.indexOf(ce);if(_e>=0)M[_e]=null,y[_e].disconnect(ce)}for(let se=0;se<Z.added.length;se++){let ce=Z.added[se],_e=M.indexOf(ce);if(_e===-1){for(let ve=0;ve<y.length;ve++)if(ve>=M.length){M.push(ce),_e=ve;break}else if(M[ve]===null){M[ve]=ce,_e=ve;break}if(_e===-1)break}let xe=y[_e];if(xe)xe.connect(ce)}}let re=new C,q=new C;function te(Z,se,ce){re.setFromMatrixPosition(se.matrixWorld),q.setFromMatrixPosition(ce.matrixWorld);let _e=re.distanceTo(q),xe=se.projectionMatrix.elements,ve=ce.projectionMatrix.elements,rt=xe[14]/(xe[10]-1),Ve=xe[14]/(xe[10]+1),ze=(xe[9]+1)/xe[5],tt=(xe[9]-1)/xe[5],Ye=(xe[8]-1)/xe[0],Rt=(ve[8]+1)/ve[0],ut=rt*Ye,Ut=rt*Rt,Et=_e/(-Ye+Rt),wt=Et*-Ye;if(se.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(wt),Z.translateZ(Et),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),xe[10]===-1)Z.projectionMatrix.copy(se.projectionMatrix),Z.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{let N=rt+Et,Ot=Ve+Et,Oe=ut-wt,$e=Ut+(_e-wt),E=ze*Ve/Ot*N,_=tt*Ve/Ot*N;Z.projectionMatrix.makePerspective(Oe,$e,E,_,N,Ot),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ne(Z,se){if(se===null)Z.matrixWorld.copy(Z.matrix);else Z.matrixWorld.multiplyMatrices(se.matrixWorld,Z.matrix);Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let{near:se,far:ce}=Z;if(b.texture!==null){if(b.depthNear>0)se=b.depthNear;if(b.depthFar>0)ce=b.depthFar}if(F.near=B.near=S.near=se,F.far=B.far=S.far=ce,J!==F.near||P!==F.far)i.updateRenderState({depthNear:F.near,depthFar:F.far}),J=F.near,P=F.far;F.layers.mask=Z.layers.mask|6,S.layers.mask=F.layers.mask&-5,B.layers.mask=F.layers.mask&-3;let _e=Z.parent,xe=F.cameras;ne(F,_e);for(let ve=0;ve<xe.length;ve++)ne(xe[ve],_e);if(xe.length===2)te(F,S,B);else F.projectionMatrix.copy(S.projectionMatrix);if(g===null&&Z.isPerspectiveCamera)g={camera:Z,fov:Z.fov,zoom:Z.zoom};Pe(Z,F,_e)};function Pe(Z,se,ce){if(ce===null)Z.matrix.copy(se.matrixWorld);else Z.matrix.copy(ce.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(se.matrixWorld);if(Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(se.projectionMatrix),Z.projectionMatrixInverse.copy(se.projectionMatrixInverse),Z.isPerspectiveCamera)Z.fov=Ar*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1}this.getCamera=function(){return F},this.getFoveation=function(){if(f===null&&h===null)return;return o},this.setFoveation=function(Z){if(o=Z,f!==null)f.fixedFoveation=Z;if(h!==null&&h.fixedFoveation!==void 0)h.fixedFoveation=Z},this.hasDepthSensing=function(){return b.texture!==null},this.getDepthSensingMesh=function(){return b.getMesh(F)},this.getCameraTexture=function(Z){return p[Z]};let we=null;function et(Z,se){if(c=se.getViewerPose(l||r),m=se,c!==null){let ce=c.views;if(h!==null)e.setRenderTargetFramebuffer(T,h.framebuffer),e.setRenderTarget(T);let _e=!1;if(ce.length!==F.cameras.length)F.cameras.length=0,_e=!0;for(let Ve=0;Ve<ce.length;Ve++){let ze=ce[Ve],tt=null;if(h!==null)tt=h.getViewport(ze);else{let Rt=d.getViewSubImage(f,ze);if(tt=Rt.viewport,Ve===0)e.setRenderTargetTextures(T,Rt.colorTexture,Rt.depthStencilTexture),e.setRenderTarget(T)}let Ye=I[Ve];if(Ye===void 0)Ye=new rn,Ye.layers.enable(Ve),Ye.viewport=new yt,I[Ve]=Ye;if(Ye.matrix.fromArray(ze.transform.matrix),Ye.matrix.decompose(Ye.position,Ye.quaternion,Ye.scale),Ye.projectionMatrix.fromArray(ze.projectionMatrix),Ye.projectionMatrixInverse.copy(Ye.projectionMatrix).invert(),Ye.viewport.set(tt.x,tt.y,tt.width,tt.height),Ve===0)F.matrix.copy(Ye.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale);if(_e===!0)F.cameras.push(Ye)}let xe=i.enabledFeatures;if(xe&&xe.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){d=n.getBinding();let Ve=d.getDepthInformation(ce[0]);if(Ve&&Ve.isValid&&Ve.texture)b.init(Ve,i.renderState)}if(xe&&xe.includes("camera-access")&&x){e.state.unbindTexture(),d=n.getBinding();for(let Ve=0;Ve<ce.length;Ve++){let ze=ce[Ve].camera;if(ze){let tt=p[ze];if(!tt)tt=new Kr,p[ze]=tt;let Ye=d.getCameraImage(ze);tt.sourceTexture=Ye}}}}for(let ce=0;ce<y.length;ce++){let _e=M[ce],xe=y[ce];if(_e!==null&&xe!==void 0)xe.update(_e,se,l||r)}if(we)we(Z,se);if(se.detectedPlanes)n.dispatchEvent({type:"planesdetected",data:se});m=null}let Fe=new eu;Fe.setAnimationLoop(et),this.setAnimationLoop=function(Z){we=Z},this.dispose=function(){}}}var u0=new at,fu=new Ge;fu.set(-1,0,0,0,1,0,0,0,1);function d0(e,t){function n(p,u){if(p.matrixAutoUpdate===!0)p.updateMatrix();u.value.copy(p.matrix)}function i(p,u){if(u.color.getRGB(p.fogColor.value,sl(e)),u.isFog)p.fogNear.value=u.near,p.fogFar.value=u.far;else if(u.isFogExp2)p.fogDensity.value=u.density}function s(p,u,w,T,y){if(u.isNodeMaterial)u.uniformsNeedUpdate=!1;else if(u.isMeshBasicMaterial)r(p,u);else if(u.isMeshLambertMaterial){if(r(p,u),u.envMap)p.envMapIntensity.value=u.envMapIntensity}else if(u.isMeshToonMaterial)r(p,u),f(p,u);else if(u.isMeshPhongMaterial){if(r(p,u),d(p,u),u.envMap)p.envMapIntensity.value=u.envMapIntensity}else if(u.isMeshStandardMaterial){if(r(p,u),h(p,u),u.isMeshPhysicalMaterial)m(p,u,y)}else if(u.isMeshMatcapMaterial)r(p,u),x(p,u);else if(u.isMeshDepthMaterial)r(p,u);else if(u.isMeshDistanceMaterial)r(p,u),b(p,u);else if(u.isMeshNormalMaterial)r(p,u);else if(u.isLineBasicMaterial){if(a(p,u),u.isLineDashedMaterial)o(p,u)}else if(u.isPointsMaterial)l(p,u,w,T);else if(u.isSpriteMaterial)c(p,u);else if(u.isShadowMaterial)p.color.value.copy(u.color),p.opacity.value=u.opacity;else if(u.isShaderMaterial)u.uniformsNeedUpdate=!1}function r(p,u){if(p.opacity.value=u.opacity,u.color)p.diffuse.value.copy(u.color);if(u.emissive)p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity);if(u.map)p.map.value=u.map,n(u.map,p.mapTransform);if(u.alphaMap)p.alphaMap.value=u.alphaMap,n(u.alphaMap,p.alphaMapTransform);if(u.bumpMap){if(p.bumpMap.value=u.bumpMap,n(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===Wt)p.bumpScale.value*=-1}if(u.normalMap){if(p.normalMap.value=u.normalMap,n(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===Wt)p.normalScale.value.negate()}if(u.displacementMap)p.displacementMap.value=u.displacementMap,n(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias;if(u.emissiveMap)p.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,p.emissiveMapTransform);if(u.specularMap)p.specularMap.value=u.specularMap,n(u.specularMap,p.specularMapTransform);if(u.alphaTest>0)p.alphaTest.value=u.alphaTest;let w=t.get(u),{envMap:T,envMapRotation:y}=w;if(T){if(p.envMap.value=T,p.envMapRotation.value.setFromMatrix4(u0.makeRotationFromEuler(y)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1)p.envMapRotation.value.premultiply(fu);p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio}if(u.lightMap)p.lightMap.value=u.lightMap,p.lightMapIntensity.value=u.lightMapIntensity,n(u.lightMap,p.lightMapTransform);if(u.aoMap)p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,p.aoMapTransform)}function a(p,u){if(p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map)p.map.value=u.map,n(u.map,p.mapTransform)}function o(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function l(p,u,w,T){if(p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*w,p.scale.value=T*0.5,u.map)p.map.value=u.map,n(u.map,p.uvTransform);if(u.alphaMap)p.alphaMap.value=u.alphaMap,n(u.alphaMap,p.alphaMapTransform);if(u.alphaTest>0)p.alphaTest.value=u.alphaTest}function c(p,u){if(p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map)p.map.value=u.map,n(u.map,p.mapTransform);if(u.alphaMap)p.alphaMap.value=u.alphaMap,n(u.alphaMap,p.alphaMapTransform);if(u.alphaTest>0)p.alphaTest.value=u.alphaTest}function d(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,0.0001)}function f(p,u){if(u.gradientMap)p.gradientMap.value=u.gradientMap}function h(p,u){if(p.metalness.value=u.metalness,u.metalnessMap)p.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,p.metalnessMapTransform);if(p.roughness.value=u.roughness,u.roughnessMap)p.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,p.roughnessMapTransform);if(u.envMap)p.envMapIntensity.value=u.envMapIntensity}function m(p,u,w){if(p.ior.value=u.ior,u.sheen>0){if(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap)p.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,p.sheenColorMapTransform);if(u.sheenRoughnessMap)p.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,p.sheenRoughnessMapTransform)}if(u.clearcoat>0){if(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap)p.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,p.clearcoatMapTransform);if(u.clearcoatRoughnessMap)p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform);if(u.clearcoatNormalMap){if(p.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Wt)p.clearcoatNormalScale.value.negate()}}if(u.dispersion>0)p.dispersion.value=u.dispersion;if(u.retroreflectivity>0)p.retroreflectivity.value=u.retroreflectivity;if(u.iridescence>0){if(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap)p.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,p.iridescenceMapTransform);if(u.iridescenceThicknessMap)p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform)}if(u.transmission>0){if(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=w.texture,p.transmissionSamplerSize.value.set(w.width,w.height),u.transmissionMap)p.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,p.transmissionMapTransform);if(p.thickness.value=u.thickness,u.thicknessMap)p.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,p.thicknessMapTransform);p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)}if(u.anisotropy>0){if(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap)p.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,p.anisotropyMapTransform)}if(p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap)p.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,p.specularColorMapTransform);if(u.specularIntensityMap)p.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,p.specularIntensityMapTransform)}function x(p,u){if(u.matcap)p.matcap.value=u.matcap}function b(p,u){let w=t.get(u).light;p.referencePosition.value.setFromMatrixPosition(w.matrixWorld),p.nearDistance.value=w.shadow.camera.near,p.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function f0(e,t,n,i){let s={},r={},a=[],o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,M){let R=M.program;i.uniformBlockBinding(y,R)}function c(y,M){let R=s[y.id];if(R===void 0)p(y),R=d(y),s[y.id]=R,y.addEventListener("dispose",w);let A=M.program;i.updateUBOMapping(y,A);let g=t.render.frame;if(r[y.id]!==g)h(y),r[y.id]=g}function d(y){let M=f();y.__bindingPointIndex=M;let R=e.createBuffer(),{__size:A,usage:g}=y;return e.bindBuffer(e.UNIFORM_BUFFER,R),e.bufferData(e.UNIFORM_BUFFER,A,g),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,M,R),R}function f(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Ue("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){let M=s[y.id],{uniforms:R,__cache:A}=y;e.bindBuffer(e.UNIFORM_BUFFER,M);for(let g=0,S=R.length;g<S;g++){let B=R[g];if(Array.isArray(B))for(let I=0,F=B.length;I<F;I++)m(B[I],g,I,A);else m(B,g,0,A)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function m(y,M,R,A){if(b(y,M,R,A)===!0){let{__offset:g,value:S}=y;if(Array.isArray(S)){let B=0;for(let I=0;I<S.length;I++){let F=S[I],J=u(F);if(x(F,y.__data,B),typeof F!=="number"&&typeof F!=="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F))B+=J.storage/Float32Array.BYTES_PER_ELEMENT}}else x(S,y.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,g,y.__data)}}function x(y,M,R){if(typeof y==="number"||typeof y==="boolean")M[0]=y;else if(y.isMatrix3)M[0]=y.elements[0],M[1]=y.elements[1],M[2]=y.elements[2],M[3]=0,M[4]=y.elements[3],M[5]=y.elements[4],M[6]=y.elements[5],M[7]=0,M[8]=y.elements[6],M[9]=y.elements[7],M[10]=y.elements[8],M[11]=0;else if(ArrayBuffer.isView(y))M.set(new y.constructor(y.buffer,y.byteOffset,M.length));else y.toArray(M,R)}function b(y,M,R,A){let g=y.value,S=M+"_"+R;if(A[S]===void 0){if(typeof g==="number"||typeof g==="boolean")A[S]=g;else if(ArrayBuffer.isView(g))A[S]=g.slice();else A[S]=g.clone();return!0}else{let B=A[S];if(typeof g==="number"||typeof g==="boolean"){if(B!==g)return A[S]=g,!0}else if(ArrayBuffer.isView(g))return!0;else if(B.equals(g)===!1)return B.copy(g),!0}return!1}function p(y){let M=y.uniforms,R=0,A=16;for(let S=0,B=M.length;S<B;S++){let I=Array.isArray(M[S])?M[S]:[M[S]];for(let F=0,J=I.length;F<J;F++){let P=I[F],W=Array.isArray(P.value)?P.value:[P.value];for(let ee=0,V=W.length;ee<V;ee++){let re=W[ee],q=u(re),te=R%A,ne=te%q.boundary,Pe=te+ne;if(R+=ne,Pe!==0&&A-Pe<q.storage)R+=A-Pe;P.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=R,R+=q.storage}}}let g=R%A;if(g>0)R+=A-g;return y.__size=R,y.__cache={},this}function u(y){let M={boundary:0,storage:0};if(typeof y==="number"||typeof y==="boolean")M.boundary=4,M.storage=4;else if(y.isVector2)M.boundary=8,M.storage=8;else if(y.isVector3||y.isColor)M.boundary=16,M.storage=12;else if(y.isVector4)M.boundary=16,M.storage=16;else if(y.isMatrix3)M.boundary=48,M.storage=48;else if(y.isMatrix4)M.boundary=64,M.storage=64;else if(y.isTexture)Ne("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(y))M.boundary=16,M.storage=y.byteLength;else Ne("WebGLRenderer: Unsupported uniform value type.",y);return M}function w(y){let M=y.target;M.removeEventListener("dispose",w);let R=a.indexOf(M.__bindingPointIndex);a.splice(R,1),e.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function T(){for(let y in s)e.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:T}}var p0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Un=null;function m0(){if(Un===null)Un=new $r(p0,16,16,Ii,In),Un.name="DFG_LUT",Un.minFilter=Qt,Un.magFilter=Qt,Un.wrapS=Nr,Un.wrapT=Nr,Un.generateMipmaps=!1,Un.needsUpdate=!0;return Un}class Ul{constructor(e={}){let{canvas:t=bh(),context:n=null,depth:i=!0,stencil:s=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:h=yn}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=r;let x=h,b=new Set([mo,po,fo]),p=new Set([yn,ui,Fs,ls,ho,uo]),u=new Uint32Array(4),w=new Int32Array(4),T=new C,y=null,M=null,R=[],A=[],g=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let S=this,B=!1,I=null,F=null,J=null,P=null;this._outputColorSpace=Hr;let W=0,ee=0,V=null,re=-1,q=null,te=new yt,ne=new yt,Pe=null,we=new He(0),et=0,{width:Fe,height:Z}=t,se=1,ce=null,_e=null,xe=new yt(0,0,Fe,Z),ve=new yt(0,0,Fe,Z),rt=!1,Ve=new Hs,ze=!1,tt=!1,Ye=new at,Rt=new C,ut=new yt,Ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Et=!1;function wt(){return V===null?se:1}let N=n;function Ot(v,D){return t.getContext(v,D)}let Oe,$e,E,_,L,G,ie,le,fe,Y,Q,me,Te,ue,ae,Ce,Le,Qe,U,he,K,de,j;try{let v={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:d};if("setAttribute"in t)t.setAttribute("data-engine",`three.js r${Tc}`);if(t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",ke,!1),t.addEventListener("webglcontextcreationerror",Ie,!1),N===null){if(N=Ot("webgl2",v),N===null)if(Ot("webgl2"))throw Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.");else throw Error("THREE.WebGLRenderer: Error creating WebGL context.")}O()}catch(v){throw t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",ke,!1),t.removeEventListener("webglcontextcreationerror",Ie,!1),Ue("WebGLRenderer: "+v.message),v}function O(){if(Oe=new Mm(N),Oe.init(),K=new l0(N,Oe),$e=new dm(N,Oe,e,K),E=new a0(N,Oe),$e.reversedDepthBuffer&&f)E.buffers.depth.setReversed(!0);F=N.createFramebuffer(),J=N.createFramebuffer(),P=N.createFramebuffer(),_=new wm(N),L=new qg,G=new o0(N,Oe,E,L,$e,K,_),ie=new Sm(S),le=new Td(N),de=new hm(N,le),fe=new bm(N,le,_,de),Y=new Am(N,fe,le,de,_),Qe=new Tm(N,$e,G),ae=new fm(L),Q=new Xg(S,ie,Oe,$e,de,ae),me=new d0(S,L),Te=new Zg,ue=new e0(Oe),Le=new cm(S,ie,E,Y,m,o),Ce=new r0(S,Y,$e),j=new f0(N,_,$e,E),U=new um(N,Oe,_),he=new Em(N,Oe,_),_.programs=Q.programs,S.capabilities=$e,S.extensions=Oe,S.properties=L,S.renderLists=Te,S.shadowMap=Ce,S.state=E,S.info=_}if(x!==yn)g=new Cm(x,t.width,t.height,a,i,s);let z=new du(S,N);this.xr=z,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let v=Oe.get("WEBGL_lose_context");if(v)v.loseContext()},this.forceContextRestore=function(){let v=Oe.get("WEBGL_lose_context");if(v)v.restoreContext()},this.getPixelRatio=function(){return se},this.setPixelRatio=function(v){if(v===void 0)return;se=v,this.setSize(Fe,Z,!1)},this.getSize=function(v){return v.set(Fe,Z)},this.setSize=function(v,D,X=!0){if(z.isPresenting){Ne("WebGLRenderer: Can't change size while VR device is presenting.");return}if(Fe=v,Z=D,t.width=Math.floor(v*se),t.height=Math.floor(D*se),X===!0)t.style.width=v+"px",t.style.height=D+"px";if(g!==null)g.setSize(t.width,t.height);this.setViewport(0,0,v,D)},this.getDrawingBufferSize=function(v){return v.set(Fe*se,Z*se).floor()},this.setDrawingBufferSize=function(v,D,X){Fe=v,Z=D,se=X,t.width=Math.floor(v*X),t.height=Math.floor(D*X),this.setViewport(0,0,v,D)},this.setEffects=function(v){if(x===yn){Ue("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let D=0;D<v.length;D++)if(v[D].isOutputPass===!0){Ne("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}g.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(te)},this.getViewport=function(v){return v.copy(xe)},this.setViewport=function(v,D,X,k){if(v.isVector4)xe.set(v.x,v.y,v.z,v.w);else xe.set(v,D,X,k);E.viewport(te.copy(xe).multiplyScalar(se).round())},this.getScissor=function(v){return v.copy(ve)},this.setScissor=function(v,D,X,k){if(v.isVector4)ve.set(v.x,v.y,v.z,v.w);else ve.set(v,D,X,k);E.scissor(ne.copy(ve).multiplyScalar(se).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(v){E.setScissorTest(rt=v)},this.setOpaqueSort=function(v){ce=v},this.setTransparentSort=function(v){_e=v},this.getClearColor=function(v){return v.copy(Le.getClearColor())},this.setClearColor=function(){Le.setClearColor(...arguments)},this.getClearAlpha=function(){return Le.getClearAlpha()},this.setClearAlpha=function(){Le.setClearAlpha(...arguments)},this.clear=function(v=!0,D=!0,X=!0){let k=0;if(v){let H=!1;if(V!==null){let ye=V.texture.format;H=b.has(ye)}if(H){let ye=V.texture.type,Me=p.has(ye),ge=Le.getClearColor(),be=Le.getClearAlpha(),{r:Ae,g:We,b:Je}=ge;if(Me)u[0]=Ae,u[1]=We,u[2]=Je,u[3]=be,N.clearBufferuiv(N.COLOR,0,u);else w[0]=Ae,w[1]=We,w[2]=Je,w[3]=be,N.clearBufferiv(N.COLOR,0,w)}else k|=N.COLOR_BUFFER_BIT}if(D)k|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(X)k|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(k!==0)N.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),I=v},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",ke,!1),t.removeEventListener("webglcontextcreationerror",Ie,!1),Le.dispose(),Te.dispose(),ue.dispose(),L.dispose(),ie.dispose(),Y.dispose(),de.dispose(),j.dispose(),Q.dispose(),z.dispose(),z.removeEventListener("sessionstart",Ft),z.removeEventListener("sessionend",ei),Zt.stop()};function oe(v){v.preventDefault(),Ko("WebGLRenderer: Context Lost."),B=!0}function ke(){Ko("WebGLRenderer: Context Restored."),B=!1;let v=_.autoReset,D=Ce.enabled,X=Ce.autoUpdate,k=Ce.needsUpdate,H=Ce.type;O(),_.autoReset=v,Ce.enabled=D,Ce.autoUpdate=X,Ce.needsUpdate=k,Ce.type=H}function Ie(v){Ue("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function lt(v){let D=v.target;D.removeEventListener("dispose",lt),dt(D)}function dt(v){en(v),L.remove(v)}function en(v){let D=L.get(v).programs;if(D!==void 0){if(D.forEach(function(X){Q.releaseProgram(X)}),v.isShaderMaterial)Q.releaseShaderCache(v)}}this.renderBufferDirect=function(v,D,X,k,H,ye){if(D===null)D=Ut;let Me=H.isMesh&&H.matrixWorld.determinantAffine()<0,ge=Ea(v,D,X,k,H);E.setMaterial(k,Me);let be=X.index,Ae=1;if(k.wireframe===!0){if(be=fe.getWireframeAttribute(X),be===void 0)return;Ae=2}let We=X.drawRange,Je=X.attributes.position,Ee=We.start*Ae,ot=(We.start+We.count)*Ae;if(ye!==null)Ee=Math.max(Ee,ye.start*Ae),ot=Math.min(ot,(ye.start+ye.count)*Ae);if(be!==null)Ee=Math.max(Ee,0),ot=Math.min(ot,be.count);else if(Je!==void 0&&Je!==null)Ee=Math.max(Ee,0),ot=Math.min(ot,Je.count);let Ct=ot-Ee;if(Ct<0||Ct===1/0)return;de.setup(H,k,ge,X,be);let xt,mt=U;if(be!==null)xt=le.get(be),mt=he,mt.setIndex(xt);if(H.isMesh)if(k.wireframe===!0)E.setLineWidth(k.wireframeLinewidth*wt()),mt.setMode(N.LINES);else mt.setMode(N.TRIANGLES);else if(H.isLine){let kt=k.linewidth;if(kt===void 0)kt=1;if(E.setLineWidth(kt*wt()),H.isLineSegments)mt.setMode(N.LINES);else if(H.isLineLoop)mt.setMode(N.LINE_LOOP);else mt.setMode(N.LINE_STRIP)}else if(H.isPoints)mt.setMode(N.POINTS);else if(H.isSprite)mt.setMode(N.TRIANGLES);if(H.isBatchedMesh)if(!Oe.get("WEBGL_multi_draw")){let{_multiDrawStarts:kt,_multiDrawCounts:Se,_multiDrawCount:$t}=H,it=be?le.get(be).bytesPerElement:1,ln=L.get(k).currentProgram.getUniforms();for(let Tn=0;Tn<$t;Tn++)ln.setValue(N,"_gl_DrawID",Tn),mt.render(kt[Tn]/it,Se[Tn])}else mt.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else if(H.isInstancedMesh)mt.renderInstances(Ee,Ct,H.count);else if(X.isInstancedBufferGeometry){let kt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Se=Math.min(X.instanceCount,kt);mt.renderInstances(Ee,Ct,Se)}else mt.render(Ee,Ct)};function Kt(v,D,X,k){if(I!==null&&v.isNodeMaterial)I.setObject(k,v);if(ze===!0)ae.setState(v,X,!1);if(v.transparent===!0&&v.side===Xt&&v.forceSinglePass===!1)v.side=Wt,v.needsUpdate=!0,tn(v,D,k),v.side=ci,v.needsUpdate=!0,tn(v,D,k),v.side=Xt;else tn(v,D,k)}this.compile=function(v,D,X=null){if(X===null)X=v;if(I!==null)I.renderStart(v,D,X);if(M=ue.get(X),M.init(D),A.push(M),X.traverseVisible(function(H){if(H.isLight&&H.layers.test(D.layers)){if(M.pushLight(H),H.castShadow)M.pushShadow(H)}}),v!==X)v.traverseVisible(function(H){if(H.isLight&&H.layers.test(D.layers)){if(M.pushLight(H),H.castShadow)M.pushShadow(H)}});if(M.setupLights(),I!==null)I.updateLights(M.state.lightsArray);if(tt=this.localClippingEnabled,ze=ae.init(this.clippingPlanes,tt),ze===!0)ae.setGlobalState(this.clippingPlanes,D);if(I!==null)Ce.render(M.state.shadowsArray,X,D);let k=new Set;if(v.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let ye=H.material;if(ye)if(Array.isArray(ye))for(let Me=0;Me<ye.length;Me++){let ge=ye[Me];Kt(ge,X,D,H),k.add(ge)}else Kt(ye,X,D,H),k.add(ye)}),M=A.pop(),I!==null)I.renderEnd();return k},this.compileAsync=function(v,D,X=null){let k=this.compile(v,D,X);return new Promise((H)=>{function ye(){if(k.forEach(function(Me){let be=L.get(Me).currentProgram;if(be===void 0||be.isReady())k.delete(Me)}),k.size===0){H(v);return}setTimeout(ye,10)}if(Oe.get("KHR_parallel_shader_compile")!==null)ye();else setTimeout(ye,10)})};let Yt=null;function Bt(v){if(Yt)Yt(v)}function Ft(){Zt.stop()}function ei(){Zt.start()}let Zt=new eu;if(Zt.setAnimationLoop(Bt),typeof self<"u")Zt.setContext(self);this.setAnimationLoop=function(v){Yt=v,z.setAnimationLoop(v),v===null?Zt.stop():Zt.start()},z.addEventListener("sessionstart",Ft),z.addEventListener("sessionend",ei),this.render=function(v,D){if(D!==void 0&&D.isCamera!==!0){Ue("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;if(I!==null)I.renderStart(v,D);let X=z.enabled===!0&&z.isPresenting===!0,k=g!==null&&(V===null||X)&&g.begin(S,V);if(v.matrixWorldAutoUpdate===!0)v.updateMatrixWorld();if(D.parent===null&&D.matrixWorldAutoUpdate===!0)D.updateMatrixWorld();if(z.enabled===!0&&z.isPresenting===!0&&(g===null||g.isCompositing()===!1)){if(z.cameraAutoUpdate===!0)z.updateCamera(D);D=z.getCamera()}if(v.isScene===!0)v.onBeforeRender(S,v,D,V);if(M=ue.get(v,A.length),M.init(D),M.state.textureUnits=G.getTextureUnits(),A.push(M),Ye.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Ve.setFromProjectionMatrix(Ye,Jo,D.reversedDepth),tt=this.localClippingEnabled,ze=ae.init(this.clippingPlanes,tt),y=Te.get(v,R.length),y.init(),R.push(y),z.enabled===!0&&z.isPresenting===!0){let Me=S.xr.getDepthSensingMesh();if(Me!==null)Ss(Me,D,-1/0,S.sortObjects)}if(Ss(v,D,0,S.sortObjects),y.finish(),I!==null)I.updateLights(M.state.lightsArray);if(S.sortObjects===!0)y.sort(ce,_e);if(Et=z.enabled===!1||z.isPresenting===!1||z.hasDepthSensing()===!1,Et)Le.addToRenderList(y,v);if(this.info.render.frame++,this.info.autoReset===!0)this.info.reset();if(ze===!0)ae.beginShadows();let H=M.state.shadowsArray;if(Ce.render(H,v,D),ze===!0)ae.endShadows();if((k&&g.hasRenderPass())===!1){let Me=y.opaque,ge=y.transmissive;if(M.setupLights(),D.isArrayCamera){let be=D.cameras;if(ge.length>0)for(let Ae=0,We=be.length;Ae<We;Ae++){let Je=be[Ae];nt(Me,ge,v,Je)}if(Et)Le.render(v);for(let Ae=0,We=be.length;Ae<We;Ae++){let Je=be[Ae];Re(y,v,Je,Je.viewport)}}else{if(ge.length>0)nt(Me,ge,v,D);if(Et)Le.render(v);Re(y,v,D)}}if(V!==null&&ee===0)G.updateMultisampleRenderTarget(V),G.updateRenderTargetMipmap(V);if(k)g.end(S);if(v.isScene===!0)v.onAfterRender(S,v,D);if(de.resetDefaultState(),re=-1,q=null,A.pop(),A.length>0){if(M=A[A.length-1],G.setTextureUnits(M.state.textureUnits),ze===!0)ae.setGlobalState(S.clippingPlanes,M.state.camera)}else M=null;if(R.pop(),R.length>0)y=R[R.length-1];else y=null;if(I!==null)I.renderEnd()};function Ss(v,D,X,k){if(v.visible===!1)return;if(v.layers.test(D.layers)){if(v.isGroup)X=v.renderOrder;else if(v.isLOD){if(v.autoUpdate===!0)v.update(D)}else if(v.isLightProbeGrid)M.pushLightProbeGrid(v);else if(v.isLight){if(M.pushLight(v),v.castShadow)M.pushShadow(v)}else if(v.isSprite){if(!v.frustumCulled||v.intersectsFrustum(Ve)){if(k)ut.setFromMatrixPosition(v.matrixWorld).applyMatrix4(Ye);let Me=Y.update(v),ge=v.material;if(ge.visible)y.push(v,Me,ge,X,ut.z,null,D)}}else if(v.isMesh||v.isLine||v.isPoints){if(!v.frustumCulled||v.intersectsFrustum(Ve)){let Me=Y.update(v),ge=v.material;if(k){if(v.boundingSphere!==void 0){if(v.boundingSphere===null)v.computeBoundingSphere();ut.copy(v.boundingSphere.center)}else{if(Me.boundingSphere===null)Me.computeBoundingSphere();ut.copy(Me.boundingSphere.center)}ut.applyMatrix4(v.matrixWorld).applyMatrix4(Ye)}if(Array.isArray(ge)){let be=Me.groups;for(let Ae=0,We=be.length;Ae<We;Ae++){let Je=be[Ae],Ee=ge[Je.materialIndex];if(Ee&&Ee.visible)y.push(v,Me,Ee,X,ut.z,Je,D)}}else if(ge.visible)y.push(v,Me,ge,X,ut.z,null,D)}}}let ye=v.children;for(let Me=0,ge=ye.length;Me<ge;Me++)Ss(ye[Me],D,X,k)}function Re(v,D,X,k){let{opaque:H,transmissive:ye,transparent:Me}=v;if(M.setupLightsView(X),ze===!0)ae.setGlobalState(S.clippingPlanes,X);if(k)E.viewport(te.copy(k));if(H.length>0)St(H,D,X);if(ye.length>0)St(ye,D,X);if(Me.length>0)St(Me,D,X);E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function nt(v,D,X,k){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[k.id]===void 0){let Ee=Oe.has("EXT_color_buffer_half_float")||Oe.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[k.id]=new an(1,1,{generateMipmaps:!0,type:Ee?In:yn,minFilter:Ai,samples:Math.max(4,$e.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:je.workingColorSpace})}let ye=M.state.transmissionRenderTarget[k.id],Me=k.viewport||te;ye.setSize(Me.z*S.transmissionResolutionScale,Me.w*S.transmissionResolutionScale);let ge=S.getRenderTarget(),be=S.getActiveCubeFace(),Ae=S.getActiveMipmapLevel();if(S.setRenderTarget(ye),S.getClearColor(we),et=S.getClearAlpha(),et<1)S.setClearColor(16777215,0.5);if(S.clear(),Et)Le.render(X);let We=S.toneMapping;S.toneMapping=xn;let Je=k.viewport;if(k.viewport!==void 0)k.viewport=void 0;if(M.setupLightsView(k),ze===!0)ae.setGlobalState(S.clippingPlanes,k);if(St(v,X,k),G.updateMultisampleRenderTarget(ye),G.updateRenderTargetMipmap(ye),Oe.has("WEBGL_multisampled_render_to_texture")===!1){let Ee=!1;for(let ot=0,Ct=D.length;ot<Ct;ot++){let xt=D[ot],{object:mt,geometry:kt,material:Se,group:$t}=xt;if(Se.side===Xt&&mt.layers.test(k.layers)){let it=Se.side;Se.side=Wt,Se.needsUpdate=!0,zt(mt,X,k,kt,Se,$t),Se.side=it,Se.needsUpdate=!0,Ee=!0}}if(Ee===!0)G.updateMultisampleRenderTarget(ye),G.updateRenderTargetMipmap(ye)}if(S.setRenderTarget(ge,be,Ae),S.setClearColor(we,et),Je!==void 0)k.viewport=Je;S.toneMapping=We}function St(v,D,X){let k=D.isScene===!0?D.overrideMaterial:null;for(let H=0,ye=v.length;H<ye;H++){let Me=v[H],{object:ge,geometry:be,group:Ae}=Me,We=Me.material;if(We.allowOverride===!0&&k!==null)We=k;if(ge.layers.test(X.layers))zt(ge,D,X,be,We,Ae)}}function zt(v,D,X,k,H,ye){if(I!==null&&H.isNodeMaterial)I.setObject(v,H);if(v.onBeforeRender(S,D,X,k,H,ye),v.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),H.onBeforeRender(S,D,X,k,v,ye),H.transparent===!0&&H.side===Xt&&H.forceSinglePass===!1)H.side=Wt,H.needsUpdate=!0,S.renderBufferDirect(X,D,k,H,v,ye),H.side=ci,H.needsUpdate=!0,S.renderBufferDirect(X,D,k,H,v,ye),H.side=Xt;else S.renderBufferDirect(X,D,k,H,v,ye);v.onAfterRender(S,D,X,k,H,ye)}function tn(v,D,X){if(D.isScene!==!0)D=Ut;let k=L.get(v),H=M.state.lights,ye=M.state.shadowsArray,Me=H.state.version,ge=Q.getParameters(v,H.state,ye,D,X,M.state.lightProbeGridArray),be=Q.getProgramCacheKey(ge),Ae=k.programs;k.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?D.environment:null,k.fog=D.fog;let We=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;if(k.envMap=ie.get(v.envMap||k.environment,We),k.envMapRotation=k.environment!==null&&v.envMap===null?D.environmentRotation:v.envMapRotation,Ae===void 0)v.addEventListener("dispose",lt),Ae=new Map,k.programs=Ae;let Je=Ae.get(be);if(Je!==void 0){if(k.currentProgram===Je&&k.lightsStateVersion===Me)return ki(v,ge),Je}else{if(ge.uniforms=Q.getUniforms(v),I!==null&&v.isNodeMaterial)I.build(v,X,ge);v.onBeforeCompile(ge,S),Je=Q.acquireProgram(ge,be),Ae.set(be,Je),k.uniforms=ge.uniforms}let Ee=k.uniforms;if(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)Ee.clippingPlanes=ae.uniform;if(ki(v,ge),k.needsLights=Vu(v),k.lightsStateVersion=Me,k.needsLights)Ee.ambientLightColor.value=H.state.ambient,Ee.lightProbe.value=H.state.probe,Ee.sunLights.value=H.state.sun,Ee.sunLightShadows.value=H.state.sunShadow,Ee.directionalLights.value=H.state.directional,Ee.directionalLightShadows.value=H.state.directionalShadow,Ee.spotLights.value=H.state.spot,Ee.spotLightShadows.value=H.state.spotShadow,Ee.rectAreaLights.value=H.state.rectArea,Ee.ltc_1.value=H.state.rectAreaLTC1,Ee.ltc_2.value=H.state.rectAreaLTC2,Ee.pointLights.value=H.state.point,Ee.pointLightShadows.value=H.state.pointShadow,Ee.hemisphereLights.value=H.state.hemi,Ee.sunShadowMatrix.value=H.state.sunShadowMatrix,Ee.sunShadowCascade.value=H.state.sunShadowCascade,Ee.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ee.spotLightMatrix.value=H.state.spotLightMatrix,Ee.spotLightMap.value=H.state.spotLightMap,Ee.pointShadowMatrix.value=H.state.pointShadowMatrix;return k.lightProbeGrid=M.state.lightProbeGridArray.length>0,k.currentProgram=Je,k.uniformsList=null,Je}function zn(v){if(v.uniformsList===null){let D=v.currentProgram.getUniforms();v.uniformsList=Ks.seqWithValue(D.seq,v.uniforms)}return v.uniformsList}function ki(v,D){let X=L.get(v);X.outputColorSpace=D.outputColorSpace,X.batching=D.batching,X.batchingColor=D.batchingColor,X.instancing=D.instancing,X.instancingColor=D.instancingColor,X.instancingMorph=D.instancingMorph,X.skinning=D.skinning,X.morphTargets=D.morphTargets,X.morphNormals=D.morphNormals,X.morphColors=D.morphColors,X.morphTargetsCount=D.morphTargetsCount,X.numClippingPlanes=D.numClippingPlanes,X.numIntersection=D.numClipIntersection,X.vertexAlphas=D.vertexAlphas,X.vertexTangents=D.vertexTangents,X.toneMapping=D.toneMapping}function vi(v,D){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;T.setFromMatrixPosition(D.matrixWorld);for(let X=0,k=v.length;X<k;X++){let H=v[X];if(H.texture!==null&&H.boundingBox.containsPoint(T))return H}return null}function Ea(v,D,X,k,H){if(D.isScene!==!0)D=Ut;G.resetTextureUnits();let ye=D.fog,Me=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?D.environment:null,ge=V===null?S.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:je.workingColorSpace,be=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Ae=ie.get(k.envMap||Me,be),We=k.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Je=!!X.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Ee=!!X.morphAttributes.position,ot=!!X.morphAttributes.normal,Ct=!!X.morphAttributes.color,xt=xn;if(k.toneMapped){if(V===null||V.isXRRenderTarget===!0)xt=S.toneMapping}let mt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,kt=mt!==void 0?mt.length:0,Se=L.get(k),$t=M.state.lights;if(ze===!0){if(tt===!0||v!==q){let _t=v===q&&k.id===re;ae.setState(k,v,_t)}}let it=!1;if(k.version===Se.__version){if(Se.needsLights&&Se.lightsStateVersion!==$t.state.version)it=!0;else if(Se.outputColorSpace!==ge)it=!0;else if(H.isBatchedMesh&&Se.batching===!1)it=!0;else if(!H.isBatchedMesh&&Se.batching===!0)it=!0;else if(H.isBatchedMesh&&Se.batchingColor===!0&&H._colorsTexture===null)it=!0;else if(H.isBatchedMesh&&Se.batchingColor===!1&&H._colorsTexture!==null)it=!0;else if(H.isInstancedMesh&&Se.instancing===!1)it=!0;else if(!H.isInstancedMesh&&Se.instancing===!0)it=!0;else if(H.isSkinnedMesh&&Se.skinning===!1)it=!0;else if(!H.isSkinnedMesh&&Se.skinning===!0)it=!0;else if(H.isInstancedMesh&&Se.instancingColor===!0&&H.instanceColor===null)it=!0;else if(H.isInstancedMesh&&Se.instancingColor===!1&&H.instanceColor!==null)it=!0;else if(H.isInstancedMesh&&Se.instancingMorph===!0&&H.morphTexture===null)it=!0;else if(H.isInstancedMesh&&Se.instancingMorph===!1&&H.morphTexture!==null)it=!0;else if(Se.envMap!==Ae)it=!0;else if(k.fog===!0&&Se.fog!==ye)it=!0;else if(Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==ae.numPlanes||Se.numIntersection!==ae.numIntersection))it=!0;else if(Se.vertexAlphas!==We)it=!0;else if(Se.vertexTangents!==Je)it=!0;else if(Se.morphTargets!==Ee)it=!0;else if(Se.morphNormals!==ot)it=!0;else if(Se.morphColors!==Ct)it=!0;else if(Se.toneMapping!==xt)it=!0;else if(Se.morphTargetsCount!==kt)it=!0;else if(!!Se.lightProbeGrid!==M.state.lightProbeGridArray.length>0)it=!0}else it=!0,Se.__version=k.version;let ln=Se.currentProgram;if(it===!0){if(ln=tn(k,D,H),I&&k.isNodeMaterial)I.onUpdateProgram(k,ln,Se)}let Tn=!1,ti=!1,Hi=!1,ft=ln.getUniforms(),Tt=Se.uniforms;if(E.useProgram(ln.program))Tn=!0,ti=!0,Hi=!0;if(k.id!==re)re=k.id,ti=!0;if(Se.needsLights){let _t=vi(M.state.lightProbeGridArray,H);if(Se.lightProbeGrid!==_t)Se.lightProbeGrid=_t,ti=!0}if(Tn||q!==v){if(E.buffers.depth.getReversed()&&v.reversedDepth!==!0)v._reversedDepth=!0,v.updateProjectionMatrix();ft.setValue(N,"projectionMatrix",v.projectionMatrix),ft.setValue(N,"viewMatrix",v.matrixWorldInverse);let ii=ft.map.cameraPosition;if(ii!==void 0)ii.setValue(N,Rt.setFromMatrixPosition(v.matrixWorld));if($e.logarithmicDepthBuffer)ft.setValue(N,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2));if(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)ft.setValue(N,"isOrthographic",v.isOrthographicCamera===!0);if(q!==v)q=v,ti=!0,Hi=!0}if(Se.needsLights){if($t.state.sunShadowMap.length>0)ft.setValue(N,"sunShadowMap",$t.state.sunShadowMap,G);if($t.state.directionalShadowMap.length>0)ft.setValue(N,"directionalShadowMap",$t.state.directionalShadowMap,G);if($t.state.spotShadowMap.length>0)ft.setValue(N,"spotShadowMap",$t.state.spotShadowMap,G);if($t.state.pointShadowMap.length>0)ft.setValue(N,"pointShadowMap",$t.state.pointShadowMap,G)}if(H.isSkinnedMesh){ft.setOptional(N,H,"bindMatrix"),ft.setOptional(N,H,"bindMatrixInverse");let _t=H.skeleton;if(_t){if(_t.boneTexture===null)_t.computeBoneTexture();ft.setValue(N,"boneTexture",_t.boneTexture,G)}}if(H.isBatchedMesh){if(ft.setOptional(N,H,"batchingTexture"),ft.setValue(N,"batchingTexture",H._matricesTexture,G),ft.setOptional(N,H,"batchingIdTexture"),ft.setValue(N,"batchingIdTexture",H._indirectTexture,G),ft.setOptional(N,H,"batchingColorTexture"),H._colorsTexture!==null)ft.setValue(N,"batchingColorTexture",H._colorsTexture,G)}let ni=X.morphAttributes;if(ni.position!==void 0||ni.normal!==void 0||ni.color!==void 0)Qe.update(H,X,ln);if(ti||Se.receiveShadow!==H.receiveShadow)Se.receiveShadow=H.receiveShadow,ft.setValue(N,"receiveShadow",H.receiveShadow);if((k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&D.environment!==null)Tt.envMapIntensity.value=D.environmentIntensity;if(Tt.dfgLUT!==void 0)Tt.dfgLUT.value=m0();if(ti){if(ft.setValue(N,"toneMappingExposure",S.toneMappingExposure),Se.needsLights)Gu(Tt,Hi);if(ye&&k.fog===!0)me.refreshFogUniforms(Tt,ye);if(me.refreshMaterialUniforms(Tt,k,se,Z,M.state.transmissionRenderTarget[v.id]),Se.needsLights&&Se.lightProbeGrid){let _t=Se.lightProbeGrid;Tt.probesSH.value=_t.texture,Tt.probesMin.value.copy(_t.boundingBox.min),Tt.probesMax.value.copy(_t.boundingBox.max),Tt.probesResolution.value.copy(_t.resolution)}Ks.upload(N,zn(Se),Tt,G)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0)Ks.upload(N,zn(Se),Tt,G),k.uniformsNeedUpdate=!1;if(k.isSpriteMaterial)ft.setValue(N,"center",H.center);if(ft.setValue(N,"modelViewMatrix",H.modelViewMatrix),ft.setValue(N,"normalMatrix",H.normalMatrix),ft.setValue(N,"modelMatrix",H.matrixWorld),k.uniformsGroups!==void 0){let _t=k.uniformsGroups;for(let ii=0,Gi=_t.length;ii<Gi;ii++){let jl=_t[ii];j.update(jl,ln),j.bind(jl,ln)}}return ln}function Gu(v,D){v.ambientLightColor.needsUpdate=D,v.lightProbe.needsUpdate=D,v.sunLights.needsUpdate=D,v.sunLightShadows.needsUpdate=D,v.directionalLights.needsUpdate=D,v.directionalLightShadows.needsUpdate=D,v.pointLights.needsUpdate=D,v.pointLightShadows.needsUpdate=D,v.spotLights.needsUpdate=D,v.spotLightShadows.needsUpdate=D,v.rectAreaLights.needsUpdate=D,v.hemisphereLights.needsUpdate=D}function Vu(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(v,D,X){let k=L.get(v);if(k.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1)k.__useRenderToTexture=!1;L.get(v.texture).__webglTexture=D,L.get(v.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:X,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,D){let X=L.get(v);X.__webglFramebuffer=D,X.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(v,D=0,X=0){V=v,W=D,ee=X;let k=null,H=!1,ye=!1;if(v){let ge=L.get(v);if(ge.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(N.FRAMEBUFFER,ge.__webglFramebuffer),te.copy(v.viewport),ne.copy(v.scissor),Pe=v.scissorTest,E.viewport(te),E.scissor(ne),E.setScissorTest(Pe),re=-1;return}else if(ge.__webglFramebuffer===void 0)G.setupRenderTarget(v);else if(ge.__hasExternalTextures)G.rebindTextures(v,L.get(v.texture).__webglTexture,L.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let We=v.depthTexture;if(ge.__boundDepthTexture!==We){if(We!==null&&L.has(We)&&(v.width!==We.image.width||v.height!==We.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");G.setupDepthRenderbuffer(v)}}let be=v.texture;if(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)ye=!0;let Ae=L.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget){if(Array.isArray(Ae[D]))k=Ae[D][X];else k=Ae[D];H=!0}else if(v.samples>0&&G.useMultisampledRTT(v)===!1)k=L.get(v).__webglMultisampledFramebuffer;else if(Array.isArray(Ae))k=Ae[X];else k=Ae;te.copy(v.viewport),ne.copy(v.scissor),Pe=v.scissorTest}else te.copy(xe).multiplyScalar(se).floor(),ne.copy(ve).multiplyScalar(se).floor(),Pe=rt;if(X!==0)k=F;if(E.bindFramebuffer(N.FRAMEBUFFER,k))E.drawBuffers(v,k);if(E.viewport(te),E.scissor(ne),E.setScissorTest(Pe),H){let ge=L.get(v.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+D,ge.__webglTexture,X)}else if(ye){let ge=D;for(let be=0;be<v.textures.length;be++){let Ae=L.get(v.textures[be]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+be,Ae.__webglTexture,X,ge)}}else if(v!==null&&X!==0){let ge=L.get(v.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ge.__webglTexture,X)}re=-1};function Kl(v){let D=L.get(v);if(D.__readFormat!==v.format||D.__readType!==v.type)D.__readFormat=v.format,D.__readType=v.type,D.__formatReadable=$e.textureFormatReadable(v.format),D.__typeReadable=$e.textureTypeReadable(v.type);return D}if(this.readRenderTargetPixels=function(v,D,X,k,H,ye,Me,ge=0){if(!(v&&v.isWebGLRenderTarget)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=L.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Me!==void 0)be=be[Me];if(be){E.bindFramebuffer(N.FRAMEBUFFER,be);try{let Ae=v.textures[ge],{format:We,type:Je}=Ae;if(v.textures.length>1)N.readBuffer(N.COLOR_ATTACHMENT0+ge);let Ee=Kl(Ae);if(Ee.__formatReadable===!1){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ee.__typeReadable===!1){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(D>=0&&D<=v.width-k&&(X>=0&&X<=v.height-H))N.readPixels(D,X,k,H,K.convert(We),K.convert(Je),ye)}finally{let Ae=V!==null?L.get(V).__webglFramebuffer:null;E.bindFramebuffer(N.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(v,D,X,k,H,ye,Me,ge=0){if(!(v&&v.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=L.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Me!==void 0)be=be[Me];if(be)if(D>=0&&D<=v.width-k&&(X>=0&&X<=v.height-H)){E.bindFramebuffer(N.FRAMEBUFFER,be);let Ae=v.textures[ge],{format:We,type:Je}=Ae;if(v.textures.length>1)N.readBuffer(N.COLOR_ATTACHMENT0+ge);let Ee=Kl(Ae);if(Ee.__formatReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ee.__typeReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ot=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,ot),N.bufferData(N.PIXEL_PACK_BUFFER,ye.byteLength,N.STREAM_READ),N.readPixels(D,X,k,H,K.convert(We),K.convert(Je),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);let Ct=V!==null?L.get(V).__webglFramebuffer:null;E.bindFramebuffer(N.FRAMEBUFFER,Ct);let xt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await wh(N,xt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,ot),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ye),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(ot),N.deleteSync(xt),ye}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,D=null,X=0){let k=Math.pow(2,-X),H=Math.floor(v.image.width*k),ye=Math.floor(v.image.height*k),Me=D!==null?D.x:0,ge=D!==null?D.y:0;G.setTexture2D(v,0),N.copyTexSubImage2D(N.TEXTURE_2D,X,0,0,Me,ge,H,ye),E.unbindTexture()},this.copyTextureToTexture=function(v,D,X=null,k=null,H=0,ye=0){let Me,ge,be,Ae,We,Je,Ee,ot,Ct,xt=v.isCompressedTexture?v.mipmaps[ye]:v.image;if(X!==null)Me=X.max.x-X.min.x,ge=X.max.y-X.min.y,be=X.isBox3?X.max.z-X.min.z:1,Ae=X.min.x,We=X.min.y,Je=X.isBox3?X.min.z:0;else{let Tt=Math.pow(2,-H);if(Me=Math.floor(xt.width*Tt),ge=Math.floor(xt.height*Tt),v.isDataArrayTexture)be=xt.depth;else if(v.isData3DTexture)be=Math.floor(xt.depth*Tt);else be=1;Ae=0,We=0,Je=0}if(k!==null)Ee=k.x,ot=k.y,Ct=k.z;else Ee=0,ot=0,Ct=0;let mt=K.convert(D.format),kt=K.convert(D.type),Se;if(D.isData3DTexture)G.setTexture3D(D,0),Se=N.TEXTURE_3D;else if(D.isDataArrayTexture||D.isCompressedArrayTexture)G.setTexture2DArray(D,0),Se=N.TEXTURE_2D_ARRAY;else G.setTexture2D(D,0),Se=N.TEXTURE_2D;E.activeTexture(N.TEXTURE0),E.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,D.flipY),E.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),E.pixelStorei(N.UNPACK_ALIGNMENT,D.unpackAlignment);let $t=E.getParameter(N.UNPACK_ROW_LENGTH),it=E.getParameter(N.UNPACK_IMAGE_HEIGHT),ln=E.getParameter(N.UNPACK_SKIP_PIXELS),Tn=E.getParameter(N.UNPACK_SKIP_ROWS),ti=E.getParameter(N.UNPACK_SKIP_IMAGES);E.pixelStorei(N.UNPACK_ROW_LENGTH,xt.width),E.pixelStorei(N.UNPACK_IMAGE_HEIGHT,xt.height),E.pixelStorei(N.UNPACK_SKIP_PIXELS,Ae),E.pixelStorei(N.UNPACK_SKIP_ROWS,We),E.pixelStorei(N.UNPACK_SKIP_IMAGES,Je);let Hi=v.isDataArrayTexture||v.isData3DTexture,ft=D.isDataArrayTexture||D.isData3DTexture;if(v.isDepthTexture){let Tt=L.get(v),ni=L.get(D),_t=L.get(Tt.__renderTarget),ii=L.get(ni.__renderTarget);E.bindFramebuffer(N.READ_FRAMEBUFFER,_t.__webglFramebuffer),E.bindFramebuffer(N.DRAW_FRAMEBUFFER,ii.__webglFramebuffer);for(let Gi=0;Gi<be;Gi++){if(Hi)N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,L.get(v).__webglTexture,H,Je+Gi),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,L.get(D).__webglTexture,ye,Ct+Gi);N.blitFramebuffer(Ae,We,Me,ge,Ee,ot,Me,ge,N.DEPTH_BUFFER_BIT,N.NEAREST)}E.bindFramebuffer(N.READ_FRAMEBUFFER,null),E.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(H!==0||v.isRenderTargetTexture||L.has(v)){let Tt=L.get(v),ni=L.get(D);E.bindFramebuffer(N.READ_FRAMEBUFFER,J),E.bindFramebuffer(N.DRAW_FRAMEBUFFER,P);for(let _t=0;_t<be;_t++){if(Hi)N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Tt.__webglTexture,H,Je+_t);else N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Tt.__webglTexture,H);if(ft)N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ni.__webglTexture,ye,Ct+_t);else N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ni.__webglTexture,ye);if(H!==0)N.blitFramebuffer(Ae,We,Me,ge,Ee,ot,Me,ge,N.COLOR_BUFFER_BIT,N.NEAREST);else if(ft)N.copyTexSubImage3D(Se,ye,Ee,ot,Ct+_t,Ae,We,Me,ge);else N.copyTexSubImage2D(Se,ye,Ee,ot,Ae,We,Me,ge)}E.bindFramebuffer(N.READ_FRAMEBUFFER,null),E.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(ft)if(v.isDataTexture||v.isData3DTexture)N.texSubImage3D(Se,ye,Ee,ot,Ct,Me,ge,be,mt,kt,xt.data);else if(D.isCompressedArrayTexture)N.compressedTexSubImage3D(Se,ye,Ee,ot,Ct,Me,ge,be,mt,xt.data);else N.texSubImage3D(Se,ye,Ee,ot,Ct,Me,ge,be,mt,kt,xt);else if(v.isDataTexture)N.texSubImage2D(N.TEXTURE_2D,ye,Ee,ot,Me,ge,mt,kt,xt.data);else if(v.isCompressedTexture)N.compressedTexSubImage2D(N.TEXTURE_2D,ye,Ee,ot,xt.width,xt.height,mt,xt.data);else N.texSubImage2D(N.TEXTURE_2D,ye,Ee,ot,Me,ge,mt,kt,xt);if(E.pixelStorei(N.UNPACK_ROW_LENGTH,$t),E.pixelStorei(N.UNPACK_IMAGE_HEIGHT,it),E.pixelStorei(N.UNPACK_SKIP_PIXELS,ln),E.pixelStorei(N.UNPACK_SKIP_ROWS,Tn),E.pixelStorei(N.UNPACK_SKIP_IMAGES,ti),ye===0&&D.generateMipmaps)N.generateMipmap(Se);E.unbindTexture()},this.initRenderTarget=function(v){if(L.get(v).__webglFramebuffer===void 0)G.setupRenderTarget(v)},this.initTexture=function(v){if(v.isCubeTexture)G.setTextureCube(v,0);else if(v.isData3DTexture)G.setTexture3D(v,0);else if(v.isDataArrayTexture||v.isCompressedArrayTexture)G.setTexture2DArray(v,0);else G.setTexture2D(v,0);E.unbindTexture()},this.resetState=function(){W=0,ee=0,V=null,E.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Jo}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}var vt=Object.freeze({x:1500,y:1500,depth:50}),g0=Object.freeze({x:750,y:700,depth:25}),xu=Object.freeze({x:1040,y:930,depth:0}),Fl=Object.freeze({lengthX:420,lengthY:460,lengthDepth:9,logVariance:0.46,noiseVariance:0.055,logPriorMean:Math.log(1.7),radius:220,depthStep:5,directions:8,meanWeight:1,varianceWeight:1,distanceScale:300}),Sn=(e)=>e*e,mu=({x:e,y:t,depth:n})=>({x:e,y:t,depth:n}),oa=(e)=>e.x>=0&&e.x<=vt.x&&e.y>=0&&e.y<=vt.y&&e.depth>=0&&e.depth<=vt.depth;function ms(e,t){if(!e.length||!Number.isFinite(t))throw Error("A finite progress and nonempty path are required");let n=Math.min(1,Math.max(0,t))*(e.length-1),i=Math.floor(n),s=Math.min(i+1,e.length-1),r=n-i;return Object.fromEntries(["x","y","depth"].map((a)=>[a,e[i][a]+r*(e[s][a]-e[i][a])]))}var js=[0.25,0.75].map((e)=>Array.from({length:49},(t,n)=>{let i=n/48;return{x:e*vt.x,y:i*vt.y,depth:vt.depth*(1-Math.cos(4*Math.PI*i))/2}}));function Ol(e){let t=1.4/(1+Math.exp(-(e.depth-18)/4)),n=3.7*Math.exp(-0.5*(Sn((e.x-1010)/310)+Sn((e.y-910)/360)+Sn((e.depth-33)/9))),i=1.3*Math.exp(-0.5*(Sn((e.x-370)/260)+Sn((e.y-520)/300)+Sn((e.depth-16)/7)));return 0.22+t+n+i}function _0(){let e=1303,t=()=>(e=Math.imul(e,1664525)+1013904223>>>0)/4294967296,n=[];while(n.length<260){let i={x:t()*vt.x,y:t()*vt.y,depth:t()*vt.depth},s=Ol(i);if(t()<s/7)n.push({...i,value:s})}return n}var yu=_0();function gu(e,t){let n=Fl;return n.logVariance*Math.exp(-0.5*(Sn((e.x-t.x)/n.lengthX)+Sn((e.y-t.y)/n.lengthY)+Sn((e.depth-t.depth)/n.lengthDepth)))}function x0(e){let t=e.length,n=Array.from({length:t},()=>new Float64Array(t));for(let i=0;i<t;i++)for(let s=0;s<=i;s++){let r=e[i][s];for(let a=0;a<s;a++)r-=n[i][a]*n[s][a];if(i===s){if(!(r>0))throw Error("GP covariance is not positive definite");n[i][s]=Math.sqrt(r)}else n[i][s]=r/n[s][s]}return n}function _u(e,t){let n=new Float64Array(t.length);for(let i=0;i<t.length;i++){let s=t[i];for(let r=0;r<i;r++)s-=e[i][r]*n[r];n[i]=s/e[i][i]}return n}function y0(e){let t=Fl;for(let a of e)if(!oa(a)||!(a.value>0)||!Number.isFinite(a.value))throw Error("Observations need bounded positions and positive finite values");let n=e.map((a,o)=>e.map((l,c)=>gu(a,l)+(o===c?t.noiseVariance:0))),i=x0(n),s=e.map((a)=>Math.log(a.value)-t.logPriorMean),r=_u(i,s);return(a)=>{let o=_u(i,e.map((h)=>gu(a,h))),{logPriorMean:l,logVariance:c}=t;for(let h=0;h<o.length;h++)l+=o[h]*r[h],c-=Sn(o[h]);if(c<-0.000000001)throw Error("Invalid negative GP predictive variance");c=Math.max(0,c);let d=Math.exp(l+c/2),f=d*d*Math.expm1(c);return{mean:d,variance:f}}}var v0=Array.from({length:405},(e,t)=>({x:t%9*vt.x/8,y:Math.floor(t/9)%9*vt.y/8,depth:5+Math.floor(t/81)*10}));function vu(e,t,n){if(!oa(e)||!oa(t))throw Error("Vehicle positions must be inside the teaching domain");let i=Fl,s=y0(n),r=[];for(let d=-1;d<=1;d++)for(let f=0;f<i.directions;f++){let h=f*2*Math.PI/i.directions,m={x:e.x+i.radius*Math.cos(h),y:e.y+i.radius*Math.sin(h),depth:e.depth+d*i.depthStep};if(!oa(m))continue;let x=Math.hypot(m.x-t.x,m.y-t.y);if(x===0)continue;let{mean:b,variance:p}=s(m),u=i.meanWeight*b,w=i.varianceWeight*p,T=Sn(i.distanceScale/x);r.push({id:`depth${d+1}-bearing${f}`,...m,mean:b,variance:p,meanTerm:u,varianceTerm:w,penalty:T,score:u+w-T})}if(!r.length)throw Error("No feasible candidates");let a=r.reduce((d,f)=>f.score>d.score?f:d),o=(d)=>r.reduce((f,h)=>d(h)>d(f)?h:f),l=[o((d)=>d.mean),o((d)=>d.variance),o((d)=>-d.penalty),...r],c=[];for(let d of l){if(d!==a&&!c.includes(d))c.push(d);if(c.length===2)break}return c.push(a),{position:mu(e),otherLast:mu(t),observations:n.map((d)=>({...d})),candidates:r,winner:a,compare:c,field:v0.map((d)=>({...d,...s(d)}))}}var Su=js.flatMap((e)=>e.filter((t,n)=>n%4===0).map((t)=>({...t,value:Ol(t)}))),la=vu(g0,xu,Su),S0=[0.25,0.5,0.75,1].map((e)=>{let t=ms([la.position,la.winner],e);return{...t,value:Ol(t)}}),M0=vu(la.winner,xu,[...Su,...S0]),Ke={before:la,after:M0};var _i=0.000005;function Bl(e){let[t,n]=e>=1?["m",1]:e>=0.01?["cm",0.01]:e>=0.001?["mm",0.001]:["µm",0.000001];return`${Number((e/n).toPrecision(4))} ${t}`}function ca(e,t,n=null){if(!(e>0)||!Number.isFinite(e)||!(t>0))throw Error("A positive finite projection scale and viewport width are required");if(n!==null){if(!(n>0)||!Number.isFinite(n))throw Error("Invalid prescribed scale length");return{barMeters:n,barPixels:n*e,pixelsPerMeter:e,label:Bl(n)}}let s=Math.max(1,Math.min(112,t*0.23))/e,r=Math.floor(Math.log10(s)),a=[-1,0,1].flatMap((d)=>[1,2,5].map((f)=>f*10**(r+d))),o=Math.max(1,Math.min(150,t*0.36)),c=a.filter((d)=>d*e<=o).reduce((d,f)=>Math.abs(Math.log(f/s))<Math.abs(Math.log(d/s))?f:d);return{barMeters:c,barPixels:c*e,pixelsPerMeter:e,label:Bl(c)}}function Mu(e){let t=document.createElement("div");t.className="scene-scale-hud",Object.assign(t.style,{position:"absolute",right:"12px",bottom:"12px",zIndex:"5",pointerEvents:"none",color:"#ecf1e8",background:"rgba(5,19,27,.93)",padding:"8px 10px",borderRadius:"2px",maxWidth:"166px",fontFamily:"inherit",fontSize:"12px",lineHeight:"1.4"});let n=document.createElement("div");Object.assign(n.style,{fontSize:"15px",fontWeight:"600",marginTop:"2px"});let i=document.createElement("div");i.className="scene-scale-bar",Object.assign(i.style,{position:"relative",height:"8px",marginTop:"5px",borderTop:"2px solid #ebd2a0",boxSizing:"border-box"});for(let s of["left","right"]){let r=document.createElement("span");Object.assign(r.style,{position:"absolute",top:"-2px",[s]:"0",height:"7px",width:"2px",background:"#ebd2a0"}),i.appendChild(r)}return t.append(n,i),e.appendChild(t),{update(s,{hidden:r=!1,detailText:a=""}={}){t.style.display=r?"none":"block";let o=s.mode==="macro-horizontal"?"水平比例尺":s.mode==="uniform-depth"?"深度比例尺（未放大）":s.markerSymbol?"背景比例尺":"均一比例尺";n.textContent=Bl(s.barMeters),i.style.width=`${s.barPixels}px`,i.dataset.meters=String(s.barMeters),i.dataset.pixelsPerMeter=String(s.pixelsPerMeter),t.dataset.scaleMode=s.mode,t.setAttribute("aria-label",`${o} ${n.textContent}。${a}`)},hide(){t.style.display="none"},dispose(){t.remove()}}}var At=0.000001,zl=_i/At/2,kl=(e)=>Math.max(0,Math.min(1,e)),Eu=(e)=>{let t=kl(e);return t*t*(3-2*t)},Qs=(e,t,n)=>Eu((n-e)/(t-e)),ha=(e,t,n)=>e*(t/e)**Eu(n),b0=new C(12,9.5,15).normalize();function Hl(e){let t=kl(e)*20,n;if(t<=4)n=0.0001;else if(t<=8)n=ha(0.0001,0.0005,(t-4)/4);else if(t<=9)n=0.0005;else if(t<=15)n=ha(0.0005,2,(t-9)/6);else if(t<=16.5)n=ha(2,80,(t-15)/1.5);else if(t<=17.5)n=80;else n=ha(80,1500,(t-17.5)/0.9);let i=t<1?"scattered-cells":t<3.5?"cells-converging":t<4?"large-formed-glow":t<15?"shrinking-glow-water-volume":t<17.5?"water-at-25m":t<18.4?"uniform-sea-extent":"macro-data-view",s=Qs(2,3.5,t),r=Qs(1,3.5,t);return{seconds:t,viewHeightMeters:n,zoomStage:i,macro:t>=18.4,markerReady:t>=2,markerAlpha:s,gatherProgress:r,cellOpacity:1-s,preferredBarMeters:t<=4?0.00002:t>=8&&t<=9?0.0001:null,switching:t>18.25&&t<18.75,switchOpacity:t<18.4?Qs(18.25,18.4,t):1-Qs(18.4,18.75,t)}}function E0(e,t,n){let i=Math.max(20,Math.min(320,t*0.66,n*0.7)),s=kl(Math.log(Math.max(0.0001,e)/0.0001)/Math.log(15000000));return i*(20/i)**s}function ua(e,t=0.5,n=6985635){return new hs(new bt().setFromPoints(e),new pi({color:n,transparent:!0,opacity:t,depthWrite:!1}))}function bu(e,t){let r=new Float32Array(1026),a=new Float32Array(r.length),o=[];for(let h=0;h<56;h++)for(let m=0;m<5;m++){let x=h*6+m,b=x+5+1;o.push(x,b,x+1,b,b+1,x+1)}let l=new bt;l.setAttribute("position",new Jt(r,3)),l.setAttribute("normal",new Jt(a,3)),l.setIndex(o);let c=new Ze(l,new Dn({color:12830113,roughness:0.48,metalness:0,transparent:!0,opacity:0.72})),d=e.map((h)=>new C(...h));function f(h){let m=d.map((b,p)=>b.clone().add(new C(p?0.13*(p/d.length)*Math.sin(h*1.35+p*0.82+t):0,p?0.07*Math.sin(h*1.35+p*0.7+t):0,p?0.08*Math.sin(h*1.35+p*0.9+t):0))),x=new jr(m);for(let b=0;b<=56;b++){let p=b/56,u=x.getPoint(p),w=x.getTangent(p).normalize(),T=new C().crossVectors(w,new C(0,0,1)).normalize(),y=new C().crossVectors(w,T).normalize(),M=0.026*(1-0.6*p);for(let R=0;R<=5;R++){let A=R/5*Math.PI*2,g=T.clone().multiplyScalar(Math.cos(A)).addScaledVector(y,Math.sin(A)),S=u.clone().addScaledVector(g,M),B=(b*6+R)*3;S.toArray(r,B),g.toArray(a,B)}}l.attributes.position.needsUpdate=!0,l.attributes.normal.needsUpdate=!0,l.computeBoundingSphere()}return f(0),{mesh:c,update:f}}function w0(){let e=new Pt,t=new Nn(zl,56,40),n=new Ze(t,new Ys({color:11120235,roughness:0.4,metalness:0,transparent:!0,opacity:0.17,side:Wt,depthWrite:!1}));n.renderOrder=1,e.add(n);let i=new Ze(t,new Ys({color:12894602,roughness:0.22,metalness:0,transparent:!0,opacity:0.31,clearcoat:1,clearcoatRoughness:0.18,side:ci,depthWrite:!1}));i.name="five-micrometre-cell-body",i.renderOrder=4,e.add(i);let s=new Dn({color:9344338,roughness:0.42,metalness:0,transparent:!0,opacity:0.92}),r=new Nn(1,32,24);for(let[c,d,f,h]of[[-0.9,0.02,0.13,-0.26],[0.84,-0.12,-0.24,0.3]]){let m=new Ze(r,s);m.position.set(c,d,f),m.scale.set(0.67,1.65,0.77),m.rotation.z=h,m.renderOrder=2,e.add(m);let x=new Ze(new Nn(1,24,16),new Dn({color:11839840,roughness:0.55,metalness:0,transparent:!0,opacity:0.8}));x.position.set(c*0.94,d+0.05,f+0.49),x.scale.set(0.37,1.36,0.23),x.rotation.z=h,x.renderOrder=3,e.add(x)}let a=new Nn(1,12,8),o=new Dn({color:13942130,roughness:0.65,metalness:0});for(let c=0;c<8;c++){let d=c*2.399963,f=new Ze(a,o);f.position.set(0.33*Math.sin(d),-1.43+c*0.38,0.55+0.2*Math.cos(d)),f.scale.setScalar(0.07+0.025*(c%3)),f.renderOrder=3,e.add(f)}let l=[bu([[0.72,2.27,0.75],[1.15,2.95,0.8],[2.35,3.45,0.55],[3.4,3.25,0.12],[4.15,2.5,-0.1],[4,1.8,-0.2]],0),bu([[-0.18,2.38,0.74],[-0.68,3.18,0.7],[-1.9,3.95,0.4],[-3.2,3.8,-0.1],[-3.85,3.15,-0.3]],1.1)];return l.forEach((c)=>{c.mesh.renderOrder=5,e.add(c.mesh)}),{cell:e,body:i,flagella:l}}function wu(){let e=new cs,t=new Kn(-8,8,5,-5,0.01,100);e.add(new us(15854808,1457218,2));let n=new gi(16772546,3.3);n.position.set(-6,9,12),e.add(n);let i=new gi(12113354,2.1);i.position.set(8,3,-4),e.add(i);let s=w0();s.cell.position.set(0,-0.55,0),e.add(s.cell);let r=[[10,7,-4],[-11,10,3],[16,-10,-6],[-17,-13,4],[2,22,5],[26,18,-5],[-29,17,-4],[31,-23,-2],[9,-29,3],[-29,-28,6],[30,31,0]].map((u,w)=>{let T=s.cell.clone(!0);return T.position.set(...u),T.rotation.set(0.1*Math.sin(w),0.36*w,-0.2+0.13*(w%4)),e.add(T),T}),a=[s.cell,...r],o=a.map((u)=>u.position.clone()),l=new Map;s.cell.traverse((u)=>{if(!u.material)return;let w=u.material;if(!l.has(w))l.set(w,{opacity:w.opacity,depthWrite:w.depthWrite});w.transparent=!0});let c=new Pt,d=new Ze(new Ln(1500/At,1500/At),new on({color:4219504,transparent:!0,opacity:0.12,side:Xt,depthWrite:!1}));d.rotation.x=-Math.PI/2,d.position.y=25/At,c.add(d);let f=new C(0,25/At,0),h=new C,m=new C(15,0,-12).normalize(),x=new C(12,0,15).normalize();for(let[u,w]of[-34,-5,27].entries())for(let[T,y]of[-54,-37,-21,23,39,56].entries()){let M=5+(u*3+T)%4*1.1,R=Array.from({length:13},(g,S)=>{let B=S/12,I=y+(B-0.5)*M,F=w+0.48*Math.sin(B*Math.PI*1.3+T*0.6);return f.clone().addScaledVector(m,I/At).addScaledVector(x,F/At)}),A=ua(R,0.26+0.025*((u+T)%3),8034464);A.name=`surface-wavelet-${u}-${T}`,A.renderOrder=1,c.add(A)}c.add(ua([f,h],0.72,11981013));for(let u of[0,25/At])c.add(ua([new C(-1/At,u,0),new C(1/At,u,0)],0.8,12899274));c.add(ua([new C(-750/At,f.y,-750/At),new C(750/At,f.y,-750/At),new C(750/At,f.y,750/At)],0.32)),e.add(c);let b=null;function p(u,w,T){let y=Hl(u),M=y.viewHeightMeters/At,R=w/T;t.left=-M*R/2,t.right=M*R/2,t.top=M/2,t.bottom=-M/2,t.near=Math.max(0.001,M*0.0000001),t.far=M*8;let A=Qs(15,16.5,y.seconds),g=new C(0,0,1).lerp(b0,A).normalize(),S=new C(0,0.1*(1-A),0);t.position.copy(S).addScaledVector(g,M*3),t.lookAt(S),t.updateProjectionMatrix(),t.updateMatrixWorld(!0);let B=(t.right-t.left)/t.zoom*At,I=w/B,F=_i*I,J=F>=1&&y.cellOpacity>0.001;l.forEach((_e,xe)=>{xe.opacity=_e.opacity*y.cellOpacity,xe.depthWrite=_e.depthWrite&&y.cellOpacity>0.99});let P=1-0.77*y.gatherProgress;if(a.forEach((_e,xe)=>{_e.visible=J,_e.position.copy(o[xe]).multiplyScalar(P)}),s.cell.rotation.y=0.16*Math.sin(y.seconds*0.23),s.cell.rotation.z=0.035*Math.sin(y.seconds*0.31),J)s.flagella.forEach((_e)=>_e.update(y.seconds));c.visible=y.seconds>=15&&y.viewHeightMeters>=60,e.updateMatrixWorld(!0);let W=new C().setFromMatrixColumn(t.matrixWorld,0).normalize(),ee=s.body.getWorldPosition(new C),V=s.body.getWorldScale(new C),re=ee.clone().addScaledVector(W,zl).project(t),q=ee.clone().addScaledVector(W,-zl).project(t),te=Math.hypot((re.x-q.x)*w/2,(re.y-q.y)*T/2),ne=(_e)=>{let xe=_e.clone().project(t);return{x:(xe.x+1)*w/2,y:(1-xe.y)*T/2,visible:xe.z>=-1&&xe.z<=1&&Math.abs(xe.x)<0.96&&Math.abs(xe.y)<0.9}},Pe=ne(f),we=ne(h),et=Math.hypot(Pe.x-we.x,Pe.y-we.y),Fe=y.seconds>=15,Z=Fe?et/25:I,se=J?[s.cell,...r].filter((_e)=>{let xe=ne(_e.getWorldPosition(new C)),ve=F/2;return xe.visible&&xe.x-ve>=0&&xe.x+ve<=w&&xe.y-ve>=0&&xe.y+ve<=T}).length:0,ce=Math.sqrt(a.reduce((_e,xe)=>_e+xe.position.lengthSq(),0)/a.length)*At;return b={...y,aggregation:{progress:y.gatherProgress,spreadFactor:P,clusterRmsRadiusMeters:ce,conceptual:!0},scale:{mode:Fe?"uniform-depth":"uniform",cellDiameterMeters:_i,viewWidthMeters:B,...ca(Z,w,y.preferredBarMeters),cellDiameterPixels:F,viewPlanePixelsPerMeter:I,projectedDepthPixels:et,depthMeters:25,calibrationAxis:Fe?"projected-depth-line":"camera-right",projectedCellDiameterPixels:te,cellVisible:J,visibleCellCount:se,cellOpacity:y.cellOpacity,markerSymbol:y.markerAlpha>0,bodyScaleExact:[V.x,V.y,V.z].every((_e)=>Math.abs(_e-1)<0.000000000001),geometryDiameterMeters:s.body.geometry.parameters.radius*2*At},location:{depthMeters:25,illustrative:!0,tracksIndividual:!1},marker:{ready:y.markerReady,visible:y.markerAlpha>0.001,alpha:y.markerAlpha,opacity:y.markerAlpha,diameterPixels:E0(y.viewHeightMeters,w,T),anchor:{x:we.x,y:we.y},physicalSize:!1},anchors:{surface:Pe,location:we,depth:ne(new C(0,12.5/At,0))}},b}return{scene:e,camera:t,update:p,getDiagnostics:()=>b,dispose(){let u=new Set,w=new Set;e.traverse((T)=>{if(T.geometry)u.add(T.geometry);if(T.material)(Array.isArray(T.material)?T.material:[T.material]).forEach((y)=>w.add(y))}),u.forEach((T)=>T.dispose()),w.forEach((T)=>T.dispose())}}}var xi=10.8/vt.x,Pu=12,jn=xi*Pu,ht={ink:15200495,cyan:7721435,amber:15517837,green:10930594,sea:1521732,quiet:5468027,dark:729132,routeA:16756855,routeB:5948671},gs=(e)=>Math.max(0,Math.min(1,e)),Lu=(e)=>{let t=gs(e);return t*t*(3-2*t)},fn=(e,t,n)=>Lu((n-e)/(t-e)),pt=(e)=>new C((e.x-vt.x/2)*xi,-e.depth*jn,(e.y-vt.y/2)*xi),Gl=(e,t,n)=>({x:e.x+(t.x-e.x)*n,y:e.y+(t.y-e.y)*n,depth:e.depth+(t.depth-e.depth)*n}),T0=new C(12,9.5,15).normalize();function Tu(e={}){let t=Math.max(0,Math.min(8,Math.trunc(Number(e.phase)||0))),n=gs(Number(e.progress)||0),i=Math.max(0,Number(e.time)||0),s=t>7||t===7&&n>=0.8;return{phase:t,progress:n,time:i,snapshot:s?"after":"before",pilotProgress:t<3?0:t===3?0.92*Lu(n):t===4?0.92+0.08*fn(0,0.36,n):1,focus:0,travel:t===7?fn(0,0.68,n):t>7?1:0,arrived:t>7||t===7&&n>=0.68,newMeasurements:s,winnerVisible:t===6&&n>=0.72||t===7&&n<0.8,contextOpacity:t===5?fn(0.06,0.29,n):1,conceptualDistribution:t>=1}}function Mn(e,t=ht.quiet,n=1,i=!1){let s=new bt().setFromPoints(e),r=i?new Qr({color:t,transparent:!0,opacity:n,dashSize:0.1,gapSize:0.1,depthWrite:!1}):new pi({color:t,transparent:!0,opacity:n,depthWrite:!1}),a=new hs(s,r);if(i)a.computeLineDistances();return a}function da(e,t){let n=e.geometry.attributes.position;if(t.forEach((i,s)=>n.setXYZ(s,i.x,i.y,i.z)),n.needsUpdate=!0,e.geometry.computeBoundingSphere(),e.isLine&&e.material.isLineDashedMaterial)e.computeLineDistances()}function Nu(e,t,n,i=0.4,s=new C,r=64){return Mn(Array.from({length:r+1},(a,o)=>{let l=o/r*Math.PI*2;return new C(s.x+e*Math.cos(l),t,s.z+e*Math.sin(l))}),n,i)}function On(e,t={}){return new Dn({color:e,roughness:0.48,metalness:0.18,transparent:!0,...t})}function Au(e){let t=new Pt,n=On(13359321),i=On(e,{roughness:0.34,metalness:0.28}),s=On(2441290,{roughness:0.6}),a=new Ze(new Xs([[0,-0.67],[0.06,-0.61],[0.115,-0.43],[0.132,-0.2],[0.132,0.29],[0.112,0.44],[0.065,0.56],[0,0.61]].map(([d,f])=>new Be(d,f)),32),n);a.rotation.z=-Math.PI/2,t.add(a);for(let d of[-0.34,0.24]){let f=new Ze(new Ni(0.134,0.134,0.028,24),d>0?i:s);f.rotation.z=Math.PI/2,f.position.x=d,t.add(f)}let o=new bt;o.setAttribute("position",new st([-0.57,0.1,0,-0.19,0.1,0,-0.49,0.35,0,-0.49,0.35,0.018,-0.19,0.1,0.018,-0.57,0.1,0.018],3)),o.computeVertexNormals();for(let d=0;d<4;d++){let f=new Ze(o,On(d%2?10466492:e,{side:Xt}));f.rotation.x=d*Math.PI/2,t.add(f)}let l=new Pt,c=new Ze(new qs(0.106,0.014,8,32),s);c.rotation.y=Math.PI/2,c.position.x=-0.72,t.add(c);for(let d=0;d<3;d++){let f=new Ze(new vn(0.019,0.17,0.034),i);f.rotation.x=d*Math.PI*2/3,l.add(f)}return l.position.x=-0.72,t.add(l),t.userData.propeller=l,t.userData.materials=[...new Set([n,i,s,...t.children.filter((d)=>d.isMesh).map((d)=>d.material)])],t}function Vl(e,t){e.visible=t>0.001,e.userData.materials.forEach((n)=>{n.opacity=t,n.depthWrite=t>0.96})}function Wl(e,t,n){let i=pt(t),s=pt(n).sub(i);if(e.position.copy(i),s.lengthSq()>0.000000000001)e.quaternion.setFromUnitVectors(new C(1,0,0),s.normalize())}function A0(e,t,n){let i=ms(t,n),s=ms(t,Math.max(0,n-0.002)),r=ms(t,Math.min(1,n+0.002));Wl(e,i,{x:i.x+r.x-s.x,y:i.y+r.y-s.y,depth:i.depth+r.depth-s.depth})}function Ru(e,t,n,i=new Ws(1,1)){let s=new ks(i,On(t,{roughness:0.85,metalness:0}),e.length),r=new Mt;return e.forEach((a,o)=>{r.position.copy(pt(a)),r.scale.setScalar(n),r.updateMatrix(),s.setMatrixAt(o,r.matrix)}),s.instanceMatrix.needsUpdate=!0,s.frustumCulled=!1,s.userData.points=e,s.userData.radius=n,s}function Cu(e,t){let n=new ks(new Ln(0.72,0.72),new on({side:Xt,transparent:!0,opacity:0.28,depthWrite:!1}),e.field.length),i=new Mt;i.rotation.x=-Math.PI/2;let s=new He(1523306),r=new He(3636653),a=new He(11786220);return e.field.forEach((o,l)=>{i.position.copy(pt(o)),i.updateMatrix(),n.setMatrixAt(l,i.matrix);let c=gs((o.mean-t[0])/(t[1]-t[0])),d=new He().lerpColors(c<0.5?s:r,c<0.5?r:a,c<0.5?c*2:(c-0.5)*2);n.setColorAt(l,d)}),n.instanceMatrix.needsUpdate=!0,n.instanceColor.needsUpdate=!0,n.frustumCulled=!1,n}function Iu(e){let t=new Pt,n=pt(e.position),i=[...new Set(e.candidates.map((a)=>a.depth))].sort((a,o)=>a-o),s=Math.max(...e.candidates.map((a)=>Math.hypot(a.x-e.position.x,a.y-e.position.y)))*xi;for(let a of i)t.add(Nu(s,-a*jn,ht.quiet,0.28,n));let r=e.candidates.map((a)=>{let o=e.compare.some((c)=>c.id===a.id),l=new Ze(new mi(o?0.115:0.065),new on({color:o?ht.ink:ht.quiet,wireframe:!0,transparent:!0,opacity:o?0.95:0.6,depthWrite:!1}));return l.position.copy(pt(a)),t.add(l),{candidate:a,mesh:l,prominent:o}});return{group:t,markers:r,levels:i,center:n,radius:s}}function R0(){let e=new Pt,t=On(13819616),n=On(7113880),i=On(2640989);for(let o of[-0.22,0.22]){let l=new Ze(new Gs(0.09,0.83,8,16),n);l.rotation.z=Math.PI/2,l.position.set(0,0.02,o),e.add(l)}let s=new Ze(new vn(0.83,0.075,0.48),t);s.position.y=0.12,e.add(s);let r=new Ze(new vn(0.3,0.22,0.25),t);r.position.set(0.06,0.27,0),e.add(r);let a=new Ze(new vn(0.34,0.028,0.29),i);return a.position.set(0.06,0.395,0),e.add(a),e}function Du(e,{onFallback:t}={}){let n,i=(j)=>{let O=j instanceof Error?j.message:String(j);return t?.(O),{render(){},resize(){},dispose(){},getDiagnostics:()=>({webgl:!1,fallback:!0,reason:O,scale:{mode:"fallback",cellDiameterMeters:_i,bodyScaleExact:!1},marker:{visible:!1,opacity:0,diameterPixels:20,anchor:{x:0,y:0},physicalSize:!1},zoomStage:"static-biology-fallback"})}};try{n=new Ul({antialias:!0,alpha:!0,powerPreference:"high-performance"})}catch(j){return i(j)}n.setPixelRatio(Math.min(globalThis.devicePixelRatio||1,1.75)),n.setClearColor(ht.dark,0),n.outputColorSpace=Hr,n.toneMapping=Ns,n.toneMappingExposure=1.15,Object.assign(n.domElement.style,{position:"absolute",inset:"0",width:"100%",height:"100%",display:"block"}),n.domElement.setAttribute("aria-hidden","true"),e.appendChild(n.domElement);let s=wu(),r=Mu(e),a=null,o="cell-cluster",l=document.createElement("div");Object.assign(l.style,{position:"absolute",inset:"0",background:"#0b202c",pointerEvents:"none",zIndex:"2",display:"none"}),e.appendChild(l);let c=document.createElement("div");c.className="cluster-position-marker",c.setAttribute("aria-hidden","true"),Object.assign(c.style,{position:"absolute",width:"20px",height:"20px",borderRadius:"50%",transform:"translate(-50%, -50%)",pointerEvents:"none",zIndex:"4",display:"none",transition:"none",animation:"none",background:"radial-gradient(circle closest-side,rgba(237,255,212,1) 0%,rgba(201,255,163,1) 7%,rgba(124,255,103,.98) 14%,rgba(83,236,81,.78) 25%,rgba(70,219,77,.28) 51%,rgba(64,214,83,.09) 76%,rgba(64,214,83,0) 100%)"}),e.appendChild(c);let d={visible:!1,opacity:0,diameterPixels:20,anchor:{x:0,y:0},physicalSize:!1},f=new cs,h=new Kn(-9,9,7,-7,0.1,100);f.add(new us(12772584,1582899,2.4));let m=new gi(16051939,3.6);m.position.set(-5,8,7),f.add(m);let x=new gi(7062486,1.6);x.position.set(7,1,-6),f.add(x);let b=new Pt,p=vt.x*xi,u=p/2;for(let j of[0,25,50]){let O=-j*jn;b.add(Mn([new C(-u,O,-u),new C(u,O,-u),new C(u,O,u),new C(-u,O,u),new C(-u,O,-u)],ht.quiet,j===0?0.4:0.17))}let w=new Ze(new Ln(p,p),new on({color:ht.sea,transparent:!0,opacity:0.075,side:Xt,depthWrite:!1}));w.rotation.x=-Math.PI/2,w.position.y=0.015,w.renderOrder=-2,b.add(w);let T=new C(-u-0.22,0,u);b.add(Mn([T.clone(),T.clone().setY(-vt.depth*jn)],ht.quiet,0.52));for(let j of[0,10,20,30,40,50]){let O=T.clone().setY(-j*jn);b.add(Mn([O,O.clone().add(new C(0.13,0,0))],ht.quiet,0.52))}f.add(b);let y=new Pt,M={x:vt.x/2,y:vt.y/2,depth:25};y.add(Mn([pt({...M,depth:0}),pt(M)],ht.amber,0.65,!0));let R=new Ze(new mi(0.09),new on({color:ht.amber,wireframe:!0,transparent:!0,opacity:0.9}));R.position.copy(pt(M)),y.add(R),f.add(y);let A=Ru(yu,9283740,0.036);A.renderOrder=1,A.material.depthWrite=!1,f.add(A);let g=Ru(Ke.after.observations,16777215,0.065,new mi(1,0)),S=Ke.before.observations.length;g.userData.points.forEach((j,O)=>{let z=O>=S/2&&O<S;g.setColorAt(O,new He(z?ht.routeB:ht.routeA))}),g.instanceColor.needsUpdate=!0,g.renderOrder=2,g.material.depthWrite=!1,f.add(g);let B=[Au(ht.routeA),Au(ht.routeB)];B.forEach((j)=>f.add(j));let I=js.map((j,O)=>{let z=Array.from({length:385},(ke,Ie)=>pt(ms(j,Ie/384))),oe=Mn(z,O?ht.routeB:ht.routeA,0.76);return oe.renderOrder=2,f.add(oe),oe}),F=[...Ke.before.field,...Ke.after.field].map((j)=>j.mean),J=[Math.min(...F),Math.max(...F)],P={before:Cu(Ke.before,J),after:Cu(Ke.after,J)};Object.values(P).forEach((j)=>f.add(j));let W={before:Iu(Ke.before),after:Iu(Ke.after)};Object.values(W).forEach((j)=>f.add(j.group));let ee=new Pt,V=Nu(0.2,0,ht.amber,1),re=Mn([new C(0,0.04,0),new C(0,0.29,0)],ht.amber,0.9);ee.add(V,re),f.add(ee);let q=Mn([pt(Ke.before.position),pt(Ke.before.position)],ht.routeA,0.85);f.add(q);let te=Mn(Array.from({length:3},()=>new C),ht.quiet,0.65,!0);f.add(te);let ne=new Pt,Pe=[0,1].map(()=>Mn(Array.from({length:3},()=>new C),ht.quiet,0.55,!0)),we=[0,1].map(()=>new Ze(new Nn(0.045,8,6),new on({color:ht.ink})));ne.add(...Pe,...we),f.add(ne);let et=new Ze(new mi(0.1),new on({color:ht.ink,wireframe:!0,transparent:!0,opacity:0.8}));ne.add(et);let Fe=R0(),Z=pt({x:Ke.before.position.x-250,y:Ke.before.position.y-200,depth:0});Fe.position.copy(Z),Fe.rotation.y=-0.28,f.add(Fe);let se=new Pt,ce=new Ze(new Ni(0.045,0.045,0.25,12),On(13358806,{roughness:0.55}));se.add(ce);for(let j of[-0.13,0.13]){let O=new Ze(new Ni(0.05,0.05,0.025,12),On(ht.amber));O.position.y=j,se.add(O)}f.add(se);let _e=Z.clone().add(new C(-0.12,0.1,0.4)),xe=Mn([_e,_e.clone()],ht.amber,0.8);f.add(xe);let ve=document.createElement("div");ve.className="scene-annotations",ve.setAttribute("aria-hidden","true"),Object.assign(ve.style,{position:"absolute",inset:"0",pointerEvents:"none",overflow:"hidden"}),e.appendChild(ve);let rt=document.createElement("div");rt.className="scene-annotations",rt.setAttribute("aria-hidden","true"),Object.assign(rt.style,{position:"absolute",inset:"0",pointerEvents:"none",overflow:"hidden",zIndex:"3"}),e.appendChild(rt);let Ve=document.createElementNS("http://www.w3.org/2000/svg","svg");Object.assign(Ve.style,{position:"absolute",inset:"0",width:"100%",height:"100%",overflow:"visible"}),ve.appendChild(Ve);function ze(j=ve){let O=document.createElement("div");return Object.assign(O.style,{position:"absolute",fontFamily:"inherit",fontSize:"13px",fontWeight:"500",lineHeight:"1.45",color:"#c2d1d5",whiteSpace:"nowrap",padding:"3px 6px",borderRadius:"2px",background:"rgba(8,23,32,.84)",letterSpacing:".015em"}),j.appendChild(O),O}let tt=ze(),Ye=ze(),Rt=ze(),ut=[ze(),ze(),ze()],Ut=ze(),Et=ze(rt),wt=ze(rt),N=ze(rt);Object.assign(tt.style,{left:"14px",bottom:"14px",maxWidth:"calc(100% - 28px)",whiteSpace:"normal",fontSize:"13px",background:"rgba(8,23,32,.90)",padding:"5px 8px"});let Ot=[0,1,2].map(()=>{let j=ze();Object.assign(j.style,{width:"88px",textAlign:"center",color:"#e7f0ef",fontSize:"14px",fontWeight:"600",padding:"4px 6px"});let O=document.createElementNS("http://www.w3.org/2000/svg","line");return O.setAttribute("stroke","#708b96"),O.setAttribute("stroke-width",".8"),Ve.appendChild(O),{el:j,leader:O}}),Oe=1,$e=1,E=!1,_=!1,L={time:0,phase:0,progress:0},G=Tu(L),ie=new Mt,le={...Ke.after.position,y:Math.min(vt.y,Ke.after.position.y+220),depth:0},fe=new C(0,-1.5,0),Y=pt(Ke.before.position).add(new C(0.3,0.42,0.2)),Q=[new C(-u-0.5,-vt.depth*jn-0.1,-u-0.2),new C(u+0.2,1.65,u+0.2)],me=[Y.clone().add(new C(-2.65,-1.7,-2.7)),Y.clone().add(new C(2.65,2,2.9))];function Te(j){let O=fe.clone().lerp(Y,j);h.position.copy(O).addScaledVector(T0,26),h.lookAt(O),h.updateMatrixWorld(!0);let z=Q[0].clone().lerp(me[0],j),oe=Q[1].clone().lerp(me[1],j),ke=0,Ie=0;for(let en of[z.x,oe.x])for(let Kt of[z.y,oe.y])for(let Yt of[z.z,oe.z]){let Bt=new C(en,Kt,Yt).applyMatrix4(h.matrixWorldInverse);ke=Math.max(ke,Math.abs(Bt.x)),Ie=Math.max(Ie,Math.abs(Bt.y))}let lt=Oe/$e,dt=Math.max(Ie*1.09,ke*1.08/lt);h.left=-dt*lt,h.right=dt*lt,h.top=dt,h.bottom=-dt,h.updateProjectionMatrix()}function ue(j){let O=j.clone().project(h);return{x:(O.x*0.5+0.5)*Oe,y:(-O.y*0.5+0.5)*$e,visible:O.z>=-1&&O.z<=1&&Math.abs(O.x)<1.05&&Math.abs(O.y)<1.05}}function ae(j,O,z,oe=0,ke=0){let Ie=ue(z);j.style.display=Ie.visible?"block":"none",j.textContent=O,j.style.left=`${Math.max(8,Math.min(Oe-170,Ie.x+oe))}px`,j.style.top=`${Math.max(7,Math.min($e-45,Ie.y+ke))}px`}function Ce(j,O,z,oe=20){d={visible:j>0.001,opacity:j,diameterPixels:oe,anchor:{x:O.x,y:O.y},physicalSize:!1};let ke=d.visible?"block":"none";Object.assign(c.style,{display:ke,opacity:String(j),width:`${oe}px`,height:`${oe}px`,left:`${O.x}px`,top:`${O.y}px`})}function Le(j,O){let{phase:z,progress:oe}=j;if(tt.textContent=z<=1?"放大符號表示分布概念，並非水下實拍":z===2?oe<0.44?"從概念分布切換到研究者掌握的資料":"只知道已量位置，其他地方仍未知":z===3?"經過的位置留下螢光量測；不是物種辨識":z===4?"浮出後才交換資料與取得 GPS":z===5?"模型預測平均／未量處為推估":z===6?"色塊為預測平均；變異數與距離另見比較欄":z===7?j.newMeasurements?"抵達並加入量測，開始下一輪候選比較":"前往所選航點；尚未提前更新模型":oe<0.3?"下一次浮出交換：船上取得最近的模型資訊":"有人船取得水樣；模型仍須實驗室核對",tt.style.display="none",Ye.style.display="none",Rt.style.display="none",Ut.style.display="none",ut.forEach((lt)=>{lt.style.display="none"}),z===0&&oe>=0.92||z>=1&&z<=4)[0,25,50].forEach((lt,dt)=>ae(ut[dt],`${lt} m`,T.clone().setY(-lt*jn),-34,-8));if((z===0&&oe>=0.92||z===1)&&!d.visible)ae(Ut,Oe<500?"25 m · 示意水體位置":"25 m · 示意水體位置，非追蹤單一細胞",pt(M),14,-8);if(z>=5&&z<=7)ae(Ye,Oe<500?"另一載具最後通報":"另一載具：最後通報位置",pt(O.otherLast).add(new C(0,0.22,0)),-68,-25);if(z===4&&oe>0.37)ae(Ye,"衛星 → hub",et.position,-40,-29);if(z===8&&oe>=0.3)ae(Rt,"船上採水",Z.clone().add(new C(0,0.5,0)),-70,-25);let ke=z===6||z===7&&j.newMeasurements,Ie=[];O.compare.forEach((lt,dt)=>{let{el:en,leader:Kt}=Ot[dt];if(!ke){en.style.display="none",Kt.style.display="none";return}let Yt=ue(pt(lt));if(!Yt.visible){en.style.display="none",Kt.style.display="none";return}let Bt=Yt.x+(dt===1?-112:22),Ft=Yt.y+(dt===0?-43:dt===1?25:16);Bt=Math.max(8,Math.min(Oe-98,Bt)),Ft=Math.max(8,Math.min($e-82,Ft));for(let ei=0;ei<4;ei++){if(!Ie.some((Zt)=>Bt<Zt.x+94&&Bt+94>Zt.x&&Ft<Zt.y+32&&Ft+32>Zt.y))break;Ft=Ft+35<$e-75?Ft+35:Ft-70}Ie.push({x:Bt,y:Ft}),en.textContent=`${dt+1} · ${lt.depth} m`,en.style.color=j.winnerVisible&&lt.id===O.winner.id?"#ecc88d":"#e7f0ef",Object.assign(en.style,{display:"block",left:`${Bt}px`,top:`${Ft}px`}),Kt.style.display="block",Kt.setAttribute("x1",Yt.x),Kt.setAttribute("y1",Yt.y),Kt.setAttribute("x2",Math.max(Bt,Math.min(Bt+88,Yt.x))),Kt.setAttribute("y2",Ft+13)})}function Qe(j=L){if(E||_)return;L=j;let O=G=Tu(j),{phase:z,progress:oe}=O,ke=z===0?Hl(oe):null;if(l.style.display=ke?.switching?"block":"none",l.style.opacity=String(ke?.switchOpacity||0),z===0&&!ke.macro){ve.style.display="none",rt.style.display="block";let Re=s.update(oe,Oe,$e);a={...Re.scale,hidden:Re.switching},o=Re.zoomStage,r.update(a,{hidden:Re.switching,detailText:Re.marker.alpha>0?Re.seconds<15?"背景尺度，不適用於綠點":"25 m 深度線校準；不適用綠點":"示意細胞體直徑 5 µm"}),Ce(Re.marker.alpha,Re.marker.anchor,Re.seconds>=15,Re.marker.diameterPixels);let nt=(zt,tn,zn,ki,vi,Ea)=>{zt.style.display=Ea&&zn.visible?"block":"none",zt.textContent=tn,zt.style.left=`${Math.max(8,Math.min(Oe-178,zn.x+ki))}px`,zt.style.top=`${Math.max(40,Math.min($e-105,zn.y+vi))}px`},St=Re.seconds>=15&&Re.seconds<18.15;nt(Et,"海面",Re.anchors.surface,14,-18,St),nt(wt,"示意水體位置，非個體追蹤",Re.anchors.location,14,10,St&&!d.visible),nt(N,"水下 25 m",Re.anchors.depth,-130,-10,St&&Re.viewHeightMeters>=65),n.render(s.scene,s.camera);return}ve.style.display="block",rt.style.display="none",o=z===0?"macro-data-view":z===1?"sea-location-and-distribution":"survey-and-model";let Ie=Ke[O.snapshot];Te(O.focus);let lt=ue(pt(M)),dt=lt;if(z===0){let Re=s.update(0.92,Oe,$e).marker.anchor,nt=fn(18.4,18.95,ke.seconds);dt={x:Re.x+(lt.x-Re.x)*nt,y:Re.y+(lt.y-Re.y)*nt}}let en=z===0?1:z===1?1-fn(0.5,0.625,oe):0;Ce(en,dt,!0);let Kt=new C().setFromMatrixColumn(h.matrixWorld,0).setY(0).normalize(),Yt=pt(M),Bt=Yt.clone().project(h),Ft=Yt.clone().addScaledVector(Kt,xi).project(h),ei=Math.hypot((Ft.x-Bt.x)*Oe/2,(Ft.y-Bt.y)*$e/2);a={mode:"macro-horizontal",cellDiameterMeters:_i,viewWidthMeters:Oe/ei,...ca(ei,Oe),bodyScaleExact:!0,cellVisible:!1,hidden:Boolean(ke?.switching)},r.update(a,{hidden:Boolean(ke?.switching),detailText:d.visible?"垂直×12；比例尺不適用綠點":"垂直×12；載具圖示放大"}),y.visible=(z===0||z===1)&&en>0.001,y.children.forEach((Re)=>{Re.material.opacity=(Re===R?0.9:0.65)*en}),R.visible=!1,A.visible=O.conceptualDistribution,A.material.opacity=z===1?0.76*fn(0,0.22,oe):0.76,b.visible=!0,g.visible=z>=2;let Zt=Ke.before.observations.length;if(g.userData.points.forEach((Re,nt)=>{let St=!1;if(nt<Zt)St=z===2?nt%4===0&&oe>=0.44+0.45*nt/Zt:z===3||z===4?Re.y/vt.y<=O.pilotProgress+0.0000001:z>=5;else St=O.newMeasurements;ie.position.copy(pt(Re)),ie.scale.setScalar(St?0.065:0),ie.updateMatrix(),g.setMatrixAt(nt,ie.matrix)}),g.instanceMatrix.needsUpdate=!0,g.material.opacity=z===6||z===7&&!O.newMeasurements?0.16:z>=5?0.7*O.contextOpacity:0.9,I.forEach((Re,nt)=>{if(Re.visible=z>=3,Re.geometry.setDrawRange(0,Math.max(0,Math.round(O.pilotProgress*384)+1)),Re.material.opacity=z<5?0.76:0.38,z<=4)A0(B[nt],js[nt],O.pilotProgress)}),z<5)B.forEach((Re)=>Vl(Re,z>=3?fn(0,0.12,z===3?oe:1):0));else{let Re=O.snapshot==="after"?Ke.after.position:Gl(Ke.before.position,Ke.before.winner,O.travel);if(z===8)Re=Gl(Ke.after.position,le,fn(0,0.28,oe));let nt=Ke.before.position,St=Ke.before.winner,zt=z===8?{x:Re.x+le.x-Ke.after.position.x,y:Re.y+le.y-Ke.after.position.y,depth:Re.depth-Ke.after.position.depth}:{x:Re.x+St.x-nt.x,y:Re.y+St.y-nt.y,depth:Re.depth+St.depth-nt.depth};Wl(B[0],Re,zt),Wl(B[1],Ie.otherLast,{...Ie.otherLast,y:Ie.otherLast.y+100}),Vl(B[0],O.contextOpacity),Vl(B[1],0.3*O.contextOpacity)}let Ss=z===3||z===4&&oe<0.36||z===7&&oe<0.68||z===8&&oe<0.28;B.forEach((Re)=>{Re.userData.propeller.rotation.x=Ss?O.time*10:0});for(let Re of["before","after"]){let nt=P[Re];nt.visible=(z===5||z===7&&O.newMeasurements)&&O.snapshot===Re,nt.material.opacity=z===5?0.18*fn(0.2,0.6,oe):z===6?0.075:z===7?O.newMeasurements?0.16*fn(0.8,0.96,oe):0.1:0.12,W[Re].group.visible=(z===6||z===7)&&O.snapshot===Re,W[Re].markers.forEach(({candidate:St,mesh:zt,prominent:tn})=>{zt.material.color.set(O.winnerVisible&&St.id===Ie.winner.id?ht.amber:tn?ht.ink:ht.quiet),zt.material.opacity=z===7&&!O.newMeasurements?tn?0.35:0.16:tn?0.97:0.58})}if(ee.visible=O.winnerVisible,ee.position.copy(pt(Ke.before.winner)),ee.scale.setScalar(z===6?0.84+0.16*fn(0.72,0.83,oe):1),q.visible=z>=7,da(q,[pt(Ke.before.position),pt(Gl(Ke.before.position,Ke.before.winner,O.travel))]),q.material.opacity=z===8?0.3:0.85,te.visible=z===6&&oe>=0.43&&oe<0.72,te.visible){let Re=Ie.compare[0],nt=Ie.otherLast;da(te,[pt(Re),pt({...Re,depth:nt.depth}),pt(nt)])}if(ne.visible=z===4&&oe>=0.36||z===8&&oe>=0.28&&oe<0.49,ne.visible){let Re=z===4?js.map((St)=>St[St.length-1]):[le,Ie.otherLast],nt=pt({x:750,y:z===4?1050:700,depth:0}).setY(1.45);et.position.copy(nt),Re.forEach((St,zt)=>{let tn=pt(St),zn=nt.clone().add(new C(-0.65,-0.5,-0.45));da(Pe[zt],[tn,nt,zn]);let ki=z===4?gs((oe-0.36)/0.64):gs((oe-0.28)/0.21),vi=gs(ki*1.12-zt*0.12);we[zt].position.copy(vi<0.72?tn.clone().lerp(nt,vi/0.72):nt.clone().lerp(zn,(vi-0.72)/0.28))})}if(Fe.visible=z===8&&oe>=0.3,se.visible=xe.visible=z===8&&oe>=0.48,se.visible)se.position.copy(_e).setY(-30*jn*fn(0.48,0.83,oe)),da(xe,[_e,se.position.clone().add(new C(0,0.14,0))]);Le(O,Ie),n.render(f,h)}function U(){let j=A.instanceMatrix.array,O=new Uint32Array(j.buffer,j.byteOffset,j.length),z=2166136261;for(let Ie of O)z=Math.imul(z^Ie,16777619);let oe=new at,ke=[0,86,172,259].map((Ie)=>{A.getMatrixAt(Ie,oe);let lt=new C().setFromMatrixPosition(oe).applyMatrix4(A.matrixWorld),dt=ue(lt);return{index:Ie,x:dt.x,y:dt.y}});return{visible:A.visible,opacity:A.material.opacity,count:A.count,transformFingerprint:(z>>>0).toString(16),screenAnchors:ke,cameraWorld:[...h.matrixWorld.elements],cameraProjection:[...h.projectionMatrix.elements],color:"#8da89c",interpretation:"fixed conceptual distribution; not data supplied to the GP",routeColors:["#ffb077","#5ac4ff"],markerVisible:d.visible,locationGuideVisible:y.visible}}function he(){if(E)return;Oe=Math.max(1,e.clientWidth),$e=Math.max(1,e.clientHeight),n.setSize(Oe,$e,!1),Ve.setAttribute("viewBox",`0 0 ${Oe} ${$e}`),Qe(L)}let K=(j)=>{j.preventDefault(),_=!0,r.hide(),ve.style.display="none",rt.style.display="none",c.style.display="none",n.domElement.style.visibility="hidden",t?.("WebGL context lost")};n.domElement.addEventListener("webglcontextlost",K,!1);let de=typeof ResizeObserver<"u"?new ResizeObserver(he):null;return de?.observe(e),he(),{render:Qe,resize:he,getDiagnostics:()=>({webgl:!_,fallback:_,width:Oe,height:$e,phase:G.phase,progress:G.progress,snapshot:G.snapshot,scale:_?{mode:"fallback",cellDiameterMeters:_i,bodyScaleExact:!1}:a,zoomStage:o,ecology:U(),aggregation:s.getDiagnostics()?.aggregation??null,location:{x:750,y:750,depthMeters:25,illustrative:!0,tracksIndividual:!1},marker:_?{...d,visible:!1,opacity:0}:d,winnerVisible:G.winnerVisible,displayedWinner:G.winnerVisible?Ke.before.winner.id:null,arrived:G.arrived,newMeasurements:G.newMeasurements,position:{x:B[0].position.x,y:B[0].position.y,z:B[0].position.z},positionSpace:"display world: scaled x, negative scaled depth, scaled y",modelPosition:{x:B[0].position.x/xi+vt.x/2,y:B[0].position.z/xi+vt.y/2,depth:-B[0].position.y/jn},meanScale:[...J],varianceEncoding:"separate HTML comparison, not a second scene field",verticalExaggeration:["uniform","uniform-depth"].includes(a?.mode)?1:Pu,vehicleSize:"schematic enlarged silhouettes",conceptualDistribution:G.conceptualDistribution,camera:a?.mode==="uniform-depth"?"uniform orthographic water view; ruler calibrated to projected depth":a?.mode==="uniform"?"uniform orthographic camera; fixed-size 5 µm body":"fixed macro overview; horizontal scale; depth ×12; biological reference positions stationary",renderCalls:n.info.render.calls,triangles:n.info.render.triangles}),dispose(){if(E)return;E=!0,de?.disconnect(),n.domElement.removeEventListener("webglcontextlost",K,!1);let j=new Set,O=new Set;f.traverse((z)=>{if(z.geometry)j.add(z.geometry);if(z.material)(Array.isArray(z.material)?z.material:[z.material]).forEach((oe)=>O.add(oe))}),j.forEach((z)=>z.dispose()),O.forEach((z)=>z.dispose()),n.dispose(),s.dispose(),r.dispose(),n.domElement.remove(),ve.remove(),rt.remove(),l.remove(),c.remove()}}}var bn=103,yi=[{start:0,end:20,title:"微小的浮游植物",description:"以這類單細胞藻類為例，細胞本體直徑約 5 µm，也就是 0.005 毫米。",detail:"代表尺寸依 Phaeocystis pouchetii 培養株 AJ01 文獻，不是所有浮游植物都一樣大。",takeaway:"微小的細胞，也是海洋生態的一部分。",label:"浮游植物",key:"細胞本體直徑代表值 5 µm"},{start:20,end:28,title:"在海裡分布並不均勻",description:"有些水域較密集，有些較稀疏；同一片海的不同深度，也可能有不同數量。",detail:"原研究關注浮游植物在水平位置與深度上的斑塊分布。",takeaway:"了解分布，才能找對量測位置。",label:"海水中的分布",key:"不同位置與深度可能有不同含量"},{start:28,end:35,title:"量到這裡，其他地方仍未知",description:"AUV 只量到經過的海水。淺綠點保留分布示意，青色與橙色另外標出量測位置。",detail:"模型只收到沿路量測，並不知道全部淺綠點所代表的分布；未量位置仍是未知。",takeaway:"有限的量測，留下了下一站的問題。",label:"視角切換 · 從分布概念到量測資料",key:"未觀測 ≠ 沒有生物"},{start:35,end:45,title:"先量螢光，取得葉綠素線索",description:"兩部水下機器人（AUV）先沿預設起始測線，上下起伏地收集量測。",detail:"AUV 量葉綠素螢光，不量個別細胞大小，也不追蹤單顆細胞。螢光提供分布線索，不能直接辨識細胞數或物種。",takeaway:"這是代理量測，不是生物自己發亮。",label:"起始調查 · 兩部 AUV",key:"航線與讀值為教學示意"},{start:45,end:50,title:"先浮出，再交換資料",description:"完成起始測線後，載具浮出取得 GPS 定位，透過衛星與 hub 分享量測。",detail:"水下決策使用另一載具最後已知的位置；不是即時掌握彼此。",takeaway:"共用資料，要等到交換時機。",label:"首次浮出 · GPS 與衛星交換",key:"位置資訊有延遲；不是即時三維避碰"},{start:50,end:57,title:"交換後，進入一輪水下選點",description:"模型利用沿路量測推估未量位置。藍色面表示預測平均，淺綠點仍保留為分布示意。",detail:"這裡示範後續的一輪選點；模型只使用量測資料，沒有取得全部分布的真值。",takeaway:"高預測值，與高不確定度，是不同理由。",label:"教學模型 · 未量位置的預測平均",key:"顏色表示預測平均；不是不確定度或真實影像"},{start:57,end:68,title:"同時比較三種理由",description:"比較預測值、變異數與距離扣分，再看總分。候選有不同深度。",detail:"三個代表候選包含全部可行候選的最高分者。評分揭示完，才標出勝出位置。",takeaway:"下一站由同一組模型分數決定。",label:"候選比較 · 相對於當前深度",key:"距離項採另一載具最後已知的水平位置"},{start:68,end:74,title:"先抵達，再用新量測更新",description:"AUV 前往選定位置。抵達之前，畫面保留原本的模型與分數。",detail:"抵達後加入新量測，再以新的位置重算模型與下一輪候選。",takeaway:"不是先改分數，再讓載具配合答案。",label:"前往航點 · 抵達後重新計分",key:"新量測只在抵達後加入教學模型"},{start:74,end:82,title:"回到水樣，檢查模型推估",description:"任務進行中，人員依 hub 最近收到的剖面安排船上採水，瓶樣再交實驗室分析葉綠素。",detail:"原研究另用船載 CTD 螢光量測核對。這裡演示實體採水與分析流程，不是驗證結果曲線。",takeaway:"獨立量測，才能核對模型推估。",label:"獨立核對 · 船上採水與實驗室分析",key:"核對流程示意；未展示或虛構驗證數據"}],ql=[{...yi[0],start:0,end:8},{start:8,end:15,title:"靠陽光製造養分",description:"它們利用葉綠素進行光合作用，也是許多海洋生物的食物來源。",detail:"浮游植物是海洋食物網的重要基礎。",takeaway:"小小的藻類，支撐海中的食物網。",label:"光合作用與食物網",key:"利用陽光與葉綠素進行光合作用"},{start:15,end:20,title:"生活在有光的海水中",description:"它們需要陽光，因此多分布在海洋上層、仍有光線的水域。",detail:"陽光能穿透的深度因水體條件而不同。",takeaway:"光線影響它們能在哪裡生長。",label:"海洋上層的生命",key:"多分布在仍有光線的水層"}],Xl={auv:{title:"這就是水下量測的載具",description:"水下量測載具沿路收集螢光與水文資料，幫助研究人員了解水體中的變化。",detail:"LAUV Roald 設備參考照，非本次 Svalbard 海試。照片來自另一場 Nidelva 河口任務，只用來認識載具外形。",takeaway:"實際載具與前面的教學模型分開看。",label:"載具參考照片",key:""},colony:{title:"顯微鏡下的藻類群體",description:"Phaeocystis pouchetii 會形成群體。透過顯微鏡，可以看見許多細胞聚在一起的樣貌。",detail:"它不是開場同一批細胞，也不採相同尺度；這張照片用來認識外形，並非前面動畫中那瓶水的驗證結果。",takeaway:"顯微外形與葉綠素量測回答不同問題。",label:"Phaeocystis 群體",key:""},community:{title:"水中還有不同樣貌的生命",description:"這場藻華中，可以看到不同樣貌的浮游植物。螢光量測提供分布線索，辨認物種還需要另外觀察。",detail:"照片不是由 AUV 拍攝，本片也沒有執行影像分類。瓶樣葉綠素分析如何核對模型，已在前一段另行說明。",takeaway:"回到實際影像，認識量測背後的生物。",label:"浮游植物群聚",key:""}},_s=[...yi.slice(0,3).map((e,t)=>({...e,kind:"core",coreIndex:t})),{...Xl.auv,start:35,end:42,kind:"photo",photoKey:"auv"},...yi.slice(3).map((e,t)=>({...e,start:e.start+7,end:e.end+7,kind:"core",coreIndex:t+3})),{...Xl.colony,start:89,end:96,kind:"photo",photoKey:"colony"},{...Xl.community,start:96,end:103,kind:"photo",photoKey:"community"}],pa=(e,t=0,n=1)=>Math.max(t,Math.min(n,e)),er=(e,t,n)=>pa((e-t)/(n-t)),fa=(e)=>(e=pa(e),e*e*(3-2*e));function C0(e){let t=pa(Number.isFinite(e)?e:0,0,82),n=Math.max(0,yi.findLastIndex((i)=>t>=i.start));return{time:t,phase:n,progress:er(t,yi[n].start,yi[n].end)}}function tr(e){let t=pa(Number.isFinite(e)?e:0,0,103),n=t<35?t:t<42?35:t<89?t-7:82,i=C0(n),s=_s.findLastIndex((d)=>t>=d.start),r=_s[s],a=0,o=[];if(t>=35&&t<42)a=fa(er(t,35,35.4))*(1-fa(er(t,41.6,42))),o=[{key:"auv",alpha:1}];else if(t>=89){a=fa(er(t,89,89.4));let d=fa(er(t,95.6,96.4));o=[{key:"colony",alpha:1-d},{key:"community",alpha:d}]}let l=o.reduce((d,f)=>!d||f.alpha>=d.alpha?f:d,null),c=l&&a>0.001&&a*l.alpha>=1-a?l.key:null;return{time:t,coreTime:n,coreFrame:i,displayPhase:s,display:r,photoKey:r.kind==="photo"?r.photoKey:null,photoOpacity:a,photoLayers:o,currentSource:c}}var nr={coordinates:"source-image pixels, crop=[left,top,right,bottom]; display-only crop, source bytes intact",panels:{auv:{asset:"auv-figure-9.webp",width:2500,height:1406,crop:[850,730,1800,1350],source_type:"equipment reference photograph from another field trial",scale_calibrated:!1},colony:{asset:"figure-7.png",width:2013,height:673,crop:[690,100,1326,615],source_type:"paper Figure 7b microscopy photo detail",credit:"Ane Cecilie Kvernvik; Mo-Bjørkelund et al. (2024)",scale_calibrated:!1},community:{asset:"figure-7.png",width:2013,height:673,crop:[1329,100,2013,615],source_type:"paper Figure 7c microscopy photo detail",credit:"Anette Wold; Mo-Bjørkelund et al. (2024)",scale_calibrated:!1}}};var De=(e)=>document.getElementById(e),Qn=De("stage"),Zl=De("scene-host"),_a=De("play-toggle"),ir=De("timeline"),Bu=[...document.querySelectorAll(".phase-navigation [data-phase]")],Sa=matchMedia("(prefers-reduced-motion: reduce)"),wn={time:0},ys=null,pn=null,P0=-1,Uu="",Fu="",vs=!1,zu=!1,Ou=!1,$l=(e,t=0,n=1)=>Math.max(t,Math.min(n,e)),ma=(e,t,n)=>$l((e-t)/(n-t)),ga=(e)=>1-Math.pow(1-$l(e),3),Ma=(e)=>`${String(Math.floor(e/60)).padStart(2,"0")}:${String(Math.floor(e%60)).padStart(2,"0")}`,Jl={auv:{title:"LAUV Roald 設備參考照",credit:"Berild 等（2024），Fig. 9，CC BY 4.0。另一場 Nidelva 河口任務，非本次 Svalbard 海試。",fullCaption:"Berild 等（2024），Fig. 9 完整原圖，CC BY 4.0。照片來自另一場 Nidelva 河口任務，僅作 LAUV Roald 外形參考。",url:"https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2023.1319719/full#f9"},colony:{title:"Phaeocystis pouchetii 群體",credit:"Mo-Bjørkelund 等（2024），Fig. 7b 局部；攝影 Ane Cecilie Kvernvik，CC BY 4.0。",fullCaption:"Mo-Bjørkelund 等（2024），Fig. 7 完整原圖。b：Ane Cecilie Kvernvik；c：Anette Wold。CC BY 4.0。動畫只取 b／c 認識生物外形。",url:"https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0302514"},community:{title:"藻華中的浮游植物群聚",credit:"Mo-Bjørkelund 等（2024），Fig. 7c 局部；攝影 Anette Wold，CC BY 4.0。",fullCaption:"Mo-Bjørkelund 等（2024），Fig. 7 完整原圖。b：Ane Cecilie Kvernvik；c：Anette Wold。CC BY 4.0。動畫只取 b／c 認識生物外形。",url:"https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0302514"}},xa=De("source-stage"),L0="http://www.w3.org/2000/svg";function xs(e,t,n){let i=document.createElementNS(L0,e);for(let[s,r]of Object.entries(t))i.setAttribute(s,String(r));return n?.append(i),i}var N0=Object.fromEntries(Object.entries(nr.panels).map(([e,t])=>{let[n,i,s,r]=t.crop,a=xs("svg",{viewBox:`${n} ${i} ${s-n} ${r-i}`,preserveAspectRatio:"xMidYMid meet",role:"img","aria-label":Jl[e].title,"aria-hidden":"true"},xa),o=xs("defs",{},a),l=xs("clipPath",{id:`source-clip-${e}`,clipPathUnits:"userSpaceOnUse"},o);xs("rect",{x:n,y:i,width:s-n,height:r-i},l);let c=xs("g",{"clip-path":`url(#source-clip-${e})`},a);return xs("image",{href:`assets/sources/${t.asset}`,x:0,y:0,width:t.width,height:t.height},c),[e,a]}));function D0(e){let t=e.photoOpacity>0.001;xa.hidden=!t,xa.style.opacity=String(e.photoOpacity),xa.setAttribute("aria-hidden",String(!e.currentSource));for(let[s,r]of Object.entries(N0)){let a=e.photoLayers.find((o)=>o.key===s)?.alpha??0;r.style.opacity=String(a),r.style.visibility=a>0.001?"visible":"hidden",r.setAttribute("aria-hidden",String(s!==e.currentSource))}let n=e.photoOpacity>=0.999999;Zl.style.visibility=n?"hidden":"",De("scene-fallback").style.visibility=n?"hidden":"";let i=e.currentSource??e.photoKey;De("photo-credit").hidden=!t,De("photo-credit").textContent=i?Jl[i].credit:"",De("open-source").disabled=!e.currentSource,De("open-source").textContent=e.currentSource?"查看這張原圖":"目前顯示方法動畫",Qn.dataset.photoKey=e.currentSource??""}function ku(e=tr(wn.time).currentSource){if(!e||!nr.panels[e])return!1;En("已開啟完整來源原圖；關閉後保持暫停。");let t=Jl[e];return De("source-image").src=`assets/sources/${nr.panels[e].asset}`,De("source-image").alt=t.fullCaption,De("source-caption").textContent=t.fullCaption,De("source-paper-link").href=t.url,De("source-dialog").showModal(),!0}function U0(){let e=[...new Set(Object.values(nr.panels).map((t)=>t.asset))];return Promise.all(e.map((t)=>new Promise((n,i)=>{let s=new Image;s.onload=n,s.onerror=()=>i(Error(t)),s.src=`assets/sources/${t}`}))).catch((t)=>{De("player-status").textContent="部分來源照片尚未載入。可使用下方完整原圖連結與文字。",console.warn("Source photograph unavailable:",t.message)})}De("open-source").addEventListener("click",()=>ku());De("source-dialog").addEventListener("close",()=>En("已關閉原圖。按播放繼續。"));function Hu(e){return e.phase>7||e.phase===7&&e.progress>=0.8?"after":"before"}function zi(){return!!pn&&!pn.paused()&&wn.time<bn}function Bn(e,t){e.toggleAttribute("hidden",!t)}function ba(){_a.querySelector("span").textContent=zi()?"暫停動畫":"播放動畫",_a.querySelector("path").setAttribute("d",zi()?"M8 5v14M16 5v14":"m8 5 11 7-11 7Z"),_a.setAttribute("aria-label",zi()?"暫停動畫":"播放動畫"),De("clock").textContent=`${Ma(wn.time)} / ${Ma(bn)}`,ir.value=String(wn.time),ir.setAttribute("aria-valuetext",`${wn.time.toFixed(1)} 秒，共 ${bn} 秒`)}function F0(e){let t=e.coreFrame,n=!e.photoKey&&t.phase===0?ql.findLast((a)=>t.time>=a.start):null,i=e.photoKey?`photo:${e.displayPhase}`:`core:${t.phase}:${n?.start??0}`;if(i===Uu)return;Uu=i,P0=e.displayPhase;let s=e.photoKey?e.display:n??yi[t.phase],r=n??e.display;De("phase-position").textContent=`${e.displayPhase+1} / ${_s.length}`,De("phase-time").textContent=`${Ma(r.start)}—${Ma(r.end)}`;for(let[a,o]of[["phase-title","title"],["phase-description","description"],["phase-detail","detail"],["phase-takeaway","takeaway"],["stage-label","label"],["stage-key","key"]])De(a).textContent=s[o];Bu.forEach((a,o)=>{if(o===e.displayPhase)a.setAttribute("aria-current","step");else a.removeAttribute("aria-current")}),Qn.dataset.phase=String(e.displayPhase),Qn.dataset.corePhase=String(t.phase),Qn.closest(".stage-layout").dataset.phase=String(e.displayPhase),De("phase-detail").hidden=!e.photoKey&&(t.phase===6||t.phase===7),Bn(De("size-source-note"),!e.photoKey&&t.phase===0)}function O0(e){let t=e.time;if(Bn(De("data-view"),e.phase===2),e.phase===2)De("data-view").style.transform=`translateY(${18*(1-ga(ma(t,28,29.2)))}px)`;if(Bn(De("sensor-note"),e.phase===3),e.phase===3)De("sensor-note").style.clipPath=`inset(0 ${(1-ga(ma(t,35,36.5)))*100}% 0 0)`;let n=De("lab-workflow");if(Bn(n,e.phase===8),e.phase===8)n.style.transform=`translateY(${16*(1-ga(ma(t,74,75)))}px)`,n.querySelectorAll("[data-lab-step]").forEach((i,s)=>{let r=ga(ma(t,74.5+s*1.2,75.6+s*1.2));i.style.clipPath=`inset(0 ${(1-r)*100}% 0 0)`})}function B0(e){let t=e.phase===6||e.phase===7;if(Bn(De("score-panel"),t),!t)return;let n=Hu(e),i=Ke[n],s=e.phase===7?4:e.progress<0.17?1:e.progress<0.34?2:e.progress<0.53?3:4,r=e.phase===6&&e.progress>=0.72||e.phase===7&&n==="before",a=`${n}:${s}:${r}`;if(a===Fu)return;Fu=a;let o=["meanTerm","varianceTerm","penalty","score"];De("score-body").replaceChildren(...i.compare.map((h,m)=>{let x=document.createElement("tr");if(x.dataset.candidate=h.id,r&&h.id===i.winner.id)x.className="is-winner";let b=document.createElement("td");b.textContent=`候選 ${m+1}`;let p=document.createElement("small");return p.textContent=`深度 ${h.depth.toFixed(0)} m`,b.append(p),x.append(b),o.forEach((u,w)=>{let T=document.createElement("td"),y=w<s;T.dataset.revealed=String(y),T.dataset.term=u,T.textContent=y?`${u==="penalty"?"−":""}${h[u].toFixed(2)}`:"—",x.append(T)}),x})),document.querySelectorAll("thead [data-term]").forEach((h)=>h.dataset.revealed=String(Number(h.dataset.term)<s)),De("score-round").textContent=n==="after"?"抵達後 · 下一輪重新計分":"一輪水下選點 · 三個代表候選",De("score-rule").textContent=["","先看預測值的貢獻。","再加入預測變異的貢獻。","扣除與另一載具有關的距離懲罰。","總分＝預測貢獻＋變異貢獻−距離懲罰。"][s];let l=i.compare.findIndex((h)=>h.id===i.winner.id),c=i.compare.reduce((h,m)=>h.mean>m.mean?h:m),d=i.compare.indexOf(c),f=c.id!==i.winner.id&&c.penalty>i.winner.penalty?`候選 ${d+1} 預測較高，但距離扣分也較大。`:"";De("winner-note").textContent=n==="after"?"新資料已加入；候選已改以新位置為中心。":r?`候選 ${l+1} 綜合得分最高。${f}`:"先比較各項理由，再揭示結果。"}function sr(){if(zu)return;let e=tr(wn.time),t=e.coreFrame;if(F0(e),e.photoKey)["data-view","sensor-note","lab-workflow","score-panel"].forEach((n)=>Bn(De(n),!1));else O0(t),B0(t);if(ys&&!vs)try{ys.render(t)}catch(n){Yl(n)}D0(e),ba()}function Yl(e){if(vs=!0,Bn(De("render-notice"),!0),Bn(De("scene-fallback"),!0),Zl.hidden=!0,e)console.warn("3D scene unavailable:",e instanceof Error?e.message:String(e))}function En(e){if(pn?.pause(),ba(),e)De("player-status").textContent=e}function ya(e){let t=$l(Number(e)||0,0,bn);pn?.pause(),pn?.time(t,!1),wn.time=t,sr(),De("player-status").textContent=`已跳至「${tr(t).display.title}」並暫停。按播放繼續。`}function va(){if(!pn||document.hidden||De("source-dialog").open)return;let e=Qn.getBoundingClientRect();if(e.bottom<=0||e.top>=innerHeight)Qn.scrollIntoView({block:"center",behavior:"instant"});if(wn.time>=bn)wn.time=0,pn.time(0,!1),sr();pn.play(),ba(),De("player-status").textContent=Sa.matches?"依你的操作播放。離開畫面會暫停，回來後不會自動續播。":"正在播放。可暫停、拖曳進度，或選取下方段落。"}window.caseAnimation={seek:ya,play:va,pause:()=>En("已暫停。按播放繼續。"),openSource:ku,getState(){let e=tr(wn.time),t=e.coreFrame,n=Hu(t);return{...t,time:e.time,coreTime:e.coreTime,coreFrame:t,displayPhase:e.displayPhase,photoKey:e.photoKey,photoOpacity:e.photoOpacity,photoLayers:e.photoLayers,currentSource:e.currentSource,duration:bn,microStage:t.phase===0?ql.findLastIndex((i)=>t.time>=i.start):null,playing:zi(),reducedMotion:Sa.matches,activeSnapshot:n,activeSnapshotWinner:Ke[n].winner.id,winner:Ke[n].winner,scoreCandidates:Ke[n].compare.map((i)=>({id:i.id,score:i.score})),sceneDiagnostics:ys?.getDiagnostics?.()??{fallback:vs},fallback:vs}}};try{if(!window.gsap)throw Error("Local GSAP library did not load");if(ys=Du(Zl,{onFallback:Yl}),!vs)Bn(De("scene-fallback"),!1);pn=window.gsap.timeline({paused:!0,onUpdate:sr,onComplete:()=>{ba(),De("player-status").textContent="播放完畢。可以重播，或回到任一段落。"}}),_s.forEach((n,i)=>pn.addLabel(`phase-${i}`,n.start)),pn.fromTo(wn,{time:0},{time:bn,duration:bn,ease:"none"},0),ir.max=String(bn),document.querySelectorAll(".js-only").forEach((n)=>Bn(n,!0)),De("story-text").open=!1,De("player-status").textContent=Sa.matches?"已啟用減少動態，目前為靜態畫面。你可以明確按播放觀看，或閱讀文字版。":`${bn} 秒，無音訊。按播放開始；選取段落或拖曳進度會停在該處。`,_a.addEventListener("click",()=>zi()?En("已暫停。按播放繼續。"):va()),De("replay").addEventListener("click",()=>{ya(0),va()}),ir.addEventListener("input",()=>ya(Number(ir.value))),Bu.forEach((n)=>n.addEventListener("click",()=>{ya(_s[Number(n.dataset.phase)].start),Qn.scrollIntoView({block:"start",behavior:"instant"})})),document.addEventListener("keydown",(n)=>{if(n.code!=="Space"||n.altKey||n.ctrlKey||n.metaKey||n.shiftKey||n.target.closest("button,a,input,textarea,select,summary,[contenteditable]"))return;n.preventDefault(),zi()?En("已暫停。按播放繼續。"):va()}),document.addEventListener("visibilitychange",()=>{if(document.hidden)En("視窗在背景，動畫保持暫停。")}),Sa.addEventListener("change",()=>{En("動態偏好已變更，動畫保持暫停；仍可明確按播放。")});let e=new IntersectionObserver((n)=>{if(!n[0].isIntersecting&&zi())En("動畫離開可見範圍，保持暫停。")},{threshold:0});e.observe(Qn);let t=new ResizeObserver(()=>{if(!vs)ys?.resize();sr()});t.observe(Qn),addEventListener("beforeprint",()=>{En(),Ou=De("story-text").open,De("story-text").open=!0}),addEventListener("afterprint",()=>{De("story-text").open=Ou,En("列印後保持暫停。")}),addEventListener("pagehide",()=>{En()}),addEventListener("unload",()=>{zu=!0,pn?.kill(),e.disconnect(),t.disconnect(),ys?.dispose()},{once:!0}),document.documentElement.classList.add("enhanced"),sr(),U0()}catch(e){Yl(e),De("player-status").textContent="互動播放器未能啟動；下方完整文字與尺寸依據仍可閱讀。"}})();
