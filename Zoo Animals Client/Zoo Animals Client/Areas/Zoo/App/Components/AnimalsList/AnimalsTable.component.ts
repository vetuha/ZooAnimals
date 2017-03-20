﻿module FitsMe.Zoo.Components {
    'use strict';

    interface IAnimalsTableController {

    }

    class AnimalsTableController implements IAnimalsTableController {
        private orderBy: string = '';
        private animals: FitsMe.Api.AnimalDTO[] = [];
        private currentAnimals: FitsMe.Api.AnimalDTO[] = [];
        private currentPage: number;
        private avgAge: number;

        static $inject = ['$injector',
            '$scope',
            '$loading',
            '$q',
            '$uibModal',
            'fitsMeZooAnimalsService'];

        constructor(protected $injector: angular.auto.IInjectorService,
            $scope: angular.IRootScopeService,
            private $loading: any,
            protected $q: angular.IQService,
            protected $uibModal: angular.ui.bootstrap.IModalService,
            protected animalsService: FitsMe.Zoo.Components.IAnimalsService) {

            var ctrl = this;
            
            
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
            this.templateUrl = 'Areas/Zoo/App/Components/AnimalsList/AnimalsTable.component.html';
        }
    }

    angular
        .module('FitsMe.Zoo.Components')
        .component('fitsMeAnimalsTableComponent', new AnimalsTableComponent())
        .controller('fitsMeAnimalsTableController', AnimalsTableController);
}