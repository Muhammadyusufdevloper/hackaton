import { message } from "antd";
import { memo, useEffect, useState } from "react";
import "./employee-create.scss";
import { useCreateEmployeeMutation } from "../../../../context/api/employeeApi";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
}

const EmployeeCreate = () => {
    const [employeeData, setEmployeeData] = useState(initialState);
    const [messageApi, contextHolder] = message.useMessage();
    const [employeeCreate, { data, isLoading, isSuccess }] = useCreateEmployeeMutation();
    useEffect(() => {
        setEmployeeData(initialState);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCategory = (e) => {
        e.preventDefault();
        let { firstName, lastName, email, password } = employeeData;

        if (firstName && lastName && email && password) {
            employeeCreate({ fullname: `${firstName} ${lastName}`, email, password });
            messageApi.success({
                content: 'Employee created successfully!',
                duration: 3,
                style: {
                    marginTop: '2px',
                },
            });
            setEmployeeData(initialState);
        } else {
            messageApi.error({
                content: 'Please fill in all fields!',
                duration: 3,
                style: {
                    marginTop: '2px',
                },
            });
        }
    };

    return (
        <>
            {contextHolder}
            <div className="employee-create">
                <div className="employee-create__wrapper container">
                    <h1 className="employee-create__title">Employee Create</h1>
                    <form onSubmit={handleCategory} className="employee-create__form">
                        <div className="employee-create__card">
                            <label className="employee-create__label" htmlFor="first-name">First name</label>
                            <input
                                name="firstName"
                                value={employeeData.firstName}
                                onChange={handleInputChange}
                                className="employee-create__input"
                                id="first-name"
                                type="text"
                                placeholder="Employee First Name"
                            />
                        </div>
                        <div className="employee-create__card">
                            <label className="employee-create__label" htmlFor="last-name">Last name</label>
                            <input
                                name="lastName"
                                value={employeeData.lastName}
                                onChange={handleInputChange}
                                className="employee-create__input"
                                id="last-name"
                                type="text"
                                placeholder="Employee Last Name"
                            />
                        </div>
                        <div className="employee-create__card">
                            <label className="employee-create__label" htmlFor="email">Email</label>
                            <input
                                name="email"
                                value={employeeData.email}
                                onChange={handleInputChange}
                                className="employee-create__input"
                                id="email"
                                type="email"
                                placeholder="Employee Email"
                            />
                        </div>
                        <div className="employee-create__card">
                            <label className="employee-create__label" htmlFor="password">Password</label>
                            <input
                                name="password"
                                value={employeeData.password}
                                onChange={handleInputChange}
                                className="employee-create__input"
                                id="password"
                                type="password"
                                placeholder="Employee Password"
                            />
                        </div>
                        <div className="employee-create__button-wrapper">
                            <button type="submit" className="employee-create__button">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default memo(EmployeeCreate);
