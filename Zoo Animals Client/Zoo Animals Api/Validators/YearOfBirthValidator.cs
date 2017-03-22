using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Zoo_Animals_DAL.Entitites;

namespace Zoo_Animals_Api.Validators
{
    public class YearOfBirthValidator : ValidatorBase
    {
        public override List<string> HandleValidation(Animal model)
        {
            if (model.YearOfBirth < 1900 || model.YearOfBirth > DateTime.Now.Year)
            {
                ErrorsResult.Add( $"Year Of Birth must be between 1900 and {DateTime.Now.Year}.");

                return ErrorsResult;
            }
            if (Successor != null)

                return Successor.HandleValidation(model);

            return ErrorsResult;
        }

    }
}