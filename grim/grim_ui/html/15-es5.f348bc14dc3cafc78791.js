function _defineProperties(e,n){for(var i=0;i<n.length;i++){var t=n[i];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function _createClass(e,n,i){return n&&_defineProperties(e.prototype,n),i&&_defineProperties(e,i),e}function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{K1OG:function(e,n,i){"use strict";i.d(n,"a",(function(){return o}));var t=i("fXoL"),o=function(){var e=function e(){_classCallCheck(this,e),this.Data={},this.isBlank=!0};return e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=t.Sb({token:e,factory:e.\u0275fac,providedIn:"root"}),e}()},sif2:function(e,n,i){"use strict";i.r(n);var t=i("ofXK"),o=i("3Pt+"),c=i("c7TG"),r=i("tyNb"),l=i("K1OG"),s=i("LJOF"),a=i("tk/3"),b=i("AytR"),u=i("fXoL"),m=i("njyG");function g(e,n){if(1&e){var i=u.ac();u.Zb(0,"ion-button",9),u.hc("click",(function(e){return u.qc(i),u.jc(2).createGrim()})),u.uc(1,"Create Grimoire "),u.Yb()}}function h(e,n){1&e&&(u.Zb(0,"ion-button",10),u.uc(1,"Create Grimoire "),u.Yb())}function p(e,n){if(1&e){var i=u.ac();u.Zb(0,"ion-button",19),u.hc("click",(function(e){u.qc(i);var n=u.jc().$implicit;return u.jc(4).addToGrim(n)})),u.uc(1,"Add to Grimoire "),u.Yb()}}function f(e,n){if(1&e){var i=u.ac();u.Zb(0,"ion-button",20),u.hc("click",(function(e){u.qc(i);var n=u.jc().$implicit;return u.jc(4).removeFromGrim(n)})),u.uc(1,"Remove from Grimoire"),u.Yb()}}function d(e,n){if(1&e&&(u.Zb(0,"tr"),u.Zb(1,"td"),u.uc(2),u.Yb(),u.Zb(3,"td"),u.uc(4),u.Yb(),u.Zb(5,"td"),u.uc(6),u.Yb(),u.Zb(7,"td"),u.uc(8),u.Yb(),u.Zb(9,"td"),u.uc(10),u.Yb(),u.Zb(11,"td"),u.uc(12),u.Yb(),u.Zb(13,"td"),u.tc(14,p,2,0,"ion-button",17),u.tc(15,f,2,0,"ion-button",18),u.Yb(),u.Yb()),2&e){var i=n.$implicit,t=u.jc(4);u.Mb(2),u.vc(i.spell_name),u.Mb(2),u.vc(i.spell_info),u.Mb(2),u.vc(i.spell_type),u.Mb(2),u.vc(i.takes_mana),u.Mb(2),u.vc(i.reqs),u.Mb(2),u.vc(i.spell_output),u.Mb(2),u.mc("ngIf",0==t.inNewGrim(i)&&t.metRequirements(i)),u.Mb(1),u.mc("ngIf",1==t.inNewGrim(i))}}function v(e,n){if(1&e&&(u.Zb(0,"div"),u.Zb(1,"table",15),u.Zb(2,"thead"),u.Zb(3,"tr"),u.Zb(4,"th"),u.uc(5,"Spell Name"),u.Yb(),u.Zb(6,"th"),u.uc(7,"Spell Info"),u.Yb(),u.Zb(8,"th"),u.uc(9,"Spell Type"),u.Yb(),u.Zb(10,"th"),u.uc(11,"takes mana?"),u.Yb(),u.Zb(12,"th"),u.uc(13,"Requirements"),u.Yb(),u.Zb(14,"th"),u.uc(15,"Spell Output"),u.Yb(),u.Zb(16,"th"),u.uc(17,"Add Spell"),u.Yb(),u.Yb(),u.Yb(),u.Zb(18,"tbody"),u.tc(19,d,16,8,"tr",16),u.Yb(),u.Yb(),u.Yb()),2&e){var i=u.jc(3);u.Mb(1),u.mc("dtOptions",i.dtOptions),u.Mb(18),u.mc("ngForOf",i.spells)}}function _(e,n){if(1&e){var i=u.ac();u.Zb(0,"ion-button",19),u.hc("click",(function(e){u.qc(i);var n=u.jc(2).$implicit;return u.jc(5).addToGrim(n)})),u.uc(1,"Add to Grimoire "),u.Yb()}}function w(e,n){if(1&e){var i=u.ac();u.Zb(0,"ion-button",20),u.hc("click",(function(e){u.qc(i);var n=u.jc(2).$implicit;return u.jc(5).removeFromGrim(n)})),u.uc(1,"Remove from Grimoire"),u.Yb()}}function Y(e,n){if(1&e&&(u.Zb(0,"div"),u.Zb(1,"b"),u.uc(2),u.Yb(),u.Yb()),2&e){var i=u.jc(2).$implicit;u.Mb(2),u.wc("Requirements: ",i.reqs,"")}}function Z(e,n){if(1&e&&(u.Zb(0,"div"),u.Zb(1,"ion-col",23),u.Zb(2,"ion-card",2),u.Zb(3,"ion-row"),u.Zb(4,"ion-col",2),u.Xb(5,"img",24),u.Yb(),u.Yb(),u.Zb(6,"ion-card-header",2),u.Zb(7,"ion-card-title"),u.uc(8),u.Yb(),u.Zb(9,"ion-card-subtitle"),u.uc(10),u.Yb(),u.Yb(),u.Zb(11,"ion-card-content",2),u.tc(12,_,2,0,"ion-button",17),u.tc(13,w,2,0,"ion-button",18),u.tc(14,Y,3,1,"div",3),u.Yb(),u.Yb(),u.Yb(),u.Yb()),2&e){var i=u.jc().$implicit,t=u.jc(5);u.Mb(5),u.nc("src",i.spell_image,u.rc),u.Mb(3),u.wc(" ",i.spell_name," "),u.Mb(2),u.wc(" ",i.spell_info," "),u.Mb(2),u.mc("ngIf",0==t.inNewGrim(i)&&t.metRequirements(i)),u.Mb(1),u.mc("ngIf",1==t.inNewGrim(i)),u.Mb(1),u.mc("ngIf",i.reqs.length>0)}}function y(e,n){if(1&e&&(u.Zb(0,"div"),u.tc(1,Z,15,6,"div",3),u.Yb()),2&e){var i=n.$implicit,t=u.jc(5);u.Mb(1),u.mc("ngIf",1==t.checkSearch(i))}}function M(e,n){if(1&e&&(u.Zb(0,"div"),u.Zb(1,"h2"),u.uc(2),u.Yb(),u.Zb(3,"ion-row"),u.tc(4,y,2,1,"div",16),u.Yb(),u.Yb()),2&e){var i=n.$implicit,t=u.jc(4);u.Mb(2),u.wc(" ",i,""),u.Mb(2),u.mc("ngForOf",t.spells_map[i])}}function k(e,n){if(1&e){var i=u.ac();u.Zb(0,"div",21),u.Zb(1,"ion-searchbar",22),u.hc("ngModelChange",(function(e){return u.qc(i),u.jc(3).searchTerm=e})),u.Yb(),u.tc(2,M,5,2,"div",16),u.Yb()}if(2&e){var t=u.jc(3);u.Mb(1),u.mc("ngModel",t.searchTerm),u.Mb(1),u.mc("ngForOf",t.utilityService.keys(t.spells_map))}}function C(e,n){if(1&e){var i=u.ac();u.Zb(0,"div"),u.Zb(1,"ion-segment",11),u.hc("ionChange",(function(e){return u.qc(i),u.jc(2).segmentChanged(e)}))("ngModelChange",(function(e){return u.qc(i),u.jc(2).spell_view=e})),u.Zb(2,"ion-segment-button",12),u.Zb(3,"ion-label"),u.uc(4,"Card View"),u.Yb(),u.Yb(),u.Zb(5,"ion-segment-button",13),u.Zb(6,"ion-label"),u.uc(7,"Table View"),u.Yb(),u.Yb(),u.Yb(),u.tc(8,v,20,2,"div",3),u.tc(9,k,3,2,"div",14),u.Yb()}if(2&e){var t=u.jc(2);u.Mb(1),u.nc("value",t.spell_view),u.mc("ngModel",t.spell_view),u.Mb(7),u.mc("ngIf","table"==t.spell_view),u.Mb(1),u.mc("ngIf","card"==t.spell_view)}}function j(e,n){if(1&e){var i=u.ac();u.Zb(0,"div"),u.Xb(1,"br"),u.Xb(2,"br"),u.Zb(3,"ion-row"),u.Zb(4,"ion-col"),u.Zb(5,"ion-list",2),u.Zb(6,"ion-item"),u.Zb(7,"ion-label"),u.uc(8,"Grimoire Name:"),u.Yb(),u.Zb(9,"ion-input",4),u.hc("ngModelChange",(function(e){return u.qc(i),u.jc().new_grim_name=e})),u.Yb(),u.Yb(),u.Zb(10,"ion-item"),u.Zb(11,"ion-label"),u.uc(12,"Grimoire Description:"),u.Yb(),u.Zb(13,"ion-input",5),u.hc("ngModelChange",(function(e){return u.qc(i),u.jc().new_grim_desc=e})),u.Yb(),u.Yb(),u.Yb(),u.Zb(14,"div",2),u.tc(15,g,2,0,"ion-button",6),u.tc(16,h,2,0,"ion-button",7),u.Yb(),u.Xb(17,"br"),u.Xb(18,"br"),u.tc(19,C,10,4,"div",3),u.Yb(),u.Zb(20,"ion-col"),u.Zb(21,"iframe",8),u.Zb(22,"p"),u.uc(23,"Your browser does not support iframes."),u.Yb(),u.Yb(),u.Yb(),u.Yb(),u.Yb()}if(2&e){var t=u.jc();u.Mb(9),u.mc("ngModel",t.new_grim_name),u.Mb(4),u.mc("ngModel",t.new_grim_desc),u.Mb(2),u.mc("ngIf",1==t.ifRealGrim()),u.Mb(1),u.mc("ngIf",0==t.ifRealGrim()),u.Mb(3),u.mc("ngIf",t.showTable)}}function G(e,n){1&e&&u.Xb(0,"div")}var O,q,I=[{path:"",component:(O=function(){function e(n,i,t,o,c){_classCallCheck(this,e),this.http=n,this.magicService=i,this.navCtrl=t,this.utilityService=o,this.alertController=c,this.api_url=b.a.api_url,this.spell_mode="conjure",this.conjure_type="grim",this.new_grim=[],this.new_grim_name="",this.new_grim_desc="",this.spells_dict={},this.showTable=!1,this.spell_view="card",this.searchTerm="",this.dtOptions={}}return _createClass(e,[{key:"checkSearch",value:function(e){return""==this.searchTerm||!!e.spell_name.toLowerCase().includes(this.searchTerm.toLowerCase())}},{key:"ionViewDidEnter",value:function(){this.resetGrim()}},{key:"ngOnInit",value:function(){this.dtOptions={pageLength:10},this.getSpells(),this.resetGrim()}},{key:"ifRealGrim",value:function(){return!(this.new_grim.length<1||this.new_grim_name.length<1||this.new_grim_desc.length<1)}},{key:"segmentChanged",value:function(e){console.log("Segment changed",e),this.spell_view=e.detail.value,console.log(this.spell_view)}},{key:"inNewGrim",value:function(e){return-1!=this.new_grim.indexOf(e.spell_type+"_"+e.spell_name)}},{key:"getSpells",value:function(){var e=this;console.log("getting spells");var n=new a.c({"Content-Type":"application/json","Access-Control-Allow-Origin":"*"});this.http.get(this.api_url+"/get_spells",{headers:n}).toPromise().then((function(n){console.log("got spells"),e.spells=n.spells,e.spells_map=n.spells_map,console.log(e.spells),console.log(e.spells_map),e.spells.forEach((function(n){e.spells_dict[n.spell_type+"_"+n.spell_name]=n})),e.showTable=!0}),(function(n){console.log("ok we should back out"),console.log(n),e.utilityService.presentModelAlert("Error try again")}))}},{key:"change_conjure_type",value:function(e){this.conjure_type=e}},{key:"resetGrim",value:function(){console.log("getting spells");var e=new a.c({"Content-Type":"application/json","Access-Control-Allow-Origin":"*"});this.http.get(this.api_url+"/reset_grim",{headers:e}).toPromise().then((function(e){console.log("reset grim")}),(function(e){console.log("problem trying to reset"),console.log(e)}))}},{key:"removeFromGrim",value:function(e){var n=this.new_grim.indexOf(e.spell_type+"_"+e.spell_name);this.new_grim.splice(n,1),this.testGrim()}},{key:"metRequirements",value:function(e){var n=this;if(0==e.reqs.length)return console.log(" it is true"),!0;var i=!0;return e.reqs.forEach((function(e){console.log("this is a req"),console.log(e),console.log(n.new_grim),-1==n.new_grim.indexOf(e)?i=!1:console.log("go on")})),i}},{key:"addToGrim",value:function(e){this.new_grim.push(e.spell_type+"_"+e.spell_name),console.log(" about to test grim"),this.testGrim(),console.log(" tested grim")}},{key:"createGrim",value:function(){var e=this;console.log("Creating grim");var n=new a.c({"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}),i=[];this.new_grim.forEach((function(n){i.push(e.spells_dict[n])}));var t={};t.name=this.new_grim_name,t.value=this.new_grim_desc,t.spells=i;var o=this.api_url+"/create_grim";console.log("calling this url: "+o),this.http.post(o,t,{headers:n}).toPromise().then((function(n){if(console.log(n),n.error)return console.log("Graceful error"),void e.utilityService.presentModelAlert(n.error);e.utilityService.presentModal("Grimoire created","Complete")}),(function(e){console.log("ok we should back out"),console.log(e)}))}},{key:"testGrim",value:function(){var e=this;console.log("testing grim");var n=new a.c({"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}),i=[];this.new_grim.forEach((function(n){i.push(e.spells_dict[n])}));var t={};t.spells=i;var o=this.api_url+"/test_grim";console.log("calling this url: "+o),this.http.post(o,t,{headers:n}).toPromise().then((function(e){console.log(e)}),(function(e){console.log("ok we should back out"),console.log(e)}))}}]),e}(),O.\u0275fac=function(e){return new(e||O)(u.Wb(a.a),u.Wb(l.a),u.Wb(c.G),u.Wb(s.a),u.Wb(c.a))},O.\u0275cmp=u.Qb({type:O,selectors:[["app-conjure"]],decls:15,vars:2,consts:[[1,"top-content"],[3,"click"],["text-center",""],[4,"ngIf"],["type","text","placeholder","Name",3,"ngModel","ngModelChange"],["type","text","placeholder","Description",3,"ngModel","ngModelChange"],["shape","round","color","warning",3,"click",4,"ngIf"],["shape","round","color","warning","disabled","",4,"ngIf"],["src","http://localhost:8501/"],["shape","round","color","warning",3,"click"],["shape","round","color","warning","disabled",""],[3,"value","ngModel","ionChange","ngModelChange"],["value","card"],["value","table"],["scrollY","true","class","card-view",4,"ngIf"],["id","spell_table","datatable","",1,"row-border","hover",3,"dtOptions"],[4,"ngFor","ngForOf"],["shape","round",3,"click",4,"ngIf"],["shape","round","color","danger",3,"click",4,"ngIf"],["shape","round",3,"click"],["shape","round","color","danger",3,"click"],["scrollY","true",1,"card-view"],[3,"ngModel","ngModelChange"],["size","4"],[1,"spell_image",3,"src"]],template:function(e,n){1&e&&(u.Zb(0,"ion-header"),u.Zb(1,"ion-toolbar"),u.Zb(2,"ion-title"),u.uc(3," Grimoire "),u.Yb(),u.Yb(),u.Yb(),u.Zb(4,"ion-content"),u.Zb(5,"ion-row",0),u.Zb(6,"ion-col"),u.Zb(7,"a",1),u.hc("click",(function(e){return n.utilityService.navURL("/new-home")})),u.uc(8,"Home"),u.Yb(),u.uc(9," > Conjure "),u.Yb(),u.Yb(),u.Zb(10,"ion-grid"),u.Zb(11,"h2",2),u.uc(12,"Create new Grimoires"),u.Yb(),u.tc(13,j,24,5,"div",3),u.tc(14,G,1,0,"div",3),u.Yb(),u.Yb()),2&e&&(u.Mb(13),u.mc("ngIf","grim"==n.conjure_type),u.Mb(1),u.mc("ngIf","spell"==n.conjure_type))},directives:[c.n,c.B,c.A,c.l,c.u,c.k,c.m,c.b,t.i,c.s,c.q,c.r,c.p,c.K,o.c,o.d,c.d,c.w,c.J,c.x,m.a,t.h,c.v,c.f,c.h,c.j,c.i,c.g],styles:[".card-view[_ngcontent-%COMP%]{height:65vh;overflow-y:auto}.spell_image[_ngcontent-%COMP%]{height:150px;width:150px;display:block;margin-left:auto;margin-right:auto}","iframe[_ngcontent-%COMP%] {\n              height: 100%;\n              width: 100%;\n              frameborder: 0;\n            }"]}),O)}],T=((q=function e(){_classCallCheck(this,e)}).\u0275mod=u.Ub({type:q}),q.\u0275inj=u.Tb({factory:function(e){return new(e||q)},imports:[[r.i.forChild(I)],r.i]}),q);i.d(n,"ConjurePageModule",(function(){return A}));var S,A=((S=function e(){_classCallCheck(this,e)}).\u0275mod=u.Ub({type:S}),S.\u0275inj=u.Tb({factory:function(e){return new(e||S)},imports:[[t.b,o.a,c.C,m.b,T]]}),S)}}]);