import { gql } from "@apollo/client";

export const REPOSITORY_INFO = gql `
    fragment RepositoryInfo on Repository {
        ratingAverage
        reviewCount
        language
        description
        forksCount
        fullName
        id
        ownerAvatarUrl
        stargazersCount
    }
`