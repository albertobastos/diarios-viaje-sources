const siteMetadata = {
  title: "Roma 2023",
  subtitle: "",
  description: "Diario de un viaje de cuatro días a la ciudad de Roma",
  rootUrl: '/', // usado para links en el menú
  siteUrl: 'http://albertobastos.info/viajes/2023roma', // usado internamente por gatsby
  disqus: "diario-de-viaje-roma-2023",
  //photoCdn: "http://localhost:8001/2023roma",
  photoCdn: "http://d3bhx6meigp7tf.cloudfront.net/2023roma",
  photoFullFolder: 'large',
  photoThumbFolder: 'thumb',
  analytics: "G-QSDHLNZFBM",
  flags: {
    showBudget: true,
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
  pathPrefix: `/viajes/2023roma`, // only for production
  plugins,
}