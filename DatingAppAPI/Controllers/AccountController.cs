using System.ComponentModel;
using System.Security.Cryptography;
using System.Text;
using DatingAppAPI.Data;
using DatingAppAPI.DTOs;
using DatingAppAPI.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult<User>> Register([FromBody]RegisterDto registerDto) 
        {
            if(await UserExists(registerDto.Username)) return BadRequest("Username taken !");

            using var hmac = new HMACSHA512();
            var user = new User
            {
                UserName = registerDto.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == loginDto.Username);

            if(user == null) return Unauthorized("user not exist !");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computerHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computerHash.Length; i++)
            {
                if(computerHash[i] != user.PasswordHash[i]) return Unauthorized("password mismatch");
            }

            return user;
        }

        private async Task<bool> UserExists(string Username)
        {
            return await _context.Users.AnyAsync(u => u.UserName == Username);
        }
    }
}