var sumaqHotelsApp = angular.module('sumaqHotelsApp', ['ngRoute', 'ngResource', 'ui.router', 'ngCookies', 'ui.bootstrap', 'ngTable', 'googlechart',
  'ngSanitize', 'ngAnimate', 'ui.select', 'ct.ui.router.extras', 'angular-loading-bar', 'daypilot', 'LocalStorageModule', 'angular-jwt', 'ngMaterial'])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $stickyStateProvider, cfpLoadingBarProvider) {

        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.includeBar = true;
        

        $urlRouterProvider.otherwise("/");

        $stateProvider //fpaz: defino los states que van a guiar el ruteo de las vistas parciales de la app       
        //#region Home
          .state('index', {
              url: "/",              
              views: {
                  'content': {                      
                      //templateUrl: '/App/Dashboard/Partials/home.html',
                      templateUrl: '/App/Dashboard/Partials/login.html',
                      controller: 'loginCtrl'
                  }
              }
          })

            .state('dashboard', {
                url: "/dashboard",
                views: {
                    'content': {
                        templateUrl: '/App/Dashboard/Partials/Dasboard.html',
                        controller: 'dashboardCtrl'
                    }
                }
            })

            .state('dashboard.home', {
                url: "/home",
                views: {
                    'content': {
                        templateUrl: '/App/Dashboard/Partials/HomeAdmin.html',
                        controller: ''
                    }
                }
            })

        
			
        //#endregion  

        //#region Seguridad
            .state('login', {
                url: "/login",
                views: {
                    'content': {
                        templateUrl: '/App/Seguridad/Partials/login.html',
                        controller: 'loginCtrl'
                    }
                }
            })

            .state('signup', {
                url: "/signup",
                views: {
                    'content': {
                        templateUrl: '/App/Seguridad/Partials/signup.html',
                        controller: 'signupCtrl'
                    }
                }
            })
            //#endregion

        //#region Hoteles
          .state('dashboard.hotel', {
              url: "/Hotel",
              views: {
                  'content': {
                      templateUrl: '/App/Hoteles/Partials/hotelesMain.html',
                      controller: 'hotelesCtrl',
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
                          }
                      }
                  }
              }
          })
        //#endregion  

        //#region Tipos Habitacion
          .state('dashboard.tipoHab', {
              url: "/TipoHabitaciones",
              views: {
                  'content': {
                      templateUrl: '/App/TiposHabitacion/Partials/tiposHabMain.html',
                      controller: 'tiposHabCtrl',
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

                      }
                  }
              }
          })          
        //#endregion  

        //#region Habitaciones
          .state('dashboard.habitaciones', {
              url: "/Habitaciones",
              views: {
                  'content': {
                      templateUrl: '/App/Habitaciones/Partials/habitacionesDetail.html',
                      controller: 'habitacionesCtrl',
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
                          }
                      }
                  }
              }
          })
        //#endregion  

        //#region Pasajeros
          .state('dashboard.pasajeros', {
              url: "/PasajerosList",
              views: {
                  'content': {
                      templateUrl: '/App/Pasajeros/Partials/pasajerosMain.html',
                      controller: 'pasajerosCtrl',
                      resolve: {
                          //pasajerosDataFactory: 'pasajerosDataFactory',
                          //infoPasajero: function () {
                          //    return { value: [] };
                          //},
                          //listadoPasajeros: function (pasajerosDataFactory) {
                          //    return pasajerosDataFactory.query();
                          //}
                      }
                  }
              }
          })

         .state('dashboard.pasajerosAdd', {
             url: "/PasajerosAdd",
             views: {
                 'content': {
                     templateUrl: '/App/Pasajeros/Partials/pasajerosAdd.html',
                     controller: 'pasajerosCtrl',
                     resolve: {
                         //pasajerosDataFactory: 'pasajerosDataFactory',
                         //infoPasajero: function () {
                         //    return { value: [] };
                     }
                 }
             }
         })


        //#endregion  

        //#region Booking
        .state('dashboard.booking', {
            url: "/Booking",
            views: {
                'content': {
                    templateUrl: '/App/Booking/Partials/demo.html',
                    controller: 'bookingCtrl'
                }
            }
        })
        //#endregion
        
    })

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorSvc');//agrego al array de interceptor el sevicio authInterceptorSvc que se encarga de mandar ,en cada peticion al web api, el token de acceso obtenido en el login y de redirigir a la pagina de logueo , en caso de que un usuario anonimo quiera agseder a un recurso privado
    })
    .run(['authSvc', function (authSvc) { //cada ves que el usuario entra a la aplicacion ejecuto la funcion para obtener el token guardado en el storage que este vigente, en caso de que exita uno almacenado
        authSvc.fillAuthData();
    }]);

