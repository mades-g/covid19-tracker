export const formatMonth = (date, locale='en-GB', format = 'short') => {
    const _date = new Date(date);

    return new Intl.DateTimeFormat(locale, { 'month': format }).format(_date);
};

export const formatYear = (date, locale = 'en-GB', format = '2-digit') => {
    const _date = new Date(date);

    return new Intl.DateTimeFormat(locale, { 'year': format }).format(_date);
};

export const formatDay = (date, locale = 'en-GB', format = '2-digit') => {
    const _date = new Date(date);

    return new Intl.DateTimeFormat(locale, { 'day': format }).format(_date);
};

export const formatDate = (date, locale, format) => {
    const month = formatMonth(date, locale, format);
    const year = formatDay(date, locale, format);

    return `${month} ${year}`;
};