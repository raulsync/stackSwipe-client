import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Onboard from "./components/Onboard";
import Chat from "./components/Chat";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          path="/"
          element={<Onboard />}
        />
        <Route
          path="/"
          element={<Body />}
        >
          <Route
            path="/feed"
            element={<Feed />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/connections"
            element={<Connections />}
          />
          <Route
            path="/requests"
            element={<Requests />}
          />
          <Route
            path="/chat/:senderId"
            element={<Chat />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
