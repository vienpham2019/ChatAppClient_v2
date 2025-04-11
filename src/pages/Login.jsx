import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Input from "../components/Input";

const Login = () => {
  const [formData, setFormData] = useState({ Email: "", Password: "" });
  const [formDataValidate, setFormDataValidate] = useState({
    Email: "",
    Password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setIsError(false);
    setFormData((prevVal) => ({
      ...prevVal,
      [name]: value,
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
        {Object.entries(formData).map(([key, value]) => (
          <Input
            name={key}
            className={
              "h-12 w-full rounded-md border px-3 py-2 focus:border-[var(--cl-prim-500)] focus:outline-none focus:ring-1 focus:ring-[var(--cl-prim-500)]"
            }
            value={value}
            handleOnChange={handleOnChange}
            isForPassword={key.toLocaleLowerCase().includes("password")}
            isError={!!formDataValidate[key]}
            errorMsg={formDataValidate[key]}
          />
        ))}

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
          <Link
            to={"/forgotPassword"}
            className="text-sm text-[var(--cl-prim-500)] hover:underline"
          >
            Forgot password
          </Link>
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
