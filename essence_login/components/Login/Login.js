"use client";

import {useState} from "react";
export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function login(e){
        e.preventDefault();
        const res = await fetch("/api/login",{
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

        if(data.role==="ADMIN"){

            window.location.href="http://localhost:3003";

        }

        else{

            window.location.href="http://localhost:3002";

        }

    }

    return(

        <form onSubmit={login}>

            <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Email"
            />

            <input
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
            />

            <button>

                Login

            </button>

        </form>

    );

}

