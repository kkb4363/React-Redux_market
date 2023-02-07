import {configureStore, createSlice} from '@reduxjs/toolkit'

const items = createSlice({
    name:'items',
    initialState:[{
        id:0,
        name:'복숭아 아이스티',
        price:13000,
        amount:1
    },{
        id:1,
        name:'러블리 티 박스',
        price:20000,
        amount:1
    },{
        id: 2,
        name: '그린티 랑드샤 세트',
        price: 36000,
        amount: 1,
    }],
    reducers:{
        addCount(state,action){
            let num = state.findIndex(a => a.id === action.payload);
            state[num].amount++;
        },
        minusCount(state,action){
            let num = state.findIndex(a => a.id === action.payload);
            if(state[num].amount >1) state[num].amount--;
        }
    }
})

export const {addCount,minusCount} = items.actions

export default configureStore({
    reducer:{
        items:items.reducer
    }
})


