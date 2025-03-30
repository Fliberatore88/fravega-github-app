export interface User {
    login: string;
    avatar_url: string;
    html_url: string;
    bio?: string;
    public_repos?: number;
    followers?: number;
    following?: number;
    name?: string;
}