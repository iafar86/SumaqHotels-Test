sumaqHotelsApp.factory('cuentaDataFactory', function ($resource) { // data factory para manejar las cuentas de usuario
    //var urlApi = "http://localhost:33140"; //fpaz: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    var urlApi = "http://sumaqhotelsapi.azurewebsites.net"; //azure
    return $resource(urlApi + '/api/accounts/create/:id',
           { id: '@id' },           
           { 'update': { method: 'PUT' } }           
        );
});

