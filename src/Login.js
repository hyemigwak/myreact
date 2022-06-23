import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();


    const onSubmit = (data) => {
        axios.post(`${process.env.REACT_APP_API_URL}/login`,
            { email: data.email, password: data.password })
            .then((res) =>{
                localStorage.setItem("token", res.data.token);
                if(res.data.success){
                    navigate("/memo");
                    alert(`${data.email}님 안녕하세요!`);
                } else {
                    alert(`${data.errorMessages}`);
                }
            })
            .catch((err) => console.log(err));
    };



    return (
        <div style={{marginLeft:'20px'}}>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    name="email"
                    {...register("email", { required: true })}
                    placeholder={"email"}
                />
                <input
                    type="password"
                    name="password"
                    {...register("password", { required: true })}
                    placeholder={"password"}
                />
                <button type="submit">로그인</button>
            </form>
            <button onClick={()=>navigate("/signup")}>회원가입 하러가기</button>
        </div>
    );
};

export default Login;