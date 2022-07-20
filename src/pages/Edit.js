import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const Edit = () => {

    const params = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const memoId = params.memo_id;
    const [detailMemo, setDetailMemo] = useState({});

    const token = localStorage.getItem("token");

    const getDetailMemo = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/detail/${memoId}`);
        setDetailMemo(response.data.memoData);
        return response.data.memoData;
    }

    const updateDetailMemo = async (editData) => {
        const response = axios.post(`${process.env.REACT_APP_API_URL}/edit`, editData, {
            headers: {
                token: token
            }
        });
        return response.data;
    };

    const { data } = useQuery("detail", getDetailMemo);
    const updateMutation = useMutation(updateDetailMemo);

    const onChange = (e) => {
        const { name, value } = e.target;
        setDetailMemo({
            ...detailMemo,
            [name]: value
        })
    };

    const updateMemo = () => {
        updateMutation.mutate({ memo_id: detailMemo.memo_id, name: detailMemo.name, memo: detailMemo.memo }, {
            onSuccess: () => {
                navigate("/memo");
                return queryClient.invalidateQueries("memo");
            },
            onError: (error) => {
                console.log(error,"error");
            }
        });
    }


    return (
        <div style={{margin: "40px 0 0 40px"}}>
            <h2>메모 수정하기</h2>
            <input name={"name"} type={"text"} value={detailMemo.name} onChange={onChange}/>
            <input name={"memo"} type={"text"} value={detailMemo.memo} onChange={onChange}/>
            <button style={{cursor:"pointer"}}  onClick={updateMemo}>수정</button>
        </div>
    );
};

export default Edit;