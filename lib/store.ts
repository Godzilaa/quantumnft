import { createHash, randomBytes } from "crypto";

export interface User {
  id: string;
  username: string;
  passwordHash: string | null;
  email: string;
  mobile?: string;
  referralCode?: string;
  walletAddress?: string;
  createdAt: string;
}

export interface NFT {
  id: string;
  ownerWallet: string;
  name: string;
  description: string;
  imageUrl: string;
  collection: string;
  createdAt: string;
}

// Module-level singletons — live for the lifetime of the Node.js process (fine for demo/dev)
export const users = new Map<string, User>();
export const emailCodes = new Map<string, { code: string; expires: number }>();
export const sessions = new Map<string, string>(); // token → username
export const nfts = new Map<string, NFT>(); // nftId → NFT

// Dynamic page content editable via admin route
export let pageContent = {
  heroTitle: "EXPLORE, DISCOVER AND EARN BIG WITH ONE OF THE TOP WEB3 NFT MARKETPLACES IN THE WORLD",
  heroSubtitle: "Treasure Fun leverages a proprietary AI-powered algorithmic trading model...",
  reserveTitle: "RESERVE AND SELL YOUR NFT EASILY",
  reserveSubtitle: "Earning income in Treasure Fun is simple: just RESERVE and then TRADE to EARN",
  footerText: "The world's first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs).",
};

export function updatePageContent(newData: any) {
  pageContent = { ...pageContent, ...newData };
}

export function hashPassword(pw: string): string {
  return createHash("sha256").update(pw + "tf_salt_2024").digest("hex");
}

export function generateToken(): string {
  return randomBytes(32).toString("hex");
}

export function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}
