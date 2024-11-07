import React from "react";
import Tasks from "./modules/Tasks";
import { ToastContainer } from "react-toastify";

function Main() {
    return (
        <div>
            <Tasks />
            <ToastContainer />
        </div>
    );
}

export default Main;
