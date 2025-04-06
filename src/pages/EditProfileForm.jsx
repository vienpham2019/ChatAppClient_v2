import { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa6";
import {
  IoIosInformationCircleOutline,
  IoMdArrowDropdown,
  IoMdArrowDropup,
} from "react-icons/io";
import CollapseYAnimation from "../components/CollapseYAnimation";
import { capitalizeWords } from "../helper";

const EditProfileForm = ({ isOpenMenu, onSetEditMenu }) => {
  const [formData, setFormData] = useState({
    aboutMe: {
      value:
        "If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual.",
      type: "textarea",
    },
    name: { value: "Dushane Daniel", type: "text" },
    phone: { value: "365 1456 12584", type: "text" },
    email: { value: "dushanedaniel@gmail.com", type: "email" },
    location: { value: "California, USA", type: "text" },
    newPassword: { value: "", type: "password" },
    confirmNewPassword: { value: "", type: "password" },
  });

  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
  });
  const [formDataValiations, setFormDataValiations] = useState({});
  const [openPasswordRequied, setOpenPasswordRequied] = useState(false);

  const menuRef = useRef();
  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      e.target.name !== "newPassword"
    ) {
      setOpenPasswordRequied(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: { value, type: prevData[name].type },
    }));
  };
  const handleShowPassword = ({ name, type }) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: { type, value: prevData[name].value },
    }));
  };
  const displayInput = ({ type, name, value }) => {
    const inputClass =
      "border-gray-300 border px-[0.5rem] py-[0.3rem] rounded w-full";
    if (name === "email") {
      return (
        <input
          onChange={handleOnChange}
          type="email"
          name={name}
          disabled
          readOnly
          aria-label="disabled input"
          value={value}
          className={`cursor-not-allowed bg-gray-200 text-gray-500 ${inputClass}`}
        />
      );
    } else if (type === "textarea") {
      return (
        <textarea
          onChange={handleOnChange}
          name={name}
          value={value}
          rows="6"
          className="resize-y border-gray-300 border p-[0.3rem] rounded w-full"
        />
      );
    } else if (name.toLowerCase().includes("password")) {
      return (
        <div className="relative">
          <input
            onChange={handleOnChange}
            type={type}
            name={name}
            value={value}
            className={inputClass}
            onFocus={() => {
              setOpenPasswordRequied(name === "newPassword");
            }}
          />
          <div className="cursor-pointer absolute top-0 right-0 px-[0.3rem] border-l border-[var(--cl-snd-300)] flex items-center h-full">
            {type === "password" ? (
              <FaEyeSlash
                className="text-muted-foreground"
                onClick={() => handleShowPassword({ name, type: "text" })}
              />
            ) : (
              <FaEye
                className="text-muted-foreground"
                onClick={() => handleShowPassword({ name, type: "password" })}
              />
            )}
          </div>
        </div>
      );
    } else {
      return (
        <input
          onChange={handleOnChange}
          type="text"
          name={name}
          value={value}
          className={inputClass}
        />
      );
    }
  };
  return (
    <div className="grid gap-[1rem] mb-3 border-b border-[var(--cl-snd-200)] p-[1rem]">
      <div
        className="cursor-pointer items-center flex justify-between"
        onClick={onSetEditMenu}
      >
        <div className="flex items-center gap-[1rem]">
          <div className="p-[0.5rem] text-[0.6rem] bg-[var(--cl-prim-200)] rounded text-[var(--cl-prim-500)]">
            <FaUser />
          </div>
          <h3 className="text-xs font-semibold text-gray-500">Personal Info</h3>
        </div>
        {isOpenMenu ? (
          <IoMdArrowDropdown className="text-[1.3rem]" />
        ) : (
          <IoMdArrowDropup className="text-[1.3rem]" />
        )}
      </div>
      <CollapseYAnimation isOpen={isOpenMenu}>
        <div className="px-2 pb-4">
          <div className="space-y-[0.3rem]">
            {Object.entries(formData).map(([key, data]) => {
              return (
                <div className="relative w-full text-[0.9rem]" key={key}>
                  <div className="flex justify-between">
                    <label className="block text-sm text-gray-600 mb-1">
                      {capitalizeWords(key)}
                    </label>
                    {key === "newPassword" && (
                      <IoIosInformationCircleOutline
                        className="mr-[0.5rem] cursor-pointer"
                        onClick={() => setOpenPasswordRequied(true)}
                      />
                    )}
                  </div>
                  {displayInput({
                    type: data.type,
                    name: key,
                    value: data.value,
                  })}
                  {key === "newPassword" && (
                    <div ref={menuRef}>
                      <CollapseYAnimation isOpen={openPasswordRequied}>
                        <div className="absolute bottom-[3.7rem] left-[13.5rem] w-[1rem] aspect-square bg-[var(--cl-snd-300)] rotate-45"></div>
                        <div className="absolute z-10 bottom-[4rem] mt-2 space-y-2 text-sm rounded bg-[var(--cl-snd-300)] text-[var(--cl-snd-500)] px-[0.4rem] py-[0.2rem]">
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
                  )}
                </div>
              );
            })}

            <button className="w-full bg-[var(--cl-prim-300)]  py-[0.2rem] rounded">
              Save
            </button>
          </div>
        </div>
      </CollapseYAnimation>
    </div>
  );
};

export default EditProfileForm;
