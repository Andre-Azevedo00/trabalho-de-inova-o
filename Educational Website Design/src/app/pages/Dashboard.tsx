import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { BadgeDisplay } from '../components/BadgeDisplay';
import { LearningStyleSelector } from '../components/LearningStyleSelector';
import { DailyRecommendations } from '../components/DailyRecommendations';
import { useApp } from '../context/AppContext';
import { subjects } from '../data/subjects';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { TrendingUp, Flame, BookOpen, Award, Clock, Target, Calendar, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const { userProfile } = useApp();

  const totalTopics = subjects.reduce((acc, subject) => acc + subject.topics.length, 0);
  const completedTopics = userProfile.subjectProgress.reduce(
    (acc, progress) => acc + progress.completedTopics.length,
    0
  );
  const overallProgress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

  const recentSubjects = [...userProfile.subjectProgress]
    .sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime())
    .slice(0, 3)
    .map((progress) => subjects.find((s) => s.id === progress.subjectId))
    .filter(Boolean);

  const recommendations = subjects
    .filter((subject) => {
      const progress = userProfile.subjectProgress.find((p) => p.subjectId === subject.id);
      return !progress || progress.completedTopics.length < subject.topics.length;
    })
    .slice(0, 3);

  const xpToNextLevel = (userProfile.level * 1000) - userProfile.xp;
  const xpProgress = ((userProfile.xp % 1000) / 1000) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Olá, {userProfile.name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Veja seu progresso e continue sua jornada de aprendizado
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="progress">Progresso</TabsTrigger>
            <TabsTrigger value="settings">Preferências</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Nível</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userProfile.level}</div>
                  <Progress value={xpProgress} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {xpToNextLevel} XP para próximo nível
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Streak</CardTitle>
                  <Flame className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userProfile.streak} dias</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Continue estudando diariamente!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Progresso Geral</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Math.round(overallProgress)}%</div>
                  <Progress value={overallProgress} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {completedTopics} de {totalTopics} tópicos
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Conquistas</CardTitle>
                  <Award className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userProfile.badges.length}</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Badges conquistadas
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <CardTitle>Atividade Recente</CardTitle>
                  </div>
                  <CardDescription>
                    Suas últimas matérias estudadas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recentSubjects.length > 0 ? (
                    <div className="space-y-4">
                      {recentSubjects.map((subject) => {
                        if (!subject) return null;
                        const progress = userProfile.subjectProgress.find(
                          (p) => p.subjectId === subject.id
                        );
                        const percentage = progress
                          ? (progress.completedTopics.length / subject.topics.length) * 100
                          : 0;

                        return (
                          <div key={subject.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">{subject.icon}</span>
                                <div>
                                  <p className="font-medium">{subject.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {progress?.completedTopics.length || 0} de{' '}
                                    {subject.topics.length} tópicos
                                  </p>
                                </div>
                              </div>
                              <span className="text-sm font-semibold">
                                {Math.round(percentage)}%
                              </span>
                            </div>
                            <Progress value={percentage} />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Comece a estudar para ver sua atividade</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    <CardTitle>Recomendações</CardTitle>
                  </div>
                  <CardDescription>
                    Matérias sugeridas para você
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recommendations.map((subject) => (
                      <Link
                        key={subject.id}
                        to={`/subject/${subject.id}`}
                        className="block"
                      >
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${subject.color} flex items-center justify-center text-2xl`}>
                            {subject.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{subject.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {subject.topics.length} tópicos disponíveis
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Daily Goal */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <CardTitle>Meta Diária</CardTitle>
                </div>
                <CardDescription>
                  Estude {userProfile.dailyGoal} minutos por dia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={45} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  13 de {userProfile.dailyGoal} minutos completados hoje
                </p>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <CardTitle>Conquistas</CardTitle>
                    </div>
                    <CardDescription>
                      Suas badges ganhas
                    </CardDescription>
                  </div>
                  {userProfile.badges.length > 5 && (
                    <Button variant="outline" size="sm">
                      Ver Todas
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <BadgeDisplay badges={userProfile.badges} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Progresso por Matéria</CardTitle>
                <CardDescription>
                  Acompanhe seu desempenho em cada disciplina
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {subjects.map((subject) => {
                    const progress = userProfile.subjectProgress.find(
                      (p) => p.subjectId === subject.id
                    );
                    const percentage = progress
                      ? (progress.completedTopics.length / subject.topics.length) * 100
                      : 0;

                    return (
                      <div key={subject.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{subject.icon}</span>
                            <div>
                              <p className="font-medium">{subject.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {progress?.completedTopics.length || 0} de{' '}
                                {subject.topics.length} tópicos concluídos
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{Math.round(percentage)}%</p>
                            <Link to={`/subject/${subject.id}`}>
                              <Button variant="ghost" size="sm" className="text-xs">
                                Continuar
                              </Button>
                            </Link>
                          </div>
                        </div>
                        <Progress value={percentage} />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Estilo de Aprendizagem</CardTitle>
                <CardDescription>
                  Selecione como você aprende melhor para personalizar seu conteúdo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LearningStyleSelector />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nome</p>
                    <p className="font-medium">{userProfile.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nível</p>
                    <p className="font-medium">{userProfile.level}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">XP Total</p>
                    <p className="font-medium">{userProfile.xp}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Meta Diária</p>
                    <p className="font-medium">{userProfile.dailyGoal} minutos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}