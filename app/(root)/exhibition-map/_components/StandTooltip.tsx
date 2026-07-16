import { Stand } from "@/types/stand";

interface StandTooltipProps {
  stand: Stand;
  x: number;
  y: number;
}

export default function StandTooltip({
  stand,
  x,
  y,
}: StandTooltipProps) {
  return (
    <div
      className="fixed z-9999 w-64 rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-xl pointer-events-none animate-in fade-in zoom-in-95 duration-150"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, 0)",
      }}
    >
      {/* Arrow */}
      <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-[#E4E7EC] bg-white" />

      <h3 className="text-lg font-semibold text-primary">
        Stand {stand.stand_no}
      </h3>

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-accent">Status</span>

          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold ${
              stand.status === "booked"
                ? "bg-gray-200 text-gray-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {stand.status}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-accent">Type</span>
          <span className="font-medium text-primary">
            {stand.standType}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-accent">Size</span>
          <span className="font-medium text-primary">
            {stand.size}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-accent">Price</span>
          <span className="font-semibold text-primary">
            € {stand.price}
          </span>
        </div>

        {stand.exhibitor && (
          <div className="flex items-center justify-between">
            <span className="text-accent">Exhibitor</span>
            <span className="max-w-[120px] truncate text-right font-medium text-primary">
              {stand.exhibitor}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}