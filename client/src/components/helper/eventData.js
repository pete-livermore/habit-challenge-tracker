let options = { weekday: 'short', month: 'long', day: 'numeric' };


export const currentDateFormat = (event) => {
  return new Date(event.startDate).toLocaleDateString('en-US', options)
}

export const endDateFormat = (event) => {
  return new Date(event.endDate).toLocaleDateString('en-US', options)
}

export const daysLeft = (event) => {
  const currentDate = new Date()
  const endDate = new Date(event.endDate)
  const timeDifference = Math.abs(endDate - currentDate)
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
  return `${daysDifference} days`
}
