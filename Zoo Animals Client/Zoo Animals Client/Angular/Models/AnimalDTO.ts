module FitsMe.Api {
    'use strict';

    export class AnimalDTO {
        Id: number;
        Species: SpeciesDTO;
        Name: string;
        YearOfBirth: number;
        Added: Date;

        public get Age(): number {
            return new Date().getFullYear() - this.YearOfBirth;
        }
    }
}