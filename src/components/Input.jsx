import { useEffect, useRef, useState } from "react";
import { formatLabel } from "../helper";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import CollapseYAnimation from "./CollapseYAnimation";

const Input = ({
  name,
  value,
  handleOnChange,
  isShowRequiredPassword = false,
  isForPassword = false,
  isError = false,
  isTextare = false,
  disabled = false,
  className = "",
  errorMsg = "",
}) => {
  const [passwordType, handleShowPassword] = useState("password");
  const [openPasswordRequied, setOpenPasswordRequied] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
  });

  const menuRef = useRef();
  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      !e.target.closest(".passwordInput")
    ) {
      setOpenPasswordRequied(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isShowRequiredPassword) {
      setPasswordValidations({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /\d/.test(value),
        symbol: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }
  }, [value, isShowRequiredPassword]);

  const displayInput = () => {
    if (isTextare) {
      return (
        <textarea
          onChange={handleOnChange}
          name={name}
          value={value}
          rows="6"
          className={`${
            isError ? "border-[var(--cl-error)]" : "border-[var(--cl-snd-300)]"
          }  ${
            className !== ""
              ? className
              : "resize-y border p-[0.3rem] rounded w-full"
          }`}
        />
      );
    }
    return (
      <input
        onChange={handleOnChange}
        type={isForPassword ? passwordType : "text"}
        name={name}
        value={value}
        disabled={disabled}
        className={`
            ${isForPassword && "pr-[2rem]"}
            ${
              className !== ""
                ? className
                : "px-[0.5rem] py-[0.3rem] border rounded w-full"
            } ${
          disabled && "cursor-not-allowed bg-[var(--cl-snd-300)] text-gray-500"
        } ${
          isError ? "border-[var(--cl-error)]" : "border-[var(--cl-snd-300)]"
        } `}
      />
    );
  };

  return (
    <div className="relative w-full text-[0.9rem]" key={name}>
      <div className="flex justify-between">
        <label className="block text-sm text-gray-600 mb-1">
          {formatLabel(name)}
        </label>
      </div>
      <div
        className={`relative ${isShowRequiredPassword && "passwordInput"} `}
        onFocus={() => {
          setOpenPasswordRequied(isShowRequiredPassword);
        }}
      >
        {displayInput()}
        {isForPassword && (
          <div className="cursor-pointer absolute top-0 right-0 px-[0.5rem] border-l border-[var(--cl-snd-300)] flex items-center h-full">
            {passwordType === "password" ? (
              <FaEyeSlash
                className="text-muted-foreground"
                onClick={() => handleShowPassword("text")}
              />
            ) : (
              <FaEye
                className="text-muted-foreground"
                onClick={() => handleShowPassword("password")}
              />
            )}
          </div>
        )}
      </div>
      {errorMsg !== "" && (
        <p className="text-sm text-[var(--cl-error)]">{errorMsg}</p>
      )}
      <div
        ref={menuRef}
        className=" bg-[var(--cl-snd-200)] mt-[0.3rem] rounded"
      >
        <CollapseYAnimation isOpen={openPasswordRequied}>
          <div className="space-y-2 text-[0.8rem] text-[var(--cl-snd-500)] px-[0.4rem] py-[0.2rem]">
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
        </CollapseYAnimation>
      </div>
    </div>
  );
};

export default Input;
