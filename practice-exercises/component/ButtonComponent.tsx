'use client'
import { ReactNode, MouseEvent, ButtonHTMLAttributes, useState, useEffect } from "react"

export type SizeButton = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type VariantButton = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "surface" | "light" | "dark";
export type RoundedButton = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
export type StateButton = "loading" | "disable" | "default"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

    size?: SizeButton;
    variant?: VariantButton;
    rounded?: RoundedButton;
    state?: StateButton;
    isOutline?: boolean;
    preventDoubleClick?: true | false,
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    children?: ReactNode;
}

export default function Button({
    size = "md",
    variant = "primary",
    rounded = "md",
    state = "default",
    preventDoubleClick = true,
    isOutline = false,
    onClick,
    children,
    ...props
}: ButtonProps) {

    const [clicked, setClicked] = useState(false);
    const handleClick= (e:MouseEvent<HTMLButtonElement>)=>{
        if (preventDoubleClick)
        {
          
            if(clicked) return;
            setClicked(true);
        }
        onClick?.(e);
    };

    useEffect(() => {
        if (clicked) {
            const timer = setTimeout(() => setClicked(false), 1000); // reset after 1s
            return () => clearTimeout(timer);
        }
    }, [clicked]);

    const SizeClass: Record<SizeButton, string> = {
        "2xs": "text-[10px] py-1 px-2",
        xs: "text-xs py-1.5 px-3",
        sm: "text-sm py-2 px-4",
        md: "text-base py-2.5 px-5",
        lg: "text-lg py-3 px-6",
        xl: "text-xl py-3.5 px-7",
        "2xl": "text-2xl py-4 px-8",
    };



    const VariantClass: Record<VariantButton, string> = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-600 text-white hover:bg-gray-700",
        success: "bg-green-600 text-white hover:bg-green-700",
        danger: "bg-red-600 text-white hover:bg-red-700",
        warning: "bg-yellow-400 text-black hover:bg-yellow-500",
        info: "bg-blue-700 text-white hover:bg-blue-800",
        surface: "bg-gray-200 text-black hover:bg-gray-300",
        light: "bg-cyan-400 text-white hover:bg-cyan-500",
        dark: "bg-gray-800 text-white hover:bg-gray-900",
    };

    const RoundedClass: Record<RoundedButton, string> = {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
    };

    const OutlineClass: Record<VariantButton, string> = {
        primary: "border-blue-600  border-2 bg-white  text-blue-600 ",
        secondary: "border-gray-600  border-2 bg-white  text-gray-600",
        success: "border-green-600 border-2 bg-white  text-green-600",
        danger: "border-red-600 border-2 bg-white  text-red-600",
        warning: "border-yellow-400 border-2 bg-white text-yellow-400",
        info: "border-blue-700 border-2 bg-white  text-blue-700",
        surface: "border-gray-200 border-2 bg-white  text-gray-200",
        light: "border-cyan-400 border-2 bg-white  text-cyan-400",
        dark: "border-gray-800 border-2 bg-white  text-gray-800",
    };

    const isLoading = state === "loading";
    const isDisabled = state === "disable" || props.disabled;

    return (
        <button
            onClick={handleClick}
            disabled={props.disabled || isDisabled}
            className={`
                min-w-[50px]
                h-fit
                ${SizeClass[size]}
                ${RoundedClass[rounded]}
                 ${isOutline ? OutlineClass[variant] : VariantClass[variant]}
                font-semibold 
                cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed
            `}
            {...props}
        >
            {isLoading && (
                <span className="inline-block h-5 w-5 mr-3 border-2 border-t-transparent border-white rounded-full animate-spin" />
            )}
            <span>{children}</span>
        </button>
    );
}
