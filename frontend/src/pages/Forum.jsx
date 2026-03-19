import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PostCard from "../components/PostCard";

const CATEGORIES = [
    "Camisetas históricas",
    "Nuevos lanzamientos",
    "Off-topic",
    "Camisetas retro",
];

const SORT_FIELDS = [
    { key: 'date', label: 'Fecha de creación' },
    { key: 'replies', label: 'Respuestas' },
];

const POSTS_PER_PAGE = 10;

function Forum() {
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState("");
    const [orderBy, setOrderBy] = useState("date");
    const [direction, setDirection] = useState("desc");
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        if (!category) {
            setPosts([]);
            return;
        }
        const params = new URLSearchParams();
        params.append("category", category);
        params.append("orderBy", orderBy);
        params.append("direction", direction);

        fetch(`http://localhost:5000/api/posts?${params}`)
            .then((r) => r.json())
            .then((data) => {
                if (data.success) {
                    setPosts(data.data);
                    setPage(1);
                }
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
        if (!token) { navigate("/login"); return; }
        if (!category) {
            Swal.fire({
                icon: "info",
                title: "Selecciona un apartado",
                text: "Debes elegir una categoría en el panel izquierdo antes de crear un post.",
                confirmButtonColor: "#E67E22",
            });
            return;
        }
        navigate("/foro/crear", { state: { category } });
    };

    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE) || 1;
    const paginated = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

    return (
        <div className="forum-page">
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

            <hr className="forum-divider" />

            {!category ? (
                <div className="forum-pick-category">
                    <h2 className="forum-pick-title">Elige un apartado para empezar</h2>
                    <p className="forum-pick-sub">Selecciona una categoría en el panel izquierdo para ver sus posts o crear el tuyo.</p>
                </div>
            ) : (
                <>
                    <div className="forum-posts">
                        {paginated.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                        {posts.length === 0 && (
                            <p className="forum-empty">
                                No hay posts en &ldquo;{category}&rdquo; todavía. ¡Sé el primero!
                            </p>
                        )}
                    </div>
                    {totalPages > 1 && (
                        <div className="sf-pagination">
                            <button className="sf-pagination__btn" onClick={() => setPage(p => p - 1)} disabled={page === 1}>‹</button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 2)
                                .map(n => (
                                    <button
                                        key={n}
                                        className={`sf-pagination__btn${page === n ? ' sf-pagination__btn--active' : ''}`}
                                        onClick={() => setPage(n)}
                                    >{n}</button>
                                ))
                            }
                            <button className="sf-pagination__btn" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>›</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Forum;
