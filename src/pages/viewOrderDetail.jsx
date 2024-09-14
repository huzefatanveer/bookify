import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom"
import  {useFirebase} from '../context/Firebase'


const ViewOrderDetails = () => {
    const params= useParams()

    const firebase = useFirebase();

    const [orders, setOrders] = useState([])

    useEffect(()=> {
        firebase.getOrders(params.bookId).then(orders => setOrders(orders.docs))
    }, [])

    return <div className ="container mt-3">
        <h1>Orders</h1>
        {
            orders.map(order => {
                const data = order.data();
                return (
                    <div key={order.id} className="mt-0" style={{border: "1px solid", padding: '1px'}}>
                        <h5>Order by: {data.displayName}</h5>
                        <h6>Qty: {data.qty}</h6>
                        <h6>Email: {data.userEmail}</h6>
                        </div>

                )
            })
        }

    </div>
}

export default ViewOrderDetails;