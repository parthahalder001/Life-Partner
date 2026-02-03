
import React, { useState } from 'react';
import { Persona } from './types';
import PersonaSetup from './components/PersonaSetup';
import ChatInterface from './components/ChatInterface';
import { partnerService } from './services/geminiService';

const App: React.FC = () => {
  const [persona, setPersona] = useState<Persona | null>(null);

  const handleSetupComplete = (newPersona: Persona) => {
    partnerService.initChat(newPersona);
    setPersona(newPersona);
  };

  const handleReset = () => {
    setPersona(null);
  };

  return (
    <div className="min-h-screen">
      {!persona ? (
        <PersonaSetup onComplete={handleSetupComplete} />
      ) : (
        <ChatInterface persona={persona} onReset={handleReset} />
      )}
    </div>
  );
};

export default App;
