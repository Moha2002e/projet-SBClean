/* ============================================================
   SB Clean — Constructeurs de pages
   buildAccueil · buildServices · buildTarifs · buildContact · buildAvis · buildFooter
   ============================================================ */

function buildAccueil() {
  document.getElementById('f1').innerHTML = svg(I.star, true);
  document.getElementById('f2').innerHTML = svg(I.clock);

  var argsHtml = D.args.map(function(a) {
    return '<div class="arg"><div class="ic">' + svg(I[a.icon]) + '</div><b>' + a.label + '</b></div>';
  }).join('');

  var domHtml = D.domains.map(function(d) {
    return '<div class="dcard">'
      + '<div class="dimg" style="overflow:hidden"><img src="' + d.imgUrl + '" alt="' + d.title + '" style="width:100%;height:100%;object-fit:cover;display:block;transition:.3s" loading="lazy"></div>'
      + '<div class="dbody" style="display:flex;flex-direction:column;flex:1;padding:24px">'
      + '<div class="dtag" style="color:' + d.color + ';background:' + d.colorL + '">' + d.tag + '</div>'
      + '<h3>' + d.title + '</h3><p>' + d.pitch + '</p>'
      + '<ul style="margin-bottom:0">'
      + d.bullets.map(function(b) {
          return '<li><span class="tk" style="background:' + d.colorL + ';color:' + d.color + '">✓</span>' + b + '</li>';
        }).join('')
      + '</ul>'
      + '<span class="more" style="color:' + d.color + ';margin-top:auto;padding-top:16px;display:inline-flex;gap:6px;font-family:Outfit;font-weight:600;font-size:14px;cursor:pointer" onclick="go(\'tarifs\')">Voir les tarifs →</span>'
      + '</div></div>';
  }).join('');

  var steps = [
    ['Choisissez votre créneau',   'Confirmation instantanée et ajout au calendrier.'],
    ['On prépare l\'intervention', 'Rappel automatique avant l\'intervention.'],
    ['Intervention',               'On vient chez vous, rien à prévoir.'],
    ['Paiement après',             'Vous payez après, zéro mauvaise surprise.']
  ].map(function(s, i) {
    return '<div class="step"><div class="n">' + (i + 1) + '</div><h4>' + s[0] + '</h4><p>' + s[1] + '</p></div>';
  }).join('');

  var marquee = D.args.concat(D.args).map(function(a) {
    return '<span><i>✦</i> ' + a.label + '</span>';
  }).join('');

  document.getElementById('accueil').insertAdjacentHTML('beforeend',
    '<div class="strip"><div class="row">' + marquee + '</div></div>'
    + '<div class="wrap"><section class="blk">'
    + '<div class="shead"><span class="eyebrow">Nos domaines</span><h2>Trois expertises, un seul interlocuteur</h2>'
    + '<p>Tout ce que vous n\'avez plus envie de faire vous-même.</p></div>'
    + '<div class="dgrid">' + domHtml + '</div></section></div>'
    + '<div class="wrap"><section class="blk" style="padding-top:0">'
    + '<div class="shead"><span class="eyebrow">Pourquoi SB Clean</span><h2>Le <span class="accent">confort</span> d\'un service qui vient à vous</h2></div>'
    + '<div class="args">' + argsHtml + '</div></section></div>'
    + '<div class="wrap"><section class="blk" style="padding-top:0">'
    + '<div class="greenband"><span class="eyebrow">Comment ça marche</span>'
    + '<h2 style="font-size:clamp(28px,3.6vw,42px);margin-top:16px">Simple, du premier contact au résultat</h2>'
    + '<div class="steps">' + steps + '</div></div></section></div>'
    + '<div class="wrap"><section class="blk" style="padding-top:0">'
    + '<div class="shead center" style="margin-bottom:28px">'
    + '<span class="eyebrow">Avis clients</span>'
    + '<h2>Ils ont réservé, ils ne regrettent pas</h2>'
    + '<p style="margin-bottom:18px">Découvrez ce que nos clients pensent de SB Clean.</p>'
    + '<span class="voir-avis-link" onclick="go(\'avis\')">Voir tous les avis →</span>'
    + '</div>'
    + '<div class="tscroll"><div id="home-trow" class="trow"></div></div>'
    + '</section></div>'
    + '<div class="wrap"><section class="blk" style="padding-top:0">'
    + '<div class="band"><div><h2>Prêt à retrouver du propre ?</h2><p>Réservez votre créneau en ligne, confirmation instantanée dans votre agenda.</p></div>'
    + '<button class="btn btn-pri big" onclick="go(\'contact\')">Réserver maintenant</button></div></section></div>'
  );
}

