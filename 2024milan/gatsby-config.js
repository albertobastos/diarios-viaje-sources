const siteMetadata = {
  title: "Milán y más 2024",
  subtitle: "",
  description: "Diario de un viaje de tres días a Milán, Bérgamo y Como",
  rootUrl: '/', // usado para links en el menú
  siteUrl: 'http://albertobastos.info/viajes/2024milan', // usado internamente por gatsby
  disqus: "diario-de-viaje-milan-2024",
  photoCdn: "http://localhost:8001",
  //photoCdn: "http://d3bhx6meigp7tf.cloudfront.net/2024milan",
  photoFullFolder: 'large',
  photoThumbFolder: 'thumb',
  analytics: "",
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
  pathPrefix: `/viajes/2024milan`, // only for production
  plugins,
}