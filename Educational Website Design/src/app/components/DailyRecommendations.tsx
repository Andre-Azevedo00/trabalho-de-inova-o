import { Lightbulb, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { subjects } from '../data/subjects';
import { useApp } from '../context/AppContext';

export function DailyRecommendations() {
  const { userProfile } = useApp();

  // Get subjects with incomplete progress
  const incompleteSubjects = subjects.filter((subject) => {
    const progress = userProfile.subjectProgress.find((p) => p.subjectId === subject.id);
    return !progress || progress.completedTopics.length < subject.topics.length;
  });

  // Get daily recommendations based on learning style
  const getDailyTips = () => {
    const tips = {
      visual: [
        '🎨 Dica: Crie mapas mentais coloridos para organizar as informações!',
        '📊 Use diagramas e gráficos para visualizar conceitos abstratos',
        '🖼️ Assista aos vídeos educativos disponíveis em cada tópico',
      ],
      reading: [
        '📚 Faça anotações enquanto lê para melhor retenção',
        '✍️ Reescreva conceitos importantes com suas próprias palavras',
        '📖 Explore os artigos complementares em cada disciplina',
      ],
      practice: [
        '✏️ Resolva todos os exercícios disponíveis',
        '🎯 Pratique regularmente para fixar o conteúdo',
        '🔄 Revise tópicos anteriores com novos exercícios',
      ],
      auditory: [
        '🎧 Grave resumos e ouça-os enquanto estuda',
        '🗣️ Explique conceitos em voz alta para si mesmo',
        '📹 Assista vídeos educativos e palestras online',
      ],
    };

    return tips[userProfile.learningStyle] || tips.visual;
  };

  const dailyTips = getDailyTips();
  const todayTip = dailyTips[new Date().getDate() % dailyTips.length];

  return (
    <div className="space-y-4">
      {/* Daily Tip */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-200 dark:border-yellow-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            <CardTitle className="text-yellow-900 dark:text-yellow-100">
              Dica do Dia
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-800 dark:text-yellow-200">{todayTip}</p>
        </CardContent>
      </Card>

      {/* Suggested Study Path */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <CardTitle>Sugestão de Estudo</CardTitle>
          </div>
          <CardDescription>Baseado no seu perfil de aprendizagem</CardDescription>
        </CardHeader>
        <CardContent>
          {incompleteSubjects.length > 0 ? (
            <div className="space-y-3">
              {incompleteSubjects.slice(0, 2).map((subject) => {
                const progress = userProfile.subjectProgress.find(
                  (p) => p.subjectId === subject.id
                );
                const nextTopicIndex = progress ? progress.completedTopics.length : 0;
                const nextTopic = subject.topics[nextTopicIndex];

                return (
                  <div
                    key={subject.id}
                    className="p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{subject.icon}</span>
                          <h4 className="font-semibold">{subject.name}</h4>
                        </div>
                        {nextTopic && (
                          <p className="text-sm text-muted-foreground mb-3">
                            Próximo: {nextTopic.title}
                          </p>
                        )}
                        <Link to={`/subject/${subject.id}`}>
                          <Button size="sm" className="w-full sm:w-auto">
                            <Clock className="mr-2 h-4 w-4" />
                            Estudar Agora
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              <p>🎉 Parabéns! Você completou todos os tópicos disponíveis!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
