import { SpinnerIcon } from "@/components/Icons";

export function Conversation() {
  return (
    <div className="min-h-0 grow w-full overflow-y-auto flex justify-center items-center flex-col">
      <SpinnerIcon className="h-16 w-16 animate-spin" />
    </div>
  );
}
