import React from "react";
import "./InfoRestaurant.css"
import TextJson from "../TextJson/TextJson.json"


function InfoRestaurant(){

    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    return(
        <div className="containerGlobalInfoRestaurant" id="contact">

            <h2 className="titleInfoRestaurant">Où nous trouvez</h2>

            <div className="container-info">

                <div className="container-info-hour" id="hours">
                    <h2 className="hour-title" >Horaires :</h2>
                    <div className="opening">
                        <div className="days">
                            <p className="day">Lundi</p>
                            <p className="day">Mardi </p>
                            <p className="day">Mercredi </p>
                            <p className="day">Jeudi </p>
                            <p className="day">Vendredi </p>
                            <p className="day">Samedi </p>
                            <p className="day">Dimanche </p>
                        </div>
                        <div className="Hours">
                            <p className="hour">{formatText(TextJson.mondayTime)}</p>
                            <p className="hour">{formatText(TextJson.tuesdayTime)}</p>
                            <p className="hour">{formatText(TextJson.wednesdayTime)}</p>
                            <p className="hour">{formatText(TextJson.thursdayTime)}</p>
                            <p className="hour">{formatText(TextJson.fridayTime)}</p>
                            <p className="hour">{formatText(TextJson.saturdayTime)}</p>
                            <p className="hour">{formatText(TextJson.sundayTime)}</p>
                        </div>
                    </div>
                    
                </div>

                <div className="container-map">
                    <iframe width="520" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" id="gmap_canvas" src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=6%20place%20de%20la%20gare%20Domont+(Chez%20entre%20amis)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe> 
                    <a href='http://maps-generator.com/fr'></a>
                </div>

            </div>
        </div>
    )
}

export default InfoRestaurant