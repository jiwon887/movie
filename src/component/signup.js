import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    let [signupID, setSignupID] = useState("");
    let [signupPassword, setSignupPassword] = useState("");
    let [passwordCheck, setPasswordCheck] = useState("");
    let [termAgree, setTermAgree] = useState(false);

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

        if (termAgree !== true){
            alert("check term agree");
            return;
        }

        localStorage.setItem("savedID", signupID);
        localStorage.setItem("savedPassword", signupPassword);

        navigate("/login");
    };

    return (
        <div className="login-wrap">
            <div className="login-html">
                <div>
                    <input 
                        id="tab-1" 
                        type="radio" 
                        name="tab" 
                        className="sign-in" 
                    />
                    <Link to="/login" className="notab">로그인</Link>
                    <input 
                        id="tab-2" 
                        type="radio" 
                        name="tab" 
                        className="sign-up"
                    />
                    <label htmlFor="tab-2" className="tab">회원가입</label>
                </div>
                <div className="login-form">
                    <div className="group">
                        <label htmlFor="email" className="label">이메일</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="input" 
                            value={signupID} 
                            onChange={(e) => setSignupID(e.target.value)} 
                            required
                        />
                    </div>

                    <div className="group">
                        <label htmlFor="password" className="label">비밀번호</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="input" 
                            value={signupPassword} 
                            onChange={(e) => setSignupPassword(e.target.value)} 
                            required
                        />
                    </div>

                    <div className="group">
                        <label htmlFor="passwordCheck" className="label">비밀번호 확인</label>
                        <input 
                            type="password" 
                            id="passwordCheck" 
                            className="input" 
                            value={passwordCheck} 
                            onChange={(e) => setPasswordCheck(e.target.value)} 
                            required
                        />
                    </div>

                    <div>
                        <label className="check-label">
                            <input 
                                type="checkbox" 
                                checked={termAgree} 
                                onChange={() => setTermAgree(!termAgree)} 
                                className="check"
                            />
                            <span className="icon"></span> 약관동의
                        </label>
                    </div>

                    <div className="group">
                        <button 
                            type="button" 
                            className="button" 
                            onClick={handleSignup}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Signup;