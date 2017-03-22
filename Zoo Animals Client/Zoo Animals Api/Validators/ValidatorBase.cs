using System.Collections.Generic;
using Zoo_Animals_DAL.Entitites;

namespace Zoo_Animals_Api.Validators
{
    public abstract class ValidatorBase
    {
        protected ValidatorBase Successor { get; private set; }

        protected List<string> ErrorsResult { get; set; }

        protected ValidatorBase()
        {
            ErrorsResult = new List<string>();
        }
        public abstract List<string> HandleValidation(Animal model);

        // Set next validation
        public void SetSuccessor(ValidatorBase successor)
        {
            this.Successor = successor;
        }

    }

}