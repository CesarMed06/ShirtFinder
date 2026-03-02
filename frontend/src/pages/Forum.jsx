import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

const CATEGORIES = [
    "Camisetas históricas",
    "Nuevos lanzamientos",
    "Off-topic",
    "Camisetas retro",
];

const SORT_FIELDS = [
    { key: 'date', label: 'Fecha de creación' },
    { key: 'comments', label: 'Comentarios' },
    { key: 'replies', label: 'Respuestas' },
];

function Forum() {
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState("");
    const [orderBy, setOrderBy] = useState("date");
    const [direction, setDirection] = useState("desc");
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams();
        if (category) params.append("category", category);
        params.append("orderBy", orderBy);
        params.append("direction", direction);

        fetch(`http://localhost:5000/api/posts?${params}`)
            .then((r) => r.json())
            .then((data) => {
                if (data.success) setPosts(data.data);
            })
            .catch(() => { });
    }, [category, orderBy, direction]);

    const handleCategoryClick = (cat) => {
        setCategory((prev) => (prev === cat ? "" : cat));
    };

    const handleSort = (key) => {
        if (orderBy === key) {
            setDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'));
        } else {
            setOrderBy(key);
            setDirection('desc');
        }
    };

    const handleCreatePost = () => {
        const token = localStorage.getItem("token");
        navigate(token ? "/foro/crear" : "/login");
    };

    return (
        <div className="forum-layout">
            <aside className="forum-sidebar">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        className={`forum-cat-btn${category === cat ? " active" : ""}`}
                        onClick={() => handleCategoryClick(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </aside>

            <section className="forum-main">
                <h1 className="forum-title">Foro ShirtFinder</h1>
                <button className="forum-create-btn" onClick={handleCreatePost}>
                    CREAR POST
                </button>
                <div className="forum-posts">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                    {posts.length === 0 && (
                        <p className="forum-empty">
                            {category
                                ? `No hay posts en "${category}" todavía.`
                                : 'No hay posts publicados aún. ¡Sé el primero!'}
                        </p>
                    )}
                </div>
            </section>

            <aside className="forum-sort">
                <h2 className="forum-sort-title">Ordenar por:</h2>
                {SORT_FIELDS.map(({ key, label }) => (
                    <button
                        key={key}
                        className={`forum-sort-btn${orderBy === key ? ' active' : ''}`}
                        onClick={() => handleSort(key)}
                    >
                        {label} ({orderBy === key ? (direction === 'desc' ? 'desc.' : 'asc.') : 'desc.'})
                    </button>
                ))}
            </aside>
        </div>
    );
}

export default Forum;
