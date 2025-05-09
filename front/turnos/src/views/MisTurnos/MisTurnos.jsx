import { turnos } from "../../../helpers/turnos";
import { useState } from "react";
import TurnoCard from "../../components/TurnoCard/TurnoCard.jsx";
import style from "../../components/TurnoCard/TurnoCard.module.css";
const MisTurnos = () => {
  const [myTurns, setMyTurns] = useState(turnos);

  return (
    <>
      <h1>Estos son los turnos:</h1>

      <div className={style.container}>
        <div className={style.filaTurno}>
          <div>
            <h4>Fecha</h4>
          </div>
          <div>
            <h4>Horario</h4>
          </div>
          <div>
            <h4>Estado</h4>
          </div>
        </div>
        {myTurns.map((myTurn) => {
          return (
            <TurnoCard
              key={myTurn.id}
              date={myTurn.date}
              time={myTurn.time}
              status={myTurn.status}
            />
          );
        })}
      </div>
    </>
  );
};

export default MisTurnos;