function buildServices() {
  var cards = D.domains.map(function(d, i) {
    return '<div class="wrap"><section class="blk" style="padding:' + (i ? '0 0 74px' : '34px 0 74px') + '">'
      + '<div class="dgrid" style="grid-template-columns:' + (i % 2 ? '1fr 1.05fr' : '1.05fr 1fr') + ';align-items:center;gap:46px">'
      + '<div class="svc-img" style="aspect-ratio:4/3;box-shadow:var(--sh);order:' + (i % 2 ? 2 : 1) + ';border-radius:var(--r);overflow:hidden"><img src="' + d.imgUrlServices + '" alt="' + d.title + '" style="width:100%;height:100%;object-fit:cover;display:block" loading="lazy"></div>'
      + '<div style="order:' + (i % 2 ? 1 : 2) + '">'
      + '<span class="eyebrow" style="color:' + d.color + ';background:' + d.colorL + '">' + d.tag + '</span>'
      + '<h2 style="font-size:clamp(28px,3.6vw,42px);margin:16px 0 14px">' + d.title + '</h2>'
      + '<p style="color:var(--muted);font-size:16.5px;margin-bottom:20px">' + d.pitch + '</p>'
      + '<ul class="svc-bullets" style="list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:11px">'
      + d.bullets.map(function(b) {
          return '<li style="display:flex;gap:9px;align-items:center;font-size:14.5px"><span class="tk" style="background:' + d.colorL + ';color:' + d.color + '">✓</span>' + b + '</li>';
        }).join('')
      + '</ul>'
      + '<div style="margin-top:24px;display:flex;gap:12px">'
      + '<button class="btn big" style="background:' + d.color + ';color:#fff;box-shadow:0 12px 24px -12px ' + d.color + '" onclick="go(\'contact\')">Réserver maintenant</button>'
      + '<button class="btn btn-ghost" onclick="go(\'tarifs\')">Tarifs</button>'
      + '</div></div></div></section></div>';
  }).join('');

  var packDetail = D.carPacks.map(function(p) {
    return '<div class="dcard"><div class="dbody">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><h3 style="font-size:19px">' + p.name + '</h3><span class="tag-pop">' + p.from + '</span></div>'
      + '<p style="margin-top:11px;color:var(--muted)">' + p.desc + '</p>'
      + '</div></div>';
  }).join('');

  document.getElementById('services').innerHTML =
    '<div class="wrap hero" style="padding:54px 0 8px"><div class="shead" style="max-width:740px">'
    + '<span class="eyebrow">Nos services</span>'
    + '<h1 style="font-size:clamp(34px,4.6vw,56px);font-weight:800;margin:18px 0 14px">Tout ce que vous n\'avez plus envie de faire vous-même</h1>'
    + '<p class="lead">On vient, on nettoie, vous profitez.</p></div></div>'
    + cards
    + '<div class="wrap"><section class="blk" style="padding-top:0">'
    + '<div class="shead"><span class="eyebrow">Detailing auto · en détail</span>'
    + '<h2>Ce que comprennent les formules voiture</h2>'
    + '<p>Du simple entretien régulier à la remise à l\'état quasi-neuf.</p></div>'
    + '<div class="dgrid" style="grid-template-columns:1fr 1fr">' + packDetail + '</div></section></div>'
    + '<div class="wrap"><section class="blk" style="padding-top:0">'
    + '<div class="band"><div><h2>Un besoin spécifique ?</h2><p>Décrivez votre projet ou réservez directement, confirmation instantanée dans votre agenda.</p></div>'
    + '<button class="btn btn-pri big" onclick="go(\'contact\')">Réserver maintenant</button></div></section></div>';
}

