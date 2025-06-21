import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import GalleryModal from "../components/GalleryModal";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-[var(--cl-prim-100)]">
      <GalleryModal />
      <SideBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
