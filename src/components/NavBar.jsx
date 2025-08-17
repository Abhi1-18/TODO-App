
import Logo from '../assets/Logo.png'

function NavBar(){

    return(
        <div className="w-screen h-[90px] border-solid border-2 border-black flex justify-around items-center shadow-xl/30 bg-slate-800">
            <img src={Logo} alt="" className='h-28'/>
            <h1 className=' text-2xl text-gray-300'>TODO Webapp </h1>
        </div>
    )
}

export default NavBar;