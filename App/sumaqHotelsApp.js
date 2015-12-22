var sumaqHotelsApp = angular.module('sumaqHotelsApp', ['ngResource', 'ngMdIcons', 'ui.router', 'ngCookies', 'ngTable',
  'ngSanitize', 'ngAnimate', 'ngAria', 'ct.ui.router.extras', 'angular-loading-bar', 'daypilot', 'LocalStorageModule', 'angular-jwt', 'ngMaterial',
  'oc.lazyLoad','ng-mfb', 'angular-input-stars', 'ngAutocomplete']) //'ng-mfb', , 'angular-input-stars'
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

            //#region Empleador
            .state('empleador', {
                abstract: true,
                url: '/empleador',
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
            .state('empleador.info', {
                url: '/info',
                templateUrl: '/App/Empleador/Partials/empleadorInfo.html',
                controller: 'empleadorCtrl',
                data: { title: 'Info Empleador' },
                resolve: {
                    empleadorDataFactory: 'empleadorDataFactory',
                    infoEmpleador: function (empleadorDataFactory) {
                        return { value: [] };
                    },
                    listadoEmpleadores: function (empleadorDataFactory) {
                        return empleadorDataFactory.query();
                    },
                    loadEmpleadorCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['App/Empleador/empleadorCtrl.js', 'App/Empleador/empleadorDataFactory.js']);
                    }],
                    //infoEmpleador: [function (loadEmpleadorCtrl, empleadorDataFactory) {
                    //    return empleadorDataFactory.get({ id: 0 });
                    //}],
                    //listadoEmpleadores: [function (loadEmpleadorCtrl, empleadorDataFactory) {
                    //    return { value: [] };
                    //}]
                }
            })
            .state('empleador.add', {
                url: '/add',
                templateUrl: '/App/Empleador/Partials/empleadorAdd.html',
                controller: 'empleadorCtrl',
                data: { title: 'Alta de Empleador' },
                resolve: {
                    empleadorDataFactory: 'empleadorDataFactory',
                    infoEmpleador: function (empleadorDataFactory) {
                        return { value: [] };
                    },
                    listadoEmpleadores: function (empleadorDataFactory) {
                        return empleadorDataFactory.query();
                    },
                    loadEmpleadorCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['App/Empleador/empleadorCtrl.js', 'App/Empleador/empleadorDataFactory.js']);
                    }]
                }
            })
            //#endregion

            //#region Ofertas Empleador
            .state('ofertas', {
                abstract: true,
                url: '/ofertas',
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
            .state('ofertas.add', {
                url: '/add',
                templateUrl: '/App/Oferta/Partials/ofertaAdd-MD.html',
                controller: 'ofertaCtrl',
                data: { title: 'Nueva Oferta' },
                resolve: {
                    ofertaDataFactory: 'ofertaDataFactory',
                    listadoOfertas: function (ofertaDataFactory) {
                        return { value: [] };
                    },
                    loadOfertasCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['App/Oferta/ofertaCtrl.js']);
                    }]
                }
            })
            .state('ofertas.lista', {
                url: '/ofertas',
                templateUrl: '/App/Oferta/Partials/ofertaList-MD.html',
                controller: 'ofertaCtrl',
                data: { title: 'Listado de Ofertas' },
                resolve: {
                    ofertaDataFactory: 'ofertaDataFactory',
                    listadoOfertas: function (ofertaDataFactory) {
                        return ofertaDataFactory.getOfertas();
                    },
                    loadOfertasCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['App/Oferta/ofertaCtrl.js', 'App/Oferta/ofertaDataFactory.js', 'App/Oferta/ofertaFilter.js', 'App/Oferta/OfertaList.css']);

                    }]
                }
            })
