import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Icon from "./Icon";
import { useAuth } from "../context/AuthContext";
import { navigation } from "../utils/data";

const Header = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubMenus, setOpenSubMenus] = useState({});
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
                    <button className="flex items-center gap-2 text-sm font-medium hover:text-primary">
                        {menuData.caption}
                        <Icon
                            name="chevronDown"
                            size={16}
                            className="transition-transform group-hover:rotate-180"
                        />
                    </button>
                    <div className="invisible absolute left-0 top-full z-50 mt-2 w-[400px] bg-gray-50 shadow-xl opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                        <div className="p-3">
                            {menuData?.items?.map((item) => (
                                <Link key={item.caption} to={item.link} className="flex items-start gap-2 p-2 transition-colors hover:bg-white">
                                    <div className="flex h-10 w-10 items-center justify-center bg-white text-gray-700">
                                        <Icon name={item.icon} size={18} />
                                    </div>
                                    <div>
                                        <h6 className="text-gray-900">
                                            {item.caption}
                                        </h6>
                                        <p className="text-sm text-gray-500">
                                            {item.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <Link key={key} to={menuData.link}
                className="px-3 py-2 text-[13px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
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
        <header className="sticky top-0 z-20 border-b border-border/80 bg-background/95 backdrop-blur">
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
    )
}

export default Header;
