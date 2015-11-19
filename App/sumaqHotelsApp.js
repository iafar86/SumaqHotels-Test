var sumaqHotelsApp = angular
    .module('sumaqHotelsApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ngMaterial',
        'ngStorage',
        //'ngStore',
        'ui.router',
        'ui.utils',
        'ui.bootstrap',
        //'ui.load',
        //'ui.jp',
        //'pascalprecht.translate',
        'oc.lazyLoad',
        'angular-loading-bar',
        'ngTable',
        'ct.ui.router.extras',        
        'daypilot',
        'LocalStorageModule',
        'angular-jwt'        
    ])

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $stickyStateProvider, cfpLoadingBarProvider) {

        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.includeBar = true;


        $urlRouterProvider.otherwise("/");

        $stateProvider //fpaz: defino los states que van a guiar el ruteo de las vistas parciales de la app       
        
        $stateProvider
        
        //#region index
            .state('index', {
                      url: "/",
                      views: {
                          '': {
                              templateUrl: '/App/Dashboard/Partials/login.html',
                              controller: 'loginCtrl',
                              resolve: {
                                  loadLoginCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {                                      
                                      return $ocLazyLoad.load(['App/Seguridad/loginCtrl.js','App/Seguridad/styleLoginCss.css']);
                                  }]
                              }

                          },
                          'aside': {
                              templateUrl: ''
                          },
                          'content': {
                              templateUrl: ''
                          }
                      }
                  })
        //#endregion

        .state('app', {
              abstract: true,
              url: '/app',
              views: {
                  '': {
                      templateUrl: 'views/layout.html'
                  },
                  'aside': {
                      templateUrl: 'views/aside.html'
                  },
                  'content': {
                      templateUrl: 'views/content.html'
                  }
              }
          })
        .state('app.dashboard', {
                url: '/dashboard',
                templateUrl: 'views/ui/material/ngmaterial.html',
                data: { title: 'Dashboard', folded: true },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('scripts/controllers/material.js');
                    }]
                }                
            })
        .state('app.analysis', {
             url: '/analysis',
             templateUrl: 'views/pages/dashboard.analysis.html',
             data: { title: 'Analysis' },
             resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                 loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                     // you can lazy load files for an existing module
                     return $ocLazyLoad.load(['scripts/controllers/chart.js', 'scripts/controllers/vectormap.js']);
                 }]
             }
         })
        .state('app.booking', {
            url: '/booking',
            templateUrl: 'App/Booking/Partials/demo.html',
            controller: 'bookingCtrl',
            data: { title: 'Booking' },
            resolve: { 
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load(['App/Booking/bookingCtrl.js', '/App/Booking/demoCss.css']);
                }]
            }
        })
       })

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorSvc');//agrego al array de interceptor el sevicio authInterceptorSvc que se encarga de mandar ,en cada peticion al web api, el token de acceso obtenido en el login y de redirigir a la pagina de logueo , en caso de que un usuario anonimo quiera agseder a un recurso privado
    })
    .config(
    ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider, $compileProvider, $filterProvider, $provide) {

        // lazy controller, directive and service
        sumaqHotelsApp.controller = $controllerProvider.register;
        sumaqHotelsApp.directive = $compileProvider.directive;
        sumaqHotelsApp.filter = $filterProvider.register;
        sumaqHotelsApp.factory = $provide.factory;
        sumaqHotelsApp.service = $provide.service;
        sumaqHotelsApp.constant = $provide.constant;
        sumaqHotelsApp.value = $provide.value;
    }
    ])
    .run(['authSvc', function (authSvc) { //cada ves que el usuario entra a la aplicacion ejecuto la funcion para obtener el token guardado en el storage que este vigente, en caso de que exita uno almacenado
        authSvc.fillAuthData();
    }]) 
;
