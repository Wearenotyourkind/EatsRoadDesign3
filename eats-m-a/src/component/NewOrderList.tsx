import React, { useEffect, useState } from 'react';
import Order from './Order';
import { Card, Col,  Popover,Button } from 'antd';
import '../scss/NewOrderList.scss';
import numberWithCommas from '../functions/addCommaFunc';
import {dbService} from "../firebase";
import queryString from "query-string";
import OrderPreview from "./OrderPreview";

interface Props {
    table:any
    toggleCheck:(t:string)=>void
    indexNumber:number

}

const NewOrderList = ({table,toggleCheck,indexNumber}:Props) => {
    const query = queryString.parse(window.location.search);

    const [popoverVisible,setPopoverVisible]=useState<any>({tableNum:0,visible:false});



    let tables:any=[];
    let i=indexNumber*3-3;
    for(i;i<indexNumber*3;i++){
        if(table[i]!=null){
            tables.push(table[i]);
        }
    }

    console.log(tables);



    return (

        <div className="row">
            {
                tables.length !== 0 ?
                    <>
                        {
                            tables.map((m:any)=>{

                                for(let j=0; j<indexNumber*3;j++) {
                                    return (
                                        <Col span={8}>
                                            <Card className="orderCard" >
                                                <h1 key={m.myTable}>{m.myTable}번 테이블</h1>
                                                <hr/>
                                                <>
                                                    <OrderPreview orders={m.orderList.slice(0,1)} orderLength={m.orderList.length}/>
                                                    <Popover className='popover'
                                                        placement='right'
                                                        content={
                                                            <div className='menuPopover'>
                                                                <Order orders={m.orderList}/>
                                                                <div className='totalPriceDiv'><hr className='coloredHr'/><h3>총 가격 : {numberWithCommas(m.totalPrice)}</h3></div>
                                                                <Button className="orderCancelButton" onClick={() => {
                                                                    dbService.collection(`${query.store}`).doc(`${m.myTable}`).update({
                                                                        bucket:[],
                                                                        totalPrice:0,
                                                                        orderStatus:false
                                                                    })

                                                                }}>
                                                                    <h1>주문거부</h1>
                                                                </Button>
                                                                <Button className="orderFinishedButton" onClick={() => toggleCheck(m.myTable)}>
                                                                    <h1>주문완료</h1>
                                                                </Button>

                                                            </div>
                                                        }
                                                        title={
                                                            <div>

                                                                <Button onClick={()=>setPopoverVisible({ table:m.myTable, visible:false})}>닫기</Button>
                                                                <h1 className='cardTitle'>{m.myTable}번 테이블</h1>

                                                            </div>
                                                        }
                                                        trigger="click"
                                                        visible={m.myTable === popoverVisible.table && popoverVisible.visible}

                                                    >
                                                        <Button className="orderMoreDetailButton" onClick={() => setPopoverVisible({table:m.myTable,visible:true})}>
                                                            <h1>주문 상세보기</h1>
                                                        </Button>
                                                    </Popover>
                                                </>

                                            </Card>
                                        </Col>
                                    )
                                }

                            })
                        }

                    </>
                    :
                    <div>
                        <h1>새로운 주문이 없습니다</h1>
                    </div>
            }



        </div>
    );
}

export default NewOrderList;