import React from "react";

export const Input = (props) => {

    const { type, placeholder, register } = props;


    return (
            <input
                type={type}
                placeholder={placeholder}
                {...register}
            />
    )
};

