using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NUnit.Framework;
using Ploeh.AutoFixture;
using Zoo_Animals_Api.Validators;
using Zoo_Animals_DAL.Entitites;

namespace Zoo_Animals_Test.Tests
{
    [TestFixture]
    public class AnimalNameValidatorTest
    {
        private AnimalNameValidator _validator;
        private Fixture _fixture;

        [SetUp]
        public void Setup()
        {
            _validator = new AnimalNameValidator();
            _fixture = new Fixture();
        }

        [Test]
        public void ShouldReturnListWithOneErrorIfAnimalNameIsNullOrEmpty()
        {
            var animal = _fixture.Create<Animal>();
            animal.Name = "";
            var expectedResult = _validator.HandleValidation(animal);

            Assert.IsNotEmpty(expectedResult);
        }

        [Test]
        public void ShouldNotReturnListWithErrorIfAnimalNameIsPresent()
        {
            var animal = _fixture.Create<Animal>();
            var expectedResult = _validator.HandleValidation(animal);

            Assert.IsEmpty(expectedResult);
        }
    }
}
