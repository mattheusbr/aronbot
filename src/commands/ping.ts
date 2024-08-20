import {SlashCommandBuilder, ChatInputCommandInteraction, CacheType, ApplicationCommandType, CommandInteraction,} from "discord.js";
import { Command } from "../interface/Command";
    
export class Ping implements Command {
  name = "ping";
  description = "teste";
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description);
  type = ApplicationCommandType.ChatInput

  async execute(
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<any> {
    return interaction.reply("Pong!");    
  }
}