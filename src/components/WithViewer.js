import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React from 'react'
import { Query } from 'react-apollo'

//      id       image       bio
const USER_FRAGMENT = gql`
  fragment WithViewer on Viewer {
    user {
      username
      email


    }
  }
`

const GET_VIEWER = gql`
  query Viewer {
    viewer {
      ...WithViewer
    }
  }

  ${USER_FRAGMENT}
`
  //variable: {"username":"Biker981"},
// const USER_FRAGMENT = {
//   user: {
//     id: 981,
//     username: "Biker981",
//     email: "jvarilla981@gmail.com",
//     bio: "Fake"
//   }
// }
const WithViewer = ({ children }) => (
  <Query query={GET_VIEWER}>
    {({ loading, error, data }) => {
      if (loading || error) return null
      return children(data.viewer)
    }}
  </Query>

)

WithViewer.propTypes = {
  children: PropTypes.func.isRequired
}

WithViewer.fragments = {
  viewer: USER_FRAGMENT
}

export default WithViewer
