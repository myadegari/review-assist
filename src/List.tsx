import { Navigate,useParams } from "react-router-dom";
import useFilterHelper from './helper/filterHelper';
import { Reading } from './interfaces/readingInterface';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { DateObject } from "react-multi-date-picker";
import classNames from 'classnames';
import { isolateBaseURL } from './routes';
import { PiDropboxLogoDuotone } from 'react-icons/pi';

export default function List() {
    const { id } = useParams();
    const {selectByID} = useFilterHelper()
    const  data = selectByID(id);
    if(typeof  data === 'object' && data as Reading) {
        return (
            <>
            <legend className='flex items-center gap-2 px-2 font-bold text-lg'>
            <PiDropboxLogoDuotone  style={{fontSize:"1.5rem"}}/>
            {data.title}
            </legend>
                <h2 className='font-semibold'>{data.description}</h2>
                <p> {new DateObject({
                            date:data.date,
                            locale:persian_fa,
                            calendar:persian,
                        }).format("YYYY/MM/DD HH:mm")}</p>
                <div className='divide-y-2 grid gap-2'>
                    {data.review.map((review)=>(
                    <div className='flex items-center justify-between'>
                    <span>
                     <h3 key={review.id}>{review.title}</h3>
                     <p>
                        {new DateObject({
                            date:review.date,
                            locale:persian_fa,
                            calendar:persian,
                        }).format(`${review.id==1?"YYYY/MM/DD HH:mm":""}`)}
                        </p>
                    </span>
                        <p className={classNames('px-4 py-1 border-2 rounded-full',{'bg-lime-200 border-lime-400 text-lime-700':review.status=='done',
                                                                                    'bg-blue-200 border-blue-400 text-blue-700':review.status=='pending'})}>
                        {review.status}

                        </p>
                        </div>
                ))}</div>
            </>
        )
    }
    else{
        return (
           <Navigate to={isolateBaseURL+'list-of-all/'} replace={true}/>
        );
    }
}
