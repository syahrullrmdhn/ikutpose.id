import { useState } from "react"
import { QrCode, Download, Smartphone, Copy, Check, Loader2 } from "lucide-react"

export default function QRCodeDownload({ imageDataUrl }) {
  const [uploadedUrl, setUploadedUrl] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)

  const uploadAndGenerateQR = async () => {
    if (!imageDataUrl) return
    setUploading(true)
    setError(null)
    try {
      const res = await fetch("/api/booth/upload-temp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageDataUrl }),
      })
      if (!res.ok) throw new Error("Upload gagal")
      const data = await res.json()
      setUploadedUrl(data.url)
    } catch (e) {
      console.error("Upload failed:", e)
      setError("Gagal upload foto. Coba lagi.")
      // Fallback: use a shareable data URL approach
      const blob = await (await fetch(imageDataUrl)).blob()
      const objUrl = URL.createObjectURL(blob)
      setUploadedUrl(objUrl)
    }
    setUploading(false)
  }

  const qrImageUrl = uploadedUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(uploadedUrl)}&bgcolor=ffffff&color=ff6b9d`
    : null

  const copyLink = async () => {
    if (uploadedUrl) {
      try {
        await navigator.clipboard.writeText(uploadedUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (e) {
        const input = document.createElement("input")
        input.value = uploadedUrl
        document.body.appendChild(input)
        input.select()
        document.execCommand("copy")
        document.body.removeChild(input)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center gap-1">
        <QrCode size={14} /> QR Download
      </p>

      {error && (
        <div className="p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {!uploadedUrl ? (
        <button
          onClick={uploadAndGenerateQR}
          disabled={uploading}
          className="w-full px-4 py-3 rounded-lg bg-charcoal text-white hover:bg-slate-800 font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {uploading ? (
            <><Loader2 size={18} className="animate-spin" /> Mengupload...</>
          ) : (
            <><Smartphone size={18} /> Generate QR Code</>
          )}
        </button>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-center p-3 bg-white dark:bg-gray-900 rounded-lg border border-border-subtle">
            {qrImageUrl && (
              <img
                src={qrImageUrl}
                alt="QR Code"
                className="w-40 h-40"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                const link = document.createElement("a")
                link.href = uploadedUrl
                link.download = "ikutpose-foto.png"
                link.click()
              }}
              className="px-3 py-2 rounded-lg bg-dusty-pink text-white hover:bg-rose-500 font-semibold text-sm transition-all flex items-center justify-center gap-1"
            >
              <Download size={14} /> Download
            </button>
            <button
              onClick={copyLink}
              className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-1 ${
                copied ? "bg-emerald-500 text-white" : "bg-slate-100 dark:bg-gray-800 text-text-secondary hover:bg-slate-200 dark:hover:bg-gray-700"
              }`}
            >
              {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy Link</>}
            </button>
          </div>

          {uploadedUrl && (
            <div className="p-2 bg-slate-50 dark:bg-gray-800 rounded-lg">
              <p className="text-[10px] text-text-muted truncate">{uploadedUrl}</p>
            </div>
          )}

          <p className="text-[10px] text-text-muted text-center">
            Scan QR dengan kamera HP untuk download langsung
          </p>
        </div>
      )}
    </div>
  )
}
