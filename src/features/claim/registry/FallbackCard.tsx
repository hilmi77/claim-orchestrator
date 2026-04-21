import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ProcessStep } from "../types";

export function FallbackCard({ step }: { step: ProcessStep; index: number }) {
  return (
    <Card className="border-dashed border-muted-foreground/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm text-muted-foreground">{step.title}</CardTitle>
          <Badge variant="outline" className="text-xs">Unknown type</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="text-xs bg-muted p-3 rounded overflow-auto text-muted-foreground">
          {JSON.stringify(step, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
}
