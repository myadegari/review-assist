import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
// import { DateObject } from "react-multi-date-picker";
import { DateObject } from "react-multi-date-picker";
import { Reading,Review } from "../interfaces/readingInterface"
import { useReadingStore } from "../store/readingStore";
import Status from "../content/status"
// import { getState } from "zustand";


const ReviewStages =[
    {
        id:1,
        title:"اولین مرور",
        value:{duration:20,type:"minutes"}
    },
    {
        id:2,
        title:"مرور دوم",
        value:{duration:1,type:'day'}
    },
    {
        id:3,
        title:"مرور سوم",
        value:{duration:7,type:'days'}
    },
    {
        id:4,
        title:"مرور چهارم",
        value:{duration:1,type:'month'}
    },
    {
        id:5,
        title:"مرور پنجم",
        value:{duration:3,type:'months'}
    }
]


const useHelper = ()=>{
    const addReviewReading = useReadingStore(state=>state.addReviewReading)
    const readings = useReadingStore(state=>state.readings)
    
    function calculateReviewStage(reading:Reading){
        
        const startDate = new DateObject({
            date:reading.date,
            locale:persian_fa,
            calendar:persian
        });
        if(reading.review.length < ReviewStages.length){
            const reviews = []
            for(let i =0;i<=reading.review.length;i++){
                const nextStage = ReviewStages[i]
                const review:Review={
                    id:nextStage.id,
                    title:nextStage.title,
                    date:startDate.add(nextStage.value.duration,nextStage.value.type),
                    status:i==reading.review.length-1?Status.done:Status.pending,
                }
                reviews.push(review);
            }
           
      
            addReviewReading(reading.id,reviews)
        }
        
    
    }
    function todayReviews() {
        const today = new DateObject({
            date:new Date(),
            locale:persian_fa,
            calendar:persian
         });
    
        return readings.filter((reading)=>{
            const lastReview = reading.review[reading.review.length-1] as Review;
            if(lastReview && lastReview.status === Status.pending ){
                const lastReviewDate = new DateObject({
                    date:lastReview.date,
                    locale:persian_fa,
                    calendar:persian
                })
                if(lastReviewDate <= today ){
                    return true;
                }
                else if(lastReviewDate.daysLeft == today.daysLeft){
                    return true;
                }
                return false;
            }
            return false;
          
        })
    }

    return {calculateReviewStage,todayReviews};
}

export default useHelper;