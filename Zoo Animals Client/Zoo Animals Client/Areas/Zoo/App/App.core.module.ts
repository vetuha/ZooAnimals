((): void => {
    'use strict';

    angular
        .module('FitsMe.Zoo.Core', [
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