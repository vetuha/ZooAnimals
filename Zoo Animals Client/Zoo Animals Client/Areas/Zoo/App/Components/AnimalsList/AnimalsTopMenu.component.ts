module FitsMe.Zoo.Components {
    'use strict';

    interface IAnimalsTopMenuController {

    }

    class AnimalsTopMenuController implements IAnimalsTopMenuController {

        public totalItems: number;
        public currentPage: number;
        public addAnimal: () => void;

        static $inject = ['$injector',
            '$scope',
            'usSpinnerService',
            '$q',
            '$uibModal',
            'fitsMeZooAnimalsService'];

        constructor(protected $injector: angular.auto.IInjectorService,
            $scope: angular.IRootScopeService,
            private spinner: any,
            protected $q: angular.IQService,
            protected $uibModal: angular.ui.bootstrap.IModalService,
            protected animalsService: FitsMe.Zoo.Components.IAnimalsService) {

            var ctrl = this;


        }

        private changePage(): void {

        }

    }


    class AnimalsTopMenuComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public controllerAs: string;
        public templateUrl: string;

        constructor() {
            this.bindings = {
                animals: '=',
                currentPage: '=',
                addAnimal: '&'
            };

            this.controller = 'fitsMeAnimalsTopMenuController';
            this.controllerAs = 'ctrl';
            this.templateUrl = '/Areas/Zoo/App/Components/AnimalsList/AnimalsTopMenu.component.html';
        }
    }

    angular
        .module('FitsMe.Zoo.Components')
        .component('fitsMeAnimalsTopMenuComponent', new AnimalsTopMenuComponent())
        .controller('fitsMeAnimalsTopMenuController', AnimalsTopMenuController);
}