import { lazy, memo } from "react"
import { Route, Routes } from "react-router-dom"
import Admin from "./pages/admin/admin"
import Auth from "./pages/auth/auth"
import Profile from "./pages/admin/pages/profile/profile"
import Service from "./pages/admin/pages/service/service"
import EmployeeCreate from "./pages/admin/pages/employee-create/employee-create"
import AdminCreate from "./pages/admin/pages/admin-create/admin-create"
import EmployeeManage from "./pages/admin/pages/employee-manage/employee-manage"
import AdminManage from "./pages/admin/pages/admin-manage/admin-manage"
import CarManage from "./pages/admin/pages/car-manage/car-manage"
import CarCreate from "./pages/admin/pages/car-create/car-create"
const Login = lazy(() => import("./pages/login/login"))
const Register = lazy(() => import("./pages/register/register"))

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="dashboard" element={<Admin />} >
            <Route path="service" element={<Service />} />
            <Route path="employee" element={<EmployeeManage />} />
            <Route path="employee/create" element={<EmployeeCreate />} />
            <Route path="admin/create" element={<AdminCreate />} />
            <Route path="admin" element={<AdminManage />} />
            <Route path="car" element={<CarManage />} />
            <Route path="car/create" element={<CarCreate />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default memo(App)