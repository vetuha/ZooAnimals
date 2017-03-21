using System.Runtime.Serialization;

namespace Zoo_Animals_Api.DTO
{
    [DataContract]
    public class SpeciesDTO
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Name { get; set; }
    }
}