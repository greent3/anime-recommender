import {
    FaMoon,
    FaSun,
} from 'react-icons/fa';
import useDarkMode from '../../hooks/useDarkMode';


export const ThemeIcon = () => {
    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);
    const toggleClass = " transform translate-x-4";
    return (
        <span onClick={handleMode} className=' themed-centered-box'>
            <div className=' flex flex-row w-7 h-7 items-center'>
                <FaMoon size='20' className='top-navigation-icon dark:text-darkSecondary text-lightSecondary' />
            </div>
            <div
                className="md:w-10 md:h-5 w-10 h-4 flex items-center rounded-full p-1 cursor-pointer  bg-lightSecondary dark:bg-darkSecondary"
                onClick={() => handleMode()}
            >
                <div className={"dark:bg-darkPrimary bg-lightPrimary md:w-4 md:h-4 h-3 w-3 rounded-full shadow-md transform duration-300 ease-in-out" + (darkTheme ? null : toggleClass)}></div>
            </div>
            <div className=' flex flex-row w-7 h-7 items-center ml-2'>
                <FaSun size='20' className='top-navigation-icon dark:text-darkSecondary text-lightSecondary ' />
            </div>
        </span>
    );
};