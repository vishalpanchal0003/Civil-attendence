import React from "react";

const Loading = () => {
    return (
        <div className="h-24 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                
                <div className="w-8 h-8 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin"></div>

                <p className="text-sm text-slate-500">
                    Loading...
                </p>

            </div>
        </div>
    );
};

export default Loading;