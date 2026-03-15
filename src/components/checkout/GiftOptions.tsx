"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Gift } from "lucide-react";

type GiftOptionsProps = {
  isGift: boolean;
  giftWrap: boolean;
  giftMessage: string;
  onIsGiftChange: (val: boolean) => void;
  onGiftWrapChange: (val: boolean) => void;
  onGiftMessageChange: (val: string) => void;
};

export function GiftOptionsPanel({
  isGift,
  giftWrap,
  giftMessage,
  onIsGiftChange,
  onGiftWrapChange,
  onGiftMessageChange,
}: GiftOptionsProps) {
  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-start gap-3">
        <Checkbox
          id="isGift"
          checked={isGift}
          onCheckedChange={(checked) => onIsGiftChange(checked === true)}
        />
        <Label
          htmlFor="isGift"
          className="text-sm text-foreground cursor-pointer flex items-center gap-2"
        >
          <Gift className="w-4 h-4 text-accent" />
          This is a gift order
        </Label>
      </div>

      {isGift && (
        <div className="ml-8 space-y-4 border-l-2 border-accent/20 pl-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="giftWrap"
              checked={giftWrap}
              onCheckedChange={(checked) =>
                onGiftWrapChange(checked === true)
              }
            />
            <Label
              htmlFor="giftWrap"
              className="text-sm text-foreground cursor-pointer"
            >
              Add gift wrapping ($3.99)
            </Label>
          </div>

          <div>
            <Label
              htmlFor="giftMessage"
              className="text-sm text-foreground mb-1.5 block"
            >
              Gift message (optional)
            </Label>
            <textarea
              id="giftMessage"
              value={giftMessage}
              onChange={(e) => onGiftMessageChange(e.target.value)}
              maxLength={250}
              rows={3}
              placeholder="Write a personal message..."
              className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1 text-right">
              {giftMessage.length}/250
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
