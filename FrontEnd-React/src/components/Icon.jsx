function Icon({ name, size = 20, className = "", strokeWidth = 2 }) {
    const paths = {
        // Existing icons
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

        // New icons for DataTable
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