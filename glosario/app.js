(function () {
  const terms = window.POST_GLOSSARY || [];
  const input = document.querySelector("#search");
  const searchForm = document.querySelector(".search-form");
  const clearButton = document.querySelector(".clear-search");
  const list = document.querySelector(".result-list");
  const empty = document.querySelector(".empty-state");
  const count = document.querySelector(".result-count");
  const heading = document.querySelector("#results-title");
  const categories = document.querySelector(".categories");
  const surprise = document.querySelector(".surprise");
  const showAll = document.querySelector(".show-all");
  let activeCategory = "Todo";
  let showEverything = false;

  const normalize = (value) => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  const escapeHtml = (value) => value.replace(/[&<>'"]/g, (character) => ({
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

  const categoryNames = ["Todo", ...new Set(terms.map((item) => item.category))];

  categoryNames.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-button";
    button.textContent = category;
    button.setAttribute("aria-pressed", category === activeCategory ? "true" : "false");
    button.addEventListener("click", () => {
      activeCategory = category;
      showEverything = true;
      categories.querySelectorAll("button").forEach((item) => item.setAttribute("aria-pressed", item === button ? "true" : "false"));
      render();
    });
    categories.appendChild(button);
  });

  const simpleRoot = (value) => {
    const normalized = normalize(value);
    if (normalized.length > 5 && normalized.endsWith("es")) return normalized.slice(0, -2);
    if (normalized.length > 4 && normalized.endsWith("s")) return normalized.slice(0, -1);
    return normalized;
  };

  function relevance(item, query) {
    if (!query) return 1;

    const normalizedQuery = normalize(query);
    const queryRoot = simpleRoot(query);
    const term = normalize(item.term);
    const aliases = (item.aliases || []).map(normalize);
    const directFields = [term, ...aliases];
    const descriptiveText = normalize([item.category, item.definition, item.note].join(" "));
    const tokens = normalizedQuery.split(/\s+/).filter(Boolean);

    if (term === normalizedQuery) return 100;
    if (aliases.includes(normalizedQuery)) return 95;
    if (simpleRoot(term) === queryRoot || aliases.some((alias) => simpleRoot(alias) === queryRoot)) return 90;
    if (term.startsWith(normalizedQuery)) return 80;
    if (aliases.some((alias) => alias.startsWith(normalizedQuery))) return 75;
    if (term.includes(normalizedQuery)) return 70;
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
        <h3 class="term-heading"><button type="button" aria-label="Buscar ${escapeHtml(item.term)}">${highlight(item.term, query)}</button></h3>
        <span class="term-category">${escapeHtml(item.category)}</span>
      </div>
      <div>
        <p class="term-definition">${highlight(item.definition, query)}</p>
        <p class="term-note"><strong>Para gente normal:</strong> ${highlight(item.note, query)}</p>
      </div>`;
    article.querySelector("button").addEventListener("click", () => {
      input.value = item.term;
      showEverything = true;
      render();
      input.focus();
    });
    return article;
  }

  function render() {
    const query = input.value.trim();
    clearButton.hidden = !query;
    const filtered = terms
      .filter((item) => activeCategory === "Todo" || item.category === activeCategory)
      .map((item) => ({ item, score: relevance(item, query) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.item.term.localeCompare(b.item.term, "es"))
      .map(({ item }) => item);

    const visible = query || showEverything || activeCategory !== "Todo" ? filtered : filtered.slice(0, 7);
    list.replaceChildren(...visible.map((item) => createCard(item, query)));
    empty.hidden = filtered.length !== 0;
    list.hidden = filtered.length === 0;
    count.textContent = `${filtered.length} ${filtered.length === 1 ? "término" : "términos"}`;
    heading.textContent = query ? `Resultados para «${query}»` : (activeCategory === "Todo" ? (showEverything ? "Todos los términos" : "Términos esenciales") : activeCategory);
  }

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showEverything = true;
    render();
  });

  input.addEventListener("input", () => {
    if (input.value.trim() && activeCategory !== "Todo") {
      activeCategory = "Todo";
      categories.querySelectorAll("button").forEach((button, index) => button.setAttribute("aria-pressed", index === 0 ? "true" : "false"));
    }
    showEverything = true;
    render();
  });
  clearButton.addEventListener("click", () => { input.value = ""; showEverything = false; render(); input.focus(); });
  showAll.addEventListener("click", () => { input.value = ""; activeCategory = "Todo"; showEverything = true; categories.querySelectorAll("button").forEach((button, index) => button.setAttribute("aria-pressed", index === 0 ? "true" : "false")); render(); document.querySelector(".results").scrollIntoView({ behavior: "smooth" }); });
  surprise.addEventListener("click", () => { const item = terms[Math.floor(Math.random() * terms.length)]; input.value = item.term; showEverything = true; render(); document.querySelector(".results").scrollIntoView({ behavior: "smooth" }); });

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && document.activeElement !== input) { event.preventDefault(); input.focus(); }
    if (event.key === "Escape") { input.value = ""; showEverything = false; render(); input.blur(); }
  });

  render();
})();
