(function () {

  const addStyleAsLink = (url = '', rel = '', crossorigin = '') => {
    const el = document.createElement('link');
    el.href = url;
    el.rel = rel;
    if (typeof crossorigin === 'string' && crossorigin.length > 2) {
      el.setAttribute('crossorigin', crossorigin);
    }
    document.head.appendChild(el);
  }

  const remoteUrl = 'https://www.multifaceted.info/subdomain-info';
  
  const ts = Date.now() % 1000000;
  const qs = '?ts=' + ts.toString();
  const cssFile = [remoteUrl, 'styles.css'].join('/') + qs;
  /* const el = document.createElement('link');
  el.rel = 'stylesheet';
  el.crossorigin = 'anonymous';
  el.media = 'all'
  el.href = cssFile;
  document.head.appendChild(el); */
  addStyleAsLink('https://fonts.googleapis.com','preconnect');
  addStyleAsLink('https://fonts.gstatic.com','preconnect','crossorigin');
  addStyleAsLink('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&display=swap','stylesheet');
  addStyleAsLink(cssFile,'stylesheet');

  const matchKey = (currentSub) => {
    switch (currentSub) {
      case "geo":
      case "geotimezone":
      case "astroui":
        return currentSub;
      default:
        return "geo";
    }
  }

  const toggleBodyClass = (key = '', mode = 0) => {
    const cn = ['show', key].join('-');
    const bCls = document.body.classList;
    const hasOpenClass = bCls.contains(cn);
    const closeNow = mode === -1 || hasOpenClass;
    const openNow = mode === 1 || !hasOpenClass;
    if (closeNow) {
      bCls.remove(cn)
    } else if (openNow) {
      bCls.add(cn)
    }
  }

  const closeBodyClass = (key = '') => {
    toggleBodyClass(key, -1);
  }
  const menuUrl = [remoteUrl, 'menu.html'].join('/') + qs;
  const currentSub = window.location.host.split('.').shift();
  const subKey = matchKey(currentSub);
  fetch(menuUrl).then(response => response.text()).then(menu => {
    const innerNav = document.createElement('nav');
    innerNav.classList.add('subdomain-navigator');
    innerNav.innerHTML = menu;
    const remEl = innerNav.querySelector('li.' + subKey);
    if (remEl) {
      remEl.parentNode.removeChild(remEl);
    }
    const toggleElement = document.createElement('div');
    const toggleInner = document.createElement('div');
    toggleInner.setAttribute('class', 'inner control-icon');
    toggleInner.textContent = 'ⓘ';
    document.body.classList.add('subdomain-' + subKey);
    toggleElement.appendChild(toggleInner);
    toggleElement.setAttribute('class', 'toggle-subdomain-menu');
    toggleElement.addEventListener('click', (e) => {
      toggleBodyClass('subdomain-menu');
    });
    innerNav.appendChild(toggleElement);
    document.body.appendChild(innerNav);
    const infoUrl = [remoteUrl, 'info.html'].join('/')  + qs;
    fetch(infoUrl).then(response => response.text()).then(content => {
      if (typeof content === 'string') {
        const textLen = content.length;
        if (textLen > 300) {
          const innerInfo = document.createElement('aside');
          innerInfo.classList.add('subdomain-info');
          innerInfo.innerHTML = content;
          const closeDiv = document.createElement('div');
          closeDiv.textContent = '⤫';
          closeDiv.setAttribute('class', 'close control-icon');
          innerInfo.appendChild(closeDiv);
          closeDiv.addEventListener('click', (e) => {
            closeBodyClass('subdomain-menu');
          });
          document.body.appendChild(innerInfo);
        }
      }
    })
  })
})();