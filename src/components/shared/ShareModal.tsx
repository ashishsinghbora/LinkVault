import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Check, Share2, Download } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title, url }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [canWebShare, setCanWebShare] = useState(false);

  useEffect(() => {
    setCanWebShare(typeof navigator !== 'undefined' && !!navigator.share);
  }, []);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        url || window.location.href,
        {
          width: 220,
          margin: 2,
          color: {
            dark: '#07090b',
            light: '#ffffff',
          },
        },
        (error) => {
          if (error) console.error('Error generating QR code:', error);
        }
      );
    }
  }, [isOpen, url]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out ${title} on LinkVault`,
          url: url || window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    }
  };

  const handleDownloadQr = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `linkvault-qr-${Date.now()}.png`;
      a.click();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md p-6 bg-signal-900 dark:bg-signal-900 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 rounded-xl shadow-2xl text-signal-100 dark:text-signal-100 light:text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close share dialog"
          className="absolute top-4 right-4 p-2 text-signal-400 hover:text-signal-100 dark:hover:text-white light:hover:text-slate-900 rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-mint-500/10 text-mint-400 border border-mint-500/20">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h2 id="share-modal-title" className="text-lg font-bold font-mono tracking-tight">
              SHARE SIGNAL
            </h2>
            <p className="text-xs text-signal-400">Scan QR or share digital identity link</p>
          </div>
        </div>

        {/* QR Code Canvas */}
        <div className="flex flex-col items-center justify-center my-4 p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="p-3 bg-white rounded-lg shadow-inner">
            <canvas ref={canvasRef} aria-label="QR Code link to profile" />
          </div>
          <button
            onClick={handleDownloadQr}
            className="mt-3 flex items-center gap-1.5 text-xs text-signal-400 hover:text-mint-400 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download QR Code Image
          </button>
        </div>

        {/* URL Box */}
        <div className="flex items-center gap-2 p-2 rounded-lg bg-signal-950 dark:bg-signal-950 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200">
          <input
            type="text"
            readOnly
            value={url || (typeof window !== 'undefined' ? window.location.href : '')}
            className="flex-1 bg-transparent px-2 text-xs font-mono text-signal-300 dark:text-signal-300 light:text-slate-700 outline-none select-all truncate"
          />
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-mint-500/20 hover:bg-mint-500/30 text-mint-400 border border-mint-500/30 text-xs font-medium transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </button>
        </div>

        {canWebShare && (
          <button
            onClick={handleNativeShare}
            className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-mint-500 hover:bg-mint-400 text-signal-950 font-semibold text-sm transition-colors shadow-signal-glow"
          >
            <Share2 className="w-4 h-4" />
            Share via System Share Sheet
          </button>
        )}
      </div>
    </div>
  );
};
