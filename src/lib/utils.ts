import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString: Date): string => {
  const date = new Date(String(dateString));

  // Format time
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const isAM = hours < 12;

  console.log(hours, minutes, seconds, isAM);

  const formattedTime = `${String(hours % 12 || 12).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")} ${
    isAM ? "am" : "pm"
  }`;

  // Format date
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return `${formattedTime} ${day} ${month} ${year}`;
};