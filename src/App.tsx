import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import HomePage from './page/Home'
import RootPage from './page/Root';
import ErrorPage from './page/Error';
import MoviePage from './page/Movie';

const routers = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,

    children: [
      { path: "/", element: <HomePage/> },
      { path: "/movie", element: <MoviePage/> },
      
    ],
    errorElement:<ErrorPage/>
  },
]);

function App() {
  return (
       <RouterProvider router={routers}/>
  )
}

export default App
