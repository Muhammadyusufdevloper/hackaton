import { Navigate, Outlet } from "react-router-dom"
import AdminHeader from "../admin/components/admin-header/admin-header"
import { useSelector } from "react-redux"
import { memo } from "react"

const Auth = () => {
    let isLogin = useSelector(state => state.auth.token)
    console.log(isLogin);
    return isLogin ? <>
        <AdminHeader />
        <Outlet />
    </> : <Navigate to="/login" replace />
}
export default memo(Auth)