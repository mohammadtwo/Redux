import { Link, Route, Routes } from "react-router-dom"
import { Home } from "./components/home/home"
import { Auth } from "./components/auth/auth";


function App() {

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/auth" element={<Auth/>} />
        <Route
          path="*"
          element={
            <div className="h-screen grid place-items-center text-9xl">
              404
              <Link to={"/"} className="text-2xl">
                back home
              </Link>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App
