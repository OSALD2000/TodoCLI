import { create } from "./create";
import { add } from "./add";
import { delete_command } from "./delete";
import { done } from "./done";
import { help } from "./help";
import { hide } from "./hide";
import { ignore } from "./ignore";
import { reset } from "./reset";
import { show } from "./show";


export const run = {
    create,
    add,
    delete: delete_command,
    done,
    help,
    hide,
    ignore,
    reset,
    show
}