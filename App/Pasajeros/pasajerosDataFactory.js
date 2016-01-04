sumaqHotelsApp.factory('pasajerosDataFactory', function ($http, $q) {
    var urlApi = "http://localhost:33140"; //desarrollo
    //var urlApi = "http://vlaboralapi.azurewebsites.net"; //azure
    var pasajerosDataFactory = {};

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

    pasajerosDataFactory.putPasajero = _putPasajero;
    pasajerosDataFactory.postPasajero = _postPasajero;
    //hotelesDataFactory.postTipoHab = _postTipoHab;

    return pasajerosDataFactory;
});