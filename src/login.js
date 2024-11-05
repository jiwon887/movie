import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
    let [loginID, setID] = useState("");
    let [loginPassword, setPassword] = useState("");
    let [savedID, setSavedID] = useState("");
    let [savedPassword, setSavedPassword] = useState("");

    let localStorage = window.localStorage;

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
                <button onClick={() => {
                    localStorage.setItem("loginID", loginID);
                    localStorage.setItem("loginPassword", loginPassword);

                    setSavedID(localStorage.getItem("loginID"));
                    setSavedPassword(localStorage.getItem("loginPassword"));
                }}>
                    Login
                </button>
            </div>

            <div>
                <Link to="/signup">
                    <button>
                        Sign Up
                    </button>
                </Link>
            </div>
        </>
    );
}

export default Login;
