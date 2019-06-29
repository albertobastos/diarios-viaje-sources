const siteMetadata = {
  title: "Ejemplo de diario de viaje",
  subtitle: "Una plantilla de diario de viaje generado con Gatsby",
  description: "Descripción para SEO del diario de viaje",
  rootUrl: 'http://albertobastos.info',
  siteUrl: 'http://albertobastos.info/viajes/2018pirineos',
  disqus: "pirineos-2018-diario-de-viaje",
  //"photoCdn": "http://localhost:8001/2018pirineos",
  photoCdn: "http://d3bhx6meigp7tf.cloudfront.net/2018pirineos",
  photoFullFolder: 'large',
  photoThumbFolder: 'thumb',
  //analytics: "UA-329917-999",
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
  pathPrefix: `/viajes/2018pirineos`, // only for production
  plugins,
}