sumaqHotelsApp.factory('habitacionesDataFactory', function ($resource) {
    return $resource('api/Habitaciones/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});