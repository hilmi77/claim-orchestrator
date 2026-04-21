import { ClaimSchema } from "../schemas/claim.schema";
import type { Claim } from "../types";

export async function fetchClaim(): Promise<Claim> {
  await new Promise((r) => setTimeout(r, 500));

  const res = await fetch("/claim.json");
  if (!res.ok) throw new Error(`Network error: ${res.status}`);

  const json = await res.json();
  const result = ClaimSchema.safeParse(json);
  if (!result.success) {
    console.error("Claim validation failed:", result.error.flatten());
    throw new Error("Invalid claim data received from API");
  }

  return result.data;
}
