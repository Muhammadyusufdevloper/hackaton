import { Outlet } from "react-router-dom"
import SideBar from "./components/side-bar/side-bar"
import "./admin.scss"
import { useSelector } from "react-redux"
const Admin = () => {
    let adminMenu = useSelector(state => state.adminMenu.value)
    return (
        <>
            <section className={`admin ${adminMenu ? "" : "admin--active"}`}>
                <SideBar />
                <Outlet />
            </section>
        </>
    )
}

export default Admin