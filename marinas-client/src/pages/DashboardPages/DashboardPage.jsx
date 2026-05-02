import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// ── Rows (mirrored from UsersPage for computed stats) ───────────
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

const totalUsers = rows.length;
const averageAge = (
  rows.reduce((sum, row) => sum + (row.age || 0), 0) /
  rows.filter((row) => row.age).length
).toFixed(1);

// ── Stat card data ──────────────────────────────────────────────
const statCards = [
  { label: "Total Users", value: totalUsers },
  { label: "Average Age", value: averageAge },
];

// ── Bar chart data ──────────────────────────────────────────────
const barSeries = [
  { data: [35, 44, 24, 34], label: "Series 1" },
  { data: [51, 6, 49, 30], label: "Series 2" },
];
const barXAxis = [
  { data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band", label: "Quarters" },
];

// ── Pie chart data ──────────────────────────────────────────────
const pieSeries = [
  {
    data: [
      { id: 0, value: 10, label: "Series A" },
      { id: 1, value: 15, label: "Series B" },
      { id: 2, value: 20, label: "Series C" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
function DashboardPage() {
  return (
    <Box>
      {/* ── Page heading ── */}
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Dashboard
      </Typography>

      {/* ── Stat cards ── */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 4 }}>
        {statCards.map(({ label, value }) => (
          <Card key={label} sx={{ flex: 1, borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6">{label}</Typography>
              <Typography variant="h4">{value}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* ── Charts row ── */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ mb: 4 }}>
        {/* Bar chart */}
        <BarChart
          series={barSeries}
          height={290}
          xAxis={barXAxis}
          title="Quarterly Sales"
        />

        {/* Pie chart */}
        <PieChart series={pieSeries} width={200} height={200} />
      </Stack>

      {/* ── Map ── */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Location Map
      </Typography>
      <Box sx={{ height: 400, width: "100%" }}>
        <MapContainer
          center={[14.604253, 120.994314]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[14.604253, 120.994314]}>
            <Popup>
              National University-Manila <br />
              <p>
                <i>551 F Jhocson St, Sampaloc, Manila, 1008 Metro Manila</i>
              </p>
            </Popup>
          </Marker>
        </MapContainer>
      </Box>
    </Box>
  );
}

export default DashboardPage;
