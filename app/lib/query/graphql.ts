import { gql } from "@apollo/client";

/* -- Issue related queries -- */
export const GET_ISSUES = gql`
    query GetIssues($projectId: ID!, $page: Int, $pageSize: Int) {
        issues(projectId: $projectId, page: $page, pageSize: $pageSize) {
            items {
                id
                key
                title
                status {
                    id
                    name
                    category
                    color
                }
                priority
                type
            }
            total
            page
            pageSize
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

/* -- Issue related mutations -- */
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
            dueDate
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

export const DELETE_ISSUE = gql`
    mutation DeleteIssue($issueId: ID!) {
        deleteIssue(id: $issueId)
    }
`;

/* -- Project related queries -- */
export const GET_PROJECTS = gql`
    query GetProjects($first: Int, $after: String) {
        projects(first: $first, after: $after) {
            pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
            }
            edges {
            node {
                id
                name
                key
                statuses {
                id
                name
                }
            }
            }
        }
    }
`;

export const GET_PROJECT_DETAIL = gql`
    query GetProjectDetail($id: ID!) {
        project(id: $id) {
            id
            name
            key
            description
            statuses
            createdAt
            updatedAt
            createdBy {
                id
                username
            }
            modifiedBy {
                id
                username
            }
            visibility
            statuses {
                id
                name
                category
                color
                displayOrder
            }
        }
    }
`;

/* -- Project related mutations -- */
export const CREATE_RPOJECT = gql`
    mutation CreateProject($input: CreateProjectInput!) {
        createProject(input: $input) {
            id
            name
            key
            description
            statuses
            createdAt
            updatedAt
            createdBy {
                id
                username
            }
            modifiedBy {
                id
                username
            }
            visibility
            statuses {
                id
                name
                category
                color
                displayOrder
                allowedTransitionIds
            }
        }
    }
`;

export const UPDATE_PROJECT = gql`
    mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {
        updateProject(id: $id, input: $input) {
            id
            name
            key
            description
            statuses
            createdAt
            updatedAt
            createdBy {
                id
                username
            }
            modifiedBy {
                id
                username
            }
            visibility
            statuses {
                id
                name
                category
                color
                displayOrder
                allowedTransitionIds
            }
        }
    }
`;

export const CREATE_STATUS = gql`
    mutation CreateStatus($projectId: ID!, $input: CreateStatusInput!) {
        createStatus(projectId: $projectId, input: $input) {
            id
            name
            color
            category
            displayOrder
            isDefault
            allowedTransitionIds
        }
    }
`;

export const ADD_TRANSITION = gql`
    mutation AddTransition($projectId: ID!, $input: AddTransitionInput) {
        addTransition(projectId: $projectId, input: $input) {
            id
            name
            key
            description
            statuses
            createdAt
            updatedAt
            createdBy {
                id
                username
            }
            modifiedBy {
                id
                username
            }
            visibility
            statuses {
                id
                name
                category
                color
                displayOrder
            }
        }
    }
`;

/* -- Sprint and Backlog related queries -- */
export const GET_SPRINTS = gql`
    query GetSprints($projectId: ID!, $page: Int!, $pageSize: Int!) {
        sprints(projectId: $projectId, page: $page, pageSize: $pageSize) {
            items {
                id
                name
                goal
                startDate
                endDate
                project {
                    id
                    name
                    key
                    statuses {
                        id
                        name
                        color
                        displayOrder
                        category
                    }
                }
                issues {
                    id
                    title
                    key
                    nextIssueId
                    type
                    status {
                        id
                        name
                        color
                        category
                    }
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
            total
            page
            pageSize
        }
    }
`;

export const GET_SPRINT_BOARD = gql`
    query GetSprintBoard($projectId: ID!) {
        sprintBoard(projectId: $projectId) {
            id
            name
            goal
            startDate
            endDate
            project {
                id
                name
                key
                statuses {
                    id
                    name
                    color
                    displayOrder
                    category
                }
            }
            issues {
                id
                title
                key
                nextIssueId
                type
                status {
                    id
                    name
                    color
                    category
                }
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

export const GET_BACKLOG = gql`
    query GetBacklog($projectId: ID!, $first: Int, $after: String) {
        backlog(projectId: $projectId, first: $first, after: $after) {
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
            edges {
                node {
                    id
                    title
                    key
                    nextIssueId
                    type
                    status {
                        id
                        name
                        color
                        category
                    }
                }
            }
        }
    }
`;

/* -- Sprint and Backlog related mutations -- */
export const CREATE_SPRINT = gql`
    mutation CreateSprint($projectId: ID!, $input: CreateSprintInput!) {
        createSprint(projectId: $projectId, input: $input) {
            id
            name
            goal
            startDate
            endDate
            state
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

export const UPDATE_SPRINT = gql`
    mutation UpdateSprint($id: ID!, $input: UpdateSprintInput!) {
        updateSprint(idd: $id, input: $input) {
            id
            name
            goal
            startDate
            endDate
            active
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

export const ACTIVATE_SPRINT = gql`
    mutation ActivateSprint($id: ID!) {
        activate(id: $id) {
            id
            name
            goal
            startDate
            endDate
            active
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

export const MOVE_TO_SPRINT = gql`
    mutation MoveToSprint($sprintId: ID!, $input: MoveIssueInput!) {
        moveToSprint(sprintId: $sprintId, input: $input) {
            id
            name
            issues {
                id
                key
            }
        }
    }
`;

export const MOVE_TO_BACKLOG = gql`
    mutation MoveToBacklog($issueId: ID!) {
        removeFromSprint(issueId: $issueId) {
            id
            issues {
                id
                key
            }
        }
    }
`;
