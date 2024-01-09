using DatingAppAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace DatingAppAPI.Data;


public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {

    }

    public DbSet<User> Users { get; set; }
}