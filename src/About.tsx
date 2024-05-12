import content from "./content/about";

export default function About() {
  return (
    <div className="bg-slate-50 rounded-b-xl text-gray-700 grid py-5 px-[2rem] text-sm sm:text-base">
        <p className="text-pretty">{content.mainIdea} {content.main}</p>
        <ul className="mt-2">
          {content.items.map((item)=>(
            <li className="flex gap-2 flex-wrap"><strong>{item.title} :</strong>{item.desc}</li>
          ))}
        </ul>
        <p className="mt-2">{content.sec}</p>
        </div>
  )
}
