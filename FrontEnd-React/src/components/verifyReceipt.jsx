import React from 'react';
import Icon from './Icon';
import { Link } from 'react-router-dom';

const VerifyReceipt = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-20 border-b border-border/80 bg-background/95 backdrop-blur">
                <div className="mx-auto flex h-[60px] max-w-[1120px] items-center justify-between px-5 lg:px-0">
                    <Link to="#" className="flex items-center gap-2.5">
                        <span className="text-[22px] font-bold tracking-[-0.08em]">Customer Portal</span>
                    </Link>
                </div>
            </header>

            <div className="border-b border-emerald-100 bg-emerald-50">
                <div className="mx-auto flex h-8 max-w-[1120px] items-center justify-center gap-2 px-5 text-center text-[13px] font-semibold text-emerald-950">
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-white">
                        <Icon name="check" size={11} strokeWidth={3.5} />
                    </span>
                    Welcome to the Vision Group Customer Portal Document Verification.
                </div>
            </div>
            <main id="dashboard" className="mx-auto max-w-[1120px] px-5 pb-10 pt-4 lg:px-0 lg:pt-10">

            </main>
        </div>
    );
}

export default VerifyReceipt;
