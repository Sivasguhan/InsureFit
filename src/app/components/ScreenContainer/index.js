import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ScreenContainer({ children }) {
    const router = useRouter();
    return (
        <div className="mainContainer">
            <header className='headerContainer'>
                <button onClick={() => router.back()} className='backButton'>
                    &#8592;
                </button>
                <Image
                    src="/img/logo.png"
                    width={40}
                    height={40}
                    alt="Picture of the author"
                />
            </header>
            <div className="screenContainer">
                {children}
            </div>;
        </div>
    )
}