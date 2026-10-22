import Link from "next/link";
import { signOut } from "../app/auth/actions";

export default function AdminShell({ profile, children }) {
  const name = [profile.first_name, profile.last_name].filter(Boolean).join(" ") || "Administrator";
  return <div className="admin-shell"><aside className="sidebar"><Link className="admin-brand" href="/admin"><b>CS</b><span>CONTROL<br/>ROOM</span></Link><div className="status"><i/> SYSTEM LIVE</div><nav><Link href="/admin">Overview</Link><Link href="/admin/media">AI Media</Link><Link href="/admin/users">Profiles</Link><Link href="/admin/ratings">Ratings</Link></nav><div className="admin-user"><div className="avatar">{name.charAt(0)}</div><span><b>{name}</b><small>SUPERADMIN</small></span></div><form action={signOut}><button className="signout">Sign out</button></form></aside><div className="admin-main">{children}</div></div>;
}
