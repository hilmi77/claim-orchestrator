import { MapPin, Calendar, Phone, User, Car, FileText, CreditCard, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { registerStep, type StepCardProps } from "../index";
import { StatusBadge } from "../StatusBadge";
import { DetailRow } from "../DetailRow";
import { cn } from "@/lib/utils";

// ─── Shared card wrapper ────────────────────────────────────────────────────
function StepCardShell({
  title,
  status,
  children,
  highlight,
}: {
  title: string;
  status: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className={cn("space-y-3", highlight && "")}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold text-sm">{title}</h3>
        <StatusBadge status={status} />
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

// ─── 1. Towing Service ───────────────────────────────────────────────────────
function TowingCard({ step }: StepCardProps<"Towing Service">) {
  return (
    <StepCardShell title={step.title} status={step.status}>
      <DetailRow icon={MapPin} label="Pickup location" value={step.pickupLocation} />
      <DetailRow icon={Calendar} label="Towing date" value={step.towingDate} />
    </StepCardShell>
  );
}
registerStep("Towing Service", TowingCard);

// ─── 2. Claim Notification ───────────────────────────────────────────────────
function ClaimNotificationCard({ step }: StepCardProps<"Claim Notification">) {
  return (
    <StepCardShell title={step.title} status={step.status}>
      <DetailRow icon={Calendar} label="Date & time" value={step.dateTime} />
      <DetailRow icon={FileText} label="Report type" value={step.reportType} />
      <DetailRow icon={AlertTriangle} label="Damage reason" value={step.reasonForDamage} />
      <DetailRow icon={User} label="Reported by" value={step.reportingParty} />
      <DetailRow icon={Phone} label="Contact" value={step.contact} />
    </StepCardShell>
  );
}
registerStep("Claim Notification", ClaimNotificationCard);

// ─── 3. Appraisal ────────────────────────────────────────────────────────────
function AppraisalCard({ step }: StepCardProps<"Appraisal">) {
  return (
    <StepCardShell title={step.title} status={step.status}>
      <DetailRow icon={Calendar} label="Assignment date" value={step.expertAssignmentDate} />
      <DetailRow icon={User} label="Expert" value={step.expertInfo} />
      <DetailRow icon={Phone} label="Contact" value={step.contact} />
    </StepCardShell>
  );
}
registerStep("Appraisal", AppraisalCard);

// ─── 4. Substitute Rental Vehicle ───────────────────────────────────────────
function SubstituteVehicleCard({ step }: StepCardProps<"Substitute Rental Vehicle">) {
  return (
    <StepCardShell title={step.title} status={step.status}>
      <DetailRow icon={Car} label="Vehicle" value={step.vehicleModel} />
      <DetailRow icon={Clock} label="Duration" value={step.vehicleDuration} />
      <DetailRow icon={Clock} label="Extra days" value={step.extraDuration} />
    </StepCardShell>
  );
}
registerStep("Substitute Rental Vehicle", SubstituteVehicleCard);

// ─── 5. File Review ──────────────────────────────────────────────────────────
function FileReviewCard({ step }: StepCardProps<"File Review">) {
  const isPending = step.reviewCompletionDate.startsWith("dd");
  return (
    <StepCardShell title={step.title} status={step.status}>
      <DetailRow icon={Calendar} label="Review started" value={step.reviewReferralDate} />
      <div className="flex items-start gap-2 text-sm">
        <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
        <div className="flex flex-col sm:flex-row sm:gap-2">
          <span className="text-muted-foreground">Estimated completion:</span>
          <span className={cn("font-medium", isPending && "text-muted-foreground italic")}>
            {isPending ? "To be confirmed" : step.reviewCompletionDate}
          </span>
        </div>
      </div>
    </StepCardShell>
  );
}
registerStep("File Review", FileReviewCard);

// ─── 6. Deduction Reason ─────────────────────────────────────────────────────
function DeductionCard({ step }: StepCardProps<"Deduction Reason">) {
  return (
    <StepCardShell title={step.title} status={step.status}>
      {step.actionRequired && (
        <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          <span className="font-medium">{step.actionRequired}</span>
        </div>
      )}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <div className="bg-muted/50 rounded-md p-2">
          <p className="text-xs text-muted-foreground">Occupational</p>
          <p className="text-sm font-semibold">{step.occupationalDeduction}</p>
        </div>
        <div className="bg-muted/50 rounded-md p-2">
          <p className="text-xs text-muted-foreground">Appreciation</p>
          <p className="text-sm font-semibold">{step.appreciationDeduction}</p>
        </div>
        <div className="bg-muted/50 rounded-md p-2">
          <p className="text-xs text-muted-foreground">Policy deductible</p>
          <p className="text-sm font-semibold">{step.policyDeductible}</p>
        </div>
        <div className="bg-muted/50 rounded-md p-2">
          <p className="text-xs text-muted-foreground">Non-damage</p>
          <p className="text-sm font-semibold">{step.nonDamageAmount}</p>
        </div>
      </div>
    </StepCardShell>
  );
}
registerStep("Deduction Reason", DeductionCard);

// ─── 7. Payment Information ──────────────────────────────────────────────────
function PaymentCard({ step }: StepCardProps<"Payment Information">) {
  // Mask IBAN: show first 4 and last 4 only
  const maskedIban =
    step.iban.length > 8
      ? `${step.iban.slice(0, 4)} •••• •••• ${step.iban.slice(-4)}`
      : step.iban;

  return (
    <StepCardShell title={step.title} status={step.status}>
      <DetailRow icon={User} label="Paid to" value={step.paidTo} />
      <DetailRow icon={CreditCard} label="IBAN" value={maskedIban} />
      <div className="flex items-center justify-between bg-muted/50 rounded-md px-3 py-2 mt-1">
        <span className="text-sm text-muted-foreground">Payment amount</span>
        <span className="text-base font-bold">{step.paymentAmount}</span>
      </div>
      {step.note && (
        <p className="text-xs text-muted-foreground italic flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          {step.note}
        </p>
      )}
    </StepCardShell>
  );
}
registerStep("Payment Information", PaymentCard);

// ─── 8. Closed ───────────────────────────────────────────────────────────────
function ClosedCard({ step }: StepCardProps<"Closed">) {
  return (
    <StepCardShell title={step.title} status={step.status}>
      <DetailRow icon={Calendar} label="Target closure" value={step.completionDate} />
    </StepCardShell>
  );
}
registerStep("Closed", ClosedCard);

export {
  TowingCard,
  ClaimNotificationCard,
  AppraisalCard,
  SubstituteVehicleCard,
  FileReviewCard,
  DeductionCard,
  PaymentCard,
  ClosedCard,
};
