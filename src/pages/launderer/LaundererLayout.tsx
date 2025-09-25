import { Outlet } from "react-router-dom";
import LaundererNavBar from "@/components/launderer/LaundererNavBar";

const LaundererLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20">
        <Outlet />
      </main>
      <LaundererNavBar />
    </div>
  );
};

export default LaundererLayout;
