"use client";

import { useEffect, useState } from "react";

function formatClock(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

export function LocalClock({
  timeZone,
  provisional = false,
}: {
  timeZone: string;
  provisional?: boolean;
}) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) {
    return (
      <time className="tabular-nums" dateTime="">
        [PLACEHOLDER]
      </time>
    );
  }

  return (
    <time className="tabular-nums" dateTime={now.toISOString()}>
      {formatClock(now, timeZone)}
      {provisional ? (
        <span className="sr-only">
          Prototype timezone, not a verified personal timezone.
        </span>
      ) : null}
    </time>
  );
}
