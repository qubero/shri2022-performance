(() => {
  function bind(nodes, event, handler) {
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].addEventListener(event, handler);
    }
  }

  function makeTabs(node) {
    let selected = node.querySelector(".section__tab_active").dataset.id;
    const tabs = node.querySelectorAll(".section__tab");
    const list = Array.from(tabs).map((node) => node.dataset.id);
    const select = node.querySelector(".section__select");

    function selectTab(newId) {
      const newTab = node.querySelector(`.section__tab[data-id=${newId}]`);
      const newPanel = node.querySelector(`.section__panel[data-id=${newId}]`);
      const oldTab = node.querySelector(".section__tab_active");
      const oldPanel = node.querySelector(
        ".section__panel:not(.section__panel_hidden)"
      );

      selected = newId;

      oldTab.classList.remove("section__tab_active");
      oldTab.setAttribute("aria-selected", "false");
      oldTab.removeAttribute("tabindex");
      newTab.classList.add("section__tab_active");
      newTab.setAttribute("aria-selected", "true");
      newTab.setAttribute("tabindex", "0");
      newTab.focus({
        preventScroll: true,
      });

      oldPanel.classList.add("section__panel_hidden");
      oldPanel.setAttribute("aria-hidden", "true");
      newPanel.classList.remove("section__panel_hidden");
      newPanel.setAttribute("aria-hidden", "false");

      select.value = newId;
    }

    select.onchange = () => selectTab(select.value);

    bind(tabs, "click", (event) => {
      const newId = event.target.dataset.id;
      selectTab(newId);
    });

    bind(tabs, "keydown", (event) => {
      event.preventDefault();
      const { which } = event;

      if (
        !which ||
        which > 39 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      let index = list.indexOf(selected);
      const length = list.length;

      if (event.which === 37) {
        --index;
      } else if (event.which === 39) {
        ++index;
      }

      if (index >= length || which === 36) {
        index = 0;
      } else if (index < 0 || which === 35) {
        index = length - 1;
      }

      selectTab(list[index]);
    });
  }

  function makeMenu() {
    let expanded = false;
    const menu = document.querySelector(".header__menu");
    const links = document.querySelector(".header__links");

    menu.onclick = () => {
      expanded = !expanded;
      menu.setAttribute("aria-expanded", expanded ? "true" : "false");
      menu.querySelector(".header__menu-text").textContent = expanded
        ? "Закрыть меню"
        : "Открыть меню";
      links.classList.toggle("header__links_opened", expanded);
      links.classList.add("header__links-toggled");
    };
  }

  document.addEventListener("DOMContentLoaded", () => {
    for (const node of document.querySelectorAll(".main__devices")) {
      makeTabs(node);
    }
    makeMenu();
  });
})();
