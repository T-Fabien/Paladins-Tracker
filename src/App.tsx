import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";

// @Component
import Navbar from "./components/Navbar";
import UnderConstruction from "./components/UnderConstruction";


// @Pages
import HomePage from './pages/Homepage';
import AllChampionsPage from './pages/AllChampions';
import ChampionPage from "./pages/ChampionPage";
import Tracker from "./pages/Tracker";

// Redux
import { store } from "./store";
import { Provider } from 'react-redux';
import { SessionLoader } from "./helper/SessionLoader";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="/paladins/champions" element={<AllChampionsPage />}/>
      <Route path="/paladins/champions/*" element={<ChampionPage />} />
      <Route path="/tracker" element={<Tracker />} />
      <Route path="*" element={<UnderConstruction />} />
    </Route>)
  );

  return (
    <Provider store={store}>
      <RouterProvider router={router}/>
      </Provider>
  );
}

// Router
const Root = () => {
  return <>
    <Navbar />
    <Outlet />
  </>;
};

export default App;
