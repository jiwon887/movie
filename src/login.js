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
        <>
            <div>
                ID : <input type="text" size={20} value={loginID} onChange={(e) => setID(e.target.value)} />
            </div>
            <div>
                Password : <input type="password" size={30} value={loginPassword} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <button onClick={handleLogin}>Login</button>
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                    />
                    Remember Me
                </label>
            </div>
            <div>
                <Link to="/signup">
                    <button>Sign Up</button>
                </Link>
            </div>
        </>
    );
}

export default Login;
