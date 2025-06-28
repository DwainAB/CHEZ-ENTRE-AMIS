import React, { useState } from "react";
import "./DeliveryLinks.css"

function DeliveryLinks({show}){
    //const [links, setLinks] = useState(show)

    return(
        <div className="containerDeliveryLinks">

            
                <a href="#menu"><div className="containerClickAndCollect">
                    <span class="material-symbols-outlined">shopping_bag</span>
                    <p className="text-delivery">CLICK & COLLECT</p>
                </div></a>
            

            {show && (
                <a target="blank" href="/">
                    <div className="containerLinks">
                        <span className="material-symbols-outlined">directions_bike</span>
                        <p className="text-delivery">LIVRAISON</p>
                    </div>
                </a>
            )}
        
        </div>
    )
}

export default DeliveryLinks