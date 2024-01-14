import { Group, User } from '../views/AdminPanel/UsersList/UsersList';

export class UserMapper {
    #uid: string;
    #givenName: string;
    #sn: string;
    #gidNumber: string;
    #groupMapping: Map<string, string>;
    #reverseGroup: Map<string, string>;
    #objectName: string;
    [key: string]: string | Object;

    constructor(user: User, groups: Group[]) {
        this.#uid = user.uid ? user.uid : '';
        this.#givenName = user.givenName ? user.givenName : '';
        this.#sn = user.sn ? user.sn : '';
        this.#gidNumber = user.gidNumber ? user.gidNumber : '';
        this.#objectName = user.objectName ? user.objectName : '';
        this.#groupMapping = UserMapper.#createGroupMap(groups);
        this.#reverseGroup = UserMapper.#createReverseGroupMap(groups);
    }

    static #createGroupMap(groups: Group[]) {
        const groupMap = new Map();

        groups.forEach((group) => {
            groupMap.set(group.gidNumber, group.cn);
        });

        return groupMap;
    }

    static #createReverseGroupMap(groups: Group[]) {
        const groupMap = new Map();
        groups.forEach((group) => {
            groupMap.set(group.cn, group.gidNumber);
        });
        return groupMap;
    }

    public get GivenName() {
        return this.#givenName;
    }
    public set GivenName(value: string) {
        this.#givenName = value;
    }
    public get Surname() {
        return this.#sn;
    }
    public set Surname(value: string) {
        this.#sn = value;
    }
    public get Email() {
        return this.#uid;
    }
    public set Email(value: string) {
        this.#uid = value;
    }
    public get Group() {
        const group = this.#groupMapping.get(this.#gidNumber);
        return group ? group : '';
    }
    public set Group(value: string) {
        if (value) {
            const group = this.#reverseGroup.get(value);
            this.#gidNumber = group ? group : '';
        }
    }
    public get userFields() {
        return {
            GivenName: this.GivenName,
            Surname: this.Surname,
            Email: this.Email,
            Group: this.Group,
        };
    }
    public get userFieldIDs() {
        return {
            givenName: this.GivenName,
            sn: this.Surname,
            uid: this.Email,
            gidNumber: this.#gidNumber,
            objectName: this.#objectName,
        };
    }
}
export default UserMapper;
