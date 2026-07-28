import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";

export default async function UserProfilePage() {
  const user = await getSessionUser();
  if (!user) redirect("/account/login?next=/user/profile");

  return (
    <div>
      <h4>Profile</h4>
      <table className="table">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{user.name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{user.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
