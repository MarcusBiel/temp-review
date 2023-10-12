import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import MainLayout from "./layouts/main";
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";
import RequireAuth from "./components/RequireAuth";
import SessionStorageAdapter from "./utils/sessionStorageAdapter";

function App() {
  return (
    <AuthProvider storageAdapter={SessionStorageAdapter}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<HomePage />} path="/" />
          <Route
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
            path="/profile"
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
