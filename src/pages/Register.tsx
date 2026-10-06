import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { useNavigate, useSearchParams } from "react-router"
import {
  AlertCircle,
  Check,
  Copy,
  FileText,
  Loader2,
  Upload,
  Utensils,
  ChefHat,
  Soup,
} from "lucide-react"
import { Container, Button } from "../components/ui"
import { SUBMIT_URL, PACKAGES, MEALS, BANK, naira, type Pkg } from "../data"

type Form = {
  fullName: string
  phone: string
  email: string
  pkg: Pkg | ""
  meal: string
  frameWording: string
  colourCustomization: "" | "Yes" | "No"
  colour: string
  amountPaid: string
  declared: boolean
}
const empty: Form = {
  fullName: "",
  phone: "",
  email: "",
  pkg: "",
  meal: "",
  frameWording: "",
  colourCustomization: "",
  colour: "",
  amountPaid: "",
  declared: false,
}
type StepId = "details" | "package" | "meal" | "souvenir" | "payment" | "review"
const LABEL: Record<StepId, string> = {
  details: "Details",
  package: "Package",
  meal: "Meal",
  souvenir: "Souvenir",
  payment: "Payment",
  review: "Review",
}
const MAX = 5 * 1024 * 1024
const ACCEPT = ["image/jpeg", "image/png", "application/pdf"]

const toBase64 = (blob: Blob) =>
  new Promise<string>((res, rej) => {
    const r = new FileReader()
    r.onload = () => res(String(r.result).split(",")[1] ?? "")
    r.onerror = () => rej(new Error("Could not read the receipt file."))
    r.readAsDataURL(blob)
  })

async function compressImage(
  file: File,
): Promise<{ blob: Blob; name: string; mime: string }> {
  const bmp = await createImageBitmap(file)
  const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height))
  const c = document.createElement("canvas")
  c.width = Math.round(bmp.width * scale)
  c.height = Math.round(bmp.height * scale)
  const ctx = c.getContext("2d")!
  ctx.fillStyle = "#fff"
  ctx.fillRect(0, 0, c.width, c.height)
  ctx.drawImage(bmp, 0, 0, c.width, c.height)
  const blob: Blob | null = await new Promise((r) =>
    c.toBlob(r, "image/jpeg", 0.8),
  )
  if (!blob) throw new Error("Could not process the image.")
  return {
    blob,
    name: file.name.replace(/\.\w+$/, "") + ".jpg",
    mime: "image/jpeg",
  }
}

