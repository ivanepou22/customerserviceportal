import { useEffect, useMemo, useState } from "react";
import {
    Loader2,
    User,
    Mail,
    Hash,
    Shield,
    Eye,
    EyeOff,
    MapPin,
    Phone,
    Building2,
    Contact,
    RefreshCw,
} from "lucide-react";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";
import { customerReportService } from "../services/customerReportService";

const formatCurrency = (value) =>
    Number(value ?? 0).toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    });

const displayOrDash = (value) => {
    if (value === null || value === undefined) return "—";
    const str = String(value).trim();
    return str ? str : "—";
};

function Profile() {
    const { user } = useAuth();

    const [customer, setCustomer] = useState(null);
    const [customerLoading, setCustomerLoading] = useState(true);
    const [customerError, setCustomerError] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

    const loadCustomer = async () => {
        setCustomerLoading(true);
        setCustomerError("");
        try {
            const data = await customerReportService.fetchCustomer();
            setCustomer(data);
        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.response?.data ||
                err.message ||
                "Failed to load customer details.";
            setCustomerError(
                typeof message === "string" ? message : "Failed to load customer details."
            );
        } finally {
            setCustomerLoading(false);
        }
    };

    useEffect(() => {
        loadCustomer();
    }, []);

    const displayName = useMemo(() => {
        return (
            customer?.name ||
            user?.name ||
            user?.fullName ||
            user?.displayName ||
            [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
            "User"
        );
    }, [customer, user]);

    const email = user?.email || "—";
    const customerNo =
        customer?.number ||
        user?.customerNo ||
        user?.customerNumber ||
        user?.Customer_No ||
        "—";

    const initials = useMemo(() => {
        const parts = String(displayName).trim().split(/\s+/).filter(Boolean);
        if (parts.length === 0) return "U";
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }, [displayName]);

    const addressLine = useMemo(() => {
        if (!customer) return "—";
        const parts = [
            customer.address,
            customer.address_2,
            customer.city,
            customer.countryRegionCode,
        ]
            .map((p) => (p ? String(p).trim() : ""))
            .filter(Boolean);
        return parts.length ? parts.join(", ") : "—";
    }, [customer]);

    const balanceCards = [
        {
            label: "Balance",
            value: customer?.balanceLCY ?? customer?.balance,
        },
        {
            label: "Balance due",
            value: customer?.balanceDueLCY ?? customer?.balanceDue,
        },
        {
            label: "Balance on date",
            value: customer?.balanceonDateLCY ?? customer?.balanceonDate,
        },
        {
            label: "Credit limit",
            value: customer?.creditLimitLCY,
        },
    ];

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordError("");
        setPasswordSuccess("");

        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError("All password fields are required.");
            return;
        }
        if (newPassword.length < 6) {
            setPasswordError("New password must be at least 6 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError("New password and confirmation do not match.");
            return;
        }

        setPasswordLoading(true);
        try {
            await authService.changePassword({
                currentPassword,
                newPassword,
            });
            setPasswordSuccess("Password updated successfully.");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.response?.data ||
                err.message ||
                "Failed to update password.";
            setPasswordError(
                typeof message === "string" ? message : "Failed to update password."
            );
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f6f8fb]">
            <Header />

            <main className="mx-auto max-w-[1120px] px-5 py-4 lg:px-0">
                <div className="mb-6 flex flex-wrap items-start justify-between border border-gray-200 bg-white p-4 shadow-sm gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                            Profile
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            View your account and customer details from Business Central.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={loadCustomer}
                        disabled={customerLoading}
                        className="inline-flex items-center gap-2 border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                    >
                        <RefreshCw
                            size={14}
                            className={customerLoading ? "animate-spin" : ""}
                        />
                        Refresh
                    </button>
                </div>

                {customerLoading && !customer ? (
                    <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 border border-gray-200 bg-white">
                        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                        <p className="text-sm text-gray-500">Loading customer details…</p>
                    </div>
                ) : customerError && !customer ? (
                    <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 border border-red-200 bg-red-50 p-8 text-center">
                        <p className="text-sm text-red-600">{customerError}</p>
                        <button
                            type="button"
                            onClick={loadCustomer}
                            className="bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                        >
                            Try again
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                        {/* Left: identity card */}
                        <section className="border border-gray-200 bg-white p-6 shadow-sm h-fit">
                            <div className="flex flex-col items-center text-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-600 text-xl font-semibold text-white shadow-inner">
                                    {initials}
                                </div>
                                <h2 className="mt-4 text-lg font-semibold text-gray-900">
                                    {displayName}
                                </h2>
                                <p className="mt-1 break-all text-sm text-gray-500">{email}</p>
                                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
                                    <Hash size={12} />
                                    Customer {customerNo}
                                </span>
                            </div>

                            <div className="mt-6 space-y-3 border-t border-gray-100 pt-5 text-left">
                                <div className="flex items-start gap-2 text-sm">
                                    <Contact size={15} className="mt-0.5 shrink-0 text-gray-400" />
                                    <div>
                                        <p className="text-xs text-gray-400">Contact</p>
                                        <p className="text-gray-800">
                                            {displayOrDash(customer?.contact)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <Phone size={15} className="mt-0.5 shrink-0 text-gray-400" />
                                    <div>
                                        <p className="text-xs text-gray-400">Phone</p>
                                        <p className="text-gray-800">
                                            {displayOrDash(
                                                customer?.phoneNo || customer?.mobilePhoneNo
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <MapPin size={15} className="mt-0.5 shrink-0 text-gray-400" />
                                    <div>
                                        <p className="text-xs text-gray-400">Address</p>
                                        <p className="text-gray-800">{addressLine}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Right column */}
                        <div className="space-y-6">
                            {/* Balance stats */}
                            <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                {balanceCards.map((card) => (
                                    <div
                                        key={card.label}
                                        className="border border-gray-200 bg-white px-4 py-4 shadow-sm"
                                    >
                                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                            {card.label}
                                        </p>
                                        <p className="mt-1 text-lg font-semibold tabular-nums text-gray-900">
                                            {formatCurrency(card.value)}
                                        </p>
                                    </div>
                                ))}
                            </section>

                            {/* Customer details */}
                            <section className="border border-gray-200 bg-white shadow-sm">
                                <div className="border-b border-gray-100 px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Building2 size={16} className="text-gray-500" />
                                        <h3 className="text-sm font-semibold text-gray-900">
                                            Customer information
                                        </h3>
                                    </div>
                                    <p className="mt-0.5 text-xs text-gray-500">
                                        Details from Business Central for customer {customerNo}.
                                    </p>
                                </div>

                                <div className="grid gap-0 sm:grid-cols-2">
                                    <DetailRow
                                        icon={<User size={16} />}
                                        label="Name"
                                        value={displayOrDash(customer?.name)}
                                    />
                                    <DetailRow
                                        icon={<Hash size={16} />}
                                        label="Customer number"
                                        value={displayOrDash(customer?.number)}
                                    />
                                    <DetailRow
                                        icon={<Contact size={16} />}
                                        label="Contact"
                                        value={displayOrDash(customer?.contact)}
                                    />
                                    <DetailRow
                                        icon={<Mail size={16} />}
                                        label="Portal email"
                                        value={displayOrDash(email)}
                                    />
                                    <DetailRow
                                        icon={<Phone size={16} />}
                                        label="Phone"
                                        value={displayOrDash(customer?.phoneNo)}
                                    />
                                    <DetailRow
                                        icon={<Phone size={16} />}
                                        label="Mobile"
                                        value={displayOrDash(customer?.mobilePhoneNo)}
                                    />
                                    <DetailRow
                                        icon={<MapPin size={16} />}
                                        label="Address"
                                        value={displayOrDash(customer?.address)}
                                    />
                                    <DetailRow
                                        icon={<MapPin size={16} />}
                                        label="Address 2"
                                        value={displayOrDash(customer?.address_2)}
                                    />
                                    <DetailRow
                                        icon={<MapPin size={16} />}
                                        label="City"
                                        value={displayOrDash(customer?.city)}
                                    />
                                    <DetailRow
                                        icon={<MapPin size={16} />}
                                        label="Country / region"
                                        value={displayOrDash(customer?.countryRegionCode)}
                                    />
                                    <DetailRow
                                        icon={<Hash size={16} />}
                                        label="VAT registration no."
                                        value={displayOrDash(customer?.vATRegistrationNo)}
                                        className="sm:col-span-2"
                                    />
                                </div>
                            </section>

                            {/* Change password */}
                            <section className="border border-gray-200 bg-white shadow-sm">
                                <div className="border-b border-gray-100 px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Shield size={16} className="text-gray-500" />
                                        <h3 className="text-sm font-semibold text-gray-900">
                                            Change password
                                        </h3>
                                    </div>
                                    <p className="mt-0.5 text-xs text-gray-500">
                                        Use a strong password you do not reuse elsewhere.
                                    </p>
                                </div>

                                <form
                                    onSubmit={handlePasswordSubmit}
                                    className="space-y-4 px-6 py-5"
                                >
                                    <div>
                                        <label className="mb-1 block text-sm text-gray-600">
                                            Current password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showCurrent ? "text" : "password"}
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                autoComplete="current-password"
                                                disabled={passwordLoading}
                                                className="w-full border border-gray-200 bg-gray-50 py-2 pl-3 pr-11 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                tabIndex={-1}
                                                onClick={() => setShowCurrent((v) => !v)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm text-gray-600">
                                            New password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showNew ? "text" : "password"}
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                autoComplete="new-password"
                                                minLength={6}
                                                disabled={passwordLoading}
                                                className="w-full border border-gray-200 bg-gray-50 py-2 pl-3 pr-11 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
                                                placeholder="At least 6 characters"
                                            />
                                            <button
                                                type="button"
                                                tabIndex={-1}
                                                onClick={() => setShowNew((v) => !v)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm text-gray-600">
                                            Confirm new password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showConfirm ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                autoComplete="new-password"
                                                minLength={6}
                                                disabled={passwordLoading}
                                                className="w-full border border-gray-200 bg-gray-50 py-2 pl-3 pr-11 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
                                                placeholder="Repeat new password"
                                            />
                                            <button
                                                type="button"
                                                tabIndex={-1}
                                                onClick={() => setShowConfirm((v) => !v)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showConfirm ? (
                                                    <EyeOff size={16} />
                                                ) : (
                                                    <Eye size={16} />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {passwordError && (
                                        <p className="text-sm text-red-600">{passwordError}</p>
                                    )}
                                    {passwordSuccess && (
                                        <p className="text-sm text-emerald-600">{passwordSuccess}</p>
                                    )}

                                    <div className="pt-1">
                                        <button
                                            type="submit"
                                            disabled={passwordLoading}
                                            className="inline-flex items-center justify-center gap-2 bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-800 disabled:bg-gray-400"
                                        >
                                            {passwordLoading && (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            )}
                                            {passwordLoading ? "Updating…" : "Update password"}
                                        </button>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

function DetailRow({ icon, label, value, className = "" }) {
    return (
        <div
            className={`flex items-start gap-3 border-b border-gray-100 px-6 py-4 ${className}`}
        >
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center bg-gray-100 text-gray-600">
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    {label}
                </p>
                <p className="mt-0.5 break-words text-sm text-gray-900">{value}</p>
            </div>
        </div>
    );
}

export default Profile;
