import defs from './defines';

export default function getWeekOfYear(date) {
    const DC3 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 3) / defs.ms1d, // an Absolute Day Number
        AWN = Math.floor(DC3 / 7), // an Absolute Week Number
        Wyr = new Date(AWN * defs.ms7d).getUTCFullYear();

    return AWN - Math.floor(Date.UTC(Wyr, 0, 7) / defs.ms7d) + 1;
}