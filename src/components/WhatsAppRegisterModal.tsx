import { X } from "lucide-react"
import { Link } from "react-router"

export function WhatsAppRegisterModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-register-modal-title"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-md mx-4 rounded-2xl bg-white shadow-2xl p-8 sm:p-10 animate-in fade-in zoom-in duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Close"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
        <div className="grid h-14 w-14 place-items-center rounded-full bg-gus-mint text-gus-green mb-4">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
            aria-hidden
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2
          id="whatsapp-register-modal-title"
          className="text-center font-display text-2xl font-semibold text-gus-deep"
        >
          Register to join the WhatsApp group
        </h2>
        <p className="mt-4 text-center text-gray-600 leading-relaxed">
          The WhatsApp group is reserved for registered summit attendees.
          Please complete your registration first to receive the group link and
          summit announcements.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/register"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-gus-orange px-7 py-3 font-display font-semibold text-black hover:bg-gus-yellow transition"
          >
            Register Now
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-gray-200 px-7 py-3 font-display font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
