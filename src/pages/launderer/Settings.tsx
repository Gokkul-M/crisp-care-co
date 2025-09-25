import { useState } from "react";
import {
  ChevronRight,
  CreditCard,
  FileText,
  Gift,
  HelpCircle,
  Image,
  Info,
  Languages,
  LogOut,
  MapPin,
  Moon,
  Newspaper,
  Bell,
  Palette,
  ShieldCheck,
  Star,
  Trash2,
  User,
  Wallet,
  Lock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import { Switch } from "@/components/ui/switch";
import DeleteAccount from "@/components/DeleteAccount";

const LaundererSettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [isDeleteAccountOpen, setDeleteAccountOpen] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/auth");
  };

  const menuItems = {
    "Business Profile": [
      {
        icon: User,
        title: "Edit Business Profile",
        subtitle: "Name, phone, email, address",
        link: "/launderer/edit-profile",
      },
      {
        icon: Image,
        title: "Business Logo",
        subtitle: "Update your business logo",
        link: "/launderer/edit-logo",
      },
    ],
    "Service & Pricing": [
        {
            icon: Wallet,
            title: "Service & Pricing",
            subtitle: "Update your Service & Pricing",
            link: "/launderer/edit-service&pricing",
        },
    ],
    "Bank Account Details": [
        {
            icon: Wallet,
            title: "Bank Account Details",
            subtitle: "Update your Bank Account Details",
            link: "/launderer/edit-bank-account-details",
        },
        {
            icon: FileText,
            title: "Payout History",
            subtitle: "View your payout history",
            link: "/launderer/payout-history",
        },
    ],
    "App Preferences": [
      {
        icon: Moon,
        title: "Dark Mode",
        subtitle: "Toggle between light and dark themes",
        action: "dark_mode_toggle",
      },
      {
        icon: Languages,
        title: "Language",
        subtitle: "Select your preferred language",
        link: "/launderer/language-settings",
      },
      {
        icon: Bell,
        title: "Notification Settings",
        subtitle: "Push, SMS, WhatsApp",
        link: "/launderer/notification-settings",
      },
    ],
    "Privacy & Security": [
      {
        icon: ShieldCheck,
        title: "Manage Permissions",
        subtitle: "Location, camera, gallery",
        link: "/launderer/permissions",
      },
      {
        icon: Trash2,
        title: "Delete Account",
        subtitle: "This action is permanent",
        action: "delete_account",
      },
      { icon: LogOut, title: "Logout", action: "logout" },
    ],
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-subtle pb-24">
        <div className="mobile-container">
          <header className="py-8 text-center">
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Manage your account and app preferences
            </p>
          </header>

          <main className="space-y-8">
            {Object.entries(menuItems).map(([category, items]) => (
              <section key={category}>
                <h2 className="text-xs font-bold uppercase text-muted-foreground tracking-wider px-4 mb-2">
                  {category}
                </h2>
                <div className="bg-card/80 backdrop-blur-md rounded-2xl overflow-hidden border border-border/30">
                  {items.map((item, index) => {
                    const Icon = item.icon;

                    const itemContent = (
                      <>
                        <Icon
                          className={`w-5 h-5 mr-4 ${
                            item.action === "logout" || item.action === "delete_account"
                              ? "text-destructive"
                              : "text-primary"
                          }`}
                        />
                        <div className="flex-grow">
                          <h3
                            className={`font-medium text-sm ${
                              item.action === "logout" || item.action === "delete_account"
                                ? "text-destructive"
                                : ""
                            }`}
                          >
                            {item.title}
                          </h3>
                          {item.subtitle && (
                            <p className="text-xs text-muted-foreground">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </>
                    );

                    const control = item.link ? (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    ) : item.action === "dark_mode_toggle" ? (
                      <Switch
                        checked={theme === "dark"}
                        onCheckedChange={() =>
                          setTheme(theme === "dark" ? "light" : "dark")
                        }
                      />
                    ) : null;

                    const commonClasses =
                      "flex items-center p-4 w-full text-left transition-colors hover:bg-muted/50";
                    const borderClass =
                      index < items.length - 1
                        ? "border-b border-border/30"
                        : "";

                    if (item.link) {
                      return (
                        <Link
                          to={item.link}
                          key={item.title}
                          className={`${commonClasses} ${borderClass}`}
                        >
                          {itemContent}
                          {control}
                        </Link>
                      );
                    } else if (item.action === "logout") {
                      return (
                        <button
                          key={item.title}
                          onClick={handleLogout}
                          className={`${commonClasses} ${borderClass}`}
                        >
                          {itemContent}
                        </button>
                      );
                    } else if (item.action === "delete_account") {
                      return (
                        <button
                          key={item.title}
                          onClick={() => setDeleteAccountOpen(true)}
                          className={`${commonClasses} ${borderClass}`}
                        >
                          {itemContent}
                        </button>
                      );
                    }

                    return (
                      <div
                        key={item.title}
                        className={`${commonClasses} ${borderClass}`}
                      >
                        {itemContent}
                        {control}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
      <DeleteAccount
        open={isDeleteAccountOpen}
        onOpenChange={setDeleteAccountOpen}
      />
    </>
  );
};

export default LaundererSettingsPage;
