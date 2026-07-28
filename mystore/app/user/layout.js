import UserNav from "@/components/layout/UserNav";

export default function UserLayout({ children }) {
  return (
    <>
      <div
        className="breadcumb_area bg-img"
        style={{ backgroundImage: "url('/img/bg-img/breadcumb.jpg')" }}
      >
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <div className="page-title text-center">
                <h2>My Account</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "60px 15px" }}>
        <div className="row">
          <div className="col-md-3">
            <UserNav />
          </div>
          <div className="col-md-9">{children}</div>
        </div>
      </div>
    </>
  );
}
