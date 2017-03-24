using System;
using System.Collections.Generic;
using Zoo_Animals_Api.Inrefaces;
using Zoo_Animals_DAL.Entitites;
using Zoo_Animals_DAL.Interfaces;

namespace Zoo_Animals_Api.Services
{
    public class ZooService: IZooService
    {
        IUnitOfWork _uow { get; set; }

        public ZooService(IUnitOfWork uow)
        {
            _uow = uow;
        }
        public Animal AddAnimal(Animal animalToAdd)
        {
            animalToAdd.Added = DateTime.Now;
            animalToAdd.Modified = animalToAdd.Added;            
            _uow.Animals.Create(animalToAdd);
            _uow.Save();

            return animalToAdd;
        }

        public void EditAnimal(Animal modifiedAnimal)
        {
            var currentAnimal = _uow.Animals.Get(modifiedAnimal.Id);
            currentAnimal.SpeciesId = modifiedAnimal.SpeciesId;
            currentAnimal.Name = modifiedAnimal.Name;
            currentAnimal.YearOfBirth = modifiedAnimal.YearOfBirth;
            currentAnimal.Modified = DateTime.Now;

            _uow.Animals.Update(currentAnimal);
            _uow.Save();
        }

        public IEnumerable<Animal> GetAnimals()
        {
            return _uow.Animals.GetAll();
        }

        public Animal GetAnimal(int id)
        {
            return _uow.Animals.Get(id);           
        }

        public void RemoveAnimal(int id)
        {
            _uow.Animals.Delete(id);
            _uow.Save();
        }

        public IEnumerable<Species> GetAllSpecies()
        {
            return _uow.SpeciesOfAnimals.GetAll();
        }

        public void Dispose()
        {
            _uow.Dispose();
        }
    }
}