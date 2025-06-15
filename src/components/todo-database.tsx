import { Plus, Trash2, Edit3, Check, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTodoStore } from "@/stores/todo-store";
import { usePageContext } from "@/contexts/page-context";

export function TodoDatabase() {
  const { activePage } = usePageContext();
  const {
    newTodoTitle,
    setNewTodoTitle,
    addTodo,
    toggleTodoStatus,
    deleteTodo,
    openTodoSidebar,
    getFilteredTodos,
  } = useTodoStore();

  // 現在のアクティブページに属するTodoのみを表示
  const filteredTodos = getFilteredTodos(activePage.category);

  const handleAddTodo = () => {
    addTodo(newTodoTitle, activePage.category);
  };

  /**
   * Enterキーでの新規Todo追加を可能にする
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className="p-6 backdrop-blur-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-stone-800 mb-4 flex items-center">
          <Check className="w-5 h-5 mr-2 text-emerald-600" />
          Todo データベース
        </h2>

        {/* Todo追加入力フィールド */}
        <div className="flex space-x-2 mb-6 w-1/2">
          <Input
            placeholder="新しいTodoを追加..."
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-stone-400/20 border-stone-200 focus:border-stone-500 focus:ring-stone-500"
          />
          <Button
            onClick={handleAddTodo}
            size="sm"
            disabled={!newTodoTitle.trim()}
            className="bg-stone-600 hover:bg-stone-700 text-white"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Todoテーブル表示 */}
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12 text-stone-500">
            <Check className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>まだTodoがありません。上記から最初のTodoを追加してください！</p>
          </div>
        ) : (
          <div className="border border-stone-200 rounded-lg overflow-hidden bg-white/80">
            <Table>
              <TableHeader>
                <TableRow className="bg-stone-400/10">
                  <TableHead className="w-12">ステータス</TableHead>
                  <TableHead>タイトル</TableHead>
                  <TableHead className="w-32">作成日</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTodos.map((todo) => (
                  <TableRow
                    key={todo.id}
                    className="hover:bg-stone-400/20 cursor-pointer transition-colors"
                    onClick={() => openTodoSidebar(todo)}
                  >
                    {/* 完了状態切り替えスイッチ */}
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Switch
                        checked={todo.completed}
                        onCheckedChange={() => toggleTodoStatus(todo.id)}
                        className="data-[state=checked]:bg-emerald-600 ml-2"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div>
                          <p
                            className={`font-medium ${
                              todo.completed
                                ? "line-through text-stone-500"
                                : "text-stone-800"
                            }`}
                          >
                            {todo.title}
                          </p>
                          {todo.description && (
                            <p className="text-sm text-stone-500 mt-1 truncate max-w-md">
                              {todo.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-stone-500">
                      {todo.createdAt.toLocaleDateString()}
                    </TableCell>
                    {/* アクションメニュー */}
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-stone-500 hover:text-stone-700"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-white/95 border-stone-200"
                        >
                          <DropdownMenuItem
                            onClick={() => openTodoSidebar(todo)}
                          >
                            <Edit3 className="w-4 h-4 mr-2" />
                            編集
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => deleteTodo(todo.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            削除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
