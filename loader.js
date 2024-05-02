(function () {
  const remoteUrl = 'https://www.multifaceted.info/subdomain-info';
  const menuUrl = [remoteUrl, 'menu.html'].join('/');
  const ts = Date.now() % 1000000;
  const qs = '?ts=' + ts.toString();
  const cssFile = [remoteUrl, 'styles.css'].join('/') + qs;
  const el = document.createElement('link');
  el.rel = 'stylesheet';
  el.crossorigin = 'anonymous';
  el.media = 'all'
  el.href = cssFile;
  document.head.appendChild(el);


  const toggleBodyClass = (key = '') => {
    const cn = ['show', key].join('-');
    const bCls = document.body.classList;
    if (bCls.contains(cn)) {
      bCls.remove(cn)
    } else {
      bCls.add(cn)
    }
  }

  fetch(menuUrl).then(response => response.text()).then(menu => {
    const innerNav = document.createElement('nav');
    innerNav.classList.add('subdomain-navigator');
    innerNav.innerHTML = menu;
    const toggleElement = document.createElement('div');
    toggleElement.textContent = 'ⓘ';
    toggleElement.classList.add('toggle-subdomain-menu');
    toggleElement.addEventListener('click', (e) => {
      toggleBodyClass('subdomain-menu');
    });
    innerNav.appendChild(toggleElement);
    document.body.appendChild(innerNav);
    const infoUrl = [remoteUrl, 'info.html'].join('/');
    fetch(infoUrl).then(response => response.text()).then(content => {
      const innerInfo = document.createElement('aside');
      innerInfo.classList.add('subdomain-info');
      innerInfo.innerHTML = content;
      const closeDiv = document.createElement('div');
      closeDiv.textContent = '⤫';
      closeDiv.classList.add('close');
      innerInfo.appendChild(closeDiv)
      document.body.appendChild(innerInfo);
    })
  })
})();