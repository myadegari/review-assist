import { useReadingStore } from "../store/readingStore";




function useFilterHelper(){
    const readings = useReadingStore(state=>state.readings)
    
    function extractTitles(){
        const titles = new Set();
        readings.forEach((reading)=>{
            titles.add(reading.title);
        })
        return Array.from(titles) as string[]
    }
    function filterByTitle(title?:string|undefined){
        if(title==undefined){
            return readings
        }
        return readings.filter(reading=> reading.title === title)
    }
    function selectByID(id:string|undefined){
        if(id){   
        const selected = readings.find(reading => reading.id === id);
        if(!selected){
            return("No such ID");
        }
        return selected
    }
    return "id is not defined"
    }
    return {extractTitles,filterByTitle,selectByID};
}

export default useFilterHelper;