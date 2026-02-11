import { Metadata } from 'next';
import RecommendWizard from '@/components/recommend/RecommendWizard';

export const metadata: Metadata = {
  title: '러닝화 추천 | RunPick',
  description: '5가지 질문에 답하고 나에게 맞는 러닝화를 추천받으세요.',
};

export default function RecommendPage() {
  return <RecommendWizard />;
}
