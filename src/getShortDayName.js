import options from './options';

export default function getShortDayName(day) {
    return options.dayNames[day].substring(0, 3);
}