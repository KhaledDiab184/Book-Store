
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import {  useAppSelector } from './redux/store'
import { ToastContainer } from 'react-toastify'


function App() {
const {isHide} =useAppSelector(state=>state.Hide)

  return (
    <>
    {isHide&&<Header/>}
  
      <Outlet></Outlet>
      <ToastContainer/>
    </>
  )
}

export default App
