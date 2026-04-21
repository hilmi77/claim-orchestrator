import { z } from "zod";
import { ProcessStepSchema } from "./steps.schema";

export const ClaimSchema = z.object({
  title: z.string(),
  fileNo: z.string(),
  estimatedRemainingTime: z.string(),
  currentStatus: z.string(),
  processDetails: z.array(ProcessStepSchema),
});
