using System.Security.Cryptography;
using System.Text;
using DatingAppAPI.Data;
using DatingAppAPI.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace DatingAppAPI.Controllers
{
    public class AccountController : BaseApiController
    {

        private DataContext _context;

        public AccountController(DataContext context)
        {
            _context = context;
        }
        

        [HttpPost("Register")]
        public async Task<ActionResult<User>> Register(string username, string password)
        {
            using var hmac = new HMACSHA512();
            var user = new User
            {
                UserName = username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
                PasswordSalt = hmac.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
    }
}