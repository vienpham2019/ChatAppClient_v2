import Logo from "../components/logo";
import authBg from "../img/authBG.png";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-md px-8">
          <Logo />
          <Outlet />
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden bg-[var(--cl-prim-100)] lg:block lg:w-1/2">
        <div className="flex h-full items-center justify-center">
          <div className="relative h-full w-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <img className="w-[40rem]" src={authBg} alt="auth bg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
