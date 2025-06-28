import React, {useEffect, useState} from "react";
import History from "../Components/History/History";
import Quote from "../Components/Quote/Quote";
import InfoRestaurant from "../Components/InfoRestaurant/InfoRestaurant";
import Menu from "../Components/Menu/Menu";
import DeliveryLinks from "../Components/DeliveryLinks/DeliveryLinks";
import textJson from "../Components/TextJson/TextJson.json"
import { RestaurantProvider } from "../data/restaurantData";

function Home(){

    return(
        <div>
            <RestaurantProvider>
                <DeliveryLinks show={textJson.deliveryOptions.delivery}/>
                <History/>
                {/* <Quote/> */}
                <Menu itemMin={6} itemMax={10} menuHome={true} />
                <InfoRestaurant/>
            </RestaurantProvider>
        </div>
    )
}

export default Home