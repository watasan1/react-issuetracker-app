import { useState } from "react";
import { useImmer } from "use-immer";
import type { Idea } from "@/types";
import { INITIAL_IDEAS } from "@/constants/initial-data";

/**
 * アイデア管理カスタムフックの戻り値の型
 */
interface UseIdeasReturn {
  ideas: Idea[];
  newIdeaText: string;
  setNewIdeaText: (text: string) => void;
  draggedIdea: string | null;
  setDraggedIdea: (ideaId: string | null) => void;
  addIdea: (text: string, category: string) => void;
  deleteIdea: (ideaId: string) => void;
  updateIdeaCategory: (ideaId: string, newCategory: string) => void;
  moveIdea: (
    fromIndex: number,
    toIndex: number,
    activeCategory: string
  ) => void;
  getFilteredIdeas: (activeCategory: string) => Idea[];
}

/**
 * アイデア管理カスタムフック（Immer使用）
 */
export function useIdeasImmer(): UseIdeasReturn {
  // Immerを使用してイミュータブルな状態管理を実現
  const [ideas, updateIdeas] = useImmer<Idea[]>(INITIAL_IDEAS);

  // ドラッグ＆ドロップ機能用のUI状態
  const [newIdeaText, setNewIdeaText] = useState("");
  const [draggedIdea, setDraggedIdea] = useState<string | null>(null);

  /**
   * 新しいアイデアを追加する
   */
  const addIdea = (text: string, category: string) => {
    if (text.trim()) {
      updateIdeas((draft) => {
        draft.push({
          id: Date.now().toString(),
          text: text.trim(),
          createdAt: new Date(),
          category,
        });
      });
      setNewIdeaText("");
    }
  };

  /**
   * アイデアを削除する
   */
  const deleteIdea = (ideaId: string) => {
    updateIdeas((draft) => {
      const index = draft.findIndex((idea) => idea.id === ideaId);
      if (index !== -1) {
        draft.splice(index, 1);
      }
    });
  };

  /**
   * アイデアのカテゴリを変更する
   */
  const updateIdeaCategory = (ideaId: string, newCategory: string) => {
    updateIdeas((draft) => {
      const idea = draft.find((idea) => idea.id === ideaId);
      if (idea) {
        idea.category = newCategory;
      }
    });
  };

  /**
   * ドラッグ＆ドロップでアイデアの順序を変更する
   */
  const moveIdea = (
    fromIndex: number,
    toIndex: number,
    activeCategory: string
  ) => {
    updateIdeas((draft) => {
      // 現在のフィルタリング状態でのアイデアを取得
      const filteredIdeas = draft.filter((idea) =>
        activeCategory === "general" ? true : idea.category === activeCategory
      );

      // インデックスが有効かチェック
      if (
        fromIndex < 0 ||
        fromIndex >= filteredIdeas.length ||
        toIndex < 0 ||
        toIndex >= filteredIdeas.length
      ) {
        return;
      }

      if (activeCategory === "general") {
        // generalカテゴリの場合、全体の並び順を変更
        const [movedIdea] = draft.splice(fromIndex, 1);
        draft.splice(toIndex, 0, movedIdea);
      } else {
        // 特定カテゴリの場合
        const movedIdea = filteredIdeas[fromIndex];

        // 元の配列から移動するアイデアを削除
        const originalFromIndex = draft.findIndex(
          (idea) => idea.id === movedIdea.id
        );
        if (originalFromIndex === -1) return;

        draft.splice(originalFromIndex, 1);

        // 割り込む位置を計算
        let insertIndex = 0;
        if (toIndex > 0) {
          const targetIdea = filteredIdeas[toIndex];
          const targetOriginalIndex = draft.findIndex(
            (idea) => idea.id === targetIdea.id
          );
          insertIndex = targetOriginalIndex + (fromIndex < toIndex ? 1 : 0);
        } else {
          // 先頭に挿入する場合、同じカテゴリの最初のアイデアの前に挿入
          const firstCategoryIndex = draft.findIndex(
            (idea) => idea.category === activeCategory
          );
          insertIndex =
            firstCategoryIndex !== -1 ? firstCategoryIndex : draft.length;
        }

        // 新しい位置に挿入
        draft.splice(insertIndex, 0, movedIdea);
      }
    });
  };

  /**
   * 指定されたカテゴリでアイデアをフィルタリングする
   */
  const getFilteredIdeas = (activeCategory: string): Idea[] => {
    return ideas.filter((idea) =>
      activeCategory === "general" ? true : idea.category === activeCategory
    );
  };

  return {
    ideas,
    newIdeaText,
    setNewIdeaText,
    draggedIdea,
    setDraggedIdea,
    addIdea,
    deleteIdea,
    updateIdeaCategory,
    moveIdea,
    getFilteredIdeas,
  };
}
