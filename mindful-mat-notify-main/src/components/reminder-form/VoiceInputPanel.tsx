
import React from 'react';
import VoiceInput from '../VoiceInput';

interface VoiceInputPanelProps {
  language: string;
  inputTarget: 'title' | 'description' | null;
  isListening: boolean;
  setIsListening: (isListening: boolean) => void;
  onTranscript: (transcript: string) => void;
}

const VoiceInputPanel: React.FC<VoiceInputPanelProps> = ({ 
  language, 
  inputTarget, 
  isListening, 
  setIsListening, 
  onTranscript 
}) => {
  if (!inputTarget) return null;

  return (
    <div className="my-4 p-3 bg-muted rounded-md">
      <VoiceInput 
        language={language}
        onTranscript={onTranscript}
        isListening={isListening}
        setIsListening={setIsListening}
      />
      <p className="text-xs text-muted-foreground mt-2">
        Speaking in: {language === 'en' ? 'English' : 
                     language === 'es' ? 'Spanish' :
                     language === 'fr' ? 'French' :
                     language === 'de' ? 'German' :
                     language === 'zh' ? 'Chinese' :
                     language === 'ja' ? 'Japanese' :
                     language === 'ko' ? 'Korean' :
                     language === 'hi' ? 'Hindi' : 'Unknown'}
      </p>
    </div>
  );
};

export default VoiceInputPanel;
