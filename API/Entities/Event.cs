using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Event
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Purpose { get; set; }
        public string TeamInCharge { get; set; }
        public DateTime PostingDate { get; set; }
        public DateTime DraftDeadline { get; set; }
        public string Specifications { get; set; }
        public ICollection<EventPhoto> Photos { get; set; }

    }
}