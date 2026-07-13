export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

const isPositiveInteger = value => typeof value === 'string' && /^[1-9]\d*$/.test(value);

/**
 * Reads and validates the pagination query parameters used by collection APIs.
 * Pages are one-indexed so they are convenient for API consumers.
 */
export const getPagination = query => {
    const pageValue = query.page ?? '1';
    const pageSizeValue = query.pageSize ?? String(DEFAULT_PAGE_SIZE);

    if (!isPositiveInteger(pageValue)) {
        return { error: 'page must be a positive integer.' };
    }

    if (!isPositiveInteger(pageSizeValue)) {
        return { error: 'pageSize must be a positive integer.' };
    }

    const page = Number(pageValue);
    const pageSize = Number(pageSizeValue);

    if (!Number.isSafeInteger(page) || !Number.isSafeInteger(pageSize)) {
        return { error: 'page and pageSize must be valid integers.' };
    }

    if (pageSize > MAX_PAGE_SIZE) {
        return { error: `pageSize cannot be greater than ${MAX_PAGE_SIZE}.` };
    }

    const skip = (page - 1) * pageSize;
    if (!Number.isSafeInteger(skip)) {
        return { error: 'The requested page is too large.' };
    }

    // Request one extra record so the API can reliably report whether a next page exists.
    return { page, pageSize, skip, top: pageSize + 1 };
};

export const addPaginationToUrl = (url, { skip, top }) =>
    `${url}${url.includes('?') ? '&' : '?'}$top=${top}&$skip=${skip}`;

export const createPaginatedResponse = (data, { page, pageSize }) => {
    const values = Array.isArray(data?.value) ? data.value : [];
    const hasNextPage = values.length > pageSize;

    return {
        ...data,
        value: values.slice(0, pageSize),
        pagination: {
            page,
            pageSize,
            hasNextPage,
            nextPage: hasNextPage ? page + 1 : null,
            previousPage: page > 1 ? page - 1 : null,
        },
    };
};
