import { type ClassValue, clsx } from "clsx";

/**
 * Merges conditional class name values into a single string.
 * Requires `clsx` (npm install clsx).
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
