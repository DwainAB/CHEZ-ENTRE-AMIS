import React from "react";
import imgHistory1 from "../../Assets/imgHistory1.png"
import imgHistory2 from "../../Assets/imgHistory2.png"
import "./History.css"
import TextJson from "../TextJson/TextJson.json"

function History(){

    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return(
        <div className="containerGlobalHistory">
            <h2 className="titleHistory">{formatText(TextJson.titleSection1)}</h2>
            <p className="subtitleHistory">{formatText(TextJson.subtitleSection1)}</p>
            <p className="textHistory">{formatText(TextJson.textSection1)}</p>
            <div className="containerImgHistory">
                <img src={imgHistory1} alt="" />
                <img src={imgHistory2} alt="" />
            </div>

        </div>
    )
}

export default History