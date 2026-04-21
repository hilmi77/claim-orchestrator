import { FileText, Paperclip, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClaimStore } from "../store/claim.store";
import type { CustomNode } from "../types";

export function CustomNodeDisplay({ node }: { node: CustomNode }) {
  const { removeNode } = useClaimStore();

  if (node.kind === "note") {
    return (
      <div className="flex gap-3 py-2">
        <FileText className="h-5 w-5 text-violet-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-violet-700 mb-1">Your note</p>
          <p className="text-sm text-foreground break-words">{node.content}</p>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => removeNode(node.id)}
          className="flex-shrink-0 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-3 py-2">
      <Paperclip className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-blue-700 mb-1">Attachment</p>
        <p className="text-sm text-foreground truncate">{node.fileName}</p>
        <p className="text-xs text-muted-foreground">{node.fileSize}</p>
      </div>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => removeNode(node.id)}
        className="flex-shrink-0 text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
