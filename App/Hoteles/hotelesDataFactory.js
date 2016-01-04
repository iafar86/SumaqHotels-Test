﻿sumaqHotelsApp.factory('hotelesDataFactory', function ($http, $q) {
    //fpaz: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    //var urlApi = "http://localhost:33140"; //desarrollo
    var urlApi = "http://sumaqhotelsapi.azurewebsites.net/"; //azure
    var hotelesDataFactory = {};

    //var _getTiposHab = function (prmIdHotel) { //devuelve todos los tipos de habitaciones de un hotel en particular
    //    var deferred = $q.defer();
    //    $http.get(urlApi + '/api/TiposHabitaciones/', { params: { prmIdHotel: prmIdHotel } }).then(
    //        function (response) {
    //            console.log(response.data);
    //            deferred.resolve(response.data);
    //        },
    //        function (response) {
    //            deferred.reject(response.data);
    //        });
    //    return deferred.promise;
    //};

    var _getHotel = function (prmIdHotel) { //devuelve un tipo de habitacione de un hotel en particular
        var deferred = $q.defer();
        $http.get(urlApi + '/api/Hoteles/' + prmIdHotel).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    var _putHotel = function (prmId, data) { //modificacion de un tipo de habitacion en particular
        var deferred = $q.defer();

        $http.put(urlApi + '/api/Hoteles/' + prmId, data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    //var _postTipoHab = function (data) { //alta de un Tipo de Habitacion en particular
    //    var deferred = $q.defer();

    //    $http.post(urlApi + '/api/TiposHabitaciones/', data).then(
    //        function (response) {
    //            deferred.resolve(response);
    //        },
    //        function (response) {
    //            deferred.reject(response.data);
    //        });
    //    return deferred.promise;
    //};


    //tiposHabDataFactory.getTiposHab = _getTiposHab;
    hotelesDataFactory.getHotel = _getHotel;
    hotelesDataFactory.putHotel = _putHotel;
    //hotelesDataFactory.postTipoHab = _postTipoHab;

    return hotelesDataFactory;

});

