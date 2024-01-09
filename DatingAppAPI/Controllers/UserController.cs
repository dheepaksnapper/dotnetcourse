using Microsoft.AspNetCore.Mvc;

namespace DatingAppAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        public UserController()
        {

        }

        public ActionResult<string> GetUsers()
        {
            return "This will return a list of users";
        }

    }

}