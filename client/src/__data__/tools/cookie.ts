type CookieProps = {
    cookieName: string
    cookieValue: string,
    secure?: boolean
    path?: string
    maxAge?: number
}

export const getCookie = (cookieName: string) => document.cookie.match(cookieName)?.input?.replace(`/${cookieName}=/`, '');

export const setCookie = ({
    cookieName,
    cookieValue,
    secure,
    path,
    maxAge
}: CookieProps) => document.cookie = `${cookieName}=${cookieValue}; ${secure && 'secure;'} path=${path}; ${maxAge && `max-age=${maxAge}`}`;
