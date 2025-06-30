'use client';

import { HTMLAttributes, ReactNode } from "react";
import Button from "./ButtonComponent";

export type SizeModal = "sm" | "md" | "lg" | "xl" | "2xl";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  size?: SizeModal;
  title?: string;
  isOpen: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: ReactNode;
}

export default function Modal({
  size = "md",
  title = "Modal Title",
  isOpen,
  children,
  onConfirm,
  onCancel,
  ...rest
}: ModalProps) {
  if (!isOpen) return null;

  const SizeClass: Record<SizeModal, string> = {
    sm: "text-sm max-w-sm max-h-60",
    md: "text-base max-w-md max-h-80",
    lg: "text-lg max-w-lg max-h-[24rem]",
    xl: "text-xl max-w-xl max-h-[28rem]",
    "2xl": "text-2xl max-w-2xl max-h-[32rem]",
  };

  const handleWrapperClick = () => {
    onCancel?.();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // chặn sự kiện click bên ngoài
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500/50 flex justify-center items-center z-50"
      onClick={handleWrapperClick}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-md w-full ${SizeClass[size]} flex flex-col`}
        onClick={handleContentClick}
        {...rest}
      >
        {/* Header */}
        <div className="font-bold  mb-2 border-b border-gray-300 pb-2">
          {title}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto mb-4">
          {children}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <Button size={size} variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button size={size} onClick={onConfirm}>OK</Button>
        </div>
      </div>
    </div>
  );
}
