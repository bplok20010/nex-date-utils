import options from './options';

export default function getMonthNumber(name) {
    return options.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
}