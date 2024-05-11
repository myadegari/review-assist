import { Routes,Route } from "react-router-dom";
import MainLayout from './mainLayout';
import Home from './Home';
import { baseURL } from "./routes";
import About from "./About";
import ListOfAll from "./ListOfAll";
import List from "./List";

function App() {

  return (
    <>
    <Routes>
    <Route path={baseURL} element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path={baseURL+'about/'} element={<About />} />
      <Route path={baseURL+'list-of-all/'} element={<ListOfAll />}>
      <Route path={baseURL+'list-of-all/:id'} element={<List />}/>
        </Route>


    </Route>
    </Routes>

    </>
  )
}

export default App
