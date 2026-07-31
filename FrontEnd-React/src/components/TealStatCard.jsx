import { Card } from "./ui/card";

function TealStatCard({
    title,
    value,
    subtitle,
    className = "bg-teal-600 hover:bg-teal-700",
}) {
    return (
        <Card
            className={`${className} h-full min-h-[118px] text-white border-0 shadow-sm transition-all cursor-pointer group rounded-lg md:rounded-none flex flex-col justify-between p-4`}
        >
            <div>
                <p className="text-[13px] font-medium opacity-90 line-clamp-2 leading-tight">
                    {title}
                </p>
                <div className="mt-2 text-[20px] font-semibold tracking-tight">
                    {value}
                </div>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-white/20 pt-3 text-xs">
                <p className="opacity-75 line-clamp-1">{subtitle}</p>
                <div className="text-white/70 transition-transform group-hover:translate-x-0.5">
                    →
                </div>
            </div>
        </Card>
    );
}

export default TealStatCard;