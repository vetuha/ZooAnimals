module FitsMe.Zoo.Components {
    import ZooServiceBase = FitsMe.Common.ZooServiceBase;
    'use strict';

    export interface ISpeciesService {
        GetAllSpecies(): ng.IPromise<FitsMe.Api.SpeciesDTO[]>;
    }

    class SpeciesService extends ZooServiceBase implements ISpeciesService {

        private savedSpecies: FitsMe.Api.SpeciesDTO[];

        static $inject = ['$injector', '$q', '$log', '$http'];
        constructor(
            protected $injector: angular.auto.IInjectorService,
            protected $q: ng.IQService,
            protected $log: ng.ILogService,
            protected $http: ng.IHttpService) {

            super($injector);
            var self = this;
        }


        private getSpeciesUrl: string = this.apiUrl + "/api/Zoo/GetSpecies";

        public GetAllSpecies(): ng.IPromise<FitsMe.Api.SpeciesDTO[]> {
            var def = this.$q.defer();
            var self = this;

            if (self.savedSpecies && self.savedSpecies.length) {
                def.resolve(self.savedSpecies);
            } else {

                self.$http.get(self.getSpeciesUrl)
                    .success((response) => {
                        self.savedSpecies = <FitsMe.Api.SpeciesDTO[]>response;
                        def.resolve(self.savedSpecies);
                    }).error((err) => {
                        self.handleError(err);
                        def.reject(err);
                    });

            }

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
        .service('fitsMeZooSpeciesService', SpeciesService);
}