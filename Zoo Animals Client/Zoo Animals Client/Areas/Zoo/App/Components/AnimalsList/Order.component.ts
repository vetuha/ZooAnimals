module FitsMe.Zoo.Components {
    'use strict';

    interface IAnimalsOrderController {

    }


    class AnimalsOrderController
        implements IAnimalsOrderController {
        
        public title: string;
        public items: any[];
        public field: string;
        public class: string = "down";
        public orderBy: string;
        public reverse: boolean;

        static $inject = ['$injector', '$scope'];
        constructor(protected $injector: angular.auto.IInjectorService, $scope: angular.IRootScopeService) {

        }

        onClick($event: any): void {
            $event.stopPropagation();
            var self = this;

            if (self.orderBy == self.field) {
                self.reverse = !self.reverse;
            } else {
                self.orderBy = self.field;
                self.reverse = false;
            }

            if (angular.isDefined(self.items)) {
                var key = (x) => { return x[self.field]; };
                var rev = self.reverse ? -1 : 1;

                self.items.sort((a, b) => {
                    var aa: any = key(a), bb: any = key(b);
                    return rev * (<any>(aa > bb) - <any>(bb > aa));
                });
            }
        }

        inSort(): boolean {
            return this.orderBy == this.field;
        }

        notInSort(): boolean {
            return !this.inSort();
        }
    }

    class AnimalsOrderComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public controllerAs: string;
        public template: string;

        constructor() {
            this.bindings = {
                title: '@',
                items: '=',
                field: '@',
                orderBy: '='
            };

            this.controller = 'fitsMeAnimalsOrderController';
            this.controllerAs = 'ctrl';
            this.template = '<a ng-click="ctrl.onClick($event);" class="glyphicon order" ng-if="ctrl.notInSort()">{{ctrl.title}}<i></i></a>'
                + '<a ng-click="ctrl.onClick($event);" class="glyphicon order" ng-if="ctrl.inSort()" ng-class="{\'glyphicon-arrow-up\': ctrl.reverse, \'glyphicon-arrow-down\': !ctrl.reverse}">{{ctrl.title}}<i></i></a>';
        }
    }
    
    angular
        .module('FitsMe.Zoo.Components')
        .component('fitsMeAnimalsOrderComponent', new AnimalsOrderComponent())
        .controller('fitsMeAnimalsOrderController', AnimalsOrderController);
} 