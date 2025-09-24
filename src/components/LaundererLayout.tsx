import LaundererNavBar from "@/components/LaundererNavBar";

const LaundererLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="pb-24">{children}</main>
      <LaundererNavBar />
    </>
  );
};

export default LaundererLayout;
