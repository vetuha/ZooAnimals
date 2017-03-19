((): void => {
    'use strict';

    angular
        .module('FitsMe.Zoo')
        .config(configFunction);

    // dependency injection
    configFunction.$inject = ['$injector', '$stateProvider', '$httpProvider', '$urlRouterProvider', '$logProvider'];
    
    function configFunction(
        $injector: ng.auto.IInjectorService,
        $stateProvider: ng.ui.IStateProvider,
        $httpProvider: ng.IHttpProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $logProvider: ng.ILogProvider): void {
                
        $logProvider.debugEnabled(false);        

        var urlFormat: string = '/';
        
        $urlRouterProvider
            .otherwise(urlFormat);
       



    }
})();  