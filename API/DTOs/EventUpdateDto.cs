namespace API.DTOs
{
    public class EventUpdateDto
    {
        public string Title { get; set; }
        public string Purpose { get; set; }
        public string TeamInCharge { get; set; }
        public DateTime PostingDate { get; set; }
        public DateTime DraftDeadline { get; set; }
        public string Specifications { get; set; }
    }
}