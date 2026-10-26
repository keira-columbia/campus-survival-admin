import { createAdminClient } from "../../../lib/supabase/admin";
import { updateMix } from "./actions";

export default async function PromptsPage({ searchParams }) {
  const params = await searchParams;
  const db = createAdminClient();
  const [chainsResult, stepsResult, mixResult] = await Promise.all([
    db.from("prompt_chains").select("*").order("name"),
    db.from("prompt_chain_steps").select("*").order("step_order"),
    db.from("prompt_chain_mix").select("*").eq("id", 1).maybeSingle(),
  ]);
  const chains = chainsResult.data ?? [];
  const steps = stepsResult.data ?? [];
  const mix = mixResult.data || { relevance_weight: 45, humor_weight: 35, novelty_weight: 20 };
  return <>
    <header className="page-head"><div><p>PROMPT OPERATIONS</p><h1>Prompt chains</h1><span>Inspect every generation sequence, its steps, and the live quality mix.</span></div><div className="count-pill">{chains.length} CHAINS · {steps.length} STEPS</div></header>
    {params?.error && <div className="alert">{params.error}</div>}{params?.saved && <div className="success">Prompt-chain mix updated.</div>}
    <section className="prompt-layout"><div className="chain-list">{chains.map(chain => <article className="chain-card" key={chain.id}><div className="panel-title"><span>{chain.name}</span><small>{chain.is_active ? "ACTIVE" : "PAUSED"}</small></div><p>{chain.description}</p><ol>{steps.filter(step => step.prompt_chain_id === chain.id).map(step => <li key={step.id}><b>{step.name}</b><span>{step.instruction}</span></li>)}</ol></article>)}</div>
    <form className="edit-form sticky-form" action={updateMix}><div className="panel-title"><span>PROMPT CHAIN MIX</span><small>READ / UPDATE</small></div><p className="muted">Tune the balance used when reviewing generated outputs. The three values must total 100.</p>{[["relevance_weight","Relevance"],["humor_weight","Humor"],["novelty_weight","Novelty"]].map(([name,label]) => <label key={name}>{label.toUpperCase()} %<input name={name} type="number" min="0" max="100" defaultValue={mix[name]} required/></label>)}<button className="primary wide">Update mix →</button></form></section>
  </>;
}
