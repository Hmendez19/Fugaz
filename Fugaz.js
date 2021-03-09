const Fugaz = (function () {
  var _root;
  var _templateCallback;
  var hooks = [];
  var idx = 0;
  var _eventArray = [];

  function useState(initValue) {
    var state;
    state = hooks[idx] !== undefined ? hooks[idx] : initValue;
    var _idx = idx;
    var setState = function (newValue) {
      hooks[_idx] = newValue;
      render();
    };
    idx++;
    return [state, setState];
  }

  function useEffect(callback, dependancyArray) {
    var oldDependancies = hooks[idx];
    var hasChanged = true;
    if (oldDependancies) {
      hasChanged = dependancyArray.some(function (dep, i) {
        return !Object.is(dep, oldDependancies[i]);
      });
    }
    hooks[idx] = dependancyArray;
    idx++;
    if (hasChanged) callback();
  }

  function init(rootElement, templateCallback) {
    _root = rootElement;
    _templateCallback = templateCallback;
    render();
  }

  function render() {
    idx = 0;
    _eventArray.length = 0;
    _root.innerHTML = _templateCallback();
  }

  function load(_callback) {
    window.addEventListener("DOMContentLoaded", () => _callback());
  }

  document.addEventListener(
    "click",
    function (e) {
      return handleEventListeners(e, "click");
    },
    false
  );

  document.addEventListener(
    "change",
    function (e) {
      return handleEventListeners(e, "change");
    },
    false
  );

  document.addEventListener(
    "blur",
    function (e) {
      return handleEventListeners(e, "blur");
    },
    false
  );

  function handleEventListeners(e, typeEvent) {
    _eventArray.forEach(function (target) {
      if (e.target.id === target.id && typeEvent === target.typeEvent) {
        e.preventDefault();
        target.callback(e);
      }
    });
  }

  function addHandler(typeEvent, id, callback) {
    _eventArray.push({
      id: id,
      callback: callback,
      typeEvent: typeEvent,
    });
  }

  return {
    useState: useState,
    useEffect: useEffect,
    init: init,
    load: load,
    render: render,
    addHandler: addHandler,
  };
})();
