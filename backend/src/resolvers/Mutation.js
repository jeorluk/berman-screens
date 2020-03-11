const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Mutation = {
  //#region Scheduule Mutations
  async createSchedule(parent, args, ctx, info) {
    //1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!')
    }
    //2. Create the schedule
    const schedule = await ctx.db.mutation.createSchedule(
      {
        data: {
          name: args.name,
          periods: args.periods,
          user: {
            connect: { id: ctx.request.userId },
          },
        },
      },
      info
    )

    //3. Add the schedule to the user

    return schedule
  },

  updateSchedule(parent, args, ctx, info) {
    console.log('Update schedule called')
    console.log({ ...args })
    //first make a copy of the updates
    const updates = { ...args }
    //remove the ID from the updates
    delete updates.id
    //run the update method
    return ctx.db.mutation.updateSchedule(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    )
  },

  async deleteSchedule(parent, args, ctx, info) {
    const where = { id: args.id }
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!')
    }

    const schedule = await ctx.db.query.schedule(
      { where },
      `{id name user {id }}`
    )
    const ownsSchedule = schedule.user.id === ctx.request.userId
    console.log(info)

    if (!ownsSchedule) {
      throw new Error('This is not your schedule to delete!')
    }

    return ctx.db.mutation.deleteSchedule({ where }, info)
  },

  //#endregion

  //#region User Mutations
  async updateUser(parent, args, ctx, info) {
    console.log('Calling updateUser')
    const updates = {}
    if (args.activeScheduleId) {
      updates.activeSchedule = { connect: { id: args.activeScheduleId } }
    }
    if (args.editScheduleId) {
      updates.editSchedule = { connect: { id: args.editScheduleId } }
    }

    console.log(updates)
    return ctx.db.mutation.updateUser(
      {
        data: {
          ...updates,
        },
        where: {
          id: ctx.request.userId,
        },
      },
      info
    )
  },

  async signup(parent, args, ctx, info) {
    //lowercase the username
    args.name = args.name.toLowerCase()
    //hash the password
    const password = await bcrypt.hash(args.password, 12)
    //create the user in the db
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] },
        },
      },
      info
    )
    //create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    //We set the jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, //1 year cookie
    })
    //Finally we return the user to the browser
    return user
  },
  async signin(parent, { name, password }, ctx, info) {
    //1. check if there is a user with the name
    const user = await ctx.db.query.user({ where: { name } })
    if (!user) {
      throw new Error('The user does not exist.')
    }
    //2. check if their password is correct
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid password!')
    }
    //3. generate the JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    //4. Set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 100 * 60 * 60 * 24 * 365,
      SameSite: 'None',
    })
    ctx.response.cookie('token', token, {})
    //5. Return the user
    return user
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token')
    return { message: 'Goodbye!' }
  },
  //#endregion

  //#region Announcement Mutations
  async createAnnouncement(parent, args, ctx, info) {
    console.log("Let's create an announcement!")
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!')
    }

    const announcement = await ctx.db.mutation.createAnnouncement(
      {
        data: {
          title: args.title,
          items: { set: args.items },
          isLinkToImage: args.isLinkToImage,
          order: args.order,
          user: {
            // connect: { id: args.userId },
            connect: { id: ctx.request.userId },
          },
        },
      },
      info
    )
    return announcement
  },

  async updateAnnouncement(parent, args, ctx, info) {
    const where = { id: args.id }
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!')
    }

    const announcement = await ctx.db.query.announcement(
      { where },
      `{id title user {id }}`
    )
    const ownsAnnouncement = announcement.user.id === ctx.request.userId
    console.log(info)

    if (!ownsAnnouncement) {
      throw new Error('This is not your announcement to delete!')
    }

    //first make a copy of the updates
    const updates = { ...args, items: { set: [...args.items] } }

    console.log(updates)
    //remove the ID from the updates
    delete updates.id

    //run the update method
    return ctx.db.mutation.updateAnnouncement(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    )
  },

  async deleteAnnouncement(parent, args, ctx, info) {
    const where = { id: args.id }
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!')
    }

    const announcement = await ctx.db.query.announcement(
      { where },
      `{id title user {id }}`
    )
    const ownsAnnouncement = announcement.user.id === ctx.request.userId
    console.log(info)

    if (!ownsAnnouncement) {
      throw new Error('This is not your announcement to delete!')
    }

    return ctx.db.mutation.deleteAnnouncement({ where }, info)
  },
  //#endregion

  //#region ParnasMessage Mutations
  async createParnasMessage(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!')
    }

    const parnasMessage = await ctx.db.mutation.createParnasMessage(
      {
        data: {
          message: args.message,
          order: args.order,
          user: {
            connect: { id: ctx.request.userId },
          },
        },
      },
      info
    )
    return parnasMessage
  },

  async updateParnasMessage(parent, args, ctx, info) {
    const where = { id: args.id }
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!')
    }

    const parnasMessage = await ctx.db.query.parnasMessage(
      { where },
      `{id message user {id }}`
    )
    const ownsParnasMessage = parnasMessage.user.id === ctx.request.userId
    console.log(info)

    if (!ownsParnasMessage) {
      throw new Error('This is not your message to delete!')
    }

    //first make a copy of the updates
    const updates = { ...args }

    console.log(updates)
    //remove the ID from the updates
    delete updates.id

    //run the update method
    return ctx.db.mutation.updateParnasMessage(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    )
  },

  async deleteParnasMessage(parent, args, ctx, info) {
    const where = { id: args.id }
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!')
    }

    const parnasMessage = await ctx.db.query.parnasMessage(
      { where },
      `{id user {id }}`
    )
    const ownsParnasMessage = parnasMessage.user.id === ctx.request.userId
    console.log(info)

    if (!ownsParnasMessage) {
      throw new Error('This is not your message to delete!')
    }

    return ctx.db.mutation.deleteParnasMessage({ where }, info)
  },
  //#endregion
}

module.exports = Mutation
