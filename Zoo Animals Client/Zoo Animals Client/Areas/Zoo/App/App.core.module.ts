((): void => {
    'use strict';

    angular
        .module('FitsMe.Zoo.Core', [

            // 3rd Party Modules
            'ui.router',
            'ngTouch',
            'ngSanitize',
            'angularMoment',

            //Zoo Modules
            'FitsMe.Common'
            //'FitsMe.Directives',
            //'FitsMe.Components'
        ]);
})();