import { memo, useState } from "react";
import { CgClose } from "react-icons/cg";
import "./profile-edit-modal.scss";
import { useUpdateProfileMutation } from "../../../../../../context/api/profileApi";
const ProfileEditModal = ({ setProfileEdit, profile, data }) => {
    const [profileData, setProfileData] = useState(profile);
    const [profileEdit, { isLoading }] = useUpdateProfileMutation();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleProfileEdit = (e) => {
        e.preventDefault();
        let { fname, lname, phone, username } = profileData

        profileEdit({ body: { fname, lname, phone, username } });
        setProfileEdit(null);
    };

    return (
        <div className="edit-modal">
            <div onClick={() => setProfileEdit(null)} className="edit-modal__overlay"></div>
            <div className="edit-modal__wrapper edit-modal__wrapper--profile">
                <div className="edit-modal__top">
                    <h3>Edit Profile</h3>
                    <button onClick={() => setProfileEdit(null)} className="edit-modal__close-btn"><CgClose /></button>
                </div>
                <form onSubmit={handleProfileEdit} className="edit-modal__form">
                    <div className="edit-modal__card-wrapper">
                        <label className="edit-modal__label" htmlFor="fname">First Name</label>
                        <input
                            name="fname"
                            value={profileData.fname}
                            onChange={handleInputChange}
                            className="edit-modal__input"
                            id="fname"
                            type="text"
                            placeholder="First Name"
                        />
                    </div>
                    <div className="edit-modal__card-wrapper">
                        <label className="edit-modal__label" htmlFor="lname">Last Name</label>
                        <input
                            name="lname"
                            value={profileData.lname}
                            onChange={handleInputChange}
                            className="edit-modal__input"
                            id="lname"
                            type="text"
                            placeholder="Last Name"
                        />
                    </div>
                    <div className="edit-modal__card-wrapper">
                        <label className="edit-modal__label" htmlFor="phone">Phone</label>
                        <input
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            className="edit-modal__input"
                            id="phone"
                            type="text"
                            placeholder="Phone"
                        />
                    </div>
                    <div className="edit-modal__card-wrapper">
                        <label className="edit-modal__label" htmlFor="username">Username</label>
                        <input
                            name="username"
                            value={profileData.username}
                            onChange={handleInputChange}
                            className="edit-modal__input"
                            id="username"
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                    <div className="edit-modal__bottom">
                        <button type="button" onClick={() => setProfileEdit(null)} className="edit-modal__button">Close</button>
                        <button type="submit" disabled={isLoading} className="edit-modal__button">Edit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default memo(ProfileEditModal);
