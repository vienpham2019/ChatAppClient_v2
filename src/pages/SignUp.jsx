import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";

const Signup = () => {
  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [formDataValidate, setFormDataValidate] = useState({
    FullName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [formDataValiations, setFormDataValiations] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    let initFormDataValidate = {};
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setIsError(false);
    // setFormDataValiations({});
    setFormData((prevVal) => ({
      ...prevVal,
      [name]: value,
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
        {Object.entries(formData).map(([key, value]) => (
          <Input
            name={key}
            className={
              "h-12 w-full rounded-md border px-3 py-2 focus:border-[var(--cl-prim-500)] focus:outline-none focus:ring-1 focus:ring-[var(--cl-prim-500)]"
            }
            value={value}
            handleOnChange={handleOnChange}
            isForPassword={key.toLocaleLowerCase().includes("password")}
            isShowRequiredPassword={key.toLocaleLowerCase() === "password"}
            isError={!!formDataValidate[key]}
            errorMsg={formDataValidate[key]}
          />
        ))}

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
