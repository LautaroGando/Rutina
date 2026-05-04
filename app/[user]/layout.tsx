import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { InstallPrompt } from "@/components/InstallPrompt";

const VALID_USERS = ["lautaro", "rocio"] as const;
type ValidUser = typeof VALID_USERS[number];

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ user: string }>;
}) {
  const { user } = await params;

  if (!VALID_USERS.includes(user as ValidUser)) {
    notFound();
  }

  const validUser = user as ValidUser;

  return (
    <div className="min-h-screen">
      {/* Mobile header */}
      <Header user={validUser} />

      {/* Desktop sidebar */}
      <DesktopSidebar user={validUser} />

      {/* Main content */}
      <main className="md:ml-72 lg:ml-80 pb-20 md:pb-8">
        <div className="max-w-md md:max-w-5xl xl:max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-10">
          {children}
        </div>
      </main>

      {/* Mobile bottom navigation */}
      <Navigation user={validUser} />

      {/* PWA install prompt */}
      <InstallPrompt />
    </div>
  );
}
