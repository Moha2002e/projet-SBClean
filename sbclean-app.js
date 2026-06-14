/* ============================================================
   SB Clean — Navigation & initialisation
   go · build synchrone · reviews.json en arrière-plan
   ============================================================ */

/* ---- Navigation entre pages ---- */

function go(id) {
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.toggle('active', p.id === id);
  });
  document.querySelectorAll('[data-nav]').forEach(function(a) {
    a.classList.toggle('on', a.dataset.nav === id);
  });
  document.body.classList.remove('mobile-open');
  window.scrollTo({ top: 0, behavior: 'instant' });
}
window.go = go;

/* ---- Fusionner les avis localStorage avant le build ---- */

try {
  var _raw = localStorage.getItem('sbclean_user_testimonials');
  if (_raw) {
    var _localRevs = JSON.parse(_raw) || [];
    if (_localRevs.length) D.testimonials = _localRevs.concat(D.testimonials);
  }
} catch (e) {}

/* ---- Build synchrone (pages visibles immédiatement) ---- */

buildAccueil();
buildServices();
buildTarifs();
buildContact();
buildAvis();
buildFooter();

/* ---- Peupler le carrousel accueil (top 5 par note) ---- */

(function() {
  var topRevs = D.testimonials.slice()
    .sort(function(a, b) { return (b.rating || 0) - (a.rating || 0); })
    .slice(0, 5);
  var homeTrow = document.getElementById('home-trow');
  if (homeTrow) homeTrow.innerHTML = topRevs.concat(topRevs).map(safeCard).join('');
})();

/* ---- Initialiser le formulaire d'avis ---- */

reviewsSetup();

/* ---- Charger reviews.json en arrière-plan ---- */
/* Si le fichier est présent (serveur ou Live Server), les carousels se mettent à jour.
   En ouverture directe (file://) ou si le fichier est absent, on continue avec les
   avis déjà en mémoire (localStorage ou tableau vide). */

fetch('reviews.json').then(function(resp) {
  if (!resp.ok) return;
  return resp.json();
}).then(function(jsonRevs) {
  if (!Array.isArray(jsonRevs) || !jsonRevs.length) return;
  D.testimonials = jsonRevs;
  /* Réintégrer les avis localStorage par-dessus */
  try {
    var raw2 = localStorage.getItem('sbclean_user_testimonials');
    if (raw2) {
      var lr = JSON.parse(raw2) || [];
      if (lr.length) D.testimonials = lr.concat(D.testimonials);
    }
  } catch (e) {}
  refreshCarousels();
}).catch(function() { /* fetch indisponible (file://) — silencieux */ });
