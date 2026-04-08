import { gql } from "@apollo/client";
import { REPOSITORY_INFO } from "./fragments";



export const GET_REPOSITORIES = gql `
    query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
            edges {
                node {
                    ...RepositoryInfo
                }
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
    query Repository($repositoryId: ID!) {
        repository(id: $repositoryId) {
            reviews {
                edges {
                    node {
                        createdAt
                        id
                        rating
                        text
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`