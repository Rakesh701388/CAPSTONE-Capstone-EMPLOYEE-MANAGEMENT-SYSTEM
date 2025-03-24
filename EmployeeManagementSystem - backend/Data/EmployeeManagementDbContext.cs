using EmployeeManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Data
{
    public class EmployeeManagementDbContext:DbContext
    {
        public EmployeeManagementDbContext(DbContextOptions<EmployeeManagementDbContext> options)
           : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Employee-User (One-to-One Relationship)
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.User)
                .WithOne(u => u.Employee)
                .HasForeignKey<Employee>(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade); // Deleting a User deletes associated Employee

            // Employee-Manager (Self-Referencing One-to-Many)
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Manager)
                .WithMany(e => e.ManagedEmployees)
                .HasForeignKey(e => e.ManagerId)
                .OnDelete(DeleteBehavior.Restrict); // Prevents accidental deletion

            // Employee-LeaveRequest (One-to-Many)
            modelBuilder.Entity<LeaveRequest>()
                .HasOne(lr => lr.Employee)
                .WithMany(e => e.LeaveRequests)
                .HasForeignKey(lr => lr.EmployeeId)
                .OnDelete(DeleteBehavior.Cascade); // Delete all leave requests when an employee is deleted

            // LeaveRequest-ApprovedBy (Self-Referencing Employee Relationship)
            modelBuilder.Entity<LeaveRequest>()
                .HasOne(lr => lr.ApprovedBy)
                .WithMany()
                .HasForeignKey(lr => lr.ApprovedById)
                .OnDelete(DeleteBehavior.Restrict); // Prevent deletion of approvers affecting leave requests

            // Hardcoded DateTime Values
            DateTime createdAt = new DateTime(2024, 3, 15, 12, 0, 0);
            DateTime updatedAt = new DateTime(2024, 3, 15, 12, 30, 0);

            // ✅ Seeding Users
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Username = "admin", PasswordHash = "hashedpassword1", Role = "HR", CreatedAt = createdAt, UpdatedAt = updatedAt },
                new User { Id = 2, Username = "manager1", PasswordHash = "hashedpassword2", Role = "Manager", CreatedAt = createdAt, UpdatedAt = updatedAt },
                new User { Id = 3, Username = "employee1", PasswordHash = "hashedpassword3", Role = "Employee", CreatedAt = createdAt, UpdatedAt = updatedAt }
            );

            // ✅ Seeding Employees
            modelBuilder.Entity<Employee>().HasData(
                new Employee { Id = 1, FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", Phone = "1234567890", Address = "123 Street", Department = "HR", Position = "HR Manager", JoinDate = createdAt, UserId = 1, IsActive = true, CreatedAt = createdAt, UpdatedAt = updatedAt },
                new Employee { Id = 2, FirstName = "Alice", LastName = "Smith", Email = "alice.smith@example.com", Phone = "0987654321", Address = "456 Avenue", Department = "IT", Position = "IT Manager", JoinDate = createdAt, UserId = 2, ManagerId = 1, IsActive = true, CreatedAt = createdAt, UpdatedAt = updatedAt },
                new Employee { Id = 3, FirstName = "Bob", LastName = "Brown", Email = "bob.brown@example.com", Phone = "1122334455", Address = "789 Road", Department = "Finance", Position = "Accountant", JoinDate = createdAt, UserId = 3, ManagerId = 2, IsActive = true, CreatedAt = createdAt, UpdatedAt = updatedAt }
            );

            // ✅ Seeding LeaveRequests
            modelBuilder.Entity<LeaveRequest>().HasData(
                new LeaveRequest { Id = 1, EmployeeId = 3, StartDate = new DateTime(2024, 3, 20), EndDate = new DateTime(2024, 3, 23), LeaveType = "Vacation", Reason = "Family Trip", Status = "Pending", ApprovedById = 2, CreatedAt = createdAt, UpdatedAt = updatedAt }
            );
        }




    }
}
