import { Routes, Route } from "react-router-dom";
// COMPONENTS
import Landing from "./components/Landing";
import Nav from "./components/Nav";
import NotFound from "./components/404";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import PokemonDetail from "./components/PokemonDetail";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
