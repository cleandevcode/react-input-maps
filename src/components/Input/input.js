import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import "./input.css"

const Input = () => {
    const dispatch = useDispatch();
    const [country, setCountry] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [show, setShow] = useState(false);
    useEffect(()=>{
        if(country) {
            searchCandidates(country)
        }
    }, [country]);

    const searchCandidates = (text) => {
        const apiUrl = `${process.env.REACT_APP_API_ENDPOINT}/name/${text}`;
        fetch(apiUrl).then(res=>res.json()).then(res=>{
            if(res.status !== 404) {
                setCandidates(res);
            
            }
        })
    }

    const handleSetCandidates = (e) => {
        console.log("###3", e)
        if(e.keyCode=== 13) {
            dispatch({
                type: 'SET_COUNTRY_CANDIDATES',
                payload: candidates
            })
        }
    }

    const handleSetCountry = (item) => {
        let temp = [];
        temp.push(item);
        setShow(false);
        setCountry(item.name)
        dispatch({
            type: 'SET_COUNTRY',
            payload: item
        })
        dispatch({
            type: 'SET_COUNTRY_CANDIDATES',
            payload: temp
        })
    }
    
    return (
        <div className="col-12 mt-3">
            <input placeholder="Country name..." value={country} className="w-100 country-input" onKeyDown={handleSetCandidates} onFocus={()=>setShow(true)} onChange={(e)=>setCountry(e.target.value)} />
            <div className="candidates" style={{display: show ? 'block' : 'none'}}>
                {candidates && candidates.length > 0 && candidates.map((item, index)=>(
                    <div key={index} className="d-flex align-items-center border-bottom-1 py-2 px-2 candidate" onClick={()=>handleSetCountry(item)}>
                        <img src={item.flag} width="25" height="20" className="mr-3" alt={item.name} />
                        <p className="mb-0">
                            <b>{item.name}</b>
                            <span className=" ms-1" >({item.nativeName})</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Input;