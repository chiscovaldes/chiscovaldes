(function () {
  const terms = window.POST_GLOSSARY || [];
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
  const related = document.querySelector(".related");
  const relatedList = document.querySelector(".related-list");
  const suggestionDialog = document.querySelector(".suggestion-dialog");
  const suggestionButtons = document.querySelectorAll(".suggest-term");
  const dialogClose = document.querySelector(".dialog-close");
  let activeCategory = "Todo";

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
        <p class="term-simple"><strong>Para gente normal</strong>${highlight(item.note, query)}</p>
        <p class="term-technical"><strong>Definición técnica</strong>${highlight(item.definition, query)}</p>
      </div>`;
    article.querySelector("button").addEventListener("click", () => {
      input.value = item.term;
      render();
      input.focus();
    });
    return article;
  }

  const stopWords = new Set(["para", "como", "esta", "este", "desde", "entre", "sobre", "cada", "todo", "todos", "todas", "archivo", "imagen", "video", "proyecto", "permite", "puede", "forma"]);

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
      .sort((a, b) => b.score - a.score || a.item.term.localeCompare(b.item.term, "es"))
      .slice(0, 6)
      .map(({ item }) => item);
  }

  function renderRelated(anchor, visibleItems) {
    const suggestions = relatedTerms(anchor, visibleItems);
    relatedList.replaceChildren(...suggestions.map((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "related-term";
      button.innerHTML = `<strong>${escapeHtml(item.term)}</strong><span>${escapeHtml(item.category)}</span>`;
      button.addEventListener("click", () => {
        input.value = item.term;
        activeCategory = "Todo";
        render();
        results.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return button;
    }));
    related.hidden = suggestions.length === 0;
  }

  function render() {
    const query = input.value.trim();
    clearButton.hidden = !query;
    const hasQuery = Boolean(query);
    document.body.classList.toggle("has-results", hasQuery);
    results.hidden = !hasQuery;
    categories.hidden = !hasQuery;

    if (!hasQuery) {
      list.replaceChildren();
      relatedList.replaceChildren();
      related.hidden = true;
      empty.hidden = true;
      return;
    }

    const filtered = terms
      .filter((item) => activeCategory === "Todo" || item.category === activeCategory)
      .map((item) => ({ item, score: relevance(item, query) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.item.term.localeCompare(b.item.term, "es"))
      .map(({ item }) => item);

    const visible = filtered.slice(0, 1);
    list.replaceChildren(...visible.map((item) => createCard(item, query)));
    empty.hidden = filtered.length !== 0;
    list.hidden = filtered.length === 0;
    count.textContent = filtered.length ? "1 término" : "0 términos";
    heading.textContent = `Resultado para «${query}»`;
    renderRelated(filtered[0], visible);
  }

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });

  input.addEventListener("input", () => {
    if (input.value.trim() && activeCategory !== "Todo") {
      activeCategory = "Todo";
      categories.querySelectorAll("button").forEach((button, index) => button.setAttribute("aria-pressed", index === 0 ? "true" : "false"));
    }
    render();
  });
  clearButton.addEventListener("click", () => { input.value = ""; activeCategory = "Todo"; render(); input.focus(); });
  surprise.addEventListener("click", () => { const item = terms[Math.floor(Math.random() * terms.length)]; input.value = item.term; render(); results.scrollIntoView({ behavior: "smooth" }); });

  suggestionButtons.forEach((button) => button.addEventListener("click", () => suggestionDialog.showModal()));
  dialogClose.addEventListener("click", () => suggestionDialog.close());
  suggestionDialog.addEventListener("click", (event) => {
    if (event.target === suggestionDialog) suggestionDialog.close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && document.activeElement !== input) { event.preventDefault(); input.focus(); }
    if (event.key === "Escape" && !suggestionDialog.open) { input.value = ""; render(); input.blur(); }
  });

  render();
})();
