import createParser from './createParser';


export default function parse(input, format, strict) {

    return createParser(format)(input, strict);
}