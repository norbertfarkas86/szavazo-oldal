export default function GoalIcon({id}) {
 const shared={viewBox:'0 0 64 64',fill:'none',stroke:'currentColor',strokeWidth:2.7,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':true};
 switch(id){
 case 'A': return <svg {...shared}><rect x="7" y="22" width="32" height="21" rx="3"/><circle cx="45" cy="31" r="10"/><path d="m51 37 8 8M12 30h14M12 35h9M44 17v-5M57 23l4-3"/></svg>;
 case 'B': return <svg {...shared}><circle cx="21" cy="29" r="9"/><path d="M21 14V8M21 50v-6M6 29H1M41 29h-6M10 18l-5-5M10 40l-5 5M32 18l5-5M34 39l4 5M44 12v40M58 12v40M44 12h14M44 52h14M48 12c5 9 5 31 0 40"/></svg>;
 case 'C': return <svg {...shared}><path d="M19 24v-6a7 7 0 0 1 7-7h18a6 6 0 0 1 6 6v5H35v-5H26v10"/><path d="M28 33c0 5-6 9-6 13a6 6 0 0 0 12 0c0-4-6-8-6-13Z"/><rect x="45" y="32" width="12" height="23" rx="2"/><path d="M51 27v5M10 51l10-1 7 5 10-2 8-6M8 42l8-4 6 3"/></svg>;
 default: return <svg {...shared}><rect x="7" y="11" width="44" height="43"/><path d="M7 20h44M7 29h44M7 38h31M18 11v43M30 11v34M41 11v25"/><circle cx="48" cy="47" r="12"/><path d="M48 35v24M36 47h24M40 39l16 16M56 39 40 55"/></svg>;
 }
}
