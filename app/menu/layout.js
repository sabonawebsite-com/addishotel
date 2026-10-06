import Sidebar from "@/components/Sidebar";
import { CATEGORIES } from "@/lib/dishes";

// Nested layout: the sidebar sits here, so it is NOT re-mounted when
// navigating between /menu and /menu/[slug]. It renders instantly because
// it needs no slow data.
export default function MenuLayout({ children }) {
  return (
    <div className="menu-shell">
      <Sidebar categories={CATEGORIES} />
      <div>{children}</div>
    </div>
  );
}