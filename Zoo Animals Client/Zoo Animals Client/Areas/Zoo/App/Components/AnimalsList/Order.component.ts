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
            this.template = '<span ng-click="ctrl.onClick($event);" class="pointer" ng-if="ctrl.notInSort()">{{ctrl.title}}<i class="glyphicon"></i></span>'
                + '<span ng-click="ctrl.onClick($event);" class= pointer" ng-if="ctrl.inSort()" >{{ctrl.title}}<i class="glyphicon" ng-class="{\'glyphicon-chevron-up\': ctrl.reverse, \'glyphicon-chevron-down\': !ctrl.reverse}"></i></span>';
        }
    }
    
    angular
        .module('FitsMe.Zoo.Components')
        .component('fitsMeAnimalsOrderComponent', new AnimalsOrderComponent())
        .controller('fitsMeAnimalsOrderController', AnimalsOrderController);
} 