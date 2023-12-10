using AutoFixture;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Moq;
using RethinkAPI.Controllers;
using RethinkAPI.Data;
using RethinkAPI.Models;

namespace RethinkHomeworkAPI.Tests
{
    [TestClass]
    public class ContactsControllerTest
    {
        private Fixture _fixture;
        private ContactsController _controller;
        private Mock<IRethinkApiDbRepo> _repo;
        private ILogger<ContactsController> _logger;

        public ContactsControllerTest()
        {
            _fixture = new Fixture();
            _repo = new Mock<IRethinkApiDbRepo>();
        }

        [TestMethod]
        public void Test_Get_Contacts_Returns_Five()
        {
            var contactsList = _fixture.CreateMany<Contact>(5).ToList();
            _repo.Setup(repo => repo.GetAllContacts()).Returns(contactsList);
            var logger = CreateLogger();
            _controller = new ContactsController(logger, _repo.Object);

            var result = _controller.Get();
            Assert.AreEqual(result.Result.ToList().Count, 5);
        }

        [TestMethod]
        public void Test_Get_Contact_By_Id_Contact_Found()
        {
            Contact contact = new Contact
            {
                ID = 5,
                FirstName = "John",
                LastName = "Smith",
                Email = "jsmith@example.com"
            };

            _repo.Setup(repo => repo.GetAllContacts()).Returns(new List<Contact> { contact });
            var logger = CreateLogger();
            _controller = new ContactsController(logger, _repo.Object);

            var result = _controller.Get(5);
            Assert.IsNotNull(result);
        }


        [TestMethod]
        [ExpectedException(typeof(ApplicationException))]
        public async Task Test_Get_Contact_By_Id_Contact_Not_Found()
        {
            Contact contact = new Contact
            {
                ID = 5,
                FirstName = "John",
                LastName = "Smith",
                Email = "jsmith@example.com"
            };

            _repo.Setup(repo => repo.GetAllContacts()).Returns(new List<Contact> { contact });
            var logger = CreateLogger();
            _controller = new ContactsController(logger, _repo.Object);

            await _controller.Get(1);
        }



        private ILogger<ContactsController> CreateLogger()
        {
            var serviceProvider = new ServiceCollection()
                .AddLogging()
                .BuildServiceProvider();

            var factory = serviceProvider.GetService<ILoggerFactory>();
            return factory.CreateLogger<ContactsController>();
        }

     
}