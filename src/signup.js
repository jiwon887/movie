import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 

function Signup() {
    let [signupID, setSignupID] = useState("");
    let [signupPassword, setSignupPassword] = useState("");
    let [passwordCheck, setPasswordCheck] = useState("");

    let navigate = useNavigate(); 


    const handleSignup = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(signupID)) {
            alert("Please enter a valid email address.");
            return; 
        }

        if (signupPassword !== passwordCheck) {
            alert("Passwords do not match.");
            return;
        }

        localStorage.setItem("savedID", signupID);
        localStorage.setItem("savedPassword", signupPassword);

        navigate("/login");
    };

    return (
        <>
            <h2>Sign Up</h2>
            <div>
                ID: <input type="text" size={20} onChange={(e) => setSignupID(e.target.value)} />
            </div>
            <div>
                Password: <input type="password" size={30} onChange={(e) => setSignupPassword(e.target.value)} />
            </div>
            <div>
                Password Check: <input type="password" size={30} onChange={(e) => setPasswordCheck(e.target.value)} />
            </div>
            <div>
                <button onClick={handleSignup}>Sign Up</button>
            </div>
            <div>
                <Link to="/login">
                    <button>Back to Login</button>
                </Link>
            </div>
        </>
    );
}

export default Signup;
