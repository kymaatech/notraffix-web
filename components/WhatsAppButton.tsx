import { whatsappLink } from "@/lib/site";

/* Floating WhatsApp chat button (bottom-right). The back-to-top button sits above it. */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Notraffix on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-[#25D366] pl-4 pr-4 text-[#0B2E19] shadow-[0_12px_30px_-10px_rgb(0_0_0/.45)] transition-[transform,padding] duration-300 hover:pr-5 active:scale-[0.97] sm:bottom-8 sm:right-8"
    >
      <svg viewBox="0 0 32 32" className="h-6 w-6 shrink-0" aria-hidden>
        <path
          fill="currentColor"
          d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3.2 29l6.9-1.9c1.9 1 4 1.6 6.2 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3Zm0 23.2c-2 0-3.9-.6-5.5-1.6l-.4-.2-4.1 1.1 1.1-4-.3-.4a10.4 10.4 0 0 1-1.6-5.5C5.2 9.8 10 5.1 16 5.1s10.8 4.7 10.8 10.5S22 26.2 16 26.2Zm5.9-7.8c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.8 8.8 0 0 1-4.4-3.8c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 2 .8 2.7.9 3.7.7.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.3Z"
        />
      </svg>
      <span className="hidden text-[15px] font-medium sm:inline">WhatsApp</span>
    </a>
  );
}
