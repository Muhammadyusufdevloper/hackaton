import { useState } from "react";
import { useGetProfileQuery } from "../../../../context/api/profileApi";
import "./profile.scss";
import userImage from "../../../../assets/image/profile/user.webp";
import { MdEdit } from "react-icons/md";
import ProfileEditModal from "./components/edit-modal/profile-edit-modal";
import PasswordEditModal from "./components/edit-modal/password-edit-modal";
const Profile = () => {
    const { data, isLoading, isFetching, isError } = useGetProfileQuery();
    const [isPasswordEdit, setPasswordEdit] = useState(false);
    const [isProfileEdit, setProfileEdit] = useState(false);

    let profile = data?.payload;

    if (isLoading || isFetching || isError) {
        return <div className="product-manage__loading"><span className="loader"></span></div>;
    }

    return (
        <>
            <div className="profile">
                <div className="profile__wrapper">
                    <div className="profile__image-box">
                        <img src={userImage} alt="user default image" />
                    </div>
                    <div className="profile__cards">
                        <div className="profile__card">
                            <p className="profile__text">Full name</p>
                            <h3 className="profile__title">{profile?.fname + " " + profile?.lname}</h3>
                        </div>
                        <div className="profile__card">
                            <p className="profile__text">Username</p>
                            <h3 className="profile__title">{profile?.username}</h3>
                        </div>
                        <div className="profile__card">
                            <p className="profile__text">Phone</p>
                            <h3 className="profile__title">{profile?.phone}</h3>
                        </div>
                        <div className="profile__card">
                            <p className="profile__text">Created At</p>
                            <h3 className="profile__title">{profile?.createdAt.split("T")[0]}</h3>
                        </div>
                    </div>
                    <button onClick={() => setProfileEdit(true)} className="profile__edit-btn"><MdEdit /></button>
                </div>
                <div className="profile__password">
                    <p className="profile__text">Password</p>
                    <h3 className="profile__title">********</h3>
                    <button onClick={() => setPasswordEdit(true)} className="profile__edit-btn"><MdEdit /></button>
                </div>
            </div>
            {isProfileEdit && <ProfileEditModal setProfileEdit={setProfileEdit} profile={profile} />}
            {isPasswordEdit && <PasswordEditModal setPasswordEdit={setPasswordEdit} />}
        </>
    );
};

export default Profile;
