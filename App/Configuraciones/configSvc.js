sumaqHotelsApp.service('configSvc', function ($http, $q) {
    //fpaz: Servcio para tener siempre a disposicion las url del WebApi y del Frontend de la Aplicacion, asi facilitar las pruebas en desarrollo y en produccion

    var configSvc = {};

    //#region fpaz: url del web api desde el que se consumen los datos
    var _urlApi = "http://localhost:33140"; // para desarrollo
    //var _urlApi = "http://sumaqhotelsapi.azurewebsites.net"; // para produccion en azure
    
    //#endregion

    //#region fpaz: url del frontend de la aplicacion
    var _urlWeb = "http://localhost:4308"; // para desarrollo
    //var _urlWeb = "http://sumaqhotels.azurewebsites.net"; // para produccion en azure
    //#endregion   

    configSvc.urlApi = _urlApi;
    configSvc.urlWeb = _urlWeb;

    return configSvc;
});