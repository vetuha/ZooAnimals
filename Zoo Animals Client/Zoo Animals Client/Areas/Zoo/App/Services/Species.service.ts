module FitsMe.Zoo.Components {
    'use strict';

    export interface ISpeciesService {
        GetAllSpecies(): ng.IPromise<FitsMe.Api.SpeciesDTO[]>;
    }

    class SpeciesService implements ISpeciesService {

        private savedSpecies: FitsMe.Api.SpeciesDTO[];

        static $inject = ['$q', '$log', '$http'];
        constructor(
            protected $q: ng.IQService,
            protected $log: ng.ILogService,
            protected $http: ng.IHttpService) {

            var self = this;
        }      


        private getSpeciesUrl: string = "/api/Zoo/GetSpecies";

        public GetAllSpecies(): ng.IPromise<FitsMe.Api.SpeciesDTO[]> {
            var def = this.$q.defer();
            var self = this;

            if (self.savedSpecies && self.savedSpecies.length) {
                def.resolve(self.savedSpecies);
            } else {               

                self.$http.get(self.getSpeciesUrl).then((response) => {
                    self.savedSpecies = <FitsMe.Api.SpeciesDTO[]>response.data;
                    def.resolve(self.savedSpecies);
                }, (err) => {
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