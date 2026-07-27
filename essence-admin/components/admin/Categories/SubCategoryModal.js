"use client";

import { useState, useEffect } from "react";

export default function SubCategoryModal({
    subCategory,
    categories,
    onClose,
    onSave,
}) {

    const [formData, setFormData] = useState(subCategory);

    useEffect(() => {
        setFormData(subCategory);
    }, [subCategory]);

    if (!formData) return null;

    function handleChange(e) {

        const { name, value, type, checked } = e.target;

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
                background: "rgba(0,0,0,.5)",
            }}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">

                            {formData.id
                                ? "Edit Subcategory"
                                : "Add Subcategory"}

                        </h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body">

                        {/* Name */}

                        <div className="mb-3">

                            <label className="form-label">
                                Subcategory Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />

                        </div>

                        {/* Category */}

                        <div className="mb-3">

                            <label className="form-label">
                                Category
                            </label>

                            <select
                                className="form-select"
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                            >

                                {categories.map((category) => (

                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>

                                ))}

                            </select>

                        </div>

                        {/* Status */}

                        <div className="form-check">

                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="subStatus"
                                name="status"
                                checked={formData.status}
                                onChange={handleChange}
                            />

                            <label
                                htmlFor="subStatus"
                                className="form-check-label"
                            >
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