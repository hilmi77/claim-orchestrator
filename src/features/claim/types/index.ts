import { z } from "zod";
import { ClaimSchema } from "../schemas/claim.schema";
import { ProcessStepSchema } from "../schemas/steps.schema";

// Tüm tipler schema'dan türetiliyor — tek kaynak
export type Claim = z.infer<typeof ClaimSchema>;
export type ProcessStep = z.infer<typeof ProcessStepSchema>;
export type StepTitle = ProcessStep["title"];
export type StepStatus = "Completed" | "Report Completed" | "In Progress" | "Pending";

// Kullanıcının dinamik olarak eklediği custom node'lar
export type CustomNode =
  | { id: string; kind: "note"; content: string; afterIndex: number }
  | { id: string; kind: "attachment"; fileName: string; fileSize: string; afterIndex: number };

// Upload analiz sonucu
export type UploadResult = {
  status: "idle" | "analyzing" | "valid" | "mismatch";
  fileName?: string;
  confidence?: "High" | "Medium" | "Low";
  message?: string;
};
