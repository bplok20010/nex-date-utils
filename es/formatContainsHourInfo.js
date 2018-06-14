import defs from './defines';

export default function formatContainsHourInfo(format) {
    return defs.hourInfoRe.test(format.replace(defs.stripEscapeRe, ''));
}