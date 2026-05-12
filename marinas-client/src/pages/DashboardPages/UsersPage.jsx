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
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { DataGrid } from "@mui/x-data-grid";
import { fetchUsers, createUser, updateUser } from "../../services/UserService";

// ── Constants ────────────────────────────────────────────────────
const roles = ["admin", "editor", "viewer"];
const genders = ["male", "female", "other"];

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  role: "editor",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

// ── Helpers ──────────────────────────────────────────────────────
const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : "";

// ── Component ────────────────────────────────────────────────────
const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  // Enhancement 1: Editors cannot access the UsersPage
  useEffect(() => {
    const type = localStorage.getItem("type");
    if (type === "editor") {
      navigate("/dashboard");
    }
  }, []);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [form, setForm] = useState({ ...blankForm });
  const [modal, setModal] = useState({ open: false, id: null });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // ── Search & filter state ──
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // ── Load users from API ──
  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data } = await fetchUsers();
      setUsers(data.users.map((u) => ({ ...u, id: u._id, role: u.type })));
    } catch (error) {
      console.error("Error fetching users:", error);
      setPageError("Unable to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ── Reset form ──
  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  // ── Open modal ──
  const openModal = (user) => {
    setModal({ open: true, id: user?.id ?? null });
    setForm(user ? { ...blankForm, ...user, password: "" } : { ...blankForm });
    setErrors({});
  };

  // ── Close modal ──
  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  // ── Handle field change ──
  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ── Validate ──
  const validate = () => {
    const nextErrors = {};
    const nextEmail = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();

    [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["age", "Age"],
      ["gender", "Gender"],
      ["contactNumber", "Contact number"],
      ["email", "Email"],
      ["role", "Role"],
      ["username", "Username"],
      ["address", "Address"],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    // Password required only when adding a new user
    if (!modal.id && !String(form.password).trim()) {
      nextErrors.password = "Password is required.";
    }

    // Age: numbers only
    if (!nextErrors.age && !/^\d+$/.test(String(form.age).trim())) {
      nextErrors.age = "Age must contain numbers only.";
    }
    // Age: valid range
    if (!nextErrors.age) {
      const n = Number(form.age);
      if (n < 1 || n > 120) nextErrors.age = "Age must be between 1 and 120.";
    }

    // Contact number: exactly 11 digits
    if (
      !nextErrors.contactNumber &&
      !/^\d{11}$/.test(String(form.contactNumber).trim())
    ) {
      nextErrors.contactNumber = "Contact number must be exactly 11 digits.";
    }

    // Email format
    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }
    // Email uniqueness
    if (
      !nextErrors.email &&
      users.some((u) => u.id !== modal.id && u.email === nextEmail)
    ) {
      nextErrors.email = "Email address already exists.";
    }

    // Password: at least 8 characters (only if provided or adding new user)
    if (form.password && form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    // Username: no spaces
    if (!nextErrors.username && /\s/.test(form.username)) {
      nextErrors.username = "Username must not contain spaces.";
    }
    // Username uniqueness
    if (
      !nextErrors.username &&
      users.some((u) => u.id !== modal.id && u.username === username)
    ) {
      nextErrors.username = "Username already exists.";
    }

    return nextErrors;
  };

  // ── Submit ──
  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const nextUser = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      type: form.role.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      address: form.address.trim(),
      isActive: form.isActive,
    };

    // Only include password if it was filled in
    if (form.password) {
      nextUser.password = form.password;
    }

    try {
      if (modal.id) {
        // Update existing user
        await updateUser(modal.id, nextUser);
      } else {
        // Create new user
        await createUser(nextUser);
      }
      await loadUsers(); // Reload users from API
      closeModal();
    } catch (error) {
      console.error("Error saving user:", error);
      setErrors((prev) => ({
        ...prev,
        _form:
          error.response?.data?.message ||
          "Error saving user. Please try again.",
      }));
    }
  };

  // ── Toggle active status ──
  const toggleStatus = async (id, isActive) => {
    try {
      await updateUser(id, { isActive: !isActive });
      await loadUsers(); // Reload users after toggling
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  // ── Filtered rows ──
  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      u.firstName.toLowerCase().includes(q) ||
      u.lastName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q);
    const matchRole = !filterRole || u.role === filterRole;
    const matchGender = !filterGender || u.gender === filterGender;
    const matchStatus =
      filterStatus === "" ||
      (filterStatus === "active" ? u.isActive : !u.isActive);
    return matchSearch && matchRole && matchGender && matchStatus;
  });

  const hasFilters = searchQuery || filterRole || filterGender || filterStatus;

  // ── Shared field props ──
  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  // ── DataGrid columns ──
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      minWidth: 170,
      valueGetter: (value, row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: "username", headerName: "Username", width: 150 },
    { field: "age", headerName: "Age", width: 90 },
    {
      field: "gender",
      headerName: "Gender",
      minWidth: 110,
      valueFormatter: (value) => labelize(value),
    },
    { field: "contactNumber", headerName: "Contact Number", minWidth: 160 },
    { field: "email", headerName: "Email", flex: 1.1, minWidth: 220 },
    {
      field: "role",
      headerName: "Role",
      minWidth: 120,
      valueFormatter: (value) => labelize(value),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? "Active" : "Inactive"}
          color={row.isActive ? "success" : "default"}
          variant={row.isActive ? "filled" : "outlined"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={{ xs: 1, sm: 0.5 }} sx={{ py: 0.5 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => openModal(row)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.isActive ? "warning" : "success"}
            onClick={() => toggleStatus(row.id, row.isActive)}
          >
            {row.isActive ? "Disable" : "Activate"}
          </Button>
        </Stack>
      ),
    },
  ];

  // ────────────────────────────────────────────────────────────────
  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      {/* ── Header ── */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h4">Users</Typography>
        <Button
          variant="contained"
          onClick={() => openModal()}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Add User
        </Button>
      </Box>

      {/* ── Page-level error alert ── */}
      {pageError ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {pageError}
        </Alert>
      ) : null}

      {/* ── Search & Filters ── */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            flexWrap: "wrap",
            alignItems: { xs: "stretch", sm: "center" },
          }}
        >
          <TextField
            size="small"
            placeholder="Search by name, email or username…"
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
            label="Role"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            sx={{ minWidth: 130 }}
          >
            <MenuItem value="">All Roles</MenuItem>
            {roles.map((r) => (
              <MenuItem key={r} value={r}>
                {labelize(r)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            size="small"
            select
            label="Gender"
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
            sx={{ minWidth: 130 }}
          >
            <MenuItem value="">All Genders</MenuItem>
            {genders.map((g) => (
              <MenuItem key={g} value={g}>
                {labelize(g)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            size="small"
            select
            label="Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            sx={{ minWidth: 130 }}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
          {hasFilters ? (
            <Button
              size="small"
              variant="outlined"
              color="inherit"
              onClick={() => {
                setSearchQuery("");
                setFilterRole("");
                setFilterGender("");
                setFilterStatus("");
              }}
            >
              Clear
            </Button>
          ) : null}
        </Stack>
      </Paper>

      {/* ── DataGrid ── */}
      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: "hidden" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        ) : users.length ? (
          <Box
            sx={{ height: { xs: 460, sm: 520 }, width: "100%", minWidth: 0 }}
          >
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
              sx={{
                minWidth: 0,
                "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
                  outline: "none",
                },
              }}
            />
          </Box>
        ) : (
          <Alert severity="info">
            No users found. Use Add User to create your first record.
          </Alert>
        )}
      </Paper>

      {/* ── Add / Edit Dialog ── */}
      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? "Edit User" : "Add User"}</DialogTitle>

          <DialogContent dividers sx={{ pt: 2, sm: 3 }}>
            <Stack spacing={2}>
              {/* Form-level error */}
              {errors._form ? (
                <Alert severity="error">{errors._form}</Alert>
              ) : null}

              {/* First & Last name */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("firstName", "First Name")} />
                <TextField {...fieldProps("lastName", "Last Name")} />
              </Stack>

              {/* Age & Gender */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("age", "Age")} />
                <TextField
                  {...fieldProps("gender", "Gender", { select: true })}
                >
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              {/* Contact & Email */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("contactNumber", "Contact Number")} />
                <TextField
                  {...fieldProps("email", "Email Address", {
                    type: "email",
                  })}
                />
              </Stack>

              {/* Role & Username */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("role", "Role", { select: true })}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps("username", "Username")} />
              </Stack>

              {/* Password */}
              <TextField
                {...fieldProps(
                  "password",
                  modal.id
                    ? "Password (leave blank to keep unchanged)"
                    : "Password",
                  {
                    type: showPassword ? "text" : "password",
                    slotProps: {
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={() => setShowPassword((prev) => !prev)}
                              onMouseDown={(event) => event.preventDefault()}
                              aria-label={
                                showPassword ? "Hide password" : "Show password"
                              }
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    },
                  },
                )}
              />

              {/* Address */}
              <TextField
                {...fieldProps("address", "Address", {
                  multiline: true,
                  rows: 3,
                })}
              />

              {/* Active toggle */}
              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                }
                label={
                  form.isActive
                    ? "User status: Active"
                    : "User status: Inactive"
                }
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? "Update User" : "Save User"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
