import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import "./App.css";
import NotFound from "./Components/NotFound/NotFound";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import Protected from "./Components/Protected/Protected";


function App() {
  const routes = createHashRouter([
    { path: "*", element: <NotFound/>},
    { path: "layout", element: <Layout/>},
    {path:"", element:<Layout/>,children:[
      {index:true, element:<Register/>},
      {path:"register", element:<Register/>},
      {path:"login", element:<Login/>},
      {path:"home", element:<Protected><Home/></Protected>},
    ]},
   
   
  ]);
  return (
    <>
     <RecoilRoot>
     <RouterProvider router={routes} />
     </RecoilRoot>
      
      <Toaster/>
    </>
  );
}

export default App;
