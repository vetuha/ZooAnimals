(() => {
    'use strict';

    angular
        .module('FitsMe')
        .config(configFunction);

    configFunction.$inject = ['$provide'];

    function configFunction($provide: ng.auto.IProvideService) {
        //set timezones always to UTC across all apps.
        $provide.decorator('dateFilter', ['$delegate', function ($delegate) {
            return function (date, format, timezone) {
                return $delegate(date, format, 'UTC');
            };
        }]);
    }
})();