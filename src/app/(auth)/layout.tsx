import { AuthBranding } from "@/components/auth/auth-branding";

const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
            <AuthBranding />
            <div className="flex items-center justify-center py-12 bg-gray-50 dark:bg-gray-900 lg:bg-white lg:dark:bg-black">
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;
