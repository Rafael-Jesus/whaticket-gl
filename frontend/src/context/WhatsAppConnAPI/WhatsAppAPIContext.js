import React, { createContext } from "react";
// import express from "express";
import api from "../../services/api";

// import useWhatsApps from "../../hooks/useWhatsApps";

// const WhatsAppsApiContext = createContext();
// export default 

export async function WhatsAppsAPI (){
          try {
            const value = await api.get("/connectionapi/listconn")  
            
            // console.log(listConn.data);

            return value;
            
          } catch (err) {
            console.log(err);
          }
        };    

	// const { loading, whatsApps } = useWhatsApps();
   



