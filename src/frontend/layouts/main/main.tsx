import NiceModal from "@ebay/nice-modal-react";
import { Outlet } from "react-router-dom";
import MainHeader from "./main.header";

export default function MainLayout() {
  return (
    <NiceModal.Provider>
      <div className="flex min-h-svh flex-col ">
        <MainHeader />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </NiceModal.Provider>
  );
}
