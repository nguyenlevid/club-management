using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class EventRepository : IEventRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public EventRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<EventDto> GetEventAsync(string code)
        {
            return await _context.Events 
                            .Where(x => x.EventCode == code)
                            .ProjectTo<EventDto>(_mapper.ConfigurationProvider)
                            .SingleOrDefaultAsync();
        }

        public async Task<Event> GetEventByEventCodeAsync(string code)
        {
            return await _context.Events    
                        .Include(x => x.Photos)
                        .SingleOrDefaultAsync(x => x.EventCode == code);
        }

        public async Task<EventDto> GetEventByIdAsync(int id)
        {
            return await _context.Events 
                            .Where(x => x.Id == id)
                            .ProjectTo<EventDto>(_mapper.ConfigurationProvider)
                            .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<EventDto>> GetEventsAsync()
        {
            return await _context.Events
                            .ProjectTo<EventDto>(_mapper.ConfigurationProvider)
                            .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Event theEvent)
        {
            _context.Entry(theEvent).State = EntityState.Modified;
        }
    }
}