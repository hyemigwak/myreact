import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';
import axios from 'axios';
import dayjs from "dayjs";
import styled from "styled-components";


const Memo = () => {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [inputs, setInputs] = useState({
        name: '',
        memo: ''
    });

    const { name, memo } = inputs;

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const getMemo = async() => {
        const response = await axios.get("http://3.83.142.57:5000");
        setData(response.data);
    }

    const submitMemo = () => {
        axios.post("http://3.83.142.57:5000/upload", { name: name, memo: memo })
            .then((res) =>{
                if(res.data === "success"){
                    setInputs({
                        name: '',
                        memo: ''
                    })
                    getMemo();
                } else {
                    alert("등록 실패!");
                }
            })
            .catch((err) => console.log(err))
    }

    useEffect(()=>{
        getMemo();
    },[]);

    const deleteApi = (memo_id) => {
        axios.delete("http://3.83.142.57:5000/delete", {data: {memo_id: memo_id}})
            .then((res) => {
            if(res.data === "success") {
                alert("삭제 완료");
                getMemo();
            } else {
                alert("삭제 실패");
            }
        })
    };


    return (
        <div>
            <Table>
                <thead>
                <TableTitle>
                    <th>이름</th>
                    <th>메모</th>
                    <th>생성일시</th>
                    <th>수정일시</th>
                    <th>삭제</th>
                    <th>수정</th>
                </TableTitle>
                </thead>
                <tbody>
                {
                    data.map((datum) => {
                        return (
                            <tr key={datum.memo_id}>
                                <td>{datum.name}</td>
                                <td>{datum.memo}</td>
                                <td>{dayjs(datum.created_at).format("YYYY-MM-DD HH:mm")}</td>
                                <td>{dayjs(datum.updated_at).format("YYYY-MM-DD HH:mm")}</td>
                                <td style={{cursor:"pointer"}} onClick={() => deleteApi(datum.memo_id)}>삭제</td>
                                <td style={{cursor:"pointer"}} onClick={()=> navigate(`edit/${datum.memo_id}`)}>수정</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
            <InputArea>
                <input name="name" onChange={onChange} placeholder={"이름 입력"} value={name}/>
                <input name="memo" onChange={onChange} placeholder={"메모 입력"} value={memo}/>
                <button onClick={submitMemo}>등록</button>
            </InputArea>
        </div>
    )
};

export default Memo;


const Table = styled.table`
  border: 1px solid #444444;
  border-collapse: collapse;
  margin: 20px auto 20px;

  th, td {
    border: 1px solid #444444;
    border-collapse: collapse;
  }
  
`;

const TableTitle = styled.tr`
  background-color: pink;
`;

const InputArea = styled.div`
  text-align: center;
`;