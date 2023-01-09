import CardApp from './Card';
import Database from '../Database';


export default function CardPage() {
    const data = Database();
    let jobs = null;
    let users = null;
    let cards = null;
    if (data) {
        jobs = data[0];
        users = data[1];
        cards = Object.values(jobs).map((card, i) => {
        return (
            <CardApp key={i} data={card}/>
        )
        });
    }
    return (
        <>
        {cards}
        </>
    )
}