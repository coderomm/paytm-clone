import moneySVG from '../../public/money.svg'
import { Button } from '../components/Button';
import { Header } from "../components/Header";
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const navigate = useNavigate();
    const handleGetStartedClick = () => {
        navigate('/dashboard');
    };

    return (
        <>
            <Header />
            <main className="border-t border-[#9fe870] min-h-lvh w-full px-1 md:px-32 py-4 flex flex-col md:pt-20 lg:flex-row justify-start md:justify-start items-center md:items-start gap-1 sm:gap-5 bg-[#163300]">
                <div className="flex flex-col justify-center items-center pt-20 md:pt-0 md:flex-grow">
                    <h1 className="uppercase font-black text-center text-[#9fe870] text-5xl sm:text-[4rem]"><span>International temp money transfers</span></h1>
                    <img className="grayscale-0 w-40 sm:w-80" src={moneySVG} />
                </div>
                <div className="w-full mt-4 md:mt-0 md:flex md:flex-grow">
                    <div className="mx-5 md:mx-0 flex md:flex-grow flex-col gap-6 justify-center bg-white p-8 rounded-[32px]">
                        <div className="flex flex-col">
                            <label htmlFor="">You send exactly</label>
                            <input type="text" value={"10,000"} className="border border-[#1e1e1e] py-3 px-4 font-semibold text-lg rounded-lg text-[#0e0f0c] border-none outline-none" />
                        </div>
                        <Button label={"Get Started"} onClick={handleGetStartedClick}></Button>
                    </div>
                </div>
            </main>
            <footer className="bg-[#16330014] flex justify-center items-center">
                <h3 className="text-center text-[#163300] py-5 spacing tracking-widest">
                    Made with ❤️ by
                    <a className="underline font-bold" target="_blank" href="https://x.com/1omsharma" rel="noreferrer"> Om Sharma</a>
                </h3>
            </footer>
        </>
    );
};

export default Index;
