import { Outlet } from "react-router-dom";

const FacultyLayout = () => {
  return (
    <div>
      <nav>This is Navbar</nav>
      <Outlet />
      <footer>This is Footer</footer>
    </div>
  );
};

export default FacultyLayout;
