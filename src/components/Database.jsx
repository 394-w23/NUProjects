import React from 'react';
import { useDbData } from '../utilities/firebase';

const Database = () => {
    const data = useDbData();
    if (data[0] != undefined) {
        const jobs = data[0].jobs
        const users = data[0].users
        return [jobs, users];
    }
    return null;
    }

export default Database;