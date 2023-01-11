import CardApp from "./Card";
import Database from "../Database";
import { useDbData } from '../../utilities/firebase';

export default function CardPageApp() {
  const [data, error] = useDbData();
  console.log(data);
  let jobs = null;
  let users = null;
  let cards = null;
  function compare(a, b) {
    if (a.datePosted < b.datePosted){
      return 1;
    }
    if (a.datePosted > b.datePosted){
      return -1;
    }
    return 0;
  }
  if (data) {
    jobs = data.jobs;
    console.log(jobs);
    users = data.users;
    jobs = Object.values(jobs);
    jobs.sort(compare);
    cards = jobs.map((card, i) => {
      return <CardApp key={i} data={card} />;
    });
  }
  return <>{cards}</>;
}


