import { Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks";
// COMPONENTS
import { 
  Landing, 
  Nav, 
  NotFound, 
  Register, 
  Login, 
  Home, 
  PokemonDetail,
  Preloader,
  Favourites,
  FavouriteDetail
} from "./components";
import ProtectedRoute from "./components/ProtectedRoute";
import GlobalLoading from "./components/GlobalLoading";

function App() {
  const { loading } = useAuth();

  // Show loading while auth context initializes
  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <Preloader size="big" color="blue" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <GlobalLoading />
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/favourites" element={
          <ProtectedRoute>
            <Favourites />
          </ProtectedRoute>
        } />
        <Route path="/favourites/:favouriteId" element={
          <ProtectedRoute>
            <FavouriteDetail />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pokemon/:id" element={
          <ProtectedRoute>
            <PokemonDetail />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
