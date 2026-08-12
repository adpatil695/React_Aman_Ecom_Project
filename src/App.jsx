
import { createContext, useState } from 'react'
import './App.css'
import { AppRoutes } from './routes/AppRoutes'
import './components/Header/Header.css'
import store from './redux toolkit/store'
import { Provider } from 'react-redux'


// eslint-disable-next-line react-refresh/only-export-components
export const modeAPI = createContext()


function App() 
{
  const[modeValue,setModeValue]=useState(false)
  const handleModeChange=()=>
  {
    setModeValue(!modeValue)
    
  } 

  const themeClass= modeValue ? 'dark' : 'light';
  return (
    <>
      <Provider store={store}>
        <modeAPI.Provider
          value={{
            handleModeChange,
            modeValue,
            themeClass,
          }}
        >
          <div className={themeClass}>
            <AppRoutes />
          </div>
        </modeAPI.Provider>
      </Provider>
    </>
  )
}

export default App
