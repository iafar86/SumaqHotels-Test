sumaqHotelsApp.factory('tiposHotelesDataFactory', function ($resource, configSvc) {
    //fpaz: url del web api 
    var urlApi = configSvc.urlApi;
    return $resource(urlApi + '/api/TiposHoteles/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});