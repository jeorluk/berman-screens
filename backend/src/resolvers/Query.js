const { forwardTo } = require('prisma-binding')

const Query = {
  //Users
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    )
  },
  user: forwardTo('db'),
  users: forwardTo('db'),

  //Schedules
  schedule: forwardTo('db'),
  schedules: forwardTo('db'),

  //Announcements
  announcement: forwardTo('db'),
  announcements: forwardTo('db'),

  //ParnasMessages
  parnasMessage: forwardTo('db'),
  parnasMessages: forwardTo('db'),

  //Weather
  async weather(parent, args, ctx, info) {
    const weatherData = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?zip=20853&units=imperial&appid=${process.env.WEATHER_API_KEY}`
    ).then(res => res.json())

    return {
      temp: Math.round(weatherData.main.temp),
      icon: weatherData.weather[0].icon,
      description: weatherData.weather[0].description,
    }
  },
}

module.exports = Query
