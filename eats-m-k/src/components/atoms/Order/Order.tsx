import React from 'react';
import { Link, Redirect } from 'react-router-dom';


interface Props {
    store: string | string[] | null;
    table: string | string[] | null;
    text: string;
    onSubmit: ()=> void
    n:number
}

const Order = ({store, table,onSubmit,text,n}:Props) => {


    if(n === 0)  return <Redirect to={`/menu/?store=${store}&table=${table}`}/>
    console.log('sdfsdf',store,table);

    return ( 
        <div>
            <Link to="/complete"><button onClick={onSubmit}>주문하기</button></Link>
            <Link to={`/menu/?store=${store}&table=${table}`}><button>{text}</button></Link>

        </div>
    );
}

export default Order;