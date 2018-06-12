import options from './options';

export default function getShortMonthName(month) {
    return options.monthNames[month].substring(0, 3);
}