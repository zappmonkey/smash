window.addEventListener("load",function(e){smash.init()},!1);var smash={};smash.init=function(){smash.config.init(),smash.sidebar.init(),smash.searchbox.init(),smash.workspace.init(),smash.input.init()},smash.get=function(e,s){try{return e.querySelector(s)}catch(e){console.log(e)}},smash.getAll=function(e,s){try{return e.querySelectorAll(s)}catch(e){console.log(e)}},smash.hide=function(e,s){for(var a=smash.getAll(e,s),t=0;t<a.length;t++)a[t].style.display="none"},smash.show=function(e,s){for(var a=smash.getAll(e,s),t=0;t<a.length;t++)a[t].style.display=""},smash.on=function(e,s,a,t){for(var n=smash.getAll(e,s),r=0;r<n.length;r++)n[r][a]=t},smash.ajax={_headers_:[]},smash.ajax.addHeader=function(e,s){smash.ajax._headers_[e]=s},smash.ajax.removeHeader=function(e){delete smash.ajax._headers_[e]},smash.ajax.onerror=function(e){console.log(e)},smash.ajax.onunauthorized=function(e){smash.ajax.onerror(e)},smash.ajax._xhr_=function(){if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;for(var e,s=["MSXML2.XmlHttp.6.0","MSXML2.XmlHttp.5.0","MSXML2.XmlHttp.4.0","MSXML2.XmlHttp.3.0","MSXML2.XmlHttp.2.0","Microsoft.XmlHttp"],a=0;a<s.length;a++)try{e=new ActiveXObject(s[a]);break}catch(e){}return e},smash.ajax.send=function(e,s,a,t,n,r,o){void 0===o&&(o=!0),void 0===r&&(r=smash.ajax.onerror);var i=smash.ajax._xhr_();i.responseType=n,i.onreadystatechange=function(){if(4==i.readyState)switch(i.status){case 200:case 201:s&&s(i.response);break;case 401:smash.ajax.onunauthorized(i.response);break;default:r(i.response)}},i.open(a,e,o),"json"==n?i.setRequestHeader("Content-type","application/json"):"POST"==a&&i.setRequestHeader("Content-type","application/x-www-form-urlencoded");for(var c in smash.ajax._headers_)i.setRequestHeader(c,smash.ajax._headers_[c]);i.send(t)},smash.ajax.get=function(e,s,a,t,n,r){var o=[];for(var i in a)o.push(encodeURIComponent(i)+"="+encodeURIComponent(a[i]));smash.ajax.send(e+(o.length?"?"+o.join("&"):""),s,"GET",null,t,n,r)},smash.ajax.post=function(e,s,a,t,n,r){var o;if(a)if("json"!=t){var i=[];for(var c in a)i.push(encodeURIComponent(c)+"="+encodeURIComponent(a[c]));o=i.join("&")}else o=JSON.stringify(a);smash.ajax.send(e,s,"POST",o,t,n,r)},smash.class={},smash.class.add=function(e,s){smash.class.has(e,s)||(e.classList?e.classList.add(s):e.className+=" "+s)},smash.class.remove=function(e,s){smash.class.has(e,s)&&(e.classList?e.classList.remove(s):e.className=e.className.replace(s,""))},smash.class.has=function(e,s){return(" "+e.className+" ").replace(/[\n\t]/g," ").indexOf(" "+s+" ")>-1},smash.class.toggle=function(e,s){smash.class.has(e,s)?smash.class.remove(e,s):smash.class.add(e,s)},smash.config={_values_:{_sidebar_lock_:!1}},smash.config.init=function(){var e=smash.storage.get("config");e&&(smash.config._values_=e)},smash.config.get=function(e){var s="_"+e+"_";if(s in smash.config._values_)return smash.config._values_[s];throw new smash.Exception("001",'Invalid config option "'+e+'"')},smash.config.set=function(e,s){var a="_"+e+"_";if(!a in smash.config._values_)throw new smash.Exception("001",'Invalid config option "'+e+'"');smash.config._values_[a]=s,smash.storage.set("config",smash.config._values_)},smash.dialog={},smash.dialog.new=function(e){var s=smash.dialog.checkBackdrop(),a=document.createElement("div");a.className="smash-dialog",a.innerHTML=e,s.appendChild(a)},smash.dialog.checkBackdrop=function(){if(e=smash.get(document,".smash-dialog-backdrop"))return(dialog=smash.get(document,".smash-dialog-backdrop .smash-dialog"))&&e.removeChild(dialog),e;var e=document.createElement("div");return e.className="smash-dialog-backdrop",e.innerHTML='<div class="smash-dialog-background"></div>',smash.get(e,".smash-dialog-background").onclick=smash.dialog.close,smash.get(document,"body").appendChild(e),e},smash.dialog.close=function(){(dialog=smash.get(document,".smash-dialog-backdrop"))&&smash.get(document,"body").removeChild(dialog)},smash.Exception=function(e,s){this.value=e,this.message=s,this.toString=function(){return"SmashException "+this.value+": "+this.message}},smash.input={},smash.input.init=function(){for(var e,s=document.querySelectorAll(".smash-input input, .smash-textarea textarea"),a=0;a<s.length;a++)if(e=s[a],!smash.class.has(e.parentElement,"smash-initialised")){if(e.parentElement.setValue=function(s){(e=this.querySelector("input"))?(e.value=s,e.onkeyup()):(e=this.querySelector("textarea"))&&(e.value=s,e.onkeyup())},e.parentElement.getValue=function(){if(e=this.querySelector("input")){var e=this.querySelector("input");return e.value}if(e=this.querySelector("textarea")){var e=this.querySelector("input");return e.value}return null},smash.class.has(e.parentElement,"has-floating-label")){smash.class.remove(e.parentElement,"has-floating-label"),smash.class.add(e.parentElement,"floating-label");var t=document.createElement("label");t.innerHTML=e.placeholder,e.parentElement.appendChild(t),e.onkeyup=function(e){var s=this.parentElement.querySelector("label");s&&(""!=this.value?smash.class.add(s,"show"):smash.class.remove(s,"show"))}}e.parentElement.getAttribute("value")&&e.parentElement.setValue(e.parentElement.getAttribute("value")),smash.class.add(e.parentElement,"smash-initialised")}for(var n,r=document.querySelectorAll(".smash-select select"),a=0;a<r.length;a++)if(n=r[a],!smash.class.has(n.parentElement,"smash-initialised")){if(smash.class.has(n.parentElement,"has-floating-label")){smash.class.remove(n.parentElement,"has-floating-label"),smash.class.add(n.parentElement,"floating-label");var t=document.createElement("label");t.innerHTML=n.getAttribute("placeholder"),n.parentElement.appendChild(t)}n.parentElement.setValue=function(e){smash.class.remove(this,"is-focussed");var s=this.querySelector("select"),a=this.querySelector("input"),t=s.value;s.value=e,s.selectedIndex>-1&&(a.value=s.options[s.selectedIndex].text),a.focus(),a.onfocus(),t!=e&&s.onchange&&s.onchange()},n.parentElement.getValue=function(){var e=this.querySelector("select");return e.selectedIndex==-1?null:e.options[e.selectedIndex].value};var e=document.createElement("input");e.type="text",e.placeholder=n.getAttribute("placeholder"),e.setAttribute("readonly","readonly"),n.parentElement.appendChild(e);for(var o=n.querySelectorAll("option"),i=document.createElement("ul"),c=0;c<o.length;c++){var h=o[c];if(h.getAttribute("value")){var l=document.createElement("li");l.setAttribute("value",h.value),l.innerHTML=h.innerHTML,i.appendChild(l),l.onmousedown=function(e){this.parentElement.parentElement.setValue(this.getAttribute("value")),e.stopPropagation(),window.onmousedown=null}}}n.parentElement.appendChild(i),e.onfocus=function(e){var s=this.parentElement.querySelector("label");s&&(""!=this.value?smash.class.add(s,"show"):smash.class.remove(s,"show"))},n.parentElement.onclick=function(){smash.class.add(this,"is-focussed");var e=this;window.onmousedown=function(){console.log("click outside"),window.onmousedown=null,smash.class.remove(e,"is-focussed")}},n.parentElement.getAttribute("value")&&n.parentElement.setValue(n.parentElement.getAttribute("value")),smash.class.add(n.parentElement,"smash-initialised")}smash.input.checkboxInit()},smash.input.checkboxInit=function(){for(var e,s=document.querySelectorAll(".smash-checkbox input"),a=0;a<s.length;a++)if(e=s[a],!smash.class.has(e.parentElement,"smash-initialised")){var t=document.createElement("span");if(t.className="checks",t.innerHTML='<i class="material-icons">check_box_outline_blank</i><i class="material-icons checked">check_box</i>',e.parentElement.appendChild(t),label=e.getAttribute("label")){var n=document.createElement("span");n.className="label",n.innerHTML=label,e.parentElement.appendChild(n)}smash.class.add(e.parentElement,"smash-initialised"),e.checked=smash.class.has(e.parentElement,"checked"),e.parentElement.onclick=function(){smash.class.toggle(this,"checked"),smash.get(this,"input").checked=smash.class.has(this,"checked"),e.parentElement.onchange&&e.parentElement.onchange(smash.class.has(this,"checked"))},e.parentElement.getValue=function(){return smash.class.has(this,"checked")},e.parentElement.setValue=function(e){smash.class.has(this,"checked")!=e&&this.onclick()}}},smash.router={__parseRouteRegex:/{(.*?)}/gi,__dynamicParts:[],__routes:{static:[],dynamic:[]}},smash.router.add=function(e,s){var a=smash.router.parseRoute(e);return a.regex?(a.callback=s,smash.router.__routes.dynamic[a.depth]||(smash.router.__routes.dynamic[a.depth]=[]),smash.router.__routes.dynamic[a.depth][a.numVars]||(smash.router.__routes.dynamic[a.depth][a.numVars]=[]),void smash.router.__routes.dynamic[a.depth][a.numVars].push(a)):void(smash.router.__routes.static[e]=s)},smash.router.set=function(e){smash.router.displayURL(e),window.dispatchEvent(new Event("popstate"))},smash.router.displayURL=function(e){window.history.pushState("","",e)},smash.router.redirect=function(e){window.location=e},smash.router.handleNotFound=function(e){console.log("route: "+JSON.stringify(e)+" does not exist")},smash.router.run=function(){window.onpopstate=function(e){smash.router.execute()},smash.router.execute()},smash.router.execute=function(){var e=this.getPath();if(this.__routes.static[e.path])return void this.__routes.static[e.path]();var s=e.path.split("/").length-1;if(this.__routes.dynamic[s]){var a,t,n={};for(var r in this.__routes.dynamic[s])for(var o in this.__routes.dynamic[s][r]){var a=this.__routes.dynamic[s][r][o];if(t=e.path.match(a.regex)){for(var i=0;i<a.numVars;i++)n[a.vars[i]]=t[i+1];return void a.callback(n)}}}smash.router.handleNotFound(e)},smash.router.getPath=function(){var e=document.createElement("a");return e.href=window.location,{host:e.hostname,path:e.pathname}},smash.router.parseRoute=function(e){"/"!=e.substring(0,1)&&(e="/"+e),"/"==e.substring(e.length-2)&&(e="/"+e);var s={path:e,depth:e.split("/").length-1,vars:[],numVars:0};if(smash.router.__dynamicParts=e.match(smash.router.__parseRouteRegex),void 0!=smash.router.__dynamicParts&&null!=smash.router.__dynamicParts){for(var a="^"+e.replace(/\//gi,"\\/")+"$",t=0;t<smash.router.__dynamicParts.length;t++)s.numVars++,s.vars.push(smash.router.__dynamicParts[t].substring(1,smash.router.__dynamicParts[t].length-1)),a=a.replace(smash.router.__dynamicParts[t],"(.*?)");s.regex=new RegExp(a,"i")}return s},smash.router.queryParam=function(e){var s="[\\?&]"+e+"=([^&#]*)",a=new RegExp(s),t=a.exec(window.location.search);if(null!=t)return t[1]},smash.searchbox={i_:!1,minAutoCompleteLength:3,onfocus:void 0,onblur:void 0,onvalue:void 0},smash.searchbox.init=function(){if(!smash.searchbox.i_){var e=document.querySelector(".smash-searchbox input");e&&(e.onfocus=function(){0==this.value.length&&smash.searchbox.results('<div class="smash-instruction">Start typing to find results</div>'),smash.class.add(document.querySelector(".smash-header"),"is-focussed"),smash.class.add(document.querySelector(".smash-searchbox .smash-searchbox-results"),"show"),smash.searchbox.onfocus&&smash.searchbox.onfocus()},e.onblur=function(){smash.class.remove(document.querySelector(".smash-header"),"is-focussed"),smash.class.remove(document.querySelector(".smash-searchbox .smash-searchbox-results"),"show"),smash.searchbox.onblur&&smash.searchbox.onblur()},e.onkeyup=function(e){this.value.length<smash.searchbox.minAutoCompleteLength||smash.searchbox.onchange&&smash.searchbox.onchange(this.value)},smash.searchbox.i_=!0)}},smash.searchbox.results=function(e){var s=document.querySelector(".smash-searchbox .smash-searchbox-results");s.innerHTML=e},smash.sidebar={i_:!1},smash.sidebar.init=function(){if(!smash.sidebar.i_){var e=document.querySelector(".smash-sidebar .lock");if(e){e.onclick=function(){smash.sidebar.toggleLock()};var s=document.querySelector(".smash-sidebar");smash.class.add(s,"is-unlocked"),smash.sidebar.i_=!0,smash.config.get("sidebar_lock")&&smash.sidebar.toggleLock()}}},smash.sidebar.toggleLock=function(){smash.sidebar.i_&&(smash.class.toggle(document.querySelector(".smash-sidebar .lock"),"unlock"),smash.class.toggle(document.querySelector(".smash-sidebar"),"is-unlocked"),smash.config.set("sidebar_lock",!smash.class.has(document.querySelector(".smash-sidebar"),"is-unlocked")))},smash.storage={},smash.storage.set=function(e,s){localStorage.setItem(e,JSON.stringify(s))},smash.storage.unset=function(e){localStorage.removeItem(e)},smash.storage.get=function(e){var s=localStorage.getItem(e);if(s)return JSON.parse(s)},smash.storage.clear=function(){localStorage.clear()},smash.workspace={baseTitle:void 0,_ws_:void 0,_hdr_:void 0,_sb_:void 0,_tabs_:[]},smash.workspace.init=function(){smash.workspace._ws_=document.querySelector(".smash-workspace"),smash.workspace._ws_&&(smash.workspace._hdr_=document.querySelector(".smash-header"),smash.workspace._hdr_&&smash.class.add(smash.workspace._ws_,"has-header"),smash.workspace._sb_=document.querySelector(".smash-workspace .smash-sidebar"),smash.workspace._sb_&&smash.class.add(smash.workspace._ws_,"has-sidebar"))},smash.workspace.addTab=function(e,s,a,t){if(!smash.get(document,".smash-tab-pane")){var n=smash.get(document,".smash-panel");if(!n)return void console.log("To add a tab there needs to be a panel");n.innerHTML='<div class="smash-tab-pane"><div class="smash-tabs"></div><div class="smash-panes"></div></div>'}var r=smash.get(document,".smash-tab-pane .smash-tabs"),o=smash.get(document,".smash-tab-pane .smash-panes");if(document.title=smash.workspace.createTitle(s),c=smash.get(r,'.smash-tab[data-id="'+e+'"]')){var i=smash.get(o,'.smash-pane[data-id="'+e+'"]');return i.innerHTML=a,c.dataset.url=t,c.onclick(),{tab:c,pane:i}}smash.hide(o,".smash-pane"),(active=smash.get(r,".smash-tab.active"))&&smash.class.remove(active,"active");var c=document.createElement("div");c.className="smash-tab active",c.dataset.id=e,c.dataset.url=t,c.innerHTML=s+'<i class="material-icons close">close</i>',c.onclick=function(e){(active=smash.get(r,".smash-tab.active"))&&smash.class.remove(active,"active"),smash.class.add(this,"active"),smash.hide(document,".smash-pane"),smash.show(document,'.smash-pane[data-id="'+this.dataset.id+'"]'),this.dataset.url&&"undefined"!=this.dataset.url&&smash.router.displayURL(this.dataset.url),document.title=smash.workspace.createTitle(this.innerHTML)},smash.on(c,".close","onclick",function(e){smash.class.has(this.parentElement,"active")&&(this.parentElement.previousSibling?this.parentElement.previousSibling.onclick():this.parentElement.nextSibling&&this.parentElement.nextSibling.onclick()),(i=smash.get(document,'.smash-pane[data-id="'+this.parentElement.dataset.id+'"]'))&&i.parentElement.removeChild(i),this.parentElement.parentElement.removeChild(this.parentElement),e.stopPropagation()}),r.appendChild(c);var i=document.createElement("div");return i.className="smash-pane",i.dataset.id=e,i.innerHTML=a,o.appendChild(i),{tab:c,pane:i}},smash.workspace.activeTab=function(){var e=smash.get(tabs,".smash-tab.active");if(!e)return null;var s=smash.get(document,'.smash-pane[data-id="'+e.dataset.id+'"]');return s?{tab:e,pane:s}:null},smash.workspace.createTitle=function(e){return e.replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/gi,"")+(smash.workspace.baseTitle?" | "+smash.workspace.baseTitle:"")};