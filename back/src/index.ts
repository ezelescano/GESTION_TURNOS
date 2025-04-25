import server from "./server";
import { PORT } from "./config/envs";
import { AppDataSource } from "./config/data-source";
import {preloadUserData} from "./helpers/preloadData";

const initializeApp = async () =>{
  await AppDataSource.initialize()
  await preloadUserData();

  server.listen(PORT, ()=>{
    console.log(`Server Listening on ${PORT}`);
    
  });

};

initializeApp();
