export interface AIResult {
  possibleDisease: string;
  riskLevel: "낮음" | "중간" | "높음";
  foodsToAvoid: string;
  actionsToAvoid: string;
  recommendedActions: string;
  visitHospital: boolean;
}

export interface SimulationScenario {
  timeline: string;
  worseningProbability: "낮음" | "중간" | "높음";
  recoveryTime: string;
}

export interface SimulationResult {
  ifIgnored: SimulationScenario;
  ifManaged: SimulationScenario;
}

export interface SymptomRecord {
  id?: string;
  symptom: string;
  result: AIResult;
  createdAt?: string | Date;
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  bio?: string | null;
  healthMemo?: string | null;
}

export interface CommunityPost {
  id: string;
  userId: string;
  user?: User;
  title?: string | null;
  category?: string | null;
  content: string;
  imageUrl?: string | null;
  createdAt: string | Date;
  _count?: {
    comments: number;
    likes: number;
    votes: number;
  };
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user?: User;
  content: string;
  createdAt: string | Date;
}
