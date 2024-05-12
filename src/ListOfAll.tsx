import React from 'react'
import { useReadingStore } from './store/readingStore'
import useFilterHelper from './helper/filterHelper'
import classNames from 'classnames'
import content from './content/listOfAll'
import { Link, Outlet,useLocation } from 'react-router-dom'
import { PiBarcodeDuotone,PiBookOpenTextDuotone,PiDropboxLogoDuotone,PiXCircleDuotone } from "react-icons/pi";
import { isolateBaseURL } from './routes'


export default function ListOfAll() {
  const readings = useReadingStore(state => state.readings)
  const deleteReading = useReadingStore(state => state.deleteReading)
  const { extractTitles, filterByTitle } = useFilterHelper()
  const [filterTitle, setFilterTitle] = React.useState<string | undefined>(undefined)
  const location = useLocation()


  return (
    <div className="bg-slate-50 p-4 rounded-b-xl text-gray-700 grid md:grid-cols-2 py-5 px-5 gap-5 text-sm md:text-base ">
      <div className='flex flex-col gap-2'>

        <fieldset className='flex px-4 py-3 border rounded-xl border-slate-300 gap-1 flex-wrap overflow-x-auto '>
          <legend className='flex gap-2 px-2 font-bold items-center'>
<PiBarcodeDuotone style={{fontSize:"1.5rem"}}/>
            {content.filter}
          </legend>
          {readings.length?(
          <>
          <h2
            className={classNames('px-3 py-1 rounded-2xl min-w-fit cursor-pointer border-2', { 'bg-slate-500 text-slate-50 border-slate-500 ': filterTitle === undefined, 'bg-slate-100 text-slate-600 border-slate-400': filterTitle !== undefined })}
            onClick={() => { setFilterTitle(undefined) }}>{content.noFilter}</h2>

          {extractTitles().map((title: string) => (
            <h2
            key={title}
              className={classNames('px-3 py-1 rounded-2xl min-w-fit cursor-pointer border-2', { 'bg-slate-500 text-slate-50 border-slate-500 ': filterTitle === title, 'bg-slate-100 text-slate-600 border-slate-400 ': filterTitle !== title })}

              onClick={() => { setFilterTitle(title) }}
            >{title}</h2>
          ))}
          </>):""
        }

        </fieldset>
        <fieldset className='flex flex-col pr-5 py-2 border rounded-xl border-slate-300'>
          <legend className='flex items-center gap-2 px-2 font-bold'>
            <PiBookOpenTextDuotone style={{fontSize:"1.5rem"}}/>
            {content.reads}</legend>
          <div className='grid gap-2 max-h-[400px] overflow-y-auto scrollbar scrollbar-thumb-gray-200 scrollbar-w-1 scrollbar-thumb-rounded-xl pl-5'>
          {readings.length?(
          
          filterByTitle(filterTitle).map((reading) => (
            <Link
            key={reading.id}
              to={isolateBaseURL + 'list-of-all/' + reading.id}
              className={classNames('py-2 px-4 flex items-center justify-between rounded-xl border-2 ',
              {"bg-slate-500 text-slate-50 border-slate-500":location.pathname==isolateBaseURL+`list-of-all/${reading.id}`,
              "bg-slate-100 text-slate-600 border-slate-400":location.pathname!=isolateBaseURL+`list-of-all/${reading.id}`})}>
              <span>
                <h2 className='font-bold'>{reading.title}</h2>
                <p className="text-sm">{reading.description}</p>

              </span>
              <button 
              className='flex items-center gap-1'
              onClick={() => deleteReading(reading.id)}>
              <PiXCircleDuotone style={{fontSize:"1.5rem"}}/>
                {/* {content.delete} */}
                </button>
            </Link>
          ))):
          <p>{content.noResult}</p>
        }
        </div>

        </fieldset>
      </div>
      <fieldset className='w-full max-h-[650px] border-2 rounded-xl px-4 py-3 border-slate-300'>
        {location.pathname == isolateBaseURL+"list-of-all/" && <>
          <legend className='flex items-center gap-2 px-2 font-bold'>
          <PiDropboxLogoDuotone  style={{fontSize:"1.5rem"}}/>
            {content.readDetails}
          </legend>
          <p  className='self-center  flex items-center justify-center h-full w-full text-center'>{content.noDataAvailable}</p>
        </>}
        <Outlet />
      </fieldset>
    </div>
  )
}
