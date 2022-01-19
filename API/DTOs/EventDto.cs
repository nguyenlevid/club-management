namespace API.DTOs
{
    public class EventDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string EventCode { get; set; }
        public string PhotoUrl { get; set; }
        public string Purpose { get; set; }
        public string TeamInCharge { get; set; }
        public DateTime PostingDate { get; set; }
        public DateTime DraftDeadline { get; set; }
        public string Specifications { get; set; }
        public ICollection<EventPhotoDto> Photos { get; set; }
    }
}