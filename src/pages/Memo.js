import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import dayjs from "dayjs";
import styled from "styled-components";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { getUserName } from "../recoil/atom";
import { useRecoilValue } from "recoil";


const Memo = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const userInfo = useRecoilValue(getUserName);

    const { register, handleSubmit, reset } = useForm();

    const tableHeader = [ "이름", "메모", "생성일시", "수정일시", "삭제", "수정"];

    //api 모음
    const getMemo = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}`, {
            headers: {
                token: token
            }
        });
        return response.data;
    }

    const addMemo = async (memoData) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, memoData, {
            headers: {
                token: token
            }
        });
        return response.data
    }

    const deleteMemo = async (memoId) => {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/delete`, {
            data: {
                memo_id: memoId
            },
            headers: {
                token: token
            }
        });
        return response.data
    }

    const isMeCheck = async (memoId) => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/isme`, {
            memo_id: memoId
        }, {
            headers: {
                token: token
            }
        });
        return response.data
    }



    //query와 mutation 시작!


// 얘를 useEffect에 넣었더니, hook은 hook 안에 들어가면 안된다고 오류가 떴다..!
// 이것의 렌더링 시점은 언제인가? onError의 팝업은 왤케 늦게뜨는가? useQuery가 useEffect보다 먼저 시작되는 것 같은데...


    const { data } = useQuery("memo", getMemo, {
        onError: (err) => {
            if(err.response.status === 401) {
                alert("토큰이 없습니다. 로그인해주세요!");
                navigate("/");
            }
        }
    });

    const addMutation = useMutation("memo", addMemo);
    const deleteMutation = useMutation("memo", deleteMemo);


    //mutate를 실행해줄 함수들!!
    // invalidateQueries vs refetch
    // 데이터의 stale 함과 상관 없이 & 쿼리에 대한 observer 가 없더라도 항상 refetch 하지만,
    // invalidateQueries 는 기존 데이터를 stale 로 변경 후 마운트되어야 refetch 가 동작한다고 한다.

    const submitMemo = (data) => {
        addMutation.mutate({ memo: data.memo }, {
            onSuccess: () => {
                reset();
                return queryClient.invalidateQueries("memo");
            },
            onError: () => {
                alert("등록 실패!");
            }
        });
    };


    const deleteMemoHanlder = (memoId) => {
        deleteMutation.mutate(memoId, {
            onSuccess: () => {
                return queryClient.invalidateQueries("memo");
            },
            onError: (err) => {
                if(err.response.data.code === 401) {
                    alert("내 글만 삭제 가능합니다");
                }
                if(err.response.data.code === 400) {
                    alert("삭제 실패")
                }
            }
        })
    };

    const isMeCheckHandler = (memoId) => {
        isMeCheck(memoId).then((res) => {
            if(res.isMe) {
                navigate(`/edit/${memoId}`)
            } else {
                alert("내 글만 삭제할 수 있습니다.")
            }
        });
    }



    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }



    return (
        <React.Fragment>
            <NickArea><span>{userInfo}</span>님 안녕하세요!</NickArea>
            <form onSubmit={handleSubmit(submitMemo)}>
            <Table>
                <thead>
                <TableTitle>
                    {
                        tableHeader.map((header, idx) => {
                            return <th key={idx}>{header}</th>
                        })
                    }
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
                                <td style={{cursor:"pointer"}} onClick={()=> isMeCheckHandler(datum.memo_id)}>수정</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>

            <InputArea>
                {/*<Input*/}
                {/*    type={"text"}*/}
                {/*    placeholder={"이름 입력"}*/}
                {/*    register={{...register("name")}}*/}
                {/*/>*/}
                <Input
                    type={"text"}
                    placeholder={"메모 입력"}
                    register={{...register("memo")}}
                />
                <button type="submit">등록</button>
            </InputArea>
            <button onClick={logout}>로그아웃</button>
        </form>
        </React.Fragment>
    );
};

export default Memo;

const NickArea = styled.div`
  text-align: right;
  margin: 20px 20px 30px 0;
  
  span {
    font-weight: bold;
    font-size: 20px;
  }
`;


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