import { FaCarSide, FaUser } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import "./side-bar.scss"
import { useSelector } from "react-redux"
import { MdAdminPanelSettings, MdMiscellaneousServices } from "react-icons/md"
const SideBar = () => {
    let adminMenu = useSelector(state => state.adminMenu.value)
    return (
        <>
            <div className={`side-bar ${adminMenu ? "" : "side-bar--active"}`}>
                <div className="side-bar__wrapper">
                    <ul className="side-bar__list">
                        <li className="side-bar__item">
                            <NavLink to={"/dashboard/employee"} className={`side-bar__link ${adminMenu ? "" : "side-bar__link--active"}`}>
                                <div className="side-bar__icon">
                                    <FaUser />
                                </div>
                                <span className="side-bar__text">Employee</span>
                            </NavLink>
                        </li>
                        <li className="side-bar__item">
                            <NavLink to={"/dashboard/admin"} className={`side-bar__link ${adminMenu ? "" : "side-bar__link--active"}`}>
                                <div className="side-bar__icon">
                                    <MdAdminPanelSettings />
                                </div>
                                <span className="side-bar__text">Admin</span>
                            </NavLink>
                        </li>
                        <li className="side-bar__item">
                            <NavLink to={"/dashboard/service"} className={`side-bar__link ${adminMenu ? "" : "side-bar__link--active"}`}>
                                <div className="side-bar__icon">
                                    <MdMiscellaneousServices />
                                </div>
                                <span className="side-bar__text">Service</span>
                            </NavLink>
                        </li>
                        <li className="side-bar__item">
                            <NavLink to={"/dashboard/car"} className={`side-bar__link ${adminMenu ? "" : "side-bar__link--active"}`}>
                                <div className="side-bar__icon">
                                    <FaCarSide />
                                </div>
                                <span className="side-bar__text">Car</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div >
        </>
    )
}

export default SideBar