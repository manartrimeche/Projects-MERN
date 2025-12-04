import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Charger le cours
    api
      .get(`/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error(err));

    // Charger les reviews
    api
      .get(`/courses/${id}/reviews`)
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await api.post(`/courses/${id}/enroll`);
      alert('Inscription réussie !');
    } catch (err) {
      alert("Erreur lors de l'inscription");
    }
  };

  if (loading || !course) {
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
        maxWidth: '900px',
        margin: '0 auto',
      }}
    >
      <h1>{course.title}</h1>
      <p
        style={{
          fontSize: '18px',
          color: '#666',
          marginTop: '15px',
        }}
      >
        {course.description}
      </p>

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '10px',
        }}
      >
        <p>
          <strong>Instructeur :</strong> {course.instructor}
        </p>
        <p>
          <strong>Étudiants inscrits :</strong> {course.students.length}
        </p>
      </div>

      <button
        onClick={handleEnroll}
        style={{
          marginTop: '20px',
          padding: '15px 30px',
          backgroundColor: '#27ae60',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        S’inscrire au cours
      </button>

      <h2 style={{ marginTop: '40px' }}>Avis des étudiants</h2>

      {reviews.length === 0 ? (
        <p style={{ color: '#999' }}>Aucun avis pour le moment</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            style={{
              padding: '15px',
              marginTop: '15px',
              backgroundColor: 'white',
              borderRadius: '5px',
              border: '1px solid #ddd',
            }}
          >
            <div
              style={{
                color: '#f39c12',
                fontSize: '20px',
              }}
            >
              {'★'.repeat(review.rating)}
            </div>
            <p style={{ marginTop: '10px' }}>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CourseDetails;
