module FitsMe.Zoo.Components {
    import ModalServiceInstance = angular.ui.bootstrap.IModalServiceInstance;
    'use strict';


    interface IDeleteAnimalModalController {
    }

    class DeleteAnimalModalController
        implements IDeleteAnimalModalController {

        static $inject = [
            '$injector',
            '$scope',
            '$uibModalInstance'
        ];

        constructor(protected $injector: angular.auto.IInjectorService,
            public $scope: angular.IRootScopeService,
            protected $uibModalInstance: ModalServiceInstance) {

            var self = this;
        }

        private cancel(): void {
            this.$uibModalInstance.dismiss('close');
        }

        private delete(): void {
            this.$uibModalInstance.close(true);
        }
    }

    class DeleteAnimalModalComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public controllerAs: string;
        public templateUrl: string;

        constructor() {
            this.bindings = {
            };

            this.controller = 'fitsMeDeleteAnimalModalController';
            this.controllerAs = 'ctrl';
            this.templateUrl = '/Areas/Zoo/App/Components/AnimalsList/Modals/DeleteAnimalModal.component.html';
        }
    }

    angular
        .module('FitsMe.Zoo.Components')
        .component('fitsMeDeleteAnimalModalComponent', new DeleteAnimalModalComponent())
        .controller('fitsMeDeleteAnimalModalController', DeleteAnimalModalController);

}