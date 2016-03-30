sumaqHotelsApp.factory('pasajerosDataFactory', function ($http, $q, configSvc) {
    //fpaz: url del web api 
    var urlApi = configSvc.urlApi;
    var pasajerosDataFactory = {};

    var _getPasajeros = function () { // trae todos las ofertas
        return $http.get(urlApi + '/api/Pasajero').then(function (response) {
            return response.data;
        });
    };

    var _postPasajero = function (data) { //alta de un pasajero en particular
        var deferred = $q.defer();
        $http.post(urlApi + '/api/Pasajero/', data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };


    var _putPasajero = function (prmId, data) { //Modificacion de un pasajero
        var deferred = $q.defer();

        $http.put(urlApi + '/api/Pasajero/' + prmId, data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    pasajerosDataFactory.getPasajeros = _getPasajeros;
    pasajerosDataFactory.putPasajero = _putPasajero;
    pasajerosDataFactory.postPasajero = _postPasajero;
    //hotelesDataFactory.postTipoHab = _postTipoHab;

    return pasajerosDataFactory;
});