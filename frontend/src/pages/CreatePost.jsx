import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
    "Camisetas históricas",
    "Nuevos lanzamientos",
    "Off-topic",
    "Camisetas retro",
];

function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Off-topic");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const res = await fetch("http://localhost:5000/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, content, category }),
        });

        const data = await res.json();
        if (data.success) navigate("/foro");
    };

    return (
        <div className="create-post-container">
            <h1 className="forum-title">Crear post</h1>
            <form className="create-post-form" onSubmit={handleSubmit}>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Escribe tu post..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={8}
                />
                <div className="create-post-actions">
                    <button type="button" onClick={() => navigate("/foro")}>
                        Cancelar
                    </button>
                    <button type="submit">Publicar</button>
                </div>
            </form>
        </div>
    );
}

export default CreatePost;
