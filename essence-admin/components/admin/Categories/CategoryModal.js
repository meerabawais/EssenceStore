"use client";
import {useState,useEffect} from 'react';
export default function CategoryModal({category,onClose,onSave}){
    const [formData, setFormData] = useState(category);
    useEffect(() => {
        setFormData(category);
    },[category]);
    if (!formData) return null;
    function handleChange(e){
        const {name, value,type,checked} = e.target;
           setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    }
     return (

        <div
            className="modal fade show"
            style={{
                display: "block",
                background: "rgba(0,0,0,.5)"
            }}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">

                            {formData.id
                                ? "Edit Category"
                                : "Add Category"}

                        </h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body">

                        <div className="mb-3">

                            <label className="form-label">

                                Category Name

                            </label>

                            <input
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="form-check">

                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="status"
                                checked={formData.status}
                                onChange={handleChange}
                            />

                            <label className="form-check-label">

                                Active

                            </label>

                        </div>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn-success"
                            onClick={() => onSave(formData)}
                        >
                            Save
                        </button>

                    </div>

                </div>

            </div>

        </div>
     );
}
