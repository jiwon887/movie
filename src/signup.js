import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 

function Signup() {
    let [signupID, setSignupID] = useState("");
    let [signupPassword, setSignupPassword] = useState("");
    let [signupEmail, setSignupEmail] = useState("");
    
    let navigate = useNavigate(); 

    const handleSignup = () => {

        localStorage.setItem("savedID", signupID);
        localStorage.setItem("savedPassword", signupPassword);
        localStorage.setItem("loginEmail", signupEmail);

        navigate("/login");
    };

    return (
        <>
            <h2>Sign Up</h2>
            <div>
                ID: <input type="text" size={20} onChange={(e) => setSignupID(e.target.value)} />
            </div>
            <div>
                Password: <input type="password" size={20} onChange={(e) => setSignupPassword(e.target.value)} />
            </div>
            <div>
                Email: <input type="email" size={20} onChange={(e) => setSignupEmail(e.target.value)} />
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
