import React, { useState } from 'react'
import "./employee-manage.scss"
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'
import DeleteModal from '../../components/delete-modal/delete-modal'
import { useNavigate } from 'react-router-dom'
import { useGetEmployeesQuery } from '../../../../context/api/employeeApi'
const EmployeeManage = () => {
    const [deleteEmployee, setDeleteEmployee] = useState(null)
    const { data } = useGetEmployeesQuery()
    console.log(data);
    const navigate = useNavigate()
    return (
        <>
            <div className='employee-manage'>
                <div className='employee-manage__wrapper container'>
                    <div className='employee-manage__content'>
                        <h1 className='employee-manage__title'>Employee</h1>
                        <button onClick={() => navigate("/dashboard/employee/create")} className='employee-manage__btn'>Add Employee</button>
                    </div>
                    <table className='employee-manage__table'>
                        <thead className='employee-manage__thead'>
                            <tr className='employee-manage__thead-tr'>
                                <th className='employee-manage__th'>Id</th>
                                <th className='employee-manage__th'>Full name</th>
                                <th className='employee-manage__th'>Email</th>
                                <th className='employee-manage__th'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='employee-manage__tbody'>
                            {
                                data?.admins?.map((employee, index) => (
                                    <tr className='employee-manage__tbody-tr'>
                                        <td className='employee-manage__td'><p className='employee-manage__td-id'>{index + 1}</p></td>
                                        <td className='employee-manage__td'><p className='employee-manage__td-name'>{employee?.fullname}</p></td>
                                        <td className='employee-manage__td'><p className='employee-manage__td-email'>{employee?.email}</p></td>
                                        <td className='employee-manage__td'>
                                            <div className='employee-manage__td-action'>
                                                <button className='employee-manage__td-btn'><MdOutlineEdit /></button>
                                                <button onClick={() => setDeleteEmployee(1)} className='employee-manage__td-btn'><MdOutlineDelete /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                deleteEmployee && <DeleteModal setModalDelete={setDeleteEmployee} modalDelete={deleteEmployee} isDelete={true} title={"Employee"} desc={"Are you sure you want to delete this employee?"} />
            }
        </>
    )
}

export default EmployeeManage