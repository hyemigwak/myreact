import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';
import axios from 'axios';
import dayjs from "dayjs";
import styled from "styled-components";
import { useQuery, useMutation, useQueryClient } from 'react-query';



const Memo = () => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
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

    const getMemo = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}`);
        return response.data;
    }

    const addMemo = async (memoData) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, memoData);
        return response.data
    }

    const deleteMemo = async (data) => {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/delete`, {
            data: data
        });
        return response.data
    }



    const { data } = useQuery("memo", getMemo, {
        retry: 1,
        staleTime: 5000
    });

    const addMutation = useMutation("memo", addMemo);
    const deleteMutation = useMutation("memo", deleteMemo);

    const submitMemo = () => {
        addMutation.mutate({name: name, memo: memo}, {
            onSuccess: () => {
                setInputs({
                    name: '',
                    memo: ''
                })
                return queryClient.invalidateQueries("memo");
            },
            onError: () => {
                alert("등록 실패!");
            }
        }
        )
    }


    const deleteMemoHanlder = (memoId) => {
        let deleteData = {
            memo_id: memoId
        };

        deleteMutation.mutate(deleteData, {
            onSuccess: () => {
                return queryClient.invalidateQueries("memo");
            },
            onError: () => {
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
                    data?.map((datum) => {
                        return (
                            <tr key={datum.memo_id}>
                                <td>{datum.name}</td>
                                <td>{datum.memo}</td>
                                <td>{dayjs(datum.created_at).format("YYYY-MM-DD HH:mm")}</td>
                                <td>{dayjs(datum.updated_at).format("YYYY-MM-DD HH:mm")}</td>
                                <td style={{cursor:"pointer"}} onClick={() => deleteMemoHanlder(datum.memo_id)}>삭제</td>
                                <td style={{cursor:"pointer"}} onClick={()=> navigate(`/edit/${datum.memo_id}`)}>수정</td>
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