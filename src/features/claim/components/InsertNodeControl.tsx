import { useState } from "react";
import { Plus, FileText, Paperclip, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useClaimStore } from "../store/claim.store";

interface InsertNodeControlProps {
  afterIndex: number;
}

type InsertMode = null | "note" | "attachment";

export function InsertNodeControl({ afterIndex }: InsertNodeControlProps) {
  const [mode, setMode] = useState<InsertMode>(null);
  const [noteText, setNoteText] = useState("");
  const { addNote, addAttachment } = useClaimStore();

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    addNote(afterIndex, noteText.trim());
    setNoteText("");
    setMode(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const sizeLabel =
      file.size < 1024
        ? `${file.size} B`
        : file.size < 1024 * 1024
        ? `${(file.size / 1024).toFixed(1)} KB`
        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
    addAttachment(afterIndex, file.name, sizeLabel);
    setMode(null);
    e.target.value = "";
  };

  if (mode === null) {
    return (
      <div className="flex items-center gap-1 py-1 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity group">
        <div className="flex-1 border-t border-dashed border-muted-foreground/20 group-hover:border-muted-foreground/40 transition-colors" />
        <button
          onClick={() => setMode("note")}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-0.5 rounded hover:bg-muted"
        >
          <Plus className="h-3 w-3" />
          Add note
        </button>
        <button
          onClick={() => setMode("attachment")}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-0.5 rounded hover:bg-muted"
        >
          <Paperclip className="h-3 w-3" />
          Attach
        </button>
        <div className="flex-1 border-t border-dashed border-muted-foreground/20 group-hover:border-muted-foreground/40 transition-colors" />
      </div>
    );
  }

  if (mode === "note") {
    return (
      <div className="border border-dashed border-violet-300 rounded-lg p-3 bg-violet-50/50 space-y-2 my-1">
        <div className="flex items-center gap-1.5 text-xs font-medium text-violet-700">
          <FileText className="h-3.5 w-3.5" />
          Add information note
        </div>
        <Textarea
          placeholder="Type your note here..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          className="text-sm min-h-[72px] resize-none"
          autoFocus
        />
        <div className="flex gap-2 justify-end">
          <Button size="sm" variant="ghost" onClick={() => { setMode(null); setNoteText(""); }}>
            <X className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" onClick={handleAddNote} disabled={!noteText.trim()}>
            <Check className="h-3.5 w-3.5 mr-1" />
            Add note
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-dashed border-blue-300 rounded-lg p-3 bg-blue-50/50 space-y-2 my-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-medium text-blue-700">
          <Paperclip className="h-3.5 w-3.5" />
          Add attachment
        </div>
        <Button size="sm" variant="ghost" onClick={() => setMode(null)}>
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
      <label className="block border-2 border-dashed border-blue-300 rounded-md p-3 text-center cursor-pointer hover:border-blue-400 transition-colors">
        <Plus className="h-5 w-5 mx-auto text-blue-400 mb-1" />
        <p className="text-xs text-blue-600 font-medium">Click to select file</p>
        <input type="file" className="hidden" onChange={handleFileSelect} />
      </label>
    </div>
  );
}
