module FitsMe.Zoo.Components {
    import AnimalDto = FitsMe.Api.AnimalDTO;
    import ModalSettings = angular.ui.bootstrap.IModalSettings;
    'use strict';

    interface IAnimalsController {

    }

    class AnimalsController implements IAnimalsController {

        private animals: FitsMe.Api.AnimalDTO[] = [];
        private allSpecies: FitsMe.Api.SpeciesDTO[] = [];
        private numPages: number = 0;

        get zooIsEmpty(): boolean {
             return this.animals.length === 0;
        }

        static $inject = ['$injector',
            '$scope',
            '$loading',
            '$q',
            '$uibModal',
            'fitsMeZooAnimalsService',
            'fitsMeZooSpeciesService',
            'FitsMe.Common.NotificationService'];

        constructor(protected $injector: angular.auto.IInjectorService,
            $scope: angular.IRootScopeService,
            private $loading: any,
            protected $q: angular.IQService,
            protected modal: angular.ui.bootstrap.IModalService,
            protected animalsService: FitsMe.Zoo.Components.IAnimalsService,
            protected speciesService: FitsMe.Zoo.Components.ISpeciesService,
            protected notificationService: FitsMe.Common.INotificationService) {

            var ctrl = this;

            ctrl.getAllAnimals();
        }

        private getAllAnimals(): void {
            var self = this;
            self.$loading.start('home-spinner');
            //load all data for the Zoo
            self.$q.all({
                allSpecies: self.speciesService.GetAllSpecies(),
                allAnimals: self.animalsService.GetAllAnimals()
            }).then((results) => {
                self.animals = results['allAnimals'];
                self.allSpecies = results['allSpecies'];
            }).catch((reason: any) => {
                self.notificationService.ShowNotification('An error has occurred, please try again.', 'error');
            }).finally(() => self.$loading.finish('home-spinner'));
        }

        getMaxPage(): number {
            if (this.animals.length) {
                return Math.ceil(this.animals.length / 10);
            }
            return 0;
        }

        public editAnimal(animal: AnimalDto): void {
            var self = this;
            var modalParams: AnimalModalParams = {
                title: 'Edit Animal',
                operation: AnimalOperationEnum.Edit,
                animal: animal
            };

            self.openAddEditAnimalModal(modalParams);
        }

        public addAnimal(): void {
            var self = this;
            var animal = new AnimalDto();
            var modalParams: AnimalModalParams = {
                title: 'Add New Animal',
                operation: AnimalOperationEnum.Add,
                animal: animal
            };

            self.openAddEditAnimalModal(modalParams);
        }

        public removeAnimal(animal: AnimalDto): void {
            var self = this;
            var modalInstance = self.modal.open({
                templateUrl: '/Areas/Zoo/App/Components/AnimalsList/Modals/DeleteAnimalModal.component.html',
                controller: 'fitsMeDeleteAnimalModalController',
                controllerAs: 'ctrl',
                resolve: {
                    animal: () => animal
                }
            });

            modalInstance.result.then((remove) => {
                if (remove) {
                    _.remove(self.animals, { Id: animal.Id });
                    self.notificationService.ShowNotification('Animal has been removed!', 'message');
                }
            });
        }

        private openAddEditAnimalModal(modalParams: AnimalModalParams): void {
            var self = this;
            var modalInstance = self.modal.open({
                templateUrl: '/Areas/Zoo/App/Components/AnimalsList/Modals/AnimalModal.component.html',
                controller: 'fitsMeAnimalModalController',
                controllerAs: 'ctrl',
                size: 'lg',
                backdrop: false,
                resolve: {
                    modalParams: () => modalParams
                }
            });

            modalInstance.result.then((result: AnimalDto) => {
                if (modalParams.operation == AnimalOperationEnum.Add) {
                    self.animals.push(result);
                    self.notificationService.ShowNotification('New animal has been added successfully!', 'message');
                } else {
                    let index = self.animals.indexOf(result);
                    if (~index) {
                        self.animals[index] = result;
                    }
                    self.notificationService.ShowNotification('Animal data has been updated successfully!', 'message');
                }

            });
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