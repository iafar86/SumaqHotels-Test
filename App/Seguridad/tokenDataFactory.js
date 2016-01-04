sumaqHotelsApp.factory('tokenDataFactory', function ($resource) { // data factory para generar y manejar los tokens de acceso
    //var urlApi = "http://localhost:33140"; //fpaz: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    var urlApi = "http://sumaqhotelsapi.azurewebsites.net/"; //azure
    return $resource(urlApi + '/oauth/token',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});