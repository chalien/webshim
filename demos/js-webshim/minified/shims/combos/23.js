(function(a,c,o){var k=c.audio&&c.video,v=!1;if(k)a=document.createElement("video"),c.videoBuffered="buffered"in a,v="loop"in a,o.capturingEvents("play,playing,waiting,paused,ended,durationchange,loadedmetadata,canplay,volumechange".split(",")),c.videoBuffered||(o.addPolyfill("mediaelement-native-fix",{f:"mediaelement",test:c.videoBuffered,d:["dom-support"]}),o.reTest("mediaelement-native-fix"));jQuery.webshims.register("mediaelement-core",function(a,c,j,x,r){var f=c.mediaelement,s=c.cfg.mediaelement,
t=function(b,g){var b=a(b),m={src:b.attr("src")||"",elem:b,srcProp:b.prop("src")};if(!m.src)return m;var c=b.attr("type");if(c)m.type=c,m.container=a.trim(c.split(";")[0]);else if(g||(g=b[0].nodeName.toLowerCase(),"source"==g&&(g=(b.closest("video, audio")[0]||{nodeName:"video"}).nodeName.toLowerCase())),c=f.getTypeForSrc(m.src,g))m.type=c,m.container=c;if(c=b.attr("media"))m.media=c;return m},q=swfobject.hasFlashPlayerVersion("9.0.115"),w=!q&&"postMessage"in j&&k,p=function(){c.ready("mediaelement-swf",
function(){if(!f.createSWF)c.modules["mediaelement-swf"].test=a.noop,c.reTest(["mediaelement-swf"],k)})},b=function(){var a;return function(){!a&&w&&(a=!0,c.loader.loadScript("https://www.youtube.com/player_api"),c.polyfill("mediaelement-yt"))}}(),n=function(){q?p():b()};c.addPolyfill("mediaelement-yt",{test:!w,d:["dom-support"]});f.mimeTypes={audio:{"audio/ogg":["ogg","oga","ogm"],"audio/mpeg":["mp2","mp3","mpga","mpega"],"audio/mp4":"mp4,mpg4,m4r,m4a,m4p,m4b,aac".split(","),"audio/wav":["wav"],
"audio/3gpp":["3gp","3gpp"],"audio/webm":["webm"],"audio/fla":["flv","f4a","fla"],"application/x-mpegURL":["m3u8","m3u"]},video:{"video/ogg":["ogg","ogv","ogm"],"video/mpeg":["mpg","mpeg","mpe"],"video/mp4":["mp4","mpg4","m4v"],"video/quicktime":["mov","qt"],"video/x-msvideo":["avi"],"video/x-ms-asf":["asf","asx"],"video/flv":["flv","f4v"],"video/3gpp":["3gp","3gpp"],"video/webm":["webm"],"application/x-mpegURL":["m3u8","m3u"],"video/MP2T":["ts"]}};f.mimeTypes.source=a.extend({},f.mimeTypes.audio,
f.mimeTypes.video);f.getTypeForSrc=function(b,g){if(-1!=b.indexOf("youtube.com/watch?")||-1!=b.indexOf("youtube.com/v/"))return"video/youtube";var b=b.split("?")[0].split("."),b=b[b.length-1],c;a.each(f.mimeTypes[g],function(a,g){if(-1!==g.indexOf(b))return c=a,!1});return c};f.srces=function(b,g){b=a(b);if(g)b.removeAttr("src").removeAttr("type").find("source").remove(),a.isArray(g)||(g=[g]),g.forEach(function(a){var g=x.createElement("source");"string"==typeof a&&(a={src:a});g.setAttribute("src",
a.src);a.type&&g.setAttribute("type",a.type);a.media&&g.setAttribute("media",a.media);b.append(g)});else{var g=[],c=b[0].nodeName.toLowerCase(),l=t(b,c);l.src?g.push(l):a("source",b).each(function(){l=t(this,c);l.src&&g.push(l)});return g}};a.fn.loadMediaSrc=function(b,g){return this.each(function(){g!==r&&(a(this).removeAttr("poster"),g&&a.attr(this,"poster",g));f.srces(this,b);a(this).mediaLoad()})};f.swfMimeTypes="video/3gpp,video/x-msvideo,video/quicktime,video/x-m4v,video/mp4,video/m4p,video/x-flv,video/flv,audio/mpeg,audio/aac,audio/mp4,audio/x-m4a,audio/m4a,audio/mp3,audio/x-fla,audio/fla,youtube/flv,jwplayer/jwplayer,video/youtube".split(",");
f.canThirdPlaySrces=function(b,g){var c="";if(q||w)b=a(b),g=g||f.srces(b),a.each(g,function(a,b){if(b.container&&b.src&&(q&&-1!=f.swfMimeTypes.indexOf(b.container)||w&&"video/youtube"==b.container))return c=b,!1});return c};var d={};f.canNativePlaySrces=function(b,g){var c="";if(k){var b=a(b),l=(b[0].nodeName||"").toLowerCase();if(!d[l])return c;g=g||f.srces(b);a.each(g,function(a,g){if(g.type&&d[l].prop._supvalue.call(b[0],g.type))return c=g,!1})}return c};f.setError=function(b,g){g||(g="can't play sources");
a(b).pause().data("mediaerror",g);c.warn("mediaelementError: "+g);setTimeout(function(){a(b).data("mediaerror")&&a(b).trigger("mediaerror")},1)};var B=function(){var a;return function(g,m,l){c.ready(q?"mediaelement-swf":"mediaelement-yt",function(){f.createSWF?f.createSWF(g,m,l):a||(a=!0,n(),B(g,m,l))});!a&&w&&!f.createSWF&&b()}}(),y=function(a,b,c,l,d){c||!1!==c&&b&&"third"==b.isActive?(c=f.canThirdPlaySrces(a,l))?B(a,c,b):d?f.setError(a,!1):y(a,b,!1,l,!0):(c=f.canNativePlaySrces(a,l))?b&&"third"==
b.isActive&&f.setActive(a,"html5",b):d?(f.setError(a,!1),b&&"third"==b.isActive&&f.setActive(a,"html5",b)):y(a,b,!0,l,!0)},u=/^(?:embed|object|datalist)$/i,z=function(b,g){var m=c.data(b,"mediaelementBase")||c.data(b,"mediaelementBase",{}),l=f.srces(b),d=b.parentNode;clearTimeout(m.loadTimer);a.data(b,"mediaerror",!1);if(l.length&&d&&!(1!=d.nodeType||u.test(d.nodeName||"")))g=g||c.data(b,"mediaelement"),y(b,g,s.preferFlash||r,l)};a(x).bind("ended",function(b){var g=c.data(b.target,"mediaelement");
(!v||g&&"html5"!=g.isActive||a.prop(b.target,"loop"))&&setTimeout(function(){!a.prop(b.target,"paused")&&a.prop(b.target,"loop")&&a(b.target).prop("currentTime",0).play()},1)});v||c.defineNodeNamesBooleanProperty(["audio","video"],"loop");["audio","video"].forEach(function(b){var g=c.defineNodeNameProperty(b,"load",{prop:{value:function(){var a=c.data(this,"mediaelement");z(this,a);k&&(!a||"html5"==a.isActive)&&g.prop._supvalue&&g.prop._supvalue.apply(this,arguments)}}});d[b]=c.defineNodeNameProperty(b,
"canPlayType",{prop:{value:function(c){var g="";k&&d[b].prop._supvalue&&(g=d[b].prop._supvalue.call(this,c),"no"==g&&(g=""));!g&&q&&(c=a.trim((c||"").split(";")[0]),-1!=f.swfMimeTypes.indexOf(c)&&(g="maybe"));return g}}})});c.onNodeNamesPropertyModify(["audio","video"],["src","poster"],{set:function(){var a=this,b=c.data(a,"mediaelementBase")||c.data(a,"mediaelementBase",{});clearTimeout(b.loadTimer);b.loadTimer=setTimeout(function(){z(a);a=null},9)}});j=function(){c.addReady(function(b,g){a("video, audio",
b).add(g.filter("video, audio")).each(function(){a.browser.msie&&8<c.browserVersion&&a.prop(this,"paused")&&!a.prop(this,"readyState")&&a(this).is('audio[preload="none"][controls]:not([autoplay])')?a(this).prop("preload","metadata").mediaLoad():z(this);if(k){var b,g,d=this,n=function(){var b=a.prop(d,"buffered");if(b){for(var c="",g=0,m=b.length;g<m;g++)c+=b.end(g);return c}},u=function(){var b=n();b!=g&&(g=b,a(d).triggerHandler("progress"))};a(this).bind("play loadstart progress",function(a){"progress"==
a.type&&(g=n());clearTimeout(b);b=setTimeout(u,999)}).bind("emptied stalled mediaerror abort suspend",function(a){"emptied"==a.type&&(g=!1);clearTimeout(b)})}})})};k?(c.isReady("mediaelement-core",!0),j(),c.ready("WINDOWLOAD mediaelement",n)):c.ready("mediaelement-swf",j)})})(jQuery,Modernizr,jQuery.webshims);
jQuery.webshims.register("form-message",function(a,c,o,k,v,i){var h=c.validityMessages,o=i.overrideMessages||i.customMessages?["customValidationMessage"]:[];h.en=h.en||h["en-US"]||{typeMismatch:{email:"Please enter an email address.",url:"Please enter a URL.",number:"Please enter a number.",date:"Please enter a date.",time:"Please enter a time.",range:"Invalid input.","datetime-local":"Please enter a datetime."},rangeUnderflow:{defaultMessage:"Value must be greater than or equal to {%min}."},rangeOverflow:{defaultMessage:"Value must be less than or equal to {%max}."},
stepMismatch:"Invalid input.",tooLong:"Please enter at most {%maxlength} character(s). You entered {%valueLen}.",patternMismatch:"Invalid input. {%title}",valueMissing:{defaultMessage:"Please fill out this field.",checkbox:"Please check this box if you want to proceed."}};["select","radio"].forEach(function(a){h.en.valueMissing[a]="Please select an option."});["date","time","datetime-local"].forEach(function(a){h.en.rangeUnderflow[a]="Value must be at or after {%min}."});["date","time","datetime-local"].forEach(function(a){h.en.rangeOverflow[a]=
"Value must be at or before {%max}."});h["en-US"]=h["en-US"]||h.en;h[""]=h[""]||h["en-US"];h.de=h.de||{typeMismatch:{email:"{%value} ist keine zul\u00e4ssige E-Mail-Adresse",url:"{%value} ist keine zul\u00e4ssige Webadresse",number:"{%value} ist keine Nummer!",date:"{%value} ist kein Datum",time:"{%value} ist keine Uhrzeit",range:"{%value} ist keine Nummer!","datetime-local":"{%value} ist kein Datum-Uhrzeit Format."},rangeUnderflow:{defaultMessage:"{%value} ist zu niedrig. {%min} ist der unterste Wert, den Sie benutzen k\u00f6nnen."},
rangeOverflow:{defaultMessage:"{%value} ist zu hoch. {%max} ist der oberste Wert, den Sie benutzen k\u00f6nnen."},stepMismatch:"Der Wert {%value} ist in diesem Feld nicht zul\u00e4ssig. Hier sind nur bestimmte Werte zul\u00e4ssig. {%title}",tooLong:"Der eingegebene Text ist zu lang! Sie haben {%valueLen} Zeichen eingegeben, dabei sind {%maxlength} das Maximum.",patternMismatch:"{%value} hat f\u00fcr dieses Eingabefeld ein falsches Format! {%title}",valueMissing:{defaultMessage:"Bitte geben Sie einen Wert ein",
checkbox:"Bitte aktivieren Sie das K\u00e4stchen"}};["select","radio"].forEach(function(a){h.de.valueMissing[a]="Bitte w\u00e4hlen Sie eine Option aus"});["date","time","datetime-local"].forEach(function(a){h.de.rangeUnderflow[a]="{%value} ist zu fr\u00fch. {%min} ist die fr\u00fcheste Zeit, die Sie benutzen k\u00f6nnen."});["date","time","datetime-local"].forEach(function(a){h.de.rangeOverflow[a]="{%value} ist zu sp\u00e4t. {%max} ist die sp\u00e4teste Zeit, die Sie benutzen k\u00f6nnen."});var j=
h[""];c.createValidationMessage=function(c,h){var f=j[h];f&&"string"!==typeof f&&(f=f[a.prop(c,"type")]||f[(c.nodeName||"").toLowerCase()]||f.defaultMessage);f&&"value,min,max,title,maxlength,label".split(",").forEach(function(h){if(-1!==f.indexOf("{%"+h)){var i=("label"==h?a.trim(a('label[for="'+c.id+'"]',c.form).text()).replace(/\*$|:$/,""):a.attr(c,h))||"";f=f.replace("{%"+h+"}",i);"value"==h&&(f=f.replace("{%valueLen}",i.length))}});return f||""};(c.bugs.validationMessage||!Modernizr.formvalidation||
c.bugs.bustedValidity)&&o.push("validationMessage");c.activeLang({langObj:h,module:"form-core",callback:function(a){j=a}});o.forEach(function(h){c.defineNodeNamesProperty(["fieldset","output","button"],h,{prop:{value:"",writeable:!1}});["input","select","textarea"].forEach(function(i){var f=c.defineNodeNameProperty(i,h,{prop:{get:function(){var h=this,i="";if(!a.prop(h,"willValidate"))return i;var j=a.prop(h,"validity")||{valid:1};if(j.valid||(i=c.getContentValidationMessage(h,j)))return i;if(j.customError&&
h.nodeName&&(i=Modernizr.formvalidation&&!c.bugs.bustedValidity&&f.prop._supget?f.prop._supget.call(h):c.data(h,"customvalidationMessage")))return i;a.each(j,function(a,f){if("valid"!=a&&f&&(i=c.createValidationMessage(h,a)))return!1});return i||""},writeable:!1}})})})});
(!Modernizr.formvalidation||jQuery.webshims.bugs.bustedValidity)&&jQuery.webshims.register("form-extend",function(a,c,o,k){c.inputTypes=c.inputTypes||{};var v=c.cfg.forms,i,h=c.inputTypes,j={radio:1,checkbox:1};c.addInputType=function(a,c){h[a]=c};var x={customError:!1,typeMismatch:!1,rangeUnderflow:!1,rangeOverflow:!1,stepMismatch:!1,tooLong:!1,patternMismatch:!1,valueMissing:!1,valid:!0},r={valueMissing:function(b,n,d){if(!b.prop("required"))return!1;var h=!1;if(!("type"in d))d.type=(b[0].getAttribute("type")||
b[0].type||"").toLowerCase();if("select"==d.nodeName){if(n=!n)if(!(n=0>b[0].selectedIndex))b=b[0],n="select-one"==b.type&&2>b.size?!!a("> option:first-child",b).prop("selected"):!1;b=n}else b=j[d.type]?"checkbox"==d.type?!b.is(":checked"):!c.modules["form-core"].getGroupElements(b).filter(":checked")[0]:!n;return b},tooLong:function(){return!1},typeMismatch:function(a,c,d){if(""===c||"select"==d.nodeName)return!1;var f=!1;if(!("type"in d))d.type=(a[0].getAttribute("type")||a[0].type||"").toLowerCase();
if(h[d.type]&&h[d.type].mismatch)f=h[d.type].mismatch(c,a);else if("validity"in a[0])f=a[0].validity.typeMismatch;return f},patternMismatch:function(a,n,d){if(""===n||"select"==d.nodeName)return!1;a=a.attr("pattern");if(!a)return!1;try{a=RegExp("^(?:"+a+")$")}catch(f){c.error('invalid pattern value: "'+a+'" | '+f),a=!1}return!a?!1:!a.test(n)}};c.addValidityRule=function(a,c){r[a]=c};a.event.special.invalid={add:function(){a.event.special.invalid.setup.call(this.form||this)},setup:function(){var b=
this.form||this;if(!a.data(b,"invalidEventShim")&&(a(b).data("invalidEventShim",!0).bind("submit",a.event.special.invalid.handler),c.moveToFirstEvent(b,"submit"),c.bugs.bustedValidity&&a.nodeName(b,"form"))){var n=b.getAttribute("novalidate");b.setAttribute("novalidate","novalidate");c.data(b,"bustedNoValidate",null==n?null:n)}},teardown:a.noop,handler:function(b){if(!("submit"!=b.type||b.testedValidity||!b.originalEvent||!a.nodeName(b.target,"form")||a.prop(b.target,"noValidate"))){i=!0;b.testedValidity=
!0;if(!a(b.target).checkValidity())return b.stopImmediatePropagation(),i=!1;i=!1}}};a(k).bind("invalid",a.noop);a.event.special.submit=a.event.special.submit||{setup:function(){return!1}};var f=a.event.special.submit.setup;a.extend(a.event.special.submit,{setup:function(){a.nodeName(this,"form")?a(this).bind("invalid",a.noop):a("form",this).bind("invalid",a.noop);return f.apply(this,arguments)}});c.addInputType("email",{mismatch:function(){var a=v.emailReg||/^[a-zA-Z0-9.!#$%&'*+-\/=?\^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
return function(c){return!a.test(c)}}()});c.addInputType("url",{mismatch:function(){var a=v.urlReg||/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
return function(c){return!a.test(c)}}()});c.defineNodeNameProperty("input","type",{prop:{get:function(){var a=(this.getAttribute("type")||"").toLowerCase();return c.inputTypes[a]?a:this.type}}});c.defineNodeNamesProperties(["button","fieldset","output"],{checkValidity:{value:function(){return!0}},willValidate:{value:!1},setCustomValidity:{value:a.noop},validity:{writeable:!1,get:function(){return a.extend({},x)}}},"prop");var s=function(b){var n,d=a.prop(b,"validity");if(d)a.data(b,"cachedValidity",
d);else return!0;if(!d.valid){n=a.Event("invalid");var f=a(b).trigger(n);if(i&&!s.unhandledInvalids&&!n.isDefaultPrevented())c.validityAlert.showFor(f),s.unhandledInvalids=!0}a.removeData(b,"cachedValidity");return d.valid},t=/^(?:select|textarea|input)/i;c.defineNodeNameProperty("form","checkValidity",{prop:{value:function(){var b=!0,n=a(a.prop(this,"elements")).filter(function(){if(!t.test(this.nodeName))return!1;var a=c.data(this,"shadowData");return!a||!a.nativeElement||a.nativeElement===this});
s.unhandledInvalids=!1;for(var d=0,f=n.length;d<f;d++)s(n[d])||(b=!1);return b}}});c.defineNodeNamesProperties(["input","textarea","select"],{checkValidity:{value:function(){s.unhandledInvalids=!1;return s(a(this).getNativeElement()[0])}},setCustomValidity:{value:function(b){a.removeData(this,"cachedValidity");c.data(this,"customvalidationMessage",""+b)}},willValidate:{writeable:!1,get:function(){var b={button:1,reset:1,hidden:1,image:1};return function(){var c=a(this).getNativeElement()[0];return!(c.disabled||
c.readOnly||b[c.type])}}()},validity:{writeable:!1,get:function(){var b=a(this).getNativeElement(),f=b[0],d=a.data(f,"cachedValidity");if(d)return d;d=a.extend({},x);if(!a.prop(f,"willValidate")||"submit"==f.type)return d;var h=b.val(),i={nodeName:f.nodeName.toLowerCase()};d.customError=!!c.data(f,"customvalidationMessage");if(d.customError)d.valid=!1;a.each(r,function(a,c){if(c(b,h,i))d[a]=!0,d.valid=!1});a(this).getShadowFocusElement().attr("aria-invalid",d.valid?"false":"true");f=b=null;return d}}},
"prop");c.defineNodeNamesBooleanProperty(["input","textarea","select"],"required",{set:function(b){a(this).getShadowFocusElement().attr("aria-required",!!b+"")},initAttr:!a.browser.msie||7<c.browserVersion});c.reflectProperties(["input"],["pattern"]);if(!("maxLength"in k.createElement("textarea"))){var q=function(){var b,c=0,d=a([]),f=1E9,h=function(){var a=d.prop("value"),b=a.length;b>c&&b>f&&(b=Math.max(c,f),d.prop("value",a.substr(0,b)));c=b},u=function(){clearTimeout(b);d.unbind(".maxlengthconstraint")};
return function(i,A){u();if(-1<A)f=A,c=a.prop(i,"value").length,d=a(i),d.bind("keydown.maxlengthconstraint keypress.maxlengthconstraint paste.maxlengthconstraint cut.maxlengthconstraint",function(){setTimeout(h,0)}),d.bind("keyup.maxlengthconstraint",h),d.bind("blur.maxlengthconstraint",u),b=setInterval(h,200)}}();q.update=function(b,c){a(b).is(":focus")&&(null==c&&(c=a.prop(b,"maxlength")),q(e.target,c))};a(k).bind("focusin",function(b){var c;"TEXTAREA"==b.target.nodeName&&-1<(c=a.prop(b.target,
"maxlength"))&&q(b.target,c)});c.defineNodeNameProperty("textarea","maxlength",{attr:{set:function(a){this.setAttribute("maxlength",""+a);q.update(this)},get:function(){var a=this.getAttribute("maxlength");return null==a?void 0:a}},prop:{set:function(a){if("number"==typeof a||a&&a==1*a){if(0>a)throw"INDEX_SIZE_ERR";a=parseInt(a,10);this.setAttribute("maxlength",a);q.update(this,a)}else this.setAttribute("maxlength","0"),q.update(this,0)},get:function(){var a=this.getAttribute("maxlength");return("number"==
typeof a||a&&a==1*a)&&0<=a?parseInt(a,10):-1}}});c.defineNodeNameProperty("textarea","maxLength",{prop:{set:function(b){a.prop(this,"maxlength",b)},get:function(){return a.prop(this,"maxlength")}}})}var w={submit:1,button:1,image:1},p={};[{name:"enctype",limitedTo:{"application/x-www-form-urlencoded":1,"multipart/form-data":1,"text/plain":1},defaultProp:"application/x-www-form-urlencoded",proptype:"enum"},{name:"method",limitedTo:{get:1,post:1},defaultProp:"get",proptype:"enum"},{name:"action",proptype:"url"},
{name:"target"},{name:"novalidate",propName:"noValidate",proptype:"boolean"}].forEach(function(b){var c="form"+(b.propName||b.name).replace(/^[a-z]/,function(a){return a.toUpperCase()}),d="form"+b.name,f=b.name,h="click.webshimssubmittermutate"+f,u=function(){if("form"in this&&w[this.type]){var h=a.prop(this,"form");if(h){var g=a.attr(this,d);if(null!=g&&(!b.limitedTo||g.toLowerCase()===a.prop(this,c))){var m=a.attr(h,f);a.attr(h,f,g);setTimeout(function(){if(null!=m)a.attr(h,f,m);else try{a(h).removeAttr(f)}catch(b){h.removeAttribute(f)}},
9)}}}};switch(b.proptype){case "url":var i=k.createElement("form");p[c]={prop:{set:function(b){a.attr(this,d,b)},get:function(){var b=a.attr(this,d);if(null==b)return"";i.setAttribute("action",b);return i.action}}};break;case "boolean":p[c]={prop:{set:function(b){b?a.attr(this,"formnovalidate","formnovalidate"):a(this).removeAttr("formnovalidate")},get:function(){return null!=a.attr(this,"formnovalidate")}}};break;case "enum":p[c]={prop:{set:function(b){a.attr(this,d,b)},get:function(){var c=a.attr(this,
d);return!c||(c=c.toLowerCase())&&!b.limitedTo[c]?b.defaultProp:c}}};break;default:p[c]={prop:{set:function(b){a.attr(this,d,b)},get:function(){var b=a.attr(this,d);return null!=b?b:""}}}}p[d]||(p[d]={});p[d].attr={set:function(b){p[d].attr._supset.call(this,b);a(this).unbind(h).bind(h,u)},get:function(){return p[d].attr._supget.call(this)}};p[d].initAttr=!0;p[d].removeAttr={value:function(){a(this).unbind(h);p[d].removeAttr._supvalue.call(this)}}});c.defineNodeNamesProperties(["input","button"],
p);!a.support.getSetAttribute&&null==a("<form novalidate></form>").attr("novalidate")?c.defineNodeNameProperty("form","novalidate",{attr:{set:function(a){this.setAttribute("novalidate",""+a)},get:function(){var a=this.getAttribute("novalidate");return null==a?void 0:a}}}):c.bugs.bustedValidity&&(c.defineNodeNameProperty("form","novalidate",{attr:{set:function(a){c.data(this,"bustedNoValidate",""+a)},get:function(){var a=c.data(this,"bustedNoValidate");return null==a?void 0:a}},removeAttr:{value:function(){c.data(this,
"bustedNoValidate",null)}}}),a.each(["rangeUnderflow","rangeOverflow","stepMismatch"],function(a,c){r[c]=function(a){return(a[0].validity||{})[c]||!1}}));c.defineNodeNameProperty("form","noValidate",{prop:{set:function(b){b?a.attr(this,"novalidate","novalidate"):a(this).removeAttr("novalidate")},get:function(){return null!=a.attr(this,"novalidate")}}});a.browser.webkit&&Modernizr.inputtypes.date&&function(){var b={updateInput:1,input:1},f={date:1,time:1,"datetime-local":1},d={focusout:1,blur:1},h=
{updateInput:1,change:1},j=function(a){var c,f=!0,g=a.prop("value"),m=g,l=function(c){if(a){var d=a.prop("value");d!==g&&(g=d,(!c||!b[c.type])&&a.trigger("input"));c&&h[c.type]&&(m=d);!f&&d!==m&&a.trigger("change")}},i,j=function(b){clearInterval(c);setTimeout(function(){b&&d[b.type]&&(f=!1);a&&(a.unbind("focusout blur",j).unbind("input change updateInput",l),l());a=null},1)};clearInterval(c);c=setInterval(l,160);clearTimeout(i);i=setTimeout(l,9);a.unbind("focusout blur",j).unbind("input change updateInput",
l);a.bind("focusout blur",j).bind("input updateInput change",l)};if(a.event.customEvent)a.event.customEvent.updateInput=!0;(function(){var b=function(b){var c=1,g,d;if("date"==b.type&&(i||!a(b).is(":focus")))if((d=b.value)&&10>d.length&&(d=d.split("-"))&&3==d.length){for(;3>c;c++)if(1==d[c].length)d[c]="0"+d[c];else if(2!=d[c].length){g=!0;break}if(!g)return d=d.join("-"),a.prop(b,"value",d),d}},d,f,g,m;d=c.defineNodeNameProperty("input","checkValidity",{prop:{value:function(){b(this);return d.prop._supvalue.apply(this,
arguments)}}});f=c.defineNodeNameProperty("form","checkValidity",{prop:{value:function(){a("input",this).each(function(){b(this)});return f.prop._supvalue.apply(this,arguments)}}});g=c.defineNodeNameProperty("input","value",{prop:{set:function(){return g.prop._supset.apply(this,arguments)},get:function(){return b(this)||g.prop._supget.apply(this,arguments)}}});m=c.defineNodeNameProperty("input","validity",{prop:{writeable:!1,get:function(){b(this);return m.prop._supget.apply(this,arguments)}}});a(k).bind("change",
function(a){isChangeSubmit=!0;b(a.target);isChangeSubmit=!1})})();a(k).bind("focusin",function(b){b.target&&f[b.target.type]&&!b.target.readOnly&&!b.target.disabled&&j(a(b.target))})}();c.addReady(function(b,c){var d;a("form",b).add(c.filter("form")).bind("invalid",a.noop);try{if(b==k&&!("form"in(k.activeElement||{})))(d=a("input[autofocus], select[autofocus], textarea[autofocus]",b).eq(0).getShadowFocusElement()[0])&&d.offsetHeight&&d.offsetWidth&&d.focus()}catch(f){}});(!Modernizr.formattribute||
!Modernizr.fieldsetdisabled)&&function(){var b=function(b){var c=a.data(b,"webshimsAddedElements");c&&(c.remove(),a.removeData(b,"webshimsAddedElements"))},f=/\r?\n/g,d=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,h=/^(?:select|textarea)/i;Modernizr.formattribute||(c.defineNodeNamesProperty(["input","textarea","select","button","fieldset"],"form",{prop:{get:function(){var b=c.contentAttr(this,"form");b&&(b=k.getElementById(b))&&
!a.nodeName(b,"form")&&(b=null);return b||this.form},writeable:!1}}),c.defineNodeNamesProperty(["form"],"elements",{prop:{get:function(){var c=this.id,d;b(this);c&&(d=a('input[form="'+c+'"], select[form="'+c+'"], textarea[form="'+c+'"], button[form="'+c+'"], fieldset[form="'+c+'"]').add(this.elements).get());return d.length?d:this.elements||null},writeable:!1}}),a(function(){var c=function(a){a.stopPropagation()};a(o).delegate("form[id]","submit",function(c){if(!c.isDefaultPrevented()){var d=this;
if(c=d.id)b(d),c=a('input[form="'+c+'"], select[form="'+c+'"], textarea[form="'+c+'"]').filter(function(){return!this.disabled&&this.name&&this.form!=d}).clone(),c.length&&(a.data(d,"webshimsAddedElements",a('<div class="webshims-visual-hide" />').append(c).appendTo(d)),setTimeout(function(){b(d)},9)),c=null}});a(o).delegate('input[type="submit"][form], button[form], input[type="button"][form], input[type="image"][form], input[type="reset"][form]',"click",function(b){if(!b.isDefaultPrevented()){var d=
a.prop(this,"form"),f=this.form,g;d&&d!=f&&(g=a(this).clone().addClass("webshims-visual-hide").bind("click",c).appendTo(d),f&&b.preventDefault(),g.trigger("click"),setTimeout(function(){g.remove();g=null},9))}})}));Modernizr.fieldsetdisabled||c.defineNodeNamesProperty(["fieldset"],"elements",{prop:{get:function(){var b=a("input, select, textarea, button, fieldset",this);return b.length?b:this.elements||null},writeable:!1}});a.fn.serializeArray=function(){return this.map(function(){var b=a.prop(this,
"elements");return b?a.makeArray(b):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||h.test(this.nodeName)||d.test(this.type))}).map(function(b,c){var d=a(this).val();return null==d?null:a.isArray(d)?a.map(d,function(a){return{name:c.name,value:a.replace(f,"\r\n")}}):{name:c.name,value:d.replace(f,"\r\n")}}).get()}}();(function(){Modernizr.textareaPlaceholder=!!("placeholder"in a("<textarea />")[0]);var b=a.browser.webkit&&Modernizr.textareaPlaceholder;if(!Modernizr.input.placeholder||
!Modernizr.textareaPlaceholder||b){var f="over"==c.cfg.forms.placeholderType,d=["textarea"];Modernizr.input.placeholder||d.push("input");var h=function(a){try{if(a.setSelectionRange)return a.setSelectionRange(0,0),!0;if(a.createTextRange){var b=a.createTextRange();b.collapse(!0);b.moveEnd("character",0);b.moveStart("character",0);b.select();return!0}}catch(c){}},i=function(b,c,d,i){!1===d&&(d=a.prop(b,"value"));if(!f&&"password"!=b.type){if(!d&&i&&h(b)){var j=setTimeout(function(){h(b)},9);a(b).unbind(".placeholderremove").bind("keydown.placeholderremove keypress.placeholderremove paste.placeholderremove input.placeholderremove",
function(d){if(!d||!(17==d.keyCode||16==d.keyCode))b.value=a.prop(b,"value"),c.box.removeClass("placeholder-visible"),clearTimeout(j),a(b).unbind(".placeholderremove")}).bind("mousedown.placeholderremove drag.placeholderremove select.placeholderremove",function(){h(b);clearTimeout(j);j=setTimeout(function(){h(b)},9)}).bind("blur.placeholderremove",function(){clearTimeout(j);a(b).unbind(".placeholderremove")});return}b.value=d}else if(!d&&i){a(b).unbind(".placeholderremove").bind("keydown.placeholderremove keypress.placeholderremove paste.placeholderremove input.placeholderremove",
function(d){if(!d||!(17==d.keyCode||16==d.keyCode))c.box.removeClass("placeholder-visible"),a(b).unbind(".placeholderremove")}).bind("blur.placeholderremove",function(){a(b).unbind(".placeholderremove")});return}c.box.removeClass("placeholder-visible")},j=function(b,c,d,h,j){if(!h&&(h=a.data(b,"placeHolder"),!h))return;a(b).unbind(".placeholderremove");if("focus"==j||!j&&a(b).is(":focus"))("password"==b.type||f||a(b).hasClass("placeholder-visible"))&&i(b,h,"",!0);else if(!1===c&&(c=a.prop(b,"value")),
c)i(b,h,c);else if(!1===d&&(d=a.attr(b,"placeholder")||""),d&&!c){c=h;!1===d&&(d=a.prop(b,"placeholder"));if(!f&&"password"!=b.type)b.value=d;c.box.addClass("placeholder-visible")}else i(b,h,c)},k=function(b){var b=a(b),c=b.prop("id"),d=!(!b.prop("title")&&!b.attr("aria-labelledby"));!d&&c&&(d=!!a('label[for="'+c+'"]',b[0].form)[0]);d||(c||(c=a.webshims.getID(b)),d=!!a("label #"+c)[0]);return a(d?'<span class="placeholder-text"></span>':'<label for="'+c+'" class="placeholder-text"></label>')},p=function(){var b=
{text:1,search:1,url:1,email:1,password:1,tel:1,date:1};return{create:function(b){var c=a.data(b,"placeHolder");if(c)return c;c=a.data(b,"placeHolder",{});a(b).bind("focus.placeholder blur.placeholder",function(a){j(this,!1,!1,c,a.type);c.box["focus"==a.type?"addClass":"removeClass"]("placeholder-focused")});b.form&&a(b.form).bind("reset.placeholder",function(a){setTimeout(function(){j(b,!1,!1,c,a.type)},0)});if("password"==b.type||f){c.text=k(b);c.box=a(b).wrap('<span class="placeholder-box placeholder-box-'+
(b.nodeName||"").toLowerCase()+'" />').parent();c.text.insertAfter(b).bind("mousedown.placeholder",function(){j(this,!1,!1,c,"focus");try{setTimeout(function(){b.focus()},0)}catch(a){}return!1});a.each(["Left","Top"],function(d,f){var g=(parseInt(a.css(b,"padding"+f),10)||0)+Math.max(parseInt(a.css(b,"margin"+f),10)||0,0)+(parseInt(a.css(b,"border"+f+"Width"),10)||0);c.text.css("padding"+f,g)});a.css(b,"lineHeight");var d={width:a(b).width(),height:a(b).height()},g=a.css(b,"float");a.each(["lineHeight",
"fontSize","fontFamily","fontWeight"],function(d,f){var g=a.css(b,f);c.text.css(f)!=g&&c.text.css(f,g)});d.width&&d.height&&c.text.css(d);"none"!==g&&c.box.addClass("placeholder-box-"+g)}else d=function(d){a(b).hasClass("placeholder-visible")&&(i(b,c,""),d&&"submit"==d.type&&setTimeout(function(){d.isDefaultPrevented()&&j(b,!1,!1,c)},9))},a(o).bind("beforeunload",d),c.box=a(b),b.form&&a(b.form).submit(d);return c},update:function(d,f){if(!b[a.prop(d,"type")]&&!a.nodeName(d,"textarea"))c.warn("placeholder not allowed on type: "+
a.prop(d,"type"));else{var h=p.create(d);h.text&&h.text.text(f);j(d,!1,f,h)}}}}();a.webshims.publicMethods={pHolder:p};d.forEach(function(a){c.defineNodeNameProperty(a,"placeholder",{attr:{set:function(a){b?(c.data(this,"textareaPlaceholder",a),this.placeholder=""):c.contentAttr(this,"placeholder",a);p.update(this,a)},get:function(){return(b?c.data(this,"textareaPlaceholder"):"")||c.contentAttr(this,"placeholder")}},reflect:!0,initAttr:!0})});d.forEach(function(d){var f={},h;["attr","prop"].forEach(function(d){f[d]=
{set:function(f){var g;b&&(g=c.data(this,"textareaPlaceholder"));g||(g=c.contentAttr(this,"placeholder"));a.removeData(this,"cachedValidity");var i=h[d]._supset.call(this,f);g&&"value"in this&&j(this,f,g);return i},get:function(){return a(this).hasClass("placeholder-visible")?"":h[d]._supget.call(this)}}});h=c.defineNodeNameProperty(d,"value",f)})}})()});
jQuery.webshims.ready("dom-support",function(a,c,o,k){(function(){if(!("value"in k.createElement("output"))){c.defineNodeNameProperty("output","value",{prop:{set:function(c){var h=a.data(this,"outputShim");h||(h=o(this));h(c)},get:function(){return c.contentAttr(this,"value")||a(this).text()||""}}});c.onNodeNamesPropertyModify("input","value",function(c,h,j){"removeAttr"!=j&&(h=a.data(this,"outputShim"))&&h(c)});var o=function(i){if(!i.getAttribute("aria-live")){var i=a(i),h=(i.text()||"").trim(),
j=i.attr("id"),o=i.attr("for"),r=a('<input class="output-shim" type="text" disabled name="'+(i.attr("name")||"")+'" value="'+h+'" style="display: none !important;" />').insertAfter(i),f=r[0].form||k,s=function(a){r[0].value=a;a=r[0].value;i.text(a);c.contentAttr(i[0],"value",a)};i[0].defaultValue=h;c.contentAttr(i[0],"value",h);i.attr({"aria-live":"polite"});j&&(r.attr("id",j),i.attr("aria-labelledby",c.getID(a('label[for="'+j+'"]',f))));o&&(j=c.getID(i),o.split(" ").forEach(function(a){(a=k.getElementById(a))&&
a.setAttribute("aria-controls",j)}));i.data("outputShim",s);r.data("outputShim",s);return s}};c.addReady(function(c,h){a("output",c).add(h.filter("output")).each(function(){o(this)})})}})();(function(){var o={updateInput:1,input:1},i={radio:1,checkbox:1,submit:1,button:1,image:1,reset:1,file:1,color:1},h=function(a){var h,i=a.prop("value"),f=function(f){if(a){var h=a.prop("value");h!==i&&(i=h,(!f||!o[f.type])&&c.triggerInlineForm&&c.triggerInlineForm(a[0],"input"))}},k,t=function(){clearTimeout(k);
k=setTimeout(f,9)},q=function(){a.unbind("focusout",q).unbind("keyup keypress keydown paste cut",t).unbind("input change updateInput",f);clearInterval(h);setTimeout(function(){f();a=null},1)};clearInterval(h);h=setInterval(f,99);t();a.bind("keyup keypress keydown paste cut",t).bind("focusout",q).bind("input updateInput change",f)};if(a.event.customEvent)a.event.customEvent.updateInput=!0;a(k).bind("focusin",function(c){c.target&&c.target.type&&!c.target.readOnly&&!c.target.disabled&&"input"==(c.target.nodeName||
"").toLowerCase()&&!i[c.target.type]&&h(a(c.target))})})();c.isReady("form-output",!0)});
