module FitsMe.Zoo.Components {
    'use strict';

    interface IHomeController {

    }

    class HomeController implements IHomeController {
        private homeSpinnerOptions: any = { radius: 30, width: 8, length: 16 };

        static $inject = ['$injector', '$scope'];

        constructor(protected $injector: angular.auto.IInjectorService,
            $scope: angular.IRootScopeService) {

            var ctrl: HomeController = this;
        }
    }

    class HomeComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public controllerAs: string;
        public templateUrl: string;
        
        constructor() {
            this.bindings = {
            };

            this.controller = 'fitsMeZooHomeController';
            this.controllerAs = 'ctrl';
            this.templateUrl = '/Areas/Zoo/App/Components/Home.component.html';
        }
    }

    angular
        .module('FitsMe.Zoo.Components')
        .component('fitsMeZooHomeComponent', new HomeComponent())
        .controller('fitsMeZooHomeController', HomeController);
} 