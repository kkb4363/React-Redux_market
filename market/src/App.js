import { useState } from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux'
import { addCount, minusCount,deleteItem } from './components/store';
import { BsXLg } from "react-icons/bs";

const 전체선택 = styled.div`
display:flex;
justify-content:flex-start;
align-items:center;
`
const 주문 = styled.div`
display:flex;
justify-content:flex-start;
align-items:center;
width:100%;
height:50px;
span{
  margin-right:310px;
  font-size:20px;
}
`
const ItemWrap = styled.div`
display:flex;
align-items:center;
width:100%;
height:50px;
position:relative;
justify-content:flex-start;
`

const 체크박스 = styled.div`
display:flex;
`

const 이름 = styled.div`
width:150px;
height:50px;
display:flex;
justify-content:center;
align-items:center;
font-Size:14px;
`

const 수량 = styled.div`
display:flex;
width:200px;
height:50px;
align-items:center;
justify-content:center;
button{
  width:30px;
  height:30px;
}
`

const 가격 = styled.div`
font-size:18px;
width:150px;
height:50px;
display:flex;
align-items:center;
justify-content:center;
`

function App() {
  const [checkItems, setCheckItems] = useState([]),items = useSelector(state => state.items);
  const dispatch = useDispatch();
  const 단일선택 = (checked, id) => {
    if(checked){
      setCheckItems(prev => [...prev,id]);
    }
    else setCheckItems(checkItems.filter(el => el!==id));
  }

  const 전체선택함수 = (checked) => {
    if(checked){
      const Arr = [];
      items.map(el => Arr.push(el.id));
      setCheckItems(Arr);
    }
    else setCheckItems([]);
  }

  const Price = items.map(a => {
    return checkItems.includes(a.id)? 
    Object.values(a)[2] * a.amount:
    null
  })
  const TotalPrice = Price.reduce((a,b) => a+b)

  return (
    <>
      <h2 style={{fontSize:'25px'}}>장바구니</h2><hr/>
      <전체선택>
      <input 
      style={{width:'20px',height:'20px',marginRight:'20px'}} 
      type='checkbox'
      onChange={(e) => 전체선택함수(e.target.checked)}
      checked={checkItems.length === items.length ? true : false}/>
        <h2>전체선택</h2>
      </전체선택>
      <hr style={{height:'2px', backgroundColor:'black'}}/>
      
      <div>
      {items.map((a, i) => {
        return <div key={i}>
        <ItemWrap>
        <체크박스>
        <input 
        checked={checkItems.includes(a.id)? true: false} 
        onChange={(e)=> 단일선택(e.target.checked,a.id)}
        type='checkbox' 
        style={{width:'20px',height:'20px'}}/>
        </체크박스>
        <이름>
        {a.name}
        </이름>
        <수량>
        <button onClick={()=> dispatch(minusCount(a.id))}>-</button>
        {a.amount}
        <button onClick={()=> dispatch(addCount(a.id))}>+</button>
        </수량>
        <가격>
        <span style={{width:'100px',border:'0px',fontSize:'18px'}}>
        {a.price*a.amount+'원'}
        </span>
        </가격>
        <button>
          바로구매
        </button>
        <div
        style={{marginLeft:'20px'}}
        onClick={(e) => dispatch(deleteItem(e.target.parentElement.parentElement.parentElement))}>
          <BsXLg />
        </div>
        </ItemWrap>
        <hr/>
        </div>
      })}
      </div>
      
      <주문>
      <span>총 가격 : {TotalPrice} 원</span>
      <button>선택상품 주문</button>
      <button>전체상품 주문</button>
      </주문>
      
    </>
    
  );
}

export default App;
