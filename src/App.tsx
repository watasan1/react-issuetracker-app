import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function App() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">shadcn/ui コンポーネント確認</h1>

      <Button>ボタン</Button>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label htmlFor="terms">チェックボックス</label>
      </div>

      <Input placeholder="入力フィールド" />

      <Textarea placeholder="テキストエリア" />

      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <label htmlFor="airplane-mode">スイッチ</label>
      </div>

      <Separator />

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">ダイアログを開く</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ダイアログ</DialogTitle>
            <DialogDescription>これはダイアログの例です。</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">ドロップダウン</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>項目1</DropdownMenuItem>
          <DropdownMenuItem>項目2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>列1</TableHead>
            <TableHead>列2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>データ1</TableCell>
            <TableCell>データ2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default App;
