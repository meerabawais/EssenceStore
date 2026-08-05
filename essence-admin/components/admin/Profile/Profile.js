"use client";

import {useState} from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileInfoCard from "./ProfileInfoCard";
import PasswordCard from "./PasswordCard";
import ActivityCard from "./ActivityCard";
import "./Profile.css";

export default function Profile(){
    const [user, setUser] = useState({
        firstName: "Meerab",
        lastName: "Awais",
        email: "meerab.awais@gmail.com",
        phone: "0303-5550605",
        role: "Administrator",
    })
    return(
         <div className="profile-page container-fluid">

            <ProfileHeader/>

            <div className="row g-4">

                <div className="col-lg-8">

                    <ProfileInfoCard
                        user={user}
                        setUser={setUser}
                    />

                </div>

                <div className="col-lg-4">

                    <ActivityCard/>

                </div>

            </div>

            <div className="mt-4">

                <PasswordCard/>

            </div>

        </div>

    );
}