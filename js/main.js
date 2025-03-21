class Router {
  constructor() {
      this.app = document.querySelector('.app');
      this.contentDiv = document.querySelector('.content');
      this.isInitialLoad = true;
      this.routes = {
          home: '/js/pages/home.js',
          works: '/js/pages/works.js',
          video: '/js/pages/video.js'
      };
      this.scrollPositions = new Map();
      history.scrollRestoration = 'manual';
      this.init();
  }

  init() {
      document.addEventListener('click', (e) => {
          const link = e.target.closest('a[data-route]');
          if (!link) return;

          e.preventDefault();
          this.saveScrollPosition();
          const route = link.getAttribute('href');
          if (route) {
              this.navigateTo(route);
          }
      });

      window.addEventListener('popstate', () => this.handleRouteChange());
      window.addEventListener('beforeunload', () => this.saveScrollPosition());
      this.handleRouteChange();
  }

  saveScrollPosition() {
      const currentRoute = window.location.pathname.slice(1) || 'home';
      this.scrollPositions.set(currentRoute, {
          x: window.scrollX,
          y: window.scrollY
      });
  }

  restoreScrollPosition(route) {
      const position = this.scrollPositions.get(route);
      if (position) {
          window.scrollTo({
              top: position.y,
              left: position.x,
              behavior: 'instant'
          });
      }
  }

  navigateTo(route) {
      window.history.pushState({}, '', route);
      this.handleRouteChange();
  }

  async handleRouteChange() {
      const path = window.location.pathname.slice(1) || 'home';
      let [routeName, slug] = path.includes('/') ? path.split('/') : [path, null];

      if (!this.routes[routeName]) {
          this.showNotFound();
          return;
      }

      await this.loadPage(routeName, slug);
  }

  async loadPage(routeName, slug) {
      if (this.isInitialLoad) {
          this.app.classList.remove('loaded');
      }

      this.contentDiv.classList.add('fade-out');
      await new Promise(resolve => setTimeout(resolve, 400));

      try {
          const module = await import(this.routes[routeName]);
          this.contentDiv.innerHTML = slug ? await module.default(slug) : await module.default();

          if (this.scrollPositions.has(routeName) && !this.isInitialLoad) {
              setTimeout(() => this.restoreScrollPosition(routeName), 50);
          } else {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }

          this.contentDiv.classList.add('slide-down');
          this.contentDiv.addEventListener('animationend', () => {
              this.contentDiv.classList.remove('slide-down');
          }, { once: true });

          if (this.isInitialLoad) {
              setTimeout(() => {
                  this.app.classList.add('loaded');
                  this.isInitialLoad = false;
              }, 50);
          }
      } catch (error) {
          this.showNotFound();
          console.error("Error loading page:", error);
      }

      this.contentDiv.classList.remove('fade-out');
  }

  showNotFound() {
      this.contentDiv.innerHTML = '<div class="error-message"><h2>404 - Page Not Found</h2></div>';
      if (this.isInitialLoad) {
          this.app.classList.add('loaded');
          this.isInitialLoad = false;
      }
  }
}

new Router();