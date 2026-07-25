"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function isoOf(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

function chipLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

const TIMES: { value: string; label: string }[] = [];
for (let h = 8; h <= 20; h++) {
  for (const min of [0, 30]) {
    if (h === 20 && min === 30) continue;
    const value = `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
    const label = new Date(2000, 0, 1, h, min).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
    TIMES.push({ value, label });
  }
}

export function DateTimePicker({
  dates,
  onToggle,
  onClear,
  timeFrom,
  timeTo,
  onTimeFrom,
  onTimeTo,
}: {
  dates: string[];
  onToggle: (iso: string) => void;
  onClear: () => void;
  timeFrom: string;
  timeTo: string;
  onTimeFrom: (v: string) => void;
  onTimeTo: (v: string) => void;
}) {
  const today = React.useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [view, setView] = React.useState(() => ({
    y: today.getFullYear(),
    m: today.getMonth(),
  }));

  const first = new Date(view.y, view.m, 1);
  const leadBlanks = (first.getDay() + 6) % 7; // Monday-start
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const atFirstMonth =
    view.y === today.getFullYear() && view.m === today.getMonth();

  const monthLabel = first.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const shift = (delta: number) =>
    setView((v) => {
      const d = new Date(v.y, v.m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

  const timeInvalid = timeTo <= timeFrom;

  return (
    <div className="flex flex-col gap-4">
      {/* calendar */}
      <div className="rounded-2xl border border-line bg-surface p-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => shift(-1)}
            disabled={atFirstMonth}
            aria-label="Previous month"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-paper disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-bold text-ink">{monthLabel}</span>
          <button
            type="button"
            onClick={() => shift(1)}
            aria-label="Next month"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-paper"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((w) => (
            <span key={w} className="py-1 text-[11px] font-semibold text-faint">
              {w}
            </span>
          ))}
          {Array.from({ length: leadBlanks }).map((_, i) => (
            <span key={`b${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const d = new Date(view.y, view.m, day);
            const iso = isoOf(d);
            const past = d < today;
            const selected = dates.includes(iso);
            return (
              <button
                key={iso}
                type="button"
                disabled={past}
                onClick={() => onToggle(iso)}
                aria-pressed={selected}
                className={cn(
                  "flex h-9 items-center justify-center rounded-lg text-sm transition-colors",
                  past && "cursor-not-allowed text-faint/50",
                  !past && !selected && "text-ink hover:bg-paper",
                  selected && "bg-brand font-bold text-ink",
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* selected date chips */}
      {dates.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {dates.map((iso) => (
            <button
              key={iso}
              type="button"
              onClick={() => onToggle(iso)}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-tint px-3 py-1.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand/20"
            >
              {chipLabel(iso)}
              <X className="h-3 w-3" />
            </button>
          ))}
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-medium text-muted underline-offset-2 hover:underline"
          >
            Clear
          </button>
        </div>
      )}

      {/* time window */}
      <div>
        <span className="mb-2 block text-sm font-semibold text-ink">
          Preferred time
        </span>
        <div className="flex items-center gap-2">
          <TimeSelect value={timeFrom} onChange={onTimeFrom} label="From" />
          <span className="text-sm text-muted">to</span>
          <TimeSelect value={timeTo} onChange={onTimeTo} label="To" />
        </div>
        {timeInvalid && (
          <p className="mt-1.5 text-xs text-amber-600">
            End time should be after the start time.
          </p>
        )}
      </div>
    </div>
  );
}

function TimeSelect({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <select
      value={value}
      aria-label={`${label} time`}
      onChange={(e) => onChange(e.target.value)}
      className="flex-1 rounded-xl border border-line bg-surface px-3 py-2.5 text-sm font-medium text-ink outline-none transition-colors focus:border-brand focus:bg-paper"
    >
      {TIMES.map((t) => (
        <option key={t.value} value={t.value}>
          {t.label}
        </option>
      ))}
    </select>
  );
}
