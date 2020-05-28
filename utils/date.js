export const formatMonth = (date, locale='en-GB', format = 'short') => {
    const _date = new Date(date);

    return new Intl.DateTimeFormat(locale, { 'month': format }, _date );
};

export const formatYear = (date, locale = 'en-GB', format = '2-digit') => {
    const _date = new Date(date);

    return new Intl.DateTimeFormat(locale, { 'year': format }, _date);
};

// month and year atm
export const formatDate = (date, locale, format) => {
    const month = formatMonth(date, locale, format);
    const year = formatYear(date, locale, format);

    return `${month}, ${year}`;
};