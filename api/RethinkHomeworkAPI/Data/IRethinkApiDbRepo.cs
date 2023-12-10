using RethinkAPI.Models;

namespace RethinkAPI.Data
{
    public interface IRethinkApiDbRepo
    {
        IEnumerable<Contact> GetAllContacts();
        void UpdateContacts(IEnumerable<Contact> contacts);
    }
}