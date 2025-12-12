import { FiHome, FiTool, FiDroplet, FiZap, FiWind, FiGrid } from "react-icons/fi";
import { BsBrush, BsTree } from "react-icons/bs";

export const serviceCategories = [
    {
        name: "Cleaning",
        icon: <FiHome />,
        translationKey: "cleaning"
    },
    {
        name: "Repairs",
        icon: <FiTool />,
        translationKey: "repair"
    },
    {
        name: "Painting",
        icon: <BsBrush />,
        translationKey: "painting"
    },
    {
        name: "HVAC",
        icon: <FiWind />,
        translationKey: "hvac"
    },
    {
        name: "Plumbing",
        icon: <FiDroplet />,
        translationKey: "plumbing"
    },
    {
        name: "Electrical",
        icon: <FiZap />,
        translationKey: "electrical"
    },
    {
        name: "Landscaping",
        icon: <BsTree />,
        translationKey: "landscaping"
    },
    {
        name: "More",
        icon: <FiGrid />,
        translationKey: "more"
    },
];

