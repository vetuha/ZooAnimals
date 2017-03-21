using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Zoo_Animals_DAL.Entitites;

namespace Zoo_Animals_Api.Services
{
    public class ZooValidator
    {
        public static bool ValidateAnimal(Animal animal, List<Animal> existingAnimals)
        {
            return existingAnimals.Any(x => x.Species.Id == animal.Species.Id && x.Name == animal.Name);
        }
    }
}