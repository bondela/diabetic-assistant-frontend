import React from "react";

const Home = () => {

    return (
        // <div style={{fontSize: "48px", alignItems: "center", justifyContent: "center", display: "flex"}}>
        //
        // </div>
        <div style={{margin: "50px", flexDirection: "column", justifyContent: "center", alignItems: "start", display: "flex"}}>
            <h1>Diabetic Assistant</h1>
            <span style={{fontWeight: "lighter"}}>
                Diabetic Assistant is an innovative application designed to support individuals with diabetes in managing their condition effectively.<br/>
                This intelligent assistant provides various features and functionalities to help users monitor their blood sugar levels,<br/>
                track their medication intake, and maintain a healthy lifestyle.
            </span>
        </div>
    );
};

export default Home;