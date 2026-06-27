"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartData = {
  stand: string;
  total: number;
  booked: number;
  reserved: number;
  available: number;
};

const data: ChartData[] = [
  {
    stand: "Expo Marquee",
    total: 120,
    booked: 60,
    reserved: 15,
    available: 45,
  },
  {
    stand: "Main Goffs Sales Complex",
    total: 110,
    booked: 30,
    reserved: 18,
    available: 52,
  },
  {
    stand: "Double Corner Stand",
    total: 100,
    booked: 30,
    reserved: 18,
    available: 52,
  },
  {
    stand: "Outdoor Stand",
    total: 90,
    booked: 60,
    reserved: 15,
    available: 15,
  },
];

const COLORS = {
  total: "#4B87B8",
  booked: "#C8652D",
  reserved: "#D89B29",
  available: "#B8C7F7",
};

type TooltipPayloadItem = {
  dataKey?: string | number;
  value?: string | number;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
};

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const values = payload.reduce<Record<string, number>>((acc, item) => {
    if (typeof item.dataKey === "string") {
      acc[item.dataKey] = Number(item.value);
    }
    return acc;
  }, {});

  return (
    <div className="rounded-xl border bg-[#EDF5FC] p-4 shadow-lg">
      <h3 className="mb-3 text-lg font-semibold">{label}</h3>

      <div className="space-y-2 text-sm">
        <Row color={COLORS.total} label="Total Seats" value={values.total} />

        <Row color={COLORS.booked} label="Booked" value={values.booked} />

        <Row color={COLORS.reserved} label="Reserved" value={values.reserved} />

        <Row
          color={COLORS.available}
          label="Available"
          value={values.available}
        />
      </div>
    </div>
  );
}

function Row({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value?: number;
}) {
  return (
    <div className="flex items-center justify-between gap-8">
      <div className="flex items-center gap-2">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: color }}
        />
        {label}
      </div>

      <span>{value ?? 0}</span>
    </div>
  );
}

export default function StandOverviewChart() {
  return (
    <div className="rounded-2xl bg-white py-6 shadow-sm">
      <ResponsiveContainer width="95%" height={380}>
        <BarChart data={data} barGap={8} barCategoryGap="20%">
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="#E5E7EB"
          />

          <XAxis dataKey="stand" axisLine={false} tickLine={false} />

          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={[0, 30, 60, 90, 120]}
          />

          <Tooltip cursor={false} content={<CustomTooltip />} />

          <Bar
            dataKey="total"
            fill={COLORS.total}
            radius={[4, 4, 1, 1]}
            barSize={40}
          />

          <Bar
            dataKey="booked"
            fill={COLORS.booked}
            radius={[4, 4, 1, 1]}
            barSize={40}
          />

          <Bar
            dataKey="reserved"
            fill={COLORS.reserved}
            radius={[4, 4, 1, 1]}
            barSize={40}
          />

          <Bar
            dataKey="available"
            fill={COLORS.available}
            radius={[4, 4, 1, 1]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Custom Legend */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
        <LegendItem color={COLORS.total} label="Total Seats" />
        <LegendItem color={COLORS.booked} label="Booked" />
        <LegendItem color={COLORS.reserved} label="Reserved" />
        <LegendItem color={COLORS.available} label="Available" />
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="h-3 w-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
}
