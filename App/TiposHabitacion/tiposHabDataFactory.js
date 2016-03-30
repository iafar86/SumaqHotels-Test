﻿sumaqHotelsApp.factory('tiposHabDataFactory', function ($http, $q, authSvc, configSvc) {
    //fpaz: url del web api 
    var urlApi = configSvc.urlApi;
    var tiposHabDataFactory = {};    

    var _getTiposHab = function () { //devuelve todos los tipos de habitaciones de un hotel en particular
        var prmIdHotel = authSvc.authentication.hotelId; // fpaz: variable que va a tener el id del hotel relacionado al usuario logueado
        var deferred = $q.defer();        
        $http.get(urlApi + '/api/TiposHabitaciones/', { params: { prmIdHotel: prmIdHotel } }).then(
            function (response) {                
                
                // fpaz: agrego a cada objeto del array el campo editValue para manejar la actualizacion de datos desde el controler, en los tabs de tipos de habitacion
                var data = response.data;
                var list = [];
                for (var i = 0; i < data.length; i++) {
                    var aux = {};
                    aux = data[i];
                    aux.editValue = false;

                    list.push(aux);
                }
                deferred.resolve(list);
                //deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);         
            });
        return deferred.promise;
    };

    var _getTipoHab = function (prmIdTipoHab) { //devuelve un tipo de habitacion de un hotel en particular
        var deferred = $q.defer();
        var prmIdHotel = authSvc.authentication.hotelId; // fpaz: variable que va a tener el id del hotel relacionado al usuario logueado
        $http.get(urlApi + '/api/TiposHabitaciones/',       
            {
                params: {
                    prmIdHotel: prmIdHotel,
                    prmIdTipoHab: prmIdTipoHab
                }
            }).then(
            function (response) {
                var result = response.data;
                result.editValue = false;
                deferred.resolve(result);
            },
            function (response) {
                deferred.reject(response.data);                
            });
        return deferred.promise;
    };

    var _putTipoHab = function (prmIdTipoHab, data) { //modificacion de un tipo de habitacion en particular
        var deferred = $q.defer();

        $http.put(urlApi + '/api/TiposHabitaciones/' + prmIdTipoHab, data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    var _postTipoHab = function (data) { //alta de un Tipo de Habitacion en particular
        var deferred = $q.defer();

        $http.post(urlApi + '/api/TiposHabitaciones/', data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };


    tiposHabDataFactory.getTiposHab = _getTiposHab;
    tiposHabDataFactory.getTipoHab = _getTipoHab;
    tiposHabDataFactory.putTipoHab = _putTipoHab;
    tiposHabDataFactory.postTipoHab = _postTipoHab;

    return tiposHabDataFactory;

});

