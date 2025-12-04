import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/courses')
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        Chargement...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '30px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <h1>Liste des Cours</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '30px',
        }}
      >
        {courses.map((course) => (
          <div
            key={course._id}
            style={{
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            <h3>{course.title}</h3>
            <p style={{ color: '#666', marginTop: '10px' }}>
              {course.description.substring(0, 100)}...
            </p>
            <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
              Instructeur : {course.instructor}
            </p>
            <p style={{ color: '#3498db' }}>
              {course.students.length} étudiants inscrits
            </p>

            <Link
              to={`/courses/${course._id}`}
              style={{
                display: 'inline-block',
                marginTop: '15px',
                padding: '10px 20px',
                backgroundColor: '#3498db',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
              }}
            >
              Voir détails
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
