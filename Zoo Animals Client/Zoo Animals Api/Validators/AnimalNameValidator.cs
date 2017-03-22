using System.Collections.Generic;
using Zoo_Animals_DAL.Entitites;

namespace Zoo_Animals_Api.Validators
{
    public class AnimalNameValidator: ValidatorBase
    {
        public override List<string> HandleValidation(Animal model)
        {
            if (string.IsNullOrWhiteSpace(model.Name))
            {
                ErrorsResult.Add("Name should not be empty.");

                return ErrorsResult;
            }
            if (Successor != null)

                return Successor.HandleValidation(model);

            return ErrorsResult;
        }
    }
}