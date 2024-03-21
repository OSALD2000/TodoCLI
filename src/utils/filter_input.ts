export const filter_input = (input:string) : boolean => (
    input !== "--create" && input !== "--show" && input !== "--add" && input !== "--delete" && input !== "--done"
    && input !== "-r" && input !== "--reset" && input !== "-h" && input !== "--help" 
); 