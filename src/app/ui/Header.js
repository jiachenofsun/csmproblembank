import Image from "next/image"
import Link from 'next/link'


export default function Header() {
    return (
        <header className="flex justify-center p-4">
            <Link href={`/`}>
                <Image
                    alt="logo"
                    src="/logo.png"
                    width={64}
                    height={64}
                />
            </Link>
        </header>
    );
}