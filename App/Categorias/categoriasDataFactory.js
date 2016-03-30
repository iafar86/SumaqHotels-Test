sumaqHotelsApp.factory('categoriasDataFactory', function ($resource, configSvc) {
    //fpaz: url del web api 
    var urlApi = configSvc.urlApi;
    return $resource(urlApi + '/api/Categorias/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});