import React, { useState } from 'react';
import "./car-manage.scss";
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';
import DeleteModal from '../../components/delete-modal/delete-modal';
import { useNavigate } from 'react-router-dom';
import { useGetCarsQuery } from '../../../../context/api/carApi';

const CarManage = () => {
    const [deleteEmployee, setDeleteEmployee] = useState(null);
    const navigate = useNavigate();
    const { data } = useGetCarsQuery()
    console.log(data);

    return (
        <>
            <div className='car-manage'>
                <div className='car-manage__wrapper container'>
                    <div className='car-manage__content'>
                        <h1 className='car-manage__title'>Car</h1>
                        <button onClick={() => navigate("/dashboard/car/create")} className='car-manage__btn'>Add Car</button>
                    </div>
                    <table className='car-manage__table'>
                        <thead className='car-manage__thead'>
                            <tr className='car-manage__thead-tr'>
                                <th className='car-manage__th'>Id</th>
                                <th className='car-manage__th'>State Number</th>
                                <th className='car-manage__th'>Model</th>
                                <th className='car-manage__th'>Name</th>
                                <th className='car-manage__th'>Type</th>
                                <th className='car-manage__th'>Engine Number</th>
                                <th className='car-manage__th'>Horsepower</th>
                                <th className='car-manage__th'>Color</th>
                                <th className='car-manage__th'>Car Year</th>
                                <th className='car-manage__th'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='car-manage__tbody'>
                            {
                                data?.cars?.map((car, index) => (
                                    <tr className='car-manage__tbody-tr' key={car.id}>
                                        <td className='car-manage__td'><p className='car-manage__td-id'>{index + 1}</p></td>
                                        <td className='car-manage__td'><p className='car-manage__td-state-number'>{car.davlat_raqami}</p></td>
                                        <td className='car-manage__td'><p className='car-manage__td-model'>{car.model}</p></td>
                                        <td className='car-manage__td'><p className='car-manage__td-name'>{car.nomi}</p></td>
                                        <td className='car-manage__td'><p className='car-manage__td-type'>{car.turi}</p></td>
                                        <td className='car-manage__td'><p className='car-manage__td-engine-number'>{car.dvigitel_raqami}</p></td>
                                        <td className='car-manage__td'><p className='car-manage__td-horsepower'>{car.ot_kuchi}</p></td>
                                        <td className='car-manage__td'><p className='car-manage__td-color'>{car.rangi}</p></td>
                                        <td className='car-manage__td'><p className='car-manage__td-year'>{car.mashina_yili}</p></td>
                                        <td className='car-manage__td'>
                                            <div className='car-manage__td-action'>
                                                <button className='car-manage__td-btn'><MdOutlineEdit /></button>
                                                <button onClick={() => setDeleteEmployee(car.id)} className='car-manage__td-btn'><MdOutlineDelete /></button>
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
                deleteEmployee && <DeleteModal setModalDelete={setDeleteEmployee} modalDelete={deleteEmployee} isDelete={true} title={"Car"} desc={"Are you sure you want to delete this car?"} />
            }
        </>
    );
}

export default CarManage;
