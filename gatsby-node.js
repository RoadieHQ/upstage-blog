const path = require(`path`)
const fs = require("fs")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}


// I want the Landen landing pages to display on larder.dev and the blog to display on
// larder.dev/blog. The blog is hosted on Netlify and the landing pages on landen.co with a
// proxy for all /blog* traffic. Landen doesn't rewrite the URL paths so I need my blog to
// actually live in a /blog subdirectory when it is hosted on Netlify. This is how to achieve
// such a feat. I also need to pass the --prefix-paths flag to gatsby build and gatsby serve or
// else links in the Gatsby blog will send users to the wrong place.
exports.onPostBuild = () => {
  fs.renameSync(path.join(__dirname, 'public'), path.join(__dirname, 'temp-public'));
  fs.mkdirSync(path.join(__dirname, 'public'));
  fs.renameSync(path.join(__dirname, 'temp-public'), path.join(__dirname, 'public', 'blog'));
}
