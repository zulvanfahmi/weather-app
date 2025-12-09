// 19:45
export function formatTime_HHMM(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleTimeString("en-EN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

// Monday
export function formatDate_DayLong(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleString('en-EN', { weekday: 'long' });
}

// 17
export function formatDate_DayNumber(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleString('en-EN', { day: 'numeric' });
}

// August
export function formatDate_MonthLong(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleString('en-EN', { month: 'long' });
}

// 2030
export function formatDate_YearNumber(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleString('en-EN', { year: 'numeric' });
}