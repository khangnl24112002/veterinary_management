import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <h1>Day la trang gioi thieu page hhaa</h1>
      <Link to="/login">Nhan vao day de vao trang dang nhap</Link>
    </div>
  );
};

export default Layout;
