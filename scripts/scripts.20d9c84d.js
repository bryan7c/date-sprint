"use strict";angular.module("datasSprintApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngMaterial"]).config(["$routeProvider",function(a){a.when("/main",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/",{templateUrl:"views/gerarador.html",controller:"GeraradorCtrl",controllerAs:"gerador"}).when("/gerador",{templateUrl:"views/gerarador.html",controller:"GeraradorCtrl",controllerAs:"gerador"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl",controllerAs:"contact"}).otherwise({redirectTo:"/gerador"})}]),angular.module("datasSprintApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("datasSprintApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("datasSprintApp").controller("GeraradorCtrl",["$scope","SprintAPI","$mdSidenav","$filter","$mdToast",function(a,b,c,d,e){function f(a){a=a||"Deu zica";var b=e.simple().content(a).action("OK").highlightAction(!1).position("top right");e.show(b)}function g(){b.init(a.gerador.sprint),a.gerador.sprint=b.getSprint()}function h(){c("right").close().then(function(){console.log("fechado")})}function i(){c("right").open().then(function(){console.log("aberto")})}this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],this.sprint={},this.sprint.dataInicio=new Date,this.sprint.dias=1,this.sprint.usarDiasUteis=!0,this.dataMax=new Date(this.sprint.dataInicio.getFullYear(),this.sprint.dataInicio.getMonth(),this.sprint.dataInicio.getDate()+14),this.dataMin=new Date(this.sprint.dataInicio.getFullYear(),this.sprint.dataInicio.getMonth(),this.sprint.dataInicio.getDate()-3),b.init(this.sprint),this.sprint=b.getSprint(),this.closeNav=function(){h()},this.openNav=function(){i()},this.adicionarEstoria=function(c){b.addEstoria(c),this.sprint=b.getSprint(),this.estoria={},a.formEstoria.$setUntouched(),formEstoria.nome.focus()},this.iniciarInclusao=function(){g(),i()},a.$watch("gerador.sprint",function(){g()},!0),a.$watch("gerador.sprint.feriado",function(){a.gerador.sprint.feriado&&f("Este sprint contém um feriado!")},!0)}]),angular.module("datasSprintApp").factory("SprintAPI",["dateUtil",function(a){var b={};b.usarDiasUteis=!1;var c,d=function(c){b.dataInicio=c.dataInicio,b.dias=c.dias,b.usarDiasUteis=c.usarDiasUteis,b.pontos=1,b.feriado=a.hasHoliday,k(b.pontos/b.dias),m(),b.estorias&&(n(),l())},e=function(a){a&&(b.estorias||(b.estorias=[]),a.nome=a.nome||"story-"+(b.estorias.length+1),b.estorias.push(a),n()),l()},f=function(){return b.pontos},g=function(){return b},h=function(){return b.dataFim},i=function(){return b.estorias},j=function(a){b.pontos=a},k=function(a){c=a},l=function(){var d=c,e=angular.copy(b.dataInicio);b.estorias.forEach(function(f){for(;f.pontos>=d;)d+=c,e=a.incrementDay(e,1,b.usarDiasUteis);d-=f.pontos,f.data=e})},m=function(){b.dataFim=a.incrementDay(b.dataInicio,b.dias,b.usarDiasUteis)},n=function(){var a=0;b.estorias.forEach(function(b){a+=b.pontos}),j(a),k(b.pontos/b.dias)};return{init:d,getSprint:g,addEstoria:e,getEstorias:i,getDataFim:h,getPontos:f}}]),angular.module("datasSprintApp").controller("ContactCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("datasSprintApp").service("dateUtil",["$http",function(a){function b(a){var b=new DOMParser,c=b.parseFromString(a,"text/xml");c=c.getElementsByTagName("Holiday");for(var f=0;f<c.length;f++)d.push({nome:c[f].getElementsByTagName("Name")[0].innerHTML,date:new Date(c[f].getElementsByTagName("Date")[0].innerHTML),description:c[f].getElementsByTagName("Description")[0].innerHTML}),e.push(c[f].getElementsByTagName("Date")[0].innerHTML)}function c(a){try{if(""===a)throw"empty";if(!a)throw"Not is valid";if("Date"!==a.constructor.name)throw"Not is a Date type";var b=a.toISOString();return e.indexOf(b.substring(0,11)+"00:00:00")}catch(c){console.error("date-util: isHoliday error:"+c)}}var d=[],e=[];a.get("http://services.sapo.pt/Holiday/GetNationalHolidays?year=2015").success(function(a){b(a)}),this.hasHoliday=!1,this.incrementDay=function(a,b,d){d=d||!1,this.hasHoliday=!1;var e=new Date(a);if(b>0)for(var f=0;b>f;)e.setDate(e.getDate()+1),(!d||0!==e.getDay()&&6!==e.getDay())&&(c(e)>-1?this.hasHoliday=!0:f++);return e},this.intervalDay=function(a,b,c){c=c||!1;var d=Date.UTC(a.getFullYear(),a.getMonth(),a.getDate()),e=Date.UTC(b.getFullYear(),b.getMonth(),b.getDate()),f=Math.floor((e-d)/864e5);if(c){for(var g=0;a!==b;)a.setDate(a.getDate()+1),0!==a.getDay()&&6!==a.getDay()&&g++;f=g}return f}}]),angular.module("datasSprintApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/contact.html","<p>This is the contact view.</p>"),a.put("views/gerarador.html",'<form name="formGerador"> <div layout="row" layout-align="center center"> <div flex="33"> <md-datepicker ng-model="gerador.sprint.dataInicio" md-placeholder="Data do início do Sprint" md-min-date="gerador.dataMin" md-max-date="gerador.dataMax" required></md-datepicker> </div> <div flex> <md-input-container> <label>Quantidade de dias</label> <input ng-model="gerador.sprint.dias" type="number" max="14" min="1" required> </md-input-container> </div> <div flex="30"> <md-checkbox ng-model="gerador.sprint.usarDiasUteis" aria-label="Usar dias úteis"> Considerar dias úteis </md-checkbox> </div> </div> <div layout="row" layout-align="center center"> <div flex="33"> <md-datepicker ng-model="gerador.sprint.dataFim" md-placeholder="Data do fim do Sprint" disabled></md-datepicker> </div> <div flex> <md-input-container> <label>Quantidade de pontos</label> <input ng-model="gerador.sprint.pontos" type="number" max="999" min="1" disabled> </md-input-container> </div> </div> </form> <div class="table-responsive"> <table class="table table-striped" ng-if="gerador.sprint.estorias"> <thead> <tr> <th>Estoria</th> <th>Pontos</th> <th>Tasks</th> <th>Data de entrega</th> </tr> </thead> <tbody> <tr ng-repeat="estoria in gerador.sprint.estorias"> <td>{{estoria.nome}}</td> <td>{{estoria.pontos}}</td> <td>{{estoria.tasks}}</td> <td>{{estoria.data | date: \'dd/MM\'}} <!-- <md-input-container>\n					  <input type="text" value="{{estoria.data |  date: \'dd/MM\'}}" />\n					</md-input-container> --> </td> <!-- <td>\n					<md-button class="md-icon-button" aria-label="Settings">\n						<md-icon aria-label="Delete">\n							<i class="material-icons md-24">delete</i>\n						</md-icon>\n				    </md-button>\n	      		</td> --> </tr> </tbody> </table> </div> <div layout="row" layout-align="end end"> <md-button class="md-fab" aria-label="Eat cake" ng-disabled="formGerador.$invalid" ng-click="gerador.iniciarInclusao()"> <md-icon aria-label="Adicionar estoria"> <i class="material-icons md-24">add</i> </md-icon> <md-tooltip> Adicionar estoria </md-tooltip> </md-button> </div> <md-sidenav class="md-sidenav-right md-whiteframe-z2" md-component-id="right"> <md-toolbar class="md-theme-light"> <h1 class="md-toolbar-tools">Adicionar Estoria</h1> </md-toolbar> <md-content layout-padding> <form name="formEstoria"> <md-input-container> <label for="nome">Estoria</label> <input type="text" name="nome" id="nome" ng-model="gerador.estoria.nome" md-autofocus> </md-input-container> <md-input-container> <label for="pontos">Pontos</label> <input type="number" name="pontos" id="pontos" ng-model="gerador.estoria.pontos" min="1" required> </md-input-container> <md-input-container> <label for="tasks">Quantidade de tasks</label> <input type="number" name="tasks" id="tasks" ng-model="gerador.estoria.tasks" min="1" required> </md-input-container> </form> <md-button ng-click="gerador.closeNav()"> Cancelar </md-button> <md-button ng-click="gerador.adicionarEstoria(gerador.estoria)" class="md-primary" ng-disabled="formEstoria.$invalid"> Add estoria </md-button> </md-content> </md-sidenav>'),a.put("views/main.html",'<div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> <img src="images/yeoman.png" alt="I\'m Yeoman"><br> Always a pleasure scaffolding your apps. </p> <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>')}]);