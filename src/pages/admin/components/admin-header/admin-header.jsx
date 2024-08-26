import { Link } from "react-router-dom";
import { TbMenu2 } from "react-icons/tb";
import { Dropdown, Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../context/slices/authSlice";
import "./admin-header.scss";
import { toggleAdminMenu } from "../../../../context/slices/adminMenu";
const AdminHeader = () => {
    let dispatch = useDispatch();
    const menu = (
        <Menu>
            <Menu.Item key="profile">
                <Link to="/admin/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="login">
                <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="logout">
                <button onClick={() => dispatch(logout())}>Logout</button>
            </Menu.Item>
        </Menu>
    );
    let adminMenu = useSelector(state => state.adminMenu.value)
    return (
        <>
            <header className="admin-header">
                <div className="admin-header__wrapper">
                    <div className="admin-header__logo-box">
                        <Link to={"/"}>
                            <h1>Bajaramiz</h1>
                        </Link>
                    </div>
                    <div className="admin-header__menu">
                        <button type="button" onClick={() => dispatch(toggleAdminMenu(adminMenu ? false : true))} className="admin-header__menu-btn">
                            <TbMenu2 />
                        </button>
                        <div className="admin-header__profile">
                            <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                                <Avatar
                                    size="large"
                                    icon={<UserOutlined />}
                                    style={{ cursor: 'pointer', backgroundColor: "#000" }}

                                />
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default AdminHeader;
