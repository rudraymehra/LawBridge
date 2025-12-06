'use client';

import { Lightbulb, ArrowRight } from 'lucide-react';

interface ExampleQuestionsProps {
  onSelect: (question: string) => void;
  disabled?: boolean;
}

const EXAMPLE_QUESTIONS = [
  'What are my rights as a tenant?',
  'Can I break a lease early?',
  'What does force majeure mean?',
  'How do I file for small claims court?',
  'What is wrongful termination?',
  'Do I need a lawyer for a traffic ticket?',
];

export default function ExampleQuestions({ onSelect, disabled }: ExampleQuestionsProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-4 h-4 text-amber-400" />
        <span className="text-sm font-medium text-[#a0a0b8]">Try an example:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {EXAMPLE_QUESTIONS.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelect(question)}
            disabled={disabled}
            className="group px-4 py-2 text-sm text-[#a0a0b8]
                       bg-[#1a1a24] border border-[rgba(255,255,255,0.08)]
                       rounded-xl
                       hover:border-emerald-500/50 hover:bg-[#1a1a24] hover:text-white
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200
                       flex items-center gap-2"
          >
            <span>{question}</span>
            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-emerald-400" />
          </button>
        ))}
      </div>
    </div>
  );
}
