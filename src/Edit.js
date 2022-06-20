import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const Edit = () => {

    const params = useParams();
    const navigate = useNavigate();
    const memoId = params.memo_id;
    const [detailMemo, setDetailMemo] = useState({});

    const getDetailMemo = async () => {
        const response = await axios.get(`http://3.83.142.57:5000/detail/${memoId}`);
        setDetailMemo(response.data.memoData);
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setDetailMemo({
            ...detailMemo,
            [name]: value
        })
    };

    const updateMemo = () => {
        axios.post("http://3.83.142.57:5000/edit", {memo_id: detailMemo.memo_id, name: detailMemo.name, memo: detailMemo.memo})
            .then((res) => {
                console.log(res,"res");
                if(res.data === "success") {
                    navigate("/");
                } else {
                    alert("수정 실패! 두둥");
                }
            })
    }

    useEffect(()=>{
        getDetailMemo();
    },[]);


    return (
        <div style={{margin: "40px 0 0 40px"}}>
            <input name={"name"} type={"text"} value={detailMemo.name} onChange={onChange}/>
            <input name={"memo"} type={"text"} value={detailMemo.memo} onChange={onChange}/>
            <button style={{cursor:"pointer"}}  onClick={updateMemo}>수정</button>
        </div>
    );
};

export default Edit;