"use client";

interface StandCardItem {
  id: number;
  name: string;
  color: string;
  standColor: string;
  shape?: string;
  size: string;
  price: number;
  stands: string;
}

interface StandCardProps {
  stand: StandCardItem;
}

const StandCard = ({ stand }: StandCardProps) => {
  return (
    <div className="rounded-xl border border-[#C9C9CA] bg-[#FBFBFD] px-4 py-5">
      <div className="flex items-center gap-3">
        <div
          className="w-6 h-4 rounded-sm"
          style={{ backgroundColor: stand.color }}
        />

        <h3 className="text-lg font-semibold text-text-primary">
          {stand.name}
        </h3>
      </div>

      <div className="mt-4 space-y-4 ">
        <div className="flex justify-between">
          <span className="text-[#4A4C56]">Size</span>
          <span className="text-[#4A4C56]">{stand.size}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#4A4C56]">Price</span>

          <span className="text-[#4A4C56]">
            €{stand.price.toLocaleString()}
          </span>
        </div>

        {stand.stands && (
          <div
            className="rounded-lg px-3 py-2 font-medium"
            style={{
              color: stand.color,
              backgroundColor: stand.standColor,
            }}
          >
            Stand: {stand.stands}
          </div>
        )}
      </div>
    </div>
  );
};

export default StandCard;
