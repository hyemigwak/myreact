import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";



const Login = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const { email, password } = inputs;

    const handleChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //id, password 서버로 보내고 응답 오면 router로 메모로 옮긴다.
        axios.post("http://3.83.142.57:5000/login",
            { email: email, password: password })
            .then((res) =>{
                if(res.data.success){
                    navigate("/");
                    alert(`${res.data.email}님 안녕하세요!`);
                } else {
                    alert(`${res.data.errorMessages}`);
                }
            })
            .catch((err) => console.log(err))
    };

    return (
        <div style={{marginLeft:'20px'}}>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder={"email"}
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder={"password"}
                />
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};

export default Login;