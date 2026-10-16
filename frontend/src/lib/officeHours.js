import { useEffect, useState } from 'react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const OFFICE_SCHEDULES = {
    KW: { timeZone: 'Asia/Kuwait', days: [0, 1, 2, 3, 4], open: 9, close: 18 },
    IN: { timeZone: 'Asia/Kolkata', days: [1, 2, 3, 4, 5, 6], open: 9, close: 19 },
    PH: { timeZone: 'Asia/Manila' },
};

export const localTime = (timeZone, now) =>
    new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', minute: '2-digit' }).format(now);

export const officeStatus = ({ timeZone, days, open, close }, now) => {
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone,
        weekday: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hourCycle: 'h23',
    }).formatToParts(now);
    const part = (type) => parts.find((p) => p.type === type)?.value;
    const minutes = Number(part('hour')) * 60 + Number(part('minute'));
    const isOpen = days.includes(WEEKDAYS.indexOf(part('weekday'))) && minutes >= open * 60 && minutes < close * 60;
    return { isOpen, time: localTime(timeZone, now) };
};

export const useNow = (intervalMs = 60000) => {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), intervalMs);
        return () => clearInterval(id);
    }, [intervalMs]);
    return now;
};
