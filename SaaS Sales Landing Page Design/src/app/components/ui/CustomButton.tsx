import React from "react";
import { Link } from "react-router-dom";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
    
    const variants = {
      primary: "bg-blue-900 text-white hover:bg-blue-800 focus:ring-blue-900",
      secondary: "bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-500",
      outline: "border border-slate-200 bg-white hover:bg-slate-100 text-slate-900",
      ghost: "hover:bg-slate-100 text-slate-700",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      if (href.startsWith("http")) {
        return (
          <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
            {props.children}
          </a>
        );
      }
      return (
        <Link to={href} className={classes}>
          {props.children}
        </Link>
      );
    }

    return <button ref={ref} className={classes} {...props} />;
  }
);
Button.displayName = "Button";
