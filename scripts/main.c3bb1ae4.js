function initSkill(e){for(var r={},o=0;o<e.size();o++)r[e[o].n]=0;return r}function enable(e){var r=!0;return vm.selected.forEach(function(o){e.n==o.n&&(r=!1)}),""!=vm.condition&&e.n.indexOf(vm.condition)<0&&(r=!1),r}avalon.config({baseUrl:"lib",debug:!1});var armor=[[[],[],[],[],[]],[[],[],[],[],[]]],gem=[],skill=[],vm=avalon.define({$id:"mho",popup:"",skill:[],selected:[],armor:[],gem:[],own:[],condition:"",$computed:{ranged:{set:function(e){localStorage.setItem("ranged",e)},get:function(){return localStorage.getItem("ranged")?eval(localStorage.getItem("ranged")):!1}}},hidePopup:function(e){"div"==e.target.nodeName.toLowerCase()&&(vm.popup="")},listSkill:function(){vm.skill=skill.filter(enable),vm.popup="skill_choose"},addSkill:function(e,r,o){vm.selected.push({n:e,v:r,r:10}),vm.condition="",vm.popup=""},skillMinus:function(e){e.r--},skillPlus:function(e){e.r++},skillJoin:function(e){var r=[];for(var o in e)r.push(o+e[o]);return r.join("，")},showChosen:function(e){e.o=!e.o},calc:function(){var e=initSkill(vm.selected),r=vm.ranged?1:0,o={};vm.gem=[];do{o=initSkill(vm.selected),vm.armor=[];for(var n=0;5>n;n++){var t=0,l=-1;for(var i in armor[r][n]){for(var a=15*armor[r][n][i].h,m=0;m<vm.selected.size();m++){var s=vm.selected[m].n;s in armor[r][n][i].s&&(a+=(vm.selected[m].v-e[s])*armor[r][n][i].s[s])}a>t&&(t=a,l=i)}t>0&&vm.armor.push(armor[r][n][l])}for(var v=0,c=0,m=0;m<vm.selected.size();m++){for(var s=vm.selected[m].n,n=0;n<vm.armor.size();n++)s in vm.armor[n].s&&(o[s]+=vm.armor[n].s[s]);o[s]>vm.selected[m].r?(e[s]++,v++):o[s]<vm.selected[m].r&&c++}}while(v>0&&c>0);var f=0;o=initSkill(vm.selected),vm.own=[];for(var n=0;n<vm.armor.size();n++){vm.armor[n].h>f&&(f=vm.armor[n].h);for(var m in vm.armor[n].s)m in o?o[m]+=vm.armor[n].s[m]:o[m]=vm.armor[n].s[m]}Object.keys(o).forEach(function(e){vm.own.push({n:e,v:o[e]})}),vm.own.sort(function(e,r){var o=vm.selected.size(),n=o;return vm.selected.forEach(function(t,l){e.n==t.n&&(o=l),r.n==t.n&&(n=l)}),o-n});for(var n in gem)for(var m=0;m<vm.selected.size();m++){var s=vm.selected[m].n;s in gem[n].s&&gem[n].s[s]>0&&gem[n].s[s]<=vm.selected[m].r-o[s]&&vm.gem.push(gem[n])}},reload:function(){}});vm.$watch("condition",function(e,r){vm.skill=skill.filter(enable)}),require(["domReady!","mmRequest"],function(){function e(e){return new Promise(function(r,o){e&&localStorage.getItem("update")?(armor=JSON.parse(localStorage.getItem("armor")),skill=JSON.parse(localStorage.getItem("skill")),gem=JSON.parse(localStorage.getItem("gem")),r("读取本地缓存…")):avalon.get("all.json").done(function(e){if(0==e.errCode&&"success"==e.msg){armor=[[[],[],[],[],[]],[[],[],[],[],[]]],skill=[],gem=[],vm.selected=[];var n=e.result;for(var t in n){var l=n[t],i=l.iID,a=l.data;if(i>=6e4&&7e4>i&&a[12]>=40){for(var m=""==a[3]?0:1,s=i%5,v=[],c=21;37>c;c+=3)""!=a[c]&&v.push(a[c]+"x"+a[c+1]);for(var f={},c=38;47>c;c+=2)"#N/A"!=a[c]&&(f[a[c]]=parseInt(a[c+1],10));l={n:a[1],h:a[5],m:v.join("，"),s:f,o:!1},armor[m][s].push(l)}else if(i>=1e6&&2e6>i)skill.push({n:a[3],v:10});else if(i>=2e6&&3e6>i)skill.indexOf({n:a[2],v:10})>0&&console.log(1);else if(i>=5e6&&6e6>i){var v=[a[13]+"x"+a[14],a[15]+"x"+a[16]];""!=a[17]&&v.push(a[17]+"x"+a[18]);var f={};f[a[5]]=parseInt(a[6],10),""!=a[8]&&(f[a[8]]=parseInt(a[9],10)),l={n:a[2],h:a[3],m:v.join("，"),s:f,o:!1},gem.push(l)}}localStorage.setItem("armor",JSON.stringify(armor)),localStorage.setItem("skill",JSON.stringify(skill)),localStorage.setItem("gem",JSON.stringify(gem)),localStorage.setItem("update",new Date),r("数据读取成功…")}else o("数据读取失败…")}).fail(function(){o("数据读取失败…")})})}e(!0).then(function(e){console.log(e)}),vm.reload=function(){e(!1).then(function(e){console.log(e)})}});