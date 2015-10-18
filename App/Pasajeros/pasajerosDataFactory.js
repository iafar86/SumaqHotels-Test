sumaqHotelsApp.factory('pasajerosDataFactory', function ($resource) {
    return $resource('api/Pasajeros/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});