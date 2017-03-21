using System;
using System.Runtime.Serialization;

namespace Zoo_Animals_Api.DTO
{
    [DataContract]
    public class AnimalDTO
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public int YearOfBirth { get; set; }
        [DataMember]
        public DateTime Added { get; set; }
    }
}