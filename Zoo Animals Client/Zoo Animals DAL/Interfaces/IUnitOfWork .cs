using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Zoo_Animals_DAL.Entitites;

namespace Zoo_Animals_DAL.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Animal> Animals { get; }
        IRepository<Species> SpeciesOfAnimals { get; }
        void Save();
    }
}
