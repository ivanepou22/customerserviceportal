"use client"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { format } from "date-fns";
import { Calendar } from "../components/ui/calendar"
import { Field, FieldLabel } from "../components/ui/field"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../components/ui/popover"
import { Button } from "./ui/button";
import Icon from "./Icon";
import { useAuth } from "../context/AuthContext";
import { navigation } from "../utils/data";
import { DatePickerSimple } from "./DatePickerSimple";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState();
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubMenus, setOpenSubMenus] = useState({});
    const [selectedReport, setSelectedReport] = useState(null);
    const [reportFilters, setReportFilters] = useState({
        customerNo: user?.customerNo,
        startDate: "",
        endDate: "",
        asOfDate: ""
    });

    const openReportModal = (report) => {
        setSelectedReport(report);
        setIsMenuOpen(false);

        setReportFilters({
            customerNo: user?.customerNo,
            startDate: "",
            endDate: "",
            asOfDate: ""
        });
    };

    const closeReportModal = () => {
        setSelectedReport(null);
    };

    const handleReportFilterChange = (event) => {
        const { value } = event.target;

        setReportFilters((previousFilters) => ({
            ...previousFilters,
            value
        }));
    };

    const handleGenerateReport = (event) => {
        event.preventDefault();

        const reportRequest = {
            reportType: selectedReport.reportType,
            filters: reportFilters
        };

        console.log("Report request:", reportRequest);
        console.log('Date: ', format(date, 'yyyy-MM-dd'));
        // closeReportModal();
    };

    useEffect(() => {
        if (!selectedReport) return;

        const previousOverflow = document.body.style.overflow;

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                closeReportModal();
            }
        };

        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = previousOverflow;
        };
    }, [selectedReport]);

    const toggleSubMenu = (key) => {
        setOpenSubMenus(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const renderDesktopMenuItem = (item) => {
        const key = Object.keys(item)[0];
        const menuData = item[key];
        if (!menuData?.caption) return null;

        const children = Object.entries(menuData)
            .filter(([k]) => k !== 'caption' && k !== 'link')
            .map(([_, sub]) => sub);

        if (children.length > 0) {
            return (
                <div key={key} className="group relative">
                    <button className="flex items-center gap-2 text-sm text-gray-900 hover:text-primary">
                        {menuData.caption}
                        <Icon
                            name="chevronDown"
                            size={16}
                            className="transition-transform group-hover:rotate-180"
                        />
                    </button>
                    <div className="invisible absolute left-0 top-full z-50 mt-2 w-[400px] bg-gray-50 shadow-xl opacity-1 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                        <div className="p-2">
                            {menuData.items.map((subItem) => {
                                if (subItem.type === "report") {
                                    return (
                                        <button
                                            key={subItem.reportType}
                                            type="button"
                                            onClick={() => openReportModal(subItem)}
                                            className="group/item flex w-full items-start gap-2 px-2 py-1.5 text-left transition-colors duration-150 hover:bg-gray-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-950">
                                            <div className="flex size-10 shrink-0 items-center justify-center text-gray-900">
                                                <Icon name={subItem.icon} size={18} />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="text-base text-gray-950">
                                                    {subItem.caption}
                                                </div>

                                                <div className="text-sm leading-5 text-gray-500">
                                                    {subItem.description}
                                                </div>
                                            </div>
                                            <Icon
                                                name="chevronRight"
                                                size={18}
                                                className="shrink-0 text-gray-400 transition-transform duration-150 group-hover/item:translate-x-1 group-hover/item:text-gray-900" />
                                        </button>
                                    );
                                }

                                return (
                                    <Link
                                        key={subItem.link}
                                        to={subItem.link}
                                        className="group/item flex items-start gap-2 px-2 py-1.5 transition-colors duration-150 hover:bg-gray-100">
                                        <div
                                            className="flex size-10 shrink-0 items-center justify-center text-gray-900">
                                            <Icon name={subItem.icon} size={18} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="text-base text-gray-950">
                                                {subItem.caption}
                                            </div>
                                            <div className="text-sm leading-5 text-gray-500">
                                                {subItem.description}
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <Link key={key} to={menuData.link}
                className="px-3 py-2 text-[13px] font-medium hover:bg-muted hover:text-primary transition-colors">
                {menuData.caption}
            </Link>
        );
    };

    const renderMobileMenuItem = (item) => {
        const key = Object.keys(item)[0];
        const menuData = item[key];
        if (!menuData?.caption) return null;

        const children = Object.entries(menuData)
            .filter(([k]) => k !== 'caption' && k !== 'link')
            .map(([_, sub]) => sub);

        if (children.length > 0) {
            const isOpen = openSubMenus[key] ?? false;
            return (
                <div key={key} className="py-1">
                    <button onClick={() => toggleSubMenu(key)} className="flex w-full items-center justify-between px-3 py-2.5 text-sm font-medium hover:bg-muted text-left">
                        <span>{menuData.caption}</span>
                        <span className={`text-xs transition-transform ${isOpen ? 'rotate-90' : ''}`}>
                            <Icon size={14} name="chevronRight" />
                        </span>
                    </button>
                    {isOpen && (
                        <div className="ml-4 mt-1 border-l border-border pl-4 space-y-1">
                            {menuData?.items?.map((subItem, idx) => (
                                <Link key={idx} to={subItem.link} className="block px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                                    {subItem.caption}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            );
        }
        return (
            <Link key={key} to={menuData.link} className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                {menuData.caption}
            </Link>
        );
    };
    return (
        <>
            <header className="sticky top-0 z-30 border-b border-border/80 bg-background/95 backdrop-blur">
                <div className="mx-auto flex h-[60px] max-w-[1120px] items-center justify-between px-5 lg:px-0">
                    <Link to="/dashboard" className="flex items-center gap-2.5">
                        <span className="text-[22px] font-bold tracking-[-0.08em]">Customer Portal</span>
                    </Link>
                    <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
                        {navigation.map((item) => renderDesktopMenuItem(item))}
                    </nav>
                    <div className="relative group hidden md:block z-50">
                        <button className="flex items-center px-2 py-1.5 text-sm font-medium hover:bg-muted">
                            <span className="grid h-7 w-7 place-items-center bg-slate-100 text-slate-600">
                                <Icon name="user" size={15} />
                            </span>
                            <span className="max-w-36 truncate">{user?.email || "User"}</span>
                            <Icon name="chevron" size={15} className="text-muted-foreground" />
                        </button>
                        <div className="absolute right-0 top-full z-50 mt-1 w-48 border border-border bg-popover p-1 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all bg-slate-50">
                            <Link to="#profile" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted hover:text-foreground text-muted-foreground">
                                <Icon name="user" size={15} /> Profile
                            </Link>
                            <div className="border-t border-border"></div>
                            <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-red-100 hover:text-red-600 text-muted-foreground text-left">
                                <Icon name="logout" size={15} /> Logout
                            </button>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <Icon name="close" /> : <Icon name="menu" />}
                    </Button>
                </div>
                {isMenuOpen && (
                    <nav className="border-t border-border bg-background px-5 py-4 md:hidden space-y-1">
                        {navigation.map((item) => renderMobileMenuItem(item))}
                    </nav>
                )}
            </header>

            {selectedReport &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[9999] overflow-y-auto"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="report-modal-title"
                    >
                        <button
                            type="button"
                            aria-label="Close report modal"
                            onClick={closeReportModal}
                            className="fixed inset-0 h-full w-full cursor-default bg-black/60 backdrop-blur-[5px]"
                        />

                        <div className="relative z-10 flex min-h-full items-start justify-center px-2 py-4 sm:px-4">
                            <div className="flex w-full max-w-5xl flex-col overflow-hidden bg-white shadow-4xl">
                                <div className="flex items-start justify-between border-b border-gray-200 px-5 py-5 sm:px-6">
                                    <div className="flex min-w-0 items-start gap-2">
                                        <div className="flex size-11 shrink-0 items-center justify-center bg-gray-100 text-gray-950">
                                            <Icon
                                                name={selectedReport.icon || "report"}
                                                size={20}
                                            />
                                        </div>

                                        <div className="min-w-0">
                                            <p
                                                id="report-modal-title"
                                                className="text-lg text-gray-950"
                                            >
                                                {selectedReport.caption}
                                            </p>

                                            <p className="text-sm leading-5 text-gray-500">
                                                {selectedReport.description}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={closeReportModal}
                                        aria-label="Close modal"
                                        className="ml-4 flex size-9 shrink-0 items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-950"
                                    >
                                        <Icon name="close" size={20} />
                                    </button>
                                </div>

                                <form onSubmit={handleGenerateReport}>
                                    <div className="max-h-[calc(100vh-15rem)] space-y-5 overflow-y-auto px-5 py-6 sm:px-6 justify-center">
                                        {(selectedReport.fields?.includes("startDate") ||
                                            selectedReport.fields?.includes("endDate")) && (
                                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 justify-center">
                                                    {selectedReport.fields?.includes(
                                                        "startDate"
                                                    ) && (
                                                            <div>
                                                                <label
                                                                    htmlFor="report-start-date"
                                                                    className="mb-2 block text-sm font-medium text-gray-900"
                                                                >
                                                                    Start date
                                                                </label>

                                                                <input
                                                                    id="report-start-date"
                                                                    type="date"
                                                                    name="startDate"
                                                                    value={
                                                                        reportFilters.startDate
                                                                    }
                                                                    onChange={
                                                                        handleReportFilterChange
                                                                    }
                                                                    required
                                                                    className="h-9 w-full max-w-sm border border-gray-300 bg-white px-2 text-sm text-gray-900 outline-none focus:border-gray-950 focus:ring-2 focus:ring-gray-950/10"
                                                                />
                                                            </div>
                                                        )}

                                                    {selectedReport.fields?.includes(
                                                        "endDate"
                                                    ) && (
                                                            <div>
                                                                <label
                                                                    htmlFor="report-end-date"
                                                                    className="mb-2 block text-sm font-medium text-gray-900"
                                                                >
                                                                    End date
                                                                </label>

                                                                <input
                                                                    id="report-end-date"
                                                                    type="date"
                                                                    name="endDate"
                                                                    value={reportFilters.endDate}
                                                                    onChange={
                                                                        handleReportFilterChange
                                                                    }
                                                                    min={
                                                                        reportFilters.startDate ||
                                                                        undefined
                                                                    }
                                                                    required
                                                                    className="h-9 w-full max-w-sm border border-gray-300 bg-white px-2 text-sm text-gray-900 outline-none focus:border-gray-950 focus:ring-2 focus:ring-gray-950/10"
                                                                />
                                                            </div>
                                                        )}
                                                </div>
                                            )}

                                        {selectedReport.fields?.includes("asOfDate") && (
                                            <Field className="mx-auto w-44">
                                                <FieldLabel htmlFor="date">Aging as of:</FieldLabel>
                                                <Popover open={open} onOpenChange={setOpen}>
                                                    <PopoverTrigger asChild>
                                                        <Button variant="outline" id="date-picker-simple" className="w-full max-w-sm justify-start font-normal">
                                                            {date ? format(date, "yyyy-MM-dd") : <span>Pick a date</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0 z-[9999] bg-white shadow-4xl" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={date}
                                                            onSelect={(date) => {
                                                                setDate(date)
                                                                setOpen(false)
                                                            }}
                                                            className="z-[10000]"
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </Field>
                                        )}
                                    </div>

                                    <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                                        <button
                                            type="button"
                                            onClick={closeReportModal}
                                            className="inline-flex h-11 items-center justify-center border border-gray-300 bg-white px-5 text-sm font-medium text-gray-800 hover:bg-gray-100"
                                        >
                                            <Icon name="close" size={18} />
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            className="inline-flex h-11 items-center justify-center gap-2 bg-gray-950 px-5 text-sm font-medium text-white hover:bg-gray-800"
                                        >
                                            <Icon name="download" size={18} />
                                            Generate report
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    )

}

export default Header;
