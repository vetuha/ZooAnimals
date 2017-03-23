using System.Collections.Generic;
using Zoo_Animals_Api.Validators;
using Zoo_Animals_DAL.Entitites;

namespace Zoo_Animals_Api.Services
{
    public class ZooValidator
    {
        public static List<string> Validate(Animal model, List<Animal> existingAnimals)
        {
            DuplicatesValidator duplicatesValidator = new DuplicatesValidator(existingAnimals);
            AnimalNameValidator animalNameValidator = new AnimalNameValidator();
            duplicatesValidator.SetSuccessor(animalNameValidator);
            YearOfBirthValidator yearOfBirthValidator = new YearOfBirthValidator();
            animalNameValidator.SetSuccessor(yearOfBirthValidator);

            return duplicatesValidator.HandleValidation(model);
        }
    }
}