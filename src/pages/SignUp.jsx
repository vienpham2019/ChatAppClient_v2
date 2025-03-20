import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
  });
  const [formDataValiations, setFormDataValiations] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    let checkFormDataValiations = {};
    let formDataRequied = ["fullName", "email", "password", "confirmPassword"];
    let isRequiredValid = true;
    formDataRequied.forEach((field) => {
      if (!formData[field]) {
        checkFormDataValiations[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
        isRequiredValid = false;
      }
    });
    if (isRequiredValid) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(formData.email)) {
        checkFormDataValiations["email"] = "Please enter a valid email address";
      }

      if (!Object.values(passwordValidations).every(Boolean)) {
        checkFormDataValiations["password"] =
          "Password doesn't meet all requirements";
      }

      if (formData.confirmPassword !== formData.password) {
        checkFormDataValiations["confirmPassword"] =
          "Confirm Password do not match Password";
      }
    }

    setFormDataValiations(checkFormDataValiations);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setIsError(false);
    setFormDataValiations({});
    if (name === "password") {
      setPasswordValidations({
        length: value.length >= 12,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        symbol: /[^A-Za-z0-9]/.test(value),
      });
    }
    setFormData((prevVal) => ({
      ...prevVal,
      [name]: { value },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-[var(--cl-snd-500)]">
          Please enter your details to sign up
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="fullname" className="block text-sm font-medium">
            Full name
          </label>
          <input
            name="fullName"
            type="text"
            value={formData?.fullName?.value || ""}
            onChange={(e) => handleOnChange(e)}
            className={`h-12 w-full rounded-md border ${
              formDataValiations?.fullName
                ? "border-[var(--cl-error)]"
                : "border-[var(--cl-snd-300)]"
            } px-3 py-2 focus:border-[var(--cl-prim-500)] focus:outline-none focus:ring-1 focus:ring-[var(--cl-prim-500)]`}
          />
          {formDataValiations?.fullName && (
            <p className="text-sm text-[var(--cl-error)]">
              {formDataValiations?.fullName}
            </p>
          )}
        </div>

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
              formDataValiations?.email
                ? "border-[var(--cl-error)]"
                : "border-[var(--cl-snd-300)]"
            } px-3 py-2 focus:border-[var(--cl-prim-500)] focus:outline-none focus:ring-1 focus:ring-[var(--cl-prim-500)]`}
          />
          {formDataValiations?.email && (
            <p className="text-sm text-[var(--cl-error)]">
              {formDataValiations?.email}
            </p>
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
                formDataValiations?.password
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

          <div className="mt-2 space-y-2 text-sm text-[var(--cl-snd-500)]">
            <p className="font-medium">Password requirements:</p>
            <ul className="space-y-1 pl-5 list-disc">
              <li
                className={
                  passwordValidations.length
                    ? "text-[var(--cl-success)]"
                    : "text-muted-foreground"
                }
              >
                At least 12 characters
              </li>
              <li
                className={
                  passwordValidations.uppercase
                    ? "text-[var(--cl-success)]"
                    : "text-muted-foreground"
                }
              >
                At least one uppercase letter (A-Z)
              </li>
              <li
                className={
                  passwordValidations.lowercase
                    ? "text-[var(--cl-success)]"
                    : "text-muted-foreground"
                }
              >
                At least one lowercase letter (a-z)
              </li>
              <li
                className={
                  passwordValidations.number
                    ? "text-[var(--cl-success)]"
                    : "text-muted-foreground"
                }
              >
                At least one number (0-9)
              </li>
              <li
                className={
                  passwordValidations.symbol
                    ? "text-[var(--cl-success)]"
                    : "text-muted-foreground"
                }
              >
                At least one special character (!@#$%^&*)
              </li>
            </ul>
          </div>

          {formDataValiations?.password && (
            <p className="text-sm text-[var(--cl-error)]">
              {formDataValiations?.password}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="confirm password"
            className="block text-sm font-medium"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData?.confirmPassword?.value || ""}
              onChange={(e) => handleOnChange(e)}
              className={`h-12 w-full rounded-md border pr-[2.2rem] ${
                formDataValiations?.confirmPassword
                  ? "border-[var(--cl-error)]"
                  : "border-[var(--cl-snd-300)]"
              } px-3 py-2 focus:border-[var(--cl-prim-500)] focus:outline-none focus:ring-1 focus:ring-[var(--cl-prim-500)]`}
            />
            <button
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              type="button"
              className="absolute inset-y-0 cursor-pointer right-0 flex items-center pr-3 text-[var(--cl-snd-500)]"
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="text-muted-foreground" />
              ) : (
                <FaEye className="text-muted-foreground" />
              )}
            </button>
          </div>

          {formDataValiations?.confirmPassword && (
            <p className="text-sm text-[var(--cl-error)]">
              {formDataValiations?.confirmPassword}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              id="terms"
              type="checkbox"
              // checked={acceptTerms}
              // onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <label htmlFor="terms" className="text-sm text-[var(--cl-snd-600)]">
              I agree to the{" "}
              <a href="#" className="text-[var(--cl-snd-1000)] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[var(--cl-snd-1000)] hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>
          {formDataValiations?.acceptTerms && (
            <p className="text-sm text-[var(--cl-error)]">
              {formDataValiations?.acceptTerms}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="cursor-pointer h-12 w-full rounded-md bg-[var(--cl-prim-700)] text-[var(--cl-snd-0)] hover:bg-[var(--cl-prim-800)] focus:outline-none focus:ring-2 focus:ring-[var(--cl-prim-500)] focus:ring-offset-2"
        >
          Sign Up
        </button>
      </form>

      <div className="text-center text-sm text-[var(--cl-snd-500)]">
        Already have an account?{" "}
        <Link
          to={"/login"}
          className="text-[var(--cl-prim-600)] hover:underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
