import { ApplicationCommandType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface Command {
  name: string;
  description?: string;
  slashCommandConfig: SlashCommandBuilder;
  type: ApplicationCommandType;
  

  execute(interaction: ChatInputCommandInteraction): Promise<void>;
}