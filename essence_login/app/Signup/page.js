"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Signup(){
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
     function handleChange(e){

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    }

    async function signup(e){

        e.preventDefault();

        const res = await fetch("/api/Signup",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(form)

        });

        const data = await res.json();

        if(data.success){

            alert("Account Created");

            router.push("/login");

        }

        else{

            alert(data.error);

        }

    }

    return(

        <div className="container mt-5">

            <form onSubmit={signup} className="w-50 mx-auto">

                <h2>Signup</h2>

                <input
                    className="form-control mb-3"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                />

                <button className="btn btn-dark w-100">

                    Signup

                </button>

            </form>

        </div>

    );

}
