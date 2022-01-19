using System.Security.Claims;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class EventsController : BaseApiController
    {
        private readonly IEventRepository _eventRepository;
        private readonly IMapper _mapper;

        public EventsController(IEventRepository eventRepository, IMapper mapper)
        {
            _eventRepository = eventRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventDto>>> GetEvents()
        {
            var theEvents = await _eventRepository.GetEventsAsync();

            var eventsToReturn = _mapper.Map<IEnumerable<EventDto>>(theEvents);

            return Ok(eventsToReturn);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EventDto>> GetEvent(int id) 
        {
            return await _eventRepository.GetEventByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEvent(EventUpdateDto eventUpdateDto, int id)
        {
            var theEvent = await _eventRepository.GetEventAsync(id);

            _mapper.Map(eventUpdateDto, theEvent);

            _eventRepository.Update(theEvent);

            if (await _eventRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update event");       
        }
    }
}