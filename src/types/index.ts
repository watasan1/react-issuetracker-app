/**
 * アプリケーション共通型定義
 * この ファイルでは、アプリケーション全体で使用する型を定義します。
 * これらの型は、コンポーネント間でのデータのやり取りや状態管理に使用されます。
 */
// ページ(カテゴリ)の型定義
// サイドバーでのページ表示とコンテンツフィルタリングに使用されます。
export interface Page {
  id: string;
  title: string;
  isActive: boolean; // 選択中のページかどうか
  category: string; // フィルタリング用
  emoji: string;
}

// アイデアとToDoの型定義
// 簡易的なメモ機能として使用されます。
export interface Idea {
  id: string;
  text: string;
  createdAt: Date;
  category: string;
}

// ToDoの型定義
// タスク管理機能のメインデータ構造。
export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: string; // 所属ページのカテゴリ
}

// UI状態の型定義
export interface UIState {
  sidebarOpen: boolean;
  selectedTodo: Todo | null;
  editingTodo: Todo | null;
  draggedIdea: string | null;
}
