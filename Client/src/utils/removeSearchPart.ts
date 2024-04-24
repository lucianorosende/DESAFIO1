export function removeSearchPart(text: string) {
    const indexOfSlash = text.lastIndexOf("/");
    if (indexOfSlash !== -1) {
        return text.substring(indexOfSlash + 1);
    } else {
        return text;
    }
}
