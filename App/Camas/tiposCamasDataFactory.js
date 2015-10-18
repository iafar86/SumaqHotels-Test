sumaqHotelsApp.factory('tiposCamasDataFactory', function ($resource) {
    return $resource('api/TipoCamas/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});