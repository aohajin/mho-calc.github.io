function initSkill(e){for(var o={},l=0;l<e.size();l++)o[e[l].n]=0;return o}function enable(e){var o=!0;return vm.selected.forEach(function(l){e.n==l.n&&(o=!1)}),""!=vm.condition&&e.n.indexOf(vm.condition)<0&&(o=!1),o}avalon.config({baseUrl:"lib",debug:!1});var armor=[[[],[],[],[],[]],[[],[],[],[],[]]],gem=[],skillEffect={},skill=[],stone={},holeValue=[0,14,32,61],vm=avalon.define({$id:"mho",popup:"",closable:!0,skill:[],selected:[],armor:[],gem:[],stone:[],own:[],info:"",condition:"",$computed:{ranged:{set:function(e){localStorage.setItem("ranged",e)},get:function(){return localStorage.getItem("ranged")?eval(localStorage.getItem("ranged")):!1}}},hidePopup:function(e){vm.closable&&"div"==e.target.nodeName.toLowerCase()&&(vm.popup="")},listSkill:function(){vm.skill=skill.filter(enable),vm.closable=!0,vm.popup="skill_choose"},addSkill:function(e,o){vm.selected.push({n:e.n,v:e.v,r:10,hv:[0,0,0,0],s:e.s}),vm.condition="",vm.popup=""},skillMinus:function(e){e.r--},skillPlus:function(e){e.r++},skillJoin:function(e){var o=[];for(var l in e)o.push(l+e[l]);return o.join("，")},showChosen:function(e){e.o=!e.o},secondary:!1,showSecondary:function(){vm.secondary=!vm.secondary},calc:function(){var e=initSkill(vm.selected),o=vm.ranged?1:0,l={};vm.gem=[],vm.stone=[],holeValue=[0,0,0,0];for(var r=1;3>=r;r++)for(var n=0;n<vm.selected.size();n++){var s=vm.selected[n].n;for(var m in gem)s in gem[m].s&&gem[m].s[s]>0&&gem[m].h==r&&(vm.selected[n].hv[r]=gem[m].s[s]*vm.selected[n].v)}for(var r=1;3>=r;r++){for(var n=0;n<vm.selected.size();n++){var s=vm.selected[n].n;0==vm.selected[n].hv[r]&&(vm.selected[n].hv[r]=1==r?10:vm.selected[n].hv[1]+vm.selected[n].hv[r-1]),holeValue[r]+=vm.selected[n].hv[r]}holeValue[r]=holeValue[r]/vm.selected.size()}do{l=initSkill(vm.selected),vm.armor=[];for(var m=0;5>m;m++){var t=0,a=-1;for(var v in armor[o][m]){for(var i=holeValue[armor[o][m][v].h],n=0;n<vm.selected.size();n++){var s=vm.selected[n].n;s in armor[o][m][v].s&&(i+=vm.selected[n].v*armor[o][m][v].s[s]*vm.selected[n].r/(vm.selected[n].r+1.5*e[s]))}i>t&&(t=i,a=v)}t>0&&vm.armor.push(armor[o][m][a])}for(var c=0,f=0,n=0;n<vm.selected.size();n++){for(var s=vm.selected[n].n,m=0;m<vm.armor.size();m++)s in vm.armor[m].s&&(l[s]+=vm.armor[m].s[s]);l[s]>vm.selected[n].r+e[s]?(e[s]++,c++):l[s]<vm.selected[n].r&&f++}}while(c>0&&f>0);var d=0;l=initSkill(vm.selected),vm.own=[];for(var m=0;m<vm.armor.size();m++){vm.armor[m].h>d&&(d=vm.armor[m].h);for(var n in vm.armor[m].s)n in l?l[n]+=vm.armor[m].s[n]:l[n]=vm.armor[m].s[n]}Object.keys(l).forEach(function(e){vm.own.push({n:e,v:l[e]})}),vm.own.sort(function(e,o){var l=vm.selected.size(),r=l;return vm.selected.forEach(function(n,s){e.n==n.n&&(l=s),o.n==n.n&&(r=s)}),l-r});for(var n=0;n<vm.selected.size();n++){var s=vm.selected[n].n;vm.selected[n].s&&vm.selected[n].r>l[s]&&vm.stone.push(vm.selected[n].s);for(var m in gem)s in gem[m].s&&gem[m].s[s]>0&&gem[m].s[s]<=vm.selected[n].r-l[s]&&vm.gem.push(gem[m])}},reload:function(){vm.popup="before_loading",vm.closable=!0},load:function(){}});vm.$watch("condition",function(e,o){vm.skill=skill.filter(enable)}),vm.$watch("popup",function(e,o){""!=e&&(document.documentElement.scrollTop=0,document.body.scrollTop=0)}),require(["domReady!","mmRequest"],function(){var e=localStorage.getItem("update");if(e)if(new Date(e).getTime()>1454463500588){vm.popup="loading",vm.closable=!1,vm.info="读取本地缓存…";var o=new Promise(function(e,o){armor=JSON.parse(localStorage.getItem("armor")),skill=JSON.parse(localStorage.getItem("skill")),gem=JSON.parse(localStorage.getItem("gem")),e("读取本地缓存…")});o.then(function(){vm.popup=""})}else vm.popup="loading",vm.info="已更新算法和数据，旧数据仍然可用，建议点击“重新读取数据”更新数据…",vm.closable=!0;else vm.popup="before_loading",vm.closable=!1;vm.load=function(){vm.popup="loading",vm.closable=!1,vm.info="数据读取中…",avalon.get("all.json").done(function(e){if(0==e.errCode&&"success"==e.msg){armor=[[[],[],[],[],[]],[[],[],[],[],[]]],skill=[],gem=[],vm.selected=[];var o=e.result;for(var l in o){var r=o[l],n=r.iID,s=r.data;if(n>=6e4&&7e4>n&&s[12]>=40){for(var m=s[3],t=n%5,a=[],v=21;37>v;v+=3)""!=s[v]&&a.push(s[v]+"x"+s[v+1]);for(var i={},v=38;47>v;v+=2)"#N/A"!=s[v]&&(i[s[v]]=parseInt(s[v+1],10));r={n:s[1],h:s[5],m:a.join("，"),s:i,o:!1},armor[m][t].push(r)}else if(n>=1e6&&2e6>n)"无"!=s[3]&&(skillEffect[s[3]]=10);else if(n>=2e6&&3e6>n)stone[s[2]]=s.slice(2),skillEffect[s[2]]=0==s[7]?7:parseInt(100/s[7],10);else if(n>=5e6&&6e6>n){var a=[s[13]+"x"+s[14],s[15]+"x"+s[16]];""!=s[17]&&a.push(s[17]+"x"+s[18]);var i={};i[s[5]]=parseInt(s[6],10),""!=s[8]&&(i[s[8]]=parseInt(s[9],10)),r={n:s[2],h:s[3],m:a.join("，"),s:i,o:!1},gem.push(r)}}Object.keys(skillEffect).forEach(function(e){skill.push({n:e,v:skillEffect[e],s:stone[e]})}),localStorage.setItem("armor",JSON.stringify(armor)),localStorage.setItem("skill",JSON.stringify(skill)),localStorage.setItem("gem",JSON.stringify(gem)),localStorage.setItem("update",new Date),vm.popup=""}else vm.info="数据读取失败…请稍后再试"}).fail(function(){vm.info="数据读取失败…请稍后再试"})}});