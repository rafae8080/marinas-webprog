import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { fetchArticles } from "../../services/ArticleService";

const tags = ["Web Development", "Design Systems", "Mobile Dev", "Databases"];

const DashArticleListPage = () => {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filterTag, setFilterTag] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const { data } = await fetchArticles();
        setArticles(data.articles.map((a, i) => ({ ...a, id: i + 1 })));
      } catch (error) {
        console.error("Error fetching articles:", error);
        setPageError("Unable to load articles. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredArticles = articles.filter((a) => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q);
    const matchTag = !filterTag || a.tag === filterTag;
    return matchSearch && matchTag;
  });

  const hasFilters = searchQuery || filterTag;

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "title", headerName: "Title", flex: 2, minWidth: 220 },
    {
      field: "tag",
      headerName: "Tag",
      minWidth: 160,
      renderCell: ({ row }) => (
        <Chip size="small" label={row.tag} variant="outlined" />
      ),
    },
    {
      field: "content",
      headerName: "Preview",
      flex: 3,
      minWidth: 260,
      sortable: false,
      // Enhancement 2: Shows first sentence of the article from ArticleListPage data
      renderCell: ({ row }) => {
        const first = Array.isArray(row.content) ? row.content[0] : "";
        return (
          <span style={{ whiteSpace: "normal", lineHeight: 1.4 }}>
            {first.length > 80 ? `${first.slice(0, 80)}…` : first}
          </span>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Button
          size="small"
          variant="outlined"
          onClick={() => navigate(`/articles/${row.name}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Articles</Typography>
      </Box>

      {pageError ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {pageError}
        </Alert>
      ) : null}

      {/* Search & Filter */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ flexWrap: "wrap", alignItems: { xs: "stretch", sm: "center" } }}
        >
          <TextField
            size="small"
            placeholder="Search by title or slug…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flex: 1, minWidth: 200 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            size="small"
            select
            label="Tag"
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="">All Tags</MenuItem>
            {tags.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
          {hasFilters ? (
            <Button
              size="small"
              variant="outlined"
              color="inherit"
              onClick={() => {
                setSearchQuery("");
                setFilterTag("");
              }}
            >
              Clear
            </Button>
          ) : null}
        </Stack>
      </Paper>

      {/* DataGrid */}
      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: "hidden" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        ) : articles.length ? (
          <Box sx={{ height: { xs: 460, sm: 520 }, width: "100%", minWidth: 0 }}>
            <DataGrid
              rows={filteredArticles}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
              rowHeight={64}
              sx={{
                minWidth: 0,
                "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
                  outline: "none",
                },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">No articles found.</Alert>
        )}
      </Paper>
    </Box>
  );
};

export default DashArticleListPage;
