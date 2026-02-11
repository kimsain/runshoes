import { Shoe, MainCategory, SubCategory } from '@/types';

export interface Answer {
  questionId: string;
  optionId: string;
}

export interface RecommendationResult {
  shoe: Shoe;
  matchScore: number;
  matchReasons: string[];
}

export function calculateRecommendation(
  shoes: Shoe[],
  answers: Answer[]
): RecommendationResult[] {
  const categoryScores: Record<string, number> = {};
  const subCategoryScores: Record<string, number> = {};
  let maxPrice = 999999;

  // Process answers and calculate weights
  answers.forEach((answer) => {
    if (answer.questionId === 'budget') {
      // Extract max price from budget selection
      const priceMap: Record<string, number> = {
        'budget-low': 150000,
        'budget-mid': 220000,
        'budget-high': 300000,
        'budget-premium': 999999,
      };
      maxPrice = priceMap[answer.optionId] || 999999;
    }
  });

  // Score each shoe based on answers
  const scoredShoes = shoes
    .filter((shoe) => shoe.specs.priceKRW <= maxPrice)
    .map((shoe) => {
      let score = 0;
      const matchReasons: string[] = [];

      answers.forEach((answer) => {
        switch (answer.questionId) {
          case 'purpose':
            if (answer.optionId === 'health' || answer.optionId === 'stress') {
              if (shoe.mainCategory === 'daily') {
                score += 30;
                matchReasons.push('건강/스트레스 해소에 적합한 데일리 러닝화');
              }
            } else if (answer.optionId === 'race') {
              if (shoe.mainCategory === 'racing') {
                score += 40;
                matchReasons.push('대회 출전에 최적화된 레이싱화');
              } else if (shoe.mainCategory === 'super-trainer') {
                score += 20;
                matchReasons.push('대회 준비 훈련에 적합');
              }
            } else if (answer.optionId === 'hobby') {
              if (shoe.mainCategory === 'daily' || shoe.mainCategory === 'super-trainer') {
                score += 25;
                matchReasons.push('취미 러닝에 적합');
              }
            }
            break;

          case 'distance':
            if (answer.optionId === 'short') {
              if (shoe.subCategory === 'beginner' || shoe.subCategory === 'lightweight-trainer') {
                score += 30;
                matchReasons.push('짧은 거리 러닝에 적합');
              }
            } else if (answer.optionId === 'medium') {
              if (shoe.subCategory === 'all-rounder' || shoe.subCategory === 'beginner') {
                score += 25;
                matchReasons.push('중거리 러닝에 적합');
              }
            } else if (answer.optionId === 'half') {
              if (shoe.subCategory === 'half-marathon' || shoe.subCategory === 'non-plate') {
                score += 35;
                matchReasons.push('하프마라톤 거리에 최적화');
              }
            } else if (answer.optionId === 'full') {
              if (shoe.subCategory === 'full-marathon' || shoe.subCategory === 'max-cushion') {
                score += 35;
                matchReasons.push('풀마라톤 거리에 최적화');
              }
            }
            break;

          case 'priority':
            if (answer.optionId === 'cushion') {
              if (shoe.subCategory === 'max-cushion' || shoe.reviewScore.cushioning >= 8) {
                score += 30;
                matchReasons.push('뛰어난 쿠셔닝 제공');
              }
            } else if (answer.optionId === 'response') {
              if (shoe.reviewScore.responsiveness >= 8) {
                score += 30;
                matchReasons.push('탁월한 반응성');
              }
            } else if (answer.optionId === 'stability') {
              if (shoe.subCategory === 'stability' || shoe.reviewScore.stability >= 8) {
                score += 30;
                matchReasons.push('안정적인 지지력');
              }
            } else if (answer.optionId === 'light') {
              if (shoe.specs.weight <= 250) {
                score += 30;
                matchReasons.push('가벼운 무게');
              }
            } else if (answer.optionId === 'value') {
              if (shoe.reviewScore.value >= 8) {
                score += 30;
                matchReasons.push('뛰어난 가성비');
              }
            }
            break;

          case 'experience':
            if (answer.optionId === 'beginner') {
              if (shoe.subCategory === 'beginner' || shoe.subCategory === 'stability') {
                score += 25;
                matchReasons.push('입문자에게 추천');
              }
            } else if (answer.optionId === 'intermediate') {
              if (shoe.mainCategory === 'daily' || shoe.subCategory === 'non-plate') {
                score += 20;
                matchReasons.push('중급 러너에게 적합');
              }
            } else if (answer.optionId === 'advanced') {
              if (shoe.mainCategory === 'super-trainer' || shoe.mainCategory === 'racing') {
                score += 25;
                matchReasons.push('상급 러너를 위한 선택');
              }
            } else if (answer.optionId === 'elite') {
              if (shoe.mainCategory === 'racing') {
                score += 35;
                matchReasons.push('엘리트 러너를 위한 최고급 러닝화');
              }
            }
            break;
        }
      });

      // Bonus for overall good scores
      const avgScore =
        Object.values(shoe.reviewScore).reduce((a, b) => a + b, 0) / 7;
      score += avgScore * 2;

      return {
        shoe,
        matchScore: score,
        matchReasons: [...new Set(matchReasons)],
      };
    });

  // Sort by score and return top results
  return scoredShoes
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);
}
