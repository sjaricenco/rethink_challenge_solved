using System.ComponentModel.DataAnnotations;

namespace RethinkAPI.Models
{
    public class Contact
    {
        public int ID { get; set; }
        [Required]
        public string? FirstName { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string? Email { get; set; }
    }

}
