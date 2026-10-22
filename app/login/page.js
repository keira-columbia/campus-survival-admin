import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import { signInWithGoogle } from "../auth/actions";

export default async function LoginPage({ searchParams }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data } = await supabase.from("profiles").select("is_superadmin").eq("id", user.id).maybeSingle();
    if (data?.is_superadmin) redirect("/admin");
  }
  const params = await searchParams;
  return <main className="login-page"><section className="login-panel"><div className="eyebrow">RESTRICTED SYSTEM</div><div className="login-mark">CS<span>ADMIN</span></div><h1>Control room access.</h1><p>Monitor the community, manage AI media, and review voting activity. Authorized administrators only.</p>{params?.error&&<div className="alert">{params.error}</div>}<form action={signInWithGoogle}><button className="primary wide">Continue with Google <b>→</b></button></form><small>Access is checked against the protected superadmin field after login.</small></section><aside className="login-visual"><div className="radar"><i/><i/><i/><span>LIVE<br/>SYSTEM</span></div><p>Campus Survival Map<br/>Operations Console</p></aside></main>;
}
