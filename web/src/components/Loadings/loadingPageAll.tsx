import React from "react";

export const LoadingPageAll = () => {
    return (
        <div className="flex justify-center items-center h-screen ">
            <div className="grid gap-2">
                <div className="flex items-center justify-center space-x-2 animate-bounce">
                    <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-black rounded-full"></div>
                </div>
            </div>
        </div>
    );
};