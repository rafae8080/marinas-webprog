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
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WifiIcon from "@mui/icons-material/Wifi";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// ── Stat card data ──────────────────────────────────────────────
const statCards = [
  {
    label: "Total Users",
    value: "9",
    change: "+12%",
    up: true,
    icon: PeopleAltIcon,
    color: "#1976d2",
    bg: "#e3f2fd",
  },
  {
    label: "Revenue / Sales",
    value: "₱184,200",
    change: "+8.4%",
    up: true,
    icon: AttachMoneyIcon,
    color: "#2e7d32",
    bg: "#e8f5e9",
  },
  {
    label: "Active Sessions",
    value: "142",
    change: "-3.1%",
    up: false,
    icon: WifiIcon,
    color: "#ed6c02",
    bg: "#fff3e0",
  },
];

// ── Bar chart data ──────────────────────────────────────────────
const barSeries = [
  { data: [35, 44, 24, 34], label: "2023" },
  { data: [51, 6, 49, 30], label: "2024" },
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
    innerRadius: 40,
    outerRadius: 80,
    paddingAngle: 3,
    cornerRadius: 4,
  },
];

// ─────────────────────────────────────────────────────────────────
function DashboardPage() {
  return (
    <Box>
      {/* ── Page heading ── */}
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Overview
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Welcome back! Here's what's happening today.
      </Typography>

      {/* ── Stat cards ── */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 4 }}>
        {statCards.map(
          ({ label, value, change, up, icon: Icon, color, bg }) => (
            <Card key={label} sx={{ flex: 1, borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Stack
                  direction="row"
                  sx={{ alignItems: "center", justifyContent: "space-between" }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={500}
                    >
                      {label}
                    </Typography>
                    <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5 }}>
                      {value}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ mt: 0.5, alignItems: "center" }}
                    >
                      {up ? (
                        <TrendingUpIcon
                          sx={{ fontSize: 16, color: "success.main" }}
                        />
                      ) : (
                        <TrendingDownIcon
                          sx={{ fontSize: 16, color: "error.main" }}
                        />
                      )}
                      <Typography
                        variant="caption"
                        sx={{
                          color: up ? "success.main" : "error.main",
                          fontWeight: 600,
                        }}
                      >
                        {change} vs last month
                      </Typography>
                    </Stack>
                  </Box>
                  <Avatar sx={{ bgcolor: bg, width: 52, height: 52 }}>
                    <Icon sx={{ color, fontSize: 28 }} />
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          ),
        )}
      </Stack>

      {/* ── Charts row ── */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }}>
        {/* Bar chart */}
        <Card sx={{ flex: 2, borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Quarterly Sales
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <BarChart
              series={barSeries}
              height={260}
              xAxis={barXAxis}
              margin={{ top: 10, bottom: 40, left: 40, right: 10 }}
            />
          </CardContent>
        </Card>

        {/* Pie chart */}
        <Card sx={{ flex: 1, borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Sales Breakdown
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
              <PieChart
                series={pieSeries}
                width={240}
                height={220}
                slotProps={{ legend: { hidden: false } }}
              />
            </Box>
          </CardContent>
        </Card>
      </Stack>

      {/* ── Map ── */}
      <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            Location Map
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ height: 380, borderRadius: 2, overflow: "hidden" }}>
            <MapContainer
              center={[14.604253, 120.994314]}
              zoom={14}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[14.604253, 120.994314]}>
                <Popup>
                  <strong>National University – Manila</strong>
                  <br />
                  <i>551 F Jhocson St, Sampaloc, Manila</i>
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DashboardPage;
