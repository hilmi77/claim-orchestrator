import { useRef, useState } from "react";
import { CheckCircle2, AlertTriangle, Loader2, FileUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClaimStore } from "../store/claim.store";
import { cn } from "@/lib/utils";

const STAGES = [
  "Detecting document type...",
  "Extracting fields...",
  "Validating against requirements...",
];

export function DocumentAnalyzer() {
  const { uploadResult, analyzeDocument, resetUpload } = useClaimStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [stageIndex, setStageIndex] = useState(0);

  const handleFile = async (file: File) => {
    setStageIndex(0);
    const stageTimer = setInterval(() => {
      setStageIndex((i) => Math.min(i + 1, STAGES.length - 1));
    }, 850);
    await analyzeDocument(file);
    clearInterval(stageTimer);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const isAnalyzing = uploadResult.status === "analyzing";
  const isValid = uploadResult.status === "valid";
  const isMismatch = uploadResult.status === "mismatch";
  const isDone = isValid || isMismatch;

  return (
    <div className="mt-3 space-y-3">
      {uploadResult.status === "idle" && (
        <div
          className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Upload occupational certificate"
        >
          <FileUp className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm font-medium">Upload Occupational Certificate</p>
          <p className="text-xs text-muted-foreground mt-1">
            Drag & drop or click to select — PDF, JPG, PNG
          </p>
        </div>
      )}

      {isAnalyzing && (
        <div className="border rounded-lg p-4 bg-blue-50 border-blue-200 space-y-2">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
            <p className="text-sm font-medium text-blue-800">Analyzing document...</p>
          </div>
          <div className="space-y-1.5">
            {STAGES.map((stage, i) => (
              <div
                key={stage}
                className={cn(
                  "flex items-center gap-2 text-xs transition-all",
                  i <= stageIndex ? "text-blue-700 opacity-100" : "text-blue-400 opacity-50"
                )}
              >
                <div
                  className={cn(
                    "h-1.5 w-1.5 rounded-full flex-shrink-0",
                    i < stageIndex
                      ? "bg-blue-600"
                      : i === stageIndex
                      ? "bg-blue-500 animate-pulse"
                      : "bg-blue-200"
                  )}
                />
                {stage}
              </div>
            ))}
          </div>
          {uploadResult.fileName && (
            <p className="text-xs text-blue-600 truncate">{uploadResult.fileName}</p>
          )}
        </div>
      )}

      {isDone && (
        <div
          className={cn(
            "border rounded-lg p-4 space-y-2",
            isValid ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              {isValid ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
              )}
              <div>
                <p
                  className={cn(
                    "text-sm font-semibold",
                    isValid ? "text-emerald-800" : "text-amber-800"
                  )}
                >
                  {isValid ? "Document appears valid" : "Potential mismatch detected"}
                </p>
                {uploadResult.fileName && (
                  <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                    {uploadResult.fileName}
                  </p>
                )}
              </div>
            </div>
            <div
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full border flex-shrink-0",
                isValid
                  ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                  : "bg-amber-100 text-amber-700 border-amber-300"
              )}
            >
              {uploadResult.confidence} confidence
            </div>
          </div>
          <p
            className={cn(
              "text-xs",
              isValid ? "text-emerald-700" : "text-amber-700"
            )}
          >
            {uploadResult.message}
          </p>
          <div className="flex gap-2 pt-1">
            {isValid ? (
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Submit document
              </Button>
            ) : (
              <Button size="sm" variant="outline" onClick={() => inputRef.current?.click()}>
                Upload different file
              </Button>
            )}
            <Button size="sm" variant="ghost" onClick={resetUpload}>
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
