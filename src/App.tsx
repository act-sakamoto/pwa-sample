import { useState } from 'react';

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
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <select
        defaultValue="all"
        onChange={(e) => setFilter(e.target.value as Filter)}
      >
          <option value="all">すべてのタスク</option>
          <option value="checked">完了したタスク</option>
          <option value="unchecked">現在のタスク</option>
          <option value="removed">削除済みのタスク</option>
      </select>
      {filter === 'removed' ? (
        <button onClick={() => handleOnEmpty()}>
          ゴミ箱を空にする
        </button>
      ) : (
        <form
          onSubmit={(e) => handleOnSubmit()}
        >
          <input 
            type="text"
            value={text}
            disabled={filter === 'checked'}
            onChange={(e) => handleOnChange(e)}
          />
          <input
            type="submit"
            value="追加"
            disabled={filter === 'checked'}
            onSubmit={(e) => handleOnSubmit()}
          />
        </form>
      )}
      <ul>
        {
          filteredTodos.map((todo) => {
            return (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  disabled={todo.removed}
                  checked={todo.checked}
                  onChange={(e) => handleOnCheck(todo.id, todo.checked)}
                />
                <input
                  type="text"
                  disabled={todo.checked || todo.removed}
                  value={todo.value}
                  onChange={(e) => handleOnEdit(todo.id, e.target.value)}
                />
                <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
                  {todo.removed ? '復元' : '削除'}
                </button>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React!
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
