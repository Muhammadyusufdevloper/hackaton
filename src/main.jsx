import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './context/index.js'
import WindowLoading from './components/window-loading/window-loading.jsx'
const App = lazy(() => import("./App.jsx"))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<WindowLoading />}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </Suspense>
  </StrictMode>,
)
