import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RiskBadge } from "./RiskBadge";
import { riskClassifications } from "@/data/africaDebtData";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface RiskTableProps {
  limit?: number;
}

export const RiskTable = ({ limit = 10 }: RiskTableProps) => {
  const data = riskClassifications.slice(0, limit);

  return (
    <Card variant="gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Top {limit} Highest-Risk Countries
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-muted-foreground">Rank</TableHead>
                <TableHead className="text-muted-foreground">Country</TableHead>
                <TableHead className="text-muted-foreground">Region</TableHead>
                <TableHead className="text-muted-foreground">Risk Score</TableHead>
                <TableHead className="text-muted-foreground">Risk Level</TableHead>
                <TableHead className="text-muted-foreground">Debt/GDP</TableHead>
                <TableHead className="text-muted-foreground">Key Drivers</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((country, index) => (
                <TableRow key={country.code} className="border-border/50">
                  <TableCell className="font-mono text-muted-foreground">{index + 1}</TableCell>
                  <TableCell className="font-semibold">{country.country}</TableCell>
                  <TableCell className="text-muted-foreground">{country.region}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all"
                          style={{ 
                            width: `${country.riskScore}%`,
                            backgroundColor: country.riskScore >= 80 ? 'hsl(0, 72%, 51%)' : 
                                           country.riskScore >= 60 ? 'hsl(38, 92%, 50%)' : 
                                           'hsl(142, 76%, 36%)'
                          }}
                        />
                      </div>
                      <span className="font-mono text-sm">{country.riskScore}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <RiskBadge level={country.riskLevel} />
                  </TableCell>
                  <TableCell className="font-mono">{country.debtToGDP.toFixed(1)}%</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {country.drivers.slice(0, 2).map((driver, i) => (
                        <span 
                          key={i}
                          className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground"
                        >
                          {driver}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
