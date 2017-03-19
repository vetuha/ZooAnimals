using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zoo_Animals_DAL.EF;
using Zoo_Animals_DAL.Entitites;
using Zoo_Animals_DAL.Interfaces;

namespace Zoo_Animals_DAL.Repositories
{
    public class EFUnitOfWork : IUnitOfWork
    {
        private ZooContext _db;
        private AnimalRepository _animalRepository;
        private SpeciesRepository _speciesRepository;

        public EFUnitOfWork(string connectionString)
        {
            _db = new ZooContext(connectionString);
        }
        public IRepository<Animal> Animals
        {
            get
            {
                if (_animalRepository == null)
                    _animalRepository = new AnimalRepository(_db);
                return _animalRepository;
            }
        }

        public IRepository<Species> SpeciesOfAnimals
        {
            get
            {
                if (_speciesRepository == null)
                    _speciesRepository = new SpeciesRepository(_db);
                return _speciesRepository;
            }
        }

        public void Save()
        {
            _db.SaveChanges();
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _db.Dispose();
                }
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
