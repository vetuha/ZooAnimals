using System.Collections.Generic;
using System.Linq;
using Zoo_Animals_DAL.Entitites;

namespace Zoo_Animals_Api.Validators
{
    public class DuplicatesValidator: ValidatorBase
    {
        private List<Animal> _existingAnimals;

        public DuplicatesValidator(List<Animal> existingAnimals)
        {
            _existingAnimals = existingAnimals;
        }
        public override List<string> HandleValidation(Animal model)
        {
            if (_existingAnimals != null && _existingAnimals.Any(x => x.SpeciesId == model.SpeciesId && x.Name == model.Name))
            {
                ErrorsResult.Add("Multiple animals with the same name and same species not allowed!");

                return ErrorsResult;
            }
            if (Successor != null)

                return Successor.HandleValidation(model);

            return ErrorsResult;
        }
    }
}