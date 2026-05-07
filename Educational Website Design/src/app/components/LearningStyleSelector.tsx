import { Eye, BookOpen, Pencil, Headphones } from 'lucide-react';
import { LearningStyle, useApp } from '../context/AppContext';
import { Card } from './ui/card';

const learningStyles: { type: LearningStyle; icon: any; label: string; description: string }[] = [
  {
    type: 'visual',
    icon: Eye,
    label: 'Visual',
    description: 'Aprendo melhor com imagens, diagramas e vídeos',
  },
  {
    type: 'reading',
    icon: BookOpen,
    label: 'Leitura',
    description: 'Prefiro textos, artigos e livros',
  },
  {
    type: 'practice',
    icon: Pencil,
    label: 'Prática',
    description: 'Aprendo fazendo exercícios e atividades',
  },
  {
    type: 'auditory',
    icon: Headphones,
    label: 'Auditivo',
    description: 'Gosto de ouvir explicações e podcasts',
  },
];

export function LearningStyleSelector() {
  const { userProfile, updateUserProfile } = useApp();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {learningStyles.map((style) => {
        const Icon = style.icon;
        const isSelected = userProfile.learningStyle === style.type;

        return (
          <Card
            key={style.type}
            className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
              isSelected
                ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
            onClick={() => updateUserProfile({ learningStyle: style.type })}
          >
            <div className="text-center">
              <div
                className={`inline-flex p-3 rounded-full mb-3 ${
                  isSelected
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1">{style.label}</h3>
              <p className="text-xs text-muted-foreground">{style.description}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
