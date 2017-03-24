module FitsMe.Zoo.Components {
    import AnimalDto = FitsMe.Api.AnimalDTO;
    import ZooServiceBase = FitsMe.Common.ZooServiceBase;
    'use strict';

    export interface IAnimalsService {
        GetAllAnimals(): ng.IPromise<FitsMe.Api.AnimalDTO[]>;
        AddAnimal(animalDto: AnimalDto): ng.IPromise<Api.AnimalDTO>;
        EditAnimal(animalDto: AnimalDto): ng.IPromise<string>;
        DeleteAnimal(id: number): ng.IPromise<string>;
    }

    class AnimalsService extends ZooServiceBase implements IAnimalsService {
        static $inject = ['$injector', '$q', '$log', '$http'];

        constructor(
            protected $injector: angular.auto.IInjectorService,
            protected $q: ng.IQService,
            protected $log: ng.ILogService,
            protected $http: ng.IHttpService) {
            super($injector);
            var self = this;
        }

        private getAnimalsUrl: string = this.apiUrl + "/api/Zoo/GetAnimals";

        public GetAllAnimals(): ng.IPromise<FitsMe.Api.AnimalDTO[]> {
            var def = this.$q.defer();
            var self = this;

            self.$http.get(self.getAnimalsUrl).success((response) => {
                def.resolve(<FitsMe.Api.AnimalDTO[]>response);
            }).error((err) => {
                self.handleError(err);
                def.reject(err);
            });

            return def.promise;
        }

        private addAnimalUrl: string = this.apiUrl + "/api/Zoo/AddAnimal";

        public AddAnimal(animalDto: AnimalDto): ng.IPromise<Api.AnimalDTO> {
            var def = this.$q.defer();
            var self = this;

            self.$http.post(self.addAnimalUrl, animalDto).success((response) => {
                def.resolve(<Api.AnimalDTO>response);
            }).error((err) => {
                self.handleError(err);
                def.reject(err);
            });

            return def.promise;
        }

        private editAnimalUrl: string = this.apiUrl + "/api/Zoo/EditAnimal";

        public EditAnimal(animalDto: AnimalDto): ng.IPromise<string> {
            var def = this.$q.defer();
            var self = this;

            self.$http.post(self.editAnimalUrl, animalDto).success((response) => {
                def.resolve(response);
            }).error((err) => {
                self.handleError(err);
                def.reject(err);
            });

            return def.promise;
        }

        private removeAnimalUrl: string = this.apiUrl + "/api/Zoo/RemoveAnimal?animalId=";

        public DeleteAnimal(id: number): ng.IPromise<string> {
            var def = this.$q.defer();
            var self = this;

            self.$http.get(self.removeAnimalUrl + id)
                .success((response) => {
                    def.resolve(response);
                })
                .error((err) => {
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