module FitsMe.Zoo.Components {
    'use strict';

    export interface IAnimalsService {
        GetAllAnimals(): ng.IPromise<FitsMe.Api.AnimalDTO[]>;
    }

    class AnimalsService implements IAnimalsService {

        static $inject = ['$q', '$log', '$http'];

        constructor(
            protected $q: ng.IQService,
            protected $log: ng.ILogService,
            protected $http: ng.IHttpService) {

            var self = this;
        }

        private getAnimalsUrl: string = "Zoo/GetAnimals";

        public GetAllAnimals(): ng.IPromise<FitsMe.Api.AnimalDTO[]> {
            var def = this.$q.defer();
            var self = this;

            self.$http.get(self.getAnimalsUrl).then((response) => {
                def.resolve(<FitsMe.Api.AnimalDTO[]>response.data);
            }, (err) => {
                self.handleError(err);
                def.reject(err);
            });

            return def.promise;
        }

        private handleError(error: any) {
            var errorMgs = "Error getting species.";
            if (error.Message)
                errorMgs = error.Message + " " + error.MessageDetail;
            else {
                errorMgs = errorMgs + "API status: " + error.statusText;
            }
            this.$log.debug(errorMgs);
        }
    }

    angular
        .module('FitsMe.Zoo.Components')
        .service('fitsMeZooAnimalsService', AnimalsService);
}