import { useState, useEffect} from "react";

import axios from 'axios';

const [dataAPI, setDataAPI] = useState({});
    const api2 = axios({
        method: "post",
        // crossDomain: true,
        // dataType: 'jsonp',
        baseURL: "https://marked-potent-linen.glitch.me/webhook",
        // headers: {
        //     "Content-Type":"application/json",
        //     "Accept":"*/*",
        //     "Accept-Encoding":"gzip, deflate, br",
        //     "Connection":"keep-alive",
        // }
    });
    
    
   
    useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			const fetchData = async () => {
				try {
					const {data} = await api2
					setDataAPI(data);
				} catch (error) {
					console.log(error);
				}
			};
			fetchData();
		}, 500);
	}, []);

    console.log("TESTE", dataAPI)
    


export default api2;

