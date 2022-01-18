using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("EventPhotos")]
    public class EventPhoto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        public Event Event { get; set; }
        public int EventId { get; set; }
    }
}