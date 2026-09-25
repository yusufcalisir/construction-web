/**
 * Safe Contact Utilities
 * 
 * Prevents phone numbers and direct WhatsApp URLs from being scraped by automated bots.
 * Numbers and URLs are obfuscated in memory and decoded only during client-side user interactions.
 */

// Obfuscated character codes
const _RAW_CODES = [43, 57, 48, 53, 52, 53, 56, 50, 53, 57, 52, 57, 53];
const _DISP_CODES = [48, 53, 52, 53, 32, 56, 50, 53, 32, 57, 52, 32, 57, 53];
const _WA_CODES = [57, 48, 53, 52, 53, 56, 50, 53, 57, 52, 57, 53];

export const MASKED_PHONE_DISPLAY = '0545 ••• •• 95';

/**
 * Returns raw phone number string
 */
export function getRawPhone(): string {
  return String.fromCharCode(..._RAW_CODES);
}

/**
 * Returns formatted phone string for display (0545 825 94 95)
 */
export function getDisplayPhone(): string {
  return String.fromCharCode(..._DISP_CODES);
}

/**
 * Initiates phone call on client side without exposing tel: in static HTML
 */
export function triggerPhoneCall(): void {
  if (typeof window === 'undefined') return;
  window.location.href = `tel:${getRawPhone()}`;
}

/**
 * Copies phone number to clipboard
 */
export async function copyPhoneNumber(): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.clipboard) return false;
  try {
    await navigator.clipboard.writeText(getDisplayPhone());
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns WhatsApp direct chat URL
 */
export function getWhatsAppUrl(message?: string): string {
  const number = String.fromCharCode(..._WA_CODES);
  const baseUrl = `https://wa.me/${number}`;
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
  return baseUrl;
}

/**
 * Opens WhatsApp safely in a new tab without exposing the link to HTML crawlers
 */
export function openWhatsApp(message?: string): void {
  if (typeof window === 'undefined') return;
  const url = getWhatsAppUrl(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}
