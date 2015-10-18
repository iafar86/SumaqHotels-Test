sumaqHotelsApp.factory('hotelesDataFactory', function ($resource) {
    return $resource('api/Hoteles/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});