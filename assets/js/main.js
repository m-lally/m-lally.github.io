(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);

    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    "#navbar .nav-link",
    function (e) {
      let section = select(this.hash);
      if (section) {
        e.preventDefault();

        let navbar = select("#navbar");
        let header = select("#header");
        let sections = select("section", true);
        let navlinks = select("#navbar .nav-link", true);

        navlinks.forEach((item) => {
          item.classList.remove("active");
        });

        this.classList.add("active");

        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }

        if (this.hash == "#header") {
          header.classList.remove("header-top");
          sections.forEach((item) => {
            item.classList.remove("section-show");
          });
          return;
        }

        if (!header.classList.contains("header-top")) {
          header.classList.add("header-top");
          setTimeout(function () {
            sections.forEach((item) => {
              item.classList.remove("section-show");
            });
            section.classList.add("section-show");
          }, 350);
        } else {
          sections.forEach((item) => {
            item.classList.remove("section-show");
          });
          section.classList.add("section-show");
        }

        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash);

      if (initial_nav) {
        let header = select("#header");
        let navlinks = select("#navbar .nav-link", true);

        header.classList.add("header-top");

        navlinks.forEach((item) => {
          if (item.getAttribute("href") == window.location.hash) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });

        setTimeout(function () {
          initial_nav.classList.add("section-show");
        }, 350);

        scrollto(window.location.hash);
      }
    }
  });

  /**
  * Skills animation
  */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   *  Word Cloud
   */

  var words = $('#tagi text'),
    l = words.length,
    current = null,
    delay = 2000;

  function clearBlink(o) {
    var
      ca = o.getAttribute('class').split(' '),
      i = ca.indexOf('blink');

    if (i !== -1) {
      ca.splice(i, 1);
      o.setAttribute('class', ca.join(' '));
    }
  }

  function addBlink(o) {
    var
      ca = o.getAttribute('class').split(' ');
    ca.push('blink');
    o.setAttribute('class', ca.join(' '));
  }

  function wordblink() {

    var e;

    if (current !== null) {
      clearBlink(words.eq(current)[0])
    }

    current = Math.floor(Math.random() * l);
    e = words.eq(current);
    addBlink(e[0]);

    setTimeout(wordblink, delay);
  }

  wordblink();

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  // Handle the form
  var form = document.getElementById("my-form");

  async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          notie.alert({
            type: 1,
            text: "Thankyou! Your message has been sent.",
            position: "bottom",
            time: 6,
          });
          form.reset();
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              notie.alert({
                type: 1,
                text: "Sorry, something has gone wrong, please try again. Alternatively, schedule a meeting with me from the home page or send me an email.",
                position: "bottom",
                time: 10,
              });
            } else {
              notie.alert({
                type: 1,
                text: "Sorry, something has gone wrong, please try again. Alternatively, schedule a meeting with me from the home page or send me an email.",
                position: "bottom",
                time: 10,
              });
            }
          });
        }
      })
      .catch((error) => {
        notie.alert({
          type: 1,
          text: "Sorry, something has gone wrong, please try again. Alternatively, schedule a meeting with me from the home page or send me an email.",
          position: "bottom",
          time: 10,
        });
      });
  }
  form.addEventListener("submit", handleSubmit);
})();
