using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Zoo_Animals_Api.DTO
{
    public class AnimalDTO
    {
        public int Id { get; set; }
        
        public string Name { get; set; }

        public int YearOfBirth { get; set; }

        public DateTime Added { get; set; }
    }
}