function initSkill(val){for(var result={},s=0;s<vm.selected.size();s++)result[vm.selected[s].n]=val?eval(val):vm.selected[s].r;return result}function enable(e){var r=!0;return vm.selected.forEach(function(o){e.n==o.n&&(r=!1)}),""!=vm.condition&&e.n.indexOf(vm.condition)<0&&(r=!1),r}function holeMap(e){return function(r,o){return o==e?r+1:r}}function shortMap(e,r){for(var o={},n=0;n<vm.selected.size();n++){var a=vm.selected[n].n;o[a]=a in e?r[a]-e[a]:r[a]}return o}function hasMap(e,r){for(var o={},n=0;n<e.length;n++)for(var a in e[n])a in o?o[a]+=e[n][a]*r[n]:"$"!=a[0]&&(o[a]=e[n][a]*r[n]);return o}function shortVal(e){for(var r=0,o=0;o<vm.selected.size();o++){var n=vm.selected[o].n,a=vm.selected[o].s?Math.max(vm.selected[o].s[4],vm.selected[o].s[5]):0;r+=e[n]<=0?0:1e3+e[n]*vm.selected[o].v+(e[n]>a?1e4:0)}return r}function holes(e,r,o,n){return e*!!(o-1)+r*o}avalon.config({baseUrl:"lib",debug:!1});var armor=[[[],[],[],[],[]],[[],[],[],[],[]]],gem=[],skillEffect={},skill=[],stone={},resultMessage=["无需护石即可配出","至少需要单属性护石可配出","至少需要双属性护石可配出"],vm=avalon.define({$id:"mho",view:"param",last:0,popup:"",closable:!0,skill:[],selected:[],armor:[],gem:[],stone:[],own:[],info:"",condition:"",hasStone:!1,result:"",armorText:[],optionalArmor:[],selectedArmor:[null,null,null,null,null],pos:-1,$computed:{ranged:{set:function(e){this.selectedArmor=[null,null,null,null,null],localStorage.setItem("ranged",e)},get:function(){var flag=localStorage.getItem("ranged")?eval(localStorage.getItem("ranged")):!1;return this.armorText=flag?["战帽","护甲","护手","护腰","护腿"]:["头盔","铠甲","腕甲","腰甲","腿甲"],flag}}},hidePopup:function(e){vm.closable&&"div"==e.target.nodeName.toLowerCase()&&(vm.popup="")},listSkill:function(){vm.skill=skill.filter(enable),vm.closable=!0,vm.popup="skill_choose"},addSkill:function(e){vm.selected.push({n:e.n,v:e.v,r:10,s:e.s}),vm.condition="",vm.popup=""},skillMinus:function(e){e.r--},skillPlus:function(e){e.r++},listArmor:function(e){vm.optionalArmor=armor[vm.ranged?1:0][vm.pos=e],vm.closable=!0,vm.popup="armor_choose"},addArmor:function(e){vm.selectedArmor[vm.pos]=armor[vm.ranged?1:0][vm.pos][e],vm.popup=""},skillJoin:function(e){var r=[];for(var o in e)r.push(o+e[o]);return r.join("，")},showChosen:function(e){e.o=!e.o},secondary:!1,showSecondary:function(){vm.secondary=!vm.secondary},calc:function(){vm.popup="loading",vm.closable=!1,vm.info="计算中，请稍候…",setTimeout(function(){var e=vm.ranged?1:0;vm.stone=[];for(var r=[[],[],[],[],[]],o=[{},{},{},{},{}],n=vm.selected.size(),a=new Array(n),t=initSkill("[]"),l=[0,0,0,0],s=[0,0,0,0],m=0;n>m;m++){var i=vm.selected[m].n,v=new Array(4);for(var c in gem)i in gem[c].s&&gem[c].s[i]>0&&(t[i].push(gem[c]),v[gem[c].h]=gem[c].s);var u=0;a[m]=new Array(u=v[3]?6:1);for(var f=u-1?5:0;f>=0;f--){a[m][f]=new Array(u=v[2]?6-f:1);for(var p=u-1;p>=0;p--){a[m][f][p]=new Array(u=v[1]?16-3*f-2*p:1);for(var h=u-1;h>=0;h--)a[m][f][p][h]=hasMap(v,[0,h,p,f])}}a[m][0][0][1]&&(l[1]+=a[m][0][0][1][i]*vm.selected[m].v,s[1]++),a[m][0][1]&&(l[2]+=a[m][0][1][0][i]*vm.selected[m].v,s[2]++),a[m][1]&&(l[3]+=a[m][1][0][0][i]*vm.selected[m].v,s[3]++)}0!=s[1]&&(l[1]=l[1]/s[1]),l[2]=0==s[2]?2*l[1]:l[2]/s[2],l[3]=0==s[3]?l[2]+l[1]:l[3]/s[3];for(var d=[[],[],[],[],[]],c=0;5>c;c++)if(vm.selectedArmor[c])d[c].push(vm.selectedArmor[c]);else{var g=!0;for(var k in armor[e][c]){for(var w=armor[e][c][k].h,y=0,m=0;n>m;m++){var i=vm.selected[m].n;i in armor[e][c][k].s&&(y+=vm.selected[m].v*armor[e][c][k].s[i])}(y>0||g&&3==w)&&(armor[e][c][k].val=y+l[armor[e][c][k].h],d[c].push(armor[e][c][k]),g=g&&3!=w)}d[c].sort(function(e,r){return r.val-e.val})}for(var S=shortVal(initSkill()),M=15,b=[],A={},I=[],E=[Math.min(d[0].length,3),Math.min(d[1].length,3),Math.min(d[2].length,3),Math.min(d[3].length,3),Math.min(d[4].length,3)],j=0;j<E[0];j++){o[0]=shortMap(d[0][j].s,initSkill()),r[0]=[0,0,0,0].map(holeMap(d[0][j].h));for(var q=0;q<E[1];q++){o[1]=shortMap(d[1][q].s,o[0]),r[1]=r[0].map(holeMap(d[1][q].h));for(var O=0;O<E[2];O++){o[2]=shortMap(d[2][O].s,o[1]),r[2]=r[1].map(holeMap(d[2][O].h));for(var x=0;x<E[3];x++){o[3]=shortMap(d[3][x].s,o[2]),r[3]=r[2].map(holeMap(d[3][x].h));for(var N=0;N<E[4];N++){o[4]=shortMap(d[4][N].s,o[3]),r[4]=r[3].map(holeMap(d[4][N].h));for(var _=initSkill("[]"),J=shortVal(o[4]),u=0,$=new Array(u=r[4][3]+1),z=new Array(u),m=0;n>m;m++)for(var i=vm.selected[m].n,f=(t[i].length,r[4][3]);f>=0;f--){u=r[4][2]+r[4][3]-f+1,$[f]||($[f]=new Array(u),z[f]=new Array(u));for(var p=u-1;p>=0;p--){u=r[4][1]+3*(r[4][3]-f)+2*(r[4][2]-p)+1,$[f][p]||($[f][p]=new Array(u),z[f][p]=new Array(u));for(var h=u-1;h>=0;h--){for(var T=0==m?J:$[f][p][h],V=0==m?o[4]:z[f][p][h],D=f;D>=0;D--)for(var P=p;P>=0;P--)for(var R=h;R>=0;R--)if(a[m][D]&&a[m][D][P]&&a[m][D][P][R]){var C=shortMap(a[m][D][P][R],0==m?o[4]:z[f-D][p-P][h-R]),L=shortVal(C),U=15;T>L&&(T=L,V=C,_[i].push({hole:[0,h,p,f],use:[0,R,P,D]}),(S>L||L==S&&(U=r[4].reduce(holes))<M)&&(M=U,S=L,b=[j,q,O,x,N],I=[m,h,p,f],A=_))}$[f][p][h]=T,z[f][p][h]=V}}}}}}}}var B=new Array(5);B[0]="ranged="+e,B[1]="skill="+vm.selected.map(function(e,r,o){return e.n}).join("~");var F=initSkill("0");B[2]="armor="+d.map(function(r,o,n){var a=r[b[o]];for(var t in a.s)t in F?F[t]+=a.s[t]:"$"!=t[0]&&(F[t]=a.s[t]);return armor[e][o].indexOf(a)}).join("~");var G=[];do{for(var i=vm.selected[I[0]].n,H=A[i],K=null,c=0,w=H[0];c<H.length;w=H[++c])w.hole[1]==I[1]&&w.hole[2]==I[2]&&w.hole[3]==I[3]&&(K=w);if(K){var Q=K.use;I=[I[0]-1,I[1]-Q[1],I[2]-Q[2],I[3]-Q[3]];for(var c=0;c<t[i].length;c++){var W=t[i][c];if(Q[W.h]>0){for(var m in W.s)m in F?F[m]+=W.s[m]*Q[W.h]:"$"!=m[0]&&(F[m]=W.s[m]*Q[W.h]);G.push(gem.indexOf(W)+"*"+Q[W.h])}}}else I=[I[0]-1,I[1],I[2],I[3]]}while(I[0]>=0&&(0!=I[1]||0!=I[2]||0!=I[3]));B[3]="gem="+G.join("~"),B[4]="own="+Object.keys(F).map(function(e,r,o){return e+"*"+F[e]}).join("~");for(var X=0,m=0;n>m;m++){var i=vm.selected[m].n;vm.selected[m].r>F[i]&&(X++,vm.selected[m].s&&vm.stone.push(vm.selected[m].s))}X>(vm.hasStone?0:Math.min(2,vm.stone.size()))?vm.result="无法配出":vm.result=vm.hasStone?"使用已有护石可以配出":resultMessage[vm.stone.size()],location.hash="#!/result?"+B.join("&"),vm.popup=""},100)},reload:function(){vm.popup="before_loading",vm.closable=!0},load:function(){}});vm.$watch("condition",function(e,r){vm.skill=skill.filter(enable)}),vm.$watch("popup",function(e,r){""!=e&&(document.documentElement.scrollTop=0,document.body.scrollTop=0)}),require(["domReady!","mmRequest","mmRouter"],function(){if(vm.last=localStorage.getItem("update"),vm.last)if(vm.last=new Date(vm.last),vm.last.getTime()>1459500579761){vm.popup="loading",vm.closable=!1,vm.info="读取本地缓存…";var e=new Promise(function(e,r){armor=JSON.parse(localStorage.getItem("armor")),skill=JSON.parse(localStorage.getItem("skill")),gem=JSON.parse(localStorage.getItem("gem")),e("读取本地缓存…")});e.then(function(){vm.popup=""})}else vm.popup="before_loading",vm.closable=!1;else vm.popup="before_loading",vm.closable=!1;vm.load=function(){var e=[4,0,2,1,3];vm.popup="loading",vm.closable=!1,vm.info="数据读取中…",avalon.getScript("http://c.gamer.qq.com/mho/rsync_cdn_filename_all.js").done(function(){armor=[[[],[],[],[],[]],[[],[],[],[],[]]],skill=[],gem=[],vm.selected=[];for(var r in equipcb){var o=equipcb[r],n=o.iID,a=o.data;if(n>=6e4&&7e4>n&&a[12]>=40){for(var t=a[3],l=e[n%5],s=[],m=21;37>m;m+=3)""!=a[m]&&s.push(a[m]+"x"+a[m+1]);for(var i={},m=38;47>m;m+=2)"#N/A"!=a[m]&&(i[a[m]]=parseInt(a[m+1],10));o={n:a[1],h:a[5],m:s.join("，"),s:i,o:!1},armor[t][l].push(o)}else if(n>=1e6&&2e6>n)skillEffect[a[3]]=95;else if(n>=2e6&&3e6>n)stone[a[2]]=a.slice(2),skillEffect[a[2]]=0!=a[7]?parseInt(100/a[7],10):parseInt(100/a[6],10);else if(n>=5e6&&6e6>n){var s=[a[13]+"x"+a[14],a[15]+"x"+a[16]];""!=a[17]&&s.push(a[17]+"x"+a[18]);var i={};i[a[5]]=parseInt(a[6],10),""!=a[8]&&(i[a[8]]=parseInt(a[9],10)),o={n:a[2],h:a[3],m:s.join("，"),s:i,o:!1},gem.push(o)}}Object.keys(skillEffect).forEach(function(e){skill.push({n:e,v:skillEffect[e],s:stone[e]})}),localStorage.setItem("armor",JSON.stringify(armor)),localStorage.setItem("skill",JSON.stringify(skill)),localStorage.setItem("gem",JSON.stringify(gem)),vm.last=new Date,localStorage.setItem("update",vm.last),vm.popup=""}).fail(function(){vm.info="数据读取失败…请稍后再试"})},avalon.router.get("/param",function(){vm.view="param"}),avalon.router.get("/result",function(){vm.view="result",""==vm.result&&(vm.stone=[]),vm.armor=[],vm.gem=[],vm.own=[];var e=this.query.ranged,r=this.query.skill.split("~");this.query.armor.split("~").forEach(function(r,o){vm.armor.push(armor[e][o][r])}),this.query.gem.split("~").forEach(function(e,r){var o=e.split("*"),n=gem[o[0]];n.use=o[1],vm.gem.push(n)}),this.query.own.split("~").forEach(function(e,r){var o=e.split("*");vm.own.push({n:o[0],v:o[1]})}),vm.own.sort(function(e,o){var n=100,a=100;return r.forEach(function(r,t){e.n==r&&(n=t),o.n==r&&(a=t)}),n-a})}),avalon.history.start({})});