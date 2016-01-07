sumaqHotelsApp.controller('tiposHabCtrl', function ($scope, $stateParams, $state, $filter, ngTableParams, $mdDialog,authSvc, tiposHabDataFactory,
    listadoTiposHab, listadoTiposCamas, listadoServicios, habitacionesDataFactory, authSvc) {

    //#region Inicializacion de variables de Scope
    $scope.listTiposHab = listadoTiposHab; // var donde voy a guardar todos los Tipos de Habitacion ya sea cuando se cargue la pagina o cuando agregue una nueva
    $scope.infoTipoHab = {}; // var que voy a usar para el abm y para tener informacion sobre un tipo de habitacion en particular
    $scope.tipoHabSelec = {}; // var que va a tener la cama seleccionada
    $scope.tipoHabSelec.selected = {};

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

    //#region fpaz: administracion de tabs
    $scope.data = {
        selectedIndex: 0,
        secondLocked: true,
        secondLabel: "Item Two"
    };

    $scope.next = function () {
        $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2);
    };

    $scope.previous = function () {
        $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };
    
    $scope.selectedIndex = 2;
       
    $scope.removeTab = function (tab) {
        for (var j = 0; j < tabs.length; j++) {
            if (tab.title == tabs[j].title) {
                $scope.tabs.splice(j, 1);
                break;
            }
        }
    };
    //#endregion

    //#region Alta de Tipos de Habitaciones

    //fpaz: funcion para agregar un nuevo tab con los datos para el alta de tipo de habitacion
    $scope.addTabTipoHab = function () {
        var infoTipoHab = {};
        infoTipoHab.Nombre = "Nuevo Tipo de Habitacion";
        $scope.listTiposHab.push(infoTipoHab);
    }
    
    $scope.obtenerTiposHab = function () { // funcion para devolver todos los tipos de habitacion de un hotel        
        tiposHabDataFactory.getTiposHab().then(function (response) {
            console.log(response);
            $scope.listTiposHab = response;
            //$scope.limpiar();
        },
         function (err) {
             if (err) {
                 $scope.error = err;
                 alert("Error: " + $scope.error.Message);
             }
         });
    };
    
    $scope.addTipoHabitacion = function (infoTipoHab) { // funcion para armar y guardar en la bd el objeto con el tipo de habitacion

        var tipoHab = {};
        tipoHab = infoTipoHab;
        tipoHab.HotelId = authSvc.authentication.hotelId;
        tipoHab.ServiciosDeHabitacion = [];
        tipoHab.CamasAdicionales = [];
        
        for (var i in $scope.listCamasAdicionales) { // for para armar el array de Camas Adicionales con el formato necesario para el api controller
            var camaAdicional = {};          
            
            camaAdicional.Cantidad = $scope.listCamasAdicionales[i].cantidad;
            camaAdicional.PrecioAdicional = $scope.listCamasAdicionales[i].precioAdicional;
            camaAdicional.TipoCamaId = $scope.listCamasAdicionales[i].tipoCama[0].Id;

            tipoHab.CamasAdicionales.push(camaAdicional);
        }

        for (var i in $scope.servicioSeleccionado.selected) {
            var servicio = {};
            servicio.Id = $scope.servicioSeleccionado.selected[i].Id;

            tipoHab.ServiciosDeHabitacion.push(servicio);

        }
        
        tiposHabDataFactory.postTipoHab(tipoHab).then(function (response) {            
            alert("Nuevo Tipo de Habitacion Guardado");
            $scope.limpiar();
            $scope.obtenerTiposHab();            
        },
         function (err) {
             if (err) {
                 $scope.error = err;
                 alert("Error al Guardar El Tipo de Habitacion: " + $scope.error.Message);                 
             }
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
    
    //#region alta de Habitaciones
    $scope.AbrirParaAgregar = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'App/Habitaciones/Partials/AgregarHabitacion.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            resolve: {                
                prmTipoHab: function () {
                    return $scope.listTiposHab[$scope.selectedIndex];
                }
            }
        })
            .then(function (habitacion) {
                $scope.listTiposHab[$scope.selectedIndex].Habitaciones.push(habitacion);
            }, function () {
                //alert('Error Al Guardar La Nueva Habitacion');

            });
    };

    function DialogController($scope, $mdDialog, prmTipoHab, habitacionesDataFactory) { // controlador del dialog que devuelve los datos
        //#region fpaz: inicializacion de variables de scope en el modal        
        $scope.infoHab = {};
        $scope.tipoHab = prmTipoHab;
        //#endregion

        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.resul = {};
        //fpaz: carga de puestos en la oferta
        $scope.habitacionAdd = function (hab) {
            hab.TipoHabitacionId = $scope.tipoHab.Id;
            habitacionesDataFactory.postHabitacion(hab).then(function (response) {
                alert("Nueva Habitacion Guardada");
                $mdDialog.hide(hab);
            },
         function (err) {
             if (err) {
                 $scope.error = err;
                 alert("Error al Guardar LA Nueva Habitacion: " + $scope.error.Message);
             }
         });          
        };
    };

    //#endregion

    //#region limpieza

    // limpia los campos de admin. y los deja listo para agregar un nuevo registro o limpiar los datos q actualmente estoy escribiendo
    $scope.limpiar = function () {
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
    };

    //fpaz: funcion para cancelar una modificacion u otra operacion y traer los datos originales del tipo de habitacion        
    $scope.cancel = function () {         
        tiposHabDataFactory.getTipoHab($scope.infoTipoHab.Id).then(function (response) {
            $scope.infoTipoHab = response.data;
            $scope.editValue = false;
        },
         function (err) {
             if (err) {
                 $scope.error = err;
                 //$scope.cancel();
                 alert("Error" + $scope.error.Message);
             }
         });
    };
    //#endregion
    
});