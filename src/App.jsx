// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Navbar from './components/Navbar'
// import Home from './components/Manager'
// import Passwords from './components/Passwords'
// import Generator from './components/Generator'
// import Footer from './components/Footer'
// import NotFound from './components/NotFound'

// function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <>
//         <Navbar />
//         <Home />
//       </>
//     },
//     {
//       path: "/passwords",
//       element: <>
//         <Navbar />
//         <Passwords />
//       </>
//     },
//     {
//       path: "/generator",
//       element: <>
//         <Navbar />
//         <Generator />
//       </>
//     },
//     {
//     path: "*",  
//     element: <NotFound />
//     }
//   ])

//   return (
//     <div className="min-h-screen bg-pink-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
//         <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-pink-400 opacity-20 blur-[100px]"></div>
//         <div className='min-h-[calc(100vh-112px)]'>
//         <RouterProvider router={router} />
//         </div>
//         <Footer />
//     </div>
//   )
// }

// export default App

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Manager'
import Passwords from './components/Passwords'
import Generator from './components/Generator'
import Footer from './components/Footer'
import NotFound from './components/NotFound'

// 1. Create a Layout component to hold UI that repeats (Nav & Footer)
const AppLayout = () => {
  return (
    <>
      <Navbar />
      {/* Outlet renders the child route matching the URL (Home, Passwords, etc.) */}
      <div className='min-h-[calc(100vh-215px)]'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />, // Apply the layout to everything
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/passwords",
          element: <Passwords />
        },
        {
          path: "/generator",
          element: <Generator />
        },
        // 2. The 404 page is now a child of the layout, so it keeps the Navbar!
        {
          path: "*",
          element: <NotFound />
        }
      ]
    }
  ])

  return (
    <div className="min-h-screen bg-pink-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-pink-400 opacity-20 blur-[100px]"></div>
        
        {/* RouterProvider now contains everything via AppLayout */}
        <RouterProvider router={router} />
    </div>
  )
}

export default App