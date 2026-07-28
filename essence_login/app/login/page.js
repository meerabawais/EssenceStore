"use client";

import { useState } from "react";

export default function Login(){

    const [email,setEmail]=useState("");

    const [password,setPassword]=useState("");

    async function login(e){

        e.preventDefault();

        const res=await fetch("/api/Login",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                email,

                password,

            })

        });

        const data=await res.json();

        if(data.success){

            if(data.role==="ADMIN"){

                window.location.href="http://localhost:3003";

            }

            else{

                window.location.href="http://localhost:3002";

            }

        }

        else{

            alert(data.error);

        }

    }

    return(

        <div className="container mt-5">

            <form
                onSubmit={login}
                className="w-50 mx-auto"
            >

                <h2>Login</h2>

                <input

                    className="form-control mb-3"

                    placeholder="Email"

                    onChange={(e)=>setEmail(e.target.value)}

                />

                <input

                    type="password"

                    className="form-control mb-3"

                    placeholder="Password"

                    onChange={(e)=>setPassword(e.target.value)}

                />

                <button className="btn btn-dark w-100">

                    Login

                </button>

            </form>

        </div>

    );

}