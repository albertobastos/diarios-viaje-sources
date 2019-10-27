const siteMetadata = {
  title: "Montañas Rocosas 2019",
  subtitle: "Nunca es demasiado pronto para volver a Canadá",
  description: "Diario de un viaje a lo largo de las Montañas Rocas Canadienses en Jasper y Banff con el añadido del Glacier National Park de Montana",
  rootUrl: '/', // usado para links en el menú
  siteUrl: 'http://albertobastos.info/viajes/2019rockies', // usado internamente por gatsby
  disqus: "rockies-2019-diario-de-viaje",
  photoCdn: "http://localhost:8001/2019rockies",
  //photoCdn: "http://d3bhx6meigp7tf.cloudfront.net/2019rockies",
  photoFullFolder: 'large',
  photoThumbFolder: 'thumb',
  analytics: "UA-329917-27",
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
  pathPrefix: `/viajes/2019rockies`, // only for production
  plugins,
}