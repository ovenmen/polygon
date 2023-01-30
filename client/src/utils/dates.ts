interface IFormatDate {
    toLocalDate: (date: string) => string,
    toFullLocalDate: (date: string) => string
}

class FormatDate implements IFormatDate {
    toLocalDate(date) {
        return new Date(date).toLocaleDateString('ru-RU', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    toFullLocalDate(date) {
        const localDate = new Date(date);

        return new Intl.DateTimeFormat('ru-RU', {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false,
            timeZoneName: 'long'
        }).format(localDate);
    }
}

export const formatDate = new FormatDate();
