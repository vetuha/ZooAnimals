module FitsMe.Zoo.Components {
    'use strict';

    export class TableColumns {
        DisplayName: string;
        FieldName: string;
    }

    export interface ITableConfigurationService {
        getColumns(): TableColumns[];
    }

    class TableConfigurationService
        implements ITableConfigurationService {
        

        static $inject = [];

        constructor() {
            var ctrl = this;
        }

        public getColumns(): TableColumns[] {
            var speciesField = {
                DisplayName: 'Species',
                FieldName: 'Species'
            };

            var nameField = {
                DisplayName: 'Name',
                FieldName: 'Name'
            };

            var yearOfBirthField = {
                DisplayName: 'Year of birth',
                FieldName: 'YearOfBirth'
            };

            var ageField = {
                DisplayName: 'Age',
                FieldName: 'Age'
            };

            var addedField = {
                DisplayName: 'Added',
                FieldName: 'Added'
            };

            return [speciesField, nameField, yearOfBirthField,ageField,addedField];
        }
    }

    angular
        .module('FitsMe.Zoo.Components')
        .service('fitsMeZooTableConfigurationService', TableConfigurationService);
}