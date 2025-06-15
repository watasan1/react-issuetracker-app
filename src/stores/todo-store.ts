/**
 * TODO管理ストア
 * このモジュールは Zustand を使用してTODO機能の状態管理を行います。
 * TODOの作成、更新、削除とサイドバーでの詳細表示機能を管理します。
 */
import { create } from "zustand";
import type { Todo } from "@/types";
import { INITIAL_TODOS } from "@/constants/initial-data";

interface TodoState {
  // TODOデータ
  todos: Todo[];

  // サイドバーとフォーム関連のUI状態
  newTodoTitle: string;
  sidebarOpen: boolean;
  selectedTodo: Todo | null;
  editingTodo: Todo | null;

  // TODO操作メソッド
  addTodo: (title: string, category: string) => void;
  toggleTodoStatus: (todoId: string) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (todoId: string) => void;

  // UI操作メソッド
  setNewTodoTitle: (title: string) => void;
  openTodoSidebar: (todo: Todo) => void;
  closeTodoSidebar: () => void;
  setEditingTodo: (todo: Todo | null) => void;
  saveTodoChanges: () => void;

  // フィルタリング機能
  getFilteredTodos: (activeCategory: string) => Todo[];
}

export const useTodoStore = create<TodoState>((set, get) => ({
  // 初期状態
  todos: INITIAL_TODOS,
  newTodoTitle: "",
  sidebarOpen: false,
  selectedTodo: null,
  editingTodo: null,

  /**
   * 新しいTODOを追加する
   * @param title TODOのタイトル
   * @param category TODOのカテゴリ
   */
  addTodo: (title: string, category: string) => {
    if (title.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: title.trim(),
        description: "",
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        category,
      };

      set((state) => ({
        todos: [...state.todos, newTodo],
        newTodoTitle: "",
      }));
    }
  },

  /**
   * TODOの完了状態をトグルする
   * @param todoId 完了状態を変更するTODOのID
   */
  toggleTodoStatus: (todoId: string) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === todoId
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      ),
    }));
  },

  /**
   * TODOを更新する
   * @param updatedTodo 更新されたTODOデータ
   */
  updateTodo: (updatedTodo: Todo) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === updatedTodo.id
          ? { ...updatedTodo, updatedAt: new Date() }
          : todo
      ),
    }));
  },

  /**
   * TODOを削除する
   */
  deleteTodo: (todoId: string) => {
    const { selectedTodo } = get();

    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== todoId),
      // 削除されたTODOがサイドバーで表示中の場合、サイドバーを閉じる
      ...(selectedTodo?.id === todoId && {
        sidebarOpen: false,
        selectedTodo: null,
        editingTodo: null,
      }),
    }));
  },

  /**
   * 新しいTODOのタイトルを設定する
   * @param title 新しいTODOのタイトル
   */
  setNewTodoTitle: (title: string) => {
    set({ newTodoTitle: title });
  },

  /**
   * TODOサイドバーを開く
   * @param todo サイドバーで表示するTODOデータ
   */
  openTodoSidebar: (todo: Todo) => {
    set({
      selectedTodo: todo,
      editingTodo: { ...todo }, // 編集用のコピーを作成
      sidebarOpen: true,
    });
  },

  /**
   * TODOサイドバーを閉じる
   * 選択中のTODOと編集中のTODOをリセットします。
   */
  closeTodoSidebar: () => {
    set({
      sidebarOpen: false,
      selectedTodo: null,
      editingTodo: null,
    });
  },

  /**
   * 編集中のTODOを設定する
   * @param todo 編集するTODOデータ。nullの場合は編集モードを解除します。
   */
  setEditingTodo: (todo: Todo | null) => {
    set({ editingTodo: todo });
  },

  /**
   * 編集中のTODOの変更を保存する
   * 編集中のTODOが存在する場合、更新処理を行いサイドバーを閉じます。
   */
  saveTodoChanges: () => {
    const { editingTodo, updateTodo } = get();

    if (editingTodo) {
      updateTodo(editingTodo);
      set({
        sidebarOpen: false,
        selectedTodo: null,
        editingTodo: null,
      });
    }
  },

  /**
   * アクティブなカテゴリに基づいてTODOをフィルタリングする
   * @param activeCategory 現在選択されているカテゴリ
   * @returns フィルタリングされたTODOのリスト
   */
  getFilteredTodos: (activeCategory: string) => {
    const { todos } = get();
    return todos.filter((todo) =>
      activeCategory === "general" ? true : todo.category === activeCategory
    );
  },
}));