function buildTarifs() {
  var carCards = D.carFormulas.map(function(f, i) {
    var cls    = f.featured ? 'best' : (f.premium ? 'prem' : '');
    var ribbon = f.featured
      ? '<span class="ribbon">Populaire</span>'
      : (f.premium ? '<span class="ribbon" style="background:var(--sun);color:var(--ink)">Premium</span>' : '');

    var includesList = (f.includes || []).map(function(s) { return '<li>' + s + '</li>'; }).join('');

    var vtypes = D.carHead.map(function(h, j) {
      var pn = (f.priceNums && f.priceNums[j] !== null && f.priceNums[j] !== undefined) ? f.priceNums[j] : '';
      return '<button class="vtype-btn" data-idx="' + i + '" data-type="' + h + '" data-price="' + f.prices[j] + '" data-price-num="' + pn + '" onclick="selectVtype(this,' + i + ')">' + h + '<b>' + f.prices[j] + '</b></button>';
    }).join('');

    var formulaSupps = f.supplements !== undefined ? f.supplements : D.carSupplements;
    var supps = formulaSupps.map(function(s) {
      return '<label class="supp"><input type="checkbox" data-price-num="' + s.priceNum + '" onchange="updateTotal(' + i + ')"><span>' + s.name + '</span><b>' + s.price + '</b></label>';
    }).join('');

    return '<div class="pack ' + cls + '">'
      + ribbon
      + '<h4>' + f.name + '</h4>'
      + '<div class="ct">' + f.note + '</div>'
      + '<ul class="car-includes">' + includesList + '</ul>'
      + '<div class="car-from">dès ' + f.prices[0] + '</div>'
      + '<button class="car-pick-btn" onclick="toggleCarPicker(' + i + ')">Choisir mon véhicule →</button>'
      + '<div class="car-picker" id="car-picker-' + i + '" style="display:none">'
      + '<p class="pick-label">Mon véhicule</p>'
      + '<div class="vtype-grid">' + vtypes + '</div>'
      + (supps ? '<div class="supp-list">' + supps + '</div>' : '')
      + '<div class="car-total-box" id="car-total-' + i + '">'
      + '<span class="car-total-label">Total estimé</span>'
      + '<span class="car-total-num">—</span>'
      + '</div>'
      + '<button class="car-reserve-btn" onclick="reserveWithOffer(' + i + ')">Réserver maintenant →</button>'
      + '</div>'
      + '</div>';
  }).join('');

  function li(x) { return '<div class="li"><span>' + x.name + '</span><b>' + x.price + '</b></div>'; }

  function parseP(str) {
    if (/sur demande/i.test(str)) return { num: '', variable: 1 };
    var variable = (/–|\//.test(str)) ? 1 : 0;
    var m = str.match(/(\d+)/);
    return { num: m ? m[1] : '', variable: variable };
  }

  function sli(x) {
    var p  = parseP(x.price);
    var nm = x.name.replace(/"/g, '&quot;');
    return '<div class="sli" data-num="' + p.num + '" data-variable="' + p.variable + '" data-name="' + nm + '" data-price="' + x.price + '">'
      + '<div class="sli-info"><span>' + x.name + '</span><b>' + x.price + '</b></div>'
      + '<div class="qty"><button class="qbtn" onclick="qtyChange(this,-1)">−</button><span class="qval">0</span><button class="qbtn" onclick="qtyChange(this,1)">+</button></div>'
      + '</div>';
  }

  function selBar(cat) {
    return '<div class="sel-bar" id="sel-bar-' + cat + '">'
      + '<div class="sel-bar-info"><span class="sel-bar-label">Total estimé</span><span class="sel-bar-num">—</span></div>'
      + '<button class="sel-bar-btn" onclick="reserveSelection(\'' + cat + '\')">Réserver ma sélection →</button>'
      + '</div>';
  }

  var packs = D.packs.map(function(p, i) {
    return '<div class="pack ' + (p.best ? 'best' : '') + '">'
      + (p.best ? '<span class="ribbon">Meilleure offre</span>' : '')
      + '<h4>' + p.name + '</h4>'
      + '<div class="ct">' + p.contents + '</div>'
      + '<div class="pr"><span class="now">' + p.now + '€</span><span class="was">' + p.was + '€</span><span class="save">−' + p.save + '€</span></div>'
      + '<button class="sel-bar-btn" style="width:100%;margin-top:14px" onclick="reservePack(' + i + ')">Réserver ce pack →</button>'
      + '</div>';
  }).join('');

  document.getElementById('tarifs').innerHTML =
    '<div class="wrap hero" style="padding:54px 0 8px"><div class="shead" style="max-width:740px">'
    + '<span class="eyebrow">Tarifs</span>'
    + '<h1 style="font-size:clamp(34px,4.6vw,56px);font-weight:800;margin:18px 0 14px">Des prix clairs, sans surprise</h1>'
    + '<p class="lead">Des prix affichés, zéro mauvaise surprise.</p></div></div>'
    + '<div class="wrap"><section class="blk" style="padding-top:16px">'
    + '<div class="seg" id="tabseg">'
    + '<button class="on" data-t="auto"   data-color="var(--sky)"   data-text="#fff"          style="background:var(--sky);color:#fff">🚗 Voiture</button>'
    + '<button          data-t="maison"  data-color="var(--sun)"   data-text="var(--ink)">🏠 Maison</button>'
    + '<button          data-t="jardin"  data-color="var(--green)" data-text="#fff">🌿 Jardin</button>'
    + '<button          data-t="packs"   data-color="var(--green)" data-text="#fff">📦 Packs</button>'
    + '</div>'
    + '<div class="tabwrap">'
    + '<div data-pane="auto" class="show"><div class="packgrid">' + carCards + '</div></div>'
    + '<div data-pane="maison"><div class="listcols">'
    + '<div class="plist"><h4 style="background:#fdf4e2;color:var(--sun)">Textile &amp; intérieur</h4>' + D.houseTextile.map(sli).join('') + '</div>'
    + '<div class="plist"><h4 style="background:#fdf4e2;color:var(--sun)">Vitres &amp; châssis</h4>'   + D.houseWindows.map(sli).join('') + '</div>'
    + '</div>' + selBar('maison') + '</div>'
    + '<div data-pane="jardin"><div class="plist" style="max-width:560px"><h4>Jardin &amp; extérieur</h4>' + D.garden.map(sli).join('') + '</div>' + selBar('jardin') + '</div>'
    + '<div data-pane="packs"><div class="packgrid">' + packs + '</div></div>'
    + '</div></section></div>'
    + '<div class="wrap"><section class="blk" style="padding-top:0">'
    + '<div class="band"><div><h2>Un pack qui vous correspond ?</h2><p>Je peux composer une offre sur-mesure selon vos besoins.</p></div>'
    + '<button class="btn btn-pri big" onclick="go(\'contact\')">Réserver maintenant</button></div></section></div>';

  document.getElementById('tabseg').addEventListener('click', function(e) {
    var b = e.target.closest('button');
    if (!b) return;
    document.querySelectorAll('#tabseg button').forEach(function(x) {
      x.classList.remove('on'); x.style.background = ''; x.style.color = '';
    });
    b.classList.add('on');
    b.style.background = b.dataset.color;
    b.style.color      = b.dataset.text;
    document.querySelectorAll('.tabwrap > div').forEach(function(p) {
      p.classList.toggle('show', p.dataset.pane === b.dataset.t);
    });
  });
}

function buildContact() {
  var faq = D.faq.map(function(f) {
    return '<div class="qa"><div class="q" onclick="this.parentElement.classList.toggle(\'open\')">' + f.q + '<span class="pm">+</span></div><div class="a"><p>' + f.a + '</p></div></div>';
  }).join('');

  var b = D.brand;

  document.getElementById('contact').innerHTML =
    '<div class="wrap hero" style="padding:54px 0 8px"><div class="shead" style="max-width:740px">'
    + '<span class="eyebrow">Contact &amp; rendez-vous</span>'
    + '<h1 style="font-size:clamp(34px,4.6vw,56px);font-weight:800;margin:18px 0 14px">Prenez rendez-vous</h1>'
    + '<p class="lead">En 30 secondes, votre rendez-vous est réservé et ajouté automatiquement à votre agenda. Pas de coup de téléphone, pas d\'attente, juste un créneau qui vous convient.</p></div></div>'
    + '<div class="wrap"><section class="blk" style="padding-top:16px">'
    + '<div id="offer-banner" style="display:none;align-items:center;gap:12px;background:var(--sky-l);border:1.5px solid var(--sky);border-radius:12px;padding:13px 18px;margin-bottom:20px;flex-wrap:wrap">'
    + '<span style="font-size:18px">📋</span>'
    + '<div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:700;color:var(--sky);text-transform:uppercase;letter-spacing:.04em;margin-bottom:2px">Votre sélection</div>'
    + '<strong id="offer-text" style="font-size:15px;color:var(--ink);word-break:break-word"></strong></div>'
    + '<button onclick="clearOffer()" style="background:none;border:none;cursor:pointer;font-size:18px;color:var(--faint);padding:0;line-height:1">✕</button>'
    + '</div>'
    + '<div class="contact-grid" style="display:grid;grid-template-columns:1.4fr 0.6fr;gap:36px;align-items:start">'
    + '<div class="booking-col">'
    + '<div id="no-offer-block" class="no-offer">'
    + '<div class="no-offer-ic">' + svg(I.doc) + '</div>'
    + '<h3>Choisissez d\'abord votre prestation</h3>'
    + '<p>Pour réserver un créneau, sélectionnez une formule, un service ou un pack dans nos tarifs. Votre devis sera alors transmis automatiquement et le calendrier s\'ouvrira.</p>'
    + '<button class="btn btn-pri big" onclick="go(\'tarifs\')">Voir les tarifs &amp; réserver →</button>'
    + '</div>'
    + '<div id="calendly-widget" style="display:none;min-width:280px;width:100%;height:700px"></div>'
    + '</div>'
    + '<div class="cinfo">'
    + '<a class="ci" href="tel:+32494371491" style="text-decoration:none;cursor:pointer"><div class="ic">' + svg(I.phone) + '</div><div><small>Téléphone / SMS</small><b>' + b.phone + '</b></div></a>'
    + '<a class="ci" href="https://wa.me/32494371491" target="_blank" style="text-decoration:none;cursor:pointer"><div class="ic">' + svg(I.wa) + '</div><div><small>WhatsApp direct</small><b>' + b.whatsapp + '</b></div></a>'
    + '<a class="ci" href="mailto:' + b.email + '" style="text-decoration:none;cursor:pointer"><div class="ic">' + svg(I.mail) + '</div><div><small>Email</small><b>' + b.email + '</b></div></a>'
    + '<div class="ci"><div class="ic">' + svg(I.pin) + '</div><div><small>Zone d\'intervention</small><b>' + b.zone + '</b></div></div>'
    + '<div class="ci"><div class="ic">' + svg(I.clock) + '</div><div><small>Horaires</small><b>' + b.hours + '</b></div></div>'
    + '</div></div>'
    + '<div style="margin-top:32px;border-radius:var(--r);overflow:hidden;height:320px">'
    + '<iframe src="https://maps.google.com/maps?q=Awans,Li%C3%A8ge,Belgium&z=13&output=embed" width="100%" height="100%" style="border:0;display:block" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    + '</div>'
    + '</section></div>'
    + '<div class="wrap"><section class="blk" style="padding-top:0">'
    + '<div class="shead center"><span class="eyebrow">Avis clients</span><h2>Ce qu\'ils disent de SB Clean</h2></div>'
    + '<div class="tscroll"><div class="trow">' + D.testimonials.concat(D.testimonials).map(safeCard).join('') + '</div></div>'
    + '</section></div>'
    + '<div class="wrap"><section class="blk" style="padding-top:0">'
    + '<div class="shead center"><span class="eyebrow">FAQ</span><h2>Questions fréquentes</h2></div>'
    + '<div class="faq" style="max-width:760px;margin:0 auto">' + faq + '</div>'
    + '</section></div>';
}

function buildAvis() {
  var allCards = D.testimonials.length
    ? D.testimonials.concat(D.testimonials).map(safeCard).join('')
    : '';

  document.getElementById('avis').innerHTML =
    '<div class="wrap hero" style="padding:54px 0 8px">'
    + '<div class="shead" style="max-width:740px">'
    + '<span class="eyebrow">Avis clients</span>'
    + '<h1 style="font-size:clamp(34px,4.6vw,56px);font-weight:800;margin:18px 0 14px">Ils ont réservé, ils ne regrettent pas</h1>'
    + '<p class="lead">Partagez votre expérience SB Clean. Votre avis aide les futurs clients à choisir en confiance.</p>'
    + '</div></div>'
    + '<div class="wrap"><section class="blk" style="padding-top:16px">'
    + '<div class="cgrid" style="gap:32px">'
    + '<div>'
    + '<div class="shead"><span class="eyebrow">Laissez un avis</span>'
    + '<h2 style="font-size:clamp(24px,2.8vw,34px);margin:12px 0 8px">Partagez votre expérience</h2>'
    + '<p>Votre retour aide les autres clients.</p></div>'
    + '<div class="formcard">'
    + '<div id="review-ok" class="ok">Merci — votre avis a été ajouté !</div>'
    + '<div class="field"><label>Votre nom <span style="color:var(--green)">*</span></label>'
    + '<input id="rv-name" placeholder="Jean Dupont" autocomplete="name"></div>'
    + '<div class="field"><label>Service utilisé</label>'
    + '<select id="rv-service"><option value="">— Choisissez un service —</option>'
    + buildServiceOptions()
    + '</select></div>'
    + '<div class="field"><label>Note</label>'
    + '<div id="rv-stars" style="display:flex;gap:6px;align-items:center;padding:4px 0"></div></div>'
    + '<div class="field"><label>Votre avis <span style="color:var(--green)">*</span></label>'
    + '<textarea id="rv-text" placeholder="Racontez brièvement votre expérience..."></textarea></div>'
    + '<button id="rv-submit" class="btn btn-pri" style="width:100%;justify-content:center">Envoyer mon avis</button>'
    + '</div></div>'
    + '<div>'
    + '<div class="shead"><span class="eyebrow">Derniers avis</span>'
    + '<h3 style="margin-top:8px;font-size:22px">Ce que disent nos clients</h3></div>'
    + '<div class="reviews-scroll" style="margin-top:12px">'
    + '<div id="reviews-list">' + D.testimonials.map(safeCard).join('') + '</div>'
    + '</div></div>'
    + '</div></section></div>'
    + '<div class="wrap"><section class="blk" style="padding-top:0">'
    + '<div class="shead center">'
    + '<span class="eyebrow">Tous les avis</span>'
    + '<h2>Le verdict de nos clients</h2>'
    + '<p>Tous les avis, du plus récent au plus ancien.</p>'
    + '</div>'
    + '<div class="tscroll"><div id="avis-trow" class="trow">' + allCards + '</div></div>'
    + '</section></div>';
}

function buildFooter() {
  var b = D.brand;
  document.getElementById('fContact').innerHTML =
    '<li><a>' + b.phone + '</a></li>'
    + '<li><a>' + b.email + '</a></li>'
    + '<li><a>' + b.zone  + '</a></li>'
    + '<li><a>' + b.hours + '</a></li>';
}
