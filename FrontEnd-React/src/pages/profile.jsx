import { useMemo, useState } from "react";
import { Loader2, User, Mail, Hash, Shield, Eye, EyeOff } from "lucide-react";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";

function Profile() {
    const { user, updateUser } = useAuth();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

    const displayName = useMemo(() => {
        return (
            user?.name ||
            user?.fullName ||
            user?.displayName ||
            [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
            "User"
        );
    }, [user]);

    const email = user?.email || "—";
    const customerNo =
        user?.customerNo || user?.customerNumber || user?.Customer_No || "—";

    const initials = useMemo(() => {
        const parts = String(displayName)
            .trim()
            .split(/\s+/)
            .filter(Boolean);
        if (parts.length === 0) return "U";
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }, [displayName]);

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

    // Keep updateUser referenced so AuthContext can sync if profile fields expand later
    void updateUser;

    return (
        <div className="min-h-screen bg-[#f6f8fb]">
            <Header />

            <main className="mx-auto max-w-[1120px] px-5 py-8 lg:px-0">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Profile
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        View your account details and manage your password.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                    {/* Left: identity card */}
                    <section className="border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col items-center text-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-600 text-xl font-semibold text-white shadow-inner">
                                {initials}
                            </div>
                            <h2 className="mt-4 text-lg font-semibold text-gray-900">
                                {displayName}
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 break-all">{email}</p>
                            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
                                <Hash size={12} />
                                Customer {customerNo}
                            </span>
                        </div>
                    </section>

                    {/* Right: details + password */}
                    <div className="space-y-6">
                        <section className="border border-gray-200 bg-white shadow-sm">
                            <div className="border-b border-gray-100 px-6 py-4">
                                <h3 className="text-sm font-semibold text-gray-900">
                                    Account information
                                </h3>
                                <p className="mt-0.5 text-xs text-gray-500">
                                    Details linked to your customer portal account.
                                </p>
                            </div>

                            <div className="divide-y divide-gray-100">
                                <div className="flex items-start gap-3 px-6 py-4">
                                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center bg-gray-100 text-gray-600">
                                        <User size={16} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                            Full name
                                        </p>
                                        <p className="mt-0.5 text-sm text-gray-900">{displayName}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 px-6 py-4">
                                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center bg-gray-100 text-gray-600">
                                        <Mail size={16} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                            Email
                                        </p>
                                        <p className="mt-0.5 break-all text-sm text-gray-900">{email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 px-6 py-4">
                                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center bg-gray-100 text-gray-600">
                                        <Hash size={16} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                            Customer number
                                        </p>
                                        <p className="mt-0.5 text-sm text-gray-900">{customerNo}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

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

                            <form onSubmit={handlePasswordSubmit} className="space-y-4 px-6 py-5">
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
                                            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
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
            </main>
        </div>
    );
}

export default Profile;