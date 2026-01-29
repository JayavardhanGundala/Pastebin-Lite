import Url from "./pages/Url"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Create from "./pages/Create"
import Get from "./pages/Get.jsx"
import Data from "./pages/Data.jsx"
function App() {
  const router=createBrowserRouter([
     {
      path:"/",
      element:<Url/>
     },
     {
      path:"/Create",
      element:<Create/>
     },
     {
      path:"/Get",
      element:<Get/>

     },{
      path:"/p/:id",
      element:<Data/>
     }

  ])



  return (
    <>
    <RouterProvider router={router}>

    </RouterProvider>
 
    </>
  )
}

export default App
