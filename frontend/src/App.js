import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./Theme";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import {Calendar, Contacts, Dashboard, Expense, FAQ, Geography, Login, Signup, Team } from "./pages";
import { ProtectedRoute, Sidebar, Topbar } from "./components";


function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<ProtectedRoutes isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

function ProtectedRoutes({ setIsCollapsed, isCollapsed }) {
  return (
    <ProtectedRoute>
      <Topbar setIsCollapsed={setIsCollapsed} />
      <div style={{ display: 'flex' }}>
        <Sidebar isCollapsed={isCollapsed} />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/geography" element={<Geography />} />
          </Routes>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default App;