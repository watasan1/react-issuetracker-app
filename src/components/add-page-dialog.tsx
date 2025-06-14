import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePageContext } from "@/contexts/page-context";

export function AddPageDialog() {
  const {
    newPageTitle,
    setNewPageTitle,
    newPageEmoji,
    setNewPageEmoji,
    isAddPageDialogOpen,
    setIsAddPageDialogOpen,
    addPage,
  } = usePageContext();

  const handleAddPage = () => {
    addPage(newPageTitle, newPageEmoji);
  };

  /**
   * Enterキーでのページ作成を可能にする
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddPage();
    }
  };

  return (
    <Dialog open={isAddPageDialogOpen} onOpenChange={setIsAddPageDialogOpen}>
      <DialogContent className="sm:max-w-md bg-white/95 border-stone-200">
        <DialogHeader>
          <DialogTitle className="text-stone-800">
            新しいページを作成
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              ページタイトル
            </label>
            <Input
              placeholder="ページタイトル"
              value={newPageTitle}
              onChange={(e) => setNewPageTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-stone-200 focus:border-stone-500 focus:ring-stone-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              絵文字
            </label>
            <Input
              placeholder="📝"
              value={newPageEmoji}
              onChange={(e) => setNewPageEmoji(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-stone-200 focus:border-stone-500 focus:ring-stone-500 text-2xl text-center"
              maxLength={2}
            />
            <p className="text-xs text-stone-500 mt-1">
              ページを表す絵文字を入力してください。空白の場合、📝が使用されます。
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsAddPageDialogOpen(false)}
              className="border-stone-200 text-stone-700 hover:bg-stone-100"
            >
              キャンセル
            </Button>
            <Button
              onClick={handleAddPage}
              disabled={!newPageTitle.trim()}
              className="bg-stone-600 hover:bg-stone-700 text-white"
            >
              ページを作成
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
