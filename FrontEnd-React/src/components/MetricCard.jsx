import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function MetricCard({ title, value, description, className = "" }) {
    return (
        <Card className={`min-h-[118px] rounded-lg md:rounded-none ${className}`}>
            <CardHeader className="px-4 py-4 pb-2">
                <CardTitle className="text-[13px] font-medium text-muted-foreground leading-tight line-clamp-2">
                    {title}
                </CardTitle>
            </CardHeader>

            <CardContent className="px-4 pb-4 pt-0">
                <div className="flex items-baseline text-[18px] font-semibold leading-none tracking-tight">
                    {value}
                </div>

                {description && (
                    <>
                        <div className="my-3 h-px bg-border" />
                        <p className="text-[12px] leading-[16px] text-muted-foreground line-clamp-2">
                            {description}
                        </p>
                    </>
                )}
            </CardContent>
        </Card>
    );
}

export default MetricCard;