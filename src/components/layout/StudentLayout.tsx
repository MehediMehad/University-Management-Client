import { Outlet } from "react-router-dom";

const StudentLayout = () => {
  return (
    <div>
      <nav>This is Navbar</nav>
      <Outlet />
      <footer>This is Footer</footer>
    </div>
  );
};

export default StudentLayout;
