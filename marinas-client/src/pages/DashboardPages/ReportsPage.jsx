import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

// ── Dataset definitions ──────────────────────────────────────────
const revenueData = {
  2023: [
    42000, 58000, 37000, 61000, 52000, 70000, 66000, 74000, 59000, 80000, 91000,
    105000,
  ],
  2024: [
    55000, 62000, 48000, 74000, 68000, 83000, 79000, 88000, 72000, 95000,
    110000, 128000,
  ],
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const categoryData = {
  2023: [
    { id: 0, value: 38, label: "Electronics" },
    { id: 1, value: 22, label: "Apparel" },
    { id: 2, value: 18, label: "Groceries" },
    { id: 3, value: 14, label: "Services" },
    { id: 4, value: 8, label: "Others" },
  ],
  2024: [
    { id: 0, value: 41, label: "Electronics" },
    { id: 1, value: 19, label: "Apparel" },
    { id: 2, value: 21, label: "Groceries" },
    { id: 3, value: 12, label: "Services" },
    { id: 4, value: 7, label: "Others" },
  ],
};

const quarterlyData = {
  2023: [137000, 170000, 199000, 276000],
  2024: [165000, 225000, 239000, 333000],
};

// ── Summary stats per year ───────────────────────────────────────
const summaryStats = {
  2023: { total: "₱795,000", topMonth: "Dec", growth: "+14.2%" },
  2024: { total: "₱962,000", topMonth: "Dec", growth: "+20.9%" },
};

// ─────────────────────────────────────────────────────────────────
function ReportsPage() {
  const [year, setYear] = useState("2024");

  const handleYear = (_, val) => {
    if (val) setYear(val);
  };

  const { total, topMonth, growth } = summaryStats[year];

  return (
    <Box>
      {/* ── Header ── */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        sx={{
          mb: 3,
          alignItems: { sm: "center" },
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Reports
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Data visualization &amp; sales performance
          </Typography>
        </Box>

        {/* Year toggle */}
        <ToggleButtonGroup
          value={year}
          exclusive
          onChange={handleYear}
          size="small"
          sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}
        >
          <ToggleButton value="2023">2023</ToggleButton>
          <ToggleButton value="2024">2024</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {/* ── KPI chips ── */}
      <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: "wrap" }}>
        <Chip
          icon={<BarChartIcon />}
          label={`Total Revenue: ${total}`}
          color="primary"
          variant="outlined"
        />
        <Chip
          label={`Top Month: ${topMonth}`}
          color="success"
          variant="outlined"
        />
        <Chip
          icon={<DonutLargeIcon />}
          label={`YoY Growth: ${growth}`}
          color="warning"
          variant="outlined"
        />
      </Stack>

      {/* ── Monthly Revenue Bar Chart ── */}
      <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            Monthly Revenue — {year}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <BarChart
            series={[
              {
                data: revenueData[year],
                label: `Revenue (${year})`,
                color: "#1976d2",
              },
            ]}
            height={300}
            xAxis={[{ data: months, scaleType: "band", label: "Month" }]}
            yAxis={[{ label: "Revenue (₱)" }]}
            margin={{ top: 10, bottom: 50, left: 70, right: 10 }}
          />
        </CardContent>
      </Card>

      {/* ── Quarterly + Category row ── */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        {/* Quarterly grouped bar */}
        <Card sx={{ flex: 3, borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Quarterly Comparison — 2023 vs 2024
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <BarChart
              series={[
                {
                  data: quarterlyData["2023"],
                  label: "2023",
                  color: "#90caf9",
                },
                {
                  data: quarterlyData["2024"],
                  label: "2024",
                  color: "#1565c0",
                },
              ]}
              height={280}
              xAxis={[
                {
                  data: ["Q1", "Q2", "Q3", "Q4"],
                  scaleType: "band",
                  label: "Quarter",
                },
              ]}
              yAxis={[{ label: "Revenue (₱)" }]}
              margin={{ top: 10, bottom: 50, left: 70, right: 10 }}
            />
          </CardContent>
        </Card>

        {/* Donut / Pie */}
        <Card sx={{ flex: 2, borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Sales by Category — {year}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
              <PieChart
                series={[
                  {
                    data: categoryData[year],
                    innerRadius: 50,
                    outerRadius: 90,
                    paddingAngle: 3,
                    cornerRadius: 5,
                    cx: 100,
                  },
                ]}
                width={320}
                height={240}
              />
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default ReportsPage;
