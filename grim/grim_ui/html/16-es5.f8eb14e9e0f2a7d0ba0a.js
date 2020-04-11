function _defineProperties(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function _createClass(t,e,i){return e&&_defineProperties(t.prototype,e),i&&_defineProperties(t,i),t}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{K1OG:function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));var n=i("fXoL"),o=function(){var t=function t(){_classCallCheck(this,t),this.Data={},this.isBlank=!0};return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=n.Sb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()},W83J:function(t,e,i){"use strict";i.r(e);var n=i("ofXK"),o=i("3Pt+"),c=i("c7TG"),r=i("tyNb"),s=i("K1OG"),l=i("LJOF"),a=i("AytR"),u=i("tk/3"),b=i("fXoL");function h(t,e){if(1&t&&(b.Zb(0,"ion-card"),b.Zb(1,"ion-row"),b.Zb(2,"ion-col",4),b.Xb(3,"img",9),b.Yb(),b.Yb(),b.Zb(4,"ion-card-header",4),b.Zb(5,"ion-card-title"),b.uc(6),b.Yb(),b.Zb(7,"ion-card-subtitle"),b.uc(8),b.Yb(),b.Yb(),b.Yb()),2&t){var i=e.$implicit;b.Mb(3),b.oc("src","../../assets/spell_images/",i.spell_type,"/",i.spell_name,".png",b.rc),b.Mb(3),b.wc(" ",i.spell_name," "),b.Mb(2),b.wc(" ",i.spell_info," ")}}function p(t,e){1&t&&(b.Zb(0,"iframe",10),b.Zb(1,"p"),b.uc(2,"Your browser does not support iframes."),b.Yb(),b.Yb())}var f,m,g=[{path:"",component:(f=function(){function t(e,i,n,o){_classCallCheck(this,t),this.magicService=e,this.navCtrl=i,this.utilityService=n,this.http=o,this.api_url=a.a.api_url,this.streamlit_url=a.a.streamlit_url,this.showTest=!1}return _createClass(t,[{key:"ngOnInit",value:function(){this.magicService.isBlank&&(console.log("return"),window.location.href="/"),this.grim=this.magicService.Data.curr_grim}},{key:"getSpellImage",value:function(t){return"../../assets/spell_images/"+t.spell_type+"/"+t.spell_name+".png"}},{key:"ionViewDidEnter",value:function(){this.castTestGrim(this.grim)}},{key:"castTestGrim",value:function(t){var e=this;console.log("Going to test cast grim "+t.name);var i=new u.c({"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}),n=this.api_url+"/launch_test_grim";console.log("calling this url: "+n),this.http.post(n,t,{headers:i}).toPromise().then((function(t){console.log(t),e.showTest=!0}),(function(t){console.log("ok we should back out"),console.log(t)}))}},{key:"castGrim",value:function(t){var e=this;console.log("Going to cast grim "+t.name);var i=new u.c({"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}),n=this.api_url+"/launch_grim";console.log("calling this url: "+n),this.http.post(n,t,{headers:i}).toPromise().then((function(t){console.log(t),window.open(e.streamlit_url,"_blank")}),(function(t){console.log("ok we should back out"),console.log(t)}))}}]),t}(),f.\u0275fac=function(t){return new(t||f)(b.Wb(s.a),b.Wb(c.G),b.Wb(l.a),b.Wb(u.a))},f.\u0275cmp=b.Qb({type:f,selectors:[["app-grim-view"]],decls:28,vars:5,consts:[[1,"top-content"],[3,"click"],[2,"height","100%"],["size","4"],["text-center",""],[4,"ngFor","ngForOf"],["shape","round","expand","full",3,"click"],["size","8"],["src","http://localhost:8501/",4,"ngIf"],[1,"spell_image",3,"src"],["src","http://localhost:8501/"]],template:function(t,e){1&t&&(b.Zb(0,"ion-header"),b.Zb(1,"ion-toolbar"),b.Zb(2,"ion-title"),b.uc(3," Grimoire "),b.Yb(),b.Yb(),b.Yb(),b.Zb(4,"ion-content"),b.Zb(5,"ion-row",0),b.Zb(6,"ion-col"),b.Zb(7,"a",1),b.hc("click",(function(t){return e.utilityService.navURL("/new-home")})),b.uc(8,"Home"),b.Yb(),b.uc(9," > "),b.Zb(10,"a",1),b.hc("click",(function(t){return e.utilityService.navURL("/library")})),b.uc(11,"Library"),b.Yb(),b.uc(12),b.Yb(),b.Yb(),b.Zb(13,"ion-grid",2),b.Zb(14,"ion-row",2),b.Zb(15,"ion-col",3),b.Zb(16,"div",4),b.Zb(17,"h1"),b.uc(18),b.Yb(),b.Zb(19,"h2"),b.uc(20),b.Yb(),b.Zb(21,"h3"),b.uc(22,"List of spells:"),b.Yb(),b.Yb(),b.tc(23,h,9,4,"ion-card",5),b.Zb(24,"ion-button",6),b.hc("click",(function(t){return e.castGrim(e.grim)})),b.uc(25,"Cast Spells"),b.Yb(),b.Yb(),b.Zb(26,"ion-col",7),b.tc(27,p,3,0,"iframe",8),b.Yb(),b.Yb(),b.Yb(),b.Yb()),2&t&&(b.Mb(12),b.wc(" > ",e.grim.name," "),b.Mb(6),b.vc(e.grim.name),b.Mb(2),b.vc(e.grim.value),b.Mb(3),b.mc("ngForOf",e.grim.spells),b.Mb(4),b.mc("ngIf",e.showTest))},directives:[c.n,c.B,c.A,c.l,c.u,c.k,c.m,c.b,n.h,c.d,n.i,c.f,c.h,c.j,c.i],styles:[".spell_image[_ngcontent-%COMP%]{height:250px;width:50%;display:block;margin-left:auto;margin-right:auto}iframe[_ngcontent-%COMP%]{height:100%;width:100%;frameborder:0}"]}),f)}],d=((m=function t(){_classCallCheck(this,t)}).\u0275mod=b.Ub({type:m}),m.\u0275inj=b.Tb({factory:function(t){return new(t||m)},imports:[[r.i.forChild(g)],r.i]}),m);i.d(e,"GrimViewPageModule",(function(){return v}));var w,v=((w=function t(){_classCallCheck(this,t)}).\u0275mod=b.Ub({type:w}),w.\u0275inj=b.Tb({factory:function(t){return new(t||w)},imports:[[n.b,o.a,c.C,d]]}),w)}}]);