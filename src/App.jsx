import { useEffect, useMemo, useReducer, useState } from 'react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { studentReducer } from './reducer/studentReducer'
import StudentForm from './components/StudentForm'
import StudentFilters from './components/StudentFilters'
import StudentList from './components/StudentList'
import StudentStats from './components/StudentStats'
import './App.css'

const STORAGE_KEY = 'students'

function App() {
  const [students, dispatch] = useReducer(studentReducer, [], () => {
    const savedStudents = localStorage.getItem(STORAGE_KEY)
    return savedStudents ? JSON.parse(savedStudents) : []
  })
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [major, setMajor] = useState('information technology')
  const [search, setSearch] = useState('')
  const [filterMajor, setFilterMajor] = useState('All Majors')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students))
  }, [students])

  const filteredStudents = useMemo(() => {
    const keyword = search.toLowerCase().trim()

    return students.filter((student) => {
      const matchName = student.name.toLowerCase().includes(keyword)
      const matchMajor = filterMajor === 'All Majors' || student.major === filterMajor
      return matchName && matchMajor
    })
  }, [students, search, filterMajor])

  const resetForm = () => {
    setName('')
    setAge('')
    setMajor('information technology')
    setEditingId(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim() || !age.trim()) return

    if (editingId) {
      dispatch({
        type: 'UPDATE_STUDENT',
        payload: { id: editingId, name, age, major },
      })
    } else {
      const newId = `SV${Date.now()}`
      dispatch({
        type: 'ADD_STUDENT',
        payload: { id: newId, name, age, major },
      })
    }

    resetForm()
  }

  const handleEdit = (student) => {
    setEditingId(student.id)
    setName(student.name)
    setAge(student.age)
    setMajor(student.major)
  }

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_STUDENT', payload: id })
    if (editingId === id) resetForm()
  }

  return (
    <ThemeProvider>
      <AppContent
        students={students}
        name={name}
        setName={setName}
        age={age}
        setAge={setAge}
        major={major}
        setMajor={setMajor}
        search={search}
        setSearch={setSearch}
        filterMajor={filterMajor}
        setFilterMajor={setFilterMajor}
        editingId={editingId}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        filteredStudents={filteredStudents}
      />
    </ThemeProvider>
  )
}

function AppContent({
  students,
  name,
  setName,
  age,
  setAge,
  major,
  setMajor,
  search,
  setSearch,
  filterMajor,
  setFilterMajor,
  editingId,
  handleSubmit,
  resetForm,
  handleEdit,
  handleDelete,
  filteredStudents,
}) {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="app">
      <header className="app__header">
        <button type="button" className="btn btn--ghost app__theme-btn" onClick={toggleTheme}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
        <div className="app__title">
          <h1>Student Management</h1>
        </div>
      </header>

      <StudentForm
        name={name}
        setName={setName}
        age={age}
        setAge={setAge}
        major={major}
        setMajor={setMajor}
        editingId={editingId}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      <StudentFilters
        search={search}
        setSearch={setSearch}
        filterMajor={filterMajor}
        setFilterMajor={setFilterMajor}
      />

      <StudentStats total={students.length} />

      <StudentList students={filteredStudents} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}

export default App
