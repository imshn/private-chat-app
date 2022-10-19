import LoginComponent from "./components/auth/Login";
import { Routes, Route } from "react-router-dom";
import UserState from "./context/auth/userState";
import Home from "./components/Home";
import Chat from "./components/Chats/Chat";
function App() {
  return (
    <UserState>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/" element={<Home chat={false} />} />
        <Route path="/:id" element={<Home chat={true} />} />
      </Routes>
    </UserState>
  );
}

export default App;
