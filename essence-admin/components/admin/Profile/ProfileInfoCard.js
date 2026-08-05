"use client";

export default function ProfileCard({user, setUser}){
    function handleChange(e){
        const {name, value} = e.target;
        setUser((prev)=>({
            ...prev,
            [name]: value,
        }));
    }
    return(
          <div className="card profile-card">

            <div className="card-body">

                <div className="row">

                    <div className="col-md-4 text-center">

                        <img
                            src="/admin/profile.png"
                            className="profile-avatar mb-3"
                            alt=""
                        />

                        <button className="btn btn-outline-primary w-100">

                            Change Photo

                        </button>

                    </div>

                    <div className="col-md-8">

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    First Name

                                </label>

                                <input

                                    className="form-control"

                                    name="firstName"

                                    value={user.firstName}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Last Name

                                </label>

                                <input

                                    className="form-control"

                                    name="lastName"

                                    value={user.lastName}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Email</label>

                                <input

                                    className="form-control"

                                    name="email"

                                    value={user.email}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Phone</label>

                                <input

                                    className="form-control"

                                    name="phone"

                                    value={user.phone}

                                    onChange={handleChange}

                                />

                            </div>

                          {/* <div className="col-md-12 mb-4">

                                <label>Role</label>

                                <input

                                    className="form-control"

                                    value={user.role}

                                    disabled

                                />

                            </div> */}

                        </div>

                        <button className="btn btn-primary">

                            Save Changes

                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}