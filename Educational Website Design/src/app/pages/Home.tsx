import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Target, TrendingUp, Award } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { SubjectCard } from '../components/SubjectCard';
import { subjects } from '../data/subjects';
import { useApp } from '../context/AppContext';

export function Home() {
  const { userProfile } = useApp();

  const features = [
    {
      icon: Sparkles,
      title: 'Aprendizado Personalizado',
      description: 'Conteúdo adaptado ao seu estilo de aprendizagem',
    },
    {
      icon: Target,
      title: 'Trilhas Inteligentes',
      description: 'Caminhos de estudo organizados e progressivos',
    },
    {
      icon: TrendingUp,
      title: 'Acompanhe seu Progresso',
      description: 'Visualize sua evolução em tempo real',
    },
    {
      icon: Award,
      title: 'Gamificação',
      description: 'Ganhe badges e conquistas ao estudar',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 rounded-full mb-6 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">
                Bem-vindo, {userProfile.name}!
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Aprenda do Seu Jeito
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Uma plataforma educacional que se adapta ao seu estilo de aprendizado,
              oferecendo conteúdos organizados e didáticos para todas as matérias.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="text-lg px-8">
                  Ir para Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#subjects">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Explorar Matérias
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce">📚</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-pulse">🎓</div>
        <div className="absolute bottom-20 left-1/4 text-4xl opacity-20 animate-bounce">✨</div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Por que escolher o EduLearn?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section id="subjects" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Matérias Disponíveis</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Escolha uma disciplina e comece sua jornada de aprendizado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para Começar?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a milhares de estudantes que já transformaram seus estudos
          </p>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Começar Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
