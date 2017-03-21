module FitsMe.Zoo.Components {
    'use strict';

    export class AnimalModalParams {
        animal: FitsMe.Api.AnimalDTO;
        title:string;
        operation: AnimalOperationEnum;
    }

    export enum AnimalOperationEnum {
        Add = 0,
        Edit = 1
    }
}