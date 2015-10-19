sumaqHotelsApp.controller('loginCtrl', function ($scope, $location, $timeout, authSvc) {
    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.message = "";

    $scope.login = function () {

        authSvc.login($scope.loginData).then(function (response) {
            alert("Login Exitoso");
            $location.path('/dashboard/home');

        },
         function (err) {
             $scope.message = err.error_description;
         });
    };
});