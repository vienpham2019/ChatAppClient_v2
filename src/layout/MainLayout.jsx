import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-[var(--cl-prim-100)]">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
