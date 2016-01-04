sumaqHotelsApp.factory('tiposHabDataFactory', function ($http, $q) {
    //fpaz: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    //var urlApi = "http://localhost:33140"; //desarrollo
    var urlApi = "http://sumaqhotelsapi.azurewebsites.net/"; //azure
    var tiposHabDataFactory = {};    

    var _getTiposHab = function (prmIdHotel) { //devuelve todos los tipos de habitaciones de un hotel en particular
        var deferred = $q.defer();
        $http.get(urlApi + '/api/TiposHabitaciones/', { params: { prmIdHotel: prmIdHotel } }).then(
            function (response) {                
                console.log(response.data);
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response.data);         
            });
        return deferred.promise;
    };

    var _getTipoHab = function (prmIdHotel, prmIdTipoHab) { //devuelve un tipo de habitacione de un hotel en particular
        var deferred = $q.defer();
        $http.get(urlApi + '/api/TiposHabitaciones/',       
            {
                params: {
                    prmIdHotel: prmIdHotel,
                    prmIdTipoHab: prmIdTipoHab
                }
            }).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);                
            });
        return deferred.promise;
    };

    var _putTipoHab = function (prmId, data) { //modificacion de un tipo de habitacion en particular
        var deferred = $q.defer();

        $http.put(urlApi + '/api/TiposHabitaciones/' + prmId, data).then(
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

