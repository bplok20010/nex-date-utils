import defs from './defines';

export default function formatContainsDateInfo(format) {
    return defs.dateInfoRe.test(format.replace(defs.stripEscapeRe, ''));
}