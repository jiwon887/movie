import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
    let [loginID, setID] = useState("");
    let [loginPassword, setPassword] = useState("");
    let [savedID, setSavedID] = useState("");
    let [savedPassword, setSavedPassword] = useState("");
    let navigate = useNavigate();

    let localStorage = window.localStorage;

    const handleLogin = () => {
        const storedID = localStorage.getItem("savedID");
        const storedPassword = localStorage.getItem("savedPassword");

        if (loginID === storedID && loginPassword === storedPassword) {
            localStorage.setItem("isLogin", true);
            //setIsLoggedIn(true);
            navigate("/");
        } else {
            alert("Invalid ID or Password");
        }
    };
    return (
        <>
            <div>
                ID : <input type="text" size={20} onChange={(e) => {
                    setID(e.target.value)
                }}/>
            </div>
            <div>
                Password : <input type="password" size={20} onChange={(e) =>
                    setPassword(e.target.value)
                }/>
            </div>

            <div>
                <button onClick={handleLogin}>
                    Login
                </button>
            </div>

            <div>
                <Link to="/signup" onChange={(e)=>{

                }}>
                    <button>
                        Sign Up
                    </button>
                </Link>
            </div>
        </>
    );
}

export default Login;
