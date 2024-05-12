import React, { useEffect, useRef, useState } from 'react'
import { PiBooksDuotone,PiClockCountdownDuotone,PiBookOpenUserDuotone  } from "react-icons/pi";
import { IoAddCircleOutline } from "react-icons/io5";
import content from './content/homepage';
import classNames from 'classnames';
import { useReadingStore } from './store/readingStore';
import { createId } from "@paralleldrive/cuid2";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { DateObject } from "react-multi-date-picker";
import { Reading, Review } from './interfaces/readingInterface';
import useHelper from "./helper/handleReview"

export default function Home() {
    const readings = useReadingStore(state=>state.readings)
    const addReading =useReadingStore(state=>state.addReading)
    const {calculateReviewStage,todayReviews} = useHelper()
    const [reviews,setReviews] = useState<Reading[]>([])
    
    
   
    
    useEffect(()=>{
        const Reviews = todayReviews()
        setReviews(Reviews)

    },[readings])

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault()

        if(titleRef.current && descriptionRef.current){

            const Data:Reading = {
                id:createId(),
                title:titleRef.current.value,
                description:descriptionRef.current.value,
                date:new DateObject({
                    date:new Date(),
                    locale:persian_fa,
                    calendar:persian,}),
                review:[]
            }
             addReading(Data);
             calculateReviewStage(Data)
        }
    }

    const showReview = (reading:Reading,review:Review)=>{

        const reviewDate=new DateObject({
            date:review.date,
            locale:persian_fa,
            calendar:persian
        })
        return(
            <div className='flex gap-2 min-w-fit' key={review.id}>
                <span className='flex items-center'>
            <p >{review.title}</p>
                </span>
                <span className='flex flex-col gap-2 items-center border-r border-sky-200 pr-2'>
                    {review.id == 1 ? <p>{content.todayH} {reviewDate.format("HH:mm")}</p> :<p>{content.todayD}</p> }
            
            <button 
            className='flex items-center gap-2'
            onClick={()=>calculateReviewStage(reading)}
            >
                <PiBookOpenUserDuotone style={
                    {fontSize:"1.5rem"}
                }/>
                </button>

                </span>

        </div>
        )
    }

    return (
        <div className="bg-slate-50 rounded-b-xl text-gray-700 grid md:grid-cols-2 gap-1 md:gap-5 py-5 px-5 text-sm md:text-base ">
                <form className='' onSubmit={handleSubmit}>
                    <fieldset className='flex flex-col px-4 py-3  rounded-xl border-2'>
                        <legend className='flex gap-2 px-2 font-bold'>
                    <PiBooksDuotone  style={{fontSize:'1.4rem'}} />
                    {content.addReadingSession}
                        </legend>
                        <label className='grid gap-2 border-b-2 pb-5 border-dashed'>
                        {content.title}
                        <input 
                     className='p-2 outline-none w-full border rounded-lg bg-slate-100'
                     type="text"
                     name="title"
                     ref={titleRef}
                     />
                        </label>
                    <label className='grid gap-2 pt-2'>
                    {content.description}
                     <input 
                     className='p-2 outline-none w-full border rounded-lg bg-slate-100'
                     type="text"
                     name="description"
                     ref={descriptionRef}
                     />

                    </label>
                    <div className='flex gap-2 items-center mt-2'>
                    <button 
                    type='submit'
                    className={classNames('bg-slate-100 flex gap-1 items-center py-1 px-2 rounded-xl')}
                    >
                        <IoAddCircleOutline style={{fontSize:'1.4rem',
                            fontWeight:"bold",
                        }} />
                            {content.add}
                    </button>
          

                    </div>
                    </fieldset>
                    
                </form>
            <div>
                <fieldset className='flex flex-col px-4 py-3 gap-2 rounded-xl  w-fill h-full border-2 max-h-[540px] overflow-y-auto scrollbar scrollbar-thumb-gray-200 scrollbar-w-1 scrollbar-thumb-rounded-xl'>
                    <legend className='flex gap-2 px-2 font-bold'>
                        <PiClockCountdownDuotone style={{fontSize:'1.4rem'}} />
                        {content.reviewTitle}
                    </legend>

            {reviews.length ?reviews.map((reading)=>(
                <div 
                // style={{flex:'1'}}
                className='flex items  flex-wrap items-center border-2 bg-sky-50 hover:bg-sky-100 border-sky-100 text-sky-700 rounded-lg px-4 py-2 justify-between cursor-default' key={reading.id}>
                    <div className='min-w-fit'>

                    <h2 className='font-bold'>{reading.title}</h2>
                     <p>{reading.description}</p>
                    </div>
                        {showReview(reading,reading.review[reading.review.length-1])}

                </div>
            )):
           ""
        
        }
             </fieldset>
            </div>
        </div>
    )
}
