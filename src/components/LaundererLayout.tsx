import LaundererNavBar from "@/components/LaundererNavBar";
import { ThemeProvider } from "@/components/ThemeProvider";

const LaundererLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <main className="pb-24">{children}</main>
      <LaundererNavBar />
    </ThemeProvider>
  );
};

export default LaundererLayout;
