import { Link } from "react-router-dom";
import Button from "../../components/Button";

const inputClasses =
  "mt-2 w-full rounded-2xl border-2 border-stone-300 bg-stone-100 px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-500 focus:bg-stone-50";

const SignUpPage = () => {
  return (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400">
        Get started
      </p>
      <h1 className="mt-2 text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">
        Create your account.
      </h1>
      <form className="mt-3 space-y-4">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="text-sm font-medium text-stone-700"
            >
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="Rafael"
              autoComplete="given-name"
              className={inputClasses}
            />
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="text-sm font-medium text-stone-700"
            >
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Marinas"
              autoComplete="family-name"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="text-sm font-medium text-stone-700"
          >
            Email Address
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="text-sm font-medium text-stone-700"
          >
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-stone-400">
            Use a secure password with letters, numbers, and symbols.
          </p>
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
