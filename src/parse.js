import createParser from './createParser';

const defualtFormats = [
    'Y-m-d\\TH:i:sP',
    'Y-m-d\\TH:i:s\\Z',
    'Y-m-d\\TH:i:s',
    'Y-m-d H:i:s',
    'Y/m/d H:i:s',
    'Ymd\\THis\\Z',
    'Ymd\\THis',
    'Y-m-d',
    'Y/m/d',
    'Y-\\WW',
    'Y年m月d日 H时i分s秒',
    'Y年m月d日',
    'D, m M Y',
    'l, m-M-y',
    'D, j M y',
    'D, j M Y',
    'U',
];

export default function parse(input, format, strict) {
    let ret
    if (format) {
        return createParser(format)(input, strict);
    }

    for (let i = 0; i < defualtFormats.length; ++i) {
        ret = createParser(defualtFormats[i])(input, strict);
        if (ret) return ret;
    }

    return;
}