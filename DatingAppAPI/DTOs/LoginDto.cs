using Microsoft.EntityFrameworkCore.Diagnostics;

namespace DatingAppAPI.DTOs
{
    public class LoginDto
    {
        public string Username { get; set; }

        public string Password { get; set; }
    }
}