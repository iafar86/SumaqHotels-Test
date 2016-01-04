var sumaqHotelsApp = angular.module('sumaqHotelsApp', ['ngResource', 'ngMdIcons', 'ui.router', 'ngCookies', 'ngTable',
  'ngSanitize', 'ngAnimate', 'ngAria', 'ct.ui.router.extras', 'angular-loading-bar', 'daypilot', 'LocalStorageModule', 'angular-jwt', 'ngMaterial',
  'oc.lazyLoad', 'ng-mfb', 'angular-input-stars', 'ngAutocomplete']) 
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $stickyStateProvider, cfpLoadingBarProvider) {

        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.includeBar = true;


        $urlRouterProvider.otherwise("/seguridad/login");

        $stateProvider //fpaz: defino los states que van a guiar el ruteo de las vistas parciales de la app       
            //#region Seguridad
            .state('seguridad', {
                abstract: true,
                url: '/seguridad',
                views: {
                    '': {
                        templateUrl: ''
                    },
                    'aside': {
                        templateUrl: ''
                    },
                    'content': {
                        templateUrl: ''
                    }
                }
            })
            .state('seguridad.login', {
                url: '/login',
                templateUrl: '/App/Seguridad/Partials/login.html',
                controller: 'loginCtrl',
                resolve: {
                    loadLoginCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['App/Seguridad/loginCtrl.js', 'App/Seguridad/styleLoginCss.css']);
                    }]
                }
            })
        .state('seguridad.signup', {
            url: '/signup',
            templateUrl: '/App/Seguridad/Partials/signup.html',
            controller: 'signupCtrl',
            resolve: {
                loadLoginCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['App/Seguridad/signupCtrl.js', 'App/Seguridad/styleLoginCss.css']);
                }]
            }
        })
            .state('seguridad.confirm', {
                url: '/confirm',
                templateUrl: '/App/Seguridad/Partials/confirmCuenta.html',
                controller: 'loginCtrl',
                resolve: {
                    loadLoginCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['App/Seguridad/loginCtrl.js']);
                    }]
                }
            })
        //#endregion

            //#region Dashboard
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
                templateUrl: 'views/pages/dashboard.html',
                data: { title: 'Dashboard', folded: true },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load(['scripts/controllers/chart.js', 'scripts/controllers/vectormap.js']);
                    }]
                }
            })
            .state('app.perfil', {
                url: '/perfilUsuario',
                templateUrl: 'views/pages/settings.html',
                data: { title: 'Perfil de Usuario' }
            })

            //#endregion

            //#region Hoteles
            .state('hotel', {
                abstract: true,
                url: '/hotel',
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

            .state('hotel.info', {
                url: '/info',
                templateUrl: '/App/Hoteles/Partials/hotelesMain_AM.html',
                controller: 'hotelesCtrl',
                data: { title: 'Info Hotel' },
                resolve: {
                    hotelesDataFactory: 'hotelesDataFactory',
                    infoHotel: function () {
                        return { value: [] };
                    },
                    tiposHotelesDataFactory: 'tiposHotelesDataFactory',
                    listadoTiposHoteles: function (tiposHotelesDataFactory) {
                        return tiposHotelesDataFactory.query();
                    },
                    categoriasDataFactory: 'categoriasDataFactory',
                    listadoCategorias: function (categoriasDataFactory) {
                        return categoriasDataFactory.query();
                    },
                    loadHotelCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['App/Hoteles/hotelesCtrl.js', 'styles/angular-input-stars.css']);
                    }]
                }
            })
        //#endregion  

        //#region Tipos Habitacion
            .state('tipoHab', {
                abstract: true,
                url: '/TiposHabitaciones',
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

            .state('tipoHab.lista', {
                url: "/TiposHabitaciones",
                templateUrl: '/App/TiposHabitacion/Partials/tiposHabMain.html',
                controller: 'tiposHabCtrl',
                data: { title: 'Tipos de Habitaciones' },
                resolve: {
                    tiposHabDataFactory: 'tiposHabDataFactory',
                    listadoTiposHab: function (tiposHabDataFactory) {
                        return tiposHabDataFactory.query();
                    },
                    tiposCamasDataFactory: 'tiposCamasDataFactory',
                    listadoTiposCamas: function (tiposCamasDataFactory) {
                        return tiposCamasDataFactory.query();
                    },
                    serviciosDataFactory: 'serviciosDataFactory',
                    listadoServicios: function (serviciosDataFactory) {
                        return serviciosDataFactory.query();
                    },
                    loadTiposHabitacionesCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['App/TiposHabitacion/tiposHabCtrl.js']);
                    }]
                }
            })
        //#endregion  

        //#region Habitaciones
            .state('habitaciones', {
                abstract: true,
                url: '/Habitaciones',
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

            .state('habitaciones.lista', {
                url: "/Listado",
                templateUrl: '/App/Habitaciones/Partials/habitacionesDetail.html',
                controller: 'habitacionesCtrl',
                data: { title: 'Listado de Habitaciones' },
                resolve: {
                    habitacionesDataFactory: 'habitacionesDataFactory',
                    infoHabitacion: function () {
                        return { value: [] };
                    },
                    listadoHabitaciones: function (habitacionesDataFactory) {
                        return habitacionesDataFactory.query();
                    },
                    prmTipoHab: function () {
                        return { value: [] };
                    },
                    loadHabitacionesCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['App/Habitaciones/habitacionesCtrl.js']);
                    }]
                }
            })
        //#endregion  

        //#region Pasajeros
            .state('pasajeros', {
                abstract: true,
                url: '/Pasajeros',
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

            .state('pasajeros.list', {
                url: "/Listado",
                templateUrl: '/App/Pasajeros/Partials/pasajerosMain_AM.html',
                controller: 'pasajerosCtrl',
                data: { title: 'Listado de Pasajeros' },
                resolve: {
                    loadPasajerosCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['App/Pasajeros/pasajerosCtrl.js']);
                    }]
                }
            })

         .state('pasajeros.add', {
             url: "/add",
             templateUrl: '/App/Pasajeros/Partials/pasajerosAdd_AM.html',
             controller: 'pasajerosCtrl',
             data: { title: 'Alta de Pasajeros' },
             resolve: {
                 loadPasajerosCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                     return $ocLazyLoad.load(['App/Pasajeros/pasajerosCtrl.js']);
                 }]
             }
         })

        //#endregion  

        //#region Booking
        .state('booking', {
            abstract: true,
            url: '/booking',
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

            .state('booking.principal', {
                url: "/principal",
                templateUrl: '/App/Booking/Partials/demo.html',
                controller: 'bookingCtrl',
                data: { title: 'Booking' },
                resolve: {
                    loadBookingCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['App/Booking/bookingCtrl.js']);
                    }]
                }
            })
        //#endregion
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
    }]);
