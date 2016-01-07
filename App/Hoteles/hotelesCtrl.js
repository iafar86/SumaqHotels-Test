sumaqHotelsApp.controller('hotelesCtrl', function ($scope, $stateParams, $state, $filter, $timeout, ngTableParams,
    hotelesDataFactory, infoHotel, listadoTiposHoteles, listadoCategorias) {

    //#region Variables de Scope de Ivan
    $scope.oneAtATime = true;
    $scope.Hotel = [];
    $scope.Hotel.Stars = 1;
    $scope.groups = [
      {
          title: 'Dynamic Group Header - 1',
          content: 'Dynamic Group Body - 1'
      },
      {
          title: 'Dynamic Group Header - 2',
          content: 'Dynamic Group Body - 2'
      }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function () {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };

    //manejo de Estrellas de Hotel
    $scope.hoveringOver = function (value) {
        $scope.overStar = value;
    };

    //Manejo de Carrousel

    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function (i) {
        var newWidth = 6 + i;
        slides.push({
            //image: 'http://placekitten.com/' + newWidth + '/300',
            image: 'http://q-ec.bstatic.com/images/hotel/840x460/420/4204142' + newWidth + '.jpg',
            text: ['Lobby', 'Reception', 'Main', 'Confort'][slides.length % 4] + ' ' +
              ['Place', 'Bar', 'Rooms', 'Beds'][slides.length % 4]
        });
    };
    for (var i = 0; i < 4; i++) {
        $scope.addSlide(i);
    }
    //#endregion

    //#region Inicializacion de variables de Scope
    $scope.infoHotel = infoHotel;
   
    //#region carga tipo Hotel select
    $scope.tipoHotel = null;
    $scope.listTiposHoteles = null;
    $scope.loadTipoHoteles = function () {
        // Use timeout to simulate a 650ms request.
        return $timeout(function () {
            $scope.listTiposHoteles = listadoTiposHoteles;
        }, 650);
    };
    //#endregion
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