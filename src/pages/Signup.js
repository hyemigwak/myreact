import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";


const Signup = () => {

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();


    const onSubmit = (data) => {

        const { password, passwordCheck, email } = data;

        if(password !== passwordCheck) {
            alert("비밀번호가 일치하지 않습니다");
            return;
        }

        if(email === '' || password === '' || passwordCheck === '') {
            alert("모든 정보를 입력해주세요!");
            return
        }

        //id, password 서버로 보내기
        axios.post(`${process.env.REACT_APP_API_URL}/signup`,
            { email: email, password: password })
            .then((res) =>{
                if(res.data.success === true){
                    navigate("/");
                } else {
                    alert(`${res.data.errorMessages}`);
                }
            })
            .catch((err) => console.log(err))
    };

    return (
        <div style={{marginLeft:'20px'}}>
            <h2>회원가입</h2>
            <SignupForm onSubmit={handleSubmit(onSubmit)}>
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
                <Input
                    type={"password"}
                    placeholder={"password를 한번 더 입력"}
                    register={{...register("passwordCheck", { required: true })}}
                />
                <button type="submit">회원 가입</button>
            </SignupForm>
        </div>
    );
};

export default Signup;


const SignupForm = styled.form`
  display: flex;
  flex-direction: column; 
  width: 400px;
  
  input {
    margin-bottom: 15px;
    height: 25px;
    padding-left: 10px;
  }
`;