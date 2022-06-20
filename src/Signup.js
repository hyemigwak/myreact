import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';

const Signup = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        passwordCheck: ''
    });

    const { email, password, passwordCheck } = inputs;

    const handleChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if(password !== passwordCheck) {
            alert("비밀번호가 일치하지 않습니다");
            return;
        }

        if(email === '' || password === '' || passwordCheck === '') {
            alert("모든 정보를 입력해주세요!");
            return
        }

        //id, password 서버로 보내기
        axios.post("http://3.83.142.57:5000/signup",
            { email: email, password: password })
            .then((res) =>{
                if(res.data.success === true){
                    navigate("/login");
                } else {
                    alert(`${res.data.errorMessages}`);
                }
            })
            .catch((err) => console.log(err))
    };

    return (
        <div style={{marginLeft:'20px'}}>
            <h2>회원가입</h2>
            <SignupForm onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder={"email"}
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder={"password"}
                    required
                />
                <input
                    type="password"
                    name="passwordCheck"
                    value={passwordCheck}
                    onChange={handleChange}
                    placeholder={"password를 한번 더 입력"}
                    required
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