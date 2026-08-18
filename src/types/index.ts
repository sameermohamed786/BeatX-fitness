export type ClassCategory = 'All' | 'HIIT' | 'Strength' | 'Cardio' | 'Yoga' | 'Zumba';

export interface ClassItem {
  id: string;
  name: string;
  category: ClassCategory;
  trainer: string;
  trainerRole: string;
  trainerAvatar: string;
  time: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  duration: string;
  calories: number;
  intensity: 'Beginner' | 'Intermediate' | 'Advanced' | 'Extreme';
  maxCapacity: number;
  bookedSeats: number;
  description: string;
  image: string;
  room: string;
}

export interface TrainerItem {
  id: string;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  certs: string[];
  bio: string;
  image: string;
  instagram: string;
  twitter: string;
  spotify: string;
  rating: number;
  totalClasses: number;
  successRate: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceYearly: number;
  popular?: boolean;
  badge?: string;
  features: string[];
  notIncluded?: string[];
  ctaText: string;
  glowColor: 'red' | 'orange' | 'white';
}

export interface TransformationStory {
  id: string;
  name: string;
  age: number;
  goal: string;
  timeFrame: string;
  weightLost: string;
  muscleGained: string;
  beforeImg: string;
  afterImg: string;
  quote: string;
  trainer: string;
  category: 'Fat Loss' | 'Muscle Gain' | 'Recomp' | 'Endurance';
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Workout' | 'Nutrition' | 'Recovery' | 'Mindset';
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
  featured?: boolean;
}

export interface ChallengeTask {
  id: string;
  day: number;
  title: string;
  description: string;
  category: 'Mindset' | 'Nutrition' | 'HIIT' | 'Recovery';
  points: number;
  completed: boolean;
}

export interface AIGoalInput {
  age: number;
  weightKg: number;
  heightCm: number;
  gender: 'male' | 'female' | 'other';
  goal: 'Fat Loss' | 'Muscle Gain' | 'Athletic Conditioning' | 'Endurance & Mobility';
  activityLevel: 'Sedentary' | 'Moderate' | 'High';
}

export interface AIGoalResult {
  dailyCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  recommendedPlan: string;
  recommendedTrainer: string;
  recommendedClasses: string[];
  weeklySessions: number;
  bmi: number;
  bmiCategory: string;
}
