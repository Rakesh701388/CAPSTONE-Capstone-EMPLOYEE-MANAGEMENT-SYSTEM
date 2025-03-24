using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmployeeManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class SeedInitData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "JoinDate", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 3, 15, 12, 30, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "JoinDate", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 3, 15, 12, 30, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "JoinDate", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 3, 15, 12, 30, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "LeaveRequests",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "EndDate", "StartDate", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 3, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 3, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 3, 15, 12, 30, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 3, 15, 12, 30, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 3, 15, 12, 30, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2024, 3, 15, 12, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 3, 15, 12, 30, 0, 0, DateTimeKind.Unspecified) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "JoinDate", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(9097), new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(8585), new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(9231) });

            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "JoinDate", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(9495), new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(9360), new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(9495) });

            migrationBuilder.UpdateData(
                table: "Employees",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "JoinDate", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(9504), new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(9502), new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(9504) });

            migrationBuilder.UpdateData(
                table: "LeaveRequests",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "EndDate", "StartDate", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 18, 23, 14, 1, 598, DateTimeKind.Local).AddTicks(4653), new DateTime(2025, 3, 23, 23, 14, 1, 598, DateTimeKind.Local).AddTicks(3565), new DateTime(2025, 3, 20, 23, 14, 1, 598, DateTimeKind.Local).AddTicks(395), new DateTime(2025, 3, 18, 23, 14, 1, 598, DateTimeKind.Local).AddTicks(4796) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 18, 23, 14, 1, 596, DateTimeKind.Local).AddTicks(9987), new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(221) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(374), new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(375) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(378), new DateTime(2025, 3, 18, 23, 14, 1, 597, DateTimeKind.Local).AddTicks(379) });
        }
    }
}
