import { useRouter } from 'next/navigation';

export default function ScreenContainer({ children }) {
    const router = useRouter();
    return (
        <div className="mainContainer">
            <header className='headerContainer'>
                <button onClick={() => router.back()} className='backButton'>
                    &#8592;
                </button>
                <span className='headerTitle'>InsureFit</span>
            </header>
            <div className="screenContainer">
                {children}
            </div>;
        </div>
    )
}