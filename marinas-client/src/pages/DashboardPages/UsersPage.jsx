import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Avatar,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// ── Sample user data ─────────────────────────────────────────────
const rows = [
  {
    id: 1,
    firstName: "Jon",
    lastName: "Snow",
    age: 35,
    role: "Admin",
    status: "Active",
    email: "jon.snow@email.com",
  },
  {
    id: 2,
    firstName: "Cersei",
    lastName: "Lannister",
    age: 42,
    role: "Manager",
    status: "Active",
    email: "cersei.l@email.com",
  },
  {
    id: 3,
    firstName: "Jaime",
    lastName: "Lannister",
    age: 45,
    role: "Editor",
    status: "Inactive",
    email: "jaime.l@email.com",
  },
  {
    id: 4,
    firstName: "Arya",
    lastName: "Stark",
    age: 16,
    role: "Viewer",
    status: "Active",
    email: "arya.stark@email.com",
  },
  {
    id: 5,
    firstName: "Daenerys",
    lastName: "Targaryen",
    age: null,
    role: "Admin",
    status: "Active",
    email: "dany.t@email.com",
  },
  {
    id: 6,
    firstName: null,
    lastName: "Melisandre",
    age: 150,
    role: "Viewer",
    status: "Inactive",
    email: "mel@email.com",
  },
  {
    id: 7,
    firstName: "Ferrara",
    lastName: "Clifford",
    age: 44,
    role: "Editor",
    status: "Active",
    email: "ferrara.c@email.com",
  },
  {
    id: 8,
    firstName: "Rossini",
    lastName: "Frances",
    age: 36,
    role: "Manager",
    status: "Active",
    email: "rossini.f@email.com",
  },
  {
    id: 9,
    firstName: "Harvey",
    lastName: "Roxie",
    age: 65,
    role: "Viewer",
    status: "Inactive",
    email: "harvey.r@email.com",
  },
];

// ── Summary cards ────────────────────────────────────────────────
const totalUsers = rows.length;
const activeUsers = rows.filter((r) => r.status === "Active").length;
const inactiveUsers = rows.filter((r) => r.status === "Inactive").length;

const summaryCards = [
  { label: "Total Users", value: totalUsers, color: "#1976d2" },
  { label: "Active Users", value: activeUsers, color: "#2e7d32" },
  { label: "Inactive Users", value: inactiveUsers, color: "#c62828" },
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
  { field: "firstName", headerName: "First Name", width: 140 },
  { field: "lastName", headerName: "Last Name", width: 140 },
  { field: "email", headerName: "Email", width: 210 },
  { field: "age", headerName: "Age", width: 100 },
  { field: "role", headerName: "Role", width: 110 },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: ({ value }) => (
      <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Chip
          label={value}
          size="small"
          sx={{
            bgcolor: value === "Active" ? "#e8f5e9" : "#ffebee",
            color: value === "Active" ? "#2e7d32" : "#c62828",
            fontWeight: 600,
          }}
        />
      </Box>
    ),
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
