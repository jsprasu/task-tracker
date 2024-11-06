import React from "react";
import Tasks from "./modules/Tasks";

function Main() {
    return (
        <div>
            <div className="header row row-lg-1 row-md-1">
                <h2>Tasks</h2>
            </div>
            <Tasks />
        </div>
    );
}

export default Main;
