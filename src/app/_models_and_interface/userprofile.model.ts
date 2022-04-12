export class UserProfile {
    constructor(
        public firstname: string,
        public lastname: string,
        public email: string,
        private password: string,
        private cf_password: string,
    ) { }
}