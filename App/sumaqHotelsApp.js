var sumaqHotelsApp = angular.module('sumaqHotelsApp', ['ngMaterial', 'ngRoute', 'ngResource', 'ui.router', 'ngCookies', 'ui.bootstrap', 'ngTable', 'googlechart',
  'ngSanitize', 'ngAnimate', 'ui.select', 'ct.ui.router.extras', 'angular-loading-bar']) // 'daypilot'
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $stickyStateProvider, cfpLoadingBarProvider) {

        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.includeBar = true;
        //$httpProvider.interceptors.push('httpInterceptor');

        $urlRouterProvider.otherwise("/home");

        $stateProvider //fpaz: defino los states que van a guiar el ruteo de las vistas parciales de la app       
        //#region Home
          .state('home', {
              url: "/home",
              views: {
                  'content': {
                      templateUrl: '/App/Dashboard/Partials/dashboard.html',
                      controller: ''
                  }
              }
          })
			.state('booking', {
                url: "/Booking",
                views: {
                    'content': {
                        templateUrl: '/App/Booking/Partials/demo.html',
                        controller: 'bookingCtrl'
                    }
                }
            })
        //#endregion  

        //#region Hoteles
          .state('hotel', {
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
          .state('tipoHab', {
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
          .state('habitaciones', {
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
          .state('pasajeros', {
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

         .state('pasajerosAdd', {
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
        
});

