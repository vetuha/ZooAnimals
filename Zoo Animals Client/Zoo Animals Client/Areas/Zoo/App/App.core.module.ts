((): void => {
    'use strict';

    angular
        .module('FitsMe.Zoo.Core', [

            // 3rd Party Modules
            'ui.router',
            'ngSanitize',
            'angularMoment',

            //Zoo Modules
            'FitsMe',
            'FitsMe.Directives',
            'FitsMe.Components'
        ]);
})();