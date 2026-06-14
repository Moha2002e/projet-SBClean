/* ============================================================
   SB Clean — Avis clients
   Options du formulaire · Rafraîchissement des carrousels · Formulaire de soumission
   ============================================================ */

/* ---- Options du select "service utilisé" ---- */

function buildServiceOptions() {
  function og(label, items) {
    if (!items || !items.length) return '';
    return '<optgroup label="' + label + '">'
      + items.map(function(it) {
          return '<option value="' + esc(it) + '">' + esc(it) + '</option>';
        }).join('')
      + '</optgroup>';
  }
  return og('Domaines',        D.domains.map(function(d)    { return d.title; }))
       + og('Formules voiture', D.carFormulas.map(function(f) { return f.name; }))
       + og('Packs',            D.packs.map(function(p)      { return p.name; }))
       + og('Maison',           (D.houseTextile || []).map(function(h) { return h.name; }))
       + og('Jardin',           (D.garden       || []).map(function(g) { return g.name; }));
}

/* ---- Mise à jour de tous les affichages d'avis ---- */

function refreshCarousels() {
  var topRevs = D.testimonials.slice()
    .sort(function(a, b) { return (b.rating || 0) - (a.rating || 0); })
    .slice(0, 5);

  var homeTrow = document.getElementById('home-trow');
  if (homeTrow) homeTrow.innerHTML = topRevs.concat(topRevs).map(safeCard).join('');

  var avisTrow = document.getElementById('avis-trow');
  if (avisTrow) avisTrow.innerHTML = D.testimonials.concat(D.testimonials).map(safeCard).join('');

  var listEl = document.getElementById('reviews-list');
  if (listEl) listEl.innerHTML = D.testimonials.map(safeCard).join('');

  var contactTrow = document.querySelector('#contact .tscroll .trow');
  if (contactTrow) contactTrow.innerHTML = D.testimonials.concat(D.testimonials).map(safeCard).join('');
}

/* ---- Formulaire de soumission d'un avis ---- */

function reviewsSetup() {
  var submit    = document.getElementById('rv-submit');
  if (!submit) return;

  var nameEl    = document.getElementById('rv-name');
  var svcSelect = document.getElementById('rv-service');
  var starsEl   = document.getElementById('rv-stars');
  var textEl    = document.getElementById('rv-text');
  var okEl      = document.getElementById('review-ok');
  var currentRating = 5;

  function renderStars() {
    starsEl.innerHTML = '';
    for (var i = 1; i <= 5; i++) {
      (function(star) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'rv-star';
        btn.style.cssText = 'background:transparent;border:0;cursor:pointer;padding:0;';
        btn.style.color = star <= currentRating ? 'var(--sun)' : 'var(--line)';
        btn.innerHTML = svg(I.star, star <= currentRating);
        btn.addEventListener('click', function() { currentRating = star; renderStars(); });
        starsEl.appendChild(btn);
      })(i);
    }
  }
  renderStars();

  submit.addEventListener('click', async function(e) {
    e.preventDefault();
    var name    = (nameEl.value    || '').trim();
    var service = svcSelect ? (svcSelect.value || '') : '';
    var text    = (textEl.value    || '').trim();
    var rating  = currentRating   || 5;

    if (!name || !text) {
      if (okEl) {
        okEl.textContent = 'Veuillez indiquer votre nom et votre avis.';
        okEl.classList.add('show');
        setTimeout(function() { okEl.classList.remove('show'); }, 3000);
      }
      return;
    }

    var rev = { name: name, service: service, rating: rating, text: text, date: new Date().toISOString() };
    var savedToServer = false;

    try {
      var resp = await fetch('/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rev)
      });
      if (resp.ok) savedToServer = true;
    } catch (err) {}

    if (!savedToServer) {
      try {
        var existing = JSON.parse(localStorage.getItem('sbclean_user_testimonials') || '[]');
        existing.unshift(rev);
        localStorage.setItem('sbclean_user_testimonials', JSON.stringify(existing));
      } catch (e) {}
    }

    D.testimonials.unshift(rev);
    refreshCarousels();

    if (okEl) {
      okEl.textContent = 'Merci — votre avis a été ajouté !';
      okEl.classList.add('show');
      setTimeout(function() { okEl.classList.remove('show'); }, 3000);
    }

    nameEl.value = '';
    if (svcSelect) svcSelect.value = '';
    currentRating = 5;
    renderStars();
    textEl.value = '';
  });
}
