/* ============================================================
   SB Clean — Utilitaires UI
   Icônes SVG, templates de cartes, helpers HTML sécurisés
   ============================================================ */

/* Raccourci vers les données partagées */
var D = window.SBCLEAN;

/* ---- Icônes SVG (chemins) ---- */
var I = {
  truck:  '<path d="M3 6h11v9H3z"/><path d="M14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  doc:    '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 13h6M9 16h6"/>',
  camera: '<path d="M3 8h4l1.5-2h7L17 8h4v11H3z"/><circle cx="12" cy="13" r="3.2"/>',
  card:   '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/>',
  clock:  '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  chat:   '<path d="M4 5h16v11H9l-4 4z"/>',
  phone:  '<path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  mail:   '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin:    '<path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/>',
  star:   '<path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z"/>',
  wa:     '<path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z"/><path d="M8.5 8.5c0 4 3 7 7 7"/>'
};

/* ---- Génère une balise SVG ---- */
function svg(path, filled) {
  filled = filled || false;
  return '<svg viewBox="0 0 24 24"'
    + ' fill="'   + (filled ? 'currentColor' : 'none') + '"'
    + ' stroke="' + (filled ? 'none' : 'currentColor') + '"'
    + ' stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'
    + path + '</svg>';
}

/* ---- Bloc d'étoiles ---- */
function stars(n) {
  var html = '';
  for (var i = 0; i < 5; i++) html += svg(I.star, i < n);
  return '<div class="stars">' + html + '</div>';
}

/* ---- Initiales pour l'avatar ---- */
function initials(name) {
  return name.split(' ').map(function(w) { return w[0] || ''; }).join('').slice(0, 2).toUpperCase();
}

/* ---- Template HTML d'une carte avis ---- */
function tCard(t) {
  return '<div class="tcard">'
    + stars(t.rating)
    + '<p>"' + t.text + '"</p>'
    + '<div class="who">'
    +   '<div class="av">' + initials(t.name) + '</div>'
    +   '<div><b>' + t.name + '</b><small>' + (t.place || '') + '</small></div>'
    +   '<span class="svc">' + (t.service || '') + '</span>'
    + '</div>'
    + '</div>';
}

/* ---- Échappement HTML (anti-XSS) ---- */
function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ---- Carte avis sécurisée (contenus utilisateurs) ---- */
function safeCard(t) {
  return tCard({
    name:    esc(t.name),
    place:   esc(t.place   || ''),
    rating:  t.rating || 5,
    service: esc(t.service || ''),
    text:    esc(t.text    || '')
  });
}
