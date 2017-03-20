(function () {
    'use strict';
    angular
        .module('FitsMe.Zoo')
        .run(runFunction);
    runFunction.$inject = ['$log', '$rootScope', '$state'];
    function runFunction($log, $rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (typeof (toState) !== 'undefined') {
                var navInfo = 'STATE NAV: ' + toState.name + '?';
                $log.debug(navInfo);
            }
        });
        $rootScope['appName'] = 'Zoo Animals';
        $log.debug('Angular Zoo Animals - SETUP COMPLETED');
    }
})();
