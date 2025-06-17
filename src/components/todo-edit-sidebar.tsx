import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { X, Calendar, MoreHorizontal } from 'lucide-react';
import { usePageContext } from '@/contexts/page-context';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useTodoStore } from '@/stores/todo-store';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function TodoEditSidebar() {
  const { pages } = usePageContext();
  const {
    sidebarOpen,
    editingTodo,
    closeTodoSidebar,
    setEditingTodo,
    saveTodoChanges,
  } = useTodoStore();

  // サイドバーが閉じているか、編集中のTodoがない場合は何も表示しない
  if (!sidebarOpen || !editingTodo) {
    return null;
  }

  /**
   * フォームフィールドの変更ハンドラー群
   */
  const handleTitleChange = (title: string) => {
    setEditingTodo({ ...editingTodo, title });
  };

  const handleDescriptionChange = (description: string) => {
    setEditingTodo({ ...editingTodo, description });
  };

  const handleCompletedChange = (completed: boolean) => {
    setEditingTodo({ ...editingTodo, completed });
  };

  const handleCategoryChange = (category: string) => {
    setEditingTodo({ ...editingTodo, category });
  };

  return (
    <div className="fixed right-0 top-0 w-96 h-screen bg-white/95 backdrop-blur-sm border-l border-stone-200 shadow-lg z-10 transform transition-transform duration-300">
      <div className="p-6 h-full flex flex-col">
        {/* サイドバーヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-stone-800">Todoを編集</h3>
          <button
            onClick={closeTodoSidebar}
            className="p-1 rounded-md text-stone-400 hover:text-stone-600 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* フォームフィールド群 */}
        <div className="space-y-6 flex-1 flex flex-col">
          {/* タイトル編集 */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              タイトル
            </label>
            <Input
              value={editingTodo.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Todoタイトル"
              className="border-stone-200 focus:border-stone-500 focus:ring-stone-500"
            />
          </div>

          {/* カテゴリ（ページ）選択 */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              カテゴリ
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between border-stone-200 hover:bg-stone-50"
                >
                  <div className="flex items-center space-x-2">
                    <span>
                      {pages.find((p) => p.category === editingTodo.category)
                        ?.emoji || '📝'}
                    </span>
                    <span>
                      {pages.find((p) => p.category === editingTodo.category)
                        ?.title || '不明なカテゴリ'}
                    </span>
                  </div>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full bg-white/95 border-stone-200">
                {pages.map((page) => (
                  <DropdownMenuItem
                    key={page.id}
                    onClick={() => handleCategoryChange(page.category)}
                    className="flex items-center space-x-2"
                  >
                    <span>{page.emoji}</span>
                    <span>{page.title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* 完了状態スイッチ */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-stone-700">完了</label>
            <Switch
              checked={editingTodo.completed}
              onCheckedChange={handleCompletedChange}
              className="data-[state=checked]:bg-emerald-600"
            />
          </div>

          {/* メタデータ表示 */}
          <div className="space-y-3 text-sm text-stone-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              作成日: {editingTodo.createdAt.toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              更新日: {editingTodo.updatedAt.toLocaleDateString()}
            </div>
          </div>

          <Separator className="my-4" />

          {/* 説明文編集エリア */}
          <div className="flex-1 flex flex-col pb-3">
            <div className="flex-1 rounded-lg">
              <Textarea
                value={editingTodo.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="ここに説明を追加..."
                className="border-0 bg-transparent focus:ring-0 focus:border-0 resize-none w-full h-full min-h-[12rem] p-0 text-stone-800 placeholder:text-stone-400"
              />
            </div>
          </div>
        </div>

        {/* アクションボタン群 */}
        <div className="flex space-x-3 pt-6 border-t border-stone-200">
          <Button
            onClick={saveTodoChanges}
            className="flex-1 bg-stone-600 hover:bg-stone-700 text-white"
          >
            変更を保存
          </Button>
          <Button
            variant="outline"
            onClick={closeTodoSidebar}
            className="flex-1 border-stone-200 text-stone-700 hover:bg-stone-100"
          >
            キャンセル
          </Button>
        </div>
      </div>
    </div>
  );
}
