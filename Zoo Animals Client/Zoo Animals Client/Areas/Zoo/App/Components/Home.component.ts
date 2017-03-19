module FitsMe.Zoo.Components {
    'use strict';

    interface IHomeController {

    }

    class HomeController implements IHomeController {

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

            this.controller = 'fitsMeZooHomeHomeController';
            this.controllerAs = 'ctrl';
            this.templateUrl = 'Areas/Zoo/App/Components/Home.component.html';
        }
    }

    angular
        .module('FitsMe.Zoo.Components')
        .component('fitsMeZooHomeComponent', new HomeComponent())
        .controller('fitsMeZooHomeHomeController', HomeController);
} 