function Field({
  label,
  id,
  hint,
  error,
  children,
}: {
  label: string
  id: string
  hint?: string
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-display text-base font-semibold"
      >
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-sm text-black/65">{hint}</p>}
      {error && (
        <p
          id={`${id}-err`}
          role="alert"
          className="mt-1.5 text-sm font-semibold text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  )
}
const input =
  "min-h-12 w-full rounded-2xl border-2 border-black/20 bg-white px-4 py-3 text-base outline-none transition focus:border-gus-orange focus:ring-4 focus:ring-gus-orange/25 aria-[invalid=true]:border-red-600"

function RadioCard({
  checked,
  onChange,
  name,
  title,
  sub,
  icon,
}: {
  checked: boolean
  onChange: () => void
  name: string
  title: string
  sub?: string
  icon?: ReactNode
}) {
  return (
    <label
      className={`relative flex min-h-[64px] cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition focus-within:ring-4 focus-within:ring-gus-orange/30 ${
        checked
          ? "border-gus-orange bg-gus-peach"
          : "border-black/15 bg-white hover:border-gus-orange/60"
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {icon && (
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${
            checked ? "bg-gus-orange text-black" : "bg-gus-sky text-gus-green"
          }`}
        >
          {icon}
        </span>
      )}
      <span className="flex-1">
        <span className="block font-display text-lg font-semibold">
          {title}
        </span>
        {sub && <span className="block text-sm text-black/70">{sub}</span>}
      </span>
      <span
        className={`grid h-7 w-7 place-items-center rounded-full border-2 ${
          checked ? "border-gus-orange bg-gus-orange" : "border-black/30"
        }`}
      >
        {checked && <Check className="h-4 w-4" aria-hidden />}
      </span>
    </label>
  )
}

export default function Register() {
  const nav = useNavigate()
  const [params] = useSearchParams()
  const pre = params.get("package")
  const [f, setF] = useState<Form>({
    ...empty,
    pkg: pre === "Nūr" || pre === "Khayr" ? pre : "",
  })
  const [idx, setIdx] = useState(0)
  const [errs, setErrs] = useState<Record<string, string>>({})
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileErr, setFileErr] = useState("")
  const [copied, setCopied] = useState(false)
  const [busy, setBusy] = useState(false)
  const [alert, setAlert] = useState("")
  const lock = useRef(false)
  const top = useRef<HTMLDivElement>(null)

  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview)
    },
    [preview],
  )

  const steps = useMemo<StepId[]>(
    () =>
      f.pkg === "Khayr"
        ? ["details", "package", "meal", "souvenir", "payment", "review"]
        : ["details", "package", "meal", "payment", "review"],
    [f.pkg],
  )
  const step = steps[Math.min(idx, steps.length - 1)]
  const pkg = PACKAGES.find((p) => p.id === f.pkg)
  const due = pkg?.price ?? 0
  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setF((s) => ({ ...s, [k]: v }))
    setErrs((e) => ({ ...e, [k]: "" }))
  }

  function validate(s: StepId): Record<string, string> {
    const e: Record<string, string> = {}
    if (s === "details") {
      if (f.fullName.trim().length < 3)
        e.fullName = "Please enter your full name."
      if (!/^(?:\+?234|0)[789][01]\d{8}$/.test(f.phone.replace(/[\s-]/g, "")))
        e.phone = "Enter a valid Nigerian number, e.g. 0803 123 4567."
      if (!/^\S+@\S+\.\S+$/.test(f.email.trim()))
        e.email = "Enter a valid email. Your ticket will be sent here."
    }
    if (s === "package" && !f.pkg) e.pkg = "Please choose a package."
    if (s === "meal" && !f.meal) e.meal = "Please choose a meal."
    if (s === "souvenir") {
      if (!f.frameWording.trim())
        e.frameWording = "Tell us what to write on your frame."
      if (!f.colourCustomization)
        e.colourCustomization = "Please choose Yes or No."
      if (f.colourCustomization === "Yes" && !f.colour.trim())
        e.colour = "Tell us your preferred colour."
    }
    if (s === "payment") {
      if (due <= 0) e.amountPaid = "Enter the amount you paid."
      if (!file) e.file = "Please upload your payment receipt."
    }
    if (s === "review" && !f.declared)
      e.declared = "Please accept the declaration to continue."
    return e
  }
  const missing = Object.values(validate(step))
  const valid = missing.length === 0
  const goTo = (n: number) => {
    setIdx(n)
    setAlert("")
    requestAnimationFrame(() =>
      top.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    )
  }
  function next() {
    const e = validate(step)
    setErrs(e)
    if (Object.keys(e).length) {
      document.getElementById(Object.keys(e)[0])?.focus()
      return
    }
    goTo(idx + 1)
  }

  function pick(file?: File) {
    setFileErr("")
    setErrs((e) => ({ ...e, file: "" }))
    if (!file) return
    if (!ACCEPT.includes(file.type)) {
      setFileErr("Please upload a JPG, PNG or PDF file.")
      return
    }
    if (file.size > MAX) {
      setFileErr("That file is larger than 5MB. Please choose a smaller one.")
      return
    }
    setFile(file)
    setPreview(
      file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
    )
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(BANK.number)
    } catch {
      /* ignore */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function submit() {
    if (lock.current) return
    const e = validate("review")
    setErrs(e)
    if (
      Object.keys(e).length ||
      !file ||
      !f.pkg ||
      steps.some((x) => Object.keys(validate(x)).length)
    )
      return
    lock.current = true
    setBusy(true)
    setAlert("")
    try {
      let blob: Blob = file,
        name = file.name,
        mime = file.type
      if (file.type.startsWith("image/")) {
        const c = await compressImage(file)
        blob = c.blob
        name = c.name
        mime = c.mime
      }
      if (blob.size > MAX)
        throw new Error(
          "Your receipt is too large. Please upload a smaller file.",
        )
      const khayr = f.pkg === "Khayr"
      const body = {
        fullName: f.fullName.trim(),
        phone: f.phone.trim(),
        email: f.email.trim(),
        package: f.pkg,
        meal: f.meal,
        ...(khayr
          ? {
              frameWording: f.frameWording.trim(),
              colourCustomization: f.colourCustomization,
              colour: f.colourCustomization === "Yes" ? f.colour.trim() : "",
            }
          : {}),
        amountPaid: due,
        receiptBase64: await toBase64(blob),
        receiptName: name,
        receiptMime: mime,
      }
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(body),
      })
      const data: { ok: boolean; ticketId?: string; error?: string } =
        await res.json()
      if (!data.ok || !data.ticketId)
        throw new Error(data.error || "Something went wrong.")
      const ticket = {
        ticketId: data.ticketId,
        fullName: body.fullName,
        package: f.pkg,
        meal: f.meal,
        frameWording: khayr ? body.frameWording : "",
        colour: khayr && f.colourCustomization === "Yes" ? f.colour.trim() : "",
      }
      sessionStorage.setItem("gus-ticket", JSON.stringify(ticket))
      nav("/ticket", { state: ticket })
    } catch (err) {
      setAlert(
        err instanceof Error &&
          err.message &&
          !/fetch|network|json/i.test(err.message)
          ? err.message
          : "We couldn't complete your registration. Please check your connection and try again.",
      )
      lock.current = false
      setBusy(false)
      top.current?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const pct = ((idx + 1) / steps.length) * 100
  const row = (k: string, v: string) => (
    <div className="flex justify-between gap-4 border-b border-black/10 py-2.5 last:border-0">
      <dt className="text-black/65">{k}</dt>
      <dd className="text-right font-semibold">{v}</dd>
    </div>
  )
  const mealIcons = [
    <Utensils key="a" className="h-6 w-6" />,
    <ChefHat key="b" className="h-6 w-6" />,
    <Soup key="c" className="h-6 w-6" />,
  ]

  return (
    <section className="bg-gus-cream py-10 sm:py-16">
      <Container className="max-w-2xl">
        <div ref={top} className="scroll-mt-24 text-center">
          <h1 className="font-display text-3xl font-semibold text-gus-orange sm:text-5xl">
            Register
          </h1>
          <p className="mt-1">GUS Muslimah Business Summit 2.0</p>
        </div>

        <div className="mt-8" role="group" aria-label="Registration progress">
          <div className="mb-2 flex justify-between font-display text-sm font-semibold">
            <span>
              Step {idx + 1} of {steps.length}: {LABEL[step]}
            </span>
            <span className="text-gus-green">{Math.round(pct)}%</span>
          </div>
          <div
            className="h-3 overflow-hidden rounded-full bg-white"
            role="progressbar"
            aria-valuenow={idx + 1}
            aria-valuemin={1}
            aria-valuemax={steps.length}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-gus-orange to-gus-yellow transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <ol className="mt-3 hidden justify-between text-xs font-semibold sm:flex">
            {steps.map((s, i) => (
              <li
                key={s}
                className={i <= idx ? "text-gus-green" : "text-black/50"}
              >
                {i < idx ? "✓ " : ""}
                {LABEL[s]}
              </li>
            ))}
          </ol>
        </div>

        {alert && (
          <div
            role="alert"
            className="fade-up mt-6 flex gap-3 rounded-2xl border-2 border-red-300 bg-red-50 p-4 text-red-900"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            <div>
              <p className="font-display font-semibold">Oops, sister!</p>
              <p>{alert}</p>
            </div>
          </div>
        )}

        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            step === "review" ? submit() : next()
          }}
          className="mt-6 rounded-[28px] bg-white p-5 shadow-md sm:p-8"
        >
          <div key={step} className="fade-up space-y-5">
            {step === "details" && (
              <>
                <h2 className="font-display text-2xl font-semibold text-gus-green">
                  Attendee information
                </h2>
                <Field label="Full name" id="fullName" error={errs.fullName}>
                  <input
                    id="fullName"
                    autoComplete="name"
                    className={input}
                    value={f.fullName}
                    aria-invalid={!!errs.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                  />
                </Field>
                <Field
                  label="Phone / WhatsApp number"
                  id="phone"
                  error={errs.phone}
                >
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="0803 123 4567"
                    className={input}
                    value={f.phone}
                    aria-invalid={!!errs.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                </Field>
                <Field
                  label="Email address"
                  id="email"
                  hint="Your ticket will be sent to this email."
                  error={errs.email}
                >
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={input}
                    value={f.email}
                    aria-invalid={!!errs.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                </Field>
              </>
            )}

            {step === "package" && (
              <fieldset className="space-y-3">
                <legend className="mb-3 font-display text-2xl font-semibold text-gus-green">
                  Choose your package
                </legend>
                {PACKAGES.map((p) => (
                  <RadioCard
                    key={p.id}
                    name="pkg"
                    checked={f.pkg === p.id}
                    onChange={() => {
                      set("pkg", p.id)
                      if (idx >= 3) setIdx(2)
                    }}
                    title={`${p.id} Package · ${naira(p.price)}`}
                    sub={
                      p.id === "Khayr"
                        ? "Includes a personalized souvenir frame"
                        : "Full summit access and a meal"
                    }
                  />
                ))}
                {errs.pkg && (
                  <p
                    role="alert"
                    className="text-sm font-semibold text-red-700"
                  >
                    {errs.pkg}
                  </p>
                )}
              </fieldset>
            )}

            {step === "meal" && (
              <fieldset className="space-y-3">
                <legend className="mb-3 font-display text-2xl font-semibold text-gus-green">
                  Pick your meal
                </legend>
                {MEALS.map((m, i) => (
                  <RadioCard
                    key={m}
                    name="meal"
                    checked={f.meal === m}
                    onChange={() => set("meal", m)}
                    title={m}
                    icon={mealIcons[i]}
                  />
                ))}
                {errs.meal && (
                  <p
                    role="alert"
                    className="text-sm font-semibold text-red-700"
                  >
                    {errs.meal}
                  </p>
                )}
              </fieldset>
            )}

            {step === "souvenir" && (
              <>
                <h2 className="font-display text-2xl font-semibold text-gus-green">
                  Customize your souvenir
                </h2>
                <Field
                  label="Name or wording for your frame"
                  id="frameWording"
                  hint="Keep it short, e.g. your name."
                  error={errs.frameWording}
                >
                  <input
                    id="frameWording"
                    maxLength={60}
                    className={input}
                    value={f.frameWording}
                    aria-invalid={!!errs.frameWording}
                    onChange={(e) => set("frameWording", e.target.value)}
                  />
                </Field>
                <fieldset>
                  <legend className="mb-2 font-display text-base font-semibold">
                    Would you like a special colour customization?
                  </legend>
                  <div className="grid grid-cols-2 gap-3">
                    {(["Yes", "No"] as const).map((v) => (
                      <RadioCard
                        key={v}
                        name="cc"
                        checked={f.colourCustomization === v}
                        onChange={() => set("colourCustomization", v)}
                        title={v}
                      />
                    ))}
                  </div>
                  {errs.colourCustomization && (
                    <p
                      role="alert"
                      className="mt-1.5 text-sm font-semibold text-red-700"
                    >
                      {errs.colourCustomization}
                    </p>
                  )}
                </fieldset>
                {f.colourCustomization === "Yes" && (
                  <Field
                    label="Preferred colour"
                    id="colour"
                    error={errs.colour}
                  >
                    <input
                      id="colour"
                      className={input}
                      value={f.colour}
                      aria-invalid={!!errs.colour}
                      onChange={(e) => set("colour", e.target.value)}
                    />
                  </Field>
                )}
              </>
            )}

            {step === "payment" && (
              <>
                <h2 className="font-display text-2xl font-semibold text-gus-green">
                  Payment
                </h2>
                <div className="rounded-2xl bg-gus-yellow p-5 text-center">
                  <p className="font-accent text-lg font-semibold">
                    Amount due ({f.pkg})
                  </p>
                  <p
                    className="font-display text-5xl font-semibold"
                    aria-live="polite"
                  >
                    {naira(due)}
                  </p>
                </div>
                <div className="rounded-2xl bg-gus-black p-5 text-white">
                  <p className="font-accent text-lg text-gus-yellow">
                    Pay by bank transfer to
                  </p>
                  <dl className="mt-3 space-y-1">
                    <div className="flex justify-between">
                      <dt className="text-white/70">Bank</dt>
                      <dd className="font-semibold">{BANK.bank}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-white/70">Account name</dt>
                      <dd className="text-right font-semibold">{BANK.name}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-white/70">Account number</dt>
                      <dd className="font-display text-2xl font-semibold tracking-wider text-gus-yellow">
                        {BANK.number}
                      </dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    onClick={copy}
                    className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white font-display font-semibold text-black hover:bg-gus-yellow"
                  >
                    {copied ? (
                      <>
                        <Check className="h-5 w-5 text-gus-green" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-5 w-5" /> Copy account number
                      </>
                    )}
                  </button>
                  <span className="sr-only" role="status">
                    {copied ? "Account number copied" : ""}
                  </span>
                </div>
                <Field
                  label="Amount paid (₦)"
                  id="amountPaid"
                  error={errs.amountPaid}
                >
                  <input
                    id="amountPaid"
                    type="text"
                    readOnly
                    className={`${input} cursor-not-allowed bg-gus-sky/40 font-semibold`}
                    value={due ? naira(due) : ""}
                    aria-invalid={!!errs.amountPaid}
                  />
                </Field>
                <div>
                  <label
                    htmlFor="receipt"
                    className="mb-1.5 block font-display text-base font-semibold"
                  >
                    Upload payment receipt
                  </label>
                  <label
                    htmlFor="receipt"
                    className="flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-gus-orange bg-gus-peach/50 p-4 text-center focus-within:ring-4 focus-within:ring-gus-orange/30 hover:bg-gus-peach"
                  >
                    <Upload className="h-7 w-7 text-gus-orange" aria-hidden />
                    <span className="font-semibold">
                      {file ? "Tap to replace file" : "Tap to upload"}
                    </span>
                    <span className="text-sm text-black/65">
                      JPG, PNG or PDF · max 5MB
                    </span>
                  </label>
                  <input
                    id="receipt"
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
                    className="sr-only"
                    onChange={(e) => pick(e.target.files?.[0])}
                  />
                  {(fileErr || errs.file) && (
                    <p
                      id="file-err"
                      role="alert"
                      className="mt-1.5 text-sm font-semibold text-red-700"
                    >
                      {fileErr || errs.file}
                    </p>
                  )}
                  {file && (
                    <div className="mt-3 flex items-center gap-3 rounded-2xl bg-gus-mint p-3">
                      {preview ? (
                        <img
                          src={preview}
                          alt="Receipt preview"
                          className="h-20 w-20 rounded-xl object-cover"
                        />
                      ) : (
                        <span className="grid h-20 w-20 place-items-center rounded-xl bg-white">
                          <FileText className="h-8 w-8 text-gus-green" />
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{file.name}</p>
                        <p className="text-sm text-black/65">
                          {(file.size / 1024).toFixed(0)} KB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {step === "review" && (
              <>
                <h2 className="font-display text-2xl font-semibold text-gus-green">
                  Review &amp; confirm
                </h2>
                <dl className="rounded-2xl bg-gus-sky p-5">
                  {row("Name", f.fullName)}
                  {row("Phone", f.phone)}
                  {row("Email", f.email)}
                  {row("Package", `${f.pkg} (${naira(due)})`)}
                  {row("Meal", f.meal)}
                  {f.pkg === "Khayr" && (
                    <>
                      {row("Frame wording", f.frameWording)}
                      {row(
                        "Colour",
                        f.colourCustomization === "Yes"
                          ? f.colour
                          : "No customization",
                      )}
                    </>
                  )}
                  {row("Amount paid", naira(due))}
                  {row("Receipt", file?.name ?? "")}
                </dl>
                <div>
                  <label className="flex cursor-pointer gap-3 rounded-2xl border-2 border-black/15 p-4 focus-within:ring-4 focus-within:ring-gus-orange/30">
                    <input
                      id="declared"
                      type="checkbox"
                      checked={f.declared}
                      onChange={(e) => set("declared", e.target.checked)}
                      aria-invalid={!!errs.declared}
                      className="mt-1 h-6 w-6 shrink-0 accent-[#FF5A14]"
                    />
                    <span className="text-sm leading-relaxed">
                      By submitting this form, I confirm that the information
                      provided is accurate and that I have selected the package,
                      meal option, and other preferences I intend to receive.
                      Please note that selections cannot be changed after
                      submission.
                    </span>
                  </label>
                  {errs.declared && (
                    <p
                      role="alert"
                      className="mt-1.5 text-sm font-semibold text-red-700"
                    >
                      {errs.declared}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            {idx > 0 && (
              <Button
                type="button"
                variant="outline"
                disabled={busy}
                onClick={() => goTo(idx - 1)}
                className="flex-1"
              >
                Back
              </Button>
            )}
            {step === "review" ? (
              <Button
                type="submit"
                disabled={busy || !valid}
                aria-busy={busy}
                className="flex-[2] disabled:cursor-not-allowed disabled:opacity-45"
              >
                {busy ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Submitting…
                  </>
                ) : (
                  "Submit Registration"
                )}
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!valid}
                className="flex-[2] disabled:cursor-not-allowed disabled:opacity-45"
              >
                Next
              </Button>
            )}
          </div>
          {!valid && !busy && (
            <p
              id="step-hint"
              role="status"
              className="mt-3 text-center text-sm text-black/65"
            >
              Complete all required fields to continue.
              {missing.length > 0 && (
                <span className="mt-1 block font-semibold text-red-700">
                  {missing[0]}
                </span>
              )}
            </p>
          )}
          {busy && (
            <p role="status" className="mt-3 text-center text-sm text-black/65">
              Please keep this page open, this can take a few seconds.
            </p>
          )}
        </form>
      </Container>
    </section>
  )
}
