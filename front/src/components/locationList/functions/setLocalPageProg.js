export function setLocalPageProg(setLocalPage, pages) {
    const page = pages.pop();
    pages.unshift(page);
    setLocalPage(pages[0]);
}