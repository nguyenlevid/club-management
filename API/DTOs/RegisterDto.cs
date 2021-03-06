

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required] public string Username { get; set; }

        [Required] public string KnownAs { get; set; }

        [Required] public DateTime DateOfBirth { get; set; }

        [Required] public string Email { get; set; }

        [Required] public string Gender { get; set; }

        [Required] public string Team { get; set; }

        [Required]
        [StringLength(32, MinimumLength=6)]
        public string Password { get; set; } = "Pa$$w0rd";
    }
}