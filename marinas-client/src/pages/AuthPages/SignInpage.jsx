import { Link } from "react-router-dom";
import Button from "../../components/Button";

const inputClasses =
  "mt-2 w-full rounded-2xl border-2 border-stone-300 bg-stone-100 px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-500 focus:bg-stone-50";

const SignInPage = () => {
  return (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
        Welcome back
      </p>
      <h1 className="mt-2 text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">
        Sign in to your account.
      </h1>

      <form className="mt-8 space-y-5">
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

        <Button to="/" type="submit" variant="primary" className="w-full">
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
