/* Una función que se utiliza para almacenar datos en el almacenamiento local del navegador. */
const useLS = {
  check: function () {
    return "localStorage" in window;
  },
  set: function (key, value) {
    if (!key || !value) {
      return;
    }

    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    this.check() && window.localStorage.setItem(key, value);
  },
  get: function (key) {
    let value = this.check() ? window.localStorage.getItem(key) : null;

    if (!value) {
      return;
    }

    // Suponga que es un objeto que ha sido convertido en string
    if (value[0] === "{" || value[0] === "[") {
      value = JSON.parse(value);
    }
    return value;
  },
  c: function () {
    this.check() && window.localStorage.clear();
  },
};

const V = (_) => document.querySelector(_);
const Vall = (_) => document.querySelectorAll(_);
/**
 * Si el primer argumento es una instancia de HTMLElement, entonces agregue un oyente de eventos.
 * @param {HTMLElement} el - El elemento al que desea agregar el evento.
 * @param {string} typeevent - El tipo de evento.
 * @param {function} callback - La función a llamar cuando se activa el evento.
 */
const on = (el, typeevent, callback) => {
  el && el.addEventListener(typeevent, (...e) => callback(e));
};
/**
 * Si el primer argumento es un Nodelist, y tiene una longitud mayor que cero, entonces para cada elemento en
 * la Nodelist, agregue un oyente del evento al elemento y cuando se active el evento, llame al
 * función de devolución de llamada con el evento como argumento.
 * @param {NodeList} el - El elemento al que desea agregar el evento.
 * @param {string} typeevent - El tipo de evento.
 * @param {function} callback  - La función a llamar cuando ocurre el evento.
 */
const onforEach = (el, typeevent, callback) => {
  el instanceof NodeList &&
    el.length > 0 &&
    el.forEach((temp) =>
      temp.addEventListener(typeevent, (...e) => callback(e))
    );
};

export { useLS, V, Vall, on, onforEach };
