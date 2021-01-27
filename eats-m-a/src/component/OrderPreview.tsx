import React, { useState } from 'react';
import {Col} from "antd";
import '../scss/Order.scss';
interface Props {
    orders:any,
    orderLength:any
}

const OrderPreview = ({orders, orderLength}:Props) =>{

    console.log(orders)

    return(
        <div>

            {
                orders.map((m:any)=>
                    <div key={m.id}>
                        <div className="orderDiv">
                            <div className="tatalInfo">
                                <div className="orderInfo">
                                    <h2 className="menuText"><b>{m.menu} 외 {orderLength}개</b></h2>
                                </div>
                            </div>
                        </div>
                        <hr/>
                    </div>
                )}

        </div>
    );

}

export default OrderPreview;