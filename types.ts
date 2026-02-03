
export type RelationType = 'Boyfriend' | 'Girlfriend' | 'Best Friend';
export type VibeType = 'Sweet' | 'Playful' | 'Deep' | 'Supportive' | 'Romantic' | 'Motivational' | 'Intense';

export interface Persona {
  name: string;
  relation: RelationType;
  vibe: VibeType;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
