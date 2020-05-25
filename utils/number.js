export function toMetricFormat(query) {
    let parsedQuery = parseFloat(query);

    if (isFinite(parsedQuery) === false) {
        return query;
    }

    const suffixes = [ '', 'K', 'M', 'B' ];
    let multiplier = 0;

    if (parsedQuery < 1000) {
        return Math.round(parsedQuery, 2).toString();
    }

    while (parsedQuery >= 1000) {
        multiplier++;
        parsedQuery /= 1000;
    }

    parsedQuery = Math.round(parsedQuery, 1);

    return `${parsedQuery}${suffixes[multiplier]}`;
}