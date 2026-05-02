import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Avatar,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// ── Sample user data ─────────────────────────────────────────────
const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

// ── Summary cards ────────────────────────────────────────────────
const totalUsers = rows.length;

const summaryCards = [
  { label: "Total Users", value: totalUsers, color: "#1976d2" },
];

// ── DataGrid columns ─────────────────────────────────────────────
const columns = [
  {
    field: "avatar",
    headerName: "",
    width: 56,
    sortable: false,
    renderCell: ({ row }) => {
      const initials = `${row.firstName?.[0] ?? ""}${row.lastName?.[0] ?? ""}`;
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Avatar
            sx={{ width: 34, height: 34, fontSize: 13, bgcolor: "#1976d2" }}
          >
            {initials}
          </Avatar>
        </Box>
      );
    },
  },
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "age", headerName: "Age", type: "number", width: 110 },
  {
    field: "fullName",
    headerName: "Full Name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

// ─────────────────────────────────────────────────────────────────
function UsersPage() {
  return (
    <Box>
      {/* ── Header ── */}
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Users
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Directory of all registered users and their details.
      </Typography>

      {/* ── Summary cards ── */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 4 }}>
        {summaryCards.map(({ label, value, color }) => (
          <Card key={label} sx={{ flex: 1, borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={500}
              >
                {label}
              </Typography>
              <Typography variant="h3" fontWeight={700} sx={{ color, mt: 0.5 }}>
                {value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* ── Table ── */}
      <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            User List
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ height: 560, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: { paginationModel: { pageSize: 9 } },
              }}
              pageSizeOptions={[9]}
              hideFooterSelectedRowCount
              checkboxSelection
              disableRowSelectionOnClick
              rowHeight={56}
              sx={{
                border: "none",
                "& .MuiDataGrid-cell": {
                  display: "flex",
                  alignItems: "center",
                },
                "& .MuiDataGrid-columnHeaders": {
                  bgcolor: "#f5f5f5",
                  fontWeight: 700,
                },
                "& .MuiDataGrid-row:hover": {
                  bgcolor: "#f0f7ff",
                },
                "& .MuiTablePagination-selectLabel": { display: "none" },
                "& .MuiInputBase-root.MuiTablePagination-input": {
                  display: "none",
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UsersPage;
