interface IFormatDate {
    toLocalDate: (date: string) => string
}

class FormatDate implements IFormatDate {
    toLocalDate(date) {
        return new Date(date).toLocaleDateString();
    }
}

export const formatDate = new FormatDate();
