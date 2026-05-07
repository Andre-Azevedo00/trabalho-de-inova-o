import { Badge } from '../context/AppContext';
import { Card } from './ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface BadgeDisplayProps {
  badges: Badge[];
  showAll?: boolean;
}

export function BadgeDisplay({ badges, showAll = false }: BadgeDisplayProps) {
  const displayBadges = showAll ? badges : badges.slice(0, 5);
  const remaining = badges.length - displayBadges.length;

  if (badges.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <div className="text-4xl mb-2">🏅</div>
        <p>Nenhuma conquista ainda</p>
        <p className="text-sm">Continue estudando para ganhar badges!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <TooltipProvider>
        {displayBadges.map((badge) => (
          <Tooltip key={badge.id}>
            <TooltipTrigger>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-center">
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <div className="font-semibold text-sm">{badge.name}</div>
                  {badge.earnedAt && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(badge.earnedAt).toLocaleDateString('pt-BR')}
                    </div>
                  )}
                </div>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-medium">{badge.name}</p>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        
        {!showAll && remaining > 0 && (
          <Card className="p-4 flex items-center justify-center min-w-[100px]">
            <div className="text-center">
              <div className="text-2xl font-bold text-muted-foreground">+{remaining}</div>
              <div className="text-xs text-muted-foreground">mais</div>
            </div>
          </Card>
        )}
      </TooltipProvider>
    </div>
  );
}
