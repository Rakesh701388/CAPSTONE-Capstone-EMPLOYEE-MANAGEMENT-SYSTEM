using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace EmployeeManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class SeedInitialData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "PasswordHash", "Role", "UpdatedAt", "Username" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 3, 18, 23, 14, 1, 596, DateTimeKind.Local).AddTicks(9987), "hashedpassword1", "HR", new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(221), "admin" },
                    { 2, new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(374), "hashedpassword2", "Manager", new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(375), "manager1" },
                    { 3, new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(378), "hashedpassword3", "Employee", new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(379), "employee1" }
                });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "Id", "Address", "CreatedAt", "Department", "Email", "FirstName", "IsActive", "JoinDate", "LastName", "ManagerId", "Phone", "Position", "TerminationDate", "UpdatedAt", "UserId" },
                values: new object[,]
                {
                    { 1, "123 Street", new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(9097), "HR", "john.doe@example.com", "John", true, new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(8585), "Doe", null, "1234567890", "HR Manager", null, new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(9231), 1 },
                    { 2, "456 Avenue", new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(9495), "IT", "alice.smith@example.com", "Alice", true, new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(9360), "Smith", 1, "0987654321", "IT Manager", null, new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(9495), 2 },
                    { 3, "789 Road", new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(9504), "Finance", "bob.brown@example.com", "Bob", true, new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(9502), "Brown", 2, "1122334455", "Accountant", null, new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(9504), 3 }
                });

            migrationBuilder.InsertData(
                table: "LeaveRequests",
                columns: new[] { "Id", "ApprovedById", "Comments", "CreatedAt", "EmployeeId", "EndDate", "LeaveType", "Reason", "StartDate", "Status", "UpdatedAt" },
                values: new object[] { 1, 2, null, new DateTime(2025, 3, 18, 23, 14, 1, 598, DateTimeKind.Local).AddTicks(4653), 3, new DateTime(2025, 3, 23, 23, 14, 1, 598, DateTimeKind.Local).AddTicks(3565), "Vacation", "Family Trip", new DateTime(2025, 3, 20, 23, 14, 1, 598, DateTimeKind.Local).AddTicks(395), "Pending", new DateTime(2025, 3, 18, 23, 14, 1, 598, DateTimeKind.Local).AddTicks(4796) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "LeaveRequests",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
