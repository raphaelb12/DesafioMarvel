import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'

//páginas
import Home from './routes/Home';
import Characters from './routes/Characters.tsx';
import BuscarChar from './routes/BuscarChar.tsx'

const router = createBrowserRouter([{
  element: <App/>,
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/:id',
      element: <Characters />
    
    },
    {
      path: '/buscarChar',
      element: <BuscarChar />
      
    }
  ]
}])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
