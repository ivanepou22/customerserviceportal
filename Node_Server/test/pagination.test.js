import test from 'node:test';
import assert from 'node:assert/strict';
import {
    addPaginationToUrl,
    createPaginatedResponse,
    getPagination,
} from '../src/startup/pagination.js';

test('uses the default first page', () => {
    assert.deepEqual(getPagination({}), {
        page: 1,
        pageSize: 20,
        skip: 0,
        top: 21,
    });
});

test('calculates the offset and requests one additional record', () => {
    const pagination = getPagination({ page: '3', pageSize: '10' });

    assert.deepEqual(pagination, {
        page: 3,
        pageSize: 10,
        skip: 20,
        top: 11,
    });
    assert.equal(
        addPaginationToUrl('https://example.test/items?$filter=customerNo eq \'10000\'', pagination),
        'https://example.test/items?$filter=customerNo eq \'10000\'&$top=11&$skip=20',
    );
    assert.equal(
        addPaginationToUrl('https://example.test/items', pagination),
        'https://example.test/items?$top=11&$skip=20',
    );
});

test('rejects malformed and oversized pagination inputs', () => {
    assert.deepEqual(getPagination({ page: '0' }), { error: 'page must be a positive integer.' });
    assert.deepEqual(getPagination({ pageSize: '101' }), { error: 'pageSize cannot be greater than 100.' });
});

test('trims the extra record and includes navigation metadata', () => {
    const result = createPaginatedResponse(
        { '@odata.context': 'context', value: ['a', 'b', 'c'] },
        { page: 2, pageSize: 2 },
    );

    assert.deepEqual(result, {
        '@odata.context': 'context',
        value: ['a', 'b'],
        pagination: {
            page: 2,
            pageSize: 2,
            hasNextPage: true,
            nextPage: 3,
            previousPage: 1,
        },
    });
});
