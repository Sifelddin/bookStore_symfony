import React from "react";
import { createRoot } from "react-dom/client";
import OrdersList from "../profileComponents/OrdersList";
import OrderContext from "./contexts/OrderContext";

const container = document.getElementById("history");
const root = createRoot(container);

const History = () => {
    return (
        <OrderContext>
            <OrdersList />
        </OrderContext>
    );
};

root.render(<History />);
