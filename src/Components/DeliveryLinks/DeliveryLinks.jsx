import React, { useState } from "react";
import "./DeliveryLinks.css"
import textJson from "../TextJson/TextJson.json";
import { Link } from "react-router-dom";
import ModalAlerte from "./ModalAlerte";

function isOpenNow(openingHours) {
    const now = new Date();
    const day = now.getDay(); // 0 = dimanche, 1 = lundi, ...
    const hour = now.getHours() + now.getMinutes() / 60;
    // Filtrer les créneaux du jour
    const todaySlots = openingHours.filter(slot => slot.day === day);
    for (let slot of todaySlots) {
        if (hour >= slot.start && hour <= slot.end) {
            return true;
        }
    }
    return false;
}

function getNextOpening(openingHours) {
    const now = new Date();
    let day = now.getDay();
    const hour = now.getHours() + now.getMinutes() / 60;
    // Chercher aujourd'hui puis les jours suivants
    for (let i = 0; i < 7; i++) {
        const slots = openingHours.filter(slot => slot.day === day);
        for (let slot of slots) {
            if (i === 0 && hour < slot.start) {
                return { day, start: slot.start };
            } else if (i > 0) {
                return { day, start: slot.start };
            }
        }
        day = (day + 1) % 7;
    }
    return null;
}

function formatDayAndHour(day, start) {
    const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const now = new Date();
    const today = now.getDay();
    const h = Math.floor(start);
    const m = Math.round((start - h) * 60);
    const dayLabel = (day === today) ? "Aujourd'hui" : days[day];
    return `${dayLabel} à ${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

function DeliveryLinks({show}){
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleClick = (e) => {
        const openingHours = textJson.openingHours;
        if (isOpenNow(openingHours)) {
            window.location.href = `https://platforms.yumco.fr/${textJson.refRestaurant}`;
        } else {
            e.preventDefault();
            const next = getNextOpening(openingHours);
            if (next) {
                setModalMessage(`Le restaurant est fermé. Prochaine ouverture : ${formatDayAndHour(next.day, next.start)}`);
            } else {
                setModalMessage("Le restaurant est fermé pour le moment.");
            }
            setModalOpen(true);
        }
    };

    return(
        <div className="containerDeliveryLinks">
            <Link to="#" onClick={handleClick}>
            <div className="containerClickAndCollect">
                <span className="material-symbols-outlined">shopping_bag</span>
                <p className="text-delivery">CLICK & COLLECT</p>
            </div></Link>
            {show && (
                <a target="blank" href="/">
                    <div className="containerLinks">
                        <span className="material-symbols-outlined">directions_bike</span>
                        <p className="text-delivery">LIVRAISON</p>
                    </div>
                </a>
            )}
            <ModalAlerte open={modalOpen} onClose={() => setModalOpen(false)} message={modalMessage} />
        </div>
    )
}

export default DeliveryLinks