using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IEventRepository
    {
        void Update(Event theEvent);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<EventDto>> GetEventsAsync();
        Task<EventDto> GetEventByIdAsync(int id);
        Task<Event> GetEventAsync(int id);
    }
}