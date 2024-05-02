(function () {
  const remoteUrl = 'https://www.multifaceted.info/subdomain-info';
  const menuUrl = [remoteUrl, 'menu.html'].join('/');
  const cssFile = [remoteUrl, 'styles.css'].join('/');
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
    toggleElement.classList.add('toggle-info-menu');
    toggleElement.addEventListener('click', (e) => {
      toggleBodyClass('subdomain-menu');
    })
    document.body.appendChild(innerNav);
  })
})();