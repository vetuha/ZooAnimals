module FitsMe.Zoo.Components {
    import ModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;
    'use strict';


    interface IAnimalModalController {
    }

    class AnimalModalController
        implements IAnimalModalController {
        private modalTitle: string;
        private animal: Api.AnimalDTO;

        static $inject = [
            '$injector',
            '$scope',
            '$uibModalInstance',
            'modalParams'
        ];

        constructor(protected $injector: angular.auto.IInjectorService,
            public $scope: angular.IRootScopeService,
            protected $uibModalInstance: ModalServiceInstance,
            protected modalParams: Components.AnimalModalParams) {

            var self = this;

            self.modalTitle = self.modalParams.title;
            self.animal = self.modalParams.animal;
        }

        private ok(): void {
            
        }

        private close(): void {
            this.$uibModalInstance.dismiss('close');
        }

        private apply(): void {
            this.$uibModalInstance.close();
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