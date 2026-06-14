/* ============================================================
   SB Clean — Données partagées (services, tarifs, packs, avis)
   Toutes les valeurs proviennent du cahier des charges client.
   ============================================================ */
window.SBCLEAN = {

  brand: {
    name: "SB Clean",
    tagline: "Zéro effort, résultat garanti",
    zone: "Awans · Région de Liège",
    phone: "+32 494 37 14 91",
    whatsapp: "+32 494 37 14 91",
    email: "sbclean.awans@gmail.com",
    hours: "Lun–Sam · 8h–19h",
  },

  /* Arguments clés à mettre en avant */
  args: [
    { icon: "truck",   label: "On vient, vous ne bougez pas" },
    { icon: "doc",     label: "Réservation en 1 minute, annulation libre" },
    { icon: "camera",  label: "Résultat visible, preuve à l'appui" },
    { icon: "card",    label: "Vous payez seulement si vous êtes satisfait" },
    { icon: "clock",   label: "Créneau disponible dès cette semaine" },
    { icon: "chat",    label: "Réponse en moins d'une heure" },
  ],

  /* Les 3 domaines d'activité */
  domains: [
    {
      id: "auto",
      tag: "Detailing automobile",
      title: "Detailing automobile",
      pitch: "Nettoyage intérieur et extérieur de votre véhicule à domicile, du simple entretien au polissage carrosserie. Particuliers & professionnels.",
      bullets: ["Intérieur sans / avec sièges", "Carrosserie & jantes", "Moteur & polissage cire", "Offres concessionnaires"],
      color: "var(--sky)",
      colorL: "var(--sky-l)",
      imgUrl: "https://images.pexels.com/photos/5233264/pexels-photo-5233264.jpeg?w=800",
      imgUrlServices: "https://images.pexels.com/photos/4218861/pexels-photo-4218861.jpeg?w=1280",
    },
    {
      id: "maison",
      tag: "Entretien maison",
      title: "Entretien maison",
      pitch: "Canapés, matelas et tapis par injection / extraction, lavage de vitres et châssis, terrasses et allées au karcher.",
      bullets: ["Canapés · matelas · tapis", "Vitres & châssis", "Injection / extraction", "Terrasses au karcher"],
      color: "var(--sun)",
      colorL: "#fdf4e2",
      imgUrl: "https://images.pexels.com/photos/9462096/pexels-photo-9462096.jpeg?w=800",
      imgUrlServices: "https://images.pexels.com/photos/9462100/pexels-photo-9462100.jpeg?w=1280",
    },
    {
      id: "jardin",
      tag: "Entretien jardin",
      title: "Entretien jardin",
      pitch: "Tonte, taille de haies et buissons, désherbage et évacuation des déchets verts pour un extérieur impeccable.",
      bullets: ["Tonte de pelouse", "Taille haies & buissons", "Désherbage", "Évacuation déchets verts"],
      color: "var(--green)",
      colorL: "var(--green-l)",
      imgUrl: "https://images.pexels.com/photos/29821815/pexels-photo-29821815.jpeg?w=800",
      imgUrlServices: "https://images.pexels.com/photos/17312060/pexels-photo-17312060.jpeg?w=1280",
    },
  ],

  /* ---- TARIFS VOITURE : formules avec gabarits ---- */
  carHead: ["Citadine", "Berline", "SUV", "Van"],
  carFormulas: [
    { name: "Pack Nettoyage Basique", note: "Extérieur + aspiration basique",
      includes: ["Nettoyage extérieur complet", "Aspiration basique intérieur", "Nettoyage plastiques", "Nettoyage vitres int+ext", "Dressing pneus"],
      prices: ["49€", "59€", "69€", "Sur demande"], priceNums: [49, 59, 69, null],
      supplements: [
        { name: "Nettoyage moteur", price: "+15€", priceNum: 15 },
        { name: "Shampoing sièges et moquettes", price: "+49€", priceNum: 49 },
        { name: "Traitement anti-pluie pare-brise", price: "+15€", priceNum: 15 },
      ] },
    { name: "Formule Intérieur Shampoing", note: "Intérieur avec sièges",
      includes: ["Aspiration intérieur & coffre", "Nettoyage plastiques", "Nettoyage vitres", "Shampoing sièges et carpettes"],
      prices: ["69€", "79€", "89€", "Sur demande"], priceNums: [69, 79, 89, null],
      supplements: [] },
    { name: "Shampoing Sièges seuls", note: "Sièges uniquement",
      includes: ["Aspiration sièges", "Shampoing sièges et carpettes", "Dégraissage sièges", "Séchage rapide"],
      prices: ["49€", "59€", "69€", "Sur demande"], priceNums: [49, 59, 69, null],
      supplements: [] },
    { name: "Pack Intérieur + Extérieur", note: "Le plus demandé",
      includes: ["Prélavage", "Nettoyage des jantes en profondeur", "Nettoyage des détails (entrées de portes, trappe à essence)", "Rinçage", "Lavage carrosserie à la main", "Dressing pneus", "Nettoyage vitres extérieures", "Traitement anti-pluie pare-brise", "Formule Intérieur Shampoing complète"],
      prices: ["100€", "110€", "120€", "Sur demande"], priceNums: [100, 110, 120, null], featured: true,
      supplements: [
        { name: "Nettoyage moteur", price: "+15€", priceNum: 15 },
        { name: "Traitement hydrophobe graphène", price: "+40€", priceNum: 40 },
      ] },
    { name: "Pack Remise à Neuf", note: "Int + Ext + Moteur",
      includes: ["Pack Int + Ext", "Nettoyage compartiment moteur", "Idéal fin de leasing", "Traitement anti-pluie pare-brise", "Traitement hydrophobe graphène"],
      prices: ["140€", "150€", "160€", "Sur demande"], priceNums: [140, 150, 160, null],
      supplements: [{ name: "Simmonisage à la main", price: "+45€", priceNum: 45 }] },
    { name: "Pack Detailing", note: "Int Shamp. + Ext + Moteur + Polissage cire",
      includes: ["Pack Remise à neuf", "Polissage carrosserie cire", "Correction micro-rayures"],
      prices: ["400€", "450€", "500€", "Sur demande"], priceNums: [400, 450, 500, null], premium: true,
      supplements: [] },
  ],

  /* ---- SUPPLÉMENTS VOITURE ---- */
  carSupplements: [
    { name: "Nettoyage moteur", price: "+20€", priceNum: 20 },
    { name: "Traitement cire hydrophobe", price: "+30€", priceNum: 30 },
    { name: "Shampoing sièges", price: "+20€", priceNum: 20 },
  ],

  /* Descriptifs des packs voiture (offres pro / détaillé) */
  carPacks: [
    { name: "Formule Entretien", from: "dès 45€ HTVA",
      desc: "Aspiration complète de l'habitacle et du coffre, nettoyage des plastiques et surfaces intérieures, nettoyage des vitres intérieures. Idéal pour un entretien régulier." },
    { name: "Pack Int + Ext", from: "dès 90€ HTVA",
      desc: "Formule Entretien + shampooing des sièges, prélavage mousse active, lavage carrosserie à la main, nettoyage des jantes et passages de roues, séchage microfibre et dressing des pneus. La formule la plus demandée." },
    { name: "Pack Remise à neuf", from: "dès 120€ HTVA",
      desc: "Tout le Pack Int + Ext + nettoyage approfondi du compartiment moteur. Idéal avant livraison client, fin de leasing ou remise en stock. Résultat garanti." },
    { name: "Pack Detailing", from: "dès 360€ HTVA",
      desc: "Tout le Pack Remise à neuf + polissage carrosserie à la cire une étape pour corriger les micro-rayures et redonner un éclat profond à la peinture. Véhicule rendu à l'état quasi-neuf." },
  ],

  /* ---- TARIFS MAISON ---- */
  houseTextile: [
    { name: "Canapé 2 places", price: "57€" },
    { name: "Canapé 3 places", price: "75€" },
    { name: "Canapé d'angle", price: "105€" },
    { name: "Fauteuil", price: "30€" },
    { name: "Matelas simple", price: "47€" },
    { name: "Matelas double", price: "65€" },
    { name: "Tapis petit (-2m²)", price: "27€" },
    { name: "Tapis grand (+2m²)", price: "52€" },
  ],
  houseWindows: [
    { name: "Vitres maison petite", price: "39€" },
    { name: "Vitres maison moyenne", price: "59€" },
    { name: "Vitres maison grande", price: "79€" },
    { name: "Par fenêtre", price: "5€" },
    { name: "Châssis PVC (par fenêtre)", price: "5–8€" },
    { name: "Pack vitres + châssis", price: "70–100€" },
    { name: "Velux / accès en hauteur", price: "+10–15€" },
  ],

  /* ---- TARIFS JARDIN ---- */
  garden: [
    { name: "Tonte petite pelouse (-100m²)", price: "45€" },
    { name: "Tonte moyenne (100–300m²)", price: "60€" },
    { name: "Taille de haie (par 10m)", price: "50€" },
    { name: "Taille de buissons (unité)", price: "12€" },
    { name: "Désherbage (par heure)", price: "22€" },
    { name: "Terrasse au karcher (m²)", price: "2–3€" },
    { name: "Nettoyage allée / driveway", price: "45€" },
    { name: "Évacuation déchets verts", price: "+20€" },
  ],

  /* ---- PACKS COMBINÉS ---- */
  packs: [
    { name: "Pack Jardin complet", contents: "Tonte petite + Taille haie 10m + Évacuation", was: 115, now: 95, save: 20, cat: "jardin" },
    { name: "Pack Parking + Voiture Basique", contents: "Allée / parking + Pack Int+Ext berline", was: 145, now: 119, save: 26, cat: "auto" },
    { name: "Pack Parking + Voiture Complet", contents: "Allée / parking + Remise à neuf + Traitement hydrophobe", was: 195, now: 159, save: 36, cat: "auto" },
    { name: "Pack Maison Essentiel", contents: "Terrasse 10m² + Canapé 3pl + Pack Int+Ext", was: 195, now: 145, save: 50, cat: "maison", best: true },
    { name: "Pack Maison Complet", contents: "Pack vitres + châssis + Canapé 3 places", was: 165, now: 139, save: 26, cat: "maison" },
    { name: "Pack Maison + Jardin", contents: "Vitres + châssis + Canapé 3pl + Jardin complet", was: 265, now: 219, save: 46, cat: "maison" },
    { name: "Pack Maison + Voiture", contents: "Terrasse 10m² + Canapé 3pl + Remise à neuf + Hydrophobe", was: 245, now: 199, save: 46, cat: "auto" },
  ],

  /* ---- OFFRES PROFESSIONNELLES ---- */
  proOffers: [
    { name: "Formule Entretien", price: "dès 45€ HTVA / véhicule" },
    { name: "Pack Int + Ext", price: "dès 90€ HTVA / véhicule" },
    { name: "Pack Remise à neuf", price: "dès 120€ HTVA / véhicule" },
    { name: "Pack Detailing", price: "dès 360€ HTVA / véhicule" },
  ],
  proVolume: [
    { range: "1 – 4 véhicules / semaine", discount: "Prix normal" },
    { range: "5 – 9 véhicules / semaine", discount: "−5%" },
    { range: "10+ véhicules / semaine", discount: "−10%" },
  ],

  /* ---- AVIS CLIENTS ---- */
  testimonials: [
    { name: "Julien M.",     place: "Awans",           rating: 5, service: "Pack Intérieur + Extérieur", text: "Voiture comme neuve, intérieur impeccable et il s'est déplacé devant chez moi. Photos avant/après bluffantes. Je recommande à 100%.",                                                                     date: "2025-11-15T10:00:00.000Z" },
    { name: "Sophie D.",     place: "Liège",            rating: 5, service: "Canapé d'angle",             text: "Mon canapé d'angle avait perdu sa couleur, le résultat après l'injection-extraction est incroyable. Ponctuel et très soigneux.",                                                                       date: "2025-10-28T09:30:00.000Z" },
    { name: "Garage Vresse", place: "Concessionnaire",  rating: 5, service: "Offres concessionnaires",    text: "On lui confie nos véhicules d'occasion avant mise en vente. Qualité constante, tarifs dégressifs, facturation à 30 jours. Partenaire fiable.",                                                          date: "2025-09-12T14:00:00.000Z" },
    { name: "Nadia B.",      place: "Ans",              rating: 5, service: "Vitres & châssis",           text: "Vitres et châssis nickel, même les velux en hauteur. Tarif annoncé respecté au centime près. Paiement après, ça rassure.",                                                                              date: "2025-08-20T11:00:00.000Z" },
    { name: "Marc V.",       place: "Flémalle",         rating: 4, service: "Pack Detailing",             text: "Polissage carrosserie qui a fait disparaître les micro-rayures. Du travail de pro, ma berline a retrouvé son éclat d'origine.",                                                                        date: "2025-07-05T16:00:00.000Z" },
    { name: "Élodie T.",     place: "Awans",            rating: 5, service: "Pack Maison Complet",        text: "Tout en une fois : vitres, canapé et le jardin taillé. Pratique, efficace et beaucoup moins cher en pack. Je rebooke au printemps.",                                                                    date: "2025-06-18T08:30:00.000Z" },
  ],

  faq: [
    { q: "Dans quelle zone intervenez-vous ?", a: "Awans et toute la région de Liège. Je me déplace directement chez vous, particuliers comme professionnels." },
    { q: "Comment se passe le premier contact ?", a: "Réservez directement un créneau en ligne, confirmation instantanée dans votre agenda. Si vous préférez, contactez-nous par WhatsApp ou SMS." },
    { q: "Avec quel matériel travaillez-vous ?", a: "Matériel professionnel : injection / extraction, karcher, mousse active, polisseuse. J'apporte tout, vous n'avez rien à prévoir." },
    { q: "Comment prendre rendez-vous ?", a: "Choisissez votre créneau en ligne en moins d'une minute. Vous recevrez une confirmation et l'événement s'ajoutera automatiquement à votre agenda." },
  ],
};
