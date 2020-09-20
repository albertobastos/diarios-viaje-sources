const siteMetadata = {
  title: "Asturianos 2020",
  subtitle: "No somos asturianos, pero queremos serlo",
  description: "Álbumes de fotografías de algunos de los lugares visitados durante una estancia de cuatro semanas de julio en Asturias",
  rootUrl: '/', // usado para links en el menú
  siteUrl: 'http://albertobastos.info/viajes/2020asturianos', // usado internamente por gatsby
  disqus: "asturianos-2020-diario-de-viaje",
  photoCdn: "http://localhost:8001/2020asturianos",
  //photoCdn: "http://d3bhx6meigp7tf.cloudfront.net/2020asturianos",
  photoFullFolder: '1920',
  photoThumbFolder: '480',
  analytics: "UA-329917-",
  flags: {
    showBudget: false,
    showExtras: false,
    showComments: true
  }
}

const sitemapExcluded = [];
if (!siteMetadata.flags.showBudget) sitemapExcluded.push('/presupuesto/');
if (!siteMetadata.flags.extras) sitemapExcluded.push('/extras/');
if (!siteMetadata.flags.showComments || !siteMetadata.disqus) sitemapExcluded.push('/comentarios/');

const plugins = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `src`,
      path: `${__dirname}/src/`,
    },
  },
  'gatsby-transformer-json',
  'gatsby-transformer-remark',
  {
    resolve: 'gatsby-plugin-sitemap',
    options: {
      exclude: sitemapExcluded
    }
  }
];

if (siteMetadata.analytics) {
  plugins.push({
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      trackingId: siteMetadata.analytics
    }
  });
}

module.exports = {
  siteMetadata,
  pathPrefix: `/viajes/2020asturianos`, // only for production
  plugins,
}