//#endregion

            //#region Empleados
                    .state('empleado', {
                        abstract: true,
                        url: '/empleados',
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

                    .state('empleado.list', {
                        url: '/list',
                        templateUrl: '/App/Empleado/Partials/empleadoList.html',
                        controller: 'empleadoCtrl',
                        data: { title: 'Listado de empleados' },
                        resolve: {
                            empleadoDataFactory: 'empleadoDataFactory',
                            infoEmpleado: function () {
                                return { value: [] };
                            },
                            listadoEmpleados: function (empleadoDataFactory) {
                                return empleadoDataFactory.getEmpleados();
                            },
                            listadoRubros: function () {
                                return { value: [] };
                            },
                            loadEmpleadoCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['App/Empleado/empleadoCtrl.js', 'App/Empleado/empleadoDataFactory.js']);
                            }]
                        }
                    })
                    .state('empleado.perfil', {
                        url: '/perfil/:empleadoId',
                        templateUrl: '/App/Empleado/Partials/empleadoDetalle.html',
                        controller: 'empleadoCtrl',
                        data: { title: 'Info Empleado' },
                        resolve: {
                            empleadoDataFactory: 'empleadoDataFactory',
                            infoEmpleado: function (empleadoDataFactory, $stateParams) {
                                var empleadoId = $stateParams.empleadoId;
                                return empleadoDataFactory.getEmpleado(empleadoId);
                            },
                            listadoEmpleados: function (empleadoDataFactory) {
                                return empleadoDataFactory.getEmpleados();
                            },
                            listadoRubros: function () {
                                return { value: [] };
                            },
                            loadEmpleadoCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['App/Empleado/empleadoCtrl.js', 'App/Empleado/empleadoDataFactory.js']);
                            }]
                        }
                    })
                    .state('empleado.perfil.datosPersonales', {
                        url: '/datosPersonales',
                        templateUrl: '/App/Empleado/Partials/empleadoInfoPersonal.html',
                        controller: 'empleadoCtrl',
                        data: { title: 'Info Empleado' },
                        resolve: {
                            empleadoDataFactory: 'empleadoDataFactory',
                            infoEmpleado: function (empleadoDataFactory, $stateParams) {
                                var empleadoId = $stateParams.empleadoId;
                                return empleadoDataFactory.getEmpleado(empleadoId);
                            },
                            listadoEmpleados: function () {
                                return { value: [] };
                            },
                            listadoRubros: function () {
                                return { value: [] };
                            },
                            loadEmpleadoCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['App/Empleado/empleadoCtrl.js', 'App/Empleado/empleadoDataFactory.js']);
                            }]
                        }
                    })

                     .state('empleado.perfil.datosDeContacto', {
                         url: '/datosDeContacto',
                         templateUrl: '/App/Empleado/Partials/empleadoDatosDeContacto.html',
                         controller: 'empleadoCtrl',
                         data: { title: 'Info Empleado' },
                         resolve: {
                             empleadoDataFactory: 'empleadoDataFactory',
                             infoEmpleado: function (empleadoDataFactory, $stateParams) {
                                 var empleadoId = $stateParams.empleadoId;
                                 return empleadoDataFactory.getEmpleado(empleadoId);
                             },
                             listadoEmpleados: function () {
                                 return { value: [] };
                             },
                             listadoRubros: function () {
                                 return { value: [] };
                             },
                             loadEmpleadoCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                 return $ocLazyLoad.load(['App/Empleado/empleadoCtrl.js', 'App/Empleado/empleadoDataFactory.js']);
                             }]
                         }
                     })


                     .state('empleado.perfil.calificarEmpleado', {
                         url: '/calificar',
                         templateUrl: '/App/Empleado/Partials/calificarEmpleado.html',
                         controller: 'empleadoCtrl',
                         data: { title: 'Info Empleado' },
                         resolve: {
                             empleadoDataFactory: 'empleadoDataFactory',
                             infoEmpleado: function (empleadoDataFactory, $stateParams) {
                                 var empleadoId = $stateParams.empleadoId;
                                 return empleadoDataFactory.getEmpleado(empleadoId);
                             },
                             listadoEmpleados: function () {
                                 return { value: [] };
                             },
                             listadoRubros: function () {
                                 return { value: [] };
                             },
                             loadEmpleadoCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                 return $ocLazyLoad.load(['App/Empleado/empleadoCtrl.js', 'App/Empleado/empleadoDataFactory.js', 'scripts/directives/angular-input-stars.js', 'styles/angular-input-stars.css']);
                             }]
                         }
                     })
                    .state('empleado.add', {
                        url: '/add',
                        templateUrl: '/App/Empleado/Partials/empleadoAdd-MD.html',
                        controller: 'empleadoCtrl',
                        data: { title: 'Listado de Empleados' },
                        resolve: {
                            empleadoDataFactory: 'empleadoDataFactory',
                            rubroDataFactory: 'rubroDataFactory',
                            infoEmpleado: function () {
                                return { value: [] };
                            },
                            listadoEmpleados: function () {
                                return { value: [] };
                            },
                            listadoRubros: function () {
                                return { value: [] };
                            },
                            loadEmpleadoCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['App/Empleado/empleadoCtrl.js', 'App/Empleado/empleadoDataFactory.js']);
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
