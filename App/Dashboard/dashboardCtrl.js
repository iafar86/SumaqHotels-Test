sumaqHotelsApp.controller('dashboardCtrl', function ($scope, $location, authSvc, $mdSidenav) {
    $scope.logOut = function () {
        authSvc.logOut();
        alert("Deslogueado")
        $scope.authentication.userName = "usuario deslogueado";
        $location.path('/');
    }

    $scope.authentication = authSvc.authentication;

    $scope.openLeftMenu = function () {
        $mdSidenav('left').toggle();
    };    
});