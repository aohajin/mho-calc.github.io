function initSkill(val){for(var result={},s=0;s<vm.selected.size();s++)result[vm.selected[s].n]=val?eval(val):vm.selected[s].r;return result}function enable(e){var o=!0;return vm.selected.forEach(function(r){e.n==r.n&&(o=!1)}),""!=vm.condition&&e.n.indexOf(vm.condition)<0&&(o=!1),o}function holeMap(e){return function(o,r){return r==e?o+1:o}}function shortMap(e,o){for(var r={},l=0;l<vm.selected.size();l++){var a=vm.selected[l].n;r[a]=a in e?Math.max(o[a]-e[a],0):o[a]}return r}function shortVal(e){for(var o=0,r=0;r<vm.selected.size();r++){var l=vm.selected[r].n,a=vm.selected[r].s?Math.max(vm.selected[r].s[4],vm.selected[r].s[5]):0;o+=0==e[l]?0:1e3+e[l]*vm.selected[r].v+(e[l]>a?1e4:0)}return o}avalon.config({baseUrl:"lib",debug:!1});var armor=[[[],[],[],[],[]],[[],[],[],[],[]]],gem=[],skillEffect={},skill=[],stone={},estimate_hv=[0,14,32,61],vm=avalon.define({$id:"mho",popup:"",closable:!0,skill:[],selected:[],armor:[],gem:[],stone:[],own:[],info:"",condition:"",$computed:{ranged:{set:function(e){localStorage.setItem("ranged",e)},get:function(){return localStorage.getItem("ranged")?eval(localStorage.getItem("ranged")):!1}}},hidePopup:function(e){vm.closable&&"div"==e.target.nodeName.toLowerCase()&&(vm.popup="")},listSkill:function(){vm.skill=skill.filter(enable),vm.closable=!0,vm.popup="skill_choose"},addSkill:function(e,o){vm.selected.push({n:e.n,v:e.v,r:10,s:e.s}),vm.condition="",vm.popup=""},skillMinus:function(e){e.r--},skillPlus:function(e){e.r++},skillJoin:function(e){var o=[];for(var r in e)o.push(r+e[r]);return o.join("，")},showChosen:function(e){e.o=!e.o},secondary:!1,showSecondary:function(){vm.secondary=!vm.secondary},calc:function(){vm.popup="loading",vm.closable=!1,vm.info="计算中，请稍候…",setTimeout(function(){var e=vm.ranged?1:0;vm.stone=[];for(var o=[[],[],[],[],[]],r=[{},{},{},{},{}],l=vm.selected.size(),a=initSkill("[]"),n=0;l>n;n++){var t=vm.selected[n].n;for(var s in gem)t in gem[s].s&&gem[s].s[t]>0&&a[t].push(gem[s])}for(var i=[[],[],[],[],[]],s=0;5>s;s++){var v=!0;for(var m in armor[e][s]){for(var c=armor[e][s][m].h,h=0,n=0;l>n;n++){var t=vm.selected[n].n;t in armor[e][s][m].s&&(h+=vm.selected[n].v*armor[e][s][m].s[t])}(h>0||v&&3==c)&&(armor[e][s][m].val=h+estimate_hv[armor[e][s][m].h],i[s].push(armor[e][s][m]))}i[s].sort(function(e,o){return o.val-e.val})}for(var f=shortVal(initSkill()),u=[],p={},d={},g=[],k=[Math.min(i[0].length,3),Math.min(i[1].length,3),Math.min(i[2].length,3),Math.min(i[3].length,3),Math.min(i[4].length,3)],M=0;M<k[0];M++){r[0]=shortMap(i[0][M].s,initSkill()),o[0]=[0,0,0,0].map(holeMap(i[0][M].h));for(var S=0;S<k[1];S++){r[1]=shortMap(i[1][S].s,r[0]),o[1]=o[0].map(holeMap(i[1][S].h));for(var b=0;b<k[2];b++){r[2]=shortMap(i[2][b].s,r[1]),o[2]=o[1].map(holeMap(i[2][b].h));for(var I=0;I<k[3];I++){r[3]=shortMap(i[3][I].s,r[2]),o[3]=o[2].map(holeMap(i[3][I].h));for(var w=0;w<k[4];w++){r[4]=shortMap(i[4][w].s,r[3]),o[4]=o[3].map(holeMap(i[4][w].h));for(var y=initSkill("[]"),E=initSkill("[]"),O=[[[]]],x=shortVal(r[4]),n=0;l>n;n++){var t=vm.selected[n].n,N=a[t].length;if(N>0&&r[4][t]>0){for(var J=[0,0,0,0],j=r[4][t],z=[0,0,0,0],$=vm.selected[n].s?Math.max(vm.selected[n].s[4],vm.selected[n].s[5]):0,_=r[4][t]<=$,T=1e3+j*vm.selected[n].v+(_?0:1e4),s=0;N>s;s++){var C=a[t][N-s-1].s[t],c=a[t][N-s-1].h;z[c]=C,j>0&&(J[c]=Math.min(Math.ceil(j/C),o[4][c]),j-=J[c]*C)}for(var D=J[3];D>=0;D--)if(j=r[4][t]-D*z[3],j>0)for(var P=z[2]>0?Math.min(Math.ceil(j/z[2]),o[4][2]+o[4][3]-D):0,V=P;V>=0;V--){var q=j-V*z[2];if(q>0)for(var R=z[1]>0?Math.min(Math.ceil(q/z[1]),o[4][1]+3*(o[4][3]-D)+2*(o[4][2]-V)):0,A=R;A>=0;A--){var L=q-A*z[1];L>0?E[t].push({val:(r[4][t]-L)*vm.selected[n].v+($>=L&&!_?1e4:0),h1:A,h2:V,h3:D}):E[t].push({val:T,h1:A,h2:V,h3:D})}else E[t].push({val:T,h1:0,h2:V,h3:D})}else E[t].push({val:T,h1:0,h2:0,h3:D})}for(var D=o[4][3];D>=0;D--)for(var V=o[4][2]+o[4][3]-D;V>=0;V--)for(var A=o[4][1]+3*(o[4][3]-D)+2*(o[4][2]-V);A>=0;A--){for(var U=0==n?x:O[A][V][D];O.length<=A;)O.push([[]]);for(;O[A].length<=V;)O[A].push([]);for(;O[A][V].length<=D;)O[A][V].push(0);for(var s=0;s<E[t].length;s++)if(D>=E[t][s].h3&&V>=E[t][s].h2&&A>=E[t][s].h1){var B=0==n?x:O[A-E[t][s].h1][V-E[t][s].h2][D-E[t][s].h3],F=B-E[t][s].val;U>F&&(U=F,y[t].push({h1:A,h2:V,h3:D,mono:s}),f>F&&(f=F,u=[M,S,b,I,w],p=E,g=[n,A,V,D],d=y))}O[A][V][D]=U}}}}}}}var G=initSkill("0");vm.armor=[];for(var s=0;5>s;s++){var H=i[s][u[s]];for(var n in H.s)n in G?G[n]+=H.s[n]:"$"!=n[0]&&(G[n]=H.s[n]);vm.armor.push(H)}vm.gem=[];do{for(var t=vm.selected[g[0]].n,K=d[t],Q=null,s=0,c=K[0];s<K.length;c=K[++s])c.h1==g[1]&&c.h2==g[2]&&c.h3==g[3]&&(Q=c);if(Q){var W=p[t][Q.mono];g=[g[0]-1,g[1]-W.h1,g[2]-W.h2,g[3]-W.h3];for(var s=0;s<a[t].length;s++){var X=a[t][s];X.use=W["h"+X.h];for(var n in X.s)n in G?G[n]+=X.s[n]*X.use:"$"!=n[0]&&(G[n]=X.s[n]*X.use);X.use>0&&vm.gem.push(X)}}else g=[g[0]-1,g[1],g[2],g[3]]}while(g[0]>=0&&(0!=g[1]||0!=g[2]||0!=g[3]));vm.own=[],Object.keys(G).forEach(function(e){vm.own.push({n:e,v:G[e]})}),vm.own.sort(function(e,o){var r=vm.selected.size(),l=r;return vm.selected.forEach(function(a,n){e.n==a.n&&(r=n),o.n==a.n&&(l=n)}),r-l});for(var n=0;n<vm.selected.size();n++){var t=vm.selected[n].n;vm.selected[n].s&&vm.selected[n].r>G[t]&&vm.stone.push(vm.selected[n].s)}vm.popup=""},100)},reload:function(){vm.popup="before_loading",vm.closable=!0},load:function(){}});vm.$watch("condition",function(e,o){vm.skill=skill.filter(enable)}),vm.$watch("popup",function(e,o){""!=e&&(document.documentElement.scrollTop=0,document.body.scrollTop=0)}),require(["domReady!","mmRequest"],function(){var e=localStorage.getItem("update");if(e)if(new Date(e).getTime()>1456200635506){vm.popup="loading",vm.closable=!1,vm.info="读取本地缓存…";var o=new Promise(function(e,o){armor=JSON.parse(localStorage.getItem("armor")),skill=JSON.parse(localStorage.getItem("skill")),gem=JSON.parse(localStorage.getItem("gem")),e("读取本地缓存…")});o.then(function(){vm.popup=""})}else vm.popup="before_loading",vm.closable=!1;else vm.popup="before_loading",vm.closable=!1;vm.load=function(){vm.popup="loading",vm.closable=!1,vm.info="数据读取中…",avalon.get("all.json").done(function(e){if(0==e.errCode&&"success"==e.msg){armor=[[[],[],[],[],[]],[[],[],[],[],[]]],skill=[],gem=[],vm.selected=[];var o=e.result;for(var r in o){var l=o[r],a=l.iID,n=l.data;if(a>=6e4&&7e4>a&&n[12]>=40){for(var t=n[3],s=a%5,i=[],v=21;37>v;v+=3)""!=n[v]&&i.push(n[v]+"x"+n[v+1]);for(var m={},v=38;47>v;v+=2)"#N/A"!=n[v]&&(m[n[v]]=parseInt(n[v+1],10));l={n:n[1],h:n[5],m:i.join("，"),s:m,o:!1},armor[t][s].push(l)}else if(a>=1e6&&2e6>a)skillEffect[n[3]]=95;else if(a>=2e6&&3e6>a)stone[n[2]]=n.slice(2),skillEffect[n[2]]=0!=n[7]?parseInt(100/n[7],10):parseInt(100/n[6],10);else if(a>=5e6&&6e6>a){var i=[n[13]+"x"+n[14],n[15]+"x"+n[16]];""!=n[17]&&i.push(n[17]+"x"+n[18]);var m={};m[n[5]]=parseInt(n[6],10),""!=n[8]&&(m[n[8]]=parseInt(n[9],10)),l={n:n[2],h:n[3],m:i.join("，"),s:m,o:!1},gem.push(l)}}Object.keys(skillEffect).forEach(function(e){skill.push({n:e,v:skillEffect[e],s:stone[e]})}),localStorage.setItem("armor",JSON.stringify(armor)),localStorage.setItem("skill",JSON.stringify(skill)),localStorage.setItem("gem",JSON.stringify(gem)),localStorage.setItem("update",new Date),vm.popup=""}else vm.info="数据读取失败…请稍后再试"}).fail(function(){vm.info="数据读取失败…请稍后再试"})}});