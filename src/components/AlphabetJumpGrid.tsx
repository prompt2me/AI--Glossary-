import React from 'react';

interface AlphabetJumpGridProps {
  letterCounts: Record<string, number>;
  activeLetter?: string;
  onSelectLetter: (letter: string) => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const AlphabetJumpGrid: React.FC<AlphabetJumpGridProps> = ({
  letterCounts,
  activeLetter,
  onSelectLetter,
}) => {
  return (
    <section aria-label="Alphabet Quick-Jump Grid" className="py-8 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-blue-600 rounded-full inline-block"></span>
              Alphabet Quick-Jump Grid (A–Z)
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Select any active letter to instantly scroll to its glossary section
            </p>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-blue-600"></span>
              <span>Active</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-gray-200"></span>
              <span>No Matching Terms</span>
            </span>
          </div>
        </div>

        {/* Responsive Grid of Letters */}
        <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-2 sm:gap-2.5">
          {ALPHABET.map((letter) => {
            const count = letterCounts[letter] || 0;
            const hasTerms = count > 0;
            const isActive = activeLetter === letter;

            return (
              <button
                key={letter}
                type="button"
                disabled={!hasTerms}
                onClick={() => hasTerms && onSelectLetter(letter)}
                aria-label={`Jump to letter ${letter}, ${count} terms available`}
                className={`
                  relative group flex flex-col items-center justify-center py-2 sm:py-2.5 px-1.5 rounded-xl border text-center transition-all duration-150
                  ${
                    !hasTerms
                      ? 'bg-gray-50 border-gray-200 text-[#9CA3AF] cursor-not-allowed opacity-60'
                      : isActive
                      ? 'bg-blue-600 border-blue-600 text-white shadow-sm ring-2 ring-blue-600/20 scale-[1.02]'
                      : 'bg-white border-gray-200 text-gray-900 hover:border-gray-400 hover:shadow-xs hover:bg-gray-50/80 active:scale-95'
                  }
                `}
              >
                <span className={`text-base sm:text-lg font-bold leading-none ${isActive ? 'text-white' : hasTerms ? 'text-gray-900' : 'text-[#9CA3AF]'}`}>
                  {letter}
                </span>
                <span
                  className={`text-[10px] font-semibold mt-1 transition-colors leading-none ${
                    isActive
                      ? 'text-blue-100'
                      : hasTerms
                      ? 'text-gray-400 group-hover:text-blue-600'
                      : 'text-gray-300'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
