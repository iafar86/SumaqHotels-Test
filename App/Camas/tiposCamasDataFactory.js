sumaqHotelsApp.factory('tiposCamasDataFactory', function ($resource, configSvc) {
    //fpaz: url del web api 
    var urlApi = configSvc.urlApi;
    return $resource(urlApi + '/api/TipoCamas/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});