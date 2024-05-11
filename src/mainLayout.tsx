import React from 'react'
import {Outlet,Link,useLocation} from'react-router-dom';
import content from './content/navbar';
import { baseURL } from './routes';
import classNames from 'classnames';

export default function MainLayout() {
    const location = useLocation();
    // const navigate = useNavigate();
    const status = {
      home: location.pathname === baseURL,
      about:location.pathname == baseURL+'about/',
      listOfAll : location.pathname.includes(baseURL+'list-of-all/'),
    };


  return (
    <main className="bg-gray-800 min-h-[100vh] min-w-[100%] grid place-items-center px-9 py-4 font-body">
    <div className="flex flex-col w-full lg:w-[900px]">
      <nav className="flex bg-slate-100 p-5 pb-0 rounded-t-xl">
        <Link 
            to={baseURL}
            className={classNames('px-2 py-1 border-b-2 transition-all duration-200',{'border-lime-500 font-bold':status.home,
                'text-gray-400 hover:text-black hover:font-bold border-transparent':!status.home
            })}
        >{content.home}</Link>
        <Link 
            to={baseURL+'list-of-all/'}
            className={classNames('px-2 py-1 border-b-2 transition-all duration-200',{'border-lime-500 font-bold':status.listOfAll,
            'text-gray-400 hover:text-black hover:font-bold border-transparent':!status.listOfAll
            })}
            >{content.listOfAll}</Link>
        <Link 
        to={baseURL+'about/'}
        className={classNames('px-2 py-1 border-b-2 transition-all duration-200',{'border-lime-500 font-bold':status.about,
        'text-gray-400 hover:text-black hover:font-bold border-transparent':!status.about
        })}
        >{content.about}</Link>
      </nav>
        <Outlet />
    </div>
  </main>
  )
}
