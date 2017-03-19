using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Zoo_Animals_DAL.EF;
using Zoo_Animals_DAL.Entitites;
using Zoo_Animals_DAL.Interfaces;

namespace Zoo_Animals_DAL.Repositories
{
    public class SpeciesRepository : IRepository<Species>
    {
        private ZooContext _db;

        public SpeciesRepository(ZooContext context)
        {
            this._db = context;
        }

        public IEnumerable<Species> GetAll()
        {
            return _db.SpeciesOfAnimals;
        }

        public Species Get(int id)
        {
            return _db.SpeciesOfAnimals.Find(id);
        }

        public void Create(Species species)
        {
            _db.SpeciesOfAnimals.Add(species);
        }

        public void Update(Species species)
        {
            _db.Entry(species).State = EntityState.Modified;
        }

        public IEnumerable<Species> Find(Func<Species, Boolean> predicate)
        {
            return _db.SpeciesOfAnimals.Where(predicate).ToList();
        }

        public void Delete(int id)
        {
            Species species = _db.SpeciesOfAnimals.Find(id);
            if (species != null)
                _db.SpeciesOfAnimals.Remove(species);
        }
    }
}
