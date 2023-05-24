import matchText from "./utils/match";
import UI from "./utils/ui";
import fileNames from "./utils/data";

const ESCAPE_KEYCODE = 27;

export default class Undraw extends UI {
  constructor(editor, opts = {}) {
    super(editor, opts);

    /* Set initial app state */
    this.state = {
      svgId: "",
      svgs: [...fileNames],
      visible: [],
      filterText: "",
      loading: false,
    };
  }

  async onRender() {
    /* Set request loading state */
    this.setState({
      loading: true,
    });

    // Do stuff when UI is loaded here

    /* Set svgs and turn off loading state */
    this.setState({
      loading: false,
    });
  }

  handleFilterInput = (e) => {
    this.setState({
      filterText: e.target.value,
    });
  };

  handleFilterInputEscape = ({ keyCode }) => {
    if (keyCode === ESCAPE_KEYCODE) {
      this.setState({
        filterText: "",
      });
    }
  };

  insertSvg = async () => {
    const {
      editor,
      opts: { undrawEndpoint, undrawError, target, at },
      state: { svgId },
    } = this;
    const toReplace = target || editor.getSelected();
    try {
      const res = await fetch(undrawEndpoint + svgId);
      if (res.ok) {
        const svg = await res.text();
        if (at) editor.addComponents(svg, { at });
        else if (toReplace) toReplace.replaceWith(svg);
        else editor.addComponents(svg);
      } else {
        undrawError("Not found");
      }
    } catch (error) {
      undrawError("Fetch error", error);
    }
    editor.Modal.close();
  };

  renderSvgList() {
    const { filterText, loading } = this.state;
    const {
      opts: { undrawEndpoint },
    } = this;

    if (loading) return this.opts.loader || `<div>Loading svgs...</div>`;

    let matchingSvgs = [...fileNames].filter((svg) => {
      // No search query. Show all
      if (!filterText) {
        return true;
      }

      const { image, title, tags } = svg;
      if (
        matchText(filterText, image) ||
        matchText(filterText, title) ||
        matchText(filterText, tags)
      ) {
        return true;
      }

      // no match!
      return false;
    });

    this.svgs = [...matchingSvgs];

    this.visible = matchingSvgs.slice(0, 15);

    this.hasMore();

    if (!this.visible.length) {
      return `<div>
        <h3>
          No '${filterText}' examples found. Clear your search and try again.
        </h3>
      </div>`;
    }

    return this.visible
      .map((svg, i) => {
        const { title, tags, image } = svg;
        return `<div class="svg-wrapper" key="${i}" data-id="${image}" title="Follow image link">
          <div class="svg-screenshot">
            <a href="${
              undrawEndpoint + image
            }" target="_blank" rel="noopener noreferrer">
              <img src="${undrawEndpoint + image}" alt="${image}" />
            </a>
          </div>
          <div class="svg-info">
            <h2>
              <a href="${
                undrawEndpoint + image
              }" target="_blank" rel="noopener noreferrer">
                ${title.slice(0, 16)}
              </a>
            </h2>
            <div class="svg-meta" title="${tags}">
              <a href="#" target="_blank" rel="noopener noreferrer">
                ${tags.slice(0, 30)}...
              </a>
            </div>
          </div>
        </div>`;
      })
      .join("\n");
  }

  hasMore() {
    if (this.visible >= this.svgs) this.$loadMore?.hide();
    else this.$loadMore?.show();
  }

  loadMore = () => {
    this.addSvgs(
      this.svgs.slice(this.visible.length, this.visible.length + 15)
    );
    this.hasMore();
  };

  addSvgs(svgs) {
    const {
      $,
      opts: { undrawEndpoint },
    } = this;
    this.setStateSilent({ visible: [...this.visible, ...svgs] });

    const $svgs = $(
      svgs
        .map((svg, i) => {
          const { title, tags, image } = svg;
          return `<div class="svg-wrapper" key="${i}" data-id="${image}" title="Follow image link">
            <div class="svg-screenshot">
              <a href="${
                undrawEndpoint + image
              }" target="_blank" rel="noopener noreferrer">
                <img src="${undrawEndpoint + image}" alt="${image}" />
              </a>
            </div>
            <div class="svg-info">
              <h2>
                <a href="${
                  undrawEndpoint + image
                }" target="_blank" rel="noopener noreferrer">
                  ${title.slice(0, 16)}
                </a>
              </h2>
              <div class="svg-meta" title="${tags}">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  ${tags.slice(0, 30)}...
                </a>
              </div>
            </div>
          </div>`;
        })
        .join("\n")
    );
    this.$el?.find("#svg-list").append($svgs);
    const svgEls = this.$el?.find(".svg-wrapper");
    if (svgEls) {
      svgEls.on("click", (e) => {
        svgEls.removeClass("selected");
        this.$(e.currentTarget).addClass("selected");
        this.setStateSilent({ svgId: e.currentTarget.dataset.id });
      });
    }
  }

  update() {
    this.$el?.find("#svg-list").html(this.renderSvgList());
    const svgs = this.$el?.find(".svg-wrapper");
    this.setStateSilent({ projectId: "" });
    if (svgs) {
      svgs.on("click", (e) => {
        svgs.removeClass("selected");
        this.$(e.currentTarget).addClass("selected");
        this.setStateSilent({ svgId: e.currentTarget.dataset.id });
      });
    }
  }

  render() {
    const { $ } = this;

    // Do stuff on render
    this.onRender();
    this.$el?.remove();

    /* Show admin UI */
    const cont = $(`<div class="app">
      <div class="contents">
        <div class="flex-row">
            <input
                class="search"
                placeholder="Search for svgs by name, title or tags"
            />
            <button id="undraw-use" class="primary-button">
                Set SVG
            </button>
        </div>
        <div id="svg-list">
        </div>
        <div id="load-more-container">
          <button id="undraw-load-more" class="primary-button">
            Load More
          </button>
        </div>
        <div class="svg-meta">
            <a href="https://undraw.co/illustrations" target="_blank" rel="noopener noreferrer">
              Official Undraw Illustrations
            </a>
          </div>
      </div>
    </div>`);
    // Add undraw infos
    cont.find("#undraw-use").on("click", this.insertSvg);
    cont.find("#undraw-load-more").on("click", this.loadMore);
    cont.find("input").on("change", this.handleFilterInput);
    cont.find("input").on("keydown", this.handleFilterInputEscape);

    this.$loadMore = cont.find("#undraw-load-more");
    this.$el = cont;
    this.update();
    return cont;
  }
}
