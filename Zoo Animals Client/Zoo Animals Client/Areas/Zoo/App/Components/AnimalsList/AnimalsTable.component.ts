module FitsMe.Zoo.Components {
    'use strict';

    interface IAnimalsTableController {

    }

    class AnimalsTableController implements IAnimalsTableController {
        private orderBy: string = '';
        private animals: FitsMe.Api.AnimalDTO[] = [];
        private currentAnimals: FitsMe.Api.AnimalDTO[] = [];
        private currentPage: number;
        private avgAge: number;
        private columns: TableColumns[] = [];

        static $inject = ['$injector',
            '$scope',
            'usSpinnerService',
            '$q',
            '$uibModal',
            'fitsMeZooAnimalsService',
            'fitsMeZooTableConfigurationService'];

        constructor(protected $injector: angular.auto.IInjectorService,
            $scope: angular.IRootScopeService,
            private spinner: any,
            protected $q: angular.IQService,
            protected $uibModal: angular.ui.bootstrap.IModalService,
            protected animalsService: FitsMe.Zoo.Components.IAnimalsService,
            protected tableConfigurationService: FitsMe.Zoo.Components.ITableConfigurationService) {

            var ctrl = this;

            ctrl.columns = tableConfigurationService.getColumns();
        }       

    }


    class AnimalsTableComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public controllerAs: string;
        public templateUrl: string;

        constructor() {
            this.bindings = {
                animals: '=',
                currentPage: '='
            };

            this.controller = 'fitsMeAnimalsTableController';
            this.controllerAs = 'ctrl';
            this.templateUrl = '/Areas/Zoo/App/Components/AnimalsList/AnimalsTable.component.html';
        }
    }

    angular
        .module('FitsMe.Zoo.Components')
        .component('fitsMeAnimalsTableComponent', new AnimalsTableComponent())
        .controller('fitsMeAnimalsTableController', AnimalsTableController);
}