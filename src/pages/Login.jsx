import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setIsError(false);
    setFormData((prevVal) => ({
      ...prevVal,
      [name]: { value },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-[var(--cl-snd-500)]">Please enter your details</p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email address
          </label>
          <input
            name="email"
            type="email"
            value={formData?.email?.value || ""}
            onChange={(e) => handleOnChange(e)}
            className={`h-12 w-full rounded-md border ${
              isError
                ? "border-[var(--cl-error)]"
                : "border-[var(--cl-snd-300)]"
            } px-3 py-2 focus:border-[var(--cl-prim-500)] focus:outline-none focus:ring-1 focus:ring-[var(--cl-prim-500)]`}
          />
          {isError && (
            <p className="text-sm text-[var(--cl-error)]">Invalid email</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData?.password?.value || ""}
              onChange={(e) => handleOnChange(e)}
              className={`h-12 w-full rounded-md border pr-[2.2rem] ${
                isError
                  ? "border-[var(--cl-error)]"
                  : "border-[var(--cl-snd-300)]"
              } px-3 py-2 focus:border-[var(--cl-prim-500)] focus:outline-none focus:ring-1 focus:ring-[var(--cl-prim-500)]`}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              className="absolute inset-y-0 cursor-pointer right-0 flex items-center pr-3 text-[var(--cl-snd-500)]"
            >
              {showPassword ? (
                <FaEyeSlash className="text-muted-foreground" />
              ) : (
                <FaEye className="text-muted-foreground" />
              )}
            </button>
          </div>
          {isError && (
            <p className="text-sm text-[var(--cl-error)]">Invalid Password</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[var(--cl-snd-300)] text-[var(--cl-prim-500)] focus:ring-[var(--cl-prim-500)]"
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium text-[var(--cl-snd-700)]"
            >
              Remember for 30 days
            </label>
          </div>
          <a
            href="#"
            className="text-sm text-[var(--cl-prim-500)] hover:underline"
          >
            Forgot password
          </a>
        </div>

        <button
          type="submit"
          className="cursor-pointer h-12 w-full rounded-md bg-[var(--cl-prim-700)] text-[var(--cl-snd-0)] hover:bg-[var(--cl-prim-800)] focus:outline-none focus:ring-2 focus:ring-[var(--cl-prim-500)] focus:ring-offset-2"
        >
          Sign in
        </button>

        <button
          type="button"
          className="cursor-pointer flex gap-[0.5rem] h-12 w-full items-center justify-center rounded-md border border-[var(--border)] bg-[var(--cl-snd-0)] text-[var(--cl-snd-700)] hover:bg-[var(--cl-snd-50)] focus:outline-none focus:ring-2 focus:ring-[var(--cl-prim-500)] focus:ring-offset-2"
        >
          <FaGoogle />
          <span>Sign in with Google</span>
        </button>
      </form>

      <div className="text-center text-sm text-[var(--cl-snd-500)]">
        Don't have an account?{" "}
        <Link
          to={"/signup"}
          className="text-[var(--cl-prim-600)] hover:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
