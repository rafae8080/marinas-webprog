import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { loginUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-2xl border-2 border-stone-300 bg-stone-100 px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-500 focus:bg-stone-50";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password });
      console.log("Login successful:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("type", data.type);

      navigate("/dashboard", {
        state: { firstName: data.firstName, type: data.type },
      });
    } catch (err) {
      console.error(
        "Login failed:",
        err.response?.data?.message || err.message,
      );
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    }
  };

  return (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
        Welcome back
      </p>
      <h1 className="mt-2 text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">
        Sign in to your account.
      </h1>

      {/* Error message */}
      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      <form className="mt-8 space-y-5" onSubmit={handleLogin}>
        <div>
          <label
            htmlFor="signin-email"
            className="text-sm font-medium text-stone-700"
          >
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="signin-password"
              className="text-sm font-medium text-stone-700"
            >
              Password
            </label>
            <button
              type="button"
              className="text-xs font-semibold text-stone-500 transition hover:text-stone-900"
            >
              Forgot password?
            </button>
          </div>
          <input
            id="signin-password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 rounded border-stone-300 accent-stone-800"
          />
          <label htmlFor="remember" className="text-sm text-stone-600">
            Remember me
          </label>
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Sign In
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
          Don't have an account?{" "}
          <Link
            to="/auth/signup"
            className="font-semibold text-stone-900 transition hover:text-stone-600"
          >
            Sign up free
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignInPage;
