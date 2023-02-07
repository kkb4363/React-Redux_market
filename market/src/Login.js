import {useDispatch,useSelector} from 'react-redux'
import styled from 'styled-components';
import axios from "axios";
import { useState } from 'react';

const Wrapper = styled.div`
width:100%;
height:100%;
display:flex;
justify-content:center;
align-items:center;
margin-top:200px;
`

const Form = styled.form`
width:500px;
height:500px;
display:flex;
flex-direction:column;
background-color:tomato;
align-items:center;
justify-content:center;
`

function Login(){
    const dispatch = useDispatch();
    const [id,setId] = useState(''), [pw,setPw] = useState('')
    const submit = (e) => {
        e.preventDefault();
        let body = {
            id,pw
        }
        axios.get('http://localhost:3000/users')
        .then(res => res.data.filter(savedID => savedID.ID === body.id != '') ?
        res.data.filter(savedPW => savedPW.ID === body.id)[0].PASSWORD === body.pw?
        axios.post('http://localhost:3000/users',body)
        .then(res => dispatch(Login(res.data))) :null :null
        )
    }
    return(
        <Wrapper>
            <Form onSubmit={submit}>
                <span>로그인 하세요</span>
                <input placeholder='ID' type='text' value={id} onChange={e => setId(e.target.value)}/>
                <input placeholder='PW' type='password' value={pw} onChange={e => setPw(e.target.value)}/>
                <button type='submit'>로그인</button>
            </Form>
        </Wrapper>
    )
}

export default Login;