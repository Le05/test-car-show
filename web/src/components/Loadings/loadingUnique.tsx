import React from "react";
import { LoadingUniqueType } from "./types";

export const LoadingUnique = (props:LoadingUniqueType) => {
    return (
        <div>
            <div className={`${props.dimension} border-4 ${props.color} border-t-transparent border-solid rounded-full animate-spin`}></div>
        </div>
    );
};