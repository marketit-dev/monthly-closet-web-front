import { observable } from 'mobx';

export default class OfficeCategoryStore {
    root: object;

    constructor(root: object) {
        this.root = root;
    }

    @observable category = [
        { name: '드라마 영화 명대사', path: '/drama' },
        { name: '속담 퀴즈', path: '/quiz' },
        { name: '유의어 학습', path: '/synonym' },
    ];
}
