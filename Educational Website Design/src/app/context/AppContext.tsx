import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type LearningStyle = 'visual' | 'reading' | 'practice' | 'auditory';
export type Theme = 'light' | 'dark';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
}

export interface SubjectProgress {
  subjectId: string;
  percentage: number;
  completedTopics: string[];
  lastAccessed: string;
}

export interface UserProfile {
  name: string;
  learningStyle: LearningStyle;
  level: number;
  xp: number;
  badges: Badge[];
  subjectProgress: SubjectProgress[];
  favorites: string[];
  dailyGoal: number;
  streak: number;
}

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  addFavorite: (contentId: string) => void;
  removeFavorite: (contentId: string) => void;
  updateProgress: (subjectId: string, topicId: string) => void;
  earnBadge: (badge: Badge) => void;
  addXP: (amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultProfile: UserProfile = {
  name: 'Estudante',
  learningStyle: 'visual',
  level: 1,
  xp: 0,
  badges: [],
  subjectProgress: [],
  favorites: [],
  dailyGoal: 30,
  streak: 0,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'light';
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
  };

  const addFavorite = (contentId: string) => {
    setUserProfile(prev => ({
      ...prev,
      favorites: [...prev.favorites, contentId],
    }));
  };

  const removeFavorite = (contentId: string) => {
    setUserProfile(prev => ({
      ...prev,
      favorites: prev.favorites.filter(id => id !== contentId),
    }));
  };

  const updateProgress = (subjectId: string, topicId: string) => {
    setUserProfile(prev => {
      const existingProgress = prev.subjectProgress.find(p => p.subjectId === subjectId);
      const updatedProgress = existingProgress
        ? {
            ...existingProgress,
            completedTopics: [...new Set([...existingProgress.completedTopics, topicId])],
            lastAccessed: new Date().toISOString(),
          }
        : {
            subjectId,
            percentage: 0,
            completedTopics: [topicId],
            lastAccessed: new Date().toISOString(),
          };

      const otherProgress = prev.subjectProgress.filter(p => p.subjectId !== subjectId);
      return {
        ...prev,
        subjectProgress: [...otherProgress, updatedProgress],
      };
    });
  };

  const earnBadge = (badge: Badge) => {
    setUserProfile(prev => {
      const alreadyHas = prev.badges.some(b => b.id === badge.id);
      if (alreadyHas) return prev;

      return {
        ...prev,
        badges: [...prev.badges, { ...badge, earnedAt: new Date().toISOString() }],
      };
    });
  };

  const addXP = (amount: number) => {
    setUserProfile(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
      };
    });
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        userProfile,
        updateUserProfile,
        addFavorite,
        removeFavorite,
        updateProgress,
        earnBadge,
        addXP,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
