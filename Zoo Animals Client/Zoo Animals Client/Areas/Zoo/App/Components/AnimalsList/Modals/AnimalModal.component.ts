module FitsMe.Zoo.Components {
    import ModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;
    'use strict';


    interface IAnimalModalController {
    }

    class AnimalModalController
        implements IAnimalModalController {
        public animalForm: any;
        private modalTitle: string;
        private animal: Api.AnimalDTO;
        private allSpecies: Api.SpeciesDTO[] = [];

        static $inject = [
            '$injector',
            '$scope',
            '$loading',
            '$uibModalInstance',
            'fitsMeZooAnimalsService',
            'fitsMeZooSpeciesService',
            'modalParams'
        ];

        constructor(protected $injector: angular.auto.IInjectorService,
            public $scope: angular.IRootScopeService,
            protected $loading: any,
            protected $uibModalInstance: ModalServiceInstance,
            protected animalsService: FitsMe.Zoo.Components.IAnimalsService,
            protected speciesService: FitsMe.Zoo.Components.ISpeciesService,
            protected modalParams: Components.AnimalModalParams) {

            var self = this;

            self.modalTitle = self.modalParams.title;
            self.animal = self.modalParams.animal;

            self.speciesService.GetAllSpecies().then((result) => {
                self.allSpecies = result;
            });
        }

        private ok(): void {
            var self = this;
            self.$loading.start('manage-animal-spinner');
            switch (self.modalParams.operation) {
                case AnimalOperationEnum.Add:
                    self.addAnimal();
                    break;
                case AnimalOperationEnum.Edit:
                    self.editAnimal();
                    break;
            }
        }

        private addAnimal(): void {
            var self = this;            

            self.animalsService.AddAnimal(self.animal).then((results) => {
                self.apply('New animal has been added successfully!');
            }).catch((reason: any) => {
                //self.notificationService.ShowNotification('An error has occurred, please try again.', 'error');
            }).finally(() => self.$loading.finish('manage-animal-spinner'));
        }

        private editAnimal(): void {
            var self = this;
            self.animalsService.EditAnimal(self.animal).then((results) => {
                self.apply('Animal data has been updated successfully!');
            }).catch((reason: any) => {
                //self.notificationService.ShowNotification('An error has occurred, please try again.', 'error');
                }).finally(() => self.$loading.stop('home-spinner'));
        }

        private close(): void {
            this.$uibModalInstance.dismiss('close');
        }

        private apply(resultMessage: string): void {
            this.$uibModalInstance.close(resultMessage);
        }
    }

    class AnimalModalComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public controllerAs: string;
        public templateUrl: string;

        constructor() {
            this.bindings = {
            };

            this.controller = 'fitsMeAnimalModalController';
            this.controllerAs = 'ctrl';
            this.templateUrl = '/Areas/Zoo/App/Components/AnimalsList/Modals/AnimalModal.component.html';
        }
    }

    angular
        .module('FitsMe.Zoo.Components')
        .component('fitsMeAnimalModalComponent', new AnimalModalComponent())
        .controller('fitsMeAnimalModalController', AnimalModalController);

}