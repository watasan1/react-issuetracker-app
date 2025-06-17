import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, Trash2, GripVertical, FileText } from 'lucide-react';
import { usePageContext } from '@/contexts/page-context';
import { useIdeasImmer } from '@/hooks/use-ideas-immer';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function IdeaBlocks() {
  const { pages, activePage } = usePageContext();
  const {
    newIdeaText,
    setNewIdeaText,
    draggedIdea,
    setDraggedIdea,
    addIdea,
    deleteIdea,
    updateIdeaCategory,
    moveIdea,
    getFilteredIdeas,
  } = useIdeasImmer();

  // 現在のアクティブページに属するアイデアのみを表示
  const filteredIdeas = getFilteredIdeas(activePage.category);

  const handleAddIdea = () => {
    addIdea(newIdeaText, activePage.category);
  };

  /**
   * Enterキーでのアイデア追加を可能にする
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddIdea();
    }
  };

  /**
   * ドラッグ開始時の処理
   */
  const handleDragStart = (ideaId: string) => {
    setDraggedIdea(ideaId);
  };

  /**
   * ドラッグオーバー時の処理
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  /**
   * ドロップ時の処理
   */
  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIdea) {
      const fromIndex = filteredIdeas.findIndex((i) => i.id === draggedIdea);
      moveIdea(fromIndex, dropIndex, activePage.category);
      setDraggedIdea(null);
    }
  };

  return (
    <div className="p-6 backdrop-blur-sm border-b border-stone-200">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-stone-800 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-amber-600" />
          アイデアブロック
        </h2>

        {/* アイデア追加入力フィールド */}
        <div className="flex space-x-2 mb-4 w-1/2">
          <Input
            placeholder="新しいアイデアを追加..."
            value={newIdeaText}
            onChange={(e) => setNewIdeaText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-stone-400/20 border-stone-200 focus:border-stone-500 focus:ring-stone-500"
          />
          <Button
            onClick={handleAddIdea}
            size="sm"
            disabled={!newIdeaText.trim()}
            className="bg-stone-600 hover:bg-stone-700 text-white"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* アイデア一覧表示 */}
        <div className="space-y-3">
          {filteredIdeas.length === 0 ? (
            <div className="text-center py-8 text-stone-500">
              <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>
                まだアイデアがありません。上記から最初のアイデアを追加してください！
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredIdeas.map((idea, index) => (
                <div
                  key={idea.id}
                  className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-stone-400/20 transition-colors duration-200 cursor-move"
                  draggable
                  onDragStart={() => handleDragStart(idea.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  {/* ドラッグハンドル */}
                  <GripVertical className="w-4 h-4 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  <Checkbox className="flex-shrink-0 outline-none min-h-[1.2rem] min-w-[1.2rem] border-stone-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-stone-800 leading-relaxed break-words">
                      {idea.text}
                    </p>
                  </div>
                  {/* アクション群 */}
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                    {/* ページ移動ドロップダウン */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs text-stone-500 hover:text-stone-700"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {pages.find((p) => p.category === idea.category)
                            ?.emoji || '📝'}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-white/95 border-stone-200"
                      >
                        {pages.map((page) => (
                          <DropdownMenuItem
                            key={page.id}
                            onClick={() =>
                              updateIdeaCategory(idea.id, page.category)
                            }
                            className="flex items-center space-x-2"
                          >
                            <span>{page.emoji}</span>
                            <span className="text-sm">{page.title}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <button
                      onClick={() => deleteIdea(idea.id)}
                      className="p-1 rounded-md text-stone-400 hover:text-red-600 hover:bg-red-50 transition-all flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
