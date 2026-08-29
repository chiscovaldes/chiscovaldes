(function () {
  const params = new URLSearchParams(window.location.search);
  const requestedLanguage = params.get("lang");
  const savedLanguage = (() => {
    try { return window.localStorage.getItem("post-glossary-language"); }
    catch (_) { return null; }
  })();
  const language = requestedLanguage === "en" || requestedLanguage === "es"
    ? requestedLanguage
    : savedLanguage === "en" ? "en" : "es";

  const copy = {
    es: {
      title: "POST//GLOSARIO",
      description: "Glosario claro, casual y útil de postproducción audiovisual.",
      brand: "NO TODO SE ARREGLA EN POST",
      tool: "HERRAMIENTA 03",
      eyebrow: "ANTES DE ASENTIR EN LA REUNIÓN",
      heading: "POST//<strong>GLOSARIO</strong>",
      intro: "Escribe ese término que alguien soltó como si todo el mundo supiera qué significaba.",
      searchLabel: "Buscar un término de postproducción",
      placeholder: "Prueba: conform, LUT, DCP…",
      clear: "Borrar búsqueda",
      actions: "Acciones rápidas",
      surprise: "Sorpréndeme",
      suggest: "Sugerir un término",
      essentials: "Términos esenciales",
      missingTitle: "No aparece.",
      missingBody: "Puede que sea demasiado específico, esté escrito de otra forma o alguien se lo haya inventado con mucha seguridad.",
      propose: "Proponer este término",
      conceptKicker: "CONEXIONES",
      conceptTitle: "Mapa de conceptos",
      conceptTrail: "Ruta de conceptos",
      conceptHint: "Abre una rama para seguir explorando.",
      conceptReset: "Volver al origen",
      conceptExplore: "Explorar",
      open: "POST//GLOSARIO ABIERTO",
      dialogTitle: "Sugiere un término",
      dialogClose: "Cerrar formulario",
      dialogIntro: "Las propuestas se revisan antes de publicarse. Si se aprueba, aparecerá con el crédito que indiques.",
      dialogFrame: "Formulario para sugerir un término",
      loading: "Cargando…",
      footer: "Si una palabra cambia el alcance, el calendario o la entrega, no es jerga: es una pregunta pendiente.",
      all: "Todo",
      plain: "Para gente normal",
      technical: "Definición técnica",
      resultFor: "Resultado para",
      oneTerm: "1 término",
      noTerms: "0 términos",
      locale: "es"
    },
    en: {
      title: "POST//GLOSSARY",
      description: "A clear, practical glossary of audiovisual post-production.",
      brand: "NOT EVERYTHING CAN BE FIXED IN POST",
      tool: "TOOL 03",
      eyebrow: "BEFORE NODDING ALONG IN THE MEETING",
      heading: "POST//<strong>GLOSSARY</strong>",
      intro: "Type the term someone dropped into the conversation as if everybody already knew what it meant.",
      searchLabel: "Search for a post-production term",
      placeholder: "Try: conform, LUT, DCP…",
      clear: "Clear search",
      actions: "Quick actions",
      surprise: "Surprise me",
      suggest: "Suggest a term",
      essentials: "Essential terms",
      missingTitle: "Nothing yet.",
      missingBody: "It may be very specific, spelled differently, or somebody may have invented it with impressive confidence.",
      propose: "Suggest this term",
      conceptKicker: "CONNECTIONS",
      conceptTitle: "Concept map",
      conceptTrail: "Concept trail",
      conceptHint: "Open a branch to keep exploring.",
      conceptReset: "Back to root",
      conceptExplore: "Explore",
      open: "OPEN POST//GLOSSARY",
      dialogTitle: "Suggest a term",
      dialogClose: "Close form",
      dialogIntro: "Suggestions are reviewed before publication. The submission form is currently in Spanish.",
      dialogFrame: "Form for suggesting a term",
      loading: "Loading…",
      footer: "If a word changes scope, schedule or delivery, it is not jargon: it is an unanswered question.",
      all: "All",
      plain: "In plain English",
      technical: "Technical definition",
      resultFor: "Result for",
      oneTerm: "1 term",
      noTerms: "0 terms",
      locale: "en"
    }
  };

  const ui = copy[language];
  const terms = language === "en"
    ? (window.POST_GLOSSARY_EN || [])
    : (window.POST_GLOSSARY || []);

  document.documentElement.lang = language;
  document.title = ui.title;
  document.querySelector('meta[name="description"]').setAttribute("content", ui.description);
  document.querySelector(".brand").textContent = ui.brand;
  document.querySelector(".tool-number").textContent = ui.tool;
  document.querySelector(".hero .eyebrow").textContent = ui.eyebrow;
  document.querySelector("#page-title").innerHTML = ui.heading;
  document.querySelector(".intro").textContent = ui.intro;
  document.querySelector('label[for="search"]').textContent = ui.searchLabel;
  document.querySelector("#search").placeholder = ui.placeholder;
  document.querySelector(".clear-search").setAttribute("aria-label", ui.clear);
  document.querySelector(".quick-actions").setAttribute("aria-label", ui.actions);
  document.querySelector(".surprise").textContent = ui.surprise;
  document.querySelectorAll(".suggest-term").forEach((button, index) => {
    button.textContent = index === 0 ? ui.suggest : ui.propose;
  });
  document.querySelector("#results-title").textContent = ui.essentials;
  document.querySelector(".empty-state strong").textContent = ui.missingTitle;
  document.querySelector(".empty-state p").textContent = ui.missingBody;
  document.querySelector(".concept-kicker").textContent = ui.conceptKicker;
  document.querySelector("#concept-map-title").textContent = ui.conceptTitle;
  document.querySelector(".concept-trail").setAttribute("aria-label", ui.conceptTrail);
  document.querySelector(".concept-hint").textContent = ui.conceptHint;
  document.querySelector(".concept-reset").textContent = ui.conceptReset;
  document.querySelector(".dialog-header .eyebrow").textContent = ui.open;
  document.querySelector("#suggestion-title").textContent = ui.dialogTitle;
  document.querySelector(".dialog-close").setAttribute("aria-label", ui.dialogClose);
  document.querySelector(".dialog-intro").textContent = ui.dialogIntro;
  document.querySelector(".suggestion-dialog iframe").setAttribute("title", ui.dialogFrame);
  document.querySelector(".suggestion-dialog iframe").textContent = ui.loading;
  document.querySelector("footer p").textContent = ui.footer;
  document.querySelector("footer span").textContent = `${ui.title} · v1.6.0`;

  document.querySelectorAll("[data-language]").forEach((button) => {
    const target = button.dataset.language;
    button.setAttribute("aria-pressed", target === language ? "true" : "false");
    button.addEventListener("click", () => {
      if (target === language) return;
      try { window.localStorage.setItem("post-glossary-language", target); }
      catch (_) {}
      const next = new URLSearchParams(window.location.search);
      next.set("lang", target);
      const query = document.querySelector("#search").value.trim();
      if (query) next.set("q", query); else next.delete("q");
      window.location.search = next.toString();
    });
  });

  const input = document.querySelector("#search");
  const searchForm = document.querySelector(".search-form");
  const clearButton = document.querySelector(".clear-search");
  const list = document.querySelector(".result-list");
  const empty = document.querySelector(".empty-state");
  const count = document.querySelector(".result-count");
  const heading = document.querySelector("#results-title");
  const results = document.querySelector(".results");
  const categories = document.querySelector(".categories");
  const surprise = document.querySelector(".surprise");
  const conceptMap = document.querySelector(".concept-map");
  const conceptTrail = document.querySelector(".concept-trail");
  const conceptStage = document.querySelector(".concept-stage");
  const conceptReset = document.querySelector(".concept-reset");
  const suggestionDialog = document.querySelector(".suggestion-dialog");
  const suggestionButtons = document.querySelectorAll(".suggest-term");
  const dialogClose = document.querySelector(".dialog-close");
  let activeCategory = ui.all;
  let conceptPath = [];
  let preserveConceptPath = false;

  const normalize = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  const escapeHtml = (value) => String(value || "").replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[character]);

  function highlight(value, query) {
    if (!query) return escapeHtml(value);
    const normalizedValue = normalize(value);
    const normalizedQuery = normalize(query);
    const index = normalizedValue.indexOf(normalizedQuery);
    if (index < 0) return escapeHtml(value);
    return `${escapeHtml(value.slice(0, index))}<mark>${escapeHtml(value.slice(index, index + query.length))}</mark>${escapeHtml(value.slice(index + query.length))}`;
  }

  const categoryNames = [ui.all, ...new Set(terms.map((item) => item.category))];

  categoryNames.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-button";
    button.textContent = category;
    button.setAttribute("aria-pressed", category === activeCategory ? "true" : "false");
    button.addEventListener("click", () => {
      activeCategory = category;
      categories.querySelectorAll("button").forEach((item) => {
        item.setAttribute("aria-pressed", item === button ? "true" : "false");
      });
      render();
    });
    categories.appendChild(button);
  });

  const simpleRoot = (value) => {
    const normalized = normalize(value);
    if (language === "es" && normalized.length > 5 && normalized.endsWith("es")) return normalized.slice(0, -2);
    if (normalized.length > 4 && normalized.endsWith("s")) return normalized.slice(0, -1);
    return normalized;
  };

  function relevance(item, query) {
    if (!query) return 1;
    const normalizedQuery = normalize(query);
    const queryRoot = simpleRoot(query);
    const term = normalize(item.term);
    const sourceTerm = normalize(item.sourceTerm);
    const aliases = (item.aliases || []).map(normalize);
    const directFields = [term, sourceTerm, ...aliases].filter(Boolean);
    const descriptiveText = normalize([item.category, item.definition, item.note].join(" "));
    const tokens = normalizedQuery.split(/\s+/).filter(Boolean);

    if (term === normalizedQuery || sourceTerm === normalizedQuery) return 100;
    if (aliases.includes(normalizedQuery)) return 95;
    if (simpleRoot(term) === queryRoot || aliases.some((alias) => simpleRoot(alias) === queryRoot)) return 90;
    if (term.startsWith(normalizedQuery) || sourceTerm.startsWith(normalizedQuery)) return 80;
    if (aliases.some((alias) => alias.startsWith(normalizedQuery))) return 75;
    if (term.includes(normalizedQuery) || sourceTerm.includes(normalizedQuery)) return 70;
    if (aliases.some((alias) => alias.includes(normalizedQuery))) return 65;
    if (tokens.length > 1 && tokens.every((token) => directFields.some((field) => field.includes(token)))) return 60;
    if (descriptiveText.includes(normalizedQuery)) return 30;
    if (tokens.length > 1 && tokens.every((token) => descriptiveText.includes(token))) return 20;
    return 0;
  }

  function createCard(item, query) {
    const article = document.createElement("article");
    article.className = "term-card";
    article.innerHTML = `
      <div>
        <h3 class="term-heading"><button type="button" aria-label="${escapeHtml(ui.searchLabel)}: ${escapeHtml(item.term)}">${highlight(item.term, query)}</button></h3>
        <span class="term-category">${escapeHtml(item.category)}</span>
      </div>
      <div>
        <p class="term-simple"><strong>${ui.plain}</strong>${highlight(item.note, query)}</p>
        <p class="term-technical"><strong>${ui.technical}</strong>${highlight(item.definition, query)}</p>
      </div>`;
    article.querySelector("button").addEventListener("click", () => {
      input.value = item.term;
      conceptPath = [];
      render();
      input.focus();
    });
    return article;
  }

  const stopWords = new Set(language === "en"
    ? ["about","after","also","because","between","colour","color","every","file","from","image","into","more","other","project","that","their","these","this","used","video","which","with"]
    : ["para","como","esta","este","desde","entre","sobre","cada","todo","todos","todas","archivo","imagen","video","proyecto","permite","puede","forma"]);

  function relatedTerms(anchor, visibleItems) {
    if (!anchor) return [];
    const visibleNames = new Set(visibleItems.map((item) => item.term));
    const anchorWords = new Set(normalize([anchor.term, ...(anchor.aliases || []), anchor.definition].join(" "))
      .split(/\s+/)
      .filter((word) => word.length > 4 && !stopWords.has(word)));

    return terms
      .filter((item) => item.term !== anchor.term && !visibleNames.has(item.term))
      .map((item) => {
        const candidateWords = normalize([item.term, ...(item.aliases || []), item.definition].join(" ")).split(/\s+/);
        const sharedWords = candidateWords.filter((word) => anchorWords.has(word)).length;
        return { item, score: (item.category === anchor.category ? 20 : 0) + sharedWords };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.item.term.localeCompare(b.item.term, ui.locale))
      .slice(0, 6)
      .map(({ item }) => item);
  }

  const canonicalName = (item) => item ? (item.sourceTerm || item.term) : "";

  function termFromCanonical(name) {
    return terms.find((item) => canonicalName(item) === name);
  }

  function conceptTerms(anchor) {
    if (!anchor) return [];
    const relations = window.POST_CONCEPT_RELATIONS || {};
    const curated = (relations[canonicalName(anchor)] || [])
      .map(termFromCanonical)
      .filter(Boolean);
    const fallback = relatedTerms(anchor, [anchor]);
    const unique = new Map();
    [...curated, ...fallback].forEach((item) => {
      if (canonicalName(item) !== canonicalName(anchor)) unique.set(canonicalName(item), item);
    });
    return [...unique.values()].slice(0, 6);
  }

  function setActiveCategoryToAll() {
    activeCategory = ui.all;
    categories.querySelectorAll("button").forEach((button, index) => {
      button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
    });
  }

  function openConcept(item, path) {
    conceptPath = path;
    preserveConceptPath = true;
    input.value = item.term;
    setActiveCategoryToAll();
    render();
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function createConceptButton(item, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.setAttribute("aria-label", `${ui.conceptExplore}: ${item.term}`);
    button.innerHTML = `<strong>${escapeHtml(item.term)}</strong><span>${escapeHtml(item.category)}</span>`;
    return button;
  }

  function renderConceptMap(anchor) {
    if (!anchor) {
      conceptTrail.replaceChildren();
      conceptStage.replaceChildren();
      conceptMap.hidden = true;
      return;
    }

    const current = canonicalName(anchor);
    if (!preserveConceptPath || conceptPath.length === 0 || conceptPath.at(-1) !== current) {
      conceptPath = [current];
    }
    preserveConceptPath = false;

    const suggestions = conceptTerms(anchor);
    const trailButtons = conceptPath.map((name, index) => {
      const item = termFromCanonical(name);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "concept-trail-node";
      button.textContent = item ? item.term : name;
      button.setAttribute("aria-current", index === conceptPath.length - 1 ? "true" : "false");
      button.addEventListener("click", () => {
        if (item) openConcept(item, conceptPath.slice(0, index + 1));
      });
      return button;
    });
    conceptTrail.replaceChildren(...trailButtons);

    const root = createConceptButton(anchor, "concept-node concept-root");
    root.disabled = true;
    const trunk = document.createElement("div");
    trunk.className = "concept-trunk";
    trunk.setAttribute("aria-hidden", "true");
    const branches = document.createElement("div");
    branches.className = "concept-branches";
    branches.setAttribute("role", "list");

    suggestions.forEach((item, index) => {
      const branch = document.createElement("div");
      branch.className = "concept-branch";
      branch.setAttribute("role", "listitem");
      branch.style.setProperty("--branch-index", index);
      const button = createConceptButton(item, "concept-node concept-child");
      button.addEventListener("click", () => {
        const name = canonicalName(item);
        const existing = conceptPath.indexOf(name);
        const nextPath = existing >= 0
          ? conceptPath.slice(0, existing + 1)
          : [...conceptPath, name];
        openConcept(item, nextPath);
      });
      branch.appendChild(button);
      branches.appendChild(branch);
    });

    conceptStage.replaceChildren(root, trunk, branches);
    conceptReset.hidden = conceptPath.length < 2;
    conceptMap.hidden = suggestions.length === 0;
  }

  function updateUrl(query) {
    const next = new URLSearchParams(window.location.search);
    next.set("lang", language);
    if (query) next.set("q", query); else next.delete("q");
    const suffix = next.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${suffix ? `?${suffix}` : ""}`);
  }

  function render() {
    const query = input.value.trim();
    clearButton.hidden = !query;
    const hasQuery = Boolean(query);
    document.body.classList.toggle("has-results", hasQuery);
    results.hidden = !hasQuery;
    categories.hidden = !hasQuery;
    updateUrl(query);

    if (!hasQuery) {
      list.replaceChildren();
      conceptPath = [];
      renderConceptMap(null);
      return;
    }

    const filtered = terms
      .filter((item) => activeCategory === ui.all || item.category === activeCategory)
      .map((item) => ({ item, score: relevance(item, query) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.item.term.localeCompare(b.item.term, ui.locale))
      .map(({ item }) => item);

    const visible = filtered.slice(0, 1);
    list.replaceChildren(...visible.map((item) => createCard(item, query)));
    empty.hidden = filtered.length !== 0;
    list.hidden = filtered.length === 0;
    count.textContent = filtered.length ? ui.oneTerm : ui.noTerms;
    heading.textContent = `${ui.resultFor} “${query}”`;
    renderConceptMap(filtered[0]);
  }

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });

  input.addEventListener("input", () => {
    if (input.value.trim() && activeCategory !== ui.all) {
      activeCategory = ui.all;
      categories.querySelectorAll("button").forEach((button, index) => {
        button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
      });
    }
    render();
  });

  clearButton.addEventListener("click", () => {
    input.value = "";
    activeCategory = ui.all;
    conceptPath = [];
    render();
    input.focus();
  });

  surprise.addEventListener("click", () => {
    const item = terms[Math.floor(Math.random() * terms.length)];
    input.value = item.term;
    conceptPath = [];
    render();
    results.scrollIntoView({ behavior: "smooth" });
  });

  suggestionButtons.forEach((button) => {
    button.addEventListener("click", () => suggestionDialog.showModal());
  });
  dialogClose.addEventListener("click", () => suggestionDialog.close());
  suggestionDialog.addEventListener("click", (event) => {
    if (event.target === suggestionDialog) suggestionDialog.close();
  });

  conceptReset.addEventListener("click", () => {
    const item = termFromCanonical(conceptPath[0]);
    if (item) openConcept(item, [conceptPath[0]]);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && document.activeElement !== input) {
      event.preventDefault();
      input.focus();
    }
    if (event.key === "Escape" && !suggestionDialog.open) {
      input.value = "";
      render();
      input.blur();
    }
  });

  input.value = params.get("q") || "";
  render();
})();
