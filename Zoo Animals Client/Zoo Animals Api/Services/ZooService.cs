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
        public void AddAnimal(Animal animal)
        {            
            _uow.Animals.Create(animal);
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