export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "App";

export const APP_LOGO = "/logo.png";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};

export const CONTACT_EMAIL = "morasiodigital@gmail.com";
export const CONTACT_PHONE = "+244 973 929 712";
export const CONTACT_WHATSAPP = "244973929712";

export const PAYMENT_METHODS = {
  express: {
    name: "Express",
    number: "973 929 712",
    color: "bg-yellow-500",
  },
  paypay: {
    name: "PayPay AO",
    number: "930 441 438",
    color: "bg-blue-500",
  },
  unitel: {
    name: "Unitel Money",
    number: "973 929 712",
    color: "bg-orange-500",
  },
  iban_bai: {
    name: "IBAN Banco Bai",
    number: "0040.0000.9841.5347.1016.4",
    holder: "Delvis de Jesus Manuel de Morais",
    color: "bg-gray-700",
  },
  iban_bfa: {
    name: "IBAN Banco BFA",
    number: "0006.0000.6124.2719.3019.8",
    holder: "Delvis de Jesus Manuel de Morais",
    color: "bg-gray-600",
  },
  presencial: {
    name: "Pagamento Presencial",
    description: "Pague diretamente em mãos após combinar o local",
    color: "bg-green-600",
  },
} as const;

export function formatPrice(cents: number): string {
  return `${(cents / 100).toFixed(2).replace('.', ',')} Kz`;
}

export function getWhatsAppLink(message: string): string {
  return `https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(message)}`;
}
