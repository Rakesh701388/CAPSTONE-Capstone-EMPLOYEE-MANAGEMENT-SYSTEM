﻿// <auto-generated />
using System;
using EmployeeManagementSystem.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EmployeeManagementSystem.Migrations
{
    [DbContext(typeof(EmployeeManagementDbContext))]
    [Migration("20250324024104_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("EmployeeManagementSystem.Models.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Department")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<DateTime>("JoinDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ManagerId")
                        .HasColumnType("int");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Position")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("TerminationDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ManagerId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Employees");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "123 Street",
                            CreatedAt = new DateTime(2024, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified),
                            Department = "HR",
                            Email = "john.doe@example.com",
                            FirstName = "John",
                            IsActive = true,
                            JoinDate = new DateTime(2024, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified),
                            LastName = "Doe",
                            Phone = "1234567890",
                            Position = "HR Manager",
                            UpdatedAt = new DateTime(2024, 3, 15, 12, 30, 0, 0, DateTimeKind.Unspecified),
                            UserId = 1
                        },
                        new
                        {
                            Id = 2,
                            Address = "456 Avenue",
                            CreatedAt = new DateTime(2024, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified),
                            Department = "IT",
                            Email = "alice.smith@example.com",
                            FirstName = "Alice",
                            IsActive = true,
                            JoinDate = new DateTime(2024, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified),
                            LastName = "Smith",
                            ManagerId = 1,
                            Phone = "0987654321",
                            Position = "IT Manager",
                            UpdatedAt = new DateTime(2024, 3, 15, 12, 30, 0, 0, DateTimeKind.Unspecified),
                            UserId = 2
                        },
                        new
                        {
                            Id = 3,
                            Address = "789 Road",
                            CreatedAt = new DateTime(2024, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified),
                            Department = "Finance",
                            Email = "bob.brown@example.com",
                            FirstName = "Bob",
                            IsActive = true,
                            JoinDate = new DateTime(2024, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified),
                            LastName = "Brown",
                            ManagerId = 2,
                            Phone = "1122334455",
                            Position = "Accountant",
                            UpdatedAt = new DateTime(2024, 3, 15, 12, 30, 0, 0, DateTimeKind.Unspecified),
                            UserId = 3
                        });
                });

            modelBuilder.Entity("EmployeeManagementSystem.Models.LeaveRequest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("ApprovedById")
                        .HasColumnType("int");

                    b.Property<string>("Comments")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("LeaveType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Reason")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("ApprovedById");

                    b.HasIndex("EmployeeId");

                    b.ToTable("LeaveRequests");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ApprovedById = 2,
                            CreatedAt = new DateTime(2024, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified),
                            EmployeeId = 3,
                            EndDate = new DateTime(2024, 3, 23, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            LeaveType = "Vacation",
                            Reason = "Family Trip",
                            StartDate = new DateTime(2024, 3, 20, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Status = "Pending",
                            UpdatedAt = new DateTime(2024, 3, 15, 12, 30, 0, 0, DateTimeKind.Unspecified)
                        });
                });

            modelBuilder.Entity("EmployeeManagementSystem.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedAt = new DateTime(2024, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified),
                            PasswordHash = "hashedpassword1",
                            Role = "HR",
                            UpdatedAt = new DateTime(2024, 3, 15, 12, 30, 0, 0, DateTimeKind.Unspecified),
                            Username = "admin"
                        },
                        new
                        {
                            Id = 2,
                            CreatedAt = new DateTime(2024, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified),
                            PasswordHash = "hashedpassword2",
                            Role = "Manager",
                            UpdatedAt = new DateTime(2024, 3, 15, 12, 30, 0, 0, DateTimeKind.Unspecified),
                            Username = "manager1"
                        },
                        new
                        {
                            Id = 3,
                            CreatedAt = new DateTime(2024, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified),
                            PasswordHash = "hashedpassword3",
                            Role = "Employee",
                            UpdatedAt = new DateTime(2024, 3, 15, 12, 30, 0, 0, DateTimeKind.Unspecified),
                            Username = "employee1"
                        });
                });

            modelBuilder.Entity("EmployeeManagementSystem.Models.Employee", b =>
                {
                    b.HasOne("EmployeeManagementSystem.Models.Employee", "Manager")
                        .WithMany("ManagedEmployees")
                        .HasForeignKey("ManagerId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("EmployeeManagementSystem.Models.User", "User")
                        .WithOne("Employee")
                        .HasForeignKey("EmployeeManagementSystem.Models.Employee", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Manager");

                    b.Navigation("User");
                });

            modelBuilder.Entity("EmployeeManagementSystem.Models.LeaveRequest", b =>
                {
                    b.HasOne("EmployeeManagementSystem.Models.Employee", "ApprovedBy")
                        .WithMany()
                        .HasForeignKey("ApprovedById")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("EmployeeManagementSystem.Models.Employee", "Employee")
                        .WithMany("LeaveRequests")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ApprovedBy");

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("EmployeeManagementSystem.Models.Employee", b =>
                {
                    b.Navigation("LeaveRequests");

                    b.Navigation("ManagedEmployees");
                });

            modelBuilder.Entity("EmployeeManagementSystem.Models.User", b =>
                {
                    b.Navigation("Employee")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
