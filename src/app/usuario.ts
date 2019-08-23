export interface Usuario {
    email: String;
    userName: String;
    password: { type:String, select:false};
    token: String;
}