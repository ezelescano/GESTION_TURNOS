import server from "./server";
import { PORT } from "./config/envs";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize().then((res) => {
  console.log("Conexion a DB correctamente");
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});


