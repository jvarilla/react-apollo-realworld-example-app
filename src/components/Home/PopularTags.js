import gql from 'graphql-tag'
import React, { Fragment } from 'react'
import { Mutation, Query } from 'react-apollo'
import Tag from './Tag'
import { TAG_FEED } from './feedTypes'

const GET_TAGS = gql`
  query Tags {
    tags
  }
`

/* eslint-disable graphql/template-strings */
const CHANGE_FEED_FILTER = gql`
  mutation ChangeFeedFilter($type: String, $tag: String) {
    changeFeedFilter(type: $type, tag: $tag) @client
  }
`
/* eslint-enable */

const PopularTags = () => (
  <Fragment>
    <p>Popular Tags</p>
    <Query
      query={GET_TAGS}
      fetchPolicy="cache-and-network"
    >
      {({ loading, error, data }) => {
        console.log(data)
        if (loading || error) {
          //Place holder tags so page can load
          data.tags =["hi", "test", "chew"]
          console.log(data)
          return 'Loading tags...'
        } 

        return (
          <Mutation mutation={CHANGE_FEED_FILTER}>
            {changeFeedFilter => (
              <div className="tag-list">
                {["hi", "test", "chew"].map(tag => (//data.tags
                  <Tag
                    key={tag}
                    onClick={() => changeFeedFilter({ variables: { type: TAG_FEED, tag } })}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
          </Mutation>
        )
      }}
    </Query>
  </Fragment>
)

export default PopularTags
