import { createContext, useReducer, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { CURRENT_USER_QUERY } from '../components/User'
import uuid from 'react-uuid'

export const ParnasContext = createContext()

const UPDATE_PARNAS_MUTATION = gql`
  mutation UpdateParnasMessage($id: ID!, $message: String!, $order: Int!) {
    updateParnasMessage(id: $id, message: $message, order: $order) {
      id
    }
  }
`

const CREATE_PARNAS_MUTATION = gql`
  mutation CreateParnasMessage($message: String!, $order: Int!) {
    createParnasMessage(message: $message, order: $order) {
      id
      message
    }
  }
`

const DELETE_PARNAS_MUTATION = gql`
  mutation DeleteParnasMessage($id: ID!) {
    deleteParnasMessage(id: $id) {
      id
      title
    }
  }
`

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return {
        deletedMessages: [],
        messages: [...action.messages],
      }
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map((mes, index) =>
          index === action.index ? { ...mes, message: action.message } : mes
        ),
      }
    case 'UPDATE_ORDER':
      return {
        ...state,
        messages: action.payload.map((mes, index) => {
          return { ...mes, order: index }
        }),
      }

    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: `new_${uuid()}`,
            message: '',
            order: state.messages.length,
          },
        ],
      }
    case 'DELETE_MESSAGE':
      return {
        deletedMessages: [
          ...state.deletedMessages,
          state.messages[action.index],
        ],
        messages: state.messages.filter((_, index) => index != action.index),
      }
    default:
      return state
  }
}

export const ParnasProvider = ({ children, userData }) => {
  const [parnasState, dispatch] = useReducer(reducer, {
    messages: [],
    deletedMessages: [],
  })

  const [updateParnasMessage] = useMutation(UPDATE_PARNAS_MUTATION)
  const [createParnasMessage] = useMutation(CREATE_PARNAS_MUTATION)
  const [deleteParnasMessage] = useMutation(DELETE_PARNAS_MUTATION)

  useEffect(() => {
    if (userData) {
      dispatch({ type: 'INIT', messages: userData.parnasHayom })
    }
  }, [userData])

  const updateParnasDB = () => {
    parnasState.messages.map(message => {
      !message.id.startsWith('new_')
        ? updateParnasMessage({
            variables: message,
            refetchQueries: [
              {
                query: CURRENT_USER_QUERY,
              },
            ],
          })
        : createParnasMessage({
            variables: message,
            refetchQueries: [
              {
                query: CURRENT_USER_QUERY,
              },
            ],
          })
    })

    parnasState.deletedMessages.map(message => {
      if (!message.id.startsWith('new_')) {
        deleteParnasMessage({
          variables: { id: message.id },
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
    <ParnasContext.Provider
      value={{
        messages: parnasState.messages,
        dispatch,
        updateParnasDB,
      }}
    >
      {children}
    </ParnasContext.Provider>
  )
}
