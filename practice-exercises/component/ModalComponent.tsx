'use client';

import { HTMLAttributes, ReactNode, MouseEvent } from "react";
import Button from "./ButtonComponent";

export type SizeModal = "sm" | "md" | "lg" | "xl" | "2xl";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    size?: SizeModal;
    title?: string;
    isOpen: boolean;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    children?: ReactNode;
}

export default function Modal({
    size = "md",
    title = "Modal Title",
    isOpen,
    children,
    confirmLabel,
    cancelLabel,
    onConfirm,
    onCancel,
    ...rest
}: ModalProps) {
    if (!isOpen) return null;

    const sizeClass: Record<SizeModal, string> = {
        sm: "text-sm max-w-sm max-h-60",
        md: "text-base max-w-md max-h-80",
        lg: "text-lg max-w-lg max-h-[24rem]",
        xl: "text-xl max-w-xl max-h-[28rem]",
        "2xl": "text-2xl max-w-2xl max-h-[32rem]",
    };

    const handleBackdropClick = () => onCancel?.();

    const stopPropagation = (e: MouseEvent) => e.stopPropagation();

    return (
        <div
            className="fixed inset-0 bg-gray-500/50 flex justify-center items-center z-50"
            onClick={handleBackdropClick}
        >
            <div
                className={`bg-white p-6 rounded-lg shadow-md w-full ${sizeClass[size]} flex flex-col`}
                onClick={stopPropagation}
                {...rest}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-2 border-b border-gray-300 pb-2">
                    {/* Title */}
                    <div className="font-extrabold">{title}</div>

                    {/* Button Close */}
                    <button onClick={onCancel} aria-label="Close modal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <path
                                fill="currentColor"
                                d="m3.219 2.154l6.778 6.773l6.706-6.705c.457-.407.93-.164 1.119.04a.777.777 0 0 1-.044 1.035l-6.707 6.704l6.707 6.702c.298.25.298.74.059 1.014c-.24.273-.68.431-1.095.107l-6.745-6.749l-6.753 6.752c-.296.265-.784.211-1.025-.052c-.242-.264-.334-.72-.025-1.042l6.729-6.732l-6.701-6.704c-.245-.27-.33-.764 0-1.075c.33-.311.822-.268.997-.068Z"
                            />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto mb-4">
                    {children}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3">
                    {cancelLabel && (
                        <Button size={size} variant="secondary" onClick={onCancel}>
                            {cancelLabel}
                        </Button>
                    )}
                    {confirmLabel && (
                        <Button size={size} variant="primary" onClick={onConfirm}>
                            {confirmLabel}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
