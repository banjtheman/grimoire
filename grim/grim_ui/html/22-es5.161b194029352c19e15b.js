function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,n,t){return n&&_defineProperties(e.prototype,n),t&&_defineProperties(e,t),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{SA3j:function(e,n,t){"use strict";t.r(n);var i=t("ofXK"),o=t("3Pt+"),c=t("c7TG"),l=t("tyNb"),r=t("mrSG"),a=t("K1OG"),s=t("LJOF"),b=t("7pIB"),u=t("FAH8"),p=t("tk/3"),d=t("AytR"),m=t("fXoL"),h=t("njyG");function g(e,n){if(1&e){var t=m.ac();m.Zb(0,"ion-col",9),m.Zb(1,"ion-card",1),m.hc("click",(function(e){m.qc(t);var i=n.$implicit;return m.jc(2).set_source(i)})),m.Zb(2,"ion-card-header"),m.Zb(3,"ion-title",6),m.Zb(4,"h1"),m.uc(5),m.Yb(),m.Yb(),m.Yb(),m.Zb(6,"ion-card-content",6),m.uc(7," Data Source "),m.Yb(),m.Yb(),m.Yb()}if(2&e){var i=n.$implicit;m.Mb(5),m.vc(i.file_name)}}function f(e,n){if(1&e){var t=m.ac();m.Zb(0,"ion-col",11),m.Zb(1,"ion-list"),m.Zb(2,"ion-item"),m.Zb(3,"ion-label"),m.uc(4,"File Upload"),m.Yb(),m.Zb(5,"input",12),m.hc("click",(function(e){return m.qc(t),m.jc(2).clearQueue()})),m.Yb(),m.Yb(),m.Zb(6,"ion-item"),m.Zb(7,"ion-button",13),m.hc("click",(function(e){return m.qc(t),m.jc(2).submitCSV()})),m.Zb(8,"b"),m.uc(9,"Upload CSV"),m.Yb(),m.Yb(),m.Yb(),m.Yb(),m.Yb()}if(2&e){var i=m.jc(2);m.Mb(5),m.mc("uploader",i.uploader)}}function Y(e,n){if(1&e){var t=m.ac();m.Zb(0,"div"),m.Zb(1,"ion-label"),m.uc(2,"CSV Name"),m.Yb(),m.Zb(3,"ion-input",19),m.hc("ngModelChange",(function(e){m.qc(t);var n=m.jc(2).$implicit;return m.jc(6).spell_tomb[n.input_name]=e})),m.Yb(),m.Yb()}if(2&e){var i=m.jc(2).$implicit,o=m.jc(6);m.Mb(3),m.nc("value",o.current_source.file_name),m.mc("ngModel",o.spell_tomb[i.input_name])}}function Z(e,n){1&e&&m.Xb(0,"div")}function v(e,n){1&e&&m.Xb(0,"div")}function _(e,n){if(1&e&&(m.Zb(0,"div"),m.Zb(1,"h2"),m.uc(2,"Mana source"),m.Yb(),m.uc(3),m.tc(4,Y,4,2,"div",5),m.tc(5,Z,1,0,"div",5),m.tc(6,v,1,0,"div",5),m.Yb()),2&e){var t=m.jc().$implicit;m.Mb(3),m.xc(" ",t.input_name," - ",t.info," "),m.Mb(1),m.mc("ngIf",t.takesCSV),m.Mb(1),m.mc("ngIf",t.takesDB),m.Mb(1),m.mc("ngIf",t.takesAPI)}}function w(e,n){if(1&e&&(m.Zb(0,"ion-select-option",22),m.uc(1),m.Yb()),2&e){var t=n.$implicit;m.nc("value",t),m.Mb(1),m.wc("",t," ")}}function M(e,n){if(1&e){var t=m.ac();m.Zb(0,"div"),m.uc(1),m.Zb(2,"ion-label"),m.uc(3,"Column Input"),m.Yb(),m.Zb(4,"ion-select",20),m.hc("ngModelChange",(function(e){m.qc(t);var n=m.jc().$implicit;return m.jc(6).spell_tomb[n.input_name]=e})),m.tc(5,w,2,2,"ion-select-option",21),m.Yb(),m.Yb()}if(2&e){var i=m.jc().$implicit,o=m.jc(6);m.Mb(1),m.xc(" ",i.input_name," - ",i.info," "),m.Mb(3),m.mc("ngModel",o.spell_tomb[i.input_name]),m.Mb(1),m.mc("ngForOf",o.current_source.cols)}}function k(e,n){if(1&e&&(m.Zb(0,"ion-item"),m.tc(1,_,7,5,"div",5),m.tc(2,M,6,4,"div",5),m.Yb()),2&e){var t=n.$implicit;m.Mb(1),m.mc("ngIf",t.takesMana),m.Mb(1),m.mc("ngIf",t.takesCSVCol)}}function y(e,n){if(1&e&&(m.Zb(0,"ion-card-content",6),m.uc(1," Spell inputs: "),m.Zb(2,"ion-list"),m.tc(3,k,3,2,"ion-item",16),m.Yb(),m.Yb()),2&e){var t=m.jc().$implicit;m.Mb(3),m.mc("ngForOf",t.spell_inputs_metadata)}}function j(e,n){if(1&e&&(m.Zb(0,"ion-card"),m.Zb(1,"ion-card-header",6),m.Zb(2,"ion-card-title"),m.uc(3),m.Yb(),m.Zb(4,"ion-card-subtitle"),m.uc(5),m.Yb(),m.Yb(),m.tc(6,y,4,1,"ion-card-content",18),m.Yb()),2&e){var t=n.$implicit,i=n.index;m.Mb(3),m.xc(" ",t.spell_type," - ",t.spell_name," "),m.Mb(2),m.wc(" ",t.spell_info," "),m.Mb(1),m.mc("ngIf",0==i)}}function C(e,n){if(1&e){var t=m.ac();m.Zb(0,"ion-col",15),m.Zb(1,"ion-card"),m.Zb(2,"ion-card-header",6),m.Zb(3,"ion-card-title"),m.uc(4),m.Yb(),m.Zb(5,"ion-card-subtitle"),m.uc(6),m.Yb(),m.Yb(),m.Zb(7,"ion-card-content"),m.tc(8,j,7,4,"ion-card",16),m.Zb(9,"div",6),m.Zb(10,"ion-button",17),m.hc("click",(function(e){m.qc(t);var i=n.index;return m.jc(3).cast_grim(i)})),m.uc(11,"Cast Spells"),m.Yb(),m.Yb(),m.Yb(),m.Yb(),m.Yb()}if(2&e){var i=n.$implicit;m.Mb(4),m.wc(" ",i.name," "),m.Mb(2),m.wc(" ",i.value," "),m.Mb(2),m.mc("ngForOf",i.spells)}}function S(e,n){if(1&e&&(m.Zb(0,"ion-grid"),m.Zb(1,"h1",6),m.uc(2,"Grimoires"),m.Yb(),m.Zb(3,"ion-row"),m.tc(4,C,12,3,"ion-col",14),m.Yb(),m.Yb()),2&e){var t=m.jc(2);m.Mb(4),m.mc("ngForOf",t.grims)}}function O(e,n){if(1&e){var t=m.ac();m.Zb(0,"tr"),m.Zb(1,"td"),m.uc(2),m.Yb(),m.Zb(3,"td"),m.uc(4),m.Yb(),m.Zb(5,"td"),m.uc(6),m.Yb(),m.Zb(7,"td"),m.uc(8),m.Yb(),m.Zb(9,"td"),m.Zb(10,"ion-button",17),m.hc("click",(function(e){m.qc(t);var i=n.$implicit;return m.jc(3).viewCast(i)})),m.uc(11,"View Cast"),m.Yb(),m.Yb(),m.Yb()}if(2&e){var i=n.$implicit;m.Mb(2),m.vc(i.grim_name),m.Mb(2),m.vc(i.grim_value),m.Mb(2),m.vc(i.mana_source),m.Mb(2),m.vc(i.timestamp)}}function I(e,n){if(1&e&&(m.Zb(0,"div"),m.Zb(1,"table",23),m.Zb(2,"thead"),m.Zb(3,"tr"),m.Zb(4,"th"),m.uc(5,"Grimoire"),m.Yb(),m.Zb(6,"th"),m.uc(7,"Purpose"),m.Yb(),m.Zb(8,"th"),m.uc(9,"Mana Source"),m.Yb(),m.Zb(10,"th"),m.uc(11,"Timestamp"),m.Yb(),m.Zb(12,"th"),m.uc(13,"View Cast"),m.Yb(),m.Yb(),m.Yb(),m.Zb(14,"tbody"),m.tc(15,O,12,4,"tr",16),m.Yb(),m.Yb(),m.Yb()),2&e){var t=m.jc(2);m.Mb(1),m.mc("dtOptions",t.dtOptions),m.Mb(14),m.mc("ngForOf",t.casts)}}function A(e,n){if(1&e){var t=m.ac();m.Zb(0,"div"),m.Zb(1,"ion-grid"),m.Zb(2,"h1",6),m.uc(3,"Mana sources"),m.Yb(),m.Zb(4,"ion-row"),m.tc(5,g,8,1,"ion-col",7),m.Yb(),m.Zb(6,"h2",6),m.uc(7,"Add new Source"),m.Yb(),m.Zb(8,"ion-row"),m.Zb(9,"ion-col",8),m.Zb(10,"ion-card",1),m.hc("click",(function(e){return m.qc(t),m.jc().change_mana_type("csv")})),m.Zb(11,"ion-card-header"),m.Zb(12,"ion-title",6),m.Zb(13,"h1"),m.uc(14,"CSV"),m.Yb(),m.Yb(),m.Yb(),m.Zb(15,"ion-card-content",6),m.uc(16," Upload a CSV file "),m.Yb(),m.Yb(),m.Yb(),m.Zb(17,"ion-col",9),m.Zb(18,"ion-card",1),m.hc("click",(function(e){return m.qc(t),m.jc().change_mana_type("db")})),m.Zb(19,"ion-card-header"),m.Zb(20,"ion-title",6),m.Zb(21,"h1"),m.uc(22,"Database"),m.Yb(),m.Yb(),m.Yb(),m.Zb(23,"ion-card-content",6),m.uc(24," Pull from a Database "),m.Yb(),m.Yb(),m.Yb(),m.Zb(25,"ion-col",9),m.Zb(26,"ion-card",1),m.hc("click",(function(e){return m.qc(t),m.jc().change_mana_type("api")})),m.Zb(27,"ion-card-header"),m.Zb(28,"ion-title",6),m.Zb(29,"h1"),m.uc(30,"API"),m.Yb(),m.Yb(),m.Yb(),m.Zb(31,"ion-card-content",6),m.uc(32," Hit api endpoint "),m.Yb(),m.Yb(),m.Yb(),m.Yb(),m.Xb(33,"br"),m.Xb(34,"br"),m.Zb(35,"ion-row"),m.tc(36,f,10,1,"ion-col",10),m.Yb(),m.Yb(),m.tc(37,S,5,1,"ion-grid",5),m.Zb(38,"ion-grid"),m.Zb(39,"h1",6),m.uc(40,"Completed Spells"),m.Yb(),m.Zb(41,"ion-row"),m.Zb(42,"ion-col"),m.tc(43,I,16,2,"div",5),m.Yb(),m.Yb(),m.Yb(),m.Yb()}if(2&e){var i=m.jc();m.Mb(5),m.mc("ngForOf",i.mana_sources),m.Mb(31),m.mc("ngIf","csv"==i.mana_type),m.Mb(1),m.mc("ngIf",i.current_source),m.Mb(6),m.mc("ngIf",i.showCasts)}}function F(e,n){if(1&e&&(m.Zb(0,"div"),m.Zb(1,"h2"),m.Zb(2,"b"),m.uc(3),m.Yb(),m.Yb(),m.Zb(4,"table",31),m.Zb(5,"thead"),m.Zb(6,"tr"),m.Zb(7,"th"),m.uc(8,"Input Info"),m.Yb(),m.Zb(9,"th"),m.uc(10,"Example value"),m.Yb(),m.Yb(),m.Yb(),m.Zb(11,"tbody"),m.Zb(12,"tr"),m.Zb(13,"td"),m.uc(14),m.Yb(),m.Zb(15,"td"),m.uc(16),m.Yb(),m.Yb(),m.Yb(),m.Yb(),m.Yb()),2&e){var t=n.$implicit;m.Mb(3),m.wc("Spell Input: ",t.input_name,""),m.Mb(11),m.wc(" ",t.info," "),m.Mb(2),m.wc(" ",t.example," ")}}function x(e,n){if(1&e&&(m.Zb(0,"ion-col",30),m.Zb(1,"ion-card"),m.Zb(2,"ion-card-header",6),m.Zb(3,"ion-card-title"),m.uc(4),m.Yb(),m.Zb(5,"ion-card-subtitle"),m.uc(6),m.Yb(),m.Yb(),m.Zb(7,"ion-card-content",6),m.tc(8,F,17,3,"div",16),m.Yb(),m.Yb(),m.Yb()),2&e){var t=n.$implicit,i=m.jc(3);m.Mb(4),m.xc(" ",i.spells_dict[t].spell_type," - ",i.spells_dict[t].spell_name," "),m.Mb(2),m.wc(" ",i.spells_dict[t].spell_info," "),m.Mb(2),m.mc("ngForOf",i.spells_dict[t].spell_inputs_metadata)}}function G(e,n){if(1&e&&(m.Zb(0,"div"),m.Zb(1,"h3"),m.uc(2),m.Yb(),m.Zb(3,"h3"),m.uc(4),m.Yb(),m.Zb(5,"h3"),m.uc(6),m.Yb(),m.Zb(7,"ul"),m.Zb(8,"li"),m.uc(9),m.Yb(),m.Zb(10,"li"),m.uc(11),m.Yb(),m.Zb(12,"li"),m.uc(13),m.Yb(),m.Zb(14,"li"),m.uc(15),m.Yb(),m.Yb(),m.Yb()),2&e){var t=n.$implicit;m.Mb(2),m.wc("Spell Input: ",t.input_name,""),m.Mb(2),m.wc("Input Info: ",t.info,""),m.Mb(2),m.wc("Example Value: ",t.example,""),m.Mb(3),m.wc("takesMana: ",t.takesMana," "),m.Mb(2),m.wc("takesCSV: ",t.takesCSV," "),m.Mb(2),m.wc("takesAPI: ",t.takesAPI," "),m.Mb(2),m.wc("takesDB: ",t.takesDB," ")}}function q(e,n){if(1&e){var t=m.ac();m.Zb(0,"ion-button",17),m.hc("click",(function(e){m.qc(t);var n=m.jc().$implicit;return m.jc(3).addToGrim(n)})),m.uc(1,"Add to Grimoire "),m.Yb()}}function P(e,n){if(1&e){var t=m.ac();m.Zb(0,"ion-button",34),m.hc("click",(function(e){m.qc(t);var n=m.jc().$implicit;return m.jc(3).removeFromGrim(n)})),m.uc(1,"Remove from Grimoire"),m.Yb()}}function $(e,n){if(1&e&&(m.Zb(0,"tr"),m.Zb(1,"td"),m.uc(2),m.Yb(),m.Zb(3,"td"),m.uc(4),m.Yb(),m.Zb(5,"td"),m.uc(6),m.Yb(),m.Zb(7,"td"),m.uc(8),m.Yb(),m.Zb(9,"td"),m.tc(10,G,16,7,"div",16),m.Yb(),m.Zb(11,"td"),m.uc(12),m.Yb(),m.Zb(13,"td"),m.tc(14,q,2,0,"ion-button",32),m.tc(15,P,2,0,"ion-button",33),m.Yb(),m.Yb()),2&e){var t=n.$implicit,i=m.jc(3);m.Mb(2),m.vc(t.spell_name),m.Mb(2),m.vc(t.spell_info),m.Mb(2),m.vc(t.spell_type),m.Mb(2),m.vc(t.has_user_spell_inputs),m.Mb(2),m.mc("ngForOf",t.spell_inputs_metadata),m.Mb(2),m.vc(t.spell_output),m.Mb(2),m.mc("ngIf",0==i.inNewGrim(t)),m.Mb(1),m.mc("ngIf",1==i.inNewGrim(t))}}function T(e,n){if(1&e){var t=m.ac();m.Zb(0,"div"),m.Xb(1,"br"),m.Xb(2,"br"),m.Zb(3,"ion-list",6),m.Zb(4,"ion-label"),m.uc(5,"Grimoire Name:"),m.Yb(),m.Zb(6,"ion-item"),m.Zb(7,"ion-input",25),m.hc("ngModelChange",(function(e){return m.qc(t),m.jc(2).new_grim_name=e})),m.Yb(),m.Yb(),m.Zb(8,"ion-label"),m.uc(9,"Grimoire Description:"),m.Yb(),m.Zb(10,"ion-item"),m.Zb(11,"ion-input",26),m.hc("ngModelChange",(function(e){return m.qc(t),m.jc(2).new_grim_desc=e})),m.Yb(),m.Yb(),m.Yb(),m.Zb(12,"ion-row"),m.tc(13,x,9,4,"ion-col",27),m.Yb(),m.Zb(14,"ion-button",28),m.hc("click",(function(e){return m.qc(t),m.jc(2).createGrim()})),m.uc(15,"Create Grimoire "),m.Yb(),m.Zb(16,"table",29),m.Zb(17,"thead"),m.Zb(18,"tr"),m.Zb(19,"th"),m.uc(20,"Spell Name"),m.Yb(),m.Zb(21,"th"),m.uc(22,"Spell Info"),m.Yb(),m.Zb(23,"th"),m.uc(24,"Spell Type"),m.Yb(),m.Zb(25,"th"),m.uc(26,"Has user inputs?"),m.Yb(),m.Zb(27,"th"),m.uc(28,"Spell Inputs"),m.Yb(),m.Zb(29,"th"),m.uc(30,"Spell Output"),m.Yb(),m.Zb(31,"th"),m.uc(32,"Add Spell"),m.Yb(),m.Yb(),m.Yb(),m.Zb(33,"tbody"),m.tc(34,$,16,8,"tr",16),m.Yb(),m.Yb(),m.Yb()}if(2&e){var i=m.jc(2);m.Mb(7),m.mc("ngModel",i.new_grim_name),m.Mb(4),m.mc("ngModel",i.new_grim_desc),m.Mb(2),m.mc("ngForOf",i.new_grim),m.Mb(3),m.mc("dtOptions",i.dtOptions),m.Mb(18),m.mc("ngForOf",i.spells)}}function D(e,n){1&e&&m.Xb(0,"div")}function V(e,n){if(1&e){var t=m.ac();m.Zb(0,"div"),m.Zb(1,"h2",6),m.uc(2,"Create new Grimoires"),m.Yb(),m.Zb(3,"ion-row"),m.Zb(4,"ion-col",24),m.Zb(5,"ion-card",1),m.hc("click",(function(e){return m.qc(t),m.jc().change_conjure_type("grim")})),m.Zb(6,"ion-card-header"),m.Zb(7,"ion-title",6),m.Zb(8,"h1"),m.uc(9,"Grimoire"),m.Yb(),m.Yb(),m.Yb(),m.Zb(10,"ion-card-content",6),m.uc(11," Collection of spells "),m.Yb(),m.Yb(),m.Yb(),m.Zb(12,"ion-col",15),m.Zb(13,"ion-card",1),m.hc("click",(function(e){return m.qc(t),m.jc().change_conjure_type("spell")})),m.Zb(14,"ion-card-header"),m.Zb(15,"ion-title",6),m.Zb(16,"h1"),m.uc(17,"Spell"),m.Yb(),m.Yb(),m.Yb(),m.Zb(18,"ion-card-content",6),m.uc(19," Indiviudal spell "),m.Yb(),m.Yb(),m.Yb(),m.Yb(),m.tc(20,T,35,5,"div",5),m.tc(21,D,1,0,"div",5),m.Yb()}if(2&e){var i=m.jc();m.Mb(20),m.mc("ngIf","grim"==i.conjure_type),m.Mb(1),m.mc("ngIf","spell"==i.conjure_type)}}var z,E,X=[{path:"",component:(z=function(){function e(n,t,i,o,c,l){_classCallCheck(this,e),this.http=n,this.magicService=t,this.navCtrl=i,this.utilityService=o,this.file_writer=c,this.alertController=l,this.uploader=new b.c({}),this.api_url=d.a.api_url,this.current_source=null,this.showResults=!1,this.showCasts=!1,this.spell_mode="cast",this.new_grim=[],this.spells_dict={},this.dtOptions={},this.spell_tomb={},this.dtOptions={pageLength:20}}return _createClass(e,[{key:"segmentChanged",value:function(e){console.log("Segment changed",e),this.spell_mode=e.detail.value,console.log(this.spell_mode)}},{key:"createGrim",value:function(){var e=this;console.log("Creating grim");var n=new p.c({"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}),t=[];this.new_grim.forEach((function(n){t.push(e.spells_dict[n])}));var i={};i.name=this.new_grim_name,i.value=this.new_grim_desc,i.spells=t;var o=this.api_url+"/create_grim?project_name="+this.project.name;console.log("calling this url: "+o),this.http.post(o,i,{headers:n}).toPromise().then((function(n){console.log(n),e.showResults=!0,e.results=n,e.get_grims()}),(function(e){console.log("ok we should back out"),console.log(e)}))}},{key:"inNewGrim",value:function(e){return-1!=this.new_grim.indexOf(e.spell_type+"_"+e.spell_name)}},{key:"removeFromGrim",value:function(e){var n=this.new_grim.indexOf(e.spell_type+"_"+e.spell_name);this.new_grim.splice(n,1)}},{key:"addToGrim",value:function(e){this.new_grim.push(e.spell_type+"_"+e.spell_name)}},{key:"ngOnInit",value:function(){this.magicService.isBlank&&(console.log("return"),window.location.href="/"),this.project=this.magicService.Data.curr_project,console.log(this.project),this.getSources(),this.get_grims(),this.get_spells(),this.getCasts()}},{key:"viewCast",value:function(e){console.log("viewing cast"),console.log(e),this.magicService.Data.curr_cast=e,this.navCtrl.navigateForward("/view-cast")}},{key:"getCasts",value:function(){var e=this;console.log("getting casts");var n=new p.c({"Content-Type":"application/json","Access-Control-Allow-Origin":"*"});this.http.get(this.api_url+"/get_casts?project_name="+this.project.name,{headers:n}).toPromise().then((function(n){console.log(n),e.casts=n.casts,console.log(e.casts),e.showCasts=!0}),(function(n){console.log("ok we should back out"),console.log(n),e.utilityService.presentModelAlert("Error try again")}))}},{key:"getSources",value:function(){var e=this;console.log("getting mana sources");var n=new p.c({"Content-Type":"application/json","Access-Control-Allow-Origin":"*"});this.http.get(this.api_url+"/get_project_mana?project_name="+this.project.name,{headers:n}).toPromise().then((function(n){console.log(n),e.mana_sources=n.sources,console.log(e.mana_sources)}),(function(n){console.log("ok we should back out"),console.log(n),e.utilityService.presentModelAlert("Error try again")}))}},{key:"change_mana_type",value:function(e){this.mana_type=e}},{key:"change_conjure_type",value:function(e){this.conjure_type=e}},{key:"set_pipeline",value:function(e){this.pipeline=e}},{key:"set_source",value:function(e){this.current_source=e,console.log(e),this.spell_tomb.mana_location="mana/"+e.file_name}},{key:"get_grims",value:function(){var e=this;console.log("getting grims");var n=new p.c({"Content-Type":"application/json","Access-Control-Allow-Origin":"*"});this.http.get(this.api_url+"/get_grims",{headers:n}).toPromise().then((function(n){e.grims=n.grims,console.log(e.grims)}),(function(n){console.log("ok we should back out"),console.log(n),e.utilityService.presentModelAlert("Error try again")}))}},{key:"get_spells",value:function(){var e=this;console.log("getting spells");var n=new p.c({"Content-Type":"application/json","Access-Control-Allow-Origin":"*"});this.http.get(this.api_url+"/get_spells",{headers:n}).toPromise().then((function(n){console.log("got spells"),e.spells=n.spells,console.log(e.spells),e.spells.forEach((function(n){e.spells_dict[n.spell_type+"_"+n.spell_name]=n}))}),(function(n){console.log("ok we should back out"),console.log(n),e.utilityService.presentModelAlert("Error try again")}))}},{key:"cast_grim",value:function(e){var n=this;console.log("Going to cast grimID: "+e),console.dir(this.grims[e]),console.log("Got this spell tomb"),console.dir(this.spell_tomb);var t=this.grims[e];t.spells[0].spell_inputs=this.spell_tomb,console.log("Here is updated spell tomb"),console.dir(t);var i=new p.c({"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}),o=this.api_url+"/cast_grim?project_name="+this.project.name+"&mana="+this.current_source.file_name;console.log("calling this url: "+o),this.http.post(o,t,{headers:i}).toPromise().then((function(e){console.log(e),n.showResults=!0,n.results=e,n.getCasts()}),(function(e){console.log("ok we should back out"),console.log(e)}))}},{key:"upload",value:function(){var e=this,n=this.getFiles();if(console.log(n),console.log(n[0].type),"text/csv"==n[0].type){var t=new FormData;t.append("somekey","some value"),n.forEach((function(e){t.append("file_data",e.rawFile,e.name)})),console.log(t);var i=new p.c({"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}),o=this.api_url+"/add_csv_mana_source?project_name="+this.project.name;console.log("calling this url: "+o),this.http.post(o,t,{headers:i}).toPromise().then((function(n){console.log(n),e.mana=n,e.getSources()}),(function(e){console.log("ok we should back out"),console.log(e)}))}else this.presentAlert()}},{key:"presentAlert",value:function(){return Object(r.b)(this,void 0,void 0,regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.alertController.create({header:"Error",message:"Must upload valid csv file",buttons:["OK"]});case 2:return n=e.sent,e.next=5,n.present();case 5:case"end":return e.stop()}}),e,this)})))}},{key:"clearQueue",value:function(){this.uploader.queue.length>=1&&this.uploader.queue[0].remove()}},{key:"getFiles",value:function(){return this.uploader.queue.map((function(e){return console.log(e),e.file}))}},{key:"submitCSV",value:function(){console.log("uploading file"),this.upload(),console.log("upload finished")}}]),e}(),z.\u0275fac=function(e){return new(e||z)(m.Wb(p.a),m.Wb(a.a),m.Wb(c.G),m.Wb(s.a),m.Wb(u.a),m.Wb(c.a))},z.\u0275cmp=m.Qb({type:z,selectors:[["app-project-mana"]],features:[m.Lb([u.a])],decls:19,vars:4,consts:[[1,"top-content"],[3,"click"],[3,"value","ngModel","ionChange","ngModelChange"],["value","cast"],["value","conjure"],[4,"ngIf"],["text-center",""],["size","2",4,"ngFor","ngForOf"],["offset","3","size","2"],["size","2"],["offset","4","size","3",4,"ngIf"],["offset","4","size","3"],["type","file","ng2FileSelect","",3,"uploader","click"],["expand","full","color","primary","shape","round",3,"click"],["size","3",4,"ngFor","ngForOf"],["size","3"],[4,"ngFor","ngForOf"],["shape","round",3,"click"],["text-center","",4,"ngIf"],["type","text",3,"ngModel","value","ngModelChange"],["okText","Okay","cancelText","Dismiss",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],["id","cast_table","datatable","",1,"row-border","hover",3,"dtOptions"],["offset","3","size","3"],["type","text","placeholder","Name",3,"ngModel","ngModelChange"],["type","text","placeholder","Description",3,"ngModel","ngModelChange"],["size","4",4,"ngFor","ngForOf"],["expand","full","shape","round",3,"click"],["id","spell_table","datatable","",1,"row-border","hover",3,"dtOptions"],["size","4"],["border","1","width","100%"],["shape","round",3,"click",4,"ngIf"],["shape","round","color","danger",3,"click",4,"ngIf"],["shape","round","color","danger",3,"click"]],template:function(e,n){1&e&&(m.Zb(0,"ion-header"),m.Zb(1,"ion-toolbar"),m.Zb(2,"ion-title"),m.uc(3," Grimoire "),m.Yb(),m.Yb(),m.Yb(),m.Zb(4,"ion-content"),m.Zb(5,"ion-row",0),m.Zb(6,"ion-col"),m.Zb(7,"a",1),m.hc("click",(function(e){return n.utilityService.navURL("/home")})),m.uc(8,"Home"),m.Yb(),m.uc(9," > Project "),m.Yb(),m.Yb(),m.Zb(10,"ion-segment",2),m.hc("ionChange",(function(e){return n.segmentChanged(e)}))("ngModelChange",(function(e){return n.spell_mode=e})),m.Zb(11,"ion-segment-button",3),m.Zb(12,"ion-label"),m.uc(13,"Cast Spells"),m.Yb(),m.Yb(),m.Zb(14,"ion-segment-button",4),m.Zb(15,"ion-label"),m.uc(16,"Conjure Spells"),m.Yb(),m.Yb(),m.Yb(),m.tc(17,A,44,4,"div",5),m.tc(18,V,22,2,"div",5),m.Yb()),2&e&&(m.Mb(10),m.nc("value",n.spell_mode),m.mc("ngModel",n.spell_mode),m.Mb(7),m.mc("ngIf","cast"==n.spell_mode),m.Mb(1),m.mc("ngIf","conjure"==n.spell_mode))},directives:[c.n,c.B,c.A,c.l,c.u,c.k,c.w,c.J,o.c,o.d,c.x,c.r,i.i,c.m,c.b,i.h,c.f,c.h,c.g,c.s,c.q,b.a,c.d,c.j,c.i,c.p,c.K,c.y,c.z,h.a],styles:[""]}),z)}],N=((E=function e(){_classCallCheck(this,e)}).\u0275mod=m.Ub({type:E}),E.\u0275inj=m.Tb({factory:function(e){return new(e||E)},imports:[[l.i.forChild(X)],l.i]}),E);t.d(n,"ProjectManaPageModule",(function(){return B}));var R,B=((R=function e(){_classCallCheck(this,e)}).\u0275mod=m.Ub({type:R}),R.\u0275inj=m.Tb({factory:function(e){return new(e||R)},imports:[[i.b,o.a,c.C,h.b,b.b,N]]}),R)}}]);