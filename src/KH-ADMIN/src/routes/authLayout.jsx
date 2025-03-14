import { Outlet, Navigate } from "react-router-dom"
import { UseStateContext } from "../contexts/contextProvider"

const authLayout = () => {

  const { token } = UseStateContext();

  if (token){
    return <Navigate to="/" />
  }

  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default authLayout
