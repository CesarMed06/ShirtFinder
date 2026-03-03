import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Swal from "sweetalert2";

function CreatePost() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const selectedCategory = location.state?.category || "General";

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire({ icon: "warning", title: "Acceso restringido", text: "Debes iniciar sesión para crear un post" });
            navigate("/login");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim().length < 5)
            return Swal.fire({ icon: "error", title: "Título muy corto", text: "El título debe tener al menos 5 caracteres" });
        if (body.trim().length < 10)
            return Swal.fire({ icon: "error", title: "Cuerpo muy corto", text: "El mensaje debe tener al menos 10 caracteres" });

        const token = localStorage.getItem("token");
        setLoading(true);

        let res;
        if (file) {
            const fd = new FormData();
            fd.append("title", title);
            fd.append("content", body);
            fd.append("category", selectedCategory);
            fd.append("attachment", file);
            res = await fetch("http://localhost:5000/api/posts", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: fd,
            });
        } else {
            res = await fetch("http://localhost:5000/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ title, content: body, category: selectedCategory }),
            });
        }

        const data = await res.json();
        setLoading(false);

        if (data.success) {
            await Swal.fire({ icon: "success", title: "¡Post publicado!", timer: 1500, showConfirmButton: false });
            navigate("/foro");
        } else {
            Swal.fire({ icon: "error", title: "Error", text: data.message || "No se pudo publicar el post" });
        }
    };

    return (
        <div className="cp-page">
            <button onClick={() => navigate("/foro")} className="sf-back-button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <img
                    src="https://res.cloudinary.com/dwldyiruu/image/upload/v1768983970/FLECHA_VOLVER_ATRAS_lspqx4.jpg"
                    alt="Volver al foro"
                    className="sf-back-icon"
                />
            </button>
            <div className="cp-container">
                <h1 className="cp-title">Crear post</h1>
                <p className="cp-breadcrumb">
                    <Link to="/foro">Foro</Link> / {selectedCategory !== "General" ? selectedCategory : "Crear nuevo post"}
                </p>
                <form className="cp-form" onSubmit={handleSubmit}>
                    <label className="cp-label">Título del post</label>
                    <input
                        className="cp-input"
                        type="text"
                        placeholder="Escribe el título de tu post..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className="cp-label cp-label--body">Cuerpo del mensaje</label>
                    <textarea
                        className="cp-textarea"
                        placeholder="Escribe el contenido de tu post..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <div className="cp-file-wrap">
                        <button type="button" className="cp-btn-file" onClick={() => fileRef.current.click()}>
                            ADJUNTAR ARCHIVO
                        </button>
                        {file && <span className="cp-filename">{file.name}</span>}
                        <input ref={fileRef} type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <button type="submit" className="cp-btn-submit" disabled={loading}>
                        {loading ? "Publicando..." : "PUBLICAR POST"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;
