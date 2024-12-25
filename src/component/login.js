import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function Login({ setIsLoggedIn, setNickname }) {

    let navigate = useNavigate();
    let localStorage = window.localStorage;

    const handleKakaoLogin = () => {
        window.location.href = kakaoURL; 
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get("code");

        if (authCode) {
            axios.post("https://kauth.kakao.com/oauth/token", null, {
                params: {
                    grant_type: "authorization_code",
                    client_id: REST_API_KEY,
                    redirect_uri: REDIRECT_URI,
                    code: authCode,
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
            .then((response) => {
                const accessToken = response.data.access_token;

                return axios.get("https://kapi.kakao.com/v2/user/me", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
            })
            .then((response) => {
                const userData = response.data;
                const { id, properties, kakao_account } = userData;
                const nickname = properties?.nickname || "사용자";
                console.log(id, properties, kakao_account, nickname);
                localStorage.setItem("nickname", nickname);
                localStorage.setItem("isLogin", true);
                localStorage.setItem("curUserID", id); 
                setNickname(nickname);
                setIsLoggedIn(true);


                navigate("/");
            })
            .catch((error) => {
                console.error("Kakao login failed:", error);
            });
        }
    }, [navigate, setIsLoggedIn, setNickname]);

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
                        <button
                            type="button"
                            className="button"
                            onClick={handleKakaoLogin}
                        >
                            카카오 로그인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
