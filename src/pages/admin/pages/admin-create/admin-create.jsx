import { message } from "antd";
import { memo, useEffect, useState } from "react";
import "./admin-create.scss";
import { useCreateEmployeeMutation } from "../../../../context/api/employeeApi";
import { useCreateAdminMutation } from "../../../../context/api/adminApi";

const initialState = {
    email: "",
    password: "",
};

const AdminCreate = () => {
    const [employeeData, setEmployeeData] = useState(initialState);
    const [messageApi, contextHolder] = message.useMessage();
    const [createAdmin, { isLoading, isSuccess }] = useCreateAdminMutation();

    useEffect(() => {
        if (isSuccess) {
            setEmployeeData(initialState);
        }
    }, [isSuccess]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = employeeData;

        if (email && password) {
            try {
                await createAdmin(employeeData).unwrap();
                messageApi.success({
                    content: 'Admin created successfully!',
                    duration: 3,
                    style: { marginTop: '2px' },
                });
            } catch (error) {
                messageApi.error({
                    content: 'Failed to create admin. Please try again!',
                    duration: 3,
                    style: { marginTop: '2px' },
                });
            }
        } else {
            messageApi.error({
                content: 'Please fill in all fields!',
                duration: 3,
                style: { marginTop: '2px' },
            });
        }
    };

    return (
        <>
            {contextHolder}
            <div className="admin-create">
                <div className="admin-create__wrapper container">
                    <h1 className="admin-create__title">Create Admin</h1>
                    <form onSubmit={handleFormSubmit} className="admin-create__form">
                        <div className="admin-create__card">
                            <label className="admin-create__label" htmlFor="email">Email</label>
                            <input
                                name="email"
                                value={employeeData.email}
                                onChange={handleInputChange}
                                className="admin-create__input"
                                id="email"
                                type="email"
                                placeholder="Enter employee's email"
                                required
                            />
                        </div>
                        <div className="admin-create__card">
                            <label className="admin-create__label" htmlFor="password">Password</label>
                            <input
                                name="password"
                                value={employeeData.password}
                                onChange={handleInputChange}
                                className="admin-create__input"
                                id="password"
                                type="password"
                                placeholder="Enter employee's password"
                                required
                            />
                        </div>
                        <div className="admin-create__button-wrapper">
                            <button
                                type="submit"
                                className="admin-create__button"
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating..." : "Create Admin"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default memo(AdminCreate);
