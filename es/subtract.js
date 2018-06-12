import add from './add';

export default function subtract(date, interval, value) {
    return add(date, interval, -value);
}