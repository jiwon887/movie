import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
    let [loginID, setID] = useState("");
    let [loginPassword, setPassword] = useState("");
    let [rememberMe, setRememberMe] = useState(false);

    let navigate = useNavigate();
    let localStorage = window.localStorage;

    const handleLogin = () => {
        const storedID = localStorage.getItem("savedID");
        const storedPassword = localStorage.getItem("savedPassword");

        if (loginID === storedID && loginPassword === storedPassword) {
            localStorage.setItem("isLogin", true);
            setIsLoggedIn(true);

            // RememberMe 상태에 따라 로그인 정보를 저장하거나 삭제
            if (rememberMe) {
                localStorage.setItem("rememberMe", true);
                localStorage.setItem("rememberedID", loginID);
                localStorage.setItem("rememberedPassword", loginPassword);
            } else {
                localStorage.removeItem("rememberMe");
                localStorage.removeItem("rememberedID");
                localStorage.removeItem("rememberedPassword");
            }

            navigate("/");
        } else {
            alert("Invalid ID or Password");
        }
    };

    useEffect(() => {
        // id, password 채워주기
        const remembered = localStorage.getItem("rememberMe") === "true";
        if (remembered) {
            setRememberMe(true);
            setID(localStorage.getItem("rememberedID") || "");
            setPassword(localStorage.getItem("rememberedPassword") || "");
        }
    }, []);

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
                    <label htmlFor="tab-1" className="tab">로그인</label>
                    <input
                        id="tab-2"
                        type="radio"
                        name="tab"
                        className="sign-up"
                    />
                    <Link to="/signup" className="notab">회원가입</Link>
                </div>
                <div className="login-form">
                    <div className="group">
                    <label htmlFor="email" className="label">이메일</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="input"
                            size={20} 
                            value={loginID} 
                            onChange={(e) => setID(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="group">
                        <label htmlFor="password" className="label">비밀번호</label>
                            <input
                            type="password"
                            id="password"
                            className="input"
                            size={30}
                            value={loginPassword}
                            onChange={(e)=>setPassword(e.target.value)}
                            />
                    </div>
                    <label className="check-label">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={()=>setRememberMe(!rememberMe)}
                            class="check"
                        />
                        <span class="icon">로그인 저장</span>
                    </label>
                    <div className="group">
                    <button
                            type="button"
                            className="button"
                            onClick={handleLogin}
                        >
                            로그인
                        </button>
                    </div>
                </div>
            </div>
        /</div>
);
}
export default Login;
