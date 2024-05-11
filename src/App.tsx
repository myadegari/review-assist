import { Routes,Route } from "react-router-dom";
import MainLayout from './mainLayout';
import Home from './Home';
import { baseURL, isolateBaseURL } from "./routes";
import About from "./About";
import ListOfAll from "./ListOfAll";
import List from "./List";

function App() {

  return (
    <>
    <Routes>
    <Route path={baseURL} element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path={isolateBaseURL+'about/'} element={<About />} />
      <Route path={isolateBaseURL+'list-of-all/'} element={<ListOfAll />}>
      <Route path={isolateBaseURL+'list-of-all/:id'} element={<List />}/>
        </Route>


    </Route>
    </Routes>

    </>
  )
}

export default App
