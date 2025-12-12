import { BsFillStarFill, BsPeopleFill } from "react-icons/bs";
import { FiShield, FiHome } from "react-icons/fi";

import { IStats } from "@/types";

export const stats: IStats[] = [
    {
        title: "1000+",
        icon: <BsPeopleFill size={34} className="text-blue-500" />,
        description: "Verified professionals ready to help transform your home."
    },
    {
        title: "5.0",
        icon: <BsFillStarFill size={34} className="text-yellow-500" />,
        description: "Star rating from satisfied homeowners across all projects."
    },
    {
        title: "100%",
        icon: <FiShield size={34} className="text-green-600" />,
        description: "Secure escrow payments protecting your investment until work is completed."
    }
];