import { memo, useEffect, useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import "./register.scss";
import { useRegisterMutation } from "../../context/api/login-registerApi";

const initialValues = {
    fname: "",
    lname: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: ""
};
const validationSchema = Yup.object({
    fname: Yup.string().required('First name is required'),
    lname: Yup.string().required('Last name is required'),
    phone: Yup.string().required('Phone number is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required')
});

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [registerAdmin, { isSuccess }] = useRegisterMutation()
    let navigate = useNavigate();
    useEffect(() => {
        if (isSuccess) {
            navigate('/login')
        }
        window.scrollTo(0, 0)
    }, [])
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            const { confirmPassword, phone, ...submitValues } = values;
            // Phone number format for API
            const formattedPhone = parsePhoneNumber(phone)?.number;
            submitValues.phone = formattedPhone;
            registerAdmin(submitValues);
        },
    });

    const getErrorClass = (field) =>
        formik.touched[field] && formik.errors[field] ? 'register__error' : '';

    return (
        <section className="register">
            <div className="register__wrapper">
                <h1 className="register__title">Register</h1>
                <form className="register__form" onSubmit={formik.handleSubmit}>
                    <div className="register__card">
                        <label
                            className={`register__label ${getErrorClass('fname')}`}
                            htmlFor="fname"
                        >
                            First name
                        </label>
                        <input
                            type="text"
                            id="fname"
                            className={`register__input ${getErrorClass('fname')}`}
                            placeholder="Enter your first name"
                            {...formik.getFieldProps('fname')}
                        />
                    </div>
                    <div className="register__card">
                        <label
                            className={`register__label ${getErrorClass('lname')}`}
                            htmlFor="lname"
                        >
                            Last name
                        </label>
                        <input
                            type="text"
                            id="lname"
                            className={`register__input ${getErrorClass('lname')}`}
                            placeholder="Enter your last name"
                            {...formik.getFieldProps('lname')}
                        />
                    </div>
                    <div className="register__card">
                        <label
                            className={`register__label ${getErrorClass('phone')}`}
                            htmlFor="phone"
                        >
                            Phone
                        </label>
                        <PhoneInput
                            id="phone"
                            placeholder="Enter your phone number"
                            value={formik.values.phone}
                            onChange={(value) => formik.setFieldValue('phone', value)}
                            className={`register__input-phone-wrapper ${getErrorClass('phone')}`}
                            international
                            defaultCountry="UZ"
                        />
                    </div>
                    <div className="register__card">
                        <label
                            className={`register__label ${getErrorClass('username')}`}
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className={`register__input ${getErrorClass('username')}`}
                            placeholder="Enter your username"
                            {...formik.getFieldProps('username')}
                        />
                    </div>
                    <div className="register__card">
                        <label
                            className={`register__label ${getErrorClass('password')}`}
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="register__password-eye">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className={`register__input ${getErrorClass('password')}`}
                                placeholder="Enter your password"
                                {...formik.getFieldProps('password')}
                            />
                            <button type="button" onClick={() => setShowPassword(p => !p)} className="register__password-eye-btn">
                                {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                            </button>
                        </div>
                    </div>
                    <div className="register__card">
                        <label
                            className={`register__label ${getErrorClass('confirmPassword')}`}
                            htmlFor="confirmPassword"
                        >
                            Confirm password
                        </label>
                        <div className="register__password-eye">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="confirmPassword"
                                className={`register__input ${getErrorClass('confirmPassword')}`}
                                placeholder="Enter your confirm password"
                                {...formik.getFieldProps('confirmPassword')}
                            />
                            <button type="button" onClick={() => setShowPassword(p => !p)} className="register__password-eye-btn">
                                {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="register__btn">Submit</button>
                    <div className="register__context">
                        <p className="register__context-text">{"Don't"} have an account?</p>
                        <Link to="/login" className="register__context-link">Login</Link>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default memo(Register);
