import {SlashCommandBuilder, ChatInputCommandInteraction, CacheType, ApplicationCommandType, CommandInteraction, EmbedBuilder,} from "discord.js";
import { Command } from "../interface/Command";
import { UserEmbed } from "../interface/user";

export class Rankup implements Command {
  name = "rankup";
  description = "Exibi todos os rankup";
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description);
  type = ApplicationCommandType.ChatInput

  async execute(
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<any> {
    const users: UserEmbed[] = [
        { id: "119117769634480140", name: "SpritteBr" },
        { id: "124", name: "AnotherUser" },
        { id: "125", name: "ThirdUser" },
        { id: "126", name: "FourthUser" },
        { id: "127", name: "FifthUser" },
        { id: "128", name: "SixthUser" },
        { id: "128", name: "SixthUser" },
        { id: "128", name: "SixthUser" },
        { id: "128", name: "SixthUser" },
        { id: "128", name: "SixthUser" },
        { id: "128", name: "SixthUser" },
      ];

    let exampleEmbed =  new EmbedBuilder()
	                        .setColor(0x0099FF)
                            .setTitle("🏆 Rankup Elo")
	                        .setDescription(this.generateRankString(users))
	                        .setThumbnail('https://github.com/InFinity54/LoL_DDragon/blob/master/extras/tier/unranked.png?raw=true')
                                                        
    return interaction.reply({ embeds: [exampleEmbed] });    
  }

  private generateRankString(users: UserEmbed[]): string {
    const medals = ["🥇", "🥈", "🥉"];
    let rankString = "Colocação do elo dos jogadores no servidor.\n\n";
  
    users.forEach((user, index) => {
      const rank = index < 3 ? medals[index] : `\u00A0${index + 1}`;
      rankString += `${rank} ${index < 9 && index > 2 ? '\u00A0' : ''} <@${user.id}>  **${user.name}** - <:bronze:1275481674209165312>\n`;
    });
  
    return rankString;
  }
}