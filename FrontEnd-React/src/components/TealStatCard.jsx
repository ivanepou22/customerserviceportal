import { Card } from "./ui/card";

function TealStatCard({ title, value, subtitle, className = "bg-teal-600 hover:bg-teal-700" }) {
    return (
        <Card className={`${className} text-white border-0 shadow-sm transition-all cursor-pointer group min-h-[118px] rounded-lg md:rounded-none flex flex-col justify-between p-4`}>
            <div>
                <p className="text-[13px] font-medium opacity-90 line-clamp-2 leading-tight">{title}</p>
                <div className="mt-2 text-[28px] font-semibold tracking-tight">{value}</div>
            </div>

            <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/20 text-xs">
                <p className="opacity-75">{subtitle}</p>
                <div className="text-white/70 group-hover:translate-x-0.5 transition-transform">→</div>
            </div>
        </Card>
    );
}

export default TealStatCard;