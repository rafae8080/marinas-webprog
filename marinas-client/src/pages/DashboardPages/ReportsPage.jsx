import { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import GlobalStyles from "@mui/material/GlobalStyles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";

// ── Chart data ──────────────────────────────────────────────────
const generatedData = [18, 24, 20, 27];
const completedData = [12, 19, 17, 23];
const totalGenerated = generatedData.reduce(function (a, b) {
  return a + b;
}, 0);
const totalCompleted = completedData.reduce(function (a, b) {
  return a + b;
}, 0);
const completionRate = Math.round((totalCompleted / totalGenerated) * 100);

const statCards = [
  { label: "Total Generated", value: totalGenerated, accent: false },
  { label: "Total Completed", value: totalCompleted, accent: false },
  { label: "Completion Rate", value: completionRate + "%", accent: true },
  { label: "Report Categories", value: 4, accent: false },
];

// ── DataGrid columns ────────────────────────────────────────────
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "fullName",
    headerName: "Full Name",
    flex: 1,
    minWidth: 170,
    valueGetter: function (value, row) {
      return (row.firstName + " " + row.lastName).trim();
    },
  },
  { field: "username", headerName: "Username", width: 150 },
  { field: "age", headerName: "Age", width: 90 },
  {
    field: "gender",
    headerName: "Gender",
    minWidth: 110,
    valueFormatter: function (value) {
      return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
    },
  },
  { field: "contactNumber", headerName: "Contact Number", minWidth: 160 },
  { field: "email", headerName: "Email", flex: 1.1, minWidth: 220 },
  { field: "role", headerName: "Role", minWidth: 120 },
  {
    field: "status",
    headerName: "Status",
    minWidth: 120,
    sortable: false,
    filterable: false,
    renderCell: function ({ row }) {
      return (
        <Chip
          size="small"
          label={row.isActive ? "Active" : "Inactive"}
          color={row.isActive ? "success" : "default"}
          variant={row.isActive ? "filled" : "outlined"}
        />
      );
    },
  },
];

// ── Sample rows (mirroring users.json) ─────────────────────────
const rows = [
  {
    id: 1,
    firstName: "Alicia",
    lastName: "Reyes",
    age: 29,
    gender: "female",
    contactNumber: "09171234567",
    email: "alicia.reyes@robles.dev",
    role: "admin",
    username: "aliciareyes",
    isActive: true,
  },
  {
    id: 2,
    firstName: "Marco",
    lastName: "Santos",
    age: 31,
    gender: "male",
    contactNumber: "09182345678",
    email: "marco.santos@robles.dev",
    role: "viewer",
    username: "marcosantos",
    isActive: true,
  },
  {
    id: 3,
    firstName: "Bianca",
    lastName: "Cruz",
    age: 26,
    gender: "female",
    contactNumber: "09193456789",
    email: "bianca.cruz@robles.dev",
    role: "editor",
    username: "biancacruz",
    isActive: false,
  },
  {
    id: 4,
    firstName: "Nathan",
    lastName: "Diaz",
    age: 34,
    gender: "male",
    contactNumber: "09214567890",
    email: "nathan.diaz@robles.dev",
    role: "viewer",
    username: "nathandiaz",
    isActive: true,
  },
  {
    id: 5,
    firstName: "Jasmine",
    lastName: "Garcia",
    age: 28,
    gender: "female",
    contactNumber: "09225678901",
    email: "jasmine.garcia@robles.dev",
    role: "editor",
    username: "jasminegarcia",
    isActive: false,
  },
  {
    id: 6,
    firstName: "Ethan",
    lastName: "Lopez",
    age: 33,
    gender: "male",
    contactNumber: "09236789012",
    email: "ethan.lopez@robles.dev",
    role: "viewer",
    username: "ethanlopez",
    isActive: true,
  },
];

// ── Print table styles ──────────────────────────────────────────
const cap = function (s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : "-";
};
const ptTh = {
  padding: "8px 9px",
  textAlign: "left",
  fontWeight: 600,
  fontSize: "10px",
  color: "#fff",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  whiteSpace: "nowrap",
};
const ptTd = {
  padding: "6px 9px",
  borderBottom: "1px solid #e5e7eb",
  color: "#374151",
};
const ptBadgeActive = {
  display: "inline-block",
  padding: "2px 8px",
  borderRadius: "999px",
  fontSize: "10px",
  fontWeight: 600,
  background: "#d1fae5",
  color: "#065f46",
  border: "1px solid #34d399",
};
const ptBadgeInactive = {
  display: "inline-block",
  padding: "2px 8px",
  borderRadius: "999px",
  fontSize: "10px",
  fontWeight: 600,
  background: "#f3f4f6",
  color: "#6b7280",
  border: "1px solid #d1d5db",
};

// ── @media print CSS ────────────────────────────────────────────
const printStyles = `
  @page { size: A4; margin: 18mm; }

  @media print {
    body { background: white !important; }
    .MuiAppBar-root,
    .MuiDrawer-root { display: none !important; }
    main > div:first-child { display: none !important; }
    main { padding-top: 0 !important; }
    [data-print-skip] { display: none !important; }
    [data-print-header] {
      display: flex !important;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
      padding-bottom: 14px;
      border-bottom: 2px solid #1976d2;
    }
    [data-print-only] { display: block !important; }
    [data-print-row] {
      display: flex !important;
      flex-direction: row !important;
      flex-wrap: nowrap !important;
      gap: 12px !important;
    }
    [data-print-row] > * { flex: 1 1 0 !important; min-width: 0 !important; }
    .MuiCard-root {
      box-shadow: none !important;
      border: 1px solid #e5e7eb !important;
      break-inside: avoid;
      margin-bottom: 12px !important;
    }
    * {
      print-color-adjust: exact !important;
      -webkit-print-color-adjust: exact !important;
    }
  }
`;

