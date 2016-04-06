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

    $scope.editValue = false; // variable que voy a usarpara activar y desactivar los modos de edicion para hacer el update de la info
    
    $scope.imagenes = [
        { src: 'images/hab1.jpg' },
        { src: 'images/hab2.jpg' },
        { src: 'images/hab3.jpg' }        
    ];
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
    
    $scope.selectedIndex = 0;
       
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
        infoTipoHab.editValue = true;
        infoTipoHab.CamasAdicionales = [];
        infoTipoHab.ServiciosDeHabitacion = [];
        

        $scope.listTiposHab.push(infoTipoHab);
    }
    
    $scope.obtenerTiposHab = function () { // funcion para devolver todos los tipos de habitacion de un hotel        
        tiposHabDataFactory.getTiposHab().then(function (response) {            
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
        //tipoHab.ServiciosDeHabitacion = [];
        
        //#region armado de array de camas adicionales
        var listCamasAdicionales = [];
        for (var i in infoTipoHab.CamasAdicionales) { // for para armar el array de Camas Adicionales con el formato necesario para el api controller
            var camaAdicional = {};          
            
            camaAdicional.Cantidad = infoTipoHab.CamasAdicionales[i].Cantidad;
            camaAdicional.PrecioAdicional = infoTipoHab.CamasAdicionales[i].PrecioAdicional;
            camaAdicional.TipoCamaId = infoTipoHab.CamasAdicionales[i].TipoCama.Id;
            listCamasAdicionales.push(camaAdicional);
        }
        tipoHab.CamasAdicionales = listCamasAdicionales;
        //#endregion
        
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
        camaAgregada.TipoCama = $scope.tipoCamaSeleccionada.selected;
        camaAgregada.Cantidad = tipoCamaAgregada.cantidad;
        camaAgregada.PrecioAdicional = tipoCamaAgregada.precio;

        //$scope.listCamasAdicionales.push(camaAgregada); // array con el que se va a llenar la tabla        

        $scope.listTiposHab[$scope.selectedIndex].CamasAdicionales.push(camaAgregada); // array con el que se va a llenar la tabla        
        
        $scope.tipoCamaSeleccionada = {};
        $scope.tipoCamaSeleccionada.selected = {};

        $scope.tipoCamaAgregada = {};
    }

    //#endregion

    //#region modificacion de tipos de habitaciones
    $scope.edit = function () {//fpaz: activa el modo de edicion de los campos        
        $scope.listTiposHab[$scope.selectedIndex].editValue = true;
    };

    $scope.save = function (infoTipoHab) {//fpaz: guarda los cambios y llama a la funcion put de la api        
        tiposHabDataFactory.putTipoHab(infoTipoHab.Id, infoTipoHab).then(function (response) {
            $scope.listTiposHab[$scope.selectedIndex].editValue = false;
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

    $scope.removeCamaAd = function (camaAd) { // elimina una cama adicional
        var index = $scope.listTiposHab[$scope.selectedIndex].CamasAdicionales.indexOf(camaAd);
        $scope.listTiposHab[$scope.selectedIndex].CamasAdicionales.splice(index, 1);
        alert('Cama Removida');
    }

    $scope.agregarServicio = function (item, model) { // agrega un nuevo servicio si es que no existe
        var noExiste = true;
        for (var i = 0; i < $scope.listTiposHab[$scope.selectedIndex].ServiciosDeHabitacion.length; i++) {
            if ($scope.listTiposHab[$scope.selectedIndex].ServiciosDeHabitacion[i].Id == model.Id) {
                alert("Servicio Actualmente Incluido");
                noExiste = false;
                break;
            }

        }

        if (noExiste) {
            $scope.listTiposHab[$scope.selectedIndex].ServiciosDeHabitacion.push(model)
        }
    };
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
        $scope.limpiar();
        $scope.obtenerTiposHab();        
    };
    //#endregion

    
    
});