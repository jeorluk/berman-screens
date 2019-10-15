import gql from 'graphql-tag'

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      name
      permissions
      announcements(orderBy: order_ASC) {
        id
        title
        items
        isLinkToImage
        order
      }
      schedules(orderBy: name_ASC) {
        id
        name
        periods
      }
      activeSchedule {
        id
        name
        periods
      }
      editSchedule {
        id
        name
        periods
      }
      parnasHayom {
        id
        message
        order
      }
    }
  }
`
export const SINGLE_USER_QUERY = gql`
  query SNGLE_USER_QUERY($name: String!) {
    user(where: { name: $name }) {
      id
      name
      announcements(orderBy: order_ASC) {
        id
        title
        items
        isLinkToImage
        order
      }
      activeSchedule {
        id
        name
        periods
      }
      parnasHayom {
        id
        message
        order
      }
    }
  }
`
