function StudentList({ students, onEdit, onDelete }) {
  return (
    <section className="card">
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Major</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty">
                  No students found
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.major}</td>
                  <td className="actions">
                    <button className="btn btn--small" onClick={() => onEdit(student)}>
                      Edit
                    </button>
                    <button className="btn btn--small btn--danger" onClick={() => onDelete(student.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default StudentList
