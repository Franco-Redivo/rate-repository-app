import { gql } from "@apollo/client";
import { REPOSITORY_INFO } from "./fragments";



export const GET_REPOSITORIES = gql `
    query Repositories($first: Int,$after: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
        repositories(first: $first, after: $after, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
            totalCount
            edges {
                node {
                    ...RepositoryInfo
                }
                cursor
            }
            pageInfo {
                endCursor
                startCursor
                hasNextPage
            }
        }
    }
    ${REPOSITORY_INFO}
`

export const GET_USER = gql `
query getCurrentUser ($includeReviews: Boolean = false) {
    me {
        id
        username
        reviews @include(if: $includeReviews) {
            edges {
                node {
                    createdAt
                    id
                    rating
                    text
                    repositoryId
                    user {
                        id
                        username
                    }
                }
            }
        }
    }
}`

export const GET_REPOSITORY = gql `
    query Repository($repositoryId: ID!){
        repository(id: $repositoryId){
            ...RepositoryInfo
            url
        }
    }
    ${REPOSITORY_INFO}    
`

export const GET_REPOSITORY_REVIEWS = gql `
    query Repository($repositoryId: ID!, $first: Int, $after: String) {
        repository(id: $repositoryId) {
            reviews(first: $first, after: $after) {
                totalCount
                edges {
                    node {
                        createdAt
                        id
                        rating
                        text
                        repositoryId
                        user {
                            id
                            username
                        }
                    }
                    cursor
                }
                pageInfo {
                    endCursor
                    startCursor
                    hasNextPage
                }
            }
        }
    }
`