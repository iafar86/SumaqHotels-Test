sumaqHotelsApp.factory('serviciosDataFactory', function ($resource) {
    return $resource('api/ServiciosDeHabitaciones/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});