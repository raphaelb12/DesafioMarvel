import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider} from 'react-router-dom'

//páginas
import Home from './routes/Home.tsx';
import Characters from './routes/Characters.tsx';
import CharactersList from './routes/CharactersList.tsx';
import Comics from './routes/Comics.tsx'
import ComicsView from './routes/ComicsView.tsx'
import MarvelEvents from './routes/MarvelEvents.tsx'
import MarvelEventsViewer from './routes/MarvelEventsViewer.tsx'

const router = createBrowserRouter([{
  element: <App/>,
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: 'characters/',
      element: <CharactersList />
    
    },
    {
      path: 'characters/:id',
      element: <Characters />
    
    },
    {
      path: '/comics/',
      element: <Comics />
    
    },
    {
      path: '/comics/:id',
      element: <ComicsView />
    
    },
    {
      path: '/events',
      element: <MarvelEvents />
    
    },
    {
      path: '/events/:id',
      element: <MarvelEventsViewer />
    
    },
  ]
}])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
