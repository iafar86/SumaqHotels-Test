sumaqHotelsApp.factory('serviciosDataFactory', function ($resource, configSvc) {    
    //fpaz: url del web api 
    var urlApi = configSvc.urlApi;
    return $resource(urlApi + '/api/ServiciosDeHabitaciones/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});