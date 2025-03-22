import { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    if (emailError) return;
    setIsSubmitting(true);
    // setTimeout(() => {
    //   setIsSubmitting(false);
    //   setIsSubmitted(true);
    // }, [1000]);
  };

  if (isSubmitted) {
    return (
      <div>
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
          <h1 className="text-3xl font-bold">Check your email</h1>
          <p className="text-muted-foreground mt-2">
            We've sent a password reset link to{" "}
            <span className="font-medium">{email}</span>
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            Didn't receive the email? Check your spam folder or try again with a
            different email address.
          </p>

          <button
            type="button"
            className="cursor-pointer h-12 w-full rounded-md bg-[var(--cl-snd-1000)] text-[var(--cl-snd-0)] hover:bg-[var(--cl-prim-800)] focus:outline-none focus:ring-2 focus:ring-[var(--cl-prim-500)] focus:ring-offset-2"
            onClick={() => setIsSubmitted(false)}
          >
            Try again
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

  return (
    <div className="space-y-6 ">
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Forgot password?</h1>
          <p className="text-muted-foreground mt-2">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-[1rem]">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
              className={`h-12 w-full rounded-md border ${
                emailError
                  ? "border-[var(--cl-error)]"
                  : "border-[var(--cl-snd-300)]"
              } px-3 py-2 focus:border-[var(--cl-prim-500)] focus:outline-none focus:ring-1 focus:ring-[var(--cl-prim-500)]`}
              placeholder="Enter your email address"
            />
            {emailError && (
              <p className="text-sm text-[var(--cl-error)]">{emailError}</p>
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
            {isSubmitting ? "Sending" : "Reset password"}
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

          <div className="text-center">
            <Link
              to={"/login"}
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              <IoMdArrowBack className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
