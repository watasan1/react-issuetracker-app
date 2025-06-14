import { PageProvider, usePageContext } from "@/contexts/page-context";
import { PageSidebar } from "@/components/page-sidebar";
import { AddPageDialog } from "@/components/add-page-dialog";
import { IdeaBlocks } from "@/components/idea-blocks";

function NotionTodoAppInner() {
  const { activePage } = usePageContext();

  return (
    <div className="min-h-screen bg-[#f0edd8] flex">
      {/* 左サイドバー - ページナビゲーション */}
      <PageSidebar />

      {/* メインコンテンツエリア */}
      <div className="flex-1 flex flex-col ml-64 transition-all duration-300 pr-6">
        {/* トップヘッダー */}
        <div className="backdrop-blur-sm px-6 pt-12 pb-6 space-y-6">
          <div className="text-7xl text-stone-500">{activePage.emoji}</div>
          <h1 className="text-4xl font-bold text-stone-800">
            {activePage.title}
          </h1>
        </div>

        {/* スクロール可能なコンテンツエリア */}
        <div className="flex-1 overflow-auto">
          {/* アイデアブロックセクション */}
          <IdeaBlocks />
        </div>
      </div>

      {/* モーダルダイアログ群 */}
      <AddPageDialog />
    </div>
  );
}

/**
 * アプリケーションのエントリーポイント
 */
export default function NotionTodoApp() {
  return (
    <PageProvider>
      <NotionTodoAppInner />
    </PageProvider>
  );
}
