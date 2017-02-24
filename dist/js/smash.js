window.addEventListener("load",function(s){smash.init()},!1);var smash={};smash.init=function(){smash.config.init(),smash.sidebar.init(),smash.searchbox.init(),smash.workspace.init(),smash.input.init()},smash.get=function(s,e){try{return s.querySelector(e)}catch(s){console.log(s)}},smash.getAll=function(s,e){try{return s.querySelectorAll(e)}catch(s){console.log(s)}},smash.hide=function(s,e){for(var a=smash.getAll(s,e),t=0;t<a.length;t++)a[t].style.display="none"},smash.show=function(s,e){for(var a=smash.getAll(s,e),t=0;t<a.length;t++)a[t].style.display=""},smash.on=function(s,e,a,t){for(var n=smash.getAll(s,e),r=0;r<n.length;r++)n[r][a]=t},smash.ajax={_headers_:[]},smash.ajax.addHeader=function(s,e){smash.ajax._headers_[s]=e},smash.ajax.removeHeader=function(s){delete smash.ajax._headers_[s]},smash.ajax._xhr_=function(){if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;for(var s,e=["MSXML2.XmlHttp.6.0","MSXML2.XmlHttp.5.0","MSXML2.XmlHttp.4.0","MSXML2.XmlHttp.3.0","MSXML2.XmlHttp.2.0","Microsoft.XmlHttp"],a=0;a<e.length;a++)try{s=new ActiveXObject(e[a]);break}catch(s){}return s},smash.ajax.send=function(s,e,a,t,n,r){void 0===r&&(r=!0);var o=smash.ajax._xhr_();o.responseType=n,o.onreadystatechange=function(){4==o.readyState&&(200==o.status||201==o.status?e&&e(o.response):console.log(o.status,o.response))},o.open(a,s,r),"json"==n?o.setRequestHeader("Content-type","application/json"):"POST"==a&&o.setRequestHeader("Content-type","application/x-www-form-urlencoded");for(var i in smash.ajax._headers_)o.setRequestHeader(i,smash.ajax._headers_[i]);o.send(t)},smash.ajax.get=function(s,e,a,t,n){var r=[];for(var o in a)r.push(encodeURIComponent(o)+"="+encodeURIComponent(a[o]));smash.ajax.send(s+(r.length?"?"+r.join("&"):""),e,"GET",null,t,n)},smash.ajax.post=function(s,e,a,t,n){var r;if(a)if("json"!=t){var o=[];for(var i in a)o.push(encodeURIComponent(i)+"="+encodeURIComponent(a[i]));r=o.join("&")}else r=JSON.stringify(a);smash.ajax.send(s,e,"POST",r,t,n)},smash.class={},smash.class.add=function(s,e){smash.class.has(s,e)||(s.classList?s.classList.add(e):s.className+=" "+e)},smash.class.remove=function(s,e){smash.class.has(s,e)&&(s.classList?s.classList.remove(e):s.className=s.className.replace(e,""))},smash.class.has=function(s,e){return(" "+s.className+" ").replace(/[\n\t]/g," ").indexOf(" "+e+" ")>-1},smash.class.toggle=function(s,e){smash.class.has(s,e)?smash.class.remove(s,e):smash.class.add(s,e)},smash.config={_values_:{_sidebar_lock_:!1}},smash.config.init=function(){var s=smash.storage.get("config");s&&(smash.config._values_=s)},smash.config.get=function(s){var e="_"+s+"_";if(e in smash.config._values_)return smash.config._values_[e];throw new smash.Exception("001",'Invalid config option "'+s+'"')},smash.config.set=function(s,e){var a="_"+s+"_";if(!a in smash.config._values_)throw new smash.Exception("001",'Invalid config option "'+s+'"');smash.config._values_[a]=e,smash.storage.set("config",smash.config._values_)},smash.Exception=function(s,e){this.value=s,this.message=e,this.toString=function(){return"SmashException "+this.value+": "+this.message}},smash.input={},smash.input.init=function(){for(var s,e=document.querySelectorAll(".smash-input input, .smash-textarea textarea"),a=0;a<e.length;a++)if(s=e[a],!smash.class.has(s.parentElement,"smash-initialised")){if(s.parentElement.setValue=function(e){(s=this.querySelector("input"))?(s.value=e,s.onkeyup()):(s=this.querySelector("textarea"))&&(s.value=e,s.onkeyup())},s.parentElement.getValue=function(){if(s=this.querySelector("input")){var s=this.querySelector("input");return s.value}if(s=this.querySelector("textarea")){var s=this.querySelector("input");return s.value}return null},smash.class.has(s.parentElement,"has-floating-label")){smash.class.remove(s.parentElement,"has-floating-label"),smash.class.add(s.parentElement,"floating-label");var t=document.createElement("label");t.innerHTML=s.placeholder,s.parentElement.appendChild(t),s.onkeyup=function(s){var e=this.parentElement.querySelector("label");e&&(""!=this.value?smash.class.add(e,"show"):smash.class.remove(e,"show"))}}s.parentElement.getAttribute("value")&&s.parentElement.setValue(s.parentElement.getAttribute("value")),smash.class.add(s.parentElement,"smash-initialised")}for(var n,r=document.querySelectorAll(".smash-select select"),a=0;a<r.length;a++)if(n=r[a],!smash.class.has(n.parentElement,"smash-initialised")){if(smash.class.has(n.parentElement,"has-floating-label")){smash.class.remove(n.parentElement,"has-floating-label"),smash.class.add(n.parentElement,"floating-label");var t=document.createElement("label");t.innerHTML=n.getAttribute("placeholder"),n.parentElement.appendChild(t)}n.parentElement.setValue=function(s){smash.class.remove(this,"is-focussed");var e=this.querySelector("select"),a=this.querySelector("input");e.value=s,e.selectedIndex>-1&&(a.value=e.options[e.selectedIndex].text),a.focus(),a.onfocus(),e.onchange&&e.onchange()},n.parentElement.getValue=function(){var s=this.querySelector("select");return s.selectedIndex==-1?null:s.options[s.selectedIndex].value};var s=document.createElement("input");s.type="text",s.placeholder=n.getAttribute("placeholder"),s.setAttribute("readonly","readonly"),n.parentElement.appendChild(s);for(var o=n.querySelectorAll("option"),i=document.createElement("ul"),h=0;h<o.length;h++){var c=o[h];if(c.getAttribute("value")){var l=document.createElement("li");l.setAttribute("value",c.value),l.innerHTML=c.innerHTML,i.appendChild(l),l.onmousedown=function(s){this.parentElement.parentElement.setValue(this.getAttribute("value")),s.stopPropagation(),window.onmousedown=null}}}n.parentElement.appendChild(i),s.onfocus=function(s){var e=this.parentElement.querySelector("label");e&&(""!=this.value?smash.class.add(e,"show"):smash.class.remove(e,"show"))},n.parentElement.onclick=function(){smash.class.add(this,"is-focussed");var s=this;window.onmousedown=function(){console.log("click outside"),window.onmousedown=null,smash.class.remove(s,"is-focussed")}},n.parentElement.getAttribute("value")&&n.parentElement.setValue(n.parentElement.getAttribute("value")),smash.class.add(n.parentElement,"smash-initialised")}},smash.router={__parseRouteRegex:/{(.*?)}/gi,__dynamicParts:[],__routes:{static:[],dynamic:[]}},smash.router.add=function(s,e){var a=smash.router.parseRoute(s);return a.regex?(a.callback=e,smash.router.__routes.dynamic[a.depth]||(smash.router.__routes.dynamic[a.depth]=[]),smash.router.__routes.dynamic[a.depth][a.numVars]||(smash.router.__routes.dynamic[a.depth][a.numVars]=[]),void smash.router.__routes.dynamic[a.depth][a.numVars].push(a)):void(smash.router.__routes.static[s]=e)},smash.router.set=function(s){smash.router.displayURL(s),window.dispatchEvent(new Event("popstate"))},smash.router.displayURL=function(s){window.history.pushState("","",s)},smash.router.redirect=function(s){window.location=s},smash.router.handleNotFound=function(s){console.log("route: "+JSON.stringify(s)+" does not exist")},smash.router.run=function(){window.onpopstate=function(s){smash.router.execute()},smash.router.execute()},smash.router.execute=function(){var s=this.getPath();if(this.__routes.static[s.path])return void this.__routes.static[s.path]();var e=s.path.split("/").length-1;if(this.__routes.dynamic[e]){var a,t,n={};for(var r in this.__routes.dynamic[e])for(var o in this.__routes.dynamic[e][r]){var a=this.__routes.dynamic[e][r][o];if(t=s.path.match(a.regex)){for(var i=0;i<a.numVars;i++)n[a.vars[i]]=t[i+1];return void a.callback(n)}}}smash.router.handleNotFound(s)},smash.router.getPath=function(){var s=document.createElement("a");return s.href=window.location,{host:s.hostname,path:s.pathname}},smash.router.parseRoute=function(s){"/"!=s.substring(0,1)&&(s="/"+s),"/"==s.substring(s.length-2)&&(s="/"+s);var e={path:s,depth:s.split("/").length-1,vars:[],numVars:0};if(smash.router.__dynamicParts=s.match(smash.router.__parseRouteRegex),void 0!=smash.router.__dynamicParts&&null!=smash.router.__dynamicParts){for(var a="^"+s.replace(/\//gi,"\\/")+"$",t=0;t<smash.router.__dynamicParts.length;t++)e.numVars++,e.vars.push(smash.router.__dynamicParts[t].substring(1,smash.router.__dynamicParts[t].length-1)),a=a.replace(smash.router.__dynamicParts[t],"(.*?)");e.regex=new RegExp(a,"i")}return e},smash.router.queryParam=function(s){var e="[\\?&]"+s+"=([^&#]*)",a=new RegExp(e),t=a.exec(window.location.search);if(null!=t)return t[1]},smash.searchbox={i_:!1,minAutoCompleteLength:3,onfocus:void 0,onblur:void 0,onvalue:void 0},smash.searchbox.init=function(){if(!smash.searchbox.i_){var s=document.querySelector(".smash-searchbox input");s&&(s.onfocus=function(){0==this.value.length&&smash.searchbox.results('<div class="smash-instruction">Start typing to find results</div>'),smash.class.add(document.querySelector(".smash-header"),"is-focussed"),smash.class.add(document.querySelector(".smash-searchbox .smash-searchbox-results"),"show"),smash.searchbox.onfocus&&smash.searchbox.onfocus()},s.onblur=function(){smash.class.remove(document.querySelector(".smash-header"),"is-focussed"),smash.class.remove(document.querySelector(".smash-searchbox .smash-searchbox-results"),"show"),smash.searchbox.onblur&&smash.searchbox.onblur()},s.onkeyup=function(s){this.value.length<smash.searchbox.minAutoCompleteLength||smash.searchbox.onchange&&smash.searchbox.onchange(this.value)},smash.searchbox.i_=!0)}},smash.searchbox.results=function(s){var e=document.querySelector(".smash-searchbox .smash-searchbox-results");e.innerHTML=s},smash.sidebar={i_:!1},smash.sidebar.init=function(){if(!smash.sidebar.i_){var s=document.querySelector(".smash-sidebar .lock");if(s){s.onclick=function(){smash.sidebar.toggleLock()};var e=document.querySelector(".smash-sidebar");smash.class.add(e,"is-unlocked"),smash.sidebar.i_=!0,smash.config.get("sidebar_lock")&&smash.sidebar.toggleLock()}}},smash.sidebar.toggleLock=function(){smash.sidebar.i_&&(smash.class.toggle(document.querySelector(".smash-sidebar .lock"),"unlock"),smash.class.toggle(document.querySelector(".smash-sidebar"),"is-unlocked"),smash.config.set("sidebar_lock",!smash.class.has(document.querySelector(".smash-sidebar"),"is-unlocked")))},smash.storage={},smash.storage.set=function(s,e){localStorage.setItem(s,JSON.stringify(e))},smash.storage.unset=function(s){localStorage.removeItem(s)},smash.storage.get=function(s){var e=localStorage.getItem(s);if(e)return JSON.parse(e)},smash.storage.clear=function(){localStorage.clear()},smash.workspace={baseTitle:void 0,_ws_:void 0,_hdr_:void 0,_sb_:void 0,_tabs_:[]},smash.workspace.init=function(){smash.workspace._ws_=document.querySelector(".smash-workspace"),smash.workspace._ws_&&(smash.workspace._hdr_=document.querySelector(".smash-header"),smash.workspace._hdr_&&smash.class.add(smash.workspace._ws_,"has-header"),smash.workspace._sb_=document.querySelector(".smash-workspace .smash-sidebar"),smash.workspace._sb_&&smash.class.add(smash.workspace._ws_,"has-sidebar"))},smash.workspace.addTab=function(s,e,a,t){if(!smash.get(document,".smash-tab-pane")){var n=smash.get(document,".smash-panel");if(!n)return void console.log("To add a tab there needs to be a panel");n.innerHTML='<div class="smash-tab-pane"><div class="smash-tabs"></div><div class="smash-panes"></div></div>'}var r=smash.get(document,".smash-tab-pane .smash-tabs"),o=smash.get(document,".smash-tab-pane .smash-panes");if(document.title=smash.workspace.createTitle(e),h=smash.get(r,'.smash-tab[data-id="'+s+'"]')){var i=smash.get(o,'.smash-pane[data-id="'+s+'"]');return i.innerHTML=a,h.dataset.url=t,h.onclick(),{tab:h,pane:i}}smash.hide(o,".smash-pane"),(active=smash.get(r,".smash-tab.active"))&&smash.class.remove(active,"active");var h=document.createElement("div");h.className="smash-tab active",h.dataset.id=s,h.dataset.url=t,h.innerHTML=e+'<i class="material-icons close">close</i>',h.onclick=function(s){(active=smash.get(r,".smash-tab.active"))&&smash.class.remove(active,"active"),smash.class.add(this,"active"),smash.hide(document,".smash-pane"),smash.show(document,'.smash-pane[data-id="'+this.dataset.id+'"]'),this.dataset.url&&"undefined"!=this.dataset.url&&smash.router.displayURL(this.dataset.url),document.title=smash.workspace.createTitle(this.innerHTML)},smash.on(h,".close","onclick",function(s){smash.class.has(this.parentElement,"active")&&(this.parentElement.previousSibling?this.parentElement.previousSibling.onclick():this.parentElement.nextSibling&&this.parentElement.nextSibling.onclick()),(i=smash.get(document,'.smash-pane[data-id="'+this.parentElement.dataset.id+'"]'))&&i.parentElement.removeChild(i),this.parentElement.parentElement.removeChild(this.parentElement),s.stopPropagation()}),r.appendChild(h);var i=document.createElement("div");return i.className="smash-pane",i.dataset.id=s,i.innerHTML=a,o.appendChild(i),{tab:h,pane:i}},smash.workspace.activeTab=function(){var s=smash.get(tabs,".smash-tab.active");if(!s)return null;var e=smash.get(document,'.smash-pane[data-id="'+s.dataset.id+'"]');return e?{tab:s,pane:e}:null},smash.workspace.createTitle=function(s){return s.replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/gi,"")+(smash.workspace.baseTitle?" | "+smash.workspace.baseTitle:"")};