interface Cookies {
    set: (name: string, value: string) => void
    get: (name: string) => string
}

class Cookie implements Cookies {
    set(name, value) {
        if (document) {
            document.cookie = `${name}=${value};max-age=900`;
        }
    }
    get(name) {
        return document.cookie.match(name)?.input?.replace(`${name}=`, '');
    }
}

export const cookie = new Cookie();
