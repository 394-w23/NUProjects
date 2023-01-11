import CardApp from "./Card";
import Database from "../Database";
import { useDbData } from '../../utilities/firebase';

export default function CardPageApp() {
  const [data, error] = useDbData();
  console.log(data);
  let jobs = null;
  let users = null;
  let cards = null;
  

  if (data) {
    jobs = data.jobs;
    console.log(jobs);
    users = data.users;
    const testJobs = [jobs];
    testJobs.sort((a, b) => {
      if ( b.dataPosted == null) {
        if (a.dataPosted == null){
          return false
        }
        return false
      }
      return new Date(a.datePosted) - new Date(b.datePosted); // descending order
    })
    console.log("This is testJobs")
    console.log(testJobs)

    cards = Object.values(jobs).map((card, i) => {
      return <CardApp key={i} data={card} />;
    });
  }
  return <>{cards}</>;
}