// ─────────────────────────────────────────────────────────────────
const ReportsPage = function () {
  const exportDateRef = useRef(null);

  const handlePrint = function () {
    if (exportDateRef.current) {
      exportDateRef.current.textContent = new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
        timeStyle: "short",
      }).format(new Date());
    }
    window.print();
  };

  return (
    <Box>
      <GlobalStyles styles={printStyles} />

      {/* ── Print-only report header ── */}
      <Box data-print-header sx={{ display: "none" }}>
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#1e3a5f", mb: 0.5 }}
          >
            Report Summary
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Analytics overview for generated reports, category breakdown, and
            completion performance.
          </Typography>
        </Box>
        <Box
          sx={{ textAlign: "right", fontSize: "11px", color: "#6b7280", lineHeight: 1.7 }}
        >
          <strong>Prepared on</strong>
          <br />
          <span ref={exportDateRef} />
        </Box>
      </Box>

      {/* ── Header row — hidden in print ── */}
      <Stack
        data-print-skip
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{
          mb: 4,
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Reports
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Analytics overview for generated reports, category breakdown, and
            current completion performance.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap" }}>
          <Button variant="contained">Generate</Button>
          <Button variant="outlined" onClick={handlePrint}>
            Export
          </Button>
          <Button variant="outlined">Filter</Button>
        </Stack>
      </Stack>

      {/* ── Content ── */}
      <Stack spacing={3}>
        {/* Stat cards row */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} data-print-row>
          {statCards.map(function ({ label, value, accent }) {
            return (
              <Card key={label} sx={{ flex: 1 }}>
                <CardContent sx={{ py: 2.5 }}>
                  <Typography
                    variant="overline"
                    color="text.secondary"
                    display="block"
                    gutterBottom
                  >
                    {label}
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color={accent ? "primary" : "text.primary"}
                  >
                    {value}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Stack>

        {/* Bar chart card */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Monthly Report Output
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              This chart compares how many reports were generated and how many
              were completed across the last four months.
            </Typography>
            <BarChart
              series={[
                { data: generatedData, label: "Generated" },
                { data: completedData, label: "Completed" },
              ]}
              height={300}
              xAxis={[
                {
                  data: ["January", "February", "March", "April"],
                  scaleType: "band",
                  label: "Months",
                },
              ]}
            />
          </CardContent>
        </Card>

        {/* Pie + Gauge row */}
        <Stack direction={{ xs: "column", lg: "row" }} spacing={3} data-print-row>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Report Category Share
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Distribution of report requests by category for the current
                reporting period.
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 14, label: "Sales" },
                        { id: 1, value: 10, label: "Users" },
                        { id: 2, value: 8, label: "Inventory" },
                        { id: 3, value: 6, label: "Finance" },
                      ],
                    },
                  ]}
                  width={280}
                  height={220}
                />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Completion Rate
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Current percentage of reports completed on time based on the
                latest reporting cycle.
              </Typography>
              <Box
                sx={{
                  minHeight: 220,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Gauge width={180} height={180} value={completionRate} />
              </Box>
            </CardContent>
          </Card>
        </Stack>

        {/* DataGrid card — hidden in print */}
        <Card data-print-skip="true">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              User Records
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <DataGrid
              rows={rows}
              columns={columns}
              experimentalFeatures={{ newEditingApi: true }}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{
                minWidth: 0,
                "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
                  outline: "none",
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Print-only user table */}
        <Box data-print-only sx={{ display: "none", mt: 1 }}>
          <Typography
            sx={{
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#374151",
              borderBottom: "1px solid #e5e7eb",
              pb: "6px",
              mb: 1,
            }}
          >
            User Records
          </Typography>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px" }}
          >
            <thead>
              <tr style={{ background: "#1e3a5f" }}>
                {[
                  "ID",
                  "Full Name",
                  "Username",
                  "Age",
                  "Gender",
                  "Contact",
                  "Email",
                  "Role",
                  "Status",
                ].map(function (h) {
                  return (
                    <th key={h} style={ptTh}>
                      {h}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map(function (row, i) {
                return (
                  <tr
                    key={row.id}
                    style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb" }}
                  >
                    <td style={ptTd}>{row.id}</td>
                    <td style={ptTd}>
                      {row.firstName} {row.lastName}
                    </td>
                    <td style={ptTd}>{row.username}</td>
                    <td style={ptTd}>{row.age}</td>
                    <td style={ptTd}>{cap(row.gender)}</td>
                    <td style={ptTd}>{row.contactNumber}</td>
                    <td style={ptTd}>{row.email}</td>
                    <td style={ptTd}>{cap(row.role)}</td>
                    <td style={ptTd}>
                      <span style={row.isActive ? ptBadgeActive : ptBadgeInactive}>
                        {row.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>

        {/* Print-only footer */}
        <Box
          data-print-only
          sx={{
            display: "none",
            mt: 3,
            pt: 1,
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <Typography sx={{ fontSize: "10px", color: "#9ca3af" }}>
            Marinas System
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default ReportsPage;
