import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "./interface/Command";
import { Ping } from "./commands/ping";
import { Rankup } from "./commands/rankup";

export class InteractionHandler {
  private commands: Command[];

  constructor() {
    this.commands = [new Ping(), new Rankup()];
  }

  getSlashCommands() {
    return this.commands.map((command: Command) =>
      command.slashCommandConfig.toJSON()
    );
  }

  async handleInteraction(interaction: ChatInputCommandInteraction): Promise<void> {
    const commandName = interaction.commandName;

    const matchedCommand = this.commands.find(
      (command) => command.name === commandName
    );

    if (!matchedCommand) {
      return Promise.reject("Command not matched");
    }

    matchedCommand
      .execute(interaction)
      .then(() => {
        // console.log(
        //   `Sucesfully executed command [/${interaction.commandName}]`,
        //   {
        //     guild: { id: interaction.guildId, name: interaction.guild?.name },
        //     user: { name: interaction.user.globalName },
        //   }
        // );
      })
      .catch((err) =>
        console.log(
          `Error executing command [/${interaction.commandName}]: ${err}`,
          {
            guild: { id: interaction.guildId, name: interaction.guild?.name },
            user: { name: interaction.user.globalName },
          }
        )
      );
  }
}

