(function () {
  let isHydrating = false;
  console.log("[typograms-preview] adapter loaded");

  function createTypogramScript(sourceElement) {
    const pre = sourceElement.querySelector("pre");
    const source = pre ? pre.textContent ?? "" : "";
    const script = document.createElement("script");
    script.type = "text/typogram";
    script.textContent = `\n${source.replace(/\n+$/, "")}\n`;
    return script;
  }

  function hydrateTypograms() {
    if (isHydrating) {
      return;
    }
    isHydrating = true;

    console.log("[typograms-preview] hydrating typograms blocks");
    const placeholders = document.querySelectorAll(
      ".typograms-source[data-typograms-block='true']:not([data-typograms-ready='true'])"
    );
    console.log("[typograms-preview] placeholders found:", placeholders.length);

    for (const placeholder of placeholders) {
      const script = createTypogramScript(placeholder);
      placeholder.insertAdjacentElement("afterend", script);
      placeholder.setAttribute("data-typograms-ready", "true");
    }

    if (placeholders.length > 0) {
      console.log("[typograms-preview] triggering typograms DOMContentLoaded listener");
      setTimeout(function () {
        document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true }));
        finalizeRendering();
        isHydrating = false;
      }, 0);
    } else {
      finalizeRendering();
      isHydrating = false;
    }
  }

  function finalizeRendering() {
    const ready = document.querySelectorAll(
      ".typograms-source[data-typograms-block='true'][data-typograms-ready='true']"
    );

    let renderedCount = 0;
    let fallbackCount = 0;

    for (const placeholder of ready) {
      const script = placeholder.nextElementSibling;
      const svg = script?.nextElementSibling;

      if (
        script &&
        script.tagName === "SCRIPT" &&
        script.getAttribute("type") === "text/typogram" &&
        svg &&
        svg.tagName.toLowerCase() === "svg"
      ) {
        placeholder.setAttribute("data-typograms-rendered", "true");
        script.setAttribute("disabled", "");
        renderedCount += 1;
      } else {
        fallbackCount += 1;
      }
    }

    console.log("[typograms-preview] rendered:", renderedCount, "fallback:", fallbackCount);
  }

  const observer = new MutationObserver(function () {
    if (
      document.querySelector(
        ".typograms-source[data-typograms-block='true']:not([data-typograms-ready='true'])"
      )
    ) {
      hydrateTypograms();
    }
  });

  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hydrateTypograms);
  } else {
    hydrateTypograms();
  }
})();