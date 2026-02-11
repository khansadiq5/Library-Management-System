import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import Navbar from "./components/Navbar";
import { LibraryProvider } from "./context/LibraryContext";
import { UserProvider } from "./context/UserContext";
import AuthPage from "./pages/AuthPage"; 

function App() {
  return (
    <UserProvider>
      <LibraryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<><Navbar /> <Dashboard /></>} />
            <Route path="/books" element={<><Navbar /> <Books /></>} />
            <Route path="/add" element={<><Navbar /> <AddBook /></>} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </LibraryProvider>
    </UserProvider>
  );
}

export default App;
