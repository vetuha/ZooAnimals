using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zoo_Animals_DAL.EF;
using Zoo_Animals_DAL.Entitites;
using Zoo_Animals_DAL.Interfaces;

namespace Zoo_Animals_DAL.Repositories
{
    public class AnimalRepository : IRepository<Animal>
    {
        private ZooContext _db;

        public AnimalRepository(ZooContext context)
        {
            this._db = context;
        }

        public IEnumerable<Animal> GetAll()
        {
            return _db.Animals.Include(a => a.Species);
        }

        public Animal Get(int id)
        {
            return _db.Animals.Find(id);
        }

        public void Create(Animal animal)
        {
            _db.Animals.Add(animal);
        }

        public void Update(Animal animal)
        {
            _db.Entry(animal).State = EntityState.Modified;
        }

        public IEnumerable<Animal> Find(Func<Animal, Boolean> predicate)
        {
            return _db.Animals.Include(a => a.Species).Where(predicate).ToList();
        }

        public void Delete(int id)
        {
            Animal animal = _db.Animals.Find(id);
            if (animal != null)
                _db.Animals.Remove(animal);
        }
    }
}
