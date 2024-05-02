(function () {
  const remoteUrl = 'https://www.multifaceted.info/subdomain-info';
  
  const ts = Date.now() % 1000000;
  const qs = '?ts=' + ts.toString();
  const cssFile = [remoteUrl, 'styles.css'].join('/') + qs;
  const el = document.createElement('link');
  el.rel = 'stylesheet';
  el.crossorigin = 'anonymous';
  el.media = 'all'
  el.href = cssFile;
  document.head.appendChild(el);


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
  fetch(menuUrl).then(response => response.text()).then(menu => {
    const innerNav = document.createElement('nav');
    innerNav.classList.add('subdomain-navigator');
    innerNav.innerHTML = menu;
    const toggleElement = document.createElement('div');
    toggleElement.textContent = 'ⓘ';
    toggleElement.setAttribute('class', 'toggle-subdomain-menu control-icon');
    toggleElement.addEventListener('click', (e) => {
      toggleBodyClass('subdomain-menu');
    });
    innerNav.appendChild(toggleElement);
    document.body.appendChild(innerNav);
    const infoUrl = [remoteUrl, 'info.html'].join('/')  + qs;
    fetch(infoUrl).then(response => response.text()).then(content => {
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
    })
  })
})();