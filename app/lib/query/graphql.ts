import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
    query GetProjects {
        projects {
            id
            key
            name
            statuses {
                id
                name
            }
        }
    }
`;

export const GET_ISSUE_LIST = gql`
    query GetIssues($projectId: ID!) {
        projectById(id: $projectId) {
            id
            key
            statuses {
                id
                name
            }
            issues {
                id
                key
                title
                description
            }
        }
    }
`;

export const GET_ISSUE_DETAIL = gql`
    query GetIssueDetail($issueKey: String!) {
    issueByKey(key: $issueKey) {
        id
        title
        key
        description
        priority
        storyPoints
        type
        status {
            id
            name
        }
        parent {
            key
        }
        children {
            id
            key
            title
            status {
                id
                name
            }
        }
        createdAt
        updatedAt
        createdBy {
            username
        }
        modifiedBy {
            username
        }
    }
}
`;

export const UPDATE_ISSUE = gql`
    mutation UpdateIssue($id: ID!, $input: UpdateIssueInput!) {
        updateIssue(id: $id, input: $input) {
            id
            title
            key
            description
            priority
            storyPoints
            type
            status {
                id
                name
            }
            parent {
                key
            }
            children {
                id
                key
                title
                status {
                    id
                    name
                }
            }
            createdAt
            updatedAt
            createdBy {
                username
            }
            modifiedBy {
                username
            }
        }
    } 
`;
