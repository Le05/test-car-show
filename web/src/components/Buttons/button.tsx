import React from "react";
import { LoadingUnique } from "../Loadings/loadingUnique";
import { buttonTypes } from "./types";
// import { LoadingUniqueType } from "./types";


export const Button: React.FC<buttonTypes &
    React.HTMLProps<HTMLButtonElement>> = (props) => {
        return (
            <button
                type={props.type == "button" ? "button" : props.type == "submit" ? "submit" : undefined}
                onClick={props.onClick} disabled={props.isLoading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium 
              rounded-md  ${props.color} ${props.hover} ${props.dimension} ${props.className}`}
            >
                {
                    props.isLoading ?
                        <LoadingUnique color="bg-transparent" dimension="w-8 h-8" /> :
                        <div>
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {/* <[pros.] className="h-5 w-5 text-white group-hover:text-white" aria-hidden="true" /> */}
                            </span>
                            {props.labelName}
                        </div>
                }
            </button>
        );
    };