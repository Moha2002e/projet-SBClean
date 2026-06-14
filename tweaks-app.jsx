// tweaks-app.jsx — pilote les variables CSS du site SB Clean (Clair & frais)
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primary": "#10876a",
  "accent": "#2f93c9",
  "headFont": "Outfit",
  "radius": 22
}/*EDITMODE-END*/;

function hexToRgb(h){h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');const n=parseInt(h,16);return [(n>>16)&255,(n>>8)&255,n&255];}
function toHex(r,g,b){return '#'+[r,g,b].map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');}
function mix(hex,target,amt){const a=hexToRgb(hex),b=hexToRgb(target);return toHex(a[0]+(b[0]-a[0])*amt,a[1]+(b[1]-a[1])*amt,a[2]+(b[2]-a[2])*amt);}

function applyTweaks(t){
  const r=document.documentElement.style;
  r.setProperty('--green', t.primary);
  r.setProperty('--green-d', mix(t.primary,'#000000',0.20));
  r.setProperty('--green-l', mix(t.primary,'#ffffff',0.86));
  r.setProperty('--mint',    mix(t.primary,'#ffffff',0.45));
  r.setProperty('--sky', t.accent);
  r.setProperty('--sky-l', mix(t.accent,'#ffffff',0.85));
  r.setProperty('--r', t.radius+'px');
  let s=document.getElementById('tweakFontStyle');
  if(!s){s=document.createElement('style');s.id='tweakFontStyle';document.head.appendChild(s);}
  s.textContent=`h1,h2,h3,h4,.dn,.logo b,.eyebrow,.nm,.tag-pop,.svc,.pack .now,.step .n,.btn{font-family:'${t.headFont}',sans-serif !important}`;
}

function App(){
  const [t,setTweak]=useTweaks(TWEAK_DEFAULTS);
  React.useEffect(()=>{applyTweaks(t);},[t]);
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Couleurs" />
      <TweakColor label="Couleur principale" value={t.primary}
        options={['#10876a','#0f8a86','#1f7a52','#2f93c9']}
        onChange={v=>setTweak('primary',v)} />
      <TweakColor label="Accent secondaire" value={t.accent}
        options={['#2f93c9','#3a7bd5','#5bb98c','#f2b134']}
        onChange={v=>setTweak('accent',v)} />
      <TweakSection label="Style" />
      <TweakRadio label="Police des titres" value={t.headFont}
        options={['Outfit','Sora','Manrope']}
        onChange={v=>setTweak('headFont',v)} />
      <TweakSlider label="Arrondi des coins" value={t.radius} min={10} max={28} step={1} unit="px"
        onChange={v=>setTweak('radius',v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<App />);
