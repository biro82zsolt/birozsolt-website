(function(){
  try {
    // Cheat kódok + üzenetek
    const CHEATS = {
  // Doom
  iddqd: {
    hu: "Az életben nincs halhatatlanság, de a sebezhetőségünk tesz emberré.",
    en: "There is no god mode in life – our vulnerability makes us human."
  },
  idkfa: {
    hu: "Nincsenek instant fegyverkészletek, az erőfeszítés adja a fejlődést.",
    en: "No instant arsenal – growth comes from effort."
  },

  // Konami
  konami: {
    hu: "A Konami-kód sok extra életet adott – itt az életben csak egy van, vigyázz rá!",
    en: "The Konami code gave many extra lives – in real life you only get one, take care of it!"
  },

  // GTA
  hesoyam: {
    hu: "Nincs gyorspénz és instant erőforrás – a munka és a kitartás az igazi cheat.",
    en: "No quick cash or instant resources – persistence is the real cheat code."
  },
  rocketman: {
    hu: "A jetpackkel azonnal felszállhattál – az életben lépésről lépésre emelkedünk.",
    en: "The jetpack gave instant flight – in life we rise step by step."
  },
  aspirine: {
    hu: "Instant gyógyulás nincs – a sebek begyógyulásához idő kell.",
    en: "No instant healing – wounds in life take time to recover."
  },
  panzer: {
    hu: "Egy tankkal könnyű átgázolni – de az életben az empátia sokkal erősebb fegyver.",
    en: "A tank crushes everything – but in life, empathy is a stronger weapon."
  },

  // StarCraft
  blacksheepwall: {
    hu: "Nem tárul fel előre az egész pálya – a bizonytalanság a felfedezés része.",
    en: "The whole map won’t reveal itself – uncertainty is part of discovery."
  },
  showmethemoney: {
    hu: "Nem hull az öledbe minden – a siker értékét a befektetett energia adja.",
    en: "Things don’t just fall into your lap – effort gives success its value."
  },

  // Age of Empires
  bigdaddy: {
    hu: "Egy gépfegyveres autó vicces a játékban – az életben a hatalommal felelősség jár.",
    en: "A car with a machine gun is fun in a game – in real life power comes with responsibility."
  },

  // Mortal Kombat
  abacabb: {
    hu: "A titkok felfedhetik az erőt – de az életben a sötétebb oldallal is meg kell birkóznunk.",
    en: "Secrets may unlock power – but in life we must also face the darker side."
  },
  fatality: {
    hu: "A pontos sorrend számít a győzelemhez – az életben a tudatos lépések vezetnek célhoz.",
    en: "Precise sequences win the fight – in life, mindful steps lead to success."
  },

  // Mario
  warpzone: {
    hu: "Kihagyhatjuk a szinteket egy warp zónával – de az életben a kihívásokat nem lehet átugrani.",
    en: "Warp zones let you skip levels – but in life you can’t skip the challenges."
  },
  oneup: {
    hu: "Végtelen élet jól jön a játékban – de itt egyetlen életünk van, ami értékes.",
    en: "Infinite lives help in games – but here we only get one life, and it’s precious."
  },

  // Street Fighter
  hadouken: {
    hu: "Az energia akkor tör elő, ha jól irányítjuk a mozdulatainkat.",
    en: "Energy is released when we control our moves with precision."
  },

  // The Sims
  rosebud: {
    hu: "A pénz cheat megkönnyíti a játékot – de az élet értékét nem a Simoleon adja.",
    en: "Money cheats make The Sims easy – but real life’s value isn’t measured in Simoleons."
  },

  // Diablo II
  players8: {
    hu: "Néha mi magunk tesszük nehezebbé az utat – és ezzel erősebbé válunk.",
    en: "Sometimes we make the game harder for ourselves – and by that we grow stronger."
  },

  // Klasszikus szöveges játék
  xyzzy: {
    hu: "A varázsszavak játékban működnek – az életben a cselekvés a kulcs.",
    en: "Magic words work in games – in life action is the real magic."
  }
};


    let buffer = "";

    window.addEventListener("keydown", (e) => {
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || e.target.isContentEditable) return;

      buffer += e.key.toLowerCase();
      buffer = buffer.slice(-20); // nagyobb puffer, hogy biztos benne legyen

      for (const code in CHEATS) {
        if (buffer.includes(code)) {
          showEasterEgg(code);
          buffer = "";
          break;
        }
      }
    });

    function getLocale(){
      const htmlLang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
      if (htmlLang.startsWith("hu")) return "hu";
      if (htmlLang.startsWith("en")) return "en";
      const nav = (navigator.language || "").toLowerCase();
      return nav.startsWith("hu") ? "hu" : "en";
    }

    function showEasterEgg(code){
      const locale = getLocale();
      const text = CHEATS[code][locale] || CHEATS[code].en;

      const overlay = document.createElement("div");
      overlay.className = "easteregg-overlay";
      const dialog = document.createElement("div");
      dialog.className = "easteregg-popup";
      dialog.innerHTML = `
        <h2 class="easteregg-title">🎮 Cheat code: ${code.toUpperCase()}</h2>
        <p class="easteregg-text">${text}</p>
        <div class="easteregg-actions">
          <button type="button" class="easteregg-btn">${locale === "hu" ? "Oké" : "Okay"}</button>
        </div>
      `;
      overlay.appendChild(dialog);
      document.body.appendChild(overlay);

      const btn = dialog.querySelector("button");
      btn.addEventListener("click", () => overlay.remove());
      overlay.addEventListener("click", (ev) => { if (ev.target === overlay) overlay.remove(); });
    }
  } catch (err) {
    console.warn("Easter egg error:", err);
  }
})();
