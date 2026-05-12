import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { createUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-2xl border-2 border-stone-300 bg-stone-100 px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-500 focus:bg-stone-50";

const selectClasses =
  "mt-2 w-full rounded-2xl border-2 border-stone-300 bg-stone-100 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-500 focus:bg-stone-50";

const errorClasses = "mt-1 text-xs text-red-500";

const blank = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  username: "",
  password: "",
  address: "",
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...blank });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Enhancement 3: Same validation rules as UsersPage
  const validate = () => {
    const next = {};

    if (!form.firstName.trim()) next.firstName = "First name is required.";
    if (!form.lastName.trim()) next.lastName = "Last name is required.";
    if (!form.gender) next.gender = "Gender is required.";
    if (!form.contactNumber.trim())
      next.contactNumber = "Contact number is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    if (!form.username.trim()) next.username = "Username is required.";
    if (!form.password.trim()) next.password = "Password is required.";
    if (!form.address.trim()) next.address = "Address is required.";

    if (!next.age) {
      if (!form.age.trim() || !/^\d+$/.test(form.age.trim())) {
        next.age = "Age must be a number.";
      } else {
        const n = Number(form.age);
        if (n < 1 || n > 120) next.age = "Age must be between 1 and 120.";
      }
    }

    if (!next.contactNumber && !/^\d{11}$/.test(form.contactNumber.trim())) {
      next.contactNumber = "Contact number must be exactly 11 digits.";
    }

    if (!next.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Enter a valid email address.";
    }

    if (!next.password && form.password.length < 8) {
      next.password = "Password must be at least 8 characters.";
    }

    if (!next.username && /\s/.test(form.username)) {
      next.username = "Username must not contain spaces.";
    }

    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      // Enhancement 3: role defaults to "editor"
      await createUser({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        age: form.age.trim(),
        gender: form.gender,
        contactNumber: form.contactNumber.trim(),
        email: form.email.trim().toLowerCase(),
        username: form.username.trim().toLowerCase(),
        password: form.password,
        address: form.address.trim(),
      });

      navigate("/auth/signin");
    } catch (err) {
      setFormError(
        err.response?.data?.message || "Sign up failed. Please try again.",
      );
    }
  };

  return (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
        Get started
      </p>
      <h1 className="mt-2 text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">
        Create your account.
      </h1>

      {formError && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
          {formError}
        </p>
      )}

      <form className="mt-3 space-y-4" onSubmit={handleSubmit}>
        {/* First & Last Name */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-stone-700"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Rafael"
              autoComplete="given-name"
              className={inputClasses}
              value={form.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className={errorClasses}>{errors.firstName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-stone-700"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Marinas"
              autoComplete="family-name"
              className={inputClasses}
              value={form.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className={errorClasses}>{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Age & Gender */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="age" className="text-sm font-medium text-stone-700">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="text"
              placeholder="21"
              className={inputClasses}
              value={form.age}
              onChange={handleChange}
            />
            {errors.age && <p className={errorClasses}>{errors.age}</p>}
          </div>
          <div>
            <label
              htmlFor="gender"
              className="text-sm font-medium text-stone-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className={selectClasses}
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className={errorClasses}>{errors.gender}</p>}
          </div>
        </div>

        {/* Contact Number */}
        <div>
          <label
            htmlFor="contactNumber"
            className="text-sm font-medium text-stone-700"
          >
            Contact Number
          </label>
          <input
            id="contactNumber"
            name="contactNumber"
            type="text"
            placeholder="09XXXXXXXXX"
            className={inputClasses}
            value={form.contactNumber}
            onChange={handleChange}
          />
          {errors.contactNumber && (
            <p className={errorClasses}>{errors.contactNumber}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="signup-email"
            className="text-sm font-medium text-stone-700"
          >
            Email Address
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClasses}
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className={errorClasses}>{errors.email}</p>}
        </div>

        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="text-sm font-medium text-stone-700"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="rafaelmarinas"
            autoComplete="username"
            className={inputClasses}
            value={form.username}
            onChange={handleChange}
          />
          {errors.username && <p className={errorClasses}>{errors.username}</p>}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="signup-password"
            className="text-sm font-medium text-stone-700"
          >
            Password
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            className={inputClasses}
            value={form.password}
            onChange={handleChange}
          />
          <p className="mt-2 text-xs leading-5 text-stone-400">
            Use a secure password with at least 8 characters.
          </p>
          {errors.password && <p className={errorClasses}>{errors.password}</p>}
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className="text-sm font-medium text-stone-700"
          >
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows={3}
            placeholder="123 Main St, City"
            className={inputClasses}
            value={form.address}
            onChange={handleChange}
          />
          {errors.address && <p className={errorClasses}>{errors.address}</p>}
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Create Account
        </Button>

        <div className="relative flex items-center gap-3">
          <div className="h-px flex-1 bg-stone-300" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400">
            or
          </span>
          <div className="h-px flex-1 bg-stone-300" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button type="button" variant="secondary" className="w-full">
            Google
          </Button>
          <Button type="button" variant="secondary" className="w-full">
            Apple
          </Button>
        </div>

        <p className="mt-3 text-sm leading-6 text-stone-500">
          Already have an account?{" "}
          <Link
            to="/auth/signin"
            className="font-semibold text-stone-900 transition hover:text-stone-600"
          >
            Sign in
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignUpPage;
