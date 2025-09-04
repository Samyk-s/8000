"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { store } from "@/redux-store/store/store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SidebarProvider>{children}</SidebarProvider>
    </Provider>
  );
}
