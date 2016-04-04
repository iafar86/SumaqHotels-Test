sumaqHotelsApp.factory('hotelesDataFactory', function ($http, $q, authSvc, configSvc) {
    //fpaz: url del web api 
    var urlApi = configSvc.urlApi;
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

    var _getHotel = function () { //devuelve la informacion de un Hotel en Particular
        var prmIdHotel = authSvc.authentication.hotelId; // fpaz: variable que va a tener el id del hotel relacionado al usuario logueado
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

    var _putHotel = function (data) { //modificacion de un tipo de habitacion en particular
        var deferred = $q.defer();
        var prmIdHotel = authSvc.authentication.hotelId; // fpaz: variable que va a tener el id del hotel relacionado al usuario logueado
        $http.put(urlApi + '/api/Hoteles/' + prmIdHotel, data).then(
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

