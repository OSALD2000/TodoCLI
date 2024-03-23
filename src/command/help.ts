import { Command } from "../model/Comand";
import { getInfo } from "../utils/help_info";

export const help = (_: Command) =>{
    console.log(getInfo());
}