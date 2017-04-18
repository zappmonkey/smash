window.addEventListener("load",function(e){smash.init()},!1);var smash={};smash.init=function(){smash.config.init(),smash.sidebar.init(),smash.searchbox.init(),smash.workspace.init(),smash.input.init()},smash.get=function(e,s){try{return e.querySelector(s)}catch(e){console.log(e)}},smash.getAll=function(e,s){try{return e.querySelectorAll(s)}catch(e){console.log(e)}},smash.hide=function(e,s){var t;t=s&&"string"==typeof s?smash.getAll(e,s):[e];for(var a=0;a<t.length;a++)t[a].style.display="none"},smash.nextVisible=function(e){for(;e=e.nextSibling;)if("none"!=e.style.display)return e},smash.firstVisible=function(e){if(e=e.parentElement.firstChild,"none"!=e.style.display)return e;for(;e=e.nextSibling;)if("none"!=e.style.display)return e},smash.previousVisible=function(e){for(;e=e.previousSibling;)if("none"!=e.style.display)return e},smash.lastVisible=function(e){if(e=e.parentElement.lastChild,"none"!=e.style.display)return e;for(;e=e.previousSibling;)if("none"!=e.style.display)return e},smash.show=function(e,s){var t;t=s&&"string"==typeof s?smash.getAll(e,s):[e];for(var a=0;a<t.length;a++)t[a].style.display=""},smash.remove=function(e){e.parentNode.removeChild(e)},smash.on=function(e,s,t,a){for(var n=smash.getAll(e,s),r=0;r<n.length;r++)n[r][t]=a},smash.fuzzyCompare=function(e,s){if(void 0==s||void 0==e)return!1;var t=".*?"+e.toLowerCase().replace(/-/g,"\\-").split("").join(".*?")+".*?";return s.toLowerCase().match(t)},smash.findNextTabStop=function(e,s){var t=smash.getAll(e,".smash-input, .smash-button, .smash-select, .smash-textarea, .smash-checkbox"),a=Array.prototype.filter.call(t,function(e){return e.tabIndex>="0"}),n=a.indexOf(s);return a[n+1]||a[0]},smash.isEmpty=function(e){switch(e){case void 0:case null:case"":return!0}return!1},smash.ajax={_headers_:[]},smash.ajax.addHeader=function(e,s){smash.ajax._headers_[e]=s},smash.ajax.removeHeader=function(e){delete smash.ajax._headers_[e]},smash.ajax.onerror=function(e){console.log(e)},smash.ajax.onunauthorized=function(e){smash.ajax.onerror(e)},smash.ajax._xhr_=function(){if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;for(var e,s=["MSXML2.XmlHttp.6.0","MSXML2.XmlHttp.5.0","MSXML2.XmlHttp.4.0","MSXML2.XmlHttp.3.0","MSXML2.XmlHttp.2.0","Microsoft.XmlHttp"],t=0;t<s.length;t++)try{e=new ActiveXObject(s[t]);break}catch(e){}return e},smash.ajax.send=function(e,s,t,a,n,r,o){void 0===o&&(o=!0),void 0===r&&(r=smash.ajax.onerror);var i=smash.ajax._xhr_();i.responseType=n,i.onreadystatechange=function(){if(4==i.readyState)switch(i.status){case 200:case 201:s&&s(i.response);break;case 401:smash.ajax.onunauthorized(i.response);break;default:r(i.response)}},i.open(t,e,o),"json"==n?i.setRequestHeader("Content-type","application/json"):"POST"==t&&i.setRequestHeader("Content-type","application/x-www-form-urlencoded");for(var l in smash.ajax._headers_)i.setRequestHeader(l,smash.ajax._headers_[l]);i.send(a)},smash.ajax.get=function(e,s,t,a,n,r){var o=[];for(var i in t)o.push(encodeURIComponent(i)+"="+encodeURIComponent(t[i]));smash.ajax.send(e+(o.length?"?"+o.join("&"):""),s,"GET",null,a,n,r)},smash.ajax.post=function(e,s,t,a,n,r){var o;if(t)if("json"!=a){var i=[];for(var l in t)i.push(encodeURIComponent(l)+"="+encodeURIComponent(t[l]));o=i.join("&")}else o=JSON.stringify(t);smash.ajax.send(e,s,"POST",o,a,n,r)},smash.class={},smash.class.add=function(e,s){smash.class.has(e,s)||(e.classList?e.classList.add(s):e.className+=" "+s)},smash.class.remove=function(e,s){smash.class.has(e,s)&&(e.classList?e.classList.remove(s):e.className=e.className.replace(s,""))},smash.class.has=function(e,s){return(" "+e.className+" ").replace(/[\n\t]/g," ").indexOf(" "+s+" ")>-1},smash.class.toggle=function(e,s){smash.class.has(e,s)?smash.class.remove(e,s):smash.class.add(e,s)},smash.class.toggleAll=function(e,s,t){if(el=smash.getAll(e,s))for(var a in el)smash.class.toggle(el[a],t)},smash.config={_values_:{_sidebar_lock_:!1}},smash.config.init=function(){var e=smash.storage.get("config");e&&(smash.config._values_=e)},smash.config.get=function(e){var s="_"+e+"_";if(s in smash.config._values_)return smash.config._values_[s];throw new smash.Exception("001",'Invalid config option "'+e+'"')},smash.config.set=function(e,s){var t="_"+e+"_";if(!t in smash.config._values_)throw new smash.Exception("001",'Invalid config option "'+e+'"');smash.config._values_[t]=s,smash.storage.set("config",smash.config._values_)},smash.contextmenu={},smash.contextmenu.new=function(e,s){(t=smash.get(document,"#smash-context-menu"))&&smash.remove(t);var t=document.createElement("div");t.id="smash-context-menu";var a="<ul class='clickable'>";for(i=0;i<s.length;i++)a+="seperator"!=s[i]?'<li class="ctx_item_'+i+'">'+s[i].label+"</li>":'<li class="seperator"></li>';a+="</ul>",t.innerHTML=a,document.body.appendChild(t);var n;for(i=0;i<s.length;i++)"seperator"!=s[i]&&(n=smash.get(t,"li.ctx_item_"+i),n.callback=s[i].callback,n.onmousedown=function(e){this.callback(e),smash.contextmenu.close(e)});var r=e.pageY;return r+t.offsetHeight>window.innerHeight&&(r=window.innerHeight-t.offsetHeight-20),t.style.top=r,t.style.left=e.pageX,e.preventDefault(),document.onclick=smash.contextmenu.close,!1},smash.contextmenu.close=function(e){e.preventDefault(),(ctx=smash.get(document,"#smash-context-menu"))&&smash.remove(ctx),document.onclick=void 0},smash.cookie={},smash.cookie.set=function(e,s,t){var a=new Date;a.setTime(a.getTime()+24*t*60*60*1e3);var n="expires="+a.toUTCString();document.cookie=e+"="+s+";"+n+";path=/"},smash.cookie.get=function(e){for(var e=e+"=",s=decodeURIComponent(document.cookie),t=s.split(";"),a=0;a<t.length;a++){for(var n=t[a];" "==n.charAt(0);)n=n.substring(1);if(0==n.indexOf(e))return n.substring(e.length,n.length)}return""},smash.dialog={},smash.dialog.new=function(e){var s=smash.dialog.checkBackdrop(),t=document.createElement("div");t.className="smash-dialog",t.innerHTML=e,s.appendChild(t)},smash.dialog.checkBackdrop=function(){if(e=smash.get(document,".smash-dialog-backdrop"))return(dialog=smash.get(document,".smash-dialog-backdrop .smash-dialog"))&&e.removeChild(dialog),e;var e=document.createElement("div");return e.className="smash-dialog-backdrop",e.innerHTML='<div class="smash-dialog-background"></div>',smash.get(e,".smash-dialog-background").onclick=smash.dialog.close,smash.get(document,"body").appendChild(e),e},smash.dialog.close=function(){(dialog=smash.get(document,".smash-dialog-backdrop"))&&smash.get(document,"body").removeChild(dialog)},smash.Exception=function(e,s){this.value=e,this.message=s,this.toString=function(){return"SmashException "+this.value+": "+this.message}},smash.input={},smash.input.init=function(){for(var e,s=document.querySelectorAll(".smash-input input, .smash-textarea textarea"),t=0;t<s.length;t++)if(e=s[t],!smash.class.has(e.parentElement,"smash-initialised")){if(e.parentElement.getName=function(){return this.querySelector("input").getAttribute("name")},e.parentElement.setValue=function(s){(e=this.querySelector("input"))?(e.value=s,e.onkeyup&&e.onkeyup()):(e=this.querySelector("textarea"))&&(e.value=s,e.onkeyup&&e.onkeyup())},e.parentElement.getValue=function(){if(e=this.querySelector("input")){var e=this.querySelector("input");return e.value}if(e=this.querySelector("textarea")){var e=this.querySelector("textarea");return e.value}return null},e.parentElement.onfocus=function(s){(e=this.querySelector("input"))?e.focus():(e=this.querySelector("textarea"))&&e.focus()},smash.class.has(e.parentElement,"has-floating-label")){smash.class.remove(e.parentElement,"has-floating-label"),smash.class.add(e.parentElement,"floating-label");var a=document.createElement("label");a.innerHTML=e.placeholder,e.parentElement.appendChild(a),e.onkeyup=function(e){var s=this.parentElement.querySelector("label");s&&(""!=this.value?smash.class.add(s,"show"):smash.class.remove(s,"show"))}}e.parentElement.getAttribute("value")&&e.parentElement.setValue(e.parentElement.getAttribute("value")),smash.class.add(e.parentElement,"smash-initialised")}for(var n,r=document.querySelectorAll(".smash-select select"),t=0;t<r.length;t++)if(n=r[t],!smash.class.has(n.parentElement,"smash-initialised")){if(smash.class.has(n.parentElement,"has-floating-label")){smash.class.remove(n.parentElement,"has-floating-label"),smash.class.add(n.parentElement,"floating-label");var a=document.createElement("label");a.innerHTML=n.getAttribute("placeholder"),n.parentElement.appendChild(a)}n.parentElement.getName=function(){return this.querySelector("select").getAttribute("name")},n.parentElement.setValue=function(e){smash.class.remove(this,"is-focussed");var s=this.querySelector("select"),t=this.querySelector("input"),a=s.value;if(s.value=e,s.selectedIndex>-1){var n=s.options[s.selectedIndex].text;n&&""!=n?t.value=n:(t.value="",t.placeholder=s.getAttribute("placeholder"))}else t.value="",t.placeholder=s.getAttribute("placeholder");t.focus(),t.blur(),a!=e&&((selected=smash.get(this.parentElement,".selected"))&&smash.class.remove(selected,"selected"),""!=e&&(selected=smash.get(this,'li[value="'+e+'"]'))&&smash.class.add(selected,"selected"),s.onchange&&s.onchange(),this.onchange&&this.onchange()),this.checkLabel()},n.parentElement.onfocus=function(e){var s=this.querySelector("input");s.focus(e)},n.parentElement.getValue=function(){var e=this.querySelector("select");return e.selectedIndex==-1?null:e.options[e.selectedIndex].value},n.parentElement.reset=function(){smash.get(this,"input").value=this.getText(),this.checkLabel(),smash.get(this,"input").blur(),(hover=smash.get(this,"ul li.hover"))&&smash.class.remove(hover,"hover")},n.parentElement.checkLabel=function(){var e=this.querySelector("label");e&&(this.getValue()&&""!=this.getValue()?smash.class.add(e,"show"):smash.class.remove(e,"show"))},n.parentElement.getText=function(){var e=this.querySelector("select");return e.selectedIndex==-1?null:e.options[e.selectedIndex].innerHTML};var e=document.createElement("input");e.type="text",e.placeholder=n.getAttribute("placeholder"),e.setAttribute("readonly","readonly"),n.parentElement.appendChild(e);var o,i=n.querySelectorAll("option"),l=document.createElement("ul");l.onmouseup=function(e){e.stopPropagation()};for(var h=0;h<i.length;h++){var c=i[h];if(o=c.getAttribute("value"),o||""===o){var m=document.createElement("li");m.setAttribute("value",c.value),m.innerHTML=""==c.innerHTML?"&nbsp;":c.innerHTML,l.appendChild(m),m.onmousedown=function(e){return this.parentElement.parentElement.setValue(this.getAttribute("value")),(next=smash.findNextTabStop(this.parentElement.parentElement.parentElement,this.parentElement.parentElement))&&next.focus(),e.stopPropagation(),e.preventDefault(),window.onmouseup&&window.onmouseup(),!1}}}n.parentElement.appendChild(l),e.onfocus=function(e){smash.class.has(this.parentElement,"is-focussed")||(this.parentElement.checkLabel(),this.parentElement.click())},e.onblur=function(e){window.onmouseup&&window.onmouseup()},n.parentElement.onclick=function(){smash.class.add(this,"is-focussed");var e=smash.get(this,"input"),s=smash.get(this,"select"),t=this;e.value&&""!=e.value?e.setAttribute("placeholder",e.value):e.setAttribute("placeholder",s.getAttribute("placeholder")),e.removeAttribute("readonly"),e.blur(),e.value="",window.onmouseup=function(){if(window.onmouseup=null,e.onkeyup=null,e.setAttribute("readonly","readonly"),t.reset(),items=smash.getAll(t,"ul li")){for(var s=0;s<items.length;s++)items[s].style.display="";smash.show(t,"ul")}return smash.class.remove(t,"is-focussed"),!1},e.onkeyup=function(e){switch(e.keyCode){case 9:return!0;case 13:case 39:return(hover=smash.get(t,"ul li.hover"))&&hover.onmousedown(e),!1;case 38:if(hover=smash.get(t,"ul li.hover"))smash.class.remove(hover,"hover"),(previous=smash.previousVisible(hover))?(smash.class.add(previous,"hover"),previous.parentElement.scrollTop=previous.offsetTop):(last=smash.lastVisible(hover))&&(smash.class.add(last,"hover"),last.parentElement.scrollTop=last.parentElement.scrollHeight);else{var s=smash.get(t,"ul li");(last=smash.lastVisible(s))&&(smash.class.add(last,"hover"),last.parentElement.scrollTop=last.parentElement.scrollHeight)}return!1;case 40:if(hover=smash.get(t,"ul li.hover"))smash.class.remove(hover,"hover"),(next=smash.nextVisible(hover))?(smash.class.add(next,"hover"),next.parentElement.scrollTop=next.offsetTop):(next=smash.firstVisible(hover))&&(smash.class.add(next,"hover"),next.parentElement.scrollTop=0);else{var s=smash.get(t,"ul li");(next=smash.firstVisible(s))&&(smash.class.add(next,"hover"),next.parentElement.scrollTop=0)}return!1;case 27:this.value="",this.blur(),this.focus()}var a=this.value.replace(/[^a-zA-Z0-9_ ]/g,"");if(items=smash.getAll(t,"ul li")){smash.show(t,"ul");for(var n,r=!1,o=0;o<items.length;o++)n=items[o],""==a||smash.fuzzyCompare(a,n.innerHTML)?(n.style.display="",r=!0):n.style.display="none";r||smash.hide(t,"ul")}return!0},e.focus()},n.parentElement.getAttribute("value")&&n.parentElement.setValue(n.parentElement.getAttribute("value")),n.parentElement.checkLabel(),smash.class.add(n.parentElement,"smash-initialised")}smash.input.checkboxInit()},smash.input.checkboxInit=function(){for(var e,s=document.querySelectorAll(".smash-checkbox input"),t=0;t<s.length;t++)if(e=s[t],!smash.class.has(e.parentElement,"smash-initialised")){var a=document.createElement("span");if(a.className="checks",a.innerHTML='<i class="material-icons">check_box_outline_blank</i><i class="material-icons checked">check_box</i>',e.parentElement.appendChild(a),label=e.getAttribute("label")){var n=document.createElement("span");n.className="label",n.innerHTML=label,e.parentElement.appendChild(n)}smash.class.add(e.parentElement,"smash-initialised"),e.checked=smash.class.has(e.parentElement,"checked"),e.parentElement.onclick=function(){smash.class.toggle(this,"checked"),smash.get(this,"input").checked=smash.class.has(this,"checked"),this.onchange&&this.onchange(smash.class.has(this,"checked"))},e.parentElement.getName=function(){return this.querySelector("input").getAttribute("name")},e.parentElement.getValue=function(){return smash.class.has(this,"checked")},e.parentElement.setValue=function(e){smash.class.has(this,"checked")!=e&&this.onclick()}}},smash.router={__parseRouteRegex:/{(.*?)}/gi,__dynamicParts:[],__baseDirectory:null,__routes:{static:[],dynamic:[]}},smash.router.add=function(e,s){var t=smash.router.parseRoute(e);return t.regex?(t.callback=s,smash.router.__routes.dynamic[t.depth]||(smash.router.__routes.dynamic[t.depth]=[]),smash.router.__routes.dynamic[t.depth][t.numVars]||(smash.router.__routes.dynamic[t.depth][t.numVars]=[]),void smash.router.__routes.dynamic[t.depth][t.numVars].push(t)):void(smash.router.__routes.static[e]=s)},smash.router.set=function(e){smash.router.displayURL(e),window.dispatchEvent(new Event("popstate"))},smash.router.displayURL=function(e){e=smash.router.addBaseDirectory(e),window.history.pushState("","",e)},smash.router.redirect=function(e){e.search(/^http[s]?:\/\//)||(e=smash.router.addBaseDirectory(e)),window.location=e},smash.router.handleNotFound=function(e){console.log("route: "+JSON.stringify(e)+" does not exist")},smash.router.run=function(){window.onpopstate=function(e){smash.router.execute()},smash.router.execute()},smash.router.execute=function(){var e=this.getPath();if(this.__routes.static[e.path])return void this.__routes.static[e.path]();var s=e.path.split("/").length-1;if(this.__routes.dynamic[s]){var t,a,n={};for(var r in this.__routes.dynamic[s])for(var o in this.__routes.dynamic[s][r]){var t=this.__routes.dynamic[s][r][o];if(a=e.path.match(t.regex)){for(var i=0;i<t.numVars;i++)n[t.vars[i]]=a[i+1];return void t.callback(n)}}}smash.router.handleNotFound(e)},smash.router.getPath=function(){var e=document.createElement("a");return e.href=window.location,{host:e.hostname,path:smash.router.checkPath(e.pathname)}},smash.router.parseRoute=function(e){e=smash.router.cleanPath(e);var s={path:e,depth:e.split("/").length-1,vars:[],numVars:0};if(smash.router.__dynamicParts=e.match(smash.router.__parseRouteRegex),void 0!=smash.router.__dynamicParts&&null!=smash.router.__dynamicParts){for(var t="^"+e.replace(/\//gi,"\\/")+"$",a=0;a<smash.router.__dynamicParts.length;a++)s.numVars++,s.vars.push(smash.router.__dynamicParts[a].substring(1,smash.router.__dynamicParts[a].length-1)),t=t.replace(smash.router.__dynamicParts[a],"(.*?)");s.regex=new RegExp(t,"i")}return s},smash.router.setBaseDirectory=function(e){return e?void(smash.router.__baseDirectory=smash.router.cleanPath(e)):void(smash.router.__baseDirectory=void 0)},smash.router.addBaseDirectory=function(e){return smash.router.__baseDirectory?(e.indexOf(smash.router.__baseDirectory)===-1&&(e=smash.router.__baseDirectory+e),e):e},smash.router.cleanPath=function(e){return e.length>0&&"/"!=e.substring(0,1)&&(e="/"+e),e.length>2&&"/"==e.substring(e.length-2)&&(e=e.substring(0,e.length-2)),e},smash.router.checkPath=function(e){return e=smash.router.cleanPath(e),smash.router.__baseDirectory&&e.indexOf(smash.router.__baseDirectory)!==-1&&(e=e.replace(smash.router.__baseDirectory,"")),e},smash.router.queryParam=function(e){var s="[\\?&]"+e+"=([^&#]*)",t=new RegExp(s),a=t.exec(window.location.search);if(null!=a)return a[1]},smash.searchbox={i_:!1,minAutoCompleteLength:3,onfocus:void 0,onblur:void 0,onchange:void 0},smash.searchbox.init=function(){if(!smash.searchbox.i_){var e=document.querySelector(".smash-searchbox input");e&&(e.onfocus=function(){0==this.value.length&&smash.searchbox.results('<div class="smash-instruction">Start typing to find results</div>'),smash.class.add(document.querySelector(".smash-header"),"is-focussed"),smash.class.add(document.querySelector(".smash-searchbox .smash-searchbox-results"),"show"),smash.searchbox.onfocus&&smash.searchbox.onfocus()},e.onblur=function(){smash.class.remove(document.querySelector(".smash-header"),"is-focussed"),smash.class.remove(document.querySelector(".smash-searchbox .smash-searchbox-results"),"show"),smash.searchbox.onblur&&smash.searchbox.onblur()},e.onkeyup=function(e){switch(e.keyCode){case 27:return this.value="",void this.blur()}this.value.length<smash.searchbox.minAutoCompleteLength||smash.searchbox.onchange&&smash.searchbox.onchange(this.value)},smash.searchbox.i_=!0)}},smash.searchbox.empty=function(){return!(i=smash.get(document,".smash-searchbox input"))||0==i.value.length},smash.searchbox.appendTo=function(e){var s=document.createElement("div");s.innerHTML=e;var t=document.querySelector(".smash-searchbox .smash-searchbox-results");t.appendChild(s)},smash.searchbox.results=function(e){var s=document.querySelector(".smash-searchbox .smash-searchbox-results");s.innerHTML=e},smash.sidebar={i_:!1},smash.sidebar.init=function(){if(!smash.sidebar.i_){var e=document.querySelector(".smash-sidebar .lock");if(e){e.onclick=function(){smash.sidebar.toggleLock()};var s=document.querySelector(".smash-sidebar");smash.class.add(s,"is-unlocked"),smash.sidebar.i_=!0,smash.config.get("sidebar_lock")&&smash.sidebar.toggleLock()}}},smash.sidebar.toggleLock=function(){smash.sidebar.i_&&(smash.class.toggle(document.querySelector(".smash-sidebar .lock"),"unlock"),smash.class.toggle(document.querySelector(".smash-sidebar"),"is-unlocked"),smash.config.set("sidebar_lock",!smash.class.has(document.querySelector(".smash-sidebar"),"is-unlocked")))},smash.storage={},smash.storage.set=function(e,s){localStorage.setItem(e,JSON.stringify(s))},smash.storage.unset=function(e){localStorage.removeItem(e)},smash.storage.get=function(e){var s=localStorage.getItem(e);if(s)return JSON.parse(s)},smash.storage.clear=function(){localStorage.clear()},smash.workspace={baseTitle:void 0,onlasttabclosed:void 0,_ws_:void 0,_hdr_:void 0,_sb_:void 0,_tabs_:[]},smash.workspace.init=function(){smash.workspace._ws_=document.querySelector(".smash-workspace"),smash.workspace._ws_&&(smash.workspace._hdr_=document.querySelector(".smash-header"),smash.workspace._hdr_&&smash.class.add(smash.workspace._ws_,"has-header"),smash.workspace._sb_=document.querySelector(".smash-workspace .smash-sidebar"),smash.workspace._sb_&&smash.class.add(smash.workspace._ws_,"has-sidebar"))},smash.workspace.addTab=function(e,s,t,a){if(!smash.get(document,".smash-tab-pane")){var n=smash.get(document,".smash-panel");if(!n)return void console.log("To add a tab there needs to be a panel");n.innerHTML='<div class="smash-tab-pane"><div class="smash-tabs"></div><div class="smash-panes"></div></div>'}var r=smash.get(document,".smash-tab-pane .smash-tabs"),o=smash.get(document,".smash-tab-pane .smash-panes");if(document.title=smash.workspace.createTitle(s),l=smash.get(r,'.smash-tab[data-id="'+e+'"]')){var i=smash.get(o,'.smash-pane[data-id="'+e+'"]');return i.innerHTML=t,l.dataset.url=a,l.onclick(),{tab:l,pane:i}}smash.hide(o,".smash-pane"),(active=smash.get(r,".smash-tab.active"))&&smash.class.remove(active,"active");var l=document.createElement("div");l.className="smash-tab active",l.dataset.id=e,l.dataset.url=a,l.innerHTML=s+'<i class="material-icons close">close</i>',l.onclick=function(e){(active=smash.get(r,".smash-tab.active"))&&smash.class.remove(active,"active"),smash.class.add(this,"active"),smash.hide(document,".smash-pane"),smash.show(document,'.smash-pane[data-id="'+this.dataset.id+'"]'),this.dataset.url&&"undefined"!=this.dataset.url&&smash.router.displayURL(this.dataset.url),document.title=smash.workspace.createTitle(this.innerHTML)},smash.on(l,".close","onclick",function(e){this.parentElement.onclose&&!this.parentElement.onclose()||(smash.class.has(this.parentElement,"active")&&(this.parentElement.previousSibling?this.parentElement.previousSibling.onclick():this.parentElement.nextSibling&&this.parentElement.nextSibling.onclick()),(i=smash.get(document,'.smash-pane[data-id="'+this.parentElement.dataset.id+'"]'))&&i.parentElement.removeChild(i),this.parentElement.parentElement.removeChild(this.parentElement),this.parentElement.onclosed&&this.parentElement.onclosed(),!smash.workspace.activeTab()&&smash.workspace.onlasttabclosed&&smash.workspace.onlasttabclosed(),e.stopPropagation())}),r.appendChild(l);var i=document.createElement("div");return i.className="smash-pane",i.dataset.id=e,i.innerHTML=t,o.appendChild(i),{tab:l,pane:i}},smash.workspace.activeTab=function(){var e=smash.get(document,".smash-tab.active");if(!e)return null;var s=smash.get(document,'.smash-pane[data-id="'+e.dataset.id+'"]');return s?{tab:e,pane:s}:null},smash.workspace.createTitle=function(e){var s=e.replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/gi,"");if(""==s){var t=document.createElement("div");t.innerHTML=e,(ts=smash.get(t,".title"))&&(s=ts.innerHTML),""==s&&(s="unknown")}return s+(smash.workspace.baseTitle?" | "+smash.workspace.baseTitle:"")};