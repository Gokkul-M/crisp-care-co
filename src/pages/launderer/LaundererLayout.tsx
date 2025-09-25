import { Outlet } from "react-router-dom";
import LaundererNavBar from "@/components/LaundererNavBar";

const LaundererLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pb-28">
        <Outlet />
      </main>
      <LaundererNavBar />
    </div>
  );
};

export default LaundererLayout;
