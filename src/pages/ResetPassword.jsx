import { useEffect, useState } from "react";
import { CiWarning } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [isLinkExpired, setIsLinkExpired] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const { key } = useParams();
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (key === "123") {
  //       setIsLinkExpired(true);
  //     } else {
  //       setIsLinkExpired(false);
  //     }
  //     setIsValidating(false);
  //   }, 1000); // 1-second timeout

  //   return () => clearTimeout(timer); // Cleanup to prevent memory leaks
  // }, [key]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
  };

  // Show loading state
  if (isValidating) {
    return (
      <div className="flex flex-col justify-center items-center w-full max-w-md p-8 mx-auto">
        <lord-icon
          src="https://cdn.lordicon.com/ktsahwvc.json"
          trigger="loop"
          state="loop-transparency"
          colors="primary:#000000"
          style={{ width: "150px", height: "150px" }}
        ></lord-icon>

        <h2 className="text-xl font-medium mb-2">Verifying your link</h2>
        <p className="text-muted-foreground text-center">
          Please wait while we verify your password reset link...
        </p>
      </div>
    );
  }

  if (isLinkExpired) {
    return (
      <div className="flex flex-col justify-center w-full max-w-md p-8 mx-auto">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <CiWarning className="h-16 w-16 text-[var(--cl-waring)]" />
          </div>
          <h1 className="text-3xl font-bold">Link expired</h1>
          <p className="text-muted-foreground mt-2">
            This password reset link has expired or is invalid.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            Password reset links are valid for 24 hours. Please request a new
            link to reset your password.
          </p>

          <button
            className={`flex justify-center items-center gap-[0.5rem] cursor-pointer h-12 w-full rounded-md 
                bg-[var(--cl-snd-1000)] hover:bg-[var(--cl-prim-800)] focus:outline-none focus:ring-2 focus:ring-[var(--cl-prim-500)] focus:ring-offset-2  text-[var(--cl-snd-0)]`}
          >
            <Link to={"/forgotPassword"}>Request new link</Link>
          </button>

          <div className="text-center">
            <Link
              to={"/login"}
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              <IoMdArrowBack className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col justify-center w-full max-w-md p-8 mx-auto">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <lord-icon
              src="https://cdn.lordicon.com/oqdmuxru.json"
              trigger="in"
              delay="200"
              colors="primary:#30e849"
              style={{ width: "150px", height: "150px" }}
            ></lord-icon>
          </div>
          <h1 className="text-3xl font-bold">Password updated</h1>
          <p className="text-muted-foreground mt-2">
            Your password has been successfully updated.
          </p>
        </div>

        <div className="text-center">
          <Link
            to={"/login"}
            className="inline-flex items-center text-sm text-primary hover:underline"
          >
            <IoMdArrowBack className="mr-2 h-4 w-4" />
            Continue to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center w-full max-w-md p-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create new password</h1>
        <p className="text-muted-foreground mt-2">
          Your new password must be different from previously used passwords.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <button
          type="submit"
          className={`flex justify-center items-center gap-[0.5rem] cursor-pointer h-12 w-full rounded-md ${
            isSubmitting
              ? "bg-[var(--cl-snd-600)] "
              : "bg-[var(--cl-snd-1000)] hover:bg-[var(--cl-prim-800)] focus:outline-none focus:ring-2 focus:ring-[var(--cl-prim-500)] focus:ring-offset-2"
          }  text-[var(--cl-snd-0)]`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating" : "Update password"}
          {isSubmitting && (
            <lord-icon
              src="https://cdn.lordicon.com/jpgpblwn.json"
              trigger="loop"
              state="loop-expand-alt-2"
              colors="primary:#ffffff"
              style={{ width: "20px", height: "20px", paddingTop: "2px" }}
            ></lord-icon>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          This link will expire in 24 hours. If you don't complete this now,
          you'll need to request a new link.
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
