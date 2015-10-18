sumaqHotelsApp.factory('tiposHotelesDataFactory', function ($resource) {
    return $resource('api/TiposHoteles/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});