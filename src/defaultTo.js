export default function defaultTo(value, defaultValue) {
    if (isFinite(value)) {
        value = parseFloat(value);
    }

    return !isNaN(value) ? value : defaultValue;
}