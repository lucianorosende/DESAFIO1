import "./home.css";
function Home() {
    return (
        <>
            <div className="container">
                <h2 className="home">Home</h2>
                <div>
                    <button type="submit">
                        <a href="/api/sessions/login">Go to login</a>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Home;
