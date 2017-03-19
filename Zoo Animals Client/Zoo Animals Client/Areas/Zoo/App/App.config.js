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
    }
})();
//# sourceMappingURL=App.config.js.map