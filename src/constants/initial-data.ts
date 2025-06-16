// initial-data.ts

import type { Page, Idea, Todo } from '@/types'; // 正しいパスに修正

export const INITIAL_PAGES: Page[] = [
  { id: "1", title: "全般", isActive: true, category: "general", emoji: "✅" },
  {
    id: "2",
    title: "メインプロジェクト",
    isActive: false,
    category: "work",
    emoji: "💼",
  },
  {
    id: "3",
    title: "学習",
    isActive: false,
    category: "learning",
    emoji: "🎓",
  },
  {
    id: "4",
    title: "生活面（プライベート）",
    isActive: false,
    category: "personal",
    emoji: "🏠",
  },
];

export const INITIAL_IDEAS: Idea[] = [
  {
    id: "1",
    text: "個人ポートフォリオサイトを構築する",
    createdAt: new Date("2025-05-15"),
    category: "general",
  },
  {
    id: "2",
    text: "React の状態管理に関する記事を読む",
    createdAt: new Date("2025-05-16"),
    category: "work",
  },
  {
    id: "3",
    text: "個人開発の開発計画を立てる",
    createdAt: new Date("2025-05-17"),
    category: "work",
  },
  {
    id: "4",
    text: "週末旅行を計画する",
    createdAt: new Date("2025-05-18"),
    category: "personal",
  },
];

export const INITIAL_TODOS: Todo[] = [
  {
    id: "1",
    title: "デザインシステムの調査",
    description: "## 概要\n...（省略）",
    completed: false,
    createdAt: new Date("2025-05-15"),
    updatedAt: new Date("2025-05-15"),
    category: "work",
  },
  // 省略: 残りの TODO も同様に定義
];
