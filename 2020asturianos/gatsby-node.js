const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Create on build time a "slug" attribute within each Markdown page GraphQL node
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `stages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// Create a new page for each Markdown file found with slug.
// Add at each page context the previous and next pages slugs.
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const stageTemplate = path.resolve(`./src/templates/stage-template.js`);

  return graphql(`
      {
        allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___title]}
          filter: { frontmatter: {private: {ne:true}}}
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title,
                prefix
              }
              html
            }
          }
        }
      }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const stages = result.data.allMarkdownRemark.edges;

    // Create pages for each stage
    stages.forEach(({ node: stage }, index) => {
      const prev = index === 0 ? '' : stages[index - 1].node.fields.slug;
      const next = index === stages.length - 1 ? '' : stages[index + 1].node.fields.slug;

      createPage({
        path: stage.fields.slug,
        component: stageTemplate,
        context: {
          stage,
          prev,
          next
        }
      })
    });

    return stages;
  })
}