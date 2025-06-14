import { Plus, X } from "lucide-react";
import { usePageContext } from "@/contexts/page-context";

export function PageSidebar() {
  const { pages, setActivePage, deletePage, setIsAddPageDialogOpen } =
    usePageContext();

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#f0edd8] backdrop-blur-sm border-r border-stone-200 flex flex-col shadow-sm z-20">
      {/* サイドバーヘッダー */}
      <div className="p-4 border-b border-stone-200">
        <h1 className="text-xl font-bold text-stone-800">My Issue Tracker</h1>
      </div>

      {/* スクロール可能なページ一覧エリア */}
      <div className="flex-1 overflow-auto">
        <div className="px-3 py-4">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3 px-2">
            ページ
          </h2>
          <div className="space-y-1">
            {pages.map((page) => (
              <div key={page.id} className="group flex items-center">
                {/* ページ選択ボタン */}
                <button
                  onClick={() => setActivePage(page.id)}
                  className={`flex-1 flex items-center px-2 py-2 text-sm rounded-md transition-colors ${
                    page.isActive
                      ? "bg-stone-400/20 text-stone-800 font-medium shadow-sm"
                      : "text-stone-700 hover:bg-stone-400/20 hover:text-stone-800"
                  }`}
                >
                  <span className="mr-3 text-base">{page.emoji}</span>
                  <span className="truncate">{page.title}</span>
                </button>

                {/* ページ削除ボタン - 最後の1ページは削除不可 */}
                {pages.length > 1 && (
                  <button
                    onClick={() => deletePage(page.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-stone-400 hover:text-red-600 hover:bg-red-50 transition-all"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}

            {/* ページ追加ボタン */}
            <button
              onClick={() => setIsAddPageDialogOpen(true)}
              className="w-full flex items-center px-2 py-2 text-sm text-stone-500 hover:text-stone-900 hover:bg-stone-400/20 rounded-md transition-colors"
            >
              <Plus className="w-4 h-4 mr-3" />
              <span>新しいページ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
