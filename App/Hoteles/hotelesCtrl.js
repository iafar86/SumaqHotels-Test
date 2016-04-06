sumaqHotelsApp.controller('hotelesCtrl', function ($scope, $stateParams, $state, $filter, $timeout, ngTableParams,
    hotelesDataFactory, infoHotel, listadoTiposHoteles, listadoCategorias) {

    //#region Variables de Scope de Ivan
    $scope.Hotel = [];
    $scope.infoHotel = infoHotel;
    $scope.listTiposHoteles = listadoTiposHoteles;
   //#endregion


    //#region manejo de Estrellas de Hotel
    $scope.hoveringOver = function (value) {
        $scope.overStar = value;
    };
    //#endregion

    //#region Manejo de Carrousel

    
    //#endregion

    //#region Inicializacion de variables de Scope
    
   
    $scope.tipoHabSelec = {};
    $scope.tipoHabSelec.selected = {};

    $scope.listCategorias = listadoCategorias;

    $scope.editValue = false; // variable que voya usar para activar y desactivar los modos de edicion 
    $scope.addValue = true; //para activar el alta de Campos

    $scope.cantEstrellas = 0;
    //#endregion

    //#region Alta de hotel
    $scope.tipoHabAdd = function (infoHotel) {
        hotelesDataFactory.save(infoHotel).$promise.then(
            function () {
                //$scope.addCampoProg();                
                alert('Nuevo Habitacion Guardado');
                $scope.clear();

            },
            function (response) {
                $scope.errors = response.data;
                alert('Error al guardar el Habitacion Programatico');
            });
    };
    //#endregion

    //#region Modificacion de Hotel

    $scope.edit = function () {//fpaz: activa el modo de edicion de los campos        
        $scope.editValue = true;
    };

    $scope.save = function (infoHotel) {//fpaz: guarda los cambios y llama a la funcion put de la api          
        infoHotel.CategoriaId = 1;
        infoHotel.TipoHotel = null;
        infoHotel.Categoria = null;
        hotelesDataFactory.putHotel(infoHotel).then(function (response) {
            $scope.editValue = false;
            alert("Cambios Guardados Correctamente");
        },
         function (err) {
             if (err) {
                 $scope.error = err;
                 $scope.cancel();
                 alert("Error al Modificar la Información: " + $scope.error.Message);
                 //$scope.message = err.error_description;
             }
         });
    };
    //#endregion

    //#region limpieza
    $scope.clear = function () { // limpia los campos de admin. y los deja listo para agregar un nuevo registro o limpiar los datos q actualmente estoy escribiendo
        $scope.cantEstrellas = 0;
        $scope.infoHotel = {};
        $scope.tipoHabSelec = {};
        $scope.tipoHabSelec.selected = {};

        if (!$scope.addValue) {
            $scope.editValue = false;
            $scope.addValue = true;
        }
    };
    //#endregion


  



});