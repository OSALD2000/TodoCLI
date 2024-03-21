import { execSync } from "child_process"

export const isInsideGitRepositiry = () : [boolean, string | null]  =>
{
    try{
        execSync('git rev-parse --is-inside-work-tree');
        return [true, ""];
    }catch{
        return [false, null];
    }
}