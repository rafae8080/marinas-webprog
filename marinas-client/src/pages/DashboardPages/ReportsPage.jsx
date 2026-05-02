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
function ReportsPage() {
  return (
    <Box>
      {/* ── Page heading ── */}
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Reports
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Data visualization &amp; sales performance
      </Typography>

      {/* ── Charts row ── */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ mb: 4 }}>
        {/* Bar chart */}
        <Card sx={{ flex: 2, borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Quarterly Sales
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <BarChart
              series={barSeries}
              height={290}
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
              <PieChart series={pieSeries} width={200} height={200} />
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default ReportsPage;
