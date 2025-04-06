import { IoMdMore } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdOutlineBlock, MdOutlineMail } from "react-icons/md";
import { IoLocationOutline, IoSettingsOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const ProfileMenu = () => {
  const [showEditMenu, setShowEditMenu] = useState(false);
  const menuRef = useRef();
  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      !e.target.closest(".more-btn")
    ) {
      setShowEditMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="flex flex-col w-full bg-white border-r border-[var(--cl-snd-200)] overflow-y-auto h-screen">
      <div className="flex-1">
        {/* Header with title and menu */}
        <div className="relative flex justify-between h-[10rem]">
          <div className="flex justify-between w-full z-1 bg-black/50 px-4 py-2">
            <h1 className="text-xl text-white font-medium">My Profile</h1>
            <button
              onClick={() => setShowEditMenu(!showEditMenu)}
              className="more-btn cursor-pointer text-white md:w-auto w-[3rem] text-[2rem] h-[2rem]"
            >
              <IoMdMore />
            </button>
          </div>
          {showEditMenu && (
            <div
              ref={menuRef}
              className={`absolute rounded text-[var(--cl-snd-700)] right-[1rem] z-20 w-36 top-[2.4rem] bg-white border border-[var(--cl-snd-200)] py-1`}
            >
              <button className="cursor-pointer w-full px-4 py-2 text-sm text-left flex items-center justify-between hover:bg-gray-50">
                Setting
                <IoSettingsOutline />
              </button>
              <button className="cursor-pointer w-full px-4 py-2 text-sm text-left flex items-center justify-between  hover:bg-gray-50">
                Block
                <MdOutlineBlock />
              </button>
              <hr className="text-[var(--cl-snd-300)]" />
              <button className="cursor-pointer w-full px-4 py-2 text-sm text-left flex items-center justify-between  hover:bg-gray-50">
                Help
                <AiOutlineQuestionCircle />
              </button>
            </div>
          )}
          <div className="w-full h-[5rem] absolute -bottom-[3rem] z-[1] flex justify-center">
            <div className="relative">
              <img
                className="w-[5rem] aspect-square rounded-full border-[0.3rem] border-white"
                src="https://i.pravatar.cc/150?img=9"
                alt="Profile Avatar"
              />
              <span className="absolute bottom-[0.2rem] right-0 w-[1.4rem] aspect-square  bg-[var(--cl-success)] rounded-full border-2 border-white"></span>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="https://themesdesign.in/chaton/layouts/assets/images/small/img-1.jpg"
              alt="Social Media Background"
              width={400}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Profile info */}
        <div className="mt-16 px-6 text-center">
          <h2 className="text-xl font-bold">Dushane Daniel</h2>
          <p className="text-[var(--cl-snd-600)]">Front end Developer</p>
        </div>
        <hr className="text-[var(--cl-snd-300)] mt-[1rem]" />
        {/* Profile description */}
        <div className="mt-6 px-6">
          <p className="text-[var(--cl-snd-700)]">
            A professional profile is an introductory section on your resume
            that highlights your relevant qualifications and skills.
          </p>
        </div>

        {/* Contact information */}
        <div className="mt-6 px-6 space-y-4">
          <div className="flex items-center gap-3">
            <FaRegUser />
            <span className="text-[var(--cl-snd-800)]">Dushane Daniel</span>
          </div>
          <div className="flex items-center gap-3">
            <FiPhone />
            <span className="text-[var(--cl-snd-800)]">+{365} 1456 12584</span>
          </div>
          <div className="flex items-center gap-3">
            <MdOutlineMail />
            <span className="text-[var(--cl-snd-800)]">
              dushanedaniel@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-3">
            <IoLocationOutline />
            <span className="text-[var(--cl-snd-800)]">California, USA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
