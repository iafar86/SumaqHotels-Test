﻿sumaqHotelsApp.factory('pasajerosDataFactory', function ($resource) {
    var urlApi = "http://localhost:33140"; //fpaz: url del web api de cuentas de usuario, cambiar por el de produccion una vez implementado
    return $resource(urlApi + '/api/Pasajeros/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});