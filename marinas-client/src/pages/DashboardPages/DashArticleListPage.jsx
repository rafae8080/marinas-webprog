import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { fetchArticles, createArticle } from "../../services/ArticleService";

const tags = ["Web Development", "Design Systems", "Mobile Dev", "Databases"];

const DashArticleListPage = () => {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filterTag, setFilterTag] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const emptyForm = { title: "", tag: "", img: "", alt: "", content: "" };
  const [form, setForm] = useState(emptyForm);

  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  const handleAddArticle = async () => {
    setFormError("");
    if (!form.title || !form.tag || !form.content) {
      setFormError("Title, tag, and content are required.");
      return;
    }
    const paragraphs = form.content
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (!paragraphs.length) {
      setFormError("Content must have at least one paragraph.");
      return;
    }
    const payload = {
      name: slugify(form.title),
      tag: form.tag,
      title: form.title.trim(),
      img: form.img.trim(),
      alt: form.alt.trim(),
      content: paragraphs,
    };
    try {
      setSubmitting(true);
      const { data } = await createArticle(payload);
      setArticles((prev) => [
        ...prev,
        { ...data.article, id: prev.length + 1 },
      ]);
      setForm(emptyForm);
      setDialogOpen(false);
    } catch (err) {
      setFormError(
        err?.response?.data?.message || "Failed to add article. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

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
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h4">Articles</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => { setFormError(""); setDialogOpen(true); }}
        >
          Add Article
        </Button>
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
      {/* Add Article Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Article</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {formError ? <Alert severity="error">{formError}</Alert> : null}
            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={handleFormChange}
              fullWidth
              required
            />
            <TextField
              select
              label="Tag"
              name="tag"
              value={form.tag}
              onChange={handleFormChange}
              fullWidth
              required
            >
              {tags.map((t) => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Image URL"
              name="img"
              value={form.img}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              label="Image Alt Text"
              name="alt"
              value={form.alt}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              label="Content"
              name="content"
              value={form.content}
              onChange={handleFormChange}
              fullWidth
              required
              multiline
              minRows={5}
              helperText="Separate paragraphs with a blank line."
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="inherit">Cancel</Button>
          <Button onClick={handleAddArticle} variant="contained" disabled={submitting}>
            {submitting ? "Adding…" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;
