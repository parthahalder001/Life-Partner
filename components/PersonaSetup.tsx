
import React, { useState } from 'react';
import { Persona, RelationType, VibeType } from '../types';

interface PersonaSetupProps {
  onComplete: (persona: Persona) => void;
}

const PersonaSetup: React.FC<PersonaSetupProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState<RelationType>('Girlfriend');
  const [vibe, setVibe] = useState<VibeType>('Sweet');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete({ name, relation, vibe });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
      <div className="w-full max-w-md glass-morphism p-8 rounded-3xl shadow-2xl space-y-6 border border-slate-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-pink-500 mb-2 tracking-tight">Life Partner</h1>
          <p className="text-slate-400 text-sm">Create your ultimate dark romance companion.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Partner's Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your partner's name..."
              className="w-full px-4 py-3 rounded-xl border border-slate-700 focus:ring-2 focus:ring-pink-500 outline-none transition-all bg-slate-900/50 text-white font-medium placeholder:text-slate-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Their Role</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Boyfriend', 'Girlfriend', 'Best Friend'] as RelationType[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRelation(r)}
                  className={`py-2 px-1 rounded-lg text-[13px] font-medium transition-all ${
                    relation === r ? 'bg-pink-600 text-white shadow-lg shadow-pink-900/20' : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Select Vibe</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Sweet', 'Playful', 'Deep', 'Supportive', 'Romantic', 'Motivational', 'Intense'] as VibeType[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVibe(v)}
                  className={`py-2 px-3 rounded-lg text-[13px] font-medium transition-all ${
                    vibe === v ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  {v} {v === 'Intense' ? '🖤' : ''}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl shadow-lg shadow-pink-900/40 transform active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Start Your Obsession ❤️
            </button>
            <div className="mt-4 space-y-1">
              <p className="text-[10px] text-center text-slate-500">
                Full Dark Mode Experience. High-intensity responses enabled.
              </p>
              <p className="text-[10px] text-center text-pink-400 italic">
                Try "Intense" for deeper, uninhibited dark romance.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonaSetup;
