import { memo, useState } from "react";
import PropTypes from "prop-types";
import { CgClose } from "react-icons/cg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./profile-edit-modal.scss";

const PasswordEditModal = ({ setPasswordEdit }) => {
    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const toggleShowPassword = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().required("Old Password is required"),
            newPassword: Yup.string().required("New Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("newPassword")], "Passwords must match")
                .required("Confirm Password is required"),
        }),
        onSubmit: (values) => {
            const { oldPassword, newPassword } = values;

            console.log({ oldPassword, newPassword });
            setPasswordEdit(null);
        },
    });

    return (
        <div className="edit-modal">
            <div onClick={() => setPasswordEdit(null)} className="edit-modal__overlay"></div>
            <div className="edit-modal__wrapper edit-modal__wrapper--profile">
                <div className="edit-modal__top">
                    <h3>Edit Password</h3>
                    <button onClick={() => setPasswordEdit(null)} className="edit-modal__close-btn">
                        <CgClose />
                    </button>
                </div>
                <form onSubmit={formik.handleSubmit} className="edit-modal__form">
                    {['oldPassword', 'newPassword', 'confirmPassword'].map((field) => (
                        <div key={field} className="edit-modal__card-wrapper">
                            <label
                                className={`edit-modal__label ${formik.touched[field] && formik.errors[field] ? "edit-modal__label--error" : ""}`}
                                htmlFor={field}
                            >
                                {field === "oldPassword" ? "Old Password" : field === "newPassword" ? "New Password" : "Confirm Password"}
                            </label>
                            <div className="edit-modal__input-group">
                                <input
                                    name={field}
                                    value={formik.values[field]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type={showPassword[field] ? "text" : "password"}
                                    className={`edit-modal__input ${formik.touched[field] && formik.errors[field] ? "edit-modal__input--error" : ""}`}
                                    id={field}
                                    placeholder={field === "oldPassword" ? "Old Password" : field === "newPassword" ? "New Password" : "Confirm Password"}
                                />
                                <span
                                    onClick={() => toggleShowPassword(field)}
                                    className="edit-modal__eye-icon"
                                >
                                    {showPassword[field] ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {formik.touched[field] && formik.errors[field] ? (
                                <div className="edit-modal__error-message">{formik.errors[field]}</div>
                            ) : null}
                        </div>
                    ))}
                    <div className="edit-modal__bottom">
                        <button type="button" onClick={() => setPasswordEdit(null)} className="edit-modal__button">
                            Close
                        </button>
                        <button type="submit" className="edit-modal__button">
                            Edit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

PasswordEditModal.propTypes = {
    setPasswordEdit: PropTypes.func.isRequired,
};

export default memo(PasswordEditModal);
