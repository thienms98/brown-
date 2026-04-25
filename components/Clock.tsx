"use client";

import { useEffect, useState } from "react";

const Clock = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const [time, setTime] = useState<number>();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  const dateTime = new Date(time);
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "2-digit"
  });
  return (
    <div {...props}>
      <div className="text-[72px] leading-none font-bold">
        {timeFormatter.format(dateTime)}
      </div>
      <div className="text-xl">{dateFormatter.format(dateTime)}</div>
    </div>
  );
};

export default Clock;
