function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==("undefined"==typeof module?"undefined":_typeof(module))&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var n=this._events=this._events||{},i=n[t]=n[t]||[];return-1==i.indexOf(e)&&i.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var n=this._onceEvents=this._onceEvents||{};return(n[t]=n[t]||{})[e]=!0,this}},e.off=function(t,e){var n=this._events&&this._events[t];if(n&&n.length){var i=n.indexOf(e);return-1!=i&&n.splice(i,1),this}},e.emitEvent=function(t,e){var n=this._events&&this._events[t];if(n&&n.length){var i=0,o=n[i];e=e||[];for(var s=this._onceEvents&&this._onceEvents[t];o;){var r=s&&s[o];r&&(this.off(t,o),delete s[o]),o.apply(this,e),o=n[i+=r?0:1]}return this}},t}),function(t,e){"function"==typeof define&&define.amd?define("unipointer/unipointer",["ev-emitter/ev-emitter"],function(n){return e(t,n)}):"object"==("undefined"==typeof module?"undefined":_typeof(module))&&module.exports?module.exports=e(t,require("ev-emitter")):t.Unipointer=e(t,t.EvEmitter)}(window,function(t,e){function n(){}var i=n.prototype=Object.create(e.prototype);i.bindStartEvent=function(t){this._bindStartEvent(t,!0)},i.unbindStartEvent=function(t){this._bindStartEvent(t,!1)},i._bindStartEvent=function(e,n){var i=(n=void 0===n||!!n)?"addEventListener":"removeEventListener";t.navigator.pointerEnabled?e[i]("pointerdown",this):t.navigator.msPointerEnabled?e[i]("MSPointerDown",this):(e[i]("mousedown",this),e[i]("touchstart",this))},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.getTouch=function(t){for(var e=0;e<t.length;e++){var n=t[e];if(n.identifier==this.pointerIdentifier)return n}},i.onmousedown=function(t){var e=t.button;e&&0!==e&&1!==e||this._pointerDown(t,t)},i.ontouchstart=function(t){this._pointerDown(t,t.changedTouches[0])},i.onMSPointerDown=i.onpointerdown=function(t){this._pointerDown(t,t)},i._pointerDown=function(t,e){this.isPointerDown||(this.isPointerDown=!0,this.pointerIdentifier=void 0!==e.pointerId?e.pointerId:e.identifier,this.pointerDown(t,e))},i.pointerDown=function(t,e){this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,e])};var o={mousedown:["mousemove","mouseup"],touchstart:["touchmove","touchend","touchcancel"],pointerdown:["pointermove","pointerup","pointercancel"],MSPointerDown:["MSPointerMove","MSPointerUp","MSPointerCancel"]};return i._bindPostStartEvents=function(e){if(e){var n=o[e.type];n.forEach(function(e){t.addEventListener(e,this)},this),this._boundPointerEvents=n}},i._unbindPostStartEvents=function(){this._boundPointerEvents&&(this._boundPointerEvents.forEach(function(e){t.removeEventListener(e,this)},this),delete this._boundPointerEvents)},i.onmousemove=function(t){this._pointerMove(t,t)},i.onMSPointerMove=i.onpointermove=function(t){t.pointerId==this.pointerIdentifier&&this._pointerMove(t,t)},i.ontouchmove=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerMove(t,e)},i._pointerMove=function(t,e){this.pointerMove(t,e)},i.pointerMove=function(t,e){this.emitEvent("pointerMove",[t,e])},i.onmouseup=function(t){this._pointerUp(t,t)},i.onMSPointerUp=i.onpointerup=function(t){t.pointerId==this.pointerIdentifier&&this._pointerUp(t,t)},i.ontouchend=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerUp(t,e)},i._pointerUp=function(t,e){this._pointerDone(),this.pointerUp(t,e)},i.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e])},i._pointerDone=function(){this.isPointerDown=!1,delete this.pointerIdentifier,this._unbindPostStartEvents(),this.pointerDone()},i.pointerDone=function(){},i.onMSPointerCancel=i.onpointercancel=function(t){t.pointerId==this.pointerIdentifier&&this._pointerCancel(t,t)},i.ontouchcancel=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerCancel(t,e)},i._pointerCancel=function(t,e){this._pointerDone(),this.pointerCancel(t,e)},i.pointerCancel=function(t,e){this.emitEvent("pointerCancel",[t,e])},n.getPointerPoint=function(t){return{x:t.pageX,y:t.pageY}},n}),function(t,e){"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter","unipointer/unipointer"],function(n,i){return e(t,n,i)}):"object"==("undefined"==typeof module?"undefined":_typeof(module))&&module.exports?module.exports=e(t,require("ev-emitter"),require("unipointer")):t.Huebee=e(t,t.EvEmitter,t.Unipointer)}(window,function(t,e,n){function i(t,e){if(!(t=r(t)))throw"Bad element for Huebee: "+t;this.anchor=t,this.options={},this.option(i.defaults),this.option(e),this.create()}function o(){for(var t=document.querySelectorAll("[data-huebee]"),e=0;e<t.length;e++){var n,o=t[e],s=o.getAttribute("data-huebee");try{n=s&&JSON.parse(s)}catch(t){m&&m.error("Error parsing data-huebee on "+o.className+": "+t);continue}new i(o,n)}}function s(t){w.clearRect(0,0,1,1),w.fillStyle="#010203",w.fillStyle=t,w.fillRect(0,0,1,1);var e=w.getImageData(0,0,1,1).data;if("1,2,3,255"!=(e=[e[0],e[1],e[2],e[3]]).join(",")){var n=function(t,e,n){t/=255,e/=255,n/=255;var i,o=Math.max(t,e,n),s=Math.min(t,e,n),r=o-s,a=.5*(o+s),h=0===r?0:r/(1-Math.abs(2*a-1));return 0===r?i=0:o===t?i=(e-n)/r%6:o===e?i=(n-t)/r+2:o===n&&(i=(t-e)/r+4),[60*i,parseFloat(h),parseFloat(a)]}.apply(this,e);return{color:t.trim(),hue:n[0],sat:n[1],lum:n[2]}}}function r(t){return"string"==typeof t&&(t=document.querySelector(t)),t}function a(t,e,n){return function(t){return"#"+t.map(function(t){var e=(t=Math.round(255*t)).toString(16).toUpperCase();return e=e.length<2?"0"+e:e}).join("")}(function(t,e,n){var i,o,s=(1-Math.abs(2*n-1))*e,r=t/60,a=s*(1-Math.abs(r%2-1));switch(Math.floor(r)){case 0:i=[s,a,0];break;case 1:i=[a,s,0];break;case 2:i=[0,s,a];break;case 3:i=[0,a,s];break;case 4:i=[a,0,s];break;case 5:i=[s,0,a];break;default:i=[0,0,0]}return o=n-s/2,i=i.map(function(t){return t+o})}(t,e,n))}i.defaults={hues:12,hue0:0,shades:5,saturations:3,notation:"shortHex",setText:!0,setBGColor:!0};var h=i.prototype=Object.create(e.prototype);h.option=function(t){this.options=function(t,e){for(var n in e)t[n]=e[n];return t}(this.options,t)};var c=0,u={};h.create=function(){function t(t){t.target==i&&t.preventDefault()}var e=this.guid=++c;this.anchor.huebeeGUID=e,u[e]=this,this.setBGElems=this.getSetElems(this.options.setBGColor),this.setTextElems=this.getSetElems(this.options.setText),this.outsideCloseIt=this.outsideClose.bind(this),this.onDocKeydown=this.docKeydown.bind(this),this.closeIt=this.close.bind(this),this.openIt=this.open.bind(this),this.onElemTransitionend=this.elemTransitionend.bind(this),this.isInputAnchor="INPUT"==this.anchor.nodeName,this.options.staticOpen||(this.anchor.addEventListener("click",this.openIt),this.anchor.addEventListener("focus",this.openIt)),this.isInputAnchor&&this.anchor.addEventListener("input",this.inputInput.bind(this));var n=this.element=document.createElement("div");n.className="huebee ",n.className+=this.options.staticOpen?"is-static-open ":"is-hidden ",n.className+=this.options.className||"";var i=this.container=document.createElement("div");if(i.className="huebee__container",i.addEventListener("mousedown",t),i.addEventListener("touchstart",t),this.createCanvas(),this.cursor=document.createElement("div"),this.cursor.className="huebee__cursor is-hidden",i.appendChild(this.cursor),this.createCloseButton(),n.appendChild(i),!this.options.staticOpen){var o=getComputedStyle(this.anchor.parentNode);"relative"!=o.position&&"absolute"!=o.position&&(this.anchor.parentNode.style.position="relative")}var s=this.options.hues,r=this.options.customColors,a=r&&r.length;this.satY=a?Math.ceil(a/s)+1:0,this.updateColors(),this.setAnchorColor(),this.options.staticOpen&&this.open()},h.getSetElems=function(t){return!0===t?[this.anchor]:"string"==typeof t?document.querySelectorAll(t):void 0},h.createCanvas=function(){var t=this.canvas=document.createElement("canvas");t.className="huebee__canvas",this.ctx=t.getContext("2d");var e=this.canvasPointer=new n;e._bindStartEvent(t),e.on("pointerDown",this.canvasPointerDown.bind(this)),e.on("pointerMove",this.canvasPointerMove.bind(this)),this.container.appendChild(t)};var d="http://www.w3.org/2000/svg";h.createCloseButton=function(){if(!this.options.staticOpen){var t=document.createElementNS(d,"svg");t.setAttribute("class","huebee__close-button"),t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","24"),t.setAttribute("height","24");var e=document.createElementNS(d,"path");e.setAttribute("d","M 7,7 L 17,17 M 17,7 L 7,17"),e.setAttribute("class","huebee__close-button__x"),t.appendChild(e),t.addEventListener("click",this.closeIt),this.container.appendChild(t)}},h.updateColors=function(){this.swatches={},this.colorGrid={},this.updateColorModer();var t=this.options.shades,e=this.options.saturations,n=this.options.hues,i=this.options.customColors;if(i&&i.length){var o=0;i.forEach(function(t){var e=o%n,i=Math.floor(o/n),r=s(t);r&&(this.addSwatch(r,e,i),o++)}.bind(this))}for(var r=0;r<e;r++){var a=1-r/e,h=t*r+this.satY;this.updateSaturationGrid(r,a,h)}for(r=0;r<t+2;r++){var c=1-r/(t+1),u=s(this.colorModer(0,0,c));this.addSwatch(u,n+1,r)}},h.updateSaturationGrid=function(t,e,n){for(var i=this.options.shades,o=this.options.hues,r=this.options.hue0,a=0;a<i;a++)for(var h=0;h<o;h++){var c=Math.round(360*h/o+r)%360,u=1-(a+1)/(i+1),d=s(this.colorModer(c,e,u)),l=a+n;this.addSwatch(d,h,l)}},h.addSwatch=function(t,e,n){this.swatches[e+","+n]=t,this.colorGrid[t.color.toUpperCase()]={x:e,y:n}};var l={hsl:function(t,e,n){return"hsl("+t+", "+(e=Math.round(100*e))+"%, "+(n=Math.round(100*n))+"%)"},hex:a,shortHex:function(t,e,n){return function(t){return"#"+t[1]+t[3]+t[5]}(a(t,e,n))}};h.updateColorModer=function(){this.colorModer=l[this.options.notation]||l.shortHex},h.renderColors=function(){var t=2*this.gridSize;for(var e in this.swatches){var n=this.swatches[e],i=e.split(","),o=i[0],s=i[1];this.ctx.fillStyle=n.color,this.ctx.fillRect(o*t,s*t,t,t)}},h.setAnchorColor=function(){this.isInputAnchor&&this.setColor(this.anchor.value)};var f=document.documentElement;h.open=function(){if(!this.isOpen){var t=this.anchor,e=this.element;this.options.staticOpen||(e.style.left=t.offsetLeft+"px",e.style.top=t.offsetTop+t.offsetHeight+"px"),this.bindOpenEvents(!0),e.removeEventListener("transitionend",this.onElemTransitionend),t.parentNode.insertBefore(e,t.nextSibling);var n=getComputedStyle(e).transitionDuration;this.hasTransition=n&&"none"!=n&&parseFloat(n),this.isOpen=!0,this.updateSizes(),this.renderColors(),this.setAnchorColor(),e.offsetHeight,e.classList.remove("is-hidden")}},h.bindOpenEvents=function(t){if(!this.options.staticOpen){var e=(t?"add":"remove")+"EventListener";f[e]("mousedown",this.outsideCloseIt),f[e]("touchstart",this.outsideCloseIt),document[e]("focusin",this.outsideCloseIt),document[e]("keydown",this.onDocKeydown),this.anchor[e]("blur",this.closeIt)}},h.updateSizes=function(){var t=this.options.hues,e=this.options.shades,n=this.options.saturations;this.cursorBorder=parseInt(getComputedStyle(this.cursor).borderTopWidth,10),this.gridSize=Math.round(this.cursor.offsetWidth-2*this.cursorBorder),this.canvasOffset={x:this.canvas.offsetLeft,y:this.canvas.offsetTop};var i=Math.max(e*n+this.satY,e+2),o=this.gridSize*(t+2);this.canvas.width=2*o,this.canvas.style.width=o+"px",this.canvas.height=this.gridSize*i*2},h.outsideClose=function(t){var e=this.anchor.contains(t.target),n=this.element.contains(t.target);e||n||this.close()};var p={13:!0,27:!0};h.docKeydown=function(t){p[t.keyCode]&&this.close()};var v="string"==typeof f.style.transform;h.close=function(){this.isOpen&&(v&&this.hasTransition?this.element.addEventListener("transitionend",this.onElemTransitionend):this.remove(),this.element.classList.add("is-hidden"),this.bindOpenEvents(!1),this.isOpen=!1)},h.remove=function(){var t=this.element.parentNode;t.contains(this.element)&&t.removeChild(this.element)},h.elemTransitionend=function(t){t.target==this.element&&(this.element.removeEventListener("transitionend",this.onElemTransitionend),this.remove())},h.inputInput=function(){this.setColor(this.anchor.value)},h.canvasPointerDown=function(t,e){t.preventDefault(),this.updateOffset(),this.canvasPointerChange(e)},h.updateOffset=function(){var e=this.canvas.getBoundingClientRect();this.offset={x:e.left+t.pageXOffset,y:e.top+t.pageYOffset}},h.canvasPointerMove=function(t,e){this.canvasPointerChange(e)},h.canvasPointerChange=function(t){var e=Math.round(t.pageX-this.offset.x),n=Math.round(t.pageY-this.offset.y),i=this.gridSize,o=Math.floor(e/i),s=Math.floor(n/i),r=this.swatches[o+","+s];this.setSwatch(r)},h.setColor=function(t){var e=s(t);this.setSwatch(e)},h.setSwatch=function(t){var e=t&&t.color;if(t){var n=e==this.color;this.color=e,this.hue=t.hue,this.sat=t.sat,this.lum=t.lum;var i=this.lum-.15*Math.cos((this.hue+70)/180*Math.PI);this.isLight=i>.5;var o=this.colorGrid[e.toUpperCase()];this.updateCursor(o),this.setTexts(),this.setBackgrounds(),n||this.emitEvent("change",[e,t.hue,t.sat,t.lum])}},h.setTexts=function(){if(this.setTextElems)for(var t=0;t<this.setTextElems.length;t++){var e=this.setTextElems[t];e["INPUT"==e.nodeName?"value":"textContent"]=this.color}},h.setBackgrounds=function(){if(this.setBGElems)for(var t=this.isLight?"#222":"white",e=0;e<this.setBGElems.length;e++){var n=this.setBGElems[e];n.style.backgroundColor=this.color,n.style.color=t}},h.updateCursor=function(t){if(this.isOpen){var e=t?"remove":"add";if(this.cursor.classList[e]("is-hidden"),t){var n=this.gridSize,i=this.canvasOffset,o=this.cursorBorder;this.cursor.style.left=t.x*n+i.x-o+"px",this.cursor.style.top=t.y*n+i.y-o+"px"}}};var m=t.console,b=document.readyState;"complete"==b||"interactive"==b?o():document.addEventListener("DOMContentLoaded",o),i.data=function(t){var e=(t=r(t))&&t.huebeeGUID;return e&&u[e]};var g=document.createElement("canvas");g.width=g.height=1;var w=g.getContext("2d");return i}),$.when($.ready).then(function(){var t,e,n=(document.querySelector("base")||{}).href,i=$("form[data-item-id]").data("item-id");if(i){var o=$('input[name="config[password]"]').first();o.length>0&&o.attr("value","*****")}$(".message-container").length&&setTimeout(function(){$(".message-container").fadeOut()},3500),void 0!==document.hidden?(t="hidden",e="visibilitychange"):void 0!==document.msHidden?(t="msHidden",e="msvisibilitychange"):void 0!==document.webkitHidden&&(t="webkitHidden",e="webkitvisibilitychange");var s=[],r=[],a=$(".livestats-container");a.length>0&&(void 0===document.addEventListener||void 0===t?console.log("This browser does not support visibilityChange"):document.addEventListener(e,function(){document[t]?function(){for(var t=0,e=s;t<e.length;t++){var n=e[t];window.clearTimeout(n)}}():function(){for(var t=0,e=r;t<e.length;t++)(0,e[t])()}()},!1),a.each(function(t){var e=$(this).data("id"),i=1==$(this).data("dataonly")?2e4:1e3,o=$(this),a=5e3,h=function r(){$.ajax({url:n+"get_stats/"+e,dataType:"json",success:function(t){o.html(t.html),"active"==t.status?a=i:a<3e4&&(a+=2e3)},complete:function(e){e.status>299||(s[t]=window.setTimeout(r,a))}})};r[t]=h,h()})),$("#upload").change(function(){!function(t){if(t.files&&t.files[0]){var e=new FileReader;e.onload=function(t){$("#appimage img").attr("src",t.target.result)},e.readAsDataURL(t.files[0])}}(this)}),$("#sortable").sortable({stop:function(t,e){var i=$("#sortable").sortable("toArray",{attribute:"data-id"});$.post(n+"order",{order:i})}}),$("#sortable").sortable("disable"),$("#main").on("mouseenter","#sortable.ui-sortable-disabled .item",function(){$(this).siblings(".tooltip").addClass("active"),$(".refresh",this).addClass("active")}).on("mouseleave",".item",function(){$(this).siblings(".tooltip").removeClass("active"),$(".refresh",this).removeClass("active")}),$("#config-buttons").on("mouseenter","a",function(){$(".tooltip",this).addClass("active")}).on("mouseleave","a",function(){$(".tooltip",this).removeClass("active")}),$(".searchform > form").on("submit",function(t){"tiles"===$("#search-container select[name=provider]").val()&&t.preventDefault()}),$("#search-container").on("input","input[name=q]",function(){var t=this.value,e=$("#sortable").children(".item-container");"tiles"===$("#search-container select[name=provider]").val()&&t.length>0?(e.hide(),e.filter(function(){return $(this).data("name").toLowerCase().includes(t.toLowerCase())}).show()):e.show()}).on("change","select[name=provider]",function(){var t=$("#sortable").children(".item-container");if("tiles"===$(this).val()){$("#search-container button").hide();var e=$("#search-container input[name=q]").val();e.length>0?(t.hide(),t.filter(function(){return $(this).data("name").toLowerCase().includes(e.toLowerCase())}).show()):t.show()}else $("#search-container button").show(),t.show()}),$("#app").on("click","#config-button",function(t){t.preventDefault();var e=$("#app"),n=e.hasClass("header");e.toggleClass("header"),n?($(".add-item").hide(),$(".item-edit").hide(),$("#app").removeClass("sidebar"),$("#sortable .tooltip").css("display",""),$("#sortable").sortable("disable")):($("#sortable .tooltip").css("display","none"),$("#sortable").sortable("enable"),setTimeout(function(){$(".add-item").fadeIn(),$(".item-edit").fadeIn()},350))}).on("click","#add-item, #pin-item",function(t){t.preventDefault();var e=$("#app");e.hasClass("sidebar");e.toggleClass("sidebar")}).on("click",".close-sidenav",function(t){t.preventDefault(),$("#app").removeClass("sidebar")}).on("click","#test_config",function(t){t.preventDefault();var e=$("#create input[name=url]").val(),i=$('#sapconfig input[name="config[override_url]"]').val();i.length&&""!=i&&(e=i);var o={};o.url=e,$(".config-item").each(function(t){var e=$(this).data("config");o[e]=$(this).val()}),o.id=$("form[data-item-id]").data("item-id"),o.password&&"*****"===o.password&&(o.password=""),$.post(n+"test_config",{data:o},function(t){alert(t)})}),$("#pinlist").on("click","a",function(t){t.preventDefault();var e=$(this),i=e.data("id"),o=e.data("tag");$.get(n+"items/pintoggle/"+i+"/true/"+o,function(t){var n=$(t).filter("#sortable").html();$("#sortable").html(n),e.toggleClass("active")})}),$("#itemform").on("submit",function(t){var e=$('input[name="config[password]"]').first();e.length>0&&"*****"===e.attr("value")&&e.attr("value","")})});var focusSearch=function(t){var e=document.querySelector('input[name="q"]');e&&(t.preventDefault(),e.focus())},openFirstNonHiddenItem=function(t){if(t.target===document.querySelector('input[name="q"]')){var e=document.querySelector('#sortable section.item-container:not([style="display: none;"]) a');"href"in e&&(t.preventDefault(),window.open(e.href))}},KEY_BINDINGS={"/":focusSearch,Enter:openFirstNonHiddenItem};document.addEventListener("keydown",function(t){try{t.key in KEY_BINDINGS&&KEY_BINDINGS[t.key](t)}catch(t){}});
