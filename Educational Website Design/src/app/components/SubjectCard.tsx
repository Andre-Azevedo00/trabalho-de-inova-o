import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { useApp } from '../context/AppContext';
import { Subject } from '../data/subjects';

interface SubjectCardProps {
  subject: Subject;
}

export function SubjectCard({ subject }: SubjectCardProps) {
  const { userProfile } = useApp();
  
  const progress = userProfile.subjectProgress.find(
    (p) => p.subjectId === subject.id
  );
  
  const percentage = progress
    ? (progress.completedTopics.length / subject.topics.length) * 100
    : 0;

  const lastAccessed = progress?.lastAccessed
    ? new Date(progress.lastAccessed).toLocaleDateString('pt-BR')
    : null;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className={`h-2 bg-gradient-to-r ${subject.color}`} />
      
      <div className="relative h-48 overflow-hidden">
        <img
          src={subject.imageUrl}
          alt={subject.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <div className="text-4xl mb-2">{subject.icon}</div>
          <h3 className="font-bold text-xl">{subject.name}</h3>
        </div>
      </div>

      <CardHeader>
        <CardDescription>{subject.description}</CardDescription>
        
        {percentage > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progresso</span>
              <span className="font-semibold">{Math.round(percentage)}%</span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
        )}
        
        {lastAccessed && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Último acesso: {lastAccessed}</span>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <Link to={`/subject/${subject.id}`}>
          <Button className="w-full group/btn">
            Começar a Estudar
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
        
        <div className="mt-3 text-center text-sm text-muted-foreground">
          {subject.topics.length} {subject.topics.length === 1 ? 'tópico' : 'tópicos'} disponíveis
        </div>
      </CardContent>
    </Card>
  );
}
