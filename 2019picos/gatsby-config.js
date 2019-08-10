const siteMetadata = {
  title: "Picos de Europa 2019",
  subtitle: "Cantabria, León... y por supuesto, Asturias",
  description: "Diario de un viaje alrededor del Parque Nacional de Picos de Europa visitando las provincias de Cantabria, León y Asturias",
  rootUrl: '/', // usado para links en el menú
  siteUrl: 'http://albertobastos.info/viajes/2019picos', // usado internamente por gatsby
  disqus: "picos-2019-diario-de-viaje",
  //"photoCdn": "http://localhost:8001/2019picos",
  photoCdn: "http://d3bhx6meigp7tf.cloudfront.net/2019picos",
  photoFullFolder: 'large',
  photoThumbFolder: 'thumb',
  analytics: "UA-329917-26",
  flags: {
    showBudget: true,
    showExtras: true,
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
  pathPrefix: `/viajes/2019picos`, // only for production
  plugins,
}