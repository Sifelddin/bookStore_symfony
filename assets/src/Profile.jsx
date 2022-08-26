import React from "react";
import { createRoot } from "react-dom/client";
import Form from "../profileComponents/Form";

const container = document.getElementById("profile");
const profile = createRoot(container);

const Profile = () => {
    return <Form />;
};

profile.render(<Profile />);
