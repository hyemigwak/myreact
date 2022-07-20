import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";

const Login = () => {

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();


    //input state, onChange 지움


    const onSubmit = (data) => {
        axios.post(`${process.env.REACT_APP_API_URL}/login`,
            { email: data.email, password: data.password })
            .then((res) =>{
                localStorage.setItem("token", res.data.token);
                if(res.data.success){
                    alert(`${data.email}님 안녕하세요!`);
                    navigate("/memo");
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
                <Input
                    type={"text"}
                    placeholder={"email"}
                    register={{...register("email", { required: true })}}
                />
                <Input
                    type={"password"}
                    placeholder={"password"}
                    register={{...register("password", { required: true })}}
                />
                <button type="submit">로그인</button>
            </form>
            <button onClick={()=>navigate("/signup")}>회원가입 하러가기</button>
        </div>
    );
};

export default Login;