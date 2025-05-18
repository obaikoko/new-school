import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const  showZodErrors = (error: any) => {
  if (error?.data?.errors && typeof error.data.errors === 'object') {
    Object.entries(error.data.errors).forEach(([field, message]) => {
      toast.error(`${field}: ${message}`);
    });
  } else {
    toast.error(error?.data?.message || 'Login failed');
  }
}