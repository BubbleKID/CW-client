import React, {useEffect, useState} from 'react';
import { Typography } from '@mui/material';
import Table from '../../components/Table/Table';
import Header from '../../components/Header/Header';
import axios from 'axios';
import './Home.sass';

export default function Home() {
    const [products, setProducts] = useState([]);
    const BASE_URL = process.env.BASE_URL;

    useEffect(() => {
        const getProducts = async() => {
            try {
                const response = await axios.get(`${BASE_URL}/api/findall`);
                setProducts(response.data);
                console.log(`GET: Here's the list of products`, response.data);
            } catch (errors) {
                console.error(errors);
            }
        };
        getProducts();
        console.log(products);
    }, []);

    return(
        <div>
            <Header/>
            <Typography variant="h3" component="h3" sx={{textAlign: 'center'}}>
                Products Management Solution
            </Typography>
            <Table products={products}/>
        </div>
    );
}