namespace API.Controllers;

    public class AccountController : BaseApiController
    {
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public readonly UserManager<AppUser> _userManager;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, 
            ITokenService tokenService, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) 
            {
                return BadRequest("Username is taken");
            }

            var user = _mapper.Map<AppUser>(registerDto);
            
            user.UserName = registerDto.Username.ToLower();
           
            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                KnownAs = user.KnownAs,
                Gender = user.Gender,
                Team = user.Team,
                Email = user.Email,
            };
        }

        [HttpPost("reset-password")]
        [AllowAnonymous]
        public async Task<ActionResult<string>> ResetPassword(ResetPasswordDto resetPasswordDto, [FromQuery] string token)
        {
            var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
            if (user == null) return BadRequest("No user with this email exists");

            var result = await _userManager.ResetPasswordAsync(user, token,
                resetPasswordDto.Password);
            
            if (!result.Succeeded) return BadRequest("Problem resetting password");
            
            return Ok("Password reset successfully");
        }

        [HttpGet("reset-password")]
        public async Task<ActionResult<string>> GetResetPasswordToken()
        {
            var user = await _userManager.FindByNameAsync(User.GetUsername());
            if (user == null) return NotFound();
            
            return await _userManager.GeneratePasswordResetTokenAsync(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid username");

            var result = await _signInManager
                .CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized();

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                KnownAs = user.KnownAs,
                Gender = user.Gender,
                Team = user.Team,
                Email = user.Email,
            };
        }

        private async Task<bool> UserExists(string username) 
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
