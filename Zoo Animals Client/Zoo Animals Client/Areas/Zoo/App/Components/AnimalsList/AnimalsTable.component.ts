module FitsMe.Zoo.Components {
    'use strict';

    interface IAnimalsTableController {

    }

    class AnimalsTableController implements IAnimalsTableController {
        private orderBy: string = '';
        private animals: FitsMe.Api.AnimalDTO[] = [];
        private currentAnimals: FitsMe.Api.AnimalDTO[] = [];
        private currentPage: number;
        private columns: FitsMe.Zoo.Components.TableColumn[] = [];

        public editAnimal: (params) => void;
        public removeAnimal: (params) => void;

        public get avgAge(): number {
            if (this.animals.length)
                return this.animals.reduce((p, c) => (p + c.Age), 0) / this.animals.length;

            return 0;
        }

        static $inject = ['$injector',
            '$scope',
            'usSpinnerService',
            '$q',
            '$uibModal',
            'moment',
            'fitsMeZooAnimalsService',
            'fitsMeZooTableConfigurationService'];

        constructor(protected $injector: angular.auto.IInjectorService,
            $scope: angular.IRootScopeService,
            private spinner: any,
            protected $q: angular.IQService,
            protected $uibModal: angular.ui.bootstrap.IModalService,
            protected moment: any,
            protected animalsService: FitsMe.Zoo.Components.IAnimalsService,
            protected tableConfigurationService: FitsMe.Zoo.Components.ITableConfigurationService) {

            var ctrl = this;

            ctrl.columns = tableConfigurationService.getColumns();
        }

        format(animal: FitsMe.Api.AnimalDTO,
            fieldName: string): string {
            var self = this;
            var animalData = animal[fieldName];

            if (fieldName == 'Added') {
                return self.moment(animalData).fromNow();
            }
            if (fieldName == 'Species') {
                return animalData.Name;
            }

            return animalData;
        }

        modifyAnimal(animal: FitsMe.Api.AnimalDTO): void {
            this.editAnimal({ animal: animal });
        }

        deleteAnimal(animal: FitsMe.Api.AnimalDTO): void {
            this.removeAnimal({ animal: animal });
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
                currentPage: '=',
                editAnimal: '&',
                removeAnimal: '&'
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