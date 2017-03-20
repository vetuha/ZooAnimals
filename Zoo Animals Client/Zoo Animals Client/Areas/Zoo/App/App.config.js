(function () {
    'use strict';
    angular
        .module('FitsMe.Zoo')
        .config(configFunction);
    // dependency injection
    configFunction.$inject = ['$injector', '$stateProvider', '$httpProvider', '$urlRouterProvider', '$logProvider'];
    function configFunction($injector, $stateProvider, $httpProvider, $urlRouterProvider, $logProvider) {
        $logProvider.debugEnabled(false);
        var urlFormat = '/';
        $urlRouterProvider
            .otherwise(urlFormat);
        $stateProvider
            .state('home', {
            url: '/',
            views: {
                'MainView': {
                    template: '<fits-me-zoo-home-component></fits-me-zoo-home-component>'
                }
            },
            params: {}
        });
    }
})();
