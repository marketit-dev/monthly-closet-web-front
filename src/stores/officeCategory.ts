import { observable } from 'mobx';

export type Tcategory = {
    name: string;
    path: string;
};

export default class OfficeCategoryStore {
    root: object;

    constructor(root: object) {
        this.root = root;
    }

    categories: Tcategory[] = observable([
        { name: '구매 관리', path: '/purchase' },
        { name: '고객 관리', path: '/customers' },
        { name: '의류 관리', path: '/products' },
    ]);
}
