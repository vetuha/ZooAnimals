using System;

namespace Zoo_Animals_DAL.Entitites
{
    public class Animal
    {
        public int Id { get; set; }

        public Species Species { get; set; }

        public string Name { get; set; }

        public int YearOfBirth { get; set; }

        public DateTime Added { get; set; }
    }
}
