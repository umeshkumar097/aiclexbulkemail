import { Mail } from "lucide-react";

export const AuthBranding = () => {
    return (
        <div className="relative hidden h-full flex-col bg-zinc-900 p-10 text-white lg:flex dark:border-r">
            <div className="absolute inset-0 bg-zinc-900" />
            {/* Abstract Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
            </div>

            <div className="relative z-20 flex items-center text-lg font-medium">
                <div className="bg-blue-600 p-1.5 rounded-lg mr-2">
                    <Mail className="h-5 w-5 text-white" />
                </div>
                Aiclex Mail Engine
            </div>

            <div className="relative z-20 mt-auto">
                <blockquote className="space-y-2">
                    <p className="text-lg">
                        &ldquo;This platform has completely transformed how we handle our cold outreach. The AI lead scoring is a game changer. It's not just an email tool; it's a growth engine.&rdquo;
                    </p>
                    <footer className="text-sm pt-2">
                        <div className="font-semibold">Sofia Davis</div>
                        <div className="text-zinc-400 text-xs">Head of Growth at TechFlow</div>
                    </footer>
                </blockquote>
            </div>
        </div>
    );
};
