import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import type { Page } from "@/types";
import { INITIAL_PAGES } from "@/constants/initial-data";

interface PageContextType {
  pages: Page[];
  activePage: Page;
  addPage: (title: string, emoji: string) => void;
  setActivePage: (pageId: string) => void;
  deletePage: (pageId: string) => void;
  // UI状態（新規ページ作成ダイアログ用）
  newPageTitle: string;
  setNewPageTitle: (title: string) => void;
  newPageEmoji: string;
  setNewPageEmoji: (emoji: string) => void;
  isAddPageDialogOpen: boolean;
  setIsAddPageDialogOpen: (open: boolean) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

interface PageProviderProps {
  children: ReactNode;
}

export function PageProvider({ children }: PageProviderProps) {
  const [pages, setPages] = useState<Page[]>(INITIAL_PAGES);
  const [newPageTitle, setNewPageTitle] = useState("");
  const [newPageEmoji, setNewPageEmoji] = useState("");
  const [isAddPageDialogOpen, setIsAddPageDialogOpen] = useState(false);

  // 現在アクティブなページを取得
  const activePage = pages.find((page) => page.isActive) || pages[0];

  /**
   * 新しいページを作成する
   */
  const addPage = (title: string, emoji: string) => {
    if (title.trim()) {
      const newPage: Page = {
        id: Date.now().toString(),
        title: title.trim(),
        isActive: false,
        category: `page_${Date.now()}`,
        emoji: emoji.trim() || "📝",
      };
      setPages((prev) => [...prev, newPage]);
      setNewPageTitle("");
      setNewPageEmoji("");
      setIsAddPageDialogOpen(false);
    }
  };

  /**
   * アクティブページを変更する
   */
  const setActivePage = (pageId: string) => {
    setPages((prev) =>
      prev.map((page) => ({
        ...page,
        isActive: page.id === pageId,
      }))
    );
  };

  /**
   * ページを削除する
   */
  const deletePage = (pageId: string) => {
    if (pages.length > 1) {
      const updatedPages = pages.filter((page) => page.id !== pageId);

      // 削除されるページがアクティブだった場合、最初のページをアクティブに
      if (pages.find((page) => page.id === pageId)?.isActive) {
        updatedPages[0] = { ...updatedPages[0], isActive: true };
      }

      setPages(updatedPages);
    }
  };

  const value: PageContextType = {
    pages,
    activePage,
    addPage,
    setActivePage,
    deletePage,
    newPageTitle,
    setNewPageTitle,
    newPageEmoji,
    setNewPageEmoji,
    isAddPageDialogOpen,
    setIsAddPageDialogOpen,
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

/**
 * PageContextにアクセスするためのカスタムフック
 */
// eslint-disable-next-line react-refresh/only-export-components
export function usePageContext() {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error("usePageContext must be used within a PageProvider");
  }
  return context;
}
