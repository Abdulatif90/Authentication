
import { Navbar } from "./_components/navbar";

interface ProtectLayoutProps {
    children: React.ReactNode;
}

const ProtectLayout = ({ children }: ProtectLayoutProps) => {
    return (
        <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center 
        bg-linear-to-br from-sky-400 to-blue-800">
        <Navbar/>
            {children}
        </div>
    );
}

export default ProtectLayout;

