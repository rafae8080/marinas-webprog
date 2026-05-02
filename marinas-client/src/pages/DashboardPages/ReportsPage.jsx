import { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
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

// ─────────────────────────────────────────────────────────────────
const ReportsPage = function () {
  const printRef = useRef(null);

  const handlePrint = function () {
    var printContent = printRef.current;
    if (!printContent) return;

    var printWindow = window.open("", "_blank", "width=1200,height=900");
    if (!printWindow) return;

    var exportedAt = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date());

    var cap = function (s) {
      return s ? s.charAt(0).toUpperCase() + s.slice(1) : "-";
    };

    var tableRows = rows
      .map(function (row) {
        var badgeClass = row.isActive ? "badge-active" : "badge-inactive";
        var badgeText = row.isActive ? "Active" : "Inactive";
        return (
          "<tr>" +
          "<td>" +
          row.id +
          "</td>" +
          "<td>" +
          row.firstName +
          " " +
          row.lastName +
          "</td>" +
          "<td>" +
          row.username +
          "</td>" +
          "<td>" +
          row.age +
          "</td>" +
          "<td>" +
          cap(row.gender) +
          "</td>" +
          "<td>" +
          row.contactNumber +
          "</td>" +
          "<td>" +
          row.email +
          "</td>" +
          "<td>" +
          cap(row.role) +
          "</td>" +
          '<td><span class="' +
          badgeClass +
          '">' +
          badgeText +
          "</span></td>" +
          "</tr>"
        );
      })
      .join("");

    var headMarkup = Array.from(
      document.querySelectorAll("style, link[rel='stylesheet']"),
    )
      .map(function (node) {
        return node.outerHTML;
      })
      .join("");

    // Use full innerHTML; DataGrid card is hidden via [data-print-skip] CSS
    var contentHTML = printContent.innerHTML;

    printWindow.document.write(
      "<!DOCTYPE html>" +
        '<html lang="en"><head>' +
        '<meta charset="UTF-8" />' +
        "<title>Report Summary</title>" +
        headMarkup +
        "<style>" +
        "@page { size: A4; margin: 18mm; }" +
        "* { box-sizing: border-box; }" +
        'body { margin: 0; font-family: "Segoe UI", Arial, sans-serif; background: #fff; color: #111827; font-size: 13px; }' +
        /* hide DataGrid card */
        "[data-print-skip] { display: none !important; }" +
        ".rpt-header { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 14px; margin-bottom: 22px; border-bottom: 2px solid #1976d2; }" +
        ".rpt-header h1 { margin: 0 0 4px; font-size: 24px; font-weight: 700; color: #1e3a5f; }" +
        ".rpt-header .subtitle { margin: 0; font-size: 12px; color: #6b7280; max-width: 380px; line-height: 1.5; }" +
        ".rpt-header .meta { text-align: right; font-size: 11px; color: #6b7280; line-height: 1.7; }" +
        ".section-title { margin: 0 0 10px; font-size: 11px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: 0.08em; padding-bottom: 6px; border-bottom: 1px solid #e5e7eb; }" +
        ".charts-wrap { margin-bottom: 24px; }" +
        ".charts-wrap .MuiCard-root, .charts-wrap .MuiPaper-root { box-shadow: none !important; border: 1px solid #e5e7eb !important; border-radius: 8px; break-inside: avoid; margin-bottom: 12px; }" +
        ".charts-wrap .MuiCardContent-root { padding: 16px !important; }" +
        ".charts-wrap svg { max-width: 100%; }" +
        ".charts-wrap .MuiTypography-h6 { font-size: 14px; font-weight: 600; }" +
        ".charts-wrap .MuiTypography-h4 { font-size: 22px; font-weight: 700; }" +
        ".charts-wrap .MuiTypography-overline { font-size: 10px; color: #9ca3af; }" +
        "table { width: 100%; border-collapse: collapse; font-size: 11px; }" +
        "thead tr { background: #1e3a5f; }" +
        "thead th { padding: 8px 9px; text-align: left; font-weight: 600; font-size: 10px; color: #fff; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap; }" +
        "tbody tr:nth-child(even) { background: #f9fafb; }" +
        "tbody td { padding: 6px 9px; border-bottom: 1px solid #e5e7eb; color: #374151; }" +
        ".badge-active { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 10px; font-weight: 600; background: #d1fae5; color: #065f46; border: 1px solid #34d399; }" +
        ".badge-inactive { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 10px; font-weight: 600; background: #f3f4f6; color: #6b7280; border: 1px solid #d1d5db; }" +
        ".rpt-footer { margin-top: 24px; padding-top: 10px; border-top: 1px solid #e5e7eb; font-size: 10px; color: #9ca3af; display: flex; justify-content: space-between; }" +
        "</style></head><body>" +
        '<header class="rpt-header">' +
        "<div><h1>Report Summary</h1>" +
        '<p class="subtitle">Analytics overview for generated reports, category breakdown, and completion performance.</p></div>' +
        '<div class="meta"><strong>Prepared on</strong><br />' +
        exportedAt +
        "<br />" +
        "</header>" +
        '<p class="section-title">Analytics Overview</p>' +
        '<div class="charts-wrap">' +
        contentHTML +
        "</div>" +
        //table
        '<p class="section-title">User Records</p>' +
        "<table><thead><tr>" +
        "<th>ID</th><th>Full Name</th><th>Username</th><th>Age</th><th>Gender</th><th>Contact</th><th>Email</th><th>Role</th><th>Status</th>" +
        "</tr></thead><tbody>" +
        tableRows +
        "</tbody></table>" +
        '<footer class="rpt-footer">' +
        "<span>Marinas System</span>" +
        "</footer>" +
        "</body></html>",
    );

    printWindow.document.close();

    // Wait for the window to fully render (including chart SVGs) before printing
    printWindow.onload = function () {
      printWindow.focus();
      printWindow.print();
    };
  };

  return (
    <Box>
      {/* ── Header row — props moved to sx to avoid React DOM warnings ── */}
      <Stack
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

      {/* ── Printable content ── */}
      <Stack ref={printRef} spacing={3}>
        {/* Stat cards row */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
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
        <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
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

        {/* DataGrid card — hidden in print via data-print-skip */}
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
      </Stack>
    </Box>
  );
};

export default ReportsPage;
