sumaqHotelsApp.controller('pasajerosCtrl', function ($scope, $stateParams, $state, $filter, ngTableParams, pasajerosDataFactory, listadoPasajeros) {   //, listadoPasajeros, infoPasajero
    //#region inicializacion de variables
    $scope.pasajero = [];
    $scope.pasajeros = listadoPasajeros;
    $scope.tipoDocumento = [
       'DNI',
       'Pasaporte',
       'Libreta Enrolamiento'
    ];

    $scope.pasajero.TipoDoc = "DNI";
    $scope.pasajero.Sexo = "Masculino";
    $scope.pasajero.ECivil = "Soltero";
    //#endregion

    //#region Operaciones de Pasajero
    $scope.edit = function (id, pasajero) {//fpaz: guarda los cambios y llama a la funcion put de la api  
       
        hotelesDataFactory.putHotel(id, pasajero).then(function (response) {
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

    $scope.save = function (pasajero) {
        var oPasajero = {
            TipoDoc: $scope.pasajero.TipoDoc,
            NumDoc: $scope.pasajero.NumDoc,
            NomApe: $scope.pasajero.NomApe,
            Dir: $scope.pasajero.Dir,
            CodPostal: $scope.pasajero.CodPostal,
            Tel: $scope.pasajero.Tel,
            Cel: $scope.pasajero.Cel,
            EMail: $scope.pasajero.EMail,
            Sexo: $scope.pasajero.Sexo , 
            ECivil: $scope.pasajero.ECivil
        };

        pasajerosDataFactory.postPasajero(oPasajero).then(function (response) {
            alert("Carga de Oferta Exitosa");
            $scope.pasajero={};
        },
         function (err) {
             if (err) {
                 $scope.error = err;
                 alert("Error al Cargar el pasajero: "+  $scope.error.Message);
                 //$scope.message = err.error_description;
             }
         });
        //$scope.pasajero = {};
    };
    //#endregion


});