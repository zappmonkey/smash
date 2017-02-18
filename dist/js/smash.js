window.addEventListener("load",function(s){smash.init()},!1);var smash={};smash.init=function(){smash.config.init(),smash.sidebar.init(),smash.searchbox.init(),smash.workspace.init(),smash.input.init()},smash.get=function(s,e){try{return s.querySelector(e)}catch(s){console.log(s)}},smash.getAll=function(s,e){try{return s.querySelectorAll(e)}catch(s){console.log(s)}},smash.hide=function(s,e){for(var a=smash.getAll(s,e),t=0;t<a.length;t++)a[t].style.display="none"},smash.show=function(s,e){for(var a=smash.getAll(s,e),t=0;t<a.length;t++)a[t].style.display=""},smash.on=function(s,e,a,t){for(var n=smash.getAll(s,e),o=0;o<n.length;o++)n[o][a]=t},smash.ajax={_headers_:[]},smash.ajax.addHeader=function(s,e){smash.ajax._headers_[s]=e},smash.ajax._xhr_=function(){if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;for(var s,e=["MSXML2.XmlHttp.6.0","MSXML2.XmlHttp.5.0","MSXML2.XmlHttp.4.0","MSXML2.XmlHttp.3.0","MSXML2.XmlHttp.2.0","Microsoft.XmlHttp"],a=0;a<e.length;a++)try{s=new ActiveXObject(e[a]);break}catch(s){}return s},smash.ajax.send=function(s,e,a,t,n,o){void 0===o&&(o=!0);var r=smash.ajax._xhr_();r.responseType=n,r.open(a,s,o),r.onreadystatechange=function(){4==r.readyState&&(200==r.status||201==r.status?e&&e(r.response):console.log(r.status,r.response))},"json"==n?r.setRequestHeader("Content-type","application/json"):"POST"==a&&r.setRequestHeader("Content-type","application/x-www-form-urlencoded");for(var i in smash.ajax._headers_)r.setRequestHeader(i,smash.ajax._headers_[i]);r.send(t)},smash.ajax.get=function(s,e,a,t,n){var o=[];for(var r in a)o.push(encodeURIComponent(r)+"="+encodeURIComponent(a[r]));smash.ajax.send(s+(o.length?"?"+o.join("&"):""),e,"GET",null,t,n)},smash.ajax.post=function(s,e,a,t,n){var o;if(a)if("json"!=t){var r=[];for(var i in a)r.push(encodeURIComponent(i)+"="+encodeURIComponent(a[i]));o=r.join("&")}else o=JSON.stringify(a);smash.ajax.send(s,e,"POST",o,t,n)},smash.class={},smash.class.add=function(s,e){smash.class.has(s,e)||(s.classList?s.classList.add(e):s.className+=" "+e)},smash.class.remove=function(s,e){smash.class.has(s,e)&&(s.classList?s.classList.remove(e):s.className=s.className.replace(e,""))},smash.class.has=function(s,e){return(" "+s.className+" ").replace(/[\n\t]/g," ").indexOf(" "+e+" ")>-1},smash.class.toggle=function(s,e){smash.class.has(s,e)?smash.class.remove(s,e):smash.class.add(s,e)},smash.config={_values_:{_sidebar_lock_:!1}},smash.config.init=function(){var s=smash.storage.get("config");s&&(smash.config._values_=s)},smash.config.get=function(s){var e="_"+s+"_";if(e in smash.config._values_)return smash.config._values_[e];throw new smash.Exception("001",'Invalid config option "'+s+'"')},smash.config.set=function(s,e){var a="_"+s+"_";if(!a in smash.config._values_)throw new smash.Exception("001",'Invalid config option "'+s+'"');smash.config._values_[a]=e,smash.storage.set("config",smash.config._values_)},smash.Exception=function(s,e){this.value=s,this.message=e,this.toString=function(){return"SmashException "+this.value+": "+this.message}},smash.input={},smash.input.init=function(){for(var s,e=document.querySelectorAll(".smash-input.has-floating-label input"),a=0;a<e.length;a++){s=e[a],smash.class.remove(s.parentElement,"has-floating-label"),smash.class.add(s.parentElement,"floating-label");var t=document.createElement("label");t.innerHTML=s.placeholder,s.parentElement.appendChild(t),s.onkeyup=function(s){var e=this.parentElement.querySelector("label");e&&(""!=s.srcElement.value?smash.class.add(e,"show"):smash.class.remove(e,"show"))}}for(var n,o=document.querySelectorAll(".smash-select select"),a=0;a<o.length;a++){if(n=o[a],smash.class.has(n.parentElement,"has-floating-label")){smash.class.remove(n.parentElement,"has-floating-label"),smash.class.add(n.parentElement,"floating-label");var t=document.createElement("label");t.innerHTML=n.getAttribute("placeholder"),n.parentElement.appendChild(t)}var s=document.createElement("input");s.type="text",s.placeholder=n.getAttribute("placeholder"),s.setAttribute("readonly","readonly"),n.parentElement.appendChild(s);for(var r=n.querySelectorAll("option"),i=document.createElement("ul"),c=0;c<r.length;c++){var h=r[c];if(h.getAttribute("value")){var m=document.createElement("li");m.setAttribute("value",h.value),m.innerHTML=h.innerHTML,i.appendChild(m),m.onmousedown=function(s){var e=this.getAttribute("value"),a=this.parentElement.parentElement;smash.class.remove(a,"is-focussed"),window.onmousedown=null,a.querySelector("select").value=e,a.querySelector("input").value=this.innerHTML,a.querySelector("input").focus(),a.querySelector("input").onfocus(),s.stopPropagation()}}}n.parentElement.appendChild(i),s.onfocus=function(s){var e=this.parentElement.querySelector("label");e&&(""!=this.value?smash.class.add(e,"show"):smash.class.remove(e,"show"))},n.parentElement.onclick=function(){smash.class.add(this,"is-focussed");var s=this;window.onmousedown=function(){console.log("click outside"),window.onmousedown=null,smash.class.remove(s,"is-focussed")}}}},smash.router={__parseRouteRegex:/{(.*?)}/gi,__dynamicParts:[],__routes:{static:[],dynamic:[]}},smash.router.add=function(s,e){var a=smash.router.parseRoute(s);return a.regex?(a.callback=e,smash.router.__routes.dynamic[a.depth]||(smash.router.__routes.dynamic[a.depth]=[]),smash.router.__routes.dynamic[a.depth][a.numVars]||(smash.router.__routes.dynamic[a.depth][a.numVars]=[]),void smash.router.__routes.dynamic[a.depth][a.numVars].push(a)):void(smash.router.__routes.static[s]=e)},smash.router.set=function(s){window.history.pushState("","",s),window.dispatchEvent(new Event("popstate"))},smash.router.redirect=function(s){window.location=s},smash.router.handleNotFound=function(s){console.log("route: "+JSON.stringify(s)+" does not exist")},smash.router.run=function(){window.onpopstate=function(s){smash.router.execute()},smash.router.execute()},smash.router.execute=function(){var s=this.getPath();if(this.__routes.static[s.path])return void this.__routes.static[s.path]();var e=s.path.split("/").length-1;if(this.__routes.dynamic[e]){var a,t,n={};for(var o in this.__routes.dynamic[e])for(var r in this.__routes.dynamic[e][o]){var a=this.__routes.dynamic[e][o][r];if(t=s.path.match(a.regex)){for(var i=0;i<a.numVars;i++)n[a.vars[i]]=t[i+1];return void a.callback(n)}}}smash.router.handleNotFound(s)},smash.router.getPath=function(){var s=document.createElement("a");return s.href=window.location,{host:s.hostname,path:s.pathname}},smash.router.parseRoute=function(s){"/"!=s.substring(0,1)&&(s="/"+s),"/"==s.substring(s.length-2)&&(s="/"+s);var e={path:s,depth:s.split("/").length-1,vars:[],numVars:0};if(smash.router.__dynamicParts=s.match(smash.router.__parseRouteRegex),void 0!=smash.router.__dynamicParts&&null!=smash.router.__dynamicParts){for(var a="^"+s.replace(/\//gi,"\\/")+"$",t=0;t<smash.router.__dynamicParts.length;t++)e.numVars++,e.vars.push(smash.router.__dynamicParts[t].substring(1,smash.router.__dynamicParts[t].length-1)),a=a.replace(smash.router.__dynamicParts[t],"(.*?)");e.regex=new RegExp(a,"i")}return e},smash.router.queryParam=function(s){var e="[\\?&]"+s+"=([^&#]*)",a=new RegExp(e),t=a.exec(window.location.search);if(null!=t)return t[1]},smash.searchbox={i_:!1,minAutoCompleteLength:3},smash.searchbox.init=function(){if(!smash.searchbox.i_){var s=document.querySelector(".smash-searchbox input");s&&(s.onfocus=function(){smash.class.add(document.querySelector(".smash-header"),"is-focussed"),smash.searchbox.dispatchEvent(new Event("focus"))},s.onblur=function(){smash.class.remove(document.querySelector(".smash-header"),"is-focussed")},s.onkeyup=function(s){this.value.length<smash.searchbox.minAutoCompleteLength||smash.searchbox.dispatchEvent(new CustomEvent("autocomplete",{value:this.value}))},smash.searchbox.i_=!0)}},smash.sidebar={i_:!1},smash.sidebar.init=function(){if(!smash.sidebar.i_){var s=document.querySelector(".smash-sidebar .lock");if(s){s.onclick=function(){smash.sidebar.toggleLock()};var e=document.querySelector(".smash-sidebar");smash.class.add(e,"is-unlocked"),smash.sidebar.i_=!0,smash.config.get("sidebar_lock")&&smash.sidebar.toggleLock()}}},smash.sidebar.toggleLock=function(){smash.sidebar.i_&&(smash.class.toggle(document.querySelector(".smash-sidebar .lock"),"unlock"),smash.class.toggle(document.querySelector(".smash-sidebar"),"is-unlocked"),smash.config.set("sidebar_lock",!smash.class.has(document.querySelector(".smash-sidebar"),"is-unlocked")))},smash.storage={},smash.storage.set=function(s,e){localStorage.setItem(s,JSON.stringify(e))},smash.storage.get=function(s){var e=localStorage.getItem(s);if(e)return JSON.parse(e)},smash.storage.clear=function(){localStorage.clear()},smash.workspace={_ws_:void 0,_hdr_:void 0,_sb_:void 0,_tabs_:[]},smash.workspace.init=function(){smash.workspace._ws_=document.querySelector(".smash-workspace"),smash.workspace._ws_&&(smash.workspace._hdr_=document.querySelector(".smash-header"),smash.workspace._hdr_&&smash.class.add(smash.workspace._ws_,"has-header"),smash.workspace._sb_=document.querySelector(".smash-workspace .smash-sidebar"),smash.workspace._sb_&&smash.class.add(smash.workspace._ws_,"has-sidebar"))},smash.workspace.addTab=function(s,e,a){if(!smash.get(document,".smash-tab-pane")){var t=smash.get(document,".smash-panel");if(!t)return void console.log("To add a tab there needs to be a panel");t.innerHTML='<div class="smash-tab-pane"><div class="smash-tabs"></div><div class="smash-panes"></div></div>'}var n=smash.get(document,".smash-tab-pane .smash-tabs"),o=smash.get(document,".smash-tab-pane .smash-panes");if(r=smash.get(n,'.smash-pane[data-id="'+s+'"]'))return void r.onclick();smash.hide(o,".smash-pane"),(active=smash.get(n,".smash-tab.active"))&&smash.class.remove(active,"active");var r=document.createElement("div");r.className="smash-tab active",r.dataset.id=s,r.innerHTML=e+'<i class="material-icons close">close</i>',r.onclick=function(s){(active=smash.get(n,".smash-tab.active"))&&smash.class.remove(active,"active"),smash.class.add(this,"active"),smash.hide(document,".smash-pane"),smash.show(document,'.smash-pane[data-id="'+this.dataset.id+'"]')},smash.on(r,".close","onclick",function(s){smash.class.has(this.parentElement,"active")&&(this.parentElement.previousSibling?this.parentElement.previousSibling.onclick():this.parentElement.nextSibling&&this.parentElement.nextSibling.onclick()),(i=smash.get(document,'.smash-pane[data-id="'+this.parentElement.dataset.id+'"]'))&&i.parentElement.removeChild(i),this.parentElement.parentElement.removeChild(this.parentElement),s.stopPropagation()}),n.appendChild(r);var i=document.createElement("div");i.className="smash-pane",i.dataset.id=s,i.innerHTML=a,o.appendChild(i)};