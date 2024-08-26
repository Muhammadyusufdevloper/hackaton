import React, { useState } from 'react'
import "./admin-manage.scss"
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'
import DeleteModal from '../../components/delete-modal/delete-modal'
import { useNavigate } from 'react-router-dom'
import { useGetAdminsQuery } from '../../../../context/api/adminApi'
const AdminManage = () => {
    const [deleteEmployee, setDeleteEmployee] = useState(null)
    const { data } = useGetAdminsQuery()
    console.log(data);
    const navigate = useNavigate()
    return (
        <>
            <div className='admin-manage'>
                <div className='admin-manage__wrapper container'>
                    <div className='admin-manage__content'>
                        <h1 className='admin-manage__title'>Admin</h1>
                        <button onClick={() => navigate("/dashboard/admin/create")} className='admin-manage__btn'>Add Admin</button>
                    </div>
                    <table className='admin-manage__table'>
                        <thead className='admin-manage__thead'>
                            <tr className='admin-manage__thead-tr'>
                                <th className='admin-manage__th'>Id</th>
                                <th className='admin-manage__th'>Email</th>
                                <th className='admin-manage__th'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='admin-manage__tbody'>
                            {
                                data?.admins?.map((admin, index) => (
                                    <tr key={admin.id} className='admin-manage__tbody-tr'>
                                        <td className='admin-manage__td'><p className='admin-manage__td-id'>{index + 1}</p></td>
                                        <td className='admin-manage__td'><p className='admin-manage__td-email'>qgOo0@example.com</p></td>
                                        <td className='admin-manage__td'>
                                            <div className='admin-manage__td-action'>
                                                <button className='admin-manage__td-btn'><MdOutlineEdit /></button>
                                                <button onClick={() => setDeleteEmployee(1)} className='admin-manage__td-btn'><MdOutlineDelete /></button>
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
                deleteEmployee && <DeleteModal setModalDelete={setDeleteEmployee} modalDelete={deleteEmployee} isDelete={true} title={"Admin"} desc={"Are you sure you want to delete this employee?"} />
            }
        </>
    )
}

export default AdminManage