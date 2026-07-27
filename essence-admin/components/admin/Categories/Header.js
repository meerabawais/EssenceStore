export default function Header({ createCategory, createSubCategory }) {
    return (
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4 mt-4">

            <div>
                <h2 className="fw-bold mb-1">Categories</h2>
                <p className="text-muted mb-0">
                    Manage categories and subcategories
                </p>
            </div>

            <div className="d-flex gap-2">

                <button
                    className="btn btn-outline-primary"
                    onClick={createCategory}
                >
                    <i className="bi bi-folder-plus me-2"></i>
                    Add Category
                </button>

                <button
                    className="btn btn-primary"
                    onClick={createSubCategory}
                >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Subcategory
                </button>

            </div>

        </div>
    );
}