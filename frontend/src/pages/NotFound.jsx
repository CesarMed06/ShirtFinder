import { Link } from "react-router-dom";

function NotFound() {
    return (
    <div
        style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 20px",
        color: "#2C3E50",
        }}
    >
        <h1 style={{ fontSize: "90px", margin: "0 0 10px 0", fontWeight: "800" }}>
        404
        </h1>
        <h2 style={{ marginBottom: "12px" }}>Página no encontrada</h2>
        <p style={{ marginBottom: "28px", color: "#555" }}>
        La ruta a la que has intentado acceder no existe.
        </p>
        <Link to="/">
        <button
            style={{
            backgroundColor: "#E67E22",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 22px",
            cursor: "pointer",
            fontWeight: "600",
            }}
        >
            Volver al inicio
        </button>
        </Link>
    </div>
    );
}

export default NotFound;
