"use client";

import {useState} from "react";
export default function PasswordCard(){
    const [passwords, setPasswords] = useState({
        currentPassword : "",
        newPassword : "",
        confirmPassword : "",
    });
    function handleChange(e) {
        const {name,value} = e.target;
        setPasswords((prev)=>({
            ...prev,
            [name] : value,
        }));
    }
    return(
        <div className="card profile-card">
            <div className="card-header">
                 <h5 className="mb-0">

                    Change Password

                </h5>

            </div>

            <div className="card-body">

                <div className="mb-3">

                    <label>

                        Current Password

                    </label>

                    <input

                        type="password"

                        className="form-control"

                        name="currentPassword"

                        value={passwords.currentPassword}

                        onChange={handleChange}

                    />

                </div>

                <div className="mb-3">

                    <label>

                        New Password

                    </label>

                    <input

                        type="password"

                        className="form-control"

                        name="newPassword"

                        value={passwords.newPassword}

                        onChange={handleChange}

                    />

                </div>

                <div className="mb-4">

                    <label>

                        Confirm Password

                    </label>

                    <input

                        type="password"

                        className="form-control"

                        name="confirmPassword"

                        value={passwords.confirmPassword}

                        onChange={handleChange}

                    />

                </div>

                <button className="btn btn-primary">

                    Update Password

                </button>

            </div>
        </div>

    );
}