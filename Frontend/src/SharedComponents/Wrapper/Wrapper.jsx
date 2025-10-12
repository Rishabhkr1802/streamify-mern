function Wrapper({ pageTitle, children }) {
    return (
        <main className="d-flex flex-column gap-2 p-2 h-100">
            <h3 className="display-5 fw-normal">{pageTitle}</h3>
            <div className="container-fluid flex-grow-1 overflow-auto">
                {children}
            </div>
        </main>
    )
}

export default Wrapper;