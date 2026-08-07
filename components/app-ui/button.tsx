import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-glow hover:brightness-105",
        secondary:
          "bg-slate-900 text-white hover:bg-slate-800",
        outline:
          "border border-ink/10 bg-white text-ink shadow-sm hover:border-primary-300 hover:text-primary-700",
        ghost: "text-mist hover:bg-slate-100 hover:text-ink",
        destructive:
          "bg-rose-600 text-white hover:bg-rose-500",
        success:
          "bg-gradient-to-r from-success-500 to-success-600 text-white shadow-glow-green hover:brightness-105",
        link: "text-primary-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 [&_svg]:size-4",
        sm: "h-8 rounded-full px-3 text-xs [&_svg]:size-3.5",
        lg: "h-11 rounded-full px-6 text-[15px] [&_svg]:size-4",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
