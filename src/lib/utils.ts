import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
/**
 * Shared utility to determine if a link should be visible based on its 
 * active state and optional scheduling window.
 */
export function isLinkVisible(link: any): boolean {
  if (!link || !link.active) return false;
  if (link.schedule?.enabled) {
    const now = new Date().getTime();
    if (link.schedule.startAt) {
      const startTime = new Date(link.schedule.startAt).getTime();
      if (isNaN(startTime) || startTime > now) return false;
    }
    if (link.schedule.endAt) {
      const endTime = new Date(link.schedule.endAt).getTime();
      if (!isNaN(endTime) && endTime < now) return false;
    }
  }
  return true;
}