sumaqHotelsApp.controller('habitacionesCtrl', function ($scope, $stateParams, $state, $filter, ngTableParams,
    habitacionesDataFactory, listadoHabitaciones, infoHabitacion, prmTipoHab, $modalInstance) {

    $scope.tipoHabBuscada = {};
    $scope.tipoHabBuscada.selected = {};

    $scope.tipoHab = prmTipoHab;

    $scope.habitacionAdd = function (infoHabitacion) {
        var habitacion = {};        
        habitacion.TipoHabitacionId = $scope.tipoHab.Id;

        habitacionesDataFactory.save(habitacion).$promise.then(
            function () {                
                alert('Nuevo Habitacion Guardada');
                $modalInstance.close();
            },
            function (response) {
                $scope.errors = response.data;
                alert('Error al guardar la  Habitacion');
            });
    };   

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});