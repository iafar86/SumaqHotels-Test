sumaqHotelsApp.factory('habitacionesDataFactory', function ($http, $q) {
    //fpaz: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    var urlApi = "http://localhost:33140"; //desarrollo
    //var urlApi = "http://vlaboralapi.azurewebsites.net"; //azure
    var habitacionesDataFactory = {};

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

    //var _getTipoHab = function (prmIdHotel, prmIdTipoHab) { //devuelve un tipo de habitacione de un hotel en particular
    //    var deferred = $q.defer();
    //    $http.get(urlApi + '/api/TiposHabitaciones/',
    //        {
    //            params: {
    //                prmIdHotel: prmIdHotel,
    //                prmIdTipoHab: prmIdTipoHab
    //            }
    //        }).then(
    //        function (response) {
    //            deferred.resolve(response);
    //        },
    //        function (response) {
    //            deferred.reject(response.data);
    //        });
    //    return deferred.promise;
    //};

    //var _putTipoHab = function (prmId, data) { //modificacion de un tipo de habitacion en particular
    //    var deferred = $q.defer();

    //    $http.put(urlApi + '/api/TiposHabitaciones/' + prmId, data).then(
    //        function (response) {
    //            deferred.resolve(response);
    //        },
    //        function (response) {
    //            deferred.reject(response.data);
    //        });
    //    return deferred.promise;
    //};

    var _postHabitacion = function (data) { //alta de una Habitacion
        var deferred = $q.defer();

        $http.post(urlApi + '/api/Habitaciones/', data).then(
            function (response) {
                deferred.resolve(response);
            },
            function (response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };


    //tiposHabDataFactory.getTiposHab = _getTiposHab;
    //tiposHabDataFactory.getTipoHab = _getTipoHab;
    //tiposHabDataFactory.putTipoHab = _putTipoHab;
    habitacionesDataFactory.postHabitacion = _postHabitacion;

    return habitacionesDataFactory;

});

