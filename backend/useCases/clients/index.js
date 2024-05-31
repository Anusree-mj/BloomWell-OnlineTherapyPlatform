import {
    signUp,
    saveClientData,
} from "./clientAuth/clientAuthController.js"

import { getConnections } from "./clientConnection/clientConnectionController.js";

const clientControllers = {
    signUp,
    saveClientData,
    getConnections,
}

export default clientControllers;
