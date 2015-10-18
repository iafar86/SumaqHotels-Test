sumaqHotelsApp.factory('tiposHabDataFactory', function ($resource) {
    return $resource('api/TiposHabitaciones/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});