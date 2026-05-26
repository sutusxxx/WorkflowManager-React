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

export const GET_ACTIVE_SPRINT = gql`
    query GetActiveSprint($projectId: ID!) {
        activeSprint(projectId: $projectId) {
            id
            name
            goal
            startDate
            endDate
            active
            project {
                id
                name
                key
            }
            issues {
                id
                key
                type
                title
                priority
                status {
                    id
                    name
                    color
                    category
                }
                nextIssueId
            }
            createdAt
            createdBy {
                id
                username
            }
            updatedAt
            modifiedBy {
                id
                username
            }
        }
    }
`;

export const GET_SPRINTS = gql`
    query GetSprints($projectId: ID!) {
        projectById(id: $projectId) {
            id
            key
            statuses {
                id
                name
            }
            sprints {
                id
                name
                goal
                startDate
                endDate
                active
                issues {
                    id
                    key
                    type
                    title
                    priority
                    status {
                        id
                        name
                        color
                        category
                    }
                    nextIssueId
                }
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
                type
                title
                priority
                status {
                    id
                    name
                    color
                    category
                }
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
            dueDate
            status {
                id
                name
                category
                allowedTransitionIds
                color
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
            project {
                id
                key
                name
                statuses {
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
            assigned {
                id
                username
            }
            reporter {
                id
                username
            }
        }
    }
`;

export const STATUS_TRANSITION = gql`
    mutation StatusTransition($issueId: ID!, $input: TransitionIssueInput!) {
        changeStatus(issueId: $issueId, input: $input) {
            id
            status {
                id
                name
            }
        }
    }
`;

export const CREATE_ISSSUE = gql`
    mutation CreateIssue($input: CreateIssueInput!) {
        createIssue(input: $input) {
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

export const MOVE_ISSUE = gql`
    mutation MoveIssue($sprintId: ID!, $input: MoveIssueInput) {
        moveIssue(sprintId: $sprintId, input: $input) {
            id
            issues {
                id
                nextIssueId
            }
        }
    }
`;
