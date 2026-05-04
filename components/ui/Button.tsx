"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "lautaro" | "rocio";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "rounded-xl font-semibold transition-all active:scale-95";

    const variants = {
      primary: "bg-white text-gray-900 hover:bg-gray-100",
      secondary: "bg-[#0f3460] text-white hover:bg-[#0f3460]/80",
      ghost: "bg-transparent text-gray-300 hover:bg-white/5",
      lautaro: "gradient-lautaro text-white shadow-lg shadow-cyan-500/30",
      rocio: "gradient-rocio text-white shadow-lg shadow-pink-500/30",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-7 py-3 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.95 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
