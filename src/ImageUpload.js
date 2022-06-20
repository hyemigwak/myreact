import React, { useState } from "react";
import axios from 'axios';

const ImageUpload = () => {

    const [files, setFiles] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [serverFile, setServerFile] = useState();


    const fileToUrl = () => {

    }


    const onChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result);
        }
        const file = e.target.files[0];
        reader.readAsDataURL(file);
        setFiles(file);

    }

    const sendImageOnClick = async () => {
        const formData = new FormData();
        formData.append("file", files);
        const response = await axios({
            method: "post",
            url: "http://3.83.142.57:5000/image",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        if(response.data.success){
            console.log(response.data);
            setServerFile(response.data.data);
        }
    }

  return (
      <div>
          <input type="file" onChange={onChange}/>
          <div>
              <div>미리보기</div>
              {imageUrl && <img style={{width: "200px", height: "200px"}} src={imageUrl} alt={"image"}/>}
              <div onClick={sendImageOnClick}>보내기</div>
              { serverFile && <img style={{width: "200px", height: "200px"}} src={serverFile} alt={"serverfile"}/> }
          </div>

      </div>
  )
};

export default ImageUpload;