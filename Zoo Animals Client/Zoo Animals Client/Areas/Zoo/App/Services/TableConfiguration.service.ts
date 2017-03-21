module FitsMe.Zoo.Components {
    'use strict';

    export class TableColumn {
        DisplayName: string;
        FieldName: string;
    }

    export interface ITableConfigurationService {
        getColumns(): TableColumn[];
    }

    class TableConfigurationService
        implements ITableConfigurationService {
        

        static $inject = [];

        constructor() {
            var ctrl = this;
        }

        public getColumns(): TableColumn[] {
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