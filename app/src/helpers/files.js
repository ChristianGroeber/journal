function getFileExtension(filePath) {
    const re = /(?:\.([^.]+))?$/;
    return re.exec(filePath);
}

export {
    getFileExtension,
}