using API.DTOs;
using API.Entities;
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
        private readonly IPhotoService _photoService;

        public EventsController(IEventRepository eventRepository, IMapper mapper, IPhotoService photoService)
        {
            _eventRepository = eventRepository;
            _mapper = mapper;
            _photoService = photoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventDto>>> GetEvents()
        {
            var theEvents = await _eventRepository.GetEventsAsync();

            var eventsToReturn = _mapper.Map<IEnumerable<EventDto>>(theEvents);

            return Ok(eventsToReturn);
        }


        [HttpGet("{code}")]
        public async Task<ActionResult<EventDto>> GetEvent(string code) 
        {
            return await _eventRepository.GetEventAsync(code);
        }

        [HttpPut("{code}")]
        public async Task<ActionResult> UpdateEvent(EventUpdateDto eventUpdateDto, string code)
        {
            var theEvent = await _eventRepository.GetEventByEventCodeAsync(code);

            _mapper.Map(eventUpdateDto, theEvent);

            _eventRepository.Update(theEvent);

            if (await _eventRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update event");       
        }

        // [HttpPost("add-photo")]
        // public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file, string code)
        // {
        //     var theEvent = await _eventRepository.GetEventByEventCodeAsync(code);

        //     var result = await _photoService.AddPhotoAsync(file);

        //     if (result.Error != null) return BadRequest(result.Error.Message);

        //     var photo = new EventPhoto 
        //     {
        //         Url = result.SecureUrl.AbsoluteUri,
        //         PublicId = result.PublicId
        //     };

        //     if (user.Photos.Count == 0)
        //     {
        //         photo.IsMain = true;
        //     }

        //     user.Photos.Add(photo);

        //     if (await _userRepository.SaveAllAsync())
        //     {
        //         return CreatedAtRoute("GetUser", new {username = user.UserName}, _mapper.Map<PhotoDto>(photo));
        //     }

        //     return BadRequest("Problem adding photo");
        // }
    }
}