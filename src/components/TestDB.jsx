import React from 'react';
import { useDbData } from '../utilities/firebase';

const TestDB = () => {
    const data = useDbData();
    return (
        <div>
        <h1>TestDB</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
    }

export default TestDB;