import { ChatInputCommandInteraction, Client, Events, GatewayIntentBits, Message, REST, Routes } from "discord.js";
import dotenv from "dotenv";
import { InteractionHandler } from "./interactionHandler ";
dotenv.config();

const DISCORD_ACCESS_TOKEN = process.env.DISCORD_TOKEN || "";
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || "";
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID || "";

class AronApplication {
  private client: Client;
  private discordRestClient: REST;
  private interactionHandler: InteractionHandler;

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      shards: "auto",
      failIfNotExists: false,      
    });
    this.discordRestClient = new REST().setToken(DISCORD_ACCESS_TOKEN);
    this.interactionHandler = new InteractionHandler();
  }

  startBot() {
    this.client
      .login(DISCORD_ACCESS_TOKEN)
      .then(() => {
        this.addClientEventHandlers();
        this.registerSlashCommands();
      })
      .catch((err) => {
        console.error("Error starting bot", err);
      });
  }

  addClientEventHandlers() {
      // this.client.on(Events.MessageCreate, (message: Message) => {
      //   if (message.author.bot) 
      //     return;
          
      //   const { content } = message;
      //   message.reply(`Serenity Bot says: ${content}`);
      // });
  
      this.client.on(Events.ClientReady, () => {
        console.log("Serenity bot client logged in");
      });
  
      this.client.on(Events.Error, (err: Error) => {
        console.error("Client error", err);
      });

      this.client.on(Events.InteractionCreate, (interaction) => {
        this.interactionHandler.handleInteraction(
          interaction as ChatInputCommandInteraction
        );
      });
  }

  async registerSlashCommands() {
    const commands = this.interactionHandler.getSlashCommands();
    // await this.client.application?.commands.set(commands).then(({size}) => {
    //   console.log(`Successfully registered ${size} global (/) commands`);
    // });

    await this.discordRestClient
    .put(Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID), {
      body: commands,
    })
    .then((data: any) => {
      console.log(
        `Successfully registered ${data.length} global application (/) commands`
      );
    })
    .catch((err) => {
      console.error("Error registering application (/) commands", err);
    });
  }

}
  
const app = new AronApplication();
app.startBot();