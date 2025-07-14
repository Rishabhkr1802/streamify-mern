function Wrapper({ pageTitle, children }) {
    return (
        <div className="d-flex flex-column gap-2">
            <h3 className="display-5">{pageTitle}</h3>
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default Wrapper;