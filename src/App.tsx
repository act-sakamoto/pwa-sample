import { useState } from 'react';
import { FormDialog } from './FormDialog';
import { TodoItem } from './TodoItem';
import { ToolBar } from './ToolBar';
import { SideBar } from './SideBar';
import { QR } from './QR';
import { AlertDialog } from './AlertDialog';
import { ActionButton } from './ActionButton';
import GlobalStyles from '@mui/material/GlobalStyles';

type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

type Todo = {
  value: string;
  id: number;
  checked: boolean;
  removed: boolean;
}

export const App = () => {

  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleOnSort = (filter: Filter) => {
    setFilter(filter);
  };

  const onQROpen = () => setQrOpen(true);
  const onQRClose = () => setQrOpen(false);

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
    // フォームへの入力をクリア
    setText('');
  };

  const toggleAlert = () => setAlertOpen(!alertOpen);

  const handleOnSubmit = () => {
    if(!text) return;
  
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    }

    setTodos([newTodo, ...todos]);
    setText('');

    // FormDialog コンポーネントを閉じる
    setDialogOpen(false);
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  
  const handleOnEdit = (id: number, value:string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }

      return todo;
    });

    setTodos(newTodos);
  }

  const handleOnCheck = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }

      return todo;
    });

    setTodos(newTodos);
  }

  const handleOnRemove = (id: number, removed: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }

      return todo;
    });

    setTodos(newTodos);
  }

  const handleOnEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed);
    setTodos(newTodos);
  }

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return !todo.removed;
      case 'checked':
        return todo.checked && !todo.removed;
      case 'unchecked':
        return !todo.checked && !todo.removed;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }

  });

  return (
    <div>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ToolBar filter={filter} toggleDrawer={toggleDrawer}/>
      <SideBar
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        onSort={handleOnSort}
        onOpen={onQROpen}
      />
      <FormDialog
        text={text}
        dialogOpen={dialogOpen}
        toggleDialog={toggleDialog}
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
      />
      <AlertDialog
        alertOpen={alertOpen}
        onEmpty={handleOnEmpty}
        toggleAlert={toggleAlert}
      />
      <QR open={qrOpen} onClose={onQRClose} />
      {filteredTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              filter={filter}
              onCheck={handleOnCheck}
              onEdit={handleOnEdit}
              onRemove={handleOnRemove}
            />
          );
        })}
        <ActionButton
          todos={todos}
          filter={filter}
          alertOpen={alertOpen}
          dialogOpen={dialogOpen}
          toggleAlert={toggleAlert}
          toggleDialog={toggleDialog}
        />
    </div>
  );
};
