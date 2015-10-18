sumaqHotelsApp.controller('tiposHabCtrl', function ($scope,$modal, $stateParams, $state, $filter, ngTableParams, tiposHabDataFactory,
    listadoTiposHab, listadoTiposCamas, listadoServicios, habitacionesDataFactory) {

    //#region Inicializacion de variables de Scope
    $scope.listTiposHab = listadoTiposHab; // var donde voy a guardar todos los Tipos de Habitacion ya sea cuando se cargue la pagina o cuando agregue una nueva
    $scope.infoTipoHab = {}; // var que voy a usar para el abm y para tener informacion sobre un tipo de habitacion en particular
    $scope.tipoHabSelec = {}; // var que va a tener la cama seleccionada
    $scope.tipoHabSelec.selected = {};

    $scope.editValue = false; // variable que voya usar para activar y desactivar los modos de edicion 
    $scope.addValue = true; //para activar el alta de Campos
    $scope.showCamasCollapse = false; //var para hacer el collapse de la seccion de Camas Adicionales
    $scope.activarCama = function () {
        $scope.showCamasCollapse = !$scope.showCamasCollapse
    }

    $scope.listHabitaciones = []; // array de habitaciones de un tipo determinado. Se llena al elegir el tipo de habitacion

    $scope.tiposCamas = listadoTiposCamas; // listado con el tipo de camas que se pueden agregar
    $scope.tipoCamaSeleccionada = {}; // var que va a tener la cama seleccionada
    $scope.tipoCamaSeleccionada.selected = {};

    $scope.tipoCamaAgregada = {}; //objeto que va a tener el tipo de cama agregada, la cantidad y el precio por unidad    
    $scope.listCamasAdicionales = []; // // array de tipos de camas agregadas para armar el tarifario de camas adicionales

    $scope.servicios = listadoServicios; // lista de servicios disponibles
    $scope.servicioSeleccionado = [];
    $scope.servicioSeleccionado.selected = {};

    
    //#endregion

    //#region Alta de Tipos de Habitaciones

    //funcion para agregar un nuevo Campos Programaticos y mostrarlo en la tabla
    $scope.obtenerTiposHab = function () {
        $scope.listTiposHab = tiposHabDataFactory.query();
    };
    
    $scope.tipoHabAdd = function (infoTipoHab) {

        var tipoHab = {};
        tipoHab = infoTipoHab;
        tipoHab.HotelId = 2;
        tipoHab.ServiciosDeHabitacion = [];
        tipoHab.CamasAdicionales = [];
        
        for (var i in $scope.listCamasAdicionales) { // for para armar el array de Camas Adicionales con el formato necesario para el api controller
            var camaAdicional = {};          
            
            camaAdicional.Cantidad = $scope.listCamasAdicionales[i].cantidad;
            camaAdicional.PrecioAdicional = $scope.listCamasAdicionales[i].precioAdicional;
            camaAdicional.TipoCamaId = $scope.listCamasAdicionales[i].tipoCama.Id;

            tipoHab.CamasAdicionales.push(camaAdicional);
        }

        for (var i in $scope.servicioSeleccionado.selected) {
            var servicio = {};
            servicio.Id = $scope.servicioSeleccionado.selected[i].Id;

            tipoHab.ServiciosDeHabitacion.push(servicio);

        }

        tiposHabDataFactory.save(tipoHab).$promise.then(
            function () {
                $scope.obtenerTiposHab();
                $scope.infoCampoProg = null;
                alert('Nuevo Tipo de Habitacion Guardado');
                $scope.clear();

            },
            function (response) {
                $scope.errors = response.data;
                alert('Error al guardar el Tipo de Habitacion Programatico');
            });
    };

    $scope.agregarCamaAdicional = function (tipoCamaAgregada) {
        var camaAgregada = {}; // var con la info que se va a mostrar en la tabla
        camaAgregada.tipoCama = $scope.tipoCamaSeleccionada.selected;
        camaAgregada.cantidad = tipoCamaAgregada.cantidad;
        camaAgregada.precioAdicional = tipoCamaAgregada.precio;

        $scope.listCamasAdicionales.push(camaAgregada); // array con el que se va a llenar la tabla        
        
        $scope.tipoCamaSeleccionada = {};
        $scope.tipoCamaSeleccionada.selected = {};

        $scope.tipoCamaAgregada = {};
    }



    //#endregion

    // fpaz: carga el listado de lineas de accion correspondite al campo prog para su seleccion
    $scope.mostrarInfoTipoHab = function (item, model) {
        $scope.infoTipoHab = tiposHabDataFactory.get({ id: model.Id });
    };
    //#region alta de Habitaciones
    //#region ventana modal de Busqueda de insumos    

    $scope.openHabitaciones = function () {

        var modalInstance = $modal.open({
            templateUrl: '/Scripts/App/Habitaciones/Partials/habitacionesDetail.html',
            controller: 'habitacionesCtrl',
            size: 'lg',
            windowClass: 'bs-example-modal-lg',
            resolve: {
                prmTipoHab: function () {
                    return $scope.infoTipoHab;
                }

            }
        });

        modalInstance.result.then(function () {            
            $scope.listHabitaciones = habitacionesDataFactory.query({ prmIdTipoHab: $scope.infoTipoHab.Id });
        });

    };
    //#endregion

    //#region limpieza

    // limpia los campos de admin. y los deja listo para agregar un nuevo registro o limpiar los datos q actualmente estoy escribiendo
    $scope.clear = function () {
        $scope.infoTipoHab = {};

        $scope.tipoHabSelec = {};
        $scope.tipoHabSelec.selected = {};

        $scope.listHabitaciones = [];

        $scope.tipoCamaSelecciononada = {};
        $scope.tipoCamaSelecciononada.selected = {};

        $scope.tipoCamaAgregada = {};
        $scope.listCamasAdicionales = [];

        $scope.servicios = listadoServicios; // lista de servicios disponibles
        $scope.servicioSeleccionado = [];
        $scope.servicioSeleccionado.selected = {};

        if (!$scope.addValue) {
            $scope.editValue = false;
            $scope.addValue = true;
        }
    };

    //#endregion
});