export const getCookie = (name: string) => {
    const cookie = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return cookie ? cookie[2] : "";
};