import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

const App = () => {
  return (
    <ProtectedRoute role={undefined}>
      <MainLayout />;
    </ProtectedRoute>
  );
};

export default App;
