const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

const welcomeChannelId = 'C040K32SUAJ';

// When a user joins the team, send a message in a predefined channel asking them to introduce themselves
app.event('member_left_channel', async ({ event, client, logger }) => {
  try {
    // Call chat.postMessage with the built-in client
    const result = await client.chat.postMessage({
      channel: welcomeChannelId,
      text: `<@${event.user.id}> has left! Goodbye!`
    });
    logger.info(result);
  }
  catch (error) {
    logger.error(error);
  }
});

(async () => {
  // Start your app
  await app.start(Number(process.env.PORT || 3000));

  console.log('⚡️ Bolt app is running!');
})();