((): void => {
    'use strict';  
    
    angular
        .module('FitsMe.Zoo')
        .run(runFunction);
    
    runFunction.$inject = ['$log', '$rootScope', '$state'];

    function runFunction(
        $log: ng.ILogService,
        $rootScope: ng.IRootScopeService,
        $state: ng.ui.IStateService): void {
        
        $rootScope.$on('$stateChangeStart',
                        (event: any, toState: ng.ui.IState, toParams: ng.ui.IStateParamsService, fromState: ng.ui.IState, fromParams: ng.ui.IStateParamsService): void => {
                if (typeof (toState) !== 'undefined') {
                    var navInfo: string = 'STATE NAV: ' + toState.name + '?';
                    $log.debug(navInfo);
                }
            });
        $log.debug('Angular Zoo Animals - SETUP COMPLETED');

    }
})();