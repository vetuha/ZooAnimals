declare var zooUrls: any;

module FitsMe.Common {
    'use strict';

    export interface IZooServiceBase {
        apiUrl:string;
    }

    export class ZooServiceBase
        implements IZooServiceBase {

        public apiUrl:string = zooUrls.api.base;

        static $inject = ['$injector'];
        constructor(protected $injector: angular.auto.IInjectorService) {
         
        }

    }
}  