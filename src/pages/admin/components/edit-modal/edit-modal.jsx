import "./edit-modal.scss";
import { CgClose } from "react-icons/cg";
import { memo, useEffect, useState } from "react";
import { useUpdateCategoryMutation } from "../../../../context/api/categoryApi";

const EditModal = ({ setModalEdit, modalEdit, isEdit, title }) => {
    const [editCategory, { isSuccess: categorySuccess }] = useUpdateCategoryMutation();
    const [editInput, setEditInput] = useState(modalEdit)
    useEffect(() => {
        if (categorySuccess) {
            setModalEdit(null)
        }
    }, [categorySuccess])

    const handelEdit = (e) => {
        e.preventDefault()
        if (isEdit) {
            editCategory({ body: editInput, id: editInput._id })
            setModalEdit(null)
        } else {
            editCategory(modalEdit)
        }
    }
    return (
        <div className="edit-modal" >
            <div onClick={() => setModalEdit(null)} className="edit-modal__overlay"></div>
            <div className="edit-modal__wrapper">
                <div className="edit-modal__top">
                    <h3 className="">{title}</h3>
                    <button onClick={() => setModalEdit(null)} className="edit-modal__close-btn"><CgClose /></button>
                </div>
                {
                    isEdit ?
                        <form onSubmit={handelEdit} className="edit-modal__form">
                            <div className="edit-modal__card-wrapper">
                                <label className="edit-modal__label" htmlFor="category-name">Full name</label>
                                <input value={editInput.title} onChange={(e) => setEditInput((prev => ({ ...prev, title: e.target.value })))} className="edit-modal__input" id="category-name" type="text" placeholder="Category Name" />
                            </div>
                            <div className="edit-modal__bottom">
                                <button type="button" onClick={() => setModalEdit(null)} className="edit-modal__button">Close</button>
                                <button type="submit" className="edit-modal__button">Edit</button>
                            </div>
                        </form>
                        :
                        <form className="edit-modal__form">
                        </form>
                }
            </div>
        </div>
    );
};

export default memo(EditModal)