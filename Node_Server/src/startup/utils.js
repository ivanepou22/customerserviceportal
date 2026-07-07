export const cleanETag = (etag) => {
    if (!etag) return null;

    let clean = etag.toString().trim();

    clean = clean.replace(/^W\/\\"/, 'W/"')
        .replace(/\\"$/, '"')
        .replace(/^"/, '')
        .replace(/"$/, '');

    if (!clean.startsWith('W/"')) {
        clean = `W/"${clean}"`;
    }

    return clean;
};