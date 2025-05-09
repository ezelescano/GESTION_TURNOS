import style from './TurnoCard.module.css'
const TurnoCard = ({date, time, status}) =>{
    return(
<section className={style.carDiv}>
    <div className={style.card}>
        <spam>{date}</spam>
        <spam>{time}</spam>
        <spam>{status}</spam>
    </div>
</section>
    )
}

export default TurnoCard;