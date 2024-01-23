"use client"
import {
  CalendarDays,
  Layout,
  LayoutGrid,
  Settings,
  TicketPlus,
} from "lucide-react";

import { SidebarItem } from "./sidebar-items";

const Routes = [
  {
    icon: Layout,
    label: "Home",
    href: "/",
  },
  {
    icon: LayoutGrid,
    label: "Categories",
    href: "/categories",
  },
  {
    icon: CalendarDays,
    label: "Calender",
    href: "/calender",
  },
  {
    icon: TicketPlus,
    label: "Events",
    href: "/events",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
  
];

export const SidebarRoutes = () => {
  return (
    <div className="flex flex-col w-full">
      {Routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};