import React, {useState, useEffect} from 'react'





export function cartaMaisForte(card1, card2) {
    if(card1.target > card2.target){
        return card1
    }else if(card1.target < card2.target){
        return card2;
    }else{
        console.log(card1, card2)
        return {suit:'',value:'', target: -1}
    }
    
}