import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Video,
  ExternalLink,
  CheckCircle2,
  Circle,
  Heart,
  Play,
  FileText,
  Award,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { useApp } from '../context/AppContext';
import { subjects } from '../data/subjects';
import { toast } from 'sonner';

export function Subject() {
  const { subjectId } = useParams();
  const { userProfile, updateProgress, addFavorite, removeFavorite, addXP, earnBadge } = useApp();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedExerciseAnswers, setSelectedExerciseAnswers] = useState<Record<string, string>>({});

  const subject = subjects.find((s) => s.id === subjectId);

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Matéria não encontrada</h1>
          <Link to="/">
            <Button>Voltar para Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const progress = userProfile.subjectProgress.find((p) => p.subjectId === subject.id);
  const completedTopics = progress?.completedTopics || [];
  const percentage = (completedTopics.length / subject.topics.length) * 100;

  const handleTopicComplete = (topicId: string) => {
    if (!completedTopics.includes(topicId)) {
      updateProgress(subject.id, topicId);
      addXP(50);
      toast.success('Tópico concluído! +50 XP', {
        description: 'Continue assim!',
      });

      // Check for first lesson badge
      if (userProfile.subjectProgress.reduce((acc, p) => acc + p.completedTopics.length, 0) === 0) {
        earnBadge({
          id: 'first-lesson',
          name: 'Primeiro Passo',
          description: 'Complete sua primeira lição',
          icon: '🎯',
        });
        toast.success('Nova conquista desbloqueada!', {
          description: '🎯 Primeiro Passo',
        });
      }
    }
  };

  const handleExerciseSubmit = (exerciseId: string, correctAnswer: string) => {
    const userAnswer = selectedExerciseAnswers[exerciseId];
    if (userAnswer === correctAnswer) {
      toast.success('Resposta correta! +10 XP');
      addXP(10);
    } else {
      toast.error('Resposta incorreta. Tente novamente!');
    }
  };

  const isFavorite = (contentId: string) => userProfile.favorites.includes(contentId);

  const toggleFavorite = (contentId: string) => {
    if (isFavorite(contentId)) {
      removeFavorite(contentId);
      toast.info('Removido dos favoritos');
    } else {
      addFavorite(contentId);
      toast.success('Adicionado aos favoritos');
    }
  };

  const currentTopic = selectedTopic ? subject.topics.find((t) => t.id === selectedTopic) : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className={`bg-gradient-to-r ${subject.color} text-white`}>
        <div className="container mx-auto px-4 py-12">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="text-6xl">{subject.icon}</div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{subject.name}</h1>
              <p className="text-white/90 text-lg">{subject.description}</p>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Seu Progresso</span>
              <span className="font-bold">{Math.round(percentage)}%</span>
            </div>
            <Progress value={percentage} className="h-3 bg-white/30" />
            <p className="text-sm mt-2 text-white/80">
              {completedTopics.length} de {subject.topics.length} tópicos concluídos
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Topics List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Tópicos</CardTitle>
                <CardDescription>
                  {subject.topics.length} tópicos disponíveis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {subject.topics.map((topic) => {
                    const isCompleted = completedTopics.includes(topic.id);
                    const isSelected = selectedTopic === topic.id;

                    return (
                      <button
                        key={topic.id}
                        onClick={() => setSelectedTopic(topic.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          isSelected
                            ? 'bg-blue-100 dark:bg-blue-900 ring-2 ring-blue-500'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{topic.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {topic.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Topic Content */}
          <div className="lg:col-span-2">
            {currentTopic ? (
              <div className="space-y-6">
                {/* Topic Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">{currentTopic.title}</CardTitle>
                        <CardDescription className="text-base">
                          {currentTopic.description}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(currentTopic.id)}
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            isFavorite(currentTopic.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-400'
                          }`}
                        />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>

                <Tabs defaultValue="theory" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="theory">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Teoria
                    </TabsTrigger>
                    <TabsTrigger value="examples">
                      <FileText className="h-4 w-4 mr-2" />
                      Exemplos
                    </TabsTrigger>
                    <TabsTrigger value="exercises">
                      <Award className="h-4 w-4 mr-2" />
                      Exercícios
                    </TabsTrigger>
                    <TabsTrigger value="resources">
                      <Video className="h-4 w-4 mr-2" />
                      Recursos
                    </TabsTrigger>
                  </TabsList>

                  {/* Theory */}
                  <TabsContent value="theory">
                    <Card>
                      <CardContent className="pt-6 prose dark:prose-invert max-w-none">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: currentTopic.theory.replace(/\n/g, '<br />'),
                          }}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Examples */}
                  <TabsContent value="examples">
                    <Card>
                      <CardHeader>
                        <CardTitle>Exemplos Práticos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {currentTopic.examples.map((example, index) => (
                            <div
                              key={index}
                              className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800"
                            >
                              <div className="flex items-start gap-3">
                                <Badge variant="secondary" className="mt-1">
                                  {index + 1}
                                </Badge>
                                <p className="whitespace-pre-line flex-1">{example}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Exercises */}
                  <TabsContent value="exercises">
                    <Card>
                      <CardHeader>
                        <CardTitle>Exercícios de Fixação</CardTitle>
                        <CardDescription>
                          Teste seus conhecimentos
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {currentTopic.exercises.map((exercise, index) => (
                            <div key={exercise.id} className="space-y-3">
                              <div className="flex items-start gap-3">
                                <Badge className="mt-1">{index + 1}</Badge>
                                <p className="font-medium flex-1">{exercise.question}</p>
                              </div>

                              {exercise.options && (
                                <div className="space-y-2 ml-10">
                                  {exercise.options.map((option) => (
                                    <label
                                      key={option}
                                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                                    >
                                      <input
                                        type="radio"
                                        name={`exercise-${exercise.id}`}
                                        value={option}
                                        onChange={(e) =>
                                          setSelectedExerciseAnswers({
                                            ...selectedExerciseAnswers,
                                            [exercise.id]: e.target.value,
                                          })
                                        }
                                        className="w-4 h-4"
                                      />
                                      <span>{option}</span>
                                    </label>
                                  ))}

                                  <Button
                                    onClick={() =>
                                      handleExerciseSubmit(exercise.id, exercise.answer)
                                    }
                                    disabled={!selectedExerciseAnswers[exercise.id]}
                                    className="mt-3"
                                  >
                                    Verificar Resposta
                                  </Button>

                                  {selectedExerciseAnswers[exercise.id] && (
                                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                                      <p className="text-sm font-medium mb-1">Explicação:</p>
                                      <p className="text-sm">{exercise.explanation}</p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Resources */}
                  <TabsContent value="resources">
                    <div className="space-y-4">
                      {/* Videos */}
                      {currentTopic.videoLinks.length > 0 && (
                        <Card>
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              <Video className="h-5 w-5" />
                              <CardTitle>Vídeos Educativos</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {currentTopic.videoLinks.map((link, index) => (
                                <a
                                  key={index}
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                                    <Play className="h-5 w-5 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium">Vídeo {index + 1}</p>
                                    <p className="text-xs text-muted-foreground">YouTube</p>
                                  </div>
                                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                </a>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Articles */}
                      {currentTopic.articleLinks.length > 0 && (
                        <Card>
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5" />
                              <CardTitle>Artigos e Referências</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {currentTopic.articleLinks.map((article, index) => (
                                <a
                                  key={index}
                                  href={article.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <BookOpen className="h-5 w-5 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium">{article.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {article.source}
                                    </p>
                                  </div>
                                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                </a>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Complete Topic Button */}
                {!completedTopics.includes(currentTopic.id) && (
                  <Button
                    onClick={() => handleTopicComplete(currentTopic.id)}
                    size="lg"
                    className="w-full"
                  >
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Marcar como Concluído
                  </Button>
                )}
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">
                    Selecione um tópico
                  </h3>
                  <p className="text-muted-foreground">
                    Escolha um tópico na lista ao lado para começar a estudar
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
