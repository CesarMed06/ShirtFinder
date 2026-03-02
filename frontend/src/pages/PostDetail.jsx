import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${postId}`)
      .then(r => r.json())
      .then(data => { if (data.success) setPost(data.data); });
  }, [postId]);

  if (!post) return <div className="forum-empty" style={{ padding: '60px', textAlign: 'center' }}>Cargando...</div>;

  return (
    <div className="post-detail-container">
      <button className="forum-sort-btn" style={{ marginBottom: '24px' }} onClick={() => navigate('/foro')}>
        ← Volver al foro
      </button>
      <h1 className="forum-title" style={{ marginBottom: '8px' }}>{post.title}</h1>
      <p style={{ color: '#9C9C9C', marginBottom: '24px', fontWeight: 700 }}>
        Por {post.username} · {new Date(post.created_at).toLocaleDateString('es-ES')}
      </p>
      <div className="post-detail-content">{post.content}</div>
    </div>
  );
}

export default PostDetail;
