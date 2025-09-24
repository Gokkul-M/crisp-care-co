import MobileNavBar from "@/components/MobileNavBar";

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="pb-24">{children}</main>
      <MobileNavBar />
    </>
  );
};

export default CustomerLayout;
