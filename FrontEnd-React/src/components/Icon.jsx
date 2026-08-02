function Icon({ name, size = 20, className = "", strokeWidth = 2 }) {
    const paths = {
        shield: (
            <>
                <path d="M12 3 4.75 6v5.4c0 4.6 3.1 7.6 7.25 9.6 4.15-2 7.25-5 7.25-9.6V6L12 3Z" />
                <path d="m8.7 12 2.15 2.15 4.5-4.5" />
            </>
        ),
        bell: (
            <>
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                <path d="M10 21h4" />
            </>
        ),
        user: (
            <>
                <circle cx="12" cy="8" r="3.25" />
                <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
            </>
        ),
        chevron: <path d="m6 9 6 6 6-6" />,
        close: <path d="m6 6 12 12M18 6 6 18" />,
        menu: <path d="M4 7h16M4 12h16M4 17h16" />,
        check: <path d="m5 11 3.5 3.5L18 5.5" />,
        info: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v5M12 8h.01" />
            </>
        ),
        help: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M9.6 9a2.5 2.5 0 1 1 3.7 2.2c-.9.5-1.3 1-1.3 2.1M12 16.5h.01" />
            </>
        ),
        download: (
            <>
                <path d="M12 3v12" />
                <path d="m7 11 5 5 5-5" />
                <path d="M5 19h14" />
            </>
        ),
        columns: (
            <>
                <rect x="3" y="3" width="7" height="18" rx="1" />
                <rect x="14" y="3" width="7" height="18" rx="1" />
            </>
        ),
        refresh: (
            <>
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                <path d="M3 21v-5h5" />
            </>
        ),
        chevronDown: <path d="m6 9 6 6 6-6" />,
        fileSpreadsheet: (
            <>
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                <path d="M14 3v5h5" />
                <path d="M8 13h8M8 17h8M8 9h2" />
            </>
        ),
        fileText: (
            <>
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                <path d="M14 3v5h5" />
                <path d="M9 13h6M9 17h6M9 9h1" />
            </>
        ),
        filePdf: (
            <>
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                <path d="M14 3v5h5" />
                <path d="M9 15v-4h1.5a1.5 1.5 0 0 1 0 3H9" />
                <path d="M14 11h1.5a1.5 1.5 0 0 1 0 3H14v1" />
            </>
        ),
        checkSquare: (
            <>
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="m8 12 3 3 5-5" />
            </>
        ),
        square: <rect x="3" y="3" width="18" height="18" rx="2" />,
        minusSquare: (
            <>
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M8 12h8" />
            </>
        ),
        logout: (
            <>
                <path d="M15 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" />
                <path d="M10 17l-5-5 5-5" />
                <path d="M5 12h10" />
            </>
        ),
        chevronRight: (
            <path d="m9 6 6 6-6 6" />
        ),
        database: (
            <>
                <ellipse cx="12" cy="6" rx="7" ry="3" />
                <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
                <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
            </>
        ),
        trendingUp: (
            <>
                <path d="M3 17 9 11l4 4 8-8" />
                <path d="M15 7h6v6" />
            </>
        ),
        receipt: (
            <>
                <path d="M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21V3Z" />
                <path d="M9 8h6" />
                <path d="M9 12h6" />
                <path d="M9 16h4" />
            </>
        ),
        trendingDown: (
            <>
                <path d="M3 7 9 13l4-4 8 8" />
                <path d="M15 17h6v-6" />
            </>
        ),
        dashboard: (
            <>
                <rect x="3" y="3" width="8" height="8" rx="1" />
                <rect x="13" y="3" width="8" height="5" rx="1" />
                <rect x="13" y="10" width="8" height="11" rx="1" />
                <rect x="3" y="13" width="8" height="8" rx="1" />
            </>
        ),
        target: (
            <>
                <circle cx="12" cy="12" r="8" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="12" cy="12" r="1" />
            </>
        ),
        report: (
            <>
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                <path d="M14 3v5h5" />
                <path d="M8 13h8" />
                <path d="M8 17h5" />
                <path d="M8 9h3" />
            </>
        ),
        activity: (
            <>
                <path d="M3 12h4l2-5 4 10 2-5h6" />
            </>
        ),
        creditCard: (
            <>
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20" />
            </>
        ),
        barChart: (
            <>
                <path d="M6 20V10" />
                <path d="M12 20V4" />
                <path d="M18 20v-7" />
                <path d="M3 20h18" />
            </>
        ),
        lineChart: (
            <>
                <path d="M3 17 9 11l4 4 8-10" />
                <path d="M3 21h18" />
            </>
        ),
        pieChart: (
            <>
                <path d="M12 2v10h10" />
                <path d="M12 2a10 10 0 1 0 10 10" />
            </>
        ),
        building: (
            <>
                <path d="M4 20V8l8-5 8 5v12" />
                <path d="M9 20v-6h6v6" />
                <path d="M8 10h.01M16 10h.01" />
            </>
        ),
        code: (
            <>
                <path d="M8 9 4 12l4 3" />
                <path d="M16 9 20 12l-4 3" />
            </>
        ),
        close: <path d="m6 6 12 12M18 6 6 18" />,
        analytics: (
            <>
                <path d="M4 20V10" />
                <path d="M10 20V4" />
                <path d="M16 20v-8" />
                <path d="M22 20v-14" />
            </>
        ),
    };

    return (
        <svg
            aria-hidden="true"
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {paths[name]}
        </svg>
    );
}

export default Icon;