function StudentForm({
  name,
  setName,
  age,
  setAge,
  major,
  setMajor,
  editingId,
  onSubmit,
  onCancel,
}) {
  return (
    <section className="card">
      <div className="card__header">
        <h2>{editingId ? 'Edit Student' : 'Add Student'}</h2>
      </div>

      <form className="form" onSubmit={onSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input"
          type="number"
          placeholder="Student age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <select className="input" value={major} onChange={(e) => setMajor(e.target.value)}>
          <option value="information technology">Information Technology</option>
          <option value="Business administration">Business Administration</option>
          <option value="Marketing">Marketing</option>
          <option value="Software Engineering">Software Engineering</option>
        </select>

        <div className="form__actions">
          <button type="submit" className="btn btn--primary">
            {editingId ? 'Save Changes' : 'Add Student'}
          </button>
          {editingId && (
            <button type="button" className="btn" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  )
}

export default StudentForm
