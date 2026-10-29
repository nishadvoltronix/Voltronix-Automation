// Shared by the React client and the static-HTML production build.
const site = require('../data/site.json');
const services = require('../data/services.json');
const images = require('../data/images.json');
const applications = require('../data/applications.json');
const contracting = require('../data/contracting.json');

function getPublicRoutes() {
  return ['/', ...services.map((item) => `/services/${item.slug}/`), ...applications.map((item) => `/applications/${item.slug}/`), '/contracting/'];
}

function getMetadata(pathname = '/') {
  const path = pathname.replace(/\/+$/, '') || '/';
  const service = services.find((item) => path === `/services/${item.slug}`);
  const application = applications.find((item) => path === `/applications/${item.slug}`);
  const isContracting = path === '/contracting';
  const detail = service || application || (isContracting ? contracting : null);
  const isHome = path === '/';
  const notFound = !isHome && !detail;
  const canonical = `${site.url}${isHome ? '/' : `${path}/`}`;
  const title = detail ? detail.seoTitle : notFound ? `Page Not Found | ${site.name}` : site.title;
  const description = detail ? detail.seoDescription : notFound ? 'This page could not be found. Explore Voltronix Automation control panel services in Dubai, UAE.' : site.description;
  const imageKey = service?.slug || application?.image;
  const image = imageKey ? `${site.url}${images[imageKey].src}` : `${site.url}/icon-512.png`;
  const catalog = [
    ...services.map((item) => ({ name: item.title, path: `/services/${item.slug}/` })),
    ...applications.map((item) => ({ name: item.title, path: `/applications/${item.slug}/` })),
    { name: contracting.title, path: '/contracting/' }
  ];
  const organization = {
    '@type': 'Organization', '@id': `${site.url}/#organization`,
    name: site.name, url: `${site.url}/`, logo: `${site.url}/icon-512.png`,
    email: site.email, telephone: site.phone,
    description: site.description,
    areaServed: [{ '@type': 'City', name: 'Dubai' }, { '@type': 'Country', name: 'United Arab Emirates' }],
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: 'Control Panel and Automation Services',
      itemListElement: catalog.map((item) => ({
        '@type': 'Offer', itemOffered: { '@type': 'Service', name: item.name, url: site.url + item.path }
      }))
    }
  };
  const graph = [organization, {
    '@type': 'WebSite', '@id': `${site.url}/#website`, name: site.name, url: `${site.url}/`,
    publisher: { '@id': organization['@id'] }, inLanguage: 'en-AE'
  }, {
    '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: title, description,
    isPartOf: { '@id': `${site.url}/#website` }, about: { '@id': organization['@id'] }, inLanguage: 'en-AE'
  }];
  if (detail) {
    const breadcrumbs = [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` }];
    if (!isContracting) breadcrumbs.push({ '@type': 'ListItem', position: 2, name: application ? 'Applications' : 'Services', item: `${site.url}/#${application ? 'applications' : 'services'}` });
    breadcrumbs.push({ '@type': 'ListItem', position: breadcrumbs.length + 1, name: detail.title, item: canonical });
    graph.push({
      '@type': 'Service', '@id': `${canonical}#service`, name: detail.title, description: detail.overview,
      serviceType: detail.title, url: canonical, image, provider: { '@id': organization['@id'] },
      areaServed: { '@type': 'Country', name: 'United Arab Emirates' }
    }, { '@type': 'BreadcrumbList', itemListElement: breadcrumbs });
  }
  return { title, description, canonical, image, notFound, structuredData: { '@context': 'https://schema.org', '@graph': graph } };
}

module.exports = { getMetadata, getPublicRoutes };
