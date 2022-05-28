import React from 'react';
import Table from '../components/Table/Table';
import Header from '../components/Header/Header';
import './Home.sass';

export default function Home() {
    return(
        <div>
            <Header/>
            <Table/>
        </div>
    );
}