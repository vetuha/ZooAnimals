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
                
        $logProvider.debugEnabled(true);        

        var urlFormat: string = '/';
        
        $urlRouterProvider
            .otherwise(urlFormat);

        $stateProvider
            .state('home',
            {
                url: '/',
                views: {
                    'MainView': {
                        template: '<fits-me-zoo-home-component></fits-me-zoo-home-component>'
                    }
                }
            });
    }
})();  