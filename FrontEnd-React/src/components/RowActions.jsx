import { useState, useRef, useEffect } from 'react';
import { EllipsisVertical } from 'lucide-react';
import Icon from './Icon';

export default function RowActions({ row }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    console.log(row);
    useEffect(() => {
        const onClick = (e) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener(
            'mousedown',
            onClick
        );

        return () =>
            document.removeEventListener(
                'mousedown',
                onClick
            );
    }, []);

    return (
        <div
            className="relative"
            ref={menuRef}
        >
            <button
                onClick={() =>
                    setOpen(!open)
                }
                className="
                    p-1
                    rounded
                    hover:bg-muted
                "
            >
                <EllipsisVertical size={10} />
            </button>

            {open && (
                <div
                    className="
                        absolute
                        right-0
                        top-full
                        mt-1
                        w-44
                        bg-white
                        border
                        shadow-lg
                        rounded-md
                        z-50
                    "
                >
                    <button
                        className="
                            w-full
                            text-left
                            px-3
                            py-2
                            hover:bg-muted
                        "
                        onClick={() =>
                            console.log(
                                'View',
                                row
                            )
                        }
                    >
                        View
                    </button>

                    {/* <button
                        className="
                            w-full
                            text-left
                            px-3
                            py-2
                            hover:bg-muted
                        "
                        onClick={() =>
                            console.log(
                                'Edit',
                                row
                            )
                        }
                    >
                        Edit
                    </button> */}
                    {/* 
                    <button
                        className="
                            w-full
                            text-left
                            px-3
                            py-2
                            hover:bg-muted
                        "
                        onClick={() =>
                            console.log(
                                'Duplicate',
                                row
                            )
                        }
                    >
                        Duplicate
                    </button>

                    <div className="border-t" /> */}
                    {/* 
                    <button
                        className="
                            w-full
                            text-left
                            px-3
                            py-2
                            text-red-600
                            hover:bg-red-50
                        "
                        onClick={() =>
                            console.log(
                                'Delete',
                                row
                            )
                        }
                    >
                        Delete
                    </button> */}
                </div>
            )}
        </div>
    );
}