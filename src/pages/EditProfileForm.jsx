import { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import CollapseYAnimation from "../components/CollapseYAnimation";
import Input from "../components/Input";

const EditProfileForm = ({ isOpenMenu, onSetEditMenu }) => {
  const [formData, setFormData] = useState({
    aboutMe:
      "If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual.",
    name: "Dushane Daniel",
    phone: "365 1456 12584",
    email: "dushanedaniel@gmail.com",
    location: "California, USA",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [formDataValiations, setFormDataValiations] = useState({});

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
      [name]: value,
    }));
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
                <Input
                  name={key}
                  value={data}
                  handleOnChange={handleOnChange}
                  isShowRequiredPassword={key === "newPassword"}
                  isForPassword={key.toLocaleLowerCase().includes("password")}
                  isTextare={key === "aboutMe"}
                  disabled={key === "email"}
                />
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
