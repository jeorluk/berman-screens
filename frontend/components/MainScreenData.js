import React, { useContext, useEffect, useState } from 'react'
import AnnouncementPage from './AnnouncementPage'
import { AnnouncementContext } from '../globalState'

const MainScreenData = () => {
  const { announcements } = useContext(AnnouncementContext)
  const [pageArray, setPageArray] = useState([])
  const [visiblePageIndex, setVisiblePageIndex] = useState(0)

  useEffect(() => {
    const createdArray = createPageArray(announcements)
    console.log('Announcements changed')
    setPageArray(createdArray)
  }, [announcements])

  useEffect(() => {
    const interval = setInterval(setVisibleIndex, 4000)
    console.log('set interval')
    console.table(pageArray)
    return () => {
      console.log('Clear interval')
      clearInterval(interval)
    }
  }, [pageArray])

  const setVisibleIndex = () => {
    if (pageArray.length > 0) {
      setVisiblePageIndex(previousIndex => {
        return (previousIndex + 1) % pageArray.length
      })
    } else setVisiblePageIndex(0)
  }

  const createPageArray = array => {
    const newArray = []
    // const startingArray = JSON.parse(JSON.stringify(array))

    // startingArray.map(item => {
    if (array) {
      array.map(announcement => {
        const items = [...announcement.items]
        while (items.length) {
          newArray.push({
            screenLabel: announcement.title,
            items: items.splice(0, 5),
            // dataType: item.dataType,
            isLinkToImage: announcement.isLinkToImage,
          })
        }
        return true
      })
    }
    return newArray
    // this.setState({ pageArray: [...newArray] })
  }

  return pageArray.map((announcement, index) => {
    return (
      <div
        key={index}
        style={{
          display: index === visiblePageIndex ? 'block' : 'none',
        }}
      >
        <AnnouncementPage
          key={index}
          screenLabel={announcement.screenLabel}
          items={announcement.items}
          isLinkToImage={announcement.isLinkToImage}
        />
      </div>
    )
  })
}
export default MainScreenData

// class MainScreenData extends Component {
//   constructor(props) {
//     super(props)
//     this.intervalID = 0
//     this.state = {
//       visiblePageIndex: 1,
//       pageArray: [],
//     }
//   }

// componentDidMount() {
//   this.createPageArray(this.props.announcements)
//   this.intervalId = setInterval(this.setVisibleIndex, 4000)
// }

// componentDidUpdate(prevProps) {
//   if (this.props.announcements !== prevProps.announcements) {
//     this.createPageArray(this.props.announcements)
//   }
// }

// componentWillUnmount() {
//   clearInterval(this.intervalID)
// }

// setVisibleIndex = () => {
//   const currentIndex = this.state.visiblePageIndex
//   const newIndex = (currentIndex + 1) % this.state.pageArray.length
//   this.setState({
//     visiblePageIndex: newIndex,
//   })
// }

// createPageArray = array => {
//   const newArray = []
//   const startingArray = JSON.parse(JSON.stringify(array))

//   startingArray.map(item => {
//     while (item.items.length) {
//       newArray.push({
//         screenLabel: item.screenLabel,
//         items: item.items.splice(0, 5),
//         dataType: item.dataType,
//       })
//     }
//     return true
//   })
//   this.setState({ pageArray: [...newArray] })
// }

// render() {
//   return this.state.pageArray.map((announcement, index) => {
//     return (
//       <div
//         style={{
//           display: index === this.state.visiblePageIndex ? 'block' : 'none',
//         }}
//       >
//         <AnnouncementPage
//           key={index}
//           screenLabel={announcement.screenLabel}
//           items={announcement.items}
//           dataType={announcement.dataType}
//         />
//       </div>
//     )
//   })
// }
// }
