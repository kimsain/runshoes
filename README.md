<div align="center">

# RunPick

### 나에게 맞는 러닝화를 찾다

Nike, Adidas, Asics 러닝화를 카테고리별로 비교하고<br/>
나에게 맞는 완벽한 러닝화를 추천받으세요.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Demo](https://find-my-shoes.vercel.app) · [Features](#features) · [Getting Started](#getting-started) · [Documentation](#documentation)

</div>

---

## Overview

**RunPick**은 러닝화 선택에 어려움을 겪는 러너들을 위한 웹 애플리케이션입니다. 데일리 트레이너부터 레이싱화까지, 37개 이상의 러닝화 모델을 비교하고 5가지 질문을 통해 맞춤 추천을 받을 수 있습니다.

### Why RunPick?

- **체계적인 분류**: 데일리/슈퍼트레이너/레이싱 카테고리로 러닝화를 체계적으로 분류
- **객관적인 비교**: 무게, 스택, 드롭, 가격 등 스펙 기반 비교
- **맞춤 추천**: 러닝 목적, 거리, 경력에 맞는 AI 추천 시스템
- **프리미엄 UX**: 부드러운 애니메이션과 인터랙티브한 사용자 경험

---

## Features

### Core Features

| Feature | Description |
|---------|-------------|
| **브랜드별 탐색** | Nike, Adidas, Asics 브랜드별 러닝화 목록 |
| **카테고리 필터** | 데일리/슈퍼트레이너/레이싱 + 서브카테고리 필터링 |
| **상세 정보** | 스펙, 장단점, 레이더 차트 성능 지표 |
| **비교 기능** | 최대 3개 러닝화 동시 비교 |
| **추천 마법사** | 5가지 질문 기반 맞춤 추천 |

### UX Features

- **Text Split Animation** - 글자별 등장 애니메이션
- **Scroll Reveal** - 스크롤 기반 요소 등장 효과
- **Magnetic Button** - 마우스를 따라가는 버튼 효과
- **Infinite Marquee** - 무한 스크롤 마퀴
- **3D Card Tilt** - 호버 시 3D 틸트 효과
- **Radar Chart** - 성능 지표 시각화

---

## Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Animation** | Framer Motion 11 |
| **Charts** | Recharts |
| **State** | Zustand |
| **Deployment** | Vercel |

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 히어로 랜딩
│   ├── brands/[brand]/           # 브랜드별 페이지
│   ├── category/[main]/[sub]/    # 카테고리별 페이지
│   ├── shoe/[slug]/              # 상세 페이지
│   ├── compare/                  # 비교 페이지
│   └── recommend/                # 추천 마법사
│
├── components/
│   ├── animations/               # 애니메이션 컴포넌트
│   │   ├── ScrollReveal.tsx
│   │   ├── TextSplit.tsx
│   │   ├── MagneticButton.tsx
│   │   └── InfiniteMarquee.tsx
│   ├── layout/                   # Header, Footer
│   ├── shoes/                    # 러닝화 관련 컴포넌트
│   ├── recommend/                # 추천 마법사 컴포넌트
│   └── ui/                       # 공통 UI 컴포넌트
│
├── data/
│   └── shoes/                    # 러닝화 JSON 데이터
│       ├── nike.json             # Nike 12개 모델
│       ├── adidas.json           # Adidas 11개 모델
│       └── asics.json            # Asics 14개 모델
│
├── hooks/                        # Custom Hooks
├── lib/                          # Utilities
├── stores/                       # Zustand Stores
└── types/                        # TypeScript Types
```

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/sain-invites/find_my_shoes.git
cd find_my_shoes

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
# Production build
npm run build

# Start production server
npm start
```

---

## Documentation

### 러닝화 분류 체계

| 카테고리 | 서브카테고리 | 설명 |
|---------|------------|------|
| **데일리** | 입문화 | 처음 러닝을 시작하는 분을 위한 안정적인 선택 |
| | 맥스쿠션화 | 최대의 충격흡수로 관절을 보호 |
| | 안정화 | 과내전(오버프로네이션) 교정 |
| | 올라운더 | 쿠션, 반응성, 안정성 모두 갖춘 만능 트레이너 |
| | 경량트레이너 | 템포런과 인터벌 훈련에 적합 |
| **슈퍼트레이너** | 논플레이트 | 플레이트 없이 폼으로 반응성 제공 |
| | 라이트플레이트 | 가벼운 플레이트로 추진력 강화 |
| | 카본플레이트 | 레이싱급 반응성을 훈련에서 경험 |
| **레이싱** | 하프마라톤 | 하프마라톤과 10K 레이스 최적화 |
| | 풀마라톤 | 풀마라톤을 위한 최고의 레이싱 머신 |

### 데이터 구조

```typescript
interface Shoe {
  id: string;
  slug: string;
  brandId: 'nike' | 'adidas' | 'asics';
  name: string;
  nameKo: string;
  mainCategory: 'daily' | 'super-trainer' | 'racing';
  subCategory: SubCategory;
  specs: {
    weight: number;      // 무게 (g)
    heelStack: number;   // 힐 스택 (mm)
    foreStack: number;   // 전족부 스택 (mm)
    drop: number;        // 드롭 (mm)
    priceKRW: number;    // 가격 (원)
  };
  proscons: { pros: string[]; cons: string[] };
  reviewScore: ReviewScore;  // 7가지 성능 지표 (1-10)
}
```

### 러닝화 추가/수정하기

1. `src/data/shoes/[brand].json` 파일 수정
2. 위 데이터 구조에 맞게 러닝화 정보 추가
3. 이미지는 `public/images/shoes/[brand]/` 에 추가

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to [Vercel Dashboard](https://vercel.com) for automatic deployments.

### Other Platforms

```bash
# Build static files
npm run build

# The output is in .next/ directory
```

---

## Roadmap

- [ ] 더 많은 브랜드 추가 (New Balance, Saucony, Hoka)
- [ ] 사용자 리뷰 시스템
- [ ] 가격 비교 기능
- [ ] PWA 지원
- [ ] 다국어 지원 (영어)

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ for runners

</div>
