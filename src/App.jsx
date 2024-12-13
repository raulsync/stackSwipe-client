import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connections from "./components/Connections";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          path="/"
          element={<Body />}
        >
          <Route
            path="/"
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
            path="/requests"
            element=""
          />
          <Route
            path="/connections"
            element={<Connections />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
