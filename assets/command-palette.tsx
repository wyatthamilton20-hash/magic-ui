// ⌘K command palette: cmdk list inside a @base-ui/react Dialog, Kargul styling.
// Reference (kargulstudio/sales-crm components/_ui/command.tsx + command-menu.tsx, MIT) used cmdk +
// radix Dialog. Deps: cmdk (npm i cmdk), @base-ui/react.
import { useEffect, type ComponentProps, type ReactNode } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Dialog } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";

export function useCommandShortcut(toggle: () => void) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() !== "k") return;
      if (!(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey) return;
      event.preventDefault();
      toggle();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle]);
}

type CommandDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  className?: string;
  children: ReactNode;
};

export function CommandDialog({ open, onOpenChange, title, description, className, children }: CommandDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(next) => onOpenChange(next)}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-overlay backdrop-blur-[6px] transition-opacity duration-200 ease-power3-out data-starting-style:opacity-0 data-ending-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-power3-in" />
        <Dialog.Popup
          className={cn(
            "fixed top-[12dvh] left-1/2 z-50 w-[calc(100%-2rem)] max-w-[560px] -translate-x-1/2 overflow-hidden rounded-xl border border-line-strong bg-popover text-popover-foreground shadow-overlay outline-none",
            "transition-[opacity,scale] duration-200 ease-power3-out data-starting-style:scale-[0.98] data-starting-style:opacity-0 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-power3-in",
            className,
          )}
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          <Dialog.Description className="sr-only">{description}</Dialog.Description>
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function Command({ className, ...props }: ComponentProps<typeof CommandPrimitive>) {
  return <CommandPrimitive loop className={cn("flex flex-col", className)} {...props} />;
}

export function CommandInput({
  className,
  trailing,
  ...props
}: ComponentProps<typeof CommandPrimitive.Input> & { trailing?: ReactNode }) {
  return (
    <div className="flex h-12 items-center gap-2.5 border-b border-line-strong px-4">
      <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-3.5 shrink-0 text-subtle">
        <path d="M14 14l-2.9-2.9M12.67 7.33A5.33 5.33 0 1 1 2 7.33a5.33 5.33 0 0 1 10.67 0z" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <CommandPrimitive.Input
        className={cn("h-full min-w-0 flex-1 bg-transparent text-[16px] leading-none text-foreground outline-none placeholder:text-subtle sm:text-[14px]", className)}
        {...props}
      />
      {trailing}
    </div>
  );
}

export function CommandList({ className, ...props }: ComponentProps<typeof CommandPrimitive.List>) {
  return <CommandPrimitive.List className={cn("max-h-[min(360px,50dvh)] overflow-y-auto p-1.5", className)} {...props} />;
}

export function CommandEmpty({ className, ...props }: ComponentProps<typeof CommandPrimitive.Empty>) {
  return <CommandPrimitive.Empty className={cn("caption-style py-10 text-center text-subtle", className)} {...props} />;
}

export function CommandGroup({ className, ...props }: ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      className={cn(
        "[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:text-[12px] [&_[cmdk-group-heading]]:leading-none [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:tracking-[1px] [&_[cmdk-group-heading]]:text-subtle [&_[cmdk-group-heading]]:uppercase",
        className,
      )}
      {...props}
    />
  );
}

export function CommandItem({ className, ...props }: ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={cn(
        "relative flex h-10 cursor-pointer items-center gap-3 rounded-lg px-2.5 text-[14px] leading-none text-soft outline-none select-none transition-colors duration-150 ease-power3-out data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-hover data-[selected=true]:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function CommandSeparator({ className, ...props }: ComponentProps<typeof CommandPrimitive.Separator>) {
  return <CommandPrimitive.Separator className={cn("-mx-1.5 my-1.5 h-px bg-line-strong", className)} {...props} />;
}

export function CommandFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("caption-style flex h-10 items-center gap-4 border-t border-line-strong px-4 text-subtle", className)}
      {...props}
    />
  );
}

export function Kbd({ className, ...props }: ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "caption-style inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-line-strong bg-muted px-1.5 font-sans text-soft",
        className,
      )}
      {...props}
    />
  );
}
