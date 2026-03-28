"use client";
import React, { useState } from "react";
import { X, UploadCloud, Loader2 } from "lucide-react";

interface MintModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
  onSuccess: (nft: any) => void;
}

export default function MintModal({ isOpen, onClose, walletAddress, onSuccess }: MintModalProps) {
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  async function handleMint(e: React.FormEvent) {
    e.preventDefault();
    if (!walletAddress || walletAddress === "******") {
      setError("Please connect your wallet properly first.");
      return;
    }
    if (!nftName || !imageUrl) {
      setError("Name and Image URL are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/nfts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerWallet: walletAddress,
          name: nftName,
          description: nftDescription,
          imageUrl: imageUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to mint.");
      
      onSuccess(data.nft);
      setNftName("");
      setNftDescription("");
      setImageUrl("");
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-teal-50/50 to-blue-50/50">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Mint NFT</h2>
            <p className="text-sm text-slate-500 font-medium">Create a new digital asset</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200/50 rounded-full transition-colors text-slate-500">
            <X size={20} strokeWidth={2.5}/>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleMint} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm font-semibold p-3 rounded-xl border border-red-100 text-center">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-slate-600 ml-1">Asset Name <span className="text-red-400">*</span></label>
            <input 
              type="text" 
              value={nftName}
              onChange={(e) => setNftName(e.target.value)}
              placeholder="e.g. Genesis Treasure Chest"
              disabled={loading}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-slate-600 ml-1">Image URL <span className="text-red-400">*</span></label>
            <div className="relative">
                <input 
                  type="url" 
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.png"
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                />
                <UploadCloud className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
            </div>
            {/* Preview image if valid url provided vaguely */}
            {imageUrl && imageUrl.startsWith('http') && (
                <div className="mt-2 h-24 w-24 rounded-xl border border-slate-200 overflow-hidden bg-slate-100 relative">
                     <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
                </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-slate-600 ml-1">Description (Optional)</label>
            <textarea 
              value={nftDescription}
              onChange={(e) => setNftDescription(e.target.value)}
              placeholder="Describe your Quantum NFT digital asset..."
              rows={3}
              disabled={loading}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-100 bg-slate-50/50 focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 resize-none"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-6 w-full py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold text-[15px] shadow-[0_4px_14px_rgba(20,184,166,0.3)] hover:shadow-[0_6px_20px_rgba(20,184,166,0.4)] hover:-translate-y-0.5 transition-all outline-none flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : "Mint & Store on Platform"}
          </button>
        </form>
      </div>
    </div>
  );
}
