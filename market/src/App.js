import { useState } from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux'


const 전체선택 = styled.div`
display:flex;
justify-content:flex-start;
align-items:center;
`
const 주문 = styled.div`
display:flex;
justify-content:center;
align-items:center;
width:100%;
height:50px;
button{
  width:
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
  const [checkItems, setCheckItems] = useState([]);
  const Dispatch = useDispatch();
  const items = useSelector(state => state);

  const 단일선택 = (checked, id) => {
    if(checked){
      setCheckItems(prev => [...prev,id]);
    }
    else{
      setCheckItems(checkItems.filter(el => el!==id));
    }
  }

  const 전체선택함수 = (checked) => {
    if(checked){
      const Arr = [];
      items.items.map(el => Arr.push(el.id));
      setCheckItems(Arr);
    }
    else{
      setCheckItems([]);
    }
  }

  console.log(Dispatch)

  return (
    <>
      <h2 style={{fontSize:'25px'}}>
        장바구니
      </h2>
      <hr/>

      <전체선택>
      <input 
      style={{width:'20px',height:'20px',marginRight:'20px'}} 
      type='checkbox'
      onChange={(e) => 전체선택함수(e.target.checked)}
      checked={checkItems.length === items.items.length ? true : false}
      />
      <h2>전체선택</h2>
      <button style={{width:'80px',height:'40px',fontWeight:'600',marginLeft:'380px'}}>
        선택 삭제
      </button>
      </전체선택>
      
      <hr style={{height:'2px', backgroundColor:'black'}}/>
      
      <div>
      {items.items.map((a, i) => {
        return <div key={i}>
        <ItemWrap>
        <체크박스>
        <input 
        checked={checkItems.includes(a.id)? true: false} 
        onChange={(e)=> 단일선택(e.target.checked,a.id)}
        type='checkbox' 
        style={{width:'20px',height:'20px'}} 
        />
        </체크박스>
        <이름>
        {a.name}
        </이름>
        <수량>
        <button onClick={items.items.Dispatch(minusCount())}>-</button>
        {a.amount}
        <button>+</button>
        </수량>
        <가격>
        <input 
        type='number' 
        style={{width:'100px',border:'0px',fontSize:'18px'}} 
        placeholder={a.price+'원'}>
        </input>
        </가격>
        <button>
          바로구매
        </button>
        </ItemWrap>
        <hr/>
        </div>
      })}
      </div>
      
      <주문>
      <button>선택상품 주문</button>
      <button>전체상품 주문</button>
      </주문>
      
    </>
    
  );
}

export default App;
