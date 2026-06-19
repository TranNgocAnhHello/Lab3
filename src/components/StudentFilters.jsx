const majors = [
  'All Majors',
  'Information Technology',
  'Business Administration',
  'Marketing',
  'Software Engineering',
]

function StudentFilters({ search, setSearch, filterMajor, setFilterMajor }) {
  return (
    <section className="card">
      <div className="filters">
        <input
          className="input"
          type="text"
          placeholder="Search student by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="input"
          value={filterMajor}
          onChange={(e) => setFilterMajor(e.target.value)}
        >
          {majors.map((major) => (
            <option key={major} value={major}>
              {major}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}

export default StudentFilters
