import AppNav from "../ui/appNav";

export default async function ProfileLayout({ children }: { children: React.ReactNode; }) {
    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <AppNav/>
            
            {children}
        </div>
    );
};