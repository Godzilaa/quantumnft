import { NextRequest, NextResponse } from "next/server";
import { nfts, generateToken } from "@/lib/store";

// GET all NFTs, optionally filtering by ownerWallet
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ownerWallet = searchParams.get("ownerWallet");

  let allNFTs = Array.from(nfts.values());

  if (ownerWallet) {
    const normalised = ownerWallet.toLowerCase();
    allNFTs = allNFTs.filter((nft) => nft.ownerWallet === normalised);
  }

  // Sort by newest
  allNFTs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json({ success: true, nfts: allNFTs });
}

// POST to create/mint a new NFT
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ownerWallet, name, description, imageUrl, collection } = body;

    if (!ownerWallet || !name || !imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields (ownerWallet, name, imageUrl)" },
        { status: 400 }
      );
    }

    const id = generateToken().slice(0, 16);
    const newNFT = {
      id,
      ownerWallet: ownerWallet.toLowerCase(),
      name,
      description: description || "",
      imageUrl,
      collection: collection || "Quantum NFT Originals",
      createdAt: new Date().toISOString(),
    };

    nfts.set(id, newNFT);

    return NextResponse.json({ success: true, nft: newNFT });
  } catch (err) {
    return NextResponse.json({ error: "Failed to mint NFT" }, { status: 500 });
  }
}
