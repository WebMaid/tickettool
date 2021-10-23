const THEME_STORAGE = "data-theme";

export const changeThemeTo = (theme: string) => {
    const body = document.querySelector("body");
    body?.setAttribute(THEME_STORAGE, theme);
}