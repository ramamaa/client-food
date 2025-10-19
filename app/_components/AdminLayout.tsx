import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div>
        <Header />
      </div>
      {children}
      <div>
        <Footer />
      </div>
    </div>
  );
};
