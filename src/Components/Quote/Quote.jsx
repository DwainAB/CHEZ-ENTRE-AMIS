import React from "react";
import './Quote.css'
import imgQuote from "../../Assets/imgQuote.png"
import TextJson from "../TextJson/TextJson.json"

function Quote(){

    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return(
        <div className="containerGlobalQuote">

            <div className="containerLeftQuote">
                <p className="logoQuote">“</p>
                <p className="textQuote">{formatText(TextJson.quoteSection2)}</p>
                <p className="authorQuote">Nobu Matsuhisa <br/><span>Chef sushi renommé</span></p>
            </div>

            <div className="containerRightQuote">
                <img src={imgQuote} alt="" />
            </div>

        </div>
    )
}

export default Quote