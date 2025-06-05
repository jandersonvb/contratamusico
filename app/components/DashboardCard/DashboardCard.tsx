// app/components/dashboard/DashboardCard.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value?: string | number;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode; // Para conteúdo mais complexo
  className?: string; // Para estilização adicional
}

export function DashboardCard({
  title,
  value,
  description,
  icon,
  children,
  className,
}: DashboardCardProps) {
  return (
    <Card
      className={`bg-card text-card-foreground shadow-md transition-shadow hover:shadow-lg ${className}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {value && <div className="text-2xl font-bold">{value}</div>}
        {description && (
          <p className="text-muted-foreground text-xs">{description}</p>
        )}
        {children}
      </CardContent>
    </Card>
  );
}
