import React from 'react';
import { useDbData } from '../utilities/firebase';

const TestDB = () => {
    const data = useDbData();
    if (data[0] != undefined) {
        const jobs = data[0].jobs
        const users = data[0].users
        // console.log(jobs);
        // for (const job in jobs) {
        //     console.log(jobs[job]);
        // }
        return [jobs, users];
    }
    return null;
    }

export default TestDB;