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

// Module-level singletons — live for the lifetime of the Node.js process (fine for demo/dev)
export const users = new Map<string, User>();
export const emailCodes = new Map<string, { code: string; expires: number }>();
export const sessions = new Map<string, string>(); // token → username

export function hashPassword(pw: string): string {
  return createHash("sha256").update(pw + "tf_salt_2024").digest("hex");
}

export function generateToken(): string {
  return randomBytes(32).toString("hex");
}

export function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}
