sumaqHotelsApp.factory('categoriasDataFactory', function ($resource) {
    return $resource('api/Categorias/:id',
           { id: '@id' },
           { 'update': { method: 'PUT' } }
        );
});