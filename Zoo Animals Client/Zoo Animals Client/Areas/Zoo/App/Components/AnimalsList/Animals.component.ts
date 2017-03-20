module FitsMe.Zoo.Components {
    'use strict';

    interface IAnimalsController {

    }

    class AnimalsController implements IAnimalsController {
        
        private animals: FitsMe.Api.AnimalDTO[] = [];
        private numPages: number = 0;

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

        getMaxPage(): number {
            if (this.animals.length) {
                return Math.ceil(this.animals.length / 10);
            }
            return 0;
        }

    }


    class AnimalsComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public controllerAs: string;
        public templateUrl: string;

        constructor() {
            this.bindings = {
                
            };

            this.controller = 'fitsMeAnimalsController';
            this.controllerAs = 'ctrl';
            this.templateUrl = '/Areas/Zoo/App/Components/AnimalsList/Animals.component.html';
        }
    }

    angular
        .module('FitsMe.Zoo.Components')
        .component('fitsMeAnimalsComponent', new AnimalsComponent())
        .controller('fitsMeAnimalsController', AnimalsController);
}