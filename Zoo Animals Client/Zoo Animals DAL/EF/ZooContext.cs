using System.Collections.Generic;
using System.Data.Entity;
using Zoo_Animals_DAL.Entitites;

namespace Zoo_Animals_DAL.EF
{
    public class ZooContext : DbContext
    {
        public DbSet<Animal> Animals { get; set; }
        public DbSet<Species> SpeciesOfAnimals { get; set; }

        static ZooContext()
        {
            Database.SetInitializer<ZooContext>(new ZooDbInitializer());
        }
        public ZooContext(string connectionString)
                : base(connectionString)
        {
        }

        public class ZooDbInitializer : DropCreateDatabaseIfModelChanges<ZooContext>
        {
            protected override void Seed(ZooContext db)
            {
                db.SpeciesOfAnimals.AddRange(GenerateDifferentSpecies());
                db.SaveChanges();
            }

            List<Species> GenerateDifferentSpecies()
            {
                return new List<Species>()
                {
                    new Species {Name = "Lion" },
                    new Species {Name = "Turtle" },
                    new Species {Name = "Snake" },
                    new Species {Name = "Elephant" },
                    new Species {Name = "Horse" },
                    new Species {Name = "Tiger" },
                    new Species {Name = "Bear" },
                    new Species {Name = "Eagle" },
                    new Species {Name = "Deer" },
                    new Species {Name = "Bull" },
                    new Species {Name = "Giraffe" },
                    new Species {Name = "Lynx" },
                    new Species {Name = "Monkey" },
                    new Species {Name = "Parrot" },
                    new Species {Name = "Hare" },
                    new Species {Name = "Zebra" },
                    new Species {Name = "Penguin" },
                    new Species {Name = "Hippo" },
                };
            }

            List<Animal> GenerateInitialAnimals()
            {
                return new List<Animal>()
                {
                    
                };
            }
        }
    }    
}
