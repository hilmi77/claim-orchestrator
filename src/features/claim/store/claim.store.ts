import { create } from "zustand";
import type { CustomNode, UploadResult } from "../types";

interface ClaimStore {
  // Dynamic inserted nodes
  customNodes: CustomNode[];
  addNote: (afterIndex: number, content: string) => void;
  addAttachment: (afterIndex: number, fileName: string, fileSize: string) => void;
  removeNode: (id: string) => void;

  // AI explain dialog
  explainOpenFor: string | null;
  openExplain: (title: string) => void;
  closeExplain: () => void;

  // Document analyzer
  uploadResult: UploadResult;
  analyzeDocument: (file: File) => Promise<void>;
  resetUpload: () => void;

  // Step expand state (mobile UX)
  expandedSteps: Set<number>;
  toggleStep: (index: number) => void;
  expandStep: (index: number) => void;
}

export const useClaimStore = create<ClaimStore>((set) => ({
  customNodes: [],

  addNote: (afterIndex, content) =>
    set((s) => ({
      customNodes: [
        ...s.customNodes,
        { id: crypto.randomUUID(), kind: "note", content, afterIndex },
      ],
    })),

  addAttachment: (afterIndex, fileName, fileSize) =>
    set((s) => ({
      customNodes: [
        ...s.customNodes,
        { id: crypto.randomUUID(), kind: "attachment", fileName, fileSize, afterIndex },
      ],
    })),

  removeNode: (id) =>
    set((s) => ({ customNodes: s.customNodes.filter((n) => n.id !== id) })),

  explainOpenFor: null,
  openExplain: (title) => set({ explainOpenFor: title }),
  closeExplain: () => set({ explainOpenFor: null }),

  uploadResult: { status: "idle" },

  analyzeDocument: async (file: File) => {
    set({ uploadResult: { status: "analyzing", fileName: file.name } });

    // Stage 1: detecting
    await new Promise((r) => setTimeout(r, 800));
    // Stage 2: extracting
    await new Promise((r) => setTimeout(r, 900));

    // Heuristic: dosya adında "occupational" veya "certificate" geçiyorsa valid
    const name = file.name.toLowerCase();
    const isValid =
      name.includes("occupational") ||
      name.includes("certificate") ||
      name.includes("meslek") ||
      name.includes("belge");

    set({
      uploadResult: {
        status: isValid ? "valid" : "mismatch",
        fileName: file.name,
        confidence: isValid ? "High" : "Medium",
        message: isValid
          ? "Document appears valid. The file matches the required occupational certificate format."
          : "Potential mismatch detected. This file does not appear to be an occupational certificate.",
      },
    });
  },

  resetUpload: () => set({ uploadResult: { status: "idle" } }),

  expandedSteps: new Set([4]), // File Review (index 4) default open — In Progress
  toggleStep: (index) =>
    set((s) => {
      const next = new Set(s.expandedSteps);
      next.has(index) ? next.delete(index) : next.add(index);
      return { expandedSteps: next };
    }),
  expandStep: (index) =>
    set((s) => {
      const next = new Set(s.expandedSteps);
      next.add(index);
      return { expandedSteps: next };
    }),
}));
