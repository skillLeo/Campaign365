import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat('en-US').format(n);
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(date));
}

export function formatRelativeTime(date: string | Date) {
  const now = new Date();
  const d = new Date(date);
  const diff = now.getTime() - d.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return formatDate(date);
}

export function getSentimentColor(sentiment: string) {
  switch (sentiment) {
    case 'supporter': return 'text-green-600 bg-green-50';
    case 'undecided': return 'text-yellow-600 bg-yellow-50';
    case 'opposition': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export function getStatusColor(status: string) {
  switch (status) {
    case 'active': return 'text-green-700 bg-green-100';
    case 'inactive': return 'text-gray-600 bg-gray-100';
    case 'suspended': return 'text-red-700 bg-red-100';
    case 'pending': return 'text-yellow-700 bg-yellow-100';
    case 'completed': return 'text-blue-700 bg-blue-100';
    default: return 'text-gray-600 bg-gray-100';
  }
}
