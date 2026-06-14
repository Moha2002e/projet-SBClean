/* ============================================================
   SB Clean — Réservation & devis
   Formules voiture · Sélection maison/jardin · Packs · Calendly
   ============================================================ */

/* ---- Formules voiture : picker de véhicule ---- */

window.toggleCarPicker = function(idx) {
  var picker = document.getElementById('car-picker-' + idx);
  var btn    = picker.previousElementSibling;
  var isOpen = picker.style.display !== 'none';
  picker.style.display = isOpen ? 'none' : 'block';
  btn.textContent = isOpen ? 'Choisir mon véhicule →' : 'Fermer ✕';
};

window.selectVtype = function(btn, idx) {
  var grid = btn.closest('.vtype-grid');
  grid.querySelectorAll('.vtype-btn').forEach(function(b) { b.classList.remove('sel'); });
  btn.classList.add('sel');
  window.updateTotal(idx);
};

window.updateTotal = function(idx) {
  var picker   = document.getElementById('car-picker-' + idx);
  var totalBox = document.getElementById('car-total-' + idx);
  var totalNum = totalBox.querySelector('.car-total-num');
  var selVtype = picker.querySelector('.vtype-btn.sel');

  if (!selVtype) { totalBox.style.display = 'none'; return; }

  var baseNum = selVtype.dataset.priceNum;
  if (baseNum === '') {
    totalNum.textContent   = 'Sur demande';
    totalBox.style.display = 'flex';
    return;
  }

  var total = parseInt(baseNum);
  picker.querySelectorAll('.supp input[type="checkbox"]:checked').forEach(function(cb) {
    total += parseInt(cb.dataset.priceNum) || 0;
  });
  totalNum.textContent   = total + ' €';
  totalBox.style.display = 'flex';
};

/* ---- Réservation depuis une formule voiture ---- */

window.reserveWithOffer = function(idx) {
  var picker   = document.getElementById('car-picker-' + idx);
  var formula  = D.carFormulas[idx].name;
  var selVtype = picker.querySelector('.vtype-btn.sel');
  var vehicle  = selVtype
    ? selVtype.dataset.type + ' ' + selVtype.dataset.price
    : 'Véhicule non précisé';
  var selSupps = Array.from(picker.querySelectorAll('.supp input:checked'))
    .map(function(cb) { return cb.closest('.supp').querySelector('span').textContent.trim(); });

  var totalTxt = 'Sur demande';
  if (selVtype && selVtype.dataset.priceNum !== '') {
    var total = parseInt(selVtype.dataset.priceNum);
    picker.querySelectorAll('.supp input:checked').forEach(function(cb) {
      total += parseInt(cb.dataset.priceNum) || 0;
    });
    totalTxt = total + '€';
  }

  var summary = formula + ' · ' + vehicle
    + (selSupps.length ? ' · Options : ' + selSupps.join(', ') : '')
    + ' · Total estimé ' + totalTxt;
  window.reserveSummary(summary);
};

/* ---- Code de vérification du devis (SBC-JJMM-TOTAL) ---- */

function offerCode(summaryText) {
  var now   = new Date();
  var dd    = String(now.getDate()).padStart(2, '0');
  var mm    = String(now.getMonth() + 1).padStart(2, '0');
  var match = summaryText.match(/(\d+)€/g);
  var total = match ? match[match.length - 1].replace('€', '') : 'SR';
  return '[SBC-' + dd + mm + '-' + total + ']';
}

window.reserveSummary = function(summary) {
  var secured = summary + ' ' + offerCode(summary);
  window.pendingOffer = { summary: secured };
  go('contact');
  _applyOffer();
};

/* ---- Sélection quantités maison / jardin ---- */

window.qtyChange = function(btn, delta) {
  var li    = btn.closest('.sli');
  var valEl = li.querySelector('.qval');
  var v     = (parseInt(valEl.textContent) || 0) + delta;
  if (v < 0) v = 0;
  valEl.textContent = v;
  recomputeSelection(btn.closest('[data-pane]').dataset.pane);
};

function recomputeSelection(cat) {
  var pane  = document.querySelector('[data-pane="' + cat + '"]');
  var bar   = document.getElementById('sel-bar-' + cat);
  if (!pane || !bar) return;

  var total = 0, anyVar = false, count = 0;
  pane.querySelectorAll('.sli').forEach(function(li) {
    var q = parseInt(li.querySelector('.qval').textContent) || 0;
    li.classList.toggle('on', q > 0);
    if (q > 0) {
      count += q;
      var num = li.dataset.num === '' ? null : parseInt(li.dataset.num);
      if (num !== null) total += num * q;
      if (num === null || li.dataset.variable === '1') anyVar = true;
    }
  });

  if (count === 0) { bar.style.display = 'none'; return; }
  bar.style.display = 'flex';
  bar.querySelector('.sel-bar-num').textContent = (anyVar ? 'dès ' : '') + total + ' €';
}

window.reserveSelection = function(cat) {
  var pane  = document.querySelector('[data-pane="' + cat + '"]');
  var items = [], total = 0, anyVar = false;

  pane.querySelectorAll('.sli').forEach(function(li) {
    var q = parseInt(li.querySelector('.qval').textContent) || 0;
    if (q > 0) {
      items.push(li.dataset.name + (q > 1 ? ' ×' + q : '') + ' (' + li.dataset.price + ')');
      var num = li.dataset.num === '' ? null : parseInt(li.dataset.num);
      if (num !== null) total += num * q;
      if (num === null || li.dataset.variable === '1') anyVar = true;
    }
  });

  if (!items.length) return;
  var label   = cat === 'maison' ? 'Maison' : 'Jardin';
  var summary = label + ' · ' + items.join(' + ')
    + ' · Total estimé ' + (anyVar ? 'dès ' : '') + total + '€';
  window.reserveSummary(summary);
};

window.reservePack = function(i) {
  var p = D.packs[i];
  window.reserveSummary('Pack · ' + p.name + ' (' + p.contents + ') · ' + p.now + '€');
};

/* ---- Intégration Calendly ---- */

function _applyOffer() {
  if (!window.pendingOffer) return;
  var summary = window.pendingOffer.summary;

  var banner    = document.getElementById('offer-banner');
  var offerText = document.getElementById('offer-text');
  if (banner && offerText) {
    offerText.textContent = summary;
    banner.style.display  = 'flex';
  }

  var noOffer = document.getElementById('no-offer-block');
  if (noOffer) noOffer.style.display = 'none';

  var el = document.getElementById('calendly-widget');
  if (!el) return;
  el.style.display = 'block';

  var enc           = encodeURIComponent(summary);
  var url           = 'https://calendly.com/sbclean-awans/3h?a1=' + enc + '&a2=' + enc + '&a3=' + enc;
  var customAnswers = { a1: summary, a2: summary, a3: summary };

  (function initWidget() {
    if (window.Calendly) {
      el.innerHTML = '';
      Calendly.initInlineWidget({
        url:           url,
        parentElement: el,
        prefill:       { customAnswers: customAnswers },
        utm:           { utmSource: 'sbclean-site', utmCampaign: summary }
      });
    } else {
      /* Calendly chargé en async — on réessaie toutes les 250ms */
      setTimeout(initWidget, 250);
    }
  })();
}

window.clearOffer = function() {
  window.pendingOffer = null;
  var banner  = document.getElementById('offer-banner');
  var el      = document.getElementById('calendly-widget');
  var noOffer = document.getElementById('no-offer-block');
  if (banner)  banner.style.display  = 'none';
  if (el)      el.style.display      = 'none';
  if (noOffer) noOffer.style.display = 'flex';
};
