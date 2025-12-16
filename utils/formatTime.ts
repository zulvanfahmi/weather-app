import { Language, LOCALE_MAP } from "./locale";

const toUTCDate = (timestamp: number, timezone: number) =>
  new Date((timestamp + timezone) * 1000);

export const formatTime = (
  timestamp: number,
  timezone: number,
  format: "12Hours" | "24Hours"
) => {
  const date = toUTCDate(timestamp, timezone);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  if (format === "24Hours") {
    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  }

  const period = hours >= 12 ? "PM" : "AM";
  const h12 = hours % 12 || 12;

  return `${h12}:${minutes} ${period}`;
};

// Monday
export const formatDayLong = (timestamp: number, timezone: number, language: Language) =>
  toUTCDate(timestamp, timezone).toLocaleDateString(LOCALE_MAP[language], {
    weekday: "long",
    timeZone: "UTC",
  });

// 17
export const formatDayNumber = (timestamp: number, timezone: number, language: Language) =>
  toUTCDate(timestamp, timezone).toLocaleDateString(LOCALE_MAP[language], {
    day: "2-digit",
    timeZone: "UTC",
  });

// August
export const formatMonthLong = (timestamp: number, timezone: number, language: Language) =>
  toUTCDate(timestamp, timezone).toLocaleDateString(LOCALE_MAP[language], {
    month: "long",
    timeZone: "UTC",
  });

// Aug
export const formatMonthShort = (timestamp: number, timezone: number, language: Language) =>
  toUTCDate(timestamp, timezone).toLocaleDateString(LOCALE_MAP[language], {
    month: "short",
    timeZone: "UTC",
  });

// 08
export const formatMonthNumber = (timestamp: number, timezone: number, language: Language) =>
  toUTCDate(timestamp, timezone).toLocaleDateString(LOCALE_MAP[language], {
    month: "2-digit",
    timeZone: "UTC",
  });

// 2030
export const formatYearNumber = (timestamp: number, timezone: number, language: Language) =>
  toUTCDate(timestamp, timezone).toLocaleDateString(LOCALE_MAP[language], {
    year: "numeric",
    timeZone: "UTC",
  });
