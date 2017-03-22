using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Zoo_Animals_Api.Validators;
using Zoo_Animals_DAL.Entitites;

namespace Zoo_Animals_Api.Services
{
    public class DuplicatesValidator
    {
        public static bool CheckForDuplicates(Animal animal, List<Animal> existingAnimals)
        {
            return existingAnimals.Any(x => x.Species.Id == animal.Species.Id && x.Name == animal.Name);
        }

        public static List<string> Validate(Animal model)
        {
            AnimalNameValidator animalNameValidator = new AnimalNameValidator();
            YearOfBirthValidator yearOfBirthValidator = new YearOfBirthValidator();
            animalNameValidator.SetSuccessor(yearOfBirthValidator);

            return animalNameValidator.HandleValidation(model);
        }

    }
}