sumaqHotelsApp.factory('categoriasDataFactory', function ($resource) {
    //var urlApi = "http://localhost:33140"; //fpaz: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    var urlApi = "http://sumaqhotelsapi.azurewebsites.net"; //azure
    return $resource(urlApi + '/api/Categorias/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});