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
        private pristineAnimal: Api.AnimalDTO = new Api.AnimalDTO();
        private allSpecies: Api.SpeciesDTO[] = [];

        static $inject = [
            '$injector',
            '$scope',
            '$loading',
            '$uibModalInstance',
            'fitsMeZooAnimalsService',
            'fitsMeZooSpeciesService',
            'FitsMe.Common.NotificationService',
            'modalParams'
        ];

        constructor(protected $injector: angular.auto.IInjectorService,
            public $scope: angular.IRootScopeService,
            protected $loading: any,
            protected $uibModalInstance: ModalServiceInstance,
            protected animalsService: FitsMe.Zoo.Components.IAnimalsService,
            protected speciesService: FitsMe.Zoo.Components.ISpeciesService,
            protected notificationService: FitsMe.Common.INotificationService,
            protected modalParams: Components.AnimalModalParams) {

            var self = this;

            self.modalTitle = self.modalParams.title;
            self.animal = self.modalParams.animal;

            //if edit mode - set pristine animal, to check for modifications later
            if (self.modalParams.operation === AnimalOperationEnum.Edit) {
                self.pristineAnimal = angular.copy(self.animal);
            }

            self.speciesService.GetAllSpecies().then((result) => {
                self.allSpecies = result;
            });
        }

        private ok(): void {
            var self = this;
            //checking for changes
            if (self.animalForm.$pristine || angular.equals(self.animal, self.pristineAnimal)) {
                this.notificationService.ShowNotification('Nothing changed for this animal.', 'warning');
                return;
            }
            //else send request to the server
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
            self.animalsService.AddAnimal(self.animal).then((result) => {
                //all is ok, close modal and return new Animal
                self.apply(result);
            }).catch((reason: any) => {
                //something went wrong - show notification
                self.showError(reason);
            }).finally(() => self.$loading.finish('manage-animal-spinner'));
        }

        private editAnimal(): void {
            var self = this;
            self.animalsService.EditAnimal(self.animal).then((result) => {
                //all is ok, close modal and return modified Animal
                self.apply(self.animal);
            }).catch((reason: any) => {
                //something went wrong - show notification
                self.showError(reason);
            }).finally(() => self.$loading.stop('manage-animal-spinner'));
        }

        private close(): void {
            this.$uibModalInstance.dismiss('close');
        }

        private apply(animal: Api.AnimalDTO): void {
            this.$uibModalInstance.close(animal);
        }

        private showError(error: any) {
            var errorMgs = 'An error has occurred, please try again.';
            if (error.Message)
                errorMgs = error.Message;
            this.notificationService.ShowNotification(errorMgs, 'error');
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