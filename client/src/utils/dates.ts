interface IFormatDate {
    toLocalDate: (date: string) => string
    toShortLocalDate: (date: string) => string
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

    toShortLocalDate(date) {
        return new Intl.DateTimeFormat('ru-RU', {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false,
            timeZoneName: 'short'
        }).format(new Date(date));
    }

    toFullLocalDate(date) {
        return new Intl.DateTimeFormat('ru-RU', {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false,
            timeZoneName: 'long'
        }).format(new Date(date));
    }
}

export const formatDate = new FormatDate();
