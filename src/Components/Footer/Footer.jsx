import React from "react";
import "./Footer.css"
import TextJson from "../TextJson/TextJson.json"

function Footer(){

    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return(
        <div className="containerGlobalFooter">
            <h2 className="titleFooter">A bientôt</h2>
            <div className="lineFooter"></div>

            <div className="containerContentFooter">

                <div className="contentFooterInfoRestaurant">
                    <p className="titleContent">Informations</p>
                    <p className="phoneRestaurant">{formatText(TextJson.phoneRestaurant)}</p>
                    <p className="emailRestaurant">{formatText(TextJson.mailRestaurant)}</p>
                    <p className="addressRestaurant">{formatText(TextJson.adresseRestaurant)}</p>
                </div>

                <div className="contentFooterInfoRestaurant ">
                    <p className="makeTo">Réalisé par <span>YumCo</span></p>
                </div>

                <div className="contentFooterInfoRestaurant">

                </div>

            </div>
        </div>
    )
}

export default Footer