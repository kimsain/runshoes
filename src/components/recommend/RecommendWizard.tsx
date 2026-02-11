'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import ResultCard from './ResultCard';
import { useShoes } from '@/hooks/useShoes';
import { calculateRecommendation, Answer, RecommendationResult } from '@/lib/recommendation';
import questions from '@/data/questions.json';

export default function RecommendWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [results, setResults] = useState<RecommendationResult[] | null>(null);
  const allShoes = useShoes();

  const totalSteps = questions.questions.length;
  const isComplete = currentStep >= totalSteps;

  const handleAnswer = (questionId: string, optionId: string) => {
    const newAnswers = [...answers.filter((a) => a.questionId !== questionId), { questionId, optionId }];
    setAnswers(newAnswers);

    if (currentStep < totalSteps - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      // Calculate results
      const recommendationResults = calculateRecommendation(allShoes, newAnswers);
      setResults(recommendationResults);
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResults(null);
  };

  const currentQuestion = questions.questions[currentStep];
  const selectedAnswer = answers.find((a) => a.questionId === currentQuestion?.id)?.optionId;

  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {!isComplete ? (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                나에게 맞는 러닝화 찾기
              </h1>
              <p className="text-gray-400 text-lg">
                5가지 질문에 답하고 맞춤 추천을 받아보세요
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                추천 결과
              </h1>
              <p className="text-gray-400 text-lg">
                당신에게 가장 적합한 러닝화를 찾았습니다
              </p>
            </>
          )}
        </motion.div>

        {/* Progress */}
        {!isComplete && (
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        )}

        {/* Content */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            {!isComplete ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <QuestionCard
                  question={currentQuestion}
                  selectedAnswer={selectedAnswer}
                  onAnswer={(optionId) => handleAnswer(currentQuestion.id, optionId)}
                  onPrevious={handlePrevious}
                  showPrevious={currentStep > 0}
                  stepNumber={currentStep + 1}
                  totalSteps={totalSteps}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {results && (
                  <div className="space-y-8">
                    {/* Top Result */}
                    {results[0] && (
                      <div className="mb-12">
                        <p className="text-center text-gray-400 mb-4">최고의 추천</p>
                        <ResultCard
                          result={results[0]}
                          rank={1}
                          isTopPick
                        />
                      </div>
                    )}

                    {/* Other Results */}
                    {results.length > 1 && (
                      <div>
                        <p className="text-gray-400 mb-6">다른 추천 러닝화</p>
                        <div className="grid gap-4">
                          {results.slice(1).map((result, index) => (
                            <ResultCard
                              key={result.shoe.id}
                              result={result}
                              rank={index + 2}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Restart Button */}
                    <div className="text-center pt-8">
                      <button
                        onClick={handleRestart}
                        className="px-8 py-4 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
                      >
                        다시 추천받기
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
