import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div
      style={{ width: "100vw", padding: "0px 32px", boxSizing: "border-box" }}
    >
      <Header />
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
