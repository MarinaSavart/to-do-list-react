import { useState } from "react"
import { nanoid } from "nanoid"
import ListItems from "./components/ListItems";

function App() {
  const [todoList, setTodoList] = useState([
    {
      id: nanoid(8),
      content: "Item 1"
    },
    {
      id: nanoid(8),
      content: "Item 2"
    },
  ])

  const [todo, setTodo] = useState("")
  const [showValidation, setShowValidation] = useState(false)

  function deleteTodo(id) {
    setTodoList(todoList.filter(todo => todo.id !== id))
  }

  function handleSubmit(e){
    e.preventDefault()

    if (todo === "") {
      setShowValidation(true)
      return
    }
    setTodoList([...todoList, {id:nanoid(8), content: todo}])
    setTodo("")
    setShowValidation(false)
  }

  return (
    <div className="h-screen bg-slate-900">
      <div className="max-w-4xl mx-auto pt-20 px-6">
        <h1 className="text-3xl text-slate-100 mb-4">La to do list</h1>

        <form onSubmit={handleSubmit} className="mb-10">
          <label className="text-slate-50" htmlFor="todo-list">Ajouter une chose à faire</label>
          <input type="text" className="mt-1 block w-full rounded" value={todo} onChange={e => setTodo(e.target.value)}/>
          { showValidation && (
            <p className="text-red-400">Ajouter du contenu</p>
          )}
          <button className="mt-4 p-2 bg-slate-50 rounded min-w-[115px]">Ajouter</button>
        </form>

        <ul>
          {todoList.length === 0 && (
            <li className="text-slate-50 text-md">Pas d'items ...</li>
          )}
          {todoList.length > 0 &&
            todoList.map(item => (
              <ListItems key={item.id} itemData={item} deleteTodo={deleteTodo} />
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default App
