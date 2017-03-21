module FitsMe.Zoo.Components {
    import AnimalDto = FitsMe.Api.AnimalDTO;
    'use strict';

    export interface IAnimalsService {
        GetAllAnimals(): ng.IPromise<FitsMe.Api.AnimalDTO[]>;
        AddAnimal(animalDto: AnimalDto): ng.IPromise<string>;
        DeleteAnimal(id:number): ng.IPromise<string>;
    }

    class AnimalsService implements IAnimalsService {

        static $inject = ['$q', '$log', '$http'];

        constructor(
            protected $q: ng.IQService,
            protected $log: ng.ILogService,
            protected $http: ng.IHttpService) {

            var self = this;
        }

        private getAnimalsUrl: string = "/api/Zoo/GetAnimals";

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

        private addAnimalUrl: string = "/api/Zoo/AddAnimal";

        public AddAnimal(animalDto: AnimalDto): ng.IPromise<string> {
            var def = this.$q.defer();
            var self = this;

            self.$http.post(self.getAnimalsUrl, animalDto).then((response) => {
                def.resolve(response);
            }, (err) => {
                self.handleError(err);
                def.reject(err);
            });

            return def.promise;
        }

        private removeAnimalUrl: string = "/api/Zoo/RemoveAnimal";

        public DeleteAnimal(id:number): ng.IPromise<string> {
            var def = this.$q.defer();
            var self = this;

            self.$http.post(self.removeAnimalUrl, { animalId: id}).then((response) => {
                def.resolve(response);
            }, (err) => {
                self.handleError(err);
                def.reject(err);
            });

            return def.promise;
        }

        private handleError(error: any) {
            var errorMgs = "Error occured.";
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