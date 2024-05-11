import {create} from "zustand"
import { Reading,Review } from "../interfaces/readingInterface"
import { persist } from "zustand/middleware";



interface State {
    readings:Reading[]
    addReading:(reading:Reading) => void;
    deleteReading:(id:string) => void;
    addReviewReading:(id:string, review:Review[])=>void;
    deleteReviewReading:(id:string, reviewId:number)=>void;
}

export const useReadingStore = create<State>()(persist((set)=>({
    readings:[],
    addReading:(reading:Reading) => {
        set(state=>({readings:[...state.readings, reading]}))
    },
    deleteReading:(id:string) => {
        set(state=>({readings: state.readings.filter((reading)=> reading.id!== id)}))
    },
    addReviewReading:(id:string, review:Review[])=>{
        set(state => ({readings:[...state.readings].map(reading=>{
            if (reading.id === id){
                return {...reading, review:[...review]}
            }else{
                return reading;
            }
        })}))
    },
    deleteReviewReading:(id:string, reviewId:number)=>{
        set(state =>({readings:[...state.readings].map(reading=>{
            if (reading.id === id){
                return {...reading, review: reading.review.filter((review)=> review.id!== reviewId)}
            }else{
                return  reading;
            }
        })}))

    },
}),{
    name:"readings",
   
}))
