import { createContext, useReducer, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { CURRENT_USER_QUERY } from '../components/User'
import uuid from 'react-uuid'

export const AnnouncementContext = createContext()

const UPDATE_ANNOUNCEMENT_MUTATION = gql`
  mutation UpdateAnnouncement(
    $id: ID!
    $title: String!
    $items: [String!]!
    $isLinkToImage: Boolean!
    $order: Int!
  ) {
    updateAnnouncement(
      id: $id
      title: $title
      items: $items
      isLinkToImage: $isLinkToImage
      order: $order
    ) {
      id
      title
    }
  }
`

const CREATE_ANNOUNCEMENT_MUTATION = gql`
  mutation CreateAnnouncement(
    $title: String!
    $items: [String!]!
    $isLinkToImage: Boolean!
    $order: Int!
  ) {
    createAnnouncement(
      title: $title
      items: $items
      isLinkToImage: $isLinkToImage
      order: $order
    ) {
      id
      title
    }
  }
`

const DELETE_ANNOUNCEMENT_MUTATION = gql`
  mutation DeleteAnnouncement($id: ID!) {
    deleteAnnouncement(id: $id) {
      id
      title
    }
  }
`

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return {
        deletedAnnouncements: [],
        announcements: [...action.announcements],
      }
    case 'UPDATE_NAME':
      return {
        ...state,
        announcements: state.announcements.map((ann, index) =>
          index === action.index ? { ...ann, title: action.title } : ann
        ),
      }
    case 'UPDATE_ITEMS':
      return {
        ...state,
        announcements: state.announcements.map((ann, index) =>
          index === action.index
            ? { ...ann, items: action.items.split('\n') }
            : ann
        ),
      }
    case 'UPDATE_ORDER':
      return {
        ...state,
        announcements: action.payload.map((ann, index) => {
          return { ...ann, order: index }
        }),
      }

    case 'UPDATE_TYPE':
      return {
        ...state,
        announcements: state.announcements.map((ann, index) =>
          index === action.index
            ? { ...ann, isLinkToImage: !ann.isLinkToImage }
            : ann
        ),
      }
    case 'ADD_ANNOUNCEMENT':
      return {
        ...state,
        announcements: [
          ...state.announcements,
          {
            id: `new_${uuid()}`,
            title: '',
            items: [],
            order: state.announcements.length,
            isLinkToImage: false,
          },
        ],
      }
    case 'DELETE_ANNOUNCEMENT':
      return {
        deletedAnnouncements: [
          ...state.deletedAnnouncements,
          state.announcements[action.index],
        ],
        announcements: state.announcements.filter(
          (_, index) => index != action.index
        ),
      }
    default:
      return state
  }
}

export const AnnouncementProvider = ({ children, userData }) => {
  const [announcementState, dispatch] = useReducer(reducer, {
    announcements: [],
    deletedAnnouncements: [],
  })

  const [updateAnnouncement] = useMutation(UPDATE_ANNOUNCEMENT_MUTATION)
  const [createAnnouncement] = useMutation(CREATE_ANNOUNCEMENT_MUTATION)
  const [deleteAnnouncement] = useMutation(DELETE_ANNOUNCEMENT_MUTATION)

  useEffect(() => {
    if (userData) {
      dispatch({ type: 'INIT', announcements: userData.announcements })
    }
  }, [userData])

  const updateAnnouncementDB = () => {
    announcementState.announcements.map(announcement => {
      !announcement.id.startsWith('new_')
        ? updateAnnouncement({
            variables: announcement,
            refetchQueries: [
              {
                query: CURRENT_USER_QUERY,
              },
            ],
          })
        : createAnnouncement({
            variables: announcement,
            refetchQueries: [
              {
                query: CURRENT_USER_QUERY,
              },
            ],
          })
    })

    announcementState.deletedAnnouncements.map(announcement => {
      if (!announcement.id.startsWith('new_')) {
        deleteAnnouncement({
          variables: { id: announcement.id },
          refetchQueries: [
            {
              query: CURRENT_USER_QUERY,
            },
          ],
        })
      }
    })
  }

  return (
    <AnnouncementContext.Provider
      value={{
        announcements: announcementState.announcements,
        dispatch,
        updateAnnouncementDB,
        // deleteAnnouncementFromDB,
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  )
}
