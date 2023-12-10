using Newtonsoft.Json;
using RethinkAPI.Models;

namespace RethinkAPI.Data
{
    public class RethinkApiDbRepo : IRethinkApiDbRepo
    {
        public RethinkApiDbRepo() { }

        public IEnumerable<Contact> GetAllContacts()
        {
            List<Contact> contacts = new List<Contact>();
            string filePath = System.IO.Path.GetFullPath("contacts.json");
            using StreamReader reader = new(filePath);
            var json = reader.ReadToEnd();
            if (String.IsNullOrEmpty(json)) return contacts;

            contacts = JsonConvert.DeserializeObject<List<Contact>>(json);
            return contacts.OrderBy(u => u.ID);
        }

        public void UpdateContacts(IEnumerable<Contact> contacts)
        {
            var jsonString = JsonConvert.SerializeObject(contacts, Formatting.Indented);
            string filePath = System.IO.Path.GetFullPath("contacts.json");
            System.IO.File.WriteAllText(filePath, jsonString);
        }

    }
}