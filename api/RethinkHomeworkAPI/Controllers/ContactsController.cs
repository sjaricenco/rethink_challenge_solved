using Microsoft.AspNetCore.Mvc;
using RethinkAPI.Models;
using Newtonsoft.Json;
using System.Runtime.CompilerServices;
using RethinkAPI.Data;
using Microsoft.Extensions.Logging;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RethinkAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private static readonly JsonSerializerSettings _options = new() { NullValueHandling = NullValueHandling.Ignore };
        private readonly ILogger<ContactsController> _logger;
        private readonly IRethinkApiDbRepo _repo;

        public ContactsController(ILogger<ContactsController> logger, IRethinkApiDbRepo repo)
        {
            _logger = logger;
            _repo = repo;
        }

        // GET: api/<UsersController>
        [HttpGet]
        public async Task<IEnumerable<Contact>> Get()
        {
            _logger.LogInformation("Getting all Users");
            var toReturn = ReadUsers();
            return await toReturn;
        }

        private async Task<IEnumerable<Contact>> ReadUsers()
        {
            return _repo.GetAllContacts();
        }

        private async Task SaveUsers(IEnumerable<Contact> users)
        {
            _repo.UpdateContacts(users);
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public async Task<Contact> Get(int id)
        {
            var user = ReadUsers().Result.FirstOrDefault(u => u.ID == id);
            if (user == null) throw new ApplicationException("Contact not found");
            return user;
        }

        // POST api/<UsersController>
        [HttpPost]
        public async Task<IEnumerable<Contact>> Post([FromBody]Contact user)
        {
            string jsonString;
            int userID = 0;
            var userList = ReadUsers().Result.ToList() ?? new List<Contact>();
            if (userList.Any(u => u.FirstName == user.FirstName && u.LastName == user.LastName && u.Email == user.Email))
                throw new ApplicationException("Contact already exists");
            if (userList.Count != 0)
            {
                userID = userList.OrderByDescending(u => u.ID).FirstOrDefault().ID;
            }

            var itemToAdd = new Contact();
            itemToAdd.ID = ++userID;
            itemToAdd.FirstName = user.FirstName;
            itemToAdd.LastName = user.LastName;
            itemToAdd.Email = user.Email;
            userList.Add(itemToAdd);

            await SaveUsers(userList);
            return userList;
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public async Task<IEnumerable<Contact>> Put([FromBody]Contact user, int id)
        {
            var userList = ReadUsers().Result.ToList() ?? new List<Contact>();
            var userToUpdate = userList.FirstOrDefault(u => u.ID == id);
            if (userToUpdate == null) throw new ApplicationException("Contact not found");


            var remainingUsers = userList.Where(u => u.ID != id).ToList() ?? new List<Contact>();

            var updatedUser = new Contact()
            {
                ID = id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email
            };
            remainingUsers.Add(updatedUser);

            await SaveUsers(remainingUsers);
            var toReturn = remainingUsers ?? new List<Contact>();
            return toReturn;
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public async Task<IEnumerable<Contact>> Delete(int id)
        {
            var userList = ReadUsers().Result.ToList() ?? new List<Contact>();
            var userToDelete = userList.FirstOrDefault(u => u.ID == id);
            if (userToDelete == null) throw new ApplicationException("Contact not found");

            var remainingUsers = userList.Where(u => u.ID != id);
            await SaveUsers(remainingUsers);

            if (remainingUsers.ToList().Count == 0) return new List<Contact>();
            return remainingUsers;
        }

    }
}
